package collateral_pool

import (
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
)

type CpModifierOption func(cp *perptypes.CollateralPool)

func WithCollateralPoolId(collateralPoolId uint32) CpModifierOption {
	return func(cp *perptypes.CollateralPool) {
		cp.CollateralPoolId = collateralPoolId
	}
}

func WithMaxCumulativeInsuranceFundDeltaPerBlock(maxCumulativeInsuranceFundDeltaPerBlock uint64) CpModifierOption {
	return func(cp *perptypes.CollateralPool) {
		cp.MaxCumulativeInsuranceFundDeltaPerBlock = maxCumulativeInsuranceFundDeltaPerBlock
	}
}

func WithMultiCollateralAssets(multiCollateralAssets []uint32) CpModifierOption {
	return func(cp *perptypes.CollateralPool) {
		cp.MultiCollateralAssets = &perptypes.MultiCollateralAssetsArray{MultiCollateralAssets: multiCollateralAssets}
	}
}

func WithQuoteAssetId(quoteAssetId uint32) CpModifierOption {
	return func(cp *perptypes.CollateralPool) {
		cp.QuoteAssetId = quoteAssetId
	}
}

// GenerateCollateralPool returns a `CollateralPool` object set to default values.
// Passing in `CpModifierOption` methods alters the value of the `CollateralPool` returned.
// It will start with the default, valid `CollateralPool` value defined within the method
// and make the requested modifications before returning the object.
//
// Example usage:
// `GenerateLiquidityTier(WithId(7))`
// This will start with the default `LiquidityTier` object defined within the method and
// return the newly-created object after overriding the values of `Id` to 7.
func GenerateCollateralPool(optionalModifications ...CpModifierOption) *perptypes.CollateralPool {
	cp := &perptypes.CollateralPool{
		CollateralPoolId:                        0,
		MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
		MultiCollateralAssets: &perptypes.MultiCollateralAssetsArray{
			MultiCollateralAssets: []uint32{0},
		},
		QuoteAssetId: 0,
	}

	for _, opt := range optionalModifications {
		opt(cp)
	}

	return cp
}
