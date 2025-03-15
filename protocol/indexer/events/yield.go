package events

// NewUpdatePerpetualEventV1 creates a UpdatePerpetualEventV1 representing
// update of a perpetual.
func NewUpdateYieldsParamsEventV1(
	sdaiPrice string,
	assetYieldsIndex string,
) *UpdateYieldsParamsEventV1 {
	return &UpdateYieldsParamsEventV1{
		SdaiPrice:        sdaiPrice,
		AssetYieldsIndex: assetYieldsIndex,
	}
}
