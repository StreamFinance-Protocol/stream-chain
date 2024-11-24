"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxDecodeAminoResponse = exports.TxDecodeAminoRequest = exports.TxEncodeAminoResponse = exports.TxEncodeAminoRequest = exports.TxEncodeResponse = exports.TxEncodeRequest = exports.TxDecodeResponse = exports.TxDecodeRequest = exports.GetBlockWithTxsResponse = exports.GetBlockWithTxsRequest = exports.GetTxResponse = exports.GetTxRequest = exports.SimulateResponse = exports.SimulateRequest = exports.BroadcastTxResponse = exports.BroadcastTxRequest = exports.GetTxsEventResponse = exports.GetTxsEventRequest = exports.BroadcastModeAmino = exports.BroadcastModeSDKType = exports.BroadcastMode = exports.OrderByAmino = exports.OrderBySDKType = exports.OrderBy = void 0;
exports.orderByFromJSON = orderByFromJSON;
exports.orderByToJSON = orderByToJSON;
exports.broadcastModeFromJSON = broadcastModeFromJSON;
exports.broadcastModeToJSON = broadcastModeToJSON;
//@ts-nocheck
const tx_1 = require("./tx");
const pagination_1 = require("../../base/query/v1beta1/pagination");
const abci_1 = require("../../base/abci/v1beta1/abci");
const types_1 = require("../../../tendermint/types/types");
const block_1 = require("../../../tendermint/types/block");
const helpers_1 = require("../../../helpers");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
/** OrderBy defines the sorting order */
var OrderBy;
(function (OrderBy) {
    /**
     * ORDER_BY_UNSPECIFIED - ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults
     * to ASC in this case.
     */
    OrderBy[OrderBy["ORDER_BY_UNSPECIFIED"] = 0] = "ORDER_BY_UNSPECIFIED";
    /** ORDER_BY_ASC - ORDER_BY_ASC defines ascending order */
    OrderBy[OrderBy["ORDER_BY_ASC"] = 1] = "ORDER_BY_ASC";
    /** ORDER_BY_DESC - ORDER_BY_DESC defines descending order */
    OrderBy[OrderBy["ORDER_BY_DESC"] = 2] = "ORDER_BY_DESC";
    OrderBy[OrderBy["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OrderBy || (exports.OrderBy = OrderBy = {}));
exports.OrderBySDKType = OrderBy;
exports.OrderByAmino = OrderBy;
function orderByFromJSON(object) {
    switch (object) {
        case 0:
        case "ORDER_BY_UNSPECIFIED":
            return OrderBy.ORDER_BY_UNSPECIFIED;
        case 1:
        case "ORDER_BY_ASC":
            return OrderBy.ORDER_BY_ASC;
        case 2:
        case "ORDER_BY_DESC":
            return OrderBy.ORDER_BY_DESC;
        case -1:
        case "UNRECOGNIZED":
        default:
            return OrderBy.UNRECOGNIZED;
    }
}
function orderByToJSON(object) {
    switch (object) {
        case OrderBy.ORDER_BY_UNSPECIFIED:
            return "ORDER_BY_UNSPECIFIED";
        case OrderBy.ORDER_BY_ASC:
            return "ORDER_BY_ASC";
        case OrderBy.ORDER_BY_DESC:
            return "ORDER_BY_DESC";
        case OrderBy.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/**
 * BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC
 * method.
 */
var BroadcastMode;
(function (BroadcastMode) {
    /** BROADCAST_MODE_UNSPECIFIED - zero-value for mode ordering */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_UNSPECIFIED"] = 0] = "BROADCAST_MODE_UNSPECIFIED";
    /**
     * BROADCAST_MODE_BLOCK - DEPRECATED: use BROADCAST_MODE_SYNC instead,
     * BROADCAST_MODE_BLOCK is not supported by the SDK from v0.47.x onwards.
     */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_BLOCK"] = 1] = "BROADCAST_MODE_BLOCK";
    /**
     * BROADCAST_MODE_SYNC - BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits
     * for a CheckTx execution response only.
     */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_SYNC"] = 2] = "BROADCAST_MODE_SYNC";
    /**
     * BROADCAST_MODE_ASYNC - BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client
     * returns immediately.
     */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_ASYNC"] = 3] = "BROADCAST_MODE_ASYNC";
    BroadcastMode[BroadcastMode["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(BroadcastMode || (exports.BroadcastMode = BroadcastMode = {}));
exports.BroadcastModeSDKType = BroadcastMode;
exports.BroadcastModeAmino = BroadcastMode;
function broadcastModeFromJSON(object) {
    switch (object) {
        case 0:
        case "BROADCAST_MODE_UNSPECIFIED":
            return BroadcastMode.BROADCAST_MODE_UNSPECIFIED;
        case 1:
        case "BROADCAST_MODE_BLOCK":
            return BroadcastMode.BROADCAST_MODE_BLOCK;
        case 2:
        case "BROADCAST_MODE_SYNC":
            return BroadcastMode.BROADCAST_MODE_SYNC;
        case 3:
        case "BROADCAST_MODE_ASYNC":
            return BroadcastMode.BROADCAST_MODE_ASYNC;
        case -1:
        case "UNRECOGNIZED":
        default:
            return BroadcastMode.UNRECOGNIZED;
    }
}
function broadcastModeToJSON(object) {
    switch (object) {
        case BroadcastMode.BROADCAST_MODE_UNSPECIFIED:
            return "BROADCAST_MODE_UNSPECIFIED";
        case BroadcastMode.BROADCAST_MODE_BLOCK:
            return "BROADCAST_MODE_BLOCK";
        case BroadcastMode.BROADCAST_MODE_SYNC:
            return "BROADCAST_MODE_SYNC";
        case BroadcastMode.BROADCAST_MODE_ASYNC:
            return "BROADCAST_MODE_ASYNC";
        case BroadcastMode.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseGetTxsEventRequest() {
    return {
        events: [],
        pagination: undefined,
        orderBy: 0,
        page: BigInt(0),
        limit: BigInt(0),
        query: ""
    };
}
exports.GetTxsEventRequest = {
    typeUrl: "/cosmos.tx.v1beta1.GetTxsEventRequest",
    aminoType: "cosmos-sdk/GetTxsEventRequest",
    is(o) {
        return o && (o.$typeUrl === exports.GetTxsEventRequest.typeUrl || Array.isArray(o.events) && (!o.events.length || typeof o.events[0] === "string") && (0, helpers_1.isSet)(o.orderBy) && typeof o.page === "bigint" && typeof o.limit === "bigint" && typeof o.query === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GetTxsEventRequest.typeUrl || Array.isArray(o.events) && (!o.events.length || typeof o.events[0] === "string") && (0, helpers_1.isSet)(o.order_by) && typeof o.page === "bigint" && typeof o.limit === "bigint" && typeof o.query === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GetTxsEventRequest.typeUrl || Array.isArray(o.events) && (!o.events.length || typeof o.events[0] === "string") && (0, helpers_1.isSet)(o.order_by) && typeof o.page === "bigint" && typeof o.limit === "bigint" && typeof o.query === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.events) {
            writer.uint32(10).string(v);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.orderBy !== 0) {
            writer.uint32(24).int32(message.orderBy);
        }
        if (message.page !== BigInt(0)) {
            writer.uint32(32).uint64(message.page);
        }
        if (message.limit !== BigInt(0)) {
            writer.uint32(40).uint64(message.limit);
        }
        if (message.query !== "") {
            writer.uint32(50).string(message.query);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxsEventRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.events.push(reader.string());
                    break;
                case 2:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.orderBy = reader.int32();
                    break;
                case 4:
                    message.page = reader.uint64();
                    break;
                case 5:
                    message.limit = reader.uint64();
                    break;
                case 6:
                    message.query = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetTxsEventRequest();
        message.events = object.events?.map(e => e) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        message.orderBy = object.orderBy ?? 0;
        message.page = object.page !== undefined && object.page !== null ? BigInt(object.page.toString()) : BigInt(0);
        message.limit = object.limit !== undefined && object.limit !== null ? BigInt(object.limit.toString()) : BigInt(0);
        message.query = object.query ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetTxsEventRequest();
        message.events = object.events?.map(e => e) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        if (object.order_by !== undefined && object.order_by !== null) {
            message.orderBy = object.order_by;
        }
        if (object.page !== undefined && object.page !== null) {
            message.page = BigInt(object.page);
        }
        if (object.limit !== undefined && object.limit !== null) {
            message.limit = BigInt(object.limit);
        }
        if (object.query !== undefined && object.query !== null) {
            message.query = object.query;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.events) {
            obj.events = message.events.map(e => e);
        }
        else {
            obj.events = message.events;
        }
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        obj.order_by = message.orderBy === 0 ? undefined : message.orderBy;
        obj.page = message.page !== BigInt(0) ? message.page?.toString() : undefined;
        obj.limit = message.limit !== BigInt(0) ? message.limit?.toString() : undefined;
        obj.query = message.query === "" ? undefined : message.query;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetTxsEventRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetTxsEventRequest",
            value: exports.GetTxsEventRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GetTxsEventRequest.decode(message.value);
    },
    toProto(message) {
        return exports.GetTxsEventRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetTxsEventRequest",
            value: exports.GetTxsEventRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetTxsEventRequest.typeUrl, exports.GetTxsEventRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GetTxsEventRequest.aminoType, exports.GetTxsEventRequest.typeUrl);
function createBaseGetTxsEventResponse() {
    return {
        txs: [],
        txResponses: [],
        pagination: undefined,
        total: BigInt(0)
    };
}
exports.GetTxsEventResponse = {
    typeUrl: "/cosmos.tx.v1beta1.GetTxsEventResponse",
    aminoType: "cosmos-sdk/GetTxsEventResponse",
    is(o) {
        return o && (o.$typeUrl === exports.GetTxsEventResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || tx_1.Tx.is(o.txs[0])) && Array.isArray(o.txResponses) && (!o.txResponses.length || abci_1.TxResponse.is(o.txResponses[0])) && typeof o.total === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GetTxsEventResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || tx_1.Tx.isSDK(o.txs[0])) && Array.isArray(o.tx_responses) && (!o.tx_responses.length || abci_1.TxResponse.isSDK(o.tx_responses[0])) && typeof o.total === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GetTxsEventResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || tx_1.Tx.isAmino(o.txs[0])) && Array.isArray(o.tx_responses) && (!o.tx_responses.length || abci_1.TxResponse.isAmino(o.tx_responses[0])) && typeof o.total === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.txs) {
            tx_1.Tx.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.txResponses) {
            abci_1.TxResponse.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        if (message.total !== BigInt(0)) {
            writer.uint32(32).uint64(message.total);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxsEventResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txs.push(tx_1.Tx.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.txResponses.push(abci_1.TxResponse.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.total = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetTxsEventResponse();
        message.txs = object.txs?.map(e => tx_1.Tx.fromPartial(e)) || [];
        message.txResponses = object.txResponses?.map(e => abci_1.TxResponse.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        message.total = object.total !== undefined && object.total !== null ? BigInt(object.total.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetTxsEventResponse();
        message.txs = object.txs?.map(e => tx_1.Tx.fromAmino(e)) || [];
        message.txResponses = object.tx_responses?.map(e => abci_1.TxResponse.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        if (object.total !== undefined && object.total !== null) {
            message.total = BigInt(object.total);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.txs) {
            obj.txs = message.txs.map(e => e ? tx_1.Tx.toAmino(e) : undefined);
        }
        else {
            obj.txs = message.txs;
        }
        if (message.txResponses) {
            obj.tx_responses = message.txResponses.map(e => e ? abci_1.TxResponse.toAmino(e) : undefined);
        }
        else {
            obj.tx_responses = message.txResponses;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        obj.total = message.total !== BigInt(0) ? message.total?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetTxsEventResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetTxsEventResponse",
            value: exports.GetTxsEventResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GetTxsEventResponse.decode(message.value);
    },
    toProto(message) {
        return exports.GetTxsEventResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetTxsEventResponse",
            value: exports.GetTxsEventResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetTxsEventResponse.typeUrl, exports.GetTxsEventResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GetTxsEventResponse.aminoType, exports.GetTxsEventResponse.typeUrl);
function createBaseBroadcastTxRequest() {
    return {
        txBytes: new Uint8Array(),
        mode: 0
    };
}
exports.BroadcastTxRequest = {
    typeUrl: "/cosmos.tx.v1beta1.BroadcastTxRequest",
    aminoType: "cosmos-sdk/BroadcastTxRequest",
    is(o) {
        return o && (o.$typeUrl === exports.BroadcastTxRequest.typeUrl || (o.txBytes instanceof Uint8Array || typeof o.txBytes === "string") && (0, helpers_1.isSet)(o.mode));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.BroadcastTxRequest.typeUrl || (o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string") && (0, helpers_1.isSet)(o.mode));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.BroadcastTxRequest.typeUrl || (o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string") && (0, helpers_1.isSet)(o.mode));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.txBytes.length !== 0) {
            writer.uint32(10).bytes(message.txBytes);
        }
        if (message.mode !== 0) {
            writer.uint32(16).int32(message.mode);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBroadcastTxRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txBytes = reader.bytes();
                    break;
                case 2:
                    message.mode = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseBroadcastTxRequest();
        message.txBytes = object.txBytes ?? new Uint8Array();
        message.mode = object.mode ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseBroadcastTxRequest();
        if (object.tx_bytes !== undefined && object.tx_bytes !== null) {
            message.txBytes = (0, helpers_1.bytesFromBase64)(object.tx_bytes);
        }
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = object.mode;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx_bytes = message.txBytes ? (0, helpers_1.base64FromBytes)(message.txBytes) : undefined;
        obj.mode = message.mode === 0 ? undefined : message.mode;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.BroadcastTxRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/BroadcastTxRequest",
            value: exports.BroadcastTxRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.BroadcastTxRequest.decode(message.value);
    },
    toProto(message) {
        return exports.BroadcastTxRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.BroadcastTxRequest",
            value: exports.BroadcastTxRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.BroadcastTxRequest.typeUrl, exports.BroadcastTxRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.BroadcastTxRequest.aminoType, exports.BroadcastTxRequest.typeUrl);
function createBaseBroadcastTxResponse() {
    return {
        txResponse: undefined
    };
}
exports.BroadcastTxResponse = {
    typeUrl: "/cosmos.tx.v1beta1.BroadcastTxResponse",
    aminoType: "cosmos-sdk/BroadcastTxResponse",
    is(o) {
        return o && o.$typeUrl === exports.BroadcastTxResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.BroadcastTxResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.BroadcastTxResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.txResponse !== undefined) {
            abci_1.TxResponse.encode(message.txResponse, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBroadcastTxResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txResponse = abci_1.TxResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseBroadcastTxResponse();
        message.txResponse = object.txResponse !== undefined && object.txResponse !== null ? abci_1.TxResponse.fromPartial(object.txResponse) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseBroadcastTxResponse();
        if (object.tx_response !== undefined && object.tx_response !== null) {
            message.txResponse = abci_1.TxResponse.fromAmino(object.tx_response);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx_response = message.txResponse ? abci_1.TxResponse.toAmino(message.txResponse) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.BroadcastTxResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/BroadcastTxResponse",
            value: exports.BroadcastTxResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.BroadcastTxResponse.decode(message.value);
    },
    toProto(message) {
        return exports.BroadcastTxResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.BroadcastTxResponse",
            value: exports.BroadcastTxResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.BroadcastTxResponse.typeUrl, exports.BroadcastTxResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.BroadcastTxResponse.aminoType, exports.BroadcastTxResponse.typeUrl);
function createBaseSimulateRequest() {
    return {
        tx: undefined,
        txBytes: new Uint8Array()
    };
}
exports.SimulateRequest = {
    typeUrl: "/cosmos.tx.v1beta1.SimulateRequest",
    aminoType: "cosmos-sdk/SimulateRequest",
    is(o) {
        return o && (o.$typeUrl === exports.SimulateRequest.typeUrl || o.txBytes instanceof Uint8Array || typeof o.txBytes === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.SimulateRequest.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.SimulateRequest.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.tx !== undefined) {
            tx_1.Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        if (message.txBytes.length !== 0) {
            writer.uint32(18).bytes(message.txBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSimulateRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = tx_1.Tx.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.txBytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSimulateRequest();
        message.tx = object.tx !== undefined && object.tx !== null ? tx_1.Tx.fromPartial(object.tx) : undefined;
        message.txBytes = object.txBytes ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseSimulateRequest();
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = tx_1.Tx.fromAmino(object.tx);
        }
        if (object.tx_bytes !== undefined && object.tx_bytes !== null) {
            message.txBytes = (0, helpers_1.bytesFromBase64)(object.tx_bytes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx = message.tx ? tx_1.Tx.toAmino(message.tx) : undefined;
        obj.tx_bytes = message.txBytes ? (0, helpers_1.base64FromBytes)(message.txBytes) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.SimulateRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/SimulateRequest",
            value: exports.SimulateRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.SimulateRequest.decode(message.value);
    },
    toProto(message) {
        return exports.SimulateRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.SimulateRequest",
            value: exports.SimulateRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.SimulateRequest.typeUrl, exports.SimulateRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.SimulateRequest.aminoType, exports.SimulateRequest.typeUrl);
function createBaseSimulateResponse() {
    return {
        gasInfo: undefined,
        result: undefined
    };
}
exports.SimulateResponse = {
    typeUrl: "/cosmos.tx.v1beta1.SimulateResponse",
    aminoType: "cosmos-sdk/SimulateResponse",
    is(o) {
        return o && o.$typeUrl === exports.SimulateResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.SimulateResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.SimulateResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.gasInfo !== undefined) {
            abci_1.GasInfo.encode(message.gasInfo, writer.uint32(10).fork()).ldelim();
        }
        if (message.result !== undefined) {
            abci_1.Result.encode(message.result, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSimulateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.gasInfo = abci_1.GasInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = abci_1.Result.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseSimulateResponse();
        message.gasInfo = object.gasInfo !== undefined && object.gasInfo !== null ? abci_1.GasInfo.fromPartial(object.gasInfo) : undefined;
        message.result = object.result !== undefined && object.result !== null ? abci_1.Result.fromPartial(object.result) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseSimulateResponse();
        if (object.gas_info !== undefined && object.gas_info !== null) {
            message.gasInfo = abci_1.GasInfo.fromAmino(object.gas_info);
        }
        if (object.result !== undefined && object.result !== null) {
            message.result = abci_1.Result.fromAmino(object.result);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.gas_info = message.gasInfo ? abci_1.GasInfo.toAmino(message.gasInfo) : undefined;
        obj.result = message.result ? abci_1.Result.toAmino(message.result) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.SimulateResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/SimulateResponse",
            value: exports.SimulateResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.SimulateResponse.decode(message.value);
    },
    toProto(message) {
        return exports.SimulateResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.SimulateResponse",
            value: exports.SimulateResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.SimulateResponse.typeUrl, exports.SimulateResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.SimulateResponse.aminoType, exports.SimulateResponse.typeUrl);
function createBaseGetTxRequest() {
    return {
        hash: ""
    };
}
exports.GetTxRequest = {
    typeUrl: "/cosmos.tx.v1beta1.GetTxRequest",
    aminoType: "cosmos-sdk/GetTxRequest",
    is(o) {
        return o && (o.$typeUrl === exports.GetTxRequest.typeUrl || typeof o.hash === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GetTxRequest.typeUrl || typeof o.hash === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GetTxRequest.typeUrl || typeof o.hash === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.hash !== "") {
            writer.uint32(10).string(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetTxRequest();
        message.hash = object.hash ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetTxRequest();
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = object.hash;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.hash = message.hash === "" ? undefined : message.hash;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetTxRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetTxRequest",
            value: exports.GetTxRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GetTxRequest.decode(message.value);
    },
    toProto(message) {
        return exports.GetTxRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetTxRequest",
            value: exports.GetTxRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetTxRequest.typeUrl, exports.GetTxRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GetTxRequest.aminoType, exports.GetTxRequest.typeUrl);
function createBaseGetTxResponse() {
    return {
        tx: undefined,
        txResponse: undefined
    };
}
exports.GetTxResponse = {
    typeUrl: "/cosmos.tx.v1beta1.GetTxResponse",
    aminoType: "cosmos-sdk/GetTxResponse",
    is(o) {
        return o && o.$typeUrl === exports.GetTxResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.GetTxResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.GetTxResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.tx !== undefined) {
            tx_1.Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        if (message.txResponse !== undefined) {
            abci_1.TxResponse.encode(message.txResponse, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = tx_1.Tx.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.txResponse = abci_1.TxResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetTxResponse();
        message.tx = object.tx !== undefined && object.tx !== null ? tx_1.Tx.fromPartial(object.tx) : undefined;
        message.txResponse = object.txResponse !== undefined && object.txResponse !== null ? abci_1.TxResponse.fromPartial(object.txResponse) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetTxResponse();
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = tx_1.Tx.fromAmino(object.tx);
        }
        if (object.tx_response !== undefined && object.tx_response !== null) {
            message.txResponse = abci_1.TxResponse.fromAmino(object.tx_response);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx = message.tx ? tx_1.Tx.toAmino(message.tx) : undefined;
        obj.tx_response = message.txResponse ? abci_1.TxResponse.toAmino(message.txResponse) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetTxResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetTxResponse",
            value: exports.GetTxResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GetTxResponse.decode(message.value);
    },
    toProto(message) {
        return exports.GetTxResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetTxResponse",
            value: exports.GetTxResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetTxResponse.typeUrl, exports.GetTxResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GetTxResponse.aminoType, exports.GetTxResponse.typeUrl);
function createBaseGetBlockWithTxsRequest() {
    return {
        height: BigInt(0),
        pagination: undefined
    };
}
exports.GetBlockWithTxsRequest = {
    typeUrl: "/cosmos.tx.v1beta1.GetBlockWithTxsRequest",
    aminoType: "cosmos-sdk/GetBlockWithTxsRequest",
    is(o) {
        return o && (o.$typeUrl === exports.GetBlockWithTxsRequest.typeUrl || typeof o.height === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GetBlockWithTxsRequest.typeUrl || typeof o.height === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GetBlockWithTxsRequest.typeUrl || typeof o.height === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.height !== BigInt(0)) {
            writer.uint32(8).int64(message.height);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetBlockWithTxsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.int64();
                    break;
                case 2:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetBlockWithTxsRequest();
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetBlockWithTxsRequest();
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetBlockWithTxsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetBlockWithTxsRequest",
            value: exports.GetBlockWithTxsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GetBlockWithTxsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.GetBlockWithTxsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetBlockWithTxsRequest",
            value: exports.GetBlockWithTxsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetBlockWithTxsRequest.typeUrl, exports.GetBlockWithTxsRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GetBlockWithTxsRequest.aminoType, exports.GetBlockWithTxsRequest.typeUrl);
function createBaseGetBlockWithTxsResponse() {
    return {
        txs: [],
        blockId: undefined,
        block: undefined,
        pagination: undefined
    };
}
exports.GetBlockWithTxsResponse = {
    typeUrl: "/cosmos.tx.v1beta1.GetBlockWithTxsResponse",
    aminoType: "cosmos-sdk/GetBlockWithTxsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.GetBlockWithTxsResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || tx_1.Tx.is(o.txs[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GetBlockWithTxsResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || tx_1.Tx.isSDK(o.txs[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GetBlockWithTxsResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || tx_1.Tx.isAmino(o.txs[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.txs) {
            tx_1.Tx.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.blockId !== undefined) {
            types_1.BlockID.encode(message.blockId, writer.uint32(18).fork()).ldelim();
        }
        if (message.block !== undefined) {
            block_1.Block.encode(message.block, writer.uint32(26).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetBlockWithTxsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txs.push(tx_1.Tx.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.blockId = types_1.BlockID.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.block = block_1.Block.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetBlockWithTxsResponse();
        message.txs = object.txs?.map(e => tx_1.Tx.fromPartial(e)) || [];
        message.blockId = object.blockId !== undefined && object.blockId !== null ? types_1.BlockID.fromPartial(object.blockId) : undefined;
        message.block = object.block !== undefined && object.block !== null ? block_1.Block.fromPartial(object.block) : undefined;
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetBlockWithTxsResponse();
        message.txs = object.txs?.map(e => tx_1.Tx.fromAmino(e)) || [];
        if (object.block_id !== undefined && object.block_id !== null) {
            message.blockId = types_1.BlockID.fromAmino(object.block_id);
        }
        if (object.block !== undefined && object.block !== null) {
            message.block = block_1.Block.fromAmino(object.block);
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.txs) {
            obj.txs = message.txs.map(e => e ? tx_1.Tx.toAmino(e) : undefined);
        }
        else {
            obj.txs = message.txs;
        }
        obj.block_id = message.blockId ? types_1.BlockID.toAmino(message.blockId) : undefined;
        obj.block = message.block ? block_1.Block.toAmino(message.block) : undefined;
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetBlockWithTxsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetBlockWithTxsResponse",
            value: exports.GetBlockWithTxsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GetBlockWithTxsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.GetBlockWithTxsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetBlockWithTxsResponse",
            value: exports.GetBlockWithTxsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetBlockWithTxsResponse.typeUrl, exports.GetBlockWithTxsResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GetBlockWithTxsResponse.aminoType, exports.GetBlockWithTxsResponse.typeUrl);
function createBaseTxDecodeRequest() {
    return {
        txBytes: new Uint8Array()
    };
}
exports.TxDecodeRequest = {
    typeUrl: "/cosmos.tx.v1beta1.TxDecodeRequest",
    aminoType: "cosmos-sdk/TxDecodeRequest",
    is(o) {
        return o && (o.$typeUrl === exports.TxDecodeRequest.typeUrl || o.txBytes instanceof Uint8Array || typeof o.txBytes === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.TxDecodeRequest.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.TxDecodeRequest.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.txBytes.length !== 0) {
            writer.uint32(10).bytes(message.txBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxDecodeRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txBytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTxDecodeRequest();
        message.txBytes = object.txBytes ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxDecodeRequest();
        if (object.tx_bytes !== undefined && object.tx_bytes !== null) {
            message.txBytes = (0, helpers_1.bytesFromBase64)(object.tx_bytes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx_bytes = message.txBytes ? (0, helpers_1.base64FromBytes)(message.txBytes) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.TxDecodeRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxDecodeRequest",
            value: exports.TxDecodeRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.TxDecodeRequest.decode(message.value);
    },
    toProto(message) {
        return exports.TxDecodeRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxDecodeRequest",
            value: exports.TxDecodeRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.TxDecodeRequest.typeUrl, exports.TxDecodeRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.TxDecodeRequest.aminoType, exports.TxDecodeRequest.typeUrl);
function createBaseTxDecodeResponse() {
    return {
        tx: undefined
    };
}
exports.TxDecodeResponse = {
    typeUrl: "/cosmos.tx.v1beta1.TxDecodeResponse",
    aminoType: "cosmos-sdk/TxDecodeResponse",
    is(o) {
        return o && o.$typeUrl === exports.TxDecodeResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.TxDecodeResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.TxDecodeResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.tx !== undefined) {
            tx_1.Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxDecodeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = tx_1.Tx.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTxDecodeResponse();
        message.tx = object.tx !== undefined && object.tx !== null ? tx_1.Tx.fromPartial(object.tx) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxDecodeResponse();
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = tx_1.Tx.fromAmino(object.tx);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx = message.tx ? tx_1.Tx.toAmino(message.tx) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.TxDecodeResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxDecodeResponse",
            value: exports.TxDecodeResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.TxDecodeResponse.decode(message.value);
    },
    toProto(message) {
        return exports.TxDecodeResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxDecodeResponse",
            value: exports.TxDecodeResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.TxDecodeResponse.typeUrl, exports.TxDecodeResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.TxDecodeResponse.aminoType, exports.TxDecodeResponse.typeUrl);
function createBaseTxEncodeRequest() {
    return {
        tx: undefined
    };
}
exports.TxEncodeRequest = {
    typeUrl: "/cosmos.tx.v1beta1.TxEncodeRequest",
    aminoType: "cosmos-sdk/TxEncodeRequest",
    is(o) {
        return o && o.$typeUrl === exports.TxEncodeRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.TxEncodeRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.TxEncodeRequest.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.tx !== undefined) {
            tx_1.Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxEncodeRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = tx_1.Tx.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTxEncodeRequest();
        message.tx = object.tx !== undefined && object.tx !== null ? tx_1.Tx.fromPartial(object.tx) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxEncodeRequest();
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = tx_1.Tx.fromAmino(object.tx);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx = message.tx ? tx_1.Tx.toAmino(message.tx) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.TxEncodeRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxEncodeRequest",
            value: exports.TxEncodeRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.TxEncodeRequest.decode(message.value);
    },
    toProto(message) {
        return exports.TxEncodeRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxEncodeRequest",
            value: exports.TxEncodeRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.TxEncodeRequest.typeUrl, exports.TxEncodeRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.TxEncodeRequest.aminoType, exports.TxEncodeRequest.typeUrl);
function createBaseTxEncodeResponse() {
    return {
        txBytes: new Uint8Array()
    };
}
exports.TxEncodeResponse = {
    typeUrl: "/cosmos.tx.v1beta1.TxEncodeResponse",
    aminoType: "cosmos-sdk/TxEncodeResponse",
    is(o) {
        return o && (o.$typeUrl === exports.TxEncodeResponse.typeUrl || o.txBytes instanceof Uint8Array || typeof o.txBytes === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.TxEncodeResponse.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.TxEncodeResponse.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.txBytes.length !== 0) {
            writer.uint32(10).bytes(message.txBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxEncodeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txBytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTxEncodeResponse();
        message.txBytes = object.txBytes ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxEncodeResponse();
        if (object.tx_bytes !== undefined && object.tx_bytes !== null) {
            message.txBytes = (0, helpers_1.bytesFromBase64)(object.tx_bytes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx_bytes = message.txBytes ? (0, helpers_1.base64FromBytes)(message.txBytes) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.TxEncodeResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxEncodeResponse",
            value: exports.TxEncodeResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.TxEncodeResponse.decode(message.value);
    },
    toProto(message) {
        return exports.TxEncodeResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxEncodeResponse",
            value: exports.TxEncodeResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.TxEncodeResponse.typeUrl, exports.TxEncodeResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.TxEncodeResponse.aminoType, exports.TxEncodeResponse.typeUrl);
function createBaseTxEncodeAminoRequest() {
    return {
        aminoJson: ""
    };
}
exports.TxEncodeAminoRequest = {
    typeUrl: "/cosmos.tx.v1beta1.TxEncodeAminoRequest",
    aminoType: "cosmos-sdk/TxEncodeAminoRequest",
    is(o) {
        return o && (o.$typeUrl === exports.TxEncodeAminoRequest.typeUrl || typeof o.aminoJson === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.TxEncodeAminoRequest.typeUrl || typeof o.amino_json === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.TxEncodeAminoRequest.typeUrl || typeof o.amino_json === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.aminoJson !== "") {
            writer.uint32(10).string(message.aminoJson);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxEncodeAminoRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.aminoJson = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTxEncodeAminoRequest();
        message.aminoJson = object.aminoJson ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxEncodeAminoRequest();
        if (object.amino_json !== undefined && object.amino_json !== null) {
            message.aminoJson = object.amino_json;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.amino_json = message.aminoJson === "" ? undefined : message.aminoJson;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.TxEncodeAminoRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxEncodeAminoRequest",
            value: exports.TxEncodeAminoRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.TxEncodeAminoRequest.decode(message.value);
    },
    toProto(message) {
        return exports.TxEncodeAminoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxEncodeAminoRequest",
            value: exports.TxEncodeAminoRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.TxEncodeAminoRequest.typeUrl, exports.TxEncodeAminoRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.TxEncodeAminoRequest.aminoType, exports.TxEncodeAminoRequest.typeUrl);
function createBaseTxEncodeAminoResponse() {
    return {
        aminoBinary: new Uint8Array()
    };
}
exports.TxEncodeAminoResponse = {
    typeUrl: "/cosmos.tx.v1beta1.TxEncodeAminoResponse",
    aminoType: "cosmos-sdk/TxEncodeAminoResponse",
    is(o) {
        return o && (o.$typeUrl === exports.TxEncodeAminoResponse.typeUrl || o.aminoBinary instanceof Uint8Array || typeof o.aminoBinary === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.TxEncodeAminoResponse.typeUrl || o.amino_binary instanceof Uint8Array || typeof o.amino_binary === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.TxEncodeAminoResponse.typeUrl || o.amino_binary instanceof Uint8Array || typeof o.amino_binary === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.aminoBinary.length !== 0) {
            writer.uint32(10).bytes(message.aminoBinary);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxEncodeAminoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.aminoBinary = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTxEncodeAminoResponse();
        message.aminoBinary = object.aminoBinary ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxEncodeAminoResponse();
        if (object.amino_binary !== undefined && object.amino_binary !== null) {
            message.aminoBinary = (0, helpers_1.bytesFromBase64)(object.amino_binary);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.amino_binary = message.aminoBinary ? (0, helpers_1.base64FromBytes)(message.aminoBinary) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.TxEncodeAminoResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxEncodeAminoResponse",
            value: exports.TxEncodeAminoResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.TxEncodeAminoResponse.decode(message.value);
    },
    toProto(message) {
        return exports.TxEncodeAminoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxEncodeAminoResponse",
            value: exports.TxEncodeAminoResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.TxEncodeAminoResponse.typeUrl, exports.TxEncodeAminoResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.TxEncodeAminoResponse.aminoType, exports.TxEncodeAminoResponse.typeUrl);
function createBaseTxDecodeAminoRequest() {
    return {
        aminoBinary: new Uint8Array()
    };
}
exports.TxDecodeAminoRequest = {
    typeUrl: "/cosmos.tx.v1beta1.TxDecodeAminoRequest",
    aminoType: "cosmos-sdk/TxDecodeAminoRequest",
    is(o) {
        return o && (o.$typeUrl === exports.TxDecodeAminoRequest.typeUrl || o.aminoBinary instanceof Uint8Array || typeof o.aminoBinary === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.TxDecodeAminoRequest.typeUrl || o.amino_binary instanceof Uint8Array || typeof o.amino_binary === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.TxDecodeAminoRequest.typeUrl || o.amino_binary instanceof Uint8Array || typeof o.amino_binary === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.aminoBinary.length !== 0) {
            writer.uint32(10).bytes(message.aminoBinary);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxDecodeAminoRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.aminoBinary = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTxDecodeAminoRequest();
        message.aminoBinary = object.aminoBinary ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxDecodeAminoRequest();
        if (object.amino_binary !== undefined && object.amino_binary !== null) {
            message.aminoBinary = (0, helpers_1.bytesFromBase64)(object.amino_binary);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.amino_binary = message.aminoBinary ? (0, helpers_1.base64FromBytes)(message.aminoBinary) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.TxDecodeAminoRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxDecodeAminoRequest",
            value: exports.TxDecodeAminoRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.TxDecodeAminoRequest.decode(message.value);
    },
    toProto(message) {
        return exports.TxDecodeAminoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxDecodeAminoRequest",
            value: exports.TxDecodeAminoRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.TxDecodeAminoRequest.typeUrl, exports.TxDecodeAminoRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.TxDecodeAminoRequest.aminoType, exports.TxDecodeAminoRequest.typeUrl);
function createBaseTxDecodeAminoResponse() {
    return {
        aminoJson: ""
    };
}
exports.TxDecodeAminoResponse = {
    typeUrl: "/cosmos.tx.v1beta1.TxDecodeAminoResponse",
    aminoType: "cosmos-sdk/TxDecodeAminoResponse",
    is(o) {
        return o && (o.$typeUrl === exports.TxDecodeAminoResponse.typeUrl || typeof o.aminoJson === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.TxDecodeAminoResponse.typeUrl || typeof o.amino_json === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.TxDecodeAminoResponse.typeUrl || typeof o.amino_json === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.aminoJson !== "") {
            writer.uint32(10).string(message.aminoJson);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxDecodeAminoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.aminoJson = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTxDecodeAminoResponse();
        message.aminoJson = object.aminoJson ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxDecodeAminoResponse();
        if (object.amino_json !== undefined && object.amino_json !== null) {
            message.aminoJson = object.amino_json;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.amino_json = message.aminoJson === "" ? undefined : message.aminoJson;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.TxDecodeAminoResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxDecodeAminoResponse",
            value: exports.TxDecodeAminoResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.TxDecodeAminoResponse.decode(message.value);
    },
    toProto(message) {
        return exports.TxDecodeAminoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxDecodeAminoResponse",
            value: exports.TxDecodeAminoResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.TxDecodeAminoResponse.typeUrl, exports.TxDecodeAminoResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.TxDecodeAminoResponse.aminoType, exports.TxDecodeAminoResponse.typeUrl);
