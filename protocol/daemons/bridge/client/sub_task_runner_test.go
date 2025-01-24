package client_test

import (
	"errors"
	"fmt"
	"math/big"
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/bridge/api"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/bridge/client"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/grpc"
	bridgetypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	ethcoretypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestRunBridgeDaemonTaskLoop(t *testing.T) {
	errParams := errors.New("error getting event params")
	errPropose := errors.New("error getting propose params")
	errRecognizedEventInfo := errors.New("error getting recognized event info")
	errChainId := errors.New("error getting chain id")
	errEthereumLogs := errors.New("error getting Ethereum logs")
	errAddBridgeEvents := errors.New("error adding bridge events")
	errGetWithdrawEvents := errors.New("error getting withdraw events")
	errPendingNonceAt := errors.New("error getting pending nonce at")
	errSuggestGasPrice := errors.New("error getting suggest gas price")
	errSendTransaction := errors.New("failed to send transaction")
	errUpdateLastConfirmedWithdrawId := errors.New("error updating last confirmed withdraw id")

	t.Setenv("ETH_PRIV_KEY", "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef")
	zeroPendingNonce := uint64(0)
	basicSuggestedGasPrice := big.NewInt(1000000000)
	ethReceiptStatusFailure := &ethcoretypes.Receipt{
		Status: 0,
	}
	ethReceiptStatusSuccess := &ethcoretypes.Receipt{
		Status: 1,
	}

	tests := map[string]struct {
		eventParams            bridgetypes.EventParams
		eventParamsErr         error
		proposeParams          bridgetypes.ProposeParams
		proposeParamsErr       error
		recognizedEventInfo    bridgetypes.BridgeEventInfo
		recognizedEventInfoErr error

		// Ethereum Client Mocking
		chainId                  int
		chainIdError             error
		filterLogs               []ethcoretypes.Log
		filterLogsErr            error
		pendingNonceAt           uint64
		pendingNonceAtErr        error
		suggestGasPrice          *big.Int
		suggestGasPriceErr       error
		sendTransactionErr       error
		ethTransactionReceipt    *ethcoretypes.Receipt
		ethTransactionReceiptErr error

		// Service Client Mocking
		updateLastConfirmedWithdrawIdErr error
		addBridgeEventsErr               error

		// Query Client Mocking
		withdrawBridgeResponse  *bridgetypes.QueryWithdrawalsResponse
		withdrawBridgeEventsErr error

		expectedErrorString string
		expectedError       error
	}{
		"Success: zero deposits and zero withdrawals": {
			withdrawBridgeResponse: &bridgetypes.QueryWithdrawalsResponse{
				Withdrawals: []bridgetypes.BridgeEvent{},
			},
			eventParams:           constants.EventParams,
			proposeParams:         constants.ProposeParams,
			recognizedEventInfo:   constants.RecognizedEventInfo_Id2_Height0,
			chainId:               constants.EthChainId,
			pendingNonceAt:        zeroPendingNonce,
			suggestGasPrice:       basicSuggestedGasPrice,
			ethTransactionReceipt: ethReceiptStatusSuccess,
		},
		"Success: only one deposit": {
			eventParams:         constants.EventParams,
			proposeParams:       constants.ProposeParams,
			recognizedEventInfo: constants.RecognizedEventInfo_Id2_Height0,
			chainId:             constants.EthChainId,
			filterLogs: []ethcoretypes.Log{
				constants.EthLog_Event0,
			},
			pendingNonceAt:        zeroPendingNonce,
			suggestGasPrice:       basicSuggestedGasPrice,
			ethTransactionReceipt: ethReceiptStatusSuccess,
		},
		"Success: multiple deposits": {
			eventParams:         constants.EventParams,
			proposeParams:       constants.ProposeParams,
			recognizedEventInfo: constants.RecognizedEventInfo_Id2_Height0,
			chainId:             constants.EthChainId,
			filterLogs: []ethcoretypes.Log{
				constants.EthLog_Event0,
				constants.EthLog_Event1,
			},
			pendingNonceAt:        zeroPendingNonce,
			suggestGasPrice:       basicSuggestedGasPrice,
			ethTransactionReceipt: ethReceiptStatusSuccess,
		},
		"Success: one withdrawal": {
			withdrawBridgeResponse: &bridgetypes.QueryWithdrawalsResponse{
				Withdrawals: []bridgetypes.BridgeEvent{
					constants.BridgeWithdrawalEvent1,
				},
			},
			eventParams:           constants.EventParams,
			proposeParams:         constants.ProposeParams,
			recognizedEventInfo:   constants.RecognizedEventInfo_Id2_Height0,
			chainId:               constants.EthChainId,
			pendingNonceAt:        zeroPendingNonce,
			suggestGasPrice:       basicSuggestedGasPrice,
			ethTransactionReceipt: ethReceiptStatusSuccess,
		},
		"Success: multiple withdrawals": {
			withdrawBridgeResponse: &bridgetypes.QueryWithdrawalsResponse{
				Withdrawals: []bridgetypes.BridgeEvent{
					constants.BridgeWithdrawalEvent1,
					constants.BridgeWithdrawalEvent2,
				},
			},
			eventParams:           constants.EventParams,
			proposeParams:         constants.ProposeParams,
			recognizedEventInfo:   constants.RecognizedEventInfo_Id2_Height0,
			chainId:               constants.EthChainId,
			pendingNonceAt:        zeroPendingNonce,
			suggestGasPrice:       basicSuggestedGasPrice,
			ethTransactionReceipt: ethReceiptStatusSuccess,
		},

		"Error getting event params": {
			eventParamsErr: errParams,
			expectedError:  errParams,
		},
		"Error getting propose params": {
			eventParams:      constants.EventParams,
			proposeParamsErr: errPropose,
			expectedError:    errPropose,
		},
		"Error getting recognized event info": {
			eventParams:            constants.EventParams,
			proposeParams:          constants.ProposeParams,
			recognizedEventInfoErr: errRecognizedEventInfo,
			expectedError:          errRecognizedEventInfo,
		},
		"Error getting chain id": {
			eventParams:         constants.EventParams,
			proposeParams:       constants.ProposeParams,
			recognizedEventInfo: constants.RecognizedEventInfo_Id2_Height0,
			chainIdError:        errChainId,
			expectedError:       errChainId,
		},
		"Error chain ID not as expected": {
			eventParams:         constants.EventParams,
			proposeParams:       constants.ProposeParams,
			recognizedEventInfo: constants.RecognizedEventInfo_Id2_Height0,
			chainId:             constants.EthChainId + 1,
			expectedErrorString: fmt.Sprintf(
				"expected chain ID %d but node has chain ID %d",
				constants.EthChainId,
				constants.EthChainId+1,
			),
		},
		"Error getting Ethereum logs": {
			eventParams:         constants.EventParams,
			proposeParams:       constants.ProposeParams,
			recognizedEventInfo: constants.RecognizedEventInfo_Id2_Height0,
			chainId:             constants.EthChainId,
			filterLogsErr:       errEthereumLogs,
			expectedError:       errEthereumLogs,
		},
		"Error adding bridge events": {
			eventParams:         constants.EventParams,
			proposeParams:       constants.ProposeParams,
			recognizedEventInfo: constants.RecognizedEventInfo_Id2_Height0,
			chainId:             constants.EthChainId,
			filterLogs: []ethcoretypes.Log{
				constants.EthLog_Event0,
			},
			addBridgeEventsErr: errAddBridgeEvents,
			expectedError:      errAddBridgeEvents,
		},
		"Error getting withdraw events": {
			eventParams:             constants.EventParams,
			proposeParams:           constants.ProposeParams,
			recognizedEventInfo:     constants.RecognizedEventInfo_Id2_Height0,
			chainId:                 constants.EthChainId,
			withdrawBridgeEventsErr: errGetWithdrawEvents,
			expectedError:           errGetWithdrawEvents,
		},
		"Error if denom is not sDAI": {
			eventParams:             constants.EventParams,
			proposeParams:           constants.ProposeParams,
			recognizedEventInfo:     constants.RecognizedEventInfo_Id2_Height0,
			chainId:                 constants.EthChainId,
			withdrawBridgeEventsErr: errGetWithdrawEvents,
			expectedError:           errGetWithdrawEvents,
			withdrawBridgeResponse: &bridgetypes.QueryWithdrawalsResponse{
				Withdrawals: []bridgetypes.BridgeEvent{
					constants.BridgeWithdrawalEvent2_CoinDenomNotSDai,
				},
			},
		},
		"Error if pending nonce throws error": {
			eventParams:         constants.EventParams,
			proposeParams:       constants.ProposeParams,
			recognizedEventInfo: constants.RecognizedEventInfo_Id2_Height0,
			chainId:             constants.EthChainId,
			pendingNonceAtErr:   errPendingNonceAt,
			expectedError:       errPendingNonceAt,
			withdrawBridgeResponse: &bridgetypes.QueryWithdrawalsResponse{
				Withdrawals: []bridgetypes.BridgeEvent{
					constants.BridgeWithdrawalEvent1,
					constants.BridgeWithdrawalEvent2,
				},
			},
		},
		"Error if suggest gas price throws error": {
			eventParams:         constants.EventParams,
			proposeParams:       constants.ProposeParams,
			recognizedEventInfo: constants.RecognizedEventInfo_Id2_Height0,
			chainId:             constants.EthChainId,
			pendingNonceAt:      zeroPendingNonce,
			suggestGasPriceErr:  errSuggestGasPrice,
			expectedError:       errSuggestGasPrice,
			withdrawBridgeResponse: &bridgetypes.QueryWithdrawalsResponse{
				Withdrawals: []bridgetypes.BridgeEvent{
					constants.BridgeWithdrawalEvent1,
					constants.BridgeWithdrawalEvent2,
				},
			},
		},
		"Error if send transaction throws error": {
			eventParams:         constants.EventParams,
			proposeParams:       constants.ProposeParams,
			recognizedEventInfo: constants.RecognizedEventInfo_Id2_Height0,
			chainId:             constants.EthChainId,
			pendingNonceAt:      zeroPendingNonce,
			suggestGasPrice:     basicSuggestedGasPrice,
			sendTransactionErr:  errSendTransaction,
			expectedError:       errSendTransaction,
			withdrawBridgeResponse: &bridgetypes.QueryWithdrawalsResponse{
				Withdrawals: []bridgetypes.BridgeEvent{
					constants.BridgeWithdrawalEvent1,
					constants.BridgeWithdrawalEvent2,
				},
			},
		},
		"Error if transaction receipt status is not success": {
			eventParams:           constants.EventParams,
			proposeParams:         constants.ProposeParams,
			recognizedEventInfo:   constants.RecognizedEventInfo_Id2_Height0,
			chainId:               constants.EthChainId,
			pendingNonceAt:        zeroPendingNonce,
			suggestGasPrice:       basicSuggestedGasPrice,
			ethTransactionReceipt: ethReceiptStatusFailure,
			expectedErrorString:   "failed to handle withdraw requests",
			withdrawBridgeResponse: &bridgetypes.QueryWithdrawalsResponse{
				Withdrawals: []bridgetypes.BridgeEvent{
					constants.BridgeWithdrawalEvent1,
					constants.BridgeWithdrawalEvent2,
				},
			},
		},
		"Error if updating last confirmed withdraw ID throws error": {
			eventParams:                      constants.EventParams,
			proposeParams:                    constants.ProposeParams,
			recognizedEventInfo:              constants.RecognizedEventInfo_Id2_Height0,
			chainId:                          constants.EthChainId,
			pendingNonceAt:                   zeroPendingNonce,
			suggestGasPrice:                  basicSuggestedGasPrice,
			ethTransactionReceipt:            ethReceiptStatusSuccess,
			updateLastConfirmedWithdrawIdErr: errUpdateLastConfirmedWithdrawId,
			expectedError:                    errUpdateLastConfirmedWithdrawId,
			withdrawBridgeResponse: &bridgetypes.QueryWithdrawalsResponse{
				Withdrawals: []bridgetypes.BridgeEvent{
					constants.BridgeWithdrawalEvent1,
					constants.BridgeWithdrawalEvent2,
				},
			},
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx := grpc.Ctx
			mockLogger := mocks.Logger{}
			mockEthClient := mocks.EthClient{}
			mockQueryClient := mocks.BridgeQueryClient{}
			mockServiceClient := mocks.BridgeServiceClient{}

			mockQueryClient.On("EventParams", ctx, mock.Anything).Return(
				&bridgetypes.QueryEventParamsResponse{
					Params: tc.eventParams,
				},
				tc.eventParamsErr,
			)
			mockQueryClient.On("ProposeParams", ctx, mock.Anything).Return(
				&bridgetypes.QueryProposeParamsResponse{
					Params: tc.proposeParams,
				},
				tc.proposeParamsErr,
			)
			mockQueryClient.On("RecognizedEventInfo", ctx, mock.Anything).Return(
				&bridgetypes.QueryRecognizedEventInfoResponse{
					Info: tc.recognizedEventInfo,
				},
				tc.recognizedEventInfoErr,
			)
			mockEthClient.On("ChainID", ctx).Return(big.NewInt(int64(tc.chainId)), tc.chainIdError)
			mockEthClient.On("FilterLogs", ctx, mock.Anything).Return(tc.filterLogs, tc.filterLogsErr)
			mockEthClient.On("PendingNonceAt", ctx, mock.Anything).Return(tc.pendingNonceAt, tc.pendingNonceAtErr)
			mockEthClient.On("SuggestGasPrice", ctx).Return(tc.suggestGasPrice, tc.suggestGasPriceErr)
			mockEthClient.On("SendTransaction", ctx, mock.Anything).Return(tc.sendTransactionErr)
			mockEthClient.On("TransactionReceipt", ctx, mock.Anything).Return(tc.ethTransactionReceipt, tc.ethTransactionReceiptErr)

			mockServiceClient.On("AddBridgeEvents", ctx, mock.Anything).Return(nil, tc.addBridgeEventsErr)
			if tc.withdrawBridgeResponse != nil && len(tc.withdrawBridgeResponse.Withdrawals) > 0 {
				expectedLastId := tc.withdrawBridgeResponse.Withdrawals[len(tc.withdrawBridgeResponse.Withdrawals)-1].Id
				mockServiceClient.On("UpdateLastConfirmedWithdrawId", ctx, &api.UpdateLastConfirmedWithdrawIdRequest{
					LastConfirmedWithdrawId: expectedLastId,
				}).Return(nil, tc.updateLastConfirmedWithdrawIdErr)
			}

			mockQueryClient.On("WithdrawEvents", ctx, mock.Anything).Return(
				tc.withdrawBridgeResponse,
				tc.withdrawBridgeEventsErr,
			)

			subTaskRunner := &client.SubTaskRunnerImpl{}
			err := subTaskRunner.RunBridgeDaemonTaskLoop(
				grpc.Ctx,
				&mockLogger,
				&mockEthClient,
				&mockQueryClient,
				&mockServiceClient,
			)

			if tc.expectedErrorString == "" && tc.expectedError == nil {
				require.NoError(t, err)
			}

			if tc.expectedErrorString != "" {
				require.Error(t, err)
				require.ErrorContains(t, err, tc.expectedErrorString)
			}

			if tc.expectedError != nil {
				require.Error(t, err)
				require.ErrorIs(t, err, tc.expectedError)
			}
		})
	}
}
