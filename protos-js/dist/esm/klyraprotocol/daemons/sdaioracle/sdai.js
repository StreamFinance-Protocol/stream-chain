//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
function createBaseAddsDAIEventRequest() {
    return {
        conversionRate: ""
    };
}
export const AddsDAIEventRequest = {
    typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventRequest",
    is(o) {
        return o && (o.$typeUrl === AddsDAIEventRequest.typeUrl || typeof o.conversionRate === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === AddsDAIEventRequest.typeUrl || typeof o.conversion_rate === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === AddsDAIEventRequest.typeUrl || typeof o.conversion_rate === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.conversionRate !== "") {
            writer.uint32(10).string(message.conversionRate);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddsDAIEventRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.conversionRate = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAddsDAIEventRequest();
        message.conversionRate = object.conversionRate ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseAddsDAIEventRequest();
        if (object.conversion_rate !== undefined && object.conversion_rate !== null) {
            message.conversionRate = object.conversion_rate;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.conversion_rate = message.conversionRate === "" ? undefined : message.conversionRate;
        return obj;
    },
    fromAminoMsg(object) {
        return AddsDAIEventRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return AddsDAIEventRequest.decode(message.value);
    },
    toProto(message) {
        return AddsDAIEventRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventRequest",
            value: AddsDAIEventRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AddsDAIEventRequest.typeUrl, AddsDAIEventRequest);
function createBaseAddsDAIEventResponse() {
    return {};
}
export const AddsDAIEventResponse = {
    typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventResponse",
    is(o) {
        return o && o.$typeUrl === AddsDAIEventResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === AddsDAIEventResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === AddsDAIEventResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddsDAIEventResponse();
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
        const message = createBaseAddsDAIEventResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseAddsDAIEventResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return AddsDAIEventResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return AddsDAIEventResponse.decode(message.value);
    },
    toProto(message) {
        return AddsDAIEventResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventResponse",
            value: AddsDAIEventResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AddsDAIEventResponse.typeUrl, AddsDAIEventResponse);
