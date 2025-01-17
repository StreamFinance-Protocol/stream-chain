package keeper

import (
	"encoding/binary"
	"fmt"
	"math/big"
	"math/rand"
	"sort"
	"time"

	storetypes "cosmossdk.io/store/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/pricefeed/client/constants"

	errorsmod "cosmossdk.io/errors"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"

	"cosmossdk.io/store/prefix"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/log"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/metrics"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	epochstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/epochs/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	gometrics "github.com/hashicorp/go-metrics"
)

// GetInsuranceFundName returns the name of the insurance fund account for a given perpetual.
// For isolated markets, the name is "insurance-fund:<perpetualId>".
// For cross markets, the name is "insurance-fund".
func (k Keeper) GetInsuranceFundName(ctx sdk.Context, perpetualId uint32) (string, error) {
	perpetual, err := k.GetPerpetual(ctx, perpetualId)
	if err != nil {
		return "", err
	}

	return types.InsuranceFundName + ":" + lib.UintToString(perpetual.Params.CollateralPoolId), nil
}

// GetInsuranceFundModuleAddress returns the address of the insurance fund account for a given perpetual.
func (k Keeper) GetInsuranceFundModuleAddress(ctx sdk.Context, perpetualId uint32) (sdk.AccAddress, error) {
	insuranceFundName, err := k.GetInsuranceFundName(ctx, perpetualId)
	if err != nil {
		return nil, err
	}
	return authtypes.NewModuleAddress(insuranceFundName), nil
}

// CreatePerpetual creates a new perpetual in the store.
// Returns an error if any of the perpetual fields fail validation,
// or if the `marketId` does not exist.
func (k Keeper) CreatePerpetual(
	ctx sdk.Context,
	id uint32,
	ticker string,
	marketId uint32,
	atomicResolution int32,
	defaultFundingPpm int32,
	liquidityTier uint32,
	dangerIndexPpm uint32,
	collateralPoolId uint32,
	yieldIndex string,
) (types.Perpetual, error) {
	// Check if perpetual exists.
	if k.HasPerpetual(ctx, id) {
		return types.Perpetual{}, errorsmod.Wrap(
			types.ErrPerpetualAlreadyExists,
			lib.UintToString(id),
		)
	}

	// Create the perpetual.
	perpetual := types.Perpetual{
		Params: types.PerpetualParams{
			Id:                id,
			Ticker:            ticker,
			MarketId:          marketId,
			AtomicResolution:  atomicResolution,
			DefaultFundingPpm: defaultFundingPpm,
			LiquidityTier:     liquidityTier,
			DangerIndexPpm:    dangerIndexPpm,
			CollateralPoolId:  collateralPoolId,
		},
		FundingIndex:    dtypes.ZeroInt(),
		OpenInterest:    dtypes.ZeroInt(),
		YieldIndex:      yieldIndex,
		LastFundingRate: dtypes.ZeroInt(),
	}

	// Store the new perpetual.
	if err := k.ValidateAndSetPerpetual(ctx, perpetual); err != nil {
		return types.Perpetual{}, err
	}

	k.SetEmptyPremiumSamples(ctx)
	k.SetEmptyPremiumVotes(ctx)

	return perpetual, nil
}

// HasPerpetual checks if a perpetual exists in the store.
func (k Keeper) HasPerpetual(
	ctx sdk.Context,
	id uint32,
) (found bool) {
	perpetualStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.PerpetualKeyPrefix))
	return perpetualStore.Has(lib.Uint32ToKey(id))
}

func (k Keeper) HasAuthority(authority string) bool {
	_, ok := k.authorities[authority]
	return ok
}

// ModifyPerpetual modifies an existing perpetual in the store.
// The new perpetual object must pass stateful and stateless validations.
// Upon successful modification, send an indexer event.
func (k Keeper) ModifyPerpetual(
	ctx sdk.Context,
	id uint32,
	ticker string,
	marketId uint32,
	defaultFundingPpm int32,
	liquidityTier uint32,
	dangerIndexPpm uint32,
) (types.Perpetual, error) {
	// Get perpetual.
	perpetual, err := k.GetPerpetual(ctx, id)
	if err != nil {
		return perpetual, err
	}

	// Modify perpetual.
	perpetual.Params.Ticker = ticker
	perpetual.Params.MarketId = marketId
	perpetual.Params.DefaultFundingPpm = defaultFundingPpm
	perpetual.Params.LiquidityTier = liquidityTier
	perpetual.Params.DangerIndexPpm = dangerIndexPpm
	// Store the modified perpetual.
	if err := k.ValidateAndSetPerpetual(ctx, perpetual); err != nil {
		return types.Perpetual{}, err
	}

	// Emit indexer event.
	k.GetIndexerEventManager().AddTxnEvent(
		ctx,
		indexerevents.SubtypeUpdatePerpetual,
		indexerevents.UpdatePerpetualEventVersion,
		indexer_manager.GetBytes(
			indexerevents.NewUpdatePerpetualEventV1(
				perpetual.Params.Id,
				perpetual.Params.Ticker,
				perpetual.Params.MarketId,
				perpetual.Params.AtomicResolution,
				perpetual.Params.LiquidityTier,
				perpetual.Params.DangerIndexPpm,
				perpetual.YieldIndex,
			),
		),
	)

	return perpetual, nil
}

// GetPerpetual returns a perpetual from its id.
func (k Keeper) GetPerpetual(
	ctx sdk.Context,
	id uint32,
) (val types.Perpetual, err error) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.PerpetualKeyPrefix))

	b := store.Get(lib.Uint32ToKey(id))
	if b == nil {
		return val, errorsmod.Wrap(types.ErrPerpetualDoesNotExist, lib.UintToString(id))
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, nil
}

// GetAllPerpetuals returns all perpetuals, sorted by perpetual Id.
func (k Keeper) GetAllPerpetuals(ctx sdk.Context) (list []types.Perpetual) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.PerpetualKeyPrefix))
	iterator := storetypes.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Perpetual
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	sort.Slice(list, func(i, j int) bool {
		return list[i].Params.Id < list[j].Params.Id
	})

	return list
}

// processStoredPremiums combines all stored premiums into a single premium value
// for each `MarketPremiums` in the premium storage.
// Returns a mapping from perpetual Id to summarized premium value.
// Arguments:
// - `premiumKey`: indicates whether the function is processing `PremiumSamples`
// or `PremiumVotes`.
// - `combineFunc`: a function that converts a list of premium values into one
// premium value (e.g. average or median)
// - `filterFunc`: a function that takes in a list of premium values and filter
// out some values.
// - `minNumPremiumsRequired`: minimum number of premium values required for each
// market. Padding will be added if `NumPremiums < minNumPremiumsRequired`.
func (k Keeper) processStoredPremiums(
	ctx sdk.Context,
	newEpochInfo epochstypes.EpochInfo,
	premiumKey string,
	minNumPremiumsRequired uint32,
	combineFunc func([]int32) int32,
	filterFunc func([]int32) []int32,
) (
	perpIdToPremium map[uint32]int32,
) {
	perpIdToPremium = make(map[uint32]int32)

	premiumStore := k.getPremiumStore(ctx, premiumKey)

	telemetry.SetGaugeWithLabels(
		[]string{
			types.ModuleName,
			metrics.NumPremiumsFromEpoch,
			metrics.Count,
		},
		float32(premiumStore.NumPremiums),
		[]gometrics.Label{
			metrics.GetLabelForStringValue(
				metrics.PremiumType,
				premiumKey,
			),
			metrics.GetLabelForStringValue(
				metrics.EpochInfoName,
				newEpochInfo.Name,
			),
			metrics.GetLabelForBoolValue(
				metrics.IsEpochOne,
				newEpochInfo.CurrentEpoch == 1,
			),
		},
	)

	for _, marketPremiums := range premiumStore.AllMarketPremiums {
		// Invariant: `len(marketPremiums.Premiums) <= NumPremiums`
		if uint32(len(marketPremiums.Premiums)) > premiumStore.NumPremiums {
			panic(fmt.Errorf(
				"marketPremiums (%+v) has more non-zero premiums than total number of premiums (%d)",
				marketPremiums,
				premiumStore.NumPremiums,
			))
		}

		// Use minimum number of premiums as final length of array, if it's greater than NumPremiums.
		// For `PremiumSamples`, this may happen in the event of a chain halt where there were
		// fewer than expected `funding-sample` epochs. For `PremiumVotes`, this may happen
		// if block times are longer than expected and hence there were not enough blocks to
		// collect votes.
		// Note `NumPremiums >= len(marketPremiums.Premiums)`, so `lenPadding >= 0`.
		lenPadding := int64(lib.Max(premiumStore.NumPremiums, minNumPremiumsRequired)) -
			int64(len(marketPremiums.Premiums))

		padding := make([]int32, lenPadding)
		paddedPremiums := append(marketPremiums.Premiums, padding...)

		perpIdToPremium[marketPremiums.PerpetualId] = combineFunc(filterFunc(paddedPremiums))
	}

	return perpIdToPremium
}

