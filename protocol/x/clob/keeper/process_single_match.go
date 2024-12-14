package keeper

import (
	"errors"
	"fmt"
	"math"
	"math/big"

	errorsmod "cosmossdk.io/errors"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/off_chain_updates"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/log"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/metrics"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	gometrics "github.com/hashicorp/go-metrics"
)

// ProcessSingleMatch accepts a single match and its associated orders matched in the block,
// persists the resulting subaccount updates and state fill amounts.
// This function assumes that the provided match with orders has undergone stateless validations.
// If additional validation of the provided orders or match fails, an error is returned.
// The following validation occurs in this method:
//   - Order is for a valid ClobPair.
//   - Order is for a valid Perpetual.
//   - Validate the `fillAmount` of a match is divisible by the `ClobPair`'s `StepBaseQuantums`.
//   - Validate the new total fill amount of an order does not exceed the total quantums of the order given
//     the fill amounts present in the provided `matchOrders` and in state.
//   - Validate the subaccount updates resulting from the match are valid (before persisting the updates to state)
//   - For liquidation orders, stateful validations through
//     calling `validateMatchPerpetualLiquidationAgainstSubaccountBlockLimits`.
//   - Validating that deleveraging is not required for processing liquidation orders.
//
// This method returns `takerUpdateResult` and `makerUpdateResult` which can be used to determine whether the maker
// and/or taker failed collateralization checks. This information is particularly pertinent for the `memclob` which
// calls this method during matching.
// TODO(DEC-1282): Remove redundant checks from `ProcessSingleMatch` for matching.
// This method mutates matchWithOrders by setting the fee fields.
func (k Keeper) ProcessSingleMatch(
	ctx sdk.Context,
	matchWithOrders *types.MatchWithOrders,
) (
	success bool,
	takerUpdateResult satypes.UpdateResult,
	makerUpdateResult satypes.UpdateResult,
	offchainUpdates *types.OffchainUpdates,
	err error,
) {
	if matchWithOrders.TakerOrder.IsLiquidation() {
		defer k.logLiquidationError(ctx, matchWithOrders, &takerUpdateResult, &err)
	}

	if err := k.performStatelessValidationOnMatch(matchWithOrders); err != nil {
		return false, takerUpdateResult, makerUpdateResult, nil, err
	}

	offchainUpdates = types.NewOffchainUpdates()
	fillAmount := matchWithOrders.FillAmount

	clobPair, err := k.getClobPair(ctx, matchWithOrders)
	if err != nil {
		return false, takerUpdateResult, makerUpdateResult, nil, err
	}

	bigFillQuoteQuantums, err := k.calculateBigFillQuoteQuantums(ctx, clobPair, matchWithOrders)
	if err != nil {
		return false, takerUpdateResult, makerUpdateResult, nil, err
	}

	// Retrieve the associated perpetual id for the `ClobPair`.
	perpetualId, err := clobPair.GetPerpetualId()
	if err != nil {
		return false, takerUpdateResult, makerUpdateResult, nil, err
	}

	takerFeePpm,
		makerFeePpm,
		routerTakerFeePpm,
		routerMakerFeePpm,
		takerInsuranceFundDelta,
		validatorFeeQuoteQuantums,
		liquidityFeeQuoteQuantums,
		err := k.calculateFees(ctx, matchWithOrders, perpetualId)
	if err != nil {
		return false, takerUpdateResult, makerUpdateResult, nil, err
	}

	newTakerTotalFillAmount,
		curTakerPruneableBlockHeight,
		err := k.calculateTakerFillAmounts(ctx, matchWithOrders, fillAmount)
	if err != nil {
		return false, takerUpdateResult, makerUpdateResult, nil, err
	}

	newMakerTotalFillAmount,
		curMakerPruneableBlockHeight,
		err := k.calculateMakerFillAmounts(ctx, matchWithOrders, fillAmount)
	if err != nil {
		return false, takerUpdateResult, makerUpdateResult, nil, err
	}

	// Update both subaccounts in the matched order atomically.
	takerUpdateResult, makerUpdateResult, err = k.persistMatchedOrders(
		ctx,
		matchWithOrders,
		perpetualId,
		takerFeePpm,
		makerFeePpm,
		bigFillQuoteQuantums,
		takerInsuranceFundDelta,
		validatorFeeQuoteQuantums,
		liquidityFeeQuoteQuantums,
		routerTakerFeePpm,
		routerMakerFeePpm,
	)

	if err != nil {
		return false, takerUpdateResult, makerUpdateResult, nil, err
	}

	// Update subaccount total quantums liquidated and total insurance fund lost for liquidation orders.
	if matchWithOrders.TakerOrder.IsLiquidation() {
		if err := k.updateLiquidationMetricsAndCummalativeInsuranceFundDelta(ctx, matchWithOrders, perpetualId, fillAmount, takerInsuranceFundDelta); err != nil {
			return false, takerUpdateResult, makerUpdateResult, nil, err
		}
	}

	// Liquidation orders can only be placed when a subaccount is liquidatable
	// and cannot be replayed, therefore we don't need to track their filled amount in state.
	if !matchWithOrders.TakerOrder.IsLiquidation() {
		takerOffchainUpdates := k.setOrderFillAmountsAndPruning(
			ctx,
			matchWithOrders.TakerOrder.MustGetOrder(),
			newTakerTotalFillAmount,
			curTakerPruneableBlockHeight,
		)
		offchainUpdates.Append(takerOffchainUpdates)
	}

	makerOffchainUpdates := k.setOrderFillAmountsAndPruning(
		ctx,
		matchWithOrders.MakerOrder.MustGetOrder(),
		newMakerTotalFillAmount,
		curMakerPruneableBlockHeight,
	)
	offchainUpdates.Append(makerOffchainUpdates)

	return true, takerUpdateResult, makerUpdateResult, offchainUpdates, nil
}

