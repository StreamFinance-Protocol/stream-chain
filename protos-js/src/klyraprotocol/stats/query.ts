//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { StatsMetadata, StatsMetadataAmino, StatsMetadataSDKType, GlobalStats, GlobalStatsAmino, GlobalStatsSDKType, UserStats, UserStatsAmino, UserStatsSDKType } from "./stats";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** QueryParamsRequest is a request type for the Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/klyraprotocol.stats.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is a request type for the Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/klyraprotocol.stats.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is a request type for the Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is a response type for the Params RPC method. */
export interface QueryParamsResponse {
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/klyraprotocol.stats.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is a response type for the Params RPC method. */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/klyraprotocol.stats.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is a response type for the Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/** QueryStatsMetadataRequest is a request type for the StatsMetadata RPC method. */
export interface QueryStatsMetadataRequest {}
export interface QueryStatsMetadataRequestProtoMsg {
  typeUrl: "/klyraprotocol.stats.QueryStatsMetadataRequest";
  value: Uint8Array;
}
/** QueryStatsMetadataRequest is a request type for the StatsMetadata RPC method. */
export interface QueryStatsMetadataRequestAmino {}
export interface QueryStatsMetadataRequestAminoMsg {
  type: "/klyraprotocol.stats.QueryStatsMetadataRequest";
  value: QueryStatsMetadataRequestAmino;
}
/** QueryStatsMetadataRequest is a request type for the StatsMetadata RPC method. */
export interface QueryStatsMetadataRequestSDKType {}
/**
 * QueryStatsMetadataResponse is a response type for the StatsMetadata RPC
 * method.
 */
export interface QueryStatsMetadataResponse {
  metadata?: StatsMetadata;
}
export interface QueryStatsMetadataResponseProtoMsg {
  typeUrl: "/klyraprotocol.stats.QueryStatsMetadataResponse";
  value: Uint8Array;
}
/**
 * QueryStatsMetadataResponse is a response type for the StatsMetadata RPC
 * method.
 */
export interface QueryStatsMetadataResponseAmino {
  metadata?: StatsMetadataAmino;
}
export interface QueryStatsMetadataResponseAminoMsg {
  type: "/klyraprotocol.stats.QueryStatsMetadataResponse";
  value: QueryStatsMetadataResponseAmino;
}
/**
 * QueryStatsMetadataResponse is a response type for the StatsMetadata RPC
 * method.
 */
export interface QueryStatsMetadataResponseSDKType {
  metadata?: StatsMetadataSDKType;
}
/** QueryGlobalStatsRequest is a request type for the GlobalStats RPC method. */
export interface QueryGlobalStatsRequest {}
export interface QueryGlobalStatsRequestProtoMsg {
  typeUrl: "/klyraprotocol.stats.QueryGlobalStatsRequest";
  value: Uint8Array;
}
/** QueryGlobalStatsRequest is a request type for the GlobalStats RPC method. */
export interface QueryGlobalStatsRequestAmino {}
export interface QueryGlobalStatsRequestAminoMsg {
  type: "/klyraprotocol.stats.QueryGlobalStatsRequest";
  value: QueryGlobalStatsRequestAmino;
}
/** QueryGlobalStatsRequest is a request type for the GlobalStats RPC method. */
export interface QueryGlobalStatsRequestSDKType {}
/** QueryGlobalStatsResponse is a response type for the GlobalStats RPC method. */
export interface QueryGlobalStatsResponse {
  stats?: GlobalStats;
}
export interface QueryGlobalStatsResponseProtoMsg {
  typeUrl: "/klyraprotocol.stats.QueryGlobalStatsResponse";
  value: Uint8Array;
}
/** QueryGlobalStatsResponse is a response type for the GlobalStats RPC method. */
export interface QueryGlobalStatsResponseAmino {
  stats?: GlobalStatsAmino;
}
export interface QueryGlobalStatsResponseAminoMsg {
  type: "/klyraprotocol.stats.QueryGlobalStatsResponse";
  value: QueryGlobalStatsResponseAmino;
}
/** QueryGlobalStatsResponse is a response type for the GlobalStats RPC method. */
export interface QueryGlobalStatsResponseSDKType {
  stats?: GlobalStatsSDKType;
}
/** QueryUserStatsRequest is a request type for the UserStats RPC method. */
export interface QueryUserStatsRequest {
  user: string;
}
export interface QueryUserStatsRequestProtoMsg {
  typeUrl: "/klyraprotocol.stats.QueryUserStatsRequest";
  value: Uint8Array;
}
/** QueryUserStatsRequest is a request type for the UserStats RPC method. */
export interface QueryUserStatsRequestAmino {
  user?: string;
}
export interface QueryUserStatsRequestAminoMsg {
  type: "/klyraprotocol.stats.QueryUserStatsRequest";
  value: QueryUserStatsRequestAmino;
}
/** QueryUserStatsRequest is a request type for the UserStats RPC method. */
export interface QueryUserStatsRequestSDKType {
  user: string;
}
/** QueryUserStatsResponse is a request type for the UserStats RPC method. */
export interface QueryUserStatsResponse {
  stats?: UserStats;
}
export interface QueryUserStatsResponseProtoMsg {
  typeUrl: "/klyraprotocol.stats.QueryUserStatsResponse";
  value: Uint8Array;
}
/** QueryUserStatsResponse is a request type for the UserStats RPC method. */
export interface QueryUserStatsResponseAmino {
  stats?: UserStatsAmino;
}
export interface QueryUserStatsResponseAminoMsg {
  type: "/klyraprotocol.stats.QueryUserStatsResponse";
  value: QueryUserStatsResponseAmino;
}
/** QueryUserStatsResponse is a request type for the UserStats RPC method. */
export interface QueryUserStatsResponseSDKType {
  stats?: UserStatsSDKType;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/klyraprotocol.stats.QueryParamsRequest",
  is(o: any): o is QueryParamsRequest {
    return o && o.$typeUrl === QueryParamsRequest.typeUrl;
  },
  isSDK(o: any): o is QueryParamsRequestSDKType {
    return o && o.$typeUrl === QueryParamsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryParamsRequestAmino {
    return o && o.$typeUrl === QueryParamsRequest.typeUrl;
  },
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.stats.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryParamsRequest.typeUrl, QueryParamsRequest);
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/klyraprotocol.stats.QueryParamsResponse",
  is(o: any): o is QueryParamsResponse {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.is(o.params));
  },
  isSDK(o: any): o is QueryParamsResponseSDKType {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isSDK(o.params));
  },
  isAmino(o: any): o is QueryParamsResponseAmino {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isAmino(o.params));
  },
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.stats.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryParamsResponse.typeUrl, QueryParamsResponse);
function createBaseQueryStatsMetadataRequest(): QueryStatsMetadataRequest {
  return {};
}
export const QueryStatsMetadataRequest = {
  typeUrl: "/klyraprotocol.stats.QueryStatsMetadataRequest",
  is(o: any): o is QueryStatsMetadataRequest {
    return o && o.$typeUrl === QueryStatsMetadataRequest.typeUrl;
  },
  isSDK(o: any): o is QueryStatsMetadataRequestSDKType {
    return o && o.$typeUrl === QueryStatsMetadataRequest.typeUrl;
  },
  isAmino(o: any): o is QueryStatsMetadataRequestAmino {
    return o && o.$typeUrl === QueryStatsMetadataRequest.typeUrl;
  },
  encode(_: QueryStatsMetadataRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryStatsMetadataRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStatsMetadataRequest();
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
  fromPartial(_: Partial<QueryStatsMetadataRequest>): QueryStatsMetadataRequest {
    const message = createBaseQueryStatsMetadataRequest();
    return message;
  },
  fromAmino(_: QueryStatsMetadataRequestAmino): QueryStatsMetadataRequest {
    const message = createBaseQueryStatsMetadataRequest();
    return message;
  },
  toAmino(_: QueryStatsMetadataRequest): QueryStatsMetadataRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryStatsMetadataRequestAminoMsg): QueryStatsMetadataRequest {
    return QueryStatsMetadataRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStatsMetadataRequestProtoMsg): QueryStatsMetadataRequest {
    return QueryStatsMetadataRequest.decode(message.value);
  },
  toProto(message: QueryStatsMetadataRequest): Uint8Array {
    return QueryStatsMetadataRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryStatsMetadataRequest): QueryStatsMetadataRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.stats.QueryStatsMetadataRequest",
      value: QueryStatsMetadataRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryStatsMetadataRequest.typeUrl, QueryStatsMetadataRequest);
