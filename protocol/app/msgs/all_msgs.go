package msgs

import (
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
)

var (
	// AllTypeMessages is a list of all messages and types that are used in the app.
	// This list comes from the app's `InterfaceRegistry`.
	AllTypeMessages = map[string]struct{}{
		// auth
		"/cosmos.auth.v1beta1.BaseAccount":      {},
		"/cosmos.auth.v1beta1.ModuleAccount":    {},
		"/cosmos.auth.v1beta1.ModuleCredential": {},
		"/cosmos.auth.v1beta1.MsgUpdateParams":  {},

		// authz
		"/cosmos.authz.v1beta1.GenericAuthorization": {},
		"/cosmos.authz.v1beta1.MsgExec":              {},
		"/cosmos.authz.v1beta1.MsgExecResponse":      {},
		"/cosmos.authz.v1beta1.MsgGrant":             {},
		"/cosmos.authz.v1beta1.MsgGrantResponse":     {},
		"/cosmos.authz.v1beta1.MsgRevoke":            {},
		"/cosmos.authz.v1beta1.MsgRevokeResponse":    {},

		// bank
		"/cosmos.bank.v1beta1.MsgMultiSend":              {},
		"/cosmos.bank.v1beta1.MsgMultiSendResponse":      {},
		"/cosmos.bank.v1beta1.MsgSend":                   {},
		"/cosmos.bank.v1beta1.MsgSendResponse":           {},
		"/cosmos.bank.v1beta1.MsgSetSendEnabled":         {},
		"/cosmos.bank.v1beta1.MsgSetSendEnabledResponse": {},
		"/cosmos.bank.v1beta1.MsgUpdateParams":           {},
		"/cosmos.bank.v1beta1.MsgUpdateParamsResponse":   {},
		"/cosmos.bank.v1beta1.SendAuthorization":         {},
		"/cosmos.bank.v1beta1.Supply":                    {},

		// consensus
		"/cosmos.consensus.v1.MsgUpdateParams":         {},
		"/cosmos.consensus.v1.MsgUpdateParamsResponse": {},

		// crisis
		"/cosmos.crisis.v1beta1.MsgUpdateParams":            {},
		"/cosmos.crisis.v1beta1.MsgUpdateParamsResponse":    {},
		"/cosmos.crisis.v1beta1.MsgVerifyInvariant":         {},
		"/cosmos.crisis.v1beta1.MsgVerifyInvariantResponse": {},

		// crypto
		"/cosmos.crypto.ed25519.PrivKey":            {},
		"/cosmos.crypto.ed25519.PubKey":             {},
		"/cosmos.crypto.multisig.LegacyAminoPubKey": {},
		"/cosmos.crypto.secp256k1.PrivKey":          {},
		"/cosmos.crypto.secp256k1.PubKey":           {},
		"/cosmos.crypto.secp256r1.PubKey":           {},

		// distribution
		"/cosmos.distribution.v1beta1.CommunityPoolSpendProposal":             {},
		"/cosmos.distribution.v1beta1.MsgCommunityPoolSpend":                  {},
		"/cosmos.distribution.v1beta1.MsgCommunityPoolSpendResponse":          {},
		"/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool":         {},
		"/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPoolResponse": {},
		"/cosmos.distribution.v1beta1.MsgFundCommunityPool":                   {},
		"/cosmos.distribution.v1beta1.MsgFundCommunityPoolResponse":           {},
		"/cosmos.distribution.v1beta1.MsgSetWithdrawAddress":                  {},
		"/cosmos.distribution.v1beta1.MsgSetWithdrawAddressResponse":          {},
		"/cosmos.distribution.v1beta1.MsgUpdateParams":                        {},
		"/cosmos.distribution.v1beta1.MsgUpdateParamsResponse":                {},
		"/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward":             {},
		"/cosmos.distribution.v1beta1.MsgWithdrawDelegatorRewardResponse":     {},
		"/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission":         {},
		"/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommissionResponse": {},

		// evidence
		"/cosmos.evidence.v1beta1.Equivocation":              {},
		"/cosmos.evidence.v1beta1.MsgSubmitEvidence":         {},
		"/cosmos.evidence.v1beta1.MsgSubmitEvidenceResponse": {},

		// feegrant
		"/cosmos.feegrant.v1beta1.AllowedMsgAllowance":        {},
		"/cosmos.feegrant.v1beta1.BasicAllowance":             {},
		"/cosmos.feegrant.v1beta1.MsgGrantAllowance":          {},
		"/cosmos.feegrant.v1beta1.MsgGrantAllowanceResponse":  {},
		"/cosmos.feegrant.v1beta1.MsgPruneAllowances":         {},
		"/cosmos.feegrant.v1beta1.MsgPruneAllowancesResponse": {},
		"/cosmos.feegrant.v1beta1.MsgRevokeAllowance":         {},
		"/cosmos.feegrant.v1beta1.MsgRevokeAllowanceResponse": {},
		"/cosmos.feegrant.v1beta1.PeriodicAllowance":          {},

		// gov
		"/cosmos.gov.v1.MsgCancelProposal":              {},
		"/cosmos.gov.v1.MsgCancelProposalResponse":      {},
		"/cosmos.gov.v1.MsgDeposit":                     {},
		"/cosmos.gov.v1.MsgDepositResponse":             {},
		"/cosmos.gov.v1.MsgExecLegacyContent":           {},
		"/cosmos.gov.v1.MsgExecLegacyContentResponse":   {},
		"/cosmos.gov.v1.MsgSubmitProposal":              {},
		"/cosmos.gov.v1.MsgSubmitProposalResponse":      {},
		"/cosmos.gov.v1.MsgUpdateParams":                {},
		"/cosmos.gov.v1.MsgUpdateParamsResponse":        {},
		"/cosmos.gov.v1.MsgVote":                        {},
		"/cosmos.gov.v1.MsgVoteResponse":                {},
		"/cosmos.gov.v1.MsgVoteWeighted":                {},
		"/cosmos.gov.v1.MsgVoteWeightedResponse":        {},
		"/cosmos.gov.v1beta1.MsgDeposit":                {},
		"/cosmos.gov.v1beta1.MsgDepositResponse":        {},
		"/cosmos.gov.v1beta1.MsgSubmitProposal":         {},
		"/cosmos.gov.v1beta1.MsgSubmitProposalResponse": {},
		"/cosmos.gov.v1beta1.MsgVote":                   {},
		"/cosmos.gov.v1beta1.MsgVoteResponse":           {},
		"/cosmos.gov.v1beta1.MsgVoteWeighted":           {},
		"/cosmos.gov.v1beta1.MsgVoteWeightedResponse":   {},
		"/cosmos.gov.v1beta1.TextProposal":              {},

		// params
		"/cosmos.params.v1beta1.ParameterChangeProposal": {},

		// slashing
		"/cosmos.slashing.v1beta1.MsgUnjail":               {},
		"/cosmos.slashing.v1beta1.MsgUnjailResponse":       {},
		"/cosmos.slashing.v1beta1.MsgUpdateParams":         {},
		"/cosmos.slashing.v1beta1.MsgUpdateParamsResponse": {},

		// staking
		"/cosmos.staking.v1beta1.MsgBeginRedelegate":                   {},
		"/cosmos.staking.v1beta1.MsgBeginRedelegateResponse":           {},
		"/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation":         {},
		"/cosmos.staking.v1beta1.MsgCancelUnbondingDelegationResponse": {},
		"/cosmos.staking.v1beta1.MsgCreateValidator":                   {},
		"/cosmos.staking.v1beta1.MsgCreateValidatorResponse":           {},
		"/cosmos.staking.v1beta1.MsgDelegate":                          {},
		"/cosmos.staking.v1beta1.MsgDelegateResponse":                  {},
		"/cosmos.staking.v1beta1.MsgEditValidator":                     {},
		"/cosmos.staking.v1beta1.MsgEditValidatorResponse":             {},
		"/cosmos.staking.v1beta1.MsgUndelegate":                        {},
		"/cosmos.staking.v1beta1.MsgUndelegateResponse":                {},
		"/cosmos.staking.v1beta1.MsgUpdateParams":                      {},
		"/cosmos.staking.v1beta1.MsgUpdateParamsResponse":              {},
		"/cosmos.staking.v1beta1.StakeAuthorization":                   {},

		// tx
		"/cosmos.tx.v1beta1.Tx": {},

		// upgrade
		"/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal": {},
		"/cosmos.upgrade.v1beta1.MsgCancelUpgrade":              {},
		"/cosmos.upgrade.v1beta1.MsgCancelUpgradeResponse":      {},
		"/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade":            {},
		"/cosmos.upgrade.v1beta1.MsgSoftwareUpgradeResponse":    {},
		"/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal":       {},

		// bridge
		"/klyraprotocol.bridge.MsgAcknowledgeBridges":          {},
		"/klyraprotocol.bridge.MsgAcknowledgeBridgesResponse":  {},
		"/klyraprotocol.bridge.MsgBridgeWithdraw":              {},
		"/klyraprotocol.bridge.MsgBridgeWithdrawResponse":      {},
		"/klyraprotocol.bridge.MsgCompleteBridge":              {},
		"/klyraprotocol.bridge.MsgCompleteBridgeResponse":      {},
		"/klyraprotocol.bridge.MsgUpdateEventParams":           {},
		"/klyraprotocol.bridge.MsgUpdateEventParamsResponse":   {},
		"/klyraprotocol.bridge.MsgUpdateProposeParams":         {},
		"/klyraprotocol.bridge.MsgUpdateProposeParamsResponse": {},
		"/klyraprotocol.bridge.MsgUpdateSafetyParams":          {},
		"/klyraprotocol.bridge.MsgUpdateSafetyParamsResponse":  {},

		// clob
		"/klyraprotocol.clob.MsgBatchCancel":                                {},
		"/klyraprotocol.clob.MsgBatchCancelResponse":                        {},
		"/klyraprotocol.clob.MsgCancelOrder":                                {},
		"/klyraprotocol.clob.MsgCancelOrderResponse":                        {},
		"/klyraprotocol.clob.MsgCreateClobPair":                             {},
		"/klyraprotocol.clob.MsgCreateClobPairResponse":                     {},
		"/klyraprotocol.clob.MsgPlaceOrder":                                 {},
		"/klyraprotocol.clob.MsgPlaceOrderResponse":                         {},
		"/klyraprotocol.clob.MsgProposedOperations":                         {},
		"/klyraprotocol.clob.MsgProposedOperationsResponse":                 {},
		"/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration":          {},
		"/klyraprotocol.clob.MsgUpdateBlockRateLimitConfigurationResponse":  {},
		"/klyraprotocol.clob.MsgUpdateClobPair":                             {},
		"/klyraprotocol.clob.MsgUpdateClobPairResponse":                     {},
		"/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration":         {},
		"/klyraprotocol.clob.MsgUpdateEquityTierLimitConfigurationResponse": {},
		"/klyraprotocol.clob.MsgUpdateLiquidationsConfig":                   {},
		"/klyraprotocol.clob.MsgUpdateLiquidationsConfigResponse":           {},

		// delaymsg
		"/klyraprotocol.delaymsg.MsgDelayMessage":         {},
		"/klyraprotocol.delaymsg.MsgDelayMessageResponse": {},

		// govplus
		"/klyraprotocol.govplus.MsgSlashValidator":         {},
		"/klyraprotocol.govplus.MsgSlashValidatorResponse": {},

		// perpetuals
		"/klyraprotocol.perpetuals.MsgAddPremiumVotes":               {},
		"/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse":       {},
		"/klyraprotocol.perpetuals.MsgCreatePerpetual":               {},
		"/klyraprotocol.perpetuals.MsgCreatePerpetualResponse":       {},
		"/klyraprotocol.perpetuals.MsgSetCollateralPool":             {},
		"/klyraprotocol.perpetuals.MsgSetCollateralPoolResponse":     {},
		"/klyraprotocol.perpetuals.MsgSetLiquidityTier":              {},
		"/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse":      {},
		"/klyraprotocol.perpetuals.MsgUpdateParams":                  {},
		"/klyraprotocol.perpetuals.MsgUpdateParamsResponse":          {},
		"/klyraprotocol.perpetuals.MsgUpdatePerpetualParams":         {},
		"/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse": {},

		// prices
		"/klyraprotocol.prices.MsgCreateOracleMarket":         {},
		"/klyraprotocol.prices.MsgCreateOracleMarketResponse": {},
		"/klyraprotocol.prices.MsgUpdateMarketParam":          {},
		"/klyraprotocol.prices.MsgUpdateMarketParamResponse":  {},

		// sending
		"/klyraprotocol.sending.MsgCreateTransfer":                  {},
		"/klyraprotocol.sending.MsgCreateTransferResponse":          {},
		"/klyraprotocol.sending.MsgDepositToSubaccount":             {},
		"/klyraprotocol.sending.MsgDepositToSubaccountResponse":     {},
		"/klyraprotocol.sending.MsgWithdrawFromSubaccount":          {},
		"/klyraprotocol.sending.MsgWithdrawFromSubaccountResponse":  {},
		"/klyraprotocol.sending.MsgSendFromModuleToAccount":         {},
		"/klyraprotocol.sending.MsgSendFromModuleToAccountResponse": {},

		// stats
		"/klyraprotocol.stats.MsgUpdateParams":         {},
		"/klyraprotocol.stats.MsgUpdateParamsResponse": {},

		// subaccounts
		"/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount":         {},
		"/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse": {},
	}

	// DisallowMsgs are messages that cannot be externally submitted.
	DisallowMsgs = lib.MergeAllMapsMustHaveDistinctKeys(
		AppInjectedMsgSamples,
		InternalMsgSamplesAll,
		NestedMsgSamples,
		UnsupportedMsgSamples,
	)

	// AllowMsgs are messages that can be externally submitted.
	AllowMsgs = NormalMsgs
)
