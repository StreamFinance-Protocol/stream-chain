package keeper

import (
	"fmt"

	"cosmossdk.io/log"
	storetypes "cosmossdk.io/store/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type (
	Keeper struct {
		cdc      codec.BinaryCodec
		storeKey storetypes.StoreKey
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey storetypes.StoreKey,
) *Keeper {
	return &Keeper{
		cdc:      cdc,
		storeKey: storeKey,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With(log.ModuleKey, fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) GetPreviousBlockInfo(ctx sdk.Context) (types.BlockInfo, bool) {
	store := ctx.KVStore(k.storeKey)
	bytes := store.Get([]byte(types.PreviousBlockInfoKey))

	if bytes == nil {
		return types.BlockInfo{}, false
	}

	var info types.BlockInfo
	k.cdc.MustUnmarshal(bytes, &info)
	return info, true
}

func (k Keeper) SetPreviousBlockInfo(ctx sdk.Context, info *types.BlockInfo) {
	store := ctx.KVStore(k.storeKey)
	b := k.cdc.MustMarshal(info)
	store.Set([]byte(types.PreviousBlockInfoKey), b)
}
