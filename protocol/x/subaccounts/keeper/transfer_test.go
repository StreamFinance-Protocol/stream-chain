package keeper_test

import (
	"math"
	"math/big"
	"testing"

	sdkmath "cosmossdk.io/math"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	auth_testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/auth"
	bank_testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/bank"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	pricestest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/prices"
	sample_testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/sample"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets"
	asstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/stretchr/testify/require"
)

func TestWithdrawFundsFromSubaccountToAccount_DepositFundsFromAccountToSubaccount_Success(t *testing.T) {
	tests := map[string]struct {
		testTransferFundToAccount bool
		asset                     asstypes.Asset

		// Subaccount state.
		assetPositions     []*types.AssetPosition
		perpetualPositions []*types.PerpetualPosition

		// Module account state.
		subaccountModuleAccBalance *big.Int
		accAddressBalance          *big.Int

		// Transfer details.
		quantums *big.Int

		collateralPoolAddr sdk.AccAddress

		// Expectations.
		expectedAssetPositions              []*types.AssetPosition
		expectedQuoteBalance                *big.Int
		expectedSubaccountsModuleAccBalance *big.Int
		expectedAccAddressBalance           *big.Int
	}{
		"WithdrawFundsFromSubaccountToAccount: send from subaccount to an account address": {

			testTransferFundToAccount:  true,
			asset:                      *constants.TDai,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedQuoteBalance:                big.NewInt(0),    // 500 - 500
			expectedSubaccountsModuleAccBalance: big.NewInt(100),  // 600 - 100
			expectedAccAddressBalance:           big.NewInt(3000), // 500 + 2500
		},
		"WithdrawFundsFromSubaccountToAccount: send from subaccount to an account address - non tdai collat": {

			testTransferFundToAccount:  true,
			asset:                      *constants.BtcUsd,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote,
			},
			collateralPoolAddr:                  types.CollateralPoolOneAddress,
			expectedQuoteBalance:                big.NewInt(0),    // 500 - 500
			expectedSubaccountsModuleAccBalance: big.NewInt(100),  // 600 - 100
			expectedAccAddressBalance:           big.NewInt(3000), // 500 + 2500
		},
		"WithdrawFundsFromSubaccountToAccount: send from isolated subaccount to an account address": {
			testTransferFundToAccount:  true,
			asset:                      *constants.TDai,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneISOLong,
			},
			collateralPoolAddr:                  types.CollateralPoolTwoAddress,
			expectedQuoteBalance:                big.NewInt(0),    // 500 - 500
			expectedSubaccountsModuleAccBalance: big.NewInt(100),  // 600 - 100
			expectedAccAddressBalance:           big.NewInt(3000), // 500 + 2500
		},
		"WithdrawFundsFromSubaccountToAccount: send from isolated subaccount to an account address - non tdai collat": {
			testTransferFundToAccount:  true,
			asset:                      *constants.BtcUsd,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote,
			},
			collateralPoolAddr:                  types.CollateralPoolOneAddress,
			expectedQuoteBalance:                big.NewInt(0),    // 500 - 500
			expectedSubaccountsModuleAccBalance: big.NewInt(100),  // 600 - 100
			expectedAccAddressBalance:           big.NewInt(3000), // 500 + 2500
		},
		"WithdrawFundsFromSubaccountToAccount: DenomeExponent > AtomicResolution, quantums rounded down": {
			testTransferFundToAccount: true,
			asset: asstypes.Asset{
				Id:               0,
				Symbol:           "TDai",
				Denom:            asstypes.AssetTDai.Denom,
				DenomExponent:    int32(-6), // $1 = 1_000_000 coin unit.
				HasMarket:        false,
				MarketId:         uint32(0),
				AtomicResolution: int32(-7), // $1 = 10_000_000 quantums
			},
			accAddressBalance:          big.NewInt(2_500_000),  // $2.5
			subaccountModuleAccBalance: big.NewInt(10_000_000), // $10
			quantums:                   big.NewInt(20_000_001), // $2.0000001, only $2 transferred.
			assetPositions: keepertest.CreateTDaiAssetPosition(
				big.NewInt(30_000_001),
			), // $3.0001
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedQuoteBalance:                big.NewInt(10_000_001), // $1.0001, untransfered $0.0001 remains.
			expectedSubaccountsModuleAccBalance: big.NewInt(8_000_000),  // $8
			expectedAccAddressBalance:           big.NewInt(4_500_000),  // $2.5 + $2
		},
		"DepositFundsFromAccountToSubaccount: send from account to subaccount": {
			testTransferFundToAccount:  false,
			asset:                      *constants.TDai,
			subaccountModuleAccBalance: big.NewInt(200),
			accAddressBalance:          big.NewInt(2000),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(150)),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedQuoteBalance:                big.NewInt(650),  // 150 + 500
			expectedSubaccountsModuleAccBalance: big.NewInt(700),  // 200 + 500
			expectedAccAddressBalance:           big.NewInt(1500), // 2000 - 500
		},
		"DepositFundsFromAccountToSubaccount: send from account to subaccount - non tdai collat": {
			testTransferFundToAccount:  false,
			asset:                      *constants.BtcUsd,
			subaccountModuleAccBalance: big.NewInt(200),
			accAddressBalance:          big.NewInt(2000),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateBtcAssetPosition(big.NewInt(150)),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote,
			},
			collateralPoolAddr:                  types.CollateralPoolOneAddress,
			expectedQuoteBalance:                big.NewInt(650),  // 150 + 500
			expectedSubaccountsModuleAccBalance: big.NewInt(700),  // 200 + 500
			expectedAccAddressBalance:           big.NewInt(1500), // 2000 - 500
		},
		"DepositFundsFromAccountToSubaccount: send from account to isolated subaccount": {
			testTransferFundToAccount:  false,
			asset:                      *constants.TDai,
			subaccountModuleAccBalance: big.NewInt(200),
			accAddressBalance:          big.NewInt(2000),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(150)),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneISOLong,
			},
			collateralPoolAddr:                  types.CollateralPoolTwoAddress,
			expectedQuoteBalance:                big.NewInt(650),  // 150 + 500
			expectedSubaccountsModuleAccBalance: big.NewInt(700),  // 200 + 500
			expectedAccAddressBalance:           big.NewInt(1500), // 2000 - 500
		},
		"DepositFundsFromAccountToSubaccount: send from account to subaccount, DenomExponent < AtomicResolution": {
			testTransferFundToAccount: false,
			asset: asstypes.Asset{
				Id:               0,
				Symbol:           "TDai",
				Denom:            asstypes.AssetTDai.Denom,
				DenomExponent:    int32(-6), // $1 = 1_000_000 coin unit.
				HasMarket:        false,
				MarketId:         uint32(0),
				AtomicResolution: int32(-5), // $1 = 100_000 quantums
			},
			subaccountModuleAccBalance: big.NewInt(2_000_000),                                   // $2
			accAddressBalance:          big.NewInt(9_000_000),                                   // $9
			quantums:                   big.NewInt(502_100),                                     // $5.021
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(105_000)), // $1.05
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedQuoteBalance:                big.NewInt(607_100),   // $1.05 + $5.021
			expectedSubaccountsModuleAccBalance: big.NewInt(7_021_000), // $2 + $5.021
			expectedAccAddressBalance:           big.NewInt(3_979_000), // $9 - $5.021
		},
		"DepositFundsFromAccountToSubaccount: new balance reaches max int64": {
			testTransferFundToAccount:  false,
			accAddressBalance:          big.NewInt(500),
			asset:                      *constants.TDai,
			subaccountModuleAccBalance: new(big.Int).SetUint64(math.MaxUint64 - 100),
			quantums:                   big.NewInt(500),
			assetPositions: keepertest.CreateTDaiAssetPosition(
				new(big.Int).SetUint64(math.MaxUint64 - 100),
			),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			collateralPoolAddr: types.CollateralPoolZeroAddress,
			expectedQuoteBalance: new(big.Int).Add(
				new(big.Int).SetUint64(math.MaxUint64),
				big.NewInt(400),
			),
			expectedSubaccountsModuleAccBalance: new(big.Int).Add(
				new(big.Int).SetUint64(math.MaxUint64),
				big.NewInt(400),
			),
			expectedAccAddressBalance: big.NewInt(0),
		},
		"DepositFundsFromAccountToSubaccount: new balance reaches max int64 - non tdai collat": {
			testTransferFundToAccount:  false,
			accAddressBalance:          big.NewInt(500),
			asset:                      *constants.BtcUsd,
			subaccountModuleAccBalance: new(big.Int).SetUint64(math.MaxUint64 - 100),
			quantums:                   big.NewInt(500),
			assetPositions: keepertest.CreateBtcAssetPosition(
				new(big.Int).SetUint64(math.MaxUint64 - 100),
			),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote,
			},
			collateralPoolAddr: types.CollateralPoolOneAddress,
			expectedQuoteBalance: new(big.Int).Add(
				new(big.Int).SetUint64(math.MaxUint64),
				big.NewInt(400),
			),
			expectedSubaccountsModuleAccBalance: new(big.Int).Add(
				new(big.Int).SetUint64(math.MaxUint64),
				big.NewInt(400),
			),
			expectedAccAddressBalance: big.NewInt(0),
		},

		// TODO(DEC-715): Add more test for non-TDai assets, after asset update
		// is implemented.
		// TODO(CORE-169): Add tests for when the input quantums is rounded down to
		// a integer denom amount.
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx, keeper, pricesKeeper, perpetualsKeeper, accountKeeper, bankKeeper, assetsKeeper, ratelimitKeeper, _, _ := keepertest.SubaccountsKeepers(t, true)
			prices.InitGenesis(ctx, *pricesKeeper, constants.Prices_DefaultGenesisState)

			_, err := assetsKeeper.CreateAsset(
				ctx,
				tc.asset.Id,
				tc.asset.Symbol,
				tc.asset.Denom,
				tc.asset.DenomExponent,
				tc.asset.HasMarket,
				tc.asset.MarketId,
				tc.asset.AtomicResolution,
				tc.asset.AssetYieldIndex,
				tc.asset.MaxSlippagePpm,
			)
			require.NoError(t, err)

			if tc.asset.Id != 0 {
				_, err = assetsKeeper.CreateAsset(
					ctx,
					asstypes.AssetTDai.Id,
					asstypes.AssetTDai.Symbol,
					asstypes.AssetTDai.Denom,
					asstypes.AssetTDai.DenomExponent,
					asstypes.AssetTDai.HasMarket,
					asstypes.AssetTDai.MarketId,
					asstypes.AssetTDai.AtomicResolution,
					asstypes.AssetTDai.AssetYieldIndex,
					asstypes.AssetTDai.MaxSlippagePpm,
				)
			} else {
				err = keepertest.CreateBTCAsset(ctx, assetsKeeper)
			}
			require.NoError(t, err)

			keepertest.CreateNonDefaultTestMarkets(t, ctx, pricesKeeper)

			keepertest.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			keepertest.CreateTestCollateralPools(t, ctx, perpetualsKeeper)

			keepertest.CreateTestPerpetuals(t, ctx, perpetualsKeeper)

			ratelimitKeeper.SetAssetYieldIndex(ctx, big.NewRat(1, 1))

			// Set up Subaccounts module account.
			auth_testutil.CreateTestModuleAccount(ctx, accountKeeper, types.ModuleName, []string{})

			// Set up test account address.
			addressStr := sample_testutil.AccAddress()
			testAccAddress, err := sdk.AccAddressFromBech32(addressStr)
			require.NoError(t, err)

			testAcc := authtypes.NewBaseAccount(testAccAddress, nil, accountKeeper.NextAccountNumber(ctx), 0)
			accountKeeper.SetAccount(ctx, testAcc)

			if tc.accAddressBalance.Sign() > 0 {
				// Mint asset in the receipt/sender account address for transfer.
				err := bank_testutil.FundAccount(
					ctx,
					testAccAddress,
					sdk.Coins{
						sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.accAddressBalance)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			subaccount := createNSubaccount(keeper, ctx, 1, big.NewInt(1_000))[0]
			subaccount.AssetPositions = tc.assetPositions
			subaccount.PerpetualPositions = tc.perpetualPositions

			keeper.SetSubaccount(ctx, subaccount)

			if tc.subaccountModuleAccBalance.Sign() > 0 {
				err := bank_testutil.FundAccount(
					ctx,
					tc.collateralPoolAddr,
					sdk.Coins{
						sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.subaccountModuleAccBalance)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			// Test either WithdrawFundsFromSubaccountToAccount or DepositFundsFromAccountToSubaccount.
			if tc.testTransferFundToAccount {
				err = keeper.WithdrawFundsFromSubaccountToAccount(
					ctx,
					*subaccount.Id,
					testAccAddress,
					tc.asset.Id,
					tc.quantums,
				)
			} else {
				err = keeper.DepositFundsFromAccountToSubaccount(
					ctx,
					testAccAddress,
					*subaccount.Id,
					tc.asset.Id,
					tc.quantums,
				)
			}

			require.NoError(t, err)

			// Check the subaccount has been updated as expected.
			updatedSubaccount := keeper.GetSubaccount(ctx, *subaccount.Id)
			if tc.expectedAssetPositions != nil {
				require.Equal(t,
					tc.expectedAssetPositions,
					updatedSubaccount.AssetPositions,
				)
			}
			require.Equal(t,
				tc.expectedQuoteBalance,
				updatedSubaccount.GetAssetPosition(tc.asset.Id),
			)

			// Check the subaccount module balance.
			subaccountsModuleAccBalance := bankKeeper.GetBalance(ctx, tc.collateralPoolAddr, tc.asset.Denom)
			require.Equal(t,
				sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.expectedSubaccountsModuleAccBalance)),
				subaccountsModuleAccBalance,
			)

			// Check the test account balance has been updated as expected.
			testAccountBalance := bankKeeper.GetBalance(
				ctx, testAccAddress,
				tc.asset.Denom,
			)
			require.Equal(t,
				sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.expectedAccAddressBalance)),
				testAccountBalance,
			)
		})
	}
}