function createBaseQueryStatsMetadataResponse(): QueryStatsMetadataResponse {
  return {
    metadata: undefined
  };
}
export const QueryStatsMetadataResponse = {
  typeUrl: "/klyraprotocol.stats.QueryStatsMetadataResponse",
  is(o: any): o is QueryStatsMetadataResponse {
    return o && o.$typeUrl === QueryStatsMetadataResponse.typeUrl;
  },
  isSDK(o: any): o is QueryStatsMetadataResponseSDKType {
    return o && o.$typeUrl === QueryStatsMetadataResponse.typeUrl;
  },
  isAmino(o: any): o is QueryStatsMetadataResponseAmino {
    return o && o.$typeUrl === QueryStatsMetadataResponse.typeUrl;
  },
  encode(message: QueryStatsMetadataResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.metadata !== undefined) {
      StatsMetadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryStatsMetadataResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStatsMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = StatsMetadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryStatsMetadataResponse>): QueryStatsMetadataResponse {
    const message = createBaseQueryStatsMetadataResponse();
    message.metadata = object.metadata !== undefined && object.metadata !== null ? StatsMetadata.fromPartial(object.metadata) : undefined;
    return message;
  },
  fromAmino(object: QueryStatsMetadataResponseAmino): QueryStatsMetadataResponse {
    const message = createBaseQueryStatsMetadataResponse();
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = StatsMetadata.fromAmino(object.metadata);
    }
    return message;
  },
  toAmino(message: QueryStatsMetadataResponse): QueryStatsMetadataResponseAmino {
    const obj: any = {};
    obj.metadata = message.metadata ? StatsMetadata.toAmino(message.metadata) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryStatsMetadataResponseAminoMsg): QueryStatsMetadataResponse {
    return QueryStatsMetadataResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStatsMetadataResponseProtoMsg): QueryStatsMetadataResponse {
    return QueryStatsMetadataResponse.decode(message.value);
  },
  toProto(message: QueryStatsMetadataResponse): Uint8Array {
    return QueryStatsMetadataResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryStatsMetadataResponse): QueryStatsMetadataResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.stats.QueryStatsMetadataResponse",
      value: QueryStatsMetadataResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryStatsMetadataResponse.typeUrl, QueryStatsMetadataResponse);
