package clob_test

import (
	"math/big"
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/deleveraging/api"
	sdaiservertypes "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/sdaioracle"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"

	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	"github.com/cometbft/cometbft/types"

	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	clobtest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/clob"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	clobtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	feetiertypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/feetiers/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	prices "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	ratelimitkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/keeper"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	"github.com/stretchr/testify/require"
)

func TestLiquidationConfig(t *testing.T) {
	tests := map[string]struct {
		// State.
		subaccounts                   []satypes.Subaccount
		marketIdToOraclePriceOverride map[uint32]uint64

		// Parameters.
		placedMatchableOrders []clobtypes.MatchableOrder

		// Configuration.
		liquidationConfig clobtypes.LiquidationsConfig
		liquidityTiers    []perptypes.LiquidityTier
		perpetuals        []perptypes.Perpetual
		clobPairs         []clobtypes.ClobPair

		// Expectations.
		expectedSubaccounts []satypes.Subaccount
	}{
		`Liquidating short correct`: {
			subaccounts: []satypes.Subaccount{
				// Carl_Num0 is irrelevant to the test, but is used to seed the insurance fund.
				constants.Carl_Num0_1BTC_Short_50499USD,
				constants.Carl_Num1_1BTC_Short_50499USD,
				constants.Dave_Num0_1BTC_Long_50000USD,
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				// This order is irrelevant to the test, but is used to seed the insurance fund.
				&constants.Order_Dave_Num0_Id2_Clob0_Sell1BTC_Price49500_GTB10, // Order at $49,500

				// Bankruptcy price is $50,499, and closing at $50,500 would require $1 from the insurance fund.
				// First order would transfer $0.1 from the insurance fund and would succeed.
				// Second order would require $0.9 from the insurance fund and would fail since subaccounts
				// may only lose $0.5 per block.
				&constants.Order_Dave_Num0_Id1_Clob0_Sell01BTC_Price50500_GTB10, // Order at $50,500
				&constants.Order_Dave_Num0_Id0_Clob0_Sell1BTC_Price50500_GTB10,  // Order at $50,500
			},
			liquidationConfig: clobtypes.LiquidationsConfig{
				InsuranceFundFeePpm: 5_000,
				ValidatorFeePpm:     200_000,
				LiquidityFeePpm:     800_000,
				FillablePriceConfig: constants.FillablePriceConfig_Max_Smmr,
			},

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num1,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId: 0,
							// $0.1 from insurance fund
							Quantums: dtypes.NewInt(50_499_000_000 - 5_050_000_000 + 100_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId:  0,
							Quantums:     dtypes.NewInt(-90_000_000), // -0.9 BTC
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_000_000_000 + 49_500_000_000 + 5_050_000_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId:  0,
							Quantums:     dtypes.NewInt(-10_000_000), // -0.1 BTC
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`Liquidating short BTC collat correct`: {
			subaccounts: []satypes.Subaccount{
				// Bob_Num11 is irrelevant to the test, but is used to seed the insurance fund.
				constants.Bob_Num11_20Link_Short_10499BTC,
				constants.Carl_Num11_20Link_Short_10099BTC,
				constants.Dave_Num11_20Link_Long_1BTC,
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				// This order is irrelevant to the test, but is used to seed the insurance fund.
				&constants.Order_Dave_Num11_Id2_Clob10_Sell20Link_Price0_0495_GTB10, // Order at 0.0495 BTC

				&constants.Order_Dave_Num11_Id1_Clob10_Sell2Link_Price0_0505_GTB10, // Order at 0.0505 BTC
				&constants.Order_Dave_Num11_Id0_Clob10_Sell20Link_Price0_505_GTB10, // Order at 0.0505 BTC
			},
			liquidationConfig: clobtypes.LiquidationsConfig{
				InsuranceFundFeePpm: 5_000,
				ValidatorFeePpm:     200_000,
				LiquidityFeePpm:     800_000,
				FillablePriceConfig: constants.FillablePriceConfig_Max_Smmr,
			},

			marketIdToOraclePriceOverride: map[uint32]uint64{
				0: 100_000,
			},

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.LinkBtc_10_20MarginRequirement_CollatPool1_Id11_OpenInterest20,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_LinkBtc},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num11,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  1,
							Quantums: dtypes.NewInt(100_990_000 - 10_100_000 + 1000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId:  11,
							Quantums:     dtypes.NewInt(-1_800_000_000), // -18 Link
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num11,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  1,
							Quantums: dtypes.NewInt(100_000_000 + 99_000_000 + 10_100_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId:  11,
							Quantums:     dtypes.NewInt(-200_000_000), // -2 Link
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`Liquidating long correct`: {
			subaccounts: []satypes.Subaccount{
				// Carl_Num0 is irrelevant to the test, but is used to seed the insurance fund.
				constants.Carl_Num0_1BTC_Short_100000USD,
				constants.Dave_Num0_1BTC_Long_49501USD_Short,
				constants.Dave_Num1_1BTC_Long_49501USD_Short,
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				// This order is irrelevant to the test, but is used to seed the insurance fund.
				&constants.Order_Carl_Num0_Id2_Clob0_Buy1BTC_Price50500_GTB10, // Order at $50,500

				// Bankruptcy price is $49,501, and closing at $49,500 would require $1 from the insurance fund.
				// First order would transfer $0.1 from the insurance fund and would succeed.
				// Second order would require $0.9 from the insurance fund and would fail since subaccounts
				// may only lose $0.5 per block.
				&constants.Order_Carl_Num0_Id1_Clob0_Buy01BTC_Price49500_GTB10, // Order at $49,500
				&constants.Order_Carl_Num0_Id0_Clob0_Buy1BTC_Price49500_GTB10,  // Order at $49,500
			},
			liquidationConfig: clobtypes.LiquidationsConfig{
				InsuranceFundFeePpm: 5_000,
				ValidatorFeePpm:     200_000,
				LiquidityFeePpm:     800_000,
				FillablePriceConfig: constants.FillablePriceConfig_Max_Smmr,
			},

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(100_000_000_000 - 50_500_000_000 - 4_950_000_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId:  0,
							Quantums:     dtypes.NewInt(10_000_000), // 0.1 BTC
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num1,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(-49_501_000_000 + 4_950_000_000 + 100_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId:  0,
							Quantums:     dtypes.NewInt(90_000_000), // 0.9 BTC
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
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
						genesisState.CollateralPools = []perptypes.CollateralPool{
							{
								CollateralPoolId:                        0,
								MaxCumulativeInsuranceFundDeltaPerBlock: 500_000,
								MultiCollateralAssets: &perptypes.MultiCollateralAssetsArray{
									MultiCollateralAssets: []uint32{0},
								},
								QuoteAssetId: 0,
							},
							{
								CollateralPoolId:                        1,
								MaxCumulativeInsuranceFundDeltaPerBlock: 5_000,
								MultiCollateralAssets: &perptypes.MultiCollateralAssetsArray{
									MultiCollateralAssets: []uint32{1},
								},
								QuoteAssetId: 1,
							},
						}
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
						genesisState.LiquidationsConfig = tc.liquidationConfig
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

			ctx := tApp.InitChain()

			// Seed insurance fund
			if len(tc.placedMatchableOrders) > 0 {
				firstOrder := tc.placedMatchableOrders[0]
				firstOrderMsg := clobtypes.MsgPlaceOrder{Order: firstOrder.MustGetOrder()}
				checkTx := testapp.MustMakeCheckTxsWithClobMsg(ctx, tApp.App, firstOrderMsg)[0]
				resp := tApp.CheckTx(checkTx)
				require.Conditionf(t, resp.IsOK, "Expected CheckTx to succeed. Response: %+v", resp)
			}

			// Advance to block 3.
			ctx = tApp.AdvanceToBlock(3, testapp.AdvanceToBlockOptions{})

			// Place remaining orders.
			if len(tc.placedMatchableOrders) > 1 {
				remainingOrderMsgs := make([]clobtypes.MsgPlaceOrder, len(tc.placedMatchableOrders)-1)
				for i, matchableOrder := range tc.placedMatchableOrders[1:] {
					remainingOrderMsgs[i] = clobtypes.MsgPlaceOrder{Order: matchableOrder.MustGetOrder()}
				}
				for _, checkTx := range testapp.MustMakeCheckTxsWithClobMsg(ctx, tApp.App, remainingOrderMsgs...) {
					resp := tApp.CheckTx(checkTx)
					require.Conditionf(t, resp.IsOK, "Expected CheckTx to succeed. Response: %+v", resp)
				}
			}

			// Verify test expectations.
			ctx = tApp.AdvanceToBlock(4, testapp.AdvanceToBlockOptions{})
			for _, expectedSubaccount := range tc.expectedSubaccounts {
				require.Equal(
					t,
					expectedSubaccount,
					tApp.App.SubaccountsKeeper.GetSubaccount(ctx, *expectedSubaccount.Id),
				)
			}
		})
	}
}

func TestPlacePerpetualLiquidation_Deleveraging(t *testing.T) {
	tests := map[string]struct {
		// State.
		subaccounts                   []satypes.Subaccount
		marketIdToOraclePriceOverride map[uint32]uint64

		// Parameters.
		placedMatchableOrders []clobtypes.MatchableOrder

		// Configuration.
		liquidationConfig clobtypes.LiquidationsConfig
		liquidityTiers    []perptypes.LiquidityTier
		perpetuals        []perptypes.Perpetual
		clobPairs         []clobtypes.ClobPair

		// Expectations.
		expectedSubaccounts []satypes.Subaccount
	}{
		`Can place a liquidation order that is fully filled and does not require deleveraging`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_50499USD,
				constants.Dave_Num0_1BTC_Long_50000USD,
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				&constants.Order_Dave_Num0_Id0_Clob0_Sell1BTC_Price50000_GTB10, // Order at $50,000
			},
			liquidationConfig: constants.LiquidationsConfig_FillablePrice_Max_Smmr,

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_499_000_000 - 50_000_000_000 - 250_000_000),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(100_000_000_000), // $100,000
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`Can place a liquidation order that is fully filled and does not require deleveraging & includes validator and liquidity fees`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_50499USD,
				constants.Dave_Num0_1BTC_Long_50000USD,
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				&constants.Order_Dave_Num0_Id0_Clob0_Sell1BTC_Price50000_GTB10, // Order at $50,000
			},
			liquidationConfig: constants.LiquidationsConfig_FillablePrice_Max_Smmr_With_Fees,

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(124500000), // 50_499_000_000 - 50_000_000_000 - 250_000_000 / 2
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(100_000_000_000), // $100,000
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`Can place a liquidation order that is partially filled and does not require deleveraging`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_50499USD,
				constants.Dave_Num0_1BTC_Long_50000USD,
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				// First order at $50,000
				&constants.Order_Dave_Num0_Id1_Clob0_Sell025BTC_Price50000_GTB11,
				// Second order at $60,000, which does not cross the liquidation order
				&constants.Order_Dave_Num0_Id0_Clob0_Sell1BTC_Price60000_GTB10,
			},
			liquidationConfig: constants.LiquidationsConfig_FillablePrice_Max_Smmr,

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_499_000_000 - 12_500_000_000 - 62_500_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId:  0,
							Quantums:     dtypes.NewInt(-75_000_000), // -0.75 BTC
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_000_000_000 + 12_500_000_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId:  0,
							Quantums:     dtypes.NewInt(75_000_000), // 0.75 BTC
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`Can place a liquidation order that is unfilled and full position size is deleveraged`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_50499USD,
				constants.Dave_Num1_1BTC_Long_50000USD,
			},
			marketIdToOraclePriceOverride: map[uint32]uint64{
				constants.BtcUsd.MarketId: 5_050_000_000, // $50,500 / BTC
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				// Carl's bankruptcy price to close 1 BTC short is $50,499, and closing at $50,500
				// would require $1 from the insurance fund. Since the insurance fund is empty,
				// deleveraging is required to close this position.
				&constants.Order_Dave_Num1_Id1_Clob0_Sell025BTC_Price50500_GTB11,
			},
			liquidationConfig: constants.LiquidationsConfig_FillablePrice_Max_Smmr,

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id:              &constants.Carl_Num0,
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num1,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_000_000_000 + 50_499_000_000),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`BTC Collat: Can place a liquidation order that is unfilled and full position size is deleveraged`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num11_20Link_Short_10099BTC,
				constants.Dave_Num11_20Link_Long_1BTC,
			},
			marketIdToOraclePriceOverride: map[uint32]uint64{
				constants.BtcUsd.MarketId: 100_000,
				5:                         5_050_000,
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				// Carl's bankruptcy price to close 20 Link short is $0.0504..., and closing at 0.0505
				// would require $1 from the insurance fund. Since the insurance fund is empty,
				// deleveraging is required to close this position.
				&constants.Order_Dave_Num11_Id1_Clob10_Sell5Link_Price0_0505_GTB11,
			},
			liquidationConfig: constants.LiquidationsConfig_FillablePrice_Max_Smmr,

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.LinkBtc_10_20MarginRequirement_CollatPool1_Id11_OpenInterest20,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_LinkBtc},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id:              &constants.Carl_Num11,
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num11,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  1,
							Quantums: dtypes.NewInt(100_000_000 + 100_990_000),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`Can place a liquidation order that is partially-filled and deleveraging is skipped`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_50499USD,
				constants.Dave_Num0_1BTC_Long_50000USD,
			},
			marketIdToOraclePriceOverride: map[uint32]uint64{
				constants.BtcUsd.MarketId: 5_050_000_000, // $50,500 / BTC
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				// First order at $50,498, Carl pays $0.25 to the insurance fund.
				&constants.Order_Dave_Num0_Id1_Clob0_Sell025BTC_Price50498_GTB11,
				// Carl's bankruptcy price to close 0.75 BTC short is $50,499, and closing at $50,500
				// would require $0.75 from the insurance fund. Since the insurance fund is empty,
				// deleveraging is required to close this position.
				&constants.Order_Dave_Num0_Id0_Clob0_Sell1BTC_Price50500_GTB10,
			},
			liquidationConfig: constants.LiquidationsConfig_FillablePrice_Max_Smmr,

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_499_000_000 - (50_498_000_000 / 4) - 250_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId:  0,
							Quantums:     dtypes.NewInt(-75_000_000), // -0.75 BTC
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_000_000_000 + (50_498_000_000 / 4)),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId:  0,
							Quantums:     dtypes.NewInt(75_000_000), // 0.75 BTC
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`Can place a liquidation order that is unfilled and cannot be deleveraged due to
		non-overlapping bankruptcy prices`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_49999USD,
				constants.Dave_Num0_1BTC_Long_50000USD_Short,
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				// Carl's bankruptcy price to close 1 BTC short is $49,999, and closing at $50,000
				// would require $1 from the insurance fund. Since the insurance fund is empty,
				// deleveraging is required to close this position.
				&constants.Order_Dave_Num0_Id1_Clob0_Sell025BTC_Price50000_GTB11,
			},
			liquidationConfig: constants.LiquidationsConfig_FillablePrice_Max_Smmr,

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedSubaccounts: []satypes.Subaccount{
				// Deleveraging fails.
				// Dave's bankruptcy price to close 1 BTC long is $50,000, and deleveraging can not be
				// performed due to non overlapping bankruptcy prices.
				constants.Carl_Num0_1BTC_Short_49999USD,
				constants.Dave_Num0_1BTC_Long_50000USD_Short,
			},
		},
		`Can place a liquidation order that is partially-filled and cannot be deleveraged due to
		non-overlapping bankruptcy prices`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_49999USD,
				constants.Dave_Num0_1BTC_Long_50000USD_Short,
				constants.Dave_Num1_025BTC_Long_50000USD,
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				&constants.Order_Dave_Num1_Id0_Clob0_Sell025BTC_Price49999_GTB10,
				// Carl's bankruptcy price to close 1 BTC short is $49,999, and closing 0.75 BTC at $50,000
				// would require $0.75 from the insurance fund. Since the insurance fund is empty,
				// deleveraging is required to close this position.
				&constants.Order_Dave_Num0_Id1_Clob0_Sell025BTC_Price50000_GTB11,
			},
			liquidationConfig: constants.LiquidationsConfig_FillablePrice_Max_Smmr,

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedSubaccounts: []satypes.Subaccount{
				// Deleveraging fails for remaining amount.
				{
					Id: &constants.Carl_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(49_999_000_000 - 12_499_750_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId:  0,
							Quantums:     dtypes.NewInt(-75_000_000), // -0.75 BTC
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				// Dave's bankruptcy price to close 1 BTC long is $50,000, and deleveraging can not be
				// performed due to non overlapping bankruptcy prices.
				// Dave_Num0 does not change since deleveraging against this subaccount failed.
				constants.Dave_Num0_1BTC_Long_50000USD_Short,
				{
					Id: &constants.Dave_Num1,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_000_000_000 + 12_499_750_000),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`Can place a liquidation order that is unfilled, then only a portion of the remaining size can
		deleveraged due to non-overlapping bankruptcy prices with some subaccounts`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_49999USD,
				constants.Dave_Num0_1BTC_Long_50000USD_Short,
				constants.Dave_Num1_05BTC_Long_50000USD,
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				// Carl's bankruptcy price to close 1 BTC short is $49,999, and closing 0.75 BTC at $50,000
				// would require $0.75 from the insurance fund. Since the insurance fund is empty,
				// deleveraging is required to close this position.
				&constants.Order_Dave_Num0_Id1_Clob0_Sell025BTC_Price50000_GTB11,
			},
			liquidationConfig: constants.LiquidationsConfig_FillablePrice_Max_Smmr,

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(49_999_000_000 - 24_999_500_000),
						},
					},
					PerpetualPositions: []*satypes.PerpetualPosition{
						{
							PerpetualId: 0,
							// Deleveraging fails for remaining amount.
							Quantums:     dtypes.NewInt(-50_000_000), // -0.5 BTC
							FundingIndex: dtypes.NewInt(0),
							YieldIndex:   big.NewRat(0, 1).String(),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				// Dave_Num0 does not change since deleveraging against this subaccount failed.
				constants.Dave_Num0_1BTC_Long_50000USD_Short,
				{
					Id: &constants.Dave_Num1,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_000_000_000 + 24_999_500_000),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`Deleveraging takes precedence - can place a liquidation order that would fail due to exceeding
		subaccount limit and full position size is deleveraged`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_50499USD,
				constants.Dave_Num0_1BTC_Long_50000USD,
			},

			marketIdToOraclePriceOverride: map[uint32]uint64{
				constants.BtcUsd.MarketId: 5_050_000_000, // $50,500 / BTC
			},

			placedMatchableOrders: []clobtypes.MatchableOrder{
				// Carl's bankruptcy price to close 1 BTC short is $50,499, and closing at $50,500
				// would require $1 from the insurance fund. Since the insurance fund is empty,
				// deleveraging is required to close this position.
				&constants.Order_Dave_Num0_Id1_Clob0_Sell025BTC_Price50500_GTB11,
			},
			liquidationConfig: clobtypes.LiquidationsConfig{
				InsuranceFundFeePpm: 5_000,
				ValidatorFeePpm:     200_000,
				LiquidityFeePpm:     800_000,
				FillablePriceConfig: constants.FillablePriceConfig_Max_Smmr,
			},

			liquidityTiers: constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id:              &constants.Carl_Num0,
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_000_000_000 + 50_499_000_000),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`Deleveraging occurs at bankruptcy price for negative TNC subaccount with open position in final settlement market`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_50499USD,
				constants.Dave_Num0_1BTC_Long_50000USD,
			},

			marketIdToOraclePriceOverride: map[uint32]uint64{
				constants.BtcUsd.MarketId: 5_050_000_000, // $50,500 / BTC
			},
			// Account should be deleveraged regardless of whether or not the liquidations engine returns this subaccount
			// in the list of liquidatable subaccounts. Pass empty list to confirm this.
			liquidationConfig: constants.LiquidationsConfig_FillablePrice_Max_Smmr,
			liquidityTiers:    constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc_Final_Settlement},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id:              &constants.Carl_Num0,
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_000_000_000 + 50_499_000_000),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
			},
		},
		`Deleveraging occurs at oracle price for non-negative TNC subaccounts
			with open positions in final settlement market`: {
			subaccounts: []satypes.Subaccount{
				constants.Carl_Num0_1BTC_Short_100000USD,
				constants.Dave_Num0_1BTC_Long_50000USD,
			},
			liquidationConfig: constants.LiquidationsConfig_FillablePrice_Max_Smmr,
			liquidityTiers:    constants.LiquidityTiers,
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest1,
			},
			clobPairs: []clobtypes.ClobPair{constants.ClobPair_Btc_Final_Settlement},

			expectedSubaccounts: []satypes.Subaccount{
				{
					Id: &constants.Carl_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(100_000_000_000 - 50_000_000_000),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
				},
				{
					Id: &constants.Dave_Num0,
					AssetPositions: []*satypes.AssetPosition{
						{
							AssetId:  0,
							Quantums: dtypes.NewInt(50_000_000_000 + 50_000_000_000),
						},
					},
					AssetYieldIndex: big.NewRat(1, 1).String(),
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
						genesisState.LiquidationsConfig = tc.liquidationConfig
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

			_, err := tApp.App.Server.UpdateSubaccountsListForDeleveragingDaemon(ctx, &api.UpdateSubaccountsListForDeleveragingDaemonRequest{
				SubaccountOpenPositionInfo: clobtest.GetOpenPositionsFromSubaccounts(tc.subaccounts),
			})
			require.NoError(t, err)

			// Create all existing orders.
			existingOrderMsgs := make([]clobtypes.MsgPlaceOrder, len(tc.placedMatchableOrders))
			for i, matchableOrder := range tc.placedMatchableOrders {
				existingOrderMsgs[i] = clobtypes.MsgPlaceOrder{Order: matchableOrder.MustGetOrder()}
			}
			for _, checkTx := range testapp.MustMakeCheckTxsWithClobMsg(ctx, tApp.App, existingOrderMsgs...) {
				resp := tApp.CheckTx(checkTx)
				require.Conditionf(t, resp.IsOK, "Expected CheckTx to succeed. Response: %+v", resp)
			}

			// Verify test expectations.
			ctx = tApp.AdvanceToBlock(3, testapp.AdvanceToBlockOptions{})
			for _, expectedSubaccount := range tc.expectedSubaccounts {
				require.Equal(
					t,
					expectedSubaccount,
					tApp.App.SubaccountsKeeper.GetSubaccount(ctx, *expectedSubaccount.Id),
				)
			}
		})
	}
}
