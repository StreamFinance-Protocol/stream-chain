"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = void 0;
//@ts-nocheck
const market_param_1 = require("./market_param");
const market_price_1 = require("./market_price");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseGenesisState() {
    return {
        marketParams: [],
        marketPrices: []
    };
}
exports.GenesisState = {
    typeUrl: "/klyraprotocol.prices.GenesisState",
    is(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.marketParams) && (!o.marketParams.length || market_param_1.MarketParam.is(o.marketParams[0])) && Array.isArray(o.marketPrices) && (!o.marketPrices.length || market_price_1.MarketPrice.is(o.marketPrices[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.market_params) && (!o.market_params.length || market_param_1.MarketParam.isSDK(o.market_params[0])) && Array.isArray(o.market_prices) && (!o.market_prices.length || market_price_1.MarketPrice.isSDK(o.market_prices[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.market_params) && (!o.market_params.length || market_param_1.MarketParam.isAmino(o.market_params[0])) && Array.isArray(o.market_prices) && (!o.market_prices.length || market_price_1.MarketPrice.isAmino(o.market_prices[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.marketParams) {
            market_param_1.MarketParam.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.marketPrices) {
            market_price_1.MarketPrice.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketParams.push(market_param_1.MarketParam.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.marketPrices.push(market_price_1.MarketPrice.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.marketParams = object.marketParams?.map(e => market_param_1.MarketParam.fromPartial(e)) || [];
        message.marketPrices = object.marketPrices?.map(e => market_price_1.MarketPrice.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.marketParams = object.market_params?.map(e => market_param_1.MarketParam.fromAmino(e)) || [];
        message.marketPrices = object.market_prices?.map(e => market_price_1.MarketPrice.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.marketParams) {
            obj.market_params = message.marketParams.map(e => e ? market_param_1.MarketParam.toAmino(e) : undefined);
        }
        else {
            obj.market_params = message.marketParams;
        }
        if (message.marketPrices) {
            obj.market_prices = message.marketPrices.map(e => e ? market_price_1.MarketPrice.toAmino(e) : undefined);
        }
        else {
            obj.market_prices = message.marketPrices;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GenesisState.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.GenesisState.decode(message.value);
    },
    toProto(message) {
        return exports.GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.GenesisState",
            value: exports.GenesisState.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GenesisState.typeUrl, exports.GenesisState);
