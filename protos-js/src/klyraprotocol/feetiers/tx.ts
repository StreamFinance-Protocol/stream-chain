//@ts-nocheck
import { PerpetualFeeParams, PerpetualFeeParamsAmino, PerpetualFeeParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** MsgUpdatePerpetualFeeParams is the Msg/UpdatePerpetualFeeParams request type. */
export interface MsgUpdatePerpetualFeeParams {
  authority: string;
  /** Defines the parameters to update. All parameters must be supplied. */
  params: PerpetualFeeParams;
}
export interface MsgUpdatePerpetualFeeParamsProtoMsg {
  typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams";
  value: Uint8Array;
}
/** MsgUpdatePerpetualFeeParams is the Msg/UpdatePerpetualFeeParams request type. */
export interface MsgUpdatePerpetualFeeParamsAmino {
  authority?: string;
  /** Defines the parameters to update. All parameters must be supplied. */
  params?: PerpetualFeeParamsAmino;
}
export interface MsgUpdatePerpetualFeeParamsAminoMsg {
  type: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams";
  value: MsgUpdatePerpetualFeeParamsAmino;
}
/** MsgUpdatePerpetualFeeParams is the Msg/UpdatePerpetualFeeParams request type. */
export interface MsgUpdatePerpetualFeeParamsSDKType {
  authority: string;
  params: PerpetualFeeParamsSDKType;
}
/**
 * MsgUpdatePerpetualFeeParamsResponse is the Msg/UpdatePerpetualFeeParams
 * response type.
 */
export interface MsgUpdatePerpetualFeeParamsResponse {}
export interface MsgUpdatePerpetualFeeParamsResponseProtoMsg {
  typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdatePerpetualFeeParamsResponse is the Msg/UpdatePerpetualFeeParams
 * response type.
 */
export interface MsgUpdatePerpetualFeeParamsResponseAmino {}
export interface MsgUpdatePerpetualFeeParamsResponseAminoMsg {
  type: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParamsResponse";
  value: MsgUpdatePerpetualFeeParamsResponseAmino;
}
/**
 * MsgUpdatePerpetualFeeParamsResponse is the Msg/UpdatePerpetualFeeParams
 * response type.
 */
export interface MsgUpdatePerpetualFeeParamsResponseSDKType {}
function createBaseMsgUpdatePerpetualFeeParams(): MsgUpdatePerpetualFeeParams {
  return {
    authority: "",
    params: PerpetualFeeParams.fromPartial({})
  };
}
export const MsgUpdatePerpetualFeeParams = {
  typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams",
  is(o: any): o is MsgUpdatePerpetualFeeParams {
    return o && (o.$typeUrl === MsgUpdatePerpetualFeeParams.typeUrl || typeof o.authority === "string" && PerpetualFeeParams.is(o.params));
  },
  isSDK(o: any): o is MsgUpdatePerpetualFeeParamsSDKType {
    return o && (o.$typeUrl === MsgUpdatePerpetualFeeParams.typeUrl || typeof o.authority === "string" && PerpetualFeeParams.isSDK(o.params));
  },
  isAmino(o: any): o is MsgUpdatePerpetualFeeParamsAmino {
    return o && (o.$typeUrl === MsgUpdatePerpetualFeeParams.typeUrl || typeof o.authority === "string" && PerpetualFeeParams.isAmino(o.params));
  },
  encode(message: MsgUpdatePerpetualFeeParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      PerpetualFeeParams.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdatePerpetualFeeParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePerpetualFeeParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = PerpetualFeeParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdatePerpetualFeeParams>): MsgUpdatePerpetualFeeParams {
    const message = createBaseMsgUpdatePerpetualFeeParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? PerpetualFeeParams.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdatePerpetualFeeParamsAmino): MsgUpdatePerpetualFeeParams {
    const message = createBaseMsgUpdatePerpetualFeeParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = PerpetualFeeParams.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdatePerpetualFeeParams): MsgUpdatePerpetualFeeParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? PerpetualFeeParams.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdatePerpetualFeeParamsAminoMsg): MsgUpdatePerpetualFeeParams {
    return MsgUpdatePerpetualFeeParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdatePerpetualFeeParamsProtoMsg): MsgUpdatePerpetualFeeParams {
    return MsgUpdatePerpetualFeeParams.decode(message.value);
  },
  toProto(message: MsgUpdatePerpetualFeeParams): Uint8Array {
    return MsgUpdatePerpetualFeeParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdatePerpetualFeeParams): MsgUpdatePerpetualFeeParamsProtoMsg {
    return {
      typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams",
      value: MsgUpdatePerpetualFeeParams.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdatePerpetualFeeParams.typeUrl, MsgUpdatePerpetualFeeParams);
function createBaseMsgUpdatePerpetualFeeParamsResponse(): MsgUpdatePerpetualFeeParamsResponse {
  return {};
}
export const MsgUpdatePerpetualFeeParamsResponse = {
  typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParamsResponse",
  is(o: any): o is MsgUpdatePerpetualFeeParamsResponse {
    return o && o.$typeUrl === MsgUpdatePerpetualFeeParamsResponse.typeUrl;
  },
  isSDK(o: any): o is MsgUpdatePerpetualFeeParamsResponseSDKType {
    return o && o.$typeUrl === MsgUpdatePerpetualFeeParamsResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdatePerpetualFeeParamsResponseAmino {
    return o && o.$typeUrl === MsgUpdatePerpetualFeeParamsResponse.typeUrl;
  },
  encode(_: MsgUpdatePerpetualFeeParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdatePerpetualFeeParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePerpetualFeeParamsResponse();
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
  fromPartial(_: Partial<MsgUpdatePerpetualFeeParamsResponse>): MsgUpdatePerpetualFeeParamsResponse {
    const message = createBaseMsgUpdatePerpetualFeeParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdatePerpetualFeeParamsResponseAmino): MsgUpdatePerpetualFeeParamsResponse {
    const message = createBaseMsgUpdatePerpetualFeeParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdatePerpetualFeeParamsResponse): MsgUpdatePerpetualFeeParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdatePerpetualFeeParamsResponseAminoMsg): MsgUpdatePerpetualFeeParamsResponse {
    return MsgUpdatePerpetualFeeParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdatePerpetualFeeParamsResponseProtoMsg): MsgUpdatePerpetualFeeParamsResponse {
    return MsgUpdatePerpetualFeeParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdatePerpetualFeeParamsResponse): Uint8Array {
    return MsgUpdatePerpetualFeeParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdatePerpetualFeeParamsResponse): MsgUpdatePerpetualFeeParamsResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParamsResponse",
      value: MsgUpdatePerpetualFeeParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdatePerpetualFeeParamsResponse.typeUrl, MsgUpdatePerpetualFeeParamsResponse);