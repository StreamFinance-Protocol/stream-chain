//@ts-nocheck
import { LimitParams } from "./limit_params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseMsgSetLimitParams() {
    return {
        authority: "",
        limitParams: LimitParams.fromPartial({})
    };
}
export const MsgSetLimitParams = {
    typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams",
    is(o) {
        return o && (o.$typeUrl === MsgSetLimitParams.typeUrl || typeof o.authority === "string" && LimitParams.is(o.limitParams));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgSetLimitParams.typeUrl || typeof o.authority === "string" && LimitParams.isSDK(o.limit_params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgSetLimitParams.typeUrl || typeof o.authority === "string" && LimitParams.isAmino(o.limit_params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.limitParams !== undefined) {
            LimitParams.encode(message.limitParams, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetLimitParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.limitParams = LimitParams.decode(reader, reader.uint32());
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
        message.limitParams = object.limitParams !== undefined && object.limitParams !== null ? LimitParams.fromPartial(object.limitParams) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSetLimitParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.limit_params !== undefined && object.limit_params !== null) {
            message.limitParams = LimitParams.fromAmino(object.limit_params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.limit_params = message.limitParams ? LimitParams.toAmino(message.limitParams) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgSetLimitParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgSetLimitParams.decode(message.value);
    },
    toProto(message) {
        return MsgSetLimitParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams",
            value: MsgSetLimitParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgSetLimitParams.typeUrl, MsgSetLimitParams);
function createBaseMsgSetLimitParamsResponse() {
    return {};
}
export const MsgSetLimitParamsResponse = {
    typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParamsResponse",
    is(o) {
        return o && o.$typeUrl === MsgSetLimitParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgSetLimitParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgSetLimitParamsResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgSetLimitParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgSetLimitParamsResponse.decode(message.value);
    },
    toProto(message) {
        return MsgSetLimitParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParamsResponse",
            value: MsgSetLimitParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgSetLimitParamsResponse.typeUrl, MsgSetLimitParamsResponse);
