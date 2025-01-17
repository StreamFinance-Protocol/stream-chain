package keeper

import (
	"fmt"
	"math/big"

	sdkmath "cosmossdk.io/math"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	ratelimittypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type Withdrawal struct {
	SdaiAmount   *big.Int
	Account      string
	EthRecipient string
}

func (k Keeper) HandleSdaiWithdraw(
	ctx sdk.Context,
	withdraw types.BridgeWithdraw,
) (err error) {

	sdaiAmount := new(big.Int)
	_, ok := sdaiAmount.SetString(withdraw.SdaiAmount, 10)
	if !ok {
		return fmt.Errorf("invalid SdaiAmount: %s", withdraw.SdaiAmount)
	}

	account, err := sdk.AccAddressFromBech32(withdraw.Account)
	if err != nil {
		return err
	}

	err = k.ratelimitKeeper.WithdrawSDaiFromTDai(ctx, account, sdaiAmount, false)
	if err != nil {
		return err
	}

	err = k.burnSdaiForWithdrawal(ctx, sdaiAmount)
	if err != nil {
		return err
	}

	recognizedEventInfo := k.bridgeEventManager.GetRecognizedEventInfo()
	k.bridgeEventManager.AddBridgeEvents(
		[]types.BridgeEvent{
			{
				Id:          recognizedEventInfo.NextWithdrawId,
				Coin:        sdk.NewCoin(ratelimittypes.SDaiDenom, sdkmath.NewIntFromBigInt(sdaiAmount)),
				Address:     withdraw.EthRecipient,
				BlockHeight: uint64(ctx.BlockHeight()),
				IsDeposit:   false,
			},
		},
	)

	return nil
}

func (k Keeper) burnSdaiForWithdrawal(
	ctx sdk.Context,
	amount *big.Int,
) (err error) {
	sDaiCoins := sdk.NewCoins(sdk.NewCoin(ratelimittypes.SDaiDenom, sdkmath.NewIntFromBigInt(amount)))
	return k.bankKeeper.BurnCoins(ctx, ratelimittypes.SDaiPoolAccount, sDaiCoins)
}
