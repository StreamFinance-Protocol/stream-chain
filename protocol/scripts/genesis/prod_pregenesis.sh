#!/bin/bash
set -eo pipefail

# This script creates the pregenesis file for a production network.
#
# The script must be run from the root of the `klyra chain` repo.
#
# example usage:
# $ make build
# $ ./scripts/genesis/prod_pregenesis.sh ./build/klyraprotocold

# Check for missing required arguments
if [ -z "$1" ]; then
  echo "Error: Missing required argument KLYRA_BINARY."
  echo "Usage: $0 <KLYRA_BINARY> [-s|--SEED_FAUCET_TDAI]"
  exit 
fi

# Capture the required argument
KLYRA_BINARY="$1"

source "./testing/genesis.sh"

TMP_CHAIN_DIR="/tmp/prod-chain"
TMP_EXCHANGE_CONFIG_JSON_DIR="/tmp/prod-exchange_config"

# TODO(GENESIS): Update below values before running this script. Sample values are shown.
################## Start of required values to be updated ##################
CHAIN_ID="klyra-sample-1"
# Base denomination of the native token. Usually comes with a prefix "u-", "a-" to indicate unit.
NATIVE_TOKEN="asample"
# Denomination of the native token in whole coins.
NATIVE_TOKEN_WHOLE_COIN="sample" 
# Human readable name of token.
COIN_NAME="Sample Coin Name"
# Genesis time of the chain.
GENESIS_TIME="2023-12-31T00:00:00Z"

################## End of required values to be updated ##################

cleanup_tmp_dir() {
	if [ -d "$TMP_EXCHANGE_CONFIG_JSON_DIR" ]; then
		rm -r "$TMP_EXCHANGE_CONFIG_JSON_DIR"
	fi
	if [ -d "$TMP_CHAIN_DIR" ]; then
		rm -r "$TMP_CHAIN_DIR"
	fi
}

