import {
  CollateralPoolsTable,
  dbHelpers,
  testConstants,
  testMocks,
} from '@klyraprotocol-indexer/postgres';
import {
  CollateralPoolsResponseObject,
  RequestMethod,
} from '../../../../src/types';
import request from 'supertest';
import { sendRequest } from '../../../helpers/helpers';

describe('collateral-pools-controller#V4', () => {
  beforeAll(async () => {
    await dbHelpers.migrate();
  });

  afterAll(async () => {
    await dbHelpers.teardown();
  });

  describe('GET', () => {
    afterEach(async () => {
      await dbHelpers.clearData();
    });

    it('Get /collateralPools returns all collateral pools when no id is specified', async () => {
      await testMocks.seedData();

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path: `/v4/collateralPools`,
      });

      const expectedCollateralPools1: CollateralPoolsResponseObject = {
        id: testConstants.defaultCollateralPool.id.toString(),
        maxCumulativeInsuranceFundDeltaPerBlock:
          testConstants.defaultCollateralPool.maxCumulativeInsuranceFundDeltaPerBlock.toString(),
        multiCollateralAssets:
          testConstants.defaultCollateralPool.multiCollateralAssets
            .replace('{', '')
            .replace('}', '')
            .split(',')
            .map(Number),
        quoteAssetId:
          testConstants.defaultCollateralPool.quoteAssetId.toString(),
      };

      const expectedCollateralPools2: CollateralPoolsResponseObject = {
        id: testConstants.defaultCollateralPool2.id.toString(),
        maxCumulativeInsuranceFundDeltaPerBlock:
          testConstants.defaultCollateralPool2.maxCumulativeInsuranceFundDeltaPerBlock.toString(),
        multiCollateralAssets:
          testConstants.defaultCollateralPool2.multiCollateralAssets
            .replace('{', '')
            .replace('}', '')
            .split(',')
            .map(Number),
        quoteAssetId:
          testConstants.defaultCollateralPool2.quoteAssetId.toString(),
      };
      expect(response.body.collateralPools).toHaveLength(2);
      expect(response.body.collateralPools).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedCollateralPools1,
          }),
          expect.objectContaining({
            ...expectedCollateralPools2,
          }),
        ])
      );
    });

    it('Get /colletalPools returns collateral pool for a specific id', async () => {
      await testMocks.seedData();

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path: `/v4/collateralPools?id=${1}`,
      });

      const expectedCollateralPool: CollateralPoolsResponseObject = {
        id: testConstants.defaultCollateralPool2.id.toString(),
        maxCumulativeInsuranceFundDeltaPerBlock:
          testConstants.defaultCollateralPool2.maxCumulativeInsuranceFundDeltaPerBlock.toString(),
        multiCollateralAssets:
          testConstants.defaultCollateralPool2.multiCollateralAssets
            .replace('{', '')
            .replace('}', '')
            .split(',')
            .map(Number),
        quoteAssetId:
          testConstants.defaultCollateralPool2.quoteAssetId.toString(),
      };

      expect(response.body.collateralPools).toHaveLength(1);
      expect(response.body.collateralPools).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedCollateralPool,
          }),
        ])
      );
    });

    it('Get /collateralPools throws error when no rows found', async () => {
      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path: '/v4/collateralPools',
        expectedStatus: 200,
      });

      expect(response.body.collateralPools).toHaveLength(0);
    });

    it('Get /collateralPools throws error when no collat pool found with that id ', async () => {
      await testMocks.seedData();
      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path: `/v4/collateralPools?id=${3}`,
        expectedStatus: 404,
      });

      const expectedErrorMsg: string = 'No collateral pool found with id: 3';

      expect(response.body).toEqual(
        expect.objectContaining({
          errors: expect.arrayContaining([
            expect.objectContaining({
              msg: expectedErrorMsg,
            }),
          ]),
        })
      );
    });
  });
});
