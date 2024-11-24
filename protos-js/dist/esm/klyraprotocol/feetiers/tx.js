//@ts-nocheck
import { PerpetualFeeParams } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseMsgUpdatePerpetualFeeParams() {
    return {
        authority: "",
        params: PerpetualFeeParams.fromPartial({})
    };
}
export const MsgUpdatePerpetualFeeParams = {
    typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams",
    is(o) {
        return o && (o.$typeUrl === MsgUpdatePerpetualFeeParams.typeUrl || typeof o.authority === "string" && PerpetualFeeParams.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUpdatePerpetualFeeParams.typeUrl || typeof o.authority === "string" && PerpetualFeeParams.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUpdatePerpetualFeeParams.typeUrl || typeof o.authority === "string" && PerpetualFeeParams.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            PerpetualFeeParams.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdatePerpetualFeeParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
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
        const message = createBaseMsgUpdatePerpetualFeeParams();
        message.authority = object.authority ?? "";
        message.params = object.params !== undefined && object.params !== null ? PerpetualFeeParams.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdatePerpetualFeeParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = PerpetualFeeParams.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? PerpetualFeeParams.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdatePerpetualFeeParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdatePerpetualFeeParams.decode(message.value);
    },
    toProto(message) {
        return MsgUpdatePerpetualFeeParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams",
            value: MsgUpdatePerpetualFeeParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdatePerpetualFeeParams.typeUrl, MsgUpdatePerpetualFeeParams);
function createBaseMsgUpdatePerpetualFeeParamsResponse() {
    return {};
}
export const MsgUpdatePerpetualFeeParamsResponse = {
    typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParamsResponse",
    is(o) {
        return o && o.$typeUrl === MsgUpdatePerpetualFeeParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgUpdatePerpetualFeeParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgUpdatePerpetualFeeParamsResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgUpdatePerpetualFeeParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdatePerpetualFeeParamsResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUpdatePerpetualFeeParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParamsResponse",
            value: MsgUpdatePerpetualFeeParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdatePerpetualFeeParamsResponse.typeUrl, MsgUpdatePerpetualFeeParamsResponse);
