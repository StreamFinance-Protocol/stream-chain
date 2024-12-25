package keeper

import (
	"math/big"

	errorsmod "cosmossdk.io/errors"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) checkCollateralPoolConstraints(
	settledUpdates []SettledUpdate,
	perpetuals []perptypes.Perpetual,
) (
	success bool,
	successPerUpdate []types.UpdateResult,
	err error,
) {
	success = true
	successPerUpdate = make([]types.UpdateResult, len(settledUpdates))
	perpIdToCollateralPoolId := getPerpIdToCollateralPoolIdMap(perpetuals)

	for i, update := range settledUpdates {
		result, err := IsValidCollateralPoolUpdate(update, perpIdToCollateralPoolId)
		if err != nil {
			return false, nil, err
		}
		if result != types.Success {
			success = false
		}

		successPerUpdate[i] = result
	}

	return success, successPerUpdate, nil
}

// Checks whether the perpetual updates to a settled subaccount violates constraints for the
// collateral pool. This function does not assumes the settled subaccount had the updates applied to it already.
// The constraint being checked is:
//   - there cannot be updates for multiple collateral pools
//   - a subaccount with a position in a collateral pool cannot have updates for perpetuals in other
//     collateral pools
//   - a subaccount with no positions cannot be updated to have positions in multiple collateral pools

func IsValidCollateralPoolUpdate(
	settledUpdate SettledUpdate,
	perpIdToCollateralPoolId map[uint32]uint32,
) (types.UpdateResult, error) {
	if len(settledUpdate.PerpetualUpdates) == 0 {
		return types.Success, nil
	}

	collateralPoolIdBeingUpdated, exists := perpIdToCollateralPoolId[settledUpdate.PerpetualUpdates[0].PerpetualId]
	if !exists {
		return types.UpdateCausedError, errorsmod.Wrap(
			perptypes.ErrPerpetualDoesNotExist, lib.UintToString(settledUpdate.PerpetualUpdates[0].PerpetualId),
		)
	}

	for _, perpetualUpdate := range settledUpdate.PerpetualUpdates[1:] {
		collateralPoolId, exists := perpIdToCollateralPoolId[perpetualUpdate.PerpetualId]
		if !exists {
			return types.UpdateCausedError, errorsmod.Wrap(
				perptypes.ErrPerpetualDoesNotExist, lib.UintToString(perpetualUpdate.PerpetualId),
			)
		}
		if collateralPoolId != collateralPoolIdBeingUpdated {
			return types.ViolatesCollateralPoolConstraints, nil
		}
	}

	if len(settledUpdate.SettledSubaccount.PerpetualPositions) == 0 {
		return types.Success, nil
	}

	collateralPoolId, exists := perpIdToCollateralPoolId[settledUpdate.SettledSubaccount.PerpetualPositions[0].PerpetualId]
	if !exists {
		return types.UpdateCausedError, errorsmod.Wrap(
			perptypes.ErrPerpetualDoesNotExist, lib.UintToString(settledUpdate.SettledSubaccount.PerpetualPositions[0].PerpetualId),
		)
	}

	if collateralPoolId != collateralPoolIdBeingUpdated {
		return types.ViolatesCollateralPoolConstraints, nil
	}

	return types.Success, nil
}

// computeAndExecuteCollateralTransfer computes collateral transfers resulting from updates to
// a subaccount and executes the collateral transfer using `x/bank`.`
// The input `settledUpdate` must have an updated subaccount (`settledUpdate.SettledSubaccount`),
// so all the updates must have been applied already to the subaccount.
// Note: This uses the `x/bank` keeper and modifies `x/bank` state.
func (k *Keeper) computeAndExecuteCollateralTransfer(
	ctx sdk.Context,
	settledUpdateWithUpdatedSubaccount SettledUpdate,
) error {
	quoteAssetId, err := k.getQuoteAssetId(ctx, settledUpdateWithUpdatedSubaccount.SettledSubaccount)
	if err != nil {
		return err
	}

	// The subaccount in `settledUpdateWithUpdatedSubaccount` already has the perpetual updates
	// and asset updates applied to it.
	stateTransition, err := GetCollateralPoolStateTransition(
		settledUpdateWithUpdatedSubaccount,
		quoteAssetId,
	)
	if err != nil {
		return err
	}
	if err := k.transferAssetsToCollateralPool(
		ctx,
		stateTransition,
	); err != nil {
		return err
	}

	return nil
}

