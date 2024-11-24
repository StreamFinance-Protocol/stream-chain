//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Perpetual, PerpetualAmino, PerpetualSDKType, LiquidityTier, LiquidityTierAmino, LiquidityTierSDKType, PremiumStore, PremiumStoreAmino, PremiumStoreSDKType } from "./perpetual";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/** Queries a Perpetual by id. */
export interface QueryPerpetualRequest {
  id: number;
}
export interface QueryPerpetualRequestProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualRequest";
  value: Uint8Array;
}
/** Queries a Perpetual by id. */
export interface QueryPerpetualRequestAmino {
  id?: number;
}
export interface QueryPerpetualRequestAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryPerpetualRequest";
  value: QueryPerpetualRequestAmino;
}
/** Queries a Perpetual by id. */
export interface QueryPerpetualRequestSDKType {
  id: number;
}
/** QueryPerpetualResponse is response type for the Perpetual RPC method. */
export interface QueryPerpetualResponse {
  perpetual: Perpetual;
}
export interface QueryPerpetualResponseProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualResponse";
  value: Uint8Array;
}
/** QueryPerpetualResponse is response type for the Perpetual RPC method. */
export interface QueryPerpetualResponseAmino {
  perpetual?: PerpetualAmino;
}
export interface QueryPerpetualResponseAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryPerpetualResponse";
  value: QueryPerpetualResponseAmino;
}
/** QueryPerpetualResponse is response type for the Perpetual RPC method. */
export interface QueryPerpetualResponseSDKType {
  perpetual: PerpetualSDKType;
}
/** Queries a list of Perpetual items. */
export interface QueryAllPerpetualsRequest {
  pagination?: PageRequest;
}
export interface QueryAllPerpetualsRequestProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsRequest";
  value: Uint8Array;
}
/** Queries a list of Perpetual items. */
export interface QueryAllPerpetualsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryAllPerpetualsRequestAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryAllPerpetualsRequest";
  value: QueryAllPerpetualsRequestAmino;
}
/** Queries a list of Perpetual items. */
export interface QueryAllPerpetualsRequestSDKType {
  pagination?: PageRequestSDKType;
}
/** QueryAllPerpetualsResponse is response type for the AllPerpetuals RPC method. */
export interface QueryAllPerpetualsResponse {
  perpetual: Perpetual[];
  pagination?: PageResponse;
}
export interface QueryAllPerpetualsResponseProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsResponse";
  value: Uint8Array;
}
/** QueryAllPerpetualsResponse is response type for the AllPerpetuals RPC method. */
export interface QueryAllPerpetualsResponseAmino {
  perpetual?: PerpetualAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryAllPerpetualsResponseAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryAllPerpetualsResponse";
  value: QueryAllPerpetualsResponseAmino;
}
/** QueryAllPerpetualsResponse is response type for the AllPerpetuals RPC method. */
export interface QueryAllPerpetualsResponseSDKType {
  perpetual: PerpetualSDKType[];
  pagination?: PageResponseSDKType;
}
/** Queries a list of LiquidityTier items. */
export interface QueryAllLiquidityTiersRequest {
  pagination?: PageRequest;
}
export interface QueryAllLiquidityTiersRequestProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersRequest";
  value: Uint8Array;
}
/** Queries a list of LiquidityTier items. */
export interface QueryAllLiquidityTiersRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryAllLiquidityTiersRequestAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersRequest";
  value: QueryAllLiquidityTiersRequestAmino;
}
/** Queries a list of LiquidityTier items. */
export interface QueryAllLiquidityTiersRequestSDKType {
  pagination?: PageRequestSDKType;
}
/**
 * QueryAllLiquidityTiersResponse is response type for the AllLiquidityTiers RPC
 * method.
 */
export interface QueryAllLiquidityTiersResponse {
  liquidityTiers: LiquidityTier[];
  pagination?: PageResponse;
}
export interface QueryAllLiquidityTiersResponseProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersResponse";
  value: Uint8Array;
}
/**
 * QueryAllLiquidityTiersResponse is response type for the AllLiquidityTiers RPC
 * method.
 */
export interface QueryAllLiquidityTiersResponseAmino {
  liquidity_tiers?: LiquidityTierAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryAllLiquidityTiersResponseAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersResponse";
  value: QueryAllLiquidityTiersResponseAmino;
}
/**
 * QueryAllLiquidityTiersResponse is response type for the AllLiquidityTiers RPC
 * method.
 */
