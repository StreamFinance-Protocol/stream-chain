//@ts-nocheck
import { PerpetualFeeParams, PerpetualFeeTier } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseQueryPerpetualFeeParamsRequest() {
    return {};
}
export const QueryPerpetualFeeParamsRequest = {
    typeUrl: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsRequest",
    is(o) {
        return o && o.$typeUrl === QueryPerpetualFeeParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryPerpetualFeeParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryPerpetualFeeParamsRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPerpetualFeeParamsRequest();
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
        const message = createBaseQueryPerpetualFeeParamsRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryPerpetualFeeParamsRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryPerpetualFeeParamsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryPerpetualFeeParamsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryPerpetualFeeParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsRequest",
            value: QueryPerpetualFeeParamsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPerpetualFeeParamsRequest.typeUrl, QueryPerpetualFeeParamsRequest);
function createBaseQueryPerpetualFeeParamsResponse() {
    return {
        params: PerpetualFeeParams.fromPartial({})
    };
}
export const QueryPerpetualFeeParamsResponse = {
    typeUrl: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryPerpetualFeeParamsResponse.typeUrl || PerpetualFeeParams.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryPerpetualFeeParamsResponse.typeUrl || PerpetualFeeParams.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryPerpetualFeeParamsResponse.typeUrl || PerpetualFeeParams.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.params !== undefined) {
            PerpetualFeeParams.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPerpetualFeeParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = PerpetualFeeParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryPerpetualFeeParamsResponse();
        message.params = object.params !== undefined && object.params !== null ? PerpetualFeeParams.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPerpetualFeeParamsResponse();
        if (object.params !== undefined && object.params !== null) {
            message.params = PerpetualFeeParams.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? PerpetualFeeParams.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryPerpetualFeeParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryPerpetualFeeParamsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryPerpetualFeeParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsResponse",
            value: QueryPerpetualFeeParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPerpetualFeeParamsResponse.typeUrl, QueryPerpetualFeeParamsResponse);
function createBaseQueryUserFeeTierRequest() {
    return {
        user: ""
    };
}
export const QueryUserFeeTierRequest = {
    typeUrl: "/klyraprotocol.feetiers.QueryUserFeeTierRequest",
    is(o) {
        return o && (o.$typeUrl === QueryUserFeeTierRequest.typeUrl || typeof o.user === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryUserFeeTierRequest.typeUrl || typeof o.user === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryUserFeeTierRequest.typeUrl || typeof o.user === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.user !== "") {
            writer.uint32(10).string(message.user);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUserFeeTierRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.user = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryUserFeeTierRequest();
        message.user = object.user ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryUserFeeTierRequest();
        if (object.user !== undefined && object.user !== null) {
            message.user = object.user;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.user = message.user === "" ? undefined : message.user;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryUserFeeTierRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryUserFeeTierRequest.decode(message.value);
    },
    toProto(message) {
        return QueryUserFeeTierRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.QueryUserFeeTierRequest",
            value: QueryUserFeeTierRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryUserFeeTierRequest.typeUrl, QueryUserFeeTierRequest);
function createBaseQueryUserFeeTierResponse() {
    return {
        index: 0,
        tier: undefined
    };
}
export const QueryUserFeeTierResponse = {
    typeUrl: "/klyraprotocol.feetiers.QueryUserFeeTierResponse",
    is(o) {
        return o && (o.$typeUrl === QueryUserFeeTierResponse.typeUrl || typeof o.index === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryUserFeeTierResponse.typeUrl || typeof o.index === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryUserFeeTierResponse.typeUrl || typeof o.index === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.index !== 0) {
            writer.uint32(8).uint32(message.index);
        }
        if (message.tier !== undefined) {
            PerpetualFeeTier.encode(message.tier, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUserFeeTierResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.uint32();
                    break;
                case 2:
                    message.tier = PerpetualFeeTier.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryUserFeeTierResponse();
        message.index = object.index ?? 0;
        message.tier = object.tier !== undefined && object.tier !== null ? PerpetualFeeTier.fromPartial(object.tier) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryUserFeeTierResponse();
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        if (object.tier !== undefined && object.tier !== null) {
            message.tier = PerpetualFeeTier.fromAmino(object.tier);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.index = message.index === 0 ? undefined : message.index;
        obj.tier = message.tier ? PerpetualFeeTier.toAmino(message.tier) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryUserFeeTierResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryUserFeeTierResponse.decode(message.value);
    },
    toProto(message) {
        return QueryUserFeeTierResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.QueryUserFeeTierResponse",
            value: QueryUserFeeTierResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryUserFeeTierResponse.typeUrl, QueryUserFeeTierResponse);
