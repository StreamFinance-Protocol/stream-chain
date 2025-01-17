package perpetuals_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/nullify"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := constants.Perpetuals_DefaultGenesisState

	memClob := &mocks.MemClob{}
	memClob.On("SetClobKeeper", mock.Anything).Return()

	mockIndexerEventManager := &mocks.IndexerEventManager{}

	pc := keepertest.NewClobKeepersTestContext(t, memClob, &mocks.BankKeeper{}, mockIndexerEventManager, nil)
	perpetuals.InitGenesis(pc.Ctx, *pc.PerpetualsKeeper, genesisState)
	assertLiquidityTierUpsertEventsInIndexerBlock(t, pc.PerpetualsKeeper, pc.Ctx, genesisState.LiquidityTiers)
	got := perpetuals.ExportGenesis(pc.Ctx, *pc.PerpetualsKeeper)
	require.NotNil(t, got)

	nullify.Fill(&genesisState) //nolint:staticcheck
	nullify.Fill(got)           //nolint:staticcheck

	require.ElementsMatch(t, genesisState.Perpetuals, got.Perpetuals)
	require.Equal(t, genesisState.Params, got.Params)
}

func TestGenesis_Failure(t *testing.T) {
	tests := map[string]struct {
		marketId                                uint32
		ticker                                  string
		initialMarginPpm                        uint32
		maintenanceFractionPpm                  uint32
		impactNotional                          uint64
		fundingRateClampFactorPpm               uint32
		premiumVoteClampFactorPpm               uint32
		minNumVotesPerSample                    uint32
		collateralPoolId                        uint32
		maxCumulativeInsuranceFundDeltaPerBlock uint64
		multiCollateralAssets                   []uint32
		quoteAssetId                            uint32
	}{
		"MarketId doesn't reference a valid Market": {
			marketId:                                999,
			ticker:                                  "genesis_ticker",
			initialMarginPpm:                        0,
			maintenanceFractionPpm:                  0,
			impactNotional:                          1,
			fundingRateClampFactorPpm:               1,
			premiumVoteClampFactorPpm:               1,
			minNumVotesPerSample:                    0,
			collateralPoolId:                        0,
			maxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
			multiCollateralAssets:                   []uint32{0},
			quoteAssetId:                            0,
		},
		"Ticker is empty": {
			marketId:                                0,
			ticker:                                  "",
			initialMarginPpm:                        0,
			maintenanceFractionPpm:                  0,
			impactNotional:                          1,
			fundingRateClampFactorPpm:               1,
			premiumVoteClampFactorPpm:               1,
			minNumVotesPerSample:                    0,
			collateralPoolId:                        0,
			maxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
			multiCollateralAssets:                   []uint32{0},
			quoteAssetId:                            0,
		},
		"Initial Margin Ppm exceeds maximum": {
			marketId:                                0,
			ticker:                                  "genesis_ticker",
			initialMarginPpm:                        lib.OneMillion + 1,
			maintenanceFractionPpm:                  0,
			impactNotional:                          1,
			fundingRateClampFactorPpm:               1,
			premiumVoteClampFactorPpm:               1,
			minNumVotesPerSample:                    0,
			collateralPoolId:                        0,
			maxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
			multiCollateralAssets:                   []uint32{0},
			quoteAssetId:                            0,
		},
		"Maintenance Fraction Ppm exceeds maximum": {
			marketId:                                0,
			ticker:                                  "genesis_ticker",
			initialMarginPpm:                        0,
			maintenanceFractionPpm:                  lib.OneMillion + 1,
			impactNotional:                          1,
			fundingRateClampFactorPpm:               1,
			premiumVoteClampFactorPpm:               1,
			minNumVotesPerSample:                    0,
			collateralPoolId:                        0,
			maxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
			multiCollateralAssets:                   []uint32{0},
			quoteAssetId:                            0,
		},
		"Impact Notional is zero": {
			marketId:                                0,
			ticker:                                  "genesis_ticker",
			initialMarginPpm:                        0,
			maintenanceFractionPpm:                  lib.OneMillion + 1,
			impactNotional:                          0,
			fundingRateClampFactorPpm:               1,
			premiumVoteClampFactorPpm:               1,
			minNumVotesPerSample:                    0,
			collateralPoolId:                        0,
			maxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
			multiCollateralAssets:                   []uint32{0},
			quoteAssetId:                            0,
		},
		"Funding Rate Clamp Factor Ppm is zero": {
			marketId:                                0,
			ticker:                                  "genesis_ticker",
			initialMarginPpm:                        0,
			maintenanceFractionPpm:                  lib.OneMillion,
			impactNotional:                          1,
			fundingRateClampFactorPpm:               0,
			premiumVoteClampFactorPpm:               1,
			minNumVotesPerSample:                    0,
			collateralPoolId:                        0,
			maxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
			multiCollateralAssets:                   []uint32{0},
			quoteAssetId:                            0,
		},
		"Premium Vote Clamp Factor Ppm is zero": {
			marketId:                                0,
			ticker:                                  "genesis_ticker",
			initialMarginPpm:                        0,
			maintenanceFractionPpm:                  lib.OneMillion,
			impactNotional:                          1,
			fundingRateClampFactorPpm:               1,
			premiumVoteClampFactorPpm:               0,
			minNumVotesPerSample:                    0,
			collateralPoolId:                        0,
			maxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
			multiCollateralAssets:                   []uint32{0},
			quoteAssetId:                            0,
		},
	}

	// Test setup.
	memClob := &mocks.MemClob{}
	memClob.On("SetClobKeeper", mock.Anything).Return()

	mockIndexerEventManager := &mocks.IndexerEventManager{}

	pc := keepertest.NewClobKeepersTestContext(t, memClob, &mocks.BankKeeper{}, mockIndexerEventManager, nil)
	perpetuals.InitGenesis(pc.Ctx, *pc.PerpetualsKeeper, constants.Perpetuals_DefaultGenesisState)

	// Run tests.
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			genesisState := types.GenesisState{
				CollateralPools: []types.CollateralPool{
					{
						CollateralPoolId:                        tc.collateralPoolId,
						MaxCumulativeInsuranceFundDeltaPerBlock: tc.maxCumulativeInsuranceFundDeltaPerBlock,
						MultiCollateralAssets:                   &types.MultiCollateralAssetsArray{MultiCollateralAssets: tc.multiCollateralAssets},
						QuoteAssetId:                            tc.quoteAssetId,
					},
				},
				LiquidityTiers: []types.LiquidityTier{
					{
						Name:                   "",
						InitialMarginPpm:       tc.initialMarginPpm,
						MaintenanceFractionPpm: tc.maintenanceFractionPpm,
						ImpactNotional:         tc.impactNotional,
					},
				},
				Params: types.Params{
					FundingRateClampFactorPpm: tc.fundingRateClampFactorPpm,
					PremiumVoteClampFactorPpm: tc.premiumVoteClampFactorPpm,
				},
				Perpetuals: []types.Perpetual{
					{
						Params: types.PerpetualParams{
							MarketId:       tc.marketId,
							Ticker:         tc.ticker,
							LiquidityTier:  0,
							DangerIndexPpm: uint32(0),
						},
						FundingIndex:    dtypes.ZeroInt(),
						OpenInterest:    dtypes.ZeroInt(),
						LastFundingRate: dtypes.ZeroInt(),
					},
				},
			}

			require.Panics(t, func() {
				perpetuals.InitGenesis(pc.Ctx, *pc.PerpetualsKeeper, genesisState)
			})
		})
	}
}

