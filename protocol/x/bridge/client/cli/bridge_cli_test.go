//go:build all || integration_test

package cli_test

import (
	"encoding/json"
	"fmt"
	"math"
	"math/big"
	"os"
	"path/filepath"
	"testing"
	"time"

	// If you're on v0.47, import from comsmetbft/cometbft/proto/tendermint/types

	sdkmath "cosmossdk.io/math"
	appconstants "github.com/StreamFinance-Protocol/stream-chain/protocol/app/constants"
	appflags "github.com/StreamFinance-Protocol/stream-chain/protocol/app/flags"
	daemonflags "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/flags"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/appoptions"
	testutil_bank "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/bank"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/network"
	bridgecli "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/client/cli"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	epochstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/epochs/types"
	ratelimittypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	sendingcli "github.com/StreamFinance-Protocol/stream-chain/protocol/x/sending/client/cli"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	subaccounttypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	tmtypes "github.com/cometbft/cometbft/types"
	"github.com/cosmos/cosmos-sdk/client/flags"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	networktestutil "github.com/cosmos/cosmos-sdk/testutil/network"
	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/stretchr/testify/suite"
)

var (
	subaccountNumberZero         = uint32(0)
	subaccountNumberOne          = uint32(1)
	subaccountNonExistent        = uint32(127)
	testTdaiBalance              = big.NewInt(99999)
	testTdaiBalancePlusYield     = new(big.Int).Add(testTdaiBalance, big.NewInt(1))
	testSdaiBalance              = big.NewInt(100000000000000000)
	sDaiPoolAccountAddressString = "klyra1r3fsd6humm0ghyq0te5jf8eumklmclyaw0hs3y"
)

type BridgeIntegrationTestSuite struct {
	suite.Suite

	validatorAddress sdk.AccAddress
	cfg              network.Config
	network          *network.Network
}

func TestBridgeIntegrationTestSuite(t *testing.T) {
	suite.Run(t, &BridgeIntegrationTestSuite{})
}