func TestWithdrawFundsFromSubaccountToAccount_DepositFundsFromAccountToSubaccount_Failure(t *testing.T) {
	tests := map[string]struct {
		skipSetUpTDai             bool
		testTransferFundToAccount bool
		asset                     asstypes.Asset

		// Subaccount state.
		assetPositions     []*types.AssetPosition
		perpetualPositions []*types.PerpetualPosition
		collateralPoolAddr sdk.AccAddress

		// Module account state.
		subaccountModuleAccBalance *big.Int
		accAddressBalance          *big.Int

		// Transfer details
		quantums *big.Int

		// Expectations.
		expectedErr error
	}{
		"WithdrawFundsFromSubaccountToAccount: subaccount does not have enough balance to transfer": {
			testTransferFundToAccount:  true,
			asset:                      *constants.TDai,
			accAddressBalance:          big.NewInt(1000),
			subaccountModuleAccBalance: big.NewInt(500),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(100)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                types.ErrFailedToUpdateSubaccounts,
		},
		"WithdrawFundsFromSubaccountToAccount: subaccount does not have enough balance to transfer - non tdai collat": {
			testTransferFundToAccount:  true,
			asset:                      *constants.BtcUsd,
			accAddressBalance:          big.NewInt(1000),
			subaccountModuleAccBalance: big.NewInt(500),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateBtcAssetPosition(big.NewInt(100)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                types.ErrFailedToUpdateSubaccounts,
		},
		"WithdrawFundsFromSubaccountToAccount: subaccounts module account does not have enough balance": {
			testTransferFundToAccount:  true,
			asset:                      *constants.TDai,
			subaccountModuleAccBalance: big.NewInt(400),
			accAddressBalance:          big.NewInt(5000),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                sdkerrors.ErrInsufficientFunds,
		},
		"WithdrawFundsFromSubaccountToAccount: transfer is from incorrect collat pool - tdai asset": {
			testTransferFundToAccount:  true,
			asset:                      *constants.TDai,
			subaccountModuleAccBalance: big.NewInt(5000),
			accAddressBalance:          big.NewInt(1000),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote,
			},
			collateralPoolAddr: types.ModuleAddress,
			expectedErr:        types.ErrFailedToUpdateSubaccounts,
		},
		"WithdrawFundsFromSubaccountToAccount: transfer is from incorrect collat pool - btc asset": {
			testTransferFundToAccount:  true,
			asset:                      *constants.BtcUsd,
			subaccountModuleAccBalance: big.NewInt(5000),
			accAddressBalance:          big.NewInt(1000),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			collateralPoolAddr: types.ModuleAddress,
			expectedErr:        types.ErrFailedToUpdateSubaccounts,
		},
		"WithdrawFundsFromSubaccountToAccount: subaccounts module account does not have enough balance - non tdai collat": {
			testTransferFundToAccount:  true,
			asset:                      *constants.BtcUsd,
			subaccountModuleAccBalance: big.NewInt(400),
			accAddressBalance:          big.NewInt(5000),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                sdkerrors.ErrInsufficientFunds,
		},
		"WithdrawFundsFromSubaccountToAccount: transfer quantums is zero": {
			testTransferFundToAccount:  true,
			asset:                      *constants.TDai,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(0),
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                types.ErrAssetTransferQuantumsNotPositive,
		},
		"WithdrawFundsFromSubaccountToAccount: transfer quantums is zero - non tdai collat": {
			testTransferFundToAccount:  true,
			asset:                      *constants.BtcUsd,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(0),
			assetPositions:             keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                types.ErrAssetTransferQuantumsNotPositive,
		},
		"WithdrawFundsFromSubaccountToAccount: transfer quantums is negative": {
			testTransferFundToAccount:  true,
			asset:                      *constants.TDai,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(-100),
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                types.ErrAssetTransferQuantumsNotPositive,
		},
		"WithdrawFundsFromSubaccountToAccount: transfer quantums is negative - non tdai collat": {
			testTransferFundToAccount:  true,
			asset:                      *constants.BtcUsd,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(-100),
			assetPositions:             keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                types.ErrAssetTransferQuantumsNotPositive,
		},
		"DepositFundsFromAccountToSubaccount: fee-collector does not have enough balance to transfer": {
			testTransferFundToAccount:  false,
			accAddressBalance:          big.NewInt(100),
			asset:                      *constants.TDai,
			subaccountModuleAccBalance: big.NewInt(2000),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                sdkerrors.ErrInsufficientFunds,
		},
		"DepositFundsFromAccountToSubaccount: fee-collector does not have enough balance to transfer - non tdai collat": {
			testTransferFundToAccount:  false,
			accAddressBalance:          big.NewInt(100),
			asset:                      *constants.BtcUsd,
			subaccountModuleAccBalance: big.NewInt(2000),
			quantums:                   big.NewInt(500),
			assetPositions:             keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                sdkerrors.ErrInsufficientFunds,
		},
		"DepositFundsFromAccountToSubaccount: transfer quantums is zero": {
			testTransferFundToAccount:  false,
			asset:                      *constants.TDai,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(0),
			assetPositions:             keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                types.ErrAssetTransferQuantumsNotPositive,
		},
		"DepositFundsFromAccountToSubaccount: transfer quantums is zero - non tdai collat": {
			testTransferFundToAccount:  false,
			asset:                      *constants.BtcUsd,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(0),
			assetPositions:             keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			collateralPoolAddr:         types.ModuleAddress,
			expectedErr:                types.ErrAssetTransferQuantumsNotPositive,
		},
		"DepositFundsFromAccountToSubaccount: transfer is from incorrect collat pool - non tdai asset": {
			testTransferFundToAccount:  false,
			asset:                      *constants.BtcUsd,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(10),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			assetPositions:     keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			collateralPoolAddr: types.ModuleAddress,
			expectedErr:        types.ErrFailedToUpdateSubaccounts,
		},
		"DepositFundsFromAccountToSubaccount: transfer is from incorrect collat pool - tdai asset": {
			testTransferFundToAccount:  false,
			asset:                      *constants.TDai,
			accAddressBalance:          big.NewInt(2500),
			subaccountModuleAccBalance: big.NewInt(600),
			quantums:                   big.NewInt(10),
			perpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote,
			},
			assetPositions:     keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			collateralPoolAddr: types.ModuleAddress,
			expectedErr:        types.ErrFailedToUpdateSubaccounts,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx, keeper, pricesKeeper, perpetualsKeeper, accountKeeper, bankKeeper, assetsKeeper, ratelimitKeeper, _, _ := keepertest.SubaccountsKeepers(t, true)
			keepertest.CreateTestMarkets(t, ctx, pricesKeeper)

			if !tc.skipSetUpTDai {
				// Always create TDai as the first asset unless specificed to skip.
				err := keepertest.CreateTDaiAsset(ctx, assetsKeeper)
				require.NoError(t, err)
			}

			if tc.asset.Denom != constants.TDai.Denom {
				_, err := assetsKeeper.CreateAsset(
					ctx,
					tc.asset.Id,
					tc.asset.Symbol,
					tc.asset.Denom,
					tc.asset.DenomExponent,
					tc.asset.HasMarket,
					tc.asset.MarketId,
					tc.asset.AtomicResolution,
					tc.asset.AssetYieldIndex,
					tc.asset.MaxSlippagePpm,
				)
				require.NoError(t, err)
			} else {
				err := keepertest.CreateBTCAsset(ctx, assetsKeeper)
				require.NoError(t, err)
			}

			keepertest.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			keepertest.CreateTestCollateralPools(t, ctx, perpetualsKeeper)

			keepertest.CreateTestPerpetuals(t, ctx, perpetualsKeeper)

			ratelimitKeeper.SetAssetYieldIndex(ctx, big.NewRat(1, 1))

			// Set up Subaccounts module account.
			auth_testutil.CreateTestModuleAccount(ctx, accountKeeper, types.ModuleName, []string{})

			// Set up test account address.
			addressStr := sample_testutil.AccAddress()
			testAccAddress, err := sdk.AccAddressFromBech32(addressStr)
			require.NoError(t, err)

			testAcc := authtypes.NewBaseAccount(testAccAddress, nil, accountKeeper.NextAccountNumber(ctx), 0)
			accountKeeper.SetAccount(ctx, testAcc)

			if tc.accAddressBalance.Sign() > 0 {
				// Mint asset in the receipt/sender account address for transfer.
				err := bank_testutil.FundAccount(
					ctx,
					testAccAddress,
					sdk.Coins{
						sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.accAddressBalance)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			subaccount := createNSubaccount(keeper, ctx, 1, big.NewInt(1_000))[0]
			subaccount.AssetPositions = tc.assetPositions
			subaccount.PerpetualPositions = tc.perpetualPositions

			keeper.SetSubaccount(ctx, subaccount)

			if tc.subaccountModuleAccBalance.Sign() > 0 {
				err := bank_testutil.FundAccount(
					ctx,
					tc.collateralPoolAddr,
					sdk.Coins{
						sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.subaccountModuleAccBalance)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			// Test either WithdrawFundsFromSubaccountToAccount or DepositFundsFromAccountToSubaccount.
			if tc.testTransferFundToAccount {
				err = keeper.WithdrawFundsFromSubaccountToAccount(
					ctx,
					*subaccount.Id,
					testAccAddress,
					tc.asset.Id,
					tc.quantums,
				)
			} else {
				err = keeper.DepositFundsFromAccountToSubaccount(
					ctx,
					testAccAddress,
					*subaccount.Id,
					tc.asset.Id,
					tc.quantums,
				)
			}

			require.ErrorIs(t,
				err,
				tc.expectedErr,
			)

			// Check the subaccount balance stays the same.
			updatedSubaccount := keeper.GetSubaccount(ctx, *subaccount.Id)

			require.Equal(t,
				tc.assetPositions[0].GetBigQuantums(),
				updatedSubaccount.GetAssetPosition(tc.asset.Id),
			)

			// Check the subaccount module balance stays the same.
			subaccountsModuleAccBalance := bankKeeper.GetBalance(ctx, tc.collateralPoolAddr, tc.asset.Denom)
			require.Equal(t,
				sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.subaccountModuleAccBalance)),
				subaccountsModuleAccBalance,
			)

			// Check the test account balance stays the same.
			testAccountBalance := bankKeeper.GetBalance(
				ctx, testAccAddress,
				tc.asset.Denom,
			)
			require.Equal(t,
				sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.accAddressBalance)),
				testAccountBalance,
			)
		})
	}
}

