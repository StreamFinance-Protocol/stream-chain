"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockMetadata = exports.StoreKVPair = void 0;
//@ts-nocheck
const types_1 = require("../../../tendermint/abci/types");
const binary_1 = require("../../../binary");
const helpers_1 = require("../../../helpers");
const registry_1 = require("../../../registry");
function createBaseStoreKVPair() {
    return {
        storeKey: "",
        delete: false,
        key: new Uint8Array(),
        value: new Uint8Array()
    };
}
exports.StoreKVPair = {
    typeUrl: "/cosmos.store.v1beta1.StoreKVPair",
    aminoType: "cosmos-sdk/StoreKVPair",
    is(o) {
        return o && (o.$typeUrl === exports.StoreKVPair.typeUrl || typeof o.storeKey === "string" && typeof o.delete === "boolean" && (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.StoreKVPair.typeUrl || typeof o.store_key === "string" && typeof o.delete === "boolean" && (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.StoreKVPair.typeUrl || typeof o.store_key === "string" && typeof o.delete === "boolean" && (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.storeKey !== "") {
            writer.uint32(10).string(message.storeKey);
        }
        if (message.delete === true) {
            writer.uint32(16).bool(message.delete);
        }
        if (message.key.length !== 0) {
            writer.uint32(26).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(34).bytes(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStoreKVPair();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.storeKey = reader.string();
                    break;
                case 2:
                    message.delete = reader.bool();
                    break;
                case 3:
                    message.key = reader.bytes();
                    break;
                case 4:
                    message.value = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStoreKVPair();
        message.storeKey = object.storeKey ?? "";
        message.delete = object.delete ?? false;
        message.key = object.key ?? new Uint8Array();
        message.value = object.value ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseStoreKVPair();
        if (object.store_key !== undefined && object.store_key !== null) {
            message.storeKey = object.store_key;
        }
        if (object.delete !== undefined && object.delete !== null) {
            message.delete = object.delete;
        }
        if (object.key !== undefined && object.key !== null) {
            message.key = (0, helpers_1.bytesFromBase64)(object.key);
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = (0, helpers_1.bytesFromBase64)(object.value);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.store_key = message.storeKey === "" ? undefined : message.storeKey;
        obj.delete = message.delete === false ? undefined : message.delete;
        obj.key = message.key ? (0, helpers_1.base64FromBytes)(message.key) : undefined;
        obj.value = message.value ? (0, helpers_1.base64FromBytes)(message.value) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StoreKVPair.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/StoreKVPair",
            value: exports.StoreKVPair.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.StoreKVPair.decode(message.value);
    },
    toProto(message) {
        return exports.StoreKVPair.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.v1beta1.StoreKVPair",
            value: exports.StoreKVPair.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StoreKVPair.typeUrl, exports.StoreKVPair);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.StoreKVPair.aminoType, exports.StoreKVPair.typeUrl);
function createBaseBlockMetadata() {
    return {
        responseCommit: undefined,
        requestFinalizeBlock: undefined,
        responseFinalizeBlock: undefined
    };
}
exports.BlockMetadata = {
    typeUrl: "/cosmos.store.v1beta1.BlockMetadata",
    aminoType: "cosmos-sdk/BlockMetadata",
    is(o) {
        return o && o.$typeUrl === exports.BlockMetadata.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.BlockMetadata.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.BlockMetadata.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.responseCommit !== undefined) {
            types_1.ResponseCommit.encode(message.responseCommit, writer.uint32(50).fork()).ldelim();
        }
        if (message.requestFinalizeBlock !== undefined) {
            types_1.RequestFinalizeBlock.encode(message.requestFinalizeBlock, writer.uint32(58).fork()).ldelim();
        }
        if (message.responseFinalizeBlock !== undefined) {
            types_1.ResponseFinalizeBlock.encode(message.responseFinalizeBlock, writer.uint32(66).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 6:
                    message.responseCommit = types_1.ResponseCommit.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.requestFinalizeBlock = types_1.RequestFinalizeBlock.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.responseFinalizeBlock = types_1.ResponseFinalizeBlock.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseBlockMetadata();
        message.responseCommit = object.responseCommit !== undefined && object.responseCommit !== null ? types_1.ResponseCommit.fromPartial(object.responseCommit) : undefined;
        message.requestFinalizeBlock = object.requestFinalizeBlock !== undefined && object.requestFinalizeBlock !== null ? types_1.RequestFinalizeBlock.fromPartial(object.requestFinalizeBlock) : undefined;
        message.responseFinalizeBlock = object.responseFinalizeBlock !== undefined && object.responseFinalizeBlock !== null ? types_1.ResponseFinalizeBlock.fromPartial(object.responseFinalizeBlock) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseBlockMetadata();
        if (object.response_commit !== undefined && object.response_commit !== null) {
            message.responseCommit = types_1.ResponseCommit.fromAmino(object.response_commit);
        }
        if (object.request_finalize_block !== undefined && object.request_finalize_block !== null) {
            message.requestFinalizeBlock = types_1.RequestFinalizeBlock.fromAmino(object.request_finalize_block);
        }
        if (object.response_finalize_block !== undefined && object.response_finalize_block !== null) {
            message.responseFinalizeBlock = types_1.ResponseFinalizeBlock.fromAmino(object.response_finalize_block);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.response_commit = message.responseCommit ? types_1.ResponseCommit.toAmino(message.responseCommit) : undefined;
        obj.request_finalize_block = message.requestFinalizeBlock ? types_1.RequestFinalizeBlock.toAmino(message.requestFinalizeBlock) : undefined;
        obj.response_finalize_block = message.responseFinalizeBlock ? types_1.ResponseFinalizeBlock.toAmino(message.responseFinalizeBlock) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.BlockMetadata.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/BlockMetadata",
            value: exports.BlockMetadata.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.BlockMetadata.decode(message.value);
    },
    toProto(message) {
        return exports.BlockMetadata.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.v1beta1.BlockMetadata",
            value: exports.BlockMetadata.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.BlockMetadata.typeUrl, exports.BlockMetadata);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.BlockMetadata.aminoType, exports.BlockMetadata.typeUrl);
