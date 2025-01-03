package types_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	"github.com/stretchr/testify/require"
)

// TODO(BMOD) - change to klyra address
func TestModuleAddress(t *testing.T) {
	require.Equal(t, "klyra1zlefkpe3g0vvm9a4h0jf9000lmqutlh9dl8uc8", types.ModuleAddress.String())
}
