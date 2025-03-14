// nolint:lll
package metrics

// Metrics Keys Guidelines
// 1. Be wary of length
// 2. Prefix by module
// 3. Suffix keys with a unit of measurement
// 4. Delimit with '_'
// 5. Information such as callback type should be added as tags, not in key names.

// Metrics Keys
const (
	// Stats
	SubaccountsNegativeTncSubaccountSeen = "negative_tnc_subaccount_seen"
	ChainOutageSeen                      = "chain_outage_seen"
	SubaccountCreatedCount               = "subaccount_created_count"

	// Gauges
	SendingProcessDepositToSubaccount = "sending_process_deposit_to_subaccount"

	// Measure Since
	DaemonGetAllMarketPricesLatency       = "daemon_get_all_market_prices_latency"
	DaemonGetMarketPricesPaginatedLatency = "daemon_get_market_prices_paginated_latency"
)
