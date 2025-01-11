//go:build all || integration_test

package cli_test

import (
	"fmt"
	"math"
	"math/big"
	"testing"

	appconstants "github.com/StreamFinance-Protocol/stream-chain/protocol/app/constants"
	appflags "github.com/StreamFinance-Protocol/stream-chain/protocol/app/flags"
	daemonflags "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/flags"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/appoptions"
	testutil_bank "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/bank"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/network"
	cli_testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/client/testutil"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	epochstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/epochs/types"
	feetierstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/feetiers/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	sa_testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/client/testutil"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	networktestutil "github.com/cosmos/cosmos-sdk/testutil/network"
	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	"github.com/stretchr/testify/suite"
)

var (
	initialQuoteBalance               = int64(1_000_000_000)  // $1,000.
	initialSubaccountModuleAccBalance = int64(10_000_000_000) // $10,000.
	subaccountNumberZero              = uint32(0)
	subaccountNumberOne               = uint32(1)
	subaccountNumberTwo               = uint32(2)
	subaccountNumberThree             = uint32(3)
)

type PlaceOrderIntegrationTestSuite struct {
	suite.Suite

	validatorAddress sdk.AccAddress
	cfg              network.Config
	network          *network.Network
}

func TestPlaceOrderIntegrationTestSuite(t *testing.T) {
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
		},
	})

	cfg.Mnemonics = append(cfg.Mnemonics, validatorMnemonic)
	cfg.ChainID = appconstants.AppName

	suite.Run(t, NewPlaceOrderIntegrationTestSuite(cfg, validatorAddress))
}

func NewPlaceOrderIntegrationTestSuite(
	cfg network.Config,
	validatorAddress sdk.AccAddress,
) *PlaceOrderIntegrationTestSuite {
	return &PlaceOrderIntegrationTestSuite{cfg: cfg, validatorAddress: validatorAddress}
}

