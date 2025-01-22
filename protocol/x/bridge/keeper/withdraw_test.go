package keeper_test

import (
	"errors"
	"math/big"
	"testing"
	"time"

	errorsmod "cosmossdk.io/errors"
	sdkmath "cosmossdk.io/math"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	ratelimittypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
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
			withdraw: types.BridgeWithdraw{
				SdaiAmount:   "1.1",
				Account:      constants.BobAccAddress.String(),
				EthRecipient: mockEthRecipient,
			},
			sDaiPrice:               "1000000000000000000000000000",
			accTdaiBalance:          big.NewInt(0),
			sDaiPoolBalance:         big.NewInt(100),
			expectedAccTdaiBalance:  big.NewInt(0),
			expectedSdaiPoolBalance: big.NewInt(100),
			expectedErr:             errorsmod.Wrapf(types.ErrInvalidWithdrawSdaiAmount, "Sdai amount cannot be parsed."),
		},
		"Failure: sdai amount is not greater than zero": {
			withdraw: types.BridgeWithdraw{
				SdaiAmount:   "-1",
				Account:      constants.BobAccAddress.String(),
				EthRecipient: mockEthRecipient,
			},
			accTdaiBalance:          big.NewInt(0),
			sDaiPrice:               "1000000000000000000000000000",
			sDaiPoolBalance:         big.NewInt(100),
			expectedAccTdaiBalance:  big.NewInt(0),
			expectedSdaiPoolBalance: big.NewInt(100),
			expectedErr:             errorsmod.Wrapf(types.ErrInvalidWithdrawSdaiAmount, "Sdai amount must be greater than zero."),
		},
		"Failure: sdai amount is  zero": {
			withdraw: types.BridgeWithdraw{
				SdaiAmount:   "0",
				Account:      constants.BobAccAddress.String(),
				EthRecipient: mockEthRecipient,
			},
			accTdaiBalance:          big.NewInt(0),
			sDaiPrice:               "1000000000000000000000000000",
			sDaiPoolBalance:         big.NewInt(100),
			expectedAccTdaiBalance:  big.NewInt(0),
			expectedSdaiPoolBalance: big.NewInt(100),
			expectedErr:             errorsmod.Wrapf(types.ErrInvalidWithdrawSdaiAmount, "Sdai amount must be greater than zero."),
		},
		"Failure: invalid account address": {
			withdraw: types.BridgeWithdraw{
				SdaiAmount:   "1",
				Account:      "invalid",
				EthRecipient: mockEthRecipient,
			},
			accTdaiBalance:          big.NewInt(0),
			sDaiPrice:               "1000000000000000000000000000",
			sDaiPoolBalance:         big.NewInt(100),
			expectedAccTdaiBalance:  big.NewInt(0),
			expectedSdaiPoolBalance: big.NewInt(100),
			expectedErr:             errors.New("decoding bech32 failed: invalid bech32 string length 7"),
		},
		"Failure: insufficient tdai balance": {
			withdraw: types.BridgeWithdraw{
				SdaiAmount:   "1",
				Account:      constants.BobAccAddress.String(),
				EthRecipient: mockEthRecipient,
			},
			accTdaiBalance:          big.NewInt(0),
			sDaiPrice:               "1000000000000000000000000000",
			sDaiPoolBalance:         big.NewInt(100),
			expectedAccTdaiBalance:  big.NewInt(0),
			expectedSdaiPoolBalance: big.NewInt(100),
			expectedErr:             errors.New("pendable balance 0utdai is smaller than 1utdai: insufficient funds"),
		},
		"Success: withdrawing one sdai": {
			withdraw: types.BridgeWithdraw{
				SdaiAmount:   "1",
				Account:      constants.BobAccAddress.String(),
				EthRecipient: mockEthRecipient,
			},
			expectedBridgeWithdraws: []types.BridgeEvent{
				{
					Id:          0,
					Coin:        sdk.NewCoin(ratelimittypes.SDaiDenom, sdkmath.NewIntFromBigInt(big.NewInt(1))),
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
			ks.RatelimitKeeper.SetSDAIPrice(ks.Ctx, sdaiPrice)

			err := ks.BankKeeper.MintCoins(ks.Ctx, ratelimittypes.TDaiPoolAccount, sdk.NewCoins(sdk.NewCoin(ratelimittypes.TDaiDenom, sdkmath.NewIntFromBigInt(tc.accTdaiBalance))))
			require.NoError(t, err)

			err = ks.BankKeeper.SendCoinsFromModuleToAccount(ks.Ctx, ratelimittypes.TDaiPoolAccount, constants.BobAccAddress, sdk.NewCoins(sdk.NewCoin(ratelimittypes.TDaiDenom, sdkmath.NewIntFromBigInt(tc.accTdaiBalance))))
			require.NoError(t, err)

			err = ks.BankKeeper.MintCoins(ks.Ctx, ratelimittypes.SDaiPoolAccount, sdk.NewCoins(sdk.NewCoin(ratelimittypes.SDaiDenom, sdkmath.NewIntFromBigInt(tc.sDaiPoolBalance))))
			require.NoError(t, err)

			ks.MockTimeProvider.On("Now").Return(timeNow).Once()

			err = ks.BridgeKeeper.HandleSdaiWithdraw(ks.Ctx, tc.withdraw)

			if tc.expectedErr != nil {
				require.Contains(t, err.Error(), tc.expectedErr.Error())
			} else {
				require.NoError(t, err)
				for _, expectedBridgeWithdraw := range tc.expectedBridgeWithdraws {
					bridgeEvent, _, found := ks.BridgeEventManager.GetBridgeEventById(expectedBridgeWithdraw.Id, false)
					require.True(t, found)
					require.Equal(t, bridgeEvent, tc.expectedBridgeWithdraws[bridgeEvent.Id])
				}
			}

			accBalance := ks.BankKeeper.GetBalance(ks.Ctx, constants.BobAccAddress, ratelimittypes.TDaiDenom)
			require.Equal(t, tc.expectedAccTdaiBalance, accBalance.Amount.BigInt())

			sdaiPoolAccountAddress := ks.AccountKeeper.GetModuleAddress(ratelimittypes.SDaiPoolAccount)
			sdaiPoolBalance := ks.BankKeeper.GetBalance(ks.Ctx, sdaiPoolAccountAddress, ratelimittypes.SDaiDenom)

			require.Equal(t, tc.expectedSdaiPoolBalance, sdaiPoolBalance.Amount.BigInt())
		})
	}
}
