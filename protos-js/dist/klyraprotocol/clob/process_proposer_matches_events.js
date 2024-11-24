"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessProposerMatchesEvents = void 0;
//@ts-nocheck
const order_1 = require("./order");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseProcessProposerMatchesEvents() {
    return {
        placedLongTermOrderIds: [],
        expiredStatefulOrderIds: [],
        orderIdsFilledInLastBlock: [],
        placedStatefulCancellationOrderIds: [],
        removedStatefulOrderIds: [],
        conditionalOrderIdsTriggeredInLastBlock: [],
        placedConditionalOrderIds: [],
        blockHeight: 0
    };
}
exports.ProcessProposerMatchesEvents = {
    typeUrl: "/klyraprotocol.clob.ProcessProposerMatchesEvents",
    is(o) {
        return o && (o.$typeUrl === exports.ProcessProposerMatchesEvents.typeUrl || Array.isArray(o.placedLongTermOrderIds) && (!o.placedLongTermOrderIds.length || order_1.OrderId.is(o.placedLongTermOrderIds[0])) && Array.isArray(o.expiredStatefulOrderIds) && (!o.expiredStatefulOrderIds.length || order_1.OrderId.is(o.expiredStatefulOrderIds[0])) && Array.isArray(o.orderIdsFilledInLastBlock) && (!o.orderIdsFilledInLastBlock.length || order_1.OrderId.is(o.orderIdsFilledInLastBlock[0])) && Array.isArray(o.placedStatefulCancellationOrderIds) && (!o.placedStatefulCancellationOrderIds.length || order_1.OrderId.is(o.placedStatefulCancellationOrderIds[0])) && Array.isArray(o.removedStatefulOrderIds) && (!o.removedStatefulOrderIds.length || order_1.OrderId.is(o.removedStatefulOrderIds[0])) && Array.isArray(o.conditionalOrderIdsTriggeredInLastBlock) && (!o.conditionalOrderIdsTriggeredInLastBlock.length || order_1.OrderId.is(o.conditionalOrderIdsTriggeredInLastBlock[0])) && Array.isArray(o.placedConditionalOrderIds) && (!o.placedConditionalOrderIds.length || order_1.OrderId.is(o.placedConditionalOrderIds[0])) && typeof o.blockHeight === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ProcessProposerMatchesEvents.typeUrl || Array.isArray(o.placed_long_term_order_ids) && (!o.placed_long_term_order_ids.length || order_1.OrderId.isSDK(o.placed_long_term_order_ids[0])) && Array.isArray(o.expired_stateful_order_ids) && (!o.expired_stateful_order_ids.length || order_1.OrderId.isSDK(o.expired_stateful_order_ids[0])) && Array.isArray(o.order_ids_filled_in_last_block) && (!o.order_ids_filled_in_last_block.length || order_1.OrderId.isSDK(o.order_ids_filled_in_last_block[0])) && Array.isArray(o.placed_stateful_cancellation_order_ids) && (!o.placed_stateful_cancellation_order_ids.length || order_1.OrderId.isSDK(o.placed_stateful_cancellation_order_ids[0])) && Array.isArray(o.removed_stateful_order_ids) && (!o.removed_stateful_order_ids.length || order_1.OrderId.isSDK(o.removed_stateful_order_ids[0])) && Array.isArray(o.conditional_order_ids_triggered_in_last_block) && (!o.conditional_order_ids_triggered_in_last_block.length || order_1.OrderId.isSDK(o.conditional_order_ids_triggered_in_last_block[0])) && Array.isArray(o.placed_conditional_order_ids) && (!o.placed_conditional_order_ids.length || order_1.OrderId.isSDK(o.placed_conditional_order_ids[0])) && typeof o.block_height === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ProcessProposerMatchesEvents.typeUrl || Array.isArray(o.placed_long_term_order_ids) && (!o.placed_long_term_order_ids.length || order_1.OrderId.isAmino(o.placed_long_term_order_ids[0])) && Array.isArray(o.expired_stateful_order_ids) && (!o.expired_stateful_order_ids.length || order_1.OrderId.isAmino(o.expired_stateful_order_ids[0])) && Array.isArray(o.order_ids_filled_in_last_block) && (!o.order_ids_filled_in_last_block.length || order_1.OrderId.isAmino(o.order_ids_filled_in_last_block[0])) && Array.isArray(o.placed_stateful_cancellation_order_ids) && (!o.placed_stateful_cancellation_order_ids.length || order_1.OrderId.isAmino(o.placed_stateful_cancellation_order_ids[0])) && Array.isArray(o.removed_stateful_order_ids) && (!o.removed_stateful_order_ids.length || order_1.OrderId.isAmino(o.removed_stateful_order_ids[0])) && Array.isArray(o.conditional_order_ids_triggered_in_last_block) && (!o.conditional_order_ids_triggered_in_last_block.length || order_1.OrderId.isAmino(o.conditional_order_ids_triggered_in_last_block[0])) && Array.isArray(o.placed_conditional_order_ids) && (!o.placed_conditional_order_ids.length || order_1.OrderId.isAmino(o.placed_conditional_order_ids[0])) && typeof o.block_height === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.placedLongTermOrderIds) {
            order_1.OrderId.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.expiredStatefulOrderIds) {
            order_1.OrderId.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.orderIdsFilledInLastBlock) {
            order_1.OrderId.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.placedStatefulCancellationOrderIds) {
            order_1.OrderId.encode(v, writer.uint32(34).fork()).ldelim();
        }
        for (const v of message.removedStatefulOrderIds) {
            order_1.OrderId.encode(v, writer.uint32(42).fork()).ldelim();
        }
        for (const v of message.conditionalOrderIdsTriggeredInLastBlock) {
            order_1.OrderId.encode(v, writer.uint32(50).fork()).ldelim();
        }
        for (const v of message.placedConditionalOrderIds) {
            order_1.OrderId.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.blockHeight !== 0) {
            writer.uint32(64).uint32(message.blockHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProcessProposerMatchesEvents();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.placedLongTermOrderIds.push(order_1.OrderId.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.expiredStatefulOrderIds.push(order_1.OrderId.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.orderIdsFilledInLastBlock.push(order_1.OrderId.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.placedStatefulCancellationOrderIds.push(order_1.OrderId.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.removedStatefulOrderIds.push(order_1.OrderId.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.conditionalOrderIdsTriggeredInLastBlock.push(order_1.OrderId.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.placedConditionalOrderIds.push(order_1.OrderId.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.blockHeight = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseProcessProposerMatchesEvents();
        message.placedLongTermOrderIds = object.placedLongTermOrderIds?.map(e => order_1.OrderId.fromPartial(e)) || [];
        message.expiredStatefulOrderIds = object.expiredStatefulOrderIds?.map(e => order_1.OrderId.fromPartial(e)) || [];
        message.orderIdsFilledInLastBlock = object.orderIdsFilledInLastBlock?.map(e => order_1.OrderId.fromPartial(e)) || [];
        message.placedStatefulCancellationOrderIds = object.placedStatefulCancellationOrderIds?.map(e => order_1.OrderId.fromPartial(e)) || [];
        message.removedStatefulOrderIds = object.removedStatefulOrderIds?.map(e => order_1.OrderId.fromPartial(e)) || [];
        message.conditionalOrderIdsTriggeredInLastBlock = object.conditionalOrderIdsTriggeredInLastBlock?.map(e => order_1.OrderId.fromPartial(e)) || [];
        message.placedConditionalOrderIds = object.placedConditionalOrderIds?.map(e => order_1.OrderId.fromPartial(e)) || [];
        message.blockHeight = object.blockHeight ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseProcessProposerMatchesEvents();
        message.placedLongTermOrderIds = object.placed_long_term_order_ids?.map(e => order_1.OrderId.fromAmino(e)) || [];
        message.expiredStatefulOrderIds = object.expired_stateful_order_ids?.map(e => order_1.OrderId.fromAmino(e)) || [];
        message.orderIdsFilledInLastBlock = object.order_ids_filled_in_last_block?.map(e => order_1.OrderId.fromAmino(e)) || [];
        message.placedStatefulCancellationOrderIds = object.placed_stateful_cancellation_order_ids?.map(e => order_1.OrderId.fromAmino(e)) || [];
        message.removedStatefulOrderIds = object.removed_stateful_order_ids?.map(e => order_1.OrderId.fromAmino(e)) || [];
        message.conditionalOrderIdsTriggeredInLastBlock = object.conditional_order_ids_triggered_in_last_block?.map(e => order_1.OrderId.fromAmino(e)) || [];
        message.placedConditionalOrderIds = object.placed_conditional_order_ids?.map(e => order_1.OrderId.fromAmino(e)) || [];
        if (object.block_height !== undefined && object.block_height !== null) {
            message.blockHeight = object.block_height;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.placedLongTermOrderIds) {
            obj.placed_long_term_order_ids = message.placedLongTermOrderIds.map(e => e ? order_1.OrderId.toAmino(e) : undefined);
        }
        else {
            obj.placed_long_term_order_ids = message.placedLongTermOrderIds;
        }
        if (message.expiredStatefulOrderIds) {
            obj.expired_stateful_order_ids = message.expiredStatefulOrderIds.map(e => e ? order_1.OrderId.toAmino(e) : undefined);
        }
        else {
            obj.expired_stateful_order_ids = message.expiredStatefulOrderIds;
        }
        if (message.orderIdsFilledInLastBlock) {
            obj.order_ids_filled_in_last_block = message.orderIdsFilledInLastBlock.map(e => e ? order_1.OrderId.toAmino(e) : undefined);
        }
        else {
            obj.order_ids_filled_in_last_block = message.orderIdsFilledInLastBlock;
        }
        if (message.placedStatefulCancellationOrderIds) {
            obj.placed_stateful_cancellation_order_ids = message.placedStatefulCancellationOrderIds.map(e => e ? order_1.OrderId.toAmino(e) : undefined);
        }
        else {
            obj.placed_stateful_cancellation_order_ids = message.placedStatefulCancellationOrderIds;
        }
        if (message.removedStatefulOrderIds) {
            obj.removed_stateful_order_ids = message.removedStatefulOrderIds.map(e => e ? order_1.OrderId.toAmino(e) : undefined);
        }
        else {
            obj.removed_stateful_order_ids = message.removedStatefulOrderIds;
        }
        if (message.conditionalOrderIdsTriggeredInLastBlock) {
            obj.conditional_order_ids_triggered_in_last_block = message.conditionalOrderIdsTriggeredInLastBlock.map(e => e ? order_1.OrderId.toAmino(e) : undefined);
        }
        else {
            obj.conditional_order_ids_triggered_in_last_block = message.conditionalOrderIdsTriggeredInLastBlock;
        }
        if (message.placedConditionalOrderIds) {
            obj.placed_conditional_order_ids = message.placedConditionalOrderIds.map(e => e ? order_1.OrderId.toAmino(e) : undefined);
        }
        else {
            obj.placed_conditional_order_ids = message.placedConditionalOrderIds;
        }
        obj.block_height = message.blockHeight === 0 ? undefined : message.blockHeight;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ProcessProposerMatchesEvents.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ProcessProposerMatchesEvents.decode(message.value);
    },
    toProto(message) {
        return exports.ProcessProposerMatchesEvents.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.ProcessProposerMatchesEvents",
            value: exports.ProcessProposerMatchesEvents.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ProcessProposerMatchesEvents.typeUrl, exports.ProcessProposerMatchesEvents);
