import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * PendingSendPacket contains the channel_id and sequence pair to identify a
 * pending packet
 */
export interface PendingSendPacket {
    channelId: string;
    sequence: bigint;
}
export interface PendingSendPacketProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.PendingSendPacket";
    value: Uint8Array;
}
/**
 * PendingSendPacket contains the channel_id and sequence pair to identify a
 * pending packet
 */
export interface PendingSendPacketAmino {
    channel_id?: string;
    sequence?: string;
}
export interface PendingSendPacketAminoMsg {
    type: "/klyraprotocol.ratelimit.PendingSendPacket";
    value: PendingSendPacketAmino;
}
/**
 * PendingSendPacket contains the channel_id and sequence pair to identify a
 * pending packet
 */
export interface PendingSendPacketSDKType {
    channel_id: string;
    sequence: bigint;
}
export declare const PendingSendPacket: {
    typeUrl: string;
    is(o: any): o is PendingSendPacket;
    isSDK(o: any): o is PendingSendPacketSDKType;
    isAmino(o: any): o is PendingSendPacketAmino;
    encode(message: PendingSendPacket, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PendingSendPacket;
    fromPartial(object: Partial<PendingSendPacket>): PendingSendPacket;
    fromAmino(object: PendingSendPacketAmino): PendingSendPacket;
    toAmino(message: PendingSendPacket): PendingSendPacketAmino;
    fromAminoMsg(object: PendingSendPacketAminoMsg): PendingSendPacket;
    fromProtoMsg(message: PendingSendPacketProtoMsg): PendingSendPacket;
    toProto(message: PendingSendPacket): Uint8Array;
    toProtoMsg(message: PendingSendPacket): PendingSendPacketProtoMsg;
};
