import { SubaccountId, SubaccountIdAmino, SubaccountIdSDKType } from "../subaccounts/subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * Represents the side of the orderbook the order will be placed on.
 * Note that Side.SIDE_UNSPECIFIED is an invalid order and cannot be
 * placed on the orderbook.
 */
export declare enum Order_Side {
    /** SIDE_UNSPECIFIED - Default value. This value is invalid and unused. */
    SIDE_UNSPECIFIED = 0,
    /** SIDE_BUY - SIDE_BUY is used to represent a BUY order. */
    SIDE_BUY = 1,
    /** SIDE_SELL - SIDE_SELL is used to represent a SELL order. */
    SIDE_SELL = 2,
    UNRECOGNIZED = -1
}
export declare const Order_SideSDKType: typeof Order_Side;
export declare const Order_SideAmino: typeof Order_Side;
export declare function order_SideFromJSON(object: any): Order_Side;
export declare function order_SideToJSON(object: Order_Side): string;
/**
 * TimeInForce indicates how long an order will remain active before it
 * is executed or expires.
 */
export declare enum Order_TimeInForce {
    /**
     * TIME_IN_FORCE_UNSPECIFIED - TIME_IN_FORCE_UNSPECIFIED represents the default behavior where an
     * order will first match with existing orders on the book, and any
     * remaining size will be added to the book as a maker order.
     */
    TIME_IN_FORCE_UNSPECIFIED = 0,
    /**
     * TIME_IN_FORCE_IOC - TIME_IN_FORCE_IOC enforces that an order only be matched with
     * maker orders on the book. If the order has remaining size after
     * matching with existing orders on the book, the remaining size
     * is not placed on the book.
     */
    TIME_IN_FORCE_IOC = 1,
    /**
     * TIME_IN_FORCE_POST_ONLY - TIME_IN_FORCE_POST_ONLY enforces that an order only be placed
     * on the book as a maker order. Note this means that validators will cancel
     * any newly-placed post only orders that would cross with other maker
     * orders.
     */
    TIME_IN_FORCE_POST_ONLY = 2,
    /**
     * TIME_IN_FORCE_FILL_OR_KILL - TIME_IN_FORCE_FILL_OR_KILL enforces that an order will either be filled
     * completely and immediately by maker orders on the book or canceled if the
     * entire amount can‘t be matched.
     */
    TIME_IN_FORCE_FILL_OR_KILL = 3,
    UNRECOGNIZED = -1
}
export declare const Order_TimeInForceSDKType: typeof Order_TimeInForce;
export declare const Order_TimeInForceAmino: typeof Order_TimeInForce;
export declare function order_TimeInForceFromJSON(object: any): Order_TimeInForce;
export declare function order_TimeInForceToJSON(object: Order_TimeInForce): string;
export declare enum Order_ConditionType {
    /**
     * CONDITION_TYPE_UNSPECIFIED - CONDITION_TYPE_UNSPECIFIED represents the default behavior where an
     * order will be placed immediately on the orderbook.
     */
    CONDITION_TYPE_UNSPECIFIED = 0,
    /**
     * CONDITION_TYPE_STOP_LOSS - CONDITION_TYPE_STOP_LOSS represents a stop order. A stop order will
     * trigger when the oracle price moves at or above the trigger price for
     * buys, and at or below the trigger price for sells.
     */
    CONDITION_TYPE_STOP_LOSS = 1,
    /**
     * CONDITION_TYPE_TAKE_PROFIT - CONDITION_TYPE_TAKE_PROFIT represents a take profit order. A take profit
     * order will trigger when the oracle price moves at or below the trigger
     * price for buys and at or above the trigger price for sells.
     */
    CONDITION_TYPE_TAKE_PROFIT = 2,
    UNRECOGNIZED = -1
}
export declare const Order_ConditionTypeSDKType: typeof Order_ConditionType;
export declare const Order_ConditionTypeAmino: typeof Order_ConditionType;
export declare function order_ConditionTypeFromJSON(object: any): Order_ConditionType;
export declare function order_ConditionTypeToJSON(object: Order_ConditionType): string;
/** OrderId refers to a single order belonging to a Subaccount. */
export interface OrderId {
    /**
     * The subaccount ID that opened this order.
     * Note that this field has `gogoproto.nullable = false` so that it is
     * generated as a value instead of a pointer. This is because the `OrderId`
     * proto is used as a key within maps, and map comparisons will compare
     * pointers for equality (when the desired behavior is to compare the values).
     */
    subaccountId: SubaccountId;
    /**
     * The client ID of this order, unique with respect to the specific
     * sub account (I.E., the same subaccount can't have two orders with
     * the same ClientId).
     */
    clientId: number;
    /**
     * order_flags represent order flags for the order. This field is invalid if
     * it's greater than 127 (larger than one byte). Each bit in the first byte
     * represents a different flag. Currently only two flags are supported.
     *
     * Starting from the bit after the most MSB (note that the MSB is used in
     * proto varint encoding, and therefore cannot be used): Bit 1 is set if this
     * order is a Long-Term order (0x40, or 64 as a uint8). Bit 2 is set if this
     * order is a Conditional order (0x20, or 32 as a uint8).
     *
     * If neither bit is set, the order is assumed to be a Short-Term order.
     *
     * If both bits are set or bits other than the 2nd and 3rd are set, the order
     * ID is invalid.
     */
    orderFlags: number;
    /** ID of the CLOB the order is created for. */
    clobPairId: number;
}
export interface OrderIdProtoMsg {
    typeUrl: "/klyraprotocol.clob.OrderId";
    value: Uint8Array;
}
/** OrderId refers to a single order belonging to a Subaccount. */
export interface OrderIdAmino {
    /**
     * The subaccount ID that opened this order.
     * Note that this field has `gogoproto.nullable = false` so that it is
     * generated as a value instead of a pointer. This is because the `OrderId`
     * proto is used as a key within maps, and map comparisons will compare
     * pointers for equality (when the desired behavior is to compare the values).
     */
    subaccount_id?: SubaccountIdAmino;
    /**
     * The client ID of this order, unique with respect to the specific
     * sub account (I.E., the same subaccount can't have two orders with
     * the same ClientId).
     */
    client_id?: number;
    /**
     * order_flags represent order flags for the order. This field is invalid if
     * it's greater than 127 (larger than one byte). Each bit in the first byte
     * represents a different flag. Currently only two flags are supported.
     *
     * Starting from the bit after the most MSB (note that the MSB is used in
     * proto varint encoding, and therefore cannot be used): Bit 1 is set if this
     * order is a Long-Term order (0x40, or 64 as a uint8). Bit 2 is set if this
     * order is a Conditional order (0x20, or 32 as a uint8).
     *
     * If neither bit is set, the order is assumed to be a Short-Term order.
     *
     * If both bits are set or bits other than the 2nd and 3rd are set, the order
     * ID is invalid.
     */
    order_flags?: number;
    /** ID of the CLOB the order is created for. */
    clob_pair_id?: number;
}
export interface OrderIdAminoMsg {
    type: "/klyraprotocol.clob.OrderId";
    value: OrderIdAmino;
}
/** OrderId refers to a single order belonging to a Subaccount. */
export interface OrderIdSDKType {
    subaccount_id: SubaccountIdSDKType;
    client_id: number;
    order_flags: number;
    clob_pair_id: number;
}
/**
 * OrdersFilledDuringLatestBlock represents a list of `OrderIds` that were
 * filled by any non-zero amount in the latest block.
 */
