"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSetLimitParamsResponse = exports.MsgSetLimitParams = void 0;
//@ts-nocheck
const limit_params_1 = require("./limit_params");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseMsgSetLimitParams() {
    return {
        authority: "",
        limitParams: limit_params_1.LimitParams.fromPartial({})
    };
}
exports.MsgSetLimitParams = {
    typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams",
    is(o) {
        return o && (o.$typeUrl === exports.MsgSetLimitParams.typeUrl || typeof o.authority === "string" && limit_params_1.LimitParams.is(o.limitParams));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgSetLimitParams.typeUrl || typeof o.authority === "string" && limit_params_1.LimitParams.isSDK(o.limit_params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgSetLimitParams.typeUrl || typeof o.authority === "string" && limit_params_1.LimitParams.isAmino(o.limit_params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.limitParams !== undefined) {
            limit_params_1.LimitParams.encode(message.limitParams, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetLimitParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.limitParams = limit_params_1.LimitParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgSetLimitParams();
        message.authority = object.authority ?? "";
        message.limitParams = object.limitParams !== undefined && object.limitParams !== null ? limit_params_1.LimitParams.fromPartial(object.limitParams) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSetLimitParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.limit_params !== undefined && object.limit_params !== null) {
            message.limitParams = limit_params_1.LimitParams.fromAmino(object.limit_params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.limit_params = message.limitParams ? limit_params_1.LimitParams.toAmino(message.limitParams) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSetLimitParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgSetLimitParams.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSetLimitParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams",
            value: exports.MsgSetLimitParams.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSetLimitParams.typeUrl, exports.MsgSetLimitParams);
function createBaseMsgSetLimitParamsResponse() {
    return {};
}
exports.MsgSetLimitParamsResponse = {
    typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParamsResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgSetLimitParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgSetLimitParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgSetLimitParamsResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetLimitParamsResponse();
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
        const message = createBaseMsgSetLimitParamsResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgSetLimitParamsResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSetLimitParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgSetLimitParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSetLimitParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParamsResponse",
            value: exports.MsgSetLimitParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSetLimitParamsResponse.typeUrl, exports.MsgSetLimitParamsResponse);
