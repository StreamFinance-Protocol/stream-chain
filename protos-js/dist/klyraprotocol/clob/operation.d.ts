import { ClobMatch, ClobMatchAmino, ClobMatchSDKType } from "./matches";
import { MsgPlaceOrder, MsgPlaceOrderAmino, MsgPlaceOrderSDKType, MsgCancelOrder, MsgCancelOrderAmino, MsgCancelOrderSDKType } from "./tx";
import { OrderId, OrderIdAmino, OrderIdSDKType } from "./order";
import { OrderRemoval, OrderRemovalAmino, OrderRemovalSDKType } from "./order_removals";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * Operation represents an operation in the proposed operations. Operation is
 * used internally within the memclob only.
 */
export interface Operation {
    match?: ClobMatch;
    shortTermOrderPlacement?: MsgPlaceOrder;
    shortTermOrderCancellation?: MsgCancelOrder;
    preexistingStatefulOrder?: OrderId;
}
export interface OperationProtoMsg {
    typeUrl: "/klyraprotocol.clob.Operation";
    value: Uint8Array;
}
/**
 * Operation represents an operation in the proposed operations. Operation is
 * used internally within the memclob only.
 */
export interface OperationAmino {
    match?: ClobMatchAmino;
    short_term_order_placement?: MsgPlaceOrderAmino;
    short_term_order_cancellation?: MsgCancelOrderAmino;
    preexisting_stateful_order?: OrderIdAmino;
}
export interface OperationAminoMsg {
    type: "/klyraprotocol.clob.Operation";
    value: OperationAmino;
}
/**
 * Operation represents an operation in the proposed operations. Operation is
 * used internally within the memclob only.
 */
export interface OperationSDKType {
    match?: ClobMatchSDKType;
    short_term_order_placement?: MsgPlaceOrderSDKType;
    short_term_order_cancellation?: MsgCancelOrderSDKType;
    preexisting_stateful_order?: OrderIdSDKType;
}
/**
 * InternalOperation represents an internal operation in the operations to
 * propose. InternalOperation is used internally within the memclob only.
 */
export interface InternalOperation {
    match?: ClobMatch;
    shortTermOrderPlacement?: MsgPlaceOrder;
    preexistingStatefulOrder?: OrderId;
    orderRemoval?: OrderRemoval;
}
export interface InternalOperationProtoMsg {
    typeUrl: "/klyraprotocol.clob.InternalOperation";
    value: Uint8Array;
}
/**
 * InternalOperation represents an internal operation in the operations to
 * propose. InternalOperation is used internally within the memclob only.
 */
export interface InternalOperationAmino {
    match?: ClobMatchAmino;
    short_term_order_placement?: MsgPlaceOrderAmino;
    preexisting_stateful_order?: OrderIdAmino;
    order_removal?: OrderRemovalAmino;
}
export interface InternalOperationAminoMsg {
    type: "/klyraprotocol.clob.InternalOperation";
    value: InternalOperationAmino;
}
/**
 * InternalOperation represents an internal operation in the operations to
 * propose. InternalOperation is used internally within the memclob only.
 */
export interface InternalOperationSDKType {
    match?: ClobMatchSDKType;
    short_term_order_placement?: MsgPlaceOrderSDKType;
    preexisting_stateful_order?: OrderIdSDKType;
    order_removal?: OrderRemovalSDKType;
}
export declare const Operation: {
    typeUrl: string;
    is(o: any): o is Operation;
    isSDK(o: any): o is OperationSDKType;
    isAmino(o: any): o is OperationAmino;
    encode(message: Operation, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Operation;
    fromPartial(object: Partial<Operation>): Operation;
    fromAmino(object: OperationAmino): Operation;
    toAmino(message: Operation): OperationAmino;
    fromAminoMsg(object: OperationAminoMsg): Operation;
    fromProtoMsg(message: OperationProtoMsg): Operation;
    toProto(message: Operation): Uint8Array;
    toProtoMsg(message: Operation): OperationProtoMsg;
};
export declare const InternalOperation: {
    typeUrl: string;
    is(o: any): o is InternalOperation;
    isSDK(o: any): o is InternalOperationSDKType;
    isAmino(o: any): o is InternalOperationAmino;
    encode(message: InternalOperation, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): InternalOperation;
    fromPartial(object: Partial<InternalOperation>): InternalOperation;
    fromAmino(object: InternalOperationAmino): InternalOperation;
    toAmino(message: InternalOperation): InternalOperationAmino;
    fromAminoMsg(object: InternalOperationAminoMsg): InternalOperation;
    fromProtoMsg(message: InternalOperationProtoMsg): InternalOperation;
    toProto(message: InternalOperation): Uint8Array;
    toProtoMsg(message: InternalOperation): InternalOperationProtoMsg;
};
