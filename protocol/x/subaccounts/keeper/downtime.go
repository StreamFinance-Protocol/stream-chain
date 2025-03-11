package keeper

import (
	"fmt"
	"strconv"
	"time"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) GetChainOutageInfo(
	ctx sdk.Context,
) (
	isChainOutage bool,
	blockHeight uint32,
) {

	previousBlockInfo := k.blocktimeKeeper.GetPreviousBlockInfo(ctx)

	// TODO: This is a temporary fix to get around the test setup
	// We don't just check isZero() because sometimes the timestamp
	// of a testapp block is a few nanoseconds after the unix epoch
	if previousBlockInfo.Timestamp.Sub(time.Unix(0, 0)) < time.Second {
		return false, 0
	}

	if time.Since(previousBlockInfo.Timestamp) >= types.WITHDRAWAL_AND_TRANSFERS_BLOCKED_AFTER_CHAIN_OUTAGE_DURATION {

		k.SetOutageHeight(ctx, previousBlockInfo.Height)
		return true, previousBlockInfo.Height
	}

	return k.GetOutageHeight(ctx)

}

func (k Keeper) SetOutageHeight(ctx sdk.Context, height uint32) {
	store := ctx.KVStore(k.storeKey)
	store.Set([]byte(types.OutageHeightKey), []byte(fmt.Sprintf("%d", height)))
}

func (k Keeper) GetOutageHeight(ctx sdk.Context) (bool, uint32) {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get([]byte(types.OutageHeightKey))
	if bz == nil {
		return false, 0
	}
	height, err := strconv.ParseUint(string(bz), 10, 32)
	if err != nil {
		panic(err)
	}
	return true, uint32(height)
}
