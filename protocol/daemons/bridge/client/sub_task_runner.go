package client

import (
	"context"
	"encoding/hex"
	"fmt"
	"math/big"
	"os"
	"time"

	"cosmossdk.io/log"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/bridge/api"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/bridge/client/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/constants"
	libeth "github.com/StreamFinance-Protocol/stream-chain/protocol/lib/eth"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/metrics"
	bridgetypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	ratelimittypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	"github.com/cosmos/cosmos-sdk/telemetry"
	eth "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	ethcommon "github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	ethrpc "github.com/ethereum/go-ethereum/rpc"
)

type SubTaskRunner interface {
	RunBridgeDaemonTaskLoop(
		ctx context.Context,
		logger log.Logger,
		ethClient types.EthClient,
		queryClient bridgetypes.QueryClient,
		serviceClient api.BridgeServiceClient,
	) error
}

type SubTaskRunnerImpl struct{}

type BridgeContractWithdrawRequest struct {
	Amount *big.Int
	To     common.Address
}

var _ SubTaskRunner = (*SubTaskRunnerImpl)(nil)

// RunBridgeDaemonTaskLoop does the following:
// 1) Fetches configuration information by querying the gRPC server.
// 2) Fetches Ethereum events from a configured Ethereum client.
// 3) Sends newly-recognized bridge events to the gRPC server.
func (s *SubTaskRunnerImpl) RunBridgeDaemonTaskLoop(
	ctx context.Context,
	logger log.Logger,
	ethClient types.EthClient,
	queryClient bridgetypes.QueryClient,
	serviceClient api.BridgeServiceClient,
) error {
	defer telemetry.ModuleMeasureSince(
		metrics.BridgeDaemon,
		time.Now(),
		metrics.MainTaskLoop,
		metrics.Latency,
	)

	eventParams, proposeParams, recognizedEventInfo, err := s.fetchBridgeDaemonParams(ctx, queryClient)
	if err != nil {
		return fmt.Errorf("failed to fetch bridge daemon parameters: %w", err)
	}

	err = s.validateChainId(ctx, ethClient, eventParams)
	if err != nil {
		return fmt.Errorf("failed to validate chain ID: %w", err)
	}

	err = s.handleDepositRequests(ctx, ethClient, eventParams, recognizedEventInfo, proposeParams, serviceClient)
	if err != nil {
		return fmt.Errorf("failed to handle deposit requests: %w", err)
	}

	err = s.handleWithdrawRequests(ctx, queryClient, serviceClient, ethClient)
	if err != nil {
		return fmt.Errorf("failed to handle withdraw requests: %w", err)
	}

	// Success.
	return nil
}

func (s *SubTaskRunnerImpl) handleDepositRequests(
	ctx context.Context,
	ethClient types.EthClient,
	eventParams *bridgetypes.QueryEventParamsResponse,
	recognizedEventInfo *bridgetypes.QueryRecognizedEventInfoResponse,
	proposeParams *bridgetypes.QueryProposeParamsResponse,
	serviceClient api.BridgeServiceClient,
) (err error) {
	logs, err := s.fetchEthereumBridgeDepositLogs(ctx, ethClient, eventParams, recognizedEventInfo, proposeParams)
	if err != nil {
		return fmt.Errorf("failed to fetch Ethereum bridge deposit logs: %w", err)
	}

	telemetry.IncrCounter(
		float32(len(logs)),
		metrics.BridgeDaemon,
		metrics.NewEthLogs,
		metrics.Count,
	)

	newBridgeEvents := s.parseDepositLogsIntoBridgeEvents(logs, eventParams.Params.Denom)

	// Send bridge events to bridge server.
	if _, err = serviceClient.AddBridgeEvents(ctx, &api.AddBridgeEventsRequest{
		BridgeEvents: newBridgeEvents,
	}); err != nil {
		return fmt.Errorf("failed to add bridge events: %w", err)
	}

	return nil
}

func (s *SubTaskRunnerImpl) handleWithdrawRequests(
	ctx context.Context,
	queryClient bridgetypes.QueryClient,
	serviceClient api.BridgeServiceClient,
	ethClient types.EthClient,
) (err error) {
	withdrawEvents, err := queryClient.WithdrawEvents(ctx, &bridgetypes.QueryWithdrawalsRequest{})
	if err != nil {
		return fmt.Errorf("failed to fetch withdraw events: %w", err)
	}

	requests, err := s.GetWithdrawContractCallParams(withdrawEvents)
	if err != nil {
		return fmt.Errorf("failed to get withdraw contract call params: %w", err)
	}

	err = s.SubmitWithdrawalRequests(ctx, ethClient, requests)
	if err != nil {
		return fmt.Errorf("failed to submit withdrawal requests: %w", err)
	}

	lastConfirmedWithdrawId := withdrawEvents.Withdrawals[len(withdrawEvents.Withdrawals)-1].Id
	_, err = serviceClient.UpdateLastConfirmedWithdrawId(ctx, &api.UpdateLastConfirmedWithdrawIdRequest{
		LastConfirmedWithdrawId: lastConfirmedWithdrawId,
	})
	if err != nil {
		return fmt.Errorf("failed to update last confirmed withdraw id: %w", err)
	}

	return nil
}

