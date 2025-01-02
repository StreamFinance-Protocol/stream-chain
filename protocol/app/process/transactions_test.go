package process_test

import (
	"testing"

	errorsmod "cosmossdk.io/errors"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/process"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/encoding"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	bridgetypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	abci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestDecodeProcessProposalTxs_Error(t *testing.T) {
	invalidTxBytes := []byte{1, 2, 3}

	// Valid operations tx.
	validOperationsTx := constants.ValidEmptyMsgProposedOperationsTxBytes

	// Valid acknowledge bridges tx.
	validAcknowledgeBridgesTx := constants.MsgAcknowledgeBridges_Ids0_1_Height0_TxBytes

	// Valid add funding tx.
	validAddFundingTx := constants.ValidMsgAddPremiumVotesTxBytes

	// Valid "other" tx.
	validSendTx := constants.Msg_Send_TxBytes

	tests := map[string]struct {
		txsBytes    [][]byte
		expectedErr error
	}{
		"Less than min num txs": {
			txsBytes: [][]byte{validOperationsTx}, // need at least 3.
			expectedErr: errorsmod.Wrapf(
				process.ErrUnexpectedNumMsgs,
				"Expected the proposal to contain at least 3 txs, but got 1",
			),
		},
		"Order tx decoding fails": {
			txsBytes: [][]byte{invalidTxBytes, validAcknowledgeBridgesTx, validAddFundingTx},
			expectedErr: errorsmod.Wrapf(
				process.ErrDecodingTxBytes,
				"invalid field number: tx parse error",
			),
		},
		"Acknowledge bridges tx decoding fails": {
			txsBytes: [][]byte{validOperationsTx, invalidTxBytes, validAddFundingTx},
			expectedErr: errorsmod.Wrapf(
				process.ErrDecodingTxBytes,
				"invalid field number: tx parse error",
			),
		},
		"Add funding tx decoding fails": {
			txsBytes: [][]byte{validOperationsTx, validAcknowledgeBridgesTx, invalidTxBytes},
			expectedErr: errorsmod.Wrapf(
				process.ErrDecodingTxBytes,
				"invalid field number: tx parse error",
			),
		},
		"Other txs fails: invalid bytes": {
			txsBytes: [][]byte{
				validOperationsTx,
				validSendTx,    // other tx: valid.
				invalidTxBytes, // other tx: invalid.
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedErr: errorsmod.Wrapf(
				process.ErrDecodingTxBytes,
				"invalid field number: tx parse error",
			),
		},
		"Other txs fails: app-injected msg": {
			txsBytes: [][]byte{
				validOperationsTx,
				validSendTx,       // other tx: valid.
				validAddFundingTx, // other tx: invalid due to app-injected msg
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedErr: errorsmod.Wrapf(
				process.ErrUnexpectedMsgType,
				"Invalid msg type or content in OtherTxs *types.MsgAddPremiumVotes",
			),
		},
		"VE injection fails due to invalid bytes": {
			txsBytes: [][]byte{
				{}, // empty ve.
				validOperationsTx,
				validSendTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedErr: errorsmod.Wrapf(
				process.ErrUnexpectedNumMsgs,
				"Expected 1 num of msgs, but got 0",
			),
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Setup.
			ctx, pricesKeeper, _, _, _, _ := keepertest.PricesKeepers(t)
			_, bridgeKeeper, _, _, _, _, _ := keepertest.BridgeKeepers(t)

			// Run.
			_, err := process.DecodeProcessProposalTxs(
				ctx,
				constants.TestEncodingCfg.TxConfig.TxDecoder(),
				&abci.RequestProcessProposal{Txs: tc.txsBytes},
				bridgeKeeper,
				pricesKeeper,
			)

			// Validate.
			require.ErrorContains(t, err, tc.expectedErr.Error())
		})
	}
}

func TestDecodeProcessProposalTxs_Valid(t *testing.T) {
	// Valid order tx.
	validOperationsTx := constants.ValidEmptyMsgProposedOperationsTxBytes

	// Valid acknowledge bridges tx.
	validAcknowledgeBridgesTx := constants.MsgAcknowledgeBridges_Ids0_1_Height0_TxBytes

	// Valid add funding tx.
	validAddFundingTx := constants.ValidMsgAddPremiumVotesTxBytes

	// Valid "other" tx.
	validSingleMsgOtherTx := constants.Msg_Send_TxBytes

	// Valid "other" multi msgs tx.
	validMultiMsgOtherTx := constants.Msg_SendAndTransfer_TxBytes

	tests := map[string]struct {
		txsBytes [][]byte

		expectedOtherTxsNum    int
		expectedOtherTxOneMsgs []sdk.Msg
		expectedOtherTxTwoMsgs []sdk.Msg
	}{
		"Valid: no other tx": {
			txsBytes: [][]byte{
				validOperationsTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
		},
		"Valid: single other tx": {
			txsBytes: [][]byte{
				validOperationsTx,
				validSingleMsgOtherTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedOtherTxsNum:    1,
			expectedOtherTxOneMsgs: []sdk.Msg{constants.Msg_Send},
		},
		"Valid: mult other txs": {
			txsBytes: [][]byte{
				validOperationsTx,
				validSingleMsgOtherTx,
				validMultiMsgOtherTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedOtherTxsNum:    2,
			expectedOtherTxOneMsgs: []sdk.Msg{constants.Msg_Send},
			expectedOtherTxTwoMsgs: []sdk.Msg{constants.Msg_Send, constants.Msg_Transfer},
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Setup.
			ctx, pricesKeeper, _, _, _, _ := keepertest.PricesKeepers(t)
			_, bridgeKeeper, _, _, _, _, _ := keepertest.BridgeKeepers(t)

			// Run.
			ppt, err := process.DecodeProcessProposalTxs(
				ctx,
				constants.TestEncodingCfg.TxConfig.TxDecoder(),
				&abci.RequestProcessProposal{Txs: tc.txsBytes},
				bridgeKeeper,
				pricesKeeper,
			)

			// Validate.
			require.NoError(t, err)
			require.NotNil(t, ppt)

			require.Equal(t, constants.ValidEmptyMsgProposedOperations, ppt.ProposedOperationsTx.GetMsg())
			require.Equal(t, constants.ValidMsgAddPremiumVotes, ppt.AddPremiumVotesTx.GetMsg())

			require.Len(t, ppt.OtherTxs, tc.expectedOtherTxsNum)

			if tc.expectedOtherTxTwoMsgs != nil {
				require.Len(t, ppt.OtherTxs, 2)
				require.ElementsMatch(t, tc.expectedOtherTxOneMsgs, ppt.OtherTxs[0].GetMsgs())
				require.ElementsMatch(t, tc.expectedOtherTxTwoMsgs, ppt.OtherTxs[1].GetMsgs())
			} else if tc.expectedOtherTxOneMsgs != nil {
				require.Len(t, ppt.OtherTxs, 1)
				require.ElementsMatch(t, tc.expectedOtherTxOneMsgs, ppt.OtherTxs[0].GetMsgs())
			}
		})
	}
}

func TestProcessProposalTxs_Validate_Error(t *testing.T) {
	encodingCfg := encoding.GetTestEncodingCfg()
	txBuilder := encodingCfg.TxConfig.NewTxBuilder()

	// Acknowledge bridges tx.
	validAcknowledgeBridgesTx := constants.MsgAcknowledgeBridges_Ids0_1_Height0_TxBytes
	validAcknowledgeBridgesMsg := constants.MsgAcknowledgeBridges_Ids0_1_Height0
	invalidAcknowledgeBridgesTx := constants.MsgAcknowledgeBridges_Id55_Height15_TxBytes
	// Operations tx.
	validOperationsTx := constants.ValidEmptyMsgProposedOperationsTxBytes

	// Add funding tx.
	validAddFundingTx := constants.ValidMsgAddPremiumVotesTxBytes
	invalidAddFundingTx := constants.InvalidMsgAddPremiumVotesTxBytes

	// "Other" tx.
	validSingleMsgOtherTx := constants.Msg_Send_TxBytes
	invalidSingleMsgOtherTx := constants.Msg_Transfer_Invalid_SameSenderAndRecipient_TxBytes
	_ = txBuilder.SetMsgs(constants.Msg_Send, constants.Msg_Transfer_Invalid_SameSenderAndRecipient)
	invalidMultiMsgOtherTx, _ := encodingCfg.TxConfig.TxEncoder()(txBuilder.GetTx())

	tests := map[string]struct {
		txsBytes         [][]byte
		bridgingDisabled bool
		expectedErr      error
	}{
		"AcknowledgeBridges tx validation fails as event ID is not expected": {
			txsBytes: [][]byte{
				validOperationsTx,
				invalidAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedErr: bridgetypes.ErrBridgeIdNotNextToAcknowledge,
		},
		"AcknowledgeBridges tx validation fails as events are non-empty and bridging is disabled": {
			txsBytes: [][]byte{
				validOperationsTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			bridgingDisabled: true,
			expectedErr:      bridgetypes.ErrBridgingDisabled,
		},
		"AddFunding tx validation fails": {
			txsBytes: [][]byte{validOperationsTx, validAcknowledgeBridgesTx, invalidAddFundingTx},
			expectedErr: errorsmod.Wrap(
				process.ErrMsgValidateBasic,
				"premium votes must be sorted by perpetual id in ascending order and "+
					"cannot contain duplicates: MsgAddPremiumVotes is invalid"),
		},
		"Other txs validation fails: single tx": {
			txsBytes: [][]byte{
				validOperationsTx,
				validSingleMsgOtherTx,
				invalidSingleMsgOtherTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedErr: errorsmod.Wrap(process.ErrMsgValidateBasic, "Sender is the same as recipient"),
		},
		"Other txs validation fails: multi txs": {
			txsBytes: [][]byte{
				validOperationsTx,
				validSingleMsgOtherTx,
				invalidMultiMsgOtherTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			expectedErr: errorsmod.Wrap(process.ErrMsgValidateBasic, "Sender is the same as recipient"),
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Setup.
			ctx, pricesKeeper, _, daemonPriceCache, _, mockTimeProvider := keepertest.PricesKeepers(t)
			mockTimeProvider.On("Now").Return(constants.TimeT)
			keepertest.CreateTestMarkets(t, ctx, pricesKeeper)
			daemonPriceCache.UpdatePrices(constants.AtTimeTSingleExchangePriceUpdate)

			mockBridgeKeeper := &mocks.ProcessBridgeKeeper{}
			mockBridgeKeeper.On("GetSafetyParams", mock.Anything).Return(
				bridgetypes.SafetyParams{
					IsDisabled:  tc.bridgingDisabled,
					DelayBlocks: 5, // dummy value, not considered by Validate.
				},
			)
			mockBridgeKeeper.On("GetAcknowledgedEventInfo", mock.Anything).Return(
				constants.AcknowledgedEventInfo_Id0_Height0,
			)
			mockBridgeKeeper.On("GetRecognizedEventInfo", mock.Anything).Return(
				constants.RecognizedEventInfo_Id2_Height0,
			)
			for _, bridgeEvent := range validAcknowledgeBridgesMsg.Events {
				mockBridgeKeeper.On("GetBridgeEventFromServer", mock.Anything, bridgeEvent.Id).Return(bridgeEvent, true).Once()
			}

			ppt, err := process.DecodeProcessProposalTxs(
				ctx,
				encodingCfg.TxConfig.TxDecoder(),
				&abci.RequestProcessProposal{Txs: tc.txsBytes},
				mockBridgeKeeper,
				pricesKeeper,
			)
			require.NoError(t, err)

			// Run.
			err = ppt.Validate()

			// Validate.
			require.ErrorContains(t, err, tc.expectedErr.Error())
		})
	}
}

func TestProcessProposalTxs_Validate_Valid(t *testing.T) {

	// Valid order tx.
	validOperationsTx := constants.ValidEmptyMsgProposedOperationsTxBytes

	// Valid acknowledge bridges tx.
	validAcknowledgeBridgesTx := constants.MsgAcknowledgeBridges_Ids0_1_Height0_TxBytes
	validAcknowledgeBridgesMsg := constants.MsgAcknowledgeBridges_Ids0_1_Height0
	emptyAcknowledgeBridgesTx := constants.MsgAcknowledgeBridges_NoEvents_TxBytes

	// Valid add funding tx.
	validAddFundingTx := constants.ValidMsgAddPremiumVotesTxBytes

	// Valid "other" tx.
	validSingleMsgOtherTx := constants.Msg_Send_TxBytes

	// Valid "other" multi msgs tx.
	validMultiMsgOtherTx := constants.Msg_SendAndTransfer_TxBytes

	tests := map[string]struct {
		txsBytes         [][]byte
		bridgingDisabled bool
	}{
		"No other txs": {
			txsBytes: [][]byte{
				validOperationsTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
		},
		"Single other txs": {
			txsBytes: [][]byte{
				validOperationsTx,
				validSingleMsgOtherTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
		},
		"Multi other txs": {
			txsBytes: [][]byte{
				validOperationsTx,
				validSingleMsgOtherTx,
				validMultiMsgOtherTx,
				validAcknowledgeBridgesTx,
				validAddFundingTx,
			},
		},
		"Empty bridge events and bridging is disabled": {
			txsBytes: [][]byte{
				validOperationsTx,
				validSingleMsgOtherTx,
				emptyAcknowledgeBridgesTx,
				validAddFundingTx,
			},
			bridgingDisabled: true,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Setup.
			ctx, pricesKeeper, _, daemonPriceCache, _, mockTimeProvider := keepertest.PricesKeepers(t)
			mockTimeProvider.On("Now").Return(constants.TimeT)
			keepertest.CreateTestMarkets(t, ctx, pricesKeeper)
			daemonPriceCache.UpdatePrices(constants.AtTimeTSingleExchangePriceUpdate)

			mockBridgeKeeper := &mocks.ProcessBridgeKeeper{}
			mockBridgeKeeper.On("GetSafetyParams", mock.Anything).Return(
				bridgetypes.SafetyParams{
					IsDisabled:  tc.bridgingDisabled,
					DelayBlocks: 5, // dummy value, not considered by Validate.
				},
			)
			mockBridgeKeeper.On("GetAcknowledgedEventInfo", mock.Anything).Return(
				constants.AcknowledgedEventInfo_Id0_Height0,
			)
			mockBridgeKeeper.On("GetRecognizedEventInfo", mock.Anything).Return(
				constants.RecognizedEventInfo_Id2_Height0,
			)
			for _, bridgeEvent := range validAcknowledgeBridgesMsg.Events {
				mockBridgeKeeper.On("GetBridgeEventFromServer", mock.Anything, bridgeEvent.Id).Return(bridgeEvent, true).Once()
			}

			ppt, err := process.DecodeProcessProposalTxs(
				ctx,
				constants.TestEncodingCfg.TxConfig.TxDecoder(),
				&abci.RequestProcessProposal{Txs: tc.txsBytes},
				mockBridgeKeeper,
				pricesKeeper,
			)
			require.NoError(t, err)

			// Run.
			err = ppt.Validate()

			// Validate.
			require.NoError(t, err)
		})
	}
}
