package keeper_test

import (
	"fmt"
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	"github.com/stretchr/testify/require"
)

func TestMsgServerBridgeWithdraw(t *testing.T) {
	_, ms, ctx := setupMsgServer(t)

	tests := map[string]struct {
		testMsg      types.MsgBridgeWithdraw
		expectedResp *types.MsgBridgeWithdrawResponse
		expectedErr  string
	}{
		"Success: withdrawing one sdai": {
			testMsg:      constants.MsgBridgeWithdraw_1SDai,
			expectedResp: &types.MsgBridgeWithdrawResponse{},
		},
		"Success: withdrawing larger sdai amount": {
			testMsg:      constants.MsgBridgeWithdraw_LargerSDaiAmount,
			expectedResp: &types.MsgBridgeWithdrawResponse{},
		},
		"Failure: invalid address": {
			testMsg:     constants.MsgBridgeWithdraw_InvalidAddress,
			expectedErr: "decoding bech32 failed",
		},
		"Failure: malformed Sdai amount": {
			testMsg:     constants.MsgBridgeWithdraw_MalformedSDaiAmount,
			expectedErr: "Sdai amount cannot be parsed",
		},
		"Failure: Sdai amount is zero": {
			testMsg:     constants.MsgBridgeWithdraw_ZeroSDaiAmount,
			expectedErr: "Sdai amount must be greater than zero",
		},
		"Failure: Sdai amount is less than zero": {
			testMsg:     constants.MsgBridgeWithdraw_NegativeSDaiAmount,
			expectedErr: "Sdai amount must be greater than zero",
		},
		"Failure: Sdai amount is not an integer": {
			testMsg:     constants.MsgBridgeWithdraw_NonIntegerSDaiAmount,
			expectedErr: "Sdai amount cannot be parsed",
		},
		"Failure: Eth address is empty": {
			testMsg:     constants.MsgBridgeWithdraw_EmptyEthAddress,
			expectedErr: "Invalid Ethereum address",
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			resp, err := ms.BridgeWithdraw(ctx, &tc.testMsg)
			fmt.Println("resp", resp)
			fmt.Println("err", err)

			require.Equal(t, tc.expectedResp, resp)
			if tc.expectedErr != "" {
				require.ErrorContains(t, err, tc.expectedErr)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
