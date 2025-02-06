//go:build all || integration_test

package cli_test

import (
	"fmt"
	"math"

	"testing"

	appflags "github.com/StreamFinance-Protocol/stream-chain/protocol/app/flags"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	epochstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/epochs/types"
	feetierstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/feetiers/types"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	sa_testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/client/testutil"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	networktestutil "github.com/cosmos/cosmos-sdk/testutil/network"
	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"

	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"

	appconstants "github.com/StreamFinance-Protocol/stream-chain/protocol/app/constants"
	daemonflags "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/flags"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/appoptions"
	testutil_bank "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/bank"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/network"
	cli_testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/client/testutil"
	"github.com/stretchr/testify/suite"
)

var (
	deleveragingTestInitialSubaccountModuleAccBalance    = int64(1_000_000_000_000)
	deleveragingTestInitialSubaccountModuleAccBalanceBTC = int64(1_000_000_000_000_000)

	deleveragingTestSubaccountNumberZero  = uint32(0)
	deleveragingTestSubaccountNumberOne   = uint32(1)
	deleveragingTestSubaccountNumberTwo   = uint32(2)
	deleveragingTestSubaccountNumberThree = uint32(3)
	deleveragingTestUnixSocketAddress     = "/tmp/liquidations_cli_test.sock"
)

type DeleveragingIntegrationTestSuite struct {
	suite.Suite

	validatorAddress sdk.AccAddress
	cfg              network.Config
	network          *network.Network
}

func TestDeleveragingOrderIntegrationTestSuite(t *testing.T) {
	// Deterministic Mnemonic.
	validatorMnemonic := constants.AliceMnenomic

	// Generated from the above Mnemonic.
	validatorAddress := constants.AliceAccAddress

	appOptions := appoptions.NewFakeAppOptions()

	// Configure test network.
	cfg := network.DefaultConfig(&network.NetworkConfigOptions{
		AppOptions: appOptions,
		OnNewApp: func(val networktestutil.ValidatorI) {
			testval, ok := val.(networktestutil.Validator)
			if !ok {
				panic("incorrect validator type")
			}

			// Disable the Price daemon in the integration tests.
			appOptions.Set(daemonflags.FlagPriceDaemonEnabled, false)

			// Effectively disable the health monitor panic timeout for these tests. This is necessary
			// because all clob cli tests are running in the same process and the total time to run is >> 5 minutes
			// on CI, causing the panic to trigger for liquidations daemon go routines that haven't been properly
			// cleaned up after a test run.
			// TODO(CORE-29): Remove this once the liquidations daemon is refactored to be stoppable.
			appOptions.Set(daemonflags.FlagMaxDaemonUnhealthySeconds, math.MaxUint32)

			// Make sure the daemon is using the correct GRPC address.
			appOptions.Set(appflags.GrpcAddress, testval.AppConfig.GRPC.Address)

			// Enable the liquidations daemon in the integration tests.
			appOptions.Set(daemonflags.FlagUnixSocketAddress, deleveragingTestUnixSocketAddress)
		},
	})

	cfg.Mnemonics = append(cfg.Mnemonics, validatorMnemonic)
	cfg.ChainID = appconstants.AppName

	suite.Run(t, NewDeleveragingIntegrationTestSuite(cfg, validatorAddress))
}

func NewDeleveragingIntegrationTestSuite(
	cfg network.Config,
	validatorAddress sdk.AccAddress,
) *DeleveragingIntegrationTestSuite {
	return &DeleveragingIntegrationTestSuite{cfg: cfg, validatorAddress: validatorAddress}
}

