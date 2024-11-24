import { OrderId, OrderIdAmino, OrderIdSDKType } from "./order";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * ProcessProposerMatchesEvents is used for communicating which events occurred
 * in the last block that require updating the state of the memclob in the
 * Commit blocker. It contains information about the following state updates:
 * - Long term order IDs that were placed in the last block.
 * - Stateful order IDs that were expired in the last block.
 * - Order IDs that were filled in the last block.
 * - Stateful cancellations order IDs that were placed in the last block.
 * - Stateful order IDs forcefully removed in the last block.
 * - Conditional order IDs triggered in the last block.
 * - Conditional order IDs placed, but not triggered in the last block.
 * - The height of the block in which the events occurred.
 */
export interface ProcessProposerMatchesEvents {
    placedLongTermOrderIds: OrderId[];
    expiredStatefulOrderIds: OrderId[];
    orderIdsFilledInLastBlock: OrderId[];
    placedStatefulCancellationOrderIds: OrderId[];
    removedStatefulOrderIds: OrderId[];
    conditionalOrderIdsTriggeredInLastBlock: OrderId[];
    placedConditionalOrderIds: OrderId[];
    blockHeight: number;
}
export interface ProcessProposerMatchesEventsProtoMsg {
    typeUrl: "/klyraprotocol.clob.ProcessProposerMatchesEvents";
    value: Uint8Array;
}
/**
 * ProcessProposerMatchesEvents is used for communicating which events occurred
 * in the last block that require updating the state of the memclob in the
 * Commit blocker. It contains information about the following state updates:
 * - Long term order IDs that were placed in the last block.
 * - Stateful order IDs that were expired in the last block.
 * - Order IDs that were filled in the last block.
 * - Stateful cancellations order IDs that were placed in the last block.
 * - Stateful order IDs forcefully removed in the last block.
 * - Conditional order IDs triggered in the last block.
 * - Conditional order IDs placed, but not triggered in the last block.
 * - The height of the block in which the events occurred.
 */
export interface ProcessProposerMatchesEventsAmino {
    placed_long_term_order_ids?: OrderIdAmino[];
    expired_stateful_order_ids?: OrderIdAmino[];
    order_ids_filled_in_last_block?: OrderIdAmino[];
    placed_stateful_cancellation_order_ids?: OrderIdAmino[];
    removed_stateful_order_ids?: OrderIdAmino[];
    conditional_order_ids_triggered_in_last_block?: OrderIdAmino[];
    placed_conditional_order_ids?: OrderIdAmino[];
    block_height?: number;
}
export interface ProcessProposerMatchesEventsAminoMsg {
    type: "/klyraprotocol.clob.ProcessProposerMatchesEvents";
    value: ProcessProposerMatchesEventsAmino;
}
/**
 * ProcessProposerMatchesEvents is used for communicating which events occurred
 * in the last block that require updating the state of the memclob in the
 * Commit blocker. It contains information about the following state updates:
 * - Long term order IDs that were placed in the last block.
 * - Stateful order IDs that were expired in the last block.
 * - Order IDs that were filled in the last block.
 * - Stateful cancellations order IDs that were placed in the last block.
 * - Stateful order IDs forcefully removed in the last block.
 * - Conditional order IDs triggered in the last block.
 * - Conditional order IDs placed, but not triggered in the last block.
 * - The height of the block in which the events occurred.
 */
export interface ProcessProposerMatchesEventsSDKType {
    placed_long_term_order_ids: OrderIdSDKType[];
    expired_stateful_order_ids: OrderIdSDKType[];
    order_ids_filled_in_last_block: OrderIdSDKType[];
    placed_stateful_cancellation_order_ids: OrderIdSDKType[];
    removed_stateful_order_ids: OrderIdSDKType[];
    conditional_order_ids_triggered_in_last_block: OrderIdSDKType[];
    placed_conditional_order_ids: OrderIdSDKType[];
    block_height: number;
}
export declare const ProcessProposerMatchesEvents: {
    typeUrl: string;
    is(o: any): o is ProcessProposerMatchesEvents;
    isSDK(o: any): o is ProcessProposerMatchesEventsSDKType;
    isAmino(o: any): o is ProcessProposerMatchesEventsAmino;
    encode(message: ProcessProposerMatchesEvents, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ProcessProposerMatchesEvents;
    fromPartial(object: Partial<ProcessProposerMatchesEvents>): ProcessProposerMatchesEvents;
    fromAmino(object: ProcessProposerMatchesEventsAmino): ProcessProposerMatchesEvents;
    toAmino(message: ProcessProposerMatchesEvents): ProcessProposerMatchesEventsAmino;
    fromAminoMsg(object: ProcessProposerMatchesEventsAminoMsg): ProcessProposerMatchesEvents;
    fromProtoMsg(message: ProcessProposerMatchesEventsProtoMsg): ProcessProposerMatchesEvents;
    toProto(message: ProcessProposerMatchesEvents): Uint8Array;
    toProtoMsg(message: ProcessProposerMatchesEvents): ProcessProposerMatchesEventsProtoMsg;
};