// processPremiumVotesIntoSamples summarizes premium votes from proposers into premium samples.
// For each perpetual market:
//  1. Get the median of `PremiumVotes` collected during the past `funding-sample` epoch.
//     This median value is referred to as a "sample".
//  2. Append the new "sample" to the `PremiumSamples` in state.
//  3. Clear `PremiumVotes` to an empty slice.
func (k Keeper) processPremiumVotesIntoSamples(
	ctx sdk.Context,
	newFundingSampleEpoch epochstypes.EpochInfo,
) {
	// For premium votes, we take the median of all votes without modifying the list
	// (using identify function as `filterFunc`)
	perpIdToSummarizedPremium := k.processStoredPremiums(
		ctx,
		newFundingSampleEpoch,
		types.PremiumVotesKey,
		k.GetParams(ctx).MinNumVotesPerSample,
		// `MustGetMedian` panics when the padded list is empty, which breaks the invariant that
		// Max(premiumStore.NumPremiums, minNumPremiumsRequired) > 0.
		// See details in implementation of `processStoredPremiums`.
		lib.MustGetMedian[int32],                     // combineFunc
		func(input []int32) []int32 { return input }, // filterFunc
	)

	newSamples := []types.FundingPremium{}
	newSamplesForEvent := []indexerevents.FundingUpdateV1{}

	allPerps := k.GetAllPerpetuals(ctx)

	for _, perp := range allPerps {
		summarizedPremium, found := perpIdToSummarizedPremium[perp.GetId()]
		if !found {
			summarizedPremium = 0
		}

		telemetry.SetGaugeWithLabels(
			[]string{
				types.ModuleName,
				metrics.PremiumSampleValue,
			},
			float32(summarizedPremium),
			[]gometrics.Label{
				metrics.GetLabelForIntValue(
					metrics.PerpetualId,
					int(perp.GetId()),
				),
			},
		)

		// Append all samples (including zeros) to `newSamplesForEvent`, since
		// the indexer should forward all sample values to users.
		newSamplesForEvent = append(newSamplesForEvent, indexerevents.FundingUpdateV1{
			PerpetualId:     perp.GetId(),
			FundingValuePpm: summarizedPremium,
		})

		if summarizedPremium != 0 {
			// Append non-zero sample to `PremiumSample` storage.
			newSamples = append(newSamples, types.FundingPremium{
				PerpetualId: perp.GetId(),
				PremiumPpm:  summarizedPremium,
			})
		}
	}

	if err := k.AddPremiumSamples(ctx, newSamples); err != nil {
		panic(err)
	}

	k.indexerEventManager.AddBlockEvent(
		ctx,
		indexerevents.SubtypeFundingValues,
		indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_END_BLOCK,
		indexerevents.FundingValuesEventVersion,
		indexer_manager.GetBytes(
			indexerevents.NewPremiumSamplesEvent(newSamplesForEvent),
		),
	)

	k.SetEmptyPremiumVotes(ctx)
}

// MaybeProcessNewFundingSampleEpoch summarizes premium votes stored in application
// states into new funding samples, if the current block is the start of a new
// `funding-sample` epoch. Otherwise, does nothing.
func (k Keeper) MaybeProcessNewFundingSampleEpoch(
	ctx sdk.Context,
) {
	numBlocks, err := k.epochsKeeper.NumBlocksSinceEpochStart(
		ctx,
		epochstypes.FundingSampleEpochInfoName,
	)
	// Invariant broken: `FundingSample` epoch must exist in epochs store.
	if err != nil {
		panic(err)
	}

	// If the current block is not the start of a new funding-sample epoch, do nothing.
	if numBlocks != 0 {
		return
	}

	newFundingSampleEpoch := k.epochsKeeper.MustGetFundingSampleEpochInfo(ctx)

	k.processPremiumVotesIntoSamples(ctx, newFundingSampleEpoch)
}

// getFundingIndexDelta returns fundingIndexDelta which represents the change of FundingIndex since
// the last time `funding-tick` was processed.
// TODO(DEC-1536): Make the 8-hour funding rate period configurable.
func (k Keeper) getFundingIndexDelta(
	ctx sdk.Context,
	perp types.Perpetual,
	big8hrFundingRatePpm *big.Int,
	timeSinceLastFunding uint32,
	quoteCurrencyAtomicResolution int32,
) (
	fundingIndexDelta *big.Int,
	err error,
) {
	marketPrice, err := k.pricesKeeper.GetMarketPrice(ctx, perp.Params.MarketId)
	if err != nil {
		return nil, fmt.Errorf("failed to get market price for perpetual %v, err = %w", perp.Params.Id, err)
	}

	// Get pro-rated funding rate adjusted by time delta.
	proratedFundingRate := new(big.Rat).SetInt(big8hrFundingRatePpm)
	proratedFundingRate.Mul(
		proratedFundingRate,
		new(big.Rat).SetUint64(uint64(timeSinceLastFunding)),
	)

	proratedFundingRate.Quo(
		proratedFundingRate,
		// TODO(DEC-1536): Make the 8-hour funding rate period configurable.
		new(big.Rat).SetUint64(3600*8),
	)

	bigFundingIndexDelta := lib.FundingRateToIndex(
		proratedFundingRate,
		perp.Params.AtomicResolution,
		quoteCurrencyAtomicResolution,
		marketPrice.SpotPrice,
		marketPrice.Exponent,
	)

	return bigFundingIndexDelta, nil
}

// GetAddPremiumVotes returns the newest premiums for all perpetuals,
// if the current block is the start of a new funding-sample epoch.
// Otherwise, does nothing and returns an empty message.
// Does not make any changes to state.
func (k Keeper) GetAddPremiumVotes(
	ctx sdk.Context,
) (
	msgAddPremiumVotes *types.MsgAddPremiumVotes,
) {
	newPremiumVotes, err := k.sampleAllPerpetuals(ctx)
	if err != nil {
		log.ErrorLogWithError(
			ctx,
			"failed to sample perpetuals",
			err,
		)
	}

	telemetry.SetGauge(
		float32(len(newPremiumVotes)),
		types.ModuleName,
		metrics.NewPremiumVotes,
		metrics.Count,
		metrics.Proposer,
	)

	return types.NewMsgAddPremiumVotes(newPremiumVotes)
}

// sampleAllPerpetuals takes premium samples for each perpetual market,
// and returns as a list of samples sorted by perpetual Id.
// Markets with zero premium samples are skipped in return value.
func (k Keeper) sampleAllPerpetuals(ctx sdk.Context) (
	samples []types.FundingPremium,
	err error,
) {
	allPerpetuals := k.GetAllPerpetuals(ctx)

	// Calculate `maxAbsPremiumVotePpm` of each liquidity tier.
	liquidityTierToMaxAbsPremiumVotePpm := k.getLiquidityTiertoMaxAbsPremiumVotePpm(ctx)

	// Measure latency of calling `GetPricePremiumForPerpetual` for all perpetuals.
	defer telemetry.ModuleMeasureSince(
		types.ModuleName,
		time.Now(),
		metrics.GetAllPerpetualPricePremiums,
		metrics.Latency,
	)

	marketIdToDaemonPrice := k.pricesKeeper.GetMarketIdToValidDaemonPrice(ctx)

	for _, perp := range allPerpetuals {
		daemonPrice, exists := marketIdToDaemonPrice[perp.Params.MarketId]
		// Valid daemon price is missing
		if !exists {
			// Only log and increment stats if height is passed initialization period.
			if ctx.BlockHeight() > pricestypes.PriceDaemonInitializationBlocks {
				log.ErrorLog(
					ctx,
					"Perpetual does not have valid daemon price. Skipping premium",
					constants.MarketIdLogKey, perp.Params.MarketId,
				)
				telemetry.IncrCounterWithLabels(
					[]string{
						types.ModuleName,
						metrics.MissingDaemonPriceForFunding,
						metrics.Count,
					},
					1,
					[]gometrics.Label{
						metrics.GetLabelForIntValue(
							metrics.MarketId,
							int(perp.Params.MarketId),
						),
					},
				)
			}
			// Skip this market, effectively emitting a zero premium.
			continue
		}

		// Get impact notional corresponding to this perpetual market (panic if its liquidity tier doesn't exist).
		liquidityTier, err := k.GetLiquidityTier(ctx, perp.Params.LiquidityTier)
		if err != nil {
			panic(err)
		}
		bigImpactNotionalQuoteQuantums := new(big.Int).SetUint64(liquidityTier.ImpactNotional)

		// Get `maxAbsPremiumVotePpm` for this perpetual's liquidity tier (panic if not found).
		maxAbsPremiumVotePpm, exists := liquidityTierToMaxAbsPremiumVotePpm[perp.Params.LiquidityTier]
		if !exists {
			panic(types.ErrLiquidityTierDoesNotExist)
		}

		quoteCurrencyAtomicResolution, err := k.GetQuoteCurrencyAtomicResolutionFromPerpetualId(ctx, perp.Params.Id)
		if err != nil {
			panic(err)
		}

		premiumPpm, err := k.clobKeeper.GetPricePremiumForPerpetual(
			ctx,
			perp.Params.Id,
			types.GetPricePremiumParams{
				DaemonPrice: pricestypes.MarketPrice{
					Id:        daemonPrice.Id,
					Exponent:  daemonPrice.Exponent,
					SpotPrice: daemonPrice.SpotPrice,
				},
				BaseAtomicResolution:        perp.Params.AtomicResolution,
				QuoteAtomicResolution:       quoteCurrencyAtomicResolution,
				ImpactNotionalQuoteQuantums: bigImpactNotionalQuoteQuantums,
				MaxAbsPremiumVotePpm:        maxAbsPremiumVotePpm,
			},
		)
		if err != nil {
			return nil, err
		}

		if premiumPpm == 0 {
			// Do not include zero premiums in message.

			log.DebugLog(
				ctx,
				fmt.Sprintf(
					"Perpetual (%d) has zero sampled premium. Not including in AddPremiumVotes message",
					perp.Params.Id,
				),
			)
			continue
		}

		samples = append(
			samples,
			*types.NewFundingPremium(
				perp.Params.Id,
				premiumPpm,
			),
		)
	}
	return samples, nil
}

