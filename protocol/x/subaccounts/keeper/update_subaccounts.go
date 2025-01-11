package keeper

import (
	"errors"
	"fmt"
	"math/big"
	"time"

	errorsmod "cosmossdk.io/errors"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	indexer_manager "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/metrics"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
	gometrics "github.com/hashicorp/go-metrics"
)

// CanUpdateSubaccounts will validate all `updates` to the relevant subaccounts.
// The `updates` do not have to contain unique `SubaccountIds`.
// Each update is considered in isolation. Thus if two updates are provided
// with the same `SubaccountId`, they are validated without respect to each
// other.
//
// Returns a `success` value of `true` if all updates are valid.
// Returns a `successPerUpdates` value, which is a slice of `UpdateResult`.
// These map to the updates and are used to indicate which of the updates
// caused a failure, if any.
func (k Keeper) CanUpdateSubaccounts(
	ctx sdk.Context,
	updates []types.Update,
	updateType types.UpdateType,
) (
	success bool,
	successPerUpdate []types.UpdateResult,
	err error,
) {
	defer metrics.ModuleMeasureSinceWithLabels(
		types.ModuleName,
		[]string{metrics.CanUpdateSubaccounts, metrics.Latency},
		time.Now(),
		[]gometrics.Label{
			metrics.GetLabelForStringValue(metrics.UpdateType, updateType.String()),
		},
	)

	settledUpdates, _, _, err := k.getSettledUpdates(ctx, updates, false)
	if err != nil {
		return false, nil, err
	}

	allPerps := k.perpetualsKeeper.GetAllPerpetuals(ctx)
	success, successPerUpdate, err = k.internalCanUpdateSubaccounts(ctx, settledUpdates, updateType, allPerps)
	return success, successPerUpdate, err
}

