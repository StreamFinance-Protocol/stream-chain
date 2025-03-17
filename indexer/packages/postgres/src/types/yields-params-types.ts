/* ------- YIELDS PARAMS TYPES ------- */

import { IsoString } from './utility-types';

export interface YieldsParamsCreateObject {
  sDAIPrice: string,
  assetYieldsIndex: string,
  createdAt: IsoString,
  createdAtHeight: string,
}

export enum YieldsParamsColumns {
  id = 'id',
  sDAIPrice = 'sDAIPrice',
  assetYieldsIndex = 'assetYieldsIndex',
  createdAt = 'createdAt',
  createdAtHeight = 'createdAtHeight',
}
