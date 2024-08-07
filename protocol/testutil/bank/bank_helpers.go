package bank

import (
	"math/big"

	sdkmath "cosmossdk.io/math"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/network"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
)

// GetModuleAccUsdcBalance is a test utility function to query USDC balance
// of a module account from the bank module.
func GetModuleAccUsdcBalance(
	valAddress string,
	codec codec.Codec,
	moduleName string,
) (
	balance *big.Int,
	err error,
) {
	moduleAddress := authtypes.NewModuleAddress(moduleName)

	query := "docker exec interchain-security-instance interchain-security-cd" +
		" query bank balances " + moduleAddress.String()
	transferOut, _, err := network.QueryCustomNetwork(query)
	if err != nil {
		return nil, err
	}

	var balRes banktypes.QueryAllBalancesResponse

	err = codec.UnmarshalJSON(transferOut, &balRes)
	if err != nil {
		return nil, err
	}

	for _, coin := range balRes.Balances {
		if coin.Denom == constants.TDai.Denom {
			return coin.Amount.BigInt(), nil
		}
	}

	return nil, nil
}

// MatchUsdcOfAmount is a test utility function to generate a matcher function
// passed into mock.MatchedBy(). This matcher can be used to match parameters of
// *big.Int type when setting up mocks.
func MatchUsdcOfAmount(amount int64) func(coins sdk.Coins) bool {
	return func(coins sdk.Coins) bool {
		return coins[0].Amount.Equal(sdkmath.NewInt(amount))
	}
}

// FundAccount is a test utility function that funds an account by minting the
// coins in the mint module, and sending them to the address account.
func FundAccount(
	ctx sdk.Context,
	addr sdk.AccAddress,
	amounts sdk.Coins,
	bankKeeper bankkeeper.BaseKeeper,
) error {
	if err := bankKeeper.MintCoins(ctx, minttypes.ModuleName, amounts); err != nil {
		return err
	}

	return bankKeeper.SendCoinsFromModuleToAccount(ctx, minttypes.ModuleName, addr, amounts)
}

// FundModuleAccount is a test utility function that funds a module account by
// minting the coins in the mint module, and sending them to the module account.
func FundModuleAccount(
	ctx sdk.Context,
	moduleName string,
	amounts sdk.Coins,
	bankKeeper bankkeeper.BaseKeeper,
) error {
	if err := bankKeeper.MintCoins(ctx, minttypes.ModuleName, amounts); err != nil {
		return err
	}

	return bankKeeper.SendCoinsFromModuleToModule(ctx, minttypes.ModuleName, moduleName, amounts)
}

func FilterDenomFromBalances(
	balances []banktypes.Balance,
	denom string,
) []banktypes.Balance {
	newBalances := make([]banktypes.Balance, len(balances))
	for i, balance := range balances {
		newCoins := []sdk.Coin{}
		for _, coin := range balance.Coins {
			if coin.Denom != denom {
				newCoins = append(newCoins, coin)
			}
		}
		newBalances[i] = banktypes.Balance{
			Address: balance.Address,
			Coins:   newCoins,
		}
	}
	return newBalances
}
