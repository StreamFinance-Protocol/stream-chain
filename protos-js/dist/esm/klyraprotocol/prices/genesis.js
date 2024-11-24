//@ts-nocheck
import { MarketParam } from "./market_param";
import { MarketPrice } from "./market_price";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseGenesisState() {
    return {
        marketParams: [],
        marketPrices: []
    };
}
export const GenesisState = {
    typeUrl: "/klyraprotocol.prices.GenesisState",
    is(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.marketParams) && (!o.marketParams.length || MarketParam.is(o.marketParams[0])) && Array.isArray(o.marketPrices) && (!o.marketPrices.length || MarketPrice.is(o.marketPrices[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.market_params) && (!o.market_params.length || MarketParam.isSDK(o.market_params[0])) && Array.isArray(o.market_prices) && (!o.market_prices.length || MarketPrice.isSDK(o.market_prices[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === GenesisState.typeUrl || Array.isArray(o.market_params) && (!o.market_params.length || MarketParam.isAmino(o.market_params[0])) && Array.isArray(o.market_prices) && (!o.market_prices.length || MarketPrice.isAmino(o.market_prices[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.marketParams) {
            MarketParam.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.marketPrices) {
            MarketPrice.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketParams.push(MarketParam.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.marketPrices.push(MarketPrice.decode(reader, reader.uint32()));
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
        message.marketParams = object.marketParams?.map(e => MarketParam.fromPartial(e)) || [];
        message.marketPrices = object.marketPrices?.map(e => MarketPrice.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.marketParams = object.market_params?.map(e => MarketParam.fromAmino(e)) || [];
        message.marketPrices = object.market_prices?.map(e => MarketPrice.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.marketParams) {
            obj.market_params = message.marketParams.map(e => e ? MarketParam.toAmino(e) : undefined);
        }
        else {
            obj.market_params = message.marketParams;
        }
        if (message.marketPrices) {
            obj.market_prices = message.marketPrices.map(e => e ? MarketPrice.toAmino(e) : undefined);
        }
        else {
            obj.market_prices = message.marketPrices;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return GenesisState.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return GenesisState.decode(message.value);
    },
    toProto(message) {
        return GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.GenesisState",
            value: GenesisState.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);
