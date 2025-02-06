# Invariants

## Subaccount Invariants
- A subaccount always belongs to a single collateral pool
- If the subaccount has no perpetual positions, the subaccount's collateral pool is the dummy pool which is module address
- The dummy collateral pool supports all assets

## Price Invariants
- Oracle prices are denominated in the quote asset of the perpetual's collateral pool

## Yield Invariants
- We claim yield when a subaccount is in the dummy pool or when a subaccount's collateral pool has tdai as the quote asset

## Asset Invariants
- The asset ID of tDAI is 0
- All assets should have has_market set to false (until multicollateral is implemented)

