package keeper_test

import (
	"testing"
	"time"

	sdkmath "cosmossdk.io/math"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	sdktypes "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func TestSendWithdrawalEventsToEventManager(t *testing.T) {
	tests := map[string]struct {
		initialEvents  []types.BridgeEvent
		expectedEvents []types.BridgeEvent
		expectedError  string
	}{
		"successfully sends empty list": {
			initialEvents:  []types.BridgeEvent{},
			expectedEvents: []types.BridgeEvent{},
			expectedError:  "",
		},
		"successfully sends single event": {
			initialEvents: []types.BridgeEvent{
				{
					Id:          1,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
					Address:     "0x1234567890123456789012345678901234567890",
					BlockHeight: 100,
					IsDeposit:   false,
				},
			},
			expectedEvents: []types.BridgeEvent{
				{
					Id:          1,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
					Address:     "0x1234567890123456789012345678901234567890",
					BlockHeight: 100,
					IsDeposit:   false,
				},
			},
			expectedError: "",
		},
		"successfully sends multiple events": {
			initialEvents: []types.BridgeEvent{
				{
					Id:          1,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
					Address:     "0x1234567890123456789012345678901234567890",
					BlockHeight: 100,
					IsDeposit:   false,
				},
				{
					Id:          2,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(2000000)),
					Address:     "0x2234567890123456789012345678901234567890",
					BlockHeight: 101,
					IsDeposit:   false,
				},
			},
			expectedEvents: []types.BridgeEvent{
				{
					Id:          1,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
					Address:     "0x1234567890123456789012345678901234567890",
					BlockHeight: 100,
					IsDeposit:   false,
				},
				{
					Id:          2,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(2000000)),
					Address:     "0x2234567890123456789012345678901234567890",
					BlockHeight: 101,
					IsDeposit:   false,
				},
			},
			expectedError: "",
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ks := keepertest.BridgeKeepers(t)

			if len(tc.initialEvents) > 0 {
				ks.BridgeKeeper.SetBridgeWithdrawalEvents(ks.Ctx, tc.initialEvents)
			}

			ks.MockTimeProvider.On("Now").Return(time.Now()).Once()
			err := ks.BridgeKeeper.SendWithdrawalEventsToEventManager(ks.Ctx)

			if tc.expectedError != "" {
				require.EqualError(t, err, tc.expectedError)
			} else {
				require.NoError(t, err)

				for _, expectedEvent := range tc.expectedEvents {
					ks.MockTimeProvider.On("Now").Return(time.Now()).Once()
					event, _, found := ks.BridgeEventManager.GetBridgeEventById(
						expectedEvent.Id,
						false,
					)
					require.True(t, found)
					require.Equal(t, expectedEvent, event)
				}
			}
		})
	}
}

