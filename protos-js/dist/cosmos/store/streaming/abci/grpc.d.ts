import { RequestFinalizeBlock, RequestFinalizeBlockAmino, RequestFinalizeBlockSDKType, ResponseFinalizeBlock, ResponseFinalizeBlockAmino, ResponseFinalizeBlockSDKType, ResponseCommit, ResponseCommitAmino, ResponseCommitSDKType } from "../../../../tendermint/abci/types";
import { StoreKVPair, StoreKVPairAmino, StoreKVPairSDKType } from "../../v1beta1/listening";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/** ListenEndBlockRequest is the request type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockRequest {
    req?: RequestFinalizeBlock;
    res?: ResponseFinalizeBlock;
}
export interface ListenFinalizeBlockRequestProtoMsg {
    typeUrl: "/cosmos.store.streaming.abci.ListenFinalizeBlockRequest";
    value: Uint8Array;
}
/** ListenEndBlockRequest is the request type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockRequestAmino {
    req?: RequestFinalizeBlockAmino;
    res?: ResponseFinalizeBlockAmino;
}
export interface ListenFinalizeBlockRequestAminoMsg {
    type: "cosmos-sdk/ListenFinalizeBlockRequest";
    value: ListenFinalizeBlockRequestAmino;
}
/** ListenEndBlockRequest is the request type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockRequestSDKType {
    req?: RequestFinalizeBlockSDKType;
    res?: ResponseFinalizeBlockSDKType;
}
/** ListenEndBlockResponse is the response type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockResponse {
}
export interface ListenFinalizeBlockResponseProtoMsg {
    typeUrl: "/cosmos.store.streaming.abci.ListenFinalizeBlockResponse";
    value: Uint8Array;
}
/** ListenEndBlockResponse is the response type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockResponseAmino {
}
export interface ListenFinalizeBlockResponseAminoMsg {
    type: "cosmos-sdk/ListenFinalizeBlockResponse";
    value: ListenFinalizeBlockResponseAmino;
}
/** ListenEndBlockResponse is the response type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockResponseSDKType {
}
/** ListenCommitRequest is the request type for the ListenCommit RPC method */
export interface ListenCommitRequest {
    /** explicitly pass in block height as ResponseCommit does not contain this info */
    blockHeight: bigint;
    res?: ResponseCommit;
    changeSet: StoreKVPair[];
}
export interface ListenCommitRequestProtoMsg {
    typeUrl: "/cosmos.store.streaming.abci.ListenCommitRequest";
    value: Uint8Array;
}
/** ListenCommitRequest is the request type for the ListenCommit RPC method */
export interface ListenCommitRequestAmino {
    /** explicitly pass in block height as ResponseCommit does not contain this info */
    block_height?: string;
    res?: ResponseCommitAmino;
    change_set?: StoreKVPairAmino[];
}
export interface ListenCommitRequestAminoMsg {
    type: "cosmos-sdk/ListenCommitRequest";
    value: ListenCommitRequestAmino;
}
/** ListenCommitRequest is the request type for the ListenCommit RPC method */
export interface ListenCommitRequestSDKType {
    block_height: bigint;
    res?: ResponseCommitSDKType;
    change_set: StoreKVPairSDKType[];
}
/** ListenCommitResponse is the response type for the ListenCommit RPC method */
export interface ListenCommitResponse {
}
export interface ListenCommitResponseProtoMsg {
    typeUrl: "/cosmos.store.streaming.abci.ListenCommitResponse";
    value: Uint8Array;
}
/** ListenCommitResponse is the response type for the ListenCommit RPC method */
export interface ListenCommitResponseAmino {
}
export interface ListenCommitResponseAminoMsg {
    type: "cosmos-sdk/ListenCommitResponse";
    value: ListenCommitResponseAmino;
}
/** ListenCommitResponse is the response type for the ListenCommit RPC method */
export interface ListenCommitResponseSDKType {
}
export declare const ListenFinalizeBlockRequest: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is ListenFinalizeBlockRequest;
    isSDK(o: any): o is ListenFinalizeBlockRequestSDKType;
    isAmino(o: any): o is ListenFinalizeBlockRequestAmino;
    encode(message: ListenFinalizeBlockRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ListenFinalizeBlockRequest;
    fromPartial(object: Partial<ListenFinalizeBlockRequest>): ListenFinalizeBlockRequest;
    fromAmino(object: ListenFinalizeBlockRequestAmino): ListenFinalizeBlockRequest;
    toAmino(message: ListenFinalizeBlockRequest): ListenFinalizeBlockRequestAmino;
    fromAminoMsg(object: ListenFinalizeBlockRequestAminoMsg): ListenFinalizeBlockRequest;
    toAminoMsg(message: ListenFinalizeBlockRequest): ListenFinalizeBlockRequestAminoMsg;
    fromProtoMsg(message: ListenFinalizeBlockRequestProtoMsg): ListenFinalizeBlockRequest;
    toProto(message: ListenFinalizeBlockRequest): Uint8Array;
    toProtoMsg(message: ListenFinalizeBlockRequest): ListenFinalizeBlockRequestProtoMsg;
};
export declare const ListenFinalizeBlockResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is ListenFinalizeBlockResponse;
    isSDK(o: any): o is ListenFinalizeBlockResponseSDKType;
    isAmino(o: any): o is ListenFinalizeBlockResponseAmino;
    encode(_: ListenFinalizeBlockResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ListenFinalizeBlockResponse;
    fromPartial(_: Partial<ListenFinalizeBlockResponse>): ListenFinalizeBlockResponse;
    fromAmino(_: ListenFinalizeBlockResponseAmino): ListenFinalizeBlockResponse;
    toAmino(_: ListenFinalizeBlockResponse): ListenFinalizeBlockResponseAmino;
    fromAminoMsg(object: ListenFinalizeBlockResponseAminoMsg): ListenFinalizeBlockResponse;
    toAminoMsg(message: ListenFinalizeBlockResponse): ListenFinalizeBlockResponseAminoMsg;
    fromProtoMsg(message: ListenFinalizeBlockResponseProtoMsg): ListenFinalizeBlockResponse;
    toProto(message: ListenFinalizeBlockResponse): Uint8Array;
    toProtoMsg(message: ListenFinalizeBlockResponse): ListenFinalizeBlockResponseProtoMsg;
};
export declare const ListenCommitRequest: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is ListenCommitRequest;
    isSDK(o: any): o is ListenCommitRequestSDKType;
    isAmino(o: any): o is ListenCommitRequestAmino;
    encode(message: ListenCommitRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ListenCommitRequest;
    fromPartial(object: Partial<ListenCommitRequest>): ListenCommitRequest;
    fromAmino(object: ListenCommitRequestAmino): ListenCommitRequest;
    toAmino(message: ListenCommitRequest): ListenCommitRequestAmino;
    fromAminoMsg(object: ListenCommitRequestAminoMsg): ListenCommitRequest;
    toAminoMsg(message: ListenCommitRequest): ListenCommitRequestAminoMsg;
    fromProtoMsg(message: ListenCommitRequestProtoMsg): ListenCommitRequest;
    toProto(message: ListenCommitRequest): Uint8Array;
    toProtoMsg(message: ListenCommitRequest): ListenCommitRequestProtoMsg;
};
export declare const ListenCommitResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is ListenCommitResponse;
    isSDK(o: any): o is ListenCommitResponseSDKType;
    isAmino(o: any): o is ListenCommitResponseAmino;
    encode(_: ListenCommitResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ListenCommitResponse;
    fromPartial(_: Partial<ListenCommitResponse>): ListenCommitResponse;
    fromAmino(_: ListenCommitResponseAmino): ListenCommitResponse;
    toAmino(_: ListenCommitResponse): ListenCommitResponseAmino;
    fromAminoMsg(object: ListenCommitResponseAminoMsg): ListenCommitResponse;
    toAminoMsg(message: ListenCommitResponse): ListenCommitResponseAminoMsg;
    fromProtoMsg(message: ListenCommitResponseProtoMsg): ListenCommitResponse;
    toProto(message: ListenCommitResponse): Uint8Array;
    toProtoMsg(message: ListenCommitResponse): ListenCommitResponseProtoMsg;
};
