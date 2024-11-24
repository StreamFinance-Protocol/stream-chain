import { BinaryReader, BinaryWriter } from "../../../binary";
/** Level is the permission level. */
export declare enum Permissions_Level {
    /**
     * LEVEL_NONE_UNSPECIFIED - LEVEL_NONE_UNSPECIFIED indicates that the account will have no circuit
     * breaker permissions.
     */
    LEVEL_NONE_UNSPECIFIED = 0,
    /**
     * LEVEL_SOME_MSGS - LEVEL_SOME_MSGS indicates that the account will have permission to
     * trip or reset the circuit breaker for some Msg type URLs. If this level
     * is chosen, a non-empty list of Msg type URLs must be provided in
     * limit_type_urls.
     */
    LEVEL_SOME_MSGS = 1,
    /**
     * LEVEL_ALL_MSGS - LEVEL_ALL_MSGS indicates that the account can trip or reset the circuit
     * breaker for Msg's of all type URLs.
     */
    LEVEL_ALL_MSGS = 2,
    /**
     * LEVEL_SUPER_ADMIN - LEVEL_SUPER_ADMIN indicates that the account can take all circuit breaker
     * actions and can grant permissions to other accounts.
     */
    LEVEL_SUPER_ADMIN = 3,
    UNRECOGNIZED = -1
}
export declare const Permissions_LevelSDKType: typeof Permissions_Level;
export declare const Permissions_LevelAmino: typeof Permissions_Level;
export declare function permissions_LevelFromJSON(object: any): Permissions_Level;
export declare function permissions_LevelToJSON(object: Permissions_Level): string;
/**
 * Permissions are the permissions that an account has to trip
 * or reset the circuit breaker.
 */
export interface Permissions {
    /** level is the level of permissions granted to this account. */
    level: Permissions_Level;
    /**
     * limit_type_urls is used with LEVEL_SOME_MSGS to limit the lists of Msg type
     * URLs that the account can trip. It is an error to use limit_type_urls with
     * a level other than LEVEL_SOME_MSGS.
     */
    limitTypeUrls: string[];
}
export interface PermissionsProtoMsg {
    typeUrl: "/cosmos.circuit.v1.Permissions";
    value: Uint8Array;
}
/**
 * Permissions are the permissions that an account has to trip
 * or reset the circuit breaker.
 */
export interface PermissionsAmino {
    /** level is the level of permissions granted to this account. */
    level?: Permissions_Level;
    /**
     * limit_type_urls is used with LEVEL_SOME_MSGS to limit the lists of Msg type
     * URLs that the account can trip. It is an error to use limit_type_urls with
     * a level other than LEVEL_SOME_MSGS.
     */
    limit_type_urls?: string[];
}
export interface PermissionsAminoMsg {
    type: "cosmos-sdk/Permissions";
    value: PermissionsAmino;
}
/**
 * Permissions are the permissions that an account has to trip
 * or reset the circuit breaker.
 */
export interface PermissionsSDKType {
    level: Permissions_Level;
    limit_type_urls: string[];
}
/** GenesisAccountPermissions is the account permissions for the circuit breaker in genesis */
export interface GenesisAccountPermissions {
    address: string;
    permissions?: Permissions;
}
export interface GenesisAccountPermissionsProtoMsg {
    typeUrl: "/cosmos.circuit.v1.GenesisAccountPermissions";
    value: Uint8Array;
}
/** GenesisAccountPermissions is the account permissions for the circuit breaker in genesis */
export interface GenesisAccountPermissionsAmino {
    address?: string;
    permissions?: PermissionsAmino;
}
export interface GenesisAccountPermissionsAminoMsg {
    type: "cosmos-sdk/GenesisAccountPermissions";
    value: GenesisAccountPermissionsAmino;
}
/** GenesisAccountPermissions is the account permissions for the circuit breaker in genesis */
export interface GenesisAccountPermissionsSDKType {
    address: string;
    permissions?: PermissionsSDKType;
}
/** GenesisState is the state that must be provided at genesis. */
export interface GenesisState {
    accountPermissions: GenesisAccountPermissions[];
    disabledTypeUrls: string[];
}
export interface GenesisStateProtoMsg {
    typeUrl: "/cosmos.circuit.v1.GenesisState";
    value: Uint8Array;
}
/** GenesisState is the state that must be provided at genesis. */
export interface GenesisStateAmino {
    account_permissions?: GenesisAccountPermissionsAmino[];
    disabled_type_urls?: string[];
}
export interface GenesisStateAminoMsg {
    type: "cosmos-sdk/GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState is the state that must be provided at genesis. */
export interface GenesisStateSDKType {
    account_permissions: GenesisAccountPermissionsSDKType[];
    disabled_type_urls: string[];
}
export declare const Permissions: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is Permissions;
    isSDK(o: any): o is PermissionsSDKType;
    isAmino(o: any): o is PermissionsAmino;
    encode(message: Permissions, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Permissions;
    fromPartial(object: Partial<Permissions>): Permissions;
    fromAmino(object: PermissionsAmino): Permissions;
    toAmino(message: Permissions): PermissionsAmino;
    fromAminoMsg(object: PermissionsAminoMsg): Permissions;
    toAminoMsg(message: Permissions): PermissionsAminoMsg;
    fromProtoMsg(message: PermissionsProtoMsg): Permissions;
    toProto(message: Permissions): Uint8Array;
    toProtoMsg(message: Permissions): PermissionsProtoMsg;
};
export declare const GenesisAccountPermissions: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is GenesisAccountPermissions;
    isSDK(o: any): o is GenesisAccountPermissionsSDKType;
    isAmino(o: any): o is GenesisAccountPermissionsAmino;
    encode(message: GenesisAccountPermissions, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GenesisAccountPermissions;
    fromPartial(object: Partial<GenesisAccountPermissions>): GenesisAccountPermissions;
    fromAmino(object: GenesisAccountPermissionsAmino): GenesisAccountPermissions;
    toAmino(message: GenesisAccountPermissions): GenesisAccountPermissionsAmino;
    fromAminoMsg(object: GenesisAccountPermissionsAminoMsg): GenesisAccountPermissions;
    toAminoMsg(message: GenesisAccountPermissions): GenesisAccountPermissionsAminoMsg;
    fromProtoMsg(message: GenesisAccountPermissionsProtoMsg): GenesisAccountPermissions;
    toProto(message: GenesisAccountPermissions): Uint8Array;
    toProtoMsg(message: GenesisAccountPermissions): GenesisAccountPermissionsProtoMsg;
};
export declare const GenesisState: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is GenesisState;
    isSDK(o: any): o is GenesisStateSDKType;
    isAmino(o: any): o is GenesisStateAmino;
    encode(message: GenesisState, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GenesisState;
    fromPartial(object: Partial<GenesisState>): GenesisState;
    fromAmino(object: GenesisStateAmino): GenesisState;
    toAmino(message: GenesisState): GenesisStateAmino;
    fromAminoMsg(object: GenesisStateAminoMsg): GenesisState;
    toAminoMsg(message: GenesisState): GenesisStateAminoMsg;
    fromProtoMsg(message: GenesisStateProtoMsg): GenesisState;
    toProto(message: GenesisState): Uint8Array;
    toProtoMsg(message: GenesisState): GenesisStateProtoMsg;
};
