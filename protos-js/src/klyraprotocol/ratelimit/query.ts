//@ts-nocheck
import { LimitParams, LimitParamsAmino, LimitParamsSDKType } from "./limit_params";
import { LimiterCapacity, LimiterCapacityAmino, LimiterCapacitySDKType } from "./capacity";
import { PendingSendPacket, PendingSendPacketAmino, PendingSendPacketSDKType } from "./pending_send_packet";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** ListLimitParamsRequest is a request type of the ListLimitParams RPC method. */
export interface ListLimitParamsRequest {}
export interface ListLimitParamsRequestProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsRequest";
  value: Uint8Array;
}
/** ListLimitParamsRequest is a request type of the ListLimitParams RPC method. */
export interface ListLimitParamsRequestAmino {}
export interface ListLimitParamsRequestAminoMsg {
  type: "/klyraprotocol.ratelimit.ListLimitParamsRequest";
  value: ListLimitParamsRequestAmino;
}
/** ListLimitParamsRequest is a request type of the ListLimitParams RPC method. */
export interface ListLimitParamsRequestSDKType {}
/** ListLimitParamsResponse is a response type of the ListLimitParams RPC method. */
export interface ListLimitParamsResponse {
  limitParamsList: LimitParams[];
}
export interface ListLimitParamsResponseProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsResponse";
  value: Uint8Array;
}
/** ListLimitParamsResponse is a response type of the ListLimitParams RPC method. */
export interface ListLimitParamsResponseAmino {
  limit_params_list?: LimitParamsAmino[];
}
export interface ListLimitParamsResponseAminoMsg {
  type: "/klyraprotocol.ratelimit.ListLimitParamsResponse";
  value: ListLimitParamsResponseAmino;
}
/** ListLimitParamsResponse is a response type of the ListLimitParams RPC method. */
export interface ListLimitParamsResponseSDKType {
  limit_params_list: LimitParamsSDKType[];
}
/**
 * QueryCapacityByDenomRequest is a request type for the CapacityByDenom RPC
 * method.
 */
export interface QueryCapacityByDenomRequest {
  denom: string;
}
export interface QueryCapacityByDenomRequestProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomRequest";
  value: Uint8Array;
}
/**
 * QueryCapacityByDenomRequest is a request type for the CapacityByDenom RPC
 * method.
 */
export interface QueryCapacityByDenomRequestAmino {
  denom?: string;
}
export interface QueryCapacityByDenomRequestAminoMsg {
  type: "/klyraprotocol.ratelimit.QueryCapacityByDenomRequest";
  value: QueryCapacityByDenomRequestAmino;
}
/**
 * QueryCapacityByDenomRequest is a request type for the CapacityByDenom RPC
 * method.
 */
export interface QueryCapacityByDenomRequestSDKType {
  denom: string;
}
/**
 * QueryCapacityByDenomResponse is a response type of the CapacityByDenom RPC
 * method.
 */
export interface QueryCapacityByDenomResponse {
  limiterCapacityList: LimiterCapacity[];
}
export interface QueryCapacityByDenomResponseProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomResponse";
  value: Uint8Array;
}
/**
 * QueryCapacityByDenomResponse is a response type of the CapacityByDenom RPC
 * method.
 */
export interface QueryCapacityByDenomResponseAmino {
  limiter_capacity_list?: LimiterCapacityAmino[];
}
export interface QueryCapacityByDenomResponseAminoMsg {
  type: "/klyraprotocol.ratelimit.QueryCapacityByDenomResponse";
  value: QueryCapacityByDenomResponseAmino;
}
/**
 * QueryCapacityByDenomResponse is a response type of the CapacityByDenom RPC
 * method.
 */
export interface QueryCapacityByDenomResponseSDKType {
  limiter_capacity_list: LimiterCapacitySDKType[];
}
/**
 * QueryAllPendingSendPacketsRequest is a request type for the
 * AllPendingSendPackets RPC
 */
