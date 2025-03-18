package types_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime/types"
	"github.com/stretchr/testify/require"
)

func TestModuleKeys(t *testing.T) {
	require.Equal(t, "blocktime", types.ModuleName)
	require.Equal(t, "blocktime", types.StoreKey)
}

func TestStateKeys(t *testing.T) {
	require.Equal(t, "PreviousBlockInfo", types.PreviousBlockInfoKey)
}
