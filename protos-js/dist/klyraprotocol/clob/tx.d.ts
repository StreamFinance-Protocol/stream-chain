import { Order, OrderAmino, OrderSDKType, OrderId, OrderIdAmino, OrderIdSDKType } from "./order";
import { SubaccountId, SubaccountIdAmino, SubaccountIdSDKType } from "../subaccounts/subaccount";
import { ClobPair, ClobPairAmino, ClobPairSDKType } from "./clob_pair";
import { EquityTierLimitConfiguration, EquityTierLimitConfigurationAmino, EquityTierLimitConfigurationSDKType } from "./equity_tier_limit_config";
import { BlockRateLimitConfiguration, BlockRateLimitConfigurationAmino, BlockRateLimitConfigurationSDKType } from "./block_rate_limit_config";
import { LiquidationsConfig, LiquidationsConfigAmino, LiquidationsConfigSDKType } from "./liquidations_config";
import { ClobMatch, ClobMatchAmino, ClobMatchSDKType } from "./matches";
import { OrderRemoval, OrderRemovalAmino, OrderRemovalSDKType } from "./order_removals";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgCreateClobPair is a message used by x/gov for creating a new clob pair. */
export interface MsgCreateClobPair {
    /** The address that controls the module. */
    authority: string;
    /** `clob_pair` defines parameters for the new clob pair. */
    clobPair: ClobPair;
}
export interface MsgCreateClobPairProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgCreateClobPair";
    value: Uint8Array;
}
/** MsgCreateClobPair is a message used by x/gov for creating a new clob pair. */
export interface MsgCreateClobPairAmino {
    /** The address that controls the module. */
    authority?: string;
    /** `clob_pair` defines parameters for the new clob pair. */
    clob_pair?: ClobPairAmino;
}
export interface MsgCreateClobPairAminoMsg {
    type: "/klyraprotocol.clob.MsgCreateClobPair";
    value: MsgCreateClobPairAmino;
}
/** MsgCreateClobPair is a message used by x/gov for creating a new clob pair. */
export interface MsgCreateClobPairSDKType {
    authority: string;
    clob_pair: ClobPairSDKType;
}
/** MsgCreateClobPairResponse defines the CreateClobPair response type. */
export interface MsgCreateClobPairResponse {
}
export interface MsgCreateClobPairResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgCreateClobPairResponse";
    value: Uint8Array;
}
/** MsgCreateClobPairResponse defines the CreateClobPair response type. */
export interface MsgCreateClobPairResponseAmino {
}
export interface MsgCreateClobPairResponseAminoMsg {
    type: "/klyraprotocol.clob.MsgCreateClobPairResponse";
    value: MsgCreateClobPairResponseAmino;
}
/** MsgCreateClobPairResponse defines the CreateClobPair response type. */
export interface MsgCreateClobPairResponseSDKType {
}
/**
 * MsgProposedOperations is a message injected by block proposers to
 * specify the operations that occurred in a block.
 */
export interface MsgProposedOperations {
    /** The list of operations proposed by the block proposer. */
    operationsQueue: OperationRaw[];
}
export interface MsgProposedOperationsProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgProposedOperations";
    value: Uint8Array;
}
/**
 * MsgProposedOperations is a message injected by block proposers to
 * specify the operations that occurred in a block.
 */
export interface MsgProposedOperationsAmino {
    /** The list of operations proposed by the block proposer. */
    operations_queue?: OperationRawAmino[];
}
export interface MsgProposedOperationsAminoMsg {
    type: "/klyraprotocol.clob.MsgProposedOperations";
    value: MsgProposedOperationsAmino;
}
/**
 * MsgProposedOperations is a message injected by block proposers to
 * specify the operations that occurred in a block.
 */
export interface MsgProposedOperationsSDKType {
    operations_queue: OperationRawSDKType[];
}
/**
 * MsgProposedOperationsResponse is the response type of the message injected
 * by block proposers to specify the operations that occurred in a block.
 */
export interface MsgProposedOperationsResponse {
}
export interface MsgProposedOperationsResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgProposedOperationsResponse";
    value: Uint8Array;
}
/**
 * MsgProposedOperationsResponse is the response type of the message injected
 * by block proposers to specify the operations that occurred in a block.
 */
export interface MsgProposedOperationsResponseAmino {
}
export interface MsgProposedOperationsResponseAminoMsg {
    type: "/klyraprotocol.clob.MsgProposedOperationsResponse";
    value: MsgProposedOperationsResponseAmino;
}
/**
 * MsgProposedOperationsResponse is the response type of the message injected
 * by block proposers to specify the operations that occurred in a block.
 */
