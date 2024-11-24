import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { StatsMetadata, StatsMetadataAmino, StatsMetadataSDKType, GlobalStats, GlobalStatsAmino, GlobalStatsSDKType, UserStats, UserStatsAmino, UserStatsSDKType } from "./stats";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryParamsRequest is a request type for the Params RPC method. */
export interface QueryParamsRequest {
}
export interface QueryParamsRequestProtoMsg {
    typeUrl: "/klyraprotocol.stats.QueryParamsRequest";
    value: Uint8Array;
}
/** QueryParamsRequest is a request type for the Params RPC method. */
export interface QueryParamsRequestAmino {
}
export interface QueryParamsRequestAminoMsg {
    type: "/klyraprotocol.stats.QueryParamsRequest";
    value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is a request type for the Params RPC method. */
export interface QueryParamsRequestSDKType {
}
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
export interface QueryStatsMetadataRequest {
}
export interface QueryStatsMetadataRequestProtoMsg {
    typeUrl: "/klyraprotocol.stats.QueryStatsMetadataRequest";
    value: Uint8Array;
}
/** QueryStatsMetadataRequest is a request type for the StatsMetadata RPC method. */
export interface QueryStatsMetadataRequestAmino {
}
export interface QueryStatsMetadataRequestAminoMsg {
    type: "/klyraprotocol.stats.QueryStatsMetadataRequest";
    value: QueryStatsMetadataRequestAmino;
}
/** QueryStatsMetadataRequest is a request type for the StatsMetadata RPC method. */
export interface QueryStatsMetadataRequestSDKType {
}
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
export interface QueryGlobalStatsRequest {
}
export interface QueryGlobalStatsRequestProtoMsg {
    typeUrl: "/klyraprotocol.stats.QueryGlobalStatsRequest";
    value: Uint8Array;
}
/** QueryGlobalStatsRequest is a request type for the GlobalStats RPC method. */
export interface QueryGlobalStatsRequestAmino {
}
export interface QueryGlobalStatsRequestAminoMsg {
    type: "/klyraprotocol.stats.QueryGlobalStatsRequest";
    value: QueryGlobalStatsRequestAmino;
}
/** QueryGlobalStatsRequest is a request type for the GlobalStats RPC method. */
export interface QueryGlobalStatsRequestSDKType {
}
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
export declare const QueryStatsMetadataRequest: {
    typeUrl: string;
    is(o: any): o is QueryStatsMetadataRequest;
    isSDK(o: any): o is QueryStatsMetadataRequestSDKType;
    isAmino(o: any): o is QueryStatsMetadataRequestAmino;
    encode(_: QueryStatsMetadataRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryStatsMetadataRequest;
    fromPartial(_: Partial<QueryStatsMetadataRequest>): QueryStatsMetadataRequest;
    fromAmino(_: QueryStatsMetadataRequestAmino): QueryStatsMetadataRequest;
    toAmino(_: QueryStatsMetadataRequest): QueryStatsMetadataRequestAmino;
    fromAminoMsg(object: QueryStatsMetadataRequestAminoMsg): QueryStatsMetadataRequest;
    fromProtoMsg(message: QueryStatsMetadataRequestProtoMsg): QueryStatsMetadataRequest;
    toProto(message: QueryStatsMetadataRequest): Uint8Array;
    toProtoMsg(message: QueryStatsMetadataRequest): QueryStatsMetadataRequestProtoMsg;
};
export declare const QueryStatsMetadataResponse: {
    typeUrl: string;
    is(o: any): o is QueryStatsMetadataResponse;
    isSDK(o: any): o is QueryStatsMetadataResponseSDKType;
    isAmino(o: any): o is QueryStatsMetadataResponseAmino;
    encode(message: QueryStatsMetadataResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryStatsMetadataResponse;
    fromPartial(object: Partial<QueryStatsMetadataResponse>): QueryStatsMetadataResponse;
    fromAmino(object: QueryStatsMetadataResponseAmino): QueryStatsMetadataResponse;
    toAmino(message: QueryStatsMetadataResponse): QueryStatsMetadataResponseAmino;
    fromAminoMsg(object: QueryStatsMetadataResponseAminoMsg): QueryStatsMetadataResponse;
    fromProtoMsg(message: QueryStatsMetadataResponseProtoMsg): QueryStatsMetadataResponse;
    toProto(message: QueryStatsMetadataResponse): Uint8Array;
    toProtoMsg(message: QueryStatsMetadataResponse): QueryStatsMetadataResponseProtoMsg;
};
export declare const QueryGlobalStatsRequest: {
    typeUrl: string;
    is(o: any): o is QueryGlobalStatsRequest;
    isSDK(o: any): o is QueryGlobalStatsRequestSDKType;
    isAmino(o: any): o is QueryGlobalStatsRequestAmino;
    encode(_: QueryGlobalStatsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryGlobalStatsRequest;
    fromPartial(_: Partial<QueryGlobalStatsRequest>): QueryGlobalStatsRequest;
    fromAmino(_: QueryGlobalStatsRequestAmino): QueryGlobalStatsRequest;
    toAmino(_: QueryGlobalStatsRequest): QueryGlobalStatsRequestAmino;
    fromAminoMsg(object: QueryGlobalStatsRequestAminoMsg): QueryGlobalStatsRequest;
    fromProtoMsg(message: QueryGlobalStatsRequestProtoMsg): QueryGlobalStatsRequest;
    toProto(message: QueryGlobalStatsRequest): Uint8Array;
    toProtoMsg(message: QueryGlobalStatsRequest): QueryGlobalStatsRequestProtoMsg;
};
export declare const QueryGlobalStatsResponse: {
    typeUrl: string;
    is(o: any): o is QueryGlobalStatsResponse;
    isSDK(o: any): o is QueryGlobalStatsResponseSDKType;
    isAmino(o: any): o is QueryGlobalStatsResponseAmino;
    encode(message: QueryGlobalStatsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryGlobalStatsResponse;
    fromPartial(object: Partial<QueryGlobalStatsResponse>): QueryGlobalStatsResponse;
    fromAmino(object: QueryGlobalStatsResponseAmino): QueryGlobalStatsResponse;
    toAmino(message: QueryGlobalStatsResponse): QueryGlobalStatsResponseAmino;
    fromAminoMsg(object: QueryGlobalStatsResponseAminoMsg): QueryGlobalStatsResponse;
    fromProtoMsg(message: QueryGlobalStatsResponseProtoMsg): QueryGlobalStatsResponse;
    toProto(message: QueryGlobalStatsResponse): Uint8Array;
    toProtoMsg(message: QueryGlobalStatsResponse): QueryGlobalStatsResponseProtoMsg;
};
export declare const QueryUserStatsRequest: {
    typeUrl: string;
    is(o: any): o is QueryUserStatsRequest;
    isSDK(o: any): o is QueryUserStatsRequestSDKType;
    isAmino(o: any): o is QueryUserStatsRequestAmino;
    encode(message: QueryUserStatsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryUserStatsRequest;
    fromPartial(object: Partial<QueryUserStatsRequest>): QueryUserStatsRequest;
    fromAmino(object: QueryUserStatsRequestAmino): QueryUserStatsRequest;
    toAmino(message: QueryUserStatsRequest): QueryUserStatsRequestAmino;
    fromAminoMsg(object: QueryUserStatsRequestAminoMsg): QueryUserStatsRequest;
    fromProtoMsg(message: QueryUserStatsRequestProtoMsg): QueryUserStatsRequest;
    toProto(message: QueryUserStatsRequest): Uint8Array;
    toProtoMsg(message: QueryUserStatsRequest): QueryUserStatsRequestProtoMsg;
};
export declare const QueryUserStatsResponse: {
    typeUrl: string;
    is(o: any): o is QueryUserStatsResponse;
    isSDK(o: any): o is QueryUserStatsResponseSDKType;
    isAmino(o: any): o is QueryUserStatsResponseAmino;
    encode(message: QueryUserStatsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryUserStatsResponse;
    fromPartial(object: Partial<QueryUserStatsResponse>): QueryUserStatsResponse;
    fromAmino(object: QueryUserStatsResponseAmino): QueryUserStatsResponse;
    toAmino(message: QueryUserStatsResponse): QueryUserStatsResponseAmino;
    fromAminoMsg(object: QueryUserStatsResponseAminoMsg): QueryUserStatsResponse;
    fromProtoMsg(message: QueryUserStatsResponseProtoMsg): QueryUserStatsResponse;
    toProto(message: QueryUserStatsResponse): Uint8Array;
    toProtoMsg(message: QueryUserStatsResponse): QueryUserStatsResponseProtoMsg;
};
