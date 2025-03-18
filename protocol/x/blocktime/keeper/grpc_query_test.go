package keeper_test

import (
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime/types"
)

func TestPreviousBlockInfo(t *testing.T) {
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()
	k := tApp.App.BlockTimeKeeper
	info := &types.BlockInfo{
		Height:    1,
		Timestamp: time.Now().UTC(),
	}
	k.SetPreviousBlockInfo(ctx, info)

	for name, tc := range map[string]struct {
		req *types.QueryPreviousBlockInfoRequest
		res *types.QueryPreviousBlockInfoResponse
		err error
	}{
		"Success": {
			req: &types.QueryPreviousBlockInfoRequest{},
			res: &types.QueryPreviousBlockInfoResponse{
				Info: info,
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
			res, err := k.PreviousBlockInfo(ctx, tc.req)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t, tc.res, res)
			}
		})
	}
}
