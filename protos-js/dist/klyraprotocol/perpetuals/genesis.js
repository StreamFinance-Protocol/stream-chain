"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = void 0;
//@ts-nocheck
const perpetual_1 = require("./perpetual");
const params_1 = require("./params");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseGenesisState() {
    return {
        perpetuals: [],
        liquidityTiers: [],
        params: params_1.Params.fromPartial({})
    };
}
exports.GenesisState = {
    typeUrl: "/klyraprotocol.perpetuals.GenesisState",
    is(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.perpetuals) && (!o.perpetuals.length || perpetual_1.Perpetual.is(o.perpetuals[0])) && Array.isArray(o.liquidityTiers) && (!o.liquidityTiers.length || perpetual_1.LiquidityTier.is(o.liquidityTiers[0])) && params_1.Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.perpetuals) && (!o.perpetuals.length || perpetual_1.Perpetual.isSDK(o.perpetuals[0])) && Array.isArray(o.liquidity_tiers) && (!o.liquidity_tiers.length || perpetual_1.LiquidityTier.isSDK(o.liquidity_tiers[0])) && params_1.Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.perpetuals) && (!o.perpetuals.length || perpetual_1.Perpetual.isAmino(o.perpetuals[0])) && Array.isArray(o.liquidity_tiers) && (!o.liquidity_tiers.length || perpetual_1.LiquidityTier.isAmino(o.liquidity_tiers[0])) && params_1.Params.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.perpetuals) {
            perpetual_1.Perpetual.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.liquidityTiers) {
            perpetual_1.LiquidityTier.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.params !== undefined) {
            params_1.Params.encode(message.params, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetuals.push(perpetual_1.Perpetual.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.liquidityTiers.push(perpetual_1.LiquidityTier.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.params = params_1.Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.perpetuals = object.perpetuals?.map(e => perpetual_1.Perpetual.fromPartial(e)) || [];
        message.liquidityTiers = object.liquidityTiers?.map(e => perpetual_1.LiquidityTier.fromPartial(e)) || [];
        message.params = object.params !== undefined && object.params !== null ? params_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.perpetuals = object.perpetuals?.map(e => perpetual_1.Perpetual.fromAmino(e)) || [];
        message.liquidityTiers = object.liquidity_tiers?.map(e => perpetual_1.LiquidityTier.fromAmino(e)) || [];
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.perpetuals) {
            obj.perpetuals = message.perpetuals.map(e => e ? perpetual_1.Perpetual.toAmino(e) : undefined);
        }
        else {
            obj.perpetuals = message.perpetuals;
        }
        if (message.liquidityTiers) {
            obj.liquidity_tiers = message.liquidityTiers.map(e => e ? perpetual_1.LiquidityTier.toAmino(e) : undefined);
        }
        else {
            obj.liquidity_tiers = message.liquidityTiers;
        }
        obj.params = message.params ? params_1.Params.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GenesisState.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.GenesisState.decode(message.value);
    },
    toProto(message) {
        return exports.GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.GenesisState",
            value: exports.GenesisState.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GenesisState.typeUrl, exports.GenesisState);