// GetRemoveSampleTailsFunc returns a function that sorts the input samples (in place) and returns
// the sub-slice from the original slice, which removes `tailRemovalRatePpm` from top and bottom from the samples.
// Note the returned sub-slice is not a copy but references a sub-sequence of the original slice.
func (k Keeper) GetRemoveSampleTailsFunc(
	ctx sdk.Context,
	tailRemovalRatePpm uint32,
) func(input []int32) (output []int32) {
	return func(premiums []int32) []int32 {
		totalRemoval := lib.Int64MulPpm(
			int64(len(premiums)),
			tailRemovalRatePpm*2,
		)

		// Return early if no tail to remove.
		if totalRemoval == 0 {
			return premiums
		} else if totalRemoval >= int64(len(premiums)) {
			log.ErrorLog(
				ctx,
				fmt.Sprintf(
					"GetRemoveSampleTailsFunc: totalRemoval(%d) > length of premium samples (%d); skip removing",
					totalRemoval,
					len(premiums),
				),
			)
			return premiums
		}

		bottomRemoval := totalRemoval / 2
		topRemoval := totalRemoval - bottomRemoval

		end := int64(len(premiums)) - topRemoval

		sort.Slice(premiums, func(i, j int) bool { return premiums[i] < premiums[j] })

		return premiums[bottomRemoval:end]
	}
}

func (k Keeper) UpdateYieldIndexToNewMint(
	ctx sdk.Context,
	totalTDaiPreMint *big.Int,
	totalTDaiMinted *big.Int,
) error {
	if totalTDaiPreMint == nil {
		return types.ErrTotalTDaiPreMintIsNil
	}

	if totalTDaiMinted == nil {
		return types.ErrTotalTDaiMintedIsNil
	}

	if totalTDaiMinted.Cmp(big.NewInt(0)) == 0 {
		return nil
	}

	if totalTDaiPreMint.Cmp(big.NewInt(0)) == 0 {
		return types.ErrMintedTDaiFromNoPreexistingTDai
	}

	allPerps := k.GetAllPerpetuals(ctx)

	for _, perp := range allPerps {
		collateralPool, err := k.GetCollateralPool(ctx, perp.Params.CollateralPoolId)
		if err != nil {
			return err
		}

		if collateralPool.QuoteAssetId != assettypes.AssetTDai.Id {
			continue
		}

		modifiedPerp, err := k.GeneratePerpetualWithUpdatedYieldIndex(
			ctx,
			totalTDaiPreMint,
			totalTDaiMinted,
			perp,
		)
		if err != nil {
			return err
		}

		err = k.ValidateAndSetPerpetual(ctx, modifiedPerp)
		if err != nil {
			return err
		}

		k.GetIndexerEventManager().AddTxnEvent(
			ctx,
			indexerevents.SubtypeUpdatePerpetual,
			indexerevents.UpdatePerpetualEventVersion,
			indexer_manager.GetBytes(
				indexerevents.NewUpdatePerpetualEventV1(
					modifiedPerp.Params.Id,
					modifiedPerp.Params.Ticker,
					modifiedPerp.Params.MarketId,
					modifiedPerp.Params.AtomicResolution,
					modifiedPerp.Params.LiquidityTier,
					modifiedPerp.Params.DangerIndexPpm,
					modifiedPerp.YieldIndex,
				),
			),
		)
	}

	return nil
}

func (k Keeper) GeneratePerpetualWithUpdatedYieldIndex(
	ctx sdk.Context,
	totalTDaiPreMint *big.Int,
	totalTDaiMinted *big.Int,
	perp types.Perpetual,
) (
	types.Perpetual,
	error,
) {
	marketPrice, err := k.pricesKeeper.GetMarketPrice(ctx, perp.Params.MarketId)
	if err != nil {
		return types.Perpetual{}, err
	}

	// Calculate yield index for this epoch
	currEpochYieldIndex, err := k.CalculateYieldIndexForEpoch(ctx, totalTDaiPreMint, totalTDaiMinted, marketPrice, perp)
	if err != nil {
		return types.Perpetual{}, err
	}

	// Get current cumulative yield index
	cumulativeYieldIndex, err := perp.GetYieldIndexAsRat()
	if err != nil {
		return types.Perpetual{}, err
	}

	newYieldIndex := new(big.Rat).Add(cumulativeYieldIndex, currEpochYieldIndex)

	perp.YieldIndex = newYieldIndex.String()

	return perp, nil
}

func (k Keeper) CalculateYieldIndexForEpoch(
	ctx sdk.Context,
	totalTDaiPreMint *big.Int,
	totalTDaiMinted *big.Int,
	marketPrice pricestypes.MarketPrice,
	perpetual types.Perpetual,
) (
	yieldIndex *big.Rat,
	err error,
) {
	if totalTDaiPreMint == nil || totalTDaiPreMint.Cmp(big.NewInt(0)) == 0 {
		return nil, types.ErrTotalTDaiPreMintIsNil
	}

	if totalTDaiMinted == nil {
		return nil, types.ErrTotalTDaiMintedIsNil
	}

	if perpetual.Params.MarketId != marketPrice.Id {
		return nil, errorsmod.Wrapf(types.ErrPerpAndPriceMarketsMismatched, "Perpetual Market Id: %v. Price Market Id: %v.", perpetual.Params.MarketId, marketPrice.Id)
	}

	quoteCurrencyAtomicResolution, err := k.GetQuoteCurrencyAtomicResolutionFromPerpetualId(ctx, perpetual.Params.Id)
	if err != nil {
		return nil, err
	}

	oneBaseQuantum := big.NewInt(1)

	priceForOneBaseQuantum := lib.BaseToQuoteQuantums(
		oneBaseQuantum,
		perpetual.Params.AtomicResolution,
		quoteCurrencyAtomicResolution,
		marketPrice.PnlPrice,
		marketPrice.Exponent,
	)

	totalDaiMintedTimesPrice := new(big.Int).Mul(totalTDaiMinted, priceForOneBaseQuantum)

	yieldIndex = new(big.Rat).SetFrac(totalDaiMintedTimesPrice, totalTDaiPreMint)

	return yieldIndex, nil
}

