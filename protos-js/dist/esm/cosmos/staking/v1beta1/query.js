//@ts-nocheck
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Validator, DelegationResponse, UnbondingDelegation, RedelegationResponse, HistoricalInfo, Pool, Params } from "./staking";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
function createBaseQueryValidatorsRequest() {
    return {
        status: "",
        pagination: undefined
    };
}
export const QueryValidatorsRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryValidatorsRequest",
    aminoType: "cosmos-sdk/QueryValidatorsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorsRequest.typeUrl || typeof o.status === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorsRequest.typeUrl || typeof o.status === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorsRequest.typeUrl || typeof o.status === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.status !== "") {
            writer.uint32(10).string(message.status);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.status = reader.string();
                    break;
                case 2:
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
        const message = createBaseQueryValidatorsRequest();
        message.status = object.status ?? "";
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorsRequest();
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.status = message.status === "" ? undefined : message.status;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorsRequest",
            value: QueryValidatorsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryValidatorsRequest",
            value: QueryValidatorsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorsRequest.typeUrl, QueryValidatorsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorsRequest.aminoType, QueryValidatorsRequest.typeUrl);
function createBaseQueryValidatorsResponse() {
    return {
        validators: [],
        pagination: undefined
    };
}
export const QueryValidatorsResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryValidatorsResponse",
    aminoType: "cosmos-sdk/QueryValidatorsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorsResponse.typeUrl || Array.isArray(o.validators) && (!o.validators.length || Validator.is(o.validators[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorsResponse.typeUrl || Array.isArray(o.validators) && (!o.validators.length || Validator.isSDK(o.validators[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorsResponse.typeUrl || Array.isArray(o.validators) && (!o.validators.length || Validator.isAmino(o.validators[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.validators) {
            Validator.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validators.push(Validator.decode(reader, reader.uint32()));
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
        const message = createBaseQueryValidatorsResponse();
        message.validators = object.validators?.map(e => Validator.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorsResponse();
        message.validators = object.validators?.map(e => Validator.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.validators) {
            obj.validators = message.validators.map(e => e ? Validator.toAmino(e) : undefined);
        }
        else {
            obj.validators = message.validators;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorsResponse",
            value: QueryValidatorsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryValidatorsResponse",
            value: QueryValidatorsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorsResponse.typeUrl, QueryValidatorsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorsResponse.aminoType, QueryValidatorsResponse.typeUrl);
function createBaseQueryValidatorRequest() {
    return {
        validatorAddr: ""
    };
}
export const QueryValidatorRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryValidatorRequest",
    aminoType: "cosmos-sdk/QueryValidatorRequest",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorRequest.typeUrl || typeof o.validatorAddr === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorRequest.typeUrl || typeof o.validator_addr === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorRequest.typeUrl || typeof o.validator_addr === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validatorAddr !== "") {
            writer.uint32(10).string(message.validatorAddr);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorRequest();
        message.validatorAddr = object.validatorAddr ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorRequest();
        if (object.validator_addr !== undefined && object.validator_addr !== null) {
            message.validatorAddr = object.validator_addr;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator_addr = message.validatorAddr === "" ? undefined : message.validatorAddr;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorRequest",
            value: QueryValidatorRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorRequest.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryValidatorRequest",
            value: QueryValidatorRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorRequest.typeUrl, QueryValidatorRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorRequest.aminoType, QueryValidatorRequest.typeUrl);
function createBaseQueryValidatorResponse() {
    return {
        validator: Validator.fromPartial({})
    };
}
export const QueryValidatorResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryValidatorResponse",
    aminoType: "cosmos-sdk/QueryValidatorResponse",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorResponse.typeUrl || Validator.is(o.validator));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorResponse.typeUrl || Validator.isSDK(o.validator));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorResponse.typeUrl || Validator.isAmino(o.validator));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validator !== undefined) {
            Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = Validator.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorResponse();
        message.validator = object.validator !== undefined && object.validator !== null ? Validator.fromPartial(object.validator) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorResponse();
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = Validator.fromAmino(object.validator);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator = message.validator ? Validator.toAmino(message.validator) : Validator.toAmino(Validator.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorResponse",
            value: QueryValidatorResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorResponse.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryValidatorResponse",
            value: QueryValidatorResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorResponse.typeUrl, QueryValidatorResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorResponse.aminoType, QueryValidatorResponse.typeUrl);
function createBaseQueryValidatorDelegationsRequest() {
    return {
        validatorAddr: "",
        pagination: undefined
    };
}
export const QueryValidatorDelegationsRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryValidatorDelegationsRequest",
    aminoType: "cosmos-sdk/QueryValidatorDelegationsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorDelegationsRequest.typeUrl || typeof o.validatorAddr === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorDelegationsRequest.typeUrl || typeof o.validator_addr === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorDelegationsRequest.typeUrl || typeof o.validator_addr === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validatorAddr !== "") {
            writer.uint32(10).string(message.validatorAddr);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorDelegationsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddr = reader.string();
                    break;
                case 2:
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
        const message = createBaseQueryValidatorDelegationsRequest();
        message.validatorAddr = object.validatorAddr ?? "";
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorDelegationsRequest();
        if (object.validator_addr !== undefined && object.validator_addr !== null) {
            message.validatorAddr = object.validator_addr;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator_addr = message.validatorAddr === "" ? undefined : message.validatorAddr;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorDelegationsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorDelegationsRequest",
            value: QueryValidatorDelegationsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorDelegationsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorDelegationsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryValidatorDelegationsRequest",
            value: QueryValidatorDelegationsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorDelegationsRequest.typeUrl, QueryValidatorDelegationsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorDelegationsRequest.aminoType, QueryValidatorDelegationsRequest.typeUrl);
function createBaseQueryValidatorDelegationsResponse() {
    return {
        delegationResponses: [],
        pagination: undefined
    };
}
export const QueryValidatorDelegationsResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryValidatorDelegationsResponse",
    aminoType: "cosmos-sdk/QueryValidatorDelegationsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorDelegationsResponse.typeUrl || Array.isArray(o.delegationResponses) && (!o.delegationResponses.length || DelegationResponse.is(o.delegationResponses[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorDelegationsResponse.typeUrl || Array.isArray(o.delegation_responses) && (!o.delegation_responses.length || DelegationResponse.isSDK(o.delegation_responses[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorDelegationsResponse.typeUrl || Array.isArray(o.delegation_responses) && (!o.delegation_responses.length || DelegationResponse.isAmino(o.delegation_responses[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.delegationResponses) {
            DelegationResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorDelegationsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegationResponses.push(DelegationResponse.decode(reader, reader.uint32()));
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
        const message = createBaseQueryValidatorDelegationsResponse();
        message.delegationResponses = object.delegationResponses?.map(e => DelegationResponse.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorDelegationsResponse();
        message.delegationResponses = object.delegation_responses?.map(e => DelegationResponse.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.delegationResponses) {
            obj.delegation_responses = message.delegationResponses.map(e => e ? DelegationResponse.toAmino(e) : undefined);
        }
        else {
            obj.delegation_responses = message.delegationResponses;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorDelegationsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorDelegationsResponse",
            value: QueryValidatorDelegationsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorDelegationsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorDelegationsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryValidatorDelegationsResponse",
            value: QueryValidatorDelegationsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorDelegationsResponse.typeUrl, QueryValidatorDelegationsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorDelegationsResponse.aminoType, QueryValidatorDelegationsResponse.typeUrl);
function createBaseQueryValidatorUnbondingDelegationsRequest() {
    return {
        validatorAddr: "",
        pagination: undefined
    };
}
export const QueryValidatorUnbondingDelegationsRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryValidatorUnbondingDelegationsRequest",
    aminoType: "cosmos-sdk/QueryValidatorUnbondingDelegationsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorUnbondingDelegationsRequest.typeUrl || typeof o.validatorAddr === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorUnbondingDelegationsRequest.typeUrl || typeof o.validator_addr === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorUnbondingDelegationsRequest.typeUrl || typeof o.validator_addr === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validatorAddr !== "") {
            writer.uint32(10).string(message.validatorAddr);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorUnbondingDelegationsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddr = reader.string();
                    break;
                case 2:
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
        const message = createBaseQueryValidatorUnbondingDelegationsRequest();
        message.validatorAddr = object.validatorAddr ?? "";
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorUnbondingDelegationsRequest();
        if (object.validator_addr !== undefined && object.validator_addr !== null) {
            message.validatorAddr = object.validator_addr;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator_addr = message.validatorAddr === "" ? undefined : message.validatorAddr;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorUnbondingDelegationsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorUnbondingDelegationsRequest",
            value: QueryValidatorUnbondingDelegationsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorUnbondingDelegationsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorUnbondingDelegationsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryValidatorUnbondingDelegationsRequest",
            value: QueryValidatorUnbondingDelegationsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorUnbondingDelegationsRequest.typeUrl, QueryValidatorUnbondingDelegationsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorUnbondingDelegationsRequest.aminoType, QueryValidatorUnbondingDelegationsRequest.typeUrl);
function createBaseQueryValidatorUnbondingDelegationsResponse() {
    return {
        unbondingResponses: [],
        pagination: undefined
    };
}
export const QueryValidatorUnbondingDelegationsResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryValidatorUnbondingDelegationsResponse",
    aminoType: "cosmos-sdk/QueryValidatorUnbondingDelegationsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryValidatorUnbondingDelegationsResponse.typeUrl || Array.isArray(o.unbondingResponses) && (!o.unbondingResponses.length || UnbondingDelegation.is(o.unbondingResponses[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryValidatorUnbondingDelegationsResponse.typeUrl || Array.isArray(o.unbonding_responses) && (!o.unbonding_responses.length || UnbondingDelegation.isSDK(o.unbonding_responses[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryValidatorUnbondingDelegationsResponse.typeUrl || Array.isArray(o.unbonding_responses) && (!o.unbonding_responses.length || UnbondingDelegation.isAmino(o.unbonding_responses[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.unbondingResponses) {
            UnbondingDelegation.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorUnbondingDelegationsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.unbondingResponses.push(UnbondingDelegation.decode(reader, reader.uint32()));
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
        const message = createBaseQueryValidatorUnbondingDelegationsResponse();
        message.unbondingResponses = object.unbondingResponses?.map(e => UnbondingDelegation.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryValidatorUnbondingDelegationsResponse();
        message.unbondingResponses = object.unbonding_responses?.map(e => UnbondingDelegation.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.unbondingResponses) {
            obj.unbonding_responses = message.unbondingResponses.map(e => e ? UnbondingDelegation.toAmino(e) : undefined);
        }
        else {
            obj.unbonding_responses = message.unbondingResponses;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryValidatorUnbondingDelegationsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryValidatorUnbondingDelegationsResponse",
            value: QueryValidatorUnbondingDelegationsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryValidatorUnbondingDelegationsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryValidatorUnbondingDelegationsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryValidatorUnbondingDelegationsResponse",
            value: QueryValidatorUnbondingDelegationsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryValidatorUnbondingDelegationsResponse.typeUrl, QueryValidatorUnbondingDelegationsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryValidatorUnbondingDelegationsResponse.aminoType, QueryValidatorUnbondingDelegationsResponse.typeUrl);
function createBaseQueryDelegationRequest() {
    return {
        delegatorAddr: "",
        validatorAddr: ""
    };
}
export const QueryDelegationRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryDelegationRequest",
    aminoType: "cosmos-sdk/QueryDelegationRequest",
    is(o) {
        return o && (o.$typeUrl === QueryDelegationRequest.typeUrl || typeof o.delegatorAddr === "string" && typeof o.validatorAddr === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegationRequest.typeUrl || typeof o.delegator_addr === "string" && typeof o.validator_addr === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegationRequest.typeUrl || typeof o.delegator_addr === "string" && typeof o.validator_addr === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.validatorAddr !== "") {
            writer.uint32(18).string(message.validatorAddr);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegationRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
                    break;
                case 2:
                    message.validatorAddr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDelegationRequest();
        message.delegatorAddr = object.delegatorAddr ?? "";
        message.validatorAddr = object.validatorAddr ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegationRequest();
        if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
            message.delegatorAddr = object.delegator_addr;
        }
        if (object.validator_addr !== undefined && object.validator_addr !== null) {
            message.validatorAddr = object.validator_addr;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_addr = message.delegatorAddr === "" ? undefined : message.delegatorAddr;
        obj.validator_addr = message.validatorAddr === "" ? undefined : message.validatorAddr;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegationRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegationRequest",
            value: QueryDelegationRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegationRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDelegationRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryDelegationRequest",
            value: QueryDelegationRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegationRequest.typeUrl, QueryDelegationRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegationRequest.aminoType, QueryDelegationRequest.typeUrl);
function createBaseQueryDelegationResponse() {
    return {
        delegationResponse: undefined
    };
}
export const QueryDelegationResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryDelegationResponse",
    aminoType: "cosmos-sdk/QueryDelegationResponse",
    is(o) {
        return o && o.$typeUrl === QueryDelegationResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryDelegationResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryDelegationResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegationResponse !== undefined) {
            DelegationResponse.encode(message.delegationResponse, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegationResponse = DelegationResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDelegationResponse();
        message.delegationResponse = object.delegationResponse !== undefined && object.delegationResponse !== null ? DelegationResponse.fromPartial(object.delegationResponse) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegationResponse();
        if (object.delegation_response !== undefined && object.delegation_response !== null) {
            message.delegationResponse = DelegationResponse.fromAmino(object.delegation_response);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegation_response = message.delegationResponse ? DelegationResponse.toAmino(message.delegationResponse) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegationResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegationResponse",
            value: QueryDelegationResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegationResponse.decode(message.value);
    },
    toProto(message) {
        return QueryDelegationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryDelegationResponse",
            value: QueryDelegationResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegationResponse.typeUrl, QueryDelegationResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegationResponse.aminoType, QueryDelegationResponse.typeUrl);
function createBaseQueryUnbondingDelegationRequest() {
    return {
        delegatorAddr: "",
        validatorAddr: ""
    };
}
export const QueryUnbondingDelegationRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryUnbondingDelegationRequest",
    aminoType: "cosmos-sdk/QueryUnbondingDelegationRequest",
    is(o) {
        return o && (o.$typeUrl === QueryUnbondingDelegationRequest.typeUrl || typeof o.delegatorAddr === "string" && typeof o.validatorAddr === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryUnbondingDelegationRequest.typeUrl || typeof o.delegator_addr === "string" && typeof o.validator_addr === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryUnbondingDelegationRequest.typeUrl || typeof o.delegator_addr === "string" && typeof o.validator_addr === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.validatorAddr !== "") {
            writer.uint32(18).string(message.validatorAddr);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUnbondingDelegationRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
                    break;
                case 2:
                    message.validatorAddr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryUnbondingDelegationRequest();
        message.delegatorAddr = object.delegatorAddr ?? "";
        message.validatorAddr = object.validatorAddr ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryUnbondingDelegationRequest();
        if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
            message.delegatorAddr = object.delegator_addr;
        }
        if (object.validator_addr !== undefined && object.validator_addr !== null) {
            message.validatorAddr = object.validator_addr;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_addr = message.delegatorAddr === "" ? undefined : message.delegatorAddr;
        obj.validator_addr = message.validatorAddr === "" ? undefined : message.validatorAddr;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryUnbondingDelegationRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryUnbondingDelegationRequest",
            value: QueryUnbondingDelegationRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryUnbondingDelegationRequest.decode(message.value);
    },
    toProto(message) {
        return QueryUnbondingDelegationRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryUnbondingDelegationRequest",
            value: QueryUnbondingDelegationRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryUnbondingDelegationRequest.typeUrl, QueryUnbondingDelegationRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryUnbondingDelegationRequest.aminoType, QueryUnbondingDelegationRequest.typeUrl);
function createBaseQueryUnbondingDelegationResponse() {
    return {
        unbond: UnbondingDelegation.fromPartial({})
    };
}
export const QueryUnbondingDelegationResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryUnbondingDelegationResponse",
    aminoType: "cosmos-sdk/QueryUnbondingDelegationResponse",
    is(o) {
        return o && (o.$typeUrl === QueryUnbondingDelegationResponse.typeUrl || UnbondingDelegation.is(o.unbond));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryUnbondingDelegationResponse.typeUrl || UnbondingDelegation.isSDK(o.unbond));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryUnbondingDelegationResponse.typeUrl || UnbondingDelegation.isAmino(o.unbond));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.unbond !== undefined) {
            UnbondingDelegation.encode(message.unbond, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUnbondingDelegationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.unbond = UnbondingDelegation.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryUnbondingDelegationResponse();
        message.unbond = object.unbond !== undefined && object.unbond !== null ? UnbondingDelegation.fromPartial(object.unbond) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryUnbondingDelegationResponse();
        if (object.unbond !== undefined && object.unbond !== null) {
            message.unbond = UnbondingDelegation.fromAmino(object.unbond);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.unbond = message.unbond ? UnbondingDelegation.toAmino(message.unbond) : UnbondingDelegation.toAmino(UnbondingDelegation.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryUnbondingDelegationResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryUnbondingDelegationResponse",
            value: QueryUnbondingDelegationResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryUnbondingDelegationResponse.decode(message.value);
    },
    toProto(message) {
        return QueryUnbondingDelegationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryUnbondingDelegationResponse",
            value: QueryUnbondingDelegationResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryUnbondingDelegationResponse.typeUrl, QueryUnbondingDelegationResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryUnbondingDelegationResponse.aminoType, QueryUnbondingDelegationResponse.typeUrl);
function createBaseQueryDelegatorDelegationsRequest() {
    return {
        delegatorAddr: "",
        pagination: undefined
    };
}
export const QueryDelegatorDelegationsRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorDelegationsRequest",
    aminoType: "cosmos-sdk/QueryDelegatorDelegationsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorDelegationsRequest.typeUrl || typeof o.delegatorAddr === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorDelegationsRequest.typeUrl || typeof o.delegator_addr === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorDelegationsRequest.typeUrl || typeof o.delegator_addr === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorDelegationsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
                    break;
                case 2:
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
        const message = createBaseQueryDelegatorDelegationsRequest();
        message.delegatorAddr = object.delegatorAddr ?? "";
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorDelegationsRequest();
        if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
            message.delegatorAddr = object.delegator_addr;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_addr = message.delegatorAddr === "" ? undefined : message.delegatorAddr;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegatorDelegationsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegatorDelegationsRequest",
            value: QueryDelegatorDelegationsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegatorDelegationsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDelegatorDelegationsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorDelegationsRequest",
            value: QueryDelegatorDelegationsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorDelegationsRequest.typeUrl, QueryDelegatorDelegationsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorDelegationsRequest.aminoType, QueryDelegatorDelegationsRequest.typeUrl);
function createBaseQueryDelegatorDelegationsResponse() {
    return {
        delegationResponses: [],
        pagination: undefined
    };
}
export const QueryDelegatorDelegationsResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorDelegationsResponse",
    aminoType: "cosmos-sdk/QueryDelegatorDelegationsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorDelegationsResponse.typeUrl || Array.isArray(o.delegationResponses) && (!o.delegationResponses.length || DelegationResponse.is(o.delegationResponses[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorDelegationsResponse.typeUrl || Array.isArray(o.delegation_responses) && (!o.delegation_responses.length || DelegationResponse.isSDK(o.delegation_responses[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorDelegationsResponse.typeUrl || Array.isArray(o.delegation_responses) && (!o.delegation_responses.length || DelegationResponse.isAmino(o.delegation_responses[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.delegationResponses) {
            DelegationResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorDelegationsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegationResponses.push(DelegationResponse.decode(reader, reader.uint32()));
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
        const message = createBaseQueryDelegatorDelegationsResponse();
        message.delegationResponses = object.delegationResponses?.map(e => DelegationResponse.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorDelegationsResponse();
        message.delegationResponses = object.delegation_responses?.map(e => DelegationResponse.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.delegationResponses) {
            obj.delegation_responses = message.delegationResponses.map(e => e ? DelegationResponse.toAmino(e) : undefined);
        }
        else {
            obj.delegation_responses = message.delegationResponses;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegatorDelegationsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegatorDelegationsResponse",
            value: QueryDelegatorDelegationsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegatorDelegationsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryDelegatorDelegationsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorDelegationsResponse",
            value: QueryDelegatorDelegationsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorDelegationsResponse.typeUrl, QueryDelegatorDelegationsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorDelegationsResponse.aminoType, QueryDelegatorDelegationsResponse.typeUrl);
function createBaseQueryDelegatorUnbondingDelegationsRequest() {
    return {
        delegatorAddr: "",
        pagination: undefined
    };
}
export const QueryDelegatorUnbondingDelegationsRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorUnbondingDelegationsRequest",
    aminoType: "cosmos-sdk/QueryDelegatorUnbondingDelegationsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorUnbondingDelegationsRequest.typeUrl || typeof o.delegatorAddr === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorUnbondingDelegationsRequest.typeUrl || typeof o.delegator_addr === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorUnbondingDelegationsRequest.typeUrl || typeof o.delegator_addr === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorUnbondingDelegationsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
                    break;
                case 2:
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
        const message = createBaseQueryDelegatorUnbondingDelegationsRequest();
        message.delegatorAddr = object.delegatorAddr ?? "";
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorUnbondingDelegationsRequest();
        if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
            message.delegatorAddr = object.delegator_addr;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_addr = message.delegatorAddr === "" ? undefined : message.delegatorAddr;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegatorUnbondingDelegationsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegatorUnbondingDelegationsRequest",
            value: QueryDelegatorUnbondingDelegationsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegatorUnbondingDelegationsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDelegatorUnbondingDelegationsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorUnbondingDelegationsRequest",
            value: QueryDelegatorUnbondingDelegationsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorUnbondingDelegationsRequest.typeUrl, QueryDelegatorUnbondingDelegationsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorUnbondingDelegationsRequest.aminoType, QueryDelegatorUnbondingDelegationsRequest.typeUrl);
function createBaseQueryDelegatorUnbondingDelegationsResponse() {
    return {
        unbondingResponses: [],
        pagination: undefined
    };
}
export const QueryDelegatorUnbondingDelegationsResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorUnbondingDelegationsResponse",
    aminoType: "cosmos-sdk/QueryDelegatorUnbondingDelegationsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorUnbondingDelegationsResponse.typeUrl || Array.isArray(o.unbondingResponses) && (!o.unbondingResponses.length || UnbondingDelegation.is(o.unbondingResponses[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorUnbondingDelegationsResponse.typeUrl || Array.isArray(o.unbonding_responses) && (!o.unbonding_responses.length || UnbondingDelegation.isSDK(o.unbonding_responses[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorUnbondingDelegationsResponse.typeUrl || Array.isArray(o.unbonding_responses) && (!o.unbonding_responses.length || UnbondingDelegation.isAmino(o.unbonding_responses[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.unbondingResponses) {
            UnbondingDelegation.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorUnbondingDelegationsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.unbondingResponses.push(UnbondingDelegation.decode(reader, reader.uint32()));
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
        const message = createBaseQueryDelegatorUnbondingDelegationsResponse();
        message.unbondingResponses = object.unbondingResponses?.map(e => UnbondingDelegation.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorUnbondingDelegationsResponse();
        message.unbondingResponses = object.unbonding_responses?.map(e => UnbondingDelegation.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.unbondingResponses) {
            obj.unbonding_responses = message.unbondingResponses.map(e => e ? UnbondingDelegation.toAmino(e) : undefined);
        }
        else {
            obj.unbonding_responses = message.unbondingResponses;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegatorUnbondingDelegationsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegatorUnbondingDelegationsResponse",
            value: QueryDelegatorUnbondingDelegationsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegatorUnbondingDelegationsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryDelegatorUnbondingDelegationsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorUnbondingDelegationsResponse",
            value: QueryDelegatorUnbondingDelegationsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorUnbondingDelegationsResponse.typeUrl, QueryDelegatorUnbondingDelegationsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorUnbondingDelegationsResponse.aminoType, QueryDelegatorUnbondingDelegationsResponse.typeUrl);
function createBaseQueryRedelegationsRequest() {
    return {
        delegatorAddr: "",
        srcValidatorAddr: "",
        dstValidatorAddr: "",
        pagination: undefined
    };
}
export const QueryRedelegationsRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryRedelegationsRequest",
    aminoType: "cosmos-sdk/QueryRedelegationsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryRedelegationsRequest.typeUrl || typeof o.delegatorAddr === "string" && typeof o.srcValidatorAddr === "string" && typeof o.dstValidatorAddr === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryRedelegationsRequest.typeUrl || typeof o.delegator_addr === "string" && typeof o.src_validator_addr === "string" && typeof o.dst_validator_addr === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryRedelegationsRequest.typeUrl || typeof o.delegator_addr === "string" && typeof o.src_validator_addr === "string" && typeof o.dst_validator_addr === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.srcValidatorAddr !== "") {
            writer.uint32(18).string(message.srcValidatorAddr);
        }
        if (message.dstValidatorAddr !== "") {
            writer.uint32(26).string(message.dstValidatorAddr);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryRedelegationsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
                    break;
                case 2:
                    message.srcValidatorAddr = reader.string();
                    break;
                case 3:
                    message.dstValidatorAddr = reader.string();
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
        const message = createBaseQueryRedelegationsRequest();
        message.delegatorAddr = object.delegatorAddr ?? "";
        message.srcValidatorAddr = object.srcValidatorAddr ?? "";
        message.dstValidatorAddr = object.dstValidatorAddr ?? "";
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryRedelegationsRequest();
        if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
            message.delegatorAddr = object.delegator_addr;
        }
        if (object.src_validator_addr !== undefined && object.src_validator_addr !== null) {
            message.srcValidatorAddr = object.src_validator_addr;
        }
        if (object.dst_validator_addr !== undefined && object.dst_validator_addr !== null) {
            message.dstValidatorAddr = object.dst_validator_addr;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_addr = message.delegatorAddr === "" ? undefined : message.delegatorAddr;
        obj.src_validator_addr = message.srcValidatorAddr === "" ? undefined : message.srcValidatorAddr;
        obj.dst_validator_addr = message.dstValidatorAddr === "" ? undefined : message.dstValidatorAddr;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryRedelegationsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryRedelegationsRequest",
            value: QueryRedelegationsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryRedelegationsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryRedelegationsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryRedelegationsRequest",
            value: QueryRedelegationsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryRedelegationsRequest.typeUrl, QueryRedelegationsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryRedelegationsRequest.aminoType, QueryRedelegationsRequest.typeUrl);
function createBaseQueryRedelegationsResponse() {
    return {
        redelegationResponses: [],
        pagination: undefined
    };
}
export const QueryRedelegationsResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryRedelegationsResponse",
    aminoType: "cosmos-sdk/QueryRedelegationsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryRedelegationsResponse.typeUrl || Array.isArray(o.redelegationResponses) && (!o.redelegationResponses.length || RedelegationResponse.is(o.redelegationResponses[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryRedelegationsResponse.typeUrl || Array.isArray(o.redelegation_responses) && (!o.redelegation_responses.length || RedelegationResponse.isSDK(o.redelegation_responses[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryRedelegationsResponse.typeUrl || Array.isArray(o.redelegation_responses) && (!o.redelegation_responses.length || RedelegationResponse.isAmino(o.redelegation_responses[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.redelegationResponses) {
            RedelegationResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryRedelegationsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.redelegationResponses.push(RedelegationResponse.decode(reader, reader.uint32()));
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
        const message = createBaseQueryRedelegationsResponse();
        message.redelegationResponses = object.redelegationResponses?.map(e => RedelegationResponse.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryRedelegationsResponse();
        message.redelegationResponses = object.redelegation_responses?.map(e => RedelegationResponse.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.redelegationResponses) {
            obj.redelegation_responses = message.redelegationResponses.map(e => e ? RedelegationResponse.toAmino(e) : undefined);
        }
        else {
            obj.redelegation_responses = message.redelegationResponses;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryRedelegationsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryRedelegationsResponse",
            value: QueryRedelegationsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryRedelegationsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryRedelegationsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryRedelegationsResponse",
            value: QueryRedelegationsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryRedelegationsResponse.typeUrl, QueryRedelegationsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryRedelegationsResponse.aminoType, QueryRedelegationsResponse.typeUrl);
function createBaseQueryDelegatorValidatorsRequest() {
    return {
        delegatorAddr: "",
        pagination: undefined
    };
}
export const QueryDelegatorValidatorsRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorValidatorsRequest",
    aminoType: "cosmos-sdk/QueryDelegatorValidatorsRequest",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsRequest.typeUrl || typeof o.delegatorAddr === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsRequest.typeUrl || typeof o.delegator_addr === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsRequest.typeUrl || typeof o.delegator_addr === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
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
                    message.delegatorAddr = reader.string();
                    break;
                case 2:
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
        const message = createBaseQueryDelegatorValidatorsRequest();
        message.delegatorAddr = object.delegatorAddr ?? "";
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorValidatorsRequest();
        if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
            message.delegatorAddr = object.delegator_addr;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_addr = message.delegatorAddr === "" ? undefined : message.delegatorAddr;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
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
            typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorValidatorsRequest",
            value: QueryDelegatorValidatorsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorValidatorsRequest.typeUrl, QueryDelegatorValidatorsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorValidatorsRequest.aminoType, QueryDelegatorValidatorsRequest.typeUrl);
function createBaseQueryDelegatorValidatorsResponse() {
    return {
        validators: [],
        pagination: undefined
    };
}
export const QueryDelegatorValidatorsResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorValidatorsResponse",
    aminoType: "cosmos-sdk/QueryDelegatorValidatorsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsResponse.typeUrl || Array.isArray(o.validators) && (!o.validators.length || Validator.is(o.validators[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsResponse.typeUrl || Array.isArray(o.validators) && (!o.validators.length || Validator.isSDK(o.validators[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorsResponse.typeUrl || Array.isArray(o.validators) && (!o.validators.length || Validator.isAmino(o.validators[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.validators) {
            Validator.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
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
                    message.validators.push(Validator.decode(reader, reader.uint32()));
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
        const message = createBaseQueryDelegatorValidatorsResponse();
        message.validators = object.validators?.map(e => Validator.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorValidatorsResponse();
        message.validators = object.validators?.map(e => Validator.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.validators) {
            obj.validators = message.validators.map(e => e ? Validator.toAmino(e) : undefined);
        }
        else {
            obj.validators = message.validators;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
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
            typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorValidatorsResponse",
            value: QueryDelegatorValidatorsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorValidatorsResponse.typeUrl, QueryDelegatorValidatorsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorValidatorsResponse.aminoType, QueryDelegatorValidatorsResponse.typeUrl);
function createBaseQueryDelegatorValidatorRequest() {
    return {
        delegatorAddr: "",
        validatorAddr: ""
    };
}
export const QueryDelegatorValidatorRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorValidatorRequest",
    aminoType: "cosmos-sdk/QueryDelegatorValidatorRequest",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorRequest.typeUrl || typeof o.delegatorAddr === "string" && typeof o.validatorAddr === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorRequest.typeUrl || typeof o.delegator_addr === "string" && typeof o.validator_addr === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorRequest.typeUrl || typeof o.delegator_addr === "string" && typeof o.validator_addr === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.validatorAddr !== "") {
            writer.uint32(18).string(message.validatorAddr);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorValidatorRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
                    break;
                case 2:
                    message.validatorAddr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDelegatorValidatorRequest();
        message.delegatorAddr = object.delegatorAddr ?? "";
        message.validatorAddr = object.validatorAddr ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorValidatorRequest();
        if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
            message.delegatorAddr = object.delegator_addr;
        }
        if (object.validator_addr !== undefined && object.validator_addr !== null) {
            message.validatorAddr = object.validator_addr;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_addr = message.delegatorAddr === "" ? undefined : message.delegatorAddr;
        obj.validator_addr = message.validatorAddr === "" ? undefined : message.validatorAddr;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegatorValidatorRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegatorValidatorRequest",
            value: QueryDelegatorValidatorRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegatorValidatorRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDelegatorValidatorRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorValidatorRequest",
            value: QueryDelegatorValidatorRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorValidatorRequest.typeUrl, QueryDelegatorValidatorRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorValidatorRequest.aminoType, QueryDelegatorValidatorRequest.typeUrl);
function createBaseQueryDelegatorValidatorResponse() {
    return {
        validator: Validator.fromPartial({})
    };
}
export const QueryDelegatorValidatorResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorValidatorResponse",
    aminoType: "cosmos-sdk/QueryDelegatorValidatorResponse",
    is(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorResponse.typeUrl || Validator.is(o.validator));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorResponse.typeUrl || Validator.isSDK(o.validator));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryDelegatorValidatorResponse.typeUrl || Validator.isAmino(o.validator));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.validator !== undefined) {
            Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorValidatorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = Validator.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDelegatorValidatorResponse();
        message.validator = object.validator !== undefined && object.validator !== null ? Validator.fromPartial(object.validator) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDelegatorValidatorResponse();
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = Validator.fromAmino(object.validator);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.validator = message.validator ? Validator.toAmino(message.validator) : Validator.toAmino(Validator.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDelegatorValidatorResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDelegatorValidatorResponse",
            value: QueryDelegatorValidatorResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDelegatorValidatorResponse.decode(message.value);
    },
    toProto(message) {
        return QueryDelegatorValidatorResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryDelegatorValidatorResponse",
            value: QueryDelegatorValidatorResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDelegatorValidatorResponse.typeUrl, QueryDelegatorValidatorResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDelegatorValidatorResponse.aminoType, QueryDelegatorValidatorResponse.typeUrl);
function createBaseQueryHistoricalInfoRequest() {
    return {
        height: BigInt(0)
    };
}
export const QueryHistoricalInfoRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryHistoricalInfoRequest",
    aminoType: "cosmos-sdk/QueryHistoricalInfoRequest",
    is(o) {
        return o && (o.$typeUrl === QueryHistoricalInfoRequest.typeUrl || typeof o.height === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryHistoricalInfoRequest.typeUrl || typeof o.height === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryHistoricalInfoRequest.typeUrl || typeof o.height === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.height !== BigInt(0)) {
            writer.uint32(8).int64(message.height);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryHistoricalInfoRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryHistoricalInfoRequest();
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryHistoricalInfoRequest();
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryHistoricalInfoRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryHistoricalInfoRequest",
            value: QueryHistoricalInfoRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryHistoricalInfoRequest.decode(message.value);
    },
    toProto(message) {
        return QueryHistoricalInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryHistoricalInfoRequest",
            value: QueryHistoricalInfoRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryHistoricalInfoRequest.typeUrl, QueryHistoricalInfoRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryHistoricalInfoRequest.aminoType, QueryHistoricalInfoRequest.typeUrl);
function createBaseQueryHistoricalInfoResponse() {
    return {
        hist: undefined
    };
}
export const QueryHistoricalInfoResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryHistoricalInfoResponse",
    aminoType: "cosmos-sdk/QueryHistoricalInfoResponse",
    is(o) {
        return o && o.$typeUrl === QueryHistoricalInfoResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryHistoricalInfoResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryHistoricalInfoResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.hist !== undefined) {
            HistoricalInfo.encode(message.hist, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryHistoricalInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hist = HistoricalInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryHistoricalInfoResponse();
        message.hist = object.hist !== undefined && object.hist !== null ? HistoricalInfo.fromPartial(object.hist) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryHistoricalInfoResponse();
        if (object.hist !== undefined && object.hist !== null) {
            message.hist = HistoricalInfo.fromAmino(object.hist);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.hist = message.hist ? HistoricalInfo.toAmino(message.hist) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryHistoricalInfoResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryHistoricalInfoResponse",
            value: QueryHistoricalInfoResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryHistoricalInfoResponse.decode(message.value);
    },
    toProto(message) {
        return QueryHistoricalInfoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryHistoricalInfoResponse",
            value: QueryHistoricalInfoResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryHistoricalInfoResponse.typeUrl, QueryHistoricalInfoResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryHistoricalInfoResponse.aminoType, QueryHistoricalInfoResponse.typeUrl);
function createBaseQueryPoolRequest() {
    return {};
}
export const QueryPoolRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryPoolRequest",
    aminoType: "cosmos-sdk/QueryPoolRequest",
    is(o) {
        return o && o.$typeUrl === QueryPoolRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryPoolRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryPoolRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPoolRequest();
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
        const message = createBaseQueryPoolRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryPoolRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryPoolRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryPoolRequest",
            value: QueryPoolRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryPoolRequest.decode(message.value);
    },
    toProto(message) {
        return QueryPoolRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryPoolRequest",
            value: QueryPoolRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPoolRequest.typeUrl, QueryPoolRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryPoolRequest.aminoType, QueryPoolRequest.typeUrl);
function createBaseQueryPoolResponse() {
    return {
        pool: Pool.fromPartial({})
    };
}
export const QueryPoolResponse = {
    typeUrl: "/cosmos.staking.v1beta1.QueryPoolResponse",
    aminoType: "cosmos-sdk/QueryPoolResponse",
    is(o) {
        return o && (o.$typeUrl === QueryPoolResponse.typeUrl || Pool.is(o.pool));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryPoolResponse.typeUrl || Pool.isSDK(o.pool));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryPoolResponse.typeUrl || Pool.isAmino(o.pool));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.pool !== undefined) {
            Pool.encode(message.pool, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPoolResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pool = Pool.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryPoolResponse();
        message.pool = object.pool !== undefined && object.pool !== null ? Pool.fromPartial(object.pool) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPoolResponse();
        if (object.pool !== undefined && object.pool !== null) {
            message.pool = Pool.fromAmino(object.pool);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pool = message.pool ? Pool.toAmino(message.pool) : Pool.toAmino(Pool.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return QueryPoolResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryPoolResponse",
            value: QueryPoolResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryPoolResponse.decode(message.value);
    },
    toProto(message) {
        return QueryPoolResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.QueryPoolResponse",
            value: QueryPoolResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPoolResponse.typeUrl, QueryPoolResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryPoolResponse.aminoType, QueryPoolResponse.typeUrl);
function createBaseQueryParamsRequest() {
    return {};
}
export const QueryParamsRequest = {
    typeUrl: "/cosmos.staking.v1beta1.QueryParamsRequest",
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
            typeUrl: "/cosmos.staking.v1beta1.QueryParamsRequest",
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
    typeUrl: "/cosmos.staking.v1beta1.QueryParamsResponse",
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
            typeUrl: "/cosmos.staking.v1beta1.QueryParamsResponse",
            value: QueryParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryParamsResponse.typeUrl, QueryParamsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryParamsResponse.aminoType, QueryParamsResponse.typeUrl);
