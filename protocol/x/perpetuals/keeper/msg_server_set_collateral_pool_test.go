package keeper_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"

	cptest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/collateral_pool"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	perpkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestSetCollateralPool(t *testing.T) {
	testCp := *cptest.GenerateCollateralPool(
		cptest.WithCollateralPoolId(1),
		cptest.WithMaxCumulativeInsuranceFundDeltaPerBlock(1_000),
		cptest.WithIsolatedMarketMultiCollateralAssets([]uint32{0}),
		cptest.WithQuoteAssetId(0),
	)

	tests := map[string]struct {
		msg         *types.MsgSetCollateralPool
		expectedErr string
	}{
		"Success: update name and initial margin ppm": {
			msg: &types.MsgSetCollateralPool{
				Authority: lib.GovModuleAddress.String(),
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        testCp.CollateralPoolId,
					MaxCumulativeInsuranceFundDeltaPerBlock: 123_432,
					IsolatedMarketMultiCollateralAssets:     &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{1}},
					QuoteAssetId:                            1,
				},
			},
		},
		"Success: update all parameters": {
			msg: &types.MsgSetCollateralPool{
				Authority: lib.GovModuleAddress.String(),
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        testCp.CollateralPoolId,
					MaxCumulativeInsuranceFundDeltaPerBlock: 123_432,
					IsolatedMarketMultiCollateralAssets:     &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{1}},
					QuoteAssetId:                            1,
				},
			},
		},
		"Success: create a new liquidity tier": {
			msg: &types.MsgSetCollateralPool{
				Authority: lib.GovModuleAddress.String(),
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        testCp.CollateralPoolId + 1,
					MaxCumulativeInsuranceFundDeltaPerBlock: 123_432,
					IsolatedMarketMultiCollateralAssets:     &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{1}},
					QuoteAssetId:                            1,
				},
			},
		},
		"Failure: supported multi collateral assets must contains quote asset": {
			msg: &types.MsgSetCollateralPool{
				Authority: lib.GovModuleAddress.String(),
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        testCp.CollateralPoolId,
					MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_001,
					IsolatedMarketMultiCollateralAssets:     &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{1}},
					QuoteAssetId:                            0,
				},
			},
			expectedErr: "supported multi collateral assets must contains quote asset",
		},
		"Failure: supported multi collateral assets contains is empty": {
			msg: &types.MsgSetCollateralPool{
				Authority: lib.GovModuleAddress.String(),
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        testCp.CollateralPoolId,
					MaxCumulativeInsuranceFundDeltaPerBlock: 1_000_001,
					IsolatedMarketMultiCollateralAssets:     &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{}},
					QuoteAssetId:                            0,
				},
			},
			expectedErr: "supported multi collateral assets must not be empty",
		},
		"Failure: invalid authority": {
			msg: &types.MsgSetCollateralPool{
				Authority: constants.BobAccAddress.String(),
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        testCp.CollateralPoolId,
					MaxCumulativeInsuranceFundDeltaPerBlock: 123_432,
					IsolatedMarketMultiCollateralAssets:     &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{1}},
					QuoteAssetId:                            1,
				},
			},
			expectedErr: "invalid authority",
		},
		"Failure: empty authority": {
			msg: &types.MsgSetCollateralPool{
				Authority: "",
				CollateralPool: types.CollateralPool{
					CollateralPoolId:                        testCp.CollateralPoolId,
					MaxCumulativeInsuranceFundDeltaPerBlock: 123_432,
					IsolatedMarketMultiCollateralAssets:     &types.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{1}},
					QuoteAssetId:                            1,
				},
			},
			expectedErr: "invalid authority",
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			memClob := &mocks.MemClob{}
			memClob.On("SetClobKeeper", mock.Anything).Return()

			mockIndexerEventManager := &mocks.IndexerEventManager{}

			pc := keepertest.NewClobKeepersTestContext(t, memClob, &mocks.BankKeeper{}, mockIndexerEventManager, nil)
			initialCp, err := pc.PerpetualsKeeper.SetCollateralPool(
				pc.Ctx,
				testCp.CollateralPoolId,
				testCp.MaxCumulativeInsuranceFundDeltaPerBlock,
				testCp.IsolatedMarketMultiCollateralAssets,
				testCp.QuoteAssetId,
			)
			require.NoError(t, err)

			msgServer := perpkeeper.NewMsgServerImpl(pc.PerpetualsKeeper)

			_, err = msgServer.SetCollateralPool(pc.Ctx, tc.msg)
			if tc.expectedErr != "" {
				require.ErrorContains(t, err, tc.expectedErr)
				// Verify that collateral pool is same as before.
				cp, err := pc.PerpetualsKeeper.GetCollateralPool(pc.Ctx, tc.msg.CollateralPool.CollateralPoolId)
				require.NoError(t, err)
				require.Equal(t, initialCp, cp)
			} else {
				require.NoError(t, err)

				// Verify that collateral pool is updated.
				cp, err := pc.PerpetualsKeeper.GetCollateralPool(pc.Ctx, tc.msg.CollateralPool.CollateralPoolId)
				require.NoError(t, err)
				require.Equal(t, tc.msg.CollateralPool, cp)
			}
		})
	}
}
