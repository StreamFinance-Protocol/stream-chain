package keeper

import (
	"errors"
	"math/big"

	errorsmod "cosmossdk.io/errors"
	sdkmath "cosmossdk.io/math"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// divideAndRoundUp performs division with rounding up: calculates x / y and rounds up to the nearest whole number
func divideAndRoundUp(x, y *big.Int) *big.Int {
	if x.Cmp(big.NewInt(0)) == 0 {
		return big.NewInt(0)
	}
	result := new(big.Int).Sub(x, big.NewInt(1))
	result = result.Div(result, y)
	result = result.Add(result, big.NewInt(1))
	return result
}

// Converts sDAI to corresponding amount of tDAI, implementing the following maker code
/* 	https://etherscan.deth.net/address/0x83f20f44975d03b1b09e64809b757c47f942beea
	function deposit(uint256 assets, address receiver) external returns (uint256 shares) {
		uint256 chi = (block.timestamp > pot.rho()) ? pot.drip() : pot.chi();
		shares = assets * RAY / chi;
		_mint(assets, shares, receiver);
	}
*/
func (k Keeper) GetTradingDAIFromSDAIAmount(ctx sdk.Context, sDAI *big.Int) (*big.Int, error) {
	// Get the current sDAI price
	sDAIPrice, found := k.GetSDAIPrice(ctx)
	if !found {
		return nil, errors.New("sDAI price not found")
	}

	// Calculate shares = assets * RAY / chi. Shares and tDAI amount are equivalent
	tDAI := new(big.Int).Mul(sDAI, new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS), nil))
	tDAI = tDAI.Div(tDAI, sDAIPrice)

	return tDAI, nil
}

// Converts tDAI to corresponding amount of sDAI, implementing the following maker code
/*
	https://etherscan.deth.net/address/0x83f20f44975d03b1b09e64809b757c47f942beea
	function redeem(uint256 shares, address receiver, address owner) external returns (uint256 assets) {
		uint256 chi = (block.timestamp > pot.rho()) ? pot.drip() : pot.chi();
		assets = shares * chi / RAY;
		_burn(assets, shares, receiver, owner);
	}
*/
func (k Keeper) GetSDAIFromTradingDAIAmount(ctx sdk.Context, tradingDAI *big.Int) (*big.Int, error) {
	// Get the current sDAI price
	sDAIPrice, found := k.GetSDAIPrice(ctx)
	if !found {
		return nil, errors.New("sDAI price not found")
	}

	// Calculate shares = tradingDAI * RAY / sDAIPrice
	sDAI := new(big.Int).Mul(tradingDAI, sDAIPrice)
	sDAI = sDAI.Div(sDAI, new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS), nil))
	return sDAI, nil
}

// Inspired by the following maker code.
/*
	// https://etherscan.deth.net/address/0x83f20f44975d03b1b09e64809b757c47f942beea
	function withdraw(uint256 assets, address receiver, address owner) external returns (uint256 shares) {
		uint256 chi = (block.timestamp > pot.rho()) ? pot.drip() : pot.chi();
		shares = _divup(assets * RAY, chi);
		_burn(assets, shares, receiver, owner);
	}
*/
func (k Keeper) GetTradingDAIFromSDAIAmountAndRoundUp(ctx sdk.Context, sDAI *big.Int) (*big.Int, error) {
	// Get the current sDAI price
	sDAIPrice, found := k.GetSDAIPrice(ctx)
	if !found {
		return nil, errors.New("sDAI price not found")
	}

	// Calculate shares = _divup(assets * RAY / chi)
	tDAIAmount := new(big.Int).Mul(sDAI, new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS), nil))
	tDAIAmount = divideAndRoundUp(tDAIAmount, sDAIPrice)
	return tDAIAmount, nil
}

// MintTradingDAIToUserAccount transfers the input sDAI amount from the user's
// account to the pool account and mints the corresponding amount of trading 
// DAI into the user's account.
func (k Keeper) MintTradingDAIToUserAccount(
	ctx sdk.Context,
	userAddr sdk.AccAddress,
	sDAIAmount *big.Int,
) error {

	tradingDAIAmount, err := k.GetTradingDAIFromSDAIAmount(ctx, sDAIAmount)
	if err != nil {
		return errorsmod.Wrap(err, "failed to convert sDAI to trading DAI")
	}

	sDAICoins := sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewIntFromBigInt(sDAIAmount)))
	tradingDAICoins := sdk.NewCoins(sdk.NewCoin(types.TradingDAIDenom, sdkmath.NewIntFromBigInt(tradingDAIAmount)))

	if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, userAddr, types.PoolAccount, sDAICoins); err != nil {
		return errorsmod.Wrap(err, "failed to send sDAI to ratelimit module")
	}

	if err := k.bankKeeper.MintCoins(
		ctx, types.PoolAccount, tradingDAICoins,
	); err != nil {
		return errorsmod.Wrap(err, "failed to mint new trading DAI")
	}

	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.PoolAccount, userAddr, tradingDAICoins); err != nil {
		return errorsmod.Wrap(err, "failed to send trading DAI to recipient account")
	}

	return nil
}

func (k Keeper) RedeemSDAIFromTradingDAI(
	ctx sdk.Context,
	userAddr sdk.AccAddress,
	tDAIAmount *big.Int,
) error {

	sDAIAmount, err := k.GetSDAIFromTradingDAIAmount(ctx, tDAIAmount)
	if err != nil {
		return errorsmod.Wrap(err, "failed to convert trading DAI to sDAI")
	}

	sDAICoins := sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewIntFromBigInt(sDAIAmount)))
	tradingDAICoins := sdk.NewCoins(sdk.NewCoin(types.TradingDAIDenom, sdkmath.NewIntFromBigInt(tDAIAmount)))

	if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, userAddr, types.PoolAccount, tradingDAICoins); err != nil {
		return errorsmod.Wrap(err, "failed to send trading DAI to recipient account")
	}

	if err := k.bankKeeper.BurnCoins(
		ctx, types.PoolAccount, tradingDAICoins,
	); err != nil {
		return errorsmod.Wrap(err, "failed to burn trading DAI transferred to the pool account")
	}

	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.PoolAccount, userAddr, sDAICoins); err != nil {
		return errorsmod.Wrap(err, "failed to send sDAI to user account")
	}

	return nil
}

func (k Keeper) WithdrawSDAIFromTradingDAI(
	ctx sdk.Context,
	userAddr sdk.AccAddress,
	sDAIAmount *big.Int,
) error {

	tDAIAmount, err := k.GetTradingDAIFromSDAIAmountAndRoundUp(ctx, sDAIAmount)
	if err != nil {
		return errorsmod.Wrap(err, "failed to convert trading DAI to sDAI")
	}

	sDAICoins := sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewIntFromBigInt(sDAIAmount)))
	tradingDAICoins := sdk.NewCoins(sdk.NewCoin(types.TradingDAIDenom, sdkmath.NewIntFromBigInt(tDAIAmount)))

	if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, userAddr, types.PoolAccount, tradingDAICoins); err != nil {
		return errorsmod.Wrap(err, "failed to send trading DAI to recipient account")
	}

	if err := k.bankKeeper.BurnCoins(
		ctx, types.PoolAccount, tradingDAICoins,
	); err != nil {
		return errorsmod.Wrap(err, "failed to burn trading DAI transferred to the pool account")
	}

	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.PoolAccount, userAddr, sDAICoins); err != nil {
		return errorsmod.Wrap(err, "failed to send sDAI to user account")
	}

	return nil
}