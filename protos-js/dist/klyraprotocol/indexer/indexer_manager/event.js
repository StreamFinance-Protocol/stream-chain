"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerTendermintBlock = exports.IndexerTendermintEvent = exports.IndexerEventsStoreValue = exports.IndexerTendermintEventWrapper = exports.IndexerTendermintEvent_BlockEventAmino = exports.IndexerTendermintEvent_BlockEventSDKType = exports.IndexerTendermintEvent_BlockEvent = void 0;
exports.indexerTendermintEvent_BlockEventFromJSON = indexerTendermintEvent_BlockEventFromJSON;
exports.indexerTendermintEvent_BlockEventToJSON = indexerTendermintEvent_BlockEventToJSON;
//@ts-nocheck
const timestamp_1 = require("../../../google/protobuf/timestamp");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
const helpers_1 = require("../../../helpers");
/** enum to specify that the IndexerTendermintEvent is a block event. */
var IndexerTendermintEvent_BlockEvent;
(function (IndexerTendermintEvent_BlockEvent) {
    /** BLOCK_EVENT_UNSPECIFIED - Default value. This value is invalid and unused. */
    IndexerTendermintEvent_BlockEvent[IndexerTendermintEvent_BlockEvent["BLOCK_EVENT_UNSPECIFIED"] = 0] = "BLOCK_EVENT_UNSPECIFIED";
    /**
     * BLOCK_EVENT_BEGIN_BLOCK - BLOCK_EVENT_BEGIN_BLOCK indicates that the event was generated during
     * BeginBlock.
     */
    IndexerTendermintEvent_BlockEvent[IndexerTendermintEvent_BlockEvent["BLOCK_EVENT_BEGIN_BLOCK"] = 1] = "BLOCK_EVENT_BEGIN_BLOCK";
    /**
     * BLOCK_EVENT_END_BLOCK - BLOCK_EVENT_END_BLOCK indicates that the event was generated during
     * EndBlock.
     */
    IndexerTendermintEvent_BlockEvent[IndexerTendermintEvent_BlockEvent["BLOCK_EVENT_END_BLOCK"] = 2] = "BLOCK_EVENT_END_BLOCK";
    IndexerTendermintEvent_BlockEvent[IndexerTendermintEvent_BlockEvent["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(IndexerTendermintEvent_BlockEvent || (exports.IndexerTendermintEvent_BlockEvent = IndexerTendermintEvent_BlockEvent = {}));
exports.IndexerTendermintEvent_BlockEventSDKType = IndexerTendermintEvent_BlockEvent;
exports.IndexerTendermintEvent_BlockEventAmino = IndexerTendermintEvent_BlockEvent;
function indexerTendermintEvent_BlockEventFromJSON(object) {
    switch (object) {
        case 0:
        case "BLOCK_EVENT_UNSPECIFIED":
            return IndexerTendermintEvent_BlockEvent.BLOCK_EVENT_UNSPECIFIED;
        case 1:
        case "BLOCK_EVENT_BEGIN_BLOCK":
            return IndexerTendermintEvent_BlockEvent.BLOCK_EVENT_BEGIN_BLOCK;
        case 2:
        case "BLOCK_EVENT_END_BLOCK":
            return IndexerTendermintEvent_BlockEvent.BLOCK_EVENT_END_BLOCK;
        case -1:
        case "UNRECOGNIZED":
        default:
            return IndexerTendermintEvent_BlockEvent.UNRECOGNIZED;
    }
}
function indexerTendermintEvent_BlockEventToJSON(object) {
    switch (object) {
        case IndexerTendermintEvent_BlockEvent.BLOCK_EVENT_UNSPECIFIED:
            return "BLOCK_EVENT_UNSPECIFIED";
        case IndexerTendermintEvent_BlockEvent.BLOCK_EVENT_BEGIN_BLOCK:
            return "BLOCK_EVENT_BEGIN_BLOCK";
        case IndexerTendermintEvent_BlockEvent.BLOCK_EVENT_END_BLOCK:
            return "BLOCK_EVENT_END_BLOCK";
        case IndexerTendermintEvent_BlockEvent.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseIndexerTendermintEventWrapper() {
    return {
        event: undefined,
        txnHash: ""
    };
}
exports.IndexerTendermintEventWrapper = {
    typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintEventWrapper",
    is(o) {
        return o && (o.$typeUrl === exports.IndexerTendermintEventWrapper.typeUrl || typeof o.txnHash === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.IndexerTendermintEventWrapper.typeUrl || typeof o.txn_hash === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.IndexerTendermintEventWrapper.typeUrl || typeof o.txn_hash === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.event !== undefined) {
            exports.IndexerTendermintEvent.encode(message.event, writer.uint32(10).fork()).ldelim();
        }
        if (message.txnHash !== "") {
            writer.uint32(18).string(message.txnHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIndexerTendermintEventWrapper();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.event = exports.IndexerTendermintEvent.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.txnHash = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseIndexerTendermintEventWrapper();
        message.event = object.event !== undefined && object.event !== null ? exports.IndexerTendermintEvent.fromPartial(object.event) : undefined;
        message.txnHash = object.txnHash ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseIndexerTendermintEventWrapper();
        if (object.event !== undefined && object.event !== null) {
            message.event = exports.IndexerTendermintEvent.fromAmino(object.event);
        }
        if (object.txn_hash !== undefined && object.txn_hash !== null) {
            message.txnHash = object.txn_hash;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.event = message.event ? exports.IndexerTendermintEvent.toAmino(message.event) : undefined;
        obj.txn_hash = message.txnHash === "" ? undefined : message.txnHash;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.IndexerTendermintEventWrapper.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.IndexerTendermintEventWrapper.decode(message.value);
    },
    toProto(message) {
        return exports.IndexerTendermintEventWrapper.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintEventWrapper",
            value: exports.IndexerTendermintEventWrapper.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.IndexerTendermintEventWrapper.typeUrl, exports.IndexerTendermintEventWrapper);
function createBaseIndexerEventsStoreValue() {
    return {
        events: []
    };
}
exports.IndexerEventsStoreValue = {
    typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerEventsStoreValue",
    is(o) {
        return o && (o.$typeUrl === exports.IndexerEventsStoreValue.typeUrl || Array.isArray(o.events) && (!o.events.length || exports.IndexerTendermintEventWrapper.is(o.events[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.IndexerEventsStoreValue.typeUrl || Array.isArray(o.events) && (!o.events.length || exports.IndexerTendermintEventWrapper.isSDK(o.events[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.IndexerEventsStoreValue.typeUrl || Array.isArray(o.events) && (!o.events.length || exports.IndexerTendermintEventWrapper.isAmino(o.events[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.events) {
            exports.IndexerTendermintEventWrapper.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIndexerEventsStoreValue();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.events.push(exports.IndexerTendermintEventWrapper.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseIndexerEventsStoreValue();
        message.events = object.events?.map(e => exports.IndexerTendermintEventWrapper.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseIndexerEventsStoreValue();
        message.events = object.events?.map(e => exports.IndexerTendermintEventWrapper.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.events) {
            obj.events = message.events.map(e => e ? exports.IndexerTendermintEventWrapper.toAmino(e) : undefined);
        }
        else {
            obj.events = message.events;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.IndexerEventsStoreValue.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.IndexerEventsStoreValue.decode(message.value);
    },
    toProto(message) {
        return exports.IndexerEventsStoreValue.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerEventsStoreValue",
            value: exports.IndexerEventsStoreValue.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.IndexerEventsStoreValue.typeUrl, exports.IndexerEventsStoreValue);
function createBaseIndexerTendermintEvent() {
    return {
        subtype: "",
        transactionIndex: undefined,
        blockEvent: undefined,
        eventIndex: 0,
        version: 0,
        dataBytes: new Uint8Array()
    };
}
exports.IndexerTendermintEvent = {
    typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintEvent",
    is(o) {
        return o && (o.$typeUrl === exports.IndexerTendermintEvent.typeUrl || typeof o.subtype === "string" && typeof o.eventIndex === "number" && typeof o.version === "number" && (o.dataBytes instanceof Uint8Array || typeof o.dataBytes === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.IndexerTendermintEvent.typeUrl || typeof o.subtype === "string" && typeof o.event_index === "number" && typeof o.version === "number" && (o.data_bytes instanceof Uint8Array || typeof o.data_bytes === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.IndexerTendermintEvent.typeUrl || typeof o.subtype === "string" && typeof o.event_index === "number" && typeof o.version === "number" && (o.data_bytes instanceof Uint8Array || typeof o.data_bytes === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.subtype !== "") {
            writer.uint32(10).string(message.subtype);
        }
        if (message.transactionIndex !== undefined) {
            writer.uint32(24).uint32(message.transactionIndex);
        }
        if (message.blockEvent !== undefined) {
            writer.uint32(32).int32(message.blockEvent);
        }
        if (message.eventIndex !== 0) {
            writer.uint32(40).uint32(message.eventIndex);
        }
        if (message.version !== 0) {
            writer.uint32(48).uint32(message.version);
        }
        if (message.dataBytes.length !== 0) {
            writer.uint32(58).bytes(message.dataBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIndexerTendermintEvent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subtype = reader.string();
                    break;
                case 3:
                    message.transactionIndex = reader.uint32();
                    break;
                case 4:
                    message.blockEvent = reader.int32();
                    break;
                case 5:
                    message.eventIndex = reader.uint32();
                    break;
                case 6:
                    message.version = reader.uint32();
                    break;
                case 7:
                    message.dataBytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseIndexerTendermintEvent();
        message.subtype = object.subtype ?? "";
        message.transactionIndex = object.transactionIndex ?? undefined;
        message.blockEvent = object.blockEvent ?? undefined;
        message.eventIndex = object.eventIndex ?? 0;
        message.version = object.version ?? 0;
        message.dataBytes = object.dataBytes ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseIndexerTendermintEvent();
        if (object.subtype !== undefined && object.subtype !== null) {
            message.subtype = object.subtype;
        }
        if (object.transaction_index !== undefined && object.transaction_index !== null) {
            message.transactionIndex = object.transaction_index;
        }
        if (object.block_event !== undefined && object.block_event !== null) {
            message.blockEvent = object.block_event;
        }
        if (object.event_index !== undefined && object.event_index !== null) {
            message.eventIndex = object.event_index;
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = object.version;
        }
        if (object.data_bytes !== undefined && object.data_bytes !== null) {
            message.dataBytes = (0, helpers_1.bytesFromBase64)(object.data_bytes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.subtype = message.subtype === "" ? undefined : message.subtype;
        obj.transaction_index = message.transactionIndex === null ? undefined : message.transactionIndex;
        obj.block_event = message.blockEvent === null ? undefined : message.blockEvent;
        obj.event_index = message.eventIndex === 0 ? undefined : message.eventIndex;
        obj.version = message.version === 0 ? undefined : message.version;
        obj.data_bytes = message.dataBytes ? (0, helpers_1.base64FromBytes)(message.dataBytes) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.IndexerTendermintEvent.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.IndexerTendermintEvent.decode(message.value);
    },
    toProto(message) {
        return exports.IndexerTendermintEvent.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintEvent",
            value: exports.IndexerTendermintEvent.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.IndexerTendermintEvent.typeUrl, exports.IndexerTendermintEvent);
function createBaseIndexerTendermintBlock() {
    return {
        height: 0,
        time: new Date(),
        events: [],
        txHashes: []
    };
}
exports.IndexerTendermintBlock = {
    typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintBlock",
    is(o) {
        return o && (o.$typeUrl === exports.IndexerTendermintBlock.typeUrl || typeof o.height === "number" && timestamp_1.Timestamp.is(o.time) && Array.isArray(o.events) && (!o.events.length || exports.IndexerTendermintEvent.is(o.events[0])) && Array.isArray(o.txHashes) && (!o.txHashes.length || typeof o.txHashes[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.IndexerTendermintBlock.typeUrl || typeof o.height === "number" && timestamp_1.Timestamp.isSDK(o.time) && Array.isArray(o.events) && (!o.events.length || exports.IndexerTendermintEvent.isSDK(o.events[0])) && Array.isArray(o.tx_hashes) && (!o.tx_hashes.length || typeof o.tx_hashes[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.IndexerTendermintBlock.typeUrl || typeof o.height === "number" && timestamp_1.Timestamp.isAmino(o.time) && Array.isArray(o.events) && (!o.events.length || exports.IndexerTendermintEvent.isAmino(o.events[0])) && Array.isArray(o.tx_hashes) && (!o.tx_hashes.length || typeof o.tx_hashes[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.height !== 0) {
            writer.uint32(8).uint32(message.height);
        }
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.time), writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.events) {
            exports.IndexerTendermintEvent.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.txHashes) {
            writer.uint32(34).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIndexerTendermintBlock();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.uint32();
                    break;
                case 2:
                    message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.events.push(exports.IndexerTendermintEvent.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.txHashes.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseIndexerTendermintBlock();
        message.height = object.height ?? 0;
        message.time = object.time ?? undefined;
        message.events = object.events?.map(e => exports.IndexerTendermintEvent.fromPartial(e)) || [];
        message.txHashes = object.txHashes?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseIndexerTendermintBlock();
        if (object.height !== undefined && object.height !== null) {
            message.height = object.height;
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.time));
        }
        message.events = object.events?.map(e => exports.IndexerTendermintEvent.fromAmino(e)) || [];
        message.txHashes = object.tx_hashes?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.height = message.height === 0 ? undefined : message.height;
        obj.time = message.time ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.time)) : undefined;
        if (message.events) {
            obj.events = message.events.map(e => e ? exports.IndexerTendermintEvent.toAmino(e) : undefined);
        }
        else {
            obj.events = message.events;
        }
        if (message.txHashes) {
            obj.tx_hashes = message.txHashes.map(e => e);
        }
        else {
            obj.tx_hashes = message.txHashes;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.IndexerTendermintBlock.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.IndexerTendermintBlock.decode(message.value);
    },
    toProto(message) {
        return exports.IndexerTendermintBlock.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintBlock",
            value: exports.IndexerTendermintBlock.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.IndexerTendermintBlock.typeUrl, exports.IndexerTendermintBlock);
