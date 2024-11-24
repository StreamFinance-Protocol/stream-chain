import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
/** BlockInfo stores information about a block */
export interface BlockInfo {
    height: number;
    timestamp: Date;
}
export interface BlockInfoProtoMsg {
    typeUrl: "/klyraprotocol.blocktime.BlockInfo";
    value: Uint8Array;
}
/** BlockInfo stores information about a block */
export interface BlockInfoAmino {
    height?: number;
    timestamp?: string;
}
export interface BlockInfoAminoMsg {
    type: "/klyraprotocol.blocktime.BlockInfo";
    value: BlockInfoAmino;
}
/** BlockInfo stores information about a block */
export interface BlockInfoSDKType {
    height: number;
    timestamp: Date;
}
/** AllDowntimeInfo stores information for all downtime durations. */
export interface AllDowntimeInfo {
    /**
     * The downtime information for each tracked duration. Sorted by duration,
     * ascending. (i.e. the same order as they appear in DowntimeParams).
     */
    infos: AllDowntimeInfo_DowntimeInfo[];
}
export interface AllDowntimeInfoProtoMsg {
    typeUrl: "/klyraprotocol.blocktime.AllDowntimeInfo";
    value: Uint8Array;
}
/** AllDowntimeInfo stores information for all downtime durations. */
export interface AllDowntimeInfoAmino {
    /**
     * The downtime information for each tracked duration. Sorted by duration,
     * ascending. (i.e. the same order as they appear in DowntimeParams).
     */
    infos?: AllDowntimeInfo_DowntimeInfoAmino[];
}
export interface AllDowntimeInfoAminoMsg {
    type: "/klyraprotocol.blocktime.AllDowntimeInfo";
    value: AllDowntimeInfoAmino;
}
/** AllDowntimeInfo stores information for all downtime durations. */
export interface AllDowntimeInfoSDKType {
    infos: AllDowntimeInfo_DowntimeInfoSDKType[];
}
/**
 * Stores information about downtime. block_info corresponds to the most
 * recent block at which a downtime occurred.
 */
export interface AllDowntimeInfo_DowntimeInfo {
    duration: Duration;
    blockInfo: BlockInfo;
}
export interface AllDowntimeInfo_DowntimeInfoProtoMsg {
    typeUrl: "/klyraprotocol.blocktime.DowntimeInfo";
    value: Uint8Array;
}
/**
 * Stores information about downtime. block_info corresponds to the most
 * recent block at which a downtime occurred.
 */
export interface AllDowntimeInfo_DowntimeInfoAmino {
    duration?: DurationAmino;
    block_info?: BlockInfoAmino;
}
export interface AllDowntimeInfo_DowntimeInfoAminoMsg {
    type: "/klyraprotocol.blocktime.DowntimeInfo";
    value: AllDowntimeInfo_DowntimeInfoAmino;
}
/**
 * Stores information about downtime. block_info corresponds to the most
 * recent block at which a downtime occurred.
 */
export interface AllDowntimeInfo_DowntimeInfoSDKType {
    duration: DurationSDKType;
    block_info: BlockInfoSDKType;
}
export declare const BlockInfo: {
    typeUrl: string;
    is(o: any): o is BlockInfo;
    isSDK(o: any): o is BlockInfoSDKType;
    isAmino(o: any): o is BlockInfoAmino;
    encode(message: BlockInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): BlockInfo;
    fromPartial(object: Partial<BlockInfo>): BlockInfo;
    fromAmino(object: BlockInfoAmino): BlockInfo;
    toAmino(message: BlockInfo): BlockInfoAmino;
    fromAminoMsg(object: BlockInfoAminoMsg): BlockInfo;
    fromProtoMsg(message: BlockInfoProtoMsg): BlockInfo;
    toProto(message: BlockInfo): Uint8Array;
    toProtoMsg(message: BlockInfo): BlockInfoProtoMsg;
};
export declare const AllDowntimeInfo: {
    typeUrl: string;
    is(o: any): o is AllDowntimeInfo;
    isSDK(o: any): o is AllDowntimeInfoSDKType;
    isAmino(o: any): o is AllDowntimeInfoAmino;
    encode(message: AllDowntimeInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AllDowntimeInfo;
    fromPartial(object: Partial<AllDowntimeInfo>): AllDowntimeInfo;
    fromAmino(object: AllDowntimeInfoAmino): AllDowntimeInfo;
    toAmino(message: AllDowntimeInfo): AllDowntimeInfoAmino;
    fromAminoMsg(object: AllDowntimeInfoAminoMsg): AllDowntimeInfo;
    fromProtoMsg(message: AllDowntimeInfoProtoMsg): AllDowntimeInfo;
    toProto(message: AllDowntimeInfo): Uint8Array;
    toProtoMsg(message: AllDowntimeInfo): AllDowntimeInfoProtoMsg;
};
export declare const AllDowntimeInfo_DowntimeInfo: {
    typeUrl: string;
    is(o: any): o is AllDowntimeInfo_DowntimeInfo;
    isSDK(o: any): o is AllDowntimeInfo_DowntimeInfoSDKType;
    isAmino(o: any): o is AllDowntimeInfo_DowntimeInfoAmino;
    encode(message: AllDowntimeInfo_DowntimeInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AllDowntimeInfo_DowntimeInfo;
    fromPartial(object: Partial<AllDowntimeInfo_DowntimeInfo>): AllDowntimeInfo_DowntimeInfo;
    fromAmino(object: AllDowntimeInfo_DowntimeInfoAmino): AllDowntimeInfo_DowntimeInfo;
    toAmino(message: AllDowntimeInfo_DowntimeInfo): AllDowntimeInfo_DowntimeInfoAmino;
    fromAminoMsg(object: AllDowntimeInfo_DowntimeInfoAminoMsg): AllDowntimeInfo_DowntimeInfo;
    fromProtoMsg(message: AllDowntimeInfo_DowntimeInfoProtoMsg): AllDowntimeInfo_DowntimeInfo;
    toProto(message: AllDowntimeInfo_DowntimeInfo): Uint8Array;
    toProtoMsg(message: AllDowntimeInfo_DowntimeInfo): AllDowntimeInfo_DowntimeInfoProtoMsg;
};