export interface QueryAllLiquidityTiersResponseSDKType {
  liquidity_tiers: LiquidityTierSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryPremiumVotesRequest is the request type for the PremiumVotes RPC method. */
export interface QueryPremiumVotesRequest {}
export interface QueryPremiumVotesRequestProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesRequest";
  value: Uint8Array;
}
/** QueryPremiumVotesRequest is the request type for the PremiumVotes RPC method. */
export interface QueryPremiumVotesRequestAmino {}
export interface QueryPremiumVotesRequestAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryPremiumVotesRequest";
  value: QueryPremiumVotesRequestAmino;
}
/** QueryPremiumVotesRequest is the request type for the PremiumVotes RPC method. */
export interface QueryPremiumVotesRequestSDKType {}
/**
 * QueryPremiumVotesResponse is the response type for the PremiumVotes RPC
 * method.
 */
export interface QueryPremiumVotesResponse {
  premiumVotes: PremiumStore;
}
export interface QueryPremiumVotesResponseProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesResponse";
  value: Uint8Array;
}
/**
 * QueryPremiumVotesResponse is the response type for the PremiumVotes RPC
 * method.
 */
export interface QueryPremiumVotesResponseAmino {
  premium_votes?: PremiumStoreAmino;
}
export interface QueryPremiumVotesResponseAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryPremiumVotesResponse";
  value: QueryPremiumVotesResponseAmino;
}
/**
 * QueryPremiumVotesResponse is the response type for the PremiumVotes RPC
 * method.
 */
export interface QueryPremiumVotesResponseSDKType {
  premium_votes: PremiumStoreSDKType;
}
/**
 * QueryPremiumSamplesRequest is the request type for the PremiumSamples RPC
 * method.
 */
export interface QueryPremiumSamplesRequest {}
export interface QueryPremiumSamplesRequestProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesRequest";
  value: Uint8Array;
}
/**
 * QueryPremiumSamplesRequest is the request type for the PremiumSamples RPC
 * method.
 */
export interface QueryPremiumSamplesRequestAmino {}
export interface QueryPremiumSamplesRequestAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryPremiumSamplesRequest";
  value: QueryPremiumSamplesRequestAmino;
}
/**
 * QueryPremiumSamplesRequest is the request type for the PremiumSamples RPC
 * method.
 */
export interface QueryPremiumSamplesRequestSDKType {}
/**
 * QueryPremiumSamplesResponse is the response type for the PremiumSamples RPC
 * method.
 */
export interface QueryPremiumSamplesResponse {
  premiumSamples: PremiumStore;
}
export interface QueryPremiumSamplesResponseProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesResponse";
  value: Uint8Array;
}
/**
 * QueryPremiumSamplesResponse is the response type for the PremiumSamples RPC
 * method.
 */
export interface QueryPremiumSamplesResponseAmino {
  premium_samples?: PremiumStoreAmino;
}
export interface QueryPremiumSamplesResponseAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryPremiumSamplesResponse";
  value: QueryPremiumSamplesResponseAmino;
}
/**
 * QueryPremiumSamplesResponse is the response type for the PremiumSamples RPC
 * method.
 */
