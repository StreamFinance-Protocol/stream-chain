import { LimitParams, LimitParamsAmino, LimitParamsSDKType } from "./limit_params";
import { LimiterCapacity, LimiterCapacityAmino, LimiterCapacitySDKType } from "./capacity";
import { PendingSendPacket, PendingSendPacketAmino, PendingSendPacketSDKType } from "./pending_send_packet";
import { BinaryReader, BinaryWriter } from "../../binary";
/** ListLimitParamsRequest is a request type of the ListLimitParams RPC method. */
export interface ListLimitParamsRequest {
}
export interface ListLimitParamsRequestProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsRequest";
    value: Uint8Array;
}
/** ListLimitParamsRequest is a request type of the ListLimitParams RPC method. */
export interface ListLimitParamsRequestAmino {
}
export interface ListLimitParamsRequestAminoMsg {
    type: "/klyraprotocol.ratelimit.ListLimitParamsRequest";
    value: ListLimitParamsRequestAmino;
}
/** ListLimitParamsRequest is a request type of the ListLimitParams RPC method. */
export interface ListLimitParamsRequestSDKType {
}
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
export interface QueryAllPendingSendPacketsRequest {
}
export interface QueryAllPendingSendPacketsRequestProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsRequest";
    value: Uint8Array;
}
/**
 * QueryAllPendingSendPacketsRequest is a request type for the
 * AllPendingSendPackets RPC
 */
export interface QueryAllPendingSendPacketsRequestAmino {
}
export interface QueryAllPendingSendPacketsRequestAminoMsg {
    type: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsRequest";
    value: QueryAllPendingSendPacketsRequestAmino;
}
/**
 * QueryAllPendingSendPacketsRequest is a request type for the
 * AllPendingSendPackets RPC
 */
export interface QueryAllPendingSendPacketsRequestSDKType {
}
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
export interface GetSDAIPriceQueryRequest {
}
export interface GetSDAIPriceQueryRequestProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryRequest";
    value: Uint8Array;
}
/** GetSDAIPriceRequest is a request type for the GetSDAIPrice RPC method. */
export interface GetSDAIPriceQueryRequestAmino {
}
export interface GetSDAIPriceQueryRequestAminoMsg {
    type: "/klyraprotocol.ratelimit.GetSDAIPriceQueryRequest";
    value: GetSDAIPriceQueryRequestAmino;
}
/** GetSDAIPriceRequest is a request type for the GetSDAIPrice RPC method. */
export interface GetSDAIPriceQueryRequestSDKType {
}
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
export interface GetAssetYieldIndexQueryRequest {
}
export interface GetAssetYieldIndexQueryRequestProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryRequest";
    value: Uint8Array;
}
/**
 * GetAssetYieldIndexRequest is a request type for the GetAssetYieldIndex RPC
 * method.
 */
export interface GetAssetYieldIndexQueryRequestAmino {
}
export interface GetAssetYieldIndexQueryRequestAminoMsg {
    type: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryRequest";
    value: GetAssetYieldIndexQueryRequestAmino;
}
/**
 * GetAssetYieldIndexRequest is a request type for the GetAssetYieldIndex RPC
 * method.
 */
