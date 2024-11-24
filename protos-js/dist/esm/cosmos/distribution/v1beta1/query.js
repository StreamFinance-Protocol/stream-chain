//@ts-nocheck
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Params, ValidatorOutstandingRewards, ValidatorAccumulatedCommission, ValidatorSlashEvent, DelegationDelegatorReward } from "./distribution";
import { DecCoin } from "../../base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
function createBaseQueryParamsRequest() {
    return {};
}
export const QueryParamsRequest = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryParamsRequest",
    aminoType: "cosmos-sdk/QueryParamsRequest",
    is(o) {
        return o && o.$typeUrl === QueryParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryParamsRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
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
        const message = createBaseQueryParamsRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryParamsRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryParamsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryParamsRequest",
            value: QueryParamsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryParamsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryParamsRequest",
            value: QueryParamsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryParamsRequest.typeUrl, QueryParamsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryParamsRequest.aminoType, QueryParamsRequest.typeUrl);
function createBaseQueryParamsResponse() {
    return {
        params: Params.fromPartial({})
    };
}
export const QueryParamsResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryParamsResponse",
    aminoType: "cosmos-sdk/QueryParamsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryParamsResponse();
        message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryParamsResponse();
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryParamsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryParamsResponse",
            value: QueryParamsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryParamsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryParamsResponse",
            value: QueryParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryParamsResponse.typeUrl, QueryParamsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryParamsResponse.aminoType, QueryParamsResponse.typeUrl);
function createBaseQueryValidatorDistributionInfoRequest() {
    return {
        validatorAddress: ""
    };
}
export const QueryValidatorDistributionInfoRequest = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorDistributionInfoRequest",
    aminoType: "cosmos-sdk/QueryValidatorDistributionInfoRequest",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorDistributionInfoRequest.typeUrl || typeof o.validatorAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorDistributionInfoRequest.typeUrl || typeof o.validator_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorDistributionInfoRequest.typeUrl || typeof o.validator_address === "string");
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
        const message = createBaseQueryValidatorDistributionInfoRequest();
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
        const message = createBaseQueryValidatorDistributionInfoRequest();
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorDistributionInfoRequest();
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
        return QueryValidatorDistributionInfoRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorDistributionInfoRequest",
            value: QueryValidatorDistributionInfoRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorDistributionInfoRequest.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorDistributionInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorDistributionInfoRequest",
            value: QueryValidatorDistributionInfoRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorDistributionInfoRequest.typeUrl, QueryValidatorDistributionInfoRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorDistributionInfoRequest.aminoType, QueryValidatorDistributionInfoRequest.typeUrl);
