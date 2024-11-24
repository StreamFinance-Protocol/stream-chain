//@ts-nocheck
import { SubaccountId } from "./subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseMsgClaimYieldForSubaccount() {
    return {
        id: undefined
    };
}
export const MsgClaimYieldForSubaccount = {
    typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
    is(o) {
        return o && o.$typeUrl === MsgClaimYieldForSubaccount.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgClaimYieldForSubaccount.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgClaimYieldForSubaccount.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== undefined) {
            SubaccountId.encode(message.id, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgClaimYieldForSubaccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = SubaccountId.decode(reader, reader.uint32());
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
        message.id = object.id !== undefined && object.id !== null ? SubaccountId.fromPartial(object.id) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgClaimYieldForSubaccount();
        if (object.id !== undefined && object.id !== null) {
            message.id = SubaccountId.fromAmino(object.id);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id ? SubaccountId.toAmino(message.id) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgClaimYieldForSubaccount.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgClaimYieldForSubaccount.decode(message.value);
    },
    toProto(message) {
        return MsgClaimYieldForSubaccount.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
            value: MsgClaimYieldForSubaccount.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgClaimYieldForSubaccount.typeUrl, MsgClaimYieldForSubaccount);
function createBaseMsgClaimYieldForSubaccountResponse() {
    return {};
}
export const MsgClaimYieldForSubaccountResponse = {
    typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse",
    is(o) {
        return o && o.$typeUrl === MsgClaimYieldForSubaccountResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgClaimYieldForSubaccountResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgClaimYieldForSubaccountResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgClaimYieldForSubaccountResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgClaimYieldForSubaccountResponse.decode(message.value);
    },
    toProto(message) {
        return MsgClaimYieldForSubaccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse",
            value: MsgClaimYieldForSubaccountResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgClaimYieldForSubaccountResponse.typeUrl, MsgClaimYieldForSubaccountResponse);