export interface OrdersFilledDuringLatestBlock {
    /**
     * A list of unique order_ids that were filled by any non-zero amount in the
     * latest block.
     */
    orderIds: OrderId[];
}
export interface OrdersFilledDuringLatestBlockProtoMsg {
    typeUrl: "/klyraprotocol.clob.OrdersFilledDuringLatestBlock";
    value: Uint8Array;
}
/**
 * OrdersFilledDuringLatestBlock represents a list of `OrderIds` that were
 * filled by any non-zero amount in the latest block.
 */
export interface OrdersFilledDuringLatestBlockAmino {
    /**
     * A list of unique order_ids that were filled by any non-zero amount in the
     * latest block.
     */
    order_ids?: OrderIdAmino[];
}
export interface OrdersFilledDuringLatestBlockAminoMsg {
    type: "/klyraprotocol.clob.OrdersFilledDuringLatestBlock";
    value: OrdersFilledDuringLatestBlockAmino;
}
/**
 * OrdersFilledDuringLatestBlock represents a list of `OrderIds` that were
 * filled by any non-zero amount in the latest block.
 */
export interface OrdersFilledDuringLatestBlockSDKType {
    order_ids: OrderIdSDKType[];
}
/**
 * PotentiallyPrunableOrders represents a list of orders that may be prunable
 * from state at a future block height.
 */
