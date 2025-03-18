package keeper_test

import (
	"errors"
	"math/big"
	"testing"
	"time"

	errorsmod "cosmossdk.io/errors"
	sdkmath "cosmossdk.io/math"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	yieldstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
)

type WithdrawTestOptions struct {
	withdraw                types.BridgeWithdraw
	expectedBridgeWithdraws []types.BridgeEvent
	sDaiPrice               string
	accTdaiBalance          *big.Int
	sDaiPoolBalance         *big.Int
	expectedSdaiPoolBalance *big.Int
	expectedAccTdaiBalance  *big.Int
	expectedErr             error
}

var (
	mockEthRecipient = "0x70e1b787A5D677a5906AccCF0B4F387b8Bb1B5C3"
)

func TestHandleSdaiWithdraw(t *testing.T) {
	tests := map[string]WithdrawTestOptions{
		"Failure: sdai amount is not an integer": {
			withdraw:                constants.BridgeWithdraw_NonIntegerSDaiAmount,
			sDaiPrice:               "1000000000000000000000000000",
			accTdaiBalance:          big.NewInt(0),
			sDaiPoolBalance:         big.NewInt(100),
			expectedAccTdaiBalance:  big.NewInt(0),
			expectedSdaiPoolBalance: big.NewInt(100),
			expectedErr:             errorsmod.Wrapf(types.ErrInvalidWithdrawSdaiAmount, "Sdai amount cannot be parsed."),
		},
		"Failure: sdai amount is not greater than zero": {
			withdraw:                constants.BridgeWithdraw_NegativeSDaiAmount,
			accTdaiBalance:          big.NewInt(0),
			sDaiPrice:               "1000000000000000000000000000",
			sDaiPoolBalance:         big.NewInt(100),
			expectedAccTdaiBalance:  big.NewInt(0),
			expectedSdaiPoolBalance: big.NewInt(100),
			expectedErr:             errorsmod.Wrapf(types.ErrInvalidWithdrawSdaiAmount, "Sdai amount must be greater than zero."),
		},
		"Failure: sdai amount is  zero": {
			withdraw:                constants.BridgeWithdraw_ZeroSDaiAmount,
			accTdaiBalance:          big.NewInt(0),
			sDaiPrice:               "1000000000000000000000000000",
			sDaiPoolBalance:         big.NewInt(100),
			expectedAccTdaiBalance:  big.NewInt(0),
			expectedSdaiPoolBalance: big.NewInt(100),
			expectedErr:             errorsmod.Wrapf(types.ErrInvalidWithdrawSdaiAmount, "Sdai amount must be greater than zero."),
		},
		"Failure: invalid account address": {
			withdraw:                constants.BridgeWithdraw_InvalidAddress,
			accTdaiBalance:          big.NewInt(0),
			sDaiPrice:               "1000000000000000000000000000",
			sDaiPoolBalance:         big.NewInt(100),
			expectedAccTdaiBalance:  big.NewInt(0),
			expectedSdaiPoolBalance: big.NewInt(100),
			expectedErr:             errors.New("decoding bech32 failed: invalid bech32 string length 7"),
		},
		"Failure: insufficient tdai balance": {
			withdraw:                constants.BridgeWithdraw_1SDai,
			accTdaiBalance:          big.NewInt(0),
			sDaiPrice:               "1000000000000000000000000000",
			sDaiPoolBalance:         big.NewInt(100),
			expectedAccTdaiBalance:  big.NewInt(0),
			expectedSdaiPoolBalance: big.NewInt(100),
			expectedErr:             errors.New("pendable balance 0utdai is smaller than 1utdai: insufficient funds"),
		},
		"Success: withdrawing one sdai": {
			withdraw: constants.BridgeWithdraw_1SDai,
			expectedBridgeWithdraws: []types.BridgeEvent{
				{
					Id:          0,
					Coin:        sdk.NewCoin(yieldstypes.SDaiDenom, sdkmath.NewIntFromBigInt(big.NewInt(1))),
					Address:     mockEthRecipient,
					BlockHeight: 0,
					IsDeposit:   false,
				},
			},
			accTdaiBalance:          big.NewInt(100),
			sDaiPrice:               "1000000000000000000000000000",
			sDaiPoolBalance:         big.NewInt(100),
			expectedAccTdaiBalance:  big.NewInt(99),
			expectedSdaiPoolBalance: big.NewInt(99),
			expectedErr:             nil,
		},
	}

	for name, tc := range tests {
		timeNow := time.Now()
		t.Run(name, func(t *testing.T) {
			ks := keepertest.BridgeKeepers(t)

			sdaiPrice := new(big.Int)
			sdaiPrice.SetString(tc.sDaiPrice, 10)
			ks.YieldsKeeper.SetSDAIPrice(ks.Ctx, sdaiPrice)

			err := ks.BankKeeper.MintCoins(ks.Ctx, yieldstypes.TDaiPoolAccount, sdk.NewCoins(sdk.NewCoin(yieldstypes.TDaiDenom, sdkmath.NewIntFromBigInt(tc.accTdaiBalance))))
			require.NoError(t, err)

			err = ks.BankKeeper.SendCoinsFromModuleToAccount(ks.Ctx, yieldstypes.TDaiPoolAccount, constants.BobAccAddress, sdk.NewCoins(sdk.NewCoin(yieldstypes.TDaiDenom, sdkmath.NewIntFromBigInt(tc.accTdaiBalance))))
			require.NoError(t, err)

			err = ks.BankKeeper.MintCoins(ks.Ctx, yieldstypes.SDaiPoolAccount, sdk.NewCoins(sdk.NewCoin(yieldstypes.SDaiDenom, sdkmath.NewIntFromBigInt(tc.sDaiPoolBalance))))
			require.NoError(t, err)

			ks.MockTimeProvider.On("Now").Return(timeNow).Once()

			totalSupply := ks.BankKeeper.GetSupply(ks.Ctx, yieldstypes.SDaiDenom)
			require.Equal(t, 0, tc.sDaiPoolBalance.Cmp(totalSupply.Amount.BigInt()))

			err = ks.BridgeKeeper.HandleSdaiWithdraw(ks.Ctx, tc.withdraw)

			if tc.expectedErr != nil {
				require.Contains(t, err.Error(), tc.expectedErr.Error())
			} else {
				require.NoError(t, err)
				bridgeWithdrawalEvents := ks.BridgeKeeper.GetBridgeWithdrawalEvents(ks.Ctx)
				require.Equal(t, len(tc.expectedBridgeWithdraws), len(bridgeWithdrawalEvents))
				for _, withdrawalEvent := range bridgeWithdrawalEvents {
					require.Equal(t, withdrawalEvent, tc.expectedBridgeWithdraws[withdrawalEvent.Id])
				}
			}

			accBalance := ks.BankKeeper.GetBalance(ks.Ctx, constants.BobAccAddress, yieldstypes.TDaiDenom)
			require.Equal(t, tc.expectedAccTdaiBalance, accBalance.Amount.BigInt())

			accBalanceSDai := ks.BankKeeper.GetBalance(ks.Ctx, constants.BobAccAddress, yieldstypes.SDaiDenom)
			require.Equal(t, int64(0), accBalanceSDai.Amount.Int64())

			totalSupply = ks.BankKeeper.GetSupply(ks.Ctx, yieldstypes.SDaiDenom)
			require.Equal(t, 0, tc.expectedSdaiPoolBalance.Cmp(totalSupply.Amount.BigInt()))

			sdaiPoolAccountAddress := ks.AccountKeeper.GetModuleAddress(yieldstypes.SDaiPoolAccount)
			sdaiPoolBalance := ks.BankKeeper.GetBalance(ks.Ctx, sdaiPoolAccountAddress, yieldstypes.SDaiDenom)

			require.Equal(t, tc.expectedSdaiPoolBalance, sdaiPoolBalance.Amount.BigInt())
		})
	}
}