# Set production default genesis params.
function overwrite_genesis_production() {	
	# Slashing params
	dasel put -t string -f "$GENESIS" '.app_state.slashing.params.signed_blocks_window' -v '8192' # ~3 hr
	dasel put -t string -f "$GENESIS" '.app_state.slashing.params.min_signed_per_window' -v '0.2' # 20%
	dasel put -t string -f "$GENESIS" '.app_state.slashing.params.downtime_jail_duration' -v '7200s'
	dasel put -t string -f "$GENESIS" '.app_state.slashing.params.slash_fraction_double_sign' -v '0.0' # 0%
	dasel put -t string -f "$GENESIS" '.app_state.slashing.params.slash_fraction_downtime' -v '0.0' # 0%

	# Staking params
	dasel put -t string -f "$GENESIS" '.app_state.staking.params.bond_denom' -v "$NATIVE_TOKEN"
	dasel put -t int -f "$GENESIS" '.app_state.staking.params.max_validators' -v '60'
	dasel put -t string -f "$GENESIS" '.app_state.staking.params.min_commission_rate' -v '0.05' # 5%
	dasel put -t string -f "$GENESIS" '.app_state.staking.params.unbonding_time' -v '2592000s' # 30 days
	dasel put -t int -f "$GENESIS" '.app_state.staking.params.max_entries' -v '7'
	dasel put -t int -f "$GENESIS" '.app_state.staking.params.historical_entries' -v '10000'

	# Bank params	
	# Set denom metadata
	set_denom_metadata "$NATIVE_TOKEN" "$NATIVE_TOKEN_WHOLE_COIN" "$COIN_NAME"

	# Governance params
	dasel put -t string -f "$GENESIS" '.app_state.gov.params.min_deposit.[0].amount' -v "10000$EIGHTEEN_ZEROS" # 10k whole coins of native token
	dasel put -t string -f "$GENESIS" '.app_state.gov.params.min_deposit.[0].denom' -v "$NATIVE_TOKEN"
	dasel put -t string -f "$GENESIS" '.app_state.gov.params.max_deposit_period' -v '172800s' # 2 days
	dasel put -t string -f "$GENESIS" '.app_state.gov.params.expedited_voting_period' -v '86400s' # 1 day
	dasel put -t string -f "$GENESIS" '.app_state.gov.params.voting_period' -v '345600s' # 4 days
	dasel put -t string -f "$GENESIS" '.app_state.gov.params.quorum' -v '0.33400' # 33.4%
	dasel put -t string -f "$GENESIS" '.app_state.gov.params.threshold' -v '0.50000' # 50%
	dasel put -t string -f "$GENESIS" '.app_state.gov.params.veto_threshold' -v '0.33400' # 33.4%
	dasel put -t string -f "$GENESIS" '.app_state.gov.params.min_initial_deposit_ratio' -v '0.20000' # 20%
	dasel put -t bool -f "$GENESIS" '.app_state.gov.params.burn_proposal_deposit_prevote' -v 'false' 
	dasel put -t bool -f "$GENESIS" '.app_state.gov.params.burn_vote_quorum' -v 'false' 
	dasel put -t bool -f "$GENESIS" '.app_state.gov.params.burn_vote_veto' -v 'true'

	# Delayed message params
	# Schedule a delayed message to swap fee tiers to the standard schedule after ~120 days of blocks.
	dasel put -t int -f "$GENESIS" '.app_state.delaymsg.next_delayed_message_id' -v '1'
	dasel put -t json -f "$GENESIS" '.app_state.delaymsg.delayed_messages' -v "[]"
	dasel put -t json -f "$GENESIS" '.app_state.delaymsg.delayed_messages.[]' -v "{}"
	dasel put -t int -f "$GENESIS" '.app_state.delaymsg.delayed_messages.[0].id' -v '0'
	delaymsg=$(cat "$DELAY_MSG_JSON_DIR/perpetual_fee_params_msg.json" | jq -c '.')
	dasel put -t json -f "$GENESIS" '.app_state.delaymsg.delayed_messages.[0].msg' -v "$delaymsg"
	# Schedule the message to execute in ~120 days (at 1.5s per block)
	dasel put -t int -f "$GENESIS" '.app_state.delaymsg.delayed_messages.[0].block_height' -v '6912000'

	# Crisis module
	dasel put -t string -f "$GENESIS" '.app_state.crisis.constant_fee.amount' -v "1$EIGHTEEN_ZEROS" # 1 whole coin of native denom
	dasel put -t string -f "$GENESIS" '.app_state.crisis.constant_fee.denom' -v "$NATIVE_TOKEN"

	# Genesis time
	dasel put -t string -f "$GENESIS" '.genesis_time' -v "$GENESIS_TIME"
}

create_pregenesis_file() {
	VAL_HOME_DIR="$TMP_CHAIN_DIR/.klyraprotocol"
	VAL_CONFIG_DIR="$VAL_HOME_DIR/config"
	# This initializes the $VAL_HOME_DIR folder.
	$KLYRA_BINARY init "test-moniker" -o --chain-id=$CHAIN_ID --home "$VAL_HOME_DIR"

	# Create temporary directory for exchange config jsons.
	echo "Copying exchange config jsons to $TMP_EXCHANGE_CONFIG_JSON_DIR"
	cp -R ./daemons/pricefeed/client/constants/testdata $TMP_EXCHANGE_CONFIG_JSON_DIR

	edit_genesis "$VAL_CONFIG_DIR" "" "" "$TMP_EXCHANGE_CONFIG_JSON_DIR" "./testing/delaymsg_config" "STATUS_INITIALIZING" ""
	overwrite_genesis_production
}

sort_genesis_file(){
	jq -S . $VAL_CONFIG_DIR/genesis.json > $VAL_CONFIG_DIR/sorted_genesis.json
}

cleanup_tmp_dir
create_pregenesis_file
sort_genesis_file
echo "Wrote pregenesis file to $VAL_CONFIG_DIR/sorted_genesis.json"