export interface MsgProposedOperationsResponseSDKType {
}
/** MsgPlaceOrder is a request type used for placing orders. */
export interface MsgPlaceOrder {
    order: Order;
}
export interface MsgPlaceOrderProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgPlaceOrder";
    value: Uint8Array;
}
/** MsgPlaceOrder is a request type used for placing orders. */
export interface MsgPlaceOrderAmino {
    order?: OrderAmino;
}
export interface MsgPlaceOrderAminoMsg {
    type: "/klyraprotocol.clob.MsgPlaceOrder";
    value: MsgPlaceOrderAmino;
}
/** MsgPlaceOrder is a request type used for placing orders. */
export interface MsgPlaceOrderSDKType {
    order: OrderSDKType;
}
/** MsgPlaceOrderResponse is a response type used for placing orders. */
export interface MsgPlaceOrderResponse {
}
export interface MsgPlaceOrderResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgPlaceOrderResponse";
    value: Uint8Array;
}
/** MsgPlaceOrderResponse is a response type used for placing orders. */
export interface MsgPlaceOrderResponseAmino {
}
export interface MsgPlaceOrderResponseAminoMsg {
    type: "/klyraprotocol.clob.MsgPlaceOrderResponse";
    value: MsgPlaceOrderResponseAmino;
}
/** MsgPlaceOrderResponse is a response type used for placing orders. */
export interface MsgPlaceOrderResponseSDKType {
}
/** MsgCancelOrder is a request type used for canceling orders. */
export interface MsgCancelOrder {
    orderId: OrderId;
    /**
     * The last block this order cancellation can be executed at.
     * Used only for Short-Term orders and must be zero for stateful orders.
     */
    goodTilBlock?: number;
    /**
     * good_til_block_time represents the unix timestamp (in seconds) at which a
     * stateful order cancellation will be considered expired. The
     * good_til_block_time is always evaluated against the previous block's
     * `BlockTime` instead of the block in which the order is committed.
     * This value must be zero for Short-Term orders.
     */
    goodTilBlockTime?: number;
}
export interface MsgCancelOrderProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgCancelOrder";
    value: Uint8Array;
}
/** MsgCancelOrder is a request type used for canceling orders. */
export interface MsgCancelOrderAmino {
    order_id?: OrderIdAmino;
    /**
     * The last block this order cancellation can be executed at.
     * Used only for Short-Term orders and must be zero for stateful orders.
     */
    good_til_block?: number;
    /**
     * good_til_block_time represents the unix timestamp (in seconds) at which a
     * stateful order cancellation will be considered expired. The
     * good_til_block_time is always evaluated against the previous block's
     * `BlockTime` instead of the block in which the order is committed.
     * This value must be zero for Short-Term orders.
     */
    good_til_block_time?: number;
}
export interface MsgCancelOrderAminoMsg {
    type: "/klyraprotocol.clob.MsgCancelOrder";
    value: MsgCancelOrderAmino;
}
/** MsgCancelOrder is a request type used for canceling orders. */
export interface MsgCancelOrderSDKType {
    order_id: OrderIdSDKType;
    good_til_block?: number;
    good_til_block_time?: number;
}
/** MsgCancelOrderResponse is a response type used for canceling orders. */
export interface MsgCancelOrderResponse {
}
export interface MsgCancelOrderResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgCancelOrderResponse";
    value: Uint8Array;
}
/** MsgCancelOrderResponse is a response type used for canceling orders. */
export interface MsgCancelOrderResponseAmino {
}
export interface MsgCancelOrderResponseAminoMsg {
    type: "/klyraprotocol.clob.MsgCancelOrderResponse";
    value: MsgCancelOrderResponseAmino;
}
/** MsgCancelOrderResponse is a response type used for canceling orders. */
export interface MsgCancelOrderResponseSDKType {
}
/**
 * MsgBatchCancel is a request type used for batch canceling orders.
 * This msg is not atomic. Cancels will be performed optimistically even
 * if some cancels are invalid or fail.
 */
export interface MsgBatchCancel {
    /** The subaccount this batch cancel will be applied for. */
    subaccountId: SubaccountId;
    /** The batch of short term orders that will be cancelled. */
    shortTermCancels: OrderBatch[];
    /** The last block the short term order cancellations can be executed at. */
    goodTilBlock: number;
}
export interface MsgBatchCancelProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgBatchCancel";
    value: Uint8Array;
}
/**
 * MsgBatchCancel is a request type used for batch canceling orders.
 * This msg is not atomic. Cancels will be performed optimistically even
 * if some cancels are invalid or fail.
 */
export interface MsgBatchCancelAmino {
    /** The subaccount this batch cancel will be applied for. */
    subaccount_id?: SubaccountIdAmino;
    /** The batch of short term orders that will be cancelled. */
    short_term_cancels?: OrderBatchAmino[];
    /** The last block the short term order cancellations can be executed at. */
    good_til_block?: number;
}
export interface MsgBatchCancelAminoMsg {
    type: "/klyraprotocol.clob.MsgBatchCancel";
    value: MsgBatchCancelAmino;
}
/**
 * MsgBatchCancel is a request type used for batch canceling orders.
 * This msg is not atomic. Cancels will be performed optimistically even
 * if some cancels are invalid or fail.
 */
export interface MsgBatchCancelSDKType {
    subaccount_id: SubaccountIdSDKType;
    short_term_cancels: OrderBatchSDKType[];
    good_til_block: number;
}
/**
 * OrderBatch represents a batch of orders all belonging to a single clob pair
 * id. Along with a subaccount id and an order flag, is used to represent a
 * batch of orders that share the same subaccount, order flag, and clob pair id.
 */
export interface OrderBatch {
    /** The Clob Pair ID all orders in this order batch belong to. */
    clobPairId: number;
    /**
     * List of client ids in this order batch.
     * Note that this is serialized as a uint32 instead of a fixed32 to
     * avoid issues when decoding repeated packed fixed32.
     */
    clientIds: number[];
}
export interface OrderBatchProtoMsg {
    typeUrl: "/klyraprotocol.clob.OrderBatch";
    value: Uint8Array;
}
/**
 * OrderBatch represents a batch of orders all belonging to a single clob pair
 * id. Along with a subaccount id and an order flag, is used to represent a
 * batch of orders that share the same subaccount, order flag, and clob pair id.
 */
export interface OrderBatchAmino {
    /** The Clob Pair ID all orders in this order batch belong to. */
    clob_pair_id?: number;
    /**
     * List of client ids in this order batch.
     * Note that this is serialized as a uint32 instead of a fixed32 to
     * avoid issues when decoding repeated packed fixed32.
     */
    client_ids?: number[];
}
export interface OrderBatchAminoMsg {
    type: "/klyraprotocol.clob.OrderBatch";
    value: OrderBatchAmino;
}
/**
 * OrderBatch represents a batch of orders all belonging to a single clob pair
 * id. Along with a subaccount id and an order flag, is used to represent a
 * batch of orders that share the same subaccount, order flag, and clob pair id.
 */
