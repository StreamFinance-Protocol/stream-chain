package msgsender

import (
	"strconv"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestIndexerMessageSenderInMemoryCollector(t *testing.T) {
	v := NewIndexerMessageSenderInMemoryCollector()
	expectedOnchainMessages := make([]Message, 0, 3)
	i := 0
	for ; i < 3; i++ {
		expectedOnchainMessages = append(expectedOnchainMessages, Message{
			Value: []byte("onchainValue" + strconv.Itoa(i)),
		})
	}

	v.SendOnchainData(Message{Key: []byte("onChainThatIsCleared")})
	v.Clear()
	for _, msg := range expectedOnchainMessages {
		v.SendOnchainData(msg)
	}

	v.Close()
	v.SendOnchainData(Message{Key: []byte("onChainAfterClose")})
	require.Equal(t, expectedOnchainMessages, v.GetOnchainMessages())
}
