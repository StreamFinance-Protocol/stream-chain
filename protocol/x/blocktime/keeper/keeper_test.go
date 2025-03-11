package keeper_test

import (
	"testing"
	"time"

	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime/types"
	"github.com/stretchr/testify/require"
)

func TestLogger(t *testing.T) {
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()

	logger := tApp.App.BlockTimeKeeper.Logger(ctx)
	require.NotNil(t, logger)
}

func TestGetPreviousBlockInfo(t *testing.T) {
	// Create a new keeper instance and context
	tApp := testapp.NewTestAppBuilder(t).Build()
	tApp.InitChain()
	ctx := tApp.AdvanceToBlock(2, testapp.AdvanceToBlockOptions{})
	k := tApp.App.BlockTimeKeeper

	// Create a random BlockInfo object
	expectedBlockInfo := &types.BlockInfo{
		Timestamp: time.Now(),
		Height:    2,
	}

	// Set the previous block info in the store
	k.SetPreviousBlockInfo(ctx, expectedBlockInfo)

	// Retrieve the previous block info
	retrievedBlockInfo := k.GetPreviousBlockInfo(ctx)

	// Assertions
	require.NotNil(t, retrievedBlockInfo)
	require.True(t, expectedBlockInfo.Timestamp.Equal(retrievedBlockInfo.Timestamp), "Timestamps should be equal")
	require.Equal(t, expectedBlockInfo.Height, retrievedBlockInfo.Height)
}
