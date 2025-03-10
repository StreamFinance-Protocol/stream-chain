package msgs_test

import (
	"sort"
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/msgs"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/stretchr/testify/require"
)

func TestNormalMsgs_Key(t *testing.T) {
	expectedMsgs := []string{
		// auth
		"/cosmos.auth.v1beta1.BaseAccount",
		"/cosmos.auth.v1beta1.ModuleAccount",
		"/cosmos.auth.v1beta1.ModuleCredential",

		// authz
		"/cosmos.authz.v1beta1.GenericAuthorization",
		"/cosmos.authz.v1beta1.MsgGrant",
		"/cosmos.authz.v1beta1.MsgGrantResponse",
		"/cosmos.authz.v1beta1.MsgRevoke",
		"/cosmos.authz.v1beta1.MsgRevokeResponse",

		// bank
		"/cosmos.bank.v1beta1.MsgMultiSend",
		"/cosmos.bank.v1beta1.MsgMultiSendResponse",
		"/cosmos.bank.v1beta1.MsgSend",
		"/cosmos.bank.v1beta1.MsgSendResponse",
		"/cosmos.bank.v1beta1.SendAuthorization",
		"/cosmos.bank.v1beta1.Supply",

		// consensus

		// crisis
		"/cosmos.crisis.v1beta1.MsgVerifyInvariant",
		"/cosmos.crisis.v1beta1.MsgVerifyInvariantResponse",

		// crypto
		"/cosmos.crypto.ed25519.PrivKey",
		"/cosmos.crypto.ed25519.PubKey",
		"/cosmos.crypto.multisig.LegacyAminoPubKey",
		"/cosmos.crypto.secp256k1.PrivKey",
		"/cosmos.crypto.secp256k1.PubKey",
		"/cosmos.crypto.secp256r1.PubKey",

		// distribution
		"/cosmos.distribution.v1beta1.CommunityPoolSpendProposal",
		"/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool",
		"/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPoolResponse",
		"/cosmos.distribution.v1beta1.MsgFundCommunityPool",
		"/cosmos.distribution.v1beta1.MsgFundCommunityPoolResponse",
		"/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
		"/cosmos.distribution.v1beta1.MsgSetWithdrawAddressResponse",
		"/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
		"/cosmos.distribution.v1beta1.MsgWithdrawDelegatorRewardResponse",
		"/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
		"/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommissionResponse",

		// evidence
		"/cosmos.evidence.v1beta1.Equivocation",
		"/cosmos.evidence.v1beta1.MsgSubmitEvidence",
		"/cosmos.evidence.v1beta1.MsgSubmitEvidenceResponse",

		// feegrant
		"/cosmos.feegrant.v1beta1.AllowedMsgAllowance",
		"/cosmos.feegrant.v1beta1.BasicAllowance",
		"/cosmos.feegrant.v1beta1.MsgGrantAllowance",
		"/cosmos.feegrant.v1beta1.MsgGrantAllowanceResponse",
		"/cosmos.feegrant.v1beta1.MsgPruneAllowances",
		"/cosmos.feegrant.v1beta1.MsgPruneAllowancesResponse",
		"/cosmos.feegrant.v1beta1.MsgRevokeAllowance",
		"/cosmos.feegrant.v1beta1.MsgRevokeAllowanceResponse",
		"/cosmos.feegrant.v1beta1.PeriodicAllowance",

		// gov
		"/cosmos.gov.v1.MsgDeposit",
		"/cosmos.gov.v1.MsgDepositResponse",
		"/cosmos.gov.v1.MsgVote",
		"/cosmos.gov.v1.MsgVoteResponse",
		"/cosmos.gov.v1.MsgVoteWeighted",
		"/cosmos.gov.v1.MsgVoteWeightedResponse",
		"/cosmos.gov.v1beta1.MsgDeposit",
		"/cosmos.gov.v1beta1.MsgDepositResponse",
		"/cosmos.gov.v1beta1.MsgVote",
		"/cosmos.gov.v1beta1.MsgVoteResponse",
		"/cosmos.gov.v1beta1.MsgVoteWeighted",
		"/cosmos.gov.v1beta1.MsgVoteWeightedResponse",
		"/cosmos.gov.v1beta1.TextProposal",

		// params
		"/cosmos.params.v1beta1.ParameterChangeProposal",

		// slashing
		"/cosmos.slashing.v1beta1.MsgUnjail",
		"/cosmos.slashing.v1beta1.MsgUnjailResponse",

		// staking
		"/cosmos.staking.v1beta1.MsgBeginRedelegate",
		"/cosmos.staking.v1beta1.MsgBeginRedelegateResponse",
		"/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation",
		"/cosmos.staking.v1beta1.MsgCancelUnbondingDelegationResponse",
		"/cosmos.staking.v1beta1.MsgCreateValidator",
		"/cosmos.staking.v1beta1.MsgCreateValidatorResponse",
		"/cosmos.staking.v1beta1.MsgDelegate",
		"/cosmos.staking.v1beta1.MsgDelegateResponse",
		"/cosmos.staking.v1beta1.MsgEditValidator",
		"/cosmos.staking.v1beta1.MsgEditValidatorResponse",
		"/cosmos.staking.v1beta1.MsgUndelegate",
		"/cosmos.staking.v1beta1.MsgUndelegateResponse",
		"/cosmos.staking.v1beta1.StakeAuthorization",

		// tx
		"/cosmos.tx.v1beta1.Tx",

		// upgrade
		"/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal",
		"/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal",

		// bridge
		"/klyraprotocol.bridge.MsgBridgeWithdraw",
		"/klyraprotocol.bridge.MsgBridgeWithdrawResponse",

		// clob
		"/klyraprotocol.clob.MsgBatchCancel",
		"/klyraprotocol.clob.MsgBatchCancelResponse",
		"/klyraprotocol.clob.MsgCancelOrder",
		"/klyraprotocol.clob.MsgCancelOrderResponse",
		"/klyraprotocol.clob.MsgPlaceOrder",
		"/klyraprotocol.clob.MsgPlaceOrderResponse",

		// perpetuals

		// prices

		// sending
		"/klyraprotocol.sending.MsgCreateTransfer",
		"/klyraprotocol.sending.MsgCreateTransferResponse",
		"/klyraprotocol.sending.MsgDepositToSubaccount",
		"/klyraprotocol.sending.MsgDepositToSubaccountResponse",
		"/klyraprotocol.sending.MsgWithdrawFromSubaccount",
		"/klyraprotocol.sending.MsgWithdrawFromSubaccountResponse",

		// subaccounts
		"/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
		"/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse",
	}

	require.Equal(t, expectedMsgs, lib.GetSortedKeys[sort.StringSlice](msgs.NormalMsgs))
}

func TestNormalMsgs_Value(t *testing.T) {
	validateMsgValue(t, msgs.NormalMsgs)
}
