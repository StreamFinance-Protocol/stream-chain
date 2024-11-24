//@ts-nocheck
import { Duration } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
function createBaseLimitParams() {
    return {
        denom: "",
        limiters: []
    };
}
export const LimitParams = {
    typeUrl: "/klyraprotocol.ratelimit.LimitParams",
    is(o) {
        return o && (o.$typeUrl === LimitParams.typeUrl || typeof o.denom === "string" && Array.isArray(o.limiters) && (!o.limiters.length || Limiter.is(o.limiters[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === LimitParams.typeUrl || typeof o.denom === "string" && Array.isArray(o.limiters) && (!o.limiters.length || Limiter.isSDK(o.limiters[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === LimitParams.typeUrl || typeof o.denom === "string" && Array.isArray(o.limiters) && (!o.limiters.length || Limiter.isAmino(o.limiters[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        for (const v of message.limiters) {
            Limiter.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLimitParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
                    message.limiters.push(Limiter.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseLimitParams();
        message.denom = object.denom ?? "";
        message.limiters = object.limiters?.map(e => Limiter.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseLimitParams();
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = object.denom;
        }
        message.limiters = object.limiters?.map(e => Limiter.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.denom = message.denom === "" ? undefined : message.denom;
        if (message.limiters) {
            obj.limiters = message.limiters.map(e => e ? Limiter.toAmino(e) : undefined);
        }
        else {
            obj.limiters = message.limiters;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return LimitParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return LimitParams.decode(message.value);
    },
    toProto(message) {
        return LimitParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.LimitParams",
            value: LimitParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(LimitParams.typeUrl, LimitParams);
function createBaseLimiter() {
    return {
        period: Duration.fromPartial({}),
        baselineMinimum: new Uint8Array(),
        baselineTvlPpm: 0
    };
}
export const Limiter = {
    typeUrl: "/klyraprotocol.ratelimit.Limiter",
    is(o) {
        return o && (o.$typeUrl === Limiter.typeUrl || Duration.is(o.period) && (o.baselineMinimum instanceof Uint8Array || typeof o.baselineMinimum === "string") && typeof o.baselineTvlPpm === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Limiter.typeUrl || Duration.isSDK(o.period) && (o.baseline_minimum instanceof Uint8Array || typeof o.baseline_minimum === "string") && typeof o.baseline_tvl_ppm === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Limiter.typeUrl || Duration.isAmino(o.period) && (o.baseline_minimum instanceof Uint8Array || typeof o.baseline_minimum === "string") && typeof o.baseline_tvl_ppm === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.period !== undefined) {
            Duration.encode(message.period, writer.uint32(10).fork()).ldelim();
        }
        if (message.baselineMinimum.length !== 0) {
            writer.uint32(26).bytes(message.baselineMinimum);
        }
        if (message.baselineTvlPpm !== 0) {
            writer.uint32(32).uint32(message.baselineTvlPpm);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLimiter();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.period = Duration.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.baselineMinimum = reader.bytes();
                    break;
                case 4:
                    message.baselineTvlPpm = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseLimiter();
        message.period = object.period !== undefined && object.period !== null ? Duration.fromPartial(object.period) : undefined;
        message.baselineMinimum = object.baselineMinimum ?? new Uint8Array();
        message.baselineTvlPpm = object.baselineTvlPpm ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseLimiter();
        if (object.period !== undefined && object.period !== null) {
            message.period = Duration.fromAmino(object.period);
        }
        if (object.baseline_minimum !== undefined && object.baseline_minimum !== null) {
            message.baselineMinimum = bytesFromBase64(object.baseline_minimum);
        }
        if (object.baseline_tvl_ppm !== undefined && object.baseline_tvl_ppm !== null) {
            message.baselineTvlPpm = object.baseline_tvl_ppm;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.period = message.period ? Duration.toAmino(message.period) : undefined;
        obj.baseline_minimum = message.baselineMinimum ? base64FromBytes(message.baselineMinimum) : undefined;
        obj.baseline_tvl_ppm = message.baselineTvlPpm === 0 ? undefined : message.baselineTvlPpm;
        return obj;
    },
    fromAminoMsg(object) {
        return Limiter.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return Limiter.decode(message.value);
    },
    toProto(message) {
        return Limiter.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.Limiter",
            value: Limiter.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Limiter.typeUrl, Limiter);