// persistMatchedOrders persists a matched order to the subaccount state,
// by updating the quoteBalance and perpetual position size of the
// affected subaccounts.
// This method also transfers fees to the fee collector module, and
// transfers insurance fund payments to the insurance fund.
// This method mutates matchWithOrders by setting the fee fields.
func (k Keeper) persistMatchedOrders(
	ctx sdk.Context,
	matchWithOrders *types.MatchWithOrders,
	perpetualId uint32,
	takerFeePpm int32,
	makerFeePpm int32,
	bigFillQuoteQuantums *big.Int,
	insuranceFundDelta *big.Int,
	validatorFeeQuoteQuantums *big.Int,
	liquidityFeeQuoteQuantums *big.Int,
	routerTakerFeePpm int32,
	routerMakerFeePpm int32,
) (
	takerUpdateResult satypes.UpdateResult,
	makerUpdateResult satypes.UpdateResult,
	err error,
) {
	isTakerLiquidation := matchWithOrders.TakerOrder.IsLiquidation()

	// Taker fees and maker fees/rebates are rounded towards positive infinity.
	bigTakerFeeQuoteQuantums := lib.BigIntMulSignedPpm(bigFillQuoteQuantums, takerFeePpm, true)
	bigMakerFeeQuoteQuantums := lib.BigIntMulSignedPpm(bigFillQuoteQuantums, makerFeePpm, true)

	bigRouterTakerFeeQuoteQuantums := lib.BigIntMulSignedPpm(bigFillQuoteQuantums, routerTakerFeePpm, true)
	bigRouterMakerFeeQuoteQuantums := lib.BigIntMulSignedPpm(bigFillQuoteQuantums, routerMakerFeePpm, true)

	matchWithOrders.MakerFee = bigMakerFeeQuoteQuantums.Int64() + bigRouterMakerFeeQuoteQuantums.Int64()
	// Liquidation orders pay the liquidation fee instead of the standard taker fee
	if matchWithOrders.TakerOrder.IsLiquidation() {
		matchWithOrders.TakerFee = insuranceFundDelta.Int64() + validatorFeeQuoteQuantums.Int64() + liquidityFeeQuoteQuantums.Int64()
	} else {
		matchWithOrders.TakerFee = bigTakerFeeQuoteQuantums.Int64() + bigRouterTakerFeeQuoteQuantums.Int64()
	}

	// If the taker is a liquidation order, it should never pay fees.
	if isTakerLiquidation && bigTakerFeeQuoteQuantums.Sign() != 0 {
		panic(fmt.Sprintf(
			`Taker order is liquidation and should never pay taker fees.
      TakerOrder: %v
      bigTakerFeeQuoteQuantums: %v`,
			matchWithOrders.TakerOrder,
			bigTakerFeeQuoteQuantums,
		))
	}

	bigTakerQuoteBalanceDelta := new(big.Int).Set(bigFillQuoteQuantums)
	bigMakerQuoteBalanceDelta := new(big.Int).Set(bigFillQuoteQuantums)

	bigTakerPerpetualQuantumsDelta := matchWithOrders.FillAmount.ToBigInt()
	bigMakerPerpetualQuantumsDelta := matchWithOrders.FillAmount.ToBigInt()

	if matchWithOrders.TakerOrder.IsBuy() {
		bigTakerQuoteBalanceDelta.Neg(bigTakerQuoteBalanceDelta)
		bigMakerPerpetualQuantumsDelta.Neg(bigMakerPerpetualQuantumsDelta)
	} else {
		bigMakerQuoteBalanceDelta.Neg(bigMakerQuoteBalanceDelta)
		bigTakerPerpetualQuantumsDelta.Neg(bigTakerPerpetualQuantumsDelta)
	}

	// Subtract quote balance delta with fees paid.
	bigTakerQuoteBalanceDelta.Sub(bigTakerQuoteBalanceDelta, bigTakerFeeQuoteQuantums)
	bigMakerQuoteBalanceDelta.Sub(bigMakerQuoteBalanceDelta, bigMakerFeeQuoteQuantums)

	bigTakerQuoteBalanceDelta.Sub(bigTakerQuoteBalanceDelta, bigRouterTakerFeeQuoteQuantums)
	bigMakerQuoteBalanceDelta.Sub(bigMakerQuoteBalanceDelta, bigRouterMakerFeeQuoteQuantums)

	// Subtract quote balance delta with insurance fund payments.
	if matchWithOrders.TakerOrder.IsLiquidation() {
		bigTakerQuoteBalanceDelta.Sub(bigTakerQuoteBalanceDelta, insuranceFundDelta)
		bigTakerQuoteBalanceDelta.Sub(bigTakerQuoteBalanceDelta, validatorFeeQuoteQuantums)
		bigTakerQuoteBalanceDelta.Sub(bigTakerQuoteBalanceDelta, liquidityFeeQuoteQuantums)
	}

	// Create the subaccount update.
	updates := []satypes.Update{
		// Taker update
		{
			AssetUpdates: []satypes.AssetUpdate{
				{
					AssetId:          assettypes.AssetTDai.Id,
					BigQuantumsDelta: bigTakerQuoteBalanceDelta,
				},
			},
			PerpetualUpdates: []satypes.PerpetualUpdate{
				{
					PerpetualId:      perpetualId,
					BigQuantumsDelta: bigTakerPerpetualQuantumsDelta,
				},
			},
			SubaccountId: matchWithOrders.TakerOrder.GetSubaccountId(),
		},
		// Maker update
		{
			AssetUpdates: []satypes.AssetUpdate{
				{
					AssetId:          assettypes.AssetTDai.Id,
					BigQuantumsDelta: bigMakerQuoteBalanceDelta,
				},
			},
			PerpetualUpdates: []satypes.PerpetualUpdate{
				{
					PerpetualId:      perpetualId,
					BigQuantumsDelta: bigMakerPerpetualQuantumsDelta,
				},
			},
			SubaccountId: matchWithOrders.MakerOrder.GetSubaccountId(),
		},
	}

	if !isTakerLiquidation {
		takerRouter := matchWithOrders.TakerOrder.MustGetOrder().RouterSubaccountId
		makerRouter := matchWithOrders.MakerOrder.MustGetOrder().RouterSubaccountId

		hasTakerRouter := takerRouter != nil
		hasMakerRouter := makerRouter != nil
		hasSameRouter := hasTakerRouter && hasMakerRouter && *takerRouter == *makerRouter

		if hasTakerRouter && bigRouterTakerFeeQuoteQuantums.Sign() == -1 {
			panic(fmt.Sprintf("Taker router fee is negative: %v", bigRouterTakerFeeQuoteQuantums))
		}

		if hasMakerRouter && bigRouterMakerFeeQuoteQuantums.Sign() == -1 {
			panic(fmt.Sprintf("Maker router fee is negative: %v", bigRouterMakerFeeQuoteQuantums))
		}

		if hasSameRouter {
			totalRouterFee := new(big.Int).Add(bigRouterTakerFeeQuoteQuantums, bigRouterMakerFeeQuoteQuantums)
			if totalRouterFee.Sign() != 0 {
				updates = append(updates, satypes.Update{
					AssetUpdates: []satypes.AssetUpdate{
						{
							AssetId:          assettypes.AssetTDai.Id,
							BigQuantumsDelta: totalRouterFee,
						},
					},
					SubaccountId: *takerRouter,
				})
			}
		} else {
			if hasTakerRouter && bigRouterTakerFeeQuoteQuantums.Sign() != 0 {
				updates = append(updates, satypes.Update{
					AssetUpdates: []satypes.AssetUpdate{
						{
							AssetId:          assettypes.AssetTDai.Id,
							BigQuantumsDelta: bigRouterTakerFeeQuoteQuantums,
						},
					},
					SubaccountId: *takerRouter,
				})
			}
			if hasMakerRouter && bigRouterMakerFeeQuoteQuantums.Sign() != 0 {
				updates = append(updates, satypes.Update{
					AssetUpdates: []satypes.AssetUpdate{
						{
							AssetId:          assettypes.AssetTDai.Id,
							BigQuantumsDelta: bigRouterMakerFeeQuoteQuantums,
						},
					},
					SubaccountId: *makerRouter,
				})
			}
		}
	}

	// Apply the update.
	success, successPerUpdate, err := k.subaccountsKeeper.UpdateSubaccounts(
		ctx,
		updates,
		satypes.Match,
	)
	if err != nil {
		return satypes.UpdateCausedError, satypes.UpdateCausedError, err
	}

	takerUpdateResult = successPerUpdate[0]
	makerUpdateResult = successPerUpdate[1]

	// If not successful, return error indicating why.
	if updateResultErr := satypes.GetErrorFromUpdateResults(
		success,
		successPerUpdate,
		updates,
	); updateResultErr != nil {
		return takerUpdateResult, makerUpdateResult, updateResultErr
	}

	if !success {
		panic(
			fmt.Sprintf(
				"persistMatchedOrders: UpdateSubaccounts failed but err == nil and no error returned"+
					"from successPerUpdate but success was false. Error: %v, Updates: %+v, SuccessPerUpdate: %+v",
				err,
				updates,
				successPerUpdate,
			),
		)
	}

	if err := k.subaccountsKeeper.TransferInsuranceFundPayments(ctx, insuranceFundDelta, perpetualId); err != nil {
		return takerUpdateResult, makerUpdateResult, err
	}

	// Transfer the liquidity and validator fees
	err = k.subaccountsKeeper.TransferLiquidityFee(ctx, liquidityFeeQuoteQuantums, perpetualId)
	if err != nil {
		return satypes.UpdateCausedError, satypes.UpdateCausedError, err
	}

	err = k.subaccountsKeeper.TransferValidatorFee(ctx, validatorFeeQuoteQuantums, perpetualId)
	if err != nil {
		return satypes.UpdateCausedError, satypes.UpdateCausedError, err
	}

	// Transfer the fee amount from subacounts module to fee collector module account.
	bigTotalFeeQuoteQuantums := new(big.Int).Add(bigTakerFeeQuoteQuantums, bigMakerFeeQuoteQuantums)
	if err := k.subaccountsKeeper.TransferFeesToFeeCollectorModule(
		ctx,
		assettypes.AssetTDai.Id,
		bigTotalFeeQuoteQuantums,
		perpetualId,
	); err != nil {
		return takerUpdateResult, makerUpdateResult, errorsmod.Wrapf(
			types.ErrSubaccountFeeTransferFailed,
			"persistMatchedOrders: subaccounts (%v, %v) updated, but fee transfer (bigFeeQuoteQuantums: %v)"+
				" to fee-collector failed. Err: %v",
			matchWithOrders.MakerOrder.GetSubaccountId(),
			matchWithOrders.TakerOrder.GetSubaccountId(),
			bigTotalFeeQuoteQuantums,
			err,
		)
	}

	// Update the last trade price for the perpetual.
	k.SetTradePricesForPerpetual(ctx, perpetualId, matchWithOrders.MakerOrder.GetOrderSubticks())

	k.statsKeeper.RecordFill(
		ctx,
		matchWithOrders.TakerOrder.GetSubaccountId().Owner,
		matchWithOrders.MakerOrder.GetSubaccountId().Owner,
		bigFillQuoteQuantums,
	)

	// Emit an event indicating a match occurred.
	ctx.EventManager().EmitEvent(
		types.NewCreateMatchEvent(
			matchWithOrders.TakerOrder.GetSubaccountId(),
			matchWithOrders.MakerOrder.GetSubaccountId(),
			bigTakerFeeQuoteQuantums,
			bigMakerFeeQuoteQuantums,
			bigTakerQuoteBalanceDelta,
			bigMakerQuoteBalanceDelta,
			bigTakerPerpetualQuantumsDelta,
			bigMakerPerpetualQuantumsDelta,
			insuranceFundDelta,
			validatorFeeQuoteQuantums,
			liquidityFeeQuoteQuantums,
			bigRouterTakerFeeQuoteQuantums,
			bigRouterMakerFeeQuoteQuantums,
			isTakerLiquidation,
			false,
			perpetualId,
		),
	)

	return takerUpdateResult, makerUpdateResult, nil
}

