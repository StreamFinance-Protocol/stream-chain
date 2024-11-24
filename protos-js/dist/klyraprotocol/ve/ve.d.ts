import { BinaryReader, BinaryWriter } from "../../binary";
/** PricePair defines a pair of prices for a market. */
export interface PricePair {
    marketId: number;
    /** Plain oracle price (used for funding rates) */
    spotPrice: Uint8Array;
    /** Funding rate weighted price (used for pnl and liquidations) */
    pnlPrice: Uint8Array;
}
export interface PricePairProtoMsg {
    typeUrl: "/klyraprotocol.ve.PricePair";
    value: Uint8Array;
}
/** PricePair defines a pair of prices for a market. */
export interface PricePairAmino {
    market_id?: number;
    /** Plain oracle price (used for funding rates) */
    spot_price?: string;
    /** Funding rate weighted price (used for pnl and liquidations) */
    pnl_price?: string;
}
export interface PricePairAminoMsg {
    type: "/klyraprotocol.ve.PricePair";
    value: PricePairAmino;
}
/** PricePair defines a pair of prices for a market. */
export interface PricePairSDKType {
    market_id: number;
    spot_price: Uint8Array;
    pnl_price: Uint8Array;
}
/** Daemon VoteExtension defines the vote extension structure for daemon prices. */
export interface DaemonVoteExtension {
    /** Prices defines a map of marketId -> PricePair. */
    prices: PricePair[];
    /** sDaiConversionRate defines the conversion rate for sDAI. */
    sDaiConversionRate: string;
}
export interface DaemonVoteExtensionProtoMsg {
    typeUrl: "/klyraprotocol.ve.DaemonVoteExtension";
    value: Uint8Array;
}
/** Daemon VoteExtension defines the vote extension structure for daemon prices. */
export interface DaemonVoteExtensionAmino {
    /** Prices defines a map of marketId -> PricePair. */
    prices?: PricePairAmino[];
    /** sDaiConversionRate defines the conversion rate for sDAI. */
    s_dai_conversion_rate?: string;
}
export interface DaemonVoteExtensionAminoMsg {
    type: "/klyraprotocol.ve.DaemonVoteExtension";
    value: DaemonVoteExtensionAmino;
}
/** Daemon VoteExtension defines the vote extension structure for daemon prices. */
export interface DaemonVoteExtensionSDKType {
    prices: PricePairSDKType[];
    s_dai_conversion_rate: string;
}
export declare const PricePair: {
    typeUrl: string;
    is(o: any): o is PricePair;
    isSDK(o: any): o is PricePairSDKType;
    isAmino(o: any): o is PricePairAmino;
    encode(message: PricePair, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PricePair;
    fromPartial(object: Partial<PricePair>): PricePair;
    fromAmino(object: PricePairAmino): PricePair;
    toAmino(message: PricePair): PricePairAmino;
    fromAminoMsg(object: PricePairAminoMsg): PricePair;
    fromProtoMsg(message: PricePairProtoMsg): PricePair;
    toProto(message: PricePair): Uint8Array;
    toProtoMsg(message: PricePair): PricePairProtoMsg;
};
export declare const DaemonVoteExtension: {
    typeUrl: string;
    is(o: any): o is DaemonVoteExtension;
    isSDK(o: any): o is DaemonVoteExtensionSDKType;
    isAmino(o: any): o is DaemonVoteExtensionAmino;
    encode(message: DaemonVoteExtension, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): DaemonVoteExtension;
    fromPartial(object: Partial<DaemonVoteExtension>): DaemonVoteExtension;
    fromAmino(object: DaemonVoteExtensionAmino): DaemonVoteExtension;
    toAmino(message: DaemonVoteExtension): DaemonVoteExtensionAmino;
    fromAminoMsg(object: DaemonVoteExtensionAminoMsg): DaemonVoteExtension;
    fromProtoMsg(message: DaemonVoteExtensionProtoMsg): DaemonVoteExtension;
    toProto(message: DaemonVoteExtension): Uint8Array;
    toProtoMsg(message: DaemonVoteExtension): DaemonVoteExtensionProtoMsg;
};
