package keeper

import (
	"fmt"
	"math/big"

	cosmoslog "cosmossdk.io/log"
	storetypes "cosmossdk.io/store/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	sdaiserver "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/sdaioracle"
)

type (
	Keeper struct {
		cdc                 codec.BinaryCodec
		storeKey            storetypes.StoreKey
		sDAIEventManager    sdaiserver.SDAIEventManager
		indexerEventManager indexer_manager.IndexerEventManager
		bankKeeper          types.BankKeeper
		perpetualsKeeper    types.PerpetualsKeeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey storetypes.StoreKey,
	sDAIEventManager sdaiserver.SDAIEventManager,
	indexerEventsManager indexer_manager.IndexerEventManager,
	bankKeeper types.BankKeeper,
	perpetualsKeeper types.PerpetualsKeeper,
) *Keeper {
	return &Keeper{
		cdc:                 cdc,
		storeKey:            storeKey,
		sDAIEventManager:    sDAIEventManager,
		indexerEventManager: indexerEventsManager,
		bankKeeper:          bankKeeper,
		perpetualsKeeper:    perpetualsKeeper,
	}
}

func (k Keeper) GetIndexerEventManager() indexer_manager.IndexerEventManager {
	return k.indexerEventManager
}

func (k Keeper) Logger(ctx sdk.Context) cosmoslog.Logger {
	return ctx.Logger().With(cosmoslog.ModuleKey, fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) InitializeForGenesis(ctx sdk.Context) {
	k.SetAssetYieldsIndex(ctx, big.NewRat(1, 1))
}

/* Functions related to the sDAI conversion */

// SetSDAIPrice sets the price of sDAI in the store as a big.Int
func (k Keeper) SetSDAIPrice(ctx sdk.Context, price *big.Int) {
	store := ctx.KVStore(k.storeKey)
	bz := price.Bytes()
	store.Set([]byte(types.SDaiKeyPrefix), bz)
}

// GetSDAIPrice gets the price of sDAI from the store as a big.Int
func (k Keeper) GetSDAIPrice(ctx sdk.Context) (price *big.Int, found bool) {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get([]byte(types.SDaiKeyPrefix))
	if bz == nil {
		return nil, false
	}
	price = new(big.Int).SetBytes(bz)
	return price, true
}

func (k Keeper) SetSDAILastBlockUpdated(ctx sdk.Context, blockHeight *big.Int) {
	store := ctx.KVStore(k.storeKey)
	bz := blockHeight.Bytes()
	store.Set([]byte(types.SDAILastBlockUpdate), bz)
}

// GetSDAIPrice gets the price of sDAI from the store as a big.Int
func (k Keeper) GetSDAILastBlockUpdated(ctx sdk.Context) (blockHeight *big.Int, found bool) {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get([]byte(types.SDAILastBlockUpdate))
	if bz == nil {
		return nil, false
	}
	blockHeight = new(big.Int).SetBytes(bz)
	return blockHeight, true
}

// SetAssetYieldsIndex sets the current asset yields index
func (k Keeper) SetAssetYieldsIndex(ctx sdk.Context, yieldsIndex *big.Rat) {
	store := ctx.KVStore(k.storeKey)
	bz, err := yieldsIndex.GobEncode()
	if err != nil {
		panic("Could not decode yields index when setting asset yields index.")
	}
	store.Set([]byte(types.AssetYieldsIndexPrefix), bz)
}

// GetSetAssetYieldsIndex gets the current asset yields index
func (k Keeper) GetAssetYieldsIndex(ctx sdk.Context) (yieldsIndex *big.Rat, found bool) {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get([]byte(types.AssetYieldsIndexPrefix))
	if bz == nil {
		return nil, false
	}
	yieldsIndex = new(big.Rat)
	err := yieldsIndex.GobDecode(bz)
	if err != nil {
		panic("Could not decode yields index when getting asset yields index.")
	}
	return yieldsIndex, true
}

// functions for better testing
func (k Keeper) GetSDAIEventManagerForTestingOnly() sdaiserver.SDAIEventManager {
	return k.sDAIEventManager
}

func (k Keeper) GetStoreKeyForTestingOnly() storetypes.StoreKey {
	return k.storeKey
}
