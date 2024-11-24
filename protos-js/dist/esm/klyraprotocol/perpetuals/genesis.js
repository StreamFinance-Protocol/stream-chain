//@ts-nocheck
import { Perpetual, LiquidityTier } from "./perpetual";
import { Params } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseGenesisState() {
    return {
        perpetuals: [],
        liquidityTiers: [],
        params: Params.fromPartial({})
    };
}
export const GenesisState = {
    typeUrl: "/klyraprotocol.perpetuals.GenesisState",
    is(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.perpetuals) && (!o.perpetuals.length || Perpetual.is(o.perpetuals[0])) && Array.isArray(o.liquidityTiers) && (!o.liquidityTiers.length || LiquidityTier.is(o.liquidityTiers[0])) && Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.perpetuals) && (!o.perpetuals.length || Perpetual.isSDK(o.perpetuals[0])) && Array.isArray(o.liquidity_tiers) && (!o.liquidity_tiers.length || LiquidityTier.isSDK(o.liquidity_tiers[0])) && Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.perpetuals) && (!o.perpetuals.length || Perpetual.isAmino(o.perpetuals[0])) && Array.isArray(o.liquidity_tiers) && (!o.liquidity_tiers.length || LiquidityTier.isAmino(o.liquidity_tiers[0])) && Params.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.perpetuals) {
            Perpetual.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.liquidityTiers) {
            LiquidityTier.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetuals.push(Perpetual.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.liquidityTiers.push(LiquidityTier.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.params = Params.decode(reader, reader.uint32());
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
        message.perpetuals = object.perpetuals?.map(e => Perpetual.fromPartial(e)) || [];
        message.liquidityTiers = object.liquidityTiers?.map(e => LiquidityTier.fromPartial(e)) || [];
        message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.perpetuals = object.perpetuals?.map(e => Perpetual.fromAmino(e)) || [];
        message.liquidityTiers = object.liquidity_tiers?.map(e => LiquidityTier.fromAmino(e)) || [];
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.perpetuals) {
            obj.perpetuals = message.perpetuals.map(e => e ? Perpetual.toAmino(e) : undefined);
        }
        else {
            obj.perpetuals = message.perpetuals;
        }
        if (message.liquidityTiers) {
            obj.liquidity_tiers = message.liquidityTiers.map(e => e ? LiquidityTier.toAmino(e) : undefined);
        }
        else {
            obj.liquidity_tiers = message.liquidityTiers;
        }
        obj.params = message.params ? Params.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return GenesisState.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return GenesisState.decode(message.value);
    },
    toProto(message) {
        return GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.GenesisState",
            value: GenesisState.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);
