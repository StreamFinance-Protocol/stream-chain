import { BinaryReader, BinaryWriter } from "../../../../binary";
/** IndexerSubaccountId defines a unique identifier for a Subaccount. */
export interface IndexerSubaccountId {
    /** The address of the wallet that owns this subaccount. */
    owner: string;
    /**
     * < 128 Since 128 should be enough to start and it fits within
     * 1 Byte (1 Bit needed to indicate that the first byte is the last).
     */
    number: number;
}
export interface IndexerSubaccountIdProtoMsg {
    typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerSubaccountId";
    value: Uint8Array;
}
/** IndexerSubaccountId defines a unique identifier for a Subaccount. */
export interface IndexerSubaccountIdAmino {
    /** The address of the wallet that owns this subaccount. */
    owner?: string;
    /**
     * < 128 Since 128 should be enough to start and it fits within
     * 1 Byte (1 Bit needed to indicate that the first byte is the last).
     */
    number?: number;
}
export interface IndexerSubaccountIdAminoMsg {
    type: "/klyraprotocol.indexer.protocol.v1.IndexerSubaccountId";
    value: IndexerSubaccountIdAmino;
}
/** IndexerSubaccountId defines a unique identifier for a Subaccount. */
export interface IndexerSubaccountIdSDKType {
    owner: string;
    number: number;
}
/**
 * IndexerPerpetualPosition are an account’s positions of a `Perpetual`.
 * Therefore they hold any information needed to trade perpetuals.
 */
export interface IndexerPerpetualPosition {
    /** The `Id` of the `Perpetual`. */
    perpetualId: number;
    /** The size of the position in base quantums. */
    quantums: Uint8Array;
    /**
     * The funding_index of the `Perpetual` the last time this position was
     * settled.
     */
    fundingIndex: Uint8Array;
    /**
     * Amount of funding payment (in quote quantums).
     * Note: 1. this field is not cumulative.
     * 2. a positive value means funding payment was paid out and
     * a negative value means funding payment was received.
     */
    fundingPayment: Uint8Array;
    /**
     * The current yield index last time this position was settled.
     * Should be converted from string to big.Rat.
     */
    perpYieldIndex: string;
}
export interface IndexerPerpetualPositionProtoMsg {
    typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerPerpetualPosition";
    value: Uint8Array;
}
/**
 * IndexerPerpetualPosition are an account’s positions of a `Perpetual`.
 * Therefore they hold any information needed to trade perpetuals.
 */
export interface IndexerPerpetualPositionAmino {
    /** The `Id` of the `Perpetual`. */
    perpetual_id?: number;
    /** The size of the position in base quantums. */
    quantums?: string;
    /**
     * The funding_index of the `Perpetual` the last time this position was
     * settled.
     */
    funding_index?: string;
    /**
     * Amount of funding payment (in quote quantums).
     * Note: 1. this field is not cumulative.
     * 2. a positive value means funding payment was paid out and
     * a negative value means funding payment was received.
     */
    funding_payment?: string;
    /**
     * The current yield index last time this position was settled.
     * Should be converted from string to big.Rat.
     */
    perp_yield_index?: string;
}
export interface IndexerPerpetualPositionAminoMsg {
    type: "/klyraprotocol.indexer.protocol.v1.IndexerPerpetualPosition";
    value: IndexerPerpetualPositionAmino;
}
/**
 * IndexerPerpetualPosition are an account’s positions of a `Perpetual`.
 * Therefore they hold any information needed to trade perpetuals.
 */
export interface IndexerPerpetualPositionSDKType {
    perpetual_id: number;
    quantums: Uint8Array;
    funding_index: Uint8Array;
    funding_payment: Uint8Array;
    perp_yield_index: string;
}
/**
 * IndexerAssetPosition define an account’s positions of an `Asset`.
 * Therefore they hold any information needed to trade on Spot and Margin.
 */
export interface IndexerAssetPosition {
    /** The `Id` of the `Asset`. */
    assetId: number;
    /** The absolute size of the position in base quantums. */
    quantums: Uint8Array;
    /**
     * The `Index` (either `LongIndex` or `ShortIndex`) of the `Asset` the last
     * time this position was settled
     * TODO(DEC-582): pending margin trading being added.
     */
    index: bigint;
}
export interface IndexerAssetPositionProtoMsg {
    typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerAssetPosition";
    value: Uint8Array;
}
/**
 * IndexerAssetPosition define an account’s positions of an `Asset`.
 * Therefore they hold any information needed to trade on Spot and Margin.
 */