func (s *DeleveragingIntegrationTestSuite) SetupSuite() {
	s.T().Log("setting up liquidations integration test suite")

	s.cfg.MinGasPrices = fmt.Sprintf("0%s", sdk.DefaultBondDenom)

	state := types.GenesisState{}

	state.ClobPairs = append(state.ClobPairs, constants.ClobPair_Btc)
	state.ClobPairs = append(state.ClobPairs, constants.ClobPair_BtcBtc)
	state.LiquidationsConfig = types.LiquidationsConfig_NoFee

	perpstate := perptypes.GenesisState{}
	perpstate.LiquidityTiers = constants.LiquidityTiers
	perpstate.CollateralPools = constants.CollateralPools
	perpstate.Params = constants.PerpetualsGenesisParams
	perpstate.Perpetuals = append(perpstate.Perpetuals, constants.BtcUsd_20PercentInitial_10PercentMaintenance_OpenInterest20)
	perpstate.Perpetuals = append(perpstate.Perpetuals, constants.BtcBtc_10_20MarginRequirement_CollatPool1_Id10_OpenInterest20)

	pricesstate := constants.Prices_DefaultGenesisState

	buf, err := s.cfg.Codec.MarshalJSON(&state)
	s.NoError(err)
	s.cfg.GenesisState[types.ModuleName] = buf

	// Set the balances in the genesis state.
	s.cfg.GenesisState[banktypes.ModuleName] = cli_testutil.CreateBankGenesisStateForLiquidationTest(
		s.T(),
		s.cfg,
	)

	sastate := satypes.GenesisState{}
	sastate.Subaccounts = append(
		sastate.Subaccounts,
		satypes.Subaccount{
			Id: &satypes.SubaccountId{Owner: s.validatorAddress.String(), Number: deleveragingTestSubaccountNumberZero},
			AssetPositions: []*satypes.AssetPosition{
				{
					AssetId:  0,
					Quantums: dtypes.NewInt(500_000_000_000),
				},
			},
			PerpetualPositions: []*satypes.PerpetualPosition{
				{
					PerpetualId: 0,
					Quantums:    dtypes.NewInt(-110_000_000),
				},
			},
		},
		satypes.Subaccount{
			Id: &satypes.SubaccountId{Owner: s.validatorAddress.String(), Number: deleveragingTestSubaccountNumberOne},
			AssetPositions: []*satypes.AssetPosition{
				{
					AssetId:  0,
					Quantums: dtypes.NewInt(-55_001_000_000),
				},
			},
			PerpetualPositions: []*satypes.PerpetualPosition{
				{
					PerpetualId: 0,
					Quantums:    dtypes.NewInt(100_000_000),
				},
			},
		},
		satypes.Subaccount{
			Id: &satypes.SubaccountId{Owner: s.validatorAddress.String(), Number: deleveragingTestSubaccountNumberTwo},
			AssetPositions: []*satypes.AssetPosition{
				{
					AssetId:  1,
					Quantums: dtypes.NewInt(50_000_000_000_000),
				},
			},
			PerpetualPositions: []*satypes.PerpetualPosition{
				{
					PerpetualId: 10,
					Quantums:    dtypes.NewInt(-110_000_000),
				},
			},
		},
		satypes.Subaccount{
			Id: &satypes.SubaccountId{Owner: s.validatorAddress.String(), Number: deleveragingTestSubaccountNumberThree},
			AssetPositions: []*satypes.AssetPosition{
				{
					AssetId:  1,
					Quantums: dtypes.NewInt(-5_500_100_000_000),
				},
			},
			PerpetualPositions: []*satypes.PerpetualPosition{
				{
					PerpetualId: 10,
					Quantums:    dtypes.NewInt(100_000_000),
				},
			},
		},
	)

	sabuf, err := s.cfg.Codec.MarshalJSON(&sastate)
	s.Require().NoError(err)
	s.cfg.GenesisState[satypes.ModuleName] = sabuf

	// Ensure that no funding payments will occur during this test.
	epstate := constants.GenerateEpochGenesisStateWithoutFunding()

	feeTiersState := feetierstypes.GenesisState{}
	feeTiersState.Params = constants.PerpetualFeeParams

	epbuf, err := s.cfg.Codec.MarshalJSON(&epstate)
	s.Require().NoError(err)
	s.cfg.GenesisState[epochstypes.ModuleName] = epbuf

	perpbuf, err := s.cfg.Codec.MarshalJSON(&perpstate)
	s.Require().NoError(err)
	s.cfg.GenesisState[perptypes.ModuleName] = perpbuf

	pricesbuf, err := s.cfg.Codec.MarshalJSON(&pricesstate)
	s.Require().NoError(err)
	s.cfg.GenesisState[pricestypes.ModuleName] = pricesbuf

	feeTiersBuf, err := s.cfg.Codec.MarshalJSON(&feeTiersState)
	s.Require().NoError(err)
	s.cfg.GenesisState[feetierstypes.ModuleName] = feeTiersBuf

	s.network = network.New(s.T(), s.cfg)

	_, err = s.network.WaitForHeight(1)
	s.Require().NoError(err)
}

