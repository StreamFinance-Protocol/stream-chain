package keeper

import (
	sdaidaemontypes "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/sdaioracle"
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	perpskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	ratelimitkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/keeper"
	dbm "github.com/cosmos/cosmos-db"
	"github.com/cosmos/gogoproto/proto"

	storetypes "cosmossdk.io/store/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
)

func createRatelimitKeeper(
	stateStore storetypes.CommitMultiStore,
	db *dbm.MemDB,
	cdc *codec.ProtoCodec,
	bk bankkeeper.Keeper,
	perpk *perpskeeper.Keeper,
	transientStoreKey storetypes.StoreKey,
	msgSenderEnabled bool,
) (*ratelimitkeeper.Keeper, storetypes.StoreKey) {
	storeKey := storetypes.NewKVStoreKey(types.StoreKey)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)

	sdaidaemontypes.SDAIEventFetcher = &sdaidaemontypes.MockEventFetcher{}
	sDAIEventManager := sdaidaemontypes.NewsDAIEventManager()

	mockMsgSender := &mocks.IndexerMessageSender{}
	mockMsgSender.On("Enabled").Return(msgSenderEnabled)
	mockIndexerEventsManager := indexer_manager.NewIndexerEventManager(mockMsgSender, transientStoreKey, true)

	k := ratelimitkeeper.NewKeeper(
		cdc,
		storeKey,
		sDAIEventManager,
		mockIndexerEventsManager,
		bk,
		*perpk,
	)

	return k, storeKey
}

func GetUpdateYieldParamsFromIndexerBlock(
	ctx sdk.Context,
	keeper *ratelimitkeeper.Keeper,
) []*indexerevents.UpdateYieldParamsEventV1 {
	var updateYieldParamsEvents []*indexerevents.UpdateYieldParamsEventV1
	block := keeper.GetIndexerEventManager().ProduceBlock(ctx)
	if block == nil {
		return updateYieldParamsEvents
	}
	for _, event := range block.Events {
		if event.Subtype != indexerevents.SubtypeYieldParams {
			continue
		}
		var updateYieldParamsEvent indexerevents.UpdateYieldParamsEventV1
		err := proto.Unmarshal(event.DataBytes, &updateYieldParamsEvent)
		if err != nil {
			panic(err)
		}
		updateYieldParamsEvents = append(updateYieldParamsEvents, &updateYieldParamsEvent)
	}
	return updateYieldParamsEvents
}
