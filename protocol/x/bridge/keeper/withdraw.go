package keeper

import (
	"math/big"

	errorsmod "cosmossdk.io/errors"
	sdkmath "cosmossdk.io/math"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	yieldtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yield/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) HandleSdaiWithdraw(
	ctx sdk.Context,
	withdraw types.BridgeWithdraw,
) (err error) {

	sdaiAmount := new(big.Int)
	_, ok := sdaiAmount.SetString(withdraw.SdaiAmount, 10)
	if !ok {
		return errorsmod.Wrapf(types.ErrInvalidWithdrawSdaiAmount, "Sdai amount cannot be parsed.")
	}

	if sdaiAmount.Sign() <= 0 {
		return errorsmod.Wrapf(types.ErrInvalidWithdrawSdaiAmount, "Sdai amount must be greater than zero.")
	}

	account, err := sdk.AccAddressFromBech32(withdraw.Account)
	if err != nil {
		return err
	}

	err = types.EthAddress(withdraw.EthRecipient).Validate()
	if err != nil {
		return err
	}

	err = k.yieldKeeper.WithdrawSDaiFromTDai(ctx, account, sdaiAmount, false)
	if err != nil {
		return err
	}

	err = k.burnSdaiForWithdrawal(ctx, sdaiAmount)
	if err != nil {
		return err
	}

	acknowledgedEventInfo := k.GetAcknowledgedEventInfo(ctx)
	nextWithdrawalId := acknowledgedEventInfo.NextWithdrawId

	withdrawalEvent := types.BridgeEvent{
		Id: nextWithdrawalId,
		Coin: sdk.NewCoin(
			yieldtypes.SDaiDenom,
			sdkmath.NewIntFromBigInt(sdaiAmount),
		),
		Address:     withdraw.EthRecipient,
		BlockHeight: uint64(ctx.BlockHeight()),
		IsDeposit:   false,
	}
	k.AddBridgeWithdrawalEvent(ctx, withdrawalEvent)

	acknowledgedEventInfo.NextWithdrawId = nextWithdrawalId + 1
	acknowledgedEventInfo.KlyraBlockHeight = uint64(ctx.BlockHeight())
	k.SetAcknowledgedEventInfo(ctx, acknowledgedEventInfo)

	return nil
}

func (k Keeper) burnSdaiForWithdrawal(
	ctx sdk.Context,
	amount *big.Int,
) (err error) {
	sDaiCoins := sdk.NewCoins(sdk.NewCoin(yieldtypes.SDaiDenom, sdkmath.NewIntFromBigInt(amount)))
	return k.bankKeeper.BurnCoins(ctx, yieldtypes.SDaiPoolAccount, sDaiCoins)
}
