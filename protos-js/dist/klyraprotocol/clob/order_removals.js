"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRemoval = exports.OrderRemoval_RemovalReasonAmino = exports.OrderRemoval_RemovalReasonSDKType = exports.OrderRemoval_RemovalReason = void 0;
exports.orderRemoval_RemovalReasonFromJSON = orderRemoval_RemovalReasonFromJSON;
exports.orderRemoval_RemovalReasonToJSON = orderRemoval_RemovalReasonToJSON;
//@ts-nocheck
const order_1 = require("./order");
const helpers_1 = require("../../helpers");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
var OrderRemoval_RemovalReason;
(function (OrderRemoval_RemovalReason) {
    /**
     * REMOVAL_REASON_UNSPECIFIED - REMOVAL_REASON_UNSPECIFIED represents an unspecified removal reason. This
     * removal reason is used as a catchall and should never appear on an
     * OrderRemoval in the operations queue.
     */
    OrderRemoval_RemovalReason[OrderRemoval_RemovalReason["REMOVAL_REASON_UNSPECIFIED"] = 0] = "REMOVAL_REASON_UNSPECIFIED";
    /**
     * REMOVAL_REASON_UNDERCOLLATERALIZED - REMOVAL_REASON_UNDERCOLLATERALIZED represents a removal of an order which
     * if filled in isolation with respect to the current state of the
     * subaccount would leave the subaccount undercollateralized.
     */
    OrderRemoval_RemovalReason[OrderRemoval_RemovalReason["REMOVAL_REASON_UNDERCOLLATERALIZED"] = 1] = "REMOVAL_REASON_UNDERCOLLATERALIZED";
    /**
     * REMOVAL_REASON_INVALID_REDUCE_ONLY - REMOVAL_REASON_INVALID_REDUCE_ONLY represents a removal of a reduce-only
     * order which if filled in isolation with respect to the current state of
     * the subaccount would cause the subaccount's existing position to increase
     * or change sides.
     */
    OrderRemoval_RemovalReason[OrderRemoval_RemovalReason["REMOVAL_REASON_INVALID_REDUCE_ONLY"] = 2] = "REMOVAL_REASON_INVALID_REDUCE_ONLY";
    /**
     * REMOVAL_REASON_POST_ONLY_WOULD_CROSS_MAKER_ORDER - REMOVAL_REASON_POST_ONLY_WOULD_CROSS_MAKER_ORDER represents a removal of
     * a stateful post-only order that was deemed invalid because it crossed
     * maker orders on the book of the proposer.
     */
    OrderRemoval_RemovalReason[OrderRemoval_RemovalReason["REMOVAL_REASON_POST_ONLY_WOULD_CROSS_MAKER_ORDER"] = 3] = "REMOVAL_REASON_POST_ONLY_WOULD_CROSS_MAKER_ORDER";
    /**
     * REMOVAL_REASON_INVALID_SELF_TRADE - REMOVAL_REASON_INVALID_SELF_TRADE represents a removal of a stateful
     * order that was deemed invalid because it constituted a self trade on the
     * proposers orderbook.
     */
    OrderRemoval_RemovalReason[OrderRemoval_RemovalReason["REMOVAL_REASON_INVALID_SELF_TRADE"] = 4] = "REMOVAL_REASON_INVALID_SELF_TRADE";
    /**
     * REMOVAL_REASON_CONDITIONAL_FOK_COULD_NOT_BE_FULLY_FILLED - REMOVAL_REASON_CONDITIONAL_FOK_COULD_NOT_BE_FULLY_FILLED represents a
     * removal of a conditional FOK order that was deemed invalid because it
     * could not be completely filled. Conditional FOK orders should always be
     * fully-filled or removed in the block after they are triggered.
     */
    OrderRemoval_RemovalReason[OrderRemoval_RemovalReason["REMOVAL_REASON_CONDITIONAL_FOK_COULD_NOT_BE_FULLY_FILLED"] = 5] = "REMOVAL_REASON_CONDITIONAL_FOK_COULD_NOT_BE_FULLY_FILLED";
    /**
     * REMOVAL_REASON_CONDITIONAL_IOC_WOULD_REST_ON_BOOK - REMOVAL_REASON_CONDITIONAL_IOC_WOULD_REST_ON_BOOK represents a removal
     * of a conditional IOC order.
     * Conditional IOC orders should always have their remaining size removed
     * in the block after they are triggered.
     */
    OrderRemoval_RemovalReason[OrderRemoval_RemovalReason["REMOVAL_REASON_CONDITIONAL_IOC_WOULD_REST_ON_BOOK"] = 6] = "REMOVAL_REASON_CONDITIONAL_IOC_WOULD_REST_ON_BOOK";
    /**
     * REMOVAL_REASON_FULLY_FILLED - REMOVAL_REASON_FULLY_FILLED represents a removal of an order that
     * was fully filled and should therefore be removed from state.
     */
    OrderRemoval_RemovalReason[OrderRemoval_RemovalReason["REMOVAL_REASON_FULLY_FILLED"] = 7] = "REMOVAL_REASON_FULLY_FILLED";
    /**
     * REMOVAL_REASON_VIOLATES_ISOLATED_SUBACCOUNT_CONSTRAINTS - REMOVAL_REASON_FULLY_FILLED represents a removal of an order that
     *  would lead to the subaccount violating isolated subaccount constraints.
     */
    OrderRemoval_RemovalReason[OrderRemoval_RemovalReason["REMOVAL_REASON_VIOLATES_ISOLATED_SUBACCOUNT_CONSTRAINTS"] = 8] = "REMOVAL_REASON_VIOLATES_ISOLATED_SUBACCOUNT_CONSTRAINTS";
    OrderRemoval_RemovalReason[OrderRemoval_RemovalReason["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OrderRemoval_RemovalReason || (exports.OrderRemoval_RemovalReason = OrderRemoval_RemovalReason = {}));
exports.OrderRemoval_RemovalReasonSDKType = OrderRemoval_RemovalReason;
exports.OrderRemoval_RemovalReasonAmino = OrderRemoval_RemovalReason;
function orderRemoval_RemovalReasonFromJSON(object) {
    switch (object) {
        case 0:
        case "REMOVAL_REASON_UNSPECIFIED":
            return OrderRemoval_RemovalReason.REMOVAL_REASON_UNSPECIFIED;
        case 1:
        case "REMOVAL_REASON_UNDERCOLLATERALIZED":
            return OrderRemoval_RemovalReason.REMOVAL_REASON_UNDERCOLLATERALIZED;
        case 2:
        case "REMOVAL_REASON_INVALID_REDUCE_ONLY":
            return OrderRemoval_RemovalReason.REMOVAL_REASON_INVALID_REDUCE_ONLY;
        case 3:
        case "REMOVAL_REASON_POST_ONLY_WOULD_CROSS_MAKER_ORDER":
            return OrderRemoval_RemovalReason.REMOVAL_REASON_POST_ONLY_WOULD_CROSS_MAKER_ORDER;
        case 4:
        case "REMOVAL_REASON_INVALID_SELF_TRADE":
            return OrderRemoval_RemovalReason.REMOVAL_REASON_INVALID_SELF_TRADE;
        case 5:
        case "REMOVAL_REASON_CONDITIONAL_FOK_COULD_NOT_BE_FULLY_FILLED":
            return OrderRemoval_RemovalReason.REMOVAL_REASON_CONDITIONAL_FOK_COULD_NOT_BE_FULLY_FILLED;
        case 6:
        case "REMOVAL_REASON_CONDITIONAL_IOC_WOULD_REST_ON_BOOK":
            return OrderRemoval_RemovalReason.REMOVAL_REASON_CONDITIONAL_IOC_WOULD_REST_ON_BOOK;
        case 7:
        case "REMOVAL_REASON_FULLY_FILLED":
            return OrderRemoval_RemovalReason.REMOVAL_REASON_FULLY_FILLED;
        case 8:
        case "REMOVAL_REASON_VIOLATES_ISOLATED_SUBACCOUNT_CONSTRAINTS":
            return OrderRemoval_RemovalReason.REMOVAL_REASON_VIOLATES_ISOLATED_SUBACCOUNT_CONSTRAINTS;
        case -1:
        case "UNRECOGNIZED":
        default:
            return OrderRemoval_RemovalReason.UNRECOGNIZED;
    }
}
function orderRemoval_RemovalReasonToJSON(object) {
    switch (object) {
        case OrderRemoval_RemovalReason.REMOVAL_REASON_UNSPECIFIED:
            return "REMOVAL_REASON_UNSPECIFIED";
        case OrderRemoval_RemovalReason.REMOVAL_REASON_UNDERCOLLATERALIZED:
            return "REMOVAL_REASON_UNDERCOLLATERALIZED";
        case OrderRemoval_RemovalReason.REMOVAL_REASON_INVALID_REDUCE_ONLY:
            return "REMOVAL_REASON_INVALID_REDUCE_ONLY";
        case OrderRemoval_RemovalReason.REMOVAL_REASON_POST_ONLY_WOULD_CROSS_MAKER_ORDER:
            return "REMOVAL_REASON_POST_ONLY_WOULD_CROSS_MAKER_ORDER";
        case OrderRemoval_RemovalReason.REMOVAL_REASON_INVALID_SELF_TRADE:
            return "REMOVAL_REASON_INVALID_SELF_TRADE";
        case OrderRemoval_RemovalReason.REMOVAL_REASON_CONDITIONAL_FOK_COULD_NOT_BE_FULLY_FILLED:
            return "REMOVAL_REASON_CONDITIONAL_FOK_COULD_NOT_BE_FULLY_FILLED";
        case OrderRemoval_RemovalReason.REMOVAL_REASON_CONDITIONAL_IOC_WOULD_REST_ON_BOOK:
            return "REMOVAL_REASON_CONDITIONAL_IOC_WOULD_REST_ON_BOOK";
        case OrderRemoval_RemovalReason.REMOVAL_REASON_FULLY_FILLED:
            return "REMOVAL_REASON_FULLY_FILLED";
        case OrderRemoval_RemovalReason.REMOVAL_REASON_VIOLATES_ISOLATED_SUBACCOUNT_CONSTRAINTS:
            return "REMOVAL_REASON_VIOLATES_ISOLATED_SUBACCOUNT_CONSTRAINTS";
        case OrderRemoval_RemovalReason.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseOrderRemoval() {
    return {
        orderId: order_1.OrderId.fromPartial({}),
        removalReason: 0
    };
}
exports.OrderRemoval = {
    typeUrl: "/klyraprotocol.clob.OrderRemoval",
    is(o) {
        return o && (o.$typeUrl === exports.OrderRemoval.typeUrl || order_1.OrderId.is(o.orderId) && (0, helpers_1.isSet)(o.removalReason));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.OrderRemoval.typeUrl || order_1.OrderId.isSDK(o.order_id) && (0, helpers_1.isSet)(o.removal_reason));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.OrderRemoval.typeUrl || order_1.OrderId.isAmino(o.order_id) && (0, helpers_1.isSet)(o.removal_reason));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.orderId !== undefined) {
            order_1.OrderId.encode(message.orderId, writer.uint32(10).fork()).ldelim();
        }
        if (message.removalReason !== 0) {
            writer.uint32(16).int32(message.removalReason);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOrderRemoval();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderId = order_1.OrderId.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.removalReason = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOrderRemoval();
        message.orderId = object.orderId !== undefined && object.orderId !== null ? order_1.OrderId.fromPartial(object.orderId) : undefined;
        message.removalReason = object.removalReason ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseOrderRemoval();
        if (object.order_id !== undefined && object.order_id !== null) {
            message.orderId = order_1.OrderId.fromAmino(object.order_id);
        }
        if (object.removal_reason !== undefined && object.removal_reason !== null) {
            message.removalReason = object.removal_reason;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.order_id = message.orderId ? order_1.OrderId.toAmino(message.orderId) : undefined;
        obj.removal_reason = message.removalReason === 0 ? undefined : message.removalReason;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.OrderRemoval.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.OrderRemoval.decode(message.value);
    },
    toProto(message) {
        return exports.OrderRemoval.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.OrderRemoval",
            value: exports.OrderRemoval.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.OrderRemoval.typeUrl, exports.OrderRemoval);
