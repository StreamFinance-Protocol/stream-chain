"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalOperation = exports.Operation = void 0;
//@ts-nocheck
const matches_1 = require("./matches");
const tx_1 = require("./tx");
const order_1 = require("./order");
const order_removals_1 = require("./order_removals");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseOperation() {
    return {
        match: undefined,
        shortTermOrderPlacement: undefined,
        shortTermOrderCancellation: undefined,
        preexistingStatefulOrder: undefined
    };
}
exports.Operation = {
    typeUrl: "/klyraprotocol.clob.Operation",
    is(o) {
        return o && o.$typeUrl === exports.Operation.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.Operation.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.Operation.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.match !== undefined) {
            matches_1.ClobMatch.encode(message.match, writer.uint32(10).fork()).ldelim();
        }
        if (message.shortTermOrderPlacement !== undefined) {
            tx_1.MsgPlaceOrder.encode(message.shortTermOrderPlacement, writer.uint32(18).fork()).ldelim();
        }
        if (message.shortTermOrderCancellation !== undefined) {
            tx_1.MsgCancelOrder.encode(message.shortTermOrderCancellation, writer.uint32(26).fork()).ldelim();
        }
        if (message.preexistingStatefulOrder !== undefined) {
            order_1.OrderId.encode(message.preexistingStatefulOrder, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOperation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.match = matches_1.ClobMatch.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.shortTermOrderPlacement = tx_1.MsgPlaceOrder.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.shortTermOrderCancellation = tx_1.MsgCancelOrder.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.preexistingStatefulOrder = order_1.OrderId.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseOperation();
        message.match = object.match !== undefined && object.match !== null ? matches_1.ClobMatch.fromPartial(object.match) : undefined;
        message.shortTermOrderPlacement = object.shortTermOrderPlacement !== undefined && object.shortTermOrderPlacement !== null ? tx_1.MsgPlaceOrder.fromPartial(object.shortTermOrderPlacement) : undefined;
        message.shortTermOrderCancellation = object.shortTermOrderCancellation !== undefined && object.shortTermOrderCancellation !== null ? tx_1.MsgCancelOrder.fromPartial(object.shortTermOrderCancellation) : undefined;
        message.preexistingStatefulOrder = object.preexistingStatefulOrder !== undefined && object.preexistingStatefulOrder !== null ? order_1.OrderId.fromPartial(object.preexistingStatefulOrder) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseOperation();
        if (object.match !== undefined && object.match !== null) {
            message.match = matches_1.ClobMatch.fromAmino(object.match);
        }
        if (object.short_term_order_placement !== undefined && object.short_term_order_placement !== null) {
            message.shortTermOrderPlacement = tx_1.MsgPlaceOrder.fromAmino(object.short_term_order_placement);
        }
        if (object.short_term_order_cancellation !== undefined && object.short_term_order_cancellation !== null) {
            message.shortTermOrderCancellation = tx_1.MsgCancelOrder.fromAmino(object.short_term_order_cancellation);
        }
        if (object.preexisting_stateful_order !== undefined && object.preexisting_stateful_order !== null) {
            message.preexistingStatefulOrder = order_1.OrderId.fromAmino(object.preexisting_stateful_order);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.match = message.match ? matches_1.ClobMatch.toAmino(message.match) : undefined;
        obj.short_term_order_placement = message.shortTermOrderPlacement ? tx_1.MsgPlaceOrder.toAmino(message.shortTermOrderPlacement) : undefined;
        obj.short_term_order_cancellation = message.shortTermOrderCancellation ? tx_1.MsgCancelOrder.toAmino(message.shortTermOrderCancellation) : undefined;
        obj.preexisting_stateful_order = message.preexistingStatefulOrder ? order_1.OrderId.toAmino(message.preexistingStatefulOrder) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Operation.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.Operation.decode(message.value);
    },
    toProto(message) {
        return exports.Operation.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.Operation",
            value: exports.Operation.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Operation.typeUrl, exports.Operation);
function createBaseInternalOperation() {
    return {
        match: undefined,
        shortTermOrderPlacement: undefined,
        preexistingStatefulOrder: undefined,
        orderRemoval: undefined
    };
}
exports.InternalOperation = {
    typeUrl: "/klyraprotocol.clob.InternalOperation",
    is(o) {
        return o && o.$typeUrl === exports.InternalOperation.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.InternalOperation.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.InternalOperation.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.match !== undefined) {
            matches_1.ClobMatch.encode(message.match, writer.uint32(10).fork()).ldelim();
        }
        if (message.shortTermOrderPlacement !== undefined) {
            tx_1.MsgPlaceOrder.encode(message.shortTermOrderPlacement, writer.uint32(18).fork()).ldelim();
        }
        if (message.preexistingStatefulOrder !== undefined) {
            order_1.OrderId.encode(message.preexistingStatefulOrder, writer.uint32(26).fork()).ldelim();
        }
        if (message.orderRemoval !== undefined) {
            order_removals_1.OrderRemoval.encode(message.orderRemoval, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInternalOperation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.match = matches_1.ClobMatch.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.shortTermOrderPlacement = tx_1.MsgPlaceOrder.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.preexistingStatefulOrder = order_1.OrderId.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.orderRemoval = order_removals_1.OrderRemoval.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseInternalOperation();
        message.match = object.match !== undefined && object.match !== null ? matches_1.ClobMatch.fromPartial(object.match) : undefined;
        message.shortTermOrderPlacement = object.shortTermOrderPlacement !== undefined && object.shortTermOrderPlacement !== null ? tx_1.MsgPlaceOrder.fromPartial(object.shortTermOrderPlacement) : undefined;
        message.preexistingStatefulOrder = object.preexistingStatefulOrder !== undefined && object.preexistingStatefulOrder !== null ? order_1.OrderId.fromPartial(object.preexistingStatefulOrder) : undefined;
        message.orderRemoval = object.orderRemoval !== undefined && object.orderRemoval !== null ? order_removals_1.OrderRemoval.fromPartial(object.orderRemoval) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseInternalOperation();
        if (object.match !== undefined && object.match !== null) {
            message.match = matches_1.ClobMatch.fromAmino(object.match);
        }
        if (object.short_term_order_placement !== undefined && object.short_term_order_placement !== null) {
            message.shortTermOrderPlacement = tx_1.MsgPlaceOrder.fromAmino(object.short_term_order_placement);
        }
        if (object.preexisting_stateful_order !== undefined && object.preexisting_stateful_order !== null) {
            message.preexistingStatefulOrder = order_1.OrderId.fromAmino(object.preexisting_stateful_order);
        }
        if (object.order_removal !== undefined && object.order_removal !== null) {
            message.orderRemoval = order_removals_1.OrderRemoval.fromAmino(object.order_removal);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.match = message.match ? matches_1.ClobMatch.toAmino(message.match) : undefined;
        obj.short_term_order_placement = message.shortTermOrderPlacement ? tx_1.MsgPlaceOrder.toAmino(message.shortTermOrderPlacement) : undefined;
        obj.preexisting_stateful_order = message.preexistingStatefulOrder ? order_1.OrderId.toAmino(message.preexistingStatefulOrder) : undefined;
        obj.order_removal = message.orderRemoval ? order_removals_1.OrderRemoval.toAmino(message.orderRemoval) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.InternalOperation.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.InternalOperation.decode(message.value);
    },
    toProto(message) {
        return exports.InternalOperation.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.InternalOperation",
            value: exports.InternalOperation.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.InternalOperation.typeUrl, exports.InternalOperation);
