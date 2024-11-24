import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { MarketPrice, MarketPriceAmino, MarketPriceSDKType } from "./market_price";
import { MarketParam, MarketParamAmino, MarketParamSDKType } from "./market_param";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * QueryMarketPriceRequest is request type for the Query/Params `MarketPrice`
 * RPC method.
 */
export interface QueryMarketPriceRequest {
    id: number;
}
export interface QueryMarketPriceRequestProtoMsg {
    typeUrl: "/klyraprotocol.prices.QueryMarketPriceRequest";
    value: Uint8Array;
}
/**
 * QueryMarketPriceRequest is request type for the Query/Params `MarketPrice`
 * RPC method.
 */
export interface QueryMarketPriceRequestAmino {
    id?: number;
}
export interface QueryMarketPriceRequestAminoMsg {
    type: "/klyraprotocol.prices.QueryMarketPriceRequest";
    value: QueryMarketPriceRequestAmino;
}
/**
 * QueryMarketPriceRequest is request type for the Query/Params `MarketPrice`
 * RPC method.
 */
export interface QueryMarketPriceRequestSDKType {
    id: number;
}
/**
 * QueryMarketPriceResponse is response type for the Query/Params `MarketPrice`
 * RPC method.
 */
export interface QueryMarketPriceResponse {
    marketPrice: MarketPrice;
}
export interface QueryMarketPriceResponseProtoMsg {
    typeUrl: "/klyraprotocol.prices.QueryMarketPriceResponse";
    value: Uint8Array;
}
/**
 * QueryMarketPriceResponse is response type for the Query/Params `MarketPrice`
 * RPC method.
 */
export interface QueryMarketPriceResponseAmino {
    market_price?: MarketPriceAmino;
}
export interface QueryMarketPriceResponseAminoMsg {
    type: "/klyraprotocol.prices.QueryMarketPriceResponse";
    value: QueryMarketPriceResponseAmino;
}
/**
 * QueryMarketPriceResponse is response type for the Query/Params `MarketPrice`
 * RPC method.
 */
export interface QueryMarketPriceResponseSDKType {
    market_price: MarketPriceSDKType;
}
/**
 * QueryAllMarketPricesRequest is request type for the Query/Params
 * `AllMarketPrices` RPC method.
 */
export interface QueryAllMarketPricesRequest {
    pagination?: PageRequest;
}
export interface QueryAllMarketPricesRequestProtoMsg {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketPricesRequest";
    value: Uint8Array;
}
/**
 * QueryAllMarketPricesRequest is request type for the Query/Params
 * `AllMarketPrices` RPC method.
 */
export interface QueryAllMarketPricesRequestAmino {
    pagination?: PageRequestAmino;
}
export interface QueryAllMarketPricesRequestAminoMsg {
    type: "/klyraprotocol.prices.QueryAllMarketPricesRequest";
    value: QueryAllMarketPricesRequestAmino;
}
/**
 * QueryAllMarketPricesRequest is request type for the Query/Params
 * `AllMarketPrices` RPC method.
 */
export interface QueryAllMarketPricesRequestSDKType {
    pagination?: PageRequestSDKType;
}
/**
 * QueryAllMarketPricesResponse is response type for the Query/Params
 * `AllMarketPrices` RPC method.
 */
export interface QueryAllMarketPricesResponse {
    marketPrices: MarketPrice[];
    pagination?: PageResponse;
}
export interface QueryAllMarketPricesResponseProtoMsg {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketPricesResponse";
    value: Uint8Array;
}
/**
 * QueryAllMarketPricesResponse is response type for the Query/Params
 * `AllMarketPrices` RPC method.
 */
export interface QueryAllMarketPricesResponseAmino {
    market_prices?: MarketPriceAmino[];
    pagination?: PageResponseAmino;
}
export interface QueryAllMarketPricesResponseAminoMsg {
    type: "/klyraprotocol.prices.QueryAllMarketPricesResponse";
    value: QueryAllMarketPricesResponseAmino;
}
/**
 * QueryAllMarketPricesResponse is response type for the Query/Params
 * `AllMarketPrices` RPC method.
 */