func (s *PlaceOrderIntegrationTestSuite) SetupSuite() {
	s.T().Log("setting up place order integration test suite")

	s.cfg.MinGasPrices = fmt.Sprintf("0%s", sdk.DefaultBondDenom)

	state := types.GenesisState{}

	state.ClobPairs = append(state.ClobPairs, constants.ClobPair_Btc)
	state.ClobPairs = append(state.ClobPairs, constants.ClobPair_BtcBtc)
	state.LiquidationsConfig = types.LiquidationsConfig_NoFee

	perpstate := perptypes.GenesisState{}
	perpstate.LiquidityTiers = constants.LiquidityTiers
	perpstate.CollateralPools = constants.CollateralPools
	perpstate.Params = constants.PerpetualsGenesisParams
	perpstate.Perpetuals = append(perpstate.Perpetuals, constants.BtcUsd_50PercentInitial_40PercentMaintenance)
	perpstate.Perpetuals = append(perpstate.Perpetuals, constants.BtcBtc_10_20MarginRequirement_CollatPool1_Id10)

	pricesstate := constants.Prices_DefaultGenesisState

	buf, err := s.cfg.Codec.MarshalJSON(&state)
	s.NoError(err)
	s.cfg.GenesisState[types.ModuleName] = buf

	// Set the balances in the genesis state.
	s.cfg.GenesisState[banktypes.ModuleName] = cli_testutil.CreateBankGenesisState(
		s.T(),
		s.cfg,
	)

	sastate := satypes.GenesisState{}
	sastate.Subaccounts = append(
		sastate.Subaccounts,
		satypes.Subaccount{
			Id: &satypes.SubaccountId{Owner: s.validatorAddress.String(), Number: subaccountNumberZero},
			AssetPositions: []*satypes.AssetPosition{
				{
					AssetId:  0,
					Quantums: dtypes.NewInt(initialQuoteBalance),
				},
			},
			PerpetualPositions: []*satypes.PerpetualPosition{},
		},
		satypes.Subaccount{
			Id: &satypes.SubaccountId{Owner: s.validatorAddress.String(), Number: subaccountNumberOne},
			AssetPositions: []*satypes.AssetPosition{
				{
					AssetId:  0,
					Quantums: dtypes.NewInt(initialQuoteBalance),
				},
			},
			PerpetualPositions: []*satypes.PerpetualPosition{},
		},
		satypes.Subaccount{
			Id: &satypes.SubaccountId{Owner: s.validatorAddress.String(), Number: subaccountNumberTwo},
			AssetPositions: []*satypes.AssetPosition{
				{
					AssetId:  1,
					Quantums: dtypes.NewInt(initialQuoteBalance),
				},
			},
			PerpetualPositions: []*satypes.PerpetualPosition{},
		},
		satypes.Subaccount{
			Id: &satypes.SubaccountId{Owner: s.validatorAddress.String(), Number: subaccountNumberThree},
			AssetPositions: []*satypes.AssetPosition{
				{
					AssetId:  1,
					Quantums: dtypes.NewInt(initialQuoteBalance),
				},
			},
			PerpetualPositions: []*satypes.PerpetualPosition{},
		},
	)

	// Ensure that no funding payments will occur during this test.
	epstate := constants.GenerateEpochGenesisStateWithoutFunding()

	feeTiersState := feetierstypes.GenesisState{}
	feeTiersState.Params = constants.PerpetualFeeParamsMakerRebate

	epbuf, err := s.cfg.Codec.MarshalJSON(&epstate)
	s.Require().NoError(err)
	s.cfg.GenesisState[epochstypes.ModuleName] = epbuf

	sabuf, err := s.cfg.Codec.MarshalJSON(&sastate)
	s.Require().NoError(err)
	s.cfg.GenesisState[satypes.ModuleName] = sabuf

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

// TestCLIPlaceOrder places two orders from two different subaccounts (with the same owner and different numbers).
// The account which places the orders is also the validator's AccAddress.
// The orders placed are expected to match, and after matching, the subaccounts are queried and assertions
// are performed on their QuoteBalance and PerpetualPositions.
func (s *PlaceOrderIntegrationTestSuite) TestCLIPlaceOrder() {
	val := s.network.Validators[0]
	ctx := val.ClientCtx

	currentHeight, err := s.network.LatestHeight()
	s.Require().NoError(err)

	goodTilBlock := uint32(currentHeight) + types.ShortBlockWindow
	clientId := uint64(1)
	quantums := satypes.BaseQuantums(1_000)
	subticks := types.Subticks(50_000_000_000)

	// Place the first order.
	_, err = cli_testutil.MsgPlaceOrderExec(
		ctx,
		s.validatorAddress,
		subaccountNumberZero,
		clientId,
		constants.ClobPair_Btc.Id,
		types.Order_SIDE_BUY,
		quantums,
		subticks.ToUint64(),
		goodTilBlock,
	)
	s.Require().NoError(err)

	// Place the second order.
	_, err = cli_testutil.MsgPlaceOrderExec(
		ctx,
		s.validatorAddress,
		subaccountNumberOne,
		clientId,
		constants.ClobPair_Btc.Id,
		types.Order_SIDE_SELL,
		quantums,
		subticks.ToUint64(),
		goodTilBlock,
	)
	s.Require().NoError(err)

	currentHeight, err = s.network.LatestHeight()
	s.Require().NoError(err)

	// Wait for a few blocks to ensure the orders were matched and included in a block.
	_, err = s.network.WaitForHeight(currentHeight + 3)
	s.Require().NoError(err)

	// Query both subaccounts.
	resp, err := sa_testutil.MsgQuerySubaccountExec(ctx, s.validatorAddress, subaccountNumberZero)
	s.Require().NoError(err)

	var subaccountResp satypes.QuerySubaccountResponse
	s.Require().NoError(s.network.Config.Codec.UnmarshalJSON(resp.Bytes(), &subaccountResp))
	subaccountZero := subaccountResp.Subaccount

	resp, err = sa_testutil.MsgQuerySubaccountExec(ctx, s.validatorAddress, subaccountNumberOne)
	s.Require().NoError(err)

	s.Require().NoError(s.network.Config.Codec.UnmarshalJSON(resp.Bytes(), &subaccountResp))
	subaccountOne := subaccountResp.Subaccount

	// Compute the fill price so as to know how much QuoteBalance should be remaining.
	fillSizeQuoteQuantums := types.FillAmountToQuoteQuantums(
		subticks,
		quantums,
		constants.ClobPair_Btc.QuantumConversionExponent,
	).Int64()

	// Assert that both Subaccounts have the appropriate state.
	// Order could be maker or taker after Uncross, so assert that account could have been either.
	takerFee := fillSizeQuoteQuantums *
		int64(constants.PerpetualFeeParamsMakerRebate.Tiers[0].TakerFeePpm) / int64(lib.OneMillion)
	makerFee := fillSizeQuoteQuantums *
		int64(constants.PerpetualFeeParamsMakerRebate.Tiers[0].MakerFeePpm) / int64(lib.OneMillion)

	s.Require().Contains(
		[]*big.Int{
			new(big.Int).SetInt64(initialQuoteBalance - fillSizeQuoteQuantums - takerFee),
			new(big.Int).SetInt64(initialQuoteBalance - fillSizeQuoteQuantums - makerFee),
		},
		subaccountZero.GetTDaiPosition(),
	)
	s.Require().Len(subaccountZero.PerpetualPositions, 1)
	s.Require().Equal(quantums.ToBigInt(), subaccountZero.PerpetualPositions[0].GetBigQuantums())

	s.Require().Contains(
		[]*big.Int{
			new(big.Int).SetInt64(initialQuoteBalance + fillSizeQuoteQuantums - takerFee),
			new(big.Int).SetInt64(initialQuoteBalance + fillSizeQuoteQuantums - makerFee),
		},
		subaccountOne.GetTDaiPosition(),
	)
	s.Require().Len(subaccountOne.PerpetualPositions, 1)
	// Check that position is short and has the right size.
	s.Require().Equal(new(big.Int).Neg(quantums.ToBigInt()), subaccountOne.PerpetualPositions[0].GetBigQuantums())

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
		initialSubaccountModuleAccBalance-initialQuoteBalance-initialQuoteBalance,
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
		initialQuoteBalance+initialQuoteBalance-takerFee-makerFee,
		collateralPoolModuleTDaiBalance,
	)

	// Check that the `distribution` module account has expected remaining TDai balance.
	// During `BeginBlock()`, the `fee-collector` module account will send all fees
	// to the `distribution` module account, and the fees will stay in `distribution`
	// until withdrawn. More details at:
	// https://docs.cosmos.network/v0.45/modules/distribution/03_begin_block.html#the-distribution-scheme
	distrModuleTDaiBalance, err := testutil_bank.GetModuleAccAssetBalance(
		val,
		s.network.Config.Codec,
		distrtypes.ModuleName,
		"utdai",
	)

	s.Require().NoError(err)
	s.Require().Equal(makerFee+takerFee, distrModuleTDaiBalance)
}

