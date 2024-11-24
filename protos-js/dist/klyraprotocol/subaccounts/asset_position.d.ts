import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * AssetPositions define an account’s positions of an `Asset`.
 * Therefore they hold any information needed to trade on Spot and Margin.
 */
export interface AssetPosition {
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
export interface AssetPositionProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.AssetPosition";
    value: Uint8Array;
}
/**
 * AssetPositions define an account’s positions of an `Asset`.
 * Therefore they hold any information needed to trade on Spot and Margin.
 */
export interface AssetPositionAmino {
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
export interface AssetPositionAminoMsg {
    type: "/klyraprotocol.subaccounts.AssetPosition";
    value: AssetPositionAmino;
}
/**
 * AssetPositions define an account’s positions of an `Asset`.
 * Therefore they hold any information needed to trade on Spot and Margin.
 */
export interface AssetPositionSDKType {
    asset_id: number;
    quantums: Uint8Array;
    index: bigint;
}
export declare const AssetPosition: {
    typeUrl: string;
    is(o: any): o is AssetPosition;
    isSDK(o: any): o is AssetPositionSDKType;
    isAmino(o: any): o is AssetPositionAmino;
    encode(message: AssetPosition, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AssetPosition;
    fromPartial(object: Partial<AssetPosition>): AssetPosition;
    fromAmino(object: AssetPositionAmino): AssetPosition;
    toAmino(message: AssetPosition): AssetPositionAmino;
    fromAminoMsg(object: AssetPositionAminoMsg): AssetPosition;
    fromProtoMsg(message: AssetPositionProtoMsg): AssetPosition;
    toProto(message: AssetPosition): Uint8Array;
    toProtoMsg(message: AssetPosition): AssetPositionProtoMsg;
};