// MaybeProcessNewFundingTickEpoch processes funding ticks if the current block
// is the start of a new funding-tick epoch. Otherwise, do nothing.
func (k Keeper) MaybeProcessNewFundingTickEpoch(ctx sdk.Context) {
	numBlocks, err := k.epochsKeeper.NumBlocksSinceEpochStart(
		ctx,
		epochstypes.FundingTickEpochInfoName,
	)
	if err != nil {
		panic(err)
	}

	// If the current block is not the start of a new funding-tick epoch, do nothing.
	if numBlocks != 0 {
		return
	}

	allPerps := k.GetAllPerpetuals(ctx)
	params := k.GetParams(ctx)

	fundingTickEpochInfo := k.epochsKeeper.MustGetFundingTickEpochInfo(ctx)
	fundingSampleEpochInfo := k.epochsKeeper.MustGetFundingSampleEpochInfo(ctx)

	// Use the ratio between funding-tick and funding-sample durations
	// as minimum number of samples required to get a premium rate.
	minSampleRequiredForPremiumRate := lib.MustDivideUint32RoundUp(
		fundingTickEpochInfo.Duration,
		fundingSampleEpochInfo.Duration,
	)

	// TODO(DEC-1449): Read `RemovedTailSampleRatioPpm` from state. Determine initial value.
	// This value should be 0% or some low value like 5%, since we already has a layer of
	// filtering we compute samples as median of premium votes.
	tailRemovalRatePpm := types.RemovedTailSampleRatioPpm

	// Get `sampleTailsRemovalFunc` which removes a percentage of top and bottom samples
	// from the input after sorting.

	sampleTailsRemovalFunc := k.GetRemoveSampleTailsFunc(ctx, tailRemovalRatePpm)

	// Process stored samples from last `funding-tick` epoch, and retrieve
	// a mapping from `perpetualId` to summarized premium rate for this epoch.
	// For premiums, we first remove a fixed amount of bottom/top samples, then
	// take the average of the remaining samples.
	perpIdToPremiumPpm := k.processStoredPremiums(
		ctx,
		fundingTickEpochInfo,
		types.PremiumSamplesKey,
		minSampleRequiredForPremiumRate,
		lib.AvgInt32,           // combineFunc
		sampleTailsRemovalFunc, // filterFunc
	)

	newFundingRatesAndIndicesForEvent := []indexerevents.FundingUpdateV1{}

	for _, perp := range allPerps {
		premiumPpm, found := perpIdToPremiumPpm[perp.Params.Id]

		if !found {
			log.InfoLog(
				ctx,
				fmt.Sprintf(
					"MaybeProcessNewFundingTickEpoch: No samples found for perpetual (%v) during `funding-tick` epoch\n",
					perp.Params.Id,
				),
			)

			premiumPpm = 0
		}

		bigFundingRatePpm := new(big.Int).SetInt64(int64(premiumPpm))

		// funding rate = premium + default funding
		bigFundingRatePpm.Add(
			bigFundingRatePpm,
			new(big.Int).SetInt64(int64(perp.Params.DefaultFundingPpm)),
		)

		liquidityTier, err := k.GetLiquidityTier(ctx, perp.Params.LiquidityTier)
		if err != nil {
			panic(err)
		}

		// Panic if maintenance fraction ppm is larger than its maximum value.
		if liquidityTier.MaintenanceFractionPpm > types.MaxMaintenanceFractionPpm {
			panic(errorsmod.Wrapf(
				types.ErrMaintenanceFractionPpmExceedsMax,
				"perpetual Id = (%d), liquidity tier Id = (%d), maintenance fraction ppm = (%v)",
				perp.Params.Id, perp.Params.LiquidityTier, liquidityTier.MaintenanceFractionPpm,
			))
		}

		// Clamp funding rate according to equation:
		// |R| <= clamp_factor * (initial margin - maintenance margin)
		fundingRateUpperBoundPpm := liquidityTier.GetMaxAbsFundingClampPpm(params.FundingRateClampFactorPpm)
		bigFundingRatePpm = lib.BigIntClamp(
			bigFundingRatePpm,
			new(big.Int).Neg(fundingRateUpperBoundPpm),
			fundingRateUpperBoundPpm,
		)

		// Emit clamped funding rate.
		telemetry.SetGaugeWithLabels(
			[]string{
				types.ModuleName,
				metrics.PremiumRate,
			},
			float32(bigFundingRatePpm.Int64()),
			[]gometrics.Label{
				metrics.GetLabelForIntValue(
					metrics.PerpetualId,
					int(perp.Params.Id),
				),
			},
		)

		if bigFundingRatePpm.Cmp(lib.BigMaxInt32()) > 0 {
			panic(errorsmod.Wrapf(
				types.ErrFundingRateInt32Overflow,
				"perpetual Id = (%d), funding rate = (%v)",
				perp.Params.Id, bigFundingRatePpm,
			))
		}

		err = k.ModifyLastFundingRate(ctx, perp.Params.Id, bigFundingRatePpm)
		if err != nil {
			panic(err)
		}

		if bigFundingRatePpm.Sign() != 0 {
			quoteCurrencyAtomicResolution, err := k.GetQuoteCurrencyAtomicResolutionFromPerpetualId(ctx, perp.Params.Id)
			if err != nil {
				panic(err)
			}

			fundingIndexDelta, err := k.getFundingIndexDelta(
				ctx,
				perp,
				bigFundingRatePpm,
				// use funding-tick duration as `timeSinceLastFunding`
				// TODO(DEC-1483): Handle the case when duration value is updated
				// during the epoch.
				fundingTickEpochInfo.Duration,
				quoteCurrencyAtomicResolution,
			)
			if err != nil {
				panic(err)
			}

			if err := k.ModifyFundingIndex(ctx, perp.Params.Id, fundingIndexDelta); err != nil {
				panic(err)
			}
		}

		// Get perpetual object with updated funding index.
		perp, err = k.GetPerpetual(ctx, perp.Params.Id)
		if err != nil {
			panic(err)
		}
		newFundingRatesAndIndicesForEvent = append(newFundingRatesAndIndicesForEvent, indexerevents.FundingUpdateV1{
			PerpetualId:     perp.Params.Id,
			FundingValuePpm: int32(bigFundingRatePpm.Int64()),
			FundingIndex:    perp.FundingIndex,
		})
	}

	k.indexerEventManager.AddBlockEvent(
		ctx,
		indexerevents.SubtypeFundingValues,
		indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_END_BLOCK,
		indexerevents.FundingValuesEventVersion,
		indexer_manager.GetBytes(
			indexerevents.NewFundingRatesAndIndicesEvent(newFundingRatesAndIndicesForEvent),
		),
	)

	// Clear premium samples.
	k.SetEmptyPremiumSamples(ctx)
}

// GetNetNotional returns the net notional in quote quantums, which can be represented by the following equation:
// `quantums / 10^baseAtomicResolution * marketPrice * 10^marketExponent * 10^quoteAtomicResolution`.
// Note that longs are positive, and shorts are negative.
// Returns an error if a perpetual with `id` does not exist or if the `perpetual.Params.MarketId` does
// not exist.
//
// Note that this function is getting called very frequently; metrics in this function
// should be sampled to reduce CPU time.
func (k Keeper) GetNetNotional(
	ctx sdk.Context,
	id uint32,
	bigQuantums *big.Int,
	quoteCurrencyAtomicResolution int32,
) (
	bigNetNotionalQuoteQuantums *big.Int,
	err error,
) {
	if rand.Float64() < metrics.LatencyMetricSampleRate {
		defer metrics.ModuleMeasureSinceWithLabels(
			types.ModuleName,
			[]string{metrics.GetNetNotional, metrics.Latency},
			time.Now(),
			[]gometrics.Label{
				metrics.GetLabelForStringValue(
					metrics.SampleRate,
					fmt.Sprintf("%f", metrics.LatencyMetricSampleRate),
				),
			},
		)
	}

	perpetual, marketPrice, err := k.GetPerpetualAndMarketPrice(ctx, id)
	if err != nil {
		return new(big.Int), err
	}

	return GetNetNotionalInQuoteQuantums(perpetual, marketPrice, bigQuantums, quoteCurrencyAtomicResolution), nil
}

// GetNetNotionalInQuoteQuantums returns the net notional in quote quantums, which can be
// represented by the following equation:
//
// `quantums / 10^baseAtomicResolution * marketPrice * 10^marketExponent * 10^quoteAtomicResolution`.
// Note that longs are positive, and shorts are negative.
//
// Also note that this is a stateless function.
func GetNetNotionalInQuoteQuantums(
	perpetual types.Perpetual,
	marketPrice pricestypes.MarketPrice,
	bigQuantums *big.Int,
	quoteCurrencyAtomicResolution int32,
) (
	bigNetNotionalQuoteQuantums *big.Int,
) {
	bigQuoteQuantums := lib.BaseToQuoteQuantums(
		bigQuantums,
		perpetual.Params.AtomicResolution,
		quoteCurrencyAtomicResolution,
		marketPrice.PnlPrice,
		marketPrice.Exponent,
	)

	return bigQuoteQuantums
}

// GetNetCollateral returns the net collateral in quote quantums. The net collateral is equal to
// the net open notional, which can be represented by the following equation:
// `quantums / 10^baseAtomicResolution * marketPrice * 10^marketExponent * 10^quoteAtomicResolution`.
// Note that longs are positive, and shorts are negative.
// Returns an error if a perpetual with `id` does not exist or if the `perpetual.Params.MarketId` does
// not exist.
func (k Keeper) GetNetCollateral(
	ctx sdk.Context,
	id uint32,
	bigQuantums *big.Int,
	quoteCurrencyAtomicResolution int32,
) (
	bigNetCollateralQuoteQuantums *big.Int,
	err error,
) {
	// The net collateral is equal to the net open notional.
	return k.GetNetNotional(ctx, id, bigQuantums, quoteCurrencyAtomicResolution)
}

