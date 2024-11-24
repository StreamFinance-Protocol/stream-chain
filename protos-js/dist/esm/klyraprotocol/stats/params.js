//@ts-nocheck
import { Duration } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseParams() {
    return {
        windowDuration: Duration.fromPartial({})
    };
}
export const Params = {
    typeUrl: "/klyraprotocol.stats.Params",
    is(o) {
        return o && (o.$typeUrl === Params.typeUrl || Duration.is(o.windowDuration));
    },
    isSDK(o) {
        return o && (o.$typeUrl === Params.typeUrl || Duration.isSDK(o.window_duration));
    },
    isAmino(o) {
        return o && (o.$typeUrl === Params.typeUrl || Duration.isAmino(o.window_duration));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.windowDuration !== undefined) {
            Duration.encode(message.windowDuration, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.windowDuration = Duration.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.windowDuration = object.windowDuration !== undefined && object.windowDuration !== null ? Duration.fromPartial(object.windowDuration) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseParams();
        if (object.window_duration !== undefined && object.window_duration !== null) {
            message.windowDuration = Duration.fromAmino(object.window_duration);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.window_duration = message.windowDuration ? Duration.toAmino(message.windowDuration) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return Params.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return Params.decode(message.value);
    },
    toProto(message) {
        return Params.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.Params",
            value: Params.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Params.typeUrl, Params);
