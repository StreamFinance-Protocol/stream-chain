import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for x/perpetuals module. */
export interface Params {
    /**
     * Funding rate clamp factor in parts-per-million, used for clamping 8-hour
     * funding rates according to equation: |R| <= funding_rate_clamp_factor *
     * (initial margin - maintenance margin).
     */
    fundingRateClampFactorPpm: number;
    /**
     * Premium vote clamp factor in parts-per-million, used for clamping premium
     * votes according to equation: |V| <= premium_vote_clamp_factor *
     * (initial margin - maintenance margin).
     */
    premiumVoteClampFactorPpm: number;
    /**
     * Minimum number of premium votes per premium sample. If number of premium
     * votes is smaller than this number, pad with zeros up to this number.
     */
    minNumVotesPerSample: number;
}
export interface ParamsProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.Params";
    value: Uint8Array;
}
/** Params defines the parameters for x/perpetuals module. */
export interface ParamsAmino {
    /**
     * Funding rate clamp factor in parts-per-million, used for clamping 8-hour
     * funding rates according to equation: |R| <= funding_rate_clamp_factor *
     * (initial margin - maintenance margin).
     */
    funding_rate_clamp_factor_ppm?: number;
    /**
     * Premium vote clamp factor in parts-per-million, used for clamping premium
     * votes according to equation: |V| <= premium_vote_clamp_factor *
     * (initial margin - maintenance margin).
     */
    premium_vote_clamp_factor_ppm?: number;
    /**
     * Minimum number of premium votes per premium sample. If number of premium
     * votes is smaller than this number, pad with zeros up to this number.
     */
    min_num_votes_per_sample?: number;
}
export interface ParamsAminoMsg {
    type: "/klyraprotocol.perpetuals.Params";
    value: ParamsAmino;
}
/** Params defines the parameters for x/perpetuals module. */
export interface ParamsSDKType {
    funding_rate_clamp_factor_ppm: number;
    premium_vote_clamp_factor_ppm: number;
    min_num_votes_per_sample: number;
}
export declare const Params: {
    typeUrl: string;
    is(o: any): o is Params;
    isSDK(o: any): o is ParamsSDKType;
    isAmino(o: any): o is ParamsAmino;
    encode(message: Params, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Params;
    fromPartial(object: Partial<Params>): Params;
    fromAmino(object: ParamsAmino): Params;
    toAmino(message: Params): ParamsAmino;
    fromAminoMsg(object: ParamsAminoMsg): Params;
    fromProtoMsg(message: ParamsProtoMsg): Params;
    toProto(message: Params): Uint8Array;
    toProtoMsg(message: Params): ParamsProtoMsg;
};
