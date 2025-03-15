package events

// NewUpdateYieldsParamsEventV1 creates a UpdateYieldsParamsEventV1 representing
// update of a yields params.
func NewUpdateYieldsParamsEventV1(
	sdaiPrice string,
	assetYieldsIndex string,
) *UpdateYieldsParamsEventV1 {
	return &UpdateYieldsParamsEventV1{
		SdaiPrice:        sdaiPrice,
		AssetYieldsIndex: assetYieldsIndex,
	}
}