// GetCollateralPoolStateTransition checks whether a perpetual position will be opened or closed for
// a subaccount and therefore whether we need to transfer between the dummy collateral pool and the
// collateral pool for the perpetual.
// This function assumes that the subaccount is valid under collateral pool constraints.
// The input `settledUpdate` must have an updated subaccount (`settledUpdate.SettledSubaccount`),
// so all the updates must have been applied already to the subaccount.
func GetCollateralPoolStateTransition(
	settledUpdateWithUpdatedSubaccount SettledUpdate,
	quoteAssetId uint32,
) (*types.CollateralTransferPerpetualPositionStateTransition, error) {
	if len(settledUpdateWithUpdatedSubaccount.PerpetualUpdates) == 0 {
		return nil, nil
	}
	updatedSubaccount := settledUpdateWithUpdatedSubaccount.SettledSubaccount

	if len(updatedSubaccount.PerpetualPositions) == 0 {
		return getCollateralPoolStateTransitionForAllPerpPositionsClosed(
			updatedSubaccount,
			settledUpdateWithUpdatedSubaccount.PerpetualUpdates[0].PerpetualId,
		), nil
	}

	areAllPositionsNew := areAllSubaccountPerpPositionsNew(
		updatedSubaccount.PerpetualPositions,
		settledUpdateWithUpdatedSubaccount.PerpetualUpdates,
	)
	if !areAllPositionsNew {
		return nil, nil
	}

	err := getErrorFromInvalidAssetUpdateForNewPerpPosition(
		settledUpdateWithUpdatedSubaccount.AssetUpdates,
		quoteAssetId,
	)
	if err != nil {
		return nil, err
	}

	return getCollateralPoolStateTransitionForAllPerpPositionsOpened(
		settledUpdateWithUpdatedSubaccount,
		quoteAssetId,
	), nil
}

// transferAssetsToCollateralPool transfers collateral between a collateral pool and the dummy
// collateral pool based on whether a perpetual position was opened or closed in a subaccount.
// Note: This uses the `x/bank` keeper and modifies `x/bank` state.
func (k *Keeper) transferAssetsToCollateralPool(
	ctx sdk.Context,
	stateTransition *types.CollateralTransferPerpetualPositionStateTransition,
) error {
	// No collateral to transfer if no state transition.
	if stateTransition == nil {
		return nil
	}

	if len(stateTransition.AssetIds) != len(stateTransition.BigQuantums) {
		return errorsmod.Wrap(
			types.ErrFailedToUpdateSubaccounts,
			"Asset IDs and big quantums arrays must be the same length",
		)
	}

	CollateralPoolAddr, err := k.GetCollateralPoolAddressFromPerpetualId(ctx, stateTransition.PerpetualId)
	if err != nil {
		return err
	}
	var toModuleAddr sdk.AccAddress
	var fromModuleAddr sdk.AccAddress

	if stateTransition.Transition == types.Opened {
		toModuleAddr = CollateralPoolAddr
		fromModuleAddr = types.ModuleAddress
	} else if stateTransition.Transition == types.Closed {
		toModuleAddr = types.ModuleAddress
		fromModuleAddr = CollateralPoolAddr
	} else {
		// Should never hit this.
		return errorsmod.Wrapf(
			types.ErrFailedToUpdateSubaccounts,
			"Invalid state transition %v for isolated perpetual with id %d in subaccount with id %v",
			stateTransition,
			stateTransition.PerpetualId,
			stateTransition.SubaccountId,
		)
	}

	for i := range stateTransition.AssetIds {
		// If there are zero quantums to transfer, don't transfer collateral.
		if stateTransition.BigQuantums[i].Sign() == 0 {
			continue
		}

		// Invalid to transfer negative quantums. This should already be caught by collateralization
		// checks as well.
		if stateTransition.BigQuantums[i].Sign() == -1 {
			return errorsmod.Wrapf(
				types.ErrFailedToUpdateSubaccounts,
				"Subaccount with id %v %s perpteual position with perpetual id %d with negative collateral asset id %d with size %s to transfer",
				stateTransition.SubaccountId,
				stateTransition.Transition.String(),
				stateTransition.PerpetualId,
				stateTransition.AssetIds[i],
				stateTransition.BigQuantums[i].String(),
			)
		}

		// Transfer collateral between collateral pools.
		_, coinToTransfer, err := k.assetsKeeper.ConvertAssetToCoin(
			ctx,
			stateTransition.AssetIds[i],
			stateTransition.BigQuantums[i],
		)
		if err != nil {
			return err
		}

		if err = k.bankKeeper.SendCoins(
			ctx,
			fromModuleAddr,
			toModuleAddr,
			[]sdk.Coin{coinToTransfer},
		); err != nil {
			return err
		}
	}
	return nil
}