func (k Keeper) setOrderFillAmountsAndPruning(
	ctx sdk.Context,
	order types.Order,
	newTotalFillAmount satypes.BaseQuantums,
	curPruneableBlockHeight uint32,
) *types.OffchainUpdates {
	// Note that stateful orders are never pruned by `BlockHeight`, so we set the value to `math.MaxUint32` here.
	pruneableBlockHeight := uint32(math.MaxUint32)
	offchainUpdates := types.NewOffchainUpdates()

	if !order.IsStatefulOrder() {
		// Compute the block at which this state fill amount can be pruned. This is the greater of
		// `GoodTilBlock + ShortBlockWindow` and the existing `pruneableBlockHeight`.
		pruneableBlockHeight = lib.Max(
			order.GetGoodTilBlock()+types.ShortBlockWindow,
			curPruneableBlockHeight,
		)

		// Note: We should always prune out orders using the latest `GoodTilBlock` seen. It's possible there could be
		// multiple `GoodTilBlock`s for the same `OrderId` given order replacements. We would generally expect to see
		// the same `OrderId` with a lower `GoodTilBlock` first if the proposer is using this unmodified application,
		// but it's still not necessarily guaranteed due to MEV.
		if curPruneableBlockHeight > order.GetGoodTilBlock()+types.ShortBlockWindow {
			log.InfoLog(
				ctx,
				"Found an `orderId` in ProcessProposerMatches which had a lower GoodTilBlock than"+
					" a previous order in the list of fills. This could mean a lower priority order was allowed on the book.",
				"orderId",
				order.OrderId,
			)
		}

		// Add this order for pruning at the desired block height.
		k.AddOrdersForPruning(ctx, []types.OrderId{order.OrderId}, pruneableBlockHeight)
	}

	// Update the state with the new `fillAmount` for this `orderId`.
	// TODO(DEC-1219): Determine whether we should use `OrderFillState` proto for stateful order fill amounts.
	k.SetOrderFillAmount(
		ctx,
		order.OrderId,
		newTotalFillAmount,
		pruneableBlockHeight,
	)

	if k.GetIndexerEventManager().Enabled() {
		if _, exists := k.MemClob.GetOrder(ctx, order.OrderId); exists {
			// Generate an off-chain update message updating the total filled amount of order.
			if message, success := off_chain_updates.CreateOrderUpdateMessage(
				ctx,
				order.OrderId,
				newTotalFillAmount,
			); success {
				offchainUpdates.AddUpdateMessage(order.OrderId, message)
			}
		}
	}

	return offchainUpdates
}