export interface OrderBatchSDKType {
    clob_pair_id: number;
    client_ids: number[];
}
/**
 * MsgBatchCancelResponse is a response type used for batch canceling orders.
 * It indicates which cancel orders have succeeded or failed.
 */
export interface MsgBatchCancelResponse {
    /** A batch of short term cancel orders that have succeeded. */
    shortTermSucceeded: OrderBatch[];
    /** A batch of short term cancel orders that have failed. */
    shortTermFailed: OrderBatch[];
}
export interface MsgBatchCancelResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgBatchCancelResponse";
    value: Uint8Array;
}
/**
 * MsgBatchCancelResponse is a response type used for batch canceling orders.
 * It indicates which cancel orders have succeeded or failed.
 */
export interface MsgBatchCancelResponseAmino {
    /** A batch of short term cancel orders that have succeeded. */
    short_term_succeeded?: OrderBatchAmino[];
    /** A batch of short term cancel orders that have failed. */
    short_term_failed?: OrderBatchAmino[];
}
export interface MsgBatchCancelResponseAminoMsg {
    type: "/klyraprotocol.clob.MsgBatchCancelResponse";
    value: MsgBatchCancelResponseAmino;
}
/**
 * MsgBatchCancelResponse is a response type used for batch canceling orders.
 * It indicates which cancel orders have succeeded or failed.
 */
export interface MsgBatchCancelResponseSDKType {
    short_term_succeeded: OrderBatchSDKType[];
    short_term_failed: OrderBatchSDKType[];
}
/** MsgUpdateClobPair is a request type used for updating a ClobPair in state. */
export interface MsgUpdateClobPair {
    /** Authority is the address that may send this message. */
    authority: string;
    /** `clob_pair` is the ClobPair to write to state. */
    clobPair: ClobPair;
}
export interface MsgUpdateClobPairProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair";
    value: Uint8Array;
}
/** MsgUpdateClobPair is a request type used for updating a ClobPair in state. */
export interface MsgUpdateClobPairAmino {
    /** Authority is the address that may send this message. */
    authority?: string;
    /** `clob_pair` is the ClobPair to write to state. */
    clob_pair?: ClobPairAmino;
}
export interface MsgUpdateClobPairAminoMsg {
    type: "/klyraprotocol.clob.MsgUpdateClobPair";
    value: MsgUpdateClobPairAmino;
}
/** MsgUpdateClobPair is a request type used for updating a ClobPair in state. */
export interface MsgUpdateClobPairSDKType {
    authority: string;
    clob_pair: ClobPairSDKType;
}
/**
 * MsgUpdateClobPairResponse is a response type used for setting a ClobPair's
 * status.
 */
export interface MsgUpdateClobPairResponse {
}
export interface MsgUpdateClobPairResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgUpdateClobPairResponse";
    value: Uint8Array;
}
/**
 * MsgUpdateClobPairResponse is a response type used for setting a ClobPair's
 * status.
 */
export interface MsgUpdateClobPairResponseAmino {
}
export interface MsgUpdateClobPairResponseAminoMsg {
    type: "/klyraprotocol.clob.MsgUpdateClobPairResponse";
    value: MsgUpdateClobPairResponseAmino;
}
/**
 * MsgUpdateClobPairResponse is a response type used for setting a ClobPair's
 * status.
 */
export interface MsgUpdateClobPairResponseSDKType {
}
/**
 * OperationRaw represents an operation in the proposed operations.
 * Note that the `order_placement` operation is a signed message.
 */
export interface OperationRaw {
    match?: ClobMatch;
    shortTermOrderPlacement?: Uint8Array;
    orderRemoval?: OrderRemoval;
}
export interface OperationRawProtoMsg {
    typeUrl: "/klyraprotocol.clob.OperationRaw";
    value: Uint8Array;
}
/**
 * OperationRaw represents an operation in the proposed operations.
 * Note that the `order_placement` operation is a signed message.
 */
export interface OperationRawAmino {
    match?: ClobMatchAmino;
    short_term_order_placement?: string;
    order_removal?: OrderRemovalAmino;
}
export interface OperationRawAminoMsg {
    type: "/klyraprotocol.clob.OperationRaw";
    value: OperationRawAmino;
}
/**
 * OperationRaw represents an operation in the proposed operations.
 * Note that the `order_placement` operation is a signed message.
 */
export interface OperationRawSDKType {
    match?: ClobMatchSDKType;
    short_term_order_placement?: Uint8Array;
    order_removal?: OrderRemovalSDKType;
}
/**
 * MsgUpdateEquityTierLimitConfiguration is the Msg/EquityTierLimitConfiguration
 * request type.
 */
export interface MsgUpdateEquityTierLimitConfiguration {
    authority: string;
    /**
     * Defines the equity tier limit configuration to update to. All fields must
     * be set.
     */
    equityTierLimitConfig: EquityTierLimitConfiguration;
}
export interface MsgUpdateEquityTierLimitConfigurationProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration";
    value: Uint8Array;
}
/**
 * MsgUpdateEquityTierLimitConfiguration is the Msg/EquityTierLimitConfiguration
 * request type.
 */
