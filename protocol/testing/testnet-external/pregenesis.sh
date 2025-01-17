#!/bin/bash
set -eo pipefail

# This script creates the pregenesis file for the public testnet.
# The pregenesis file includes initial genesis module states for the testnet, as well as two internal validators (klyra-1 and klyra-2) run by the klyra team.
# External validator accounts and their gentx's will need to be added to get the finalized genesis file.
#
# The script must be run from the root of the `v4` repo.
#
# example usage:
# $ ./testing/testnet-external/pregenesis.sh ./build/klyraprotocold --SEED_FAUCET_TDAI

# To get the following information, first set up the validator keys locally. Then run:
# Account address: `klyraprotocold keys show klyra-1-key -a`
# Consensus address: `klyraprotocold tendermint show-address`
# Node ID: `klyraprotocold tendermint show-node-id`

# Check for missing required arguments
if [ -z "$1" ]; then
  echo "Error: Missing required argument KLYRA_BINARY."
  echo "Usage: $0 <KLYRA_BINARY> [-s|--SEED_FAUCET_TDAI]"
  exit 1
fi

# Capture the required argument
KLYRA_BINARY="$1"

# Remove the required argument, leaving optional flags
shift

# Initialize optional flags with default values
SEED_FAUCET_TDAI=false

# Parse optional flags
while [ "$#" -gt 0 ]; do
  case "$1" in
    -s|--SEED_FAUCET_TDAI)
      SEED_FAUCET_TDAI=true
      ;;
    *)
      echo "Error: Invalid option '$1'"
      echo "Usage: $0 <KLYRA_BINARY> [-s|--SEED_FAUCET_TDAI]"
      exit 1
      ;;
  esac
  shift
done

echo "Running with SEED_FAUCET_TDAI=$SEED_FAUCET_TDAI..."

source "./testing/genesis.sh"
CHAIN_ID="klyra-testnet-4"
FAUCET_ACCOUNTS=(
	"klyra1g2ygh8ufgwwpg5clp2qh3tmcmlewuyt2at5f0a" # main faucet
	"klyra1fzhzmcvcy7nycvu46j9j4f7f8cnqxn37p749jy" # backup #1
	"klyra1xeu4caf7nwd83h9z49cxtagsglngdldjh6kdpt" # backup #2
)
TMP_GENTX_DIR="/tmp/gentx"
TMP_CHAIN_DIR="/tmp/chain"
TMP_EXCHANGE_CONFIG_JSON_DIR="/tmp/exchange_config"
AWS_REGION="us-east-2"

# initialize faucet with 1e13 micro TDAI (10 million TDAI). Only used when `SEED_FAUCET_TDAI` is true.
FAUCET_TDAI_BALANCE=10000000000000

# Define monikers for each validator. These are made up strings and can be anything.
# This also controls in which directory the validator's home will be located. i.e. `/tmp/chain/.klyra-1`
MONIKERS=(
	"klyra-1"
	"klyra-2"
	"klyra-research"
)

# Public IPs for each validator.
IPS=(
	"3.20.153.106" # klyra-1, us-east-2
	"18.182.95.191" # klyra-2, ap-northeast-1
	"3.139.127.183" # klyra-research, us-east-2
)

MNEMONICS_SECRET="$(AWS_PROFILE=klyra-v4-public-testnet aws secretsmanager get-secret-value --region $AWS_REGION --secret-id public-testnet-mnemonics | jq -r '.SecretString')"

RESEARCH_MNEMONICS_SECRET="$(AWS_PROFILE=klyra-v4-research aws secretsmanager get-secret-value --region $AWS_REGION --secret-id public-testnet-mnemonics | jq -r '.SecretString')"

# Define mnemonics for internal validators.
MNEMONICS=(
	# klyra-1
	# Consensus Address: klyravalcons18an8qvxam8zkrmrx7d0gygd7q9uv7cky87a89j
	"$(echo $MNEMONICS_SECRET | jq -r '.["klyra-1"]')"

	# klyra-2
	# Consensus Address: klyravalcons1z79h40nmd777scs93qjxaeak8m2cl6hpeykyh3
	"$(echo $MNEMONICS_SECRET | jq -r '.["klyra-2"]')"

	# klyra-research
	# Consensus Address: klyravalcons1a49fhxhy7mn64v220v5wgpyauwzdc4y864wzhr
	"$(echo $RESEARCH_MNEMONICS_SECRET)"
)

