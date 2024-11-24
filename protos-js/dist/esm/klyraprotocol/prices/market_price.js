//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseMarketPrice() {
    return {
        id: 0,
        exponent: 0,
        spotPrice: BigInt(0),
        pnlPrice: BigInt(0)
    };
}
export const MarketPrice = {
    typeUrl: "/klyraprotocol.prices.MarketPrice",
    is(o) {
        return o && (o.$typeUrl === MarketPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spotPrice === "bigint" && typeof o.pnlPrice === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MarketPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spot_price === "bigint" && typeof o.pnl_price === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MarketPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spot_price === "bigint" && typeof o.pnl_price === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
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
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseMarketPrice();
        message.id = object.id ?? 0;
        message.exponent = object.exponent ?? 0;
        message.spotPrice = object.spotPrice !== undefined && object.spotPrice !== null ? BigInt(object.spotPrice.toString()) : BigInt(0);
        message.pnlPrice = object.pnlPrice !== undefined && object.pnlPrice !== null ? BigInt(object.pnlPrice.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
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
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.exponent = message.exponent === 0 ? undefined : message.exponent;
        obj.spot_price = message.spotPrice !== BigInt(0) ? message.spotPrice?.toString() : undefined;
        obj.pnl_price = message.pnlPrice !== BigInt(0) ? message.pnlPrice?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MarketPrice.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MarketPrice.decode(message.value);
    },
    toProto(message) {
        return MarketPrice.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MarketPrice",
            value: MarketPrice.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MarketPrice.typeUrl, MarketPrice);
function createBaseMarketSpotPrice() {
    return {
        id: 0,
        exponent: 0,
        spotPrice: BigInt(0)
    };
}
export const MarketSpotPrice = {
    typeUrl: "/klyraprotocol.prices.MarketSpotPrice",
    is(o) {
        return o && (o.$typeUrl === MarketSpotPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spotPrice === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MarketSpotPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spot_price === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MarketSpotPrice.typeUrl || typeof o.id === "number" && typeof o.exponent === "number" && typeof o.spot_price === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
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
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseMarketSpotPrice();
        message.id = object.id ?? 0;
        message.exponent = object.exponent ?? 0;
        message.spotPrice = object.spotPrice !== undefined && object.spotPrice !== null ? BigInt(object.spotPrice.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
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
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.exponent = message.exponent === 0 ? undefined : message.exponent;
        obj.spot_price = message.spotPrice !== BigInt(0) ? message.spotPrice?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MarketSpotPrice.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MarketSpotPrice.decode(message.value);
    },
    toProto(message) {
        return MarketSpotPrice.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MarketSpotPrice",
            value: MarketSpotPrice.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MarketSpotPrice.typeUrl, MarketSpotPrice);
function createBaseMarketPriceUpdate() {
    return {
        marketId: 0,
        spotPrice: BigInt(0),
        pnlPrice: BigInt(0)
    };
}
export const MarketPriceUpdate = {
    typeUrl: "/klyraprotocol.prices.MarketPriceUpdate",
    is(o) {
        return o && (o.$typeUrl === MarketPriceUpdate.typeUrl || typeof o.marketId === "number" && typeof o.spotPrice === "bigint" && typeof o.pnlPrice === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MarketPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.spot_price === "bigint" && typeof o.pnl_price === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MarketPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.spot_price === "bigint" && typeof o.pnl_price === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
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
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseMarketPriceUpdate();
        message.marketId = object.marketId ?? 0;
        message.spotPrice = object.spotPrice !== undefined && object.spotPrice !== null ? BigInt(object.spotPrice.toString()) : BigInt(0);
        message.pnlPrice = object.pnlPrice !== undefined && object.pnlPrice !== null ? BigInt(object.pnlPrice.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
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
    toAmino(message) {
        const obj = {};
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        obj.spot_price = message.spotPrice !== BigInt(0) ? message.spotPrice?.toString() : undefined;
        obj.pnl_price = message.pnlPrice !== BigInt(0) ? message.pnlPrice?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MarketPriceUpdate.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MarketPriceUpdate.decode(message.value);
    },
    toProto(message) {
        return MarketPriceUpdate.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MarketPriceUpdate",
            value: MarketPriceUpdate.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MarketPriceUpdate.typeUrl, MarketPriceUpdate);
function createBaseMarketSpotPriceUpdate() {
    return {
        marketId: 0,
        spotPrice: BigInt(0)
    };
}
export const MarketSpotPriceUpdate = {
    typeUrl: "/klyraprotocol.prices.MarketSpotPriceUpdate",
    is(o) {
        return o && (o.$typeUrl === MarketSpotPriceUpdate.typeUrl || typeof o.marketId === "number" && typeof o.spotPrice === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MarketSpotPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.spot_price === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MarketSpotPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.spot_price === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.marketId !== 0) {
            writer.uint32(8).uint32(message.marketId);
        }
        if (message.spotPrice !== BigInt(0)) {
            writer.uint32(16).uint64(message.spotPrice);
        }
        return writer;
    },
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseMarketSpotPriceUpdate();
        message.marketId = object.marketId ?? 0;
        message.spotPrice = object.spotPrice !== undefined && object.spotPrice !== null ? BigInt(object.spotPrice.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketSpotPriceUpdate();
        if (object.market_id !== undefined && object.market_id !== null) {
            message.marketId = object.market_id;
        }
        if (object.spot_price !== undefined && object.spot_price !== null) {
            message.spotPrice = BigInt(object.spot_price);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        obj.spot_price = message.spotPrice !== BigInt(0) ? message.spotPrice?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MarketSpotPriceUpdate.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MarketSpotPriceUpdate.decode(message.value);
    },
    toProto(message) {
        return MarketSpotPriceUpdate.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MarketSpotPriceUpdate",
            value: MarketSpotPriceUpdate.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MarketSpotPriceUpdate.typeUrl, MarketSpotPriceUpdate);
function createBaseMarketPnlPriceUpdate() {
    return {
        marketId: 0,
        pnlPrice: BigInt(0)
    };
}
export const MarketPnlPriceUpdate = {
    typeUrl: "/klyraprotocol.prices.MarketPnlPriceUpdate",
    is(o) {
        return o && (o.$typeUrl === MarketPnlPriceUpdate.typeUrl || typeof o.marketId === "number" && typeof o.pnlPrice === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MarketPnlPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.pnl_price === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MarketPnlPriceUpdate.typeUrl || typeof o.market_id === "number" && typeof o.pnl_price === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.marketId !== 0) {
            writer.uint32(8).uint32(message.marketId);
        }
        if (message.pnlPrice !== BigInt(0)) {
            writer.uint32(16).uint64(message.pnlPrice);
        }
        return writer;
    },
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseMarketPnlPriceUpdate();
        message.marketId = object.marketId ?? 0;
        message.pnlPrice = object.pnlPrice !== undefined && object.pnlPrice !== null ? BigInt(object.pnlPrice.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketPnlPriceUpdate();
        if (object.market_id !== undefined && object.market_id !== null) {
            message.marketId = object.market_id;
        }
        if (object.pnl_price !== undefined && object.pnl_price !== null) {
            message.pnlPrice = BigInt(object.pnl_price);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        obj.pnl_price = message.pnlPrice !== BigInt(0) ? message.pnlPrice?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MarketPnlPriceUpdate.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MarketPnlPriceUpdate.decode(message.value);
    },
    toProto(message) {
        return MarketPnlPriceUpdate.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MarketPnlPriceUpdate",
            value: MarketPnlPriceUpdate.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MarketPnlPriceUpdate.typeUrl, MarketPnlPriceUpdate);
function createBaseMarketPriceUpdates() {
    return {
        marketPriceUpdates: []
    };
}
export const MarketPriceUpdates = {
    typeUrl: "/klyraprotocol.prices.MarketPriceUpdates",
    is(o) {
        return o && (o.$typeUrl === MarketPriceUpdates.typeUrl || Array.isArray(o.marketPriceUpdates) && (!o.marketPriceUpdates.length || MarketPriceUpdate.is(o.marketPriceUpdates[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MarketPriceUpdates.typeUrl || Array.isArray(o.market_price_updates) && (!o.market_price_updates.length || MarketPriceUpdate.isSDK(o.market_price_updates[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MarketPriceUpdates.typeUrl || Array.isArray(o.market_price_updates) && (!o.market_price_updates.length || MarketPriceUpdate.isAmino(o.market_price_updates[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.marketPriceUpdates) {
            MarketPriceUpdate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseMarketPriceUpdates();
        message.marketPriceUpdates = object.marketPriceUpdates?.map(e => MarketPriceUpdate.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketPriceUpdates();
        message.marketPriceUpdates = object.market_price_updates?.map(e => MarketPriceUpdate.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.marketPriceUpdates) {
            obj.market_price_updates = message.marketPriceUpdates.map(e => e ? MarketPriceUpdate.toAmino(e) : undefined);
        }
        else {
            obj.market_price_updates = message.marketPriceUpdates;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MarketPriceUpdates.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MarketPriceUpdates.decode(message.value);
    },
    toProto(message) {
        return MarketPriceUpdates.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MarketPriceUpdates",
            value: MarketPriceUpdates.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MarketPriceUpdates.typeUrl, MarketPriceUpdates);
