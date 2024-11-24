//@ts-nocheck
import { Any, AnyAmino, AnySDKType } from "../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
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
function createBaseMsgDelayMessage(): MsgDelayMessage {
  return {
    authority: "",
    msg: undefined,
    delayBlocks: 0
  };
}
export const MsgDelayMessage = {
  typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessage",
  is(o: any): o is MsgDelayMessage {
    return o && (o.$typeUrl === MsgDelayMessage.typeUrl || typeof o.authority === "string" && typeof o.delayBlocks === "number");
  },
  isSDK(o: any): o is MsgDelayMessageSDKType {
    return o && (o.$typeUrl === MsgDelayMessage.typeUrl || typeof o.authority === "string" && typeof o.delay_blocks === "number");
  },
  isAmino(o: any): o is MsgDelayMessageAmino {
    return o && (o.$typeUrl === MsgDelayMessage.typeUrl || typeof o.authority === "string" && typeof o.delay_blocks === "number");
  },
  encode(message: MsgDelayMessage, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.msg !== undefined) {
      Any.encode(message.msg, writer.uint32(18).fork()).ldelim();
    }
    if (message.delayBlocks !== 0) {
      writer.uint32(24).uint32(message.delayBlocks);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDelayMessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDelayMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.msg = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.delayBlocks = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDelayMessage>): MsgDelayMessage {
    const message = createBaseMsgDelayMessage();
    message.authority = object.authority ?? "";
    message.msg = object.msg !== undefined && object.msg !== null ? Any.fromPartial(object.msg) : undefined;
    message.delayBlocks = object.delayBlocks ?? 0;
    return message;
  },
  fromAmino(object: MsgDelayMessageAmino): MsgDelayMessage {
    const message = createBaseMsgDelayMessage();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = Any.fromAmino(object.msg);
    }
    if (object.delay_blocks !== undefined && object.delay_blocks !== null) {
      message.delayBlocks = object.delay_blocks;
    }
    return message;
  },
  toAmino(message: MsgDelayMessage): MsgDelayMessageAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.msg = message.msg ? Any.toAmino(message.msg) : undefined;
    obj.delay_blocks = message.delayBlocks === 0 ? undefined : message.delayBlocks;
    return obj;
  },
  fromAminoMsg(object: MsgDelayMessageAminoMsg): MsgDelayMessage {
    return MsgDelayMessage.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDelayMessageProtoMsg): MsgDelayMessage {
    return MsgDelayMessage.decode(message.value);
  },
  toProto(message: MsgDelayMessage): Uint8Array {
    return MsgDelayMessage.encode(message).finish();
  },
  toProtoMsg(message: MsgDelayMessage): MsgDelayMessageProtoMsg {
    return {
      typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessage",
      value: MsgDelayMessage.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgDelayMessage.typeUrl, MsgDelayMessage);
function createBaseMsgDelayMessageResponse(): MsgDelayMessageResponse {
  return {
    id: BigInt(0)
  };
}
export const MsgDelayMessageResponse = {
  typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessageResponse",
  is(o: any): o is MsgDelayMessageResponse {
    return o && (o.$typeUrl === MsgDelayMessageResponse.typeUrl || typeof o.id === "bigint");
  },
  isSDK(o: any): o is MsgDelayMessageResponseSDKType {
    return o && (o.$typeUrl === MsgDelayMessageResponse.typeUrl || typeof o.id === "bigint");
  },
  isAmino(o: any): o is MsgDelayMessageResponseAmino {
    return o && (o.$typeUrl === MsgDelayMessageResponse.typeUrl || typeof o.id === "bigint");
  },
  encode(message: MsgDelayMessageResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDelayMessageResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDelayMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDelayMessageResponse>): MsgDelayMessageResponse {
    const message = createBaseMsgDelayMessageResponse();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgDelayMessageResponseAmino): MsgDelayMessageResponse {
    const message = createBaseMsgDelayMessageResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: MsgDelayMessageResponse): MsgDelayMessageResponseAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgDelayMessageResponseAminoMsg): MsgDelayMessageResponse {
    return MsgDelayMessageResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDelayMessageResponseProtoMsg): MsgDelayMessageResponse {
    return MsgDelayMessageResponse.decode(message.value);
  },
  toProto(message: MsgDelayMessageResponse): Uint8Array {
    return MsgDelayMessageResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDelayMessageResponse): MsgDelayMessageResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.delaymsg.MsgDelayMessageResponse",
      value: MsgDelayMessageResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgDelayMessageResponse.typeUrl, MsgDelayMessageResponse);