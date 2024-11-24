"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceList = exports.LightClientAttackEvidence = exports.DuplicateVoteEvidence = exports.Evidence = void 0;
//@ts-nocheck
const types_1 = require("./types");
const timestamp_1 = require("../../google/protobuf/timestamp");
const validator_1 = require("./validator");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
const helpers_1 = require("../../helpers");
function createBaseEvidence() {
    return {
        duplicateVoteEvidence: undefined,
        lightClientAttackEvidence: undefined
    };
}
exports.Evidence = {
    typeUrl: "/tendermint.types.Evidence",
    is(o) {
        return o && o.$typeUrl === exports.Evidence.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.Evidence.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.Evidence.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.duplicateVoteEvidence !== undefined) {
            exports.DuplicateVoteEvidence.encode(message.duplicateVoteEvidence, writer.uint32(10).fork()).ldelim();
        }
        if (message.lightClientAttackEvidence !== undefined) {
            exports.LightClientAttackEvidence.encode(message.lightClientAttackEvidence, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEvidence();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.duplicateVoteEvidence = exports.DuplicateVoteEvidence.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.lightClientAttackEvidence = exports.LightClientAttackEvidence.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseEvidence();
        message.duplicateVoteEvidence = object.duplicateVoteEvidence !== undefined && object.duplicateVoteEvidence !== null ? exports.DuplicateVoteEvidence.fromPartial(object.duplicateVoteEvidence) : undefined;
        message.lightClientAttackEvidence = object.lightClientAttackEvidence !== undefined && object.lightClientAttackEvidence !== null ? exports.LightClientAttackEvidence.fromPartial(object.lightClientAttackEvidence) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseEvidence();
        if (object.duplicate_vote_evidence !== undefined && object.duplicate_vote_evidence !== null) {
            message.duplicateVoteEvidence = exports.DuplicateVoteEvidence.fromAmino(object.duplicate_vote_evidence);
        }
        if (object.light_client_attack_evidence !== undefined && object.light_client_attack_evidence !== null) {
            message.lightClientAttackEvidence = exports.LightClientAttackEvidence.fromAmino(object.light_client_attack_evidence);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.duplicate_vote_evidence = message.duplicateVoteEvidence ? exports.DuplicateVoteEvidence.toAmino(message.duplicateVoteEvidence) : undefined;
        obj.light_client_attack_evidence = message.lightClientAttackEvidence ? exports.LightClientAttackEvidence.toAmino(message.lightClientAttackEvidence) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Evidence.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Evidence.decode(message.value);
    },
    toProto(message) {
        return exports.Evidence.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.types.Evidence",
            value: exports.Evidence.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Evidence.typeUrl, exports.Evidence);
function createBaseDuplicateVoteEvidence() {
    return {
        voteA: undefined,
        voteB: undefined,
        totalVotingPower: BigInt(0),
        validatorPower: BigInt(0),
        timestamp: new Date()
    };
}
exports.DuplicateVoteEvidence = {
    typeUrl: "/tendermint.types.DuplicateVoteEvidence",
    is(o) {
        return o && (o.$typeUrl === exports.DuplicateVoteEvidence.typeUrl || typeof o.totalVotingPower === "bigint" && typeof o.validatorPower === "bigint" && timestamp_1.Timestamp.is(o.timestamp));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.DuplicateVoteEvidence.typeUrl || typeof o.total_voting_power === "bigint" && typeof o.validator_power === "bigint" && timestamp_1.Timestamp.isSDK(o.timestamp));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.DuplicateVoteEvidence.typeUrl || typeof o.total_voting_power === "bigint" && typeof o.validator_power === "bigint" && timestamp_1.Timestamp.isAmino(o.timestamp));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.voteA !== undefined) {
            types_1.Vote.encode(message.voteA, writer.uint32(10).fork()).ldelim();
        }
        if (message.voteB !== undefined) {
            types_1.Vote.encode(message.voteB, writer.uint32(18).fork()).ldelim();
        }
        if (message.totalVotingPower !== BigInt(0)) {
            writer.uint32(24).int64(message.totalVotingPower);
        }
        if (message.validatorPower !== BigInt(0)) {
            writer.uint32(32).int64(message.validatorPower);
        }
        if (message.timestamp !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.timestamp), writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDuplicateVoteEvidence();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.voteA = types_1.Vote.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.voteB = types_1.Vote.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.totalVotingPower = reader.int64();
                    break;
                case 4:
                    message.validatorPower = reader.int64();
                    break;
                case 5:
                    message.timestamp = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDuplicateVoteEvidence();
        message.voteA = object.voteA !== undefined && object.voteA !== null ? types_1.Vote.fromPartial(object.voteA) : undefined;
        message.voteB = object.voteB !== undefined && object.voteB !== null ? types_1.Vote.fromPartial(object.voteB) : undefined;
        message.totalVotingPower = object.totalVotingPower !== undefined && object.totalVotingPower !== null ? BigInt(object.totalVotingPower.toString()) : BigInt(0);
        message.validatorPower = object.validatorPower !== undefined && object.validatorPower !== null ? BigInt(object.validatorPower.toString()) : BigInt(0);
        message.timestamp = object.timestamp ?? undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseDuplicateVoteEvidence();
        if (object.vote_a !== undefined && object.vote_a !== null) {
            message.voteA = types_1.Vote.fromAmino(object.vote_a);
        }
        if (object.vote_b !== undefined && object.vote_b !== null) {
            message.voteB = types_1.Vote.fromAmino(object.vote_b);
        }
        if (object.total_voting_power !== undefined && object.total_voting_power !== null) {
            message.totalVotingPower = BigInt(object.total_voting_power);
        }
        if (object.validator_power !== undefined && object.validator_power !== null) {
            message.validatorPower = BigInt(object.validator_power);
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.timestamp));
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.vote_a = message.voteA ? types_1.Vote.toAmino(message.voteA) : undefined;
        obj.vote_b = message.voteB ? types_1.Vote.toAmino(message.voteB) : undefined;
        obj.total_voting_power = message.totalVotingPower !== BigInt(0) ? message.totalVotingPower?.toString() : undefined;
        obj.validator_power = message.validatorPower !== BigInt(0) ? message.validatorPower?.toString() : undefined;
        obj.timestamp = message.timestamp ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.timestamp)) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.DuplicateVoteEvidence.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.DuplicateVoteEvidence.decode(message.value);
    },
    toProto(message) {
        return exports.DuplicateVoteEvidence.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.types.DuplicateVoteEvidence",
            value: exports.DuplicateVoteEvidence.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.DuplicateVoteEvidence.typeUrl, exports.DuplicateVoteEvidence);
