package keeper

import (
	"context"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var _ types.QueryServer = Keeper{}

func (k Keeper) PreviousBlockInfo(
	c context.Context,
	req *types.QueryPreviousBlockInfoRequest,
) (
	*types.QueryPreviousBlockInfoResponse,
	error,
) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := lib.UnwrapSDKContext(c, types.ModuleName)
	info, exists := k.GetPreviousBlockInfo(ctx)
	if !exists {
		return nil, status.Error(codes.NotFound, "previous block info not found")
	}
	return &types.QueryPreviousBlockInfoResponse{
		Info: &info,
	}, nil
}
