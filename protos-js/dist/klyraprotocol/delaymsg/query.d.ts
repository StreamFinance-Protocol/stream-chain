import { DelayedMessage, DelayedMessageAmino, DelayedMessageSDKType } from "./delayed_message";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * QueryNextDelayedMessageIdRequest is the request type for the
 * NextDelayedMessageId RPC method.
 */
export interface QueryNextDelayedMessageIdRequest {
}
export interface QueryNextDelayedMessageIdRequestProtoMsg {
    typeUrl: "/klyraprotocol.delaymsg.QueryNextDelayedMessageIdRequest";
    value: Uint8Array;
}
/**
 * QueryNextDelayedMessageIdRequest is the request type for the
 * NextDelayedMessageId RPC method.
 */
export interface QueryNextDelayedMessageIdRequestAmino {
}
export interface QueryNextDelayedMessageIdRequestAminoMsg {
    type: "/klyraprotocol.delaymsg.QueryNextDelayedMessageIdRequest";
    value: QueryNextDelayedMessageIdRequestAmino;
}
/**
 * QueryNextDelayedMessageIdRequest is the request type for the
 * NextDelayedMessageId RPC method.
 */
export interface QueryNextDelayedMessageIdRequestSDKType {
}
/**
 * QueryNextDelayedMessageIdResponse is the response type for the
 * NextDelayedMessageId RPC method.
 */
export interface QueryNextDelayedMessageIdResponse {
    nextDelayedMessageId: number;
}
export interface QueryNextDelayedMessageIdResponseProtoMsg {
    typeUrl: "/klyraprotocol.delaymsg.QueryNextDelayedMessageIdResponse";
    value: Uint8Array;
}
/**
 * QueryNextDelayedMessageIdResponse is the response type for the
 * NextDelayedMessageId RPC method.
 */
export interface QueryNextDelayedMessageIdResponseAmino {
    next_delayed_message_id?: number;
}
export interface QueryNextDelayedMessageIdResponseAminoMsg {
    type: "/klyraprotocol.delaymsg.QueryNextDelayedMessageIdResponse";
    value: QueryNextDelayedMessageIdResponseAmino;
}
/**
 * QueryNextDelayedMessageIdResponse is the response type for the
 * NextDelayedMessageId RPC method.
 */
export interface QueryNextDelayedMessageIdResponseSDKType {
    next_delayed_message_id: number;
}
/** QueryMessageRequest is the request type for the Message RPC method. */
export interface QueryMessageRequest {
    id: number;
}
export interface QueryMessageRequestProtoMsg {
    typeUrl: "/klyraprotocol.delaymsg.QueryMessageRequest";
    value: Uint8Array;
}
/** QueryMessageRequest is the request type for the Message RPC method. */
export interface QueryMessageRequestAmino {
    id?: number;
}
export interface QueryMessageRequestAminoMsg {
    type: "/klyraprotocol.delaymsg.QueryMessageRequest";
    value: QueryMessageRequestAmino;
}
/** QueryMessageRequest is the request type for the Message RPC method. */
export interface QueryMessageRequestSDKType {
    id: number;
}
/** QueryGetMessageResponse is the response type for the Message RPC method. */
export interface QueryMessageResponse {
    message?: DelayedMessage;
}
export interface QueryMessageResponseProtoMsg {
    typeUrl: "/klyraprotocol.delaymsg.QueryMessageResponse";
    value: Uint8Array;
}
/** QueryGetMessageResponse is the response type for the Message RPC method. */
export interface QueryMessageResponseAmino {
    message?: DelayedMessageAmino;
}
export interface QueryMessageResponseAminoMsg {
    type: "/klyraprotocol.delaymsg.QueryMessageResponse";
    value: QueryMessageResponseAmino;
}
/** QueryGetMessageResponse is the response type for the Message RPC method. */
export interface QueryMessageResponseSDKType {
    message?: DelayedMessageSDKType;
}
/**
 * QueryBlockMessageIdsRequest is the request type for the BlockMessageIds
 * RPC method.
 */
export interface QueryBlockMessageIdsRequest {
    blockHeight: number;
}
export interface QueryBlockMessageIdsRequestProtoMsg {
    typeUrl: "/klyraprotocol.delaymsg.QueryBlockMessageIdsRequest";
    value: Uint8Array;
}
/**
 * QueryBlockMessageIdsRequest is the request type for the BlockMessageIds
 * RPC method.
 */
