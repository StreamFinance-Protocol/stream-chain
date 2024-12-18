package keeper

import (
	"errors"
	"fmt"
	"math/big"
	"math/rand"
	"time"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	storetypes "cosmossdk.io/store/types"

	errorsmod "cosmossdk.io/errors"
	"cosmossdk.io/store/prefix"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/metrics"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	perpkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/keeper"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	ratelimittypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	gometrics "github.com/hashicorp/go-metrics"
)

// SetSubaccount set a specific subaccount in the store from its index.
// Note that empty subaccounts are removed from state.
func (k Keeper) SetSubaccount(ctx sdk.Context, subaccount types.Subaccount) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.SubaccountKeyPrefix))
	key := subaccount.Id.ToStateKey()

	if subaccount.AssetYieldIndex == "" {
		assetYieldIndex, found := k.ratelimitKeeper.GetAssetYieldIndex(ctx)
		if !found {
			subaccount.AssetYieldIndex = "1/1"
		} else {
			subaccount.AssetYieldIndex = assetYieldIndex.String()
		}
	}

	for _, perpetualPosition := range subaccount.PerpetualPositions {
		if perpetualPosition.YieldIndex == "" {
			perpetual, err := k.perpetualsKeeper.GetPerpetual(ctx, perpetualPosition.PerpetualId)
			if err != nil {
				panic(err)
			}
			yieldIndex, err := getCurrentYieldIndexForPerp(perpetual)
			if err != nil {
				perpetualPosition.YieldIndex = "0/1"
			} else {
				perpetualPosition.YieldIndex = yieldIndex.String()
			}
		}
	}

	if len(subaccount.PerpetualPositions) == 0 && len(subaccount.AssetPositions) == 0 {
		if store.Has(key) {
			store.Delete(key)
		}
	} else {
		if !store.Has(key) {
			metrics.IncrCounterWithLabels(
				metrics.SubaccountCreatedCount,
				1,
				metrics.GetLabelForStringValue(
					metrics.Callback,
					metrics.GetCallbackMetricFromCtx(ctx),
				),
			)
		}
		b := k.cdc.MustMarshal(&subaccount)
		store.Set(key, b)
	}
}

// GetSubaccount returns a subaccount from its index.
//
// Note that this function is getting called very frequently; metrics in this function
// should be sampled to reduce CPU time.
func (k Keeper) GetSubaccount(
	ctx sdk.Context,
	id types.SubaccountId,
) (val types.Subaccount) {
	if rand.Float64() < metrics.LatencyMetricSampleRate {
		defer metrics.ModuleMeasureSinceWithLabels(
			types.ModuleName,
			[]string{metrics.GetSubaccount, metrics.Latency},
			time.Now(),
			[]gometrics.Label{
				metrics.GetLabelForStringValue(
					metrics.SampleRate,
					fmt.Sprintf("%f", metrics.LatencyMetricSampleRate),
				),
			},
		)
	}

	// Check state for the subaccount.
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.SubaccountKeyPrefix))
	b := store.Get(id.ToStateKey())

	assetYieldIndex, found := k.ratelimitKeeper.GetAssetYieldIndex(ctx)
	// TODO: [YBCP-53] not good error handling
	if !found {
		panic("asset yield index not found")
	}

	// If subaccount does not exist in state, return a default value.
	if b == nil {
		return types.Subaccount{
			Id:              &id,
			AssetYieldIndex: assetYieldIndex.String(),
		}
	}

	// If subaccount does exist in state, unmarshall and return the value.
	k.cdc.MustUnmarshal(b, &val)
	return val
}

// GetAllSubaccount returns all subaccount.
// For more performant searching and iteration, use `ForEachSubaccount`.
func (k Keeper) GetAllSubaccount(ctx sdk.Context) (list []types.Subaccount) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.SubaccountKeyPrefix))
	iterator := storetypes.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Subaccount
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetCollateralPoolAddressFromSubaccountId returns the collateral pool address for a subaccount
// based on the subaccount's perpetual positions. If the subaccount has no perpetual positions open,
// the default collateral pool address is the module's pool address.
func (k Keeper) GetCollateralPoolAddressFromSubaccountId(ctx sdk.Context, subaccountId types.SubaccountId) (
	sdk.AccAddress,
	error,
) {
	subaccount := k.GetSubaccount(ctx, subaccountId)
	return k.getCollateralPoolAddressFromSubaccount(ctx, subaccount)
}

