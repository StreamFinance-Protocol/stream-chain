//@ts-nocheck
import { DowntimeParams, DowntimeParamsAmino, DowntimeParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** MsgUpdateDowntimeParams is the Msg/UpdateDowntimeParams request type. */
export interface MsgUpdateDowntimeParams {
  authority: string;
  /** Defines the parameters to update. All parameters must be supplied. */
  params: DowntimeParams;
}
export interface MsgUpdateDowntimeParamsProtoMsg {
  typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams";
  value: Uint8Array;
}
/** MsgUpdateDowntimeParams is the Msg/UpdateDowntimeParams request type. */
export interface MsgUpdateDowntimeParamsAmino {
  authority?: string;
  /** Defines the parameters to update. All parameters must be supplied. */
  params?: DowntimeParamsAmino;
}
export interface MsgUpdateDowntimeParamsAminoMsg {
  type: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams";
  value: MsgUpdateDowntimeParamsAmino;
}
/** MsgUpdateDowntimeParams is the Msg/UpdateDowntimeParams request type. */
export interface MsgUpdateDowntimeParamsSDKType {
  authority: string;
  params: DowntimeParamsSDKType;
}
/**
 * MsgUpdateDowntimeParamsResponse is the Msg/UpdateDowntimeParams response
 * type.
 */
export interface MsgUpdateDowntimeParamsResponse {}
export interface MsgUpdateDowntimeParamsResponseProtoMsg {
  typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateDowntimeParamsResponse is the Msg/UpdateDowntimeParams response
 * type.
 */
export interface MsgUpdateDowntimeParamsResponseAmino {}
export interface MsgUpdateDowntimeParamsResponseAminoMsg {
  type: "/klyraprotocol.blocktime.MsgUpdateDowntimeParamsResponse";
  value: MsgUpdateDowntimeParamsResponseAmino;
}
/**
 * MsgUpdateDowntimeParamsResponse is the Msg/UpdateDowntimeParams response
 * type.
 */
export interface MsgUpdateDowntimeParamsResponseSDKType {}
function createBaseMsgUpdateDowntimeParams(): MsgUpdateDowntimeParams {
  return {
    authority: "",
    params: DowntimeParams.fromPartial({})
  };
}
export const MsgUpdateDowntimeParams = {
  typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams",
  is(o: any): o is MsgUpdateDowntimeParams {
    return o && (o.$typeUrl === MsgUpdateDowntimeParams.typeUrl || typeof o.authority === "string" && DowntimeParams.is(o.params));
  },
  isSDK(o: any): o is MsgUpdateDowntimeParamsSDKType {
    return o && (o.$typeUrl === MsgUpdateDowntimeParams.typeUrl || typeof o.authority === "string" && DowntimeParams.isSDK(o.params));
  },
  isAmino(o: any): o is MsgUpdateDowntimeParamsAmino {
    return o && (o.$typeUrl === MsgUpdateDowntimeParams.typeUrl || typeof o.authority === "string" && DowntimeParams.isAmino(o.params));
  },
  encode(message: MsgUpdateDowntimeParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      DowntimeParams.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateDowntimeParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDowntimeParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = DowntimeParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateDowntimeParams>): MsgUpdateDowntimeParams {
    const message = createBaseMsgUpdateDowntimeParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? DowntimeParams.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateDowntimeParamsAmino): MsgUpdateDowntimeParams {
    const message = createBaseMsgUpdateDowntimeParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = DowntimeParams.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateDowntimeParams): MsgUpdateDowntimeParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? DowntimeParams.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateDowntimeParamsAminoMsg): MsgUpdateDowntimeParams {
    return MsgUpdateDowntimeParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateDowntimeParamsProtoMsg): MsgUpdateDowntimeParams {
    return MsgUpdateDowntimeParams.decode(message.value);
  },
  toProto(message: MsgUpdateDowntimeParams): Uint8Array {
    return MsgUpdateDowntimeParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateDowntimeParams): MsgUpdateDowntimeParamsProtoMsg {
    return {
      typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams",
      value: MsgUpdateDowntimeParams.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateDowntimeParams.typeUrl, MsgUpdateDowntimeParams);
function createBaseMsgUpdateDowntimeParamsResponse(): MsgUpdateDowntimeParamsResponse {
  return {};
}
export const MsgUpdateDowntimeParamsResponse = {
  typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParamsResponse",
  is(o: any): o is MsgUpdateDowntimeParamsResponse {
    return o && o.$typeUrl === MsgUpdateDowntimeParamsResponse.typeUrl;
  },
  isSDK(o: any): o is MsgUpdateDowntimeParamsResponseSDKType {
    return o && o.$typeUrl === MsgUpdateDowntimeParamsResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateDowntimeParamsResponseAmino {
    return o && o.$typeUrl === MsgUpdateDowntimeParamsResponse.typeUrl;
  },
  encode(_: MsgUpdateDowntimeParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateDowntimeParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDowntimeParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateDowntimeParamsResponse>): MsgUpdateDowntimeParamsResponse {
    const message = createBaseMsgUpdateDowntimeParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateDowntimeParamsResponseAmino): MsgUpdateDowntimeParamsResponse {
    const message = createBaseMsgUpdateDowntimeParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateDowntimeParamsResponse): MsgUpdateDowntimeParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateDowntimeParamsResponseAminoMsg): MsgUpdateDowntimeParamsResponse {
    return MsgUpdateDowntimeParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateDowntimeParamsResponseProtoMsg): MsgUpdateDowntimeParamsResponse {
    return MsgUpdateDowntimeParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateDowntimeParamsResponse): Uint8Array {
    return MsgUpdateDowntimeParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateDowntimeParamsResponse): MsgUpdateDowntimeParamsResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParamsResponse",
      value: MsgUpdateDowntimeParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateDowntimeParamsResponse.typeUrl, MsgUpdateDowntimeParamsResponse);