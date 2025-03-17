package keeper_test

import (
	"math/big"
	"testing"

	errorsmod "cosmossdk.io/errors"
	sdkmath "cosmossdk.io/math"
	sdaiservertypes "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/sdaioracle"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	bank_testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/bank"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	subaccountskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	yieldskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/keeper"
	yieldstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"
)

func TestDepositYieldsToSubaccount(t *testing.T) {
	// default subaccount id, the first subaccount id generated when calling createNSubaccount
	defaultSubaccountId := types.SubaccountId{
		Owner:  "0",
		Number: 0,
	}

	tests := map[string]struct {
		// state
		perpetuals                 []perptypes.Perpetual
		fundsInTDaiPool            *big.Int
		collateralPoolTDaiBalances map[string]*big.Int

		// subaccount state (include perp positions for isolated markets)
		perpetualPositions []*types.PerpetualPosition

		// test data
		subaccountId     types.SubaccountId
		amountToTransfer *big.Int

		// expectations
		expectedCollateralPoolTDaiBalances map[string]*big.Int
		expectedTDaiYieldsPoolBalance      *big.Int
		expectedErr                        error
	}{
		"Success: deposits basic yields to account": {
			fundsInTDaiPool: big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},

			subaccountId:     defaultSubaccountId,
			amountToTransfer: big.NewInt(10_000_000_000),

			expectedTDaiYieldsPoolBalance: big.NewInt(90_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(110_000_000_000),
			},
		},
		"Success: deposits all yields present tDai pool": {
			fundsInTDaiPool: big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(1),
			},

			subaccountId:     defaultSubaccountId,
			amountToTransfer: big.NewInt(100_000_000_000),

			expectedTDaiYieldsPoolBalance: big.NewInt(0),
			expectedCollateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_001),
			},
		},
		"Success: deposits tDai yields into isolated collateral pool": {
			fundsInTDaiPool: big.NewInt(2),
			collateralPoolTDaiBalances: map[string]*big.Int{
				types.CollateralPoolTwoAddress.String(): big.NewInt(100_000_000_000),
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.IsoUsd_IsolatedMarket.Params,
					FundingIndex: constants.IsoUsd_IsolatedMarket.FundingIndex,
					OpenInterest: constants.IsoUsd_IsolatedMarket.OpenInterest,
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},

			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(3),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},

			subaccountId:     defaultSubaccountId,
			amountToTransfer: big.NewInt(1),

			expectedTDaiYieldsPoolBalance: big.NewInt(1),
			expectedCollateralPoolTDaiBalances: map[string]*big.Int{
				types.CollateralPoolTwoAddress.String(): big.NewInt(100_000_000_001),
				types.ModuleAddress.String():            big.NewInt(0),
			},
		},
		"Success: deposits tDai amount greater than max uint64": {
			fundsInTDaiPool: yieldskeeper.ConvertStringToBigIntWithPanicOnErr("100000000000000000000000000"),
			collateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(1),
			},

			subaccountId:     defaultSubaccountId,
			amountToTransfer: yieldskeeper.ConvertStringToBigIntWithPanicOnErr("100000000000000000000000000"),

			expectedTDaiYieldsPoolBalance: big.NewInt(0),
			expectedCollateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): yieldskeeper.ConvertStringToBigIntWithPanicOnErr("100000000000000000000000001"),
			},
		},
		"Success: depositing nil transfer amount results in no change": {
			fundsInTDaiPool: big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},

			subaccountId:     defaultSubaccountId,
			amountToTransfer: nil,

			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},
		},
		"Success: depositing zero transfer amount results in no change": {
			fundsInTDaiPool: big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},

			subaccountId:     defaultSubaccountId,
			amountToTransfer: big.NewInt(0),

			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},
		},
		"Success: deposits when subaccount is not previously set": {
			fundsInTDaiPool: big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},

			subaccountId: types.SubaccountId{
				Owner:  "1",
				Number: 1,
			},
			amountToTransfer: big.NewInt(10_000_000_000),

			expectedTDaiYieldsPoolBalance: big.NewInt(90_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(110_000_000_000),
			},
		},
		"Failure: not enough yields in pool to deposit": {
			fundsInTDaiPool: big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},

			subaccountId:     defaultSubaccountId,
			amountToTransfer: big.NewInt(110_000_000_000),

			expectedErr: errorsmod.Wrapf(
				sdkerrors.ErrInsufficientFunds,
				"spendable balance 100000000000utdai is smaller than 110000000000utdai",
			),

			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},
		},
		"Failure: attempts to deposit negative yields": {
			fundsInTDaiPool: big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},

			subaccountId:     defaultSubaccountId,
			amountToTransfer: big.NewInt(-100),

			expectedErr: types.ErrTryingToDepositNegativeYields,

			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},
		},
		"Failure: collateral pool not found": {
			fundsInTDaiPool: big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},

			subaccountId:     defaultSubaccountId,
			amountToTransfer: big.NewInt(100),

			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(3),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},

			expectedErr: errorsmod.Wrap(perptypes.ErrPerpetualDoesNotExist, lib.UintToString(uint64(3))),

			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]*big.Int{
				types.ModuleAddress.String(): big.NewInt(100_000_000_000),
			},
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx, keeper, pricesKeeper, perpetualsKeeper, accountKeeper, bankKeeper, assetsKeeper, yieldsKeeper, _, _ := testutil.SubaccountsKeepers(
				t,
				true,
			)
			ctx = ctx.WithTxBytes(constants.TestTxBytes)
			testutil.CreateTestMarkets(t, ctx, pricesKeeper)

			require.NoError(t, testutil.CreateTDaiAsset(ctx, assetsKeeper))
			require.NoError(t, testutil.CreateBTCAsset(ctx, assetsKeeper))

			testutil.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			testutil.CreateTestCollateralPools(t, ctx, perpetualsKeeper)

			rateString := sdaiservertypes.TestSDAIEventRequest.ConversionRate
			rate, conversionErr := yieldskeeper.ConvertStringToBigInt(rateString)
			require.NoError(t, conversionErr)
			yieldsKeeper.SetSDAIPrice(ctx, rate)
			yieldsKeeper.SetAssetYieldsIndex(ctx, big.NewRat(1, 1))

			for _, p := range tc.perpetuals {
				perpetualsKeeper.SetPerpetualForTest(
					ctx,
					p,
				)
			}

			for collateralPoolAddr, TDaiBal := range tc.collateralPoolTDaiBalances {
				err := bank_testutil.FundAccount(
					ctx,
					sdk.MustAccAddressFromBech32(collateralPoolAddr),
					sdk.Coins{
						sdk.NewCoin(assettypes.AssetTDai.Denom, sdkmath.NewIntFromBigInt(TDaiBal)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			if tc.fundsInTDaiPool != nil {
				err := bank_testutil.FundModuleAccount(
					ctx,
					yieldstypes.TDaiPoolAccount,
					sdk.Coins{
						sdk.NewCoin(assettypes.AssetTDai.Denom, sdkmath.NewIntFromBigInt(tc.fundsInTDaiPool)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			subaccount := createNSubaccount(keeper, ctx, 1, big.NewInt(1_000))[0]
			subaccount.PerpetualPositions = tc.perpetualPositions
			keeper.SetSubaccount(ctx, subaccount)

			err := keeper.DepositYieldsToSubaccount(ctx, tc.subaccountId, tc.amountToTransfer)
			if tc.expectedErr != nil {
				require.ErrorIs(t, err, tc.expectedErr)
			} else {
				require.NoError(t, err)
			}

			for collateralPoolAddr, expectedTDaiBal := range tc.expectedCollateralPoolTDaiBalances {
				TDaiBal := bankKeeper.GetBalance(
					ctx,
					sdk.MustAccAddressFromBech32(collateralPoolAddr),
					assettypes.AssetTDai.Denom,
				)
				require.Equal(t,
					sdk.NewCoin(assettypes.AssetTDai.Denom, sdkmath.NewIntFromBigInt(expectedTDaiBal)),
					TDaiBal,
				)
			}

			if tc.expectedTDaiYieldsPoolBalance != nil {
				TDaiBal := bankKeeper.GetBalance(
					ctx,
					accountKeeper.GetModuleAddress(yieldstypes.TDaiPoolAccount),
					assettypes.AssetTDai.Denom,
				)
				require.Equal(t,
					sdk.NewCoin(assettypes.AssetTDai.Denom, sdkmath.NewIntFromBigInt(tc.expectedTDaiYieldsPoolBalance)),
					TDaiBal,
				)
			}
		})
	}
}

func TestAddYieldsToSubaccount(t *testing.T) {
	tests := map[string]struct {
		// state
		perpetuals []perptypes.Perpetual
		assets     []*assettypes.Asset
		// Only set when specified. Defaults to 0/1.
		globalAssetYieldsIndex *big.Rat
		availableYields        *big.Int

		// subaccount state
		perpetualPositions         []*types.PerpetualPosition
		assetPositions             []*types.AssetPosition
		subaccountAssetYieldsIndex string

		// additional test state
		PerpIdToPerp map[uint32]perptypes.Perpetual

		// expectations
		expectedTotalYields        *big.Int
		expectedPerpetualPositions []*types.PerpetualPosition
		expectedAssetPositions     []*types.AssetPosition
		expectedErr                error

		// Only contains the updated perpetual positions, to assert against the events included.
		expectedAssetYieldsIndex string
	}{
		"Successfully adds yields when only tDai asset claims yields and no perpetual position exists": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(2, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			expectedErr:                nil,
			expectedTotalYields:        big.NewInt(100_000_000_000),
			expectedAssetYieldsIndex:   big.NewRat(2, 1).String(),
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(200_000_000_000),
				},
			},
		},
		"Successfully adds yields when only tDai asset claims yields, but perpetual position exists": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(2, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: constants.BtcUsd_NoMarginRequirement,
			},

			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(100_000_000_000),
			expectedAssetYieldsIndex: big.NewRat(2, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(200_000_000_000),
				},
			},
		},
		"Successfully adds yields when only perp position claims yields and no asset position exists": {
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},

			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(100_000_000),
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000),
				},
			},
		},
		"Successfully adds yields when only perp position claims yields, but asset position exists": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},

			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(100_000_000),
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_100_000_000),
				},
			},
		},
		"Successfully adds yields when asset position and perp position claim yields": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(2, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},

			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(100_100_000_000),
			expectedAssetYieldsIndex: big.NewRat(2, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(200_100_000_000),
				},
			},
		},
		"Successfully claims yields when multiple perp position claim yields and no asset position exists": {
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(12, 11),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					Params:       constants.EthUsd_NoMarginRequirement.Params,
					FundingIndex: constants.EthUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.EthUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 9).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				1: {
					Params:       constants.EthUsd_NoMarginRequirement.Params,
					FundingIndex: constants.EthUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.EthUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},

			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(94444443),
			expectedAssetYieldsIndex: big.NewRat(12, 11).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(94444443),
				},
			},
		},
		"Successfully claims yields when multiple perp position claim yields and asset position exists but doesn't claim yields": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(12, 11).String(),
			globalAssetYieldsIndex:     big.NewRat(12, 11),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					Params:       constants.EthUsd_NoMarginRequirement.Params,
					FundingIndex: constants.EthUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.EthUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 9).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				1: {
					Params:       constants.EthUsd_NoMarginRequirement.Params,
					FundingIndex: constants.EthUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.EthUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},

			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(94444443),
			expectedAssetYieldsIndex: big.NewRat(12, 11).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_094_444_443),
				},
			},
		},
		"Successfully claims yields when multiple perp position claim yields and asset position exists and claims yields": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(12, 11).String(),
			globalAssetYieldsIndex:     big.NewRat(12, 10),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					Params:       constants.EthUsd_NoMarginRequirement.Params,
					FundingIndex: constants.EthUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.EthUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 9).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				1: {
					Params:       constants.EthUsd_NoMarginRequirement.Params,
					FundingIndex: constants.EthUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.EthUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},

			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(10_094_444_443),
			expectedAssetYieldsIndex: big.NewRat(12, 11).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(110_094_444_443),
				},
			},
		},
		"Successfully claims yields when tDai position and perp positions claim yields and one perp position is non-standard": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(12, 11).String(),
			globalAssetYieldsIndex:     big.NewRat(12, 10),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					Params:       constants.EthUsd_NoMarginRequirement.Params,
					FundingIndex: constants.EthUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.EthUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
				{
					Params:       constants.IsoUsd_IsolatedMarket.Params,
					FundingIndex: constants.IsoUsd_IsolatedMarket.FundingIndex,
					OpenInterest: constants.IsoUsd_IsolatedMarket.OpenInterest,
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 9).String(),
				},
				{
					PerpetualId:  uint32(constants.PerpetualPosition_OneISOLong.PerpetualId),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				1: {
					Params:       constants.EthUsd_NoMarginRequirement.Params,
					FundingIndex: constants.EthUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.EthUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
				constants.PerpetualPosition_OneISOLong.PerpetualId: {
					Params:       constants.IsoUsd_IsolatedMarket.Params,
					FundingIndex: constants.IsoUsd_IsolatedMarket.FundingIndex,
					OpenInterest: constants.IsoUsd_IsolatedMarket.OpenInterest,
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},

			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(10_014_444_443),
			expectedAssetYieldsIndex: big.NewRat(12, 11).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
				{
					PerpetualId:  uint32(constants.PerpetualPosition_OneISOLong.PerpetualId),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(110_014_444_443),
				},
			},
		},
		"Successfully claims yields with positive position and negative perp position": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(12, 11).String(),
			globalAssetYieldsIndex:     big.NewRat(12, 10),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.IsoUsd_IsolatedMarket.Params,
					FundingIndex: constants.IsoUsd_IsolatedMarket.FundingIndex,
					OpenInterest: constants.IsoUsd_IsolatedMarket.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(constants.PerpetualPosition_OneISOLong.PerpetualId),
					Quantums:     dtypes.NewInt(-1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				constants.PerpetualPosition_OneISOLong.PerpetualId: {
					Params:       constants.IsoUsd_IsolatedMarket.Params,
					FundingIndex: constants.IsoUsd_IsolatedMarket.FundingIndex,
					OpenInterest: constants.IsoUsd_IsolatedMarket.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},

			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(9_000_000_000),
			expectedAssetYieldsIndex: big.NewRat(12, 11).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(constants.PerpetualPosition_OneISOLong.PerpetualId),
					Quantums:     dtypes.NewInt(-1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(109_000_000_000),
				},
			},
		},
		"Successfully adds 0 yields when yields negative: only tDai position open": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(-100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			expectedErr:                nil,
			expectedTotalYields:        big.NewInt(0),
			expectedAssetYieldsIndex:   big.NewRat(1, 1).String(),
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(-100_000_000_000),
				},
			},
		},
		"Successfully adds 0 yields when negative yields: asset position and perp position claim yields and negative position with more yields": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(2, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(2, 1).String(),
				},
			},
			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(0),
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(2, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
		},
		"Successfully adds 0 yields: asset position and perp position cancel each other out": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},

			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(0),
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
		},
		"Successfully adds 0 yields: general yields index is 0": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},

			expectedErr:              nil,
			expectedTotalYields:      big.NewInt(0),
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
		},
		"Successfully handled insufficient yields available when only tDai asset claims yields and no perpetual position exists": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(2, 1),
			availableYields:            big.NewInt(1_000_000),
			expectedErr:                nil,
			expectedTotalYields:        big.NewInt(1_000_000),
			expectedAssetYieldsIndex:   big.NewRat(2, 1).String(),
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_001_000_000),
				},
			},
		},
		"Successfully handles other asset than tDai": {
			assetPositions: []*types.AssetPosition{
				{
					AssetId:  1,
					Quantums: dtypes.NewInt(100_000_000_000),
					Index:    0,
				},
			},
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(2, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			expectedErr:                nil,
			expectedTotalYields:        big.NewInt(0),
			expectedAssetYieldsIndex:   big.NewRat(2, 1).String(),
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  1,
					Quantums: dtypes.NewInt(100_000_000_000),
					Index:    0,
				},
			},
		},
		"Failure: global asset yields index is negative": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(-1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			expectedErr:                types.ErrGlobalYieldsIndexNegative,
		},
		"Failure: global asset yields less than asset yields index": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(2, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			expectedErr:                types.ErrGeneralYieldsIndexSmallerThanYieldsIndexInSubaccount,
		},
		"Failure: Tries to add yields when perp general yields index is nil": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  "",
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  "",
				},
			},

			expectedErr: types.ErrPerpYieldsIndexUninitialized,
		},
		"Failure: Tries to add yields when perp general yields index is negative": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(-1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(-1, 1).String(),
				},
			},

			expectedErr: types.ErrGlobalYieldsIndexNegative,
		},
		"Failure: Tries to add yields when perp general yields index is less than perp position yields index": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(2, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				0: {
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},

			expectedErr: types.ErrGeneralYieldsIndexSmallerThanYieldsIndexInSubaccount,
		},
		"Failure: Tries to add yields when subaccount has perp position that is not in perpIdToPerp map": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			availableYields:            big.NewInt(1_000_000_000_000_000_000),
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			PerpIdToPerp: map[uint32]perptypes.Perpetual{
				1: constants.BtcUsd_NoMarginRequirement,
			},

			expectedErr: errorsmod.Wrap(
				perptypes.ErrPerpetualDoesNotExist, "0",
			),
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx, keeper, pricesKeeper, perpetualsKeeper, _, _, assetsKeeper, yieldsKeeper, _, _ := testutil.SubaccountsKeepers(
				t,
				true,
			)
			ctx = ctx.WithTxBytes(constants.TestTxBytes)
			testutil.CreateTestMarkets(t, ctx, pricesKeeper)

			// Always creates TDai asset first
			require.NoError(t, testutil.CreateTDaiAsset(ctx, assetsKeeper))
			require.NoError(t, testutil.CreateBTCAsset(ctx, assetsKeeper))

			testutil.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			testutil.CreateTestCollateralPools(t, ctx, perpetualsKeeper)

			// Set up initial sdai price
			rateString := sdaiservertypes.TestSDAIEventRequest.ConversionRate
			rate, conversionErr := yieldskeeper.ConvertStringToBigInt(rateString)
			require.NoError(t, conversionErr)

			yieldsKeeper.SetSDAIPrice(ctx, rate)
			globalAssetYieldsIndex := big.NewRat(1, 1)
			if tc.globalAssetYieldsIndex != nil {
				globalAssetYieldsIndex = tc.globalAssetYieldsIndex
			}
			yieldsKeeper.SetAssetYieldsIndex(ctx, globalAssetYieldsIndex)

			availableYields := big.NewInt(0)
			if tc.availableYields != nil {
				availableYields = tc.availableYields
			}

			for _, a := range tc.assets {
				_, err := assetsKeeper.CreateAsset(
					ctx,
					a.Id,
					a.Symbol,
					a.Denom,
					a.DenomExponent,
					a.HasMarket,
					a.MarketId,
					a.AtomicResolution,
					a.AssetYieldsIndex,
					a.MaxSlippagePpm,
				)
				require.NoError(t, err)
			}

			for _, p := range tc.perpetuals {
				perpetualsKeeper.SetPerpetualForTest(
					ctx,
					p,
				)
			}

			subaccount := createNSubaccount(keeper, ctx, 1, big.NewInt(1_000))[0]
			subaccount.PerpetualPositions = tc.perpetualPositions
			subaccount.AssetPositions = tc.assetPositions
			subaccount.AssetYieldsIndex = tc.subaccountAssetYieldsIndex
			keeper.SetSubaccount(ctx, subaccount)

			newSubaccount, totalNewYields, err := subaccountskeeper.AddYieldsToSubaccount(subaccount, tc.PerpIdToPerp, globalAssetYieldsIndex, availableYields)
			if tc.expectedErr != nil {
				require.ErrorIs(t, err, tc.expectedErr)
				require.Nil(t, totalNewYields)
				require.Empty(t, newSubaccount)
			} else {
				require.NoError(t, err)
				require.Equal(t, 0, tc.expectedTotalYields.Cmp(totalNewYields),
					"Expected Yields: %v. Got: %v", tc.expectedTotalYields, totalNewYields)
				require.Equal(t, len(newSubaccount.PerpetualPositions), len(tc.expectedPerpetualPositions))
				for i, ep := range tc.expectedPerpetualPositions {
					require.Equal(t, *ep, *newSubaccount.PerpetualPositions[i])
				}
				require.Equal(t, len(newSubaccount.AssetPositions), len(tc.expectedAssetPositions))
				for i, ep := range tc.expectedAssetPositions {
					require.Equal(t, *ep, *newSubaccount.AssetPositions[i])
				}
				require.Equal(t, 0, globalAssetYieldsIndex.Cmp(yieldskeeper.ConvertStringToBigRatWithPanicOnErr(newSubaccount.AssetYieldsIndex)),
					"Expected AssetYieldsIndex %v. Got %v.", globalAssetYieldsIndex, newSubaccount.AssetYieldsIndex,
				)
			}
		})
	}
}