// GetMarginRequirements returns initial and maintenance margin requirements in quote quantums, given the position
// size in base quantums.
//
// Margin requirements are a function of the absolute value of the open notional of the position as well as
// the parameters of the relevant `LiquidityTier` of the perpetual.
// Initial margin requirement is determined by multiplying `InitialMarginPpm` and `notionalValue`.
// `notionalValue` is determined by multiplying the size of the position by the oracle price of the position.
// Maintenance margin requirement is then simply a fraction (`maintenanceFractionPpm`) of initial margin requirement.
//
// Returns an error if a perpetual with `id`, `perpetual.Params.MarketId`, or
// `perpetual.Params.LiquidityTier` does not exist.
//
// Note that this function is getting called very frequently; metrics in this function
// should be sampled to reduce CPU time.
func (k Keeper) GetMarginRequirements(
	ctx sdk.Context,
	id uint32,
	bigQuantums *big.Int,
	quoteCurrencyAtomicResolution int32,
) (
	bigInitialMarginQuoteQuantums *big.Int,
	bigMaintenanceMarginQuoteQuantums *big.Int,
	err error,
) {
	if rand.Float64() < metrics.LatencyMetricSampleRate {
		defer metrics.ModuleMeasureSinceWithLabels(
			types.ModuleName,
			[]string{metrics.GetMarginRequirements, metrics.Latency},
			time.Now(),
			[]gometrics.Label{
				metrics.GetLabelForStringValue(
					metrics.SampleRate,
					fmt.Sprintf("%f", metrics.LatencyMetricSampleRate),
				),
			},
		)
	}

	// Get perpetual and market price.
	perpetual, marketPrice, err := k.GetPerpetualAndMarketPrice(ctx, id)
	if err != nil {
		return nil, nil, err
	}
	// Get perpetual's liquidity tier.
	liquidityTier, err := k.GetLiquidityTier(ctx, perpetual.Params.LiquidityTier)
	if err != nil {
		return nil, nil, err
	}

	bigInitialMarginQuoteQuantums,
		bigMaintenanceMarginQuoteQuantums = GetMarginRequirementsInQuoteQuantums(
		perpetual,
		marketPrice,
		liquidityTier,
		bigQuantums,
		quoteCurrencyAtomicResolution,
	)
	return bigInitialMarginQuoteQuantums, bigMaintenanceMarginQuoteQuantums, nil
}

// GetMarginRequirementsInQuoteQuantums returns initial and maintenance margin requirements
// in quote quantums, given the position size in base quantums.
//
// Note that this is a stateless function.
func GetMarginRequirementsInQuoteQuantums(
	perpetual types.Perpetual,
	marketPrice pricestypes.MarketPrice,
	liquidityTier types.LiquidityTier,
	bigQuantums *big.Int,
	quoteCurrencyAtomicResolution int32,
) (
	bigInitialMarginQuoteQuantums *big.Int,
	bigMaintenanceMarginQuoteQuantums *big.Int,
) {
	// Always consider the magnitude of the position regardless of whether it is long/short.
	bigAbsQuantums := new(big.Int).Set(bigQuantums).Abs(bigQuantums)

	// Calculate the notional value of the position in quote quantums.
	bigQuoteQuantums := lib.BaseToQuoteQuantums(
		bigAbsQuantums,
		perpetual.Params.AtomicResolution,
		quoteCurrencyAtomicResolution,
		marketPrice.PnlPrice,
		marketPrice.Exponent,
	)

	// Calculate the perpetual's open interest in quote quantums.
	openInterestQuoteQuantums := lib.BaseToQuoteQuantums(
		perpetual.OpenInterest.BigInt(), // OpenInterest is represented as base quantums.
		perpetual.Params.AtomicResolution,
		quoteCurrencyAtomicResolution,
		marketPrice.PnlPrice,
		marketPrice.Exponent,
	)

	// Initial margin requirement quote quantums = size in quote quantums * initial margin PPM.
	bigBaseInitialMarginQuoteQuantums := liquidityTier.GetInitialMarginQuoteQuantums(
		bigQuoteQuantums,
		big.NewInt(0), // pass in 0 as open interest to get base IMR.
	)

	// Maintenance margin requirement quote quantums = IM in quote quantums * maintenance fraction PPM.
	bigMaintenanceMarginQuoteQuantums = lib.BigRatRound(
		lib.BigRatMulPpm(
			new(big.Rat).SetInt(bigBaseInitialMarginQuoteQuantums),
			liquidityTier.MaintenanceFractionPpm,
		),
		true,
	)

	bigInitialMarginQuoteQuantums = liquidityTier.GetInitialMarginQuoteQuantums(
		bigQuoteQuantums,
		openInterestQuoteQuantums, // pass in current OI to get scaled IMR.
	)

	return bigInitialMarginQuoteQuantums, bigMaintenanceMarginQuoteQuantums
}

// GetSettlementPpm returns the net settlement amount ppm (in quote quantums) given
// the perpetual Id and position size (in base quantums).
// When handling rounding, always round positive settlement amount to zero, and
// negative amount to negative infinity. This ensures total amount of value does
// not increase after settlement.
// Example:
// For a round of funding payments, accounts A, B are to receive 102.5 quote quantums;
// account C is to pay 205 quote quantums.
// After settlement, accounts A, B are credited 102 quote quantum each; account C
// is debited 205 quote quantums.
func (k Keeper) GetSettlementPpm(
	ctx sdk.Context,
	perpetualId uint32,
	quantums *big.Int,
	index *big.Int,
) (
	bigNetSettlementPpm *big.Int,
	newFundingIndex *big.Int,
	err error,
) {
	// Get the perpetual for newest FundingIndex.
	perpetual, err := k.GetPerpetual(ctx, perpetualId)
	if err != nil {
		return big.NewInt(0), big.NewInt(0), err
	}

	bigNetSettlementPpm, newFundingIndex = GetSettlementPpmWithPerpetual(
		perpetual,
		quantums,
		index,
	)
	return bigNetSettlementPpm, newFundingIndex, nil
}

// GetSettlementPpm returns the net settlement amount ppm (in quote quantums) given
// the perpetual and position size (in base quantums).
//
// Note that this function is a stateless utility function.
func GetSettlementPpmWithPerpetual(
	perpetual types.Perpetual,
	quantums *big.Int,
	index *big.Int,
) (
	bigNetSettlementPpm *big.Int,
	newFundingIndex *big.Int,
) {
	fundingIndex := perpetual.FundingIndex.BigInt()

	indexDelta := new(big.Int).Sub(fundingIndex, index)

	// if indexDelta is zero, then net settlement is zero.
	if indexDelta.Sign() == 0 {
		return big.NewInt(0), fundingIndex
	}

	bigNetSettlementPpm = new(big.Int).Mul(indexDelta, quantums)

	// `bigNetSettlementPpm` carries sign. `indexDelta`` is the increase in `fundingIndex`, so if
	// the position is long (positive), the net settlement should be short (negative), and vice versa.
	// Thus, always negate `bigNetSettlementPpm` here.
	bigNetSettlementPpm = bigNetSettlementPpm.Neg(bigNetSettlementPpm)

	return bigNetSettlementPpm, fundingIndex
}

// GetPremiumSamples reads premium samples from the current `funding-tick` epoch,
// stored in a `PremiumStore` struct.
func (k Keeper) GetPremiumSamples(ctx sdk.Context) (
	premiumStore types.PremiumStore,
) {
	return k.getPremiumStore(ctx, types.PremiumSamplesKey)
}

// GetPremiumVotes premium sample votes from the current `funding-sample` epoch,
// stored in a `PremiumStore` struct.
func (k Keeper) GetPremiumVotes(ctx sdk.Context) (
	premiumStore types.PremiumStore,
) {
	return k.getPremiumStore(ctx, types.PremiumVotesKey)
}

func (k Keeper) getPremiumStore(ctx sdk.Context, key string) (
	premiumStore types.PremiumStore,
) {
	store := ctx.KVStore(k.storeKey)

	premiumStoreBytes := store.Get([]byte(key))

	if premiumStoreBytes == nil {
		return types.PremiumStore{}
	}

	k.cdc.MustUnmarshal(premiumStoreBytes, &premiumStore)
	return premiumStore
}

// AddPremiumVotes adds a list of new premium votes to state.
func (k Keeper) AddPremiumVotes(
	ctx sdk.Context,
	newVotes []types.FundingPremium,
) error {
	return k.addToPremiumStore(
		ctx,
		newVotes,
		types.PremiumVotesKey,
		metrics.AddPremiumVotes,
	)
}

// AddPremiumSamples adds a list of new premium samples to state.
func (k Keeper) AddPremiumSamples(
	ctx sdk.Context,
	newSamples []types.FundingPremium,
) error {
	return k.addToPremiumStore(
		ctx,
		newSamples,
		types.PremiumSamplesKey,
		metrics.AddPremiumSamples,
	)
}

