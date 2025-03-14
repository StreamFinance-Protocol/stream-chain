package v1

import (
	"math/big"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	v1types "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/protocol/v1/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

func SubaccountIdToIndexerSubaccountId(
	subaccountId satypes.SubaccountId,
) v1types.IndexerSubaccountId {
	return v1types.IndexerSubaccountId{
		Owner:  subaccountId.Owner,
		Number: subaccountId.Number,
	}
}

func AssetYieldIndexToIndexerAssetYieldIndex(
	assetYieldIndex *big.Rat,
) string {
	return assetYieldIndex.String()
}

func PerpetualPositionToIndexerPerpetualPosition(
	perpetualPosition *satypes.PerpetualPosition,
	fundingPayment dtypes.SerializableInt,
) *v1types.IndexerPerpetualPosition {
	return &v1types.IndexerPerpetualPosition{
		PerpetualId:    perpetualPosition.PerpetualId,
		Quantums:       perpetualPosition.Quantums,
		FundingIndex:   perpetualPosition.FundingIndex,
		FundingPayment: fundingPayment,
	}
}

func PerpetualPositionsToIndexerPerpetualPositions(
	perpetualPositions []*satypes.PerpetualPosition,
	fundingPayments map[uint32]dtypes.SerializableInt,
) []*v1types.IndexerPerpetualPosition {
	if perpetualPositions == nil {
		return nil
	}
	indexerPerpetualPositions := make([]*v1types.IndexerPerpetualPosition, 0, len(perpetualPositions))
	for _, perpetualPosition := range perpetualPositions {
		// Retrieve funding payment for this perpetual position (0 by default).
		fundingPayment, exists := fundingPayments[perpetualPosition.PerpetualId]
		if !exists {
			fundingPayment = dtypes.ZeroInt()
		}
		indexerPerpetualPositions = append(
			indexerPerpetualPositions,
			PerpetualPositionToIndexerPerpetualPosition(
				perpetualPosition,
				fundingPayment,
			),
		)
	}
	return indexerPerpetualPositions
}

func AssetPositionToIndexerAssetPosition(
	assetPosition *satypes.AssetPosition,
) *v1types.IndexerAssetPosition {
	return &v1types.IndexerAssetPosition{
		AssetId:  assetPosition.AssetId,
		Quantums: assetPosition.Quantums,
		Index:    assetPosition.Index,
	}
}

func AssetPositionsToIndexerAssetPositions(
	assetPositions []*satypes.AssetPosition,
) []*v1types.IndexerAssetPosition {
	if assetPositions == nil {
		return nil
	}
	indexerAssetPositions := make([]*v1types.IndexerAssetPosition, 0, len(assetPositions))
	for _, assetPosition := range assetPositions {
		indexerAssetPositions = append(
			indexerAssetPositions,
			AssetPositionToIndexerAssetPosition(assetPosition),
		)
	}
	return indexerAssetPositions
}