export interface QueryAllPendingSendPacketsRequest {}
export interface QueryAllPendingSendPacketsRequestProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsRequest";
  value: Uint8Array;
}
/**
 * QueryAllPendingSendPacketsRequest is a request type for the
 * AllPendingSendPackets RPC
 */
export interface QueryAllPendingSendPacketsRequestAmino {}
export interface QueryAllPendingSendPacketsRequestAminoMsg {
  type: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsRequest";
  value: QueryAllPendingSendPacketsRequestAmino;
}
/**
 * QueryAllPendingSendPacketsRequest is a request type for the
 * AllPendingSendPackets RPC
 */
export interface QueryAllPendingSendPacketsRequestSDKType {}
/**
 * QueryAllPendingSendPacketsResponse is a response type of the
 * AllPendingSendPackets RPC
 */
export interface QueryAllPendingSendPacketsResponse {
  pendingSendPackets: PendingSendPacket[];
}
export interface QueryAllPendingSendPacketsResponseProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsResponse";
  value: Uint8Array;
}
/**
 * QueryAllPendingSendPacketsResponse is a response type of the
 * AllPendingSendPackets RPC
 */
export interface QueryAllPendingSendPacketsResponseAmino {
  pending_send_packets?: PendingSendPacketAmino[];
}
export interface QueryAllPendingSendPacketsResponseAminoMsg {
  type: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsResponse";
  value: QueryAllPendingSendPacketsResponseAmino;
}
/**
 * QueryAllPendingSendPacketsResponse is a response type of the
 * AllPendingSendPackets RPC
 */
export interface QueryAllPendingSendPacketsResponseSDKType {
  pending_send_packets: PendingSendPacketSDKType[];
}
/** GetSDAIPriceRequest is a request type for the GetSDAIPrice RPC method. */
export interface GetSDAIPriceQueryRequest {}
export interface GetSDAIPriceQueryRequestProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryRequest";
  value: Uint8Array;
}
/** GetSDAIPriceRequest is a request type for the GetSDAIPrice RPC method. */
export interface GetSDAIPriceQueryRequestAmino {}
export interface GetSDAIPriceQueryRequestAminoMsg {
  type: "/klyraprotocol.ratelimit.GetSDAIPriceQueryRequest";
  value: GetSDAIPriceQueryRequestAmino;
}
/** GetSDAIPriceRequest is a request type for the GetSDAIPrice RPC method. */
export interface GetSDAIPriceQueryRequestSDKType {}
/** GetSDAIPriceResponse is a response type for the GetSDAIPrice RPC method. */
export interface GetSDAIPriceQueryResponse {
  /** Assuming price is returned as a string */
  price: string;
}
export interface GetSDAIPriceQueryResponseProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryResponse";
  value: Uint8Array;
}
/** GetSDAIPriceResponse is a response type for the GetSDAIPrice RPC method. */
export interface GetSDAIPriceQueryResponseAmino {
  /** Assuming price is returned as a string */
  price?: string;
}
export interface GetSDAIPriceQueryResponseAminoMsg {
  type: "/klyraprotocol.ratelimit.GetSDAIPriceQueryResponse";
  value: GetSDAIPriceQueryResponseAmino;
}
/** GetSDAIPriceResponse is a response type for the GetSDAIPrice RPC method. */
export interface GetSDAIPriceQueryResponseSDKType {
  price: string;
}
/**
 * GetAssetYieldIndexRequest is a request type for the GetAssetYieldIndex RPC
 * method.
 */
export interface GetAssetYieldIndexQueryRequest {}
export interface GetAssetYieldIndexQueryRequestProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryRequest";
  value: Uint8Array;
}
/**
 * GetAssetYieldIndexRequest is a request type for the GetAssetYieldIndex RPC
 * method.
 */
export interface GetAssetYieldIndexQueryRequestAmino {}
export interface GetAssetYieldIndexQueryRequestAminoMsg {
  type: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryRequest";
  value: GetAssetYieldIndexQueryRequestAmino;
}
/**
 * GetAssetYieldIndexRequest is a request type for the GetAssetYieldIndex RPC
 * method.
 */
