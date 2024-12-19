package keeper_test

import (
	"testing"

	"math/big"

	errorsmod "cosmossdk.io/errors"
	constants "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	assetskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/keeper"
	asstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	perpetualskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	priceskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/keeper"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

type MultiCollatUpdateTest struct {
	settledUpdate  keeper.SettledUpdate
	perpIdToParams map[uint32]perptypes.PerpetualParams
	perpetuals     []perptypes.Perpetual
	assets         []asstypes.Asset
	collatPools    []perptypes.CollateralPool
	marketParams   []pricestypes.MarketParam
	liqTiers       []perptypes.LiquidityTier
	expectedResult types.UpdateResult
	expectedErr    error
}

func TestIsValidMultiCollateralUpdate(t *testing.T) {
	tests := map[string]MultiCollatUpdateTest{
		"Success: no asset updates": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{},
				AssetUpdates:      []types.AssetUpdate{},
			},
			perpetuals: []perptypes.Perpetual{},
			assets: []asstypes.Asset{
				*constants.TDai,
			},
			collatPools:    []perptypes.CollateralPool{},
			marketParams:   []pricestypes.MarketParam{},
			liqTiers:       []perptypes.LiquidityTier{},
			perpIdToParams: map[uint32]perptypes.PerpetualParams{},
			expectedResult: types.Success,
		},
		"Success: asset updates, no perps or perp updates": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: constants.Alice_Num0_1USD,
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          0,
						BigQuantumsDelta: big.NewInt(10_000_000),
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_0DefaultFunding_10AtomicResolution,
			},
			assets: []asstypes.Asset{
				*constants.TDai,
			},
			collatPools: []perptypes.CollateralPool{
				constants.CollateralPools[0],
			},
			marketParams: []pricestypes.MarketParam{
				constants.TestMarketParams[0],
			},
			liqTiers: []perptypes.LiquidityTier{
				constants.LiquidityTiers[1],
			},
			perpIdToParams: map[uint32]perptypes.PerpetualParams{
				0: constants.BtcUsd_0DefaultFunding_10AtomicResolution_Params,
			},
			expectedResult: types.Success,
		},
		"Success: New Position with valid asset updates": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: constants.Alice_Num0_1USD,
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          0,
						BigQuantumsDelta: big.NewInt(10_000_000),
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      0,
						BigQuantumsDelta: big.NewInt(10_000_000_000),
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_0DefaultFunding_10AtomicResolution,
			},
			collatPools: []perptypes.CollateralPool{
				constants.CollateralPools[0],
			},
			assets: []asstypes.Asset{
				*constants.TDai,
			},
			marketParams: []pricestypes.MarketParam{
				constants.TestMarketParams[0],
			},
			liqTiers: []perptypes.LiquidityTier{
				constants.LiquidityTiers[1],
			},
			perpIdToParams: map[uint32]perptypes.PerpetualParams{
				0: constants.BtcUsd_0DefaultFunding_10AtomicResolution_Params,
			},
			expectedResult: types.Success,
		},
		"Success: Closing Position with valid asset updates": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: constants.Alice_Num1_1BTC_Short_100_000USD,
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          0,
						BigQuantumsDelta: big.NewInt(100_000_000),
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      0,
						BigQuantumsDelta: big.NewInt(100_000_000),
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_0DefaultFunding_10AtomicResolution,
			},
			collatPools: []perptypes.CollateralPool{
				constants.CollateralPools[0],
			},
			assets: []asstypes.Asset{
				*constants.TDai,
			},
			marketParams: []pricestypes.MarketParam{
				constants.TestMarketParams[0],
			},
			liqTiers: []perptypes.LiquidityTier{
				constants.LiquidityTiers[1],
			},
			perpIdToParams: map[uint32]perptypes.PerpetualParams{
				0: constants.BtcUsd_0DefaultFunding_10AtomicResolution_Params,
			},
			expectedResult: types.Success,
		},
		"Success: Updating Position with valid asset updates": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: constants.Alice_Num1_1BTC_Short_100_000USD,
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          0,
						BigQuantumsDelta: big.NewInt(100_000_000),
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      0,
						BigQuantumsDelta: big.NewInt(-100_000_000),
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_0DefaultFunding_10AtomicResolution,
			},
			collatPools: []perptypes.CollateralPool{
				constants.CollateralPools[0],
			},
			assets: []asstypes.Asset{
				*constants.TDai,
			},
			marketParams: []pricestypes.MarketParam{
				constants.TestMarketParams[0],
			},
			liqTiers: []perptypes.LiquidityTier{
				constants.LiquidityTiers[1],
			},
			perpIdToParams: map[uint32]perptypes.PerpetualParams{
				0: constants.BtcUsd_0DefaultFunding_10AtomicResolution_Params,
			},
			expectedResult: types.Success,
		},
		"Success: Opening Position with valid asset updates - btc as quote": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: constants.Alice_Num1_1BTC,
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          1,
						BigQuantumsDelta: big.NewInt(100_000_000),
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      1,
						BigQuantumsDelta: big.NewInt(-100_000_000),
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_0DefaultFunding_10AtomicResolution_UniqueCollatPool,
			},
			collatPools: []perptypes.CollateralPool{
				constants.CollateralPools[1],
			},
			assets: []asstypes.Asset{
				*constants.BtcUsd,
			},
			marketParams: []pricestypes.MarketParam{
				constants.TestMarketParams[0],
			},
			liqTiers: []perptypes.LiquidityTier{
				constants.LiquidityTiers[1],
			},
			perpIdToParams: map[uint32]perptypes.PerpetualParams{
				1: constants.BtcUsd_0DefaultFunding_10AtomicResolution_UniqueCollatPool_Params,
			},
			expectedResult: types.Success,
		},
		"Failure: Opening Position with valid asset updates - invalid existing asset": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: constants.Alice_Num1_10_000USD,
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          1,
						BigQuantumsDelta: big.NewInt(100_000_000),
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      1,
						BigQuantumsDelta: big.NewInt(-100_000_000),
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_0DefaultFunding_10AtomicResolution_UniqueCollatPool,
			},
			collatPools: []perptypes.CollateralPool{
				constants.CollateralPools[1],
			},
			assets: []asstypes.Asset{
				*constants.TDai,
				*constants.BtcUsd,
			},
			marketParams: []pricestypes.MarketParam{
				constants.TestMarketParams[0],
			},
			liqTiers: []perptypes.LiquidityTier{
				constants.LiquidityTiers[1],
			},
			perpIdToParams: map[uint32]perptypes.PerpetualParams{
				1: constants.BtcUsd_0DefaultFunding_10AtomicResolution_UniqueCollatPool_Params,
			},
			expectedResult: types.ViolatesMultiCollateralConstraints,
		},
		"Failure: perp update for perp that doesn't exist": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: constants.Alice_Num0_1USD,
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          0,
						BigQuantumsDelta: big.NewInt(10_000_000),
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      1,
						BigQuantumsDelta: big.NewInt(10_000_000),
					},
				},
			},

			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_0DefaultFunding_10AtomicResolution,
			},
			collatPools: []perptypes.CollateralPool{
				constants.CollateralPools[0],
			},
			assets: []asstypes.Asset{
				*constants.TDai,
			},
			marketParams: []pricestypes.MarketParam{
				constants.TestMarketParams[0],
			},
			liqTiers: []perptypes.LiquidityTier{
				constants.LiquidityTiers[1],
			},
			perpIdToParams: map[uint32]perptypes.PerpetualParams{
				999: constants.BtcUsd_0DefaultFunding_10AtomicResolution_Params,
			},
			expectedResult: types.UpdateCausedError,
			expectedErr:    errorsmod.Wrap(perptypes.ErrPerpetualDoesNotExist, "999"),
		},
		"Failure: asset doesn't exist in collat pool - multi asset updates": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: constants.Alice_Num1_1BTC_Short_100_000USD,
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          0,
						BigQuantumsDelta: big.NewInt(100_000_000),
					},
					{
						AssetId:          1,
						BigQuantumsDelta: big.NewInt(100_000_000),
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      0,
						BigQuantumsDelta: big.NewInt(100_000_000),
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_0DefaultFunding_10AtomicResolution,
			},
			collatPools: []perptypes.CollateralPool{
				constants.CollateralPools[0],
			},
			assets: []asstypes.Asset{
				*constants.TDai,
				*constants.BtcUsd,
			},
			marketParams: []pricestypes.MarketParam{
				constants.TestMarketParams[0],
			},
			liqTiers: []perptypes.LiquidityTier{
				constants.LiquidityTiers[1],
			},

			perpIdToParams: map[uint32]perptypes.PerpetualParams{
				0: constants.BtcUsd_0DefaultFunding_10AtomicResolution_Params,
			},
			expectedResult: types.ViolatesMultiCollateralConstraints,
		},
		"Failure: asset doesn't exist in collat pool - single asset updates": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: constants.Alice_Num1_1BTC_Short_100_000USD,
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          1,
						BigQuantumsDelta: big.NewInt(100_000_000),
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      0,
						BigQuantumsDelta: big.NewInt(100_000_000),
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_0DefaultFunding_10AtomicResolution,
			},
			collatPools: []perptypes.CollateralPool{
				constants.CollateralPools[0],
				constants.CollateralPools[1],
			},
			assets: []asstypes.Asset{
				*constants.TDai,
				*constants.BtcUsd,
			},
			marketParams: []pricestypes.MarketParam{
				constants.TestMarketParams[0],
			},
			liqTiers: []perptypes.LiquidityTier{
				constants.LiquidityTiers[1],
			},
			perpIdToParams: map[uint32]perptypes.PerpetualParams{
				0: constants.BtcUsd_0DefaultFunding_10AtomicResolution_Params,
			},
			expectedResult: types.ViolatesMultiCollateralConstraints,
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx, keeper, pricesKeeper, perpKeeper, _, _, assetsKeeper, _, _, _ := testutil.SubaccountsKeepers(
				t,
				true,
			)
			err := createMarkets(ctx, pricesKeeper, tc.marketParams)
			require.NoError(t, err)
			err = createAssets(ctx, assetsKeeper, tc.assets)
			require.NoError(t, err)
			err = createLiquidityTiers(ctx, perpKeeper, tc.liqTiers)
			require.NoError(t, err)
			err = createCollateralPools(ctx, perpKeeper, tc.collatPools)
			require.NoError(t, err)
			err = createPerpetuals(ctx, perpKeeper, tc.perpetuals)
			require.NoError(t, err)
			result, err := keeper.IsValidMultiCollateralUpdate(
				ctx,
				tc.settledUpdate,
				tc.perpIdToParams,
			)

			if tc.expectedErr != nil {
				require.ErrorIs(t, err, tc.expectedErr)
			} else {
				require.NoError(t, err)
			}
			require.Equal(t, tc.expectedResult, result)

		})
	}
}

