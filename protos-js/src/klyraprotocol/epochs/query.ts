//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { EpochInfo, EpochInfoAmino, EpochInfoSDKType } from "./epoch_info";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** QueryGetEpochInfoRequest is request type for the GetEpochInfo RPC method. */
export interface QueryGetEpochInfoRequest {
  name: string;
}
export interface QueryGetEpochInfoRequestProtoMsg {
  typeUrl: "/klyraprotocol.epochs.QueryGetEpochInfoRequest";
  value: Uint8Array;
}
/** QueryGetEpochInfoRequest is request type for the GetEpochInfo RPC method. */
export interface QueryGetEpochInfoRequestAmino {
  name?: string;
}
export interface QueryGetEpochInfoRequestAminoMsg {
  type: "/klyraprotocol.epochs.QueryGetEpochInfoRequest";
  value: QueryGetEpochInfoRequestAmino;
}
/** QueryGetEpochInfoRequest is request type for the GetEpochInfo RPC method. */
export interface QueryGetEpochInfoRequestSDKType {
  name: string;
}
/** QueryEpochInfoResponse is response type for the GetEpochInfo RPC method. */
export interface QueryEpochInfoResponse {
  epochInfo: EpochInfo;
}
export interface QueryEpochInfoResponseProtoMsg {
  typeUrl: "/klyraprotocol.epochs.QueryEpochInfoResponse";
  value: Uint8Array;
}
/** QueryEpochInfoResponse is response type for the GetEpochInfo RPC method. */
export interface QueryEpochInfoResponseAmino {
  epoch_info?: EpochInfoAmino;
}
export interface QueryEpochInfoResponseAminoMsg {
  type: "/klyraprotocol.epochs.QueryEpochInfoResponse";
  value: QueryEpochInfoResponseAmino;
}
/** QueryEpochInfoResponse is response type for the GetEpochInfo RPC method. */
export interface QueryEpochInfoResponseSDKType {
  epoch_info: EpochInfoSDKType;
}
/** QueryAllEpochInfoRequest is request type for the AllEpochInfo RPC method. */
export interface QueryAllEpochInfoRequest {
  pagination?: PageRequest;
}
export interface QueryAllEpochInfoRequestProtoMsg {
  typeUrl: "/klyraprotocol.epochs.QueryAllEpochInfoRequest";
  value: Uint8Array;
}
/** QueryAllEpochInfoRequest is request type for the AllEpochInfo RPC method. */
export interface QueryAllEpochInfoRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryAllEpochInfoRequestAminoMsg {
  type: "/klyraprotocol.epochs.QueryAllEpochInfoRequest";
  value: QueryAllEpochInfoRequestAmino;
}
/** QueryAllEpochInfoRequest is request type for the AllEpochInfo RPC method. */
export interface QueryAllEpochInfoRequestSDKType {
  pagination?: PageRequestSDKType;
}
/** QueryEpochInfoAllResponse is response type for the AllEpochInfo RPC method. */
export interface QueryEpochInfoAllResponse {
  epochInfo: EpochInfo[];
  pagination?: PageResponse;
}
export interface QueryEpochInfoAllResponseProtoMsg {
  typeUrl: "/klyraprotocol.epochs.QueryEpochInfoAllResponse";
  value: Uint8Array;
}
/** QueryEpochInfoAllResponse is response type for the AllEpochInfo RPC method. */
export interface QueryEpochInfoAllResponseAmino {
  epoch_info?: EpochInfoAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryEpochInfoAllResponseAminoMsg {
  type: "/klyraprotocol.epochs.QueryEpochInfoAllResponse";
  value: QueryEpochInfoAllResponseAmino;
}
/** QueryEpochInfoAllResponse is response type for the AllEpochInfo RPC method. */
export interface QueryEpochInfoAllResponseSDKType {
  epoch_info: EpochInfoSDKType[];
  pagination?: PageResponseSDKType;
}
function createBaseQueryGetEpochInfoRequest(): QueryGetEpochInfoRequest {
  return {
    name: ""
  };
}
export const QueryGetEpochInfoRequest = {
  typeUrl: "/klyraprotocol.epochs.QueryGetEpochInfoRequest",
  is(o: any): o is QueryGetEpochInfoRequest {
    return o && (o.$typeUrl === QueryGetEpochInfoRequest.typeUrl || typeof o.name === "string");
  },
  isSDK(o: any): o is QueryGetEpochInfoRequestSDKType {
    return o && (o.$typeUrl === QueryGetEpochInfoRequest.typeUrl || typeof o.name === "string");
  },
  isAmino(o: any): o is QueryGetEpochInfoRequestAmino {
    return o && (o.$typeUrl === QueryGetEpochInfoRequest.typeUrl || typeof o.name === "string");
  },
  encode(message: QueryGetEpochInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetEpochInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetEpochInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetEpochInfoRequest>): QueryGetEpochInfoRequest {
    const message = createBaseQueryGetEpochInfoRequest();
    message.name = object.name ?? "";
    return message;
  },
  fromAmino(object: QueryGetEpochInfoRequestAmino): QueryGetEpochInfoRequest {
    const message = createBaseQueryGetEpochInfoRequest();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    return message;
  },
  toAmino(message: QueryGetEpochInfoRequest): QueryGetEpochInfoRequestAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    return obj;
  },
  fromAminoMsg(object: QueryGetEpochInfoRequestAminoMsg): QueryGetEpochInfoRequest {
    return QueryGetEpochInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetEpochInfoRequestProtoMsg): QueryGetEpochInfoRequest {
    return QueryGetEpochInfoRequest.decode(message.value);
  },
  toProto(message: QueryGetEpochInfoRequest): Uint8Array {
    return QueryGetEpochInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetEpochInfoRequest): QueryGetEpochInfoRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.epochs.QueryGetEpochInfoRequest",
      value: QueryGetEpochInfoRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryGetEpochInfoRequest.typeUrl, QueryGetEpochInfoRequest);
