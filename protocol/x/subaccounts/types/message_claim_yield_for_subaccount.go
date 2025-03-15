package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ sdk.Msg = &MsgClaimYieldsForSubaccount{}

// ValidateBasic runs validation on the fields of a MsgClaimYieldsForSubaccount.
func (msg *MsgClaimYieldsForSubaccount) ValidateBasic() error {
	return msg.Id.Validate()
}
