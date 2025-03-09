package keeper

import (
	"sort"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

// getUpdatedAssetPositions gets all the asset positions on a subaccount that have
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

// getUpdatedPerpetualPositions gets all the perpetual positions on a subaccount that have
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