NODE_KEYS_SECRET="$(AWS_PROFILE=klyra-v4-public-testnet aws secretsmanager get-secret-value --region $AWS_REGION --secret-id public-testnet-node-keys | jq -r '.SecretString')"
RESEARCH_NODE_KEYS_SECRET="$(AWS_PROFILE=klyra-v4-research aws secretsmanager get-secret-value --region $AWS_REGION --secret-id public-testnet-node-keys | jq -r '.SecretString')"

# Define node keys for internal validators.
NODE_KEYS=(
	# Node ID: 3f667030ddd9c561ec66f35e8221be0178cf62c4
	"$(echo $NODE_KEYS_SECRET | jq -r '.["klyra-1"]')"

	# Node ID: 178b7abe7b6fbde8620588246ee7b63ed58feae1
	"$(echo $NODE_KEYS_SECRET | jq -r '.["klyra-2"]')"

	"$(echo $RESEARCH_NODE_KEYS_SECRET)"
)

VALIDATOR_ACCOUNTS=(
	"klyra1vvc9vl6z9pu0vt2y79d0ln8zp6qmpmrhufxu50" # klyra-1
	"klyra10lzv79d96l7jh07z76ry6cnn6ftnnl8fje6jpx" # klyra-2
	"klyra1md63arq56n623g5xpevev94lyepv4pqjdp0tk7" # klyra-research
)

cleanup_tmp_dir() {
	if [ -d "$TMP_EXCHANGE_CONFIG_JSON_DIR" ]; then
		rm -r "$TMP_EXCHANGE_CONFIG_JSON_DIR"
	fi
	if [ -d "$TMP_GENTX_DIR" ]; then
		rm -r "$TMP_GENTX_DIR"
	fi
	if [ -d "$TMP_CHAIN_DIR" ]; then
		rm -r "$TMP_CHAIN_DIR"
	fi
}

# Set public-testnet specific genesis params.
function overwrite_genesis_public_testnet() {
	# Overwrite with public-testnet specific params.
	# TODO(CORE-512): add info/resources around genesis params.
	
	# Slashing params
	dasel put -t string -f "$GENESIS" '.app_state.slashing.params.signed_blocks_window' -v '12288' # ~5 hr
	dasel put -t string -f "$GENESIS" '.app_state.slashing.params.min_signed_per_window' -v '0.2' # 20%
	dasel put -t string -f "$GENESIS" '.app_state.slashing.params.downtime_jail_duration' -v '60s'
	dasel put -t string -f "$GENESIS" '.app_state.slashing.params.slash_fraction_double_sign' -v '0.0' # 0%
	dasel put -t string -f "$GENESIS" '.app_state.slashing.params.slash_fraction_downtime' -v '0.0' # 0%

	# Staking params
	dasel put -t string -f "$GENESIS" '.app_state.staking.params.bond_denom' -v "$NATIVE_TOKEN"
	dasel put -t int -f "$GENESIS" '.app_state.staking.params.max_validators' -v '100'
	dasel put -t string -f "$GENESIS" '.app_state.staking.params.min_commission_rate' -v '0.05' # 5%
	dasel put -t string -f "$GENESIS" '.app_state.staking.params.unbonding_time' -v '1036800s' # 12 days
	dasel put -t int -f "$GENESIS" '.app_state.staking.params.max_entries' -v '7'
	dasel put -t int -f "$GENESIS" '.app_state.staking.params.historical_entries' -v '10000'


}

