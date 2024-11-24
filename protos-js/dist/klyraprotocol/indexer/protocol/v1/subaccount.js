"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerAssetPosition = exports.IndexerPerpetualPosition = exports.IndexerSubaccountId = void 0;
//@ts-nocheck
const binary_1 = require("../../../../binary");
const registry_1 = require("../../../../registry");
const helpers_1 = require("../../../../helpers");
function createBaseIndexerSubaccountId() {
    return {
        owner: "",
        number: 0
    };
}
exports.IndexerSubaccountId = {
    typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerSubaccountId",
    is(o) {
        return o && (o.$typeUrl === exports.IndexerSubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.IndexerSubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.IndexerSubaccountId.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.number !== 0) {
            writer.uint32(16).uint32(message.number);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIndexerSubaccountId();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.number = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseIndexerSubaccountId();
        message.owner = object.owner ?? "";
        message.number = object.number ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseIndexerSubaccountId();
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        if (object.number !== undefined && object.number !== null) {
            message.number = object.number;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.owner = message.owner === "" ? undefined : message.owner;
        obj.number = message.number === 0 ? undefined : message.number;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.IndexerSubaccountId.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.IndexerSubaccountId.decode(message.value);
    },
    toProto(message) {
        return exports.IndexerSubaccountId.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerSubaccountId",
            value: exports.IndexerSubaccountId.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.IndexerSubaccountId.typeUrl, exports.IndexerSubaccountId);
function createBaseIndexerPerpetualPosition() {
    return {
        perpetualId: 0,
        quantums: new Uint8Array(),
        fundingIndex: new Uint8Array(),
        fundingPayment: new Uint8Array(),
        perpYieldIndex: ""
    };
}
exports.IndexerPerpetualPosition = {
    typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerPerpetualPosition",
    is(o) {
        return o && (o.$typeUrl === exports.IndexerPerpetualPosition.typeUrl || typeof o.perpetualId === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && (o.fundingIndex instanceof Uint8Array || typeof o.fundingIndex === "string") && (o.fundingPayment instanceof Uint8Array || typeof o.fundingPayment === "string") && typeof o.perpYieldIndex === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.IndexerPerpetualPosition.typeUrl || typeof o.perpetual_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && (o.funding_index instanceof Uint8Array || typeof o.funding_index === "string") && (o.funding_payment instanceof Uint8Array || typeof o.funding_payment === "string") && typeof o.perp_yield_index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.IndexerPerpetualPosition.typeUrl || typeof o.perpetual_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && (o.funding_index instanceof Uint8Array || typeof o.funding_index === "string") && (o.funding_payment instanceof Uint8Array || typeof o.funding_payment === "string") && typeof o.perp_yield_index === "string");
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
        if (message.fundingPayment.length !== 0) {
            writer.uint32(34).bytes(message.fundingPayment);
        }
        if (message.perpYieldIndex !== "") {
            writer.uint32(42).string(message.perpYieldIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIndexerPerpetualPosition();
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
                    message.fundingPayment = reader.bytes();
                    break;
                case 5:
                    message.perpYieldIndex = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseIndexerPerpetualPosition();
        message.perpetualId = object.perpetualId ?? 0;
        message.quantums = object.quantums ?? new Uint8Array();
        message.fundingIndex = object.fundingIndex ?? new Uint8Array();
        message.fundingPayment = object.fundingPayment ?? new Uint8Array();
        message.perpYieldIndex = object.perpYieldIndex ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseIndexerPerpetualPosition();
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        if (object.quantums !== undefined && object.quantums !== null) {
            message.quantums = (0, helpers_1.bytesFromBase64)(object.quantums);
        }
        if (object.funding_index !== undefined && object.funding_index !== null) {
            message.fundingIndex = (0, helpers_1.bytesFromBase64)(object.funding_index);
        }
        if (object.funding_payment !== undefined && object.funding_payment !== null) {
            message.fundingPayment = (0, helpers_1.bytesFromBase64)(object.funding_payment);
        }
        if (object.perp_yield_index !== undefined && object.perp_yield_index !== null) {
            message.perpYieldIndex = object.perp_yield_index;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        obj.quantums = message.quantums ? (0, helpers_1.base64FromBytes)(message.quantums) : undefined;
        obj.funding_index = message.fundingIndex ? (0, helpers_1.base64FromBytes)(message.fundingIndex) : undefined;
        obj.funding_payment = message.fundingPayment ? (0, helpers_1.base64FromBytes)(message.fundingPayment) : undefined;
        obj.perp_yield_index = message.perpYieldIndex === "" ? undefined : message.perpYieldIndex;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.IndexerPerpetualPosition.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.IndexerPerpetualPosition.decode(message.value);
    },
    toProto(message) {
        return exports.IndexerPerpetualPosition.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerPerpetualPosition",
            value: exports.IndexerPerpetualPosition.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.IndexerPerpetualPosition.typeUrl, exports.IndexerPerpetualPosition);
function createBaseIndexerAssetPosition() {
    return {
        assetId: 0,
        quantums: new Uint8Array(),
        index: BigInt(0)
    };
}
exports.IndexerAssetPosition = {
    typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerAssetPosition",
    is(o) {
        return o && (o.$typeUrl === exports.IndexerAssetPosition.typeUrl || typeof o.assetId === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && typeof o.index === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.IndexerAssetPosition.typeUrl || typeof o.asset_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && typeof o.index === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.IndexerAssetPosition.typeUrl || typeof o.asset_id === "number" && (o.quantums instanceof Uint8Array || typeof o.quantums === "string") && typeof o.index === "bigint");
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
        const message = createBaseIndexerAssetPosition();
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
        const message = createBaseIndexerAssetPosition();
        message.assetId = object.assetId ?? 0;
        message.quantums = object.quantums ?? new Uint8Array();
        message.index = object.index !== undefined && object.index !== null ? BigInt(object.index.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseIndexerAssetPosition();
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
        return exports.IndexerAssetPosition.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.IndexerAssetPosition.decode(message.value);
    },
    toProto(message) {
        return exports.IndexerAssetPosition.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerAssetPosition",
            value: exports.IndexerAssetPosition.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.IndexerAssetPosition.typeUrl, exports.IndexerAssetPosition);
