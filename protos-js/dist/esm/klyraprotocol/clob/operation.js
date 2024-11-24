//@ts-nocheck
import { ClobMatch } from "./matches";
import { MsgPlaceOrder, MsgCancelOrder } from "./tx";
import { OrderId } from "./order";
import { OrderRemoval } from "./order_removals";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseOperation() {
    return {
        match: undefined,
        shortTermOrderPlacement: undefined,
        shortTermOrderCancellation: undefined,
        preexistingStatefulOrder: undefined
    };
}
export const Operation = {
    typeUrl: "/klyraprotocol.clob.Operation",
    is(o) {
        return o && o.$typeUrl === Operation.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === Operation.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === Operation.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.match !== undefined) {
            ClobMatch.encode(message.match, writer.uint32(10).fork()).ldelim();
        }
        if (message.shortTermOrderPlacement !== undefined) {
            MsgPlaceOrder.encode(message.shortTermOrderPlacement, writer.uint32(18).fork()).ldelim();
        }
        if (message.shortTermOrderCancellation !== undefined) {
            MsgCancelOrder.encode(message.shortTermOrderCancellation, writer.uint32(26).fork()).ldelim();
        }
        if (message.preexistingStatefulOrder !== undefined) {
            OrderId.encode(message.preexistingStatefulOrder, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseOperation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.match = ClobMatch.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.shortTermOrderPlacement = MsgPlaceOrder.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.shortTermOrderCancellation = MsgCancelOrder.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.preexistingStatefulOrder = OrderId.decode(reader, reader.uint32());
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
        message.match = object.match !== undefined && object.match !== null ? ClobMatch.fromPartial(object.match) : undefined;
        message.shortTermOrderPlacement = object.shortTermOrderPlacement !== undefined && object.shortTermOrderPlacement !== null ? MsgPlaceOrder.fromPartial(object.shortTermOrderPlacement) : undefined;
        message.shortTermOrderCancellation = object.shortTermOrderCancellation !== undefined && object.shortTermOrderCancellation !== null ? MsgCancelOrder.fromPartial(object.shortTermOrderCancellation) : undefined;
        message.preexistingStatefulOrder = object.preexistingStatefulOrder !== undefined && object.preexistingStatefulOrder !== null ? OrderId.fromPartial(object.preexistingStatefulOrder) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseOperation();
        if (object.match !== undefined && object.match !== null) {
            message.match = ClobMatch.fromAmino(object.match);
        }
        if (object.short_term_order_placement !== undefined && object.short_term_order_placement !== null) {
            message.shortTermOrderPlacement = MsgPlaceOrder.fromAmino(object.short_term_order_placement);
        }
        if (object.short_term_order_cancellation !== undefined && object.short_term_order_cancellation !== null) {
            message.shortTermOrderCancellation = MsgCancelOrder.fromAmino(object.short_term_order_cancellation);
        }
        if (object.preexisting_stateful_order !== undefined && object.preexisting_stateful_order !== null) {
            message.preexistingStatefulOrder = OrderId.fromAmino(object.preexisting_stateful_order);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.match = message.match ? ClobMatch.toAmino(message.match) : undefined;
        obj.short_term_order_placement = message.shortTermOrderPlacement ? MsgPlaceOrder.toAmino(message.shortTermOrderPlacement) : undefined;
        obj.short_term_order_cancellation = message.shortTermOrderCancellation ? MsgCancelOrder.toAmino(message.shortTermOrderCancellation) : undefined;
        obj.preexisting_stateful_order = message.preexistingStatefulOrder ? OrderId.toAmino(message.preexistingStatefulOrder) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return Operation.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return Operation.decode(message.value);
    },
    toProto(message) {
        return Operation.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.Operation",
            value: Operation.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Operation.typeUrl, Operation);
function createBaseInternalOperation() {
    return {
        match: undefined,
        shortTermOrderPlacement: undefined,
        preexistingStatefulOrder: undefined,
        orderRemoval: undefined
    };
}
export const InternalOperation = {
    typeUrl: "/klyraprotocol.clob.InternalOperation",
    is(o) {
        return o && o.$typeUrl === InternalOperation.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === InternalOperation.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === InternalOperation.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.match !== undefined) {
            ClobMatch.encode(message.match, writer.uint32(10).fork()).ldelim();
        }
        if (message.shortTermOrderPlacement !== undefined) {
            MsgPlaceOrder.encode(message.shortTermOrderPlacement, writer.uint32(18).fork()).ldelim();
        }
        if (message.preexistingStatefulOrder !== undefined) {
            OrderId.encode(message.preexistingStatefulOrder, writer.uint32(26).fork()).ldelim();
        }
        if (message.orderRemoval !== undefined) {
            OrderRemoval.encode(message.orderRemoval, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInternalOperation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.match = ClobMatch.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.shortTermOrderPlacement = MsgPlaceOrder.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.preexistingStatefulOrder = OrderId.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.orderRemoval = OrderRemoval.decode(reader, reader.uint32());
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
        message.match = object.match !== undefined && object.match !== null ? ClobMatch.fromPartial(object.match) : undefined;
        message.shortTermOrderPlacement = object.shortTermOrderPlacement !== undefined && object.shortTermOrderPlacement !== null ? MsgPlaceOrder.fromPartial(object.shortTermOrderPlacement) : undefined;
        message.preexistingStatefulOrder = object.preexistingStatefulOrder !== undefined && object.preexistingStatefulOrder !== null ? OrderId.fromPartial(object.preexistingStatefulOrder) : undefined;
        message.orderRemoval = object.orderRemoval !== undefined && object.orderRemoval !== null ? OrderRemoval.fromPartial(object.orderRemoval) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseInternalOperation();
        if (object.match !== undefined && object.match !== null) {
            message.match = ClobMatch.fromAmino(object.match);
        }
        if (object.short_term_order_placement !== undefined && object.short_term_order_placement !== null) {
            message.shortTermOrderPlacement = MsgPlaceOrder.fromAmino(object.short_term_order_placement);
        }
        if (object.preexisting_stateful_order !== undefined && object.preexisting_stateful_order !== null) {
            message.preexistingStatefulOrder = OrderId.fromAmino(object.preexisting_stateful_order);
        }
        if (object.order_removal !== undefined && object.order_removal !== null) {
            message.orderRemoval = OrderRemoval.fromAmino(object.order_removal);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.match = message.match ? ClobMatch.toAmino(message.match) : undefined;
        obj.short_term_order_placement = message.shortTermOrderPlacement ? MsgPlaceOrder.toAmino(message.shortTermOrderPlacement) : undefined;
        obj.preexisting_stateful_order = message.preexistingStatefulOrder ? OrderId.toAmino(message.preexistingStatefulOrder) : undefined;
        obj.order_removal = message.orderRemoval ? OrderRemoval.toAmino(message.orderRemoval) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return InternalOperation.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return InternalOperation.decode(message.value);
    },
    toProto(message) {
        return InternalOperation.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.InternalOperation",
            value: InternalOperation.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(InternalOperation.typeUrl, InternalOperation);
