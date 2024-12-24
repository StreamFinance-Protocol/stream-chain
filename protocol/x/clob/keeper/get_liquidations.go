package keeper

import (
	"math/big"

	errorsmod "cosmossdk.io/errors"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/heap"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	perpkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) FetchInformationForLiquidations(
	ctx sdk.Context,
) (
	subaccounts []satypes.Subaccount,
	marketPricesMap map[uint32]pricestypes.MarketPrice,
	perpetualsMap map[uint32]perptypes.Perpetual,
	liquidityTiersMap map[uint32]perptypes.LiquidityTier,
) {
	subaccounts = k.subaccountsKeeper.GetAllSubaccount(ctx)

	perpetuals := k.perpetualsKeeper.GetAllPerpetuals(ctx)
	perpetualsMap = lib.UniqueSliceToMap(perpetuals, func(p perptypes.Perpetual) uint32 {
		return p.Params.Id
	})

	liquidityTiers := k.perpetualsKeeper.GetAllLiquidityTiers(ctx)
	liquidityTiersMap = lib.UniqueSliceToMap(liquidityTiers, func(l perptypes.LiquidityTier) uint32 {
		return l.Id
	})

	marketPrices := k.pricesKeeper.GetAllMarketPrices(ctx)
	marketPricesMap = lib.UniqueSliceToMap(marketPrices, func(m pricestypes.MarketPrice) uint32 {
		return m.Id
	})

	return subaccounts, marketPricesMap, perpetualsMap, liquidityTiersMap
}

func (k Keeper) GetLiquidatableAndNegativeTncSubaccountIds(
	ctx sdk.Context,
) (
	liquidatableSubaccountIds *heap.LiquidationPriorityHeap,
	negativeTncSubaccountIds []satypes.SubaccountId,
	err error,
) {
	subaccounts, marketPrices, perpetuals, liquidityTiers := k.FetchInformationForLiquidations(ctx)

	negativeTncSubaccountIds = make([]satypes.SubaccountId, 0)
	liquidatableSubaccountIds = heap.NewLiquidationPriorityHeap()
	for _, subaccount := range subaccounts {
		if len(subaccount.PerpetualPositions) == 0 {
			continue
		}

		isLiquidatable, hasNegativeTnc, liquidationPriority, err := k.GetSubaccountCollateralizationInfo(ctx, subaccount, marketPrices, perpetuals, liquidityTiers)

		if err != nil {
			return nil, nil, errorsmod.Wrap(err, "Error checking collateralization status")
		}

		if isLiquidatable {
			liquidatableSubaccountIds.AddSubaccount(*subaccount.Id, liquidationPriority)
		}
		if hasNegativeTnc {
			negativeTncSubaccountIds = append(negativeTncSubaccountIds, *subaccount.Id)
		}
	}

	return liquidatableSubaccountIds, negativeTncSubaccountIds, nil
}

func (k Keeper) GetSubaccountCollateralizationInfo(
	ctx sdk.Context,
	unsettledSubaccount satypes.Subaccount,
	marketPrices map[uint32]pricestypes.MarketPrice,
	perpetuals map[uint32]perptypes.Perpetual,
	liquidityTiers map[uint32]perptypes.LiquidityTier,
) (
	isLiquidatable bool,
	hasNegativeTnc bool,
	liquidationPriority *big.Float,
	err error,
) {
	bigTotalNetCollateral := big.NewInt(0)
	bigTotalMaintenanceMargin := big.NewInt(0)
	bigWeightedPositionSizeQuoteQuantums := big.NewInt(0)

	settledSubaccount, _, _, err := k.subaccountsKeeper.GetSettledSubaccount(ctx, unsettledSubaccount)
	if err != nil {
		return false, false, nil, err
	}

	quoteCurrencyAtomicResolution, err := k.GetQuoteCurrencyAtomicResolution(ctx, settledSubaccount, perpetuals)
	if err != nil {
		return false, false, nil, err
	}

	err = k.UpdateCollateralizationInfoGivenAssets(ctx, settledSubaccount, bigTotalNetCollateral, quoteCurrencyAtomicResolution)
	if err != nil {
		return false, false, nil, err
	}

	for _, perpetualPosition := range settledSubaccount.PerpetualPositions {
		perpetual, price, liquidityTier, err := getPerpetualLiquidityTierAndPrice(perpetualPosition.PerpetualId, perpetuals, marketPrices, liquidityTiers)
		if err != nil {
			return false, false, nil, err
		}

		updateCollateralizationInfoGivenPerp(perpetual, price, liquidityTier, perpetualPosition.GetBigQuantums(), bigTotalNetCollateral, bigWeightedPositionSizeQuoteQuantums, bigTotalMaintenanceMargin, quoteCurrencyAtomicResolution)
	}

	return finalizeCollateralizationInfo(bigTotalNetCollateral, bigTotalMaintenanceMargin, bigWeightedPositionSizeQuoteQuantums)
}

