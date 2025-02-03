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
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/appoptions"
	testutil_bank "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/bank"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/network"
	bridgecli "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/client/cli"
	epochstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/epochs/types"
	ratelimittypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
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
			// NOTE: This sets the yield to 1006681181716810314385961731
			appOptions.Set(daemonflags.FlagSDAIDaemonMockEnabled, true)

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

	// Setting up genesis state of Accounts.
	bankstate := banktypes.GenesisState{}
	bankstate.Balances = append(
		bankstate.Balances,
		banktypes.Balance{
			s.validatorAddress.String(),
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
				&constants.TDai_Asset_500,
			},
			PerpetualPositions: []*satypes.PerpetualPosition{},
		},
		satypes.Subaccount{
			Id: &satypes.SubaccountId{Owner: s.validatorAddress.String(), Number: subaccountNumberOne},
			AssetPositions: []*satypes.AssetPosition{
				&constants.TDai_Asset_500,
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

	_, err = s.network.WaitForHeightWithTimeout(2, 10*time.Second)
	s.Require().NoError(err)
}

func (s *BridgeIntegrationTestSuite) TestCLIBridge_Success() {
	s.sendBridgeAndVerifyEvent(
		"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
		uint64(1),
		uint64(99999999999999999),
		uint64(100667), // note that we need to account for yield being paid out in TDAI
	)
}

func (s *BridgeIntegrationTestSuite) sendBridgeAndVerifyEvent(
	ethAddress string,
	amount uint64,
	expectedSDaiSupply uint64,
	expectedTDaiSupply uint64,
) {

	val := s.network.Validators[0]
	ctx := val.ClientCtx

	args := []string{
		s.validatorAddress.String(),
		ethAddress,
		fmt.Sprint(amount),
	}

	args = append(args,
		fmt.Sprintf("--%s=%s", flags.FlagFrom, "node0"),
		fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
	)

	_, err := clitestutil.ExecTestCLICmd(ctx, bridgecli.CmdWithdraw(), args)
	s.Require().NoError(err)

	currentHeight, err := s.network.LatestHeight()
	s.Require().NoError(err)

	// Wait for a few blocks to ensure the bridge request was completed.
	_, err = s.network.WaitForHeight(currentHeight + 3)
	s.Require().NoError(err)

	// TODO: Expand checking of the event.
	_, err = clitestutil.ExecTestCLICmd(ctx, bridgecli.CmdQueryEventParams(), []string{})
	s.Require().NoError(err)

	totalSupplySDai, err := testutil_bank.GetTotalSupplyOfDenom(val, s.cfg.Codec, ratelimittypes.SDaiDenom)
	s.Require().NoError(err)

	totalSupplyTDai, err := testutil_bank.GetTotalSupplyOfDenom(val, s.cfg.Codec, ratelimittypes.TDaiDenom)
	s.Require().NoError(err)

	s.Require().Equal(expectedSDaiSupply, totalSupplySDai)
	s.Require().Equal(expectedTDaiSupply, totalSupplyTDai)
}
