"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastValidatorPower = exports.GenesisState = void 0;
//@ts-nocheck
const staking_1 = require("./staking");
const binary_1 = require("../../../binary");
const helpers_1 = require("../../../helpers");
const registry_1 = require("../../../registry");
function createBaseGenesisState() {
    return {
        params: staking_1.Params.fromPartial({}),
        lastTotalPower: new Uint8Array(),
        lastValidatorPowers: [],
        validators: [],
        delegations: [],
        unbondingDelegations: [],
        redelegations: [],
        exported: false
    };
}
exports.GenesisState = {
    typeUrl: "/cosmos.staking.v1beta1.GenesisState",
    aminoType: "cosmos-sdk/GenesisState",
    is(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || staking_1.Params.is(o.params) && (o.lastTotalPower instanceof Uint8Array || typeof o.lastTotalPower === "string") && Array.isArray(o.lastValidatorPowers) && (!o.lastValidatorPowers.length || exports.LastValidatorPower.is(o.lastValidatorPowers[0])) && Array.isArray(o.validators) && (!o.validators.length || staking_1.Validator.is(o.validators[0])) && Array.isArray(o.delegations) && (!o.delegations.length || staking_1.Delegation.is(o.delegations[0])) && Array.isArray(o.unbondingDelegations) && (!o.unbondingDelegations.length || staking_1.UnbondingDelegation.is(o.unbondingDelegations[0])) && Array.isArray(o.redelegations) && (!o.redelegations.length || staking_1.Redelegation.is(o.redelegations[0])) && typeof o.exported === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || staking_1.Params.isSDK(o.params) && (o.last_total_power instanceof Uint8Array || typeof o.last_total_power === "string") && Array.isArray(o.last_validator_powers) && (!o.last_validator_powers.length || exports.LastValidatorPower.isSDK(o.last_validator_powers[0])) && Array.isArray(o.validators) && (!o.validators.length || staking_1.Validator.isSDK(o.validators[0])) && Array.isArray(o.delegations) && (!o.delegations.length || staking_1.Delegation.isSDK(o.delegations[0])) && Array.isArray(o.unbonding_delegations) && (!o.unbonding_delegations.length || staking_1.UnbondingDelegation.isSDK(o.unbonding_delegations[0])) && Array.isArray(o.redelegations) && (!o.redelegations.length || staking_1.Redelegation.isSDK(o.redelegations[0])) && typeof o.exported === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || staking_1.Params.isAmino(o.params) && (o.last_total_power instanceof Uint8Array || typeof o.last_total_power === "string") && Array.isArray(o.last_validator_powers) && (!o.last_validator_powers.length || exports.LastValidatorPower.isAmino(o.last_validator_powers[0])) && Array.isArray(o.validators) && (!o.validators.length || staking_1.Validator.isAmino(o.validators[0])) && Array.isArray(o.delegations) && (!o.delegations.length || staking_1.Delegation.isAmino(o.delegations[0])) && Array.isArray(o.unbonding_delegations) && (!o.unbonding_delegations.length || staking_1.UnbondingDelegation.isAmino(o.unbonding_delegations[0])) && Array.isArray(o.redelegations) && (!o.redelegations.length || staking_1.Redelegation.isAmino(o.redelegations[0])) && typeof o.exported === "boolean");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.params !== undefined) {
            staking_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        if (message.lastTotalPower.length !== 0) {
            writer.uint32(18).bytes(message.lastTotalPower);
        }
        for (const v of message.lastValidatorPowers) {
            exports.LastValidatorPower.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.validators) {
            staking_1.Validator.encode(v, writer.uint32(34).fork()).ldelim();
        }
        for (const v of message.delegations) {
            staking_1.Delegation.encode(v, writer.uint32(42).fork()).ldelim();
        }
        for (const v of message.unbondingDelegations) {
            staking_1.UnbondingDelegation.encode(v, writer.uint32(50).fork()).ldelim();
        }
        for (const v of message.redelegations) {
            staking_1.Redelegation.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.exported === true) {
            writer.uint32(64).bool(message.exported);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = staking_1.Params.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.lastTotalPower = reader.bytes();
                    break;
                case 3:
                    message.lastValidatorPowers.push(exports.LastValidatorPower.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.validators.push(staking_1.Validator.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.delegations.push(staking_1.Delegation.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.unbondingDelegations.push(staking_1.UnbondingDelegation.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.redelegations.push(staking_1.Redelegation.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.exported = reader.bool();
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
        message.params = object.params !== undefined && object.params !== null ? staking_1.Params.fromPartial(object.params) : undefined;
        message.lastTotalPower = object.lastTotalPower ?? new Uint8Array();
        message.lastValidatorPowers = object.lastValidatorPowers?.map(e => exports.LastValidatorPower.fromPartial(e)) || [];
        message.validators = object.validators?.map(e => staking_1.Validator.fromPartial(e)) || [];
        message.delegations = object.delegations?.map(e => staking_1.Delegation.fromPartial(e)) || [];
        message.unbondingDelegations = object.unbondingDelegations?.map(e => staking_1.UnbondingDelegation.fromPartial(e)) || [];
        message.redelegations = object.redelegations?.map(e => staking_1.Redelegation.fromPartial(e)) || [];
        message.exported = object.exported ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        if (object.params !== undefined && object.params !== null) {
            message.params = staking_1.Params.fromAmino(object.params);
        }
        if (object.last_total_power !== undefined && object.last_total_power !== null) {
            message.lastTotalPower = (0, helpers_1.bytesFromBase64)(object.last_total_power);
        }
        message.lastValidatorPowers = object.last_validator_powers?.map(e => exports.LastValidatorPower.fromAmino(e)) || [];
        message.validators = object.validators?.map(e => staking_1.Validator.fromAmino(e)) || [];
        message.delegations = object.delegations?.map(e => staking_1.Delegation.fromAmino(e)) || [];
        message.unbondingDelegations = object.unbonding_delegations?.map(e => staking_1.UnbondingDelegation.fromAmino(e)) || [];
        message.redelegations = object.redelegations?.map(e => staking_1.Redelegation.fromAmino(e)) || [];
        if (object.exported !== undefined && object.exported !== null) {
            message.exported = object.exported;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? staking_1.Params.toAmino(message.params) : staking_1.Params.toAmino(staking_1.Params.fromPartial({}));
        obj.last_total_power = message.lastTotalPower ? (0, helpers_1.base64FromBytes)(message.lastTotalPower) : "";
        if (message.lastValidatorPowers) {
            obj.last_validator_powers = message.lastValidatorPowers.map(e => e ? exports.LastValidatorPower.toAmino(e) : undefined);
        }
        else {
            obj.last_validator_powers = message.lastValidatorPowers;
        }
        if (message.validators) {
            obj.validators = message.validators.map(e => e ? staking_1.Validator.toAmino(e) : undefined);
        }
        else {
            obj.validators = message.validators;
        }
        if (message.delegations) {
            obj.delegations = message.delegations.map(e => e ? staking_1.Delegation.toAmino(e) : undefined);
        }
        else {
            obj.delegations = message.delegations;
        }
        if (message.unbondingDelegations) {
            obj.unbonding_delegations = message.unbondingDelegations.map(e => e ? staking_1.UnbondingDelegation.toAmino(e) : undefined);
        }
        else {
            obj.unbonding_delegations = message.unbondingDelegations;
        }
        if (message.redelegations) {
            obj.redelegations = message.redelegations.map(e => e ? staking_1.Redelegation.toAmino(e) : undefined);
        }
        else {
            obj.redelegations = message.redelegations;
        }
        obj.exported = message.exported === false ? undefined : message.exported;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GenesisState.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GenesisState",
            value: exports.GenesisState.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GenesisState.decode(message.value);
    },
    toProto(message) {
        return exports.GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.GenesisState",
            value: exports.GenesisState.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GenesisState.typeUrl, exports.GenesisState);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GenesisState.aminoType, exports.GenesisState.typeUrl);
function createBaseLastValidatorPower() {
    return {
        address: "",
        power: BigInt(0)
    };
}
exports.LastValidatorPower = {
    typeUrl: "/cosmos.staking.v1beta1.LastValidatorPower",
    aminoType: "cosmos-sdk/LastValidatorPower",
    is(o) {
        return o && (o.$typeUrl === exports.LastValidatorPower.typeUrl || typeof o.address === "string" && typeof o.power === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.LastValidatorPower.typeUrl || typeof o.address === "string" && typeof o.power === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.LastValidatorPower.typeUrl || typeof o.address === "string" && typeof o.power === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.power !== BigInt(0)) {
            writer.uint32(16).int64(message.power);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLastValidatorPower();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.power = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseLastValidatorPower();
        message.address = object.address ?? "";
        message.power = object.power !== undefined && object.power !== null ? BigInt(object.power.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseLastValidatorPower();
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        if (object.power !== undefined && object.power !== null) {
            message.power = BigInt(object.power);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address = message.address === "" ? undefined : message.address;
        obj.power = message.power !== BigInt(0) ? message.power?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.LastValidatorPower.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/LastValidatorPower",
            value: exports.LastValidatorPower.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.LastValidatorPower.decode(message.value);
    },
    toProto(message) {
        return exports.LastValidatorPower.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.LastValidatorPower",
            value: exports.LastValidatorPower.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.LastValidatorPower.typeUrl, exports.LastValidatorPower);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.LastValidatorPower.aminoType, exports.LastValidatorPower.typeUrl);
