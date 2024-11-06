package events

import (
	v1 "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/protocol/v1"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

// NewTransferEvent creates a TransferEvent representing a transfer of an asset between a sender
// and recipient subaccount.
func NewTransferEvent(
	senderSubaccountId satypes.SubaccountId,
	recipientSubaccountId satypes.SubaccountId,
	assetId uint32,
	amount satypes.BaseQuantums,
) *TransferEventV1 {
	indexerSenderSubaccountId := v1.SubaccountIdToIndexerSubaccountId(senderSubaccountId)
	indexerecipientSubaccountId := v1.SubaccountIdToIndexerSubaccountId(recipientSubaccountId)
	return &TransferEventV1{
		SenderSubaccountId:    &indexerSenderSubaccountId,
		RecipientSubaccountId: &indexerecipientSubaccountId,
		Sender: &SourceOfFunds{
			Source: &SourceOfFunds_SubaccountId{
				SubaccountId: &indexerSenderSubaccountId,
			},
		},
		Recipient: &SourceOfFunds{
			Source: &SourceOfFunds_SubaccountId{
				SubaccountId: &indexerecipientSubaccountId,
			},
		},
		AssetId: assetId,
		Amount:  amount.ToUint64(),
	}
}

// NewDepositEvent creates a DepositEvent representing a deposit of an asset from a sender
// wallet address to a recipient subaccount.
func NewDepositEvent(
	senderAddress string,
	recipientSubaccountId satypes.SubaccountId,
	assetId uint32,
	amount satypes.BaseQuantums,
) *TransferEventV1 {
	indexerecipientSubaccountId := v1.SubaccountIdToIndexerSubaccountId(recipientSubaccountId)
	return &TransferEventV1{
		AssetId: assetId,
		Amount:  amount.ToUint64(),
		Sender: &SourceOfFunds{
			Source: &SourceOfFunds_Address{
				Address: senderAddress,
			},
		},
		Recipient: &SourceOfFunds{
			Source: &SourceOfFunds_SubaccountId{
				SubaccountId: &indexerecipientSubaccountId,
			},
		},
	}
}

// NewWithdrawEvent creates a WithdrawEvent representing a withdrawal of an asset from a sender
// subaccount to a recipient wallet address.
func NewWithdrawEvent(
	senderSubaccountId satypes.SubaccountId,
	recipientAddress string,
	assetId uint32,
	amount satypes.BaseQuantums,
) *TransferEventV1 {
	indexerSenderSubaccountId := v1.SubaccountIdToIndexerSubaccountId(senderSubaccountId)
	return &TransferEventV1{
		AssetId: assetId,
		Amount:  amount.ToUint64(),
		Sender: &SourceOfFunds{
			Source: &SourceOfFunds_SubaccountId{
				SubaccountId: &indexerSenderSubaccountId,
			},
		},
		Recipient: &SourceOfFunds{
			Source: &SourceOfFunds_Address{
				Address: recipientAddress,
			},
		},
	}
}
