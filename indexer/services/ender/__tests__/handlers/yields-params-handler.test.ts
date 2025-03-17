import {
  YieldsParamsColumns,
  YieldsParamsFromDatabase,
  YieldsParamsTable,
  dbHelpers,
  Ordering,
  liquidityTierRefresher,
  perpetualMarketRefresher,
  testMocks,
} from '@klyraprotocol-indexer/postgres';
import { updateBlockCache } from '../../src/caches/block-cache';
import {
  defaultHeight,
  defaultPreviousHeight,
  defaultTime,
  defaultTxHash,
  defaultUpdateYieldsParamsEvent1,
} from '../helpers/constants';
import {
  IndexerTendermintBlock,
  IndexerTendermintEvent,
  Timestamp,
  UpdateYieldsParamsEventV1,
} from '@klyraprotocol-indexer/v4-protos';
import {
  createIndexerTendermintBlock,
  createIndexerTendermintEvent,
} from '../helpers/indexer-proto-helpers';
import { KlyraIndexerSubtypes } from '../../src/lib/types';
import { createKafkaMessage } from '@klyraprotocol-indexer/kafka';
import { KafkaMessage } from 'kafkajs';
import { onMessage } from '../../src/lib/on-message';
import { createPostgresFunctions } from '../../src/helpers/postgres/postgres-functions';
import { YieldsParamsHandler } from '../../src/handlers/yields-params-handler';

describe('yields-params-handler', () => {
  beforeAll(async () => {
    await dbHelpers.migrate();
    await createPostgresFunctions();
  });

  beforeEach(async () => {
    await testMocks.seedData();
    updateBlockCache(defaultPreviousHeight);
    await perpetualMarketRefresher.updatePerpetualMarkets();
    await liquidityTierRefresher.updateLiquidityTiers();
  });

  afterEach(async () => {
    await dbHelpers.clearData();
    jest.clearAllMocks();
    perpetualMarketRefresher.clear();
    liquidityTierRefresher.clear();
  });

  afterAll(async () => {
    await dbHelpers.teardown();
    jest.resetAllMocks();
  });

  describe('getParallelizationIds', () => {
    it('returns the correct parallelization ids', () => {
      const transactionIndex: number = 0;
      const eventIndex: number = 0;

      const indexerTendermintEvent: IndexerTendermintEvent = createIndexerTendermintEvent(
        KlyraIndexerSubtypes.YIELDS_PARAMS,
        UpdateYieldsParamsEventV1.encode(defaultUpdateYieldsParamsEvent1).finish(),
        transactionIndex,
        eventIndex,
      );
      const block: IndexerTendermintBlock = createIndexerTendermintBlock(
        0,
        defaultTime,
        [indexerTendermintEvent],
        [defaultTxHash],
      );

      const handler: YieldsParamsHandler = new YieldsParamsHandler(
        block,
        0,
        indexerTendermintEvent,
        0,
        defaultUpdateYieldsParamsEvent1,
      );

      expect(handler.getParallelizationIds()).toEqual([]);
    });
  });

  it('successfully creates yields params', async () => {
    const transactionIndex: number = 0;

    const kafkaMessage: KafkaMessage = createKafkaMessageFromYieldsParamsEvent({
      yieldsParamsEvent: defaultUpdateYieldsParamsEvent1,
      transactionIndex,
      height: defaultHeight,
      time: defaultTime,
      txHash: defaultTxHash,
    });

    await expectNoExistingYieldsParams();

    await onMessage(kafkaMessage);

    const newYieldsParams: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
      {},
      [], {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      });
    expect(newYieldsParams.length).toEqual(1);
    expectYieldsParamsMatchEvent(defaultUpdateYieldsParamsEvent1, newYieldsParams[0]);
    expectYieldsParamsMatchBlock(defaultHeight, defaultTime, newYieldsParams[0]);
  });
});

function createKafkaMessageFromYieldsParamsEvent({
  yieldsParamsEvent,
  transactionIndex,
  height,
  time,
  txHash,
}: {
  yieldsParamsEvent: UpdateYieldsParamsEventV1,
  transactionIndex: number,
  height: number,
  time: Timestamp,
  txHash: string,
}) {
  const events: IndexerTendermintEvent[] = [];
  events.push(
    createIndexerTendermintEvent(
      KlyraIndexerSubtypes.YIELDS_PARAMS,
      UpdateYieldsParamsEventV1.encode(yieldsParamsEvent).finish(),
      transactionIndex,
      0,
    ),
  );

  const block: IndexerTendermintBlock = createIndexerTendermintBlock(
    height,
    time,
    events,
    [txHash],
  );

  const binaryBlock: Uint8Array = IndexerTendermintBlock.encode(block).finish();
  return createKafkaMessage(Buffer.from(binaryBlock));
}

async function expectNoExistingYieldsParams() {
  // Confirm there is no existing asset
  const assets: YieldsParamsFromDatabase[] = await YieldsParamsTable.findAll(
    {},
    [], {
      orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
    });

  expect(assets.length).toEqual(0);
}

function expectYieldsParamsMatchEvent(
  event: UpdateYieldsParamsEventV1,
  yieldsParams: YieldsParamsFromDatabase,
) {
  expect(yieldsParams.assetYieldsIndex).toEqual(event.assetYieldsIndex);
  expect(yieldsParams.sDAIPrice).toEqual(event.sdaiPrice);
}

function expectYieldsParamsMatchBlock(
  height: number,
  time: Timestamp,
  yieldsParams: YieldsParamsFromDatabase,
) {
  expect(yieldsParams.createdAtHeight).toEqual(height.toString());
  const date = new Date(time.seconds.low * 1000);
  date.setMilliseconds(date.getMilliseconds() + Math.floor(time.nanos / 1e6));
  const isoString = date.toISOString();
  expect(yieldsParams.createdAt).toEqual(isoString);
  expect(yieldsParams.id).toEqual(YieldsParamsTable.uuid(height.toString()));
}
