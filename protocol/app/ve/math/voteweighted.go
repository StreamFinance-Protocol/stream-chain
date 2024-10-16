package voteweighted

import (
	"fmt"
	"math/big"
	"sort"

	"cosmossdk.io/log"
	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/ethos-works/ethos/ethos-chain/x/ccv/consumer/types"
)

type CCValidatorStore interface {
	GetAllCCValidator(ctx sdk.Context) []types.CrossChainValidator
	GetCCValidator(ctx sdk.Context, addr []byte) (types.CrossChainValidator, bool)
}

type AggregatorPricePair struct {
	SpotPrice *big.Int
	PnlPrice  *big.Int
}

type PricesAggregateFn func(ctx sdk.Context, vePrices map[string]map[string]AggregatorPricePair) (map[string]AggregatorPricePair, error)
type ConversionRateAggregateFn func(ctx sdk.Context, veConversionRates map[string]*big.Int) (*big.Int, error)

// DefaultPowerThreshold defines the total voting power % that must be
// submitted in order for a currency pair to be considered for the
// final oracle price. We provide a default supermajority threshold
// of 2/3+.
var DefaultPowerThreshold = big.NewRat(2, 3)

type (
	// VoteWeightPriceInfo tracks the stake weight(s) + price(s) for a given currency pair.
	PriceInfo struct {
		SpotPrices  []PricePerValidator
		PnlPrices   []PricePerValidator
		TotalWeight math.Int
	}

	// VoteWeightPrice defines a price update that includes the stake weight of the validator.
	PricePerValidator struct {
		VoteWeight int64
		Price      *big.Int
	}

	ConverstionRateInfo struct {
		ConversionRates []PricePerValidator
		TotalWeight     math.Int
	}
)

func MedianPrices(
	logger log.Logger,
	validatorStore CCValidatorStore,
	threshold *big.Rat,
) PricesAggregateFn {
	return func(
		ctx sdk.Context,
		vePricesPerValidator map[string]map[string]AggregatorPricePair,
	) (map[string]AggregatorPricePair, error) {

		marketToPriceInfoWithVotingPower := getMarketToPriceInfoFromVotes(
			ctx,
			logger,
			validatorStore,
			vePricesPerValidator,
		)

		totalPower := GetTotalPower(ctx, validatorStore)

		return computeAggregatedPricesForAllMarkets(
			logger,
			marketToPriceInfoWithVotingPower,
			threshold,
			totalPower,
		)
	}
}

func getMarketToPriceInfoFromVotes(
	ctx sdk.Context,
	logger log.Logger,
	validatorStore CCValidatorStore,
	vePricesPerValidator map[string]map[string]AggregatorPricePair,
) map[string]PriceInfo {

	allMarketsPriceInfo := make(map[string]PriceInfo)

	for validatorAddr, validatorPrices := range vePricesPerValidator {
		validatorPower, err := getValidatorPowerByAddress(ctx, validatorStore, validatorAddr)
		if err != nil {
			logger.Info(
				"failed to get validator power, skipping",
				"validator_address", validatorAddr,
				"err", err,
			)
			continue
		}

		for market, pricePair := range validatorPrices {
			if pricePair.SpotPrice == nil {
				logger.Info(
					"both spot and pnl prices are nil, skipping",
					"validator_address", validatorAddr,
					"market", market,
				)
				continue
			}

			if _, ok := allMarketsPriceInfo[market]; !ok {
				allMarketsPriceInfo[market] = PriceInfo{
					SpotPrices:  make([]PricePerValidator, 0),
					PnlPrices:   make([]PricePerValidator, 0),
					TotalWeight: math.ZeroInt(),
				}
			}

			currMarketPriceInfo := allMarketsPriceInfo[market]

			currMarketPriceInfo.SpotPrices = append(
				currMarketPriceInfo.SpotPrices,
				PricePerValidator{
					VoteWeight: validatorPower,
					Price:      pricePair.SpotPrice,
				},
			)

			currMarketPriceInfo.PnlPrices = append(
				currMarketPriceInfo.PnlPrices,
				PricePerValidator{
					VoteWeight: validatorPower,
					Price:      pricePair.PnlPrice,
				},
			)

			currMarketPriceInfo.TotalWeight = currMarketPriceInfo.TotalWeight.Add(math.NewInt(validatorPower))
			allMarketsPriceInfo[market] = currMarketPriceInfo
		}
	}

	return allMarketsPriceInfo
}

func computeAggregatedPricesForAllMarkets(
	logger log.Logger,
	priceInfo map[string]PriceInfo,
	threshold *big.Rat,
	totalPower math.Int,
) (map[string]AggregatorPricePair, error) {
	finalPrices := make(map[string]AggregatorPricePair)

	for pair, info := range priceInfo {
		pricePair, valid := computeAggregatedPriceForMarket(
			logger,
			pair,
			info,
			threshold,
			totalPower,
		)
		if !valid {
			continue
		}

		finalPrices[pair] = pricePair
	}
	return finalPrices, nil
}