// getUpdatedOrderFillAmount accepts an order's current total fill amount, total base quantums, and a new fill amount,
// and returns an error if the new fill amount would cause the order to exceed its base quantums.
// Returns the new total fill amount of the order.
func getUpdatedOrderFillAmount(
	orderId types.OrderId,
	orderBaseQuantums satypes.BaseQuantums,
	currentFillAmount satypes.BaseQuantums,
	fillQuantums satypes.BaseQuantums,
) (satypes.BaseQuantums, error) {
	bigCurrentFillAmount := currentFillAmount.ToBigInt()
	bigNewFillAmount := bigCurrentFillAmount.Add(bigCurrentFillAmount, fillQuantums.ToBigInt())
	if bigNewFillAmount.Cmp(orderBaseQuantums.ToBigInt()) == 1 {
		return 0, errorsmod.Wrapf(
			types.ErrInvalidMsgProposedOperations,
			"Match with Quantums %v would exceed total Quantums %v of OrderId %v. New total filled quantums would be %v.",
			fillQuantums,
			orderBaseQuantums,
			orderId,
			bigNewFillAmount.String(),
		)
	}

	return satypes.BaseQuantums(bigNewFillAmount.Uint64()), nil
}

func (k Keeper) logLiquidationError(
	ctx sdk.Context,
	matchWithOrders *types.MatchWithOrders,
	takerUpdateResult *satypes.UpdateResult,
	err *error,
) {
	if errors.Is(*err, satypes.ErrFailedToUpdateSubaccounts) && !takerUpdateResult.IsSuccess() {
		takerSubaccount := k.subaccountsKeeper.GetSubaccount(ctx, matchWithOrders.TakerOrder.GetSubaccountId())
		takerTnc, takerIMR, takerMMR, _ := k.subaccountsKeeper.GetNetCollateralAndMarginRequirements(
			ctx,
			satypes.Update{SubaccountId: *takerSubaccount.Id},
		)
		log.ErrorLog(ctx,
			"collateralization check failed for liquidation",
			"takerSubaccount", fmt.Sprintf("%+v", takerSubaccount),
			"takerTNC", takerTnc,
			"takerIMR", takerIMR,
			"takerMMR", takerMMR,
			"liquidationOrder", fmt.Sprintf("%+v", matchWithOrders.TakerOrder),
			"makerOrder", fmt.Sprintf("%+v", matchWithOrders.MakerOrder),
			"fillAmount", matchWithOrders.FillAmount,
			"result", *takerUpdateResult,
		)
	}
}

