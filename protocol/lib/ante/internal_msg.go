package ante

import (
	upgrade "cosmossdk.io/x/upgrade/types"
	bridge "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	clob "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	delaymsg "github.com/StreamFinance-Protocol/stream-chain/protocol/x/delaymsg/types"
	govplus "github.com/StreamFinance-Protocol/stream-chain/protocol/x/govplus/types"
	perpetuals "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	prices "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
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
)

// IsInternalMsg returns true if the given msg is an internal message.
func IsInternalMsg(msg sdk.Msg) bool {
	switch msg.(type) {
	case
		// ------- CosmosSDK default modules
		// auth
		*auth.MsgUpdateParams,

		// bank
		*bank.MsgSetSendEnabled,
		*bank.MsgUpdateParams,

		// consensus
		*consensus.MsgUpdateParams,

		// crisis
		*crisis.MsgUpdateParams,

		// distribution
		*distribution.MsgCommunityPoolSpend,
		*distribution.MsgUpdateParams,

		// gov
		*gov.MsgExecLegacyContent,
		*gov.MsgUpdateParams,

		// slashing
		*slashing.MsgUpdateParams,

		// staking
		*staking.MsgUpdateParams,

		// upgrade
		*upgrade.MsgCancelUpgrade,
		*upgrade.MsgSoftwareUpgrade,

		// ------- Custom modules

		// bridge
		*bridge.MsgCompleteBridge,
		*bridge.MsgUpdateEventParams,
		*bridge.MsgUpdateProposeParams,
		*bridge.MsgUpdateSafetyParams,

		// clob
		*clob.MsgCreateClobPair,
		*clob.MsgUpdateBlockRateLimitConfiguration,
		*clob.MsgUpdateClobPair,
		*clob.MsgUpdateEquityTierLimitConfiguration,
		*clob.MsgUpdateLiquidationsConfig,

		// delaymsg
		*delaymsg.MsgDelayMessage,

		// govplus
		*govplus.MsgSlashValidator,

		// perpetuals
		*perpetuals.MsgCreatePerpetual,
		*perpetuals.MsgSetLiquidityTier,
		*perpetuals.MsgSetCollateralPool,
		*perpetuals.MsgUpdateParams,
		*perpetuals.MsgUpdatePerpetualParams,

		// prices
		*prices.MsgCreateOracleMarket,
		*prices.MsgUpdateMarketParam,

		// sending
		*sending.MsgSendFromModuleToAccount,

		// stats
		*stats.MsgUpdateParams:

		return true

	default:
		return false
	}
}
