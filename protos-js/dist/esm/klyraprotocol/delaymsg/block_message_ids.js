//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseBlockMessageIds() {
    return {
        ids: []
    };
}
export const BlockMessageIds = {
    typeUrl: "/klyraprotocol.delaymsg.BlockMessageIds",
    is(o) {
        return o && (o.$typeUrl === BlockMessageIds.typeUrl || Array.isArray(o.ids) && (!o.ids.length || typeof o.ids[0] === "number"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === BlockMessageIds.typeUrl || Array.isArray(o.ids) && (!o.ids.length || typeof o.ids[0] === "number"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === BlockMessageIds.typeUrl || Array.isArray(o.ids) && (!o.ids.length || typeof o.ids[0] === "number"));
    },
    encode(message, writer = BinaryWriter.create()) {
        writer.uint32(10).fork();
        for (const v of message.ids) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockMessageIds();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.ids.push(reader.uint32());
                        }
                    }
                    else {
                        message.ids.push(reader.uint32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseBlockMessageIds();
        message.ids = object.ids?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseBlockMessageIds();
        message.ids = object.ids?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.ids) {
            obj.ids = message.ids.map(e => e);
        }
        else {
            obj.ids = message.ids;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return BlockMessageIds.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return BlockMessageIds.decode(message.value);
    },
    toProto(message) {
        return BlockMessageIds.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.BlockMessageIds",
            value: BlockMessageIds.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(BlockMessageIds.typeUrl, BlockMessageIds);
