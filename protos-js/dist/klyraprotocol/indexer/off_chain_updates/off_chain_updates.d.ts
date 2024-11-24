import { IndexerOrder, IndexerOrderAmino, IndexerOrderSDKType, IndexerOrderId, IndexerOrderIdAmino, IndexerOrderIdSDKType } from "../protocol/v1/clob";
import { OrderRemovalReason } from "../shared/removal_reason";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * OrderPlacementStatus is an enum for the resulting status after an order is
 * placed.
 */
export declare enum OrderPlaceV1_OrderPlacementStatus {
    /** ORDER_PLACEMENT_STATUS_UNSPECIFIED - Default value, this is invalid and unused. */
    ORDER_PLACEMENT_STATUS_UNSPECIFIED = 0,
    /**
     * ORDER_PLACEMENT_STATUS_BEST_EFFORT_OPENED - A best effort opened order is one that has only been confirmed to be
     * placed on the Klyra node sending the off-chain update message.
     * The cases where this happens includes:
     * - The Klyra node places an order in it's in-memory orderbook during the
     *   CheckTx flow.
     * A best effort placed order may not have been placed on other Klyra
     * nodes including other Klyra validator nodes and may still be excluded in
     * future order matches.
     */
    ORDER_PLACEMENT_STATUS_BEST_EFFORT_OPENED = 1,
    /**
     * ORDER_PLACEMENT_STATUS_OPENED - An opened order is one that is confirmed to be placed on all Klyra nodes
     * (discounting dishonest Klyra nodes) and will be included in any future
     * order matches.
     * This status is used internally by the indexer and will not be sent
     * out by protocol.
     */
    ORDER_PLACEMENT_STATUS_OPENED = 2,
    UNRECOGNIZED = -1
}
export declare const OrderPlaceV1_OrderPlacementStatusSDKType: typeof OrderPlaceV1_OrderPlacementStatus;
export declare const OrderPlaceV1_OrderPlacementStatusAmino: typeof OrderPlaceV1_OrderPlacementStatus;
export declare function orderPlaceV1_OrderPlacementStatusFromJSON(object: any): OrderPlaceV1_OrderPlacementStatus;
export declare function orderPlaceV1_OrderPlacementStatusToJSON(object: OrderPlaceV1_OrderPlacementStatus): string;
/**
 * OrderRemovalStatus is an enum for the resulting status after an order is
 * removed.
 */
export declare enum OrderRemoveV1_OrderRemovalStatus {
    /** ORDER_REMOVAL_STATUS_UNSPECIFIED - Default value, this is invalid and unused. */
    ORDER_REMOVAL_STATUS_UNSPECIFIED = 0,
    /**
     * ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED - A best effort canceled order is one that has only been confirmed to be
     * removed on the Klyra node sending the off-chain update message.
     * The cases where this happens includes:
     * - the order was removed due to the Klyra node receiving a CancelOrder
     *   transaction for the order.
     * - the order was removed due to being undercollateralized during
     *   optimistic matching.
     * A best effort canceled order may not have been removed on other Klyra
     * nodes including other Klyra validator nodes and may still be included in
     * future order matches.
     */
    ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED = 1,
    /**
     * ORDER_REMOVAL_STATUS_CANCELED - A canceled order is one that is confirmed to be removed on all Klyra nodes
     * (discounting dishonest Klyra nodes) and will not be included in any future
     * order matches.
     * The cases where this happens includes:
     * - the order is expired.
     */
    ORDER_REMOVAL_STATUS_CANCELED = 2,
    /** ORDER_REMOVAL_STATUS_FILLED - An order was fully-filled. Only sent by the Indexer for stateful orders. */
    ORDER_REMOVAL_STATUS_FILLED = 3,
    UNRECOGNIZED = -1
}
export declare const OrderRemoveV1_OrderRemovalStatusSDKType: typeof OrderRemoveV1_OrderRemovalStatus;
export declare const OrderRemoveV1_OrderRemovalStatusAmino: typeof OrderRemoveV1_OrderRemovalStatus;
export declare function orderRemoveV1_OrderRemovalStatusFromJSON(object: any): OrderRemoveV1_OrderRemovalStatus;
export declare function orderRemoveV1_OrderRemovalStatusToJSON(object: OrderRemoveV1_OrderRemovalStatus): string;
/** OrderPlace messages contain the order placed/replaced. */
export interface OrderPlaceV1 {
    order?: IndexerOrder;
    placementStatus: OrderPlaceV1_OrderPlacementStatus;
}
export interface OrderPlaceV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.off_chain_updates.OrderPlaceV1";
    value: Uint8Array;
}
/** OrderPlace messages contain the order placed/replaced. */
export interface OrderPlaceV1Amino {
    order?: IndexerOrderAmino;
    placement_status?: OrderPlaceV1_OrderPlacementStatus;
}
export interface OrderPlaceV1AminoMsg {
    type: "/klyraprotocol.indexer.off_chain_updates.OrderPlaceV1";
    value: OrderPlaceV1Amino;
}
/** OrderPlace messages contain the order placed/replaced. */
export interface OrderPlaceV1SDKType {
    order?: IndexerOrderSDKType;
    placement_status: OrderPlaceV1_OrderPlacementStatus;
}
/**
 * OrderRemove messages contain the id of the order removed, the reason for the
 * removal and the resulting status from the removal.
 */
