package memclob

import (
	"errors"
	"fmt"
	"math/big"
	"runtime/debug"
	"time"

	cmtlog "github.com/cometbft/cometbft/libs/log"
	"github.com/zyedidia/generic/list"

	errorsmod "cosmossdk.io/errors"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/off_chain_updates"
	ocutypes "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/off_chain_updates/types"
	indexershared "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/shared"
	indexersharedtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/shared/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/log"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/metrics"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	gometrics "github.com/hashicorp/go-metrics"
)

// Ensure that `memClobPriceTimePriority` struct properly implements
// the `MemClob` interface.
var _ types.MemClob = &MemClobPriceTimePriority{}

type MemClobPriceTimePriority struct {
	// ---- Fields for open orders ----
	// Struct for storing all open orders (including their expiries).
	openOrders *memclobOpenOrders

	// ---- Fields for canceled orders ----
	// Struct for storing order cancelations (including their expiries).
	cancels *memclobCancels

	// OperationsToPropose struct for proposing operations in the next block.
	operationsToPropose types.OperationsToPropose

	// A reference to an expected clob keeper.
	clobKeeper types.MemClobKeeper

	// ---- Fields for determining if off-chain update messages should be generated ----
	generateOffchainUpdates bool

	// ---- Fields for determining if orderbook updates should be generated ----
	generateOrderbookUpdates bool
}

type OrderWithRemovalReason struct {
	Order         types.Order
	RemovalReason types.OrderRemoval_RemovalReason
}

func NewMemClobPriceTimePriority(
	generateOffchainUpdates bool,
) *MemClobPriceTimePriority {
	return &MemClobPriceTimePriority{
		openOrders:               newMemclobOpenOrders(),
		cancels:                  newMemclobCancels(),
		operationsToPropose:      *types.NewOperationsToPropose(),
		generateOffchainUpdates:  generateOffchainUpdates,
		generateOrderbookUpdates: false,
	}
}

// SetClobKeeper sets the MemClobKeeper reference for this MemClob.
// This method is called after the MemClob struct is initialized.
// This reference is set with an explicit method call rather than during `NewMemClobPriceTimePriority`
// due to the bidirectional dependency between the Keeper and the MemClob.
func (m *MemClobPriceTimePriority) SetClobKeeper(clobKeeper types.MemClobKeeper) {
	m.clobKeeper = clobKeeper
}

// SetGenerateOffchainUpdates sets the `generateOffchainUpdates` field of the MemClob.
func (m *MemClobPriceTimePriority) SetGenerateOrderbookUpdates(generateOrderbookUpdates bool) {
	m.generateOrderbookUpdates = generateOrderbookUpdates
}

// CancelOrder removes a Short-Term order by `OrderId` (if it exists) from all order-related data structures
// in the memclob. This method manages only Short-Term cancellations. For stateful cancellations, see
// `msg_server_cancel_orders.go`.

// For short-term orders, CancelOrder adds (or updates) a cancel to the desired `goodTilBlock` in the memclob.
// If a cancel already exists for this order with a lower `goodTilBlock`, the cancel is updated to the
// new `goodTilBlock`.
//
// For short-term cancels, an error will be returned if any of the following conditions are true:
// - A cancel already exists for this order with the same or greater `GoodTilBlock`.
//
// If the order is removed from the orderbook, an off-chain update message will be generated.
func (m *MemClobPriceTimePriority) CancelOrder(
	ctx sdk.Context,
	msgCancelOrder *types.MsgCancelOrder,
) (offchainUpdates *types.OffchainUpdates, err error) {
	lib.AssertCheckTxMode(ctx)
	orderIdToCancel := msgCancelOrder.GetOrderId()
	orderIdToCancel.MustBeShortTermOrder()

	goodTilBlock := msgCancelOrder.GetGoodTilBlock()
	validCancelExistence, cancelExistence := m.doesValidCancelOrderAlreadyExist(ctx, orderIdToCancel, goodTilBlock)

	if validCancelExistence {
		return nil, types.ErrMemClobCancelAlreadyExists
	}

	m.processCancelOrder(ctx, orderIdToCancel, goodTilBlock, cancelExistence)

	offchainUpdates = m.getCancelOrderOffchainUpdates(ctx, orderIdToCancel)

	return offchainUpdates, nil
}

// MaybeCreateOrderbook is used for updating memclob internal data structures to mark an orderbook as created.
func (m *MemClobPriceTimePriority) MaybeCreateOrderbook(
	ctx sdk.Context,
	clobPair types.ClobPair,
) {
	if _, exists := m.openOrders.orderbooksMap[clobPair.GetClobPairId()]; exists {
		return
	}
	m.CreateOrderbook(ctx, clobPair)
}

// CreateOrderbook is used for updating memclob internal data structures to mark an orderbook as created.
// This function will panic if `clobPairId` already exists in any of the memclob's internal data structures.
func (m *MemClobPriceTimePriority) CreateOrderbook(
	ctx sdk.Context,
	clobPair types.ClobPair,
) {
	clobPairId, subticksPerTick, minOrderBaseQuantums := m.getClobPairMetadataForOrderbook(clobPair)
	m.openOrders.createOrderbook(clobPairId, subticksPerTick, minOrderBaseQuantums)
}

// Must be invoked with `CheckTx` context.
func (m *MemClobPriceTimePriority) CountSubaccountShortTermOrders(
	ctx sdk.Context,
	subaccountId satypes.SubaccountId,
) (count uint32) {
	lib.AssertCheckTxMode(ctx)

	for _, orderbook := range m.openOrders.orderbooksMap {
		count += getShortTermOrderCountInOrderbook(orderbook, subaccountId)
	}

	return count
}

// GetOrder gets an order by ID and returns it.
func (m *MemClobPriceTimePriority) GetOrder(
	ctx sdk.Context,
	orderId types.OrderId,
) (order types.Order, found bool) {
	return m.openOrders.getOrder(orderId)
}

// GetCancelOrder returns the `tilBlock` expiry of an order cancelation and a bool indicating whether the expiry exists.
func (m *MemClobPriceTimePriority) GetCancelOrder(
	ctx sdk.Context,
	orderId types.OrderId,
) (tilBlock uint32, found bool) {
	lib.AssertCheckTxMode(ctx)
	return m.cancels.get(orderId)
}

// GetOrderFilledAmount returns the total filled amount of an order from state.
func (m *MemClobPriceTimePriority) GetOrderFilledAmount(
	ctx sdk.Context,
	orderId types.OrderId,
) satypes.BaseQuantums {
	exists, orderStateFilledAmount, _ := m.clobKeeper.GetOrderFillAmount(ctx, orderId)
	if !exists {
		orderStateFilledAmount = 0
	}

	return orderStateFilledAmount
}

// GetSubaccountOrders gets all of a subaccount's order on a specific CLOB and side.
// This function will panic if `side` is invalid or if the orderbook does not exist.
func (m *MemClobPriceTimePriority) GetSubaccountOrders(
	ctx sdk.Context,
	clobPairId types.ClobPairId,
	subaccountId satypes.SubaccountId,
	side types.Order_Side,
) (openOrders []types.Order, err error) {
	return m.openOrders.getSubaccountOrders(
		clobPairId,
		subaccountId,
		side,
	)
}

// InsertZeroFillDeleveragingIntoOperationsQueue inserts a zero-fill deleveraging operation
// into the operations queue. This is used to signify that a subaccount has negative TNC and
// withdrawals should be disabled.
func (m *MemClobPriceTimePriority) InsertZeroFillDeleveragingIntoOperationsQueue(
	ctx sdk.Context,
	subaccountId satypes.SubaccountId,
	perpetualId uint32,
) {
	m.operationsToPropose.AddZeroFillDeleveragingToOperationsQueue(
		subaccountId,
		perpetualId,
	)
}

// mustUpdateMemclobStateWithMatches updates the memclob state by applying matches to all bookkeeping data structures.
// Namely, it will perform the following operations:
//   - Append all newly-matched orders to the operations queue, along with all new matches.
//   - Update orderbook state by updating the filled amount of all matched maker orders, and removing them if fully
//     filled.
func (m *MemClobPriceTimePriority) mustUpdateMemclobStateWithMatches(
	ctx sdk.Context,
	takerOrder types.MatchableOrder,
	newMakerFills []types.MakerFill,
	matchedOrderHashToOrder map[types.OrderHash]types.MatchableOrder,
	matchedMakerOrderIdToOrder map[types.OrderId]types.Order,
) (offchainUpdates *types.OffchainUpdates) {
	offchainUpdates = types.NewOffchainUpdates()

	m.updateMatchedOrders(matchedOrderHashToOrder)

	// Define a data-structure for storing the total number of matched quantums for each subaccount
	// in the matching loop. This is used for reduce-only logic.
	subaccountTotalMatchedQuantums := make(map[satypes.SubaccountId]*big.Int)
	makerFillWithOrders := m.processMakerFills(
		ctx,
		newMakerFills,
		takerOrder,
		matchedMakerOrderIdToOrder,
		subaccountTotalMatchedQuantums,
		offchainUpdates,
	)

	m.addTakerOrderToOperationsQueueIfNeeded(takerOrder, ctx)

	// Add the new matches to the operations queue.
	m.operationsToPropose.MustAddMatchToOperationsQueue(takerOrder, makerFillWithOrders)

	m.maybeCancelReduceOnlyOrdersPostMatch(ctx, takerOrder, subaccountTotalMatchedQuantums, offchainUpdates)

	return offchainUpdates
}

// GetOperationsRaw fetches the operations to propose in the next block in raw format
// for placement into MsgProposedOperations.
func (m *MemClobPriceTimePriority) GetOperationsRaw(ctx sdk.Context) (
	operationsQueue []types.OperationRaw,
) {
	return m.operationsToPropose.GetOperationsToPropose()
}

// GetOperationsToReplay fetches the operations to replay in `PrepareCheckState`.
func (m *MemClobPriceTimePriority) GetOperationsToReplay(ctx sdk.Context) (
	[]types.InternalOperation,
	map[types.OrderHash][]byte,
) {
	return m.operationsToPropose.GetOperationsToReplay()
}

// PlaceOrder will perform the following operations:
// - Validate the order against memclob in-memory state.
// - If the newly placed order causes an overlap, match orders within that orderbook.
//   - Note that if any maker orders fail collateralization checks they will be removed, and if the taker order fails
//     collateralization checks then matching will stop.
//   - If there were any matches resulting from matching the taker order, memclob state will be updated accordingly.
//   - If the order has nonzero remaining size after it has been matched and passes collateralization checks, the order
//     will be added to the orderbook and other bookkeeping datastructures.
//
// This function will return the amount of optimistically filled size (in base quantums) of the order that was filled
// while attempting to match the taker order against the book, along with the status of the placed order.
// If order validation failed, no state in the memclob will be modified and an error will be returned.
func (m *MemClobPriceTimePriority) PlaceOrder(
	ctx sdk.Context,
	order types.Order,
) (
	orderSizeOptimisticallyFilledFromMatchingQuantums satypes.BaseQuantums,
	orderStatus types.OrderStatus,
	offchainUpdates *types.OffchainUpdates,
	err error,
) {
	lib.AssertCheckTxMode(ctx)
	// invariant checks
	defer m.ensureOrderbookNotCrossed(order)

	offchainUpdates = types.NewOffchainUpdates()

	// Validate the order and return an error if any validation fails.
	if err := m.validateNewOrder(ctx, order); err != nil {
		return 0, 0, offchainUpdates, err
	}

	m.handlePlaceOrderAndMaybeReplacementOffchainUpdates(ctx, order, offchainUpdates)

	// Attempt to match the order against the orderbook.
	takerOrderStatus, takerOffchainUpdates, _, err := m.matchOrder(ctx, &order)
	offchainUpdates.Append(takerOffchainUpdates)

	if err != nil {
		m.handleOrderMatchingError(ctx, order, takerOrderStatus, offchainUpdates, err)
		return 0, 0, offchainUpdates, err
	}

	return m.processOrderPostMatchAttempt(ctx, order, takerOrderStatus, offchainUpdates)
}

// PlacePerpetualLiquidation matches an IOC liquidation order against the orderbook. Specifically,
// it will perform the following operations:
//   - If the liquidation order overlaps the orderbook, it will match orders within that orderbook
//     until there is no overlap.
//   - Note that if any maker orders fail collateralization checks they will be removed, and it won't
//     perform collateralization checks on the taker order.
//   - If there were any matches resulting from matching the liquidation order, memclob state will
//     be updated accordingly.
func (m *MemClobPriceTimePriority) PlacePerpetualLiquidation(
	ctx sdk.Context,
	liquidationOrder types.LiquidationOrder,
) (
	orderSizeOptimisticallyFilledFromMatchingQuantums satypes.BaseQuantums,
	orderStatus types.OrderStatus,
	offchainUpdates *types.OffchainUpdates,
	err error,
) {
	lib.AssertCheckTxMode(ctx)

	// Attempt to match the liquidation order against the orderbook.
	// TODO(DEC-1157): Update liquidations flow to send off-chain indexer messages.
	liquidationOrderStatus, offchainUpdates, _, err := m.matchOrder(ctx, &liquidationOrder)
	if err != nil {
		return 0, 0, nil, err
	}

	return liquidationOrderStatus.OrderOptimisticallyFilledQuantums,
		liquidationOrderStatus.OrderStatus,
		offchainUpdates,
		err
}

// DeleverageSubaccount will deleverage a subaccount by finding perpetual positions that can be used to offset
// the offending subaccount. All position will be closed at the bankruptcy price of the subaccount that is being
// deleveraged.
func (m *MemClobPriceTimePriority) DeleverageSubaccount(
	ctx sdk.Context,
	subaccountId satypes.SubaccountId,
	perpetualId uint32,
	deltaQuantums *big.Int,
	isFinalSettlement bool,
) (
	quantumsDeleveraged *big.Int,
	err error,
) {
	lib.AssertCheckTxMode(ctx)

	fills, deltaQuantumsRemaining := m.clobKeeper.OffsetSubaccountPerpetualPosition(
		ctx,
		subaccountId,
		perpetualId,
		deltaQuantums,
		isFinalSettlement,
	)

	if len(fills) > 0 {
		m.operationsToPropose.MustAddDeleveragingToOperationsQueue(
			subaccountId,
			perpetualId,
			fills,
			isFinalSettlement,
		)
	}

	quantumsDeleveraged = new(big.Int).Abs(new(big.Int).Sub(deltaQuantums, deltaQuantumsRemaining))
	return quantumsDeleveraged, nil
}

// matchOrder will match the provided `MatchableOrder` as a taker order against the respective orderbook.
// This function will return the status of the matched order, along with the new taker pending matches.
// If order matching results in any error, all state updates wil be discarded.
func (m *MemClobPriceTimePriority) matchOrder(
	ctx sdk.Context,
	order types.MatchableOrder,
) (
	orderStatus types.TakerOrderStatus,
	offchainUpdates *types.OffchainUpdates,
	makerOrdersToRemove []OrderWithRemovalReason,
	err error,
) {
	offchainUpdates = types.NewOffchainUpdates()
	// Branch the state for atomic execution
	branchedContext, writeCache := ctx.CacheContext()

	// Attempt to match the order against the orderbook.
	newMakerFills,
		matchedOrderHashToOrder,
		matchedMakerOrderIdToOrder,
		makerOrdersToRemove,
		takerOrderStatus := m.mustPerformTakerOrderMatching(
		branchedContext,
		order,
	)

	m.removeOriginalOrderIfReplacement(order, &makerOrdersToRemove)
	m.removeMakerOrdersFromBookAfterMatching(branchedContext, order, makerOrdersToRemove, offchainUpdates)

	matchingErr := m.determineMatchingError(order, takerOrderStatus, newMakerFills)
	takerGeneratedValidMatches := len(newMakerFills) > 0 && matchingErr == nil

	if takerGeneratedValidMatches {
		m.updateMemclobStateWithMatches(
			branchedContext,
			order,
			newMakerFills,
			matchedOrderHashToOrder,
			matchedMakerOrderIdToOrder,
			offchainUpdates,
		)
		writeCache()
	}

	return takerOrderStatus, offchainUpdates, makerOrdersToRemove, matchingErr
}

