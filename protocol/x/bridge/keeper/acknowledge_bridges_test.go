package keeper_test

import (
	"errors"
	"testing"
	"time"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestAcknowledgeBridges(t *testing.T) {
	tests := map[string]struct {
		/* --- Setup --- */
		// Bridge events to acknowledge.
		bridgeEvents []types.BridgeEvent
		// Whether bridging is disabled.
		bridgingDisabled bool
		// Error responses of mock delayMsgKeeper.
		delayMsgErrors []error

		/* --- Expectations --- */
		// Expected AcknowledgedEventInfo.
		expectedAEI types.BridgeEventInfo
		// Expected error.
		expectedError string
	}{
		"Success: no events": {
			bridgeEvents: []types.BridgeEvent{},
			expectedAEI: types.BridgeEventInfo{
				NextDepositId:  0,
				EthBlockHeight: 0,
			},
		},
		"Success: 1 event": {
			bridgeEvents: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id55_Height15,
			},
			delayMsgErrors: []error{nil},
			expectedAEI: types.BridgeEventInfo{
				NextDepositId:  56,
				EthBlockHeight: 15,
			},
		},
		"Success: 2 events": {
			bridgeEvents: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id0_Height0,
				constants.BridgeDepositEvent_Id1_Height0,
			},
			delayMsgErrors: []error{nil, nil},
			expectedAEI: types.BridgeEventInfo{
				NextDepositId:  2,
				EthBlockHeight: 0,
			},
		},
		"Error: bridging disabled": {
			bridgeEvents: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id55_Height15,
			},
			delayMsgErrors:   []error{nil},
			bridgingDisabled: true,
			expectedError:    types.ErrBridgingDisabled.Error(),
		},
		"Error: 2 events, delaying second msg returns error": {
			bridgeEvents: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id0_Height0,
				constants.BridgeDepositEvent_Id1_Height0,
			},
			delayMsgErrors: []error{nil, errors.New("failed to delay message 1")},
			expectedError:  "failed to delay message 1",
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Initialize context, keeper, and mockDelayMsgKeeper.
			ks := keepertest.BridgeKeepers(t)
			err := ks.BridgeKeeper.UpdateSafetyParams(ks.Ctx, types.SafetyParams{
				IsDisabled:  tc.bridgingDisabled,
				DelayBlocks: ks.BridgeKeeper.GetSafetyParams(ks.Ctx).DelayBlocks,
			})
			require.NoError(t, err)
			for i := range tc.bridgeEvents {
				ks.MockDelayMsgKeeper.On(
					"DelayMessageByBlocks",
					ks.Ctx,
					mock.Anything,
					mock.Anything,
				).Return(uint32(i), tc.delayMsgErrors[i]).Once()
			}
			initialAei := ks.BridgeKeeper.GetAcknowledgedEventInfo(ks.Ctx)

			// Invoke AcknowledgeBridges.
			err = ks.BridgeKeeper.AcknowledgeBridges(ks.Ctx, tc.bridgeEvents)

			if tc.expectedError != "" {
				// Verify that error is as expected.
				require.ErrorContains(t, err, tc.expectedError)

				// Verify that AcknowledgedEventInfo was not updated.
				require.Equal(t, initialAei, ks.BridgeKeeper.GetAcknowledgedEventInfo(ks.Ctx))

				if tc.bridgingDisabled {
					// Verify that no messages were delayed.
					ks.MockDelayMsgKeeper.AssertNotCalled(t, "DelayMessageByBlocks")
				}
			} else {
				// Verify that AcknowledgeBridges returns no error.
				require.NoError(t, err)

				// Verify that AcknowledgedEventInfo is updated in state.
				aei := ks.BridgeKeeper.GetAcknowledgedEventInfo(ks.Ctx)
				require.Equal(t, tc.expectedAEI, aei)

				// Assert mock expectations.
				ks.MockDelayMsgKeeper.AssertExpectations(t)
			}
		})
	}
}

