package types

import (
	errorsmod "cosmossdk.io/errors"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
)

func (collateralPool CollateralPool) Validate() error {

	if len(collateralPool.MultiCollateralAssets.MultiCollateralAssets) == 0 {
		return errorsmod.Wrap(ErrMultiCollateralAssetsEmpty, "")
	}

	if len(collateralPool.MultiCollateralAssets.MultiCollateralAssets) > 1 {
		return errorsmod.Wrap(ErrCollateralPoolMustHaveOnlyOneAsset, "")
	}

	if collateralPool.MaxCumulativeInsuranceFundDeltaPerBlock == 0 {
		return errorsmod.Wrap(ErrMaxCumulativeInsuranceFundDeltaPerBlockZero, lib.UintToString(collateralPool.MaxCumulativeInsuranceFundDeltaPerBlock))
	}

	collatAsset := collateralPool.MultiCollateralAssets.MultiCollateralAssets[0]
	if collatAsset != collateralPool.QuoteAssetId {
		return errorsmod.Wrap(ErrIsolatedMarketMultiCollateralAssetDoesNotContainQuoteAsset, "")
	}

	return nil
}
