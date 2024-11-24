"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayedMessage = void 0;
//@ts-nocheck
const any_1 = require("../../google/protobuf/any");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseDelayedMessage() {
    return {
        id: 0,
        msg: undefined,
        blockHeight: 0
    };
}
exports.DelayedMessage = {
    typeUrl: "/klyraprotocol.delaymsg.DelayedMessage",
    is(o) {
        return o && (o.$typeUrl === exports.DelayedMessage.typeUrl || typeof o.id === "number" && typeof o.blockHeight === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.DelayedMessage.typeUrl || typeof o.id === "number" && typeof o.block_height === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.DelayedMessage.typeUrl || typeof o.id === "number" && typeof o.block_height === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.msg !== undefined) {
            any_1.Any.encode(message.msg, writer.uint32(18).fork()).ldelim();
        }
        if (message.blockHeight !== 0) {
            writer.uint32(24).uint32(message.blockHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDelayedMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.msg = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.blockHeight = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDelayedMessage();
        message.id = object.id ?? 0;
        message.msg = object.msg !== undefined && object.msg !== null ? any_1.Any.fromPartial(object.msg) : undefined;
        message.blockHeight = object.blockHeight ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseDelayedMessage();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.msg !== undefined && object.msg !== null) {
            message.msg = any_1.Any.fromAmino(object.msg);
        }
        if (object.block_height !== undefined && object.block_height !== null) {
            message.blockHeight = object.block_height;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.msg = message.msg ? any_1.Any.toAmino(message.msg) : undefined;
        obj.block_height = message.blockHeight === 0 ? undefined : message.blockHeight;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.DelayedMessage.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.DelayedMessage.decode(message.value);
    },
    toProto(message) {
        return exports.DelayedMessage.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.DelayedMessage",
            value: exports.DelayedMessage.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.DelayedMessage.typeUrl, exports.DelayedMessage);
