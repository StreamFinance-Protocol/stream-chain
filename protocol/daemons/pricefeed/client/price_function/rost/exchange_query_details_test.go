package rost_test
import (
	"testing"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/pricefeed/client/price_function/rost"
	"github.com/stretchr/testify/require"
)
func TestRostUrl(t *testing.T) {
	require.Equal(t, "https://rost.pu.mba/api/vX/candles?apiKey=API_KEY&ticker=$", rost.RostDetails.Url)
}
func TestRostIsMultiMarket(t *testing.T) {
	require.False(t, rost.RostDetails.IsMultiMarket)
}