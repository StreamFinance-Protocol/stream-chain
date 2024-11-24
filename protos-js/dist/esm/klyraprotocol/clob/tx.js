//@ts-nocheck
import { Order, OrderId } from "./order";
import { SubaccountId } from "../subaccounts/subaccount";
import { ClobPair } from "./clob_pair";
import { EquityTierLimitConfiguration } from "./equity_tier_limit_config";
import { BlockRateLimitConfiguration } from "./block_rate_limit_config";
import { LiquidationsConfig } from "./liquidations_config";
import { ClobMatch } from "./matches";
import { OrderRemoval } from "./order_removals";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
function createBaseMsgCreateClobPair() {
    return {
        authority: "",
        clobPair: ClobPair.fromPartial({})
    };
}
export const MsgCreateClobPair = {
    typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
    is(o) {
        return o && (o.$typeUrl === MsgCreateClobPair.typeUrl || typeof o.authority === "string" && ClobPair.is(o.clobPair));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgCreateClobPair.typeUrl || typeof o.authority === "string" && ClobPair.isSDK(o.clob_pair));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgCreateClobPair.typeUrl || typeof o.authority === "string" && ClobPair.isAmino(o.clob_pair));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.clobPair !== undefined) {
            ClobPair.encode(message.clobPair, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateClobPair();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.clobPair = ClobPair.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgCreateClobPair();
        message.authority = object.authority ?? "";
        message.clobPair = object.clobPair !== undefined && object.clobPair !== null ? ClobPair.fromPartial(object.clobPair) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCreateClobPair();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.clob_pair !== undefined && object.clob_pair !== null) {
            message.clobPair = ClobPair.fromAmino(object.clob_pair);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.clob_pair = message.clobPair ? ClobPair.toAmino(message.clobPair) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCreateClobPair.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgCreateClobPair.decode(message.value);
    },
    toProto(message) {
        return MsgCreateClobPair.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
            value: MsgCreateClobPair.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCreateClobPair.typeUrl, MsgCreateClobPair);
function createBaseMsgCreateClobPairResponse() {
    return {};
}
export const MsgCreateClobPairResponse = {
    typeUrl: "/klyraprotocol.clob.MsgCreateClobPairResponse",
    is(o) {
        return o && o.$typeUrl === MsgCreateClobPairResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgCreateClobPairResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgCreateClobPairResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateClobPairResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgCreateClobPairResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgCreateClobPairResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCreateClobPairResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgCreateClobPairResponse.decode(message.value);
    },
    toProto(message) {
        return MsgCreateClobPairResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgCreateClobPairResponse",
            value: MsgCreateClobPairResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCreateClobPairResponse.typeUrl, MsgCreateClobPairResponse);
function createBaseMsgProposedOperations() {
    return {
        operationsQueue: []
    };
}
export const MsgProposedOperations = {
    typeUrl: "/klyraprotocol.clob.MsgProposedOperations",
    is(o) {
        return o && (o.$typeUrl === MsgProposedOperations.typeUrl || Array.isArray(o.operationsQueue) && (!o.operationsQueue.length || OperationRaw.is(o.operationsQueue[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgProposedOperations.typeUrl || Array.isArray(o.operations_queue) && (!o.operations_queue.length || OperationRaw.isSDK(o.operations_queue[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgProposedOperations.typeUrl || Array.isArray(o.operations_queue) && (!o.operations_queue.length || OperationRaw.isAmino(o.operations_queue[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.operationsQueue) {
            OperationRaw.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgProposedOperations();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.operationsQueue.push(OperationRaw.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgProposedOperations();
        message.operationsQueue = object.operationsQueue?.map(e => OperationRaw.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgProposedOperations();
        message.operationsQueue = object.operations_queue?.map(e => OperationRaw.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.operationsQueue) {
            obj.operations_queue = message.operationsQueue.map(e => e ? OperationRaw.toAmino(e) : undefined);
        }
        else {
            obj.operations_queue = message.operationsQueue;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MsgProposedOperations.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgProposedOperations.decode(message.value);
    },
    toProto(message) {
        return MsgProposedOperations.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgProposedOperations",
            value: MsgProposedOperations.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgProposedOperations.typeUrl, MsgProposedOperations);
function createBaseMsgProposedOperationsResponse() {
    return {};
}
export const MsgProposedOperationsResponse = {
    typeUrl: "/klyraprotocol.clob.MsgProposedOperationsResponse",
    is(o) {
        return o && o.$typeUrl === MsgProposedOperationsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgProposedOperationsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgProposedOperationsResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgProposedOperationsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgProposedOperationsResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgProposedOperationsResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgProposedOperationsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgProposedOperationsResponse.decode(message.value);
    },
    toProto(message) {
        return MsgProposedOperationsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgProposedOperationsResponse",
            value: MsgProposedOperationsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgProposedOperationsResponse.typeUrl, MsgProposedOperationsResponse);
function createBaseMsgPlaceOrder() {
    return {
        order: Order.fromPartial({})
    };
}
export const MsgPlaceOrder = {
    typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
    is(o) {
        return o && (o.$typeUrl === MsgPlaceOrder.typeUrl || Order.is(o.order));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgPlaceOrder.typeUrl || Order.isSDK(o.order));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgPlaceOrder.typeUrl || Order.isAmino(o.order));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.order !== undefined) {
            Order.encode(message.order, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPlaceOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.order = Order.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgPlaceOrder();
        message.order = object.order !== undefined && object.order !== null ? Order.fromPartial(object.order) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgPlaceOrder();
        if (object.order !== undefined && object.order !== null) {
            message.order = Order.fromAmino(object.order);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order = message.order ? Order.toAmino(message.order) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgPlaceOrder.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgPlaceOrder.decode(message.value);
    },
    toProto(message) {
        return MsgPlaceOrder.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
            value: MsgPlaceOrder.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgPlaceOrder.typeUrl, MsgPlaceOrder);
function createBaseMsgPlaceOrderResponse() {
    return {};
}
export const MsgPlaceOrderResponse = {
    typeUrl: "/klyraprotocol.clob.MsgPlaceOrderResponse",
    is(o) {
        return o && o.$typeUrl === MsgPlaceOrderResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgPlaceOrderResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgPlaceOrderResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPlaceOrderResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgPlaceOrderResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgPlaceOrderResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgPlaceOrderResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgPlaceOrderResponse.decode(message.value);
    },
    toProto(message) {
        return MsgPlaceOrderResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgPlaceOrderResponse",
            value: MsgPlaceOrderResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgPlaceOrderResponse.typeUrl, MsgPlaceOrderResponse);
function createBaseMsgCancelOrder() {
    return {
        orderId: OrderId.fromPartial({}),
        goodTilBlock: undefined,
        goodTilBlockTime: undefined
    };
}
export const MsgCancelOrder = {
    typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
    is(o) {
        return o && (o.$typeUrl === MsgCancelOrder.typeUrl || OrderId.is(o.orderId));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgCancelOrder.typeUrl || OrderId.isSDK(o.order_id));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgCancelOrder.typeUrl || OrderId.isAmino(o.order_id));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.orderId !== undefined) {
            OrderId.encode(message.orderId, writer.uint32(10).fork()).ldelim();
        }
        if (message.goodTilBlock !== undefined) {
            writer.uint32(16).uint32(message.goodTilBlock);
        }
        if (message.goodTilBlockTime !== undefined) {
            writer.uint32(29).fixed32(message.goodTilBlockTime);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderId = OrderId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.goodTilBlock = reader.uint32();
                    break;
                case 3:
                    message.goodTilBlockTime = reader.fixed32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgCancelOrder();
        message.orderId = object.orderId !== undefined && object.orderId !== null ? OrderId.fromPartial(object.orderId) : undefined;
        message.goodTilBlock = object.goodTilBlock ?? undefined;
        message.goodTilBlockTime = object.goodTilBlockTime ?? undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCancelOrder();
        if (object.order_id !== undefined && object.order_id !== null) {
            message.orderId = OrderId.fromAmino(object.order_id);
        }
        if (object.good_til_block !== undefined && object.good_til_block !== null) {
            message.goodTilBlock = object.good_til_block;
        }
        if (object.good_til_block_time !== undefined && object.good_til_block_time !== null) {
            message.goodTilBlockTime = object.good_til_block_time;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order_id = message.orderId ? OrderId.toAmino(message.orderId) : undefined;
        obj.good_til_block = message.goodTilBlock === null ? undefined : message.goodTilBlock;
        obj.good_til_block_time = message.goodTilBlockTime === null ? undefined : message.goodTilBlockTime;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCancelOrder.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgCancelOrder.decode(message.value);
    },
    toProto(message) {
        return MsgCancelOrder.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
            value: MsgCancelOrder.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCancelOrder.typeUrl, MsgCancelOrder);
function createBaseMsgCancelOrderResponse() {
    return {};
}
export const MsgCancelOrderResponse = {
    typeUrl: "/klyraprotocol.clob.MsgCancelOrderResponse",
    is(o) {
        return o && o.$typeUrl === MsgCancelOrderResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgCancelOrderResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgCancelOrderResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelOrderResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgCancelOrderResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgCancelOrderResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCancelOrderResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgCancelOrderResponse.decode(message.value);
    },
    toProto(message) {
        return MsgCancelOrderResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgCancelOrderResponse",
            value: MsgCancelOrderResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCancelOrderResponse.typeUrl, MsgCancelOrderResponse);
function createBaseMsgBatchCancel() {
    return {
        subaccountId: SubaccountId.fromPartial({}),
        shortTermCancels: [],
        goodTilBlock: 0
    };
}
export const MsgBatchCancel = {
    typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
    is(o) {
        return o && (o.$typeUrl === MsgBatchCancel.typeUrl || SubaccountId.is(o.subaccountId) && Array.isArray(o.shortTermCancels) && (!o.shortTermCancels.length || OrderBatch.is(o.shortTermCancels[0])) && typeof o.goodTilBlock === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgBatchCancel.typeUrl || SubaccountId.isSDK(o.subaccount_id) && Array.isArray(o.short_term_cancels) && (!o.short_term_cancels.length || OrderBatch.isSDK(o.short_term_cancels[0])) && typeof o.good_til_block === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgBatchCancel.typeUrl || SubaccountId.isAmino(o.subaccount_id) && Array.isArray(o.short_term_cancels) && (!o.short_term_cancels.length || OrderBatch.isAmino(o.short_term_cancels[0])) && typeof o.good_til_block === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.subaccountId !== undefined) {
            SubaccountId.encode(message.subaccountId, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.shortTermCancels) {
            OrderBatch.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.goodTilBlock !== 0) {
            writer.uint32(24).uint32(message.goodTilBlock);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBatchCancel();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subaccountId = SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.shortTermCancels.push(OrderBatch.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.goodTilBlock = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgBatchCancel();
        message.subaccountId = object.subaccountId !== undefined && object.subaccountId !== null ? SubaccountId.fromPartial(object.subaccountId) : undefined;
        message.shortTermCancels = object.shortTermCancels?.map(e => OrderBatch.fromPartial(e)) || [];
        message.goodTilBlock = object.goodTilBlock ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgBatchCancel();
        if (object.subaccount_id !== undefined && object.subaccount_id !== null) {
            message.subaccountId = SubaccountId.fromAmino(object.subaccount_id);
        }
        message.shortTermCancels = object.short_term_cancels?.map(e => OrderBatch.fromAmino(e)) || [];
        if (object.good_til_block !== undefined && object.good_til_block !== null) {
            message.goodTilBlock = object.good_til_block;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.subaccount_id = message.subaccountId ? SubaccountId.toAmino(message.subaccountId) : undefined;
        if (message.shortTermCancels) {
            obj.short_term_cancels = message.shortTermCancels.map(e => e ? OrderBatch.toAmino(e) : undefined);
        }
        else {
            obj.short_term_cancels = message.shortTermCancels;
        }
        obj.good_til_block = message.goodTilBlock === 0 ? undefined : message.goodTilBlock;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgBatchCancel.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgBatchCancel.decode(message.value);
    },
    toProto(message) {
        return MsgBatchCancel.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
            value: MsgBatchCancel.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgBatchCancel.typeUrl, MsgBatchCancel);
function createBaseOrderBatch() {
    return {
        clobPairId: 0,
        clientIds: []
    };
}
export const OrderBatch = {
    typeUrl: "/klyraprotocol.clob.OrderBatch",
    is(o) {
        return o && (o.$typeUrl === OrderBatch.typeUrl || typeof o.clobPairId === "number" && Array.isArray(o.clientIds) && (!o.clientIds.length || typeof o.clientIds[0] === "number"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === OrderBatch.typeUrl || typeof o.clob_pair_id === "number" && Array.isArray(o.client_ids) && (!o.client_ids.length || typeof o.client_ids[0] === "number"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === OrderBatch.typeUrl || typeof o.clob_pair_id === "number" && Array.isArray(o.client_ids) && (!o.client_ids.length || typeof o.client_ids[0] === "number"));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.clobPairId !== 0) {
            writer.uint32(8).uint32(message.clobPairId);
        }
        writer.uint32(18).fork();
        for (const v of message.clientIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrderBatch();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clobPairId = reader.uint32();
                    break;
                case 2:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.clientIds.push(reader.uint32());
                        }
                    }
                    else {
                        message.clientIds.push(reader.uint32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOrderBatch();
        message.clobPairId = object.clobPairId ?? 0;
        message.clientIds = object.clientIds?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseOrderBatch();
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        message.clientIds = object.client_ids?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        if (message.clientIds) {
            obj.client_ids = message.clientIds.map(e => e);
        }
        else {
            obj.client_ids = message.clientIds;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return OrderBatch.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return OrderBatch.decode(message.value);
    },
    toProto(message) {
        return OrderBatch.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.OrderBatch",
            value: OrderBatch.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(OrderBatch.typeUrl, OrderBatch);
function createBaseMsgBatchCancelResponse() {
    return {
        shortTermSucceeded: [],
        shortTermFailed: []
    };
}
export const MsgBatchCancelResponse = {
    typeUrl: "/klyraprotocol.clob.MsgBatchCancelResponse",
    is(o) {
        return o && (o.$typeUrl === MsgBatchCancelResponse.typeUrl || Array.isArray(o.shortTermSucceeded) && (!o.shortTermSucceeded.length || OrderBatch.is(o.shortTermSucceeded[0])) && Array.isArray(o.shortTermFailed) && (!o.shortTermFailed.length || OrderBatch.is(o.shortTermFailed[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgBatchCancelResponse.typeUrl || Array.isArray(o.short_term_succeeded) && (!o.short_term_succeeded.length || OrderBatch.isSDK(o.short_term_succeeded[0])) && Array.isArray(o.short_term_failed) && (!o.short_term_failed.length || OrderBatch.isSDK(o.short_term_failed[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgBatchCancelResponse.typeUrl || Array.isArray(o.short_term_succeeded) && (!o.short_term_succeeded.length || OrderBatch.isAmino(o.short_term_succeeded[0])) && Array.isArray(o.short_term_failed) && (!o.short_term_failed.length || OrderBatch.isAmino(o.short_term_failed[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.shortTermSucceeded) {
            OrderBatch.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.shortTermFailed) {
            OrderBatch.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBatchCancelResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.shortTermSucceeded.push(OrderBatch.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.shortTermFailed.push(OrderBatch.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgBatchCancelResponse();
        message.shortTermSucceeded = object.shortTermSucceeded?.map(e => OrderBatch.fromPartial(e)) || [];
        message.shortTermFailed = object.shortTermFailed?.map(e => OrderBatch.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgBatchCancelResponse();
        message.shortTermSucceeded = object.short_term_succeeded?.map(e => OrderBatch.fromAmino(e)) || [];
        message.shortTermFailed = object.short_term_failed?.map(e => OrderBatch.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.shortTermSucceeded) {
            obj.short_term_succeeded = message.shortTermSucceeded.map(e => e ? OrderBatch.toAmino(e) : undefined);
        }
        else {
            obj.short_term_succeeded = message.shortTermSucceeded;
        }
        if (message.shortTermFailed) {
            obj.short_term_failed = message.shortTermFailed.map(e => e ? OrderBatch.toAmino(e) : undefined);
        }
        else {
            obj.short_term_failed = message.shortTermFailed;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MsgBatchCancelResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgBatchCancelResponse.decode(message.value);
    },
    toProto(message) {
        return MsgBatchCancelResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgBatchCancelResponse",
            value: MsgBatchCancelResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgBatchCancelResponse.typeUrl, MsgBatchCancelResponse);
function createBaseMsgUpdateClobPair() {
    return {
        authority: "",
        clobPair: ClobPair.fromPartial({})
    };
}
export const MsgUpdateClobPair = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
    is(o) {
        return o && (o.$typeUrl === MsgUpdateClobPair.typeUrl || typeof o.authority === "string" && ClobPair.is(o.clobPair));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUpdateClobPair.typeUrl || typeof o.authority === "string" && ClobPair.isSDK(o.clob_pair));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUpdateClobPair.typeUrl || typeof o.authority === "string" && ClobPair.isAmino(o.clob_pair));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.clobPair !== undefined) {
            ClobPair.encode(message.clobPair, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateClobPair();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.clobPair = ClobPair.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateClobPair();
        message.authority = object.authority ?? "";
        message.clobPair = object.clobPair !== undefined && object.clobPair !== null ? ClobPair.fromPartial(object.clobPair) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateClobPair();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.clob_pair !== undefined && object.clob_pair !== null) {
            message.clobPair = ClobPair.fromAmino(object.clob_pair);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.clob_pair = message.clobPair ? ClobPair.toAmino(message.clobPair) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateClobPair.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateClobPair.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateClobPair.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
            value: MsgUpdateClobPair.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateClobPair.typeUrl, MsgUpdateClobPair);
function createBaseMsgUpdateClobPairResponse() {
    return {};
}
export const MsgUpdateClobPairResponse = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateClobPairResponse",
    is(o) {
        return o && o.$typeUrl === MsgUpdateClobPairResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgUpdateClobPairResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgUpdateClobPairResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateClobPairResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateClobPairResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdateClobPairResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateClobPairResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateClobPairResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateClobPairResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateClobPairResponse",
            value: MsgUpdateClobPairResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateClobPairResponse.typeUrl, MsgUpdateClobPairResponse);
function createBaseOperationRaw() {
    return {
        match: undefined,
        shortTermOrderPlacement: undefined,
        orderRemoval: undefined
    };
}
export const OperationRaw = {
    typeUrl: "/klyraprotocol.clob.OperationRaw",
    is(o) {
        return o && o.$typeUrl === OperationRaw.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === OperationRaw.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === OperationRaw.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.match !== undefined) {
            ClobMatch.encode(message.match, writer.uint32(10).fork()).ldelim();
        }
        if (message.shortTermOrderPlacement !== undefined) {
            writer.uint32(18).bytes(message.shortTermOrderPlacement);
        }
        if (message.orderRemoval !== undefined) {
            OrderRemoval.encode(message.orderRemoval, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOperationRaw();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.match = ClobMatch.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.shortTermOrderPlacement = reader.bytes();
                    break;
                case 3:
                    message.orderRemoval = OrderRemoval.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOperationRaw();
        message.match = object.match !== undefined && object.match !== null ? ClobMatch.fromPartial(object.match) : undefined;
        message.shortTermOrderPlacement = object.shortTermOrderPlacement ?? undefined;
        message.orderRemoval = object.orderRemoval !== undefined && object.orderRemoval !== null ? OrderRemoval.fromPartial(object.orderRemoval) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseOperationRaw();
        if (object.match !== undefined && object.match !== null) {
            message.match = ClobMatch.fromAmino(object.match);
        }
        if (object.short_term_order_placement !== undefined && object.short_term_order_placement !== null) {
            message.shortTermOrderPlacement = bytesFromBase64(object.short_term_order_placement);
        }
        if (object.order_removal !== undefined && object.order_removal !== null) {
            message.orderRemoval = OrderRemoval.fromAmino(object.order_removal);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.match = message.match ? ClobMatch.toAmino(message.match) : undefined;
        obj.short_term_order_placement = message.shortTermOrderPlacement ? base64FromBytes(message.shortTermOrderPlacement) : undefined;
        obj.order_removal = message.orderRemoval ? OrderRemoval.toAmino(message.orderRemoval) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return OperationRaw.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return OperationRaw.decode(message.value);
    },
    toProto(message) {
        return OperationRaw.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.OperationRaw",
            value: OperationRaw.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(OperationRaw.typeUrl, OperationRaw);
function createBaseMsgUpdateEquityTierLimitConfiguration() {
    return {
        authority: "",
        equityTierLimitConfig: EquityTierLimitConfiguration.fromPartial({})
    };
}
export const MsgUpdateEquityTierLimitConfiguration = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
    is(o) {
        return o && (o.$typeUrl === MsgUpdateEquityTierLimitConfiguration.typeUrl || typeof o.authority === "string" && EquityTierLimitConfiguration.is(o.equityTierLimitConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUpdateEquityTierLimitConfiguration.typeUrl || typeof o.authority === "string" && EquityTierLimitConfiguration.isSDK(o.equity_tier_limit_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUpdateEquityTierLimitConfiguration.typeUrl || typeof o.authority === "string" && EquityTierLimitConfiguration.isAmino(o.equity_tier_limit_config));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.equityTierLimitConfig !== undefined) {
            EquityTierLimitConfiguration.encode(message.equityTierLimitConfig, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateEquityTierLimitConfiguration();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.equityTierLimitConfig = EquityTierLimitConfiguration.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateEquityTierLimitConfiguration();
        message.authority = object.authority ?? "";
        message.equityTierLimitConfig = object.equityTierLimitConfig !== undefined && object.equityTierLimitConfig !== null ? EquityTierLimitConfiguration.fromPartial(object.equityTierLimitConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateEquityTierLimitConfiguration();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.equity_tier_limit_config !== undefined && object.equity_tier_limit_config !== null) {
            message.equityTierLimitConfig = EquityTierLimitConfiguration.fromAmino(object.equity_tier_limit_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.equity_tier_limit_config = message.equityTierLimitConfig ? EquityTierLimitConfiguration.toAmino(message.equityTierLimitConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateEquityTierLimitConfiguration.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateEquityTierLimitConfiguration.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateEquityTierLimitConfiguration.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
            value: MsgUpdateEquityTierLimitConfiguration.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateEquityTierLimitConfiguration.typeUrl, MsgUpdateEquityTierLimitConfiguration);
function createBaseMsgUpdateEquityTierLimitConfigurationResponse() {
    return {};
}
export const MsgUpdateEquityTierLimitConfigurationResponse = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfigurationResponse",
    is(o) {
        return o && o.$typeUrl === MsgUpdateEquityTierLimitConfigurationResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgUpdateEquityTierLimitConfigurationResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgUpdateEquityTierLimitConfigurationResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateEquityTierLimitConfigurationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateEquityTierLimitConfigurationResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdateEquityTierLimitConfigurationResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateEquityTierLimitConfigurationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateEquityTierLimitConfigurationResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateEquityTierLimitConfigurationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfigurationResponse",
            value: MsgUpdateEquityTierLimitConfigurationResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateEquityTierLimitConfigurationResponse.typeUrl, MsgUpdateEquityTierLimitConfigurationResponse);
function createBaseMsgUpdateBlockRateLimitConfiguration() {
    return {
        authority: "",
        blockRateLimitConfig: BlockRateLimitConfiguration.fromPartial({})
    };
}
export const MsgUpdateBlockRateLimitConfiguration = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
    is(o) {
        return o && (o.$typeUrl === MsgUpdateBlockRateLimitConfiguration.typeUrl || typeof o.authority === "string" && BlockRateLimitConfiguration.is(o.blockRateLimitConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUpdateBlockRateLimitConfiguration.typeUrl || typeof o.authority === "string" && BlockRateLimitConfiguration.isSDK(o.block_rate_limit_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUpdateBlockRateLimitConfiguration.typeUrl || typeof o.authority === "string" && BlockRateLimitConfiguration.isAmino(o.block_rate_limit_config));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.blockRateLimitConfig !== undefined) {
            BlockRateLimitConfiguration.encode(message.blockRateLimitConfig, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateBlockRateLimitConfiguration();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 3:
                    message.blockRateLimitConfig = BlockRateLimitConfiguration.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateBlockRateLimitConfiguration();
        message.authority = object.authority ?? "";
        message.blockRateLimitConfig = object.blockRateLimitConfig !== undefined && object.blockRateLimitConfig !== null ? BlockRateLimitConfiguration.fromPartial(object.blockRateLimitConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateBlockRateLimitConfiguration();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.block_rate_limit_config !== undefined && object.block_rate_limit_config !== null) {
            message.blockRateLimitConfig = BlockRateLimitConfiguration.fromAmino(object.block_rate_limit_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.block_rate_limit_config = message.blockRateLimitConfig ? BlockRateLimitConfiguration.toAmino(message.blockRateLimitConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateBlockRateLimitConfiguration.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateBlockRateLimitConfiguration.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateBlockRateLimitConfiguration.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
            value: MsgUpdateBlockRateLimitConfiguration.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateBlockRateLimitConfiguration.typeUrl, MsgUpdateBlockRateLimitConfiguration);
function createBaseMsgUpdateBlockRateLimitConfigurationResponse() {
    return {};
}
export const MsgUpdateBlockRateLimitConfigurationResponse = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfigurationResponse",
    is(o) {
        return o && o.$typeUrl === MsgUpdateBlockRateLimitConfigurationResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgUpdateBlockRateLimitConfigurationResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgUpdateBlockRateLimitConfigurationResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateBlockRateLimitConfigurationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateBlockRateLimitConfigurationResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdateBlockRateLimitConfigurationResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateBlockRateLimitConfigurationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateBlockRateLimitConfigurationResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateBlockRateLimitConfigurationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfigurationResponse",
            value: MsgUpdateBlockRateLimitConfigurationResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateBlockRateLimitConfigurationResponse.typeUrl, MsgUpdateBlockRateLimitConfigurationResponse);
function createBaseMsgUpdateLiquidationsConfig() {
    return {
        authority: "",
        liquidationsConfig: LiquidationsConfig.fromPartial({})
    };
}
export const MsgUpdateLiquidationsConfig = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
    is(o) {
        return o && (o.$typeUrl === MsgUpdateLiquidationsConfig.typeUrl || typeof o.authority === "string" && LiquidationsConfig.is(o.liquidationsConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUpdateLiquidationsConfig.typeUrl || typeof o.authority === "string" && LiquidationsConfig.isSDK(o.liquidations_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUpdateLiquidationsConfig.typeUrl || typeof o.authority === "string" && LiquidationsConfig.isAmino(o.liquidations_config));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.liquidationsConfig !== undefined) {
            LiquidationsConfig.encode(message.liquidationsConfig, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateLiquidationsConfig();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.liquidationsConfig = LiquidationsConfig.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateLiquidationsConfig();
        message.authority = object.authority ?? "";
        message.liquidationsConfig = object.liquidationsConfig !== undefined && object.liquidationsConfig !== null ? LiquidationsConfig.fromPartial(object.liquidationsConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateLiquidationsConfig();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.liquidations_config !== undefined && object.liquidations_config !== null) {
            message.liquidationsConfig = LiquidationsConfig.fromAmino(object.liquidations_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.liquidations_config = message.liquidationsConfig ? LiquidationsConfig.toAmino(message.liquidationsConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateLiquidationsConfig.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateLiquidationsConfig.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateLiquidationsConfig.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
            value: MsgUpdateLiquidationsConfig.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateLiquidationsConfig.typeUrl, MsgUpdateLiquidationsConfig);
function createBaseMsgUpdateLiquidationsConfigResponse() {
    return {};
}
export const MsgUpdateLiquidationsConfigResponse = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfigResponse",
    is(o) {
        return o && o.$typeUrl === MsgUpdateLiquidationsConfigResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgUpdateLiquidationsConfigResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgUpdateLiquidationsConfigResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateLiquidationsConfigResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateLiquidationsConfigResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdateLiquidationsConfigResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateLiquidationsConfigResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateLiquidationsConfigResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateLiquidationsConfigResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfigResponse",
            value: MsgUpdateLiquidationsConfigResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateLiquidationsConfigResponse.typeUrl, MsgUpdateLiquidationsConfigResponse);
