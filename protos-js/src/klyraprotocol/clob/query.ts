//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { ValidatorMevMatches, ValidatorMevMatchesAmino, ValidatorMevMatchesSDKType, MevNodeToNodeMetrics, MevNodeToNodeMetricsAmino, MevNodeToNodeMetricsSDKType } from "./mev";
import { ClobPair, ClobPairAmino, ClobPairSDKType } from "./clob_pair";
import { EquityTierLimitConfiguration, EquityTierLimitConfigurationAmino, EquityTierLimitConfigurationSDKType } from "./equity_tier_limit_config";
import { BlockRateLimitConfiguration, BlockRateLimitConfigurationAmino, BlockRateLimitConfigurationSDKType } from "./block_rate_limit_config";
import { LiquidationsConfig, LiquidationsConfigAmino, LiquidationsConfigSDKType } from "./liquidations_config";
import { OffChainUpdateV1, OffChainUpdateV1Amino, OffChainUpdateV1SDKType } from "../indexer/off_chain_updates/off_chain_updates";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
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
export interface QueryEquityTierLimitConfigurationRequest {}
export interface QueryEquityTierLimitConfigurationRequestProtoMsg {
  typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationRequest";
  value: Uint8Array;
}
/**
 * QueryEquityTierLimitConfigurationRequest is a request message for
 * EquityTierLimitConfiguration.
 */
export interface QueryEquityTierLimitConfigurationRequestAmino {}
export interface QueryEquityTierLimitConfigurationRequestAminoMsg {
  type: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationRequest";
  value: QueryEquityTierLimitConfigurationRequestAmino;
}
/**
 * QueryEquityTierLimitConfigurationRequest is a request message for
 * EquityTierLimitConfiguration.
 */
export interface QueryEquityTierLimitConfigurationRequestSDKType {}
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
export interface QueryBlockRateLimitConfigurationRequest {}
export interface QueryBlockRateLimitConfigurationRequestProtoMsg {
  typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationRequest";
  value: Uint8Array;
}
/**
 * QueryBlockRateLimitConfigurationRequest is a request message for
 * BlockRateLimitConfiguration.
 */
export interface QueryBlockRateLimitConfigurationRequestAmino {}
export interface QueryBlockRateLimitConfigurationRequestAminoMsg {
  type: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationRequest";
  value: QueryBlockRateLimitConfigurationRequestAmino;
}
/**
 * QueryBlockRateLimitConfigurationRequest is a request message for
 * BlockRateLimitConfiguration.
 */
export interface QueryBlockRateLimitConfigurationRequestSDKType {}
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
export interface QueryLiquidationsConfigurationRequest {}
export interface QueryLiquidationsConfigurationRequestProtoMsg {
  typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationRequest";
  value: Uint8Array;
}
/**
 * QueryLiquidationsConfigurationRequest is a request message for
 * LiquidationsConfiguration.
 */
export interface QueryLiquidationsConfigurationRequestAmino {}
export interface QueryLiquidationsConfigurationRequestAminoMsg {
  type: "/klyraprotocol.clob.QueryLiquidationsConfigurationRequest";
  value: QueryLiquidationsConfigurationRequestAmino;
}
/**
 * QueryLiquidationsConfigurationRequest is a request message for
 * LiquidationsConfiguration.
 */
export interface QueryLiquidationsConfigurationRequestSDKType {}
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
function createBaseQueryGetClobPairRequest(): QueryGetClobPairRequest {
  return {
    id: 0
  };
}
export const QueryGetClobPairRequest = {
  typeUrl: "/klyraprotocol.clob.QueryGetClobPairRequest",
  is(o: any): o is QueryGetClobPairRequest {
    return o && (o.$typeUrl === QueryGetClobPairRequest.typeUrl || typeof o.id === "number");
  },
  isSDK(o: any): o is QueryGetClobPairRequestSDKType {
    return o && (o.$typeUrl === QueryGetClobPairRequest.typeUrl || typeof o.id === "number");
  },
  isAmino(o: any): o is QueryGetClobPairRequestAmino {
    return o && (o.$typeUrl === QueryGetClobPairRequest.typeUrl || typeof o.id === "number");
  },
  encode(message: QueryGetClobPairRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetClobPairRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetClobPairRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetClobPairRequest>): QueryGetClobPairRequest {
    const message = createBaseQueryGetClobPairRequest();
    message.id = object.id ?? 0;
    return message;
  },
  fromAmino(object: QueryGetClobPairRequestAmino): QueryGetClobPairRequest {
    const message = createBaseQueryGetClobPairRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    return message;
  },
  toAmino(message: QueryGetClobPairRequest): QueryGetClobPairRequestAmino {
    const obj: any = {};
    obj.id = message.id === 0 ? undefined : message.id;
    return obj;
  },
  fromAminoMsg(object: QueryGetClobPairRequestAminoMsg): QueryGetClobPairRequest {
    return QueryGetClobPairRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetClobPairRequestProtoMsg): QueryGetClobPairRequest {
    return QueryGetClobPairRequest.decode(message.value);
  },
  toProto(message: QueryGetClobPairRequest): Uint8Array {
    return QueryGetClobPairRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetClobPairRequest): QueryGetClobPairRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.QueryGetClobPairRequest",
      value: QueryGetClobPairRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryGetClobPairRequest.typeUrl, QueryGetClobPairRequest);
