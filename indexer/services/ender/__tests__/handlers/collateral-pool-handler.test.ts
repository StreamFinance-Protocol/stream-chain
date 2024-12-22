import {
  CollateralPoolCreateEvent,
  IndexerTendermintBlock,
  IndexerTendermintEvent,
  Timestamp,
} from '@klyraprotocol-indexer/v4-protos';
import {
  BlockTable,
  dbHelpers,
  Ordering,
  TendermintEventTable,
  testConstants,
  collateralPoolRefresher,
  CollateralPoolFromDatabase,
  CollateralPoolsTable,
  CollateralPoolsColumns,
} from '@klyraprotocol-indexer/postgres';
import { KafkaMessage } from 'kafkajs';
import { createKafkaMessage, producer } from '@klyraprotocol-indexer/kafka';
import { onMessage } from '../../src/lib/on-message';
import { KlyraIndexerSubtypes } from '../../src/lib/types';
import {
  createIndexerTendermintBlock,
  createIndexerTendermintEvent,
  expectCollateralPoolKafkaMessage,
} from '../helpers/indexer-proto-helpers';

import {
  defaultHeight,
  defaultPreviousHeight,
  defaultTime,
  defaultTxHash,
  defaultCreateCollateralPoolEvent,
} from '../helpers/constants';
import { updateBlockCache } from '../../src/caches/block-cache';
import _ from 'lodash';
import { createPostgresFunctions } from '../../src/helpers/postgres/postgres-functions';
import { CollateralPoolCreationHandler } from '../../src/handlers/collateral-pool-handler';

describe('collateralPoolHandler', () => {
  beforeAll(async () => {
    await dbHelpers.migrate();
    await createPostgresFunctions();
  });

  beforeEach(async () => {
    await Promise.all([
      BlockTable.create(testConstants.defaultBlock),
      BlockTable.create(testConstants.defaultBlock2),
    ]);
    await Promise.all([
      TendermintEventTable.create(testConstants.defaultTendermintEvent),
      TendermintEventTable.create(testConstants.defaultTendermintEvent2),
      TendermintEventTable.create(testConstants.defaultTendermintEvent3),
    ]);
    updateBlockCache(defaultPreviousHeight);
  });

  afterEach(async () => {
    await dbHelpers.clearData();
    jest.clearAllMocks();
    collateralPoolRefresher.clear();
  });

  afterAll(async () => {
    await dbHelpers.teardown();
    jest.resetAllMocks();
  });

  describe('collateralPoolHandlerV1', () => {
    describe('getParallelizationIds', () => {
      it('returns the correct parallelization ids', () => {
        const transactionIndex: number = 0;
        const eventIndex: number = 0;

        const indexerTendermintEvent: IndexerTendermintEvent =
          createIndexerTendermintEvent(
            KlyraIndexerSubtypes.COLLATERAL_POOL,
            CollateralPoolCreateEvent.encode(
              defaultCreateCollateralPoolEvent
            ).finish(),
            transactionIndex,
            eventIndex
          );
        const block: IndexerTendermintBlock = createIndexerTendermintBlock(
          0,
          defaultTime,
          [indexerTendermintEvent],
          [defaultTxHash]
        );

        const handler: CollateralPoolCreationHandler =
          new CollateralPoolCreationHandler(
            block,
            0,
            indexerTendermintEvent,
            0,
            defaultCreateCollateralPoolEvent
          );

        expect(handler.getParallelizationIds()).toEqual([]);
      });
    });

    it('creates new collateral pool', async () => {
      const transactionIndex: number = 0;
      const collateralPoolEvent: CollateralPoolCreateEvent =
        defaultCreateCollateralPoolEvent;
      const kafkaMessage: KafkaMessage =
        createKafkaMessageFromCollateralPoolCreateEvent({
          collateralPoolEvent:
            CollateralPoolCreateEvent.encode(collateralPoolEvent).finish(),
          transactionIndex,
          height: defaultHeight,
          time: defaultTime,
          txHash: defaultTxHash,
          version: 1,
        });
      // Confirm there is no existing liquidity tier
      await expectNoExistingCollateralPools();

      const producerSendMock: jest.SpyInstance = jest.spyOn(producer, 'send');
      await onMessage(kafkaMessage);

      const newCollateralPools: CollateralPoolFromDatabase[] =
        await CollateralPoolsTable.findAll({}, [], {
          orderBy: [[CollateralPoolsColumns.id, Ordering.ASC]],
        });
      expect(newCollateralPools.length).toEqual(1);
      expectCollateralPool(newCollateralPools[0], collateralPoolEvent);
      validateCollateralPoolRefresher(defaultCreateCollateralPoolEvent);
      expectKafkaMessages(producerSendMock, collateralPoolEvent, 0);
    });
  });
});

