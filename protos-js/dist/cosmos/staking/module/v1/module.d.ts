import { BinaryReader, BinaryWriter } from "../../../../binary";
/** Module is the config object of the staking module. */
export interface Module {
    /**
     * hooks_order specifies the order of staking hooks and should be a list
     * of module names which provide a staking hooks instance. If no order is
     * provided, then hooks will be applied in alphabetical order of module names.
     */
    hooksOrder: string[];
    /** authority defines the custom module authority. If not set, defaults to the governance module. */
    authority: string;
    /** bech32_prefix_validator is the bech32 validator prefix for the app. */
    bech32PrefixValidator: string;
    /** bech32_prefix_consensus is the bech32 consensus node prefix for the app. */
    bech32PrefixConsensus: string;
}
export interface ModuleProtoMsg {
    typeUrl: "/cosmos.staking.module.v1.Module";
    value: Uint8Array;
}
/** Module is the config object of the staking module. */
export interface ModuleAmino {
    /**
     * hooks_order specifies the order of staking hooks and should be a list
     * of module names which provide a staking hooks instance. If no order is
     * provided, then hooks will be applied in alphabetical order of module names.
     */
    hooks_order?: string[];
    /** authority defines the custom module authority. If not set, defaults to the governance module. */
    authority?: string;
    /** bech32_prefix_validator is the bech32 validator prefix for the app. */
    bech32_prefix_validator?: string;
    /** bech32_prefix_consensus is the bech32 consensus node prefix for the app. */
    bech32_prefix_consensus?: string;
}
export interface ModuleAminoMsg {
    type: "cosmos-sdk/Module";
    value: ModuleAmino;
}
/** Module is the config object of the staking module. */
export interface ModuleSDKType {
    hooks_order: string[];
    authority: string;
    bech32_prefix_validator: string;
    bech32_prefix_consensus: string;
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
