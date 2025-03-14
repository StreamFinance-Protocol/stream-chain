package indexer_manager_test

import (
	"testing"

	storetypes "cosmossdk.io/store/types"
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/sdk"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

var ExpectedEvent1 = indexer_manager.IndexerTendermintEvent{
	Subtype: indexerevents.SubtypeSubaccountUpdate,
	OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_TransactionIndex{
		TransactionIndex: 0,
	},
	EventIndex: 1,
	Version:    indexerevents.SubaccountUpdateEventVersion,
	DataBytes: indexer_manager.GetBytes(
		&SubaccountEvent,
	),
}

var ExpectedEvent2 = indexer_manager.IndexerTendermintEvent{
	Subtype: indexerevents.SubtypeTransfer,
	OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_TransactionIndex{
		TransactionIndex: 1,
	},
	EventIndex: 0,
	Version:    indexerevents.TransferEventVersion,
	DataBytes: indexer_manager.GetBytes(
		&TransferEvent,
	),
}

var ExpectedEvent3 = indexer_manager.IndexerTendermintEvent{
	Subtype: indexerevents.SubtypeFundingValues,
	OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_BlockEvent_{
		BlockEvent: indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_END_BLOCK,
	},
	EventIndex: 0,
	Version:    indexerevents.FundingValuesEventVersion,
	DataBytes: indexer_manager.GetBytes(
		&FundingRateAndIndexEvent,
	),
}

var ExpectedEvent4 = indexer_manager.IndexerTendermintEvent{
	Subtype: indexerevents.SubtypeFundingValues,
	OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_BlockEvent_{
		BlockEvent: indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_END_BLOCK,
	},
	EventIndex: 1,
	Version:    indexerevents.FundingValuesEventVersion,
	DataBytes: indexer_manager.GetBytes(
		&FundingPremiumSampleEvent,
	),
}

var ExpectedEvent5 = indexer_manager.IndexerTendermintEvent{
	Subtype: indexerevents.SubtypeFundingValues,
	OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_BlockEvent_{
		BlockEvent: indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_BEGIN_BLOCK,
	},
	EventIndex: 0,
	Version:    indexerevents.FundingValuesEventVersion,
	DataBytes: indexer_manager.GetBytes(
		&FundingPremiumSampleEvent,
	),
}

var ExpectedEvent6 = indexer_manager.IndexerTendermintEvent{
	Subtype: indexerevents.SubtypeFundingValues,
	OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_BlockEvent_{
		BlockEvent: indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_BEGIN_BLOCK,
	},
	EventIndex: 1,
	Version:    indexerevents.FundingValuesEventVersion,
	DataBytes: indexer_manager.GetBytes(
		&FundingRateAndIndexEvent,
	),
}

var EventVersion uint32 = 1

func createMockSender(enabled bool) *mocks.IndexerMessageSender {
	mockSender := &mocks.IndexerMessageSender{}
	mockSender.On("Enabled").Return(enabled)
	mockSender.On("SendOnchainData", mock.Anything).Return(nil)
	return mockSender
}

func TestSendOnchainData(t *testing.T) {
	storeKey := storetypes.NewTransientStoreKey(indexer_manager.TransientStoreKey)
	indexerTendermintBlock := &indexer_manager.IndexerTendermintBlock{}

	mockSender1 := createMockSender(true)
	mockSender2 := createMockSender(true)

	indexerEventManager := indexer_manager.NewIndexerEventManager(
		storeKey,
		[]indexer_manager.SenderWithKey{
			{Key: "sender1", Sender: mockSender1},
			{Key: "sender2", Sender: mockSender2},
		},
	)

	indexerEventManager.SendOnchainData(indexerTendermintBlock)
	mockSender1.AssertExpectations(t)
	mockSender2.AssertExpectations(t)
}

func TestSubscriptionManagement(t *testing.T) {
	storeKey := storetypes.NewTransientStoreKey(indexer_manager.TransientStoreKey)
	indexerEventManager := indexer_manager.NewIndexerEventManager(storeKey, nil)

	mockSender1 := createMockSender(true)
	mockSender2 := createMockSender(false)

	// Test Subscribe
	err := indexerEventManager.Subscribe("sender1", mockSender1)
	require.NoError(t, err)
	require.True(t, indexerEventManager.IsEnabled("sender1"))

	// Test duplicate subscription
	err = indexerEventManager.Subscribe("sender1", mockSender1)
	require.Error(t, err)

	// Test second subscription
	err = indexerEventManager.Subscribe("sender2", mockSender2)
	require.NoError(t, err)
	require.False(t, indexerEventManager.IsEnabled("sender2"))

	// Test Unsubscribe
	err = indexerEventManager.Unsubscribe("sender1")
	require.NoError(t, err)
	require.False(t, indexerEventManager.IsEnabled("sender1"))

	// Test unsubscribe non-existent
	err = indexerEventManager.Unsubscribe("non-existent")
	require.Error(t, err)
}

func TestProduceBlockBasicTxnEvent(t *testing.T) {
	ctx, stateStore, db := sdk.NewSdkContextWithMultistore()
	storeKey := storetypes.NewTransientStoreKey(indexer_manager.TransientStoreKey)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeTransient, db)
	ctx = ctx.WithBlockTime(BlockTime).WithBlockHeight(BlockHeight).WithTxBytes(constants.TestTxBytes)
	ctx.GasMeter().ConsumeGas(ConsumedGas, "beforeWrite")
	require.NoError(t, stateStore.LoadLatestVersion())

	mockSender := createMockSender(true)
	indexerEventManager := indexer_manager.NewIndexerEventManager(
		storeKey,
		[]indexer_manager.SenderWithKey{{Key: "sender1", Sender: mockSender}},
	)

	indexerEventManager.AddTxnEvent(
		ctx,
		indexerevents.SubtypeSubaccountUpdate,
		EventVersion,
		indexer_manager.GetBytes(&SubaccountEvent),
	)

	block := indexerEventManager.ProduceBlock(ctx)
	require.Len(t, block.Events, 1)
	require.Equal(t, ExpectedEvent1, *block.Events[0])
	require.Equal(t, []string{string(constants.TestTxHashString)}, block.TxHashes)
	require.Equal(t, uint32(BlockHeight), block.Height)
	require.Equal(t, BlockTime, block.Time)
	require.Equal(t, ConsumedGas, ctx.GasMeter().GasConsumed())
}

