"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerpetualPosition = void 0;
//@ts-nocheck
const binary_1 = require("../../binary");
const helpers_1 = require("../../helpers");
const registry_1 = require("../../registry");
function createBasePerpetualPosition() {
    return {
        perpetualId: 0,
        quantums: new Uint8Array(),
        fundingIndex: new Uint8Array(),
        yieldIndex: ""
    };
}
exports.PerpetualPosition = {
    typeUrl: "/klyraprotocol.subaccounts.PerpetualPosition",
    is(o) {
        return o && (o.$typeUrl === exports.PerpetualPosition.typeUrl || typeof o.perpetualId === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && (o.fundingIndex instanceof Uint8Array || typeof o.fundingIndex === "string") && typeof o.yieldIndex === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.PerpetualPosition.typeUrl || typeof o.perpetual_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && (o.funding_index instanceof Uint8Array || typeof o.funding_index === "string") && typeof o.yield_index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.PerpetualPosition.typeUrl || typeof o.perpetual_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && (o.funding_index instanceof Uint8Array || typeof o.funding_index === "string") && typeof o.yield_index === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.perpetualId !== 0) {
            writer.uint32(8).uint32(message.perpetualId);
        }
        if (message.quantums.length !== 0) {
            writer.uint32(18).bytes(message.quantums);
        }
        if (message.fundingIndex.length !== 0) {
            writer.uint32(26).bytes(message.fundingIndex);
        }
        if (message.yieldIndex !== "") {
            writer.uint32(34).string(message.yieldIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePerpetualPosition();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetualId = reader.uint32();
                    break;
                case 2:
                    message.quantums = reader.bytes();
                    break;
                case 3:
                    message.fundingIndex = reader.bytes();
                    break;
                case 4:
                    message.yieldIndex = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePerpetualPosition();
        message.perpetualId = object.perpetualId ?? 0;
        message.quantums = object.quantums ?? new Uint8Array();
        message.fundingIndex = object.fundingIndex ?? new Uint8Array();
        message.yieldIndex = object.yieldIndex ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBasePerpetualPosition();
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        if (object.quantums !== undefined && object.quantums !== null) {
            message.quantums = (0, helpers_1.bytesFromBase64)(object.quantums);
        }
        if (object.funding_index !== undefined && object.funding_index !== null) {
            message.fundingIndex = (0, helpers_1.bytesFromBase64)(object.funding_index);
        }
        if (object.yield_index !== undefined && object.yield_index !== null) {
            message.yieldIndex = object.yield_index;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        obj.quantums = message.quantums ? (0, helpers_1.base64FromBytes)(message.quantums) : undefined;
        obj.funding_index = message.fundingIndex ? (0, helpers_1.base64FromBytes)(message.fundingIndex) : undefined;
        obj.yield_index = message.yieldIndex === "" ? undefined : message.yieldIndex;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.PerpetualPosition.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.PerpetualPosition.decode(message.value);
    },
    toProto(message) {
        return exports.PerpetualPosition.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.PerpetualPosition",
            value: exports.PerpetualPosition.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.PerpetualPosition.typeUrl, exports.PerpetualPosition);
