import { KafkaTopics } from '@klyraprotocol-indexer/kafka';
import {
  Liquidity,
  PerpetualPositionColumns,
  PerpetualPositionFromDatabase,
  SubaccountMessageContents,
} from '@klyraprotocol-indexer/postgres';
import {
  StatefulOrderEventV1,
  IndexerTendermintEvent,
  CandleMessage,
  LiquidationOrderV1,
  MarketCreateEventV1,
  MarketEventV1,
  MarketMessage,
  MarketModifyEventV1,
  MarketPriceUpdateEventV1,
  IndexerOrder,
  OrderFillEventV1,
  SubaccountMessage,
  SubaccountUpdateEventV1,
  TradeMessage,
  TransferEventV1,
  OffChainUpdateV1,
  FundingEventV1_Type,
  FundingEventV1,
  FundingUpdateV1,
  AssetCreateEventV1,
  PerpetualMarketCreateEventV1,
  PerpetualMarketCreateEventV2,
  LiquidityTierUpsertEventV1,
  LiquidityTierUpsertEventV2,
  UpdatePerpetualEventV1,
  UpdateClobPairEventV1,
  DeleveragingEventV1,
  OpenInterestUpdateEventV1,
  UpdateYieldParamsEventV1,
} from '@klyraprotocol-indexer/v4-protos';
import { IHeaders } from 'kafkajs';
import Long from 'long';

export enum KlyraIndexerSubtypes {
  ORDER_FILL = 'order_fill',
  SUBACCOUNT_UPDATE = 'subaccount_update',
  TRANSFER = 'transfer',
  MARKET = 'market',
  STATEFUL_ORDER = 'stateful_order',
  FUNDING = 'funding_values',
  ASSET = 'asset',
  PERPETUAL_MARKET = 'perpetual_market',
  LIQUIDITY_TIER = 'liquidity_tier',
  UPDATE_PERPETUAL = 'update_perpetual',
  UPDATE_CLOB_PAIR = 'update_clob_pair',
  DELEVERAGING = 'deleveraging',
  OPEN_INTEREST_UPDATE = 'open_interest_update',
  YIELD_PARAMS = 'yield_params',
}

// Generic interface used for creating the Handler objects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventMessage = any;

export type EventProtoWithTypeAndVersion = {
  type: string,
  eventProto: EventMessage,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} & ({
  type: KlyraIndexerSubtypes.ORDER_FILL,
  eventProto: OrderFillEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.SUBACCOUNT_UPDATE,
  eventProto: SubaccountUpdateEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.TRANSFER,
  eventProto: TransferEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.MARKET,
  eventProto: MarketEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.STATEFUL_ORDER,
  eventProto: StatefulOrderEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.FUNDING,
  eventProto: FundingEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.ASSET,
  eventProto: AssetCreateEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.PERPETUAL_MARKET,
  eventProto: PerpetualMarketCreateEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.PERPETUAL_MARKET,
  eventProto: PerpetualMarketCreateEventV2,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.LIQUIDITY_TIER,
  eventProto: LiquidityTierUpsertEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.LIQUIDITY_TIER,
  eventProto: LiquidityTierUpsertEventV2,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.UPDATE_PERPETUAL,
  eventProto: UpdatePerpetualEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.UPDATE_CLOB_PAIR,
  eventProto: UpdateClobPairEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.DELEVERAGING,
  eventProto: DeleveragingEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.OPEN_INTEREST_UPDATE,
  eventProto: OpenInterestUpdateEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
} | {
  type: KlyraIndexerSubtypes.YIELD_PARAMS,
  eventProto: UpdateYieldParamsEventV1,
  indexerTendermintEvent: IndexerTendermintEvent,
  version: number,
  blockEventIndex: number,
});

// Events grouped into events block events and events for each transactionIndex
export interface GroupedEvents {
  transactionEvents: EventProtoWithTypeAndVersion[][],
  blockEvents: EventProtoWithTypeAndVersion[],
}

export type MarketPriceUpdateEventMessage = {
  marketId: number,
  priceUpdate: MarketPriceUpdateEventV1,
};

export type MarketCreateEventMessage = {
  marketId: number,
  marketCreate: MarketCreateEventV1,
};

export type MarketModifyEventMessage = {
  marketId: number,
  marketModify: MarketModifyEventV1,
};

export type OrderFillEventWithOrder = {
  makerOrder: IndexerOrder,
  order: IndexerOrder,
  fillAmount: Long,
  totalFilledMaker: Long,
  totalFilledTaker: Long,
  makerFee: Long,
  takerFee: Long,
};

export type OrderFillEventWithLiquidation = {
  makerOrder: IndexerOrder,
  liquidationOrder: LiquidationOrderV1,
  fillAmount: Long,
  totalFilledMaker: Long,
  totalFilledTaker: Long,
  makerFee: Long,
  takerFee: Long,
};

export type FundingEventMessage = {
  type: FundingEventV1_Type.TYPE_FUNDING_RATE_AND_INDEX | FundingEventV1_Type.TYPE_PREMIUM_SAMPLE,
  updates: FundingUpdateV1[],
};

export type SumFields = PerpetualPositionColumns.sumOpen | PerpetualPositionColumns.sumClose;
export type PriceFields = PerpetualPositionColumns.entryPrice |
PerpetualPositionColumns.exitPrice;

export type OrderFillEventWithLiquidity = {
  event: OrderFillEventV1,
  liquidity: Liquidity,
};

export interface PositionWithPnl extends PerpetualPositionFromDatabase {
  realizedPnl?: string,
  unrealizedPnl?: string,
}

export interface SingleTradeMessage extends TradeMessage {
  transactionIndex: number,
  eventIndex: number,
}

export interface AnnotatedSubaccountMessage extends SubaccountMessage {
  orderId?: string,
  isFill?: boolean,
  subaccountMessageContents?: SubaccountMessageContents,
}

export interface VulcanMessage {
  key: Buffer,
  value: OffChainUpdateV1,
  headers?: IHeaders,
}

export type ConsolidatedKafkaEvent = {
  topic: KafkaTopics.TO_WEBSOCKETS_SUBACCOUNTS,
  message: AnnotatedSubaccountMessage,
} | {
  topic: KafkaTopics.TO_WEBSOCKETS_TRADES,
  message: SingleTradeMessage,
} | {
  topic: KafkaTopics.TO_WEBSOCKETS_MARKETS,
  message: MarketMessage,
} | {
  topic: KafkaTopics.TO_WEBSOCKETS_CANDLES,
  message: CandleMessage,
} | {
  topic: KafkaTopics.TO_VULCAN,
  message: VulcanMessage,
};

export enum TransferEventType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
}