function createBaseLightClientAttackEvidence() {
    return {
        conflictingBlock: undefined,
        commonHeight: BigInt(0),
        byzantineValidators: [],
        totalVotingPower: BigInt(0),
        timestamp: new Date()
    };
}
exports.LightClientAttackEvidence = {
    typeUrl: "/tendermint.types.LightClientAttackEvidence",
    is(o) {
        return o && (o.$typeUrl === exports.LightClientAttackEvidence.typeUrl || typeof o.commonHeight === "bigint" && Array.isArray(o.byzantineValidators) && (!o.byzantineValidators.length || validator_1.Validator.is(o.byzantineValidators[0])) && typeof o.totalVotingPower === "bigint" && timestamp_1.Timestamp.is(o.timestamp));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.LightClientAttackEvidence.typeUrl || typeof o.common_height === "bigint" && Array.isArray(o.byzantine_validators) && (!o.byzantine_validators.length || validator_1.Validator.isSDK(o.byzantine_validators[0])) && typeof o.total_voting_power === "bigint" && timestamp_1.Timestamp.isSDK(o.timestamp));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.LightClientAttackEvidence.typeUrl || typeof o.common_height === "bigint" && Array.isArray(o.byzantine_validators) && (!o.byzantine_validators.length || validator_1.Validator.isAmino(o.byzantine_validators[0])) && typeof o.total_voting_power === "bigint" && timestamp_1.Timestamp.isAmino(o.timestamp));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.conflictingBlock !== undefined) {
            types_1.LightBlock.encode(message.conflictingBlock, writer.uint32(10).fork()).ldelim();
        }
        if (message.commonHeight !== BigInt(0)) {
            writer.uint32(16).int64(message.commonHeight);
        }
        for (const v of message.byzantineValidators) {
            validator_1.Validator.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.totalVotingPower !== BigInt(0)) {
            writer.uint32(32).int64(message.totalVotingPower);
        }
        if (message.timestamp !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.timestamp), writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLightClientAttackEvidence();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.conflictingBlock = types_1.LightBlock.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.commonHeight = reader.int64();
                    break;
                case 3:
                    message.byzantineValidators.push(validator_1.Validator.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.totalVotingPower = reader.int64();
                    break;
                case 5:
                    message.timestamp = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseLightClientAttackEvidence();
        message.conflictingBlock = object.conflictingBlock !== undefined && object.conflictingBlock !== null ? types_1.LightBlock.fromPartial(object.conflictingBlock) : undefined;
        message.commonHeight = object.commonHeight !== undefined && object.commonHeight !== null ? BigInt(object.commonHeight.toString()) : BigInt(0);
        message.byzantineValidators = object.byzantineValidators?.map(e => validator_1.Validator.fromPartial(e)) || [];
        message.totalVotingPower = object.totalVotingPower !== undefined && object.totalVotingPower !== null ? BigInt(object.totalVotingPower.toString()) : BigInt(0);
        message.timestamp = object.timestamp ?? undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseLightClientAttackEvidence();
        if (object.conflicting_block !== undefined && object.conflicting_block !== null) {
            message.conflictingBlock = types_1.LightBlock.fromAmino(object.conflicting_block);
        }
        if (object.common_height !== undefined && object.common_height !== null) {
            message.commonHeight = BigInt(object.common_height);
        }
        message.byzantineValidators = object.byzantine_validators?.map(e => validator_1.Validator.fromAmino(e)) || [];
        if (object.total_voting_power !== undefined && object.total_voting_power !== null) {
            message.totalVotingPower = BigInt(object.total_voting_power);
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.timestamp));
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.conflicting_block = message.conflictingBlock ? types_1.LightBlock.toAmino(message.conflictingBlock) : undefined;
        obj.common_height = message.commonHeight !== BigInt(0) ? message.commonHeight?.toString() : undefined;
        if (message.byzantineValidators) {
            obj.byzantine_validators = message.byzantineValidators.map(e => e ? validator_1.Validator.toAmino(e) : undefined);
        }
        else {
            obj.byzantine_validators = message.byzantineValidators;
        }
        obj.total_voting_power = message.totalVotingPower !== BigInt(0) ? message.totalVotingPower?.toString() : undefined;
        obj.timestamp = message.timestamp ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.timestamp)) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.LightClientAttackEvidence.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.LightClientAttackEvidence.decode(message.value);
    },
    toProto(message) {
        return exports.LightClientAttackEvidence.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.types.LightClientAttackEvidence",
            value: exports.LightClientAttackEvidence.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.LightClientAttackEvidence.typeUrl, exports.LightClientAttackEvidence);
