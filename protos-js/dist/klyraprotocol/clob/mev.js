"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MevNodeToNodeMetrics = exports.ValidatorMevMatches = exports.ClobMidPrice = exports.MEVLiquidationMatch = exports.MEVMatch = void 0;
//@ts-nocheck
const subaccount_1 = require("../subaccounts/subaccount");
const clob_pair_1 = require("./clob_pair");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseMEVMatch() {
    return {
        takerOrderSubaccountId: undefined,
        takerFeePpm: 0,
        makerOrderSubaccountId: undefined,
        makerOrderSubticks: BigInt(0),
        makerOrderIsBuy: false,
        makerFeePpm: 0,
        clobPairId: 0,
        fillAmount: BigInt(0)
    };
}
exports.MEVMatch = {
    typeUrl: "/klyraprotocol.clob.MEVMatch",
    is(o) {
        return o && (o.$typeUrl === exports.MEVMatch.typeUrl || typeof o.takerFeePpm === "number" && typeof o.makerOrderSubticks === "bigint" && typeof o.makerOrderIsBuy === "boolean" && typeof o.makerFeePpm === "number" && typeof o.clobPairId === "number" && typeof o.fillAmount === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MEVMatch.typeUrl || typeof o.taker_fee_ppm === "number" && typeof o.maker_order_subticks === "bigint" && typeof o.maker_order_is_buy === "boolean" && typeof o.maker_fee_ppm === "number" && typeof o.clob_pair_id === "number" && typeof o.fill_amount === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MEVMatch.typeUrl || typeof o.taker_fee_ppm === "number" && typeof o.maker_order_subticks === "bigint" && typeof o.maker_order_is_buy === "boolean" && typeof o.maker_fee_ppm === "number" && typeof o.clob_pair_id === "number" && typeof o.fill_amount === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.takerOrderSubaccountId !== undefined) {
            subaccount_1.SubaccountId.encode(message.takerOrderSubaccountId, writer.uint32(10).fork()).ldelim();
        }
        if (message.takerFeePpm !== 0) {
            writer.uint32(16).int32(message.takerFeePpm);
        }
        if (message.makerOrderSubaccountId !== undefined) {
            subaccount_1.SubaccountId.encode(message.makerOrderSubaccountId, writer.uint32(26).fork()).ldelim();
        }
        if (message.makerOrderSubticks !== BigInt(0)) {
            writer.uint32(32).uint64(message.makerOrderSubticks);
        }
        if (message.makerOrderIsBuy === true) {
            writer.uint32(40).bool(message.makerOrderIsBuy);
        }
        if (message.makerFeePpm !== 0) {
            writer.uint32(48).int32(message.makerFeePpm);
        }
        if (message.clobPairId !== 0) {
            writer.uint32(56).uint32(message.clobPairId);
        }
        if (message.fillAmount !== BigInt(0)) {
            writer.uint32(64).uint64(message.fillAmount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMEVMatch();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.takerOrderSubaccountId = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.takerFeePpm = reader.int32();
                    break;
                case 3:
                    message.makerOrderSubaccountId = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.makerOrderSubticks = reader.uint64();
                    break;
                case 5:
                    message.makerOrderIsBuy = reader.bool();
                    break;
                case 6:
                    message.makerFeePpm = reader.int32();
                    break;
                case 7:
                    message.clobPairId = reader.uint32();
                    break;
                case 8:
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
        const message = createBaseMEVMatch();
        message.takerOrderSubaccountId = object.takerOrderSubaccountId !== undefined && object.takerOrderSubaccountId !== null ? subaccount_1.SubaccountId.fromPartial(object.takerOrderSubaccountId) : undefined;
        message.takerFeePpm = object.takerFeePpm ?? 0;
        message.makerOrderSubaccountId = object.makerOrderSubaccountId !== undefined && object.makerOrderSubaccountId !== null ? subaccount_1.SubaccountId.fromPartial(object.makerOrderSubaccountId) : undefined;
        message.makerOrderSubticks = object.makerOrderSubticks !== undefined && object.makerOrderSubticks !== null ? BigInt(object.makerOrderSubticks.toString()) : BigInt(0);
        message.makerOrderIsBuy = object.makerOrderIsBuy ?? false;
        message.makerFeePpm = object.makerFeePpm ?? 0;
        message.clobPairId = object.clobPairId ?? 0;
        message.fillAmount = object.fillAmount !== undefined && object.fillAmount !== null ? BigInt(object.fillAmount.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMEVMatch();
        if (object.taker_order_subaccount_id !== undefined && object.taker_order_subaccount_id !== null) {
            message.takerOrderSubaccountId = subaccount_1.SubaccountId.fromAmino(object.taker_order_subaccount_id);
        }
        if (object.taker_fee_ppm !== undefined && object.taker_fee_ppm !== null) {
            message.takerFeePpm = object.taker_fee_ppm;
        }
        if (object.maker_order_subaccount_id !== undefined && object.maker_order_subaccount_id !== null) {
            message.makerOrderSubaccountId = subaccount_1.SubaccountId.fromAmino(object.maker_order_subaccount_id);
        }
        if (object.maker_order_subticks !== undefined && object.maker_order_subticks !== null) {
            message.makerOrderSubticks = BigInt(object.maker_order_subticks);
        }
        if (object.maker_order_is_buy !== undefined && object.maker_order_is_buy !== null) {
            message.makerOrderIsBuy = object.maker_order_is_buy;
        }
        if (object.maker_fee_ppm !== undefined && object.maker_fee_ppm !== null) {
            message.makerFeePpm = object.maker_fee_ppm;
        }
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        if (object.fill_amount !== undefined && object.fill_amount !== null) {
            message.fillAmount = BigInt(object.fill_amount);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.taker_order_subaccount_id = message.takerOrderSubaccountId ? subaccount_1.SubaccountId.toAmino(message.takerOrderSubaccountId) : undefined;
        obj.taker_fee_ppm = message.takerFeePpm === 0 ? undefined : message.takerFeePpm;
        obj.maker_order_subaccount_id = message.makerOrderSubaccountId ? subaccount_1.SubaccountId.toAmino(message.makerOrderSubaccountId) : undefined;
        obj.maker_order_subticks = message.makerOrderSubticks !== BigInt(0) ? message.makerOrderSubticks?.toString() : undefined;
        obj.maker_order_is_buy = message.makerOrderIsBuy === false ? undefined : message.makerOrderIsBuy;
        obj.maker_fee_ppm = message.makerFeePpm === 0 ? undefined : message.makerFeePpm;
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        obj.fill_amount = message.fillAmount !== BigInt(0) ? message.fillAmount?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MEVMatch.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MEVMatch.decode(message.value);
    },
    toProto(message) {
        return exports.MEVMatch.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MEVMatch",
            value: exports.MEVMatch.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MEVMatch.typeUrl, exports.MEVMatch);
function createBaseMEVLiquidationMatch() {
    return {
        liquidatedSubaccountId: subaccount_1.SubaccountId.fromPartial({}),
        insuranceFundDeltaQuoteQuantums: BigInt(0),
        validatorFeeQuoteQuantums: BigInt(0),
        liquidityFeeQuoteQuantums: BigInt(0),
        makerOrderSubaccountId: subaccount_1.SubaccountId.fromPartial({}),
        makerOrderSubticks: BigInt(0),
        makerOrderIsBuy: false,
        makerFeePpm: 0,
        clobPairId: 0,
        fillAmount: BigInt(0)
    };
}
exports.MEVLiquidationMatch = {
    typeUrl: "/klyraprotocol.clob.MEVLiquidationMatch",
    is(o) {
        return o && (o.$typeUrl === exports.MEVLiquidationMatch.typeUrl || subaccount_1.SubaccountId.is(o.liquidatedSubaccountId) && typeof o.insuranceFundDeltaQuoteQuantums === "bigint" && typeof o.validatorFeeQuoteQuantums === "bigint" && typeof o.liquidityFeeQuoteQuantums === "bigint" && subaccount_1.SubaccountId.is(o.makerOrderSubaccountId) && typeof o.makerOrderSubticks === "bigint" && typeof o.makerOrderIsBuy === "boolean" && typeof o.makerFeePpm === "number" && typeof o.clobPairId === "number" && typeof o.fillAmount === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MEVLiquidationMatch.typeUrl || subaccount_1.SubaccountId.isSDK(o.liquidated_subaccount_id) && typeof o.insurance_fund_delta_quote_quantums === "bigint" && typeof o.validator_fee_quote_quantums === "bigint" && typeof o.liquidity_fee_quote_quantums === "bigint" && subaccount_1.SubaccountId.isSDK(o.maker_order_subaccount_id) && typeof o.maker_order_subticks === "bigint" && typeof o.maker_order_is_buy === "boolean" && typeof o.maker_fee_ppm === "number" && typeof o.clob_pair_id === "number" && typeof o.fill_amount === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MEVLiquidationMatch.typeUrl || subaccount_1.SubaccountId.isAmino(o.liquidated_subaccount_id) && typeof o.insurance_fund_delta_quote_quantums === "bigint" && typeof o.validator_fee_quote_quantums === "bigint" && typeof o.liquidity_fee_quote_quantums === "bigint" && subaccount_1.SubaccountId.isAmino(o.maker_order_subaccount_id) && typeof o.maker_order_subticks === "bigint" && typeof o.maker_order_is_buy === "boolean" && typeof o.maker_fee_ppm === "number" && typeof o.clob_pair_id === "number" && typeof o.fill_amount === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.liquidatedSubaccountId !== undefined) {
            subaccount_1.SubaccountId.encode(message.liquidatedSubaccountId, writer.uint32(10).fork()).ldelim();
        }
        if (message.insuranceFundDeltaQuoteQuantums !== BigInt(0)) {
            writer.uint32(16).int64(message.insuranceFundDeltaQuoteQuantums);
        }
        if (message.validatorFeeQuoteQuantums !== BigInt(0)) {
            writer.uint32(24).int64(message.validatorFeeQuoteQuantums);
        }
        if (message.liquidityFeeQuoteQuantums !== BigInt(0)) {
            writer.uint32(32).int64(message.liquidityFeeQuoteQuantums);
        }
        if (message.makerOrderSubaccountId !== undefined) {
            subaccount_1.SubaccountId.encode(message.makerOrderSubaccountId, writer.uint32(42).fork()).ldelim();
        }
        if (message.makerOrderSubticks !== BigInt(0)) {
            writer.uint32(48).uint64(message.makerOrderSubticks);
        }
        if (message.makerOrderIsBuy === true) {
            writer.uint32(56).bool(message.makerOrderIsBuy);
        }
        if (message.makerFeePpm !== 0) {
            writer.uint32(64).int32(message.makerFeePpm);
        }
        if (message.clobPairId !== 0) {
            writer.uint32(72).uint32(message.clobPairId);
        }
        if (message.fillAmount !== BigInt(0)) {
            writer.uint32(80).uint64(message.fillAmount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMEVLiquidationMatch();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.liquidatedSubaccountId = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.insuranceFundDeltaQuoteQuantums = reader.int64();
                    break;
                case 3:
                    message.validatorFeeQuoteQuantums = reader.int64();
                    break;
                case 4:
                    message.liquidityFeeQuoteQuantums = reader.int64();
                    break;
                case 5:
                    message.makerOrderSubaccountId = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.makerOrderSubticks = reader.uint64();
                    break;
                case 7:
                    message.makerOrderIsBuy = reader.bool();
                    break;
                case 8:
                    message.makerFeePpm = reader.int32();
                    break;
                case 9:
                    message.clobPairId = reader.uint32();
                    break;
                case 10:
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
        const message = createBaseMEVLiquidationMatch();
        message.liquidatedSubaccountId = object.liquidatedSubaccountId !== undefined && object.liquidatedSubaccountId !== null ? subaccount_1.SubaccountId.fromPartial(object.liquidatedSubaccountId) : undefined;
        message.insuranceFundDeltaQuoteQuantums = object.insuranceFundDeltaQuoteQuantums !== undefined && object.insuranceFundDeltaQuoteQuantums !== null ? BigInt(object.insuranceFundDeltaQuoteQuantums.toString()) : BigInt(0);
        message.validatorFeeQuoteQuantums = object.validatorFeeQuoteQuantums !== undefined && object.validatorFeeQuoteQuantums !== null ? BigInt(object.validatorFeeQuoteQuantums.toString()) : BigInt(0);
        message.liquidityFeeQuoteQuantums = object.liquidityFeeQuoteQuantums !== undefined && object.liquidityFeeQuoteQuantums !== null ? BigInt(object.liquidityFeeQuoteQuantums.toString()) : BigInt(0);
        message.makerOrderSubaccountId = object.makerOrderSubaccountId !== undefined && object.makerOrderSubaccountId !== null ? subaccount_1.SubaccountId.fromPartial(object.makerOrderSubaccountId) : undefined;
        message.makerOrderSubticks = object.makerOrderSubticks !== undefined && object.makerOrderSubticks !== null ? BigInt(object.makerOrderSubticks.toString()) : BigInt(0);
        message.makerOrderIsBuy = object.makerOrderIsBuy ?? false;
        message.makerFeePpm = object.makerFeePpm ?? 0;
        message.clobPairId = object.clobPairId ?? 0;
        message.fillAmount = object.fillAmount !== undefined && object.fillAmount !== null ? BigInt(object.fillAmount.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMEVLiquidationMatch();
        if (object.liquidated_subaccount_id !== undefined && object.liquidated_subaccount_id !== null) {
            message.liquidatedSubaccountId = subaccount_1.SubaccountId.fromAmino(object.liquidated_subaccount_id);
        }
        if (object.insurance_fund_delta_quote_quantums !== undefined && object.insurance_fund_delta_quote_quantums !== null) {
            message.insuranceFundDeltaQuoteQuantums = BigInt(object.insurance_fund_delta_quote_quantums);
        }
        if (object.validator_fee_quote_quantums !== undefined && object.validator_fee_quote_quantums !== null) {
            message.validatorFeeQuoteQuantums = BigInt(object.validator_fee_quote_quantums);
        }
        if (object.liquidity_fee_quote_quantums !== undefined && object.liquidity_fee_quote_quantums !== null) {
            message.liquidityFeeQuoteQuantums = BigInt(object.liquidity_fee_quote_quantums);
        }
        if (object.maker_order_subaccount_id !== undefined && object.maker_order_subaccount_id !== null) {
            message.makerOrderSubaccountId = subaccount_1.SubaccountId.fromAmino(object.maker_order_subaccount_id);
        }
        if (object.maker_order_subticks !== undefined && object.maker_order_subticks !== null) {
            message.makerOrderSubticks = BigInt(object.maker_order_subticks);
        }
        if (object.maker_order_is_buy !== undefined && object.maker_order_is_buy !== null) {
            message.makerOrderIsBuy = object.maker_order_is_buy;
        }
        if (object.maker_fee_ppm !== undefined && object.maker_fee_ppm !== null) {
            message.makerFeePpm = object.maker_fee_ppm;
        }
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        if (object.fill_amount !== undefined && object.fill_amount !== null) {
            message.fillAmount = BigInt(object.fill_amount);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.liquidated_subaccount_id = message.liquidatedSubaccountId ? subaccount_1.SubaccountId.toAmino(message.liquidatedSubaccountId) : undefined;
        obj.insurance_fund_delta_quote_quantums = message.insuranceFundDeltaQuoteQuantums !== BigInt(0) ? message.insuranceFundDeltaQuoteQuantums?.toString() : undefined;
        obj.validator_fee_quote_quantums = message.validatorFeeQuoteQuantums !== BigInt(0) ? message.validatorFeeQuoteQuantums?.toString() : undefined;
        obj.liquidity_fee_quote_quantums = message.liquidityFeeQuoteQuantums !== BigInt(0) ? message.liquidityFeeQuoteQuantums?.toString() : undefined;
        obj.maker_order_subaccount_id = message.makerOrderSubaccountId ? subaccount_1.SubaccountId.toAmino(message.makerOrderSubaccountId) : undefined;
        obj.maker_order_subticks = message.makerOrderSubticks !== BigInt(0) ? message.makerOrderSubticks?.toString() : undefined;
        obj.maker_order_is_buy = message.makerOrderIsBuy === false ? undefined : message.makerOrderIsBuy;
        obj.maker_fee_ppm = message.makerFeePpm === 0 ? undefined : message.makerFeePpm;
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        obj.fill_amount = message.fillAmount !== BigInt(0) ? message.fillAmount?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MEVLiquidationMatch.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MEVLiquidationMatch.decode(message.value);
    },
    toProto(message) {
        return exports.MEVLiquidationMatch.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MEVLiquidationMatch",
            value: exports.MEVLiquidationMatch.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MEVLiquidationMatch.typeUrl, exports.MEVLiquidationMatch);
function createBaseClobMidPrice() {
    return {
        clobPair: clob_pair_1.ClobPair.fromPartial({}),
        subticks: BigInt(0)
    };
}
exports.ClobMidPrice = {
    typeUrl: "/klyraprotocol.clob.ClobMidPrice",
    is(o) {
        return o && (o.$typeUrl === exports.ClobMidPrice.typeUrl || clob_pair_1.ClobPair.is(o.clobPair) && typeof o.subticks === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ClobMidPrice.typeUrl || clob_pair_1.ClobPair.isSDK(o.clob_pair) && typeof o.subticks === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ClobMidPrice.typeUrl || clob_pair_1.ClobPair.isAmino(o.clob_pair) && typeof o.subticks === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.clobPair !== undefined) {
            clob_pair_1.ClobPair.encode(message.clobPair, writer.uint32(10).fork()).ldelim();
        }
        if (message.subticks !== BigInt(0)) {
            writer.uint32(16).uint64(message.subticks);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseClobMidPrice();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clobPair = clob_pair_1.ClobPair.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.subticks = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseClobMidPrice();
        message.clobPair = object.clobPair !== undefined && object.clobPair !== null ? clob_pair_1.ClobPair.fromPartial(object.clobPair) : undefined;
        message.subticks = object.subticks !== undefined && object.subticks !== null ? BigInt(object.subticks.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseClobMidPrice();
        if (object.clob_pair !== undefined && object.clob_pair !== null) {
            message.clobPair = clob_pair_1.ClobPair.fromAmino(object.clob_pair);
        }
        if (object.subticks !== undefined && object.subticks !== null) {
            message.subticks = BigInt(object.subticks);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.clob_pair = message.clobPair ? clob_pair_1.ClobPair.toAmino(message.clobPair) : undefined;
        obj.subticks = message.subticks !== BigInt(0) ? message.subticks?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ClobMidPrice.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ClobMidPrice.decode(message.value);
    },
    toProto(message) {
        return exports.ClobMidPrice.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.ClobMidPrice",
            value: exports.ClobMidPrice.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ClobMidPrice.typeUrl, exports.ClobMidPrice);
function createBaseValidatorMevMatches() {
    return {
        matches: [],
        liquidationMatches: []
    };
}
exports.ValidatorMevMatches = {
    typeUrl: "/klyraprotocol.clob.ValidatorMevMatches",
    is(o) {
        return o && (o.$typeUrl === exports.ValidatorMevMatches.typeUrl || Array.isArray(o.matches) && (!o.matches.length || exports.MEVMatch.is(o.matches[0])) && Array.isArray(o.liquidationMatches) && (!o.liquidationMatches.length || exports.MEVLiquidationMatch.is(o.liquidationMatches[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ValidatorMevMatches.typeUrl || Array.isArray(o.matches) && (!o.matches.length || exports.MEVMatch.isSDK(o.matches[0])) && Array.isArray(o.liquidation_matches) && (!o.liquidation_matches.length || exports.MEVLiquidationMatch.isSDK(o.liquidation_matches[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ValidatorMevMatches.typeUrl || Array.isArray(o.matches) && (!o.matches.length || exports.MEVMatch.isAmino(o.matches[0])) && Array.isArray(o.liquidation_matches) && (!o.liquidation_matches.length || exports.MEVLiquidationMatch.isAmino(o.liquidation_matches[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.matches) {
            exports.MEVMatch.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.liquidationMatches) {
            exports.MEVLiquidationMatch.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorMevMatches();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.matches.push(exports.MEVMatch.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.liquidationMatches.push(exports.MEVLiquidationMatch.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValidatorMevMatches();
        message.matches = object.matches?.map(e => exports.MEVMatch.fromPartial(e)) || [];
        message.liquidationMatches = object.liquidationMatches?.map(e => exports.MEVLiquidationMatch.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseValidatorMevMatches();
        message.matches = object.matches?.map(e => exports.MEVMatch.fromAmino(e)) || [];
        message.liquidationMatches = object.liquidation_matches?.map(e => exports.MEVLiquidationMatch.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.matches) {
            obj.matches = message.matches.map(e => e ? exports.MEVMatch.toAmino(e) : undefined);
        }
        else {
            obj.matches = message.matches;
        }
        if (message.liquidationMatches) {
            obj.liquidation_matches = message.liquidationMatches.map(e => e ? exports.MEVLiquidationMatch.toAmino(e) : undefined);
        }
        else {
            obj.liquidation_matches = message.liquidationMatches;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ValidatorMevMatches.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ValidatorMevMatches.decode(message.value);
    },
    toProto(message) {
        return exports.ValidatorMevMatches.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.ValidatorMevMatches",
            value: exports.ValidatorMevMatches.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ValidatorMevMatches.typeUrl, exports.ValidatorMevMatches);
function createBaseMevNodeToNodeMetrics() {
    return {
        validatorMevMatches: undefined,
        clobMidPrices: [],
        bpMevMatches: undefined,
        proposalReceiveTime: BigInt(0)
    };
}
exports.MevNodeToNodeMetrics = {
    typeUrl: "/klyraprotocol.clob.MevNodeToNodeMetrics",
    is(o) {
        return o && (o.$typeUrl === exports.MevNodeToNodeMetrics.typeUrl || Array.isArray(o.clobMidPrices) && (!o.clobMidPrices.length || exports.ClobMidPrice.is(o.clobMidPrices[0])) && typeof o.proposalReceiveTime === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MevNodeToNodeMetrics.typeUrl || Array.isArray(o.clob_mid_prices) && (!o.clob_mid_prices.length || exports.ClobMidPrice.isSDK(o.clob_mid_prices[0])) && typeof o.proposal_receive_time === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MevNodeToNodeMetrics.typeUrl || Array.isArray(o.clob_mid_prices) && (!o.clob_mid_prices.length || exports.ClobMidPrice.isAmino(o.clob_mid_prices[0])) && typeof o.proposal_receive_time === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.validatorMevMatches !== undefined) {
            exports.ValidatorMevMatches.encode(message.validatorMevMatches, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.clobMidPrices) {
            exports.ClobMidPrice.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.bpMevMatches !== undefined) {
            exports.ValidatorMevMatches.encode(message.bpMevMatches, writer.uint32(26).fork()).ldelim();
        }
        if (message.proposalReceiveTime !== BigInt(0)) {
            writer.uint32(32).uint64(message.proposalReceiveTime);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMevNodeToNodeMetrics();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorMevMatches = exports.ValidatorMevMatches.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.clobMidPrices.push(exports.ClobMidPrice.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.bpMevMatches = exports.ValidatorMevMatches.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.proposalReceiveTime = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMevNodeToNodeMetrics();
        message.validatorMevMatches = object.validatorMevMatches !== undefined && object.validatorMevMatches !== null ? exports.ValidatorMevMatches.fromPartial(object.validatorMevMatches) : undefined;
        message.clobMidPrices = object.clobMidPrices?.map(e => exports.ClobMidPrice.fromPartial(e)) || [];
        message.bpMevMatches = object.bpMevMatches !== undefined && object.bpMevMatches !== null ? exports.ValidatorMevMatches.fromPartial(object.bpMevMatches) : undefined;
        message.proposalReceiveTime = object.proposalReceiveTime !== undefined && object.proposalReceiveTime !== null ? BigInt(object.proposalReceiveTime.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMevNodeToNodeMetrics();
        if (object.validator_mev_matches !== undefined && object.validator_mev_matches !== null) {
            message.validatorMevMatches = exports.ValidatorMevMatches.fromAmino(object.validator_mev_matches);
        }
        message.clobMidPrices = object.clob_mid_prices?.map(e => exports.ClobMidPrice.fromAmino(e)) || [];
        if (object.bp_mev_matches !== undefined && object.bp_mev_matches !== null) {
            message.bpMevMatches = exports.ValidatorMevMatches.fromAmino(object.bp_mev_matches);
        }
        if (object.proposal_receive_time !== undefined && object.proposal_receive_time !== null) {
            message.proposalReceiveTime = BigInt(object.proposal_receive_time);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator_mev_matches = message.validatorMevMatches ? exports.ValidatorMevMatches.toAmino(message.validatorMevMatches) : undefined;
        if (message.clobMidPrices) {
            obj.clob_mid_prices = message.clobMidPrices.map(e => e ? exports.ClobMidPrice.toAmino(e) : undefined);
        }
        else {
            obj.clob_mid_prices = message.clobMidPrices;
        }
        obj.bp_mev_matches = message.bpMevMatches ? exports.ValidatorMevMatches.toAmino(message.bpMevMatches) : undefined;
        obj.proposal_receive_time = message.proposalReceiveTime !== BigInt(0) ? message.proposalReceiveTime?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MevNodeToNodeMetrics.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MevNodeToNodeMetrics.decode(message.value);
    },
    toProto(message) {
        return exports.MevNodeToNodeMetrics.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MevNodeToNodeMetrics",
            value: exports.MevNodeToNodeMetrics.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MevNodeToNodeMetrics.typeUrl, exports.MevNodeToNodeMetrics);
