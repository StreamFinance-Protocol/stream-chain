"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryAllMarketParamsResponse = exports.QueryAllMarketParamsRequest = exports.QueryMarketParamResponse = exports.QueryMarketParamRequest = exports.QueryAllMarketPricesResponse = exports.QueryAllMarketPricesRequest = exports.QueryMarketPriceResponse = exports.QueryMarketPriceRequest = void 0;
//@ts-nocheck
const pagination_1 = require("../../cosmos/base/query/v1beta1/pagination");
const market_price_1 = require("./market_price");
const market_param_1 = require("./market_param");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseQueryMarketPriceRequest() {
    return {
        id: 0
    };
}
exports.QueryMarketPriceRequest = {
    typeUrl: "/klyraprotocol.prices.QueryMarketPriceRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryMarketPriceRequest.typeUrl || typeof o.id === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryMarketPriceRequest.typeUrl || typeof o.id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryMarketPriceRequest.typeUrl || typeof o.id === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMarketPriceRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryMarketPriceRequest();
        message.id = object.id ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryMarketPriceRequest();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryMarketPriceRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryMarketPriceRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryMarketPriceRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryMarketPriceRequest",
            value: exports.QueryMarketPriceRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryMarketPriceRequest.typeUrl, exports.QueryMarketPriceRequest);