// ReplayOperations will replay the provided operations onto the memclob.
// This is used to replay all local operations from the local `operationsToPropose` from the previous block.
// The following operations are supported:
// - Short-Term orders.
// - Newly-placed stateful orders.
// - Pre-existing stateful orders.
// - Stateful cancelations.
// Note that match operations are no-op.
func (m *MemClobPriceTimePriority) ReplayOperations(
	ctx sdk.Context,
	localOperations []types.InternalOperation,
	shortTermOrderTxBytes map[types.OrderHash][]byte,
	existingOffchainUpdates *types.OffchainUpdates,
) *types.OffchainUpdates {
	lib.AssertCheckTxMode(ctx)

	defer telemetry.MeasureSince(
		time.Now(),
		types.ModuleName,
		metrics.MemClobReplayOperations,
		metrics.Latency,
	)

	telemetry.SetGauge(
		float32(len(localOperations)),
		types.ModuleName,
		metrics.MemClobReplayOperations,
		metrics.OperationsQueueLength,
	)

	// Recover from any panics that occur during replay operations.
	// This could happen in cases where i.e. A subaccount balance overflowed
	// during a match. We don't want to halt the entire chain in this case.
	// TODO(CLOB-275): Do not gracefully handle panics in `PrepareCheckState`.
	defer m.recoverFromReplayOperationsPanic(ctx)

	placedPreexistingStatefulOrderIds := make(map[types.OrderId]struct{})
	placedOrderRemovalOrderIds := make(map[types.OrderId]struct{})

	for _, operation := range localOperations {
		switch operation.Operation.(type) {
		case *types.InternalOperation_ShortTermOrderPlacement:
			existingOffchainUpdates = m.replayShortTermOrderPlacement(ctx, operation, shortTermOrderTxBytes, existingOffchainUpdates)
		case *types.InternalOperation_PreexistingStatefulOrder:
			existingOffchainUpdates = m.replayPreexistingStatefulOrder(ctx, operation, placedPreexistingStatefulOrderIds, placedOrderRemovalOrderIds, existingOffchainUpdates)
		case *types.InternalOperation_OrderRemoval:
			existingOffchainUpdates = m.replayOrderRemoval(ctx, operation, placedPreexistingStatefulOrderIds, placedOrderRemovalOrderIds, existingOffchainUpdates)
		case *types.InternalOperation_Match:
			// Matches are a no-op.
		default:
			panic(fmt.Sprintf("unknown operation type: %T", operation.Operation))
		}
	}

	existingOffchainUpdates.CondenseMessagesForReplay()
	return existingOffchainUpdates
}

// RemoveAndClearOperationsQueue is called during `Commit`/`PrepareCheckState`
// to clear and remove all orders that exist in the provided local validator's OTP (`operationsToPropose`).
// It performs the following steps:
// 1. Copy the operations queue.
// 2. Clear the OTP. Note that this also removes nonces for every operation in the OTP.
// 3. For each order placement operation in the copy, remove the order from the book if it exists.
func (m *MemClobPriceTimePriority) RemoveAndClearOperationsQueue(
	ctx sdk.Context,
	localValidatorOperationsQueue []types.InternalOperation,
) {
	lib.AssertCheckTxMode(ctx)

	defer telemetry.MeasureSince(
		time.Now(),
		types.ModuleName,
		metrics.RemoveAndClearOperationsQueue,
		metrics.Latency,
	)

	// Clear the OTP. This will also remove nonces for every operation in `operationsQueueCopy`.
	m.operationsToPropose.ClearOperationsQueue()

	// For each order placement operation in the copy, remove the order from the book
	// if it exists.
	for _, operation := range localValidatorOperationsQueue {
		switch operation.Operation.(type) {
		case *types.InternalOperation_ShortTermOrderPlacement:
			m.handleShortTermOrderPlacementRemoval(ctx, operation)
		case *types.InternalOperation_PreexistingStatefulOrder:
			m.handlePreexistingStatefulOrderRemoval(ctx, operation)
		}
	}
}

// PurgeInvalidMemclobState will purge the following invalid state from the memclob:
// - Expired Short-Term order cancellations.
// - Expired Short-Term and stateful orders.
// - Fully-filled orders.
// - Canceled stateful orders.
// - Forcefully removed stateful orders.
func (m *MemClobPriceTimePriority) PurgeInvalidMemclobState(
	ctx sdk.Context,
	filledOrderIds []types.OrderId,
	expiredStatefulOrderIds []types.OrderId,
	canceledStatefulOrderIds []types.OrderId,
	removedStatefulOrderIds []types.OrderId,
	existingOffchainUpdates *types.OffchainUpdates,
) *types.OffchainUpdates {
	lib.AssertCheckTxMode(ctx)

	defer telemetry.MeasureSince(
		time.Now(),
		types.ModuleName,
		metrics.MemClobPurgeInvalidState,
		metrics.Latency,
	)

	blockHeight := lib.MustConvertIntegerToUint32(ctx.BlockHeight())

	// Remove all fully-filled order IDs from the memclob if they exist.
	for _, orderId := range filledOrderIds {
		m.RemoveOrderIfFilled(ctx, orderId)
	}

	// Remove all canceled stateful order IDs from the memclob if they exist.
	// If the slice has non-stateful order IDs or contains duplicates, panic.
	if lib.ContainsDuplicates(canceledStatefulOrderIds) {
		panic(
			fmt.Sprintf(
				"PurgeInvalidMemclobState: called with canceledStatefulOrderIds slice %v which contains duplicate order IDs",
				canceledStatefulOrderIds,
			),
		)
	}

	for _, statefulOrderId := range canceledStatefulOrderIds {
		statefulOrderId.MustBeStatefulOrder()

		// TODO(DEC-798/DEC-1279): Update this logic once we've determined how to rewind `MsgRemoveOrder` messages.
		// Currently stateful orders can be removed from the book due to things such as collateralization
		// check failures, self-trade errors, etc and will not be removed from state. Therefore it
		// is possible that when they are canceled they will not exist on the orderbook.
		if m.openOrders.hasOrder(statefulOrderId) {
			m.mustRemoveOrder(ctx, statefulOrderId)
		}
	}

	// Remove all expired stateful order IDs from the memclob if they exist.
	// If the slice has non-stateful order IDs or contains duplicates, panic.
	if lib.ContainsDuplicates(expiredStatefulOrderIds) {
		panic(
			fmt.Sprintf(
				"PurgeInvalidMemclobState: called with expiredStatefulOrderIds slice %v which contains duplicate order IDs",
				expiredStatefulOrderIds,
			),
		)
	}

	for _, statefulOrderId := range expiredStatefulOrderIds {
		statefulOrderId.MustBeStatefulOrder()

		// TODO(DEC-1800): Ensure correct indexer updates are returned for expired stateful orders.
		// TODO(DEC-798/DEC-1279): Update this logic once we've determined how to rewind `MsgRemoveOrder` messages.
		// Currently stateful orders can be removed from the book due to things such as collateralization
		// check failures, self-trade errors, etc and will not be removed from state. Therefore it
		// is possible that when they expire they will not exist on the orderbook.
		if m.openOrders.hasOrder(statefulOrderId) {
			m.mustRemoveOrder(ctx, statefulOrderId)

			if m.generateOffchainUpdates {
				// Send an off-chain update message indicating the stateful order should be removed from the
				// orderbook on the Indexer. As the order is expired, the status of the order is canceled
				// and not best-effort-canceled.
				if message, success := off_chain_updates.CreateOrderRemoveMessageWithReason(
					ctx,
					statefulOrderId,
					indexersharedtypes.OrderRemovalReason_ORDER_REMOVAL_REASON_EXPIRED,
					ocutypes.OrderRemoveV1_ORDER_REMOVAL_STATUS_CANCELED,
				); success {
					existingOffchainUpdates.AddRemoveMessage(statefulOrderId, message)
				}
			}
		}
	}

	// Remove all expired Short-Term order IDs from the memclob.
	if blockExpirations, beExists := m.openOrders.blockExpirationsForOrders[blockHeight]; beExists {
		for shortTermOrderId := range blockExpirations {
			if m.generateOffchainUpdates {
				// Send an off-chain update message indicating the order should be removed from the
				// orderbook on the Indexer. As the order is expired, the status of the order is canceled
				// and not best-effort-canceled.
				if message, success := off_chain_updates.CreateOrderRemoveMessageWithReason(
					ctx,
					shortTermOrderId,
					indexersharedtypes.OrderRemovalReason_ORDER_REMOVAL_REASON_EXPIRED,
					ocutypes.OrderRemoveV1_ORDER_REMOVAL_STATUS_CANCELED,
				); success {
					existingOffchainUpdates.AddRemoveMessage(shortTermOrderId, message)
				}
			}

			m.mustRemoveOrder(ctx, shortTermOrderId)
		}
	}

	// Remove all forcefully removed stateful order IDs from the memclob if they exist.
	// Indexer events are sent during DeliverTx and therefore do not need to be sent here.
	for _, statefulOrderId := range removedStatefulOrderIds {
		statefulOrderId.MustBeStatefulOrder()

		if m.openOrders.hasOrder(statefulOrderId) {
			m.mustRemoveOrder(ctx, statefulOrderId)
		}
	}

	// Remove expired cancels. Note we don't have to remove a nonce for Short-Term order cancellations
	// since they will be removed in `ClearOperationsQueue`.
	m.cancels.removeAllAtBlock(blockHeight)

	return existingOffchainUpdates
}

// validateNewOrder will perform the following validation against the memclob's in-memory state to ensure the order
// can be placed (and if any condition is false, an error will be returned):
//   - The order is not canceled (with an equal-to-or-greater-than `GoodTilBlock` than the new order).
//   - If the order is replacing another order, then the new order's expiration must not be less than the
//     existing order's expiration.
//
// Note that it does not perform collateralization checks since that will be done when matching the order (if the order
// overlaps the book) and when adding the order to the book (if the order has remaining size after matching).
//
// This function does not perform any order validation that doesn't depend on the memclob's in-memory state.
// Specifically, it will assume the following is true:
// - `Order.OrderId` is a valid `OrderId`.
// - The `Order.ClobPairId` references a valid `ClobPair`.
// - The order is not expired (`Order.GoodTilBlock >= currentBlock`).
// - The order expiration is within `ShortBlockWindow` (`Order.GoodTilBlock <= currentBlock + ShortBlockWindow`).
// - This order has not already been fully filled.
// - `Order.Side` is a valid side.
// - The order is a valid order for the referenced `ClobPair` (where `Order.ClobPairId == ClobPair.Id`). Specifically:
//   - `Order.Subticks` is a multiple of `ClobPair.SubticksPerTick`.
//   - `Order.Quantums` is greater than orderbook's MinOrderBaseQuantums (equal to `ClobPair.StepBaseQuantums`)
//   - `Order.Quantums` is a multiple of `ClobPair.StepBaseQuantums`.
func (m *MemClobPriceTimePriority) validateNewOrder(
	ctx sdk.Context,
	order types.Order,
) (
	err error,
) {
	defer telemetry.ModuleMeasureSince(
		types.ModuleName,
		time.Now(),
		metrics.PlaceOrder,
		metrics.Memclob,
		metrics.ValidateOrder,
		metrics.Latency,
	)

	if err := m.validateOrderHasNotBeenCanceled(order); err != nil {
		return err
	}

	if err := m.validateReplacementOrder(order); err != nil {
		return err
	}

	if err := m.validateReduceOnlyOrder(ctx, order); err != nil {
		return err
	}
	// Check if the order being replaced has at least `MinOrderBaseQuantums` of size remaining, otherwise the order
	// is considered fully filled and cannot be placed/replaced.
	remainingAmount, hasRemainingAmount := m.GetOrderRemainingAmount(ctx, order)
	if err := m.validateOrderSize(order, remainingAmount, hasRemainingAmount); err != nil {
		return err
	}
	// Immediate-or-cancel and fill-or-kill orders may only be filled once. The remaining size becomes unfillable.
	// This prevents the case where an IOC order is partially filled multiple times over the course of multiple blocks.
	if err := m.validateImmediateExecutionOrder(order, remainingAmount); err != nil {
		return err
	}

	return nil
}

// addOrderToOrderbookSubaccountUpdatesCheck will perform a check to verify that the subaccount updates
// if the new maker order were to be fully filled are valid.
// It returns the result of this subaccount updates check. If the check returns an error, it will return
// the  error so that it can be surfaced to the client.
//
// This function will assume that all prior order validation has passed, including the pre-requisite validation of
// `validateNewOrder` and the actual validation performed within `validateNewOrder`.
// Note that this is a loose check, mainly for the purposes of spam mitigation. We perform an additional
// check on the subaccount updates for orders when we attempt to match them.
func (m *MemClobPriceTimePriority) addOrderToOrderbookSubaccountUpdatesCheck(
	ctx sdk.Context,
	order types.Order,
) types.OrderStatus {
	defer telemetry.ModuleMeasureSince(
		types.ModuleName,
		time.Now(),
		metrics.PlaceOrder,
		metrics.Memclob,
		metrics.AddToOrderbookCollateralizationCheck,
		metrics.Latency,
	)

	orderId := order.OrderId
	subaccountId := orderId.SubaccountId

	// For the collateralization check, use the remaining amount of the order that is resting on the book.
	remainingAmount, hasRemainingAmount := m.GetOrderRemainingAmount(ctx, order)
	if !hasRemainingAmount {
		panic(fmt.Sprintf("addOrderToOrderbookSubaccountUpdatesCheck: order has no remaining amount %v", order))
	}

	pendingOpenOrder := types.PendingOpenOrder{
		RemainingQuantums: remainingAmount,
		IsBuy:             order.IsBuy(),
		Subticks:          order.GetOrderSubticks(),
		ClobPairId:        order.GetClobPairId(),
	}

	// Temporarily construct the subaccountOpenOrders with a single PendingOpenOrder.
	subaccountOpenOrders := m.constructSubaccountOpenOrders(subaccountId, pendingOpenOrder)

	return m.checkSubaccountUpdates(ctx, order.GetClobPairId(), subaccountId, subaccountOpenOrders)
}

