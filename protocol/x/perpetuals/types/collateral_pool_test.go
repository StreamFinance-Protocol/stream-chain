package types_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/stretchr/testify/require"
)

func TestCollateralPoolValidate(t *testing.T) {
	tests := map[string]struct {
		MaxCumulativeInsuranceFundDeltaPerBlock uint64
		multiCollateralAssets                   *types.MultiCollateralAssetsArray
		quoteAssetId                            uint32
		expectedError                           error
	}{
		"Validates successfully": {
			MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
			multiCollateralAssets: &types.MultiCollateralAssetsArray{
				MultiCollateralAssets: []uint32{2},
			},
			quoteAssetId:  2,
			expectedError: nil,
		},
		"Failure: Multi Collateral Assets has more than one asset": {
			MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
			multiCollateralAssets: &types.MultiCollateralAssetsArray{
				MultiCollateralAssets: []uint32{1, 2, 3},
			},
			quoteAssetId:  2,
			expectedError: types.ErrCollateralPoolMustHaveOnlyOneAsset,
		},
		"Failure: Max Cumulative Insurance Fund Delta Per Block is zero": {
			MaxCumulativeInsuranceFundDeltaPerBlock: 0,
			multiCollateralAssets: &types.MultiCollateralAssetsArray{
				MultiCollateralAssets: []uint32{2},
			},
			quoteAssetId:  2,
			expectedError: types.ErrMaxCumulativeInsuranceFundDeltaPerBlockZero,
		},
		"Failure: Multi Collateral Assets is empty": {
			MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
			multiCollateralAssets:                   &types.MultiCollateralAssetsArray{},
			quoteAssetId:                            2,
			expectedError:                           types.ErrMultiCollateralAssetsEmpty,
		},
		"Failure: Multi Collateral Asset Does Not Contain Quote Asset": {
			MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
			multiCollateralAssets:                   &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{1}},
			quoteAssetId:                            4,
			expectedError:                           types.ErrIsolatedMarketMultiCollateralAssetDoesNotContainQuoteAsset,
		},
	}

	// Run tests.
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			collateralPool := &types.CollateralPool{
				CollateralPoolId:                        1,
				MaxCumulativeInsuranceFundDeltaPerBlock: tc.MaxCumulativeInsuranceFundDeltaPerBlock,
				MultiCollateralAssets:                   tc.multiCollateralAssets,
				QuoteAssetId:                            tc.quoteAssetId,
			}

			err := collateralPool.Validate()
			if tc.expectedError != nil {
				require.Error(t, err)
				require.ErrorIs(t, err, tc.expectedError)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