func (k Keeper) addToPremiumStore(
	ctx sdk.Context,
	newSamples []types.FundingPremium,
	key string,
	metricsLabel string,
) error {
	defer telemetry.ModuleMeasureSince(
		types.ModuleName,
		time.Now(),
		metricsLabel,
		metrics.Latency,
	)

	premiumStore := k.getPremiumStore(ctx, key)

	marketPremiumsMap := premiumStore.GetMarketPremiumsMap()

	for _, sample := range newSamples {
		if !k.HasPerpetual(ctx, sample.PerpetualId) {
			return errorsmod.Wrapf(
				types.ErrPerpetualDoesNotExist,
				"perpetual ID = %d",
				sample.PerpetualId,
			)
		}

		premiums, found := marketPremiumsMap[sample.PerpetualId]
		if !found {
			premiums = types.MarketPremiums{
				Premiums:    []int32{},
				PerpetualId: sample.PerpetualId,
			}
		}
		premiums.Premiums = append(premiums.Premiums, sample.PremiumPpm)
		marketPremiumsMap[sample.PerpetualId] = premiums
	}

	k.setPremiumStore(
		ctx,
		*types.NewPremiumStoreFromMarketPremiumMap(
			marketPremiumsMap,
			premiumStore.NumPremiums+1, // increment NumPremiums
		),
		key,
	)

	return nil
}

func (k Keeper) ModifyFundingIndex(
	ctx sdk.Context,
	perpetualId uint32,
	bigFundingIndexDelta *big.Int,
) (
	err error,
) {
	// Get perpetual.
	perpetual, err := k.GetPerpetual(ctx, perpetualId)
	if err != nil {
		return err
	}

	bigFundingIndex := new(big.Int).Set(perpetual.FundingIndex.BigInt())
	bigFundingIndex.Add(bigFundingIndex, bigFundingIndexDelta)

	perpetual.FundingIndex = dtypes.NewIntFromBigInt(bigFundingIndex)
	k.setPerpetual(ctx, perpetual)
	return nil
}

func (k Keeper) ModifyLastFundingRate(
	ctx sdk.Context,
	perpetualId uint32,
	lastFundingRate *big.Int,
) (
	err error,
) {
	perpetual, err := k.GetPerpetual(ctx, perpetualId)
	if err != nil {
		return err
	}

	perpetual.LastFundingRate = dtypes.NewIntFromBigInt(lastFundingRate)
	k.setPerpetual(ctx, perpetual)

	return nil
}

// Modify the open interest of a perpetual in state.
func (k Keeper) ModifyOpenInterest(
	ctx sdk.Context,
	perpetualId uint32,
	openInterestDeltaBaseQuantums *big.Int,
) (
	err error,
) {
	// No-op if delta is zero.
	if openInterestDeltaBaseQuantums.Sign() == 0 {
		return nil
	}

	// Get perpetual.
	perpetual, err := k.GetPerpetual(ctx, perpetualId)
	if err != nil {
		return err
	}

	bigOpenInterest := perpetual.OpenInterest.BigInt()
	bigOpenInterest.Add(
		bigOpenInterest, // reuse pointer for efficiency
		openInterestDeltaBaseQuantums,
	)

	if bigOpenInterest.Sign() < 0 {
		return errorsmod.Wrapf(
			types.ErrOpenInterestWouldBecomeNegative,
			"perpetualId = %d, openInterest before = %s, after = %s",
			perpetualId,
			perpetual.OpenInterest.String(),
			bigOpenInterest.String(),
		)
	}

	perpetual.OpenInterest = dtypes.NewIntFromBigInt(bigOpenInterest)
	k.setPerpetual(ctx, perpetual)

	if ctx.ExecMode() == sdk.ExecModeFinalize {
		updatedOIStore := prefix.NewStore(ctx.TransientStore(k.transientStoreKey), []byte(types.UpdatedOIKeyPrefix))
		openInterestInBytes, err := perpetual.OpenInterest.Marshal()
		if err != nil {
			return err
		}
		updatedOIStore.Set(lib.Uint32ToKey(perpetualId), openInterestInBytes)
	}
	return nil
}

// SetEmptyPremiumSamples initializes empty premium samples for all perpetuals
func (k Keeper) SetEmptyPremiumSamples(
	ctx sdk.Context,
) {
	k.setPremiumStore(
		ctx,
		types.PremiumStore{},
		types.PremiumSamplesKey,
	)
}

// SetEmptyPremiumSamples initializes empty premium sample votes for all perpetuals
func (k Keeper) SetEmptyPremiumVotes(
	ctx sdk.Context,
) {
	k.setPremiumStore(
		ctx,
		types.PremiumStore{},
		types.PremiumVotesKey,
	)
}

func (k Keeper) SetPerpetualForTest(
	ctx sdk.Context,
	perpetual types.Perpetual,
) {
	k.setPerpetual(ctx, perpetual)
}

func (k Keeper) setPerpetual(
	ctx sdk.Context,
	perpetual types.Perpetual,
) {
	if perpetual.YieldIndex == "" {
		perpetual.YieldIndex = "0/1"
	}

	b := k.cdc.MustMarshal(&perpetual)
	perpetualStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.PerpetualKeyPrefix))
	perpetualStore.Set(lib.Uint32ToKey(perpetual.Params.Id), b)
}

// SetPerpetual validates the perpetual object and sets it in state.
func (k Keeper) ValidateAndSetPerpetual(
	ctx sdk.Context,
	perpetual types.Perpetual,
) error {
	if perpetual.YieldIndex == "" {
		perpetual.YieldIndex = "0/1"
	}

	if err := k.validatePerpetual(
		ctx,
		&perpetual,
	); err != nil {
		return err
	}

	k.setPerpetual(ctx, perpetual)
	return nil
}

// GetPerpetualAndMarketPrice retrieves a Perpetual by its id and its corresponding MarketPrice.
//
// Note that this function is getting called very frequently; metrics in this function
// should be sampled to reduce CPU time.
func (k Keeper) GetPerpetualAndMarketPrice(
	ctx sdk.Context,
	perpetualId uint32,
) (types.Perpetual, pricestypes.MarketPrice, error) {
	if rand.Float64() < metrics.LatencyMetricSampleRate {
		defer metrics.ModuleMeasureSinceWithLabels(
			types.ModuleName,
			[]string{metrics.GetPerpetualAndMarketPrice, metrics.Latency},
			time.Now(),
			[]gometrics.Label{
				metrics.GetLabelForStringValue(
					metrics.SampleRate,
					fmt.Sprintf("%f", metrics.LatencyMetricSampleRate),
				),
			},
		)
	}

	// Get perpetual.
	perpetual, err := k.GetPerpetual(ctx, perpetualId)
	if err != nil {
		return perpetual, pricestypes.MarketPrice{}, err
	}

	// Get market price.
	marketPrice, err := k.pricesKeeper.GetMarketPrice(ctx, perpetual.Params.MarketId)
	if err != nil {
		if errorsmod.IsOf(err, pricestypes.ErrMarketPriceDoesNotExist) {
			return perpetual, marketPrice, errorsmod.Wrap(
				types.ErrMarketDoesNotExist,
				fmt.Sprintf(
					"Market ID %d does not exist on perpetual ID %d",
					perpetual.Params.MarketId,
					perpetual.Params.Id,
				),
			)
		} else {
			return perpetual, marketPrice, err
		}
	}

	return perpetual, marketPrice, nil
}

// Performs the following validation (stateful and stateless) on a `Perpetual`
// structs fields, returning an error if any conditions are false:
// - MarketId is not a valid market.
// - All stateless validation performed in `validatePerpetualStateless`.
func (k Keeper) validatePerpetual(
	ctx sdk.Context,
	perpetual *types.Perpetual,
) error {
	// Stateless validation.
	if err := perpetual.Params.Validate(); err != nil {
		return err
	}

	// Validate `marketId` exists.
	if _, err := k.pricesKeeper.GetMarketPrice(ctx, perpetual.Params.MarketId); err != nil {
		return err
	}

	// Validate `liquidityTier` exists.
	if !k.HasLiquidityTier(ctx, perpetual.Params.LiquidityTier) {
		return errorsmod.Wrap(types.ErrLiquidityTierDoesNotExist, lib.UintToString(perpetual.Params.LiquidityTier))
	}

	// Validate `collateralPool` exists.
	if !k.HasCollateralPool(ctx, perpetual.Params.CollateralPoolId) {
		return errorsmod.Wrap(types.ErrCollateralPoolDoesNotExist, lib.UintToString(perpetual.Params.CollateralPoolId))
	}

	if perpetual.YieldIndex == "" {
		return types.ErrYieldIndexDoesNotExist
	}

	yieldIndex, err := perpetual.GetYieldIndexAsRat()

	if err != nil {
		return err
	}

	if yieldIndex.Cmp(big.NewRat(0, 1)) == -1 {
		return types.ErrYieldIndexNegative
	}

	return nil
}

func (k Keeper) setPremiumStore(
	ctx sdk.Context,
	premiumStore types.PremiumStore,
	key string,
) {
	b := k.cdc.MustMarshal(&premiumStore)

	// Get necessary stores
	store := ctx.KVStore(k.storeKey)

	store.Set([]byte(key), b)
}

func (k Keeper) SetPremiumSamples(
	ctx sdk.Context,
	premiumStore types.PremiumStore,
) {
	k.setPremiumStore(ctx, premiumStore, types.PremiumSamplesKey)
}

