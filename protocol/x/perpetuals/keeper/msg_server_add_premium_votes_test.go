package keeper_test

import (
	"errors"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestMsgServerAddPremiumVotes(t *testing.T) {
	testMsg := constants.TestAddPremiumVotesMsg
	tests := map[string]struct {
		setupMocks  func(ctx sdk.Context, mck *mocks.PerpetualsKeeper)
		shouldPanic bool
		expectedErr string
	}{
		"Success": {
			setupMocks: func(ctx sdk.Context, mck *mocks.PerpetualsKeeper) {
				mck.On("AddPremiumVotes", mock.Anything, testMsg.Votes).Return(nil)
				mck.On("PerformStatefulPremiumVotesValidation", mock.Anything, testMsg).Return(nil)
			},
			shouldPanic: false,
		},
		"Panics when stateful validations fail": {
			setupMocks: func(ctx sdk.Context, mck *mocks.PerpetualsKeeper) {
				mck.On("PerformStatefulPremiumVotesValidation", mock.Anything, testMsg).Return(
					errors.New("failed"),
				)
			},
			shouldPanic: true,
			expectedErr: "PerformStatefulPremiumVotesValidation failed, err = failed",
		},
		"Panics when AddPremiumVotes fail": {
			setupMocks: func(ctx sdk.Context, mck *mocks.PerpetualsKeeper) {
				mck.On("PerformStatefulPremiumVotesValidation", mock.Anything, testMsg).Return(nil)
				mck.On("AddPremiumVotes", mock.Anything, testMsg.Votes).Return(errors.New("failed"))
			},
			shouldPanic: true,
			expectedErr: "AddPremiumVotes failed, err = failed",
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Initialize Mocks and Context.
			mockKeeper := &mocks.PerpetualsKeeper{}
			memClob := &mocks.MemClob{}
			memClob.On("SetClobKeeper", mock.Anything).Return()

			mockIndexerEventManager := &mocks.IndexerEventManager{}

			pc := keepertest.NewClobKeepersTestContext(t, memClob, &mocks.BankKeeper{}, mockIndexerEventManager, nil)
			tc.setupMocks(pc.Ctx, mockKeeper)

			msgServer := keeper.NewMsgServerImpl(mockKeeper)

			if tc.shouldPanic {
				require.PanicsWithValue(t, tc.expectedErr, func() {
					//nolint:errcheck
					msgServer.AddPremiumVotes(pc.Ctx, testMsg)
				})
			} else {
				resp, err := msgServer.AddPremiumVotes(pc.Ctx, testMsg)
				require.NoError(t, err)
				require.NotNil(t, resp)
			}

			// Assert mock expectations.
			result := mockKeeper.AssertExpectations(t)
			require.True(t, result)
		})
	}
}