func (k Keeper) performStatelessValidationOnMatch(
	matchWithOrders *types.MatchWithOrders,
) error {
	if err := matchWithOrders.Validate(); err != nil {
		return errorsmod.Wrapf(
			err,
			"ProcessSingleMatch: Invalid MatchWithOrders: %+v",
			matchWithOrders,
		)
	}
	return nil
}

func (k Keeper) getClobPair(ctx sdk.Context, matchWithOrders *types.MatchWithOrders) (types.ClobPair, error) {
	clobPairId := matchWithOrders.MakerOrder.GetClobPairId()
	clobPair, found := k.GetClobPair(ctx, clobPairId)
	if !found {
		return types.ClobPair{}, types.ErrInvalidClob
	}
	return clobPair, nil
}

func (k Keeper) calculateBigFillQuoteQuantums(ctx sdk.Context, clobPair types.ClobPair, matchWithOrders *types.MatchWithOrders) (*big.Int, error) {
	makerSubticks := matchWithOrders.MakerOrder.GetOrderSubticks()
	fillAmount := matchWithOrders.FillAmount

	if fillAmount.ToUint64()%clobPair.StepBaseQuantums != 0 {
		return nil, types.ErrFillAmountNotDivisibleByStepSize
	}

	bigFillQuoteQuantums, err := getFillQuoteQuantums(clobPair, makerSubticks, fillAmount)
	if err != nil {
		return nil, err
	}

	if bigFillQuoteQuantums.Sign() == 0 {
		log.ErrorLog(
			ctx,
			"Match resulted in zero quote quantums",
			"MakerOrder", fmt.Sprintf("%+v", matchWithOrders.MakerOrder),
			"TakerOrder", fmt.Sprintf("%+v", matchWithOrders.TakerOrder),
			"FillAmount", matchWithOrders.FillAmount.ToUint64(),
		)
	}

	return bigFillQuoteQuantums, nil
}

