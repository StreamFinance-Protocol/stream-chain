"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
//@ts-nocheck
const binary_1 = require("../../../../binary");
const registry_1 = require("../../../../registry");
function createBaseConfig() {
    return {
        skipAnteHandler: false,
        skipPostHandler: false
    };
}
exports.Config = {
    typeUrl: "/cosmos.tx.config.v1.Config",
    aminoType: "cosmos-sdk/Config",
    is(o) {
        return o && (o.$typeUrl === exports.Config.typeUrl || typeof o.skipAnteHandler === "boolean" && typeof o.skipPostHandler === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Config.typeUrl || typeof o.skip_ante_handler === "boolean" && typeof o.skip_post_handler === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Config.typeUrl || typeof o.skip_ante_handler === "boolean" && typeof o.skip_post_handler === "boolean");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.skipAnteHandler === true) {
            writer.uint32(8).bool(message.skipAnteHandler);
        }
        if (message.skipPostHandler === true) {
            writer.uint32(16).bool(message.skipPostHandler);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConfig();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.skipAnteHandler = reader.bool();
                    break;
                case 2:
                    message.skipPostHandler = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseConfig();
        message.skipAnteHandler = object.skipAnteHandler ?? false;
        message.skipPostHandler = object.skipPostHandler ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseConfig();
        if (object.skip_ante_handler !== undefined && object.skip_ante_handler !== null) {
            message.skipAnteHandler = object.skip_ante_handler;
        }
        if (object.skip_post_handler !== undefined && object.skip_post_handler !== null) {
            message.skipPostHandler = object.skip_post_handler;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.skip_ante_handler = message.skipAnteHandler === false ? undefined : message.skipAnteHandler;
        obj.skip_post_handler = message.skipPostHandler === false ? undefined : message.skipPostHandler;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Config.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Config",
            value: exports.Config.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.Config.decode(message.value);
    },
    toProto(message) {
        return exports.Config.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.config.v1.Config",
            value: exports.Config.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Config.typeUrl, exports.Config);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.Config.aminoType, exports.Config.typeUrl);
