//@ts-nocheck
import { DowntimeParams } from "./params";
import { BlockInfo, AllDowntimeInfo } from "./blocktime";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseQueryDowntimeParamsRequest() {
    return {};
}
export const QueryDowntimeParamsRequest = {
    typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsRequest",
    is(o) {
        return o && o.$typeUrl === QueryDowntimeParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryDowntimeParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryDowntimeParamsRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return QueryDowntimeParamsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryDowntimeParamsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDowntimeParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsRequest",
            value: QueryDowntimeParamsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDowntimeParamsRequest.typeUrl, QueryDowntimeParamsRequest);
function createBaseQueryDowntimeParamsResponse() {
    return {
        params: DowntimeParams.fromPartial({})
    };
}
export const QueryDowntimeParamsResponse = {
    typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryDowntimeParamsResponse.typeUrl || DowntimeParams.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDowntimeParamsResponse.typeUrl || DowntimeParams.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDowntimeParamsResponse.typeUrl || DowntimeParams.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.params !== undefined) {
            DowntimeParams.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDowntimeParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = DowntimeParams.decode(reader, reader.uint32());
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
        message.params = object.params !== undefined && object.params !== null ? DowntimeParams.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDowntimeParamsResponse();
        if (object.params !== undefined && object.params !== null) {
            message.params = DowntimeParams.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? DowntimeParams.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDowntimeParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryDowntimeParamsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryDowntimeParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsResponse",
            value: QueryDowntimeParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDowntimeParamsResponse.typeUrl, QueryDowntimeParamsResponse);
function createBaseQueryPreviousBlockInfoRequest() {
    return {};
}
export const QueryPreviousBlockInfoRequest = {
    typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoRequest",
    is(o) {
        return o && o.$typeUrl === QueryPreviousBlockInfoRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryPreviousBlockInfoRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryPreviousBlockInfoRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return QueryPreviousBlockInfoRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryPreviousBlockInfoRequest.decode(message.value);
    },
    toProto(message) {
        return QueryPreviousBlockInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoRequest",
            value: QueryPreviousBlockInfoRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPreviousBlockInfoRequest.typeUrl, QueryPreviousBlockInfoRequest);
function createBaseQueryPreviousBlockInfoResponse() {
    return {
        info: undefined
    };
}
export const QueryPreviousBlockInfoResponse = {
    typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoResponse",
    is(o) {
        return o && o.$typeUrl === QueryPreviousBlockInfoResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryPreviousBlockInfoResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryPreviousBlockInfoResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.info !== undefined) {
            BlockInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPreviousBlockInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.info = BlockInfo.decode(reader, reader.uint32());
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
        message.info = object.info !== undefined && object.info !== null ? BlockInfo.fromPartial(object.info) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPreviousBlockInfoResponse();
        if (object.info !== undefined && object.info !== null) {
            message.info = BlockInfo.fromAmino(object.info);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.info = message.info ? BlockInfo.toAmino(message.info) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryPreviousBlockInfoResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryPreviousBlockInfoResponse.decode(message.value);
    },
    toProto(message) {
        return QueryPreviousBlockInfoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoResponse",
            value: QueryPreviousBlockInfoResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPreviousBlockInfoResponse.typeUrl, QueryPreviousBlockInfoResponse);
function createBaseQueryAllDowntimeInfoRequest() {
    return {};
}
export const QueryAllDowntimeInfoRequest = {
    typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoRequest",
    is(o) {
        return o && o.$typeUrl === QueryAllDowntimeInfoRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAllDowntimeInfoRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAllDowntimeInfoRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return QueryAllDowntimeInfoRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllDowntimeInfoRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAllDowntimeInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoRequest",
            value: QueryAllDowntimeInfoRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllDowntimeInfoRequest.typeUrl, QueryAllDowntimeInfoRequest);
function createBaseQueryAllDowntimeInfoResponse() {
    return {
        info: undefined
    };
}
export const QueryAllDowntimeInfoResponse = {
    typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoResponse",
    is(o) {
        return o && o.$typeUrl === QueryAllDowntimeInfoResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAllDowntimeInfoResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAllDowntimeInfoResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.info !== undefined) {
            AllDowntimeInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllDowntimeInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.info = AllDowntimeInfo.decode(reader, reader.uint32());
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
        message.info = object.info !== undefined && object.info !== null ? AllDowntimeInfo.fromPartial(object.info) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllDowntimeInfoResponse();
        if (object.info !== undefined && object.info !== null) {
            message.info = AllDowntimeInfo.fromAmino(object.info);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.info = message.info ? AllDowntimeInfo.toAmino(message.info) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllDowntimeInfoResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllDowntimeInfoResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAllDowntimeInfoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoResponse",
            value: QueryAllDowntimeInfoResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllDowntimeInfoResponse.typeUrl, QueryAllDowntimeInfoResponse);