export interface PotentiallyPrunableOrders {
    /**
     * A list of unique order_ids that may potentially be pruned from state at a
     * future block height.
     */
    orderIds: OrderId[];
}
export interface PotentiallyPrunableOrdersProtoMsg {
    typeUrl: "/klyraprotocol.clob.PotentiallyPrunableOrders";
    value: Uint8Array;
}
/**
 * PotentiallyPrunableOrders represents a list of orders that may be prunable
 * from state at a future block height.
 */
export interface PotentiallyPrunableOrdersAmino {
    /**
     * A list of unique order_ids that may potentially be pruned from state at a
     * future block height.
     */
    order_ids?: OrderIdAmino[];
}
export interface PotentiallyPrunableOrdersAminoMsg {
    type: "/klyraprotocol.clob.PotentiallyPrunableOrders";
    value: PotentiallyPrunableOrdersAmino;
}
/**
 * PotentiallyPrunableOrders represents a list of orders that may be prunable
 * from state at a future block height.
 */
export interface PotentiallyPrunableOrdersSDKType {
    order_ids: OrderIdSDKType[];
}
/**
 * OrderFillState represents the fill amount of an order according to on-chain
 * state. This proto includes both the current on-chain fill amount of the
 * order, as well as the block at which this information can be pruned from
 * state.
 */
export interface OrderFillState {
    /** The current fillAmount of the order according to on-chain state. */
    fillAmount: bigint;
    /**
     * The block height at which the fillAmount state for this order can be
     * pruned.
     */
    prunableBlockHeight: number;
}
export interface OrderFillStateProtoMsg {
    typeUrl: "/klyraprotocol.clob.OrderFillState";
    value: Uint8Array;
}
/**
 * OrderFillState represents the fill amount of an order according to on-chain
 * state. This proto includes both the current on-chain fill amount of the
 * order, as well as the block at which this information can be pruned from
 * state.
 */
export interface OrderFillStateAmino {
    /** The current fillAmount of the order according to on-chain state. */
    fill_amount?: string;
    /**
     * The block height at which the fillAmount state for this order can be
     * pruned.
     */
    prunable_block_height?: number;
}
export interface OrderFillStateAminoMsg {
    type: "/klyraprotocol.clob.OrderFillState";
    value: OrderFillStateAmino;
}
/**
 * OrderFillState represents the fill amount of an order according to on-chain
 * state. This proto includes both the current on-chain fill amount of the
 * order, as well as the block at which this information can be pruned from
 * state.
 */
export interface OrderFillStateSDKType {
    fill_amount: bigint;
    prunable_block_height: number;
}
/**
 * StatefulOrderTimeSliceValue represents the type of the value of the
 * `StatefulOrdersTimeSlice` in state. The `StatefulOrdersTimeSlice`
 * in state consists of key/value pairs where the keys are UTF-8-encoded
 * `RFC3339NANO` timestamp strings with right-padded zeroes and no
 * time zone info, and the values are of type `StatefulOrderTimeSliceValue`.
 * This `StatefulOrderTimeSliceValue` in state is used for managing stateful
 * order expiration. Stateful order expirations can be for either long term
 * or conditional orders.
 */
export interface StatefulOrderTimeSliceValue {
    /**
     * A unique list of order_ids that expire at this timestamp, sorted in
     * ascending order by block height and transaction index of each stateful
     * order.
     */
    orderIds: OrderId[];
}
export interface StatefulOrderTimeSliceValueProtoMsg {
    typeUrl: "/klyraprotocol.clob.StatefulOrderTimeSliceValue";
    value: Uint8Array;
}
/**
 * StatefulOrderTimeSliceValue represents the type of the value of the
 * `StatefulOrdersTimeSlice` in state. The `StatefulOrdersTimeSlice`
 * in state consists of key/value pairs where the keys are UTF-8-encoded
 * `RFC3339NANO` timestamp strings with right-padded zeroes and no
 * time zone info, and the values are of type `StatefulOrderTimeSliceValue`.
 * This `StatefulOrderTimeSliceValue` in state is used for managing stateful
 * order expiration. Stateful order expirations can be for either long term
 * or conditional orders.
 */
