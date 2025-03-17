package keeper

import (
	"math/big"

	errorsmod "cosmossdk.io/errors"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	yieldstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// TODO: [YBCP-89]
func (k Keeper) ClaimYieldsForSubaccountFromIdAndSetNewState(
	ctx sdk.Context,
	subaccountId *types.SubaccountId,
) (
	err error,
) {
	if subaccountId == nil {
		return types.ErrSubaccountIdIsNil
	}

	subaccount := k.GetSubaccount(ctx, *subaccountId)

	perpIdToPerp, assetYieldsIndex, availableYields, earnsTdaiYields, _, err := k.fetchParamsToSettleSubaccount(ctx, subaccount)
	if err != nil {
		return err
	}

	if !earnsTdaiYields {
		return types.ErrNoYieldsToClaim
	}

	settledSubaccount, totalYieldsInQuantums, err := AddYieldsToSubaccount(subaccount, perpIdToPerp, assetYieldsIndex, availableYields)
	if err != nil {
		return err
	}

	err = k.DepositYieldsToSubaccount(ctx, *settledSubaccount.Id, totalYieldsInQuantums)
	if err != nil {
		return err
	}

	k.SetSubaccount(ctx, settledSubaccount)

	return nil
}

func (k Keeper) DoesSubaccountEarnTDaiYields(
	ctx sdk.Context,
	subaccount types.Subaccount,
) (
	earnsTdaiYields bool,
	err error,
) {
	if len(subaccount.PerpetualPositions) == 0 {
		return subaccount.GetTDaiPosition().Cmp(big.NewInt(0)) != 0, nil
	}

	quoteAssetId, err := k.getQuoteAssetId(ctx, subaccount)
	if err != nil {
		return false, err
	}

	return quoteAssetId == assettypes.AssetTDai.Id, nil
}

func AddYieldsToSubaccount(
	subaccount types.Subaccount,
	perpIdToPerp map[uint32]perptypes.Perpetual,
	assetYieldsIndex *big.Rat,
	availableYieldsInQuantums *big.Int,
) (
	settledSubaccount types.Subaccount,
	totalNewYieldsInQuantums *big.Int,
	err error,
) {
	assetYields, err := getYieldsFromAssetPositions(subaccount, assetYieldsIndex)
	if err != nil {
		return types.Subaccount{}, nil, err
	}

	totalNewPerpYields, updatedYieldsIndexPerpPosition, err := getYieldsFromPerpPositions(subaccount, perpIdToPerp)
	if err != nil {
		return types.Subaccount{}, nil, err
	}

	totalNewYieldsInQuantums = new(big.Int).Add(assetYields, totalNewPerpYields)

	totalNewYieldsInQuantums = handleInsufficientYieldsDueToNegativeTNC(totalNewYieldsInQuantums, availableYieldsInQuantums)

	assetYieldsIndexString := assetYieldsIndex.String()
	newSubaccount := types.Subaccount{
		Id:                 subaccount.Id,
		AssetPositions:     subaccount.AssetPositions,
		PerpetualPositions: updatedYieldsIndexPerpPosition,
		MarginEnabled:      subaccount.MarginEnabled,
		AssetYieldsIndex:   assetYieldsIndexString,
	}

	if totalNewYieldsInQuantums.Cmp(big.NewInt(0)) < 0 {
		totalNewYieldsInQuantums = big.NewInt(0)
	}

	newTDaiPosition := new(big.Int).Add(subaccount.GetTDaiPosition(), totalNewYieldsInQuantums)

	// TODO(CLOB-993): Remove this function and use `UpdateAssetPositions` instead.
	newSubaccount.SetTDaiAssetPosition(newTDaiPosition)
	return newSubaccount, totalNewYieldsInQuantums, nil
}

func handleInsufficientYieldsDueToNegativeTNC(
	totalNewYields *big.Int,
	availableYields *big.Int,
) (
	yieldsToTransfer *big.Int,
) {
	yieldsToTransfer = new(big.Int).Set(totalNewYields)
	if availableYields.Cmp(totalNewYields) < 0 {
		yieldsToTransfer.Set(availableYields)
	}

	return yieldsToTransfer
}

// -------------------ASSET YIELDS --------------------------

func getYieldsFromAssetPositions(
	subaccount types.Subaccount,
	assetYieldsIndex *big.Rat,
) (
	newAssetYields *big.Int,
	err error,
) {
	for _, assetPosition := range subaccount.AssetPositions {
		if assetPosition.AssetId != assettypes.AssetTDai.Id {
			continue
		}

		newAssetYields, err := calculateAssetYieldsInQuoteQuantums(subaccount, assetYieldsIndex, assetPosition)
		if err != nil {
			return nil, err
		} else {
			return newAssetYields, err
		}
	}
	return big.NewInt(0), nil
}

func calculateAssetYieldsInQuoteQuantums(
	subaccount types.Subaccount,
	generalYieldsIndex *big.Rat,
	assetPosition *types.AssetPosition,
) (
	newYields *big.Int,
	err error,
) {

	if generalYieldsIndex.Cmp(big.NewRat(0, 1)) < 0 {
		return nil, types.ErrGlobalYieldsIndexNegative
	}

	// required because of how calculation handles when currentYieldsIndex is 0
	if generalYieldsIndex.Cmp(big.NewRat(0, 1)) == 0 {
		return big.NewInt(0), nil
	}

	currentYieldsIndex, success := new(big.Rat).SetString(subaccount.AssetYieldsIndex)
	if !success {
		return nil, types.ErrRatConversion
	}

	if generalYieldsIndex.Cmp(currentYieldsIndex) < 0 {
		return nil, types.ErrGeneralYieldsIndexSmallerThanYieldsIndexInSubaccount
	}

	assetAmount := new(big.Rat).SetInt(assetPosition.GetBigQuantums())
	currYieldsIndexdivisor := currentYieldsIndex
	if currYieldsIndexdivisor.Cmp(big.NewRat(0, 1)) == 0 {
		currYieldsIndexdivisor = big.NewRat(1, 1)
	}

	yieldsIndexQuotient := new(big.Rat).Quo(generalYieldsIndex, currYieldsIndexdivisor)
	newAssetAmount := new(big.Rat).Mul(assetAmount, yieldsIndexQuotient)
	newYieldsRat := new(big.Rat).Sub(newAssetAmount, assetAmount)

	newYields = lib.BigRatRound(newYieldsRat, false)

	return newYields, nil
}

// -------------------PERP YIELDS --------------------------

func getYieldsFromPerpPositions(
	subaccount types.Subaccount,
	perpIdToPerp map[uint32]perptypes.Perpetual,
) (
	totalNewPerpYields *big.Int,
	newPerpetualPositions []*types.PerpetualPosition,
	err error,
) {
	totalNewPerpYields = big.NewInt(0)
	newPerpetualPositions = []*types.PerpetualPosition{}

	for _, perpetualPosition := range subaccount.PerpetualPositions {
		perpetual, found := perpIdToPerp[perpetualPosition.PerpetualId]
		if !found {
			return nil,
				nil,
				errorsmod.Wrap(
					perptypes.ErrPerpetualDoesNotExist, lib.UintToString(perpetualPosition.PerpetualId),
				)
		}

		perpYields, perpYieldsIndex, err := calculateNewPerpYields(perpetual, perpetualPosition)
		if err != nil {
			return nil, nil, err
		}
		totalNewPerpYields = new(big.Int).Add(totalNewPerpYields, perpYields)

		newPerpetualPosition := types.PerpetualPosition{
			PerpetualId:  perpetualPosition.PerpetualId,
			Quantums:     perpetualPosition.Quantums,
			FundingIndex: perpetualPosition.FundingIndex,
			YieldsIndex:  perpYieldsIndex.String(),
		}
		newPerpetualPositions = append(newPerpetualPositions, &newPerpetualPosition)
	}
	return totalNewPerpYields, newPerpetualPositions, nil
}

func calculateNewPerpYields(
	perpetual perptypes.Perpetual,
	perpetualPosition *types.PerpetualPosition,
) (
	newPerpYields *big.Int,
	perpYieldsIndex *big.Rat,
	err error,
) {
	perpYieldsIndex, err = GetCurrentYieldsIndexForPerp(perpetual)
	if err != nil {
		return nil, nil, err
	}

	newPerpYields, err = calculatePerpetualYieldsInQuoteQuantums(perpetualPosition, perpYieldsIndex)
	if err != nil {
		return nil, nil, err
	}

	return newPerpYields, perpYieldsIndex, nil
}

func GetCurrentYieldsIndexForPerp(
	perp perptypes.Perpetual,
) (
	yieldsIndex *big.Rat,
	err error,
) {
	if perp.YieldsIndex == "" {
		return nil, types.ErrPerpYieldsIndexUninitialized
	}

	generalYieldsIndex, success := new(big.Rat).SetString(perp.YieldsIndex)
	if !success {
		return nil, types.ErrRatConversion
	}
	return generalYieldsIndex, nil
}

func calculatePerpetualYieldsInQuoteQuantums(
	perpPosition *types.PerpetualPosition,
	generalYieldsIndex *big.Rat,
) (
	newYields *big.Int,
	err error,
) {

	if generalYieldsIndex.Cmp(big.NewRat(0, 1)) < 0 {
		return nil, types.ErrGlobalYieldsIndexNegative
	}

	// required because of how calculation handles when currentYieldsIndex is 0
	if generalYieldsIndex.Cmp(big.NewRat(0, 1)) == 0 {
		return big.NewInt(0), nil
	}

	if perpPosition.YieldsIndex == "" {
		return nil, types.ErrPerpYieldsIndexUninitialized
	}

	currentYieldsIndex, success := new(big.Rat).SetString(perpPosition.YieldsIndex)
	if !success {
		return nil, types.ErrRatConversion
	}

	if generalYieldsIndex.Cmp(currentYieldsIndex) < 0 {
		return nil, types.ErrGeneralYieldsIndexSmallerThanYieldsIndexInSubaccount
	}

	yieldsIndexDifference := new(big.Rat).Sub(generalYieldsIndex, currentYieldsIndex)
	perpAmount := new(big.Rat).SetInt(perpPosition.GetBigQuantums())
	newYieldsRat := new(big.Rat).Mul(perpAmount, yieldsIndexDifference)
	newYields = lib.BigRatRound(newYieldsRat, false)

	return newYields, nil
}

// -------------------YIELDS ON BANK LEVEL --------------------------

func (k Keeper) DepositYieldsToSubaccount(
	ctx sdk.Context,
	subaccountId types.SubaccountId,
	totalYieldsInQuantums *big.Int,
) error {
	if totalYieldsInQuantums == nil {
		return nil
	}

	if totalYieldsInQuantums.Cmp(big.NewInt(0)) == 0 {
		return nil
	}

	if totalYieldsInQuantums.Cmp(big.NewInt(0)) == -1 {
		return types.ErrTryingToDepositNegativeYields
	}

	_, coinToTransfer, err := k.assetsKeeper.ConvertAssetToCoin(
		ctx,
		assettypes.AssetTDai.Id,
		totalYieldsInQuantums,
	)
	if err != nil {
		return err
	}

	collateralPoolAddr, err := k.GetCollateralPoolAddressFromSubaccountId(ctx, subaccountId)
	if err != nil {
		return err
	}

	if err := k.bankKeeper.SendCoinsFromModuleToAccount(
		ctx,
		yieldstypes.TDaiPoolAccount,
		collateralPoolAddr,
		[]sdk.Coin{coinToTransfer},
	); err != nil {
		return err
	}

	return nil
}
