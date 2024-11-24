"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchPerpetualDeleveraging_Fill = exports.MatchPerpetualDeleveraging = exports.MatchPerpetualLiquidation = exports.MatchOrders = exports.MakerFill = exports.ClobMatch = void 0;
//@ts-nocheck
const order_1 = require("./order");
const subaccount_1 = require("../subaccounts/subaccount");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseClobMatch() {
    return {
        matchOrders: undefined,
        matchPerpetualLiquidation: undefined,
        matchPerpetualDeleveraging: undefined
    };
}
exports.ClobMatch = {
    typeUrl: "/klyraprotocol.clob.ClobMatch",
    is(o) {
        return o && o.$typeUrl === exports.ClobMatch.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.ClobMatch.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.ClobMatch.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.matchOrders !== undefined) {
            exports.MatchOrders.encode(message.matchOrders, writer.uint32(10).fork()).ldelim();
        }
        if (message.matchPerpetualLiquidation !== undefined) {
            exports.MatchPerpetualLiquidation.encode(message.matchPerpetualLiquidation, writer.uint32(18).fork()).ldelim();
        }
        if (message.matchPerpetualDeleveraging !== undefined) {
            exports.MatchPerpetualDeleveraging.encode(message.matchPerpetualDeleveraging, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseClobMatch();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.matchOrders = exports.MatchOrders.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.matchPerpetualLiquidation = exports.MatchPerpetualLiquidation.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.matchPerpetualDeleveraging = exports.MatchPerpetualDeleveraging.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseClobMatch();
        message.matchOrders = object.matchOrders !== undefined && object.matchOrders !== null ? exports.MatchOrders.fromPartial(object.matchOrders) : undefined;
        message.matchPerpetualLiquidation = object.matchPerpetualLiquidation !== undefined && object.matchPerpetualLiquidation !== null ? exports.MatchPerpetualLiquidation.fromPartial(object.matchPerpetualLiquidation) : undefined;
        message.matchPerpetualDeleveraging = object.matchPerpetualDeleveraging !== undefined && object.matchPerpetualDeleveraging !== null ? exports.MatchPerpetualDeleveraging.fromPartial(object.matchPerpetualDeleveraging) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseClobMatch();
        if (object.match_orders !== undefined && object.match_orders !== null) {
            message.matchOrders = exports.MatchOrders.fromAmino(object.match_orders);
        }
        if (object.match_perpetual_liquidation !== undefined && object.match_perpetual_liquidation !== null) {
            message.matchPerpetualLiquidation = exports.MatchPerpetualLiquidation.fromAmino(object.match_perpetual_liquidation);
        }
        if (object.match_perpetual_deleveraging !== undefined && object.match_perpetual_deleveraging !== null) {
            message.matchPerpetualDeleveraging = exports.MatchPerpetualDeleveraging.fromAmino(object.match_perpetual_deleveraging);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.match_orders = message.matchOrders ? exports.MatchOrders.toAmino(message.matchOrders) : undefined;
        obj.match_perpetual_liquidation = message.matchPerpetualLiquidation ? exports.MatchPerpetualLiquidation.toAmino(message.matchPerpetualLiquidation) : undefined;
        obj.match_perpetual_deleveraging = message.matchPerpetualDeleveraging ? exports.MatchPerpetualDeleveraging.toAmino(message.matchPerpetualDeleveraging) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ClobMatch.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ClobMatch.decode(message.value);
    },
    toProto(message) {
        return exports.ClobMatch.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.ClobMatch",
            value: exports.ClobMatch.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ClobMatch.typeUrl, exports.ClobMatch);
function createBaseMakerFill() {
    return {
        fillAmount: BigInt(0),
        makerOrderId: order_1.OrderId.fromPartial({})
    };
}
exports.MakerFill = {
    typeUrl: "/klyraprotocol.clob.MakerFill",
    is(o) {
        return o && (o.$typeUrl === exports.MakerFill.typeUrl || typeof o.fillAmount === "bigint" && order_1.OrderId.is(o.makerOrderId));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MakerFill.typeUrl || typeof o.fill_amount === "bigint" && order_1.OrderId.isSDK(o.maker_order_id));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MakerFill.typeUrl || typeof o.fill_amount === "bigint" && order_1.OrderId.isAmino(o.maker_order_id));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.fillAmount !== BigInt(0)) {
            writer.uint32(8).uint64(message.fillAmount);
        }
        if (message.makerOrderId !== undefined) {
            order_1.OrderId.encode(message.makerOrderId, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMakerFill();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fillAmount = reader.uint64();
                    break;
                case 2:
                    message.makerOrderId = order_1.OrderId.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMakerFill();
        message.fillAmount = object.fillAmount !== undefined && object.fillAmount !== null ? BigInt(object.fillAmount.toString()) : BigInt(0);
        message.makerOrderId = object.makerOrderId !== undefined && object.makerOrderId !== null ? order_1.OrderId.fromPartial(object.makerOrderId) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMakerFill();
        if (object.fill_amount !== undefined && object.fill_amount !== null) {
            message.fillAmount = BigInt(object.fill_amount);
        }
        if (object.maker_order_id !== undefined && object.maker_order_id !== null) {
            message.makerOrderId = order_1.OrderId.fromAmino(object.maker_order_id);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.fill_amount = message.fillAmount !== BigInt(0) ? message.fillAmount?.toString() : undefined;
        obj.maker_order_id = message.makerOrderId ? order_1.OrderId.toAmino(message.makerOrderId) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MakerFill.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MakerFill.decode(message.value);
    },
    toProto(message) {
        return exports.MakerFill.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MakerFill",
            value: exports.MakerFill.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MakerFill.typeUrl, exports.MakerFill);
function createBaseMatchOrders() {
    return {
        takerOrderId: order_1.OrderId.fromPartial({}),
        fills: []
    };
}
exports.MatchOrders = {
    typeUrl: "/klyraprotocol.clob.MatchOrders",
    is(o) {
        return o && (o.$typeUrl === exports.MatchOrders.typeUrl || order_1.OrderId.is(o.takerOrderId) && Array.isArray(o.fills) && (!o.fills.length || exports.MakerFill.is(o.fills[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MatchOrders.typeUrl || order_1.OrderId.isSDK(o.taker_order_id) && Array.isArray(o.fills) && (!o.fills.length || exports.MakerFill.isSDK(o.fills[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MatchOrders.typeUrl || order_1.OrderId.isAmino(o.taker_order_id) && Array.isArray(o.fills) && (!o.fills.length || exports.MakerFill.isAmino(o.fills[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.takerOrderId !== undefined) {
            order_1.OrderId.encode(message.takerOrderId, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.fills) {
            exports.MakerFill.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMatchOrders();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.takerOrderId = order_1.OrderId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.fills.push(exports.MakerFill.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMatchOrders();
        message.takerOrderId = object.takerOrderId !== undefined && object.takerOrderId !== null ? order_1.OrderId.fromPartial(object.takerOrderId) : undefined;
        message.fills = object.fills?.map(e => exports.MakerFill.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMatchOrders();
        if (object.taker_order_id !== undefined && object.taker_order_id !== null) {
            message.takerOrderId = order_1.OrderId.fromAmino(object.taker_order_id);
        }
        message.fills = object.fills?.map(e => exports.MakerFill.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.taker_order_id = message.takerOrderId ? order_1.OrderId.toAmino(message.takerOrderId) : undefined;
        if (message.fills) {
            obj.fills = message.fills.map(e => e ? exports.MakerFill.toAmino(e) : undefined);
        }
        else {
            obj.fills = message.fills;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MatchOrders.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MatchOrders.decode(message.value);
    },
    toProto(message) {
        return exports.MatchOrders.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MatchOrders",
            value: exports.MatchOrders.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MatchOrders.typeUrl, exports.MatchOrders);
function createBaseMatchPerpetualLiquidation() {
    return {
        liquidated: subaccount_1.SubaccountId.fromPartial({}),
        clobPairId: 0,
        perpetualId: 0,
        totalSize: BigInt(0),
        isBuy: false,
        fills: []
    };
}
exports.MatchPerpetualLiquidation = {
    typeUrl: "/klyraprotocol.clob.MatchPerpetualLiquidation",
    is(o) {
        return o && (o.$typeUrl === exports.MatchPerpetualLiquidation.typeUrl || subaccount_1.SubaccountId.is(o.liquidated) && typeof o.clobPairId === "number" && typeof o.perpetualId === "number" && typeof o.totalSize === "bigint" && typeof o.isBuy === "boolean" && Array.isArray(o.fills) && (!o.fills.length || exports.MakerFill.is(o.fills[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MatchPerpetualLiquidation.typeUrl || subaccount_1.SubaccountId.isSDK(o.liquidated) && typeof o.clob_pair_id === "number" && typeof o.perpetual_id === "number" && typeof o.total_size === "bigint" && typeof o.is_buy === "boolean" && Array.isArray(o.fills) && (!o.fills.length || exports.MakerFill.isSDK(o.fills[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MatchPerpetualLiquidation.typeUrl || subaccount_1.SubaccountId.isAmino(o.liquidated) && typeof o.clob_pair_id === "number" && typeof o.perpetual_id === "number" && typeof o.total_size === "bigint" && typeof o.is_buy === "boolean" && Array.isArray(o.fills) && (!o.fills.length || exports.MakerFill.isAmino(o.fills[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.liquidated !== undefined) {
            subaccount_1.SubaccountId.encode(message.liquidated, writer.uint32(10).fork()).ldelim();
        }
        if (message.clobPairId !== 0) {
            writer.uint32(16).uint32(message.clobPairId);
        }
        if (message.perpetualId !== 0) {
            writer.uint32(24).uint32(message.perpetualId);
        }
        if (message.totalSize !== BigInt(0)) {
            writer.uint32(32).uint64(message.totalSize);
        }
        if (message.isBuy === true) {
            writer.uint32(40).bool(message.isBuy);
        }
        for (const v of message.fills) {
            exports.MakerFill.encode(v, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMatchPerpetualLiquidation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.liquidated = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.clobPairId = reader.uint32();
                    break;
                case 3:
                    message.perpetualId = reader.uint32();
                    break;
                case 4:
                    message.totalSize = reader.uint64();
                    break;
                case 5:
                    message.isBuy = reader.bool();
                    break;
                case 6:
                    message.fills.push(exports.MakerFill.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMatchPerpetualLiquidation();
        message.liquidated = object.liquidated !== undefined && object.liquidated !== null ? subaccount_1.SubaccountId.fromPartial(object.liquidated) : undefined;
        message.clobPairId = object.clobPairId ?? 0;
        message.perpetualId = object.perpetualId ?? 0;
        message.totalSize = object.totalSize !== undefined && object.totalSize !== null ? BigInt(object.totalSize.toString()) : BigInt(0);
        message.isBuy = object.isBuy ?? false;
        message.fills = object.fills?.map(e => exports.MakerFill.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMatchPerpetualLiquidation();
        if (object.liquidated !== undefined && object.liquidated !== null) {
            message.liquidated = subaccount_1.SubaccountId.fromAmino(object.liquidated);
        }
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        if (object.total_size !== undefined && object.total_size !== null) {
            message.totalSize = BigInt(object.total_size);
        }
        if (object.is_buy !== undefined && object.is_buy !== null) {
            message.isBuy = object.is_buy;
        }
        message.fills = object.fills?.map(e => exports.MakerFill.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.liquidated = message.liquidated ? subaccount_1.SubaccountId.toAmino(message.liquidated) : undefined;
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        obj.total_size = message.totalSize !== BigInt(0) ? message.totalSize?.toString() : undefined;
        obj.is_buy = message.isBuy === false ? undefined : message.isBuy;
        if (message.fills) {
            obj.fills = message.fills.map(e => e ? exports.MakerFill.toAmino(e) : undefined);
        }
        else {
            obj.fills = message.fills;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MatchPerpetualLiquidation.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MatchPerpetualLiquidation.decode(message.value);
    },
    toProto(message) {
        return exports.MatchPerpetualLiquidation.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MatchPerpetualLiquidation",
            value: exports.MatchPerpetualLiquidation.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MatchPerpetualLiquidation.typeUrl, exports.MatchPerpetualLiquidation);
function createBaseMatchPerpetualDeleveraging() {
    return {
        liquidated: subaccount_1.SubaccountId.fromPartial({}),
        perpetualId: 0,
        fills: [],
        isFinalSettlement: false
    };
}
exports.MatchPerpetualDeleveraging = {
    typeUrl: "/klyraprotocol.clob.MatchPerpetualDeleveraging",
    is(o) {
        return o && (o.$typeUrl === exports.MatchPerpetualDeleveraging.typeUrl || subaccount_1.SubaccountId.is(o.liquidated) && typeof o.perpetualId === "number" && Array.isArray(o.fills) && (!o.fills.length || exports.MatchPerpetualDeleveraging_Fill.is(o.fills[0])) && typeof o.isFinalSettlement === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MatchPerpetualDeleveraging.typeUrl || subaccount_1.SubaccountId.isSDK(o.liquidated) && typeof o.perpetual_id === "number" && Array.isArray(o.fills) && (!o.fills.length || exports.MatchPerpetualDeleveraging_Fill.isSDK(o.fills[0])) && typeof o.is_final_settlement === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MatchPerpetualDeleveraging.typeUrl || subaccount_1.SubaccountId.isAmino(o.liquidated) && typeof o.perpetual_id === "number" && Array.isArray(o.fills) && (!o.fills.length || exports.MatchPerpetualDeleveraging_Fill.isAmino(o.fills[0])) && typeof o.is_final_settlement === "boolean");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.liquidated !== undefined) {
            subaccount_1.SubaccountId.encode(message.liquidated, writer.uint32(10).fork()).ldelim();
        }
        if (message.perpetualId !== 0) {
            writer.uint32(16).uint32(message.perpetualId);
        }
        for (const v of message.fills) {
            exports.MatchPerpetualDeleveraging_Fill.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.isFinalSettlement === true) {
            writer.uint32(32).bool(message.isFinalSettlement);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMatchPerpetualDeleveraging();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.liquidated = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.perpetualId = reader.uint32();
                    break;
                case 3:
                    message.fills.push(exports.MatchPerpetualDeleveraging_Fill.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.isFinalSettlement = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMatchPerpetualDeleveraging();
        message.liquidated = object.liquidated !== undefined && object.liquidated !== null ? subaccount_1.SubaccountId.fromPartial(object.liquidated) : undefined;
        message.perpetualId = object.perpetualId ?? 0;
        message.fills = object.fills?.map(e => exports.MatchPerpetualDeleveraging_Fill.fromPartial(e)) || [];
        message.isFinalSettlement = object.isFinalSettlement ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMatchPerpetualDeleveraging();
        if (object.liquidated !== undefined && object.liquidated !== null) {
            message.liquidated = subaccount_1.SubaccountId.fromAmino(object.liquidated);
        }
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        message.fills = object.fills?.map(e => exports.MatchPerpetualDeleveraging_Fill.fromAmino(e)) || [];
        if (object.is_final_settlement !== undefined && object.is_final_settlement !== null) {
            message.isFinalSettlement = object.is_final_settlement;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.liquidated = message.liquidated ? subaccount_1.SubaccountId.toAmino(message.liquidated) : undefined;
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        if (message.fills) {
            obj.fills = message.fills.map(e => e ? exports.MatchPerpetualDeleveraging_Fill.toAmino(e) : undefined);
        }
        else {
            obj.fills = message.fills;
        }
        obj.is_final_settlement = message.isFinalSettlement === false ? undefined : message.isFinalSettlement;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MatchPerpetualDeleveraging.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MatchPerpetualDeleveraging.decode(message.value);
    },
    toProto(message) {
        return exports.MatchPerpetualDeleveraging.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MatchPerpetualDeleveraging",
            value: exports.MatchPerpetualDeleveraging.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MatchPerpetualDeleveraging.typeUrl, exports.MatchPerpetualDeleveraging);
function createBaseMatchPerpetualDeleveraging_Fill() {
    return {
        offsettingSubaccountId: subaccount_1.SubaccountId.fromPartial({}),
        fillAmount: BigInt(0)
    };
}
exports.MatchPerpetualDeleveraging_Fill = {
    typeUrl: "/klyraprotocol.clob.Fill",
    is(o) {
        return o && (o.$typeUrl === exports.MatchPerpetualDeleveraging_Fill.typeUrl || subaccount_1.SubaccountId.is(o.offsettingSubaccountId) && typeof o.fillAmount === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MatchPerpetualDeleveraging_Fill.typeUrl || subaccount_1.SubaccountId.isSDK(o.offsetting_subaccount_id) && typeof o.fill_amount === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MatchPerpetualDeleveraging_Fill.typeUrl || subaccount_1.SubaccountId.isAmino(o.offsetting_subaccount_id) && typeof o.fill_amount === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.offsettingSubaccountId !== undefined) {
            subaccount_1.SubaccountId.encode(message.offsettingSubaccountId, writer.uint32(10).fork()).ldelim();
        }
        if (message.fillAmount !== BigInt(0)) {
            writer.uint32(16).uint64(message.fillAmount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMatchPerpetualDeleveraging_Fill();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.offsettingSubaccountId = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.fillAmount = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMatchPerpetualDeleveraging_Fill();
        message.offsettingSubaccountId = object.offsettingSubaccountId !== undefined && object.offsettingSubaccountId !== null ? subaccount_1.SubaccountId.fromPartial(object.offsettingSubaccountId) : undefined;
        message.fillAmount = object.fillAmount !== undefined && object.fillAmount !== null ? BigInt(object.fillAmount.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMatchPerpetualDeleveraging_Fill();
        if (object.offsetting_subaccount_id !== undefined && object.offsetting_subaccount_id !== null) {
            message.offsettingSubaccountId = subaccount_1.SubaccountId.fromAmino(object.offsetting_subaccount_id);
        }
        if (object.fill_amount !== undefined && object.fill_amount !== null) {
            message.fillAmount = BigInt(object.fill_amount);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.offsetting_subaccount_id = message.offsettingSubaccountId ? subaccount_1.SubaccountId.toAmino(message.offsettingSubaccountId) : undefined;
        obj.fill_amount = message.fillAmount !== BigInt(0) ? message.fillAmount?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MatchPerpetualDeleveraging_Fill.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MatchPerpetualDeleveraging_Fill.decode(message.value);
    },
    toProto(message) {
        return exports.MatchPerpetualDeleveraging_Fill.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.Fill",
            value: exports.MatchPerpetualDeleveraging_Fill.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MatchPerpetualDeleveraging_Fill.typeUrl, exports.MatchPerpetualDeleveraging_Fill);
