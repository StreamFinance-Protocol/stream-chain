package indexer_manager

import "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/msgsender"

func NewIndexerEventManagerNoop() IndexerEventManager {
	return NewIndexerEventManager(
		msgsender.NewIndexerMessageSenderNoop(),
		nil,
	)
}

func NewIndexerEventManagerNoopEnabled() IndexerEventManager {
	return NewIndexerEventManager(
		msgsender.NewIndexerMessageSenderNoopEnabled(),
		nil,
	)
}
