"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
//@ts-nocheck
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseAsset() {
    return {
        id: 0,
        symbol: "",
        denom: "",
        denomExponent: 0,
        hasMarket: false,
        marketId: 0,
        atomicResolution: 0,
        assetYieldIndex: ""
    };
}
exports.Asset = {
    typeUrl: "/klyraprotocol.assets.Asset",
    is(o) {
        return o && (o.$typeUrl === exports.Asset.typeUrl || typeof o.id === "number" && typeof o.symbol === "string" && typeof o.denom === "string" && typeof o.denomExponent === "number" && typeof o.hasMarket === "boolean" && typeof o.marketId === "number" && typeof o.atomicResolution === "number" && typeof o.assetYieldIndex === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Asset.typeUrl || typeof o.id === "number" && typeof o.symbol === "string" && typeof o.denom === "string" && typeof o.denom_exponent === "number" && typeof o.has_market === "boolean" && typeof o.market_id === "number" && typeof o.atomic_resolution === "number" && typeof o.asset_yield_index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Asset.typeUrl || typeof o.id === "number" && typeof o.symbol === "string" && typeof o.denom === "string" && typeof o.denom_exponent === "number" && typeof o.has_market === "boolean" && typeof o.market_id === "number" && typeof o.atomic_resolution === "number" && typeof o.asset_yield_index === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.symbol !== "") {
            writer.uint32(18).string(message.symbol);
        }
        if (message.denom !== "") {
            writer.uint32(26).string(message.denom);
        }
        if (message.denomExponent !== 0) {
            writer.uint32(32).sint32(message.denomExponent);
        }
        if (message.hasMarket === true) {
            writer.uint32(40).bool(message.hasMarket);
        }
        if (message.marketId !== 0) {
            writer.uint32(48).uint32(message.marketId);
        }
        if (message.atomicResolution !== 0) {
            writer.uint32(56).sint32(message.atomicResolution);
        }
        if (message.assetYieldIndex !== "") {
            writer.uint32(66).string(message.assetYieldIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAsset();
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
                    message.denom = reader.string();
                    break;
                case 4:
                    message.denomExponent = reader.sint32();
                    break;
                case 5:
                    message.hasMarket = reader.bool();
                    break;
                case 6:
                    message.marketId = reader.uint32();
                    break;
                case 7:
                    message.atomicResolution = reader.sint32();
                    break;
                case 8:
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
        const message = createBaseAsset();
        message.id = object.id ?? 0;
        message.symbol = object.symbol ?? "";
        message.denom = object.denom ?? "";
        message.denomExponent = object.denomExponent ?? 0;
        message.hasMarket = object.hasMarket ?? false;
        message.marketId = object.marketId ?? 0;
        message.atomicResolution = object.atomicResolution ?? 0;
        message.assetYieldIndex = object.assetYieldIndex ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseAsset();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.symbol !== undefined && object.symbol !== null) {
            message.symbol = object.symbol;
        }
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = object.denom;
        }
        if (object.denom_exponent !== undefined && object.denom_exponent !== null) {
            message.denomExponent = object.denom_exponent;
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
        if (object.asset_yield_index !== undefined && object.asset_yield_index !== null) {
            message.assetYieldIndex = object.asset_yield_index;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.symbol = message.symbol === "" ? undefined : message.symbol;
        obj.denom = message.denom === "" ? undefined : message.denom;
        obj.denom_exponent = message.denomExponent === 0 ? undefined : message.denomExponent;
        obj.has_market = message.hasMarket === false ? undefined : message.hasMarket;
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        obj.atomic_resolution = message.atomicResolution === 0 ? undefined : message.atomicResolution;
        obj.asset_yield_index = message.assetYieldIndex === "" ? undefined : message.assetYieldIndex;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Asset.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Asset.decode(message.value);
    },
    toProto(message) {
        return exports.Asset.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.assets.Asset",
            value: exports.Asset.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Asset.typeUrl, exports.Asset);
