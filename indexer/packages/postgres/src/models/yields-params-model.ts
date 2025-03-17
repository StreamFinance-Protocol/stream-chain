import path from 'path';

import { Model } from 'objection';

import { IntegerPattern } from '../lib/validators';
import { IsoString } from '../types';
import BaseModel from './base-model';

export default class YieldsParamsModel extends BaseModel {
  static get tableName() {
    return 'yields_params';
  }

  static get idColumn() {
    return 'id';
  }

  static relationMappings = {
    height: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, 'block-model'),
      join: {
        from: 'yields_params.createdAtHeight',
        to: 'blocks.blockHeight',
      },
    },
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'id',
        'sDAIPrice',
        'assetYieldsIndex',
        'createdAt',
        'createdAtHeight',
      ],
      properties: {
        id: { type: 'string', format: 'uuid' },
        sDAIPrice: { type: 'string' },
        assetYieldsIndex: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        createdAtHeight: { type: 'string', pattern: IntegerPattern },
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
      id: 'string',
      sDAIPrice: 'string',
      assetYieldsIndex: 'string',
      createdAt: 'date-time',
      createdAtHeight: 'string',
    };
  }

  id!: string;

  sDAIPrice!: string;

  assetYieldsIndex!: string;

  createdAt!: IsoString;

  createdAtHeight!: string;
}
