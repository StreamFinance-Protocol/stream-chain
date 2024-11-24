import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { ValidatorMevMatches, ValidatorMevMatchesAmino, ValidatorMevMatchesSDKType, MevNodeToNodeMetrics, MevNodeToNodeMetricsAmino, MevNodeToNodeMetricsSDKType } from "./mev";
import { ClobPair, ClobPairAmino, ClobPairSDKType } from "./clob_pair";
import { EquityTierLimitConfiguration, EquityTierLimitConfigurationAmino, EquityTierLimitConfigurationSDKType } from "./equity_tier_limit_config";
import { BlockRateLimitConfiguration, BlockRateLimitConfigurationAmino, BlockRateLimitConfigurationSDKType } from "./block_rate_limit_config";
import { LiquidationsConfig, LiquidationsConfigAmino, LiquidationsConfigSDKType } from "./liquidations_config";
import { OffChainUpdateV1, OffChainUpdateV1Amino, OffChainUpdateV1SDKType } from "../indexer/off_chain_updates/off_chain_updates";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryGetClobPairRequest is request type for the ClobPair method. */
export interface QueryGetClobPairRequest {
    id: number;
}
export interface QueryGetClobPairRequestProtoMsg {
    typeUrl: "/klyraprotocol.clob.QueryGetClobPairRequest";
    value: Uint8Array;
}
/** QueryGetClobPairRequest is request type for the ClobPair method. */
export interface QueryGetClobPairRequestAmino {
    id?: number;
}
export interface QueryGetClobPairRequestAminoMsg {
    type: "/klyraprotocol.clob.QueryGetClobPairRequest";
    value: QueryGetClobPairRequestAmino;
}
/** QueryGetClobPairRequest is request type for the ClobPair method. */
export interface QueryGetClobPairRequestSDKType {
    id: number;
}
/** QueryClobPairResponse is response type for the ClobPair method. */
export interface QueryClobPairResponse {
    clobPair: ClobPair;
}
export interface QueryClobPairResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.QueryClobPairResponse";
    value: Uint8Array;
}
/** QueryClobPairResponse is response type for the ClobPair method. */
export interface QueryClobPairResponseAmino {
    clob_pair?: ClobPairAmino;
}
export interface QueryClobPairResponseAminoMsg {
    type: "/klyraprotocol.clob.QueryClobPairResponse";
    value: QueryClobPairResponseAmino;
}
/** QueryClobPairResponse is response type for the ClobPair method. */
export interface QueryClobPairResponseSDKType {
    clob_pair: ClobPairSDKType;
}
/** QueryAllClobPairRequest is request type for the ClobPairAll method. */
export interface QueryAllClobPairRequest {
    pagination?: PageRequest;
}
export interface QueryAllClobPairRequestProtoMsg {
    typeUrl: "/klyraprotocol.clob.QueryAllClobPairRequest";
    value: Uint8Array;
}
/** QueryAllClobPairRequest is request type for the ClobPairAll method. */
export interface QueryAllClobPairRequestAmino {
    pagination?: PageRequestAmino;
}
export interface QueryAllClobPairRequestAminoMsg {
    type: "/klyraprotocol.clob.QueryAllClobPairRequest";
    value: QueryAllClobPairRequestAmino;
}
/** QueryAllClobPairRequest is request type for the ClobPairAll method. */
export interface QueryAllClobPairRequestSDKType {
    pagination?: PageRequestSDKType;
}
/** QueryClobPairAllResponse is response type for the ClobPairAll method. */
export interface QueryClobPairAllResponse {
    clobPair: ClobPair[];
    pagination?: PageResponse;
}
export interface QueryClobPairAllResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.QueryClobPairAllResponse";
    value: Uint8Array;
}
/** QueryClobPairAllResponse is response type for the ClobPairAll method. */
export interface QueryClobPairAllResponseAmino {
    clob_pair?: ClobPairAmino[];
    pagination?: PageResponseAmino;
}
export interface QueryClobPairAllResponseAminoMsg {
    type: "/klyraprotocol.clob.QueryClobPairAllResponse";
    value: QueryClobPairAllResponseAmino;
}
/** QueryClobPairAllResponse is response type for the ClobPairAll method. */
export interface QueryClobPairAllResponseSDKType {
    clob_pair: ClobPairSDKType[];
    pagination?: PageResponseSDKType;
}
/**
 * MevNodeToNodeCalculationRequest is a request message used to run the
 * MEV node <> node calculation.
 */
