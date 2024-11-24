import { BinaryReader, BinaryWriter } from "../../../binary";
/** enum to specify that the IndexerTendermintEvent is a block event. */
export declare enum IndexerTendermintEvent_BlockEvent {
    /** BLOCK_EVENT_UNSPECIFIED - Default value. This value is invalid and unused. */
    BLOCK_EVENT_UNSPECIFIED = 0,
    /**
     * BLOCK_EVENT_BEGIN_BLOCK - BLOCK_EVENT_BEGIN_BLOCK indicates that the event was generated during
     * BeginBlock.
     */
    BLOCK_EVENT_BEGIN_BLOCK = 1,
    /**
     * BLOCK_EVENT_END_BLOCK - BLOCK_EVENT_END_BLOCK indicates that the event was generated during
     * EndBlock.
     */
    BLOCK_EVENT_END_BLOCK = 2,
    UNRECOGNIZED = -1
}
export declare const IndexerTendermintEvent_BlockEventSDKType: typeof IndexerTendermintEvent_BlockEvent;
export declare const IndexerTendermintEvent_BlockEventAmino: typeof IndexerTendermintEvent_BlockEvent;
export declare function indexerTendermintEvent_BlockEventFromJSON(object: any): IndexerTendermintEvent_BlockEvent;
export declare function indexerTendermintEvent_BlockEventToJSON(object: IndexerTendermintEvent_BlockEvent): string;
/**
 * IndexerTendermintEventWrapper is a wrapper around IndexerTendermintEvent,
 * with an additional txn_hash field.
 */
export interface IndexerTendermintEventWrapper {
    event?: IndexerTendermintEvent;
    txnHash: string;
}
export interface IndexerTendermintEventWrapperProtoMsg {
    typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintEventWrapper";
    value: Uint8Array;
}
/**
 * IndexerTendermintEventWrapper is a wrapper around IndexerTendermintEvent,
 * with an additional txn_hash field.
 */
export interface IndexerTendermintEventWrapperAmino {
    event?: IndexerTendermintEventAmino;
    txn_hash?: string;
}
export interface IndexerTendermintEventWrapperAminoMsg {
    type: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintEventWrapper";
    value: IndexerTendermintEventWrapperAmino;
}
/**
 * IndexerTendermintEventWrapper is a wrapper around IndexerTendermintEvent,
 * with an additional txn_hash field.
 */
export interface IndexerTendermintEventWrapperSDKType {
    event?: IndexerTendermintEventSDKType;
    txn_hash: string;
}
/**
 * IndexerEventsStoreValue represents the type of the value of the
 * `IndexerEventsStore` in state.
 */
export interface IndexerEventsStoreValue {
    events: IndexerTendermintEventWrapper[];
}
export interface IndexerEventsStoreValueProtoMsg {
    typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerEventsStoreValue";
    value: Uint8Array;
}
/**
 * IndexerEventsStoreValue represents the type of the value of the
 * `IndexerEventsStore` in state.
 */
export interface IndexerEventsStoreValueAmino {
    events?: IndexerTendermintEventWrapperAmino[];
}
export interface IndexerEventsStoreValueAminoMsg {
    type: "/klyraprotocol.indexer.indexer_manager.IndexerEventsStoreValue";
    value: IndexerEventsStoreValueAmino;
}
/**
 * IndexerEventsStoreValue represents the type of the value of the
 * `IndexerEventsStore` in state.
 */
export interface IndexerEventsStoreValueSDKType {
    events: IndexerTendermintEventWrapperSDKType[];
}
/**
 * IndexerTendermintEvent contains the base64 encoded event proto emitted from
 * the Klyra application as well as additional metadata to determine the ordering
 * of the event within the block and the subtype of the event.
 */
export interface IndexerTendermintEvent {
    /** Subtype of the event e.g. "order_fill", "subaccount_update", etc. */
    subtype: string;
    transactionIndex?: number;
    blockEvent?: IndexerTendermintEvent_BlockEvent;
    /**
     * Index of the event within the list of events that happened either during a
     * transaction or during processing of a block.
     * TODO(DEC-537): Deprecate this field because events are already ordered.
     */
    eventIndex: number;
    /** Version of the event. */
    version: number;
    /** Tendermint event bytes. */
    dataBytes: Uint8Array;
}
export interface IndexerTendermintEventProtoMsg {
    typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintEvent";
    value: Uint8Array;
}
/**
 * IndexerTendermintEvent contains the base64 encoded event proto emitted from
 * the Klyra application as well as additional metadata to determine the ordering
 * of the event within the block and the subtype of the event.
 */
export interface IndexerTendermintEventAmino {
    /** Subtype of the event e.g. "order_fill", "subaccount_update", etc. */
    subtype?: string;
    transaction_index?: number;
    block_event?: IndexerTendermintEvent_BlockEvent;
    /**
     * Index of the event within the list of events that happened either during a
     * transaction or during processing of a block.
     * TODO(DEC-537): Deprecate this field because events are already ordered.
     */
    event_index?: number;
    /** Version of the event. */
    version?: number;
    /** Tendermint event bytes. */
    data_bytes?: string;
}
export interface IndexerTendermintEventAminoMsg {
    type: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintEvent";
    value: IndexerTendermintEventAmino;
}
/**
 * IndexerTendermintEvent contains the base64 encoded event proto emitted from
 * the Klyra application as well as additional metadata to determine the ordering
 * of the event within the block and the subtype of the event.
 */
export interface IndexerTendermintEventSDKType {
    subtype: string;
    transaction_index?: number;
    block_event?: IndexerTendermintEvent_BlockEvent;
    event_index: number;
    version: number;
    data_bytes: Uint8Array;
}
/**
 * IndexerTendermintBlock contains all the events for the block along with
 * metadata for the block height, timestamp of the block and a list of all the
 * hashes of the transactions within the block. The transaction hashes follow
 * the ordering of the transactions as they appear within the block.
 */
