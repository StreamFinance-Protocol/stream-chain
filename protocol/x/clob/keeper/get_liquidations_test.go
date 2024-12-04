package keeper_test

import (
	"math/big"
	"testing"

	sdkmath "cosmossdk.io/math"
	sdaiservertypes "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/sdaioracle"
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
	tests := map[string]struct {
		subaccount                  satypes.Subaccount
		perpetuals                  []perptypes.Perpetual
		feeParams                   feetiertypes.PerpetualFeeParams
		expectedIsLiquidatable      bool
		expectedHasNegativeTnc      bool
		expectedLiquidationPriority *big.Float
		expectedError               error
	}{
		`No perp found returns error`: {
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
				require.Equal(t, tc.expectedLiquidationPriority, liquidationPriority)
			}
		})
	}
}
