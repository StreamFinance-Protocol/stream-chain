package keeper

import (
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) checkMultiCollateralAssetConstraints(
	ctx sdk.Context,
	settledUpdates []SettledUpdate,
	perpetuals []perptypes.Perpetual,
) (
	success bool,
	successPerUpdate []types.UpdateResult,
	err error,
) {
	success = true
	successPerUpdate = make([]types.UpdateResult, len(settledUpdates))
	perpIdToMarketType := getPerpIdToParams(perpetuals)

	for i, update := range settledUpdates {
		result, err := k.IsValidMultiCollateralUpdate(ctx, update, perpIdToMarketType)
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

func (k Keeper) IsValidMultiCollateralUpdate(
	ctx sdk.Context,
	settledUpdate SettledUpdate,
	perpIdToParams map[uint32]perptypes.PerpetualParams,
) (types.UpdateResult, error) {

	if len(settledUpdate.AssetUpdates) == 0 {
		return types.Success, nil
	}

	if len(settledUpdate.PerpetualUpdates) == 0 && len(settledUpdate.SettledSubaccount.PerpetualPositions) == 0 {
		return types.Success, nil
	}

	collateralPoolId, err := getSubaccountCollateralPoolIdForSettledUpdate(settledUpdate, perpIdToParams)
	if err != nil {
		return types.UpdateCausedError, err
	}

	return k.isValidAssetUpdate(ctx, settledUpdate, collateralPoolId)
}

func (k Keeper) isValidAssetUpdate(
	ctx sdk.Context,
	settledUpdate SettledUpdate,
	collateralPoolId uint32,
) (types.UpdateResult, error) {

	collateralPool, err := k.perpetualsKeeper.GetCollateralPool(ctx, collateralPoolId)
	if err != nil {
		return types.UpdateCausedError, err
	}
	supportedAssetIds := getValidAssetIdMap(collateralPool.MultiCollateralAssets.MultiCollateralAssets)
	for _, assetUpdate := range settledUpdate.AssetUpdates {
		_, ok := supportedAssetIds[assetUpdate.AssetId]
		if !ok {
			return types.ViolatesMultiCollateralConstraints, nil
		}
	}

	// handle existing assets when opening a new position
	for _, existingAsset := range settledUpdate.SettledSubaccount.AssetPositions {
		_, ok := supportedAssetIds[existingAsset.AssetId]
		if !ok {
			return types.ViolatesMultiCollateralConstraints, nil
		}
	}

	return types.Success, nil
}
