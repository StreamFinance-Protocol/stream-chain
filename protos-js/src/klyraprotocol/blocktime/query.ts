//@ts-nocheck
import { DowntimeParams, DowntimeParamsAmino, DowntimeParamsSDKType } from "./params";
import { BlockInfo, BlockInfoAmino, BlockInfoSDKType, AllDowntimeInfo, AllDowntimeInfoAmino, AllDowntimeInfoSDKType } from "./blocktime";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/**
 * QueryDowntimeParamsRequest is a request type for the DowntimeParams
 * RPC method.
 */
export interface QueryDowntimeParamsRequest {}
export interface QueryDowntimeParamsRequestProtoMsg {
  typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsRequest";
  value: Uint8Array;
}
/**
 * QueryDowntimeParamsRequest is a request type for the DowntimeParams
 * RPC method.
 */
export interface QueryDowntimeParamsRequestAmino {}
export interface QueryDowntimeParamsRequestAminoMsg {
  type: "/klyraprotocol.blocktime.QueryDowntimeParamsRequest";
  value: QueryDowntimeParamsRequestAmino;
}
/**
 * QueryDowntimeParamsRequest is a request type for the DowntimeParams
 * RPC method.
 */
export interface QueryDowntimeParamsRequestSDKType {}
/**
 * QueryDowntimeParamsResponse is a response type for the DowntimeParams
 * RPC method.
 */
export interface QueryDowntimeParamsResponse {
  params: DowntimeParams;
}
export interface QueryDowntimeParamsResponseProtoMsg {
  typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsResponse";
  value: Uint8Array;
}
/**
 * QueryDowntimeParamsResponse is a response type for the DowntimeParams
 * RPC method.
 */
export interface QueryDowntimeParamsResponseAmino {
  params?: DowntimeParamsAmino;
}
export interface QueryDowntimeParamsResponseAminoMsg {
  type: "/klyraprotocol.blocktime.QueryDowntimeParamsResponse";
  value: QueryDowntimeParamsResponseAmino;
}
/**
 * QueryDowntimeParamsResponse is a response type for the DowntimeParams
 * RPC method.
 */
export interface QueryDowntimeParamsResponseSDKType {
  params: DowntimeParamsSDKType;
}
/**
 * QueryPreviousBlockInfoRequest is a request type for the PreviousBlockInfo
 * RPC method.
 */
export interface QueryPreviousBlockInfoRequest {}
export interface QueryPreviousBlockInfoRequestProtoMsg {
  typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoRequest";
  value: Uint8Array;
}
/**
 * QueryPreviousBlockInfoRequest is a request type for the PreviousBlockInfo
 * RPC method.
 */
export interface QueryPreviousBlockInfoRequestAmino {}
export interface QueryPreviousBlockInfoRequestAminoMsg {
  type: "/klyraprotocol.blocktime.QueryPreviousBlockInfoRequest";
  value: QueryPreviousBlockInfoRequestAmino;
}
/**
 * QueryPreviousBlockInfoRequest is a request type for the PreviousBlockInfo
 * RPC method.
 */
export interface QueryPreviousBlockInfoRequestSDKType {}
/**
 * QueryPreviousBlockInfoResponse is a request type for the PreviousBlockInfo
 * RPC method.
 */
export interface QueryPreviousBlockInfoResponse {
  info?: BlockInfo;
}
export interface QueryPreviousBlockInfoResponseProtoMsg {
  typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoResponse";
  value: Uint8Array;
}
/**
 * QueryPreviousBlockInfoResponse is a request type for the PreviousBlockInfo
 * RPC method.
 */
export interface QueryPreviousBlockInfoResponseAmino {
  info?: BlockInfoAmino;
}
export interface QueryPreviousBlockInfoResponseAminoMsg {
  type: "/klyraprotocol.blocktime.QueryPreviousBlockInfoResponse";
  value: QueryPreviousBlockInfoResponseAmino;
}
/**
 * QueryPreviousBlockInfoResponse is a request type for the PreviousBlockInfo
 * RPC method.
 */
export interface QueryPreviousBlockInfoResponseSDKType {
  info?: BlockInfoSDKType;
}
/**
 * QueryAllDowntimeInfoRequest is a request type for the AllDowntimeInfo
 * RPC method.
 */
export interface QueryAllDowntimeInfoRequest {}
export interface QueryAllDowntimeInfoRequestProtoMsg {
  typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoRequest";
  value: Uint8Array;
}
/**
 * QueryAllDowntimeInfoRequest is a request type for the AllDowntimeInfo
 * RPC method.
 */
