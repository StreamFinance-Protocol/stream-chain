package types

import (
	"math/big"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ sdk.Msg = &MsgBridgeWithdraw{}

func NewMsgBridgeWithdraw(withdraw BridgeWithdraw) *MsgBridgeWithdraw {
	return &MsgBridgeWithdraw{
		Withdraw: withdraw,
	}
}

func (msg *MsgBridgeWithdraw) ValidateBasic() (err error) {

	if _, err := sdk.AccAddressFromBech32(msg.Withdraw.Account); err != nil {
		return errorsmod.Wrapf(ErrInvalidWithdrawAccount,
			"invalid SubaccountId Owner address (%s). Error: (%s)", msg.Withdraw.Account, err)
	}

	err = EthAddress(msg.Withdraw.EthRecipient).Validate()
	if err != nil {
		return err
	}

	sdaiAmount, ok := new(big.Int).SetString(msg.Withdraw.SdaiAmount, 10)
	if !ok {
		return errorsmod.Wrapf(ErrInvalidWithdrawSdaiAmount, "Sdai amount cannot be parsed.")
	}

	if sdaiAmount.Cmp(big.NewInt(0)) == 0 {
		return errorsmod.Wrapf(ErrInvalidWithdrawSdaiAmount, "Sdai amount cannot be 0.")
	}

	return nil
}
