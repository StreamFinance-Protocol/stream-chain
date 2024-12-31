package rost_test
import (
	"testing"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/pricefeed/client/price_function/rost"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/pricefeed/client/price_function/testutil"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/daemons/pricefeed"
	"github.com/stretchr/testify/require"
)
const (
	AMZN_TICKER = "AMZN"
)
// Test exponent maps.
var (
	RostExponentMap = map[string]int32{
		AMZN_TICKER: -5,
	}
)
func TestRostPriceFunction_Mixed(t *testing.T) {
	// Test response strings.
	tests := map[string]struct {
		// parameters
		responseJsonString  string
		exponentMap         map[string]int32
		medianFunctionFails bool
		// expectations
		expectedPriceMap       map[string]uint64
		expectedUnavailableMap map[string]error
		expectedError          error
	}{
		"Success - integers": {
			responseJsonString: `{"AMZN":{"1d":{"close":0.00238822,"high":0.00241522,"low":0.0023567,"transactionsNumber":34827,"open":0.0023567,"time":1735534800000,"utcDate":"2024-12-30","volume":28286986,"avgPrice":0.00237444,"btcPrice":{"time":1735516800000,"utcDate":"2024-12-30","open":93376.27,"close":92663.04,"high":95135,"low":91256.6,"avgPrice":93012.7465,"volume":22710.79326409,"transactionsNumber":788834},"priceType":"BTC"},"2d":{"close":0.00239143,"high":0.0024158,"low":0.00236097,"transactionsNumber":381052,"open":0.00236965,"time":1735430400000,"utcDate":"2024-12-29","volume":26959407,"avgPrice":0.0023708,"btcPrice":{"time":1735430400000,"utcDate":"2024-12-29","open":95204.1,"close":93563.35,"high":95559,"low":92841.48,"avgPrice":94062.4698,"volume":4701.453980039659,"transactionsNumber":449189},"priceType":"BTC"},"7d":{"close":0.00232315,"high":0.00239642,"low":0.00229354,"transactionsNumber":203027,"open":0.00239642,"time":1735016400000,"utcDate":"2024-12-24","volume":14710826,"avgPrice":0.00235284,"btcPrice":{"time":1734998400000,"utcDate":"2024-12-24","open":94699.4,"close":98594.47,"high":99554,"low":93426.25,"avgPrice":97051.9624,"volume":15474.436602476959,"transactionsNumber":773221},"priceType":"BTC"},"1m":{"close":0.0021374,"high":0.00214058,"low":0.00210347,"transactionsNumber":263661,"open":0.00213392,"time":1733011200000,"utcDate":"2024-12-01","volume":23383406,"avgPrice":0.00213071,"btcPrice":{"time":1733011200000,"utcDate":"2024-12-01","open":96456.3,"close":97263.18,"high":97988,"low":95753.42,"avgPrice":97003.6416,"volume":5405.9278398514025,"transactionsNumber":465123},"priceType":"BTC"},"3m":{"close":0.0030454,"high":0.00306284,"low":0.00292076,"transactionsNumber":439973,"open":0.00292076,"time":1727755200000,"utcDate":"2024-10-01","volume":33896996,"avgPrice":0.00296639,"btcPrice":{"time":1727740800000,"utcDate":"2024-10-01","open":63305.52,"close":60790,"high":64217,"low":60150.89,"avgPrice":62260.412,"volume":19449.702597201,"transactionsNumber":552553},"priceType":"BTC"},"6m":{"close":0.00313862,"high":0.00315606,"low":0.00306891,"transactionsNumber":501252,"open":0.00308693,"time":1719806400000,"utcDate":"2024-07-01","volume":40501333,"avgPrice":0.00310457,"btcPrice":{"time":1719792000000,"utcDate":"2024-07-01","open":62680.4,"close":62830.13,"high":63911,"low":62448.46,"avgPrice":63163.0605,"volume":14426.163916093907,"transactionsNumber":394680},"priceType":"BTC"},"ytd":{"close":0.00343594,"high":0.00362443,"low":0.00341536,"transactionsNumber":353439,"open":0.00362443,"time":1704067200000,"utcDate":"2024-01-01","volume":39728704,"avgPrice":0.00353308,"btcPrice":{"time":1704067200000,"utcDate":"2024-01-01","open":42241.1,"close":44220.78,"high":44240.8,"low":42175.65,"avgPrice":43114.6615,"volume":11571.132272252362,"transactionsNumber":219298},"priceType":"BTC"},"1y":{"close":0.00343594,"high":0.00362443,"low":0.00341536,"transactionsNumber":353439,"open":0.00362443,"time":1704067200000,"utcDate":"2024-01-01","volume":39728704,"avgPrice":0.00353308,"btcPrice":{"time":1704067200000,"utcDate":"2024-01-01","open":42241.1,"close":44220.78,"high":44240.8,"low":42175.65,"avgPrice":43114.6615,"volume":11571.132272252362,"transactionsNumber":219298},"priceType":"BTC"},"latest":{"close":0.00231,"high":0.0023247,"low":0.00231328,"open":0.00231834,"time":1735659114000,"utcDate":"2024-12-31","volume":4939244,"avgPrice":0.00231612,"btcPrice":{"time":1735659114000,"utcDate":"2024-12-31","open":95490.93,"close":95491.91,"high":95624,"low":95490.93,"avgPrice":95591.1047,"volume":0.21839417},"priceType":"BTC"}}}`,
			exponentMap:        RostExponentMap,
			expectedPriceMap: map[string]uint64{
				AMZN_TICKER: uint64(231),
			},
		},
		"Success - decimals beyond supported precision ignored": {
			responseJsonString: `{"AMZN":{"1d":{"close":0.00238822,"high":0.00241522,"low":0.0023567,"transactionsNumber":34827,"open":0.0023567,"time":1735534800000,"utcDate":"2024-12-30","volume":28286986,"avgPrice":0.00237444,"btcPrice":{"time":1735516800000,"utcDate":"2024-12-30","open":93376.27,"close":92663.04,"high":95135,"low":91256.6,"avgPrice":93012.7465,"volume":22710.79326409,"transactionsNumber":788834},"priceType":"BTC"},"2d":{"close":0.00239143,"high":0.0024158,"low":0.00236097,"transactionsNumber":381052,"open":0.00236965,"time":1735430400000,"utcDate":"2024-12-29","volume":26959407,"avgPrice":0.0023708,"btcPrice":{"time":1735430400000,"utcDate":"2024-12-29","open":95204.1,"close":93563.35,"high":95559,"low":92841.48,"avgPrice":94062.4698,"volume":4701.453980039659,"transactionsNumber":449189},"priceType":"BTC"},"7d":{"close":0.00232315,"high":0.00239642,"low":0.00229354,"transactionsNumber":203027,"open":0.00239642,"time":1735016400000,"utcDate":"2024-12-24","volume":14710826,"avgPrice":0.00235284,"btcPrice":{"time":1734998400000,"utcDate":"2024-12-24","open":94699.4,"close":98594.47,"high":99554,"low":93426.25,"avgPrice":97051.9624,"volume":15474.436602476959,"transactionsNumber":773221},"priceType":"BTC"},"1m":{"close":0.0021374,"high":0.00214058,"low":0.00210347,"transactionsNumber":263661,"open":0.00213392,"time":1733011200000,"utcDate":"2024-12-01","volume":23383406,"avgPrice":0.00213071,"btcPrice":{"time":1733011200000,"utcDate":"2024-12-01","open":96456.3,"close":97263.18,"high":97988,"low":95753.42,"avgPrice":97003.6416,"volume":5405.9278398514025,"transactionsNumber":465123},"priceType":"BTC"},"3m":{"close":0.0030454,"high":0.00306284,"low":0.00292076,"transactionsNumber":439973,"open":0.00292076,"time":1727755200000,"utcDate":"2024-10-01","volume":33896996,"avgPrice":0.00296639,"btcPrice":{"time":1727740800000,"utcDate":"2024-10-01","open":63305.52,"close":60790,"high":64217,"low":60150.89,"avgPrice":62260.412,"volume":19449.702597201,"transactionsNumber":552553},"priceType":"BTC"},"6m":{"close":0.00313862,"high":0.00315606,"low":0.00306891,"transactionsNumber":501252,"open":0.00308693,"time":1719806400000,"utcDate":"2024-07-01","volume":40501333,"avgPrice":0.00310457,"btcPrice":{"time":1719792000000,"utcDate":"2024-07-01","open":62680.4,"close":62830.13,"high":63911,"low":62448.46,"avgPrice":63163.0605,"volume":14426.163916093907,"transactionsNumber":394680},"priceType":"BTC"},"ytd":{"close":0.00343594,"high":0.00362443,"low":0.00341536,"transactionsNumber":353439,"open":0.00362443,"time":1704067200000,"utcDate":"2024-01-01","volume":39728704,"avgPrice":0.00353308,"btcPrice":{"time":1704067200000,"utcDate":"2024-01-01","open":42241.1,"close":44220.78,"high":44240.8,"low":42175.65,"avgPrice":43114.6615,"volume":11571.132272252362,"transactionsNumber":219298},"priceType":"BTC"},"1y":{"close":0.00343594,"high":0.00362443,"low":0.00341536,"transactionsNumber":353439,"open":0.00362443,"time":1704067200000,"utcDate":"2024-01-01","volume":39728704,"avgPrice":0.00353308,"btcPrice":{"time":1704067200000,"utcDate":"2024-01-01","open":42241.1,"close":44220.78,"high":44240.8,"low":42175.65,"avgPrice":43114.6615,"volume":11571.132272252362,"transactionsNumber":219298},"priceType":"BTC"},"latest":{"close":0.00231946,"high":0.0023247,"low":0.00231328,"open":0.00231834,"time":1735659114000,"utcDate":"2024-12-31","volume":4939244,"avgPrice":0.00231612,"btcPrice":{"time":1735659114000,"utcDate":"2024-12-31","open":95490.93,"close":95491.91,"high":95624,"low":95490.93,"avgPrice":95591.1047,"volume":0.21839417},"priceType":"BTC"}}}`,
			exponentMap:        RostExponentMap,
			expectedPriceMap: map[string]uint64{
				AMZN_TICKER: uint64(231),
			},
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			response := testutil.CreateResponseFromJson(tc.responseJsonString)
			var prices map[string]uint64
			var unavailable map[string]error
			var err error
			if tc.medianFunctionFails {
				prices, unavailable, err = rost.RostPriceFunction(response, tc.exponentMap, testutil.MedianErr)
			} else {
				prices, unavailable, err = rost.RostPriceFunction(response, tc.exponentMap, lib.Median[uint64])
			}
			if tc.expectedError != nil {
				require.EqualError(t, err, tc.expectedError.Error())
				require.Nil(t, prices)
				require.Nil(t, unavailable)
			} else {
				require.Equal(t, tc.expectedPriceMap, prices)
				pricefeed.ErrorMapsEqual(t, tc.expectedUnavailableMap, unavailable)
				require.NoError(t, err)
			}
		})
	}
}