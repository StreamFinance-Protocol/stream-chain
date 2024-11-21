package msgs

import (
	upgrade "cosmossdk.io/x/upgrade/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	blocktime "github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime/types"
	clob "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	delaymsg "github.com/StreamFinance-Protocol/stream-chain/protocol/x/delaymsg/types"
	feetiers "github.com/StreamFinance-Protocol/stream-chain/protocol/x/feetiers/types"
	govplus "github.com/StreamFinance-Protocol/stream-chain/protocol/x/govplus/types"
	perpetuals "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	prices "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	ratelimit "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	sending "github.com/StreamFinance-Protocol/stream-chain/protocol/x/sending/types"
	stats "github.com/StreamFinance-Protocol/stream-chain/protocol/x/stats/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	auth "github.com/cosmos/cosmos-sdk/x/auth/types"
	bank "github.com/cosmos/cosmos-sdk/x/bank/types"
	consensus "github.com/cosmos/cosmos-sdk/x/consensus/types"
	crisis "github.com/cosmos/cosmos-sdk/x/crisis/types"
	distribution "github.com/cosmos/cosmos-sdk/x/distribution/types"
	gov "github.com/cosmos/cosmos-sdk/x/gov/types/v1"
	slashing "github.com/cosmos/cosmos-sdk/x/slashing/types"
	staking "github.com/cosmos/cosmos-sdk/x/staking/types"
	icahosttypes "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/host/types"
	ibctransfer "github.com/cosmos/ibc-go/v8/modules/apps/transfer/types"
	ibcclient "github.com/cosmos/ibc-go/v8/modules/core/02-client/types" //nolint:staticcheck
	ibcconn "github.com/cosmos/ibc-go/v8/modules/core/03-connection/types"
)

