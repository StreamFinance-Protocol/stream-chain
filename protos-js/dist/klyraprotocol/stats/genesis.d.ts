import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the stats module's genesis state. */
export interface GenesisState {
    /** The parameters of the module. */
    params: Params;
}
export interface GenesisStateProtoMsg {
    typeUrl: "/klyraprotocol.stats.GenesisState";
    value: Uint8Array;
}
/** GenesisState defines the stats module's genesis state. */
export interface GenesisStateAmino {
    /** The parameters of the module. */
    params?: ParamsAmino;
}
export interface GenesisStateAminoMsg {
    type: "/klyraprotocol.stats.GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState defines the stats module's genesis state. */
export interface GenesisStateSDKType {
    params: ParamsSDKType;
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
