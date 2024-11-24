//@ts-nocheck
import { Duration } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseDowntimeParams() {
    return {
        durations: []
    };
}
export const DowntimeParams = {
    typeUrl: "/klyraprotocol.blocktime.DowntimeParams",
    is(o) {
        return o && (o.$typeUrl === DowntimeParams.typeUrl || Array.isArray(o.durations) && (!o.durations.length || Duration.is(o.durations[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === DowntimeParams.typeUrl || Array.isArray(o.durations) && (!o.durations.length || Duration.isSDK(o.durations[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === DowntimeParams.typeUrl || Array.isArray(o.durations) && (!o.durations.length || Duration.isAmino(o.durations[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.durations) {
            Duration.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDowntimeParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.durations.push(Duration.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDowntimeParams();
        message.durations = object.durations?.map(e => Duration.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseDowntimeParams();
        message.durations = object.durations?.map(e => Duration.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.durations) {
            obj.durations = message.durations.map(e => e ? Duration.toAmino(e) : undefined);
        }
        else {
            obj.durations = message.durations;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return DowntimeParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return DowntimeParams.decode(message.value);
    },
    toProto(message) {
        return DowntimeParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.DowntimeParams",
            value: DowntimeParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(DowntimeParams.typeUrl, DowntimeParams);