export interface StatefulOrderTimeSliceValueAmino {
    /**
     * A unique list of order_ids that expire at this timestamp, sorted in
     * ascending order by block height and transaction index of each stateful
     * order.
     */
    order_ids?: OrderIdAmino[];
}
export interface StatefulOrderTimeSliceValueAminoMsg {
    type: "/klyraprotocol.clob.StatefulOrderTimeSliceValue";
    value: StatefulOrderTimeSliceValueAmino;
}
/**
 * StatefulOrderTimeSliceValue represents the type of the value of the
 * `StatefulOrdersTimeSlice` in state. The `StatefulOrdersTimeSlice`
 * in state consists of key/value pairs where the keys are UTF-8-encoded
 * `RFC3339NANO` timestamp strings with right-padded zeroes and no
 * time zone info, and the values are of type `StatefulOrderTimeSliceValue`.
 * This `StatefulOrderTimeSliceValue` in state is used for managing stateful
 * order expiration. Stateful order expirations can be for either long term
 * or conditional orders.
 */
export interface StatefulOrderTimeSliceValueSDKType {
    order_ids: OrderIdSDKType[];
}
/**
 * LongTermOrderPlacement represents the placement of a stateful order in
 * state. It stores the stateful order itself and the `BlockHeight` and
 * `TransactionIndex` at which the order was placed.
 */
export interface LongTermOrderPlacement {
    order: Order;
    /**
     * The block height and transaction index at which the order was placed.
     * Used for ordering by time priority when the chain is restarted.
     */
    placementIndex: TransactionOrdering;
}
export interface LongTermOrderPlacementProtoMsg {
    typeUrl: "/klyraprotocol.clob.LongTermOrderPlacement";
    value: Uint8Array;
}
/**
 * LongTermOrderPlacement represents the placement of a stateful order in
 * state. It stores the stateful order itself and the `BlockHeight` and
 * `TransactionIndex` at which the order was placed.
 */
export interface LongTermOrderPlacementAmino {
    order?: OrderAmino;
    /**
     * The block height and transaction index at which the order was placed.
     * Used for ordering by time priority when the chain is restarted.
     */
    placement_index?: TransactionOrderingAmino;
}
export interface LongTermOrderPlacementAminoMsg {
    type: "/klyraprotocol.clob.LongTermOrderPlacement";
    value: LongTermOrderPlacementAmino;
}
/**
 * LongTermOrderPlacement represents the placement of a stateful order in
 * state. It stores the stateful order itself and the `BlockHeight` and
 * `TransactionIndex` at which the order was placed.
 */
export interface LongTermOrderPlacementSDKType {
    order: OrderSDKType;
    placement_index: TransactionOrderingSDKType;
}
/**
 * ConditionalOrderPlacement represents the placement of a conditional order in
 * state. It stores the stateful order itself, the `BlockHeight` and
 * `TransactionIndex` at which the order was placed and triggered.
 */
export interface ConditionalOrderPlacement {
    order: Order;
    /** The block height and transaction index at which the order was placed. */
    placementIndex: TransactionOrdering;
    /**
     * The block height and transaction index at which the order was triggered.
     * Set to be nil if the transaction has not been triggered.
     * Used for ordering by time priority when the chain is restarted.
     */
    triggerIndex?: TransactionOrdering;
}
export interface ConditionalOrderPlacementProtoMsg {
    typeUrl: "/klyraprotocol.clob.ConditionalOrderPlacement";
    value: Uint8Array;
}
/**
 * ConditionalOrderPlacement represents the placement of a conditional order in
 * state. It stores the stateful order itself, the `BlockHeight` and
 * `TransactionIndex` at which the order was placed and triggered.
 */