// UpdateSubaccounts validates and applies all `updates` to the relevant subaccounts as long as this is a
// valid state-transition for all subaccounts involved. All `updates` are made atomically, meaning that
// all state-changes will either succeed or all will fail.
//
// Returns a boolean indicating whether the update was successfully applied or not. If `false`, then no
// updates to any subaccount were made. A second return value returns an array of `UpdateResult` which map
// to the `updates` to indicate which of the updates caused a failure, if any.
// This function also transfers collateral between the cross-perpetual collateral pool and isolated
// perpetual collateral pools if any of the updates led to an isolated perpetual posititon to be opened
// or closed. This is done using the `x/bank` keeper and updates `x/bank` state.
//
// Each `SubaccountId` in the `updates` must be unique or an error is returned.
func (k Keeper) UpdateSubaccounts(
	ctx sdk.Context,
	updates []types.Update,
	updateType types.UpdateType,
) (
	success bool,
	successPerUpdate []types.UpdateResult,
	err error,
) {
	defer metrics.ModuleMeasureSinceWithLabels(
		types.ModuleName,
		[]string{metrics.UpdateSubaccounts, metrics.Latency},
		time.Now(),
		[]gometrics.Label{
			metrics.GetLabelForStringValue(metrics.UpdateType, updateType.String()),
		},
	)

	settledUpdates, subaccountIdToFundingPayments, subaccountIdToYieldClaimed, err := k.getSettledUpdates(ctx, updates, true)
	if err != nil {
		return false, nil, err
	}

	allPerps := k.perpetualsKeeper.GetAllPerpetuals(ctx)

	success, successPerUpdate, err = k.internalCanUpdateSubaccounts(ctx, settledUpdates, updateType, allPerps)
	if !success || err != nil {
		return success, successPerUpdate, err
	}

	// Get a mapping from perpetual Id to current perpetual funding index.
	perpIdToFundingIndex := getPerpIdToFundingIndex(allPerps)

	// Get OpenInterestDelta from the updates, and persist the OI change if any.
	perpOpenInterestDelta := GetDeltaOpenInterestFromUpdates(settledUpdates, updateType)
	// TODO: Replace this block with a MaybeModifyOpenInterest function
	if perpOpenInterestDelta != nil {
		if err := k.perpetualsKeeper.ModifyOpenInterest(
			ctx,
			perpOpenInterestDelta.PerpetualId,
			perpOpenInterestDelta.BaseQuantums,
		); err != nil {
			return false, nil, errorsmod.Wrapf(
				types.ErrCannotModifyPerpOpenInterestForOIMF,
				"perpId = %v, delta = %v, settledUpdates = %+v, err = %v",
				perpOpenInterestDelta.PerpetualId,
				perpOpenInterestDelta.BaseQuantums,
				settledUpdates,
				err,
			)
		}
	}

	perpIdToYieldIndex := getPerpIdToYieldIndex(allPerps)

	UpdateSubaccountPositions(settledUpdates, perpIdToFundingIndex, perpIdToYieldIndex)

	// Perform yield claim in by transferring appropriate x/bank coin amount
	for _, update := range settledUpdates {
		subaccountId := *update.SettledSubaccount.Id
		amountToTransfer := subaccountIdToYieldClaimed[subaccountId]

		// this assumed the perpetual updates are not applied therefore the yield is not sent twice when we then call
		// computeAndExecuteCollateralTransfer as if the subaccount is newly opened deposit yield to subaccount will
		// transfer yield to the dummy pool and then the full asset amount will be transferred to the collateral pool
		// if a a subaccount is closed, the yield is sent to the collateral pool and then the full amount will be sent
		// back to the dummy pool in computeAndExecuteCollateralTransfer
		err := k.DepositYieldToSubaccount(ctx, subaccountId, amountToTransfer)
		if err != nil {
			return false, nil, err
		}
	}

	for _, settledUpdateWithUpdatedSubaccount := range settledUpdates {
		if err := k.computeAndExecuteCollateralTransfer(
			ctx,
			// The subaccount in `settledUpdateWithUpdatedSubaccount` already has the perpetual updates
			// and asset updates applied to it.
			settledUpdateWithUpdatedSubaccount,
		); err != nil {
			return false, nil, err
		}
	}

	// Apply all updates, including a subaccount update event in the Indexer block message
	// per update and emit a cometbft event for each settled funding payment.
	for _, u := range settledUpdates {
		// TODO this should never hit but we add as a sanity check and to help catch a potential bug in testing
		if u.SettledSubaccount.AssetYieldIndex == "" {
			return false, nil, errors.New("asset yield index is not set")
		}

		for _, perp := range u.SettledSubaccount.PerpetualPositions {
			if perp.YieldIndex == "" {
				return false, nil, errors.New("perp yield index is not set")
			}
		}

		k.SetSubaccount(ctx, u.SettledSubaccount)
		// Below access is safe because for all updated subaccounts' IDs, this map
		// is populated as GetSettledSubaccount() is called in getSettledUpdates().
		fundingPayments := subaccountIdToFundingPayments[*u.SettledSubaccount.Id]
		k.GetIndexerEventManager().AddTxnEvent(
			ctx,
			indexerevents.SubtypeSubaccountUpdate,
			indexerevents.SubaccountUpdateEventVersion,
			indexer_manager.GetBytes(
				indexerevents.NewSubaccountUpdateEvent(
					u.SettledSubaccount.Id,
					getUpdatedPerpetualPositions(
						u,
						fundingPayments,
					),
					getUpdatedAssetPositions(u),
					fundingPayments,
					u.SettledSubaccount.AssetYieldIndex,
				),
			),
		)

		// Emit an event indicating a funding payment was paid / received for each settled funding
		// payment. Note that `fundingPaid` is positive if the subaccount paid funding,
		// and negative if the subaccount received funding.
		// Note the perpetual IDs are sorted first to ensure event emission determinism.
		sortedPerpIds := lib.GetSortedKeys[lib.Sortable[uint32]](fundingPayments)
		for _, perpetualId := range sortedPerpIds {
			fundingPaid := fundingPayments[perpetualId]
			ctx.EventManager().EmitEvent(
				types.NewCreateSettledFundingEvent(
					*u.SettledSubaccount.Id,
					perpetualId,
					fundingPaid.BigInt(),
				),
			)
		}
	}

	return success, successPerUpdate, err
}

// getSettledUpdates takes in a list of updates and for each update, retrieves
// the updated subaccount in its settled form, and returns a list of settledUpdate
// structs and a map that indicates for each subaccount which perpetuals had funding
// updates. If requireUniqueSubaccount is true, the SubaccountIds in the input updates
// must be unique.
func (k Keeper) getSettledUpdates(
	ctx sdk.Context,
	updates []types.Update,
	requireUniqueSubaccount bool,
) (
	settledUpdates []SettledUpdate,
	subaccountIdToFundingPayments map[types.SubaccountId]map[uint32]dtypes.SerializableInt,
	subaccountIdToYieldClaimed map[types.SubaccountId]*big.Int,
	err error,
) {
	var idToSettledSubaccount = make(map[types.SubaccountId]types.Subaccount)
	settledUpdates = make([]SettledUpdate, len(updates))
	subaccountIdToFundingPayments = make(map[types.SubaccountId]map[uint32]dtypes.SerializableInt)
	subaccountIdToYieldClaimed = make(map[types.SubaccountId]*big.Int)

	// Iterate over all updates and query the relevant `Subaccounts`.
	for i, u := range updates {
		settledSubaccount, exists := idToSettledSubaccount[u.SubaccountId]
		var fundingPayments map[uint32]dtypes.SerializableInt
		var yieldForSubaccount *big.Int

		if exists && requireUniqueSubaccount {
			return nil, nil, nil, types.ErrNonUniqueUpdatesSubaccount
		}

		// Get and store the settledSubaccount if SubaccountId doesn't exist in
		// idToSettledSubaccount map.
		if !exists {
			subaccount := k.GetSubaccount(ctx, u.SubaccountId)
			settledSubaccount, fundingPayments, yieldForSubaccount, err = k.GetSettledSubaccount(ctx, subaccount)
			if err != nil {
				return nil, nil, nil, err
			}

			subaccountIdToYieldClaimed[u.SubaccountId] = yieldForSubaccount
			idToSettledSubaccount[u.SubaccountId] = settledSubaccount
			subaccountIdToFundingPayments[u.SubaccountId] = fundingPayments
		}

		settledUpdate := SettledUpdate{
			SettledSubaccount: settledSubaccount,
			AssetUpdates:      u.AssetUpdates,
			PerpetualUpdates:  u.PerpetualUpdates,
		}

		settledUpdates[i] = settledUpdate
	}

	return settledUpdates, subaccountIdToFundingPayments, subaccountIdToYieldClaimed, nil
}

