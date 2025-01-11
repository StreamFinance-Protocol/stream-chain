package types_test

import (
	"testing"

	types "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/stretchr/testify/require"
)

func TestMsgSetCollateralPool_ValidateBasic(t *testing.T) {
	tests := map[string]struct {
		msg         types.MsgSetCollateralPool
		expectedErr string
	}{
		"Success": {
			msg: types.MsgSetCollateralPool{
				Authority: validAuthority,
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        1,
					MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
					MultiCollateralAssets:                   &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{2}},
					QuoteAssetId:                            2,
				},
			},
		},
		"Failure: Invalid authority": {
			msg: types.MsgSetCollateralPool{
				Authority: "",
			},
			expectedErr: "Authority is invalid",
		},
		"Failure: Max Cumulative Insurance Fund Delta Per Block is zero": {
			msg: types.MsgSetCollateralPool{
				Authority: validAuthority,
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        1,
					MaxCumulativeInsuranceFundDeltaPerBlock: 0,
					MultiCollateralAssets:                   &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{2}},
					QuoteAssetId:                            2,
				},
			},
			expectedErr: types.ErrMaxCumulativeInsuranceFundDeltaPerBlockZero.Error(),
		},
		"Failure: Multi Collateral Assets is empty": {
			msg: types.MsgSetCollateralPool{
				Authority: validAuthority,
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        1,
					MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
					MultiCollateralAssets:                   &types.MultiCollateralAssetsArray{},
					QuoteAssetId:                            2,
				},
			},
			expectedErr: types.ErrMultiCollateralAssetsEmpty.Error(),
		},
		"Failure: Multi Collateral Asset Does Not Contain Quote Asset": {
			msg: types.MsgSetCollateralPool{
				Authority: validAuthority,
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        1,
					MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
					MultiCollateralAssets:                   &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{1}},
					QuoteAssetId:                            4,
				},
			},
			expectedErr: types.ErrIsolatedMarketMultiCollateralAssetDoesNotContainQuoteAsset.Error(),
		},
		"Failure: Multi Collateral Asset contains more than one asset": {
			msg: types.MsgSetCollateralPool{
				Authority: validAuthority,
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        1,
					MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_000_000_000,
					MultiCollateralAssets:                   &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{1, 2, 3}},
					QuoteAssetId:                            1,
				},
			},
			expectedErr: types.ErrCollateralPoolMustHaveOnlyOneAsset.Error(),
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			err := tc.msg.ValidateBasic()
			if tc.expectedErr == "" {
				require.NoError(t, err)
			} else {
				require.ErrorContains(t, err, tc.expectedErr)
			}
		})
	}
}
