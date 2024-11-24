//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
import { GlobalDecoderRegistry } from "../../registry";
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
function createBasePricePair(): PricePair {
  return {
    marketId: 0,
    spotPrice: new Uint8Array(),
    pnlPrice: new Uint8Array()
  };
}
export const PricePair = {
  typeUrl: "/klyraprotocol.ve.PricePair",
  is(o: any): o is PricePair {
    return o && (o.$typeUrl === PricePair.typeUrl || typeof o.marketId === "number" && (o.spotPrice instanceof Uint8Array || typeof o.spotPrice === "string") && (o.pnlPrice instanceof Uint8Array || typeof o.pnlPrice === "string"));
  },
  isSDK(o: any): o is PricePairSDKType {
    return o && (o.$typeUrl === PricePair.typeUrl || typeof o.market_id === "number" && (o.spot_price instanceof Uint8Array || typeof o.spot_price === "string") && (o.pnl_price instanceof Uint8Array || typeof o.pnl_price === "string"));
  },
  isAmino(o: any): o is PricePairAmino {
    return o && (o.$typeUrl === PricePair.typeUrl || typeof o.market_id === "number" && (o.spot_price instanceof Uint8Array || typeof o.spot_price === "string") && (o.pnl_price instanceof Uint8Array || typeof o.pnl_price === "string"));
  },
  encode(message: PricePair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.marketId !== 0) {
      writer.uint32(8).uint32(message.marketId);
    }
    if (message.spotPrice.length !== 0) {
      writer.uint32(18).bytes(message.spotPrice);
    }
    if (message.pnlPrice.length !== 0) {
      writer.uint32(26).bytes(message.pnlPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PricePair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePricePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.uint32();
          break;
        case 2:
          message.spotPrice = reader.bytes();
          break;
        case 3:
          message.pnlPrice = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PricePair>): PricePair {
    const message = createBasePricePair();
    message.marketId = object.marketId ?? 0;
    message.spotPrice = object.spotPrice ?? new Uint8Array();
    message.pnlPrice = object.pnlPrice ?? new Uint8Array();
    return message;
  },
  fromAmino(object: PricePairAmino): PricePair {
    const message = createBasePricePair();
    if (object.market_id !== undefined && object.market_id !== null) {
      message.marketId = object.market_id;
    }
    if (object.spot_price !== undefined && object.spot_price !== null) {
      message.spotPrice = bytesFromBase64(object.spot_price);
    }
    if (object.pnl_price !== undefined && object.pnl_price !== null) {
      message.pnlPrice = bytesFromBase64(object.pnl_price);
    }
    return message;
  },
  toAmino(message: PricePair): PricePairAmino {
    const obj: any = {};
    obj.market_id = message.marketId === 0 ? undefined : message.marketId;
    obj.spot_price = message.spotPrice ? base64FromBytes(message.spotPrice) : undefined;
    obj.pnl_price = message.pnlPrice ? base64FromBytes(message.pnlPrice) : undefined;
    return obj;
  },
  fromAminoMsg(object: PricePairAminoMsg): PricePair {
    return PricePair.fromAmino(object.value);
  },
  fromProtoMsg(message: PricePairProtoMsg): PricePair {
    return PricePair.decode(message.value);
  },
  toProto(message: PricePair): Uint8Array {
    return PricePair.encode(message).finish();
  },
  toProtoMsg(message: PricePair): PricePairProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ve.PricePair",
      value: PricePair.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(PricePair.typeUrl, PricePair);
function createBaseDaemonVoteExtension(): DaemonVoteExtension {
  return {
    prices: [],
    sDaiConversionRate: ""
  };
}
export const DaemonVoteExtension = {
  typeUrl: "/klyraprotocol.ve.DaemonVoteExtension",
  is(o: any): o is DaemonVoteExtension {
    return o && (o.$typeUrl === DaemonVoteExtension.typeUrl || Array.isArray(o.prices) && (!o.prices.length || PricePair.is(o.prices[0])) && typeof o.sDaiConversionRate === "string");
  },
  isSDK(o: any): o is DaemonVoteExtensionSDKType {
    return o && (o.$typeUrl === DaemonVoteExtension.typeUrl || Array.isArray(o.prices) && (!o.prices.length || PricePair.isSDK(o.prices[0])) && typeof o.s_dai_conversion_rate === "string");
  },
  isAmino(o: any): o is DaemonVoteExtensionAmino {
    return o && (o.$typeUrl === DaemonVoteExtension.typeUrl || Array.isArray(o.prices) && (!o.prices.length || PricePair.isAmino(o.prices[0])) && typeof o.s_dai_conversion_rate === "string");
  },
  encode(message: DaemonVoteExtension, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.prices) {
      PricePair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.sDaiConversionRate !== "") {
      writer.uint32(18).string(message.sDaiConversionRate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DaemonVoteExtension {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDaemonVoteExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.prices.push(PricePair.decode(reader, reader.uint32()));
          break;
        case 2:
          message.sDaiConversionRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DaemonVoteExtension>): DaemonVoteExtension {
    const message = createBaseDaemonVoteExtension();
    message.prices = object.prices?.map(e => PricePair.fromPartial(e)) || [];
    message.sDaiConversionRate = object.sDaiConversionRate ?? "";
    return message;
  },
  fromAmino(object: DaemonVoteExtensionAmino): DaemonVoteExtension {
    const message = createBaseDaemonVoteExtension();
    message.prices = object.prices?.map(e => PricePair.fromAmino(e)) || [];
    if (object.s_dai_conversion_rate !== undefined && object.s_dai_conversion_rate !== null) {
      message.sDaiConversionRate = object.s_dai_conversion_rate;
    }
    return message;
  },
  toAmino(message: DaemonVoteExtension): DaemonVoteExtensionAmino {
    const obj: any = {};
    if (message.prices) {
      obj.prices = message.prices.map(e => e ? PricePair.toAmino(e) : undefined);
    } else {
      obj.prices = message.prices;
    }
    obj.s_dai_conversion_rate = message.sDaiConversionRate === "" ? undefined : message.sDaiConversionRate;
    return obj;
  },
  fromAminoMsg(object: DaemonVoteExtensionAminoMsg): DaemonVoteExtension {
    return DaemonVoteExtension.fromAmino(object.value);
  },
  fromProtoMsg(message: DaemonVoteExtensionProtoMsg): DaemonVoteExtension {
    return DaemonVoteExtension.decode(message.value);
  },
  toProto(message: DaemonVoteExtension): Uint8Array {
    return DaemonVoteExtension.encode(message).finish();
  },
  toProtoMsg(message: DaemonVoteExtension): DaemonVoteExtensionProtoMsg {
    return {
      typeUrl: "/klyraprotocol.ve.DaemonVoteExtension",
      value: DaemonVoteExtension.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(DaemonVoteExtension.typeUrl, DaemonVoteExtension);