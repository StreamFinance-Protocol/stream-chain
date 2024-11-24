import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * BlockMessageIds stores the id of each message that should be processed at a
 * given block height.
 */
export interface BlockMessageIds {
    /**
     * ids stores a list of DelayedMessage ids that should be processed at a given
     * block height.
     */
    ids: number[];
}
export interface BlockMessageIdsProtoMsg {
    typeUrl: "/klyraprotocol.delaymsg.BlockMessageIds";
    value: Uint8Array;
}
/**
 * BlockMessageIds stores the id of each message that should be processed at a
 * given block height.
 */
export interface BlockMessageIdsAmino {
    /**
     * ids stores a list of DelayedMessage ids that should be processed at a given
     * block height.
     */
    ids?: number[];
}
export interface BlockMessageIdsAminoMsg {
    type: "/klyraprotocol.delaymsg.BlockMessageIds";
    value: BlockMessageIdsAmino;
}
/**
 * BlockMessageIds stores the id of each message that should be processed at a
 * given block height.
 */
export interface BlockMessageIdsSDKType {
    ids: number[];
}
export declare const BlockMessageIds: {
    typeUrl: string;
    is(o: any): o is BlockMessageIds;
    isSDK(o: any): o is BlockMessageIdsSDKType;
    isAmino(o: any): o is BlockMessageIdsAmino;
    encode(message: BlockMessageIds, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): BlockMessageIds;
    fromPartial(object: Partial<BlockMessageIds>): BlockMessageIds;
    fromAmino(object: BlockMessageIdsAmino): BlockMessageIds;
    toAmino(message: BlockMessageIds): BlockMessageIdsAmino;
    fromAminoMsg(object: BlockMessageIdsAminoMsg): BlockMessageIds;
    fromProtoMsg(message: BlockMessageIdsProtoMsg): BlockMessageIds;
    toProto(message: BlockMessageIds): Uint8Array;
    toProtoMsg(message: BlockMessageIds): BlockMessageIdsProtoMsg;
};