func (k Keeper) calculateFees(ctx sdk.Context, matchWithOrders *types.MatchWithOrders, perpetualId uint32) (int32, int32, int32, int32, *big.Int, *big.Int, *big.Int, error) {
	takerFeePpm := k.feeTiersKeeper.GetPerpetualFeePpm(ctx, matchWithOrders.TakerOrder.GetSubaccountId().Owner, true)
	makerFeePpm := k.feeTiersKeeper.GetPerpetualFeePpm(ctx, matchWithOrders.MakerOrder.GetSubaccountId().Owner, false)

	takerInsuranceFundDelta := new(big.Int)
	validatorFeeQuoteQuantums := new(big.Int)
	liquidityFeeQuoteQuantums := new(big.Int)
	routerTakerFeePpm := int32(0)
	routerMakerFeePpm := int32(0)

	if matchWithOrders.TakerOrder.IsLiquidation() {
		takerFeePpm = 0
		makerFeePpm = lib.Max(makerFeePpm, 0)
		var err error
		takerInsuranceFundDelta, validatorFeeQuoteQuantums, liquidityFeeQuoteQuantums, err = k.validateMatchedLiquidationAndGetFees(
			ctx,
			matchWithOrders.TakerOrder,
			perpetualId,
			matchWithOrders.FillAmount,
			matchWithOrders.MakerOrder.GetOrderSubticks(),
		)
		if err != nil {
			return 0, 0, 0, 0, nil, nil, nil, err
		}
	} else {
		if matchWithOrders.TakerOrder.MustGetOrder().RouterSubaccountId != nil {
			routerTakerFeePpm = matchWithOrders.TakerOrder.MustGetOrder().RouterFeePpm
		}
		if matchWithOrders.MakerOrder.MustGetOrder().RouterSubaccountId != nil {
			routerMakerFeePpm = matchWithOrders.MakerOrder.MustGetOrder().RouterFeePpm
		}
	}

	return takerFeePpm, makerFeePpm, routerTakerFeePpm, routerMakerFeePpm, takerInsuranceFundDelta, validatorFeeQuoteQuantums, liquidityFeeQuoteQuantums, nil
}

