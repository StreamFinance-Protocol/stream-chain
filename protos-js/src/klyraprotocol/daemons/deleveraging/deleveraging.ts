//@ts-nocheck
import { SubaccountOpenPositionInfo, SubaccountOpenPositionInfoAmino, SubaccountOpenPositionInfoSDKType } from "../../clob/liquidations";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
/**
 * UpdateSubaccountsListForDeleveragingDaemonRequest is a request message that
 * contains a list of perpetuals with the associated subaccounts that have open
 * long and short positions
 */
export interface UpdateSubaccountsListForDeleveragingDaemonRequest {
  subaccountOpenPositionInfo: SubaccountOpenPositionInfo[];
}
export interface UpdateSubaccountsListForDeleveragingDaemonRequestProtoMsg {
  typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonRequest";
  value: Uint8Array;
}
/**
 * UpdateSubaccountsListForDeleveragingDaemonRequest is a request message that
 * contains a list of perpetuals with the associated subaccounts that have open
 * long and short positions
 */
export interface UpdateSubaccountsListForDeleveragingDaemonRequestAmino {
  subaccount_open_position_info?: SubaccountOpenPositionInfoAmino[];
}
export interface UpdateSubaccountsListForDeleveragingDaemonRequestAminoMsg {
  type: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonRequest";
  value: UpdateSubaccountsListForDeleveragingDaemonRequestAmino;
}
/**
 * UpdateSubaccountsListForDeleveragingDaemonRequest is a request message that
 * contains a list of perpetuals with the associated subaccounts that have open
 * long and short positions
 */
export interface UpdateSubaccountsListForDeleveragingDaemonRequestSDKType {
  subaccount_open_position_info: SubaccountOpenPositionInfoSDKType[];
}
/**
 * UpdateSubaccountsListForDeleveragingDaemonResponse is a response message for
 * UpdateSubaccountsListForDeleveragingDaemonRequest.
 */
export interface UpdateSubaccountsListForDeleveragingDaemonResponse {}
export interface UpdateSubaccountsListForDeleveragingDaemonResponseProtoMsg {
  typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonResponse";
  value: Uint8Array;
}
/**
 * UpdateSubaccountsListForDeleveragingDaemonResponse is a response message for
 * UpdateSubaccountsListForDeleveragingDaemonRequest.
 */
export interface UpdateSubaccountsListForDeleveragingDaemonResponseAmino {}
export interface UpdateSubaccountsListForDeleveragingDaemonResponseAminoMsg {
  type: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonResponse";
  value: UpdateSubaccountsListForDeleveragingDaemonResponseAmino;
}
/**
 * UpdateSubaccountsListForDeleveragingDaemonResponse is a response message for
 * UpdateSubaccountsListForDeleveragingDaemonRequest.
 */
