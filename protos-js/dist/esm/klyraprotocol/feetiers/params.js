//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBasePerpetualFeeParams() {
    return {
        tiers: []
    };
}
export const PerpetualFeeParams = {
    typeUrl: "/klyraprotocol.feetiers.PerpetualFeeParams",
    is(o) {
        return o && (o.$typeUrl === PerpetualFeeParams.typeUrl || Array.isArray(o.tiers) && (!o.tiers.length || PerpetualFeeTier.is(o.tiers[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === PerpetualFeeParams.typeUrl || Array.isArray(o.tiers) && (!o.tiers.length || PerpetualFeeTier.isSDK(o.tiers[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === PerpetualFeeParams.typeUrl || Array.isArray(o.tiers) && (!o.tiers.length || PerpetualFeeTier.isAmino(o.tiers[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.tiers) {
            PerpetualFeeTier.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePerpetualFeeParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tiers.push(PerpetualFeeTier.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePerpetualFeeParams();
        message.tiers = object.tiers?.map(e => PerpetualFeeTier.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBasePerpetualFeeParams();
        message.tiers = object.tiers?.map(e => PerpetualFeeTier.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.tiers) {
            obj.tiers = message.tiers.map(e => e ? PerpetualFeeTier.toAmino(e) : undefined);
        }
        else {
            obj.tiers = message.tiers;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return PerpetualFeeParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return PerpetualFeeParams.decode(message.value);
    },
    toProto(message) {
        return PerpetualFeeParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.PerpetualFeeParams",
            value: PerpetualFeeParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(PerpetualFeeParams.typeUrl, PerpetualFeeParams);
function createBasePerpetualFeeTier() {
    return {
        name: "",
        absoluteVolumeRequirement: BigInt(0),
        totalVolumeShareRequirementPpm: 0,
        makerVolumeShareRequirementPpm: 0,
        makerFeePpm: 0,
        takerFeePpm: 0
    };
}
export const PerpetualFeeTier = {
    typeUrl: "/klyraprotocol.feetiers.PerpetualFeeTier",
    is(o) {
        return o && (o.$typeUrl === PerpetualFeeTier.typeUrl || typeof o.name === "string" && typeof o.absoluteVolumeRequirement === "bigint" && typeof o.totalVolumeShareRequirementPpm === "number" && typeof o.makerVolumeShareRequirementPpm === "number" && typeof o.makerFeePpm === "number" && typeof o.takerFeePpm === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === PerpetualFeeTier.typeUrl || typeof o.name === "string" && typeof o.absolute_volume_requirement === "bigint" && typeof o.total_volume_share_requirement_ppm === "number" && typeof o.maker_volume_share_requirement_ppm === "number" && typeof o.maker_fee_ppm === "number" && typeof o.taker_fee_ppm === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === PerpetualFeeTier.typeUrl || typeof o.name === "string" && typeof o.absolute_volume_requirement === "bigint" && typeof o.total_volume_share_requirement_ppm === "number" && typeof o.maker_volume_share_requirement_ppm === "number" && typeof o.maker_fee_ppm === "number" && typeof o.taker_fee_ppm === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.absoluteVolumeRequirement !== BigInt(0)) {
            writer.uint32(16).uint64(message.absoluteVolumeRequirement);
        }
        if (message.totalVolumeShareRequirementPpm !== 0) {
            writer.uint32(24).uint32(message.totalVolumeShareRequirementPpm);
        }
        if (message.makerVolumeShareRequirementPpm !== 0) {
            writer.uint32(32).uint32(message.makerVolumeShareRequirementPpm);
        }
        if (message.makerFeePpm !== 0) {
            writer.uint32(40).sint32(message.makerFeePpm);
        }
        if (message.takerFeePpm !== 0) {
            writer.uint32(48).sint32(message.takerFeePpm);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePerpetualFeeTier();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.absoluteVolumeRequirement = reader.uint64();
                    break;
                case 3:
                    message.totalVolumeShareRequirementPpm = reader.uint32();
                    break;
                case 4:
                    message.makerVolumeShareRequirementPpm = reader.uint32();
                    break;
                case 5:
                    message.makerFeePpm = reader.sint32();
                    break;
                case 6:
                    message.takerFeePpm = reader.sint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePerpetualFeeTier();
        message.name = object.name ?? "";
        message.absoluteVolumeRequirement = object.absoluteVolumeRequirement !== undefined && object.absoluteVolumeRequirement !== null ? BigInt(object.absoluteVolumeRequirement.toString()) : BigInt(0);
        message.totalVolumeShareRequirementPpm = object.totalVolumeShareRequirementPpm ?? 0;
        message.makerVolumeShareRequirementPpm = object.makerVolumeShareRequirementPpm ?? 0;
        message.makerFeePpm = object.makerFeePpm ?? 0;
        message.takerFeePpm = object.takerFeePpm ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBasePerpetualFeeTier();
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        if (object.absolute_volume_requirement !== undefined && object.absolute_volume_requirement !== null) {
            message.absoluteVolumeRequirement = BigInt(object.absolute_volume_requirement);
        }
        if (object.total_volume_share_requirement_ppm !== undefined && object.total_volume_share_requirement_ppm !== null) {
            message.totalVolumeShareRequirementPpm = object.total_volume_share_requirement_ppm;
        }
        if (object.maker_volume_share_requirement_ppm !== undefined && object.maker_volume_share_requirement_ppm !== null) {
            message.makerVolumeShareRequirementPpm = object.maker_volume_share_requirement_ppm;
        }
        if (object.maker_fee_ppm !== undefined && object.maker_fee_ppm !== null) {
            message.makerFeePpm = object.maker_fee_ppm;
        }
        if (object.taker_fee_ppm !== undefined && object.taker_fee_ppm !== null) {
            message.takerFeePpm = object.taker_fee_ppm;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.name = message.name === "" ? undefined : message.name;
        obj.absolute_volume_requirement = message.absoluteVolumeRequirement !== BigInt(0) ? message.absoluteVolumeRequirement?.toString() : undefined;
        obj.total_volume_share_requirement_ppm = message.totalVolumeShareRequirementPpm === 0 ? undefined : message.totalVolumeShareRequirementPpm;
        obj.maker_volume_share_requirement_ppm = message.makerVolumeShareRequirementPpm === 0 ? undefined : message.makerVolumeShareRequirementPpm;
        obj.maker_fee_ppm = message.makerFeePpm === 0 ? undefined : message.makerFeePpm;
        obj.taker_fee_ppm = message.takerFeePpm === 0 ? undefined : message.takerFeePpm;
        return obj;
    },
    fromAminoMsg(object) {
        return PerpetualFeeTier.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return PerpetualFeeTier.decode(message.value);
    },
    toProto(message) {
        return PerpetualFeeTier.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.PerpetualFeeTier",
            value: PerpetualFeeTier.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(PerpetualFeeTier.typeUrl, PerpetualFeeTier);
