"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = void 0;
//@ts-nocheck
const clob_pair_1 = require("./clob_pair");
const liquidations_config_1 = require("./liquidations_config");
const block_rate_limit_config_1 = require("./block_rate_limit_config");
const equity_tier_limit_config_1 = require("./equity_tier_limit_config");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseGenesisState() {
    return {
        clobPairs: [],
        liquidationsConfig: liquidations_config_1.LiquidationsConfig.fromPartial({}),
        blockRateLimitConfig: block_rate_limit_config_1.BlockRateLimitConfiguration.fromPartial({}),
        equityTierLimitConfig: equity_tier_limit_config_1.EquityTierLimitConfiguration.fromPartial({})
    };
}
exports.GenesisState = {
    typeUrl: "/klyraprotocol.clob.GenesisState",
    is(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.clobPairs) && (!o.clobPairs.length || clob_pair_1.ClobPair.is(o.clobPairs[0])) && liquidations_config_1.LiquidationsConfig.is(o.liquidationsConfig) && block_rate_limit_config_1.BlockRateLimitConfiguration.is(o.blockRateLimitConfig) && equity_tier_limit_config_1.EquityTierLimitConfiguration.is(o.equityTierLimitConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.clob_pairs) && (!o.clob_pairs.length || clob_pair_1.ClobPair.isSDK(o.clob_pairs[0])) && liquidations_config_1.LiquidationsConfig.isSDK(o.liquidations_config) && block_rate_limit_config_1.BlockRateLimitConfiguration.isSDK(o.block_rate_limit_config) && equity_tier_limit_config_1.EquityTierLimitConfiguration.isSDK(o.equity_tier_limit_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.clob_pairs) && (!o.clob_pairs.length || clob_pair_1.ClobPair.isAmino(o.clob_pairs[0])) && liquidations_config_1.LiquidationsConfig.isAmino(o.liquidations_config) && block_rate_limit_config_1.BlockRateLimitConfiguration.isAmino(o.block_rate_limit_config) && equity_tier_limit_config_1.EquityTierLimitConfiguration.isAmino(o.equity_tier_limit_config));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.clobPairs) {
            clob_pair_1.ClobPair.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.liquidationsConfig !== undefined) {
            liquidations_config_1.LiquidationsConfig.encode(message.liquidationsConfig, writer.uint32(18).fork()).ldelim();
        }
        if (message.blockRateLimitConfig !== undefined) {
            block_rate_limit_config_1.BlockRateLimitConfiguration.encode(message.blockRateLimitConfig, writer.uint32(26).fork()).ldelim();
        }
        if (message.equityTierLimitConfig !== undefined) {
            equity_tier_limit_config_1.EquityTierLimitConfiguration.encode(message.equityTierLimitConfig, writer.uint32(34).fork()).ldelim();
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
                    message.clobPairs.push(clob_pair_1.ClobPair.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.liquidationsConfig = liquidations_config_1.LiquidationsConfig.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.blockRateLimitConfig = block_rate_limit_config_1.BlockRateLimitConfiguration.decode(reader, reader.uint32());
                    break;
                case 4:
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
        const message = createBaseGenesisState();
        message.clobPairs = object.clobPairs?.map(e => clob_pair_1.ClobPair.fromPartial(e)) || [];
        message.liquidationsConfig = object.liquidationsConfig !== undefined && object.liquidationsConfig !== null ? liquidations_config_1.LiquidationsConfig.fromPartial(object.liquidationsConfig) : undefined;
        message.blockRateLimitConfig = object.blockRateLimitConfig !== undefined && object.blockRateLimitConfig !== null ? block_rate_limit_config_1.BlockRateLimitConfiguration.fromPartial(object.blockRateLimitConfig) : undefined;
        message.equityTierLimitConfig = object.equityTierLimitConfig !== undefined && object.equityTierLimitConfig !== null ? equity_tier_limit_config_1.EquityTierLimitConfiguration.fromPartial(object.equityTierLimitConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.clobPairs = object.clob_pairs?.map(e => clob_pair_1.ClobPair.fromAmino(e)) || [];
        if (object.liquidations_config !== undefined && object.liquidations_config !== null) {
            message.liquidationsConfig = liquidations_config_1.LiquidationsConfig.fromAmino(object.liquidations_config);
        }
        if (object.block_rate_limit_config !== undefined && object.block_rate_limit_config !== null) {
            message.blockRateLimitConfig = block_rate_limit_config_1.BlockRateLimitConfiguration.fromAmino(object.block_rate_limit_config);
        }
        if (object.equity_tier_limit_config !== undefined && object.equity_tier_limit_config !== null) {
            message.equityTierLimitConfig = equity_tier_limit_config_1.EquityTierLimitConfiguration.fromAmino(object.equity_tier_limit_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.clobPairs) {
            obj.clob_pairs = message.clobPairs.map(e => e ? clob_pair_1.ClobPair.toAmino(e) : undefined);
        }
        else {
            obj.clob_pairs = message.clobPairs;
        }
        obj.liquidations_config = message.liquidationsConfig ? liquidations_config_1.LiquidationsConfig.toAmino(message.liquidationsConfig) : undefined;
        obj.block_rate_limit_config = message.blockRateLimitConfig ? block_rate_limit_config_1.BlockRateLimitConfiguration.toAmino(message.blockRateLimitConfig) : undefined;
        obj.equity_tier_limit_config = message.equityTierLimitConfig ? equity_tier_limit_config_1.EquityTierLimitConfiguration.toAmino(message.equityTierLimitConfig) : undefined;
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
            typeUrl: "/klyraprotocol.clob.GenesisState",
            value: exports.GenesisState.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GenesisState.typeUrl, exports.GenesisState);