export interface UpdateSubaccountsListForDeleveragingDaemonResponseSDKType {}
function createBaseUpdateSubaccountsListForDeleveragingDaemonRequest(): UpdateSubaccountsListForDeleveragingDaemonRequest {
  return {
    subaccountOpenPositionInfo: []
  };
}
export const UpdateSubaccountsListForDeleveragingDaemonRequest = {
  typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonRequest",
  is(o: any): o is UpdateSubaccountsListForDeleveragingDaemonRequest {
    return o && (o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl || Array.isArray(o.subaccountOpenPositionInfo) && (!o.subaccountOpenPositionInfo.length || SubaccountOpenPositionInfo.is(o.subaccountOpenPositionInfo[0])));
  },
  isSDK(o: any): o is UpdateSubaccountsListForDeleveragingDaemonRequestSDKType {
    return o && (o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl || Array.isArray(o.subaccount_open_position_info) && (!o.subaccount_open_position_info.length || SubaccountOpenPositionInfo.isSDK(o.subaccount_open_position_info[0])));
  },
  isAmino(o: any): o is UpdateSubaccountsListForDeleveragingDaemonRequestAmino {
    return o && (o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl || Array.isArray(o.subaccount_open_position_info) && (!o.subaccount_open_position_info.length || SubaccountOpenPositionInfo.isAmino(o.subaccount_open_position_info[0])));
  },
  encode(message: UpdateSubaccountsListForDeleveragingDaemonRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.subaccountOpenPositionInfo) {
      SubaccountOpenPositionInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): UpdateSubaccountsListForDeleveragingDaemonRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateSubaccountsListForDeleveragingDaemonRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subaccountOpenPositionInfo.push(SubaccountOpenPositionInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateSubaccountsListForDeleveragingDaemonRequest>): UpdateSubaccountsListForDeleveragingDaemonRequest {
    const message = createBaseUpdateSubaccountsListForDeleveragingDaemonRequest();
    message.subaccountOpenPositionInfo = object.subaccountOpenPositionInfo?.map(e => SubaccountOpenPositionInfo.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: UpdateSubaccountsListForDeleveragingDaemonRequestAmino): UpdateSubaccountsListForDeleveragingDaemonRequest {
    const message = createBaseUpdateSubaccountsListForDeleveragingDaemonRequest();
    message.subaccountOpenPositionInfo = object.subaccount_open_position_info?.map(e => SubaccountOpenPositionInfo.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: UpdateSubaccountsListForDeleveragingDaemonRequest): UpdateSubaccountsListForDeleveragingDaemonRequestAmino {
    const obj: any = {};
    if (message.subaccountOpenPositionInfo) {
      obj.subaccount_open_position_info = message.subaccountOpenPositionInfo.map(e => e ? SubaccountOpenPositionInfo.toAmino(e) : undefined);
    } else {
      obj.subaccount_open_position_info = message.subaccountOpenPositionInfo;
    }
    return obj;
  },
  fromAminoMsg(object: UpdateSubaccountsListForDeleveragingDaemonRequestAminoMsg): UpdateSubaccountsListForDeleveragingDaemonRequest {
    return UpdateSubaccountsListForDeleveragingDaemonRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateSubaccountsListForDeleveragingDaemonRequestProtoMsg): UpdateSubaccountsListForDeleveragingDaemonRequest {
    return UpdateSubaccountsListForDeleveragingDaemonRequest.decode(message.value);
  },
  toProto(message: UpdateSubaccountsListForDeleveragingDaemonRequest): Uint8Array {
    return UpdateSubaccountsListForDeleveragingDaemonRequest.encode(message).finish();
  },
  toProtoMsg(message: UpdateSubaccountsListForDeleveragingDaemonRequest): UpdateSubaccountsListForDeleveragingDaemonRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonRequest",
      value: UpdateSubaccountsListForDeleveragingDaemonRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(UpdateSubaccountsListForDeleveragingDaemonRequest.typeUrl, UpdateSubaccountsListForDeleveragingDaemonRequest);
function createBaseUpdateSubaccountsListForDeleveragingDaemonResponse(): UpdateSubaccountsListForDeleveragingDaemonResponse {
  return {};
}
export const UpdateSubaccountsListForDeleveragingDaemonResponse = {
  typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonResponse",
  is(o: any): o is UpdateSubaccountsListForDeleveragingDaemonResponse {
    return o && o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl;
  },
  isSDK(o: any): o is UpdateSubaccountsListForDeleveragingDaemonResponseSDKType {
    return o && o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl;
  },
  isAmino(o: any): o is UpdateSubaccountsListForDeleveragingDaemonResponseAmino {
    return o && o.$typeUrl === UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl;
  },
  encode(_: UpdateSubaccountsListForDeleveragingDaemonResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): UpdateSubaccountsListForDeleveragingDaemonResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateSubaccountsListForDeleveragingDaemonResponse();
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
  fromPartial(_: Partial<UpdateSubaccountsListForDeleveragingDaemonResponse>): UpdateSubaccountsListForDeleveragingDaemonResponse {
    const message = createBaseUpdateSubaccountsListForDeleveragingDaemonResponse();
    return message;
  },
  fromAmino(_: UpdateSubaccountsListForDeleveragingDaemonResponseAmino): UpdateSubaccountsListForDeleveragingDaemonResponse {
    const message = createBaseUpdateSubaccountsListForDeleveragingDaemonResponse();
    return message;
  },
  toAmino(_: UpdateSubaccountsListForDeleveragingDaemonResponse): UpdateSubaccountsListForDeleveragingDaemonResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: UpdateSubaccountsListForDeleveragingDaemonResponseAminoMsg): UpdateSubaccountsListForDeleveragingDaemonResponse {
    return UpdateSubaccountsListForDeleveragingDaemonResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateSubaccountsListForDeleveragingDaemonResponseProtoMsg): UpdateSubaccountsListForDeleveragingDaemonResponse {
    return UpdateSubaccountsListForDeleveragingDaemonResponse.decode(message.value);
  },
  toProto(message: UpdateSubaccountsListForDeleveragingDaemonResponse): Uint8Array {
    return UpdateSubaccountsListForDeleveragingDaemonResponse.encode(message).finish();
  },
  toProtoMsg(message: UpdateSubaccountsListForDeleveragingDaemonResponse): UpdateSubaccountsListForDeleveragingDaemonResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.daemons.deleveraging.UpdateSubaccountsListForDeleveragingDaemonResponse",
      value: UpdateSubaccountsListForDeleveragingDaemonResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(UpdateSubaccountsListForDeleveragingDaemonResponse.typeUrl, UpdateSubaccountsListForDeleveragingDaemonResponse);