func (k Keeper) getCollateralPoolAddressFromSubaccount(ctx sdk.Context, subaccount types.Subaccount) (
	sdk.AccAddress,
	error,
) {
	// Use the default collateral pool if the subaccount has no perpetual positions.
	if len(subaccount.PerpetualPositions) == 0 {
		return types.ModuleAddress, nil
	}

	return k.GetCollateralPoolAddressFromPerpetualId(ctx, subaccount.PerpetualPositions[0].PerpetualId)
}

// GetCollateralPoolAddressFromPerpetualId returns the collateral pool address based on the
// perpetual ID passed in as an argument.
func (k Keeper) GetCollateralPoolAddressFromPerpetualId(ctx sdk.Context, perpetualId uint32) (sdk.AccAddress, error) {
	perpetual, err := k.perpetualsKeeper.GetPerpetual(ctx, perpetualId)
	if err != nil {
		return nil, err
	}

	return authtypes.NewModuleAddress(types.ModuleName + ":" + lib.UintToString(perpetual.Params.CollateralPoolId)), nil
}

// GetCollateralPoolFromSubaccount returns the collateral pool for a corresponding subaccount
func (k Keeper) GetCollateralPoolFromSubaccount(ctx sdk.Context, subaccount types.Subaccount) (
	perptypes.CollateralPool,
	error,
) {
	perpetualPosition := subaccount.PerpetualPositions[0]

	collateralPool, err := k.perpetualsKeeper.GetCollateralPoolFromPerpetualId(ctx, perpetualPosition.PerpetualId)
	if err != nil {
		return perptypes.CollateralPool{}, err
	}

	return collateralPool, nil
}

// ForEachSubaccount performs a callback across all subaccounts.
// The callback function should return a boolean if we should end iteration or not.
// This is more performant than GetAllSubaccount because it does not fetch all at once.
// and you do not need to iterate through all the subaccounts.
func (k Keeper) ForEachSubaccount(ctx sdk.Context, callback func(types.Subaccount) (finished bool)) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.SubaccountKeyPrefix))
	iterator := storetypes.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var subaccount types.Subaccount
		k.cdc.MustUnmarshal(iterator.Value(), &subaccount)
		done := callback(subaccount)
		if done {
			break
		}
	}
}

// GetRandomSubaccount returns a random subaccount. Will return an error if there are no subaccounts.
func (k Keeper) GetRandomSubaccount(ctx sdk.Context, rand *rand.Rand) (types.Subaccount, error) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.SubaccountKeyPrefix))

	prefix, err := k.getRandomBytes(ctx, rand)
	if err != nil {
		return types.Subaccount{}, err
	}
	prefixItr := store.Iterator(prefix, nil)
	defer prefixItr.Close()

	var val types.Subaccount
	k.cdc.MustUnmarshal(prefixItr.Value(), &val)
	return val, nil
}

func (k Keeper) getRandomBytes(ctx sdk.Context, rand *rand.Rand) ([]byte, error) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.SubaccountKeyPrefix))

	// Use the forward iterator to get the first valid key.
	forwardItr := store.Iterator(nil, nil)
	defer forwardItr.Close()
	if !forwardItr.Valid() {
		return nil, errors.New("no subaccounts")
	}

	// Use the reverse iterator to get the last valid key.
	backwardsItr := store.ReverseIterator(nil, nil)
	defer backwardsItr.Close()

	firstKey := forwardItr.Key()
	lastKey := backwardsItr.Key()
	return lib.RandomBytesBetween(firstKey, lastKey, rand), nil
}