export interface OrderRemoveV1 {
    removedOrderId?: IndexerOrderId;
    reason: OrderRemovalReason;
    removalStatus: OrderRemoveV1_OrderRemovalStatus;
}
export interface OrderRemoveV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.off_chain_updates.OrderRemoveV1";
    value: Uint8Array;
}
/**
 * OrderRemove messages contain the id of the order removed, the reason for the
 * removal and the resulting status from the removal.
 */
export interface OrderRemoveV1Amino {
    removed_order_id?: IndexerOrderIdAmino;
    reason?: OrderRemovalReason;
    removal_status?: OrderRemoveV1_OrderRemovalStatus;
}
export interface OrderRemoveV1AminoMsg {
    type: "/klyraprotocol.indexer.off_chain_updates.OrderRemoveV1";
    value: OrderRemoveV1Amino;
}
/**
 * OrderRemove messages contain the id of the order removed, the reason for the
 * removal and the resulting status from the removal.
 */
export interface OrderRemoveV1SDKType {
    removed_order_id?: IndexerOrderIdSDKType;
    reason: OrderRemovalReason;
    removal_status: OrderRemoveV1_OrderRemovalStatus;
}
/**
 * OrderUpdate messages contain the id of the order being updated, and the
 * updated total filled quantums of the order.
 */
export interface OrderUpdateV1 {
    orderId?: IndexerOrderId;
    totalFilledQuantums: bigint;
}
export interface OrderUpdateV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.off_chain_updates.OrderUpdateV1";
    value: Uint8Array;
}
/**
 * OrderUpdate messages contain the id of the order being updated, and the
 * updated total filled quantums of the order.
 */
export interface OrderUpdateV1Amino {
    order_id?: IndexerOrderIdAmino;
    total_filled_quantums?: string;
}
export interface OrderUpdateV1AminoMsg {
    type: "/klyraprotocol.indexer.off_chain_updates.OrderUpdateV1";
    value: OrderUpdateV1Amino;
}
/**
 * OrderUpdate messages contain the id of the order being updated, and the
 * updated total filled quantums of the order.
 */
export interface OrderUpdateV1SDKType {
    order_id?: IndexerOrderIdSDKType;
    total_filled_quantums: bigint;
}
/**
 * An OffChainUpdate message is the message type which will be sent on Kafka to
 * the Indexer.
 */
export interface OffChainUpdateV1 {
    orderPlace?: OrderPlaceV1;
    orderRemove?: OrderRemoveV1;
    orderUpdate?: OrderUpdateV1;
}
export interface OffChainUpdateV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.off_chain_updates.OffChainUpdateV1";
    value: Uint8Array;
}
/**
 * An OffChainUpdate message is the message type which will be sent on Kafka to
 * the Indexer.
 */
export interface OffChainUpdateV1Amino {
    order_place?: OrderPlaceV1Amino;
    order_remove?: OrderRemoveV1Amino;
    order_update?: OrderUpdateV1Amino;
}
export interface OffChainUpdateV1AminoMsg {
    type: "/klyraprotocol.indexer.off_chain_updates.OffChainUpdateV1";
    value: OffChainUpdateV1Amino;
}
/**
 * An OffChainUpdate message is the message type which will be sent on Kafka to
 * the Indexer.
 */
