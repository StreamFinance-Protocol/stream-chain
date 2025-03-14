package v1_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	v1 "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/protocol/v1"
	v1types "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/protocol/v1/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	"github.com/stretchr/testify/require"
)

func TestSubaccountIdToIndexerSubaccountId(t *testing.T) {
	subaccountId := constants.Alice_Num1
	expectedSubaccountId := v1types.IndexerSubaccountId{
		Owner:  subaccountId.Owner,
		Number: subaccountId.Number,
	}

	require.Equal(
		t,
		expectedSubaccountId,
		v1.SubaccountIdToIndexerSubaccountId(subaccountId),
	)
}

func TestPerpetualPositionToIndexerPerpetualPosition(t *testing.T) {
	position := &constants.Short_Perp_1ETH_NegativeFunding
	fundingPayments := map[uint32]dtypes.SerializableInt{
		position.PerpetualId: dtypes.NewInt(100),
	}
	expectedPerpetualPosition := &v1types.IndexerPerpetualPosition{
		PerpetualId:    position.PerpetualId,
		Quantums:       position.Quantums,
		FundingIndex:   position.FundingIndex,
		FundingPayment: dtypes.NewInt(100),
	}

	require.Equal(
		t,
		expectedPerpetualPosition,
		v1.PerpetualPositionToIndexerPerpetualPosition(
			position,
			fundingPayments[position.PerpetualId],
		),
	)
}

func TestPerpetualPositionsToIndexerPerpetualPositions(t *testing.T) {
	position := &constants.Short_Perp_1ETH_NegativeFunding
	position2 := &constants.Long_Perp_1BTC_PositiveFunding

	tests := map[string]struct {
		// Input
		positions       []*satypes.PerpetualPosition
		fundingPayments map[uint32]dtypes.SerializableInt

		// Expectations
		expectedPerpetualPositions []*v1types.IndexerPerpetualPosition
	}{
		"Maps slice of PerpetualPosition to slice of IndexerPerpetualPosition with no funding payments": {
			positions: []*satypes.PerpetualPosition{
				position,
				position2,
			},
			expectedPerpetualPositions: []*v1types.IndexerPerpetualPosition{
				{
					PerpetualId:    position.PerpetualId,
					Quantums:       position.Quantums,
					FundingIndex:   position.FundingIndex,
					FundingPayment: dtypes.ZeroInt(),
				},
				{
					PerpetualId:    position2.PerpetualId,
					Quantums:       position2.Quantums,
					FundingIndex:   position2.FundingIndex,
					FundingPayment: dtypes.ZeroInt(),
				},
			},
		},
		"Maps slice of PerpetualPosition to slice of IndexerPerpetualPosition with non-zero funding payments": {
			positions: []*satypes.PerpetualPosition{
				position,
				position2,
			},
			fundingPayments: map[uint32]dtypes.SerializableInt{
				position.PerpetualId:  dtypes.NewInt(100),
				position2.PerpetualId: dtypes.NewInt(-100),
			},
			expectedPerpetualPositions: []*v1types.IndexerPerpetualPosition{
				{
					PerpetualId:    position.PerpetualId,
					Quantums:       position.Quantums,
					FundingIndex:   position.FundingIndex,
					FundingPayment: dtypes.NewInt(100),
				},
				{
					PerpetualId:    position2.PerpetualId,
					Quantums:       position2.Quantums,
					FundingIndex:   position2.FundingIndex,
					FundingPayment: dtypes.NewInt(-100),
				},
			},
		},
		"Maps empty slice to empty slice": {
			positions:                  []*satypes.PerpetualPosition{},
			expectedPerpetualPositions: []*v1types.IndexerPerpetualPosition{},
		},
		"Maps nil to nil slice": {
			positions:                  nil,
			expectedPerpetualPositions: nil,
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			require.Equal(
				t,
				tc.expectedPerpetualPositions,
				v1.PerpetualPositionsToIndexerPerpetualPositions(
					tc.positions,
					tc.fundingPayments,
				),
			)
		})
	}
}

func TestAssetPositionToIndexerAssetPosition(t *testing.T) {
	position := &constants.Long_Asset_1BTC
	expectedAssetPosition := &v1types.IndexerAssetPosition{
		AssetId:  position.AssetId,
		Quantums: position.Quantums,
		Index:    position.Index,
	}

	require.Equal(
		t,
		v1.AssetPositionToIndexerAssetPosition(position),
		expectedAssetPosition,
	)
}

func TestAssetPositionsToIndexerAssetPositions(t *testing.T) {
	position := &constants.Long_Asset_1BTC
	position2 := &constants.TDai_Asset_100_000

	tests := map[string]struct {
		// Input
		positions []*satypes.AssetPosition

		// Expectations
		expectedAssetPositions []*v1types.IndexerAssetPosition
	}{
		"Maps slice of AssetPosition to slice of IndexerAssetPosition": {
			positions: []*satypes.AssetPosition{
				position,
				position2,
			},
			expectedAssetPositions: []*v1types.IndexerAssetPosition{
				{
					AssetId:  position.AssetId,
					Quantums: position.Quantums,
					Index:    position.Index,
				},
				{
					AssetId:  position2.AssetId,
					Quantums: position2.Quantums,
					Index:    position2.Index,
				},
			},
		},
		"Maps empty slice to empty slice": {
			positions:              []*satypes.AssetPosition{},
			expectedAssetPositions: []*v1types.IndexerAssetPosition{},
		},
		"Maps nil to nil slice": {
			positions:              nil,
			expectedAssetPositions: nil,
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			require.Equal(
				t,
				tc.expectedAssetPositions,
				v1.AssetPositionsToIndexerAssetPositions(tc.positions),
			)
		})
	}
}
