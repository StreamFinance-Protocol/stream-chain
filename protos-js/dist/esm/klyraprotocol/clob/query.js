//@ts-nocheck
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { ValidatorMevMatches, MevNodeToNodeMetrics } from "./mev";
import { ClobPair } from "./clob_pair";
import { EquityTierLimitConfiguration } from "./equity_tier_limit_config";
import { BlockRateLimitConfiguration } from "./block_rate_limit_config";
import { LiquidationsConfig } from "./liquidations_config";
import { OffChainUpdateV1 } from "../indexer/off_chain_updates/off_chain_updates";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseQueryGetClobPairRequest() {
    return {
        id: 0
    };
}
export const QueryGetClobPairRequest = {
    typeUrl: "/klyraprotocol.clob.QueryGetClobPairRequest",
    is(o) {
        return o && (o.$typeUrl === QueryGetClobPairRequest.typeUrl || typeof o.id === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryGetClobPairRequest.typeUrl || typeof o.id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryGetClobPairRequest.typeUrl || typeof o.id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return QueryGetClobPairRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryGetClobPairRequest.decode(message.value);
    },
    toProto(message) {
        return QueryGetClobPairRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryGetClobPairRequest",
            value: QueryGetClobPairRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryGetClobPairRequest.typeUrl, QueryGetClobPairRequest);
function createBaseQueryClobPairResponse() {
    return {
        clobPair: ClobPair.fromPartial({})
    };
}
export const QueryClobPairResponse = {
    typeUrl: "/klyraprotocol.clob.QueryClobPairResponse",
    is(o) {
        return o && (o.$typeUrl === QueryClobPairResponse.typeUrl || ClobPair.is(o.clobPair));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryClobPairResponse.typeUrl || ClobPair.isSDK(o.clob_pair));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryClobPairResponse.typeUrl || ClobPair.isAmino(o.clob_pair));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.clobPair !== undefined) {
            ClobPair.encode(message.clobPair, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClobPairResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryClobPairResponse();
        message.clobPair = object.clobPair !== undefined && object.clobPair !== null ? ClobPair.fromPartial(object.clobPair) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryClobPairResponse();
        if (object.clob_pair !== undefined && object.clob_pair !== null) {
            message.clobPair = ClobPair.fromAmino(object.clob_pair);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.clob_pair = message.clobPair ? ClobPair.toAmino(message.clobPair) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryClobPairResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryClobPairResponse.decode(message.value);
    },
    toProto(message) {
        return QueryClobPairResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryClobPairResponse",
            value: QueryClobPairResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryClobPairResponse.typeUrl, QueryClobPairResponse);
function createBaseQueryAllClobPairRequest() {
    return {
        pagination: undefined
    };
}
export const QueryAllClobPairRequest = {
    typeUrl: "/klyraprotocol.clob.QueryAllClobPairRequest",
    is(o) {
        return o && o.$typeUrl === QueryAllClobPairRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAllClobPairRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAllClobPairRequest.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllClobPairRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllClobPairRequest();
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllClobPairRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllClobPairRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAllClobPairRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryAllClobPairRequest",
            value: QueryAllClobPairRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllClobPairRequest.typeUrl, QueryAllClobPairRequest);
function createBaseQueryClobPairAllResponse() {
    return {
        clobPair: [],
        pagination: undefined
    };
}
export const QueryClobPairAllResponse = {
    typeUrl: "/klyraprotocol.clob.QueryClobPairAllResponse",
    is(o) {
        return o && (o.$typeUrl === QueryClobPairAllResponse.typeUrl || Array.isArray(o.clobPair) && (!o.clobPair.length || ClobPair.is(o.clobPair[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryClobPairAllResponse.typeUrl || Array.isArray(o.clob_pair) && (!o.clob_pair.length || ClobPair.isSDK(o.clob_pair[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryClobPairAllResponse.typeUrl || Array.isArray(o.clob_pair) && (!o.clob_pair.length || ClobPair.isAmino(o.clob_pair[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.clobPair) {
            ClobPair.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClobPairAllResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clobPair.push(ClobPair.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
        message.clobPair = object.clobPair?.map(e => ClobPair.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryClobPairAllResponse();
        message.clobPair = object.clob_pair?.map(e => ClobPair.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.clobPair) {
            obj.clob_pair = message.clobPair.map(e => e ? ClobPair.toAmino(e) : undefined);
        }
        else {
            obj.clob_pair = message.clobPair;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryClobPairAllResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryClobPairAllResponse.decode(message.value);
    },
    toProto(message) {
        return QueryClobPairAllResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryClobPairAllResponse",
            value: QueryClobPairAllResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryClobPairAllResponse.typeUrl, QueryClobPairAllResponse);
function createBaseMevNodeToNodeCalculationRequest() {
    return {
        blockProposerMatches: undefined,
        validatorMevMetrics: undefined
    };
}
export const MevNodeToNodeCalculationRequest = {
    typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationRequest",
    is(o) {
        return o && o.$typeUrl === MevNodeToNodeCalculationRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MevNodeToNodeCalculationRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MevNodeToNodeCalculationRequest.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.blockProposerMatches !== undefined) {
            ValidatorMevMatches.encode(message.blockProposerMatches, writer.uint32(10).fork()).ldelim();
        }
        if (message.validatorMevMetrics !== undefined) {
            MevNodeToNodeMetrics.encode(message.validatorMevMetrics, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMevNodeToNodeCalculationRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockProposerMatches = ValidatorMevMatches.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.validatorMevMetrics = MevNodeToNodeMetrics.decode(reader, reader.uint32());
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
        message.blockProposerMatches = object.blockProposerMatches !== undefined && object.blockProposerMatches !== null ? ValidatorMevMatches.fromPartial(object.blockProposerMatches) : undefined;
        message.validatorMevMetrics = object.validatorMevMetrics !== undefined && object.validatorMevMetrics !== null ? MevNodeToNodeMetrics.fromPartial(object.validatorMevMetrics) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMevNodeToNodeCalculationRequest();
        if (object.block_proposer_matches !== undefined && object.block_proposer_matches !== null) {
            message.blockProposerMatches = ValidatorMevMatches.fromAmino(object.block_proposer_matches);
        }
        if (object.validator_mev_metrics !== undefined && object.validator_mev_metrics !== null) {
            message.validatorMevMetrics = MevNodeToNodeMetrics.fromAmino(object.validator_mev_metrics);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block_proposer_matches = message.blockProposerMatches ? ValidatorMevMatches.toAmino(message.blockProposerMatches) : undefined;
        obj.validator_mev_metrics = message.validatorMevMetrics ? MevNodeToNodeMetrics.toAmino(message.validatorMevMetrics) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MevNodeToNodeCalculationRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MevNodeToNodeCalculationRequest.decode(message.value);
    },
    toProto(message) {
        return MevNodeToNodeCalculationRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationRequest",
            value: MevNodeToNodeCalculationRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MevNodeToNodeCalculationRequest.typeUrl, MevNodeToNodeCalculationRequest);
function createBaseMevNodeToNodeCalculationResponse() {
    return {
        results: []
    };
}
export const MevNodeToNodeCalculationResponse = {
    typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationResponse",
    is(o) {
        return o && (o.$typeUrl === MevNodeToNodeCalculationResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || MevNodeToNodeCalculationResponse_MevAndVolumePerClob.is(o.results[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MevNodeToNodeCalculationResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || MevNodeToNodeCalculationResponse_MevAndVolumePerClob.isSDK(o.results[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MevNodeToNodeCalculationResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || MevNodeToNodeCalculationResponse_MevAndVolumePerClob.isAmino(o.results[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.results) {
            MevNodeToNodeCalculationResponse_MevAndVolumePerClob.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMevNodeToNodeCalculationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.results.push(MevNodeToNodeCalculationResponse_MevAndVolumePerClob.decode(reader, reader.uint32()));
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
        message.results = object.results?.map(e => MevNodeToNodeCalculationResponse_MevAndVolumePerClob.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMevNodeToNodeCalculationResponse();
        message.results = object.results?.map(e => MevNodeToNodeCalculationResponse_MevAndVolumePerClob.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.results) {
            obj.results = message.results.map(e => e ? MevNodeToNodeCalculationResponse_MevAndVolumePerClob.toAmino(e) : undefined);
        }
        else {
            obj.results = message.results;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MevNodeToNodeCalculationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MevNodeToNodeCalculationResponse.decode(message.value);
    },
    toProto(message) {
        return MevNodeToNodeCalculationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationResponse",
            value: MevNodeToNodeCalculationResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MevNodeToNodeCalculationResponse.typeUrl, MevNodeToNodeCalculationResponse);
function createBaseMevNodeToNodeCalculationResponse_MevAndVolumePerClob() {
    return {
        clobPairId: 0,
        mev: 0,
        volume: BigInt(0)
    };
}
export const MevNodeToNodeCalculationResponse_MevAndVolumePerClob = {
    typeUrl: "/klyraprotocol.clob.MevAndVolumePerClob",
    is(o) {
        return o && (o.$typeUrl === MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl || typeof o.clobPairId === "number" && typeof o.mev === "number" && typeof o.volume === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl || typeof o.clob_pair_id === "number" && typeof o.mev === "number" && typeof o.volume === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl || typeof o.clob_pair_id === "number" && typeof o.mev === "number" && typeof o.volume === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
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
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MevNodeToNodeCalculationResponse_MevAndVolumePerClob.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MevNodeToNodeCalculationResponse_MevAndVolumePerClob.decode(message.value);
    },
    toProto(message) {
        return MevNodeToNodeCalculationResponse_MevAndVolumePerClob.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MevAndVolumePerClob",
            value: MevNodeToNodeCalculationResponse_MevAndVolumePerClob.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl, MevNodeToNodeCalculationResponse_MevAndVolumePerClob);
function createBaseQueryEquityTierLimitConfigurationRequest() {
    return {};
}
export const QueryEquityTierLimitConfigurationRequest = {
    typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationRequest",
    is(o) {
        return o && o.$typeUrl === QueryEquityTierLimitConfigurationRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryEquityTierLimitConfigurationRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryEquityTierLimitConfigurationRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return QueryEquityTierLimitConfigurationRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryEquityTierLimitConfigurationRequest.decode(message.value);
    },
    toProto(message) {
        return QueryEquityTierLimitConfigurationRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationRequest",
            value: QueryEquityTierLimitConfigurationRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryEquityTierLimitConfigurationRequest.typeUrl, QueryEquityTierLimitConfigurationRequest);
function createBaseQueryEquityTierLimitConfigurationResponse() {
    return {
        equityTierLimitConfig: EquityTierLimitConfiguration.fromPartial({})
    };
}
export const QueryEquityTierLimitConfigurationResponse = {
    typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationResponse",
    is(o) {
        return o && (o.$typeUrl === QueryEquityTierLimitConfigurationResponse.typeUrl || EquityTierLimitConfiguration.is(o.equityTierLimitConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryEquityTierLimitConfigurationResponse.typeUrl || EquityTierLimitConfiguration.isSDK(o.equity_tier_limit_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryEquityTierLimitConfigurationResponse.typeUrl || EquityTierLimitConfiguration.isAmino(o.equity_tier_limit_config));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.equityTierLimitConfig !== undefined) {
            EquityTierLimitConfiguration.encode(message.equityTierLimitConfig, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryEquityTierLimitConfigurationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryEquityTierLimitConfigurationResponse();
        message.equityTierLimitConfig = object.equityTierLimitConfig !== undefined && object.equityTierLimitConfig !== null ? EquityTierLimitConfiguration.fromPartial(object.equityTierLimitConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryEquityTierLimitConfigurationResponse();
        if (object.equity_tier_limit_config !== undefined && object.equity_tier_limit_config !== null) {
            message.equityTierLimitConfig = EquityTierLimitConfiguration.fromAmino(object.equity_tier_limit_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.equity_tier_limit_config = message.equityTierLimitConfig ? EquityTierLimitConfiguration.toAmino(message.equityTierLimitConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryEquityTierLimitConfigurationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryEquityTierLimitConfigurationResponse.decode(message.value);
    },
    toProto(message) {
        return QueryEquityTierLimitConfigurationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationResponse",
            value: QueryEquityTierLimitConfigurationResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryEquityTierLimitConfigurationResponse.typeUrl, QueryEquityTierLimitConfigurationResponse);
function createBaseQueryBlockRateLimitConfigurationRequest() {
    return {};
}
export const QueryBlockRateLimitConfigurationRequest = {
    typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationRequest",
    is(o) {
        return o && o.$typeUrl === QueryBlockRateLimitConfigurationRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryBlockRateLimitConfigurationRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryBlockRateLimitConfigurationRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return QueryBlockRateLimitConfigurationRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryBlockRateLimitConfigurationRequest.decode(message.value);
    },
    toProto(message) {
        return QueryBlockRateLimitConfigurationRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationRequest",
            value: QueryBlockRateLimitConfigurationRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryBlockRateLimitConfigurationRequest.typeUrl, QueryBlockRateLimitConfigurationRequest);
function createBaseQueryBlockRateLimitConfigurationResponse() {
    return {
        blockRateLimitConfig: BlockRateLimitConfiguration.fromPartial({})
    };
}
export const QueryBlockRateLimitConfigurationResponse = {
    typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationResponse",
    is(o) {
        return o && (o.$typeUrl === QueryBlockRateLimitConfigurationResponse.typeUrl || BlockRateLimitConfiguration.is(o.blockRateLimitConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryBlockRateLimitConfigurationResponse.typeUrl || BlockRateLimitConfiguration.isSDK(o.block_rate_limit_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryBlockRateLimitConfigurationResponse.typeUrl || BlockRateLimitConfiguration.isAmino(o.block_rate_limit_config));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.blockRateLimitConfig !== undefined) {
            BlockRateLimitConfiguration.encode(message.blockRateLimitConfig, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBlockRateLimitConfigurationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryBlockRateLimitConfigurationResponse();
        message.blockRateLimitConfig = object.blockRateLimitConfig !== undefined && object.blockRateLimitConfig !== null ? BlockRateLimitConfiguration.fromPartial(object.blockRateLimitConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryBlockRateLimitConfigurationResponse();
        if (object.block_rate_limit_config !== undefined && object.block_rate_limit_config !== null) {
            message.blockRateLimitConfig = BlockRateLimitConfiguration.fromAmino(object.block_rate_limit_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block_rate_limit_config = message.blockRateLimitConfig ? BlockRateLimitConfiguration.toAmino(message.blockRateLimitConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryBlockRateLimitConfigurationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryBlockRateLimitConfigurationResponse.decode(message.value);
    },
    toProto(message) {
        return QueryBlockRateLimitConfigurationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationResponse",
            value: QueryBlockRateLimitConfigurationResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryBlockRateLimitConfigurationResponse.typeUrl, QueryBlockRateLimitConfigurationResponse);
function createBaseQueryLiquidationsConfigurationRequest() {
    return {};
}
export const QueryLiquidationsConfigurationRequest = {
    typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationRequest",
    is(o) {
        return o && o.$typeUrl === QueryLiquidationsConfigurationRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryLiquidationsConfigurationRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryLiquidationsConfigurationRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return QueryLiquidationsConfigurationRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryLiquidationsConfigurationRequest.decode(message.value);
    },
    toProto(message) {
        return QueryLiquidationsConfigurationRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationRequest",
            value: QueryLiquidationsConfigurationRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryLiquidationsConfigurationRequest.typeUrl, QueryLiquidationsConfigurationRequest);
function createBaseQueryLiquidationsConfigurationResponse() {
    return {
        liquidationsConfig: LiquidationsConfig.fromPartial({})
    };
}
export const QueryLiquidationsConfigurationResponse = {
    typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationResponse",
    is(o) {
        return o && (o.$typeUrl === QueryLiquidationsConfigurationResponse.typeUrl || LiquidationsConfig.is(o.liquidationsConfig));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryLiquidationsConfigurationResponse.typeUrl || LiquidationsConfig.isSDK(o.liquidations_config));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryLiquidationsConfigurationResponse.typeUrl || LiquidationsConfig.isAmino(o.liquidations_config));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.liquidationsConfig !== undefined) {
            LiquidationsConfig.encode(message.liquidationsConfig, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryLiquidationsConfigurationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryLiquidationsConfigurationResponse();
        message.liquidationsConfig = object.liquidationsConfig !== undefined && object.liquidationsConfig !== null ? LiquidationsConfig.fromPartial(object.liquidationsConfig) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryLiquidationsConfigurationResponse();
        if (object.liquidations_config !== undefined && object.liquidations_config !== null) {
            message.liquidationsConfig = LiquidationsConfig.fromAmino(object.liquidations_config);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.liquidations_config = message.liquidationsConfig ? LiquidationsConfig.toAmino(message.liquidationsConfig) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryLiquidationsConfigurationResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryLiquidationsConfigurationResponse.decode(message.value);
    },
    toProto(message) {
        return QueryLiquidationsConfigurationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationResponse",
            value: QueryLiquidationsConfigurationResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryLiquidationsConfigurationResponse.typeUrl, QueryLiquidationsConfigurationResponse);
function createBaseStreamOrderbookUpdatesRequest() {
    return {
        clobPairId: []
    };
}
export const StreamOrderbookUpdatesRequest = {
    typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesRequest",
    is(o) {
        return o && (o.$typeUrl === StreamOrderbookUpdatesRequest.typeUrl || Array.isArray(o.clobPairId) && (!o.clobPairId.length || typeof o.clobPairId[0] === "number"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === StreamOrderbookUpdatesRequest.typeUrl || Array.isArray(o.clob_pair_id) && (!o.clob_pair_id.length || typeof o.clob_pair_id[0] === "number"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === StreamOrderbookUpdatesRequest.typeUrl || Array.isArray(o.clob_pair_id) && (!o.clob_pair_id.length || typeof o.clob_pair_id[0] === "number"));
    },
    encode(message, writer = BinaryWriter.create()) {
        writer.uint32(10).fork();
        for (const v of message.clobPairId) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return StreamOrderbookUpdatesRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return StreamOrderbookUpdatesRequest.decode(message.value);
    },
    toProto(message) {
        return StreamOrderbookUpdatesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesRequest",
            value: StreamOrderbookUpdatesRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(StreamOrderbookUpdatesRequest.typeUrl, StreamOrderbookUpdatesRequest);
function createBaseStreamOrderbookUpdatesResponse() {
    return {
        updates: [],
        snapshot: false,
        blockHeight: 0,
        execMode: 0
    };
}
export const StreamOrderbookUpdatesResponse = {
    typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesResponse",
    is(o) {
        return o && (o.$typeUrl === StreamOrderbookUpdatesResponse.typeUrl || Array.isArray(o.updates) && (!o.updates.length || OffChainUpdateV1.is(o.updates[0])) && typeof o.snapshot === "boolean" && typeof o.blockHeight === "number" && typeof o.execMode === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === StreamOrderbookUpdatesResponse.typeUrl || Array.isArray(o.updates) && (!o.updates.length || OffChainUpdateV1.isSDK(o.updates[0])) && typeof o.snapshot === "boolean" && typeof o.block_height === "number" && typeof o.exec_mode === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === StreamOrderbookUpdatesResponse.typeUrl || Array.isArray(o.updates) && (!o.updates.length || OffChainUpdateV1.isAmino(o.updates[0])) && typeof o.snapshot === "boolean" && typeof o.block_height === "number" && typeof o.exec_mode === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.updates) {
            OffChainUpdateV1.encode(v, writer.uint32(10).fork()).ldelim();
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
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStreamOrderbookUpdatesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.updates.push(OffChainUpdateV1.decode(reader, reader.uint32()));
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
        message.updates = object.updates?.map(e => OffChainUpdateV1.fromPartial(e)) || [];
        message.snapshot = object.snapshot ?? false;
        message.blockHeight = object.blockHeight ?? 0;
        message.execMode = object.execMode ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseStreamOrderbookUpdatesResponse();
        message.updates = object.updates?.map(e => OffChainUpdateV1.fromAmino(e)) || [];
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
            obj.updates = message.updates.map(e => e ? OffChainUpdateV1.toAmino(e) : undefined);
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
        return StreamOrderbookUpdatesResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return StreamOrderbookUpdatesResponse.decode(message.value);
    },
    toProto(message) {
        return StreamOrderbookUpdatesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesResponse",
            value: StreamOrderbookUpdatesResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(StreamOrderbookUpdatesResponse.typeUrl, StreamOrderbookUpdatesResponse);
