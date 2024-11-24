"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
//@ts-nocheck
const duration_1 = require("../../../../google/protobuf/duration");
const binary_1 = require("../../../../binary");
const registry_1 = require("../../../../registry");
function createBaseModule() {
    return {
        maxExecutionPeriod: duration_1.Duration.fromPartial({}),
        maxMetadataLen: BigInt(0)
    };
}
exports.Module = {
    typeUrl: "/cosmos.group.module.v1.Module",
    aminoType: "cosmos-sdk/Module",
    is(o) {
        return o && (o.$typeUrl === exports.Module.typeUrl || duration_1.Duration.is(o.maxExecutionPeriod) && typeof o.maxMetadataLen === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Module.typeUrl || duration_1.Duration.isSDK(o.max_execution_period) && typeof o.max_metadata_len === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Module.typeUrl || duration_1.Duration.isAmino(o.max_execution_period) && typeof o.max_metadata_len === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.maxExecutionPeriod !== undefined) {
            duration_1.Duration.encode(message.maxExecutionPeriod, writer.uint32(10).fork()).ldelim();
        }
        if (message.maxMetadataLen !== BigInt(0)) {
            writer.uint32(16).uint64(message.maxMetadataLen);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModule();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxExecutionPeriod = duration_1.Duration.decode(reader, reader.uint32());
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
        message.maxExecutionPeriod = object.maxExecutionPeriod !== undefined && object.maxExecutionPeriod !== null ? duration_1.Duration.fromPartial(object.maxExecutionPeriod) : undefined;
        message.maxMetadataLen = object.maxMetadataLen !== undefined && object.maxMetadataLen !== null ? BigInt(object.maxMetadataLen.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseModule();
        if (object.max_execution_period !== undefined && object.max_execution_period !== null) {
            message.maxExecutionPeriod = duration_1.Duration.fromAmino(object.max_execution_period);
        }
        if (object.max_metadata_len !== undefined && object.max_metadata_len !== null) {
            message.maxMetadataLen = BigInt(object.max_metadata_len);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.max_execution_period = message.maxExecutionPeriod ? duration_1.Duration.toAmino(message.maxExecutionPeriod) : duration_1.Duration.toAmino(duration_1.Duration.fromPartial({}));
        obj.max_metadata_len = message.maxMetadataLen !== BigInt(0) ? message.maxMetadataLen?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Module.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Module",
            value: exports.Module.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.Module.decode(message.value);
    },
    toProto(message) {
        return exports.Module.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.group.module.v1.Module",
            value: exports.Module.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Module.typeUrl, exports.Module);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.Module.aminoType, exports.Module.typeUrl);
