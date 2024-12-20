package events

// NewCollateralPoolCreateEvent creates a CollateralPoolCreateEvent
// representing creation of a perpetual market.
func NewCollateralPoolCreateEvent(
	id uint32,
	maxCumalativeInsuranceFundDeltaPerBlock uint64,
	multiCollateralAssets []uint32,
	quoteAssetId uint32,
) *CollateralPoolCreateEvent {
	return &CollateralPoolCreateEvent{
		Id:                                      id,
		MaxCumulativeInsuranceFundDeltaPerBlock: maxCumalativeInsuranceFundDeltaPerBlock,
		MultiCollateralAssets:                   multiCollateralAssets,
		QuoteAssetId:                            quoteAssetId,
	}
}
