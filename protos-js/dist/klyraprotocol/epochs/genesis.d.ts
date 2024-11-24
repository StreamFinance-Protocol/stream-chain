import { EpochInfo, EpochInfoAmino, EpochInfoSDKType } from "./epoch_info";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the epochs module's genesis state. */
export interface GenesisState {
    epochInfoList: EpochInfo[];
}
export interface GenesisStateProtoMsg {
    typeUrl: "/klyraprotocol.epochs.GenesisState";
    value: Uint8Array;
}
/** GenesisState defines the epochs module's genesis state. */
export interface GenesisStateAmino {
    epoch_info_list?: EpochInfoAmino[];
}
export interface GenesisStateAminoMsg {
    type: "/klyraprotocol.epochs.GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState defines the epochs module's genesis state. */
export interface GenesisStateSDKType {
    epoch_info_list: EpochInfoSDKType[];
}
export declare const GenesisState: {
    typeUrl: string;
    is(o: any): o is GenesisState;
    isSDK(o: any): o is GenesisStateSDKType;
    isAmino(o: any): o is GenesisStateAmino;
    encode(message: GenesisState, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GenesisState;
    fromPartial(object: Partial<GenesisState>): GenesisState;
    fromAmino(object: GenesisStateAmino): GenesisState;
    toAmino(message: GenesisState): GenesisStateAmino;
    fromAminoMsg(object: GenesisStateAminoMsg): GenesisState;
    fromProtoMsg(message: GenesisStateProtoMsg): GenesisState;
    toProto(message: GenesisState): Uint8Array;
    toProtoMsg(message: GenesisState): GenesisStateProtoMsg;
};