export interface MevNodeToNodeCalculationRequest {
    /**
     * Represents the matches on the "block proposer". Note that this field
     * does not need to be the actual block proposer's matches for a block, since
     * the MEV calculation logic is run with this nodes matches as the "block
     * proposer" matches.
     */
    blockProposerMatches?: ValidatorMevMatches;
    /** Represents the matches and mid-prices on the validator. */
    validatorMevMetrics?: MevNodeToNodeMetrics;
}
export interface MevNodeToNodeCalculationRequestProtoMsg {
    typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationRequest";
    value: Uint8Array;
}
/**
 * MevNodeToNodeCalculationRequest is a request message used to run the
 * MEV node <> node calculation.
 */
export interface MevNodeToNodeCalculationRequestAmino {
    /**
     * Represents the matches on the "block proposer". Note that this field
     * does not need to be the actual block proposer's matches for a block, since
     * the MEV calculation logic is run with this nodes matches as the "block
     * proposer" matches.
     */
    block_proposer_matches?: ValidatorMevMatchesAmino;
    /** Represents the matches and mid-prices on the validator. */
    validator_mev_metrics?: MevNodeToNodeMetricsAmino;
}
export interface MevNodeToNodeCalculationRequestAminoMsg {
    type: "/klyraprotocol.clob.MevNodeToNodeCalculationRequest";
    value: MevNodeToNodeCalculationRequestAmino;
}
/**
 * MevNodeToNodeCalculationRequest is a request message used to run the
 * MEV node <> node calculation.
 */
export interface MevNodeToNodeCalculationRequestSDKType {
    block_proposer_matches?: ValidatorMevMatchesSDKType;
    validator_mev_metrics?: MevNodeToNodeMetricsSDKType;
}
/**
 * MevNodeToNodeCalculationResponse is a response message that contains the
 * MEV node <> node calculation result.
 */
export interface MevNodeToNodeCalculationResponse {
    results: MevNodeToNodeCalculationResponse_MevAndVolumePerClob[];
}
export interface MevNodeToNodeCalculationResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationResponse";
    value: Uint8Array;
}
/**
 * MevNodeToNodeCalculationResponse is a response message that contains the
 * MEV node <> node calculation result.
 */
export interface MevNodeToNodeCalculationResponseAmino {
    results?: MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino[];
}
export interface MevNodeToNodeCalculationResponseAminoMsg {
    type: "/klyraprotocol.clob.MevNodeToNodeCalculationResponse";
    value: MevNodeToNodeCalculationResponseAmino;
}
/**
 * MevNodeToNodeCalculationResponse is a response message that contains the
 * MEV node <> node calculation result.
 */
export interface MevNodeToNodeCalculationResponseSDKType {
    results: MevNodeToNodeCalculationResponse_MevAndVolumePerClobSDKType[];
}
/** MevAndVolumePerClob contains information about the MEV and volume per CLOB. */
export interface MevNodeToNodeCalculationResponse_MevAndVolumePerClob {
    clobPairId: number;
    mev: number;
    volume: bigint;
}
export interface MevNodeToNodeCalculationResponse_MevAndVolumePerClobProtoMsg {
    typeUrl: "/klyraprotocol.clob.MevAndVolumePerClob";
    value: Uint8Array;
}
/** MevAndVolumePerClob contains information about the MEV and volume per CLOB. */
export interface MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino {
    clob_pair_id?: number;
    mev?: number;
    volume?: string;
}
export interface MevNodeToNodeCalculationResponse_MevAndVolumePerClobAminoMsg {
    type: "/klyraprotocol.clob.MevAndVolumePerClob";
    value: MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino;
}
/** MevAndVolumePerClob contains information about the MEV and volume per CLOB. */
export interface MevNodeToNodeCalculationResponse_MevAndVolumePerClobSDKType {
    clob_pair_id: number;
    mev: number;
    volume: bigint;
}
/**
 * QueryEquityTierLimitConfigurationRequest is a request message for
 * EquityTierLimitConfiguration.
 */
export interface QueryEquityTierLimitConfigurationRequest {
}
export interface QueryEquityTierLimitConfigurationRequestProtoMsg {
    typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationRequest";
    value: Uint8Array;
}
/**
 * QueryEquityTierLimitConfigurationRequest is a request message for
 * EquityTierLimitConfiguration.
 */
export interface QueryEquityTierLimitConfigurationRequestAmino {
}
export interface QueryEquityTierLimitConfigurationRequestAminoMsg {
    type: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationRequest";
    value: QueryEquityTierLimitConfigurationRequestAmino;
}
/**
 * QueryEquityTierLimitConfigurationRequest is a request message for
 * EquityTierLimitConfiguration.
 */