func (s *SubTaskRunnerImpl) parseDepositLogsIntoBridgeEvents(
	logs []ethtypes.Log,
	denom string,
) (events []bridgetypes.BridgeEvent) {
	events = make([]bridgetypes.BridgeEvent, len(logs))
	for i, log := range logs {
		events[i] = libeth.BridgeDepositLogToEvent(log, denom)
	}
	return events
}

func (s *SubTaskRunnerImpl) fetchEthereumBridgeDepositLogs(
	ctx context.Context,
	ethClient types.EthClient,
	eventParams *bridgetypes.QueryEventParamsResponse,
	recognizedEventInfo *bridgetypes.QueryRecognizedEventInfoResponse,
	proposeParams *bridgetypes.QueryProposeParamsResponse,
) (logs []ethtypes.Log, err error) {
	filterQuery := getFilterQuery(
		eventParams.Params.EthAddress,
		recognizedEventInfo.Info.EthBlockHeight,
		recognizedEventInfo.Info.NextDepositId,
		proposeParams.Params.MaxBridgesPerBlock,
	)
	logs, err = ethClient.FilterLogs(ctx, filterQuery)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch logs: %w", err)
	}

	return logs, nil
}

func (s *SubTaskRunnerImpl) validateChainId(
	ctx context.Context,
	ethClient types.EthClient,
	eventParams *bridgetypes.QueryEventParamsResponse,
) (err error) {
	chainId, err := ethClient.ChainID(ctx)
	if err != nil {
		return fmt.Errorf("failed to fetch chain ID: %w", err)
	}

	if chainId.Uint64() != eventParams.Params.EthChainId {
		return fmt.Errorf(
			"expected chain ID %d but node has chain ID %d",
			eventParams.Params.EthChainId,
			chainId,
		)
	}

	return nil
}

func (s *SubTaskRunnerImpl) GetWithdrawContractCallParams(
	events *bridgetypes.QueryWithdrawalsResponse,
) ([]BridgeContractWithdrawRequest, error) {
	requests := make([]BridgeContractWithdrawRequest, len(events.Withdrawals))
	for i, event := range events.Withdrawals {
		if event.Coin.Denom != ratelimittypes.SDaiDenom {
			return nil, fmt.Errorf("unsupported denom: %s", event.Coin.Denom)
		}

		amount, ok := new(big.Int).SetString(event.Coin.Amount.String(), 10)
		if !ok {
			return nil, fmt.Errorf("failed to parse amount: %s", event.Coin.Amount.String())
		}

		to := ethcommon.HexToAddress(event.Address)

		requests[i] = BridgeContractWithdrawRequest{
			Amount: amount,
			To:     to,
		}
	}
	return requests, nil
}

// Fetch parameters from x/bridge module. Relevant ones to bridge daemon are:
// - EventParams
//   - ChainId: Ethereum chain ID that bridge contract resides on.
//   - EthAddress: Address of the bridge contract to query events from.
//
// - ProposeParams
//   - MaxBridgesPerBlock: Number of bridge events to query for.
//
// - RecognizedEventInfo
//   - EthBlockHeight: Ethereum block height from which to start querying events.
//   - NextId: Next bridge event ID to query for.
func (s *SubTaskRunnerImpl) fetchBridgeDaemonParams(
	ctx context.Context,
	queryClient bridgetypes.QueryClient,
) (
	eventParams *bridgetypes.QueryEventParamsResponse,
	proposeParams *bridgetypes.QueryProposeParamsResponse,
	recognizedEventInfo *bridgetypes.QueryRecognizedEventInfoResponse,
	err error,
) {
	eventParams, err = queryClient.EventParams(ctx, &bridgetypes.QueryEventParamsRequest{})
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to fetch event params: %w", err)
	}
	proposeParams, err = queryClient.ProposeParams(ctx, &bridgetypes.QueryProposeParamsRequest{})
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to fetch propose params: %w", err)
	}
	recognizedEventInfo, err = queryClient.RecognizedEventInfo(ctx, &bridgetypes.QueryRecognizedEventInfoRequest{})
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to fetch recognized event info: %w", err)
	}

	return eventParams, proposeParams, recognizedEventInfo, nil
}

