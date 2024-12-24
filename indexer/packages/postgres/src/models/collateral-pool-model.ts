import BaseModel from './base-model';
import UpsertQueryBuilder from '../query-builders/upsert';

export default class CollateralPoolsModel extends BaseModel {
  static get tableName() {
    return 'collateral_pools';
  }

  static get idColumn() {
    return 'id';
  }

  static relationMappings = {};

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'id',
        'maxCumulativeInsuranceFundDeltaPerBlock',
        'multiCollateralAssets',
        'quoteAssetId',
      ],
      properties: {
        id: { type: 'integer' },
        maxCumulativeInsuranceFundDeltaPerBlock: { type: 'integer' },
        multiCollateralAssets: {
          type: 'string',
          items: { type: 'integer', minimum: 0 },
          postgresql: { type: 'integer[]' },
        },
        quoteAssetId: { type: 'integer' },
      },
    };
  }

  /**
   * A mapping from column name to JSON conversion expected.
   * See getSqlConversionForKlyraModelTypes for valid conversions.
   *
   * TODO(IND-239): Ensure that jsonSchema() / sqlToJsonConversions() / model fields match.
   */
  static get sqlToJsonConversions() {
    return {
      id: 'integer',
      maxCumulativeInsuranceFundDeltaPerBlock: 'integer',
      multiCollateralAssets: 'string',
      quoteAssetId: 'integer',
    };
  }

  id!: number;

  QueryBuilderType!: UpsertQueryBuilder<this>;

  maxCumulativeInsuranceFundDeltaPerBlock!: number;

  multiCollateralAssets!: string;

  quoteAssetId!: number;
}
