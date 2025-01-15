import { IndexerSubaccountId, IndexerSubaccountIdAmino, IndexerSubaccountIdSDKType } from "./subaccount";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/**
 * Represents the side of the orderbook the order will be placed on.
 * Note that Side.SIDE_UNSPECIFIED is an invalid order and cannot be
 * placed on the orderbook.
 */
export declare enum IndexerOrder_Side {
    /** SIDE_UNSPECIFIED - Default value. This value is invalid and unused. */
    SIDE_UNSPECIFIED = 0,
    /** SIDE_BUY - SIDE_BUY is used to represent a BUY order. */
    SIDE_BUY = 1,
    /** SIDE_SELL - SIDE_SELL is used to represent a SELL order. */
    SIDE_SELL = 2,
    UNRECOGNIZED = -1
}
export declare const IndexerOrder_SideSDKType: typeof IndexerOrder_Side;
export declare const IndexerOrder_SideAmino: typeof IndexerOrder_Side;
export declare function indexerOrder_SideFromJSON(object: any): IndexerOrder_Side;
export declare function indexerOrder_SideToJSON(object: IndexerOrder_Side): string;
/**
 * TimeInForce indicates how long an order will remain active before it
 * is executed or expires.
 */
export declare enum IndexerOrder_TimeInForce {
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
export declare const IndexerOrder_TimeInForceSDKType: typeof IndexerOrder_TimeInForce;
export declare const IndexerOrder_TimeInForceAmino: typeof IndexerOrder_TimeInForce;
export declare function indexerOrder_TimeInForceFromJSON(object: any): IndexerOrder_TimeInForce;
export declare function indexerOrder_TimeInForceToJSON(object: IndexerOrder_TimeInForce): string;
export declare enum IndexerOrder_ConditionType {
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
export declare const IndexerOrder_ConditionTypeSDKType: typeof IndexerOrder_ConditionType;
export declare const IndexerOrder_ConditionTypeAmino: typeof IndexerOrder_ConditionType;
export declare function indexerOrder_ConditionTypeFromJSON(object: any): IndexerOrder_ConditionType;
export declare function indexerOrder_ConditionTypeToJSON(object: IndexerOrder_ConditionType): string;
/**
 * Status of the CLOB.
 * Defined in clob.clob_pair
 */
export declare enum ClobPairStatus {
    /** CLOB_PAIR_STATUS_UNSPECIFIED - Default value. This value is invalid and unused. */
    CLOB_PAIR_STATUS_UNSPECIFIED = 0,
    /**
     * CLOB_PAIR_STATUS_ACTIVE - CLOB_PAIR_STATUS_ACTIVE behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    CLOB_PAIR_STATUS_ACTIVE = 1,
    /**
     * CLOB_PAIR_STATUS_PAUSED - CLOB_PAIR_STATUS_PAUSED behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    CLOB_PAIR_STATUS_PAUSED = 2,
    /**
     * CLOB_PAIR_STATUS_CANCEL_ONLY - CLOB_PAIR_STATUS_CANCEL_ONLY behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    CLOB_PAIR_STATUS_CANCEL_ONLY = 3,
    /**
     * CLOB_PAIR_STATUS_POST_ONLY - CLOB_PAIR_STATUS_POST_ONLY behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    CLOB_PAIR_STATUS_POST_ONLY = 4,
    /**
     * CLOB_PAIR_STATUS_INITIALIZING - CLOB_PAIR_STATUS_INITIALIZING represents a newly-added clob pair.
     * Clob pairs in this state only accept orders which are
     * both short-term and post-only.
     */
    CLOB_PAIR_STATUS_INITIALIZING = 5,
    /**
     * CLOB_PAIR_STATUS_FINAL_SETTLEMENT - CLOB_PAIR_STATUS_FINAL_SETTLEMENT represents a clob pair that has been
     * deactivated. Clob pairs in this state do not accept new orders and trading
     * is blocked. All open positions are closed and open stateful orders canceled
     * by the protocol when the clob pair transitions to this status. All
     * short-term orders are left to expire.
     */
    CLOB_PAIR_STATUS_FINAL_SETTLEMENT = 6,
    UNRECOGNIZED = -1
}
export declare const ClobPairStatusSDKType: typeof ClobPairStatus;
export declare const ClobPairStatusAmino: typeof ClobPairStatus;
export declare function clobPairStatusFromJSON(object: any): ClobPairStatus;
export declare function clobPairStatusToJSON(object: ClobPairStatus): string;
/** IndexerOrderId refers to a single order belonging to a Subaccount. */
export interface IndexerOrderId {
    /**
     * The subaccount ID that opened this order.
     * Note that this field has `gogoproto.nullable = false` so that it is
     * generated as a value instead of a pointer. This is because the `OrderId`
     * proto is used as a key within maps, and map comparisons will compare
     * pointers for equality (when the desired behavior is to compare the values).
     */
    subaccountId: IndexerSubaccountId;
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
export interface IndexerOrderIdProtoMsg {
    typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerOrderId";
    value: Uint8Array;
}
/** IndexerOrderId refers to a single order belonging to a Subaccount. */
export interface IndexerOrderIdAmino {
    /**
     * The subaccount ID that opened this order.
     * Note that this field has `gogoproto.nullable = false` so that it is
     * generated as a value instead of a pointer. This is because the `OrderId`
     * proto is used as a key within maps, and map comparisons will compare
     * pointers for equality (when the desired behavior is to compare the values).
     */
    subaccount_id?: IndexerSubaccountIdAmino;
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
export interface IndexerOrderIdAminoMsg {
    type: "/klyraprotocol.indexer.protocol.v1.IndexerOrderId";
    value: IndexerOrderIdAmino;
}
/** IndexerOrderId refers to a single order belonging to a Subaccount. */
export interface IndexerOrderIdSDKType {
    subaccount_id: IndexerSubaccountIdSDKType;
    client_id: number;
    order_flags: number;
    clob_pair_id: number;
}
/**
 * IndexerOrderV1 represents a single order belonging to a `Subaccount`
 * for a particular `ClobPair`.
 */
export interface IndexerOrder {
    /** The unique ID of this order. Meant to be unique across all orders. */
    orderId: IndexerOrderId;
    side: IndexerOrder_Side;
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
    timeInForce: IndexerOrder_TimeInForce;
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
    conditionType: IndexerOrder_ConditionType;
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
    /** Router fee subaccount owner. */
    routerFeeSubaccountOwner: string;
    /** Router fee subaccount number. */
    routerFeeSubaccountNumber: number;
}
export interface IndexerOrderProtoMsg {
    typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerOrder";
    value: Uint8Array;
}
/**
 * IndexerOrderV1 represents a single order belonging to a `Subaccount`
 * for a particular `ClobPair`.
 */
export interface IndexerOrderAmino {
    /** The unique ID of this order. Meant to be unique across all orders. */
    order_id?: IndexerOrderIdAmino;
    side?: IndexerOrder_Side;
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
    time_in_force?: IndexerOrder_TimeInForce;
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
    condition_type?: IndexerOrder_ConditionType;
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
    /** Router fee subaccount owner. */
    router_fee_subaccount_owner?: string;
    /** Router fee subaccount number. */
    router_fee_subaccount_number?: number;
}
export interface IndexerOrderAminoMsg {
    type: "/klyraprotocol.indexer.protocol.v1.IndexerOrder";
    value: IndexerOrderAmino;
}
/**
 * IndexerOrderV1 represents a single order belonging to a `Subaccount`
 * for a particular `ClobPair`.
 */
export interface IndexerOrderSDKType {
    order_id: IndexerOrderIdSDKType;
    side: IndexerOrder_Side;
    quantums: bigint;
    subticks: bigint;
    good_til_block?: number;
    good_til_block_time?: number;
    time_in_force: IndexerOrder_TimeInForce;
    reduce_only: boolean;
    client_metadata: number;
    condition_type: IndexerOrder_ConditionType;
    conditional_order_trigger_subticks: bigint;
    router_fee_ppm: number;
    router_fee_subaccount_owner: string;
    router_fee_subaccount_number: number;
}
export declare const IndexerOrderId: {
    typeUrl: string;
    is(o: any): o is IndexerOrderId;
    isSDK(o: any): o is IndexerOrderIdSDKType;
    isAmino(o: any): o is IndexerOrderIdAmino;
    encode(message: IndexerOrderId, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): IndexerOrderId;
    fromPartial(object: Partial<IndexerOrderId>): IndexerOrderId;
    fromAmino(object: IndexerOrderIdAmino): IndexerOrderId;
    toAmino(message: IndexerOrderId): IndexerOrderIdAmino;
    fromAminoMsg(object: IndexerOrderIdAminoMsg): IndexerOrderId;
    fromProtoMsg(message: IndexerOrderIdProtoMsg): IndexerOrderId;
    toProto(message: IndexerOrderId): Uint8Array;
    toProtoMsg(message: IndexerOrderId): IndexerOrderIdProtoMsg;
};
export declare const IndexerOrder: {
    typeUrl: string;
    is(o: any): o is IndexerOrder;
    isSDK(o: any): o is IndexerOrderSDKType;
    isAmino(o: any): o is IndexerOrderAmino;
    encode(message: IndexerOrder, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): IndexerOrder;
    fromPartial(object: Partial<IndexerOrder>): IndexerOrder;
    fromAmino(object: IndexerOrderAmino): IndexerOrder;
    toAmino(message: IndexerOrder): IndexerOrderAmino;
    fromAminoMsg(object: IndexerOrderAminoMsg): IndexerOrder;
    fromProtoMsg(message: IndexerOrderProtoMsg): IndexerOrder;
    toProto(message: IndexerOrder): Uint8Array;
    toProtoMsg(message: IndexerOrder): IndexerOrderProtoMsg;
};
