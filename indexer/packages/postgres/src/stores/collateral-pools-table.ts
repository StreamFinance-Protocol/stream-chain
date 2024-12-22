import { QueryBuilder } from 'objection';

import { DEFAULT_POSTGRES_OPTIONS } from '../constants';
import {
  setupBaseQuery,
  verifyAllRequiredFields,
} from '../helpers/stores-helpers';
import Transaction from '../helpers/transaction';
import CollateralPoolsModel from '../models/collateral-pool-model';
import {
  CollateralPoolsQueryConfig,
  CollateralPoolFromDatabase,
  Options,
  Ordering,
  QueryableField,
  QueryConfig,
} from '../types';
import { CollateralPoolsColumns, CollateralPoolsCreateObject } from '../types';

export async function findAll(
  { limit, id }: CollateralPoolsQueryConfig,
  requiredFields: QueryableField[],
  options: Options = DEFAULT_POSTGRES_OPTIONS
): Promise<CollateralPoolFromDatabase[]> {
  verifyAllRequiredFields(
    {
      limit,
      id,
    } as QueryConfig,
    requiredFields
  );

  let baseQuery: QueryBuilder<CollateralPoolsModel> =
    setupBaseQuery<CollateralPoolsModel>(CollateralPoolsModel, options);

  if (id !== undefined) {
    baseQuery = baseQuery.whereIn(CollateralPoolsColumns.id, id);
  }

  if (options.orderBy !== undefined) {
    for (const [column, order] of options.orderBy) {
      baseQuery = baseQuery.orderBy(column, order);
    }
  } else {
    baseQuery = baseQuery.orderBy(CollateralPoolsColumns.id, Ordering.ASC);
  }

  if (limit !== undefined) {
    baseQuery = baseQuery.limit(limit);
  }

  return baseQuery.returning('*');
}

export async function create(
  collateralPoolToCreate: CollateralPoolsCreateObject,
  options: Options = { txId: undefined }
): Promise<CollateralPoolFromDatabase> {
  const modelObject: Partial<CollateralPoolsModel> = {
    ...collateralPoolToCreate,
  };

  return CollateralPoolsModel.query(Transaction.get(options.txId))
    .insert(modelObject)
    .returning('*') as Promise<CollateralPoolFromDatabase>;
}

export async function findById(
  id: number,
  options: Options = DEFAULT_POSTGRES_OPTIONS
): Promise<CollateralPoolFromDatabase | undefined> {
  const baseQuery: QueryBuilder<CollateralPoolsModel> =
    setupBaseQuery<CollateralPoolsModel>(CollateralPoolsModel, options);
  return baseQuery.findById(id).returning('*');
}

// export async function update(
//   { id, ...fields }: CollateralPoolsUpdateObject,
//   options: Options = { txId: undefined }
// ): Promise<CollateralPoolsFromDatabase | undefined> {
//   const liquidityTier = await CollateralPoolsModel.query(
//     Transaction.get(options.txId)
//     // TODO fix expression typing so we dont have to use any
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   ).findById(id);
//   const updatedCollateralPools = await liquidityTier
//     .$query()
//     .patch(fields as PartialModelObject<CollateralPoolsModel>)
//     .returning('*');
//   // The objection types mistakenly think the query returns an array of liquidityTiers.
//   return updatedCollateralPools as unknown as
//     | CollateralPoolsFromDatabase
//     | undefined;
// }

// export async function upsert(
//   tierToUpsert: CollateralPoolsCreateObject,
//   options: Options = { txId: undefined }
// ): Promise<CollateralPoolsFromDatabase> {
//   const tiers: CollateralPoolsModel[] = await CollateralPoolsModel.query(
//     Transaction.get(options.txId)
//   )
//     .upsert(tierToUpsert)
//     .returning('*');
//   // should only ever be one tier
//   return tiers[0];
// }