// internalCanUpdateSubaccounts will validate all `updates` to the relevant subaccounts and compute
// if any of the updates led to an isolated perpetual position being opened or closed.
// The `updates` do not have to contain `Subaccounts` with unique `SubaccountIds`.
// Each update is considered in isolation. Thus if two updates are provided
// with the same `Subaccount`, they are validated without respect to each
// other.
// The input subaccounts must be settled.
//
// Returns a `success` value of `true` if all updates are valid.
// Returns a `successPerUpdates` value, which is a slice of `UpdateResult`.
// These map to the updates and are used to indicate which of the updates
// caused a failure, if any.
func (k Keeper) internalCanUpdateSubaccounts(
	ctx sdk.Context,
	settledUpdates []SettledUpdate,
	updateType types.UpdateType,
	perpetuals []perptypes.Perpetual,
) (
	success bool,
	successPerUpdate []types.UpdateResult,
	err error,
) {
	// TODO(TRA-99): Add integration / E2E tests on order placement / matching with this new
	// constraint.
	success, successPerUpdate, err = k.checkCollateralPoolConstraints(
		settledUpdates,
		perpetuals,
	)
	if err != nil {
		return false, nil, err
	}
	if !success {
		return success, successPerUpdate, nil
	}

	success, successPerUpdate, err = k.checkMultiCollateralAssetConstraints(ctx, settledUpdates, perpetuals)
	if err != nil {
		return false, nil, err
	}
	if !success {
		return success, successPerUpdate, nil
	}

	// Block all withdrawals and transfers if either of the following is true within the last
	// `WITHDRAWAL_AND_TRANSFERS_BLOCKED_AFTER_NEGATIVE_TNC_SUBACCOUNT_SEEN_BLOCKS`:
	// - There was a negative TNC subaccount seen for any of the collateral pools of subaccounts being updated
	// - There was a chain outage that lasted at least five minutes.
	if updateType == types.Withdrawal || updateType == types.Transfer {
		lastBlockNegativeTncSubaccountSeen, negativeTncSubaccountExists, err := k.getLastBlockNegativeSubaccountSeen(
			ctx,
			settledUpdates,
		)
		if err != nil {
			return false, nil, err
		}
		currentBlock := uint32(ctx.BlockHeight())

		// Panic if the current block is less than the last block a negative TNC subaccount was seen.
		if negativeTncSubaccountExists && currentBlock < lastBlockNegativeTncSubaccountSeen {
			panic(
				fmt.Sprintf(
					"internalCanUpdateSubaccounts: current block (%d) is less than the last "+
						"block a negative TNC subaccount was seen (%d)",
					currentBlock,
					lastBlockNegativeTncSubaccountSeen,
				),
			)
		}

		// Panic if the current block is less than the last block a chain outage was seen.
		downtimeInfo := k.blocktimeKeeper.GetDowntimeInfoFor(
			ctx,
			types.WITHDRAWAL_AND_TRANSFERS_BLOCKED_AFTER_CHAIN_OUTAGE_DURATION,
		)
		chainOutageExists := downtimeInfo.BlockInfo.Height > 0 && downtimeInfo.Duration > 0
		if chainOutageExists && currentBlock < downtimeInfo.BlockInfo.Height {
			panic(
				fmt.Sprintf(
					"internalCanUpdateSubaccounts: current block (%d) is less than the last "+
						"block a chain outage was seen (%d)",
					currentBlock,
					downtimeInfo.BlockInfo.Height,
				),
			)
		}

		negativeTncSubaccountSeen := negativeTncSubaccountExists && currentBlock-lastBlockNegativeTncSubaccountSeen <
			types.WITHDRAWAL_AND_TRANSFERS_BLOCKED_AFTER_NEGATIVE_TNC_SUBACCOUNT_SEEN_BLOCKS
		chainOutageSeen := chainOutageExists && currentBlock-downtimeInfo.BlockInfo.Height <
			types.WITHDRAWAL_AND_TRANSFERS_BLOCKED_AFTER_NEGATIVE_TNC_SUBACCOUNT_SEEN_BLOCKS

		if negativeTncSubaccountSeen || chainOutageSeen {
			success = false
			for i := range settledUpdates {
				successPerUpdate[i] = types.WithdrawalsAndTransfersBlocked
			}
			metrics.IncrCounterWithLabels(
				metrics.SubaccountWithdrawalsAndTransfersBlocked,
				1,
				metrics.GetLabelForStringValue(metrics.UpdateType, updateType.String()),
				metrics.GetLabelForBoolValue(metrics.SubaccountsNegativeTncSubaccountSeen, negativeTncSubaccountSeen),
				metrics.GetLabelForBoolValue(metrics.ChainOutageSeen, chainOutageSeen),
			)
			return success, successPerUpdate, nil
		}
	}

	// Get delta open interest from the updates.
	// `perpOpenInterestDelta` is nil if the update type is not `Match` or if the updates
	// do not result in OI changes.
	perpOpenInterestDelta := GetDeltaOpenInterestFromUpdates(settledUpdates, updateType)

	bigCurNetCollateral := make(map[string]*big.Int)
	bigCurInitialMargin := make(map[string]*big.Int)
	bigCurMaintenanceMargin := make(map[string]*big.Int)

	// Iterate over all updates.
	for i, u := range settledUpdates {
		// Check all updated perps are updatable.
		for _, perpUpdate := range u.PerpetualUpdates {
			err := checkPositionUpdatable(ctx, k.perpetualsKeeper, perpUpdate)
			if err != nil {
				return false, nil, err
			}
		}

		// Check all updated assets are updatable.
		for _, assetUpdate := range u.AssetUpdates {
			err := checkPositionUpdatable(ctx, k.assetsKeeper, assetUpdate)
			if err != nil {
				return false, nil, err
			}
		}

		// Branch the state to calculate the new OIMF after OI increase.
		// The branched state is only needed for this purpose and is always discarded.
		branchedContext, _ := ctx.CacheContext()

		// Temporily apply open interest delta to perpetuals, so IMF is calculated based on open interest after the update.
		// `perpOpenInterestDeltas` is only present for `Match` update type.
		if perpOpenInterestDelta != nil {
			if err := k.perpetualsKeeper.ModifyOpenInterest(
				branchedContext,
				perpOpenInterestDelta.PerpetualId,
				perpOpenInterestDelta.BaseQuantums,
			); err != nil {
				return false, nil, errorsmod.Wrapf(
					types.ErrCannotModifyPerpOpenInterestForOIMF,
					"perpId = %v, delta = %v, settledUpdates = %+v, err = %v",
					perpOpenInterestDelta.PerpetualId,
					perpOpenInterestDelta.BaseQuantums,
					settledUpdates,
					err,
				)
			}
		}

		// Get the new collateralization and margin requirements with the update applied.
		bigNewNetCollateral,
			bigNewInitialMargin,
			bigNewMaintenanceMargin,
			err := k.internalGetNetCollateralAndMarginRequirements(branchedContext, u)
		if err != nil {
			return false, nil, err
		}

		var result = types.Success

		// The subaccount is not well-collateralized after the update.
		// We must now check if the state transition is valid.
		if bigNewInitialMargin.Cmp(bigNewNetCollateral) > 0 {
			// Get the current collateralization and margin requirements without the update applied.
			emptyUpdate := SettledUpdate{
				SettledSubaccount: u.SettledSubaccount,
			}

			bytes, err := proto.Marshal(u.SettledSubaccount.Id)
			if err != nil {
				return false, nil, err
			}

			saKey := string(bytes)

			// Cache the current collateralization and margin requirements for the subaccount.
			if _, ok := bigCurNetCollateral[saKey]; !ok {
				bigCurNetCollateral[saKey],
					bigCurInitialMargin[saKey],
					bigCurMaintenanceMargin[saKey],
					err = k.internalGetNetCollateralAndMarginRequirements(
					ctx,
					emptyUpdate,
				)
				if err != nil {
					return false, nil, err
				}
			}

			// Determine whether the state transition is valid.
			result = IsValidStateTransitionForUndercollateralizedSubaccount(
				bigCurNetCollateral[saKey],
				bigCurInitialMargin[saKey],
				bigCurMaintenanceMargin[saKey],
				bigNewNetCollateral,
				bigNewMaintenanceMargin,
			)
		}

		// If this state transition is not valid, the overall success is now false.
		if !result.IsSuccess() {
			success = false
		}

		successPerUpdate[i] = result
	}

	return success, successPerUpdate, nil
}
