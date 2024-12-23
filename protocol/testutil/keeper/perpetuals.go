package keeper

import (
	"fmt"
	"testing"

	dbm "github.com/cosmos/cosmos-db"
	"github.com/cosmos/gogoproto/proto"

	storetypes "cosmossdk.io/store/types"
	pricefeedserver_types "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/pricefeed"
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets"
	assetskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/keeper"
	clobkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/keeper"
	delaymsgmoduletypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/delaymsg/types"
	epochskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/epochs/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices"
	priceskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/keeper"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

type PerpKeepersTestContext struct {
	Ctx               sdk.Context
	PricesKeeper      *priceskeeper.Keeper
	DaemonPriceCache  *pricefeedserver_types.MarketToExchangePrices
	AssetsKeeper      *assetskeeper.Keeper
	EpochsKeeper      *epochskeeper.Keeper
	PerpetualsKeeper  *keeper.Keeper
	StoreKey          storetypes.StoreKey
	MemKey            storetypes.StoreKey
	Cdc               *codec.ProtoCodec
	MockTimeProvider  *mocks.TimeProvider
	TransientStoreKey storetypes.StoreKey
}

func PerpetualsKeepers(
	t testing.TB,
) (pc PerpKeepersTestContext) {
	return PerpetualsKeepersWithClobHelpers(
		t,
		nil,
	)
}

func PerpetualsKeepersWithClobHelpers(
	t testing.TB,
	clobKeeper types.PerpetualsClobKeeper,
) (pc PerpKeepersTestContext) {
	pc.Ctx = initKeepers(t, func(
		db *dbm.MemDB,
		registry codectypes.InterfaceRegistry,
		cdc *codec.ProtoCodec,
		stateStore storetypes.CommitMultiStore,
		transientStoreKey storetypes.StoreKey,
	) []GenesisInitializer {

		// Define necessary keepers here for unit tests
		pc.PricesKeeper, _, pc.DaemonPriceCache, _, pc.MockTimeProvider = createPricesKeeper(
			stateStore,
			db,
			cdc,
			transientStoreKey,
		)
		pc.EpochsKeeper, _ = createEpochsKeeper(stateStore, db, cdc)
		pc.AssetsKeeper, _ = createAssetsKeeper(stateStore, db, cdc, pc.PricesKeeper, transientStoreKey, true)
		pc.PerpetualsKeeper, pc.StoreKey = createPerpetualsKeeperWithClobHelpers(
			stateStore,
			db,
			cdc,
			pc.PricesKeeper,
			pc.EpochsKeeper,
			pc.AssetsKeeper,
			clobKeeper,
			transientStoreKey,
		)
		pc.TransientStoreKey = transientStoreKey
		return []GenesisInitializer{pc.PricesKeeper, pc.PerpetualsKeeper}
	})

	// Mock time provider response for market creation.
	pc.MockTimeProvider.On("Now").Return(constants.TimeT)

	// Initialize perpetuals module parameters to default genesis values.
	prices.InitGenesis(pc.Ctx, *pc.PricesKeeper, constants.Prices_DefaultGenesisState)
	assets.InitGenesis(pc.Ctx, *pc.AssetsKeeper, constants.Assets_DefaultGenesisState)
	perpetuals.InitGenesis(pc.Ctx, *pc.PerpetualsKeeper, constants.Perpetuals_GenesisState_ParamsOnly)

	return pc
}

func createPerpetualsKeeperWithClobHelpers(
	stateStore storetypes.CommitMultiStore,
	db *dbm.MemDB,
	cdc *codec.ProtoCodec,
	pk *priceskeeper.Keeper,
	ek *epochskeeper.Keeper,
	ak *assetskeeper.Keeper,
	pck types.PerpetualsClobKeeper,
	transientStoreKey storetypes.StoreKey,
) (*keeper.Keeper, storetypes.StoreKey) {
	storeKey := storetypes.NewKVStoreKey(types.StoreKey)

	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)

	mockMsgSender := &mocks.IndexerMessageSender{}
	mockMsgSender.On("Enabled").Return(true)
	mockIndexerEventsManager := indexer_manager.NewIndexerEventManager(mockMsgSender, transientStoreKey, true)

	k := keeper.NewKeeper(
		cdc,
		storeKey,
		pk,
		ek,
		ak,
		mockIndexerEventsManager,
		[]string{
			lib.GovModuleAddress.String(),
			delaymsgmoduletypes.ModuleAddress.String(),
		},
		transientStoreKey,
	)

	k.SetClobKeeper(pck)

	return k, storeKey
}