export interface ConditionalOrderPlacementAmino {
    order?: OrderAmino;
    /** The block height and transaction index at which the order was placed. */
    placement_index?: TransactionOrderingAmino;
    /**
     * The block height and transaction index at which the order was triggered.
     * Set to be nil if the transaction has not been triggered.
     * Used for ordering by time priority when the chain is restarted.
     */
    trigger_index?: TransactionOrderingAmino;
}
export interface ConditionalOrderPlacementAminoMsg {
    type: "/klyraprotocol.clob.ConditionalOrderPlacement";
    value: ConditionalOrderPlacementAmino;
}
/**
 * ConditionalOrderPlacement represents the placement of a conditional order in
 * state. It stores the stateful order itself, the `BlockHeight` and
 * `TransactionIndex` at which the order was placed and triggered.
 */
export interface ConditionalOrderPlacementSDKType {
    order: OrderSDKType;
    placement_index: TransactionOrderingSDKType;
    trigger_index?: TransactionOrderingSDKType;
}
/**
 * Order represents a single order belonging to a `Subaccount`
 * for a particular `ClobPair`.
 */
export interface Order {
    /** The unique ID of this order. Meant to be unique across all orders. */
    orderId: OrderId;
    side: Order_Side;
    /**
     * The size of this order in base quantums. Must be a multiple of
     * `ClobPair.StepBaseQuantums` (where `ClobPair.Id = orderId.ClobPairId`).
     */
    quantums: bigint;
    /**
     * The price level that this order will be placed at on the orderbook,
     * in subticks. Must be a multiple of ClobPair.SubticksPerTick
     * (where `ClobPair.Id = orderId.ClobPairId`).
     */
    subticks: bigint;
    /**
     * The last block this order can be executed at (after which it will be
     * unfillable). Used only for Short-Term orders. If this value is non-zero
     * then the order is assumed to be a Short-Term order.
     */
    goodTilBlock?: number;
    /**
     * good_til_block_time represents the unix timestamp (in seconds) at which a
     * stateful order will be considered expired. The
     * good_til_block_time is always evaluated against the previous block's
     * `BlockTime` instead of the block in which the order is committed. If this
     * value is non-zero then the order is assumed to be a stateful or
     * conditional order.
     */
    goodTilBlockTime?: number;
    /** The time in force of this order. */
    timeInForce: Order_TimeInForce;
    /**
     * Enforces that the order can only reduce the size of an existing position.
     * If a ReduceOnly order would change the side of the existing position,
     * its size is reduced to that of the remaining size of the position.
     * If existing orders on the book with ReduceOnly
     * would already close the position, the least aggressive (out-of-the-money)
     * ReduceOnly orders are resized and canceled first.
     */
    reduceOnly: boolean;
    /**
     * Set of bit flags set arbitrarily by clients and ignored by the protocol.
     * Used by indexer to infer information about a placed order.
     */
    clientMetadata: number;
    conditionType: Order_ConditionType;
    /**
     * conditional_order_trigger_subticks represents the price at which this order
     * will be triggered. If the condition_type is CONDITION_TYPE_UNSPECIFIED,
     * this value is enforced to be 0. If this value is nonzero, condition_type
     * cannot be CONDITION_TYPE_UNSPECIFIED. Value is in subticks.
     * Must be a multiple of ClobPair.SubticksPerTick (where `ClobPair.Id =
     * orderId.ClobPairId`).
     */
    conditionalOrderTriggerSubticks: bigint;
    /** Router fee ppm for the order. */
    routerFeePpm: number;
    routerSubaccountId?: SubaccountId;
}
export interface OrderProtoMsg {
    typeUrl: "/klyraprotocol.clob.Order";
    value: Uint8Array;
}
/**
 * Order represents a single order belonging to a `Subaccount`
 * for a particular `ClobPair`.
 */
