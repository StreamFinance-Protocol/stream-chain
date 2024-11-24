import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * PerpetualPositions are an account’s positions of a `Perpetual`.
 * Therefore they hold any information needed to trade perpetuals.
 */
export interface PerpetualPosition {
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
     * The current yield index last time this position was settled.
     * Should be converted from string to big.Rat.
     */
    yieldIndex: string;
}
export interface PerpetualPositionProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.PerpetualPosition";
    value: Uint8Array;
}
/**
 * PerpetualPositions are an account’s positions of a `Perpetual`.
 * Therefore they hold any information needed to trade perpetuals.
 */
export interface PerpetualPositionAmino {
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
     * The current yield index last time this position was settled.
     * Should be converted from string to big.Rat.
     */
    yield_index?: string;
}
export interface PerpetualPositionAminoMsg {
    type: "/klyraprotocol.subaccounts.PerpetualPosition";
    value: PerpetualPositionAmino;
}
/**
 * PerpetualPositions are an account’s positions of a `Perpetual`.
 * Therefore they hold any information needed to trade perpetuals.
 */
export interface PerpetualPositionSDKType {
    perpetual_id: number;
    quantums: Uint8Array;
    funding_index: Uint8Array;
    yield_index: string;
}
export declare const PerpetualPosition: {
    typeUrl: string;
    is(o: any): o is PerpetualPosition;
    isSDK(o: any): o is PerpetualPositionSDKType;
    isAmino(o: any): o is PerpetualPositionAmino;
    encode(message: PerpetualPosition, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PerpetualPosition;
    fromPartial(object: Partial<PerpetualPosition>): PerpetualPosition;
    fromAmino(object: PerpetualPositionAmino): PerpetualPosition;
    toAmino(message: PerpetualPosition): PerpetualPositionAmino;
    fromAminoMsg(object: PerpetualPositionAminoMsg): PerpetualPosition;
    fromProtoMsg(message: PerpetualPositionProtoMsg): PerpetualPosition;
    toProto(message: PerpetualPosition): Uint8Array;
    toProtoMsg(message: PerpetualPosition): PerpetualPositionProtoMsg;
};
