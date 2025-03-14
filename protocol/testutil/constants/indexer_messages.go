package constants

import (
	"fmt"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/msgsender"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/cometbft/cometbft/crypto/tmhash"
)

// Used to construct the constants below.
var (
	testMessage = msgsender.Message{
		Key:   []byte("key"),
		Value: []byte("value"),
	}
)

var (
	TestTxBytes      = []byte{0x1, 0x2, 0x3}
	TestTxHashBytes  = tmhash.Sum(TestTxBytes)
	TestTxHashString = lib.TxHash(fmt.Sprintf("%X", TestTxHashBytes))
	TestTxHashHeader = msgsender.MessageHeader{
		Key:   msgsender.TransactionHashHeaderKey,
		Value: TestTxHashBytes,
	}
	TestTxBytes1      = []byte{0x4, 0x5, 0x6}
	TestTxHashBytes1  = tmhash.Sum(TestTxBytes1)
	TestTxHashString1 = lib.TxHash(fmt.Sprintf("%X", TestTxHashBytes1))
)
