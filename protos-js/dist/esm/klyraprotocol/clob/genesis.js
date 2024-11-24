//@ts-nocheck
import { ClobPair } from "./clob_pair";
import { LiquidationsConfig } from "./liquidations_config";
import { BlockRateLimitConfiguration } from "./block_rate_limit_config";
import { EquityTierLimitConfiguration } from "./equity_tier_limit_config";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseGenesisState() {
    return {
        clobPairs: [],
        liquidationsConfig: LiquidationsConfig.fromPartial({}),
        blockRateLimitConfig: BlockRateLimitConfiguration.fromPartial({}),
        equityTierLimitConfig: EquityTierLimitConfiguration.fromPartial({})
    };
}
export const GenesisState = {
    typeUrl: "/klyraprotocol.clob.GenesisState",
    is(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.clobPairs) && (!o.clobPairs.length || ClobPair.is(o.clobPairs[0])) && LiquidationsConfig.is(o.liquidationsConfig) && BlockRateLimitConfiguration.is(o.blockRateLimitConfig) && EquityTierLimitConfiguration.is(o.equityTierLimitConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.clob_pairs) && (!o.clob_pairs.length || ClobPair.isSDK(o.clob_pairs[0])) && LiquidationsConfig.isSDK(o.liquidations_config) && BlockRateLimitConfiguration.isSDK(o.block_rate_limit_config) && EquityTierLimitConfiguration.isSDK(o.equity_tier_limit_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.clob_pairs) && (!o.clob_pairs.length || ClobPair.isAmino(o.clob_pairs[0])) && LiquidationsConfig.isAmino(o.liquidations_config) && BlockRateLimitConfiguration.isAmino(o.block_rate_limit_config) && EquityTierLimitConfiguration.isAmino(o.equity_tier_limit_config));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.clobPairs) {
            ClobPair.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.liquidationsConfig !== undefined) {
            LiquidationsConfig.encode(message.liquidationsConfig, writer.uint32(18).fork()).ldelim();
        }
        if (message.blockRateLimitConfig !== undefined) {
            BlockRateLimitConfiguration.encode(message.blockRateLimitConfig, writer.uint32(26).fork()).ldelim();
        }
        if (message.equityTierLimitConfig !== undefined) {
            EquityTierLimitConfiguration.encode(message.equityTierLimitConfig, writer.uint32(34).fork()).ldelim();
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
                    message.clobPairs.push(ClobPair.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.liquidationsConfig = LiquidationsConfig.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.blockRateLimitConfig = BlockRateLimitConfiguration.decode(reader, reader.uint32());
                    break;
                case 4:
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
        const message = createBaseGenesisState();
        message.clobPairs = object.clobPairs?.map(e => ClobPair.fromPartial(e)) || [];
        message.liquidationsConfig = object.liquidationsConfig !== undefined && object.liquidationsConfig !== null ? LiquidationsConfig.fromPartial(object.liquidationsConfig) : undefined;
        message.blockRateLimitConfig = object.blockRateLimitConfig !== undefined && object.blockRateLimitConfig !== null ? BlockRateLimitConfiguration.fromPartial(object.blockRateLimitConfig) : undefined;
        message.equityTierLimitConfig = object.equityTierLimitConfig !== undefined && object.equityTierLimitConfig !== null ? EquityTierLimitConfiguration.fromPartial(object.equityTierLimitConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.clobPairs = object.clob_pairs?.map(e => ClobPair.fromAmino(e)) || [];
        if (object.liquidations_config !== undefined && object.liquidations_config !== null) {
            message.liquidationsConfig = LiquidationsConfig.fromAmino(object.liquidations_config);
        }
        if (object.block_rate_limit_config !== undefined && object.block_rate_limit_config !== null) {
            message.blockRateLimitConfig = BlockRateLimitConfiguration.fromAmino(object.block_rate_limit_config);
        }
        if (object.equity_tier_limit_config !== undefined && object.equity_tier_limit_config !== null) {
            message.equityTierLimitConfig = EquityTierLimitConfiguration.fromAmino(object.equity_tier_limit_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.clobPairs) {
            obj.clob_pairs = message.clobPairs.map(e => e ? ClobPair.toAmino(e) : undefined);
        }
        else {
            obj.clob_pairs = message.clobPairs;
        }
        obj.liquidations_config = message.liquidationsConfig ? LiquidationsConfig.toAmino(message.liquidationsConfig) : undefined;
        obj.block_rate_limit_config = message.blockRateLimitConfig ? BlockRateLimitConfiguration.toAmino(message.blockRateLimitConfig) : undefined;
        obj.equity_tier_limit_config = message.equityTierLimitConfig ? EquityTierLimitConfiguration.toAmino(message.equityTierLimitConfig) : undefined;
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
            typeUrl: "/klyraprotocol.clob.GenesisState",
            value: GenesisState.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);
