"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryEpochInfoAllResponse = exports.QueryAllEpochInfoRequest = exports.QueryEpochInfoResponse = exports.QueryGetEpochInfoRequest = void 0;
//@ts-nocheck
const pagination_1 = require("../../cosmos/base/query/v1beta1/pagination");
const epoch_info_1 = require("./epoch_info");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseQueryGetEpochInfoRequest() {
    return {
        name: ""
    };
}
exports.QueryGetEpochInfoRequest = {
    typeUrl: "/klyraprotocol.epochs.QueryGetEpochInfoRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryGetEpochInfoRequest.typeUrl || typeof o.name === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryGetEpochInfoRequest.typeUrl || typeof o.name === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryGetEpochInfoRequest.typeUrl || typeof o.name === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryGetEpochInfoRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryGetEpochInfoRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryGetEpochInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.epochs.QueryGetEpochInfoRequest",
            value: exports.QueryGetEpochInfoRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryGetEpochInfoRequest.typeUrl, exports.QueryGetEpochInfoRequest);
function createBaseQueryEpochInfoResponse() {
    return {
        epochInfo: epoch_info_1.EpochInfo.fromPartial({})
    };
}
exports.QueryEpochInfoResponse = {
    typeUrl: "/klyraprotocol.epochs.QueryEpochInfoResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryEpochInfoResponse.typeUrl || epoch_info_1.EpochInfo.is(o.epochInfo));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryEpochInfoResponse.typeUrl || epoch_info_1.EpochInfo.isSDK(o.epoch_info));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryEpochInfoResponse.typeUrl || epoch_info_1.EpochInfo.isAmino(o.epoch_info));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.epochInfo !== undefined) {
            epoch_info_1.EpochInfo.encode(message.epochInfo, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryEpochInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.epochInfo = epoch_info_1.EpochInfo.decode(reader, reader.uint32());
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
        message.epochInfo = object.epochInfo !== undefined && object.epochInfo !== null ? epoch_info_1.EpochInfo.fromPartial(object.epochInfo) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryEpochInfoResponse();
        if (object.epoch_info !== undefined && object.epoch_info !== null) {
            message.epochInfo = epoch_info_1.EpochInfo.fromAmino(object.epoch_info);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.epoch_info = message.epochInfo ? epoch_info_1.EpochInfo.toAmino(message.epochInfo) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryEpochInfoResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryEpochInfoResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryEpochInfoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.epochs.QueryEpochInfoResponse",
            value: exports.QueryEpochInfoResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryEpochInfoResponse.typeUrl, exports.QueryEpochInfoResponse);
function createBaseQueryAllEpochInfoRequest() {
    return {
        pagination: undefined
    };
}
exports.QueryAllEpochInfoRequest = {
    typeUrl: "/klyraprotocol.epochs.QueryAllEpochInfoRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryAllEpochInfoRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryAllEpochInfoRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryAllEpochInfoRequest.typeUrl;
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
        const message = createBaseQueryAllEpochInfoRequest();
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
        const message = createBaseQueryAllEpochInfoRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllEpochInfoRequest();
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
        return exports.QueryAllEpochInfoRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllEpochInfoRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllEpochInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.epochs.QueryAllEpochInfoRequest",
            value: exports.QueryAllEpochInfoRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllEpochInfoRequest.typeUrl, exports.QueryAllEpochInfoRequest);
function createBaseQueryEpochInfoAllResponse() {
    return {
        epochInfo: [],
        pagination: undefined
    };
}
exports.QueryEpochInfoAllResponse = {
    typeUrl: "/klyraprotocol.epochs.QueryEpochInfoAllResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryEpochInfoAllResponse.typeUrl || Array.isArray(o.epochInfo) && (!o.epochInfo.length || epoch_info_1.EpochInfo.is(o.epochInfo[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryEpochInfoAllResponse.typeUrl || Array.isArray(o.epoch_info) && (!o.epoch_info.length || epoch_info_1.EpochInfo.isSDK(o.epoch_info[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryEpochInfoAllResponse.typeUrl || Array.isArray(o.epoch_info) && (!o.epoch_info.length || epoch_info_1.EpochInfo.isAmino(o.epoch_info[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.epochInfo) {
            epoch_info_1.EpochInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryEpochInfoAllResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.epochInfo.push(epoch_info_1.EpochInfo.decode(reader, reader.uint32()));
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
        const message = createBaseQueryEpochInfoAllResponse();
        message.epochInfo = object.epochInfo?.map(e => epoch_info_1.EpochInfo.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryEpochInfoAllResponse();
        message.epochInfo = object.epoch_info?.map(e => epoch_info_1.EpochInfo.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.epochInfo) {
            obj.epoch_info = message.epochInfo.map(e => e ? epoch_info_1.EpochInfo.toAmino(e) : undefined);
        }
        else {
            obj.epoch_info = message.epochInfo;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryEpochInfoAllResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryEpochInfoAllResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryEpochInfoAllResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.epochs.QueryEpochInfoAllResponse",
            value: exports.QueryEpochInfoAllResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryEpochInfoAllResponse.typeUrl, exports.QueryEpochInfoAllResponse);
