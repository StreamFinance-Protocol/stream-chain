//@ts-nocheck
import { DelayedMessage, DelayedMessageAmino, DelayedMessageSDKType } from "./delayed_message";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
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
function createBaseGenesisState(): GenesisState {
  return {
    delayedMessages: [],
    nextDelayedMessageId: 0
  };
}
export const GenesisState = {
  typeUrl: "/klyraprotocol.delaymsg.GenesisState",
  is(o: any): o is GenesisState {
    return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.delayedMessages) && (!o.delayedMessages.length || DelayedMessage.is(o.delayedMessages[0])) && typeof o.nextDelayedMessageId === "number");
  },
  isSDK(o: any): o is GenesisStateSDKType {
    return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.delayed_messages) && (!o.delayed_messages.length || DelayedMessage.isSDK(o.delayed_messages[0])) && typeof o.next_delayed_message_id === "number");
  },
  isAmino(o: any): o is GenesisStateAmino {
    return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.delayed_messages) && (!o.delayed_messages.length || DelayedMessage.isAmino(o.delayed_messages[0])) && typeof o.next_delayed_message_id === "number");
  },
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.delayedMessages) {
      DelayedMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextDelayedMessageId !== 0) {
      writer.uint32(16).uint32(message.nextDelayedMessageId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delayedMessages.push(DelayedMessage.decode(reader, reader.uint32()));
          break;
        case 2:
          message.nextDelayedMessageId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.delayedMessages = object.delayedMessages?.map(e => DelayedMessage.fromPartial(e)) || [];
    message.nextDelayedMessageId = object.nextDelayedMessageId ?? 0;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    message.delayedMessages = object.delayed_messages?.map(e => DelayedMessage.fromAmino(e)) || [];
    if (object.next_delayed_message_id !== undefined && object.next_delayed_message_id !== null) {
      message.nextDelayedMessageId = object.next_delayed_message_id;
    }
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    if (message.delayedMessages) {
      obj.delayed_messages = message.delayedMessages.map(e => e ? DelayedMessage.toAmino(e) : undefined);
    } else {
      obj.delayed_messages = message.delayedMessages;
    }
    obj.next_delayed_message_id = message.nextDelayedMessageId === 0 ? undefined : message.nextDelayedMessageId;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/klyraprotocol.delaymsg.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);