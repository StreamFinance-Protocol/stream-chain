import { BinaryReader, BinaryWriter } from "../../../../binary";
/** Module is the config object for the auth module. */
export interface Module {
    /** bech32_prefix is the bech32 account prefix for the app. */
    bech32Prefix: string;
    /** module_account_permissions are module account permissions. */
    moduleAccountPermissions: ModuleAccountPermission[];
    /** authority defines the custom module authority. If not set, defaults to the governance module. */
    authority: string;
}
export interface ModuleProtoMsg {
    typeUrl: "/cosmos.auth.module.v1.Module";
    value: Uint8Array;
}
/** Module is the config object for the auth module. */
export interface ModuleAmino {
    /** bech32_prefix is the bech32 account prefix for the app. */
    bech32_prefix?: string;
    /** module_account_permissions are module account permissions. */
    module_account_permissions?: ModuleAccountPermissionAmino[];
    /** authority defines the custom module authority. If not set, defaults to the governance module. */
    authority?: string;
}
export interface ModuleAminoMsg {
    type: "cosmos-sdk/Module";
    value: ModuleAmino;
}
/** Module is the config object for the auth module. */
export interface ModuleSDKType {
    bech32_prefix: string;
    module_account_permissions: ModuleAccountPermissionSDKType[];
    authority: string;
}
/** ModuleAccountPermission represents permissions for a module account. */
export interface ModuleAccountPermission {
    /** account is the name of the module. */
    account: string;
    /**
     * permissions are the permissions this module has. Currently recognized
     * values are minter, burner and staking.
     */
    permissions: string[];
}
export interface ModuleAccountPermissionProtoMsg {
    typeUrl: "/cosmos.auth.module.v1.ModuleAccountPermission";
    value: Uint8Array;
}
/** ModuleAccountPermission represents permissions for a module account. */
export interface ModuleAccountPermissionAmino {
    /** account is the name of the module. */
    account?: string;
    /**
     * permissions are the permissions this module has. Currently recognized
     * values are minter, burner and staking.
     */
    permissions?: string[];
}
export interface ModuleAccountPermissionAminoMsg {
    type: "cosmos-sdk/ModuleAccountPermission";
    value: ModuleAccountPermissionAmino;
}
/** ModuleAccountPermission represents permissions for a module account. */
export interface ModuleAccountPermissionSDKType {
    account: string;
    permissions: string[];
}
export declare const Module: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is Module;
    isSDK(o: any): o is ModuleSDKType;
    isAmino(o: any): o is ModuleAmino;
    encode(message: Module, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Module;
    fromPartial(object: Partial<Module>): Module;
    fromAmino(object: ModuleAmino): Module;
    toAmino(message: Module): ModuleAmino;
    fromAminoMsg(object: ModuleAminoMsg): Module;
    toAminoMsg(message: Module): ModuleAminoMsg;
    fromProtoMsg(message: ModuleProtoMsg): Module;
    toProto(message: Module): Uint8Array;
    toProtoMsg(message: Module): ModuleProtoMsg;
};
export declare const ModuleAccountPermission: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is ModuleAccountPermission;
    isSDK(o: any): o is ModuleAccountPermissionSDKType;
    isAmino(o: any): o is ModuleAccountPermissionAmino;
    encode(message: ModuleAccountPermission, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ModuleAccountPermission;
    fromPartial(object: Partial<ModuleAccountPermission>): ModuleAccountPermission;
    fromAmino(object: ModuleAccountPermissionAmino): ModuleAccountPermission;
    toAmino(message: ModuleAccountPermission): ModuleAccountPermissionAmino;
    fromAminoMsg(object: ModuleAccountPermissionAminoMsg): ModuleAccountPermission;
    toAminoMsg(message: ModuleAccountPermission): ModuleAccountPermissionAminoMsg;
    fromProtoMsg(message: ModuleAccountPermissionProtoMsg): ModuleAccountPermission;
    toProto(message: ModuleAccountPermission): Uint8Array;
    toProtoMsg(message: ModuleAccountPermission): ModuleAccountPermissionProtoMsg;
};
