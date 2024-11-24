"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetPosition = void 0;
//@ts-nocheck
const binary_1 = require("../../binary");
const helpers_1 = require("../../helpers");
const registry_1 = require("../../registry");
function createBaseAssetPosition() {
    return {
        assetId: 0,
        quantums: new Uint8Array(),
        index: BigInt(0)
    };
}
exports.AssetPosition = {
    typeUrl: "/klyraprotocol.subaccounts.AssetPosition",
    is(o) {
        return o && (o.$typeUrl === exports.AssetPosition.typeUrl || typeof o.assetId === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && typeof o.index === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.AssetPosition.typeUrl || typeof o.asset_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && typeof o.index === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.AssetPosition.typeUrl || typeof o.asset_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && typeof o.index === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.assetId !== 0) {
            writer.uint32(8).uint32(message.assetId);
        }
        if (message.quantums.length !== 0) {
            writer.uint32(18).bytes(message.quantums);
        }
        if (message.index !== BigInt(0)) {
            writer.uint32(24).uint64(message.index);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAssetPosition();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.assetId = reader.uint32();
                    break;
                case 2:
                    message.quantums = reader.bytes();
                    break;
                case 3:
                    message.index = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAssetPosition();
        message.assetId = object.assetId ?? 0;
        message.quantums = object.quantums ?? new Uint8Array();
        message.index = object.index !== undefined && object.index !== null ? BigInt(object.index.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseAssetPosition();
        if (object.asset_id !== undefined && object.asset_id !== null) {
            message.assetId = object.asset_id;
        }
        if (object.quantums !== undefined && object.quantums !== null) {
            message.quantums = (0, helpers_1.bytesFromBase64)(object.quantums);
        }
        if (object.index !== undefined && object.index !== null) {
            message.index = BigInt(object.index);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.asset_id = message.assetId === 0 ? undefined : message.assetId;
        obj.quantums = message.quantums ? (0, helpers_1.base64FromBytes)(message.quantums) : undefined;
        obj.index = message.index !== BigInt(0) ? message.index?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.AssetPosition.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.AssetPosition.decode(message.value);
    },
    toProto(message) {
        return exports.AssetPosition.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.AssetPosition",
            value: exports.AssetPosition.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.AssetPosition.typeUrl, exports.AssetPosition);
