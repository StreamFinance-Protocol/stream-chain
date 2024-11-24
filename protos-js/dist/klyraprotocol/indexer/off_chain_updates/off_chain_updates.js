"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffChainUpdateV1 = exports.OrderUpdateV1 = exports.OrderRemoveV1 = exports.OrderPlaceV1 = exports.OrderRemoveV1_OrderRemovalStatusAmino = exports.OrderRemoveV1_OrderRemovalStatusSDKType = exports.OrderRemoveV1_OrderRemovalStatus = exports.OrderPlaceV1_OrderPlacementStatusAmino = exports.OrderPlaceV1_OrderPlacementStatusSDKType = exports.OrderPlaceV1_OrderPlacementStatus = void 0;
exports.orderPlaceV1_OrderPlacementStatusFromJSON = orderPlaceV1_OrderPlacementStatusFromJSON;
exports.orderPlaceV1_OrderPlacementStatusToJSON = orderPlaceV1_OrderPlacementStatusToJSON;
exports.orderRemoveV1_OrderRemovalStatusFromJSON = orderRemoveV1_OrderRemovalStatusFromJSON;
exports.orderRemoveV1_OrderRemovalStatusToJSON = orderRemoveV1_OrderRemovalStatusToJSON;
//@ts-nocheck
const clob_1 = require("../protocol/v1/clob");
const helpers_1 = require("../../../helpers");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
/**
 * OrderPlacementStatus is an enum for the resulting status after an order is
 * placed.
 */
