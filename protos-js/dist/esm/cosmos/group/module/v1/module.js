//@ts-nocheck
import { Duration } from "../../../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { GlobalDecoderRegistry } from "../../../../registry";
function createBaseModule() {
    return {
        maxExecutionPeriod: Duration.fromPartial({}),
        maxMetadataLen: BigInt(0)
    };
}
export const Module = {
    typeUrl: "/cosmos.group.module.v1.Module",
    aminoType: "cosmos-sdk/Module",
    is(o) {
        return o && (o.$typeUrl === Module.typeUrl || Duration.is(o.maxExecutionPeriod) && typeof o.maxMetadataLen === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Module.typeUrl || Duration.isSDK(o.max_execution_period) && typeof o.max_metadata_len === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Module.typeUrl || Duration.isAmino(o.max_execution_period) && typeof o.max_metadata_len === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.maxExecutionPeriod !== undefined) {
            Duration.encode(message.maxExecutionPeriod, writer.uint32(10).fork()).ldelim();
        }
        if (message.maxMetadataLen !== BigInt(0)) {
            writer.uint32(16).uint64(message.maxMetadataLen);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModule();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxExecutionPeriod = Duration.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.maxMetadataLen = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseModule();
        message.maxExecutionPeriod = object.maxExecutionPeriod !== undefined && object.maxExecutionPeriod !== null ? Duration.fromPartial(object.maxExecutionPeriod) : undefined;
        message.maxMetadataLen = object.maxMetadataLen !== undefined && object.maxMetadataLen !== null ? BigInt(object.maxMetadataLen.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseModule();
        if (object.max_execution_period !== undefined && object.max_execution_period !== null) {
            message.maxExecutionPeriod = Duration.fromAmino(object.max_execution_period);
        }
        if (object.max_metadata_len !== undefined && object.max_metadata_len !== null) {
            message.maxMetadataLen = BigInt(object.max_metadata_len);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.max_execution_period = message.maxExecutionPeriod ? Duration.toAmino(message.maxExecutionPeriod) : Duration.toAmino(Duration.fromPartial({}));
        obj.max_metadata_len = message.maxMetadataLen !== BigInt(0) ? message.maxMetadataLen?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return Module.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Module",
            value: Module.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Module.decode(message.value);
    },
    toProto(message) {
        return Module.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.group.module.v1.Module",
            value: Module.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Module.typeUrl, Module);
GlobalDecoderRegistry.registerAminoProtoMapping(Module.aminoType, Module.typeUrl);
