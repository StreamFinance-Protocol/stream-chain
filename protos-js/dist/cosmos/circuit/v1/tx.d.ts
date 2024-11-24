import { Permissions, PermissionsAmino, PermissionsSDKType } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** MsgAuthorizeCircuitBreaker defines the Msg/AuthorizeCircuitBreaker request type. */
export interface MsgAuthorizeCircuitBreaker {
    /**
     * granter is the granter of the circuit breaker permissions and must have
     * LEVEL_SUPER_ADMIN.
     */
    granter: string;
    /** grantee is the account authorized with the provided permissions. */
    grantee: string;
    /**
     * permissions are the circuit breaker permissions that the grantee receives.
     * These will overwrite any existing permissions. LEVEL_NONE_UNSPECIFIED can
     * be specified to revoke all permissions.
     */
    permissions?: Permissions;
}
export interface MsgAuthorizeCircuitBreakerProtoMsg {
    typeUrl: "/cosmos.circuit.v1.MsgAuthorizeCircuitBreaker";
    value: Uint8Array;
}
/** MsgAuthorizeCircuitBreaker defines the Msg/AuthorizeCircuitBreaker request type. */
export interface MsgAuthorizeCircuitBreakerAmino {
    /**
     * granter is the granter of the circuit breaker permissions and must have
     * LEVEL_SUPER_ADMIN.
     */
    granter?: string;
    /** grantee is the account authorized with the provided permissions. */
    grantee?: string;
    /**
     * permissions are the circuit breaker permissions that the grantee receives.
     * These will overwrite any existing permissions. LEVEL_NONE_UNSPECIFIED can
     * be specified to revoke all permissions.
     */
    permissions?: PermissionsAmino;
}
export interface MsgAuthorizeCircuitBreakerAminoMsg {
    type: "cosmos-sdk/MsgAuthorizeCircuitBreaker";
    value: MsgAuthorizeCircuitBreakerAmino;
}
/** MsgAuthorizeCircuitBreaker defines the Msg/AuthorizeCircuitBreaker request type. */
export interface MsgAuthorizeCircuitBreakerSDKType {
    granter: string;
    grantee: string;
    permissions?: PermissionsSDKType;
}
/** MsgAuthorizeCircuitBreakerResponse defines the Msg/AuthorizeCircuitBreaker response type. */
export interface MsgAuthorizeCircuitBreakerResponse {
    success: boolean;
}
export interface MsgAuthorizeCircuitBreakerResponseProtoMsg {
    typeUrl: "/cosmos.circuit.v1.MsgAuthorizeCircuitBreakerResponse";
    value: Uint8Array;
}
/** MsgAuthorizeCircuitBreakerResponse defines the Msg/AuthorizeCircuitBreaker response type. */
export interface MsgAuthorizeCircuitBreakerResponseAmino {
    success?: boolean;
}
export interface MsgAuthorizeCircuitBreakerResponseAminoMsg {
    type: "cosmos-sdk/MsgAuthorizeCircuitBreakerResponse";
    value: MsgAuthorizeCircuitBreakerResponseAmino;
}
/** MsgAuthorizeCircuitBreakerResponse defines the Msg/AuthorizeCircuitBreaker response type. */
export interface MsgAuthorizeCircuitBreakerResponseSDKType {
    success: boolean;
}
/** MsgTripCircuitBreaker defines the Msg/TripCircuitBreaker request type. */
export interface MsgTripCircuitBreaker {
    /** authority is the account authorized to trip the circuit breaker. */
    authority: string;
    /**
     * msg_type_urls specifies a list of type URLs to immediately stop processing.
     * IF IT IS LEFT EMPTY, ALL MSG PROCESSING WILL STOP IMMEDIATELY.
     * This value is validated against the authority's permissions and if the
     * authority does not have permissions to trip the specified msg type URLs
     * (or all URLs), the operation will fail.
     */
    msgTypeUrls: string[];
}
export interface MsgTripCircuitBreakerProtoMsg {
    typeUrl: "/cosmos.circuit.v1.MsgTripCircuitBreaker";
    value: Uint8Array;
}
/** MsgTripCircuitBreaker defines the Msg/TripCircuitBreaker request type. */
export interface MsgTripCircuitBreakerAmino {
    /** authority is the account authorized to trip the circuit breaker. */
    authority?: string;
    /**
     * msg_type_urls specifies a list of type URLs to immediately stop processing.
     * IF IT IS LEFT EMPTY, ALL MSG PROCESSING WILL STOP IMMEDIATELY.
     * This value is validated against the authority's permissions and if the
     * authority does not have permissions to trip the specified msg type URLs
     * (or all URLs), the operation will fail.
     */
    msg_type_urls?: string[];
}
export interface MsgTripCircuitBreakerAminoMsg {
    type: "cosmos-sdk/MsgTripCircuitBreaker";
    value: MsgTripCircuitBreakerAmino;
}
/** MsgTripCircuitBreaker defines the Msg/TripCircuitBreaker request type. */
export interface MsgTripCircuitBreakerSDKType {
    authority: string;
    msg_type_urls: string[];
}
/** MsgTripCircuitBreakerResponse defines the Msg/TripCircuitBreaker response type. */
export interface MsgTripCircuitBreakerResponse {
    success: boolean;
}
export interface MsgTripCircuitBreakerResponseProtoMsg {
    typeUrl: "/cosmos.circuit.v1.MsgTripCircuitBreakerResponse";
    value: Uint8Array;
}
/** MsgTripCircuitBreakerResponse defines the Msg/TripCircuitBreaker response type. */
export interface MsgTripCircuitBreakerResponseAmino {
    success?: boolean;
}
export interface MsgTripCircuitBreakerResponseAminoMsg {
    type: "cosmos-sdk/MsgTripCircuitBreakerResponse";
    value: MsgTripCircuitBreakerResponseAmino;
}
/** MsgTripCircuitBreakerResponse defines the Msg/TripCircuitBreaker response type. */
export interface MsgTripCircuitBreakerResponseSDKType {
    success: boolean;
}
/** MsgResetCircuitBreaker defines the Msg/ResetCircuitBreaker request type. */
export interface MsgResetCircuitBreaker {
    /** authority is the account authorized to trip or reset the circuit breaker. */
    authority: string;
    /**
     * msg_type_urls specifies a list of Msg type URLs to resume processing. If
     * it is left empty all Msg processing for type URLs that the account is
     * authorized to trip will resume.
     */
    msgTypeUrls: string[];
}
export interface MsgResetCircuitBreakerProtoMsg {
    typeUrl: "/cosmos.circuit.v1.MsgResetCircuitBreaker";
    value: Uint8Array;
}
/** MsgResetCircuitBreaker defines the Msg/ResetCircuitBreaker request type. */
export interface MsgResetCircuitBreakerAmino {
    /** authority is the account authorized to trip or reset the circuit breaker. */
    authority?: string;
    /**
     * msg_type_urls specifies a list of Msg type URLs to resume processing. If
     * it is left empty all Msg processing for type URLs that the account is
     * authorized to trip will resume.
     */
    msg_type_urls?: string[];
}
export interface MsgResetCircuitBreakerAminoMsg {
    type: "cosmos-sdk/MsgResetCircuitBreaker";
    value: MsgResetCircuitBreakerAmino;
}
/** MsgResetCircuitBreaker defines the Msg/ResetCircuitBreaker request type. */
export interface MsgResetCircuitBreakerSDKType {
    authority: string;
    msg_type_urls: string[];
}
/** MsgResetCircuitBreakerResponse defines the Msg/ResetCircuitBreaker response type. */
export interface MsgResetCircuitBreakerResponse {
    success: boolean;
}
export interface MsgResetCircuitBreakerResponseProtoMsg {
    typeUrl: "/cosmos.circuit.v1.MsgResetCircuitBreakerResponse";
    value: Uint8Array;
}
/** MsgResetCircuitBreakerResponse defines the Msg/ResetCircuitBreaker response type. */
export interface MsgResetCircuitBreakerResponseAmino {
    success?: boolean;
}
export interface MsgResetCircuitBreakerResponseAminoMsg {
    type: "cosmos-sdk/MsgResetCircuitBreakerResponse";
    value: MsgResetCircuitBreakerResponseAmino;
}
/** MsgResetCircuitBreakerResponse defines the Msg/ResetCircuitBreaker response type. */
export interface MsgResetCircuitBreakerResponseSDKType {
    success: boolean;
}
export declare const MsgAuthorizeCircuitBreaker: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgAuthorizeCircuitBreaker;
    isSDK(o: any): o is MsgAuthorizeCircuitBreakerSDKType;
    isAmino(o: any): o is MsgAuthorizeCircuitBreakerAmino;
    encode(message: MsgAuthorizeCircuitBreaker, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgAuthorizeCircuitBreaker;
    fromPartial(object: Partial<MsgAuthorizeCircuitBreaker>): MsgAuthorizeCircuitBreaker;
    fromAmino(object: MsgAuthorizeCircuitBreakerAmino): MsgAuthorizeCircuitBreaker;
    toAmino(message: MsgAuthorizeCircuitBreaker): MsgAuthorizeCircuitBreakerAmino;
    fromAminoMsg(object: MsgAuthorizeCircuitBreakerAminoMsg): MsgAuthorizeCircuitBreaker;
    toAminoMsg(message: MsgAuthorizeCircuitBreaker): MsgAuthorizeCircuitBreakerAminoMsg;
    fromProtoMsg(message: MsgAuthorizeCircuitBreakerProtoMsg): MsgAuthorizeCircuitBreaker;
    toProto(message: MsgAuthorizeCircuitBreaker): Uint8Array;
    toProtoMsg(message: MsgAuthorizeCircuitBreaker): MsgAuthorizeCircuitBreakerProtoMsg;
};
export declare const MsgAuthorizeCircuitBreakerResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgAuthorizeCircuitBreakerResponse;
    isSDK(o: any): o is MsgAuthorizeCircuitBreakerResponseSDKType;
    isAmino(o: any): o is MsgAuthorizeCircuitBreakerResponseAmino;
    encode(message: MsgAuthorizeCircuitBreakerResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgAuthorizeCircuitBreakerResponse;
    fromPartial(object: Partial<MsgAuthorizeCircuitBreakerResponse>): MsgAuthorizeCircuitBreakerResponse;
    fromAmino(object: MsgAuthorizeCircuitBreakerResponseAmino): MsgAuthorizeCircuitBreakerResponse;
    toAmino(message: MsgAuthorizeCircuitBreakerResponse): MsgAuthorizeCircuitBreakerResponseAmino;
    fromAminoMsg(object: MsgAuthorizeCircuitBreakerResponseAminoMsg): MsgAuthorizeCircuitBreakerResponse;
    toAminoMsg(message: MsgAuthorizeCircuitBreakerResponse): MsgAuthorizeCircuitBreakerResponseAminoMsg;
    fromProtoMsg(message: MsgAuthorizeCircuitBreakerResponseProtoMsg): MsgAuthorizeCircuitBreakerResponse;
    toProto(message: MsgAuthorizeCircuitBreakerResponse): Uint8Array;
    toProtoMsg(message: MsgAuthorizeCircuitBreakerResponse): MsgAuthorizeCircuitBreakerResponseProtoMsg;
};
export declare const MsgTripCircuitBreaker: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgTripCircuitBreaker;
    isSDK(o: any): o is MsgTripCircuitBreakerSDKType;
    isAmino(o: any): o is MsgTripCircuitBreakerAmino;
    encode(message: MsgTripCircuitBreaker, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgTripCircuitBreaker;
    fromPartial(object: Partial<MsgTripCircuitBreaker>): MsgTripCircuitBreaker;
    fromAmino(object: MsgTripCircuitBreakerAmino): MsgTripCircuitBreaker;
    toAmino(message: MsgTripCircuitBreaker): MsgTripCircuitBreakerAmino;
    fromAminoMsg(object: MsgTripCircuitBreakerAminoMsg): MsgTripCircuitBreaker;
    toAminoMsg(message: MsgTripCircuitBreaker): MsgTripCircuitBreakerAminoMsg;
    fromProtoMsg(message: MsgTripCircuitBreakerProtoMsg): MsgTripCircuitBreaker;
    toProto(message: MsgTripCircuitBreaker): Uint8Array;
    toProtoMsg(message: MsgTripCircuitBreaker): MsgTripCircuitBreakerProtoMsg;
};
export declare const MsgTripCircuitBreakerResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgTripCircuitBreakerResponse;
    isSDK(o: any): o is MsgTripCircuitBreakerResponseSDKType;
    isAmino(o: any): o is MsgTripCircuitBreakerResponseAmino;
    encode(message: MsgTripCircuitBreakerResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgTripCircuitBreakerResponse;
    fromPartial(object: Partial<MsgTripCircuitBreakerResponse>): MsgTripCircuitBreakerResponse;
    fromAmino(object: MsgTripCircuitBreakerResponseAmino): MsgTripCircuitBreakerResponse;
    toAmino(message: MsgTripCircuitBreakerResponse): MsgTripCircuitBreakerResponseAmino;
    fromAminoMsg(object: MsgTripCircuitBreakerResponseAminoMsg): MsgTripCircuitBreakerResponse;
    toAminoMsg(message: MsgTripCircuitBreakerResponse): MsgTripCircuitBreakerResponseAminoMsg;
    fromProtoMsg(message: MsgTripCircuitBreakerResponseProtoMsg): MsgTripCircuitBreakerResponse;
    toProto(message: MsgTripCircuitBreakerResponse): Uint8Array;
    toProtoMsg(message: MsgTripCircuitBreakerResponse): MsgTripCircuitBreakerResponseProtoMsg;
};
export declare const MsgResetCircuitBreaker: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgResetCircuitBreaker;
    isSDK(o: any): o is MsgResetCircuitBreakerSDKType;
    isAmino(o: any): o is MsgResetCircuitBreakerAmino;
    encode(message: MsgResetCircuitBreaker, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgResetCircuitBreaker;
    fromPartial(object: Partial<MsgResetCircuitBreaker>): MsgResetCircuitBreaker;
    fromAmino(object: MsgResetCircuitBreakerAmino): MsgResetCircuitBreaker;
    toAmino(message: MsgResetCircuitBreaker): MsgResetCircuitBreakerAmino;
    fromAminoMsg(object: MsgResetCircuitBreakerAminoMsg): MsgResetCircuitBreaker;
    toAminoMsg(message: MsgResetCircuitBreaker): MsgResetCircuitBreakerAminoMsg;
    fromProtoMsg(message: MsgResetCircuitBreakerProtoMsg): MsgResetCircuitBreaker;
    toProto(message: MsgResetCircuitBreaker): Uint8Array;
    toProtoMsg(message: MsgResetCircuitBreaker): MsgResetCircuitBreakerProtoMsg;
};
export declare const MsgResetCircuitBreakerResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgResetCircuitBreakerResponse;
    isSDK(o: any): o is MsgResetCircuitBreakerResponseSDKType;
    isAmino(o: any): o is MsgResetCircuitBreakerResponseAmino;
    encode(message: MsgResetCircuitBreakerResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgResetCircuitBreakerResponse;
    fromPartial(object: Partial<MsgResetCircuitBreakerResponse>): MsgResetCircuitBreakerResponse;
    fromAmino(object: MsgResetCircuitBreakerResponseAmino): MsgResetCircuitBreakerResponse;
    toAmino(message: MsgResetCircuitBreakerResponse): MsgResetCircuitBreakerResponseAmino;
    fromAminoMsg(object: MsgResetCircuitBreakerResponseAminoMsg): MsgResetCircuitBreakerResponse;
    toAminoMsg(message: MsgResetCircuitBreakerResponse): MsgResetCircuitBreakerResponseAminoMsg;
    fromProtoMsg(message: MsgResetCircuitBreakerResponseProtoMsg): MsgResetCircuitBreakerResponse;
    toProto(message: MsgResetCircuitBreakerResponse): Uint8Array;
    toProtoMsg(message: MsgResetCircuitBreakerResponse): MsgResetCircuitBreakerResponseProtoMsg;
};