export interface QueryEquityTierLimitConfigurationRequestSDKType {
}
/**
 * QueryEquityTierLimitConfigurationResponse is a response message that contains
 * the EquityTierLimitConfiguration.
 */
export interface QueryEquityTierLimitConfigurationResponse {
    equityTierLimitConfig: EquityTierLimitConfiguration;
}
export interface QueryEquityTierLimitConfigurationResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationResponse";
    value: Uint8Array;
}
/**
 * QueryEquityTierLimitConfigurationResponse is a response message that contains
 * the EquityTierLimitConfiguration.
 */
export interface QueryEquityTierLimitConfigurationResponseAmino {
    equity_tier_limit_config?: EquityTierLimitConfigurationAmino;
}
export interface QueryEquityTierLimitConfigurationResponseAminoMsg {
    type: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationResponse";
    value: QueryEquityTierLimitConfigurationResponseAmino;
}
/**
 * QueryEquityTierLimitConfigurationResponse is a response message that contains
 * the EquityTierLimitConfiguration.
 */
export interface QueryEquityTierLimitConfigurationResponseSDKType {
    equity_tier_limit_config: EquityTierLimitConfigurationSDKType;
}
/**
 * QueryBlockRateLimitConfigurationRequest is a request message for
 * BlockRateLimitConfiguration.
 */
export interface QueryBlockRateLimitConfigurationRequest {
}
export interface QueryBlockRateLimitConfigurationRequestProtoMsg {
    typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationRequest";
    value: Uint8Array;
}
/**
 * QueryBlockRateLimitConfigurationRequest is a request message for
 * BlockRateLimitConfiguration.
 */
export interface QueryBlockRateLimitConfigurationRequestAmino {
}
export interface QueryBlockRateLimitConfigurationRequestAminoMsg {
    type: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationRequest";
    value: QueryBlockRateLimitConfigurationRequestAmino;
}
/**
 * QueryBlockRateLimitConfigurationRequest is a request message for
 * BlockRateLimitConfiguration.
 */
export interface QueryBlockRateLimitConfigurationRequestSDKType {
}
/**
 * QueryBlockRateLimitConfigurationResponse is a response message that contains
 * the BlockRateLimitConfiguration.
 */
export interface QueryBlockRateLimitConfigurationResponse {
    blockRateLimitConfig: BlockRateLimitConfiguration;
}
export interface QueryBlockRateLimitConfigurationResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationResponse";
    value: Uint8Array;
}
/**
 * QueryBlockRateLimitConfigurationResponse is a response message that contains
 * the BlockRateLimitConfiguration.
 */
export interface QueryBlockRateLimitConfigurationResponseAmino {
    block_rate_limit_config?: BlockRateLimitConfigurationAmino;
}
export interface QueryBlockRateLimitConfigurationResponseAminoMsg {
    type: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationResponse";
    value: QueryBlockRateLimitConfigurationResponseAmino;
}
/**
 * QueryBlockRateLimitConfigurationResponse is a response message that contains
 * the BlockRateLimitConfiguration.
 */
export interface QueryBlockRateLimitConfigurationResponseSDKType {
    block_rate_limit_config: BlockRateLimitConfigurationSDKType;
}
/**
 * QueryLiquidationsConfigurationRequest is a request message for
 * LiquidationsConfiguration.
 */
export interface QueryLiquidationsConfigurationRequest {
}
export interface QueryLiquidationsConfigurationRequestProtoMsg {
    typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationRequest";
    value: Uint8Array;
}
/**
 * QueryLiquidationsConfigurationRequest is a request message for
 * LiquidationsConfiguration.
 */
export interface QueryLiquidationsConfigurationRequestAmino {
}
export interface QueryLiquidationsConfigurationRequestAminoMsg {
    type: "/klyraprotocol.clob.QueryLiquidationsConfigurationRequest";
    value: QueryLiquidationsConfigurationRequestAmino;
}
/**
 * QueryLiquidationsConfigurationRequest is a request message for
 * LiquidationsConfiguration.
 */
export interface QueryLiquidationsConfigurationRequestSDKType {
}
/**
 * QueryLiquidationsConfigurationResponse is a response message that contains
 * the LiquidationsConfiguration.
 */
