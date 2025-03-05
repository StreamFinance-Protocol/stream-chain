//go:build manual
// +build manual

// This file can be used to manually test the sending of withdrawal
// requests to the Ethereum bridge contract. It is not intended to
// run as part of the usual test suite.
//
// To run this test, set the following environment variables in a file
// named .env in the same directory as this file:
// - ETH_NODE_URL: The URL of the Ethereum node to connect to.
// - ETH_PRIVATE_KEY: The private key of the account to use
// for the withdrawal request.
//
// Then, from the directory of this file,you can run this file using:
// go test -v -tags manual -run "TestSubmitWithdrawalRequests"

package client

import (
	"context"
	"fmt"
	"math/big"
	"os"
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/joho/godotenv"
)

var ethChainId = uint64(8453)

var gasLimit = uint64(300000)

var bridgeContractAddress = "0x748c6d4bC7527FDD1d3E2c52391960014a8f51D8"

func init() {
	if err := godotenv.Load(".env"); err != nil {
		panic(fmt.Sprintf("Error loading .env file: %v", err))
	}
}

func TestSubmitWithdrawalRequests(t *testing.T) {
	ethNodeUrl := os.Getenv("ETH_NODE_URL")
	ethClientRaw, err := ethclient.Dial(ethNodeUrl)
	if err != nil {
		panic(fmt.Sprintf("Failed to connect to Ethereum client: %v", err))
	}

	amountToWithdraw := big.NewInt(1)

	addressToWithdrawTo := common.HexToAddress("0x70e1b787A5D677a5906AccCF0B4F387b8Bb1B5C3")

	requests := []BridgeContractWithdrawRequest{
		{
			Amount: amountToWithdraw,
			To:     addressToWithdrawTo,
		},
	}

	runner := &SubTaskRunnerImpl{
		ethChainId:            ethChainId,
		gasLimit:              gasLimit,
		bridgeContractAddress: bridgeContractAddress,
	}

	// Submit withdrawal request
	err = runner.SubmitWithdrawalRequests(
		context.Background(),
		ethClientRaw,
		requests,
	)
	if err != nil {
		panic(fmt.Sprintf("Failed to submit withdrawal request: %v", err))
	}
}
