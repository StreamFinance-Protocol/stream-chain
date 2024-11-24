"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexValue = exports.ListResponse = exports.ListRequest_Range = exports.ListRequest_Prefix = exports.ListRequest = exports.GetResponse = exports.GetRequest = void 0;
//@ts-nocheck
const pagination_1 = require("../../../base/query/v1beta1/pagination");
const any_1 = require("../../../../google/protobuf/any");
const timestamp_1 = require("../../../../google/protobuf/timestamp");
const duration_1 = require("../../../../google/protobuf/duration");
const binary_1 = require("../../../../binary");
const registry_1 = require("../../../../registry");
const helpers_1 = require("../../../../helpers");
function createBaseGetRequest() {
    return {
        messageName: "",
        index: "",
        values: []
    };
}
exports.GetRequest = {
    typeUrl: "/cosmos.orm.query.v1alpha1.GetRequest",
    aminoType: "cosmos-sdk/GetRequest",
    is(o) {
        return o && (o.$typeUrl === exports.GetRequest.typeUrl || typeof o.messageName === "string" && typeof o.index === "string" && Array.isArray(o.values) && (!o.values.length || exports.IndexValue.is(o.values[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GetRequest.typeUrl || typeof o.message_name === "string" && typeof o.index === "string" && Array.isArray(o.values) && (!o.values.length || exports.IndexValue.isSDK(o.values[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GetRequest.typeUrl || typeof o.message_name === "string" && typeof o.index === "string" && Array.isArray(o.values) && (!o.values.length || exports.IndexValue.isAmino(o.values[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.messageName !== "") {
            writer.uint32(10).string(message.messageName);
        }
        if (message.index !== "") {
            writer.uint32(18).string(message.index);
        }
        for (const v of message.values) {
            exports.IndexValue.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messageName = reader.string();
                    break;
                case 2:
                    message.index = reader.string();
                    break;
                case 3:
                    message.values.push(exports.IndexValue.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetRequest();
        message.messageName = object.messageName ?? "";
        message.index = object.index ?? "";
        message.values = object.values?.map(e => exports.IndexValue.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetRequest();
        if (object.message_name !== undefined && object.message_name !== null) {
            message.messageName = object.message_name;
        }
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        message.values = object.values?.map(e => exports.IndexValue.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.message_name = message.messageName === "" ? undefined : message.messageName;
        obj.index = message.index === "" ? undefined : message.index;
        if (message.values) {
            obj.values = message.values.map(e => e ? exports.IndexValue.toAmino(e) : undefined);
        }
        else {
            obj.values = message.values;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetRequest",
            value: exports.GetRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GetRequest.decode(message.value);
    },
    toProto(message) {
        return exports.GetRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.orm.query.v1alpha1.GetRequest",
            value: exports.GetRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetRequest.typeUrl, exports.GetRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GetRequest.aminoType, exports.GetRequest.typeUrl);
function createBaseGetResponse() {
    return {
        result: undefined
    };
}
exports.GetResponse = {
    typeUrl: "/cosmos.orm.query.v1alpha1.GetResponse",
    aminoType: "cosmos-sdk/GetResponse",
    is(o) {
        return o && o.$typeUrl === exports.GetResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.GetResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.GetResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.result !== undefined) {
            any_1.Any.encode(message.result, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.result = any_1.Any.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetResponse();
        message.result = object.result !== undefined && object.result !== null ? any_1.Any.fromPartial(object.result) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetResponse();
        if (object.result !== undefined && object.result !== null) {
            message.result = any_1.Any.fromAmino(object.result);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.result = message.result ? any_1.Any.toAmino(message.result) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetResponse",
            value: exports.GetResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GetResponse.decode(message.value);
    },
    toProto(message) {
        return exports.GetResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.orm.query.v1alpha1.GetResponse",
            value: exports.GetResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetResponse.typeUrl, exports.GetResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GetResponse.aminoType, exports.GetResponse.typeUrl);
function createBaseListRequest() {
    return {
        messageName: "",
        index: "",
        prefix: undefined,
        range: undefined,
        pagination: undefined
    };
}
exports.ListRequest = {
    typeUrl: "/cosmos.orm.query.v1alpha1.ListRequest",
    aminoType: "cosmos-sdk/ListRequest",
    is(o) {
        return o && (o.$typeUrl === exports.ListRequest.typeUrl || typeof o.messageName === "string" && typeof o.index === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ListRequest.typeUrl || typeof o.message_name === "string" && typeof o.index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ListRequest.typeUrl || typeof o.message_name === "string" && typeof o.index === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.messageName !== "") {
            writer.uint32(10).string(message.messageName);
        }
        if (message.index !== "") {
            writer.uint32(18).string(message.index);
        }
        if (message.prefix !== undefined) {
            exports.ListRequest_Prefix.encode(message.prefix, writer.uint32(26).fork()).ldelim();
        }
        if (message.range !== undefined) {
            exports.ListRequest_Range.encode(message.range, writer.uint32(34).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messageName = reader.string();
                    break;
                case 2:
                    message.index = reader.string();
                    break;
                case 3:
                    message.prefix = exports.ListRequest_Prefix.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.range = exports.ListRequest_Range.decode(reader, reader.uint32());
                    break;
                case 5:
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
        const message = createBaseListRequest();
        message.messageName = object.messageName ?? "";
        message.index = object.index ?? "";
        message.prefix = object.prefix !== undefined && object.prefix !== null ? exports.ListRequest_Prefix.fromPartial(object.prefix) : undefined;
        message.range = object.range !== undefined && object.range !== null ? exports.ListRequest_Range.fromPartial(object.range) : undefined;
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseListRequest();
        if (object.message_name !== undefined && object.message_name !== null) {
            message.messageName = object.message_name;
        }
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        if (object.prefix !== undefined && object.prefix !== null) {
            message.prefix = exports.ListRequest_Prefix.fromAmino(object.prefix);
        }
        if (object.range !== undefined && object.range !== null) {
            message.range = exports.ListRequest_Range.fromAmino(object.range);
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.message_name = message.messageName === "" ? undefined : message.messageName;
        obj.index = message.index === "" ? undefined : message.index;
        obj.prefix = message.prefix ? exports.ListRequest_Prefix.toAmino(message.prefix) : undefined;
        obj.range = message.range ? exports.ListRequest_Range.toAmino(message.range) : undefined;
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ListRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ListRequest",
            value: exports.ListRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.ListRequest.decode(message.value);
    },
    toProto(message) {
        return exports.ListRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.orm.query.v1alpha1.ListRequest",
            value: exports.ListRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ListRequest.typeUrl, exports.ListRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.ListRequest.aminoType, exports.ListRequest.typeUrl);
function createBaseListRequest_Prefix() {
    return {
        values: []
    };
}
exports.ListRequest_Prefix = {
    typeUrl: "/cosmos.orm.query.v1alpha1.Prefix",
    aminoType: "cosmos-sdk/Prefix",
    is(o) {
        return o && (o.$typeUrl === exports.ListRequest_Prefix.typeUrl || Array.isArray(o.values) && (!o.values.length || exports.IndexValue.is(o.values[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ListRequest_Prefix.typeUrl || Array.isArray(o.values) && (!o.values.length || exports.IndexValue.isSDK(o.values[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ListRequest_Prefix.typeUrl || Array.isArray(o.values) && (!o.values.length || exports.IndexValue.isAmino(o.values[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.values) {
            exports.IndexValue.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListRequest_Prefix();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.values.push(exports.IndexValue.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseListRequest_Prefix();
        message.values = object.values?.map(e => exports.IndexValue.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseListRequest_Prefix();
        message.values = object.values?.map(e => exports.IndexValue.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.values) {
            obj.values = message.values.map(e => e ? exports.IndexValue.toAmino(e) : undefined);
        }
        else {
            obj.values = message.values;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ListRequest_Prefix.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Prefix",
            value: exports.ListRequest_Prefix.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.ListRequest_Prefix.decode(message.value);
    },
    toProto(message) {
        return exports.ListRequest_Prefix.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.orm.query.v1alpha1.Prefix",
            value: exports.ListRequest_Prefix.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ListRequest_Prefix.typeUrl, exports.ListRequest_Prefix);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.ListRequest_Prefix.aminoType, exports.ListRequest_Prefix.typeUrl);
function createBaseListRequest_Range() {
    return {
        start: [],
        end: []
    };
}
exports.ListRequest_Range = {
    typeUrl: "/cosmos.orm.query.v1alpha1.Range",
    aminoType: "cosmos-sdk/Range",
    is(o) {
        return o && (o.$typeUrl === exports.ListRequest_Range.typeUrl || Array.isArray(o.start) && (!o.start.length || exports.IndexValue.is(o.start[0])) && Array.isArray(o.end) && (!o.end.length || exports.IndexValue.is(o.end[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ListRequest_Range.typeUrl || Array.isArray(o.start) && (!o.start.length || exports.IndexValue.isSDK(o.start[0])) && Array.isArray(o.end) && (!o.end.length || exports.IndexValue.isSDK(o.end[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ListRequest_Range.typeUrl || Array.isArray(o.start) && (!o.start.length || exports.IndexValue.isAmino(o.start[0])) && Array.isArray(o.end) && (!o.end.length || exports.IndexValue.isAmino(o.end[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.start) {
            exports.IndexValue.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.end) {
            exports.IndexValue.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListRequest_Range();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.start.push(exports.IndexValue.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.end.push(exports.IndexValue.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseListRequest_Range();
        message.start = object.start?.map(e => exports.IndexValue.fromPartial(e)) || [];
        message.end = object.end?.map(e => exports.IndexValue.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseListRequest_Range();
        message.start = object.start?.map(e => exports.IndexValue.fromAmino(e)) || [];
        message.end = object.end?.map(e => exports.IndexValue.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.start) {
            obj.start = message.start.map(e => e ? exports.IndexValue.toAmino(e) : undefined);
        }
        else {
            obj.start = message.start;
        }
        if (message.end) {
            obj.end = message.end.map(e => e ? exports.IndexValue.toAmino(e) : undefined);
        }
        else {
            obj.end = message.end;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ListRequest_Range.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Range",
            value: exports.ListRequest_Range.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.ListRequest_Range.decode(message.value);
    },
    toProto(message) {
        return exports.ListRequest_Range.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.orm.query.v1alpha1.Range",
            value: exports.ListRequest_Range.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ListRequest_Range.typeUrl, exports.ListRequest_Range);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.ListRequest_Range.aminoType, exports.ListRequest_Range.typeUrl);
function createBaseListResponse() {
    return {
        results: [],
        pagination: undefined
    };
}
exports.ListResponse = {
    typeUrl: "/cosmos.orm.query.v1alpha1.ListResponse",
    aminoType: "cosmos-sdk/ListResponse",
    is(o) {
        return o && (o.$typeUrl === exports.ListResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || any_1.Any.is(o.results[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ListResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || any_1.Any.isSDK(o.results[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ListResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || any_1.Any.isAmino(o.results[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.results) {
            any_1.Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.results.push(any_1.Any.decode(reader, reader.uint32()));
                    break;
                case 5:
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
        const message = createBaseListResponse();
        message.results = object.results?.map(e => any_1.Any.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseListResponse();
        message.results = object.results?.map(e => any_1.Any.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.results) {
            obj.results = message.results.map(e => e ? any_1.Any.toAmino(e) : undefined);
        }
        else {
            obj.results = message.results;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ListResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ListResponse",
            value: exports.ListResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.ListResponse.decode(message.value);
    },
    toProto(message) {
        return exports.ListResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.orm.query.v1alpha1.ListResponse",
            value: exports.ListResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ListResponse.typeUrl, exports.ListResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.ListResponse.aminoType, exports.ListResponse.typeUrl);
function createBaseIndexValue() {
    return {
        uint: undefined,
        int: undefined,
        str: undefined,
        bytes: undefined,
        enum: undefined,
        bool: undefined,
        timestamp: undefined,
        duration: undefined
    };
}
exports.IndexValue = {
    typeUrl: "/cosmos.orm.query.v1alpha1.IndexValue",
    aminoType: "cosmos-sdk/IndexValue",
    is(o) {
        return o && o.$typeUrl === exports.IndexValue.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.IndexValue.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.IndexValue.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.uint !== undefined) {
            writer.uint32(8).uint64(message.uint);
        }
        if (message.int !== undefined) {
            writer.uint32(16).int64(message.int);
        }
        if (message.str !== undefined) {
            writer.uint32(26).string(message.str);
        }
        if (message.bytes !== undefined) {
            writer.uint32(34).bytes(message.bytes);
        }
        if (message.enum !== undefined) {
            writer.uint32(42).string(message.enum);
        }
        if (message.bool !== undefined) {
            writer.uint32(48).bool(message.bool);
        }
        if (message.timestamp !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.timestamp), writer.uint32(58).fork()).ldelim();
        }
        if (message.duration !== undefined) {
            duration_1.Duration.encode(message.duration, writer.uint32(66).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIndexValue();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.uint = reader.uint64();
                    break;
                case 2:
                    message.int = reader.int64();
                    break;
                case 3:
                    message.str = reader.string();
                    break;
                case 4:
                    message.bytes = reader.bytes();
                    break;
                case 5:
                    message.enum = reader.string();
                    break;
                case 6:
                    message.bool = reader.bool();
                    break;
                case 7:
                    message.timestamp = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.duration = duration_1.Duration.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseIndexValue();
        message.uint = object.uint !== undefined && object.uint !== null ? BigInt(object.uint.toString()) : undefined;
        message.int = object.int !== undefined && object.int !== null ? BigInt(object.int.toString()) : undefined;
        message.str = object.str ?? undefined;
        message.bytes = object.bytes ?? undefined;
        message.enum = object.enum ?? undefined;
        message.bool = object.bool ?? undefined;
        message.timestamp = object.timestamp ?? undefined;
        message.duration = object.duration !== undefined && object.duration !== null ? duration_1.Duration.fromPartial(object.duration) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseIndexValue();
        if (object.uint !== undefined && object.uint !== null) {
            message.uint = BigInt(object.uint);
        }
        if (object.int !== undefined && object.int !== null) {
            message.int = BigInt(object.int);
        }
        if (object.str !== undefined && object.str !== null) {
            message.str = object.str;
        }
        if (object.bytes !== undefined && object.bytes !== null) {
            message.bytes = (0, helpers_1.bytesFromBase64)(object.bytes);
        }
        if (object.enum !== undefined && object.enum !== null) {
            message.enum = object.enum;
        }
        if (object.bool !== undefined && object.bool !== null) {
            message.bool = object.bool;
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.timestamp));
        }
        if (object.duration !== undefined && object.duration !== null) {
            message.duration = duration_1.Duration.fromAmino(object.duration);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.uint = message.uint !== BigInt(0) ? message.uint?.toString() : undefined;
        obj.int = message.int !== BigInt(0) ? message.int?.toString() : undefined;
        obj.str = message.str === null ? undefined : message.str;
        obj.bytes = message.bytes ? (0, helpers_1.base64FromBytes)(message.bytes) : undefined;
        obj.enum = message.enum === null ? undefined : message.enum;
        obj.bool = message.bool === null ? undefined : message.bool;
        obj.timestamp = message.timestamp ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.timestamp)) : undefined;
        obj.duration = message.duration ? duration_1.Duration.toAmino(message.duration) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.IndexValue.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/IndexValue",
            value: exports.IndexValue.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.IndexValue.decode(message.value);
    },
    toProto(message) {
        return exports.IndexValue.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.orm.query.v1alpha1.IndexValue",
            value: exports.IndexValue.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.IndexValue.typeUrl, exports.IndexValue);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.IndexValue.aminoType, exports.IndexValue.typeUrl);
