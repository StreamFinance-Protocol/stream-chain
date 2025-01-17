package events

import (
	"testing"

	v1types "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/protocol/v1/types"
	clobtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"

	"github.com/stretchr/testify/require"
)

func TestNewPerpetualMarketCreateEvent_Success(t *testing.T) {
	perpetualMarketCreateEvent := NewPerpetualMarketCreateEvent(
		0,
		0,
		"BTC",
		0,
		clobtypes.ClobPair_STATUS_ACTIVE,
		-8,
		8,
		5,
		5,
		0,
		1000000,
		0,
	)
	expectedPerpetualMarketCreateEventProto := &PerpetualMarketCreateEventV2{
		Id:                        0,
		ClobPairId:                0,
		Ticker:                    "BTC",
		MarketId:                  0,
		Status:                    v1types.ClobPairStatus_CLOB_PAIR_STATUS_ACTIVE,
		QuantumConversionExponent: -8,
		AtomicResolution:          8,
		SubticksPerTick:           5,
		StepBaseQuantums:          5,
		LiquidityTier:             0,
		DangerIndexPpm:            1000000,
	}
	require.Equal(t, expectedPerpetualMarketCreateEventProto, perpetualMarketCreateEvent)
}
