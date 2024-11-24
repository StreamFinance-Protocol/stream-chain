//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBasePendingSendPacket() {
    return {
        channelId: "",
        sequence: BigInt(0)
    };
}
export const PendingSendPacket = {
    typeUrl: "/klyraprotocol.ratelimit.PendingSendPacket",
    is(o) {
        return o && (o.$typeUrl === PendingSendPacket.typeUrl || typeof o.channelId === "string" && typeof o.sequence === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === PendingSendPacket.typeUrl || typeof o.channel_id === "string" && typeof o.sequence === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === PendingSendPacket.typeUrl || typeof o.channel_id === "string" && typeof o.sequence === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.channelId !== "") {
            writer.uint32(10).string(message.channelId);
        }
        if (message.sequence !== BigInt(0)) {
            writer.uint32(16).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePendingSendPacket();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.channelId = reader.string();
                    break;
                case 2:
                    message.sequence = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePendingSendPacket();
        message.channelId = object.channelId ?? "";
        message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBasePendingSendPacket();
        if (object.channel_id !== undefined && object.channel_id !== null) {
            message.channelId = object.channel_id;
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = BigInt(object.sequence);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.channel_id = message.channelId === "" ? undefined : message.channelId;
        obj.sequence = message.sequence !== BigInt(0) ? message.sequence?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return PendingSendPacket.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return PendingSendPacket.decode(message.value);
    },
    toProto(message) {
        return PendingSendPacket.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.PendingSendPacket",
            value: PendingSendPacket.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(PendingSendPacket.typeUrl, PendingSendPacket);
