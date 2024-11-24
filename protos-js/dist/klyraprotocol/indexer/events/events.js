"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateYieldParamsEventV1 = exports.UpdatePerpetualEventV1 = exports.UpdateClobPairEventV1 = exports.LiquidityTierUpsertEventV2 = exports.OpenInterestUpdate = exports.OpenInterestUpdateEventV1 = exports.LiquidityTierUpsertEventV1 = exports.PerpetualMarketCreateEventV2 = exports.PerpetualMarketCreateEventV1 = exports.AssetCreateEventV1 = exports.StatefulOrderEventV1_LongTermOrderPlacementV1 = exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1 = exports.StatefulOrderEventV1_ConditionalOrderPlacementV1 = exports.StatefulOrderEventV1_StatefulOrderRemovalV1 = exports.StatefulOrderEventV1_StatefulOrderPlacementV1 = exports.StatefulOrderEventV1 = exports.SubaccountUpdateEventV1 = exports.LiquidationOrderV1 = exports.DeleveragingEventV1 = exports.OrderFillEventV1 = exports.TransferEventV1 = exports.SourceOfFunds = exports.MarketModifyEventV1 = exports.MarketCreateEventV1 = exports.MarketBaseEventV1 = exports.MarketPriceUpdateEventV1 = exports.MarketEventV1 = exports.FundingEventV1 = exports.FundingUpdateV1 = exports.FundingEventV1_TypeAmino = exports.FundingEventV1_TypeSDKType = exports.FundingEventV1_Type = void 0;
exports.fundingEventV1_TypeFromJSON = fundingEventV1_TypeFromJSON;
exports.fundingEventV1_TypeToJSON = fundingEventV1_TypeToJSON;
//@ts-nocheck
const subaccount_1 = require("../protocol/v1/subaccount");
const clob_1 = require("../protocol/v1/clob");
const binary_1 = require("../../../binary");
const helpers_1 = require("../../../helpers");
const registry_1 = require("../../../registry");
/** Type is the type for funding values. */
var FundingEventV1_Type;
(function (FundingEventV1_Type) {
    /** TYPE_UNSPECIFIED - Unspecified type. */
    FundingEventV1_Type[FundingEventV1_Type["TYPE_UNSPECIFIED"] = 0] = "TYPE_UNSPECIFIED";
    /**
     * TYPE_PREMIUM_SAMPLE - Premium sample is the combined value from all premium votes during a
     * `funding-sample` epoch.
     */
    FundingEventV1_Type[FundingEventV1_Type["TYPE_PREMIUM_SAMPLE"] = 1] = "TYPE_PREMIUM_SAMPLE";
    /**
     * TYPE_FUNDING_RATE_AND_INDEX - Funding rate is the final funding rate combining all premium samples
     * during a `funding-tick` epoch.
     */
    FundingEventV1_Type[FundingEventV1_Type["TYPE_FUNDING_RATE_AND_INDEX"] = 2] = "TYPE_FUNDING_RATE_AND_INDEX";
    /**
     * TYPE_PREMIUM_VOTE - TODO(DEC-1513): Investigate whether premium vote values need to be
     * sent to indexer.
     */
    FundingEventV1_Type[FundingEventV1_Type["TYPE_PREMIUM_VOTE"] = 3] = "TYPE_PREMIUM_VOTE";
    FundingEventV1_Type[FundingEventV1_Type["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(FundingEventV1_Type || (exports.FundingEventV1_Type = FundingEventV1_Type = {}));
exports.FundingEventV1_TypeSDKType = FundingEventV1_Type;
exports.FundingEventV1_TypeAmino = FundingEventV1_Type;
function fundingEventV1_TypeFromJSON(object) {
    switch (object) {
        case 0:
        case "TYPE_UNSPECIFIED":
            return FundingEventV1_Type.TYPE_UNSPECIFIED;
        case 1:
        case "TYPE_PREMIUM_SAMPLE":
            return FundingEventV1_Type.TYPE_PREMIUM_SAMPLE;
        case 2:
        case "TYPE_FUNDING_RATE_AND_INDEX":
            return FundingEventV1_Type.TYPE_FUNDING_RATE_AND_INDEX;
        case 3:
        case "TYPE_PREMIUM_VOTE":
            return FundingEventV1_Type.TYPE_PREMIUM_VOTE;
        case -1:
        case "UNRECOGNIZED":
        default:
            return FundingEventV1_Type.UNRECOGNIZED;
    }
}
function fundingEventV1_TypeToJSON(object) {
    switch (object) {
        case FundingEventV1_Type.TYPE_UNSPECIFIED:
            return "TYPE_UNSPECIFIED";
        case FundingEventV1_Type.TYPE_PREMIUM_SAMPLE:
            return "TYPE_PREMIUM_SAMPLE";
        case FundingEventV1_Type.TYPE_FUNDING_RATE_AND_INDEX:
            return "TYPE_FUNDING_RATE_AND_INDEX";
        case FundingEventV1_Type.TYPE_PREMIUM_VOTE:
            return "TYPE_PREMIUM_VOTE";
        case FundingEventV1_Type.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseFundingUpdateV1() {
    return {
        perpetualId: 0,
        fundingValuePpm: 0,
        fundingIndex: new Uint8Array()
    };
}
exports.FundingUpdateV1 = {
    typeUrl: "/klyraprotocol.indexer.events.FundingUpdateV1",
    is(o) {
        return o && (o.$typeUrl === exports.FundingUpdateV1.typeUrl || typeof o.perpetualId === "number" && typeof o.fundingValuePpm === "number" && (o.fundingIndex instanceof Uint8Array || typeof o.fundingIndex === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.FundingUpdateV1.typeUrl || typeof o.perpetual_id === "number" && typeof o.funding_value_ppm === "number" && (o.funding_index instanceof Uint8Array || typeof o.funding_index === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.FundingUpdateV1.typeUrl || typeof o.perpetual_id === "number" && typeof o.funding_value_ppm === "number" && (o.funding_index instanceof Uint8Array || typeof o.funding_index === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.perpetualId !== 0) {
            writer.uint32(8).uint32(message.perpetualId);
        }
        if (message.fundingValuePpm !== 0) {
            writer.uint32(16).int32(message.fundingValuePpm);
        }
        if (message.fundingIndex.length !== 0) {
            writer.uint32(26).bytes(message.fundingIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFundingUpdateV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetualId = reader.uint32();
                    break;
                case 2:
                    message.fundingValuePpm = reader.int32();
                    break;
                case 3:
                    message.fundingIndex = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseFundingUpdateV1();
        message.perpetualId = object.perpetualId ?? 0;
        message.fundingValuePpm = object.fundingValuePpm ?? 0;
        message.fundingIndex = object.fundingIndex ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseFundingUpdateV1();
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        if (object.funding_value_ppm !== undefined && object.funding_value_ppm !== null) {
            message.fundingValuePpm = object.funding_value_ppm;
        }
        if (object.funding_index !== undefined && object.funding_index !== null) {
            message.fundingIndex = (0, helpers_1.bytesFromBase64)(object.funding_index);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        obj.funding_value_ppm = message.fundingValuePpm === 0 ? undefined : message.fundingValuePpm;
        obj.funding_index = message.fundingIndex ? (0, helpers_1.base64FromBytes)(message.fundingIndex) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.FundingUpdateV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.FundingUpdateV1.decode(message.value);
    },
    toProto(message) {
        return exports.FundingUpdateV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.FundingUpdateV1",
            value: exports.FundingUpdateV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.FundingUpdateV1.typeUrl, exports.FundingUpdateV1);
function createBaseFundingEventV1() {
    return {
        updates: [],
        type: 0
    };
}
exports.FundingEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.FundingEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.FundingEventV1.typeUrl || Array.isArray(o.updates) && (!o.updates.length || exports.FundingUpdateV1.is(o.updates[0])) && (0, helpers_1.isSet)(o.type));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.FundingEventV1.typeUrl || Array.isArray(o.updates) && (!o.updates.length || exports.FundingUpdateV1.isSDK(o.updates[0])) && (0, helpers_1.isSet)(o.type));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.FundingEventV1.typeUrl || Array.isArray(o.updates) && (!o.updates.length || exports.FundingUpdateV1.isAmino(o.updates[0])) && (0, helpers_1.isSet)(o.type));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.updates) {
            exports.FundingUpdateV1.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.type !== 0) {
            writer.uint32(16).int32(message.type);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFundingEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.updates.push(exports.FundingUpdateV1.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseFundingEventV1();
        message.updates = object.updates?.map(e => exports.FundingUpdateV1.fromPartial(e)) || [];
        message.type = object.type ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseFundingEventV1();
        message.updates = object.updates?.map(e => exports.FundingUpdateV1.fromAmino(e)) || [];
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.updates) {
            obj.updates = message.updates.map(e => e ? exports.FundingUpdateV1.toAmino(e) : undefined);
        }
        else {
            obj.updates = message.updates;
        }
        obj.type = message.type === 0 ? undefined : message.type;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.FundingEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.FundingEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.FundingEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.FundingEventV1",
            value: exports.FundingEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.FundingEventV1.typeUrl, exports.FundingEventV1);
function createBaseMarketEventV1() {
    return {
        marketId: 0,
        priceUpdate: undefined,
        marketCreate: undefined,
        marketModify: undefined
    };
}
exports.MarketEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.MarketEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.MarketEventV1.typeUrl || typeof o.marketId === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MarketEventV1.typeUrl || typeof o.market_id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MarketEventV1.typeUrl || typeof o.market_id === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.marketId !== 0) {
            writer.uint32(8).uint32(message.marketId);
        }
        if (message.priceUpdate !== undefined) {
            exports.MarketPriceUpdateEventV1.encode(message.priceUpdate, writer.uint32(18).fork()).ldelim();
        }
        if (message.marketCreate !== undefined) {
            exports.MarketCreateEventV1.encode(message.marketCreate, writer.uint32(26).fork()).ldelim();
        }
        if (message.marketModify !== undefined) {
            exports.MarketModifyEventV1.encode(message.marketModify, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketId = reader.uint32();
                    break;
                case 2:
                    message.priceUpdate = exports.MarketPriceUpdateEventV1.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.marketCreate = exports.MarketCreateEventV1.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.marketModify = exports.MarketModifyEventV1.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMarketEventV1();
        message.marketId = object.marketId ?? 0;
        message.priceUpdate = object.priceUpdate !== undefined && object.priceUpdate !== null ? exports.MarketPriceUpdateEventV1.fromPartial(object.priceUpdate) : undefined;
        message.marketCreate = object.marketCreate !== undefined && object.marketCreate !== null ? exports.MarketCreateEventV1.fromPartial(object.marketCreate) : undefined;
        message.marketModify = object.marketModify !== undefined && object.marketModify !== null ? exports.MarketModifyEventV1.fromPartial(object.marketModify) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketEventV1();
        if (object.market_id !== undefined && object.market_id !== null) {
            message.marketId = object.market_id;
        }
        if (object.price_update !== undefined && object.price_update !== null) {
            message.priceUpdate = exports.MarketPriceUpdateEventV1.fromAmino(object.price_update);
        }
        if (object.market_create !== undefined && object.market_create !== null) {
            message.marketCreate = exports.MarketCreateEventV1.fromAmino(object.market_create);
        }
        if (object.market_modify !== undefined && object.market_modify !== null) {
            message.marketModify = exports.MarketModifyEventV1.fromAmino(object.market_modify);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        obj.price_update = message.priceUpdate ? exports.MarketPriceUpdateEventV1.toAmino(message.priceUpdate) : undefined;
        obj.market_create = message.marketCreate ? exports.MarketCreateEventV1.toAmino(message.marketCreate) : undefined;
        obj.market_modify = message.marketModify ? exports.MarketModifyEventV1.toAmino(message.marketModify) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MarketEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MarketEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.MarketEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.MarketEventV1",
            value: exports.MarketEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MarketEventV1.typeUrl, exports.MarketEventV1);
function createBaseMarketPriceUpdateEventV1() {
    return {
        spotPriceWithExponent: BigInt(0),
        pnlPriceWithExponent: BigInt(0)
    };
}
exports.MarketPriceUpdateEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.MarketPriceUpdateEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.MarketPriceUpdateEventV1.typeUrl || typeof o.spotPriceWithExponent === "bigint" && typeof o.pnlPriceWithExponent === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MarketPriceUpdateEventV1.typeUrl || typeof o.spot_price_with_exponent === "bigint" && typeof o.pnl_price_with_exponent === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MarketPriceUpdateEventV1.typeUrl || typeof o.spot_price_with_exponent === "bigint" && typeof o.pnl_price_with_exponent === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.spotPriceWithExponent !== BigInt(0)) {
            writer.uint32(8).uint64(message.spotPriceWithExponent);
        }
        if (message.pnlPriceWithExponent !== BigInt(0)) {
            writer.uint32(16).uint64(message.pnlPriceWithExponent);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketPriceUpdateEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.spotPriceWithExponent = reader.uint64();
                    break;
                case 2:
                    message.pnlPriceWithExponent = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMarketPriceUpdateEventV1();
        message.spotPriceWithExponent = object.spotPriceWithExponent !== undefined && object.spotPriceWithExponent !== null ? BigInt(object.spotPriceWithExponent.toString()) : BigInt(0);
        message.pnlPriceWithExponent = object.pnlPriceWithExponent !== undefined && object.pnlPriceWithExponent !== null ? BigInt(object.pnlPriceWithExponent.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketPriceUpdateEventV1();
        if (object.spot_price_with_exponent !== undefined && object.spot_price_with_exponent !== null) {
            message.spotPriceWithExponent = BigInt(object.spot_price_with_exponent);
        }
        if (object.pnl_price_with_exponent !== undefined && object.pnl_price_with_exponent !== null) {
            message.pnlPriceWithExponent = BigInt(object.pnl_price_with_exponent);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.spot_price_with_exponent = message.spotPriceWithExponent !== BigInt(0) ? message.spotPriceWithExponent?.toString() : undefined;
        obj.pnl_price_with_exponent = message.pnlPriceWithExponent !== BigInt(0) ? message.pnlPriceWithExponent?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MarketPriceUpdateEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MarketPriceUpdateEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.MarketPriceUpdateEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.MarketPriceUpdateEventV1",
            value: exports.MarketPriceUpdateEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MarketPriceUpdateEventV1.typeUrl, exports.MarketPriceUpdateEventV1);
function createBaseMarketBaseEventV1() {
    return {
        pair: "",
        minPriceChangePpm: 0
    };
}
exports.MarketBaseEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.MarketBaseEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.MarketBaseEventV1.typeUrl || typeof o.pair === "string" && typeof o.minPriceChangePpm === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MarketBaseEventV1.typeUrl || typeof o.pair === "string" && typeof o.min_price_change_ppm === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MarketBaseEventV1.typeUrl || typeof o.pair === "string" && typeof o.min_price_change_ppm === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.pair !== "") {
            writer.uint32(10).string(message.pair);
        }
        if (message.minPriceChangePpm !== 0) {
            writer.uint32(16).uint32(message.minPriceChangePpm);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketBaseEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pair = reader.string();
                    break;
                case 2:
                    message.minPriceChangePpm = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMarketBaseEventV1();
        message.pair = object.pair ?? "";
        message.minPriceChangePpm = object.minPriceChangePpm ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketBaseEventV1();
        if (object.pair !== undefined && object.pair !== null) {
            message.pair = object.pair;
        }
        if (object.min_price_change_ppm !== undefined && object.min_price_change_ppm !== null) {
            message.minPriceChangePpm = object.min_price_change_ppm;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pair = message.pair === "" ? undefined : message.pair;
        obj.min_price_change_ppm = message.minPriceChangePpm === 0 ? undefined : message.minPriceChangePpm;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MarketBaseEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MarketBaseEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.MarketBaseEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.MarketBaseEventV1",
            value: exports.MarketBaseEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MarketBaseEventV1.typeUrl, exports.MarketBaseEventV1);
function createBaseMarketCreateEventV1() {
    return {
        base: undefined,
        exponent: 0
    };
}
exports.MarketCreateEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.MarketCreateEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.MarketCreateEventV1.typeUrl || typeof o.exponent === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MarketCreateEventV1.typeUrl || typeof o.exponent === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MarketCreateEventV1.typeUrl || typeof o.exponent === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.base !== undefined) {
            exports.MarketBaseEventV1.encode(message.base, writer.uint32(10).fork()).ldelim();
        }
        if (message.exponent !== 0) {
            writer.uint32(16).sint32(message.exponent);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketCreateEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.base = exports.MarketBaseEventV1.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.exponent = reader.sint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMarketCreateEventV1();
        message.base = object.base !== undefined && object.base !== null ? exports.MarketBaseEventV1.fromPartial(object.base) : undefined;
        message.exponent = object.exponent ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketCreateEventV1();
        if (object.base !== undefined && object.base !== null) {
            message.base = exports.MarketBaseEventV1.fromAmino(object.base);
        }
        if (object.exponent !== undefined && object.exponent !== null) {
            message.exponent = object.exponent;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.base = message.base ? exports.MarketBaseEventV1.toAmino(message.base) : undefined;
        obj.exponent = message.exponent === 0 ? undefined : message.exponent;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MarketCreateEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MarketCreateEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.MarketCreateEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.MarketCreateEventV1",
            value: exports.MarketCreateEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MarketCreateEventV1.typeUrl, exports.MarketCreateEventV1);
function createBaseMarketModifyEventV1() {
    return {
        base: undefined
    };
}
exports.MarketModifyEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.MarketModifyEventV1",
    is(o) {
        return o && o.$typeUrl === exports.MarketModifyEventV1.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MarketModifyEventV1.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MarketModifyEventV1.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.base !== undefined) {
            exports.MarketBaseEventV1.encode(message.base, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketModifyEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.base = exports.MarketBaseEventV1.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMarketModifyEventV1();
        message.base = object.base !== undefined && object.base !== null ? exports.MarketBaseEventV1.fromPartial(object.base) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketModifyEventV1();
        if (object.base !== undefined && object.base !== null) {
            message.base = exports.MarketBaseEventV1.fromAmino(object.base);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.base = message.base ? exports.MarketBaseEventV1.toAmino(message.base) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MarketModifyEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MarketModifyEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.MarketModifyEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.MarketModifyEventV1",
            value: exports.MarketModifyEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MarketModifyEventV1.typeUrl, exports.MarketModifyEventV1);
function createBaseSourceOfFunds() {
    return {
        subaccountId: undefined,
        address: undefined
    };
}
exports.SourceOfFunds = {
    typeUrl: "/klyraprotocol.indexer.events.SourceOfFunds",
    is(o) {
        return o && o.$typeUrl === exports.SourceOfFunds.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.SourceOfFunds.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.SourceOfFunds.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.subaccountId !== undefined) {
            subaccount_1.IndexerSubaccountId.encode(message.subaccountId, writer.uint32(10).fork()).ldelim();
        }
        if (message.address !== undefined) {
            writer.uint32(18).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSourceOfFunds();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subaccountId = subaccount_1.IndexerSubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSourceOfFunds();
        message.subaccountId = object.subaccountId !== undefined && object.subaccountId !== null ? subaccount_1.IndexerSubaccountId.fromPartial(object.subaccountId) : undefined;
        message.address = object.address ?? undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseSourceOfFunds();
        if (object.subaccount_id !== undefined && object.subaccount_id !== null) {
            message.subaccountId = subaccount_1.IndexerSubaccountId.fromAmino(object.subaccount_id);
        }
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.subaccount_id = message.subaccountId ? subaccount_1.IndexerSubaccountId.toAmino(message.subaccountId) : undefined;
        obj.address = message.address === null ? undefined : message.address;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.SourceOfFunds.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.SourceOfFunds.decode(message.value);
    },
    toProto(message) {
        return exports.SourceOfFunds.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.SourceOfFunds",
            value: exports.SourceOfFunds.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.SourceOfFunds.typeUrl, exports.SourceOfFunds);
function createBaseTransferEventV1() {
    return {
        senderSubaccountId: undefined,
        recipientSubaccountId: undefined,
        assetId: 0,
        amount: BigInt(0),
        sender: undefined,
        recipient: undefined
    };
}
exports.TransferEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.TransferEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.TransferEventV1.typeUrl || typeof o.assetId === "number" && typeof o.amount === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.TransferEventV1.typeUrl || typeof o.asset_id === "number" && typeof o.amount === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.TransferEventV1.typeUrl || typeof o.asset_id === "number" && typeof o.amount === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.senderSubaccountId !== undefined) {
            subaccount_1.IndexerSubaccountId.encode(message.senderSubaccountId, writer.uint32(10).fork()).ldelim();
        }
        if (message.recipientSubaccountId !== undefined) {
            subaccount_1.IndexerSubaccountId.encode(message.recipientSubaccountId, writer.uint32(18).fork()).ldelim();
        }
        if (message.assetId !== 0) {
            writer.uint32(24).uint32(message.assetId);
        }
        if (message.amount !== BigInt(0)) {
            writer.uint32(32).uint64(message.amount);
        }
        if (message.sender !== undefined) {
            exports.SourceOfFunds.encode(message.sender, writer.uint32(42).fork()).ldelim();
        }
        if (message.recipient !== undefined) {
            exports.SourceOfFunds.encode(message.recipient, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTransferEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.senderSubaccountId = subaccount_1.IndexerSubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.recipientSubaccountId = subaccount_1.IndexerSubaccountId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.assetId = reader.uint32();
                    break;
                case 4:
                    message.amount = reader.uint64();
                    break;
                case 5:
                    message.sender = exports.SourceOfFunds.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.recipient = exports.SourceOfFunds.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTransferEventV1();
        message.senderSubaccountId = object.senderSubaccountId !== undefined && object.senderSubaccountId !== null ? subaccount_1.IndexerSubaccountId.fromPartial(object.senderSubaccountId) : undefined;
        message.recipientSubaccountId = object.recipientSubaccountId !== undefined && object.recipientSubaccountId !== null ? subaccount_1.IndexerSubaccountId.fromPartial(object.recipientSubaccountId) : undefined;
        message.assetId = object.assetId ?? 0;
        message.amount = object.amount !== undefined && object.amount !== null ? BigInt(object.amount.toString()) : BigInt(0);
        message.sender = object.sender !== undefined && object.sender !== null ? exports.SourceOfFunds.fromPartial(object.sender) : undefined;
        message.recipient = object.recipient !== undefined && object.recipient !== null ? exports.SourceOfFunds.fromPartial(object.recipient) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseTransferEventV1();
        if (object.sender_subaccount_id !== undefined && object.sender_subaccount_id !== null) {
            message.senderSubaccountId = subaccount_1.IndexerSubaccountId.fromAmino(object.sender_subaccount_id);
        }
        if (object.recipient_subaccount_id !== undefined && object.recipient_subaccount_id !== null) {
            message.recipientSubaccountId = subaccount_1.IndexerSubaccountId.fromAmino(object.recipient_subaccount_id);
        }
        if (object.asset_id !== undefined && object.asset_id !== null) {
            message.assetId = object.asset_id;
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = BigInt(object.amount);
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = exports.SourceOfFunds.fromAmino(object.sender);
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = exports.SourceOfFunds.fromAmino(object.recipient);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.sender_subaccount_id = message.senderSubaccountId ? subaccount_1.IndexerSubaccountId.toAmino(message.senderSubaccountId) : undefined;
        obj.recipient_subaccount_id = message.recipientSubaccountId ? subaccount_1.IndexerSubaccountId.toAmino(message.recipientSubaccountId) : undefined;
        obj.asset_id = message.assetId === 0 ? undefined : message.assetId;
        obj.amount = message.amount !== BigInt(0) ? message.amount?.toString() : undefined;
        obj.sender = message.sender ? exports.SourceOfFunds.toAmino(message.sender) : undefined;
        obj.recipient = message.recipient ? exports.SourceOfFunds.toAmino(message.recipient) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.TransferEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.TransferEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.TransferEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.TransferEventV1",
            value: exports.TransferEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.TransferEventV1.typeUrl, exports.TransferEventV1);
function createBaseOrderFillEventV1() {
    return {
        makerOrder: clob_1.IndexerOrder.fromPartial({}),
        order: undefined,
        liquidationOrder: undefined,
        fillAmount: BigInt(0),
        makerFee: BigInt(0),
        takerFee: BigInt(0),
        totalFilledMaker: BigInt(0),
        totalFilledTaker: BigInt(0)
    };
}
exports.OrderFillEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.OrderFillEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.OrderFillEventV1.typeUrl || clob_1.IndexerOrder.is(o.makerOrder) && typeof o.fillAmount === "bigint" && typeof o.makerFee === "bigint" && typeof o.takerFee === "bigint" && typeof o.totalFilledMaker === "bigint" && typeof o.totalFilledTaker === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.OrderFillEventV1.typeUrl || clob_1.IndexerOrder.isSDK(o.maker_order) && typeof o.fill_amount === "bigint" && typeof o.maker_fee === "bigint" && typeof o.taker_fee === "bigint" && typeof o.total_filled_maker === "bigint" && typeof o.total_filled_taker === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.OrderFillEventV1.typeUrl || clob_1.IndexerOrder.isAmino(o.maker_order) && typeof o.fill_amount === "bigint" && typeof o.maker_fee === "bigint" && typeof o.taker_fee === "bigint" && typeof o.total_filled_maker === "bigint" && typeof o.total_filled_taker === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.makerOrder !== undefined) {
            clob_1.IndexerOrder.encode(message.makerOrder, writer.uint32(10).fork()).ldelim();
        }
        if (message.order !== undefined) {
            clob_1.IndexerOrder.encode(message.order, writer.uint32(18).fork()).ldelim();
        }
        if (message.liquidationOrder !== undefined) {
            exports.LiquidationOrderV1.encode(message.liquidationOrder, writer.uint32(34).fork()).ldelim();
        }
        if (message.fillAmount !== BigInt(0)) {
            writer.uint32(24).uint64(message.fillAmount);
        }
        if (message.makerFee !== BigInt(0)) {
            writer.uint32(40).sint64(message.makerFee);
        }
        if (message.takerFee !== BigInt(0)) {
            writer.uint32(48).sint64(message.takerFee);
        }
        if (message.totalFilledMaker !== BigInt(0)) {
            writer.uint32(56).uint64(message.totalFilledMaker);
        }
        if (message.totalFilledTaker !== BigInt(0)) {
            writer.uint32(64).uint64(message.totalFilledTaker);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrderFillEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.makerOrder = clob_1.IndexerOrder.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.order = clob_1.IndexerOrder.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.liquidationOrder = exports.LiquidationOrderV1.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.fillAmount = reader.uint64();
                    break;
                case 5:
                    message.makerFee = reader.sint64();
                    break;
                case 6:
                    message.takerFee = reader.sint64();
                    break;
                case 7:
                    message.totalFilledMaker = reader.uint64();
                    break;
                case 8:
                    message.totalFilledTaker = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOrderFillEventV1();
        message.makerOrder = object.makerOrder !== undefined && object.makerOrder !== null ? clob_1.IndexerOrder.fromPartial(object.makerOrder) : undefined;
        message.order = object.order !== undefined && object.order !== null ? clob_1.IndexerOrder.fromPartial(object.order) : undefined;
        message.liquidationOrder = object.liquidationOrder !== undefined && object.liquidationOrder !== null ? exports.LiquidationOrderV1.fromPartial(object.liquidationOrder) : undefined;
        message.fillAmount = object.fillAmount !== undefined && object.fillAmount !== null ? BigInt(object.fillAmount.toString()) : BigInt(0);
        message.makerFee = object.makerFee !== undefined && object.makerFee !== null ? BigInt(object.makerFee.toString()) : BigInt(0);
        message.takerFee = object.takerFee !== undefined && object.takerFee !== null ? BigInt(object.takerFee.toString()) : BigInt(0);
        message.totalFilledMaker = object.totalFilledMaker !== undefined && object.totalFilledMaker !== null ? BigInt(object.totalFilledMaker.toString()) : BigInt(0);
        message.totalFilledTaker = object.totalFilledTaker !== undefined && object.totalFilledTaker !== null ? BigInt(object.totalFilledTaker.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseOrderFillEventV1();
        if (object.maker_order !== undefined && object.maker_order !== null) {
            message.makerOrder = clob_1.IndexerOrder.fromAmino(object.maker_order);
        }
        if (object.order !== undefined && object.order !== null) {
            message.order = clob_1.IndexerOrder.fromAmino(object.order);
        }
        if (object.liquidation_order !== undefined && object.liquidation_order !== null) {
            message.liquidationOrder = exports.LiquidationOrderV1.fromAmino(object.liquidation_order);
        }
        if (object.fill_amount !== undefined && object.fill_amount !== null) {
            message.fillAmount = BigInt(object.fill_amount);
        }
        if (object.maker_fee !== undefined && object.maker_fee !== null) {
            message.makerFee = BigInt(object.maker_fee);
        }
        if (object.taker_fee !== undefined && object.taker_fee !== null) {
            message.takerFee = BigInt(object.taker_fee);
        }
        if (object.total_filled_maker !== undefined && object.total_filled_maker !== null) {
            message.totalFilledMaker = BigInt(object.total_filled_maker);
        }
        if (object.total_filled_taker !== undefined && object.total_filled_taker !== null) {
            message.totalFilledTaker = BigInt(object.total_filled_taker);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.maker_order = message.makerOrder ? clob_1.IndexerOrder.toAmino(message.makerOrder) : undefined;
        obj.order = message.order ? clob_1.IndexerOrder.toAmino(message.order) : undefined;
        obj.liquidation_order = message.liquidationOrder ? exports.LiquidationOrderV1.toAmino(message.liquidationOrder) : undefined;
        obj.fill_amount = message.fillAmount !== BigInt(0) ? message.fillAmount?.toString() : undefined;
        obj.maker_fee = message.makerFee !== BigInt(0) ? message.makerFee?.toString() : undefined;
        obj.taker_fee = message.takerFee !== BigInt(0) ? message.takerFee?.toString() : undefined;
        obj.total_filled_maker = message.totalFilledMaker !== BigInt(0) ? message.totalFilledMaker?.toString() : undefined;
        obj.total_filled_taker = message.totalFilledTaker !== BigInt(0) ? message.totalFilledTaker?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.OrderFillEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.OrderFillEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.OrderFillEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.OrderFillEventV1",
            value: exports.OrderFillEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.OrderFillEventV1.typeUrl, exports.OrderFillEventV1);
function createBaseDeleveragingEventV1() {
    return {
        liquidated: subaccount_1.IndexerSubaccountId.fromPartial({}),
        offsetting: subaccount_1.IndexerSubaccountId.fromPartial({}),
        perpetualId: 0,
        fillAmount: BigInt(0),
        totalQuoteQuantums: BigInt(0),
        isBuy: false,
        isFinalSettlement: false
    };
}
exports.DeleveragingEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.DeleveragingEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.DeleveragingEventV1.typeUrl || subaccount_1.IndexerSubaccountId.is(o.liquidated) && subaccount_1.IndexerSubaccountId.is(o.offsetting) && typeof o.perpetualId === "number" && typeof o.fillAmount === "bigint" && typeof o.totalQuoteQuantums === "bigint" && typeof o.isBuy === "boolean" && typeof o.isFinalSettlement === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.DeleveragingEventV1.typeUrl || subaccount_1.IndexerSubaccountId.isSDK(o.liquidated) && subaccount_1.IndexerSubaccountId.isSDK(o.offsetting) && typeof o.perpetual_id === "number" && typeof o.fill_amount === "bigint" && typeof o.total_quote_quantums === "bigint" && typeof o.is_buy === "boolean" && typeof o.is_final_settlement === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.DeleveragingEventV1.typeUrl || subaccount_1.IndexerSubaccountId.isAmino(o.liquidated) && subaccount_1.IndexerSubaccountId.isAmino(o.offsetting) && typeof o.perpetual_id === "number" && typeof o.fill_amount === "bigint" && typeof o.total_quote_quantums === "bigint" && typeof o.is_buy === "boolean" && typeof o.is_final_settlement === "boolean");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.liquidated !== undefined) {
            subaccount_1.IndexerSubaccountId.encode(message.liquidated, writer.uint32(10).fork()).ldelim();
        }
        if (message.offsetting !== undefined) {
            subaccount_1.IndexerSubaccountId.encode(message.offsetting, writer.uint32(18).fork()).ldelim();
        }
        if (message.perpetualId !== 0) {
            writer.uint32(24).uint32(message.perpetualId);
        }
        if (message.fillAmount !== BigInt(0)) {
            writer.uint32(32).uint64(message.fillAmount);
        }
        if (message.totalQuoteQuantums !== BigInt(0)) {
            writer.uint32(40).uint64(message.totalQuoteQuantums);
        }
        if (message.isBuy === true) {
            writer.uint32(48).bool(message.isBuy);
        }
        if (message.isFinalSettlement === true) {
            writer.uint32(56).bool(message.isFinalSettlement);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDeleveragingEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.liquidated = subaccount_1.IndexerSubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.offsetting = subaccount_1.IndexerSubaccountId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.perpetualId = reader.uint32();
                    break;
                case 4:
                    message.fillAmount = reader.uint64();
                    break;
                case 5:
                    message.totalQuoteQuantums = reader.uint64();
                    break;
                case 6:
                    message.isBuy = reader.bool();
                    break;
                case 7:
                    message.isFinalSettlement = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDeleveragingEventV1();
        message.liquidated = object.liquidated !== undefined && object.liquidated !== null ? subaccount_1.IndexerSubaccountId.fromPartial(object.liquidated) : undefined;
        message.offsetting = object.offsetting !== undefined && object.offsetting !== null ? subaccount_1.IndexerSubaccountId.fromPartial(object.offsetting) : undefined;
        message.perpetualId = object.perpetualId ?? 0;
        message.fillAmount = object.fillAmount !== undefined && object.fillAmount !== null ? BigInt(object.fillAmount.toString()) : BigInt(0);
        message.totalQuoteQuantums = object.totalQuoteQuantums !== undefined && object.totalQuoteQuantums !== null ? BigInt(object.totalQuoteQuantums.toString()) : BigInt(0);
        message.isBuy = object.isBuy ?? false;
        message.isFinalSettlement = object.isFinalSettlement ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseDeleveragingEventV1();
        if (object.liquidated !== undefined && object.liquidated !== null) {
            message.liquidated = subaccount_1.IndexerSubaccountId.fromAmino(object.liquidated);
        }
        if (object.offsetting !== undefined && object.offsetting !== null) {
            message.offsetting = subaccount_1.IndexerSubaccountId.fromAmino(object.offsetting);
        }
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        if (object.fill_amount !== undefined && object.fill_amount !== null) {
            message.fillAmount = BigInt(object.fill_amount);
        }
        if (object.total_quote_quantums !== undefined && object.total_quote_quantums !== null) {
            message.totalQuoteQuantums = BigInt(object.total_quote_quantums);
        }
        if (object.is_buy !== undefined && object.is_buy !== null) {
            message.isBuy = object.is_buy;
        }
        if (object.is_final_settlement !== undefined && object.is_final_settlement !== null) {
            message.isFinalSettlement = object.is_final_settlement;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.liquidated = message.liquidated ? subaccount_1.IndexerSubaccountId.toAmino(message.liquidated) : undefined;
        obj.offsetting = message.offsetting ? subaccount_1.IndexerSubaccountId.toAmino(message.offsetting) : undefined;
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        obj.fill_amount = message.fillAmount !== BigInt(0) ? message.fillAmount?.toString() : undefined;
        obj.total_quote_quantums = message.totalQuoteQuantums !== BigInt(0) ? message.totalQuoteQuantums?.toString() : undefined;
        obj.is_buy = message.isBuy === false ? undefined : message.isBuy;
        obj.is_final_settlement = message.isFinalSettlement === false ? undefined : message.isFinalSettlement;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.DeleveragingEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.DeleveragingEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.DeleveragingEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.DeleveragingEventV1",
            value: exports.DeleveragingEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.DeleveragingEventV1.typeUrl, exports.DeleveragingEventV1);
function createBaseLiquidationOrderV1() {
    return {
        liquidated: subaccount_1.IndexerSubaccountId.fromPartial({}),
        clobPairId: 0,
        perpetualId: 0,
        totalSize: BigInt(0),
        isBuy: false,
        subticks: BigInt(0)
    };
}
exports.LiquidationOrderV1 = {
    typeUrl: "/klyraprotocol.indexer.events.LiquidationOrderV1",
    is(o) {
        return o && (o.$typeUrl === exports.LiquidationOrderV1.typeUrl || subaccount_1.IndexerSubaccountId.is(o.liquidated) && typeof o.clobPairId === "number" && typeof o.perpetualId === "number" && typeof o.totalSize === "bigint" && typeof o.isBuy === "boolean" && typeof o.subticks === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.LiquidationOrderV1.typeUrl || subaccount_1.IndexerSubaccountId.isSDK(o.liquidated) && typeof o.clob_pair_id === "number" && typeof o.perpetual_id === "number" && typeof o.total_size === "bigint" && typeof o.is_buy === "boolean" && typeof o.subticks === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.LiquidationOrderV1.typeUrl || subaccount_1.IndexerSubaccountId.isAmino(o.liquidated) && typeof o.clob_pair_id === "number" && typeof o.perpetual_id === "number" && typeof o.total_size === "bigint" && typeof o.is_buy === "boolean" && typeof o.subticks === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.liquidated !== undefined) {
            subaccount_1.IndexerSubaccountId.encode(message.liquidated, writer.uint32(10).fork()).ldelim();
        }
        if (message.clobPairId !== 0) {
            writer.uint32(16).uint32(message.clobPairId);
        }
        if (message.perpetualId !== 0) {
            writer.uint32(24).uint32(message.perpetualId);
        }
        if (message.totalSize !== BigInt(0)) {
            writer.uint32(32).uint64(message.totalSize);
        }
        if (message.isBuy === true) {
            writer.uint32(40).bool(message.isBuy);
        }
        if (message.subticks !== BigInt(0)) {
            writer.uint32(48).uint64(message.subticks);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLiquidationOrderV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.liquidated = subaccount_1.IndexerSubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.clobPairId = reader.uint32();
                    break;
                case 3:
                    message.perpetualId = reader.uint32();
                    break;
                case 4:
                    message.totalSize = reader.uint64();
                    break;
                case 5:
                    message.isBuy = reader.bool();
                    break;
                case 6:
                    message.subticks = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseLiquidationOrderV1();
        message.liquidated = object.liquidated !== undefined && object.liquidated !== null ? subaccount_1.IndexerSubaccountId.fromPartial(object.liquidated) : undefined;
        message.clobPairId = object.clobPairId ?? 0;
        message.perpetualId = object.perpetualId ?? 0;
        message.totalSize = object.totalSize !== undefined && object.totalSize !== null ? BigInt(object.totalSize.toString()) : BigInt(0);
        message.isBuy = object.isBuy ?? false;
        message.subticks = object.subticks !== undefined && object.subticks !== null ? BigInt(object.subticks.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseLiquidationOrderV1();
        if (object.liquidated !== undefined && object.liquidated !== null) {
            message.liquidated = subaccount_1.IndexerSubaccountId.fromAmino(object.liquidated);
        }
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        if (object.total_size !== undefined && object.total_size !== null) {
            message.totalSize = BigInt(object.total_size);
        }
        if (object.is_buy !== undefined && object.is_buy !== null) {
            message.isBuy = object.is_buy;
        }
        if (object.subticks !== undefined && object.subticks !== null) {
            message.subticks = BigInt(object.subticks);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.liquidated = message.liquidated ? subaccount_1.IndexerSubaccountId.toAmino(message.liquidated) : undefined;
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        obj.total_size = message.totalSize !== BigInt(0) ? message.totalSize?.toString() : undefined;
        obj.is_buy = message.isBuy === false ? undefined : message.isBuy;
        obj.subticks = message.subticks !== BigInt(0) ? message.subticks?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.LiquidationOrderV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.LiquidationOrderV1.decode(message.value);
    },
    toProto(message) {
        return exports.LiquidationOrderV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.LiquidationOrderV1",
            value: exports.LiquidationOrderV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.LiquidationOrderV1.typeUrl, exports.LiquidationOrderV1);
function createBaseSubaccountUpdateEventV1() {
    return {
        subaccountId: undefined,
        updatedPerpetualPositions: [],
        updatedAssetPositions: [],
        yieldIndex: ""
    };
}
exports.SubaccountUpdateEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.SubaccountUpdateEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.SubaccountUpdateEventV1.typeUrl || Array.isArray(o.updatedPerpetualPositions) && (!o.updatedPerpetualPositions.length || subaccount_1.IndexerPerpetualPosition.is(o.updatedPerpetualPositions[0])) && Array.isArray(o.updatedAssetPositions) && (!o.updatedAssetPositions.length || subaccount_1.IndexerAssetPosition.is(o.updatedAssetPositions[0])) && typeof o.yieldIndex === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.SubaccountUpdateEventV1.typeUrl || Array.isArray(o.updated_perpetual_positions) && (!o.updated_perpetual_positions.length || subaccount_1.IndexerPerpetualPosition.isSDK(o.updated_perpetual_positions[0])) && Array.isArray(o.updated_asset_positions) && (!o.updated_asset_positions.length || subaccount_1.IndexerAssetPosition.isSDK(o.updated_asset_positions[0])) && typeof o.yield_index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.SubaccountUpdateEventV1.typeUrl || Array.isArray(o.updated_perpetual_positions) && (!o.updated_perpetual_positions.length || subaccount_1.IndexerPerpetualPosition.isAmino(o.updated_perpetual_positions[0])) && Array.isArray(o.updated_asset_positions) && (!o.updated_asset_positions.length || subaccount_1.IndexerAssetPosition.isAmino(o.updated_asset_positions[0])) && typeof o.yield_index === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.subaccountId !== undefined) {
            subaccount_1.IndexerSubaccountId.encode(message.subaccountId, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.updatedPerpetualPositions) {
            subaccount_1.IndexerPerpetualPosition.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.updatedAssetPositions) {
            subaccount_1.IndexerAssetPosition.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (message.yieldIndex !== "") {
            writer.uint32(42).string(message.yieldIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubaccountUpdateEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subaccountId = subaccount_1.IndexerSubaccountId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.updatedPerpetualPositions.push(subaccount_1.IndexerPerpetualPosition.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.updatedAssetPositions.push(subaccount_1.IndexerAssetPosition.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.yieldIndex = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSubaccountUpdateEventV1();
        message.subaccountId = object.subaccountId !== undefined && object.subaccountId !== null ? subaccount_1.IndexerSubaccountId.fromPartial(object.subaccountId) : undefined;
        message.updatedPerpetualPositions = object.updatedPerpetualPositions?.map(e => subaccount_1.IndexerPerpetualPosition.fromPartial(e)) || [];
        message.updatedAssetPositions = object.updatedAssetPositions?.map(e => subaccount_1.IndexerAssetPosition.fromPartial(e)) || [];
        message.yieldIndex = object.yieldIndex ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseSubaccountUpdateEventV1();
        if (object.subaccount_id !== undefined && object.subaccount_id !== null) {
            message.subaccountId = subaccount_1.IndexerSubaccountId.fromAmino(object.subaccount_id);
        }
        message.updatedPerpetualPositions = object.updated_perpetual_positions?.map(e => subaccount_1.IndexerPerpetualPosition.fromAmino(e)) || [];
        message.updatedAssetPositions = object.updated_asset_positions?.map(e => subaccount_1.IndexerAssetPosition.fromAmino(e)) || [];
        if (object.yield_index !== undefined && object.yield_index !== null) {
            message.yieldIndex = object.yield_index;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.subaccount_id = message.subaccountId ? subaccount_1.IndexerSubaccountId.toAmino(message.subaccountId) : undefined;
        if (message.updatedPerpetualPositions) {
            obj.updated_perpetual_positions = message.updatedPerpetualPositions.map(e => e ? subaccount_1.IndexerPerpetualPosition.toAmino(e) : undefined);
        }
        else {
            obj.updated_perpetual_positions = message.updatedPerpetualPositions;
        }
        if (message.updatedAssetPositions) {
            obj.updated_asset_positions = message.updatedAssetPositions.map(e => e ? subaccount_1.IndexerAssetPosition.toAmino(e) : undefined);
        }
        else {
            obj.updated_asset_positions = message.updatedAssetPositions;
        }
        obj.yield_index = message.yieldIndex === "" ? undefined : message.yieldIndex;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.SubaccountUpdateEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.SubaccountUpdateEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.SubaccountUpdateEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.SubaccountUpdateEventV1",
            value: exports.SubaccountUpdateEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.SubaccountUpdateEventV1.typeUrl, exports.SubaccountUpdateEventV1);
function createBaseStatefulOrderEventV1() {
    return {
        orderPlace: undefined,
        orderRemoval: undefined,
        conditionalOrderPlacement: undefined,
        conditionalOrderTriggered: undefined,
        longTermOrderPlacement: undefined
    };
}
exports.StatefulOrderEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.StatefulOrderEventV1",
    is(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.orderPlace !== undefined) {
            exports.StatefulOrderEventV1_StatefulOrderPlacementV1.encode(message.orderPlace, writer.uint32(10).fork()).ldelim();
        }
        if (message.orderRemoval !== undefined) {
            exports.StatefulOrderEventV1_StatefulOrderRemovalV1.encode(message.orderRemoval, writer.uint32(34).fork()).ldelim();
        }
        if (message.conditionalOrderPlacement !== undefined) {
            exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.encode(message.conditionalOrderPlacement, writer.uint32(42).fork()).ldelim();
        }
        if (message.conditionalOrderTriggered !== undefined) {
            exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.encode(message.conditionalOrderTriggered, writer.uint32(50).fork()).ldelim();
        }
        if (message.longTermOrderPlacement !== undefined) {
            exports.StatefulOrderEventV1_LongTermOrderPlacementV1.encode(message.longTermOrderPlacement, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatefulOrderEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderPlace = exports.StatefulOrderEventV1_StatefulOrderPlacementV1.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.orderRemoval = exports.StatefulOrderEventV1_StatefulOrderRemovalV1.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.conditionalOrderPlacement = exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.conditionalOrderTriggered = exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.longTermOrderPlacement = exports.StatefulOrderEventV1_LongTermOrderPlacementV1.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStatefulOrderEventV1();
        message.orderPlace = object.orderPlace !== undefined && object.orderPlace !== null ? exports.StatefulOrderEventV1_StatefulOrderPlacementV1.fromPartial(object.orderPlace) : undefined;
        message.orderRemoval = object.orderRemoval !== undefined && object.orderRemoval !== null ? exports.StatefulOrderEventV1_StatefulOrderRemovalV1.fromPartial(object.orderRemoval) : undefined;
        message.conditionalOrderPlacement = object.conditionalOrderPlacement !== undefined && object.conditionalOrderPlacement !== null ? exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.fromPartial(object.conditionalOrderPlacement) : undefined;
        message.conditionalOrderTriggered = object.conditionalOrderTriggered !== undefined && object.conditionalOrderTriggered !== null ? exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.fromPartial(object.conditionalOrderTriggered) : undefined;
        message.longTermOrderPlacement = object.longTermOrderPlacement !== undefined && object.longTermOrderPlacement !== null ? exports.StatefulOrderEventV1_LongTermOrderPlacementV1.fromPartial(object.longTermOrderPlacement) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseStatefulOrderEventV1();
        if (object.order_place !== undefined && object.order_place !== null) {
            message.orderPlace = exports.StatefulOrderEventV1_StatefulOrderPlacementV1.fromAmino(object.order_place);
        }
        if (object.order_removal !== undefined && object.order_removal !== null) {
            message.orderRemoval = exports.StatefulOrderEventV1_StatefulOrderRemovalV1.fromAmino(object.order_removal);
        }
        if (object.conditional_order_placement !== undefined && object.conditional_order_placement !== null) {
            message.conditionalOrderPlacement = exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.fromAmino(object.conditional_order_placement);
        }
        if (object.conditional_order_triggered !== undefined && object.conditional_order_triggered !== null) {
            message.conditionalOrderTriggered = exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.fromAmino(object.conditional_order_triggered);
        }
        if (object.long_term_order_placement !== undefined && object.long_term_order_placement !== null) {
            message.longTermOrderPlacement = exports.StatefulOrderEventV1_LongTermOrderPlacementV1.fromAmino(object.long_term_order_placement);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order_place = message.orderPlace ? exports.StatefulOrderEventV1_StatefulOrderPlacementV1.toAmino(message.orderPlace) : undefined;
        obj.order_removal = message.orderRemoval ? exports.StatefulOrderEventV1_StatefulOrderRemovalV1.toAmino(message.orderRemoval) : undefined;
        obj.conditional_order_placement = message.conditionalOrderPlacement ? exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.toAmino(message.conditionalOrderPlacement) : undefined;
        obj.conditional_order_triggered = message.conditionalOrderTriggered ? exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.toAmino(message.conditionalOrderTriggered) : undefined;
        obj.long_term_order_placement = message.longTermOrderPlacement ? exports.StatefulOrderEventV1_LongTermOrderPlacementV1.toAmino(message.longTermOrderPlacement) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StatefulOrderEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.StatefulOrderEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.StatefulOrderEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.StatefulOrderEventV1",
            value: exports.StatefulOrderEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StatefulOrderEventV1.typeUrl, exports.StatefulOrderEventV1);
function createBaseStatefulOrderEventV1_StatefulOrderPlacementV1() {
    return {
        order: undefined
    };
}
exports.StatefulOrderEventV1_StatefulOrderPlacementV1 = {
    typeUrl: "/klyraprotocol.indexer.events.StatefulOrderPlacementV1",
    is(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_StatefulOrderPlacementV1.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_StatefulOrderPlacementV1.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_StatefulOrderPlacementV1.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.order !== undefined) {
            clob_1.IndexerOrder.encode(message.order, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatefulOrderEventV1_StatefulOrderPlacementV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.order = clob_1.IndexerOrder.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStatefulOrderEventV1_StatefulOrderPlacementV1();
        message.order = object.order !== undefined && object.order !== null ? clob_1.IndexerOrder.fromPartial(object.order) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseStatefulOrderEventV1_StatefulOrderPlacementV1();
        if (object.order !== undefined && object.order !== null) {
            message.order = clob_1.IndexerOrder.fromAmino(object.order);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order = message.order ? clob_1.IndexerOrder.toAmino(message.order) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StatefulOrderEventV1_StatefulOrderPlacementV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.StatefulOrderEventV1_StatefulOrderPlacementV1.decode(message.value);
    },
    toProto(message) {
        return exports.StatefulOrderEventV1_StatefulOrderPlacementV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.StatefulOrderPlacementV1",
            value: exports.StatefulOrderEventV1_StatefulOrderPlacementV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StatefulOrderEventV1_StatefulOrderPlacementV1.typeUrl, exports.StatefulOrderEventV1_StatefulOrderPlacementV1);
function createBaseStatefulOrderEventV1_StatefulOrderRemovalV1() {
    return {
        removedOrderId: undefined,
        reason: 0
    };
}
exports.StatefulOrderEventV1_StatefulOrderRemovalV1 = {
    typeUrl: "/klyraprotocol.indexer.events.StatefulOrderRemovalV1",
    is(o) {
        return o && (o.$typeUrl === exports.StatefulOrderEventV1_StatefulOrderRemovalV1.typeUrl || (0, helpers_1.isSet)(o.reason));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.StatefulOrderEventV1_StatefulOrderRemovalV1.typeUrl || (0, helpers_1.isSet)(o.reason));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.StatefulOrderEventV1_StatefulOrderRemovalV1.typeUrl || (0, helpers_1.isSet)(o.reason));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.removedOrderId !== undefined) {
            clob_1.IndexerOrderId.encode(message.removedOrderId, writer.uint32(10).fork()).ldelim();
        }
        if (message.reason !== 0) {
            writer.uint32(16).int32(message.reason);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatefulOrderEventV1_StatefulOrderRemovalV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.removedOrderId = clob_1.IndexerOrderId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.reason = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStatefulOrderEventV1_StatefulOrderRemovalV1();
        message.removedOrderId = object.removedOrderId !== undefined && object.removedOrderId !== null ? clob_1.IndexerOrderId.fromPartial(object.removedOrderId) : undefined;
        message.reason = object.reason ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseStatefulOrderEventV1_StatefulOrderRemovalV1();
        if (object.removed_order_id !== undefined && object.removed_order_id !== null) {
            message.removedOrderId = clob_1.IndexerOrderId.fromAmino(object.removed_order_id);
        }
        if (object.reason !== undefined && object.reason !== null) {
            message.reason = object.reason;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.removed_order_id = message.removedOrderId ? clob_1.IndexerOrderId.toAmino(message.removedOrderId) : undefined;
        obj.reason = message.reason === 0 ? undefined : message.reason;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StatefulOrderEventV1_StatefulOrderRemovalV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.StatefulOrderEventV1_StatefulOrderRemovalV1.decode(message.value);
    },
    toProto(message) {
        return exports.StatefulOrderEventV1_StatefulOrderRemovalV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.StatefulOrderRemovalV1",
            value: exports.StatefulOrderEventV1_StatefulOrderRemovalV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StatefulOrderEventV1_StatefulOrderRemovalV1.typeUrl, exports.StatefulOrderEventV1_StatefulOrderRemovalV1);
function createBaseStatefulOrderEventV1_ConditionalOrderPlacementV1() {
    return {
        order: undefined
    };
}
exports.StatefulOrderEventV1_ConditionalOrderPlacementV1 = {
    typeUrl: "/klyraprotocol.indexer.events.ConditionalOrderPlacementV1",
    is(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.order !== undefined) {
            clob_1.IndexerOrder.encode(message.order, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatefulOrderEventV1_ConditionalOrderPlacementV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.order = clob_1.IndexerOrder.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStatefulOrderEventV1_ConditionalOrderPlacementV1();
        message.order = object.order !== undefined && object.order !== null ? clob_1.IndexerOrder.fromPartial(object.order) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseStatefulOrderEventV1_ConditionalOrderPlacementV1();
        if (object.order !== undefined && object.order !== null) {
            message.order = clob_1.IndexerOrder.fromAmino(object.order);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order = message.order ? clob_1.IndexerOrder.toAmino(message.order) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.decode(message.value);
    },
    toProto(message) {
        return exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.ConditionalOrderPlacementV1",
            value: exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StatefulOrderEventV1_ConditionalOrderPlacementV1.typeUrl, exports.StatefulOrderEventV1_ConditionalOrderPlacementV1);
function createBaseStatefulOrderEventV1_ConditionalOrderTriggeredV1() {
    return {
        triggeredOrderId: undefined
    };
}
exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1 = {
    typeUrl: "/klyraprotocol.indexer.events.ConditionalOrderTriggeredV1",
    is(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.triggeredOrderId !== undefined) {
            clob_1.IndexerOrderId.encode(message.triggeredOrderId, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatefulOrderEventV1_ConditionalOrderTriggeredV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.triggeredOrderId = clob_1.IndexerOrderId.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStatefulOrderEventV1_ConditionalOrderTriggeredV1();
        message.triggeredOrderId = object.triggeredOrderId !== undefined && object.triggeredOrderId !== null ? clob_1.IndexerOrderId.fromPartial(object.triggeredOrderId) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseStatefulOrderEventV1_ConditionalOrderTriggeredV1();
        if (object.triggered_order_id !== undefined && object.triggered_order_id !== null) {
            message.triggeredOrderId = clob_1.IndexerOrderId.fromAmino(object.triggered_order_id);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.triggered_order_id = message.triggeredOrderId ? clob_1.IndexerOrderId.toAmino(message.triggeredOrderId) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.decode(message.value);
    },
    toProto(message) {
        return exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.ConditionalOrderTriggeredV1",
            value: exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1.typeUrl, exports.StatefulOrderEventV1_ConditionalOrderTriggeredV1);
function createBaseStatefulOrderEventV1_LongTermOrderPlacementV1() {
    return {
        order: undefined
    };
}
exports.StatefulOrderEventV1_LongTermOrderPlacementV1 = {
    typeUrl: "/klyraprotocol.indexer.events.LongTermOrderPlacementV1",
    is(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_LongTermOrderPlacementV1.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_LongTermOrderPlacementV1.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.StatefulOrderEventV1_LongTermOrderPlacementV1.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.order !== undefined) {
            clob_1.IndexerOrder.encode(message.order, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatefulOrderEventV1_LongTermOrderPlacementV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.order = clob_1.IndexerOrder.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStatefulOrderEventV1_LongTermOrderPlacementV1();
        message.order = object.order !== undefined && object.order !== null ? clob_1.IndexerOrder.fromPartial(object.order) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseStatefulOrderEventV1_LongTermOrderPlacementV1();
        if (object.order !== undefined && object.order !== null) {
            message.order = clob_1.IndexerOrder.fromAmino(object.order);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order = message.order ? clob_1.IndexerOrder.toAmino(message.order) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StatefulOrderEventV1_LongTermOrderPlacementV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.StatefulOrderEventV1_LongTermOrderPlacementV1.decode(message.value);
    },
    toProto(message) {
        return exports.StatefulOrderEventV1_LongTermOrderPlacementV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.LongTermOrderPlacementV1",
            value: exports.StatefulOrderEventV1_LongTermOrderPlacementV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StatefulOrderEventV1_LongTermOrderPlacementV1.typeUrl, exports.StatefulOrderEventV1_LongTermOrderPlacementV1);
function createBaseAssetCreateEventV1() {
    return {
        id: 0,
        symbol: "",
        hasMarket: false,
        marketId: 0,
        atomicResolution: 0
    };
}
exports.AssetCreateEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.AssetCreateEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.AssetCreateEventV1.typeUrl || typeof o.id === "number" && typeof o.symbol === "string" && typeof o.hasMarket === "boolean" && typeof o.marketId === "number" && typeof o.atomicResolution === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.AssetCreateEventV1.typeUrl || typeof o.id === "number" && typeof o.symbol === "string" && typeof o.has_market === "boolean" && typeof o.market_id === "number" && typeof o.atomic_resolution === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.AssetCreateEventV1.typeUrl || typeof o.id === "number" && typeof o.symbol === "string" && typeof o.has_market === "boolean" && typeof o.market_id === "number" && typeof o.atomic_resolution === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.symbol !== "") {
            writer.uint32(18).string(message.symbol);
        }
        if (message.hasMarket === true) {
            writer.uint32(24).bool(message.hasMarket);
        }
        if (message.marketId !== 0) {
            writer.uint32(32).uint32(message.marketId);
        }
        if (message.atomicResolution !== 0) {
            writer.uint32(40).sint32(message.atomicResolution);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAssetCreateEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.symbol = reader.string();
                    break;
                case 3:
                    message.hasMarket = reader.bool();
                    break;
                case 4:
                    message.marketId = reader.uint32();
                    break;
                case 5:
                    message.atomicResolution = reader.sint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAssetCreateEventV1();
        message.id = object.id ?? 0;
        message.symbol = object.symbol ?? "";
        message.hasMarket = object.hasMarket ?? false;
        message.marketId = object.marketId ?? 0;
        message.atomicResolution = object.atomicResolution ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseAssetCreateEventV1();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.symbol !== undefined && object.symbol !== null) {
            message.symbol = object.symbol;
        }
        if (object.has_market !== undefined && object.has_market !== null) {
            message.hasMarket = object.has_market;
        }
        if (object.market_id !== undefined && object.market_id !== null) {
            message.marketId = object.market_id;
        }
        if (object.atomic_resolution !== undefined && object.atomic_resolution !== null) {
            message.atomicResolution = object.atomic_resolution;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.symbol = message.symbol === "" ? undefined : message.symbol;
        obj.has_market = message.hasMarket === false ? undefined : message.hasMarket;
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        obj.atomic_resolution = message.atomicResolution === 0 ? undefined : message.atomicResolution;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.AssetCreateEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.AssetCreateEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.AssetCreateEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.AssetCreateEventV1",
            value: exports.AssetCreateEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.AssetCreateEventV1.typeUrl, exports.AssetCreateEventV1);
function createBasePerpetualMarketCreateEventV1() {
    return {
        id: 0,
        clobPairId: 0,
        ticker: "",
        marketId: 0,
        status: 0,
        quantumConversionExponent: 0,
        atomicResolution: 0,
        subticksPerTick: 0,
        stepBaseQuantums: BigInt(0),
        liquidityTier: 0
    };
}
exports.PerpetualMarketCreateEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.PerpetualMarketCreateEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.PerpetualMarketCreateEventV1.typeUrl || typeof o.id === "number" && typeof o.clobPairId === "number" && typeof o.ticker === "string" && typeof o.marketId === "number" && (0, helpers_1.isSet)(o.status) && typeof o.quantumConversionExponent === "number" && typeof o.atomicResolution === "number" && typeof o.subticksPerTick === "number" && typeof o.stepBaseQuantums === "bigint" && typeof o.liquidityTier === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.PerpetualMarketCreateEventV1.typeUrl || typeof o.id === "number" && typeof o.clob_pair_id === "number" && typeof o.ticker === "string" && typeof o.market_id === "number" && (0, helpers_1.isSet)(o.status) && typeof o.quantum_conversion_exponent === "number" && typeof o.atomic_resolution === "number" && typeof o.subticks_per_tick === "number" && typeof o.step_base_quantums === "bigint" && typeof o.liquidity_tier === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.PerpetualMarketCreateEventV1.typeUrl || typeof o.id === "number" && typeof o.clob_pair_id === "number" && typeof o.ticker === "string" && typeof o.market_id === "number" && (0, helpers_1.isSet)(o.status) && typeof o.quantum_conversion_exponent === "number" && typeof o.atomic_resolution === "number" && typeof o.subticks_per_tick === "number" && typeof o.step_base_quantums === "bigint" && typeof o.liquidity_tier === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.clobPairId !== 0) {
            writer.uint32(16).uint32(message.clobPairId);
        }
        if (message.ticker !== "") {
            writer.uint32(26).string(message.ticker);
        }
        if (message.marketId !== 0) {
            writer.uint32(32).uint32(message.marketId);
        }
        if (message.status !== 0) {
            writer.uint32(40).int32(message.status);
        }
        if (message.quantumConversionExponent !== 0) {
            writer.uint32(48).sint32(message.quantumConversionExponent);
        }
        if (message.atomicResolution !== 0) {
            writer.uint32(56).sint32(message.atomicResolution);
        }
        if (message.subticksPerTick !== 0) {
            writer.uint32(64).uint32(message.subticksPerTick);
        }
        if (message.stepBaseQuantums !== BigInt(0)) {
            writer.uint32(72).uint64(message.stepBaseQuantums);
        }
        if (message.liquidityTier !== 0) {
            writer.uint32(80).uint32(message.liquidityTier);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePerpetualMarketCreateEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.clobPairId = reader.uint32();
                    break;
                case 3:
                    message.ticker = reader.string();
                    break;
                case 4:
                    message.marketId = reader.uint32();
                    break;
                case 5:
                    message.status = reader.int32();
                    break;
                case 6:
                    message.quantumConversionExponent = reader.sint32();
                    break;
                case 7:
                    message.atomicResolution = reader.sint32();
                    break;
                case 8:
                    message.subticksPerTick = reader.uint32();
                    break;
                case 9:
                    message.stepBaseQuantums = reader.uint64();
                    break;
                case 10:
                    message.liquidityTier = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePerpetualMarketCreateEventV1();
        message.id = object.id ?? 0;
        message.clobPairId = object.clobPairId ?? 0;
        message.ticker = object.ticker ?? "";
        message.marketId = object.marketId ?? 0;
        message.status = object.status ?? 0;
        message.quantumConversionExponent = object.quantumConversionExponent ?? 0;
        message.atomicResolution = object.atomicResolution ?? 0;
        message.subticksPerTick = object.subticksPerTick ?? 0;
        message.stepBaseQuantums = object.stepBaseQuantums !== undefined && object.stepBaseQuantums !== null ? BigInt(object.stepBaseQuantums.toString()) : BigInt(0);
        message.liquidityTier = object.liquidityTier ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBasePerpetualMarketCreateEventV1();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        if (object.ticker !== undefined && object.ticker !== null) {
            message.ticker = object.ticker;
        }
        if (object.market_id !== undefined && object.market_id !== null) {
            message.marketId = object.market_id;
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        if (object.quantum_conversion_exponent !== undefined && object.quantum_conversion_exponent !== null) {
            message.quantumConversionExponent = object.quantum_conversion_exponent;
        }
        if (object.atomic_resolution !== undefined && object.atomic_resolution !== null) {
            message.atomicResolution = object.atomic_resolution;
        }
        if (object.subticks_per_tick !== undefined && object.subticks_per_tick !== null) {
            message.subticksPerTick = object.subticks_per_tick;
        }
        if (object.step_base_quantums !== undefined && object.step_base_quantums !== null) {
            message.stepBaseQuantums = BigInt(object.step_base_quantums);
        }
        if (object.liquidity_tier !== undefined && object.liquidity_tier !== null) {
            message.liquidityTier = object.liquidity_tier;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        obj.ticker = message.ticker === "" ? undefined : message.ticker;
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        obj.status = message.status === 0 ? undefined : message.status;
        obj.quantum_conversion_exponent = message.quantumConversionExponent === 0 ? undefined : message.quantumConversionExponent;
        obj.atomic_resolution = message.atomicResolution === 0 ? undefined : message.atomicResolution;
        obj.subticks_per_tick = message.subticksPerTick === 0 ? undefined : message.subticksPerTick;
        obj.step_base_quantums = message.stepBaseQuantums !== BigInt(0) ? message.stepBaseQuantums?.toString() : undefined;
        obj.liquidity_tier = message.liquidityTier === 0 ? undefined : message.liquidityTier;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.PerpetualMarketCreateEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.PerpetualMarketCreateEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.PerpetualMarketCreateEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.PerpetualMarketCreateEventV1",
            value: exports.PerpetualMarketCreateEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.PerpetualMarketCreateEventV1.typeUrl, exports.PerpetualMarketCreateEventV1);
function createBasePerpetualMarketCreateEventV2() {
    return {
        id: 0,
        clobPairId: 0,
        ticker: "",
        marketId: 0,
        status: 0,
        quantumConversionExponent: 0,
        atomicResolution: 0,
        subticksPerTick: 0,
        stepBaseQuantums: BigInt(0),
        liquidityTier: 0,
        marketType: 0,
        dangerIndexPpm: 0,
        isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock: ""
    };
}
exports.PerpetualMarketCreateEventV2 = {
    typeUrl: "/klyraprotocol.indexer.events.PerpetualMarketCreateEventV2",
    is(o) {
        return o && (o.$typeUrl === exports.PerpetualMarketCreateEventV2.typeUrl || typeof o.id === "number" && typeof o.clobPairId === "number" && typeof o.ticker === "string" && typeof o.marketId === "number" && (0, helpers_1.isSet)(o.status) && typeof o.quantumConversionExponent === "number" && typeof o.atomicResolution === "number" && typeof o.subticksPerTick === "number" && typeof o.stepBaseQuantums === "bigint" && typeof o.liquidityTier === "number" && (0, helpers_1.isSet)(o.marketType) && typeof o.dangerIndexPpm === "number" && typeof o.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.PerpetualMarketCreateEventV2.typeUrl || typeof o.id === "number" && typeof o.clob_pair_id === "number" && typeof o.ticker === "string" && typeof o.market_id === "number" && (0, helpers_1.isSet)(o.status) && typeof o.quantum_conversion_exponent === "number" && typeof o.atomic_resolution === "number" && typeof o.subticks_per_tick === "number" && typeof o.step_base_quantums === "bigint" && typeof o.liquidity_tier === "number" && (0, helpers_1.isSet)(o.market_type) && typeof o.danger_index_ppm === "number" && typeof o.isolated_market_max_cumulative_insurance_fund_delta_per_block === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.PerpetualMarketCreateEventV2.typeUrl || typeof o.id === "number" && typeof o.clob_pair_id === "number" && typeof o.ticker === "string" && typeof o.market_id === "number" && (0, helpers_1.isSet)(o.status) && typeof o.quantum_conversion_exponent === "number" && typeof o.atomic_resolution === "number" && typeof o.subticks_per_tick === "number" && typeof o.step_base_quantums === "bigint" && typeof o.liquidity_tier === "number" && (0, helpers_1.isSet)(o.market_type) && typeof o.danger_index_ppm === "number" && typeof o.isolated_market_max_cumulative_insurance_fund_delta_per_block === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.clobPairId !== 0) {
            writer.uint32(16).uint32(message.clobPairId);
        }
        if (message.ticker !== "") {
            writer.uint32(26).string(message.ticker);
        }
        if (message.marketId !== 0) {
            writer.uint32(32).uint32(message.marketId);
        }
        if (message.status !== 0) {
            writer.uint32(40).int32(message.status);
        }
        if (message.quantumConversionExponent !== 0) {
            writer.uint32(48).sint32(message.quantumConversionExponent);
        }
        if (message.atomicResolution !== 0) {
            writer.uint32(56).sint32(message.atomicResolution);
        }
        if (message.subticksPerTick !== 0) {
            writer.uint32(64).uint32(message.subticksPerTick);
        }
        if (message.stepBaseQuantums !== BigInt(0)) {
            writer.uint32(72).uint64(message.stepBaseQuantums);
        }
        if (message.liquidityTier !== 0) {
            writer.uint32(80).uint32(message.liquidityTier);
        }
        if (message.marketType !== 0) {
            writer.uint32(88).int32(message.marketType);
        }
        if (message.dangerIndexPpm !== 0) {
            writer.uint32(96).uint32(message.dangerIndexPpm);
        }
        if (message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock !== "") {
            writer.uint32(106).string(message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePerpetualMarketCreateEventV2();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.clobPairId = reader.uint32();
                    break;
                case 3:
                    message.ticker = reader.string();
                    break;
                case 4:
                    message.marketId = reader.uint32();
                    break;
                case 5:
                    message.status = reader.int32();
                    break;
                case 6:
                    message.quantumConversionExponent = reader.sint32();
                    break;
                case 7:
                    message.atomicResolution = reader.sint32();
                    break;
                case 8:
                    message.subticksPerTick = reader.uint32();
                    break;
                case 9:
                    message.stepBaseQuantums = reader.uint64();
                    break;
                case 10:
                    message.liquidityTier = reader.uint32();
                    break;
                case 11:
                    message.marketType = reader.int32();
                    break;
                case 12:
                    message.dangerIndexPpm = reader.uint32();
                    break;
                case 13:
                    message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePerpetualMarketCreateEventV2();
        message.id = object.id ?? 0;
        message.clobPairId = object.clobPairId ?? 0;
        message.ticker = object.ticker ?? "";
        message.marketId = object.marketId ?? 0;
        message.status = object.status ?? 0;
        message.quantumConversionExponent = object.quantumConversionExponent ?? 0;
        message.atomicResolution = object.atomicResolution ?? 0;
        message.subticksPerTick = object.subticksPerTick ?? 0;
        message.stepBaseQuantums = object.stepBaseQuantums !== undefined && object.stepBaseQuantums !== null ? BigInt(object.stepBaseQuantums.toString()) : BigInt(0);
        message.liquidityTier = object.liquidityTier ?? 0;
        message.marketType = object.marketType ?? 0;
        message.dangerIndexPpm = object.dangerIndexPpm ?? 0;
        message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock = object.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBasePerpetualMarketCreateEventV2();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        if (object.ticker !== undefined && object.ticker !== null) {
            message.ticker = object.ticker;
        }
        if (object.market_id !== undefined && object.market_id !== null) {
            message.marketId = object.market_id;
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        if (object.quantum_conversion_exponent !== undefined && object.quantum_conversion_exponent !== null) {
            message.quantumConversionExponent = object.quantum_conversion_exponent;
        }
        if (object.atomic_resolution !== undefined && object.atomic_resolution !== null) {
            message.atomicResolution = object.atomic_resolution;
        }
        if (object.subticks_per_tick !== undefined && object.subticks_per_tick !== null) {
            message.subticksPerTick = object.subticks_per_tick;
        }
        if (object.step_base_quantums !== undefined && object.step_base_quantums !== null) {
            message.stepBaseQuantums = BigInt(object.step_base_quantums);
        }
        if (object.liquidity_tier !== undefined && object.liquidity_tier !== null) {
            message.liquidityTier = object.liquidity_tier;
        }
        if (object.market_type !== undefined && object.market_type !== null) {
            message.marketType = object.market_type;
        }
        if (object.danger_index_ppm !== undefined && object.danger_index_ppm !== null) {
            message.dangerIndexPpm = object.danger_index_ppm;
        }
        if (object.isolated_market_max_cumulative_insurance_fund_delta_per_block !== undefined && object.isolated_market_max_cumulative_insurance_fund_delta_per_block !== null) {
            message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock = object.isolated_market_max_cumulative_insurance_fund_delta_per_block;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        obj.ticker = message.ticker === "" ? undefined : message.ticker;
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        obj.status = message.status === 0 ? undefined : message.status;
        obj.quantum_conversion_exponent = message.quantumConversionExponent === 0 ? undefined : message.quantumConversionExponent;
        obj.atomic_resolution = message.atomicResolution === 0 ? undefined : message.atomicResolution;
        obj.subticks_per_tick = message.subticksPerTick === 0 ? undefined : message.subticksPerTick;
        obj.step_base_quantums = message.stepBaseQuantums !== BigInt(0) ? message.stepBaseQuantums?.toString() : undefined;
        obj.liquidity_tier = message.liquidityTier === 0 ? undefined : message.liquidityTier;
        obj.market_type = message.marketType === 0 ? undefined : message.marketType;
        obj.danger_index_ppm = message.dangerIndexPpm === 0 ? undefined : message.dangerIndexPpm;
        obj.isolated_market_max_cumulative_insurance_fund_delta_per_block = message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock === "" ? undefined : message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.PerpetualMarketCreateEventV2.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.PerpetualMarketCreateEventV2.decode(message.value);
    },
    toProto(message) {
        return exports.PerpetualMarketCreateEventV2.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.PerpetualMarketCreateEventV2",
            value: exports.PerpetualMarketCreateEventV2.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.PerpetualMarketCreateEventV2.typeUrl, exports.PerpetualMarketCreateEventV2);
function createBaseLiquidityTierUpsertEventV1() {
    return {
        id: 0,
        name: "",
        initialMarginPpm: 0,
        maintenanceFractionPpm: 0,
        basePositionNotional: BigInt(0)
    };
}
exports.LiquidityTierUpsertEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.LiquidityTierUpsertEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.LiquidityTierUpsertEventV1.typeUrl || typeof o.id === "number" && typeof o.name === "string" && typeof o.initialMarginPpm === "number" && typeof o.maintenanceFractionPpm === "number" && typeof o.basePositionNotional === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.LiquidityTierUpsertEventV1.typeUrl || typeof o.id === "number" && typeof o.name === "string" && typeof o.initial_margin_ppm === "number" && typeof o.maintenance_fraction_ppm === "number" && typeof o.base_position_notional === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.LiquidityTierUpsertEventV1.typeUrl || typeof o.id === "number" && typeof o.name === "string" && typeof o.initial_margin_ppm === "number" && typeof o.maintenance_fraction_ppm === "number" && typeof o.base_position_notional === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.initialMarginPpm !== 0) {
            writer.uint32(24).uint32(message.initialMarginPpm);
        }
        if (message.maintenanceFractionPpm !== 0) {
            writer.uint32(32).uint32(message.maintenanceFractionPpm);
        }
        if (message.basePositionNotional !== BigInt(0)) {
            writer.uint32(40).uint64(message.basePositionNotional);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLiquidityTierUpsertEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.initialMarginPpm = reader.uint32();
                    break;
                case 4:
                    message.maintenanceFractionPpm = reader.uint32();
                    break;
                case 5:
                    message.basePositionNotional = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseLiquidityTierUpsertEventV1();
        message.id = object.id ?? 0;
        message.name = object.name ?? "";
        message.initialMarginPpm = object.initialMarginPpm ?? 0;
        message.maintenanceFractionPpm = object.maintenanceFractionPpm ?? 0;
        message.basePositionNotional = object.basePositionNotional !== undefined && object.basePositionNotional !== null ? BigInt(object.basePositionNotional.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseLiquidityTierUpsertEventV1();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        if (object.initial_margin_ppm !== undefined && object.initial_margin_ppm !== null) {
            message.initialMarginPpm = object.initial_margin_ppm;
        }
        if (object.maintenance_fraction_ppm !== undefined && object.maintenance_fraction_ppm !== null) {
            message.maintenanceFractionPpm = object.maintenance_fraction_ppm;
        }
        if (object.base_position_notional !== undefined && object.base_position_notional !== null) {
            message.basePositionNotional = BigInt(object.base_position_notional);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.name = message.name === "" ? undefined : message.name;
        obj.initial_margin_ppm = message.initialMarginPpm === 0 ? undefined : message.initialMarginPpm;
        obj.maintenance_fraction_ppm = message.maintenanceFractionPpm === 0 ? undefined : message.maintenanceFractionPpm;
        obj.base_position_notional = message.basePositionNotional !== BigInt(0) ? message.basePositionNotional?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.LiquidityTierUpsertEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.LiquidityTierUpsertEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.LiquidityTierUpsertEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.LiquidityTierUpsertEventV1",
            value: exports.LiquidityTierUpsertEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.LiquidityTierUpsertEventV1.typeUrl, exports.LiquidityTierUpsertEventV1);
function createBaseOpenInterestUpdateEventV1() {
    return {
        openInterestUpdates: []
    };
}
exports.OpenInterestUpdateEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.OpenInterestUpdateEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.OpenInterestUpdateEventV1.typeUrl || Array.isArray(o.openInterestUpdates) && (!o.openInterestUpdates.length || exports.OpenInterestUpdate.is(o.openInterestUpdates[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.OpenInterestUpdateEventV1.typeUrl || Array.isArray(o.open_interest_updates) && (!o.open_interest_updates.length || exports.OpenInterestUpdate.isSDK(o.open_interest_updates[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.OpenInterestUpdateEventV1.typeUrl || Array.isArray(o.open_interest_updates) && (!o.open_interest_updates.length || exports.OpenInterestUpdate.isAmino(o.open_interest_updates[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.openInterestUpdates) {
            exports.OpenInterestUpdate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOpenInterestUpdateEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.openInterestUpdates.push(exports.OpenInterestUpdate.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOpenInterestUpdateEventV1();
        message.openInterestUpdates = object.openInterestUpdates?.map(e => exports.OpenInterestUpdate.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseOpenInterestUpdateEventV1();
        message.openInterestUpdates = object.open_interest_updates?.map(e => exports.OpenInterestUpdate.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.openInterestUpdates) {
            obj.open_interest_updates = message.openInterestUpdates.map(e => e ? exports.OpenInterestUpdate.toAmino(e) : undefined);
        }
        else {
            obj.open_interest_updates = message.openInterestUpdates;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.OpenInterestUpdateEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.OpenInterestUpdateEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.OpenInterestUpdateEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.OpenInterestUpdateEventV1",
            value: exports.OpenInterestUpdateEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.OpenInterestUpdateEventV1.typeUrl, exports.OpenInterestUpdateEventV1);
function createBaseOpenInterestUpdate() {
    return {
        perpetualId: 0,
        openInterest: new Uint8Array()
    };
}
exports.OpenInterestUpdate = {
    typeUrl: "/klyraprotocol.indexer.events.OpenInterestUpdate",
    is(o) {
        return o && (o.$typeUrl === exports.OpenInterestUpdate.typeUrl || typeof o.perpetualId === "number" && (o.openInterest instanceof Uint8Array || typeof o.openInterest === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.OpenInterestUpdate.typeUrl || typeof o.perpetual_id === "number" && (o.open_interest instanceof Uint8Array || typeof o.open_interest === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.OpenInterestUpdate.typeUrl || typeof o.perpetual_id === "number" && (o.open_interest instanceof Uint8Array || typeof o.open_interest === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.perpetualId !== 0) {
            writer.uint32(8).uint32(message.perpetualId);
        }
        if (message.openInterest.length !== 0) {
            writer.uint32(18).bytes(message.openInterest);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOpenInterestUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetualId = reader.uint32();
                    break;
                case 2:
                    message.openInterest = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOpenInterestUpdate();
        message.perpetualId = object.perpetualId ?? 0;
        message.openInterest = object.openInterest ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseOpenInterestUpdate();
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        if (object.open_interest !== undefined && object.open_interest !== null) {
            message.openInterest = (0, helpers_1.bytesFromBase64)(object.open_interest);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        obj.open_interest = message.openInterest ? (0, helpers_1.base64FromBytes)(message.openInterest) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.OpenInterestUpdate.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.OpenInterestUpdate.decode(message.value);
    },
    toProto(message) {
        return exports.OpenInterestUpdate.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.OpenInterestUpdate",
            value: exports.OpenInterestUpdate.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.OpenInterestUpdate.typeUrl, exports.OpenInterestUpdate);
function createBaseLiquidityTierUpsertEventV2() {
    return {
        id: 0,
        name: "",
        initialMarginPpm: 0,
        maintenanceFractionPpm: 0,
        basePositionNotional: BigInt(0),
        openInterestLowerCap: BigInt(0),
        openInterestUpperCap: BigInt(0)
    };
}
exports.LiquidityTierUpsertEventV2 = {
    typeUrl: "/klyraprotocol.indexer.events.LiquidityTierUpsertEventV2",
    is(o) {
        return o && (o.$typeUrl === exports.LiquidityTierUpsertEventV2.typeUrl || typeof o.id === "number" && typeof o.name === "string" && typeof o.initialMarginPpm === "number" && typeof o.maintenanceFractionPpm === "number" && typeof o.basePositionNotional === "bigint" && typeof o.openInterestLowerCap === "bigint" && typeof o.openInterestUpperCap === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.LiquidityTierUpsertEventV2.typeUrl || typeof o.id === "number" && typeof o.name === "string" && typeof o.initial_margin_ppm === "number" && typeof o.maintenance_fraction_ppm === "number" && typeof o.base_position_notional === "bigint" && typeof o.open_interest_lower_cap === "bigint" && typeof o.open_interest_upper_cap === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.LiquidityTierUpsertEventV2.typeUrl || typeof o.id === "number" && typeof o.name === "string" && typeof o.initial_margin_ppm === "number" && typeof o.maintenance_fraction_ppm === "number" && typeof o.base_position_notional === "bigint" && typeof o.open_interest_lower_cap === "bigint" && typeof o.open_interest_upper_cap === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.initialMarginPpm !== 0) {
            writer.uint32(24).uint32(message.initialMarginPpm);
        }
        if (message.maintenanceFractionPpm !== 0) {
            writer.uint32(32).uint32(message.maintenanceFractionPpm);
        }
        if (message.basePositionNotional !== BigInt(0)) {
            writer.uint32(40).uint64(message.basePositionNotional);
        }
        if (message.openInterestLowerCap !== BigInt(0)) {
            writer.uint32(48).uint64(message.openInterestLowerCap);
        }
        if (message.openInterestUpperCap !== BigInt(0)) {
            writer.uint32(56).uint64(message.openInterestUpperCap);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLiquidityTierUpsertEventV2();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.initialMarginPpm = reader.uint32();
                    break;
                case 4:
                    message.maintenanceFractionPpm = reader.uint32();
                    break;
                case 5:
                    message.basePositionNotional = reader.uint64();
                    break;
                case 6:
                    message.openInterestLowerCap = reader.uint64();
                    break;
                case 7:
                    message.openInterestUpperCap = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseLiquidityTierUpsertEventV2();
        message.id = object.id ?? 0;
        message.name = object.name ?? "";
        message.initialMarginPpm = object.initialMarginPpm ?? 0;
        message.maintenanceFractionPpm = object.maintenanceFractionPpm ?? 0;
        message.basePositionNotional = object.basePositionNotional !== undefined && object.basePositionNotional !== null ? BigInt(object.basePositionNotional.toString()) : BigInt(0);
        message.openInterestLowerCap = object.openInterestLowerCap !== undefined && object.openInterestLowerCap !== null ? BigInt(object.openInterestLowerCap.toString()) : BigInt(0);
        message.openInterestUpperCap = object.openInterestUpperCap !== undefined && object.openInterestUpperCap !== null ? BigInt(object.openInterestUpperCap.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseLiquidityTierUpsertEventV2();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        if (object.initial_margin_ppm !== undefined && object.initial_margin_ppm !== null) {
            message.initialMarginPpm = object.initial_margin_ppm;
        }
        if (object.maintenance_fraction_ppm !== undefined && object.maintenance_fraction_ppm !== null) {
            message.maintenanceFractionPpm = object.maintenance_fraction_ppm;
        }
        if (object.base_position_notional !== undefined && object.base_position_notional !== null) {
            message.basePositionNotional = BigInt(object.base_position_notional);
        }
        if (object.open_interest_lower_cap !== undefined && object.open_interest_lower_cap !== null) {
            message.openInterestLowerCap = BigInt(object.open_interest_lower_cap);
        }
        if (object.open_interest_upper_cap !== undefined && object.open_interest_upper_cap !== null) {
            message.openInterestUpperCap = BigInt(object.open_interest_upper_cap);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.name = message.name === "" ? undefined : message.name;
        obj.initial_margin_ppm = message.initialMarginPpm === 0 ? undefined : message.initialMarginPpm;
        obj.maintenance_fraction_ppm = message.maintenanceFractionPpm === 0 ? undefined : message.maintenanceFractionPpm;
        obj.base_position_notional = message.basePositionNotional !== BigInt(0) ? message.basePositionNotional?.toString() : undefined;
        obj.open_interest_lower_cap = message.openInterestLowerCap !== BigInt(0) ? message.openInterestLowerCap?.toString() : undefined;
        obj.open_interest_upper_cap = message.openInterestUpperCap !== BigInt(0) ? message.openInterestUpperCap?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.LiquidityTierUpsertEventV2.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.LiquidityTierUpsertEventV2.decode(message.value);
    },
    toProto(message) {
        return exports.LiquidityTierUpsertEventV2.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.LiquidityTierUpsertEventV2",
            value: exports.LiquidityTierUpsertEventV2.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.LiquidityTierUpsertEventV2.typeUrl, exports.LiquidityTierUpsertEventV2);
function createBaseUpdateClobPairEventV1() {
    return {
        clobPairId: 0,
        status: 0,
        quantumConversionExponent: 0,
        subticksPerTick: 0,
        stepBaseQuantums: BigInt(0)
    };
}
exports.UpdateClobPairEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.UpdateClobPairEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.UpdateClobPairEventV1.typeUrl || typeof o.clobPairId === "number" && (0, helpers_1.isSet)(o.status) && typeof o.quantumConversionExponent === "number" && typeof o.subticksPerTick === "number" && typeof o.stepBaseQuantums === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.UpdateClobPairEventV1.typeUrl || typeof o.clob_pair_id === "number" && (0, helpers_1.isSet)(o.status) && typeof o.quantum_conversion_exponent === "number" && typeof o.subticks_per_tick === "number" && typeof o.step_base_quantums === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.UpdateClobPairEventV1.typeUrl || typeof o.clob_pair_id === "number" && (0, helpers_1.isSet)(o.status) && typeof o.quantum_conversion_exponent === "number" && typeof o.subticks_per_tick === "number" && typeof o.step_base_quantums === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.clobPairId !== 0) {
            writer.uint32(8).uint32(message.clobPairId);
        }
        if (message.status !== 0) {
            writer.uint32(16).int32(message.status);
        }
        if (message.quantumConversionExponent !== 0) {
            writer.uint32(24).sint32(message.quantumConversionExponent);
        }
        if (message.subticksPerTick !== 0) {
            writer.uint32(32).uint32(message.subticksPerTick);
        }
        if (message.stepBaseQuantums !== BigInt(0)) {
            writer.uint32(40).uint64(message.stepBaseQuantums);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateClobPairEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clobPairId = reader.uint32();
                    break;
                case 2:
                    message.status = reader.int32();
                    break;
                case 3:
                    message.quantumConversionExponent = reader.sint32();
                    break;
                case 4:
                    message.subticksPerTick = reader.uint32();
                    break;
                case 5:
                    message.stepBaseQuantums = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseUpdateClobPairEventV1();
        message.clobPairId = object.clobPairId ?? 0;
        message.status = object.status ?? 0;
        message.quantumConversionExponent = object.quantumConversionExponent ?? 0;
        message.subticksPerTick = object.subticksPerTick ?? 0;
        message.stepBaseQuantums = object.stepBaseQuantums !== undefined && object.stepBaseQuantums !== null ? BigInt(object.stepBaseQuantums.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseUpdateClobPairEventV1();
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        if (object.quantum_conversion_exponent !== undefined && object.quantum_conversion_exponent !== null) {
            message.quantumConversionExponent = object.quantum_conversion_exponent;
        }
        if (object.subticks_per_tick !== undefined && object.subticks_per_tick !== null) {
            message.subticksPerTick = object.subticks_per_tick;
        }
        if (object.step_base_quantums !== undefined && object.step_base_quantums !== null) {
            message.stepBaseQuantums = BigInt(object.step_base_quantums);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        obj.status = message.status === 0 ? undefined : message.status;
        obj.quantum_conversion_exponent = message.quantumConversionExponent === 0 ? undefined : message.quantumConversionExponent;
        obj.subticks_per_tick = message.subticksPerTick === 0 ? undefined : message.subticksPerTick;
        obj.step_base_quantums = message.stepBaseQuantums !== BigInt(0) ? message.stepBaseQuantums?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.UpdateClobPairEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.UpdateClobPairEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.UpdateClobPairEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.UpdateClobPairEventV1",
            value: exports.UpdateClobPairEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.UpdateClobPairEventV1.typeUrl, exports.UpdateClobPairEventV1);
function createBaseUpdatePerpetualEventV1() {
    return {
        id: 0,
        ticker: "",
        marketId: 0,
        atomicResolution: 0,
        liquidityTier: 0,
        dangerIndexPpm: 0,
        isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock: "",
        perpYieldIndex: ""
    };
}
exports.UpdatePerpetualEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.UpdatePerpetualEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.UpdatePerpetualEventV1.typeUrl || typeof o.id === "number" && typeof o.ticker === "string" && typeof o.marketId === "number" && typeof o.atomicResolution === "number" && typeof o.liquidityTier === "number" && typeof o.dangerIndexPpm === "number" && typeof o.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock === "string" && typeof o.perpYieldIndex === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.UpdatePerpetualEventV1.typeUrl || typeof o.id === "number" && typeof o.ticker === "string" && typeof o.market_id === "number" && typeof o.atomic_resolution === "number" && typeof o.liquidity_tier === "number" && typeof o.danger_index_ppm === "number" && typeof o.isolated_market_max_cumulative_insurance_fund_delta_per_block === "string" && typeof o.perp_yield_index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.UpdatePerpetualEventV1.typeUrl || typeof o.id === "number" && typeof o.ticker === "string" && typeof o.market_id === "number" && typeof o.atomic_resolution === "number" && typeof o.liquidity_tier === "number" && typeof o.danger_index_ppm === "number" && typeof o.isolated_market_max_cumulative_insurance_fund_delta_per_block === "string" && typeof o.perp_yield_index === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.ticker !== "") {
            writer.uint32(18).string(message.ticker);
        }
        if (message.marketId !== 0) {
            writer.uint32(24).uint32(message.marketId);
        }
        if (message.atomicResolution !== 0) {
            writer.uint32(32).sint32(message.atomicResolution);
        }
        if (message.liquidityTier !== 0) {
            writer.uint32(40).uint32(message.liquidityTier);
        }
        if (message.dangerIndexPpm !== 0) {
            writer.uint32(48).uint32(message.dangerIndexPpm);
        }
        if (message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock !== "") {
            writer.uint32(58).string(message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock);
        }
        if (message.perpYieldIndex !== "") {
            writer.uint32(66).string(message.perpYieldIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdatePerpetualEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.ticker = reader.string();
                    break;
                case 3:
                    message.marketId = reader.uint32();
                    break;
                case 4:
                    message.atomicResolution = reader.sint32();
                    break;
                case 5:
                    message.liquidityTier = reader.uint32();
                    break;
                case 6:
                    message.dangerIndexPpm = reader.uint32();
                    break;
                case 7:
                    message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock = reader.string();
                    break;
                case 8:
                    message.perpYieldIndex = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseUpdatePerpetualEventV1();
        message.id = object.id ?? 0;
        message.ticker = object.ticker ?? "";
        message.marketId = object.marketId ?? 0;
        message.atomicResolution = object.atomicResolution ?? 0;
        message.liquidityTier = object.liquidityTier ?? 0;
        message.dangerIndexPpm = object.dangerIndexPpm ?? 0;
        message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock = object.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock ?? "";
        message.perpYieldIndex = object.perpYieldIndex ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseUpdatePerpetualEventV1();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.ticker !== undefined && object.ticker !== null) {
            message.ticker = object.ticker;
        }
        if (object.market_id !== undefined && object.market_id !== null) {
            message.marketId = object.market_id;
        }
        if (object.atomic_resolution !== undefined && object.atomic_resolution !== null) {
            message.atomicResolution = object.atomic_resolution;
        }
        if (object.liquidity_tier !== undefined && object.liquidity_tier !== null) {
            message.liquidityTier = object.liquidity_tier;
        }
        if (object.danger_index_ppm !== undefined && object.danger_index_ppm !== null) {
            message.dangerIndexPpm = object.danger_index_ppm;
        }
        if (object.isolated_market_max_cumulative_insurance_fund_delta_per_block !== undefined && object.isolated_market_max_cumulative_insurance_fund_delta_per_block !== null) {
            message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock = object.isolated_market_max_cumulative_insurance_fund_delta_per_block;
        }
        if (object.perp_yield_index !== undefined && object.perp_yield_index !== null) {
            message.perpYieldIndex = object.perp_yield_index;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.ticker = message.ticker === "" ? undefined : message.ticker;
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        obj.atomic_resolution = message.atomicResolution === 0 ? undefined : message.atomicResolution;
        obj.liquidity_tier = message.liquidityTier === 0 ? undefined : message.liquidityTier;
        obj.danger_index_ppm = message.dangerIndexPpm === 0 ? undefined : message.dangerIndexPpm;
        obj.isolated_market_max_cumulative_insurance_fund_delta_per_block = message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock === "" ? undefined : message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock;
        obj.perp_yield_index = message.perpYieldIndex === "" ? undefined : message.perpYieldIndex;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.UpdatePerpetualEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.UpdatePerpetualEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.UpdatePerpetualEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.UpdatePerpetualEventV1",
            value: exports.UpdatePerpetualEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.UpdatePerpetualEventV1.typeUrl, exports.UpdatePerpetualEventV1);
function createBaseUpdateYieldParamsEventV1() {
    return {
        sdaiPrice: "",
        assetYieldIndex: ""
    };
}
exports.UpdateYieldParamsEventV1 = {
    typeUrl: "/klyraprotocol.indexer.events.UpdateYieldParamsEventV1",
    is(o) {
        return o && (o.$typeUrl === exports.UpdateYieldParamsEventV1.typeUrl || typeof o.sdaiPrice === "string" && typeof o.assetYieldIndex === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.UpdateYieldParamsEventV1.typeUrl || typeof o.sdai_price === "string" && typeof o.asset_yield_index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.UpdateYieldParamsEventV1.typeUrl || typeof o.sdai_price === "string" && typeof o.asset_yield_index === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.sdaiPrice !== "") {
            writer.uint32(10).string(message.sdaiPrice);
        }
        if (message.assetYieldIndex !== "") {
            writer.uint32(18).string(message.assetYieldIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpdateYieldParamsEventV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sdaiPrice = reader.string();
                    break;
                case 2:
                    message.assetYieldIndex = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseUpdateYieldParamsEventV1();
        message.sdaiPrice = object.sdaiPrice ?? "";
        message.assetYieldIndex = object.assetYieldIndex ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseUpdateYieldParamsEventV1();
        if (object.sdai_price !== undefined && object.sdai_price !== null) {
            message.sdaiPrice = object.sdai_price;
        }
        if (object.asset_yield_index !== undefined && object.asset_yield_index !== null) {
            message.assetYieldIndex = object.asset_yield_index;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.sdai_price = message.sdaiPrice === "" ? undefined : message.sdaiPrice;
        obj.asset_yield_index = message.assetYieldIndex === "" ? undefined : message.assetYieldIndex;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.UpdateYieldParamsEventV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.UpdateYieldParamsEventV1.decode(message.value);
    },
    toProto(message) {
        return exports.UpdateYieldParamsEventV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.events.UpdateYieldParamsEventV1",
            value: exports.UpdateYieldParamsEventV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.UpdateYieldParamsEventV1.typeUrl, exports.UpdateYieldParamsEventV1);
