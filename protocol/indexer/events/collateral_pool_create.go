package events

import (
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
)

// NewCollateralPoolCreateEvent creates a CollateralPoolCreateEvent
// representing creation of a perpetual market.
func NewCollateralPoolCreateEvent(
	id uint32,
	maxCumalativeInsuranceFundDeltaPerBlock uint64,
	multiCollateralAssets *perptypes.MultiCollateralAssetsArray,
	quoteAssetId uint32,
) *CollateralPoolCreateEvent {
	return &CollateralPoolCreateEvent{
		Id:                                      id,
		MaxCumulativeInsuranceFundDeltaPerBlock: maxCumalativeInsuranceFundDeltaPerBlock,
		MultiCollateralAssets:                   multiCollateralAssets,
		QuoteAssetId:                            quoteAssetId,
	}
}
