package indexer_manager

import (
	"encoding/binary"

	"cosmossdk.io/store/prefix"
	storetypes "cosmossdk.io/store/types"
	ante_types "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ante/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/metrics"
	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
)

const (
	// TransientStoreKey is the transient store key for indexer events.
	TransientStoreKey = "transient_indexer_events"

	// IndexerEventsCountKey is the key to retrieve the count of the indexer events
	// within the last block. Each individual event is stored at a big endian encoded
	// uint32 starting from 0 upto and not including count.
	IndexerEventsCountKey = "c"
	IndexerEventsPrefix   = "e"

	ModuleName = "indexer_events"
)

type transactionData struct {
	txHashes    []string
	txEventsMap map[string][]*IndexerTendermintEvent
}

func getIndexerEventsCount(noGasCtx sdk.Context, store storetypes.KVStore) uint32 {
	countsBytes := store.Get([]byte(IndexerEventsCountKey))
	if countsBytes == nil {
		return 0
	}
	return binary.BigEndian.Uint32(countsBytes)
}

func getIndexerEvents(noGasCtx sdk.Context, storeKey storetypes.StoreKey) []*IndexerTendermintEventWrapper {
	store := noGasCtx.TransientStore(storeKey)
	count := getIndexerEventsCount(noGasCtx, store)
	events := make([]*IndexerTendermintEventWrapper, count)
	store = prefix.NewStore(store, []byte(IndexerEventsPrefix))
	for i := uint32(0); i < count; i++ {
		var event IndexerTendermintEventWrapper
		bytes := store.Get(lib.Uint32ToKey(i))
		if err := proto.Unmarshal(bytes, &event); err != nil {
			panic(err)
		}
		events[i] = &event
	}
	return events
}

// GetBytes returns the marshaled bytes of the event message.
func GetBytes(
	eventMessage proto.Message,
) []byte {
	eventMessageBytes, err := proto.Marshal(eventMessage)
	if err != nil {
		panic(err)
	}
	return eventMessageBytes
}

// addTxnEvent adds a transaction event to the context's transient store of indexer events.
func addTxnEvent(
	ctx sdk.Context,
	subType string,
	version uint32,
	storeKey storetypes.StoreKey,
	dataBytes []byte,
) {
	event := IndexerTendermintEventWrapper{
		Event: &IndexerTendermintEvent{
			Subtype:             subType,
			Version:             version,
			OrderingWithinBlock: &IndexerTendermintEvent_TransactionIndex{},
			DataBytes:           dataBytes,
		},
		TxnHash: string(lib.GetTxHash(ctx.TxBytes())),
	}
	addEvent(ctx, event, storeKey)
}

// addBlockEvent adds a block event to the context's transient store of indexer events.
func addBlockEvent(
	ctx sdk.Context,
	subType string,
	storeKey storetypes.StoreKey,
	blockEvent IndexerTendermintEvent_BlockEvent,
	version uint32,
	dataBytes []byte,
) {
	event := IndexerTendermintEventWrapper{
		Event: &IndexerTendermintEvent{
			Subtype: subType,
			Version: version,
			OrderingWithinBlock: &IndexerTendermintEvent_BlockEvent_{
				BlockEvent: blockEvent,
			},
			DataBytes: dataBytes,
		},
	}
	addEvent(ctx, event, storeKey)
}

// addEvent adds an event to the context's transient store of indexer events.
func addEvent(
	ctx sdk.Context,
	event IndexerTendermintEventWrapper,
	storeKey storetypes.StoreKey,
) {
	noGasCtx := ctx.WithGasMeter(ante_types.NewFreeInfiniteGasMeter())
	store := noGasCtx.TransientStore(storeKey)
	count := getIndexerEventsCount(noGasCtx, store)
	b, err := proto.Marshal(&event)
	if err != nil {
		panic(err)
	}
	store.Set([]byte(IndexerEventsCountKey), lib.Uint32ToKey(count+1))
	store = prefix.NewStore(store, []byte(IndexerEventsPrefix))
	store.Set(lib.Uint32ToKey(count), b)
}

// clearEvents clears events in the context's transient store of indexer events.
func clearEvents(
	ctx sdk.Context,
	storeKey storetypes.StoreKey,
) {
	noGasCtx := ctx.WithGasMeter(ante_types.NewFreeInfiniteGasMeter())
	store := noGasCtx.TransientStore(storeKey)
	store.Delete([]byte(IndexerEventsCountKey))
}

