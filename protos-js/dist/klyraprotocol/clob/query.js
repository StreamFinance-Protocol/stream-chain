"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamOrderbookUpdatesResponse = exports.StreamOrderbookUpdatesRequest = exports.QueryLiquidationsConfigurationResponse = exports.QueryLiquidationsConfigurationRequest = exports.QueryBlockRateLimitConfigurationResponse = exports.QueryBlockRateLimitConfigurationRequest = exports.QueryEquityTierLimitConfigurationResponse = exports.QueryEquityTierLimitConfigurationRequest = exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob = exports.MevNodeToNodeCalculationResponse = exports.MevNodeToNodeCalculationRequest = exports.QueryClobPairAllResponse = exports.QueryAllClobPairRequest = exports.QueryClobPairResponse = exports.QueryGetClobPairRequest = void 0;
//@ts-nocheck
const pagination_1 = require("../../cosmos/base/query/v1beta1/pagination");
const mev_1 = require("./mev");
const clob_pair_1 = require("./clob_pair");
const equity_tier_limit_config_1 = require("./equity_tier_limit_config");
const block_rate_limit_config_1 = require("./block_rate_limit_config");
const liquidations_config_1 = require("./liquidations_config");
const off_chain_updates_1 = require("../indexer/off_chain_updates/off_chain_updates");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseQueryGetClobPairRequest() {
    return {
        id: 0
    };
}
exports.QueryGetClobPairRequest = {
    typeUrl: "/klyraprotocol.clob.QueryGetClobPairRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryGetClobPairRequest.typeUrl || typeof o.id === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryGetClobPairRequest.typeUrl || typeof o.id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryGetClobPairRequest.typeUrl || typeof o.id === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGetClobPairRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryGetClobPairRequest();
        message.id = object.id ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryGetClobPairRequest();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryGetClobPairRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryGetClobPairRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryGetClobPairRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryGetClobPairRequest",
            value: exports.QueryGetClobPairRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryGetClobPairRequest.typeUrl, exports.QueryGetClobPairRequest);
