"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
//@ts-nocheck
const duration_1 = require("../../google/protobuf/duration");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseParams() {
    return {
        windowDuration: duration_1.Duration.fromPartial({})
    };
}
exports.Params = {
    typeUrl: "/klyraprotocol.stats.Params",
    is(o) {
        return o && (o.$typeUrl === exports.Params.typeUrl || duration_1.Duration.is(o.windowDuration));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Params.typeUrl || duration_1.Duration.isSDK(o.window_duration));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Params.typeUrl || duration_1.Duration.isAmino(o.window_duration));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.windowDuration !== undefined) {
            duration_1.Duration.encode(message.windowDuration, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.windowDuration = duration_1.Duration.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.windowDuration = object.windowDuration !== undefined && object.windowDuration !== null ? duration_1.Duration.fromPartial(object.windowDuration) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseParams();
        if (object.window_duration !== undefined && object.window_duration !== null) {
            message.windowDuration = duration_1.Duration.fromAmino(object.window_duration);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.window_duration = message.windowDuration ? duration_1.Duration.toAmino(message.windowDuration) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Params.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Params.decode(message.value);
    },
    toProto(message) {
        return exports.Params.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.Params",
            value: exports.Params.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Params.typeUrl, exports.Params);
