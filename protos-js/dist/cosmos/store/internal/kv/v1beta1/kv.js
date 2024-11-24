"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pair = exports.Pairs = void 0;
//@ts-nocheck
const binary_1 = require("../../../../../binary");
const registry_1 = require("../../../../../registry");
const helpers_1 = require("../../../../../helpers");
function createBasePairs() {
    return {
        pairs: []
    };
}
exports.Pairs = {
    typeUrl: "/cosmos.store.internal.kv.v1beta1.Pairs",
    aminoType: "cosmos-sdk/Pairs",
    is(o) {
        return o && (o.$typeUrl === exports.Pairs.typeUrl || Array.isArray(o.pairs) && (!o.pairs.length || exports.Pair.is(o.pairs[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Pairs.typeUrl || Array.isArray(o.pairs) && (!o.pairs.length || exports.Pair.isSDK(o.pairs[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Pairs.typeUrl || Array.isArray(o.pairs) && (!o.pairs.length || exports.Pair.isAmino(o.pairs[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.pairs) {
            exports.Pair.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePairs();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pairs.push(exports.Pair.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePairs();
        message.pairs = object.pairs?.map(e => exports.Pair.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBasePairs();
        message.pairs = object.pairs?.map(e => exports.Pair.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.pairs) {
            obj.pairs = message.pairs.map(e => e ? exports.Pair.toAmino(e) : undefined);
        }
        else {
            obj.pairs = message.pairs;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Pairs.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Pairs",
            value: exports.Pairs.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.Pairs.decode(message.value);
    },
    toProto(message) {
        return exports.Pairs.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.internal.kv.v1beta1.Pairs",
            value: exports.Pairs.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Pairs.typeUrl, exports.Pairs);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.Pairs.aminoType, exports.Pairs.typeUrl);
function createBasePair() {
    return {
        key: new Uint8Array(),
        value: new Uint8Array()
    };
}
exports.Pair = {
    typeUrl: "/cosmos.store.internal.kv.v1beta1.Pair",
    aminoType: "cosmos-sdk/Pair",
    is(o) {
        return o && (o.$typeUrl === exports.Pair.typeUrl || (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Pair.typeUrl || (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Pair.typeUrl || (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePair();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.value = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePair();
        message.key = object.key ?? new Uint8Array();
        message.value = object.value ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBasePair();
        if (object.key !== undefined && object.key !== null) {
            message.key = (0, helpers_1.bytesFromBase64)(object.key);
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = (0, helpers_1.bytesFromBase64)(object.value);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.key = message.key ? (0, helpers_1.base64FromBytes)(message.key) : undefined;
        obj.value = message.value ? (0, helpers_1.base64FromBytes)(message.value) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Pair.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Pair",
            value: exports.Pair.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.Pair.decode(message.value);
    },
    toProto(message) {
        return exports.Pair.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.internal.kv.v1beta1.Pair",
            value: exports.Pair.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Pair.typeUrl, exports.Pair);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.Pair.aminoType, exports.Pair.typeUrl);
