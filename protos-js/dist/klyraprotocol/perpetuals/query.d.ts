import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Perpetual, PerpetualAmino, PerpetualSDKType, LiquidityTier, LiquidityTierAmino, LiquidityTierSDKType, PremiumStore, PremiumStoreAmino, PremiumStoreSDKType } from "./perpetual";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
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
export interface QueryPremiumVotesRequest {
}
export interface QueryPremiumVotesRequestProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesRequest";
    value: Uint8Array;
}
/** QueryPremiumVotesRequest is the request type for the PremiumVotes RPC method. */
export interface QueryPremiumVotesRequestAmino {
}
export interface QueryPremiumVotesRequestAminoMsg {
    type: "/klyraprotocol.perpetuals.QueryPremiumVotesRequest";
    value: QueryPremiumVotesRequestAmino;
}
/** QueryPremiumVotesRequest is the request type for the PremiumVotes RPC method. */
export interface QueryPremiumVotesRequestSDKType {
}
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
export interface QueryPremiumSamplesRequest {
}
export interface QueryPremiumSamplesRequestProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesRequest";
    value: Uint8Array;
}
/**
 * QueryPremiumSamplesRequest is the request type for the PremiumSamples RPC
 * method.
 */
export interface QueryPremiumSamplesRequestAmino {
}
export interface QueryPremiumSamplesRequestAminoMsg {
    type: "/klyraprotocol.perpetuals.QueryPremiumSamplesRequest";
    value: QueryPremiumSamplesRequestAmino;
}
/**
 * QueryPremiumSamplesRequest is the request type for the PremiumSamples RPC
 * method.
 */
