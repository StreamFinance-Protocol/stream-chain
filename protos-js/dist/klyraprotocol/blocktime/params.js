"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DowntimeParams = void 0;
//@ts-nocheck
const duration_1 = require("../../google/protobuf/duration");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseDowntimeParams() {
    return {
        durations: []
    };
}
exports.DowntimeParams = {
    typeUrl: "/klyraprotocol.blocktime.DowntimeParams",
    is(o) {
        return o && (o.$typeUrl === exports.DowntimeParams.typeUrl || Array.isArray(o.durations) && (!o.durations.length || duration_1.Duration.is(o.durations[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.DowntimeParams.typeUrl || Array.isArray(o.durations) && (!o.durations.length || duration_1.Duration.isSDK(o.durations[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.DowntimeParams.typeUrl || Array.isArray(o.durations) && (!o.durations.length || duration_1.Duration.isAmino(o.durations[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.durations) {
            duration_1.Duration.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDowntimeParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.durations.push(duration_1.Duration.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDowntimeParams();
        message.durations = object.durations?.map(e => duration_1.Duration.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseDowntimeParams();
        message.durations = object.durations?.map(e => duration_1.Duration.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.durations) {
            obj.durations = message.durations.map(e => e ? duration_1.Duration.toAmino(e) : undefined);
        }
        else {
            obj.durations = message.durations;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.DowntimeParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.DowntimeParams.decode(message.value);
    },
    toProto(message) {
        return exports.DowntimeParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.DowntimeParams",
            value: exports.DowntimeParams.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.DowntimeParams.typeUrl, exports.DowntimeParams);
