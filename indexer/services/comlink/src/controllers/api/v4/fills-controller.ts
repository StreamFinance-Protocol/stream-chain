import { stats } from '@klyraprotocol-indexer/base';
import {
  SubaccountTable,
  IsoString,
  perpetualMarketRefresher,
  PerpetualMarketFromDatabase,
  FillTable,
  FillFromDatabase,
  QueryableField,
} from '@klyraprotocol-indexer/postgres';
import express from 'express';
import {
  checkSchema,
  matchedData,
} from 'express-validator';
import _ from 'lodash';
import {
  Controller, Get, Query, Route,
} from 'tsoa';

import { getReqRateLimiter } from '../../../caches/rate-limiters';
import config from '../../../config';
import { complianceCheck } from '../../../lib/compliance-check';
import { NotFoundError } from '../../../lib/errors';
import {
  getChildSubaccountNums, getClobPairId, handleControllerError, isDefined,
} from '../../../lib/helpers';
import { rateLimiterMiddleware } from '../../../lib/rate-limit';
import { rejectRestrictedCountries } from '../../../lib/restrict-countries';
import { CheckLimitAndCreatedBeforeOrAtSchema, CheckSubaccountSchema, CheckParentSubaccountSchema } from '../../../lib/validation/schemas';
import { handleValidationErrors } from '../../../request-helpers/error-handler';
import ExportResponseCodeStats from '../../../request-helpers/export-response-code-stats';
import { fillToResponseObject } from '../../../request-helpers/request-transformer';
import {
  FillRequest,
  FillResponse,
  FillResponseObject,
  MarketByClobPairId,
  ParentSubaccountFillRequest,
} from '../../../types';

const router: express.Router = express.Router();
const controllerName: string = 'fills-controller';

@Route('fills')
class FillsController extends Controller {
  @Get('/')
  async getFills(
    @Query() address: string,
      @Query() subaccountNumber: number,
      @Query() market?: string,
      @Query() limit?: number,
      @Query() createdBeforeOrAtHeight?: number,
      @Query() createdBeforeOrAt?: IsoString,
  ): Promise<FillResponse> {
    // TODO(DEC-656): Change to using a cache of markets in Redis similar to Librarian instead of
    // querying the DB.
    let clobPairId: string | undefined;
    if (isDefined(market)) {
      clobPairId = await getClobPairId(market!);

      if (clobPairId === undefined) {
        throw new NotFoundError(`${market} not found`);
      }
    }

    const subaccountId: string = SubaccountTable.uuid(address, subaccountNumber);
    const fills: FillFromDatabase[] = await FillTable.findAll(
      {
        subaccountId: [subaccountId],
        clobPairId,
        limit,
        createdBeforeOrAtHeight: createdBeforeOrAtHeight
          ? createdBeforeOrAtHeight.toString()
          : undefined,
        createdBeforeOrAt,
      },
      [QueryableField.LIMIT],
    );

    const clobPairIdToPerpetualMarket: Record<
      string,
      PerpetualMarketFromDatabase> = perpetualMarketRefresher.getClobPairIdToPerpetualMarket();
    const clobPairIdToMarket: MarketByClobPairId = _.mapValues(
      clobPairIdToPerpetualMarket,
      (perpetualMarket: PerpetualMarketFromDatabase) => {
        return {
          market: perpetualMarket.ticker,
        };
      },
    );

    return {
      fills: fills.map((fill: FillFromDatabase): FillResponseObject => {
        return fillToResponseObject(fill, clobPairIdToMarket, subaccountNumber);
      }),
    };
  }

