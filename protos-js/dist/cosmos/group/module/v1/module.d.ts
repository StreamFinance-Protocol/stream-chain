import { Duration, DurationAmino, DurationSDKType } from "../../../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/** Module is the config object of the group module. */
export interface Module {
    /**
     * max_execution_period defines the max duration after a proposal's voting period ends that members can send a MsgExec
     * to execute the proposal.
     */
    maxExecutionPeriod: Duration;
    /**
     * max_metadata_len defines the max length of the metadata bytes field for various entities within the group module.
     * Defaults to 255 if not explicitly set.
     */
    maxMetadataLen: bigint;
}
export interface ModuleProtoMsg {
    typeUrl: "/cosmos.group.module.v1.Module";
    value: Uint8Array;
}
/** Module is the config object of the group module. */
export interface ModuleAmino {
    /**
     * max_execution_period defines the max duration after a proposal's voting period ends that members can send a MsgExec
     * to execute the proposal.
     */
    max_execution_period: DurationAmino;
    /**
     * max_metadata_len defines the max length of the metadata bytes field for various entities within the group module.
     * Defaults to 255 if not explicitly set.
     */
    max_metadata_len?: string;
}
export interface ModuleAminoMsg {
    type: "cosmos-sdk/Module";
    value: ModuleAmino;
}
/** Module is the config object of the group module. */
export interface ModuleSDKType {
    max_execution_period: DurationSDKType;
    max_metadata_len: bigint;
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