export interface IndexerAssetPositionAmino {
    /** The `Id` of the `Asset`. */
    asset_id?: number;
    /** The absolute size of the position in base quantums. */
    quantums?: string;
    /**
     * The `Index` (either `LongIndex` or `ShortIndex`) of the `Asset` the last
     * time this position was settled
     * TODO(DEC-582): pending margin trading being added.
     */
    index?: string;
}
export interface IndexerAssetPositionAminoMsg {
    type: "/klyraprotocol.indexer.protocol.v1.IndexerAssetPosition";
    value: IndexerAssetPositionAmino;
}
/**
 * IndexerAssetPosition define an account’s positions of an `Asset`.
 * Therefore they hold any information needed to trade on Spot and Margin.
 */
export interface IndexerAssetPositionSDKType {
    asset_id: number;
    quantums: Uint8Array;
    index: bigint;
}
export declare const IndexerSubaccountId: {
    typeUrl: string;
    is(o: any): o is IndexerSubaccountId;
    isSDK(o: any): o is IndexerSubaccountIdSDKType;
    isAmino(o: any): o is IndexerSubaccountIdAmino;
    encode(message: IndexerSubaccountId, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): IndexerSubaccountId;
    fromPartial(object: Partial<IndexerSubaccountId>): IndexerSubaccountId;
    fromAmino(object: IndexerSubaccountIdAmino): IndexerSubaccountId;
    toAmino(message: IndexerSubaccountId): IndexerSubaccountIdAmino;
    fromAminoMsg(object: IndexerSubaccountIdAminoMsg): IndexerSubaccountId;
    fromProtoMsg(message: IndexerSubaccountIdProtoMsg): IndexerSubaccountId;
    toProto(message: IndexerSubaccountId): Uint8Array;
    toProtoMsg(message: IndexerSubaccountId): IndexerSubaccountIdProtoMsg;
};
export declare const IndexerPerpetualPosition: {
    typeUrl: string;
    is(o: any): o is IndexerPerpetualPosition;
    isSDK(o: any): o is IndexerPerpetualPositionSDKType;
    isAmino(o: any): o is IndexerPerpetualPositionAmino;
    encode(message: IndexerPerpetualPosition, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): IndexerPerpetualPosition;
    fromPartial(object: Partial<IndexerPerpetualPosition>): IndexerPerpetualPosition;
    fromAmino(object: IndexerPerpetualPositionAmino): IndexerPerpetualPosition;
    toAmino(message: IndexerPerpetualPosition): IndexerPerpetualPositionAmino;
    fromAminoMsg(object: IndexerPerpetualPositionAminoMsg): IndexerPerpetualPosition;
    fromProtoMsg(message: IndexerPerpetualPositionProtoMsg): IndexerPerpetualPosition;
    toProto(message: IndexerPerpetualPosition): Uint8Array;
    toProtoMsg(message: IndexerPerpetualPosition): IndexerPerpetualPositionProtoMsg;
};
export declare const IndexerAssetPosition: {
    typeUrl: string;
    is(o: any): o is IndexerAssetPosition;
    isSDK(o: any): o is IndexerAssetPositionSDKType;
    isAmino(o: any): o is IndexerAssetPositionAmino;
    encode(message: IndexerAssetPosition, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): IndexerAssetPosition;
    fromPartial(object: Partial<IndexerAssetPosition>): IndexerAssetPosition;
    fromAmino(object: IndexerAssetPositionAmino): IndexerAssetPosition;
    toAmino(message: IndexerAssetPosition): IndexerAssetPositionAmino;
    fromAminoMsg(object: IndexerAssetPositionAminoMsg): IndexerAssetPosition;
    fromProtoMsg(message: IndexerAssetPositionProtoMsg): IndexerAssetPosition;
    toProto(message: IndexerAssetPosition): Uint8Array;
    toProtoMsg(message: IndexerAssetPosition): IndexerAssetPositionProtoMsg;
};
