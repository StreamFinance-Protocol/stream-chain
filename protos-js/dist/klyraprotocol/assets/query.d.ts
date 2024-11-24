import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Asset, AssetAmino, AssetSDKType } from "./asset";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Queries an Asset by id. */
export interface QueryAssetRequest {
    id: number;
}
export interface QueryAssetRequestProtoMsg {
    typeUrl: "/klyraprotocol.assets.QueryAssetRequest";
    value: Uint8Array;
}
/** Queries an Asset by id. */
export interface QueryAssetRequestAmino {
    id?: number;
}
export interface QueryAssetRequestAminoMsg {
    type: "/klyraprotocol.assets.QueryAssetRequest";
    value: QueryAssetRequestAmino;
}
/** Queries an Asset by id. */
export interface QueryAssetRequestSDKType {
    id: number;
}
/** QueryAssetResponse is response type for the Asset RPC method. */
export interface QueryAssetResponse {
    asset: Asset;
}
export interface QueryAssetResponseProtoMsg {
    typeUrl: "/klyraprotocol.assets.QueryAssetResponse";
    value: Uint8Array;
}
/** QueryAssetResponse is response type for the Asset RPC method. */
export interface QueryAssetResponseAmino {
    asset?: AssetAmino;
}
export interface QueryAssetResponseAminoMsg {
    type: "/klyraprotocol.assets.QueryAssetResponse";
    value: QueryAssetResponseAmino;
}
/** QueryAssetResponse is response type for the Asset RPC method. */
export interface QueryAssetResponseSDKType {
    asset: AssetSDKType;
}
/** Queries a list of Asset items. */
export interface QueryAllAssetsRequest {
    pagination?: PageRequest;
}
export interface QueryAllAssetsRequestProtoMsg {
    typeUrl: "/klyraprotocol.assets.QueryAllAssetsRequest";
    value: Uint8Array;
}
/** Queries a list of Asset items. */
export interface QueryAllAssetsRequestAmino {
    pagination?: PageRequestAmino;
}
export interface QueryAllAssetsRequestAminoMsg {
    type: "/klyraprotocol.assets.QueryAllAssetsRequest";
    value: QueryAllAssetsRequestAmino;
}
/** Queries a list of Asset items. */
export interface QueryAllAssetsRequestSDKType {
    pagination?: PageRequestSDKType;
}
/** QueryAllAssetsResponse is response type for the AllAssets RPC method. */
export interface QueryAllAssetsResponse {
    asset: Asset[];
    pagination?: PageResponse;
}
export interface QueryAllAssetsResponseProtoMsg {
    typeUrl: "/klyraprotocol.assets.QueryAllAssetsResponse";
    value: Uint8Array;
}
/** QueryAllAssetsResponse is response type for the AllAssets RPC method. */
export interface QueryAllAssetsResponseAmino {
    asset?: AssetAmino[];
    pagination?: PageResponseAmino;
}
export interface QueryAllAssetsResponseAminoMsg {
    type: "/klyraprotocol.assets.QueryAllAssetsResponse";
    value: QueryAllAssetsResponseAmino;
}
/** QueryAllAssetsResponse is response type for the AllAssets RPC method. */
export interface QueryAllAssetsResponseSDKType {
    asset: AssetSDKType[];
    pagination?: PageResponseSDKType;
}
export declare const QueryAssetRequest: {
    typeUrl: string;
    is(o: any): o is QueryAssetRequest;
    isSDK(o: any): o is QueryAssetRequestSDKType;
    isAmino(o: any): o is QueryAssetRequestAmino;
    encode(message: QueryAssetRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAssetRequest;
    fromPartial(object: Partial<QueryAssetRequest>): QueryAssetRequest;
    fromAmino(object: QueryAssetRequestAmino): QueryAssetRequest;
    toAmino(message: QueryAssetRequest): QueryAssetRequestAmino;
    fromAminoMsg(object: QueryAssetRequestAminoMsg): QueryAssetRequest;
    fromProtoMsg(message: QueryAssetRequestProtoMsg): QueryAssetRequest;
    toProto(message: QueryAssetRequest): Uint8Array;
    toProtoMsg(message: QueryAssetRequest): QueryAssetRequestProtoMsg;
};
export declare const QueryAssetResponse: {
    typeUrl: string;
    is(o: any): o is QueryAssetResponse;
    isSDK(o: any): o is QueryAssetResponseSDKType;
    isAmino(o: any): o is QueryAssetResponseAmino;
    encode(message: QueryAssetResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAssetResponse;
    fromPartial(object: Partial<QueryAssetResponse>): QueryAssetResponse;
    fromAmino(object: QueryAssetResponseAmino): QueryAssetResponse;
    toAmino(message: QueryAssetResponse): QueryAssetResponseAmino;
    fromAminoMsg(object: QueryAssetResponseAminoMsg): QueryAssetResponse;
    fromProtoMsg(message: QueryAssetResponseProtoMsg): QueryAssetResponse;
    toProto(message: QueryAssetResponse): Uint8Array;
    toProtoMsg(message: QueryAssetResponse): QueryAssetResponseProtoMsg;
};
export declare const QueryAllAssetsRequest: {
    typeUrl: string;
    is(o: any): o is QueryAllAssetsRequest;
    isSDK(o: any): o is QueryAllAssetsRequestSDKType;
    isAmino(o: any): o is QueryAllAssetsRequestAmino;
    encode(message: QueryAllAssetsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllAssetsRequest;
    fromPartial(object: Partial<QueryAllAssetsRequest>): QueryAllAssetsRequest;
    fromAmino(object: QueryAllAssetsRequestAmino): QueryAllAssetsRequest;
    toAmino(message: QueryAllAssetsRequest): QueryAllAssetsRequestAmino;
    fromAminoMsg(object: QueryAllAssetsRequestAminoMsg): QueryAllAssetsRequest;
    fromProtoMsg(message: QueryAllAssetsRequestProtoMsg): QueryAllAssetsRequest;
    toProto(message: QueryAllAssetsRequest): Uint8Array;
    toProtoMsg(message: QueryAllAssetsRequest): QueryAllAssetsRequestProtoMsg;
};
export declare const QueryAllAssetsResponse: {
    typeUrl: string;
    is(o: any): o is QueryAllAssetsResponse;
    isSDK(o: any): o is QueryAllAssetsResponseSDKType;
    isAmino(o: any): o is QueryAllAssetsResponseAmino;
    encode(message: QueryAllAssetsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllAssetsResponse;
    fromPartial(object: Partial<QueryAllAssetsResponse>): QueryAllAssetsResponse;
    fromAmino(object: QueryAllAssetsResponseAmino): QueryAllAssetsResponse;
    toAmino(message: QueryAllAssetsResponse): QueryAllAssetsResponseAmino;
    fromAminoMsg(object: QueryAllAssetsResponseAminoMsg): QueryAllAssetsResponse;
    fromProtoMsg(message: QueryAllAssetsResponseProtoMsg): QueryAllAssetsResponse;
    toProto(message: QueryAllAssetsResponse): Uint8Array;
    toProtoMsg(message: QueryAllAssetsResponse): QueryAllAssetsResponseProtoMsg;
};
