//@ts-nocheck
import { DecCoin } from "../../base/v1beta1/coin";
import { ValidatorAccumulatedCommission, ValidatorHistoricalRewards, ValidatorCurrentRewards, DelegatorStartingInfo, ValidatorSlashEvent, Params, FeePool } from "./distribution";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
function createBaseDelegatorWithdrawInfo() {
    return {
        delegatorAddress: "",
        withdrawAddress: ""
    };
}
export const DelegatorWithdrawInfo = {
    typeUrl: "/cosmos.distribution.v1beta1.DelegatorWithdrawInfo",
    aminoType: "cosmos-sdk/DelegatorWithdrawInfo",
    is(o) {
        return o && (o.$typeUrl === DelegatorWithdrawInfo.typeUrl || typeof o.delegatorAddress === "string" && typeof o.withdrawAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === DelegatorWithdrawInfo.typeUrl || typeof o.delegator_address === "string" && typeof o.withdraw_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === DelegatorWithdrawInfo.typeUrl || typeof o.delegator_address === "string" && typeof o.withdraw_address === "string");
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
        const message = createBaseDelegatorWithdrawInfo();
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
        const message = createBaseDelegatorWithdrawInfo();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.withdrawAddress = object.withdrawAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseDelegatorWithdrawInfo();
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
        return DelegatorWithdrawInfo.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/DelegatorWithdrawInfo",
            value: DelegatorWithdrawInfo.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return DelegatorWithdrawInfo.decode(message.value);
    },
    toProto(message) {
        return DelegatorWithdrawInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.DelegatorWithdrawInfo",
            value: DelegatorWithdrawInfo.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(DelegatorWithdrawInfo.typeUrl, DelegatorWithdrawInfo);
GlobalDecoderRegistry.registerAminoProtoMapping(DelegatorWithdrawInfo.aminoType, DelegatorWithdrawInfo.typeUrl);
function createBaseValidatorOutstandingRewardsRecord() {
    return {
        validatorAddress: "",
        outstandingRewards: []
    };
}
export const ValidatorOutstandingRewardsRecord = {
    typeUrl: "/cosmos.distribution.v1beta1.ValidatorOutstandingRewardsRecord",
    aminoType: "cosmos-sdk/ValidatorOutstandingRewardsRecord",
    is(o) {
        return o && (o.$typeUrl === ValidatorOutstandingRewardsRecord.typeUrl || typeof o.validatorAddress === "string" && Array.isArray(o.outstandingRewards) && (!o.outstandingRewards.length || DecCoin.is(o.outstandingRewards[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ValidatorOutstandingRewardsRecord.typeUrl || typeof o.validator_address === "string" && Array.isArray(o.outstanding_rewards) && (!o.outstanding_rewards.length || DecCoin.isSDK(o.outstanding_rewards[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ValidatorOutstandingRewardsRecord.typeUrl || typeof o.validator_address === "string" && Array.isArray(o.outstanding_rewards) && (!o.outstanding_rewards.length || DecCoin.isAmino(o.outstanding_rewards[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        for (const v of message.outstandingRewards) {
            DecCoin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorOutstandingRewardsRecord();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddress = reader.string();
                    break;
                case 2:
                    message.outstandingRewards.push(DecCoin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValidatorOutstandingRewardsRecord();
        message.validatorAddress = object.validatorAddress ?? "";
        message.outstandingRewards = object.outstandingRewards?.map(e => DecCoin.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseValidatorOutstandingRewardsRecord();
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        message.outstandingRewards = object.outstanding_rewards?.map(e => DecCoin.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        if (message.outstandingRewards) {
            obj.outstanding_rewards = message.outstandingRewards.map(e => e ? DecCoin.toAmino(e) : undefined);
        }
        else {
            obj.outstanding_rewards = message.outstandingRewards;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return ValidatorOutstandingRewardsRecord.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ValidatorOutstandingRewardsRecord",
            value: ValidatorOutstandingRewardsRecord.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ValidatorOutstandingRewardsRecord.decode(message.value);
    },
    toProto(message) {
        return ValidatorOutstandingRewardsRecord.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.ValidatorOutstandingRewardsRecord",
            value: ValidatorOutstandingRewardsRecord.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ValidatorOutstandingRewardsRecord.typeUrl, ValidatorOutstandingRewardsRecord);
GlobalDecoderRegistry.registerAminoProtoMapping(ValidatorOutstandingRewardsRecord.aminoType, ValidatorOutstandingRewardsRecord.typeUrl);
function createBaseValidatorAccumulatedCommissionRecord() {
    return {
        validatorAddress: "",
        accumulated: ValidatorAccumulatedCommission.fromPartial({})
    };
}
export const ValidatorAccumulatedCommissionRecord = {
    typeUrl: "/cosmos.distribution.v1beta1.ValidatorAccumulatedCommissionRecord",
    aminoType: "cosmos-sdk/ValidatorAccumulatedCommissionRecord",
    is(o) {
        return o && (o.$typeUrl === ValidatorAccumulatedCommissionRecord.typeUrl || typeof o.validatorAddress === "string" && ValidatorAccumulatedCommission.is(o.accumulated));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ValidatorAccumulatedCommissionRecord.typeUrl || typeof o.validator_address === "string" && ValidatorAccumulatedCommission.isSDK(o.accumulated));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ValidatorAccumulatedCommissionRecord.typeUrl || typeof o.validator_address === "string" && ValidatorAccumulatedCommission.isAmino(o.accumulated));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        if (message.accumulated !== undefined) {
            ValidatorAccumulatedCommission.encode(message.accumulated, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorAccumulatedCommissionRecord();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddress = reader.string();
                    break;
                case 2:
                    message.accumulated = ValidatorAccumulatedCommission.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValidatorAccumulatedCommissionRecord();
        message.validatorAddress = object.validatorAddress ?? "";
        message.accumulated = object.accumulated !== undefined && object.accumulated !== null ? ValidatorAccumulatedCommission.fromPartial(object.accumulated) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseValidatorAccumulatedCommissionRecord();
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.accumulated !== undefined && object.accumulated !== null) {
            message.accumulated = ValidatorAccumulatedCommission.fromAmino(object.accumulated);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.accumulated = message.accumulated ? ValidatorAccumulatedCommission.toAmino(message.accumulated) : ValidatorAccumulatedCommission.toAmino(ValidatorAccumulatedCommission.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return ValidatorAccumulatedCommissionRecord.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ValidatorAccumulatedCommissionRecord",
            value: ValidatorAccumulatedCommissionRecord.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ValidatorAccumulatedCommissionRecord.decode(message.value);
    },
    toProto(message) {
        return ValidatorAccumulatedCommissionRecord.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.ValidatorAccumulatedCommissionRecord",
            value: ValidatorAccumulatedCommissionRecord.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ValidatorAccumulatedCommissionRecord.typeUrl, ValidatorAccumulatedCommissionRecord);
GlobalDecoderRegistry.registerAminoProtoMapping(ValidatorAccumulatedCommissionRecord.aminoType, ValidatorAccumulatedCommissionRecord.typeUrl);
function createBaseValidatorHistoricalRewardsRecord() {
    return {
        validatorAddress: "",
        period: BigInt(0),
        rewards: ValidatorHistoricalRewards.fromPartial({})
    };
}
export const ValidatorHistoricalRewardsRecord = {
    typeUrl: "/cosmos.distribution.v1beta1.ValidatorHistoricalRewardsRecord",
    aminoType: "cosmos-sdk/ValidatorHistoricalRewardsRecord",
    is(o) {
        return o && (o.$typeUrl === ValidatorHistoricalRewardsRecord.typeUrl || typeof o.validatorAddress === "string" && typeof o.period === "bigint" && ValidatorHistoricalRewards.is(o.rewards));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ValidatorHistoricalRewardsRecord.typeUrl || typeof o.validator_address === "string" && typeof o.period === "bigint" && ValidatorHistoricalRewards.isSDK(o.rewards));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ValidatorHistoricalRewardsRecord.typeUrl || typeof o.validator_address === "string" && typeof o.period === "bigint" && ValidatorHistoricalRewards.isAmino(o.rewards));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        if (message.period !== BigInt(0)) {
            writer.uint32(16).uint64(message.period);
        }
        if (message.rewards !== undefined) {
            ValidatorHistoricalRewards.encode(message.rewards, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorHistoricalRewardsRecord();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddress = reader.string();
                    break;
                case 2:
                    message.period = reader.uint64();
                    break;
                case 3:
                    message.rewards = ValidatorHistoricalRewards.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValidatorHistoricalRewardsRecord();
        message.validatorAddress = object.validatorAddress ?? "";
        message.period = object.period !== undefined && object.period !== null ? BigInt(object.period.toString()) : BigInt(0);
        message.rewards = object.rewards !== undefined && object.rewards !== null ? ValidatorHistoricalRewards.fromPartial(object.rewards) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseValidatorHistoricalRewardsRecord();
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.period !== undefined && object.period !== null) {
            message.period = BigInt(object.period);
        }
        if (object.rewards !== undefined && object.rewards !== null) {
            message.rewards = ValidatorHistoricalRewards.fromAmino(object.rewards);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.period = message.period !== BigInt(0) ? message.period?.toString() : undefined;
        obj.rewards = message.rewards ? ValidatorHistoricalRewards.toAmino(message.rewards) : ValidatorHistoricalRewards.toAmino(ValidatorHistoricalRewards.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return ValidatorHistoricalRewardsRecord.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ValidatorHistoricalRewardsRecord",
            value: ValidatorHistoricalRewardsRecord.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ValidatorHistoricalRewardsRecord.decode(message.value);
    },
    toProto(message) {
        return ValidatorHistoricalRewardsRecord.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.ValidatorHistoricalRewardsRecord",
            value: ValidatorHistoricalRewardsRecord.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ValidatorHistoricalRewardsRecord.typeUrl, ValidatorHistoricalRewardsRecord);
GlobalDecoderRegistry.registerAminoProtoMapping(ValidatorHistoricalRewardsRecord.aminoType, ValidatorHistoricalRewardsRecord.typeUrl);
function createBaseValidatorCurrentRewardsRecord() {
    return {
        validatorAddress: "",
        rewards: ValidatorCurrentRewards.fromPartial({})
    };
}
export const ValidatorCurrentRewardsRecord = {
    typeUrl: "/cosmos.distribution.v1beta1.ValidatorCurrentRewardsRecord",
    aminoType: "cosmos-sdk/ValidatorCurrentRewardsRecord",
    is(o) {
        return o && (o.$typeUrl === ValidatorCurrentRewardsRecord.typeUrl || typeof o.validatorAddress === "string" && ValidatorCurrentRewards.is(o.rewards));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ValidatorCurrentRewardsRecord.typeUrl || typeof o.validator_address === "string" && ValidatorCurrentRewards.isSDK(o.rewards));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ValidatorCurrentRewardsRecord.typeUrl || typeof o.validator_address === "string" && ValidatorCurrentRewards.isAmino(o.rewards));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        if (message.rewards !== undefined) {
            ValidatorCurrentRewards.encode(message.rewards, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorCurrentRewardsRecord();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddress = reader.string();
                    break;
                case 2:
                    message.rewards = ValidatorCurrentRewards.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValidatorCurrentRewardsRecord();
        message.validatorAddress = object.validatorAddress ?? "";
        message.rewards = object.rewards !== undefined && object.rewards !== null ? ValidatorCurrentRewards.fromPartial(object.rewards) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseValidatorCurrentRewardsRecord();
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.rewards !== undefined && object.rewards !== null) {
            message.rewards = ValidatorCurrentRewards.fromAmino(object.rewards);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.rewards = message.rewards ? ValidatorCurrentRewards.toAmino(message.rewards) : ValidatorCurrentRewards.toAmino(ValidatorCurrentRewards.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return ValidatorCurrentRewardsRecord.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ValidatorCurrentRewardsRecord",
            value: ValidatorCurrentRewardsRecord.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ValidatorCurrentRewardsRecord.decode(message.value);
    },
    toProto(message) {
        return ValidatorCurrentRewardsRecord.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.ValidatorCurrentRewardsRecord",
            value: ValidatorCurrentRewardsRecord.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ValidatorCurrentRewardsRecord.typeUrl, ValidatorCurrentRewardsRecord);
GlobalDecoderRegistry.registerAminoProtoMapping(ValidatorCurrentRewardsRecord.aminoType, ValidatorCurrentRewardsRecord.typeUrl);
function createBaseDelegatorStartingInfoRecord() {
    return {
        delegatorAddress: "",
        validatorAddress: "",
        startingInfo: DelegatorStartingInfo.fromPartial({})
    };
}
export const DelegatorStartingInfoRecord = {
    typeUrl: "/cosmos.distribution.v1beta1.DelegatorStartingInfoRecord",
    aminoType: "cosmos-sdk/DelegatorStartingInfoRecord",
    is(o) {
        return o && (o.$typeUrl === DelegatorStartingInfoRecord.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorAddress === "string" && DelegatorStartingInfo.is(o.startingInfo));
    },
    isSDK(o) {
        return o && (o.$typeUrl === DelegatorStartingInfoRecord.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && DelegatorStartingInfo.isSDK(o.starting_info));
    },
    isAmino(o) {
        return o && (o.$typeUrl === DelegatorStartingInfoRecord.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && DelegatorStartingInfo.isAmino(o.starting_info));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        if (message.startingInfo !== undefined) {
            DelegatorStartingInfo.encode(message.startingInfo, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDelegatorStartingInfoRecord();
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
                    message.startingInfo = DelegatorStartingInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDelegatorStartingInfoRecord();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        message.startingInfo = object.startingInfo !== undefined && object.startingInfo !== null ? DelegatorStartingInfo.fromPartial(object.startingInfo) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseDelegatorStartingInfoRecord();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.starting_info !== undefined && object.starting_info !== null) {
            message.startingInfo = DelegatorStartingInfo.fromAmino(object.starting_info);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.starting_info = message.startingInfo ? DelegatorStartingInfo.toAmino(message.startingInfo) : DelegatorStartingInfo.toAmino(DelegatorStartingInfo.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return DelegatorStartingInfoRecord.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/DelegatorStartingInfoRecord",
            value: DelegatorStartingInfoRecord.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return DelegatorStartingInfoRecord.decode(message.value);
    },
    toProto(message) {
        return DelegatorStartingInfoRecord.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.DelegatorStartingInfoRecord",
            value: DelegatorStartingInfoRecord.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(DelegatorStartingInfoRecord.typeUrl, DelegatorStartingInfoRecord);
GlobalDecoderRegistry.registerAminoProtoMapping(DelegatorStartingInfoRecord.aminoType, DelegatorStartingInfoRecord.typeUrl);
function createBaseValidatorSlashEventRecord() {
    return {
        validatorAddress: "",
        height: BigInt(0),
        period: BigInt(0),
        validatorSlashEvent: ValidatorSlashEvent.fromPartial({})
    };
}
export const ValidatorSlashEventRecord = {
    typeUrl: "/cosmos.distribution.v1beta1.ValidatorSlashEventRecord",
    aminoType: "cosmos-sdk/ValidatorSlashEventRecord",
    is(o) {
        return o && (o.$typeUrl === ValidatorSlashEventRecord.typeUrl || typeof o.validatorAddress === "string" && typeof o.height === "bigint" && typeof o.period === "bigint" && ValidatorSlashEvent.is(o.validatorSlashEvent));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ValidatorSlashEventRecord.typeUrl || typeof o.validator_address === "string" && typeof o.height === "bigint" && typeof o.period === "bigint" && ValidatorSlashEvent.isSDK(o.validator_slash_event));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ValidatorSlashEventRecord.typeUrl || typeof o.validator_address === "string" && typeof o.height === "bigint" && typeof o.period === "bigint" && ValidatorSlashEvent.isAmino(o.validator_slash_event));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        if (message.height !== BigInt(0)) {
            writer.uint32(16).uint64(message.height);
        }
        if (message.period !== BigInt(0)) {
            writer.uint32(24).uint64(message.period);
        }
        if (message.validatorSlashEvent !== undefined) {
            ValidatorSlashEvent.encode(message.validatorSlashEvent, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorSlashEventRecord();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddress = reader.string();
                    break;
                case 2:
                    message.height = reader.uint64();
                    break;
                case 3:
                    message.period = reader.uint64();
                    break;
                case 4:
                    message.validatorSlashEvent = ValidatorSlashEvent.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValidatorSlashEventRecord();
        message.validatorAddress = object.validatorAddress ?? "";
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.period = object.period !== undefined && object.period !== null ? BigInt(object.period.toString()) : BigInt(0);
        message.validatorSlashEvent = object.validatorSlashEvent !== undefined && object.validatorSlashEvent !== null ? ValidatorSlashEvent.fromPartial(object.validatorSlashEvent) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseValidatorSlashEventRecord();
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.period !== undefined && object.period !== null) {
            message.period = BigInt(object.period);
        }
        if (object.validator_slash_event !== undefined && object.validator_slash_event !== null) {
            message.validatorSlashEvent = ValidatorSlashEvent.fromAmino(object.validator_slash_event);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.period = message.period !== BigInt(0) ? message.period?.toString() : undefined;
        obj.validator_slash_event = message.validatorSlashEvent ? ValidatorSlashEvent.toAmino(message.validatorSlashEvent) : ValidatorSlashEvent.toAmino(ValidatorSlashEvent.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return ValidatorSlashEventRecord.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ValidatorSlashEventRecord",
            value: ValidatorSlashEventRecord.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ValidatorSlashEventRecord.decode(message.value);
    },
    toProto(message) {
        return ValidatorSlashEventRecord.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.ValidatorSlashEventRecord",
            value: ValidatorSlashEventRecord.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ValidatorSlashEventRecord.typeUrl, ValidatorSlashEventRecord);
GlobalDecoderRegistry.registerAminoProtoMapping(ValidatorSlashEventRecord.aminoType, ValidatorSlashEventRecord.typeUrl);
function createBaseGenesisState() {
    return {
        params: Params.fromPartial({}),
        feePool: FeePool.fromPartial({}),
        delegatorWithdrawInfos: [],
        previousProposer: "",
        outstandingRewards: [],
        validatorAccumulatedCommissions: [],
        validatorHistoricalRewards: [],
        validatorCurrentRewards: [],
        delegatorStartingInfos: [],
        validatorSlashEvents: []
    };
}
export const GenesisState = {
    typeUrl: "/cosmos.distribution.v1beta1.GenesisState",
    aminoType: "cosmos-sdk/GenesisState",
    is(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Params.is(o.params) && FeePool.is(o.feePool) && Array.isArray(o.delegatorWithdrawInfos) && (!o.delegatorWithdrawInfos.length || DelegatorWithdrawInfo.is(o.delegatorWithdrawInfos[0])) && typeof o.previousProposer === "string" && Array.isArray(o.outstandingRewards) && (!o.outstandingRewards.length || ValidatorOutstandingRewardsRecord.is(o.outstandingRewards[0])) && Array.isArray(o.validatorAccumulatedCommissions) && (!o.validatorAccumulatedCommissions.length || ValidatorAccumulatedCommissionRecord.is(o.validatorAccumulatedCommissions[0])) && Array.isArray(o.validatorHistoricalRewards) && (!o.validatorHistoricalRewards.length || ValidatorHistoricalRewardsRecord.is(o.validatorHistoricalRewards[0])) && Array.isArray(o.validatorCurrentRewards) && (!o.validatorCurrentRewards.length || ValidatorCurrentRewardsRecord.is(o.validatorCurrentRewards[0])) && Array.isArray(o.delegatorStartingInfos) && (!o.delegatorStartingInfos.length || DelegatorStartingInfoRecord.is(o.delegatorStartingInfos[0])) && Array.isArray(o.validatorSlashEvents) && (!o.validatorSlashEvents.length || ValidatorSlashEventRecord.is(o.validatorSlashEvents[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Params.isSDK(o.params) && FeePool.isSDK(o.fee_pool) && Array.isArray(o.delegator_withdraw_infos) && (!o.delegator_withdraw_infos.length || DelegatorWithdrawInfo.isSDK(o.delegator_withdraw_infos[0])) && typeof o.previous_proposer === "string" && Array.isArray(o.outstanding_rewards) && (!o.outstanding_rewards.length || ValidatorOutstandingRewardsRecord.isSDK(o.outstanding_rewards[0])) && Array.isArray(o.validator_accumulated_commissions) && (!o.validator_accumulated_commissions.length || ValidatorAccumulatedCommissionRecord.isSDK(o.validator_accumulated_commissions[0])) && Array.isArray(o.validator_historical_rewards) && (!o.validator_historical_rewards.length || ValidatorHistoricalRewardsRecord.isSDK(o.validator_historical_rewards[0])) && Array.isArray(o.validator_current_rewards) && (!o.validator_current_rewards.length || ValidatorCurrentRewardsRecord.isSDK(o.validator_current_rewards[0])) && Array.isArray(o.delegator_starting_infos) && (!o.delegator_starting_infos.length || DelegatorStartingInfoRecord.isSDK(o.delegator_starting_infos[0])) && Array.isArray(o.validator_slash_events) && (!o.validator_slash_events.length || ValidatorSlashEventRecord.isSDK(o.validator_slash_events[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Params.isAmino(o.params) && FeePool.isAmino(o.fee_pool) && Array.isArray(o.delegator_withdraw_infos) && (!o.delegator_withdraw_infos.length || DelegatorWithdrawInfo.isAmino(o.delegator_withdraw_infos[0])) && typeof o.previous_proposer === "string" && Array.isArray(o.outstanding_rewards) && (!o.outstanding_rewards.length || ValidatorOutstandingRewardsRecord.isAmino(o.outstanding_rewards[0])) && Array.isArray(o.validator_accumulated_commissions) && (!o.validator_accumulated_commissions.length || ValidatorAccumulatedCommissionRecord.isAmino(o.validator_accumulated_commissions[0])) && Array.isArray(o.validator_historical_rewards) && (!o.validator_historical_rewards.length || ValidatorHistoricalRewardsRecord.isAmino(o.validator_historical_rewards[0])) && Array.isArray(o.validator_current_rewards) && (!o.validator_current_rewards.length || ValidatorCurrentRewardsRecord.isAmino(o.validator_current_rewards[0])) && Array.isArray(o.delegator_starting_infos) && (!o.delegator_starting_infos.length || DelegatorStartingInfoRecord.isAmino(o.delegator_starting_infos[0])) && Array.isArray(o.validator_slash_events) && (!o.validator_slash_events.length || ValidatorSlashEventRecord.isAmino(o.validator_slash_events[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        if (message.feePool !== undefined) {
            FeePool.encode(message.feePool, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.delegatorWithdrawInfos) {
            DelegatorWithdrawInfo.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.previousProposer !== "") {
            writer.uint32(34).string(message.previousProposer);
        }
        for (const v of message.outstandingRewards) {
            ValidatorOutstandingRewardsRecord.encode(v, writer.uint32(42).fork()).ldelim();
        }
        for (const v of message.validatorAccumulatedCommissions) {
            ValidatorAccumulatedCommissionRecord.encode(v, writer.uint32(50).fork()).ldelim();
        }
        for (const v of message.validatorHistoricalRewards) {
            ValidatorHistoricalRewardsRecord.encode(v, writer.uint32(58).fork()).ldelim();
        }
        for (const v of message.validatorCurrentRewards) {
            ValidatorCurrentRewardsRecord.encode(v, writer.uint32(66).fork()).ldelim();
        }
        for (const v of message.delegatorStartingInfos) {
            DelegatorStartingInfoRecord.encode(v, writer.uint32(74).fork()).ldelim();
        }
        for (const v of message.validatorSlashEvents) {
            ValidatorSlashEventRecord.encode(v, writer.uint32(82).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.feePool = FeePool.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.delegatorWithdrawInfos.push(DelegatorWithdrawInfo.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.previousProposer = reader.string();
                    break;
                case 5:
                    message.outstandingRewards.push(ValidatorOutstandingRewardsRecord.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.validatorAccumulatedCommissions.push(ValidatorAccumulatedCommissionRecord.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.validatorHistoricalRewards.push(ValidatorHistoricalRewardsRecord.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.validatorCurrentRewards.push(ValidatorCurrentRewardsRecord.decode(reader, reader.uint32()));
                    break;
                case 9:
                    message.delegatorStartingInfos.push(DelegatorStartingInfoRecord.decode(reader, reader.uint32()));
                    break;
                case 10:
                    message.validatorSlashEvents.push(ValidatorSlashEventRecord.decode(reader, reader.uint32()));
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
        message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
        message.feePool = object.feePool !== undefined && object.feePool !== null ? FeePool.fromPartial(object.feePool) : undefined;
        message.delegatorWithdrawInfos = object.delegatorWithdrawInfos?.map(e => DelegatorWithdrawInfo.fromPartial(e)) || [];
        message.previousProposer = object.previousProposer ?? "";
        message.outstandingRewards = object.outstandingRewards?.map(e => ValidatorOutstandingRewardsRecord.fromPartial(e)) || [];
        message.validatorAccumulatedCommissions = object.validatorAccumulatedCommissions?.map(e => ValidatorAccumulatedCommissionRecord.fromPartial(e)) || [];
        message.validatorHistoricalRewards = object.validatorHistoricalRewards?.map(e => ValidatorHistoricalRewardsRecord.fromPartial(e)) || [];
        message.validatorCurrentRewards = object.validatorCurrentRewards?.map(e => ValidatorCurrentRewardsRecord.fromPartial(e)) || [];
        message.delegatorStartingInfos = object.delegatorStartingInfos?.map(e => DelegatorStartingInfoRecord.fromPartial(e)) || [];
        message.validatorSlashEvents = object.validatorSlashEvents?.map(e => ValidatorSlashEventRecord.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromAmino(object.params);
        }
        if (object.fee_pool !== undefined && object.fee_pool !== null) {
            message.feePool = FeePool.fromAmino(object.fee_pool);
        }
        message.delegatorWithdrawInfos = object.delegator_withdraw_infos?.map(e => DelegatorWithdrawInfo.fromAmino(e)) || [];
        if (object.previous_proposer !== undefined && object.previous_proposer !== null) {
            message.previousProposer = object.previous_proposer;
        }
        message.outstandingRewards = object.outstanding_rewards?.map(e => ValidatorOutstandingRewardsRecord.fromAmino(e)) || [];
        message.validatorAccumulatedCommissions = object.validator_accumulated_commissions?.map(e => ValidatorAccumulatedCommissionRecord.fromAmino(e)) || [];
        message.validatorHistoricalRewards = object.validator_historical_rewards?.map(e => ValidatorHistoricalRewardsRecord.fromAmino(e)) || [];
        message.validatorCurrentRewards = object.validator_current_rewards?.map(e => ValidatorCurrentRewardsRecord.fromAmino(e)) || [];
        message.delegatorStartingInfos = object.delegator_starting_infos?.map(e => DelegatorStartingInfoRecord.fromAmino(e)) || [];
        message.validatorSlashEvents = object.validator_slash_events?.map(e => ValidatorSlashEventRecord.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
        obj.fee_pool = message.feePool ? FeePool.toAmino(message.feePool) : FeePool.toAmino(FeePool.fromPartial({}));
        if (message.delegatorWithdrawInfos) {
            obj.delegator_withdraw_infos = message.delegatorWithdrawInfos.map(e => e ? DelegatorWithdrawInfo.toAmino(e) : undefined);
        }
        else {
            obj.delegator_withdraw_infos = message.delegatorWithdrawInfos;
        }
        obj.previous_proposer = message.previousProposer === "" ? undefined : message.previousProposer;
        if (message.outstandingRewards) {
            obj.outstanding_rewards = message.outstandingRewards.map(e => e ? ValidatorOutstandingRewardsRecord.toAmino(e) : undefined);
        }
        else {
            obj.outstanding_rewards = message.outstandingRewards;
        }
        if (message.validatorAccumulatedCommissions) {
            obj.validator_accumulated_commissions = message.validatorAccumulatedCommissions.map(e => e ? ValidatorAccumulatedCommissionRecord.toAmino(e) : undefined);
        }
        else {
            obj.validator_accumulated_commissions = message.validatorAccumulatedCommissions;
        }
        if (message.validatorHistoricalRewards) {
            obj.validator_historical_rewards = message.validatorHistoricalRewards.map(e => e ? ValidatorHistoricalRewardsRecord.toAmino(e) : undefined);
        }
        else {
            obj.validator_historical_rewards = message.validatorHistoricalRewards;
        }
        if (message.validatorCurrentRewards) {
            obj.validator_current_rewards = message.validatorCurrentRewards.map(e => e ? ValidatorCurrentRewardsRecord.toAmino(e) : undefined);
        }
        else {
            obj.validator_current_rewards = message.validatorCurrentRewards;
        }
        if (message.delegatorStartingInfos) {
            obj.delegator_starting_infos = message.delegatorStartingInfos.map(e => e ? DelegatorStartingInfoRecord.toAmino(e) : undefined);
        }
        else {
            obj.delegator_starting_infos = message.delegatorStartingInfos;
        }
        if (message.validatorSlashEvents) {
            obj.validator_slash_events = message.validatorSlashEvents.map(e => e ? ValidatorSlashEventRecord.toAmino(e) : undefined);
        }
        else {
            obj.validator_slash_events = message.validatorSlashEvents;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return GenesisState.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GenesisState",
            value: GenesisState.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GenesisState.decode(message.value);
    },
    toProto(message) {
        return GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.GenesisState",
            value: GenesisState.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);
GlobalDecoderRegistry.registerAminoProtoMapping(GenesisState.aminoType, GenesisState.typeUrl);
