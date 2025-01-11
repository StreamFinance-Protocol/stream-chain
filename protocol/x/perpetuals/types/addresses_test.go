package types_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/stretchr/testify/require"
)

func TestInsuranceFundModuleAddress(t *testing.T) {
	require.Equal(t, "klyra1tgrazvtlsyumzpjdlx3298ud0p2j2wgcn7jpy2", types.BaseCollateralPoolInsuranceFundModuleAddress.String())
}