export interface MsgUpdateEquityTierLimitConfigurationAmino {
    authority?: string;
    /**
     * Defines the equity tier limit configuration to update to. All fields must
     * be set.
     */
    equity_tier_limit_config?: EquityTierLimitConfigurationAmino;
}
export interface MsgUpdateEquityTierLimitConfigurationAminoMsg {
    type: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration";
    value: MsgUpdateEquityTierLimitConfigurationAmino;
}
/**
 * MsgUpdateEquityTierLimitConfiguration is the Msg/EquityTierLimitConfiguration
 * request type.
 */
export interface MsgUpdateEquityTierLimitConfigurationSDKType {
    authority: string;
    equity_tier_limit_config: EquityTierLimitConfigurationSDKType;
}
/**
 * MsgUpdateEquityTierLimitConfiguration is the Msg/EquityTierLimitConfiguration
 * response type.
 */
export interface MsgUpdateEquityTierLimitConfigurationResponse {
}
export interface MsgUpdateEquityTierLimitConfigurationResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfigurationResponse";
    value: Uint8Array;
}
/**
 * MsgUpdateEquityTierLimitConfiguration is the Msg/EquityTierLimitConfiguration
 * response type.
 */
export interface MsgUpdateEquityTierLimitConfigurationResponseAmino {
}
export interface MsgUpdateEquityTierLimitConfigurationResponseAminoMsg {
    type: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfigurationResponse";
    value: MsgUpdateEquityTierLimitConfigurationResponseAmino;
}
/**
 * MsgUpdateEquityTierLimitConfiguration is the Msg/EquityTierLimitConfiguration
 * response type.
 */
export interface MsgUpdateEquityTierLimitConfigurationResponseSDKType {
}
/**
 * MsgUpdateBlockRateLimitConfiguration is the Msg/BlockRateLimitConfiguration
 * request type.
 */
export interface MsgUpdateBlockRateLimitConfiguration {
    authority: string;
    /**
     * Defines the block rate limit configuration to update to. All fields must be
     * set.
     */
    blockRateLimitConfig: BlockRateLimitConfiguration;
}
export interface MsgUpdateBlockRateLimitConfigurationProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration";
    value: Uint8Array;
}
/**
 * MsgUpdateBlockRateLimitConfiguration is the Msg/BlockRateLimitConfiguration
 * request type.
 */
export interface MsgUpdateBlockRateLimitConfigurationAmino {
    authority?: string;
    /**
     * Defines the block rate limit configuration to update to. All fields must be
     * set.
     */
    block_rate_limit_config?: BlockRateLimitConfigurationAmino;
}
export interface MsgUpdateBlockRateLimitConfigurationAminoMsg {
    type: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration";
    value: MsgUpdateBlockRateLimitConfigurationAmino;
}
/**
 * MsgUpdateBlockRateLimitConfiguration is the Msg/BlockRateLimitConfiguration
 * request type.
 */
export interface MsgUpdateBlockRateLimitConfigurationSDKType {
    authority: string;
    block_rate_limit_config: BlockRateLimitConfigurationSDKType;
}
/**
 * MsgUpdateBlockRateLimitConfiguration is a response type for updating the
 * liquidations config.
 */
export interface MsgUpdateBlockRateLimitConfigurationResponse {
}
export interface MsgUpdateBlockRateLimitConfigurationResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfigurationResponse";
    value: Uint8Array;
}
/**
 * MsgUpdateBlockRateLimitConfiguration is a response type for updating the
 * liquidations config.
 */
export interface MsgUpdateBlockRateLimitConfigurationResponseAmino {
}
export interface MsgUpdateBlockRateLimitConfigurationResponseAminoMsg {
    type: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfigurationResponse";
    value: MsgUpdateBlockRateLimitConfigurationResponseAmino;
}
/**
 * MsgUpdateBlockRateLimitConfiguration is a response type for updating the
 * liquidations config.
 */
export interface MsgUpdateBlockRateLimitConfigurationResponseSDKType {
}
/**
 * MsgUpdateLiquidationsConfig is a request type for updating the liquidations
 * config.
 */
export interface MsgUpdateLiquidationsConfig {
    /** Authority is the address that may send this message. */
    authority: string;
    /**
     * Defines the liquidations configuration to update to. All fields must
     * be set.
     */
    liquidationsConfig: LiquidationsConfig;
}
export interface MsgUpdateLiquidationsConfigProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig";
    value: Uint8Array;
}
/**
 * MsgUpdateLiquidationsConfig is a request type for updating the liquidations
 * config.
 */
export interface MsgUpdateLiquidationsConfigAmino {
    /** Authority is the address that may send this message. */
    authority?: string;
    /**
     * Defines the liquidations configuration to update to. All fields must
     * be set.
     */
    liquidations_config?: LiquidationsConfigAmino;
}
export interface MsgUpdateLiquidationsConfigAminoMsg {
    type: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig";
    value: MsgUpdateLiquidationsConfigAmino;
}
/**
 * MsgUpdateLiquidationsConfig is a request type for updating the liquidations
 * config.
 */