export interface QueryLiquidationsConfigurationResponse {
    liquidationsConfig: LiquidationsConfig;
}
export interface QueryLiquidationsConfigurationResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationResponse";
    value: Uint8Array;
}
/**
 * QueryLiquidationsConfigurationResponse is a response message that contains
 * the LiquidationsConfiguration.
 */
export interface QueryLiquidationsConfigurationResponseAmino {
    liquidations_config?: LiquidationsConfigAmino;
}
export interface QueryLiquidationsConfigurationResponseAminoMsg {
    type: "/klyraprotocol.clob.QueryLiquidationsConfigurationResponse";
    value: QueryLiquidationsConfigurationResponseAmino;
}
/**
 * QueryLiquidationsConfigurationResponse is a response message that contains
 * the LiquidationsConfiguration.
 */
export interface QueryLiquidationsConfigurationResponseSDKType {
    liquidations_config: LiquidationsConfigSDKType;
}
/**
 * StreamOrderbookUpdatesRequest is a request message for the
 * StreamOrderbookUpdates method.
 */
export interface StreamOrderbookUpdatesRequest {
    /** Clob pair ids to stream orderbook updates for. */
    clobPairId: number[];
}
export interface StreamOrderbookUpdatesRequestProtoMsg {
    typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesRequest";
    value: Uint8Array;
}
/**
 * StreamOrderbookUpdatesRequest is a request message for the
 * StreamOrderbookUpdates method.
 */
export interface StreamOrderbookUpdatesRequestAmino {
    /** Clob pair ids to stream orderbook updates for. */
    clob_pair_id?: number[];
}
export interface StreamOrderbookUpdatesRequestAminoMsg {
    type: "/klyraprotocol.clob.StreamOrderbookUpdatesRequest";
    value: StreamOrderbookUpdatesRequestAmino;
}
/**
 * StreamOrderbookUpdatesRequest is a request message for the
 * StreamOrderbookUpdates method.
 */
export interface StreamOrderbookUpdatesRequestSDKType {
    clob_pair_id: number[];
}
/**
 * StreamOrderbookUpdatesResponse is a response message for the
 * StreamOrderbookUpdates method.
 */
export interface StreamOrderbookUpdatesResponse {
    /** Orderbook updates for the clob pair. */
    updates: OffChainUpdateV1[];
    /**
     * Snapshot indicates if the response is from a snapshot of the orderbook.
     * This is true for the initial response and false for all subsequent updates.
     * Note that if the snapshot is true, then all previous entries should be
     * discarded and the orderbook should be resynced.
     */
    snapshot: boolean;
    /**
     * ---Additional fields used to debug issues---
     * Block height of the updates.
     */
    blockHeight: number;
    /** Exec mode of the updates. */
    execMode: number;
}
export interface StreamOrderbookUpdatesResponseProtoMsg {
    typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesResponse";
    value: Uint8Array;
}
/**
 * StreamOrderbookUpdatesResponse is a response message for the
 * StreamOrderbookUpdates method.
 */
export interface StreamOrderbookUpdatesResponseAmino {
    /** Orderbook updates for the clob pair. */
    updates?: OffChainUpdateV1Amino[];
    /**
     * Snapshot indicates if the response is from a snapshot of the orderbook.
     * This is true for the initial response and false for all subsequent updates.
     * Note that if the snapshot is true, then all previous entries should be
     * discarded and the orderbook should be resynced.
     */
    snapshot?: boolean;
    /**
     * ---Additional fields used to debug issues---
     * Block height of the updates.
     */
    block_height?: number;
    /** Exec mode of the updates. */
    exec_mode?: number;
}
export interface StreamOrderbookUpdatesResponseAminoMsg {
    type: "/klyraprotocol.clob.StreamOrderbookUpdatesResponse";
    value: StreamOrderbookUpdatesResponseAmino;
}
/**
 * StreamOrderbookUpdatesResponse is a response message for the
 * StreamOrderbookUpdates method.
 */
