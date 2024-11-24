"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockMessageIds = void 0;
//@ts-nocheck
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseBlockMessageIds() {
    return {
        ids: []
    };
}
exports.BlockMessageIds = {
    typeUrl: "/klyraprotocol.delaymsg.BlockMessageIds",
    is(o) {
        return o && (o.$typeUrl === exports.BlockMessageIds.typeUrl || Array.isArray(o.ids) && (!o.ids.length || typeof o.ids[0] === "number"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.BlockMessageIds.typeUrl || Array.isArray(o.ids) && (!o.ids.length || typeof o.ids[0] === "number"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.BlockMessageIds.typeUrl || Array.isArray(o.ids) && (!o.ids.length || typeof o.ids[0] === "number"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        writer.uint32(10).fork();
        for (const v of message.ids) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.BlockMessageIds.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.BlockMessageIds.decode(message.value);
    },
    toProto(message) {
        return exports.BlockMessageIds.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.delaymsg.BlockMessageIds",
            value: exports.BlockMessageIds.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.BlockMessageIds.typeUrl, exports.BlockMessageIds);