func (s *SubTaskRunnerImpl) SubmitWithdrawalRequests(
	ctx context.Context,
	ethClient types.EthClient,
	requests []BridgeContractWithdrawRequest,
) (err error) {
	auth, err := s.createTransactor()
	if err != nil {
		return err
	}

	nonce, err := s.getNonce(ctx, ethClient, auth)
	if err != nil {
		return err
	}
	auth.Nonce = big.NewInt(int64(nonce))

	gasPrice, err := ethClient.SuggestGasPrice(ctx)
	if err != nil {
		return fmt.Errorf("failed to get gas price: %w", err)
	}
	auth.GasPrice = gasPrice

	data, err := s.encodeWithdrawTransactionData(requests)
	if err != nil {
		return err
	}

	tx := s.createTransaction(nonce, gasPrice, data)

	signedTx, err := auth.Signer(auth.From, tx)
	if err != nil {
		return fmt.Errorf("failed to sign transaction: %w", err)
	}

	return s.sendTransaction(ctx, ethClient, signedTx)
}

func (s *SubTaskRunnerImpl) createTransactor() (*bind.TransactOpts, error) {

	privateKeyHex := os.Getenv("ETH_PRIV_KEY")
	if privateKeyHex == "" {
		return nil, fmt.Errorf("environment variable ETH_PRIVATE_KEY is not set")
	}

	privateKeyBytes, err := hex.DecodeString(privateKeyHex)
	if err != nil {
		return nil, fmt.Errorf("failed to decode private key: %w", err)
	}

	privateKey, err := crypto.ToECDSA(privateKeyBytes)
	if err != nil {
		return nil, fmt.Errorf("failed to parse private key: %w", err)
	}

	auth, err := bind.NewKeyedTransactorWithChainID(
		privateKey,
		big.NewInt(11155111), // Replace with your chain ID
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create transactor: %w", err)
	}
	return auth, nil
}

func (s *SubTaskRunnerImpl) getNonce(ctx context.Context, ethClient types.EthClient, auth *bind.TransactOpts) (uint64, error) {
	nonce, err := ethClient.PendingNonceAt(ctx, auth.From)
	if err != nil {
		return 0, fmt.Errorf("failed to get nonce: %w", err)
	}
	return nonce, nil
}

func (s *SubTaskRunnerImpl) encodeWithdrawTransactionData(requests []BridgeContractWithdrawRequest) ([]byte, error) {
	functionSignature := "requestWithdrawals((uint256,address)[])"
	methodID := crypto.Keccak256([]byte(functionSignature))[:4]

	arguments := abi.Arguments{
		{Type: arrayType("tuple(uint256,address)", len(requests))},
	}

	packed, err := arguments.Pack(requests)
	if err != nil {
		return nil, fmt.Errorf("failed to pack arguments: %w", err)
	}

	return append(methodID, packed...), nil
}

func (s *SubTaskRunnerImpl) createTransaction(nonce uint64, gasPrice *big.Int, data []byte) *ethtypes.Transaction {
	return ethtypes.NewTransaction(
		nonce,
		ethcommon.Address{},
		big.NewInt(0), // value - 0 ETH
		300000,        // gas limit
		gasPrice,
		data,
	)
}

func (s *SubTaskRunnerImpl) sendTransaction(ctx context.Context, ethClient types.EthClient, signedTx *ethtypes.Transaction) error {
	err := ethClient.SendTransaction(ctx, signedTx)
	if err != nil {
		return fmt.Errorf("failed to send transaction: %w", err)
	}

	receipt, err := bind.WaitMined(ctx, ethClient, signedTx)
	if err != nil {
		return fmt.Errorf("failed waiting for transaction confirmation: %w", err)
	}

	if receipt.Status != ethtypes.ReceiptStatusSuccessful {
		return fmt.Errorf("transaction failed: %s", receipt.TxHash.Hex())
	}

	return nil
}

// getFilterQuery returns a query to fetch logs of bridge events with following filters:
// - logs are emitted by contract at address `contractAddressHex`.
// - block height is between `fromBlock` and current finalized block height (both inclusive).
// - event IDs are sequential integers between `firstId` and `firstId + numIds - 1` (both inclusive).
func getFilterQuery(
	contractAddressHex string,
	fromBlock uint64,
	firstId uint32,
	numIds uint32,
) eth.FilterQuery {
	// Generate `ethcommon.Hash`s of the next `numIds` event IDs.
	eventIdHashes := make([]ethcommon.Hash, numIds)
	for i := uint32(0); i < numIds; i++ {
		eventIdHashes[i] = ethcommon.BigToHash(new(big.Int).SetUint64(uint64(firstId + i)))
	}

	return eth.FilterQuery{
		FromBlock: new(big.Int).SetUint64(fromBlock),
		ToBlock:   big.NewInt(ethrpc.FinalizedBlockNumber.Int64()),
		Addresses: []ethcommon.Address{ethcommon.HexToAddress(contractAddressHex)},
		Topics: [][]ethcommon.Hash{
			{ethcommon.HexToHash(constants.BridgeEventSignature)},
			eventIdHashes,
		},
	}
}

func arrayType(baseType string, length int) abi.Type {
	t, _ := abi.NewType("tuple[]", fmt.Sprintf("tuple(%s)[]", baseType), nil)
	return t
}
