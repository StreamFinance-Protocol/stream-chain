package keeper

import (
	"fmt"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

func UpdateSubaccountPositions(
	settledUpdates []SettledUpdate,
	perpIdToFundingIndex map[uint32]dtypes.SerializableInt,
	perpIdToYieldIndex map[uint32]string,
) {
	for i := range settledUpdates {
		update := &settledUpdates[i]
		updatePerpetualPositions(update, perpIdToFundingIndex, perpIdToYieldIndex)
		updateAssetPositions(update)
	}
}

func updatePerpetualPositions(
	update *SettledUpdate,
	perpIdToFundingIndex map[uint32]dtypes.SerializableInt,
	perpIdToYieldIndex map[uint32]string,
) {
	for _, perpUpdate := range update.PerpetualUpdates {
		idx := findPosition(update.SettledSubaccount.PerpetualPositions, perpUpdate.PerpetualId)
		if idx >= 0 {
			updateExistingPerpPosition(update, idx, perpUpdate)
		} else if perpUpdate.BigQuantumsDelta.Sign() != 0 {
			createNewPerpPosition(update, perpUpdate, perpIdToFundingIndex, perpIdToYieldIndex)
		}
	}
}

func updateAssetPositions(update *SettledUpdate) {
	for _, assetUpdate := range update.AssetUpdates {
		idx := findPosition(update.SettledSubaccount.AssetPositions, assetUpdate.AssetId)
		if idx >= 0 {
			updateExistingAssetPosition(update, idx, assetUpdate)
		} else if assetUpdate.BigQuantumsDelta.Sign() != 0 {
			createNewAssetPosition(update, assetUpdate)
		}
	}
}

func findPosition[P interface{ GetId() uint32 }](positions []P, id uint32) int {
	for i, pos := range positions {
		if pos.GetId() == id {
			return i
		}
	}
	return -1
}

func updateExistingPerpPosition(update *SettledUpdate, idx int, perpUpdate types.PerpetualUpdate) {
	pos := update.SettledSubaccount.PerpetualPositions[idx]
	newQuantums := pos.Quantums.BigInt().Add(
		pos.Quantums.BigInt(),
		perpUpdate.BigQuantumsDelta,
	)
	if newQuantums.Sign() == 0 {
		update.SettledSubaccount.PerpetualPositions = append(
			update.SettledSubaccount.PerpetualPositions[:idx],
			update.SettledSubaccount.PerpetualPositions[idx+1:]...,
		)
	} else {
		pos.Quantums = dtypes.NewIntFromBigInt(newQuantums)
	}
}

func createNewPerpPosition(
	update *SettledUpdate,
	perpUpdate types.PerpetualUpdate,
	perpIdToFundingIndex map[uint32]dtypes.SerializableInt,
	perpIdToYieldIndex map[uint32]string,
) {
	fundingIndex, exists := perpIdToFundingIndex[perpUpdate.PerpetualId]
	if !exists {
		panic(fmt.Sprintf("perpetual id %d not found in perpIdToFundingIndex", perpUpdate.PerpetualId))
	}
	yieldIndex, exists := perpIdToYieldIndex[perpUpdate.PerpetualId]
	if !exists {
		panic(fmt.Sprintf("perpetual id %d not found in perpIdToYieldIndex", perpUpdate.PerpetualId))
	}

	update.SettledSubaccount.PerpetualPositions = append(
		update.SettledSubaccount.PerpetualPositions,
		&types.PerpetualPosition{
			PerpetualId:  perpUpdate.PerpetualId,
			Quantums:     dtypes.NewIntFromBigInt(perpUpdate.BigQuantumsDelta),
			FundingIndex: fundingIndex,
			YieldIndex:   yieldIndex,
		},
	)
}

func updateExistingAssetPosition(update *SettledUpdate, idx int, assetUpdate types.AssetUpdate) {
	pos := update.SettledSubaccount.AssetPositions[idx]
	newQuantums := pos.Quantums.BigInt().Add(
		pos.Quantums.BigInt(),
		assetUpdate.BigQuantumsDelta,
	)
	if newQuantums.Sign() == 0 {
		update.SettledSubaccount.AssetPositions = append(
			update.SettledSubaccount.AssetPositions[:idx],
			update.SettledSubaccount.AssetPositions[idx+1:]...,
		)
	} else {
		pos.Quantums = dtypes.NewIntFromBigInt(newQuantums)
	}
}

func createNewAssetPosition(update *SettledUpdate, assetUpdate types.AssetUpdate) {
	update.SettledSubaccount.AssetPositions = append(
		update.SettledSubaccount.AssetPositions,
		&types.AssetPosition{
			AssetId:  assetUpdate.AssetId,
			Quantums: dtypes.NewIntFromBigInt(assetUpdate.BigQuantumsDelta),
		},
	)
}
