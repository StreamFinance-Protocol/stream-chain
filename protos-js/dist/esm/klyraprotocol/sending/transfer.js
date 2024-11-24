//@ts-nocheck
import { SubaccountId } from "../subaccounts/subaccount";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseTransfer() {
    return {
        sender: SubaccountId.fromPartial({}),
        recipient: SubaccountId.fromPartial({}),
        assetId: 0,
        amount: BigInt(0)
    };
}
export const Transfer = {
    typeUrl: "/klyraprotocol.sending.Transfer",
    is(o) {
        return o && (o.$typeUrl === Transfer.typeUrl || SubaccountId.is(o.sender) && SubaccountId.is(o.recipient) && typeof o.assetId === "number" && typeof o.amount === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Transfer.typeUrl || SubaccountId.isSDK(o.sender) && SubaccountId.isSDK(o.recipient) && typeof o.asset_id === "number" && typeof o.amount === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Transfer.typeUrl || SubaccountId.isAmino(o.sender) && SubaccountId.isAmino(o.recipient) && typeof o.asset_id === "number" && typeof o.amount === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.sender !== undefined) {
            SubaccountId.encode(message.sender, writer.uint32(10).fork()).ldelim();
        }
        if (message.recipient !== undefined) {
            SubaccountId.encode(message.recipient, writer.uint32(18).fork()).ldelim();
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
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTransfer();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = SubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.recipient = SubaccountId.decode(reader, reader.uint32());
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
        message.sender = object.sender !== undefined && object.sender !== null ? SubaccountId.fromPartial(object.sender) : undefined;
        message.recipient = object.recipient !== undefined && object.recipient !== null ? SubaccountId.fromPartial(object.recipient) : undefined;
        message.assetId = object.assetId ?? 0;
        message.amount = object.amount !== undefined && object.amount !== null ? BigInt(object.amount.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseTransfer();
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = SubaccountId.fromAmino(object.sender);
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = SubaccountId.fromAmino(object.recipient);
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
        obj.sender = message.sender ? SubaccountId.toAmino(message.sender) : undefined;
        obj.recipient = message.recipient ? SubaccountId.toAmino(message.recipient) : undefined;
        obj.asset_id = message.assetId === 0 ? undefined : message.assetId;
        obj.amount = message.amount !== BigInt(0) ? message.amount?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return Transfer.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return Transfer.decode(message.value);
    },
    toProto(message) {
        return Transfer.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.Transfer",
            value: Transfer.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Transfer.typeUrl, Transfer);
function createBaseMsgDepositToSubaccount() {
    return {
        sender: "",
        recipient: SubaccountId.fromPartial({}),
        assetId: 0,
        quantums: BigInt(0)
    };
}
export const MsgDepositToSubaccount = {
    typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
    is(o) {
        return o && (o.$typeUrl === MsgDepositToSubaccount.typeUrl || typeof o.sender === "string" && SubaccountId.is(o.recipient) && typeof o.assetId === "number" && typeof o.quantums === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgDepositToSubaccount.typeUrl || typeof o.sender === "string" && SubaccountId.isSDK(o.recipient) && typeof o.asset_id === "number" && typeof o.quantums === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgDepositToSubaccount.typeUrl || typeof o.sender === "string" && SubaccountId.isAmino(o.recipient) && typeof o.asset_id === "number" && typeof o.quantums === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.recipient !== undefined) {
            SubaccountId.encode(message.recipient, writer.uint32(18).fork()).ldelim();
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
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDepositToSubaccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.recipient = SubaccountId.decode(reader, reader.uint32());
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
        message.recipient = object.recipient !== undefined && object.recipient !== null ? SubaccountId.fromPartial(object.recipient) : undefined;
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
            message.recipient = SubaccountId.fromAmino(object.recipient);
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
        obj.recipient = message.recipient ? SubaccountId.toAmino(message.recipient) : undefined;
        obj.asset_id = message.assetId === 0 ? undefined : message.assetId;
        obj.quantums = message.quantums !== BigInt(0) ? message.quantums?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgDepositToSubaccount.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgDepositToSubaccount.decode(message.value);
    },
    toProto(message) {
        return MsgDepositToSubaccount.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount",
            value: MsgDepositToSubaccount.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDepositToSubaccount.typeUrl, MsgDepositToSubaccount);
function createBaseMsgWithdrawFromSubaccount() {
    return {
        sender: SubaccountId.fromPartial({}),
        recipient: "",
        assetId: 0,
        quantums: BigInt(0)
    };
}
export const MsgWithdrawFromSubaccount = {
    typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
    is(o) {
        return o && (o.$typeUrl === MsgWithdrawFromSubaccount.typeUrl || SubaccountId.is(o.sender) && typeof o.recipient === "string" && typeof o.assetId === "number" && typeof o.quantums === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgWithdrawFromSubaccount.typeUrl || SubaccountId.isSDK(o.sender) && typeof o.recipient === "string" && typeof o.asset_id === "number" && typeof o.quantums === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgWithdrawFromSubaccount.typeUrl || SubaccountId.isAmino(o.sender) && typeof o.recipient === "string" && typeof o.asset_id === "number" && typeof o.quantums === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.sender !== undefined) {
            SubaccountId.encode(message.sender, writer.uint32(18).fork()).ldelim();
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
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawFromSubaccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 2:
                    message.sender = SubaccountId.decode(reader, reader.uint32());
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
        message.sender = object.sender !== undefined && object.sender !== null ? SubaccountId.fromPartial(object.sender) : undefined;
        message.recipient = object.recipient ?? "";
        message.assetId = object.assetId ?? 0;
        message.quantums = object.quantums !== undefined && object.quantums !== null ? BigInt(object.quantums.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgWithdrawFromSubaccount();
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = SubaccountId.fromAmino(object.sender);
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
        obj.sender = message.sender ? SubaccountId.toAmino(message.sender) : undefined;
        obj.recipient = message.recipient === "" ? undefined : message.recipient;
        obj.asset_id = message.assetId === 0 ? undefined : message.assetId;
        obj.quantums = message.quantums !== BigInt(0) ? message.quantums?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgWithdrawFromSubaccount.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgWithdrawFromSubaccount.decode(message.value);
    },
    toProto(message) {
        return MsgWithdrawFromSubaccount.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
            value: MsgWithdrawFromSubaccount.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgWithdrawFromSubaccount.typeUrl, MsgWithdrawFromSubaccount);
function createBaseMsgSendFromModuleToAccount() {
    return {
        authority: "",
        senderModuleName: "",
        recipient: "",
        coin: Coin.fromPartial({})
    };
}
export const MsgSendFromModuleToAccount = {
    typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
    is(o) {
        return o && (o.$typeUrl === MsgSendFromModuleToAccount.typeUrl || typeof o.authority === "string" && typeof o.senderModuleName === "string" && typeof o.recipient === "string" && Coin.is(o.coin));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgSendFromModuleToAccount.typeUrl || typeof o.authority === "string" && typeof o.sender_module_name === "string" && typeof o.recipient === "string" && Coin.isSDK(o.coin));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgSendFromModuleToAccount.typeUrl || typeof o.authority === "string" && typeof o.sender_module_name === "string" && typeof o.recipient === "string" && Coin.isAmino(o.coin));
    },
    encode(message, writer = BinaryWriter.create()) {
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
            Coin.encode(message.coin, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
                    message.coin = Coin.decode(reader, reader.uint32());
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
        message.coin = object.coin !== undefined && object.coin !== null ? Coin.fromPartial(object.coin) : undefined;
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
            message.coin = Coin.fromAmino(object.coin);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.sender_module_name = message.senderModuleName === "" ? undefined : message.senderModuleName;
        obj.recipient = message.recipient === "" ? undefined : message.recipient;
        obj.coin = message.coin ? Coin.toAmino(message.coin) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgSendFromModuleToAccount.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgSendFromModuleToAccount.decode(message.value);
    },
    toProto(message) {
        return MsgSendFromModuleToAccount.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
            value: MsgSendFromModuleToAccount.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgSendFromModuleToAccount.typeUrl, MsgSendFromModuleToAccount);
