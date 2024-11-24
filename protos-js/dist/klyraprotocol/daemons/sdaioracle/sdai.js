"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddsDAIEventResponse = exports.AddsDAIEventRequest = void 0;
//@ts-nocheck
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
function createBaseAddsDAIEventRequest() {
    return {
        conversionRate: ""
    };
}
exports.AddsDAIEventRequest = {
    typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventRequest",
    is(o) {
        return o && (o.$typeUrl === exports.AddsDAIEventRequest.typeUrl || typeof o.conversionRate === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.AddsDAIEventRequest.typeUrl || typeof o.conversion_rate === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.AddsDAIEventRequest.typeUrl || typeof o.conversion_rate === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.conversionRate !== "") {
            writer.uint32(10).string(message.conversionRate);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.AddsDAIEventRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.AddsDAIEventRequest.decode(message.value);
    },
    toProto(message) {
        return exports.AddsDAIEventRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventRequest",
            value: exports.AddsDAIEventRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.AddsDAIEventRequest.typeUrl, exports.AddsDAIEventRequest);
function createBaseAddsDAIEventResponse() {
    return {};
}
exports.AddsDAIEventResponse = {
    typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventResponse",
    is(o) {
        return o && o.$typeUrl === exports.AddsDAIEventResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.AddsDAIEventResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.AddsDAIEventResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.AddsDAIEventResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.AddsDAIEventResponse.decode(message.value);
    },
    toProto(message) {
        return exports.AddsDAIEventResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventResponse",
            value: exports.AddsDAIEventResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.AddsDAIEventResponse.typeUrl, exports.AddsDAIEventResponse);