func TestTransferFundsFromSubaccountToSubaccount_Success(t *testing.T) {
	tests := map[string]struct {
		// transfer details
		asset    asstypes.Asset
		quantums *big.Int

		// Subaccount state.
		senderAssetPositions        []*types.AssetPosition
		senderPerpetualPositions    []*types.PerpetualPosition
		recipientAssetPositions     []*types.AssetPosition
		recipientPerpetualPositions []*types.PerpetualPosition

		// Module account state.
		senderCollateralPoolBalance    *big.Int
		recipientCollateralPoolBalance *big.Int

		senderCollateralPoolAddr    sdk.AccAddress
		recipientCollateralPoolAddr sdk.AccAddress

		// Expectations.
		expectedSenderAssetPositions           []*types.AssetPosition
		expectedRecipientAssetPositions        []*types.AssetPosition
		expectedSenderQuoteBalance             *big.Int
		expectedRecipientQuoteBalance          *big.Int
		expectedSenderCollateralPoolBalance    *big.Int
		expectedRecipientCollateralPoolBalance *big.Int
	}{
		"Send TDai from  subaccount to subaccount in same collat pool": {
			asset:                *constants.TDai,
			quantums:             big.NewInt(500),
			senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			senderPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
			recipientPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			senderCollateralPoolBalance:            big.NewInt(1100), // 500 + 600
			recipientCollateralPoolBalance:         big.NewInt(1100), // same collateral pool, same balance
			senderCollateralPoolAddr:               types.CollateralPoolZeroAddress,
			recipientCollateralPoolAddr:            types.CollateralPoolZeroAddress,
			expectedRecipientAssetPositions:        keepertest.CreateTDaiAssetPosition(big.NewInt(1100)),
			expectedSenderQuoteBalance:             big.NewInt(0),    // 500 - 500
			expectedRecipientQuoteBalance:          big.NewInt(1100), // 500 + 600
			expectedSenderCollateralPoolBalance:    big.NewInt(1100), // no changes to collateral pools
			expectedRecipientCollateralPoolBalance: big.NewInt(1100),
		},
		"Send non TDai from  subaccount to subaccount in same collat pool": {
			asset:                *constants.BtcUsd,
			quantums:             big.NewInt(500),
			senderAssetPositions: keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			senderPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote,
			},
			recipientAssetPositions: keepertest.CreateBtcAssetPosition(big.NewInt(600)),
			recipientPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote,
			},
			senderCollateralPoolBalance:            big.NewInt(1100), // 500 + 600
			recipientCollateralPoolBalance:         big.NewInt(1100), // same collateral pool, same balance
			senderCollateralPoolAddr:               types.CollateralPoolOneAddress,
			recipientCollateralPoolAddr:            types.CollateralPoolOneAddress,
			expectedRecipientAssetPositions:        keepertest.CreateBtcAssetPosition(big.NewInt(1100)),
			expectedSenderQuoteBalance:             big.NewInt(0),    // 500 - 500
			expectedRecipientQuoteBalance:          big.NewInt(1100), // 500 + 600
			expectedSenderCollateralPoolBalance:    big.NewInt(1100), // no changes to collateral pools
			expectedRecipientCollateralPoolBalance: big.NewInt(1100),
		},
		"Send TDai from subaccount to subaccount with different collat pools": {
			asset:                *constants.TDai,
			quantums:             big.NewInt(500),
			senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			senderPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneISOLong,
			},
			recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
			recipientPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			senderCollateralPoolBalance:            big.NewInt(600),
			recipientCollateralPoolBalance:         big.NewInt(700),
			senderCollateralPoolAddr:               types.CollateralPoolTwoAddress,
			recipientCollateralPoolAddr:            types.CollateralPoolZeroAddress,
			expectedRecipientAssetPositions:        keepertest.CreateTDaiAssetPosition(big.NewInt(1100)),
			expectedSenderQuoteBalance:             big.NewInt(0),    // 500 - 500
			expectedRecipientQuoteBalance:          big.NewInt(1100), // 500 + 600
			expectedSenderCollateralPoolBalance:    big.NewInt(100),  // 600 - 500
			expectedRecipientCollateralPoolBalance: big.NewInt(1200), // 700 + 500
		},
		"Send non Tdai from subaccount to subaccount with different collat pools": {
			asset:                *constants.BtcUsd,
			quantums:             big.NewInt(500),
			senderAssetPositions: keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			senderPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote,
			},
			recipientAssetPositions: keepertest.CreateBtcAssetPosition(big.NewInt(600)),
			recipientPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote_CollatPool4,
			},
			senderCollateralPoolBalance:            big.NewInt(600),
			recipientCollateralPoolBalance:         big.NewInt(700),
			senderCollateralPoolAddr:               types.CollateralPoolOneAddress,
			recipientCollateralPoolAddr:            types.CollateralPoolFourAddress,
			expectedRecipientAssetPositions:        keepertest.CreateBtcAssetPosition(big.NewInt(1100)),
			expectedSenderQuoteBalance:             big.NewInt(0),    // 500 - 500
			expectedRecipientQuoteBalance:          big.NewInt(1100), // 500 + 600
			expectedSenderCollateralPoolBalance:    big.NewInt(100),  // 600 - 500
			expectedRecipientCollateralPoolBalance: big.NewInt(1200), // 700 + 500
		},
		"Send TDai from subaccount to subaccount with different collat pools - reverse": {
			asset:                *constants.TDai,
			quantums:             big.NewInt(500),
			senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
			senderPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			recipientPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneISOLong,
			},
			senderCollateralPoolBalance:            big.NewInt(700),
			recipientCollateralPoolBalance:         big.NewInt(600),
			senderCollateralPoolAddr:               types.CollateralPoolZeroAddress,
			recipientCollateralPoolAddr:            types.CollateralPoolTwoAddress,
			expectedRecipientAssetPositions:        keepertest.CreateTDaiAssetPosition(big.NewInt(1000)),
			expectedSenderQuoteBalance:             big.NewInt(100),  // 600 - 500
			expectedRecipientQuoteBalance:          big.NewInt(1000), // 500 + 500
			expectedSenderCollateralPoolBalance:    big.NewInt(200),  // 700 - 500
			expectedRecipientCollateralPoolBalance: big.NewInt(1100), // 600 + 500
		},
		"Send non Tdai from subaccount to subaccount with different collat pools - reverse": {
			asset:                *constants.BtcUsd,
			quantums:             big.NewInt(500),
			senderAssetPositions: keepertest.CreateBtcAssetPosition(big.NewInt(600)),
			senderPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote_CollatPool4,
			},
			recipientAssetPositions: keepertest.CreateBtcAssetPosition(big.NewInt(500)),
			recipientPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneETHLong_BTCQuote,
			},
			senderCollateralPoolBalance:            big.NewInt(700),
			recipientCollateralPoolBalance:         big.NewInt(600),
			senderCollateralPoolAddr:               types.CollateralPoolFourAddress,
			recipientCollateralPoolAddr:            types.CollateralPoolOneAddress,
			expectedRecipientAssetPositions:        keepertest.CreateBtcAssetPosition(big.NewInt(1000)),
			expectedSenderQuoteBalance:             big.NewInt(100),  // 600 - 500
			expectedRecipientQuoteBalance:          big.NewInt(1000), // 500 + 500
			expectedSenderCollateralPoolBalance:    big.NewInt(200),  // 700 - 500
			expectedRecipientCollateralPoolBalance: big.NewInt(1100), // 600 + 500
		},
		"Send TDai from subaccount to subaccount with different collat pools (different perp)": {
			asset:                *constants.TDai,
			quantums:             big.NewInt(500),
			senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			senderPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneISOLong,
			},
			recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
			recipientPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneISO2Long,
			},
			senderCollateralPoolBalance:            big.NewInt(600),
			recipientCollateralPoolBalance:         big.NewInt(700),
			senderCollateralPoolAddr:               types.CollateralPoolTwoAddress,
			recipientCollateralPoolAddr:            types.CollateralPoolThreeAddress,
			expectedRecipientAssetPositions:        keepertest.CreateTDaiAssetPosition(big.NewInt(1100)),
			expectedSenderQuoteBalance:             big.NewInt(0),    // 500 - 500
			expectedRecipientQuoteBalance:          big.NewInt(1100), // 500 + 600
			expectedSenderCollateralPoolBalance:    big.NewInt(100),  // 600 - 500
			expectedRecipientCollateralPoolBalance: big.NewInt(1200), // 700 + 500
		},
		// TODO(CORE-169): Add tests for when the input quantums is rounded down to
		// a integer denom amount.
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx, keeper, pricesKeeper, perpetualsKeeper, accountKeeper, bankKeeper, assetsKeeper, ratelimitKeeper, _, _ := keepertest.SubaccountsKeepers(t, true)
			prices.InitGenesis(ctx, *pricesKeeper, constants.Prices_DefaultGenesisState)
			assets.InitGenesis(ctx, *assetsKeeper, constants.Assets_DefaultGenesisState)

			testMarket2 := *pricestest.GenerateMarketParamPrice(pricestest.WithId(2))
			testMarket3 := *pricestest.GenerateMarketParamPrice(pricestest.WithId(3))
			testMarket4 := *pricestest.GenerateMarketParamPrice(pricestest.WithId(4))
			keepertest.CreateTestPriceMarkets(t, ctx, pricesKeeper, []pricestypes.MarketParamPrice{testMarket2, testMarket3, testMarket4})

			keepertest.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			keepertest.CreateTestCollateralPools(t, ctx, perpetualsKeeper)

			keepertest.CreateTestPerpetuals(t, ctx, perpetualsKeeper)
			ratelimitKeeper.SetAssetYieldIndex(ctx, big.NewRat(1, 1))

			// Set up Subaccounts module account.
			auth_testutil.CreateTestModuleAccount(ctx, accountKeeper, types.ModuleName, []string{})

			// Set up test account address.
			addressStr := sample_testutil.AccAddress()
			testAccAddress, err := sdk.AccAddressFromBech32(addressStr)
			require.NoError(t, err)

			testAcc := authtypes.NewBaseAccount(testAccAddress, nil, accountKeeper.NextAccountNumber(ctx), 0)
			accountKeeper.SetAccount(ctx, testAcc)

			subaccounts := createNSubaccount(keeper, ctx, 2, big.NewInt(1_000))
			senderSubaccount := subaccounts[0]
			recipientSubaccount := subaccounts[1]
			senderSubaccount.AssetPositions = tc.senderAssetPositions
			senderSubaccount.PerpetualPositions = tc.senderPerpetualPositions
			recipientSubaccount.AssetPositions = tc.recipientAssetPositions
			recipientSubaccount.PerpetualPositions = tc.recipientPerpetualPositions
			keeper.SetSubaccount(ctx, senderSubaccount)
			keeper.SetSubaccount(ctx, recipientSubaccount)

			if tc.senderCollateralPoolBalance.Sign() > 0 {
				err := bank_testutil.FundAccount(
					ctx,
					tc.senderCollateralPoolAddr,
					sdk.Coins{
						sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.senderCollateralPoolBalance)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}
			if tc.recipientCollateralPoolBalance.Sign() > 0 &&
				!tc.recipientCollateralPoolAddr.Equals(tc.senderCollateralPoolAddr) {
				err := bank_testutil.FundAccount(
					ctx,
					tc.recipientCollateralPoolAddr,
					sdk.Coins{
						sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.recipientCollateralPoolBalance)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			err = keeper.TransferFundsFromSubaccountToSubaccount(
				ctx,
				*senderSubaccount.Id,
				*recipientSubaccount.Id,
				tc.asset.Id,
				tc.quantums,
			)

			require.NoError(t, err)

			// Check the subaccount has been updated as expected.
			updatedSenderSubaccount := keeper.GetSubaccount(ctx, *senderSubaccount.Id)
			if tc.expectedSenderAssetPositions != nil {
				require.Equal(t,
					tc.expectedSenderAssetPositions,
					updatedSenderSubaccount.AssetPositions,
				)
			}
			require.Equal(t,
				tc.expectedSenderQuoteBalance,
				updatedSenderSubaccount.GetAssetPosition(tc.asset.Id),
			)

			updatedRecipientSubaccount := keeper.GetSubaccount(ctx, *recipientSubaccount.Id)
			if tc.expectedRecipientAssetPositions != nil {
				require.Equal(t,
					tc.expectedRecipientAssetPositions,
					updatedRecipientSubaccount.AssetPositions,
				)
			}
			require.Equal(t,
				tc.expectedRecipientQuoteBalance,
				updatedRecipientSubaccount.GetAssetPosition(tc.asset.Id),
			)

			// Check the subaccount module balance.
			senderCollateralPoolAddrBalance := bankKeeper.GetBalance(ctx, tc.senderCollateralPoolAddr, tc.asset.Denom)
			require.Equal(t,
				sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.expectedSenderCollateralPoolBalance)),
				senderCollateralPoolAddrBalance,
			)
			recipientCollateralPoolAddrBalance := bankKeeper.GetBalance(ctx, tc.recipientCollateralPoolAddr, tc.asset.Denom)
			require.Equal(t,
				sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.expectedRecipientCollateralPoolBalance)),
				recipientCollateralPoolAddrBalance,
			)
		})
	}
}