create_pregenesis_file() {
	VAL_HOME_DIR="$TMP_CHAIN_DIR/.klyraprotocol"
	VAL_CONFIG_DIR="$VAL_HOME_DIR/config"

	# This initializes the $VAL_HOME_DIR folder.
	$KLYRA_BINARY init "test-moniker" -o --chain-id=$CHAIN_ID --home "$VAL_HOME_DIR"

	# Create temporary directory for exchange config jsons.
	echo "Copying exchange config jsons to $TMP_EXCHANGE_CONFIG_JSON_DIR"
	cp -R ./daemons/pricefeed/client/constants/testdata $TMP_EXCHANGE_CONFIG_JSON_DIR

	# Do not pass in test accounts and faucet accounts to `edit_genesis`. This skips
	# initializing TDAI balance in the subacounts.
	# Using "*" as a subscript results in a single arg: "klyra1... klyra1... klyra1..."
	# Using "@" as a subscript results in separate args: "klyra1..." "klyra1..." "klyra1..."
	# Note: `edit_genesis` must be called before `add-genesis-account`.
	edit_genesis "$VAL_CONFIG_DIR" "" "" "$TMP_EXCHANGE_CONFIG_JSON_DIR" "./testing/delaymsg_config" "" ""
	overwrite_genesis_public_testnet

	FAUCET_BALANCE="${FAUCET_NATIVE_TOKEN_BALANCE}$NATIVE_TOKEN"
	# If SEED_FAUCET_TDAI is true, faucet is initalized with TDAI balance in addition to native token balance.
	if [ "$SEED_FAUCET_TDAI" = true ]; then
		FAUCET_BALANCE="${FAUCET_BALANCE},${FAUCET_TDAI_BALANCE}$TDAI_DENOM"
	fi
	for acct in "${FAUCET_ACCOUNTS[@]}"; do
		$KLYRA_BINARY add-genesis-account "$acct" $FAUCET_BALANCE --home "$VAL_HOME_DIR"
	done

	# Create temporary directory for all gentx files.
	mkdir "$TMP_GENTX_DIR"

	# Iterate over internal validators and set up their home directories, as well as generate `gentx` transaction for each.
	for i in "${!MONIKERS[@]}"; do
		INDIVIDUAL_VAL_HOME_DIR=""$TMP_CHAIN_DIR"/.${MONIKERS[$i]}"
		INDIVIDUAL_VAL_CONFIG_DIR="$INDIVIDUAL_VAL_HOME_DIR/config"

		# Initialize the chain and validator files.
		$KLYRA_BINARY init "${MONIKERS[$i]}" -o --chain-id=$CHAIN_ID --home "$INDIVIDUAL_VAL_HOME_DIR"

		# Overwrite the randomly generated `priv_validator_key.json` with a key generated deterministically from the mnemonic.
		$KLYRA_BINARY tendermint gen-priv-key --home "$INDIVIDUAL_VAL_HOME_DIR" --mnemonic "${MNEMONICS[$i]}"

		# Note: `klyraprotocold init` non-deterministically creates `node_id.json` for each validator.
		# This is inconvenient for persistent peering during testing in Terraform configuration as the `node_id`
		# would change with every build of this container.
		#
		# For that reason we overwrite the non-deterministically generated one with a deterministic key defined in this file here.
		new_file=$(jq ".priv_key.value = \"${NODE_KEYS[$i]}\"" "$INDIVIDUAL_VAL_CONFIG_DIR"/node_key.json)
		cat <<<"$new_file" >"$INDIVIDUAL_VAL_CONFIG_DIR"/node_key.json

		echo "${MNEMONICS[$i]}" | $KLYRA_BINARY keys add "${MONIKERS[$i]}" --recover --keyring-backend=test --home "$INDIVIDUAL_VAL_HOME_DIR"

		# Initialize the validator account in `genesis.json` under their individual home directory, which is used to create their gentx.
		$KLYRA_BINARY add-genesis-account "${VALIDATOR_ACCOUNTS[$i]}" "${TESTNET_VALIDATOR_NATIVE_TOKEN_BALANCE}$NATIVE_TOKEN" --home "$INDIVIDUAL_VAL_HOME_DIR"

		# Initialize the validator account in `genesis.json` under the common home directory, which is used as the output geneis file.
		$KLYRA_BINARY add-genesis-account "${VALIDATOR_ACCOUNTS[$i]}" "${TESTNET_VALIDATOR_NATIVE_TOKEN_BALANCE}$NATIVE_TOKEN" --home "$VAL_HOME_DIR"

		$KLYRA_BINARY gentx "${MONIKERS[$i]}" "${TESTNET_VALIDATOR_SELF_DELEGATE_AMOUNT}$NATIVE_TOKEN" --moniker="${MONIKERS[$i]}" --keyring-backend=test --chain-id=$CHAIN_ID --home "$INDIVIDUAL_VAL_HOME_DIR" --ip="${IPS[$i]}"

		# Copy the gentx to a shared directory.
		cp -a "$INDIVIDUAL_VAL_CONFIG_DIR/gentx/." "$TMP_GENTX_DIR"
	done

	cp -r "$TMP_GENTX_DIR" "$VAL_CONFIG_DIR"

	$KLYRA_BINARY collect-gentxs --home "$VAL_HOME_DIR"
}

cleanup_tmp_dir
create_pregenesis_file
echo "Wrote pregenesis file to $VAL_CONFIG_DIR/genesis.json"
