"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryAllDowntimeInfoResponse = exports.QueryAllDowntimeInfoRequest = exports.QueryPreviousBlockInfoResponse = exports.QueryPreviousBlockInfoRequest = exports.QueryDowntimeParamsResponse = exports.QueryDowntimeParamsRequest = void 0;
//@ts-nocheck
const params_1 = require("./params");
const blocktime_1 = require("./blocktime");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseQueryDowntimeParamsRequest() {
    return {};
}
exports.QueryDowntimeParamsRequest = {
    typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryDowntimeParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryDowntimeParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryDowntimeParamsRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDowntimeParamsRequest();
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
        const message = createBaseQueryDowntimeParamsRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryDowntimeParamsRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDowntimeParamsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryDowntimeParamsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDowntimeParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsRequest",
            value: exports.QueryDowntimeParamsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDowntimeParamsRequest.typeUrl, exports.QueryDowntimeParamsRequest);
function createBaseQueryDowntimeParamsResponse() {
    return {
        params: params_1.DowntimeParams.fromPartial({})
    };
}
exports.QueryDowntimeParamsResponse = {
    typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryDowntimeParamsResponse.typeUrl || params_1.DowntimeParams.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryDowntimeParamsResponse.typeUrl || params_1.DowntimeParams.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryDowntimeParamsResponse.typeUrl || params_1.DowntimeParams.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.params !== undefined) {
            params_1.DowntimeParams.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDowntimeParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = params_1.DowntimeParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDowntimeParamsResponse();
        message.params = object.params !== undefined && object.params !== null ? params_1.DowntimeParams.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDowntimeParamsResponse();
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.DowntimeParams.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? params_1.DowntimeParams.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDowntimeParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryDowntimeParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDowntimeParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsResponse",
            value: exports.QueryDowntimeParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDowntimeParamsResponse.typeUrl, exports.QueryDowntimeParamsResponse);
function createBaseQueryPreviousBlockInfoRequest() {
    return {};
}
exports.QueryPreviousBlockInfoRequest = {
    typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryPreviousBlockInfoRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryPreviousBlockInfoRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryPreviousBlockInfoRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPreviousBlockInfoRequest();
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
        const message = createBaseQueryPreviousBlockInfoRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryPreviousBlockInfoRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryPreviousBlockInfoRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryPreviousBlockInfoRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryPreviousBlockInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoRequest",
            value: exports.QueryPreviousBlockInfoRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryPreviousBlockInfoRequest.typeUrl, exports.QueryPreviousBlockInfoRequest);
function createBaseQueryPreviousBlockInfoResponse() {
    return {
        info: undefined
    };
}
exports.QueryPreviousBlockInfoResponse = {
    typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoResponse",
    is(o) {
        return o && o.$typeUrl === exports.QueryPreviousBlockInfoResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryPreviousBlockInfoResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryPreviousBlockInfoResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.info !== undefined) {
            blocktime_1.BlockInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPreviousBlockInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.info = blocktime_1.BlockInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryPreviousBlockInfoResponse();
        message.info = object.info !== undefined && object.info !== null ? blocktime_1.BlockInfo.fromPartial(object.info) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPreviousBlockInfoResponse();
        if (object.info !== undefined && object.info !== null) {
            message.info = blocktime_1.BlockInfo.fromAmino(object.info);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.info = message.info ? blocktime_1.BlockInfo.toAmino(message.info) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryPreviousBlockInfoResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryPreviousBlockInfoResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryPreviousBlockInfoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoResponse",
            value: exports.QueryPreviousBlockInfoResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryPreviousBlockInfoResponse.typeUrl, exports.QueryPreviousBlockInfoResponse);
function createBaseQueryAllDowntimeInfoRequest() {
    return {};
}
exports.QueryAllDowntimeInfoRequest = {
    typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryAllDowntimeInfoRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryAllDowntimeInfoRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryAllDowntimeInfoRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllDowntimeInfoRequest();
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
        const message = createBaseQueryAllDowntimeInfoRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryAllDowntimeInfoRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllDowntimeInfoRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllDowntimeInfoRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllDowntimeInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoRequest",
            value: exports.QueryAllDowntimeInfoRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllDowntimeInfoRequest.typeUrl, exports.QueryAllDowntimeInfoRequest);
function createBaseQueryAllDowntimeInfoResponse() {
    return {
        info: undefined
    };
}
exports.QueryAllDowntimeInfoResponse = {
    typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoResponse",
    is(o) {
        return o && o.$typeUrl === exports.QueryAllDowntimeInfoResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryAllDowntimeInfoResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryAllDowntimeInfoResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.info !== undefined) {
            blocktime_1.AllDowntimeInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllDowntimeInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.info = blocktime_1.AllDowntimeInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAllDowntimeInfoResponse();
        message.info = object.info !== undefined && object.info !== null ? blocktime_1.AllDowntimeInfo.fromPartial(object.info) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllDowntimeInfoResponse();
        if (object.info !== undefined && object.info !== null) {
            message.info = blocktime_1.AllDowntimeInfo.fromAmino(object.info);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.info = message.info ? blocktime_1.AllDowntimeInfo.toAmino(message.info) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllDowntimeInfoResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllDowntimeInfoResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllDowntimeInfoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoResponse",
            value: exports.QueryAllDowntimeInfoResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllDowntimeInfoResponse.typeUrl, exports.QueryAllDowntimeInfoResponse);