// getCollateralPoolStateTransitionForAllPerpPositionsClosed creates a state
// transition for a subaccount that has all perpetual positions closed.
// All collateral of a subaccount is transferred back to the dummy pool.
func getCollateralPoolStateTransitionForAllPerpPositionsClosed(
	updatedSubaccount types.Subaccount,
	perpetualId uint32,
) *types.CollateralTransferPerpetualPositionStateTransition {
	assetIds := make([]uint32, 0, len(updatedSubaccount.AssetPositions))
	assetSizes := make([]*big.Int, 0, len(updatedSubaccount.AssetPositions))

	for _, assetPosition := range updatedSubaccount.AssetPositions {
		assetIds = append(assetIds, assetPosition.AssetId)
		assetSizes = append(assetSizes, assetPosition.GetBigQuantums())
	}

	return &types.CollateralTransferPerpetualPositionStateTransition{
		SubaccountId: updatedSubaccount.Id,
		PerpetualId:  perpetualId,
		AssetIds:     assetIds,
		BigQuantums:  assetSizes,
		Transition:   types.Closed,
	}
}

// getCollateralPoolStateTransitionForAllPerpPositionsOpened creates a state
// transition for a subaccount that opens all perpetual positions.
// All collateral of a subaccount is transferred to the respective
// collateral pool.
//
// For the quote asset, the amount of collateral transferred equals
// the quote currency asset position before the update was applied.
// We subtract the asset update amount from the updated subaccount's
// quote currency asset position size to get the amount of collateral to transfer.
// For other assets, the entire asset position of a subaccount is transferred.
func getCollateralPoolStateTransitionForAllPerpPositionsOpened(
	settledUpdateWithUpdatedSubaccount SettledUpdate,
	quoteAssetId uint32,
) *types.CollateralTransferPerpetualPositionStateTransition {
	updatedSubaccount := settledUpdateWithUpdatedSubaccount.SettledSubaccount

	assetIds := make([]uint32, 0, len(updatedSubaccount.AssetPositions))
	assetSizes := make([]*big.Int, 0, len(updatedSubaccount.AssetPositions))

	for _, assetPosition := range updatedSubaccount.AssetPositions {
		assetIds = append(assetIds, assetPosition.AssetId)

		if assetPosition.AssetId == quoteAssetId {
			trueAssetSize := new(big.Int).Sub(
				assetPosition.GetBigQuantums(),
				settledUpdateWithUpdatedSubaccount.AssetUpdates[0].GetBigQuantums(),
			)
			assetSizes = append(assetSizes, trueAssetSize)
		} else {
			assetSizes = append(assetSizes, assetPosition.GetBigQuantums())
		}
	}

	return &types.CollateralTransferPerpetualPositionStateTransition{
		SubaccountId: updatedSubaccount.Id,
		PerpetualId:  settledUpdateWithUpdatedSubaccount.PerpetualUpdates[0].PerpetualId,
		AssetIds:     assetIds,
		BigQuantums:  assetSizes,
		Transition:   types.Opened,
	}
}

func areAllSubaccountPerpPositionsNew(
	subaccountPerpetualPositions []*types.PerpetualPosition,
	perpetualUpdates []types.PerpetualUpdate,
) bool {
	if len(subaccountPerpetualPositions) != len(perpetualUpdates) {
		return false
	}

	allPositionsAreNew := true
	for i, perpetualUpdate := range perpetualUpdates {
		if perpetualUpdate.GetBigQuantums().Cmp(subaccountPerpetualPositions[i].GetBigQuantums()) != 0 {
			allPositionsAreNew = false
			break
		}
	}

	return allPositionsAreNew
}

func getErrorFromInvalidAssetUpdateForNewPerpPosition(
	assetUpdates []types.AssetUpdate,
	quoteAssetId uint32,
) error {
	if len(assetUpdates) != 1 {
		return errorsmod.Wrap(
			types.ErrFailedToUpdateSubaccounts,
			"when opening new position in a new collateral pool there should be only 1 asset update",
		)
	}

	if assetUpdates[0].AssetId != quoteAssetId {
		return errorsmod.Wrap(
			types.ErrFailedToUpdateSubaccounts,
			"when opening a new position in a new collateral pool the asset update should be for the quote asset",
		)
	}

	return nil
}
