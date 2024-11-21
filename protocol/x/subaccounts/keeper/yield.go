package keeper

import (
	"math/big"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	ratelimittypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// TODO: [YBCP-89]
func (k Keeper) ClaimYieldForSubaccountFromIdAndSetNewState(
	ctx sdk.Context,
	subaccountId *types.SubaccountId,
) (
	err error,
) {
	if subaccountId == nil {
		return types.ErrSubaccountIdIsNil
	}

	subaccount := k.GetSubaccount(ctx, *subaccountId)

	perpIdToPerp, assetYieldIndex, availableYield, earnsTdaiYield, _, err := k.fetchParamsToSettleSubaccount(ctx, subaccount)
	if err != nil {
		return err
	}
	if !earnsTdaiYield {
		return types.ErrNoYieldToClaim
	}

	settledSubaccount, totalYieldInQuantums, err := AddYieldToSubaccount(subaccount, perpIdToPerp, assetYieldIndex, availableYield)
	if err != nil {
		return err
	}

	err = k.DepositYieldToSubaccount(ctx, *settledSubaccount.Id, totalYieldInQuantums)
	if err != nil {
		return err
	}

	k.SetSubaccount(ctx, settledSubaccount)

	return nil
}

func (k Keeper) CheckIfSubaccountEarnsTdaiYield(
	ctx sdk.Context,
	subaccount types.Subaccount,
) (
	earnsTdaiYield bool,
	err error,
) {
	if len(subaccount.AssetPositions) == 0 && len(subaccount.PerpetualPositions) == 0 {
		return false, nil
	}

	if subaccount.GetTDaiPosition().Cmp(big.NewInt(0)) == 0 {
		if len(subaccount.PerpetualPositions) == 0 {
			return false, nil
		}
		// all perpetuals in a subaccount have the same supported collateral assets
		perpetualPosition := subaccount.PerpetualPositions[0]
		perpetual, err := k.perpetualsKeeper.GetPerpetual(ctx, perpetualPosition.PerpetualId)
		if err != nil {
			return false, err
		}
		collateralPool, err := k.perpetualsKeeper.GetCollateralPool(ctx, perpetual.Params.CollateralPoolId)
		if err != nil {
			return false, err
		}

		found := false
		for _, asset := range collateralPool.MultiCollateralAssets.MultiCollateralAssets {
			if asset == assettypes.AssetTDai.Id {
				found = true
				break
			}
		}
		if !found {
			return false, nil
		}
	}

	return true, nil
}

func AddYieldToSubaccount(
	subaccount types.Subaccount,
	perpIdToPerp map[uint32]perptypes.Perpetual,
	assetYieldIndex *big.Rat,
	availableYieldInQuantums *big.Int,
) (
	settledSubaccount types.Subaccount,
	totalNewYieldInQuantums *big.Int,
	err error,
) {
	totalNewYieldInQuantums, err = getYieldFromAssetPositions(subaccount, assetYieldIndex)
	if err != nil {
		return types.Subaccount{}, nil, err
	}

	totalNewYieldInQuantums = HandleInsufficientYieldDueToNegativeTNC(totalNewYieldInQuantums, availableYieldInQuantums)

	assetYieldIndexString := assetYieldIndex.String()
	newSubaccount := types.Subaccount{
		Id:                 subaccount.Id,
		AssetPositions:     subaccount.AssetPositions,
		PerpetualPositions: subaccount.PerpetualPositions,
		MarginEnabled:      subaccount.MarginEnabled,
		AssetYieldIndex:    assetYieldIndexString,
	}

	if totalNewYieldInQuantums.Cmp(big.NewInt(0)) < 0 {
		totalNewYieldInQuantums = big.NewInt(0)
	}

	newTDaiPosition := new(big.Int).Add(subaccount.GetTDaiPosition(), totalNewYieldInQuantums)

	// TODO(CLOB-993): Remove this function and use `UpdateAssetPositions` instead.
	newSubaccount.SetTDaiAssetPosition(newTDaiPosition)
	return newSubaccount, totalNewYieldInQuantums, nil
}

func HandleInsufficientYieldDueToNegativeTNC(
	totalNewYield *big.Int,
	availableYield *big.Int,
) (
	yieldToTransfer *big.Int,
) {
	yieldToTransfer = new(big.Int).Set(totalNewYield)
	if availableYield.Cmp(totalNewYield) < 0 {
		yieldToTransfer.Set(availableYield)
	}

	return yieldToTransfer
}

// -------------------ASSET YIELD --------------------------

func getYieldFromAssetPositions(
	subaccount types.Subaccount,
	assetYieldIndex *big.Rat,
) (
	newAssetYield *big.Int,
	err error,
) {
	for _, assetPosition := range subaccount.AssetPositions {
		if assetPosition.AssetId != assettypes.AssetTDai.Id {
			continue
		}

		newAssetYield, err := calculateAssetYieldInQuoteQuantums(subaccount, assetYieldIndex, assetPosition)
		if err != nil {
			return nil, err
		} else {
			return newAssetYield, err
		}
	}
	return big.NewInt(0), nil
}

func calculateAssetYieldInQuoteQuantums(
	subaccount types.Subaccount,
	generalYieldIndex *big.Rat,
	assetPosition *types.AssetPosition,
) (
	newYield *big.Int,
	err error,
) {
	if assetPosition == nil {
		return nil, types.ErrPositionIsNil
	}

	if generalYieldIndex == nil {
		return nil, types.ErrGlobalYieldIndexNil
	}

	if generalYieldIndex.Cmp(big.NewRat(0, 1)) < 0 {
		return nil, types.ErrGlobalYieldIndexNegative
	}

	if generalYieldIndex.Cmp(big.NewRat(0, 1)) == 0 {
		return big.NewInt(0), nil
	}

	if subaccount.AssetYieldIndex == "" {
		return nil, types.ErrYieldIndexUninitialized
	}

	currentYieldIndex, success := new(big.Rat).SetString(subaccount.AssetYieldIndex)
	if !success {
		return nil, types.ErrRatConversion
	}

	if generalYieldIndex.Cmp(currentYieldIndex) < 0 {
		return nil, types.ErrGeneralYieldIndexSmallerThanYieldIndexInSubaccount
	}

	assetAmount := new(big.Rat).SetInt(assetPosition.GetBigQuantums())
	currYieldIndexdivisor := currentYieldIndex
	if currYieldIndexdivisor.Cmp(big.NewRat(0, 1)) == 0 {
		currYieldIndexdivisor = big.NewRat(1, 1)
	}

	yieldIndexQuotient := new(big.Rat).Quo(generalYieldIndex, currYieldIndexdivisor)
	newAssetAmount := new(big.Rat).Mul(assetAmount, yieldIndexQuotient)
	newYieldRat := new(big.Rat).Sub(newAssetAmount, assetAmount)

	newYield = lib.BigRatRound(newYieldRat, false)

	return newYield, nil
}

// -------------------YIELD ON BANK LEVEL --------------------------

func (k Keeper) DepositYieldToSubaccount(
	ctx sdk.Context,
	subaccountId types.SubaccountId,
	totalYieldInQuantums *big.Int,
) error {
	if totalYieldInQuantums == nil {
		return nil
	}

	if totalYieldInQuantums.Cmp(big.NewInt(0)) == 0 {
		return nil
	}

	if totalYieldInQuantums.Cmp(big.NewInt(0)) == -1 {
		return types.ErrTryingToDepositNegativeYield
	}

	_, coinToTransfer, err := k.assetsKeeper.ConvertAssetToCoin(
		ctx,
		assettypes.AssetTDai.Id,
		totalYieldInQuantums,
	)
	if err != nil {
		return err
	}

	collateralPoolAddr, err := k.GetCollateralPoolForSubaccount(ctx, subaccountId)
	if err != nil {
		return err
	}

	if err := k.bankKeeper.SendCoinsFromModuleToAccount(
		ctx,
		ratelimittypes.TDaiPoolAccount,
		collateralPoolAddr,
		[]sdk.Coin{coinToTransfer},
	); err != nil {
		return err
	}

	return nil
}