func TestTransferFundsFromSubaccountToSubaccount_Failure(t *testing.T) {
	tests := map[string]struct {
		skipSetUpTDai bool
		asset         asstypes.Asset

		// Subaccount state.
		senderAssetPositions        []*types.AssetPosition
		senderPerpetualPositions    []*types.PerpetualPosition
		recipientAssetPositions     []*types.AssetPosition
		recipientPerpetualPositions []*types.PerpetualPosition

		// Module account state.
		senderCollateralPoolBalance    *big.Int
		recipientCollateralPoolBalance *big.Int

		senderCollateralPoolAddr    sdk.AccAddress
		recipientCollateralPoolAddr sdk.AccAddress

		// Transfer details
		quantums *big.Int

		// Expectations.
		expectedErr error
	}{
		// "Send from non-isolated subaccount to non-isolated subaccount, sender does not have enough balance": {
		// 	asset:                *constants.TDai,
		// 	senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(100)),
		// 	senderPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneBTCShort,
		// 	},
		// 	recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
		// 	recipientPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneBTCShort,
		// 	},
		// 	senderCollateralPoolBalance:    big.NewInt(1100),
		// 	recipientCollateralPoolBalance: big.NewInt(1100),
		// 	senderCollateralPoolAddr:       types.ModuleAddress,
		// 	recipientCollateralPoolAddr:    types.ModuleAddress,
		// 	quantums:                       big.NewInt(500),
		// 	expectedErr:                    types.ErrFailedToUpdateSubaccounts,
		// },
		// "Send between isolated subaccounts (same perp), sender does not have enough balance": {
		// 	asset:                *constants.TDai,
		// 	senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(100)),
		// 	senderPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISOShort,
		// 	},
		// 	recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
		// 	recipientPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISOShort,
		// 	},
		// 	senderCollateralPoolBalance:    big.NewInt(1100),
		// 	recipientCollateralPoolBalance: big.NewInt(1100),
		// 	senderCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISOShort.PerpetualId),
		// 	),
		// 	recipientCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISOShort.PerpetualId),
		// 	),
		// 	quantums:    big.NewInt(500),
		// 	expectedErr: types.ErrFailedToUpdateSubaccounts,
		// },
		// "Send between isolated subaccounts (different perp), sender does not have enough balance": {
		// 	asset:                *constants.TDai,
		// 	senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(100)),
		// 	senderPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISOShort,
		// 	},
		// 	recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
		// 	recipientPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISO2Short,
		// 	},
		// 	senderCollateralPoolBalance:    big.NewInt(500),
		// 	recipientCollateralPoolBalance: big.NewInt(600),
		// 	senderCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISOShort.PerpetualId),
		// 	),
		// 	recipientCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISO2Short.PerpetualId),
		// 	),
		// 	quantums:    big.NewInt(500),
		// 	expectedErr: types.ErrFailedToUpdateSubaccounts,
		// },
		// "Send from isolated subaccount to non-isolated subaccount, sender does not have enough balance": {
		// 	asset:                *constants.TDai,
		// 	senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(100)),
		// 	senderPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISOShort,
		// 	},
		// 	recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
		// 	recipientPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneBTCShort,
		// 	},
		// 	senderCollateralPoolBalance:    big.NewInt(500),
		// 	recipientCollateralPoolBalance: big.NewInt(600),
		// 	senderCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISOShort.PerpetualId),
		// 	),
		// 	recipientCollateralPoolAddr: types.ModuleAddress,
		// 	quantums:                    big.NewInt(500),
		// 	expectedErr:                 types.ErrFailedToUpdateSubaccounts,
		// },
		// "Send from non-isolated subaccount to isolated subaccount, collateral pool does not have enough balance": {
		// 	asset:                *constants.TDai,
		// 	senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
		// 	senderPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneBTCLong,
		// 	},
		// 	recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
		// 	recipientPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISOLong,
		// 	},
		// 	senderCollateralPoolBalance:    big.NewInt(100),
		// 	recipientCollateralPoolBalance: big.NewInt(600),
		// 	senderCollateralPoolAddr:       types.ModuleAddress,
		// 	recipientCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISOLong.PerpetualId),
		// 	),
		// 	quantums:    big.NewInt(500),
		// 	expectedErr: sdkerrors.ErrInsufficientFunds,
		// },
		"Send from isolated subaccount to non-isolated subaccount, collateral pool does not have enough balance": {
			asset:                *constants.TDai,
			senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
			senderPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneISOLong,
			},
			recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
			recipientPerpetualPositions: []*types.PerpetualPosition{
				&constants.PerpetualPosition_OneBTCLong,
			},
			senderCollateralPoolBalance:    big.NewInt(100),
			recipientCollateralPoolBalance: big.NewInt(600),
			senderCollateralPoolAddr: authtypes.NewModuleAddress(
				types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISOLong.PerpetualId),
			),
			recipientCollateralPoolAddr: types.ModuleAddress,
			quantums:                    big.NewInt(500),
			expectedErr:                 sdkerrors.ErrInsufficientFunds,
		},
		// "Send between isolated subaccounts (different perp), collateral pool does not have enough balance": {
		// 	asset:                *constants.TDai,
		// 	senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
		// 	senderPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISOLong,
		// 	},
		// 	recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
		// 	recipientPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISO2Long,
		// 	},
		// 	senderCollateralPoolBalance:    big.NewInt(100),
		// 	recipientCollateralPoolBalance: big.NewInt(600),
		// 	senderCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISOLong.PerpetualId),
		// 	),
		// 	recipientCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISO2Long.PerpetualId),
		// 	),
		// 	quantums:    big.NewInt(500),
		// 	expectedErr: sdkerrors.ErrInsufficientFunds,
		// },
		// "Do not support assets other than TDai": {
		// 	asset:                *constants.BtcUsd,
		// 	senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
		// 	senderPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISOLong,
		// 	},
		// 	recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
		// 	recipientPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISO2Long,
		// 	},
		// 	senderCollateralPoolBalance:    big.NewInt(100),
		// 	recipientCollateralPoolBalance: big.NewInt(600),
		// 	senderCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISOLong.PerpetualId),
		// 	),
		// 	recipientCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISO2Long.PerpetualId),
		// 	),
		// 	quantums:    big.NewInt(500),
		// 	expectedErr: types.ErrAssetTransferThroughBankNotImplemented,
		// },
		// "Asset ID doesn't exist": {
		// 	skipSetUpTDai:        true,
		// 	asset:                *constants.TDai,
		// 	senderAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(500)),
		// 	senderPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISOLong,
		// 	},
		// 	recipientAssetPositions: keepertest.CreateTDaiAssetPosition(big.NewInt(600)),
		// 	recipientPerpetualPositions: []*types.PerpetualPosition{
		// 		&constants.PerpetualPosition_OneISO2Long,
		// 	},
		// 	senderCollateralPoolBalance:    big.NewInt(100),
		// 	recipientCollateralPoolBalance: big.NewInt(600),
		// 	senderCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISOLong.PerpetualId),
		// 	),
		// 	recipientCollateralPoolAddr: authtypes.NewModuleAddress(
		// 		types.ModuleName + ":" + lib.UintToString(constants.PerpetualPosition_OneISO2Long.PerpetualId),
		// 	),
		// 	quantums:    big.NewInt(500),
		// 	expectedErr: asstypes.ErrAssetDoesNotExist,
		// },
		// TODO(DEC-715): Add more test for non-TDai assets, after asset update
		// is implemented.
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx, keeper, pricesKeeper, perpetualsKeeper, accountKeeper, bankKeeper, assetsKeeper, ratelimitKeeper, _, _ := keepertest.SubaccountsKeepers(t, true)
			keepertest.CreateTestMarkets(t, ctx, pricesKeeper)

			if !tc.skipSetUpTDai {
				// Always create TDai as the first asset unless specificed to skip.
				err := keepertest.CreateTDaiAsset(ctx, assetsKeeper)
				require.NoError(t, err)
			}
			err := keepertest.CreateBTCAsset(ctx, assetsKeeper)
			require.NoError(t, err)

			keepertest.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			keepertest.CreateTestCollateralPools(t, ctx, perpetualsKeeper)

			keepertest.CreateTestPerpetuals(t, ctx, perpetualsKeeper)

			ratelimitKeeper.SetAssetYieldIndex(ctx, big.NewRat(1, 1))

			// Set up Subaccounts module account.
			auth_testutil.CreateTestModuleAccount(ctx, accountKeeper, types.ModuleName, []string{})

			// Set up test account address.
			addressStr := sample_testutil.AccAddress()
			testAccAddress, err := sdk.AccAddressFromBech32(addressStr)
			require.NoError(t, err)

			testAcc := authtypes.NewBaseAccount(testAccAddress, nil, accountKeeper.NextAccountNumber(ctx), 0)
			accountKeeper.SetAccount(ctx, testAcc)

			if tc.asset.Denom != constants.TDai.Denom {
				_, err := assetsKeeper.CreateAsset(
					ctx,
					tc.asset.Id,
					tc.asset.Symbol,
					tc.asset.Denom,
					tc.asset.DenomExponent,
					tc.asset.HasMarket,
					tc.asset.MarketId,
					tc.asset.AtomicResolution,
					tc.asset.AssetYieldIndex,
					tc.asset.MaxSlippagePpm,
				)
				require.NoError(t, err)
			}

			subaccounts := createNSubaccount(keeper, ctx, 2, big.NewInt(1_000))
			senderSubaccount := subaccounts[0]
			recipientSubaccount := subaccounts[1]
			senderSubaccount.AssetPositions = tc.senderAssetPositions
			senderSubaccount.PerpetualPositions = tc.senderPerpetualPositions
			recipientSubaccount.AssetPositions = tc.recipientAssetPositions
			recipientSubaccount.PerpetualPositions = tc.recipientPerpetualPositions

			keeper.SetSubaccount(ctx, senderSubaccount)
			keeper.SetSubaccount(ctx, recipientSubaccount)

			if tc.senderCollateralPoolBalance.Sign() > 0 {
				err := bank_testutil.FundAccount(
					ctx,
					tc.senderCollateralPoolAddr,
					sdk.Coins{
						sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.senderCollateralPoolBalance)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}
			if tc.recipientCollateralPoolBalance.Sign() > 0 &&
				!tc.recipientCollateralPoolAddr.Equals(tc.senderCollateralPoolAddr) {
				err := bank_testutil.FundAccount(
					ctx,
					tc.recipientCollateralPoolAddr,
					sdk.Coins{
						sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.recipientCollateralPoolBalance)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			err = keeper.TransferFundsFromSubaccountToSubaccount(
				ctx,
				*senderSubaccount.Id,
				*recipientSubaccount.Id,
				tc.asset.Id,
				tc.quantums,
			)

			require.ErrorIs(t,
				err,
				tc.expectedErr,
			)

			// Check the subaccount has been updated as expected.
			updatedSenderSubaccount := keeper.GetSubaccount(ctx, *senderSubaccount.Id)
			require.Equal(t,
				tc.senderAssetPositions,
				updatedSenderSubaccount.AssetPositions,
			)

			updatedRecipientSubaccount := keeper.GetSubaccount(ctx, *recipientSubaccount.Id)
			require.Equal(t,
				tc.recipientAssetPositions,
				updatedRecipientSubaccount.AssetPositions,
			)

			// Check the subaccount module balance.
			senderCollateralPoolAddrBalance := bankKeeper.GetBalance(ctx, tc.senderCollateralPoolAddr, tc.asset.Denom)
			require.Equal(t,
				sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.senderCollateralPoolBalance)),
				senderCollateralPoolAddrBalance,
			)
			recipientCollateralPoolAddrBalance := bankKeeper.GetBalance(ctx, tc.recipientCollateralPoolAddr, tc.asset.Denom)
			require.Equal(t,
				sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.recipientCollateralPoolBalance)),
				recipientCollateralPoolAddrBalance,
			)
		})
	}
}

