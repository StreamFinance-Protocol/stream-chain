package keeper_test

import (
	"math/big"
	"testing"

	sdkmath "cosmossdk.io/math"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	ratelimittypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func TestCompleteBridge(t *testing.T) {
	tests := map[string]struct {
		// Initial balance of bridge module account.
		initialModAccBalance sdk.Coin
		// Bridge event to complete.
		bridgeEvent types.BridgeEvent
		// Whether bridging is disabled.
		bridgingDisabled bool

		// Expected error, if any.
		expectedError string
		// Expected balance of bridge module account after bridge completion.
		expectedModAccBalance sdk.Coin
	}{
		"Success": {
			initialModAccBalance:  sdk.NewCoin("adv4tnt", sdkmath.NewInt(1_000)),
			bridgeEvent:           constants.BridgeDepositEvent_Id0_Height0,
			expectedModAccBalance: sdk.NewCoin("adv4tnt", sdkmath.NewInt(1_000)),
		},
		"Success: coin amount is 0": {
			initialModAccBalance: sdk.NewCoin("adv4tnt", sdkmath.NewInt(1_000)),
			bridgeEvent: types.BridgeEvent{
				Id:          7,
				Address:     constants.BobAccAddress.String(),
				Coin:        sdk.NewCoin("adv4tnt", sdkmath.ZeroInt()),
				BlockHeight: 3,
				IsDeposit:   true,
			},
			expectedModAccBalance: sdk.NewCoin("adv4tnt", sdkmath.NewInt(1_000)),
		},
		"Success: coin amount is negative": {
			initialModAccBalance: sdk.NewCoin("adv4tnt", sdkmath.NewInt(1_000)),
			bridgeEvent: types.BridgeEvent{
				Id:      7,
				Address: constants.BobAccAddress.String(),
				Coin: sdk.Coin{
					Denom:  "adv4tnt",
					Amount: sdkmath.NewInt(-1),
				},
				BlockHeight: 3,
				IsDeposit:   true,
			},
			expectedModAccBalance: sdk.NewCoin("adv4tnt", sdkmath.NewInt(1_000)),
		},
		"Success: tDAI is minted when denom is sDAI": {
			initialModAccBalance: sdk.NewCoin(ratelimittypes.SDaiDenom, sdkmath.NewInt(1_000)),
			bridgeEvent: types.BridgeEvent{
				Id:      7,
				Address: constants.BobAccAddress.String(),
				Coin: sdk.Coin{
					Denom:  ratelimittypes.SDaiDenom,
					Amount: sdkmath.NewInt(1_000_000_000_000_000),
				},
				BlockHeight: 3,
				IsDeposit:   true,
			},
			expectedModAccBalance: sdk.NewCoin(ratelimittypes.SDaiDenom, sdkmath.NewInt(1_000)),
		},
		"Failure: invalid address string": {
			initialModAccBalance: sdk.NewCoin("adv4tnt", sdkmath.NewInt(1_000)),
			bridgeEvent: types.BridgeEvent{
				Id:          4,
				Address:     "not an address string",
				Coin:        sdk.NewCoin("adv4tnt", sdkmath.NewInt(1)),
				BlockHeight: 2,
				IsDeposit:   true,
			},
			expectedError:         "decoding bech32 failed",
			expectedModAccBalance: sdk.NewCoin("adv4tnt", sdkmath.NewInt(1_000)),
		},
		"Failure: bridging is disabled": {
			initialModAccBalance:  sdk.NewCoin("adv4tnt", sdkmath.NewInt(1_000)),
			bridgeEvent:           constants.BridgeDepositEvent_Id0_Height0, // bridges 888 tokens.
			bridgingDisabled:      true,
			expectedError:         types.ErrBridgingDisabled.Error(),
			expectedModAccBalance: sdk.NewCoin("adv4tnt", sdkmath.NewInt(1_000)), // same as initial.
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			// Initialize context and keeper.
			ks := keepertest.BridgeKeepers(t)
			err := ks.BridgeKeeper.UpdateSafetyParams(ks.Ctx, types.SafetyParams{
				IsDisabled:  tc.bridgingDisabled,
				DelayBlocks: ks.BridgeKeeper.GetSafetyParams(ks.Ctx).DelayBlocks,
			})
			require.NoError(t, err)

			conversionRate, ok := new(big.Int).SetString(constants.SDaiConversionRateTwoString, 10)
			require.True(t, ok)

			ks.RatelimitKeeper.SetSDAIPrice(ks.Ctx, conversionRate)

			// Fund bridge module account with enough balance.
			err = ks.BankKeeper.MintCoins(
				ks.Ctx,
				types.ModuleName,
				sdk.NewCoins(tc.initialModAccBalance),
			)
			require.NoError(t, err)

			// Complete bridge.
			err = ks.BridgeKeeper.CompleteBridge(ks.Ctx, tc.bridgeEvent)

			// Assert expectations.
			if tc.expectedError != "" {
				require.Error(t, err)
				require.Contains(t, err.Error(), tc.expectedError)
			} else {
				require.NoError(t, err)

				bridgeDenomDestinationAddress := sdk.MustAccAddressFromBech32(tc.bridgeEvent.Address)

				if tc.bridgeEvent.Coin.Denom == ratelimittypes.SDaiDenom {
					balance := ks.BankKeeper.GetBalance(
						ks.Ctx,
						sdk.MustAccAddressFromBech32(tc.bridgeEvent.Address),
						ratelimittypes.TDaiDenom,
					)

					sDaiAmountBigInt := tc.bridgeEvent.Coin.Amount.BigInt()
					expectedTDaiBalance, err := ks.RatelimitKeeper.GetTradingDAIFromSDAIAmount(ks.Ctx, sDaiAmountBigInt)
					require.NoError(t, err)
					require.Equal(t, expectedTDaiBalance.String(), balance.Amount.BigInt().String())

					bridgeDenomDestinationAddress = ks.AccountKeeper.GetModuleAddress(ratelimittypes.SDaiPoolAccount)
				}

				// Assert that target account's balance of bridged token is as expected.
				balance := ks.BankKeeper.GetBalance(
					ks.Ctx,
					bridgeDenomDestinationAddress,
					tc.bridgeEvent.Coin.Denom,
				)

				expectedBalance := sdk.NewCoin(tc.bridgeEvent.Coin.Denom, sdkmath.ZeroInt())
				if tc.bridgeEvent.Coin.Amount.IsPositive() {
					expectedBalance = tc.bridgeEvent.Coin
				}
				require.Equal(t, expectedBalance.Denom, balance.Denom)
				require.Equal(t, expectedBalance.Amount, balance.Amount)
			}
			// Assert that bridge module account's balance is as expected.
			modAccBalance := ks.BankKeeper.GetBalance(
				ks.Ctx,
				types.ModuleAddress,
				tc.bridgeEvent.Coin.Denom,
			)

			require.Equal(t, tc.expectedModAccBalance.Denom, modAccBalance.Denom)
			require.Equal(t, tc.expectedModAccBalance.Amount, modAccBalance.Amount)
		})
	}
}