func (k Keeper) GetQuoteCurrencyAtomicResolution(ctx sdk.Context, subaccount satypes.Subaccount, perpetuals map[uint32]perptypes.Perpetual) (int32, error) {
	if len(subaccount.PerpetualPositions) == 0 {
		return assettypes.AssetTDai.AtomicResolution, nil
	}

	collateralPool, err := k.perpetualsKeeper.GetCollateralPoolFromPerpetualId(ctx, subaccount.PerpetualPositions[0].PerpetualId)
	if err != nil {
		return 0, err
	}

	quoteAsset, exists := k.assetsKeeper.GetAsset(ctx, collateralPool.QuoteAssetId)
	if !exists {
		return 0, errorsmod.Wrapf(assettypes.ErrAssetDoesNotExist, "Quote asset not found for collateral pool %+v", collateralPool)
	}
	return quoteAsset.AtomicResolution, nil
}

func getPerpetualLiquidityTierAndPrice(
	perpetualId uint32,
	perpetuals map[uint32]perptypes.Perpetual,
	marketPrices map[uint32]pricestypes.MarketPrice,
	liquidityTiers map[uint32]perptypes.LiquidityTier,
) (
	perpetual perptypes.Perpetual,
	price pricestypes.MarketPrice,
	liquidityTier perptypes.LiquidityTier,
	err error,
) {
	perpetual, ok := perpetuals[perpetualId]
	if !ok {
		return perptypes.Perpetual{}, pricestypes.MarketPrice{}, perptypes.LiquidityTier{}, errorsmod.Wrapf(
			perptypes.ErrPerpetualDoesNotExist,
			"Perpetual not found for perpetual id %d",
			perpetualId,
		)
	}

	price, ok = marketPrices[perpetual.Params.MarketId]
	if !ok {
		return perptypes.Perpetual{}, pricestypes.MarketPrice{}, perptypes.LiquidityTier{}, errorsmod.Wrapf(
			pricestypes.ErrMarketPriceDoesNotExist,
			"MarketPrice not found for perpetual %+v",
			perpetual,
		)
	}

	liquidityTier, ok = liquidityTiers[perpetual.Params.LiquidityTier]
	if !ok {
		return perptypes.Perpetual{}, pricestypes.MarketPrice{}, perptypes.LiquidityTier{}, errorsmod.Wrapf(
			perptypes.ErrLiquidityTierDoesNotExist,
			"LiquidityTier not found for perpetual %+v",
			perpetual,
		)
	}

	return perpetual, price, liquidityTier, nil
}

func (k Keeper) UpdateCollateralizationInfoGivenAssets(
	ctx sdk.Context,
	settledSubaccount satypes.Subaccount,
	bigTotalNetCollateral *big.Int,
	quoteCurrencyAtomicResolution int32,
) error {

	if len(settledSubaccount.AssetPositions) == 0 {
		return nil
	}

	// Note that we only expect QuoteAsset before multi-collateral support is added.
	if len(settledSubaccount.AssetPositions) > 1 {
		return types.ErrMultiCollateralNotImplemented
	}

	if len(settledSubaccount.PerpetualPositions) > 0 {
		perpetualPosition := settledSubaccount.PerpetualPositions[0]
		perpetualId := perpetualPosition.PerpetualId
		quoteAssetId, err := k.perpetualsKeeper.GetQuoteAssetIdFromPerpetualId(ctx, perpetualId)
		if err != nil {
			return err
		}

		if settledSubaccount.AssetPositions[0].AssetId != quoteAssetId {
			return types.ErrMultiCollateralNotImplemented
		}
	} else {
		if settledSubaccount.AssetPositions[0].AssetId != assettypes.AssetTDai.Id {
			return assettypes.ErrTDaiMustBeQuoteAssetOfBaseCollateralPool
		}
	}

	for _, assetPosition := range settledSubaccount.AssetPositions {
		bigNetCollateralQuoteQuantums, err := k.assetsKeeper.GetNetCollateral(ctx, assetPosition.AssetId, assetPosition.GetBigQuantums(), quoteCurrencyAtomicResolution)
		if err != nil {
			return err
		}
		bigTotalNetCollateral.Add(bigTotalNetCollateral, bigNetCollateralQuoteQuantums)
	}
	return nil
}