func (s *BridgeIntegrationTestSuite) SetupTest() {
	s.T().Log("setting up bridge integration test")

	// Deterministic Mnemonic.
	validatorMnemonic := constants.AliceMnenomic

	// Generated from the above Mnemonic.
	s.validatorAddress = constants.AliceAccAddress

	// Configure test network.
	appOptions := appoptions.NewFakeAppOptions()
	s.cfg = network.DefaultConfig(&network.NetworkConfigOptions{
		AppOptions: appOptions,
		OnNewApp: func(val networktestutil.ValidatorI) {
			testval, ok := val.(networktestutil.Validator)
			if !ok {
				panic("incorrect validator type")
			}

			// Disable the Price daemon in the integration tests.
			appOptions.Set(daemonflags.FlagPriceDaemonEnabled, false)
			appOptions.Set(daemonflags.FlagBridgeDaemonEnabled, false)
			appOptions.Set(daemonflags.FlagSDAIDaemonMockNoYield, true)

			// Effectively disable the health monitor panic timeout for these tests. This is necessary
			// because all clob cli tests are running in the same process and the total time to run is >> 5 minutes
			// on CI, causing the panic to trigger for liquidations daemon go routines that haven't been properly
			// cleaned up after a test run.
			// TODO(CORE-29): Remove this once the liquidations daemon is refactored to be stoppable.
			appOptions.Set(daemonflags.FlagMaxDaemonUnhealthySeconds, math.MaxUint32)

			// Make sure the daemon is using the correct GRPC address.
			appOptions.Set(appflags.GrpcAddress, testval.AppConfig.GRPC.Address)

			// The validator’s home directory (where the genesis.json is stored)
			rootDir := val.GetCtx().Config.RootDir
			genFile := filepath.Join(rootDir, "config", "genesis.json")

			genesisBytes, err := os.ReadFile(genFile)
			if err != nil {
				panic(fmt.Errorf("failed to read genesis file: %w", err))
			}

			// Parse into generic JSON first to fix integer encoding
			var genesisJSON map[string]interface{}
			if err := json.Unmarshal(genesisBytes, &genesisJSON); err != nil {
				panic(fmt.Errorf("failed to unmarshal genesis JSON: %w", err))
			}

			if initialHeight, ok := genesisJSON["initial_height"].(float64); ok {
				genesisJSON["initial_height"] = fmt.Sprintf("%d", int64(initialHeight))
			}

			// Marshal back to JSON with fixed encoding
			fixedGenesisBytes, err := json.Marshal(genesisJSON)
			if err != nil {
				panic(fmt.Errorf("failed to marshal fixed genesis: %w", err))
			}

			// Now parse as GenesisDoc
			genesisDoc, err := tmtypes.GenesisDocFromJSON(fixedGenesisBytes)
			if err != nil {
				panic(fmt.Errorf("failed to parse genesis doc: %w", err))
			}

			genesisDoc.ConsensusParams.ABCI.VoteExtensionsEnableHeight = 1

			err = genesisDoc.SaveAs(genFile)
			if err != nil {
				panic(fmt.Errorf("failed to save genesis doc: %w", err))
			}
		},
	})

	s.cfg.Mnemonics = append(s.cfg.Mnemonics, validatorMnemonic)
	s.cfg.ChainID = appconstants.AppName

	// Set min gas prices to zero so that we can submit transactions with zero gas price.
	s.cfg.MinGasPrices = fmt.Sprintf("0%s", sdk.DefaultBondDenom)

	bankstate := banktypes.GenesisState{}
	bankstate.Balances = append(
		bankstate.Balances,
		banktypes.Balance{
			subaccounttypes.ModuleAddress.String(),
			sdk.NewCoins(sdk.NewCoin(ratelimittypes.TDaiDenom, sdkmath.NewIntFromBigInt(testTdaiBalance))),
		},
		banktypes.Balance{
			sDaiPoolAccountAddressString,
			sdk.NewCoins(sdk.NewCoin(ratelimittypes.SDaiDenom, sdkmath.NewIntFromBigInt(testSdaiBalance))),
		},
	)

	bankstatebuf, err := s.cfg.Codec.MarshalJSON(&bankstate)
	s.Require().NoError(err)
	s.cfg.GenesisState[banktypes.ModuleName] = bankstatebuf

	// Ensure that no funding-related epochs will occur during this test.
	epstate := constants.GenerateEpochGenesisStateWithoutFunding()

	epbuf, err := s.cfg.Codec.MarshalJSON(&epstate)
	s.Require().NoError(err)
	s.cfg.GenesisState[epochstypes.ModuleName] = epbuf

	// Setting genesis state for Subaccounts.
	// Two subaccounts with non-zero TDAI balances are added to the genesis state,
	// so that we can initiate transfers from these subaccounts and observe the changes in
	// their TDAI positions.
	sastate := satypes.GenesisState{}
	sastate.Subaccounts = append(
		sastate.Subaccounts,
		satypes.Subaccount{
			Id: &satypes.SubaccountId{Owner: s.validatorAddress.String(), Number: subaccountNumberZero},
			AssetPositions: []*satypes.AssetPosition{
				&subaccounttypes.AssetPosition{
					AssetId:  0,
					Quantums: dtypes.NewIntFromBigInt(testTdaiBalance),
				},
			},
			PerpetualPositions: []*satypes.PerpetualPosition{},
		},
	)

	sabuf, err := s.cfg.Codec.MarshalJSON(&sastate)
	s.Require().NoError(err)
	s.cfg.GenesisState[satypes.ModuleName] = sabuf

	s.network = network.New(s.T(), s.cfg)

	_, err = s.network.WaitForHeight(1)
	s.Require().NoError(err)

	_, err = s.network.WaitForHeightWithTimeout(5, 10*time.Second)
	s.Require().NoError(err)
}

func (s *BridgeIntegrationTestSuite) TestCLIBridge_SuccessUnevenSdaiQuantums() {
	s.sendBridgeAndVerifyEvent(
		"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
		uint64(98_987_654_321_321_321),
		uint64(1_012_345_678_678_679),
		uint64(1_012),
	)
}

func (s *BridgeIntegrationTestSuite) TestCLIBridge_SuccessLargerSdaiQuantums() {
	s.sendBridgeAndVerifyEvent(
		"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
		uint64(99_000_000_000_000_000),
		uint64(1_000_000_000_000_000),
		uint64(1_000),
	)
}

func (s *BridgeIntegrationTestSuite) TestCLIBridge_SuccessSemiLargeSdaiQuantums() {
	s.sendBridgeAndVerifyEvent(
		"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
		uint64(1_000_000_000_000_000),
		uint64(99_000_000_000_000_000),
		uint64(99_000),
	)
}