function createBaseQueryGlobalStatsRequest(): QueryGlobalStatsRequest {
  return {};
}
export const QueryGlobalStatsRequest = {
  typeUrl: "/klyraprotocol.stats.QueryGlobalStatsRequest",
  is(o: any): o is QueryGlobalStatsRequest {
    return o && o.$typeUrl === QueryGlobalStatsRequest.typeUrl;
  },
  isSDK(o: any): o is QueryGlobalStatsRequestSDKType {
    return o && o.$typeUrl === QueryGlobalStatsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryGlobalStatsRequestAmino {
    return o && o.$typeUrl === QueryGlobalStatsRequest.typeUrl;
  },
  encode(_: QueryGlobalStatsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGlobalStatsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGlobalStatsRequest();
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
  fromPartial(_: Partial<QueryGlobalStatsRequest>): QueryGlobalStatsRequest {
    const message = createBaseQueryGlobalStatsRequest();
    return message;
  },
  fromAmino(_: QueryGlobalStatsRequestAmino): QueryGlobalStatsRequest {
    const message = createBaseQueryGlobalStatsRequest();
    return message;
  },
  toAmino(_: QueryGlobalStatsRequest): QueryGlobalStatsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGlobalStatsRequestAminoMsg): QueryGlobalStatsRequest {
    return QueryGlobalStatsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGlobalStatsRequestProtoMsg): QueryGlobalStatsRequest {
    return QueryGlobalStatsRequest.decode(message.value);
  },
  toProto(message: QueryGlobalStatsRequest): Uint8Array {
    return QueryGlobalStatsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGlobalStatsRequest): QueryGlobalStatsRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.stats.QueryGlobalStatsRequest",
      value: QueryGlobalStatsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryGlobalStatsRequest.typeUrl, QueryGlobalStatsRequest);
function createBaseQueryGlobalStatsResponse(): QueryGlobalStatsResponse {
  return {
    stats: undefined
  };
}
export const QueryGlobalStatsResponse = {
  typeUrl: "/klyraprotocol.stats.QueryGlobalStatsResponse",
  is(o: any): o is QueryGlobalStatsResponse {
    return o && o.$typeUrl === QueryGlobalStatsResponse.typeUrl;
  },
  isSDK(o: any): o is QueryGlobalStatsResponseSDKType {
    return o && o.$typeUrl === QueryGlobalStatsResponse.typeUrl;
  },
  isAmino(o: any): o is QueryGlobalStatsResponseAmino {
    return o && o.$typeUrl === QueryGlobalStatsResponse.typeUrl;
  },
  encode(message: QueryGlobalStatsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stats !== undefined) {
      GlobalStats.encode(message.stats, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGlobalStatsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGlobalStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stats = GlobalStats.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGlobalStatsResponse>): QueryGlobalStatsResponse {
    const message = createBaseQueryGlobalStatsResponse();
    message.stats = object.stats !== undefined && object.stats !== null ? GlobalStats.fromPartial(object.stats) : undefined;
    return message;
  },
  fromAmino(object: QueryGlobalStatsResponseAmino): QueryGlobalStatsResponse {
    const message = createBaseQueryGlobalStatsResponse();
    if (object.stats !== undefined && object.stats !== null) {
      message.stats = GlobalStats.fromAmino(object.stats);
    }
    return message;
  },
  toAmino(message: QueryGlobalStatsResponse): QueryGlobalStatsResponseAmino {
    const obj: any = {};
    obj.stats = message.stats ? GlobalStats.toAmino(message.stats) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGlobalStatsResponseAminoMsg): QueryGlobalStatsResponse {
    return QueryGlobalStatsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGlobalStatsResponseProtoMsg): QueryGlobalStatsResponse {
    return QueryGlobalStatsResponse.decode(message.value);
  },
  toProto(message: QueryGlobalStatsResponse): Uint8Array {
    return QueryGlobalStatsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGlobalStatsResponse): QueryGlobalStatsResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.stats.QueryGlobalStatsResponse",
      value: QueryGlobalStatsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryGlobalStatsResponse.typeUrl, QueryGlobalStatsResponse);
function createBaseQueryUserStatsRequest(): QueryUserStatsRequest {
  return {
    user: ""
  };
}
export const QueryUserStatsRequest = {
  typeUrl: "/klyraprotocol.stats.QueryUserStatsRequest",
  is(o: any): o is QueryUserStatsRequest {
    return o && (o.$typeUrl === QueryUserStatsRequest.typeUrl || typeof o.user === "string");
  },
  isSDK(o: any): o is QueryUserStatsRequestSDKType {
    return o && (o.$typeUrl === QueryUserStatsRequest.typeUrl || typeof o.user === "string");
  },
  isAmino(o: any): o is QueryUserStatsRequestAmino {
    return o && (o.$typeUrl === QueryUserStatsRequest.typeUrl || typeof o.user === "string");
  },
  encode(message: QueryUserStatsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUserStatsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUserStatsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUserStatsRequest>): QueryUserStatsRequest {
    const message = createBaseQueryUserStatsRequest();
    message.user = object.user ?? "";
    return message;
  },
  fromAmino(object: QueryUserStatsRequestAmino): QueryUserStatsRequest {
    const message = createBaseQueryUserStatsRequest();
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    }
    return message;
  },
  toAmino(message: QueryUserStatsRequest): QueryUserStatsRequestAmino {
    const obj: any = {};
    obj.user = message.user === "" ? undefined : message.user;
    return obj;
  },
  fromAminoMsg(object: QueryUserStatsRequestAminoMsg): QueryUserStatsRequest {
    return QueryUserStatsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUserStatsRequestProtoMsg): QueryUserStatsRequest {
    return QueryUserStatsRequest.decode(message.value);
  },
  toProto(message: QueryUserStatsRequest): Uint8Array {
    return QueryUserStatsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUserStatsRequest): QueryUserStatsRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.stats.QueryUserStatsRequest",
      value: QueryUserStatsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryUserStatsRequest.typeUrl, QueryUserStatsRequest);
function createBaseQueryUserStatsResponse(): QueryUserStatsResponse {
  return {
    stats: undefined
  };
}
export const QueryUserStatsResponse = {
  typeUrl: "/klyraprotocol.stats.QueryUserStatsResponse",
  is(o: any): o is QueryUserStatsResponse {
    return o && o.$typeUrl === QueryUserStatsResponse.typeUrl;
  },
  isSDK(o: any): o is QueryUserStatsResponseSDKType {
    return o && o.$typeUrl === QueryUserStatsResponse.typeUrl;
  },
  isAmino(o: any): o is QueryUserStatsResponseAmino {
    return o && o.$typeUrl === QueryUserStatsResponse.typeUrl;
  },
  encode(message: QueryUserStatsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stats !== undefined) {
      UserStats.encode(message.stats, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUserStatsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUserStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stats = UserStats.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUserStatsResponse>): QueryUserStatsResponse {
    const message = createBaseQueryUserStatsResponse();
    message.stats = object.stats !== undefined && object.stats !== null ? UserStats.fromPartial(object.stats) : undefined;
    return message;
  },
  fromAmino(object: QueryUserStatsResponseAmino): QueryUserStatsResponse {
    const message = createBaseQueryUserStatsResponse();
    if (object.stats !== undefined && object.stats !== null) {
      message.stats = UserStats.fromAmino(object.stats);
    }
    return message;
  },
  toAmino(message: QueryUserStatsResponse): QueryUserStatsResponseAmino {
    const obj: any = {};
    obj.stats = message.stats ? UserStats.toAmino(message.stats) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryUserStatsResponseAminoMsg): QueryUserStatsResponse {
    return QueryUserStatsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUserStatsResponseProtoMsg): QueryUserStatsResponse {
    return QueryUserStatsResponse.decode(message.value);
  },
  toProto(message: QueryUserStatsResponse): Uint8Array {
    return QueryUserStatsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUserStatsResponse): QueryUserStatsResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.stats.QueryUserStatsResponse",
      value: QueryUserStatsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryUserStatsResponse.typeUrl, QueryUserStatsResponse);