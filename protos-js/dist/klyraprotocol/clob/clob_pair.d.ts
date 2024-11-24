import { BinaryReader, BinaryWriter } from "../../binary";
/** Status of the CLOB. */
export declare enum ClobPair_Status {
    /** STATUS_UNSPECIFIED - Default value. This value is invalid and unused. */
    STATUS_UNSPECIFIED = 0,
    /** STATUS_ACTIVE - STATUS_ACTIVE represents an active clob pair. */
    STATUS_ACTIVE = 1,
    /**
     * STATUS_PAUSED - STATUS_PAUSED behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    STATUS_PAUSED = 2,
    /**
     * STATUS_CANCEL_ONLY - STATUS_CANCEL_ONLY behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    STATUS_CANCEL_ONLY = 3,
    /**
     * STATUS_POST_ONLY - STATUS_POST_ONLY behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    STATUS_POST_ONLY = 4,
    /**
     * STATUS_INITIALIZING - STATUS_INITIALIZING represents a newly-added clob pair.
     * Clob pairs in this state only accept orders which are
     * both short-term and post-only.
     */
    STATUS_INITIALIZING = 5,
    /**
     * STATUS_FINAL_SETTLEMENT - STATUS_FINAL_SETTLEMENT represents a clob pair which is deactivated
     * and trading has ceased. All open positions will be closed by the
     * protocol. Open stateful orders will be cancelled. Open short-term
     * orders will be left to expire.
     */
    STATUS_FINAL_SETTLEMENT = 6,
    UNRECOGNIZED = -1
}
export declare const ClobPair_StatusSDKType: typeof ClobPair_Status;
export declare const ClobPair_StatusAmino: typeof ClobPair_Status;
export declare function clobPair_StatusFromJSON(object: any): ClobPair_Status;
export declare function clobPair_StatusToJSON(object: ClobPair_Status): string;
/**
 * PerpetualClobMetadata contains metadata for a `ClobPair`
 * representing a Perpetual product.
 */
export interface PerpetualClobMetadata {
    /** Id of the Perpetual the CLOB allows trading of. */
    perpetualId: number;
}
export interface PerpetualClobMetadataProtoMsg {
    typeUrl: "/klyraprotocol.clob.PerpetualClobMetadata";
    value: Uint8Array;
}
/**
 * PerpetualClobMetadata contains metadata for a `ClobPair`
 * representing a Perpetual product.
 */
export interface PerpetualClobMetadataAmino {
    /** Id of the Perpetual the CLOB allows trading of. */
    perpetual_id?: number;
}
export interface PerpetualClobMetadataAminoMsg {
    type: "klyraprotocol/clob/PerpetualClobMetadata";
    value: PerpetualClobMetadataAmino;
}
/**
 * PerpetualClobMetadata contains metadata for a `ClobPair`
 * representing a Perpetual product.
 */
export interface PerpetualClobMetadataSDKType {
    perpetual_id: number;
}
/**
 * PerpetualClobMetadata contains metadata for a `ClobPair`
 * representing a Spot product.
 */
export interface SpotClobMetadata {
    /** Id of the base Asset in the trading pair. */
    baseAssetId: number;
    /** Id of the quote Asset in the trading pair. */
    quoteAssetId: number;
}
export interface SpotClobMetadataProtoMsg {
    typeUrl: "/klyraprotocol.clob.SpotClobMetadata";
    value: Uint8Array;
}
/**
 * PerpetualClobMetadata contains metadata for a `ClobPair`
 * representing a Spot product.
 */
export interface SpotClobMetadataAmino {
    /** Id of the base Asset in the trading pair. */
    base_asset_id?: number;
    /** Id of the quote Asset in the trading pair. */
    quote_asset_id?: number;
}
export interface SpotClobMetadataAminoMsg {
    type: "klyraprotocol/clob/SpotClobMetadata";
    value: SpotClobMetadataAmino;
}
/**
 * PerpetualClobMetadata contains metadata for a `ClobPair`
 * representing a Spot product.
 */
export interface SpotClobMetadataSDKType {
    base_asset_id: number;
    quote_asset_id: number;
}
/**
 * ClobPair represents a single CLOB pair for a given product
 * in state.
 */
export interface ClobPair {
    /** ID of the orderbook that stores all resting liquidity for this CLOB. */
    id: number;
    perpetualClobMetadata?: PerpetualClobMetadata;
    spotClobMetadata?: SpotClobMetadata;
    /** Minimum increment in the size of orders on the CLOB, in base quantums. */
    stepBaseQuantums: bigint;
    /**
     * Defines the tick size of the orderbook by defining how many subticks
     * are in one tick. That is, the subticks of any valid order must be a
     * multiple of this value. Generally this value should start `>= 100`to
     * allow room for decreasing it.
     */
    subticksPerTick: number;
    /**
     * `10^Exponent` gives the number of QuoteQuantums traded per BaseQuantum
     * per Subtick.
     */
    quantumConversionExponent: number;
    status: ClobPair_Status;
}
export interface ClobPairProtoMsg {
    typeUrl: "/klyraprotocol.clob.ClobPair";
    value: Uint8Array;
}
/**
 * ClobPair represents a single CLOB pair for a given product
 * in state.
 */
