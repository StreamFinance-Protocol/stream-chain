import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * MarketParam represents the x/prices configuration for markets, including
 * representing price values, resolving markets on individual exchanges, and
 * generating price updates. This configuration is specific to the quote
 * currency.
 */
export interface MarketParam {
    /** Unique, sequentially-generated value. */
    id: number;
    /** The human-readable name of the market pair (e.g. `BTC-USD`). */
    pair: string;
    /**
     * Static value. The exponent of the price.
     * For example if `Exponent == -5` then a `Value` of `1,000,000,000`
     * represents ``$10,000`. Therefore `10 ^ Exponent` represents the smallest
     * price step (in dollars) that can be recorded.
     */
    exponent: number;
    /**
     * The minimum number of exchanges that should be reporting a live price for
     * a price update to be considered valid.
     */
    minExchanges: number;
    /**
     * The minimum allowable change in `price` value that would cause a price
     * update on the network. Measured as `1e-6` (parts per million).
     */
    minPriceChangePpm: number;
    /**
     * A string of json that encodes the configuration for resolving the price
     * of this market on various exchanges.
     */
    exchangeConfigJson: string;
}
export interface MarketParamProtoMsg {
    typeUrl: "/klyraprotocol.prices.MarketParam";
    value: Uint8Array;
}
/**
 * MarketParam represents the x/prices configuration for markets, including
 * representing price values, resolving markets on individual exchanges, and
 * generating price updates. This configuration is specific to the quote
 * currency.
 */
export interface MarketParamAmino {
    /** Unique, sequentially-generated value. */
    id?: number;
    /** The human-readable name of the market pair (e.g. `BTC-USD`). */
    pair?: string;
    /**
     * Static value. The exponent of the price.
     * For example if `Exponent == -5` then a `Value` of `1,000,000,000`
     * represents ``$10,000`. Therefore `10 ^ Exponent` represents the smallest
     * price step (in dollars) that can be recorded.
     */
    exponent?: number;
    /**
     * The minimum number of exchanges that should be reporting a live price for
     * a price update to be considered valid.
     */
    min_exchanges?: number;
    /**
     * The minimum allowable change in `price` value that would cause a price
     * update on the network. Measured as `1e-6` (parts per million).
     */
    min_price_change_ppm?: number;
    /**
     * A string of json that encodes the configuration for resolving the price
     * of this market on various exchanges.
     */
    exchange_config_json?: string;
}
export interface MarketParamAminoMsg {
    type: "/klyraprotocol.prices.MarketParam";
    value: MarketParamAmino;
}
/**
 * MarketParam represents the x/prices configuration for markets, including
 * representing price values, resolving markets on individual exchanges, and
 * generating price updates. This configuration is specific to the quote
 * currency.
 */
export interface MarketParamSDKType {
    id: number;
    pair: string;
    exponent: number;
    min_exchanges: number;
    min_price_change_ppm: number;
    exchange_config_json: string;
}
export declare const MarketParam: {
    typeUrl: string;
    is(o: any): o is MarketParam;
    isSDK(o: any): o is MarketParamSDKType;
    isAmino(o: any): o is MarketParamAmino;
    encode(message: MarketParam, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketParam;
    fromPartial(object: Partial<MarketParam>): MarketParam;
    fromAmino(object: MarketParamAmino): MarketParam;
    toAmino(message: MarketParam): MarketParamAmino;
    fromAminoMsg(object: MarketParamAminoMsg): MarketParam;
    fromProtoMsg(message: MarketParamProtoMsg): MarketParam;
    toProto(message: MarketParam): Uint8Array;
    toProtoMsg(message: MarketParam): MarketParamProtoMsg;
};