export interface OffChainUpdateV1SDKType {
    order_place?: OrderPlaceV1SDKType;
    order_remove?: OrderRemoveV1SDKType;
    order_update?: OrderUpdateV1SDKType;
}
export declare const OrderPlaceV1: {
    typeUrl: string;
    is(o: any): o is OrderPlaceV1;
    isSDK(o: any): o is OrderPlaceV1SDKType;
    isAmino(o: any): o is OrderPlaceV1Amino;
    encode(message: OrderPlaceV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OrderPlaceV1;
    fromPartial(object: Partial<OrderPlaceV1>): OrderPlaceV1;
    fromAmino(object: OrderPlaceV1Amino): OrderPlaceV1;
    toAmino(message: OrderPlaceV1): OrderPlaceV1Amino;
    fromAminoMsg(object: OrderPlaceV1AminoMsg): OrderPlaceV1;
    fromProtoMsg(message: OrderPlaceV1ProtoMsg): OrderPlaceV1;
    toProto(message: OrderPlaceV1): Uint8Array;
    toProtoMsg(message: OrderPlaceV1): OrderPlaceV1ProtoMsg;
};
export declare const OrderRemoveV1: {
    typeUrl: string;
    is(o: any): o is OrderRemoveV1;
    isSDK(o: any): o is OrderRemoveV1SDKType;
    isAmino(o: any): o is OrderRemoveV1Amino;
    encode(message: OrderRemoveV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OrderRemoveV1;
    fromPartial(object: Partial<OrderRemoveV1>): OrderRemoveV1;
    fromAmino(object: OrderRemoveV1Amino): OrderRemoveV1;
    toAmino(message: OrderRemoveV1): OrderRemoveV1Amino;
    fromAminoMsg(object: OrderRemoveV1AminoMsg): OrderRemoveV1;
    fromProtoMsg(message: OrderRemoveV1ProtoMsg): OrderRemoveV1;
    toProto(message: OrderRemoveV1): Uint8Array;
    toProtoMsg(message: OrderRemoveV1): OrderRemoveV1ProtoMsg;
};
export declare const OrderUpdateV1: {
    typeUrl: string;
    is(o: any): o is OrderUpdateV1;
    isSDK(o: any): o is OrderUpdateV1SDKType;
    isAmino(o: any): o is OrderUpdateV1Amino;
    encode(message: OrderUpdateV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OrderUpdateV1;
    fromPartial(object: Partial<OrderUpdateV1>): OrderUpdateV1;
    fromAmino(object: OrderUpdateV1Amino): OrderUpdateV1;
    toAmino(message: OrderUpdateV1): OrderUpdateV1Amino;
    fromAminoMsg(object: OrderUpdateV1AminoMsg): OrderUpdateV1;
    fromProtoMsg(message: OrderUpdateV1ProtoMsg): OrderUpdateV1;
    toProto(message: OrderUpdateV1): Uint8Array;
    toProtoMsg(message: OrderUpdateV1): OrderUpdateV1ProtoMsg;
};
export declare const OffChainUpdateV1: {
    typeUrl: string;
    is(o: any): o is OffChainUpdateV1;
    isSDK(o: any): o is OffChainUpdateV1SDKType;
    isAmino(o: any): o is OffChainUpdateV1Amino;
    encode(message: OffChainUpdateV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OffChainUpdateV1;
    fromPartial(object: Partial<OffChainUpdateV1>): OffChainUpdateV1;
    fromAmino(object: OffChainUpdateV1Amino): OffChainUpdateV1;
    toAmino(message: OffChainUpdateV1): OffChainUpdateV1Amino;
    fromAminoMsg(object: OffChainUpdateV1AminoMsg): OffChainUpdateV1;
    fromProtoMsg(message: OffChainUpdateV1ProtoMsg): OffChainUpdateV1;
    toProto(message: OffChainUpdateV1): Uint8Array;
    toProtoMsg(message: OffChainUpdateV1): OffChainUpdateV1ProtoMsg;
};
