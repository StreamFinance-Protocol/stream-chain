import { BinaryReader, BinaryWriter } from "../../binary";
/** PerpetualFeeParams defines the parameters for perpetual fees. */
export interface PerpetualFeeParams {
    /** Sorted fee tiers (lowest requirements first). */
    tiers: PerpetualFeeTier[];
}
export interface PerpetualFeeParamsProtoMsg {
    typeUrl: "/klyraprotocol.feetiers.PerpetualFeeParams";
    value: Uint8Array;
}
/** PerpetualFeeParams defines the parameters for perpetual fees. */
export interface PerpetualFeeParamsAmino {
    /** Sorted fee tiers (lowest requirements first). */
    tiers?: PerpetualFeeTierAmino[];
}
export interface PerpetualFeeParamsAminoMsg {
    type: "/klyraprotocol.feetiers.PerpetualFeeParams";
    value: PerpetualFeeParamsAmino;
}
/** PerpetualFeeParams defines the parameters for perpetual fees. */
export interface PerpetualFeeParamsSDKType {
    tiers: PerpetualFeeTierSDKType[];
}
/** A fee tier for perpetuals */
export interface PerpetualFeeTier {
    /** Human-readable name of the tier, e.g. "Gold". */
    name: string;
    /** The trader's absolute volume requirement in quote quantums. */
    absoluteVolumeRequirement: bigint;
    /** The total volume share requirement. */
    totalVolumeShareRequirementPpm: number;
    /** The maker volume share requirement. */
    makerVolumeShareRequirementPpm: number;
    /** The maker fee once this tier is reached. */
    makerFeePpm: number;
    /** The taker fee once this tier is reached. */
    takerFeePpm: number;
}
export interface PerpetualFeeTierProtoMsg {
    typeUrl: "/klyraprotocol.feetiers.PerpetualFeeTier";
    value: Uint8Array;
}
/** A fee tier for perpetuals */
export interface PerpetualFeeTierAmino {
    /** Human-readable name of the tier, e.g. "Gold". */
    name?: string;
    /** The trader's absolute volume requirement in quote quantums. */
    absolute_volume_requirement?: string;
    /** The total volume share requirement. */
    total_volume_share_requirement_ppm?: number;
    /** The maker volume share requirement. */
    maker_volume_share_requirement_ppm?: number;
    /** The maker fee once this tier is reached. */
    maker_fee_ppm?: number;
    /** The taker fee once this tier is reached. */
    taker_fee_ppm?: number;
}
export interface PerpetualFeeTierAminoMsg {
    type: "/klyraprotocol.feetiers.PerpetualFeeTier";
    value: PerpetualFeeTierAmino;
}
/** A fee tier for perpetuals */
export interface PerpetualFeeTierSDKType {
    name: string;
    absolute_volume_requirement: bigint;
    total_volume_share_requirement_ppm: number;
    maker_volume_share_requirement_ppm: number;
    maker_fee_ppm: number;
    taker_fee_ppm: number;
}
export declare const PerpetualFeeParams: {
    typeUrl: string;
    is(o: any): o is PerpetualFeeParams;
    isSDK(o: any): o is PerpetualFeeParamsSDKType;
    isAmino(o: any): o is PerpetualFeeParamsAmino;
    encode(message: PerpetualFeeParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PerpetualFeeParams;
    fromPartial(object: Partial<PerpetualFeeParams>): PerpetualFeeParams;
    fromAmino(object: PerpetualFeeParamsAmino): PerpetualFeeParams;
    toAmino(message: PerpetualFeeParams): PerpetualFeeParamsAmino;
    fromAminoMsg(object: PerpetualFeeParamsAminoMsg): PerpetualFeeParams;
    fromProtoMsg(message: PerpetualFeeParamsProtoMsg): PerpetualFeeParams;
    toProto(message: PerpetualFeeParams): Uint8Array;
    toProtoMsg(message: PerpetualFeeParams): PerpetualFeeParamsProtoMsg;
};
export declare const PerpetualFeeTier: {
    typeUrl: string;
    is(o: any): o is PerpetualFeeTier;
    isSDK(o: any): o is PerpetualFeeTierSDKType;
    isAmino(o: any): o is PerpetualFeeTierAmino;
    encode(message: PerpetualFeeTier, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PerpetualFeeTier;
    fromPartial(object: Partial<PerpetualFeeTier>): PerpetualFeeTier;
    fromAmino(object: PerpetualFeeTierAmino): PerpetualFeeTier;
    toAmino(message: PerpetualFeeTier): PerpetualFeeTierAmino;
    fromAminoMsg(object: PerpetualFeeTierAminoMsg): PerpetualFeeTier;
    fromProtoMsg(message: PerpetualFeeTierProtoMsg): PerpetualFeeTier;
    toProto(message: PerpetualFeeTier): Uint8Array;
    toProtoMsg(message: PerpetualFeeTier): PerpetualFeeTierProtoMsg;
};