export interface MsgUpdateLiquidationsConfigSDKType {
    authority: string;
    liquidations_config: LiquidationsConfigSDKType;
}
/** MsgUpdateLiquidationsConfig is the Msg/LiquidationsConfig response type. */
export interface MsgUpdateLiquidationsConfigResponse {
}
export interface MsgUpdateLiquidationsConfigResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfigResponse";
    value: Uint8Array;
}
/** MsgUpdateLiquidationsConfig is the Msg/LiquidationsConfig response type. */
export interface MsgUpdateLiquidationsConfigResponseAmino {
}
export interface MsgUpdateLiquidationsConfigResponseAminoMsg {
    type: "/klyraprotocol.clob.MsgUpdateLiquidationsConfigResponse";
    value: MsgUpdateLiquidationsConfigResponseAmino;
}
/** MsgUpdateLiquidationsConfig is the Msg/LiquidationsConfig response type. */
export interface MsgUpdateLiquidationsConfigResponseSDKType {
}
export declare const MsgCreateClobPair: {
    typeUrl: string;
    is(o: any): o is MsgCreateClobPair;
    isSDK(o: any): o is MsgCreateClobPairSDKType;
    isAmino(o: any): o is MsgCreateClobPairAmino;
    encode(message: MsgCreateClobPair, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateClobPair;
    fromPartial(object: Partial<MsgCreateClobPair>): MsgCreateClobPair;
    fromAmino(object: MsgCreateClobPairAmino): MsgCreateClobPair;
    toAmino(message: MsgCreateClobPair): MsgCreateClobPairAmino;
    fromAminoMsg(object: MsgCreateClobPairAminoMsg): MsgCreateClobPair;
    fromProtoMsg(message: MsgCreateClobPairProtoMsg): MsgCreateClobPair;
    toProto(message: MsgCreateClobPair): Uint8Array;
    toProtoMsg(message: MsgCreateClobPair): MsgCreateClobPairProtoMsg;
};
export declare const MsgCreateClobPairResponse: {
    typeUrl: string;
    is(o: any): o is MsgCreateClobPairResponse;
    isSDK(o: any): o is MsgCreateClobPairResponseSDKType;
    isAmino(o: any): o is MsgCreateClobPairResponseAmino;
    encode(_: MsgCreateClobPairResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateClobPairResponse;
    fromPartial(_: Partial<MsgCreateClobPairResponse>): MsgCreateClobPairResponse;
    fromAmino(_: MsgCreateClobPairResponseAmino): MsgCreateClobPairResponse;
    toAmino(_: MsgCreateClobPairResponse): MsgCreateClobPairResponseAmino;
    fromAminoMsg(object: MsgCreateClobPairResponseAminoMsg): MsgCreateClobPairResponse;
    fromProtoMsg(message: MsgCreateClobPairResponseProtoMsg): MsgCreateClobPairResponse;
    toProto(message: MsgCreateClobPairResponse): Uint8Array;
    toProtoMsg(message: MsgCreateClobPairResponse): MsgCreateClobPairResponseProtoMsg;
};
export declare const MsgProposedOperations: {
    typeUrl: string;
    is(o: any): o is MsgProposedOperations;
    isSDK(o: any): o is MsgProposedOperationsSDKType;
    isAmino(o: any): o is MsgProposedOperationsAmino;
    encode(message: MsgProposedOperations, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgProposedOperations;
    fromPartial(object: Partial<MsgProposedOperations>): MsgProposedOperations;
    fromAmino(object: MsgProposedOperationsAmino): MsgProposedOperations;
    toAmino(message: MsgProposedOperations): MsgProposedOperationsAmino;
    fromAminoMsg(object: MsgProposedOperationsAminoMsg): MsgProposedOperations;
    fromProtoMsg(message: MsgProposedOperationsProtoMsg): MsgProposedOperations;
    toProto(message: MsgProposedOperations): Uint8Array;
    toProtoMsg(message: MsgProposedOperations): MsgProposedOperationsProtoMsg;
};
export declare const MsgProposedOperationsResponse: {
    typeUrl: string;
    is(o: any): o is MsgProposedOperationsResponse;
    isSDK(o: any): o is MsgProposedOperationsResponseSDKType;
    isAmino(o: any): o is MsgProposedOperationsResponseAmino;
    encode(_: MsgProposedOperationsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgProposedOperationsResponse;
    fromPartial(_: Partial<MsgProposedOperationsResponse>): MsgProposedOperationsResponse;
    fromAmino(_: MsgProposedOperationsResponseAmino): MsgProposedOperationsResponse;
    toAmino(_: MsgProposedOperationsResponse): MsgProposedOperationsResponseAmino;
    fromAminoMsg(object: MsgProposedOperationsResponseAminoMsg): MsgProposedOperationsResponse;
    fromProtoMsg(message: MsgProposedOperationsResponseProtoMsg): MsgProposedOperationsResponse;
    toProto(message: MsgProposedOperationsResponse): Uint8Array;
    toProtoMsg(message: MsgProposedOperationsResponse): MsgProposedOperationsResponseProtoMsg;
};
export declare const MsgPlaceOrder: {
    typeUrl: string;
    is(o: any): o is MsgPlaceOrder;
    isSDK(o: any): o is MsgPlaceOrderSDKType;
    isAmino(o: any): o is MsgPlaceOrderAmino;
    encode(message: MsgPlaceOrder, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgPlaceOrder;
    fromPartial(object: Partial<MsgPlaceOrder>): MsgPlaceOrder;
    fromAmino(object: MsgPlaceOrderAmino): MsgPlaceOrder;
    toAmino(message: MsgPlaceOrder): MsgPlaceOrderAmino;
    fromAminoMsg(object: MsgPlaceOrderAminoMsg): MsgPlaceOrder;
    fromProtoMsg(message: MsgPlaceOrderProtoMsg): MsgPlaceOrder;
    toProto(message: MsgPlaceOrder): Uint8Array;
    toProtoMsg(message: MsgPlaceOrder): MsgPlaceOrderProtoMsg;
};
export declare const MsgPlaceOrderResponse: {
    typeUrl: string;
    is(o: any): o is MsgPlaceOrderResponse;
    isSDK(o: any): o is MsgPlaceOrderResponseSDKType;
    isAmino(o: any): o is MsgPlaceOrderResponseAmino;
    encode(_: MsgPlaceOrderResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgPlaceOrderResponse;
    fromPartial(_: Partial<MsgPlaceOrderResponse>): MsgPlaceOrderResponse;
    fromAmino(_: MsgPlaceOrderResponseAmino): MsgPlaceOrderResponse;
    toAmino(_: MsgPlaceOrderResponse): MsgPlaceOrderResponseAmino;
    fromAminoMsg(object: MsgPlaceOrderResponseAminoMsg): MsgPlaceOrderResponse;
    fromProtoMsg(message: MsgPlaceOrderResponseProtoMsg): MsgPlaceOrderResponse;
    toProto(message: MsgPlaceOrderResponse): Uint8Array;
    toProtoMsg(message: MsgPlaceOrderResponse): MsgPlaceOrderResponseProtoMsg;
};
export declare const MsgCancelOrder: {
    typeUrl: string;
    is(o: any): o is MsgCancelOrder;
    isSDK(o: any): o is MsgCancelOrderSDKType;
    isAmino(o: any): o is MsgCancelOrderAmino;
    encode(message: MsgCancelOrder, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelOrder;
    fromPartial(object: Partial<MsgCancelOrder>): MsgCancelOrder;
    fromAmino(object: MsgCancelOrderAmino): MsgCancelOrder;
    toAmino(message: MsgCancelOrder): MsgCancelOrderAmino;
    fromAminoMsg(object: MsgCancelOrderAminoMsg): MsgCancelOrder;
    fromProtoMsg(message: MsgCancelOrderProtoMsg): MsgCancelOrder;
    toProto(message: MsgCancelOrder): Uint8Array;
    toProtoMsg(message: MsgCancelOrder): MsgCancelOrderProtoMsg;
};
export declare const MsgCancelOrderResponse: {
    typeUrl: string;
    is(o: any): o is MsgCancelOrderResponse;
    isSDK(o: any): o is MsgCancelOrderResponseSDKType;
    isAmino(o: any): o is MsgCancelOrderResponseAmino;
    encode(_: MsgCancelOrderResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelOrderResponse;
    fromPartial(_: Partial<MsgCancelOrderResponse>): MsgCancelOrderResponse;
    fromAmino(_: MsgCancelOrderResponseAmino): MsgCancelOrderResponse;
    toAmino(_: MsgCancelOrderResponse): MsgCancelOrderResponseAmino;
    fromAminoMsg(object: MsgCancelOrderResponseAminoMsg): MsgCancelOrderResponse;
    fromProtoMsg(message: MsgCancelOrderResponseProtoMsg): MsgCancelOrderResponse;
    toProto(message: MsgCancelOrderResponse): Uint8Array;
    toProtoMsg(message: MsgCancelOrderResponse): MsgCancelOrderResponseProtoMsg;
};
export declare const MsgBatchCancel: {
    typeUrl: string;
    is(o: any): o is MsgBatchCancel;
    isSDK(o: any): o is MsgBatchCancelSDKType;
    isAmino(o: any): o is MsgBatchCancelAmino;
    encode(message: MsgBatchCancel, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgBatchCancel;
    fromPartial(object: Partial<MsgBatchCancel>): MsgBatchCancel;
    fromAmino(object: MsgBatchCancelAmino): MsgBatchCancel;
    toAmino(message: MsgBatchCancel): MsgBatchCancelAmino;
    fromAminoMsg(object: MsgBatchCancelAminoMsg): MsgBatchCancel;
    fromProtoMsg(message: MsgBatchCancelProtoMsg): MsgBatchCancel;
    toProto(message: MsgBatchCancel): Uint8Array;
    toProtoMsg(message: MsgBatchCancel): MsgBatchCancelProtoMsg;
};
export declare const OrderBatch: {
    typeUrl: string;
    is(o: any): o is OrderBatch;
    isSDK(o: any): o is OrderBatchSDKType;
    isAmino(o: any): o is OrderBatchAmino;
    encode(message: OrderBatch, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OrderBatch;
    fromPartial(object: Partial<OrderBatch>): OrderBatch;
    fromAmino(object: OrderBatchAmino): OrderBatch;
    toAmino(message: OrderBatch): OrderBatchAmino;
    fromAminoMsg(object: OrderBatchAminoMsg): OrderBatch;
    fromProtoMsg(message: OrderBatchProtoMsg): OrderBatch;
    toProto(message: OrderBatch): Uint8Array;
    toProtoMsg(message: OrderBatch): OrderBatchProtoMsg;
};
export declare const MsgBatchCancelResponse: {
    typeUrl: string;
    is(o: any): o is MsgBatchCancelResponse;
    isSDK(o: any): o is MsgBatchCancelResponseSDKType;
    isAmino(o: any): o is MsgBatchCancelResponseAmino;
    encode(message: MsgBatchCancelResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgBatchCancelResponse;
    fromPartial(object: Partial<MsgBatchCancelResponse>): MsgBatchCancelResponse;
    fromAmino(object: MsgBatchCancelResponseAmino): MsgBatchCancelResponse;
    toAmino(message: MsgBatchCancelResponse): MsgBatchCancelResponseAmino;
    fromAminoMsg(object: MsgBatchCancelResponseAminoMsg): MsgBatchCancelResponse;
    fromProtoMsg(message: MsgBatchCancelResponseProtoMsg): MsgBatchCancelResponse;
    toProto(message: MsgBatchCancelResponse): Uint8Array;
    toProtoMsg(message: MsgBatchCancelResponse): MsgBatchCancelResponseProtoMsg;
};
export declare const MsgUpdateClobPair: {
    typeUrl: string;
    is(o: any): o is MsgUpdateClobPair;
    isSDK(o: any): o is MsgUpdateClobPairSDKType;
    isAmino(o: any): o is MsgUpdateClobPairAmino;
    encode(message: MsgUpdateClobPair, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateClobPair;
    fromPartial(object: Partial<MsgUpdateClobPair>): MsgUpdateClobPair;
    fromAmino(object: MsgUpdateClobPairAmino): MsgUpdateClobPair;
    toAmino(message: MsgUpdateClobPair): MsgUpdateClobPairAmino;
    fromAminoMsg(object: MsgUpdateClobPairAminoMsg): MsgUpdateClobPair;
    fromProtoMsg(message: MsgUpdateClobPairProtoMsg): MsgUpdateClobPair;
    toProto(message: MsgUpdateClobPair): Uint8Array;
    toProtoMsg(message: MsgUpdateClobPair): MsgUpdateClobPairProtoMsg;
};
export declare const MsgUpdateClobPairResponse: {
    typeUrl: string;
    is(o: any): o is MsgUpdateClobPairResponse;
    isSDK(o: any): o is MsgUpdateClobPairResponseSDKType;
    isAmino(o: any): o is MsgUpdateClobPairResponseAmino;
    encode(_: MsgUpdateClobPairResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateClobPairResponse;
    fromPartial(_: Partial<MsgUpdateClobPairResponse>): MsgUpdateClobPairResponse;
    fromAmino(_: MsgUpdateClobPairResponseAmino): MsgUpdateClobPairResponse;
    toAmino(_: MsgUpdateClobPairResponse): MsgUpdateClobPairResponseAmino;
    fromAminoMsg(object: MsgUpdateClobPairResponseAminoMsg): MsgUpdateClobPairResponse;
    fromProtoMsg(message: MsgUpdateClobPairResponseProtoMsg): MsgUpdateClobPairResponse;
    toProto(message: MsgUpdateClobPairResponse): Uint8Array;
    toProtoMsg(message: MsgUpdateClobPairResponse): MsgUpdateClobPairResponseProtoMsg;
};
export declare const OperationRaw: {
    typeUrl: string;
    is(o: any): o is OperationRaw;
    isSDK(o: any): o is OperationRawSDKType;
    isAmino(o: any): o is OperationRawAmino;
    encode(message: OperationRaw, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OperationRaw;
    fromPartial(object: Partial<OperationRaw>): OperationRaw;
    fromAmino(object: OperationRawAmino): OperationRaw;
    toAmino(message: OperationRaw): OperationRawAmino;
    fromAminoMsg(object: OperationRawAminoMsg): OperationRaw;
    fromProtoMsg(message: OperationRawProtoMsg): OperationRaw;
    toProto(message: OperationRaw): Uint8Array;
    toProtoMsg(message: OperationRaw): OperationRawProtoMsg;
};
export declare const MsgUpdateEquityTierLimitConfiguration: {
    typeUrl: string;
    is(o: any): o is MsgUpdateEquityTierLimitConfiguration;
    isSDK(o: any): o is MsgUpdateEquityTierLimitConfigurationSDKType;
    isAmino(o: any): o is MsgUpdateEquityTierLimitConfigurationAmino;
    encode(message: MsgUpdateEquityTierLimitConfiguration, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateEquityTierLimitConfiguration;
    fromPartial(object: Partial<MsgUpdateEquityTierLimitConfiguration>): MsgUpdateEquityTierLimitConfiguration;
    fromAmino(object: MsgUpdateEquityTierLimitConfigurationAmino): MsgUpdateEquityTierLimitConfiguration;
    toAmino(message: MsgUpdateEquityTierLimitConfiguration): MsgUpdateEquityTierLimitConfigurationAmino;
    fromAminoMsg(object: MsgUpdateEquityTierLimitConfigurationAminoMsg): MsgUpdateEquityTierLimitConfiguration;
    fromProtoMsg(message: MsgUpdateEquityTierLimitConfigurationProtoMsg): MsgUpdateEquityTierLimitConfiguration;
    toProto(message: MsgUpdateEquityTierLimitConfiguration): Uint8Array;
    toProtoMsg(message: MsgUpdateEquityTierLimitConfiguration): MsgUpdateEquityTierLimitConfigurationProtoMsg;
};
export declare const MsgUpdateEquityTierLimitConfigurationResponse: {
    typeUrl: string;
    is(o: any): o is MsgUpdateEquityTierLimitConfigurationResponse;
    isSDK(o: any): o is MsgUpdateEquityTierLimitConfigurationResponseSDKType;
    isAmino(o: any): o is MsgUpdateEquityTierLimitConfigurationResponseAmino;
    encode(_: MsgUpdateEquityTierLimitConfigurationResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateEquityTierLimitConfigurationResponse;
    fromPartial(_: Partial<MsgUpdateEquityTierLimitConfigurationResponse>): MsgUpdateEquityTierLimitConfigurationResponse;
    fromAmino(_: MsgUpdateEquityTierLimitConfigurationResponseAmino): MsgUpdateEquityTierLimitConfigurationResponse;
    toAmino(_: MsgUpdateEquityTierLimitConfigurationResponse): MsgUpdateEquityTierLimitConfigurationResponseAmino;
    fromAminoMsg(object: MsgUpdateEquityTierLimitConfigurationResponseAminoMsg): MsgUpdateEquityTierLimitConfigurationResponse;
    fromProtoMsg(message: MsgUpdateEquityTierLimitConfigurationResponseProtoMsg): MsgUpdateEquityTierLimitConfigurationResponse;
    toProto(message: MsgUpdateEquityTierLimitConfigurationResponse): Uint8Array;
    toProtoMsg(message: MsgUpdateEquityTierLimitConfigurationResponse): MsgUpdateEquityTierLimitConfigurationResponseProtoMsg;
};
export declare const MsgUpdateBlockRateLimitConfiguration: {
    typeUrl: string;
    is(o: any): o is MsgUpdateBlockRateLimitConfiguration;
    isSDK(o: any): o is MsgUpdateBlockRateLimitConfigurationSDKType;
    isAmino(o: any): o is MsgUpdateBlockRateLimitConfigurationAmino;
    encode(message: MsgUpdateBlockRateLimitConfiguration, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateBlockRateLimitConfiguration;
    fromPartial(object: Partial<MsgUpdateBlockRateLimitConfiguration>): MsgUpdateBlockRateLimitConfiguration;
    fromAmino(object: MsgUpdateBlockRateLimitConfigurationAmino): MsgUpdateBlockRateLimitConfiguration;
    toAmino(message: MsgUpdateBlockRateLimitConfiguration): MsgUpdateBlockRateLimitConfigurationAmino;
    fromAminoMsg(object: MsgUpdateBlockRateLimitConfigurationAminoMsg): MsgUpdateBlockRateLimitConfiguration;
    fromProtoMsg(message: MsgUpdateBlockRateLimitConfigurationProtoMsg): MsgUpdateBlockRateLimitConfiguration;
    toProto(message: MsgUpdateBlockRateLimitConfiguration): Uint8Array;
    toProtoMsg(message: MsgUpdateBlockRateLimitConfiguration): MsgUpdateBlockRateLimitConfigurationProtoMsg;
};
export declare const MsgUpdateBlockRateLimitConfigurationResponse: {
    typeUrl: string;
    is(o: any): o is MsgUpdateBlockRateLimitConfigurationResponse;
    isSDK(o: any): o is MsgUpdateBlockRateLimitConfigurationResponseSDKType;
    isAmino(o: any): o is MsgUpdateBlockRateLimitConfigurationResponseAmino;
    encode(_: MsgUpdateBlockRateLimitConfigurationResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateBlockRateLimitConfigurationResponse;
    fromPartial(_: Partial<MsgUpdateBlockRateLimitConfigurationResponse>): MsgUpdateBlockRateLimitConfigurationResponse;
    fromAmino(_: MsgUpdateBlockRateLimitConfigurationResponseAmino): MsgUpdateBlockRateLimitConfigurationResponse;
    toAmino(_: MsgUpdateBlockRateLimitConfigurationResponse): MsgUpdateBlockRateLimitConfigurationResponseAmino;
    fromAminoMsg(object: MsgUpdateBlockRateLimitConfigurationResponseAminoMsg): MsgUpdateBlockRateLimitConfigurationResponse;
    fromProtoMsg(message: MsgUpdateBlockRateLimitConfigurationResponseProtoMsg): MsgUpdateBlockRateLimitConfigurationResponse;
    toProto(message: MsgUpdateBlockRateLimitConfigurationResponse): Uint8Array;
    toProtoMsg(message: MsgUpdateBlockRateLimitConfigurationResponse): MsgUpdateBlockRateLimitConfigurationResponseProtoMsg;
};
export declare const MsgUpdateLiquidationsConfig: {
    typeUrl: string;
    is(o: any): o is MsgUpdateLiquidationsConfig;
    isSDK(o: any): o is MsgUpdateLiquidationsConfigSDKType;
    isAmino(o: any): o is MsgUpdateLiquidationsConfigAmino;
    encode(message: MsgUpdateLiquidationsConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateLiquidationsConfig;
    fromPartial(object: Partial<MsgUpdateLiquidationsConfig>): MsgUpdateLiquidationsConfig;
    fromAmino(object: MsgUpdateLiquidationsConfigAmino): MsgUpdateLiquidationsConfig;
    toAmino(message: MsgUpdateLiquidationsConfig): MsgUpdateLiquidationsConfigAmino;
    fromAminoMsg(object: MsgUpdateLiquidationsConfigAminoMsg): MsgUpdateLiquidationsConfig;
    fromProtoMsg(message: MsgUpdateLiquidationsConfigProtoMsg): MsgUpdateLiquidationsConfig;
    toProto(message: MsgUpdateLiquidationsConfig): Uint8Array;
    toProtoMsg(message: MsgUpdateLiquidationsConfig): MsgUpdateLiquidationsConfigProtoMsg;
};
export declare const MsgUpdateLiquidationsConfigResponse: {
    typeUrl: string;
    is(o: any): o is MsgUpdateLiquidationsConfigResponse;
    isSDK(o: any): o is MsgUpdateLiquidationsConfigResponseSDKType;
    isAmino(o: any): o is MsgUpdateLiquidationsConfigResponseAmino;
    encode(_: MsgUpdateLiquidationsConfigResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateLiquidationsConfigResponse;
    fromPartial(_: Partial<MsgUpdateLiquidationsConfigResponse>): MsgUpdateLiquidationsConfigResponse;
    fromAmino(_: MsgUpdateLiquidationsConfigResponseAmino): MsgUpdateLiquidationsConfigResponse;
    toAmino(_: MsgUpdateLiquidationsConfigResponse): MsgUpdateLiquidationsConfigResponseAmino;
    fromAminoMsg(object: MsgUpdateLiquidationsConfigResponseAminoMsg): MsgUpdateLiquidationsConfigResponse;
    fromProtoMsg(message: MsgUpdateLiquidationsConfigResponseProtoMsg): MsgUpdateLiquidationsConfigResponse;
    toProto(message: MsgUpdateLiquidationsConfigResponse): Uint8Array;
    toProtoMsg(message: MsgUpdateLiquidationsConfigResponse): MsgUpdateLiquidationsConfigResponseProtoMsg;
};
