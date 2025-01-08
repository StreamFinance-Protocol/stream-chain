package keeper

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/ante"
	dbm "github.com/cosmos/cosmos-db"

	storetypes "cosmossdk.io/store/types"
	bridgekeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/keeper"
	bridgetypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/delaymsg/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/delaymsg/types"
	perpetualskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	perpetualstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	priceskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/keeper"
	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
)

func DelayMsgKeepers(
	t testing.TB,
) (
	ctx sdk.Context,
	delayMsgKeeper *keeper.Keeper,
	storeKey storetypes.StoreKey,
	bridgeKeeper *bridgekeeper.Keeper,
	bankKeeper bankkeeper.Keeper,
	perpsKeeper *perpetualskeeper.Keeper,
	pricesKeeper *priceskeeper.Keeper,
	authorities []string,
) {
	ctx = initKeepers(t, func(
		db *dbm.MemDB,
		_ codectypes.InterfaceRegistry,
		_ *codec.ProtoCodec,
		stateStore storetypes.CommitMultiStore,
		transientStoreKey storetypes.StoreKey,
	) []GenesisInitializer {
		encCfg := ante.MakeTestEncodingConfig()
		cdc := encCfg.Codec.(*codec.ProtoCodec)
		registry := encCfg.InterfaceRegistry

		router := baseapp.NewMsgServiceRouter()
		router.SetInterfaceRegistry(registry)

		// Register perpetuals messages for encoding / decoding.
		perpetualstypes.RegisterInterfaces(registry)

		epochsKeeper, _ := createEpochsKeeper(stateStore, db, cdc)
		pricesKeeper, _, _, _, _ = createPricesKeeper(stateStore, db, cdc, transientStoreKey)
		assetsKeeper, _ := createAssetsKeeper(stateStore, db, cdc, pricesKeeper, transientStoreKey, true)
		perpsKeeper, _ = createPerpetualsKeeper(stateStore, db, cdc, pricesKeeper, epochsKeeper, assetsKeeper, nil, transientStoreKey)
		accountKeeper, _ := createAccountKeeper(stateStore, db, cdc, registry)
		bankKeeper, _ = createBankKeeper(stateStore, db, cdc, accountKeeper)
		bridgeKeeper, _, _, _, _ =
			createBridgeKeeper(stateStore, db, cdc, transientStoreKey, bankKeeper)

		// Register perps keeper msg server for msg routing.
		perpetualstypes.RegisterMsgServer(router, perpetualskeeper.NewMsgServerImpl(perpsKeeper))

		// Register bridge keeper msg server for msg routing.
		bridgetypes.RegisterMsgServer(router, bridgekeeper.NewMsgServerImpl(bridgeKeeper))

		authorities = []string{
			bridgetypes.ModuleAddress.String(),
			lib.GovModuleAddress.String(),
		}
		delayMsgKeeper, storeKey = createDelayMsgKeeper(
			stateStore,
			db,
			cdc,
			router,
			authorities,
		)

		return []GenesisInitializer{
			delayMsgKeeper,
		}
	})
	return ctx, delayMsgKeeper, storeKey, bridgeKeeper, bankKeeper, perpsKeeper, pricesKeeper, authorities
}

func createDelayMsgKeeper(
	stateStore storetypes.CommitMultiStore,
	db *dbm.MemDB,
	cdc *codec.ProtoCodec,
	router *baseapp.MsgServiceRouter,
	authorities []string,
) (*keeper.Keeper, storetypes.StoreKey) {
	storeKey := storetypes.NewKVStoreKey(types.StoreKey)

	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)

	k := keeper.NewKeeper(
		cdc,
		storeKey,
		router,
		authorities,
	)
	return k, storeKey
}