// produceBlock returns the block. It should only be called in EndBlocker when the
// transient store contains all onchain events from a ready-to-be-committed block.
func produceBlock(ctx sdk.Context, storeKey storetypes.StoreKey) *IndexerTendermintBlock {
	noGasCtx := ctx.WithGasMeter(ante_types.NewFreeInfiniteGasMeter())
	blockHeight := lib.MustConvertIntegerToUint32(noGasCtx.BlockHeight())
	blockTime := noGasCtx.BlockTime()

	// Process all events
	events := getIndexerEvents(noGasCtx, storeKey)
	txData, blockEvents := separateEvents(events)

	// Process transaction events
	allEvents := processTransactionEvents(txData)

	// Process block events
	processedBlockEvents := processBlockEvents(blockEvents)
	allEvents = append(allEvents, processedBlockEvents...)

	recordMetrics(len(allEvents)-len(processedBlockEvents), len(processedBlockEvents))

	return &IndexerTendermintBlock{
		Height:   blockHeight,
		Time:     blockTime,
		Events:   allEvents,
		TxHashes: txData.txHashes,
	}
}

func separateEvents(events []*IndexerTendermintEventWrapper) (transactionData, []*IndexerTendermintEvent) {
	txData := transactionData{
		txHashes:    []string{},
		txEventsMap: make(map[string][]*IndexerTendermintEvent),
	}
	blockEvents := []*IndexerTendermintEvent{}

	for _, event := range events {
		switch event.Event.OrderingWithinBlock.(type) {
		case *IndexerTendermintEvent_BlockEvent_:
			blockEvents = append(blockEvents, event.Event)
		case *IndexerTendermintEvent_TransactionIndex:
			processTxEvent(&txData, event)
		}
	}
	return txData, blockEvents
}

func processTxEvent(txData *transactionData, event *IndexerTendermintEventWrapper) {
	txHash := event.TxnHash
	if txEvents, ok := txData.txEventsMap[txHash]; ok {
		txData.txEventsMap[txHash] = append(txEvents, event.Event)
	} else {
		txData.txHashes = append(txData.txHashes, txHash)
		txData.txEventsMap[txHash] = []*IndexerTendermintEvent{event.Event}
	}
}

func processTransactionEvents(txData transactionData) []*IndexerTendermintEvent {
	// Create hash to index mapping
	txHashesMap := make(map[string]int)
	for i, txHash := range txData.txHashes {
		txHashesMap[txHash] = i
	}

	// Update event indices
	numTxnEvents := updateEventIndices(txData, txHashesMap)

	// Collect all transaction events in order
	allEvents := make([]*IndexerTendermintEvent, 0, numTxnEvents)
	for _, txHash := range txData.txHashes {
		allEvents = append(allEvents, txData.txEventsMap[txHash]...)
	}

	return allEvents
}

func updateEventIndices(txData transactionData, txHashesMap map[string]int) int {
	numTxnEvents := 0
	for txHash, events := range txData.txEventsMap {
		for i, event := range events {
			event.OrderingWithinBlock = &IndexerTendermintEvent_TransactionIndex{
				TransactionIndex: uint32(txHashesMap[txHash]),
			}
			event.EventIndex = uint32(i)
			events[i] = event
			numTxnEvents++
		}
		txData.txEventsMap[txHash] = events
	}
	return numTxnEvents
}

func processBlockEvents(blockEvents []*IndexerTendermintEvent) []*IndexerTendermintEvent {
	numBeginBlockerEvents, numEndBlockerEvents := 0, 0
	for i, event := range blockEvents {
		switch event.GetBlockEvent() {
		case IndexerTendermintEvent_BLOCK_EVENT_BEGIN_BLOCK:
			blockEvents[i].EventIndex = uint32(numBeginBlockerEvents)
			numBeginBlockerEvents++
		case IndexerTendermintEvent_BLOCK_EVENT_END_BLOCK:
			blockEvents[i].EventIndex = uint32(numEndBlockerEvents)
			numEndBlockerEvents++
		}
	}
	return blockEvents
}

func recordMetrics(
	totalNumTxnEvents int,
	totalNumBlockEvents int,
) {
	telemetry.SetGauge(
		float32(totalNumTxnEvents),
		ModuleName,
		metrics.TotalNumIndexerTxnEvents,
	)
	telemetry.SetGauge(
		float32(totalNumBlockEvents),
		ModuleName,
		metrics.TotalNumIndexerBlockEvents,
	)
}
