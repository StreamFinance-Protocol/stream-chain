"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryUserFeeTierResponse = exports.QueryUserFeeTierRequest = exports.QueryPerpetualFeeParamsResponse = exports.QueryPerpetualFeeParamsRequest = void 0;
//@ts-nocheck
const params_1 = require("./params");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseQueryPerpetualFeeParamsRequest() {
    return {};
}
exports.QueryPerpetualFeeParamsRequest = {
    typeUrl: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryPerpetualFeeParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryPerpetualFeeParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryPerpetualFeeParamsRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryPerpetualFeeParamsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryPerpetualFeeParamsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryPerpetualFeeParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsRequest",
            value: exports.QueryPerpetualFeeParamsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryPerpetualFeeParamsRequest.typeUrl, exports.QueryPerpetualFeeParamsRequest);
function createBaseQueryPerpetualFeeParamsResponse() {
    return {
        params: params_1.PerpetualFeeParams.fromPartial({})
    };
}
exports.QueryPerpetualFeeParamsResponse = {
    typeUrl: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryPerpetualFeeParamsResponse.typeUrl || params_1.PerpetualFeeParams.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryPerpetualFeeParamsResponse.typeUrl || params_1.PerpetualFeeParams.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryPerpetualFeeParamsResponse.typeUrl || params_1.PerpetualFeeParams.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.params !== undefined) {
            params_1.PerpetualFeeParams.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPerpetualFeeParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = params_1.PerpetualFeeParams.decode(reader, reader.uint32());
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
        message.params = object.params !== undefined && object.params !== null ? params_1.PerpetualFeeParams.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPerpetualFeeParamsResponse();
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.PerpetualFeeParams.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? params_1.PerpetualFeeParams.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryPerpetualFeeParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryPerpetualFeeParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryPerpetualFeeParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.QueryPerpetualFeeParamsResponse",
            value: exports.QueryPerpetualFeeParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryPerpetualFeeParamsResponse.typeUrl, exports.QueryPerpetualFeeParamsResponse);
function createBaseQueryUserFeeTierRequest() {
    return {
        user: ""
    };
}
exports.QueryUserFeeTierRequest = {
    typeUrl: "/klyraprotocol.feetiers.QueryUserFeeTierRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryUserFeeTierRequest.typeUrl || typeof o.user === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryUserFeeTierRequest.typeUrl || typeof o.user === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryUserFeeTierRequest.typeUrl || typeof o.user === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.user !== "") {
            writer.uint32(10).string(message.user);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryUserFeeTierRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryUserFeeTierRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryUserFeeTierRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.QueryUserFeeTierRequest",
            value: exports.QueryUserFeeTierRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryUserFeeTierRequest.typeUrl, exports.QueryUserFeeTierRequest);
function createBaseQueryUserFeeTierResponse() {
    return {
        index: 0,
        tier: undefined
    };
}
exports.QueryUserFeeTierResponse = {
    typeUrl: "/klyraprotocol.feetiers.QueryUserFeeTierResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryUserFeeTierResponse.typeUrl || typeof o.index === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryUserFeeTierResponse.typeUrl || typeof o.index === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryUserFeeTierResponse.typeUrl || typeof o.index === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.index !== 0) {
            writer.uint32(8).uint32(message.index);
        }
        if (message.tier !== undefined) {
            params_1.PerpetualFeeTier.encode(message.tier, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUserFeeTierResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.uint32();
                    break;
                case 2:
                    message.tier = params_1.PerpetualFeeTier.decode(reader, reader.uint32());
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
        message.tier = object.tier !== undefined && object.tier !== null ? params_1.PerpetualFeeTier.fromPartial(object.tier) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryUserFeeTierResponse();
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        if (object.tier !== undefined && object.tier !== null) {
            message.tier = params_1.PerpetualFeeTier.fromAmino(object.tier);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.index = message.index === 0 ? undefined : message.index;
        obj.tier = message.tier ? params_1.PerpetualFeeTier.toAmino(message.tier) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryUserFeeTierResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryUserFeeTierResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryUserFeeTierResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.QueryUserFeeTierResponse",
            value: exports.QueryUserFeeTierResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryUserFeeTierResponse.typeUrl, exports.QueryUserFeeTierResponse);
