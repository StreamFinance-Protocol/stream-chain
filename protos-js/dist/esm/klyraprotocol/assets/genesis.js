//@ts-nocheck
import { Asset } from "./asset";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseGenesisState() {
    return {
        assets: []
    };
}
export const GenesisState = {
    typeUrl: "/klyraprotocol.assets.GenesisState",
    is(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.assets) && (!o.assets.length || Asset.is(o.assets[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.assets) && (!o.assets.length || Asset.isSDK(o.assets[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.assets) && (!o.assets.length || Asset.isAmino(o.assets[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.assets) {
            Asset.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.assets.push(Asset.decode(reader, reader.uint32()));
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
        message.assets = object.assets?.map(e => Asset.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.assets = object.assets?.map(e => Asset.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.assets) {
            obj.assets = message.assets.map(e => e ? Asset.toAmino(e) : undefined);
        }
        else {
            obj.assets = message.assets;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return GenesisState.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return GenesisState.decode(message.value);
    },
    toProto(message) {
        return GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.assets.GenesisState",
            value: GenesisState.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);