function createBaseQueryClobPairResponse(): QueryClobPairResponse {
  return {
    clobPair: ClobPair.fromPartial({})
  };
}
export const QueryClobPairResponse = {
  typeUrl: "/klyraprotocol.clob.QueryClobPairResponse",
  is(o: any): o is QueryClobPairResponse {
    return o && (o.$typeUrl === QueryClobPairResponse.typeUrl || ClobPair.is(o.clobPair));
  },
  isSDK(o: any): o is QueryClobPairResponseSDKType {
    return o && (o.$typeUrl === QueryClobPairResponse.typeUrl || ClobPair.isSDK(o.clob_pair));
  },
  isAmino(o: any): o is QueryClobPairResponseAmino {
    return o && (o.$typeUrl === QueryClobPairResponse.typeUrl || ClobPair.isAmino(o.clob_pair));
  },
  encode(message: QueryClobPairResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clobPair !== undefined) {
      ClobPair.encode(message.clobPair, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClobPairResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClobPairResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clobPair = ClobPair.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClobPairResponse>): QueryClobPairResponse {
    const message = createBaseQueryClobPairResponse();
    message.clobPair = object.clobPair !== undefined && object.clobPair !== null ? ClobPair.fromPartial(object.clobPair) : undefined;
    return message;
  },
  fromAmino(object: QueryClobPairResponseAmino): QueryClobPairResponse {
    const message = createBaseQueryClobPairResponse();
    if (object.clob_pair !== undefined && object.clob_pair !== null) {
      message.clobPair = ClobPair.fromAmino(object.clob_pair);
    }
    return message;
  },
  toAmino(message: QueryClobPairResponse): QueryClobPairResponseAmino {
    const obj: any = {};
    obj.clob_pair = message.clobPair ? ClobPair.toAmino(message.clobPair) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClobPairResponseAminoMsg): QueryClobPairResponse {
    return QueryClobPairResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClobPairResponseProtoMsg): QueryClobPairResponse {
    return QueryClobPairResponse.decode(message.value);
  },
  toProto(message: QueryClobPairResponse): Uint8Array {
    return QueryClobPairResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClobPairResponse): QueryClobPairResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.QueryClobPairResponse",
      value: QueryClobPairResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryClobPairResponse.typeUrl, QueryClobPairResponse);
function createBaseQueryAllClobPairRequest(): QueryAllClobPairRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllClobPairRequest = {
  typeUrl: "/klyraprotocol.clob.QueryAllClobPairRequest",
  is(o: any): o is QueryAllClobPairRequest {
    return o && o.$typeUrl === QueryAllClobPairRequest.typeUrl;
  },
  isSDK(o: any): o is QueryAllClobPairRequestSDKType {
    return o && o.$typeUrl === QueryAllClobPairRequest.typeUrl;
  },
  isAmino(o: any): o is QueryAllClobPairRequestAmino {
    return o && o.$typeUrl === QueryAllClobPairRequest.typeUrl;
  },
  encode(message: QueryAllClobPairRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllClobPairRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllClobPairRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllClobPairRequest>): QueryAllClobPairRequest {
    const message = createBaseQueryAllClobPairRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllClobPairRequestAmino): QueryAllClobPairRequest {
    const message = createBaseQueryAllClobPairRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllClobPairRequest): QueryAllClobPairRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllClobPairRequestAminoMsg): QueryAllClobPairRequest {
    return QueryAllClobPairRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllClobPairRequestProtoMsg): QueryAllClobPairRequest {
    return QueryAllClobPairRequest.decode(message.value);
  },
  toProto(message: QueryAllClobPairRequest): Uint8Array {
    return QueryAllClobPairRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllClobPairRequest): QueryAllClobPairRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.QueryAllClobPairRequest",
      value: QueryAllClobPairRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAllClobPairRequest.typeUrl, QueryAllClobPairRequest);
