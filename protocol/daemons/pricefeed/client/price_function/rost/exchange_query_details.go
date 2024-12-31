package rost
import (
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/pricefeed/client/constants/exchange_common"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/pricefeed/client/types"
)
var (
	RostDetails = types.ExchangeQueryDetails{
		Exchange:      exchange_common.EXCHANGE_ID_ROST,
		Url:           "https://rost.pu.mba/api/vX/candles?apiKey=API_KEY&ticker=$",
		PriceFunction: RostPriceFunction,
		IsMultiMarket: false,
	}
)