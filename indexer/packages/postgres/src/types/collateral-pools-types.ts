/* ------- COLLATERAL POOLS TYPES ------- */

export interface CollateralPoolsCreateObject {
  id: number;
  maxCumulativeInsuranceFundDeltaPerBlock: string;
  multiCollateralAssets: string;
  quoteAssetId: number;
}

export enum CollateralPoolsColumns {
  id = 'id',
  maxCumulativeInsuranceFundDeltaPerBlock = 'maxCumulativeInsuranceFundDeltaPerBlock',
  multiCollateralAssets = 'multiCollateralAssets',
  quoteAssetId = 'quoteAssetId',
}

export interface CollateralPoolsUpdateObject {
  id: number;
  maxCumulativeInsuranceFundDeltaPerBlock?: string;
  multiCollateralAssets?: string;
  quoteAssetId?: number;
}