func (s *BridgeIntegrationTestSuite) TestCLIBridge_SuccessSomeSdaiQuantums() {
	s.sendBridgeAndVerifyEvent(
		"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
		uint64(1_000_000_000),
		uint64(99_999_999_000_000_000),
		uint64(99_999),
	)
}

func (s *BridgeIntegrationTestSuite) TestCLIBridge_SuccessAllSdaiQuantums() {
	s.sendBridgeAndVerifyEvent(
		"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
		testSdaiBalance.Uint64(),
		uint64(0),
		uint64(0),
	)
}

func (s *BridgeIntegrationTestSuite) TestCLIBridge_SuccessOneSdaiQuantum() {
	s.sendBridgeAndVerifyEvent(
		"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
		uint64(1),
		testSdaiBalance.Uint64()-1,
		testTdaiBalancePlusYield.Uint64()-1,
	)
}

func (s *BridgeIntegrationTestSuite) TestCLIBridge_FailureZeroSdaiQuantum() {
	s.sendBridgeAndExpectError(
		s.validatorAddress.String(),
		"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
		uint64(0),
		testSdaiBalance.Uint64(),
		testTdaiBalancePlusYield.Uint64(),
	)
}

func (s *BridgeIntegrationTestSuite) TestCLIBridge_FailureMalformedWithdrawer() {
	s.sendBridgeAndExpectError(
		"wrong-address",
		"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
		uint64(0),
		testSdaiBalance.Uint64(),
		testTdaiBalancePlusYield.Uint64(),
	)
}

func (s *BridgeIntegrationTestSuite) TestCLIBridge_SuccessMultipleWithdrawals() {
	withdrawals := []struct {
		ethAddress string
		amount     uint64
	}{
		{
			ethAddress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
			amount:     testSdaiBalance.Uint64() / 2,
		},
		{
			ethAddress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96046",
			amount:     testSdaiBalance.Uint64() / 2,
		},
	}

	expectedSDaiSupply := testSdaiBalance.Uint64() -
		withdrawals[0].amount -
		withdrawals[1].amount

	expectedTDaiSupply := uint64(0)

	s.sendBridgeAndVerifyEvents(
		withdrawals,
		expectedSDaiSupply,
		expectedTDaiSupply,
	)
}

func (s *BridgeIntegrationTestSuite) prepareAccountForWithdrawal() {
	val := s.network.Validators[0]
	ctx := val.ClientCtx

	var halfOfTestTdaiBalancePlusYield big.Int
	halfOfTestTdaiBalancePlusYield.Quo(testTdaiBalancePlusYield, big.NewInt(2))

	argsTransferToAccount := []string{
		s.validatorAddress.String(),
		fmt.Sprintf("%d", 0),
		s.validatorAddress.String(),
		fmt.Sprintf("%d", 0),
		fmt.Sprintf("%d", halfOfTestTdaiBalancePlusYield.Uint64()),
	}

	argsTransferToAccount = append(argsTransferToAccount,
		fmt.Sprintf("--%s=%s", flags.FlagFrom, "node0"),
		fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
	)

	// Send half of tdai to the account from subaccount and get yield
	// TODO: In the withdraw from subaccount flow, we first send coins to the
	// bank account, then we update the subaccount.
	_, err := clitestutil.ExecTestCLICmd(ctx, sendingcli.CmdWithdrawFromSubaccount(), argsTransferToAccount)
	s.Require().NoError(err)

	currentHeight, err := s.network.LatestHeight()
	s.Require().NoError(err)

	_, err = s.network.WaitForHeight(currentHeight + 3)
	s.Require().NoError(err)

	// Withdraw from subaccount (this time withdraw the rest, including yield)
	_, err = clitestutil.ExecTestCLICmd(ctx, sendingcli.CmdWithdrawFromSubaccount(), argsTransferToAccount)
	s.Require().NoError(err)

	currentHeight, err = s.network.LatestHeight()
	s.Require().NoError(err)

	_, err = s.network.WaitForHeight(currentHeight + 3)
	s.Require().NoError(err)
}

