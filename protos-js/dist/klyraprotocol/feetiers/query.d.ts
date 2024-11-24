import { PerpetualFeeParams, PerpetualFeeParamsAmino, PerpetualFeeParamsSDKType, PerpetualFeeTier, PerpetualFeeTierAmino, PerpetualFeeTierSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * QueryPerpetualFeeParamsRequest is a request type for the PerpetualFeeParams
 * RPC method.
 */
export interface QueryPerpetualFeeParamsRequest {
}
export interface QueryPerpetualFeeParamsRequestProtoMsg {
    typeUrl: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsRequest";
    value: Uint8Array;
}
/**
 * QueryPerpetualFeeParamsRequest is a request type for the PerpetualFeeParams
 * RPC method.
 */
export interface QueryPerpetualFeeParamsRequestAmino {
}
export interface QueryPerpetualFeeParamsRequestAminoMsg {
    type: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsRequest";
    value: QueryPerpetualFeeParamsRequestAmino;
}
/**
 * QueryPerpetualFeeParamsRequest is a request type for the PerpetualFeeParams
 * RPC method.
 */
export interface QueryPerpetualFeeParamsRequestSDKType {
}
/**
 * QueryPerpetualFeeParamsResponse is a response type for the PerpetualFeeParams
 * RPC method.
 */
export interface QueryPerpetualFeeParamsResponse {
    params: PerpetualFeeParams;
}
export interface QueryPerpetualFeeParamsResponseProtoMsg {
    typeUrl: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsResponse";
    value: Uint8Array;
}
/**
 * QueryPerpetualFeeParamsResponse is a response type for the PerpetualFeeParams
 * RPC method.
 */
export interface QueryPerpetualFeeParamsResponseAmino {
    params?: PerpetualFeeParamsAmino;
}
export interface QueryPerpetualFeeParamsResponseAminoMsg {
    type: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsResponse";
    value: QueryPerpetualFeeParamsResponseAmino;
}
/**
 * QueryPerpetualFeeParamsResponse is a response type for the PerpetualFeeParams
 * RPC method.
 */
export interface QueryPerpetualFeeParamsResponseSDKType {
    params: PerpetualFeeParamsSDKType;
}
/** QueryUserFeeTierRequest is a request type for the UserFeeTier RPC method. */
export interface QueryUserFeeTierRequest {
    user: string;
}
export interface QueryUserFeeTierRequestProtoMsg {
    typeUrl: "/klyraprotocol.feetiers.QueryUserFeeTierRequest";
    value: Uint8Array;
}
/** QueryUserFeeTierRequest is a request type for the UserFeeTier RPC method. */
export interface QueryUserFeeTierRequestAmino {
    user?: string;
}
export interface QueryUserFeeTierRequestAminoMsg {
    type: "/klyraprotocol.feetiers.QueryUserFeeTierRequest";
    value: QueryUserFeeTierRequestAmino;
}
/** QueryUserFeeTierRequest is a request type for the UserFeeTier RPC method. */
export interface QueryUserFeeTierRequestSDKType {
    user: string;
}
/** QueryUserFeeTierResponse is a request type for the UserFeeTier RPC method. */
export interface QueryUserFeeTierResponse {
    /** Index of the fee tier in the list queried from PerpetualFeeParams. */
    index: number;
    tier?: PerpetualFeeTier;
}
export interface QueryUserFeeTierResponseProtoMsg {
    typeUrl: "/klyraprotocol.feetiers.QueryUserFeeTierResponse";
    value: Uint8Array;
}
/** QueryUserFeeTierResponse is a request type for the UserFeeTier RPC method. */
export interface QueryUserFeeTierResponseAmino {
    /** Index of the fee tier in the list queried from PerpetualFeeParams. */
    index?: number;
    tier?: PerpetualFeeTierAmino;
}
export interface QueryUserFeeTierResponseAminoMsg {
    type: "/klyraprotocol.feetiers.QueryUserFeeTierResponse";
    value: QueryUserFeeTierResponseAmino;
}
/** QueryUserFeeTierResponse is a request type for the UserFeeTier RPC method. */
export interface QueryUserFeeTierResponseSDKType {
    index: number;
    tier?: PerpetualFeeTierSDKType;
}
export declare const QueryPerpetualFeeParamsRequest: {
    typeUrl: string;
    is(o: any): o is QueryPerpetualFeeParamsRequest;
    isSDK(o: any): o is QueryPerpetualFeeParamsRequestSDKType;
    isAmino(o: any): o is QueryPerpetualFeeParamsRequestAmino;
    encode(_: QueryPerpetualFeeParamsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpetualFeeParamsRequest;
    fromPartial(_: Partial<QueryPerpetualFeeParamsRequest>): QueryPerpetualFeeParamsRequest;
    fromAmino(_: QueryPerpetualFeeParamsRequestAmino): QueryPerpetualFeeParamsRequest;
    toAmino(_: QueryPerpetualFeeParamsRequest): QueryPerpetualFeeParamsRequestAmino;
    fromAminoMsg(object: QueryPerpetualFeeParamsRequestAminoMsg): QueryPerpetualFeeParamsRequest;
    fromProtoMsg(message: QueryPerpetualFeeParamsRequestProtoMsg): QueryPerpetualFeeParamsRequest;
    toProto(message: QueryPerpetualFeeParamsRequest): Uint8Array;
    toProtoMsg(message: QueryPerpetualFeeParamsRequest): QueryPerpetualFeeParamsRequestProtoMsg;
};
export declare const QueryPerpetualFeeParamsResponse: {
    typeUrl: string;
    is(o: any): o is QueryPerpetualFeeParamsResponse;
    isSDK(o: any): o is QueryPerpetualFeeParamsResponseSDKType;
    isAmino(o: any): o is QueryPerpetualFeeParamsResponseAmino;
    encode(message: QueryPerpetualFeeParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryPerpetualFeeParamsResponse;
    fromPartial(object: Partial<QueryPerpetualFeeParamsResponse>): QueryPerpetualFeeParamsResponse;
    fromAmino(object: QueryPerpetualFeeParamsResponseAmino): QueryPerpetualFeeParamsResponse;
    toAmino(message: QueryPerpetualFeeParamsResponse): QueryPerpetualFeeParamsResponseAmino;
    fromAminoMsg(object: QueryPerpetualFeeParamsResponseAminoMsg): QueryPerpetualFeeParamsResponse;
    fromProtoMsg(message: QueryPerpetualFeeParamsResponseProtoMsg): QueryPerpetualFeeParamsResponse;
    toProto(message: QueryPerpetualFeeParamsResponse): Uint8Array;
    toProtoMsg(message: QueryPerpetualFeeParamsResponse): QueryPerpetualFeeParamsResponseProtoMsg;
};
export declare const QueryUserFeeTierRequest: {
    typeUrl: string;
    is(o: any): o is QueryUserFeeTierRequest;
    isSDK(o: any): o is QueryUserFeeTierRequestSDKType;
    isAmino(o: any): o is QueryUserFeeTierRequestAmino;
    encode(message: QueryUserFeeTierRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryUserFeeTierRequest;
    fromPartial(object: Partial<QueryUserFeeTierRequest>): QueryUserFeeTierRequest;
    fromAmino(object: QueryUserFeeTierRequestAmino): QueryUserFeeTierRequest;
    toAmino(message: QueryUserFeeTierRequest): QueryUserFeeTierRequestAmino;
    fromAminoMsg(object: QueryUserFeeTierRequestAminoMsg): QueryUserFeeTierRequest;
    fromProtoMsg(message: QueryUserFeeTierRequestProtoMsg): QueryUserFeeTierRequest;
    toProto(message: QueryUserFeeTierRequest): Uint8Array;
    toProtoMsg(message: QueryUserFeeTierRequest): QueryUserFeeTierRequestProtoMsg;
};
export declare const QueryUserFeeTierResponse: {
    typeUrl: string;
    is(o: any): o is QueryUserFeeTierResponse;
    isSDK(o: any): o is QueryUserFeeTierResponseSDKType;
    isAmino(o: any): o is QueryUserFeeTierResponseAmino;
    encode(message: QueryUserFeeTierResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryUserFeeTierResponse;
    fromPartial(object: Partial<QueryUserFeeTierResponse>): QueryUserFeeTierResponse;
    fromAmino(object: QueryUserFeeTierResponseAmino): QueryUserFeeTierResponse;
    toAmino(message: QueryUserFeeTierResponse): QueryUserFeeTierResponseAmino;
    fromAminoMsg(object: QueryUserFeeTierResponseAminoMsg): QueryUserFeeTierResponse;
    fromProtoMsg(message: QueryUserFeeTierResponseProtoMsg): QueryUserFeeTierResponse;
    toProto(message: QueryUserFeeTierResponse): Uint8Array;
    toProtoMsg(message: QueryUserFeeTierResponse): QueryUserFeeTierResponseProtoMsg;
};