// mustAddOrderToOrderbook will add the order to the resting orderbook.
// This function will assume that all order validation has already been done.
// If `forceToFrontOfLevel` is true, places the order at the head of the level,
// otherwise places it at the tail.
func (m *MemClobPriceTimePriority) mustAddOrderToOrderbook(
	ctx sdk.Context,
	newOrder types.Order,
	forceToFrontOfLevel bool,
) {
	defer telemetry.ModuleMeasureSince(
		types.ModuleName,
		time.Now(),
		metrics.PlaceOrder,
		metrics.Memclob,
		metrics.AddedToOrderBook,
		metrics.Latency,
	)

	// Ensure that the order is not fully-filled.
	_, hasRemainingQuantums := m.GetOrderRemainingAmount(ctx, newOrder)
	if !hasRemainingQuantums {
		panic(fmt.Sprintf("mustAddOrderToOrderbook: order has no remaining amount %+v", newOrder))
	}

	m.openOrders.mustAddOrderToOrderbook(newOrder, forceToFrontOfLevel)

	if m.generateOrderbookUpdates {
		// Send an orderbook update to grpc streams.
		orderbookUpdate := m.GetOrderbookUpdatesForOrderPlacement(ctx, newOrder)
		m.clobKeeper.SendOrderbookUpdates(ctx, orderbookUpdate, false)
	}
}

// mustPerformTakerOrderMatching performs matching using the provided taker order while the order
// overlaps the other side of the orderbook. It returns multiple variables used for representing the result
// of matching with the taker order, which are documented further below. Note that this function does not modify
// memclob state.
//
// This function will assume that all order validation has already been done through the `validateNewOrder` function.
// If `order.Side` is an invalid side or `order.ClobPairId` does not reference a valid CLOB, this function will panic.
func (m *MemClobPriceTimePriority) mustPerformTakerOrderMatching(
	ctx sdk.Context,
	newTakerOrder types.MatchableOrder,
) (
	// A slice of new maker fills created from matching this taker order.
	newMakerFills []types.MakerFill,
	// A map of matched order hashes to the order.
	matchedOrderHashToOrder map[types.OrderHash]types.MatchableOrder,
	// A map of matched maker order IDs to the order.
	matchedMakerOrderIdToOrder map[types.OrderId]types.Order,
	// A list of maker orders that failed collateralization checks during matching and should be removed from the
	// orderbook.
	makerOrdersToRemove []OrderWithRemovalReason,
	// The status of the taker order, specifically the remaining size, optimistically filled size, and the result of the
	// last collateralization check.
	// This is necessary for determining whether remaining taker order size can be added to the orderbook, and for
	// returning the optimistically filled size to the caller.
	takerOrderStatus types.TakerOrderStatus,
) {
	newMakerFills, matchedOrderHashToOrder, matchedMakerOrderIdToOrder, makerOrdersToRemove = m.initializeMatchingReturnVariables()
	takerOrderStatus.OrderStatus = types.Success

	clobPairId, orderbook, takerIsBuy, takerSubaccountId, takerIsLiquidation, takerRemainingSize := m.initializeTakerOrderVariables(ctx, newTakerOrder)
	takerRemainingSizeBeforeMatching := takerRemainingSize

	var makerLevelOrder *types.LevelOrder
	var takerOrderHashWasSet bool
	var bigTotalMatchedAmount *big.Int = big.NewInt(0)

	// Begin attempting to match orders. The below loop performs the following high-level operations, in order:
	// - Find the next best maker order if it exists. If not, stop matching.
	// - Check if the orderbook is crossed. If not, stop matching.
	// - Match the orders and check collateralization. If the maker order failed collateralization, it must be removed
	//   from the book and we can return to step 1 if taker order passed collateralization. If the taker order failed
	//   collateralization, stop matching.
	// - Update local bookkeeping variables with the new match. If the taker order is fully matched, stop matching.
	for {
		var foundMakerOrder bool
		makerLevelOrder, foundMakerOrder = m.findNextMakerOrder(makerLevelOrder, orderbook, takerIsBuy)
		if !foundMakerOrder {
			break
		}
		makerOrder := makerLevelOrder.Value

		takerOrderCrossesMakerOrder := m.isOrderbookCrossed(newTakerOrder, makerOrder, takerIsBuy)
		if !takerOrderCrossesMakerOrder {
			break
		}

		makerOrderId := makerOrder.Order.OrderId
		makerSubaccountId := makerOrderId.SubaccountId

		if m.isTakerOrderReplacingMakerOrder(newTakerOrder, makerOrderId, takerIsLiquidation) {
			continue
		}

		if makerSubaccountId == takerSubaccountId {
			m.addSelfTradeToMakerOrderRemoval(
				makerOrder,
				&makerOrdersToRemove,
			)
			continue
		}

		matchedAmount, shouldSkipMakerOrder := m.calculateMatchedAmountForProcessing(
			ctx,
			newTakerOrder,
			makerOrder,
			takerRemainingSize,
			takerIsBuy,
			takerSubaccountId,
			clobPairId,
			&makerOrdersToRemove,
		)
		if shouldSkipMakerOrder {
			continue
		}

		success, takerUpdateResult, makerUpdateResult, shouldEndMatching := m.processMatch(
			ctx,
			newTakerOrder,
			makerOrder,
			matchedAmount,
			&takerOrderStatus,
		)
		if shouldEndMatching {
			break
		}

		// If the collateralization check has failed, one or both of the taker or maker orders have failed the
		// collateralization check. Note if the taker is order is liquidation order, only the maker could
		// have failed collateralization checks. Therefore, we must perform the following conditional logic:
		// - If the maker order failed collateralization checks we need to remove it from the orderbook.
		// - If the taker order is not a liquidation order and failed collateralization checks, we
		//   need to stop matching.
		// - If the taker order is a liquidation order or passed collateralization checks, then we
		//   need to continue matching by attempting to find a new overlapping maker order.
		if !success {
			shouldEndMatching := m.handleFailedCollateralization(
				makerOrder,
				makerUpdateResult,
				takerUpdateResult,
				takerIsLiquidation,
				&takerOrderStatus,
				&makerOrdersToRemove,
			)

			if shouldEndMatching {
				break
			}
			// The taker order is a liquidation or it passed collateralization checks, therefore we
			// can continue matching by attempting to find a new overlapping maker order.
			continue
		}

		// The orders have matched successfully, and the state has been updated.
		// To mark the orders as matched, perform the following actions:
		// 1. Deduct `matchedAmount` from the taker order's remaining quantums, and add the matched
		//    amount to the total matched amount for this matching loop.
		// 2. Add the maker and taker order hash to the map of order hashes.
		// 3. Add the pending fill to the ordered slice of new pending maker fills.
		// 4. If the taker order is a reduce-only order and the user's position size is now zero, cancel any remaining
		//    size of the reduce-only order, and stop matching.

		// 1.
		takerRemainingSize -= matchedAmount
		m.updateTotalMatchedAmount(newTakerOrder, bigTotalMatchedAmount, matchedAmount)
		// 2.
		m.addMakerOrdersToOrderHashesMap(
			makerOrder,
			makerOrderId,
			matchedOrderHashToOrder,
			matchedMakerOrderIdToOrder,
		)

		// Note that this if statement will only be entered once per every matching cycle. The taker order is hashed
		// inside the loop since we expect the ratio of placed to matched orders to be roughly 100:1, and therefore
		// we want to avoid hashing the taker order if it is not matched.
		if !takerOrderHashWasSet {
			m.updateTakerOrdersToOrderHashesMap(newTakerOrder, matchedOrderHashToOrder)
			takerOrderHashWasSet = true
		}

		// 3.
		m.addMakerFill(&newMakerFills, makerOrderId, matchedAmount)

		// 4.
		shouldEndMatching = m.maybeCancelRemainingReduceOnlyOrderSize(
			ctx,
			newTakerOrder,
			takerSubaccountId,
			clobPairId,
			&takerOrderStatus,
			takerRemainingSize,
		)
		if shouldEndMatching {
			break
		}

		// If the taker order was fully matched, stop matching.
		if takerRemainingSize == 0 {
			break
		}
	}

	// Update the remaining size of the taker order now that matching has ended.
	m.updateTakerOrderStatusAndSizePostMatch(
		&takerOrderStatus,
		takerRemainingSize,
		takerRemainingSizeBeforeMatching,
	)

	return newMakerFills,
		matchedOrderHashToOrder,
		matchedMakerOrderIdToOrder,
		makerOrdersToRemove,
		takerOrderStatus
}

// SetMemclobGauges sets gauges for each orderbook and the operations queue based on current memclob state.
// This is used only for observability purposes.
func (m *MemClobPriceTimePriority) SetMemclobGauges(
	ctx sdk.Context,
) {
	lib.AssertCheckTxMode(ctx)

	// Set gauges for each orderbook.
	for clobPairId, orderbook := range m.openOrders.orderbooksMap {
		m.setOrderbookGauges(clobPairId, orderbook)
	}

	// Set gauges for the operations queue.
	m.setOperationsQueueGauges()
}

// mustRemoveOrder completely removes an order from all data structures for tracking
// open orders in the memclob. If the order does not exist, this method will panic.
// NOTE: `mustRemoveOrder` does _not_ remove cancels.
func (m *MemClobPriceTimePriority) mustRemoveOrder(
	ctx sdk.Context,
	orderId types.OrderId,
) {
	defer telemetry.ModuleMeasureSince(
		types.ModuleName,
		time.Now(),
		metrics.Memclob,
		metrics.RemovedFromOrderBook,
		metrics.Latency,
	)

	levelOrder := m.verifyOrderExists(orderId)
	m.openOrders.mustRemoveOrder(levelOrder)

	m.removeShortTermOrderFromHashToBytesMappingIfNecessary(levelOrder)

	if m.generateOrderbookUpdates {
		m.sendOrderbookUpdate(ctx, levelOrder.Value.Order)
	}
}

func (m *MemClobPriceTimePriority) verifyOrderExists(orderId types.OrderId) *types.LevelOrder {
	levelOrder, exists := m.openOrders.orderIdToLevelOrder[orderId]
	if !exists {
		panic(fmt.Sprintf("mustRemoveOrder: order does not exist %v", orderId))
	}
	return levelOrder
}

func (m *MemClobPriceTimePriority) removeShortTermOrderFromHashToBytesMappingIfNecessary(levelOrder *types.LevelOrder) {
	order := levelOrder.Value.Order
	if !m.isOrderShortTermAndNoOrderPlacementInOpQueue(order) {
		return
	}
	m.operationsToPropose.RemoveShortTermOrderTxBytes(order)
}

func (m *MemClobPriceTimePriority) sendOrderbookUpdate(ctx sdk.Context, order types.Order) {
	orderbookUpdate := m.GetOrderbookUpdatesForOrderRemoval(ctx, order.OrderId)
	m.clobKeeper.SendOrderbookUpdates(ctx, orderbookUpdate, false)
}

// mustUpdateOrderbookStateWithMatchedMakerOrder updates the orderbook with a matched maker order.
// If the maker order is fully filled, it removes it from the orderbook.
func (m *MemClobPriceTimePriority) mustUpdateOrderbookStateWithMatchedMakerOrder(
	ctx sdk.Context,
	makerOrder types.Order,
) *types.OffchainUpdates {
	offchainUpdates := types.NewOffchainUpdates()
	makerOrderBaseQuantums := makerOrder.GetBaseQuantums()
	newTotalFilledAmount := m.GetOrderFilledAmount(ctx, makerOrder.OrderId)

	// If the filled amount of the maker order is greater than the order size, panic to avoid silent failure.
	if newTotalFilledAmount > makerOrderBaseQuantums {
		panic("Total filled size of maker order greater than the order size")
	}

	m.maybeSendOrderbookUpdate(ctx, makerOrder)

	// Note we shouldn't remove Short-Term order hashes from `ShortTermOrderTxBytes` here since
	// the order was matched.
	m.removeOrderIfFullyFilled(ctx, makerOrder, newTotalFilledAmount, makerOrderBaseQuantums)

	m.maybeAddOffchainUpdateMessage(ctx, makerOrder, newTotalFilledAmount, offchainUpdates)

	return offchainUpdates
}

// updateResultToOrderStatus translates the result of a collateralization check into a resulting order status.
func updateResultToOrderStatus(updateResult satypes.UpdateResult) types.OrderStatus {
	if updateResult.IsSuccess() {
		return types.Success
	}

	switch updateResult {
	case satypes.UpdateCausedError:
		return types.InternalError
	case satypes.ViolatesCollateralPoolConstraints:
		return types.ViolatesCollateralPoolConstraints
	case satypes.ViolatesMultiCollateralConstraints:
		return types.ViolatesMultiCollateralConstraints
	default:
		return types.Undercollateralized
	}
}

// GetOrderRemainingAmount returns the remaining amount of an order (its size minus its filled amount).
// It also returns a boolean indicating whether the remaining amount is positive (true) or not (false).
func (m *MemClobPriceTimePriority) GetOrderRemainingAmount(
	ctx sdk.Context,
	order types.Order,
) (
	remainingAmount satypes.BaseQuantums,
	hasRemainingAmount bool,
) {
	totalFillAmount := m.GetOrderFilledAmount(ctx, order.OrderId)

	// Case: order is completely filled.
	if totalFillAmount >= order.GetBaseQuantums() {
		return 0, false
	}

	return order.GetBaseQuantums() - totalFillAmount, true
}

// RemoveOrderIfFilled removes an order from the orderbook if it currently fully filled in state.
func (m *MemClobPriceTimePriority) RemoveOrderIfFilled(
	ctx sdk.Context,
	orderId types.OrderId,
) {
	// Get LevelOrder.
	levelOrder, levelExists := m.openOrders.orderIdToLevelOrder[orderId]

	// If order is not on the book, return early.
	if !levelExists {
		return
	}

	// Get current fill amount for this order.
	exists, orderStateFillAmount, _ := m.clobKeeper.GetOrderFillAmount(ctx, orderId)

	// If there is no fill amount for this order, return early. Note this is only valid if the
	// order is a stateful order that was fully-filled or partially-filled and expired / canceled /
	// removed in the last block. This is because Short-Term orders have their fill amounts
	// stored past expiration, so the fill amount should exist in state immediately after being filled.
	if !exists {
		if orderId.IsShortTermOrder() {
			log.ErrorLog(
				ctx,
				"RemoveOrderIfFilled: filled Short-Term order ID has no fill amount",
				log.OrderId, orderId,
			)
		}
		return
	}

	// Case: order is now completely filled and can be removed.
	order := levelOrder.Value.Order
	if orderStateFillAmount >= order.GetBaseQuantums() {
		m.mustRemoveOrder(ctx, order.OrderId)
	}
}