export interface GetAssetYieldIndexQueryRequestSDKType {}
/**
 * GetSDAIPriceQueryResponse is a response type for the GetAssetYieldIndex RPC
 * method.
 */
export interface GetAssetYieldIndexQueryResponse {
  /** Handled as a string, should be converted to big.Rat. */
  assetYieldIndex: string;
}
export interface GetAssetYieldIndexQueryResponseProtoMsg {
  typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryResponse";
  value: Uint8Array;
}
/**
 * GetSDAIPriceQueryResponse is a response type for the GetAssetYieldIndex RPC
 * method.
 */
export interface GetAssetYieldIndexQueryResponseAmino {
  /** Handled as a string, should be converted to big.Rat. */
  asset_yield_index?: string;
}
export interface GetAssetYieldIndexQueryResponseAminoMsg {
  type: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryResponse";
  value: GetAssetYieldIndexQueryResponseAmino;
}
/**
 * GetSDAIPriceQueryResponse is a response type for the GetAssetYieldIndex RPC
 * method.
 */
export interface GetAssetYieldIndexQueryResponseSDKType {
  asset_yield_index: string;
}
function createBaseListLimitParamsRequest(): ListLimitParamsRequest {
  return {};
}
export const ListLimitParamsRequest = {
  typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsRequest",
  is(o: any): o is ListLimitParamsRequest {
    return o && o.$typeUrl === ListLimitParamsRequest.typeUrl;
  },
  isSDK(o: any): o is ListLimitParamsRequestSDKType {
    return o && o.$typeUrl === ListLimitParamsRequest.typeUrl;
  },
  isAmino(o: any): o is ListLimitParamsRequestAmino {
    return o && o.$typeUrl === ListLimitParamsRequest.typeUrl;
  },
  encode(_: ListLimitParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ListLimitParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListLimitParamsRequest();
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
  fromPartial(_: Partial<ListLimitParamsRequest>): ListLimitParamsRequest {
    const message = createBaseListLimitParamsRequest();
    return message;
  },
  fromAmino(_: ListLimitParamsRequestAmino): ListLimitParamsRequest {
    const message = createBaseListLimitParamsRequest();
    return message;
  },
  toAmino(_: ListLimitParamsRequest): ListLimitParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: ListLimitParamsRequestAminoMsg): ListLimitParamsRequest {
    return ListLimitParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: ListLimitParamsRequestProtoMsg): ListLimitParamsRequest {
    return ListLimitParamsRequest.decode(message.value);
  },
  toProto(message: ListLimitParamsRequest): Uint8Array {
    return ListLimitParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: ListLimitParamsRequest): ListLimitParamsRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsRequest",
      value: ListLimitParamsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(ListLimitParamsRequest.typeUrl, ListLimitParamsRequest);
function createBaseListLimitParamsResponse(): ListLimitParamsResponse {
  return {
    limitParamsList: []
  };
}
export const ListLimitParamsResponse = {
  typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsResponse",
  is(o: any): o is ListLimitParamsResponse {
    return o && (o.$typeUrl === ListLimitParamsResponse.typeUrl || Array.isArray(o.limitParamsList) && (!o.limitParamsList.length || LimitParams.is(o.limitParamsList[0])));
  },
  isSDK(o: any): o is ListLimitParamsResponseSDKType {
    return o && (o.$typeUrl === ListLimitParamsResponse.typeUrl || Array.isArray(o.limit_params_list) && (!o.limit_params_list.length || LimitParams.isSDK(o.limit_params_list[0])));
  },
  isAmino(o: any): o is ListLimitParamsResponseAmino {
    return o && (o.$typeUrl === ListLimitParamsResponse.typeUrl || Array.isArray(o.limit_params_list) && (!o.limit_params_list.length || LimitParams.isAmino(o.limit_params_list[0])));
  },
  encode(message: ListLimitParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.limitParamsList) {
      LimitParams.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ListLimitParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListLimitParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limitParamsList.push(LimitParams.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ListLimitParamsResponse>): ListLimitParamsResponse {
    const message = createBaseListLimitParamsResponse();
    message.limitParamsList = object.limitParamsList?.map(e => LimitParams.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ListLimitParamsResponseAmino): ListLimitParamsResponse {
    const message = createBaseListLimitParamsResponse();
    message.limitParamsList = object.limit_params_list?.map(e => LimitParams.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ListLimitParamsResponse): ListLimitParamsResponseAmino {
    const obj: any = {};
    if (message.limitParamsList) {
      obj.limit_params_list = message.limitParamsList.map(e => e ? LimitParams.toAmino(e) : undefined);
    } else {
      obj.limit_params_list = message.limitParamsList;
    }
    return obj;
  },
  fromAminoMsg(object: ListLimitParamsResponseAminoMsg): ListLimitParamsResponse {
    return ListLimitParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: ListLimitParamsResponseProtoMsg): ListLimitParamsResponse {
    return ListLimitParamsResponse.decode(message.value);
  },
  toProto(message: ListLimitParamsResponse): Uint8Array {
    return ListLimitParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: ListLimitParamsResponse): ListLimitParamsResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsResponse",
      value: ListLimitParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(ListLimitParamsResponse.typeUrl, ListLimitParamsResponse);
function createBaseQueryCapacityByDenomRequest(): QueryCapacityByDenomRequest {
  return {
    denom: ""
  };
}
export const QueryCapacityByDenomRequest = {
  typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomRequest",
  is(o: any): o is QueryCapacityByDenomRequest {
    return o && (o.$typeUrl === QueryCapacityByDenomRequest.typeUrl || typeof o.denom === "string");
  },
  isSDK(o: any): o is QueryCapacityByDenomRequestSDKType {
    return o && (o.$typeUrl === QueryCapacityByDenomRequest.typeUrl || typeof o.denom === "string");
  },
  isAmino(o: any): o is QueryCapacityByDenomRequestAmino {
    return o && (o.$typeUrl === QueryCapacityByDenomRequest.typeUrl || typeof o.denom === "string");
  },
  encode(message: QueryCapacityByDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCapacityByDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCapacityByDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCapacityByDenomRequest>): QueryCapacityByDenomRequest {
    const message = createBaseQueryCapacityByDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryCapacityByDenomRequestAmino): QueryCapacityByDenomRequest {
    const message = createBaseQueryCapacityByDenomRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryCapacityByDenomRequest): QueryCapacityByDenomRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryCapacityByDenomRequestAminoMsg): QueryCapacityByDenomRequest {
    return QueryCapacityByDenomRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCapacityByDenomRequestProtoMsg): QueryCapacityByDenomRequest {
    return QueryCapacityByDenomRequest.decode(message.value);
  },
  toProto(message: QueryCapacityByDenomRequest): Uint8Array {
    return QueryCapacityByDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCapacityByDenomRequest): QueryCapacityByDenomRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomRequest",
      value: QueryCapacityByDenomRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCapacityByDenomRequest.typeUrl, QueryCapacityByDenomRequest);
function createBaseQueryCapacityByDenomResponse(): QueryCapacityByDenomResponse {
  return {
    limiterCapacityList: []
  };
}
export const QueryCapacityByDenomResponse = {
  typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomResponse",
  is(o: any): o is QueryCapacityByDenomResponse {
    return o && (o.$typeUrl === QueryCapacityByDenomResponse.typeUrl || Array.isArray(o.limiterCapacityList) && (!o.limiterCapacityList.length || LimiterCapacity.is(o.limiterCapacityList[0])));
  },
  isSDK(o: any): o is QueryCapacityByDenomResponseSDKType {
    return o && (o.$typeUrl === QueryCapacityByDenomResponse.typeUrl || Array.isArray(o.limiter_capacity_list) && (!o.limiter_capacity_list.length || LimiterCapacity.isSDK(o.limiter_capacity_list[0])));
  },
  isAmino(o: any): o is QueryCapacityByDenomResponseAmino {
    return o && (o.$typeUrl === QueryCapacityByDenomResponse.typeUrl || Array.isArray(o.limiter_capacity_list) && (!o.limiter_capacity_list.length || LimiterCapacity.isAmino(o.limiter_capacity_list[0])));
  },
  encode(message: QueryCapacityByDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.limiterCapacityList) {
      LimiterCapacity.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCapacityByDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCapacityByDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limiterCapacityList.push(LimiterCapacity.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCapacityByDenomResponse>): QueryCapacityByDenomResponse {
    const message = createBaseQueryCapacityByDenomResponse();
    message.limiterCapacityList = object.limiterCapacityList?.map(e => LimiterCapacity.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryCapacityByDenomResponseAmino): QueryCapacityByDenomResponse {
    const message = createBaseQueryCapacityByDenomResponse();
    message.limiterCapacityList = object.limiter_capacity_list?.map(e => LimiterCapacity.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryCapacityByDenomResponse): QueryCapacityByDenomResponseAmino {
    const obj: any = {};
    if (message.limiterCapacityList) {
      obj.limiter_capacity_list = message.limiterCapacityList.map(e => e ? LimiterCapacity.toAmino(e) : undefined);
    } else {
      obj.limiter_capacity_list = message.limiterCapacityList;
    }
    return obj;
  },
  fromAminoMsg(object: QueryCapacityByDenomResponseAminoMsg): QueryCapacityByDenomResponse {
    return QueryCapacityByDenomResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCapacityByDenomResponseProtoMsg): QueryCapacityByDenomResponse {
    return QueryCapacityByDenomResponse.decode(message.value);
  },
  toProto(message: QueryCapacityByDenomResponse): Uint8Array {
    return QueryCapacityByDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCapacityByDenomResponse): QueryCapacityByDenomResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomResponse",
      value: QueryCapacityByDenomResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCapacityByDenomResponse.typeUrl, QueryCapacityByDenomResponse);
function createBaseQueryAllPendingSendPacketsRequest(): QueryAllPendingSendPacketsRequest {
  return {};
}
export const QueryAllPendingSendPacketsRequest = {
  typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsRequest",
  is(o: any): o is QueryAllPendingSendPacketsRequest {
    return o && o.$typeUrl === QueryAllPendingSendPacketsRequest.typeUrl;
  },
  isSDK(o: any): o is QueryAllPendingSendPacketsRequestSDKType {
    return o && o.$typeUrl === QueryAllPendingSendPacketsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryAllPendingSendPacketsRequestAmino {
    return o && o.$typeUrl === QueryAllPendingSendPacketsRequest.typeUrl;
  },
  encode(_: QueryAllPendingSendPacketsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllPendingSendPacketsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPendingSendPacketsRequest();
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
  fromPartial(_: Partial<QueryAllPendingSendPacketsRequest>): QueryAllPendingSendPacketsRequest {
    const message = createBaseQueryAllPendingSendPacketsRequest();
    return message;
  },
  fromAmino(_: QueryAllPendingSendPacketsRequestAmino): QueryAllPendingSendPacketsRequest {
    const message = createBaseQueryAllPendingSendPacketsRequest();
    return message;
  },
  toAmino(_: QueryAllPendingSendPacketsRequest): QueryAllPendingSendPacketsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryAllPendingSendPacketsRequestAminoMsg): QueryAllPendingSendPacketsRequest {
    return QueryAllPendingSendPacketsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPendingSendPacketsRequestProtoMsg): QueryAllPendingSendPacketsRequest {
    return QueryAllPendingSendPacketsRequest.decode(message.value);
  },
  toProto(message: QueryAllPendingSendPacketsRequest): Uint8Array {
    return QueryAllPendingSendPacketsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPendingSendPacketsRequest): QueryAllPendingSendPacketsRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsRequest",
      value: QueryAllPendingSendPacketsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAllPendingSendPacketsRequest.typeUrl, QueryAllPendingSendPacketsRequest);
function createBaseQueryAllPendingSendPacketsResponse(): QueryAllPendingSendPacketsResponse {
  return {
    pendingSendPackets: []
  };
}
export const QueryAllPendingSendPacketsResponse = {
  typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsResponse",
  is(o: any): o is QueryAllPendingSendPacketsResponse {
    return o && (o.$typeUrl === QueryAllPendingSendPacketsResponse.typeUrl || Array.isArray(o.pendingSendPackets) && (!o.pendingSendPackets.length || PendingSendPacket.is(o.pendingSendPackets[0])));
  },
  isSDK(o: any): o is QueryAllPendingSendPacketsResponseSDKType {
    return o && (o.$typeUrl === QueryAllPendingSendPacketsResponse.typeUrl || Array.isArray(o.pending_send_packets) && (!o.pending_send_packets.length || PendingSendPacket.isSDK(o.pending_send_packets[0])));
  },
  isAmino(o: any): o is QueryAllPendingSendPacketsResponseAmino {
    return o && (o.$typeUrl === QueryAllPendingSendPacketsResponse.typeUrl || Array.isArray(o.pending_send_packets) && (!o.pending_send_packets.length || PendingSendPacket.isAmino(o.pending_send_packets[0])));
  },
  encode(message: QueryAllPendingSendPacketsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pendingSendPackets) {
      PendingSendPacket.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllPendingSendPacketsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPendingSendPacketsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pendingSendPackets.push(PendingSendPacket.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPendingSendPacketsResponse>): QueryAllPendingSendPacketsResponse {
    const message = createBaseQueryAllPendingSendPacketsResponse();
    message.pendingSendPackets = object.pendingSendPackets?.map(e => PendingSendPacket.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllPendingSendPacketsResponseAmino): QueryAllPendingSendPacketsResponse {
    const message = createBaseQueryAllPendingSendPacketsResponse();
    message.pendingSendPackets = object.pending_send_packets?.map(e => PendingSendPacket.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllPendingSendPacketsResponse): QueryAllPendingSendPacketsResponseAmino {
    const obj: any = {};
    if (message.pendingSendPackets) {
      obj.pending_send_packets = message.pendingSendPackets.map(e => e ? PendingSendPacket.toAmino(e) : undefined);
    } else {
      obj.pending_send_packets = message.pendingSendPackets;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllPendingSendPacketsResponseAminoMsg): QueryAllPendingSendPacketsResponse {
    return QueryAllPendingSendPacketsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPendingSendPacketsResponseProtoMsg): QueryAllPendingSendPacketsResponse {
    return QueryAllPendingSendPacketsResponse.decode(message.value);
  },
  toProto(message: QueryAllPendingSendPacketsResponse): Uint8Array {
    return QueryAllPendingSendPacketsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPendingSendPacketsResponse): QueryAllPendingSendPacketsResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsResponse",
      value: QueryAllPendingSendPacketsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAllPendingSendPacketsResponse.typeUrl, QueryAllPendingSendPacketsResponse);
function createBaseGetSDAIPriceQueryRequest(): GetSDAIPriceQueryRequest {
  return {};
}
export const GetSDAIPriceQueryRequest = {
  typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryRequest",
  is(o: any): o is GetSDAIPriceQueryRequest {
    return o && o.$typeUrl === GetSDAIPriceQueryRequest.typeUrl;
  },
  isSDK(o: any): o is GetSDAIPriceQueryRequestSDKType {
    return o && o.$typeUrl === GetSDAIPriceQueryRequest.typeUrl;
  },
  isAmino(o: any): o is GetSDAIPriceQueryRequestAmino {
    return o && o.$typeUrl === GetSDAIPriceQueryRequest.typeUrl;
  },
  encode(_: GetSDAIPriceQueryRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetSDAIPriceQueryRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSDAIPriceQueryRequest();
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
  fromPartial(_: Partial<GetSDAIPriceQueryRequest>): GetSDAIPriceQueryRequest {
    const message = createBaseGetSDAIPriceQueryRequest();
    return message;
  },
  fromAmino(_: GetSDAIPriceQueryRequestAmino): GetSDAIPriceQueryRequest {
    const message = createBaseGetSDAIPriceQueryRequest();
    return message;
  },
  toAmino(_: GetSDAIPriceQueryRequest): GetSDAIPriceQueryRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: GetSDAIPriceQueryRequestAminoMsg): GetSDAIPriceQueryRequest {
    return GetSDAIPriceQueryRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetSDAIPriceQueryRequestProtoMsg): GetSDAIPriceQueryRequest {
    return GetSDAIPriceQueryRequest.decode(message.value);
  },
  toProto(message: GetSDAIPriceQueryRequest): Uint8Array {
    return GetSDAIPriceQueryRequest.encode(message).finish();
  },
  toProtoMsg(message: GetSDAIPriceQueryRequest): GetSDAIPriceQueryRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryRequest",
      value: GetSDAIPriceQueryRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(GetSDAIPriceQueryRequest.typeUrl, GetSDAIPriceQueryRequest);
function createBaseGetSDAIPriceQueryResponse(): GetSDAIPriceQueryResponse {
  return {
    price: ""
  };
}
export const GetSDAIPriceQueryResponse = {
  typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryResponse",
  is(o: any): o is GetSDAIPriceQueryResponse {
    return o && (o.$typeUrl === GetSDAIPriceQueryResponse.typeUrl || typeof o.price === "string");
  },
  isSDK(o: any): o is GetSDAIPriceQueryResponseSDKType {
    return o && (o.$typeUrl === GetSDAIPriceQueryResponse.typeUrl || typeof o.price === "string");
  },
  isAmino(o: any): o is GetSDAIPriceQueryResponseAmino {
    return o && (o.$typeUrl === GetSDAIPriceQueryResponse.typeUrl || typeof o.price === "string");
  },
  encode(message: GetSDAIPriceQueryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.price !== "") {
      writer.uint32(10).string(message.price);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetSDAIPriceQueryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSDAIPriceQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetSDAIPriceQueryResponse>): GetSDAIPriceQueryResponse {
    const message = createBaseGetSDAIPriceQueryResponse();
    message.price = object.price ?? "";
    return message;
  },
  fromAmino(object: GetSDAIPriceQueryResponseAmino): GetSDAIPriceQueryResponse {
    const message = createBaseGetSDAIPriceQueryResponse();
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    return message;
  },
  toAmino(message: GetSDAIPriceQueryResponse): GetSDAIPriceQueryResponseAmino {
    const obj: any = {};
    obj.price = message.price === "" ? undefined : message.price;
    return obj;
  },
  fromAminoMsg(object: GetSDAIPriceQueryResponseAminoMsg): GetSDAIPriceQueryResponse {
    return GetSDAIPriceQueryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GetSDAIPriceQueryResponseProtoMsg): GetSDAIPriceQueryResponse {
    return GetSDAIPriceQueryResponse.decode(message.value);
  },
  toProto(message: GetSDAIPriceQueryResponse): Uint8Array {
    return GetSDAIPriceQueryResponse.encode(message).finish();
  },
  toProtoMsg(message: GetSDAIPriceQueryResponse): GetSDAIPriceQueryResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryResponse",
      value: GetSDAIPriceQueryResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(GetSDAIPriceQueryResponse.typeUrl, GetSDAIPriceQueryResponse);
function createBaseGetAssetYieldIndexQueryRequest(): GetAssetYieldIndexQueryRequest {
  return {};
}
export const GetAssetYieldIndexQueryRequest = {
  typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryRequest",
  is(o: any): o is GetAssetYieldIndexQueryRequest {
    return o && o.$typeUrl === GetAssetYieldIndexQueryRequest.typeUrl;
  },
  isSDK(o: any): o is GetAssetYieldIndexQueryRequestSDKType {
    return o && o.$typeUrl === GetAssetYieldIndexQueryRequest.typeUrl;
  },
  isAmino(o: any): o is GetAssetYieldIndexQueryRequestAmino {
    return o && o.$typeUrl === GetAssetYieldIndexQueryRequest.typeUrl;
  },
  encode(_: GetAssetYieldIndexQueryRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetAssetYieldIndexQueryRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAssetYieldIndexQueryRequest();
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
  fromPartial(_: Partial<GetAssetYieldIndexQueryRequest>): GetAssetYieldIndexQueryRequest {
    const message = createBaseGetAssetYieldIndexQueryRequest();
    return message;
  },
  fromAmino(_: GetAssetYieldIndexQueryRequestAmino): GetAssetYieldIndexQueryRequest {
    const message = createBaseGetAssetYieldIndexQueryRequest();
    return message;
  },
  toAmino(_: GetAssetYieldIndexQueryRequest): GetAssetYieldIndexQueryRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: GetAssetYieldIndexQueryRequestAminoMsg): GetAssetYieldIndexQueryRequest {
    return GetAssetYieldIndexQueryRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetAssetYieldIndexQueryRequestProtoMsg): GetAssetYieldIndexQueryRequest {
    return GetAssetYieldIndexQueryRequest.decode(message.value);
  },
  toProto(message: GetAssetYieldIndexQueryRequest): Uint8Array {
    return GetAssetYieldIndexQueryRequest.encode(message).finish();
  },
  toProtoMsg(message: GetAssetYieldIndexQueryRequest): GetAssetYieldIndexQueryRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryRequest",
      value: GetAssetYieldIndexQueryRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(GetAssetYieldIndexQueryRequest.typeUrl, GetAssetYieldIndexQueryRequest);
function createBaseGetAssetYieldIndexQueryResponse(): GetAssetYieldIndexQueryResponse {
  return {
    assetYieldIndex: ""
  };
}
export const GetAssetYieldIndexQueryResponse = {
  typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryResponse",
  is(o: any): o is GetAssetYieldIndexQueryResponse {
    return o && (o.$typeUrl === GetAssetYieldIndexQueryResponse.typeUrl || typeof o.assetYieldIndex === "string");
  },
  isSDK(o: any): o is GetAssetYieldIndexQueryResponseSDKType {
    return o && (o.$typeUrl === GetAssetYieldIndexQueryResponse.typeUrl || typeof o.asset_yield_index === "string");
  },
  isAmino(o: any): o is GetAssetYieldIndexQueryResponseAmino {
    return o && (o.$typeUrl === GetAssetYieldIndexQueryResponse.typeUrl || typeof o.asset_yield_index === "string");
  },
  encode(message: GetAssetYieldIndexQueryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetYieldIndex !== "") {
      writer.uint32(10).string(message.assetYieldIndex);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetAssetYieldIndexQueryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAssetYieldIndexQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetYieldIndex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetAssetYieldIndexQueryResponse>): GetAssetYieldIndexQueryResponse {
    const message = createBaseGetAssetYieldIndexQueryResponse();
    message.assetYieldIndex = object.assetYieldIndex ?? "";
    return message;
  },
  fromAmino(object: GetAssetYieldIndexQueryResponseAmino): GetAssetYieldIndexQueryResponse {
    const message = createBaseGetAssetYieldIndexQueryResponse();
    if (object.asset_yield_index !== undefined && object.asset_yield_index !== null) {
      message.assetYieldIndex = object.asset_yield_index;
    }
    return message;
  },
  toAmino(message: GetAssetYieldIndexQueryResponse): GetAssetYieldIndexQueryResponseAmino {
    const obj: any = {};
    obj.asset_yield_index = message.assetYieldIndex === "" ? undefined : message.assetYieldIndex;
    return obj;
  },
  fromAminoMsg(object: GetAssetYieldIndexQueryResponseAminoMsg): GetAssetYieldIndexQueryResponse {
    return GetAssetYieldIndexQueryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: GetAssetYieldIndexQueryResponseProtoMsg): GetAssetYieldIndexQueryResponse {
    return GetAssetYieldIndexQueryResponse.decode(message.value);
  },
  toProto(message: GetAssetYieldIndexQueryResponse): Uint8Array {
    return GetAssetYieldIndexQueryResponse.encode(message).finish();
  },
  toProtoMsg(message: GetAssetYieldIndexQueryResponse): GetAssetYieldIndexQueryResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryResponse",
      value: GetAssetYieldIndexQueryResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(GetAssetYieldIndexQueryResponse.typeUrl, GetAssetYieldIndexQueryResponse);