// TestCLIDeleveraging creates two subaccounts (where one is undercollateralized), there is no
// maker order to liquidate againt therefore the position is deleveraged.
// After the matching, the subaccounts are queried and assertions are performed on their
// QuoteBalance and PerpetualPositions, along with the balances of the Subaccounts module,
// Distribution module, and insurance fund.
func (s *DeleveragingIntegrationTestSuite) TestCLIDeleveraging() {
	val := s.network.Validators[0]
	ctx := val.ClientCtx

	currentHeight, err := s.network.LatestHeight()
	s.Require().NoError(err)

	// Wait for a few blocks to ensure the liquidation order was placed, matched, and included
	// in a block.
	_, err = s.network.WaitForHeight(currentHeight + 3)
	s.Require().NoError(err)

	// Query both subaccounts.
	resp, err := sa_testutil.MsgQuerySubaccountExec(ctx, s.validatorAddress, deleveragingTestSubaccountNumberZero)
	s.Require().NoError(err)

	var subaccountResp satypes.QuerySubaccountResponse
	s.Require().NoError(s.network.Config.Codec.UnmarshalJSON(resp.Bytes(), &subaccountResp))
	subaccountZero := subaccountResp.Subaccount

	resp, err = sa_testutil.MsgQuerySubaccountExec(ctx, s.validatorAddress, deleveragingTestSubaccountNumberOne)
	s.Require().NoError(err)

	s.Require().NoError(s.network.Config.Codec.UnmarshalJSON(resp.Bytes(), &subaccountResp))
	subaccountOne := subaccountResp.Subaccount

	// Assert that subaccount 1 has no assets positions and no perpetuals as has been fully deleveraged
	s.Require().Empty(subaccountOne.AssetPositions)
	s.Require().Empty(subaccountOne.PerpetualPositions)

	// Assert that subaccount 0 has a perpetual position of -10,000,000
	s.Require().Len(subaccountZero.PerpetualPositions, 1)
	s.Require().Equal(subaccountZero.PerpetualPositions[0].Quantums, dtypes.NewInt(-10_000_000))
	s.Require().Equal(subaccountZero.PerpetualPositions[0].PerpetualId, uint32(0))

	// Assert that subaccount 0 has asset balance of 500_000_000_000 - 55_001_000_000
	s.Require().Len(subaccountZero.AssetPositions, 1)
	s.Require().Equal(subaccountZero.AssetPositions[0].Quantums, dtypes.NewInt(500_000_000_000-55_001_000_000))
	s.Require().Equal(subaccountZero.AssetPositions[0].AssetId, uint32(0))

	// Check that the `subaccounts` module account has expected remaining TDai balance.
	collateralPoolAddress := satypes.ModuleName + ":0"

	saModuleTDaiBalance, err := testutil_bank.GetModuleAccAssetBalance(
		val,
		s.network.Config.Codec,
		satypes.ModuleName,
		"utdai",
	)

	s.Require().NoError(err)
	s.Require().Equal(
		deleveragingTestInitialSubaccountModuleAccBalance,
		saModuleTDaiBalance,
	)

	collateralPoolModuleTDaiBalance, err := testutil_bank.GetModuleAccAssetBalance(
		val,
		s.network.Config.Codec,
		collateralPoolAddress,
		"utdai",
	)

	s.Require().NoError(err)
	s.Require().Equal(
		deleveragingTestInitialSubaccountModuleAccBalance,
		collateralPoolModuleTDaiBalance,
	)
}

