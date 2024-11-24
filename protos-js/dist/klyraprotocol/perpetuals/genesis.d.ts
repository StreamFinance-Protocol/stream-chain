import { Perpetual, PerpetualAmino, PerpetualSDKType, LiquidityTier, LiquidityTierAmino, LiquidityTierSDKType } from "./perpetual";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the perpetuals module's genesis state. */
export interface GenesisState {
    perpetuals: Perpetual[];
    liquidityTiers: LiquidityTier[];
    params: Params;
}
export interface GenesisStateProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.GenesisState";
    value: Uint8Array;
}
/** GenesisState defines the perpetuals module's genesis state. */
export interface GenesisStateAmino {
    perpetuals?: PerpetualAmino[];
    liquidity_tiers?: LiquidityTierAmino[];
    params?: ParamsAmino;
}
export interface GenesisStateAminoMsg {
    type: "/klyraprotocol.perpetuals.GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState defines the perpetuals module's genesis state. */
export interface GenesisStateSDKType {
    perpetuals: PerpetualSDKType[];
    liquidity_tiers: LiquidityTierSDKType[];
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
