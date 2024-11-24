"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapshotExtensionPayload = exports.SnapshotExtensionMeta = exports.SnapshotIAVLItem = exports.SnapshotStoreItem = exports.SnapshotItem = exports.Metadata = exports.Snapshot = void 0;
//@ts-nocheck
const binary_1 = require("../../../../binary");
const helpers_1 = require("../../../../helpers");
const registry_1 = require("../../../../registry");
function createBaseSnapshot() {
    return {
        height: BigInt(0),
        format: 0,
        chunks: 0,
        hash: new Uint8Array(),
        metadata: exports.Metadata.fromPartial({})
    };
}
exports.Snapshot = {
    typeUrl: "/cosmos.store.snapshots.v1.Snapshot",
    aminoType: "cosmos-sdk/Snapshot",
    is(o) {
        return o && (o.$typeUrl === exports.Snapshot.typeUrl || typeof o.height === "bigint" && typeof o.format === "number" && typeof o.chunks === "number" && (o.hash instanceof Uint8Array || typeof o.hash === "string") && exports.Metadata.is(o.metadata));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Snapshot.typeUrl || typeof o.height === "bigint" && typeof o.format === "number" && typeof o.chunks === "number" && (o.hash instanceof Uint8Array || typeof o.hash === "string") && exports.Metadata.isSDK(o.metadata));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Snapshot.typeUrl || typeof o.height === "bigint" && typeof o.format === "number" && typeof o.chunks === "number" && (o.hash instanceof Uint8Array || typeof o.hash === "string") && exports.Metadata.isAmino(o.metadata));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.height !== BigInt(0)) {
            writer.uint32(8).uint64(message.height);
        }
        if (message.format !== 0) {
            writer.uint32(16).uint32(message.format);
        }
        if (message.chunks !== 0) {
            writer.uint32(24).uint32(message.chunks);
        }
        if (message.hash.length !== 0) {
            writer.uint32(34).bytes(message.hash);
        }
        if (message.metadata !== undefined) {
            exports.Metadata.encode(message.metadata, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSnapshot();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.uint64();
                    break;
                case 2:
                    message.format = reader.uint32();
                    break;
                case 3:
                    message.chunks = reader.uint32();
                    break;
                case 4:
                    message.hash = reader.bytes();
                    break;
                case 5:
                    message.metadata = exports.Metadata.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSnapshot();
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.format = object.format ?? 0;
        message.chunks = object.chunks ?? 0;
        message.hash = object.hash ?? new Uint8Array();
        message.metadata = object.metadata !== undefined && object.metadata !== null ? exports.Metadata.fromPartial(object.metadata) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseSnapshot();
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.format !== undefined && object.format !== null) {
            message.format = object.format;
        }
        if (object.chunks !== undefined && object.chunks !== null) {
            message.chunks = object.chunks;
        }
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = (0, helpers_1.bytesFromBase64)(object.hash);
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = exports.Metadata.fromAmino(object.metadata);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.format = message.format === 0 ? undefined : message.format;
        obj.chunks = message.chunks === 0 ? undefined : message.chunks;
        obj.hash = message.hash ? (0, helpers_1.base64FromBytes)(message.hash) : undefined;
        obj.metadata = message.metadata ? exports.Metadata.toAmino(message.metadata) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Snapshot.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Snapshot",
            value: exports.Snapshot.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.Snapshot.decode(message.value);
    },
    toProto(message) {
        return exports.Snapshot.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.snapshots.v1.Snapshot",
            value: exports.Snapshot.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Snapshot.typeUrl, exports.Snapshot);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.Snapshot.aminoType, exports.Snapshot.typeUrl);