func (k Keeper) fetchParamsToSettleSubaccount(
	ctx sdk.Context,
	subaccount types.Subaccount,
) (
	perpIdToPerp map[uint32]perptypes.Perpetual,
	assetYieldIndex *big.Rat,
	availableYield *big.Int,
	earnsTdaiYield bool,
	quoteAssetId uint32,
	err error,
) {

	earnsTdaiYield, err = k.DoesSubaccountEarnTDaiYield(ctx, subaccount)
	if err != nil {
		return nil, nil, nil, false, 0, err
	}

	assetYieldIndex, found := k.ratelimitKeeper.GetAssetYieldIndex(ctx)
	if !found {
		return nil, nil, nil, false, 0, errors.New("could not find asset yield index")
	}

	perpIdToPerp, err = k.getPerpIdToPerpMapForSubaccount(ctx, subaccount)
	if err != nil {
		return nil, nil, nil, false, 0, err
	}

	availableYieldCoin := k.bankKeeper.GetBalance(ctx, authtypes.NewModuleAddress(ratelimittypes.TDaiPoolAccount), assettypes.AssetTDai.Denom)
	availableYield, _, err = k.assetsKeeper.ConvertCoinToAsset(ctx, assettypes.AssetTDai.Id, availableYieldCoin)
	if err != nil {
		return nil, nil, nil, false, 0, err
	}

	// The quote asset should never be used if there are no perpetual positions.
	// We default it to max uint32 to trigger an error if it is used as the asset will not exist.
	quoteAssetId, err = k.getQuoteAssetId(ctx, subaccount)
	if err != nil {
		return nil, nil, nil, false, 0, err
	}

	return perpIdToPerp, assetYieldIndex, availableYield, earnsTdaiYield, quoteAssetId, nil
}

func (k Keeper) getPerpIdToPerpMapForSubaccount(
	ctx sdk.Context,
	subaccount types.Subaccount,
) (
	perpIdToPerp map[uint32]perptypes.Perpetual,
	err error,
) {
	// Fetch all relevant perpetuals.
	perpIdToPerp = make(map[uint32]perptypes.Perpetual)
	for _, perpetualPosition := range subaccount.PerpetualPositions {
		perpetual, err := k.perpetualsKeeper.GetPerpetual(ctx, perpetualPosition.PerpetualId)
		if err != nil {
			return nil, err
		}
		perpIdToPerp[perpetualPosition.PerpetualId] = perpetual
	}
	return perpIdToPerp, nil
}

// getSettledSubaccount returns 1. a new settled subaccount given an unsettled subaccount,
// updating the AssetPositions (including yield claims), FundingIndex, and L
// astFundingPayment fields accordingly (does not persist any changes) and 2. a map with
// perpetual ID as key and last funding payment as value (for emitting funding payments to
// indexer).
func (k Keeper) GetSettledSubaccount(
	ctx sdk.Context,
	subaccount types.Subaccount,
) (
	settledSubaccount types.Subaccount,
	fundingPayments map[uint32]dtypes.SerializableInt,
	yieldForSubaccount *big.Int,
	err error,
) {
	perpIdToPerp, assetYieldIndex, availableYield, earnsTdaiYield, quoteAssetId, err := k.fetchParamsToSettleSubaccount(ctx, subaccount)
	if err != nil {
		return types.Subaccount{}, nil, nil, err
	}

	return GetSettledSubaccountWithPerpetuals(subaccount, perpIdToPerp, assetYieldIndex, availableYield, earnsTdaiYield, quoteAssetId)
}

