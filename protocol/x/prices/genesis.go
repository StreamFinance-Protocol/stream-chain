package prices

import (
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the x/prices module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	k.InitializeForGenesis(ctx)

	if len(genState.MarketPrices) != len(genState.MarketParams) {
		panic("Expected the same number of market prices and market params")
	}

	// Set all the market params and prices.
	for i, param := range genState.MarketParams {
		if _, err := k.CreateMarket(ctx, param, genState.MarketPrices[i]); err != nil {
			panic(err)
		}
	}

	// Generate indexer events.
	for _, marketPrice := range genState.MarketPrices {
		priceUpdateIndexerEvents := keeper.GenerateMarketPriceUpdateIndexerEvent(marketPrice)

		k.GetIndexerEventManager().AddTxnEvent(
			ctx,
			indexerevents.SubtypeMarket,
			indexerevents.MarketEventVersion,
			indexer_manager.GetBytes(
				priceUpdateIndexerEvents,
			),
		)
	}
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	genesis.MarketParams = k.GetAllMarketParams(ctx)
	genesis.MarketPrices = k.GetAllMarketPrices(ctx)

	return genesis
}
