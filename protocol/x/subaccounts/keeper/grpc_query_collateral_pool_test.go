package keeper_test

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

func TestQueryCollateralPoolAddress(t *testing.T) {
	for testName, tc := range map[string]struct {
		// Parameters
		request *types.QueryCollateralPoolAddressRequest

		// Expectations
		response *types.QueryCollateralPoolAddressResponse
		err      error
	}{
		"Nil request results in error": {
			err: status.Error(codes.InvalidArgument, "invalid request"),
		},
		"Cross perpetual": {
			request: &types.QueryCollateralPoolAddressRequest{
				PerpetualId: constants.BtcUsd_NoMarginRequirement.Params.Id,
			},
			response: &types.QueryCollateralPoolAddressResponse{
				CollateralPoolAddress: types.CollateralPoolZeroAddress.String(),
			},
		},
		"Isolated perpetual": {
			request: &types.QueryCollateralPoolAddressRequest{
				PerpetualId: constants.IsoUsd_IsolatedMarket.Params.Id,
			},
			response: &types.QueryCollateralPoolAddressResponse{
				CollateralPoolAddress: types.CollateralPoolTwoAddress.String(),
			},
		},
		"Perpetual not found": {
			request: &types.QueryCollateralPoolAddressRequest{
				PerpetualId: uint32(1000),
			},
			err: status.Error(codes.NotFound, fmt.Sprintf(
				"Perpetual id %+v not found.",
				uint32(1000),
			)),
		},
	} {
		t.Run(testName, func(t *testing.T) {
			ctx, keeper, pricesKeeper, perpetualsKeeper, _, _, assetsKeeper, _, _, _ := keepertest.SubaccountsKeepers(t, true)
			prices.InitGenesis(ctx, *pricesKeeper, constants.Prices_DefaultGenesisState)
			assets.InitGenesis(ctx, *assetsKeeper, constants.Assets_DefaultGenesisState)
			keepertest.CreateNonDefaultTestMarkets(t, ctx, pricesKeeper)
			keepertest.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			keepertest.CreateTestCollateralPools(t, ctx, perpetualsKeeper)
			keepertest.CreateTestPerpetuals(t, ctx, perpetualsKeeper)
			response, err := keeper.CollateralPoolAddress(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t, tc.response, response)
			}
		})
	}
}
