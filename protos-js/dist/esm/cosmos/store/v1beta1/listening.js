//@ts-nocheck
import { ResponseCommit, RequestFinalizeBlock, ResponseFinalizeBlock } from "../../../tendermint/abci/types";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
function createBaseStoreKVPair() {
    return {
        storeKey: "",
        delete: false,
        key: new Uint8Array(),
        value: new Uint8Array()
    };
}
export const StoreKVPair = {
    typeUrl: "/cosmos.store.v1beta1.StoreKVPair",
    aminoType: "cosmos-sdk/StoreKVPair",
    is(o) {
        return o && (o.$typeUrl === StoreKVPair.typeUrl || typeof o.storeKey === "string" && typeof o.delete === "boolean" && (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === StoreKVPair.typeUrl || typeof o.store_key === "string" && typeof o.delete === "boolean" && (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === StoreKVPair.typeUrl || typeof o.store_key === "string" && typeof o.delete === "boolean" && (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
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
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
            message.key = bytesFromBase64(object.key);
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = bytesFromBase64(object.value);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.store_key = message.storeKey === "" ? undefined : message.storeKey;
        obj.delete = message.delete === false ? undefined : message.delete;
        obj.key = message.key ? base64FromBytes(message.key) : undefined;
        obj.value = message.value ? base64FromBytes(message.value) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return StoreKVPair.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/StoreKVPair",
            value: StoreKVPair.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return StoreKVPair.decode(message.value);
    },
    toProto(message) {
        return StoreKVPair.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.v1beta1.StoreKVPair",
            value: StoreKVPair.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(StoreKVPair.typeUrl, StoreKVPair);
GlobalDecoderRegistry.registerAminoProtoMapping(StoreKVPair.aminoType, StoreKVPair.typeUrl);
function createBaseBlockMetadata() {
    return {
        responseCommit: undefined,
        requestFinalizeBlock: undefined,
        responseFinalizeBlock: undefined
    };
}
export const BlockMetadata = {
    typeUrl: "/cosmos.store.v1beta1.BlockMetadata",
    aminoType: "cosmos-sdk/BlockMetadata",
    is(o) {
        return o && o.$typeUrl === BlockMetadata.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === BlockMetadata.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === BlockMetadata.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.responseCommit !== undefined) {
            ResponseCommit.encode(message.responseCommit, writer.uint32(50).fork()).ldelim();
        }
        if (message.requestFinalizeBlock !== undefined) {
            RequestFinalizeBlock.encode(message.requestFinalizeBlock, writer.uint32(58).fork()).ldelim();
        }
        if (message.responseFinalizeBlock !== undefined) {
            ResponseFinalizeBlock.encode(message.responseFinalizeBlock, writer.uint32(66).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 6:
                    message.responseCommit = ResponseCommit.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.requestFinalizeBlock = RequestFinalizeBlock.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.responseFinalizeBlock = ResponseFinalizeBlock.decode(reader, reader.uint32());
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
        message.responseCommit = object.responseCommit !== undefined && object.responseCommit !== null ? ResponseCommit.fromPartial(object.responseCommit) : undefined;
        message.requestFinalizeBlock = object.requestFinalizeBlock !== undefined && object.requestFinalizeBlock !== null ? RequestFinalizeBlock.fromPartial(object.requestFinalizeBlock) : undefined;
        message.responseFinalizeBlock = object.responseFinalizeBlock !== undefined && object.responseFinalizeBlock !== null ? ResponseFinalizeBlock.fromPartial(object.responseFinalizeBlock) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseBlockMetadata();
        if (object.response_commit !== undefined && object.response_commit !== null) {
            message.responseCommit = ResponseCommit.fromAmino(object.response_commit);
        }
        if (object.request_finalize_block !== undefined && object.request_finalize_block !== null) {
            message.requestFinalizeBlock = RequestFinalizeBlock.fromAmino(object.request_finalize_block);
        }
        if (object.response_finalize_block !== undefined && object.response_finalize_block !== null) {
            message.responseFinalizeBlock = ResponseFinalizeBlock.fromAmino(object.response_finalize_block);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.response_commit = message.responseCommit ? ResponseCommit.toAmino(message.responseCommit) : undefined;
        obj.request_finalize_block = message.requestFinalizeBlock ? RequestFinalizeBlock.toAmino(message.requestFinalizeBlock) : undefined;
        obj.response_finalize_block = message.responseFinalizeBlock ? ResponseFinalizeBlock.toAmino(message.responseFinalizeBlock) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return BlockMetadata.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/BlockMetadata",
            value: BlockMetadata.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return BlockMetadata.decode(message.value);
    },
    toProto(message) {
        return BlockMetadata.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.v1beta1.BlockMetadata",
            value: BlockMetadata.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(BlockMetadata.typeUrl, BlockMetadata);
GlobalDecoderRegistry.registerAminoProtoMapping(BlockMetadata.aminoType, BlockMetadata.typeUrl);
