package events

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestNewUpdateYieldsParamsEventV1_Success(t *testing.T) {
	updatePerpetualEventV1 := NewUpdateYieldsParamsEventV1(
		"100000000",
		"1/1",
	)
	expectedUpdatePerpetualEventV1Proto := &UpdateYieldsParamsEventV1{
		SdaiPrice:        "100000000",
		AssetYieldsIndex: "1/1",
	}
	require.Equal(t, expectedUpdatePerpetualEventV1Proto, updatePerpetualEventV1)
}
