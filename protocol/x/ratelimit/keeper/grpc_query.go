package keeper

import (
	"context"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var _ types.QueryServer = Keeper{}

func (k Keeper) GetSDAIPriceQuery(
	ctx context.Context,
	req *types.GetSDAIPriceQueryRequest,
) (*types.GetSDAIPriceQueryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	sdkCtx := sdk.UnwrapSDKContext(ctx)

	price, found := k.GetSDAIPrice(sdkCtx)
	if !found {
		return nil, status.Error(codes.NotFound, "sDAI price not found")
	}

	return &types.GetSDAIPriceQueryResponse{
		Price: price.String(),
	}, nil
}

func (k Keeper) GetAssetYieldIndexQuery(
	ctx context.Context,
	req *types.GetAssetYieldIndexQueryRequest,
) (*types.GetAssetYieldIndexQueryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	sdkCtx := sdk.UnwrapSDKContext(ctx)

	assetYieldIndex, found := k.GetAssetYieldIndex(sdkCtx)
	if !found {
		return nil, status.Error(codes.NotFound, "asset yield index not found")
	}

	return &types.GetAssetYieldIndexQueryResponse{
		AssetYieldIndex: assetYieldIndex.String(),
	}, nil
}