// GetSettledSubaccountWithPerpetuals returns 1. a new settled subaccount given an unsettled subaccount,
// updating the AssetPositions, FundingIndex, and LastFundingPayment fields accordingly
// (does not persist any changes) and 2. a map with perpetual ID as key and last funding
// payment as value (for emitting funding payments to indexer).
//
// Note that this is a stateless utility function.
func GetSettledSubaccountWithPerpetuals(
	subaccount types.Subaccount,
	perpetuals map[uint32]perptypes.Perpetual,
	assetYieldIndex *big.Rat,
	availableYield *big.Int,
	earnsTdaiYield bool,
	quoteAssetId uint32,
) (
	settledSubaccount types.Subaccount,
	fundingPayments map[uint32]dtypes.SerializableInt,
	totalNewYield *big.Int,
	err error,
) {
	totalNetSettlementPpm := big.NewInt(0)
	updatedFundingIndexPerpPositions := []*types.PerpetualPosition{}
	fundingPayments = make(map[uint32]dtypes.SerializableInt)

	var subaccountWithYield types.Subaccount = subaccount

	if earnsTdaiYield {
		// TODO [YBCP-86]: Optimize yield addition if no yield to be claimed
		subaccountWithYield, totalNewYield, err = AddYieldToSubaccount(subaccount, perpetuals, assetYieldIndex, availableYield)
		if err != nil {
			return types.Subaccount{}, nil, nil, err
		}

		if totalNewYield.Cmp(big.NewInt(0)) < 0 {
			return types.Subaccount{}, nil, nil, types.ErrYieldClaimedNegative
		}
	} else {
		subaccountWithYield.AssetYieldIndex = assetYieldIndex.String()
	}

	if len(subaccountWithYield.PerpetualPositions) == 0 {
		return subaccountWithYield, fundingPayments, totalNewYield, nil
	}

	// Iterate through and settle all perpetual positions.
	for _, perpetualPosition := range subaccountWithYield.PerpetualPositions {
		perpetual, found := perpetuals[perpetualPosition.PerpetualId]
		if !found {
			return types.Subaccount{},
				nil,
				nil,
				errorsmod.Wrap(
					perptypes.ErrPerpetualDoesNotExist, lib.UintToString(perpetualPosition.PerpetualId),
				)
		}

		/* Calculate Funding Rates*/
		bigNetSettlementPpm, updatedFundingIndexPerpPosition, err := getNewPerpPositionWithFundingRateUpdate(perpetual, perpetualPosition)
		if err != nil {
			return types.Subaccount{}, nil, nil, err
		}

		// Record non-zero funding payment (to be later emitted in SubaccountUpdateEvent to indexer).
		// Note: Funding payment is the negative of settlement, i.e. positive settlement is equivalent
		// to a negative funding payment (position received funding payment) and vice versa.
		if bigNetSettlementPpm.Cmp(lib.BigInt0()) != 0 {
			fundingPayments[perpetualPosition.PerpetualId] = getFundingPaymentAsSerializableInt(bigNetSettlementPpm)
		}

		totalNetSettlementPpm.Add(totalNetSettlementPpm, bigNetSettlementPpm)
		updatedFundingIndexPerpPositions = append(updatedFundingIndexPerpPositions, &updatedFundingIndexPerpPosition)
	}

	newSubaccount := types.Subaccount{
		Id:                 subaccountWithYield.Id,
		AssetPositions:     subaccountWithYield.AssetPositions,
		PerpetualPositions: updatedFundingIndexPerpPositions,
		MarginEnabled:      subaccountWithYield.MarginEnabled,
		AssetYieldIndex:    subaccountWithYield.AssetYieldIndex,
	}

	totalNetSettlement := totalNetSettlementPpm.Div(totalNetSettlementPpm, lib.BigIntOneMillion())

	newQuoteAssetPosition := newSubaccount.GetAssetPosition(quoteAssetId)
	newQuoteAssetPosition.Add(newQuoteAssetPosition, totalNetSettlement)

	// TODO(CLOB-993): Remove this function and use `UpdateAssetPositions` instead.
	newSubaccount.SetAssetPosition(newQuoteAssetPosition, quoteAssetId)

	return newSubaccount, fundingPayments, totalNewYield, nil
}

func getNewPerpPositionWithFundingRateUpdate(
	perpetual perptypes.Perpetual,
	perpetualPosition *types.PerpetualPosition,
) (
	bigNetSettlementPpm *big.Int,
	newPerpetualPosition types.PerpetualPosition,
	err error,
) {
	// Call the stateless utility function to get the net settlement and new funding index.
	bigNetSettlementPpm, newFundingIndex := perpkeeper.GetSettlementPpmWithPerpetual(
		perpetual,
		perpetualPosition.GetBigQuantums(),
		perpetualPosition.FundingIndex.BigInt(),
	)

	newPerpetualPosition = types.PerpetualPosition{
		PerpetualId:  perpetualPosition.PerpetualId,
		Quantums:     perpetualPosition.Quantums,
		FundingIndex: dtypes.NewIntFromBigInt(newFundingIndex),
		YieldIndex:   perpetualPosition.YieldIndex,
	}

	return bigNetSettlementPpm, newPerpetualPosition, nil
}

