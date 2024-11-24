"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisOrder = exports.RedisOrder_TickerTypeAmino = exports.RedisOrder_TickerTypeSDKType = exports.RedisOrder_TickerType = void 0;
exports.redisOrder_TickerTypeFromJSON = redisOrder_TickerTypeFromJSON;
exports.redisOrder_TickerTypeToJSON = redisOrder_TickerTypeToJSON;
//@ts-nocheck
const clob_1 = require("../protocol/v1/clob");
const helpers_1 = require("../../../helpers");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
/** Enum for the ticker type, PERPETUAL or SPOT. */
var RedisOrder_TickerType;
(function (RedisOrder_TickerType) {
    /**
     * TICKER_TYPE_UNSPECIFIED - Default value for the enum. Should never be used in an initialized
     * `RedisOrder`.
     */
    RedisOrder_TickerType[RedisOrder_TickerType["TICKER_TYPE_UNSPECIFIED"] = 0] = "TICKER_TYPE_UNSPECIFIED";
    /** TICKER_TYPE_PERPETUAL - Ticker is for a perpetual pair. */
    RedisOrder_TickerType[RedisOrder_TickerType["TICKER_TYPE_PERPETUAL"] = 1] = "TICKER_TYPE_PERPETUAL";
    /** TICKER_TYPE_SPOT - Ticker is for a spot pair. */
    RedisOrder_TickerType[RedisOrder_TickerType["TICKER_TYPE_SPOT"] = 2] = "TICKER_TYPE_SPOT";
    RedisOrder_TickerType[RedisOrder_TickerType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(RedisOrder_TickerType || (exports.RedisOrder_TickerType = RedisOrder_TickerType = {}));
exports.RedisOrder_TickerTypeSDKType = RedisOrder_TickerType;
exports.RedisOrder_TickerTypeAmino = RedisOrder_TickerType;
function redisOrder_TickerTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "TICKER_TYPE_UNSPECIFIED":
            return RedisOrder_TickerType.TICKER_TYPE_UNSPECIFIED;
        case 1:
        case "TICKER_TYPE_PERPETUAL":
            return RedisOrder_TickerType.TICKER_TYPE_PERPETUAL;
        case 2:
        case "TICKER_TYPE_SPOT":
            return RedisOrder_TickerType.TICKER_TYPE_SPOT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return RedisOrder_TickerType.UNRECOGNIZED;
    }
}
function redisOrder_TickerTypeToJSON(object) {
    switch (object) {
        case RedisOrder_TickerType.TICKER_TYPE_UNSPECIFIED:
            return "TICKER_TYPE_UNSPECIFIED";
        case RedisOrder_TickerType.TICKER_TYPE_PERPETUAL:
            return "TICKER_TYPE_PERPETUAL";
        case RedisOrder_TickerType.TICKER_TYPE_SPOT:
            return "TICKER_TYPE_SPOT";
        case RedisOrder_TickerType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseRedisOrder() {
    return {
        id: "",
        order: undefined,
        ticker: "",
        tickerType: 0,
        price: "",
        size: ""
    };
}
exports.RedisOrder = {
    typeUrl: "/klyraprotocol.indexer.redis.RedisOrder",
    is(o) {
        return o && (o.$typeUrl === exports.RedisOrder.typeUrl || typeof o.id === "string" && typeof o.ticker === "string" && (0, helpers_1.isSet)(o.tickerType) && typeof o.price === "string" && typeof o.size === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.RedisOrder.typeUrl || typeof o.id === "string" && typeof o.ticker === "string" && (0, helpers_1.isSet)(o.ticker_type) && typeof o.price === "string" && typeof o.size === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.RedisOrder.typeUrl || typeof o.id === "string" && typeof o.ticker === "string" && (0, helpers_1.isSet)(o.ticker_type) && typeof o.price === "string" && typeof o.size === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.order !== undefined) {
            clob_1.IndexerOrder.encode(message.order, writer.uint32(18).fork()).ldelim();
        }
        if (message.ticker !== "") {
            writer.uint32(26).string(message.ticker);
        }
        if (message.tickerType !== 0) {
            writer.uint32(32).int32(message.tickerType);
        }
        if (message.price !== "") {
            writer.uint32(42).string(message.price);
        }
        if (message.size !== "") {
            writer.uint32(50).string(message.size);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRedisOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.order = clob_1.IndexerOrder.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.ticker = reader.string();
                    break;
                case 4:
                    message.tickerType = reader.int32();
                    break;
                case 5:
                    message.price = reader.string();
                    break;
                case 6:
                    message.size = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseRedisOrder();
        message.id = object.id ?? "";
        message.order = object.order !== undefined && object.order !== null ? clob_1.IndexerOrder.fromPartial(object.order) : undefined;
        message.ticker = object.ticker ?? "";
        message.tickerType = object.tickerType ?? 0;
        message.price = object.price ?? "";
        message.size = object.size ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseRedisOrder();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.order !== undefined && object.order !== null) {
            message.order = clob_1.IndexerOrder.fromAmino(object.order);
        }
        if (object.ticker !== undefined && object.ticker !== null) {
            message.ticker = object.ticker;
        }
        if (object.ticker_type !== undefined && object.ticker_type !== null) {
            message.tickerType = object.ticker_type;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        if (object.size !== undefined && object.size !== null) {
            message.size = object.size;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === "" ? undefined : message.id;
        obj.order = message.order ? clob_1.IndexerOrder.toAmino(message.order) : undefined;
        obj.ticker = message.ticker === "" ? undefined : message.ticker;
        obj.ticker_type = message.tickerType === 0 ? undefined : message.tickerType;
        obj.price = message.price === "" ? undefined : message.price;
        obj.size = message.size === "" ? undefined : message.size;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.RedisOrder.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.RedisOrder.decode(message.value);
    },
    toProto(message) {
        return exports.RedisOrder.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.redis.RedisOrder",
            value: exports.RedisOrder.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.RedisOrder.typeUrl, exports.RedisOrder);
