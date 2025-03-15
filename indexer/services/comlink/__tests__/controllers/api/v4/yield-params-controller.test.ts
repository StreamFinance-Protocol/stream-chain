import {
  dbHelpers,
  testConstants,
  testMocks,
  YieldsParamsTable,
} from '@klyraprotocol-indexer/postgres';
import { RequestMethod, YieldsParamsResponseObject } from '../../../../src/types';
import request from 'supertest';
import { sendRequest } from '../../../helpers/helpers';

describe('yields-params-controller#V4', () => {
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

    it('Get /yieldsParams returns yieldsParams when there are no yields params', async () => {
      await testMocks.seedData();

      const height: string = '5';

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path: `/v4/yieldsParams?createdAtOrBeforeHeight=${height}`,
      });

      expect(response.body.allYieldsParams).toHaveLength(0);
    });

    it('Get /yieldsParams returns all yieldsParams when no height specified', async () => {
      await testMocks.seedData();

      await Promise.all([
        YieldsParamsTable.create(testConstants.defaultYieldsParams1),
        YieldsParamsTable.create(testConstants.defaultYieldsParams2),
      ]);

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path: '/v4/yieldsParams?createdAtOrBeforeHeight',
      });

      const expectedYieldsParamsResponse1: YieldsParamsResponseObject = {
        id: YieldsParamsTable.uuid(testConstants.defaultYieldsParams1.createdAtHeight),
        sDAIPrice: testConstants.defaultYieldsParams1.sDAIPrice,
        assetYieldsIndex: testConstants.defaultYieldsParams1.assetYieldsIndex,
        createdAt: testConstants.defaultYieldsParams1.createdAt,
        createdAtHeight: testConstants.defaultYieldsParams1.createdAtHeight,
      };

      const expectedYieldsParamsResponse2: YieldsParamsResponseObject = {
        id: YieldsParamsTable.uuid(testConstants.defaultYieldsParams2.createdAtHeight),
        sDAIPrice: testConstants.defaultYieldsParams2.sDAIPrice,
        assetYieldsIndex: testConstants.defaultYieldsParams2.assetYieldsIndex,
        createdAt: testConstants.defaultYieldsParams2.createdAt,
        createdAtHeight: testConstants.defaultYieldsParams2.createdAtHeight,
      };

      expect(response.body.allYieldsParams).toHaveLength(2);
      expect(response.body.allYieldsParams).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedYieldsParamsResponse1,
          }),
          expect.objectContaining({
            ...expectedYieldsParamsResponse2,
          }),
        ]),
      );
    });

    it('Get /yieldsParams returns yieldsParams at or before height for one row', async () => {
      await testMocks.seedData();

      await Promise.all([
        YieldsParamsTable.create(testConstants.defaultYieldsParams1),
        YieldsParamsTable.create(testConstants.defaultYieldsParams2),
      ]);

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path: `/v4/yieldsParams?createdAtOrBeforeHeight=${testConstants.defaultYieldsParams1.createdAtHeight}`,
      });

      const expectedYieldsParamsResponse: YieldsParamsResponseObject = {
        id: YieldsParamsTable.uuid(testConstants.defaultYieldsParams1.createdAtHeight),
        sDAIPrice: testConstants.defaultYieldsParams1.sDAIPrice,
        assetYieldsIndex: testConstants.defaultYieldsParams1.assetYieldsIndex,
        createdAt: testConstants.defaultYieldsParams1.createdAt,
        createdAtHeight: testConstants.defaultYieldsParams1.createdAtHeight,
      };

      expect(response.body.allYieldsParams).toHaveLength(1);
      expect(response.body.allYieldsParams).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedYieldsParamsResponse,
          }),
        ]),
      );
    });

    it('Get /yieldsParams returns yieldsParams at or before height for two rows', async () => {
      await testMocks.seedData();

      await Promise.all([
        YieldsParamsTable.create(testConstants.defaultYieldsParams1),
        YieldsParamsTable.create(testConstants.defaultYieldsParams2),
      ]);

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path: `/v4/yieldsParams?createdAtOrBeforeHeight=${testConstants.defaultYieldsParams2.createdAtHeight}`,
      });

      const expectedYieldsParamsResponse1: YieldsParamsResponseObject = {
        id: YieldsParamsTable.uuid(testConstants.defaultYieldsParams1.createdAtHeight),
        sDAIPrice: testConstants.defaultYieldsParams1.sDAIPrice,
        assetYieldsIndex: testConstants.defaultYieldsParams1.assetYieldsIndex,
        createdAt: testConstants.defaultYieldsParams1.createdAt,
        createdAtHeight: testConstants.defaultYieldsParams1.createdAtHeight,
      };

      const expectedYieldsParamsResponse2: YieldsParamsResponseObject = {
        id: YieldsParamsTable.uuid(testConstants.defaultYieldsParams2.createdAtHeight),
        sDAIPrice: testConstants.defaultYieldsParams2.sDAIPrice,
        assetYieldsIndex: testConstants.defaultYieldsParams2.assetYieldsIndex,
        createdAt: testConstants.defaultYieldsParams2.createdAt,
        createdAtHeight: testConstants.defaultYieldsParams2.createdAtHeight,
      };

      expect(response.body.allYieldsParams).toHaveLength(2);
      expect(response.body.allYieldsParams).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedYieldsParamsResponse1,
          }),
          expect.objectContaining({
            ...expectedYieldsParamsResponse2,
          }),
        ]),
      );
    });

    it('Get /yieldsParams/latestYieldsParams throws error when no rows found', async () => {
      await testMocks.seedData();
      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path: '/v4/yieldsParams/latestYieldsParams',
        expectedStatus: 500,
      });

      const expectedErrorMsg: string = 'Internal Server Error';

      expect(response.body).toEqual(expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({
            msg: expectedErrorMsg,
          }),
        ]),
      }));
    });

    it('Get /yieldsParams/latestYieldsParams returns yieldsParams succesfully gets latest yields params when one row is in DB', async () => {
      await testMocks.seedData();

      await Promise.all([
        YieldsParamsTable.create(testConstants.defaultYieldsParams1),
      ]);

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path: '/v4/yieldsParams/latestYieldsParams',
      });

      const expectedYieldsParamsResponse1: YieldsParamsResponseObject = {
        id: YieldsParamsTable.uuid(testConstants.defaultYieldsParams1.createdAtHeight),
        sDAIPrice: testConstants.defaultYieldsParams1.sDAIPrice,
        assetYieldsIndex: testConstants.defaultYieldsParams1.assetYieldsIndex,
        createdAt: testConstants.defaultYieldsParams1.createdAt,
        createdAtHeight: testConstants.defaultYieldsParams1.createdAtHeight,
      };

      expect(response.body.allYieldsParams).toHaveLength(1);
      expect(response.body.allYieldsParams).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedYieldsParamsResponse1,
          }),
        ]),
      );
    });

    it('Get /yieldsParams/latestYieldsParams returns yieldsParams succesfully gets latest yields params when multiple rows are in DB', async () => {
      await testMocks.seedData();

      await Promise.all([
        YieldsParamsTable.create(testConstants.defaultYieldsParams1),
        YieldsParamsTable.create(testConstants.defaultYieldsParams2),
      ]);

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path: '/v4/yieldsParams/latestYieldsParams',
      });

      const expectedYieldsParamsResponse2: YieldsParamsResponseObject = {
        id: YieldsParamsTable.uuid(testConstants.defaultYieldsParams2.createdAtHeight),
        sDAIPrice: testConstants.defaultYieldsParams2.sDAIPrice,
        assetYieldsIndex: testConstants.defaultYieldsParams2.assetYieldsIndex,
        createdAt: testConstants.defaultYieldsParams2.createdAt,
        createdAtHeight: testConstants.defaultYieldsParams2.createdAtHeight,
      };

      expect(response.body.allYieldsParams).toHaveLength(1);
      expect(response.body.allYieldsParams).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedYieldsParamsResponse2,
          }),
        ]),
      );
    });
  });
});