export interface IndexerTendermintBlock {
    height: number;
    time: Date;
    events: IndexerTendermintEvent[];
    txHashes: string[];
}
export interface IndexerTendermintBlockProtoMsg {
    typeUrl: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintBlock";
    value: Uint8Array;
}
/**
 * IndexerTendermintBlock contains all the events for the block along with
 * metadata for the block height, timestamp of the block and a list of all the
 * hashes of the transactions within the block. The transaction hashes follow
 * the ordering of the transactions as they appear within the block.
 */
export interface IndexerTendermintBlockAmino {
    height?: number;
    time?: string;
    events?: IndexerTendermintEventAmino[];
    tx_hashes?: string[];
}
export interface IndexerTendermintBlockAminoMsg {
    type: "/klyraprotocol.indexer.indexer_manager.IndexerTendermintBlock";
    value: IndexerTendermintBlockAmino;
}
/**
 * IndexerTendermintBlock contains all the events for the block along with
 * metadata for the block height, timestamp of the block and a list of all the
 * hashes of the transactions within the block. The transaction hashes follow
 * the ordering of the transactions as they appear within the block.
 */
export interface IndexerTendermintBlockSDKType {
    height: number;
    time: Date;
    events: IndexerTendermintEventSDKType[];
    tx_hashes: string[];
}
export declare const IndexerTendermintEventWrapper: {
    typeUrl: string;
    is(o: any): o is IndexerTendermintEventWrapper;
    isSDK(o: any): o is IndexerTendermintEventWrapperSDKType;
    isAmino(o: any): o is IndexerTendermintEventWrapperAmino;
    encode(message: IndexerTendermintEventWrapper, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): IndexerTendermintEventWrapper;
    fromPartial(object: Partial<IndexerTendermintEventWrapper>): IndexerTendermintEventWrapper;
    fromAmino(object: IndexerTendermintEventWrapperAmino): IndexerTendermintEventWrapper;
    toAmino(message: IndexerTendermintEventWrapper): IndexerTendermintEventWrapperAmino;
    fromAminoMsg(object: IndexerTendermintEventWrapperAminoMsg): IndexerTendermintEventWrapper;
    fromProtoMsg(message: IndexerTendermintEventWrapperProtoMsg): IndexerTendermintEventWrapper;
    toProto(message: IndexerTendermintEventWrapper): Uint8Array;
    toProtoMsg(message: IndexerTendermintEventWrapper): IndexerTendermintEventWrapperProtoMsg;
};
export declare const IndexerEventsStoreValue: {
    typeUrl: string;
    is(o: any): o is IndexerEventsStoreValue;
    isSDK(o: any): o is IndexerEventsStoreValueSDKType;
    isAmino(o: any): o is IndexerEventsStoreValueAmino;
    encode(message: IndexerEventsStoreValue, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): IndexerEventsStoreValue;
    fromPartial(object: Partial<IndexerEventsStoreValue>): IndexerEventsStoreValue;
    fromAmino(object: IndexerEventsStoreValueAmino): IndexerEventsStoreValue;
    toAmino(message: IndexerEventsStoreValue): IndexerEventsStoreValueAmino;
    fromAminoMsg(object: IndexerEventsStoreValueAminoMsg): IndexerEventsStoreValue;
    fromProtoMsg(message: IndexerEventsStoreValueProtoMsg): IndexerEventsStoreValue;
    toProto(message: IndexerEventsStoreValue): Uint8Array;
    toProtoMsg(message: IndexerEventsStoreValue): IndexerEventsStoreValueProtoMsg;
};
export declare const IndexerTendermintEvent: {
    typeUrl: string;
    is(o: any): o is IndexerTendermintEvent;
    isSDK(o: any): o is IndexerTendermintEventSDKType;
    isAmino(o: any): o is IndexerTendermintEventAmino;
    encode(message: IndexerTendermintEvent, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): IndexerTendermintEvent;
    fromPartial(object: Partial<IndexerTendermintEvent>): IndexerTendermintEvent;
    fromAmino(object: IndexerTendermintEventAmino): IndexerTendermintEvent;
    toAmino(message: IndexerTendermintEvent): IndexerTendermintEventAmino;
    fromAminoMsg(object: IndexerTendermintEventAminoMsg): IndexerTendermintEvent;
    fromProtoMsg(message: IndexerTendermintEventProtoMsg): IndexerTendermintEvent;
    toProto(message: IndexerTendermintEvent): Uint8Array;
    toProtoMsg(message: IndexerTendermintEvent): IndexerTendermintEventProtoMsg;
};
export declare const IndexerTendermintBlock: {
    typeUrl: string;
    is(o: any): o is IndexerTendermintBlock;
    isSDK(o: any): o is IndexerTendermintBlockSDKType;
    isAmino(o: any): o is IndexerTendermintBlockAmino;
    encode(message: IndexerTendermintBlock, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): IndexerTendermintBlock;
    fromPartial(object: Partial<IndexerTendermintBlock>): IndexerTendermintBlock;
    fromAmino(object: IndexerTendermintBlockAmino): IndexerTendermintBlock;
    toAmino(message: IndexerTendermintBlock): IndexerTendermintBlockAmino;
    fromAminoMsg(object: IndexerTendermintBlockAminoMsg): IndexerTendermintBlock;
    fromProtoMsg(message: IndexerTendermintBlockProtoMsg): IndexerTendermintBlock;
    toProto(message: IndexerTendermintBlock): Uint8Array;
    toProtoMsg(message: IndexerTendermintBlock): IndexerTendermintBlockProtoMsg;
};
