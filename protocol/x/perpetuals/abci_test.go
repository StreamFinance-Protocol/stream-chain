package perpetuals_test

import (
	"errors"
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestEndBlocker(t *testing.T) {
	testError := errors.New("error")

	tests := map[string]struct {
		setupMocks  func(ctx sdk.Context, mck *mocks.PerpetualsKeeper)
		expectedErr error
	}{
		"Success": {
			setupMocks: func(ctx sdk.Context, mck *mocks.PerpetualsKeeper) {
				mck.On(
					"MaybeProcessNewFundingTickEpoch",
					ctx,
				).Return(nil)
				mck.On(
					"MaybeProcessNewFundingSampleEpoch",
					ctx,
				).Return(nil)
				mck.On(
					"SendOIUpdatesToIndexer",
					ctx,
				)
			},
			expectedErr: nil,
		},
		"MaybeProcessNewFundingTickEpoch Error": {
			setupMocks: func(ctx sdk.Context, mck *mocks.PerpetualsKeeper) {
				mck.On(
					"MaybeProcessNewFundingSampleEpoch",
					ctx,
				).Return(nil)
				mck.On(
					"MaybeProcessNewFundingTickEpoch",
					ctx,
				).Panic(testError.Error())
			},
			expectedErr: testError,
		},
		"MaybeProcessNewFundingSampleEpoch Error": {
			setupMocks: func(ctx sdk.Context, mck *mocks.PerpetualsKeeper) {
				mck.On(
					"MaybeProcessNewFundingSampleEpoch",
					ctx,
				).Panic(testError.Error())
				mck.On(
					"MaybeProcessNewFundingTickEpoch",
					ctx,
				).Return(nil)
			},
			expectedErr: testError,
		},
	}

	// Run tests.
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Initialize Mocks and Context.
			mockKeeper := &mocks.PerpetualsKeeper{}
			memClob := &mocks.MemClob{}
			memClob.On("SetClobKeeper", mock.Anything).Return()

			mockIndexerEventManager := &mocks.IndexerEventManager{}

			ks := keepertest.NewClobKeepersTestContext(t, memClob, &mocks.BankKeeper{}, mockIndexerEventManager, nil)

			// Setup mocks.
			tc.setupMocks(ks.Ctx, mockKeeper)

			if tc.expectedErr != nil {
				// Call EndBlocker.
				require.PanicsWithValue(t, tc.expectedErr.Error(), func() {
					//nolint:errcheck
					perpetuals.EndBlocker(ks.Ctx, mockKeeper)
				})
			} else {
				perpetuals.EndBlocker(ks.Ctx, mockKeeper)

				// Assert mock expectations if no error was expected.
				result := mockKeeper.AssertExpectations(t)
				require.True(t, result)
			}
		})
	}
}
