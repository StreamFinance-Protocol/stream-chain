package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ sdk.Msg = &MsgClaimYieldForSubaccount{}

// ValidateBasic runs validation on the fields of a MsgClaimYieldForSubaccount.
func (msg *MsgClaimYieldForSubaccount) ValidateBasic() error {
	return msg.Id.Validate()
}
