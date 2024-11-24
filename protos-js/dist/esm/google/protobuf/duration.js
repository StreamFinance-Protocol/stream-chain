//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseDuration() {
    return {
        seconds: BigInt(0),
        nanos: 0
    };
}
export const Duration = {
    typeUrl: "/google.protobuf.Duration",
    is(o) {
        return o && (o.$typeUrl === Duration.typeUrl || typeof o.seconds === "bigint" && typeof o.nanos === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Duration.typeUrl || typeof o.seconds === "bigint" && typeof o.nanos === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Duration.typeUrl || typeof o.seconds === "bigint" && typeof o.nanos === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.seconds !== BigInt(0)) {
            writer.uint32(8).int64(message.seconds);
        }
        if (message.nanos !== 0) {
            writer.uint32(16).int32(message.nanos);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDuration();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.seconds = reader.int64();
                    break;
                case 2:
                    message.nanos = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDuration();
        message.seconds = object.seconds !== undefined && object.seconds !== null ? BigInt(object.seconds.toString()) : BigInt(0);
        message.nanos = object.nanos ?? 0;
        return message;
    },
    fromAmino(object) {
        const value = BigInt(object);
        return {
            seconds: value / BigInt("1000000000"),
            nanos: Number(value % BigInt("1000000000"))
        };
    },
    toAmino(message) {
        return (message.seconds * BigInt("1000000000") + BigInt(message.nanos)).toString();
    },
    fromAminoMsg(object) {
        return Duration.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return Duration.decode(message.value);
    },
    toProto(message) {
        return Duration.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/google.protobuf.Duration",
            value: Duration.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Duration.typeUrl, Duration);
