import { MarketParam, MarketParamAmino, MarketParamSDKType } from "./market_param";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * MsgCreateOracleMarket is a message used by x/gov for creating a new oracle
 * market.
 */
export interface MsgCreateOracleMarket {
    /** The address that controls the module. */
    authority: string;
    /** `params` defines parameters for the new oracle market. */
    params: MarketParam;
}
export interface MsgCreateOracleMarketProtoMsg {
    typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket";
    value: Uint8Array;
}
/**
 * MsgCreateOracleMarket is a message used by x/gov for creating a new oracle
 * market.
 */
export interface MsgCreateOracleMarketAmino {
    /** The address that controls the module. */
    authority?: string;
    /** `params` defines parameters for the new oracle market. */
    params?: MarketParamAmino;
}
export interface MsgCreateOracleMarketAminoMsg {
    type: "/klyraprotocol.prices.MsgCreateOracleMarket";
    value: MsgCreateOracleMarketAmino;
}
/**
 * MsgCreateOracleMarket is a message used by x/gov for creating a new oracle
 * market.
 */
export interface MsgCreateOracleMarketSDKType {
    authority: string;
    params: MarketParamSDKType;
}
/** MsgCreateOracleMarketResponse defines the CreateOracleMarket response type. */
export interface MsgCreateOracleMarketResponse {
}
export interface MsgCreateOracleMarketResponseProtoMsg {
    typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarketResponse";
    value: Uint8Array;
}
/** MsgCreateOracleMarketResponse defines the CreateOracleMarket response type. */
export interface MsgCreateOracleMarketResponseAmino {
}
export interface MsgCreateOracleMarketResponseAminoMsg {
    type: "/klyraprotocol.prices.MsgCreateOracleMarketResponse";
    value: MsgCreateOracleMarketResponseAmino;
}
/** MsgCreateOracleMarketResponse defines the CreateOracleMarket response type. */
export interface MsgCreateOracleMarketResponseSDKType {
}
/**
 * MsgUpdateMarketParam is a message used by x/gov for updating the parameters
 * of an oracle market.
 */
export interface MsgUpdateMarketParam {
    authority: string;
    /** The market param to update. Each field must be set. */
    marketParam: MarketParam;
}
export interface MsgUpdateMarketParamProtoMsg {
    typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam";
    value: Uint8Array;
}
/**
 * MsgUpdateMarketParam is a message used by x/gov for updating the parameters
 * of an oracle market.
 */
export interface MsgUpdateMarketParamAmino {
    authority?: string;
    /** The market param to update. Each field must be set. */
    market_param?: MarketParamAmino;
}
export interface MsgUpdateMarketParamAminoMsg {
    type: "/klyraprotocol.prices.MsgUpdateMarketParam";
    value: MsgUpdateMarketParamAmino;
}
/**
 * MsgUpdateMarketParam is a message used by x/gov for updating the parameters
 * of an oracle market.
 */
