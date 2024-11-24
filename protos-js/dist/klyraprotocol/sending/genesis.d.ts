import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the sending module's genesis state. */
export interface GenesisState {
}
export interface GenesisStateProtoMsg {
    typeUrl: "/klyraprotocol.sending.GenesisState";
    value: Uint8Array;
}
/** GenesisState defines the sending module's genesis state. */
export interface GenesisStateAmino {
}
export interface GenesisStateAminoMsg {
    type: "/klyraprotocol.sending.GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState defines the sending module's genesis state. */
export interface GenesisStateSDKType {
}
export declare const GenesisState: {
    typeUrl: string;
    is(o: any): o is GenesisState;
    isSDK(o: any): o is GenesisStateSDKType;
    isAmino(o: any): o is GenesisStateAmino;
    encode(_: GenesisState, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GenesisState;
    fromPartial(_: Partial<GenesisState>): GenesisState;
    fromAmino(_: GenesisStateAmino): GenesisState;
    toAmino(_: GenesisState): GenesisStateAmino;
    fromAminoMsg(object: GenesisStateAminoMsg): GenesisState;
    fromProtoMsg(message: GenesisStateProtoMsg): GenesisState;
    toProto(message: GenesisState): Uint8Array;
    toProtoMsg(message: GenesisState): GenesisStateProtoMsg;
};
