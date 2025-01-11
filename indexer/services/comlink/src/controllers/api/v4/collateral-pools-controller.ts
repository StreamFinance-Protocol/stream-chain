import { stats } from '@klyraprotocol-indexer/base';
import {
  CollateralPoolFromDatabase,
  CollateralPoolsTable,
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
import { CheckIdParamSchema } from '../../../lib/validation/schemas';
import { handleValidationErrors } from '../../../request-helpers/error-handler';
import ExportResponseCodeStats from '../../../request-helpers/export-response-code-stats';
import { collateralPoolToResponseObject } from '../../../request-helpers/request-transformer';
import {
  CollateralPoolsResponse,
  CollateralPoolsRequest,
} from '../../../types';

const router: express.Router = express.Router();
const controllerName: string = 'collateral-pools-controller';

@Route('collateralPools')
class CollateralPoolsController extends Controller {
  @Get('/')
  async getCollateralPools(
    @Query() id?: string,
  ): Promise<CollateralPoolsResponse> {
    if (id !== undefined) {
      const collateralPool = await CollateralPoolsTable.findById(Number(id));

      if (collateralPool === undefined) {
        throw new NotFoundError(`No collateral pool found with id: ${id}`);
      }
      return {
        collateralPools: [collateralPoolToResponseObject(collateralPool)],
      };
    } else {
      const allCollateralPools: CollateralPoolFromDatabase[] = await CollateralPoolsTable.findAll(
        {},
        [],
        {},
      );

      if (allCollateralPools.length === 0) {
        return { collateralPools: [] };
      }

      const resultCollateralPools: CollateralPoolsResponse = {
        collateralPools: allCollateralPools.map(
          (collateralPool: CollateralPoolFromDatabase) => {
            return collateralPoolToResponseObject(collateralPool);
          },
        ),
      };

      return resultCollateralPools;
    }
  }
}

router.get(
  '/',
  rejectRestrictedCountries,
  rateLimiterMiddleware(getReqRateLimiter),
  ...CheckIdParamSchema,
  handleValidationErrors,
  complianceCheck,
  ExportResponseCodeStats({ controllerName }),
  async (req: express.Request, res: express.Response) => {
    const start: number = Date.now();
    const {
      id,
    }: {
      id?: string;
    } = matchedData(req) as CollateralPoolsRequest;

    try {
      const controllers: CollateralPoolsController = new CollateralPoolsController();
      const response: CollateralPoolsResponse = await controllers.getCollateralPools(id);
      return res.send(response);
    } catch (error) {
      return handleControllerError(
        'CollateralPoolsController GET /',
        'CollateralPools error',
        error,
        req,
        res,
      );
    } finally {
      stats.timing(
        `${config.SERVICE_NAME}.${controllerName}.get_collateral_pools.timing`,
        Date.now() - start,
      );
    }
  },
);

export default router;
