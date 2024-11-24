//@ts-nocheck
import { DowntimeParams } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseMsgUpdateDowntimeParams() {
    return {
        authority: "",
        params: DowntimeParams.fromPartial({})
    };
}
export const MsgUpdateDowntimeParams = {
    typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams",
    is(o) {
        return o && (o.$typeUrl === MsgUpdateDowntimeParams.typeUrl || typeof o.authority === "string" && DowntimeParams.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUpdateDowntimeParams.typeUrl || typeof o.authority === "string" && DowntimeParams.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUpdateDowntimeParams.typeUrl || typeof o.authority === "string" && DowntimeParams.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            DowntimeParams.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateDowntimeParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.params = DowntimeParams.decode(reader, reader.uint32());
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
        message.params = object.params !== undefined && object.params !== null ? DowntimeParams.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateDowntimeParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = DowntimeParams.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? DowntimeParams.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateDowntimeParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateDowntimeParams.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateDowntimeParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams",
            value: MsgUpdateDowntimeParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateDowntimeParams.typeUrl, MsgUpdateDowntimeParams);
function createBaseMsgUpdateDowntimeParamsResponse() {
    return {};
}
export const MsgUpdateDowntimeParamsResponse = {
    typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParamsResponse",
    is(o) {
        return o && o.$typeUrl === MsgUpdateDowntimeParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgUpdateDowntimeParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgUpdateDowntimeParamsResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgUpdateDowntimeParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateDowntimeParamsResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateDowntimeParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParamsResponse",
            value: MsgUpdateDowntimeParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateDowntimeParamsResponse.typeUrl, MsgUpdateDowntimeParamsResponse);