function createBaseQueryMarketPriceResponse() {
    return {
        marketPrice: market_price_1.MarketPrice.fromPartial({})
    };
}
exports.QueryMarketPriceResponse = {
    typeUrl: "/klyraprotocol.prices.QueryMarketPriceResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryMarketPriceResponse.typeUrl || market_price_1.MarketPrice.is(o.marketPrice));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryMarketPriceResponse.typeUrl || market_price_1.MarketPrice.isSDK(o.market_price));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryMarketPriceResponse.typeUrl || market_price_1.MarketPrice.isAmino(o.market_price));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.marketPrice !== undefined) {
            market_price_1.MarketPrice.encode(message.marketPrice, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMarketPriceResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketPrice = market_price_1.MarketPrice.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryMarketPriceResponse();
        message.marketPrice = object.marketPrice !== undefined && object.marketPrice !== null ? market_price_1.MarketPrice.fromPartial(object.marketPrice) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryMarketPriceResponse();
        if (object.market_price !== undefined && object.market_price !== null) {
            message.marketPrice = market_price_1.MarketPrice.fromAmino(object.market_price);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.market_price = message.marketPrice ? market_price_1.MarketPrice.toAmino(message.marketPrice) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryMarketPriceResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryMarketPriceResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryMarketPriceResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryMarketPriceResponse",
            value: exports.QueryMarketPriceResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryMarketPriceResponse.typeUrl, exports.QueryMarketPriceResponse);
function createBaseQueryAllMarketPricesRequest() {
    return {
        pagination: undefined
    };
}
exports.QueryAllMarketPricesRequest = {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketPricesRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryAllMarketPricesRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryAllMarketPricesRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryAllMarketPricesRequest.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllMarketPricesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAllMarketPricesRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllMarketPricesRequest();
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllMarketPricesRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllMarketPricesRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllMarketPricesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryAllMarketPricesRequest",
            value: exports.QueryAllMarketPricesRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllMarketPricesRequest.typeUrl, exports.QueryAllMarketPricesRequest);
function createBaseQueryAllMarketPricesResponse() {
    return {
        marketPrices: [],
        pagination: undefined
    };
}
exports.QueryAllMarketPricesResponse = {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketPricesResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryAllMarketPricesResponse.typeUrl || Array.isArray(o.marketPrices) && (!o.marketPrices.length || market_price_1.MarketPrice.is(o.marketPrices[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryAllMarketPricesResponse.typeUrl || Array.isArray(o.market_prices) && (!o.market_prices.length || market_price_1.MarketPrice.isSDK(o.market_prices[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryAllMarketPricesResponse.typeUrl || Array.isArray(o.market_prices) && (!o.market_prices.length || market_price_1.MarketPrice.isAmino(o.market_prices[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.marketPrices) {
            market_price_1.MarketPrice.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllMarketPricesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketPrices.push(market_price_1.MarketPrice.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAllMarketPricesResponse();
        message.marketPrices = object.marketPrices?.map(e => market_price_1.MarketPrice.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllMarketPricesResponse();
        message.marketPrices = object.market_prices?.map(e => market_price_1.MarketPrice.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.marketPrices) {
            obj.market_prices = message.marketPrices.map(e => e ? market_price_1.MarketPrice.toAmino(e) : undefined);
        }
        else {
            obj.market_prices = message.marketPrices;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllMarketPricesResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllMarketPricesResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllMarketPricesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryAllMarketPricesResponse",
            value: exports.QueryAllMarketPricesResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllMarketPricesResponse.typeUrl, exports.QueryAllMarketPricesResponse);
function createBaseQueryMarketParamRequest() {
    return {
        id: 0
    };
}
exports.QueryMarketParamRequest = {
    typeUrl: "/klyraprotocol.prices.QueryMarketParamRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryMarketParamRequest.typeUrl || typeof o.id === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryMarketParamRequest.typeUrl || typeof o.id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryMarketParamRequest.typeUrl || typeof o.id === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMarketParamRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryMarketParamRequest();
        message.id = object.id ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryMarketParamRequest();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryMarketParamRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryMarketParamRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryMarketParamRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryMarketParamRequest",
            value: exports.QueryMarketParamRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryMarketParamRequest.typeUrl, exports.QueryMarketParamRequest);
function createBaseQueryMarketParamResponse() {
    return {
        marketParam: market_param_1.MarketParam.fromPartial({})
    };
}
exports.QueryMarketParamResponse = {
    typeUrl: "/klyraprotocol.prices.QueryMarketParamResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryMarketParamResponse.typeUrl || market_param_1.MarketParam.is(o.marketParam));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryMarketParamResponse.typeUrl || market_param_1.MarketParam.isSDK(o.market_param));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryMarketParamResponse.typeUrl || market_param_1.MarketParam.isAmino(o.market_param));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.marketParam !== undefined) {
            market_param_1.MarketParam.encode(message.marketParam, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMarketParamResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketParam = market_param_1.MarketParam.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryMarketParamResponse();
        message.marketParam = object.marketParam !== undefined && object.marketParam !== null ? market_param_1.MarketParam.fromPartial(object.marketParam) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryMarketParamResponse();
        if (object.market_param !== undefined && object.market_param !== null) {
            message.marketParam = market_param_1.MarketParam.fromAmino(object.market_param);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.market_param = message.marketParam ? market_param_1.MarketParam.toAmino(message.marketParam) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryMarketParamResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryMarketParamResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryMarketParamResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryMarketParamResponse",
            value: exports.QueryMarketParamResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryMarketParamResponse.typeUrl, exports.QueryMarketParamResponse);
function createBaseQueryAllMarketParamsRequest() {
    return {
        pagination: undefined
    };
}
exports.QueryAllMarketParamsRequest = {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketParamsRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryAllMarketParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryAllMarketParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryAllMarketParamsRequest.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllMarketParamsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAllMarketParamsRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllMarketParamsRequest();
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllMarketParamsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllMarketParamsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllMarketParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryAllMarketParamsRequest",
            value: exports.QueryAllMarketParamsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllMarketParamsRequest.typeUrl, exports.QueryAllMarketParamsRequest);
function createBaseQueryAllMarketParamsResponse() {
    return {
        marketParams: [],
        pagination: undefined
    };
}
exports.QueryAllMarketParamsResponse = {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketParamsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryAllMarketParamsResponse.typeUrl || Array.isArray(o.marketParams) && (!o.marketParams.length || market_param_1.MarketParam.is(o.marketParams[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryAllMarketParamsResponse.typeUrl || Array.isArray(o.market_params) && (!o.market_params.length || market_param_1.MarketParam.isSDK(o.market_params[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryAllMarketParamsResponse.typeUrl || Array.isArray(o.market_params) && (!o.market_params.length || market_param_1.MarketParam.isAmino(o.market_params[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.marketParams) {
            market_param_1.MarketParam.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllMarketParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketParams.push(market_param_1.MarketParam.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAllMarketParamsResponse();
        message.marketParams = object.marketParams?.map(e => market_param_1.MarketParam.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllMarketParamsResponse();
        message.marketParams = object.market_params?.map(e => market_param_1.MarketParam.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
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
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllMarketParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllMarketParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllMarketParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryAllMarketParamsResponse",
            value: exports.QueryAllMarketParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllMarketParamsResponse.typeUrl, exports.QueryAllMarketParamsResponse);
