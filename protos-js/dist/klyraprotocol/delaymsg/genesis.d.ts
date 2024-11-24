import { DelayedMessage, DelayedMessageAmino, DelayedMessageSDKType } from "./delayed_message";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the delaymsg module's genesis state. */
export interface GenesisState {
    /** delayed_messages is a list of delayed messages. */
    delayedMessages: DelayedMessage[];
    /** next_delayed_message_id is the id to be assigned to next delayed message. */
    nextDelayedMessageId: number;
}
export interface GenesisStateProtoMsg {
    typeUrl: "/klyraprotocol.delaymsg.GenesisState";
    value: Uint8Array;
}
/** GenesisState defines the delaymsg module's genesis state. */
export interface GenesisStateAmino {
    /** delayed_messages is a list of delayed messages. */
    delayed_messages?: DelayedMessageAmino[];
    /** next_delayed_message_id is the id to be assigned to next delayed message. */
    next_delayed_message_id?: number;
}
export interface GenesisStateAminoMsg {
    type: "/klyraprotocol.delaymsg.GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState defines the delaymsg module's genesis state. */
export interface GenesisStateSDKType {
    delayed_messages: DelayedMessageSDKType[];
    next_delayed_message_id: number;
}
export declare const GenesisState: {
    typeUrl: string;
    is(o: any): o is GenesisState;
    isSDK(o: any): o is GenesisStateSDKType;
    isAmino(o: any): o is GenesisStateAmino;
    encode(message: GenesisState, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GenesisState;
    fromPartial(object: Partial<GenesisState>): GenesisState;
    fromAmino(object: GenesisStateAmino): GenesisState;
    toAmino(message: GenesisState): GenesisStateAmino;
    fromAminoMsg(object: GenesisStateAminoMsg): GenesisState;
    fromProtoMsg(message: GenesisStateProtoMsg): GenesisState;
    toProto(message: GenesisState): Uint8Array;
    toProtoMsg(message: GenesisState): GenesisStateProtoMsg;
};
