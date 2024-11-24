//@ts-nocheck
import { PerpetualFeeParams } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseGenesisState() {
    return {
        params: PerpetualFeeParams.fromPartial({})
    };
}
export const GenesisState = {
    typeUrl: "/klyraprotocol.feetiers.GenesisState",
    is(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || PerpetualFeeParams.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || PerpetualFeeParams.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || PerpetualFeeParams.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.params !== undefined) {
            PerpetualFeeParams.encode(message.params, writer.uint32(10).fork()).ldelim();
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
                    message.params = PerpetualFeeParams.decode(reader, reader.uint32());
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
        message.params = object.params !== undefined && object.params !== null ? PerpetualFeeParams.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        if (object.params !== undefined && object.params !== null) {
            message.params = PerpetualFeeParams.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? PerpetualFeeParams.toAmino(message.params) : undefined;
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
            typeUrl: "/klyraprotocol.feetiers.GenesisState",
            value: GenesisState.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);