export interface QueryPremiumSamplesResponseSDKType {
  premium_samples: PremiumStoreSDKType;
}
/** QueryParamsResponse is the response type for the Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsResponse is the response type for the Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsResponse is the response type for the Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is the response type for the Params RPC method. */
export interface QueryParamsResponse {
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/klyraprotocol.perpetuals.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is the response type for the Params RPC method. */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/klyraprotocol.perpetuals.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is the response type for the Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
function createBaseQueryPerpetualRequest(): QueryPerpetualRequest {
  return {
    id: 0
  };
}
export const QueryPerpetualRequest = {
  typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualRequest",
  is(o: any): o is QueryPerpetualRequest {
    return o && (o.$typeUrl === QueryPerpetualRequest.typeUrl || typeof o.id === "number");
  },
  isSDK(o: any): o is QueryPerpetualRequestSDKType {
    return o && (o.$typeUrl === QueryPerpetualRequest.typeUrl || typeof o.id === "number");
  },
  isAmino(o: any): o is QueryPerpetualRequestAmino {
    return o && (o.$typeUrl === QueryPerpetualRequest.typeUrl || typeof o.id === "number");
  },
  encode(message: QueryPerpetualRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpetualRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPerpetualRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPerpetualRequest>): QueryPerpetualRequest {
    const message = createBaseQueryPerpetualRequest();
    message.id = object.id ?? 0;
    return message;
  },
  fromAmino(object: QueryPerpetualRequestAmino): QueryPerpetualRequest {
    const message = createBaseQueryPerpetualRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    return message;
  },
  toAmino(message: QueryPerpetualRequest): QueryPerpetualRequestAmino {
    const obj: any = {};
    obj.id = message.id === 0 ? undefined : message.id;
    return obj;
  },
  fromAminoMsg(object: QueryPerpetualRequestAminoMsg): QueryPerpetualRequest {
    return QueryPerpetualRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPerpetualRequestProtoMsg): QueryPerpetualRequest {
    return QueryPerpetualRequest.decode(message.value);
  },
  toProto(message: QueryPerpetualRequest): Uint8Array {
    return QueryPerpetualRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPerpetualRequest): QueryPerpetualRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualRequest",
      value: QueryPerpetualRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryPerpetualRequest.typeUrl, QueryPerpetualRequest);
function createBaseQueryPerpetualResponse(): QueryPerpetualResponse {
  return {
    perpetual: Perpetual.fromPartial({})
  };
}
export const QueryPerpetualResponse = {
  typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualResponse",
  is(o: any): o is QueryPerpetualResponse {
    return o && (o.$typeUrl === QueryPerpetualResponse.typeUrl || Perpetual.is(o.perpetual));
  },
  isSDK(o: any): o is QueryPerpetualResponseSDKType {
    return o && (o.$typeUrl === QueryPerpetualResponse.typeUrl || Perpetual.isSDK(o.perpetual));
  },
  isAmino(o: any): o is QueryPerpetualResponseAmino {
    return o && (o.$typeUrl === QueryPerpetualResponse.typeUrl || Perpetual.isAmino(o.perpetual));
  },
  encode(message: QueryPerpetualResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.perpetual !== undefined) {
      Perpetual.encode(message.perpetual, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpetualResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPerpetualResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.perpetual = Perpetual.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPerpetualResponse>): QueryPerpetualResponse {
    const message = createBaseQueryPerpetualResponse();
    message.perpetual = object.perpetual !== undefined && object.perpetual !== null ? Perpetual.fromPartial(object.perpetual) : undefined;
    return message;
  },
  fromAmino(object: QueryPerpetualResponseAmino): QueryPerpetualResponse {
    const message = createBaseQueryPerpetualResponse();
    if (object.perpetual !== undefined && object.perpetual !== null) {
      message.perpetual = Perpetual.fromAmino(object.perpetual);
    }
    return message;
  },
  toAmino(message: QueryPerpetualResponse): QueryPerpetualResponseAmino {
    const obj: any = {};
    obj.perpetual = message.perpetual ? Perpetual.toAmino(message.perpetual) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPerpetualResponseAminoMsg): QueryPerpetualResponse {
    return QueryPerpetualResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPerpetualResponseProtoMsg): QueryPerpetualResponse {
    return QueryPerpetualResponse.decode(message.value);
  },
  toProto(message: QueryPerpetualResponse): Uint8Array {
    return QueryPerpetualResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPerpetualResponse): QueryPerpetualResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualResponse",
      value: QueryPerpetualResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryPerpetualResponse.typeUrl, QueryPerpetualResponse);
function createBaseQueryAllPerpetualsRequest(): QueryAllPerpetualsRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllPerpetualsRequest = {
  typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsRequest",
  is(o: any): o is QueryAllPerpetualsRequest {
    return o && o.$typeUrl === QueryAllPerpetualsRequest.typeUrl;
  },
  isSDK(o: any): o is QueryAllPerpetualsRequestSDKType {
    return o && o.$typeUrl === QueryAllPerpetualsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryAllPerpetualsRequestAmino {
    return o && o.$typeUrl === QueryAllPerpetualsRequest.typeUrl;
  },
  encode(message: QueryAllPerpetualsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllPerpetualsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPerpetualsRequest();
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
  fromPartial(object: Partial<QueryAllPerpetualsRequest>): QueryAllPerpetualsRequest {
    const message = createBaseQueryAllPerpetualsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPerpetualsRequestAmino): QueryAllPerpetualsRequest {
    const message = createBaseQueryAllPerpetualsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPerpetualsRequest): QueryAllPerpetualsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPerpetualsRequestAminoMsg): QueryAllPerpetualsRequest {
    return QueryAllPerpetualsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPerpetualsRequestProtoMsg): QueryAllPerpetualsRequest {
    return QueryAllPerpetualsRequest.decode(message.value);
  },
  toProto(message: QueryAllPerpetualsRequest): Uint8Array {
    return QueryAllPerpetualsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPerpetualsRequest): QueryAllPerpetualsRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsRequest",
      value: QueryAllPerpetualsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAllPerpetualsRequest.typeUrl, QueryAllPerpetualsRequest);
function createBaseQueryAllPerpetualsResponse(): QueryAllPerpetualsResponse {
  return {
    perpetual: [],
    pagination: undefined
  };
}
export const QueryAllPerpetualsResponse = {
  typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsResponse",
  is(o: any): o is QueryAllPerpetualsResponse {
    return o && (o.$typeUrl === QueryAllPerpetualsResponse.typeUrl || Array.isArray(o.perpetual) && (!o.perpetual.length || Perpetual.is(o.perpetual[0])));
  },
  isSDK(o: any): o is QueryAllPerpetualsResponseSDKType {
    return o && (o.$typeUrl === QueryAllPerpetualsResponse.typeUrl || Array.isArray(o.perpetual) && (!o.perpetual.length || Perpetual.isSDK(o.perpetual[0])));
  },
  isAmino(o: any): o is QueryAllPerpetualsResponseAmino {
    return o && (o.$typeUrl === QueryAllPerpetualsResponse.typeUrl || Array.isArray(o.perpetual) && (!o.perpetual.length || Perpetual.isAmino(o.perpetual[0])));
  },
  encode(message: QueryAllPerpetualsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.perpetual) {
      Perpetual.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllPerpetualsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPerpetualsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.perpetual.push(Perpetual.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryAllPerpetualsResponse>): QueryAllPerpetualsResponse {
    const message = createBaseQueryAllPerpetualsResponse();
    message.perpetual = object.perpetual?.map(e => Perpetual.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPerpetualsResponseAmino): QueryAllPerpetualsResponse {
    const message = createBaseQueryAllPerpetualsResponse();
    message.perpetual = object.perpetual?.map(e => Perpetual.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPerpetualsResponse): QueryAllPerpetualsResponseAmino {
    const obj: any = {};
    if (message.perpetual) {
      obj.perpetual = message.perpetual.map(e => e ? Perpetual.toAmino(e) : undefined);
    } else {
      obj.perpetual = message.perpetual;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPerpetualsResponseAminoMsg): QueryAllPerpetualsResponse {
    return QueryAllPerpetualsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPerpetualsResponseProtoMsg): QueryAllPerpetualsResponse {
    return QueryAllPerpetualsResponse.decode(message.value);
  },
  toProto(message: QueryAllPerpetualsResponse): Uint8Array {
    return QueryAllPerpetualsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPerpetualsResponse): QueryAllPerpetualsResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsResponse",
      value: QueryAllPerpetualsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAllPerpetualsResponse.typeUrl, QueryAllPerpetualsResponse);
function createBaseQueryAllLiquidityTiersRequest(): QueryAllLiquidityTiersRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllLiquidityTiersRequest = {
  typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersRequest",
  is(o: any): o is QueryAllLiquidityTiersRequest {
    return o && o.$typeUrl === QueryAllLiquidityTiersRequest.typeUrl;
  },
  isSDK(o: any): o is QueryAllLiquidityTiersRequestSDKType {
    return o && o.$typeUrl === QueryAllLiquidityTiersRequest.typeUrl;
  },
  isAmino(o: any): o is QueryAllLiquidityTiersRequestAmino {
    return o && o.$typeUrl === QueryAllLiquidityTiersRequest.typeUrl;
  },
  encode(message: QueryAllLiquidityTiersRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllLiquidityTiersRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllLiquidityTiersRequest();
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
  fromPartial(object: Partial<QueryAllLiquidityTiersRequest>): QueryAllLiquidityTiersRequest {
    const message = createBaseQueryAllLiquidityTiersRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllLiquidityTiersRequestAmino): QueryAllLiquidityTiersRequest {
    const message = createBaseQueryAllLiquidityTiersRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllLiquidityTiersRequest): QueryAllLiquidityTiersRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllLiquidityTiersRequestAminoMsg): QueryAllLiquidityTiersRequest {
    return QueryAllLiquidityTiersRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllLiquidityTiersRequestProtoMsg): QueryAllLiquidityTiersRequest {
    return QueryAllLiquidityTiersRequest.decode(message.value);
  },
  toProto(message: QueryAllLiquidityTiersRequest): Uint8Array {
    return QueryAllLiquidityTiersRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllLiquidityTiersRequest): QueryAllLiquidityTiersRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersRequest",
      value: QueryAllLiquidityTiersRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAllLiquidityTiersRequest.typeUrl, QueryAllLiquidityTiersRequest);
function createBaseQueryAllLiquidityTiersResponse(): QueryAllLiquidityTiersResponse {
  return {
    liquidityTiers: [],
    pagination: undefined
  };
}
export const QueryAllLiquidityTiersResponse = {
  typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersResponse",
  is(o: any): o is QueryAllLiquidityTiersResponse {
    return o && (o.$typeUrl === QueryAllLiquidityTiersResponse.typeUrl || Array.isArray(o.liquidityTiers) && (!o.liquidityTiers.length || LiquidityTier.is(o.liquidityTiers[0])));
  },
  isSDK(o: any): o is QueryAllLiquidityTiersResponseSDKType {
    return o && (o.$typeUrl === QueryAllLiquidityTiersResponse.typeUrl || Array.isArray(o.liquidity_tiers) && (!o.liquidity_tiers.length || LiquidityTier.isSDK(o.liquidity_tiers[0])));
  },
  isAmino(o: any): o is QueryAllLiquidityTiersResponseAmino {
    return o && (o.$typeUrl === QueryAllLiquidityTiersResponse.typeUrl || Array.isArray(o.liquidity_tiers) && (!o.liquidity_tiers.length || LiquidityTier.isAmino(o.liquidity_tiers[0])));
  },
  encode(message: QueryAllLiquidityTiersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.liquidityTiers) {
      LiquidityTier.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllLiquidityTiersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllLiquidityTiersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidityTiers.push(LiquidityTier.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryAllLiquidityTiersResponse>): QueryAllLiquidityTiersResponse {
    const message = createBaseQueryAllLiquidityTiersResponse();
    message.liquidityTiers = object.liquidityTiers?.map(e => LiquidityTier.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllLiquidityTiersResponseAmino): QueryAllLiquidityTiersResponse {
    const message = createBaseQueryAllLiquidityTiersResponse();
    message.liquidityTiers = object.liquidity_tiers?.map(e => LiquidityTier.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllLiquidityTiersResponse): QueryAllLiquidityTiersResponseAmino {
    const obj: any = {};
    if (message.liquidityTiers) {
      obj.liquidity_tiers = message.liquidityTiers.map(e => e ? LiquidityTier.toAmino(e) : undefined);
    } else {
      obj.liquidity_tiers = message.liquidityTiers;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllLiquidityTiersResponseAminoMsg): QueryAllLiquidityTiersResponse {
    return QueryAllLiquidityTiersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllLiquidityTiersResponseProtoMsg): QueryAllLiquidityTiersResponse {
    return QueryAllLiquidityTiersResponse.decode(message.value);
  },
  toProto(message: QueryAllLiquidityTiersResponse): Uint8Array {
    return QueryAllLiquidityTiersResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllLiquidityTiersResponse): QueryAllLiquidityTiersResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersResponse",
      value: QueryAllLiquidityTiersResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAllLiquidityTiersResponse.typeUrl, QueryAllLiquidityTiersResponse);
function createBaseQueryPremiumVotesRequest(): QueryPremiumVotesRequest {
  return {};
}
export const QueryPremiumVotesRequest = {
  typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesRequest",
  is(o: any): o is QueryPremiumVotesRequest {
    return o && o.$typeUrl === QueryPremiumVotesRequest.typeUrl;
  },
  isSDK(o: any): o is QueryPremiumVotesRequestSDKType {
    return o && o.$typeUrl === QueryPremiumVotesRequest.typeUrl;
  },
  isAmino(o: any): o is QueryPremiumVotesRequestAmino {
    return o && o.$typeUrl === QueryPremiumVotesRequest.typeUrl;
  },
  encode(_: QueryPremiumVotesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPremiumVotesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPremiumVotesRequest();
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
  fromPartial(_: Partial<QueryPremiumVotesRequest>): QueryPremiumVotesRequest {
    const message = createBaseQueryPremiumVotesRequest();
    return message;
  },
  fromAmino(_: QueryPremiumVotesRequestAmino): QueryPremiumVotesRequest {
    const message = createBaseQueryPremiumVotesRequest();
    return message;
  },
  toAmino(_: QueryPremiumVotesRequest): QueryPremiumVotesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryPremiumVotesRequestAminoMsg): QueryPremiumVotesRequest {
    return QueryPremiumVotesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPremiumVotesRequestProtoMsg): QueryPremiumVotesRequest {
    return QueryPremiumVotesRequest.decode(message.value);
  },
  toProto(message: QueryPremiumVotesRequest): Uint8Array {
    return QueryPremiumVotesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPremiumVotesRequest): QueryPremiumVotesRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesRequest",
      value: QueryPremiumVotesRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryPremiumVotesRequest.typeUrl, QueryPremiumVotesRequest);
function createBaseQueryPremiumVotesResponse(): QueryPremiumVotesResponse {
  return {
    premiumVotes: PremiumStore.fromPartial({})
  };
}
export const QueryPremiumVotesResponse = {
  typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesResponse",
  is(o: any): o is QueryPremiumVotesResponse {
    return o && (o.$typeUrl === QueryPremiumVotesResponse.typeUrl || PremiumStore.is(o.premiumVotes));
  },
  isSDK(o: any): o is QueryPremiumVotesResponseSDKType {
    return o && (o.$typeUrl === QueryPremiumVotesResponse.typeUrl || PremiumStore.isSDK(o.premium_votes));
  },
  isAmino(o: any): o is QueryPremiumVotesResponseAmino {
    return o && (o.$typeUrl === QueryPremiumVotesResponse.typeUrl || PremiumStore.isAmino(o.premium_votes));
  },
  encode(message: QueryPremiumVotesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.premiumVotes !== undefined) {
      PremiumStore.encode(message.premiumVotes, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPremiumVotesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPremiumVotesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.premiumVotes = PremiumStore.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPremiumVotesResponse>): QueryPremiumVotesResponse {
    const message = createBaseQueryPremiumVotesResponse();
    message.premiumVotes = object.premiumVotes !== undefined && object.premiumVotes !== null ? PremiumStore.fromPartial(object.premiumVotes) : undefined;
    return message;
  },
  fromAmino(object: QueryPremiumVotesResponseAmino): QueryPremiumVotesResponse {
    const message = createBaseQueryPremiumVotesResponse();
    if (object.premium_votes !== undefined && object.premium_votes !== null) {
      message.premiumVotes = PremiumStore.fromAmino(object.premium_votes);
    }
    return message;
  },
  toAmino(message: QueryPremiumVotesResponse): QueryPremiumVotesResponseAmino {
    const obj: any = {};
    obj.premium_votes = message.premiumVotes ? PremiumStore.toAmino(message.premiumVotes) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPremiumVotesResponseAminoMsg): QueryPremiumVotesResponse {
    return QueryPremiumVotesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPremiumVotesResponseProtoMsg): QueryPremiumVotesResponse {
    return QueryPremiumVotesResponse.decode(message.value);
  },
  toProto(message: QueryPremiumVotesResponse): Uint8Array {
    return QueryPremiumVotesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPremiumVotesResponse): QueryPremiumVotesResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesResponse",
      value: QueryPremiumVotesResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryPremiumVotesResponse.typeUrl, QueryPremiumVotesResponse);
function createBaseQueryPremiumSamplesRequest(): QueryPremiumSamplesRequest {
  return {};
}
export const QueryPremiumSamplesRequest = {
  typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesRequest",
  is(o: any): o is QueryPremiumSamplesRequest {
    return o && o.$typeUrl === QueryPremiumSamplesRequest.typeUrl;
  },
  isSDK(o: any): o is QueryPremiumSamplesRequestSDKType {
    return o && o.$typeUrl === QueryPremiumSamplesRequest.typeUrl;
  },
  isAmino(o: any): o is QueryPremiumSamplesRequestAmino {
    return o && o.$typeUrl === QueryPremiumSamplesRequest.typeUrl;
  },
  encode(_: QueryPremiumSamplesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPremiumSamplesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPremiumSamplesRequest();
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
  fromPartial(_: Partial<QueryPremiumSamplesRequest>): QueryPremiumSamplesRequest {
    const message = createBaseQueryPremiumSamplesRequest();
    return message;
  },
  fromAmino(_: QueryPremiumSamplesRequestAmino): QueryPremiumSamplesRequest {
    const message = createBaseQueryPremiumSamplesRequest();
    return message;
  },
  toAmino(_: QueryPremiumSamplesRequest): QueryPremiumSamplesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryPremiumSamplesRequestAminoMsg): QueryPremiumSamplesRequest {
    return QueryPremiumSamplesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPremiumSamplesRequestProtoMsg): QueryPremiumSamplesRequest {
    return QueryPremiumSamplesRequest.decode(message.value);
  },
  toProto(message: QueryPremiumSamplesRequest): Uint8Array {
    return QueryPremiumSamplesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPremiumSamplesRequest): QueryPremiumSamplesRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesRequest",
      value: QueryPremiumSamplesRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryPremiumSamplesRequest.typeUrl, QueryPremiumSamplesRequest);
function createBaseQueryPremiumSamplesResponse(): QueryPremiumSamplesResponse {
  return {
    premiumSamples: PremiumStore.fromPartial({})
  };
}
export const QueryPremiumSamplesResponse = {
  typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesResponse",
  is(o: any): o is QueryPremiumSamplesResponse {
    return o && (o.$typeUrl === QueryPremiumSamplesResponse.typeUrl || PremiumStore.is(o.premiumSamples));
  },
  isSDK(o: any): o is QueryPremiumSamplesResponseSDKType {
    return o && (o.$typeUrl === QueryPremiumSamplesResponse.typeUrl || PremiumStore.isSDK(o.premium_samples));
  },
  isAmino(o: any): o is QueryPremiumSamplesResponseAmino {
    return o && (o.$typeUrl === QueryPremiumSamplesResponse.typeUrl || PremiumStore.isAmino(o.premium_samples));
  },
  encode(message: QueryPremiumSamplesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.premiumSamples !== undefined) {
      PremiumStore.encode(message.premiumSamples, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPremiumSamplesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPremiumSamplesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.premiumSamples = PremiumStore.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPremiumSamplesResponse>): QueryPremiumSamplesResponse {
    const message = createBaseQueryPremiumSamplesResponse();
    message.premiumSamples = object.premiumSamples !== undefined && object.premiumSamples !== null ? PremiumStore.fromPartial(object.premiumSamples) : undefined;
    return message;
  },
  fromAmino(object: QueryPremiumSamplesResponseAmino): QueryPremiumSamplesResponse {
    const message = createBaseQueryPremiumSamplesResponse();
    if (object.premium_samples !== undefined && object.premium_samples !== null) {
      message.premiumSamples = PremiumStore.fromAmino(object.premium_samples);
    }
    return message;
  },
  toAmino(message: QueryPremiumSamplesResponse): QueryPremiumSamplesResponseAmino {
    const obj: any = {};
    obj.premium_samples = message.premiumSamples ? PremiumStore.toAmino(message.premiumSamples) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPremiumSamplesResponseAminoMsg): QueryPremiumSamplesResponse {
    return QueryPremiumSamplesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPremiumSamplesResponseProtoMsg): QueryPremiumSamplesResponse {
    return QueryPremiumSamplesResponse.decode(message.value);
  },
  toProto(message: QueryPremiumSamplesResponse): Uint8Array {
    return QueryPremiumSamplesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPremiumSamplesResponse): QueryPremiumSamplesResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesResponse",
      value: QueryPremiumSamplesResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryPremiumSamplesResponse.typeUrl, QueryPremiumSamplesResponse);
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/klyraprotocol.perpetuals.QueryParamsRequest",
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
      typeUrl: "/klyraprotocol.perpetuals.QueryParamsRequest",
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
  typeUrl: "/klyraprotocol.perpetuals.QueryParamsResponse",
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
      typeUrl: "/klyraprotocol.perpetuals.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryParamsResponse.typeUrl, QueryParamsResponse);