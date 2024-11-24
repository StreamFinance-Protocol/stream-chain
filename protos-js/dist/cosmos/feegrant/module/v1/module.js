"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
//@ts-nocheck
const binary_1 = require("../../../../binary");
const registry_1 = require("../../../../registry");
function createBaseModule() {
    return {};
}
exports.Module = {
    typeUrl: "/cosmos.feegrant.module.v1.Module",
    aminoType: "cosmos-sdk/Module",
    is(o) {
        return o && o.$typeUrl === exports.Module.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.Module.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.Module.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModule();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseModule();
        return message;
    },
    fromAmino(_) {
        const message = createBaseModule();
        return message;
    },
    toAmino(_) {
        const obj = {};
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
            typeUrl: "/cosmos.feegrant.module.v1.Module",
            value: exports.Module.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Module.typeUrl, exports.Module);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.Module.aminoType, exports.Module.typeUrl);
