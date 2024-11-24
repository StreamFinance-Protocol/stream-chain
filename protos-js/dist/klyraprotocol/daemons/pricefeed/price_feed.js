"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketPriceUpdate = exports.ExchangePrice = exports.UpdateMarketPricesResponse = exports.UpdateMarketPricesRequest = void 0;
//@ts-nocheck
const timestamp_1 = require("../../../google/protobuf/timestamp");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
const helpers_1 = require("../../../helpers");
function createBaseUpdateMarketPricesRequest() {
    return {
        marketPriceUpdates: []
    };
}
exports.UpdateMarketPricesRequest = {
    typeUrl: "/klyraprotocol.daemons.pricefeed.UpdateMarketPricesRequest",
    is(o) {
        return o && (o.$typeUrl === exports.UpdateMarketPricesRequest.typeUrl || Array.isArray(o.marketPriceUpdates) && (!o.marketPriceUpdates.length || exports.MarketPriceUpdate.is(o.marketPriceUpdates[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.UpdateMarketPricesRequest.typeUrl || Array.isArray(o.market_price_updates) && (!o.market_price_updates.length || exports.MarketPriceUpdate.isSDK(o.market_price_updates[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.UpdateMarketPricesRequest.typeUrl || Array.isArray(o.market_price_updates) && (!o.market_price_updates.length || exports.MarketPriceUpdate.isAmino(o.market_price_updates[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.marketPriceUpdates) {
            exports.MarketPriceUpdate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateMarketPricesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketPriceUpdates.push(exports.MarketPriceUpdate.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseUpdateMarketPricesRequest();
        message.marketPriceUpdates = object.marketPriceUpdates?.map(e => exports.MarketPriceUpdate.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseUpdateMarketPricesRequest();
        message.marketPriceUpdates = object.market_price_updates?.map(e => exports.MarketPriceUpdate.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.marketPriceUpdates) {
            obj.market_price_updates = message.marketPriceUpdates.map(e => e ? exports.MarketPriceUpdate.toAmino(e) : undefined);
        }
        else {
            obj.market_price_updates = message.marketPriceUpdates;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.UpdateMarketPricesRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.UpdateMarketPricesRequest.decode(message.value);
    },
    toProto(message) {
        return exports.UpdateMarketPricesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.pricefeed.UpdateMarketPricesRequest",
            value: exports.UpdateMarketPricesRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.UpdateMarketPricesRequest.typeUrl, exports.UpdateMarketPricesRequest);
function createBaseUpdateMarketPricesResponse() {
    return {};
}
exports.UpdateMarketPricesResponse = {
    typeUrl: "/klyraprotocol.daemons.pricefeed.UpdateMarketPricesResponse",
    is(o) {
        return o && o.$typeUrl === exports.UpdateMarketPricesResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.UpdateMarketPricesResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.UpdateMarketPricesResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateMarketPricesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseUpdateMarketPricesResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseUpdateMarketPricesResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.UpdateMarketPricesResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.UpdateMarketPricesResponse.decode(message.value);
    },
    toProto(message) {
        return exports.UpdateMarketPricesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.pricefeed.UpdateMarketPricesResponse",
            value: exports.UpdateMarketPricesResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.UpdateMarketPricesResponse.typeUrl, exports.UpdateMarketPricesResponse);
function createBaseExchangePrice() {
    return {
        exchangeId: "",
        price: BigInt(0),
        lastUpdateTime: undefined
    };
}
exports.ExchangePrice = {
    typeUrl: "/klyraprotocol.daemons.pricefeed.ExchangePrice",
    is(o) {
        return o && (o.$typeUrl === exports.ExchangePrice.typeUrl || typeof o.exchangeId === "string" && typeof o.price === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ExchangePrice.typeUrl || typeof o.exchange_id === "string" && typeof o.price === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ExchangePrice.typeUrl || typeof o.exchange_id === "string" && typeof o.price === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.exchangeId !== "") {
            writer.uint32(10).string(message.exchangeId);
        }
        if (message.price !== BigInt(0)) {
            writer.uint32(16).uint64(message.price);
        }
        if (message.lastUpdateTime !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.lastUpdateTime), writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExchangePrice();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.exchangeId = reader.string();
                    break;
                case 2:
                    message.price = reader.uint64();
                    break;
                case 3:
                    message.lastUpdateTime = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseExchangePrice();
        message.exchangeId = object.exchangeId ?? "";
        message.price = object.price !== undefined && object.price !== null ? BigInt(object.price.toString()) : BigInt(0);
        message.lastUpdateTime = object.lastUpdateTime ?? undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseExchangePrice();
        if (object.exchange_id !== undefined && object.exchange_id !== null) {
            message.exchangeId = object.exchange_id;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = BigInt(object.price);
        }
        if (object.last_update_time !== undefined && object.last_update_time !== null) {
            message.lastUpdateTime = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.last_update_time));
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.exchange_id = message.exchangeId === "" ? undefined : message.exchangeId;
        obj.price = message.price !== BigInt(0) ? message.price?.toString() : undefined;
        obj.last_update_time = message.lastUpdateTime ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.lastUpdateTime)) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ExchangePrice.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ExchangePrice.decode(message.value);
    },
    toProto(message) {
        return exports.ExchangePrice.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.pricefeed.ExchangePrice",
            value: exports.ExchangePrice.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ExchangePrice.typeUrl, exports.ExchangePrice);
function createBaseMarketPriceUpdate() {
    return {
        marketId: 0,
        exchangePrices: []
    };
}
exports.MarketPriceUpdate = {
    typeUrl: "/klyraprotocol.daemons.pricefeed.MarketPriceUpdate",
    is(o) {
        return o && (o.$typeUrl === exports.MarketPriceUpdate.typeUrl || typeof o.marketId === "number" && Array.isArray(o.exchangePrices) && (!o.exchangePrices.length || exports.ExchangePrice.is(o.exchangePrices[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MarketPriceUpdate.typeUrl || typeof o.market_id === "number" && Array.isArray(o.exchange_prices) && (!o.exchange_prices.length || exports.ExchangePrice.isSDK(o.exchange_prices[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MarketPriceUpdate.typeUrl || typeof o.market_id === "number" && Array.isArray(o.exchange_prices) && (!o.exchange_prices.length || exports.ExchangePrice.isAmino(o.exchange_prices[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.marketId !== 0) {
            writer.uint32(8).uint32(message.marketId);
        }
        for (const v of message.exchangePrices) {
            exports.ExchangePrice.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketPriceUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketId = reader.uint32();
                    break;
                case 2:
                    message.exchangePrices.push(exports.ExchangePrice.decode(reader, reader.uint32()));
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
        message.exchangePrices = object.exchangePrices?.map(e => exports.ExchangePrice.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketPriceUpdate();
        if (object.market_id !== undefined && object.market_id !== null) {
            message.marketId = object.market_id;
        }
        message.exchangePrices = object.exchange_prices?.map(e => exports.ExchangePrice.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        if (message.exchangePrices) {
            obj.exchange_prices = message.exchangePrices.map(e => e ? exports.ExchangePrice.toAmino(e) : undefined);
        }
        else {
            obj.exchange_prices = message.exchangePrices;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MarketPriceUpdate.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MarketPriceUpdate.decode(message.value);
    },
    toProto(message) {
        return exports.MarketPriceUpdate.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.pricefeed.MarketPriceUpdate",
            value: exports.MarketPriceUpdate.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MarketPriceUpdate.typeUrl, exports.MarketPriceUpdate);
