import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { EpochInfo, EpochInfoAmino, EpochInfoSDKType } from "./epoch_info";
import { BinaryReader, BinaryWriter } from "../../binary";
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
export declare const QueryGetEpochInfoRequest: {
    typeUrl: string;
    is(o: any): o is QueryGetEpochInfoRequest;
    isSDK(o: any): o is QueryGetEpochInfoRequestSDKType;
    isAmino(o: any): o is QueryGetEpochInfoRequestAmino;
    encode(message: QueryGetEpochInfoRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryGetEpochInfoRequest;
    fromPartial(object: Partial<QueryGetEpochInfoRequest>): QueryGetEpochInfoRequest;
    fromAmino(object: QueryGetEpochInfoRequestAmino): QueryGetEpochInfoRequest;
    toAmino(message: QueryGetEpochInfoRequest): QueryGetEpochInfoRequestAmino;
    fromAminoMsg(object: QueryGetEpochInfoRequestAminoMsg): QueryGetEpochInfoRequest;
    fromProtoMsg(message: QueryGetEpochInfoRequestProtoMsg): QueryGetEpochInfoRequest;
    toProto(message: QueryGetEpochInfoRequest): Uint8Array;
    toProtoMsg(message: QueryGetEpochInfoRequest): QueryGetEpochInfoRequestProtoMsg;
};
export declare const QueryEpochInfoResponse: {
    typeUrl: string;
    is(o: any): o is QueryEpochInfoResponse;
    isSDK(o: any): o is QueryEpochInfoResponseSDKType;
    isAmino(o: any): o is QueryEpochInfoResponseAmino;
    encode(message: QueryEpochInfoResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryEpochInfoResponse;
    fromPartial(object: Partial<QueryEpochInfoResponse>): QueryEpochInfoResponse;
    fromAmino(object: QueryEpochInfoResponseAmino): QueryEpochInfoResponse;
    toAmino(message: QueryEpochInfoResponse): QueryEpochInfoResponseAmino;
    fromAminoMsg(object: QueryEpochInfoResponseAminoMsg): QueryEpochInfoResponse;
    fromProtoMsg(message: QueryEpochInfoResponseProtoMsg): QueryEpochInfoResponse;
    toProto(message: QueryEpochInfoResponse): Uint8Array;
    toProtoMsg(message: QueryEpochInfoResponse): QueryEpochInfoResponseProtoMsg;
};
export declare const QueryAllEpochInfoRequest: {
    typeUrl: string;
    is(o: any): o is QueryAllEpochInfoRequest;
    isSDK(o: any): o is QueryAllEpochInfoRequestSDKType;
    isAmino(o: any): o is QueryAllEpochInfoRequestAmino;
    encode(message: QueryAllEpochInfoRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllEpochInfoRequest;
    fromPartial(object: Partial<QueryAllEpochInfoRequest>): QueryAllEpochInfoRequest;
    fromAmino(object: QueryAllEpochInfoRequestAmino): QueryAllEpochInfoRequest;
    toAmino(message: QueryAllEpochInfoRequest): QueryAllEpochInfoRequestAmino;
    fromAminoMsg(object: QueryAllEpochInfoRequestAminoMsg): QueryAllEpochInfoRequest;
    fromProtoMsg(message: QueryAllEpochInfoRequestProtoMsg): QueryAllEpochInfoRequest;
    toProto(message: QueryAllEpochInfoRequest): Uint8Array;
    toProtoMsg(message: QueryAllEpochInfoRequest): QueryAllEpochInfoRequestProtoMsg;
};
export declare const QueryEpochInfoAllResponse: {
    typeUrl: string;
    is(o: any): o is QueryEpochInfoAllResponse;
    isSDK(o: any): o is QueryEpochInfoAllResponseSDKType;
    isAmino(o: any): o is QueryEpochInfoAllResponseAmino;
    encode(message: QueryEpochInfoAllResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryEpochInfoAllResponse;
    fromPartial(object: Partial<QueryEpochInfoAllResponse>): QueryEpochInfoAllResponse;
    fromAmino(object: QueryEpochInfoAllResponseAmino): QueryEpochInfoAllResponse;
    toAmino(message: QueryEpochInfoAllResponse): QueryEpochInfoAllResponseAmino;
    fromAminoMsg(object: QueryEpochInfoAllResponseAminoMsg): QueryEpochInfoAllResponse;
    fromProtoMsg(message: QueryEpochInfoAllResponseProtoMsg): QueryEpochInfoAllResponse;
    toProto(message: QueryEpochInfoAllResponse): Uint8Array;
    toProtoMsg(message: QueryEpochInfoAllResponse): QueryEpochInfoAllResponseProtoMsg;
};
