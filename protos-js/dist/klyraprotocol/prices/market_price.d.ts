import { BinaryReader, BinaryWriter } from "../../binary";
/** MarketPrice is used by the application to store/retrieve oracle prices. */
export interface MarketPrice {
    /** Unique, sequentially-generated value that matches `MarketParam`. */
    id: number;
    /**
     * Static value. The exponent of the price. See the comment on the duplicate
     * MarketParam field for more information.
     */
    exponent: number;
    /**
     * The spot price value that is updated by oracle price updates. `0` if it has
     * never been updated, `>0` otherwise.
     */
    spotPrice: bigint;
    /**
     * The pnl price value that is updated by oracle price updates. `0` if it has
     * never been updated, `>0` otherwise.
     */
    pnlPrice: bigint;
}
export interface MarketPriceProtoMsg {
    typeUrl: "/klyraprotocol.prices.MarketPrice";
    value: Uint8Array;
}
/** MarketPrice is used by the application to store/retrieve oracle prices. */
export interface MarketPriceAmino {
    /** Unique, sequentially-generated value that matches `MarketParam`. */
    id?: number;
    /**
     * Static value. The exponent of the price. See the comment on the duplicate
     * MarketParam field for more information.
     */
    exponent?: number;
    /**
     * The spot price value that is updated by oracle price updates. `0` if it has
     * never been updated, `>0` otherwise.
     */
    spot_price?: string;
    /**
     * The pnl price value that is updated by oracle price updates. `0` if it has
     * never been updated, `>0` otherwise.
     */
    pnl_price?: string;
}
export interface MarketPriceAminoMsg {
    type: "/klyraprotocol.prices.MarketPrice";
    value: MarketPriceAmino;
}
/** MarketPrice is used by the application to store/retrieve oracle prices. */
export interface MarketPriceSDKType {
    id: number;
    exponent: number;
    spot_price: bigint;
    pnl_price: bigint;
}
/** MarketSpotPrice is used by the application to store/retrieve spot prices. */
export interface MarketSpotPrice {
    /** Unique, sequentially-generated value that matches `MarketParam`. */
    id: number;
    /**
     * Static value. The exponent of the price. See the comment on the duplicate
     * MarketParam field for more information.
     */
    exponent: number;
    /**
     * The spot price value that is updated by oracle price updates. `0` if it has
     * never been updated, `>0` otherwise.
     */
    spotPrice: bigint;
}
export interface MarketSpotPriceProtoMsg {
    typeUrl: "/klyraprotocol.prices.MarketSpotPrice";
    value: Uint8Array;
}
/** MarketSpotPrice is used by the application to store/retrieve spot prices. */
export interface MarketSpotPriceAmino {
    /** Unique, sequentially-generated value that matches `MarketParam`. */
    id?: number;
    /**
     * Static value. The exponent of the price. See the comment on the duplicate
     * MarketParam field for more information.
     */
    exponent?: number;
    /**
     * The spot price value that is updated by oracle price updates. `0` if it has
     * never been updated, `>0` otherwise.
     */
    spot_price?: string;
}
export interface MarketSpotPriceAminoMsg {
    type: "/klyraprotocol.prices.MarketSpotPrice";
    value: MarketSpotPriceAmino;
}
/** MarketSpotPrice is used by the application to store/retrieve spot prices. */
export interface MarketSpotPriceSDKType {
    id: number;
    exponent: number;
    spot_price: bigint;
}
/** MarketPriceUpdate is used to update the price of a single market. */
export interface MarketPriceUpdate {
    /** The id of market to update */
    marketId: number;
    /** The updated spot price */
    spotPrice: bigint;
    /** The updated pnl price */
    pnlPrice: bigint;
}
export interface MarketPriceUpdateProtoMsg {
    typeUrl: "/klyraprotocol.prices.MarketPriceUpdate";
    value: Uint8Array;
}
/** MarketPriceUpdate is used to update the price of a single market. */
export interface MarketPriceUpdateAmino {
    /** The id of market to update */
    market_id?: number;
    /** The updated spot price */
    spot_price?: string;
    /** The updated pnl price */
    pnl_price?: string;
}
export interface MarketPriceUpdateAminoMsg {
    type: "/klyraprotocol.prices.MarketPriceUpdate";
    value: MarketPriceUpdateAmino;
}
/** MarketPriceUpdate is used to update the price of a single market. */
export interface MarketPriceUpdateSDKType {
    market_id: number;
    spot_price: bigint;
    pnl_price: bigint;
}
/** MarketSpotPriceUpdate is used to update the spot price of a single market. */
export interface MarketSpotPriceUpdate {
    /** The id of market to update */
    marketId: number;
    /** The updated spot price */
    spotPrice: bigint;
}
export interface MarketSpotPriceUpdateProtoMsg {
    typeUrl: "/klyraprotocol.prices.MarketSpotPriceUpdate";
    value: Uint8Array;
}
/** MarketSpotPriceUpdate is used to update the spot price of a single market. */
export interface MarketSpotPriceUpdateAmino {
    /** The id of market to update */
    market_id?: number;
    /** The updated spot price */
    spot_price?: string;
}
export interface MarketSpotPriceUpdateAminoMsg {
    type: "/klyraprotocol.prices.MarketSpotPriceUpdate";
    value: MarketSpotPriceUpdateAmino;
}
/** MarketSpotPriceUpdate is used to update the spot price of a single market. */
export interface MarketSpotPriceUpdateSDKType {
    market_id: number;
    spot_price: bigint;
}
/** MarketPnlPriceUpdate is used to update the pnl price of a single market. */
export interface MarketPnlPriceUpdate {
    /** The id of market to update */
    marketId: number;
    /** The updated pnl price */
    pnlPrice: bigint;
}
export interface MarketPnlPriceUpdateProtoMsg {
    typeUrl: "/klyraprotocol.prices.MarketPnlPriceUpdate";
    value: Uint8Array;
}
/** MarketPnlPriceUpdate is used to update the pnl price of a single market. */
export interface MarketPnlPriceUpdateAmino {
    /** The id of market to update */
    market_id?: number;
    /** The updated pnl price */
    pnl_price?: string;
}
export interface MarketPnlPriceUpdateAminoMsg {
    type: "/klyraprotocol.prices.MarketPnlPriceUpdate";
    value: MarketPnlPriceUpdateAmino;
}
/** MarketPnlPriceUpdate is used to update the pnl price of a single market. */
export interface MarketPnlPriceUpdateSDKType {
    market_id: number;
    pnl_price: bigint;
}
/** MarketPriceUpdates is a collection of MarketPriceUpdate messages. */
export interface MarketPriceUpdates {
    marketPriceUpdates: MarketPriceUpdate[];
}
export interface MarketPriceUpdatesProtoMsg {
    typeUrl: "/klyraprotocol.prices.MarketPriceUpdates";
    value: Uint8Array;
}
/** MarketPriceUpdates is a collection of MarketPriceUpdate messages. */
export interface MarketPriceUpdatesAmino {
    market_price_updates?: MarketPriceUpdateAmino[];
}
export interface MarketPriceUpdatesAminoMsg {
    type: "/klyraprotocol.prices.MarketPriceUpdates";
    value: MarketPriceUpdatesAmino;
}
/** MarketPriceUpdates is a collection of MarketPriceUpdate messages. */
export interface MarketPriceUpdatesSDKType {
    market_price_updates: MarketPriceUpdateSDKType[];
}
export declare const MarketPrice: {
    typeUrl: string;
    is(o: any): o is MarketPrice;
    isSDK(o: any): o is MarketPriceSDKType;
    isAmino(o: any): o is MarketPriceAmino;
    encode(message: MarketPrice, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketPrice;
    fromPartial(object: Partial<MarketPrice>): MarketPrice;
    fromAmino(object: MarketPriceAmino): MarketPrice;
    toAmino(message: MarketPrice): MarketPriceAmino;
    fromAminoMsg(object: MarketPriceAminoMsg): MarketPrice;
    fromProtoMsg(message: MarketPriceProtoMsg): MarketPrice;
    toProto(message: MarketPrice): Uint8Array;
    toProtoMsg(message: MarketPrice): MarketPriceProtoMsg;
};
export declare const MarketSpotPrice: {
    typeUrl: string;
    is(o: any): o is MarketSpotPrice;
    isSDK(o: any): o is MarketSpotPriceSDKType;
    isAmino(o: any): o is MarketSpotPriceAmino;
    encode(message: MarketSpotPrice, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketSpotPrice;
    fromPartial(object: Partial<MarketSpotPrice>): MarketSpotPrice;
    fromAmino(object: MarketSpotPriceAmino): MarketSpotPrice;
    toAmino(message: MarketSpotPrice): MarketSpotPriceAmino;
    fromAminoMsg(object: MarketSpotPriceAminoMsg): MarketSpotPrice;
    fromProtoMsg(message: MarketSpotPriceProtoMsg): MarketSpotPrice;
    toProto(message: MarketSpotPrice): Uint8Array;
    toProtoMsg(message: MarketSpotPrice): MarketSpotPriceProtoMsg;
};
export declare const MarketPriceUpdate: {
    typeUrl: string;
    is(o: any): o is MarketPriceUpdate;
    isSDK(o: any): o is MarketPriceUpdateSDKType;
    isAmino(o: any): o is MarketPriceUpdateAmino;
    encode(message: MarketPriceUpdate, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketPriceUpdate;
    fromPartial(object: Partial<MarketPriceUpdate>): MarketPriceUpdate;
    fromAmino(object: MarketPriceUpdateAmino): MarketPriceUpdate;
    toAmino(message: MarketPriceUpdate): MarketPriceUpdateAmino;
    fromAminoMsg(object: MarketPriceUpdateAminoMsg): MarketPriceUpdate;
    fromProtoMsg(message: MarketPriceUpdateProtoMsg): MarketPriceUpdate;
    toProto(message: MarketPriceUpdate): Uint8Array;
    toProtoMsg(message: MarketPriceUpdate): MarketPriceUpdateProtoMsg;
};
export declare const MarketSpotPriceUpdate: {
    typeUrl: string;
    is(o: any): o is MarketSpotPriceUpdate;
    isSDK(o: any): o is MarketSpotPriceUpdateSDKType;
    isAmino(o: any): o is MarketSpotPriceUpdateAmino;
    encode(message: MarketSpotPriceUpdate, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketSpotPriceUpdate;
    fromPartial(object: Partial<MarketSpotPriceUpdate>): MarketSpotPriceUpdate;
    fromAmino(object: MarketSpotPriceUpdateAmino): MarketSpotPriceUpdate;
    toAmino(message: MarketSpotPriceUpdate): MarketSpotPriceUpdateAmino;
    fromAminoMsg(object: MarketSpotPriceUpdateAminoMsg): MarketSpotPriceUpdate;
    fromProtoMsg(message: MarketSpotPriceUpdateProtoMsg): MarketSpotPriceUpdate;
    toProto(message: MarketSpotPriceUpdate): Uint8Array;
    toProtoMsg(message: MarketSpotPriceUpdate): MarketSpotPriceUpdateProtoMsg;
};
export declare const MarketPnlPriceUpdate: {
    typeUrl: string;
    is(o: any): o is MarketPnlPriceUpdate;
    isSDK(o: any): o is MarketPnlPriceUpdateSDKType;
    isAmino(o: any): o is MarketPnlPriceUpdateAmino;
    encode(message: MarketPnlPriceUpdate, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketPnlPriceUpdate;
    fromPartial(object: Partial<MarketPnlPriceUpdate>): MarketPnlPriceUpdate;
    fromAmino(object: MarketPnlPriceUpdateAmino): MarketPnlPriceUpdate;
    toAmino(message: MarketPnlPriceUpdate): MarketPnlPriceUpdateAmino;
    fromAminoMsg(object: MarketPnlPriceUpdateAminoMsg): MarketPnlPriceUpdate;
    fromProtoMsg(message: MarketPnlPriceUpdateProtoMsg): MarketPnlPriceUpdate;
    toProto(message: MarketPnlPriceUpdate): Uint8Array;
    toProtoMsg(message: MarketPnlPriceUpdate): MarketPnlPriceUpdateProtoMsg;
};
export declare const MarketPriceUpdates: {
    typeUrl: string;
    is(o: any): o is MarketPriceUpdates;
    isSDK(o: any): o is MarketPriceUpdatesSDKType;
    isAmino(o: any): o is MarketPriceUpdatesAmino;
    encode(message: MarketPriceUpdates, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketPriceUpdates;
    fromPartial(object: Partial<MarketPriceUpdates>): MarketPriceUpdates;
    fromAmino(object: MarketPriceUpdatesAmino): MarketPriceUpdates;
    toAmino(message: MarketPriceUpdates): MarketPriceUpdatesAmino;
    fromAminoMsg(object: MarketPriceUpdatesAminoMsg): MarketPriceUpdates;
    fromProtoMsg(message: MarketPriceUpdatesProtoMsg): MarketPriceUpdates;
    toProto(message: MarketPriceUpdates): Uint8Array;
    toProtoMsg(message: MarketPriceUpdates): MarketPriceUpdatesProtoMsg;
};
