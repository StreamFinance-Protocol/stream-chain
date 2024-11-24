"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgUpdateDowntimeParamsResponse = exports.MsgUpdateDowntimeParams = void 0;
//@ts-nocheck
const params_1 = require("./params");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseMsgUpdateDowntimeParams() {
    return {
        authority: "",
        params: params_1.DowntimeParams.fromPartial({})
    };
}
exports.MsgUpdateDowntimeParams = {
    typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpdateDowntimeParams.typeUrl || typeof o.authority === "string" && params_1.DowntimeParams.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpdateDowntimeParams.typeUrl || typeof o.authority === "string" && params_1.DowntimeParams.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpdateDowntimeParams.typeUrl || typeof o.authority === "string" && params_1.DowntimeParams.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            params_1.DowntimeParams.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateDowntimeParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.params = params_1.DowntimeParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateDowntimeParams();
        message.authority = object.authority ?? "";
        message.params = object.params !== undefined && object.params !== null ? params_1.DowntimeParams.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateDowntimeParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.DowntimeParams.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? params_1.DowntimeParams.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateDowntimeParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateDowntimeParams.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateDowntimeParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams",
            value: exports.MsgUpdateDowntimeParams.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateDowntimeParams.typeUrl, exports.MsgUpdateDowntimeParams);
function createBaseMsgUpdateDowntimeParamsResponse() {
    return {};
}
exports.MsgUpdateDowntimeParamsResponse = {
    typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParamsResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpdateDowntimeParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpdateDowntimeParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpdateDowntimeParamsResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateDowntimeParamsResponse();
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
        const message = createBaseMsgUpdateDowntimeParamsResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdateDowntimeParamsResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateDowntimeParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateDowntimeParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateDowntimeParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParamsResponse",
            value: exports.MsgUpdateDowntimeParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateDowntimeParamsResponse.typeUrl, exports.MsgUpdateDowntimeParamsResponse);
