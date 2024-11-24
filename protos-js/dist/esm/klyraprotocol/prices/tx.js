//@ts-nocheck
import { MarketParam } from "./market_param";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseMsgCreateOracleMarket() {
    return {
        authority: "",
        params: MarketParam.fromPartial({})
    };
}
export const MsgCreateOracleMarket = {
    typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
    is(o) {
        return o && (o.$typeUrl === MsgCreateOracleMarket.typeUrl || typeof o.authority === "string" && MarketParam.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgCreateOracleMarket.typeUrl || typeof o.authority === "string" && MarketParam.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgCreateOracleMarket.typeUrl || typeof o.authority === "string" && MarketParam.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            MarketParam.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateOracleMarket();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.params = MarketParam.decode(reader, reader.uint32());
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
        message.params = object.params !== undefined && object.params !== null ? MarketParam.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCreateOracleMarket();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = MarketParam.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? MarketParam.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCreateOracleMarket.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgCreateOracleMarket.decode(message.value);
    },
    toProto(message) {
        return MsgCreateOracleMarket.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
            value: MsgCreateOracleMarket.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCreateOracleMarket.typeUrl, MsgCreateOracleMarket);
function createBaseMsgCreateOracleMarketResponse() {
    return {};
}
export const MsgCreateOracleMarketResponse = {
    typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarketResponse",
    is(o) {
        return o && o.$typeUrl === MsgCreateOracleMarketResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgCreateOracleMarketResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgCreateOracleMarketResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgCreateOracleMarketResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgCreateOracleMarketResponse.decode(message.value);
    },
    toProto(message) {
        return MsgCreateOracleMarketResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarketResponse",
            value: MsgCreateOracleMarketResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCreateOracleMarketResponse.typeUrl, MsgCreateOracleMarketResponse);
function createBaseMsgUpdateMarketParam() {
    return {
        authority: "",
        marketParam: MarketParam.fromPartial({})
    };
}
export const MsgUpdateMarketParam = {
    typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
    is(o) {
        return o && (o.$typeUrl === MsgUpdateMarketParam.typeUrl || typeof o.authority === "string" && MarketParam.is(o.marketParam));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUpdateMarketParam.typeUrl || typeof o.authority === "string" && MarketParam.isSDK(o.market_param));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUpdateMarketParam.typeUrl || typeof o.authority === "string" && MarketParam.isAmino(o.market_param));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.marketParam !== undefined) {
            MarketParam.encode(message.marketParam, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateMarketParam();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
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
        const message = createBaseMsgUpdateMarketParam();
        message.authority = object.authority ?? "";
        message.marketParam = object.marketParam !== undefined && object.marketParam !== null ? MarketParam.fromPartial(object.marketParam) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateMarketParam();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.market_param !== undefined && object.market_param !== null) {
            message.marketParam = MarketParam.fromAmino(object.market_param);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.market_param = message.marketParam ? MarketParam.toAmino(message.marketParam) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateMarketParam.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateMarketParam.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateMarketParam.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
            value: MsgUpdateMarketParam.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateMarketParam.typeUrl, MsgUpdateMarketParam);
function createBaseMsgUpdateMarketParamResponse() {
    return {};
}
export const MsgUpdateMarketParamResponse = {
    typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParamResponse",
    is(o) {
        return o && o.$typeUrl === MsgUpdateMarketParamResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgUpdateMarketParamResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgUpdateMarketParamResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgUpdateMarketParamResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateMarketParamResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateMarketParamResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParamResponse",
            value: MsgUpdateMarketParamResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateMarketParamResponse.typeUrl, MsgUpdateMarketParamResponse);