function createBaseMetadata() {
    return {
        chunkHashes: []
    };
}
exports.Metadata = {
    typeUrl: "/cosmos.store.snapshots.v1.Metadata",
    aminoType: "cosmos-sdk/Metadata",
    is(o) {
        return o && (o.$typeUrl === exports.Metadata.typeUrl || Array.isArray(o.chunkHashes) && (!o.chunkHashes.length || o.chunkHashes[0] instanceof Uint8Array || typeof o.chunkHashes[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Metadata.typeUrl || Array.isArray(o.chunk_hashes) && (!o.chunk_hashes.length || o.chunk_hashes[0] instanceof Uint8Array || typeof o.chunk_hashes[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Metadata.typeUrl || Array.isArray(o.chunk_hashes) && (!o.chunk_hashes.length || o.chunk_hashes[0] instanceof Uint8Array || typeof o.chunk_hashes[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.chunkHashes) {
            writer.uint32(10).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chunkHashes.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMetadata();
        message.chunkHashes = object.chunkHashes?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMetadata();
        message.chunkHashes = object.chunk_hashes?.map(e => (0, helpers_1.bytesFromBase64)(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.chunkHashes) {
            obj.chunk_hashes = message.chunkHashes.map(e => (0, helpers_1.base64FromBytes)(e));
        }
        else {
            obj.chunk_hashes = message.chunkHashes;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Metadata.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Metadata",
            value: exports.Metadata.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.Metadata.decode(message.value);
    },
    toProto(message) {
        return exports.Metadata.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.snapshots.v1.Metadata",
            value: exports.Metadata.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Metadata.typeUrl, exports.Metadata);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.Metadata.aminoType, exports.Metadata.typeUrl);
function createBaseSnapshotItem() {
    return {
        store: undefined,
        iavl: undefined,
        extension: undefined,
        extensionPayload: undefined
    };
}
exports.SnapshotItem = {
    typeUrl: "/cosmos.store.snapshots.v1.SnapshotItem",
    aminoType: "cosmos-sdk/SnapshotItem",
    is(o) {
        return o && o.$typeUrl === exports.SnapshotItem.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.SnapshotItem.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.SnapshotItem.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.store !== undefined) {
            exports.SnapshotStoreItem.encode(message.store, writer.uint32(10).fork()).ldelim();
        }
        if (message.iavl !== undefined) {
            exports.SnapshotIAVLItem.encode(message.iavl, writer.uint32(18).fork()).ldelim();
        }
        if (message.extension !== undefined) {
            exports.SnapshotExtensionMeta.encode(message.extension, writer.uint32(26).fork()).ldelim();
        }
        if (message.extensionPayload !== undefined) {
            exports.SnapshotExtensionPayload.encode(message.extensionPayload, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSnapshotItem();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.store = exports.SnapshotStoreItem.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.iavl = exports.SnapshotIAVLItem.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.extension = exports.SnapshotExtensionMeta.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.extensionPayload = exports.SnapshotExtensionPayload.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSnapshotItem();
        message.store = object.store !== undefined && object.store !== null ? exports.SnapshotStoreItem.fromPartial(object.store) : undefined;
        message.iavl = object.iavl !== undefined && object.iavl !== null ? exports.SnapshotIAVLItem.fromPartial(object.iavl) : undefined;
        message.extension = object.extension !== undefined && object.extension !== null ? exports.SnapshotExtensionMeta.fromPartial(object.extension) : undefined;
        message.extensionPayload = object.extensionPayload !== undefined && object.extensionPayload !== null ? exports.SnapshotExtensionPayload.fromPartial(object.extensionPayload) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseSnapshotItem();
        if (object.store !== undefined && object.store !== null) {
            message.store = exports.SnapshotStoreItem.fromAmino(object.store);
        }
        if (object.iavl !== undefined && object.iavl !== null) {
            message.iavl = exports.SnapshotIAVLItem.fromAmino(object.iavl);
        }
        if (object.extension !== undefined && object.extension !== null) {
            message.extension = exports.SnapshotExtensionMeta.fromAmino(object.extension);
        }
        if (object.extension_payload !== undefined && object.extension_payload !== null) {
            message.extensionPayload = exports.SnapshotExtensionPayload.fromAmino(object.extension_payload);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.store = message.store ? exports.SnapshotStoreItem.toAmino(message.store) : undefined;
        obj.iavl = message.iavl ? exports.SnapshotIAVLItem.toAmino(message.iavl) : undefined;
        obj.extension = message.extension ? exports.SnapshotExtensionMeta.toAmino(message.extension) : undefined;
        obj.extension_payload = message.extensionPayload ? exports.SnapshotExtensionPayload.toAmino(message.extensionPayload) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.SnapshotItem.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/SnapshotItem",
            value: exports.SnapshotItem.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.SnapshotItem.decode(message.value);
    },
    toProto(message) {
        return exports.SnapshotItem.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.snapshots.v1.SnapshotItem",
            value: exports.SnapshotItem.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.SnapshotItem.typeUrl, exports.SnapshotItem);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.SnapshotItem.aminoType, exports.SnapshotItem.typeUrl);
function createBaseSnapshotStoreItem() {
    return {
        name: ""
    };
}
exports.SnapshotStoreItem = {
    typeUrl: "/cosmos.store.snapshots.v1.SnapshotStoreItem",
    aminoType: "cosmos-sdk/SnapshotStoreItem",
    is(o) {
        return o && (o.$typeUrl === exports.SnapshotStoreItem.typeUrl || typeof o.name === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.SnapshotStoreItem.typeUrl || typeof o.name === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.SnapshotStoreItem.typeUrl || typeof o.name === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSnapshotStoreItem();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSnapshotStoreItem();
        message.name = object.name ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseSnapshotStoreItem();
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.name = message.name === "" ? undefined : message.name;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.SnapshotStoreItem.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/SnapshotStoreItem",
            value: exports.SnapshotStoreItem.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.SnapshotStoreItem.decode(message.value);
    },
    toProto(message) {
        return exports.SnapshotStoreItem.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.snapshots.v1.SnapshotStoreItem",
            value: exports.SnapshotStoreItem.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.SnapshotStoreItem.typeUrl, exports.SnapshotStoreItem);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.SnapshotStoreItem.aminoType, exports.SnapshotStoreItem.typeUrl);
function createBaseSnapshotIAVLItem() {
    return {
        key: new Uint8Array(),
        value: new Uint8Array(),
        version: BigInt(0),
        height: 0
    };
}
exports.SnapshotIAVLItem = {
    typeUrl: "/cosmos.store.snapshots.v1.SnapshotIAVLItem",
    aminoType: "cosmos-sdk/SnapshotIAVLItem",
    is(o) {
        return o && (o.$typeUrl === exports.SnapshotIAVLItem.typeUrl || (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string") && typeof o.version === "bigint" && typeof o.height === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.SnapshotIAVLItem.typeUrl || (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string") && typeof o.version === "bigint" && typeof o.height === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.SnapshotIAVLItem.typeUrl || (o.key instanceof Uint8Array || typeof o.key === "string") && (o.value instanceof Uint8Array || typeof o.value === "string") && typeof o.version === "bigint" && typeof o.height === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
        }
        if (message.version !== BigInt(0)) {
            writer.uint32(24).int64(message.version);
        }
        if (message.height !== 0) {
            writer.uint32(32).int32(message.height);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSnapshotIAVLItem();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.value = reader.bytes();
                    break;
                case 3:
                    message.version = reader.int64();
                    break;
                case 4:
                    message.height = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSnapshotIAVLItem();
        message.key = object.key ?? new Uint8Array();
        message.value = object.value ?? new Uint8Array();
        message.version = object.version !== undefined && object.version !== null ? BigInt(object.version.toString()) : BigInt(0);
        message.height = object.height ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseSnapshotIAVLItem();
        if (object.key !== undefined && object.key !== null) {
            message.key = (0, helpers_1.bytesFromBase64)(object.key);
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = (0, helpers_1.bytesFromBase64)(object.value);
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = BigInt(object.version);
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = object.height;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.key = message.key ? (0, helpers_1.base64FromBytes)(message.key) : undefined;
        obj.value = message.value ? (0, helpers_1.base64FromBytes)(message.value) : undefined;
        obj.version = message.version !== BigInt(0) ? message.version?.toString() : undefined;
        obj.height = message.height === 0 ? undefined : message.height;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.SnapshotIAVLItem.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/SnapshotIAVLItem",
            value: exports.SnapshotIAVLItem.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.SnapshotIAVLItem.decode(message.value);
    },
    toProto(message) {
        return exports.SnapshotIAVLItem.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.snapshots.v1.SnapshotIAVLItem",
            value: exports.SnapshotIAVLItem.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.SnapshotIAVLItem.typeUrl, exports.SnapshotIAVLItem);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.SnapshotIAVLItem.aminoType, exports.SnapshotIAVLItem.typeUrl);
function createBaseSnapshotExtensionMeta() {
    return {
        name: "",
        format: 0
    };
}
exports.SnapshotExtensionMeta = {
    typeUrl: "/cosmos.store.snapshots.v1.SnapshotExtensionMeta",
    aminoType: "cosmos-sdk/SnapshotExtensionMeta",
    is(o) {
        return o && (o.$typeUrl === exports.SnapshotExtensionMeta.typeUrl || typeof o.name === "string" && typeof o.format === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.SnapshotExtensionMeta.typeUrl || typeof o.name === "string" && typeof o.format === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.SnapshotExtensionMeta.typeUrl || typeof o.name === "string" && typeof o.format === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.format !== 0) {
            writer.uint32(16).uint32(message.format);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSnapshotExtensionMeta();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.format = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSnapshotExtensionMeta();
        message.name = object.name ?? "";
        message.format = object.format ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseSnapshotExtensionMeta();
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        if (object.format !== undefined && object.format !== null) {
            message.format = object.format;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.name = message.name === "" ? undefined : message.name;
        obj.format = message.format === 0 ? undefined : message.format;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.SnapshotExtensionMeta.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/SnapshotExtensionMeta",
            value: exports.SnapshotExtensionMeta.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.SnapshotExtensionMeta.decode(message.value);
    },
    toProto(message) {
        return exports.SnapshotExtensionMeta.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.snapshots.v1.SnapshotExtensionMeta",
            value: exports.SnapshotExtensionMeta.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.SnapshotExtensionMeta.typeUrl, exports.SnapshotExtensionMeta);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.SnapshotExtensionMeta.aminoType, exports.SnapshotExtensionMeta.typeUrl);
function createBaseSnapshotExtensionPayload() {
    return {
        payload: new Uint8Array()
    };
}
exports.SnapshotExtensionPayload = {
    typeUrl: "/cosmos.store.snapshots.v1.SnapshotExtensionPayload",
    aminoType: "cosmos-sdk/SnapshotExtensionPayload",
    is(o) {
        return o && (o.$typeUrl === exports.SnapshotExtensionPayload.typeUrl || o.payload instanceof Uint8Array || typeof o.payload === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.SnapshotExtensionPayload.typeUrl || o.payload instanceof Uint8Array || typeof o.payload === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.SnapshotExtensionPayload.typeUrl || o.payload instanceof Uint8Array || typeof o.payload === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.payload.length !== 0) {
            writer.uint32(10).bytes(message.payload);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSnapshotExtensionPayload();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.payload = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSnapshotExtensionPayload();
        message.payload = object.payload ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseSnapshotExtensionPayload();
        if (object.payload !== undefined && object.payload !== null) {
            message.payload = (0, helpers_1.bytesFromBase64)(object.payload);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.payload = message.payload ? (0, helpers_1.base64FromBytes)(message.payload) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.SnapshotExtensionPayload.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/SnapshotExtensionPayload",
            value: exports.SnapshotExtensionPayload.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.SnapshotExtensionPayload.decode(message.value);
    },
    toProto(message) {
        return exports.SnapshotExtensionPayload.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.store.snapshots.v1.SnapshotExtensionPayload",
            value: exports.SnapshotExtensionPayload.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.SnapshotExtensionPayload.typeUrl, exports.SnapshotExtensionPayload);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.SnapshotExtensionPayload.aminoType, exports.SnapshotExtensionPayload.typeUrl);