function createBaseQueryValidatorDistributionInfoResponse() {
    return {
        operatorAddress: "",
        selfBondRewards: [],
        commission: []
    };
}
export const QueryValidatorDistributionInfoResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorDistributionInfoResponse",
    aminoType: "cosmos-sdk/QueryValidatorDistributionInfoResponse",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorDistributionInfoResponse.typeUrl || typeof o.operatorAddress === "string" && Array.isArray(o.selfBondRewards) && (!o.selfBondRewards.length || DecCoin.is(o.selfBondRewards[0])) && Array.isArray(o.commission) && (!o.commission.length || DecCoin.is(o.commission[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorDistributionInfoResponse.typeUrl || typeof o.operator_address === "string" && Array.isArray(o.self_bond_rewards) && (!o.self_bond_rewards.length || DecCoin.isSDK(o.self_bond_rewards[0])) && Array.isArray(o.commission) && (!o.commission.length || DecCoin.isSDK(o.commission[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorDistributionInfoResponse.typeUrl || typeof o.operator_address === "string" && Array.isArray(o.self_bond_rewards) && (!o.self_bond_rewards.length || DecCoin.isAmino(o.self_bond_rewards[0])) && Array.isArray(o.commission) && (!o.commission.length || DecCoin.isAmino(o.commission[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.operatorAddress !== "") {
            writer.uint32(10).string(message.operatorAddress);
        }
        for (const v of message.selfBondRewards) {
            DecCoin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.commission) {
            DecCoin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorDistributionInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.operatorAddress = reader.string();
                    break;
                case 2:
                    message.selfBondRewards.push(DecCoin.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.commission.push(DecCoin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorDistributionInfoResponse();
        message.operatorAddress = object.operatorAddress ?? "";
        message.selfBondRewards = object.selfBondRewards?.map(e => DecCoin.fromPartial(e)) || [];
        message.commission = object.commission?.map(e => DecCoin.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorDistributionInfoResponse();
        if (object.operator_address !== undefined && object.operator_address !== null) {
            message.operatorAddress = object.operator_address;
        }
        message.selfBondRewards = object.self_bond_rewards?.map(e => DecCoin.fromAmino(e)) || [];
        message.commission = object.commission?.map(e => DecCoin.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.operator_address = message.operatorAddress === "" ? undefined : message.operatorAddress;
        if (message.selfBondRewards) {
            obj.self_bond_rewards = message.selfBondRewards.map(e => e ? DecCoin.toAmino(e) : undefined);
        }
        else {
            obj.self_bond_rewards = message.selfBondRewards;
        }
        if (message.commission) {
            obj.commission = message.commission.map(e => e ? DecCoin.toAmino(e) : undefined);
        }
        else {
            obj.commission = message.commission;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorDistributionInfoResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorDistributionInfoResponse",
            value: QueryValidatorDistributionInfoResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorDistributionInfoResponse.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorDistributionInfoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorDistributionInfoResponse",
            value: QueryValidatorDistributionInfoResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorDistributionInfoResponse.typeUrl, QueryValidatorDistributionInfoResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorDistributionInfoResponse.aminoType, QueryValidatorDistributionInfoResponse.typeUrl);
function createBaseQueryValidatorOutstandingRewardsRequest() {
    return {
        validatorAddress: ""
    };
}
export const QueryValidatorOutstandingRewardsRequest = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsRequest",
    aminoType: "cosmos-sdk/QueryValidatorOutstandingRewardsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorOutstandingRewardsRequest.typeUrl || typeof o.validatorAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorOutstandingRewardsRequest.typeUrl || typeof o.validator_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorOutstandingRewardsRequest.typeUrl || typeof o.validator_address === "string");
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
        const message = createBaseQueryValidatorOutstandingRewardsRequest();
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
        const message = createBaseQueryValidatorOutstandingRewardsRequest();
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorOutstandingRewardsRequest();
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
        return QueryValidatorOutstandingRewardsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorOutstandingRewardsRequest",
            value: QueryValidatorOutstandingRewardsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorOutstandingRewardsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorOutstandingRewardsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsRequest",
            value: QueryValidatorOutstandingRewardsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorOutstandingRewardsRequest.typeUrl, QueryValidatorOutstandingRewardsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorOutstandingRewardsRequest.aminoType, QueryValidatorOutstandingRewardsRequest.typeUrl);
function createBaseQueryValidatorOutstandingRewardsResponse() {
    return {
        rewards: ValidatorOutstandingRewards.fromPartial({})
    };
}
export const QueryValidatorOutstandingRewardsResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsResponse",
    aminoType: "cosmos-sdk/QueryValidatorOutstandingRewardsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorOutstandingRewardsResponse.typeUrl || ValidatorOutstandingRewards.is(o.rewards));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorOutstandingRewardsResponse.typeUrl || ValidatorOutstandingRewards.isSDK(o.rewards));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorOutstandingRewardsResponse.typeUrl || ValidatorOutstandingRewards.isAmino(o.rewards));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.rewards !== undefined) {
            ValidatorOutstandingRewards.encode(message.rewards, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorOutstandingRewardsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rewards = ValidatorOutstandingRewards.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorOutstandingRewardsResponse();
        message.rewards = object.rewards !== undefined && object.rewards !== null ? ValidatorOutstandingRewards.fromPartial(object.rewards) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorOutstandingRewardsResponse();
        if (object.rewards !== undefined && object.rewards !== null) {
            message.rewards = ValidatorOutstandingRewards.fromAmino(object.rewards);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.rewards = message.rewards ? ValidatorOutstandingRewards.toAmino(message.rewards) : ValidatorOutstandingRewards.toAmino(ValidatorOutstandingRewards.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorOutstandingRewardsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorOutstandingRewardsResponse",
            value: QueryValidatorOutstandingRewardsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorOutstandingRewardsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorOutstandingRewardsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsResponse",
            value: QueryValidatorOutstandingRewardsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorOutstandingRewardsResponse.typeUrl, QueryValidatorOutstandingRewardsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorOutstandingRewardsResponse.aminoType, QueryValidatorOutstandingRewardsResponse.typeUrl);
function createBaseQueryValidatorCommissionRequest() {
    return {
        validatorAddress: ""
    };
}
export const QueryValidatorCommissionRequest = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorCommissionRequest",
    aminoType: "cosmos-sdk/QueryValidatorCommissionRequest",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorCommissionRequest.typeUrl || typeof o.validatorAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorCommissionRequest.typeUrl || typeof o.validator_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorCommissionRequest.typeUrl || typeof o.validator_address === "string");
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
        const message = createBaseQueryValidatorCommissionRequest();
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
        const message = createBaseQueryValidatorCommissionRequest();
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorCommissionRequest();
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
        return QueryValidatorCommissionRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorCommissionRequest",
            value: QueryValidatorCommissionRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorCommissionRequest.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorCommissionRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorCommissionRequest",
            value: QueryValidatorCommissionRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorCommissionRequest.typeUrl, QueryValidatorCommissionRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorCommissionRequest.aminoType, QueryValidatorCommissionRequest.typeUrl);
function createBaseQueryValidatorCommissionResponse() {
    return {
        commission: ValidatorAccumulatedCommission.fromPartial({})
    };
}
export const QueryValidatorCommissionResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorCommissionResponse",
    aminoType: "cosmos-sdk/QueryValidatorCommissionResponse",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorCommissionResponse.typeUrl || ValidatorAccumulatedCommission.is(o.commission));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorCommissionResponse.typeUrl || ValidatorAccumulatedCommission.isSDK(o.commission));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorCommissionResponse.typeUrl || ValidatorAccumulatedCommission.isAmino(o.commission));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.commission !== undefined) {
            ValidatorAccumulatedCommission.encode(message.commission, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorCommissionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.commission = ValidatorAccumulatedCommission.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorCommissionResponse();
        message.commission = object.commission !== undefined && object.commission !== null ? ValidatorAccumulatedCommission.fromPartial(object.commission) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorCommissionResponse();
        if (object.commission !== undefined && object.commission !== null) {
            message.commission = ValidatorAccumulatedCommission.fromAmino(object.commission);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.commission = message.commission ? ValidatorAccumulatedCommission.toAmino(message.commission) : ValidatorAccumulatedCommission.toAmino(ValidatorAccumulatedCommission.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorCommissionResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorCommissionResponse",
            value: QueryValidatorCommissionResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorCommissionResponse.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorCommissionResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorCommissionResponse",
            value: QueryValidatorCommissionResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorCommissionResponse.typeUrl, QueryValidatorCommissionResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorCommissionResponse.aminoType, QueryValidatorCommissionResponse.typeUrl);
function createBaseQueryValidatorSlashesRequest() {
    return {
        validatorAddress: "",
        startingHeight: BigInt(0),
        endingHeight: BigInt(0),
        pagination: undefined
    };
}
export const QueryValidatorSlashesRequest = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorSlashesRequest",
    aminoType: "cosmos-sdk/QueryValidatorSlashesRequest",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorSlashesRequest.typeUrl || typeof o.validatorAddress === "string" && typeof o.startingHeight === "bigint" && typeof o.endingHeight === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorSlashesRequest.typeUrl || typeof o.validator_address === "string" && typeof o.starting_height === "bigint" && typeof o.ending_height === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorSlashesRequest.typeUrl || typeof o.validator_address === "string" && typeof o.starting_height === "bigint" && typeof o.ending_height === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        if (message.startingHeight !== BigInt(0)) {
            writer.uint32(16).uint64(message.startingHeight);
        }
        if (message.endingHeight !== BigInt(0)) {
            writer.uint32(24).uint64(message.endingHeight);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorSlashesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddress = reader.string();
                    break;
                case 2:
                    message.startingHeight = reader.uint64();
                    break;
                case 3:
                    message.endingHeight = reader.uint64();
                    break;
                case 4:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorSlashesRequest();
        message.validatorAddress = object.validatorAddress ?? "";
        message.startingHeight = object.startingHeight !== undefined && object.startingHeight !== null ? BigInt(object.startingHeight.toString()) : BigInt(0);
        message.endingHeight = object.endingHeight !== undefined && object.endingHeight !== null ? BigInt(object.endingHeight.toString()) : BigInt(0);
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorSlashesRequest();
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.starting_height !== undefined && object.starting_height !== null) {
            message.startingHeight = BigInt(object.starting_height);
        }
        if (object.ending_height !== undefined && object.ending_height !== null) {
            message.endingHeight = BigInt(object.ending_height);
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.starting_height = message.startingHeight !== BigInt(0) ? message.startingHeight?.toString() : undefined;
        obj.ending_height = message.endingHeight !== BigInt(0) ? message.endingHeight?.toString() : undefined;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorSlashesRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorSlashesRequest",
            value: QueryValidatorSlashesRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorSlashesRequest.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorSlashesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorSlashesRequest",
            value: QueryValidatorSlashesRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorSlashesRequest.typeUrl, QueryValidatorSlashesRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorSlashesRequest.aminoType, QueryValidatorSlashesRequest.typeUrl);
function createBaseQueryValidatorSlashesResponse() {
    return {
        slashes: [],
        pagination: undefined
    };
}
export const QueryValidatorSlashesResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorSlashesResponse",
    aminoType: "cosmos-sdk/QueryValidatorSlashesResponse",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorSlashesResponse.typeUrl || Array.isArray(o.slashes) && (!o.slashes.length || ValidatorSlashEvent.is(o.slashes[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorSlashesResponse.typeUrl || Array.isArray(o.slashes) && (!o.slashes.length || ValidatorSlashEvent.isSDK(o.slashes[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorSlashesResponse.typeUrl || Array.isArray(o.slashes) && (!o.slashes.length || ValidatorSlashEvent.isAmino(o.slashes[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.slashes) {
            ValidatorSlashEvent.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorSlashesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.slashes.push(ValidatorSlashEvent.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorSlashesResponse();
        message.slashes = object.slashes?.map(e => ValidatorSlashEvent.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorSlashesResponse();
        message.slashes = object.slashes?.map(e => ValidatorSlashEvent.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.slashes) {
            obj.slashes = message.slashes.map(e => e ? ValidatorSlashEvent.toAmino(e) : undefined);
        }
        else {
            obj.slashes = message.slashes;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorSlashesResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorSlashesResponse",
            value: QueryValidatorSlashesResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorSlashesResponse.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorSlashesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryValidatorSlashesResponse",
            value: QueryValidatorSlashesResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorSlashesResponse.typeUrl, QueryValidatorSlashesResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorSlashesResponse.aminoType, QueryValidatorSlashesResponse.typeUrl);
function createBaseQueryDelegationRewardsRequest() {
    return {
        delegatorAddress: "",
        validatorAddress: ""
    };
}
export const QueryDelegationRewardsRequest = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryDelegationRewardsRequest",
    aminoType: "cosmos-sdk/QueryDelegationRewardsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryDelegationRewardsRequest.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegationRewardsRequest.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegationRewardsRequest.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string");
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
        const message = createBaseQueryDelegationRewardsRequest();
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
        const message = createBaseQueryDelegationRewardsRequest();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegationRewardsRequest();
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
        return QueryDelegationRewardsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegationRewardsRequest",
            value: QueryDelegationRewardsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegationRewardsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDelegationRewardsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryDelegationRewardsRequest",
            value: QueryDelegationRewardsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegationRewardsRequest.typeUrl, QueryDelegationRewardsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegationRewardsRequest.aminoType, QueryDelegationRewardsRequest.typeUrl);
function createBaseQueryDelegationRewardsResponse() {
    return {
        rewards: []
    };
}
export const QueryDelegationRewardsResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryDelegationRewardsResponse",
    aminoType: "cosmos-sdk/QueryDelegationRewardsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryDelegationRewardsResponse.typeUrl || Array.isArray(o.rewards) && (!o.rewards.length || DecCoin.is(o.rewards[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegationRewardsResponse.typeUrl || Array.isArray(o.rewards) && (!o.rewards.length || DecCoin.isSDK(o.rewards[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegationRewardsResponse.typeUrl || Array.isArray(o.rewards) && (!o.rewards.length || DecCoin.isAmino(o.rewards[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.rewards) {
            DecCoin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegationRewardsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rewards.push(DecCoin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDelegationRewardsResponse();
        message.rewards = object.rewards?.map(e => DecCoin.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegationRewardsResponse();
        message.rewards = object.rewards?.map(e => DecCoin.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.rewards) {
            obj.rewards = message.rewards.map(e => e ? DecCoin.toAmino(e) : undefined);
        }
        else {
            obj.rewards = message.rewards;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegationRewardsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegationRewardsResponse",
            value: QueryDelegationRewardsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegationRewardsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryDelegationRewardsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryDelegationRewardsResponse",
            value: QueryDelegationRewardsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegationRewardsResponse.typeUrl, QueryDelegationRewardsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegationRewardsResponse.aminoType, QueryDelegationRewardsResponse.typeUrl);
function createBaseQueryDelegationTotalRewardsRequest() {
    return {
        delegatorAddress: ""
    };
}
export const QueryDelegationTotalRewardsRequest = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryDelegationTotalRewardsRequest",
    aminoType: "cosmos-sdk/QueryDelegationTotalRewardsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryDelegationTotalRewardsRequest.typeUrl || typeof o.delegatorAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegationTotalRewardsRequest.typeUrl || typeof o.delegator_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegationTotalRewardsRequest.typeUrl || typeof o.delegator_address === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegationTotalRewardsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDelegationTotalRewardsRequest();
        message.delegatorAddress = object.delegatorAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegationTotalRewardsRequest();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegationTotalRewardsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegationTotalRewardsRequest",
            value: QueryDelegationTotalRewardsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegationTotalRewardsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDelegationTotalRewardsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryDelegationTotalRewardsRequest",
            value: QueryDelegationTotalRewardsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegationTotalRewardsRequest.typeUrl, QueryDelegationTotalRewardsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegationTotalRewardsRequest.aminoType, QueryDelegationTotalRewardsRequest.typeUrl);
function createBaseQueryDelegationTotalRewardsResponse() {
    return {
        rewards: [],
        total: []
    };
}
export const QueryDelegationTotalRewardsResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryDelegationTotalRewardsResponse",
    aminoType: "cosmos-sdk/QueryDelegationTotalRewardsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryDelegationTotalRewardsResponse.typeUrl || Array.isArray(o.rewards) && (!o.rewards.length || DelegationDelegatorReward.is(o.rewards[0])) && Array.isArray(o.total) && (!o.total.length || DecCoin.is(o.total[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegationTotalRewardsResponse.typeUrl || Array.isArray(o.rewards) && (!o.rewards.length || DelegationDelegatorReward.isSDK(o.rewards[0])) && Array.isArray(o.total) && (!o.total.length || DecCoin.isSDK(o.total[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegationTotalRewardsResponse.typeUrl || Array.isArray(o.rewards) && (!o.rewards.length || DelegationDelegatorReward.isAmino(o.rewards[0])) && Array.isArray(o.total) && (!o.total.length || DecCoin.isAmino(o.total[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.rewards) {
            DelegationDelegatorReward.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.total) {
            DecCoin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegationTotalRewardsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rewards.push(DelegationDelegatorReward.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.total.push(DecCoin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDelegationTotalRewardsResponse();
        message.rewards = object.rewards?.map(e => DelegationDelegatorReward.fromPartial(e)) || [];
        message.total = object.total?.map(e => DecCoin.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegationTotalRewardsResponse();
        message.rewards = object.rewards?.map(e => DelegationDelegatorReward.fromAmino(e)) || [];
        message.total = object.total?.map(e => DecCoin.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.rewards) {
            obj.rewards = message.rewards.map(e => e ? DelegationDelegatorReward.toAmino(e) : undefined);
        }
        else {
            obj.rewards = message.rewards;
        }
        if (message.total) {
            obj.total = message.total.map(e => e ? DecCoin.toAmino(e) : undefined);
        }
        else {
            obj.total = message.total;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegationTotalRewardsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegationTotalRewardsResponse",
            value: QueryDelegationTotalRewardsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegationTotalRewardsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryDelegationTotalRewardsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryDelegationTotalRewardsResponse",
            value: QueryDelegationTotalRewardsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegationTotalRewardsResponse.typeUrl, QueryDelegationTotalRewardsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegationTotalRewardsResponse.aminoType, QueryDelegationTotalRewardsResponse.typeUrl);
function createBaseQueryDelegatorValidatorsRequest() {
    return {
        delegatorAddress: ""
    };
}
export const QueryDelegatorValidatorsRequest = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryDelegatorValidatorsRequest",
    aminoType: "cosmos-sdk/QueryDelegatorValidatorsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsRequest.typeUrl || typeof o.delegatorAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsRequest.typeUrl || typeof o.delegator_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsRequest.typeUrl || typeof o.delegator_address === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorValidatorsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDelegatorValidatorsRequest();
        message.delegatorAddress = object.delegatorAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorValidatorsRequest();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegatorValidatorsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegatorValidatorsRequest",
            value: QueryDelegatorValidatorsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegatorValidatorsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDelegatorValidatorsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryDelegatorValidatorsRequest",
            value: QueryDelegatorValidatorsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorValidatorsRequest.typeUrl, QueryDelegatorValidatorsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorValidatorsRequest.aminoType, QueryDelegatorValidatorsRequest.typeUrl);
function createBaseQueryDelegatorValidatorsResponse() {
    return {
        validators: []
    };
}
export const QueryDelegatorValidatorsResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryDelegatorValidatorsResponse",
    aminoType: "cosmos-sdk/QueryDelegatorValidatorsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsResponse.typeUrl || Array.isArray(o.validators) && (!o.validators.length || typeof o.validators[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsResponse.typeUrl || Array.isArray(o.validators) && (!o.validators.length || typeof o.validators[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsResponse.typeUrl || Array.isArray(o.validators) && (!o.validators.length || typeof o.validators[0] === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.validators) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorValidatorsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validators.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDelegatorValidatorsResponse();
        message.validators = object.validators?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorValidatorsResponse();
        message.validators = object.validators?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.validators) {
            obj.validators = message.validators.map(e => e);
        }
        else {
            obj.validators = message.validators;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegatorValidatorsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegatorValidatorsResponse",
            value: QueryDelegatorValidatorsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegatorValidatorsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryDelegatorValidatorsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryDelegatorValidatorsResponse",
            value: QueryDelegatorValidatorsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorValidatorsResponse.typeUrl, QueryDelegatorValidatorsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorValidatorsResponse.aminoType, QueryDelegatorValidatorsResponse.typeUrl);
function createBaseQueryDelegatorWithdrawAddressRequest() {
    return {
        delegatorAddress: ""
    };
}
export const QueryDelegatorWithdrawAddressRequest = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressRequest",
    aminoType: "cosmos-sdk/QueryDelegatorWithdrawAddressRequest",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorWithdrawAddressRequest.typeUrl || typeof o.delegatorAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorWithdrawAddressRequest.typeUrl || typeof o.delegator_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorWithdrawAddressRequest.typeUrl || typeof o.delegator_address === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorWithdrawAddressRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDelegatorWithdrawAddressRequest();
        message.delegatorAddress = object.delegatorAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorWithdrawAddressRequest();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegatorWithdrawAddressRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegatorWithdrawAddressRequest",
            value: QueryDelegatorWithdrawAddressRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegatorWithdrawAddressRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDelegatorWithdrawAddressRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressRequest",
            value: QueryDelegatorWithdrawAddressRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorWithdrawAddressRequest.typeUrl, QueryDelegatorWithdrawAddressRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorWithdrawAddressRequest.aminoType, QueryDelegatorWithdrawAddressRequest.typeUrl);
function createBaseQueryDelegatorWithdrawAddressResponse() {
    return {
        withdrawAddress: ""
    };
}
export const QueryDelegatorWithdrawAddressResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressResponse",
    aminoType: "cosmos-sdk/QueryDelegatorWithdrawAddressResponse",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorWithdrawAddressResponse.typeUrl || typeof o.withdrawAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorWithdrawAddressResponse.typeUrl || typeof o.withdraw_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorWithdrawAddressResponse.typeUrl || typeof o.withdraw_address === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.withdrawAddress !== "") {
            writer.uint32(10).string(message.withdrawAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorWithdrawAddressResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = createBaseQueryDelegatorWithdrawAddressResponse();
        message.withdrawAddress = object.withdrawAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorWithdrawAddressResponse();
        if (object.withdraw_address !== undefined && object.withdraw_address !== null) {
            message.withdrawAddress = object.withdraw_address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.withdraw_address = message.withdrawAddress === "" ? undefined : message.withdrawAddress;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegatorWithdrawAddressResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegatorWithdrawAddressResponse",
            value: QueryDelegatorWithdrawAddressResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegatorWithdrawAddressResponse.decode(message.value);
    },
    toProto(message) {
        return QueryDelegatorWithdrawAddressResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressResponse",
            value: QueryDelegatorWithdrawAddressResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorWithdrawAddressResponse.typeUrl, QueryDelegatorWithdrawAddressResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorWithdrawAddressResponse.aminoType, QueryDelegatorWithdrawAddressResponse.typeUrl);
function createBaseQueryCommunityPoolRequest() {
    return {};
}
export const QueryCommunityPoolRequest = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryCommunityPoolRequest",
    aminoType: "cosmos-sdk/QueryCommunityPoolRequest",
    is(o) {
        return o && o.$typeUrl === QueryCommunityPoolRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryCommunityPoolRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryCommunityPoolRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCommunityPoolRequest();
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
        const message = createBaseQueryCommunityPoolRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryCommunityPoolRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryCommunityPoolRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryCommunityPoolRequest",
            value: QueryCommunityPoolRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryCommunityPoolRequest.decode(message.value);
    },
    toProto(message) {
        return QueryCommunityPoolRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryCommunityPoolRequest",
            value: QueryCommunityPoolRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryCommunityPoolRequest.typeUrl, QueryCommunityPoolRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryCommunityPoolRequest.aminoType, QueryCommunityPoolRequest.typeUrl);
function createBaseQueryCommunityPoolResponse() {
    return {
        pool: []
    };
}
export const QueryCommunityPoolResponse = {
    typeUrl: "/cosmos.distribution.v1beta1.QueryCommunityPoolResponse",
    aminoType: "cosmos-sdk/QueryCommunityPoolResponse",
    is(o) {
        return o && (o.$typeUrl === QueryCommunityPoolResponse.typeUrl || Array.isArray(o.pool) && (!o.pool.length || DecCoin.is(o.pool[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryCommunityPoolResponse.typeUrl || Array.isArray(o.pool) && (!o.pool.length || DecCoin.isSDK(o.pool[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryCommunityPoolResponse.typeUrl || Array.isArray(o.pool) && (!o.pool.length || DecCoin.isAmino(o.pool[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.pool) {
            DecCoin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCommunityPoolResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pool.push(DecCoin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryCommunityPoolResponse();
        message.pool = object.pool?.map(e => DecCoin.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryCommunityPoolResponse();
        message.pool = object.pool?.map(e => DecCoin.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.pool) {
            obj.pool = message.pool.map(e => e ? DecCoin.toAmino(e) : undefined);
        }
        else {
            obj.pool = message.pool;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return QueryCommunityPoolResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryCommunityPoolResponse",
            value: QueryCommunityPoolResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryCommunityPoolResponse.decode(message.value);
    },
    toProto(message) {
        return QueryCommunityPoolResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.distribution.v1beta1.QueryCommunityPoolResponse",
            value: QueryCommunityPoolResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryCommunityPoolResponse.typeUrl, QueryCommunityPoolResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryCommunityPoolResponse.aminoType, QueryCommunityPoolResponse.typeUrl);
