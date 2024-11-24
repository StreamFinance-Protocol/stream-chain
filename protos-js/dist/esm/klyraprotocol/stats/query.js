//@ts-nocheck
import { Params } from "./params";
import { StatsMetadata, GlobalStats, UserStats } from "./stats";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseQueryParamsRequest() {
    return {};
}
export const QueryParamsRequest = {
    typeUrl: "/klyraprotocol.stats.QueryParamsRequest",
    is(o) {
        return o && o.$typeUrl === QueryParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryParamsRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
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
        const message = createBaseQueryParamsRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryParamsRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryParamsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryParamsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryParamsRequest",
            value: QueryParamsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryParamsRequest.typeUrl, QueryParamsRequest);
function createBaseQueryParamsResponse() {
    return {
        params: Params.fromPartial({})
    };
}
export const QueryParamsResponse = {
    typeUrl: "/klyraprotocol.stats.QueryParamsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryParamsResponse();
        message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryParamsResponse();
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? Params.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryParamsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryParamsResponse",
            value: QueryParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryParamsResponse.typeUrl, QueryParamsResponse);
function createBaseQueryStatsMetadataRequest() {
    return {};
}
export const QueryStatsMetadataRequest = {
    typeUrl: "/klyraprotocol.stats.QueryStatsMetadataRequest",
    is(o) {
        return o && o.$typeUrl === QueryStatsMetadataRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryStatsMetadataRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryStatsMetadataRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryStatsMetadataRequest();
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
        const message = createBaseQueryStatsMetadataRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryStatsMetadataRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryStatsMetadataRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryStatsMetadataRequest.decode(message.value);
    },
    toProto(message) {
        return QueryStatsMetadataRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryStatsMetadataRequest",
            value: QueryStatsMetadataRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryStatsMetadataRequest.typeUrl, QueryStatsMetadataRequest);
function createBaseQueryStatsMetadataResponse() {
    return {
        metadata: undefined
    };
}
export const QueryStatsMetadataResponse = {
    typeUrl: "/klyraprotocol.stats.QueryStatsMetadataResponse",
    is(o) {
        return o && o.$typeUrl === QueryStatsMetadataResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryStatsMetadataResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryStatsMetadataResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.metadata !== undefined) {
            StatsMetadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryStatsMetadataResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.metadata = StatsMetadata.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryStatsMetadataResponse();
        message.metadata = object.metadata !== undefined && object.metadata !== null ? StatsMetadata.fromPartial(object.metadata) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryStatsMetadataResponse();
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = StatsMetadata.fromAmino(object.metadata);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.metadata = message.metadata ? StatsMetadata.toAmino(message.metadata) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryStatsMetadataResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryStatsMetadataResponse.decode(message.value);
    },
    toProto(message) {
        return QueryStatsMetadataResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryStatsMetadataResponse",
            value: QueryStatsMetadataResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryStatsMetadataResponse.typeUrl, QueryStatsMetadataResponse);
function createBaseQueryGlobalStatsRequest() {
    return {};
}
export const QueryGlobalStatsRequest = {
    typeUrl: "/klyraprotocol.stats.QueryGlobalStatsRequest",
    is(o) {
        return o && o.$typeUrl === QueryGlobalStatsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryGlobalStatsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryGlobalStatsRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGlobalStatsRequest();
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
        const message = createBaseQueryGlobalStatsRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryGlobalStatsRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryGlobalStatsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryGlobalStatsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryGlobalStatsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryGlobalStatsRequest",
            value: QueryGlobalStatsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryGlobalStatsRequest.typeUrl, QueryGlobalStatsRequest);
function createBaseQueryGlobalStatsResponse() {
    return {
        stats: undefined
    };
}
export const QueryGlobalStatsResponse = {
    typeUrl: "/klyraprotocol.stats.QueryGlobalStatsResponse",
    is(o) {
        return o && o.$typeUrl === QueryGlobalStatsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryGlobalStatsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryGlobalStatsResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.stats !== undefined) {
            GlobalStats.encode(message.stats, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGlobalStatsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.stats = GlobalStats.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryGlobalStatsResponse();
        message.stats = object.stats !== undefined && object.stats !== null ? GlobalStats.fromPartial(object.stats) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryGlobalStatsResponse();
        if (object.stats !== undefined && object.stats !== null) {
            message.stats = GlobalStats.fromAmino(object.stats);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.stats = message.stats ? GlobalStats.toAmino(message.stats) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryGlobalStatsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryGlobalStatsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryGlobalStatsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryGlobalStatsResponse",
            value: QueryGlobalStatsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryGlobalStatsResponse.typeUrl, QueryGlobalStatsResponse);
function createBaseQueryUserStatsRequest() {
    return {
        user: ""
    };
}
export const QueryUserStatsRequest = {
    typeUrl: "/klyraprotocol.stats.QueryUserStatsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryUserStatsRequest.typeUrl || typeof o.user === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryUserStatsRequest.typeUrl || typeof o.user === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryUserStatsRequest.typeUrl || typeof o.user === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.user !== "") {
            writer.uint32(10).string(message.user);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUserStatsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.user = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryUserStatsRequest();
        message.user = object.user ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryUserStatsRequest();
        if (object.user !== undefined && object.user !== null) {
            message.user = object.user;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.user = message.user === "" ? undefined : message.user;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryUserStatsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryUserStatsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryUserStatsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryUserStatsRequest",
            value: QueryUserStatsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryUserStatsRequest.typeUrl, QueryUserStatsRequest);
function createBaseQueryUserStatsResponse() {
    return {
        stats: undefined
    };
}
export const QueryUserStatsResponse = {
    typeUrl: "/klyraprotocol.stats.QueryUserStatsResponse",
    is(o) {
        return o && o.$typeUrl === QueryUserStatsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryUserStatsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryUserStatsResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.stats !== undefined) {
            UserStats.encode(message.stats, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUserStatsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.stats = UserStats.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryUserStatsResponse();
        message.stats = object.stats !== undefined && object.stats !== null ? UserStats.fromPartial(object.stats) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryUserStatsResponse();
        if (object.stats !== undefined && object.stats !== null) {
            message.stats = UserStats.fromAmino(object.stats);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.stats = message.stats ? UserStats.toAmino(message.stats) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryUserStatsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryUserStatsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryUserStatsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryUserStatsResponse",
            value: QueryUserStatsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryUserStatsResponse.typeUrl, QueryUserStatsResponse);