export interface QueryAllMarketPricesResponseSDKType {
    market_prices: MarketPriceSDKType[];
    pagination?: PageResponseSDKType;
}
/**
 * QueryMarketParamsRequest is request type for the Query/Params `MarketParams`
 * RPC method.
 */
export interface QueryMarketParamRequest {
    id: number;
}
export interface QueryMarketParamRequestProtoMsg {
    typeUrl: "/klyraprotocol.prices.QueryMarketParamRequest";
    value: Uint8Array;
}
/**
 * QueryMarketParamsRequest is request type for the Query/Params `MarketParams`
 * RPC method.
 */
export interface QueryMarketParamRequestAmino {
    id?: number;
}
export interface QueryMarketParamRequestAminoMsg {
    type: "/klyraprotocol.prices.QueryMarketParamRequest";
    value: QueryMarketParamRequestAmino;
}
/**
 * QueryMarketParamsRequest is request type for the Query/Params `MarketParams`
 * RPC method.
 */
export interface QueryMarketParamRequestSDKType {
    id: number;
}
/**
 * QueryMarketParamResponse is response type for the Query/Params `MarketParams`
 * RPC method.
 */
export interface QueryMarketParamResponse {
    marketParam: MarketParam;
}
export interface QueryMarketParamResponseProtoMsg {
    typeUrl: "/klyraprotocol.prices.QueryMarketParamResponse";
    value: Uint8Array;
}
/**
 * QueryMarketParamResponse is response type for the Query/Params `MarketParams`
 * RPC method.
 */
export interface QueryMarketParamResponseAmino {
    market_param?: MarketParamAmino;
}
export interface QueryMarketParamResponseAminoMsg {
    type: "/klyraprotocol.prices.QueryMarketParamResponse";
    value: QueryMarketParamResponseAmino;
}
/**
 * QueryMarketParamResponse is response type for the Query/Params `MarketParams`
 * RPC method.
 */
export interface QueryMarketParamResponseSDKType {
    market_param: MarketParamSDKType;
}
/**
 * QueryAllMarketParamsRequest is request type for the Query/Params
 * `AllMarketParams` RPC method.
 */
export interface QueryAllMarketParamsRequest {
    pagination?: PageRequest;
}
export interface QueryAllMarketParamsRequestProtoMsg {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketParamsRequest";
    value: Uint8Array;
}
/**
 * QueryAllMarketParamsRequest is request type for the Query/Params
 * `AllMarketParams` RPC method.
 */
export interface QueryAllMarketParamsRequestAmino {
    pagination?: PageRequestAmino;
}
export interface QueryAllMarketParamsRequestAminoMsg {
    type: "/klyraprotocol.prices.QueryAllMarketParamsRequest";
    value: QueryAllMarketParamsRequestAmino;
}
/**
 * QueryAllMarketParamsRequest is request type for the Query/Params
 * `AllMarketParams` RPC method.
 */
export interface QueryAllMarketParamsRequestSDKType {
    pagination?: PageRequestSDKType;
}
/**
 * QueryAllMarketParamsResponse is response type for the Query/Params
 * `AllMarketParams` RPC method.
 */
export interface QueryAllMarketParamsResponse {
    marketParams: MarketParam[];
    pagination?: PageResponse;
}
export interface QueryAllMarketParamsResponseProtoMsg {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketParamsResponse";
    value: Uint8Array;
}
/**
 * QueryAllMarketParamsResponse is response type for the Query/Params
 * `AllMarketParams` RPC method.
 */
export interface QueryAllMarketParamsResponseAmino {
    market_params?: MarketParamAmino[];
    pagination?: PageResponseAmino;
}
export interface QueryAllMarketParamsResponseAminoMsg {
    type: "/klyraprotocol.prices.QueryAllMarketParamsResponse";
    value: QueryAllMarketParamsResponseAmino;
}
/**
 * QueryAllMarketParamsResponse is response type for the Query/Params
 * `AllMarketParams` RPC method.
 */