function createBaseEvidenceList() {
    return {
        evidence: []
    };
}
exports.EvidenceList = {
    typeUrl: "/tendermint.types.EvidenceList",
    is(o) {
        return o && (o.$typeUrl === exports.EvidenceList.typeUrl || Array.isArray(o.evidence) && (!o.evidence.length || exports.Evidence.is(o.evidence[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.EvidenceList.typeUrl || Array.isArray(o.evidence) && (!o.evidence.length || exports.Evidence.isSDK(o.evidence[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.EvidenceList.typeUrl || Array.isArray(o.evidence) && (!o.evidence.length || exports.Evidence.isAmino(o.evidence[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.evidence) {
            exports.Evidence.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEvidenceList();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.evidence.push(exports.Evidence.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseEvidenceList();
        message.evidence = object.evidence?.map(e => exports.Evidence.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseEvidenceList();
        message.evidence = object.evidence?.map(e => exports.Evidence.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.evidence) {
            obj.evidence = message.evidence.map(e => e ? exports.Evidence.toAmino(e) : undefined);
        }
        else {
            obj.evidence = message.evidence;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.EvidenceList.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.EvidenceList.decode(message.value);
    },
    toProto(message) {
        return exports.EvidenceList.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.types.EvidenceList",
            value: exports.EvidenceList.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.EvidenceList.typeUrl, exports.EvidenceList);
