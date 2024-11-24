"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSendFromModuleToAccount = exports.MsgWithdrawFromSubaccount = exports.MsgDepositToSubaccount = exports.Transfer = void 0;
//@ts-nocheck
const subaccount_1 = require("../subaccounts/subaccount");
const coin_1 = require("../../cosmos/base/v1beta1/coin");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseTransfer() {
    return {
        sender: subaccount_1.SubaccountId.fromPartial({}),
        recipient: subaccount_1.SubaccountId.fromPartial({}),
        assetId: 0,
        amount: BigInt(0)
    };
}
exports.Transfer = {
    typeUrl: "/klyraprotocol.sending.Transfer",
    is(o) {
        return o && (o.$typeUrl === exports.Transfer.typeUrl || subaccount_1.SubaccountId.is(o.sender) && subaccount_1.SubaccountId.is(o.recipient) && typeof o.assetId === "number" && typeof o.amount === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Transfer.typeUrl || subaccount_1.SubaccountId.isSDK(o.sender) && subaccount_1.SubaccountId.isSDK(o.recipient) && typeof o.asset_id === "number" && typeof o.amount === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Transfer.typeUrl || subaccount_1.SubaccountId.isAmino(o.sender) && subaccount_1.SubaccountId.isAmino(o.recipient) && typeof o.asset_id === "number" && typeof o.amount === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.sender !== undefined) {
            subaccount_1.SubaccountId.encode(message.sender, writer.uint32(10).fork()).ldelim();
        }
        if (message.recipient !== undefined) {
            subaccount_1.SubaccountId.encode(message.recipient, writer.uint32(18).fork()).ldelim();
        }
        if (message.assetId !== 0) {
            writer.uint32(24).uint32(message.assetId);
        }
        if (message.amount !== BigInt(0)) {
            writer.uint32(32).uint64(message.amount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTransfer();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.recipient = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.assetId = reader.uint32();
                    break;
                case 4:
                    message.amount = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTransfer();
        message.sender = object.sender !== undefined && object.sender !== null ? subaccount_1.SubaccountId.fromPartial(object.sender) : undefined;
        message.recipient = object.recipient !== undefined && object.recipient !== null ? subaccount_1.SubaccountId.fromPartial(object.recipient) : undefined;
        message.assetId = object.assetId ?? 0;
        message.amount = object.amount !== undefined && object.amount !== null ? BigInt(object.amount.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseTransfer();
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = subaccount_1.SubaccountId.fromAmino(object.sender);
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = subaccount_1.SubaccountId.fromAmino(object.recipient);
        }
        if (object.asset_id !== undefined && object.asset_id !== null) {
            message.assetId = object.asset_id;
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = BigInt(object.amount);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.sender = message.sender ? subaccount_1.SubaccountId.toAmino(message.sender) : undefined;
        obj.recipient = message.recipient ? subaccount_1.SubaccountId.toAmino(message.recipient) : undefined;
        obj.asset_id = message.assetId === 0 ? undefined : message.assetId;
        obj.amount = message.amount !== BigInt(0) ? message.amount?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Transfer.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Transfer.decode(message.value);
    },
    toProto(message) {
        return exports.Transfer.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.Transfer",
            value: exports.Transfer.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Transfer.typeUrl, exports.Transfer);
function createBaseMsgDepositToSubaccount() {
    return {
        sender: "",
        recipient: subaccount_1.SubaccountId.fromPartial({}),
        assetId: 0,
        quantums: BigInt(0)
    };
}
exports.MsgDepositToSubaccount = {
    typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
    is(o) {
        return o && (o.$typeUrl === exports.MsgDepositToSubaccount.typeUrl || typeof o.sender === "string" && subaccount_1.SubaccountId.is(o.recipient) && typeof o.assetId === "number" && typeof o.quantums === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgDepositToSubaccount.typeUrl || typeof o.sender === "string" && subaccount_1.SubaccountId.isSDK(o.recipient) && typeof o.asset_id === "number" && typeof o.quantums === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgDepositToSubaccount.typeUrl || typeof o.sender === "string" && subaccount_1.SubaccountId.isAmino(o.recipient) && typeof o.asset_id === "number" && typeof o.quantums === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.recipient !== undefined) {
            subaccount_1.SubaccountId.encode(message.recipient, writer.uint32(18).fork()).ldelim();
        }
        if (message.assetId !== 0) {
            writer.uint32(24).uint32(message.assetId);
        }
        if (message.quantums !== BigInt(0)) {
            writer.uint32(32).uint64(message.quantums);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDepositToSubaccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.recipient = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.assetId = reader.uint32();
                    break;
                case 4:
                    message.quantums = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgDepositToSubaccount();
        message.sender = object.sender ?? "";
        message.recipient = object.recipient !== undefined && object.recipient !== null ? subaccount_1.SubaccountId.fromPartial(object.recipient) : undefined;
        message.assetId = object.assetId ?? 0;
        message.quantums = object.quantums !== undefined && object.quantums !== null ? BigInt(object.quantums.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgDepositToSubaccount();
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = subaccount_1.SubaccountId.fromAmino(object.recipient);
        }
        if (object.asset_id !== undefined && object.asset_id !== null) {
            message.assetId = object.asset_id;
        }
        if (object.quantums !== undefined && object.quantums !== null) {
            message.quantums = BigInt(object.quantums);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.sender = message.sender === "" ? undefined : message.sender;
        obj.recipient = message.recipient ? subaccount_1.SubaccountId.toAmino(message.recipient) : undefined;
        obj.asset_id = message.assetId === 0 ? undefined : message.assetId;
        obj.quantums = message.quantums !== BigInt(0) ? message.quantums?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgDepositToSubaccount.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgDepositToSubaccount.decode(message.value);
    },
    toProto(message) {
        return exports.MsgDepositToSubaccount.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
            value: exports.MsgDepositToSubaccount.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgDepositToSubaccount.typeUrl, exports.MsgDepositToSubaccount);
function createBaseMsgWithdrawFromSubaccount() {
    return {
        sender: subaccount_1.SubaccountId.fromPartial({}),
        recipient: "",
        assetId: 0,
        quantums: BigInt(0)
    };
}
exports.MsgWithdrawFromSubaccount = {
    typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
    is(o) {
        return o && (o.$typeUrl === exports.MsgWithdrawFromSubaccount.typeUrl || subaccount_1.SubaccountId.is(o.sender) && typeof o.recipient === "string" && typeof o.assetId === "number" && typeof o.quantums === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgWithdrawFromSubaccount.typeUrl || subaccount_1.SubaccountId.isSDK(o.sender) && typeof o.recipient === "string" && typeof o.asset_id === "number" && typeof o.quantums === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgWithdrawFromSubaccount.typeUrl || subaccount_1.SubaccountId.isAmino(o.sender) && typeof o.recipient === "string" && typeof o.asset_id === "number" && typeof o.quantums === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.sender !== undefined) {
            subaccount_1.SubaccountId.encode(message.sender, writer.uint32(18).fork()).ldelim();
        }
        if (message.recipient !== "") {
            writer.uint32(10).string(message.recipient);
        }
        if (message.assetId !== 0) {
            writer.uint32(24).uint32(message.assetId);
        }
        if (message.quantums !== BigInt(0)) {
            writer.uint32(32).uint64(message.quantums);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawFromSubaccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 2:
                    message.sender = subaccount_1.SubaccountId.decode(reader, reader.uint32());
                    break;
                case 1:
                    message.recipient = reader.string();
                    break;
                case 3:
                    message.assetId = reader.uint32();
                    break;
                case 4:
                    message.quantums = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgWithdrawFromSubaccount();
        message.sender = object.sender !== undefined && object.sender !== null ? subaccount_1.SubaccountId.fromPartial(object.sender) : undefined;
        message.recipient = object.recipient ?? "";
        message.assetId = object.assetId ?? 0;
        message.quantums = object.quantums !== undefined && object.quantums !== null ? BigInt(object.quantums.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgWithdrawFromSubaccount();
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = subaccount_1.SubaccountId.fromAmino(object.sender);
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient;
        }
        if (object.asset_id !== undefined && object.asset_id !== null) {
            message.assetId = object.asset_id;
        }
        if (object.quantums !== undefined && object.quantums !== null) {
            message.quantums = BigInt(object.quantums);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.sender = message.sender ? subaccount_1.SubaccountId.toAmino(message.sender) : undefined;
        obj.recipient = message.recipient === "" ? undefined : message.recipient;
        obj.asset_id = message.assetId === 0 ? undefined : message.assetId;
        obj.quantums = message.quantums !== BigInt(0) ? message.quantums?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgWithdrawFromSubaccount.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgWithdrawFromSubaccount.decode(message.value);
    },
    toProto(message) {
        return exports.MsgWithdrawFromSubaccount.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
            value: exports.MsgWithdrawFromSubaccount.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgWithdrawFromSubaccount.typeUrl, exports.MsgWithdrawFromSubaccount);
function createBaseMsgSendFromModuleToAccount() {
    return {
        authority: "",
        senderModuleName: "",
        recipient: "",
        coin: coin_1.Coin.fromPartial({})
    };
}
exports.MsgSendFromModuleToAccount = {
    typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
    is(o) {
        return o && (o.$typeUrl === exports.MsgSendFromModuleToAccount.typeUrl || typeof o.authority === "string" && typeof o.senderModuleName === "string" && typeof o.recipient === "string" && coin_1.Coin.is(o.coin));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgSendFromModuleToAccount.typeUrl || typeof o.authority === "string" && typeof o.sender_module_name === "string" && typeof o.recipient === "string" && coin_1.Coin.isSDK(o.coin));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgSendFromModuleToAccount.typeUrl || typeof o.authority === "string" && typeof o.sender_module_name === "string" && typeof o.recipient === "string" && coin_1.Coin.isAmino(o.coin));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.senderModuleName !== "") {
            writer.uint32(18).string(message.senderModuleName);
        }
        if (message.recipient !== "") {
            writer.uint32(26).string(message.recipient);
        }
        if (message.coin !== undefined) {
            coin_1.Coin.encode(message.coin, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSendFromModuleToAccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.senderModuleName = reader.string();
                    break;
                case 3:
                    message.recipient = reader.string();
                    break;
                case 4:
                    message.coin = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgSendFromModuleToAccount();
        message.authority = object.authority ?? "";
        message.senderModuleName = object.senderModuleName ?? "";
        message.recipient = object.recipient ?? "";
        message.coin = object.coin !== undefined && object.coin !== null ? coin_1.Coin.fromPartial(object.coin) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSendFromModuleToAccount();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.sender_module_name !== undefined && object.sender_module_name !== null) {
            message.senderModuleName = object.sender_module_name;
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient;
        }
        if (object.coin !== undefined && object.coin !== null) {
            message.coin = coin_1.Coin.fromAmino(object.coin);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.sender_module_name = message.senderModuleName === "" ? undefined : message.senderModuleName;
        obj.recipient = message.recipient === "" ? undefined : message.recipient;
        obj.coin = message.coin ? coin_1.Coin.toAmino(message.coin) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSendFromModuleToAccount.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgSendFromModuleToAccount.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSendFromModuleToAccount.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
            value: exports.MsgSendFromModuleToAccount.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSendFromModuleToAccount.typeUrl, exports.MsgSendFromModuleToAccount);
