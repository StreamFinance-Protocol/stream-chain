//@ts-nocheck
import { FileDescriptorProto } from "../../../google/protobuf/descriptor";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
function createBaseFileDescriptorsRequest() {
    return {};
}
export const FileDescriptorsRequest = {
    typeUrl: "/cosmos.reflection.v1.FileDescriptorsRequest",
    aminoType: "cosmos-sdk/FileDescriptorsRequest",
    is(o) {
        return o && o.$typeUrl === FileDescriptorsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === FileDescriptorsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === FileDescriptorsRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return FileDescriptorsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/FileDescriptorsRequest",
            value: FileDescriptorsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return FileDescriptorsRequest.decode(message.value);
    },
    toProto(message) {
        return FileDescriptorsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.reflection.v1.FileDescriptorsRequest",
            value: FileDescriptorsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(FileDescriptorsRequest.typeUrl, FileDescriptorsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(FileDescriptorsRequest.aminoType, FileDescriptorsRequest.typeUrl);
function createBaseFileDescriptorsResponse() {
    return {
        files: []
    };
}
export const FileDescriptorsResponse = {
    typeUrl: "/cosmos.reflection.v1.FileDescriptorsResponse",
    aminoType: "cosmos-sdk/FileDescriptorsResponse",
    is(o) {
        return o && (o.$typeUrl === FileDescriptorsResponse.typeUrl || Array.isArray(o.files) && (!o.files.length || FileDescriptorProto.is(o.files[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === FileDescriptorsResponse.typeUrl || Array.isArray(o.files) && (!o.files.length || FileDescriptorProto.isSDK(o.files[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === FileDescriptorsResponse.typeUrl || Array.isArray(o.files) && (!o.files.length || FileDescriptorProto.isAmino(o.files[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.files) {
            FileDescriptorProto.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFileDescriptorsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.files.push(FileDescriptorProto.decode(reader, reader.uint32()));
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
        message.files = object.files?.map(e => FileDescriptorProto.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseFileDescriptorsResponse();
        message.files = object.files?.map(e => FileDescriptorProto.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.files) {
            obj.files = message.files.map(e => e ? FileDescriptorProto.toAmino(e) : undefined);
        }
        else {
            obj.files = message.files;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return FileDescriptorsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/FileDescriptorsResponse",
            value: FileDescriptorsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return FileDescriptorsResponse.decode(message.value);
    },
    toProto(message) {
        return FileDescriptorsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.reflection.v1.FileDescriptorsResponse",
            value: FileDescriptorsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(FileDescriptorsResponse.typeUrl, FileDescriptorsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(FileDescriptorsResponse.aminoType, FileDescriptorsResponse.typeUrl);
