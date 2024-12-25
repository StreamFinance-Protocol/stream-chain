import { CollateralPoolFromDatabase } from '../../src/types';
import { clearData, migrate, teardown } from '../../src/helpers/db-helpers';
import { UniqueViolationError } from 'objection';
import {
  defaultCollateralPool,
  defaultCollateralPool2,
} from '../helpers/constants';
import * as CollateralPoolTable from '../../src/stores/collateral-pools-table';

describe('CollateralPool store', () => {
  beforeAll(async () => {
    await migrate();
  });

  afterEach(async () => {
    await clearData();
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await teardown();
    jest.clearAllMocks();
  });

  it('Successfully creates a collateral pool', async () => {
    await CollateralPoolTable.create(defaultCollateralPool);
  });

  it('Fails to create second collateral pool with the same ID', async () => {
    try {
      await Promise.all([
        CollateralPoolTable.create(defaultCollateralPool),
        CollateralPoolTable.create(defaultCollateralPool),
      ]);
    } catch (e) {
      expect(e).toBeInstanceOf(UniqueViolationError);
    }
  });

  it('Successfully finds all collateral pools', async () => {
    await Promise.all([
      CollateralPoolTable.create(defaultCollateralPool),
      CollateralPoolTable.create(defaultCollateralPool2),
    ]);

    const collateralPools: CollateralPoolFromDatabase[] = await CollateralPoolTable.findAll(
      {},
      [],
      { readReplica: true },
    );

    expect(collateralPools.length).toEqual(2);
    expect(normalizeCollateralPool(collateralPools[0])).toEqual(
      normalizeCollateralPool(defaultCollateralPool),
    );
    expect(normalizeCollateralPool(collateralPools[1])).toEqual(
      normalizeCollateralPool(defaultCollateralPool2),
    );
  });

  it('Successfully finds a collateral pool', async () => {
    await CollateralPoolTable.create(defaultCollateralPool);

    const collateralPool = await CollateralPoolTable.findById(defaultCollateralPool.id);

    expect(collateralPool).toEqual(
      normalizeCollateralPool(defaultCollateralPool),
    );
  });

  it('Successfully updates a collateralPool', async () => {
    await CollateralPoolTable.create(defaultCollateralPool);

    const collateralPool = await CollateralPoolTable.update({
      id: defaultCollateralPool.id,
      maxCumulativeInsuranceFundDeltaPerBlock: 2000000,
    });

    expect(collateralPool).toEqual(
      normalizeCollateralPool({
        ...defaultCollateralPool,
        maxCumulativeInsuranceFundDeltaPerBlock: 2000000,
      }),
    );
  });

  it('Unable to find a collateral pool', async () => {
    const collateralPool = await CollateralPoolTable.findById(defaultCollateralPool.id);
    expect(collateralPool).toEqual(undefined);
  });

  it('Successfully upserts an existing collateralPool', async () => {
    await CollateralPoolTable.create(defaultCollateralPool);

    const collateralPool = await CollateralPoolTable.upsert({
      ...defaultCollateralPool,
      maxCumulativeInsuranceFundDeltaPerBlock: 2000000,
    });

    expect(collateralPool).toEqual(
      normalizeCollateralPool({
        ...defaultCollateralPool,
        maxCumulativeInsuranceFundDeltaPerBlock: 2000000,
      }),
    );
  });

  it('Successfully upserts a collateral pool', async () => {
    const collateralPool = await CollateralPoolTable.upsert(defaultCollateralPool);

    expect(collateralPool).toEqual(
      normalizeCollateralPool(defaultCollateralPool),
    );
  });
});

function normalizeCollateralPool(pool: CollateralPoolFromDatabase) {
  return {
    ...pool,
    maxCumulativeInsuranceFundDeltaPerBlock:
      pool.maxCumulativeInsuranceFundDeltaPerBlock.toString(),
    multiCollateralAssets: Array.isArray(pool.multiCollateralAssets)
      ? pool.multiCollateralAssets
      : JSON.parse(
        pool.multiCollateralAssets.replace('{', '[').replace('}', ']'),
      ),
  };
}
