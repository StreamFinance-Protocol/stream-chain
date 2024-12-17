package keeper_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"

	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	perptest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/perpetuals"
	assetskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/keeper"
	perpkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	priceskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestCreatePerpetual(t *testing.T) {
	testPerp1 := *perptest.GeneratePerpetual(
		perptest.WithId(1),
		perptest.WithMarketId(1),
	)
	testPerp2 := *perptest.GeneratePerpetual(
		perptest.WithId(2),
		perptest.WithMarketId(1),
	)
	testPerp3 := *perptest.GeneratePerpetual(
		perptest.WithId(3),
		perptest.WithMarketId(2),
		perptest.WithCollateralPoolId(0),
	)
	testPerpNonExistent := *perptest.GeneratePerpetual(
		perptest.WithId(9999),
		perptest.WithMarketId(9999),
	)

	testCases := map[string]struct {
		setup              func(*testing.T, sdk.Context, *perpkeeper.Keeper, *priceskeeper.Keeper, *assetskeeper.Keeper)
		msg                *types.MsgCreatePerpetual
		expectedPerpetuals []types.Perpetual
		expectedErr        string
	}{
		"Succeeds: create new perpetual (id = 1)": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreateTestLiquidityTiers(t, ctx, perpKeeper)
				keepertest.CreateTestCollateralPools(t, ctx, perpKeeper)
			},
			msg: &types.MsgCreatePerpetual{
				Authority: lib.GovModuleAddress.String(),
				Params:    testPerp1.Params,
			},
			expectedPerpetuals: []types.Perpetual{testPerp1},
		},
		"Succeeds: create new perpetual (id = 2), with existing perpetual (id = 1) which use same market id": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreatePerpetualMarkets(
					t,
					ctx,
					perpKeeper,
					[]types.Perpetual{testPerp1},
				)
			},
			msg: &types.MsgCreatePerpetual{
				Authority: lib.GovModuleAddress.String(),
				Params:    testPerp2.Params,
			},
			expectedPerpetuals: []types.Perpetual{testPerp1, testPerp2},
		},
		"Succeeds: create new perpetual": {
			setup: func(
				t *testing.T,
				ctx sdk.Context,
				perpKeeper *perpkeeper.Keeper,
				pricesKeeper *priceskeeper.Keeper,
				assetsKeeper *assetskeeper.Keeper,
			) {
				keepertest.CreateTestLiquidityTiers(t, ctx, perpKeeper)
				keepertest.CreateTestCollateralPools(t, ctx, perpKeeper)
			},
			msg: &types.MsgCreatePerpetual{
				Authority: lib.GovModuleAddress.String(),
				Params:    testPerp3.Params,
			},
			expectedPerpetuals: []types.Perpetual{testPerp3},
		},
		"Failure: new perpetual id already exists in state": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreatePerpetualMarkets(
					t,
					ctx,
					perpKeeper,
					[]types.Perpetual{testPerp1},
				)
			},
			msg: &types.MsgCreatePerpetual{
				Authority: lib.GovModuleAddress.String(),
				Params:    testPerp1.Params,
			},
			expectedPerpetuals: []types.Perpetual{testPerp1},
			expectedErr:        "Perpetual already exists",
		},
		"Failure: refers to non-existing market id": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreateTestLiquidityTiers(t, ctx, perpKeeper)
				keepertest.CreateTestCollateralPools(t, ctx, perpKeeper)
			},
			msg: &types.MsgCreatePerpetual{
				Authority: lib.GovModuleAddress.String(),
				Params:    testPerpNonExistent.Params,
			},
			expectedPerpetuals: nil,
			expectedErr:        "Market price does not exist",
		},
		"Failure: refers to non-existing collateral pool": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreateTestLiquidityTiers(t, ctx, perpKeeper)
			},
			msg: &types.MsgCreatePerpetual{
				Authority: lib.GovModuleAddress.String(),
				Params:    testPerp1.Params,
			},
			expectedPerpetuals: nil,
			expectedErr:        "collateral pool does not exist",
		},
		"Failure: invalid authority": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreatePerpetualMarkets(
					t,
					ctx,
					perpKeeper,
					[]types.Perpetual{testPerp1},
				)
			},
			msg: &types.MsgCreatePerpetual{
				Authority: "invalid",
				Params:    testPerp1.Params,
			},
			expectedPerpetuals: []types.Perpetual{testPerp1},
			expectedErr:        "invalid authority invalid",
		},
	}

	for name, tc := range testCases {
		t.Run(name, func(t *testing.T) {
			memClob := &mocks.MemClob{}
			memClob.On("SetClobKeeper", mock.Anything).Return()

			mockIndexerEventManager := &mocks.IndexerEventManager{}

			pc := keepertest.NewClobKeepersTestContext(t, memClob, &mocks.BankKeeper{}, mockIndexerEventManager, nil)
			tc.setup(t, pc.Ctx, pc.PerpetualsKeeper, pc.PricesKeeper, pc.AssetsKeeper)

			msgServer := perpkeeper.NewMsgServerImpl(pc.PerpetualsKeeper)

			_, err := msgServer.CreatePerpetual(pc.Ctx, tc.msg)
			if tc.expectedErr != "" {
				require.ErrorContains(t, err, tc.expectedErr)
			} else {
				require.NoError(t, err)
			}
			require.Equal(t, tc.expectedPerpetuals, pc.PerpetualsKeeper.GetAllPerpetuals(pc.Ctx))
		})
	}
}
