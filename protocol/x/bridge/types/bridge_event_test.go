package types_test

import (
	"testing"

	sdkmath "cosmossdk.io/math"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func TestBridgeEvent_Equal(t *testing.T) {
	tests := map[string]struct {
		a   types.BridgeEvent
		b   types.BridgeEvent
		res bool
	}{
		"Equal": {
			a: types.BridgeEvent{
				Id:          1,
				Coin:        sdk.NewCoin("test", sdkmath.NewInt(17)),
				Address:     "address",
				BlockHeight: 128,
				IsDeposit:   true,
			},
			b: types.BridgeEvent{
				Id:          1,
				Coin:        sdk.NewCoin("test", sdkmath.NewInt(17)),
				Address:     "address",
				BlockHeight: 128,
				IsDeposit:   true,
			},
			res: true,
		},
		"Id not equal": {
			a: types.BridgeEvent{
				Id:          1,
				Coin:        sdk.NewCoin("test", sdkmath.NewInt(17)),
				Address:     "address",
				BlockHeight: 128,
				IsDeposit:   true,
			},
			b: types.BridgeEvent{
				Id:          2,
				Coin:        sdk.NewCoin("test", sdkmath.NewInt(17)),
				Address:     "address",
				BlockHeight: 128,
				IsDeposit:   true,
			},
			res: false,
		},
		"Coin denom not equal": {
			a: types.BridgeEvent{
				Id:          10,
				Coin:        sdk.NewCoin("test", sdkmath.NewInt(171)),
				Address:     "address",
				BlockHeight: 1280,
				IsDeposit:   true,
			},
			b: types.BridgeEvent{
				Id:          10,
				Coin:        sdk.NewCoin("test2", sdkmath.NewInt(171)),
				Address:     "address",
				BlockHeight: 1280,
				IsDeposit:   true,
			},
			res: false,
		},
		"Coin amount not equal": {
			a: types.BridgeEvent{
				Id:          10,
				Coin:        sdk.NewCoin("test", sdkmath.NewInt(171)),
				Address:     "address",
				BlockHeight: 1280,
				IsDeposit:   true,
			},
			b: types.BridgeEvent{
				Id:          10,
				Coin:        sdk.NewCoin("test", sdkmath.NewInt(1711)),
				Address:     "address",
				BlockHeight: 1280,
				IsDeposit:   true,
			},
			res: false,
		},
		"Address not equal": {
			a: types.BridgeEvent{
				Id:          10,
				Coin:        sdk.NewCoin("test", sdkmath.NewInt(171)),
				Address:     "address",
				BlockHeight: 1280,
				IsDeposit:   true,
			},
			b: types.BridgeEvent{
				Id:          10,
				Coin:        sdk.NewCoin("test", sdkmath.NewInt(1711)),
				Address:     "address1",
				BlockHeight: 1280,
				IsDeposit:   true,
			},
			res: false,
		},
		"Eth block height not equal": {
			a: types.BridgeEvent{
				Id:          10,
				Coin:        sdk.NewCoin("test", sdkmath.NewInt(171)),
				Address:     "address",
				BlockHeight: 1280,
				IsDeposit:   true,
			},
			b: types.BridgeEvent{
				Id:          10,
				Coin:        sdk.NewCoin("test", sdkmath.NewInt(1711)),
				Address:     "address",
				BlockHeight: 1281,
				IsDeposit:   true,
			},
			res: false,
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			require.Equal(t, tc.res, tc.a.Equal(tc.b))
		})
	}
}
