//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseParams() {
    return {
        fundingRateClampFactorPpm: 0,
        premiumVoteClampFactorPpm: 0,
        minNumVotesPerSample: 0
    };
}
export const Params = {
    typeUrl: "/klyraprotocol.perpetuals.Params",
    is(o) {
        return o && (o.$typeUrl === Params.typeUrl || typeof o.fundingRateClampFactorPpm === "number" && typeof o.premiumVoteClampFactorPpm === "number" && typeof o.minNumVotesPerSample === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Params.typeUrl || typeof o.funding_rate_clamp_factor_ppm === "number" && typeof o.premium_vote_clamp_factor_ppm === "number" && typeof o.min_num_votes_per_sample === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Params.typeUrl || typeof o.funding_rate_clamp_factor_ppm === "number" && typeof o.premium_vote_clamp_factor_ppm === "number" && typeof o.min_num_votes_per_sample === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.fundingRateClampFactorPpm !== 0) {
            writer.uint32(8).uint32(message.fundingRateClampFactorPpm);
        }
        if (message.premiumVoteClampFactorPpm !== 0) {
            writer.uint32(16).uint32(message.premiumVoteClampFactorPpm);
        }
        if (message.minNumVotesPerSample !== 0) {
            writer.uint32(24).uint32(message.minNumVotesPerSample);
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
                    message.fundingRateClampFactorPpm = reader.uint32();
                    break;
                case 2:
                    message.premiumVoteClampFactorPpm = reader.uint32();
                    break;
                case 3:
                    message.minNumVotesPerSample = reader.uint32();
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
        message.fundingRateClampFactorPpm = object.fundingRateClampFactorPpm ?? 0;
        message.premiumVoteClampFactorPpm = object.premiumVoteClampFactorPpm ?? 0;
        message.minNumVotesPerSample = object.minNumVotesPerSample ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseParams();
        if (object.funding_rate_clamp_factor_ppm !== undefined && object.funding_rate_clamp_factor_ppm !== null) {
            message.fundingRateClampFactorPpm = object.funding_rate_clamp_factor_ppm;
        }
        if (object.premium_vote_clamp_factor_ppm !== undefined && object.premium_vote_clamp_factor_ppm !== null) {
            message.premiumVoteClampFactorPpm = object.premium_vote_clamp_factor_ppm;
        }
        if (object.min_num_votes_per_sample !== undefined && object.min_num_votes_per_sample !== null) {
            message.minNumVotesPerSample = object.min_num_votes_per_sample;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.funding_rate_clamp_factor_ppm = message.fundingRateClampFactorPpm === 0 ? undefined : message.fundingRateClampFactorPpm;
        obj.premium_vote_clamp_factor_ppm = message.premiumVoteClampFactorPpm === 0 ? undefined : message.premiumVoteClampFactorPpm;
        obj.min_num_votes_per_sample = message.minNumVotesPerSample === 0 ? undefined : message.minNumVotesPerSample;
        return obj;
    },
    fromAminoMsg(object) {
        return Params.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return Params.decode(message.value);
    },
    toProto(message) {
        return Params.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.Params",
            value: Params.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Params.typeUrl, Params);
