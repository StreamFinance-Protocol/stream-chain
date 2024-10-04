package ve_writer

import (
	"fmt"
	"math/big"

	"cosmossdk.io/log"

	aggregator "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/aggregator"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/codec"
	voteweighted "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/math"
	pricecache "github.com/StreamFinance-Protocol/stream-chain/protocol/caches/pricecache"
	vecache "github.com/StreamFinance-Protocol/stream-chain/protocol/caches/vecache"

	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	abci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type VEApplier struct {
	// used to aggregate votes into final prices
	voteAggregator aggregator.VoteAggregator

	// prices keeper that is used to write prices to state.
	pricesKeeper VEApplierPricesKeeper

	// ratelimit keeper that is used to write sDAI conversion rate to state.
	ratelimitKeeper VEApplierRatelimitKeeper

	// finalPriceUpdateCache is the cache that stores the final prices
	finalPriceUpdateCache pricecache.PriceUpdatesCache

	// veCache is the cache that is used to store the seen votes
	veCache *vecache.VeCache

	// logger
	logger log.Logger

	// codecs
	voteExtensionCodec  codec.VoteExtensionCodec
	extendedCommitCodec codec.ExtendedCommitCodec
}

func NewVEApplier(
	logger log.Logger,
	voteAggregator aggregator.VoteAggregator,
	pricesKeeper VEApplierPricesKeeper,
	ratelimitKeeper VEApplierRatelimitKeeper,
	voteExtensionCodec codec.VoteExtensionCodec,
	extendedCommitCodec codec.ExtendedCommitCodec,
	finalPriceUpdateCache pricecache.PriceUpdatesCache,
	vecache *vecache.VeCache,
) *VEApplier {
	return &VEApplier{
		voteAggregator:        voteAggregator,
		pricesKeeper:          pricesKeeper,
		ratelimitKeeper:       ratelimitKeeper,
		finalPriceUpdateCache: finalPriceUpdateCache,
		logger:                logger,
		veCache:               vecache,
		voteExtensionCodec:    voteExtensionCodec,
		extendedCommitCodec:   extendedCommitCodec,
	}
}

func (vea *VEApplier) VoteAggregator() aggregator.VoteAggregator {
	return vea.voteAggregator
}

func (vea *VEApplier) ApplyVE(
	ctx sdk.Context,
	request *abci.RequestFinalizeBlock,
	writeToCache bool,
) error {
	if vea.finalPriceUpdateCache.HasValidValues(ctx.BlockHeight(), request.DecidedLastCommit.Round) {
		err := vea.writePricesToStoreFromCache(ctx)
		if err != nil {
			return err
		}
		err = vea.writeConversionRateToStoreFromCache(ctx)
		if err != nil {
			return err
		}
		return nil
	} else {
		prices, conversionRate, err := vea.getAggregatePricesAndConversionRateFromVE(ctx, request)
		if err != nil {
			return err
		}

		err = vea.WritePricesToStoreAndMaybeCache(ctx, prices, request.DecidedLastCommit.Round, writeToCache)
		if err != nil {
			return err
		}

		err = vea.WriteSDaiConversionRateToStoreAndMaybeCache(ctx, conversionRate, request.DecidedLastCommit.Round, writeToCache)
		if err != nil {
			return err
		}
		return nil
	}
}

func (vea *VEApplier) getAggregatePricesAndConversionRateFromVE(
	ctx sdk.Context,
	request *abci.RequestFinalizeBlock,
) (map[string]voteweighted.AggregatorPricePair, *big.Int, error) {
	votes, err := aggregator.GetDaemonVotesFromBlock(
		request.Txs,
		vea.voteExtensionCodec,
		vea.extendedCommitCodec,
	)
	if err != nil {
		vea.logger.Error(
			"failed to get extended commit info from proposal",
			"height", request.Height,
			"num_txs", len(request.Txs),
			"err", err,
		)

		return nil, nil, err
	}
	prices, conversionRate, err := vea.voteAggregator.AggregateDaemonVEIntoFinalPricesAndConversionRate(ctx, votes)
	if err != nil {
		vea.logger.Error(
			"failed to aggregate prices",
			"height", request.Height,
			"err", err,
		)

		return nil, nil, err
	}

	return prices, conversionRate, nil
}

func (vea *VEApplier) writePricesToStoreFromCache(ctx sdk.Context) error {
	pricesFromCache := vea.finalPriceUpdateCache.GetPriceUpdates()
	for _, price := range pricesFromCache {
		if price.SpotPrice == nil || price.PnlPrice == nil {
			return fmt.Errorf("cache spot price or pnl price is nil. spot price is %v, pnl price is %v", price.SpotPrice, price.PnlPrice)
		}

		marketPriceUpdate := &pricestypes.MarketPriceUpdate{
			MarketId:  price.MarketId,
			SpotPrice: price.SpotPrice.Uint64(),
			PnlPrice:  price.PnlPrice.Uint64(),
		}

		if err := vea.pricesKeeper.UpdateSpotAndPnlMarketPrices(
			ctx,
			marketPriceUpdate,
		); err != nil {
			vea.logger.Error(
				"failed to set prices for currency pair",
				"market_id", price.MarketId,
				"err", err,
			)

			return err
		}

		vea.logger.Info(
			"set prices for currency pair",
			"market_id", price.MarketId,
			"spot_price", price.SpotPrice.Uint64(),
			"pnl_price", price.PnlPrice.Uint64(),
		)
	}
	return nil
}

func (vea *VEApplier) writeConversionRateToStoreFromCache(ctx sdk.Context) error {
	sDaiConversionRate, blockHeight := vea.finalPriceUpdateCache.GetConversionRateUpdateAndBlockHeight()

	if sDaiConversionRate == nil || blockHeight == nil {
		return nil
	}

	if blockHeight.Int64() != ctx.BlockHeight() {
		return nil
	}

	err := vea.ratelimitKeeper.ProcessNewSDaiConversionRateUpdate(ctx, sDaiConversionRate, blockHeight)
	if err != nil {
		return err
	}

	return nil
}

func (vea *VEApplier) WritePricesToStoreAndMaybeCache(
	ctx sdk.Context,
	prices map[string]voteweighted.AggregatorPricePair,
	round int32,
	writeToCache bool,
) error {
	marketParams := vea.pricesKeeper.GetAllMarketParams(ctx)
	var finalPriceUpdates pricecache.PriceUpdates
	for _, market := range marketParams {
		pair := market.Pair
		pricePair, ok := prices[pair]
		if !ok {
			continue
		}

		shouldWriteSpotPrice, shouldWritePnlPrice := vea.shouldWritePriceToStore(ctx, pricePair, market.Id)

		if !shouldWriteSpotPrice && !shouldWritePnlPrice {
			continue
		}

		if !shouldWriteSpotPrice {
			pnlPriceUpdate, err := vea.writePnlPriceToStore(ctx, pricePair, market.Id)
			if err != nil {
				return err
			}

			finalPriceUpdates = append(finalPriceUpdates, pnlPriceUpdate)
		} else if !shouldWritePnlPrice {
			spotPriceUpdate, err := vea.writeSpotPriceToStore(ctx, pricePair, market.Id)
			if err != nil {
				return err
			}

			finalPriceUpdates = append(finalPriceUpdates, spotPriceUpdate)
		} else {
			pnlAndSpotPriceUpdate, err := vea.writePnlAndSpotPriceToStore(ctx, pricePair, market.Id)
			if err != nil {
				return err
			}

			finalPriceUpdates = append(finalPriceUpdates, pnlAndSpotPriceUpdate)
		}
	}

	if writeToCache {
		vea.finalPriceUpdateCache.SetPriceUpdates(ctx, finalPriceUpdates, round)
	}

	return nil
}

func (vea *VEApplier) WriteSDaiConversionRateToStoreAndMaybeCache(
	ctx sdk.Context,
	sDaiConversionRate *big.Int,
	round int32,
	writeToCache bool,
) error {
	if sDaiConversionRate == nil {
		return nil
	}

	if sDaiConversionRate.Sign() < 0 {
		return fmt.Errorf("sDAI conversion rate cannot be negative: %s", sDaiConversionRate.String())
	}

	if sDaiConversionRate.Sign() == 0 {
		return fmt.Errorf("sDAI conversion rate cannot be zero")
	}

	err := vea.ratelimitKeeper.ProcessNewSDaiConversionRateUpdate(ctx, sDaiConversionRate, big.NewInt(ctx.BlockHeight()))
	if err != nil {
		return err
	}

	if writeToCache {
		vea.finalPriceUpdateCache.SetSDaiConversionRateAndBlockHeight(ctx, sDaiConversionRate, big.NewInt(ctx.BlockHeight()), round)
	}

	return nil
}

func (vea *VEApplier) writePnlAndSpotPriceToStore(
	ctx sdk.Context,
	pricePair voteweighted.AggregatorPricePair,
	marketId uint32,
) (pricecache.PriceUpdate, error) {
	newPrice := &pricestypes.MarketPriceUpdate{
		MarketId:  marketId,
		SpotPrice: pricePair.SpotPrice.Uint64(),
		PnlPrice:  pricePair.PnlPrice.Uint64(),
	}

	if err := vea.pricesKeeper.UpdateSpotAndPnlMarketPrices(ctx, newPrice); err != nil {
		vea.logger.Error(
			"failed to set price for currency pair",
			"market_id", marketId,
			"err", err,
		)

		return pricecache.PriceUpdate{}, err
	}

	vea.logger.Info(
		"set price for currency pair",
		"market_id", marketId,
		"spot_price", newPrice.SpotPrice,
		"pnl_price", newPrice.PnlPrice,
	)

	finalPriceUpdate := pricecache.PriceUpdate{
		MarketId:  marketId,
		SpotPrice: pricePair.SpotPrice,
		PnlPrice:  pricePair.PnlPrice,
	}

	return finalPriceUpdate, nil
}

func (vea *VEApplier) writePnlPriceToStore(
	ctx sdk.Context,
	pricePair voteweighted.AggregatorPricePair,
	marketId uint32,
) (pricecache.PriceUpdate, error) {
	pnlPriceUpdate := &pricestypes.MarketPnlPriceUpdate{
		MarketId: marketId,
		PnlPrice: pricePair.PnlPrice.Uint64(),
	}

	if err := vea.pricesKeeper.UpdatePnlPrice(ctx, pnlPriceUpdate); err != nil {
		return pricecache.PriceUpdate{}, err
	}

	vea.logger.Info(
		"set price for currency pair",
		"market_id", marketId,
		"pnl_price", pricePair.PnlPrice.Uint64(),
	)

	return pricecache.PriceUpdate{
		MarketId:  marketId,
		SpotPrice: nil,
		PnlPrice:  pricePair.PnlPrice,
	}, nil
}

func (vea *VEApplier) writeSpotPriceToStore(
	ctx sdk.Context,
	pricePair voteweighted.AggregatorPricePair,
	marketId uint32,
) (pricecache.PriceUpdate, error) {
	spotPriceUpdate := &pricestypes.MarketSpotPriceUpdate{
		MarketId:  marketId,
		SpotPrice: pricePair.SpotPrice.Uint64(),
	}

	if err := vea.pricesKeeper.UpdateSpotPrice(ctx, spotPriceUpdate); err != nil {
		return pricecache.PriceUpdate{}, err
	}

	vea.logger.Info(
		"set price for currency pair",
		"market_id", marketId,
		"spot_price", pricePair.SpotPrice.Uint64(),
	)

	return pricecache.PriceUpdate{
		MarketId:  marketId,
		SpotPrice: pricePair.SpotPrice,
		PnlPrice:  nil,
	}, nil
}

func (vea *VEApplier) shouldWritePriceToStore(
	ctx sdk.Context,
	prices voteweighted.AggregatorPricePair,
	marketId uint32,
) (
	shouldWriteSpot bool,
	shouldWritePnl bool,
) {
	if prices.SpotPrice.Sign() == -1 {
		vea.logger.Error(
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

	isValidSpot, isValidPnl := vea.pricesKeeper.PerformStatefulPriceUpdateValidation(ctx, priceUpdate)

	if !isValidSpot && !isValidPnl {
		vea.logger.Error(
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

func (vea *VEApplier) GetCachedPrices() pricecache.PriceUpdates {
	return vea.finalPriceUpdateCache.GetPriceUpdates()
}

func (vea *VEApplier) GetCachedSDaiConversionRate() (*big.Int, *big.Int) {
	return vea.finalPriceUpdateCache.GetConversionRateUpdateAndBlockHeight()
}

func (pa *VEApplier) CacheSeenExtendedVotes(
	ctx sdk.Context,
	req *abci.RequestCommit,
) error {
	if req.ExtendedCommitInfo == nil {
		return nil
	}

	votes, err := aggregator.FetchVotesFromExtCommitInfo(*req.ExtendedCommitInfo, pa.voteExtensionCodec)
	if err != nil {
		return err
	}

	seenValidators := make(map[string]struct{})
	for _, vote := range votes {
		seenValidators[vote.ConsAddress.String()] = struct{}{}
	}

	pa.veCache.SetSeenVotesInCache(ctx, seenValidators)

	return nil
}
