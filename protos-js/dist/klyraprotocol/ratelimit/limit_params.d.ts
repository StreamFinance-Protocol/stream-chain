import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
/** LimitParams defines rate limit params on a denom. */
export interface LimitParams {
    /**
     * denom is the denomination of the token being rate limited.
     * e.g. ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5
     */
    denom: string;
    /**
     * limiters is a list of rate-limiters on this denom. All limiters
     * must be satified for a withdrawal to proceed.
     */
    limiters: Limiter[];
}
export interface LimitParamsProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.LimitParams";
    value: Uint8Array;
}
/** LimitParams defines rate limit params on a denom. */
export interface LimitParamsAmino {
    /**
     * denom is the denomination of the token being rate limited.
     * e.g. ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5
     */
    denom?: string;
    /**
     * limiters is a list of rate-limiters on this denom. All limiters
     * must be satified for a withdrawal to proceed.
     */
    limiters?: LimiterAmino[];
}
export interface LimitParamsAminoMsg {
    type: "/klyraprotocol.ratelimit.LimitParams";
    value: LimitParamsAmino;
}
/** LimitParams defines rate limit params on a denom. */
export interface LimitParamsSDKType {
    denom: string;
    limiters: LimiterSDKType[];
}
/** Limiter defines one rate-limiter on a specfic denom. */
export interface Limiter {
    /**
     * period is the rolling time period for which the limit applies
     * e.g. 3600 (an hour)
     */
    period: Duration;
    /**
     * baseline_minimum is the minimum maximum withdrawal coin amount within the
     * time period.
     * e.g. 100_000_000_000 uusdc for 100k USDC; 5e22 adv4tnt for 50k DV4TNT
     */
    baselineMinimum: Uint8Array;
    /**
     * baseline_tvl_ppm is the maximum ratio of TVL withdrawable in
     * the time period, in part-per-million.
     * e.g. 100_000 (10%)
     */
    baselineTvlPpm: number;
}
export interface LimiterProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.Limiter";
    value: Uint8Array;
}
/** Limiter defines one rate-limiter on a specfic denom. */
export interface LimiterAmino {
    /**
     * period is the rolling time period for which the limit applies
     * e.g. 3600 (an hour)
     */
    period?: DurationAmino;
    /**
     * baseline_minimum is the minimum maximum withdrawal coin amount within the
     * time period.
     * e.g. 100_000_000_000 uusdc for 100k USDC; 5e22 adv4tnt for 50k DV4TNT
     */
    baseline_minimum?: string;
    /**
     * baseline_tvl_ppm is the maximum ratio of TVL withdrawable in
     * the time period, in part-per-million.
     * e.g. 100_000 (10%)
     */
    baseline_tvl_ppm?: number;
}
export interface LimiterAminoMsg {
    type: "/klyraprotocol.ratelimit.Limiter";
    value: LimiterAmino;
}
/** Limiter defines one rate-limiter on a specfic denom. */
export interface LimiterSDKType {
    period: DurationSDKType;
    baseline_minimum: Uint8Array;
    baseline_tvl_ppm: number;
}
export declare const LimitParams: {
    typeUrl: string;
    is(o: any): o is LimitParams;
    isSDK(o: any): o is LimitParamsSDKType;
    isAmino(o: any): o is LimitParamsAmino;
    encode(message: LimitParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): LimitParams;
    fromPartial(object: Partial<LimitParams>): LimitParams;
    fromAmino(object: LimitParamsAmino): LimitParams;
    toAmino(message: LimitParams): LimitParamsAmino;
    fromAminoMsg(object: LimitParamsAminoMsg): LimitParams;
    fromProtoMsg(message: LimitParamsProtoMsg): LimitParams;
    toProto(message: LimitParams): Uint8Array;
    toProtoMsg(message: LimitParams): LimitParamsProtoMsg;
};
export declare const Limiter: {
    typeUrl: string;
    is(o: any): o is Limiter;
    isSDK(o: any): o is LimiterSDKType;
    isAmino(o: any): o is LimiterAmino;
    encode(message: Limiter, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Limiter;
    fromPartial(object: Partial<Limiter>): Limiter;
    fromAmino(object: LimiterAmino): Limiter;
    toAmino(message: Limiter): LimiterAmino;
    fromAminoMsg(object: LimiterAminoMsg): Limiter;
    fromProtoMsg(message: LimiterProtoMsg): Limiter;
    toProto(message: Limiter): Uint8Array;
    toProtoMsg(message: Limiter): LimiterProtoMsg;
};