// maybeCancelReduceOnlyOrders cancels all open reduce-only orders on the CLOB pair if the new fill would change the
// position side of the subaccount.
func (m *MemClobPriceTimePriority) maybeCancelReduceOnlyOrders(
	ctx sdk.Context,
	subaccountId satypes.SubaccountId,
	clobPairId types.ClobPairId,
	totalBigMatchedQuantums *big.Int,
) (offchainUpdates *types.OffchainUpdates) {
	offchainUpdates = types.NewOffchainUpdates()
	// Get the new position size after matching.
	newPositionSize := m.clobKeeper.GetStatePosition(ctx, subaccountId, clobPairId)

	// Subtract the new match amount from the current position size. This should give us the position size before
	// matching occurred.
	previousPositionSize := new(big.Int).Sub(newPositionSize, totalBigMatchedQuantums)

	// If the subaccount's position size has changed sign, remove all open reduce-only orders.
	if newPositionSize.Sign() != previousPositionSize.Sign() {
		orderbook := m.openOrders.orderbooksMap[clobPairId]

		if openReduceOnlyOrders, exists := orderbook.SubaccountOpenReduceOnlyOrders[subaccountId]; exists {
			// Copy the list of open reduce-only orders.
			openReduceOnlyOrdersCopy := make([]types.OrderId, 0, len(openReduceOnlyOrders))
			for orderId := range openReduceOnlyOrders {
				openReduceOnlyOrdersCopy = append(openReduceOnlyOrdersCopy, orderId)
			}

			// Sort open reduce-only orders by ClientId so that order removal is deterministic. ClientId
			// can be used here since all orders are from the same subaccount, and there should be no
			// duplicates. Determinism is necessary as these removals are part of `DeliverTx`
			// which updates state.
			types.MustSortAndHaveNoDuplicates(openReduceOnlyOrdersCopy)

			// Remove each open reduce-only order from the memclob.
			for _, orderId := range openReduceOnlyOrdersCopy {
				// TODO(DEC-847): Update logic to properly remove stateful orders.
				m.mustRemoveOrder(ctx, orderId)
				if orderId.IsStatefulOrder() && !m.operationsToPropose.IsOrderRemovalInOperationsQueue(orderId) {
					m.operationsToPropose.MustAddOrderRemovalToOperationsQueue(
						orderId,
						types.OrderRemoval_REMOVAL_REASON_INVALID_REDUCE_ONLY,
					)
				}
				if m.generateOffchainUpdates {
					if message, success := off_chain_updates.CreateOrderRemoveMessageWithReason(
						ctx,
						orderId,
						indexersharedtypes.OrderRemovalReason_ORDER_REMOVAL_REASON_REDUCE_ONLY_RESIZE,
						ocutypes.OrderRemoveV1_ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED,
					); success {
						offchainUpdates.AddRemoveMessage(orderId, message)
					}
				}
			}
		}
	}

	return offchainUpdates
}

// GetMidPrice returns the mid price of the orderbook for the given clob pair
// and whether or not it exists.
// This function also returns the best bid and best ask orders, if they exist.
func (m *MemClobPriceTimePriority) GetMidPrice(
	ctx sdk.Context,
	clobPairId types.ClobPairId,
) (
	midPrice types.Subticks,
	bestBid types.Order,
	bestAsk types.Order,
	exists bool,
) {
	orderbook := m.openOrders.orderbooksMap[clobPairId]
	midPrice, exists = orderbook.GetMidPrice()
	if !exists {
		telemetry.IncrCounterWithLabels(
			[]string{types.ModuleName, metrics.MissingMidPrice, metrics.Count},
			1,
			[]gometrics.Label{
				metrics.GetLabelForIntValue(
					metrics.ClobPairId,
					int(clobPairId.ToUint32()),
				),
			},
		)
	}

	if levelOrder, found := m.openOrders.getBestOrderOnSide(orderbook, true); found {
		bestBid = levelOrder.Value.Order
	}
	if levelOrder, found := m.openOrders.getBestOrderOnSide(orderbook, false); found {
		bestAsk = levelOrder.Value.Order
	}
	return midPrice, bestBid, bestAsk, exists
}

// getImpactPriceSubticks returns the impact ask or bid price (in subticks), given the clob pair
// and orderbook. The bid (or ask) impact price is the average price a trader
// would receive if they sold (or bought) from the order book using `impactNotionalAmount`.
// Returns `hasEnoughLiquidity = false` if the orderbook doesn't have
// enough orders on the side to absorb the impact notional amount.
func (m *MemClobPriceTimePriority) getImpactPriceSubticks(
	ctx sdk.Context,
	clobPair types.ClobPair,
	orderbook *types.Orderbook,
	isBid bool,
	impactNotionalQuoteQuantums *big.Int,
) (
	impactPriceSubticks *big.Rat,
	hasEnoughLiquidity bool,
) {
	remainingImpactQuoteQuantums := new(big.Int).Set(impactNotionalQuoteQuantums)
	accumulatedBaseQuantums := new(big.Rat).SetInt64(0)

	makerLevelOrder, foundMakerOrder := m.openOrders.getBestOrderOnSide(orderbook, isBid)
	if impactNotionalQuoteQuantums.Sign() == 0 && foundMakerOrder {
		// Impact notional is zero, returns the price of the best order as impact price.
		return makerLevelOrder.Value.Order.GetOrderSubticks().ToBigRat(), true
	}

	for remainingImpactQuoteQuantums.Sign() > 0 && foundMakerOrder {
		makerOrder := makerLevelOrder.Value.Order
		makerRemainingSize, makerHasRemainingSize := m.GetOrderRemainingAmount(ctx, makerOrder)
		if !makerHasRemainingSize {
			panic(fmt.Sprintf("getImpactPriceSubticks: maker order has no remaining amount (%+v)", makerOrder))
		}

		quoteQuantumsIfFullyMatched := types.FillAmountToQuoteQuantums(
			makerOrder.GetOrderSubticks(),
			makerRemainingSize,
			clobPair.QuantumConversionExponent,
		)

		if remainingImpactQuoteQuantums.Cmp(quoteQuantumsIfFullyMatched) > 0 {
			accumulatedBaseQuantums.Add(
				accumulatedBaseQuantums,
				new(big.Rat).SetUint64(makerRemainingSize.ToUint64()),
			)
		} else {
			lastFillFraction := new(big.Rat).SetFrac(
				remainingImpactQuoteQuantums,
				quoteQuantumsIfFullyMatched,
			)

			fractionalBaseQuantums := lastFillFraction.Mul(
				lastFillFraction,
				new(big.Rat).SetInt(makerRemainingSize.ToBigInt()),
			)

			accumulatedBaseQuantums.Add(
				accumulatedBaseQuantums,
				fractionalBaseQuantums,
			)
		}
		remainingImpactQuoteQuantums.Sub(
			remainingImpactQuoteQuantums,
			quoteQuantumsIfFullyMatched,
		)

		// The previous maker order must have been fully matched by the impact order (which has nonzero remaining
		// size), and we need to find the next best maker order.
		makerLevelOrder, foundMakerOrder = m.openOrders.findNextBestLevelOrder(makerLevelOrder)
	}

	if remainingImpactQuoteQuantums.Sign() > 0 {
		// Impact order was not fully matched, caused by insufficient liquidity.
		return nil, false
	}

	// Impact order was fully matched. Calculate average impact price.
	return types.GetAveragePriceSubticks(
		impactNotionalQuoteQuantums,
		new(big.Int).Div(
			accumulatedBaseQuantums.Num(),
			accumulatedBaseQuantums.Denom(),
		),
		clobPair.QuantumConversionExponent,
	), true
}

// GetPricePremium calculates the premium for a perpetual market, using the equation
// `P = (Max(0, Impact Bid - daemon price) - Max(0, daemon price - Impact Ask)) / daemon price`.
// This is equivalent to the following piece-wise function:
//
//		If Index < Impact Bid:
//	 		P = Impact Bid / Index - 1
//		If Impact Bid ≤ Index ≤ Impact Ask:
//			P = 0
//		If Impact Ask < Index:
//			P = Impact Ask / Index - 1
//
// `Impact Bid/Ask Price` is the average price at which the impact bid/ask order
// (with size of `ImpactNotionalQuoteQuantums`) is filled. If `ImpactNotionalQuoteQuantums`
// is zero, the `Best Bid/Ask Price` is used as `Impact Price`.
// Note that this implies that if there's not enough liquidity for both ask and bid,
// 0 premium is returned since Impact Bid = `0` and Impact Ask = `infinity`.
func (m *MemClobPriceTimePriority) GetPricePremium(
	ctx sdk.Context,
	clobPair types.ClobPair,
	params perptypes.GetPricePremiumParams,
) (
	premiumPpm int32,
	err error,
) {
	// Convert premium vote clamp to int32 (panics if underflows or overflows).
	maxPremiumPpm := lib.MustConvertBigIntToInt32(params.MaxAbsPremiumVotePpm)
	minPremiumPpm := -maxPremiumPpm

	// Check the `ClobPair` is a perpetual.
	if clobPair.GetPerpetualClobMetadata() == nil {
		return 0, errorsmod.Wrapf(
			types.ErrPremiumWithNonPerpetualClobPair,
			"ClobPair ID: %d",
			clobPair.Id,
		)
	}
	orderbook := m.openOrders.mustGetOrderbook(clobPair.GetClobPairId())

	// Get daemon price represented in subticks.
	daemonPriceSubticks := types.SpotPriceToSubticks(
		params.DaemonPrice,
		clobPair,
		params.BaseAtomicResolution,
		params.QuoteAtomicResolution,
	)

	// Check `daemonPriceSubticks` is non-zero.
	if daemonPriceSubticks.Sign() == 0 {
		return 0, errorsmod.Wrapf(
			types.ErrZeroDaemonPriceForPremiumCalculation,
			"market = %+v, clobPair = %+v, baseAtomicResolution = %d, quoteAtomicResolution = %d",
			params,
			clobPair,
			params.BaseAtomicResolution,
			params.QuoteAtomicResolution,
		)
	}

	bestBid, hasBid := m.openOrders.getBestOrderOnSide(
		orderbook,
		true, // isBuy
	)
	bestAsk, hasAsk := m.openOrders.getBestOrderOnSide(
		orderbook,
		false, // isBuy
	)

	if !hasBid && !hasAsk {
		// Orderbook is empty.
		return 0, nil
	}

	if hasBid && hasAsk && bestBid.Value.Order.Subticks >= bestAsk.Value.Order.Subticks {
		panic(fmt.Sprintf(
			"GetPricePremium: crossing orderbook. ClobPairId = (%+v), bestBid = (%+v), bestAsk = (%+v)",
			clobPair.Id,
			bestBid.Value.Order,
			bestAsk.Value.Order,
		))
	}

	if hasBid && daemonPriceSubticks.Cmp(
		new(big.Rat).SetInt(bestBid.Value.Order.GetOrderSubticks().ToBigInt()),
	) < 0 {
		// Index < Best Bid, need to calculate Impact Bid
		return m.getPricePremiumFromSide(
			ctx,
			clobPair,
			orderbook,
			true, // isBid
			params.ImpactNotionalQuoteQuantums,
			daemonPriceSubticks,
			minPremiumPpm,
			maxPremiumPpm,
		), nil
	} else if hasAsk && daemonPriceSubticks.Cmp(
		new(big.Rat).SetInt(bestAsk.Value.Order.GetOrderSubticks().ToBigInt()),
	) > 0 {
		// Best Ask < Index, need to calculate Impact Ask
		return m.getPricePremiumFromSide(
			ctx,
			clobPair,
			orderbook,
			false, // isBid
			params.ImpactNotionalQuoteQuantums,
			daemonPriceSubticks,
			minPremiumPpm,
			maxPremiumPpm,
		), nil
	}

	// Impact Bid <= Best Bid <= Index <= Best Ask <= Impact Ask
	return 0, nil
}

// getPricePremiumFromSide returns the price premium given
// which side (bid/ask) the daemon price is on.
// `isBid == true` means Index < Best Bid; `isBid == false` means
// Index > Best Ask.
//
// The computed premium is non-zero if and only if one of the two
// cases below is true:
//
// Case 1: `isBid == true` and Impact Bid < Impact Ask < Index:
//
//	P = Impact Ask / Index - 1
//
// Case 2: `isBid == false` and Index < Impact Bid < Impact Ask:
//
//	P = Impact Bid / Index - 1
//
// Computed result is rounded towards zero.
func (m *MemClobPriceTimePriority) getPricePremiumFromSide(
	ctx sdk.Context,
	clobPair types.ClobPair,
	orderbook *types.Orderbook,
	isBid bool,
	impactNotionalQuoteQuantums *big.Int,
	daemonPriceSubticks *big.Rat,
	minPremiumPpm int32,
	maxPremiumPpm int32,
) (
	premiumPpm int32,
) {
	impactPriceSubticks, hasEnoughLiquidity := m.getImpactPriceSubticks(
		ctx,
		clobPair,
		orderbook,
		isBid,
		impactNotionalQuoteQuantums,
	)

	if !hasEnoughLiquidity {
		// Impact Ask (Bid) is infinity (Zero), return 0 premium by definition.
		return 0
	}

	cmp := daemonPriceSubticks.Cmp(impactPriceSubticks)
	if (!isBid && cmp <= 0) || (isBid && cmp >= 0) {
		// Best Ask < Index <= Impact Ask
		// or
		// Impact Bid <= Index < Best Bid
		return 0
	}

	// Calculate either of the following (in parts-per-million):
	//  Impact Ask / Index - 1
	// or
	//  Impact Bid / Index - 1
	result := new(big.Rat)
	result.Set(impactPriceSubticks).Mul(
		result, lib.BigRatOneMillion(),
	).Quo(
		result,
		daemonPriceSubticks,
	).Sub(
		result,
		lib.BigRatOneMillion(),
	)

	// Round result towards zero.
	var resultRounded *big.Int
	if result.Sign() > 0 {
		resultRounded = lib.BigRatRound(result, false)
	} else {
		resultRounded = lib.BigRatRound(result, true)
	}

	return lib.BigInt32Clamp(
		resultRounded,
		minPremiumPpm,
		maxPremiumPpm,
	)
}

// resizeReduceOnlyMatchIfNecessary resizes a reduce-only match if it would change or increase
// the position side of the subaccount, and returns the resized match.
func (m *MemClobPriceTimePriority) resizeReduceOnlyMatchIfNecessary(
	currentPositionSize *big.Int,
	newlyMatchedAmount satypes.BaseQuantums,
	isBuy bool,
) satypes.BaseQuantums {
	// Get the signed size of the new match.
	newMatchSize := newlyMatchedAmount.ToBigInt()
	if !isBuy {
		newMatchSize.Neg(newMatchSize)
	}

	// If the match is not on the opposite side of the position, then the match is invalid.
	// Note that this can occur for reduce-only maker orders if the maker subaccount's position side
	// changes during the matching loop, and this should never happen for taker orders.
	if currentPositionSize.Sign()*newMatchSize.Sign() != -1 {
		return satypes.BaseQuantums(0)
	}

	// The match is on the opposite side of the position. Return the minimum of the match size and
	// position size to ensure the new match does not change the subaccount's position side.
	absPositionSize := new(big.Int).Abs(currentPositionSize)
	absNewMatchSize := new(big.Int).Abs(newMatchSize)
	maxMatchSize := lib.BigMin(absPositionSize, absNewMatchSize)
	return satypes.BaseQuantums(maxMatchSize.Uint64())
}

func (m *MemClobPriceTimePriority) doesValidCancelOrderAlreadyExist(
	ctx sdk.Context,
	orderId types.OrderId,
	goodTilBlock uint32,
) (validAndExists bool, cancelExists bool) {
	oldCancellationGoodTilBlock, cancelExists := m.GetCancelOrder(ctx, orderId)
	// valid if existing short-term cancel has the same or greater `goodTilBlock`
	if cancelExists && oldCancellationGoodTilBlock >= goodTilBlock {
		return true, true
	}
	return false, cancelExists
}

func (m *MemClobPriceTimePriority) processCancelOrder(
	ctx sdk.Context,
	orderId types.OrderId,
	goodTilBlock uint32,
	doesOutofDateCancelExist bool,
) {
	// If there exists a resting order on the book with a `GoodTilBlock` not-greater-than that of
	// the short-term cancel, remove the order and add the order cancellation to the operations queue if necessary.
	if levelOrder, orderExists := m.openOrders.orderIdToLevelOrder[orderId]; orderExists &&
		goodTilBlock >= levelOrder.Value.Order.GetGoodTilBlock() {
		m.mustRemoveOrder(ctx, orderId)

		telemetry.IncrCounter(1, types.ModuleName, metrics.CancelShortTermOrder, metrics.RemovedFromOrderBook)
	}

	// Remove the out of date existing cancel, if any.
	if doesOutofDateCancelExist {
		m.cancels.remove(orderId)
	}

	// Add the new order cancelation.
	m.cancels.addShortTermCancel(orderId, goodTilBlock)
}

