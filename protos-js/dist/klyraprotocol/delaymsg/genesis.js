"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = void 0;
//@ts-nocheck
const delayed_message_1 = require("./delayed_message");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseGenesisState() {
    return {
        delayedMessages: [],
        nextDelayedMessageId: 0
    };
}
exports.GenesisState = {
    typeUrl: "/klyraprotocol.delaymsg.GenesisState",
    is(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.delayedMessages) && (!o.delayedMessages.length || delayed_message_1.DelayedMessage.is(o.delayedMessages[0])) && typeof o.nextDelayedMessageId === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.delayed_messages) && (!o.delayed_messages.length || delayed_message_1.DelayedMessage.isSDK(o.delayed_messages[0])) && typeof o.next_delayed_message_id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.delayed_messages) && (!o.delayed_messages.length || delayed_message_1.DelayedMessage.isAmino(o.delayed_messages[0])) && typeof o.next_delayed_message_id === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.delayedMessages) {
            delayed_message_1.DelayedMessage.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.nextDelayedMessageId !== 0) {
            writer.uint32(16).uint32(message.nextDelayedMessageId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delayedMessages.push(delayed_message_1.DelayedMessage.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.nextDelayedMessageId = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.delayedMessages = object.delayedMessages?.map(e => delayed_message_1.DelayedMessage.fromPartial(e)) || [];
        message.nextDelayedMessageId = object.nextDelayedMessageId ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.delayedMessages = object.delayed_messages?.map(e => delayed_message_1.DelayedMessage.fromAmino(e)) || [];
        if (object.next_delayed_message_id !== undefined && object.next_delayed_message_id !== null) {
            message.nextDelayedMessageId = object.next_delayed_message_id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.delayedMessages) {
            obj.delayed_messages = message.delayedMessages.map(e => e ? delayed_message_1.DelayedMessage.toAmino(e) : undefined);
        }
        else {
            obj.delayed_messages = message.delayedMessages;
        }
        obj.next_delayed_message_id = message.nextDelayedMessageId === 0 ? undefined : message.nextDelayedMessageId;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GenesisState.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.GenesisState.decode(message.value);
    },
    toProto(message) {
        return exports.GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.GenesisState",
            value: exports.GenesisState.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GenesisState.typeUrl, exports.GenesisState);
