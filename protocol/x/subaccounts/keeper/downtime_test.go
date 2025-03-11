package keeper_test

import (
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	btkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime/types"
	sakeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/keeper"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

func TestGetChainOutageInfo(t *testing.T) {
	for testName, tc := range map[string]struct {
		// Setup.
		setupPreviousBlockInfo func(ctx sdk.Context, bk btkeeper.Keeper)
		setupOutageHeight      func(ctx sdk.Context, sk sakeeper.Keeper)

		// Expected.
		expectedIsChainOutage bool
		expectedBlockHeight   uint32
	}{
		"No previous outage and current block within duration returns false": {
			setupPreviousBlockInfo: func(ctx sdk.Context, bk btkeeper.Keeper) {
				bk.SetPreviousBlockInfo(ctx, &types.BlockInfo{
					Height:    100,
					Timestamp: time.Now(),
				})
			},
			setupOutageHeight: func(ctx sdk.Context, sk sakeeper.Keeper) {},

			expectedIsChainOutage: false,
			expectedBlockHeight:   0,
		},
		"Previous outage exists returns stored height": {
			setupPreviousBlockInfo: func(ctx sdk.Context, bk btkeeper.Keeper) {
				bk.SetPreviousBlockInfo(ctx, &types.BlockInfo{
					Height:    100,
					Timestamp: time.Now(),
				})
			},
			setupOutageHeight: func(ctx sdk.Context, sk sakeeper.Keeper) {
				sk.SetOutageHeight(ctx, 50)
			},

			expectedIsChainOutage: true,
			expectedBlockHeight:   50,
		},
		"Current block exceeds duration sets and returns new outage": {
			setupPreviousBlockInfo: func(ctx sdk.Context, bk btkeeper.Keeper) {
				bk.SetPreviousBlockInfo(ctx, &types.BlockInfo{
					Height:    100,
					Timestamp: time.Now().Add(-satypes.WITHDRAWAL_AND_TRANSFERS_BLOCKED_AFTER_CHAIN_OUTAGE_DURATION - time.Second),
				})
			},
			setupOutageHeight: func(ctx sdk.Context, sk sakeeper.Keeper) {},

			expectedIsChainOutage: true,
			expectedBlockHeight:   100,
		},
	} {
		t.Run(testName, func(t *testing.T) {
			ctx, keeper, _, _, _, _, _, _, blocktimeKeeper, _ := keepertest.SubaccountsKeepers(t, true)

			ctx = ctx.WithBlockTime(time.Now())

			// Setup test state
			tc.setupPreviousBlockInfo(ctx, *blocktimeKeeper)
			tc.setupOutageHeight(ctx, *keeper)

			// Run the test
			isChainOutage, blockHeight := keeper.GetOutageHeight(ctx)

			// Verify expectations
			require.Equal(t, tc.expectedIsChainOutage, isChainOutage)
			require.Equal(t, tc.expectedBlockHeight, blockHeight)
		})
	}
}

func TestSetAndGetOutageHeight(t *testing.T) {
	ctx, keeper, _, _, _, _, _, _, _, _ := keepertest.SubaccountsKeepers(t, true)

	// Test initial state
	isOutage, height := keeper.GetOutageHeight(ctx)
	require.False(t, isOutage)
	require.Equal(t, uint32(0), height)

	// Test setting and getting height
	testHeight := uint32(123)
	keeper.SetOutageHeight(ctx, testHeight)

	isOutage, height = keeper.GetOutageHeight(ctx)
	require.True(t, isOutage)
	require.Equal(t, testHeight, height)
}