func createPerpetuals(
	ctx sdk.Context,
	perpKeeper *perpetualskeeper.Keeper,
	perpetuals []perptypes.Perpetual,
) error {

	for _, perp := range perpetuals {
		_, err := perpKeeper.CreatePerpetual(
			ctx,
			perp.Params.Id,
			perp.Params.Ticker,
			perp.Params.MarketId,
			perp.Params.AtomicResolution,
			perp.Params.DefaultFundingPpm,
			perp.Params.LiquidityTier,
			perp.Params.DangerIndexPpm,
			perp.Params.CollateralPoolId,
			perp.YieldIndex,
		)
		if err != nil {
			return err
		}
	}

	return nil
}

func createCollateralPools(
	ctx sdk.Context,
	perpKeeper *perpetualskeeper.Keeper,
	collatPools []perptypes.CollateralPool,
) error {
	for _, collatPool := range collatPools {
		_, err := perpKeeper.UpsertCollateralPool(
			ctx,
			collatPool.CollateralPoolId,
			collatPool.MaxCumulativeInsuranceFundDeltaPerBlock,
			collatPool.MultiCollateralAssets,
			collatPool.QuoteAssetId,
		)
		if err != nil {
			return err
		}
	}
	return nil
}

func createMarkets(
	ctx sdk.Context,
	pricesKeeper *priceskeeper.Keeper,
	marketParams []pricestypes.MarketParam,
) error {
	for _, marketParam := range marketParams {
		_, err := pricesKeeper.CreateMarket(
			ctx,
			marketParam,
			pricestypes.MarketPrice{
				Id:        marketParam.Id,
				Exponent:  marketParam.Exponent,
				SpotPrice: 100_000_000,
				PnlPrice:  100_000_000,
			},
		)
		if err != nil {
			return err
		}
	}
	return nil
}

func createLiquidityTiers(
	ctx sdk.Context,
	perpKeeper *perpetualskeeper.Keeper,
	liqTiers []perptypes.LiquidityTier,
) error {
	for _, liqTier := range liqTiers {
		_, err := perpKeeper.SetLiquidityTier(
			ctx,
			liqTier.Id,
			liqTier.Name,
			liqTier.InitialMarginPpm,
			liqTier.MaintenanceFractionPpm,
			liqTier.ImpactNotional,
			liqTier.OpenInterestLowerCap,
			liqTier.OpenInterestUpperCap,
		)
		if err != nil {
			return err
		}
	}
	return nil
}

func createAssets(
	ctx sdk.Context,
	assetsKeeper *assetskeeper.Keeper,
	assets []asstypes.Asset,
) error {
	for _, asset := range assets {

		_, err := assetsKeeper.CreateAsset(
			ctx,
			asset.Id,
			asset.Symbol,
			asset.Denom,
			asset.DenomExponent,
			asset.HasMarket,
			asset.MarketId,
			asset.AtomicResolution,
			asset.AssetYieldIndex,
			asset.MaxSlippagePpm,
		)
		if err != nil {
			return err
		}
	}
	return nil
}
