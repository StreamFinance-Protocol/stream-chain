package keeper

import (
	sdaidaemontypes "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/sdaioracle"
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	perpskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	yieldskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/keeper"
	dbm "github.com/cosmos/cosmos-db"
	"github.com/cosmos/gogoproto/proto"

	storetypes "cosmossdk.io/store/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
)

func createYieldsKeeper(
	stateStore storetypes.CommitMultiStore,
	db *dbm.MemDB,
	cdc *codec.ProtoCodec,
	bk bankkeeper.Keeper,
	perpk *perpskeeper.Keeper,
	transientStoreKey storetypes.StoreKey,
	msgSenderEnabled bool,
) (*yieldskeeper.Keeper, storetypes.StoreKey) {
	storeKey := storetypes.NewKVStoreKey(types.StoreKey)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)

	sdaidaemontypes.SDAIEventFetcher = &sdaidaemontypes.MockEventFetcher{}
	sDAIEventManager := sdaidaemontypes.NewsDAIEventManager()

	mockMsgSender := &mocks.IndexerMessageSender{}
	mockMsgSender.On("Enabled").Return(msgSenderEnabled)
	mockIndexerEventsManager := indexer_manager.NewIndexerEventManager(mockMsgSender, transientStoreKey, true)

	k := yieldskeeper.NewKeeper(
		cdc,
		storeKey,
		sDAIEventManager,
		mockIndexerEventsManager,
		bk,
		*perpk,
	)

	return k, storeKey
}

func GetUpdateYieldsParamsFromIndexerBlock(
	ctx sdk.Context,
	keeper *yieldskeeper.Keeper,
) []*indexerevents.UpdateYieldsParamsEventV1 {
	var updateYieldsParamsEvents []*indexerevents.UpdateYieldsParamsEventV1
	block := keeper.GetIndexerEventManager().ProduceBlock(ctx)
	if block == nil {
		return updateYieldsParamsEvents
	}
	for _, event := range block.Events {
		if event.Subtype != indexerevents.SubtypeYieldsParams {
			continue
		}
		var updateYieldsParamsEvent indexerevents.UpdateYieldsParamsEventV1
		err := proto.Unmarshal(event.DataBytes, &updateYieldsParamsEvent)
		if err != nil {
			panic(err)
		}
		updateYieldsParamsEvents = append(updateYieldsParamsEvents, &updateYieldsParamsEvent)
	}
	return updateYieldsParamsEvents
}
