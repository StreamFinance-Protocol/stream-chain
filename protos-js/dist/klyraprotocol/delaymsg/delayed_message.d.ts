import { Any, AnyAmino, AnySDKType } from "../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../binary";
/** DelayedMessage is a message that is delayed until a certain block height. */
export interface DelayedMessage {
    /** The ID of the delayed message. */
    id: number;
    /** The message to be executed. */
    msg?: Any;
    /** The block height at which the message should be executed. */
    blockHeight: number;
}
export interface DelayedMessageProtoMsg {
    typeUrl: "/klyraprotocol.delaymsg.DelayedMessage";
    value: Uint8Array;
}
/** DelayedMessage is a message that is delayed until a certain block height. */
export interface DelayedMessageAmino {
    /** The ID of the delayed message. */
    id?: number;
    /** The message to be executed. */
    msg?: AnyAmino;
    /** The block height at which the message should be executed. */
    block_height?: number;
}
export interface DelayedMessageAminoMsg {
    type: "/klyraprotocol.delaymsg.DelayedMessage";
    value: DelayedMessageAmino;
}
/** DelayedMessage is a message that is delayed until a certain block height. */
export interface DelayedMessageSDKType {
    id: number;
    msg?: AnySDKType;
    block_height: number;
}
export declare const DelayedMessage: {
    typeUrl: string;
    is(o: any): o is DelayedMessage;
    isSDK(o: any): o is DelayedMessageSDKType;
    isAmino(o: any): o is DelayedMessageAmino;
    encode(message: DelayedMessage, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): DelayedMessage;
    fromPartial(object: Partial<DelayedMessage>): DelayedMessage;
    fromAmino(object: DelayedMessageAmino): DelayedMessage;
    toAmino(message: DelayedMessage): DelayedMessageAmino;
    fromAminoMsg(object: DelayedMessageAminoMsg): DelayedMessage;
    fromProtoMsg(message: DelayedMessageProtoMsg): DelayedMessage;
    toProto(message: DelayedMessage): Uint8Array;
    toProtoMsg(message: DelayedMessage): DelayedMessageProtoMsg;
};
