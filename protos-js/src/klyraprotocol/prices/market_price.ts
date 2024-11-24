//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
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
function createBaseMarketPrice(): MarketPrice {
  return {
    id: 0,
    exponent: 0,
    spotPrice: BigInt(0),
    pnlPrice: BigInt(0)
  };
}
export const MarketPrice = {
  typeUrl: "/klyraprotocol.prices.MarketPrice",
  is(o: any): o is MarketPrice {
    return o && (o.$typeUrl === MarketPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spotPrice === "bigint" && typeof o.pnlPrice === "bigint");
  },
  isSDK(o: any): o is MarketPriceSDKType {
    return o && (o.$typeUrl === MarketPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spot_price === "bigint" && typeof o.pnl_price === "bigint");
  },
  isAmino(o: any): o is MarketPriceAmino {
    return o && (o.$typeUrl === MarketPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spot_price === "bigint" && typeof o.pnl_price === "bigint");
  },
  encode(message: MarketPrice, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.exponent !== 0) {
      writer.uint32(16).sint32(message.exponent);
    }
    if (message.spotPrice !== BigInt(0)) {
      writer.uint32(24).uint64(message.spotPrice);
    }
    if (message.pnlPrice !== BigInt(0)) {
      writer.uint32(32).uint64(message.pnlPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketPrice {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketPrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.exponent = reader.sint32();
          break;
        case 3:
          message.spotPrice = reader.uint64();
          break;
        case 4:
          message.pnlPrice = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MarketPrice>): MarketPrice {
    const message = createBaseMarketPrice();
    message.id = object.id ?? 0;
    message.exponent = object.exponent ?? 0;
    message.spotPrice = object.spotPrice !== undefined && object.spotPrice !== null ? BigInt(object.spotPrice.toString()) : BigInt(0);
    message.pnlPrice = object.pnlPrice !== undefined && object.pnlPrice !== null ? BigInt(object.pnlPrice.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MarketPriceAmino): MarketPrice {
    const message = createBaseMarketPrice();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.exponent !== undefined && object.exponent !== null) {
      message.exponent = object.exponent;
    }
    if (object.spot_price !== undefined && object.spot_price !== null) {
      message.spotPrice = BigInt(object.spot_price);
    }
    if (object.pnl_price !== undefined && object.pnl_price !== null) {
      message.pnlPrice = BigInt(object.pnl_price);
    }
    return message;
  },
  toAmino(message: MarketPrice): MarketPriceAmino {
    const obj: any = {};
    obj.id = message.id === 0 ? undefined : message.id;
    obj.exponent = message.exponent === 0 ? undefined : message.exponent;
    obj.spot_price = message.spotPrice !== BigInt(0) ? message.spotPrice?.toString() : undefined;
    obj.pnl_price = message.pnlPrice !== BigInt(0) ? message.pnlPrice?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MarketPriceAminoMsg): MarketPrice {
    return MarketPrice.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketPriceProtoMsg): MarketPrice {
    return MarketPrice.decode(message.value);
  },
  toProto(message: MarketPrice): Uint8Array {
    return MarketPrice.encode(message).finish();
  },
  toProtoMsg(message: MarketPrice): MarketPriceProtoMsg {
    return {
      typeUrl: "/klyraprotocol.prices.MarketPrice",
      value: MarketPrice.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MarketPrice.typeUrl, MarketPrice);
function createBaseMarketSpotPrice(): MarketSpotPrice {
  return {
    id: 0,
    exponent: 0,
    spotPrice: BigInt(0)
  };
}
export const MarketSpotPrice = {
  typeUrl: "/klyraprotocol.prices.MarketSpotPrice",
  is(o: any): o is MarketSpotPrice {
    return o && (o.$typeUrl === MarketSpotPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spotPrice === "bigint");
  },
  isSDK(o: any): o is MarketSpotPriceSDKType {
    return o && (o.$typeUrl === MarketSpotPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spot_price === "bigint");
  },
  isAmino(o: any): o is MarketSpotPriceAmino {
    return o && (o.$typeUrl === MarketSpotPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spot_price === "bigint");
  },
  encode(message: MarketSpotPrice, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.exponent !== 0) {
      writer.uint32(16).sint32(message.exponent);
    }
    if (message.spotPrice !== BigInt(0)) {
      writer.uint32(24).uint64(message.spotPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketSpotPrice {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketSpotPrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.exponent = reader.sint32();
          break;
        case 3:
          message.spotPrice = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MarketSpotPrice>): MarketSpotPrice {
    const message = createBaseMarketSpotPrice();
    message.id = object.id ?? 0;
    message.exponent = object.exponent ?? 0;
    message.spotPrice = object.spotPrice !== undefined && object.spotPrice !== null ? BigInt(object.spotPrice.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MarketSpotPriceAmino): MarketSpotPrice {
    const message = createBaseMarketSpotPrice();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.exponent !== undefined && object.exponent !== null) {
      message.exponent = object.exponent;
    }
    if (object.spot_price !== undefined && object.spot_price !== null) {
      message.spotPrice = BigInt(object.spot_price);
    }
    return message;
  },
  toAmino(message: MarketSpotPrice): MarketSpotPriceAmino {
    const obj: any = {};
    obj.id = message.id === 0 ? undefined : message.id;
    obj.exponent = message.exponent === 0 ? undefined : message.exponent;
    obj.spot_price = message.spotPrice !== BigInt(0) ? message.spotPrice?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MarketSpotPriceAminoMsg): MarketSpotPrice {
    return MarketSpotPrice.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketSpotPriceProtoMsg): MarketSpotPrice {
    return MarketSpotPrice.decode(message.value);
  },
  toProto(message: MarketSpotPrice): Uint8Array {
    return MarketSpotPrice.encode(message).finish();
  },
  toProtoMsg(message: MarketSpotPrice): MarketSpotPriceProtoMsg {
    return {
      typeUrl: "/klyraprotocol.prices.MarketSpotPrice",
      value: MarketSpotPrice.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MarketSpotPrice.typeUrl, MarketSpotPrice);
function createBaseMarketPriceUpdate(): MarketPriceUpdate {
  return {
    marketId: 0,
    spotPrice: BigInt(0),
    pnlPrice: BigInt(0)
  };
}
export const MarketPriceUpdate = {
  typeUrl: "/klyraprotocol.prices.MarketPriceUpdate",
  is(o: any): o is MarketPriceUpdate {
    return o && (o.$typeUrl === MarketPriceUpdate.typeUrl || typeof o.marketId === "number" && typeof o.spotPrice === "bigint" && typeof o.pnlPrice === "bigint");
  },
  isSDK(o: any): o is MarketPriceUpdateSDKType {
    return o && (o.$typeUrl === MarketPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.spot_price === "bigint" && typeof o.pnl_price === "bigint");
  },
  isAmino(o: any): o is MarketPriceUpdateAmino {
    return o && (o.$typeUrl === MarketPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.spot_price === "bigint" && typeof o.pnl_price === "bigint");
  },
  encode(message: MarketPriceUpdate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.marketId !== 0) {
      writer.uint32(8).uint32(message.marketId);
    }
    if (message.spotPrice !== BigInt(0)) {
      writer.uint32(16).uint64(message.spotPrice);
    }
    if (message.pnlPrice !== BigInt(0)) {
      writer.uint32(24).uint64(message.pnlPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketPriceUpdate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketPriceUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.uint32();
          break;
        case 2:
          message.spotPrice = reader.uint64();
          break;
        case 3:
          message.pnlPrice = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MarketPriceUpdate>): MarketPriceUpdate {
    const message = createBaseMarketPriceUpdate();
    message.marketId = object.marketId ?? 0;
    message.spotPrice = object.spotPrice !== undefined && object.spotPrice !== null ? BigInt(object.spotPrice.toString()) : BigInt(0);
    message.pnlPrice = object.pnlPrice !== undefined && object.pnlPrice !== null ? BigInt(object.pnlPrice.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MarketPriceUpdateAmino): MarketPriceUpdate {
    const message = createBaseMarketPriceUpdate();
    if (object.market_id !== undefined && object.market_id !== null) {
      message.marketId = object.market_id;
    }
    if (object.spot_price !== undefined && object.spot_price !== null) {
      message.spotPrice = BigInt(object.spot_price);
    }
    if (object.pnl_price !== undefined && object.pnl_price !== null) {
      message.pnlPrice = BigInt(object.pnl_price);
    }
    return message;
  },
  toAmino(message: MarketPriceUpdate): MarketPriceUpdateAmino {
    const obj: any = {};
    obj.market_id = message.marketId === 0 ? undefined : message.marketId;
    obj.spot_price = message.spotPrice !== BigInt(0) ? message.spotPrice?.toString() : undefined;
    obj.pnl_price = message.pnlPrice !== BigInt(0) ? message.pnlPrice?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MarketPriceUpdateAminoMsg): MarketPriceUpdate {
    return MarketPriceUpdate.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketPriceUpdateProtoMsg): MarketPriceUpdate {
    return MarketPriceUpdate.decode(message.value);
  },
  toProto(message: MarketPriceUpdate): Uint8Array {
    return MarketPriceUpdate.encode(message).finish();
  },
  toProtoMsg(message: MarketPriceUpdate): MarketPriceUpdateProtoMsg {
    return {
      typeUrl: "/klyraprotocol.prices.MarketPriceUpdate",
      value: MarketPriceUpdate.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MarketPriceUpdate.typeUrl, MarketPriceUpdate);
function createBaseMarketSpotPriceUpdate(): MarketSpotPriceUpdate {
  return {
    marketId: 0,
    spotPrice: BigInt(0)
  };
}
export const MarketSpotPriceUpdate = {
  typeUrl: "/klyraprotocol.prices.MarketSpotPriceUpdate",
  is(o: any): o is MarketSpotPriceUpdate {
    return o && (o.$typeUrl === MarketSpotPriceUpdate.typeUrl || typeof o.marketId === "number" && typeof o.spotPrice === "bigint");
  },
  isSDK(o: any): o is MarketSpotPriceUpdateSDKType {
    return o && (o.$typeUrl === MarketSpotPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.spot_price === "bigint");
  },
  isAmino(o: any): o is MarketSpotPriceUpdateAmino {
    return o && (o.$typeUrl === MarketSpotPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.spot_price === "bigint");
  },
  encode(message: MarketSpotPriceUpdate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.marketId !== 0) {
      writer.uint32(8).uint32(message.marketId);
    }
    if (message.spotPrice !== BigInt(0)) {
      writer.uint32(16).uint64(message.spotPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketSpotPriceUpdate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketSpotPriceUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.uint32();
          break;
        case 2:
          message.spotPrice = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MarketSpotPriceUpdate>): MarketSpotPriceUpdate {
    const message = createBaseMarketSpotPriceUpdate();
    message.marketId = object.marketId ?? 0;
    message.spotPrice = object.spotPrice !== undefined && object.spotPrice !== null ? BigInt(object.spotPrice.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MarketSpotPriceUpdateAmino): MarketSpotPriceUpdate {
    const message = createBaseMarketSpotPriceUpdate();
    if (object.market_id !== undefined && object.market_id !== null) {
      message.marketId = object.market_id;
    }
    if (object.spot_price !== undefined && object.spot_price !== null) {
      message.spotPrice = BigInt(object.spot_price);
    }
    return message;
  },
  toAmino(message: MarketSpotPriceUpdate): MarketSpotPriceUpdateAmino {
    const obj: any = {};
    obj.market_id = message.marketId === 0 ? undefined : message.marketId;
    obj.spot_price = message.spotPrice !== BigInt(0) ? message.spotPrice?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MarketSpotPriceUpdateAminoMsg): MarketSpotPriceUpdate {
    return MarketSpotPriceUpdate.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketSpotPriceUpdateProtoMsg): MarketSpotPriceUpdate {
    return MarketSpotPriceUpdate.decode(message.value);
  },
  toProto(message: MarketSpotPriceUpdate): Uint8Array {
    return MarketSpotPriceUpdate.encode(message).finish();
  },
  toProtoMsg(message: MarketSpotPriceUpdate): MarketSpotPriceUpdateProtoMsg {
    return {
      typeUrl: "/klyraprotocol.prices.MarketSpotPriceUpdate",
      value: MarketSpotPriceUpdate.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MarketSpotPriceUpdate.typeUrl, MarketSpotPriceUpdate);
function createBaseMarketPnlPriceUpdate(): MarketPnlPriceUpdate {
  return {
    marketId: 0,
    pnlPrice: BigInt(0)
  };
}
export const MarketPnlPriceUpdate = {
  typeUrl: "/klyraprotocol.prices.MarketPnlPriceUpdate",
  is(o: any): o is MarketPnlPriceUpdate {
    return o && (o.$typeUrl === MarketPnlPriceUpdate.typeUrl || typeof o.marketId === "number" && typeof o.pnlPrice === "bigint");
  },
  isSDK(o: any): o is MarketPnlPriceUpdateSDKType {
    return o && (o.$typeUrl === MarketPnlPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.pnl_price === "bigint");
  },
  isAmino(o: any): o is MarketPnlPriceUpdateAmino {
    return o && (o.$typeUrl === MarketPnlPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.pnl_price === "bigint");
  },
  encode(message: MarketPnlPriceUpdate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.marketId !== 0) {
      writer.uint32(8).uint32(message.marketId);
    }
    if (message.pnlPrice !== BigInt(0)) {
      writer.uint32(16).uint64(message.pnlPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketPnlPriceUpdate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketPnlPriceUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.uint32();
          break;
        case 2:
          message.pnlPrice = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MarketPnlPriceUpdate>): MarketPnlPriceUpdate {
    const message = createBaseMarketPnlPriceUpdate();
    message.marketId = object.marketId ?? 0;
    message.pnlPrice = object.pnlPrice !== undefined && object.pnlPrice !== null ? BigInt(object.pnlPrice.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MarketPnlPriceUpdateAmino): MarketPnlPriceUpdate {
    const message = createBaseMarketPnlPriceUpdate();
    if (object.market_id !== undefined && object.market_id !== null) {
      message.marketId = object.market_id;
    }
    if (object.pnl_price !== undefined && object.pnl_price !== null) {
      message.pnlPrice = BigInt(object.pnl_price);
    }
    return message;
  },
  toAmino(message: MarketPnlPriceUpdate): MarketPnlPriceUpdateAmino {
    const obj: any = {};
    obj.market_id = message.marketId === 0 ? undefined : message.marketId;
    obj.pnl_price = message.pnlPrice !== BigInt(0) ? message.pnlPrice?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MarketPnlPriceUpdateAminoMsg): MarketPnlPriceUpdate {
    return MarketPnlPriceUpdate.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketPnlPriceUpdateProtoMsg): MarketPnlPriceUpdate {
    return MarketPnlPriceUpdate.decode(message.value);
  },
  toProto(message: MarketPnlPriceUpdate): Uint8Array {
    return MarketPnlPriceUpdate.encode(message).finish();
  },
  toProtoMsg(message: MarketPnlPriceUpdate): MarketPnlPriceUpdateProtoMsg {
    return {
      typeUrl: "/klyraprotocol.prices.MarketPnlPriceUpdate",
      value: MarketPnlPriceUpdate.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MarketPnlPriceUpdate.typeUrl, MarketPnlPriceUpdate);
function createBaseMarketPriceUpdates(): MarketPriceUpdates {
  return {
    marketPriceUpdates: []
  };
}
export const MarketPriceUpdates = {
  typeUrl: "/klyraprotocol.prices.MarketPriceUpdates",
  is(o: any): o is MarketPriceUpdates {
    return o && (o.$typeUrl === MarketPriceUpdates.typeUrl || Array.isArray(o.marketPriceUpdates) && (!o.marketPriceUpdates.length || MarketPriceUpdate.is(o.marketPriceUpdates[0])));
  },
  isSDK(o: any): o is MarketPriceUpdatesSDKType {
    return o && (o.$typeUrl === MarketPriceUpdates.typeUrl || Array.isArray(o.market_price_updates) && (!o.market_price_updates.length || MarketPriceUpdate.isSDK(o.market_price_updates[0])));
  },
  isAmino(o: any): o is MarketPriceUpdatesAmino {
    return o && (o.$typeUrl === MarketPriceUpdates.typeUrl || Array.isArray(o.market_price_updates) && (!o.market_price_updates.length || MarketPriceUpdate.isAmino(o.market_price_updates[0])));
  },
  encode(message: MarketPriceUpdates, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.marketPriceUpdates) {
      MarketPriceUpdate.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarketPriceUpdates {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketPriceUpdates();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketPriceUpdates.push(MarketPriceUpdate.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MarketPriceUpdates>): MarketPriceUpdates {
    const message = createBaseMarketPriceUpdates();
    message.marketPriceUpdates = object.marketPriceUpdates?.map(e => MarketPriceUpdate.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MarketPriceUpdatesAmino): MarketPriceUpdates {
    const message = createBaseMarketPriceUpdates();
    message.marketPriceUpdates = object.market_price_updates?.map(e => MarketPriceUpdate.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MarketPriceUpdates): MarketPriceUpdatesAmino {
    const obj: any = {};
    if (message.marketPriceUpdates) {
      obj.market_price_updates = message.marketPriceUpdates.map(e => e ? MarketPriceUpdate.toAmino(e) : undefined);
    } else {
      obj.market_price_updates = message.marketPriceUpdates;
    }
    return obj;
  },
  fromAminoMsg(object: MarketPriceUpdatesAminoMsg): MarketPriceUpdates {
    return MarketPriceUpdates.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketPriceUpdatesProtoMsg): MarketPriceUpdates {
    return MarketPriceUpdates.decode(message.value);
  },
  toProto(message: MarketPriceUpdates): Uint8Array {
    return MarketPriceUpdates.encode(message).finish();
  },
  toProtoMsg(message: MarketPriceUpdates): MarketPriceUpdatesProtoMsg {
    return {
      typeUrl: "/klyraprotocol.prices.MarketPriceUpdates",
      value: MarketPriceUpdates.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MarketPriceUpdates.typeUrl, MarketPriceUpdates);