export interface QueryAllMarketParamsResponseSDKType {
    market_params: MarketParamSDKType[];
    pagination?: PageResponseSDKType;
}
export declare const QueryMarketPriceRequest: {
    typeUrl: string;
    is(o: any): o is QueryMarketPriceRequest;
    isSDK(o: any): o is QueryMarketPriceRequestSDKType;
    isAmino(o: any): o is QueryMarketPriceRequestAmino;
    encode(message: QueryMarketPriceRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryMarketPriceRequest;
    fromPartial(object: Partial<QueryMarketPriceRequest>): QueryMarketPriceRequest;
    fromAmino(object: QueryMarketPriceRequestAmino): QueryMarketPriceRequest;
    toAmino(message: QueryMarketPriceRequest): QueryMarketPriceRequestAmino;
    fromAminoMsg(object: QueryMarketPriceRequestAminoMsg): QueryMarketPriceRequest;
    fromProtoMsg(message: QueryMarketPriceRequestProtoMsg): QueryMarketPriceRequest;
    toProto(message: QueryMarketPriceRequest): Uint8Array;
    toProtoMsg(message: QueryMarketPriceRequest): QueryMarketPriceRequestProtoMsg;
};
export declare const QueryMarketPriceResponse: {
    typeUrl: string;
    is(o: any): o is QueryMarketPriceResponse;
    isSDK(o: any): o is QueryMarketPriceResponseSDKType;
    isAmino(o: any): o is QueryMarketPriceResponseAmino;
    encode(message: QueryMarketPriceResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryMarketPriceResponse;
    fromPartial(object: Partial<QueryMarketPriceResponse>): QueryMarketPriceResponse;
    fromAmino(object: QueryMarketPriceResponseAmino): QueryMarketPriceResponse;
    toAmino(message: QueryMarketPriceResponse): QueryMarketPriceResponseAmino;
    fromAminoMsg(object: QueryMarketPriceResponseAminoMsg): QueryMarketPriceResponse;
    fromProtoMsg(message: QueryMarketPriceResponseProtoMsg): QueryMarketPriceResponse;
    toProto(message: QueryMarketPriceResponse): Uint8Array;
    toProtoMsg(message: QueryMarketPriceResponse): QueryMarketPriceResponseProtoMsg;
};
export declare const QueryAllMarketPricesRequest: {
    typeUrl: string;
    is(o: any): o is QueryAllMarketPricesRequest;
    isSDK(o: any): o is QueryAllMarketPricesRequestSDKType;
    isAmino(o: any): o is QueryAllMarketPricesRequestAmino;
    encode(message: QueryAllMarketPricesRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllMarketPricesRequest;
    fromPartial(object: Partial<QueryAllMarketPricesRequest>): QueryAllMarketPricesRequest;
    fromAmino(object: QueryAllMarketPricesRequestAmino): QueryAllMarketPricesRequest;
    toAmino(message: QueryAllMarketPricesRequest): QueryAllMarketPricesRequestAmino;
    fromAminoMsg(object: QueryAllMarketPricesRequestAminoMsg): QueryAllMarketPricesRequest;
    fromProtoMsg(message: QueryAllMarketPricesRequestProtoMsg): QueryAllMarketPricesRequest;
    toProto(message: QueryAllMarketPricesRequest): Uint8Array;
    toProtoMsg(message: QueryAllMarketPricesRequest): QueryAllMarketPricesRequestProtoMsg;
};
export declare const QueryAllMarketPricesResponse: {
    typeUrl: string;
    is(o: any): o is QueryAllMarketPricesResponse;
    isSDK(o: any): o is QueryAllMarketPricesResponseSDKType;
    isAmino(o: any): o is QueryAllMarketPricesResponseAmino;
    encode(message: QueryAllMarketPricesResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllMarketPricesResponse;
    fromPartial(object: Partial<QueryAllMarketPricesResponse>): QueryAllMarketPricesResponse;
    fromAmino(object: QueryAllMarketPricesResponseAmino): QueryAllMarketPricesResponse;
    toAmino(message: QueryAllMarketPricesResponse): QueryAllMarketPricesResponseAmino;
    fromAminoMsg(object: QueryAllMarketPricesResponseAminoMsg): QueryAllMarketPricesResponse;
    fromProtoMsg(message: QueryAllMarketPricesResponseProtoMsg): QueryAllMarketPricesResponse;
    toProto(message: QueryAllMarketPricesResponse): Uint8Array;
    toProtoMsg(message: QueryAllMarketPricesResponse): QueryAllMarketPricesResponseProtoMsg;
};
export declare const QueryMarketParamRequest: {
    typeUrl: string;
    is(o: any): o is QueryMarketParamRequest;
    isSDK(o: any): o is QueryMarketParamRequestSDKType;
    isAmino(o: any): o is QueryMarketParamRequestAmino;
    encode(message: QueryMarketParamRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryMarketParamRequest;
    fromPartial(object: Partial<QueryMarketParamRequest>): QueryMarketParamRequest;
    fromAmino(object: QueryMarketParamRequestAmino): QueryMarketParamRequest;
    toAmino(message: QueryMarketParamRequest): QueryMarketParamRequestAmino;
    fromAminoMsg(object: QueryMarketParamRequestAminoMsg): QueryMarketParamRequest;
    fromProtoMsg(message: QueryMarketParamRequestProtoMsg): QueryMarketParamRequest;
    toProto(message: QueryMarketParamRequest): Uint8Array;
    toProtoMsg(message: QueryMarketParamRequest): QueryMarketParamRequestProtoMsg;
};
export declare const QueryMarketParamResponse: {
    typeUrl: string;
    is(o: any): o is QueryMarketParamResponse;
    isSDK(o: any): o is QueryMarketParamResponseSDKType;
    isAmino(o: any): o is QueryMarketParamResponseAmino;
    encode(message: QueryMarketParamResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryMarketParamResponse;
    fromPartial(object: Partial<QueryMarketParamResponse>): QueryMarketParamResponse;
    fromAmino(object: QueryMarketParamResponseAmino): QueryMarketParamResponse;
    toAmino(message: QueryMarketParamResponse): QueryMarketParamResponseAmino;
    fromAminoMsg(object: QueryMarketParamResponseAminoMsg): QueryMarketParamResponse;
    fromProtoMsg(message: QueryMarketParamResponseProtoMsg): QueryMarketParamResponse;
    toProto(message: QueryMarketParamResponse): Uint8Array;
    toProtoMsg(message: QueryMarketParamResponse): QueryMarketParamResponseProtoMsg;
};
export declare const QueryAllMarketParamsRequest: {
    typeUrl: string;
    is(o: any): o is QueryAllMarketParamsRequest;
    isSDK(o: any): o is QueryAllMarketParamsRequestSDKType;
    isAmino(o: any): o is QueryAllMarketParamsRequestAmino;
    encode(message: QueryAllMarketParamsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllMarketParamsRequest;
    fromPartial(object: Partial<QueryAllMarketParamsRequest>): QueryAllMarketParamsRequest;
    fromAmino(object: QueryAllMarketParamsRequestAmino): QueryAllMarketParamsRequest;
    toAmino(message: QueryAllMarketParamsRequest): QueryAllMarketParamsRequestAmino;
    fromAminoMsg(object: QueryAllMarketParamsRequestAminoMsg): QueryAllMarketParamsRequest;
    fromProtoMsg(message: QueryAllMarketParamsRequestProtoMsg): QueryAllMarketParamsRequest;
    toProto(message: QueryAllMarketParamsRequest): Uint8Array;
    toProtoMsg(message: QueryAllMarketParamsRequest): QueryAllMarketParamsRequestProtoMsg;
};
export declare const QueryAllMarketParamsResponse: {
    typeUrl: string;
    is(o: any): o is QueryAllMarketParamsResponse;
    isSDK(o: any): o is QueryAllMarketParamsResponseSDKType;
    isAmino(o: any): o is QueryAllMarketParamsResponseAmino;
    encode(message: QueryAllMarketParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllMarketParamsResponse;
    fromPartial(object: Partial<QueryAllMarketParamsResponse>): QueryAllMarketParamsResponse;
    fromAmino(object: QueryAllMarketParamsResponseAmino): QueryAllMarketParamsResponse;
    toAmino(message: QueryAllMarketParamsResponse): QueryAllMarketParamsResponseAmino;
    fromAminoMsg(object: QueryAllMarketParamsResponseAminoMsg): QueryAllMarketParamsResponse;
    fromProtoMsg(message: QueryAllMarketParamsResponseProtoMsg): QueryAllMarketParamsResponse;
    toProto(message: QueryAllMarketParamsResponse): Uint8Array;
    toProtoMsg(message: QueryAllMarketParamsResponse): QueryAllMarketParamsResponseProtoMsg;
};
