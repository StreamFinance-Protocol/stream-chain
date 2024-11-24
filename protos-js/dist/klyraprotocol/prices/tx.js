"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgUpdateMarketParamResponse = exports.MsgUpdateMarketParam = exports.MsgCreateOracleMarketResponse = exports.MsgCreateOracleMarket = void 0;
//@ts-nocheck
const market_param_1 = require("./market_param");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseMsgCreateOracleMarket() {
    return {
        authority: "",
        params: market_param_1.MarketParam.fromPartial({})
    };
}
exports.MsgCreateOracleMarket = {
    typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
    is(o) {
        return o && (o.$typeUrl === exports.MsgCreateOracleMarket.typeUrl || typeof o.authority === "string" && market_param_1.MarketParam.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgCreateOracleMarket.typeUrl || typeof o.authority === "string" && market_param_1.MarketParam.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgCreateOracleMarket.typeUrl || typeof o.authority === "string" && market_param_1.MarketParam.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            market_param_1.MarketParam.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateOracleMarket();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.params = market_param_1.MarketParam.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgCreateOracleMarket();
        message.authority = object.authority ?? "";
        message.params = object.params !== undefined && object.params !== null ? market_param_1.MarketParam.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCreateOracleMarket();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = market_param_1.MarketParam.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? market_param_1.MarketParam.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgCreateOracleMarket.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgCreateOracleMarket.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCreateOracleMarket.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
            value: exports.MsgCreateOracleMarket.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCreateOracleMarket.typeUrl, exports.MsgCreateOracleMarket);
function createBaseMsgCreateOracleMarketResponse() {
    return {};
}
exports.MsgCreateOracleMarketResponse = {
    typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarketResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgCreateOracleMarketResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgCreateOracleMarketResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgCreateOracleMarketResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateOracleMarketResponse();
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
        const message = createBaseMsgCreateOracleMarketResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgCreateOracleMarketResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgCreateOracleMarketResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgCreateOracleMarketResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCreateOracleMarketResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarketResponse",
            value: exports.MsgCreateOracleMarketResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCreateOracleMarketResponse.typeUrl, exports.MsgCreateOracleMarketResponse);
function createBaseMsgUpdateMarketParam() {
    return {
        authority: "",
        marketParam: market_param_1.MarketParam.fromPartial({})
    };
}
exports.MsgUpdateMarketParam = {
    typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpdateMarketParam.typeUrl || typeof o.authority === "string" && market_param_1.MarketParam.is(o.marketParam));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpdateMarketParam.typeUrl || typeof o.authority === "string" && market_param_1.MarketParam.isSDK(o.market_param));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpdateMarketParam.typeUrl || typeof o.authority === "string" && market_param_1.MarketParam.isAmino(o.market_param));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.marketParam !== undefined) {
            market_param_1.MarketParam.encode(message.marketParam, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateMarketParam();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
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
        const message = createBaseMsgUpdateMarketParam();
        message.authority = object.authority ?? "";
        message.marketParam = object.marketParam !== undefined && object.marketParam !== null ? market_param_1.MarketParam.fromPartial(object.marketParam) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateMarketParam();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.market_param !== undefined && object.market_param !== null) {
            message.marketParam = market_param_1.MarketParam.fromAmino(object.market_param);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.market_param = message.marketParam ? market_param_1.MarketParam.toAmino(message.marketParam) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateMarketParam.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateMarketParam.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateMarketParam.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
            value: exports.MsgUpdateMarketParam.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateMarketParam.typeUrl, exports.MsgUpdateMarketParam);
function createBaseMsgUpdateMarketParamResponse() {
    return {};
}
exports.MsgUpdateMarketParamResponse = {
    typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParamResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpdateMarketParamResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpdateMarketParamResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpdateMarketParamResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateMarketParamResponse();
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
        const message = createBaseMsgUpdateMarketParamResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdateMarketParamResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateMarketParamResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateMarketParamResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateMarketParamResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParamResponse",
            value: exports.MsgUpdateMarketParamResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateMarketParamResponse.typeUrl, exports.MsgUpdateMarketParamResponse);
