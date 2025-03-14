package msgs

import (
	upgrade "cosmossdk.io/x/upgrade/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	bridge "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	delaymsg "github.com/StreamFinance-Protocol/stream-chain/protocol/x/delaymsg/types"
	perpetuals "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	prices "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	sending "github.com/StreamFinance-Protocol/stream-chain/protocol/x/sending/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	auth "github.com/cosmos/cosmos-sdk/x/auth/types"
	bank "github.com/cosmos/cosmos-sdk/x/bank/types"
	consensus "github.com/cosmos/cosmos-sdk/x/consensus/types"
	crisis "github.com/cosmos/cosmos-sdk/x/crisis/types"
	distribution "github.com/cosmos/cosmos-sdk/x/distribution/types"
	gov "github.com/cosmos/cosmos-sdk/x/gov/types/v1"
	slashing "github.com/cosmos/cosmos-sdk/x/slashing/types"
	staking "github.com/cosmos/cosmos-sdk/x/staking/types"
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
	}

	// Custom modules
	InternalMsgSamplesKlyraCustom = map[string]sdk.Msg{

		// delaymsg
		"/klyraprotocol.delaymsg.MsgDelayMessage":         &delaymsg.MsgDelayMessage{},
		"/klyraprotocol.delaymsg.MsgDelayMessageResponse": nil,

		// bridge
		"/klyraprotocol.bridge.MsgCompleteBridge":              &bridge.MsgCompleteBridge{},
		"/klyraprotocol.bridge.MsgCompleteBridgeResponse":      nil,
		"/klyraprotocol.bridge.MsgUpdateEventParams":           &bridge.MsgUpdateEventParams{},
		"/klyraprotocol.bridge.MsgUpdateEventParamsResponse":   nil,
		"/klyraprotocol.bridge.MsgUpdateProposeParams":         &bridge.MsgUpdateProposeParams{},
		"/klyraprotocol.bridge.MsgUpdateProposeParamsResponse": nil,
		"/klyraprotocol.bridge.MsgUpdateSafetyParams":          &bridge.MsgUpdateSafetyParams{},
		"/klyraprotocol.bridge.MsgUpdateSafetyParamsResponse":  nil,

		// perpetuals
		"/klyraprotocol.perpetuals.MsgCreatePerpetual":               &perpetuals.MsgCreatePerpetual{},
		"/klyraprotocol.perpetuals.MsgCreatePerpetualResponse":       nil,
		"/klyraprotocol.perpetuals.MsgSetCollateralPool":             &perpetuals.MsgSetCollateralPool{},
		"/klyraprotocol.perpetuals.MsgSetCollateralPoolResponse":     nil,
		"/klyraprotocol.perpetuals.MsgSetLiquidityTier":              &perpetuals.MsgSetLiquidityTier{},
		"/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse":      nil,
		"/klyraprotocol.perpetuals.MsgUpdateParams":                  &perpetuals.MsgUpdateParams{},
		"/klyraprotocol.perpetuals.MsgUpdateParamsResponse":          nil,
		"/klyraprotocol.perpetuals.MsgUpdatePerpetualParams":         &perpetuals.MsgUpdatePerpetualParams{},
		"/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse": nil,

		// prices
		"/klyraprotocol.prices.MsgCreateOracleMarket":         &prices.MsgCreateOracleMarket{},
		"/klyraprotocol.prices.MsgCreateOracleMarketResponse": nil,
		"/klyraprotocol.prices.MsgUpdateMarketParam":          &prices.MsgUpdateMarketParam{},
		"/klyraprotocol.prices.MsgUpdateMarketParamResponse":  nil,

		// sending ddd
		"/klyraprotocol.sending.MsgSendFromModuleToAccount":         &sending.MsgSendFromModuleToAccount{},
		"/klyraprotocol.sending.MsgSendFromModuleToAccountResponse": nil,
	}
)
