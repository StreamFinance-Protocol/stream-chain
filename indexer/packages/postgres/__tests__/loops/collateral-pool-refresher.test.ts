import {
  getCollateralPoolFromId,
  updateCollateralPools,
} from '../../src/loops/collateral-pool-refresher';
import { clearData, migrate, teardown } from '../../src/helpers/db-helpers';

import {
  defaultCollateralPool,
  defaultCollateralPool2,
} from '../helpers/constants';
import { seedData } from '../helpers/mock-generators';
import { CollateralPoolsCreateObject } from '../../src/types/collateral-pools-types';

describe('collateralPoolRefresher', () => {
  beforeAll(async () => {
    await migrate();
    await seedData();
    await updateCollateralPools();
  });

  afterAll(async () => {
    await clearData();
    await teardown();
  });

  describe('getCollateralPoolFromId', () => {
    it.each([[defaultCollateralPool], [defaultCollateralPool2]])(
      'successfully get a collateral pool from id',
      (collateralPool: CollateralPoolsCreateObject) => {
        const result = getCollateralPoolFromId(collateralPool.id);
        expect(result).toEqual({
          ...collateralPool,
          maxCumulativeInsuranceFundDeltaPerBlock:
            result.maxCumulativeInsuranceFundDeltaPerBlock.toString(),
          // Convert the array back to the expected format for comparison
          multiCollateralAssets: Array.isArray(result.multiCollateralAssets)
            ? result.multiCollateralAssets
            : JSON.parse(
                result.multiCollateralAssets.replace('{', '[').replace('}', ']')
              ),
        });
      }
    );

    it('throws error if CollateralPool does not exist', () => {
      expect(() => getCollateralPoolFromId(50)).toThrowError(
        'Unable to find collateral pool with id: 50'
      );
    });
  });
});