export function expectCollateralPool(
  collateralPoolFromDb: CollateralPoolFromDatabase,
  event: any
): void {
  expect(collateralPoolFromDb.id).toEqual(event.id);
  expect(collateralPoolFromDb.maxCumulativeInsuranceFundDeltaPerBlock).toEqual(
    event.maxCumulativeInsuranceFundDeltaPerBlock
  );
  expect(collateralPoolFromDb.quoteAssetId).toEqual(event.quoteAssetId);
  // Convert multiCollateralAssets for comparison
  expect(
    Array.isArray(collateralPoolFromDb.multiCollateralAssets)
      ? collateralPoolFromDb.multiCollateralAssets
      : JSON.parse(
          collateralPoolFromDb.multiCollateralAssets
            .replace('{', '[')
            .replace('}', ']')
        )
  ).toEqual(event.multiCollateralAssets);
}

function createKafkaMessageFromCollateralPoolCreateEvent({
  collateralPoolEvent,
  transactionIndex,
  height,
  time,
  txHash,
  version,
}: {
  collateralPoolEvent: Uint8Array;
  transactionIndex: number;
  height: number;
  time: Timestamp;
  txHash: string;
  version: number;
}) {
  const events: IndexerTendermintEvent[] = [];
  events.push(
    createIndexerTendermintEvent(
      KlyraIndexerSubtypes.COLLATERAL_POOL,
      collateralPoolEvent,
      transactionIndex,
      0,
      version
    )
  );

  const block: IndexerTendermintBlock = createIndexerTendermintBlock(
    height,
    time,
    events,
    [txHash]
  );

  const binaryBlock: Uint8Array = IndexerTendermintBlock.encode(block).finish();
  return createKafkaMessage(Buffer.from(binaryBlock));
}

async function expectNoExistingCollateralPools() {
  // Confirm there is no existing liquidity tier
  const collateralPools: CollateralPoolFromDatabase[] =
    await CollateralPoolsTable.findAll({}, [], {
      orderBy: [[CollateralPoolsColumns.id, Ordering.ASC]],
    });

  expect(collateralPools.length).toEqual(0);
}

function validateCollateralPoolRefresher(
  collateralPoolEvent: CollateralPoolCreateEvent
) {
  const collateralPool: CollateralPoolFromDatabase =
    collateralPoolRefresher.getCollateralPoolFromId(collateralPoolEvent.id);

  expect(collateralPool.id).toEqual(collateralPoolEvent.id);
  expect(collateralPool.maxCumulativeInsuranceFundDeltaPerBlock).toEqual(
    collateralPoolEvent.maxCumulativeInsuranceFundDeltaPerBlock
  );
  expect(collateralPool.quoteAssetId).toEqual(collateralPoolEvent.quoteAssetId);
  // Convert multiCollateralAssets for comparison
  expect(
    Array.isArray(collateralPool.multiCollateralAssets)
      ? collateralPool.multiCollateralAssets
      : JSON.parse(
          collateralPool.multiCollateralAssets
            .replace('{', '[')
            .replace('}', ']')
        )
  ).toEqual(collateralPoolEvent.multiCollateralAssets);
}

function expectKafkaMessages(
  producerSendMock: jest.SpyInstance,
  collateralPool: any,
  numCollateralPools: number
) {
  const collateralPools: CollateralPoolFromDatabase[] = _.filter(
    collateralPoolRefresher.getCollateralPoolsList(),
    (collatPool: CollateralPoolFromDatabase) => {
      return collatPool.id === collateralPool.id;
    }
  );
  expect(collateralPools.length).toEqual(numCollateralPools);

  if (collateralPools.length === 0) {
    return;
  }
  expectCollateralPoolKafkaMessage(producerSendMock, collateralPools);
}