func updateCollateralizationInfoGivenPerp(
	perpetual perptypes.Perpetual,
	price pricestypes.MarketPrice,
	liquidityTier perptypes.LiquidityTier,
	bigPositionQuantums *big.Int,
	bigTotalNetCollateral *big.Int,
	bigWeightedPositionSizeQuoteQuantums *big.Int,
	bigTotalMaintenanceMargin *big.Int,
	quoteCurrencyAtomicResolution int32,
) {
	updateNetCollateral(perpetual, price, bigPositionQuantums, bigTotalNetCollateral, quoteCurrencyAtomicResolution)
	updateWeightedPositionSizeQuoteQuantums(perpetual, price, bigPositionQuantums, bigWeightedPositionSizeQuoteQuantums, quoteCurrencyAtomicResolution)
	updateTotalMaintenanceMargin(perpetual, price, liquidityTier, bigPositionQuantums, bigTotalMaintenanceMargin, quoteCurrencyAtomicResolution)
}

func updateNetCollateral(
	perpetual perptypes.Perpetual,
	price pricestypes.MarketPrice,
	bigPositionQuantums *big.Int,
	bigTotalNetCollateral *big.Int,
	quoteCurrencyAtomicResolution int32,
) {
	bigPositionQuoteQuantums := perpkeeper.GetNetNotionalInQuoteQuantums(perpetual, price, bigPositionQuantums, quoteCurrencyAtomicResolution)
	bigTotalNetCollateral.Add(bigTotalNetCollateral, bigPositionQuoteQuantums)
}

func updateWeightedPositionSizeQuoteQuantums(
	perpetual perptypes.Perpetual,
	price pricestypes.MarketPrice,
	bigPositionQuantums *big.Int,
	bigWeightedPositionSizeQuoteQuantums *big.Int,
	quoteCurrencyAtomicResolution int32,
) {
	bigPositionQuoteQuantums := perpkeeper.GetNetNotionalInQuoteQuantums(perpetual, price, bigPositionQuantums, quoteCurrencyAtomicResolution)
	weightedPositionQuoteQuantums := new(big.Int).Mul(bigPositionQuoteQuantums.Abs(bigPositionQuoteQuantums), new(big.Int).SetUint64(uint64(perpetual.Params.DangerIndexPpm)))
	bigWeightedPositionSizeQuoteQuantums.Add(bigWeightedPositionSizeQuoteQuantums, weightedPositionQuoteQuantums)
}

func updateTotalMaintenanceMargin(
	perpetual perptypes.Perpetual,
	price pricestypes.MarketPrice,
	liquidityTier perptypes.LiquidityTier,
	bigPositionQuantums *big.Int,
	bigTotalMaintenanceMargin *big.Int,
	quoteCurrencyAtomicResolution int32,
) {
	_, bigMaintenanceMarginQuoteQuantums := perpkeeper.GetMarginRequirementsInQuoteQuantums(perpetual, price, liquidityTier, bigPositionQuantums, quoteCurrencyAtomicResolution)
	bigTotalMaintenanceMargin.Add(bigTotalMaintenanceMargin, bigMaintenanceMarginQuoteQuantums)
}

func finalizeCollateralizationInfo(
	bigTotalNetCollateral *big.Int,
	bigTotalMaintenanceMargin *big.Int,
	bigWeightedPositionSizeQuoteQuantums *big.Int,
) (
	isLiquidatable bool,
	hasNegativeTnc bool,
	liquidationPriority *big.Float,
	err error,
) {
	isLiquidatable = CanLiquidateSubaccount(bigTotalNetCollateral, bigTotalMaintenanceMargin)
	hasNegativeTnc = bigTotalNetCollateral.Sign() == -1
	liquidationPriority = CalculateLiquidationPriority(
		bigTotalNetCollateral,
		bigTotalMaintenanceMargin,
		bigWeightedPositionSizeQuoteQuantums,
	)

	return isLiquidatable, hasNegativeTnc, liquidationPriority, nil
}