func TestTransferFeesToFeeCollectorModule(t *testing.T) {
	tests := map[string]struct {

		// Module account state.
		subaccountModuleAccBalance *big.Int
		feeModuleAccBalance        *big.Int

		// Transfer details.
		asset       asstypes.Asset
		quantums    *big.Int
		perpetualId uint32

		collateralPoolAddr sdk.AccAddress

		// Expectations.
		expectedErr                         error
		expectedSubaccountsModuleAccBalance *big.Int
		expectedFeeModuleAccBalance         *big.Int
	}{
		"success - send to fee-collector module account": {
			asset:                               *constants.TDai,
			feeModuleAccBalance:                 big.NewInt(2500),
			subaccountModuleAccBalance:          big.NewInt(600),
			quantums:                            big.NewInt(500),
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedSubaccountsModuleAccBalance: big.NewInt(100),  // 600 - 500
			expectedFeeModuleAccBalance:         big.NewInt(3000), // 500 + 2500
		},
		"success - quantums is zero": {
			asset:                               *constants.TDai,
			feeModuleAccBalance:                 big.NewInt(2500),
			subaccountModuleAccBalance:          big.NewInt(600),
			quantums:                            big.NewInt(0),
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedSubaccountsModuleAccBalance: big.NewInt(600),  // 600
			expectedFeeModuleAccBalance:         big.NewInt(2500), // 2500
		},
		"failure - subaccounts module does not have sufficient funds": {
			asset:                               *constants.TDai,
			feeModuleAccBalance:                 big.NewInt(2500),
			subaccountModuleAccBalance:          big.NewInt(300),
			quantums:                            big.NewInt(500),
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedSubaccountsModuleAccBalance: big.NewInt(300),
			expectedFeeModuleAccBalance:         big.NewInt(2500),
			expectedErr:                         sdkerrors.ErrInsufficientFunds,
		},
		"success - transfer quantums is negative": {
			feeModuleAccBalance:                 big.NewInt(1500),
			asset:                               *constants.TDai,
			subaccountModuleAccBalance:          big.NewInt(500),
			quantums:                            big.NewInt(-500),
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedSubaccountsModuleAccBalance: big.NewInt(1000),
			expectedFeeModuleAccBalance:         big.NewInt(1000),
		},
		// TODO(DEC-715): Add more test for non-TDai assets, after asset update
		// is implemented.
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx, keeper, pricesKeeper, perpetualsKeeper, accountKeeper, bankKeeper, assetsKeeper, _, _, _ := keepertest.SubaccountsKeepers(t, true)
			keepertest.CreateTestMarkets(t, ctx, pricesKeeper)

			err := keepertest.CreateTDaiAsset(ctx, assetsKeeper)
			require.NoError(t, err)
			err = keepertest.CreateBTCAsset(ctx, assetsKeeper)
			require.NoError(t, err)

			keepertest.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			keepertest.CreateTestCollateralPools(t, ctx, perpetualsKeeper)
			keepertest.CreateTestPerpetuals(t, ctx, perpetualsKeeper)

			// Set up Subaccounts module account.
			auth_testutil.CreateTestModuleAccount(ctx, accountKeeper, types.ModuleName, []string{})
			// Set up receiver module account.
			auth_testutil.CreateTestModuleAccount(ctx, accountKeeper, authtypes.FeeCollectorName, []string{authtypes.Minter})

			// This currently assumes the 1 base denom = 1 base quantum.
			// TODO(DEC-714): Implement conversion of assets between `assets` and
			// `bank` modules
			bankKeeper.SetDenomMetaData(ctx, banktypes.Metadata{
				Base:    tc.asset.Denom,
				Display: tc.asset.Denom,
				DenomUnits: []*banktypes.DenomUnit{
					{
						Denom:    tc.asset.Denom,
						Exponent: 0,
					},
				},
			})

			// Mint asset in the receipt/sender module account for transfer.
			if tc.feeModuleAccBalance.Sign() > 0 {
				err := bank_testutil.FundModuleAccount(
					ctx,
					authtypes.FeeCollectorName,
					sdk.Coins{
						sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.feeModuleAccBalance)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			if tc.subaccountModuleAccBalance.Sign() > 0 {
				err := bank_testutil.FundAccount(
					ctx,
					tc.collateralPoolAddr,
					sdk.Coins{
						sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.subaccountModuleAccBalance)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			if tc.asset.Denom != constants.TDai.Denom {
				_, err := assetsKeeper.CreateAsset(
					ctx,
					tc.asset.Id,
					tc.asset.Symbol,
					tc.asset.Denom,
					tc.asset.DenomExponent,
					tc.asset.HasMarket,
					tc.asset.MarketId,
					tc.asset.AtomicResolution,
					tc.asset.AssetYieldIndex,
					tc.asset.MaxSlippagePpm,
				)
				require.NoError(t, err)
			}

			err = keeper.TransferFeesToFeeCollectorModule(
				ctx,
				tc.asset.Id,
				tc.quantums,
				tc.perpetualId,
			)

			if tc.expectedErr != nil {
				require.ErrorIs(t,
					err,
					tc.expectedErr,
				)
			} else {
				require.NoError(t, err)
			}

			// Check the subaccount module balance.
			subaccountsModuleAccBalance := bankKeeper.GetBalance(ctx, tc.collateralPoolAddr, tc.asset.Denom)
			require.Equal(t,
				sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.expectedSubaccountsModuleAccBalance)),
				subaccountsModuleAccBalance,
			)

			// Check the fee module account balance has been updated as expected.
			toModuleBalance := bankKeeper.GetBalance(
				ctx, authtypes.NewModuleAddress(authtypes.FeeCollectorName),
				tc.asset.Denom,
			)
			require.Equal(t,
				sdk.NewCoin(tc.asset.Denom, sdkmath.NewIntFromBigInt(tc.expectedFeeModuleAccBalance)),
				toModuleBalance,
			)
		})
	}
}

