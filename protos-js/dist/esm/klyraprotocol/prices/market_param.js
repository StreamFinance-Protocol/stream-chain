//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseMarketParam() {
    return {
        id: 0,
        pair: "",
        exponent: 0,
        minExchanges: 0,
        minPriceChangePpm: 0,
        exchangeConfigJson: ""
    };
}
export const MarketParam = {
    typeUrl: "/klyraprotocol.prices.MarketParam",
    is(o) {
        return o && (o.$typeUrl === MarketParam.typeUrl || typeof o.id === "number" && typeof o.pair === "string" && typeof o.exponent === "number" && typeof o.minExchanges === "number" && typeof o.minPriceChangePpm === "number" && typeof o.exchangeConfigJson === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === MarketParam.typeUrl || typeof o.id === "number" && typeof o.pair === "string" && typeof o.exponent === "number" && typeof o.min_exchanges === "number" && typeof o.min_price_change_ppm === "number" && typeof o.exchange_config_json === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === MarketParam.typeUrl || typeof o.id === "number" && typeof o.pair === "string" && typeof o.exponent === "number" && typeof o.min_exchanges === "number" && typeof o.min_price_change_ppm === "number" && typeof o.exchange_config_json === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.pair !== "") {
            writer.uint32(18).string(message.pair);
        }
        if (message.exponent !== 0) {
            writer.uint32(24).sint32(message.exponent);
        }
        if (message.minExchanges !== 0) {
            writer.uint32(32).uint32(message.minExchanges);
        }
        if (message.minPriceChangePpm !== 0) {
            writer.uint32(40).uint32(message.minPriceChangePpm);
        }
        if (message.exchangeConfigJson !== "") {
            writer.uint32(50).string(message.exchangeConfigJson);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketParam();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.pair = reader.string();
                    break;
                case 3:
                    message.exponent = reader.sint32();
                    break;
                case 4:
                    message.minExchanges = reader.uint32();
                    break;
                case 5:
                    message.minPriceChangePpm = reader.uint32();
                    break;
                case 6:
                    message.exchangeConfigJson = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMarketParam();
        message.id = object.id ?? 0;
        message.pair = object.pair ?? "";
        message.exponent = object.exponent ?? 0;
        message.minExchanges = object.minExchanges ?? 0;
        message.minPriceChangePpm = object.minPriceChangePpm ?? 0;
        message.exchangeConfigJson = object.exchangeConfigJson ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketParam();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.pair !== undefined && object.pair !== null) {
            message.pair = object.pair;
        }
        if (object.exponent !== undefined && object.exponent !== null) {
            message.exponent = object.exponent;
        }
        if (object.min_exchanges !== undefined && object.min_exchanges !== null) {
            message.minExchanges = object.min_exchanges;
        }
        if (object.min_price_change_ppm !== undefined && object.min_price_change_ppm !== null) {
            message.minPriceChangePpm = object.min_price_change_ppm;
        }
        if (object.exchange_config_json !== undefined && object.exchange_config_json !== null) {
            message.exchangeConfigJson = object.exchange_config_json;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.pair = message.pair === "" ? undefined : message.pair;
        obj.exponent = message.exponent === 0 ? undefined : message.exponent;
        obj.min_exchanges = message.minExchanges === 0 ? undefined : message.minExchanges;
        obj.min_price_change_ppm = message.minPriceChangePpm === 0 ? undefined : message.minPriceChangePpm;
        obj.exchange_config_json = message.exchangeConfigJson === "" ? undefined : message.exchangeConfigJson;
        return obj;
    },
    fromAminoMsg(object) {
        return MarketParam.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MarketParam.decode(message.value);
    },
    toProto(message) {
        return MarketParam.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MarketParam",
            value: MarketParam.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MarketParam.typeUrl, MarketParam);