func getFundingPaymentAsSerializableInt(
	bigNetSettlementPpm *big.Int,
) (
	fundingPayment dtypes.SerializableInt,
) {
	dividedSettlement := new(big.Int).Div(bigNetSettlementPpm, lib.BigIntOneMillion())
	negatedSettlement := new(big.Int).Neg(dividedSettlement)
	return dtypes.NewIntFromBigInt(negatedSettlement)
}

func checkPositionUpdatable(
	ctx sdk.Context,
	pk types.ProductKeeper,
	p types.PositionSize,
) (
	err error,
) {
	updatable, err := pk.IsPositionUpdatable(
		ctx,
		p.GetId(),
	)
	if err != nil {
		return err
	}

	if !updatable {
		return errorsmod.Wrapf(
			types.ErrProductPositionNotUpdatable,
			"type: %v, id: %d",
			p.GetProductType(),
			p.GetId(),
		)
	}
	return nil
}

// IsValidStateTransitionForUndercollateralizedSubaccount returns an `UpdateResult`
// denoting whether this state transition is valid. This function accepts the collateral and
// margin requirements of a subaccount before and after an update ("cur" and
// "new", respectively).
//
// This function should only be called if the account is undercollateralized after the update.
//
// A state transition is valid if the subaccount enters a
// "less-or-equally-risky" state after an update.
// i.e.`newNetCollateral / newMaintenanceMargin >= curNetCollateral / curMaintenanceMargin`.
//
// Otherwise, the state transition is invalid. If the account was previously undercollateralized,
// `types.StillUndercollateralized` is returned. If the account was previously
// collateralized and is now undercollateralized, `types.NewlyUndercollateralized` is
// returned.
//
// Note that the inequality `newNetCollateral / newMaintenanceMargin >= curNetCollateral / curMaintenanceMargin`
// has divide-by-zero issue when margin requirements are zero. To make sure the state
// transition is valid, we special case this scenario and only allow state transition that improves net collateral.
func IsValidStateTransitionForUndercollateralizedSubaccount(
	bigCurNetCollateral *big.Int,
	bigCurInitialMargin *big.Int,
	bigCurMaintenanceMargin *big.Int,
	bigNewNetCollateral *big.Int,
	bigNewMaintenanceMargin *big.Int,
) types.UpdateResult {
	// Determine whether the subaccount was previously undercollateralized before the update.
	var underCollateralizationResult = types.StillUndercollateralized

	if bigCurInitialMargin.Cmp(bigCurNetCollateral) <= 0 {
		underCollateralizationResult = types.NewlyUndercollateralized
	}

	// If the maintenance margin is increasing, then the subaccount is undercollateralized.
	if bigNewMaintenanceMargin.Cmp(bigCurMaintenanceMargin) > 0 {
		return underCollateralizationResult
	}

	// If the maintenance margin is zero, it means the subaccount must have no open positions, and negative net
	// collateral. If the net collateral is not improving then this transition is not valid.
	if bigNewMaintenanceMargin.BitLen() == 0 || bigCurMaintenanceMargin.BitLen() == 0 {
		if bigNewMaintenanceMargin.BitLen() == 0 &&
			bigCurMaintenanceMargin.BitLen() == 0 &&
			bigNewNetCollateral.Cmp(bigCurNetCollateral) > 0 {
			return types.Success
		}

		return underCollateralizationResult
	}

	// Note that here we are effectively checking that
	// `newNetCollateral / newMaintenanceMargin >= curNetCollateral / curMaintenanceMargin`.
	// However, to avoid rounding errors, we factor this as
	// `newNetCollateral * curMaintenanceMargin >= curNetCollateral * newMaintenanceMargin`.
	bigCurRisk := new(big.Int).Mul(bigNewNetCollateral, bigCurMaintenanceMargin)
	bigNewRisk := new(big.Int).Mul(bigCurNetCollateral, bigNewMaintenanceMargin)

	// The subaccount is not well-collateralized, and the state transition leaves the subaccount in a
	// "more-risky" state (collateral relative to margin requirements is decreasing).
	if bigNewRisk.Cmp(bigCurRisk) > 0 {
		return underCollateralizationResult
	}

	// The subaccount is in a "less-or-equally-risky" state (margin requirements are decreasing or unchanged,
	// collateral relative to margin requirements is decreasing or unchanged).
	// This subaccount is undercollateralized in this state, but we still consider this state transition valid.
	return types.Success
}