func (s *PlaceOrderIntegrationTestSuite) TestCLIPlaceOrderBTCCollat() {
	val := s.network.Validators[0]
	ctx := val.ClientCtx

	currentHeight, err := s.network.LatestHeight()
	s.Require().NoError(err)

	goodTilBlock := uint32(currentHeight) + types.ShortBlockWindow
	clientId := uint64(1)
	quantums := satypes.BaseQuantums(1_000)
	subticks := types.Subticks(50_000_000_000)

	// Place the first order.
	_, err = cli_testutil.MsgPlaceOrderExec(
		ctx,
		s.validatorAddress,
		subaccountNumberTwo,
		clientId,
		constants.ClobPair_BtcBtc.Id,
		types.Order_SIDE_BUY,
		quantums,
		subticks.ToUint64(),
		goodTilBlock,
	)
	s.Require().NoError(err)

	// Place the second order.
	_, err = cli_testutil.MsgPlaceOrderExec(
		ctx,
		s.validatorAddress,
		subaccountNumberThree,
		clientId,
		constants.ClobPair_BtcBtc.Id,
		types.Order_SIDE_SELL,
		quantums,
		subticks.ToUint64(),
		goodTilBlock,
	)
	s.Require().NoError(err)

	currentHeight, err = s.network.LatestHeight()
	s.Require().NoError(err)

	// Wait for a few blocks to ensure the orders were matched and included in a block.
	_, err = s.network.WaitForHeight(currentHeight + 3)
	s.Require().NoError(err)

	// Query both subaccounts.
	resp, err := sa_testutil.MsgQuerySubaccountExec(ctx, s.validatorAddress, subaccountNumberTwo)
	s.Require().NoError(err)

	var subaccountResp satypes.QuerySubaccountResponse
	s.Require().NoError(s.network.Config.Codec.UnmarshalJSON(resp.Bytes(), &subaccountResp))
	subaccountTwo := subaccountResp.Subaccount

	resp, err = sa_testutil.MsgQuerySubaccountExec(ctx, s.validatorAddress, subaccountNumberThree)
	s.Require().NoError(err)

	s.Require().NoError(s.network.Config.Codec.UnmarshalJSON(resp.Bytes(), &subaccountResp))
	subaccountThree := subaccountResp.Subaccount

	// Compute the fill price so as to know how much QuoteBalance should be remaining.
	fillSizeQuoteQuantums := types.FillAmountToQuoteQuantums(
		subticks,
		quantums,
		constants.ClobPair_BtcBtc.QuantumConversionExponent,
	).Int64()

	// Assert that both Subaccounts have the appropriate state.
	// Order could be maker or taker after Uncross, so assert that account could have been either.
	takerFee := fillSizeQuoteQuantums *
		int64(constants.PerpetualFeeParamsMakerRebate.Tiers[0].TakerFeePpm) / int64(lib.OneMillion)
	makerFee := fillSizeQuoteQuantums *
		int64(constants.PerpetualFeeParamsMakerRebate.Tiers[0].MakerFeePpm) / int64(lib.OneMillion)

	s.Require().Contains(
		[]*big.Int{
			new(big.Int).SetInt64(initialQuoteBalance - fillSizeQuoteQuantums - takerFee),
			new(big.Int).SetInt64(initialQuoteBalance - fillSizeQuoteQuantums - makerFee),
		},
		subaccountTwo.GetAssetPosition(1),
	)
	s.Require().Len(subaccountTwo.PerpetualPositions, 1)
	s.Require().Equal(quantums.ToBigInt(), subaccountTwo.PerpetualPositions[0].GetBigQuantums())

	s.Require().Contains(
		[]*big.Int{
			new(big.Int).SetInt64(initialQuoteBalance + fillSizeQuoteQuantums - takerFee),
			new(big.Int).SetInt64(initialQuoteBalance + fillSizeQuoteQuantums - makerFee),
		},
		subaccountThree.GetAssetPosition(1),
	)
	s.Require().Len(subaccountThree.PerpetualPositions, 1)
	// Check that position is short and has the right size.
	s.Require().Equal(new(big.Int).Neg(quantums.ToBigInt()), subaccountThree.PerpetualPositions[0].GetBigQuantums())

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
		initialSubaccountModuleAccBalance-initialQuoteBalance-initialQuoteBalance,
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
		initialQuoteBalance+initialQuoteBalance-takerFee-makerFee,
		collateralPoolModuleBtcBalance,
	)

	// Check that the `distribution` module account has expected remaining TDai balance.
	// During `BeginBlock()`, the `fee-collector` module account will send all fees
	// to the `distribution` module account, and the fees will stay in `distribution`
	// until withdrawn. More details at:
	// https://docs.cosmos.network/v0.45/modules/distribution/03_begin_block.html#the-distribution-scheme
	distrModuleBtcBalance, err := testutil_bank.GetModuleAccAssetBalance(
		val,
		s.network.Config.Codec,
		distrtypes.ModuleName,
		"btc-denom",
	)

	s.Require().NoError(err)
	s.Require().Equal(makerFee+takerFee, distrModuleBtcBalance)
}