func TestProduceBlockWithMultipleSenders(t *testing.T) {
	ctx, stateStore, db := sdk.NewSdkContextWithMultistore()
	storeKey := storetypes.NewTransientStoreKey(indexer_manager.TransientStoreKey)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeTransient, db)
	ctx = ctx.WithBlockTime(BlockTime).WithBlockHeight(BlockHeight).WithTxBytes(constants.TestTxBytes)
	ctx.GasMeter().ConsumeGas(ConsumedGas, "beforeWrite")
	require.NoError(t, stateStore.LoadLatestVersion())

	mockSender1 := createMockSender(true)
	mockSender2 := createMockSender(false)

	indexerEventManager := indexer_manager.NewIndexerEventManager(
		storeKey,
		[]indexer_manager.SenderWithKey{
			{Key: "sender1", Sender: mockSender1},
			{Key: "sender2", Sender: mockSender2},
		},
	)

	indexerEventManager.AddTxnEvent(
		ctx,
		indexerevents.SubtypeSubaccountUpdate,
		EventVersion,
		indexer_manager.GetBytes(&SubaccountEvent),
	)

	block := indexerEventManager.ProduceBlock(ctx)
	require.Len(t, block.Events, 1)
	require.Equal(t, ExpectedEvent1, *block.Events[0])
	require.Equal(t, []string{string(constants.TestTxHashString)}, block.TxHashes)
	require.Equal(t, uint32(BlockHeight), block.Height)
	require.Equal(t, BlockTime, block.Time)
	require.Equal(t, ConsumedGas, ctx.GasMeter().GasConsumed())

	mockSender1.AssertExpectations(t)
	mockSender2.AssertExpectations(t)
}

