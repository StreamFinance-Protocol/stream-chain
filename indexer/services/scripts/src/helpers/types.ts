import {
  IndexerTendermintBlock,
  IndexerTendermintEvent,
} from '@klyraprotocol-indexer/v4-protos';

export interface AnnotatedIndexerTendermintEvent
  extends IndexerTendermintEvent {
  data: string;
}

export interface AnnotatedIndexerTendermintBlock
  extends IndexerTendermintBlock {
  annotatedEvents: AnnotatedIndexerTendermintEvent[];
}

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
  COLLATERAL_POOL = 'collateral_pool',
  UPDATE_PERPETUAL = 'update_perpetual',
  UPDATE_CLOB_PAIR = 'update_clob_pair',
  DELEVERAGING = 'deleveraging',
}
