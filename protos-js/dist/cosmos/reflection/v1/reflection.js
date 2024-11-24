"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDescriptorsResponse = exports.FileDescriptorsRequest = void 0;
//@ts-nocheck
const descriptor_1 = require("../../../google/protobuf/descriptor");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
function createBaseFileDescriptorsRequest() {
    return {};
}
exports.FileDescriptorsRequest = {
    typeUrl: "/cosmos.reflection.v1.FileDescriptorsRequest",
    aminoType: "cosmos-sdk/FileDescriptorsRequest",
    is(o) {
        return o && o.$typeUrl === exports.FileDescriptorsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.FileDescriptorsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.FileDescriptorsRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFileDescriptorsRequest();
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
        const message = createBaseFileDescriptorsRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseFileDescriptorsRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.FileDescriptorsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/FileDescriptorsRequest",
            value: exports.FileDescriptorsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.FileDescriptorsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.FileDescriptorsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.reflection.v1.FileDescriptorsRequest",
            value: exports.FileDescriptorsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.FileDescriptorsRequest.typeUrl, exports.FileDescriptorsRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.FileDescriptorsRequest.aminoType, exports.FileDescriptorsRequest.typeUrl);
function createBaseFileDescriptorsResponse() {
    return {
        files: []
    };
}
exports.FileDescriptorsResponse = {
    typeUrl: "/cosmos.reflection.v1.FileDescriptorsResponse",
    aminoType: "cosmos-sdk/FileDescriptorsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.FileDescriptorsResponse.typeUrl || Array.isArray(o.files) && (!o.files.length || descriptor_1.FileDescriptorProto.is(o.files[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.FileDescriptorsResponse.typeUrl || Array.isArray(o.files) && (!o.files.length || descriptor_1.FileDescriptorProto.isSDK(o.files[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.FileDescriptorsResponse.typeUrl || Array.isArray(o.files) && (!o.files.length || descriptor_1.FileDescriptorProto.isAmino(o.files[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.files) {
            descriptor_1.FileDescriptorProto.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFileDescriptorsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.files.push(descriptor_1.FileDescriptorProto.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseFileDescriptorsResponse();
        message.files = object.files?.map(e => descriptor_1.FileDescriptorProto.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseFileDescriptorsResponse();
        message.files = object.files?.map(e => descriptor_1.FileDescriptorProto.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.files) {
            obj.files = message.files.map(e => e ? descriptor_1.FileDescriptorProto.toAmino(e) : undefined);
        }
        else {
            obj.files = message.files;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.FileDescriptorsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/FileDescriptorsResponse",
            value: exports.FileDescriptorsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.FileDescriptorsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.FileDescriptorsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.reflection.v1.FileDescriptorsResponse",
            value: exports.FileDescriptorsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.FileDescriptorsResponse.typeUrl, exports.FileDescriptorsResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.FileDescriptorsResponse.aminoType, exports.FileDescriptorsResponse.typeUrl);