func TestClaimYieldsForSubaccountFromIdAndSetNewState(t *testing.T) {
	// default subaccount id, the first subaccount id generated when calling createNSubaccount
	defaultSubaccountId := types.SubaccountId{
		Owner:  "0",
		Number: 0,
	}

	tests := map[string]struct {
		// state
		perpetuals []perptypes.Perpetual
		assets     []*assettypes.Asset
		// Only set when specified. Defaults to 0/1.
		globalAssetYieldsIndex *big.Rat
		fundsInTDaiPool        *big.Int

		// subaccount state
		perpetualPositions         []*types.PerpetualPosition
		assetPositions             []*types.AssetPosition
		subaccountAssetYieldsIndex string

		// collateral pool state
		collateralPoolTDaiBalances map[string]int64

		// extra test state
		subaccountId *types.SubaccountId

		// expectations
		expectedCollateralPoolTDaiBalances map[string]int64
		expectedPerpetualPositions         []*types.PerpetualPosition
		expectedAssetPositions             []*types.AssetPosition
		expectedTDaiYieldsPoolBalance      *big.Int
		expectedErr                        error
		expectedAssetYieldsIndex           string
	}{
		"Successfully claims no yields for tDai asset position and no other position exists when global asset yields index is 1": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Successfully claims yields for tDai asset position and no other position exists when subaccount's asset yields index 0": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(2, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(200_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 200_000_000_000,
			},
		},
		"Successfully claims yields for tDai asset position and no other position exists when subaccount's asset yields index 1": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(2, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(200_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 200_000_000_000,
			},
		},
		"Successfully claims yields for tDai asset position when perp with no yields exists": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(2, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(2, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(200_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 200_000_000_000,
			},
		},
		"Successfully claims yields for one perp with no asset positions existing before yields claim": {
			globalAssetYieldsIndex: big.NewRat(1, 1),
			fundsInTDaiPool:        big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(1_000_000_000),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(199_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 101_000_000_000,
			},
		},
		"Successfully claims yields for one perp with asset position existing but not claiming yields": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				constants.CollateralPoolAddress0.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(101_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(199_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				constants.CollateralPoolAddress0.String(): 101_000_000_000,
			},
		},
		"Successfully claims yields for tDai asset and one perp": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(2, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(2, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(200_100_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(99_900_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 200_100_000_000,
			},
		},
		"Successfully claims yields when multiple perp positions are open and tDai position open": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(50_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(13, 11).String(),
			globalAssetYieldsIndex:     big.NewRat(26, 11),
			fundsInTDaiPool:            big.NewInt(222_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 50_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					Params:       constants.EthUsd_NoMarginRequirement.Params,
					FundingIndex: constants.EthUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.EthUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 9).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(26, 11).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_094_444_443),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(171_905_555_557),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_094_444_443,
			},
		},
		"Successfully claims all yields in tDaiPool": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(3, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(3, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(300_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(0),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 300_000_000_000,
			},
		},
		"Successfully claims yields for isolated market": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(5, 4),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolTwoAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.IsoUsd_IsolatedMarket.Params,
					FundingIndex: constants.IsoUsd_IsolatedMarket.FundingIndex,
					OpenInterest: constants.IsoUsd_IsolatedMarket.OpenInterest,
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(3),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(5, 4).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(3),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(124_920_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(175_080_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolTwoAddress.String(): 124_920_000_000,
				types.ModuleAddress.String():            0,
			},
		},
		"Successfully does not claim yields when asset yields index is already updated": {
			globalAssetYieldsIndex: big.NewRat(5, 4),
			fundsInTDaiPool:        big.NewInt(1_200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 1_000_000_000_000,
			},
			subaccountAssetYieldsIndex: big.NewRat(5, 4).String(),
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(5, 4).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000), // Yields Collected: 0 tDAI
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(1_200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 1_000_000_000_000,
			},
		},
		"Successfully does not claim yields when negative positions cancel out positive position yields claims": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1000, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1000, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Fails yields claim: Negative general perp yields index": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(-1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedErr:              types.ErrGlobalYieldsIndexNegative,
			expectedAssetYieldsIndex: big.NewRat(-1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Fails yields claim: Perp yields index in subaccount higher than in general": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedErr:              types.ErrGeneralYieldsIndexSmallerThanYieldsIndexInSubaccount,
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Fails yields claim: Negative general asset yields index": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(-1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedErr:              types.ErrGlobalYieldsIndexNegative,
			expectedAssetYieldsIndex: big.NewRat(-1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Fails yields claim: Asset yields index in account higher than in general ": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 2),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedErr:              types.ErrGeneralYieldsIndexSmallerThanYieldsIndexInSubaccount,
			expectedAssetYieldsIndex: big.NewRat(1, 2).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Success yields claim: Perp yields index in subaccount badly initialized so defaults to 0": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  "",
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedErr:              nil,
			expectedAssetYieldsIndex: big.NewRat(1, 2).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  "1/2",
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Successful yields claim: not enough yields in tdai pool so we take what's available": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(1),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_001),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(0),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_001,
			},
		},
		"Fails yields claim: no open positions": {
			globalAssetYieldsIndex: big.NewRat(1, 1),
			fundsInTDaiPool:        big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			subaccountId:                  &defaultSubaccountId,
			expectedErr:                   types.ErrNoYieldsToClaim,
			expectedAssetYieldsIndex:      big.NewRat(1, 1).String(),
			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Fails yields claim: subaccountId is nil": {
			globalAssetYieldsIndex: big.NewRat(1, 1),
			fundsInTDaiPool:        big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			subaccountId:                  nil,
			expectedErr:                   types.ErrSubaccountIdIsNil,
			expectedAssetYieldsIndex:      big.NewRat(1, 1).String(),
			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Successfully claims 0 yields when subaccount's yields is negative": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(10_000, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			subaccountId:             &defaultSubaccountId,
			expectedAssetYieldsIndex: big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(10_000, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx, keeper, pricesKeeper, perpetualsKeeper, accountKeeper, bankKeeper, assetsKeeper, yieldsKeeper, _, _ := testutil.SubaccountsKeepers(
				t,
				true,
			)
			ctx = ctx.WithTxBytes(constants.TestTxBytes)
			testutil.CreateTestMarkets(t, ctx, pricesKeeper)

			// Always creates TDai asset first
			require.NoError(t, testutil.CreateTDaiAsset(ctx, assetsKeeper))
			require.NoError(t, testutil.CreateBTCAsset(ctx, assetsKeeper))

			testutil.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			testutil.CreateTestCollateralPools(t, ctx, perpetualsKeeper)

			// Set up initial sdai price
			rateString := sdaiservertypes.TestSDAIEventRequest.ConversionRate
			rate, conversionErr := yieldskeeper.ConvertStringToBigInt(rateString)
			require.NoError(t, conversionErr)

			yieldsKeeper.SetSDAIPrice(ctx, rate)
			globalAssetYieldsIndex := big.NewRat(1, 1)
			if tc.globalAssetYieldsIndex != nil {
				globalAssetYieldsIndex = tc.globalAssetYieldsIndex
			}
			yieldsKeeper.SetAssetYieldsIndex(ctx, globalAssetYieldsIndex)

			for _, a := range tc.assets {
				_, err := assetsKeeper.CreateAsset(
					ctx,
					a.Id,
					a.Symbol,
					a.Denom,
					a.DenomExponent,
					a.HasMarket,
					a.MarketId,
					a.AtomicResolution,
					a.AssetYieldsIndex,
					a.MaxSlippagePpm,
				)
				require.NoError(t, err)
			}

			for _, p := range tc.perpetuals {
				perpetualsKeeper.SetPerpetualForTest(
					ctx,
					p,
				)
			}

			for collateralPoolAddr, TDaiBal := range tc.collateralPoolTDaiBalances {
				err := bank_testutil.FundAccount(
					ctx,
					sdk.MustAccAddressFromBech32(collateralPoolAddr),
					sdk.Coins{
						sdk.NewCoin(assettypes.AssetTDai.Denom, sdkmath.NewInt(TDaiBal)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			if tc.fundsInTDaiPool != nil {
				err := bank_testutil.FundModuleAccount(
					ctx,
					yieldstypes.TDaiPoolAccount,
					sdk.Coins{
						sdk.NewCoin(assettypes.AssetTDai.Denom, sdkmath.NewIntFromBigInt(tc.fundsInTDaiPool)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			subaccount := createNSubaccount(keeper, ctx, 1, big.NewInt(1_000))[0]
			subaccount.PerpetualPositions = tc.perpetualPositions
			subaccount.AssetPositions = tc.assetPositions
			subaccountYieldsIndex := constants.AssetYieldsIndex_Zero
			if tc.subaccountAssetYieldsIndex != "" {
				subaccountYieldsIndex = tc.subaccountAssetYieldsIndex
			}
			subaccount.AssetYieldsIndex = subaccountYieldsIndex
			keeper.SetSubaccount(ctx, subaccount)
			subaccountId := *subaccount.Id

			err := keeper.ClaimYieldsForSubaccountFromIdAndSetNewState(ctx, tc.subaccountId)

			if tc.expectedErr != nil {
				require.ErrorIs(t, err, tc.expectedErr)
			} else {
				require.NoError(t, err)
			}
			newSubaccount := keeper.GetSubaccount(ctx, subaccountId)
			require.Equal(t, len(newSubaccount.PerpetualPositions), len(tc.expectedPerpetualPositions))
			for i, ep := range tc.expectedPerpetualPositions {
				require.Equal(t, *ep, *newSubaccount.PerpetualPositions[i])
			}
			require.Equal(t, len(tc.expectedAssetPositions), len(newSubaccount.AssetPositions))
			for i, ep := range tc.expectedAssetPositions {
				require.Equal(t, *ep, *newSubaccount.AssetPositions[i])
			}
			if tc.expectedErr == nil {
				require.Equal(t, 0, globalAssetYieldsIndex.Cmp(yieldskeeper.ConvertStringToBigRatWithPanicOnErr(newSubaccount.AssetYieldsIndex)),
					"Expected AssetYieldsIndex %v. Got %v.", globalAssetYieldsIndex, newSubaccount.AssetYieldsIndex,
				)
			}

			for collateralPoolAddr, expectedTDaiBal := range tc.expectedCollateralPoolTDaiBalances {
				TDaiBal := bankKeeper.GetBalance(
					ctx,
					sdk.MustAccAddressFromBech32(collateralPoolAddr),
					assettypes.AssetTDai.Denom,
				)
				require.Equal(t,
					sdk.NewCoin(assettypes.AssetTDai.Denom, sdkmath.NewInt(expectedTDaiBal)),
					TDaiBal,
				)
			}

			if tc.expectedTDaiYieldsPoolBalance != nil {
				TDaiBal := bankKeeper.GetBalance(
					ctx,
					accountKeeper.GetModuleAddress(yieldstypes.TDaiPoolAccount),
					assettypes.AssetTDai.Denom,
				)
				require.Equal(t,
					sdk.NewCoin(assettypes.AssetTDai.Denom, sdkmath.NewIntFromBigInt(tc.expectedTDaiYieldsPoolBalance)),
					TDaiBal,
				)
			}
		})
	}
}