export interface OrderAmino {
    /** The unique ID of this order. Meant to be unique across all orders. */
    order_id?: OrderIdAmino;
    side?: Order_Side;
    /**
     * The size of this order in base quantums. Must be a multiple of
     * `ClobPair.StepBaseQuantums` (where `ClobPair.Id = orderId.ClobPairId`).
     */
    quantums?: string;
    /**
     * The price level that this order will be placed at on the orderbook,
     * in subticks. Must be a multiple of ClobPair.SubticksPerTick
     * (where `ClobPair.Id = orderId.ClobPairId`).
     */
    subticks?: string;
    /**
     * The last block this order can be executed at (after which it will be
     * unfillable). Used only for Short-Term orders. If this value is non-zero
     * then the order is assumed to be a Short-Term order.
     */
    good_til_block?: number;
    /**
     * good_til_block_time represents the unix timestamp (in seconds) at which a
     * stateful order will be considered expired. The
     * good_til_block_time is always evaluated against the previous block's
     * `BlockTime` instead of the block in which the order is committed. If this
     * value is non-zero then the order is assumed to be a stateful or
     * conditional order.
     */
    good_til_block_time?: number;
    /** The time in force of this order. */
    time_in_force?: Order_TimeInForce;
    /**
     * Enforces that the order can only reduce the size of an existing position.
     * If a ReduceOnly order would change the side of the existing position,
     * its size is reduced to that of the remaining size of the position.
     * If existing orders on the book with ReduceOnly
     * would already close the position, the least aggressive (out-of-the-money)
     * ReduceOnly orders are resized and canceled first.
     */
    reduce_only?: boolean;
    /**
     * Set of bit flags set arbitrarily by clients and ignored by the protocol.
     * Used by indexer to infer information about a placed order.
     */
    client_metadata?: number;
    condition_type?: Order_ConditionType;
    /**
     * conditional_order_trigger_subticks represents the price at which this order
     * will be triggered. If the condition_type is CONDITION_TYPE_UNSPECIFIED,
     * this value is enforced to be 0. If this value is nonzero, condition_type
     * cannot be CONDITION_TYPE_UNSPECIFIED. Value is in subticks.
     * Must be a multiple of ClobPair.SubticksPerTick (where `ClobPair.Id =
     * orderId.ClobPairId`).
     */
    conditional_order_trigger_subticks?: string;
    /** Router fee ppm for the order. */
    router_fee_ppm?: number;
    router_subaccount_id?: SubaccountIdAmino;
}
export interface OrderAminoMsg {
    type: "/klyraprotocol.clob.Order";
    value: OrderAmino;
}
/**
 * Order represents a single order belonging to a `Subaccount`
 * for a particular `ClobPair`.
 */
export interface OrderSDKType {
    order_id: OrderIdSDKType;
    side: Order_Side;
    quantums: bigint;
    subticks: bigint;
    good_til_block?: number;
    good_til_block_time?: number;
    time_in_force: Order_TimeInForce;
    reduce_only: boolean;
    client_metadata: number;
    condition_type: Order_ConditionType;
    conditional_order_trigger_subticks: bigint;
    router_fee_ppm: number;
    router_subaccount_id?: SubaccountIdSDKType;
}
/**
 * TransactionOrdering represents a unique location in the block where a
 * transaction was placed. This proto includes both block height and the
 * transaction index that the specific transaction was placed. This information
 * is used for ordering by time priority when the chain is restarted.
 */
export interface TransactionOrdering {
    /** Block height in which the transaction was placed. */
    blockHeight: number;
    /** Within the block, the unique transaction index. */
    transactionIndex: number;
}
export interface TransactionOrderingProtoMsg {
    typeUrl: "/klyraprotocol.clob.TransactionOrdering";
    value: Uint8Array;
}
/**
 * TransactionOrdering represents a unique location in the block where a
 * transaction was placed. This proto includes both block height and the
 * transaction index that the specific transaction was placed. This information
 * is used for ordering by time priority when the chain is restarted.
 */
export interface TransactionOrderingAmino {
    /** Block height in which the transaction was placed. */
    block_height?: number;
    /** Within the block, the unique transaction index. */
    transaction_index?: number;
}
export interface TransactionOrderingAminoMsg {
    type: "/klyraprotocol.clob.TransactionOrdering";
    value: TransactionOrderingAmino;
}
/**
 * TransactionOrdering represents a unique location in the block where a
 * transaction was placed. This proto includes both block height and the
 * transaction index that the specific transaction was placed. This information
 * is used for ordering by time priority when the chain is restarted.
 */