  @Get('/parentSubaccount')
  async getFillsForParentSubaccount(
    @Query() address: string,
      @Query() parentSubaccountNumber: number,
      @Query() market?: string,
      @Query() limit?: number,
      @Query() createdBeforeOrAtHeight?: number,
      @Query() createdBeforeOrAt?: IsoString,
  ): Promise<FillResponse> {
    // TODO(DEC-656): Change to using a cache of markets in Redis similar to Librarian instead of
    // querying the DB.
    let clobPairId: string | undefined;
    if (isDefined(market)) {
      clobPairId = await getClobPairId(market!);

      if (clobPairId === undefined) {
        throw new NotFoundError(`${market} not found`);
      }
    }

    // Get subaccountIds for all child subaccounts of the parent subaccount
    // Create a record of subaccountId to subaccount number
    const childIdtoSubaccountNumber: Record<string, number> = {};
    getChildSubaccountNums(parentSubaccountNumber).forEach(
      (subaccountNum: number) => {
        childIdtoSubaccountNumber[SubaccountTable.uuid(address, subaccountNum)] = subaccountNum;
      },
    );
    const subaccountIds: string[] = Object.keys(childIdtoSubaccountNumber);

    const fills: FillFromDatabase[] = await FillTable.findAll(
      {
        subaccountId: subaccountIds,
        clobPairId,
        limit,
        createdBeforeOrAtHeight: createdBeforeOrAtHeight
          ? createdBeforeOrAtHeight.toString()
          : undefined,
        createdBeforeOrAt,
      },
      [QueryableField.LIMIT],
    );

    const clobPairIdToPerpetualMarket: Record<
        string,
        PerpetualMarketFromDatabase> = perpetualMarketRefresher.getClobPairIdToPerpetualMarket();
    const clobPairIdToMarket: MarketByClobPairId = _.mapValues(
      clobPairIdToPerpetualMarket,
      (perpetualMarket: PerpetualMarketFromDatabase) => {
        return {
          market: perpetualMarket.ticker,
        };
      },
    );

    return {
      fills: fills.map((fill: FillFromDatabase): FillResponseObject => {
        return fillToResponseObject(fill, clobPairIdToMarket,
          childIdtoSubaccountNumber[fill.subaccountId]);
      }),
    };
  }
}

router.get(
  '/',
  rejectRestrictedCountries,
  rateLimiterMiddleware(getReqRateLimiter),
  ...CheckSubaccountSchema,
  ...CheckLimitAndCreatedBeforeOrAtSchema,
  // parameters and vice-versa.
  // Reference https://express-validator.github.io/docs/validation-chain-api.html#ifcondition
  ...checkSchema({
    market: {
      in: ['query'],
      isString: true,
      optional: true,
    },
  }),
  handleValidationErrors,
  complianceCheck,
  ExportResponseCodeStats({ controllerName }),
  async (req: express.Request, res: express.Response) => {
    const start: number = Date.now();
    const {
      address,
      subaccountNumber,
      market,
      limit,
      createdBeforeOrAtHeight,
      createdBeforeOrAt,
    }: FillRequest = matchedData(req) as FillRequest;

    // The schema checks allow subaccountNumber to be a string, but we know it's a number here.
    const subaccountNum : number = +subaccountNumber;

    // TODO(DEC-656): Change to using a cache of markets in Redis similar to Librarian instead of
    // querying the DB.
    try {
      const controller: FillsController = new FillsController();
      const response: FillResponse = await controller.getFills(
        address,
        subaccountNum,
        market,
        limit,
        createdBeforeOrAtHeight,
        createdBeforeOrAt,
      );

      return res.send(response);
    } catch (error) {
      return handleControllerError(
        'FillsController GET /',
        'Fills error',
        error,
        req,
        res,
      );
    } finally {
      stats.timing(
        `${config.SERVICE_NAME}.${controllerName}.get_fills.timing`,
        Date.now() - start,
      );
    }
  },
);

router.get(
  '/parentSubaccountNumber',
  rateLimiterMiddleware(getReqRateLimiter),
  ...CheckParentSubaccountSchema,
  ...CheckLimitAndCreatedBeforeOrAtSchema,
  // parameters and vice-versa.
  // Reference https://express-validator.github.io/docs/validation-chain-api.html#ifcondition
  ...checkSchema({
    market: {
      in: ['query'],
      isString: true,
      optional: true,
    },
  }),
  handleValidationErrors,
  complianceCheck, // TODO Solal geo checks
  ExportResponseCodeStats({ controllerName }),
  async (req: express.Request, res: express.Response) => {
    const start: number = Date.now();
    const {
      address,
      parentSubaccountNumber,
      market,
      limit,
      createdBeforeOrAtHeight,
      createdBeforeOrAt,
    }: ParentSubaccountFillRequest = matchedData(req) as ParentSubaccountFillRequest;

    // The schema checks allow subaccountNumber to be a string, but we know it's a number here.
    const parentSubaccountNum : number = +parentSubaccountNumber;

    // TODO(DEC-656): Change to using a cache of markets in Redis similar to Librarian instead of
    // querying the DB.
    try {
      const controller: FillsController = new FillsController();
      const response: FillResponse = await controller.getFillsForParentSubaccount(
        address,
        parentSubaccountNum,
        market,
        limit,
        createdBeforeOrAtHeight,
        createdBeforeOrAt,
      );

      return res.send(response);
    } catch (error) {
      return handleControllerError(
        'FillsController GET /parentSubaccountNumber',
        'Fills error',
        error,
        req,
        res,
      );
    } finally {
      stats.timing(
        `${config.SERVICE_NAME}.${controllerName}.get_fills.timing`,
        Date.now() - start,
      );
    }
  },
);

export default router;
