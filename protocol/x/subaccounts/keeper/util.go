package keeper

import (
	"math"

	errorsmod "cosmossdk.io/errors"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k *Keeper) getQuoteAssetId(
	ctx sdk.Context,
	subaccount types.Subaccount,
) (uint32, error) {

	if len(subaccount.PerpetualPositions) == 0 {
		return math.MaxUint32, nil
	}

	collateralPool, err := k.perpetualsKeeper.GetCollateralPoolFromPerpetualId(
		ctx,
		subaccount.PerpetualPositions[0].PerpetualId,
	)
	if err != nil {
		return 0, err
	}

	return collateralPool.QuoteAssetId, nil
}

func getSubaccountCollateralPoolIdForSettledUpdate(
	settledUpdate SettledUpdate,
	perpIdToParams map[uint32]perptypes.PerpetualParams,
) (uint32, error) {
	if len(settledUpdate.SettledSubaccount.PerpetualPositions) > 0 {
		positionPerpId := settledUpdate.SettledSubaccount.PerpetualPositions[0].PerpetualId
		params, exists := perpIdToParams[positionPerpId]
		if !exists {
			return 0, errorsmod.Wrap(
				perptypes.ErrPerpetualDoesNotExist,
				lib.UintToString(positionPerpId),
			)
		}

		return params.CollateralPoolId, nil
	}

	if len(settledUpdate.PerpetualUpdates) > 0 {
		updatePerpId := settledUpdate.PerpetualUpdates[0].PerpetualId
		params, exists := perpIdToParams[updatePerpId]
		if !exists {
			return 0, errorsmod.Wrap(
				perptypes.ErrPerpetualDoesNotExist,
				lib.UintToString(updatePerpId),
			)
		}

		return params.CollateralPoolId, nil
	}

	return 0, errorsmod.Wrap(
		perptypes.ErrPerpetualDoesNotExist,
		"no perpetuals available in subaccount "+
			"during getSubaccountCollateralPoolIdForSettledUpdate",
	)
}

func getPerpIdToCollateralPoolIdMap(
	perpetuals []perptypes.Perpetual,
) map[uint32]uint32 {
	var perpIdToCollateralPoolId = make(map[uint32]uint32)

	for _, perpetual := range perpetuals {
		perpIdToCollateralPoolId[perpetual.GetId()] = perpetual.Params.CollateralPoolId
	}

	return perpIdToCollateralPoolId
}

func getPerpIdToParams(
	perpetuals []perptypes.Perpetual,
) map[uint32]perptypes.PerpetualParams {
	var perpIdToMarketType = make(map[uint32]perptypes.PerpetualParams)

	for _, perpetual := range perpetuals {
		perpIdToMarketType[perpetual.GetId()] = perpetual.Params
	}

	return perpIdToMarketType
}

func getValidAssetIdMap(
	assetIds []uint32,
) (assetIdsMap map[uint32]struct{}) {

	assetIdsMap = make(map[uint32]struct{})
	for _, asset := range assetIds {
		assetIdsMap[asset] = struct{}{}
	}

	return assetIdsMap
}
