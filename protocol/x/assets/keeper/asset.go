package keeper

import (
	"math/big"
	"sort"

	errorsmod "cosmossdk.io/errors"
	sdkmath "cosmossdk.io/math"
	"cosmossdk.io/store/prefix"
	storetypes "cosmossdk.io/store/types"
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) CreateAsset(
	ctx sdk.Context,
	assetId uint32,
	symbol string,
	denom string,
	denomExponent int32,
	hasMarket bool,
	marketId uint32,
	atomicResolution int32,
	assetYieldIndex string,
	maxSlippagePpm uint32,
) (types.Asset, error) {
	if prevAsset, exists := k.GetAsset(ctx, assetId); exists {
		return types.Asset{}, errorsmod.Wrapf(
			types.ErrAssetIdAlreadyExists,
			"previous asset = %v",
			prevAsset,
		)
	}

	if assetId == types.AssetTDai.Id {
		// Ensure assetId zero is always TDai. This is a protocol-wide invariant.
		if denom != types.AssetTDai.Denom {
			return types.Asset{}, types.ErrTDaiMustBeAssetZero
		}

		// Confirm that TDai asset has the expected denom exponent (-6).
		// This is an important invariant before coin-to-quote-quantum conversion
		// is correctly implemented. See CLOB-871 for details.
		if denomExponent != types.AssetTDai.DenomExponent {
			return types.Asset{}, errorsmod.Wrapf(
				types.ErrUnexpectedTDaiDenomExponent,
				"expected = %v, actual = %v",
				types.AssetTDai.DenomExponent,
				denomExponent,
			)
		}
	}

	// Ensure TDai is not created with a non-zero assetId. This is a protocol-wide invariant.
	if assetId != types.AssetTDai.Id && denom == types.AssetTDai.Denom {
		return types.Asset{}, types.ErrTDaiMustBeAssetZero
	}

	// Ensure the denom is unique versus existing assets.
	allAssets := k.GetAllAssets(ctx)
	for _, asset := range allAssets {
		if asset.Denom == denom {
			return types.Asset{}, errorsmod.Wrap(types.ErrAssetDenomAlreadyExists, denom)
		}
	}

	// validate max slippage ppm
	if maxSlippagePpm > 1_000_000 {
		return types.Asset{}, errorsmod.Wrap(types.ErrInvalidMaxSlippagePpm, lib.UintToString(maxSlippagePpm))
	}

	// Create the asset
	asset := types.Asset{
		Id:               assetId,
		Symbol:           symbol,
		Denom:            denom,
		DenomExponent:    denomExponent,
		HasMarket:        hasMarket,
		MarketId:         marketId,
		AtomicResolution: atomicResolution,
		AssetYieldIndex:  assetYieldIndex,
		MaxSlippagePpm:   maxSlippagePpm,
	}

	// Validate market
	if hasMarket {
		if _, err := k.pricesKeeper.GetMarketPrice(ctx, marketId); err != nil {
			return asset, err
		}
	} else if marketId > 0 {
		return asset, errorsmod.Wrapf(
			types.ErrInvalidMarketId,
			"Market ID: %v",
			marketId,
		)
	}

	// Store the new asset
	k.setAsset(ctx, asset)

	k.GetIndexerEventManager().AddTxnEvent(
		ctx,
		indexerevents.SubtypeAsset,
		indexerevents.AssetEventVersion,
		indexer_manager.GetBytes(
			indexerevents.NewAssetCreateEvent(
				assetId,
				asset.Symbol,
				asset.HasMarket,
				asset.MarketId,
				asset.AtomicResolution,
			),
		),
	)

	return asset, nil
}

func (k Keeper) ModifyAsset(
	ctx sdk.Context,
	id uint32,
	hasMarket bool,
	marketId uint32,
) (types.Asset, error) {
	// Get asset
	asset, exists := k.GetAsset(ctx, id)
	if !exists {
		return asset, errorsmod.Wrap(types.ErrAssetDoesNotExist, lib.UintToString(id))
	}

	// Validate market
	if _, err := k.pricesKeeper.GetMarketPrice(ctx, marketId); err != nil {
		return asset, err
	}

	// Modify asset
	asset.HasMarket = hasMarket
	asset.MarketId = marketId

	// Store the modified asset
	k.setAsset(ctx, asset)

	return asset, nil
}

func (k Keeper) setAsset(
	ctx sdk.Context,
	asset types.Asset,
) {
	b := k.cdc.MustMarshal(&asset)
	assetStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.AssetKeyPrefix))
	assetStore.Set(lib.Uint32ToKey(asset.Id), b)
}

func (k Keeper) GetAsset(
	ctx sdk.Context,
	id uint32,
) (val types.Asset, exists bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.AssetKeyPrefix))

	b := store.Get(lib.Uint32ToKey(id))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

