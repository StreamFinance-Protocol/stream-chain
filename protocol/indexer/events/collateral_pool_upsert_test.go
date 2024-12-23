package events

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestNewCollateralPoolUpsertEvent_Success(t *testing.T) {
	collateralPoolCreateEvent := NewCollateralPoolUpsertEvent(
		0,
		1000000,
		[]uint32{0},
		0,
	)
	expectedCollateralPoolCreateEventProto := &CollateralPoolUpsertEvent{
		Id:                                      0,
		MaxCumulativeInsuranceFundDeltaPerBlock: 1000000,
		MultiCollateralAssets:                   []uint32{0},
		QuoteAssetId:                            0,
	}
	require.Equal(t, expectedCollateralPoolCreateEventProto, collateralPoolCreateEvent)
}
