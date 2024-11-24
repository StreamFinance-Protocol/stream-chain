import { LimitParams, LimitParamsAmino, LimitParamsSDKType } from "./limit_params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the ratelimit module's genesis state. */
export interface GenesisState {
    /** limit_params_list defines the list of `LimitParams` at genesis. */
    limitParamsList: LimitParams[];
}
export interface GenesisStateProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.GenesisState";
    value: Uint8Array;
}
/** GenesisState defines the ratelimit module's genesis state. */
export interface GenesisStateAmino {
    /** limit_params_list defines the list of `LimitParams` at genesis. */
    limit_params_list?: LimitParamsAmino[];
}
export interface GenesisStateAminoMsg {
    type: "/klyraprotocol.ratelimit.GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState defines the ratelimit module's genesis state. */
export interface GenesisStateSDKType {
    limit_params_list: LimitParamsSDKType[];
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
