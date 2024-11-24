import { DowntimeParams, DowntimeParamsAmino, DowntimeParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the blocktime module's genesis state. */
export interface GenesisState {
    params: DowntimeParams;
}
export interface GenesisStateProtoMsg {
    typeUrl: "/klyraprotocol.blocktime.GenesisState";
    value: Uint8Array;
}
/** GenesisState defines the blocktime module's genesis state. */
export interface GenesisStateAmino {
    params?: DowntimeParamsAmino;
}
export interface GenesisStateAminoMsg {
    type: "/klyraprotocol.blocktime.GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState defines the blocktime module's genesis state. */
export interface GenesisStateSDKType {
    params: DowntimeParamsSDKType;
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