func TestProduceBlockBasicBlockEvent(t *testing.T) {
	ctx, stateStore, db := sdk.NewSdkContextWithMultistore()
	storeKey := storetypes.NewTransientStoreKey(indexer_manager.TransientStoreKey)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeTransient, db)
	ctx = ctx.WithBlockTime(BlockTime).WithBlockHeight(BlockHeight)
	ctx.GasMeter().ConsumeGas(ConsumedGas, "beforeWrite")
	require.NoError(t, stateStore.LoadLatestVersion())

	mockSender := createMockSender(true)
	indexerEventManager := indexer_manager.NewIndexerEventManager(
		storeKey,
		[]indexer_manager.SenderWithKey{{Key: "sender1", Sender: mockSender}},
	)

	indexerEventManager.AddBlockEvent(
		ctx,
		indexerevents.SubtypeFundingValues,
		indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_END_BLOCK,
		EventVersion,
		indexer_manager.GetBytes(&FundingRateAndIndexEvent),
	)

	block := indexerEventManager.ProduceBlock(ctx)
	require.Len(t, block.Events, 1)
	require.Equal(t, ExpectedEvent3, *block.Events[0])
	require.Empty(t, block.TxHashes)
	require.Equal(t, uint32(BlockHeight), block.Height)
	require.Equal(t, BlockTime, block.Time)
	require.Equal(t, ConsumedGas, ctx.GasMeter().GasConsumed())
}

func TestProduceBlockMultipleTxnEvents(t *testing.T) {
	ctx, stateStore, db := sdk.NewSdkContextWithMultistore()
	storeKey := storetypes.NewTransientStoreKey(indexer_manager.TransientStoreKey)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeTransient, db)
	ctx = ctx.WithBlockTime(BlockTime).WithBlockHeight(BlockHeight).WithTxBytes(constants.TestTxBytes)
	ctx.GasMeter().ConsumeGas(ConsumedGas, "beforeWrite")
	require.NoError(t, stateStore.LoadLatestVersion())

	mockSender := createMockSender(true)
	indexerEventManager := indexer_manager.NewIndexerEventManager(
		storeKey,
		[]indexer_manager.SenderWithKey{{Key: "sender1", Sender: mockSender}},
	)

	indexerEventManager.AddTxnEvent(
		ctx,
		indexerevents.SubtypeSubaccountUpdate,
		EventVersion,
		indexer_manager.GetBytes(&SubaccountEvent),
	)
	indexerEventManager.AddTxnEvent(
		ctx,
		indexerevents.SubtypeSubaccountUpdate,
		EventVersion,
		indexer_manager.GetBytes(&SubaccountEvent),
	)
	ctx = ctx.WithTxBytes(constants.TestTxBytes1)
	indexerEventManager.AddTxnEvent(
		ctx,
		indexerevents.SubtypeTransfer,
		EventVersion,
		indexer_manager.GetBytes(&TransferEvent),
	)

	block := indexerEventManager.ProduceBlock(ctx)
	require.Len(t, block.Events, 3)
	require.Equal(t, ExpectedEvent1, *block.Events[0])
	require.Equal(t, ExpectedEvent1, *block.Events[1])
	require.Equal(t, ExpectedEvent2, *block.Events[2])
	require.Equal(t, []string{
		string(constants.TestTxHashString),
		string(constants.TestTxHashString1),
	}, block.TxHashes)
	require.Equal(t, uint32(BlockHeight), block.Height)
	require.Equal(t, BlockTime, block.Time)
	require.Equal(t, ConsumedGas, ctx.GasMeter().GasConsumed())
}