export interface QueryAllDowntimeInfoRequestAmino {}
export interface QueryAllDowntimeInfoRequestAminoMsg {
  type: "/klyraprotocol.blocktime.QueryAllDowntimeInfoRequest";
  value: QueryAllDowntimeInfoRequestAmino;
}
/**
 * QueryAllDowntimeInfoRequest is a request type for the AllDowntimeInfo
 * RPC method.
 */
export interface QueryAllDowntimeInfoRequestSDKType {}
/**
 * QueryAllDowntimeInfoResponse is a request type for the AllDowntimeInfo
 * RPC method.
 */
export interface QueryAllDowntimeInfoResponse {
  info?: AllDowntimeInfo;
}
export interface QueryAllDowntimeInfoResponseProtoMsg {
  typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoResponse";
  value: Uint8Array;
}
/**
 * QueryAllDowntimeInfoResponse is a request type for the AllDowntimeInfo
 * RPC method.
 */
export interface QueryAllDowntimeInfoResponseAmino {
  info?: AllDowntimeInfoAmino;
}
export interface QueryAllDowntimeInfoResponseAminoMsg {
  type: "/klyraprotocol.blocktime.QueryAllDowntimeInfoResponse";
  value: QueryAllDowntimeInfoResponseAmino;
}
/**
 * QueryAllDowntimeInfoResponse is a request type for the AllDowntimeInfo
 * RPC method.
 */
export interface QueryAllDowntimeInfoResponseSDKType {
  info?: AllDowntimeInfoSDKType;
}
function createBaseQueryDowntimeParamsRequest(): QueryDowntimeParamsRequest {
  return {};
}
export const QueryDowntimeParamsRequest = {
  typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsRequest",
  is(o: any): o is QueryDowntimeParamsRequest {
    return o && o.$typeUrl === QueryDowntimeParamsRequest.typeUrl;
  },
  isSDK(o: any): o is QueryDowntimeParamsRequestSDKType {
    return o && o.$typeUrl === QueryDowntimeParamsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryDowntimeParamsRequestAmino {
    return o && o.$typeUrl === QueryDowntimeParamsRequest.typeUrl;
  },
  encode(_: QueryDowntimeParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDowntimeParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDowntimeParamsRequest();
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
  fromPartial(_: Partial<QueryDowntimeParamsRequest>): QueryDowntimeParamsRequest {
    const message = createBaseQueryDowntimeParamsRequest();
    return message;
  },
  fromAmino(_: QueryDowntimeParamsRequestAmino): QueryDowntimeParamsRequest {
    const message = createBaseQueryDowntimeParamsRequest();
    return message;
  },
  toAmino(_: QueryDowntimeParamsRequest): QueryDowntimeParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryDowntimeParamsRequestAminoMsg): QueryDowntimeParamsRequest {
    return QueryDowntimeParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDowntimeParamsRequestProtoMsg): QueryDowntimeParamsRequest {
    return QueryDowntimeParamsRequest.decode(message.value);
  },
  toProto(message: QueryDowntimeParamsRequest): Uint8Array {
    return QueryDowntimeParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDowntimeParamsRequest): QueryDowntimeParamsRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsRequest",
      value: QueryDowntimeParamsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryDowntimeParamsRequest.typeUrl, QueryDowntimeParamsRequest);
function createBaseQueryDowntimeParamsResponse(): QueryDowntimeParamsResponse {
  return {
    params: DowntimeParams.fromPartial({})
  };
}
export const QueryDowntimeParamsResponse = {
  typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsResponse",
  is(o: any): o is QueryDowntimeParamsResponse {
    return o && (o.$typeUrl === QueryDowntimeParamsResponse.typeUrl || DowntimeParams.is(o.params));
  },
  isSDK(o: any): o is QueryDowntimeParamsResponseSDKType {
    return o && (o.$typeUrl === QueryDowntimeParamsResponse.typeUrl || DowntimeParams.isSDK(o.params));
  },
  isAmino(o: any): o is QueryDowntimeParamsResponseAmino {
    return o && (o.$typeUrl === QueryDowntimeParamsResponse.typeUrl || DowntimeParams.isAmino(o.params));
  },
  encode(message: QueryDowntimeParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      DowntimeParams.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDowntimeParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDowntimeParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = DowntimeParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDowntimeParamsResponse>): QueryDowntimeParamsResponse {
    const message = createBaseQueryDowntimeParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? DowntimeParams.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryDowntimeParamsResponseAmino): QueryDowntimeParamsResponse {
    const message = createBaseQueryDowntimeParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = DowntimeParams.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryDowntimeParamsResponse): QueryDowntimeParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? DowntimeParams.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDowntimeParamsResponseAminoMsg): QueryDowntimeParamsResponse {
    return QueryDowntimeParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDowntimeParamsResponseProtoMsg): QueryDowntimeParamsResponse {
    return QueryDowntimeParamsResponse.decode(message.value);
  },
  toProto(message: QueryDowntimeParamsResponse): Uint8Array {
    return QueryDowntimeParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDowntimeParamsResponse): QueryDowntimeParamsResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsResponse",
      value: QueryDowntimeParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryDowntimeParamsResponse.typeUrl, QueryDowntimeParamsResponse);
