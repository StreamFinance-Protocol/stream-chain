//@ts-nocheck
import { Subaccount } from "./subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseGenesisState() {
    return {
        subaccounts: []
    };
}
export const GenesisState = {
    typeUrl: "/klyraprotocol.subaccounts.GenesisState",
    is(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.subaccounts) && (!o.subaccounts.length || Subaccount.is(o.subaccounts[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.subaccounts) && (!o.subaccounts.length || Subaccount.isSDK(o.subaccounts[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.subaccounts) && (!o.subaccounts.length || Subaccount.isAmino(o.subaccounts[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.subaccounts) {
            Subaccount.encode(v, writer.uint32(10).fork()).ldelim();
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
                    message.subaccounts.push(Subaccount.decode(reader, reader.uint32()));
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
        message.subaccounts = object.subaccounts?.map(e => Subaccount.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.subaccounts = object.subaccounts?.map(e => Subaccount.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.subaccounts) {
            obj.subaccounts = message.subaccounts.map(e => e ? Subaccount.toAmino(e) : undefined);
        }
        else {
            obj.subaccounts = message.subaccounts;
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
            typeUrl: "/klyraprotocol.subaccounts.GenesisState",
            value: GenesisState.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);
