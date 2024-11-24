import { BinaryReader, BinaryWriter } from "../../../binary";
/** UpdateMarketPriceRequest is a request message updating market prices. */
export interface UpdateMarketPricesRequest {
    marketPriceUpdates: MarketPriceUpdate[];
}
export interface UpdateMarketPricesRequestProtoMsg {
    typeUrl: "/klyraprotocol.daemons.pricefeed.UpdateMarketPricesRequest";
    value: Uint8Array;
}
/** UpdateMarketPriceRequest is a request message updating market prices. */
export interface UpdateMarketPricesRequestAmino {
    market_price_updates?: MarketPriceUpdateAmino[];
}
export interface UpdateMarketPricesRequestAminoMsg {
    type: "/klyraprotocol.daemons.pricefeed.UpdateMarketPricesRequest";
    value: UpdateMarketPricesRequestAmino;
}
/** UpdateMarketPriceRequest is a request message updating market prices. */
export interface UpdateMarketPricesRequestSDKType {
    market_price_updates: MarketPriceUpdateSDKType[];
}
/** UpdateMarketPricesResponse is a response message for updating market prices. */
export interface UpdateMarketPricesResponse {
}
export interface UpdateMarketPricesResponseProtoMsg {
    typeUrl: "/klyraprotocol.daemons.pricefeed.UpdateMarketPricesResponse";
    value: Uint8Array;
}
/** UpdateMarketPricesResponse is a response message for updating market prices. */
export interface UpdateMarketPricesResponseAmino {
}
export interface UpdateMarketPricesResponseAminoMsg {
    type: "/klyraprotocol.daemons.pricefeed.UpdateMarketPricesResponse";
    value: UpdateMarketPricesResponseAmino;
}
/** UpdateMarketPricesResponse is a response message for updating market prices. */
export interface UpdateMarketPricesResponseSDKType {
}
/** ExchangePrice represents a specific exchange's market price */
export interface ExchangePrice {
    exchangeId: string;
    price: bigint;
    lastUpdateTime?: Date;
}
export interface ExchangePriceProtoMsg {
    typeUrl: "/klyraprotocol.daemons.pricefeed.ExchangePrice";
    value: Uint8Array;
}
/** ExchangePrice represents a specific exchange's market price */
export interface ExchangePriceAmino {
    exchange_id?: string;
    price?: string;
    last_update_time?: string;
}
export interface ExchangePriceAminoMsg {
    type: "/klyraprotocol.daemons.pricefeed.ExchangePrice";
    value: ExchangePriceAmino;
}
/** ExchangePrice represents a specific exchange's market price */
export interface ExchangePriceSDKType {
    exchange_id: string;
    price: bigint;
    last_update_time?: Date;
}
/** MarketPriceUpdate represents an update to a single market */
export interface MarketPriceUpdate {
    marketId: number;
    exchangePrices: ExchangePrice[];
}
export interface MarketPriceUpdateProtoMsg {
    typeUrl: "/klyraprotocol.daemons.pricefeed.MarketPriceUpdate";
    value: Uint8Array;
}
/** MarketPriceUpdate represents an update to a single market */
export interface MarketPriceUpdateAmino {
    market_id?: number;
    exchange_prices?: ExchangePriceAmino[];
}
export interface MarketPriceUpdateAminoMsg {
    type: "/klyraprotocol.daemons.pricefeed.MarketPriceUpdate";
    value: MarketPriceUpdateAmino;
}
/** MarketPriceUpdate represents an update to a single market */
export interface MarketPriceUpdateSDKType {
    market_id: number;
    exchange_prices: ExchangePriceSDKType[];
}
export declare const UpdateMarketPricesRequest: {
    typeUrl: string;
    is(o: any): o is UpdateMarketPricesRequest;
    isSDK(o: any): o is UpdateMarketPricesRequestSDKType;
    isAmino(o: any): o is UpdateMarketPricesRequestAmino;
    encode(message: UpdateMarketPricesRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): UpdateMarketPricesRequest;
    fromPartial(object: Partial<UpdateMarketPricesRequest>): UpdateMarketPricesRequest;
    fromAmino(object: UpdateMarketPricesRequestAmino): UpdateMarketPricesRequest;
    toAmino(message: UpdateMarketPricesRequest): UpdateMarketPricesRequestAmino;
    fromAminoMsg(object: UpdateMarketPricesRequestAminoMsg): UpdateMarketPricesRequest;
    fromProtoMsg(message: UpdateMarketPricesRequestProtoMsg): UpdateMarketPricesRequest;
    toProto(message: UpdateMarketPricesRequest): Uint8Array;
    toProtoMsg(message: UpdateMarketPricesRequest): UpdateMarketPricesRequestProtoMsg;
};
export declare const UpdateMarketPricesResponse: {
    typeUrl: string;
    is(o: any): o is UpdateMarketPricesResponse;
    isSDK(o: any): o is UpdateMarketPricesResponseSDKType;
    isAmino(o: any): o is UpdateMarketPricesResponseAmino;
    encode(_: UpdateMarketPricesResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): UpdateMarketPricesResponse;
    fromPartial(_: Partial<UpdateMarketPricesResponse>): UpdateMarketPricesResponse;
    fromAmino(_: UpdateMarketPricesResponseAmino): UpdateMarketPricesResponse;
    toAmino(_: UpdateMarketPricesResponse): UpdateMarketPricesResponseAmino;
    fromAminoMsg(object: UpdateMarketPricesResponseAminoMsg): UpdateMarketPricesResponse;
    fromProtoMsg(message: UpdateMarketPricesResponseProtoMsg): UpdateMarketPricesResponse;
    toProto(message: UpdateMarketPricesResponse): Uint8Array;
    toProtoMsg(message: UpdateMarketPricesResponse): UpdateMarketPricesResponseProtoMsg;
};
export declare const ExchangePrice: {
    typeUrl: string;
    is(o: any): o is ExchangePrice;
    isSDK(o: any): o is ExchangePriceSDKType;
    isAmino(o: any): o is ExchangePriceAmino;
    encode(message: ExchangePrice, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ExchangePrice;
    fromPartial(object: Partial<ExchangePrice>): ExchangePrice;
    fromAmino(object: ExchangePriceAmino): ExchangePrice;
    toAmino(message: ExchangePrice): ExchangePriceAmino;
    fromAminoMsg(object: ExchangePriceAminoMsg): ExchangePrice;
    fromProtoMsg(message: ExchangePriceProtoMsg): ExchangePrice;
    toProto(message: ExchangePrice): Uint8Array;
    toProtoMsg(message: ExchangePrice): ExchangePriceProtoMsg;
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
