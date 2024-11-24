//@ts-nocheck
import { Header } from "../../../tendermint/types/types";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { Coin } from "../../base/v1beta1/coin";
import { ValidatorUpdate } from "../../../tendermint/abci/types";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
import { Decimal } from "@cosmjs/math";
import { toTimestamp, fromTimestamp, isSet } from "../../../helpers";
import { encodePubkey, decodePubkey } from "@cosmjs/proto-signing";
/** BondStatus is the status of a validator. */
export var BondStatus;
(function (BondStatus) {
    /** BOND_STATUS_UNSPECIFIED - UNSPECIFIED defines an invalid validator status. */
    BondStatus[BondStatus["BOND_STATUS_UNSPECIFIED"] = 0] = "BOND_STATUS_UNSPECIFIED";
    /** BOND_STATUS_UNBONDED - UNBONDED defines a validator that is not bonded. */
    BondStatus[BondStatus["BOND_STATUS_UNBONDED"] = 1] = "BOND_STATUS_UNBONDED";
    /** BOND_STATUS_UNBONDING - UNBONDING defines a validator that is unbonding. */
    BondStatus[BondStatus["BOND_STATUS_UNBONDING"] = 2] = "BOND_STATUS_UNBONDING";
    /** BOND_STATUS_BONDED - BONDED defines a validator that is bonded. */
    BondStatus[BondStatus["BOND_STATUS_BONDED"] = 3] = "BOND_STATUS_BONDED";
    BondStatus[BondStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(BondStatus || (BondStatus = {}));
export const BondStatusSDKType = BondStatus;
export const BondStatusAmino = BondStatus;
export function bondStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "BOND_STATUS_UNSPECIFIED":
            return BondStatus.BOND_STATUS_UNSPECIFIED;
        case 1:
        case "BOND_STATUS_UNBONDED":
            return BondStatus.BOND_STATUS_UNBONDED;
        case 2:
        case "BOND_STATUS_UNBONDING":
            return BondStatus.BOND_STATUS_UNBONDING;
        case 3:
        case "BOND_STATUS_BONDED":
            return BondStatus.BOND_STATUS_BONDED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return BondStatus.UNRECOGNIZED;
    }
}
export function bondStatusToJSON(object) {
    switch (object) {
        case BondStatus.BOND_STATUS_UNSPECIFIED:
            return "BOND_STATUS_UNSPECIFIED";
        case BondStatus.BOND_STATUS_UNBONDED:
            return "BOND_STATUS_UNBONDED";
        case BondStatus.BOND_STATUS_UNBONDING:
            return "BOND_STATUS_UNBONDING";
        case BondStatus.BOND_STATUS_BONDED:
            return "BOND_STATUS_BONDED";
        case BondStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/** Infraction indicates the infraction a validator commited. */
export var Infraction;
(function (Infraction) {
    /** INFRACTION_UNSPECIFIED - UNSPECIFIED defines an empty infraction. */
    Infraction[Infraction["INFRACTION_UNSPECIFIED"] = 0] = "INFRACTION_UNSPECIFIED";
    /** INFRACTION_DOUBLE_SIGN - DOUBLE_SIGN defines a validator that double-signs a block. */
    Infraction[Infraction["INFRACTION_DOUBLE_SIGN"] = 1] = "INFRACTION_DOUBLE_SIGN";
    /** INFRACTION_DOWNTIME - DOWNTIME defines a validator that missed signing too many blocks. */
    Infraction[Infraction["INFRACTION_DOWNTIME"] = 2] = "INFRACTION_DOWNTIME";
    Infraction[Infraction["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Infraction || (Infraction = {}));
export const InfractionSDKType = Infraction;
export const InfractionAmino = Infraction;
export function infractionFromJSON(object) {
    switch (object) {
        case 0:
        case "INFRACTION_UNSPECIFIED":
            return Infraction.INFRACTION_UNSPECIFIED;
        case 1:
        case "INFRACTION_DOUBLE_SIGN":
            return Infraction.INFRACTION_DOUBLE_SIGN;
        case 2:
        case "INFRACTION_DOWNTIME":
            return Infraction.INFRACTION_DOWNTIME;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Infraction.UNRECOGNIZED;
    }
}
export function infractionToJSON(object) {
    switch (object) {
        case Infraction.INFRACTION_UNSPECIFIED:
            return "INFRACTION_UNSPECIFIED";
        case Infraction.INFRACTION_DOUBLE_SIGN:
            return "INFRACTION_DOUBLE_SIGN";
        case Infraction.INFRACTION_DOWNTIME:
            return "INFRACTION_DOWNTIME";
        case Infraction.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseHistoricalInfo() {
    return {
        header: Header.fromPartial({}),
        valset: []
    };
}
export const HistoricalInfo = {
    typeUrl: "/cosmos.staking.v1beta1.HistoricalInfo",
    aminoType: "cosmos-sdk/HistoricalInfo",
    is(o) {
        return o && (o.$typeUrl === HistoricalInfo.typeUrl || Header.is(o.header) && Array.isArray(o.valset) && (!o.valset.length || Validator.is(o.valset[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === HistoricalInfo.typeUrl || Header.isSDK(o.header) && Array.isArray(o.valset) && (!o.valset.length || Validator.isSDK(o.valset[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === HistoricalInfo.typeUrl || Header.isAmino(o.header) && Array.isArray(o.valset) && (!o.valset.length || Validator.isAmino(o.valset[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.header !== undefined) {
            Header.encode(message.header, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.valset) {
            Validator.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHistoricalInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.header = Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.valset.push(Validator.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseHistoricalInfo();
        message.header = object.header !== undefined && object.header !== null ? Header.fromPartial(object.header) : undefined;
        message.valset = object.valset?.map(e => Validator.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseHistoricalInfo();
        if (object.header !== undefined && object.header !== null) {
            message.header = Header.fromAmino(object.header);
        }
        message.valset = object.valset?.map(e => Validator.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.header = message.header ? Header.toAmino(message.header) : Header.toAmino(Header.fromPartial({}));
        if (message.valset) {
            obj.valset = message.valset.map(e => e ? Validator.toAmino(e) : undefined);
        }
        else {
            obj.valset = message.valset;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return HistoricalInfo.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/HistoricalInfo",
            value: HistoricalInfo.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return HistoricalInfo.decode(message.value);
    },
    toProto(message) {
        return HistoricalInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.HistoricalInfo",
            value: HistoricalInfo.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(HistoricalInfo.typeUrl, HistoricalInfo);
GlobalDecoderRegistry.registerAminoProtoMapping(HistoricalInfo.aminoType, HistoricalInfo.typeUrl);
function createBaseCommissionRates() {
    return {
        rate: "",
        maxRate: "",
        maxChangeRate: ""
    };
}
export const CommissionRates = {
    typeUrl: "/cosmos.staking.v1beta1.CommissionRates",
    aminoType: "cosmos-sdk/CommissionRates",
    is(o) {
        return o && (o.$typeUrl === CommissionRates.typeUrl || typeof o.rate === "string" && typeof o.maxRate === "string" && typeof o.maxChangeRate === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === CommissionRates.typeUrl || typeof o.rate === "string" && typeof o.max_rate === "string" && typeof o.max_change_rate === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === CommissionRates.typeUrl || typeof o.rate === "string" && typeof o.max_rate === "string" && typeof o.max_change_rate === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.rate !== "") {
            writer.uint32(10).string(Decimal.fromUserInput(message.rate, 18).atomics);
        }
        if (message.maxRate !== "") {
            writer.uint32(18).string(Decimal.fromUserInput(message.maxRate, 18).atomics);
        }
        if (message.maxChangeRate !== "") {
            writer.uint32(26).string(Decimal.fromUserInput(message.maxChangeRate, 18).atomics);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCommissionRates();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rate = Decimal.fromAtomics(reader.string(), 18).toString();
                    break;
                case 2:
                    message.maxRate = Decimal.fromAtomics(reader.string(), 18).toString();
                    break;
                case 3:
                    message.maxChangeRate = Decimal.fromAtomics(reader.string(), 18).toString();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseCommissionRates();
        message.rate = object.rate ?? "";
        message.maxRate = object.maxRate ?? "";
        message.maxChangeRate = object.maxChangeRate ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseCommissionRates();
        if (object.rate !== undefined && object.rate !== null) {
            message.rate = object.rate;
        }
        if (object.max_rate !== undefined && object.max_rate !== null) {
            message.maxRate = object.max_rate;
        }
        if (object.max_change_rate !== undefined && object.max_change_rate !== null) {
            message.maxChangeRate = object.max_change_rate;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.rate = message.rate ?? "";
        obj.max_rate = message.maxRate ?? "";
        obj.max_change_rate = message.maxChangeRate ?? "";
        return obj;
    },
    fromAminoMsg(object) {
        return CommissionRates.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/CommissionRates",
            value: CommissionRates.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return CommissionRates.decode(message.value);
    },
    toProto(message) {
        return CommissionRates.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.CommissionRates",
            value: CommissionRates.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(CommissionRates.typeUrl, CommissionRates);
GlobalDecoderRegistry.registerAminoProtoMapping(CommissionRates.aminoType, CommissionRates.typeUrl);
function createBaseCommission() {
    return {
        commissionRates: CommissionRates.fromPartial({}),
        updateTime: new Date()
    };
}
export const Commission = {
    typeUrl: "/cosmos.staking.v1beta1.Commission",
    aminoType: "cosmos-sdk/Commission",
    is(o) {
        return o && (o.$typeUrl === Commission.typeUrl || CommissionRates.is(o.commissionRates) && Timestamp.is(o.updateTime));
    },
    isSDK(o) {
        return o && (o.$typeUrl === Commission.typeUrl || CommissionRates.isSDK(o.commission_rates) && Timestamp.isSDK(o.update_time));
    },
    isAmino(o) {
        return o && (o.$typeUrl === Commission.typeUrl || CommissionRates.isAmino(o.commission_rates) && Timestamp.isAmino(o.update_time));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.commissionRates !== undefined) {
            CommissionRates.encode(message.commissionRates, writer.uint32(10).fork()).ldelim();
        }
        if (message.updateTime !== undefined) {
            Timestamp.encode(toTimestamp(message.updateTime), writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCommission();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.commissionRates = CommissionRates.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.updateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseCommission();
        message.commissionRates = object.commissionRates !== undefined && object.commissionRates !== null ? CommissionRates.fromPartial(object.commissionRates) : undefined;
        message.updateTime = object.updateTime ?? undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseCommission();
        if (object.commission_rates !== undefined && object.commission_rates !== null) {
            message.commissionRates = CommissionRates.fromAmino(object.commission_rates);
        }
        if (object.update_time !== undefined && object.update_time !== null) {
            message.updateTime = fromTimestamp(Timestamp.fromAmino(object.update_time));
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.commission_rates = message.commissionRates ? CommissionRates.toAmino(message.commissionRates) : CommissionRates.toAmino(CommissionRates.fromPartial({}));
        obj.update_time = message.updateTime ? Timestamp.toAmino(toTimestamp(message.updateTime)) : new Date();
        return obj;
    },
    fromAminoMsg(object) {
        return Commission.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Commission",
            value: Commission.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Commission.decode(message.value);
    },
    toProto(message) {
        return Commission.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.Commission",
            value: Commission.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Commission.typeUrl, Commission);
GlobalDecoderRegistry.registerAminoProtoMapping(Commission.aminoType, Commission.typeUrl);
function createBaseDescription() {
    return {
        moniker: "",
        identity: "",
        website: "",
        securityContact: "",
        details: ""
    };
}
export const Description = {
    typeUrl: "/cosmos.staking.v1beta1.Description",
    aminoType: "cosmos-sdk/Description",
    is(o) {
        return o && (o.$typeUrl === Description.typeUrl || typeof o.moniker === "string" && typeof o.identity === "string" && typeof o.website === "string" && typeof o.securityContact === "string" && typeof o.details === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Description.typeUrl || typeof o.moniker === "string" && typeof o.identity === "string" && typeof o.website === "string" && typeof o.security_contact === "string" && typeof o.details === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Description.typeUrl || typeof o.moniker === "string" && typeof o.identity === "string" && typeof o.website === "string" && typeof o.security_contact === "string" && typeof o.details === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.moniker !== "") {
            writer.uint32(10).string(message.moniker);
        }
        if (message.identity !== "") {
            writer.uint32(18).string(message.identity);
        }
        if (message.website !== "") {
            writer.uint32(26).string(message.website);
        }
        if (message.securityContact !== "") {
            writer.uint32(34).string(message.securityContact);
        }
        if (message.details !== "") {
            writer.uint32(42).string(message.details);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDescription();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.moniker = reader.string();
                    break;
                case 2:
                    message.identity = reader.string();
                    break;
                case 3:
                    message.website = reader.string();
                    break;
                case 4:
                    message.securityContact = reader.string();
                    break;
                case 5:
                    message.details = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDescription();
        message.moniker = object.moniker ?? "";
        message.identity = object.identity ?? "";
        message.website = object.website ?? "";
        message.securityContact = object.securityContact ?? "";
        message.details = object.details ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseDescription();
        if (object.moniker !== undefined && object.moniker !== null) {
            message.moniker = object.moniker;
        }
        if (object.identity !== undefined && object.identity !== null) {
            message.identity = object.identity;
        }
        if (object.website !== undefined && object.website !== null) {
            message.website = object.website;
        }
        if (object.security_contact !== undefined && object.security_contact !== null) {
            message.securityContact = object.security_contact;
        }
        if (object.details !== undefined && object.details !== null) {
            message.details = object.details;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.moniker = message.moniker === "" ? undefined : message.moniker;
        obj.identity = message.identity === "" ? undefined : message.identity;
        obj.website = message.website === "" ? undefined : message.website;
        obj.security_contact = message.securityContact === "" ? undefined : message.securityContact;
        obj.details = message.details === "" ? undefined : message.details;
        return obj;
    },
    fromAminoMsg(object) {
        return Description.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Description",
            value: Description.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Description.decode(message.value);
    },
    toProto(message) {
        return Description.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.Description",
            value: Description.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Description.typeUrl, Description);
GlobalDecoderRegistry.registerAminoProtoMapping(Description.aminoType, Description.typeUrl);
function createBaseValidator() {
    return {
        operatorAddress: "",
        consensusPubkey: undefined,
        jailed: false,
        status: 0,
        tokens: "",
        delegatorShares: "",
        description: Description.fromPartial({}),
        unbondingHeight: BigInt(0),
        unbondingTime: new Date(),
        commission: Commission.fromPartial({}),
        minSelfDelegation: "",
        unbondingOnHoldRefCount: BigInt(0),
        unbondingIds: []
    };
}
export const Validator = {
    typeUrl: "/cosmos.staking.v1beta1.Validator",
    aminoType: "cosmos-sdk/Validator",
    is(o) {
        return o && (o.$typeUrl === Validator.typeUrl || typeof o.operatorAddress === "string" && typeof o.jailed === "boolean" && isSet(o.status) && typeof o.tokens === "string" && typeof o.delegatorShares === "string" && Description.is(o.description) && typeof o.unbondingHeight === "bigint" && Timestamp.is(o.unbondingTime) && Commission.is(o.commission) && typeof o.minSelfDelegation === "string" && typeof o.unbondingOnHoldRefCount === "bigint" && Array.isArray(o.unbondingIds) && (!o.unbondingIds.length || typeof o.unbondingIds[0] === "bigint"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === Validator.typeUrl || typeof o.operator_address === "string" && typeof o.jailed === "boolean" && isSet(o.status) && typeof o.tokens === "string" && typeof o.delegator_shares === "string" && Description.isSDK(o.description) && typeof o.unbonding_height === "bigint" && Timestamp.isSDK(o.unbonding_time) && Commission.isSDK(o.commission) && typeof o.min_self_delegation === "string" && typeof o.unbonding_on_hold_ref_count === "bigint" && Array.isArray(o.unbonding_ids) && (!o.unbonding_ids.length || typeof o.unbonding_ids[0] === "bigint"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === Validator.typeUrl || typeof o.operator_address === "string" && typeof o.jailed === "boolean" && isSet(o.status) && typeof o.tokens === "string" && typeof o.delegator_shares === "string" && Description.isAmino(o.description) && typeof o.unbonding_height === "bigint" && Timestamp.isAmino(o.unbonding_time) && Commission.isAmino(o.commission) && typeof o.min_self_delegation === "string" && typeof o.unbonding_on_hold_ref_count === "bigint" && Array.isArray(o.unbonding_ids) && (!o.unbonding_ids.length || typeof o.unbonding_ids[0] === "bigint"));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.operatorAddress !== "") {
            writer.uint32(10).string(message.operatorAddress);
        }
        if (message.consensusPubkey !== undefined) {
            Any.encode(GlobalDecoderRegistry.wrapAny(message.consensusPubkey), writer.uint32(18).fork()).ldelim();
        }
        if (message.jailed === true) {
            writer.uint32(24).bool(message.jailed);
        }
        if (message.status !== 0) {
            writer.uint32(32).int32(message.status);
        }
        if (message.tokens !== "") {
            writer.uint32(42).string(message.tokens);
        }
        if (message.delegatorShares !== "") {
            writer.uint32(50).string(Decimal.fromUserInput(message.delegatorShares, 18).atomics);
        }
        if (message.description !== undefined) {
            Description.encode(message.description, writer.uint32(58).fork()).ldelim();
        }
        if (message.unbondingHeight !== BigInt(0)) {
            writer.uint32(64).int64(message.unbondingHeight);
        }
        if (message.unbondingTime !== undefined) {
            Timestamp.encode(toTimestamp(message.unbondingTime), writer.uint32(74).fork()).ldelim();
        }
        if (message.commission !== undefined) {
            Commission.encode(message.commission, writer.uint32(82).fork()).ldelim();
        }
        if (message.minSelfDelegation !== "") {
            writer.uint32(90).string(message.minSelfDelegation);
        }
        if (message.unbondingOnHoldRefCount !== BigInt(0)) {
            writer.uint32(96).int64(message.unbondingOnHoldRefCount);
        }
        writer.uint32(106).fork();
        for (const v of message.unbondingIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.operatorAddress = reader.string();
                    break;
                case 2:
                    message.consensusPubkey = GlobalDecoderRegistry.unwrapAny(reader);
                    break;
                case 3:
                    message.jailed = reader.bool();
                    break;
                case 4:
                    message.status = reader.int32();
                    break;
                case 5:
                    message.tokens = reader.string();
                    break;
                case 6:
                    message.delegatorShares = Decimal.fromAtomics(reader.string(), 18).toString();
                    break;
                case 7:
                    message.description = Description.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.unbondingHeight = reader.int64();
                    break;
                case 9:
                    message.unbondingTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 10:
                    message.commission = Commission.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.minSelfDelegation = reader.string();
                    break;
                case 12:
                    message.unbondingOnHoldRefCount = reader.int64();
                    break;
                case 13:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.unbondingIds.push(reader.uint64());
                        }
                    }
                    else {
                        message.unbondingIds.push(reader.uint64());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValidator();
        message.operatorAddress = object.operatorAddress ?? "";
        message.consensusPubkey = object.consensusPubkey !== undefined && object.consensusPubkey !== null ? GlobalDecoderRegistry.fromPartial(object.consensusPubkey) : undefined;
        message.jailed = object.jailed ?? false;
        message.status = object.status ?? 0;
        message.tokens = object.tokens ?? "";
        message.delegatorShares = object.delegatorShares ?? "";
        message.description = object.description !== undefined && object.description !== null ? Description.fromPartial(object.description) : undefined;
        message.unbondingHeight = object.unbondingHeight !== undefined && object.unbondingHeight !== null ? BigInt(object.unbondingHeight.toString()) : BigInt(0);
        message.unbondingTime = object.unbondingTime ?? undefined;
        message.commission = object.commission !== undefined && object.commission !== null ? Commission.fromPartial(object.commission) : undefined;
        message.minSelfDelegation = object.minSelfDelegation ?? "";
        message.unbondingOnHoldRefCount = object.unbondingOnHoldRefCount !== undefined && object.unbondingOnHoldRefCount !== null ? BigInt(object.unbondingOnHoldRefCount.toString()) : BigInt(0);
        message.unbondingIds = object.unbondingIds?.map(e => BigInt(e.toString())) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseValidator();
        if (object.operator_address !== undefined && object.operator_address !== null) {
            message.operatorAddress = object.operator_address;
        }
        if (object.consensus_pubkey !== undefined && object.consensus_pubkey !== null) {
            message.consensusPubkey = encodePubkey(object.consensus_pubkey);
        }
        if (object.jailed !== undefined && object.jailed !== null) {
            message.jailed = object.jailed;
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        if (object.tokens !== undefined && object.tokens !== null) {
            message.tokens = object.tokens;
        }
        if (object.delegator_shares !== undefined && object.delegator_shares !== null) {
            message.delegatorShares = object.delegator_shares;
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = Description.fromAmino(object.description);
        }
        if (object.unbonding_height !== undefined && object.unbonding_height !== null) {
            message.unbondingHeight = BigInt(object.unbonding_height);
        }
        if (object.unbonding_time !== undefined && object.unbonding_time !== null) {
            message.unbondingTime = fromTimestamp(Timestamp.fromAmino(object.unbonding_time));
        }
        if (object.commission !== undefined && object.commission !== null) {
            message.commission = Commission.fromAmino(object.commission);
        }
        if (object.min_self_delegation !== undefined && object.min_self_delegation !== null) {
            message.minSelfDelegation = object.min_self_delegation;
        }
        if (object.unbonding_on_hold_ref_count !== undefined && object.unbonding_on_hold_ref_count !== null) {
            message.unbondingOnHoldRefCount = BigInt(object.unbonding_on_hold_ref_count);
        }
        message.unbondingIds = object.unbonding_ids?.map(e => BigInt(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.operator_address = message.operatorAddress === "" ? undefined : message.operatorAddress;
        obj.consensus_pubkey = message.consensusPubkey ? decodePubkey(message.consensusPubkey) : undefined;
        obj.jailed = message.jailed === false ? undefined : message.jailed;
        obj.status = message.status === 0 ? undefined : message.status;
        obj.tokens = message.tokens === "" ? undefined : message.tokens;
        obj.delegator_shares = message.delegatorShares === "" ? undefined : message.delegatorShares;
        obj.description = message.description ? Description.toAmino(message.description) : Description.toAmino(Description.fromPartial({}));
        obj.unbonding_height = message.unbondingHeight !== BigInt(0) ? message.unbondingHeight?.toString() : undefined;
        obj.unbonding_time = message.unbondingTime ? Timestamp.toAmino(toTimestamp(message.unbondingTime)) : new Date();
        obj.commission = message.commission ? Commission.toAmino(message.commission) : Commission.toAmino(Commission.fromPartial({}));
        obj.min_self_delegation = message.minSelfDelegation === "" ? undefined : message.minSelfDelegation;
        obj.unbonding_on_hold_ref_count = message.unbondingOnHoldRefCount !== BigInt(0) ? message.unbondingOnHoldRefCount?.toString() : undefined;
        if (message.unbondingIds) {
            obj.unbonding_ids = message.unbondingIds.map(e => e.toString());
        }
        else {
            obj.unbonding_ids = message.unbondingIds;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return Validator.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Validator",
            value: Validator.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Validator.decode(message.value);
    },
    toProto(message) {
        return Validator.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.Validator",
            value: Validator.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Validator.typeUrl, Validator);
GlobalDecoderRegistry.registerAminoProtoMapping(Validator.aminoType, Validator.typeUrl);
function createBaseValAddresses() {
    return {
        addresses: []
    };
}
export const ValAddresses = {
    typeUrl: "/cosmos.staking.v1beta1.ValAddresses",
    aminoType: "cosmos-sdk/ValAddresses",
    is(o) {
        return o && (o.$typeUrl === ValAddresses.typeUrl || Array.isArray(o.addresses) && (!o.addresses.length || typeof o.addresses[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ValAddresses.typeUrl || Array.isArray(o.addresses) && (!o.addresses.length || typeof o.addresses[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ValAddresses.typeUrl || Array.isArray(o.addresses) && (!o.addresses.length || typeof o.addresses[0] === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.addresses) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValAddresses();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.addresses.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValAddresses();
        message.addresses = object.addresses?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseValAddresses();
        message.addresses = object.addresses?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.addresses) {
            obj.addresses = message.addresses.map(e => e);
        }
        else {
            obj.addresses = message.addresses;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return ValAddresses.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ValAddresses",
            value: ValAddresses.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ValAddresses.decode(message.value);
    },
    toProto(message) {
        return ValAddresses.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.ValAddresses",
            value: ValAddresses.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ValAddresses.typeUrl, ValAddresses);
GlobalDecoderRegistry.registerAminoProtoMapping(ValAddresses.aminoType, ValAddresses.typeUrl);
function createBaseDVPair() {
    return {
        delegatorAddress: "",
        validatorAddress: ""
    };
}
export const DVPair = {
    typeUrl: "/cosmos.staking.v1beta1.DVPair",
    aminoType: "cosmos-sdk/DVPair",
    is(o) {
        return o && (o.$typeUrl === DVPair.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === DVPair.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === DVPair.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string");
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
        const message = createBaseDVPair();
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
        const message = createBaseDVPair();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseDVPair();
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
        return DVPair.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/DVPair",
            value: DVPair.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return DVPair.decode(message.value);
    },
    toProto(message) {
        return DVPair.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.DVPair",
            value: DVPair.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(DVPair.typeUrl, DVPair);
GlobalDecoderRegistry.registerAminoProtoMapping(DVPair.aminoType, DVPair.typeUrl);
function createBaseDVPairs() {
    return {
        pairs: []
    };
}
export const DVPairs = {
    typeUrl: "/cosmos.staking.v1beta1.DVPairs",
    aminoType: "cosmos-sdk/DVPairs",
    is(o) {
        return o && (o.$typeUrl === DVPairs.typeUrl || Array.isArray(o.pairs) && (!o.pairs.length || DVPair.is(o.pairs[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === DVPairs.typeUrl || Array.isArray(o.pairs) && (!o.pairs.length || DVPair.isSDK(o.pairs[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === DVPairs.typeUrl || Array.isArray(o.pairs) && (!o.pairs.length || DVPair.isAmino(o.pairs[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.pairs) {
            DVPair.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDVPairs();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pairs.push(DVPair.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDVPairs();
        message.pairs = object.pairs?.map(e => DVPair.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseDVPairs();
        message.pairs = object.pairs?.map(e => DVPair.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.pairs) {
            obj.pairs = message.pairs.map(e => e ? DVPair.toAmino(e) : undefined);
        }
        else {
            obj.pairs = message.pairs;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return DVPairs.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/DVPairs",
            value: DVPairs.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return DVPairs.decode(message.value);
    },
    toProto(message) {
        return DVPairs.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.DVPairs",
            value: DVPairs.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(DVPairs.typeUrl, DVPairs);
GlobalDecoderRegistry.registerAminoProtoMapping(DVPairs.aminoType, DVPairs.typeUrl);
function createBaseDVVTriplet() {
    return {
        delegatorAddress: "",
        validatorSrcAddress: "",
        validatorDstAddress: ""
    };
}
export const DVVTriplet = {
    typeUrl: "/cosmos.staking.v1beta1.DVVTriplet",
    aminoType: "cosmos-sdk/DVVTriplet",
    is(o) {
        return o && (o.$typeUrl === DVVTriplet.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorSrcAddress === "string" && typeof o.validatorDstAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === DVVTriplet.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_src_address === "string" && typeof o.validator_dst_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === DVVTriplet.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_src_address === "string" && typeof o.validator_dst_address === "string");
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
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDVVTriplet();
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDVVTriplet();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorSrcAddress = object.validatorSrcAddress ?? "";
        message.validatorDstAddress = object.validatorDstAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseDVVTriplet();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.validator_src_address !== undefined && object.validator_src_address !== null) {
            message.validatorSrcAddress = object.validator_src_address;
        }
        if (object.validator_dst_address !== undefined && object.validator_dst_address !== null) {
            message.validatorDstAddress = object.validator_dst_address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.validator_src_address = message.validatorSrcAddress === "" ? undefined : message.validatorSrcAddress;
        obj.validator_dst_address = message.validatorDstAddress === "" ? undefined : message.validatorDstAddress;
        return obj;
    },
    fromAminoMsg(object) {
        return DVVTriplet.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/DVVTriplet",
            value: DVVTriplet.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return DVVTriplet.decode(message.value);
    },
    toProto(message) {
        return DVVTriplet.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.DVVTriplet",
            value: DVVTriplet.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(DVVTriplet.typeUrl, DVVTriplet);
GlobalDecoderRegistry.registerAminoProtoMapping(DVVTriplet.aminoType, DVVTriplet.typeUrl);
function createBaseDVVTriplets() {
    return {
        triplets: []
    };
}
export const DVVTriplets = {
    typeUrl: "/cosmos.staking.v1beta1.DVVTriplets",
    aminoType: "cosmos-sdk/DVVTriplets",
    is(o) {
        return o && (o.$typeUrl === DVVTriplets.typeUrl || Array.isArray(o.triplets) && (!o.triplets.length || DVVTriplet.is(o.triplets[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === DVVTriplets.typeUrl || Array.isArray(o.triplets) && (!o.triplets.length || DVVTriplet.isSDK(o.triplets[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === DVVTriplets.typeUrl || Array.isArray(o.triplets) && (!o.triplets.length || DVVTriplet.isAmino(o.triplets[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.triplets) {
            DVVTriplet.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDVVTriplets();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.triplets.push(DVVTriplet.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDVVTriplets();
        message.triplets = object.triplets?.map(e => DVVTriplet.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseDVVTriplets();
        message.triplets = object.triplets?.map(e => DVVTriplet.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.triplets) {
            obj.triplets = message.triplets.map(e => e ? DVVTriplet.toAmino(e) : undefined);
        }
        else {
            obj.triplets = message.triplets;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return DVVTriplets.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/DVVTriplets",
            value: DVVTriplets.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return DVVTriplets.decode(message.value);
    },
    toProto(message) {
        return DVVTriplets.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.DVVTriplets",
            value: DVVTriplets.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(DVVTriplets.typeUrl, DVVTriplets);
GlobalDecoderRegistry.registerAminoProtoMapping(DVVTriplets.aminoType, DVVTriplets.typeUrl);
function createBaseDelegation() {
    return {
        delegatorAddress: "",
        validatorAddress: "",
        shares: ""
    };
}
export const Delegation = {
    typeUrl: "/cosmos.staking.v1beta1.Delegation",
    aminoType: "cosmos-sdk/Delegation",
    is(o) {
        return o && (o.$typeUrl === Delegation.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorAddress === "string" && typeof o.shares === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Delegation.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && typeof o.shares === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Delegation.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && typeof o.shares === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        if (message.shares !== "") {
            writer.uint32(26).string(Decimal.fromUserInput(message.shares, 18).atomics);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDelegation();
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
                    message.shares = Decimal.fromAtomics(reader.string(), 18).toString();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDelegation();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        message.shares = object.shares ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseDelegation();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        if (object.shares !== undefined && object.shares !== null) {
            message.shares = object.shares;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        obj.shares = message.shares === "" ? undefined : message.shares;
        return obj;
    },
    fromAminoMsg(object) {
        return Delegation.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Delegation",
            value: Delegation.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Delegation.decode(message.value);
    },
    toProto(message) {
        return Delegation.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.Delegation",
            value: Delegation.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Delegation.typeUrl, Delegation);
GlobalDecoderRegistry.registerAminoProtoMapping(Delegation.aminoType, Delegation.typeUrl);
function createBaseUnbondingDelegation() {
    return {
        delegatorAddress: "",
        validatorAddress: "",
        entries: []
    };
}
export const UnbondingDelegation = {
    typeUrl: "/cosmos.staking.v1beta1.UnbondingDelegation",
    aminoType: "cosmos-sdk/UnbondingDelegation",
    is(o) {
        return o && (o.$typeUrl === UnbondingDelegation.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorAddress === "string" && Array.isArray(o.entries) && (!o.entries.length || UnbondingDelegationEntry.is(o.entries[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === UnbondingDelegation.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && Array.isArray(o.entries) && (!o.entries.length || UnbondingDelegationEntry.isSDK(o.entries[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === UnbondingDelegation.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_address === "string" && Array.isArray(o.entries) && (!o.entries.length || UnbondingDelegationEntry.isAmino(o.entries[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        for (const v of message.entries) {
            UnbondingDelegationEntry.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUnbondingDelegation();
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
                    message.entries.push(UnbondingDelegationEntry.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseUnbondingDelegation();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        message.entries = object.entries?.map(e => UnbondingDelegationEntry.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseUnbondingDelegation();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.validator_address !== undefined && object.validator_address !== null) {
            message.validatorAddress = object.validator_address;
        }
        message.entries = object.entries?.map(e => UnbondingDelegationEntry.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
        if (message.entries) {
            obj.entries = message.entries.map(e => e ? UnbondingDelegationEntry.toAmino(e) : undefined);
        }
        else {
            obj.entries = message.entries;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return UnbondingDelegation.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/UnbondingDelegation",
            value: UnbondingDelegation.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return UnbondingDelegation.decode(message.value);
    },
    toProto(message) {
        return UnbondingDelegation.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.UnbondingDelegation",
            value: UnbondingDelegation.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(UnbondingDelegation.typeUrl, UnbondingDelegation);
GlobalDecoderRegistry.registerAminoProtoMapping(UnbondingDelegation.aminoType, UnbondingDelegation.typeUrl);
function createBaseUnbondingDelegationEntry() {
    return {
        creationHeight: BigInt(0),
        completionTime: new Date(),
        initialBalance: "",
        balance: "",
        unbondingId: BigInt(0),
        unbondingOnHoldRefCount: BigInt(0)
    };
}
export const UnbondingDelegationEntry = {
    typeUrl: "/cosmos.staking.v1beta1.UnbondingDelegationEntry",
    aminoType: "cosmos-sdk/UnbondingDelegationEntry",
    is(o) {
        return o && (o.$typeUrl === UnbondingDelegationEntry.typeUrl || typeof o.creationHeight === "bigint" && Timestamp.is(o.completionTime) && typeof o.initialBalance === "string" && typeof o.balance === "string" && typeof o.unbondingId === "bigint" && typeof o.unbondingOnHoldRefCount === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === UnbondingDelegationEntry.typeUrl || typeof o.creation_height === "bigint" && Timestamp.isSDK(o.completion_time) && typeof o.initial_balance === "string" && typeof o.balance === "string" && typeof o.unbonding_id === "bigint" && typeof o.unbonding_on_hold_ref_count === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === UnbondingDelegationEntry.typeUrl || typeof o.creation_height === "bigint" && Timestamp.isAmino(o.completion_time) && typeof o.initial_balance === "string" && typeof o.balance === "string" && typeof o.unbonding_id === "bigint" && typeof o.unbonding_on_hold_ref_count === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.creationHeight !== BigInt(0)) {
            writer.uint32(8).int64(message.creationHeight);
        }
        if (message.completionTime !== undefined) {
            Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(18).fork()).ldelim();
        }
        if (message.initialBalance !== "") {
            writer.uint32(26).string(message.initialBalance);
        }
        if (message.balance !== "") {
            writer.uint32(34).string(message.balance);
        }
        if (message.unbondingId !== BigInt(0)) {
            writer.uint32(40).uint64(message.unbondingId);
        }
        if (message.unbondingOnHoldRefCount !== BigInt(0)) {
            writer.uint32(48).int64(message.unbondingOnHoldRefCount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUnbondingDelegationEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creationHeight = reader.int64();
                    break;
                case 2:
                    message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.initialBalance = reader.string();
                    break;
                case 4:
                    message.balance = reader.string();
                    break;
                case 5:
                    message.unbondingId = reader.uint64();
                    break;
                case 6:
                    message.unbondingOnHoldRefCount = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseUnbondingDelegationEntry();
        message.creationHeight = object.creationHeight !== undefined && object.creationHeight !== null ? BigInt(object.creationHeight.toString()) : BigInt(0);
        message.completionTime = object.completionTime ?? undefined;
        message.initialBalance = object.initialBalance ?? "";
        message.balance = object.balance ?? "";
        message.unbondingId = object.unbondingId !== undefined && object.unbondingId !== null ? BigInt(object.unbondingId.toString()) : BigInt(0);
        message.unbondingOnHoldRefCount = object.unbondingOnHoldRefCount !== undefined && object.unbondingOnHoldRefCount !== null ? BigInt(object.unbondingOnHoldRefCount.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseUnbondingDelegationEntry();
        if (object.creation_height !== undefined && object.creation_height !== null) {
            message.creationHeight = BigInt(object.creation_height);
        }
        if (object.completion_time !== undefined && object.completion_time !== null) {
            message.completionTime = fromTimestamp(Timestamp.fromAmino(object.completion_time));
        }
        if (object.initial_balance !== undefined && object.initial_balance !== null) {
            message.initialBalance = object.initial_balance;
        }
        if (object.balance !== undefined && object.balance !== null) {
            message.balance = object.balance;
        }
        if (object.unbonding_id !== undefined && object.unbonding_id !== null) {
            message.unbondingId = BigInt(object.unbonding_id);
        }
        if (object.unbonding_on_hold_ref_count !== undefined && object.unbonding_on_hold_ref_count !== null) {
            message.unbondingOnHoldRefCount = BigInt(object.unbonding_on_hold_ref_count);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.creation_height = message.creationHeight !== BigInt(0) ? message.creationHeight?.toString() : undefined;
        obj.completion_time = message.completionTime ? Timestamp.toAmino(toTimestamp(message.completionTime)) : new Date();
        obj.initial_balance = message.initialBalance === "" ? undefined : message.initialBalance;
        obj.balance = message.balance === "" ? undefined : message.balance;
        obj.unbonding_id = message.unbondingId !== BigInt(0) ? message.unbondingId?.toString() : undefined;
        obj.unbonding_on_hold_ref_count = message.unbondingOnHoldRefCount !== BigInt(0) ? message.unbondingOnHoldRefCount?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return UnbondingDelegationEntry.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/UnbondingDelegationEntry",
            value: UnbondingDelegationEntry.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return UnbondingDelegationEntry.decode(message.value);
    },
    toProto(message) {
        return UnbondingDelegationEntry.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.UnbondingDelegationEntry",
            value: UnbondingDelegationEntry.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(UnbondingDelegationEntry.typeUrl, UnbondingDelegationEntry);
GlobalDecoderRegistry.registerAminoProtoMapping(UnbondingDelegationEntry.aminoType, UnbondingDelegationEntry.typeUrl);
function createBaseRedelegationEntry() {
    return {
        creationHeight: BigInt(0),
        completionTime: new Date(),
        initialBalance: "",
        sharesDst: "",
        unbondingId: BigInt(0),
        unbondingOnHoldRefCount: BigInt(0)
    };
}
export const RedelegationEntry = {
    typeUrl: "/cosmos.staking.v1beta1.RedelegationEntry",
    aminoType: "cosmos-sdk/RedelegationEntry",
    is(o) {
        return o && (o.$typeUrl === RedelegationEntry.typeUrl || typeof o.creationHeight === "bigint" && Timestamp.is(o.completionTime) && typeof o.initialBalance === "string" && typeof o.sharesDst === "string" && typeof o.unbondingId === "bigint" && typeof o.unbondingOnHoldRefCount === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === RedelegationEntry.typeUrl || typeof o.creation_height === "bigint" && Timestamp.isSDK(o.completion_time) && typeof o.initial_balance === "string" && typeof o.shares_dst === "string" && typeof o.unbonding_id === "bigint" && typeof o.unbonding_on_hold_ref_count === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === RedelegationEntry.typeUrl || typeof o.creation_height === "bigint" && Timestamp.isAmino(o.completion_time) && typeof o.initial_balance === "string" && typeof o.shares_dst === "string" && typeof o.unbonding_id === "bigint" && typeof o.unbonding_on_hold_ref_count === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.creationHeight !== BigInt(0)) {
            writer.uint32(8).int64(message.creationHeight);
        }
        if (message.completionTime !== undefined) {
            Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(18).fork()).ldelim();
        }
        if (message.initialBalance !== "") {
            writer.uint32(26).string(message.initialBalance);
        }
        if (message.sharesDst !== "") {
            writer.uint32(34).string(Decimal.fromUserInput(message.sharesDst, 18).atomics);
        }
        if (message.unbondingId !== BigInt(0)) {
            writer.uint32(40).uint64(message.unbondingId);
        }
        if (message.unbondingOnHoldRefCount !== BigInt(0)) {
            writer.uint32(48).int64(message.unbondingOnHoldRefCount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRedelegationEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creationHeight = reader.int64();
                    break;
                case 2:
                    message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.initialBalance = reader.string();
                    break;
                case 4:
                    message.sharesDst = Decimal.fromAtomics(reader.string(), 18).toString();
                    break;
                case 5:
                    message.unbondingId = reader.uint64();
                    break;
                case 6:
                    message.unbondingOnHoldRefCount = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRedelegationEntry();
        message.creationHeight = object.creationHeight !== undefined && object.creationHeight !== null ? BigInt(object.creationHeight.toString()) : BigInt(0);
        message.completionTime = object.completionTime ?? undefined;
        message.initialBalance = object.initialBalance ?? "";
        message.sharesDst = object.sharesDst ?? "";
        message.unbondingId = object.unbondingId !== undefined && object.unbondingId !== null ? BigInt(object.unbondingId.toString()) : BigInt(0);
        message.unbondingOnHoldRefCount = object.unbondingOnHoldRefCount !== undefined && object.unbondingOnHoldRefCount !== null ? BigInt(object.unbondingOnHoldRefCount.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseRedelegationEntry();
        if (object.creation_height !== undefined && object.creation_height !== null) {
            message.creationHeight = BigInt(object.creation_height);
        }
        if (object.completion_time !== undefined && object.completion_time !== null) {
            message.completionTime = fromTimestamp(Timestamp.fromAmino(object.completion_time));
        }
        if (object.initial_balance !== undefined && object.initial_balance !== null) {
            message.initialBalance = object.initial_balance;
        }
        if (object.shares_dst !== undefined && object.shares_dst !== null) {
            message.sharesDst = object.shares_dst;
        }
        if (object.unbonding_id !== undefined && object.unbonding_id !== null) {
            message.unbondingId = BigInt(object.unbonding_id);
        }
        if (object.unbonding_on_hold_ref_count !== undefined && object.unbonding_on_hold_ref_count !== null) {
            message.unbondingOnHoldRefCount = BigInt(object.unbonding_on_hold_ref_count);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.creation_height = message.creationHeight !== BigInt(0) ? message.creationHeight?.toString() : undefined;
        obj.completion_time = message.completionTime ? Timestamp.toAmino(toTimestamp(message.completionTime)) : new Date();
        obj.initial_balance = message.initialBalance === "" ? undefined : message.initialBalance;
        obj.shares_dst = message.sharesDst === "" ? undefined : message.sharesDst;
        obj.unbonding_id = message.unbondingId !== BigInt(0) ? message.unbondingId?.toString() : undefined;
        obj.unbonding_on_hold_ref_count = message.unbondingOnHoldRefCount !== BigInt(0) ? message.unbondingOnHoldRefCount?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return RedelegationEntry.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/RedelegationEntry",
            value: RedelegationEntry.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return RedelegationEntry.decode(message.value);
    },
    toProto(message) {
        return RedelegationEntry.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.RedelegationEntry",
            value: RedelegationEntry.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(RedelegationEntry.typeUrl, RedelegationEntry);
GlobalDecoderRegistry.registerAminoProtoMapping(RedelegationEntry.aminoType, RedelegationEntry.typeUrl);
function createBaseRedelegation() {
    return {
        delegatorAddress: "",
        validatorSrcAddress: "",
        validatorDstAddress: "",
        entries: []
    };
}
export const Redelegation = {
    typeUrl: "/cosmos.staking.v1beta1.Redelegation",
    aminoType: "cosmos-sdk/Redelegation",
    is(o) {
        return o && (o.$typeUrl === Redelegation.typeUrl || typeof o.delegatorAddress === "string" && typeof o.validatorSrcAddress === "string" && typeof o.validatorDstAddress === "string" && Array.isArray(o.entries) && (!o.entries.length || RedelegationEntry.is(o.entries[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === Redelegation.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_src_address === "string" && typeof o.validator_dst_address === "string" && Array.isArray(o.entries) && (!o.entries.length || RedelegationEntry.isSDK(o.entries[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === Redelegation.typeUrl || typeof o.delegator_address === "string" && typeof o.validator_src_address === "string" && typeof o.validator_dst_address === "string" && Array.isArray(o.entries) && (!o.entries.length || RedelegationEntry.isAmino(o.entries[0])));
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
        for (const v of message.entries) {
            RedelegationEntry.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRedelegation();
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
                    message.entries.push(RedelegationEntry.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRedelegation();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorSrcAddress = object.validatorSrcAddress ?? "";
        message.validatorDstAddress = object.validatorDstAddress ?? "";
        message.entries = object.entries?.map(e => RedelegationEntry.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseRedelegation();
        if (object.delegator_address !== undefined && object.delegator_address !== null) {
            message.delegatorAddress = object.delegator_address;
        }
        if (object.validator_src_address !== undefined && object.validator_src_address !== null) {
            message.validatorSrcAddress = object.validator_src_address;
        }
        if (object.validator_dst_address !== undefined && object.validator_dst_address !== null) {
            message.validatorDstAddress = object.validator_dst_address;
        }
        message.entries = object.entries?.map(e => RedelegationEntry.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
        obj.validator_src_address = message.validatorSrcAddress === "" ? undefined : message.validatorSrcAddress;
        obj.validator_dst_address = message.validatorDstAddress === "" ? undefined : message.validatorDstAddress;
        if (message.entries) {
            obj.entries = message.entries.map(e => e ? RedelegationEntry.toAmino(e) : undefined);
        }
        else {
            obj.entries = message.entries;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return Redelegation.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Redelegation",
            value: Redelegation.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Redelegation.decode(message.value);
    },
    toProto(message) {
        return Redelegation.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.Redelegation",
            value: Redelegation.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Redelegation.typeUrl, Redelegation);
GlobalDecoderRegistry.registerAminoProtoMapping(Redelegation.aminoType, Redelegation.typeUrl);
function createBaseParams() {
    return {
        unbondingTime: Duration.fromPartial({}),
        maxValidators: 0,
        maxEntries: 0,
        historicalEntries: 0,
        bondDenom: "",
        minCommissionRate: ""
    };
}
export const Params = {
    typeUrl: "/cosmos.staking.v1beta1.Params",
    aminoType: "cosmos-sdk/x/staking/Params",
    is(o) {
        return o && (o.$typeUrl === Params.typeUrl || Duration.is(o.unbondingTime) && typeof o.maxValidators === "number" && typeof o.maxEntries === "number" && typeof o.historicalEntries === "number" && typeof o.bondDenom === "string" && typeof o.minCommissionRate === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Params.typeUrl || Duration.isSDK(o.unbonding_time) && typeof o.max_validators === "number" && typeof o.max_entries === "number" && typeof o.historical_entries === "number" && typeof o.bond_denom === "string" && typeof o.min_commission_rate === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Params.typeUrl || Duration.isAmino(o.unbonding_time) && typeof o.max_validators === "number" && typeof o.max_entries === "number" && typeof o.historical_entries === "number" && typeof o.bond_denom === "string" && typeof o.min_commission_rate === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.unbondingTime !== undefined) {
            Duration.encode(message.unbondingTime, writer.uint32(10).fork()).ldelim();
        }
        if (message.maxValidators !== 0) {
            writer.uint32(16).uint32(message.maxValidators);
        }
        if (message.maxEntries !== 0) {
            writer.uint32(24).uint32(message.maxEntries);
        }
        if (message.historicalEntries !== 0) {
            writer.uint32(32).uint32(message.historicalEntries);
        }
        if (message.bondDenom !== "") {
            writer.uint32(42).string(message.bondDenom);
        }
        if (message.minCommissionRate !== "") {
            writer.uint32(50).string(Decimal.fromUserInput(message.minCommissionRate, 18).atomics);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.unbondingTime = Duration.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.maxValidators = reader.uint32();
                    break;
                case 3:
                    message.maxEntries = reader.uint32();
                    break;
                case 4:
                    message.historicalEntries = reader.uint32();
                    break;
                case 5:
                    message.bondDenom = reader.string();
                    break;
                case 6:
                    message.minCommissionRate = Decimal.fromAtomics(reader.string(), 18).toString();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.unbondingTime = object.unbondingTime !== undefined && object.unbondingTime !== null ? Duration.fromPartial(object.unbondingTime) : undefined;
        message.maxValidators = object.maxValidators ?? 0;
        message.maxEntries = object.maxEntries ?? 0;
        message.historicalEntries = object.historicalEntries ?? 0;
        message.bondDenom = object.bondDenom ?? "";
        message.minCommissionRate = object.minCommissionRate ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseParams();
        if (object.unbonding_time !== undefined && object.unbonding_time !== null) {
            message.unbondingTime = Duration.fromAmino(object.unbonding_time);
        }
        if (object.max_validators !== undefined && object.max_validators !== null) {
            message.maxValidators = object.max_validators;
        }
        if (object.max_entries !== undefined && object.max_entries !== null) {
            message.maxEntries = object.max_entries;
        }
        if (object.historical_entries !== undefined && object.historical_entries !== null) {
            message.historicalEntries = object.historical_entries;
        }
        if (object.bond_denom !== undefined && object.bond_denom !== null) {
            message.bondDenom = object.bond_denom;
        }
        if (object.min_commission_rate !== undefined && object.min_commission_rate !== null) {
            message.minCommissionRate = object.min_commission_rate;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.unbonding_time = message.unbondingTime ? Duration.toAmino(message.unbondingTime) : Duration.toAmino(Duration.fromPartial({}));
        obj.max_validators = message.maxValidators === 0 ? undefined : message.maxValidators;
        obj.max_entries = message.maxEntries === 0 ? undefined : message.maxEntries;
        obj.historical_entries = message.historicalEntries === 0 ? undefined : message.historicalEntries;
        obj.bond_denom = message.bondDenom === "" ? undefined : message.bondDenom;
        obj.min_commission_rate = message.minCommissionRate ?? "";
        return obj;
    },
    fromAminoMsg(object) {
        return Params.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/x/staking/Params",
            value: Params.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Params.decode(message.value);
    },
    toProto(message) {
        return Params.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.Params",
            value: Params.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Params.typeUrl, Params);
GlobalDecoderRegistry.registerAminoProtoMapping(Params.aminoType, Params.typeUrl);
function createBaseDelegationResponse() {
    return {
        delegation: Delegation.fromPartial({}),
        balance: Coin.fromPartial({})
    };
}
export const DelegationResponse = {
    typeUrl: "/cosmos.staking.v1beta1.DelegationResponse",
    aminoType: "cosmos-sdk/DelegationResponse",
    is(o) {
        return o && (o.$typeUrl === DelegationResponse.typeUrl || Delegation.is(o.delegation) && Coin.is(o.balance));
    },
    isSDK(o) {
        return o && (o.$typeUrl === DelegationResponse.typeUrl || Delegation.isSDK(o.delegation) && Coin.isSDK(o.balance));
    },
    isAmino(o) {
        return o && (o.$typeUrl === DelegationResponse.typeUrl || Delegation.isAmino(o.delegation) && Coin.isAmino(o.balance));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.delegation !== undefined) {
            Delegation.encode(message.delegation, writer.uint32(10).fork()).ldelim();
        }
        if (message.balance !== undefined) {
            Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDelegationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegation = Delegation.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.balance = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDelegationResponse();
        message.delegation = object.delegation !== undefined && object.delegation !== null ? Delegation.fromPartial(object.delegation) : undefined;
        message.balance = object.balance !== undefined && object.balance !== null ? Coin.fromPartial(object.balance) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseDelegationResponse();
        if (object.delegation !== undefined && object.delegation !== null) {
            message.delegation = Delegation.fromAmino(object.delegation);
        }
        if (object.balance !== undefined && object.balance !== null) {
            message.balance = Coin.fromAmino(object.balance);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.delegation = message.delegation ? Delegation.toAmino(message.delegation) : Delegation.toAmino(Delegation.fromPartial({}));
        obj.balance = message.balance ? Coin.toAmino(message.balance) : Coin.toAmino(Coin.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return DelegationResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/DelegationResponse",
            value: DelegationResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return DelegationResponse.decode(message.value);
    },
    toProto(message) {
        return DelegationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.DelegationResponse",
            value: DelegationResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(DelegationResponse.typeUrl, DelegationResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(DelegationResponse.aminoType, DelegationResponse.typeUrl);
function createBaseRedelegationEntryResponse() {
    return {
        redelegationEntry: RedelegationEntry.fromPartial({}),
        balance: ""
    };
}
export const RedelegationEntryResponse = {
    typeUrl: "/cosmos.staking.v1beta1.RedelegationEntryResponse",
    aminoType: "cosmos-sdk/RedelegationEntryResponse",
    is(o) {
        return o && (o.$typeUrl === RedelegationEntryResponse.typeUrl || RedelegationEntry.is(o.redelegationEntry) && typeof o.balance === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === RedelegationEntryResponse.typeUrl || RedelegationEntry.isSDK(o.redelegation_entry) && typeof o.balance === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === RedelegationEntryResponse.typeUrl || RedelegationEntry.isAmino(o.redelegation_entry) && typeof o.balance === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.redelegationEntry !== undefined) {
            RedelegationEntry.encode(message.redelegationEntry, writer.uint32(10).fork()).ldelim();
        }
        if (message.balance !== "") {
            writer.uint32(34).string(message.balance);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRedelegationEntryResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.redelegationEntry = RedelegationEntry.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.balance = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRedelegationEntryResponse();
        message.redelegationEntry = object.redelegationEntry !== undefined && object.redelegationEntry !== null ? RedelegationEntry.fromPartial(object.redelegationEntry) : undefined;
        message.balance = object.balance ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseRedelegationEntryResponse();
        if (object.redelegation_entry !== undefined && object.redelegation_entry !== null) {
            message.redelegationEntry = RedelegationEntry.fromAmino(object.redelegation_entry);
        }
        if (object.balance !== undefined && object.balance !== null) {
            message.balance = object.balance;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.redelegation_entry = message.redelegationEntry ? RedelegationEntry.toAmino(message.redelegationEntry) : RedelegationEntry.toAmino(RedelegationEntry.fromPartial({}));
        obj.balance = message.balance === "" ? undefined : message.balance;
        return obj;
    },
    fromAminoMsg(object) {
        return RedelegationEntryResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/RedelegationEntryResponse",
            value: RedelegationEntryResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return RedelegationEntryResponse.decode(message.value);
    },
    toProto(message) {
        return RedelegationEntryResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.RedelegationEntryResponse",
            value: RedelegationEntryResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(RedelegationEntryResponse.typeUrl, RedelegationEntryResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(RedelegationEntryResponse.aminoType, RedelegationEntryResponse.typeUrl);
function createBaseRedelegationResponse() {
    return {
        redelegation: Redelegation.fromPartial({}),
        entries: []
    };
}
export const RedelegationResponse = {
    typeUrl: "/cosmos.staking.v1beta1.RedelegationResponse",
    aminoType: "cosmos-sdk/RedelegationResponse",
    is(o) {
        return o && (o.$typeUrl === RedelegationResponse.typeUrl || Redelegation.is(o.redelegation) && Array.isArray(o.entries) && (!o.entries.length || RedelegationEntryResponse.is(o.entries[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === RedelegationResponse.typeUrl || Redelegation.isSDK(o.redelegation) && Array.isArray(o.entries) && (!o.entries.length || RedelegationEntryResponse.isSDK(o.entries[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === RedelegationResponse.typeUrl || Redelegation.isAmino(o.redelegation) && Array.isArray(o.entries) && (!o.entries.length || RedelegationEntryResponse.isAmino(o.entries[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.redelegation !== undefined) {
            Redelegation.encode(message.redelegation, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.entries) {
            RedelegationEntryResponse.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRedelegationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.redelegation = Redelegation.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.entries.push(RedelegationEntryResponse.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRedelegationResponse();
        message.redelegation = object.redelegation !== undefined && object.redelegation !== null ? Redelegation.fromPartial(object.redelegation) : undefined;
        message.entries = object.entries?.map(e => RedelegationEntryResponse.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseRedelegationResponse();
        if (object.redelegation !== undefined && object.redelegation !== null) {
            message.redelegation = Redelegation.fromAmino(object.redelegation);
        }
        message.entries = object.entries?.map(e => RedelegationEntryResponse.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.redelegation = message.redelegation ? Redelegation.toAmino(message.redelegation) : Redelegation.toAmino(Redelegation.fromPartial({}));
        if (message.entries) {
            obj.entries = message.entries.map(e => e ? RedelegationEntryResponse.toAmino(e) : undefined);
        }
        else {
            obj.entries = message.entries;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return RedelegationResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/RedelegationResponse",
            value: RedelegationResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return RedelegationResponse.decode(message.value);
    },
    toProto(message) {
        return RedelegationResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.RedelegationResponse",
            value: RedelegationResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(RedelegationResponse.typeUrl, RedelegationResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(RedelegationResponse.aminoType, RedelegationResponse.typeUrl);
function createBasePool() {
    return {
        notBondedTokens: "",
        bondedTokens: ""
    };
}
export const Pool = {
    typeUrl: "/cosmos.staking.v1beta1.Pool",
    aminoType: "cosmos-sdk/Pool",
    is(o) {
        return o && (o.$typeUrl === Pool.typeUrl || typeof o.notBondedTokens === "string" && typeof o.bondedTokens === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Pool.typeUrl || typeof o.not_bonded_tokens === "string" && typeof o.bonded_tokens === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Pool.typeUrl || typeof o.not_bonded_tokens === "string" && typeof o.bonded_tokens === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.notBondedTokens !== "") {
            writer.uint32(10).string(message.notBondedTokens);
        }
        if (message.bondedTokens !== "") {
            writer.uint32(18).string(message.bondedTokens);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePool();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.notBondedTokens = reader.string();
                    break;
                case 2:
                    message.bondedTokens = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePool();
        message.notBondedTokens = object.notBondedTokens ?? "";
        message.bondedTokens = object.bondedTokens ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBasePool();
        if (object.not_bonded_tokens !== undefined && object.not_bonded_tokens !== null) {
            message.notBondedTokens = object.not_bonded_tokens;
        }
        if (object.bonded_tokens !== undefined && object.bonded_tokens !== null) {
            message.bondedTokens = object.bonded_tokens;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.not_bonded_tokens = message.notBondedTokens ?? "";
        obj.bonded_tokens = message.bondedTokens ?? "";
        return obj;
    },
    fromAminoMsg(object) {
        return Pool.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Pool",
            value: Pool.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Pool.decode(message.value);
    },
    toProto(message) {
        return Pool.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.Pool",
            value: Pool.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Pool.typeUrl, Pool);
GlobalDecoderRegistry.registerAminoProtoMapping(Pool.aminoType, Pool.typeUrl);
function createBaseValidatorUpdates() {
    return {
        updates: []
    };
}
export const ValidatorUpdates = {
    typeUrl: "/cosmos.staking.v1beta1.ValidatorUpdates",
    aminoType: "cosmos-sdk/ValidatorUpdates",
    is(o) {
        return o && (o.$typeUrl === ValidatorUpdates.typeUrl || Array.isArray(o.updates) && (!o.updates.length || ValidatorUpdate.is(o.updates[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ValidatorUpdates.typeUrl || Array.isArray(o.updates) && (!o.updates.length || ValidatorUpdate.isSDK(o.updates[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ValidatorUpdates.typeUrl || Array.isArray(o.updates) && (!o.updates.length || ValidatorUpdate.isAmino(o.updates[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.updates) {
            ValidatorUpdate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorUpdates();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.updates.push(ValidatorUpdate.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValidatorUpdates();
        message.updates = object.updates?.map(e => ValidatorUpdate.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseValidatorUpdates();
        message.updates = object.updates?.map(e => ValidatorUpdate.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.updates) {
            obj.updates = message.updates.map(e => e ? ValidatorUpdate.toAmino(e) : undefined);
        }
        else {
            obj.updates = message.updates;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return ValidatorUpdates.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ValidatorUpdates",
            value: ValidatorUpdates.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ValidatorUpdates.decode(message.value);
    },
    toProto(message) {
        return ValidatorUpdates.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.v1beta1.ValidatorUpdates",
            value: ValidatorUpdates.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ValidatorUpdates.typeUrl, ValidatorUpdates);
GlobalDecoderRegistry.registerAminoProtoMapping(ValidatorUpdates.aminoType, ValidatorUpdates.typeUrl);
