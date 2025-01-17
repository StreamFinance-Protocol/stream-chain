package keeper

import (
	"fmt"

	"cosmossdk.io/log"
	storetypes "cosmossdk.io/store/types"
	bridgeserver "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/bridge"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"

	delaymsgtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/delaymsg/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type (
	Keeper struct {
		cdc                codec.BinaryCodec
		storeKey           storetypes.StoreKey
		bridgeEventManager *bridgeserver.BridgeEventManager
		ratelimitKeeper    types.RateLimitKeeper
		bankKeeper         types.BankKeeper
		delayMsgKeeper     delaymsgtypes.DelayMsgKeeper

		// authorities stores addresses capable of sending a bridge message.
		authorities map[string]struct{}
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey storetypes.StoreKey,
	bridgeEventManager *bridgeserver.BridgeEventManager,
	ratelimitKeeper types.RateLimitKeeper,
	bankKeeper types.BankKeeper,
	delayMsgKeeper delaymsgtypes.DelayMsgKeeper,
	authorities []string,
) *Keeper {
	return &Keeper{
		cdc:                cdc,
		storeKey:           storeKey,
		bridgeEventManager: bridgeEventManager,
		ratelimitKeeper:    ratelimitKeeper,
		bankKeeper:         bankKeeper,
		delayMsgKeeper:     delayMsgKeeper,
		authorities:        lib.UniqueSliceToSet(authorities),
	}
}

// HasAuthority returns whether `authority` exists in `k.authorities`.
func (k Keeper) HasAuthority(authority string) bool {
	_, ok := k.authorities[authority]
	return ok
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With(log.ModuleKey, fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) InitializeForGenesis(ctx sdk.Context) {
}
