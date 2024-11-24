"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClaimYieldForSubaccountResponse = exports.MsgClaimYieldForSubaccount = void 0;
//@ts-nocheck
const subaccount_1 = require("./subaccount");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseMsgClaimYieldForSubaccount() {
    return {
        id: undefined
    };
}
exports.MsgClaimYieldForSubaccount = {
    typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
    is(o) {
        return o && o.$typeUrl === exports.MsgClaimYieldForSubaccount.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgClaimYieldForSubaccount.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgClaimYieldForSubaccount.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== undefined) {
            subaccount_1.SubaccountId.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgClaimYieldForSubaccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgClaimYieldForSubaccount();
        message.id = object.id !== undefined && object.id !== null ? subaccount_1.SubaccountId.fromPartial(object.id) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgClaimYieldForSubaccount();
        if (object.id !== undefined && object.id !== null) {
            message.id = subaccount_1.SubaccountId.fromAmino(object.id);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id ? subaccount_1.SubaccountId.toAmino(message.id) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgClaimYieldForSubaccount.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgClaimYieldForSubaccount.decode(message.value);
    },
    toProto(message) {
        return exports.MsgClaimYieldForSubaccount.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
            value: exports.MsgClaimYieldForSubaccount.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgClaimYieldForSubaccount.typeUrl, exports.MsgClaimYieldForSubaccount);
function createBaseMsgClaimYieldForSubaccountResponse() {
    return {};
}
exports.MsgClaimYieldForSubaccountResponse = {
    typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgClaimYieldForSubaccountResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgClaimYieldForSubaccountResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgClaimYieldForSubaccountResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgClaimYieldForSubaccountResponse();
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
        const message = createBaseMsgClaimYieldForSubaccountResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgClaimYieldForSubaccountResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgClaimYieldForSubaccountResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgClaimYieldForSubaccountResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgClaimYieldForSubaccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse",
            value: exports.MsgClaimYieldForSubaccountResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgClaimYieldForSubaccountResponse.typeUrl, exports.MsgClaimYieldForSubaccountResponse);
