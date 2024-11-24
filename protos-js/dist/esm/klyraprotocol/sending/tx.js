//@ts-nocheck
import { Transfer } from "./transfer";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseMsgCreateTransfer() {
    return {
        transfer: undefined
    };
}
export const MsgCreateTransfer = {
    typeUrl: "/klyraprotocol.sending.MsgCreateTransfer",
    is(o) {
        return o && o.$typeUrl === MsgCreateTransfer.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgCreateTransfer.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgCreateTransfer.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.transfer !== undefined) {
            Transfer.encode(message.transfer, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateTransfer();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.transfer = Transfer.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgCreateTransfer();
        message.transfer = object.transfer !== undefined && object.transfer !== null ? Transfer.fromPartial(object.transfer) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCreateTransfer();
        if (object.transfer !== undefined && object.transfer !== null) {
            message.transfer = Transfer.fromAmino(object.transfer);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.transfer = message.transfer ? Transfer.toAmino(message.transfer) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCreateTransfer.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgCreateTransfer.decode(message.value);
    },
    toProto(message) {
        return MsgCreateTransfer.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgCreateTransfer",
            value: MsgCreateTransfer.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCreateTransfer.typeUrl, MsgCreateTransfer);
function createBaseMsgCreateTransferResponse() {
    return {};
}
export const MsgCreateTransferResponse = {
    typeUrl: "/klyraprotocol.sending.MsgCreateTransferResponse",
    is(o) {
        return o && o.$typeUrl === MsgCreateTransferResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgCreateTransferResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgCreateTransferResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateTransferResponse();
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
        const message = createBaseMsgCreateTransferResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgCreateTransferResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCreateTransferResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgCreateTransferResponse.decode(message.value);
    },
    toProto(message) {
        return MsgCreateTransferResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgCreateTransferResponse",
            value: MsgCreateTransferResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCreateTransferResponse.typeUrl, MsgCreateTransferResponse);
function createBaseMsgDepositToSubaccountResponse() {
    return {};
}
export const MsgDepositToSubaccountResponse = {
    typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccountResponse",
    is(o) {
        return o && o.$typeUrl === MsgDepositToSubaccountResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgDepositToSubaccountResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgDepositToSubaccountResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDepositToSubaccountResponse();
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
        const message = createBaseMsgDepositToSubaccountResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgDepositToSubaccountResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgDepositToSubaccountResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgDepositToSubaccountResponse.decode(message.value);
    },
    toProto(message) {
        return MsgDepositToSubaccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccountResponse",
            value: MsgDepositToSubaccountResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDepositToSubaccountResponse.typeUrl, MsgDepositToSubaccountResponse);
function createBaseMsgWithdrawFromSubaccountResponse() {
    return {};
}
export const MsgWithdrawFromSubaccountResponse = {
    typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccountResponse",
    is(o) {
        return o && o.$typeUrl === MsgWithdrawFromSubaccountResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgWithdrawFromSubaccountResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgWithdrawFromSubaccountResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawFromSubaccountResponse();
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
        const message = createBaseMsgWithdrawFromSubaccountResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgWithdrawFromSubaccountResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgWithdrawFromSubaccountResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgWithdrawFromSubaccountResponse.decode(message.value);
    },
    toProto(message) {
        return MsgWithdrawFromSubaccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccountResponse",
            value: MsgWithdrawFromSubaccountResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgWithdrawFromSubaccountResponse.typeUrl, MsgWithdrawFromSubaccountResponse);
function createBaseMsgSendFromModuleToAccountResponse() {
    return {};
}
export const MsgSendFromModuleToAccountResponse = {
    typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccountResponse",
    is(o) {
        return o && o.$typeUrl === MsgSendFromModuleToAccountResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgSendFromModuleToAccountResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgSendFromModuleToAccountResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSendFromModuleToAccountResponse();
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
        const message = createBaseMsgSendFromModuleToAccountResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgSendFromModuleToAccountResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgSendFromModuleToAccountResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgSendFromModuleToAccountResponse.decode(message.value);
    },
    toProto(message) {
        return MsgSendFromModuleToAccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccountResponse",
            value: MsgSendFromModuleToAccountResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgSendFromModuleToAccountResponse.typeUrl, MsgSendFromModuleToAccountResponse);