func createPerpetualsKeeper(
	stateStore storetypes.CommitMultiStore,
	db *dbm.MemDB,
	cdc *codec.ProtoCodec,
	pk *priceskeeper.Keeper,
	ek *epochskeeper.Keeper,
	ak *assetskeeper.Keeper,
	clobKeeper *clobkeeper.Keeper,
	transientStoreKey storetypes.StoreKey,
) (*keeper.Keeper, storetypes.StoreKey) {
	return createPerpetualsKeeperWithClobHelpers(stateStore, db, cdc, pk, ek, ak, clobKeeper, transientStoreKey)
}

// PopulateTestPremiumStore populates either `PremiumVotes` (`isVote` is true) or
// `PremiumSamples` (`isVote` is false) for test.
// For each perpetual in the given perpetuals, insert the same list of testFundingSamples
// into state.
func PopulateTestPremiumStore(
	t *testing.T,
	ctx sdk.Context,
	k *keeper.Keeper,
	perpetuals []types.Perpetual,
	testFundingPremiums []int32,
	isVote bool,
) {
	for _, premiumPpm := range testFundingPremiums {
		newPremiums := make([]types.FundingPremium, len(perpetuals))
		for i, p := range perpetuals {
			newPremiums[i] = *types.NewFundingPremium(p.Params.Id, premiumPpm)
		}

		if isVote {
			err := k.AddPremiumVotes(ctx, newPremiums)
			require.NoError(t, err)
			return
		}

		err := k.AddPremiumSamples(ctx, newPremiums)
		require.NoError(t, err)
	}
}

func CreateTestPerpetuals(t *testing.T, ctx sdk.Context, k *keeper.Keeper) {
	for _, p := range constants.TestMarketPerpetuals {
		_, err := k.CreatePerpetual(
			ctx,
			p.Params.Id,
			p.Params.Ticker,
			p.Params.MarketId,
			p.Params.AtomicResolution,
			p.Params.DefaultFundingPpm,
			p.Params.LiquidityTier,
			p.Params.DangerIndexPpm,
			p.Params.CollateralPoolId,
			p.YieldIndex,
		)
		require.NoError(t, err)
	}
}

func CreateTestLiquidityTiers(t *testing.T, ctx sdk.Context, k *keeper.Keeper) {
	for _, l := range constants.LiquidityTiers {
		_, err := k.SetLiquidityTier(
			ctx,
			l.Id,
			l.Name,
			l.InitialMarginPpm,
			l.MaintenanceFractionPpm,
			l.ImpactNotional,
			l.OpenInterestLowerCap,
			l.OpenInterestUpperCap,
		)

		require.NoError(t, err)
	}
}

func CreateTestCollateralPools(t *testing.T, ctx sdk.Context, k *keeper.Keeper) {
	for _, cp := range constants.CollateralPools {
		_, err := k.UpsertCollateralPool(ctx,
			cp.CollateralPoolId,
			cp.MaxCumulativeInsuranceFundDeltaPerBlock,
			cp.MultiCollateralAssets,
			cp.QuoteAssetId,
		)
		require.NoError(t, err)
	}
}

// GetLiquidityTierUpsertEventsFromIndexerBlock returns the liquidityTier upsert events in the
// Indexer Block event Kafka message.
// TODO(IND-365): Consider using generics here to reduce duplicated code.
func GetLiquidityTierUpsertEventsFromIndexerBlock(
	ctx sdk.Context,
	keeper *keeper.Keeper,
) []*indexerevents.LiquidityTierUpsertEventV1 {
	var liquidityTierEvents []*indexerevents.LiquidityTierUpsertEventV1
	block := keeper.GetIndexerEventManager().ProduceBlock(ctx)
	if block == nil {
		return liquidityTierEvents
	}
	for _, event := range block.Events {
		if event.Subtype != indexerevents.SubtypeLiquidityTier {
			continue
		}
		var liquidityTierEvent indexerevents.LiquidityTierUpsertEventV1
		err := proto.Unmarshal(event.DataBytes, &liquidityTierEvent)
		if err != nil {
			panic(err)
		}
		liquidityTierEvents = append(liquidityTierEvents, &liquidityTierEvent)
	}
	return liquidityTierEvents
}