function createBaseQueryClobPairResponse() {
    return {
        clobPair: clob_pair_1.ClobPair.fromPartial({})
    };
}
exports.QueryClobPairResponse = {
    typeUrl: "/klyraprotocol.clob.QueryClobPairResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryClobPairResponse.typeUrl || clob_pair_1.ClobPair.is(o.clobPair));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryClobPairResponse.typeUrl || clob_pair_1.ClobPair.isSDK(o.clob_pair));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryClobPairResponse.typeUrl || clob_pair_1.ClobPair.isAmino(o.clob_pair));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.clobPair !== undefined) {
            clob_pair_1.ClobPair.encode(message.clobPair, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClobPairResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryClobPairResponse();
        message.clobPair = object.clobPair !== undefined && object.clobPair !== null ? clob_pair_1.ClobPair.fromPartial(object.clobPair) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryClobPairResponse();
        if (object.clob_pair !== undefined && object.clob_pair !== null) {
            message.clobPair = clob_pair_1.ClobPair.fromAmino(object.clob_pair);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.clob_pair = message.clobPair ? clob_pair_1.ClobPair.toAmino(message.clobPair) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryClobPairResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryClobPairResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryClobPairResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryClobPairResponse",
            value: exports.QueryClobPairResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryClobPairResponse.typeUrl, exports.QueryClobPairResponse);
function createBaseQueryAllClobPairRequest() {
    return {
        pagination: undefined
    };
}
exports.QueryAllClobPairRequest = {
    typeUrl: "/klyraprotocol.clob.QueryAllClobPairRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryAllClobPairRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryAllClobPairRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryAllClobPairRequest.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllClobPairRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAllClobPairRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllClobPairRequest();
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllClobPairRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllClobPairRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllClobPairRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryAllClobPairRequest",
            value: exports.QueryAllClobPairRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllClobPairRequest.typeUrl, exports.QueryAllClobPairRequest);
function createBaseQueryClobPairAllResponse() {
    return {
        clobPair: [],
        pagination: undefined
    };
}
exports.QueryClobPairAllResponse = {
    typeUrl: "/klyraprotocol.clob.QueryClobPairAllResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryClobPairAllResponse.typeUrl || Array.isArray(o.clobPair) && (!o.clobPair.length || clob_pair_1.ClobPair.is(o.clobPair[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryClobPairAllResponse.typeUrl || Array.isArray(o.clob_pair) && (!o.clob_pair.length || clob_pair_1.ClobPair.isSDK(o.clob_pair[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryClobPairAllResponse.typeUrl || Array.isArray(o.clob_pair) && (!o.clob_pair.length || clob_pair_1.ClobPair.isAmino(o.clob_pair[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.clobPair) {
            clob_pair_1.ClobPair.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClobPairAllResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clobPair.push(clob_pair_1.ClobPair.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryClobPairAllResponse();
        message.clobPair = object.clobPair?.map(e => clob_pair_1.ClobPair.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryClobPairAllResponse();
        message.clobPair = object.clob_pair?.map(e => clob_pair_1.ClobPair.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.clobPair) {
            obj.clob_pair = message.clobPair.map(e => e ? clob_pair_1.ClobPair.toAmino(e) : undefined);
        }
        else {
            obj.clob_pair = message.clobPair;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryClobPairAllResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryClobPairAllResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryClobPairAllResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryClobPairAllResponse",
            value: exports.QueryClobPairAllResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryClobPairAllResponse.typeUrl, exports.QueryClobPairAllResponse);
function createBaseMevNodeToNodeCalculationRequest() {
    return {
        blockProposerMatches: undefined,
        validatorMevMetrics: undefined
    };
}
exports.MevNodeToNodeCalculationRequest = {
    typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationRequest",
    is(o) {
        return o && o.$typeUrl === exports.MevNodeToNodeCalculationRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MevNodeToNodeCalculationRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MevNodeToNodeCalculationRequest.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.blockProposerMatches !== undefined) {
            mev_1.ValidatorMevMatches.encode(message.blockProposerMatches, writer.uint32(10).fork()).ldelim();
        }
        if (message.validatorMevMetrics !== undefined) {
            mev_1.MevNodeToNodeMetrics.encode(message.validatorMevMetrics, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMevNodeToNodeCalculationRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockProposerMatches = mev_1.ValidatorMevMatches.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.validatorMevMetrics = mev_1.MevNodeToNodeMetrics.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMevNodeToNodeCalculationRequest();
        message.blockProposerMatches = object.blockProposerMatches !== undefined && object.blockProposerMatches !== null ? mev_1.ValidatorMevMatches.fromPartial(object.blockProposerMatches) : undefined;
        message.validatorMevMetrics = object.validatorMevMetrics !== undefined && object.validatorMevMetrics !== null ? mev_1.MevNodeToNodeMetrics.fromPartial(object.validatorMevMetrics) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMevNodeToNodeCalculationRequest();
        if (object.block_proposer_matches !== undefined && object.block_proposer_matches !== null) {
            message.blockProposerMatches = mev_1.ValidatorMevMatches.fromAmino(object.block_proposer_matches);
        }
        if (object.validator_mev_metrics !== undefined && object.validator_mev_metrics !== null) {
            message.validatorMevMetrics = mev_1.MevNodeToNodeMetrics.fromAmino(object.validator_mev_metrics);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block_proposer_matches = message.blockProposerMatches ? mev_1.ValidatorMevMatches.toAmino(message.blockProposerMatches) : undefined;
        obj.validator_mev_metrics = message.validatorMevMetrics ? mev_1.MevNodeToNodeMetrics.toAmino(message.validatorMevMetrics) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MevNodeToNodeCalculationRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MevNodeToNodeCalculationRequest.decode(message.value);
    },
    toProto(message) {
        return exports.MevNodeToNodeCalculationRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationRequest",
            value: exports.MevNodeToNodeCalculationRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MevNodeToNodeCalculationRequest.typeUrl, exports.MevNodeToNodeCalculationRequest);
function createBaseMevNodeToNodeCalculationResponse() {
    return {
        results: []
    };
}
exports.MevNodeToNodeCalculationResponse = {
    typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationResponse",
    is(o) {
        return o && (o.$typeUrl === exports.MevNodeToNodeCalculationResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.is(o.results[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MevNodeToNodeCalculationResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.isSDK(o.results[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MevNodeToNodeCalculationResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.isAmino(o.results[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.results) {
            exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMevNodeToNodeCalculationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.results.push(exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMevNodeToNodeCalculationResponse();
        message.results = object.results?.map(e => exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMevNodeToNodeCalculationResponse();
        message.results = object.results?.map(e => exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.results) {
            obj.results = message.results.map(e => e ? exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.toAmino(e) : undefined);
        }
        else {
            obj.results = message.results;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MevNodeToNodeCalculationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MevNodeToNodeCalculationResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MevNodeToNodeCalculationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationResponse",
            value: exports.MevNodeToNodeCalculationResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MevNodeToNodeCalculationResponse.typeUrl, exports.MevNodeToNodeCalculationResponse);
function createBaseMevNodeToNodeCalculationResponse_MevAndVolumePerClob() {
    return {
        clobPairId: 0,
        mev: 0,
        volume: BigInt(0)
    };
}
exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob = {
    typeUrl: "/klyraprotocol.clob.MevAndVolumePerClob",
    is(o) {
        return o && (o.$typeUrl === exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl || typeof o.clobPairId === "number" && typeof o.mev === "number" && typeof o.volume === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl || typeof o.clob_pair_id === "number" && typeof o.mev === "number" && typeof o.volume === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl || typeof o.clob_pair_id === "number" && typeof o.mev === "number" && typeof o.volume === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.clobPairId !== 0) {
            writer.uint32(8).uint32(message.clobPairId);
        }
        if (message.mev !== 0) {
            writer.uint32(21).float(message.mev);
        }
        if (message.volume !== BigInt(0)) {
            writer.uint32(24).uint64(message.volume);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMevNodeToNodeCalculationResponse_MevAndVolumePerClob();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clobPairId = reader.uint32();
                    break;
                case 2:
                    message.mev = reader.float();
                    break;
                case 3:
                    message.volume = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMevNodeToNodeCalculationResponse_MevAndVolumePerClob();
        message.clobPairId = object.clobPairId ?? 0;
        message.mev = object.mev ?? 0;
        message.volume = object.volume !== undefined && object.volume !== null ? BigInt(object.volume.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMevNodeToNodeCalculationResponse_MevAndVolumePerClob();
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        if (object.mev !== undefined && object.mev !== null) {
            message.mev = object.mev;
        }
        if (object.volume !== undefined && object.volume !== null) {
            message.volume = BigInt(object.volume);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        obj.mev = message.mev === 0 ? undefined : message.mev;
        obj.volume = message.volume !== BigInt(0) ? message.volume?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.decode(message.value);
    },
    toProto(message) {
        return exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MevAndVolumePerClob",
            value: exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl, exports.MevNodeToNodeCalculationResponse_MevAndVolumePerClob);
function createBaseQueryEquityTierLimitConfigurationRequest() {
    return {};
}
exports.QueryEquityTierLimitConfigurationRequest = {
    typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryEquityTierLimitConfigurationRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryEquityTierLimitConfigurationRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryEquityTierLimitConfigurationRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryEquityTierLimitConfigurationRequest();
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
        const message = createBaseQueryEquityTierLimitConfigurationRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryEquityTierLimitConfigurationRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryEquityTierLimitConfigurationRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryEquityTierLimitConfigurationRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryEquityTierLimitConfigurationRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationRequest",
            value: exports.QueryEquityTierLimitConfigurationRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryEquityTierLimitConfigurationRequest.typeUrl, exports.QueryEquityTierLimitConfigurationRequest);
function createBaseQueryEquityTierLimitConfigurationResponse() {
    return {
        equityTierLimitConfig: equity_tier_limit_config_1.EquityTierLimitConfiguration.fromPartial({})
    };
}
exports.QueryEquityTierLimitConfigurationResponse = {
    typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryEquityTierLimitConfigurationResponse.typeUrl || equity_tier_limit_config_1.EquityTierLimitConfiguration.is(o.equityTierLimitConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryEquityTierLimitConfigurationResponse.typeUrl || equity_tier_limit_config_1.EquityTierLimitConfiguration.isSDK(o.equity_tier_limit_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryEquityTierLimitConfigurationResponse.typeUrl || equity_tier_limit_config_1.EquityTierLimitConfiguration.isAmino(o.equity_tier_limit_config));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.equityTierLimitConfig !== undefined) {
            equity_tier_limit_config_1.EquityTierLimitConfiguration.encode(message.equityTierLimitConfig, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryEquityTierLimitConfigurationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryEquityTierLimitConfigurationResponse();
        message.equityTierLimitConfig = object.equityTierLimitConfig !== undefined && object.equityTierLimitConfig !== null ? equity_tier_limit_config_1.EquityTierLimitConfiguration.fromPartial(object.equityTierLimitConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryEquityTierLimitConfigurationResponse();
        if (object.equity_tier_limit_config !== undefined && object.equity_tier_limit_config !== null) {
            message.equityTierLimitConfig = equity_tier_limit_config_1.EquityTierLimitConfiguration.fromAmino(object.equity_tier_limit_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.equity_tier_limit_config = message.equityTierLimitConfig ? equity_tier_limit_config_1.EquityTierLimitConfiguration.toAmino(message.equityTierLimitConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryEquityTierLimitConfigurationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryEquityTierLimitConfigurationResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryEquityTierLimitConfigurationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationResponse",
            value: exports.QueryEquityTierLimitConfigurationResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryEquityTierLimitConfigurationResponse.typeUrl, exports.QueryEquityTierLimitConfigurationResponse);
function createBaseQueryBlockRateLimitConfigurationRequest() {
    return {};
}
exports.QueryBlockRateLimitConfigurationRequest = {
    typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryBlockRateLimitConfigurationRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryBlockRateLimitConfigurationRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryBlockRateLimitConfigurationRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBlockRateLimitConfigurationRequest();
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
        const message = createBaseQueryBlockRateLimitConfigurationRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryBlockRateLimitConfigurationRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryBlockRateLimitConfigurationRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryBlockRateLimitConfigurationRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryBlockRateLimitConfigurationRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationRequest",
            value: exports.QueryBlockRateLimitConfigurationRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryBlockRateLimitConfigurationRequest.typeUrl, exports.QueryBlockRateLimitConfigurationRequest);
function createBaseQueryBlockRateLimitConfigurationResponse() {
    return {
        blockRateLimitConfig: block_rate_limit_config_1.BlockRateLimitConfiguration.fromPartial({})
    };
}
exports.QueryBlockRateLimitConfigurationResponse = {
    typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryBlockRateLimitConfigurationResponse.typeUrl || block_rate_limit_config_1.BlockRateLimitConfiguration.is(o.blockRateLimitConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryBlockRateLimitConfigurationResponse.typeUrl || block_rate_limit_config_1.BlockRateLimitConfiguration.isSDK(o.block_rate_limit_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryBlockRateLimitConfigurationResponse.typeUrl || block_rate_limit_config_1.BlockRateLimitConfiguration.isAmino(o.block_rate_limit_config));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.blockRateLimitConfig !== undefined) {
            block_rate_limit_config_1.BlockRateLimitConfiguration.encode(message.blockRateLimitConfig, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBlockRateLimitConfigurationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryBlockRateLimitConfigurationResponse();
        message.blockRateLimitConfig = object.blockRateLimitConfig !== undefined && object.blockRateLimitConfig !== null ? block_rate_limit_config_1.BlockRateLimitConfiguration.fromPartial(object.blockRateLimitConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryBlockRateLimitConfigurationResponse();
        if (object.block_rate_limit_config !== undefined && object.block_rate_limit_config !== null) {
            message.blockRateLimitConfig = block_rate_limit_config_1.BlockRateLimitConfiguration.fromAmino(object.block_rate_limit_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block_rate_limit_config = message.blockRateLimitConfig ? block_rate_limit_config_1.BlockRateLimitConfiguration.toAmino(message.blockRateLimitConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryBlockRateLimitConfigurationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryBlockRateLimitConfigurationResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryBlockRateLimitConfigurationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationResponse",
            value: exports.QueryBlockRateLimitConfigurationResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryBlockRateLimitConfigurationResponse.typeUrl, exports.QueryBlockRateLimitConfigurationResponse);
function createBaseQueryLiquidationsConfigurationRequest() {
    return {};
}
exports.QueryLiquidationsConfigurationRequest = {
    typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryLiquidationsConfigurationRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryLiquidationsConfigurationRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryLiquidationsConfigurationRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryLiquidationsConfigurationRequest();
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
        const message = createBaseQueryLiquidationsConfigurationRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryLiquidationsConfigurationRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryLiquidationsConfigurationRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryLiquidationsConfigurationRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryLiquidationsConfigurationRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationRequest",
            value: exports.QueryLiquidationsConfigurationRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryLiquidationsConfigurationRequest.typeUrl, exports.QueryLiquidationsConfigurationRequest);
function createBaseQueryLiquidationsConfigurationResponse() {
    return {
        liquidationsConfig: liquidations_config_1.LiquidationsConfig.fromPartial({})
    };
}
exports.QueryLiquidationsConfigurationResponse = {
    typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryLiquidationsConfigurationResponse.typeUrl || liquidations_config_1.LiquidationsConfig.is(o.liquidationsConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryLiquidationsConfigurationResponse.typeUrl || liquidations_config_1.LiquidationsConfig.isSDK(o.liquidations_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryLiquidationsConfigurationResponse.typeUrl || liquidations_config_1.LiquidationsConfig.isAmino(o.liquidations_config));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.liquidationsConfig !== undefined) {
            liquidations_config_1.LiquidationsConfig.encode(message.liquidationsConfig, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryLiquidationsConfigurationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryLiquidationsConfigurationResponse();
        message.liquidationsConfig = object.liquidationsConfig !== undefined && object.liquidationsConfig !== null ? liquidations_config_1.LiquidationsConfig.fromPartial(object.liquidationsConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryLiquidationsConfigurationResponse();
        if (object.liquidations_config !== undefined && object.liquidations_config !== null) {
            message.liquidationsConfig = liquidations_config_1.LiquidationsConfig.fromAmino(object.liquidations_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.liquidations_config = message.liquidationsConfig ? liquidations_config_1.LiquidationsConfig.toAmino(message.liquidationsConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryLiquidationsConfigurationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryLiquidationsConfigurationResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryLiquidationsConfigurationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationResponse",
            value: exports.QueryLiquidationsConfigurationResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryLiquidationsConfigurationResponse.typeUrl, exports.QueryLiquidationsConfigurationResponse);
function createBaseStreamOrderbookUpdatesRequest() {
    return {
        clobPairId: []
    };
}
exports.StreamOrderbookUpdatesRequest = {
    typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesRequest",
    is(o) {
        return o && (o.$typeUrl === exports.StreamOrderbookUpdatesRequest.typeUrl || Array.isArray(o.clobPairId) && (!o.clobPairId.length || typeof o.clobPairId[0] === "number"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.StreamOrderbookUpdatesRequest.typeUrl || Array.isArray(o.clob_pair_id) && (!o.clob_pair_id.length || typeof o.clob_pair_id[0] === "number"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.StreamOrderbookUpdatesRequest.typeUrl || Array.isArray(o.clob_pair_id) && (!o.clob_pair_id.length || typeof o.clob_pair_id[0] === "number"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        writer.uint32(10).fork();
        for (const v of message.clobPairId) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStreamOrderbookUpdatesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.clobPairId.push(reader.uint32());
                        }
                    }
                    else {
                        message.clobPairId.push(reader.uint32());
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
        const message = createBaseStreamOrderbookUpdatesRequest();
        message.clobPairId = object.clobPairId?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseStreamOrderbookUpdatesRequest();
        message.clobPairId = object.clob_pair_id?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.clobPairId) {
            obj.clob_pair_id = message.clobPairId.map(e => e);
        }
        else {
            obj.clob_pair_id = message.clobPairId;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StreamOrderbookUpdatesRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.StreamOrderbookUpdatesRequest.decode(message.value);
    },
    toProto(message) {
        return exports.StreamOrderbookUpdatesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesRequest",
            value: exports.StreamOrderbookUpdatesRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StreamOrderbookUpdatesRequest.typeUrl, exports.StreamOrderbookUpdatesRequest);
function createBaseStreamOrderbookUpdatesResponse() {
    return {
        updates: [],
        snapshot: false,
        blockHeight: 0,
        execMode: 0
    };
}
exports.StreamOrderbookUpdatesResponse = {
    typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesResponse",
    is(o) {
        return o && (o.$typeUrl === exports.StreamOrderbookUpdatesResponse.typeUrl || Array.isArray(o.updates) && (!o.updates.length || off_chain_updates_1.OffChainUpdateV1.is(o.updates[0])) && typeof o.snapshot === "boolean" && typeof o.blockHeight === "number" && typeof o.execMode === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.StreamOrderbookUpdatesResponse.typeUrl || Array.isArray(o.updates) && (!o.updates.length || off_chain_updates_1.OffChainUpdateV1.isSDK(o.updates[0])) && typeof o.snapshot === "boolean" && typeof o.block_height === "number" && typeof o.exec_mode === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.StreamOrderbookUpdatesResponse.typeUrl || Array.isArray(o.updates) && (!o.updates.length || off_chain_updates_1.OffChainUpdateV1.isAmino(o.updates[0])) && typeof o.snapshot === "boolean" && typeof o.block_height === "number" && typeof o.exec_mode === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.updates) {
            off_chain_updates_1.OffChainUpdateV1.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.snapshot === true) {
            writer.uint32(16).bool(message.snapshot);
        }
        if (message.blockHeight !== 0) {
            writer.uint32(24).uint32(message.blockHeight);
        }
        if (message.execMode !== 0) {
            writer.uint32(32).uint32(message.execMode);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStreamOrderbookUpdatesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.updates.push(off_chain_updates_1.OffChainUpdateV1.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.snapshot = reader.bool();
                    break;
                case 3:
                    message.blockHeight = reader.uint32();
                    break;
                case 4:
                    message.execMode = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStreamOrderbookUpdatesResponse();
        message.updates = object.updates?.map(e => off_chain_updates_1.OffChainUpdateV1.fromPartial(e)) || [];
        message.snapshot = object.snapshot ?? false;
        message.blockHeight = object.blockHeight ?? 0;
        message.execMode = object.execMode ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseStreamOrderbookUpdatesResponse();
        message.updates = object.updates?.map(e => off_chain_updates_1.OffChainUpdateV1.fromAmino(e)) || [];
        if (object.snapshot !== undefined && object.snapshot !== null) {
            message.snapshot = object.snapshot;
        }
        if (object.block_height !== undefined && object.block_height !== null) {
            message.blockHeight = object.block_height;
        }
        if (object.exec_mode !== undefined && object.exec_mode !== null) {
            message.execMode = object.exec_mode;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.updates) {
            obj.updates = message.updates.map(e => e ? off_chain_updates_1.OffChainUpdateV1.toAmino(e) : undefined);
        }
        else {
            obj.updates = message.updates;
        }
        obj.snapshot = message.snapshot === false ? undefined : message.snapshot;
        obj.block_height = message.blockHeight === 0 ? undefined : message.blockHeight;
        obj.exec_mode = message.execMode === 0 ? undefined : message.execMode;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StreamOrderbookUpdatesResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.StreamOrderbookUpdatesResponse.decode(message.value);
    },
    toProto(message) {
        return exports.StreamOrderbookUpdatesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesResponse",
            value: exports.StreamOrderbookUpdatesResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StreamOrderbookUpdatesResponse.typeUrl, exports.StreamOrderbookUpdatesResponse);