// assertLiquidityTierUpsertEventsInIndexerBlock checks the liquidity tier upsert events
// included in the Indexer block kafka message.
func assertLiquidityTierUpsertEventsInIndexerBlock(
	t *testing.T,
	k *keeper.Keeper,
	ctx sdk.Context,
	liquidityTiers []types.LiquidityTier,
) {
	// Get LiquidityTierUpsertEvents from IndexerBlock
	liquidityTierUpsertEvents := keepertest.GetLiquidityTierUpsertEventsFromIndexerBlock(ctx, k)

	// Check if the length of the LiquidityTierUpsertEvents matches the expected length
	if len(liquidityTierUpsertEvents) != len(liquidityTiers) {
		t.Fatalf("Expected %d LiquidityTierUpsertEvents, but got %d", len(liquidityTiers), len(liquidityTierUpsertEvents))
	}

	// Loop through each event and check if each event matches the expected value
	for i, event := range liquidityTierUpsertEvents {
		if event.Id != liquidityTiers[i].Id {
			t.Fatalf(
				"Expected LiquidityTierUpsertEvent with Id %d, but got %d at index %d",
				liquidityTiers[i].Id,
				event.Id,
				i,
			)
		}

		if event.Name != liquidityTiers[i].Name {
			t.Fatalf(
				"Expected LiquidityTierUpsertEvent with Name %s, but got %s at index %d",
				liquidityTiers[i].Name,
				event.Name,
				i,
			)
		}

		if event.InitialMarginPpm != liquidityTiers[i].InitialMarginPpm {
			t.Fatalf(
				"Expected LiquidityTierUpsertEvent with InitialMarginPpm %d, but got %d at index %d",
				liquidityTiers[i].InitialMarginPpm,
				event.InitialMarginPpm,
				i,
			)
		}

		if event.MaintenanceFractionPpm != liquidityTiers[i].MaintenanceFractionPpm {
			t.Fatalf(
				"Expected LiquidityTierUpsertEvent with MaintenanceFractionPpm %d, but got %d at index %d",
				liquidityTiers[i].MaintenanceFractionPpm,
				event.MaintenanceFractionPpm,
				i,
			)
		}
	}
}
