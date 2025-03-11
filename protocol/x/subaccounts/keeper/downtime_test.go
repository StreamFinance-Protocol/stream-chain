package keeper_test

import (
	"testing"
	"time"

	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	sakeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/keeper"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

func TestCheckForChainOutage(t *testing.T) {
	for testName, tc := range map[string]struct {
		// Setup.
		setupOutageHeight func(ctx sdk.Context, sk sakeeper.Keeper)
		firstTimestamp    time.Time
		secondTimestamp   time.Time

		// Expected.
		expectedIsChainOutage bool
		expectedBlockHeight   uint32
	}{
		"No previous outage and current block within duration returns false": {
			firstTimestamp:    time.Unix(1, 0),
			secondTimestamp:   time.Unix(1, 0),
			setupOutageHeight: func(ctx sdk.Context, sk sakeeper.Keeper) {},

			expectedIsChainOutage: false,
			expectedBlockHeight:   0,
		},
		"Previous outage exists returns stored height": {
			firstTimestamp:  time.Unix(1, 0),
			secondTimestamp: time.Unix(1, 0),
			setupOutageHeight: func(ctx sdk.Context, sk sakeeper.Keeper) {
				sk.SetOutageHeight(ctx, 50)
			},

			expectedIsChainOutage: true,
			expectedBlockHeight:   50,
		},
		"Current block exceeds duration sets and returns new outage": {
			firstTimestamp:    time.Unix(1, 0),
			secondTimestamp:   time.Unix(1, 0).Add(satypes.WITHDRAWAL_AND_TRANSFERS_BLOCKED_AFTER_CHAIN_OUTAGE_DURATION + time.Second),
			setupOutageHeight: func(ctx sdk.Context, sk sakeeper.Keeper) {},

			expectedIsChainOutage: true,
			expectedBlockHeight:   2,
		},
	} {
		t.Run(testName, func(t *testing.T) {
			tApp := testapp.NewTestAppBuilder(t).Build()
			tApp.InitChain()
			ctx := tApp.AdvanceToBlock(2, testapp.AdvanceToBlockOptions{
				BlockTime: tc.firstTimestamp,
			})

			ctx = tApp.AdvanceToBlock(3, testapp.AdvanceToBlockOptions{
				BlockTime: tc.secondTimestamp,
			})

			tc.setupOutageHeight(ctx, tApp.App.SubaccountsKeeper)

			// Run the test
			isChainOutage, blockHeight := tApp.App.SubaccountsKeeper.GetOutageHeight(ctx)

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