export interface ClobPairAmino {
    /** ID of the orderbook that stores all resting liquidity for this CLOB. */
    id?: number;
    perpetual_clob_metadata?: PerpetualClobMetadataAmino;
    spot_clob_metadata?: SpotClobMetadataAmino;
    /** Minimum increment in the size of orders on the CLOB, in base quantums. */
    step_base_quantums?: string;
    /**
     * Defines the tick size of the orderbook by defining how many subticks
     * are in one tick. That is, the subticks of any valid order must be a
     * multiple of this value. Generally this value should start `>= 100`to
     * allow room for decreasing it.
     */
    subticks_per_tick?: number;
    /**
     * `10^Exponent` gives the number of QuoteQuantums traded per BaseQuantum
     * per Subtick.
     */
    quantum_conversion_exponent?: number;
    status?: ClobPair_Status;
}
export interface ClobPairAminoMsg {
    type: "/klyraprotocol.clob.ClobPair";
    value: ClobPairAmino;
}
/**
 * ClobPair represents a single CLOB pair for a given product
 * in state.
 */
export interface ClobPairSDKType {
    id: number;
    perpetual_clob_metadata?: PerpetualClobMetadataSDKType;
    spot_clob_metadata?: SpotClobMetadataSDKType;
    step_base_quantums: bigint;
    subticks_per_tick: number;
    quantum_conversion_exponent: number;
    status: ClobPair_Status;
}
export declare const PerpetualClobMetadata: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is PerpetualClobMetadata;
    isSDK(o: any): o is PerpetualClobMetadataSDKType;
    isAmino(o: any): o is PerpetualClobMetadataAmino;
    encode(message: PerpetualClobMetadata, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PerpetualClobMetadata;
    fromPartial(object: Partial<PerpetualClobMetadata>): PerpetualClobMetadata;
    fromAmino(object: PerpetualClobMetadataAmino): PerpetualClobMetadata;
    toAmino(message: PerpetualClobMetadata): PerpetualClobMetadataAmino;
    fromAminoMsg(object: PerpetualClobMetadataAminoMsg): PerpetualClobMetadata;
    toAminoMsg(message: PerpetualClobMetadata): PerpetualClobMetadataAminoMsg;
    fromProtoMsg(message: PerpetualClobMetadataProtoMsg): PerpetualClobMetadata;
    toProto(message: PerpetualClobMetadata): Uint8Array;
    toProtoMsg(message: PerpetualClobMetadata): PerpetualClobMetadataProtoMsg;
};
export declare const SpotClobMetadata: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is SpotClobMetadata;
    isSDK(o: any): o is SpotClobMetadataSDKType;
    isAmino(o: any): o is SpotClobMetadataAmino;
    encode(message: SpotClobMetadata, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SpotClobMetadata;
    fromPartial(object: Partial<SpotClobMetadata>): SpotClobMetadata;
    fromAmino(object: SpotClobMetadataAmino): SpotClobMetadata;
    toAmino(message: SpotClobMetadata): SpotClobMetadataAmino;
    fromAminoMsg(object: SpotClobMetadataAminoMsg): SpotClobMetadata;
    toAminoMsg(message: SpotClobMetadata): SpotClobMetadataAminoMsg;
    fromProtoMsg(message: SpotClobMetadataProtoMsg): SpotClobMetadata;
    toProto(message: SpotClobMetadata): Uint8Array;
    toProtoMsg(message: SpotClobMetadata): SpotClobMetadataProtoMsg;
};
export declare const ClobPair: {
    typeUrl: string;
    is(o: any): o is ClobPair;
    isSDK(o: any): o is ClobPairSDKType;
    isAmino(o: any): o is ClobPairAmino;
    encode(message: ClobPair, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ClobPair;
    fromPartial(object: Partial<ClobPair>): ClobPair;
    fromAmino(object: ClobPairAmino): ClobPair;
    toAmino(message: ClobPair): ClobPairAmino;
    fromAminoMsg(object: ClobPairAminoMsg): ClobPair;
    fromProtoMsg(message: ClobPairProtoMsg): ClobPair;
    toProto(message: ClobPair): Uint8Array;
    toProtoMsg(message: ClobPair): ClobPairProtoMsg;
};
