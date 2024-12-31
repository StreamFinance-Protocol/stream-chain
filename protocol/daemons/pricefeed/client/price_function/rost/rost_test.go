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
			responseJsonString: `{"AMZN":{"1d":{"close":0.00225456,"high":0.00230719,"low":0.00222117,"transactionsNumber":968285,"open":0.00229539,"time":1731801600000,"utcDate":"2024-11-17","volume":84165461,"avgPrice":0.00227366,"btcPrice":89866.85},"2d":{"close":0.00223742,"high":0.00228966,"low":0.00220429,"transactionsNumber":968285,"open":0.00227054,"time":1731715200000,"utcDate":"2024-11-16","volume":84165461,"avgPrice":0.00223317,"btcPrice":90555.1},"7d":{"close":0.00233005,"high":0.00259253,"low":0.00231597,"transactionsNumber":424797,"open":0.00259253,"time":1731301200000,"utcDate":"2024-11-11","volume":29324727,"avgPrice":0.00244139,"btcPrice":88770.73},"1m":{"close":0.00276196,"high":0.00278753,"low":0.00272235,"transactionsNumber":375918,"open":0.00277671,"time":1729224000000,"utcDate":"2024-10-18","volume":36939177,"avgPrice":0.00276726,"btcPrice":68426.11},"3m":{"close":0.0030284,"high":0.00305029,"low":0.00297679,"transactionsNumber":368879,"open":0.00297679,"time":1723939200000,"utcDate":"2024-08-18","volume":30466567,"avgPrice":0.0029744,"btcPrice":58466.5},"6m":{"close":0.00275985,"high":0.00276882,"low":0.00273968,"transactionsNumber":339388,"open":0.0027409,"time":1715990400000,"utcDate":"2024-05-18","volume":32700331,"avgPrice":0.00275528,"btcPrice":66923.87},"ytd":{"close":0.00343594,"high":0.00362443,"low":0.00341536,"transactionsNumber":353439,"open":0.00362443,"time":1704067200000,"utcDate":"2024-01-01","volume":39728704,"avgPrice":0.00353308,"btcPrice":44220.78},"1y":{"close":0.00388273,"high":0.00389823,"low":0.00381226,"transactionsNumber":381168,"open":0.00389823,"time":1700352000000,"utcDate":"2023-11-19","volume":49361537,"avgPrice":0.00391439,"btcPrice":37391.19},"latest":{"close":0.00219,"high":0.00219062,"low":0.00218432,"open":0.00218458,"time":1731964657000,"utcDate":"2024-11-18","volume":34983450,"avgPrice":0.00218338,"btcPrice":92067.05}}}`,
			exponentMap:        RostExponentMap,
			expectedPriceMap: map[string]uint64{
				AMZN_TICKER: uint64(219),
			},
		},
		"Success - decimals beyond supported precision ignored": {
			responseJsonString: `{"AMZN":{"1d":{"close":0.00225456,"high":0.00230719,"low":0.00222117,"transactionsNumber":968285,"open":0.00229539,"time":1731801600000,"utcDate":"2024-11-17","volume":84165461,"avgPrice":0.00227366,"btcPrice":89866.85},"2d":{"close":0.00223742,"high":0.00228966,"low":0.00220429,"transactionsNumber":968285,"open":0.00227054,"time":1731715200000,"utcDate":"2024-11-16","volume":84165461,"avgPrice":0.00223317,"btcPrice":90555.1},"7d":{"close":0.00233005,"high":0.00259253,"low":0.00231597,"transactionsNumber":424797,"open":0.00259253,"time":1731301200000,"utcDate":"2024-11-11","volume":29324727,"avgPrice":0.00244139,"btcPrice":88770.73},"1m":{"close":0.00276196,"high":0.00278753,"low":0.00272235,"transactionsNumber":375918,"open":0.00277671,"time":1729224000000,"utcDate":"2024-10-18","volume":36939177,"avgPrice":0.00276726,"btcPrice":68426.11},"3m":{"close":0.0030284,"high":0.00305029,"low":0.00297679,"transactionsNumber":368879,"open":0.00297679,"time":1723939200000,"utcDate":"2024-08-18","volume":30466567,"avgPrice":0.0029744,"btcPrice":58466.5},"6m":{"close":0.00275985,"high":0.00276882,"low":0.00273968,"transactionsNumber":339388,"open":0.0027409,"time":1715990400000,"utcDate":"2024-05-18","volume":32700331,"avgPrice":0.00275528,"btcPrice":66923.87},"ytd":{"close":0.00343594,"high":0.00362443,"low":0.00341536,"transactionsNumber":353439,"open":0.00362443,"time":1704067200000,"utcDate":"2024-01-01","volume":39728704,"avgPrice":0.00353308,"btcPrice":44220.78},"1y":{"close":0.00388273,"high":0.00389823,"low":0.00381226,"transactionsNumber":381168,"open":0.00389823,"time":1700352000000,"utcDate":"2023-11-19","volume":49361537,"avgPrice":0.00391439,"btcPrice":37391.19},"latest":{"close":0.00219025,"high":0.00219062,"low":0.00218432,"open":0.00218458,"time":1731964657000,"utcDate":"2024-11-18","volume":34983450,"avgPrice":0.00218338,"btcPrice":92067.05}}}`,
			exponentMap:        RostExponentMap,
			expectedPriceMap: map[string]uint64{
				AMZN_TICKER: uint64(219),
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