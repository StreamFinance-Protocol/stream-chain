package keeper

import (
	"fmt"
	"sort"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

// getUpdatedAssetPositions filters out all the asset positions on a subaccount that have
// been updated. This will include any asset postions that were closed due to an update.
func getUpdatedAssetPositions(
	update SettledUpdate,
) []*types.AssetPosition {
	assetIdToPosition := createMapFromSliceForPositions(update.SettledSubaccount.AssetPositions)
	updatedAssetIds := createIdsToEmptyStructMap(update.AssetUpdates)

	updatedAssetPositions := createUpdatedPositionsSlice(
		updatedAssetIds,
		assetIdToPosition,
		func(id uint32) *types.AssetPosition {
			return &types.AssetPosition{
				AssetId:  id,
				Quantums: dtypes.ZeroInt(),
			}
		},
	)

	sortByIdAscending(updatedAssetPositions)

	return updatedAssetPositions
}

// getUpdatedPerpetualPositions filters out all the perpetual positions on a subaccount that have
// been updated. This will include any perpetual postions that were closed due to an update or that
// received / paid out funding payments.
func getUpdatedPerpetualPositions(
	update SettledUpdate,
	fundingPayments map[uint32]dtypes.SerializableInt,
) []*types.PerpetualPosition {
	perpetualIdToPosition := createMapFromSliceForPositions(update.SettledSubaccount.PerpetualPositions)

	// `updatedPerpetualIds` indicates which perpetuals were either explicitly updated
	// (through update.PerpetualUpdates) or implicitly updated (had non-zero last funding
	// payment).
	updatedPerpetualIds := createIdsToEmptyStructMap(update.PerpetualUpdates)

	// Mark perpetuals with non-zero funding payment also as updated.
	for perpetualIdWithNonZeroLastFunding := range fundingPayments {
		updatedPerpetualIds[perpetualIdWithNonZeroLastFunding] = struct{}{}
	}

	// Properties besides the PerpetualId and Quantums are left as the default values as
	// a 0-sized position indicates the position is closed and thus the funding index and
	// the side of the position does not matter.
	updatedPerpetualPositions := createUpdatedPositionsSlice(
		updatedPerpetualIds,
		perpetualIdToPosition,
		func(id uint32) *types.PerpetualPosition {
			return &types.PerpetualPosition{
				PerpetualId: id,
				Quantums:    dtypes.ZeroInt(),
			}
		},
	)

	sortByIdAscending(updatedPerpetualPositions)

	return updatedPerpetualPositions
}

func UpdateSubaccountPositions(
	settledUpdates []SettledUpdate,
	perpIdToFundingIndex map[uint32]dtypes.SerializableInt,
	perpIdToYieldIndex map[uint32]string,
) {
	for i, update := range settledUpdates {
		perpetualPositionsMap := createMapFromSliceForPositions(update.SettledSubaccount.PerpetualPositions)

		assetPositionsMap := createMapFromSliceForPositions(update.SettledSubaccount.AssetPositions)

		updatedPerpetualPositions := createUpdatedPerpetualPositions(update, perpetualPositionsMap, perpIdToFundingIndex, perpIdToYieldIndex)
		settledUpdates[i].SettledSubaccount.PerpetualPositions = updatedPerpetualPositions

		updatedAssetPositions := createUpdatedAssetPositions(update, assetPositionsMap)
		settledUpdates[i].SettledSubaccount.AssetPositions = updatedAssetPositions
	}
}

func createUpdatedPerpetualPositions(
	update SettledUpdate,
	perpetualIdToPerpetualPosition map[uint32]*types.PerpetualPosition,
	perpIdToFundingIndex map[uint32]dtypes.SerializableInt,
	perpIdToYieldIndex map[uint32]string,
) []*types.PerpetualPosition {
	for _, perpetualUpdate := range update.PerpetualUpdates {
		perpetualPosition, exists := perpetualIdToPerpetualPosition[perpetualUpdate.PerpetualId]
		if exists {
			updateExistingPosition(
				perpetualPosition,
				perpetualUpdate,
				perpetualIdToPerpetualPosition,
				perpetualUpdate.PerpetualId,
			)
		} else {
			insertNewPerpetualPosition(
				perpetualUpdate,
				perpetualIdToPerpetualPosition,
				perpIdToFundingIndex,
				perpIdToYieldIndex,
			)
		}
	}

	perpetualPositions := createSliceFromMapForPositions(perpetualIdToPerpetualPosition)
	sortByIdAscending(perpetualPositions)

	return perpetualPositions
}

func createUpdatedAssetPositions(
	update SettledUpdate,
	assetIdToAssetPosition map[uint32]*types.AssetPosition,
) []*types.AssetPosition {
	for _, assetUpdate := range update.AssetUpdates {
		assetPosition, exists := assetIdToAssetPosition[assetUpdate.AssetId]
		if exists {
			updateExistingPosition(
				assetPosition,
				assetUpdate,
				assetIdToAssetPosition,
				assetUpdate.AssetId,
			)
		} else {
			insertNewAssetPosition(
				assetUpdate,
				assetIdToAssetPosition,
			)
		}
	}

	assetPositions := createSliceFromMapForPositions(assetIdToAssetPosition)
	sortByIdAscending(assetPositions)

	return assetPositions
}

func sortByIdAscending[T types.PositionSize](items []T) {
	sort.Slice(items, func(i, j int) bool {
		return items[i].GetId() < items[j].GetId()
	})
}

// Note: We expect this function to be called with a slice of pointers
// in order to avoid copying the entire position struct.
func createMapFromSliceForPositions[P types.PositionSize](
	positions []P,
) map[uint32]P {
	positionsMap := make(map[uint32]P)
	for _, position := range positions {
		positionsMap[position.GetId()] = position
	}
	return positionsMap
}

func createSliceFromMapForPositions[P any](
	idToPosition map[uint32]*P,
) []*P {
	positions := make([]*P, 0, len(idToPosition))
	for _, value := range idToPosition {
		positions = append(positions, value)
	}
	return positions
}

func createIdsToEmptyStructMap[P types.PositionSize](
	updates []P,
) map[uint32]struct{} {
	ids := make(map[uint32]struct{})
	for _, update := range updates {
		ids[update.GetId()] = struct{}{}
	}
	return ids
}

func createUpdatedPositionsSlice[P types.Position](
	ids map[uint32]struct{},
	idToPosition map[uint32]P,
	createEmptyPosition func(uint32) P,
) []P {
	updatedPositions := make([]P, 0, len(ids))
	for id := range ids {
		position, exists := idToPosition[id]

		// If a position does not exist on the subaccount with the id of an update, it must
		// have been deleted due to quantums becoming 0. This needs to be included in the event,
		// so we construct a position with the id of the update and a Quantums value of 0.
		if !exists {
			position = createEmptyPosition(id)
		}
		updatedPositions = append(updatedPositions, position)
	}
	return updatedPositions
}

func updateExistingPosition[P types.Position, T types.PositionSize](
	position P,
	update T,
	idToPosition map[uint32]P,
	id uint32,
) {
	curQuantums := position.GetBigQuantums()
	updateQuantums := update.GetBigQuantums()
	newQuantums := curQuantums.Add(curQuantums, updateQuantums)

	position.SetBigQuantums(newQuantums)

	if newQuantums.Sign() == 0 {
		delete(idToPosition, id)
	}
}

func insertNewAssetPosition(
	assetUpdate types.AssetUpdate,
	assetPositionsMap map[uint32]*types.AssetPosition,
) {
	if assetUpdate.GetBigQuantums().Sign() == 0 {
		return
	}

	assetPosition := &types.AssetPosition{
		AssetId:  assetUpdate.AssetId,
		Quantums: dtypes.NewIntFromBigInt(assetUpdate.GetBigQuantums()),
	}

	assetPositionsMap[assetUpdate.AssetId] = assetPosition
}

func insertNewPerpetualPosition(
	perpetualUpdate types.PerpetualUpdate,
	perpetualPositionsMap map[uint32]*types.PerpetualPosition,
	perpIdToFundingIndex map[uint32]dtypes.SerializableInt,
	perpIdToYieldIndex map[uint32]string,
) {
	fundingIndex, exists := perpIdToFundingIndex[perpetualUpdate.PerpetualId]
	if !exists {
		// Invariant: `perpIdToFundingIndex` contains all existing perpetauls,
		// and perpetual position update must refer to an existing perpetual.
		panic(fmt.Sprintf("perpetual id %d not found in perpIdToFundingIndex", perpetualUpdate.PerpetualId))
	}

	yieldIndex, exists := perpIdToYieldIndex[perpetualUpdate.PerpetualId]
	if !exists {
		panic(fmt.Sprintf("perpetual id %d not found in perpIdToYieldIndex", perpetualUpdate.PerpetualId))
	}

	perpetualPosition := &types.PerpetualPosition{
		PerpetualId:  perpetualUpdate.PerpetualId,
		Quantums:     dtypes.NewIntFromBigInt(perpetualUpdate.GetBigQuantums()),
		FundingIndex: fundingIndex,
		YieldIndex:   yieldIndex,
	}

	perpetualPositionsMap[perpetualUpdate.PerpetualId] = perpetualPosition
}