function createBaseQueryClobPairAllResponse(): QueryClobPairAllResponse {
  return {
    clobPair: [],
    pagination: undefined
  };
}
export const QueryClobPairAllResponse = {
  typeUrl: "/klyraprotocol.clob.QueryClobPairAllResponse",
  is(o: any): o is QueryClobPairAllResponse {
    return o && (o.$typeUrl === QueryClobPairAllResponse.typeUrl || Array.isArray(o.clobPair) && (!o.clobPair.length || ClobPair.is(o.clobPair[0])));
  },
  isSDK(o: any): o is QueryClobPairAllResponseSDKType {
    return o && (o.$typeUrl === QueryClobPairAllResponse.typeUrl || Array.isArray(o.clob_pair) && (!o.clob_pair.length || ClobPair.isSDK(o.clob_pair[0])));
  },
  isAmino(o: any): o is QueryClobPairAllResponseAmino {
    return o && (o.$typeUrl === QueryClobPairAllResponse.typeUrl || Array.isArray(o.clob_pair) && (!o.clob_pair.length || ClobPair.isAmino(o.clob_pair[0])));
  },
  encode(message: QueryClobPairAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.clobPair) {
      ClobPair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClobPairAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClobPairAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clobPair.push(ClobPair.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClobPairAllResponse>): QueryClobPairAllResponse {
    const message = createBaseQueryClobPairAllResponse();
    message.clobPair = object.clobPair?.map(e => ClobPair.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryClobPairAllResponseAmino): QueryClobPairAllResponse {
    const message = createBaseQueryClobPairAllResponse();
    message.clobPair = object.clob_pair?.map(e => ClobPair.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryClobPairAllResponse): QueryClobPairAllResponseAmino {
    const obj: any = {};
    if (message.clobPair) {
      obj.clob_pair = message.clobPair.map(e => e ? ClobPair.toAmino(e) : undefined);
    } else {
      obj.clob_pair = message.clobPair;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClobPairAllResponseAminoMsg): QueryClobPairAllResponse {
    return QueryClobPairAllResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClobPairAllResponseProtoMsg): QueryClobPairAllResponse {
    return QueryClobPairAllResponse.decode(message.value);
  },
  toProto(message: QueryClobPairAllResponse): Uint8Array {
    return QueryClobPairAllResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClobPairAllResponse): QueryClobPairAllResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.QueryClobPairAllResponse",
      value: QueryClobPairAllResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryClobPairAllResponse.typeUrl, QueryClobPairAllResponse);
function createBaseMevNodeToNodeCalculationRequest(): MevNodeToNodeCalculationRequest {
  return {
    blockProposerMatches: undefined,
    validatorMevMetrics: undefined
  };
}
export const MevNodeToNodeCalculationRequest = {
  typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationRequest",
  is(o: any): o is MevNodeToNodeCalculationRequest {
    return o && o.$typeUrl === MevNodeToNodeCalculationRequest.typeUrl;
  },
  isSDK(o: any): o is MevNodeToNodeCalculationRequestSDKType {
    return o && o.$typeUrl === MevNodeToNodeCalculationRequest.typeUrl;
  },
  isAmino(o: any): o is MevNodeToNodeCalculationRequestAmino {
    return o && o.$typeUrl === MevNodeToNodeCalculationRequest.typeUrl;
  },
  encode(message: MevNodeToNodeCalculationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockProposerMatches !== undefined) {
      ValidatorMevMatches.encode(message.blockProposerMatches, writer.uint32(10).fork()).ldelim();
    }
    if (message.validatorMevMetrics !== undefined) {
      MevNodeToNodeMetrics.encode(message.validatorMevMetrics, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MevNodeToNodeCalculationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMevNodeToNodeCalculationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockProposerMatches = ValidatorMevMatches.decode(reader, reader.uint32());
          break;
        case 2:
          message.validatorMevMetrics = MevNodeToNodeMetrics.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MevNodeToNodeCalculationRequest>): MevNodeToNodeCalculationRequest {
    const message = createBaseMevNodeToNodeCalculationRequest();
    message.blockProposerMatches = object.blockProposerMatches !== undefined && object.blockProposerMatches !== null ? ValidatorMevMatches.fromPartial(object.blockProposerMatches) : undefined;
    message.validatorMevMetrics = object.validatorMevMetrics !== undefined && object.validatorMevMetrics !== null ? MevNodeToNodeMetrics.fromPartial(object.validatorMevMetrics) : undefined;
    return message;
  },
  fromAmino(object: MevNodeToNodeCalculationRequestAmino): MevNodeToNodeCalculationRequest {
    const message = createBaseMevNodeToNodeCalculationRequest();
    if (object.block_proposer_matches !== undefined && object.block_proposer_matches !== null) {
      message.blockProposerMatches = ValidatorMevMatches.fromAmino(object.block_proposer_matches);
    }
    if (object.validator_mev_metrics !== undefined && object.validator_mev_metrics !== null) {
      message.validatorMevMetrics = MevNodeToNodeMetrics.fromAmino(object.validator_mev_metrics);
    }
    return message;
  },
  toAmino(message: MevNodeToNodeCalculationRequest): MevNodeToNodeCalculationRequestAmino {
    const obj: any = {};
    obj.block_proposer_matches = message.blockProposerMatches ? ValidatorMevMatches.toAmino(message.blockProposerMatches) : undefined;
    obj.validator_mev_metrics = message.validatorMevMetrics ? MevNodeToNodeMetrics.toAmino(message.validatorMevMetrics) : undefined;
    return obj;
  },
  fromAminoMsg(object: MevNodeToNodeCalculationRequestAminoMsg): MevNodeToNodeCalculationRequest {
    return MevNodeToNodeCalculationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MevNodeToNodeCalculationRequestProtoMsg): MevNodeToNodeCalculationRequest {
    return MevNodeToNodeCalculationRequest.decode(message.value);
  },
  toProto(message: MevNodeToNodeCalculationRequest): Uint8Array {
    return MevNodeToNodeCalculationRequest.encode(message).finish();
  },
  toProtoMsg(message: MevNodeToNodeCalculationRequest): MevNodeToNodeCalculationRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationRequest",
      value: MevNodeToNodeCalculationRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MevNodeToNodeCalculationRequest.typeUrl, MevNodeToNodeCalculationRequest);
function createBaseMevNodeToNodeCalculationResponse(): MevNodeToNodeCalculationResponse {
  return {
    results: []
  };
}
export const MevNodeToNodeCalculationResponse = {
  typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationResponse",
  is(o: any): o is MevNodeToNodeCalculationResponse {
    return o && (o.$typeUrl === MevNodeToNodeCalculationResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || MevNodeToNodeCalculationResponse_MevAndVolumePerClob.is(o.results[0])));
  },
  isSDK(o: any): o is MevNodeToNodeCalculationResponseSDKType {
    return o && (o.$typeUrl === MevNodeToNodeCalculationResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || MevNodeToNodeCalculationResponse_MevAndVolumePerClob.isSDK(o.results[0])));
  },
  isAmino(o: any): o is MevNodeToNodeCalculationResponseAmino {
    return o && (o.$typeUrl === MevNodeToNodeCalculationResponse.typeUrl || Array.isArray(o.results) && (!o.results.length || MevNodeToNodeCalculationResponse_MevAndVolumePerClob.isAmino(o.results[0])));
  },
  encode(message: MevNodeToNodeCalculationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.results) {
      MevNodeToNodeCalculationResponse_MevAndVolumePerClob.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MevNodeToNodeCalculationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMevNodeToNodeCalculationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.results.push(MevNodeToNodeCalculationResponse_MevAndVolumePerClob.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MevNodeToNodeCalculationResponse>): MevNodeToNodeCalculationResponse {
    const message = createBaseMevNodeToNodeCalculationResponse();
    message.results = object.results?.map(e => MevNodeToNodeCalculationResponse_MevAndVolumePerClob.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MevNodeToNodeCalculationResponseAmino): MevNodeToNodeCalculationResponse {
    const message = createBaseMevNodeToNodeCalculationResponse();
    message.results = object.results?.map(e => MevNodeToNodeCalculationResponse_MevAndVolumePerClob.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MevNodeToNodeCalculationResponse): MevNodeToNodeCalculationResponseAmino {
    const obj: any = {};
    if (message.results) {
      obj.results = message.results.map(e => e ? MevNodeToNodeCalculationResponse_MevAndVolumePerClob.toAmino(e) : undefined);
    } else {
      obj.results = message.results;
    }
    return obj;
  },
  fromAminoMsg(object: MevNodeToNodeCalculationResponseAminoMsg): MevNodeToNodeCalculationResponse {
    return MevNodeToNodeCalculationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MevNodeToNodeCalculationResponseProtoMsg): MevNodeToNodeCalculationResponse {
    return MevNodeToNodeCalculationResponse.decode(message.value);
  },
  toProto(message: MevNodeToNodeCalculationResponse): Uint8Array {
    return MevNodeToNodeCalculationResponse.encode(message).finish();
  },
  toProtoMsg(message: MevNodeToNodeCalculationResponse): MevNodeToNodeCalculationResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.MevNodeToNodeCalculationResponse",
      value: MevNodeToNodeCalculationResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MevNodeToNodeCalculationResponse.typeUrl, MevNodeToNodeCalculationResponse);
function createBaseMevNodeToNodeCalculationResponse_MevAndVolumePerClob(): MevNodeToNodeCalculationResponse_MevAndVolumePerClob {
  return {
    clobPairId: 0,
    mev: 0,
    volume: BigInt(0)
  };
}
export const MevNodeToNodeCalculationResponse_MevAndVolumePerClob = {
  typeUrl: "/klyraprotocol.clob.MevAndVolumePerClob",
  is(o: any): o is MevNodeToNodeCalculationResponse_MevAndVolumePerClob {
    return o && (o.$typeUrl === MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl || typeof o.clobPairId === "number" && typeof o.mev === "number" && typeof o.volume === "bigint");
  },
  isSDK(o: any): o is MevNodeToNodeCalculationResponse_MevAndVolumePerClobSDKType {
    return o && (o.$typeUrl === MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl || typeof o.clob_pair_id === "number" && typeof o.mev === "number" && typeof o.volume === "bigint");
  },
  isAmino(o: any): o is MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino {
    return o && (o.$typeUrl === MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl || typeof o.clob_pair_id === "number" && typeof o.mev === "number" && typeof o.volume === "bigint");
  },
  encode(message: MevNodeToNodeCalculationResponse_MevAndVolumePerClob, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clobPairId !== 0) {
      writer.uint32(8).uint32(message.clobPairId);
    }
    if (message.mev !== 0) {
      writer.uint32(21).float(message.mev);
    }
    if (message.volume !== BigInt(0)) {
      writer.uint32(24).uint64(message.volume);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MevNodeToNodeCalculationResponse_MevAndVolumePerClob {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMevNodeToNodeCalculationResponse_MevAndVolumePerClob();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clobPairId = reader.uint32();
          break;
        case 2:
          message.mev = reader.float();
          break;
        case 3:
          message.volume = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MevNodeToNodeCalculationResponse_MevAndVolumePerClob>): MevNodeToNodeCalculationResponse_MevAndVolumePerClob {
    const message = createBaseMevNodeToNodeCalculationResponse_MevAndVolumePerClob();
    message.clobPairId = object.clobPairId ?? 0;
    message.mev = object.mev ?? 0;
    message.volume = object.volume !== undefined && object.volume !== null ? BigInt(object.volume.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino): MevNodeToNodeCalculationResponse_MevAndVolumePerClob {
    const message = createBaseMevNodeToNodeCalculationResponse_MevAndVolumePerClob();
    if (object.clob_pair_id !== undefined && object.clob_pair_id !== null) {
      message.clobPairId = object.clob_pair_id;
    }
    if (object.mev !== undefined && object.mev !== null) {
      message.mev = object.mev;
    }
    if (object.volume !== undefined && object.volume !== null) {
      message.volume = BigInt(object.volume);
    }
    return message;
  },
  toAmino(message: MevNodeToNodeCalculationResponse_MevAndVolumePerClob): MevNodeToNodeCalculationResponse_MevAndVolumePerClobAmino {
    const obj: any = {};
    obj.clob_pair_id = message.clobPairId === 0 ? undefined : message.clobPairId;
    obj.mev = message.mev === 0 ? undefined : message.mev;
    obj.volume = message.volume !== BigInt(0) ? message.volume?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MevNodeToNodeCalculationResponse_MevAndVolumePerClobAminoMsg): MevNodeToNodeCalculationResponse_MevAndVolumePerClob {
    return MevNodeToNodeCalculationResponse_MevAndVolumePerClob.fromAmino(object.value);
  },
  fromProtoMsg(message: MevNodeToNodeCalculationResponse_MevAndVolumePerClobProtoMsg): MevNodeToNodeCalculationResponse_MevAndVolumePerClob {
    return MevNodeToNodeCalculationResponse_MevAndVolumePerClob.decode(message.value);
  },
  toProto(message: MevNodeToNodeCalculationResponse_MevAndVolumePerClob): Uint8Array {
    return MevNodeToNodeCalculationResponse_MevAndVolumePerClob.encode(message).finish();
  },
  toProtoMsg(message: MevNodeToNodeCalculationResponse_MevAndVolumePerClob): MevNodeToNodeCalculationResponse_MevAndVolumePerClobProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.MevAndVolumePerClob",
      value: MevNodeToNodeCalculationResponse_MevAndVolumePerClob.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MevNodeToNodeCalculationResponse_MevAndVolumePerClob.typeUrl, MevNodeToNodeCalculationResponse_MevAndVolumePerClob);
function createBaseQueryEquityTierLimitConfigurationRequest(): QueryEquityTierLimitConfigurationRequest {
  return {};
}
export const QueryEquityTierLimitConfigurationRequest = {
  typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationRequest",
  is(o: any): o is QueryEquityTierLimitConfigurationRequest {
    return o && o.$typeUrl === QueryEquityTierLimitConfigurationRequest.typeUrl;
  },
  isSDK(o: any): o is QueryEquityTierLimitConfigurationRequestSDKType {
    return o && o.$typeUrl === QueryEquityTierLimitConfigurationRequest.typeUrl;
  },
  isAmino(o: any): o is QueryEquityTierLimitConfigurationRequestAmino {
    return o && o.$typeUrl === QueryEquityTierLimitConfigurationRequest.typeUrl;
  },
  encode(_: QueryEquityTierLimitConfigurationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEquityTierLimitConfigurationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEquityTierLimitConfigurationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryEquityTierLimitConfigurationRequest>): QueryEquityTierLimitConfigurationRequest {
    const message = createBaseQueryEquityTierLimitConfigurationRequest();
    return message;
  },
  fromAmino(_: QueryEquityTierLimitConfigurationRequestAmino): QueryEquityTierLimitConfigurationRequest {
    const message = createBaseQueryEquityTierLimitConfigurationRequest();
    return message;
  },
  toAmino(_: QueryEquityTierLimitConfigurationRequest): QueryEquityTierLimitConfigurationRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryEquityTierLimitConfigurationRequestAminoMsg): QueryEquityTierLimitConfigurationRequest {
    return QueryEquityTierLimitConfigurationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEquityTierLimitConfigurationRequestProtoMsg): QueryEquityTierLimitConfigurationRequest {
    return QueryEquityTierLimitConfigurationRequest.decode(message.value);
  },
  toProto(message: QueryEquityTierLimitConfigurationRequest): Uint8Array {
    return QueryEquityTierLimitConfigurationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryEquityTierLimitConfigurationRequest): QueryEquityTierLimitConfigurationRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationRequest",
      value: QueryEquityTierLimitConfigurationRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryEquityTierLimitConfigurationRequest.typeUrl, QueryEquityTierLimitConfigurationRequest);
function createBaseQueryEquityTierLimitConfigurationResponse(): QueryEquityTierLimitConfigurationResponse {
  return {
    equityTierLimitConfig: EquityTierLimitConfiguration.fromPartial({})
  };
}
export const QueryEquityTierLimitConfigurationResponse = {
  typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationResponse",
  is(o: any): o is QueryEquityTierLimitConfigurationResponse {
    return o && (o.$typeUrl === QueryEquityTierLimitConfigurationResponse.typeUrl || EquityTierLimitConfiguration.is(o.equityTierLimitConfig));
  },
  isSDK(o: any): o is QueryEquityTierLimitConfigurationResponseSDKType {
    return o && (o.$typeUrl === QueryEquityTierLimitConfigurationResponse.typeUrl || EquityTierLimitConfiguration.isSDK(o.equity_tier_limit_config));
  },
  isAmino(o: any): o is QueryEquityTierLimitConfigurationResponseAmino {
    return o && (o.$typeUrl === QueryEquityTierLimitConfigurationResponse.typeUrl || EquityTierLimitConfiguration.isAmino(o.equity_tier_limit_config));
  },
  encode(message: QueryEquityTierLimitConfigurationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.equityTierLimitConfig !== undefined) {
      EquityTierLimitConfiguration.encode(message.equityTierLimitConfig, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEquityTierLimitConfigurationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEquityTierLimitConfigurationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.equityTierLimitConfig = EquityTierLimitConfiguration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEquityTierLimitConfigurationResponse>): QueryEquityTierLimitConfigurationResponse {
    const message = createBaseQueryEquityTierLimitConfigurationResponse();
    message.equityTierLimitConfig = object.equityTierLimitConfig !== undefined && object.equityTierLimitConfig !== null ? EquityTierLimitConfiguration.fromPartial(object.equityTierLimitConfig) : undefined;
    return message;
  },
  fromAmino(object: QueryEquityTierLimitConfigurationResponseAmino): QueryEquityTierLimitConfigurationResponse {
    const message = createBaseQueryEquityTierLimitConfigurationResponse();
    if (object.equity_tier_limit_config !== undefined && object.equity_tier_limit_config !== null) {
      message.equityTierLimitConfig = EquityTierLimitConfiguration.fromAmino(object.equity_tier_limit_config);
    }
    return message;
  },
  toAmino(message: QueryEquityTierLimitConfigurationResponse): QueryEquityTierLimitConfigurationResponseAmino {
    const obj: any = {};
    obj.equity_tier_limit_config = message.equityTierLimitConfig ? EquityTierLimitConfiguration.toAmino(message.equityTierLimitConfig) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEquityTierLimitConfigurationResponseAminoMsg): QueryEquityTierLimitConfigurationResponse {
    return QueryEquityTierLimitConfigurationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEquityTierLimitConfigurationResponseProtoMsg): QueryEquityTierLimitConfigurationResponse {
    return QueryEquityTierLimitConfigurationResponse.decode(message.value);
  },
  toProto(message: QueryEquityTierLimitConfigurationResponse): Uint8Array {
    return QueryEquityTierLimitConfigurationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEquityTierLimitConfigurationResponse): QueryEquityTierLimitConfigurationResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.QueryEquityTierLimitConfigurationResponse",
      value: QueryEquityTierLimitConfigurationResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryEquityTierLimitConfigurationResponse.typeUrl, QueryEquityTierLimitConfigurationResponse);
function createBaseQueryBlockRateLimitConfigurationRequest(): QueryBlockRateLimitConfigurationRequest {
  return {};
}
export const QueryBlockRateLimitConfigurationRequest = {
  typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationRequest",
  is(o: any): o is QueryBlockRateLimitConfigurationRequest {
    return o && o.$typeUrl === QueryBlockRateLimitConfigurationRequest.typeUrl;
  },
  isSDK(o: any): o is QueryBlockRateLimitConfigurationRequestSDKType {
    return o && o.$typeUrl === QueryBlockRateLimitConfigurationRequest.typeUrl;
  },
  isAmino(o: any): o is QueryBlockRateLimitConfigurationRequestAmino {
    return o && o.$typeUrl === QueryBlockRateLimitConfigurationRequest.typeUrl;
  },
  encode(_: QueryBlockRateLimitConfigurationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockRateLimitConfigurationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockRateLimitConfigurationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryBlockRateLimitConfigurationRequest>): QueryBlockRateLimitConfigurationRequest {
    const message = createBaseQueryBlockRateLimitConfigurationRequest();
    return message;
  },
  fromAmino(_: QueryBlockRateLimitConfigurationRequestAmino): QueryBlockRateLimitConfigurationRequest {
    const message = createBaseQueryBlockRateLimitConfigurationRequest();
    return message;
  },
  toAmino(_: QueryBlockRateLimitConfigurationRequest): QueryBlockRateLimitConfigurationRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryBlockRateLimitConfigurationRequestAminoMsg): QueryBlockRateLimitConfigurationRequest {
    return QueryBlockRateLimitConfigurationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlockRateLimitConfigurationRequestProtoMsg): QueryBlockRateLimitConfigurationRequest {
    return QueryBlockRateLimitConfigurationRequest.decode(message.value);
  },
  toProto(message: QueryBlockRateLimitConfigurationRequest): Uint8Array {
    return QueryBlockRateLimitConfigurationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBlockRateLimitConfigurationRequest): QueryBlockRateLimitConfigurationRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationRequest",
      value: QueryBlockRateLimitConfigurationRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryBlockRateLimitConfigurationRequest.typeUrl, QueryBlockRateLimitConfigurationRequest);
function createBaseQueryBlockRateLimitConfigurationResponse(): QueryBlockRateLimitConfigurationResponse {
  return {
    blockRateLimitConfig: BlockRateLimitConfiguration.fromPartial({})
  };
}
export const QueryBlockRateLimitConfigurationResponse = {
  typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationResponse",
  is(o: any): o is QueryBlockRateLimitConfigurationResponse {
    return o && (o.$typeUrl === QueryBlockRateLimitConfigurationResponse.typeUrl || BlockRateLimitConfiguration.is(o.blockRateLimitConfig));
  },
  isSDK(o: any): o is QueryBlockRateLimitConfigurationResponseSDKType {
    return o && (o.$typeUrl === QueryBlockRateLimitConfigurationResponse.typeUrl || BlockRateLimitConfiguration.isSDK(o.block_rate_limit_config));
  },
  isAmino(o: any): o is QueryBlockRateLimitConfigurationResponseAmino {
    return o && (o.$typeUrl === QueryBlockRateLimitConfigurationResponse.typeUrl || BlockRateLimitConfiguration.isAmino(o.block_rate_limit_config));
  },
  encode(message: QueryBlockRateLimitConfigurationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockRateLimitConfig !== undefined) {
      BlockRateLimitConfiguration.encode(message.blockRateLimitConfig, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockRateLimitConfigurationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockRateLimitConfigurationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockRateLimitConfig = BlockRateLimitConfiguration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBlockRateLimitConfigurationResponse>): QueryBlockRateLimitConfigurationResponse {
    const message = createBaseQueryBlockRateLimitConfigurationResponse();
    message.blockRateLimitConfig = object.blockRateLimitConfig !== undefined && object.blockRateLimitConfig !== null ? BlockRateLimitConfiguration.fromPartial(object.blockRateLimitConfig) : undefined;
    return message;
  },
  fromAmino(object: QueryBlockRateLimitConfigurationResponseAmino): QueryBlockRateLimitConfigurationResponse {
    const message = createBaseQueryBlockRateLimitConfigurationResponse();
    if (object.block_rate_limit_config !== undefined && object.block_rate_limit_config !== null) {
      message.blockRateLimitConfig = BlockRateLimitConfiguration.fromAmino(object.block_rate_limit_config);
    }
    return message;
  },
  toAmino(message: QueryBlockRateLimitConfigurationResponse): QueryBlockRateLimitConfigurationResponseAmino {
    const obj: any = {};
    obj.block_rate_limit_config = message.blockRateLimitConfig ? BlockRateLimitConfiguration.toAmino(message.blockRateLimitConfig) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBlockRateLimitConfigurationResponseAminoMsg): QueryBlockRateLimitConfigurationResponse {
    return QueryBlockRateLimitConfigurationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlockRateLimitConfigurationResponseProtoMsg): QueryBlockRateLimitConfigurationResponse {
    return QueryBlockRateLimitConfigurationResponse.decode(message.value);
  },
  toProto(message: QueryBlockRateLimitConfigurationResponse): Uint8Array {
    return QueryBlockRateLimitConfigurationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBlockRateLimitConfigurationResponse): QueryBlockRateLimitConfigurationResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.QueryBlockRateLimitConfigurationResponse",
      value: QueryBlockRateLimitConfigurationResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryBlockRateLimitConfigurationResponse.typeUrl, QueryBlockRateLimitConfigurationResponse);
function createBaseQueryLiquidationsConfigurationRequest(): QueryLiquidationsConfigurationRequest {
  return {};
}
export const QueryLiquidationsConfigurationRequest = {
  typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationRequest",
  is(o: any): o is QueryLiquidationsConfigurationRequest {
    return o && o.$typeUrl === QueryLiquidationsConfigurationRequest.typeUrl;
  },
  isSDK(o: any): o is QueryLiquidationsConfigurationRequestSDKType {
    return o && o.$typeUrl === QueryLiquidationsConfigurationRequest.typeUrl;
  },
  isAmino(o: any): o is QueryLiquidationsConfigurationRequestAmino {
    return o && o.$typeUrl === QueryLiquidationsConfigurationRequest.typeUrl;
  },
  encode(_: QueryLiquidationsConfigurationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationsConfigurationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationsConfigurationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryLiquidationsConfigurationRequest>): QueryLiquidationsConfigurationRequest {
    const message = createBaseQueryLiquidationsConfigurationRequest();
    return message;
  },
  fromAmino(_: QueryLiquidationsConfigurationRequestAmino): QueryLiquidationsConfigurationRequest {
    const message = createBaseQueryLiquidationsConfigurationRequest();
    return message;
  },
  toAmino(_: QueryLiquidationsConfigurationRequest): QueryLiquidationsConfigurationRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationsConfigurationRequestAminoMsg): QueryLiquidationsConfigurationRequest {
    return QueryLiquidationsConfigurationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationsConfigurationRequestProtoMsg): QueryLiquidationsConfigurationRequest {
    return QueryLiquidationsConfigurationRequest.decode(message.value);
  },
  toProto(message: QueryLiquidationsConfigurationRequest): Uint8Array {
    return QueryLiquidationsConfigurationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationsConfigurationRequest): QueryLiquidationsConfigurationRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationRequest",
      value: QueryLiquidationsConfigurationRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLiquidationsConfigurationRequest.typeUrl, QueryLiquidationsConfigurationRequest);
function createBaseQueryLiquidationsConfigurationResponse(): QueryLiquidationsConfigurationResponse {
  return {
    liquidationsConfig: LiquidationsConfig.fromPartial({})
  };
}
export const QueryLiquidationsConfigurationResponse = {
  typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationResponse",
  is(o: any): o is QueryLiquidationsConfigurationResponse {
    return o && (o.$typeUrl === QueryLiquidationsConfigurationResponse.typeUrl || LiquidationsConfig.is(o.liquidationsConfig));
  },
  isSDK(o: any): o is QueryLiquidationsConfigurationResponseSDKType {
    return o && (o.$typeUrl === QueryLiquidationsConfigurationResponse.typeUrl || LiquidationsConfig.isSDK(o.liquidations_config));
  },
  isAmino(o: any): o is QueryLiquidationsConfigurationResponseAmino {
    return o && (o.$typeUrl === QueryLiquidationsConfigurationResponse.typeUrl || LiquidationsConfig.isAmino(o.liquidations_config));
  },
  encode(message: QueryLiquidationsConfigurationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidationsConfig !== undefined) {
      LiquidationsConfig.encode(message.liquidationsConfig, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationsConfigurationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationsConfigurationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidationsConfig = LiquidationsConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationsConfigurationResponse>): QueryLiquidationsConfigurationResponse {
    const message = createBaseQueryLiquidationsConfigurationResponse();
    message.liquidationsConfig = object.liquidationsConfig !== undefined && object.liquidationsConfig !== null ? LiquidationsConfig.fromPartial(object.liquidationsConfig) : undefined;
    return message;
  },
  fromAmino(object: QueryLiquidationsConfigurationResponseAmino): QueryLiquidationsConfigurationResponse {
    const message = createBaseQueryLiquidationsConfigurationResponse();
    if (object.liquidations_config !== undefined && object.liquidations_config !== null) {
      message.liquidationsConfig = LiquidationsConfig.fromAmino(object.liquidations_config);
    }
    return message;
  },
  toAmino(message: QueryLiquidationsConfigurationResponse): QueryLiquidationsConfigurationResponseAmino {
    const obj: any = {};
    obj.liquidations_config = message.liquidationsConfig ? LiquidationsConfig.toAmino(message.liquidationsConfig) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationsConfigurationResponseAminoMsg): QueryLiquidationsConfigurationResponse {
    return QueryLiquidationsConfigurationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationsConfigurationResponseProtoMsg): QueryLiquidationsConfigurationResponse {
    return QueryLiquidationsConfigurationResponse.decode(message.value);
  },
  toProto(message: QueryLiquidationsConfigurationResponse): Uint8Array {
    return QueryLiquidationsConfigurationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationsConfigurationResponse): QueryLiquidationsConfigurationResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.QueryLiquidationsConfigurationResponse",
      value: QueryLiquidationsConfigurationResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryLiquidationsConfigurationResponse.typeUrl, QueryLiquidationsConfigurationResponse);
function createBaseStreamOrderbookUpdatesRequest(): StreamOrderbookUpdatesRequest {
  return {
    clobPairId: []
  };
}
export const StreamOrderbookUpdatesRequest = {
  typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesRequest",
  is(o: any): o is StreamOrderbookUpdatesRequest {
    return o && (o.$typeUrl === StreamOrderbookUpdatesRequest.typeUrl || Array.isArray(o.clobPairId) && (!o.clobPairId.length || typeof o.clobPairId[0] === "number"));
  },
  isSDK(o: any): o is StreamOrderbookUpdatesRequestSDKType {
    return o && (o.$typeUrl === StreamOrderbookUpdatesRequest.typeUrl || Array.isArray(o.clob_pair_id) && (!o.clob_pair_id.length || typeof o.clob_pair_id[0] === "number"));
  },
  isAmino(o: any): o is StreamOrderbookUpdatesRequestAmino {
    return o && (o.$typeUrl === StreamOrderbookUpdatesRequest.typeUrl || Array.isArray(o.clob_pair_id) && (!o.clob_pair_id.length || typeof o.clob_pair_id[0] === "number"));
  },
  encode(message: StreamOrderbookUpdatesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.clobPairId) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): StreamOrderbookUpdatesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamOrderbookUpdatesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.clobPairId.push(reader.uint32());
            }
          } else {
            message.clobPairId.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<StreamOrderbookUpdatesRequest>): StreamOrderbookUpdatesRequest {
    const message = createBaseStreamOrderbookUpdatesRequest();
    message.clobPairId = object.clobPairId?.map(e => e) || [];
    return message;
  },
  fromAmino(object: StreamOrderbookUpdatesRequestAmino): StreamOrderbookUpdatesRequest {
    const message = createBaseStreamOrderbookUpdatesRequest();
    message.clobPairId = object.clob_pair_id?.map(e => e) || [];
    return message;
  },
  toAmino(message: StreamOrderbookUpdatesRequest): StreamOrderbookUpdatesRequestAmino {
    const obj: any = {};
    if (message.clobPairId) {
      obj.clob_pair_id = message.clobPairId.map(e => e);
    } else {
      obj.clob_pair_id = message.clobPairId;
    }
    return obj;
  },
  fromAminoMsg(object: StreamOrderbookUpdatesRequestAminoMsg): StreamOrderbookUpdatesRequest {
    return StreamOrderbookUpdatesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: StreamOrderbookUpdatesRequestProtoMsg): StreamOrderbookUpdatesRequest {
    return StreamOrderbookUpdatesRequest.decode(message.value);
  },
  toProto(message: StreamOrderbookUpdatesRequest): Uint8Array {
    return StreamOrderbookUpdatesRequest.encode(message).finish();
  },
  toProtoMsg(message: StreamOrderbookUpdatesRequest): StreamOrderbookUpdatesRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesRequest",
      value: StreamOrderbookUpdatesRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(StreamOrderbookUpdatesRequest.typeUrl, StreamOrderbookUpdatesRequest);
function createBaseStreamOrderbookUpdatesResponse(): StreamOrderbookUpdatesResponse {
  return {
    updates: [],
    snapshot: false,
    blockHeight: 0,
    execMode: 0
  };
}
export const StreamOrderbookUpdatesResponse = {
  typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesResponse",
  is(o: any): o is StreamOrderbookUpdatesResponse {
    return o && (o.$typeUrl === StreamOrderbookUpdatesResponse.typeUrl || Array.isArray(o.updates) && (!o.updates.length || OffChainUpdateV1.is(o.updates[0])) && typeof o.snapshot === "boolean" && typeof o.blockHeight === "number" && typeof o.execMode === "number");
  },
  isSDK(o: any): o is StreamOrderbookUpdatesResponseSDKType {
    return o && (o.$typeUrl === StreamOrderbookUpdatesResponse.typeUrl || Array.isArray(o.updates) && (!o.updates.length || OffChainUpdateV1.isSDK(o.updates[0])) && typeof o.snapshot === "boolean" && typeof o.block_height === "number" && typeof o.exec_mode === "number");
  },
  isAmino(o: any): o is StreamOrderbookUpdatesResponseAmino {
    return o && (o.$typeUrl === StreamOrderbookUpdatesResponse.typeUrl || Array.isArray(o.updates) && (!o.updates.length || OffChainUpdateV1.isAmino(o.updates[0])) && typeof o.snapshot === "boolean" && typeof o.block_height === "number" && typeof o.exec_mode === "number");
  },
  encode(message: StreamOrderbookUpdatesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.updates) {
      OffChainUpdateV1.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.snapshot === true) {
      writer.uint32(16).bool(message.snapshot);
    }
    if (message.blockHeight !== 0) {
      writer.uint32(24).uint32(message.blockHeight);
    }
    if (message.execMode !== 0) {
      writer.uint32(32).uint32(message.execMode);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): StreamOrderbookUpdatesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamOrderbookUpdatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.updates.push(OffChainUpdateV1.decode(reader, reader.uint32()));
          break;
        case 2:
          message.snapshot = reader.bool();
          break;
        case 3:
          message.blockHeight = reader.uint32();
          break;
        case 4:
          message.execMode = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<StreamOrderbookUpdatesResponse>): StreamOrderbookUpdatesResponse {
    const message = createBaseStreamOrderbookUpdatesResponse();
    message.updates = object.updates?.map(e => OffChainUpdateV1.fromPartial(e)) || [];
    message.snapshot = object.snapshot ?? false;
    message.blockHeight = object.blockHeight ?? 0;
    message.execMode = object.execMode ?? 0;
    return message;
  },
  fromAmino(object: StreamOrderbookUpdatesResponseAmino): StreamOrderbookUpdatesResponse {
    const message = createBaseStreamOrderbookUpdatesResponse();
    message.updates = object.updates?.map(e => OffChainUpdateV1.fromAmino(e)) || [];
    if (object.snapshot !== undefined && object.snapshot !== null) {
      message.snapshot = object.snapshot;
    }
    if (object.block_height !== undefined && object.block_height !== null) {
      message.blockHeight = object.block_height;
    }
    if (object.exec_mode !== undefined && object.exec_mode !== null) {
      message.execMode = object.exec_mode;
    }
    return message;
  },
  toAmino(message: StreamOrderbookUpdatesResponse): StreamOrderbookUpdatesResponseAmino {
    const obj: any = {};
    if (message.updates) {
      obj.updates = message.updates.map(e => e ? OffChainUpdateV1.toAmino(e) : undefined);
    } else {
      obj.updates = message.updates;
    }
    obj.snapshot = message.snapshot === false ? undefined : message.snapshot;
    obj.block_height = message.blockHeight === 0 ? undefined : message.blockHeight;
    obj.exec_mode = message.execMode === 0 ? undefined : message.execMode;
    return obj;
  },
  fromAminoMsg(object: StreamOrderbookUpdatesResponseAminoMsg): StreamOrderbookUpdatesResponse {
    return StreamOrderbookUpdatesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: StreamOrderbookUpdatesResponseProtoMsg): StreamOrderbookUpdatesResponse {
    return StreamOrderbookUpdatesResponse.decode(message.value);
  },
  toProto(message: StreamOrderbookUpdatesResponse): Uint8Array {
    return StreamOrderbookUpdatesResponse.encode(message).finish();
  },
  toProtoMsg(message: StreamOrderbookUpdatesResponse): StreamOrderbookUpdatesResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.StreamOrderbookUpdatesResponse",
      value: StreamOrderbookUpdatesResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(StreamOrderbookUpdatesResponse.typeUrl, StreamOrderbookUpdatesResponse);