func (k Keeper) SetPremiumVotes(
	ctx sdk.Context,
	premiumStore types.PremiumStore,
) {
	k.setPremiumStore(ctx, premiumStore, types.PremiumVotesKey)
}

// PerformStatefulPremiumVotesValidation performs stateful validation on `MsgAddPremiumVotes`.
// For each vote, it checks that:
// - The perpetual Id is valid.
// - The premium vote value is correctly clamped.
// This function throws an error if the associated clob pair cannot be found or is not active.
func (k Keeper) PerformStatefulPremiumVotesValidation(
	ctx sdk.Context,
	msg *types.MsgAddPremiumVotes,
) (
	err error,
) {
	liquidityTierToMaxAbsPremiumVotePpm := k.getLiquidityTiertoMaxAbsPremiumVotePpm(ctx)

	for _, vote := range msg.Votes {
		// Check that the perpetual Id is valid.
		if _, err := k.GetPerpetual(ctx, vote.PerpetualId); err != nil {
			return errorsmod.Wrapf(
				types.ErrPerpetualDoesNotExist,
				"perpetualId = %d",
				vote.PerpetualId,
			)
		}

		// Check that premium vote value is correctly clamped.
		// Get perpetual object based on perpetual ID.
		perpetual, err := k.GetPerpetual(ctx, vote.PerpetualId)
		if err != nil {
			return err
		}

		// Zero values for perpetuals whose ClobPair is not active
		if isActive, err := k.clobKeeper.IsPerpetualClobPairActive(
			ctx, vote.PerpetualId,
		); err != nil {
			return errorsmod.Wrapf(
				err,
				"PerformStatefulPremiumVotesValidation: failed to determine ClobPair status for perpetual with id %d",
				vote.PerpetualId,
			)
		} else if !isActive { // reject premium votes for non active markets
			return errorsmod.Wrapf(
				types.ErrPremiumVoteForNonActiveMarket,
				"PerformStatefulPremiumVotesValidation: no premium vote should be included for inactive perpetual with id %d",
				vote.PerpetualId,
			)
		}

		// Get `maxAbsPremiumVotePpm` for this perpetual's liquidity tier (panic if not found).
		maxAbsPremiumVotePpm, exists := liquidityTierToMaxAbsPremiumVotePpm[perpetual.Params.LiquidityTier]
		if !exists {
			panic(types.ErrLiquidityTierDoesNotExist)
		}
		// Check premium vote value is within bounds.
		bigAbsPremiumPpm := new(big.Int).SetUint64(uint64(
			lib.AbsInt32(vote.PremiumPpm),
		))
		if bigAbsPremiumPpm.Cmp(maxAbsPremiumVotePpm) > 0 {
			return errorsmod.Wrapf(
				types.ErrPremiumVoteNotClamped,
				"perpetualId = %d, premium vote = %d, maxAbsPremiumVotePpm = %d",
				vote.PerpetualId,
				vote.PremiumPpm,
				maxAbsPremiumVotePpm,
			)
		}
	}

	return nil
}

/* === LIQUIDITY TIER FUNCTIONS === */

// HasLiquidityTier checks if a liquidity tier exists in the store.
func (k Keeper) HasLiquidityTier(
	ctx sdk.Context,
	id uint32,
) (found bool) {
	ltStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.LiquidityTierKeyPrefix))
	return ltStore.Has(lib.Uint32ToKey(id))
}

// `SetLiquidityTier` sets a liquidity tier in the store (i.e. updates if `id` exists and creates otherwise).
// Returns an error if any of its fields fails validation.
func (k Keeper) SetLiquidityTier(
	ctx sdk.Context,
	id uint32,
	name string,
	initialMarginPpm uint32,
	maintenanceFractionPpm uint32,
	impactNotional uint64,
	openInterestLowerCap uint64,
	openInterestUpperCap uint64,
) (
	liquidityTier types.LiquidityTier,
	err error,
) {
	// Construct liquidity tier.
	liquidityTier = types.LiquidityTier{
		Id:                     id,
		Name:                   name,
		InitialMarginPpm:       initialMarginPpm,
		MaintenanceFractionPpm: maintenanceFractionPpm,
		ImpactNotional:         impactNotional,
		OpenInterestLowerCap:   openInterestLowerCap,
		OpenInterestUpperCap:   openInterestUpperCap,
	}

	// Validate liquidity tier's fields.
	if err := liquidityTier.Validate(); err != nil {
		return liquidityTier, err
	}

	// Set liquidity tier in store.
	k.setLiquidityTier(ctx, liquidityTier)

	// Emit indexer event.
	k.GetIndexerEventManager().AddTxnEvent(
		ctx,
		indexerevents.SubtypeLiquidityTier,
		indexerevents.LiquidityTierEventVersion,
		indexer_manager.GetBytes(
			indexerevents.NewLiquidityTierUpsertEvent(
				id,
				name,
				initialMarginPpm,
				maintenanceFractionPpm,
				openInterestLowerCap,
				openInterestUpperCap,
			),
		),
	)

	return liquidityTier, nil
}

// `GetLiquidityTier` gets a liquidity tier given its id.
func (k Keeper) GetLiquidityTier(ctx sdk.Context, id uint32) (
	liquidityTier types.LiquidityTier,
	err error,
) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.LiquidityTierKeyPrefix))

	b := store.Get(lib.Uint32ToKey(id))
	if b == nil {
		return liquidityTier, errorsmod.Wrap(types.ErrLiquidityTierDoesNotExist, lib.UintToString(id))
	}

	k.cdc.MustUnmarshal(b, &liquidityTier)
	return liquidityTier, nil
}

// `GetAllLiquidityTiers` returns all liquidity tiers, sorted by id.
func (k Keeper) GetAllLiquidityTiers(ctx sdk.Context) (list []types.LiquidityTier) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.LiquidityTierKeyPrefix))
	iterator := storetypes.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.LiquidityTier
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	sort.Slice(list, func(i, j int) bool {
		return list[i].Id < list[j].Id
	})

	return list
}

// `setLiquidityTier` sets a liquidity tier in store.
func (k Keeper) setLiquidityTier(
	ctx sdk.Context,
	liquidityTier types.LiquidityTier,
) {
	b := k.cdc.MustMarshal(&liquidityTier)
	liquidityTierStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.LiquidityTierKeyPrefix))
	liquidityTierStore.Set(lib.Uint32ToKey(liquidityTier.Id), b)
}

/* === COLLATERAL POOL FUNCTIONS === */

func (k Keeper) GetQuoteAssetIdFromPerpetualId(ctx sdk.Context, perpetualId uint32) (uint32, error) {
	quoteAsset, err := k.GetQuoteAssetFromPerpetualId(ctx, perpetualId)
	if err != nil {
		return 0, err
	}

	return quoteAsset.Id, nil
}

func (k Keeper) GetQuoteCurrencyAtomicResolutionFromPerpetualId(ctx sdk.Context, perpetualId uint32) (int32, error) {
	quoteAsset, err := k.GetQuoteAssetFromPerpetualId(ctx, perpetualId)
	if err != nil {
		return 0, err
	}

	return quoteAsset.AtomicResolution, nil
}

func (k Keeper) GetQuoteAssetFromPerpetualId(ctx sdk.Context, perpetualId uint32) (assettypes.Asset, error) {
	collateralPool, err := k.GetCollateralPoolFromPerpetualId(ctx, perpetualId)
	if err != nil {
		return assettypes.Asset{}, err
	}

	quoteAsset, exists := k.assetsKeeper.GetAsset(ctx, collateralPool.QuoteAssetId)
	if !exists {
		return assettypes.Asset{}, errorsmod.Wrapf(assettypes.ErrAssetDoesNotExist, "Quote asset not found for perpetual Id %+v", perpetualId)
	}

	return quoteAsset, nil
}

func (k Keeper) GetCollateralPoolFromPerpetualId(ctx sdk.Context, perpetualId uint32) (
	collateralPool types.CollateralPool,
	err error,
) {
	perpetual, err := k.GetPerpetual(ctx, perpetualId)
	if err != nil {
		return collateralPool, err
	}
	return k.GetCollateralPool(ctx, perpetual.Params.CollateralPoolId)
}

// HasCollateralPool checks if a collateral pool exists in the store.
func (k Keeper) HasCollateralPool(
	ctx sdk.Context,
	id uint32,
) (found bool) {
	cpStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.CollateralPoolKeyPrefix))
	return cpStore.Has(lib.Uint32ToKey(id))
}

