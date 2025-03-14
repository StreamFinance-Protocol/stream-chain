package indexer_manager

import (
	"fmt"

	storetypes "cosmossdk.io/store/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/msgsender"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type IndexerEventManager interface {
	Enabled() bool
	IsEnabled(key string) bool
	Subscribe(key string, sender msgsender.IndexerMessageSender) error
	Unsubscribe(key string) error
	AddTxnEvent(ctx sdk.Context, subType string, version uint32, dataByes []byte)
	SendOnchainData(block *IndexerTendermintBlock)
	ProduceBlock(ctx sdk.Context) *IndexerTendermintBlock
	AddBlockEvent(
		ctx sdk.Context,
		subType string,
		blockEvent IndexerTendermintEvent_BlockEvent,
		version uint32,
		dataBytes []byte,
	)
	ClearEvents(ctx sdk.Context)
}

// Ensure the `IndexerEventManager` interface is implemented at compile time.
var _ IndexerEventManager = (*indexerEventManagerImpl)(nil)

type indexerEventManagerImpl struct {
	messageSenders                 map[string]msgsender.IndexerMessageSender
	indexerEventsTransientStoreKey storetypes.StoreKey
}

// SenderWithKey pairs a message sender with its key for initialization
type SenderWithKey struct {
	Key    string
	Sender msgsender.IndexerMessageSender
}

func NewIndexerEventManager(
	indexerEventsTransientStoreKey storetypes.StoreKey,
	initialSenders []SenderWithKey,
) IndexerEventManager {
	senders := make(map[string]msgsender.IndexerMessageSender)

	// Initialize with any provided senders
	for _, s := range initialSenders {
		if s.Key != "" && s.Sender != nil {
			senders[s.Key] = s.Sender
		}
	}

	return &indexerEventManagerImpl{
		messageSenders:                 senders,
		indexerEventsTransientStoreKey: indexerEventsTransientStoreKey,
	}
}

// Subscribe adds a new message sender with the given key
func (i *indexerEventManagerImpl) Subscribe(key string, sender msgsender.IndexerMessageSender) error {
	if _, exists := i.messageSenders[key]; exists {
		return fmt.Errorf("message sender with key %s already exists", key)
	}
	i.messageSenders[key] = sender
	return nil
}

// Unsubscribe removes a message sender with the given key
func (i *indexerEventManagerImpl) Unsubscribe(key string) error {
	if _, exists := i.messageSenders[key]; !exists {
		return fmt.Errorf("message sender with key %s does not exist", key)
	}
	delete(i.messageSenders, key)
	return nil
}

// IsEnabled checks if a specific sender is enabled
func (i *indexerEventManagerImpl) IsEnabled(key string) bool {
	if sender, exists := i.messageSenders[key]; exists {
		return sender.Enabled()
	}
	return false
}

func (i *indexerEventManagerImpl) Enabled() bool {
	for _, sender := range i.messageSenders {
		if sender.Enabled() {
			return true
		}
	}
	return false
}

func (i *indexerEventManagerImpl) GetIndexerEventsTransientStoreKey() storetypes.StoreKey {
	return i.indexerEventsTransientStoreKey
}

func (i *indexerEventManagerImpl) SendOnchainData(block *IndexerTendermintBlock) {
	message := CreateIndexerBlockEventMessage(block)
	for _, sender := range i.messageSenders {
		if sender.Enabled() {
			sender.SendOnchainData(message)
		}
	}
}

// AddTxnEvent adds a transaction event to the context's transient store of indexer events.
func (i *indexerEventManagerImpl) AddTxnEvent(
	ctx sdk.Context,
	subType string,
	version uint32,
	dataBytes []byte,
) {
	hasEnabledSender := false
	for _, sender := range i.messageSenders {
		if sender.Enabled() {
			hasEnabledSender = true
			break
		}
	}
	if hasEnabledSender {
		addTxnEvent(ctx, subType, version, i.indexerEventsTransientStoreKey, dataBytes)
	}
}

// ClearEvents clears all events in the context's transient store of indexer events.
func (i *indexerEventManagerImpl) ClearEvents(
	ctx sdk.Context,
) {
	hasEnabledSender := false
	for _, sender := range i.messageSenders {
		if sender.Enabled() {
			hasEnabledSender = true
			break
		}
	}
	if hasEnabledSender {
		clearEvents(ctx, i.indexerEventsTransientStoreKey)
	}
}

// AddBlockEvent adds a block event to the context's transient store of indexer events.
func (i *indexerEventManagerImpl) AddBlockEvent(
	ctx sdk.Context,
	subType string,
	blockEvent IndexerTendermintEvent_BlockEvent,
	version uint32,
	dataBytes []byte,
) {
	hasEnabledSender := false
	for _, sender := range i.messageSenders {
		if sender.Enabled() {
			hasEnabledSender = true
			break
		}
	}
	if hasEnabledSender {
		addBlockEvent(ctx, subType, i.indexerEventsTransientStoreKey, blockEvent, version, dataBytes)
	}
}

// ProduceBlock returns an `IndexerTendermintBlock` containing all the indexer events in the block.
// It should only be called in EndBlocker when the transient store contains all onchain events from
// a ready-to-be-committed block.
func (i *indexerEventManagerImpl) ProduceBlock(
	ctx sdk.Context,
) *IndexerTendermintBlock {
	hasEnabledSender := false
	for _, sender := range i.messageSenders {
		if sender.Enabled() {
			hasEnabledSender = true
			break
		}
	}
	if hasEnabledSender {
		return produceBlock(ctx, i.indexerEventsTransientStoreKey)
	}
	return nil
}