var OrderPlaceV1_OrderPlacementStatus;
(function (OrderPlaceV1_OrderPlacementStatus) {
    /** ORDER_PLACEMENT_STATUS_UNSPECIFIED - Default value, this is invalid and unused. */
    OrderPlaceV1_OrderPlacementStatus[OrderPlaceV1_OrderPlacementStatus["ORDER_PLACEMENT_STATUS_UNSPECIFIED"] = 0] = "ORDER_PLACEMENT_STATUS_UNSPECIFIED";
    /**
     * ORDER_PLACEMENT_STATUS_BEST_EFFORT_OPENED - A best effort opened order is one that has only been confirmed to be
     * placed on the Klyra node sending the off-chain update message.
     * The cases where this happens includes:
     * - The Klyra node places an order in it's in-memory orderbook during the
     *   CheckTx flow.
     * A best effort placed order may not have been placed on other Klyra
     * nodes including other Klyra validator nodes and may still be excluded in
     * future order matches.
     */
    OrderPlaceV1_OrderPlacementStatus[OrderPlaceV1_OrderPlacementStatus["ORDER_PLACEMENT_STATUS_BEST_EFFORT_OPENED"] = 1] = "ORDER_PLACEMENT_STATUS_BEST_EFFORT_OPENED";
    /**
     * ORDER_PLACEMENT_STATUS_OPENED - An opened order is one that is confirmed to be placed on all Klyra nodes
     * (discounting dishonest Klyra nodes) and will be included in any future
     * order matches.
     * This status is used internally by the indexer and will not be sent
     * out by protocol.
     */
    OrderPlaceV1_OrderPlacementStatus[OrderPlaceV1_OrderPlacementStatus["ORDER_PLACEMENT_STATUS_OPENED"] = 2] = "ORDER_PLACEMENT_STATUS_OPENED";
    OrderPlaceV1_OrderPlacementStatus[OrderPlaceV1_OrderPlacementStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OrderPlaceV1_OrderPlacementStatus || (exports.OrderPlaceV1_OrderPlacementStatus = OrderPlaceV1_OrderPlacementStatus = {}));
exports.OrderPlaceV1_OrderPlacementStatusSDKType = OrderPlaceV1_OrderPlacementStatus;
exports.OrderPlaceV1_OrderPlacementStatusAmino = OrderPlaceV1_OrderPlacementStatus;
function orderPlaceV1_OrderPlacementStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "ORDER_PLACEMENT_STATUS_UNSPECIFIED":
            return OrderPlaceV1_OrderPlacementStatus.ORDER_PLACEMENT_STATUS_UNSPECIFIED;
        case 1:
        case "ORDER_PLACEMENT_STATUS_BEST_EFFORT_OPENED":
            return OrderPlaceV1_OrderPlacementStatus.ORDER_PLACEMENT_STATUS_BEST_EFFORT_OPENED;
        case 2:
        case "ORDER_PLACEMENT_STATUS_OPENED":
            return OrderPlaceV1_OrderPlacementStatus.ORDER_PLACEMENT_STATUS_OPENED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return OrderPlaceV1_OrderPlacementStatus.UNRECOGNIZED;
    }
}
function orderPlaceV1_OrderPlacementStatusToJSON(object) {
    switch (object) {
        case OrderPlaceV1_OrderPlacementStatus.ORDER_PLACEMENT_STATUS_UNSPECIFIED:
            return "ORDER_PLACEMENT_STATUS_UNSPECIFIED";
        case OrderPlaceV1_OrderPlacementStatus.ORDER_PLACEMENT_STATUS_BEST_EFFORT_OPENED:
            return "ORDER_PLACEMENT_STATUS_BEST_EFFORT_OPENED";
        case OrderPlaceV1_OrderPlacementStatus.ORDER_PLACEMENT_STATUS_OPENED:
            return "ORDER_PLACEMENT_STATUS_OPENED";
        case OrderPlaceV1_OrderPlacementStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/**
 * OrderRemovalStatus is an enum for the resulting status after an order is
 * removed.
 */
var OrderRemoveV1_OrderRemovalStatus;
(function (OrderRemoveV1_OrderRemovalStatus) {
    /** ORDER_REMOVAL_STATUS_UNSPECIFIED - Default value, this is invalid and unused. */
    OrderRemoveV1_OrderRemovalStatus[OrderRemoveV1_OrderRemovalStatus["ORDER_REMOVAL_STATUS_UNSPECIFIED"] = 0] = "ORDER_REMOVAL_STATUS_UNSPECIFIED";
    /**
     * ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED - A best effort canceled order is one that has only been confirmed to be
     * removed on the Klyra node sending the off-chain update message.
     * The cases where this happens includes:
     * - the order was removed due to the Klyra node receiving a CancelOrder
     *   transaction for the order.
     * - the order was removed due to being undercollateralized during
     *   optimistic matching.
     * A best effort canceled order may not have been removed on other Klyra
     * nodes including other Klyra validator nodes and may still be included in
     * future order matches.
     */
    OrderRemoveV1_OrderRemovalStatus[OrderRemoveV1_OrderRemovalStatus["ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED"] = 1] = "ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED";
    /**
     * ORDER_REMOVAL_STATUS_CANCELED - A canceled order is one that is confirmed to be removed on all Klyra nodes
     * (discounting dishonest Klyra nodes) and will not be included in any future
     * order matches.
     * The cases where this happens includes:
     * - the order is expired.
     */
    OrderRemoveV1_OrderRemovalStatus[OrderRemoveV1_OrderRemovalStatus["ORDER_REMOVAL_STATUS_CANCELED"] = 2] = "ORDER_REMOVAL_STATUS_CANCELED";
    /** ORDER_REMOVAL_STATUS_FILLED - An order was fully-filled. Only sent by the Indexer for stateful orders. */
    OrderRemoveV1_OrderRemovalStatus[OrderRemoveV1_OrderRemovalStatus["ORDER_REMOVAL_STATUS_FILLED"] = 3] = "ORDER_REMOVAL_STATUS_FILLED";
    OrderRemoveV1_OrderRemovalStatus[OrderRemoveV1_OrderRemovalStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OrderRemoveV1_OrderRemovalStatus || (exports.OrderRemoveV1_OrderRemovalStatus = OrderRemoveV1_OrderRemovalStatus = {}));
exports.OrderRemoveV1_OrderRemovalStatusSDKType = OrderRemoveV1_OrderRemovalStatus;
exports.OrderRemoveV1_OrderRemovalStatusAmino = OrderRemoveV1_OrderRemovalStatus;
function orderRemoveV1_OrderRemovalStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "ORDER_REMOVAL_STATUS_UNSPECIFIED":
            return OrderRemoveV1_OrderRemovalStatus.ORDER_REMOVAL_STATUS_UNSPECIFIED;
        case 1:
        case "ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED":
            return OrderRemoveV1_OrderRemovalStatus.ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED;
        case 2:
        case "ORDER_REMOVAL_STATUS_CANCELED":
            return OrderRemoveV1_OrderRemovalStatus.ORDER_REMOVAL_STATUS_CANCELED;
        case 3:
        case "ORDER_REMOVAL_STATUS_FILLED":
            return OrderRemoveV1_OrderRemovalStatus.ORDER_REMOVAL_STATUS_FILLED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return OrderRemoveV1_OrderRemovalStatus.UNRECOGNIZED;
    }
}
function orderRemoveV1_OrderRemovalStatusToJSON(object) {
    switch (object) {
        case OrderRemoveV1_OrderRemovalStatus.ORDER_REMOVAL_STATUS_UNSPECIFIED:
            return "ORDER_REMOVAL_STATUS_UNSPECIFIED";
        case OrderRemoveV1_OrderRemovalStatus.ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED:
            return "ORDER_REMOVAL_STATUS_BEST_EFFORT_CANCELED";
        case OrderRemoveV1_OrderRemovalStatus.ORDER_REMOVAL_STATUS_CANCELED:
            return "ORDER_REMOVAL_STATUS_CANCELED";
        case OrderRemoveV1_OrderRemovalStatus.ORDER_REMOVAL_STATUS_FILLED:
            return "ORDER_REMOVAL_STATUS_FILLED";
        case OrderRemoveV1_OrderRemovalStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseOrderPlaceV1() {
    return {
        order: undefined,
        placementStatus: 0
    };
}
exports.OrderPlaceV1 = {
    typeUrl: "/klyraprotocol.indexer.off_chain_updates.OrderPlaceV1",
    is(o) {
        return o && (o.$typeUrl === exports.OrderPlaceV1.typeUrl || (0, helpers_1.isSet)(o.placementStatus));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.OrderPlaceV1.typeUrl || (0, helpers_1.isSet)(o.placement_status));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.OrderPlaceV1.typeUrl || (0, helpers_1.isSet)(o.placement_status));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.order !== undefined) {
            clob_1.IndexerOrder.encode(message.order, writer.uint32(10).fork()).ldelim();
        }
        if (message.placementStatus !== 0) {
            writer.uint32(16).int32(message.placementStatus);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrderPlaceV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.order = clob_1.IndexerOrder.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.placementStatus = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOrderPlaceV1();
        message.order = object.order !== undefined && object.order !== null ? clob_1.IndexerOrder.fromPartial(object.order) : undefined;
        message.placementStatus = object.placementStatus ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseOrderPlaceV1();
        if (object.order !== undefined && object.order !== null) {
            message.order = clob_1.IndexerOrder.fromAmino(object.order);
        }
        if (object.placement_status !== undefined && object.placement_status !== null) {
            message.placementStatus = object.placement_status;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order = message.order ? clob_1.IndexerOrder.toAmino(message.order) : undefined;
        obj.placement_status = message.placementStatus === 0 ? undefined : message.placementStatus;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.OrderPlaceV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.OrderPlaceV1.decode(message.value);
    },
    toProto(message) {
        return exports.OrderPlaceV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.off_chain_updates.OrderPlaceV1",
            value: exports.OrderPlaceV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.OrderPlaceV1.typeUrl, exports.OrderPlaceV1);
function createBaseOrderRemoveV1() {
    return {
        removedOrderId: undefined,
        reason: 0,
        removalStatus: 0
    };
}
exports.OrderRemoveV1 = {
    typeUrl: "/klyraprotocol.indexer.off_chain_updates.OrderRemoveV1",
    is(o) {
        return o && (o.$typeUrl === exports.OrderRemoveV1.typeUrl || (0, helpers_1.isSet)(o.reason) && (0, helpers_1.isSet)(o.removalStatus));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.OrderRemoveV1.typeUrl || (0, helpers_1.isSet)(o.reason) && (0, helpers_1.isSet)(o.removal_status));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.OrderRemoveV1.typeUrl || (0, helpers_1.isSet)(o.reason) && (0, helpers_1.isSet)(o.removal_status));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.removedOrderId !== undefined) {
            clob_1.IndexerOrderId.encode(message.removedOrderId, writer.uint32(10).fork()).ldelim();
        }
        if (message.reason !== 0) {
            writer.uint32(16).int32(message.reason);
        }
        if (message.removalStatus !== 0) {
            writer.uint32(24).int32(message.removalStatus);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrderRemoveV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.removedOrderId = clob_1.IndexerOrderId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.reason = reader.int32();
                    break;
                case 3:
                    message.removalStatus = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOrderRemoveV1();
        message.removedOrderId = object.removedOrderId !== undefined && object.removedOrderId !== null ? clob_1.IndexerOrderId.fromPartial(object.removedOrderId) : undefined;
        message.reason = object.reason ?? 0;
        message.removalStatus = object.removalStatus ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseOrderRemoveV1();
        if (object.removed_order_id !== undefined && object.removed_order_id !== null) {
            message.removedOrderId = clob_1.IndexerOrderId.fromAmino(object.removed_order_id);
        }
        if (object.reason !== undefined && object.reason !== null) {
            message.reason = object.reason;
        }
        if (object.removal_status !== undefined && object.removal_status !== null) {
            message.removalStatus = object.removal_status;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.removed_order_id = message.removedOrderId ? clob_1.IndexerOrderId.toAmino(message.removedOrderId) : undefined;
        obj.reason = message.reason === 0 ? undefined : message.reason;
        obj.removal_status = message.removalStatus === 0 ? undefined : message.removalStatus;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.OrderRemoveV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.OrderRemoveV1.decode(message.value);
    },
    toProto(message) {
        return exports.OrderRemoveV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.off_chain_updates.OrderRemoveV1",
            value: exports.OrderRemoveV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.OrderRemoveV1.typeUrl, exports.OrderRemoveV1);
function createBaseOrderUpdateV1() {
    return {
        orderId: undefined,
        totalFilledQuantums: BigInt(0)
    };
}
exports.OrderUpdateV1 = {
    typeUrl: "/klyraprotocol.indexer.off_chain_updates.OrderUpdateV1",
    is(o) {
        return o && (o.$typeUrl === exports.OrderUpdateV1.typeUrl || typeof o.totalFilledQuantums === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.OrderUpdateV1.typeUrl || typeof o.total_filled_quantums === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.OrderUpdateV1.typeUrl || typeof o.total_filled_quantums === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.orderId !== undefined) {
            clob_1.IndexerOrderId.encode(message.orderId, writer.uint32(10).fork()).ldelim();
        }
        if (message.totalFilledQuantums !== BigInt(0)) {
            writer.uint32(16).uint64(message.totalFilledQuantums);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrderUpdateV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderId = clob_1.IndexerOrderId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.totalFilledQuantums = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOrderUpdateV1();
        message.orderId = object.orderId !== undefined && object.orderId !== null ? clob_1.IndexerOrderId.fromPartial(object.orderId) : undefined;
        message.totalFilledQuantums = object.totalFilledQuantums !== undefined && object.totalFilledQuantums !== null ? BigInt(object.totalFilledQuantums.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseOrderUpdateV1();
        if (object.order_id !== undefined && object.order_id !== null) {
            message.orderId = clob_1.IndexerOrderId.fromAmino(object.order_id);
        }
        if (object.total_filled_quantums !== undefined && object.total_filled_quantums !== null) {
            message.totalFilledQuantums = BigInt(object.total_filled_quantums);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order_id = message.orderId ? clob_1.IndexerOrderId.toAmino(message.orderId) : undefined;
        obj.total_filled_quantums = message.totalFilledQuantums !== BigInt(0) ? message.totalFilledQuantums?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.OrderUpdateV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.OrderUpdateV1.decode(message.value);
    },
    toProto(message) {
        return exports.OrderUpdateV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.off_chain_updates.OrderUpdateV1",
            value: exports.OrderUpdateV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.OrderUpdateV1.typeUrl, exports.OrderUpdateV1);
function createBaseOffChainUpdateV1() {
    return {
        orderPlace: undefined,
        orderRemove: undefined,
        orderUpdate: undefined
    };
}
exports.OffChainUpdateV1 = {
    typeUrl: "/klyraprotocol.indexer.off_chain_updates.OffChainUpdateV1",
    is(o) {
        return o && o.$typeUrl === exports.OffChainUpdateV1.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.OffChainUpdateV1.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.OffChainUpdateV1.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.orderPlace !== undefined) {
            exports.OrderPlaceV1.encode(message.orderPlace, writer.uint32(10).fork()).ldelim();
        }
        if (message.orderRemove !== undefined) {
            exports.OrderRemoveV1.encode(message.orderRemove, writer.uint32(18).fork()).ldelim();
        }
        if (message.orderUpdate !== undefined) {
            exports.OrderUpdateV1.encode(message.orderUpdate, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOffChainUpdateV1();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderPlace = exports.OrderPlaceV1.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.orderRemove = exports.OrderRemoveV1.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.orderUpdate = exports.OrderUpdateV1.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOffChainUpdateV1();
        message.orderPlace = object.orderPlace !== undefined && object.orderPlace !== null ? exports.OrderPlaceV1.fromPartial(object.orderPlace) : undefined;
        message.orderRemove = object.orderRemove !== undefined && object.orderRemove !== null ? exports.OrderRemoveV1.fromPartial(object.orderRemove) : undefined;
        message.orderUpdate = object.orderUpdate !== undefined && object.orderUpdate !== null ? exports.OrderUpdateV1.fromPartial(object.orderUpdate) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseOffChainUpdateV1();
        if (object.order_place !== undefined && object.order_place !== null) {
            message.orderPlace = exports.OrderPlaceV1.fromAmino(object.order_place);
        }
        if (object.order_remove !== undefined && object.order_remove !== null) {
            message.orderRemove = exports.OrderRemoveV1.fromAmino(object.order_remove);
        }
        if (object.order_update !== undefined && object.order_update !== null) {
            message.orderUpdate = exports.OrderUpdateV1.fromAmino(object.order_update);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order_place = message.orderPlace ? exports.OrderPlaceV1.toAmino(message.orderPlace) : undefined;
        obj.order_remove = message.orderRemove ? exports.OrderRemoveV1.toAmino(message.orderRemove) : undefined;
        obj.order_update = message.orderUpdate ? exports.OrderUpdateV1.toAmino(message.orderUpdate) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.OffChainUpdateV1.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.OffChainUpdateV1.decode(message.value);
    },
    toProto(message) {
        return exports.OffChainUpdateV1.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.indexer.off_chain_updates.OffChainUpdateV1",
            value: exports.OffChainUpdateV1.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.OffChainUpdateV1.typeUrl, exports.OffChainUpdateV1);
