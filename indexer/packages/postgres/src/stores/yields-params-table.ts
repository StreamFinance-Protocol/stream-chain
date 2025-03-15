import { logger } from '@klyraprotocol-indexer/base';
import { QueryBuilder } from 'objection';

import { BUFFER_ENCODING_UTF_8, DEFAULT_POSTGRES_OPTIONS } from '../constants';
import {
  verifyAllRequiredFields,
  setupBaseQuery,
} from '../helpers/stores-helpers';
import Transaction from '../helpers/transaction';
import { getUuid } from '../helpers/uuid';
import YieldsParamsModel from '../models/yields-params-model';
import {
  QueryConfig,
  YieldsParamsFromDatabase,
  YieldsParamsQueryConfig,
  YieldsParamsColumns,
  YieldsParamsCreateObject,
  Options,
  Ordering,
  QueryableField,
} from '../types';

export function uuid(createdAtHeight: string): string {
  // TODO(IND-483): Fix all uuid string substitutions to use Array.join.
  return getUuid(Buffer.from(`${createdAtHeight}`, BUFFER_ENCODING_UTF_8));
}

export async function findAll(
  {
    id,
    createdAtHeight,
    createdBeforeOrAtHeight,
    createdAfterHeight,
    createdAt,
    createdBeforeOrAt,
    createdAfter,
    assetYieldsIndex,
    sDAIPrice,
    limit,
  }: YieldsParamsQueryConfig,
  requiredFields: QueryableField[],
  options: Options = DEFAULT_POSTGRES_OPTIONS,
): Promise<YieldsParamsFromDatabase[]> {
  verifyAllRequiredFields(
    {
      id,
      createdAtHeight,
      createdBeforeOrAtHeight,
      createdAfterHeight,
      createdAt,
      createdBeforeOrAt,
      createdAfter,
      assetYieldsIndex,
      sDAIPrice,
      limit,
    } as QueryConfig,
    requiredFields,
  );

  let baseQuery: QueryBuilder<YieldsParamsModel> = setupBaseQuery<YieldsParamsModel>(
    YieldsParamsModel,
    options,
  );

  if (id) {
    baseQuery = baseQuery.whereIn(YieldsParamsColumns.id, id);
  }

  if (assetYieldsIndex) {
    baseQuery = baseQuery.where(YieldsParamsColumns.assetYieldsIndex, assetYieldsIndex);
  }

  if (sDAIPrice) {
    baseQuery = baseQuery.where(YieldsParamsColumns.sDAIPrice, sDAIPrice);
  }

  if (createdAt) {
    baseQuery = baseQuery.where(YieldsParamsColumns.createdAt, createdAt);
  }

  if (createdAtHeight) {
    baseQuery = baseQuery.whereIn(YieldsParamsColumns.createdAtHeight, createdAtHeight);
  }

  if (createdBeforeOrAt) {
    baseQuery = baseQuery.where(YieldsParamsColumns.createdAt, '<=', createdBeforeOrAt);
  }

  if (createdBeforeOrAtHeight) {
    baseQuery = baseQuery.where(YieldsParamsColumns.createdAtHeight, '<=', createdBeforeOrAtHeight);
  }

  if (createdAfter) {
    baseQuery = baseQuery.where(YieldsParamsColumns.createdAt, '>', createdAfter);
  }

  if (createdAfterHeight) {
    baseQuery = baseQuery.where(YieldsParamsColumns.createdAtHeight, '>', createdAfterHeight);
  }

  if (options.orderBy !== undefined) {
    for (const [column, order] of options.orderBy) {
      baseQuery = baseQuery.orderBy(
        column,
        order,
      );
    }
  } else {
    baseQuery = baseQuery.orderBy(
      YieldsParamsColumns.assetYieldsIndex,
      Ordering.DESC,
    );
  }

  if (limit) {
    baseQuery = baseQuery.limit(limit);
  }

  return baseQuery.returning('*');
}

export async function create(
  yieldsParamsToCreate: YieldsParamsCreateObject,
  options: Options = { txId: undefined },
): Promise<YieldsParamsFromDatabase> {
  return YieldsParamsModel.query(
    Transaction.get(options.txId),
  ).insert({
    ...yieldsParamsToCreate,
    id: uuid(yieldsParamsToCreate.createdAtHeight),
  }).returning('*');
}

export async function findById(
  id: string,
  options: Options = DEFAULT_POSTGRES_OPTIONS,
): Promise<YieldsParamsFromDatabase | undefined> {
  const baseQuery: QueryBuilder<YieldsParamsModel> = setupBaseQuery<YieldsParamsModel>(
    YieldsParamsModel,
    options,
  );
  return baseQuery
    .findById(id)
    .returning('*');
}

export async function getLatest(
  options: Options = DEFAULT_POSTGRES_OPTIONS,
): Promise<YieldsParamsFromDatabase> {
  const baseQuery: QueryBuilder<YieldsParamsModel> = setupBaseQuery<YieldsParamsModel>(
    YieldsParamsModel,
    options,
  );

  const results: YieldsParamsFromDatabase[] = await baseQuery
    .orderBy(YieldsParamsColumns.createdAtHeight, Ordering.DESC)
    .limit(1)
    .returning('*');

  const latestYieldsParams: YieldsParamsFromDatabase | undefined = results[0];
  if (latestYieldsParams === undefined) {
    logger.error({
      at: 'yields-params-table#getLatest',
      message: 'Unable to find latest yields params',
    });
    throw new Error('Unable to find latest yields params');
  }
  return latestYieldsParams;
}