func (m *MemClobPriceTimePriority) getCancelOrderOffchainUpdates(
	ctx sdk.Context,
	orderId types.OrderId,
) *types.OffchainUpdates {
	offchainUpdates := types.NewOffchainUpdates()
	if m.generateOffchainUpdates {
		m.addOrderRemovalMessageWithReasonToOffchainUpdates(
			ctx,
			orderId,
			indexersharedtypes.OrderRemovalReason_ORDER_REMOVAL_REASON_USER_CANCELED,
			ocutypes.OrderRemoveV1_ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED,
			offchainUpdates,
		)
	}
	return offchainUpdates
}

func (m *MemClobPriceTimePriority) getClobPairMetadataForOrderbook(
	clobPair types.ClobPair,
) (
	clobPairId types.ClobPairId,
	subticksPerTick types.SubticksPerTick,
	minOrderBaseQuantums satypes.BaseQuantums,
) {
	clobPairId = clobPair.GetClobPairId()
	subticksPerTick = clobPair.GetClobPairSubticksPerTick()
	minOrderBaseQuantums = clobPair.GetClobPairMinOrderBaseQuantums()
	return
}

func getShortTermOrderCountInOrderbook(
	orderbook *types.Orderbook,
	subaccountId satypes.SubaccountId,
) (count uint32) {
	subaccountOrders, exists := orderbook.SubaccountOpenClobOrders[subaccountId]
	if !exists {
		return 0
	}

	for _, ordersBySide := range subaccountOrders {
		count += getShortTermOrderCount(ordersBySide)
	}

	return count
}

func getShortTermOrderCount(orders map[types.OrderId]bool) (count uint32) {
	for orderId := range orders {
		if orderId.IsShortTermOrder() {
			count++
		}
	}
	return count
}

func (m *MemClobPriceTimePriority) ensureOrderbookNotCrossed(
	order types.Order,
) {
	orderbook := m.openOrders.mustGetOrderbook(order.GetClobPairId())
	bestAsk, hasAsk, bestBid, hasBid := m.getBestOrdersOnBothSidesOfOrderbook(orderbook)

	if m.generalIsOrderbookCrossed(bestAsk, hasAsk, bestBid, hasBid) {
		panic(
			fmt.Sprintf(
				"PlaceOrder: orderbook ID %v is crossed. Best bid: (%+v), best ask: (%+v), placed order: (%+v)",
				order.GetClobPairId(),
				bestBid.Value.Order,
				bestAsk.Value.Order,
				order,
			),
		)
	}
}

func (m *MemClobPriceTimePriority) getBestOrdersOnBothSidesOfOrderbook(
	orderbook *types.Orderbook,
) (
	bestAsk *list.Node[types.ClobOrder],
	hasAsk bool,
	bestBid *list.Node[types.ClobOrder],
	hasBid bool,
) {
	bestBid, hasBid = m.openOrders.getBestOrderOnSide(
		orderbook,
		true,
	)
	bestAsk, hasAsk = m.openOrders.getBestOrderOnSide(
		orderbook,
		false,
	)

	return
}

func (m *MemClobPriceTimePriority) handleOrderMatchingError(
	ctx sdk.Context,
	order types.Order,
	takerOrderStatus types.TakerOrderStatus,
	offchainUpdates *types.OffchainUpdates,
	err error,
) {
	if order.IsStatefulOrder() {
		removalReason := m.determineRemovalReason(err, order)
		m.handleStatefulOrderRemoval(order, removalReason)
	}

	m.maybeHandleOffchainOrderRemovalUpdate(
		ctx,
		order,
		takerOrderStatus.OrderStatus,
		err,
		offchainUpdates,
		ocutypes.OrderRemoveV1_ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED,
	)
}

func (m *MemClobPriceTimePriority) maybeHandleOffchainOrderRemovalUpdate(
	ctx sdk.Context,
	order types.Order,
	orderStatus types.OrderStatus,
	err error,
	offchainUpdates *types.OffchainUpdates,
	orderRemovalReason ocutypes.OrderRemoveV1_OrderRemovalStatus,
) {
	if !m.generateOffchainUpdates {
		return
	}
	message, success := off_chain_updates.CreateOrderRemoveMessage(
		ctx,
		order.OrderId,
		orderStatus,
		err,
		orderRemovalReason,
	)

	if success {
		offchainUpdates.AddRemoveMessage(order.OrderId, message)
	}
}

func (m *MemClobPriceTimePriority) processOrderPostMatchAttempt(
	ctx sdk.Context,
	order types.Order,
	takerOrderStatus types.TakerOrderStatus,
	offchainUpdates *types.OffchainUpdates,
) (
	orderSizeOptimisticallyFilledFromMatchingQuantums satypes.BaseQuantums,
	orderStatus types.OrderStatus,
	offchainUpdatesResult *types.OffchainUpdates,
	err error,
) {
	remainingSize := takerOrderStatus.RemainingQuantums
	orderSizeOptimisticallyFilledFromMatchingQuantums = takerOrderStatus.OrderOptimisticallyFilledQuantums

	// matching fails due to undercollateralization
	if !takerOrderStatus.OrderStatus.IsSuccess() {
		m.handleOrderRemovalAfterFailedMatched(ctx, order, takerOrderStatus, offchainUpdates)
		return orderSizeOptimisticallyFilledFromMatchingQuantums, takerOrderStatus.OrderStatus, offchainUpdates, nil
	}

	// fully matched success
	if remainingSize == 0 {
		m.maybeHandleUpdatedOrderSizeOffChainUpdate(ctx, order, offchainUpdates, order.GetBaseQuantums())
		return orderSizeOptimisticallyFilledFromMatchingQuantums, takerOrderStatus.OrderStatus, offchainUpdates, nil
	}

	// partially matched success and IOC order
	if m.isIOCOrder(order) {
		orderStatus := types.ImmediateOrCancelWouldRestOnBook
		m.cancelIOCOrderWithRemainingSizeAfterMatch(
			ctx,
			order,
			orderStatus,
			offchainUpdates,
		)

		return orderSizeOptimisticallyFilledFromMatchingQuantums, orderStatus, offchainUpdates, nil
	}

	return m.addRemainingSizeAsMakerOrderOnBook(
		ctx,
		order,
		remainingSize,
		orderSizeOptimisticallyFilledFromMatchingQuantums,
		offchainUpdates,
	)
}

func (m *MemClobPriceTimePriority) addRemainingSizeAsMakerOrderOnBook(
	ctx sdk.Context,
	order types.Order,
	remainingSize satypes.BaseQuantums,
	orderSizeOptimisticallyFilledFromMatchingQuantums satypes.BaseQuantums,
	offchainUpdates *types.OffchainUpdates,
) (
	satypes.BaseQuantums,
	types.OrderStatus,
	*types.OffchainUpdates,
	error,
) {
	addOrderOrderStatus := m.addOrderToOrderbookSubaccountUpdatesCheck(
		ctx,
		order,
	)

	if !addOrderOrderStatus.IsSuccess() {
		// remove the original order since remainder can't be added to the orderbook
		m.removeOrderAfterPostMatchSubaccountChecksFail(
			ctx,
			order,
			addOrderOrderStatus,
			offchainUpdates,
		)

		return orderSizeOptimisticallyFilledFromMatchingQuantums, addOrderOrderStatus, offchainUpdates, nil
	}

	if m.isOrderShortTermAndNoOrderPlacementInOpQueue(order) {
		// add the order to the operations queue
		m.operationsToPropose.MustAddShortTermOrderTxBytes(
			order,
			ctx.TxBytes(),
		)
	}

	// Add the order to the orderbook and all other bookkeeping data structures.
	m.mustAddOrderToOrderbook(ctx, order, false)

	// update the size of the order offchain
	m.maybeHandleUpdatedOrderSizeOffChainUpdate(
		ctx,
		order,
		offchainUpdates,
		order.GetBaseQuantums()-remainingSize, // filled size
	)

	telemetry.IncrCounterWithLabels(
		[]string{types.ModuleName, metrics.PlaceOrder, metrics.AddedToOrderBook},
		1,
		order.GetOrderLabels(),
	)

	return orderSizeOptimisticallyFilledFromMatchingQuantums, types.Success, offchainUpdates, nil
}

func (m *MemClobPriceTimePriority) isOrderShortTermAndNoOrderPlacementInOpQueue(
	order types.Order,
) bool {
	return order.IsShortTermOrder() && !m.operationsToPropose.IsOrderPlacementInOperationsQueue(order)
}

func (m *MemClobPriceTimePriority) removeOrderAfterPostMatchSubaccountChecksFail(
	ctx sdk.Context,
	order types.Order,
	orderStatus types.OrderStatus,
	offchainUpdates *types.OffchainUpdates,
) {
	m.maybeHandleOffchainOrderRemovalUpdate(
		ctx,
		order,
		orderStatus,
		nil,
		offchainUpdates,
		ocutypes.OrderRemoveV1_ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED,
	)

	if !m.isOrderStatefulAndNoOrderRemovalInOpQueue(order) {
		return
	}

	m.operationsToPropose.MustAddOrderRemovalToOperationsQueue(
		order.OrderId,
		types.OrderRemoval_REMOVAL_REASON_UNDERCOLLATERALIZED,
	)
}

func (m *MemClobPriceTimePriority) cancelIOCOrderWithRemainingSizeAfterMatch(
	ctx sdk.Context,
	order types.Order,
	orderStatus types.OrderStatus,
	offchainUpdates *types.OffchainUpdates,
) {
	m.maybeHandleOffchainOrderRemovalUpdate(
		ctx,
		order,
		orderStatus,
		nil,
		offchainUpdates,
		ocutypes.OrderRemoveV1_ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED,
	)

	if !m.isOrderStatefulAndNoOrderRemovalInOpQueue(order) {
		return
	}

	m.operationsToPropose.MustAddOrderRemovalToOperationsQueue(
		order.OrderId,
		types.OrderRemoval_REMOVAL_REASON_CONDITIONAL_IOC_WOULD_REST_ON_BOOK,
	)
}

func (m *MemClobPriceTimePriority) isOrderStatefulAndNoOrderRemovalInOpQueue(
	order types.Order,
) bool {
	return order.IsStatefulOrder() && !m.operationsToPropose.IsOrderRemovalInOperationsQueue(order.OrderId)
}

func (m *MemClobPriceTimePriority) isIOCOrder(order types.Order) bool {
	return order.GetTimeInForce() == types.Order_TIME_IN_FORCE_IOC
}

func (m *MemClobPriceTimePriority) maybeHandleUpdatedOrderSizeOffChainUpdate(
	ctx sdk.Context,
	order types.Order,
	offchainUpdates *types.OffchainUpdates,
	totalFilled satypes.BaseQuantums,
) {
	if !m.generateOffchainUpdates {
		return
	}

	message, success := off_chain_updates.CreateOrderUpdateMessage(
		ctx,
		order.OrderId,
		totalFilled,
	)

	if success {
		offchainUpdates.AddUpdateMessage(order.OrderId, message)
	}
}

func (m *MemClobPriceTimePriority) handleOrderRemovalAfterFailedMatched(
	ctx sdk.Context,
	order types.Order,
	takerOrderStatus types.TakerOrderStatus,
	offchainUpdates *types.OffchainUpdates,
) {
	m.maybeHandleOffchainOrderRemovalUpdate(
		ctx,
		order,
		takerOrderStatus.OrderStatus,
		nil,
		offchainUpdates,
		ocutypes.OrderRemoveV1_ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED,
	)

	if !m.isTakerOrderStatefulAndUndercollateralized(order, takerOrderStatus) {
		return
	}

	m.handleStatefulOrderRemoval(
		order,
		types.OrderRemoval_REMOVAL_REASON_UNDERCOLLATERALIZED,
	)
}

func (m *MemClobPriceTimePriority) isTakerOrderStatefulAndUndercollateralized(
	order types.Order,
	takerOrderStatus types.TakerOrderStatus,
) bool {
	return takerOrderStatus.OrderStatus == types.Undercollateralized && order.IsStatefulOrder()
}

func (m *MemClobPriceTimePriority) handleStatefulOrderRemoval(
	order types.Order,
	removalReason types.OrderRemoval_RemovalReason,
) {
	if m.operationsToPropose.IsOrderRemovalInOperationsQueue(order.OrderId) {
		return
	}

	m.operationsToPropose.MustAddOrderRemovalToOperationsQueue(
		order.OrderId,
		removalReason,
	)
}

func (m *MemClobPriceTimePriority) determineRemovalReason(
	err error,
	order types.Order,
) types.OrderRemoval_RemovalReason {
	switch {
	case errors.Is(err, types.ErrFokOrderCouldNotBeFullyFilled):
		if !order.IsConditionalOrder() {
			panic(fmt.Sprintf("PlaceOrder: stateful FOK order must be conditional. Order %+v", order))
		}
		return types.OrderRemoval_REMOVAL_REASON_CONDITIONAL_FOK_COULD_NOT_BE_FULLY_FILLED
	case errors.Is(err, types.ErrPostOnlyWouldCrossMakerOrder):
		return types.OrderRemoval_REMOVAL_REASON_POST_ONLY_WOULD_CROSS_MAKER_ORDER
	case errors.Is(err, types.ErrWouldViolateCollateralPoolConstraints):
		return types.OrderRemoval_REMOVAL_REASON_VIOLATES_COLLATERAL_POOL_CONSTRAINTS
	default:
		return types.OrderRemoval_REMOVAL_REASON_UNSPECIFIED
	}
}

func (m *MemClobPriceTimePriority) generalIsOrderbookCrossed(
	bestAsk *list.Node[types.ClobOrder],
	hasAsk bool,
	bestBid *list.Node[types.ClobOrder],
	hasBid bool,
) bool {
	return hasBid && hasAsk && bestBid.Value.Order.Subticks >= bestAsk.Value.Order.Subticks
}

func (m *MemClobPriceTimePriority) handlePlaceOrderAndMaybeReplacementOffchainUpdates(
	ctx sdk.Context,
	order types.Order,
	offchainUpdates *types.OffchainUpdates,
) {
	if !m.generateOffchainUpdates {
		return
	}

	m.maybeHandleOffchainUpdatesForReplacementOrder(ctx, order, offchainUpdates)
	m.addPlaceOrderMsgToOffchainUpdates(ctx, order, offchainUpdates)
}

func (m *MemClobPriceTimePriority) maybeHandleOffchainUpdatesForReplacementOrder(
	ctx sdk.Context,
	order types.Order,
	offchainUpdates *types.OffchainUpdates,
) {
	orderId := order.OrderId
	_, found := m.openOrders.getOrder(orderId)

	if !found {
		return
	}

	m.addOrderRemovalMessageWithReasonToOffchainUpdates(
		ctx,
		orderId,
		indexersharedtypes.OrderRemovalReason_ORDER_REMOVAL_REASON_REPLACED,
		ocutypes.OrderRemoveV1_ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED,
		offchainUpdates,
	)
}