func (s *BridgeIntegrationTestSuite) sendWithdrawalCommand(
	withdrawerAddress string,
	ethAddress string,
	amount uint64,
	expectedSDaiSupply uint64,
	expectedTDaiSupply uint64,
	expectErr bool,
) {
	s.prepareAccountForWithdrawal()

	val := s.network.Validators[0]
	ctx := val.ClientCtx

	args := []string{
		withdrawerAddress,
		ethAddress,
		fmt.Sprint(amount),
	}

	args = append(args,
		fmt.Sprintf("--%s=%s", flags.FlagFrom, "node0"),
		fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
	)

	_, err := clitestutil.ExecTestCLICmd(ctx, bridgecli.CmdWithdraw(), args)
	if expectErr {
		s.Require().Error(err)
	} else {
		s.Require().NoError(err)
	}

	currentHeight, err := s.network.LatestHeight()
	s.Require().NoError(err)

	_, err = s.network.WaitForHeight(currentHeight + 1)
	s.Require().NoError(err)
}

func (s *BridgeIntegrationTestSuite) sendBridgeAndVerifyEvents(
	withdrawals []struct {
		ethAddress string
		amount     uint64
	},
	expectedSDaiSupply uint64,
	expectedTDaiSupply uint64,
) {
	for _, withdrawal := range withdrawals {
		s.sendWithdrawalCommand(
			s.validatorAddress.String(),
			withdrawal.ethAddress,
			withdrawal.amount,
			expectedSDaiSupply,
			expectedTDaiSupply,
			false,
		)
	}

	val := s.network.Validators[0]
	ctx := val.ClientCtx

	resp, err := clitestutil.ExecTestCLICmd(ctx, bridgecli.CmdQueryWithdrawEvents(), []string{})
	s.Require().NoError(err)

	var queryWithdrawEventsResponse types.QueryWithdrawEventsResponse
	s.Require().NoError(s.cfg.Codec.UnmarshalJSON(resp.Bytes(), &queryWithdrawEventsResponse))

	s.Require().Equal(len(queryWithdrawEventsResponse.Withdrawals), len(withdrawals))

	for i, withdrawal := range withdrawals {
		s.Require().Equal(queryWithdrawEventsResponse.Withdrawals[i].Coin.Amount.Uint64(), withdrawal.amount)
		s.Require().Equal(queryWithdrawEventsResponse.Withdrawals[i].Coin.Denom, ratelimittypes.SDaiDenom)
		s.Require().Equal(queryWithdrawEventsResponse.Withdrawals[i].Address, withdrawal.ethAddress)
		s.Require().Greater(queryWithdrawEventsResponse.Withdrawals[i].BlockHeight, uint64(1))
		s.Require().False(queryWithdrawEventsResponse.Withdrawals[i].IsDeposit)
	}

	totalSupplySDai, err := testutil_bank.GetTotalSupplyOfDenom(val, s.cfg.Codec, ratelimittypes.SDaiDenom)
	s.Require().NoError(err)

	totalSupplyTDai, err := testutil_bank.GetTotalSupplyOfDenom(val, s.cfg.Codec, ratelimittypes.TDaiDenom)
	s.Require().NoError(err)

	s.Require().Equal(expectedSDaiSupply, totalSupplySDai)
	s.Require().Equal(expectedTDaiSupply, totalSupplyTDai)
}

func (s *BridgeIntegrationTestSuite) sendBridgeAndVerifyEvent(
	ethAddress string,
	amount uint64,
	expectedSDaiSupply uint64,
	expectedTDaiSupply uint64,
) {
	s.sendBridgeAndVerifyEvents(
		[]struct {
			ethAddress string
			amount     uint64
		}{
			{ethAddress: ethAddress, amount: amount},
		},
		expectedSDaiSupply,
		expectedTDaiSupply,
	)
}

func (s *BridgeIntegrationTestSuite) sendBridgeAndExpectError(
	withdrawerAddress string,
	ethAddress string,
	amount uint64,
	expectedSDaiSupply uint64,
	expectedTDaiSupply uint64,
) {
	s.sendWithdrawalCommand(withdrawerAddress, ethAddress, amount, expectedSDaiSupply, expectedTDaiSupply, true)

	val := s.network.Validators[0]
	ctx := val.ClientCtx

	resp, err := clitestutil.ExecTestCLICmd(ctx, bridgecli.CmdQueryWithdrawEvents(), []string{})
	s.Require().NoError(err)

	var queryWithdrawEventsResponse types.QueryWithdrawEventsResponse
	s.Require().NoError(s.cfg.Codec.UnmarshalJSON(resp.Bytes(), &queryWithdrawEventsResponse))

	s.Require().Equal(len(queryWithdrawEventsResponse.Withdrawals), 0)
}
