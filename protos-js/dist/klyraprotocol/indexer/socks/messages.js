"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleMessage = exports.MarketMessage = exports.TradeMessage = exports.SubaccountMessage = exports.OrderbookMessage = exports.CandleMessage_ResolutionAmino = exports.CandleMessage_ResolutionSDKType = exports.CandleMessage_Resolution = void 0;
exports.candleMessage_ResolutionFromJSON = candleMessage_ResolutionFromJSON;
exports.candleMessage_ResolutionToJSON = candleMessage_ResolutionToJSON;
//@ts-nocheck
const subaccount_1 = require("../protocol/v1/subaccount");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
const helpers_1 = require("../../../helpers");
/** TODO(IND-210): Make this proto conform and update downstream indexer logic */
var CandleMessage_Resolution;
(function (CandleMessage_Resolution) {
    /**
     * ONE_MINUTE - buf:lint:ignore ENUM_VALUE_PREFIX
     * buf:lint:ignore ENUM_ZERO_VALUE_SUFFIX
     */
    CandleMessage_Resolution[CandleMessage_Resolution["ONE_MINUTE"] = 0] = "ONE_MINUTE";
    /** FIVE_MINUTES - buf:lint:ignore ENUM_VALUE_PREFIX */
    CandleMessage_Resolution[CandleMessage_Resolution["FIVE_MINUTES"] = 1] = "FIVE_MINUTES";
    /** FIFTEEN_MINUTES - buf:lint:ignore ENUM_VALUE_PREFIX */
    CandleMessage_Resolution[CandleMessage_Resolution["FIFTEEN_MINUTES"] = 2] = "FIFTEEN_MINUTES";
    /** THIRTY_MINUTES - buf:lint:ignore ENUM_VALUE_PREFIX */
    CandleMessage_Resolution[CandleMessage_Resolution["THIRTY_MINUTES"] = 3] = "THIRTY_MINUTES";
    /** ONE_HOUR - buf:lint:ignore ENUM_VALUE_PREFIX */
    CandleMessage_Resolution[CandleMessage_Resolution["ONE_HOUR"] = 4] = "ONE_HOUR";
    /** FOUR_HOURS - buf:lint:ignore ENUM_VALUE_PREFIX */
    CandleMessage_Resolution[CandleMessage_Resolution["FOUR_HOURS"] = 5] = "FOUR_HOURS";
    /** ONE_DAY - buf:lint:ignore ENUM_VALUE_PREFIX */
    CandleMessage_Resolution[CandleMessage_Resolution["ONE_DAY"] = 6] = "ONE_DAY";
    CandleMessage_Resolution[CandleMessage_Resolution["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(CandleMessage_Resolution || (exports.CandleMessage_Resolution = CandleMessage_Resolution = {}));
exports.CandleMessage_ResolutionSDKType = CandleMessage_Resolution;
exports.CandleMessage_ResolutionAmino = CandleMessage_Resolution;
function candleMessage_ResolutionFromJSON(object) {
    switch (object) {
        case 0:
        case "ONE_MINUTE":
            return CandleMessage_Resolution.ONE_MINUTE;
        case 1:
        case "FIVE_MINUTES":
            return CandleMessage_Resolution.FIVE_MINUTES;
        case 2:
        case "FIFTEEN_MINUTES":
            return CandleMessage_Resolution.FIFTEEN_MINUTES;
        case 3:
        case "THIRTY_MINUTES":
            return CandleMessage_Resolution.THIRTY_MINUTES;
        case 4:
        case "ONE_HOUR":
            return CandleMessage_Resolution.ONE_HOUR;
        case 5:
        case "FOUR_HOURS":
            return CandleMessage_Resolution.FOUR_HOURS;
        case 6:
        case "ONE_DAY":
            return CandleMessage_Resolution.ONE_DAY;
        case -1:
        case "UNRECOGNIZED":
        default:
            return CandleMessage_Resolution.UNRECOGNIZED;
    }
}
function candleMessage_ResolutionToJSON(object) {
    switch (object) {
        case CandleMessage_Resolution.ONE_MINUTE:
            return "ONE_MINUTE";
        case CandleMessage_Resolution.FIVE_MINUTES:
            return "FIVE_MINUTES";
        case CandleMessage_Resolution.FIFTEEN_MINUTES:
            return "FIFTEEN_MINUTES";
        case CandleMessage_Resolution.THIRTY_MINUTES:
            return "THIRTY_MINUTES";
        case CandleMessage_Resolution.ONE_HOUR:
            return "ONE_HOUR";
        case CandleMessage_Resolution.FOUR_HOURS:
            return "FOUR_HOURS";
        case CandleMessage_Resolution.ONE_DAY:
            return "ONE_DAY";
        case CandleMessage_Resolution.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseOrderbookMessage() {
    return {
        contents: "",
        clobPairId: "",
        version: ""
    };
}
exports.OrderbookMessage = {
    typeUrl: "/klyraprotocol.indexer.socks.OrderbookMessage",
    is(o) {
        return o && (o.$typeUrl === exports.OrderbookMessage.typeUrl || typeof o.contents === "string" && typeof o.clobPairId === "string" && typeof o.version === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.OrderbookMessage.typeUrl || typeof o.contents === "string" && typeof o.clob_pair_id === "string" && typeof o.version === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.OrderbookMessage.typeUrl || typeof o.contents === "string" && typeof o.clob_pair_id === "string" && typeof o.version === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.contents !== "") {
            writer.uint32(10).string(message.contents);
        }
        if (message.clobPairId !== "") {
            writer.uint32(18).string(message.clobPairId);
        }
        if (message.version !== "") {
            writer.uint32(26).string(message.version);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrderbookMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.contents = reader.string();
                    break;
                case 2:
                    message.clobPairId = reader.string();
                    break;
                case 3:
                    message.version = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOrderbookMessage();
        message.contents = object.contents ?? "";
        message.clobPairId = object.clobPairId ?? "";
        message.version = object.version ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseOrderbookMessage();
        if (object.contents !== undefined && object.contents !== null) {
            message.contents = object.contents;
        }
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = object.version;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.contents = message.contents === "" ? undefined : message.contents;
        obj.clob_pair_id = message.clobPairId === "" ? undefined : message.clobPairId;
        obj.version = message.version === "" ? undefined : message.version;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.OrderbookMessage.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.OrderbookMessage.decode(message.value);
    },
    toProto(message) {
        return exports.OrderbookMessage.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.socks.OrderbookMessage",
            value: exports.OrderbookMessage.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.OrderbookMessage.typeUrl, exports.OrderbookMessage);
function createBaseSubaccountMessage() {
    return {
        blockHeight: "",
        transactionIndex: 0,
        eventIndex: 0,
        contents: "",
        subaccountId: undefined,
        version: ""
    };
}
exports.SubaccountMessage = {
    typeUrl: "/klyraprotocol.indexer.socks.SubaccountMessage",
    is(o) {
        return o && (o.$typeUrl === exports.SubaccountMessage.typeUrl || typeof o.blockHeight === "string" && typeof o.transactionIndex === "number" && typeof o.eventIndex === "number" && typeof o.contents === "string" && typeof o.version === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.SubaccountMessage.typeUrl || typeof o.block_height === "string" && typeof o.transaction_index === "number" && typeof o.event_index === "number" && typeof o.contents === "string" && typeof o.version === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.SubaccountMessage.typeUrl || typeof o.block_height === "string" && typeof o.transaction_index === "number" && typeof o.event_index === "number" && typeof o.contents === "string" && typeof o.version === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.blockHeight !== "") {
            writer.uint32(10).string(message.blockHeight);
        }
        if (message.transactionIndex !== 0) {
            writer.uint32(16).int32(message.transactionIndex);
        }
        if (message.eventIndex !== 0) {
            writer.uint32(24).uint32(message.eventIndex);
        }
        if (message.contents !== "") {
            writer.uint32(34).string(message.contents);
        }
        if (message.subaccountId !== undefined) {
            subaccount_1.IndexerSubaccountId.encode(message.subaccountId, writer.uint32(42).fork()).ldelim();
        }
        if (message.version !== "") {
            writer.uint32(50).string(message.version);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubaccountMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockHeight = reader.string();
                    break;
                case 2:
                    message.transactionIndex = reader.int32();
                    break;
                case 3:
                    message.eventIndex = reader.uint32();
                    break;
                case 4:
                    message.contents = reader.string();
                    break;
                case 5:
                    message.subaccountId = subaccount_1.IndexerSubaccountId.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.version = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSubaccountMessage();
        message.blockHeight = object.blockHeight ?? "";
        message.transactionIndex = object.transactionIndex ?? 0;
        message.eventIndex = object.eventIndex ?? 0;
        message.contents = object.contents ?? "";
        message.subaccountId = object.subaccountId !== undefined && object.subaccountId !== null ? subaccount_1.IndexerSubaccountId.fromPartial(object.subaccountId) : undefined;
        message.version = object.version ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseSubaccountMessage();
        if (object.block_height !== undefined && object.block_height !== null) {
            message.blockHeight = object.block_height;
        }
        if (object.transaction_index !== undefined && object.transaction_index !== null) {
            message.transactionIndex = object.transaction_index;
        }
        if (object.event_index !== undefined && object.event_index !== null) {
            message.eventIndex = object.event_index;
        }
        if (object.contents !== undefined && object.contents !== null) {
            message.contents = object.contents;
        }
        if (object.subaccount_id !== undefined && object.subaccount_id !== null) {
            message.subaccountId = subaccount_1.IndexerSubaccountId.fromAmino(object.subaccount_id);
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = object.version;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block_height = message.blockHeight === "" ? undefined : message.blockHeight;
        obj.transaction_index = message.transactionIndex === 0 ? undefined : message.transactionIndex;
        obj.event_index = message.eventIndex === 0 ? undefined : message.eventIndex;
        obj.contents = message.contents === "" ? undefined : message.contents;
        obj.subaccount_id = message.subaccountId ? subaccount_1.IndexerSubaccountId.toAmino(message.subaccountId) : undefined;
        obj.version = message.version === "" ? undefined : message.version;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.SubaccountMessage.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.SubaccountMessage.decode(message.value);
    },
    toProto(message) {
        return exports.SubaccountMessage.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.socks.SubaccountMessage",
            value: exports.SubaccountMessage.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.SubaccountMessage.typeUrl, exports.SubaccountMessage);
function createBaseTradeMessage() {
    return {
        blockHeight: "",
        contents: "",
        clobPairId: "",
        version: ""
    };
}
exports.TradeMessage = {
    typeUrl: "/klyraprotocol.indexer.socks.TradeMessage",
    is(o) {
        return o && (o.$typeUrl === exports.TradeMessage.typeUrl || typeof o.blockHeight === "string" && typeof o.contents === "string" && typeof o.clobPairId === "string" && typeof o.version === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.TradeMessage.typeUrl || typeof o.block_height === "string" && typeof o.contents === "string" && typeof o.clob_pair_id === "string" && typeof o.version === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.TradeMessage.typeUrl || typeof o.block_height === "string" && typeof o.contents === "string" && typeof o.clob_pair_id === "string" && typeof o.version === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.blockHeight !== "") {
            writer.uint32(10).string(message.blockHeight);
        }
        if (message.contents !== "") {
            writer.uint32(34).string(message.contents);
        }
        if (message.clobPairId !== "") {
            writer.uint32(42).string(message.clobPairId);
        }
        if (message.version !== "") {
            writer.uint32(50).string(message.version);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTradeMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockHeight = reader.string();
                    break;
                case 4:
                    message.contents = reader.string();
                    break;
                case 5:
                    message.clobPairId = reader.string();
                    break;
                case 6:
                    message.version = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTradeMessage();
        message.blockHeight = object.blockHeight ?? "";
        message.contents = object.contents ?? "";
        message.clobPairId = object.clobPairId ?? "";
        message.version = object.version ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseTradeMessage();
        if (object.block_height !== undefined && object.block_height !== null) {
            message.blockHeight = object.block_height;
        }
        if (object.contents !== undefined && object.contents !== null) {
            message.contents = object.contents;
        }
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = object.version;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block_height = message.blockHeight === "" ? undefined : message.blockHeight;
        obj.contents = message.contents === "" ? undefined : message.contents;
        obj.clob_pair_id = message.clobPairId === "" ? undefined : message.clobPairId;
        obj.version = message.version === "" ? undefined : message.version;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.TradeMessage.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.TradeMessage.decode(message.value);
    },
    toProto(message) {
        return exports.TradeMessage.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.socks.TradeMessage",
            value: exports.TradeMessage.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.TradeMessage.typeUrl, exports.TradeMessage);
function createBaseMarketMessage() {
    return {
        contents: "",
        version: ""
    };
}
exports.MarketMessage = {
    typeUrl: "/klyraprotocol.indexer.socks.MarketMessage",
    is(o) {
        return o && (o.$typeUrl === exports.MarketMessage.typeUrl || typeof o.contents === "string" && typeof o.version === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MarketMessage.typeUrl || typeof o.contents === "string" && typeof o.version === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MarketMessage.typeUrl || typeof o.contents === "string" && typeof o.version === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.contents !== "") {
            writer.uint32(10).string(message.contents);
        }
        if (message.version !== "") {
            writer.uint32(18).string(message.version);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.contents = reader.string();
                    break;
                case 2:
                    message.version = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMarketMessage();
        message.contents = object.contents ?? "";
        message.version = object.version ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketMessage();
        if (object.contents !== undefined && object.contents !== null) {
            message.contents = object.contents;
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = object.version;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.contents = message.contents === "" ? undefined : message.contents;
        obj.version = message.version === "" ? undefined : message.version;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MarketMessage.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MarketMessage.decode(message.value);
    },
    toProto(message) {
        return exports.MarketMessage.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.socks.MarketMessage",
            value: exports.MarketMessage.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MarketMessage.typeUrl, exports.MarketMessage);
function createBaseCandleMessage() {
    return {
        contents: "",
        clobPairId: "",
        resolution: 0,
        version: ""
    };
}
exports.CandleMessage = {
    typeUrl: "/klyraprotocol.indexer.socks.CandleMessage",
    is(o) {
        return o && (o.$typeUrl === exports.CandleMessage.typeUrl || typeof o.contents === "string" && typeof o.clobPairId === "string" && (0, helpers_1.isSet)(o.resolution) && typeof o.version === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.CandleMessage.typeUrl || typeof o.contents === "string" && typeof o.clob_pair_id === "string" && (0, helpers_1.isSet)(o.resolution) && typeof o.version === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.CandleMessage.typeUrl || typeof o.contents === "string" && typeof o.clob_pair_id === "string" && (0, helpers_1.isSet)(o.resolution) && typeof o.version === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.contents !== "") {
            writer.uint32(10).string(message.contents);
        }
        if (message.clobPairId !== "") {
            writer.uint32(18).string(message.clobPairId);
        }
        if (message.resolution !== 0) {
            writer.uint32(24).int32(message.resolution);
        }
        if (message.version !== "") {
            writer.uint32(34).string(message.version);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCandleMessage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.contents = reader.string();
                    break;
                case 2:
                    message.clobPairId = reader.string();
                    break;
                case 3:
                    message.resolution = reader.int32();
                    break;
                case 4:
                    message.version = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseCandleMessage();
        message.contents = object.contents ?? "";
        message.clobPairId = object.clobPairId ?? "";
        message.resolution = object.resolution ?? 0;
        message.version = object.version ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseCandleMessage();
        if (object.contents !== undefined && object.contents !== null) {
            message.contents = object.contents;
        }
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        if (object.resolution !== undefined && object.resolution !== null) {
            message.resolution = object.resolution;
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = object.version;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.contents = message.contents === "" ? undefined : message.contents;
        obj.clob_pair_id = message.clobPairId === "" ? undefined : message.clobPairId;
        obj.resolution = message.resolution === 0 ? undefined : message.resolution;
        obj.version = message.version === "" ? undefined : message.version;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.CandleMessage.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.CandleMessage.decode(message.value);
    },
    toProto(message) {
        return exports.CandleMessage.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.socks.CandleMessage",
            value: exports.CandleMessage.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.CandleMessage.typeUrl, exports.CandleMessage);
