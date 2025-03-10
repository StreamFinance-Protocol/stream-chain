package keeper_test

import (
	"math/big"
	"testing"

	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func TestGetSDAIPriceQuery(t *testing.T) {
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()
	k := tApp.App.RatelimitKeeper

	for name, tc := range map[string]struct {
		req *types.GetSDAIPriceQueryRequest
		res *types.GetSDAIPriceQueryResponse
		err error
	}{
		"Success": {
			req: &types.GetSDAIPriceQueryRequest{},
			res: &types.GetSDAIPriceQueryResponse{
				Price: "1",
			},
			err: nil,
		},
		"Nil": {
			req: nil,
			res: nil,
			err: status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(name, func(t *testing.T) {
			k.SetSDAIPrice(ctx, big.NewInt(1))
			res, err := k.GetSDAIPriceQuery(ctx, tc.req)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t, tc.res, res)
			}
		})
	}
}

func TestGetAssetYieldIndexQuery(t *testing.T) {
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()
	k := tApp.App.RatelimitKeeper

	for name, tc := range map[string]struct {
		req *types.GetAssetYieldIndexQueryRequest
		res *types.GetAssetYieldIndexQueryResponse
		err error
	}{
		"Success": {
			req: &types.GetAssetYieldIndexQueryRequest{},
			res: &types.GetAssetYieldIndexQueryResponse{
				AssetYieldIndex: "1/1",
			},
			err: nil,
		},
		"Invalid Request": {
			req: nil,
			res: nil,
			err: status.Error(codes.InvalidArgument, "invalid request"),
		},
		"AssetYieldIndex not found": {
			req: &types.GetAssetYieldIndexQueryRequest{},
			res: nil,
			err: status.Error(codes.NotFound, "asset yield index not found"),
		},
	} {
		t.Run(name, func(t *testing.T) {
			if !(tc.req != nil && tc.res == nil) {
				k.SetAssetYieldIndex(ctx, keeper.ConvertStringToBigRatWithPanicOnErr("1/1"))
			} else {
				store := ctx.KVStore(k.GetStoreKeyForTestingOnly())
				store.Delete([]byte(types.AssetYieldIndexPrefix))
			}
			res, err := k.GetAssetYieldIndexQuery(ctx, tc.req)
			if tc.err != nil {
				require.Error(t, err)
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t, tc.res, res)
			}
		})
	}
}
