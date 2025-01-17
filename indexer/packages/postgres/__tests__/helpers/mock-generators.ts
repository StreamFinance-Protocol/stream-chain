import {
  defaultAsset,
  defaultAsset2,
  defaultAsset3,
  defaultBlock,
  defaultBlock2,
  defaultCollateralPool,
  defaultCollateralPool2,
  defaultLiquidityTier,
  defaultLiquidityTier2,
  defaultMarket,
  defaultMarket2,
  defaultMarket3,
  defaultPerpetualMarket,
  defaultPerpetualMarket2,
  defaultPerpetualMarket3,
  defaultSubaccount,
  defaultSubaccount2,
  defaultTendermintEvent,
  defaultTendermintEvent2,
  defaultTendermintEvent3,
  defaultTendermintEvent4,
  isolatedMarket,
  isolatedMarket2,
  isolatedPerpetualMarket,
  isolatedPerpetualMarket2,
  isolatedSubaccount,
  isolatedSubaccount2,
} from './constants';
import * as AssetTable from '../../src/stores/asset-table';
import * as BlockTable from '../../src/stores/block-table';
import * as CollateralPoolsTable from '../../src/stores/collateral-pools-table';
import * as LiquidityTiersTable from '../../src/stores/liquidity-tiers-table';
import * as MarketTable from '../../src/stores/market-table';
import * as PerpetualMarketTable from '../../src/stores/perpetual-market-table';
import * as SubaccountTable from '../../src/stores/subaccount-table';
import * as TendermintEventTable from '../../src/stores/tendermint-event-table';

export async function seedData() {
  await Promise.all([
    SubaccountTable.create(defaultSubaccount),
    SubaccountTable.create(defaultSubaccount2),
    SubaccountTable.create(isolatedSubaccount),
    SubaccountTable.create(isolatedSubaccount2),
  ]);
  await Promise.all([
    MarketTable.create(defaultMarket),
    MarketTable.create(defaultMarket2),
    MarketTable.create(defaultMarket3),
    MarketTable.create(isolatedMarket),
    MarketTable.create(isolatedMarket2),
  ]);
  await Promise.all([
    LiquidityTiersTable.create(defaultLiquidityTier),
    LiquidityTiersTable.create(defaultLiquidityTier2),
  ]);
  await Promise.all([
    PerpetualMarketTable.create(defaultPerpetualMarket),
    PerpetualMarketTable.create(defaultPerpetualMarket2),
    PerpetualMarketTable.create(defaultPerpetualMarket3),
    PerpetualMarketTable.create(isolatedPerpetualMarket),
    PerpetualMarketTable.create(isolatedPerpetualMarket2),
  ]);
  await Promise.all([
    BlockTable.create(defaultBlock),
    BlockTable.create(defaultBlock2),
  ]);
  await Promise.all([
    TendermintEventTable.create(defaultTendermintEvent),
    TendermintEventTable.create(defaultTendermintEvent2),
    TendermintEventTable.create(defaultTendermintEvent3),
    TendermintEventTable.create(defaultTendermintEvent4),
  ]);
  await Promise.all([
    AssetTable.create(defaultAsset),
    AssetTable.create(defaultAsset2),
    AssetTable.create(defaultAsset3),
  ]);

  await Promise.all([
    CollateralPoolsTable.create(defaultCollateralPool),
    CollateralPoolsTable.create(defaultCollateralPool2),
  ]);
}
