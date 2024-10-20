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

		// params
		"/cosmos.params.v1beta1.ParameterChangeProposal",

		// slashing
		"/cosmos.slashing.v1beta1.MsgUnjail",
		"/cosmos.slashing.v1beta1.MsgUnjailResponse",

		// tx
		"/cosmos.tx.v1beta1.Tx",

		// upgrade
		"/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal",
		"/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal",

		// clob
		"/dydxprotocol.clob.MsgBatchCancel",
		"/dydxprotocol.clob.MsgBatchCancelResponse",
		"/dydxprotocol.clob.MsgCancelOrder",
		"/dydxprotocol.clob.MsgCancelOrderResponse",
		"/dydxprotocol.clob.MsgPlaceOrder",
		"/dydxprotocol.clob.MsgPlaceOrderResponse",

		// perpetuals

		// prices

		// sending
		"/dydxprotocol.sending.MsgCreateTransfer",
		"/dydxprotocol.sending.MsgCreateTransferResponse",
		"/dydxprotocol.sending.MsgDepositToSubaccount",
		"/dydxprotocol.sending.MsgDepositToSubaccountResponse",
		"/dydxprotocol.sending.MsgWithdrawFromSubaccount",
		"/dydxprotocol.sending.MsgWithdrawFromSubaccountResponse",

		// subaccounts
		"/dydxprotocol.subaccounts.MsgClaimYieldForSubaccount",
		"/dydxprotocol.subaccounts.MsgClaimYieldForSubaccountResponse",

		// ibc application module: ICA
		"/ibc.applications.interchain_accounts.v1.InterchainAccount",

		// ibc.applications
		"/ibc.applications.transfer.v1.MsgTransfer",
		"/ibc.applications.transfer.v1.MsgTransferResponse",
		"/ibc.applications.transfer.v1.TransferAuthorization",

		// ibc.core.channel
		"/ibc.core.channel.v1.Channel",
		"/ibc.core.channel.v1.Counterparty",
		"/ibc.core.channel.v1.MsgAcknowledgement",
		"/ibc.core.channel.v1.MsgAcknowledgementResponse",
		"/ibc.core.channel.v1.MsgChannelCloseConfirm",
		"/ibc.core.channel.v1.MsgChannelCloseConfirmResponse",
		"/ibc.core.channel.v1.MsgChannelCloseInit",
		"/ibc.core.channel.v1.MsgChannelCloseInitResponse",
		"/ibc.core.channel.v1.MsgChannelOpenAck",
		"/ibc.core.channel.v1.MsgChannelOpenAckResponse",
		"/ibc.core.channel.v1.MsgChannelOpenConfirm",
		"/ibc.core.channel.v1.MsgChannelOpenConfirmResponse",
		"/ibc.core.channel.v1.MsgChannelOpenInit",
		"/ibc.core.channel.v1.MsgChannelOpenInitResponse",
		"/ibc.core.channel.v1.MsgChannelOpenTry",
		"/ibc.core.channel.v1.MsgChannelOpenTryResponse",
		"/ibc.core.channel.v1.MsgChannelUpgradeAck",
		"/ibc.core.channel.v1.MsgChannelUpgradeAckResponse",
		"/ibc.core.channel.v1.MsgChannelUpgradeCancel",
		"/ibc.core.channel.v1.MsgChannelUpgradeCancelResponse",
		"/ibc.core.channel.v1.MsgChannelUpgradeConfirm",
		"/ibc.core.channel.v1.MsgChannelUpgradeConfirmResponse",
		"/ibc.core.channel.v1.MsgChannelUpgradeInit",
		"/ibc.core.channel.v1.MsgChannelUpgradeInitResponse",
		"/ibc.core.channel.v1.MsgChannelUpgradeOpen",
		"/ibc.core.channel.v1.MsgChannelUpgradeOpenResponse",
		"/ibc.core.channel.v1.MsgChannelUpgradeTimeout",
		"/ibc.core.channel.v1.MsgChannelUpgradeTimeoutResponse",
		"/ibc.core.channel.v1.MsgChannelUpgradeTry",
		"/ibc.core.channel.v1.MsgChannelUpgradeTryResponse",
		"/ibc.core.channel.v1.MsgPruneAcknowledgements",
		"/ibc.core.channel.v1.MsgPruneAcknowledgementsResponse",
		"/ibc.core.channel.v1.MsgRecvPacket",
		"/ibc.core.channel.v1.MsgRecvPacketResponse",
		"/ibc.core.channel.v1.MsgTimeout",
		"/ibc.core.channel.v1.MsgTimeoutOnClose",
		"/ibc.core.channel.v1.MsgTimeoutOnCloseResponse",
		"/ibc.core.channel.v1.MsgTimeoutResponse",
		"/ibc.core.channel.v1.MsgUpdateParams",
		"/ibc.core.channel.v1.MsgUpdateParamsResponse",
		"/ibc.core.channel.v1.Packet",

		// ibc.core.client
		"/ibc.core.client.v1.ClientUpdateProposal",
		"/ibc.core.client.v1.Height",
		"/ibc.core.client.v1.MsgCreateClient",
		"/ibc.core.client.v1.MsgCreateClientResponse",
		"/ibc.core.client.v1.MsgIBCSoftwareUpgrade",
		"/ibc.core.client.v1.MsgIBCSoftwareUpgradeResponse",
		"/ibc.core.client.v1.MsgRecoverClient",
		"/ibc.core.client.v1.MsgRecoverClientResponse",
		"/ibc.core.client.v1.MsgSubmitMisbehaviour",
		"/ibc.core.client.v1.MsgSubmitMisbehaviourResponse",
		"/ibc.core.client.v1.MsgUpdateClient",
		"/ibc.core.client.v1.MsgUpdateClientResponse",
		"/ibc.core.client.v1.MsgUpgradeClient",
		"/ibc.core.client.v1.MsgUpgradeClientResponse",
		"/ibc.core.client.v1.UpgradeProposal",

		// ibc.core.commitment
		"/ibc.core.commitment.v1.MerklePath",
		"/ibc.core.commitment.v1.MerklePrefix",
		"/ibc.core.commitment.v1.MerkleProof",
		"/ibc.core.commitment.v1.MerkleRoot",

		// ibc.core.connection
		"/ibc.core.connection.v1.ConnectionEnd",
		"/ibc.core.connection.v1.Counterparty",
		"/ibc.core.connection.v1.MsgConnectionOpenAck",
		"/ibc.core.connection.v1.MsgConnectionOpenAckResponse",
		"/ibc.core.connection.v1.MsgConnectionOpenConfirm",
		"/ibc.core.connection.v1.MsgConnectionOpenConfirmResponse",
		"/ibc.core.connection.v1.MsgConnectionOpenInit",
		"/ibc.core.connection.v1.MsgConnectionOpenInitResponse",
		"/ibc.core.connection.v1.MsgConnectionOpenTry",
		"/ibc.core.connection.v1.MsgConnectionOpenTryResponse",

		// ibc.lightclients
		"/ibc.lightclients.localhost.v2.ClientState",
		"/ibc.lightclients.tendermint.v1.ClientState",
		"/ibc.lightclients.tendermint.v1.ConsensusState",
		"/ibc.lightclients.tendermint.v1.Header",
		"/ibc.lightclients.tendermint.v1.Misbehaviour",
	}

	require.Equal(t, expectedMsgs, lib.GetSortedKeys[sort.StringSlice](msgs.NormalMsgs))
}

func TestNormalMsgs_Value(t *testing.T) {
	validateMsgValue(t, msgs.NormalMsgs)
}
