/* ------- COLLATERAL POOLS TYPES ------- */

export interface CollateralPoolsCreateObject {
  id: number;
  maxCumulativeInsuranceFundDeltaPerBlock: number;
  multiCollateralAssets: string;
  quoteAssetId: number;
}

export enum CollateralPoolsColumns {
  id = 'id',
  maxCumulativeInsuranceFundDeltaPerBlock = 'maxCumulativeInsuranceFundDeltaPerBlock',
  multiCollateralAssets = 'multiCollateralAssets',
  quoteAssetId = 'quoteAssetId',
}