export interface GetAssetYieldIndexQueryRequestSDKType {
}
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
export declare const ListLimitParamsRequest: {
    typeUrl: string;
    is(o: any): o is ListLimitParamsRequest;
    isSDK(o: any): o is ListLimitParamsRequestSDKType;
    isAmino(o: any): o is ListLimitParamsRequestAmino;
    encode(_: ListLimitParamsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ListLimitParamsRequest;
    fromPartial(_: Partial<ListLimitParamsRequest>): ListLimitParamsRequest;
    fromAmino(_: ListLimitParamsRequestAmino): ListLimitParamsRequest;
    toAmino(_: ListLimitParamsRequest): ListLimitParamsRequestAmino;
    fromAminoMsg(object: ListLimitParamsRequestAminoMsg): ListLimitParamsRequest;
    fromProtoMsg(message: ListLimitParamsRequestProtoMsg): ListLimitParamsRequest;
    toProto(message: ListLimitParamsRequest): Uint8Array;
    toProtoMsg(message: ListLimitParamsRequest): ListLimitParamsRequestProtoMsg;
};
export declare const ListLimitParamsResponse: {
    typeUrl: string;
    is(o: any): o is ListLimitParamsResponse;
    isSDK(o: any): o is ListLimitParamsResponseSDKType;
    isAmino(o: any): o is ListLimitParamsResponseAmino;
    encode(message: ListLimitParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ListLimitParamsResponse;
    fromPartial(object: Partial<ListLimitParamsResponse>): ListLimitParamsResponse;
    fromAmino(object: ListLimitParamsResponseAmino): ListLimitParamsResponse;
    toAmino(message: ListLimitParamsResponse): ListLimitParamsResponseAmino;
    fromAminoMsg(object: ListLimitParamsResponseAminoMsg): ListLimitParamsResponse;
    fromProtoMsg(message: ListLimitParamsResponseProtoMsg): ListLimitParamsResponse;
    toProto(message: ListLimitParamsResponse): Uint8Array;
    toProtoMsg(message: ListLimitParamsResponse): ListLimitParamsResponseProtoMsg;
};
export declare const QueryCapacityByDenomRequest: {
    typeUrl: string;
    is(o: any): o is QueryCapacityByDenomRequest;
    isSDK(o: any): o is QueryCapacityByDenomRequestSDKType;
    isAmino(o: any): o is QueryCapacityByDenomRequestAmino;
    encode(message: QueryCapacityByDenomRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryCapacityByDenomRequest;
    fromPartial(object: Partial<QueryCapacityByDenomRequest>): QueryCapacityByDenomRequest;
    fromAmino(object: QueryCapacityByDenomRequestAmino): QueryCapacityByDenomRequest;
    toAmino(message: QueryCapacityByDenomRequest): QueryCapacityByDenomRequestAmino;
    fromAminoMsg(object: QueryCapacityByDenomRequestAminoMsg): QueryCapacityByDenomRequest;
    fromProtoMsg(message: QueryCapacityByDenomRequestProtoMsg): QueryCapacityByDenomRequest;
    toProto(message: QueryCapacityByDenomRequest): Uint8Array;
    toProtoMsg(message: QueryCapacityByDenomRequest): QueryCapacityByDenomRequestProtoMsg;
};
export declare const QueryCapacityByDenomResponse: {
    typeUrl: string;
    is(o: any): o is QueryCapacityByDenomResponse;
    isSDK(o: any): o is QueryCapacityByDenomResponseSDKType;
    isAmino(o: any): o is QueryCapacityByDenomResponseAmino;
    encode(message: QueryCapacityByDenomResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryCapacityByDenomResponse;
    fromPartial(object: Partial<QueryCapacityByDenomResponse>): QueryCapacityByDenomResponse;
    fromAmino(object: QueryCapacityByDenomResponseAmino): QueryCapacityByDenomResponse;
    toAmino(message: QueryCapacityByDenomResponse): QueryCapacityByDenomResponseAmino;
    fromAminoMsg(object: QueryCapacityByDenomResponseAminoMsg): QueryCapacityByDenomResponse;
    fromProtoMsg(message: QueryCapacityByDenomResponseProtoMsg): QueryCapacityByDenomResponse;
    toProto(message: QueryCapacityByDenomResponse): Uint8Array;
    toProtoMsg(message: QueryCapacityByDenomResponse): QueryCapacityByDenomResponseProtoMsg;
};
export declare const QueryAllPendingSendPacketsRequest: {
    typeUrl: string;
    is(o: any): o is QueryAllPendingSendPacketsRequest;
    isSDK(o: any): o is QueryAllPendingSendPacketsRequestSDKType;
    isAmino(o: any): o is QueryAllPendingSendPacketsRequestAmino;
    encode(_: QueryAllPendingSendPacketsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllPendingSendPacketsRequest;
    fromPartial(_: Partial<QueryAllPendingSendPacketsRequest>): QueryAllPendingSendPacketsRequest;
    fromAmino(_: QueryAllPendingSendPacketsRequestAmino): QueryAllPendingSendPacketsRequest;
    toAmino(_: QueryAllPendingSendPacketsRequest): QueryAllPendingSendPacketsRequestAmino;
    fromAminoMsg(object: QueryAllPendingSendPacketsRequestAminoMsg): QueryAllPendingSendPacketsRequest;
    fromProtoMsg(message: QueryAllPendingSendPacketsRequestProtoMsg): QueryAllPendingSendPacketsRequest;
    toProto(message: QueryAllPendingSendPacketsRequest): Uint8Array;
    toProtoMsg(message: QueryAllPendingSendPacketsRequest): QueryAllPendingSendPacketsRequestProtoMsg;
};
export declare const QueryAllPendingSendPacketsResponse: {
    typeUrl: string;
    is(o: any): o is QueryAllPendingSendPacketsResponse;
    isSDK(o: any): o is QueryAllPendingSendPacketsResponseSDKType;
    isAmino(o: any): o is QueryAllPendingSendPacketsResponseAmino;
    encode(message: QueryAllPendingSendPacketsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllPendingSendPacketsResponse;
    fromPartial(object: Partial<QueryAllPendingSendPacketsResponse>): QueryAllPendingSendPacketsResponse;
    fromAmino(object: QueryAllPendingSendPacketsResponseAmino): QueryAllPendingSendPacketsResponse;
    toAmino(message: QueryAllPendingSendPacketsResponse): QueryAllPendingSendPacketsResponseAmino;
    fromAminoMsg(object: QueryAllPendingSendPacketsResponseAminoMsg): QueryAllPendingSendPacketsResponse;
    fromProtoMsg(message: QueryAllPendingSendPacketsResponseProtoMsg): QueryAllPendingSendPacketsResponse;
    toProto(message: QueryAllPendingSendPacketsResponse): Uint8Array;
    toProtoMsg(message: QueryAllPendingSendPacketsResponse): QueryAllPendingSendPacketsResponseProtoMsg;
};
export declare const GetSDAIPriceQueryRequest: {
    typeUrl: string;
    is(o: any): o is GetSDAIPriceQueryRequest;
    isSDK(o: any): o is GetSDAIPriceQueryRequestSDKType;
    isAmino(o: any): o is GetSDAIPriceQueryRequestAmino;
    encode(_: GetSDAIPriceQueryRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GetSDAIPriceQueryRequest;
    fromPartial(_: Partial<GetSDAIPriceQueryRequest>): GetSDAIPriceQueryRequest;
    fromAmino(_: GetSDAIPriceQueryRequestAmino): GetSDAIPriceQueryRequest;
    toAmino(_: GetSDAIPriceQueryRequest): GetSDAIPriceQueryRequestAmino;
    fromAminoMsg(object: GetSDAIPriceQueryRequestAminoMsg): GetSDAIPriceQueryRequest;
    fromProtoMsg(message: GetSDAIPriceQueryRequestProtoMsg): GetSDAIPriceQueryRequest;
    toProto(message: GetSDAIPriceQueryRequest): Uint8Array;
    toProtoMsg(message: GetSDAIPriceQueryRequest): GetSDAIPriceQueryRequestProtoMsg;
};
export declare const GetSDAIPriceQueryResponse: {
    typeUrl: string;
    is(o: any): o is GetSDAIPriceQueryResponse;
    isSDK(o: any): o is GetSDAIPriceQueryResponseSDKType;
    isAmino(o: any): o is GetSDAIPriceQueryResponseAmino;
    encode(message: GetSDAIPriceQueryResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GetSDAIPriceQueryResponse;
    fromPartial(object: Partial<GetSDAIPriceQueryResponse>): GetSDAIPriceQueryResponse;
    fromAmino(object: GetSDAIPriceQueryResponseAmino): GetSDAIPriceQueryResponse;
    toAmino(message: GetSDAIPriceQueryResponse): GetSDAIPriceQueryResponseAmino;
    fromAminoMsg(object: GetSDAIPriceQueryResponseAminoMsg): GetSDAIPriceQueryResponse;
    fromProtoMsg(message: GetSDAIPriceQueryResponseProtoMsg): GetSDAIPriceQueryResponse;
    toProto(message: GetSDAIPriceQueryResponse): Uint8Array;
    toProtoMsg(message: GetSDAIPriceQueryResponse): GetSDAIPriceQueryResponseProtoMsg;
};
export declare const GetAssetYieldIndexQueryRequest: {
    typeUrl: string;
    is(o: any): o is GetAssetYieldIndexQueryRequest;
    isSDK(o: any): o is GetAssetYieldIndexQueryRequestSDKType;
    isAmino(o: any): o is GetAssetYieldIndexQueryRequestAmino;
    encode(_: GetAssetYieldIndexQueryRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GetAssetYieldIndexQueryRequest;
    fromPartial(_: Partial<GetAssetYieldIndexQueryRequest>): GetAssetYieldIndexQueryRequest;
    fromAmino(_: GetAssetYieldIndexQueryRequestAmino): GetAssetYieldIndexQueryRequest;
    toAmino(_: GetAssetYieldIndexQueryRequest): GetAssetYieldIndexQueryRequestAmino;
    fromAminoMsg(object: GetAssetYieldIndexQueryRequestAminoMsg): GetAssetYieldIndexQueryRequest;
    fromProtoMsg(message: GetAssetYieldIndexQueryRequestProtoMsg): GetAssetYieldIndexQueryRequest;
    toProto(message: GetAssetYieldIndexQueryRequest): Uint8Array;
    toProtoMsg(message: GetAssetYieldIndexQueryRequest): GetAssetYieldIndexQueryRequestProtoMsg;
};
export declare const GetAssetYieldIndexQueryResponse: {
    typeUrl: string;
    is(o: any): o is GetAssetYieldIndexQueryResponse;
    isSDK(o: any): o is GetAssetYieldIndexQueryResponseSDKType;
    isAmino(o: any): o is GetAssetYieldIndexQueryResponseAmino;
    encode(message: GetAssetYieldIndexQueryResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GetAssetYieldIndexQueryResponse;
    fromPartial(object: Partial<GetAssetYieldIndexQueryResponse>): GetAssetYieldIndexQueryResponse;
    fromAmino(object: GetAssetYieldIndexQueryResponseAmino): GetAssetYieldIndexQueryResponse;
    toAmino(message: GetAssetYieldIndexQueryResponse): GetAssetYieldIndexQueryResponseAmino;
    fromAminoMsg(object: GetAssetYieldIndexQueryResponseAminoMsg): GetAssetYieldIndexQueryResponse;
    fromProtoMsg(message: GetAssetYieldIndexQueryResponseProtoMsg): GetAssetYieldIndexQueryResponse;
    toProto(message: GetAssetYieldIndexQueryResponse): Uint8Array;
    toProtoMsg(message: GetAssetYieldIndexQueryResponse): GetAssetYieldIndexQueryResponseProtoMsg;
};