func (s *DeleveragingIntegrationTestSuite) TestCLIDeleveragingBTCCollat() {
	val := s.network.Validators[0]
	ctx := val.ClientCtx

	currentHeight, err := s.network.LatestHeight()
	s.Require().NoError(err)

	// Wait for a few blocks to ensure the liquidation order was placed, matched, and included
	// in a block.
	_, err = s.network.WaitForHeight(currentHeight + 3)
	s.Require().NoError(err)

	// Query both subaccounts.
	resp, err := sa_testutil.MsgQuerySubaccountExec(ctx, s.validatorAddress, deleveragingTestSubaccountNumberTwo)
	s.Require().NoError(err)

	var subaccountResp satypes.QuerySubaccountResponse
	s.Require().NoError(s.network.Config.Codec.UnmarshalJSON(resp.Bytes(), &subaccountResp))
	subaccountTwo := subaccountResp.Subaccount

	fmt.Println("subaccountTwo")
	for _, assetPosition := range subaccountTwo.AssetPositions {
		fmt.Printf("Asset ID: %d, Quantums: %s\n", assetPosition.AssetId, assetPosition.Quantums)
	}
	for _, perpPosition := range subaccountTwo.PerpetualPositions {
		fmt.Printf("Perpetual ID: %d, Quantums: %s\n", perpPosition.PerpetualId, perpPosition.Quantums)
	}

	resp, err = sa_testutil.MsgQuerySubaccountExec(ctx, s.validatorAddress, deleveragingTestSubaccountNumberThree)
	s.Require().NoError(err)

	s.Require().NoError(s.network.Config.Codec.UnmarshalJSON(resp.Bytes(), &subaccountResp))
	subaccountThree := subaccountResp.Subaccount

	fmt.Println("subaccountThree")
	for _, assetPosition := range subaccountThree.AssetPositions {
		fmt.Printf("Asset ID: %d, Quantums: %s\n", assetPosition.AssetId, assetPosition.Quantums)
	}
	for _, perpPosition := range subaccountThree.PerpetualPositions {
		fmt.Printf("Perpetual ID: %d, Quantums: %s\n", perpPosition.PerpetualId, perpPosition.Quantums)
	}

	// Assert that subaccount 1 has no assets positions and no perpetuals as has been fully deleveraged
	s.Require().Empty(subaccountThree.AssetPositions)
	s.Require().Empty(subaccountThree.PerpetualPositions)

	// Assert that subaccount 0 has a perpetual position of -10,000,000
	s.Require().Len(subaccountTwo.PerpetualPositions, 1)
	s.Require().Equal(subaccountTwo.PerpetualPositions[0].Quantums, dtypes.NewInt(-10_000_000))
	s.Require().Equal(subaccountTwo.PerpetualPositions[0].PerpetualId, uint32(10))

	// Assert that subaccount 0 has asset balance of 50_000_000_000_000 - 5_500_100_000_000
	s.Require().Len(subaccountTwo.AssetPositions, 1)
	s.Require().Equal(subaccountTwo.AssetPositions[0].Quantums, dtypes.NewInt(50_000_000_000_000-5_500_100_000_000))
	s.Require().Equal(subaccountTwo.AssetPositions[0].AssetId, uint32(1))

	// Check that the `subaccounts` module account has expected remaining TDai balance.
	collateralPoolAddress := satypes.ModuleName + ":1"

	saModuleBtcBalance, err := testutil_bank.GetModuleAccAssetBalance(
		val,
		s.network.Config.Codec,
		satypes.ModuleName,
		"btc-denom",
	)

	s.Require().NoError(err)
	s.Require().Equal(
		deleveragingTestInitialSubaccountModuleAccBalanceBTC,
		saModuleBtcBalance,
	)

	collateralPoolModuleBtcBalance, err := testutil_bank.GetModuleAccAssetBalance(
		val,
		s.network.Config.Codec,
		collateralPoolAddress,
		"btc-denom",
	)

	s.Require().NoError(err)
	s.Require().Equal(
		deleveragingTestInitialSubaccountModuleAccBalanceBTC,
		collateralPoolModuleBtcBalance,
	)
}