function createBaseQueryPreviousBlockInfoRequest(): QueryPreviousBlockInfoRequest {
  return {};
}
export const QueryPreviousBlockInfoRequest = {
  typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoRequest",
  is(o: any): o is QueryPreviousBlockInfoRequest {
    return o && o.$typeUrl === QueryPreviousBlockInfoRequest.typeUrl;
  },
  isSDK(o: any): o is QueryPreviousBlockInfoRequestSDKType {
    return o && o.$typeUrl === QueryPreviousBlockInfoRequest.typeUrl;
  },
  isAmino(o: any): o is QueryPreviousBlockInfoRequestAmino {
    return o && o.$typeUrl === QueryPreviousBlockInfoRequest.typeUrl;
  },
  encode(_: QueryPreviousBlockInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPreviousBlockInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPreviousBlockInfoRequest();
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
  fromPartial(_: Partial<QueryPreviousBlockInfoRequest>): QueryPreviousBlockInfoRequest {
    const message = createBaseQueryPreviousBlockInfoRequest();
    return message;
  },
  fromAmino(_: QueryPreviousBlockInfoRequestAmino): QueryPreviousBlockInfoRequest {
    const message = createBaseQueryPreviousBlockInfoRequest();
    return message;
  },
  toAmino(_: QueryPreviousBlockInfoRequest): QueryPreviousBlockInfoRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryPreviousBlockInfoRequestAminoMsg): QueryPreviousBlockInfoRequest {
    return QueryPreviousBlockInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPreviousBlockInfoRequestProtoMsg): QueryPreviousBlockInfoRequest {
    return QueryPreviousBlockInfoRequest.decode(message.value);
  },
  toProto(message: QueryPreviousBlockInfoRequest): Uint8Array {
    return QueryPreviousBlockInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPreviousBlockInfoRequest): QueryPreviousBlockInfoRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoRequest",
      value: QueryPreviousBlockInfoRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryPreviousBlockInfoRequest.typeUrl, QueryPreviousBlockInfoRequest);
function createBaseQueryPreviousBlockInfoResponse(): QueryPreviousBlockInfoResponse {
  return {
    info: undefined
  };
}
export const QueryPreviousBlockInfoResponse = {
  typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoResponse",
  is(o: any): o is QueryPreviousBlockInfoResponse {
    return o && o.$typeUrl === QueryPreviousBlockInfoResponse.typeUrl;
  },
  isSDK(o: any): o is QueryPreviousBlockInfoResponseSDKType {
    return o && o.$typeUrl === QueryPreviousBlockInfoResponse.typeUrl;
  },
  isAmino(o: any): o is QueryPreviousBlockInfoResponseAmino {
    return o && o.$typeUrl === QueryPreviousBlockInfoResponse.typeUrl;
  },
  encode(message: QueryPreviousBlockInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.info !== undefined) {
      BlockInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPreviousBlockInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPreviousBlockInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.info = BlockInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPreviousBlockInfoResponse>): QueryPreviousBlockInfoResponse {
    const message = createBaseQueryPreviousBlockInfoResponse();
    message.info = object.info !== undefined && object.info !== null ? BlockInfo.fromPartial(object.info) : undefined;
    return message;
  },
  fromAmino(object: QueryPreviousBlockInfoResponseAmino): QueryPreviousBlockInfoResponse {
    const message = createBaseQueryPreviousBlockInfoResponse();
    if (object.info !== undefined && object.info !== null) {
      message.info = BlockInfo.fromAmino(object.info);
    }
    return message;
  },
  toAmino(message: QueryPreviousBlockInfoResponse): QueryPreviousBlockInfoResponseAmino {
    const obj: any = {};
    obj.info = message.info ? BlockInfo.toAmino(message.info) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPreviousBlockInfoResponseAminoMsg): QueryPreviousBlockInfoResponse {
    return QueryPreviousBlockInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPreviousBlockInfoResponseProtoMsg): QueryPreviousBlockInfoResponse {
    return QueryPreviousBlockInfoResponse.decode(message.value);
  },
  toProto(message: QueryPreviousBlockInfoResponse): Uint8Array {
    return QueryPreviousBlockInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPreviousBlockInfoResponse): QueryPreviousBlockInfoResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoResponse",
      value: QueryPreviousBlockInfoResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryPreviousBlockInfoResponse.typeUrl, QueryPreviousBlockInfoResponse);
