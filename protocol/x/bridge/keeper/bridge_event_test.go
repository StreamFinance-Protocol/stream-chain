package keeper_test

import (
	"testing"
	"time"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	"github.com/stretchr/testify/require"
)

func TestGetBridgeEventFromServer(t *testing.T) {
	tests := map[string]struct {
		// Bridge event to add to server.
		bridgeEvent types.BridgeEvent
		// Bridge event ID to query.
		bridgeEventId uint32

		// Expected response.
		expectedEvent types.BridgeEvent
		expectedFound bool
	}{
		"Event found": {
			bridgeEvent:   constants.BridgeDepositEvent_Id0_Height0,
			bridgeEventId: 0,
			expectedEvent: constants.BridgeDepositEvent_Id0_Height0,
			expectedFound: true,
		},
		"Event not found": {
			bridgeEvent:   constants.BridgeDepositEvent_Id0_Height0,
			bridgeEventId: 1,
			expectedFound: false,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Initialize context, keeper, and bridgeEventManager.
			ks := keepertest.BridgeKeepers(t)
			ks.MockTimeProvider.On("Now").Return(time.Now())
			err := ks.BridgeEventManager.AddBridgeEvents([]types.BridgeEvent{tc.bridgeEvent})
			require.NoError(t, err)

			// Complete bridge.
			event, found := ks.BridgeKeeper.GetBridgeEventFromServer(ks.Ctx, tc.bridgeEventId)

			// Assert expectations.
			require.Equal(t, tc.expectedEvent, event)
			require.Equal(t, tc.expectedFound, found)
		})
	}
}
