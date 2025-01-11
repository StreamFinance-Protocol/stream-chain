package keeper

import (
	"context"

	"cosmossdk.io/store/prefix"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) AllCollateralPools(
	c context.Context,
	req *types.QueryAllCollateralPoolsRequest,
) (*types.QueryAllCollateralPoolsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := lib.UnwrapSDKContext(c, types.ModuleName)

	var collateralPools []types.CollateralPool

	store := ctx.KVStore(k.storeKey)
	collateralPoolStore := prefix.NewStore(store, []byte(types.CollateralPoolKeyPrefix))

	pageRes, err := query.Paginate(collateralPoolStore, req.Pagination, func(key []byte, value []byte) error {
		var collateralPool types.CollateralPool
		if err := k.cdc.Unmarshal(value, &collateralPool); err != nil {
			return err
		}

		collateralPools = append(collateralPools, collateralPool)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllCollateralPoolsResponse{
		CollateralPools: collateralPools,
		Pagination:      pageRes,
	}, nil
}