func GetUpdatePerpetualEventsFromIndexerBlock(
	ctx sdk.Context,
	keeper *keeper.Keeper,
) []*indexerevents.UpdatePerpetualEventV1 {
	var perpetualUpdateEvents []*indexerevents.UpdatePerpetualEventV1
	block := keeper.GetIndexerEventManager().ProduceBlock(ctx)
	if block == nil {
		return perpetualUpdateEvents
	}
	for _, event := range block.Events {
		if event.Subtype != indexerevents.SubtypeUpdatePerpetual {
			continue
		}
		var updatePerpetualEvent indexerevents.UpdatePerpetualEventV1
		err := proto.Unmarshal(event.DataBytes, &updatePerpetualEvent)
		if err != nil {
			panic(err)
		}
		perpetualUpdateEvents = append(perpetualUpdateEvents, &updatePerpetualEvent)
	}
	return perpetualUpdateEvents
}

func CreateNPerpetuals(
	t *testing.T,
	ctx sdk.Context,
	keeper *keeper.Keeper,
	pricesKeeper *priceskeeper.Keeper,
	n int,
) ([]types.Perpetual, error) {
	items := make([]types.Perpetual, n)
	allLiquidityTiers := keeper.GetAllLiquidityTiers(ctx)
	require.Greater(t, len(allLiquidityTiers), 0)

	for i := range items {
		CreateNMarkets(t, ctx, pricesKeeper, n)

		var defaultFundingPpm int32

		if i%3 == 0 {
			defaultFundingPpm = 1
		} else if i%3 == 1 {
			defaultFundingPpm = -1
		} else {
			defaultFundingPpm = 0
		}

		perpetual, err := keeper.CreatePerpetual(
			ctx,
			uint32(i),            // Id
			fmt.Sprintf("%v", i), // Ticker
			uint32(i),            // MarketId
			int32(i),             // AtomicResolution
			defaultFundingPpm,    // DefaultFundingPpm
			allLiquidityTiers[i%len(allLiquidityTiers)].Id, // LiquidityTier
			0,
			0,
			"0/1",
		)
		if err != nil {
			return items, err
		}

		items[i] = perpetual
	}
	return items, nil
}

func CreateCollateralPoolsAndLiquidityTiersAndNPerpetuals(
	t *testing.T,
	ctx sdk.Context,
	keeper *keeper.Keeper,
	pricesKeeper *priceskeeper.Keeper,
	n int,
) []types.Perpetual {
	// Create collateral pools.
	CreateTestCollateralPools(t, ctx, keeper)
	// Create liquidity tiers.
	CreateTestLiquidityTiers(t, ctx, keeper)
	// Create perpetuals.
	perpetuals, err := CreateNPerpetuals(t, ctx, keeper, pricesKeeper, n)
	require.NoError(t, err)
	return perpetuals
}

func CreatePerpetualMarkets(
	t *testing.T,
	ctx sdk.Context,
	perpKeeper *keeper.Keeper,
	perpetuals []types.Perpetual,
) {
	// Create liquidity tiers.
	CreateTestCollateralPools(t, ctx, perpKeeper)
	CreateTestLiquidityTiers(t, ctx, perpKeeper)

	for _, perp := range perpetuals {
		_, err := perpKeeper.CreatePerpetual(
			ctx,
			perp.Params.Id,
			perp.Params.Ticker,
			perp.Params.MarketId,
			perp.Params.AtomicResolution,
			perp.Params.DefaultFundingPpm,
			perp.Params.LiquidityTier,
			perp.Params.DangerIndexPpm,
			perp.Params.CollateralPoolId,
			perp.YieldIndex,
		)
		require.NoError(t, err)
	}
}
