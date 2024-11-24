"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgUpdatePerpetualFeeParamsResponse = exports.MsgUpdatePerpetualFeeParams = void 0;
//@ts-nocheck
const params_1 = require("./params");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseMsgUpdatePerpetualFeeParams() {
    return {
        authority: "",
        params: params_1.PerpetualFeeParams.fromPartial({})
    };
}
exports.MsgUpdatePerpetualFeeParams = {
    typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpdatePerpetualFeeParams.typeUrl || typeof o.authority === "string" && params_1.PerpetualFeeParams.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpdatePerpetualFeeParams.typeUrl || typeof o.authority === "string" && params_1.PerpetualFeeParams.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpdatePerpetualFeeParams.typeUrl || typeof o.authority === "string" && params_1.PerpetualFeeParams.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            params_1.PerpetualFeeParams.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdatePerpetualFeeParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
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
        const message = createBaseMsgUpdatePerpetualFeeParams();
        message.authority = object.authority ?? "";
        message.params = object.params !== undefined && object.params !== null ? params_1.PerpetualFeeParams.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdatePerpetualFeeParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.PerpetualFeeParams.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? params_1.PerpetualFeeParams.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdatePerpetualFeeParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdatePerpetualFeeParams.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdatePerpetualFeeParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams",
            value: exports.MsgUpdatePerpetualFeeParams.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdatePerpetualFeeParams.typeUrl, exports.MsgUpdatePerpetualFeeParams);
function createBaseMsgUpdatePerpetualFeeParamsResponse() {
    return {};
}
exports.MsgUpdatePerpetualFeeParamsResponse = {
    typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParamsResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpdatePerpetualFeeParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpdatePerpetualFeeParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpdatePerpetualFeeParamsResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdatePerpetualFeeParamsResponse();
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
        const message = createBaseMsgUpdatePerpetualFeeParamsResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdatePerpetualFeeParamsResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdatePerpetualFeeParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdatePerpetualFeeParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdatePerpetualFeeParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParamsResponse",
            value: exports.MsgUpdatePerpetualFeeParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdatePerpetualFeeParamsResponse.typeUrl, exports.MsgUpdatePerpetualFeeParamsResponse);