export interface QueryPremiumSamplesRequestSDKType {
}
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
export interface QueryParamsRequest {
}
export interface QueryParamsRequestProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.QueryParamsRequest";
    value: Uint8Array;
}
/** QueryParamsResponse is the response type for the Params RPC method. */
export interface QueryParamsRequestAmino {
}
export interface QueryParamsRequestAminoMsg {
    type: "/klyraprotocol.perpetuals.QueryParamsRequest";
    value: QueryParamsRequestAmino;
}
/** QueryParamsResponse is the response type for the Params RPC method. */
export interface QueryParamsRequestSDKType {
}
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
export declare const QueryPerpetualRequest: {
    typeUrl: string;
    is(o: any): o is QueryPerpetualRequest;
    isSDK(o: any): o is QueryPerpetualRequestSDKType;
    isAmino(o: any): o is QueryPerpetualRequestAmino;
    encode(message: QueryPerpetualRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpetualRequest;
    fromPartial(object: Partial<QueryPerpetualRequest>): QueryPerpetualRequest;
    fromAmino(object: QueryPerpetualRequestAmino): QueryPerpetualRequest;
    toAmino(message: QueryPerpetualRequest): QueryPerpetualRequestAmino;
    fromAminoMsg(object: QueryPerpetualRequestAminoMsg): QueryPerpetualRequest;
    fromProtoMsg(message: QueryPerpetualRequestProtoMsg): QueryPerpetualRequest;
    toProto(message: QueryPerpetualRequest): Uint8Array;
    toProtoMsg(message: QueryPerpetualRequest): QueryPerpetualRequestProtoMsg;
};
export declare const QueryPerpetualResponse: {
    typeUrl: string;
    is(o: any): o is QueryPerpetualResponse;
    isSDK(o: any): o is QueryPerpetualResponseSDKType;
    isAmino(o: any): o is QueryPerpetualResponseAmino;
    encode(message: QueryPerpetualResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpetualResponse;
    fromPartial(object: Partial<QueryPerpetualResponse>): QueryPerpetualResponse;
    fromAmino(object: QueryPerpetualResponseAmino): QueryPerpetualResponse;
    toAmino(message: QueryPerpetualResponse): QueryPerpetualResponseAmino;
    fromAminoMsg(object: QueryPerpetualResponseAminoMsg): QueryPerpetualResponse;
    fromProtoMsg(message: QueryPerpetualResponseProtoMsg): QueryPerpetualResponse;
    toProto(message: QueryPerpetualResponse): Uint8Array;
    toProtoMsg(message: QueryPerpetualResponse): QueryPerpetualResponseProtoMsg;
};
export declare const QueryAllPerpetualsRequest: {
    typeUrl: string;
    is(o: any): o is QueryAllPerpetualsRequest;
    isSDK(o: any): o is QueryAllPerpetualsRequestSDKType;
    isAmino(o: any): o is QueryAllPerpetualsRequestAmino;
    encode(message: QueryAllPerpetualsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllPerpetualsRequest;
    fromPartial(object: Partial<QueryAllPerpetualsRequest>): QueryAllPerpetualsRequest;
    fromAmino(object: QueryAllPerpetualsRequestAmino): QueryAllPerpetualsRequest;
    toAmino(message: QueryAllPerpetualsRequest): QueryAllPerpetualsRequestAmino;
    fromAminoMsg(object: QueryAllPerpetualsRequestAminoMsg): QueryAllPerpetualsRequest;
    fromProtoMsg(message: QueryAllPerpetualsRequestProtoMsg): QueryAllPerpetualsRequest;
    toProto(message: QueryAllPerpetualsRequest): Uint8Array;
    toProtoMsg(message: QueryAllPerpetualsRequest): QueryAllPerpetualsRequestProtoMsg;
};
export declare const QueryAllPerpetualsResponse: {
    typeUrl: string;
    is(o: any): o is QueryAllPerpetualsResponse;
    isSDK(o: any): o is QueryAllPerpetualsResponseSDKType;
    isAmino(o: any): o is QueryAllPerpetualsResponseAmino;
    encode(message: QueryAllPerpetualsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllPerpetualsResponse;
    fromPartial(object: Partial<QueryAllPerpetualsResponse>): QueryAllPerpetualsResponse;
    fromAmino(object: QueryAllPerpetualsResponseAmino): QueryAllPerpetualsResponse;
    toAmino(message: QueryAllPerpetualsResponse): QueryAllPerpetualsResponseAmino;
    fromAminoMsg(object: QueryAllPerpetualsResponseAminoMsg): QueryAllPerpetualsResponse;
    fromProtoMsg(message: QueryAllPerpetualsResponseProtoMsg): QueryAllPerpetualsResponse;
    toProto(message: QueryAllPerpetualsResponse): Uint8Array;
    toProtoMsg(message: QueryAllPerpetualsResponse): QueryAllPerpetualsResponseProtoMsg;
};
export declare const QueryAllLiquidityTiersRequest: {
    typeUrl: string;
    is(o: any): o is QueryAllLiquidityTiersRequest;
    isSDK(o: any): o is QueryAllLiquidityTiersRequestSDKType;
    isAmino(o: any): o is QueryAllLiquidityTiersRequestAmino;
    encode(message: QueryAllLiquidityTiersRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllLiquidityTiersRequest;
    fromPartial(object: Partial<QueryAllLiquidityTiersRequest>): QueryAllLiquidityTiersRequest;
    fromAmino(object: QueryAllLiquidityTiersRequestAmino): QueryAllLiquidityTiersRequest;
    toAmino(message: QueryAllLiquidityTiersRequest): QueryAllLiquidityTiersRequestAmino;
    fromAminoMsg(object: QueryAllLiquidityTiersRequestAminoMsg): QueryAllLiquidityTiersRequest;
    fromProtoMsg(message: QueryAllLiquidityTiersRequestProtoMsg): QueryAllLiquidityTiersRequest;
    toProto(message: QueryAllLiquidityTiersRequest): Uint8Array;
    toProtoMsg(message: QueryAllLiquidityTiersRequest): QueryAllLiquidityTiersRequestProtoMsg;
};
export declare const QueryAllLiquidityTiersResponse: {
    typeUrl: string;
    is(o: any): o is QueryAllLiquidityTiersResponse;
    isSDK(o: any): o is QueryAllLiquidityTiersResponseSDKType;
    isAmino(o: any): o is QueryAllLiquidityTiersResponseAmino;
    encode(message: QueryAllLiquidityTiersResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllLiquidityTiersResponse;
    fromPartial(object: Partial<QueryAllLiquidityTiersResponse>): QueryAllLiquidityTiersResponse;
    fromAmino(object: QueryAllLiquidityTiersResponseAmino): QueryAllLiquidityTiersResponse;
    toAmino(message: QueryAllLiquidityTiersResponse): QueryAllLiquidityTiersResponseAmino;
    fromAminoMsg(object: QueryAllLiquidityTiersResponseAminoMsg): QueryAllLiquidityTiersResponse;
    fromProtoMsg(message: QueryAllLiquidityTiersResponseProtoMsg): QueryAllLiquidityTiersResponse;
    toProto(message: QueryAllLiquidityTiersResponse): Uint8Array;
    toProtoMsg(message: QueryAllLiquidityTiersResponse): QueryAllLiquidityTiersResponseProtoMsg;
};
export declare const QueryPremiumVotesRequest: {
    typeUrl: string;
    is(o: any): o is QueryPremiumVotesRequest;
    isSDK(o: any): o is QueryPremiumVotesRequestSDKType;
    isAmino(o: any): o is QueryPremiumVotesRequestAmino;
    encode(_: QueryPremiumVotesRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryPremiumVotesRequest;
    fromPartial(_: Partial<QueryPremiumVotesRequest>): QueryPremiumVotesRequest;
    fromAmino(_: QueryPremiumVotesRequestAmino): QueryPremiumVotesRequest;
    toAmino(_: QueryPremiumVotesRequest): QueryPremiumVotesRequestAmino;
    fromAminoMsg(object: QueryPremiumVotesRequestAminoMsg): QueryPremiumVotesRequest;
    fromProtoMsg(message: QueryPremiumVotesRequestProtoMsg): QueryPremiumVotesRequest;
    toProto(message: QueryPremiumVotesRequest): Uint8Array;
    toProtoMsg(message: QueryPremiumVotesRequest): QueryPremiumVotesRequestProtoMsg;
};
export declare const QueryPremiumVotesResponse: {
    typeUrl: string;
    is(o: any): o is QueryPremiumVotesResponse;
    isSDK(o: any): o is QueryPremiumVotesResponseSDKType;
    isAmino(o: any): o is QueryPremiumVotesResponseAmino;
    encode(message: QueryPremiumVotesResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryPremiumVotesResponse;
    fromPartial(object: Partial<QueryPremiumVotesResponse>): QueryPremiumVotesResponse;
    fromAmino(object: QueryPremiumVotesResponseAmino): QueryPremiumVotesResponse;
    toAmino(message: QueryPremiumVotesResponse): QueryPremiumVotesResponseAmino;
    fromAminoMsg(object: QueryPremiumVotesResponseAminoMsg): QueryPremiumVotesResponse;
    fromProtoMsg(message: QueryPremiumVotesResponseProtoMsg): QueryPremiumVotesResponse;
    toProto(message: QueryPremiumVotesResponse): Uint8Array;
    toProtoMsg(message: QueryPremiumVotesResponse): QueryPremiumVotesResponseProtoMsg;
};
export declare const QueryPremiumSamplesRequest: {
    typeUrl: string;
    is(o: any): o is QueryPremiumSamplesRequest;
    isSDK(o: any): o is QueryPremiumSamplesRequestSDKType;
    isAmino(o: any): o is QueryPremiumSamplesRequestAmino;
    encode(_: QueryPremiumSamplesRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryPremiumSamplesRequest;
    fromPartial(_: Partial<QueryPremiumSamplesRequest>): QueryPremiumSamplesRequest;
    fromAmino(_: QueryPremiumSamplesRequestAmino): QueryPremiumSamplesRequest;
    toAmino(_: QueryPremiumSamplesRequest): QueryPremiumSamplesRequestAmino;
    fromAminoMsg(object: QueryPremiumSamplesRequestAminoMsg): QueryPremiumSamplesRequest;
    fromProtoMsg(message: QueryPremiumSamplesRequestProtoMsg): QueryPremiumSamplesRequest;
    toProto(message: QueryPremiumSamplesRequest): Uint8Array;
    toProtoMsg(message: QueryPremiumSamplesRequest): QueryPremiumSamplesRequestProtoMsg;
};
export declare const QueryPremiumSamplesResponse: {
    typeUrl: string;
    is(o: any): o is QueryPremiumSamplesResponse;
    isSDK(o: any): o is QueryPremiumSamplesResponseSDKType;
    isAmino(o: any): o is QueryPremiumSamplesResponseAmino;
    encode(message: QueryPremiumSamplesResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryPremiumSamplesResponse;
    fromPartial(object: Partial<QueryPremiumSamplesResponse>): QueryPremiumSamplesResponse;
    fromAmino(object: QueryPremiumSamplesResponseAmino): QueryPremiumSamplesResponse;
    toAmino(message: QueryPremiumSamplesResponse): QueryPremiumSamplesResponseAmino;
    fromAminoMsg(object: QueryPremiumSamplesResponseAminoMsg): QueryPremiumSamplesResponse;
    fromProtoMsg(message: QueryPremiumSamplesResponseProtoMsg): QueryPremiumSamplesResponse;
    toProto(message: QueryPremiumSamplesResponse): Uint8Array;
    toProtoMsg(message: QueryPremiumSamplesResponse): QueryPremiumSamplesResponseProtoMsg;
};
export declare const QueryParamsRequest: {
    typeUrl: string;
    is(o: any): o is QueryParamsRequest;
    isSDK(o: any): o is QueryParamsRequestSDKType;
    isAmino(o: any): o is QueryParamsRequestAmino;
    encode(_: QueryParamsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest;
    fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest;
    fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest;
    toAmino(_: QueryParamsRequest): QueryParamsRequestAmino;
    fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest;
    fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest;
    toProto(message: QueryParamsRequest): Uint8Array;
    toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg;
};
export declare const QueryParamsResponse: {
    typeUrl: string;
    is(o: any): o is QueryParamsResponse;
    isSDK(o: any): o is QueryParamsResponseSDKType;
    isAmino(o: any): o is QueryParamsResponseAmino;
    encode(message: QueryParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse;
    fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse;
    fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse;
    toAmino(message: QueryParamsResponse): QueryParamsResponseAmino;
    fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse;
    fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse;
    toProto(message: QueryParamsResponse): Uint8Array;
    toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg;
};
