import { DowntimeParams, DowntimeParamsAmino, DowntimeParamsSDKType } from "./params";
import { BlockInfo, BlockInfoAmino, BlockInfoSDKType, AllDowntimeInfo, AllDowntimeInfoAmino, AllDowntimeInfoSDKType } from "./blocktime";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * QueryDowntimeParamsRequest is a request type for the DowntimeParams
 * RPC method.
 */
export interface QueryDowntimeParamsRequest {
}
export interface QueryDowntimeParamsRequestProtoMsg {
    typeUrl: "/klyraprotocol.blocktime.QueryDowntimeParamsRequest";
    value: Uint8Array;
}
/**
 * QueryDowntimeParamsRequest is a request type for the DowntimeParams
 * RPC method.
 */
export interface QueryDowntimeParamsRequestAmino {
}
export interface QueryDowntimeParamsRequestAminoMsg {
    type: "/klyraprotocol.blocktime.QueryDowntimeParamsRequest";
    value: QueryDowntimeParamsRequestAmino;
}
/**
 * QueryDowntimeParamsRequest is a request type for the DowntimeParams
 * RPC method.
 */
export interface QueryDowntimeParamsRequestSDKType {
}
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
export interface QueryPreviousBlockInfoRequest {
}
export interface QueryPreviousBlockInfoRequestProtoMsg {
    typeUrl: "/klyraprotocol.blocktime.QueryPreviousBlockInfoRequest";
    value: Uint8Array;
}
/**
 * QueryPreviousBlockInfoRequest is a request type for the PreviousBlockInfo
 * RPC method.
 */
export interface QueryPreviousBlockInfoRequestAmino {
}
export interface QueryPreviousBlockInfoRequestAminoMsg {
    type: "/klyraprotocol.blocktime.QueryPreviousBlockInfoRequest";
    value: QueryPreviousBlockInfoRequestAmino;
}
/**
 * QueryPreviousBlockInfoRequest is a request type for the PreviousBlockInfo
 * RPC method.
 */
export interface QueryPreviousBlockInfoRequestSDKType {
}
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
export interface QueryAllDowntimeInfoRequest {
}
export interface QueryAllDowntimeInfoRequestProtoMsg {
    typeUrl: "/klyraprotocol.blocktime.QueryAllDowntimeInfoRequest";
    value: Uint8Array;
}
/**
 * QueryAllDowntimeInfoRequest is a request type for the AllDowntimeInfo
 * RPC method.
 */
export interface QueryAllDowntimeInfoRequestAmino {
}
export interface QueryAllDowntimeInfoRequestAminoMsg {
    type: "/klyraprotocol.blocktime.QueryAllDowntimeInfoRequest";
    value: QueryAllDowntimeInfoRequestAmino;
}
/**
 * QueryAllDowntimeInfoRequest is a request type for the AllDowntimeInfo
 * RPC method.
 */
