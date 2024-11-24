import { BinaryReader, BinaryWriter } from "../../../../binary";
/** Module is the config object of the gov module. */
export interface Module {
    /**
     * max_metadata_len defines the maximum proposal metadata length.
     * Defaults to 255 if not explicitly set.
     */
    maxMetadataLen: bigint;
    /** authority defines the custom module authority. If not set, defaults to the governance module. */
    authority: string;
}
export interface ModuleProtoMsg {
    typeUrl: "/cosmos.gov.module.v1.Module";
    value: Uint8Array;
}
/** Module is the config object of the gov module. */
export interface ModuleAmino {
    /**
     * max_metadata_len defines the maximum proposal metadata length.
     * Defaults to 255 if not explicitly set.
     */
    max_metadata_len?: string;
    /** authority defines the custom module authority. If not set, defaults to the governance module. */
    authority?: string;
}
export interface ModuleAminoMsg {
    type: "cosmos-sdk/Module";
    value: ModuleAmino;
}
/** Module is the config object of the gov module. */
export interface ModuleSDKType {
    max_metadata_len: bigint;
    authority: string;
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