function createBaseQueryEpochInfoResponse(): QueryEpochInfoResponse {
  return {
    epochInfo: EpochInfo.fromPartial({})
  };
}
export const QueryEpochInfoResponse = {
  typeUrl: "/klyraprotocol.epochs.QueryEpochInfoResponse",
  is(o: any): o is QueryEpochInfoResponse {
    return o && (o.$typeUrl === QueryEpochInfoResponse.typeUrl || EpochInfo.is(o.epochInfo));
  },
  isSDK(o: any): o is QueryEpochInfoResponseSDKType {
    return o && (o.$typeUrl === QueryEpochInfoResponse.typeUrl || EpochInfo.isSDK(o.epoch_info));
  },
  isAmino(o: any): o is QueryEpochInfoResponseAmino {
    return o && (o.$typeUrl === QueryEpochInfoResponse.typeUrl || EpochInfo.isAmino(o.epoch_info));
  },
  encode(message: QueryEpochInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.epochInfo !== undefined) {
      EpochInfo.encode(message.epochInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEpochInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEpochInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochInfo = EpochInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEpochInfoResponse>): QueryEpochInfoResponse {
    const message = createBaseQueryEpochInfoResponse();
    message.epochInfo = object.epochInfo !== undefined && object.epochInfo !== null ? EpochInfo.fromPartial(object.epochInfo) : undefined;
    return message;
  },
  fromAmino(object: QueryEpochInfoResponseAmino): QueryEpochInfoResponse {
    const message = createBaseQueryEpochInfoResponse();
    if (object.epoch_info !== undefined && object.epoch_info !== null) {
      message.epochInfo = EpochInfo.fromAmino(object.epoch_info);
    }
    return message;
  },
  toAmino(message: QueryEpochInfoResponse): QueryEpochInfoResponseAmino {
    const obj: any = {};
    obj.epoch_info = message.epochInfo ? EpochInfo.toAmino(message.epochInfo) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEpochInfoResponseAminoMsg): QueryEpochInfoResponse {
    return QueryEpochInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEpochInfoResponseProtoMsg): QueryEpochInfoResponse {
    return QueryEpochInfoResponse.decode(message.value);
  },
  toProto(message: QueryEpochInfoResponse): Uint8Array {
    return QueryEpochInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEpochInfoResponse): QueryEpochInfoResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.epochs.QueryEpochInfoResponse",
      value: QueryEpochInfoResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryEpochInfoResponse.typeUrl, QueryEpochInfoResponse);
function createBaseQueryAllEpochInfoRequest(): QueryAllEpochInfoRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllEpochInfoRequest = {
  typeUrl: "/klyraprotocol.epochs.QueryAllEpochInfoRequest",
  is(o: any): o is QueryAllEpochInfoRequest {
    return o && o.$typeUrl === QueryAllEpochInfoRequest.typeUrl;
  },
  isSDK(o: any): o is QueryAllEpochInfoRequestSDKType {
    return o && o.$typeUrl === QueryAllEpochInfoRequest.typeUrl;
  },
  isAmino(o: any): o is QueryAllEpochInfoRequestAmino {
    return o && o.$typeUrl === QueryAllEpochInfoRequest.typeUrl;
  },
  encode(message: QueryAllEpochInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllEpochInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllEpochInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllEpochInfoRequest>): QueryAllEpochInfoRequest {
    const message = createBaseQueryAllEpochInfoRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllEpochInfoRequestAmino): QueryAllEpochInfoRequest {
    const message = createBaseQueryAllEpochInfoRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllEpochInfoRequest): QueryAllEpochInfoRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllEpochInfoRequestAminoMsg): QueryAllEpochInfoRequest {
    return QueryAllEpochInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllEpochInfoRequestProtoMsg): QueryAllEpochInfoRequest {
    return QueryAllEpochInfoRequest.decode(message.value);
  },
  toProto(message: QueryAllEpochInfoRequest): Uint8Array {
    return QueryAllEpochInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllEpochInfoRequest): QueryAllEpochInfoRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.epochs.QueryAllEpochInfoRequest",
      value: QueryAllEpochInfoRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAllEpochInfoRequest.typeUrl, QueryAllEpochInfoRequest);