func (k Keeper) GetAllAssets(
	ctx sdk.Context,
) (list []types.Asset) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.AssetKeyPrefix))
	iterator := storetypes.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Asset
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	sort.Slice(list, func(i, j int) bool {
		return list[i].Id < list[j].Id
	})

	return list
}

// GetNetCollateral returns the net collateral that a given position (quantums)
// for a given assetId contributes to an account.
func (k Keeper) GetNetCollateral(
	ctx sdk.Context,
	id uint32,
	bigQuantums *big.Int,
	quoteCurrencyAtomicResolution int32,
) (
	bigNetCollateralQuoteQuantums *big.Int,
	err error,
) {
	// Get asset
	asset, exists := k.GetAsset(ctx, id)
	if !exists {
		return big.NewInt(0), errorsmod.Wrap(types.ErrAssetDoesNotExist, lib.UintToString(id))
	}

	// Balance is zero.
	if bigQuantums.Sign() == 0 {
		return big.NewInt(0), nil
	}

	return k.GetSlippageAdjustedQuoteQuantums(ctx, asset, bigQuantums, quoteCurrencyAtomicResolution)
}

func (k Keeper) GetSlippageAdjustedQuoteQuantums(
	ctx sdk.Context,
	asset types.Asset,
	bigQuantums *big.Int,
	quoteCurrencyAtomicResolution int32,
) (*big.Int, error) {
	exponent := int32(0)
	price := uint64(1)

	if asset.HasMarket {
		marketPrice, err := k.pricesKeeper.GetMarketPrice(ctx, asset.MarketId)
		if err != nil {
			return big.NewInt(0), err
		}
		exponent = marketPrice.Exponent
		price = marketPrice.SpotPrice
	}

	bigQuoteQuantums := lib.BaseToQuoteQuantums(
		bigQuantums,
		asset.AtomicResolution,
		quoteCurrencyAtomicResolution,
		price,
		exponent,
	)

	return new(big.Int).Div(
		new(big.Int).Mul(
			bigQuoteQuantums,
			big.NewInt(1_000_000-int64(asset.MaxSlippagePpm)),
		),
		big.NewInt(1_000_000),
	), nil
}

// GetMarginRequirements returns the initial and maintenance margin-
// requirements for a given position size for a given assetId.
func (k Keeper) GetMarginRequirements(
	ctx sdk.Context,
	id uint32,
	bigQuantums *big.Int,
	quoteCurrencyAtomicResolution int32,
) (
	bigInitialMarginQuoteQuantums *big.Int,
	bigMaintenanceMarginQuoteQuantums *big.Int,
	err error,
) {
	return big.NewInt(0), big.NewInt(0), nil
}

// ConvertAssetToCoin converts the given `assetId` and `quantums` used in `x/asset`,
// to an `sdk.Coin` in correspoding `denom` and `amount` used in `x/bank`.
// Also outputs `convertedQuantums` which has the equal value as converted `sdk.Coin`.
// The conversion is done with the formula:
//
//	denom_amount = quantums * 10^(atomic_resolution - denom_exponent)
//
// If the resulting `denom_amount` is not an integer, it is rounded down,
// and `convertedQuantums` of the equal value is returned. The upstream
// transfer function should adjust asset balance with `convertedQuantums`
// to ensure that that no fund is ever lost in the conversion due to rounding error.
//
// Example:
// Assume `denom_exponent` = -7, `atomic_resolution` = -8,
// ConvertAssetToCoin(`101 quantums`) should output:
// - `convertedQuantums` = 100 quantums
// -  converted coin amount = 10 coin
func (k Keeper) ConvertAssetToCoin(
	ctx sdk.Context,
	assetId uint32,
	quantums *big.Int,
) (
	convertedQuantums *big.Int,
	coin sdk.Coin,
	err error,
) {
	asset, exists := k.GetAsset(ctx, assetId)
	if !exists {
		return nil, sdk.Coin{}, errorsmod.Wrap(
			types.ErrAssetDoesNotExist, lib.UintToString(assetId))
	}

	if lib.AbsInt32(asset.AtomicResolution) > types.MaxAssetUnitExponentAbs {
		return nil, sdk.Coin{}, errorsmod.Wrapf(
			types.ErrInvalidAssetAtomicResolution,
			"asset: %+v",
			asset,
		)
	}

	if lib.AbsInt32(asset.DenomExponent) > types.MaxAssetUnitExponentAbs {
		return nil, sdk.Coin{}, errorsmod.Wrapf(
			types.ErrInvalidDenomExponent,
			"asset: %+v",
			asset,
		)
	}

	bigRatDenomAmount := lib.BigMulPow10(
		quantums,
		asset.AtomicResolution-asset.DenomExponent,
	)

	// round down to get denom amount that was converted.
	bigConvertedDenomAmount := lib.BigRatRound(bigRatDenomAmount, false)

	bigRatConvertedQuantums := lib.BigMulPow10(
		bigConvertedDenomAmount,
		asset.DenomExponent-asset.AtomicResolution,
	)

	bigConvertedQuantums := bigRatConvertedQuantums.Num()

	return bigConvertedQuantums, sdk.NewCoin(asset.Denom, sdkmath.NewIntFromBigInt(bigConvertedDenomAmount)), nil
}