export interface QueryBlockMessageIdsRequestAmino {
    block_height?: number;
}
export interface QueryBlockMessageIdsRequestAminoMsg {
    type: "/klyraprotocol.delaymsg.QueryBlockMessageIdsRequest";
    value: QueryBlockMessageIdsRequestAmino;
}
/**
 * QueryBlockMessageIdsRequest is the request type for the BlockMessageIds
 * RPC method.
 */
export interface QueryBlockMessageIdsRequestSDKType {
    block_height: number;
}
/**
 * QueryGetBlockMessageIdsResponse is the response type for the BlockMessageIds
 * RPC method.
 */
export interface QueryBlockMessageIdsResponse {
    messageIds: number[];
}
export interface QueryBlockMessageIdsResponseProtoMsg {
    typeUrl: "/klyraprotocol.delaymsg.QueryBlockMessageIdsResponse";
    value: Uint8Array;
}
/**
 * QueryGetBlockMessageIdsResponse is the response type for the BlockMessageIds
 * RPC method.
 */
export interface QueryBlockMessageIdsResponseAmino {
    message_ids?: number[];
}
export interface QueryBlockMessageIdsResponseAminoMsg {
    type: "/klyraprotocol.delaymsg.QueryBlockMessageIdsResponse";
    value: QueryBlockMessageIdsResponseAmino;
}
/**
 * QueryGetBlockMessageIdsResponse is the response type for the BlockMessageIds
 * RPC method.
 */
