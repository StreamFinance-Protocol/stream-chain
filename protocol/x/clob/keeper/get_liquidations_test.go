package keeper_test

import (
	"math/big"
	"testing"

	sdkmath "cosmossdk.io/math"
	sdaiservertypes "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/sdaioracle"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	vetesting "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/ve"
	sdk "github.com/cosmos/cosmos-sdk/types"

	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"

	"errors"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	perptest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/perpetuals"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve"
	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	heap "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/heap"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/memclob"
	clobtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	feetiertypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/feetiers/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	prices "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	ratelimitkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/keeper"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	"github.com/cometbft/cometbft/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestChangePriceVE_CauseNegativeTNC(t *testing.T) {
	tests := map[string]struct {
		// State.
		subaccounts                   []satypes.Subaccount
		marketIdToOraclePriceOverride map[uint32]uint64

		// Configuration.
		liquidityTiers []perptypes.LiquidityTier
		perpetuals     []perptypes.Perpetual
		clobPairs      []clobtypes.ClobPair

		// action
		priceUpdate map[uint32]ve.VEPricePair

		// Expectations.
		expectedNegativeTncSubaccountSeenAtBlock uint32
	}{
		`No price change`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_50000USD,
			},
			marketIdToOraclePriceOverride: map[uint32]uint64{
				constants.BtcUsd.MarketId: 4_000_000_000, // $40,000 / BTC
			},

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs:                                []clobtypes.ClobPair{constants.ClobPair_Btc},
			expectedNegativeTncSubaccountSeenAtBlock: 0,

			priceUpdate: map[uint32]ve.VEPricePair{},
		},
		`Price change causes Negative TNC`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_50000USD,
			},

			marketIdToOraclePriceOverride: map[uint32]uint64{
				constants.BtcUsd.MarketId: 4_000_000_000, // $40,000 / BTC
			},

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedNegativeTncSubaccountSeenAtBlock: 4,

			priceUpdate: map[uint32]ve.VEPricePair{
				0: {
					SpotPrice: 6_000_000_000,
					PnlPrice:  6_000_000_000,
				},
			},
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			tApp := testapp.NewTestAppBuilder(t).WithGenesisDocFn(func() (genesis types.GenesisDoc) {
				genesis = testapp.DefaultGenesis()
				testapp.UpdateGenesisDocWithAppStateForModule(
					&genesis,
					func(genesisState *prices.GenesisState) {
						// Set oracle prices in the genesis.
						pricesGenesis := constants.TestPricesGenesisState

						// Make a copy of the MarketPrices slice to avoid modifying by reference.
						marketPricesCopy := make([]prices.MarketPrice, len(pricesGenesis.MarketPrices))
						copy(marketPricesCopy, pricesGenesis.MarketPrices)

						for marketId, oraclePrice := range tc.marketIdToOraclePriceOverride {
							exponent, exists := constants.TestMarketIdsToExponents[marketId]
							require.True(t, exists)

							marketPricesCopy[marketId] = prices.MarketPrice{
								Id:        marketId,
								SpotPrice: oraclePrice,
								PnlPrice:  oraclePrice,
								Exponent:  exponent,
							}
						}

						pricesGenesis.MarketPrices = marketPricesCopy
						*genesisState = pricesGenesis
					},
				)
				testapp.UpdateGenesisDocWithAppStateForModule(
					&genesis,
					func(genesisState *perptypes.GenesisState) {
						genesisState.Params = constants.PerpetualsGenesisParams
						genesisState.LiquidityTiers = tc.liquidityTiers
						genesisState.Perpetuals = tc.perpetuals
						genesisState.CollateralPools = constants.CollateralPools
					},
				)
				testapp.UpdateGenesisDocWithAppStateForModule(
					&genesis,
					func(genesisState *satypes.GenesisState) {
						genesisState.Subaccounts = tc.subaccounts
					},
				)
				testapp.UpdateGenesisDocWithAppStateForModule(
					&genesis,
					func(genesisState *clobtypes.GenesisState) {
						genesisState.ClobPairs = tc.clobPairs
						genesisState.EquityTierLimitConfig = clobtypes.EquityTierLimitConfiguration{}
					},
				)
				testapp.UpdateGenesisDocWithAppStateForModule(
					&genesis,
					func(genesisState *feetiertypes.GenesisState) {
						genesisState.Params = constants.PerpetualFeeParamsNoFee
					},
				)
				return genesis
			}).Build()

			rateString := sdaiservertypes.TestSDAIEventRequest.ConversionRate
			rate, conversionErr := ratelimitkeeper.ConvertStringToBigInt(rateString)

			require.NoError(t, conversionErr)

			tApp.App.RatelimitKeeper.SetSDAIPrice(tApp.App.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.App.RatelimitKeeper.SetAssetYieldIndex(tApp.App.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.CrashingApp.RatelimitKeeper.SetSDAIPrice(tApp.CrashingApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.CrashingApp.RatelimitKeeper.SetAssetYieldIndex(tApp.CrashingApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.NoCheckTxApp.RatelimitKeeper.SetSDAIPrice(tApp.NoCheckTxApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.NoCheckTxApp.RatelimitKeeper.SetAssetYieldIndex(tApp.NoCheckTxApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			tApp.ParallelApp.RatelimitKeeper.SetSDAIPrice(tApp.ParallelApp.NewUncachedContext(false, tmproto.Header{}), rate)
			tApp.ParallelApp.RatelimitKeeper.SetAssetYieldIndex(tApp.ParallelApp.NewUncachedContext(false, tmproto.Header{}), big.NewRat(1, 1))

			ctx := tApp.AdvanceToBlock(2, testapp.AdvanceToBlockOptions{})

			// Add the price update.
			deliverTxsOverride := make([][]byte, 0)
			_, extCommitBz, err := vetesting.GetInjectedExtendedCommitInfoForTestApp(
				tApp.App.StakingKeeper,
				ctx,
				tc.priceUpdate,
				"",
				tApp.GetHeader().Height,
			)
			require.NoError(t, err)

			deliverTxsOverride = append([][]byte{extCommitBz}, deliverTxsOverride...)

			// Advance to the next block, updating the price.
			_ = tApp.AdvanceToBlock(3, testapp.AdvanceToBlockOptions{
				DeliverTxsOverride: deliverTxsOverride,
			})

			ctx = tApp.AdvanceToBlock(4, testapp.AdvanceToBlockOptions{})

			negativeTncSubaccountSeenAtBlock, _, err := tApp.App.SubaccountsKeeper.GetNegativeTncSubaccountSeenAtBlock(
				ctx,
				constants.BtcUsd_NoMarginRequirement.Params.Id,
			)
			require.NoError(t, err)
			require.Equal(t, tc.expectedNegativeTncSubaccountSeenAtBlock, negativeTncSubaccountSeenAtBlock)
		})
	}
}

func TestGetSubaccountCollateralizationInfo(t *testing.T) {
	largeNegativeLiquidationPriority, _ := new(big.Float).SetString("-2500000000000000000000000000000")
	largeNegativeLiquidationPriority2, _ := new(big.Float).SetString("-62500000000000000000000000000000000000")

	tests := map[string]struct {
		subaccount                  satypes.Subaccount
		perpetuals                  []perptypes.Perpetual
		feeParams                   feetiertypes.PerpetualFeeParams
		expectedIsLiquidatable      bool
		expectedHasNegativeTnc      bool
		expectedLiquidationPriority *big.Float
		expectedError               error
	}{
		`Success: Liquidation priority is 0 and subaccount is liquidatable`: {
			subaccount:                  constants.Carl_Num0_1BTC_Short_50000USD,
			perpetuals:                  []perptypes.Perpetual{constants.BtcUsd_SmallMarginRequirement_DangerIndex},
			feeParams:                   constants.PerpetualFeeParams,
			expectedIsLiquidatable:      true,
			expectedHasNegativeTnc:      false,
			expectedLiquidationPriority: big.NewFloat(0),
			expectedError:               nil,
		},
		`Success: Liquidation priority is positive and subaccount is liquidatable`: {
			subaccount:                  constants.Carl_Num1_99999TDAI_Long_1BTC_Short,
			perpetuals:                  []perptypes.Perpetual{constants.BtcUsd_100PercentMarginRequirement_Danger_Index},
			feeParams:                   constants.PerpetualFeeParams,
			expectedIsLiquidatable:      true,
			expectedHasNegativeTnc:      false,
			expectedLiquidationPriority: new(big.Float).Quo(big.NewFloat(49999000000), big.NewFloat(50000000000*50000000000)),
			expectedError:               nil,
		},
		`Success: Liquidation priority is positive and subaccount is non liquidatable`: {
			subaccount:                  constants.Carl_Num1_1BTC_Short,
			perpetuals:                  []perptypes.Perpetual{constants.BtcUsd_20PercentInitial_10PercentMaintenance_Danger_Index},
			feeParams:                   constants.PerpetualFeeParams,
			expectedIsLiquidatable:      false,
			expectedHasNegativeTnc:      false,
			expectedLiquidationPriority: new(big.Float).Quo(big.NewFloat(1), big.NewFloat(5000000000)),
			expectedError:               nil,
		},
		`Success: Negative TNC subaccount`: {
			subaccount: satypes.Subaccount{
				Id: &constants.Carl_Num1,
				AssetPositions: []*satypes.AssetPosition{
					{
						AssetId:  0,
						Quantums: dtypes.NewInt(49_000_000_000), // $49,000
					},
				},
				PerpetualPositions: []*satypes.PerpetualPosition{
					{
						PerpetualId: 0,
						Quantums:    dtypes.NewInt(-100_000_000), // -1 BTC
						YieldIndex:  big.NewRat(0, 1).String(),
					},
				},
				AssetYieldIndex: big.NewRat(1, 1).String(),
			},
			perpetuals:                  []perptypes.Perpetual{constants.BtcUsd_100PercentMarginRequirement_Danger_Index},
			feeParams:                   constants.PerpetualFeeParams,
			expectedIsLiquidatable:      true,
			expectedHasNegativeTnc:      true,
			expectedLiquidationPriority: largeNegativeLiquidationPriority,
			expectedError:               nil,
		},
		`Success: Handles multiple perp positions`: {
			subaccount: satypes.Subaccount{
				Id: &constants.Carl_Num1,
				AssetPositions: []*satypes.AssetPosition{
					{
						AssetId:  0,
						Quantums: dtypes.NewInt(54_000_000_000),
					},
				},
				PerpetualPositions: []*satypes.PerpetualPosition{
					{
						PerpetualId: 0,
						Quantums:    dtypes.NewInt(-100_000_000), // -1 BTC
						YieldIndex:  big.NewRat(0, 1).String(),
					},
					{
						PerpetualId: 1,
						Quantums:    dtypes.NewInt(-1_000_000_000), // -1 ETH
						YieldIndex:  big.NewRat(0, 1).String(),
					},
				},
				AssetYieldIndex: big.NewRat(1, 1).String(),
			},
			perpetuals:                  []perptypes.Perpetual{constants.BtcUsd_100PercentMarginRequirement_Danger_Index, constants.EthUsd_100PercentMarginRequirement_DangerIndex},
			feeParams:                   constants.PerpetualFeeParams,
			expectedIsLiquidatable:      true,
			expectedHasNegativeTnc:      false,
			expectedLiquidationPriority: new(big.Float).Quo(big.NewFloat(1_000_000_000), big.NewFloat(53000000000*53000000000)),
			expectedError:               nil,
		},
		`Success: Liquidation priority is 0 for non-TDAI backed subaccount`: {
			subaccount: satypes.Subaccount{
				Id: &constants.Carl_Num1,
				AssetPositions: []*satypes.AssetPosition{
					{
						AssetId:  1,
						Quantums: dtypes.NewInt(100_000_000),
					},
				},
				PerpetualPositions: []*satypes.PerpetualPosition{
					{
						PerpetualId: 10,
						Quantums:    dtypes.NewInt(-100_000_000),
						YieldIndex:  big.NewRat(0, 1).String(),
					},
				},
				AssetYieldIndex: big.NewRat(1, 1).String(),
			},
			perpetuals:                  []perptypes.Perpetual{constants.BtcBtc_10_20MarginRequirement_CollatPool1_Id10_DangerIndex1},
			feeParams:                   constants.PerpetualFeeParams,
			expectedIsLiquidatable:      true,
			expectedHasNegativeTnc:      false,
			expectedLiquidationPriority: big.NewFloat(0),
			expectedError:               nil,
		},
		`Success: Liquidation priority is positive for non-TDAI backed subaccount and subaccount is liquidatable`: {
			subaccount: satypes.Subaccount{
				Id: &constants.Carl_Num1,
				AssetPositions: []*satypes.AssetPosition{
					{
						AssetId:  1,
						Quantums: dtypes.NewInt(101_000_000),
					},
				},
				PerpetualPositions: []*satypes.PerpetualPosition{
					{
						PerpetualId: 8,
						Quantums:    dtypes.NewInt(-100_000_000),
						YieldIndex:  big.NewRat(0, 1).String(),
					},
				},
				AssetYieldIndex: big.NewRat(1, 1).String(),
			},
			perpetuals:                  []perptypes.Perpetual{constants.BtcBtc_100PercentMarginRequirement_CollatPool1_Id8_DangerIndex1},
			feeParams:                   constants.PerpetualFeeParams,
			expectedIsLiquidatable:      true,
			expectedHasNegativeTnc:      false,
			expectedLiquidationPriority: new(big.Float).Quo(big.NewFloat(50_000_000_000), big.NewFloat(5_000_000_000_000*5_000_000_000_000)),
			expectedError:               nil,
		},
		`Success: Liquidation priority is positive for non-TDAI backed subaccount and subaccount is not liquidatable`: {
			subaccount: satypes.Subaccount{
				Id: &constants.Carl_Num1,
				AssetPositions: []*satypes.AssetPosition{
					{
						AssetId:  1,
						Quantums: dtypes.NewInt(200_000_000),
					},
				},
				PerpetualPositions: []*satypes.PerpetualPosition{
					{
						PerpetualId: 8,
						Quantums:    dtypes.NewInt(-100_000_000),
						YieldIndex:  big.NewRat(0, 1).String(),
					},
				},
				AssetYieldIndex: big.NewRat(1, 1).String(),
			},
			perpetuals:                  []perptypes.Perpetual{constants.BtcBtc_100PercentMarginRequirement_CollatPool1_Id8_DangerIndex1},
			feeParams:                   constants.PerpetualFeeParams,
			expectedIsLiquidatable:      false,
			expectedHasNegativeTnc:      false,
			expectedLiquidationPriority: new(big.Float).Quo(big.NewFloat(5_000_000_000_000), big.NewFloat(5_000_000_000_000*5_000_000_000_000)),
			expectedError:               nil,
		},
		`Success: Liquidation priority is negative for non-TDAI backed subaccount`: {
			subaccount: satypes.Subaccount{
				Id: &constants.Carl_Num1,
				AssetPositions: []*satypes.AssetPosition{
					{
						AssetId:  1,
						Quantums: dtypes.NewInt(50_000_000),
					},
				},
				PerpetualPositions: []*satypes.PerpetualPosition{
					{
						PerpetualId: 8,
						Quantums:    dtypes.NewInt(-100_000_000),
						YieldIndex:  big.NewRat(0, 1).String(),
					},
				},
				AssetYieldIndex: big.NewRat(1, 1).String(),
			},
			perpetuals:                  []perptypes.Perpetual{constants.BtcBtc_100PercentMarginRequirement_CollatPool1_Id8_DangerIndex1},
			feeParams:                   constants.PerpetualFeeParams,
			expectedIsLiquidatable:      true,
			expectedHasNegativeTnc:      true,
			expectedLiquidationPriority: largeNegativeLiquidationPriority2,
			expectedError:               nil,
		},
		`Success: Handles multiple perp positions for non-TDAI backed subaccount`: {
			subaccount: satypes.Subaccount{
				Id: &constants.Carl_Num1,
				AssetPositions: []*satypes.AssetPosition{
					{
						AssetId:  1,
						Quantums: dtypes.NewInt(300_000_000),
					},
				},
				PerpetualPositions: []*satypes.PerpetualPosition{
					{
						PerpetualId: 8,
						Quantums:    dtypes.NewInt(-100_000_000),
						YieldIndex:  big.NewRat(0, 1).String(),
					},
					{
						PerpetualId: 10,
						Quantums:    dtypes.NewInt(-100_000_000),
						YieldIndex:  big.NewRat(0, 1).String(),
					},
				},
				AssetYieldIndex: big.NewRat(1, 1).String(),
			},
			perpetuals:                  []perptypes.Perpetual{constants.BtcBtc_100PercentMarginRequirement_CollatPool1_Id8_DangerIndex1, constants.BtcBtc_10_20MarginRequirement_CollatPool1_Id10_DangerIndex1},
			feeParams:                   constants.PerpetualFeeParams,
			expectedIsLiquidatable:      true,
			expectedHasNegativeTnc:      false,
			expectedLiquidationPriority: new(big.Float).Quo(big.NewFloat(5_000_000_000_000), big.NewFloat(5_500_000_000_000*10_000_000_000_000)),
			expectedError:               nil,
		},
		`Failure: No perp found returns error`: {
			subaccount: constants.Carl_Num0_1BTC_Short_50000USD,
			perpetuals: []perptypes.Perpetual{},
			feeParams:  constants.PerpetualFeeParams,
			expectedError: errors.New(
				"0: Perpetual does not exist",
			),
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			memClob := memclob.NewMemClobPriceTimePriority(false)
			mockBankKeeper := &mocks.BankKeeper{}
			mockBankKeeper.On(
				"GetBalance",
				mock.Anything,
				mock.Anything,
				constants.TDai.Denom,
			).Return(
				sdk.NewCoin(constants.TDai.Denom, sdkmath.NewIntFromBigInt(new(big.Int))),
			)

			ks := keepertest.NewClobKeepersTestContext(t, memClob, mockBankKeeper, indexer_manager.NewIndexerEventManagerNoop(), nil)
			ks.RatelimitKeeper.SetAssetYieldIndex(ks.Ctx, big.NewRat(1, 1))

			ctx := ks.Ctx.WithIsCheckTx(true)

			// Create liquidity tiers.
			keepertest.CreateTestLiquidityTiers(t, ctx, ks.PerpetualsKeeper)
			keepertest.CreateTestCollateralPools(t, ctx, ks.PerpetualsKeeper)

			require.NoError(t, ks.FeeTiersKeeper.SetPerpetualFeeParams(ctx, tc.feeParams))

			// Create all perpetuals.
			for _, p := range tc.perpetuals {
				_, err := ks.PerpetualsKeeper.CreatePerpetual(
					ctx,
					p.Params.Id,
					p.Params.Ticker,
					p.Params.MarketId,
					p.Params.AtomicResolution,
					p.Params.DefaultFundingPpm,
					p.Params.LiquidityTier,
					p.Params.DangerIndexPpm,
					p.Params.CollateralPoolId,
					p.YieldIndex,
				)
				require.NoError(t, err)
			}

			perptest.SetUpDefaultPerpOIsForTest(
				t,
				ks.Ctx,
				ks.PerpetualsKeeper,
				tc.perpetuals,
			)

			ks.SubaccountsKeeper.SetSubaccount(ctx, tc.subaccount)

			require.NoError(
				t,
				ks.ClobKeeper.InitializeLiquidationsConfig(ctx, clobtypes.LiquidationsConfig_Default),
			)
			_, marketPriceMap, perpetualMap, liquidityTierMap := ks.ClobKeeper.FetchInformationForLiquidations(ctx)
			isLiquidatable, hasNegativeTnc, liquidationPriority, err := ks.ClobKeeper.GetSubaccountCollateralizationInfo(
				ctx,
				tc.subaccount,
				marketPriceMap,
				perpetualMap,
				liquidityTierMap,
			)

			if tc.expectedError != nil {
				require.Error(t, err)
				require.Equal(t, tc.expectedError.Error(), err.Error())
				require.False(t, isLiquidatable)
				require.False(t, hasNegativeTnc)
				require.Nil(t, liquidationPriority)
			} else {
				require.NoError(t, err)
				require.Equal(t, tc.expectedIsLiquidatable, isLiquidatable)
				require.Equal(t, tc.expectedHasNegativeTnc, hasNegativeTnc)
				equalLiquidationPriority := liquidationPriority.SetPrec(20).Cmp(tc.expectedLiquidationPriority.SetPrec(20)) == 0
				require.Equal(t, true, equalLiquidationPriority)
			}
		})
	}
}

func TestUpdateCollateralizationInfoGivenAssets(t *testing.T) {
	tests := map[string]struct {
		settledSubaccount             satypes.Subaccount
		perpetuals                    []perptypes.Perpetual
		totalNetCollateral            *big.Int
		quoteCurrencyAtomicResolution int32
		expectedTotalNetCollateral    *big.Int
		expectedError                 error
	}{
		`Success: Correctly adds no collateral for subaccount with no asset positions`: {
			settledSubaccount: satypes.Subaccount{
				Id:                 &constants.Carl_Num0,
				AssetPositions:     []*satypes.AssetPosition{},
				PerpetualPositions: []*satypes.PerpetualPosition{},
			},
			perpetuals:                    []perptypes.Perpetual{},
			totalNetCollateral:            big.NewInt(1_000_000_000),
			quoteCurrencyAtomicResolution: assettypes.AssetTDai.AtomicResolution,
			expectedTotalNetCollateral:    big.NewInt(1_000_000_000),
			expectedError:                 nil,
		},
		`Success: Correctly adds up collateral for TDAI quote asset`: {
			settledSubaccount:             constants.Carl_Num0_1BTC_Short_50000USD,
			perpetuals:                    []perptypes.Perpetual{constants.BtcUsd_20PercentInitial_10PercentMaintenance},
			totalNetCollateral:            big.NewInt(0),
			quoteCurrencyAtomicResolution: assettypes.AssetTDai.AtomicResolution,
			expectedTotalNetCollateral:    big.NewInt(50_000_000_000),
			expectedError:                 nil,
		},
		`Success: Correctly adds up collateral for non-TDAI quote asset`: {
			settledSubaccount:             constants.Dave_Num0_TinyIso_Long_SmallBTC_Short,
			perpetuals:                    []perptypes.Perpetual{constants.IsoBtc_20PercentInitial_10PercentMaintenance_CollatPool1_Id5_DangerIndex1},
			totalNetCollateral:            big.NewInt(100),
			quoteCurrencyAtomicResolution: constants.BtcUsd.AtomicResolution,
			expectedTotalNetCollateral:    big.NewInt(-49999900),
			expectedError:                 nil,
		},
		`Failure: Errors out if more than one asset position is found`: {
			settledSubaccount: satypes.Subaccount{
				Id: &constants.Carl_Num0,
				AssetPositions: []*satypes.AssetPosition{
					{
						AssetId:  0,
						Quantums: dtypes.NewInt(50_000_000_000),
					},
					{
						AssetId:  1,
						Quantums: dtypes.NewInt(50_000),
					},
				},
			},
			perpetuals:                    []perptypes.Perpetual{},
			totalNetCollateral:            big.NewInt(100),
			quoteCurrencyAtomicResolution: assettypes.AssetTDai.AtomicResolution,
			expectedTotalNetCollateral:    nil,
			expectedError:                 clobtypes.ErrMultiCollateralNotImplemented,
		},
		`Failure: Errors out if quote asset id does not match asset position in subaccount`: {
			settledSubaccount: satypes.Subaccount{
				Id: &constants.Carl_Num0,
				AssetPositions: []*satypes.AssetPosition{
					{
						AssetId:  1,
						Quantums: dtypes.NewInt(50_000),
					},
				},
				PerpetualPositions: []*satypes.PerpetualPosition{
					{
						PerpetualId:  0,
						Quantums:     dtypes.NewInt(-100_000_000),
						FundingIndex: dtypes.NewInt(0),
						YieldIndex:   big.NewRat(0, 1).String(),
					},
				},
			},
			perpetuals:                    []perptypes.Perpetual{constants.BtcUsd_20PercentInitial_10PercentMaintenance},
			totalNetCollateral:            big.NewInt(100),
			quoteCurrencyAtomicResolution: constants.BtcUsd.AtomicResolution,
			expectedTotalNetCollateral:    nil,
			expectedError:                 clobtypes.ErrMultiCollateralNotImplemented,
		},
		`Failure: Errors out if no perpetuals present in subaccount and asset position is not TDAI`: {
			settledSubaccount: satypes.Subaccount{
				Id: &constants.Carl_Num0,
				AssetPositions: []*satypes.AssetPosition{
					{
						AssetId:  1,
						Quantums: dtypes.NewInt(50_000),
					},
				},
			},
			perpetuals:                    []perptypes.Perpetual{},
			totalNetCollateral:            big.NewInt(100),
			quoteCurrencyAtomicResolution: constants.BtcUsd.AtomicResolution,
			expectedTotalNetCollateral:    nil,
			expectedError:                 assettypes.ErrTDaiMustBeQuoteAssetOfBaseCollateralPool,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			memClob := memclob.NewMemClobPriceTimePriority(false)
			mockBankKeeper := &mocks.BankKeeper{}
			mockBankKeeper.On(
				"GetBalance",
				mock.Anything,
				mock.Anything,
				constants.TDai.Denom,
			).Return(
				sdk.NewCoin(constants.TDai.Denom, sdkmath.NewIntFromBigInt(new(big.Int))),
			)

			ks := keepertest.NewClobKeepersTestContext(t, memClob, mockBankKeeper, indexer_manager.NewIndexerEventManagerNoop(), nil)
			ks.RatelimitKeeper.SetAssetYieldIndex(ks.Ctx, big.NewRat(1, 1))

			ctx := ks.Ctx.WithIsCheckTx(true)

			// Create liquidity tiers.
			keepertest.CreateTestLiquidityTiers(t, ctx, ks.PerpetualsKeeper)
			keepertest.CreateTestCollateralPools(t, ctx, ks.PerpetualsKeeper)

			// Create all perpetuals.
			for _, p := range tc.perpetuals {
				_, err := ks.PerpetualsKeeper.CreatePerpetual(
					ctx,
					p.Params.Id,
					p.Params.Ticker,
					p.Params.MarketId,
					p.Params.AtomicResolution,
					p.Params.DefaultFundingPpm,
					p.Params.LiquidityTier,
					p.Params.DangerIndexPpm,
					p.Params.CollateralPoolId,
					p.YieldIndex,
				)
				require.NoError(t, err)
			}

			ks.SubaccountsKeeper.SetSubaccount(ctx, tc.settledSubaccount)

			err := ks.ClobKeeper.UpdateCollateralizationInfoGivenAssets(
				ctx,
				tc.settledSubaccount,
				tc.totalNetCollateral,
				tc.quoteCurrencyAtomicResolution,
			)

			if tc.expectedError != nil {
				require.Error(t, err)
				require.Equal(t, tc.expectedError.Error(), err.Error())
			} else {
				require.NoError(t, err)
				require.Equal(t, tc.expectedTotalNetCollateral, tc.totalNetCollateral)
			}
		})
	}
}