func TestGetAcknowledgeBridges(t *testing.T) {
	timeNow := time.Now()

	tests := map[string]struct {
		// Setup.
		blockTimestamp        time.Time
		eventTimestamp        time.Time
		proposeParams         types.ProposeParams
		bridgeEventsToAdd     []types.BridgeEvent
		acknowledgedEventInfo types.BridgeEventInfo
		bridgingDisabled      bool

		// Expectations.
		expectedMsg *types.MsgAcknowledgeBridges
	}{
		"Empty events due to probabilistic skipping": {
			blockTimestamp: timeNow,
			eventTimestamp: timeNow.Add(-time.Second * 2),
			proposeParams: types.ProposeParams{
				// 100% skip rate.
				SkipRatePpm: uint32(constants.OneMillion),
				// propose events recognized at least one second ago.
				ProposeDelayDuration: time.Second,
			},
			bridgeEventsToAdd: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id0_Height0,
				constants.BridgeDepositEvent_Id1_Height0,
			},
			expectedMsg: &types.MsgAcknowledgeBridges{
				Events: []types.BridgeEvent{},
			},
		},
		"Empty events due to deterministic skipping": {
			// Skip proposing bridge events as blockTimestamp <= timeNow - SkipIfBlockDelayedByDuration.
			blockTimestamp: timeNow.Add(-time.Second),
			proposeParams: types.ProposeParams{
				SkipRatePpm:                  0, // do not skip based on pseudo-randomness.
				SkipIfBlockDelayedByDuration: time.Second,
			},
			bridgeEventsToAdd: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id0_Height0,
				constants.BridgeDepositEvent_Id1_Height0,
			},
			expectedMsg: &types.MsgAcknowledgeBridges{
				Events: []types.BridgeEvent{},
			},
		},
		"More than MaxBridgesPerBlock events recognized": {
			blockTimestamp: timeNow,
			eventTimestamp: timeNow.Add(-time.Second * 2),
			proposeParams: types.ProposeParams{
				SkipRatePpm:                  0,           // do not skip based on pseudo-randomness.
				SkipIfBlockDelayedByDuration: time.Second, // do not skip based on time.
				MaxBridgesPerBlock:           3,           // propose up to 3 events per block.
				ProposeDelayDuration:         time.Second, // propose events recognized at least one second ago.
			},
			bridgeEventsToAdd: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id0_Height0,
				constants.BridgeDepositEvent_Id1_Height0,
				constants.BridgeDepositEvent_Id2_Height1,
				constants.BridgeDepositEvent_Id3_Height3, // this event should not be proposed.
			},
			expectedMsg: &types.MsgAcknowledgeBridges{
				Events: []types.BridgeEvent{
					constants.BridgeDepositEvent_Id0_Height0,
					constants.BridgeDepositEvent_Id1_Height0,
					constants.BridgeDepositEvent_Id2_Height1,
				},
			},
		},
		"MaxBridgesPerBlock events recognized": {
			blockTimestamp: timeNow,
			eventTimestamp: timeNow.Add(-time.Second * 2),
			proposeParams: types.ProposeParams{
				SkipRatePpm:                  0,           // do not skip based on pseudo-randomness.
				SkipIfBlockDelayedByDuration: time.Second, // do not skip based on time.
				MaxBridgesPerBlock:           3,           // propose up to 3 events per block.
				ProposeDelayDuration:         time.Second, // propose events recognized at least one second ago.
			},
			bridgeEventsToAdd: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id0_Height0,
				constants.BridgeDepositEvent_Id1_Height0,
				constants.BridgeDepositEvent_Id2_Height1,
			},
			expectedMsg: &types.MsgAcknowledgeBridges{
				Events: []types.BridgeEvent{
					constants.BridgeDepositEvent_Id0_Height0,
					constants.BridgeDepositEvent_Id1_Height0,
					constants.BridgeDepositEvent_Id2_Height1,
				},
			},
		},
		"Fewer than MaxBridgesPerBlock events recognized": {
			blockTimestamp: timeNow,
			eventTimestamp: timeNow.Add(-time.Second * 2),
			proposeParams: types.ProposeParams{
				SkipRatePpm:                  0,           // do not skip based on pseudo-randomness.
				SkipIfBlockDelayedByDuration: time.Second, // do not skip based on time.
				MaxBridgesPerBlock:           3,           // propose up to 3 events per block.
				ProposeDelayDuration:         time.Second, // propose events recognized at least one second ago.
			},
			bridgeEventsToAdd: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id0_Height0,
				constants.BridgeDepositEvent_Id1_Height0,
			},
			expectedMsg: &types.MsgAcknowledgeBridges{
				Events: []types.BridgeEvent{
					constants.BridgeDepositEvent_Id0_Height0,
					constants.BridgeDepositEvent_Id1_Height0,
				},
			},
		},
		"Already acknowledged events are not proposed": {
			blockTimestamp: timeNow,
			eventTimestamp: timeNow.Add(-time.Second * 2),
			proposeParams: types.ProposeParams{
				SkipRatePpm:                  0,           // do not skip based on pseudo-randomness.
				SkipIfBlockDelayedByDuration: time.Second, // do not skip based on time.
				MaxBridgesPerBlock:           3,           // propose up to 3 events per block.
				ProposeDelayDuration:         time.Second, // propose events recognized at least one second ago.
			},
			bridgeEventsToAdd: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id0_Height0, // this event should not be proposed.
				constants.BridgeDepositEvent_Id1_Height0,
				constants.BridgeDepositEvent_Id2_Height1,
			},
			acknowledgedEventInfo: types.BridgeEventInfo{
				NextDepositId:  1,
				EthBlockHeight: 0,
			},
			expectedMsg: &types.MsgAcknowledgeBridges{
				Events: []types.BridgeEvent{
					constants.BridgeDepositEvent_Id1_Height0,
					constants.BridgeDepositEvent_Id2_Height1,
				},
			},
		},
		"Events recognized at or after cutoff time are not proposed": {
			blockTimestamp: timeNow,
			eventTimestamp: timeNow.Add(-time.Second),
			proposeParams: types.ProposeParams{
				SkipRatePpm:                  0,           // do not skip based on pseudo-randomness.
				SkipIfBlockDelayedByDuration: time.Second, // do not skip based on time.
				MaxBridgesPerBlock:           3,           // propose up to 3 events per block.
				ProposeDelayDuration:         time.Second, // propose events recognized at least one second ago.
			},
			bridgeEventsToAdd: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id0_Height0,
				constants.BridgeDepositEvent_Id1_Height0,
			},
			expectedMsg: &types.MsgAcknowledgeBridges{
				Events: []types.BridgeEvent{},
			},
		},
		"No event is proposed when bridging is disabled": {
			blockTimestamp: timeNow,
			eventTimestamp: timeNow.Add(-time.Second * 2),
			proposeParams: types.ProposeParams{
				SkipRatePpm:                  0,           // do not skip based on pseudo-randomness.
				SkipIfBlockDelayedByDuration: time.Second, // do not skip based on time.
				MaxBridgesPerBlock:           3,           // propose up to 3 events per block.
				ProposeDelayDuration:         time.Second, // propose events recognized at least one second ago.
			},
			bridgeEventsToAdd: []types.BridgeEvent{
				constants.BridgeDepositEvent_Id0_Height0,
				constants.BridgeDepositEvent_Id1_Height0,
				constants.BridgeDepositEvent_Id2_Height1,
			},
			acknowledgedEventInfo: types.BridgeEventInfo{
				NextDepositId:  0,
				EthBlockHeight: 0,
			},
			bridgingDisabled: true,
			expectedMsg: &types.MsgAcknowledgeBridges{
				Events: []types.BridgeEvent{},
			},
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Setup keeper, bridgeEventManager, and mockTimeProvider.
			ks := keepertest.BridgeKeepers(t)
			err := ks.BridgeKeeper.SetAcknowledgedEventInfo(ks.Ctx, tc.acknowledgedEventInfo)
			require.NoError(t, err)
			err = ks.BridgeKeeper.UpdateProposeParams(ks.Ctx, tc.proposeParams)
			require.NoError(t, err)
			err = ks.BridgeKeeper.UpdateSafetyParams(ks.Ctx, types.SafetyParams{
				IsDisabled:  tc.bridgingDisabled,
				DelayBlocks: ks.BridgeKeeper.GetSafetyParams(ks.Ctx).DelayBlocks,
			})
			require.NoError(t, err)
			ks.MockTimeProvider.On("Now").Return(tc.eventTimestamp).Once()
			err = ks.BridgeEventManager.AddBridgeEvents(tc.bridgeEventsToAdd)
			require.NoError(t, err)

			// Get MsgAcknowledgeBridges.
			ks.MockTimeProvider.On("Now").Return(timeNow).Once()
			msg := ks.BridgeKeeper.GetAcknowledgeBridges(ks.Ctx, tc.blockTimestamp)

			// Assert expected MsgAcknowledgeBridges.
			require.Equal(t, tc.expectedMsg, msg)
		})
	}
}