// ConvertCoinToAsset converts the given `sdk.Coin` used in `x/bank` to
// the corresponding `quantums` used in `x/asset` for the given `assetId`.
// The conversion is done with the inverse formula of ConvertAssetToCoin:
//
//	quantums = coin_amount * 10^(denom_exponent - atomic_resolution)
//
// If the resulting `quantums` is not an integer, it is rounded down.
// This ensures consistency with ConvertAssetToCoin and prevents
// creation of assets from rounding up.
func (k Keeper) ConvertCoinToAsset(
	ctx sdk.Context,
	assetId uint32,
	coin sdk.Coin,
) (
	quantums *big.Int,
	convertedDenom *big.Int,
	err error,
) {
	asset, exists := k.GetAsset(ctx, assetId)
	if !exists {
		return nil, nil, errorsmod.Wrap(
			types.ErrAssetDoesNotExist, lib.UintToString(assetId))
	}

	if lib.AbsInt32(asset.AtomicResolution) > types.MaxAssetUnitExponentAbs {
		return nil, nil, errorsmod.Wrapf(
			types.ErrInvalidAssetAtomicResolution,
			"asset: %+v",
			asset,
		)
	}

	if lib.AbsInt32(asset.DenomExponent) > types.MaxAssetUnitExponentAbs {
		return nil, nil, errorsmod.Wrapf(
			types.ErrInvalidDenomExponent,
			"asset: %+v",
			asset,
		)
	}

	bigRatQuantums := lib.BigMulPow10(
		coin.Amount.BigInt(),
		asset.DenomExponent-asset.AtomicResolution,
	)

	quantums = lib.BigRatRound(bigRatQuantums, false)

	// If the result is zero, return a true zero for backwards compatibility
	if quantums.Sign() == 0 {
		return big.NewInt(0), big.NewInt(0), nil
	}

	bigRatConvertedDenomAmount := lib.BigMulPow10(
		quantums,
		asset.AtomicResolution-asset.DenomExponent,
	)

	convertedDenom = bigRatConvertedDenomAmount.Num()

	return quantums, convertedDenom, nil
}

// ConvertAssetToFullCoin converts the given `assetId` and `quantums`
// to the amount of full coins given by the atomic resolution.
// fullCointAmount = quantums * 10^(atomic_resolution)
//
// If the resulting full coin amount is not an integer, it is rounded
// down and `convertedQuantums` of the equal value is returned. If
// quantums amount is negative or 0, returns 0 as a result.
func (k Keeper) ConvertAssetToFullCoin(
	ctx sdk.Context,
	assetId uint32,
	quantums *big.Int,
) (
	convertedQuantums *big.Int,
	fullCoinAmount *big.Int,
	err error,
) {
	asset, exists := k.GetAsset(ctx, assetId)
	if !exists {
		return nil, nil, errorsmod.Wrap(
			types.ErrAssetDoesNotExist, lib.UintToString(assetId))
	}

	if lib.AbsInt32(asset.AtomicResolution) > types.MaxAssetUnitExponentAbs {
		return nil, nil, errorsmod.Wrapf(
			types.ErrInvalidAssetAtomicResolution,
			"asset: %+v",
			asset,
		)
	}

	if quantums.Sign() <= 0 {
		return big.NewInt(0), big.NewInt(0), nil
	}

	fullCoinAmount = lib.QuoteQuantumsToFullCoinAmount(quantums, asset.AtomicResolution)

	convertedQuantums = lib.BigMulPow10(
		fullCoinAmount,
		asset.AtomicResolution,
	).Num()

	return convertedQuantums, fullCoinAmount, nil
}

// IsPositionUpdatable returns whether position of an asset is updatable.
func (k Keeper) IsPositionUpdatable(
	ctx sdk.Context,
	id uint32,
) (
	updatable bool,
	err error,
) {
	_, exists := k.GetAsset(ctx, id)
	if !exists {
		return false, errorsmod.Wrap(types.ErrAssetDoesNotExist, lib.UintToString(id))
	}
	// All existing assets are by default updatable.
	return true, nil
}