func TestTransferInsuranceFundPayments(t *testing.T) {
	tests := map[string]struct {

		// Module account state.
		subaccountModuleAccBalance int64
		insuranceFundBalance       int64
		perpetual                  perptypes.Perpetual
		collateralPoolAddr         sdk.AccAddress

		// Transfer details.
		quantums *big.Int

		// Expectations.
		panics                              bool
		expectedErr                         error
		expectedSubaccountsModuleAccBalance int64
		expectedInsuranceFundBalance        int64
	}{
		"success - send to insurance fund module account": {
			perpetual:                           constants.BtcUsd_SmallMarginRequirement,
			insuranceFundBalance:                2500,
			subaccountModuleAccBalance:          600,
			quantums:                            big.NewInt(500),
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedSubaccountsModuleAccBalance: 100,  // 600 - 500
			expectedInsuranceFundBalance:        3000, // 2500 + 500
		},
		"success - send from insurance fund module account": {
			perpetual:                           constants.BtcUsd_SmallMarginRequirement,
			insuranceFundBalance:                2500,
			subaccountModuleAccBalance:          600,
			quantums:                            big.NewInt(-500),
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedSubaccountsModuleAccBalance: 1100, // 600 + 500
			expectedInsuranceFundBalance:        2000, // 2500 - 500
		},
		"success - can send zero payment": {
			perpetual:                           constants.BtcUsd_SmallMarginRequirement,
			insuranceFundBalance:                2500,
			subaccountModuleAccBalance:          600,
			quantums:                            big.NewInt(0),
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedSubaccountsModuleAccBalance: 600,
			expectedInsuranceFundBalance:        2500,
		},
		"success - send to isolated insurance fund account": {
			perpetual:                           constants.IsoUsd_IsolatedMarket,
			insuranceFundBalance:                2500,
			subaccountModuleAccBalance:          600,
			quantums:                            big.NewInt(500),
			collateralPoolAddr:                  types.CollateralPoolTwoAddress,
			expectedSubaccountsModuleAccBalance: 100,  // 600 - 500
			expectedInsuranceFundBalance:        3000, // 2500 + 500
		},
		"success - send from isolated insurance fund account": {
			perpetual:                           constants.IsoUsd_IsolatedMarket,
			insuranceFundBalance:                2500,
			subaccountModuleAccBalance:          600,
			quantums:                            big.NewInt(-500),
			collateralPoolAddr:                  types.CollateralPoolTwoAddress,
			expectedSubaccountsModuleAccBalance: 1100, // 600 + 500
			expectedInsuranceFundBalance:        2000, // 2500 - 500
		},
		"failure - subaccounts module does not have sufficient funds": {
			perpetual:                           constants.BtcUsd_SmallMarginRequirement,
			insuranceFundBalance:                2500,
			subaccountModuleAccBalance:          300,
			quantums:                            big.NewInt(500),
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedSubaccountsModuleAccBalance: 300,
			expectedInsuranceFundBalance:        2500,
			expectedErr:                         sdkerrors.ErrInsufficientFunds,
		},
		"failure - insurance fund does not have sufficient funds": {
			perpetual:                           constants.BtcUsd_SmallMarginRequirement,
			insuranceFundBalance:                300,
			subaccountModuleAccBalance:          2500,
			quantums:                            big.NewInt(-500),
			collateralPoolAddr:                  types.CollateralPoolZeroAddress,
			expectedSubaccountsModuleAccBalance: 2500,
			expectedInsuranceFundBalance:        300,
			expectedErr:                         sdkerrors.ErrInsufficientFunds,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx, keeper, pricesKeeper, perpsKeeper, accountKeeper, bankKeeper, assetsKeeper, _, _, _ := keepertest.SubaccountsKeepers(t, true)
			keepertest.CreateTestMarkets(t, ctx, pricesKeeper)
			// Create liquidity tiers.

			err := keepertest.CreateTDaiAsset(ctx, assetsKeeper)
			require.NoError(t, err)
			err = keepertest.CreateBTCAsset(ctx, assetsKeeper)
			require.NoError(t, err)

			keepertest.CreateTestLiquidityTiers(t, ctx, perpsKeeper)
			keepertest.CreateTestCollateralPools(t, ctx, perpsKeeper)

			// Set up Subaccounts module account.
			auth_testutil.CreateTestModuleAccount(ctx, accountKeeper, types.ModuleName, []string{})
			// Set up insurance fund module account.
			auth_testutil.CreateTestModuleAccount(ctx, accountKeeper, perptypes.InsuranceFundName, []string{})

			bankKeeper.SetDenomMetaData(ctx, banktypes.Metadata{
				Base:    constants.TDai.Denom,
				Display: constants.TDai.Denom,
				DenomUnits: []*banktypes.DenomUnit{
					{
						Denom:    constants.TDai.Denom,
						Exponent: 0,
					},
				},
			})

			_, err = perpsKeeper.CreatePerpetual(
				ctx,
				tc.perpetual.GetId(),
				tc.perpetual.Params.Ticker,
				tc.perpetual.Params.MarketId,
				tc.perpetual.Params.AtomicResolution,
				tc.perpetual.Params.DefaultFundingPpm,
				tc.perpetual.Params.LiquidityTier,
				tc.perpetual.Params.DangerIndexPpm,
				tc.perpetual.Params.CollateralPoolId,
				tc.perpetual.YieldIndex,
			)
			require.NoError(t, err)

			insuranceFundAddr, err := perpsKeeper.GetInsuranceFundModuleAddress(ctx, tc.perpetual.GetId())
			require.NoError(t, err)

			// Mint asset in the receipt/sender module account for transfer.
			if tc.insuranceFundBalance > 0 {
				err := bank_testutil.FundAccount(
					ctx,
					insuranceFundAddr,
					sdk.Coins{
						sdk.NewInt64Coin(constants.TDai.Denom, tc.insuranceFundBalance),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			if tc.subaccountModuleAccBalance > 0 {
				err := bank_testutil.FundAccount(
					ctx,
					tc.collateralPoolAddr,
					sdk.Coins{
						sdk.NewInt64Coin(constants.TDai.Denom, tc.subaccountModuleAccBalance),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			collateralPool, err := perpsKeeper.GetCollateralPool(ctx, tc.perpetual.Params.CollateralPoolId)
			require.NoError(t, err)

			if tc.expectedErr != nil {
				if tc.panics {
					require.PanicsWithError(
						t,
						tc.expectedErr.Error(),
						func() {
							//nolint:errcheck
							keeper.TransferInsuranceFundPayments(ctx, tc.quantums, tc.perpetual.GetId(), collateralPool.QuoteAssetId)
						},
					)
				} else {
					require.ErrorIs(
						t,
						keeper.TransferInsuranceFundPayments(ctx, tc.quantums, tc.perpetual.GetId(), collateralPool.QuoteAssetId),
						tc.expectedErr,
					)
				}
			} else {
				require.NoError(t, keeper.TransferInsuranceFundPayments(ctx, tc.quantums, tc.perpetual.GetId(), collateralPool.QuoteAssetId))
			}

			// Check the subaccount module balance.
			subaccountsModuleAccBalance := bankKeeper.GetBalance(ctx, tc.collateralPoolAddr, constants.TDai.Denom)
			require.Equal(
				t,
				sdk.NewInt64Coin(constants.TDai.Denom, tc.expectedSubaccountsModuleAccBalance),
				subaccountsModuleAccBalance,
			)

			// Check the fee module account balance has been updated as expected.
			toModuleBalance := bankKeeper.GetBalance(
				ctx, insuranceFundAddr,
				constants.TDai.Denom,
			)
			require.Equal(t,
				sdk.NewInt64Coin(constants.TDai.Denom, tc.expectedInsuranceFundBalance),
				toModuleBalance,
			)
		})
	}
}
