import {
  CollateralPoolFromDatabase,
  CollateralPoolsModel,
  collateralPoolRefresher,
} from '@klyraprotocol-indexer/postgres';
import { CollateralPoolUpsertEvent } from '@klyraprotocol-indexer/v4-protos';
import * as pg from 'pg';

import { Handler } from './handler';
import { generateCollateralPoolMessage } from '../helpers/kafka-helper';
import { ConsolidatedKafkaEvent } from '../lib/types';

export class CollateralPoolCreationHandler extends Handler<CollateralPoolUpsertEvent> {
  eventType: string = 'CollateralPoolUpsertEvent';

  public getParallelizationIds(): string[] {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async internalHandle(
    resultRow: pg.QueryResultRow
  ): Promise<ConsolidatedKafkaEvent[]> {
    const collateralPool: CollateralPoolFromDatabase =
      CollateralPoolsModel.fromJson(
        resultRow.collateral_pool
      ) as CollateralPoolFromDatabase;

    collateralPoolRefresher.upsertCollateralPool(collateralPool);
    return [
      this.generateConsolidatedMarketKafkaEvent(
        JSON.stringify(generateCollateralPoolMessage([collateralPool]))
      ),
    ];
  }
}