func (m *MemClobPriceTimePriority) addPlaceOrderMsgToOffchainUpdates(
	ctx sdk.Context,
	order types.Order,
	offchainUpdates *types.OffchainUpdates,
) {
	message, success := off_chain_updates.CreateOrderPlaceMessage(
		ctx,
		order,
	)

	if success {
		offchainUpdates.AddPlaceMessage(order.OrderId, message)
	}
}
func (m *MemClobPriceTimePriority) determineMatchingError(
	order types.MatchableOrder,
	takerOrderStatus types.TakerOrderStatus,
	newMakerFills []types.MakerFill,
) error {
	if m.isFOKAndNotFullyFilled(order, takerOrderStatus) {
		return types.ErrFokOrderCouldNotBeFullyFilled
	}

	if m.isPostOnlyAndNotRewind(order, newMakerFills) {
		return types.ErrPostOnlyWouldCrossMakerOrder
	}

	if m.doesMatchingViolateSubaccountConstraints(order, takerOrderStatus) {
		return types.ErrWouldViolateCollateralPoolConstraints
	}

	return nil
}

func (m *MemClobPriceTimePriority) updateMemclobStateWithMatches(
	ctx sdk.Context,
	order types.MatchableOrder,
	newMakerFills []types.MakerFill,
	matchedOrderHashToOrder map[types.OrderHash]types.MatchableOrder,
	matchedMakerOrderIdToOrder map[types.OrderId]types.Order,
	offchainUpdates *types.OffchainUpdates,
) {
	matchOffchainUpdates := m.mustUpdateMemclobStateWithMatches(
		ctx,
		order,
		newMakerFills,
		matchedOrderHashToOrder,
		matchedMakerOrderIdToOrder,
	)
	offchainUpdates.Append(matchOffchainUpdates)
}

func (m *MemClobPriceTimePriority) doesMatchingViolateSubaccountConstraints(
	order types.MatchableOrder,
	takerOrderStatus types.TakerOrderStatus,
) bool {
	return !order.IsLiquidation() && takerOrderStatus.OrderStatus == types.ViolatesCollateralPoolConstraints
}

func (m *MemClobPriceTimePriority) isPostOnlyAndNotRewind(
	order types.MatchableOrder,
	newMakerFills []types.MakerFill,
) bool {
	return len(newMakerFills) > 0 &&
		!order.IsLiquidation() &&
		order.MustGetOrder().TimeInForce == types.Order_TIME_IN_FORCE_POST_ONLY
}

func (m *MemClobPriceTimePriority) isFOKAndNotFullyFilled(
	order types.MatchableOrder,
	takerOrderStatus types.TakerOrderStatus,
) bool {
	return !order.IsLiquidation() && order.MustGetOrder().TimeInForce == types.Order_TIME_IN_FORCE_FILL_OR_KILL && takerOrderStatus.RemainingQuantums > 0
}

func (m *MemClobPriceTimePriority) removeMakerOrdersFromBookAfterMatching(
	ctx sdk.Context,
	order types.MatchableOrder,
	makerOrdersToRemove []OrderWithRemovalReason,
	offchainUpdates *types.OffchainUpdates,
) {
	for _, makerOrderWithRemovalReason := range makerOrdersToRemove {
		// TODO(DEC-847): Update logic to properly remove long-term orders.
		makerOrderId := makerOrderWithRemovalReason.Order.OrderId
		m.handleMakerOrderRemovalAfterMatching(
			ctx,
			order,
			makerOrderId,
			makerOrderWithRemovalReason,
			offchainUpdates,
		)
	}
}

func (m *MemClobPriceTimePriority) handleMakerOrderRemovalAfterMatching(
	ctx sdk.Context,
	order types.MatchableOrder,
	makerOrderId types.OrderId,
	makerOrderWithRemovalReason OrderWithRemovalReason,
	offchainUpdates *types.OffchainUpdates,
) {
	// TODO(CLOB-669): Move logic outside of `memclob.go` by returning a slice of removed orders.
	// If the order is a replacement order, a message was already added above the place message.
	if m.shouldAddMakerOrderRemovalOffchainUpdate(order, makerOrderId) {
		// TODO(DEC-1409): Update this to support order replacements on indexer.
		reason := indexershared.ConvertOrderRemovalReasonToIndexerOrderRemovalReason(
			makerOrderWithRemovalReason.RemovalReason,
		)

		m.addOrderRemovalMessageWithReasonToOffchainUpdates(
			ctx,
			makerOrderId,
			reason,
			ocutypes.OrderRemoveV1_ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED,
			offchainUpdates,
		)
	}

	m.mustRemoveOrder(ctx, makerOrderId)
	if !m.isOrderStatefulAndNoOrderRemovalInOpQueueFromId(makerOrderId) {
		return
	}

	m.operationsToPropose.MustAddOrderRemovalToOperationsQueue(
		makerOrderId,
		makerOrderWithRemovalReason.RemovalReason,
	)
}

func (m *MemClobPriceTimePriority) isOrderStatefulAndNoOrderRemovalInOpQueueFromId(
	orderId types.OrderId,
) bool {
	return orderId.IsStatefulOrder() && !m.operationsToPropose.IsOrderRemovalInOperationsQueue(orderId)
}

func (m *MemClobPriceTimePriority) addOrderRemovalMessageWithReasonToOffchainUpdates(
	ctx sdk.Context,
	orderId types.OrderId,
	reason indexersharedtypes.OrderRemovalReason,
	removalStatus ocutypes.OrderRemoveV1_OrderRemovalStatus,
	offchainUpdates *types.OffchainUpdates,
) {
	message, success := off_chain_updates.CreateOrderRemoveMessageWithReason(
		ctx,
		orderId,
		reason,
		removalStatus,
	)

	if success {
		offchainUpdates.AddRemoveMessage(orderId, message)
	}
}

func (m *MemClobPriceTimePriority) shouldAddMakerOrderRemovalOffchainUpdate(
	order types.MatchableOrder,
	makerOrderId types.OrderId,
) bool {
	return m.generateOffchainUpdates && (order.IsLiquidation() || makerOrderId != order.MustGetOrder().OrderId)
}

func (m *MemClobPriceTimePriority) removeOriginalOrderIfReplacement(
	order types.MatchableOrder,
	makerOrdersToRemove *[]OrderWithRemovalReason,
) {
	if order.IsLiquidation() {
		return
	}
	orderId := order.MustGetOrder().OrderId
	if orderToBeReplaced, found := m.openOrders.getOrder(orderId); found {
		*makerOrdersToRemove = append(*makerOrdersToRemove, OrderWithRemovalReason{Order: orderToBeReplaced})
	}
}

func (m *MemClobPriceTimePriority) updateTakerOrderStatusAndSizePostMatch(
	takerOrderStatus *types.TakerOrderStatus,
	takerRemainingSize satypes.BaseQuantums,
	takerRemainingSizeBeforeMatching satypes.BaseQuantums,
) {
	takerOrderStatus.RemainingQuantums = takerRemainingSize
	takerOrderStatus.OrderOptimisticallyFilledQuantums = takerRemainingSizeBeforeMatching - takerRemainingSize
}

func (m *MemClobPriceTimePriority) maybeCancelRemainingReduceOnlyOrderSize(
	ctx sdk.Context,
	newTakerOrder types.MatchableOrder,
	takerSubaccountId satypes.SubaccountId,
	clobPairId types.ClobPairId,
	takerOrderStatus *types.TakerOrderStatus,
	takerRemainingSize satypes.BaseQuantums,
) (shouldBreak bool) {
	if m.isReduceOnlyWithRemainingSize(newTakerOrder, takerRemainingSize) {
		takerStatePositionSize := m.clobKeeper.GetStatePosition(ctx, takerSubaccountId, clobPairId)
		if takerStatePositionSize.Sign() == 0 {
			// TODO(DEC-847): Update logic to properly remove stateful taker reduce-only orders.
			takerOrderStatus.OrderStatus = types.ReduceOnlyResized
			return true
		}
	}
	return false
}

func (m *MemClobPriceTimePriority) isReduceOnlyWithRemainingSize(
	newTakerOrder types.MatchableOrder,
	takerRemainingSize satypes.BaseQuantums,
) bool {
	return newTakerOrder.IsReduceOnly() && takerRemainingSize > 0
}

func (m *MemClobPriceTimePriority) addMakerFill(
	newMakerFills *[]types.MakerFill,
	makerOrderId types.OrderId,
	matchedAmount satypes.BaseQuantums,
) {
	*newMakerFills = append(*newMakerFills, types.MakerFill{
		MakerOrderId: makerOrderId,
		FillAmount:   matchedAmount.ToUint64(),
	})
}

func (m *MemClobPriceTimePriority) updateTakerOrdersToOrderHashesMap(
	newTakerOrder types.MatchableOrder,
	matchedOrderHashToOrder map[types.OrderHash]types.MatchableOrder,
) {
	takerOrderHash := newTakerOrder.GetOrderHash()
	matchedOrderHashToOrder[takerOrderHash] = newTakerOrder
}

func (m *MemClobPriceTimePriority) addMakerOrdersToOrderHashesMap(
	makerOrder types.ClobOrder,
	makerOrderId types.OrderId,
	matchedOrderHashToOrder map[types.OrderHash]types.MatchableOrder,
	matchedMakerOrderIdToOrder map[types.OrderId]types.Order,
) {
	makerOrderHash := makerOrder.Order.GetOrderHash()
	matchedOrderHashToOrder[makerOrderHash] = &makerOrder.Order
	matchedMakerOrderIdToOrder[makerOrderId] = makerOrder.Order
}

func (m *MemClobPriceTimePriority) updateTotalMatchedAmount(
	newTakerOrder types.MatchableOrder,
	bigTotalMatchedAmount *big.Int,
	matchedAmount satypes.BaseQuantums,
) {
	if newTakerOrder.IsBuy() {
		bigTotalMatchedAmount.Add(bigTotalMatchedAmount, matchedAmount.ToBigInt())
	} else {
		bigTotalMatchedAmount.Sub(bigTotalMatchedAmount, matchedAmount.ToBigInt())
	}
}

func (m *MemClobPriceTimePriority) handleFailedCollateralization(
	makerOrder types.ClobOrder,
	makerUpdateResult,
	takerUpdateResult satypes.UpdateResult,
	takerIsLiquidation bool,
	takerOrderStatus *types.TakerOrderStatus,
	makerOrdersToRemove *[]OrderWithRemovalReason,
) (shouldBreak bool) {
	makerCollatOkay := updateResultToOrderStatus(makerUpdateResult).IsSuccess()
	takerCollatOkay := takerIsLiquidation || updateResultToOrderStatus(takerUpdateResult).IsSuccess()

	if !makerCollatOkay {
		*makerOrdersToRemove = append(
			*makerOrdersToRemove,
			OrderWithRemovalReason{
				Order:         makerOrder.Order,
				RemovalReason: types.OrderRemoval_REMOVAL_REASON_UNDERCOLLATERALIZED,
			})
	}

	if !takerCollatOkay {
		takerOrderStatus.OrderStatus = updateResultToOrderStatus(takerUpdateResult)
		return true
	}
	return false
}

func (m *MemClobPriceTimePriority) processMatch(
	ctx sdk.Context,
	newTakerOrder types.MatchableOrder,
	makerOrder types.ClobOrder,
	matchedAmount satypes.BaseQuantums,
	takeOrderStatus *types.TakerOrderStatus,
) (
	success bool,
	takerUpdateResult satypes.UpdateResult,
	makerUpdateResult satypes.UpdateResult,
	shouldEndMatching bool,

) {
	matchWithOrders := types.MatchWithOrders{
		TakerOrder: newTakerOrder,
		MakerOrder: &makerOrder.Order,
		FillAmount: matchedAmount,
	}

	var err error
	success, takerUpdateResult, makerUpdateResult, _, err = m.clobKeeper.ProcessSingleMatch(ctx, &matchWithOrders)
	if err != nil && !errors.Is(err, satypes.ErrFailedToUpdateSubaccounts) {
		m.handleMatchingError(ctx, err, takeOrderStatus, matchWithOrders)
		return success, takerUpdateResult, makerUpdateResult, true
	}

	return success, takerUpdateResult, makerUpdateResult, false
}

func (m *MemClobPriceTimePriority) handleMatchingError(
	ctx sdk.Context,
	err error,
	takerOrderStatus *types.TakerOrderStatus,
	matchWithOrders types.MatchWithOrders,
) {
	if errors.Is(err, types.ErrLiquidationExceedsMaxInsuranceLost) {
		telemetry.IncrCounter(1, types.ModuleName, metrics.SubaccountMaxInsuranceLost, metrics.Count)
		takerOrderStatus.OrderStatus = types.LiquidationExceededSubaccountMaxInsuranceLost
	} else if errors.Is(err, types.ErrInsuranceFundHasInsufficientFunds) {
		telemetry.IncrCounter(1, types.ModuleName, metrics.LiquidationRequiresDeleveraging, metrics.Count)
		takerOrderStatus.OrderStatus = types.LiquidationRequiresDeleveraging
	} else {
		log.ErrorLogWithError(
			ctx,
			"Unexpected error from `ProcessSingleMatch`",
			err,
			"matchWithOrders", matchWithOrders,
		)
		panic(err)
	}
}

func (m *MemClobPriceTimePriority) determineMatchedAmount(
	takerRemainingSize satypes.BaseQuantums,
	makerRemainingSize satypes.BaseQuantums,
) satypes.BaseQuantums {
	if takerRemainingSize >= makerRemainingSize {
		return makerRemainingSize
	}
	return takerRemainingSize
}

func (m *MemClobPriceTimePriority) checkIsInvalidReduceOnlyMatchAndMaybeResize(
	ctx sdk.Context,
	makerOrder types.ClobOrder,
	newTakerOrder types.MatchableOrder,
	matchedAmount *satypes.BaseQuantums,
	takerIsBuy bool,
	takerSubaccountId satypes.SubaccountId,
	clobPairId types.ClobPairId,
	makerOrdersToRemove *[]OrderWithRemovalReason,
) (shouldSkipMakerOrder bool) {
	if m.checkIsMakerOrderInvalidReduceOnlyAndMaybeResize(
		ctx,
		makerOrder,
		matchedAmount,
		takerIsBuy,
		clobPairId,
		makerOrdersToRemove,
	) {
		return true
	}

	if m.checkIsTakerOrderInvalidReduceOnlyAndMaybeResize(
		ctx,
		newTakerOrder,
		matchedAmount,
		takerIsBuy,
		takerSubaccountId,
		clobPairId,
	) {
		return true
	}

	return false
}

func (m *MemClobPriceTimePriority) checkIsMakerOrderInvalidReduceOnlyAndMaybeResize(
	ctx sdk.Context,
	makerOrder types.ClobOrder,
	matchedAmount *satypes.BaseQuantums,
	takerIsBuy bool,
	clobPairId types.ClobPairId,
	makerOrdersToRemove *[]OrderWithRemovalReason,
) (shouldSkipMakerOrder bool) {
	if makerOrder.Order.IsReduceOnly() {
		currentPositionSize := m.clobKeeper.GetStatePosition(ctx, makerOrder.Order.OrderId.SubaccountId, clobPairId)
		resizedMatchAmount := m.resizeReduceOnlyMatchIfNecessary(currentPositionSize, *matchedAmount, !takerIsBuy)
		if resizedMatchAmount == 0 {
			*makerOrdersToRemove = append(*makerOrdersToRemove, OrderWithRemovalReason{
				Order:         makerOrder.Order,
				RemovalReason: types.OrderRemoval_REMOVAL_REASON_INVALID_REDUCE_ONLY,
			})
			return true
		}
		*matchedAmount = resizedMatchAmount
	}
	return false
}

