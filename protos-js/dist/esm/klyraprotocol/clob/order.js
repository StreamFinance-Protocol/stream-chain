//@ts-nocheck
import { SubaccountId } from "../subaccounts/subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { isSet } from "../../helpers";
/**
 * Represents the side of the orderbook the order will be placed on.
 * Note that Side.SIDE_UNSPECIFIED is an invalid order and cannot be
 * placed on the orderbook.
 */
export var Order_Side;
(function (Order_Side) {
    /** SIDE_UNSPECIFIED - Default value. This value is invalid and unused. */
    Order_Side[Order_Side["SIDE_UNSPECIFIED"] = 0] = "SIDE_UNSPECIFIED";
    /** SIDE_BUY - SIDE_BUY is used to represent a BUY order. */
    Order_Side[Order_Side["SIDE_BUY"] = 1] = "SIDE_BUY";
    /** SIDE_SELL - SIDE_SELL is used to represent a SELL order. */
    Order_Side[Order_Side["SIDE_SELL"] = 2] = "SIDE_SELL";
    Order_Side[Order_Side["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Order_Side || (Order_Side = {}));
export const Order_SideSDKType = Order_Side;
export const Order_SideAmino = Order_Side;
export function order_SideFromJSON(object) {
    switch (object) {
        case 0:
        case "SIDE_UNSPECIFIED":
            return Order_Side.SIDE_UNSPECIFIED;
        case 1:
        case "SIDE_BUY":
            return Order_Side.SIDE_BUY;
        case 2:
        case "SIDE_SELL":
            return Order_Side.SIDE_SELL;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Order_Side.UNRECOGNIZED;
    }
}
export function order_SideToJSON(object) {
    switch (object) {
        case Order_Side.SIDE_UNSPECIFIED:
            return "SIDE_UNSPECIFIED";
        case Order_Side.SIDE_BUY:
            return "SIDE_BUY";
        case Order_Side.SIDE_SELL:
            return "SIDE_SELL";
        case Order_Side.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/**
 * TimeInForce indicates how long an order will remain active before it
 * is executed or expires.
 */
export var Order_TimeInForce;
(function (Order_TimeInForce) {
    /**
     * TIME_IN_FORCE_UNSPECIFIED - TIME_IN_FORCE_UNSPECIFIED represents the default behavior where an
     * order will first match with existing orders on the book, and any
     * remaining size will be added to the book as a maker order.
     */
    Order_TimeInForce[Order_TimeInForce["TIME_IN_FORCE_UNSPECIFIED"] = 0] = "TIME_IN_FORCE_UNSPECIFIED";
    /**
     * TIME_IN_FORCE_IOC - TIME_IN_FORCE_IOC enforces that an order only be matched with
     * maker orders on the book. If the order has remaining size after
     * matching with existing orders on the book, the remaining size
     * is not placed on the book.
     */
    Order_TimeInForce[Order_TimeInForce["TIME_IN_FORCE_IOC"] = 1] = "TIME_IN_FORCE_IOC";
    /**
     * TIME_IN_FORCE_POST_ONLY - TIME_IN_FORCE_POST_ONLY enforces that an order only be placed
     * on the book as a maker order. Note this means that validators will cancel
     * any newly-placed post only orders that would cross with other maker
     * orders.
     */
    Order_TimeInForce[Order_TimeInForce["TIME_IN_FORCE_POST_ONLY"] = 2] = "TIME_IN_FORCE_POST_ONLY";
    /**
     * TIME_IN_FORCE_FILL_OR_KILL - TIME_IN_FORCE_FILL_OR_KILL enforces that an order will either be filled
     * completely and immediately by maker orders on the book or canceled if the
     * entire amount can‘t be matched.
     */
    Order_TimeInForce[Order_TimeInForce["TIME_IN_FORCE_FILL_OR_KILL"] = 3] = "TIME_IN_FORCE_FILL_OR_KILL";
    Order_TimeInForce[Order_TimeInForce["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Order_TimeInForce || (Order_TimeInForce = {}));
export const Order_TimeInForceSDKType = Order_TimeInForce;
export const Order_TimeInForceAmino = Order_TimeInForce;
export function order_TimeInForceFromJSON(object) {
    switch (object) {
        case 0:
        case "TIME_IN_FORCE_UNSPECIFIED":
            return Order_TimeInForce.TIME_IN_FORCE_UNSPECIFIED;
        case 1:
        case "TIME_IN_FORCE_IOC":
            return Order_TimeInForce.TIME_IN_FORCE_IOC;
        case 2:
        case "TIME_IN_FORCE_POST_ONLY":
            return Order_TimeInForce.TIME_IN_FORCE_POST_ONLY;
        case 3:
        case "TIME_IN_FORCE_FILL_OR_KILL":
            return Order_TimeInForce.TIME_IN_FORCE_FILL_OR_KILL;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Order_TimeInForce.UNRECOGNIZED;
    }
}
export function order_TimeInForceToJSON(object) {
    switch (object) {
        case Order_TimeInForce.TIME_IN_FORCE_UNSPECIFIED:
            return "TIME_IN_FORCE_UNSPECIFIED";
        case Order_TimeInForce.TIME_IN_FORCE_IOC:
            return "TIME_IN_FORCE_IOC";
        case Order_TimeInForce.TIME_IN_FORCE_POST_ONLY:
            return "TIME_IN_FORCE_POST_ONLY";
        case Order_TimeInForce.TIME_IN_FORCE_FILL_OR_KILL:
            return "TIME_IN_FORCE_FILL_OR_KILL";
        case Order_TimeInForce.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
export var Order_ConditionType;
(function (Order_ConditionType) {
    /**
     * CONDITION_TYPE_UNSPECIFIED - CONDITION_TYPE_UNSPECIFIED represents the default behavior where an
     * order will be placed immediately on the orderbook.
     */
    Order_ConditionType[Order_ConditionType["CONDITION_TYPE_UNSPECIFIED"] = 0] = "CONDITION_TYPE_UNSPECIFIED";
    /**
     * CONDITION_TYPE_STOP_LOSS - CONDITION_TYPE_STOP_LOSS represents a stop order. A stop order will
     * trigger when the oracle price moves at or above the trigger price for
     * buys, and at or below the trigger price for sells.
     */
    Order_ConditionType[Order_ConditionType["CONDITION_TYPE_STOP_LOSS"] = 1] = "CONDITION_TYPE_STOP_LOSS";
    /**
     * CONDITION_TYPE_TAKE_PROFIT - CONDITION_TYPE_TAKE_PROFIT represents a take profit order. A take profit
     * order will trigger when the oracle price moves at or below the trigger
     * price for buys and at or above the trigger price for sells.
     */
    Order_ConditionType[Order_ConditionType["CONDITION_TYPE_TAKE_PROFIT"] = 2] = "CONDITION_TYPE_TAKE_PROFIT";
    Order_ConditionType[Order_ConditionType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Order_ConditionType || (Order_ConditionType = {}));
export const Order_ConditionTypeSDKType = Order_ConditionType;
export const Order_ConditionTypeAmino = Order_ConditionType;
export function order_ConditionTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "CONDITION_TYPE_UNSPECIFIED":
            return Order_ConditionType.CONDITION_TYPE_UNSPECIFIED;
        case 1:
        case "CONDITION_TYPE_STOP_LOSS":
            return Order_ConditionType.CONDITION_TYPE_STOP_LOSS;
        case 2:
        case "CONDITION_TYPE_TAKE_PROFIT":
            return Order_ConditionType.CONDITION_TYPE_TAKE_PROFIT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Order_ConditionType.UNRECOGNIZED;
    }
}
export function order_ConditionTypeToJSON(object) {
    switch (object) {
        case Order_ConditionType.CONDITION_TYPE_UNSPECIFIED:
            return "CONDITION_TYPE_UNSPECIFIED";
        case Order_ConditionType.CONDITION_TYPE_STOP_LOSS:
            return "CONDITION_TYPE_STOP_LOSS";
        case Order_ConditionType.CONDITION_TYPE_TAKE_PROFIT:
            return "CONDITION_TYPE_TAKE_PROFIT";
        case Order_ConditionType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseOrderId() {
    return {
        subaccountId: SubaccountId.fromPartial({}),
        clientId: 0,
        orderFlags: 0,
        clobPairId: 0
    };
}
export const OrderId = {
    typeUrl: "/klyraprotocol.clob.OrderId",
    is(o) {
        return o && (o.$typeUrl === OrderId.typeUrl || SubaccountId.is(o.subaccountId) && typeof o.clientId === "number" && typeof o.orderFlags === "number" && typeof o.clobPairId === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === OrderId.typeUrl || SubaccountId.isSDK(o.subaccount_id) && typeof o.client_id === "number" && typeof o.order_flags === "number" && typeof o.clob_pair_id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === OrderId.typeUrl || SubaccountId.isAmino(o.subaccount_id) && typeof o.client_id === "number" && typeof o.order_flags === "number" && typeof o.clob_pair_id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.subaccountId !== undefined) {
            SubaccountId.encode(message.subaccountId, writer.uint32(10).fork()).ldelim();
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
        const message = createBaseOrderId();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subaccountId = SubaccountId.decode(reader, reader.uint32());
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
        const message = createBaseOrderId();
        message.subaccountId = object.subaccountId !== undefined && object.subaccountId !== null ? SubaccountId.fromPartial(object.subaccountId) : undefined;
        message.clientId = object.clientId ?? 0;
        message.orderFlags = object.orderFlags ?? 0;
        message.clobPairId = object.clobPairId ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseOrderId();
        if (object.subaccount_id !== undefined && object.subaccount_id !== null) {
            message.subaccountId = SubaccountId.fromAmino(object.subaccount_id);
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
        obj.subaccount_id = message.subaccountId ? SubaccountId.toAmino(message.subaccountId) : undefined;
        obj.client_id = message.clientId === 0 ? undefined : message.clientId;
        obj.order_flags = message.orderFlags === 0 ? undefined : message.orderFlags;
        obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
        return obj;
    },
    fromAminoMsg(object) {
        return OrderId.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return OrderId.decode(message.value);
    },
    toProto(message) {
        return OrderId.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.OrderId",
            value: OrderId.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(OrderId.typeUrl, OrderId);
function createBaseOrdersFilledDuringLatestBlock() {
    return {
        orderIds: []
    };
}
export const OrdersFilledDuringLatestBlock = {
    typeUrl: "/klyraprotocol.clob.OrdersFilledDuringLatestBlock",
    is(o) {
        return o && (o.$typeUrl === OrdersFilledDuringLatestBlock.typeUrl || Array.isArray(o.orderIds) && (!o.orderIds.length || OrderId.is(o.orderIds[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === OrdersFilledDuringLatestBlock.typeUrl || Array.isArray(o.order_ids) && (!o.order_ids.length || OrderId.isSDK(o.order_ids[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === OrdersFilledDuringLatestBlock.typeUrl || Array.isArray(o.order_ids) && (!o.order_ids.length || OrderId.isAmino(o.order_ids[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.orderIds) {
            OrderId.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrdersFilledDuringLatestBlock();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderIds.push(OrderId.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOrdersFilledDuringLatestBlock();
        message.orderIds = object.orderIds?.map(e => OrderId.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseOrdersFilledDuringLatestBlock();
        message.orderIds = object.order_ids?.map(e => OrderId.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.orderIds) {
            obj.order_ids = message.orderIds.map(e => e ? OrderId.toAmino(e) : undefined);
        }
        else {
            obj.order_ids = message.orderIds;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return OrdersFilledDuringLatestBlock.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return OrdersFilledDuringLatestBlock.decode(message.value);
    },
    toProto(message) {
        return OrdersFilledDuringLatestBlock.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.OrdersFilledDuringLatestBlock",
            value: OrdersFilledDuringLatestBlock.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(OrdersFilledDuringLatestBlock.typeUrl, OrdersFilledDuringLatestBlock);
function createBasePotentiallyPrunableOrders() {
    return {
        orderIds: []
    };
}
export const PotentiallyPrunableOrders = {
    typeUrl: "/klyraprotocol.clob.PotentiallyPrunableOrders",
    is(o) {
        return o && (o.$typeUrl === PotentiallyPrunableOrders.typeUrl || Array.isArray(o.orderIds) && (!o.orderIds.length || OrderId.is(o.orderIds[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === PotentiallyPrunableOrders.typeUrl || Array.isArray(o.order_ids) && (!o.order_ids.length || OrderId.isSDK(o.order_ids[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === PotentiallyPrunableOrders.typeUrl || Array.isArray(o.order_ids) && (!o.order_ids.length || OrderId.isAmino(o.order_ids[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.orderIds) {
            OrderId.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePotentiallyPrunableOrders();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderIds.push(OrderId.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePotentiallyPrunableOrders();
        message.orderIds = object.orderIds?.map(e => OrderId.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBasePotentiallyPrunableOrders();
        message.orderIds = object.order_ids?.map(e => OrderId.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.orderIds) {
            obj.order_ids = message.orderIds.map(e => e ? OrderId.toAmino(e) : undefined);
        }
        else {
            obj.order_ids = message.orderIds;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return PotentiallyPrunableOrders.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return PotentiallyPrunableOrders.decode(message.value);
    },
    toProto(message) {
        return PotentiallyPrunableOrders.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.PotentiallyPrunableOrders",
            value: PotentiallyPrunableOrders.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(PotentiallyPrunableOrders.typeUrl, PotentiallyPrunableOrders);
function createBaseOrderFillState() {
    return {
        fillAmount: BigInt(0),
        prunableBlockHeight: 0
    };
}
export const OrderFillState = {
    typeUrl: "/klyraprotocol.clob.OrderFillState",
    is(o) {
        return o && (o.$typeUrl === OrderFillState.typeUrl || typeof o.fillAmount === "bigint" && typeof o.prunableBlockHeight === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === OrderFillState.typeUrl || typeof o.fill_amount === "bigint" && typeof o.prunable_block_height === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === OrderFillState.typeUrl || typeof o.fill_amount === "bigint" && typeof o.prunable_block_height === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.fillAmount !== BigInt(0)) {
            writer.uint32(8).uint64(message.fillAmount);
        }
        if (message.prunableBlockHeight !== 0) {
            writer.uint32(16).uint32(message.prunableBlockHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrderFillState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fillAmount = reader.uint64();
                    break;
                case 2:
                    message.prunableBlockHeight = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOrderFillState();
        message.fillAmount = object.fillAmount !== undefined && object.fillAmount !== null ? BigInt(object.fillAmount.toString()) : BigInt(0);
        message.prunableBlockHeight = object.prunableBlockHeight ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseOrderFillState();
        if (object.fill_amount !== undefined && object.fill_amount !== null) {
            message.fillAmount = BigInt(object.fill_amount);
        }
        if (object.prunable_block_height !== undefined && object.prunable_block_height !== null) {
            message.prunableBlockHeight = object.prunable_block_height;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.fill_amount = message.fillAmount !== BigInt(0) ? message.fillAmount?.toString() : undefined;
        obj.prunable_block_height = message.prunableBlockHeight === 0 ? undefined : message.prunableBlockHeight;
        return obj;
    },
    fromAminoMsg(object) {
        return OrderFillState.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return OrderFillState.decode(message.value);
    },
    toProto(message) {
        return OrderFillState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.OrderFillState",
            value: OrderFillState.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(OrderFillState.typeUrl, OrderFillState);
function createBaseStatefulOrderTimeSliceValue() {
    return {
        orderIds: []
    };
}
export const StatefulOrderTimeSliceValue = {
    typeUrl: "/klyraprotocol.clob.StatefulOrderTimeSliceValue",
    is(o) {
        return o && (o.$typeUrl === StatefulOrderTimeSliceValue.typeUrl || Array.isArray(o.orderIds) && (!o.orderIds.length || OrderId.is(o.orderIds[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === StatefulOrderTimeSliceValue.typeUrl || Array.isArray(o.order_ids) && (!o.order_ids.length || OrderId.isSDK(o.order_ids[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === StatefulOrderTimeSliceValue.typeUrl || Array.isArray(o.order_ids) && (!o.order_ids.length || OrderId.isAmino(o.order_ids[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.orderIds) {
            OrderId.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatefulOrderTimeSliceValue();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderIds.push(OrderId.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStatefulOrderTimeSliceValue();
        message.orderIds = object.orderIds?.map(e => OrderId.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseStatefulOrderTimeSliceValue();
        message.orderIds = object.order_ids?.map(e => OrderId.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.orderIds) {
            obj.order_ids = message.orderIds.map(e => e ? OrderId.toAmino(e) : undefined);
        }
        else {
            obj.order_ids = message.orderIds;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return StatefulOrderTimeSliceValue.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return StatefulOrderTimeSliceValue.decode(message.value);
    },
    toProto(message) {
        return StatefulOrderTimeSliceValue.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.StatefulOrderTimeSliceValue",
            value: StatefulOrderTimeSliceValue.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(StatefulOrderTimeSliceValue.typeUrl, StatefulOrderTimeSliceValue);
function createBaseLongTermOrderPlacement() {
    return {
        order: Order.fromPartial({}),
        placementIndex: TransactionOrdering.fromPartial({})
    };
}
export const LongTermOrderPlacement = {
    typeUrl: "/klyraprotocol.clob.LongTermOrderPlacement",
    is(o) {
        return o && (o.$typeUrl === LongTermOrderPlacement.typeUrl || Order.is(o.order) && TransactionOrdering.is(o.placementIndex));
    },
    isSDK(o) {
        return o && (o.$typeUrl === LongTermOrderPlacement.typeUrl || Order.isSDK(o.order) && TransactionOrdering.isSDK(o.placement_index));
    },
    isAmino(o) {
        return o && (o.$typeUrl === LongTermOrderPlacement.typeUrl || Order.isAmino(o.order) && TransactionOrdering.isAmino(o.placement_index));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.order !== undefined) {
            Order.encode(message.order, writer.uint32(10).fork()).ldelim();
        }
        if (message.placementIndex !== undefined) {
            TransactionOrdering.encode(message.placementIndex, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLongTermOrderPlacement();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.order = Order.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.placementIndex = TransactionOrdering.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseLongTermOrderPlacement();
        message.order = object.order !== undefined && object.order !== null ? Order.fromPartial(object.order) : undefined;
        message.placementIndex = object.placementIndex !== undefined && object.placementIndex !== null ? TransactionOrdering.fromPartial(object.placementIndex) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseLongTermOrderPlacement();
        if (object.order !== undefined && object.order !== null) {
            message.order = Order.fromAmino(object.order);
        }
        if (object.placement_index !== undefined && object.placement_index !== null) {
            message.placementIndex = TransactionOrdering.fromAmino(object.placement_index);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order = message.order ? Order.toAmino(message.order) : undefined;
        obj.placement_index = message.placementIndex ? TransactionOrdering.toAmino(message.placementIndex) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return LongTermOrderPlacement.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return LongTermOrderPlacement.decode(message.value);
    },
    toProto(message) {
        return LongTermOrderPlacement.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.LongTermOrderPlacement",
            value: LongTermOrderPlacement.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(LongTermOrderPlacement.typeUrl, LongTermOrderPlacement);
function createBaseConditionalOrderPlacement() {
    return {
        order: Order.fromPartial({}),
        placementIndex: TransactionOrdering.fromPartial({}),
        triggerIndex: undefined
    };
}
export const ConditionalOrderPlacement = {
    typeUrl: "/klyraprotocol.clob.ConditionalOrderPlacement",
    is(o) {
        return o && (o.$typeUrl === ConditionalOrderPlacement.typeUrl || Order.is(o.order) && TransactionOrdering.is(o.placementIndex));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ConditionalOrderPlacement.typeUrl || Order.isSDK(o.order) && TransactionOrdering.isSDK(o.placement_index));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ConditionalOrderPlacement.typeUrl || Order.isAmino(o.order) && TransactionOrdering.isAmino(o.placement_index));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.order !== undefined) {
            Order.encode(message.order, writer.uint32(10).fork()).ldelim();
        }
        if (message.placementIndex !== undefined) {
            TransactionOrdering.encode(message.placementIndex, writer.uint32(18).fork()).ldelim();
        }
        if (message.triggerIndex !== undefined) {
            TransactionOrdering.encode(message.triggerIndex, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConditionalOrderPlacement();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.order = Order.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.placementIndex = TransactionOrdering.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.triggerIndex = TransactionOrdering.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseConditionalOrderPlacement();
        message.order = object.order !== undefined && object.order !== null ? Order.fromPartial(object.order) : undefined;
        message.placementIndex = object.placementIndex !== undefined && object.placementIndex !== null ? TransactionOrdering.fromPartial(object.placementIndex) : undefined;
        message.triggerIndex = object.triggerIndex !== undefined && object.triggerIndex !== null ? TransactionOrdering.fromPartial(object.triggerIndex) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseConditionalOrderPlacement();
        if (object.order !== undefined && object.order !== null) {
            message.order = Order.fromAmino(object.order);
        }
        if (object.placement_index !== undefined && object.placement_index !== null) {
            message.placementIndex = TransactionOrdering.fromAmino(object.placement_index);
        }
        if (object.trigger_index !== undefined && object.trigger_index !== null) {
            message.triggerIndex = TransactionOrdering.fromAmino(object.trigger_index);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order = message.order ? Order.toAmino(message.order) : undefined;
        obj.placement_index = message.placementIndex ? TransactionOrdering.toAmino(message.placementIndex) : undefined;
        obj.trigger_index = message.triggerIndex ? TransactionOrdering.toAmino(message.triggerIndex) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return ConditionalOrderPlacement.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return ConditionalOrderPlacement.decode(message.value);
    },
    toProto(message) {
        return ConditionalOrderPlacement.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.ConditionalOrderPlacement",
            value: ConditionalOrderPlacement.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ConditionalOrderPlacement.typeUrl, ConditionalOrderPlacement);
function createBaseOrder() {
    return {
        orderId: OrderId.fromPartial({}),
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
        routerSubaccountId: undefined
    };
}
export const Order = {
    typeUrl: "/klyraprotocol.clob.Order",
    is(o) {
        return o && (o.$typeUrl === Order.typeUrl || OrderId.is(o.orderId) && isSet(o.side) && typeof o.quantums === "bigint" && typeof o.subticks === "bigint" && isSet(o.timeInForce) && typeof o.reduceOnly === "boolean" && typeof o.clientMetadata === "number" && isSet(o.conditionType) && typeof o.conditionalOrderTriggerSubticks === "bigint" && typeof o.routerFeePpm === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Order.typeUrl || OrderId.isSDK(o.order_id) && isSet(o.side) && typeof o.quantums === "bigint" && typeof o.subticks === "bigint" && isSet(o.time_in_force) && typeof o.reduce_only === "boolean" && typeof o.client_metadata === "number" && isSet(o.condition_type) && typeof o.conditional_order_trigger_subticks === "bigint" && typeof o.router_fee_ppm === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Order.typeUrl || OrderId.isAmino(o.order_id) && isSet(o.side) && typeof o.quantums === "bigint" && typeof o.subticks === "bigint" && isSet(o.time_in_force) && typeof o.reduce_only === "boolean" && typeof o.client_metadata === "number" && isSet(o.condition_type) && typeof o.conditional_order_trigger_subticks === "bigint" && typeof o.router_fee_ppm === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.orderId !== undefined) {
            OrderId.encode(message.orderId, writer.uint32(10).fork()).ldelim();
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
        if (message.routerSubaccountId !== undefined) {
            SubaccountId.encode(message.routerSubaccountId, writer.uint32(106).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrder();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderId = OrderId.decode(reader, reader.uint32());
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
                    message.routerSubaccountId = SubaccountId.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOrder();
        message.orderId = object.orderId !== undefined && object.orderId !== null ? OrderId.fromPartial(object.orderId) : undefined;
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
        message.routerSubaccountId = object.routerSubaccountId !== undefined && object.routerSubaccountId !== null ? SubaccountId.fromPartial(object.routerSubaccountId) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseOrder();
        if (object.order_id !== undefined && object.order_id !== null) {
            message.orderId = OrderId.fromAmino(object.order_id);
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
        if (object.router_subaccount_id !== undefined && object.router_subaccount_id !== null) {
            message.routerSubaccountId = SubaccountId.fromAmino(object.router_subaccount_id);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order_id = message.orderId ? OrderId.toAmino(message.orderId) : undefined;
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
        obj.router_subaccount_id = message.routerSubaccountId ? SubaccountId.toAmino(message.routerSubaccountId) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return Order.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return Order.decode(message.value);
    },
    toProto(message) {
        return Order.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.Order",
            value: Order.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Order.typeUrl, Order);
function createBaseTransactionOrdering() {
    return {
        blockHeight: 0,
        transactionIndex: 0
    };
}
export const TransactionOrdering = {
    typeUrl: "/klyraprotocol.clob.TransactionOrdering",
    is(o) {
        return o && (o.$typeUrl === TransactionOrdering.typeUrl || typeof o.blockHeight === "number" && typeof o.transactionIndex === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === TransactionOrdering.typeUrl || typeof o.block_height === "number" && typeof o.transaction_index === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === TransactionOrdering.typeUrl || typeof o.block_height === "number" && typeof o.transaction_index === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.blockHeight !== 0) {
            writer.uint32(8).uint32(message.blockHeight);
        }
        if (message.transactionIndex !== 0) {
            writer.uint32(16).uint32(message.transactionIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTransactionOrdering();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockHeight = reader.uint32();
                    break;
                case 2:
                    message.transactionIndex = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseTransactionOrdering();
        message.blockHeight = object.blockHeight ?? 0;
        message.transactionIndex = object.transactionIndex ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseTransactionOrdering();
        if (object.block_height !== undefined && object.block_height !== null) {
            message.blockHeight = object.block_height;
        }
        if (object.transaction_index !== undefined && object.transaction_index !== null) {
            message.transactionIndex = object.transaction_index;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.block_height = message.blockHeight === 0 ? undefined : message.blockHeight;
        obj.transaction_index = message.transactionIndex === 0 ? undefined : message.transactionIndex;
        return obj;
    },
    fromAminoMsg(object) {
        return TransactionOrdering.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return TransactionOrdering.decode(message.value);
    },
    toProto(message) {
        return TransactionOrdering.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.TransactionOrdering",
            value: TransactionOrdering.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(TransactionOrdering.typeUrl, TransactionOrdering);
