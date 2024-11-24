import { BinaryReader, BinaryWriter } from "../../../../binary";
/**
 * Module defines the ORM module which adds providers to the app container for
 * ORM ModuleDB's and in the future will automatically register query
 * services for modules that use the ORM.
 */
export interface Module {
}
export interface ModuleProtoMsg {
    typeUrl: "/cosmos.orm.module.v1alpha1.Module";
    value: Uint8Array;
}
/**
 * Module defines the ORM module which adds providers to the app container for
 * ORM ModuleDB's and in the future will automatically register query
 * services for modules that use the ORM.
 */
export interface ModuleAmino {
}
export interface ModuleAminoMsg {
    type: "cosmos-sdk/Module";
    value: ModuleAmino;
}
/**
 * Module defines the ORM module which adds providers to the app container for
 * ORM ModuleDB's and in the future will automatically register query
 * services for modules that use the ORM.
 */
export interface ModuleSDKType {
}
export declare const Module: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is Module;
    isSDK(o: any): o is ModuleSDKType;
    isAmino(o: any): o is ModuleAmino;
    encode(_: Module, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Module;
    fromPartial(_: Partial<Module>): Module;
    fromAmino(_: ModuleAmino): Module;
    toAmino(_: Module): ModuleAmino;
    fromAminoMsg(object: ModuleAminoMsg): Module;
    toAminoMsg(message: Module): ModuleAminoMsg;
    fromProtoMsg(message: ModuleProtoMsg): Module;
    toProto(message: Module): Uint8Array;
    toProtoMsg(message: Module): ModuleProtoMsg;
};