function createBaseQueryEpochInfoAllResponse(): QueryEpochInfoAllResponse {
  return {
    epochInfo: [],
    pagination: undefined
  };
}
export const QueryEpochInfoAllResponse = {
  typeUrl: "/klyraprotocol.epochs.QueryEpochInfoAllResponse",
  is(o: any): o is QueryEpochInfoAllResponse {
    return o && (o.$typeUrl === QueryEpochInfoAllResponse.typeUrl || Array.isArray(o.epochInfo) && (!o.epochInfo.length || EpochInfo.is(o.epochInfo[0])));
  },
  isSDK(o: any): o is QueryEpochInfoAllResponseSDKType {
    return o && (o.$typeUrl === QueryEpochInfoAllResponse.typeUrl || Array.isArray(o.epoch_info) && (!o.epoch_info.length || EpochInfo.isSDK(o.epoch_info[0])));
  },
  isAmino(o: any): o is QueryEpochInfoAllResponseAmino {
    return o && (o.$typeUrl === QueryEpochInfoAllResponse.typeUrl || Array.isArray(o.epoch_info) && (!o.epoch_info.length || EpochInfo.isAmino(o.epoch_info[0])));
  },
  encode(message: QueryEpochInfoAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.epochInfo) {
      EpochInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEpochInfoAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEpochInfoAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochInfo.push(EpochInfo.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEpochInfoAllResponse>): QueryEpochInfoAllResponse {
    const message = createBaseQueryEpochInfoAllResponse();
    message.epochInfo = object.epochInfo?.map(e => EpochInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryEpochInfoAllResponseAmino): QueryEpochInfoAllResponse {
    const message = createBaseQueryEpochInfoAllResponse();
    message.epochInfo = object.epoch_info?.map(e => EpochInfo.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryEpochInfoAllResponse): QueryEpochInfoAllResponseAmino {
    const obj: any = {};
    if (message.epochInfo) {
      obj.epoch_info = message.epochInfo.map(e => e ? EpochInfo.toAmino(e) : undefined);
    } else {
      obj.epoch_info = message.epochInfo;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEpochInfoAllResponseAminoMsg): QueryEpochInfoAllResponse {
    return QueryEpochInfoAllResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEpochInfoAllResponseProtoMsg): QueryEpochInfoAllResponse {
    return QueryEpochInfoAllResponse.decode(message.value);
  },
  toProto(message: QueryEpochInfoAllResponse): Uint8Array {
    return QueryEpochInfoAllResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEpochInfoAllResponse): QueryEpochInfoAllResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.epochs.QueryEpochInfoAllResponse",
      value: QueryEpochInfoAllResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryEpochInfoAllResponse.typeUrl, QueryEpochInfoAllResponse);