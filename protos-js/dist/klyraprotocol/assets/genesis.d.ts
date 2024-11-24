import { Asset, AssetAmino, AssetSDKType } from "./asset";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the assets module's genesis state. */
export interface GenesisState {
    assets: Asset[];
}
export interface GenesisStateProtoMsg {
    typeUrl: "/klyraprotocol.assets.GenesisState";
    value: Uint8Array;
}
/** GenesisState defines the assets module's genesis state. */
export interface GenesisStateAmino {
    assets?: AssetAmino[];
}
export interface GenesisStateAminoMsg {
    type: "/klyraprotocol.assets.GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState defines the assets module's genesis state. */
export interface GenesisStateSDKType {
    assets: AssetSDKType[];
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
