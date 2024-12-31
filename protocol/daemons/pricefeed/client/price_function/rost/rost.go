package rost
import (
	"fmt"
	"encoding/json"
	"net/http"
	"strconv"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/pricefeed/client/price_function"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/pricefeed/client/constants/exchange_common"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/pricefeed/types"
)
// RostResponse represents the full API response structure
type RostResponse map[string]struct {
    Latest struct {
        Close    float64 `json:"close"`
        High     float64 `json:"high"`
        Low      float64 `json:"low"`
        Open     float64 `json:"open"`
        Time     int64   `json:"time"`
        UtcDate  string  `json:"utcDate"`
        Volume   int64   `json:"volume"`
        AvgPrice float64 `json:"avgPrice"`
        BtcPrice struct {
            Time     int64   `json:"time"`
            UtcDate  string  `json:"utcDate"`
            Open     float64 `json:"open"`
            Close    float64 `json:"close"`
            High     float64 `json:"high"`
            Low      float64 `json:"low"`
            AvgPrice float64 `json:"avgPrice"`
            Volume   float64 `json:"volume"`
        } `json:"btcPrice"`
        PriceType string `json:"priceType"`
    } `json:"latest"`
}
// Keep RostTicker as is with string types and validations
type RostTicker struct {
    Pair      string `json:"symbol" validate:"required"`
    AskPrice  string `json:"askPrice" validate:"required,positive-float-string"`
    BidPrice  string `json:"bidPrice" validate:"required,positive-float-string"`
    LastPrice string `json:"lastPrice" validate:"required,positive-float-string"`
}
// Ensure that RostTicker implements the Ticker interface at compile time.
var _ price_function.Ticker = (*RostTicker)(nil)
func (t RostTicker) GetPair() string {
	// needs to be wrapped in quotes to be consistent with the API request format.
	return t.Pair
}
func (t RostTicker) GetAskPrice() string {
	return t.AskPrice
}
func (t RostTicker) GetBidPrice() string {
	return t.BidPrice
}
func (t RostTicker) GetLastPrice() string {
	return t.LastPrice
}
// RostPriceFunction transforms an API response from Rost into a map of tickers
// to prices that have been shifted by a market specific exponent.
func RostPriceFunction(
    response *http.Response,
    tickerToExponent map[string]int32,
    resolver types.Resolver,
) (tickerToPrice map[string]uint64, unavailableTickers map[string]error, err error) {
    ticker, _, err := price_function.GetOnlyTickerAndExponent(
        tickerToExponent,
        exchange_common.EXCHANGE_ID_ROST,
    )
    if err != nil {
        return nil, nil, err
    }
    var rostResponse RostResponse
    err = json.NewDecoder(response.Body).Decode(&rostResponse)
    if err != nil {
        return nil, nil, err
    }

    tickerData, exists := rostResponse[ticker]
    if !exists {
        return nil, map[string]error{
            ticker: fmt.Errorf("ticker %s not found in response", ticker),
        }, nil
    }
    // Convert float64 to string with proper formatting
    closePrice := strconv.FormatFloat(tickerData.Latest.Close, 'f', -1, 64)
    
    rostTicker := RostTicker{
        Pair:      ticker,
        LastPrice: closePrice,
        AskPrice:  closePrice,
        BidPrice:  closePrice,
    }
    return price_function.GetMedianPricesFromTickers(
        []RostTicker{rostTicker},
        tickerToExponent,
        resolver,
    )
}