export interface QueryAllDowntimeInfoRequestSDKType {
}
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
export declare const QueryDowntimeParamsRequest: {
    typeUrl: string;
    is(o: any): o is QueryDowntimeParamsRequest;
    isSDK(o: any): o is QueryDowntimeParamsRequestSDKType;
    isAmino(o: any): o is QueryDowntimeParamsRequestAmino;
    encode(_: QueryDowntimeParamsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryDowntimeParamsRequest;
    fromPartial(_: Partial<QueryDowntimeParamsRequest>): QueryDowntimeParamsRequest;
    fromAmino(_: QueryDowntimeParamsRequestAmino): QueryDowntimeParamsRequest;
    toAmino(_: QueryDowntimeParamsRequest): QueryDowntimeParamsRequestAmino;
    fromAminoMsg(object: QueryDowntimeParamsRequestAminoMsg): QueryDowntimeParamsRequest;
    fromProtoMsg(message: QueryDowntimeParamsRequestProtoMsg): QueryDowntimeParamsRequest;
    toProto(message: QueryDowntimeParamsRequest): Uint8Array;
    toProtoMsg(message: QueryDowntimeParamsRequest): QueryDowntimeParamsRequestProtoMsg;
};
export declare const QueryDowntimeParamsResponse: {
    typeUrl: string;
    is(o: any): o is QueryDowntimeParamsResponse;
    isSDK(o: any): o is QueryDowntimeParamsResponseSDKType;
    isAmino(o: any): o is QueryDowntimeParamsResponseAmino;
    encode(message: QueryDowntimeParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryDowntimeParamsResponse;
    fromPartial(object: Partial<QueryDowntimeParamsResponse>): QueryDowntimeParamsResponse;
    fromAmino(object: QueryDowntimeParamsResponseAmino): QueryDowntimeParamsResponse;
    toAmino(message: QueryDowntimeParamsResponse): QueryDowntimeParamsResponseAmino;
    fromAminoMsg(object: QueryDowntimeParamsResponseAminoMsg): QueryDowntimeParamsResponse;
    fromProtoMsg(message: QueryDowntimeParamsResponseProtoMsg): QueryDowntimeParamsResponse;
    toProto(message: QueryDowntimeParamsResponse): Uint8Array;
    toProtoMsg(message: QueryDowntimeParamsResponse): QueryDowntimeParamsResponseProtoMsg;
};
export declare const QueryPreviousBlockInfoRequest: {
    typeUrl: string;
    is(o: any): o is QueryPreviousBlockInfoRequest;
    isSDK(o: any): o is QueryPreviousBlockInfoRequestSDKType;
    isAmino(o: any): o is QueryPreviousBlockInfoRequestAmino;
    encode(_: QueryPreviousBlockInfoRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryPreviousBlockInfoRequest;
    fromPartial(_: Partial<QueryPreviousBlockInfoRequest>): QueryPreviousBlockInfoRequest;
    fromAmino(_: QueryPreviousBlockInfoRequestAmino): QueryPreviousBlockInfoRequest;
    toAmino(_: QueryPreviousBlockInfoRequest): QueryPreviousBlockInfoRequestAmino;
    fromAminoMsg(object: QueryPreviousBlockInfoRequestAminoMsg): QueryPreviousBlockInfoRequest;
    fromProtoMsg(message: QueryPreviousBlockInfoRequestProtoMsg): QueryPreviousBlockInfoRequest;
    toProto(message: QueryPreviousBlockInfoRequest): Uint8Array;
    toProtoMsg(message: QueryPreviousBlockInfoRequest): QueryPreviousBlockInfoRequestProtoMsg;
};
export declare const QueryPreviousBlockInfoResponse: {
    typeUrl: string;
    is(o: any): o is QueryPreviousBlockInfoResponse;
    isSDK(o: any): o is QueryPreviousBlockInfoResponseSDKType;
    isAmino(o: any): o is QueryPreviousBlockInfoResponseAmino;
    encode(message: QueryPreviousBlockInfoResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryPreviousBlockInfoResponse;
    fromPartial(object: Partial<QueryPreviousBlockInfoResponse>): QueryPreviousBlockInfoResponse;
    fromAmino(object: QueryPreviousBlockInfoResponseAmino): QueryPreviousBlockInfoResponse;
    toAmino(message: QueryPreviousBlockInfoResponse): QueryPreviousBlockInfoResponseAmino;
    fromAminoMsg(object: QueryPreviousBlockInfoResponseAminoMsg): QueryPreviousBlockInfoResponse;
    fromProtoMsg(message: QueryPreviousBlockInfoResponseProtoMsg): QueryPreviousBlockInfoResponse;
    toProto(message: QueryPreviousBlockInfoResponse): Uint8Array;
    toProtoMsg(message: QueryPreviousBlockInfoResponse): QueryPreviousBlockInfoResponseProtoMsg;
};
export declare const QueryAllDowntimeInfoRequest: {
    typeUrl: string;
    is(o: any): o is QueryAllDowntimeInfoRequest;
    isSDK(o: any): o is QueryAllDowntimeInfoRequestSDKType;
    isAmino(o: any): o is QueryAllDowntimeInfoRequestAmino;
    encode(_: QueryAllDowntimeInfoRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllDowntimeInfoRequest;
    fromPartial(_: Partial<QueryAllDowntimeInfoRequest>): QueryAllDowntimeInfoRequest;
    fromAmino(_: QueryAllDowntimeInfoRequestAmino): QueryAllDowntimeInfoRequest;
    toAmino(_: QueryAllDowntimeInfoRequest): QueryAllDowntimeInfoRequestAmino;
    fromAminoMsg(object: QueryAllDowntimeInfoRequestAminoMsg): QueryAllDowntimeInfoRequest;
    fromProtoMsg(message: QueryAllDowntimeInfoRequestProtoMsg): QueryAllDowntimeInfoRequest;
    toProto(message: QueryAllDowntimeInfoRequest): Uint8Array;
    toProtoMsg(message: QueryAllDowntimeInfoRequest): QueryAllDowntimeInfoRequestProtoMsg;
};
export declare const QueryAllDowntimeInfoResponse: {
    typeUrl: string;
    is(o: any): o is QueryAllDowntimeInfoResponse;
    isSDK(o: any): o is QueryAllDowntimeInfoResponseSDKType;
    isAmino(o: any): o is QueryAllDowntimeInfoResponseAmino;
    encode(message: QueryAllDowntimeInfoResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllDowntimeInfoResponse;
    fromPartial(object: Partial<QueryAllDowntimeInfoResponse>): QueryAllDowntimeInfoResponse;
    fromAmino(object: QueryAllDowntimeInfoResponseAmino): QueryAllDowntimeInfoResponse;
    toAmino(message: QueryAllDowntimeInfoResponse): QueryAllDowntimeInfoResponseAmino;
    fromAminoMsg(object: QueryAllDowntimeInfoResponseAminoMsg): QueryAllDowntimeInfoResponse;
    fromProtoMsg(message: QueryAllDowntimeInfoResponseProtoMsg): QueryAllDowntimeInfoResponse;
    toProto(message: QueryAllDowntimeInfoResponse): Uint8Array;
    toProtoMsg(message: QueryAllDowntimeInfoResponse): QueryAllDowntimeInfoResponseProtoMsg;
};