// `UpsertCollateralPool` creates or updates a collateral pool in the store (i.e. updates if `id` exists and creates otherwise).
// Returns an error if any of its fields fails validation.
func (k Keeper) UpsertCollateralPool(
	ctx sdk.Context,
	collateralPoolId uint32,
	maxCumulativeInsuranceFundDeltaPerBlock uint64,
	multiCollateralAssets *types.MultiCollateralAssetsArray,
	quoteAssetId uint32,
) (
	collateralPool types.CollateralPool,
	err error,
) {
	// Construct collateral pool.
	collateralPool = types.CollateralPool{
		CollateralPoolId:                        collateralPoolId,
		MaxCumulativeInsuranceFundDeltaPerBlock: maxCumulativeInsuranceFundDeltaPerBlock,
		MultiCollateralAssets:                   multiCollateralAssets,
		QuoteAssetId:                            quoteAssetId,
	}

	// Validate collateral pool's fields.
	if err := collateralPool.Validate(); err != nil {
		return collateralPool, err
	}

	if !k.EnsureMultiCollateralAssetsExists(ctx, multiCollateralAssets) {
		return collateralPool, errorsmod.Wrap(types.ErrMultiCollateralAssetDoesNotExist, lib.UintToString(quoteAssetId))
	}

	doesCollatPoolExits := k.HasCollateralPool(ctx, collateralPoolId)

	if doesCollatPoolExits {
		if err := k.HandleExistingCollateralPool(ctx, collateralPoolId, multiCollateralAssets, quoteAssetId); err != nil {
			return collateralPool, err
		}
	}

	// Set collateral pool in store.
	k.writeCollateralPoolToStore(ctx, collateralPool)

	k.GetIndexerEventManager().AddTxnEvent(
		ctx,
		indexerevents.SubtypeCollateralPool,
		indexerevents.CollateralPoolEventVersion,
		indexer_manager.GetBytes(
			indexerevents.NewCollateralPoolUpsertEvent(
				collateralPoolId,
				maxCumulativeInsuranceFundDeltaPerBlock,
				multiCollateralAssets.MultiCollateralAssets,
				quoteAssetId,
			),
		),
	)

	return collateralPool, nil
}

func (k Keeper) HandleExistingCollateralPool(
	ctx sdk.Context,
	collateralPoolId uint32,
	multiCollateralAssets *types.MultiCollateralAssetsArray,
	quoteAssetId uint32,

) (err error) {
	if !k.HasCollateralPool(ctx, collateralPoolId) {
		return nil
	}

	collateralPool, err := k.GetCollateralPool(ctx, collateralPoolId)
	if err != nil {
		return err
	}

	if collateralPool.QuoteAssetId != quoteAssetId {
		return types.ErrCannotModifyCollateralPoolQuoteAsset
	}

	// Create a map of new assets for O(1) lookups
	newAssetsMap := make(map[uint32]struct{}, len(multiCollateralAssets.MultiCollateralAssets))
	for _, newAsset := range multiCollateralAssets.MultiCollateralAssets {
		newAssetsMap[newAsset] = struct{}{}
	}

	// Check that all existing assets are present in the new set
	for _, existingAsset := range collateralPool.MultiCollateralAssets.MultiCollateralAssets {
		if _, exists := newAssetsMap[existingAsset]; !exists {
			return types.ErrCannotRemoveMultiCollateralAssetFromCollateralPool
		}
	}

	return nil
}

func (k Keeper) EnsureMultiCollateralAssetsExists(
	ctx sdk.Context,
	multiCollateralAssets *types.MultiCollateralAssetsArray,
) (exists bool) {
	for _, assetId := range multiCollateralAssets.MultiCollateralAssets {
		_, exists = k.assetsKeeper.GetAsset(ctx, assetId)
		if !exists {
			return false
		}
	}
	return true
}

// `GetCollateralPool` gets a collateral pool given its id.
func (k Keeper) GetCollateralPool(ctx sdk.Context, id uint32) (
	collateralPool types.CollateralPool,
	err error,
) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.CollateralPoolKeyPrefix))

	b := store.Get(lib.Uint32ToKey(id))
	if b == nil {
		return collateralPool, errorsmod.Wrap(types.ErrCollateralPoolDoesNotExist, lib.UintToString(id))
	}

	k.cdc.MustUnmarshal(b, &collateralPool)
	return collateralPool, nil
}

// `GetAllCollateralPools` returns all collateral pools, sorted by id.
func (k Keeper) GetAllCollateralPools(ctx sdk.Context) (list []types.CollateralPool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.CollateralPoolKeyPrefix))
	iterator := storetypes.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.CollateralPool
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	sort.Slice(list, func(i, j int) bool {
		return list[i].CollateralPoolId < list[j].CollateralPoolId
	})

	return list
}

// `writeCollateralPoolToStore` writes a collateral pool in store.
func (k Keeper) writeCollateralPoolToStore(
	ctx sdk.Context,
	collateralPool types.CollateralPool,
) {
	b := k.cdc.MustMarshal(&collateralPool)
	collateralPoolStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.CollateralPoolKeyPrefix))
	collateralPoolStore.Set(lib.Uint32ToKey(collateralPool.CollateralPoolId), b)
}

func (k Keeper) IsMainCollateralPool(ctx sdk.Context, perpetualId uint32) (bool, error) {
	perpetual, err := k.GetPerpetual(ctx, perpetualId)
	if err != nil {
		return false, err
	}
	return perpetual.Params.CollateralPoolId == 0, nil
}

/* === PARAMETERS FUNCTIONS === */
// `GetParams` returns perpetuals module parameters as a `Params` object from store.
func (k Keeper) GetParams(
	ctx sdk.Context,
) (params types.Params) {
	store := ctx.KVStore(k.storeKey)
	b := store.Get([]byte(types.ParamsKey))
	k.cdc.MustUnmarshal(b, &params)
	return params
}

// `SetParams` sets perpetuals module parameters in store.
func (k Keeper) SetParams(ctx sdk.Context, params types.Params) error {
	// Validate params.
	if err := params.Validate(); err != nil {
		return err
	}

	// Set params in store.
	store := ctx.KVStore(k.storeKey)
	b := k.cdc.MustMarshal(&params)
	store.Set([]byte(types.ParamsKey), b)

	return nil
}

// `getLiquidityTiertoMaxAbsPremiumVotePpm` returns `maxAbsPremiumVotePpm` for each liquidity tier
// (used for clamping premium votes) as a map whose key is liquidity tier ID.
func (k Keeper) getLiquidityTiertoMaxAbsPremiumVotePpm(
	ctx sdk.Context,
) (ltToMaxAbsPremiumVotePpm map[uint32]*big.Int) {
	params := k.GetParams(ctx)
	allLiquidityTiers := k.GetAllLiquidityTiers(ctx)
	ltToMaxAbsPremiumVotePpm = make(map[uint32]*big.Int)
	for _, liquidityTier := range allLiquidityTiers {
		ltToMaxAbsPremiumVotePpm[liquidityTier.Id] =
			liquidityTier.GetMaxAbsFundingClampPpm(params.PremiumVoteClampFactorPpm)
	}
	return ltToMaxAbsPremiumVotePpm
}

// IsPositionUpdatable returns whether position of a perptual is updatable.
// A perpetual is not updatable if it satisfies:
//   - Perpetual has zero oracle price. Since new oracle prices are created at zero by default and valid
//     oracle priceupdates are non-zero, this indicates the absence of a valid oracle price update.
func (k Keeper) IsPositionUpdatable(
	ctx sdk.Context,
	perpetualId uint32,
) (
	updatable bool,
	err error,
) {
	_, oraclePrice, err := k.GetPerpetualAndMarketPrice(
		ctx,
		perpetualId,
	)
	if err != nil {
		return false, err
	}

	// If perpetual has zero oracle price, it is considered not updatable.
	if oraclePrice.PnlPrice == 0 {
		return false, nil
	}
	return true, nil
}

func (k Keeper) SendOIUpdatesToIndexer(ctx sdk.Context) {
	updatedOIStore := prefix.NewStore(ctx.TransientStore(k.transientStoreKey), []byte(types.UpdatedOIKeyPrefix))
	iterator := updatedOIStore.Iterator(nil, nil)
	defer iterator.Close()

	OIMessageArray := make([]*indexerevents.OpenInterestUpdate, 0)

	for ; iterator.Valid(); iterator.Next() {
		openInterestSerializableInt := dtypes.SerializableInt{}
		if err := openInterestSerializableInt.Unmarshal(iterator.Value()); err != nil {
			panic(errorsmod.Wrap(err, "failed to unmarshal open interest"))
		}
		OIMessage := indexerevents.OpenInterestUpdate{
			PerpetualId:  binary.BigEndian.Uint32(iterator.Key()),
			OpenInterest: openInterestSerializableInt,
		}
		OIMessageArray = append(OIMessageArray, &OIMessage)
	}

	if len(OIMessageArray) == 0 {
		return
	}

	k.GetIndexerEventManager().AddBlockEvent(
		ctx,
		indexerevents.SubtypeOpenInterestUpdate,
		indexer_manager.IndexerTendermintEvent_BLOCK_EVENT_END_BLOCK,
		indexerevents.OpenInterestUpdateVersion,
		indexer_manager.GetBytes(
			&indexerevents.OpenInterestUpdateEventV1{
				OpenInterestUpdates: OIMessageArray,
			},
		),
	)
}
