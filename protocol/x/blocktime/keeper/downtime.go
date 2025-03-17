package keeper

import (
	"fmt"
	"strconv"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) CheckForChainOutage(
	ctx sdk.Context,
) {

	previousBlockInfo, found := k.GetPreviousBlockInfo(ctx)
	if !found {
		return
	}

	if !ctx.BlockTime().Before(
		previousBlockInfo.Timestamp.Add(types.WITHDRAWAL_AND_TRANSFERS_BLOCKED_AFTER_CHAIN_OUTAGE_DURATION),
	) {
		k.SetOutageHeight(ctx, previousBlockInfo.Height)
	}
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
