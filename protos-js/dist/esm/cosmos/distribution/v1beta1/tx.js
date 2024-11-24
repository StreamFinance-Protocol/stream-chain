//@ts-nocheck
import { Coin } from "../../base/v1beta1/coin";
import { Params } from "./distribution";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
function createBaseMsgSetWithdrawAddress() {
    return {
        delegatorAddress: "",
        withdrawAddress: ""
    };
}
export const MsgSetWithdrawAddress = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
    aminoType: "cosmos-sdk/MsgModifyWithdrawAddress",
    is(o) {
        return o && (o.$typeUrl === MsgSetWithdrawAddress.typeUrl || typeof o.delegatorAddress === "string" && typeof o.withdrawAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgSetWithdrawAddress.typeUrl || typeof o.delegator_address === "string" && typeof o.withdraw_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgSetWithdrawAddress.typeUrl || typeof o.delegator_address === "string" && typeof o.withdraw_address === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.withdrawAddress !== "") {
            writer.uint32(18).string(message.withdrawAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetWithdrawAddress();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                case 2:
                    message.withdrawAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgSetWithdrawAddress();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.withdrawAddress = object.withdrawAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSetWithdrawAddress();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.withdraw_address !== undefined && object.withdraw_address !== null) {
            message.withdrawAddress = object.withdraw_address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.withdraw_address = message.withdrawAddress === "" ? undefined : message.withdrawAddress;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgSetWithdrawAddress.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgModifyWithdrawAddress",
            value: MsgSetWithdrawAddress.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgSetWithdrawAddress.decode(message.value);
    },
    toProto(message) {
        return MsgSetWithdrawAddress.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
            value: MsgSetWithdrawAddress.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgSetWithdrawAddress.typeUrl, MsgSetWithdrawAddress);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgSetWithdrawAddress.aminoType, MsgSetWithdrawAddress.typeUrl);
function createBaseMsgSetWithdrawAddressResponse() {
    return {};
}
export const MsgSetWithdrawAddressResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddressResponse",
    aminoType: "cosmos-sdk/MsgSetWithdrawAddressResponse",
    is(o) {
        return o && o.$typeUrl === MsgSetWithdrawAddressResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgSetWithdrawAddressResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgSetWithdrawAddressResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetWithdrawAddressResponse();
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
        const message = createBaseMsgSetWithdrawAddressResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgSetWithdrawAddressResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgSetWithdrawAddressResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgSetWithdrawAddressResponse",
            value: MsgSetWithdrawAddressResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgSetWithdrawAddressResponse.decode(message.value);
    },
    toProto(message) {
        return MsgSetWithdrawAddressResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddressResponse",
            value: MsgSetWithdrawAddressResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgSetWithdrawAddressResponse.typeUrl, MsgSetWithdrawAddressResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgSetWithdrawAddressResponse.aminoType, MsgSetWithdrawAddressResponse.typeUrl);
function createBaseMsgWithdrawDelegatorReward() {
    return {
        delegatorAddress: "",
        validatorAddress: ""
    };
}
export const MsgWithdrawDelegatorReward = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
    aminoType: "cosmos-sdk/MsgWithdrawDelegationReward",
    is(o) {
        return o && (o.$typeUrl === MsgWithdrawDelegatorReward.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgWithdrawDelegatorReward.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgWithdrawDelegatorReward.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawDelegatorReward();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                case 2:
                    message.validatorAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgWithdrawDelegatorReward();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgWithdrawDelegatorReward();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgWithdrawDelegatorReward.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgWithdrawDelegationReward",
            value: MsgWithdrawDelegatorReward.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgWithdrawDelegatorReward.decode(message.value);
    },
    toProto(message) {
        return MsgWithdrawDelegatorReward.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
            value: MsgWithdrawDelegatorReward.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgWithdrawDelegatorReward.typeUrl, MsgWithdrawDelegatorReward);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgWithdrawDelegatorReward.aminoType, MsgWithdrawDelegatorReward.typeUrl);
function createBaseMsgWithdrawDelegatorRewardResponse() {
    return {
        amount: []
    };
}
export const MsgWithdrawDelegatorRewardResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorRewardResponse",
    aminoType: "cosmos-sdk/MsgWithdrawDelegatorRewardResponse",
    is(o) {
        return o && (o.$typeUrl === MsgWithdrawDelegatorRewardResponse.typeUrl || Array.isArray(o.amount) && (!o.amount.length || Coin.is(o.amount[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgWithdrawDelegatorRewardResponse.typeUrl || Array.isArray(o.amount) && (!o.amount.length || Coin.isSDK(o.amount[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgWithdrawDelegatorRewardResponse.typeUrl || Array.isArray(o.amount) && (!o.amount.length || Coin.isAmino(o.amount[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawDelegatorRewardResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgWithdrawDelegatorRewardResponse();
        message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgWithdrawDelegatorRewardResponse();
        message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.amount) {
            obj.amount = message.amount.map(e => e ? Coin.toAmino(e) : undefined);
        }
        else {
            obj.amount = message.amount;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MsgWithdrawDelegatorRewardResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgWithdrawDelegatorRewardResponse",
            value: MsgWithdrawDelegatorRewardResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgWithdrawDelegatorRewardResponse.decode(message.value);
    },
    toProto(message) {
        return MsgWithdrawDelegatorRewardResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorRewardResponse",
            value: MsgWithdrawDelegatorRewardResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgWithdrawDelegatorRewardResponse.typeUrl, MsgWithdrawDelegatorRewardResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgWithdrawDelegatorRewardResponse.aminoType, MsgWithdrawDelegatorRewardResponse.typeUrl);
function createBaseMsgWithdrawValidatorCommission() {
    return {
        validatorAddress: ""
    };
}
export const MsgWithdrawValidatorCommission = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
    aminoType: "cosmos-sdk/MsgWithdrawValidatorCommission",
    is(o) {
        return o && (o.$typeUrl === MsgWithdrawValidatorCommission.typeUrl || typeof o.validatorAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgWithdrawValidatorCommission.typeUrl || typeof o.validator_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgWithdrawValidatorCommission.typeUrl || typeof o.validator_address === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawValidatorCommission();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgWithdrawValidatorCommission();
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgWithdrawValidatorCommission();
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgWithdrawValidatorCommission.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgWithdrawValidatorCommission",
            value: MsgWithdrawValidatorCommission.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgWithdrawValidatorCommission.decode(message.value);
    },
    toProto(message) {
        return MsgWithdrawValidatorCommission.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
            value: MsgWithdrawValidatorCommission.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgWithdrawValidatorCommission.typeUrl, MsgWithdrawValidatorCommission);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgWithdrawValidatorCommission.aminoType, MsgWithdrawValidatorCommission.typeUrl);
function createBaseMsgWithdrawValidatorCommissionResponse() {
    return {
        amount: []
    };
}
export const MsgWithdrawValidatorCommissionResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommissionResponse",
    aminoType: "cosmos-sdk/MsgWithdrawValidatorCommissionResponse",
    is(o) {
        return o && (o.$typeUrl === MsgWithdrawValidatorCommissionResponse.typeUrl || Array.isArray(o.amount) && (!o.amount.length || Coin.is(o.amount[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgWithdrawValidatorCommissionResponse.typeUrl || Array.isArray(o.amount) && (!o.amount.length || Coin.isSDK(o.amount[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgWithdrawValidatorCommissionResponse.typeUrl || Array.isArray(o.amount) && (!o.amount.length || Coin.isAmino(o.amount[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawValidatorCommissionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgWithdrawValidatorCommissionResponse();
        message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgWithdrawValidatorCommissionResponse();
        message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.amount) {
            obj.amount = message.amount.map(e => e ? Coin.toAmino(e) : undefined);
        }
        else {
            obj.amount = message.amount;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MsgWithdrawValidatorCommissionResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgWithdrawValidatorCommissionResponse",
            value: MsgWithdrawValidatorCommissionResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgWithdrawValidatorCommissionResponse.decode(message.value);
    },
    toProto(message) {
        return MsgWithdrawValidatorCommissionResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommissionResponse",
            value: MsgWithdrawValidatorCommissionResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgWithdrawValidatorCommissionResponse.typeUrl, MsgWithdrawValidatorCommissionResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgWithdrawValidatorCommissionResponse.aminoType, MsgWithdrawValidatorCommissionResponse.typeUrl);
function createBaseMsgFundCommunityPool() {
    return {
        amount: [],
        depositor: ""
    };
}
export const MsgFundCommunityPool = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
    aminoType: "cosmos-sdk/MsgFundCommunityPool",
    is(o) {
        return o && (o.$typeUrl === MsgFundCommunityPool.typeUrl || Array.isArray(o.amount) && (!o.amount.length || Coin.is(o.amount[0])) && typeof o.depositor === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgFundCommunityPool.typeUrl || Array.isArray(o.amount) && (!o.amount.length || Coin.isSDK(o.amount[0])) && typeof o.depositor === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgFundCommunityPool.typeUrl || Array.isArray(o.amount) && (!o.amount.length || Coin.isAmino(o.amount[0])) && typeof o.depositor === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgFundCommunityPool();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.depositor = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgFundCommunityPool();
        message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
        message.depositor = object.depositor ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgFundCommunityPool();
        message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
        if (object.depositor !== undefined && object.depositor !== null) {
            message.depositor = object.depositor;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.amount) {
            obj.amount = message.amount.map(e => e ? Coin.toAmino(e) : undefined);
        }
        else {
            obj.amount = message.amount;
        }
        obj.depositor = message.depositor === "" ? undefined : message.depositor;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgFundCommunityPool.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgFundCommunityPool",
            value: MsgFundCommunityPool.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgFundCommunityPool.decode(message.value);
    },
    toProto(message) {
        return MsgFundCommunityPool.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
            value: MsgFundCommunityPool.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgFundCommunityPool.typeUrl, MsgFundCommunityPool);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgFundCommunityPool.aminoType, MsgFundCommunityPool.typeUrl);
function createBaseMsgFundCommunityPoolResponse() {
    return {};
}
export const MsgFundCommunityPoolResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgFundCommunityPoolResponse",
    aminoType: "cosmos-sdk/MsgFundCommunityPoolResponse",
    is(o) {
        return o && o.$typeUrl === MsgFundCommunityPoolResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgFundCommunityPoolResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgFundCommunityPoolResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgFundCommunityPoolResponse();
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
        const message = createBaseMsgFundCommunityPoolResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgFundCommunityPoolResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgFundCommunityPoolResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgFundCommunityPoolResponse",
            value: MsgFundCommunityPoolResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgFundCommunityPoolResponse.decode(message.value);
    },
    toProto(message) {
        return MsgFundCommunityPoolResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgFundCommunityPoolResponse",
            value: MsgFundCommunityPoolResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgFundCommunityPoolResponse.typeUrl, MsgFundCommunityPoolResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgFundCommunityPoolResponse.aminoType, MsgFundCommunityPoolResponse.typeUrl);
function createBaseMsgUpdateParams() {
    return {
        authority: "",
        params: Params.fromPartial({})
    };
}
export const MsgUpdateParams = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgUpdateParams",
    aminoType: "cosmos-sdk/distribution/MsgUpdateParams",
    is(o) {
        return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateParams();
        message.authority = object.authority ?? "";
        message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateParams.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/distribution/MsgUpdateParams",
            value: MsgUpdateParams.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgUpdateParams.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgUpdateParams",
            value: MsgUpdateParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateParams.typeUrl, MsgUpdateParams);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgUpdateParams.aminoType, MsgUpdateParams.typeUrl);
function createBaseMsgUpdateParamsResponse() {
    return {};
}
export const MsgUpdateParamsResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgUpdateParamsResponse",
    aminoType: "cosmos-sdk/MsgUpdateParamsResponse",
    is(o) {
        return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParamsResponse();
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
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateParamsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgUpdateParamsResponse",
            value: MsgUpdateParamsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgUpdateParamsResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgUpdateParamsResponse",
            value: MsgUpdateParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateParamsResponse.typeUrl, MsgUpdateParamsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgUpdateParamsResponse.aminoType, MsgUpdateParamsResponse.typeUrl);
function createBaseMsgCommunityPoolSpend() {
    return {
        authority: "",
        recipient: "",
        amount: []
    };
}
export const MsgCommunityPoolSpend = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgCommunityPoolSpend",
    aminoType: "cosmos-sdk/distr/MsgCommunityPoolSpend",
    is(o) {
        return o && (o.$typeUrl === MsgCommunityPoolSpend.typeUrl || typeof o.authority === "string" && typeof o.recipient === "string" && Array.isArray(o.amount) && (!o.amount.length || Coin.is(o.amount[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgCommunityPoolSpend.typeUrl || typeof o.authority === "string" && typeof o.recipient === "string" && Array.isArray(o.amount) && (!o.amount.length || Coin.isSDK(o.amount[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgCommunityPoolSpend.typeUrl || typeof o.authority === "string" && typeof o.recipient === "string" && Array.isArray(o.amount) && (!o.amount.length || Coin.isAmino(o.amount[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.recipient !== "") {
            writer.uint32(18).string(message.recipient);
        }
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCommunityPoolSpend();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.recipient = reader.string();
                    break;
                case 3:
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgCommunityPoolSpend();
        message.authority = object.authority ?? "";
        message.recipient = object.recipient ?? "";
        message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCommunityPoolSpend();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient;
        }
        message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.recipient = message.recipient === "" ? undefined : message.recipient;
        if (message.amount) {
            obj.amount = message.amount.map(e => e ? Coin.toAmino(e) : undefined);
        }
        else {
            obj.amount = message.amount;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCommunityPoolSpend.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/distr/MsgCommunityPoolSpend",
            value: MsgCommunityPoolSpend.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgCommunityPoolSpend.decode(message.value);
    },
    toProto(message) {
        return MsgCommunityPoolSpend.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgCommunityPoolSpend",
            value: MsgCommunityPoolSpend.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCommunityPoolSpend.typeUrl, MsgCommunityPoolSpend);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCommunityPoolSpend.aminoType, MsgCommunityPoolSpend.typeUrl);
function createBaseMsgCommunityPoolSpendResponse() {
    return {};
}
export const MsgCommunityPoolSpendResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgCommunityPoolSpendResponse",
    aminoType: "cosmos-sdk/MsgCommunityPoolSpendResponse",
    is(o) {
        return o && o.$typeUrl === MsgCommunityPoolSpendResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgCommunityPoolSpendResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgCommunityPoolSpendResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCommunityPoolSpendResponse();
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
        const message = createBaseMsgCommunityPoolSpendResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgCommunityPoolSpendResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCommunityPoolSpendResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgCommunityPoolSpendResponse",
            value: MsgCommunityPoolSpendResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgCommunityPoolSpendResponse.decode(message.value);
    },
    toProto(message) {
        return MsgCommunityPoolSpendResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgCommunityPoolSpendResponse",
            value: MsgCommunityPoolSpendResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCommunityPoolSpendResponse.typeUrl, MsgCommunityPoolSpendResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCommunityPoolSpendResponse.aminoType, MsgCommunityPoolSpendResponse.typeUrl);
function createBaseMsgDepositValidatorRewardsPool() {
    return {
        depositor: "",
        validatorAddress: "",
        amount: []
    };
}
export const MsgDepositValidatorRewardsPool = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool",
    aminoType: "cosmos-sdk/distr/MsgDepositValRewards",
    is(o) {
        return o && (o.$typeUrl === MsgDepositValidatorRewardsPool.typeUrl || typeof o.depositor === "string" && typeof o.validatorAddress === "string" && Array.isArray(o.amount) && (!o.amount.length || Coin.is(o.amount[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgDepositValidatorRewardsPool.typeUrl || typeof o.depositor === "string" && typeof o.validator_address === "string" && Array.isArray(o.amount) && (!o.amount.length || Coin.isSDK(o.amount[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgDepositValidatorRewardsPool.typeUrl || typeof o.depositor === "string" && typeof o.validator_address === "string" && Array.isArray(o.amount) && (!o.amount.length || Coin.isAmino(o.amount[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.depositor !== "") {
            writer.uint32(10).string(message.depositor);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDepositValidatorRewardsPool();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.depositor = reader.string();
                    break;
                case 2:
                    message.validatorAddress = reader.string();
                    break;
                case 3:
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgDepositValidatorRewardsPool();
        message.depositor = object.depositor ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgDepositValidatorRewardsPool();
        if (object.depositor !== undefined && object.depositor !== null) {
            message.depositor = object.depositor;
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.depositor = message.depositor === "" ? undefined : message.depositor;
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        if (message.amount) {
            obj.amount = message.amount.map(e => e ? Coin.toAmino(e) : undefined);
        }
        else {
            obj.amount = message.amount;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MsgDepositValidatorRewardsPool.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/distr/MsgDepositValRewards",
            value: MsgDepositValidatorRewardsPool.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgDepositValidatorRewardsPool.decode(message.value);
    },
    toProto(message) {
        return MsgDepositValidatorRewardsPool.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool",
            value: MsgDepositValidatorRewardsPool.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDepositValidatorRewardsPool.typeUrl, MsgDepositValidatorRewardsPool);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgDepositValidatorRewardsPool.aminoType, MsgDepositValidatorRewardsPool.typeUrl);
function createBaseMsgDepositValidatorRewardsPoolResponse() {
    return {};
}
export const MsgDepositValidatorRewardsPoolResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPoolResponse",
    aminoType: "cosmos-sdk/MsgDepositValidatorRewardsPoolResponse",
    is(o) {
        return o && o.$typeUrl === MsgDepositValidatorRewardsPoolResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgDepositValidatorRewardsPoolResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgDepositValidatorRewardsPoolResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDepositValidatorRewardsPoolResponse();
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
        const message = createBaseMsgDepositValidatorRewardsPoolResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgDepositValidatorRewardsPoolResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgDepositValidatorRewardsPoolResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgDepositValidatorRewardsPoolResponse",
            value: MsgDepositValidatorRewardsPoolResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgDepositValidatorRewardsPoolResponse.decode(message.value);
    },
    toProto(message) {
        return MsgDepositValidatorRewardsPoolResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPoolResponse",
            value: MsgDepositValidatorRewardsPoolResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDepositValidatorRewardsPoolResponse.typeUrl, MsgDepositValidatorRewardsPoolResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgDepositValidatorRewardsPoolResponse.aminoType, MsgDepositValidatorRewardsPoolResponse.typeUrl);
