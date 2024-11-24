"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSendFromModuleToAccountResponse = exports.MsgWithdrawFromSubaccountResponse = exports.MsgDepositToSubaccountResponse = exports.MsgCreateTransferResponse = exports.MsgCreateTransfer = void 0;
//@ts-nocheck
const transfer_1 = require("./transfer");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseMsgCreateTransfer() {
    return {
        transfer: undefined
    };
}
exports.MsgCreateTransfer = {
    typeUrl: "/klyraprotocol.sending.MsgCreateTransfer",
    is(o) {
        return o && o.$typeUrl === exports.MsgCreateTransfer.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgCreateTransfer.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgCreateTransfer.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.transfer !== undefined) {
            transfer_1.Transfer.encode(message.transfer, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateTransfer();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.transfer = transfer_1.Transfer.decode(reader, reader.uint32());
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
        message.transfer = object.transfer !== undefined && object.transfer !== null ? transfer_1.Transfer.fromPartial(object.transfer) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCreateTransfer();
        if (object.transfer !== undefined && object.transfer !== null) {
            message.transfer = transfer_1.Transfer.fromAmino(object.transfer);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.transfer = message.transfer ? transfer_1.Transfer.toAmino(message.transfer) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgCreateTransfer.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgCreateTransfer.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCreateTransfer.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgCreateTransfer",
            value: exports.MsgCreateTransfer.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCreateTransfer.typeUrl, exports.MsgCreateTransfer);
function createBaseMsgCreateTransferResponse() {
    return {};
}
exports.MsgCreateTransferResponse = {
    typeUrl: "/klyraprotocol.sending.MsgCreateTransferResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgCreateTransferResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgCreateTransferResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgCreateTransferResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgCreateTransferResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgCreateTransferResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCreateTransferResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgCreateTransferResponse",
            value: exports.MsgCreateTransferResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCreateTransferResponse.typeUrl, exports.MsgCreateTransferResponse);
function createBaseMsgDepositToSubaccountResponse() {
    return {};
}
exports.MsgDepositToSubaccountResponse = {
    typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccountResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgDepositToSubaccountResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgDepositToSubaccountResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgDepositToSubaccountResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgDepositToSubaccountResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgDepositToSubaccountResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgDepositToSubaccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccountResponse",
            value: exports.MsgDepositToSubaccountResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgDepositToSubaccountResponse.typeUrl, exports.MsgDepositToSubaccountResponse);
function createBaseMsgWithdrawFromSubaccountResponse() {
    return {};
}
exports.MsgWithdrawFromSubaccountResponse = {
    typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccountResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgWithdrawFromSubaccountResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgWithdrawFromSubaccountResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgWithdrawFromSubaccountResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgWithdrawFromSubaccountResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgWithdrawFromSubaccountResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgWithdrawFromSubaccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccountResponse",
            value: exports.MsgWithdrawFromSubaccountResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgWithdrawFromSubaccountResponse.typeUrl, exports.MsgWithdrawFromSubaccountResponse);
function createBaseMsgSendFromModuleToAccountResponse() {
    return {};
}
exports.MsgSendFromModuleToAccountResponse = {
    typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccountResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgSendFromModuleToAccountResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgSendFromModuleToAccountResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgSendFromModuleToAccountResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.MsgSendFromModuleToAccountResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgSendFromModuleToAccountResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSendFromModuleToAccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccountResponse",
            value: exports.MsgSendFromModuleToAccountResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSendFromModuleToAccountResponse.typeUrl, exports.MsgSendFromModuleToAccountResponse);