export interface StreamOrderbookUpdatesResponseSDKType {
    updates: OffChainUpdateV1SDKType[];
    snapshot: boolean;
    block_height: number;
    exec_mode: number;
}
export declare const QueryGetClobPairRequest: {
    typeUrl: string;
    is(o: any): o is QueryGetClobPairRequest;
    isSDK(o: any): o is QueryGetClobPairRequestSDKType;
    isAmino(o: any): o is QueryGetClobPairRequestAmino;
    encode(message: QueryGetClobPairRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryGetClobPairRequest;
    fromPartial(object: Partial<QueryGetClobPairRequest>): QueryGetClobPairRequest;
    fromAmino(object: QueryGetClobPairRequestAmino): QueryGetClobPairRequest;
    toAmino(message: QueryGetClobPairRequest): QueryGetClobPairRequestAmino;
    fromAminoMsg(object: QueryGetClobPairRequestAminoMsg): QueryGetClobPairRequest;
    fromProtoMsg(message: QueryGetClobPairRequestProtoMsg): QueryGetClobPairRequest;
    toProto(message: QueryGetClobPairRequest): Uint8Array;
    toProtoMsg(message: QueryGetClobPairRequest): QueryGetClobPairRequestProtoMsg;
};
export declare const QueryClobPairResponse: {
    typeUrl: string;
    is(o: any): o is QueryClobPairResponse;
    isSDK(o: any): o is QueryClobPairResponseSDKType;
    isAmino(o: any): o is QueryClobPairResponseAmino;
    encode(message: QueryClobPairResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryClobPairResponse;
    fromPartial(object: Partial<QueryClobPairResponse>): QueryClobPairResponse;
    fromAmino(object: QueryClobPairResponseAmino): QueryClobPairResponse;
    toAmino(message: QueryClobPairResponse): QueryClobPairResponseAmino;
    fromAminoMsg(object: QueryClobPairResponseAminoMsg): QueryClobPairResponse;
    fromProtoMsg(message: QueryClobPairResponseProtoMsg): QueryClobPairResponse;
    toProto(message: QueryClobPairResponse): Uint8Array;
    toProtoMsg(message: QueryClobPairResponse): QueryClobPairResponseProtoMsg;
};
export declare const QueryAllClobPairRequest: {
    typeUrl: string;
    is(o: any): o is QueryAllClobPairRequest;
    isSDK(o: any): o is QueryAllClobPairRequestSDKType;
    isAmino(o: any): o is QueryAllClobPairRequestAmino;
    encode(message: QueryAllClobPairRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllClobPairRequest;
    fromPartial(object: Partial<QueryAllClobPairRequest>): QueryAllClobPairRequest;
    fromAmino(object: QueryAllClobPairRequestAmino): QueryAllClobPairRequest;
    toAmino(message: QueryAllClobPairRequest): QueryAllClobPairRequestAmino;
    fromAminoMsg(object: QueryAllClobPairRequestAminoMsg): QueryAllClobPairRequest;
    fromProtoMsg(message: QueryAllClobPairRequestProtoMsg): QueryAllClobPairRequest;
    toProto(message: QueryAllClobPairRequest): Uint8Array;
    toProtoMsg(message: QueryAllClobPairRequest): QueryAllClobPairRequestProtoMsg;
};
export declare const QueryClobPairAllResponse: {
    typeUrl: string;
    is(o: any): o is QueryClobPairAllResponse;
    isSDK(o: any): o is QueryClobPairAllResponseSDKType;
    isAmino(o: any): o is QueryClobPairAllResponseAmino;
    encode(message: QueryClobPairAllResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryClobPairAllResponse;
    fromPartial(object: Partial<QueryClobPairAllResponse>): QueryClobPairAllResponse;
    fromAmino(object: QueryClobPairAllResponseAmino): QueryClobPairAllResponse;
    toAmino(message: QueryClobPairAllResponse): QueryClobPairAllResponseAmino;
    fromAminoMsg(object: QueryClobPairAllResponseAminoMsg): QueryClobPairAllResponse;
    fromProtoMsg(message: QueryClobPairAllResponseProtoMsg): QueryClobPairAllResponse;
    toProto(message: QueryClobPairAllResponse): Uint8Array;
    toProtoMsg(message: QueryClobPairAllResponse): QueryClobPairAllResponseProtoMsg;
};
export declare const MevNodeToNodeCalculationRequest: {
    typeUrl: string;
    is(o: any): o is MevNodeToNodeCalculationRequest;
    isSDK(o: any): o is MevNodeToNodeCalculationRequestSDKType;
    isAmino(o: any): o is MevNodeToNodeCalculationRequestAmino;
    encode(message: MevNodeToNodeCalculationRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MevNodeToNodeCalculationRequest;
    fromPartial(object: Partial<MevNodeToNodeCalculationRequest>): MevNodeToNodeCalculationRequest;
    fromAmino(object: MevNodeToNodeCalculationRequestAmino): MevNodeToNodeCalculationRequest;
    toAmino(message: MevNodeToNodeCalculationRequest): MevNodeToNodeCalculationRequestAmino;
    fromAminoMsg(object: MevNodeToNodeCalculationRequestAminoMsg): MevNodeToNodeCalculationRequest;
    fromProtoMsg(message: MevNodeToNodeCalculationRequestProtoMsg): MevNodeToNodeCalculationRequest;
    toProto(message: MevNodeToNodeCalculationRequest): Uint8Array;
    toProtoMsg(message: MevNodeToNodeCalculationRequest): MevNodeToNodeCalculationRequestProtoMsg;
};
export declare const MevNodeToNodeCalculationResponse: {
    typeUrl: string;
    is(o: any): o is MevNodeToNodeCalculationResponse;
    isSDK(o: any): o is MevNodeToNodeCalculationResponseSDKType;
    isAmino(o: any): o is MevNodeToNodeCalculationResponseAmino;
    encode(message: MevNodeToNodeCalculationResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MevNodeToNodeCalculationResponse;
    fromPartial(object: Partial<MevNodeToNodeCalculationResponse>): MevNodeToNodeCalculationResponse;
    fromAmino(object: MevNodeToNodeCalculationResponseAmino): MevNodeToNodeCalculationResponse;
    toAmino(message: MevNodeToNodeCalculationResponse): MevNodeToNodeCalculationResponseAmino;
    fromAminoMsg(object: MevNodeToNodeCalculationResponseAminoMsg): MevNodeToNodeCalculationResponse;
    fromProtoMsg(message: MevNodeToNodeCalculationResponseProtoMsg): MevNodeToNodeCalculationResponse;
    toProto(message: MevNodeToNodeCalculationResponse): Uint8Array;
    toProtoMsg(message: MevNodeToNodeCalculationResponse): MevNodeToNodeCalculationResponseProtoMsg;
};
export declare const MevNodeToNodeCalculationResponse_MevAndVolumePerClob: {
    typeUrl: string;
    is(o: any): o is MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
    isSDK(o: any): o is MevNodeToNodeCalculationResponse_MevAndVolumePerClobSDKType;
    isAmino(o: any): o is MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino;
    encode(message: MevNodeToNodeCalculationResponse_MevAndVolumePerClob, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
    fromPartial(object: Partial<MevNodeToNodeCalculationResponse_MevAndVolumePerClob>): MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
    fromAmino(object: MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino): MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
    toAmino(message: MevNodeToNodeCalculationResponse_MevAndVolumePerClob): MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino;
    fromAminoMsg(object: MevNodeToNodeCalculationResponse_MevAndVolumePerClobAminoMsg): MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
    fromProtoMsg(message: MevNodeToNodeCalculationResponse_MevAndVolumePerClobProtoMsg): MevNodeToNodeCalculationResponse_MevAndVolumePerClob;
    toProto(message: MevNodeToNodeCalculationResponse_MevAndVolumePerClob): Uint8Array;
    toProtoMsg(message: MevNodeToNodeCalculationResponse_MevAndVolumePerClob): MevNodeToNodeCalculationResponse_MevAndVolumePerClobProtoMsg;
};
export declare const QueryEquityTierLimitConfigurationRequest: {
    typeUrl: string;
    is(o: any): o is QueryEquityTierLimitConfigurationRequest;
    isSDK(o: any): o is QueryEquityTierLimitConfigurationRequestSDKType;
    isAmino(o: any): o is QueryEquityTierLimitConfigurationRequestAmino;
    encode(_: QueryEquityTierLimitConfigurationRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryEquityTierLimitConfigurationRequest;
    fromPartial(_: Partial<QueryEquityTierLimitConfigurationRequest>): QueryEquityTierLimitConfigurationRequest;
    fromAmino(_: QueryEquityTierLimitConfigurationRequestAmino): QueryEquityTierLimitConfigurationRequest;
    toAmino(_: QueryEquityTierLimitConfigurationRequest): QueryEquityTierLimitConfigurationRequestAmino;
    fromAminoMsg(object: QueryEquityTierLimitConfigurationRequestAminoMsg): QueryEquityTierLimitConfigurationRequest;
    fromProtoMsg(message: QueryEquityTierLimitConfigurationRequestProtoMsg): QueryEquityTierLimitConfigurationRequest;
    toProto(message: QueryEquityTierLimitConfigurationRequest): Uint8Array;
    toProtoMsg(message: QueryEquityTierLimitConfigurationRequest): QueryEquityTierLimitConfigurationRequestProtoMsg;
};
export declare const QueryEquityTierLimitConfigurationResponse: {
    typeUrl: string;
    is(o: any): o is QueryEquityTierLimitConfigurationResponse;
    isSDK(o: any): o is QueryEquityTierLimitConfigurationResponseSDKType;
    isAmino(o: any): o is QueryEquityTierLimitConfigurationResponseAmino;
    encode(message: QueryEquityTierLimitConfigurationResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryEquityTierLimitConfigurationResponse;
    fromPartial(object: Partial<QueryEquityTierLimitConfigurationResponse>): QueryEquityTierLimitConfigurationResponse;
    fromAmino(object: QueryEquityTierLimitConfigurationResponseAmino): QueryEquityTierLimitConfigurationResponse;
    toAmino(message: QueryEquityTierLimitConfigurationResponse): QueryEquityTierLimitConfigurationResponseAmino;
    fromAminoMsg(object: QueryEquityTierLimitConfigurationResponseAminoMsg): QueryEquityTierLimitConfigurationResponse;
    fromProtoMsg(message: QueryEquityTierLimitConfigurationResponseProtoMsg): QueryEquityTierLimitConfigurationResponse;
    toProto(message: QueryEquityTierLimitConfigurationResponse): Uint8Array;
    toProtoMsg(message: QueryEquityTierLimitConfigurationResponse): QueryEquityTierLimitConfigurationResponseProtoMsg;
};
export declare const QueryBlockRateLimitConfigurationRequest: {
    typeUrl: string;
    is(o: any): o is QueryBlockRateLimitConfigurationRequest;
    isSDK(o: any): o is QueryBlockRateLimitConfigurationRequestSDKType;
    isAmino(o: any): o is QueryBlockRateLimitConfigurationRequestAmino;
    encode(_: QueryBlockRateLimitConfigurationRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockRateLimitConfigurationRequest;
    fromPartial(_: Partial<QueryBlockRateLimitConfigurationRequest>): QueryBlockRateLimitConfigurationRequest;
    fromAmino(_: QueryBlockRateLimitConfigurationRequestAmino): QueryBlockRateLimitConfigurationRequest;
    toAmino(_: QueryBlockRateLimitConfigurationRequest): QueryBlockRateLimitConfigurationRequestAmino;
    fromAminoMsg(object: QueryBlockRateLimitConfigurationRequestAminoMsg): QueryBlockRateLimitConfigurationRequest;
    fromProtoMsg(message: QueryBlockRateLimitConfigurationRequestProtoMsg): QueryBlockRateLimitConfigurationRequest;
    toProto(message: QueryBlockRateLimitConfigurationRequest): Uint8Array;
    toProtoMsg(message: QueryBlockRateLimitConfigurationRequest): QueryBlockRateLimitConfigurationRequestProtoMsg;
};
export declare const QueryBlockRateLimitConfigurationResponse: {
    typeUrl: string;
    is(o: any): o is QueryBlockRateLimitConfigurationResponse;
    isSDK(o: any): o is QueryBlockRateLimitConfigurationResponseSDKType;
    isAmino(o: any): o is QueryBlockRateLimitConfigurationResponseAmino;
    encode(message: QueryBlockRateLimitConfigurationResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockRateLimitConfigurationResponse;
    fromPartial(object: Partial<QueryBlockRateLimitConfigurationResponse>): QueryBlockRateLimitConfigurationResponse;
    fromAmino(object: QueryBlockRateLimitConfigurationResponseAmino): QueryBlockRateLimitConfigurationResponse;
    toAmino(message: QueryBlockRateLimitConfigurationResponse): QueryBlockRateLimitConfigurationResponseAmino;
    fromAminoMsg(object: QueryBlockRateLimitConfigurationResponseAminoMsg): QueryBlockRateLimitConfigurationResponse;
    fromProtoMsg(message: QueryBlockRateLimitConfigurationResponseProtoMsg): QueryBlockRateLimitConfigurationResponse;
    toProto(message: QueryBlockRateLimitConfigurationResponse): Uint8Array;
    toProtoMsg(message: QueryBlockRateLimitConfigurationResponse): QueryBlockRateLimitConfigurationResponseProtoMsg;
};
export declare const QueryLiquidationsConfigurationRequest: {
    typeUrl: string;
    is(o: any): o is QueryLiquidationsConfigurationRequest;
    isSDK(o: any): o is QueryLiquidationsConfigurationRequestSDKType;
    isAmino(o: any): o is QueryLiquidationsConfigurationRequestAmino;
    encode(_: QueryLiquidationsConfigurationRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationsConfigurationRequest;
    fromPartial(_: Partial<QueryLiquidationsConfigurationRequest>): QueryLiquidationsConfigurationRequest;
    fromAmino(_: QueryLiquidationsConfigurationRequestAmino): QueryLiquidationsConfigurationRequest;
    toAmino(_: QueryLiquidationsConfigurationRequest): QueryLiquidationsConfigurationRequestAmino;
    fromAminoMsg(object: QueryLiquidationsConfigurationRequestAminoMsg): QueryLiquidationsConfigurationRequest;
    fromProtoMsg(message: QueryLiquidationsConfigurationRequestProtoMsg): QueryLiquidationsConfigurationRequest;
    toProto(message: QueryLiquidationsConfigurationRequest): Uint8Array;
    toProtoMsg(message: QueryLiquidationsConfigurationRequest): QueryLiquidationsConfigurationRequestProtoMsg;
};
export declare const QueryLiquidationsConfigurationResponse: {
    typeUrl: string;
    is(o: any): o is QueryLiquidationsConfigurationResponse;
    isSDK(o: any): o is QueryLiquidationsConfigurationResponseSDKType;
    isAmino(o: any): o is QueryLiquidationsConfigurationResponseAmino;
    encode(message: QueryLiquidationsConfigurationResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationsConfigurationResponse;
    fromPartial(object: Partial<QueryLiquidationsConfigurationResponse>): QueryLiquidationsConfigurationResponse;
    fromAmino(object: QueryLiquidationsConfigurationResponseAmino): QueryLiquidationsConfigurationResponse;
    toAmino(message: QueryLiquidationsConfigurationResponse): QueryLiquidationsConfigurationResponseAmino;
    fromAminoMsg(object: QueryLiquidationsConfigurationResponseAminoMsg): QueryLiquidationsConfigurationResponse;
    fromProtoMsg(message: QueryLiquidationsConfigurationResponseProtoMsg): QueryLiquidationsConfigurationResponse;
    toProto(message: QueryLiquidationsConfigurationResponse): Uint8Array;
    toProtoMsg(message: QueryLiquidationsConfigurationResponse): QueryLiquidationsConfigurationResponseProtoMsg;
};
export declare const StreamOrderbookUpdatesRequest: {
    typeUrl: string;
    is(o: any): o is StreamOrderbookUpdatesRequest;
    isSDK(o: any): o is StreamOrderbookUpdatesRequestSDKType;
    isAmino(o: any): o is StreamOrderbookUpdatesRequestAmino;
    encode(message: StreamOrderbookUpdatesRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamOrderbookUpdatesRequest;
    fromPartial(object: Partial<StreamOrderbookUpdatesRequest>): StreamOrderbookUpdatesRequest;
    fromAmino(object: StreamOrderbookUpdatesRequestAmino): StreamOrderbookUpdatesRequest;
    toAmino(message: StreamOrderbookUpdatesRequest): StreamOrderbookUpdatesRequestAmino;
    fromAminoMsg(object: StreamOrderbookUpdatesRequestAminoMsg): StreamOrderbookUpdatesRequest;
    fromProtoMsg(message: StreamOrderbookUpdatesRequestProtoMsg): StreamOrderbookUpdatesRequest;
    toProto(message: StreamOrderbookUpdatesRequest): Uint8Array;
    toProtoMsg(message: StreamOrderbookUpdatesRequest): StreamOrderbookUpdatesRequestProtoMsg;
};
export declare const StreamOrderbookUpdatesResponse: {
    typeUrl: string;
    is(o: any): o is StreamOrderbookUpdatesResponse;
    isSDK(o: any): o is StreamOrderbookUpdatesResponseSDKType;
    isAmino(o: any): o is StreamOrderbookUpdatesResponseAmino;
    encode(message: StreamOrderbookUpdatesResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamOrderbookUpdatesResponse;
    fromPartial(object: Partial<StreamOrderbookUpdatesResponse>): StreamOrderbookUpdatesResponse;
    fromAmino(object: StreamOrderbookUpdatesResponseAmino): StreamOrderbookUpdatesResponse;
    toAmino(message: StreamOrderbookUpdatesResponse): StreamOrderbookUpdatesResponseAmino;
    fromAminoMsg(object: StreamOrderbookUpdatesResponseAminoMsg): StreamOrderbookUpdatesResponse;
    fromProtoMsg(message: StreamOrderbookUpdatesResponseProtoMsg): StreamOrderbookUpdatesResponse;
    toProto(message: StreamOrderbookUpdatesResponse): Uint8Array;
    toProtoMsg(message: StreamOrderbookUpdatesResponse): StreamOrderbookUpdatesResponseProtoMsg;
};