export interface MsgUpdateMarketParamSDKType {
    authority: string;
    market_param: MarketParamSDKType;
}
/** MsgUpdateMarketParamResponse defines the UpdateMarketParam response type. */
export interface MsgUpdateMarketParamResponse {
}
export interface MsgUpdateMarketParamResponseProtoMsg {
    typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParamResponse";
    value: Uint8Array;
}
/** MsgUpdateMarketParamResponse defines the UpdateMarketParam response type. */
export interface MsgUpdateMarketParamResponseAmino {
}
export interface MsgUpdateMarketParamResponseAminoMsg {
    type: "/klyraprotocol.prices.MsgUpdateMarketParamResponse";
    value: MsgUpdateMarketParamResponseAmino;
}
/** MsgUpdateMarketParamResponse defines the UpdateMarketParam response type. */
export interface MsgUpdateMarketParamResponseSDKType {
}
export declare const MsgCreateOracleMarket: {
    typeUrl: string;
    is(o: any): o is MsgCreateOracleMarket;
    isSDK(o: any): o is MsgCreateOracleMarketSDKType;
    isAmino(o: any): o is MsgCreateOracleMarketAmino;
    encode(message: MsgCreateOracleMarket, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateOracleMarket;
    fromPartial(object: Partial<MsgCreateOracleMarket>): MsgCreateOracleMarket;
    fromAmino(object: MsgCreateOracleMarketAmino): MsgCreateOracleMarket;
    toAmino(message: MsgCreateOracleMarket): MsgCreateOracleMarketAmino;
    fromAminoMsg(object: MsgCreateOracleMarketAminoMsg): MsgCreateOracleMarket;
    fromProtoMsg(message: MsgCreateOracleMarketProtoMsg): MsgCreateOracleMarket;
    toProto(message: MsgCreateOracleMarket): Uint8Array;
    toProtoMsg(message: MsgCreateOracleMarket): MsgCreateOracleMarketProtoMsg;
};
export declare const MsgCreateOracleMarketResponse: {
    typeUrl: string;
    is(o: any): o is MsgCreateOracleMarketResponse;
    isSDK(o: any): o is MsgCreateOracleMarketResponseSDKType;
    isAmino(o: any): o is MsgCreateOracleMarketResponseAmino;
    encode(_: MsgCreateOracleMarketResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateOracleMarketResponse;
    fromPartial(_: Partial<MsgCreateOracleMarketResponse>): MsgCreateOracleMarketResponse;
    fromAmino(_: MsgCreateOracleMarketResponseAmino): MsgCreateOracleMarketResponse;
    toAmino(_: MsgCreateOracleMarketResponse): MsgCreateOracleMarketResponseAmino;
    fromAminoMsg(object: MsgCreateOracleMarketResponseAminoMsg): MsgCreateOracleMarketResponse;
    fromProtoMsg(message: MsgCreateOracleMarketResponseProtoMsg): MsgCreateOracleMarketResponse;
    toProto(message: MsgCreateOracleMarketResponse): Uint8Array;
    toProtoMsg(message: MsgCreateOracleMarketResponse): MsgCreateOracleMarketResponseProtoMsg;
};
export declare const MsgUpdateMarketParam: {
    typeUrl: string;
    is(o: any): o is MsgUpdateMarketParam;
    isSDK(o: any): o is MsgUpdateMarketParamSDKType;
    isAmino(o: any): o is MsgUpdateMarketParamAmino;
    encode(message: MsgUpdateMarketParam, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateMarketParam;
    fromPartial(object: Partial<MsgUpdateMarketParam>): MsgUpdateMarketParam;
    fromAmino(object: MsgUpdateMarketParamAmino): MsgUpdateMarketParam;
    toAmino(message: MsgUpdateMarketParam): MsgUpdateMarketParamAmino;
    fromAminoMsg(object: MsgUpdateMarketParamAminoMsg): MsgUpdateMarketParam;
    fromProtoMsg(message: MsgUpdateMarketParamProtoMsg): MsgUpdateMarketParam;
    toProto(message: MsgUpdateMarketParam): Uint8Array;
    toProtoMsg(message: MsgUpdateMarketParam): MsgUpdateMarketParamProtoMsg;
};
export declare const MsgUpdateMarketParamResponse: {
    typeUrl: string;
    is(o: any): o is MsgUpdateMarketParamResponse;
    isSDK(o: any): o is MsgUpdateMarketParamResponseSDKType;
    isAmino(o: any): o is MsgUpdateMarketParamResponseAmino;
    encode(_: MsgUpdateMarketParamResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateMarketParamResponse;
    fromPartial(_: Partial<MsgUpdateMarketParamResponse>): MsgUpdateMarketParamResponse;
    fromAmino(_: MsgUpdateMarketParamResponseAmino): MsgUpdateMarketParamResponse;
    toAmino(_: MsgUpdateMarketParamResponse): MsgUpdateMarketParamResponseAmino;
    fromAminoMsg(object: MsgUpdateMarketParamResponseAminoMsg): MsgUpdateMarketParamResponse;
    fromProtoMsg(message: MsgUpdateMarketParamResponseProtoMsg): MsgUpdateMarketParamResponse;
    toProto(message: MsgUpdateMarketParamResponse): Uint8Array;
    toProtoMsg(message: MsgUpdateMarketParamResponse): MsgUpdateMarketParamResponseProtoMsg;
};
