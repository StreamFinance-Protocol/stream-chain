//@ts-nocheck
import { Any } from "../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseMsgDelayMessage() {
    return {
        authority: "",
        msg: undefined,
        delayBlocks: 0
    };
}
export const MsgDelayMessage = {
    typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessage",
    is(o) {
        return o && (o.$typeUrl === MsgDelayMessage.typeUrl || typeof o.authority === "string" && typeof o.delayBlocks === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgDelayMessage.typeUrl || typeof o.authority === "string" && typeof o.delay_blocks === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgDelayMessage.typeUrl || typeof o.authority === "string" && typeof o.delay_blocks === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.msg !== undefined) {
            Any.encode(message.msg, writer.uint32(18).fork()).ldelim();
        }
        if (message.delayBlocks !== 0) {
            writer.uint32(24).uint32(message.delayBlocks);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDelayMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.msg = Any.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.delayBlocks = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgDelayMessage();
        message.authority = object.authority ?? "";
        message.msg = object.msg !== undefined && object.msg !== null ? Any.fromPartial(object.msg) : undefined;
        message.delayBlocks = object.delayBlocks ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgDelayMessage();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.msg !== undefined && object.msg !== null) {
            message.msg = Any.fromAmino(object.msg);
        }
        if (object.delay_blocks !== undefined && object.delay_blocks !== null) {
            message.delayBlocks = object.delay_blocks;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.msg = message.msg ? Any.toAmino(message.msg) : undefined;
        obj.delay_blocks = message.delayBlocks === 0 ? undefined : message.delayBlocks;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgDelayMessage.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgDelayMessage.decode(message.value);
    },
    toProto(message) {
        return MsgDelayMessage.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessage",
            value: MsgDelayMessage.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDelayMessage.typeUrl, MsgDelayMessage);
function createBaseMsgDelayMessageResponse() {
    return {
        id: BigInt(0)
    };
}
export const MsgDelayMessageResponse = {
    typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessageResponse",
    is(o) {
        return o && (o.$typeUrl === MsgDelayMessageResponse.typeUrl || typeof o.id === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgDelayMessageResponse.typeUrl || typeof o.id === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgDelayMessageResponse.typeUrl || typeof o.id === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== BigInt(0)) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDelayMessageResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgDelayMessageResponse();
        message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgDelayMessageResponse();
        if (object.id !== undefined && object.id !== null) {
            message.id = BigInt(object.id);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id !== BigInt(0) ? message.id?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgDelayMessageResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgDelayMessageResponse.decode(message.value);
    },
    toProto(message) {
        return MsgDelayMessageResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessageResponse",
            value: MsgDelayMessageResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDelayMessageResponse.typeUrl, MsgDelayMessageResponse);
