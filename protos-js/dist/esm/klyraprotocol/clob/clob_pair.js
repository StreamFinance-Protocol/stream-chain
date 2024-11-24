//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { isSet } from "../../helpers";
/** Status of the CLOB. */
export var ClobPair_Status;
(function (ClobPair_Status) {
    /** STATUS_UNSPECIFIED - Default value. This value is invalid and unused. */
    ClobPair_Status[ClobPair_Status["STATUS_UNSPECIFIED"] = 0] = "STATUS_UNSPECIFIED";
    /** STATUS_ACTIVE - STATUS_ACTIVE represents an active clob pair. */
    ClobPair_Status[ClobPair_Status["STATUS_ACTIVE"] = 1] = "STATUS_ACTIVE";
    /**
     * STATUS_PAUSED - STATUS_PAUSED behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    ClobPair_Status[ClobPair_Status["STATUS_PAUSED"] = 2] = "STATUS_PAUSED";
    /**
     * STATUS_CANCEL_ONLY - STATUS_CANCEL_ONLY behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    ClobPair_Status[ClobPair_Status["STATUS_CANCEL_ONLY"] = 3] = "STATUS_CANCEL_ONLY";
    /**
     * STATUS_POST_ONLY - STATUS_POST_ONLY behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    ClobPair_Status[ClobPair_Status["STATUS_POST_ONLY"] = 4] = "STATUS_POST_ONLY";
    /**
     * STATUS_INITIALIZING - STATUS_INITIALIZING represents a newly-added clob pair.
     * Clob pairs in this state only accept orders which are
     * both short-term and post-only.
     */
    ClobPair_Status[ClobPair_Status["STATUS_INITIALIZING"] = 5] = "STATUS_INITIALIZING";
    /**
     * STATUS_FINAL_SETTLEMENT - STATUS_FINAL_SETTLEMENT represents a clob pair which is deactivated
     * and trading has ceased. All open positions will be closed by the
     * protocol. Open stateful orders will be cancelled. Open short-term
     * orders will be left to expire.
     */
    ClobPair_Status[ClobPair_Status["STATUS_FINAL_SETTLEMENT"] = 6] = "STATUS_FINAL_SETTLEMENT";
    ClobPair_Status[ClobPair_Status["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ClobPair_Status || (ClobPair_Status = {}));
export const ClobPair_StatusSDKType = ClobPair_Status;
export const ClobPair_StatusAmino = ClobPair_Status;
export function clobPair_StatusFromJSON(object) {
    switch (object) {
        case 0:
        case "STATUS_UNSPECIFIED":
            return ClobPair_Status.STATUS_UNSPECIFIED;
        case 1:
        case "STATUS_ACTIVE":
            return ClobPair_Status.STATUS_ACTIVE;
        case 2:
        case "STATUS_PAUSED":
            return ClobPair_Status.STATUS_PAUSED;
        case 3:
        case "STATUS_CANCEL_ONLY":
            return ClobPair_Status.STATUS_CANCEL_ONLY;
        case 4:
        case "STATUS_POST_ONLY":
            return ClobPair_Status.STATUS_POST_ONLY;
        case 5:
        case "STATUS_INITIALIZING":
            return ClobPair_Status.STATUS_INITIALIZING;
        case 6:
        case "STATUS_FINAL_SETTLEMENT":
            return ClobPair_Status.STATUS_FINAL_SETTLEMENT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ClobPair_Status.UNRECOGNIZED;
    }
}
export function clobPair_StatusToJSON(object) {
    switch (object) {
        case ClobPair_Status.STATUS_UNSPECIFIED:
            return "STATUS_UNSPECIFIED";
        case ClobPair_Status.STATUS_ACTIVE:
            return "STATUS_ACTIVE";
        case ClobPair_Status.STATUS_PAUSED:
            return "STATUS_PAUSED";
        case ClobPair_Status.STATUS_CANCEL_ONLY:
            return "STATUS_CANCEL_ONLY";
        case ClobPair_Status.STATUS_POST_ONLY:
            return "STATUS_POST_ONLY";
        case ClobPair_Status.STATUS_INITIALIZING:
            return "STATUS_INITIALIZING";
        case ClobPair_Status.STATUS_FINAL_SETTLEMENT:
            return "STATUS_FINAL_SETTLEMENT";
        case ClobPair_Status.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBasePerpetualClobMetadata() {
    return {
        perpetualId: 0
    };
}
export const PerpetualClobMetadata = {
    typeUrl: "/klyraprotocol.clob.PerpetualClobMetadata",
    aminoType: "klyraprotocol/clob/PerpetualClobMetadata",
    is(o) {
        return o && (o.$typeUrl === PerpetualClobMetadata.typeUrl || typeof o.perpetualId === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === PerpetualClobMetadata.typeUrl || typeof o.perpetual_id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === PerpetualClobMetadata.typeUrl || typeof o.perpetual_id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.perpetualId !== 0) {
            writer.uint32(8).uint32(message.perpetualId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePerpetualClobMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetualId = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePerpetualClobMetadata();
        message.perpetualId = object.perpetualId ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBasePerpetualClobMetadata();
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        return obj;
    },
    fromAminoMsg(object) {
        return PerpetualClobMetadata.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "klyraprotocol/clob/PerpetualClobMetadata",
            value: PerpetualClobMetadata.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return PerpetualClobMetadata.decode(message.value);
    },
    toProto(message) {
        return PerpetualClobMetadata.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.PerpetualClobMetadata",
            value: PerpetualClobMetadata.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(PerpetualClobMetadata.typeUrl, PerpetualClobMetadata);
GlobalDecoderRegistry.registerAminoProtoMapping(PerpetualClobMetadata.aminoType, PerpetualClobMetadata.typeUrl);
function createBaseSpotClobMetadata() {
    return {
        baseAssetId: 0,
        quoteAssetId: 0
    };
}
export const SpotClobMetadata = {
    typeUrl: "/klyraprotocol.clob.SpotClobMetadata",
    aminoType: "klyraprotocol/clob/SpotClobMetadata",
    is(o) {
        return o && (o.$typeUrl === SpotClobMetadata.typeUrl || typeof o.baseAssetId === "number" && typeof o.quoteAssetId === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === SpotClobMetadata.typeUrl || typeof o.base_asset_id === "number" && typeof o.quote_asset_id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === SpotClobMetadata.typeUrl || typeof o.base_asset_id === "number" && typeof o.quote_asset_id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.baseAssetId !== 0) {
            writer.uint32(8).uint32(message.baseAssetId);
        }
        if (message.quoteAssetId !== 0) {
            writer.uint32(16).uint32(message.quoteAssetId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSpotClobMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.baseAssetId = reader.uint32();
                    break;
                case 2:
                    message.quoteAssetId = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSpotClobMetadata();
        message.baseAssetId = object.baseAssetId ?? 0;
        message.quoteAssetId = object.quoteAssetId ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseSpotClobMetadata();
        if (object.base_asset_id !== undefined && object.base_asset_id !== null) {
            message.baseAssetId = object.base_asset_id;
        }
        if (object.quote_asset_id !== undefined && object.quote_asset_id !== null) {
            message.quoteAssetId = object.quote_asset_id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.base_asset_id = message.baseAssetId === 0 ? undefined : message.baseAssetId;
        obj.quote_asset_id = message.quoteAssetId === 0 ? undefined : message.quoteAssetId;
        return obj;
    },
    fromAminoMsg(object) {
        return SpotClobMetadata.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "klyraprotocol/clob/SpotClobMetadata",
            value: SpotClobMetadata.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return SpotClobMetadata.decode(message.value);
    },
    toProto(message) {
        return SpotClobMetadata.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.SpotClobMetadata",
            value: SpotClobMetadata.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(SpotClobMetadata.typeUrl, SpotClobMetadata);
GlobalDecoderRegistry.registerAminoProtoMapping(SpotClobMetadata.aminoType, SpotClobMetadata.typeUrl);
function createBaseClobPair() {
    return {
        id: 0,
        perpetualClobMetadata: undefined,
        spotClobMetadata: undefined,
        stepBaseQuantums: BigInt(0),
        subticksPerTick: 0,
        quantumConversionExponent: 0,
        status: 0
    };
}
export const ClobPair = {
    typeUrl: "/klyraprotocol.clob.ClobPair",
    is(o) {
        return o && (o.$typeUrl === ClobPair.typeUrl || typeof o.id === "number" && typeof o.stepBaseQuantums === "bigint" && typeof o.subticksPerTick === "number" && typeof o.quantumConversionExponent === "number" && isSet(o.status));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ClobPair.typeUrl || typeof o.id === "number" && typeof o.step_base_quantums === "bigint" && typeof o.subticks_per_tick === "number" && typeof o.quantum_conversion_exponent === "number" && isSet(o.status));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ClobPair.typeUrl || typeof o.id === "number" && typeof o.step_base_quantums === "bigint" && typeof o.subticks_per_tick === "number" && typeof o.quantum_conversion_exponent === "number" && isSet(o.status));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.perpetualClobMetadata !== undefined) {
            PerpetualClobMetadata.encode(message.perpetualClobMetadata, writer.uint32(18).fork()).ldelim();
        }
        if (message.spotClobMetadata !== undefined) {
            SpotClobMetadata.encode(message.spotClobMetadata, writer.uint32(26).fork()).ldelim();
        }
        if (message.stepBaseQuantums !== BigInt(0)) {
            writer.uint32(32).uint64(message.stepBaseQuantums);
        }
        if (message.subticksPerTick !== 0) {
            writer.uint32(40).uint32(message.subticksPerTick);
        }
        if (message.quantumConversionExponent !== 0) {
            writer.uint32(48).sint32(message.quantumConversionExponent);
        }
        if (message.status !== 0) {
            writer.uint32(56).int32(message.status);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseClobPair();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.perpetualClobMetadata = PerpetualClobMetadata.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.spotClobMetadata = SpotClobMetadata.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.stepBaseQuantums = reader.uint64();
                    break;
                case 5:
                    message.subticksPerTick = reader.uint32();
                    break;
                case 6:
                    message.quantumConversionExponent = reader.sint32();
                    break;
                case 7:
                    message.status = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseClobPair();
        message.id = object.id ?? 0;
        message.perpetualClobMetadata = object.perpetualClobMetadata !== undefined && object.perpetualClobMetadata !== null ? PerpetualClobMetadata.fromPartial(object.perpetualClobMetadata) : undefined;
        message.spotClobMetadata = object.spotClobMetadata !== undefined && object.spotClobMetadata !== null ? SpotClobMetadata.fromPartial(object.spotClobMetadata) : undefined;
        message.stepBaseQuantums = object.stepBaseQuantums !== undefined && object.stepBaseQuantums !== null ? BigInt(object.stepBaseQuantums.toString()) : BigInt(0);
        message.subticksPerTick = object.subticksPerTick ?? 0;
        message.quantumConversionExponent = object.quantumConversionExponent ?? 0;
        message.status = object.status ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseClobPair();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.perpetual_clob_metadata !== undefined && object.perpetual_clob_metadata !== null) {
            message.perpetualClobMetadata = PerpetualClobMetadata.fromAmino(object.perpetual_clob_metadata);
        }
        if (object.spot_clob_metadata !== undefined && object.spot_clob_metadata !== null) {
            message.spotClobMetadata = SpotClobMetadata.fromAmino(object.spot_clob_metadata);
        }
        if (object.step_base_quantums !== undefined && object.step_base_quantums !== null) {
            message.stepBaseQuantums = BigInt(object.step_base_quantums);
        }
        if (object.subticks_per_tick !== undefined && object.subticks_per_tick !== null) {
            message.subticksPerTick = object.subticks_per_tick;
        }
        if (object.quantum_conversion_exponent !== undefined && object.quantum_conversion_exponent !== null) {
            message.quantumConversionExponent = object.quantum_conversion_exponent;
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.perpetual_clob_metadata = message.perpetualClobMetadata ? PerpetualClobMetadata.toAmino(message.perpetualClobMetadata) : undefined;
        obj.spot_clob_metadata = message.spotClobMetadata ? SpotClobMetadata.toAmino(message.spotClobMetadata) : undefined;
        obj.step_base_quantums = message.stepBaseQuantums !== BigInt(0) ? message.stepBaseQuantums?.toString() : undefined;
        obj.subticks_per_tick = message.subticksPerTick === 0 ? undefined : message.subticksPerTick;
        obj.quantum_conversion_exponent = message.quantumConversionExponent === 0 ? undefined : message.quantumConversionExponent;
        obj.status = message.status === 0 ? undefined : message.status;
        return obj;
    },
    fromAminoMsg(object) {
        return ClobPair.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return ClobPair.decode(message.value);
    },
    toProto(message) {
        return ClobPair.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.ClobPair",
            value: ClobPair.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ClobPair.typeUrl, ClobPair);