export interface TransactionOrderingSDKType {
    block_height: number;
    transaction_index: number;
}
export declare const OrderId: {
    typeUrl: string;
    is(o: any): o is OrderId;
    isSDK(o: any): o is OrderIdSDKType;
    isAmino(o: any): o is OrderIdAmino;
    encode(message: OrderId, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OrderId;
    fromPartial(object: Partial<OrderId>): OrderId;
    fromAmino(object: OrderIdAmino): OrderId;
    toAmino(message: OrderId): OrderIdAmino;
    fromAminoMsg(object: OrderIdAminoMsg): OrderId;
    fromProtoMsg(message: OrderIdProtoMsg): OrderId;
    toProto(message: OrderId): Uint8Array;
    toProtoMsg(message: OrderId): OrderIdProtoMsg;
};
export declare const OrdersFilledDuringLatestBlock: {
    typeUrl: string;
    is(o: any): o is OrdersFilledDuringLatestBlock;
    isSDK(o: any): o is OrdersFilledDuringLatestBlockSDKType;
    isAmino(o: any): o is OrdersFilledDuringLatestBlockAmino;
    encode(message: OrdersFilledDuringLatestBlock, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OrdersFilledDuringLatestBlock;
    fromPartial(object: Partial<OrdersFilledDuringLatestBlock>): OrdersFilledDuringLatestBlock;
    fromAmino(object: OrdersFilledDuringLatestBlockAmino): OrdersFilledDuringLatestBlock;
    toAmino(message: OrdersFilledDuringLatestBlock): OrdersFilledDuringLatestBlockAmino;
    fromAminoMsg(object: OrdersFilledDuringLatestBlockAminoMsg): OrdersFilledDuringLatestBlock;
    fromProtoMsg(message: OrdersFilledDuringLatestBlockProtoMsg): OrdersFilledDuringLatestBlock;
    toProto(message: OrdersFilledDuringLatestBlock): Uint8Array;
    toProtoMsg(message: OrdersFilledDuringLatestBlock): OrdersFilledDuringLatestBlockProtoMsg;
};
export declare const PotentiallyPrunableOrders: {
    typeUrl: string;
    is(o: any): o is PotentiallyPrunableOrders;
    isSDK(o: any): o is PotentiallyPrunableOrdersSDKType;
    isAmino(o: any): o is PotentiallyPrunableOrdersAmino;
    encode(message: PotentiallyPrunableOrders, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PotentiallyPrunableOrders;
    fromPartial(object: Partial<PotentiallyPrunableOrders>): PotentiallyPrunableOrders;
    fromAmino(object: PotentiallyPrunableOrdersAmino): PotentiallyPrunableOrders;
    toAmino(message: PotentiallyPrunableOrders): PotentiallyPrunableOrdersAmino;
    fromAminoMsg(object: PotentiallyPrunableOrdersAminoMsg): PotentiallyPrunableOrders;
    fromProtoMsg(message: PotentiallyPrunableOrdersProtoMsg): PotentiallyPrunableOrders;
    toProto(message: PotentiallyPrunableOrders): Uint8Array;
    toProtoMsg(message: PotentiallyPrunableOrders): PotentiallyPrunableOrdersProtoMsg;
};
export declare const OrderFillState: {
    typeUrl: string;
    is(o: any): o is OrderFillState;
    isSDK(o: any): o is OrderFillStateSDKType;
    isAmino(o: any): o is OrderFillStateAmino;
    encode(message: OrderFillState, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OrderFillState;
    fromPartial(object: Partial<OrderFillState>): OrderFillState;
    fromAmino(object: OrderFillStateAmino): OrderFillState;
    toAmino(message: OrderFillState): OrderFillStateAmino;
    fromAminoMsg(object: OrderFillStateAminoMsg): OrderFillState;
    fromProtoMsg(message: OrderFillStateProtoMsg): OrderFillState;
    toProto(message: OrderFillState): Uint8Array;
    toProtoMsg(message: OrderFillState): OrderFillStateProtoMsg;
};
export declare const StatefulOrderTimeSliceValue: {
    typeUrl: string;
    is(o: any): o is StatefulOrderTimeSliceValue;
    isSDK(o: any): o is StatefulOrderTimeSliceValueSDKType;
    isAmino(o: any): o is StatefulOrderTimeSliceValueAmino;
    encode(message: StatefulOrderTimeSliceValue, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StatefulOrderTimeSliceValue;
    fromPartial(object: Partial<StatefulOrderTimeSliceValue>): StatefulOrderTimeSliceValue;
    fromAmino(object: StatefulOrderTimeSliceValueAmino): StatefulOrderTimeSliceValue;
    toAmino(message: StatefulOrderTimeSliceValue): StatefulOrderTimeSliceValueAmino;
    fromAminoMsg(object: StatefulOrderTimeSliceValueAminoMsg): StatefulOrderTimeSliceValue;
    fromProtoMsg(message: StatefulOrderTimeSliceValueProtoMsg): StatefulOrderTimeSliceValue;
    toProto(message: StatefulOrderTimeSliceValue): Uint8Array;
    toProtoMsg(message: StatefulOrderTimeSliceValue): StatefulOrderTimeSliceValueProtoMsg;
};
export declare const LongTermOrderPlacement: {
    typeUrl: string;
    is(o: any): o is LongTermOrderPlacement;
    isSDK(o: any): o is LongTermOrderPlacementSDKType;
    isAmino(o: any): o is LongTermOrderPlacementAmino;
    encode(message: LongTermOrderPlacement, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): LongTermOrderPlacement;
    fromPartial(object: Partial<LongTermOrderPlacement>): LongTermOrderPlacement;
    fromAmino(object: LongTermOrderPlacementAmino): LongTermOrderPlacement;
    toAmino(message: LongTermOrderPlacement): LongTermOrderPlacementAmino;
    fromAminoMsg(object: LongTermOrderPlacementAminoMsg): LongTermOrderPlacement;
    fromProtoMsg(message: LongTermOrderPlacementProtoMsg): LongTermOrderPlacement;
    toProto(message: LongTermOrderPlacement): Uint8Array;
    toProtoMsg(message: LongTermOrderPlacement): LongTermOrderPlacementProtoMsg;
};
export declare const ConditionalOrderPlacement: {
    typeUrl: string;
    is(o: any): o is ConditionalOrderPlacement;
    isSDK(o: any): o is ConditionalOrderPlacementSDKType;
    isAmino(o: any): o is ConditionalOrderPlacementAmino;
    encode(message: ConditionalOrderPlacement, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ConditionalOrderPlacement;
    fromPartial(object: Partial<ConditionalOrderPlacement>): ConditionalOrderPlacement;
    fromAmino(object: ConditionalOrderPlacementAmino): ConditionalOrderPlacement;
    toAmino(message: ConditionalOrderPlacement): ConditionalOrderPlacementAmino;
    fromAminoMsg(object: ConditionalOrderPlacementAminoMsg): ConditionalOrderPlacement;
    fromProtoMsg(message: ConditionalOrderPlacementProtoMsg): ConditionalOrderPlacement;
    toProto(message: ConditionalOrderPlacement): Uint8Array;
    toProtoMsg(message: ConditionalOrderPlacement): ConditionalOrderPlacementProtoMsg;
};
export declare const Order: {
    typeUrl: string;
    is(o: any): o is Order;
    isSDK(o: any): o is OrderSDKType;
    isAmino(o: any): o is OrderAmino;
    encode(message: Order, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Order;
    fromPartial(object: Partial<Order>): Order;
    fromAmino(object: OrderAmino): Order;
    toAmino(message: Order): OrderAmino;
    fromAminoMsg(object: OrderAminoMsg): Order;
    fromProtoMsg(message: OrderProtoMsg): Order;
    toProto(message: Order): Uint8Array;
    toProtoMsg(message: Order): OrderProtoMsg;
};
export declare const TransactionOrdering: {
    typeUrl: string;
    is(o: any): o is TransactionOrdering;
    isSDK(o: any): o is TransactionOrderingSDKType;
    isAmino(o: any): o is TransactionOrderingAmino;
    encode(message: TransactionOrdering, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TransactionOrdering;
    fromPartial(object: Partial<TransactionOrdering>): TransactionOrdering;
    fromAmino(object: TransactionOrderingAmino): TransactionOrdering;
    toAmino(message: TransactionOrdering): TransactionOrderingAmino;
    fromAminoMsg(object: TransactionOrderingAminoMsg): TransactionOrdering;
    fromProtoMsg(message: TransactionOrderingProtoMsg): TransactionOrdering;
    toProto(message: TransactionOrdering): Uint8Array;
    toProtoMsg(message: TransactionOrdering): TransactionOrderingProtoMsg;
};
