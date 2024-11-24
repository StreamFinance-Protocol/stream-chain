"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryUserStatsResponse = exports.QueryUserStatsRequest = exports.QueryGlobalStatsResponse = exports.QueryGlobalStatsRequest = exports.QueryStatsMetadataResponse = exports.QueryStatsMetadataRequest = exports.QueryParamsResponse = exports.QueryParamsRequest = void 0;
//@ts-nocheck
const params_1 = require("./params");
const stats_1 = require("./stats");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseQueryParamsRequest() {
    return {};
}
exports.QueryParamsRequest = {
    typeUrl: "/klyraprotocol.stats.QueryParamsRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryParamsRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryParamsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryParamsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryParamsRequest",
            value: exports.QueryParamsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryParamsRequest.typeUrl, exports.QueryParamsRequest);
function createBaseQueryParamsResponse() {
    return {
        params: params_1.Params.fromPartial({})
    };
}
exports.QueryParamsResponse = {
    typeUrl: "/klyraprotocol.stats.QueryParamsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryParamsResponse.typeUrl || params_1.Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryParamsResponse.typeUrl || params_1.Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryParamsResponse.typeUrl || params_1.Params.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.params !== undefined) {
            params_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryParamsResponse();
        message.params = object.params !== undefined && object.params !== null ? params_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryParamsResponse();
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? params_1.Params.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryParamsResponse",
            value: exports.QueryParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryParamsResponse.typeUrl, exports.QueryParamsResponse);
function createBaseQueryStatsMetadataRequest() {
    return {};
}
exports.QueryStatsMetadataRequest = {
    typeUrl: "/klyraprotocol.stats.QueryStatsMetadataRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryStatsMetadataRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryStatsMetadataRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryStatsMetadataRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryStatsMetadataRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryStatsMetadataRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryStatsMetadataRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryStatsMetadataRequest",
            value: exports.QueryStatsMetadataRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryStatsMetadataRequest.typeUrl, exports.QueryStatsMetadataRequest);
function createBaseQueryStatsMetadataResponse() {
    return {
        metadata: undefined
    };
}
exports.QueryStatsMetadataResponse = {
    typeUrl: "/klyraprotocol.stats.QueryStatsMetadataResponse",
    is(o) {
        return o && o.$typeUrl === exports.QueryStatsMetadataResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryStatsMetadataResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryStatsMetadataResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.metadata !== undefined) {
            stats_1.StatsMetadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryStatsMetadataResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.metadata = stats_1.StatsMetadata.decode(reader, reader.uint32());
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
        message.metadata = object.metadata !== undefined && object.metadata !== null ? stats_1.StatsMetadata.fromPartial(object.metadata) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryStatsMetadataResponse();
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = stats_1.StatsMetadata.fromAmino(object.metadata);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.metadata = message.metadata ? stats_1.StatsMetadata.toAmino(message.metadata) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryStatsMetadataResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryStatsMetadataResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryStatsMetadataResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryStatsMetadataResponse",
            value: exports.QueryStatsMetadataResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryStatsMetadataResponse.typeUrl, exports.QueryStatsMetadataResponse);
function createBaseQueryGlobalStatsRequest() {
    return {};
}
exports.QueryGlobalStatsRequest = {
    typeUrl: "/klyraprotocol.stats.QueryGlobalStatsRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryGlobalStatsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryGlobalStatsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryGlobalStatsRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryGlobalStatsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryGlobalStatsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryGlobalStatsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryGlobalStatsRequest",
            value: exports.QueryGlobalStatsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryGlobalStatsRequest.typeUrl, exports.QueryGlobalStatsRequest);
function createBaseQueryGlobalStatsResponse() {
    return {
        stats: undefined
    };
}
exports.QueryGlobalStatsResponse = {
    typeUrl: "/klyraprotocol.stats.QueryGlobalStatsResponse",
    is(o) {
        return o && o.$typeUrl === exports.QueryGlobalStatsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryGlobalStatsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryGlobalStatsResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.stats !== undefined) {
            stats_1.GlobalStats.encode(message.stats, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGlobalStatsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.stats = stats_1.GlobalStats.decode(reader, reader.uint32());
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
        message.stats = object.stats !== undefined && object.stats !== null ? stats_1.GlobalStats.fromPartial(object.stats) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryGlobalStatsResponse();
        if (object.stats !== undefined && object.stats !== null) {
            message.stats = stats_1.GlobalStats.fromAmino(object.stats);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.stats = message.stats ? stats_1.GlobalStats.toAmino(message.stats) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryGlobalStatsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryGlobalStatsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryGlobalStatsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryGlobalStatsResponse",
            value: exports.QueryGlobalStatsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryGlobalStatsResponse.typeUrl, exports.QueryGlobalStatsResponse);
function createBaseQueryUserStatsRequest() {
    return {
        user: ""
    };
}
exports.QueryUserStatsRequest = {
    typeUrl: "/klyraprotocol.stats.QueryUserStatsRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryUserStatsRequest.typeUrl || typeof o.user === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryUserStatsRequest.typeUrl || typeof o.user === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryUserStatsRequest.typeUrl || typeof o.user === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.user !== "") {
            writer.uint32(10).string(message.user);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryUserStatsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryUserStatsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryUserStatsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryUserStatsRequest",
            value: exports.QueryUserStatsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryUserStatsRequest.typeUrl, exports.QueryUserStatsRequest);
function createBaseQueryUserStatsResponse() {
    return {
        stats: undefined
    };
}
exports.QueryUserStatsResponse = {
    typeUrl: "/klyraprotocol.stats.QueryUserStatsResponse",
    is(o) {
        return o && o.$typeUrl === exports.QueryUserStatsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryUserStatsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryUserStatsResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.stats !== undefined) {
            stats_1.UserStats.encode(message.stats, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUserStatsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.stats = stats_1.UserStats.decode(reader, reader.uint32());
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
        message.stats = object.stats !== undefined && object.stats !== null ? stats_1.UserStats.fromPartial(object.stats) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryUserStatsResponse();
        if (object.stats !== undefined && object.stats !== null) {
            message.stats = stats_1.UserStats.fromAmino(object.stats);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.stats = message.stats ? stats_1.UserStats.toAmino(message.stats) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryUserStatsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryUserStatsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryUserStatsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.QueryUserStatsResponse",
            value: exports.QueryUserStatsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryUserStatsResponse.typeUrl, exports.QueryUserStatsResponse);
