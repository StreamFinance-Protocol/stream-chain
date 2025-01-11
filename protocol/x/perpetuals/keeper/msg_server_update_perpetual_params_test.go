package keeper_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	perptest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/perpetuals"
	pricestest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/prices"
	assetskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/keeper"
	perpkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	priceskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/keeper"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestUpdatePerpetualParams(t *testing.T) {
	testPerp := *perptest.GeneratePerpetual(
		perptest.WithId(1),
		perptest.WithMarketId(1),
		perptest.WithTicker("ETH-USD"),
		perptest.WithLiquidityTier(1),
		perptest.WithCollateralPoolId(0),
	)
	testMarket9999 := *pricestest.GenerateMarketParamPrice(pricestest.WithId(9999))

	tests := map[string]struct {
		setup             func(*testing.T, sdk.Context, *perpkeeper.Keeper, *priceskeeper.Keeper, *assetskeeper.Keeper)
		msg               *types.MsgUpdatePerpetualParams
		expectedPerpetual types.Perpetual
		expectedErr       string
	}{
		"Success: modify ticker and liquidity tier": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreatePerpetualMarkets(
					t,
					ctx,
					perpKeeper,
					[]types.Perpetual{testPerp},
				)
			},
			msg: &types.MsgUpdatePerpetualParams{
				Authority: lib.GovModuleAddress.String(),
				PerpetualParams: types.PerpetualParams{
					Id:                testPerp.Params.Id,
					Ticker:            "DUMMY-USD",
					MarketId:          testPerp.Params.MarketId,
					AtomicResolution:  testPerp.Params.AtomicResolution,
					DefaultFundingPpm: testPerp.Params.DefaultFundingPpm,
					LiquidityTier:     5,
				},
			},
		},
		"Success: modify all params except atomic resolution and collateral pool": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreatePerpetualMarkets(
					t,
					ctx,
					perpKeeper,
					[]types.Perpetual{testPerp},
				)
				keepertest.CreateTestPriceMarkets(t, ctx, pricesKeeper, []pricestypes.MarketParamPrice{testMarket9999})
			},
			msg: &types.MsgUpdatePerpetualParams{
				Authority: lib.GovModuleAddress.String(),
				PerpetualParams: types.PerpetualParams{
					Id:                testPerp.Params.Id,
					Ticker:            "PIKACHU-XXX",
					MarketId:          4,
					AtomicResolution:  testPerp.Params.AtomicResolution,
					DefaultFundingPpm: 2_007,
					LiquidityTier:     101,
					CollateralPoolId:  testPerp.Params.CollateralPoolId,
				},
			},
		},
		"Failure: updates a non-existing perpetual ID": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreatePerpetualMarkets(
					t,
					ctx,
					perpKeeper,
					[]types.Perpetual{testPerp},
				)
			},
			msg: &types.MsgUpdatePerpetualParams{
				Authority: lib.GovModuleAddress.String(),
				PerpetualParams: types.PerpetualParams{
					Id:                testPerp.Params.Id + 1,
					Ticker:            "DUMMY-USD",
					MarketId:          testPerp.Params.MarketId,
					AtomicResolution:  testPerp.Params.AtomicResolution,
					DefaultFundingPpm: testPerp.Params.DefaultFundingPpm,
					LiquidityTier:     5,
				},
			},
			expectedErr: "Perpetual does not exist",
		},
		"Failure: updates to non-existing market id": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreatePerpetualMarkets(
					t,
					ctx,
					perpKeeper,
					[]types.Perpetual{testPerp},
				)
			},
			msg: &types.MsgUpdatePerpetualParams{
				Authority: lib.GovModuleAddress.String(),
				PerpetualParams: types.PerpetualParams{
					Id:                testPerp.Params.Id,
					Ticker:            "DUMMY-USD",
					MarketId:          7,
					AtomicResolution:  testPerp.Params.AtomicResolution,
					DefaultFundingPpm: testPerp.Params.DefaultFundingPpm,
					LiquidityTier:     5,
				},
			},
			expectedErr: "Market price does not exist",
		},
		"Failure: updates to non-existing liquidity tier id": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreatePerpetualMarkets(
					t,
					ctx,
					perpKeeper,
					[]types.Perpetual{testPerp},
				)
				keepertest.CreateTestPriceMarkets(t, ctx, pricesKeeper, []pricestypes.MarketParamPrice{testMarket9999})
			},
			msg: &types.MsgUpdatePerpetualParams{
				Authority: lib.GovModuleAddress.String(),
				PerpetualParams: types.PerpetualParams{
					Id:                testPerp.Params.Id,
					Ticker:            "DUMMY-USD",
					MarketId:          4,
					AtomicResolution:  testPerp.Params.AtomicResolution,
					DefaultFundingPpm: testPerp.Params.DefaultFundingPpm,
					LiquidityTier:     9999,
				},
			},
			expectedErr: "Liquidity Tier does not exist",
		},
		"Failure: authority is not gov module": {
			setup: func(t *testing.T, ctx sdk.Context, perpKeeper *perpkeeper.Keeper, pricesKeeper *priceskeeper.Keeper, assetsKeeper *assetskeeper.Keeper) {
				keepertest.CreatePerpetualMarkets(
					t,
					ctx,
					perpKeeper,
					[]types.Perpetual{testPerp},
				)
				keepertest.CreateTestPriceMarkets(t, ctx, pricesKeeper, []pricestypes.MarketParamPrice{testMarket9999})
			},
			msg: &types.MsgUpdatePerpetualParams{
				Authority: constants.AliceAccAddress.String(),
				PerpetualParams: types.PerpetualParams{
					Id:                testPerp.Params.Id,
					Ticker:            "DUMMY-USD",
					MarketId:          4,
					AtomicResolution:  testPerp.Params.AtomicResolution,
					DefaultFundingPpm: testPerp.Params.DefaultFundingPpm,
					LiquidityTier:     5,
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
			tc.setup(t, pc.Ctx, pc.PerpetualsKeeper, pc.PricesKeeper, pc.AssetsKeeper)

			msgServer := perpkeeper.NewMsgServerImpl(pc.PerpetualsKeeper)

			_, err := msgServer.UpdatePerpetualParams(pc.Ctx, tc.msg)
			if tc.expectedErr != "" {
				require.ErrorContains(t, err, tc.expectedErr)
			} else {
				require.NoError(t, err)

				// Verify updated perpetual params in state.
				updatedPerpetualInState, err := pc.PerpetualsKeeper.GetPerpetual(pc.Ctx, tc.msg.PerpetualParams.Id)
				require.NoError(t, err)
				require.Equal(t, tc.msg.PerpetualParams.Ticker, updatedPerpetualInState.Params.Ticker)
				require.Equal(t, tc.msg.PerpetualParams.MarketId, updatedPerpetualInState.Params.MarketId)
				require.Equal(
					t,
					tc.msg.PerpetualParams.DefaultFundingPpm,
					updatedPerpetualInState.Params.DefaultFundingPpm,
				)
				require.Equal(t, tc.msg.PerpetualParams.LiquidityTier, updatedPerpetualInState.Params.LiquidityTier)
				require.Equal(
					t,
					tc.msg.PerpetualParams.AtomicResolution,
					updatedPerpetualInState.Params.AtomicResolution,
				)
				require.Equal(t, tc.msg.PerpetualParams.CollateralPoolId, updatedPerpetualInState.Params.CollateralPoolId)
			}
		})
	}
}