var (
	// InternalMsgSamplesAll are msgs that are used only used internally.
	InternalMsgSamplesAll = lib.MergeAllMapsMustHaveDistinctKeys(InternalMsgSamplesGovAuth)

	// InternalMsgSamplesGovAuth are msgs that are used only used internally.
	// GovAuth means that these messages must originate from the gov module and
	// signed by gov module account.
	// InternalMsgSamplesAll are msgs that are used only used internally.
	InternalMsgSamplesGovAuth = lib.MergeAllMapsMustHaveDistinctKeys(
		InternalMsgSamplesDefault,
		InternalMsgSamplesKlyraCustom,
	)

	// CosmosSDK default modules
	InternalMsgSamplesDefault = map[string]sdk.Msg{
		// auth
		"/cosmos.auth.v1beta1.MsgUpdateParams": &auth.MsgUpdateParams{},

		// bank
		"/cosmos.bank.v1beta1.MsgSetSendEnabled":         &bank.MsgSetSendEnabled{},
		"/cosmos.bank.v1beta1.MsgSetSendEnabledResponse": nil,
		"/cosmos.bank.v1beta1.MsgUpdateParams":           &bank.MsgUpdateParams{},
		"/cosmos.bank.v1beta1.MsgUpdateParamsResponse":   nil,

		// consensus
		"/cosmos.consensus.v1.MsgUpdateParams":         &consensus.MsgUpdateParams{},
		"/cosmos.consensus.v1.MsgUpdateParamsResponse": nil,

		// crisis
		"/cosmos.crisis.v1beta1.MsgUpdateParams":         &crisis.MsgUpdateParams{},
		"/cosmos.crisis.v1beta1.MsgUpdateParamsResponse": nil,

		// distribution
		"/cosmos.distribution.v1beta1.MsgCommunityPoolSpend":         &distribution.MsgCommunityPoolSpend{},
		"/cosmos.distribution.v1beta1.MsgCommunityPoolSpendResponse": nil,
		"/cosmos.distribution.v1beta1.MsgUpdateParams":               &distribution.MsgUpdateParams{},
		"/cosmos.distribution.v1beta1.MsgUpdateParamsResponse":       nil,

		// gov
		"/cosmos.gov.v1.MsgExecLegacyContent":         &gov.MsgExecLegacyContent{},
		"/cosmos.gov.v1.MsgExecLegacyContentResponse": nil,
		"/cosmos.gov.v1.MsgUpdateParams":              &gov.MsgUpdateParams{},
		"/cosmos.gov.v1.MsgUpdateParamsResponse":      nil,

		// slashing
		"/cosmos.slashing.v1beta1.MsgUpdateParams":         &slashing.MsgUpdateParams{},
		"/cosmos.slashing.v1beta1.MsgUpdateParamsResponse": nil,

		// staking
		"/cosmos.staking.v1beta1.MsgUpdateParams":         &staking.MsgUpdateParams{},
		"/cosmos.staking.v1beta1.MsgUpdateParamsResponse": nil,

		// upgrade
		"/cosmos.upgrade.v1beta1.MsgCancelUpgrade":           &upgrade.MsgCancelUpgrade{},
		"/cosmos.upgrade.v1beta1.MsgCancelUpgradeResponse":   nil,
		"/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade":         &upgrade.MsgSoftwareUpgrade{},
		"/cosmos.upgrade.v1beta1.MsgSoftwareUpgradeResponse": nil,

		// ibc
		"/ibc.applications.interchain_accounts.host.v1.MsgUpdateParams":            &icahosttypes.MsgUpdateParams{},
		"/ibc.applications.interchain_accounts.host.v1.MsgUpdateParamsResponse":    nil,
		"/ibc.applications.interchain_accounts.host.v1.MsgModuleQuerySafe":         &icahosttypes.MsgModuleQuerySafe{},
		"/ibc.applications.interchain_accounts.host.v1.MsgModuleQuerySafeResponse": nil,
		"/ibc.applications.transfer.v1.MsgUpdateParams":                            &ibctransfer.MsgUpdateParams{},
		"/ibc.applications.transfer.v1.MsgUpdateParamsResponse":                    nil,
		"/ibc.core.client.v1.MsgUpdateParams":                                      &ibcclient.MsgUpdateParams{},
		"/ibc.core.client.v1.MsgUpdateParamsResponse":                              nil,
		"/ibc.core.connection.v1.MsgUpdateParams":                                  &ibcconn.MsgUpdateParams{},
		"/ibc.core.connection.v1.MsgUpdateParamsResponse":                          nil,
	}

	// Custom modules
	InternalMsgSamplesKlyraCustom = map[string]sdk.Msg{
		// blocktime
		"/klyraprotocol.blocktime.MsgUpdateDowntimeParams":         &blocktime.MsgUpdateDowntimeParams{},
		"/klyraprotocol.blocktime.MsgUpdateDowntimeParamsResponse": nil,

		// clob
		"/klyraprotocol.clob.MsgCreateClobPair":                             &clob.MsgCreateClobPair{},
		"/klyraprotocol.clob.MsgCreateClobPairResponse":                     nil,
		"/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration":          &clob.MsgUpdateBlockRateLimitConfiguration{},
		"/klyraprotocol.clob.MsgUpdateBlockRateLimitConfigurationResponse":  nil,
		"/klyraprotocol.clob.MsgUpdateClobPair":                             &clob.MsgUpdateClobPair{},
		"/klyraprotocol.clob.MsgUpdateClobPairResponse":                     nil,
		"/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration":         &clob.MsgUpdateEquityTierLimitConfiguration{},
		"/klyraprotocol.clob.MsgUpdateEquityTierLimitConfigurationResponse": nil,
		"/klyraprotocol.clob.MsgUpdateLiquidationsConfig":                   &clob.MsgUpdateLiquidationsConfig{},
		"/klyraprotocol.clob.MsgUpdateLiquidationsConfigResponse":           nil,

		// delaymsg
		"/klyraprotocol.delaymsg.MsgDelayMessage":         &delaymsg.MsgDelayMessage{},
		"/klyraprotocol.delaymsg.MsgDelayMessageResponse": nil,

		// feetiers
		"/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams":         &feetiers.MsgUpdatePerpetualFeeParams{},
		"/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParamsResponse": nil,

		// govplus
		"/klyraprotocol.govplus.MsgSlashValidator":         &govplus.MsgSlashValidator{},
		"/klyraprotocol.govplus.MsgSlashValidatorResponse": nil,

		// perpetuals
		"/klyraprotocol.perpetuals.MsgCreatePerpetual":               &perpetuals.MsgCreatePerpetual{},
		"/klyraprotocol.perpetuals.MsgCreatePerpetualResponse":       nil,
		"/klyraprotocol.perpetuals.MsgSetLiquidityTier":              &perpetuals.MsgSetLiquidityTier{},
		"/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse":      nil,
		"/klyraprotocol.perpetuals.MsgSetCollateralPool":             &perpetuals.MsgSetCollateralPool{},
		"/klyraprotocol.perpetuals.MsgSetCollateralPoolResponse":     nil,
		"/klyraprotocol.perpetuals.MsgUpdateParams":                  &perpetuals.MsgUpdateParams{},
		"/klyraprotocol.perpetuals.MsgUpdateParamsResponse":          nil,
		"/klyraprotocol.perpetuals.MsgUpdatePerpetualParams":         &perpetuals.MsgUpdatePerpetualParams{},
		"/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse": nil,

		// prices
		"/klyraprotocol.prices.MsgCreateOracleMarket":         &prices.MsgCreateOracleMarket{},
		"/klyraprotocol.prices.MsgCreateOracleMarketResponse": nil,
		"/klyraprotocol.prices.MsgUpdateMarketParam":          &prices.MsgUpdateMarketParam{},
		"/klyraprotocol.prices.MsgUpdateMarketParamResponse":  nil,

		// ratelimit
		"/klyraprotocol.ratelimit.MsgSetLimitParams":         &ratelimit.MsgSetLimitParams{},
		"/klyraprotocol.ratelimit.MsgSetLimitParamsResponse": nil,

		// sending
		"/klyraprotocol.sending.MsgSendFromModuleToAccount":         &sending.MsgSendFromModuleToAccount{},
		"/klyraprotocol.sending.MsgSendFromModuleToAccountResponse": nil,

		// stats
		"/klyraprotocol.stats.MsgUpdateParams":         &stats.MsgUpdateParams{},
		"/klyraprotocol.stats.MsgUpdateParamsResponse": nil,
	}
)