export interface QueryBlockMessageIdsResponseSDKType {
    message_ids: number[];
}
export declare const QueryNextDelayedMessageIdRequest: {
    typeUrl: string;
    is(o: any): o is QueryNextDelayedMessageIdRequest;
    isSDK(o: any): o is QueryNextDelayedMessageIdRequestSDKType;
    isAmino(o: any): o is QueryNextDelayedMessageIdRequestAmino;
    encode(_: QueryNextDelayedMessageIdRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryNextDelayedMessageIdRequest;
    fromPartial(_: Partial<QueryNextDelayedMessageIdRequest>): QueryNextDelayedMessageIdRequest;
    fromAmino(_: QueryNextDelayedMessageIdRequestAmino): QueryNextDelayedMessageIdRequest;
    toAmino(_: QueryNextDelayedMessageIdRequest): QueryNextDelayedMessageIdRequestAmino;
    fromAminoMsg(object: QueryNextDelayedMessageIdRequestAminoMsg): QueryNextDelayedMessageIdRequest;
    fromProtoMsg(message: QueryNextDelayedMessageIdRequestProtoMsg): QueryNextDelayedMessageIdRequest;
    toProto(message: QueryNextDelayedMessageIdRequest): Uint8Array;
    toProtoMsg(message: QueryNextDelayedMessageIdRequest): QueryNextDelayedMessageIdRequestProtoMsg;
};
export declare const QueryNextDelayedMessageIdResponse: {
    typeUrl: string;
    is(o: any): o is QueryNextDelayedMessageIdResponse;
    isSDK(o: any): o is QueryNextDelayedMessageIdResponseSDKType;
    isAmino(o: any): o is QueryNextDelayedMessageIdResponseAmino;
    encode(message: QueryNextDelayedMessageIdResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryNextDelayedMessageIdResponse;
    fromPartial(object: Partial<QueryNextDelayedMessageIdResponse>): QueryNextDelayedMessageIdResponse;
    fromAmino(object: QueryNextDelayedMessageIdResponseAmino): QueryNextDelayedMessageIdResponse;
    toAmino(message: QueryNextDelayedMessageIdResponse): QueryNextDelayedMessageIdResponseAmino;
    fromAminoMsg(object: QueryNextDelayedMessageIdResponseAminoMsg): QueryNextDelayedMessageIdResponse;
    fromProtoMsg(message: QueryNextDelayedMessageIdResponseProtoMsg): QueryNextDelayedMessageIdResponse;
    toProto(message: QueryNextDelayedMessageIdResponse): Uint8Array;
    toProtoMsg(message: QueryNextDelayedMessageIdResponse): QueryNextDelayedMessageIdResponseProtoMsg;
};
export declare const QueryMessageRequest: {
    typeUrl: string;
    is(o: any): o is QueryMessageRequest;
    isSDK(o: any): o is QueryMessageRequestSDKType;
    isAmino(o: any): o is QueryMessageRequestAmino;
    encode(message: QueryMessageRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryMessageRequest;
    fromPartial(object: Partial<QueryMessageRequest>): QueryMessageRequest;
    fromAmino(object: QueryMessageRequestAmino): QueryMessageRequest;
    toAmino(message: QueryMessageRequest): QueryMessageRequestAmino;
    fromAminoMsg(object: QueryMessageRequestAminoMsg): QueryMessageRequest;
    fromProtoMsg(message: QueryMessageRequestProtoMsg): QueryMessageRequest;
    toProto(message: QueryMessageRequest): Uint8Array;
    toProtoMsg(message: QueryMessageRequest): QueryMessageRequestProtoMsg;
};
export declare const QueryMessageResponse: {
    typeUrl: string;
    is(o: any): o is QueryMessageResponse;
    isSDK(o: any): o is QueryMessageResponseSDKType;
    isAmino(o: any): o is QueryMessageResponseAmino;
    encode(message: QueryMessageResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryMessageResponse;
    fromPartial(object: Partial<QueryMessageResponse>): QueryMessageResponse;
    fromAmino(object: QueryMessageResponseAmino): QueryMessageResponse;
    toAmino(message: QueryMessageResponse): QueryMessageResponseAmino;
    fromAminoMsg(object: QueryMessageResponseAminoMsg): QueryMessageResponse;
    fromProtoMsg(message: QueryMessageResponseProtoMsg): QueryMessageResponse;
    toProto(message: QueryMessageResponse): Uint8Array;
    toProtoMsg(message: QueryMessageResponse): QueryMessageResponseProtoMsg;
};
export declare const QueryBlockMessageIdsRequest: {
    typeUrl: string;
    is(o: any): o is QueryBlockMessageIdsRequest;
    isSDK(o: any): o is QueryBlockMessageIdsRequestSDKType;
    isAmino(o: any): o is QueryBlockMessageIdsRequestAmino;
    encode(message: QueryBlockMessageIdsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockMessageIdsRequest;
    fromPartial(object: Partial<QueryBlockMessageIdsRequest>): QueryBlockMessageIdsRequest;
    fromAmino(object: QueryBlockMessageIdsRequestAmino): QueryBlockMessageIdsRequest;
    toAmino(message: QueryBlockMessageIdsRequest): QueryBlockMessageIdsRequestAmino;
    fromAminoMsg(object: QueryBlockMessageIdsRequestAminoMsg): QueryBlockMessageIdsRequest;
    fromProtoMsg(message: QueryBlockMessageIdsRequestProtoMsg): QueryBlockMessageIdsRequest;
    toProto(message: QueryBlockMessageIdsRequest): Uint8Array;
    toProtoMsg(message: QueryBlockMessageIdsRequest): QueryBlockMessageIdsRequestProtoMsg;
};
export declare const QueryBlockMessageIdsResponse: {
    typeUrl: string;
    is(o: any): o is QueryBlockMessageIdsResponse;
    isSDK(o: any): o is QueryBlockMessageIdsResponseSDKType;
    isAmino(o: any): o is QueryBlockMessageIdsResponseAmino;
    encode(message: QueryBlockMessageIdsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockMessageIdsResponse;
    fromPartial(object: Partial<QueryBlockMessageIdsResponse>): QueryBlockMessageIdsResponse;
    fromAmino(object: QueryBlockMessageIdsResponseAmino): QueryBlockMessageIdsResponse;
    toAmino(message: QueryBlockMessageIdsResponse): QueryBlockMessageIdsResponseAmino;
    fromAminoMsg(object: QueryBlockMessageIdsResponseAminoMsg): QueryBlockMessageIdsResponse;
    fromProtoMsg(message: QueryBlockMessageIdsResponseProtoMsg): QueryBlockMessageIdsResponse;
    toProto(message: QueryBlockMessageIdsResponse): Uint8Array;
    toProtoMsg(message: QueryBlockMessageIdsResponse): QueryBlockMessageIdsResponseProtoMsg;
};
