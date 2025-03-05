package types

import (
	"context"
	"math/big"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	ethcoretypes "github.com/ethereum/go-ethereum/core/types"
)

// EthClient is an interface that encapsulates querying an Ethereum JSON-RPC endpoint.
type EthClient interface {
	ChainID(ctx context.Context) (*big.Int, error)
	FilterLogs(ctx context.Context, q ethereum.FilterQuery) ([]ethcoretypes.Log, error)
	SuggestGasPrice(ctx context.Context) (*big.Int, error)
	PendingNonceAt(ctx context.Context, account common.Address) (uint64, error)
	SendTransaction(ctx context.Context, tx *types.Transaction) error
	CodeAt(ctx context.Context, contract common.Address, blockNumber *big.Int) ([]byte, error)
	EstimateGas(ctx context.Context, call ethereum.CallMsg) (gas uint64, err error)
	CallContract(ctx context.Context, call ethereum.CallMsg, blockNumber *big.Int) ([]byte, error)
	TransactionReceipt(ctx context.Context, txHash common.Hash) (*types.Receipt, error)
}
