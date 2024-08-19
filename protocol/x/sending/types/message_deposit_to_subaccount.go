package types

import (
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ sdk.Msg = &MsgDepositToSubaccount{}

// NewMsgDepositToSubaccount constructs a `MsgDepositToSubaccount` from an
// `x/bank` account sender, an `x/subaccounts` subaccount sender, an asset ID,
// and a number of quantums.
func NewMsgDepositToSubaccount(
	sender string,
	recipient satypes.SubaccountId,
	assetId uint32,
	quantums dtypes.SerializableInt,
) *MsgDepositToSubaccount {
	return &MsgDepositToSubaccount{
		Sender:    sender,
		Recipient: recipient,
		AssetId:   assetId,
		Quantums:  quantums,
	}
}

// ValidateBasic runs validation on the fields of a MsgDepositToSubaccount.
func (msg *MsgDepositToSubaccount) ValidateBasic() error {
	// Validate account sender.
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return ErrInvalidAccountAddress
	}

	// Validate subaccount recipient.
	if err := msg.Recipient.Validate(); err != nil {
		return err
	}

	// Validate that asset is USDC.
	if msg.AssetId != assettypes.AssetUsdc.Id {
		return ErrNonUsdcAssetTransferNotImplemented
	}

	// Validate that quantums is not zero or negative.
	if msg.Quantums.Cmp(dtypes.NewInt(0)) <= 0 {
		return ErrInvalidTransferAmount
	}

	return nil
}
