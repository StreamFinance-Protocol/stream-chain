package types

import (
	"fmt"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
)

const (
	// Clamp factor for 8-hour funding rate is by default 600%.
	DefaultFundingRateClampFactorPpm = 6 * lib.OneMillion
	// Clamp factor for premium vote is by default 6_000%.
	DefaultPremiumVoteClampFactorPpm = 60 * lib.OneMillion
	// Minimum number of votes per sample is by default 15.
	DefaultMinNumVotesPerSample = 15

	// Maximum default funding rate magnitude is 100%.
	MaxDefaultFundingPpmAbs = lib.OneMillion

	// Liquidity-tier related constants
	MaxInitialMarginPpm       = lib.OneMillion
	MaxMaintenanceFractionPpm = lib.OneMillion
)

// DefaultGenesis returns the default Perpetual genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		CollateralPools: []CollateralPool{
			{
				CollateralPoolId:                        0,
				MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
				MultiCollateralAssets: &MultiCollateralAssetsArray{
					MultiCollateralAssets: []uint32{0},
				},
				QuoteAssetId: 0,
			},
			{
				CollateralPoolId:                        1,
				MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
				MultiCollateralAssets: &MultiCollateralAssetsArray{
					MultiCollateralAssets: []uint32{1},
				},
				QuoteAssetId: 1,
			},
			{
				CollateralPoolId:                        2,
				MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
				MultiCollateralAssets: &MultiCollateralAssetsArray{
					MultiCollateralAssets: []uint32{0},
				},
				QuoteAssetId: 0,
			},
		},
		Perpetuals:     []Perpetual{},
		LiquidityTiers: []LiquidityTier{},
		Params: Params{
			FundingRateClampFactorPpm: DefaultFundingRateClampFactorPpm,
			PremiumVoteClampFactorPpm: DefaultPremiumVoteClampFactorPpm,
			MinNumVotesPerSample:      DefaultMinNumVotesPerSample,
		},
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Validate parameters.
	if err := gs.Params.Validate(); err != nil {
		return err
	}

	// Validate perpetuals
	// 1. keys are unique
	// 2. IDs are sequential
	// 3. `Ticker` is non-empty
	perpKeyMap := make(map[uint32]struct{})
	expectedPerpId := uint32(0)

	for _, perp := range gs.Perpetuals {
		if _, exists := perpKeyMap[perp.Params.Id]; exists {
			return fmt.Errorf("duplicated perpetual id")
		}
		perpKeyMap[perp.Params.Id] = struct{}{}

		if perp.Params.Id != expectedPerpId {
			return fmt.Errorf("found a gap in perpetual id")
		}
		expectedPerpId = expectedPerpId + 1

		if len(perp.Params.Ticker) == 0 {
			return ErrTickerEmptyString
		}
	}

	// Validate liquidity tiers.
	// 1. keys are unique.
	// 2. IDs are sequential.
	// 3. initial margin does not exceed its max value.
	// 4. maintenance margin does not exceed its max value.
	// 5. base position notional is not zero.
	liquidityTierKeyMap := make(map[uint32]struct{})
	expectedLiquidityTierId := uint32(0)
	for _, liquidityTier := range gs.LiquidityTiers {
		if _, exists := liquidityTierKeyMap[liquidityTier.Id]; exists {
			return fmt.Errorf("duplicated liquidity tier id")
		}
		liquidityTierKeyMap[liquidityTier.Id] = struct{}{}

		if liquidityTier.Id != expectedLiquidityTierId {
			return fmt.Errorf("found a gap in liquidity tier id")
		}
		expectedLiquidityTierId = expectedLiquidityTierId + 1

		if err := liquidityTier.Validate(); err != nil {
			return err
		}
	}

	// Validate collateral pools.
	// 1. keys are unique.
	// 2. At least one collateral pool
	// 3. IDs are sequential and start from 0.
	// 4. max cumulative insurance fund delta per block is not zero.
	// 5. multi collateral assets is not empty and does not contain quote asset.

	if len(gs.CollateralPools) == 0 {
		return fmt.Errorf("at least one collateral pool is required")
	}

	collateralPoolKeyMap := make(map[uint32]struct{})
	expectedCollateralPoolId := uint32(0)
	for _, collateralPool := range gs.CollateralPools {
		if _, exists := collateralPoolKeyMap[collateralPool.CollateralPoolId]; exists {
			return fmt.Errorf("duplicated collateral pool id")
		}
		collateralPoolKeyMap[collateralPool.CollateralPoolId] = struct{}{}

		if collateralPool.CollateralPoolId != expectedCollateralPoolId {
			return fmt.Errorf("found a gap in collateral pool id")
		}
		expectedCollateralPoolId = expectedCollateralPoolId + 1

		if err := collateralPool.Validate(); err != nil {
			return err
		}
	}
	return nil
}
