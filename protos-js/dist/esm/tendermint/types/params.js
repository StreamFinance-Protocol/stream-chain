//@ts-nocheck
import { Duration } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseConsensusParams() {
    return {
        block: undefined,
        evidence: undefined,
        validator: undefined,
        version: undefined,
        abci: undefined
    };
}
export const ConsensusParams = {
    typeUrl: "/tendermint.types.ConsensusParams",
    is(o) {
        return o && o.$typeUrl === ConsensusParams.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === ConsensusParams.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === ConsensusParams.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.block !== undefined) {
            BlockParams.encode(message.block, writer.uint32(10).fork()).ldelim();
        }
        if (message.evidence !== undefined) {
            EvidenceParams.encode(message.evidence, writer.uint32(18).fork()).ldelim();
        }
        if (message.validator !== undefined) {
            ValidatorParams.encode(message.validator, writer.uint32(26).fork()).ldelim();
        }
        if (message.version !== undefined) {
            VersionParams.encode(message.version, writer.uint32(34).fork()).ldelim();
        }
        if (message.abci !== undefined) {
            ABCIParams.encode(message.abci, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConsensusParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.block = BlockParams.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.evidence = EvidenceParams.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.validator = ValidatorParams.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.version = VersionParams.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.abci = ABCIParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseConsensusParams();
        message.block = object.block !== undefined && object.block !== null ? BlockParams.fromPartial(object.block) : undefined;
        message.evidence = object.evidence !== undefined && object.evidence !== null ? EvidenceParams.fromPartial(object.evidence) : undefined;
        message.validator = object.validator !== undefined && object.validator !== null ? ValidatorParams.fromPartial(object.validator) : undefined;
        message.version = object.version !== undefined && object.version !== null ? VersionParams.fromPartial(object.version) : undefined;
        message.abci = object.abci !== undefined && object.abci !== null ? ABCIParams.fromPartial(object.abci) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseConsensusParams();
        if (object.block !== undefined && object.block !== null) {
            message.block = BlockParams.fromAmino(object.block);
        }
        if (object.evidence !== undefined && object.evidence !== null) {
            message.evidence = EvidenceParams.fromAmino(object.evidence);
        }
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = ValidatorParams.fromAmino(object.validator);
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = VersionParams.fromAmino(object.version);
        }
        if (object.abci !== undefined && object.abci !== null) {
            message.abci = ABCIParams.fromAmino(object.abci);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block = message.block ? BlockParams.toAmino(message.block) : undefined;
        obj.evidence = message.evidence ? EvidenceParams.toAmino(message.evidence) : undefined;
        obj.validator = message.validator ? ValidatorParams.toAmino(message.validator) : undefined;
        obj.version = message.version ? VersionParams.toAmino(message.version) : undefined;
        obj.abci = message.abci ? ABCIParams.toAmino(message.abci) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return ConsensusParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return ConsensusParams.decode(message.value);
    },
    toProto(message) {
        return ConsensusParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.types.ConsensusParams",
            value: ConsensusParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ConsensusParams.typeUrl, ConsensusParams);
function createBaseBlockParams() {
    return {
        maxBytes: BigInt(0),
        maxGas: BigInt(0)
    };
}
export const BlockParams = {
    typeUrl: "/tendermint.types.BlockParams",
    is(o) {
        return o && (o.$typeUrl === BlockParams.typeUrl || typeof o.maxBytes === "bigint" && typeof o.maxGas === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === BlockParams.typeUrl || typeof o.max_bytes === "bigint" && typeof o.max_gas === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === BlockParams.typeUrl || typeof o.max_bytes === "bigint" && typeof o.max_gas === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.maxBytes !== BigInt(0)) {
            writer.uint32(8).int64(message.maxBytes);
        }
        if (message.maxGas !== BigInt(0)) {
            writer.uint32(16).int64(message.maxGas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxBytes = reader.int64();
                    break;
                case 2:
                    message.maxGas = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseBlockParams();
        message.maxBytes = object.maxBytes !== undefined && object.maxBytes !== null ? BigInt(object.maxBytes.toString()) : BigInt(0);
        message.maxGas = object.maxGas !== undefined && object.maxGas !== null ? BigInt(object.maxGas.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseBlockParams();
        if (object.max_bytes !== undefined && object.max_bytes !== null) {
            message.maxBytes = BigInt(object.max_bytes);
        }
        if (object.max_gas !== undefined && object.max_gas !== null) {
            message.maxGas = BigInt(object.max_gas);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.max_bytes = message.maxBytes !== BigInt(0) ? message.maxBytes?.toString() : undefined;
        obj.max_gas = message.maxGas !== BigInt(0) ? message.maxGas?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return BlockParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return BlockParams.decode(message.value);
    },
    toProto(message) {
        return BlockParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.types.BlockParams",
            value: BlockParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(BlockParams.typeUrl, BlockParams);
function createBaseEvidenceParams() {
    return {
        maxAgeNumBlocks: BigInt(0),
        maxAgeDuration: Duration.fromPartial({}),
        maxBytes: BigInt(0)
    };
}
export const EvidenceParams = {
    typeUrl: "/tendermint.types.EvidenceParams",
    is(o) {
        return o && (o.$typeUrl === EvidenceParams.typeUrl || typeof o.maxAgeNumBlocks === "bigint" && Duration.is(o.maxAgeDuration) && typeof o.maxBytes === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === EvidenceParams.typeUrl || typeof o.max_age_num_blocks === "bigint" && Duration.isSDK(o.max_age_duration) && typeof o.max_bytes === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === EvidenceParams.typeUrl || typeof o.max_age_num_blocks === "bigint" && Duration.isAmino(o.max_age_duration) && typeof o.max_bytes === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.maxAgeNumBlocks !== BigInt(0)) {
            writer.uint32(8).int64(message.maxAgeNumBlocks);
        }
        if (message.maxAgeDuration !== undefined) {
            Duration.encode(message.maxAgeDuration, writer.uint32(18).fork()).ldelim();
        }
        if (message.maxBytes !== BigInt(0)) {
            writer.uint32(24).int64(message.maxBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEvidenceParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxAgeNumBlocks = reader.int64();
                    break;
                case 2:
                    message.maxAgeDuration = Duration.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.maxBytes = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseEvidenceParams();
        message.maxAgeNumBlocks = object.maxAgeNumBlocks !== undefined && object.maxAgeNumBlocks !== null ? BigInt(object.maxAgeNumBlocks.toString()) : BigInt(0);
        message.maxAgeDuration = object.maxAgeDuration !== undefined && object.maxAgeDuration !== null ? Duration.fromPartial(object.maxAgeDuration) : undefined;
        message.maxBytes = object.maxBytes !== undefined && object.maxBytes !== null ? BigInt(object.maxBytes.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseEvidenceParams();
        if (object.max_age_num_blocks !== undefined && object.max_age_num_blocks !== null) {
            message.maxAgeNumBlocks = BigInt(object.max_age_num_blocks);
        }
        if (object.max_age_duration !== undefined && object.max_age_duration !== null) {
            message.maxAgeDuration = Duration.fromAmino(object.max_age_duration);
        }
        if (object.max_bytes !== undefined && object.max_bytes !== null) {
            message.maxBytes = BigInt(object.max_bytes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.max_age_num_blocks = message.maxAgeNumBlocks !== BigInt(0) ? message.maxAgeNumBlocks?.toString() : undefined;
        obj.max_age_duration = message.maxAgeDuration ? Duration.toAmino(message.maxAgeDuration) : undefined;
        obj.max_bytes = message.maxBytes !== BigInt(0) ? message.maxBytes?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return EvidenceParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return EvidenceParams.decode(message.value);
    },
    toProto(message) {
        return EvidenceParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.types.EvidenceParams",
            value: EvidenceParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(EvidenceParams.typeUrl, EvidenceParams);
function createBaseValidatorParams() {
    return {
        pubKeyTypes: []
    };
}
export const ValidatorParams = {
    typeUrl: "/tendermint.types.ValidatorParams",
    is(o) {
        return o && (o.$typeUrl === ValidatorParams.typeUrl || Array.isArray(o.pubKeyTypes) && (!o.pubKeyTypes.length || typeof o.pubKeyTypes[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ValidatorParams.typeUrl || Array.isArray(o.pub_key_types) && (!o.pub_key_types.length || typeof o.pub_key_types[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ValidatorParams.typeUrl || Array.isArray(o.pub_key_types) && (!o.pub_key_types.length || typeof o.pub_key_types[0] === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.pubKeyTypes) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pubKeyTypes.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseValidatorParams();
        message.pubKeyTypes = object.pubKeyTypes?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseValidatorParams();
        message.pubKeyTypes = object.pub_key_types?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.pubKeyTypes) {
            obj.pub_key_types = message.pubKeyTypes.map(e => e);
        }
        else {
            obj.pub_key_types = message.pubKeyTypes;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return ValidatorParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return ValidatorParams.decode(message.value);
    },
    toProto(message) {
        return ValidatorParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.types.ValidatorParams",
            value: ValidatorParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ValidatorParams.typeUrl, ValidatorParams);
function createBaseVersionParams() {
    return {
        app: BigInt(0)
    };
}
export const VersionParams = {
    typeUrl: "/tendermint.types.VersionParams",
    is(o) {
        return o && (o.$typeUrl === VersionParams.typeUrl || typeof o.app === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === VersionParams.typeUrl || typeof o.app === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === VersionParams.typeUrl || typeof o.app === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.app !== BigInt(0)) {
            writer.uint32(8).uint64(message.app);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVersionParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.app = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseVersionParams();
        message.app = object.app !== undefined && object.app !== null ? BigInt(object.app.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseVersionParams();
        if (object.app !== undefined && object.app !== null) {
            message.app = BigInt(object.app);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.app = message.app !== BigInt(0) ? message.app?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return VersionParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return VersionParams.decode(message.value);
    },
    toProto(message) {
        return VersionParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.types.VersionParams",
            value: VersionParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(VersionParams.typeUrl, VersionParams);
function createBaseHashedParams() {
    return {
        blockMaxBytes: BigInt(0),
        blockMaxGas: BigInt(0)
    };
}
export const HashedParams = {
    typeUrl: "/tendermint.types.HashedParams",
    is(o) {
        return o && (o.$typeUrl === HashedParams.typeUrl || typeof o.blockMaxBytes === "bigint" && typeof o.blockMaxGas === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === HashedParams.typeUrl || typeof o.block_max_bytes === "bigint" && typeof o.block_max_gas === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === HashedParams.typeUrl || typeof o.block_max_bytes === "bigint" && typeof o.block_max_gas === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.blockMaxBytes !== BigInt(0)) {
            writer.uint32(8).int64(message.blockMaxBytes);
        }
        if (message.blockMaxGas !== BigInt(0)) {
            writer.uint32(16).int64(message.blockMaxGas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHashedParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockMaxBytes = reader.int64();
                    break;
                case 2:
                    message.blockMaxGas = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseHashedParams();
        message.blockMaxBytes = object.blockMaxBytes !== undefined && object.blockMaxBytes !== null ? BigInt(object.blockMaxBytes.toString()) : BigInt(0);
        message.blockMaxGas = object.blockMaxGas !== undefined && object.blockMaxGas !== null ? BigInt(object.blockMaxGas.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseHashedParams();
        if (object.block_max_bytes !== undefined && object.block_max_bytes !== null) {
            message.blockMaxBytes = BigInt(object.block_max_bytes);
        }
        if (object.block_max_gas !== undefined && object.block_max_gas !== null) {
            message.blockMaxGas = BigInt(object.block_max_gas);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block_max_bytes = message.blockMaxBytes !== BigInt(0) ? message.blockMaxBytes?.toString() : undefined;
        obj.block_max_gas = message.blockMaxGas !== BigInt(0) ? message.blockMaxGas?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return HashedParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return HashedParams.decode(message.value);
    },
    toProto(message) {
        return HashedParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.types.HashedParams",
            value: HashedParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(HashedParams.typeUrl, HashedParams);
function createBaseABCIParams() {
    return {
        voteExtensionsEnableHeight: BigInt(0)
    };
}
export const ABCIParams = {
    typeUrl: "/tendermint.types.ABCIParams",
    is(o) {
        return o && (o.$typeUrl === ABCIParams.typeUrl || typeof o.voteExtensionsEnableHeight === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === ABCIParams.typeUrl || typeof o.vote_extensions_enable_height === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === ABCIParams.typeUrl || typeof o.vote_extensions_enable_height === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.voteExtensionsEnableHeight !== BigInt(0)) {
            writer.uint32(8).int64(message.voteExtensionsEnableHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseABCIParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.voteExtensionsEnableHeight = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseABCIParams();
        message.voteExtensionsEnableHeight = object.voteExtensionsEnableHeight !== undefined && object.voteExtensionsEnableHeight !== null ? BigInt(object.voteExtensionsEnableHeight.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseABCIParams();
        if (object.vote_extensions_enable_height !== undefined && object.vote_extensions_enable_height !== null) {
            message.voteExtensionsEnableHeight = BigInt(object.vote_extensions_enable_height);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.vote_extensions_enable_height = message.voteExtensionsEnableHeight !== BigInt(0) ? message.voteExtensionsEnableHeight?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return ABCIParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return ABCIParams.decode(message.value);
    },
    toProto(message) {
        return ABCIParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/tendermint.types.ABCIParams",
            value: ABCIParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ABCIParams.typeUrl, ABCIParams);