func (m *MemClobPriceTimePriority) checkIsTakerOrderInvalidReduceOnlyAndMaybeResize(
	ctx sdk.Context,
	newTakerOrder types.MatchableOrder,
	matchedAmount *satypes.BaseQuantums,
	takerIsBuy bool,
	takerSubaccountId satypes.SubaccountId,
	clobPairId types.ClobPairId,
) bool {
	if newTakerOrder.IsReduceOnly() {
		currentPositionSize := m.clobKeeper.GetStatePosition(ctx, takerSubaccountId, clobPairId)
		resizedMatchAmount := m.resizeReduceOnlyMatchIfNecessary(currentPositionSize, *matchedAmount, takerIsBuy)
		if resizedMatchAmount == 0 {
			panic("mustPerformTakerOrderMatching: taker reduce-only order resized to 0")
		}
		*matchedAmount = resizedMatchAmount
	}
	return false
}

func (m *MemClobPriceTimePriority) calculateMatchedAmountForProcessing(
	ctx sdk.Context,
	newTakerOrder types.MatchableOrder,
	makerOrder types.ClobOrder,
	takerRemainingSize satypes.BaseQuantums,
	takerIsBuy bool,
	takerSubaccountId satypes.SubaccountId,
	clobPairId types.ClobPairId,
	makerOrdersToRemove *[]OrderWithRemovalReason,
) (matchedQuantums satypes.BaseQuantums, shouldSkipMakerOrder bool) {
	makerRemainingSize := m.sanityCheckMakerHasRemainingSize(ctx, makerOrder)
	matchedAmount := m.determineMatchedAmount(takerRemainingSize, makerRemainingSize)

	if m.checkIsInvalidReduceOnlyMatchAndMaybeResize(
		ctx,
		makerOrder,
		newTakerOrder,
		&matchedAmount,
		takerIsBuy,
		takerSubaccountId,
		clobPairId,
		makerOrdersToRemove,
	) {
		return 0, true
	}

	return matchedAmount, false
}

func (m *MemClobPriceTimePriority) sanityCheckMakerHasRemainingSize(
	ctx sdk.Context,
	makerOrder types.ClobOrder,
) satypes.BaseQuantums {
	makerRemainingSize, makerHasRemainingSize := m.GetOrderRemainingAmount(ctx, makerOrder.Order)
	if !makerHasRemainingSize {
		panic(fmt.Sprintf("mustPerformTakerOrderMatching: maker order has no remaining amount %v", makerOrder.Order))
	}
	return makerRemainingSize
}

func (m *MemClobPriceTimePriority) addSelfTradeToMakerOrderRemoval(
	makerOrder types.ClobOrder,
	makerOrdersToRemove *[]OrderWithRemovalReason,
) {
	*makerOrdersToRemove = append(
		*makerOrdersToRemove,
		OrderWithRemovalReason{
			Order:         makerOrder.Order,
			RemovalReason: types.OrderRemoval_REMOVAL_REASON_INVALID_SELF_TRADE,
		})
}

func (m *MemClobPriceTimePriority) isTakerOrderReplacingMakerOrder(
	newTakerOrder types.MatchableOrder,
	makerOrderId types.OrderId,
	takerIsLiquidation bool,
) bool {
	return !takerIsLiquidation && makerOrderId == newTakerOrder.MustGetOrder().OrderId
}

func (m *MemClobPriceTimePriority) isOrderbookCrossed(
	newTakerOrder types.MatchableOrder,
	makerOrder types.ClobOrder,
	takerIsBuy bool,
) bool {
	if takerIsBuy {
		return newTakerOrder.GetOrderSubticks() >= makerOrder.Order.GetOrderSubticks()
	}
	return newTakerOrder.GetOrderSubticks() <= makerOrder.Order.GetOrderSubticks()
}

func (m *MemClobPriceTimePriority) findNextMakerOrder(
	makerLevelOrder *types.LevelOrder,
	orderbook *types.Orderbook,
	takerIsBuy bool,
) (*types.LevelOrder, bool) {
	if makerLevelOrder == nil {
		return m.openOrders.getBestOrderOnSide(orderbook, !takerIsBuy)
	}
	return m.openOrders.findNextBestLevelOrder(makerLevelOrder)
}

func (m *MemClobPriceTimePriority) initializeMatchingReturnVariables() ([]types.MakerFill, map[types.OrderHash]types.MatchableOrder, map[types.OrderId]types.Order, []OrderWithRemovalReason) {
	return make([]types.MakerFill, 0),
		make(map[types.OrderHash]types.MatchableOrder),
		make(map[types.OrderId]types.Order),
		make([]OrderWithRemovalReason, 0)
}

func (m *MemClobPriceTimePriority) initializeTakerOrderVariables(
	ctx sdk.Context,
	newTakerOrder types.MatchableOrder,
) (
	clobPairId types.ClobPairId,
	orderbook *types.Orderbook,
	takerIsBuy bool,
	takerSubaccountId satypes.SubaccountId,
	takerIsLiquidation bool,
	takerRemainingSize satypes.BaseQuantums,
) {
	clobPairId = newTakerOrder.GetClobPairId()
	orderbook = m.openOrders.mustGetOrderbook(clobPairId)
	takerIsBuy = newTakerOrder.IsBuy()
	takerSubaccountId = newTakerOrder.GetSubaccountId()
	takerIsLiquidation = newTakerOrder.IsLiquidation()

	if takerIsLiquidation {
		takerRemainingSize = newTakerOrder.GetBaseQuantums()
	} else {
		var takerHasRemainingSize bool
		takerRemainingSize, takerHasRemainingSize = m.GetOrderRemainingAmount(ctx, newTakerOrder.MustGetOrder())
		if !takerHasRemainingSize {
			panic(fmt.Sprintf("mustPerformTakerOrderMatching: order has no remaining amount %v", newTakerOrder))
		}
	}

	return clobPairId, orderbook, takerIsBuy, takerSubaccountId, takerIsLiquidation, takerRemainingSize
}

func (m *MemClobPriceTimePriority) setOperationsQueueGauges() {
	m.setOperationsQueueLengthGauge()
	m.setNumMatchedOrdersInQueueGauge()
	m.setNumShortTermOrderTxBytesGauge()
}

func (m *MemClobPriceTimePriority) setOperationsQueueLengthGauge() {
	telemetry.SetGauge(
		float32(len(m.operationsToPropose.OperationsQueue)),
		types.ModuleName,
		metrics.OperationsQueueLength,
	)
}

func (m *MemClobPriceTimePriority) setNumMatchedOrdersInQueueGauge() {
	telemetry.SetGauge(
		float32(len(m.operationsToPropose.OrderHashesInOperationsQueue)),
		types.ModuleName,
		metrics.NumMatchedOrdersInOperationsQueue,
	)
}

func (m *MemClobPriceTimePriority) setNumShortTermOrderTxBytesGauge() {
	telemetry.SetGauge(
		float32(len(m.operationsToPropose.ShortTermOrderHashToTxBytes)),
		types.ModuleName,
		metrics.NumShortTermOrderTxBytes,
	)
}

func (m *MemClobPriceTimePriority) setOrderbookGauges(
	clobPairId types.ClobPairId,
	orderbook *types.Orderbook,
) {
	m.setTotalOpenOrdersGauge(clobPairId, orderbook)
	m.setBestBidGauge(clobPairId, orderbook)
	m.setBestAskGauge(clobPairId, orderbook)
}

func (m *MemClobPriceTimePriority) setTotalOpenOrdersGauge(
	clobPairId types.ClobPairId,
	orderbook *types.Orderbook,
) {
	telemetry.SetGaugeWithLabels(
		[]string{
			types.ModuleName,
			metrics.TotalOrdersInClob,
		},
		float32(orderbook.TotalOpenOrders),
		[]gometrics.Label{
			metrics.GetLabelForIntValue(metrics.ClobPairId, int(clobPairId)),
		},
	)
}

func (m *MemClobPriceTimePriority) setBestBidGauge(
	clobPairId types.ClobPairId,
	orderbook *types.Orderbook,
) {
	telemetry.SetGaugeWithLabels(
		[]string{
			types.ModuleName,
			metrics.BestBidClobPair,
		},
		float32(orderbook.BestBid),
		[]gometrics.Label{
			metrics.GetLabelForIntValue(metrics.ClobPairId, int(clobPairId)),
		},
	)
}

func (m *MemClobPriceTimePriority) setBestAskGauge(
	clobPairId types.ClobPairId,
	orderbook *types.Orderbook,
) {
	telemetry.SetGaugeWithLabels(
		[]string{
			types.ModuleName,
			metrics.BestAskClobPair,
		},
		float32(orderbook.BestAsk),
		[]gometrics.Label{
			metrics.GetLabelForIntValue(metrics.ClobPairId, int(clobPairId)),
		},
	)
}
func (m *MemClobPriceTimePriority) replayOrderRemoval(
	ctx sdk.Context,
	operation types.InternalOperation,
	placedPreexistingStatefulOrderIds map[types.OrderId]struct{},
	placedOrderRemovalOrderIds map[types.OrderId]struct{},
	existingOffchainUpdates *types.OffchainUpdates,
) *types.OffchainUpdates {
	orderId := operation.GetOrderRemoval().OrderId

	if _, found := placedPreexistingStatefulOrderIds[orderId]; found {
		telemetry.IncrCounterWithLabels(
			[]string{types.ModuleName, metrics.ReplayOperations, metrics.SkipOrderRemovalAfterPlacement},
			1,
			orderId.GetOrderIdLabels(),
		)
		return existingOffchainUpdates
	}

	if _, found := placedOrderRemovalOrderIds[orderId]; found {
		log.ErrorLog(
			ctx,
			"ReplayOperations: OrderRemoval operation for order which was already removed",
			metrics.OrderId, orderId,
			metrics.BlockHeight, ctx.BlockHeight()+1,
		)
		return existingOffchainUpdates
	}

	statefulOrderPlacement, found := m.clobKeeper.GetLongTermOrderPlacement(ctx, orderId)
	if !found {
		return existingOffchainUpdates
	}

	_, orderStatus, placeOrderOffchainUpdates, err := m.PlaceOrder(ctx, statefulOrderPlacement.Order)
	placedOrderRemovalOrderIds[orderId] = struct{}{}
	return m.GenerateOffchainUpdatesForReplayPlaceOrder(ctx, err, operation, statefulOrderPlacement.Order, orderStatus, placeOrderOffchainUpdates, existingOffchainUpdates)
}

func (m *MemClobPriceTimePriority) replayPreexistingStatefulOrder(
	ctx sdk.Context,
	operation types.InternalOperation,
	placedPreexistingStatefulOrderIds map[types.OrderId]struct{},
	placedOrderRemovalOrderIds map[types.OrderId]struct{},
	existingOffchainUpdates *types.OffchainUpdates,
) *types.OffchainUpdates {
	orderId := operation.GetPreexistingStatefulOrder()
	statefulOrderPlacement, found := m.clobKeeper.GetLongTermOrderPlacement(ctx, *orderId)
	if !found {
		return existingOffchainUpdates
	}

	if _, found := placedPreexistingStatefulOrderIds[*orderId]; found {
		log.ErrorLog(
			ctx,
			"ReplayOperations: PreexistingStatefulOrder operation for order which was already placed",
			metrics.OrderId, *orderId,
			metrics.BlockHeight, ctx.BlockHeight()+1,
		)
		return existingOffchainUpdates
	}

	if _, found := placedOrderRemovalOrderIds[*orderId]; found {
		log.ErrorLog(
			ctx,
			"ReplayOperations: PreexistingStatefulOrder preceded by Order Removal",
			metrics.OrderId, *orderId,
			metrics.BlockHeight, ctx.BlockHeight()+1,
		)
		return existingOffchainUpdates
	}

	_, orderStatus, placeOrderOffchainUpdates, err := m.clobKeeper.AddPreexistingStatefulOrder(ctx, &statefulOrderPlacement.Order, m)
	placedPreexistingStatefulOrderIds[*orderId] = struct{}{}
	return m.GenerateOffchainUpdatesForReplayPlaceOrder(ctx, err, operation, statefulOrderPlacement.Order, orderStatus, placeOrderOffchainUpdates, existingOffchainUpdates)
}

func (m *MemClobPriceTimePriority) replayShortTermOrderPlacement(
	ctx sdk.Context,
	operation types.InternalOperation,
	shortTermOrderTxBytes map[types.OrderHash][]byte,
	existingOffchainUpdates *types.OffchainUpdates,
) *types.OffchainUpdates {
	order := operation.GetShortTermOrderPlacement().Order
	txBytes, exists := shortTermOrderTxBytes[order.GetOrderHash()]
	if !exists || len(txBytes) == 0 {
		panic(fmt.Sprintf("ReplayOperations: Short-Term order TX bytes not found for order %s", order.GetOrderTextString()))
	}
	ctx = ctx.WithTxBytes(txBytes)
	msg := types.NewMsgPlaceOrder(order)
	orderSizeOptimisticallyFilledFromMatchingQuantums, orderStatus, placeOrderOffchainUpdates, err := m.clobKeeper.ReplayPlaceOrder(ctx, msg)

	log.DebugLog(
		ctx,
		"Received new order",
		"orderHash",
		cmtlog.NewLazySprintf("%X", order.GetOrderHash()),
		"msg",
		msg,
		"status",
		orderStatus,
		"orderSizeOptimisticallyFilledFromMatchingQuantums",
		orderSizeOptimisticallyFilledFromMatchingQuantums,
		"err",
		err,
		"block",
		ctx.BlockHeight(),
	)

	return m.GenerateOffchainUpdatesForReplayPlaceOrder(ctx, err, operation, order, orderStatus, placeOrderOffchainUpdates, existingOffchainUpdates)
}

func (m *MemClobPriceTimePriority) recoverFromReplayOperationsPanic(ctx sdk.Context) {
	if r := recover(); r != nil {
		stackTrace := string(debug.Stack())
		log.ErrorLog(
			ctx,
			"panic in replay operations",
			log.StackTrace,
			stackTrace,
			log.Error,
			r,
		)
	}
}

// GenerateOffchainUpdatesForReplayPlaceOrder is a helper function intended to be used in ReplayOperations.
// It takes the results of a PlaceOrder function call, emits the according logs, and appends offchain updates for
// the replay operation to the existingOffchainUpdates object.
func (m *MemClobPriceTimePriority) GenerateOffchainUpdatesForReplayPlaceOrder(
	ctx sdk.Context,
	err error,
	operation types.InternalOperation,
	order types.Order,
	orderStatus types.OrderStatus,
	placeOrderOffchainUpdates *types.OffchainUpdates,
	existingOffchainUpdates *types.OffchainUpdates,
) *types.OffchainUpdates {
	lib.AssertCheckTxMode(ctx)

	orderId := order.OrderId
	if err != nil {
		var loggerString string
		switch operation.Operation.(type) {
		case *types.InternalOperation_ShortTermOrderPlacement:
			loggerString = "ReplayOperations: PlaceOrder() returned an error"
		case *types.InternalOperation_PreexistingStatefulOrder:
			loggerString = "ReplayOperations: PlaceOrder() returned an error for a pre-existing stateful order."
		case *types.InternalOperation_OrderRemoval:
			loggerString = "ReplayOperations: PlaceOrder() returned an error for a removed stateful order which was re-placed."
		}

		log.DebugLog(
			ctx,
			loggerString,
			log.Error, err,
			log.Operation, operation,
			log.Order, order,
		)

		// If the order is dropped while adding it to the book, return an off-chain order remove
		// message for the order.
		if m.generateOffchainUpdates && off_chain_updates.ShouldSendOrderRemovalOnReplay(err) {
			if message, success := off_chain_updates.CreateOrderRemoveMessageWithDefaultReason(
				ctx,
				orderId,
				orderStatus,
				err,
				ocutypes.OrderRemoveV1_ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED,
				indexersharedtypes.OrderRemovalReason_ORDER_REMOVAL_REASON_INTERNAL_ERROR,
			); success {
				existingOffchainUpdates.AddRemoveMessage(orderId, message)
			}
		}
	} else if m.generateOffchainUpdates {
		existingOffchainUpdates.Append(placeOrderOffchainUpdates)
	}
	return existingOffchainUpdates
}