func computeAggregatedPriceForMarket(
	logger log.Logger,
	market string,
	priceInfo PriceInfo,
	threshold *big.Rat,
	totalPower math.Int,
) (AggregatorPricePair, bool) {

	// The total voting power % that submitted a price update for the given currency pair
	// must be greater than the threshold to be included in the final oracle price.
	percentSubmitted := new(big.Rat).SetFrac(
		priceInfo.TotalWeight.BigInt(),
		totalPower.BigInt(),
	)

	if percentSubmitted.Cmp(threshold) <= 0 {
		logger.Info(
			"not enough voting power to compute stake-weighted median prices for currency pair",
			"market", market,
			"threshold", threshold.String(),
			"percent_submitted", percentSubmitted.String(),
			"num_validators", len(priceInfo.SpotPrices),
		)
		return AggregatorPricePair{}, false
	}

	return AggregatorPricePair{
		SpotPrice: ComputeMedian(priceInfo.SpotPrices, priceInfo.TotalWeight),
		PnlPrice:  ComputeMedian(priceInfo.PnlPrices, priceInfo.TotalWeight),
	}, true
}

func MedianConversionRate(
	logger log.Logger,
	validatorStore CCValidatorStore,
	threshold *big.Rat,
) ConversionRateAggregateFn {
	return func(
		ctx sdk.Context,
		veConversionRatesPerValidator map[string]*big.Int,
	) (*big.Int, error) {
		conversionRateInfo := getConverstionRateInfoFromVotes(
			ctx,
			logger,
			validatorStore,
			veConversionRatesPerValidator,
		)

		totalPower := GetTotalPower(ctx, validatorStore)

		return computeFinalConversionRate(logger, conversionRateInfo, threshold, totalPower)
	}
}

func getConverstionRateInfoFromVotes(
	ctx sdk.Context,
	logger log.Logger,
	validatorStore CCValidatorStore,
	veConversionRatesPerValidator map[string]*big.Int,
) ConverstionRateInfo {

	conversionRateInfo := ConverstionRateInfo{
		ConversionRates: make([]PricePerValidator, 0),
		TotalWeight:     math.ZeroInt(),
	}

	for validatorAddr, validatorConversionRate := range veConversionRatesPerValidator {
		validatorPower, err := getValidatorPowerByAddress(
			ctx,
			validatorStore,
			validatorAddr,
		)
		if err != nil {
			logger.Info(
				"failed to get validator power, skipping",
				"validator_address", validatorAddr,
				"err", err,
			)
			continue
		}

		if validatorConversionRate == nil {
			logger.Info(
				"validator conversion rate is nil, skipping",
				"validator_address", validatorAddr,
			)
			continue
		}

		conversionRateInfo.ConversionRates = append(
			conversionRateInfo.ConversionRates,
			PricePerValidator{
				VoteWeight: validatorPower,
				Price:      validatorConversionRate,
			},
		)

		conversionRateInfo.TotalWeight = conversionRateInfo.TotalWeight.Add(math.NewInt(validatorPower))
	}

	return conversionRateInfo
}

func computeFinalConversionRate(
	logger log.Logger,
	conversionRateInfo ConverstionRateInfo,
	threshold *big.Rat,
	totalPower math.Int,
) (*big.Int, error) {

	// The total voting power % that submitted a conversion rate update
	// must be greater than the threshold to set a new conversion rate.
	percentSubmitted := new(big.Rat).SetFrac(
		conversionRateInfo.TotalWeight.BigInt(),
		totalPower.BigInt(),
	)

	if percentSubmitted.Cmp(threshold) <= 0 {
		logger.Info(
			"not enough voting power to compute stake-weighted median conversion rate",
			"threshold", threshold.String(),
			"percent_submitted", percentSubmitted.String(),
			"num_validators", len(conversionRateInfo.ConversionRates),
		)
		return nil, nil
	}

	finalConversionRate := ComputeMedian(conversionRateInfo.ConversionRates, conversionRateInfo.TotalWeight)

	logger.Info(
		"computed stake-weighted median conversion rate",
		"percent_submitted", percentSubmitted.String(),
		"threshold", threshold.String(),
		"num_validators", len(conversionRateInfo.ConversionRates),
		"final_conversion_rate", finalConversionRate.String(),
	)

	return finalConversionRate, nil
}

func ComputeMedian(prices []PricePerValidator, totalWeight math.Int) *big.Int {
	// Sort the prices by price.
	sort.SliceStable(prices, func(i, j int) bool {
		return prices[i].Price.Cmp(prices[j].Price) < 0
	})

	halfWeight := totalWeight.QuoRaw(2)
	isEven := totalWeight.Mod(math.NewInt(2)).IsZero()

	sum := math.ZeroInt()
	for i, price := range prices {
		sum = sum.Add(math.NewInt(price.VoteWeight))

		if sum.GT(halfWeight) || (isEven && sum.Equal(halfWeight)) {
			if isEven && sum.Equal(halfWeight) && i+1 < len(prices) {
				// If total weight is even and we're exactly at half, average with the next price
				nextPrice := prices[i+1].Price
				avg := new(big.Int).Add(price.Price, nextPrice)
				return avg.Div(avg, big.NewInt(2))
			}
			return price.Price
		}
	}

	return nil
}

func getValidatorPowerByAddress(
	ctx sdk.Context,
	validatorStore CCValidatorStore,
	validatorAddr string,
) (int64, error) {
	addr, err := sdk.ConsAddressFromBech32(validatorAddr)
	if err != nil {
		return 0, err
	}

	validator, found := validatorStore.GetCCValidator(ctx, addr.Bytes())
	if !found {
		return 0, fmt.Errorf("validator not found")
	}

	validatorPower := validator.GetPower()
	return validatorPower, nil
}
