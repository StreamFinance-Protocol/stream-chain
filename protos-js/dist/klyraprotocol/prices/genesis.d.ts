import { MarketParam, MarketParamAmino, MarketParamSDKType } from "./market_param";
import { MarketPrice, MarketPriceAmino, MarketPriceSDKType } from "./market_price";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the prices module's genesis state. */
export interface GenesisState {
    marketParams: MarketParam[];
    marketPrices: MarketPrice[];
}
export interface GenesisStateProtoMsg {
    typeUrl: "/klyraprotocol.prices.GenesisState";
    value: Uint8Array;
}
/** GenesisState defines the prices module's genesis state. */
export interface GenesisStateAmino {
    market_params?: MarketParamAmino[];
    market_prices?: MarketPriceAmino[];
}
export interface GenesisStateAminoMsg {
    type: "/klyraprotocol.prices.GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState defines the prices module's genesis state. */
export interface GenesisStateSDKType {
    market_params: MarketParamSDKType[];
    market_prices: MarketPriceSDKType[];
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
