//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../../../binary";
import { GlobalDecoderRegistry } from "../../../../../registry";
import { bytesFromBase64, base64FromBytes } from "../../../../../helpers";
function createBasePairs() {
    return {
        pairs: []
    };
}
export const Pairs = {
    typeUrl: "/cosmos.store.internal.kv.v1beta1.Pairs",
    aminoType: "cosmos-sdk/Pairs",
    is(o) {
        return o && (o.$typeUrl === Pairs.typeUrl || Array.isArray(o.pairs) && (!o.pairs.length || Pair.is(o.pairs[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === Pairs.typeUrl || Array.isArray(o.pairs) && (!o.pairs.length || Pair.isSDK(o.pairs[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === Pairs.typeUrl || Array.isArray(o.pairs) && (!o.pairs.length || Pair.isAmino(o.pairs[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.pairs) {
            Pair.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePairs();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pairs.push(Pair.decode(reader, reader.uint32()));
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
        message.pairs = object.pairs?.map(e => Pair.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBasePairs();
        message.pairs = object.pairs?.map(e => Pair.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.pairs) {
            obj.pairs = message.pairs.map(e => e ? Pair.toAmino(e) : undefined);
        }
        else {
            obj.pairs = message.pairs;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return Pairs.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Pairs",
            value: Pairs.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Pairs.decode(message.value);
    },
    toProto(message) {
        return Pairs.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.internal.kv.v1beta1.Pairs",
            value: Pairs.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Pairs.typeUrl, Pairs);
GlobalDecoderRegistry.registerAminoProtoMapping(Pairs.aminoType, Pairs.typeUrl);
function createBasePair() {
    return {
        key: new Uint8Array(),
        value: new Uint8Array()
    };
}
export const Pair = {
    typeUrl: "/cosmos.store.internal.kv.v1beta1.Pair",
    aminoType: "cosmos-sdk/Pair",
    is(o) {
        return o && (o.$typeUrl === Pair.typeUrl || (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === Pair.typeUrl || (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === Pair.typeUrl || (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
            message.key = bytesFromBase64(object.key);
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = bytesFromBase64(object.value);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.key = message.key ? base64FromBytes(message.key) : undefined;
        obj.value = message.value ? base64FromBytes(message.value) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return Pair.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Pair",
            value: Pair.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Pair.decode(message.value);
    },
    toProto(message) {
        return Pair.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.internal.kv.v1beta1.Pair",
            value: Pair.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Pair.typeUrl, Pair);
GlobalDecoderRegistry.registerAminoProtoMapping(Pair.aminoType, Pair.typeUrl);
