import {
  dbHelpers,
  testMocks,
  testConstants,
  OrderTable,
  FillTable,
  OrderFromDatabase,
  perpetualMarketRefresher,
  FillFromDatabase,
} from '@klyraprotocol-indexer/postgres';
import { FillResponseObject, RequestMethod } from '../../../../src/types';
import request from 'supertest';
import {
  sendRequest,
  fillResponseObjectFromFillCreateObject,
} from '../../../helpers/helpers';

describe('fills-controller#V4', () => {
  beforeAll(async () => {
    await dbHelpers.migrate();
  });

  afterAll(async () => {
    await dbHelpers.teardown();
  });

  describe('GET', () => {
    const defaultSubaccountNumber: number = testConstants.defaultSubaccount.subaccountNumber;

    beforeEach(async () => {
      await testMocks.seedData();
      await perpetualMarketRefresher.updatePerpetualMarkets();
    });

    afterEach(async () => {
      await dbHelpers.clearData();
    });

    it('Get /fills gets fills', async () => {
      await OrderTable.create(testConstants.defaultOrder);
      await FillTable.create(testConstants.defaultFill);

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path:
          `/v4/fills?address=${testConstants.defaultAddress}` +
          `&subaccountNumber=${testConstants.defaultSubaccount.subaccountNumber}`,
      });

      const expected: Partial<FillResponseObject> = {
        side: testConstants.defaultFill.side,
        liquidity: testConstants.defaultFill.liquidity,
        market: testConstants.defaultPerpetualMarket.ticker,
        price: testConstants.defaultFill.price,
        size: testConstants.defaultFill.size,
        fee: testConstants.defaultFill.fee,
        type: testConstants.defaultFill.type,
        orderId: testConstants.defaultFill.orderId,
        createdAt: testConstants.defaultFill.createdAt,
        createdAtHeight: testConstants.defaultFill.createdAtHeight,
        subaccountNumber: defaultSubaccountNumber,
      };

      expect(response.body.fills).toHaveLength(1);
      expect(response.body.fills).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expected,
          }),
        ]),
      );
    });

    it('Get /fills with market gets fills for market', async () => {
      // Order and fill for BTC-USD
      await OrderTable.create(testConstants.defaultOrder);
      await FillTable.create(testConstants.defaultFill);

      // Order and fill for ETH-USD
      const ethOrder: OrderFromDatabase = await OrderTable.create({
        ...testConstants.defaultOrder,
        clientId: '3',
        clobPairId: testConstants.defaultPerpetualMarket2.clobPairId,
      });
      const ethFill: FillFromDatabase = await FillTable.create({
        ...testConstants.defaultFill,
        orderId: ethOrder.id,
        clobPairId: testConstants.defaultPerpetualMarket2.clobPairId,
        eventId: testConstants.defaultTendermintEventId2,
      });

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path:
          `/v4/fills?address=${testConstants.defaultAddress}` +
          `&subaccountNumber=${testConstants.defaultSubaccount.subaccountNumber}` +
          `&market=${testConstants.defaultPerpetualMarket2.ticker}`,
      });

      const expected: Partial<FillResponseObject> = {
        side: ethFill.side,
        liquidity: ethFill.liquidity,
        market: testConstants.defaultPerpetualMarket2.ticker,
        price: ethFill.price,
        size: ethFill.size,
        fee: ethFill.fee,
        type: ethFill.type,
        orderId: ethOrder.id,
        createdAt: ethFill.createdAt,
        createdAtHeight: ethFill.createdAtHeight,
        subaccountNumber: defaultSubaccountNumber,
      };

      // Only the ETH-USD order should be returned
      expect(response.body.fills).toHaveLength(1);
      expect(response.body.fills).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expected,
          }),
        ]),
      );
    });

    it('Get /fills with market gets fills ordered by createdAtHeight descending', async () => {
      // Order and fill for BTC-USD
      await OrderTable.create(testConstants.defaultOrder);
      await FillTable.create(testConstants.defaultFill);

      // Order and fill for ETH-USD
      const ethOrder: OrderFromDatabase = await OrderTable.create({
        ...testConstants.defaultOrder,
        clientId: '3',
        clobPairId: testConstants.defaultPerpetualMarket2.clobPairId,
      });
      const ethFill: FillFromDatabase = await FillTable.create({
        ...testConstants.defaultFill,
        orderId: ethOrder.id,
        clobPairId: testConstants.defaultPerpetualMarket2.clobPairId,
        eventId: testConstants.defaultTendermintEventId2,
        createdAtHeight: '1',
      });

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path:
          `/v4/fills?address=${testConstants.defaultAddress}` +
          `&subaccountNumber=${testConstants.defaultSubaccount.subaccountNumber}`,
      });

      const expected: Partial<FillResponseObject>[] = [
        {
          side: testConstants.defaultFill.side,
          liquidity: testConstants.defaultFill.liquidity,
          market: testConstants.defaultPerpetualMarket.ticker,
          price: testConstants.defaultFill.price,
          size: testConstants.defaultFill.size,
          fee: testConstants.defaultFill.fee,
          type: testConstants.defaultFill.type,
          orderId: testConstants.defaultFill.orderId,
          createdAt: testConstants.defaultFill.createdAt,
          createdAtHeight: testConstants.defaultFill.createdAtHeight,
          subaccountNumber: defaultSubaccountNumber,
        },
        {
          side: ethFill.side,
          liquidity: ethFill.liquidity,
          market: testConstants.defaultPerpetualMarket2.ticker,
          price: ethFill.price,
          size: ethFill.size,
          fee: ethFill.fee,
          type: ethFill.type,
          orderId: ethOrder.id,
          createdAt: ethFill.createdAt,
          createdAtHeight: ethFill.createdAtHeight,
          subaccountNumber: defaultSubaccountNumber,
        },
      ];

      // Fills should be returned sorted by createdAtHeight in descending order.
      expect(response.body.fills).toHaveLength(2);
      expect(response.body.fills).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expected[0],
          }),
          expect.objectContaining({
            ...expected[1],
          }),
        ]),
      );
    });

    it('Get /fills with market with no fills', async () => {
      // Order and fill for BTC-USD
      await OrderTable.create(testConstants.defaultOrder);
      await FillTable.create(testConstants.defaultFill);

      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path:
          `/v4/fills?address=${testConstants.defaultAddress}` +
          `&subaccountNumber=${testConstants.defaultSubaccount.subaccountNumber}` +
          `&market=${testConstants.defaultPerpetualMarket2.ticker}`,
      });

      expect(response.body.fills).toEqual([]);
    });

    it('Get /fills/parentSubaccountNumber gets fills', async () => {
      await OrderTable.create(testConstants.defaultOrder);
      await FillTable.create(testConstants.defaultFill);
      await OrderTable.create(testConstants.isolatedMarketOrder);
      await FillTable.create(testConstants.isolatedMarketFill);
      await FillTable.create(testConstants.isolatedMarketFill2);

      const parentSubaccountNumber: number = 0;
      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path:
          `/v4/fills/parentSubaccountNumber?address=${testConstants.defaultAddress}` +
          `&parentSubaccountNumber=${parentSubaccountNumber}`,
      });

      // Use fillResponseObjectFromFillCreateObject to create expectedFills
      const expectedFills: Partial<FillResponseObject>[] = [
        fillResponseObjectFromFillCreateObject(
          testConstants.defaultFill,
          defaultSubaccountNumber,
        ),
        fillResponseObjectFromFillCreateObject(
          testConstants.isolatedMarketFill,
          testConstants.isolatedSubaccount.subaccountNumber,
        ),
        fillResponseObjectFromFillCreateObject(
          testConstants.isolatedMarketFill2,
          testConstants.isolatedSubaccount2.subaccountNumber,
        ),
      ];

      expect(response.body.fills).toHaveLength(3);
      expect(response.body.fills).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedFills[0],
          }),
          expect.objectContaining({
            ...expectedFills[1],
          }),
          expect.objectContaining({
            ...expectedFills[2],
          }),
        ]),
      );
    });

    it('Get /fills/parentSubaccountNumber gets fills for isolated market', async () => {
      await OrderTable.create(testConstants.defaultOrder);
      await FillTable.create(testConstants.defaultFill);
      await OrderTable.create(testConstants.isolatedMarketOrder);
      await FillTable.create(testConstants.isolatedMarketFill);
      await FillTable.create(testConstants.isolatedMarketFill2);

      const parentSubaccountNumber: number = 0;
      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path:
          `/v4/fills/parentSubaccountNumber?address=${testConstants.defaultAddress}` +
          `&parentSubaccountNumber=${parentSubaccountNumber}` +
          `&market=${testConstants.isolatedPerpetualMarket.ticker}`,
      });

      // Use fillResponseObjectFromFillCreateObject to create expectedFills
      const expectedFills: Partial<FillResponseObject>[] = [
        fillResponseObjectFromFillCreateObject(
          testConstants.isolatedMarketFill,
          testConstants.isolatedSubaccount.subaccountNumber,
        ),
        fillResponseObjectFromFillCreateObject(
          testConstants.isolatedMarketFill2,
          testConstants.isolatedSubaccount2.subaccountNumber,
        ),
      ];

      expect(response.body.fills).toHaveLength(2);
      expect(response.body.fills).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedFills[0],
          }),
          expect.objectContaining({
            ...expectedFills[1],
          }),
        ]),
      );
    });

    it('Get /fills/parentSubaccountNumber with market with no fills', async () => {
      await OrderTable.create(testConstants.defaultOrder);
      await FillTable.create(testConstants.defaultFill);
      await OrderTable.create(testConstants.isolatedMarketOrder);
      await FillTable.create(testConstants.isolatedMarketFill);

      const parentSubaccountNumber: number = 0;
      const response: request.Response = await sendRequest({
        type: RequestMethod.GET,
        path:
          `/v4/fills/parentSubaccountNumber?address=${testConstants.defaultAddress}` +
          `&parentSubaccountNumber=${parentSubaccountNumber}` +
          `&market=${testConstants.isolatedPerpetualMarket2.ticker}`,
      });

      expect(response.body.fills).toEqual([]);
    });
  });
});
