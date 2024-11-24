//@ts-nocheck
import { SubaccountId, SubaccountIdAmino, SubaccountIdSDKType } from "./subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** MsgClaimYieldForSubaccount is the Msg/ClaimYieldForSubaccount request type. */
export interface MsgClaimYieldForSubaccount {
  id?: SubaccountId;
}
export interface MsgClaimYieldForSubaccountProtoMsg {
  typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount";
  value: Uint8Array;
}
/** MsgClaimYieldForSubaccount is the Msg/ClaimYieldForSubaccount request type. */
export interface MsgClaimYieldForSubaccountAmino {
  id?: SubaccountIdAmino;
}
export interface MsgClaimYieldForSubaccountAminoMsg {
  type: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount";
  value: MsgClaimYieldForSubaccountAmino;
}
/** MsgClaimYieldForSubaccount is the Msg/ClaimYieldForSubaccount request type. */
export interface MsgClaimYieldForSubaccountSDKType {
  id?: SubaccountIdSDKType;
}
/**
 * MsgClaimYieldForSubaccountResponse is the Msg/ClaimYieldForSubaccount
 * response type.
 */
export interface MsgClaimYieldForSubaccountResponse {}
export interface MsgClaimYieldForSubaccountResponseProtoMsg {
  typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse";
  value: Uint8Array;
}
/**
 * MsgClaimYieldForSubaccountResponse is the Msg/ClaimYieldForSubaccount
 * response type.
 */
export interface MsgClaimYieldForSubaccountResponseAmino {}
export interface MsgClaimYieldForSubaccountResponseAminoMsg {
  type: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse";
  value: MsgClaimYieldForSubaccountResponseAmino;
}
/**
 * MsgClaimYieldForSubaccountResponse is the Msg/ClaimYieldForSubaccount
 * response type.
 */
export interface MsgClaimYieldForSubaccountResponseSDKType {}
function createBaseMsgClaimYieldForSubaccount(): MsgClaimYieldForSubaccount {
  return {
    id: undefined
  };
}
export const MsgClaimYieldForSubaccount = {
  typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
  is(o: any): o is MsgClaimYieldForSubaccount {
    return o && o.$typeUrl === MsgClaimYieldForSubaccount.typeUrl;
  },
  isSDK(o: any): o is MsgClaimYieldForSubaccountSDKType {
    return o && o.$typeUrl === MsgClaimYieldForSubaccount.typeUrl;
  },
  isAmino(o: any): o is MsgClaimYieldForSubaccountAmino {
    return o && o.$typeUrl === MsgClaimYieldForSubaccount.typeUrl;
  },
  encode(message: MsgClaimYieldForSubaccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      SubaccountId.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgClaimYieldForSubaccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimYieldForSubaccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = SubaccountId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgClaimYieldForSubaccount>): MsgClaimYieldForSubaccount {
    const message = createBaseMsgClaimYieldForSubaccount();
    message.id = object.id !== undefined && object.id !== null ? SubaccountId.fromPartial(object.id) : undefined;
    return message;
  },
  fromAmino(object: MsgClaimYieldForSubaccountAmino): MsgClaimYieldForSubaccount {
    const message = createBaseMsgClaimYieldForSubaccount();
    if (object.id !== undefined && object.id !== null) {
      message.id = SubaccountId.fromAmino(object.id);
    }
    return message;
  },
  toAmino(message: MsgClaimYieldForSubaccount): MsgClaimYieldForSubaccountAmino {
    const obj: any = {};
    obj.id = message.id ? SubaccountId.toAmino(message.id) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgClaimYieldForSubaccountAminoMsg): MsgClaimYieldForSubaccount {
    return MsgClaimYieldForSubaccount.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClaimYieldForSubaccountProtoMsg): MsgClaimYieldForSubaccount {
    return MsgClaimYieldForSubaccount.decode(message.value);
  },
  toProto(message: MsgClaimYieldForSubaccount): Uint8Array {
    return MsgClaimYieldForSubaccount.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimYieldForSubaccount): MsgClaimYieldForSubaccountProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
      value: MsgClaimYieldForSubaccount.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgClaimYieldForSubaccount.typeUrl, MsgClaimYieldForSubaccount);
function createBaseMsgClaimYieldForSubaccountResponse(): MsgClaimYieldForSubaccountResponse {
  return {};
}
export const MsgClaimYieldForSubaccountResponse = {
  typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse",
  is(o: any): o is MsgClaimYieldForSubaccountResponse {
    return o && o.$typeUrl === MsgClaimYieldForSubaccountResponse.typeUrl;
  },
  isSDK(o: any): o is MsgClaimYieldForSubaccountResponseSDKType {
    return o && o.$typeUrl === MsgClaimYieldForSubaccountResponse.typeUrl;
  },
  isAmino(o: any): o is MsgClaimYieldForSubaccountResponseAmino {
    return o && o.$typeUrl === MsgClaimYieldForSubaccountResponse.typeUrl;
  },
  encode(_: MsgClaimYieldForSubaccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgClaimYieldForSubaccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimYieldForSubaccountResponse();
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
  fromPartial(_: Partial<MsgClaimYieldForSubaccountResponse>): MsgClaimYieldForSubaccountResponse {
    const message = createBaseMsgClaimYieldForSubaccountResponse();
    return message;
  },
  fromAmino(_: MsgClaimYieldForSubaccountResponseAmino): MsgClaimYieldForSubaccountResponse {
    const message = createBaseMsgClaimYieldForSubaccountResponse();
    return message;
  },
  toAmino(_: MsgClaimYieldForSubaccountResponse): MsgClaimYieldForSubaccountResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgClaimYieldForSubaccountResponseAminoMsg): MsgClaimYieldForSubaccountResponse {
    return MsgClaimYieldForSubaccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClaimYieldForSubaccountResponseProtoMsg): MsgClaimYieldForSubaccountResponse {
    return MsgClaimYieldForSubaccountResponse.decode(message.value);
  },
  toProto(message: MsgClaimYieldForSubaccountResponse): Uint8Array {
    return MsgClaimYieldForSubaccountResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimYieldForSubaccountResponse): MsgClaimYieldForSubaccountResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse",
      value: MsgClaimYieldForSubaccountResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgClaimYieldForSubaccountResponse.typeUrl, MsgClaimYieldForSubaccountResponse);