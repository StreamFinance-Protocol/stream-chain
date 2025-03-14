package msgsender

var TransactionHashHeaderKey = []byte("TransactionHash")

// Message is a key/value pair of byte slices that can be sent via the send functions in the
// IndexerMessageSender.
type Message struct {
	Value []byte
}

// IndexerMessageSender is an interface that exposes methods to send messages to the
// on-chain data archival services in the Indexer.
// The `Enabled` function is used to determine if any additional computations needed to generate
// Indexer-specific data should be run in various modules.
type IndexerMessageSender interface {
	Enabled() bool // whether the IndexerMessageSender will send messages to the Indexer
	SendOnchainData(message Message)
	Close() error
}
