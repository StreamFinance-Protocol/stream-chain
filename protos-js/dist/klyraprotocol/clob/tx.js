"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgUpdateLiquidationsConfigResponse = exports.MsgUpdateLiquidationsConfig = exports.MsgUpdateBlockRateLimitConfigurationResponse = exports.MsgUpdateBlockRateLimitConfiguration = exports.MsgUpdateEquityTierLimitConfigurationResponse = exports.MsgUpdateEquityTierLimitConfiguration = exports.OperationRaw = exports.MsgUpdateClobPairResponse = exports.MsgUpdateClobPair = exports.MsgBatchCancelResponse = exports.OrderBatch = exports.MsgBatchCancel = exports.MsgCancelOrderResponse = exports.MsgCancelOrder = exports.MsgPlaceOrderResponse = exports.MsgPlaceOrder = exports.MsgProposedOperationsResponse = exports.MsgProposedOperations = exports.MsgCreateClobPairResponse = exports.MsgCreateClobPair = void 0;
//@ts-nocheck
const order_1 = require("./order");
const subaccount_1 = require("../subaccounts/subaccount");
const clob_pair_1 = require("./clob_pair");
const equity_tier_limit_config_1 = require("./equity_tier_limit_config");
const block_rate_limit_config_1 = require("./block_rate_limit_config");
const liquidations_config_1 = require("./liquidations_config");
const matches_1 = require("./matches");
const order_removals_1 = require("./order_removals");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
const helpers_1 = require("../../helpers");
function createBaseMsgCreateClobPair() {
    return {
        authority: "",
        clobPair: clob_pair_1.ClobPair.fromPartial({})
    };
}
exports.MsgCreateClobPair = {
    typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
    is(o) {
        return o && (o.$typeUrl === exports.MsgCreateClobPair.typeUrl || typeof o.authority === "string" && clob_pair_1.ClobPair.is(o.clobPair));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgCreateClobPair.typeUrl || typeof o.authority === "string" && clob_pair_1.ClobPair.isSDK(o.clob_pair));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgCreateClobPair.typeUrl || typeof o.authority === "string" && clob_pair_1.ClobPair.isAmino(o.clob_pair));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.clobPair !== undefined) {
            clob_pair_1.ClobPair.encode(message.clobPair, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateClobPair();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.clobPair = clob_pair_1.ClobPair.decode(reader, reader.uint32());
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
        message.clobPair = object.clobPair !== undefined && object.clobPair !== null ? clob_pair_1.ClobPair.fromPartial(object.clobPair) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCreateClobPair();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.clob_pair !== undefined && object.clob_pair !== null) {
            message.clobPair = clob_pair_1.ClobPair.fromAmino(object.clob_pair);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.clob_pair = message.clobPair ? clob_pair_1.ClobPair.toAmino(message.clobPair) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgCreateClobPair.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgCreateClobPair.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCreateClobPair.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
            value: exports.MsgCreateClobPair.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCreateClobPair.typeUrl, exports.MsgCreateClobPair);
function createBaseMsgCreateClobPairResponse() {
    return {};
}
exports.MsgCreateClobPairResponse = {
    typeUrl: "/klyraprotocol.clob.MsgCreateClobPairResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgCreateClobPairResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgCreateClobPairResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgCreateClobPairResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgCreateClobPairResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgCreateClobPairResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCreateClobPairResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgCreateClobPairResponse",
            value: exports.MsgCreateClobPairResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCreateClobPairResponse.typeUrl, exports.MsgCreateClobPairResponse);
function createBaseMsgProposedOperations() {
    return {
        operationsQueue: []
    };
}
exports.MsgProposedOperations = {
    typeUrl: "/klyraprotocol.clob.MsgProposedOperations",
    is(o) {
        return o && (o.$typeUrl === exports.MsgProposedOperations.typeUrl || Array.isArray(o.operationsQueue) && (!o.operationsQueue.length || exports.OperationRaw.is(o.operationsQueue[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgProposedOperations.typeUrl || Array.isArray(o.operations_queue) && (!o.operations_queue.length || exports.OperationRaw.isSDK(o.operations_queue[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgProposedOperations.typeUrl || Array.isArray(o.operations_queue) && (!o.operations_queue.length || exports.OperationRaw.isAmino(o.operations_queue[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.operationsQueue) {
            exports.OperationRaw.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgProposedOperations();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.operationsQueue.push(exports.OperationRaw.decode(reader, reader.uint32()));
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
        message.operationsQueue = object.operationsQueue?.map(e => exports.OperationRaw.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgProposedOperations();
        message.operationsQueue = object.operations_queue?.map(e => exports.OperationRaw.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.operationsQueue) {
            obj.operations_queue = message.operationsQueue.map(e => e ? exports.OperationRaw.toAmino(e) : undefined);
        }
        else {
            obj.operations_queue = message.operationsQueue;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgProposedOperations.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgProposedOperations.decode(message.value);
    },
    toProto(message) {
        return exports.MsgProposedOperations.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgProposedOperations",
            value: exports.MsgProposedOperations.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgProposedOperations.typeUrl, exports.MsgProposedOperations);
function createBaseMsgProposedOperationsResponse() {
    return {};
}
exports.MsgProposedOperationsResponse = {
    typeUrl: "/klyraprotocol.clob.MsgProposedOperationsResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgProposedOperationsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgProposedOperationsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgProposedOperationsResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgProposedOperationsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgProposedOperationsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgProposedOperationsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgProposedOperationsResponse",
            value: exports.MsgProposedOperationsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgProposedOperationsResponse.typeUrl, exports.MsgProposedOperationsResponse);
function createBaseMsgPlaceOrder() {
    return {
        order: order_1.Order.fromPartial({})
    };
}
exports.MsgPlaceOrder = {
    typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
    is(o) {
        return o && (o.$typeUrl === exports.MsgPlaceOrder.typeUrl || order_1.Order.is(o.order));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgPlaceOrder.typeUrl || order_1.Order.isSDK(o.order));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgPlaceOrder.typeUrl || order_1.Order.isAmino(o.order));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.order !== undefined) {
            order_1.Order.encode(message.order, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPlaceOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.order = order_1.Order.decode(reader, reader.uint32());
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
        message.order = object.order !== undefined && object.order !== null ? order_1.Order.fromPartial(object.order) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgPlaceOrder();
        if (object.order !== undefined && object.order !== null) {
            message.order = order_1.Order.fromAmino(object.order);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order = message.order ? order_1.Order.toAmino(message.order) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgPlaceOrder.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgPlaceOrder.decode(message.value);
    },
    toProto(message) {
        return exports.MsgPlaceOrder.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
            value: exports.MsgPlaceOrder.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgPlaceOrder.typeUrl, exports.MsgPlaceOrder);
function createBaseMsgPlaceOrderResponse() {
    return {};
}
exports.MsgPlaceOrderResponse = {
    typeUrl: "/klyraprotocol.clob.MsgPlaceOrderResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgPlaceOrderResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgPlaceOrderResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgPlaceOrderResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgPlaceOrderResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgPlaceOrderResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgPlaceOrderResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgPlaceOrderResponse",
            value: exports.MsgPlaceOrderResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgPlaceOrderResponse.typeUrl, exports.MsgPlaceOrderResponse);
function createBaseMsgCancelOrder() {
    return {
        orderId: order_1.OrderId.fromPartial({}),
        goodTilBlock: undefined,
        goodTilBlockTime: undefined
    };
}
exports.MsgCancelOrder = {
    typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
    is(o) {
        return o && (o.$typeUrl === exports.MsgCancelOrder.typeUrl || order_1.OrderId.is(o.orderId));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgCancelOrder.typeUrl || order_1.OrderId.isSDK(o.order_id));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgCancelOrder.typeUrl || order_1.OrderId.isAmino(o.order_id));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.orderId !== undefined) {
            order_1.OrderId.encode(message.orderId, writer.uint32(10).fork()).ldelim();
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
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderId = order_1.OrderId.decode(reader, reader.uint32());
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
        message.orderId = object.orderId !== undefined && object.orderId !== null ? order_1.OrderId.fromPartial(object.orderId) : undefined;
        message.goodTilBlock = object.goodTilBlock ?? undefined;
        message.goodTilBlockTime = object.goodTilBlockTime ?? undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCancelOrder();
        if (object.order_id !== undefined && object.order_id !== null) {
            message.orderId = order_1.OrderId.fromAmino(object.order_id);
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
        obj.order_id = message.orderId ? order_1.OrderId.toAmino(message.orderId) : undefined;
        obj.good_til_block = message.goodTilBlock === null ? undefined : message.goodTilBlock;
        obj.good_til_block_time = message.goodTilBlockTime === null ? undefined : message.goodTilBlockTime;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgCancelOrder.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgCancelOrder.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCancelOrder.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
            value: exports.MsgCancelOrder.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCancelOrder.typeUrl, exports.MsgCancelOrder);
function createBaseMsgCancelOrderResponse() {
    return {};
}
exports.MsgCancelOrderResponse = {
    typeUrl: "/klyraprotocol.clob.MsgCancelOrderResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgCancelOrderResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgCancelOrderResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgCancelOrderResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgCancelOrderResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgCancelOrderResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCancelOrderResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgCancelOrderResponse",
            value: exports.MsgCancelOrderResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCancelOrderResponse.typeUrl, exports.MsgCancelOrderResponse);
function createBaseMsgBatchCancel() {
    return {
        subaccountId: subaccount_1.SubaccountId.fromPartial({}),
        shortTermCancels: [],
        goodTilBlock: 0
    };
}
exports.MsgBatchCancel = {
    typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
    is(o) {
        return o && (o.$typeUrl === exports.MsgBatchCancel.typeUrl || subaccount_1.SubaccountId.is(o.subaccountId) && Array.isArray(o.shortTermCancels) && (!o.shortTermCancels.length || exports.OrderBatch.is(o.shortTermCancels[0])) && typeof o.goodTilBlock === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgBatchCancel.typeUrl || subaccount_1.SubaccountId.isSDK(o.subaccount_id) && Array.isArray(o.short_term_cancels) && (!o.short_term_cancels.length || exports.OrderBatch.isSDK(o.short_term_cancels[0])) && typeof o.good_til_block === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgBatchCancel.typeUrl || subaccount_1.SubaccountId.isAmino(o.subaccount_id) && Array.isArray(o.short_term_cancels) && (!o.short_term_cancels.length || exports.OrderBatch.isAmino(o.short_term_cancels[0])) && typeof o.good_til_block === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.subaccountId !== undefined) {
            subaccount_1.SubaccountId.encode(message.subaccountId, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.shortTermCancels) {
            exports.OrderBatch.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.goodTilBlock !== 0) {
            writer.uint32(24).uint32(message.goodTilBlock);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBatchCancel();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subaccountId = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.shortTermCancels.push(exports.OrderBatch.decode(reader, reader.uint32()));
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
        message.subaccountId = object.subaccountId !== undefined && object.subaccountId !== null ? subaccount_1.SubaccountId.fromPartial(object.subaccountId) : undefined;
        message.shortTermCancels = object.shortTermCancels?.map(e => exports.OrderBatch.fromPartial(e)) || [];
        message.goodTilBlock = object.goodTilBlock ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgBatchCancel();
        if (object.subaccount_id !== undefined && object.subaccount_id !== null) {
            message.subaccountId = subaccount_1.SubaccountId.fromAmino(object.subaccount_id);
        }
        message.shortTermCancels = object.short_term_cancels?.map(e => exports.OrderBatch.fromAmino(e)) || [];
        if (object.good_til_block !== undefined && object.good_til_block !== null) {
            message.goodTilBlock = object.good_til_block;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.subaccount_id = message.subaccountId ? subaccount_1.SubaccountId.toAmino(message.subaccountId) : undefined;
        if (message.shortTermCancels) {
            obj.short_term_cancels = message.shortTermCancels.map(e => e ? exports.OrderBatch.toAmino(e) : undefined);
        }
        else {
            obj.short_term_cancels = message.shortTermCancels;
        }
        obj.good_til_block = message.goodTilBlock === 0 ? undefined : message.goodTilBlock;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgBatchCancel.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgBatchCancel.decode(message.value);
    },
    toProto(message) {
        return exports.MsgBatchCancel.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
            value: exports.MsgBatchCancel.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgBatchCancel.typeUrl, exports.MsgBatchCancel);
function createBaseOrderBatch() {
    return {
        clobPairId: 0,
        clientIds: []
    };
}
exports.OrderBatch = {
    typeUrl: "/klyraprotocol.clob.OrderBatch",
    is(o) {
        return o && (o.$typeUrl === exports.OrderBatch.typeUrl || typeof o.clobPairId === "number" && Array.isArray(o.clientIds) && (!o.clientIds.length || typeof o.clientIds[0] === "number"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.OrderBatch.typeUrl || typeof o.clob_pair_id === "number" && Array.isArray(o.client_ids) && (!o.client_ids.length || typeof o.client_ids[0] === "number"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.OrderBatch.typeUrl || typeof o.clob_pair_id === "number" && Array.isArray(o.client_ids) && (!o.client_ids.length || typeof o.client_ids[0] === "number"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
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
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.OrderBatch.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.OrderBatch.decode(message.value);
    },
    toProto(message) {
        return exports.OrderBatch.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.OrderBatch",
            value: exports.OrderBatch.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.OrderBatch.typeUrl, exports.OrderBatch);
function createBaseMsgBatchCancelResponse() {
    return {
        shortTermSucceeded: [],
        shortTermFailed: []
    };
}
exports.MsgBatchCancelResponse = {
    typeUrl: "/klyraprotocol.clob.MsgBatchCancelResponse",
    is(o) {
        return o && (o.$typeUrl === exports.MsgBatchCancelResponse.typeUrl || Array.isArray(o.shortTermSucceeded) && (!o.shortTermSucceeded.length || exports.OrderBatch.is(o.shortTermSucceeded[0])) && Array.isArray(o.shortTermFailed) && (!o.shortTermFailed.length || exports.OrderBatch.is(o.shortTermFailed[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgBatchCancelResponse.typeUrl || Array.isArray(o.short_term_succeeded) && (!o.short_term_succeeded.length || exports.OrderBatch.isSDK(o.short_term_succeeded[0])) && Array.isArray(o.short_term_failed) && (!o.short_term_failed.length || exports.OrderBatch.isSDK(o.short_term_failed[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgBatchCancelResponse.typeUrl || Array.isArray(o.short_term_succeeded) && (!o.short_term_succeeded.length || exports.OrderBatch.isAmino(o.short_term_succeeded[0])) && Array.isArray(o.short_term_failed) && (!o.short_term_failed.length || exports.OrderBatch.isAmino(o.short_term_failed[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.shortTermSucceeded) {
            exports.OrderBatch.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.shortTermFailed) {
            exports.OrderBatch.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBatchCancelResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.shortTermSucceeded.push(exports.OrderBatch.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.shortTermFailed.push(exports.OrderBatch.decode(reader, reader.uint32()));
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
        message.shortTermSucceeded = object.shortTermSucceeded?.map(e => exports.OrderBatch.fromPartial(e)) || [];
        message.shortTermFailed = object.shortTermFailed?.map(e => exports.OrderBatch.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgBatchCancelResponse();
        message.shortTermSucceeded = object.short_term_succeeded?.map(e => exports.OrderBatch.fromAmino(e)) || [];
        message.shortTermFailed = object.short_term_failed?.map(e => exports.OrderBatch.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.shortTermSucceeded) {
            obj.short_term_succeeded = message.shortTermSucceeded.map(e => e ? exports.OrderBatch.toAmino(e) : undefined);
        }
        else {
            obj.short_term_succeeded = message.shortTermSucceeded;
        }
        if (message.shortTermFailed) {
            obj.short_term_failed = message.shortTermFailed.map(e => e ? exports.OrderBatch.toAmino(e) : undefined);
        }
        else {
            obj.short_term_failed = message.shortTermFailed;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgBatchCancelResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgBatchCancelResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgBatchCancelResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgBatchCancelResponse",
            value: exports.MsgBatchCancelResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgBatchCancelResponse.typeUrl, exports.MsgBatchCancelResponse);
function createBaseMsgUpdateClobPair() {
    return {
        authority: "",
        clobPair: clob_pair_1.ClobPair.fromPartial({})
    };
}
exports.MsgUpdateClobPair = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpdateClobPair.typeUrl || typeof o.authority === "string" && clob_pair_1.ClobPair.is(o.clobPair));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpdateClobPair.typeUrl || typeof o.authority === "string" && clob_pair_1.ClobPair.isSDK(o.clob_pair));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpdateClobPair.typeUrl || typeof o.authority === "string" && clob_pair_1.ClobPair.isAmino(o.clob_pair));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.clobPair !== undefined) {
            clob_pair_1.ClobPair.encode(message.clobPair, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateClobPair();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.clobPair = clob_pair_1.ClobPair.decode(reader, reader.uint32());
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
        message.clobPair = object.clobPair !== undefined && object.clobPair !== null ? clob_pair_1.ClobPair.fromPartial(object.clobPair) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateClobPair();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.clob_pair !== undefined && object.clob_pair !== null) {
            message.clobPair = clob_pair_1.ClobPair.fromAmino(object.clob_pair);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.clob_pair = message.clobPair ? clob_pair_1.ClobPair.toAmino(message.clobPair) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateClobPair.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateClobPair.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateClobPair.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
            value: exports.MsgUpdateClobPair.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateClobPair.typeUrl, exports.MsgUpdateClobPair);
function createBaseMsgUpdateClobPairResponse() {
    return {};
}
exports.MsgUpdateClobPairResponse = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateClobPairResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpdateClobPairResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpdateClobPairResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpdateClobPairResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgUpdateClobPairResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateClobPairResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateClobPairResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateClobPairResponse",
            value: exports.MsgUpdateClobPairResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateClobPairResponse.typeUrl, exports.MsgUpdateClobPairResponse);
function createBaseOperationRaw() {
    return {
        match: undefined,
        shortTermOrderPlacement: undefined,
        orderRemoval: undefined
    };
}
exports.OperationRaw = {
    typeUrl: "/klyraprotocol.clob.OperationRaw",
    is(o) {
        return o && o.$typeUrl === exports.OperationRaw.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.OperationRaw.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.OperationRaw.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.match !== undefined) {
            matches_1.ClobMatch.encode(message.match, writer.uint32(10).fork()).ldelim();
        }
        if (message.shortTermOrderPlacement !== undefined) {
            writer.uint32(18).bytes(message.shortTermOrderPlacement);
        }
        if (message.orderRemoval !== undefined) {
            order_removals_1.OrderRemoval.encode(message.orderRemoval, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOperationRaw();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.match = matches_1.ClobMatch.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.shortTermOrderPlacement = reader.bytes();
                    break;
                case 3:
                    message.orderRemoval = order_removals_1.OrderRemoval.decode(reader, reader.uint32());
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
        message.match = object.match !== undefined && object.match !== null ? matches_1.ClobMatch.fromPartial(object.match) : undefined;
        message.shortTermOrderPlacement = object.shortTermOrderPlacement ?? undefined;
        message.orderRemoval = object.orderRemoval !== undefined && object.orderRemoval !== null ? order_removals_1.OrderRemoval.fromPartial(object.orderRemoval) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseOperationRaw();
        if (object.match !== undefined && object.match !== null) {
            message.match = matches_1.ClobMatch.fromAmino(object.match);
        }
        if (object.short_term_order_placement !== undefined && object.short_term_order_placement !== null) {
            message.shortTermOrderPlacement = (0, helpers_1.bytesFromBase64)(object.short_term_order_placement);
        }
        if (object.order_removal !== undefined && object.order_removal !== null) {
            message.orderRemoval = order_removals_1.OrderRemoval.fromAmino(object.order_removal);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.match = message.match ? matches_1.ClobMatch.toAmino(message.match) : undefined;
        obj.short_term_order_placement = message.shortTermOrderPlacement ? (0, helpers_1.base64FromBytes)(message.shortTermOrderPlacement) : undefined;
        obj.order_removal = message.orderRemoval ? order_removals_1.OrderRemoval.toAmino(message.orderRemoval) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.OperationRaw.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.OperationRaw.decode(message.value);
    },
    toProto(message) {
        return exports.OperationRaw.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.OperationRaw",
            value: exports.OperationRaw.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.OperationRaw.typeUrl, exports.OperationRaw);
function createBaseMsgUpdateEquityTierLimitConfiguration() {
    return {
        authority: "",
        equityTierLimitConfig: equity_tier_limit_config_1.EquityTierLimitConfiguration.fromPartial({})
    };
}
exports.MsgUpdateEquityTierLimitConfiguration = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpdateEquityTierLimitConfiguration.typeUrl || typeof o.authority === "string" && equity_tier_limit_config_1.EquityTierLimitConfiguration.is(o.equityTierLimitConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpdateEquityTierLimitConfiguration.typeUrl || typeof o.authority === "string" && equity_tier_limit_config_1.EquityTierLimitConfiguration.isSDK(o.equity_tier_limit_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpdateEquityTierLimitConfiguration.typeUrl || typeof o.authority === "string" && equity_tier_limit_config_1.EquityTierLimitConfiguration.isAmino(o.equity_tier_limit_config));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.equityTierLimitConfig !== undefined) {
            equity_tier_limit_config_1.EquityTierLimitConfiguration.encode(message.equityTierLimitConfig, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateEquityTierLimitConfiguration();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.equityTierLimitConfig = equity_tier_limit_config_1.EquityTierLimitConfiguration.decode(reader, reader.uint32());
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
        message.equityTierLimitConfig = object.equityTierLimitConfig !== undefined && object.equityTierLimitConfig !== null ? equity_tier_limit_config_1.EquityTierLimitConfiguration.fromPartial(object.equityTierLimitConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateEquityTierLimitConfiguration();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.equity_tier_limit_config !== undefined && object.equity_tier_limit_config !== null) {
            message.equityTierLimitConfig = equity_tier_limit_config_1.EquityTierLimitConfiguration.fromAmino(object.equity_tier_limit_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.equity_tier_limit_config = message.equityTierLimitConfig ? equity_tier_limit_config_1.EquityTierLimitConfiguration.toAmino(message.equityTierLimitConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateEquityTierLimitConfiguration.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateEquityTierLimitConfiguration.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateEquityTierLimitConfiguration.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
            value: exports.MsgUpdateEquityTierLimitConfiguration.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateEquityTierLimitConfiguration.typeUrl, exports.MsgUpdateEquityTierLimitConfiguration);
function createBaseMsgUpdateEquityTierLimitConfigurationResponse() {
    return {};
}
exports.MsgUpdateEquityTierLimitConfigurationResponse = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfigurationResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpdateEquityTierLimitConfigurationResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpdateEquityTierLimitConfigurationResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpdateEquityTierLimitConfigurationResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgUpdateEquityTierLimitConfigurationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateEquityTierLimitConfigurationResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateEquityTierLimitConfigurationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfigurationResponse",
            value: exports.MsgUpdateEquityTierLimitConfigurationResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateEquityTierLimitConfigurationResponse.typeUrl, exports.MsgUpdateEquityTierLimitConfigurationResponse);
function createBaseMsgUpdateBlockRateLimitConfiguration() {
    return {
        authority: "",
        blockRateLimitConfig: block_rate_limit_config_1.BlockRateLimitConfiguration.fromPartial({})
    };
}
exports.MsgUpdateBlockRateLimitConfiguration = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpdateBlockRateLimitConfiguration.typeUrl || typeof o.authority === "string" && block_rate_limit_config_1.BlockRateLimitConfiguration.is(o.blockRateLimitConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpdateBlockRateLimitConfiguration.typeUrl || typeof o.authority === "string" && block_rate_limit_config_1.BlockRateLimitConfiguration.isSDK(o.block_rate_limit_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpdateBlockRateLimitConfiguration.typeUrl || typeof o.authority === "string" && block_rate_limit_config_1.BlockRateLimitConfiguration.isAmino(o.block_rate_limit_config));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.blockRateLimitConfig !== undefined) {
            block_rate_limit_config_1.BlockRateLimitConfiguration.encode(message.blockRateLimitConfig, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateBlockRateLimitConfiguration();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 3:
                    message.blockRateLimitConfig = block_rate_limit_config_1.BlockRateLimitConfiguration.decode(reader, reader.uint32());
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
        message.blockRateLimitConfig = object.blockRateLimitConfig !== undefined && object.blockRateLimitConfig !== null ? block_rate_limit_config_1.BlockRateLimitConfiguration.fromPartial(object.blockRateLimitConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateBlockRateLimitConfiguration();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.block_rate_limit_config !== undefined && object.block_rate_limit_config !== null) {
            message.blockRateLimitConfig = block_rate_limit_config_1.BlockRateLimitConfiguration.fromAmino(object.block_rate_limit_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.block_rate_limit_config = message.blockRateLimitConfig ? block_rate_limit_config_1.BlockRateLimitConfiguration.toAmino(message.blockRateLimitConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateBlockRateLimitConfiguration.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateBlockRateLimitConfiguration.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateBlockRateLimitConfiguration.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
            value: exports.MsgUpdateBlockRateLimitConfiguration.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateBlockRateLimitConfiguration.typeUrl, exports.MsgUpdateBlockRateLimitConfiguration);
function createBaseMsgUpdateBlockRateLimitConfigurationResponse() {
    return {};
}
exports.MsgUpdateBlockRateLimitConfigurationResponse = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfigurationResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpdateBlockRateLimitConfigurationResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpdateBlockRateLimitConfigurationResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpdateBlockRateLimitConfigurationResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgUpdateBlockRateLimitConfigurationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateBlockRateLimitConfigurationResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateBlockRateLimitConfigurationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfigurationResponse",
            value: exports.MsgUpdateBlockRateLimitConfigurationResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateBlockRateLimitConfigurationResponse.typeUrl, exports.MsgUpdateBlockRateLimitConfigurationResponse);
function createBaseMsgUpdateLiquidationsConfig() {
    return {
        authority: "",
        liquidationsConfig: liquidations_config_1.LiquidationsConfig.fromPartial({})
    };
}
exports.MsgUpdateLiquidationsConfig = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpdateLiquidationsConfig.typeUrl || typeof o.authority === "string" && liquidations_config_1.LiquidationsConfig.is(o.liquidationsConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpdateLiquidationsConfig.typeUrl || typeof o.authority === "string" && liquidations_config_1.LiquidationsConfig.isSDK(o.liquidations_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpdateLiquidationsConfig.typeUrl || typeof o.authority === "string" && liquidations_config_1.LiquidationsConfig.isAmino(o.liquidations_config));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.liquidationsConfig !== undefined) {
            liquidations_config_1.LiquidationsConfig.encode(message.liquidationsConfig, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateLiquidationsConfig();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.liquidationsConfig = liquidations_config_1.LiquidationsConfig.decode(reader, reader.uint32());
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
        message.liquidationsConfig = object.liquidationsConfig !== undefined && object.liquidationsConfig !== null ? liquidations_config_1.LiquidationsConfig.fromPartial(object.liquidationsConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateLiquidationsConfig();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.liquidations_config !== undefined && object.liquidations_config !== null) {
            message.liquidationsConfig = liquidations_config_1.LiquidationsConfig.fromAmino(object.liquidations_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.liquidations_config = message.liquidationsConfig ? liquidations_config_1.LiquidationsConfig.toAmino(message.liquidationsConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateLiquidationsConfig.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateLiquidationsConfig.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateLiquidationsConfig.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
            value: exports.MsgUpdateLiquidationsConfig.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateLiquidationsConfig.typeUrl, exports.MsgUpdateLiquidationsConfig);
function createBaseMsgUpdateLiquidationsConfigResponse() {
    return {};
}
exports.MsgUpdateLiquidationsConfigResponse = {
    typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfigResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpdateLiquidationsConfigResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpdateLiquidationsConfigResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpdateLiquidationsConfigResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgUpdateLiquidationsConfigResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateLiquidationsConfigResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateLiquidationsConfigResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfigResponse",
            value: exports.MsgUpdateLiquidationsConfigResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateLiquidationsConfigResponse.typeUrl, exports.MsgUpdateLiquidationsConfigResponse);
