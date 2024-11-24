//@ts-nocheck
import { Description, CommissionRates, Params } from "./staking";
import { Any } from "../../../google/protobuf/any";
import { Coin } from "../../base/v1beta1/coin";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { encodePubkey, decodePubkey } from "@cosmjs/proto-signing";
import { GlobalDecoderRegistry } from "../../../registry";
import { Decimal } from "@cosmjs/math";
import { toTimestamp, fromTimestamp } from "../../../helpers";
function createBaseMsgCreateValidator() {
    return {
        description: Description.fromPartial({}),
        commission: CommissionRates.fromPartial({}),
        minSelfDelegation: "",
        delegatorAddress: "",
        validatorAddress: "",
        pubkey: undefined,
        value: Coin.fromPartial({})
    };
}
export const MsgCreateValidator = {
    typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
    aminoType: "cosmos-sdk/MsgCreateValidator",
    is(o) {
        return o && (o.$typeUrl === MsgCreateValidator.typeUrl || Description.is(o.description) && CommissionRates.is(o.commission) && typeof o.minSelfDelegation === "string" && typeof o.delegatorAddress === "string" && typeof o.validatorAddress === "string" && Coin.is(o.value));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgCreateValidator.typeUrl || Description.isSDK(o.description) && CommissionRates.isSDK(o.commission) && typeof o.min_self_delegation === "string" && typeof o.delegator_address === "string" && typeof o.validator_address === "string" && Coin.isSDK(o.value));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgCreateValidator.typeUrl || Description.isAmino(o.description) && CommissionRates.isAmino(o.commission) && typeof o.min_self_delegation === "string" && typeof o.delegator_address === "string" && typeof o.validator_address === "string" && Coin.isAmino(o.value));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.description !== undefined) {
            Description.encode(message.description, writer.uint32(10).fork()).ldelim();
        }
        if (message.commission !== undefined) {
            CommissionRates.encode(message.commission, writer.uint32(18).fork()).ldelim();
        }
        if (message.minSelfDelegation !== "") {
            writer.uint32(26).string(message.minSelfDelegation);
        }
        if (message.delegatorAddress !== "") {
            writer.uint32(34).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(42).string(message.validatorAddress);
        }
        if (message.pubkey !== undefined) {
            Any.encode(GlobalDecoderRegistry.wrapAny(message.pubkey), writer.uint32(50).fork()).ldelim();
        }
        if (message.value !== undefined) {
            Coin.encode(message.value, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.description = Description.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.commission = CommissionRates.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.minSelfDelegation = reader.string();
                    break;
                case 4:
                    message.delegatorAddress = reader.string();
                    break;
                case 5:
                    message.validatorAddress = reader.string();
                    break;
                case 6:
                    message.pubkey = GlobalDecoderRegistry.unwrapAny(reader);
                    break;
                case 7:
                    message.value = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgCreateValidator();
        message.description = object.description !== undefined && object.description !== null ? Description.fromPartial(object.description) : undefined;
        message.commission = object.commission !== undefined && object.commission !== null ? CommissionRates.fromPartial(object.commission) : undefined;
        message.minSelfDelegation = object.minSelfDelegation ?? "";
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        message.pubkey = object.pubkey !== undefined && object.pubkey !== null ? GlobalDecoderRegistry.fromPartial(object.pubkey) : undefined;
        message.value = object.value !== undefined && object.value !== null ? Coin.fromPartial(object.value) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCreateValidator();
        if (object.description !== undefined && object.description !== null) {
            message.description = Description.fromAmino(object.description);
        }
        if (object.commission !== undefined && object.commission !== null) {
            message.commission = CommissionRates.fromAmino(object.commission);
        }
        if (object.min_self_delegation !== undefined && object.min_self_delegation !== null) {
            message.minSelfDelegation = object.min_self_delegation;
        }
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.pubkey !== undefined && object.pubkey !== null) {
            message.pubkey = encodePubkey(object.pubkey);
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = Coin.fromAmino(object.value);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.description = message.description ? Description.toAmino(message.description) : Description.toAmino(Description.fromPartial({}));
        obj.commission = message.commission ? CommissionRates.toAmino(message.commission) : CommissionRates.toAmino(CommissionRates.fromPartial({}));
        obj.min_self_delegation = message.minSelfDelegation ?? "";
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.pubkey = message.pubkey ? decodePubkey(message.pubkey) : undefined;
        obj.value = message.value ? Coin.toAmino(message.value) : Coin.toAmino(Coin.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCreateValidator.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgCreateValidator",
            value: MsgCreateValidator.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgCreateValidator.decode(message.value);
    },
    toProto(message) {
        return MsgCreateValidator.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
            value: MsgCreateValidator.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCreateValidator.typeUrl, MsgCreateValidator);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCreateValidator.aminoType, MsgCreateValidator.typeUrl);
function createBaseMsgCreateValidatorResponse() {
    return {};
}
export const MsgCreateValidatorResponse = {
    typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidatorResponse",
    aminoType: "cosmos-sdk/MsgCreateValidatorResponse",
    is(o) {
        return o && o.$typeUrl === MsgCreateValidatorResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgCreateValidatorResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgCreateValidatorResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateValidatorResponse();
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
        const message = createBaseMsgCreateValidatorResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgCreateValidatorResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCreateValidatorResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgCreateValidatorResponse",
            value: MsgCreateValidatorResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgCreateValidatorResponse.decode(message.value);
    },
    toProto(message) {
        return MsgCreateValidatorResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidatorResponse",
            value: MsgCreateValidatorResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCreateValidatorResponse.typeUrl, MsgCreateValidatorResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCreateValidatorResponse.aminoType, MsgCreateValidatorResponse.typeUrl);
function createBaseMsgEditValidator() {
    return {
        description: Description.fromPartial({}),
        validatorAddress: "",
        commissionRate: "",
        minSelfDelegation: ""
    };
}
export const MsgEditValidator = {
    typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator",
    aminoType: "cosmos-sdk/MsgEditValidator",
    is(o) {
        return o && (o.$typeUrl === MsgEditValidator.typeUrl || Description.is(o.description) && typeof o.validatorAddress === "string" && typeof o.commissionRate === "string" && typeof o.minSelfDelegation === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgEditValidator.typeUrl || Description.isSDK(o.description) && typeof o.validator_address === "string" && typeof o.commission_rate === "string" && typeof o.min_self_delegation === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgEditValidator.typeUrl || Description.isAmino(o.description) && typeof o.validator_address === "string" && typeof o.commission_rate === "string" && typeof o.min_self_delegation === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.description !== undefined) {
            Description.encode(message.description, writer.uint32(10).fork()).ldelim();
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        if (message.commissionRate !== "") {
            writer.uint32(26).string(Decimal.fromUserInput(message.commissionRate, 18).atomics);
        }
        if (message.minSelfDelegation !== "") {
            writer.uint32(34).string(message.minSelfDelegation);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgEditValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.description = Description.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.validatorAddress = reader.string();
                    break;
                case 3:
                    message.commissionRate = Decimal.fromAtomics(reader.string(), 18).toString();
                    break;
                case 4:
                    message.minSelfDelegation = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgEditValidator();
        message.description = object.description !== undefined && object.description !== null ? Description.fromPartial(object.description) : undefined;
        message.validatorAddress = object.validatorAddress ?? "";
        message.commissionRate = object.commissionRate ?? "";
        message.minSelfDelegation = object.minSelfDelegation ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgEditValidator();
        if (object.description !== undefined && object.description !== null) {
            message.description = Description.fromAmino(object.description);
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.commission_rate !== undefined && object.commission_rate !== null) {
            message.commissionRate = object.commission_rate;
        }
        if (object.min_self_delegation !== undefined && object.min_self_delegation !== null) {
            message.minSelfDelegation = object.min_self_delegation;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.description = message.description ? Description.toAmino(message.description) : Description.toAmino(Description.fromPartial({}));
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.commission_rate = message.commissionRate === "" ? undefined : message.commissionRate;
        obj.min_self_delegation = message.minSelfDelegation === "" ? undefined : message.minSelfDelegation;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgEditValidator.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgEditValidator",
            value: MsgEditValidator.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgEditValidator.decode(message.value);
    },
    toProto(message) {
        return MsgEditValidator.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator",
            value: MsgEditValidator.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgEditValidator.typeUrl, MsgEditValidator);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgEditValidator.aminoType, MsgEditValidator.typeUrl);
function createBaseMsgEditValidatorResponse() {
    return {};
}
export const MsgEditValidatorResponse = {
    typeUrl: "/cosmos.staking.v1beta1.MsgEditValidatorResponse",
    aminoType: "cosmos-sdk/MsgEditValidatorResponse",
    is(o) {
        return o && o.$typeUrl === MsgEditValidatorResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgEditValidatorResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgEditValidatorResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgEditValidatorResponse();
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
        const message = createBaseMsgEditValidatorResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgEditValidatorResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgEditValidatorResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgEditValidatorResponse",
            value: MsgEditValidatorResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgEditValidatorResponse.decode(message.value);
    },
    toProto(message) {
        return MsgEditValidatorResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgEditValidatorResponse",
            value: MsgEditValidatorResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgEditValidatorResponse.typeUrl, MsgEditValidatorResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgEditValidatorResponse.aminoType, MsgEditValidatorResponse.typeUrl);
function createBaseMsgDelegate() {
    return {
        delegatorAddress: "",
        validatorAddress: "",
        amount: Coin.fromPartial({})
    };
}
export const MsgDelegate = {
    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
    aminoType: "cosmos-sdk/MsgDelegate",
    is(o) {
        return o && (o.$typeUrl === MsgDelegate.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorAddress === "string" && Coin.is(o.amount));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgDelegate.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && Coin.isSDK(o.amount));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgDelegate.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && Coin.isAmino(o.amount));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        if (message.amount !== undefined) {
            Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDelegate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                case 2:
                    message.validatorAddress = reader.string();
                    break;
                case 3:
                    message.amount = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgDelegate();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgDelegate();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Coin.fromAmino(object.amount);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.amount = message.amount ? Coin.toAmino(message.amount) : Coin.toAmino(Coin.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return MsgDelegate.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgDelegate",
            value: MsgDelegate.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgDelegate.decode(message.value);
    },
    toProto(message) {
        return MsgDelegate.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
            value: MsgDelegate.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDelegate.typeUrl, MsgDelegate);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgDelegate.aminoType, MsgDelegate.typeUrl);
function createBaseMsgDelegateResponse() {
    return {};
}
export const MsgDelegateResponse = {
    typeUrl: "/cosmos.staking.v1beta1.MsgDelegateResponse",
    aminoType: "cosmos-sdk/MsgDelegateResponse",
    is(o) {
        return o && o.$typeUrl === MsgDelegateResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgDelegateResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgDelegateResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDelegateResponse();
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
        const message = createBaseMsgDelegateResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgDelegateResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgDelegateResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgDelegateResponse",
            value: MsgDelegateResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgDelegateResponse.decode(message.value);
    },
    toProto(message) {
        return MsgDelegateResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgDelegateResponse",
            value: MsgDelegateResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgDelegateResponse.typeUrl, MsgDelegateResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgDelegateResponse.aminoType, MsgDelegateResponse.typeUrl);
function createBaseMsgBeginRedelegate() {
    return {
        delegatorAddress: "",
        validatorSrcAddress: "",
        validatorDstAddress: "",
        amount: Coin.fromPartial({})
    };
}
export const MsgBeginRedelegate = {
    typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
    aminoType: "cosmos-sdk/MsgBeginRedelegate",
    is(o) {
        return o && (o.$typeUrl === MsgBeginRedelegate.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorSrcAddress === "string" && typeof o.validatorDstAddress === "string" && Coin.is(o.amount));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgBeginRedelegate.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_src_address === "string" && typeof o.validator_dst_address === "string" && Coin.isSDK(o.amount));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgBeginRedelegate.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_src_address === "string" && typeof o.validator_dst_address === "string" && Coin.isAmino(o.amount));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorSrcAddress !== "") {
            writer.uint32(18).string(message.validatorSrcAddress);
        }
        if (message.validatorDstAddress !== "") {
            writer.uint32(26).string(message.validatorDstAddress);
        }
        if (message.amount !== undefined) {
            Coin.encode(message.amount, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBeginRedelegate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                case 2:
                    message.validatorSrcAddress = reader.string();
                    break;
                case 3:
                    message.validatorDstAddress = reader.string();
                    break;
                case 4:
                    message.amount = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgBeginRedelegate();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorSrcAddress = object.validatorSrcAddress ?? "";
        message.validatorDstAddress = object.validatorDstAddress ?? "";
        message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgBeginRedelegate();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.validator_src_address !== undefined && object.validator_src_address !== null) {
            message.validatorSrcAddress = object.validator_src_address;
        }
        if (object.validator_dst_address !== undefined && object.validator_dst_address !== null) {
            message.validatorDstAddress = object.validator_dst_address;
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Coin.fromAmino(object.amount);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.validator_src_address = message.validatorSrcAddress === "" ? undefined : message.validatorSrcAddress;
        obj.validator_dst_address = message.validatorDstAddress === "" ? undefined : message.validatorDstAddress;
        obj.amount = message.amount ? Coin.toAmino(message.amount) : Coin.toAmino(Coin.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return MsgBeginRedelegate.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgBeginRedelegate",
            value: MsgBeginRedelegate.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgBeginRedelegate.decode(message.value);
    },
    toProto(message) {
        return MsgBeginRedelegate.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
            value: MsgBeginRedelegate.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgBeginRedelegate.typeUrl, MsgBeginRedelegate);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgBeginRedelegate.aminoType, MsgBeginRedelegate.typeUrl);
function createBaseMsgBeginRedelegateResponse() {
    return {
        completionTime: new Date()
    };
}
export const MsgBeginRedelegateResponse = {
    typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegateResponse",
    aminoType: "cosmos-sdk/MsgBeginRedelegateResponse",
    is(o) {
        return o && (o.$typeUrl === MsgBeginRedelegateResponse.typeUrl || Timestamp.is(o.completionTime));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgBeginRedelegateResponse.typeUrl || Timestamp.isSDK(o.completion_time));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgBeginRedelegateResponse.typeUrl || Timestamp.isAmino(o.completion_time));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.completionTime !== undefined) {
            Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBeginRedelegateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgBeginRedelegateResponse();
        message.completionTime = object.completionTime ?? undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgBeginRedelegateResponse();
        if (object.completion_time !== undefined && object.completion_time !== null) {
            message.completionTime = fromTimestamp(Timestamp.fromAmino(object.completion_time));
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.completion_time = message.completionTime ? Timestamp.toAmino(toTimestamp(message.completionTime)) : new Date();
        return obj;
    },
    fromAminoMsg(object) {
        return MsgBeginRedelegateResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgBeginRedelegateResponse",
            value: MsgBeginRedelegateResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgBeginRedelegateResponse.decode(message.value);
    },
    toProto(message) {
        return MsgBeginRedelegateResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegateResponse",
            value: MsgBeginRedelegateResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgBeginRedelegateResponse.typeUrl, MsgBeginRedelegateResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgBeginRedelegateResponse.aminoType, MsgBeginRedelegateResponse.typeUrl);
function createBaseMsgUndelegate() {
    return {
        delegatorAddress: "",
        validatorAddress: "",
        amount: Coin.fromPartial({})
    };
}
export const MsgUndelegate = {
    typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
    aminoType: "cosmos-sdk/MsgUndelegate",
    is(o) {
        return o && (o.$typeUrl === MsgUndelegate.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorAddress === "string" && Coin.is(o.amount));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUndelegate.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && Coin.isSDK(o.amount));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUndelegate.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && Coin.isAmino(o.amount));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        if (message.amount !== undefined) {
            Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUndelegate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                case 2:
                    message.validatorAddress = reader.string();
                    break;
                case 3:
                    message.amount = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUndelegate();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUndelegate();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Coin.fromAmino(object.amount);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.amount = message.amount ? Coin.toAmino(message.amount) : Coin.toAmino(Coin.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUndelegate.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgUndelegate",
            value: MsgUndelegate.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgUndelegate.decode(message.value);
    },
    toProto(message) {
        return MsgUndelegate.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
            value: MsgUndelegate.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUndelegate.typeUrl, MsgUndelegate);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgUndelegate.aminoType, MsgUndelegate.typeUrl);
function createBaseMsgUndelegateResponse() {
    return {
        completionTime: new Date(),
        amount: Coin.fromPartial({})
    };
}
export const MsgUndelegateResponse = {
    typeUrl: "/cosmos.staking.v1beta1.MsgUndelegateResponse",
    aminoType: "cosmos-sdk/MsgUndelegateResponse",
    is(o) {
        return o && (o.$typeUrl === MsgUndelegateResponse.typeUrl || Timestamp.is(o.completionTime) && Coin.is(o.amount));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUndelegateResponse.typeUrl || Timestamp.isSDK(o.completion_time) && Coin.isSDK(o.amount));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUndelegateResponse.typeUrl || Timestamp.isAmino(o.completion_time) && Coin.isAmino(o.amount));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.completionTime !== undefined) {
            Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(10).fork()).ldelim();
        }
        if (message.amount !== undefined) {
            Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUndelegateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.amount = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUndelegateResponse();
        message.completionTime = object.completionTime ?? undefined;
        message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUndelegateResponse();
        if (object.completion_time !== undefined && object.completion_time !== null) {
            message.completionTime = fromTimestamp(Timestamp.fromAmino(object.completion_time));
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Coin.fromAmino(object.amount);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.completion_time = message.completionTime ? Timestamp.toAmino(toTimestamp(message.completionTime)) : new Date();
        obj.amount = message.amount ? Coin.toAmino(message.amount) : Coin.toAmino(Coin.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUndelegateResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgUndelegateResponse",
            value: MsgUndelegateResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgUndelegateResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUndelegateResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgUndelegateResponse",
            value: MsgUndelegateResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUndelegateResponse.typeUrl, MsgUndelegateResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgUndelegateResponse.aminoType, MsgUndelegateResponse.typeUrl);
function createBaseMsgCancelUnbondingDelegation() {
    return {
        delegatorAddress: "",
        validatorAddress: "",
        amount: Coin.fromPartial({}),
        creationHeight: BigInt(0)
    };
}
export const MsgCancelUnbondingDelegation = {
    typeUrl: "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation",
    aminoType: "cosmos-sdk/MsgCancelUnbondingDelegation",
    is(o) {
        return o && (o.$typeUrl === MsgCancelUnbondingDelegation.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorAddress === "string" && Coin.is(o.amount) && typeof o.creationHeight === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgCancelUnbondingDelegation.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && Coin.isSDK(o.amount) && typeof o.creation_height === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgCancelUnbondingDelegation.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && Coin.isAmino(o.amount) && typeof o.creation_height === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        if (message.amount !== undefined) {
            Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
        }
        if (message.creationHeight !== BigInt(0)) {
            writer.uint32(32).int64(message.creationHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelUnbondingDelegation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                case 2:
                    message.validatorAddress = reader.string();
                    break;
                case 3:
                    message.amount = Coin.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.creationHeight = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgCancelUnbondingDelegation();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
        message.creationHeight = object.creationHeight !== undefined && object.creationHeight !== null ? BigInt(object.creationHeight.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCancelUnbondingDelegation();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Coin.fromAmino(object.amount);
        }
        if (object.creation_height !== undefined && object.creation_height !== null) {
            message.creationHeight = BigInt(object.creation_height);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.amount = message.amount ? Coin.toAmino(message.amount) : Coin.toAmino(Coin.fromPartial({}));
        obj.creation_height = message.creationHeight !== BigInt(0) ? message.creationHeight?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCancelUnbondingDelegation.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgCancelUnbondingDelegation",
            value: MsgCancelUnbondingDelegation.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgCancelUnbondingDelegation.decode(message.value);
    },
    toProto(message) {
        return MsgCancelUnbondingDelegation.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation",
            value: MsgCancelUnbondingDelegation.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCancelUnbondingDelegation.typeUrl, MsgCancelUnbondingDelegation);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCancelUnbondingDelegation.aminoType, MsgCancelUnbondingDelegation.typeUrl);
function createBaseMsgCancelUnbondingDelegationResponse() {
    return {};
}
export const MsgCancelUnbondingDelegationResponse = {
    typeUrl: "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegationResponse",
    aminoType: "cosmos-sdk/MsgCancelUnbondingDelegationResponse",
    is(o) {
        return o && o.$typeUrl === MsgCancelUnbondingDelegationResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgCancelUnbondingDelegationResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgCancelUnbondingDelegationResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelUnbondingDelegationResponse();
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
        const message = createBaseMsgCancelUnbondingDelegationResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgCancelUnbondingDelegationResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCancelUnbondingDelegationResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgCancelUnbondingDelegationResponse",
            value: MsgCancelUnbondingDelegationResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return MsgCancelUnbondingDelegationResponse.decode(message.value);
    },
    toProto(message) {
        return MsgCancelUnbondingDelegationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegationResponse",
            value: MsgCancelUnbondingDelegationResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCancelUnbondingDelegationResponse.typeUrl, MsgCancelUnbondingDelegationResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgCancelUnbondingDelegationResponse.aminoType, MsgCancelUnbondingDelegationResponse.typeUrl);
function createBaseMsgUpdateParams() {
    return {
        authority: "",
        params: Params.fromPartial({})
    };
}
export const MsgUpdateParams = {
    typeUrl: "/cosmos.staking.v1beta1.MsgUpdateParams",
    aminoType: "cosmos-sdk/x/staking/MsgUpdateParams",
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
            type: "cosmos-sdk/x/staking/MsgUpdateParams",
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
            typeUrl: "/cosmos.staking.v1beta1.MsgUpdateParams",
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
    typeUrl: "/cosmos.staking.v1beta1.MsgUpdateParamsResponse",
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
            typeUrl: "/cosmos.staking.v1beta1.MsgUpdateParamsResponse",
            value: MsgUpdateParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateParamsResponse.typeUrl, MsgUpdateParamsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(MsgUpdateParamsResponse.aminoType, MsgUpdateParamsResponse.typeUrl);
