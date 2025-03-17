import { stats } from '@klyraprotocol-indexer/base';
import {
  Ordering,
  YieldsParamsFromDatabase,
  YieldsParamsTable,
  YieldsParamsColumns,
} from '@klyraprotocol-indexer/postgres';
import express from 'express';
import { matchedData } from 'express-validator';
import {
  Controller, Get, Query, Route,
} from 'tsoa';

import { getReqRateLimiter } from '../../../caches/rate-limiters';
import config from '../../../config';
import { complianceCheck } from '../../../lib/compliance-check';
import { NotFoundError } from '../../../lib/errors';
import { handleControllerError } from '../../../lib/helpers';
import { rateLimiterMiddleware } from '../../../lib/rate-limit';
import { rejectRestrictedCountries } from '../../../lib/restrict-countries';
import {
  CheckLimitAndYieldsParamsSchema,
} from '../../../lib/validation/schemas';
import { handleValidationErrors } from '../../../request-helpers/error-handler';
import ExportResponseCodeStats from '../../../request-helpers/export-response-code-stats';
import {
  yieldsParamsToResponseObject,
} from '../../../request-helpers/request-transformer';
import {
  YieldsParamsResponse,
  YieldsParamsRequest,
} from '../../../types';

const router: express.Router = express.Router();
const controllerName: string = 'yields-params-controller';

@Route('yieldsParams')
class YieldsParamsController extends Controller {
  @Get('/')
  async getYieldsParams(
    @Query() createdBeforeOrAtHeight?: string,
  ): Promise<YieldsParamsResponse> {

    // [YBCP-30]: Add cache for yields params
    const query = createdBeforeOrAtHeight !== undefined
      ? { createdBeforeOrAtHeight }
      : {};
    const allYieldsParams: YieldsParamsFromDatabase[] | undefined = await YieldsParamsTable.findAll(
      query,
      [], {
        orderBy: [[YieldsParamsColumns.createdAtHeight, Ordering.ASC]],
      });

    if (allYieldsParams === undefined) {
      throw new NotFoundError(
        `No yields params found before or at ${createdBeforeOrAtHeight}`,
      );
    }

    if (allYieldsParams.length === 0) {
      return { allYieldsParams: [] };
    }

    const resultParams: YieldsParamsResponse = {
      allYieldsParams: allYieldsParams.map((yieldsParams: YieldsParamsFromDatabase) => {
        return yieldsParamsToResponseObject(yieldsParams);
      }),
    };

    return resultParams;
  }

  @Get('/latestYieldsParams')
  async getLatestYieldsParams(): Promise<YieldsParamsResponse> {
    // [YBCP-30]: Add cache for yields params
    const yieldsParams: YieldsParamsFromDatabase | undefined = await YieldsParamsTable.getLatest();

    if (yieldsParams === undefined) {
      throw new NotFoundError(
        'No lates yields params found',
      );
    }

    return {
      allYieldsParams: [yieldsParamsToResponseObject(yieldsParams)],
    };
  }
}

router.get(
  '/',
  rejectRestrictedCountries,
  rateLimiterMiddleware(getReqRateLimiter),
  ...CheckLimitAndYieldsParamsSchema,
  handleValidationErrors,
  complianceCheck,
  ExportResponseCodeStats({ controllerName }),
  async (req: express.Request, res: express.Response) => {
    const start: number = Date.now();
    const matchedDataObject = matchedData(req);
    const yieldsParamsGetRequest: YieldsParamsRequest = {
      createdBeforeOrAtHeight: matchedDataObject.createdAtOrBeforeHeight,
    };

    try {
      const controllers: YieldsParamsController = new YieldsParamsController();
      const response: YieldsParamsResponse = await controllers.getYieldsParams(
        yieldsParamsGetRequest.createdBeforeOrAtHeight,
      );
      return res.send(response);
    } catch (error) {
      return handleControllerError(
        'YieldsParamsController GET /',
        'YieldsParams error',
        error,
        req,
        res,
      );
    } finally {
      stats.timing(
        `${config.SERVICE_NAME}.${controllerName}.get_yields_params.timing`,
        Date.now() - start,
      );
    }
  },
);

router.get(
  '/latestYieldsParams',
  rateLimiterMiddleware(getReqRateLimiter),
  ...CheckLimitAndYieldsParamsSchema,
  handleValidationErrors,
  complianceCheck,
  ExportResponseCodeStats({ controllerName }),
  async (req: express.Request, res: express.Response) => {
    const start: number = Date.now();
    matchedData(req);

    try {
      const controller: YieldsParamsController = new YieldsParamsController();
      const response: YieldsParamsResponse = await controller.getLatestYieldsParams();
      return res.send(response);
    } catch (error) {
      return handleControllerError(
        'YieldsParamsController GET /latestYieldsParams',
        'YieldsParams error',
        error,
        req,
        res,
      );
    } finally {
      stats.timing(
        `${config.SERVICE_NAME}.${controllerName}.get_latest_yields_params.timing`,
        Date.now() - start,
      );
    }
  },
);

export default router;
