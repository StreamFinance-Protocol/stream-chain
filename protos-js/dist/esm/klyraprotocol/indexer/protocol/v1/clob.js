//@ts-nocheck
import { IndexerSubaccountId } from "./subaccount";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { GlobalDecoderRegistry } from "../../../../registry";
import { isSet } from "../../../../helpers";
/**
 * Represents the side of the orderbook the order will be placed on.
 * Note that Side.SIDE_UNSPECIFIED is an invalid order and cannot be
 * placed on the orderbook.
 */
export var IndexerOrder_Side;
(function (IndexerOrder_Side) {
    /** SIDE_UNSPECIFIED - Default value. This value is invalid and unused. */
    IndexerOrder_Side[IndexerOrder_Side["SIDE_UNSPECIFIED"] = 0] = "SIDE_UNSPECIFIED";
    /** SIDE_BUY - SIDE_BUY is used to represent a BUY order. */
    IndexerOrder_Side[IndexerOrder_Side["SIDE_BUY"] = 1] = "SIDE_BUY";
    /** SIDE_SELL - SIDE_SELL is used to represent a SELL order. */
    IndexerOrder_Side[IndexerOrder_Side["SIDE_SELL"] = 2] = "SIDE_SELL";
    IndexerOrder_Side[IndexerOrder_Side["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(IndexerOrder_Side || (IndexerOrder_Side = {}));
export const IndexerOrder_SideSDKType = IndexerOrder_Side;
export const IndexerOrder_SideAmino = IndexerOrder_Side;
export function indexerOrder_SideFromJSON(object) {
    switch (object) {
        case 0:
        case "SIDE_UNSPECIFIED":
            return IndexerOrder_Side.SIDE_UNSPECIFIED;
        case 1:
        case "SIDE_BUY":
            return IndexerOrder_Side.SIDE_BUY;
        case 2:
        case "SIDE_SELL":
            return IndexerOrder_Side.SIDE_SELL;
        case -1:
        case "UNRECOGNIZED":
        default:
            return IndexerOrder_Side.UNRECOGNIZED;
    }
}
export function indexerOrder_SideToJSON(object) {
    switch (object) {
        case IndexerOrder_Side.SIDE_UNSPECIFIED:
            return "SIDE_UNSPECIFIED";
        case IndexerOrder_Side.SIDE_BUY:
            return "SIDE_BUY";
        case IndexerOrder_Side.SIDE_SELL:
            return "SIDE_SELL";
        case IndexerOrder_Side.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/**
 * TimeInForce indicates how long an order will remain active before it
 * is executed or expires.
 */
export var IndexerOrder_TimeInForce;
(function (IndexerOrder_TimeInForce) {
    /**
     * TIME_IN_FORCE_UNSPECIFIED - TIME_IN_FORCE_UNSPECIFIED represents the default behavior where an
     * order will first match with existing orders on the book, and any
     * remaining size will be added to the book as a maker order.
     */
    IndexerOrder_TimeInForce[IndexerOrder_TimeInForce["TIME_IN_FORCE_UNSPECIFIED"] = 0] = "TIME_IN_FORCE_UNSPECIFIED";
    /**
     * TIME_IN_FORCE_IOC - TIME_IN_FORCE_IOC enforces that an order only be matched with
     * maker orders on the book. If the order has remaining size after
     * matching with existing orders on the book, the remaining size
     * is not placed on the book.
     */
    IndexerOrder_TimeInForce[IndexerOrder_TimeInForce["TIME_IN_FORCE_IOC"] = 1] = "TIME_IN_FORCE_IOC";
    /**
     * TIME_IN_FORCE_POST_ONLY - TIME_IN_FORCE_POST_ONLY enforces that an order only be placed
     * on the book as a maker order. Note this means that validators will cancel
     * any newly-placed post only orders that would cross with other maker
     * orders.
     */
    IndexerOrder_TimeInForce[IndexerOrder_TimeInForce["TIME_IN_FORCE_POST_ONLY"] = 2] = "TIME_IN_FORCE_POST_ONLY";
    /**
     * TIME_IN_FORCE_FILL_OR_KILL - TIME_IN_FORCE_FILL_OR_KILL enforces that an order will either be filled
     * completely and immediately by maker orders on the book or canceled if the
     * entire amount can‘t be matched.
     */
    IndexerOrder_TimeInForce[IndexerOrder_TimeInForce["TIME_IN_FORCE_FILL_OR_KILL"] = 3] = "TIME_IN_FORCE_FILL_OR_KILL";
    IndexerOrder_TimeInForce[IndexerOrder_TimeInForce["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(IndexerOrder_TimeInForce || (IndexerOrder_TimeInForce = {}));
export const IndexerOrder_TimeInForceSDKType = IndexerOrder_TimeInForce;
export const IndexerOrder_TimeInForceAmino = IndexerOrder_TimeInForce;
export function indexerOrder_TimeInForceFromJSON(object) {
    switch (object) {
        case 0:
        case "TIME_IN_FORCE_UNSPECIFIED":
            return IndexerOrder_TimeInForce.TIME_IN_FORCE_UNSPECIFIED;
        case 1:
        case "TIME_IN_FORCE_IOC":
            return IndexerOrder_TimeInForce.TIME_IN_FORCE_IOC;
        case 2:
        case "TIME_IN_FORCE_POST_ONLY":
            return IndexerOrder_TimeInForce.TIME_IN_FORCE_POST_ONLY;
        case 3:
        case "TIME_IN_FORCE_FILL_OR_KILL":
            return IndexerOrder_TimeInForce.TIME_IN_FORCE_FILL_OR_KILL;
        case -1:
        case "UNRECOGNIZED":
        default:
            return IndexerOrder_TimeInForce.UNRECOGNIZED;
    }
}
export function indexerOrder_TimeInForceToJSON(object) {
    switch (object) {
        case IndexerOrder_TimeInForce.TIME_IN_FORCE_UNSPECIFIED:
            return "TIME_IN_FORCE_UNSPECIFIED";
        case IndexerOrder_TimeInForce.TIME_IN_FORCE_IOC:
            return "TIME_IN_FORCE_IOC";
        case IndexerOrder_TimeInForce.TIME_IN_FORCE_POST_ONLY:
            return "TIME_IN_FORCE_POST_ONLY";
        case IndexerOrder_TimeInForce.TIME_IN_FORCE_FILL_OR_KILL:
            return "TIME_IN_FORCE_FILL_OR_KILL";
        case IndexerOrder_TimeInForce.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
export var IndexerOrder_ConditionType;
(function (IndexerOrder_ConditionType) {
    /**
     * CONDITION_TYPE_UNSPECIFIED - CONDITION_TYPE_UNSPECIFIED represents the default behavior where an
     * order will be placed immediately on the orderbook.
     */
    IndexerOrder_ConditionType[IndexerOrder_ConditionType["CONDITION_TYPE_UNSPECIFIED"] = 0] = "CONDITION_TYPE_UNSPECIFIED";
    /**
     * CONDITION_TYPE_STOP_LOSS - CONDITION_TYPE_STOP_LOSS represents a stop order. A stop order will
     * trigger when the oracle price moves at or above the trigger price for
     * buys, and at or below the trigger price for sells.
     */
    IndexerOrder_ConditionType[IndexerOrder_ConditionType["CONDITION_TYPE_STOP_LOSS"] = 1] = "CONDITION_TYPE_STOP_LOSS";
    /**
     * CONDITION_TYPE_TAKE_PROFIT - CONDITION_TYPE_TAKE_PROFIT represents a take profit order. A take profit
     * order will trigger when the oracle price moves at or below the trigger
     * price for buys and at or above the trigger price for sells.
     */
    IndexerOrder_ConditionType[IndexerOrder_ConditionType["CONDITION_TYPE_TAKE_PROFIT"] = 2] = "CONDITION_TYPE_TAKE_PROFIT";
    IndexerOrder_ConditionType[IndexerOrder_ConditionType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(IndexerOrder_ConditionType || (IndexerOrder_ConditionType = {}));
export const IndexerOrder_ConditionTypeSDKType = IndexerOrder_ConditionType;
export const IndexerOrder_ConditionTypeAmino = IndexerOrder_ConditionType;
export function indexerOrder_ConditionTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "CONDITION_TYPE_UNSPECIFIED":
            return IndexerOrder_ConditionType.CONDITION_TYPE_UNSPECIFIED;
        case 1:
        case "CONDITION_TYPE_STOP_LOSS":
            return IndexerOrder_ConditionType.CONDITION_TYPE_STOP_LOSS;
        case 2:
        case "CONDITION_TYPE_TAKE_PROFIT":
            return IndexerOrder_ConditionType.CONDITION_TYPE_TAKE_PROFIT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return IndexerOrder_ConditionType.UNRECOGNIZED;
    }
}
export function indexerOrder_ConditionTypeToJSON(object) {
    switch (object) {
        case IndexerOrder_ConditionType.CONDITION_TYPE_UNSPECIFIED:
            return "CONDITION_TYPE_UNSPECIFIED";
        case IndexerOrder_ConditionType.CONDITION_TYPE_STOP_LOSS:
            return "CONDITION_TYPE_STOP_LOSS";
        case IndexerOrder_ConditionType.CONDITION_TYPE_TAKE_PROFIT:
            return "CONDITION_TYPE_TAKE_PROFIT";
        case IndexerOrder_ConditionType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/**
 * Status of the CLOB.
 * Defined in clob.clob_pair
 */
export var ClobPairStatus;
(function (ClobPairStatus) {
    /** CLOB_PAIR_STATUS_UNSPECIFIED - Default value. This value is invalid and unused. */
    ClobPairStatus[ClobPairStatus["CLOB_PAIR_STATUS_UNSPECIFIED"] = 0] = "CLOB_PAIR_STATUS_UNSPECIFIED";
    /**
     * CLOB_PAIR_STATUS_ACTIVE - CLOB_PAIR_STATUS_ACTIVE behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    ClobPairStatus[ClobPairStatus["CLOB_PAIR_STATUS_ACTIVE"] = 1] = "CLOB_PAIR_STATUS_ACTIVE";
    /**
     * CLOB_PAIR_STATUS_PAUSED - CLOB_PAIR_STATUS_PAUSED behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    ClobPairStatus[ClobPairStatus["CLOB_PAIR_STATUS_PAUSED"] = 2] = "CLOB_PAIR_STATUS_PAUSED";
    /**
     * CLOB_PAIR_STATUS_CANCEL_ONLY - CLOB_PAIR_STATUS_CANCEL_ONLY behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    ClobPairStatus[ClobPairStatus["CLOB_PAIR_STATUS_CANCEL_ONLY"] = 3] = "CLOB_PAIR_STATUS_CANCEL_ONLY";
    /**
     * CLOB_PAIR_STATUS_POST_ONLY - CLOB_PAIR_STATUS_POST_ONLY behavior is unfinalized.
     * TODO(DEC-600): update this documentation.
     */
    ClobPairStatus[ClobPairStatus["CLOB_PAIR_STATUS_POST_ONLY"] = 4] = "CLOB_PAIR_STATUS_POST_ONLY";
    /**
     * CLOB_PAIR_STATUS_INITIALIZING - CLOB_PAIR_STATUS_INITIALIZING represents a newly-added clob pair.
     * Clob pairs in this state only accept orders which are
     * both short-term and post-only.
     */
    ClobPairStatus[ClobPairStatus["CLOB_PAIR_STATUS_INITIALIZING"] = 5] = "CLOB_PAIR_STATUS_INITIALIZING";
    /**
     * CLOB_PAIR_STATUS_FINAL_SETTLEMENT - CLOB_PAIR_STATUS_FINAL_SETTLEMENT represents a clob pair that has been
     * deactivated. Clob pairs in this state do not accept new orders and trading
     * is blocked. All open positions are closed and open stateful orders canceled
     * by the protocol when the clob pair transitions to this status. All
     * short-term orders are left to expire.
     */
    ClobPairStatus[ClobPairStatus["CLOB_PAIR_STATUS_FINAL_SETTLEMENT"] = 6] = "CLOB_PAIR_STATUS_FINAL_SETTLEMENT";
    ClobPairStatus[ClobPairStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ClobPairStatus || (ClobPairStatus = {}));
export const ClobPairStatusSDKType = ClobPairStatus;
export const ClobPairStatusAmino = ClobPairStatus;
export function clobPairStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "CLOB_PAIR_STATUS_UNSPECIFIED":
            return ClobPairStatus.CLOB_PAIR_STATUS_UNSPECIFIED;
        case 1:
        case "CLOB_PAIR_STATUS_ACTIVE":
            return ClobPairStatus.CLOB_PAIR_STATUS_ACTIVE;
        case 2:
        case "CLOB_PAIR_STATUS_PAUSED":
            return ClobPairStatus.CLOB_PAIR_STATUS_PAUSED;
        case 3:
        case "CLOB_PAIR_STATUS_CANCEL_ONLY":
            return ClobPairStatus.CLOB_PAIR_STATUS_CANCEL_ONLY;
        case 4:
        case "CLOB_PAIR_STATUS_POST_ONLY":
            return ClobPairStatus.CLOB_PAIR_STATUS_POST_ONLY;
        case 5:
        case "CLOB_PAIR_STATUS_INITIALIZING":
            return ClobPairStatus.CLOB_PAIR_STATUS_INITIALIZING;
        case 6:
        case "CLOB_PAIR_STATUS_FINAL_SETTLEMENT":
            return ClobPairStatus.CLOB_PAIR_STATUS_FINAL_SETTLEMENT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ClobPairStatus.UNRECOGNIZED;
    }
}
export function clobPairStatusToJSON(object) {
    switch (object) {
        case ClobPairStatus.CLOB_PAIR_STATUS_UNSPECIFIED:
            return "CLOB_PAIR_STATUS_UNSPECIFIED";
        case ClobPairStatus.CLOB_PAIR_STATUS_ACTIVE:
            return "CLOB_PAIR_STATUS_ACTIVE";
        case ClobPairStatus.CLOB_PAIR_STATUS_PAUSED:
            return "CLOB_PAIR_STATUS_PAUSED";
        case ClobPairStatus.CLOB_PAIR_STATUS_CANCEL_ONLY:
            return "CLOB_PAIR_STATUS_CANCEL_ONLY";
        case ClobPairStatus.CLOB_PAIR_STATUS_POST_ONLY:
            return "CLOB_PAIR_STATUS_POST_ONLY";
        case ClobPairStatus.CLOB_PAIR_STATUS_INITIALIZING:
            return "CLOB_PAIR_STATUS_INITIALIZING";
        case ClobPairStatus.CLOB_PAIR_STATUS_FINAL_SETTLEMENT:
            return "CLOB_PAIR_STATUS_FINAL_SETTLEMENT";
        case ClobPairStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseIndexerOrderId() {
    return {
        subaccountId: IndexerSubaccountId.fromPartial({}),
        clientId: 0,
        orderFlags: 0,
        clobPairId: 0
    };
}
export const IndexerOrderId = {
    typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerOrderId",
    is(o) {
        return o && (o.$typeUrl === IndexerOrderId.typeUrl || IndexerSubaccountId.is(o.subaccountId) && typeof o.clientId === "number" && typeof o.orderFlags === "number" && typeof o.clobPairId === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === IndexerOrderId.typeUrl || IndexerSubaccountId.isSDK(o.subaccount_id) && typeof o.client_id === "number" && typeof o.order_flags === "number" && typeof o.clob_pair_id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === IndexerOrderId.typeUrl || IndexerSubaccountId.isAmino(o.subaccount_id) && typeof o.client_id === "number" && typeof o.order_flags === "number" && typeof o.clob_pair_id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.subaccountId !== undefined) {
            IndexerSubaccountId.encode(message.subaccountId, writer.uint32(10).fork()).ldelim();
        }
        if (message.clientId !== 0) {
            writer.uint32(21).fixed32(message.clientId);
        }
        if (message.orderFlags !== 0) {
            writer.uint32(24).uint32(message.orderFlags);
        }
        if (message.clobPairId !== 0) {
            writer.uint32(32).uint32(message.clobPairId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIndexerOrderId();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subaccountId = IndexerSubaccountId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.clientId = reader.fixed32();
                    break;
                case 3:
                    message.orderFlags = reader.uint32();
                    break;
                case 4:
                    message.clobPairId = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseIndexerOrderId();
        message.subaccountId = object.subaccountId !== undefined && object.subaccountId !== null ? IndexerSubaccountId.fromPartial(object.subaccountId) : undefined;
        message.clientId = object.clientId ?? 0;
        message.orderFlags = object.orderFlags ?? 0;
        message.clobPairId = object.clobPairId ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseIndexerOrderId();
        if (object.subaccount_id !== undefined && object.subaccount_id !== null) {
            message.subaccountId = IndexerSubaccountId.fromAmino(object.subaccount_id);
        }
        if (object.client_id !== undefined && object.client_id !== null) {
            message.clientId = object.client_id;
        }
        if (object.order_flags !== undefined && object.order_flags !== null) {
            message.orderFlags = object.order_flags;
        }
        if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
            message.clobPairId = object.clob_pair_id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.subaccount_id = message.subaccountId ? IndexerSubaccountId.toAmino(message.subaccountId) : undefined;
        obj.client_id = message.clientId === 0 ? undefined : message.clientId;
        obj.order_flags = message.orderFlags === 0 ? undefined : message.orderFlags;
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        return obj;
    },
    fromAminoMsg(object) {
        return IndexerOrderId.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return IndexerOrderId.decode(message.value);
    },
    toProto(message) {
        return IndexerOrderId.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerOrderId",
            value: IndexerOrderId.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(IndexerOrderId.typeUrl, IndexerOrderId);
function createBaseIndexerOrder() {
    return {
        orderId: IndexerOrderId.fromPartial({}),
        side: 0,
        quantums: BigInt(0),
        subticks: BigInt(0),
        goodTilBlock: undefined,
        goodTilBlockTime: undefined,
        timeInForce: 0,
        reduceOnly: false,
        clientMetadata: 0,
        conditionType: 0,
        conditionalOrderTriggerSubticks: BigInt(0),
        routerFeePpm: 0,
        routerFeeSubaccountOwner: "",
        routerFeeSubaccountNumber: 0
    };
}
export const IndexerOrder = {
    typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerOrder",
    is(o) {
        return o && (o.$typeUrl === IndexerOrder.typeUrl || IndexerOrderId.is(o.orderId) && isSet(o.side) && typeof o.quantums === "bigint" && typeof o.subticks === "bigint" && isSet(o.timeInForce) && typeof o.reduceOnly === "boolean" && typeof o.clientMetadata === "number" && isSet(o.conditionType) && typeof o.conditionalOrderTriggerSubticks === "bigint" && typeof o.routerFeePpm === "number" && typeof o.routerFeeSubaccountOwner === "string" && typeof o.routerFeeSubaccountNumber === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === IndexerOrder.typeUrl || IndexerOrderId.isSDK(o.order_id) && isSet(o.side) && typeof o.quantums === "bigint" && typeof o.subticks === "bigint" && isSet(o.time_in_force) && typeof o.reduce_only === "boolean" && typeof o.client_metadata === "number" && isSet(o.condition_type) && typeof o.conditional_order_trigger_subticks === "bigint" && typeof o.router_fee_ppm === "number" && typeof o.router_fee_subaccount_owner === "string" && typeof o.router_fee_subaccount_number === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === IndexerOrder.typeUrl || IndexerOrderId.isAmino(o.order_id) && isSet(o.side) && typeof o.quantums === "bigint" && typeof o.subticks === "bigint" && isSet(o.time_in_force) && typeof o.reduce_only === "boolean" && typeof o.client_metadata === "number" && isSet(o.condition_type) && typeof o.conditional_order_trigger_subticks === "bigint" && typeof o.router_fee_ppm === "number" && typeof o.router_fee_subaccount_owner === "string" && typeof o.router_fee_subaccount_number === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.orderId !== undefined) {
            IndexerOrderId.encode(message.orderId, writer.uint32(10).fork()).ldelim();
        }
        if (message.side !== 0) {
            writer.uint32(16).int32(message.side);
        }
        if (message.quantums !== BigInt(0)) {
            writer.uint32(24).uint64(message.quantums);
        }
        if (message.subticks !== BigInt(0)) {
            writer.uint32(32).uint64(message.subticks);
        }
        if (message.goodTilBlock !== undefined) {
            writer.uint32(40).uint32(message.goodTilBlock);
        }
        if (message.goodTilBlockTime !== undefined) {
            writer.uint32(53).fixed32(message.goodTilBlockTime);
        }
        if (message.timeInForce !== 0) {
            writer.uint32(56).int32(message.timeInForce);
        }
        if (message.reduceOnly === true) {
            writer.uint32(64).bool(message.reduceOnly);
        }
        if (message.clientMetadata !== 0) {
            writer.uint32(72).uint32(message.clientMetadata);
        }
        if (message.conditionType !== 0) {
            writer.uint32(80).int32(message.conditionType);
        }
        if (message.conditionalOrderTriggerSubticks !== BigInt(0)) {
            writer.uint32(88).uint64(message.conditionalOrderTriggerSubticks);
        }
        if (message.routerFeePpm !== 0) {
            writer.uint32(96).int32(message.routerFeePpm);
        }
        if (message.routerFeeSubaccountOwner !== "") {
            writer.uint32(106).string(message.routerFeeSubaccountOwner);
        }
        if (message.routerFeeSubaccountNumber !== 0) {
            writer.uint32(112).uint32(message.routerFeeSubaccountNumber);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIndexerOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderId = IndexerOrderId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.side = reader.int32();
                    break;
                case 3:
                    message.quantums = reader.uint64();
                    break;
                case 4:
                    message.subticks = reader.uint64();
                    break;
                case 5:
                    message.goodTilBlock = reader.uint32();
                    break;
                case 6:
                    message.goodTilBlockTime = reader.fixed32();
                    break;
                case 7:
                    message.timeInForce = reader.int32();
                    break;
                case 8:
                    message.reduceOnly = reader.bool();
                    break;
                case 9:
                    message.clientMetadata = reader.uint32();
                    break;
                case 10:
                    message.conditionType = reader.int32();
                    break;
                case 11:
                    message.conditionalOrderTriggerSubticks = reader.uint64();
                    break;
                case 12:
                    message.routerFeePpm = reader.int32();
                    break;
                case 13:
                    message.routerFeeSubaccountOwner = reader.string();
                    break;
                case 14:
                    message.routerFeeSubaccountNumber = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseIndexerOrder();
        message.orderId = object.orderId !== undefined && object.orderId !== null ? IndexerOrderId.fromPartial(object.orderId) : undefined;
        message.side = object.side ?? 0;
        message.quantums = object.quantums !== undefined && object.quantums !== null ? BigInt(object.quantums.toString()) : BigInt(0);
        message.subticks = object.subticks !== undefined && object.subticks !== null ? BigInt(object.subticks.toString()) : BigInt(0);
        message.goodTilBlock = object.goodTilBlock ?? undefined;
        message.goodTilBlockTime = object.goodTilBlockTime ?? undefined;
        message.timeInForce = object.timeInForce ?? 0;
        message.reduceOnly = object.reduceOnly ?? false;
        message.clientMetadata = object.clientMetadata ?? 0;
        message.conditionType = object.conditionType ?? 0;
        message.conditionalOrderTriggerSubticks = object.conditionalOrderTriggerSubticks !== undefined && object.conditionalOrderTriggerSubticks !== null ? BigInt(object.conditionalOrderTriggerSubticks.toString()) : BigInt(0);
        message.routerFeePpm = object.routerFeePpm ?? 0;
        message.routerFeeSubaccountOwner = object.routerFeeSubaccountOwner ?? "";
        message.routerFeeSubaccountNumber = object.routerFeeSubaccountNumber ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseIndexerOrder();
        if (object.order_id !== undefined && object.order_id !== null) {
            message.orderId = IndexerOrderId.fromAmino(object.order_id);
        }
        if (object.side !== undefined && object.side !== null) {
            message.side = object.side;
        }
        if (object.quantums !== undefined && object.quantums !== null) {
            message.quantums = BigInt(object.quantums);
        }
        if (object.subticks !== undefined && object.subticks !== null) {
            message.subticks = BigInt(object.subticks);
        }
        if (object.good_til_block !== undefined && object.good_til_block !== null) {
            message.goodTilBlock = object.good_til_block;
        }
        if (object.good_til_block_time !== undefined && object.good_til_block_time !== null) {
            message.goodTilBlockTime = object.good_til_block_time;
        }
        if (object.time_in_force !== undefined && object.time_in_force !== null) {
            message.timeInForce = object.time_in_force;
        }
        if (object.reduce_only !== undefined && object.reduce_only !== null) {
            message.reduceOnly = object.reduce_only;
        }
        if (object.client_metadata !== undefined && object.client_metadata !== null) {
            message.clientMetadata = object.client_metadata;
        }
        if (object.condition_type !== undefined && object.condition_type !== null) {
            message.conditionType = object.condition_type;
        }
        if (object.conditional_order_trigger_subticks !== undefined && object.conditional_order_trigger_subticks !== null) {
            message.conditionalOrderTriggerSubticks = BigInt(object.conditional_order_trigger_subticks);
        }
        if (object.router_fee_ppm !== undefined && object.router_fee_ppm !== null) {
            message.routerFeePpm = object.router_fee_ppm;
        }
        if (object.router_fee_subaccount_owner !== undefined && object.router_fee_subaccount_owner !== null) {
            message.routerFeeSubaccountOwner = object.router_fee_subaccount_owner;
        }
        if (object.router_fee_subaccount_number !== undefined && object.router_fee_subaccount_number !== null) {
            message.routerFeeSubaccountNumber = object.router_fee_subaccount_number;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order_id = message.orderId ? IndexerOrderId.toAmino(message.orderId) : undefined;
        obj.side = message.side === 0 ? undefined : message.side;
        obj.quantums = message.quantums !== BigInt(0) ? message.quantums?.toString() : undefined;
        obj.subticks = message.subticks !== BigInt(0) ? message.subticks?.toString() : undefined;
        obj.good_til_block = message.goodTilBlock === null ? undefined : message.goodTilBlock;
        obj.good_til_block_time = message.goodTilBlockTime === null ? undefined : message.goodTilBlockTime;
        obj.time_in_force = message.timeInForce === 0 ? undefined : message.timeInForce;
        obj.reduce_only = message.reduceOnly === false ? undefined : message.reduceOnly;
        obj.client_metadata = message.clientMetadata === 0 ? undefined : message.clientMetadata;
        obj.condition_type = message.conditionType === 0 ? undefined : message.conditionType;
        obj.conditional_order_trigger_subticks = message.conditionalOrderTriggerSubticks !== BigInt(0) ? message.conditionalOrderTriggerSubticks?.toString() : undefined;
        obj.router_fee_ppm = message.routerFeePpm === 0 ? undefined : message.routerFeePpm;
        obj.router_fee_subaccount_owner = message.routerFeeSubaccountOwner === "" ? undefined : message.routerFeeSubaccountOwner;
        obj.router_fee_subaccount_number = message.routerFeeSubaccountNumber === 0 ? undefined : message.routerFeeSubaccountNumber;
        return obj;
    },
    fromAminoMsg(object) {
        return IndexerOrder.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return IndexerOrder.decode(message.value);
    },
    toProto(message) {
        return IndexerOrder.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.protocol.v1.IndexerOrder",
            value: IndexerOrder.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(IndexerOrder.typeUrl, IndexerOrder);
