package keeper

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	assetskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/keeper"
	delaymsgtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/delaymsg/types"
	perpkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	priceskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/keeper"
	dbm "github.com/cosmos/cosmos-db"

	storetypes "cosmossdk.io/store/types"
	bridgeserver_types "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/bridge"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	yieldkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yield/keeper"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
)

type BridgeKeepersTestContext struct {
	Ctx                sdk.Context
	AccountKeeper      *authkeeper.AccountKeeper
	BankKeeper         *bankkeeper.BaseKeeper
	BridgeKeeper       *keeper.Keeper
	PricesKeeper       *priceskeeper.Keeper
	PerpetualsKeeper   *perpkeeper.Keeper
	AssetsKeeper       *assetskeeper.Keeper
	YieldKeeper        *yieldkeeper.Keeper
	BridgeEventManager *bridgeserver_types.BridgeEventManager
	MockDelayMsgKeeper *mocks.DelayMsgKeeper
	MockTimeProvider   *mocks.TimeProvider
	StoreKey           storetypes.StoreKey
}

func BridgeKeepers(
	t testing.TB,
) (ks BridgeKeepersTestContext,
) {
	ks.Ctx = initKeepers(t, func(
		db *dbm.MemDB,
		registry codectypes.InterfaceRegistry,
		cdc *codec.ProtoCodec,
		stateStore storetypes.CommitMultiStore,
		transientStoreKey storetypes.StoreKey,
	) []GenesisInitializer {
		// Define necessary keepers here for unit tests
		epochsKeeper, _ := createEpochsKeeper(stateStore, db, cdc)
		ks.PricesKeeper, _, _, _, _ = createPricesKeeper(stateStore, db, cdc, transientStoreKey)
		ks.AssetsKeeper, _ = createAssetsKeeper(
			stateStore,
			db,
			cdc,
			ks.PricesKeeper,
			transientStoreKey,
			true,
		)
		ks.PerpetualsKeeper, _ = createPerpetualsKeeper(
			stateStore,
			db,
			cdc,
			ks.PricesKeeper,
			epochsKeeper,
			ks.AssetsKeeper,
			nil,
			transientStoreKey,
		)
		ks.AccountKeeper, _ = createAccountKeeper(stateStore, db, cdc, registry)
		ks.BankKeeper, _ = createBankKeeper(stateStore, db, cdc, ks.AccountKeeper)
		ks.YieldKeeper, _ = createYieldKeeper(
			stateStore,
			db,
			cdc,
			ks.BankKeeper,
			ks.PerpetualsKeeper,
			transientStoreKey,
			true,
		)
		ks.BridgeKeeper, ks.StoreKey, ks.MockTimeProvider, ks.BridgeEventManager, ks.MockDelayMsgKeeper = createBridgeKeeper(
			stateStore,
			db,
			cdc,
			transientStoreKey,
			ks.YieldKeeper,
			ks.BankKeeper,
		)

		return []GenesisInitializer{ks.YieldKeeper, ks.PricesKeeper, ks.BridgeKeeper, ks.PerpetualsKeeper, ks.AssetsKeeper}
	})

	return ks
}

func createBridgeKeeper(
	stateStore storetypes.CommitMultiStore,
	db *dbm.MemDB,
	cdc *codec.ProtoCodec,
	transientStoreKey storetypes.StoreKey,
	yieldKeeper types.YieldKeeper,
	bankKeeper types.BankKeeper,
) (
	*keeper.Keeper,
	storetypes.StoreKey,
	*mocks.TimeProvider,
	*bridgeserver_types.BridgeEventManager,
	*mocks.DelayMsgKeeper,
) {
	storeKey := storetypes.NewKVStoreKey(types.StoreKey)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)

	bridgeTransientStoreKey := storetypes.NewTransientStoreKey(types.TransientStoreKey)
	stateStore.MountStoreWithDB(bridgeTransientStoreKey, storetypes.StoreTypeTransient, db)

	mockTimeProvider := &mocks.TimeProvider{}
	bridgeEventManager := bridgeserver_types.NewBridgeEventManager(mockTimeProvider)

	mockDelayMsgKeeper := &mocks.DelayMsgKeeper{}

	k := keeper.NewKeeper(
		cdc,
		storeKey,
		transientStoreKey,
		bridgeEventManager,
		yieldKeeper,
		bankKeeper,
		mockDelayMsgKeeper,
		[]string{
			lib.GovModuleAddress.String(),
			delaymsgtypes.ModuleAddress.String(),
		},
	)

	return k, storeKey, mockTimeProvider, bridgeEventManager, mockDelayMsgKeeper
}