func TestProduceBlockMultipleTxnAndBlockEvents(t *testing.T) {
	ctx, stateStore, db := sdk.NewSdkContextWithMultistore()
	storeKey := storetypes.NewTransientStoreKey(indexer_manager.TransientStoreKey)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeTransient, db)
	ctx = ctx.WithBlockTime(BlockTime).WithBlockHeight(BlockHeight).WithTxBytes(constants.TestTxBytes)
	ctx.GasMeter().ConsumeGas(ConsumedGas, "beforeWrite")
	require.NoError(t, stateStore.LoadLatestVersion())

	mockSender := createMockSender(true)
	indexerEventManager := indexer_manager.NewIndexerEventManager(
		storeKey,
		[]indexer_manager.SenderWithKey{{Key: "sender1", Sender: mockSender}},
	)

	indexerEventManager.AddTxnEvent(
		ctx,
		indexerevents.SubtypeSubaccountUpdate,
		EventVersion,
		indexer_manager.GetBytes(&SubaccountEvent),
	)
	indexerEventManager.AddTxnEvent(
		ctx,
		indexerevents.SubtypeSubaccountUpdate,
		EventVersion,
		indexer_manager.GetBytes(&SubaccountEvent),
	)
	ctx = ctx.WithTxBytes(constants.TestTxBytes1)
	indexerEventManager.AddTxnEvent(
		ctx,
		indexerevents.SubtypeTransfer,
		EventVersion,
		indexer_manager.GetBytes(&TransferEvent),
	)
	indexerEventManager.AddBlockEvent(
		ctx,
		indexerevents.SubtypeFundingValues,
		indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_END_BLOCK,
		EventVersion,
		indexer_manager.GetBytes(&FundingRateAndIndexEvent),
	)
	indexerEventManager.AddBlockEvent(
		ctx,
		indexerevents.SubtypeFundingValues,
		indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_END_BLOCK,
		EventVersion,
		indexer_manager.GetBytes(&FundingPremiumSampleEvent),
	)
	indexerEventManager.AddBlockEvent(
		ctx,
		indexerevents.SubtypeFundingValues,
		indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_BEGIN_BLOCK,
		EventVersion,
		indexer_manager.GetBytes(&FundingPremiumSampleEvent),
	)
	indexerEventManager.AddBlockEvent(
		ctx,
		indexerevents.SubtypeFundingValues,
		indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_BEGIN_BLOCK,
		EventVersion,
		indexer_manager.GetBytes(&FundingRateAndIndexEvent),
	)

	block := indexerEventManager.ProduceBlock(ctx)
	require.Len(t, block.Events, 7)
	require.Equal(t, ExpectedEvent1, *block.Events[0])
	require.Equal(t, ExpectedEvent1, *block.Events[1])
	require.Equal(t, ExpectedEvent2, *block.Events[2])
	require.Equal(t, ExpectedEvent3, *block.Events[3])
	require.Equal(t, ExpectedEvent4, *block.Events[4])
	require.Equal(t, ExpectedEvent5, *block.Events[5])
	require.Equal(t, ExpectedEvent6, *block.Events[6])
	require.Equal(t, []string{
		string(constants.TestTxHashString),
		string(constants.TestTxHashString1),
	}, block.TxHashes)
	require.Equal(t, uint32(BlockHeight), block.Height)
	require.Equal(t, BlockTime, block.Time)
	require.Equal(t, ConsumedGas, ctx.GasMeter().GasConsumed())
}

func TestClearEvents(t *testing.T) {
	ctx, stateStore, db := sdk.NewSdkContextWithMultistore()
	storeKey := storetypes.NewTransientStoreKey(indexer_manager.TransientStoreKey)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeTransient, db)
	ctx = ctx.WithBlockTime(BlockTime).WithBlockHeight(BlockHeight).WithTxBytes(constants.TestTxBytes)
	ctx.GasMeter().ConsumeGas(ConsumedGas, "beforeWrite")
	require.NoError(t, stateStore.LoadLatestVersion())

	mockSender := createMockSender(true)
	indexerEventManager := indexer_manager.NewIndexerEventManager(
		storeKey,
		[]indexer_manager.SenderWithKey{{Key: "sender1", Sender: mockSender}},
	)

	indexerEventManager.AddTxnEvent(
		ctx,
		indexerevents.SubtypeSubaccountUpdate,
		EventVersion,
		indexer_manager.GetBytes(&SubaccountEvent),
	)

	block := indexerEventManager.ProduceBlock(ctx)
	require.Len(t, block.Events, 1)
	indexerEventManager.ClearEvents(ctx)
	block = indexerEventManager.ProduceBlock(ctx)
	require.Len(t, block.Events, 0)
	require.Equal(t, ConsumedGas, ctx.GasMeter().GasConsumed())
}
