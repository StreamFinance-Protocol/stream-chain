"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = void 0;
//@ts-nocheck
const subaccount_1 = require("./subaccount");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseGenesisState() {
    return {
        subaccounts: []
    };
}
exports.GenesisState = {
    typeUrl: "/klyraprotocol.subaccounts.GenesisState",
    is(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.subaccounts) && (!o.subaccounts.length || subaccount_1.Subaccount.is(o.subaccounts[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.subaccounts) && (!o.subaccounts.length || subaccount_1.Subaccount.isSDK(o.subaccounts[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.subaccounts) && (!o.subaccounts.length || subaccount_1.Subaccount.isAmino(o.subaccounts[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.subaccounts) {
            subaccount_1.Subaccount.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subaccounts.push(subaccount_1.Subaccount.decode(reader, reader.uint32()));
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
        message.subaccounts = object.subaccounts?.map(e => subaccount_1.Subaccount.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.subaccounts = object.subaccounts?.map(e => subaccount_1.Subaccount.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.subaccounts) {
            obj.subaccounts = message.subaccounts.map(e => e ? subaccount_1.Subaccount.toAmino(e) : undefined);
        }
        else {
            obj.subaccounts = message.subaccounts;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GenesisState.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.GenesisState.decode(message.value);
    },
    toProto(message) {
        return exports.GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.GenesisState",
            value: exports.GenesisState.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GenesisState.typeUrl, exports.GenesisState);
