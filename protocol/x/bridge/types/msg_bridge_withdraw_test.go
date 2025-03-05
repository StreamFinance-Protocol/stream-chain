package types_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	"github.com/stretchr/testify/require"
)

func TestMsgBridgeWithdraw_ValidateBasic(t *testing.T) {
	tests := map[string]struct {
		msg         types.MsgBridgeWithdraw
		expectedErr error
	}{
		"Success: 1 sdai": {
			msg: constants.MsgBridgeWithdraw_1SDai,
		},
		"Success: larger sdai amount": {
			msg: constants.MsgBridgeWithdraw_LargerSDaiAmount,
		},
		"Failure: invalid address": {
			msg:         constants.MsgBridgeWithdraw_InvalidAddress,
			expectedErr: types.ErrInvalidWithdrawAccount,
		},
		"Failure: malformed Sdai amount": {
			msg:         constants.MsgBridgeWithdraw_MalformedSDaiAmount,
			expectedErr: types.ErrInvalidWithdrawSdaiAmount,
		},
		"Failure: Sdai amount is zero": {
			msg:         constants.MsgBridgeWithdraw_ZeroSDaiAmount,
			expectedErr: types.ErrInvalidWithdrawSdaiAmount,
		},
		"Failure: Sdai amount is less than zero": {
			msg:         constants.MsgBridgeWithdraw_NegativeSDaiAmount,
			expectedErr: types.ErrInvalidWithdrawSdaiAmount,
		},
		"Failure: Sdai amount is not an integer": {
			msg:         constants.MsgBridgeWithdraw_NonIntegerSDaiAmount,
			expectedErr: types.ErrInvalidWithdrawSdaiAmount,
		},
		"Failure: Eth address is empty": {
			msg:         constants.MsgBridgeWithdraw_EmptyEthAddress,
			expectedErr: types.ErrInvalidEthAddress,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			err := tc.msg.ValidateBasic()
			if tc.expectedErr == nil {
				require.NoError(t, err)
			} else {
				require.ErrorIs(t, err, tc.expectedErr)
			}
		})
	}
}
