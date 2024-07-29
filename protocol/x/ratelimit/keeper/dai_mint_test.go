package keeper_test

import (
	"math/big"
	"testing"

	sdkmath "cosmossdk.io/math"
	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func TestMintNewTDaiYield(t *testing.T) {
	testCases := []struct {
		name                     string
		initialSDAISupply        sdk.Coins
		initialTradingDAISupply  sdk.Coins
		sdaiPrice                *big.Int
		expectedTDAISupply       *big.Int
		expectedTradingDaiToMint *big.Int
		expectError              bool
	}{
		{
			name:                    "sDAI price not set",
			initialSDAISupply:       sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(200))),
			initialTradingDAISupply: sdk.NewCoins(sdk.NewCoin(types.TradingDAIDenom, sdkmath.NewInt(100))),
			sdaiPrice:               nil,
			expectError:             true,
		},
		{
			name:                    "tradingDaiAfterYield will be less than intial trading dai",
			initialSDAISupply:       sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(100))),
			initialTradingDAISupply: sdk.NewCoins(sdk.NewCoin(types.TradingDAIDenom, sdkmath.NewInt(200))),
			sdaiPrice:               new(big.Int).Mul(big.NewInt(1), new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS), nil)),
			expectError:             true,
		},
		{
			name:                     "Successful minting",
			initialSDAISupply:        sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(200))),
			initialTradingDAISupply:  sdk.NewCoins(sdk.NewCoin(types.TradingDAIDenom, sdkmath.NewInt(100))),
			sdaiPrice:                new(big.Int).Mul(big.NewInt(1), new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS), nil)),
			expectedTDAISupply:       big.NewInt(100),
			expectedTradingDaiToMint: big.NewInt(100),
			expectError:              false,
		},
		{
			name:                     "Both initial supplies start at 0",
			initialSDAISupply:        sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(0))),
			initialTradingDAISupply:  sdk.NewCoins(sdk.NewCoin(types.TradingDAIDenom, sdkmath.NewInt(0))),
			sdaiPrice:                new(big.Int).Mul(big.NewInt(1), new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS), nil)),
			expectedTDAISupply:       big.NewInt(0),
			expectedTradingDaiToMint: big.NewInt(0),
			expectError:              false,
		},
		{
			name:                     "Initial trading DAI higher than sDAI with rate higher than 1",
			initialSDAISupply:        sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(100))),
			initialTradingDAISupply:  sdk.NewCoins(sdk.NewCoin(types.TradingDAIDenom, sdkmath.NewInt(200))),
			sdaiPrice:                new(big.Int).Mul(big.NewInt(25), new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS-2), nil)),
			expectedTDAISupply:       big.NewInt(200),
			expectedTradingDaiToMint: big.NewInt(200),
			expectError:              false,
		},
		{
			name:                     "Trading DAI to mint is 0",
			initialSDAISupply:        sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(100))),
			initialTradingDAISupply:  sdk.NewCoins(sdk.NewCoin(types.TradingDAIDenom, sdkmath.NewInt(200))),
			sdaiPrice:                new(big.Int).Mul(big.NewInt(5), new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS-1), nil)),
			expectedTDAISupply:       big.NewInt(200),
			expectedTradingDaiToMint: big.NewInt(0),
			expectError:              true,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			tApp := testapp.NewTestAppBuilder(t).Build()
			ctx := tApp.InitChain()
			k := tApp.App.RatelimitKeeper
			bankKeeper := tApp.App.BankKeeper

			// Mint initial sDAI supply
			if !tc.initialSDAISupply.IsZero() {
				mintingErr := bankKeeper.MintCoins(ctx, types.PoolAccount, tc.initialSDAISupply)
				require.NoError(t, mintingErr)
				sendingErr := bankKeeper.SendCoinsFromModuleToModule(ctx, types.PoolAccount, types.SDAIPoolAccount, tc.initialSDAISupply)
				require.NoError(t, sendingErr)
			}

			// Mint initial tradingDAI supply
			if !tc.initialTradingDAISupply.IsZero() {
				require.NoError(t, bankKeeper.MintCoins(ctx, types.PoolAccount, tc.initialTradingDAISupply))
			}

			// Set sDAI price
			if tc.sdaiPrice != nil {
				k.SetSDAIPrice(ctx, tc.sdaiPrice)
			}

			tDAISupply, tradingDaiToMint, err := k.MintNewTDaiYield(ctx)
			if tc.expectError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.Equal(t, tc.expectedTDAISupply, tDAISupply)
				require.Equal(t, tc.expectedTradingDaiToMint, tradingDaiToMint)

				// Check the total supply of tradingDAI
				totalTradingDAISupply := bankKeeper.GetSupply(ctx, types.TradingDAIDenom).Amount.BigInt()
				expectedTotalTradingDAISupply := new(big.Int).Add(tc.expectedTDAISupply, tc.expectedTradingDaiToMint)
				require.Equal(t, expectedTotalTradingDAISupply, totalTradingDAISupply)
			}
		})
	}
}