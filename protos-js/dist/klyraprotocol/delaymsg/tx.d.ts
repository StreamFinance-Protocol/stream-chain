import { Any, AnyAmino, AnySDKType } from "../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgDelayMessage is a request type for the DelayMessage method. */
export interface MsgDelayMessage {
    authority: string;
    /** The message to be delayed. */
    msg?: Any;
    /** The number of blocks to delay the message for. */
    delayBlocks: number;
}
export interface MsgDelayMessageProtoMsg {
    typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessage";
    value: Uint8Array;
}
/** MsgDelayMessage is a request type for the DelayMessage method. */
export interface MsgDelayMessageAmino {
    authority?: string;
    /** The message to be delayed. */
    msg?: AnyAmino;
    /** The number of blocks to delay the message for. */
    delay_blocks?: number;
}
export interface MsgDelayMessageAminoMsg {
    type: "/klyraprotocol.delaymsg.MsgDelayMessage";
    value: MsgDelayMessageAmino;
}
/** MsgDelayMessage is a request type for the DelayMessage method. */
export interface MsgDelayMessageSDKType {
    authority: string;
    msg?: AnySDKType;
    delay_blocks: number;
}
/** MsgDelayMessageResponse is a response type for the DelayMessage method. */
export interface MsgDelayMessageResponse {
    /** The id of the created delayed message. */
    id: bigint;
}
export interface MsgDelayMessageResponseProtoMsg {
    typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessageResponse";
    value: Uint8Array;
}
/** MsgDelayMessageResponse is a response type for the DelayMessage method. */
export interface MsgDelayMessageResponseAmino {
    /** The id of the created delayed message. */
    id?: string;
}
export interface MsgDelayMessageResponseAminoMsg {
    type: "/klyraprotocol.delaymsg.MsgDelayMessageResponse";
    value: MsgDelayMessageResponseAmino;
}
/** MsgDelayMessageResponse is a response type for the DelayMessage method. */
export interface MsgDelayMessageResponseSDKType {
    id: bigint;
}
export declare const MsgDelayMessage: {
    typeUrl: string;
    is(o: any): o is MsgDelayMessage;
    isSDK(o: any): o is MsgDelayMessageSDKType;
    isAmino(o: any): o is MsgDelayMessageAmino;
    encode(message: MsgDelayMessage, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgDelayMessage;
    fromPartial(object: Partial<MsgDelayMessage>): MsgDelayMessage;
    fromAmino(object: MsgDelayMessageAmino): MsgDelayMessage;
    toAmino(message: MsgDelayMessage): MsgDelayMessageAmino;
    fromAminoMsg(object: MsgDelayMessageAminoMsg): MsgDelayMessage;
    fromProtoMsg(message: MsgDelayMessageProtoMsg): MsgDelayMessage;
    toProto(message: MsgDelayMessage): Uint8Array;
    toProtoMsg(message: MsgDelayMessage): MsgDelayMessageProtoMsg;
};
export declare const MsgDelayMessageResponse: {
    typeUrl: string;
    is(o: any): o is MsgDelayMessageResponse;
    isSDK(o: any): o is MsgDelayMessageResponseSDKType;
    isAmino(o: any): o is MsgDelayMessageResponseAmino;
    encode(message: MsgDelayMessageResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgDelayMessageResponse;
    fromPartial(object: Partial<MsgDelayMessageResponse>): MsgDelayMessageResponse;
    fromAmino(object: MsgDelayMessageResponseAmino): MsgDelayMessageResponse;
    toAmino(message: MsgDelayMessageResponse): MsgDelayMessageResponseAmino;
    fromAminoMsg(object: MsgDelayMessageResponseAminoMsg): MsgDelayMessageResponse;
    fromProtoMsg(message: MsgDelayMessageResponseProtoMsg): MsgDelayMessageResponse;
    toProto(message: MsgDelayMessageResponse): Uint8Array;
    toProtoMsg(message: MsgDelayMessageResponse): MsgDelayMessageResponseProtoMsg;
};
