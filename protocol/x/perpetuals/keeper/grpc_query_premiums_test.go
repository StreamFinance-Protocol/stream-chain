package keeper_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func TestPremiumVotes(t *testing.T) {
	memClob := &mocks.MemClob{}
	memClob.On("SetClobKeeper", mock.Anything).Return()

	mockIndexerEventManager := &mocks.IndexerEventManager{}

	pc := keepertest.NewClobKeepersTestContext(t, memClob, &mocks.BankKeeper{}, mockIndexerEventManager, nil)

	tests := map[string]struct {
		req         *types.QueryPremiumVotesRequest
		res         *types.QueryPremiumVotesResponse
		expectedErr error
	}{
		"nil request": {
			req:         nil,
			res:         nil,
			expectedErr: status.Error(codes.InvalidArgument, "invalid request"),
		},
		"valid request": {
			req: &types.QueryPremiumVotesRequest{},
			res: &types.QueryPremiumVotesResponse{
				PremiumVotes: types.PremiumStore{},
			},
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			res, err := pc.PerpetualsKeeper.PremiumVotes(pc.Ctx, tc.req)
			if tc.expectedErr != nil {
				require.ErrorIs(t, err, tc.expectedErr)
			} else {
				require.Equal(t, tc.res, res)
			}
		})
	}
}

func TestPremiumSamples(t *testing.T) {
	memClob := &mocks.MemClob{}
	memClob.On("SetClobKeeper", mock.Anything).Return()

	mockIndexerEventManager := &mocks.IndexerEventManager{}

	pc := keepertest.NewClobKeepersTestContext(t, memClob, &mocks.BankKeeper{}, mockIndexerEventManager, nil)

	tests := map[string]struct {
		req         *types.QueryPremiumSamplesRequest
		res         *types.QueryPremiumSamplesResponse
		expectedErr error
	}{
		"nil request": {
			req:         nil,
			res:         nil,
			expectedErr: status.Error(codes.InvalidArgument, "invalid request"),
		},
		"valid request": {
			req: &types.QueryPremiumSamplesRequest{},
			res: &types.QueryPremiumSamplesResponse{
				PremiumSamples: types.PremiumStore{},
			},
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			res, err := pc.PerpetualsKeeper.PremiumSamples(pc.Ctx, tc.req)
			if tc.expectedErr != nil {
				require.ErrorIs(t, err, tc.expectedErr)
			} else {
				require.Equal(t, tc.res, res)
			}
		})
	}
}
