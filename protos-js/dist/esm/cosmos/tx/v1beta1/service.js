//@ts-nocheck
import { Tx } from "./tx";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { TxResponse, GasInfo, Result } from "../../base/abci/v1beta1/abci";
import { BlockID } from "../../../tendermint/types/types";
import { Block } from "../../../tendermint/types/block";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
/** OrderBy defines the sorting order */
export var OrderBy;
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
})(OrderBy || (OrderBy = {}));
export const OrderBySDKType = OrderBy;
export const OrderByAmino = OrderBy;
export function orderByFromJSON(object) {
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
export function orderByToJSON(object) {
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
export var BroadcastMode;
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
})(BroadcastMode || (BroadcastMode = {}));
export const BroadcastModeSDKType = BroadcastMode;
export const BroadcastModeAmino = BroadcastMode;
export function broadcastModeFromJSON(object) {
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
export function broadcastModeToJSON(object) {
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
export const GetTxsEventRequest = {
    typeUrl: "/cosmos.tx.v1beta1.GetTxsEventRequest",
    aminoType: "cosmos-sdk/GetTxsEventRequest",
    is(o) {
        return o && (o.$typeUrl === GetTxsEventRequest.typeUrl || Array.isArray(o.events) && (!o.events.length || typeof o.events[0] === "string") && isSet(o.orderBy) && typeof o.page === "bigint" && typeof o.limit === "bigint" && typeof o.query === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === GetTxsEventRequest.typeUrl || Array.isArray(o.events) && (!o.events.length || typeof o.events[0] === "string") && isSet(o.order_by) && typeof o.page === "bigint" && typeof o.limit === "bigint" && typeof o.query === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === GetTxsEventRequest.typeUrl || Array.isArray(o.events) && (!o.events.length || typeof o.events[0] === "string") && isSet(o.order_by) && typeof o.page === "bigint" && typeof o.limit === "bigint" && typeof o.query === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.events) {
            writer.uint32(10).string(v);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
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
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxsEventRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.events.push(reader.string());
                    break;
                case 2:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
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
            message.pagination = PageRequest.fromAmino(object.pagination);
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
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        obj.order_by = message.orderBy === 0 ? undefined : message.orderBy;
        obj.page = message.page !== BigInt(0) ? message.page?.toString() : undefined;
        obj.limit = message.limit !== BigInt(0) ? message.limit?.toString() : undefined;
        obj.query = message.query === "" ? undefined : message.query;
        return obj;
    },
    fromAminoMsg(object) {
        return GetTxsEventRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetTxsEventRequest",
            value: GetTxsEventRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetTxsEventRequest.decode(message.value);
    },
    toProto(message) {
        return GetTxsEventRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetTxsEventRequest",
            value: GetTxsEventRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetTxsEventRequest.typeUrl, GetTxsEventRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(GetTxsEventRequest.aminoType, GetTxsEventRequest.typeUrl);
function createBaseGetTxsEventResponse() {
    return {
        txs: [],
        txResponses: [],
        pagination: undefined,
        total: BigInt(0)
    };
}
export const GetTxsEventResponse = {
    typeUrl: "/cosmos.tx.v1beta1.GetTxsEventResponse",
    aminoType: "cosmos-sdk/GetTxsEventResponse",
    is(o) {
        return o && (o.$typeUrl === GetTxsEventResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || Tx.is(o.txs[0])) && Array.isArray(o.txResponses) && (!o.txResponses.length || TxResponse.is(o.txResponses[0])) && typeof o.total === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === GetTxsEventResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || Tx.isSDK(o.txs[0])) && Array.isArray(o.tx_responses) && (!o.tx_responses.length || TxResponse.isSDK(o.tx_responses[0])) && typeof o.total === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === GetTxsEventResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || Tx.isAmino(o.txs[0])) && Array.isArray(o.tx_responses) && (!o.tx_responses.length || TxResponse.isAmino(o.tx_responses[0])) && typeof o.total === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.txs) {
            Tx.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.txResponses) {
            TxResponse.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        if (message.total !== BigInt(0)) {
            writer.uint32(32).uint64(message.total);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxsEventResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txs.push(Tx.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.txResponses.push(TxResponse.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
        message.txs = object.txs?.map(e => Tx.fromPartial(e)) || [];
        message.txResponses = object.txResponses?.map(e => TxResponse.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        message.total = object.total !== undefined && object.total !== null ? BigInt(object.total.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetTxsEventResponse();
        message.txs = object.txs?.map(e => Tx.fromAmino(e)) || [];
        message.txResponses = object.tx_responses?.map(e => TxResponse.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        if (object.total !== undefined && object.total !== null) {
            message.total = BigInt(object.total);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.txs) {
            obj.txs = message.txs.map(e => e ? Tx.toAmino(e) : undefined);
        }
        else {
            obj.txs = message.txs;
        }
        if (message.txResponses) {
            obj.tx_responses = message.txResponses.map(e => e ? TxResponse.toAmino(e) : undefined);
        }
        else {
            obj.tx_responses = message.txResponses;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        obj.total = message.total !== BigInt(0) ? message.total?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return GetTxsEventResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetTxsEventResponse",
            value: GetTxsEventResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetTxsEventResponse.decode(message.value);
    },
    toProto(message) {
        return GetTxsEventResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetTxsEventResponse",
            value: GetTxsEventResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetTxsEventResponse.typeUrl, GetTxsEventResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(GetTxsEventResponse.aminoType, GetTxsEventResponse.typeUrl);
function createBaseBroadcastTxRequest() {
    return {
        txBytes: new Uint8Array(),
        mode: 0
    };
}
export const BroadcastTxRequest = {
    typeUrl: "/cosmos.tx.v1beta1.BroadcastTxRequest",
    aminoType: "cosmos-sdk/BroadcastTxRequest",
    is(o) {
        return o && (o.$typeUrl === BroadcastTxRequest.typeUrl || (o.txBytes instanceof Uint8Array || typeof o.txBytes === "string") && isSet(o.mode));
    },
    isSDK(o) {
        return o && (o.$typeUrl === BroadcastTxRequest.typeUrl || (o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string") && isSet(o.mode));
    },
    isAmino(o) {
        return o && (o.$typeUrl === BroadcastTxRequest.typeUrl || (o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string") && isSet(o.mode));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.txBytes.length !== 0) {
            writer.uint32(10).bytes(message.txBytes);
        }
        if (message.mode !== 0) {
            writer.uint32(16).int32(message.mode);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
            message.txBytes = bytesFromBase64(object.tx_bytes);
        }
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = object.mode;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx_bytes = message.txBytes ? base64FromBytes(message.txBytes) : undefined;
        obj.mode = message.mode === 0 ? undefined : message.mode;
        return obj;
    },
    fromAminoMsg(object) {
        return BroadcastTxRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/BroadcastTxRequest",
            value: BroadcastTxRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return BroadcastTxRequest.decode(message.value);
    },
    toProto(message) {
        return BroadcastTxRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.BroadcastTxRequest",
            value: BroadcastTxRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(BroadcastTxRequest.typeUrl, BroadcastTxRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(BroadcastTxRequest.aminoType, BroadcastTxRequest.typeUrl);
function createBaseBroadcastTxResponse() {
    return {
        txResponse: undefined
    };
}
export const BroadcastTxResponse = {
    typeUrl: "/cosmos.tx.v1beta1.BroadcastTxResponse",
    aminoType: "cosmos-sdk/BroadcastTxResponse",
    is(o) {
        return o && o.$typeUrl === BroadcastTxResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === BroadcastTxResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === BroadcastTxResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.txResponse !== undefined) {
            TxResponse.encode(message.txResponse, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBroadcastTxResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txResponse = TxResponse.decode(reader, reader.uint32());
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
        message.txResponse = object.txResponse !== undefined && object.txResponse !== null ? TxResponse.fromPartial(object.txResponse) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseBroadcastTxResponse();
        if (object.tx_response !== undefined && object.tx_response !== null) {
            message.txResponse = TxResponse.fromAmino(object.tx_response);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx_response = message.txResponse ? TxResponse.toAmino(message.txResponse) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return BroadcastTxResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/BroadcastTxResponse",
            value: BroadcastTxResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return BroadcastTxResponse.decode(message.value);
    },
    toProto(message) {
        return BroadcastTxResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.BroadcastTxResponse",
            value: BroadcastTxResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(BroadcastTxResponse.typeUrl, BroadcastTxResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(BroadcastTxResponse.aminoType, BroadcastTxResponse.typeUrl);
function createBaseSimulateRequest() {
    return {
        tx: undefined,
        txBytes: new Uint8Array()
    };
}
export const SimulateRequest = {
    typeUrl: "/cosmos.tx.v1beta1.SimulateRequest",
    aminoType: "cosmos-sdk/SimulateRequest",
    is(o) {
        return o && (o.$typeUrl === SimulateRequest.typeUrl || o.txBytes instanceof Uint8Array || typeof o.txBytes === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === SimulateRequest.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === SimulateRequest.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.tx !== undefined) {
            Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        if (message.txBytes.length !== 0) {
            writer.uint32(18).bytes(message.txBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSimulateRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = Tx.decode(reader, reader.uint32());
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
        message.tx = object.tx !== undefined && object.tx !== null ? Tx.fromPartial(object.tx) : undefined;
        message.txBytes = object.txBytes ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseSimulateRequest();
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = Tx.fromAmino(object.tx);
        }
        if (object.tx_bytes !== undefined && object.tx_bytes !== null) {
            message.txBytes = bytesFromBase64(object.tx_bytes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx = message.tx ? Tx.toAmino(message.tx) : undefined;
        obj.tx_bytes = message.txBytes ? base64FromBytes(message.txBytes) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return SimulateRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/SimulateRequest",
            value: SimulateRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return SimulateRequest.decode(message.value);
    },
    toProto(message) {
        return SimulateRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.SimulateRequest",
            value: SimulateRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(SimulateRequest.typeUrl, SimulateRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(SimulateRequest.aminoType, SimulateRequest.typeUrl);
function createBaseSimulateResponse() {
    return {
        gasInfo: undefined,
        result: undefined
    };
}
export const SimulateResponse = {
    typeUrl: "/cosmos.tx.v1beta1.SimulateResponse",
    aminoType: "cosmos-sdk/SimulateResponse",
    is(o) {
        return o && o.$typeUrl === SimulateResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === SimulateResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === SimulateResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.gasInfo !== undefined) {
            GasInfo.encode(message.gasInfo, writer.uint32(10).fork()).ldelim();
        }
        if (message.result !== undefined) {
            Result.encode(message.result, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSimulateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.gasInfo = GasInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = Result.decode(reader, reader.uint32());
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
        message.gasInfo = object.gasInfo !== undefined && object.gasInfo !== null ? GasInfo.fromPartial(object.gasInfo) : undefined;
        message.result = object.result !== undefined && object.result !== null ? Result.fromPartial(object.result) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseSimulateResponse();
        if (object.gas_info !== undefined && object.gas_info !== null) {
            message.gasInfo = GasInfo.fromAmino(object.gas_info);
        }
        if (object.result !== undefined && object.result !== null) {
            message.result = Result.fromAmino(object.result);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.gas_info = message.gasInfo ? GasInfo.toAmino(message.gasInfo) : undefined;
        obj.result = message.result ? Result.toAmino(message.result) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return SimulateResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/SimulateResponse",
            value: SimulateResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return SimulateResponse.decode(message.value);
    },
    toProto(message) {
        return SimulateResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.SimulateResponse",
            value: SimulateResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(SimulateResponse.typeUrl, SimulateResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(SimulateResponse.aminoType, SimulateResponse.typeUrl);
function createBaseGetTxRequest() {
    return {
        hash: ""
    };
}
export const GetTxRequest = {
    typeUrl: "/cosmos.tx.v1beta1.GetTxRequest",
    aminoType: "cosmos-sdk/GetTxRequest",
    is(o) {
        return o && (o.$typeUrl === GetTxRequest.typeUrl || typeof o.hash === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === GetTxRequest.typeUrl || typeof o.hash === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === GetTxRequest.typeUrl || typeof o.hash === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.hash !== "") {
            writer.uint32(10).string(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return GetTxRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetTxRequest",
            value: GetTxRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetTxRequest.decode(message.value);
    },
    toProto(message) {
        return GetTxRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetTxRequest",
            value: GetTxRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetTxRequest.typeUrl, GetTxRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(GetTxRequest.aminoType, GetTxRequest.typeUrl);
function createBaseGetTxResponse() {
    return {
        tx: undefined,
        txResponse: undefined
    };
}
export const GetTxResponse = {
    typeUrl: "/cosmos.tx.v1beta1.GetTxResponse",
    aminoType: "cosmos-sdk/GetTxResponse",
    is(o) {
        return o && o.$typeUrl === GetTxResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetTxResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetTxResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.tx !== undefined) {
            Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        if (message.txResponse !== undefined) {
            TxResponse.encode(message.txResponse, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = Tx.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.txResponse = TxResponse.decode(reader, reader.uint32());
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
        message.tx = object.tx !== undefined && object.tx !== null ? Tx.fromPartial(object.tx) : undefined;
        message.txResponse = object.txResponse !== undefined && object.txResponse !== null ? TxResponse.fromPartial(object.txResponse) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetTxResponse();
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = Tx.fromAmino(object.tx);
        }
        if (object.tx_response !== undefined && object.tx_response !== null) {
            message.txResponse = TxResponse.fromAmino(object.tx_response);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx = message.tx ? Tx.toAmino(message.tx) : undefined;
        obj.tx_response = message.txResponse ? TxResponse.toAmino(message.txResponse) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return GetTxResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetTxResponse",
            value: GetTxResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetTxResponse.decode(message.value);
    },
    toProto(message) {
        return GetTxResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetTxResponse",
            value: GetTxResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetTxResponse.typeUrl, GetTxResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(GetTxResponse.aminoType, GetTxResponse.typeUrl);
function createBaseGetBlockWithTxsRequest() {
    return {
        height: BigInt(0),
        pagination: undefined
    };
}
export const GetBlockWithTxsRequest = {
    typeUrl: "/cosmos.tx.v1beta1.GetBlockWithTxsRequest",
    aminoType: "cosmos-sdk/GetBlockWithTxsRequest",
    is(o) {
        return o && (o.$typeUrl === GetBlockWithTxsRequest.typeUrl || typeof o.height === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === GetBlockWithTxsRequest.typeUrl || typeof o.height === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === GetBlockWithTxsRequest.typeUrl || typeof o.height === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.height !== BigInt(0)) {
            writer.uint32(8).int64(message.height);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetBlockWithTxsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.int64();
                    break;
                case 2:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetBlockWithTxsRequest();
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return GetBlockWithTxsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetBlockWithTxsRequest",
            value: GetBlockWithTxsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetBlockWithTxsRequest.decode(message.value);
    },
    toProto(message) {
        return GetBlockWithTxsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetBlockWithTxsRequest",
            value: GetBlockWithTxsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetBlockWithTxsRequest.typeUrl, GetBlockWithTxsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(GetBlockWithTxsRequest.aminoType, GetBlockWithTxsRequest.typeUrl);
function createBaseGetBlockWithTxsResponse() {
    return {
        txs: [],
        blockId: undefined,
        block: undefined,
        pagination: undefined
    };
}
export const GetBlockWithTxsResponse = {
    typeUrl: "/cosmos.tx.v1beta1.GetBlockWithTxsResponse",
    aminoType: "cosmos-sdk/GetBlockWithTxsResponse",
    is(o) {
        return o && (o.$typeUrl === GetBlockWithTxsResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || Tx.is(o.txs[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === GetBlockWithTxsResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || Tx.isSDK(o.txs[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === GetBlockWithTxsResponse.typeUrl || Array.isArray(o.txs) && (!o.txs.length || Tx.isAmino(o.txs[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.txs) {
            Tx.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.blockId !== undefined) {
            BlockID.encode(message.blockId, writer.uint32(18).fork()).ldelim();
        }
        if (message.block !== undefined) {
            Block.encode(message.block, writer.uint32(26).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetBlockWithTxsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txs.push(Tx.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.blockId = BlockID.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.block = Block.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
        message.txs = object.txs?.map(e => Tx.fromPartial(e)) || [];
        message.blockId = object.blockId !== undefined && object.blockId !== null ? BlockID.fromPartial(object.blockId) : undefined;
        message.block = object.block !== undefined && object.block !== null ? Block.fromPartial(object.block) : undefined;
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetBlockWithTxsResponse();
        message.txs = object.txs?.map(e => Tx.fromAmino(e)) || [];
        if (object.block_id !== undefined && object.block_id !== null) {
            message.blockId = BlockID.fromAmino(object.block_id);
        }
        if (object.block !== undefined && object.block !== null) {
            message.block = Block.fromAmino(object.block);
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.txs) {
            obj.txs = message.txs.map(e => e ? Tx.toAmino(e) : undefined);
        }
        else {
            obj.txs = message.txs;
        }
        obj.block_id = message.blockId ? BlockID.toAmino(message.blockId) : undefined;
        obj.block = message.block ? Block.toAmino(message.block) : undefined;
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return GetBlockWithTxsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GetBlockWithTxsResponse",
            value: GetBlockWithTxsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return GetBlockWithTxsResponse.decode(message.value);
    },
    toProto(message) {
        return GetBlockWithTxsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.GetBlockWithTxsResponse",
            value: GetBlockWithTxsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetBlockWithTxsResponse.typeUrl, GetBlockWithTxsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(GetBlockWithTxsResponse.aminoType, GetBlockWithTxsResponse.typeUrl);
function createBaseTxDecodeRequest() {
    return {
        txBytes: new Uint8Array()
    };
}
export const TxDecodeRequest = {
    typeUrl: "/cosmos.tx.v1beta1.TxDecodeRequest",
    aminoType: "cosmos-sdk/TxDecodeRequest",
    is(o) {
        return o && (o.$typeUrl === TxDecodeRequest.typeUrl || o.txBytes instanceof Uint8Array || typeof o.txBytes === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === TxDecodeRequest.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === TxDecodeRequest.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.txBytes.length !== 0) {
            writer.uint32(10).bytes(message.txBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
            message.txBytes = bytesFromBase64(object.tx_bytes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx_bytes = message.txBytes ? base64FromBytes(message.txBytes) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return TxDecodeRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxDecodeRequest",
            value: TxDecodeRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return TxDecodeRequest.decode(message.value);
    },
    toProto(message) {
        return TxDecodeRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxDecodeRequest",
            value: TxDecodeRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(TxDecodeRequest.typeUrl, TxDecodeRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(TxDecodeRequest.aminoType, TxDecodeRequest.typeUrl);
function createBaseTxDecodeResponse() {
    return {
        tx: undefined
    };
}
export const TxDecodeResponse = {
    typeUrl: "/cosmos.tx.v1beta1.TxDecodeResponse",
    aminoType: "cosmos-sdk/TxDecodeResponse",
    is(o) {
        return o && o.$typeUrl === TxDecodeResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === TxDecodeResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === TxDecodeResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.tx !== undefined) {
            Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxDecodeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = Tx.decode(reader, reader.uint32());
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
        message.tx = object.tx !== undefined && object.tx !== null ? Tx.fromPartial(object.tx) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxDecodeResponse();
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = Tx.fromAmino(object.tx);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx = message.tx ? Tx.toAmino(message.tx) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return TxDecodeResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxDecodeResponse",
            value: TxDecodeResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return TxDecodeResponse.decode(message.value);
    },
    toProto(message) {
        return TxDecodeResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxDecodeResponse",
            value: TxDecodeResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(TxDecodeResponse.typeUrl, TxDecodeResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(TxDecodeResponse.aminoType, TxDecodeResponse.typeUrl);
function createBaseTxEncodeRequest() {
    return {
        tx: undefined
    };
}
export const TxEncodeRequest = {
    typeUrl: "/cosmos.tx.v1beta1.TxEncodeRequest",
    aminoType: "cosmos-sdk/TxEncodeRequest",
    is(o) {
        return o && o.$typeUrl === TxEncodeRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === TxEncodeRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === TxEncodeRequest.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.tx !== undefined) {
            Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxEncodeRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = Tx.decode(reader, reader.uint32());
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
        message.tx = object.tx !== undefined && object.tx !== null ? Tx.fromPartial(object.tx) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseTxEncodeRequest();
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = Tx.fromAmino(object.tx);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx = message.tx ? Tx.toAmino(message.tx) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return TxEncodeRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxEncodeRequest",
            value: TxEncodeRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return TxEncodeRequest.decode(message.value);
    },
    toProto(message) {
        return TxEncodeRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxEncodeRequest",
            value: TxEncodeRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(TxEncodeRequest.typeUrl, TxEncodeRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(TxEncodeRequest.aminoType, TxEncodeRequest.typeUrl);
function createBaseTxEncodeResponse() {
    return {
        txBytes: new Uint8Array()
    };
}
export const TxEncodeResponse = {
    typeUrl: "/cosmos.tx.v1beta1.TxEncodeResponse",
    aminoType: "cosmos-sdk/TxEncodeResponse",
    is(o) {
        return o && (o.$typeUrl === TxEncodeResponse.typeUrl || o.txBytes instanceof Uint8Array || typeof o.txBytes === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === TxEncodeResponse.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === TxEncodeResponse.typeUrl || o.tx_bytes instanceof Uint8Array || typeof o.tx_bytes === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.txBytes.length !== 0) {
            writer.uint32(10).bytes(message.txBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
            message.txBytes = bytesFromBase64(object.tx_bytes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.tx_bytes = message.txBytes ? base64FromBytes(message.txBytes) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return TxEncodeResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxEncodeResponse",
            value: TxEncodeResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return TxEncodeResponse.decode(message.value);
    },
    toProto(message) {
        return TxEncodeResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxEncodeResponse",
            value: TxEncodeResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(TxEncodeResponse.typeUrl, TxEncodeResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(TxEncodeResponse.aminoType, TxEncodeResponse.typeUrl);
function createBaseTxEncodeAminoRequest() {
    return {
        aminoJson: ""
    };
}
export const TxEncodeAminoRequest = {
    typeUrl: "/cosmos.tx.v1beta1.TxEncodeAminoRequest",
    aminoType: "cosmos-sdk/TxEncodeAminoRequest",
    is(o) {
        return o && (o.$typeUrl === TxEncodeAminoRequest.typeUrl || typeof o.aminoJson === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === TxEncodeAminoRequest.typeUrl || typeof o.amino_json === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === TxEncodeAminoRequest.typeUrl || typeof o.amino_json === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.aminoJson !== "") {
            writer.uint32(10).string(message.aminoJson);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return TxEncodeAminoRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxEncodeAminoRequest",
            value: TxEncodeAminoRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return TxEncodeAminoRequest.decode(message.value);
    },
    toProto(message) {
        return TxEncodeAminoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxEncodeAminoRequest",
            value: TxEncodeAminoRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(TxEncodeAminoRequest.typeUrl, TxEncodeAminoRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(TxEncodeAminoRequest.aminoType, TxEncodeAminoRequest.typeUrl);
function createBaseTxEncodeAminoResponse() {
    return {
        aminoBinary: new Uint8Array()
    };
}
export const TxEncodeAminoResponse = {
    typeUrl: "/cosmos.tx.v1beta1.TxEncodeAminoResponse",
    aminoType: "cosmos-sdk/TxEncodeAminoResponse",
    is(o) {
        return o && (o.$typeUrl === TxEncodeAminoResponse.typeUrl || o.aminoBinary instanceof Uint8Array || typeof o.aminoBinary === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === TxEncodeAminoResponse.typeUrl || o.amino_binary instanceof Uint8Array || typeof o.amino_binary === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === TxEncodeAminoResponse.typeUrl || o.amino_binary instanceof Uint8Array || typeof o.amino_binary === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.aminoBinary.length !== 0) {
            writer.uint32(10).bytes(message.aminoBinary);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
            message.aminoBinary = bytesFromBase64(object.amino_binary);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.amino_binary = message.aminoBinary ? base64FromBytes(message.aminoBinary) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return TxEncodeAminoResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxEncodeAminoResponse",
            value: TxEncodeAminoResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return TxEncodeAminoResponse.decode(message.value);
    },
    toProto(message) {
        return TxEncodeAminoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxEncodeAminoResponse",
            value: TxEncodeAminoResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(TxEncodeAminoResponse.typeUrl, TxEncodeAminoResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(TxEncodeAminoResponse.aminoType, TxEncodeAminoResponse.typeUrl);
function createBaseTxDecodeAminoRequest() {
    return {
        aminoBinary: new Uint8Array()
    };
}
export const TxDecodeAminoRequest = {
    typeUrl: "/cosmos.tx.v1beta1.TxDecodeAminoRequest",
    aminoType: "cosmos-sdk/TxDecodeAminoRequest",
    is(o) {
        return o && (o.$typeUrl === TxDecodeAminoRequest.typeUrl || o.aminoBinary instanceof Uint8Array || typeof o.aminoBinary === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === TxDecodeAminoRequest.typeUrl || o.amino_binary instanceof Uint8Array || typeof o.amino_binary === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === TxDecodeAminoRequest.typeUrl || o.amino_binary instanceof Uint8Array || typeof o.amino_binary === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.aminoBinary.length !== 0) {
            writer.uint32(10).bytes(message.aminoBinary);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
            message.aminoBinary = bytesFromBase64(object.amino_binary);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.amino_binary = message.aminoBinary ? base64FromBytes(message.aminoBinary) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return TxDecodeAminoRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxDecodeAminoRequest",
            value: TxDecodeAminoRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return TxDecodeAminoRequest.decode(message.value);
    },
    toProto(message) {
        return TxDecodeAminoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxDecodeAminoRequest",
            value: TxDecodeAminoRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(TxDecodeAminoRequest.typeUrl, TxDecodeAminoRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(TxDecodeAminoRequest.aminoType, TxDecodeAminoRequest.typeUrl);
function createBaseTxDecodeAminoResponse() {
    return {
        aminoJson: ""
    };
}
export const TxDecodeAminoResponse = {
    typeUrl: "/cosmos.tx.v1beta1.TxDecodeAminoResponse",
    aminoType: "cosmos-sdk/TxDecodeAminoResponse",
    is(o) {
        return o && (o.$typeUrl === TxDecodeAminoResponse.typeUrl || typeof o.aminoJson === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === TxDecodeAminoResponse.typeUrl || typeof o.amino_json === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === TxDecodeAminoResponse.typeUrl || typeof o.amino_json === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.aminoJson !== "") {
            writer.uint32(10).string(message.aminoJson);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return TxDecodeAminoResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/TxDecodeAminoResponse",
            value: TxDecodeAminoResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return TxDecodeAminoResponse.decode(message.value);
    },
    toProto(message) {
        return TxDecodeAminoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.tx.v1beta1.TxDecodeAminoResponse",
            value: TxDecodeAminoResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(TxDecodeAminoResponse.typeUrl, TxDecodeAminoResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(TxDecodeAminoResponse.aminoType, TxDecodeAminoResponse.typeUrl);
