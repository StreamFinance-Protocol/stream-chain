import { IndexerSubaccountId, IndexerSubaccountIdAmino, IndexerSubaccountIdSDKType } from "../protocol/v1/subaccount";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** TODO(IND-210): Make this proto conform and update downstream indexer logic */
export declare enum CandleMessage_Resolution {
    /**
     * ONE_MINUTE - buf:lint:ignore ENUM_VALUE_PREFIX
     * buf:lint:ignore ENUM_ZERO_VALUE_SUFFIX
     */
    ONE_MINUTE = 0,
    /** FIVE_MINUTES - buf:lint:ignore ENUM_VALUE_PREFIX */
    FIVE_MINUTES = 1,
    /** FIFTEEN_MINUTES - buf:lint:ignore ENUM_VALUE_PREFIX */
    FIFTEEN_MINUTES = 2,
    /** THIRTY_MINUTES - buf:lint:ignore ENUM_VALUE_PREFIX */
    THIRTY_MINUTES = 3,
    /** ONE_HOUR - buf:lint:ignore ENUM_VALUE_PREFIX */
    ONE_HOUR = 4,
    /** FOUR_HOURS - buf:lint:ignore ENUM_VALUE_PREFIX */
    FOUR_HOURS = 5,
    /** ONE_DAY - buf:lint:ignore ENUM_VALUE_PREFIX */
    ONE_DAY = 6,
    UNRECOGNIZED = -1
}
export declare const CandleMessage_ResolutionSDKType: typeof CandleMessage_Resolution;
export declare const CandleMessage_ResolutionAmino: typeof CandleMessage_Resolution;
export declare function candleMessage_ResolutionFromJSON(object: any): CandleMessage_Resolution;
export declare function candleMessage_ResolutionToJSON(object: CandleMessage_Resolution): string;
/** Message to be sent through the 'to-websockets-orderbooks` kafka topic. */
export interface OrderbookMessage {
    /** Stringified JSON object of all events to be streamed. */
    contents: string;
    /** Clob pair id of the Orderbook message. */
    clobPairId: string;
    /** Version of the websocket message. */
    version: string;
}
export interface OrderbookMessageProtoMsg {
    typeUrl: "/klyraprotocol.indexer.socks.OrderbookMessage";
    value: Uint8Array;
}
/** Message to be sent through the 'to-websockets-orderbooks` kafka topic. */
export interface OrderbookMessageAmino {
    /** Stringified JSON object of all events to be streamed. */
    contents?: string;
    /** Clob pair id of the Orderbook message. */
    clob_pair_id?: string;
    /** Version of the websocket message. */
    version?: string;
}
export interface OrderbookMessageAminoMsg {
    type: "/klyraprotocol.indexer.socks.OrderbookMessage";
    value: OrderbookMessageAmino;
}
/** Message to be sent through the 'to-websockets-orderbooks` kafka topic. */
export interface OrderbookMessageSDKType {
    contents: string;
    clob_pair_id: string;
    version: string;
}
/** Message to be sent through the 'to-websockets-subaccounts` kafka topic. */
export interface SubaccountMessage {
    /** Block height where the contents occur. */
    blockHeight: string;
    /** Transaction index where the contents occur. */
    transactionIndex: number;
    /** Event index where the contents occur. */
    eventIndex: number;
    /** Stringified JSON object of all events to be streamed. */
    contents: string;
    /** Subaccount id that the content corresponds to. */
    subaccountId?: IndexerSubaccountId;
    /** Version of the websocket message. */
    version: string;
}
export interface SubaccountMessageProtoMsg {
    typeUrl: "/klyraprotocol.indexer.socks.SubaccountMessage";
    value: Uint8Array;
}
/** Message to be sent through the 'to-websockets-subaccounts` kafka topic. */
export interface SubaccountMessageAmino {
    /** Block height where the contents occur. */
    block_height?: string;
    /** Transaction index where the contents occur. */
    transaction_index?: number;
    /** Event index where the contents occur. */
    event_index?: number;
    /** Stringified JSON object of all events to be streamed. */
    contents?: string;
    /** Subaccount id that the content corresponds to. */
    subaccount_id?: IndexerSubaccountIdAmino;
    /** Version of the websocket message. */
    version?: string;
}
export interface SubaccountMessageAminoMsg {
    type: "/klyraprotocol.indexer.socks.SubaccountMessage";
    value: SubaccountMessageAmino;
}
/** Message to be sent through the 'to-websockets-subaccounts` kafka topic. */
export interface SubaccountMessageSDKType {
    block_height: string;
    transaction_index: number;
    event_index: number;
    contents: string;
    subaccount_id?: IndexerSubaccountIdSDKType;
    version: string;
}
/** Message to be sent through the 'to-websockets-trades` kafka topic. */
export interface TradeMessage {
    /** Block height where the contents occur. */
    blockHeight: string;
    /** Stringified JSON object of all events to be streamed. */
    contents: string;
    /** Clob pair id of the Trade message. */
    clobPairId: string;
    /** Version of the websocket message. */
    version: string;
}
export interface TradeMessageProtoMsg {
    typeUrl: "/klyraprotocol.indexer.socks.TradeMessage";
    value: Uint8Array;
}
/** Message to be sent through the 'to-websockets-trades` kafka topic. */
export interface TradeMessageAmino {
    /** Block height where the contents occur. */
    block_height?: string;
    /** Stringified JSON object of all events to be streamed. */
    contents?: string;
    /** Clob pair id of the Trade message. */
    clob_pair_id?: string;
    /** Version of the websocket message. */
    version?: string;
}
export interface TradeMessageAminoMsg {
    type: "/klyraprotocol.indexer.socks.TradeMessage";
    value: TradeMessageAmino;
}
/** Message to be sent through the 'to-websockets-trades` kafka topic. */
export interface TradeMessageSDKType {
    block_height: string;
    contents: string;
    clob_pair_id: string;
    version: string;
}
/** Message to be sent through the 'to-websockets-markets` kafka topic. */
export interface MarketMessage {
    /** Stringified JSON object of all events to be streamed. */
    contents: string;
    /** Version of the websocket message. */
    version: string;
}
export interface MarketMessageProtoMsg {
    typeUrl: "/klyraprotocol.indexer.socks.MarketMessage";
    value: Uint8Array;
}
/** Message to be sent through the 'to-websockets-markets` kafka topic. */
export interface MarketMessageAmino {
    /** Stringified JSON object of all events to be streamed. */
    contents?: string;
    /** Version of the websocket message. */
    version?: string;
}
export interface MarketMessageAminoMsg {
    type: "/klyraprotocol.indexer.socks.MarketMessage";
    value: MarketMessageAmino;
}
/** Message to be sent through the 'to-websockets-markets` kafka topic. */
export interface MarketMessageSDKType {
    contents: string;
    version: string;
}
/** Message to be sent through the 'to-websockets-candles` kafka topic. */
export interface CandleMessage {
    /** Stringified JSON object of all events to be streamed. */
    contents: string;
    /** Clob pair id of the Candle message. */
    clobPairId: string;
    /** Resolution of the candle update. */
    resolution: CandleMessage_Resolution;
    /** Version of the websocket message. */
    version: string;
}
export interface CandleMessageProtoMsg {
    typeUrl: "/klyraprotocol.indexer.socks.CandleMessage";
    value: Uint8Array;
}
/** Message to be sent through the 'to-websockets-candles` kafka topic. */
export interface CandleMessageAmino {
    /** Stringified JSON object of all events to be streamed. */
    contents?: string;
    /** Clob pair id of the Candle message. */
    clob_pair_id?: string;
    /** Resolution of the candle update. */
    resolution?: CandleMessage_Resolution;
    /** Version of the websocket message. */
    version?: string;
}
export interface CandleMessageAminoMsg {
    type: "/klyraprotocol.indexer.socks.CandleMessage";
    value: CandleMessageAmino;
}
/** Message to be sent through the 'to-websockets-candles` kafka topic. */
export interface CandleMessageSDKType {
    contents: string;
    clob_pair_id: string;
    resolution: CandleMessage_Resolution;
    version: string;
}
export declare const OrderbookMessage: {
    typeUrl: string;
    is(o: any): o is OrderbookMessage;
    isSDK(o: any): o is OrderbookMessageSDKType;
    isAmino(o: any): o is OrderbookMessageAmino;
    encode(message: OrderbookMessage, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OrderbookMessage;
    fromPartial(object: Partial<OrderbookMessage>): OrderbookMessage;
    fromAmino(object: OrderbookMessageAmino): OrderbookMessage;
    toAmino(message: OrderbookMessage): OrderbookMessageAmino;
    fromAminoMsg(object: OrderbookMessageAminoMsg): OrderbookMessage;
    fromProtoMsg(message: OrderbookMessageProtoMsg): OrderbookMessage;
    toProto(message: OrderbookMessage): Uint8Array;
    toProtoMsg(message: OrderbookMessage): OrderbookMessageProtoMsg;
};
export declare const SubaccountMessage: {
    typeUrl: string;
    is(o: any): o is SubaccountMessage;
    isSDK(o: any): o is SubaccountMessageSDKType;
    isAmino(o: any): o is SubaccountMessageAmino;
    encode(message: SubaccountMessage, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SubaccountMessage;
    fromPartial(object: Partial<SubaccountMessage>): SubaccountMessage;
    fromAmino(object: SubaccountMessageAmino): SubaccountMessage;
    toAmino(message: SubaccountMessage): SubaccountMessageAmino;
    fromAminoMsg(object: SubaccountMessageAminoMsg): SubaccountMessage;
    fromProtoMsg(message: SubaccountMessageProtoMsg): SubaccountMessage;
    toProto(message: SubaccountMessage): Uint8Array;
    toProtoMsg(message: SubaccountMessage): SubaccountMessageProtoMsg;
};
export declare const TradeMessage: {
    typeUrl: string;
    is(o: any): o is TradeMessage;
    isSDK(o: any): o is TradeMessageSDKType;
    isAmino(o: any): o is TradeMessageAmino;
    encode(message: TradeMessage, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TradeMessage;
    fromPartial(object: Partial<TradeMessage>): TradeMessage;
    fromAmino(object: TradeMessageAmino): TradeMessage;
    toAmino(message: TradeMessage): TradeMessageAmino;
    fromAminoMsg(object: TradeMessageAminoMsg): TradeMessage;
    fromProtoMsg(message: TradeMessageProtoMsg): TradeMessage;
    toProto(message: TradeMessage): Uint8Array;
    toProtoMsg(message: TradeMessage): TradeMessageProtoMsg;
};
export declare const MarketMessage: {
    typeUrl: string;
    is(o: any): o is MarketMessage;
    isSDK(o: any): o is MarketMessageSDKType;
    isAmino(o: any): o is MarketMessageAmino;
    encode(message: MarketMessage, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketMessage;
    fromPartial(object: Partial<MarketMessage>): MarketMessage;
    fromAmino(object: MarketMessageAmino): MarketMessage;
    toAmino(message: MarketMessage): MarketMessageAmino;
    fromAminoMsg(object: MarketMessageAminoMsg): MarketMessage;
    fromProtoMsg(message: MarketMessageProtoMsg): MarketMessage;
    toProto(message: MarketMessage): Uint8Array;
    toProtoMsg(message: MarketMessage): MarketMessageProtoMsg;
};
export declare const CandleMessage: {
    typeUrl: string;
    is(o: any): o is CandleMessage;
    isSDK(o: any): o is CandleMessageSDKType;
    isAmino(o: any): o is CandleMessageAmino;
    encode(message: CandleMessage, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): CandleMessage;
    fromPartial(object: Partial<CandleMessage>): CandleMessage;
    fromAmino(object: CandleMessageAmino): CandleMessage;
    toAmino(message: CandleMessage): CandleMessageAmino;
    fromAminoMsg(object: CandleMessageAminoMsg): CandleMessage;
    fromProtoMsg(message: CandleMessageProtoMsg): CandleMessage;
    toProto(message: CandleMessage): Uint8Array;
    toProtoMsg(message: CandleMessage): CandleMessageProtoMsg;
};
