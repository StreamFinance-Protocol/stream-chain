package process_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/process"
	vecodec "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/codec"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	prepareutils "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	testmsgs "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/msgs"
	vetesting "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/ve"
	bridgetypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"

	abci "github.com/cometbft/cometbft/abci/types"
	"github.com/stretchr/testify/mock"

	"github.com/stretchr/testify/require"
)

func TestProcessProposalHandler_Error(t *testing.T) {
	acceptResponse := abci.ResponseProcessProposal{
		Status: abci.ResponseProcessProposal_ACCEPT,
	}
	rejectResponse := abci.ResponseProcessProposal{
		Status: abci.ResponseProcessProposal_REJECT,
	}

	// // Invalid acknowledge bridges txs.
	// acknowledgeBridgesTx_IdsNotConsecutive := constants.MsgAcknowledgeBridges_Ids0_55_Height0_TxBytes
	// acknowledgeBridgesTx_NotRecognized := constants.MsgAcknowledgeBridges_Id55_Height15_TxBytes
	// acknowledgeBridgesTx_NotNextToAcknowledge := constants.MsgAcknowledgeBridges_Id1_Height0_TxBytes

	// Valid operations tx.
	validOperationsTx := constants.ValidEmptyMsgProposedOperationsTxBytes

	// Valid add funding tx.
	validAddFundingTx := constants.ValidMsgAddPremiumVotesTxBytes

	// Valid "other" single msg tx.
	validSingleMsgOtherTx := constants.Msg_Send_TxBytes

	// Valid "other" multi msgs tx.
	validMultiMsgOtherTx := constants.Msg_SendAndTransfer_TxBytes

	// // Valid acknowledge bridges tx.
	validAcknowledgeBridgesTx := constants.MsgAcknowledgeBridges_Ids0_1_Height0_TxBytes
	validAcknowledgeBridgesMsg := constants.MsgAcknowledgeBridges_Ids0_1_Height0
	// validAcknowledgeBridgesTx_NoEvents := constants.MsgAcknowledgeBridges_NoEvents_TxBytes

	tests := map[string]struct {
		bridgeEventsInServer []bridgetypes.BridgeEvent
		bridgingDisabled     bool
		txsBytes             [][]byte

		expectedResponse abci.ResponseProcessProposal
	}{
		"Reject: decode fails": {
			txsBytes:         [][]byte{{}, {1}, {2}},
			expectedResponse: rejectResponse,
		},
		"Error: place order type is not allowed": {
			txsBytes: [][]byte{
				{}, // empty for ve.
				validOperationsTx,
				constants.Msg_PlaceOrder_TxBtyes, // invalid other txs.
				validAddFundingTx,
			},
			expectedResponse: rejectResponse,
		},
		"Reject: bridge events are non-empty and bridging is disabled": {
			txsBytes: [][]byte{
				validOperationsTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
				validAcknowledgeBridgesTx,
			},
			bridgeEventsInServer: validAcknowledgeBridgesMsg.Events,
			bridgingDisabled:     true,
			expectedResponse:     rejectResponse,
		},
		"Error: VE injected data is not at top of block": {
			txsBytes: [][]byte{
				validOperationsTx,
				{}, // empty for ve.
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedResponse: rejectResponse,
		},
		"Error: cancel order type is not allowed": {
			txsBytes: [][]byte{
				{}, // empty for ve.
				validOperationsTx,
				constants.Msg_CancelOrder_TxBtyes, // invalid other txs.
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedResponse: rejectResponse,
		},
		"Error: app-injected msg type is not allowed": {
			txsBytes: [][]byte{
				{}, // empty for ve.
				validOperationsTx,
				validAddFundingTx, // invalid other txs.
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedResponse: rejectResponse,
		},
		"Error: VE enabled but extInfoBz is not set": {
			txsBytes: [][]byte{
				validOperationsTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedResponse: rejectResponse,
		},
		"Error: internal msg type is not allowed": {
			txsBytes: [][]byte{
				{}, // empty for ve.
				validOperationsTx,
				testmsgs.MsgSoftwareUpgradeTxBytes, // invalid other txs.
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedResponse: rejectResponse,
		},
		"Accept: Valid txs empty VE": {
			txsBytes: [][]byte{
				{}, // empty for ve.
				validOperationsTx,
				validMultiMsgOtherTx,  // other txs.
				validSingleMsgOtherTx, // other txs.
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			bridgeEventsInServer: validAcknowledgeBridgesMsg.Events,
			expectedResponse:     acceptResponse,
		},
		"Accept: Valid txs with VE": {
			txsBytes: [][]byte{
				constants.ValidSingleVoteExtInfoBytes,
				validOperationsTx,
				validMultiMsgOtherTx,  // other txs.
				validSingleMsgOtherTx, // other txs.
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			bridgeEventsInServer: validAcknowledgeBridgesMsg.Events,
			expectedResponse:     acceptResponse,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {

			// Setup.
			ctx, pricesKeeper, _, daemonPriceCache, marketToSmoothedPrices, mockTimeProvider := keepertest.PricesKeepers(t)
			ctx = vetesting.GetVeEnabledCtx(ctx, 3)

			ctx = ctx.WithCometInfo(
				vetesting.NewBlockInfo(
					nil,
					nil,
					nil,
					abci.CommitInfo{
						Round: 3,
						Votes: []abci.VoteInfo{},
					},
				),
			)
			mockTimeProvider.On("Now").Return(constants.TimeT)
			keepertest.CreateTestMarkets(t, ctx, pricesKeeper)
			daemonPriceCache.UpdatePrices(constants.AtTimeTSingleExchangePriceUpdate)

			mockClobKeeper := &mocks.ProcessClobKeeper{}
			mockClobKeeper.On("RecordMevMetricsIsEnabled").Return(true)
			mockClobKeeper.On("RecordMevMetrics", mock.Anything, mock.Anything, mock.Anything, mock.Anything).Return(nil)

			mockVEApplier := &mocks.ProcessProposalVEApplier{}
			mockVEApplier.On("ApplyVE", mock.Anything, mock.Anything, mock.Anything).Return(nil)

			mockBridgeKeeper := &mocks.ProcessBridgeKeeper{}
			mockBridgeKeeper.On("GetSafetyParams", mock.Anything).Return(bridgetypes.SafetyParams{
				IsDisabled:  tc.bridgingDisabled,
				DelayBlocks: 5, // dummy value, not considered by ProcessProposal.
			})
			mockBridgeKeeper.On("GetAcknowledgedEventInfo", mock.Anything).Return(constants.AcknowledgedEventInfo_Id0_Height0)
			mockBridgeKeeper.On("GetRecognizedEventInfo", mock.Anything).Return(constants.RecognizedEventInfo_Id2_Height0)
			for _, bridgeEvent := range tc.bridgeEventsInServer {
				mockBridgeKeeper.On("GetBridgeEventFromServer", mock.Anything, bridgeEvent.Id).Return(bridgeEvent, true).Once()
			}

			mockRatelimitKeeper := &mocks.VoteExtensionRateLimitKeeper{}

			handler := process.ProcessProposalHandler(
				constants.TestEncodingCfg.TxConfig,
				mockBridgeKeeper,
				mockClobKeeper,
				&mocks.ProcessStakingKeeper{},
				&mocks.ProcessPerpetualKeeper{},
				pricesKeeper,
				mockRatelimitKeeper,
				vecodec.NewDefaultExtendedCommitCodec(),
				vecodec.NewDefaultVoteExtensionCodec(),
				mockVEApplier,
				prepareutils.NoOpValidateVoteExtensionsFn,
			)
			req := abci.RequestProcessProposal{Txs: tc.txsBytes}

			// Run.
			resp, err := handler(ctx, &req)
			require.NoError(t, err)

			// Validate.
			require.Equal(t, tc.expectedResponse, *resp)
			require.Equal(
				t,
				marketToSmoothedPrices.GetSmoothedSpotPricesForTest(),
				constants.AtTimeTSingleExchangeSmoothedPrices,
			)
		})
	}
}