func (m *MemClobPriceTimePriority) handleShortTermOrderPlacementRemoval(
	ctx sdk.Context,
	operation types.InternalOperation,
) {
	otpOrderId := operation.GetShortTermOrderPlacement().Order.OrderId
	otpOrderHash := operation.GetShortTermOrderPlacement().Order.GetOrderHash()

	existingOrder, found := m.openOrders.getOrder(otpOrderId)
	if found && existingOrder.GetOrderHash() == otpOrderHash {
		m.mustRemoveOrder(ctx, otpOrderId)
	} else {
		order := operation.GetShortTermOrderPlacement().Order
		m.operationsToPropose.RemoveShortTermOrderTxBytes(order)
	}
}

func (m *MemClobPriceTimePriority) handlePreexistingStatefulOrderRemoval(
	ctx sdk.Context,
	operation types.InternalOperation,
) {
	otpOrderId := operation.GetPreexistingStatefulOrder()

	if m.openOrders.hasOrder(*otpOrderId) {
		m.mustRemoveOrder(ctx, *otpOrderId)
	}
}

func (m *MemClobPriceTimePriority) maybeAddOffchainUpdateMessage(
	ctx sdk.Context,
	makerOrder types.Order,
	newTotalFilledAmount satypes.BaseQuantums,
	offchainUpdates *types.OffchainUpdates,
) {
	if m.generateOffchainUpdates {
		if message, success := off_chain_updates.CreateOrderUpdateMessage(
			ctx,
			makerOrder.OrderId,
			newTotalFilledAmount,
		); success {
			offchainUpdates.AddUpdateMessage(makerOrder.OrderId, message)
		}
	}
}

func (m *MemClobPriceTimePriority) maybeSendOrderbookUpdate(
	ctx sdk.Context,
	makerOrder types.Order,
) {
	if m.generateOrderbookUpdates {
		orderbookUpdate := m.GetOrderbookUpdatesForOrderUpdate(ctx, makerOrder.OrderId)
		m.clobKeeper.SendOrderbookUpdates(ctx, orderbookUpdate, false)
	}
}

func (m *MemClobPriceTimePriority) removeOrderIfFullyFilled(
	ctx sdk.Context,
	makerOrder types.Order,
	newTotalFilledAmount satypes.BaseQuantums,
	makerOrderBaseQuantums satypes.BaseQuantums,
) {
	if newTotalFilledAmount == makerOrderBaseQuantums {
		m.mustRemoveOrder(ctx, makerOrder.OrderId)
	}
}

func (m *MemClobPriceTimePriority) validateImmediateExecutionOrder(
	order types.Order,
	remainingAmount satypes.BaseQuantums,
) error {
	violatesImmediateExecution := order.RequiresImmediateExecution() && remainingAmount < order.GetBaseQuantums()

	if violatesImmediateExecution {
		_, restingOrderExists := m.openOrders.getOrder(order.OrderId)

		if restingOrderExists {
			return errorsmod.Wrapf(
				types.ErrInvalidReplacement,
				"Cannot replace partially filled order with IOC order. Size: %d, Fill Amount: %d.",
				order.GetBaseQuantums(),
				order.GetBaseQuantums()-remainingAmount,
			)
		}

		return errorsmod.Wrapf(
			types.ErrImmediateExecutionOrderAlreadyFilled,
			"Order: %s",
			order.GetOrderTextString(),
		)
	}
	return nil
}

func (m *MemClobPriceTimePriority) validateOrderSize(
	order types.Order,
	remainingAmount satypes.BaseQuantums,
	hasRemainingAmount bool,
) error {
	orderbook := m.openOrders.mustGetOrderbook(order.GetClobPairId())
	hasInSufficientRemainingSize := !hasRemainingAmount || remainingAmount < orderbook.MinOrderBaseQuantums

	if hasInSufficientRemainingSize {
		return errorsmod.Wrapf(
			types.ErrOrderFullyFilled,
			"Order remaining amount is less than `MinOrderBaseQuantums`. Remaining amount: %d. Order: %+v",
			remainingAmount,
			order.GetOrderTextString(),
		)
	}
	return nil
}

// If the order is a reduce-only order, we should ensure that the sign of the order size is the opposite of
// the current position size. Note that we do not validate the size/quantity of the reduce only order fill,
// as that will be validated if the order is matched.
// The subaccount's current position size is defined as the current state size + any partial fills
// that might have occurred as a result of this reduce only order replacing another partially filled order.
// Partial fills should be already recorded in state since order matching is optimistic and writes to state.
func (m *MemClobPriceTimePriority) validateReduceOnlyOrder(
	ctx sdk.Context,
	order types.Order,
) error {
	orderId := order.OrderId

	if !order.IsReduceOnly() {
		return nil
	}

	existingPositionSize := m.clobKeeper.GetStatePosition(ctx, orderId.SubaccountId, order.GetClobPairId())
	orderSize := order.GetBigQuantums()
	isReduceOnlyOrderOnOppositeSideOfPosition := orderSize.Sign()*existingPositionSize.Sign() != -1

	if isReduceOnlyOrderOnOppositeSideOfPosition {
		return types.ErrReduceOnlyWouldIncreasePositionSize
	}

	return nil
}

func (m *MemClobPriceTimePriority) validateReplacementOrder(
	order types.Order,
) error {
	orderId := order.OrderId

	existingRestingOrder, restingOrderExists := m.openOrders.getOrder(orderId)
	existingMatchedOrder, matchedOrderExists := m.operationsToPropose.MatchedOrderIdToOrder[orderId]

	validRestingOrderExists := restingOrderExists && (existingRestingOrder.MustCmpReplacementOrder(&order) > 0 || existingRestingOrder.IsIdenticalTo(&order))
	validMatchedOrderExists := matchedOrderExists && (existingMatchedOrder.MustCmpReplacementOrder(&order) > 0 || existingMatchedOrder.IsIdenticalTo(&order))

	if validRestingOrderExists {
		return types.ErrInvalidReplacement
	}

	if validMatchedOrderExists {
		return types.ErrInvalidReplacement
	}

	return nil
}

func (m *MemClobPriceTimePriority) validateOrderHasNotBeenCanceled(
	order types.Order,
) error {
	orderId := order.OrderId

	if !orderId.IsShortTermOrder() {
		return nil
	}

	cancelTilBlock, cancelExists := m.cancels.get(orderId)
	isValidCancel := cancelExists && cancelTilBlock >= order.GetGoodTilBlock()

	if isValidCancel {
		return errorsmod.Wrapf(
			types.ErrOrderIsCanceled,
			"Order: %+v, Cancellation GoodTilBlock: %d",
			order,
			cancelTilBlock,
		)
	}

	return nil
}

func (m *MemClobPriceTimePriority) checkSubaccountUpdates(
	ctx sdk.Context,
	clobPairId types.ClobPairId,
	subaccountId satypes.SubaccountId,
	subaccountOpenOrders map[satypes.SubaccountId][]types.PendingOpenOrder,
) types.OrderStatus {
	_, successPerSubaccountUpdate := m.clobKeeper.AddOrderToOrderbookSubaccountUpdatesCheck(
		ctx,
		clobPairId,
		subaccountOpenOrders,
	)
	return updateResultToOrderStatus(successPerSubaccountUpdate[subaccountId])
}

func (m *MemClobPriceTimePriority) constructSubaccountOpenOrders(
	subaccountId satypes.SubaccountId,
	pendingOpenOrder types.PendingOpenOrder,
) map[satypes.SubaccountId][]types.PendingOpenOrder {
	subaccountOpenOrders := make(map[satypes.SubaccountId][]types.PendingOpenOrder)
	subaccountOpenOrders[subaccountId] = []types.PendingOpenOrder{pendingOpenOrder}
	return subaccountOpenOrders
}

func (m *MemClobPriceTimePriority) maybeCancelReduceOnlyOrdersPostMatch(
	ctx sdk.Context,
	takerOrder types.MatchableOrder,
	subaccountTotalMatchedQuantums map[satypes.SubaccountId]*big.Int,
	offchainUpdates *types.OffchainUpdates,
) {
	allSubaccounts := lib.GetSortedKeys[satypes.SortedSubaccountIds](subaccountTotalMatchedQuantums)
	for _, subaccountId := range allSubaccounts {
		cancelledOffchainUpdates := m.maybeCancelReduceOnlyOrders(
			ctx,
			subaccountId,
			takerOrder.GetClobPairId(),
			subaccountTotalMatchedQuantums[subaccountId],
		)
		offchainUpdates.Append(cancelledOffchainUpdates)
	}
}

func (m *MemClobPriceTimePriority) addTakerOrderToOperationsQueueIfNeeded(
	takerOrder types.MatchableOrder,
	ctx sdk.Context,
) {
	if takerOrder.IsLiquidation() {
		return
	}

	taker := takerOrder.MustGetOrder()
	if taker.IsStatefulOrder() {
		m.operationsToPropose.MustAddStatefulOrderPlacementToOperationsQueue(taker)
	} else {
		m.operationsToPropose.MustAddShortTermOrderTxBytes(taker, ctx.TxBytes())
		m.operationsToPropose.MustAddShortTermOrderPlacementToOperationsQueue(taker)
	}
}

func (m *MemClobPriceTimePriority) processMakerFills(
	ctx sdk.Context,
	newMakerFills []types.MakerFill,
	takerOrder types.MatchableOrder,
	matchedMakerOrderIdToOrder map[types.OrderId]types.Order,
	subaccountTotalMatchedQuantums map[satypes.SubaccountId]*big.Int,
	offchainUpdates *types.OffchainUpdates,
) []types.MakerFillWithOrder {
	makerFillWithOrders := make([]types.MakerFillWithOrder, 0, len(newMakerFills))
	for _, newFill := range newMakerFills {
		matchedMakerOrder := m.mustGetMatchedOrderForMakerFill(newFill, matchedMakerOrderIdToOrder, &makerFillWithOrders)
		m.maybeAddMatchedMakerOrderToOperationsQueue(matchedMakerOrder)
		matchedQuantums := m.getMakerFillMatchQuantums(newFill, matchedMakerOrder)
		matchOffchainUpdates := m.mustUpdateOrderbookStateWithMatchedMakerOrder(
			ctx,
			matchedMakerOrder,
		)
		offchainUpdates.Append(matchOffchainUpdates)
		m.updateSubaccountMatchedQuantums(matchedMakerOrder, takerOrder, matchedQuantums, subaccountTotalMatchedQuantums)
	}
	return makerFillWithOrders
}

func (m *MemClobPriceTimePriority) updateSubaccountMatchedQuantums(
	matchedMakerOrder types.Order,
	takerOrder types.MatchableOrder,
	matchedQuantums satypes.BaseQuantums,
	subaccountTotalMatchedQuantums map[satypes.SubaccountId]*big.Int,
) {
	for _, order := range []types.MatchableOrder{&matchedMakerOrder, takerOrder} {
		bigTotalMatchedQuantums, exists := subaccountTotalMatchedQuantums[order.GetSubaccountId()]
		if !exists {
			bigTotalMatchedQuantums = big.NewInt(0)
		}

		bigMatchedQuantums := matchedQuantums.ToBigInt()
		if order.IsBuy() {
			bigTotalMatchedQuantums = bigTotalMatchedQuantums.Add(bigTotalMatchedQuantums, bigMatchedQuantums)
		} else {
			bigTotalMatchedQuantums = bigTotalMatchedQuantums.Sub(bigTotalMatchedQuantums, bigMatchedQuantums)
		}

		subaccountTotalMatchedQuantums[order.GetSubaccountId()] = bigTotalMatchedQuantums
	}
}

func (m *MemClobPriceTimePriority) getMakerFillMatchQuantums(
	newFill types.MakerFill,
	matchedMakerOrder types.Order,
) satypes.BaseQuantums {
	matchedQuantums := satypes.BaseQuantums(newFill.GetFillAmount())
	if matchedQuantums == 0 {
		panic(fmt.Sprintf(
			"mustUpdateMemclobStateWithMatches: Fill has 0 quantums. Fill %v and maker order %v",
			newFill,
			matchedMakerOrder,
		))
	}
	return matchedQuantums
}

func (m *MemClobPriceTimePriority) mustGetMatchedOrderForMakerFill(
	makerFill types.MakerFill,
	matchedMakerOrderIdToOrder map[types.OrderId]types.Order,
	makerFillWithOrders *[]types.MakerFillWithOrder,
) (matchedMakerOrder types.Order) {
	matchedMakerOrder, exists := matchedMakerOrderIdToOrder[makerFill.MakerOrderId]
	if !exists {
		panic(
			fmt.Sprintf(
				"mustUpdateMemclobStateWithMatches: matched maker order %s does not exist in `matchedMakerOrderIdToOrder`",
				matchedMakerOrder.GetOrderTextString(),
			),
		)
	}

	*makerFillWithOrders = append(
		*makerFillWithOrders,
		types.MakerFillWithOrder{
			Order:     matchedMakerOrder,
			MakerFill: makerFill,
		},
	)
	return matchedMakerOrder
}

func (m *MemClobPriceTimePriority) maybeAddMatchedMakerOrderToOperationsQueue(
	matchedMakerOrder types.Order,
) {
	// Skip adding order placement in the operations queue if it already exists.
	if m.operationsToPropose.IsOrderPlacementInOperationsQueue(
		matchedMakerOrder,
	) {
		return
	}

	// Add the maker order placement to the operations queue.
	if matchedMakerOrder.IsStatefulOrder() {
		m.operationsToPropose.MustAddStatefulOrderPlacementToOperationsQueue(
			matchedMakerOrder,
		)
	} else {
		m.operationsToPropose.MustAddShortTermOrderPlacementToOperationsQueue(
			matchedMakerOrder,
		)
	}
}

func (m *MemClobPriceTimePriority) updateMatchedOrders(
	matchedOrderHashToOrder map[types.OrderHash]types.MatchableOrder,
) {
	for _, matchedOrder := range matchedOrderHashToOrder {
		if matchedOrder.IsLiquidation() {
			continue
		}

		order := matchedOrder.MustGetOrder()
		if m.doesMoreRecentOrderExist(order) {
			panic(
				"mustUpdateMemclobStateWithMatches: newly matched order is lesser than existing order " +
					"Newly matched order %v, existing order %v",
			)
		}

		m.operationsToPropose.MatchedOrderIdToOrder[order.OrderId] = order
	}
}

func (m *MemClobPriceTimePriority) doesMoreRecentOrderExist(
	order types.Order,
) bool {
	orderId := order.OrderId
	other, exists := m.operationsToPropose.MatchedOrderIdToOrder[orderId]
	return exists && order.MustCmpReplacementOrder(&other) < 0
}