func TestAddBridgeWithdrawalEvent(t *testing.T) {
	tests := map[string]struct {
		initialEvents  []types.BridgeEvent
		eventToAdd     types.BridgeEvent
		expectedEvents []types.BridgeEvent
		expectedError  string
	}{
		"successfully adds withdrawal event to empty list": {
			initialEvents: []types.BridgeEvent{},
			eventToAdd: types.BridgeEvent{
				Id:          1,
				Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
				Address:     "0x1234567890123456789012345678901234567890",
				BlockHeight: 100,
				IsDeposit:   false,
			},
			expectedEvents: []types.BridgeEvent{
				{
					Id:          1,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
					Address:     "0x1234567890123456789012345678901234567890",
					BlockHeight: 100,
					IsDeposit:   false,
				},
			},
			expectedError: "",
		},
		"fails to add deposit event": {
			initialEvents: []types.BridgeEvent{},
			eventToAdd: types.BridgeEvent{
				Id:          1,
				Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
				Address:     "0x1234567890123456789012345678901234567890",
				BlockHeight: 100,
				IsDeposit:   true,
			},
			expectedEvents: []types.BridgeEvent{},
			expectedError:  "attempting to add deposit event to withdrawal event store",
		},
		"successfully adds to existing events": {
			initialEvents: []types.BridgeEvent{
				{
					Id:          1,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
					Address:     "0x1234567890123456789012345678901234567890",
					BlockHeight: 100,
					IsDeposit:   false,
				},
			},
			eventToAdd: types.BridgeEvent{
				Id:          2,
				Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(2000000)),
				Address:     "0x2234567890123456789012345678901234567890",
				BlockHeight: 101,
				IsDeposit:   false,
			},
			expectedEvents: []types.BridgeEvent{
				{
					Id:          1,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
					Address:     "0x1234567890123456789012345678901234567890",
					BlockHeight: 100,
					IsDeposit:   false,
				},
				{
					Id:          2,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(2000000)),
					Address:     "0x2234567890123456789012345678901234567890",
					BlockHeight: 101,
					IsDeposit:   false,
				},
			},
			expectedError: "",
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Setup keeper state
			ks := keepertest.BridgeKeepers(t)

			if len(tc.initialEvents) > 0 {
				ks.BridgeKeeper.SetBridgeWithdrawalEvents(ks.Ctx, tc.initialEvents)
			}

			err := ks.BridgeKeeper.AddBridgeWithdrawalEvent(ks.Ctx, tc.eventToAdd)

			if tc.expectedError != "" {
				require.EqualError(t, err, tc.expectedError)
			} else {
				require.NoError(t, err)
				events := ks.BridgeKeeper.GetBridgeWithdrawalEvents(ks.Ctx)
				require.Equal(t, tc.expectedEvents, events)
			}
		})
	}
}

func TestGetAndSetBridgeWithdrawalEvents(t *testing.T) {
	tests := map[string]struct {
		existingEvents []types.BridgeEvent
		expectedEvents []types.BridgeEvent
	}{
		"returns empty list when no events exist": {
			existingEvents: []types.BridgeEvent{},
			expectedEvents: []types.BridgeEvent{},
		},
		"returns single withdrawal event": {
			existingEvents: []types.BridgeEvent{
				{
					Id:          1,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
					Address:     "0x1234567890123456789012345678901234567890",
					BlockHeight: 100,
					IsDeposit:   false,
				},
			},
			expectedEvents: []types.BridgeEvent{
				{
					Id:          1,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
					Address:     "0x1234567890123456789012345678901234567890",
					BlockHeight: 100,
					IsDeposit:   false,
				},
			},
		},
		"returns multiple withdrawal events": {
			existingEvents: []types.BridgeEvent{
				{
					Id:          1,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
					Address:     "0x1234567890123456789012345678901234567890",
					BlockHeight: 100,
					IsDeposit:   false,
				},
				{
					Id:          2,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(2000000)),
					Address:     "0x2234567890123456789012345678901234567890",
					BlockHeight: 101,
					IsDeposit:   false,
				},
			},
			expectedEvents: []types.BridgeEvent{
				{
					Id:          1,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(1000000)),
					Address:     "0x1234567890123456789012345678901234567890",
					BlockHeight: 100,
					IsDeposit:   false,
				},
				{
					Id:          2,
					Coin:        sdktypes.NewCoin("sdai", sdkmath.NewInt(2000000)),
					Address:     "0x2234567890123456789012345678901234567890",
					BlockHeight: 101,
					IsDeposit:   false,
				},
			},
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ks := keepertest.BridgeKeepers(t)

			if len(tc.existingEvents) > 0 {
				eventList := &types.BridgeEventList{
					Events: tc.existingEvents,
				}
				ks.BridgeKeeper.SetBridgeWithdrawalEvents(ks.Ctx, eventList.Events)
			}
			events := ks.BridgeKeeper.GetBridgeWithdrawalEvents(ks.Ctx)
			require.Equal(t, tc.expectedEvents, events)
		})
	}
}

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
