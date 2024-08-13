package price_writer

import (
	"cosmossdk.io/log"

	aggregator "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/aggregator"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/codec"
	voteweighted "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/math"
	pricecache "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/pricefeed/pricecache"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	abci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// PriceWriter is an interface that defines the methods required to aggregate and apply prices from VE's
type PriceApplier struct {
	// used to aggregate votes into final prices
	voteAggregator aggregator.VoteAggregator

	// pk is the prices keeper that is used to write prices to state.
	pricesKeeper PriceApplierPricesKeeper

	// finalPriceCache is the cache that stores the final prices
	finalPriceCache pricecache.PriceCache

	// logger
	logger log.Logger

	// codecs
	voteExtensionCodec  codec.VoteExtensionCodec
	extendedCommitCodec codec.ExtendedCommitCodec
}

func NewPriceApplier(
	logger log.Logger,
	voteAggregator aggregator.VoteAggregator,
	pricesKeeper PriceApplierPricesKeeper,
	voteExtensionCodec codec.VoteExtensionCodec,
	extendedCommitCodec codec.ExtendedCommitCodec,
) *PriceApplier {
	return &PriceApplier{
		voteAggregator:      voteAggregator,
		pricesKeeper:        pricesKeeper,
		logger:              logger,
		voteExtensionCodec:  voteExtensionCodec,
		extendedCommitCodec: extendedCommitCodec,
	}
}

func (pa *PriceApplier) ApplyPricesFromVE(
	ctx sdk.Context,
	request *abci.RequestFinalizeBlock,
) error {
	if err := pa.writePricesToStore(ctx, request); err != nil {
		return err
	}

	return nil
}

func (pa *PriceApplier) writePricesToStore(
	ctx sdk.Context,
	request *abci.RequestFinalizeBlock,
) error {
	if pa.finalPriceCache.HasValidPrices(ctx.BlockHeight(), request.DecidedLastCommit.Round) {
		err := pa.writePricesToStoreFromCache(ctx)
		return err
	} else {
		prices, err := pa.getPricesAndAggregateFromVE(ctx, request)
		if err != nil {
			return err
		}
		pa.writePricesToStoreAndCache(ctx, prices, request.DecidedLastCommit.Round)
		return nil
	}
}

func (pa *PriceApplier) getPricesAndAggregateFromVE(
	ctx sdk.Context,
	request *abci.RequestFinalizeBlock,
) (map[string]voteweighted.AggregatorPricePair, error) {
	votes, err := aggregator.GetDaemonVotesFromBlock(
		request.Txs,
		pa.voteExtensionCodec,
		pa.extendedCommitCodec,
	)
	if err != nil {
		pa.logger.Error(
			"failed to get extended commit info from proposal",
			"height", request.Height,
			"num_txs", len(request.Txs),
			"err", err,
		)

		return nil, err
	}
	prices, err := pa.voteAggregator.AggregateDaemonVEIntoFinalPrices(ctx, votes)
	if err != nil {
		pa.logger.Error(
			"failed to aggregate prices",
			"height", request.Height,
			"err", err,
		)

		return nil, err
	}

	return prices, nil
}

func (pa *PriceApplier) GetCachedPrices() pricecache.PriceUpdates {
	return pa.finalPriceCache.GetPriceUpdates()
}

func (pa *PriceApplier) writePricesToStoreFromCache(ctx sdk.Context) error {
	pricesFromCache := pa.finalPriceCache.GetPriceUpdates()
	for _, price := range pricesFromCache {
		if price.SpotPrice != nil && price.PnlPrice != nil {

			marketPriceUpdate := &pricestypes.MarketPriceUpdate{
				MarketId:  price.MarketId,
				SpotPrice: price.SpotPrice.Uint64(),
				PnlPrice:  price.PnlPrice.Uint64(),
			}

			if err := pa.pricesKeeper.UpdateSpotAndPnlMarketPrices(
				ctx,
				marketPriceUpdate,
			); err != nil {
				pa.logger.Error(
					"failed to set prices for currency pair",
					"market_id", price.MarketId,
					"err", err,
				)

				return err
			}

			pa.logger.Info(
				"set prices for currency pair",
				"market_id", price.MarketId,
				"spot_price", price.SpotPrice.Uint64(),
				"pnl_price", price.PnlPrice.Uint64(),
			)
		} else if price.SpotPrice != nil {
			spotPriceUpdate := &pricestypes.MarketSpotPriceUpdate{
				MarketId:  price.MarketId,
				SpotPrice: price.SpotPrice.Uint64(),
			}

			if err := pa.pricesKeeper.UpdateSpotPrice(ctx, spotPriceUpdate); err != nil {
				pa.logger.Error(
					"failed to set spot price for currency pair",
					"market_id", price.MarketId,
					"err", err,
				)

				return err
			}

			pa.logger.Info(
				"set spot price for currency pair",
				"market_id", price.MarketId,
				"spot_price", price.SpotPrice.Uint64(),
			)
		} else if price.PnlPrice != nil {
			pnlPriceUpdate := &pricestypes.MarketPnlPriceUpdate{
				MarketId: price.MarketId,
				PnlPrice: price.PnlPrice.Uint64(),
			}

			if err := pa.pricesKeeper.UpdatePnlPrice(ctx, pnlPriceUpdate); err != nil {
				pa.logger.Error(
					"failed to set pnl price for currency pair",
					"market_id", price.MarketId,
					"err", err,
				)
				return err
			}

			pa.logger.Info(
				"set pnl price for currency pair",
				"market_id", price.MarketId,
				"pnl_price", price.PnlPrice.Uint64(),
			)
		}

	}
	return nil
}

func (pa *PriceApplier) writePricesToStoreAndCache(
	ctx sdk.Context,
	prices map[string]voteweighted.AggregatorPricePair,
	round int32,
) error {
	marketParams := pa.pricesKeeper.GetAllMarketParams(ctx)
	var finalPriceUpdates pricecache.PriceUpdates
	for _, market := range marketParams {
		pair := market.Pair
		pricePair, ok := prices[pair]
		if !ok {
			continue
		}

		shouldWriteSpotPrice, shouldWritePnlPrice := pa.shouldWritePriceToStore(ctx, pricePair, market.Id)
		if !shouldWriteSpotPrice && !shouldWritePnlPrice {
			continue
		}

		if !shouldWriteSpotPrice {
			pnlPriceUpdate := &pricestypes.MarketPnlPriceUpdate{
				MarketId: market.Id,
				PnlPrice: pricePair.PnlPrice.Uint64(),
			}

			if err := pa.pricesKeeper.UpdatePnlPrice(ctx, pnlPriceUpdate); err != nil {
				return err
			}

			pa.logger.Info(
				"set price for currency pair",
				"currency_pair", pair,
				"pnl_price", pricePair.PnlPrice.Uint64(),
			)

			finalPriceUpdates = append(finalPriceUpdates, pricecache.PriceUpdate{
				MarketId:  market.Id,
				SpotPrice: nil,
				PnlPrice:  pricePair.PnlPrice,
			})

		} else if !shouldWritePnlPrice {
			spotPriceUpdate := &pricestypes.MarketSpotPriceUpdate{
				MarketId:  market.Id,
				SpotPrice: pricePair.SpotPrice.Uint64(),
			}

			if err := pa.pricesKeeper.UpdateSpotPrice(ctx, spotPriceUpdate); err != nil {
				return err
			}

			pa.logger.Info(
				"set price for currency pair",
				"currency_pair", pair,
				"spot_price", pricePair.SpotPrice.Uint64(),
			)

			finalPriceUpdate := pricecache.PriceUpdate{
				MarketId:  market.Id,
				SpotPrice: pricePair.SpotPrice,
				PnlPrice:  nil,
			}

			finalPriceUpdates = append(finalPriceUpdates, finalPriceUpdate)

		} else {
			newPrice := &pricestypes.MarketPriceUpdate{
				MarketId:  market.Id,
				SpotPrice: pricePair.SpotPrice.Uint64(),
				PnlPrice:  pricePair.PnlPrice.Uint64(),
			}

			if err := pa.pricesKeeper.UpdateSpotAndPnlMarketPrices(ctx, newPrice); err != nil {
				pa.logger.Error(
					"failed to set price for currency pair",
					"currency_pair", pair,
					"err", err,
				)

				return err
			}

			pa.logger.Info(
				"set price for currency pair",
				"currency_pair", pair,
				"spot_price", newPrice.SpotPrice,
				"pnl_price", newPrice.PnlPrice,
			)
		}

		finalPriceUpdate := pricecache.PriceUpdate{
			MarketId:  market.Id,
			SpotPrice: pricePair.SpotPrice,
			PnlPrice:  pricePair.PnlPrice,
		}

		finalPriceUpdates = append(finalPriceUpdates, finalPriceUpdate)
	}

	pa.finalPriceCache.SetPriceUpdates(ctx, finalPriceUpdates, round)

	return nil
}

func (pa *PriceApplier) shouldWritePriceToStore(
	ctx sdk.Context,
	prices voteweighted.AggregatorPricePair,
	marketId uint32,
) (
	shouldWriteSpot bool,
	shouldWritePnl bool,
) {
	if prices.SpotPrice.Sign() == -1 {
		pa.logger.Error(
			"price is negative",
			"market_id", marketId,
			"spot_price", prices.SpotPrice.String(),
			"pnl_price", prices.PnlPrice.String(),
		)

		return false, false
	}

	priceUpdate := &pricestypes.MarketPriceUpdate{
		MarketId:  marketId,
		SpotPrice: prices.SpotPrice.Uint64(),
		PnlPrice:  prices.PnlPrice.Uint64(),
	}

	isValidSpot, isValidPnl := pa.pricesKeeper.PerformStatefulPriceUpdateValidation(ctx, priceUpdate)

	if !isValidSpot && !isValidPnl {
		pa.logger.Error(
			"price update validation failed",
			"market_id", marketId,
			"spot_price", prices.SpotPrice.String(),
			"pnl_price", prices.PnlPrice.String(),
		)

		return false, false
	} else if !isValidSpot {
		return false, true
	} else if !isValidPnl {
		return true, false
	}

	return isValidSpot, isValidPnl
}