// GetNetCollateralAndMarginRequirements returns the total net collateral, total initial margin requirement,
// and total maintenance margin requirement for the subaccount as if the `update` was applied.
// It is used to get information about speculative changes to the subaccount.
//
// The provided update can also be "zeroed" in order to get information about
// the current state of the subaccount (i.e. with no changes).
//
// If two position updates reference the same position, an error is returned.
//
// All return values are denoted in quote quantums.
func (k Keeper) GetNetCollateralAndMarginRequirements(
	ctx sdk.Context,
	update types.Update,
) (
	bigNetCollateral *big.Int,
	bigInitialMargin *big.Int,
	bigMaintenanceMargin *big.Int,
	err error,
) {
	subaccount := k.GetSubaccount(ctx, update.SubaccountId)

	settledSubaccount, _, _, err := k.GetSettledSubaccount(ctx, subaccount)
	if err != nil {
		return nil, nil, nil, err
	}

	settledUpdate := SettledUpdate{
		SettledSubaccount: settledSubaccount,
		AssetUpdates:      update.AssetUpdates,
		PerpetualUpdates:  update.PerpetualUpdates,
	}

	return k.internalGetNetCollateralAndMarginRequirements(
		ctx,
		settledUpdate,
	)
}

// internalGetNetCollateralAndMarginRequirements returns the total net collateral, total initial margin
// requirement, and total maintenance margin requirement for the `Subaccount` as if unsettled funding
// of existing positions were settled, and the `bigQuoteBalanceDeltaQuantums`, `assetUpdates`, and
// `perpetualUpdates` were applied. It is used to get information about speculative changes to the
// `Subaccount`.
// The input subaccounts must be settled.
//
// The provided update can also be "zeroed" in order to get information about
// the current state of the subaccount (i.e. with no changes).
//
// If two position updates reference the same position, an error is returned.
func (k Keeper) internalGetNetCollateralAndMarginRequirements(
	ctx sdk.Context,
	settledUpdate SettledUpdate,
) (
	bigNetCollateral *big.Int,
	bigInitialMargin *big.Int,
	bigMaintenanceMargin *big.Int,
	err error,
) {
	defer telemetry.ModuleMeasureSince(
		types.ModuleName,
		time.Now(),
		metrics.GetNetCollateralAndMarginRequirements,
		metrics.Latency,
	)

	// Initialize return values.
	bigNetCollateral = big.NewInt(0)
	bigInitialMargin = big.NewInt(0)
	bigMaintenanceMargin = big.NewInt(0)

	// Merge updates and assets.
	assetSizes, err := applyUpdatesToPositions(
		settledUpdate.SettledSubaccount.AssetPositions,
		settledUpdate.AssetUpdates,
	)
	if err != nil {
		return big.NewInt(0), big.NewInt(0), big.NewInt(0), err
	}

	// Merge updates and perpetuals.
	perpetualSizes, err := applyUpdatesToPositions(
		settledUpdate.SettledSubaccount.PerpetualPositions,
		settledUpdate.PerpetualUpdates,
	)
	if err != nil {
		return big.NewInt(0), big.NewInt(0), big.NewInt(0), err
	}

	quoteCurrencyAtomicResolution := assettypes.AssetTDai.AtomicResolution
	if len(perpetualSizes) > 0 {
		quoteCurrencyAtomicResolution, err = k.perpetualsKeeper.GetQuoteCurrencyAtomicResolutionFromPerpetualId(ctx, perpetualSizes[0].GetId())
		if err != nil {
			return big.NewInt(0), big.NewInt(0), big.NewInt(0), err
		}
	} else {
		if len(settledUpdate.SettledSubaccount.PerpetualPositions) > 0 {
			quoteCurrencyAtomicResolution, err = k.perpetualsKeeper.GetQuoteCurrencyAtomicResolutionFromPerpetualId(ctx, settledUpdate.SettledSubaccount.PerpetualPositions[0].GetId())
			if err != nil {
				return big.NewInt(0), big.NewInt(0), big.NewInt(0), err
			}
		}
	}

	// The calculate function increments `netCollateral`, `initialMargin`, and `maintenanceMargin`
	// given a `ProductKeeper` and a `PositionSize`.
	calculate := func(pk types.ProductKeeper, size types.PositionSize) error {
		id := size.GetId()
		bigQuantums := size.GetBigQuantums()
		bigNetCollateralQuoteQuantums, err := pk.GetNetCollateral(ctx, id, bigQuantums, quoteCurrencyAtomicResolution)
		if err != nil {
			return err
		}

		bigNetCollateral.Add(bigNetCollateral, bigNetCollateralQuoteQuantums)

		bigInitialMarginRequirements,
			bigMaintenanceMarginRequirements,
			err := pk.GetMarginRequirements(ctx, id, bigQuantums, quoteCurrencyAtomicResolution)
		if err != nil {
			return err
		}

		bigInitialMargin.Add(bigInitialMargin, bigInitialMarginRequirements)
		bigMaintenanceMargin.Add(bigMaintenanceMargin, bigMaintenanceMarginRequirements)
		return nil
	}

	// Iterate over all assets and updates and calculate change to net collateral and margin requirements.
	for _, size := range assetSizes {
		err := calculate(k.assetsKeeper, size)
		if err != nil {
			return big.NewInt(0), big.NewInt(0), big.NewInt(0), err
		}
	}

	// Iterate over all perpetuals and updates and calculate change to net collateral and margin requirements.
	// TODO(DEC-110): `perp.GetSettlement()`, factor in unsettled funding.
	for _, size := range perpetualSizes {
		err := calculate(k.perpetualsKeeper, size)
		if err != nil {
			return big.NewInt(0), big.NewInt(0), big.NewInt(0), err
		}
	}

	return bigNetCollateral, bigInitialMargin, bigMaintenanceMargin, nil
}

