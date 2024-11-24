//@ts-nocheck
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { MarketPrice } from "./market_price";
import { MarketParam } from "./market_param";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseQueryMarketPriceRequest() {
    return {
        id: 0
    };
}
export const QueryMarketPriceRequest = {
    typeUrl: "/klyraprotocol.prices.QueryMarketPriceRequest",
    is(o) {
        return o && (o.$typeUrl === QueryMarketPriceRequest.typeUrl || typeof o.id === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryMarketPriceRequest.typeUrl || typeof o.id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryMarketPriceRequest.typeUrl || typeof o.id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return QueryMarketPriceRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryMarketPriceRequest.decode(message.value);
    },
    toProto(message) {
        return QueryMarketPriceRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryMarketPriceRequest",
            value: QueryMarketPriceRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryMarketPriceRequest.typeUrl, QueryMarketPriceRequest);
function createBaseQueryMarketPriceResponse() {
    return {
        marketPrice: MarketPrice.fromPartial({})
    };
}
export const QueryMarketPriceResponse = {
    typeUrl: "/klyraprotocol.prices.QueryMarketPriceResponse",
    is(o) {
        return o && (o.$typeUrl === QueryMarketPriceResponse.typeUrl || MarketPrice.is(o.marketPrice));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryMarketPriceResponse.typeUrl || MarketPrice.isSDK(o.market_price));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryMarketPriceResponse.typeUrl || MarketPrice.isAmino(o.market_price));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.marketPrice !== undefined) {
            MarketPrice.encode(message.marketPrice, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMarketPriceResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketPrice = MarketPrice.decode(reader, reader.uint32());
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
        message.marketPrice = object.marketPrice !== undefined && object.marketPrice !== null ? MarketPrice.fromPartial(object.marketPrice) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryMarketPriceResponse();
        if (object.market_price !== undefined && object.market_price !== null) {
            message.marketPrice = MarketPrice.fromAmino(object.market_price);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.market_price = message.marketPrice ? MarketPrice.toAmino(message.marketPrice) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryMarketPriceResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryMarketPriceResponse.decode(message.value);
    },
    toProto(message) {
        return QueryMarketPriceResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryMarketPriceResponse",
            value: QueryMarketPriceResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryMarketPriceResponse.typeUrl, QueryMarketPriceResponse);
function createBaseQueryAllMarketPricesRequest() {
    return {
        pagination: undefined
    };
}
export const QueryAllMarketPricesRequest = {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketPricesRequest",
    is(o) {
        return o && o.$typeUrl === QueryAllMarketPricesRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAllMarketPricesRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAllMarketPricesRequest.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllMarketPricesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllMarketPricesRequest();
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllMarketPricesRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllMarketPricesRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAllMarketPricesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryAllMarketPricesRequest",
            value: QueryAllMarketPricesRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllMarketPricesRequest.typeUrl, QueryAllMarketPricesRequest);
function createBaseQueryAllMarketPricesResponse() {
    return {
        marketPrices: [],
        pagination: undefined
    };
}
export const QueryAllMarketPricesResponse = {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketPricesResponse",
    is(o) {
        return o && (o.$typeUrl === QueryAllMarketPricesResponse.typeUrl || Array.isArray(o.marketPrices) && (!o.marketPrices.length || MarketPrice.is(o.marketPrices[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAllMarketPricesResponse.typeUrl || Array.isArray(o.market_prices) && (!o.market_prices.length || MarketPrice.isSDK(o.market_prices[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAllMarketPricesResponse.typeUrl || Array.isArray(o.market_prices) && (!o.market_prices.length || MarketPrice.isAmino(o.market_prices[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.marketPrices) {
            MarketPrice.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllMarketPricesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketPrices.push(MarketPrice.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
        message.marketPrices = object.marketPrices?.map(e => MarketPrice.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllMarketPricesResponse();
        message.marketPrices = object.market_prices?.map(e => MarketPrice.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.marketPrices) {
            obj.market_prices = message.marketPrices.map(e => e ? MarketPrice.toAmino(e) : undefined);
        }
        else {
            obj.market_prices = message.marketPrices;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllMarketPricesResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllMarketPricesResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAllMarketPricesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryAllMarketPricesResponse",
            value: QueryAllMarketPricesResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllMarketPricesResponse.typeUrl, QueryAllMarketPricesResponse);
function createBaseQueryMarketParamRequest() {
    return {
        id: 0
    };
}
export const QueryMarketParamRequest = {
    typeUrl: "/klyraprotocol.prices.QueryMarketParamRequest",
    is(o) {
        return o && (o.$typeUrl === QueryMarketParamRequest.typeUrl || typeof o.id === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryMarketParamRequest.typeUrl || typeof o.id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryMarketParamRequest.typeUrl || typeof o.id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return QueryMarketParamRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryMarketParamRequest.decode(message.value);
    },
    toProto(message) {
        return QueryMarketParamRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryMarketParamRequest",
            value: QueryMarketParamRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryMarketParamRequest.typeUrl, QueryMarketParamRequest);
function createBaseQueryMarketParamResponse() {
    return {
        marketParam: MarketParam.fromPartial({})
    };
}
export const QueryMarketParamResponse = {
    typeUrl: "/klyraprotocol.prices.QueryMarketParamResponse",
    is(o) {
        return o && (o.$typeUrl === QueryMarketParamResponse.typeUrl || MarketParam.is(o.marketParam));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryMarketParamResponse.typeUrl || MarketParam.isSDK(o.market_param));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryMarketParamResponse.typeUrl || MarketParam.isAmino(o.market_param));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.marketParam !== undefined) {
            MarketParam.encode(message.marketParam, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMarketParamResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketParam = MarketParam.decode(reader, reader.uint32());
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
        message.marketParam = object.marketParam !== undefined && object.marketParam !== null ? MarketParam.fromPartial(object.marketParam) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryMarketParamResponse();
        if (object.market_param !== undefined && object.market_param !== null) {
            message.marketParam = MarketParam.fromAmino(object.market_param);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.market_param = message.marketParam ? MarketParam.toAmino(message.marketParam) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryMarketParamResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryMarketParamResponse.decode(message.value);
    },
    toProto(message) {
        return QueryMarketParamResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryMarketParamResponse",
            value: QueryMarketParamResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryMarketParamResponse.typeUrl, QueryMarketParamResponse);
function createBaseQueryAllMarketParamsRequest() {
    return {
        pagination: undefined
    };
}
export const QueryAllMarketParamsRequest = {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketParamsRequest",
    is(o) {
        return o && o.$typeUrl === QueryAllMarketParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAllMarketParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAllMarketParamsRequest.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllMarketParamsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllMarketParamsRequest();
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllMarketParamsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllMarketParamsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAllMarketParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryAllMarketParamsRequest",
            value: QueryAllMarketParamsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllMarketParamsRequest.typeUrl, QueryAllMarketParamsRequest);
function createBaseQueryAllMarketParamsResponse() {
    return {
        marketParams: [],
        pagination: undefined
    };
}
export const QueryAllMarketParamsResponse = {
    typeUrl: "/klyraprotocol.prices.QueryAllMarketParamsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryAllMarketParamsResponse.typeUrl || Array.isArray(o.marketParams) && (!o.marketParams.length || MarketParam.is(o.marketParams[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAllMarketParamsResponse.typeUrl || Array.isArray(o.market_params) && (!o.market_params.length || MarketParam.isSDK(o.market_params[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAllMarketParamsResponse.typeUrl || Array.isArray(o.market_params) && (!o.market_params.length || MarketParam.isAmino(o.market_params[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.marketParams) {
            MarketParam.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllMarketParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketParams.push(MarketParam.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
        message.marketParams = object.marketParams?.map(e => MarketParam.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllMarketParamsResponse();
        message.marketParams = object.market_params?.map(e => MarketParam.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
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
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllMarketParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllMarketParamsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAllMarketParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.QueryAllMarketParamsResponse",
            value: QueryAllMarketParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllMarketParamsResponse.typeUrl, QueryAllMarketParamsResponse);