func (k Keeper) calculateMakerFillAmounts(ctx sdk.Context, matchWithOrders *types.MatchWithOrders, fillAmount satypes.BaseQuantums) (satypes.BaseQuantums, uint32, error) {
	_, curMakerFillAmount, curMakerPruneableBlockHeight := k.GetOrderFillAmount(ctx, matchWithOrders.MakerOrder.MustGetOrder().OrderId)

	newMakerTotalFillAmount, err := getUpdatedOrderFillAmount(
		matchWithOrders.MakerOrder.MustGetOrder().OrderId,
		matchWithOrders.MakerOrder.GetBaseQuantums(),
		curMakerFillAmount,
		fillAmount,
	)
	if err != nil {
		return 0, 0, err
	}

	return newMakerTotalFillAmount, curMakerPruneableBlockHeight, nil
}

func (k Keeper) updateLiquidationMetricsAndCummalativeInsuranceFundDelta(ctx sdk.Context, matchWithOrders *types.MatchWithOrders, perpetualId uint32, fillAmount satypes.BaseQuantums, takerInsuranceFundDelta *big.Int) error {
	notionalLiquidatedQuoteQuantums, err := k.perpetualsKeeper.GetNetNotional(ctx, perpetualId, fillAmount.ToBigInt())
	if err != nil {
		return err
	}

	err = k.IncrementCumulativeInsuranceFundDelta(ctx, perpetualId, takerInsuranceFundDelta)
	if err != nil {
		return err
	}

	labels := []gometrics.Label{
		metrics.GetLabelForIntValue(metrics.PerpetualId, int(perpetualId)),
		metrics.GetLabelForBoolValue(metrics.CheckTx, ctx.IsCheckTx()),
	}
	if matchWithOrders.TakerOrder.IsBuy() {
		labels = append(labels, metrics.GetLabelForStringValue(metrics.OrderSide, metrics.Buy))
	} else {
		labels = append(labels, metrics.GetLabelForStringValue(metrics.OrderSide, metrics.Sell))
	}

	gometrics.AddSampleWithLabels(
		[]string{metrics.Liquidations, metrics.PlacePerpetualLiquidation, metrics.Filled, metrics.QuoteQuantums},
		metrics.GetMetricValueFromBigInt(notionalLiquidatedQuoteQuantums),
		labels,
	)
	gometrics.AddSampleWithLabels(
		[]string{metrics.Liquidations, metrics.InsuranceFundDelta},
		metrics.GetMetricValueFromBigInt(new(big.Int).Abs(takerInsuranceFundDelta)),
		append(labels, metrics.GetLabelForBoolValue(metrics.Positive, takerInsuranceFundDelta.Sign() == 1)),
	)

	return nil
}

func (k Keeper) calculateTakerFillAmounts(ctx sdk.Context, matchWithOrders *types.MatchWithOrders, fillAmount satypes.BaseQuantums) (satypes.BaseQuantums, uint32, error) {
	if matchWithOrders.TakerOrder.IsLiquidation() {
		return 0, 0, nil
	}

	_, curTakerFillAmount, curTakerPruneableBlockHeight := k.GetOrderFillAmount(ctx, matchWithOrders.TakerOrder.MustGetOrder().OrderId)

	newTakerTotalFillAmount, err := getUpdatedOrderFillAmount(
		matchWithOrders.TakerOrder.MustGetOrder().OrderId,
		matchWithOrders.TakerOrder.GetBaseQuantums(),
		curTakerFillAmount,
		fillAmount,
	)
	if err != nil {
		return 0, 0, err
	}

	return newTakerTotalFillAmount, curTakerPruneableBlockHeight, nil
}