// applyUpdatesToPositions merges a slice of `types.UpdatablePositions` and `types.PositionSize`
// (i.e. concrete types *types.AssetPosition` and `types.AssetUpdate`) into a slice of `types.PositionSize`.
// If a given `PositionSize` shares an ID with an `UpdatablePositionSize`, the update and position are merged
// into a single `PositionSize`.
//
// An error is returned if two updates share the same position id.
//
// Note: There are probably performance implications here for allocating a new slice of PositionSize,
// and for allocating new slices when converting the concrete types to interfaces. However, without doing
// this there would be a lot of duplicate code for calculating changes for both `Assets` and `Perpetuals`.
func applyUpdatesToPositions[
	P types.PositionSize,
	U types.PositionSize,
](positions []P, updates []U) ([]types.PositionSize, error) {
	var result []types.PositionSize = make([]types.PositionSize, 0, len(positions)+len(updates))

	updateMap := make(map[uint32]types.PositionSize)
	updateIndexMap := make(map[uint32]int)
	for i, update := range updates {
		// Check for non-unique updates (two updates to the same position).
		id := update.GetId()
		_, exists := updateMap[id]
		if exists {
			errMsg := fmt.Sprintf("multiple updates exist for position %v", update.GetId())
			return nil, errorsmod.Wrap(types.ErrNonUniqueUpdatesPosition, errMsg)
		}

		updateMap[id] = update
		updateIndexMap[id] = i
		result = append(result, update)
	}

	// Iterate over each position, if the position shares an ID with
	// an update, then we "merge" the update and the position into a new `PositionUpdate`.
	for _, pos := range positions {
		id := pos.GetId()
		update, exists := updateMap[id]
		if !exists {
			result = append(result, pos)
		} else {
			var newPos = types.NewPositionUpdate(id)

			// Add the position size and update together to get the new size.
			var bigNewPositionSize = new(big.Int).Add(
				pos.GetBigQuantums(),
				update.GetBigQuantums(),
			)

			newPos.SetBigQuantums(bigNewPositionSize)

			// Replace update with `PositionUpdate`
			index := updateIndexMap[id]
			result[index] = newPos
		}
	}

	return result, nil
}
