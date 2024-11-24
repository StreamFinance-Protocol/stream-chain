//@ts-nocheck
import { Coin } from "../../base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
function createBaseSendAuthorization() {
    return {
        $typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
        spendLimit: [],
        allowList: []
    };
}
export const SendAuthorization = {
    typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
    aminoType: "cosmos-sdk/SendAuthorization",
    is(o) {
        return o && (o.$typeUrl === SendAuthorization.typeUrl || Array.isArray(o.spendLimit) && (!o.spendLimit.length || Coin.is(o.spendLimit[0])) && Array.isArray(o.allowList) && (!o.allowList.length || typeof o.allowList[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === SendAuthorization.typeUrl || Array.isArray(o.spend_limit) && (!o.spend_limit.length || Coin.isSDK(o.spend_limit[0])) && Array.isArray(o.allow_list) && (!o.allow_list.length || typeof o.allow_list[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === SendAuthorization.typeUrl || Array.isArray(o.spend_limit) && (!o.spend_limit.length || Coin.isAmino(o.spend_limit[0])) && Array.isArray(o.allow_list) && (!o.allow_list.length || typeof o.allow_list[0] === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.spendLimit) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.allowList) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSendAuthorization();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.spendLimit.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.allowList.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSendAuthorization();
        message.spendLimit = object.spendLimit?.map(e => Coin.fromPartial(e)) || [];
        message.allowList = object.allowList?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseSendAuthorization();
        message.spendLimit = object.spend_limit?.map(e => Coin.fromAmino(e)) || [];
        message.allowList = object.allow_list?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.spendLimit) {
            obj.spend_limit = message.spendLimit.map(e => e ? Coin.toAmino(e) : undefined);
        }
        else {
            obj.spend_limit = message.spendLimit;
        }
        if (message.allowList) {
            obj.allow_list = message.allowList.map(e => e);
        }
        else {
            obj.allow_list = message.allowList;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return SendAuthorization.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/SendAuthorization",
            value: SendAuthorization.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return SendAuthorization.decode(message.value);
    },
    toProto(message) {
        return SendAuthorization.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
            value: SendAuthorization.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(SendAuthorization.typeUrl, SendAuthorization);
GlobalDecoderRegistry.registerAminoProtoMapping(SendAuthorization.aminoType, SendAuthorization.typeUrl);
