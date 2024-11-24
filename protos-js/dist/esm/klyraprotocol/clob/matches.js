//@ts-nocheck
import { OrderId } from "./order";
import { SubaccountId } from "../subaccounts/subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseClobMatch() {
    return {
        matchOrders: undefined,
        matchPerpetualLiquidation: undefined,
        matchPerpetualDeleveraging: undefined
    };
}
export const ClobMatch = {
    typeUrl: "/klyraprotocol.clob.ClobMatch",
    is(o) {
        return o && o.$typeUrl === ClobMatch.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === ClobMatch.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === ClobMatch.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.matchOrders !== undefined) {
            MatchOrders.encode(message.matchOrders, writer.uint32(10).fork()).ldelim();
        }
        if (message.matchPerpetualLiquidation !== undefined) {
            MatchPerpetualLiquidation.encode(message.matchPerpetualLiquidation, writer.uint32(18).fork()).ldelim();
        }
        if (message.matchPerpetualDeleveraging !== undefined) {
            MatchPerpetualDeleveraging.encode(message.matchPerpetualDeleveraging, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseClobMatch();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.matchOrders = MatchOrders.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.matchPerpetualLiquidation = MatchPerpetualLiquidation.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.matchPerpetualDeleveraging = MatchPerpetualDeleveraging.decode(reader, reader.uint32());
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
        message.matchOrders = object.matchOrders !== undefined && object.matchOrders !== null ? MatchOrders.fromPartial(object.matchOrders) : undefined;
        message.matchPerpetualLiquidation = object.matchPerpetualLiquidation !== undefined && object.matchPerpetualLiquidation !== null ? MatchPerpetualLiquidation.fromPartial(object.matchPerpetualLiquidation) : undefined;
        message.matchPerpetualDeleveraging = object.matchPerpetualDeleveraging !== undefined && object.matchPerpetualDeleveraging !== null ? MatchPerpetualDeleveraging.fromPartial(object.matchPerpetualDeleveraging) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseClobMatch();
        if (object.match_orders !== undefined && object.match_orders !== null) {
            message.matchOrders = MatchOrders.fromAmino(object.match_orders);
        }
        if (object.match_perpetual_liquidation !== undefined && object.match_perpetual_liquidation !== null) {
            message.matchPerpetualLiquidation = MatchPerpetualLiquidation.fromAmino(object.match_perpetual_liquidation);
        }
        if (object.match_perpetual_deleveraging !== undefined && object.match_perpetual_deleveraging !== null) {
            message.matchPerpetualDeleveraging = MatchPerpetualDeleveraging.fromAmino(object.match_perpetual_deleveraging);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.match_orders = message.matchOrders ? MatchOrders.toAmino(message.matchOrders) : undefined;
        obj.match_perpetual_liquidation = message.matchPerpetualLiquidation ? MatchPerpetualLiquidation.toAmino(message.matchPerpetualLiquidation) : undefined;
        obj.match_perpetual_deleveraging = message.matchPerpetualDeleveraging ? MatchPerpetualDeleveraging.toAmino(message.matchPerpetualDeleveraging) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return ClobMatch.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return ClobMatch.decode(message.value);
    },
    toProto(message) {
        return ClobMatch.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.ClobMatch",
            value: ClobMatch.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ClobMatch.typeUrl, ClobMatch);
function createBaseMakerFill() {
    return {
        fillAmount: BigInt(0),
        makerOrderId: OrderId.fromPartial({})
    };
}
export const MakerFill = {
    typeUrl: "/klyraprotocol.clob.MakerFill",
    is(o) {
        return o && (o.$typeUrl === MakerFill.typeUrl || typeof o.fillAmount === "bigint" && OrderId.is(o.makerOrderId));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MakerFill.typeUrl || typeof o.fill_amount === "bigint" && OrderId.isSDK(o.maker_order_id));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MakerFill.typeUrl || typeof o.fill_amount === "bigint" && OrderId.isAmino(o.maker_order_id));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.fillAmount !== BigInt(0)) {
            writer.uint32(8).uint64(message.fillAmount);
        }
        if (message.makerOrderId !== undefined) {
            OrderId.encode(message.makerOrderId, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMakerFill();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fillAmount = reader.uint64();
                    break;
                case 2:
                    message.makerOrderId = OrderId.decode(reader, reader.uint32());
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
        message.makerOrderId = object.makerOrderId !== undefined && object.makerOrderId !== null ? OrderId.fromPartial(object.makerOrderId) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMakerFill();
        if (object.fill_amount !== undefined && object.fill_amount !== null) {
            message.fillAmount = BigInt(object.fill_amount);
        }
        if (object.maker_order_id !== undefined && object.maker_order_id !== null) {
            message.makerOrderId = OrderId.fromAmino(object.maker_order_id);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.fill_amount = message.fillAmount !== BigInt(0) ? message.fillAmount?.toString() : undefined;
        obj.maker_order_id = message.makerOrderId ? OrderId.toAmino(message.makerOrderId) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MakerFill.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MakerFill.decode(message.value);
    },
    toProto(message) {
        return MakerFill.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MakerFill",
            value: MakerFill.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MakerFill.typeUrl, MakerFill);
function createBaseMatchOrders() {
    return {
        takerOrderId: OrderId.fromPartial({}),
        fills: []
    };
}
export const MatchOrders = {
    typeUrl: "/klyraprotocol.clob.MatchOrders",
    is(o) {
        return o && (o.$typeUrl === MatchOrders.typeUrl || OrderId.is(o.takerOrderId) && Array.isArray(o.fills) && (!o.fills.length || MakerFill.is(o.fills[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MatchOrders.typeUrl || OrderId.isSDK(o.taker_order_id) && Array.isArray(o.fills) && (!o.fills.length || MakerFill.isSDK(o.fills[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MatchOrders.typeUrl || OrderId.isAmino(o.taker_order_id) && Array.isArray(o.fills) && (!o.fills.length || MakerFill.isAmino(o.fills[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.takerOrderId !== undefined) {
            OrderId.encode(message.takerOrderId, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.fills) {
            MakerFill.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMatchOrders();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.takerOrderId = OrderId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.fills.push(MakerFill.decode(reader, reader.uint32()));
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
        message.takerOrderId = object.takerOrderId !== undefined && object.takerOrderId !== null ? OrderId.fromPartial(object.takerOrderId) : undefined;
        message.fills = object.fills?.map(e => MakerFill.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMatchOrders();
        if (object.taker_order_id !== undefined && object.taker_order_id !== null) {
            message.takerOrderId = OrderId.fromAmino(object.taker_order_id);
        }
        message.fills = object.fills?.map(e => MakerFill.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.taker_order_id = message.takerOrderId ? OrderId.toAmino(message.takerOrderId) : undefined;
        if (message.fills) {
            obj.fills = message.fills.map(e => e ? MakerFill.toAmino(e) : undefined);
        }
        else {
            obj.fills = message.fills;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MatchOrders.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MatchOrders.decode(message.value);
    },
    toProto(message) {
        return MatchOrders.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MatchOrders",
            value: MatchOrders.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MatchOrders.typeUrl, MatchOrders);
function createBaseMatchPerpetualLiquidation() {
    return {
        liquidated: SubaccountId.fromPartial({}),
        clobPairId: 0,
        perpetualId: 0,
        totalSize: BigInt(0),
        isBuy: false,
        fills: []
    };
}
export const MatchPerpetualLiquidation = {
    typeUrl: "/klyraprotocol.clob.MatchPerpetualLiquidation",
    is(o) {
        return o && (o.$typeUrl === MatchPerpetualLiquidation.typeUrl || SubaccountId.is(o.liquidated) && typeof o.clobPairId === "number" && typeof o.perpetualId === "number" && typeof o.totalSize === "bigint" && typeof o.isBuy === "boolean" && Array.isArray(o.fills) && (!o.fills.length || MakerFill.is(o.fills[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MatchPerpetualLiquidation.typeUrl || SubaccountId.isSDK(o.liquidated) && typeof o.clob_pair_id === "number" && typeof o.perpetual_id === "number" && typeof o.total_size === "bigint" && typeof o.is_buy === "boolean" && Array.isArray(o.fills) && (!o.fills.length || MakerFill.isSDK(o.fills[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MatchPerpetualLiquidation.typeUrl || SubaccountId.isAmino(o.liquidated) && typeof o.clob_pair_id === "number" && typeof o.perpetual_id === "number" && typeof o.total_size === "bigint" && typeof o.is_buy === "boolean" && Array.isArray(o.fills) && (!o.fills.length || MakerFill.isAmino(o.fills[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.liquidated !== undefined) {
            SubaccountId.encode(message.liquidated, writer.uint32(10).fork()).ldelim();
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
            MakerFill.encode(v, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMatchPerpetualLiquidation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.liquidated = SubaccountId.decode(reader, reader.uint32());
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
                    message.fills.push(MakerFill.decode(reader, reader.uint32()));
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
        message.liquidated = object.liquidated !== undefined && object.liquidated !== null ? SubaccountId.fromPartial(object.liquidated) : undefined;
        message.clobPairId = object.clobPairId ?? 0;
        message.perpetualId = object.perpetualId ?? 0;
        message.totalSize = object.totalSize !== undefined && object.totalSize !== null ? BigInt(object.totalSize.toString()) : BigInt(0);
        message.isBuy = object.isBuy ?? false;
        message.fills = object.fills?.map(e => MakerFill.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMatchPerpetualLiquidation();
        if (object.liquidated !== undefined && object.liquidated !== null) {
            message.liquidated = SubaccountId.fromAmino(object.liquidated);
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
        message.fills = object.fills?.map(e => MakerFill.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.liquidated = message.liquidated ? SubaccountId.toAmino(message.liquidated) : undefined;
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        obj.total_size = message.totalSize !== BigInt(0) ? message.totalSize?.toString() : undefined;
        obj.is_buy = message.isBuy === false ? undefined : message.isBuy;
        if (message.fills) {
            obj.fills = message.fills.map(e => e ? MakerFill.toAmino(e) : undefined);
        }
        else {
            obj.fills = message.fills;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MatchPerpetualLiquidation.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MatchPerpetualLiquidation.decode(message.value);
    },
    toProto(message) {
        return MatchPerpetualLiquidation.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MatchPerpetualLiquidation",
            value: MatchPerpetualLiquidation.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MatchPerpetualLiquidation.typeUrl, MatchPerpetualLiquidation);
function createBaseMatchPerpetualDeleveraging() {
    return {
        liquidated: SubaccountId.fromPartial({}),
        perpetualId: 0,
        fills: [],
        isFinalSettlement: false
    };
}
export const MatchPerpetualDeleveraging = {
    typeUrl: "/klyraprotocol.clob.MatchPerpetualDeleveraging",
    is(o) {
        return o && (o.$typeUrl === MatchPerpetualDeleveraging.typeUrl || SubaccountId.is(o.liquidated) && typeof o.perpetualId === "number" && Array.isArray(o.fills) && (!o.fills.length || MatchPerpetualDeleveraging_Fill.is(o.fills[0])) && typeof o.isFinalSettlement === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MatchPerpetualDeleveraging.typeUrl || SubaccountId.isSDK(o.liquidated) && typeof o.perpetual_id === "number" && Array.isArray(o.fills) && (!o.fills.length || MatchPerpetualDeleveraging_Fill.isSDK(o.fills[0])) && typeof o.is_final_settlement === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MatchPerpetualDeleveraging.typeUrl || SubaccountId.isAmino(o.liquidated) && typeof o.perpetual_id === "number" && Array.isArray(o.fills) && (!o.fills.length || MatchPerpetualDeleveraging_Fill.isAmino(o.fills[0])) && typeof o.is_final_settlement === "boolean");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.liquidated !== undefined) {
            SubaccountId.encode(message.liquidated, writer.uint32(10).fork()).ldelim();
        }
        if (message.perpetualId !== 0) {
            writer.uint32(16).uint32(message.perpetualId);
        }
        for (const v of message.fills) {
            MatchPerpetualDeleveraging_Fill.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.isFinalSettlement === true) {
            writer.uint32(32).bool(message.isFinalSettlement);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMatchPerpetualDeleveraging();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.liquidated = SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.perpetualId = reader.uint32();
                    break;
                case 3:
                    message.fills.push(MatchPerpetualDeleveraging_Fill.decode(reader, reader.uint32()));
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
        message.liquidated = object.liquidated !== undefined && object.liquidated !== null ? SubaccountId.fromPartial(object.liquidated) : undefined;
        message.perpetualId = object.perpetualId ?? 0;
        message.fills = object.fills?.map(e => MatchPerpetualDeleveraging_Fill.fromPartial(e)) || [];
        message.isFinalSettlement = object.isFinalSettlement ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMatchPerpetualDeleveraging();
        if (object.liquidated !== undefined && object.liquidated !== null) {
            message.liquidated = SubaccountId.fromAmino(object.liquidated);
        }
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        message.fills = object.fills?.map(e => MatchPerpetualDeleveraging_Fill.fromAmino(e)) || [];
        if (object.is_final_settlement !== undefined && object.is_final_settlement !== null) {
            message.isFinalSettlement = object.is_final_settlement;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.liquidated = message.liquidated ? SubaccountId.toAmino(message.liquidated) : undefined;
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        if (message.fills) {
            obj.fills = message.fills.map(e => e ? MatchPerpetualDeleveraging_Fill.toAmino(e) : undefined);
        }
        else {
            obj.fills = message.fills;
        }
        obj.is_final_settlement = message.isFinalSettlement === false ? undefined : message.isFinalSettlement;
        return obj;
    },
    fromAminoMsg(object) {
        return MatchPerpetualDeleveraging.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MatchPerpetualDeleveraging.decode(message.value);
    },
    toProto(message) {
        return MatchPerpetualDeleveraging.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MatchPerpetualDeleveraging",
            value: MatchPerpetualDeleveraging.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MatchPerpetualDeleveraging.typeUrl, MatchPerpetualDeleveraging);
function createBaseMatchPerpetualDeleveraging_Fill() {
    return {
        offsettingSubaccountId: SubaccountId.fromPartial({}),
        fillAmount: BigInt(0)
    };
}
export const MatchPerpetualDeleveraging_Fill = {
    typeUrl: "/klyraprotocol.clob.Fill",
    is(o) {
        return o && (o.$typeUrl === MatchPerpetualDeleveraging_Fill.typeUrl || SubaccountId.is(o.offsettingSubaccountId) && typeof o.fillAmount === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MatchPerpetualDeleveraging_Fill.typeUrl || SubaccountId.isSDK(o.offsetting_subaccount_id) && typeof o.fill_amount === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MatchPerpetualDeleveraging_Fill.typeUrl || SubaccountId.isAmino(o.offsetting_subaccount_id) && typeof o.fill_amount === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.offsettingSubaccountId !== undefined) {
            SubaccountId.encode(message.offsettingSubaccountId, writer.uint32(10).fork()).ldelim();
        }
        if (message.fillAmount !== BigInt(0)) {
            writer.uint32(16).uint64(message.fillAmount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMatchPerpetualDeleveraging_Fill();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.offsettingSubaccountId = SubaccountId.decode(reader, reader.uint32());
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
        message.offsettingSubaccountId = object.offsettingSubaccountId !== undefined && object.offsettingSubaccountId !== null ? SubaccountId.fromPartial(object.offsettingSubaccountId) : undefined;
        message.fillAmount = object.fillAmount !== undefined && object.fillAmount !== null ? BigInt(object.fillAmount.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMatchPerpetualDeleveraging_Fill();
        if (object.offsetting_subaccount_id !== undefined && object.offsetting_subaccount_id !== null) {
            message.offsettingSubaccountId = SubaccountId.fromAmino(object.offsetting_subaccount_id);
        }
        if (object.fill_amount !== undefined && object.fill_amount !== null) {
            message.fillAmount = BigInt(object.fill_amount);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.offsetting_subaccount_id = message.offsettingSubaccountId ? SubaccountId.toAmino(message.offsettingSubaccountId) : undefined;
        obj.fill_amount = message.fillAmount !== BigInt(0) ? message.fillAmount?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MatchPerpetualDeleveraging_Fill.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MatchPerpetualDeleveraging_Fill.decode(message.value);
    },
    toProto(message) {
        return MatchPerpetualDeleveraging_Fill.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.Fill",
            value: MatchPerpetualDeleveraging_Fill.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MatchPerpetualDeleveraging_Fill.typeUrl, MatchPerpetualDeleveraging_Fill);
