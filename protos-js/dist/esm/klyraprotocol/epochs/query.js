//@ts-nocheck
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { EpochInfo } from "./epoch_info";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseQueryGetEpochInfoRequest() {
    return {
        name: ""
    };
}
export const QueryGetEpochInfoRequest = {
    typeUrl: "/klyraprotocol.epochs.QueryGetEpochInfoRequest",
    is(o) {
        return o && (o.$typeUrl === QueryGetEpochInfoRequest.typeUrl || typeof o.name === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryGetEpochInfoRequest.typeUrl || typeof o.name === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryGetEpochInfoRequest.typeUrl || typeof o.name === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGetEpochInfoRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryGetEpochInfoRequest();
        message.name = object.name ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryGetEpochInfoRequest();
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.name = message.name === "" ? undefined : message.name;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryGetEpochInfoRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryGetEpochInfoRequest.decode(message.value);
    },
    toProto(message) {
        return QueryGetEpochInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.epochs.QueryGetEpochInfoRequest",
            value: QueryGetEpochInfoRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryGetEpochInfoRequest.typeUrl, QueryGetEpochInfoRequest);
function createBaseQueryEpochInfoResponse() {
    return {
        epochInfo: EpochInfo.fromPartial({})
    };
}
export const QueryEpochInfoResponse = {
    typeUrl: "/klyraprotocol.epochs.QueryEpochInfoResponse",
    is(o) {
        return o && (o.$typeUrl === QueryEpochInfoResponse.typeUrl || EpochInfo.is(o.epochInfo));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryEpochInfoResponse.typeUrl || EpochInfo.isSDK(o.epoch_info));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryEpochInfoResponse.typeUrl || EpochInfo.isAmino(o.epoch_info));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.epochInfo !== undefined) {
            EpochInfo.encode(message.epochInfo, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryEpochInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.epochInfo = EpochInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryEpochInfoResponse();
        message.epochInfo = object.epochInfo !== undefined && object.epochInfo !== null ? EpochInfo.fromPartial(object.epochInfo) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryEpochInfoResponse();
        if (object.epoch_info !== undefined && object.epoch_info !== null) {
            message.epochInfo = EpochInfo.fromAmino(object.epoch_info);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.epoch_info = message.epochInfo ? EpochInfo.toAmino(message.epochInfo) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryEpochInfoResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryEpochInfoResponse.decode(message.value);
    },
    toProto(message) {
        return QueryEpochInfoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.epochs.QueryEpochInfoResponse",
            value: QueryEpochInfoResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryEpochInfoResponse.typeUrl, QueryEpochInfoResponse);
function createBaseQueryAllEpochInfoRequest() {
    return {
        pagination: undefined
    };
}
export const QueryAllEpochInfoRequest = {
    typeUrl: "/klyraprotocol.epochs.QueryAllEpochInfoRequest",
    is(o) {
        return o && o.$typeUrl === QueryAllEpochInfoRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAllEpochInfoRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAllEpochInfoRequest.typeUrl;
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
        const message = createBaseQueryAllEpochInfoRequest();
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
        const message = createBaseQueryAllEpochInfoRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllEpochInfoRequest();
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
        return QueryAllEpochInfoRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllEpochInfoRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAllEpochInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.epochs.QueryAllEpochInfoRequest",
            value: QueryAllEpochInfoRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllEpochInfoRequest.typeUrl, QueryAllEpochInfoRequest);
function createBaseQueryEpochInfoAllResponse() {
    return {
        epochInfo: [],
        pagination: undefined
    };
}
export const QueryEpochInfoAllResponse = {
    typeUrl: "/klyraprotocol.epochs.QueryEpochInfoAllResponse",
    is(o) {
        return o && (o.$typeUrl === QueryEpochInfoAllResponse.typeUrl || Array.isArray(o.epochInfo) && (!o.epochInfo.length || EpochInfo.is(o.epochInfo[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryEpochInfoAllResponse.typeUrl || Array.isArray(o.epoch_info) && (!o.epoch_info.length || EpochInfo.isSDK(o.epoch_info[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryEpochInfoAllResponse.typeUrl || Array.isArray(o.epoch_info) && (!o.epoch_info.length || EpochInfo.isAmino(o.epoch_info[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.epochInfo) {
            EpochInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryEpochInfoAllResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.epochInfo.push(EpochInfo.decode(reader, reader.uint32()));
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
        const message = createBaseQueryEpochInfoAllResponse();
        message.epochInfo = object.epochInfo?.map(e => EpochInfo.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryEpochInfoAllResponse();
        message.epochInfo = object.epoch_info?.map(e => EpochInfo.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.epochInfo) {
            obj.epoch_info = message.epochInfo.map(e => e ? EpochInfo.toAmino(e) : undefined);
        }
        else {
            obj.epoch_info = message.epochInfo;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryEpochInfoAllResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryEpochInfoAllResponse.decode(message.value);
    },
    toProto(message) {
        return QueryEpochInfoAllResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.epochs.QueryEpochInfoAllResponse",
            value: QueryEpochInfoAllResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryEpochInfoAllResponse.typeUrl, QueryEpochInfoAllResponse);
