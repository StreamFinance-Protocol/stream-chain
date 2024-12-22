import { NodeEnv, logger, stats } from '@klyraprotocol-indexer/base';

import config from '../config';
import * as CollateralPoolsTable from '../stores/collateral-pools-table';
import {
  CollateralPoolFromDatabase,
  CollateralPoolsMap,
  Options,
} from '../types';
import { startUpdateLoop } from './loopHelper';

let idToCollateralPool: CollateralPoolsMap = {};

/**
 * Refresh loop to cache the list of all collateral pools from the database in-memory.
 */
export async function start(): Promise<void> {
  await startUpdateLoop(
    updateCollateralPools,
    config.COLLATERAL_POOLS_REFRESHER_INTERVAL_MS,
    'updateCollateralPools'
  );
}

/**
 * Updates in-memory map of collateral pools.
 */
export async function updateCollateralPools(options?: Options): Promise<void> {
  const startTime: number = Date.now();
  const collateralPools: CollateralPoolFromDatabase[] =
    await CollateralPoolsTable.findAll(
      {},
      [],
      options || { readReplica: true }
    );

  const tmpIdToCollateralPool: Record<string, CollateralPoolFromDatabase> = {};
  collateralPools.forEach((collateralPool: CollateralPoolFromDatabase) => {
    tmpIdToCollateralPool[collateralPool.id] = collateralPool;
  });

  idToCollateralPool = tmpIdToCollateralPool;
  stats.timing(
    `${config.SERVICE_NAME}.loops.update_collateral_pools`,
    Date.now() - startTime
  );
}

export function getCollateralPoolsList(): CollateralPoolFromDatabase[] {
  return Object.values(idToCollateralPool);
}

/**
 * Gets the collateral pool for a given id.
 */
export function getCollateralPoolFromId(
  id: number
): CollateralPoolFromDatabase {
  const collateralPool: CollateralPoolFromDatabase | undefined =
    idToCollateralPool[id];
  if (collateralPool === undefined) {
    const message: string = `Unable to find collateral pool with id: ${id}`;
    logger.error({
      at: 'collateral-pool-refresher#getCollateralPoolFromId',
      message,
    });
    throw new Error(message);
  }
  return collateralPool;
}

export function getCollateralPoolsMap(): CollateralPoolsMap {
  return idToCollateralPool;
}

export function upsertCollateralPool(
  collateralPool: CollateralPoolFromDatabase
): void {
  idToCollateralPool[collateralPool.id] = collateralPool;
}

/**
 * Clears the in-memory map of collateral pool ids to collateral pools.
 * Used for testing.
 */
export function clear(): void {
  if (config.NODE_ENV !== NodeEnv.TEST) {
    throw new Error('clear cannot be used in non-test env');
  }
  idToCollateralPool = {};
}
