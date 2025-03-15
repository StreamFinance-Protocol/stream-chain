package msgs

import (
	evidence "cosmossdk.io/x/evidence/types"
	feegrant "cosmossdk.io/x/feegrant"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	bridge "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	clob "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	sending "github.com/StreamFinance-Protocol/stream-chain/protocol/x/sending/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/authz"
	bank "github.com/cosmos/cosmos-sdk/x/bank/types"
	crisis "github.com/cosmos/cosmos-sdk/x/crisis/types"
	distr "github.com/cosmos/cosmos-sdk/x/distribution/types"
	gov "github.com/cosmos/cosmos-sdk/x/gov/types/v1"
	govbeta "github.com/cosmos/cosmos-sdk/x/gov/types/v1beta1"
	slashing "github.com/cosmos/cosmos-sdk/x/slashing/types"
	staking "github.com/cosmos/cosmos-sdk/x/staking/types"
)

var (
	// NormalMsgs are messages that can be submitted by external users.
	NormalMsgs = lib.MergeAllMapsMustHaveDistinctKeys(NormalMsgsDefault, NormalMsgsKlyraCustom)

	// Default modules
	NormalMsgsDefault = map[string]sdk.Msg{
		// auth
		"/cosmos.auth.v1beta1.BaseAccount":      nil,
		"/cosmos.auth.v1beta1.ModuleAccount":    nil,
		"/cosmos.auth.v1beta1.ModuleCredential": nil,

		// authz
		"/cosmos.authz.v1beta1.GenericAuthorization": nil,
		"/cosmos.authz.v1beta1.MsgGrant":             &authz.MsgGrant{},
		"/cosmos.authz.v1beta1.MsgGrantResponse":     nil,
		"/cosmos.authz.v1beta1.MsgRevoke":            &authz.MsgRevoke{},
		"/cosmos.authz.v1beta1.MsgRevokeResponse":    nil,

		// bank
		"/cosmos.bank.v1beta1.MsgMultiSend":         &bank.MsgMultiSend{},
		"/cosmos.bank.v1beta1.MsgMultiSendResponse": nil,
		"/cosmos.bank.v1beta1.MsgSend":              &bank.MsgSend{},
		"/cosmos.bank.v1beta1.MsgSendResponse":      nil,
		"/cosmos.bank.v1beta1.SendAuthorization":    nil,
		"/cosmos.bank.v1beta1.Supply":               nil,

		// consensus

		// crisis
		"/cosmos.crisis.v1beta1.MsgVerifyInvariant":         &crisis.MsgVerifyInvariant{},
		"/cosmos.crisis.v1beta1.MsgVerifyInvariantResponse": nil,

		// crypto
		"/cosmos.crypto.ed25519.PrivKey":            nil,
		"/cosmos.crypto.ed25519.PubKey":             nil,
		"/cosmos.crypto.multisig.LegacyAminoPubKey": nil,
		"/cosmos.crypto.secp256k1.PrivKey":          nil,
		"/cosmos.crypto.secp256k1.PubKey":           nil,
		"/cosmos.crypto.secp256r1.PubKey":           nil,

		// distribution
		"/cosmos.distribution.v1beta1.CommunityPoolSpendProposal":             nil,
		"/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool":         &distr.MsgDepositValidatorRewardsPool{},
		"/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPoolResponse": nil,
		"/cosmos.distribution.v1beta1.MsgFundCommunityPool":                   &distr.MsgFundCommunityPool{},
		"/cosmos.distribution.v1beta1.MsgFundCommunityPoolResponse":           nil,
		"/cosmos.distribution.v1beta1.MsgSetWithdrawAddress":                  &distr.MsgSetWithdrawAddress{},
		"/cosmos.distribution.v1beta1.MsgSetWithdrawAddressResponse":          nil,
		"/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward":             &distr.MsgWithdrawDelegatorReward{},
		"/cosmos.distribution.v1beta1.MsgWithdrawDelegatorRewardResponse":     nil,
		"/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission":         &distr.MsgWithdrawValidatorCommission{},
		"/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommissionResponse": nil,

		// evidence
		"/cosmos.evidence.v1beta1.Equivocation":              nil,
		"/cosmos.evidence.v1beta1.MsgSubmitEvidence":         &evidence.MsgSubmitEvidence{},
		"/cosmos.evidence.v1beta1.MsgSubmitEvidenceResponse": nil,

		// feegrant
		"/cosmos.feegrant.v1beta1.AllowedMsgAllowance":        nil,
		"/cosmos.feegrant.v1beta1.BasicAllowance":             nil,
		"/cosmos.feegrant.v1beta1.MsgGrantAllowance":          &feegrant.MsgGrantAllowance{},
		"/cosmos.feegrant.v1beta1.MsgGrantAllowanceResponse":  nil,
		"/cosmos.feegrant.v1beta1.MsgPruneAllowances":         &feegrant.MsgPruneAllowances{},
		"/cosmos.feegrant.v1beta1.MsgPruneAllowancesResponse": nil,
		"/cosmos.feegrant.v1beta1.MsgRevokeAllowance":         &feegrant.MsgRevokeAllowance{},
		"/cosmos.feegrant.v1beta1.MsgRevokeAllowanceResponse": nil,
		"/cosmos.feegrant.v1beta1.PeriodicAllowance":          nil,

		// gov
		"/cosmos.gov.v1.MsgDeposit":                   &gov.MsgDeposit{},
		"/cosmos.gov.v1.MsgDepositResponse":           nil,
		"/cosmos.gov.v1.MsgVote":                      &gov.MsgVote{},
		"/cosmos.gov.v1.MsgVoteResponse":              nil,
		"/cosmos.gov.v1.MsgVoteWeighted":              &gov.MsgVoteWeighted{},
		"/cosmos.gov.v1.MsgVoteWeightedResponse":      nil,
		"/cosmos.gov.v1beta1.MsgDeposit":              &govbeta.MsgDeposit{},
		"/cosmos.gov.v1beta1.MsgDepositResponse":      nil,
		"/cosmos.gov.v1beta1.MsgVote":                 &govbeta.MsgVote{},
		"/cosmos.gov.v1beta1.MsgVoteResponse":         nil,
		"/cosmos.gov.v1beta1.MsgVoteWeighted":         &govbeta.MsgVoteWeighted{},
		"/cosmos.gov.v1beta1.MsgVoteWeightedResponse": nil,
		"/cosmos.gov.v1beta1.TextProposal":            nil,

		// params
		"/cosmos.params.v1beta1.ParameterChangeProposal": nil,

		// slashing
		"/cosmos.slashing.v1beta1.MsgUnjail":         &slashing.MsgUnjail{},
		"/cosmos.slashing.v1beta1.MsgUnjailResponse": nil,

		// staking
		"/cosmos.staking.v1beta1.MsgBeginRedelegate":                   &staking.MsgBeginRedelegate{},
		"/cosmos.staking.v1beta1.MsgBeginRedelegateResponse":           nil,
		"/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation":         &staking.MsgCancelUnbondingDelegation{},
		"/cosmos.staking.v1beta1.MsgCancelUnbondingDelegationResponse": nil,
		"/cosmos.staking.v1beta1.MsgCreateValidator":                   &staking.MsgCreateValidator{},
		"/cosmos.staking.v1beta1.MsgCreateValidatorResponse":           nil,
		"/cosmos.staking.v1beta1.MsgDelegate":                          &staking.MsgDelegate{},
		"/cosmos.staking.v1beta1.MsgDelegateResponse":                  nil,
		"/cosmos.staking.v1beta1.MsgEditValidator":                     &staking.MsgEditValidator{},
		"/cosmos.staking.v1beta1.MsgEditValidatorResponse":             nil,
		"/cosmos.staking.v1beta1.MsgUndelegate":                        &staking.MsgUndelegate{},
		"/cosmos.staking.v1beta1.MsgUndelegateResponse":                nil,
		"/cosmos.staking.v1beta1.StakeAuthorization":                   nil,

		// tx
		"/cosmos.tx.v1beta1.Tx": nil,

		// upgrade
		"/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal": nil,
		"/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal":       nil,
	}

	// Custom modules
	NormalMsgsKlyraCustom = map[string]sdk.Msg{
		// bridge
		"/klyraprotocol.bridge.MsgBridgeWithdraw":         &bridge.MsgBridgeWithdraw{},
		"/klyraprotocol.bridge.MsgBridgeWithdrawResponse": nil,

		// clob
		"/klyraprotocol.clob.MsgBatchCancel":         &clob.MsgBatchCancel{},
		"/klyraprotocol.clob.MsgBatchCancelResponse": nil,
		"/klyraprotocol.clob.MsgCancelOrder":         &clob.MsgCancelOrder{},
		"/klyraprotocol.clob.MsgCancelOrderResponse": nil,
		"/klyraprotocol.clob.MsgPlaceOrder":          &clob.MsgPlaceOrder{},
		"/klyraprotocol.clob.MsgPlaceOrderResponse":  nil,

		// perpetuals

		// prices

		// sending
		"/klyraprotocol.sending.MsgCreateTransfer":                 &sending.MsgCreateTransfer{},
		"/klyraprotocol.sending.MsgCreateTransferResponse":         nil,
		"/klyraprotocol.sending.MsgDepositToSubaccount":            &sending.MsgDepositToSubaccount{},
		"/klyraprotocol.sending.MsgDepositToSubaccountResponse":    nil,
		"/klyraprotocol.sending.MsgWithdrawFromSubaccount":         &sending.MsgWithdrawFromSubaccount{},
		"/klyraprotocol.sending.MsgWithdrawFromSubaccountResponse": nil,

		// subaccounts
		"/klyraprotocol.subaccounts.MsgClaimYieldsForSubaccount":         &satypes.MsgClaimYieldsForSubaccount{},
		"/klyraprotocol.subaccounts.MsgClaimYieldsForSubaccountResponse": nil,
	}
)