func TestGetLiquidatableAndNegativeTncSubaccountIds(t *testing.T) {
	largeNegativeLiquidationPriority, _ := new(big.Float).SetString("-2500000000000000000000000000000")
	largeNegativeLiquidationPriority2, _ := new(big.Float).SetString("-62500000000000000000000000000000000000")

	tests := map[string]struct {
		subaccounts                       []satypes.Subaccount
		perpetuals                        []perptypes.Perpetual
		feeParams                         feetiertypes.PerpetualFeeParams
		expectedLiquidatableSubaccountIds []heap.LiquidationPriority
		expectedNegativeTncSubaccountIds  map[satypes.SubaccountId]struct{}
		expectedError                     error
	}{
		`Success: Handles no liquidatable subaccounts`: {
			subaccounts:                       []satypes.Subaccount{constants.Carl_Num0_1BTC_Short_50000USD},
			perpetuals:                        []perptypes.Perpetual{constants.BtcUsd_NoMarginRequirement},
			feeParams:                         constants.PerpetualFeeParams,
			expectedLiquidatableSubaccountIds: []heap.LiquidationPriority{},
			expectedNegativeTncSubaccountIds:  map[satypes.SubaccountId]struct{}{},
			expectedError:                     nil,
		},
		`Success: Handles one liquidatable subaccount`: {
			subaccounts: []satypes.Subaccount{constants.Carl_Num1_99999TDAI_Long_1BTC_Short},
			perpetuals:  []perptypes.Perpetual{constants.BtcUsd_100PercentMarginRequirement_Danger_Index},
			feeParams:   constants.PerpetualFeeParams,
			expectedLiquidatableSubaccountIds: []heap.LiquidationPriority{
				{
					SubaccountId: constants.Carl_Num1,
					Priority:     new(big.Float).Quo(big.NewFloat(49999000000), big.NewFloat(50000000000*50000000000)),
				},
			},
			expectedNegativeTncSubaccountIds: map[satypes.SubaccountId]struct{}{},
			expectedError:                    nil,
		},
		`Success: Handles one liquidatable subaccount that also has negative TNC`: {
			subaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num1,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(49_000_000_000), // $49,000
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId: 0,
							Quantums:    dtypes.NewInt(-100_000_000), // -1 BTC
							YieldIndex:  big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
			perpetuals: []perptypes.Perpetual{constants.BtcUsd_100PercentMarginRequirement_Danger_Index},
			feeParams:  constants.PerpetualFeeParams,
			expectedLiquidatableSubaccountIds: []heap.LiquidationPriority{
				{
					SubaccountId: constants.Carl_Num1,
					Priority:     largeNegativeLiquidationPriority,
				},
			},
			expectedNegativeTncSubaccountIds: map[satypes.SubaccountId]struct{}{
				constants.Carl_Num1: {},
			},
			expectedError: nil,
		},
		`Success: Handles one liquidatable non-TDAI backed subaccount`: {
			subaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num1,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  1,
							Quantums: dtypes.NewInt(101_000_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId: 8,
							Quantums:    dtypes.NewInt(-100_000_000),
							YieldIndex:  big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
			perpetuals: []perptypes.Perpetual{constants.BtcBtc_100PercentMarginRequirement_CollatPool1_Id8_DangerIndex1},
			feeParams:  constants.PerpetualFeeParams,
			expectedLiquidatableSubaccountIds: []heap.LiquidationPriority{
				{
					SubaccountId: constants.Carl_Num1,
					Priority:     new(big.Float).Quo(big.NewFloat(50_000_000_000), big.NewFloat(5_000_000_000_000*5_000_000_000_000)),
				},
			},
			expectedNegativeTncSubaccountIds: map[satypes.SubaccountId]struct{}{},
			expectedError:                    nil,
		},
		`Success: Handles one liquidatable non-TDAI backed subaccount with negative TNC`: {
			subaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num1,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  1,
							Quantums: dtypes.NewInt(50_000_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId: 8,
							Quantums:    dtypes.NewInt(-100_000_000),
							YieldIndex:  big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
			perpetuals: []perptypes.Perpetual{constants.BtcBtc_100PercentMarginRequirement_CollatPool1_Id8_DangerIndex1},
			feeParams:  constants.PerpetualFeeParams,
			expectedLiquidatableSubaccountIds: []heap.LiquidationPriority{
				{
					SubaccountId: constants.Carl_Num1,
					Priority:     largeNegativeLiquidationPriority2,
				},
			},
			expectedNegativeTncSubaccountIds: map[satypes.SubaccountId]struct{}{
				constants.Carl_Num1: {},
			},
			expectedError: nil,
		},
		`Success: Handles multiple liquidatable non-TDAI backed subaccounts`: {
			subaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  1,
							Quantums: dtypes.NewInt(50_000_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId: 8,
							Quantums:    dtypes.NewInt(-100_000_000),
							YieldIndex:  big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num1,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  1,
							Quantums: dtypes.NewInt(101_000_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId: 8,
							Quantums:    dtypes.NewInt(-100_000_000),
							YieldIndex:  big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
			perpetuals: []perptypes.Perpetual{constants.BtcBtc_100PercentMarginRequirement_CollatPool1_Id8_DangerIndex1},
			feeParams:  constants.PerpetualFeeParams,
			expectedLiquidatableSubaccountIds: []heap.LiquidationPriority{
				{
					SubaccountId: constants.Carl_Num0,
					Priority:     largeNegativeLiquidationPriority2,
				},
				{
					SubaccountId: constants.Dave_Num1,
					Priority:     new(big.Float).Quo(big.NewFloat(50_000_000_000), big.NewFloat(5_000_000_000_000*5_000_000_000_000)),
				},
			},
			expectedNegativeTncSubaccountIds: map[satypes.SubaccountId]struct{}{
				constants.Carl_Num0: {},
			},
			expectedError: nil,
		},
		`Success: Handles multiple liquidatable TDAI backed subaccounts`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num1_99999TDAI_Long_1BTC_Short,
				{
					Id: &constants.Dave_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(49_000_000_000), // $49,000
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId: 0,
							Quantums:    dtypes.NewInt(-100_000_000), // -1 BTC
							YieldIndex:  big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
			perpetuals: []perptypes.Perpetual{constants.BtcUsd_100PercentMarginRequirement_Danger_Index},
			feeParams:  constants.PerpetualFeeParams,
			expectedLiquidatableSubaccountIds: []heap.LiquidationPriority{
				{
					SubaccountId: constants.Dave_Num0,
					Priority:     largeNegativeLiquidationPriority,
				},
				{
					SubaccountId: constants.Carl_Num1,
					Priority:     new(big.Float).Quo(big.NewFloat(49999000000), big.NewFloat(50000000000*50000000000)),
				},
			},
			expectedNegativeTncSubaccountIds: map[satypes.SubaccountId]struct{}{
				constants.Dave_Num0: {},
			},
			expectedError: nil,
		},
		`Success: Handles a mix of multiple liquidatable TDAI backed and non-TDAI backed subaccounts`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num1_99999TDAI_Long_1BTC_Short,
				{
					Id: &constants.Dave_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(49_000_000_000), // $49,000
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId: 0,
							Quantums:    dtypes.NewInt(-100_000_000), // -1 BTC
							YieldIndex:  big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Alice_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  1,
							Quantums: dtypes.NewInt(50_000_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId: 8,
							Quantums:    dtypes.NewInt(-100_000_000),
							YieldIndex:  big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Bob_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  1,
							Quantums: dtypes.NewInt(101_000_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId: 8,
							Quantums:    dtypes.NewInt(-100_000_000),
							YieldIndex:  big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
			perpetuals: []perptypes.Perpetual{constants.BtcUsd_100PercentMarginRequirement_Danger_Index, constants.BtcBtc_100PercentMarginRequirement_CollatPool1_Id8_DangerIndex1},
			feeParams:  constants.PerpetualFeeParams,
			expectedLiquidatableSubaccountIds: []heap.LiquidationPriority{
				{
					SubaccountId: constants.Alice_Num0,
					Priority:     largeNegativeLiquidationPriority2,
				},
				{
					SubaccountId: constants.Dave_Num0,
					Priority:     largeNegativeLiquidationPriority,
				},
				{
					SubaccountId: constants.Bob_Num0,
					Priority:     new(big.Float).Quo(big.NewFloat(50_000_000_000), big.NewFloat(5_000_000_000_000*5_000_000_000_000)),
				},
				{
					SubaccountId: constants.Carl_Num1,
					Priority:     new(big.Float).Quo(big.NewFloat(49999000000), big.NewFloat(50000000000*50000000000)),
				},
			},
			expectedNegativeTncSubaccountIds: map[satypes.SubaccountId]struct{}{
				constants.Dave_Num0:  {},
				constants.Alice_Num0: {},
			},
			expectedError: nil,
		},
		`Throws error when perpetual does not exist`: {
			subaccounts: []satypes.Subaccount{constants.Carl_Num0_1BTC_Short_50000USD},
			perpetuals:  []perptypes.Perpetual{},
			feeParams:   constants.PerpetualFeeParams,
			expectedError: errors.New(
				"Error checking collateralization status: 0: Perpetual does not exist",
			),
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			memClob := memclob.NewMemClobPriceTimePriority(false)
			mockBankKeeper := &mocks.BankKeeper{}
			mockBankKeeper.On(
				"GetBalance",
				mock.Anything,
				mock.Anything,
				constants.TDai.Denom,
			).Return(
				sdk.NewCoin(constants.TDai.Denom, sdkmath.NewIntFromBigInt(new(big.Int))),
			)

			ks := keepertest.NewClobKeepersTestContext(t, memClob, mockBankKeeper, indexer_manager.NewIndexerEventManagerNoop(), nil)
			ks.RatelimitKeeper.SetAssetYieldIndex(ks.Ctx, big.NewRat(1, 1))

			ctx := ks.Ctx.WithIsCheckTx(true)

			// Create liquidity tiers.
			keepertest.CreateTestLiquidityTiers(t, ctx, ks.PerpetualsKeeper)
			keepertest.CreateTestCollateralPools(t, ctx, ks.PerpetualsKeeper)

			require.NoError(t, ks.FeeTiersKeeper.SetPerpetualFeeParams(ctx, tc.feeParams))

			// Create all perpetuals.
			for _, p := range tc.perpetuals {
				_, err := ks.PerpetualsKeeper.CreatePerpetual(
					ctx,
					p.Params.Id,
					p.Params.Ticker,
					p.Params.MarketId,
					p.Params.AtomicResolution,
					p.Params.DefaultFundingPpm,
					p.Params.LiquidityTier,
					p.Params.DangerIndexPpm,
					p.Params.CollateralPoolId,
					p.YieldIndex,
				)
				require.NoError(t, err)
			}

			perptest.SetUpDefaultPerpOIsForTest(
				t,
				ks.Ctx,
				ks.PerpetualsKeeper,
				tc.perpetuals,
			)

			for _, subaccount := range tc.subaccounts {
				ks.SubaccountsKeeper.SetSubaccount(ctx, subaccount)
			}

			require.NoError(
				t,
				ks.ClobKeeper.InitializeLiquidationsConfig(ctx, clobtypes.LiquidationsConfig_Default),
			)

			liquidatableSubaccountIds, negativeTncSubaccountIds, err := ks.ClobKeeper.GetLiquidatableAndNegativeTncSubaccountIds(ctx)

			if tc.expectedError != nil {
				require.Error(t, err)
				require.Equal(t, tc.expectedError.Error(), err.Error())
				require.Nil(t, liquidatableSubaccountIds)
				require.Nil(t, negativeTncSubaccountIds)
			} else {
				require.NoError(t, err)
				require.Equal(t, len(tc.expectedLiquidatableSubaccountIds), liquidatableSubaccountIds.Len())

				for _, gotSubaccountId := range negativeTncSubaccountIds {
					_, exists := tc.expectedNegativeTncSubaccountIds[gotSubaccountId]
					require.True(t, exists, "Subaccount ID %v was not expected to have negative TNC", gotSubaccountId)
				}

				for _, expectedLiquidationSubaccount := range tc.expectedLiquidatableSubaccountIds {
					gotLiquidationSubaccount := liquidatableSubaccountIds.PopLowestPriority()
					require.Equal(t, expectedLiquidationSubaccount.SubaccountId, gotLiquidationSubaccount.SubaccountId)
					require.Equal(t, expectedLiquidationSubaccount.Priority.SetPrec(20).Cmp(gotLiquidationSubaccount.Priority.SetPrec(20)), 0)
				}
			}
		})
	}
}