function createBaseQueryAllDowntimeInfoRequest(): QueryAllDowntimeInfoRequest {
  return {};
}
export const QueryAllDowntimeInfoRequest = {
  typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoRequest",
  is(o: any): o is QueryAllDowntimeInfoRequest {
    return o && o.$typeUrl === QueryAllDowntimeInfoRequest.typeUrl;
  },
  isSDK(o: any): o is QueryAllDowntimeInfoRequestSDKType {
    return o && o.$typeUrl === QueryAllDowntimeInfoRequest.typeUrl;
  },
  isAmino(o: any): o is QueryAllDowntimeInfoRequestAmino {
    return o && o.$typeUrl === QueryAllDowntimeInfoRequest.typeUrl;
  },
  encode(_: QueryAllDowntimeInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllDowntimeInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDowntimeInfoRequest();
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
  fromPartial(_: Partial<QueryAllDowntimeInfoRequest>): QueryAllDowntimeInfoRequest {
    const message = createBaseQueryAllDowntimeInfoRequest();
    return message;
  },
  fromAmino(_: QueryAllDowntimeInfoRequestAmino): QueryAllDowntimeInfoRequest {
    const message = createBaseQueryAllDowntimeInfoRequest();
    return message;
  },
  toAmino(_: QueryAllDowntimeInfoRequest): QueryAllDowntimeInfoRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryAllDowntimeInfoRequestAminoMsg): QueryAllDowntimeInfoRequest {
    return QueryAllDowntimeInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllDowntimeInfoRequestProtoMsg): QueryAllDowntimeInfoRequest {
    return QueryAllDowntimeInfoRequest.decode(message.value);
  },
  toProto(message: QueryAllDowntimeInfoRequest): Uint8Array {
    return QueryAllDowntimeInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllDowntimeInfoRequest): QueryAllDowntimeInfoRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoRequest",
      value: QueryAllDowntimeInfoRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAllDowntimeInfoRequest.typeUrl, QueryAllDowntimeInfoRequest);
function createBaseQueryAllDowntimeInfoResponse(): QueryAllDowntimeInfoResponse {
  return {
    info: undefined
  };
}
export const QueryAllDowntimeInfoResponse = {
  typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoResponse",
  is(o: any): o is QueryAllDowntimeInfoResponse {
    return o && o.$typeUrl === QueryAllDowntimeInfoResponse.typeUrl;
  },
  isSDK(o: any): o is QueryAllDowntimeInfoResponseSDKType {
    return o && o.$typeUrl === QueryAllDowntimeInfoResponse.typeUrl;
  },
  isAmino(o: any): o is QueryAllDowntimeInfoResponseAmino {
    return o && o.$typeUrl === QueryAllDowntimeInfoResponse.typeUrl;
  },
  encode(message: QueryAllDowntimeInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.info !== undefined) {
      AllDowntimeInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllDowntimeInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDowntimeInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.info = AllDowntimeInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllDowntimeInfoResponse>): QueryAllDowntimeInfoResponse {
    const message = createBaseQueryAllDowntimeInfoResponse();
    message.info = object.info !== undefined && object.info !== null ? AllDowntimeInfo.fromPartial(object.info) : undefined;
    return message;
  },
  fromAmino(object: QueryAllDowntimeInfoResponseAmino): QueryAllDowntimeInfoResponse {
    const message = createBaseQueryAllDowntimeInfoResponse();
    if (object.info !== undefined && object.info !== null) {
      message.info = AllDowntimeInfo.fromAmino(object.info);
    }
    return message;
  },
  toAmino(message: QueryAllDowntimeInfoResponse): QueryAllDowntimeInfoResponseAmino {
    const obj: any = {};
    obj.info = message.info ? AllDowntimeInfo.toAmino(message.info) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllDowntimeInfoResponseAminoMsg): QueryAllDowntimeInfoResponse {
    return QueryAllDowntimeInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllDowntimeInfoResponseProtoMsg): QueryAllDowntimeInfoResponse {
    return QueryAllDowntimeInfoResponse.decode(message.value);
  },
  toProto(message: QueryAllDowntimeInfoResponse): Uint8Array {
    return QueryAllDowntimeInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllDowntimeInfoResponse): QueryAllDowntimeInfoResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoResponse",
      value: QueryAllDowntimeInfoResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAllDowntimeInfoResponse.typeUrl, QueryAllDowntimeInfoResponse);