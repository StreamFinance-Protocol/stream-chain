package flags

import (
	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

// List of CLI flags for Server and Client.
const (
	// Flag names
	FlagUnixSocketAddress           = "unix-socket-address"
	FlagPanicOnDaemonFailureEnabled = "panic-on-daemon-failure-enabled"
	FlagMaxDaemonUnhealthySeconds   = "max-daemon-unhealthy-seconds"

	FlagSDAIDaemonEnabled        = "sDai-daemon-enabled"
	FlagSDAIDaemonMockEnabled    = "sDAI-daemon-mock-enabled"
	FlagSDAIDaemonLoopDelayMs    = "sDAI-daemon-loop-delay-ms"
	FlagSDAIDaemonEthRpcEndpoint = "sDAI-daemon-eth-rpc-endpoint"

	FlagPriceDaemonEnabled     = "price-daemon-enabled"
	FlagPriceDaemonLoopDelayMs = "price-daemon-loop-delay-ms"

	FlagDeleveragingDaemonEnabled        = "deleveraging-daemon-enabled"
	FlagDeleveragingDaemonLoopDelayMs    = "deleveraging-daemon-loop-delay-ms"
	FlagDeleveragingDaemonQueryPageLimit = "deleveraging-daemon-query-page-limit"
)

// Shared flags contains configuration flags shared by all daemons.
type SharedFlags struct {
	// SocketAddress is the location of the unix socket to communicate with the daemon gRPC service.
	SocketAddress string
	// PanicOnDaemonFailureEnabled toggles whether the daemon should panic on failure.
	PanicOnDaemonFailureEnabled bool
	// MaxDaemonUnhealthySeconds is the maximum allowable duration for which a daemon can be unhealthy.
	MaxDaemonUnhealthySeconds uint32
}

// sDAIFlags contains configuration flags for the DAI Daemon.
type SDAIFlags struct {
	// Enabled toggles the DAI daemon on or off.
	Enabled bool
	// MockEnabled toggles the mock DAI daemon on or off.
	MockEnabled bool
	// LoopDelayMs configures the update frequency of the DAI daemon.
	LoopDelayMs uint32
	// EthRpcEndpoint is the endpoint for the Ethereum node where DAI data is queried.
	EthRpcEndpoint string
}

// DeleveragingFlags contains configuration flags for the Deleveraging Daemon.
type DeleveragingFlags struct {
	// Enabled toggles the deleveraging daemon on or off.
	Enabled bool
	// LoopDelayMs configures the update frequency of the deleveraging daemon.
	LoopDelayMs uint32
	// QueryPageLimit configures the pagination limit for fetching subaccounts.
	QueryPageLimit uint64
}

// PriceFlags contains configuration flags for the Price Daemon.
type PriceFlags struct {
	// Enabled toggles the price daemon on or off.
	Enabled bool
	// LoopDelayMs configures the update frequency of the price daemon.
	LoopDelayMs uint32
}

// DaemonFlags contains the collected configuration flags for all daemons.
type DaemonFlags struct {
	Shared       SharedFlags
	SDAI         SDAIFlags
	Price        PriceFlags
	Deleveraging DeleveragingFlags
}

var defaultDaemonFlags *DaemonFlags

// GetDefaultDaemonFlags returns the default values for the Daemon Flags using a singleton pattern.
func GetDefaultDaemonFlags() DaemonFlags {
	if defaultDaemonFlags == nil {
		defaultDaemonFlags = &DaemonFlags{
			Shared: SharedFlags{
				SocketAddress:               "/tmp/daemons.sock",
				PanicOnDaemonFailureEnabled: true,
				MaxDaemonUnhealthySeconds:   5 * 60, // 5 minutes.
			},
			SDAI: SDAIFlags{
				Enabled:        true,
				MockEnabled:    false,
				LoopDelayMs:    30_000,
				EthRpcEndpoint: "https://eth-mainnet.g.alchemy.com/v2/-IfChTcasSLaAOyyJMXRe5BbTT3uHG6I",
			},
			Deleveraging: DeleveragingFlags{
				Enabled:        true,
				LoopDelayMs:    1_600,
				QueryPageLimit: 1_000,
			},
			Price: PriceFlags{
				Enabled:     true,
				LoopDelayMs: 3_000,
			},
		}
	}
	return *defaultDaemonFlags
}

// AddDaemonFlagsToCmd adds the required flags to instantiate a server and client for
// price updates. These flags should be applied to the `start` command V4 Cosmos application.
// E.g. `dydxprotocold start --price-daemon-enabled=true --unix-socket-address $(unix_socket_address)`
func AddDaemonFlagsToCmd(
	cmd *cobra.Command,
) {
	//
	df := GetDefaultDaemonFlags()

	// Shared Flags.
	cmd.Flags().String(
		FlagUnixSocketAddress,
		df.Shared.SocketAddress,
		"Socket address for the daemons to send updates to, if not set "+
			"will establish default location to ingest daemon updates from",
	)
	cmd.Flags().Bool(
		FlagPanicOnDaemonFailureEnabled,
		df.Shared.PanicOnDaemonFailureEnabled,
		"Enables panicking when a daemon fails.",
	)
	cmd.Flags().Uint32(
		FlagMaxDaemonUnhealthySeconds,
		df.Shared.MaxDaemonUnhealthySeconds,
		"Maximum allowable duration for which a daemon can be unhealthy.",
	)

	// SDai Daemon.
	cmd.Flags().Bool(
		FlagSDAIDaemonEnabled,
		df.SDAI.Enabled,
		"Enable SDAI Daemon. Set to false for non-validator nodes.",
	)
	cmd.Flags().Bool(
		FlagSDAIDaemonMockEnabled,
		df.SDAI.MockEnabled,
		"Enable mock SDAI Daemon.",
	)
	cmd.Flags().Uint32(
		FlagSDAIDaemonLoopDelayMs,
		df.SDAI.LoopDelayMs,
		"Delay in milliseconds between running the sDAI Daemon task loop.",
	)
	cmd.Flags().String(
		FlagSDAIDaemonEthRpcEndpoint,
		df.SDAI.EthRpcEndpoint,
		"Ethereum Node Rpc Endpoint",
	)

	// Deleveraging Daemon.
	cmd.Flags().Bool(
		FlagDeleveragingDaemonEnabled,
		df.Deleveraging.Enabled,
		"Enable Deleveraging Daemon. Set to false for non-validator nodes.",
	)
	cmd.Flags().Uint32(
		FlagDeleveragingDaemonLoopDelayMs,
		df.Deleveraging.LoopDelayMs,
		"Delay in milliseconds between running the Deleveraging Daemon task loop.",
	)
	cmd.Flags().Uint64(
		FlagDeleveragingDaemonQueryPageLimit,
		df.Deleveraging.QueryPageLimit,
		"Limit on the number of items to fetch per query in the Deleveraging Daemon task loop.",
	)

	// Price Daemon.
	cmd.Flags().Bool(
		FlagPriceDaemonEnabled,
		df.Price.Enabled,
		"Enable Price Daemon. Set to false for non-validator nodes.",
	)
	cmd.Flags().Uint32(
		FlagPriceDaemonLoopDelayMs,
		df.Price.LoopDelayMs,
		"Delay in milliseconds between sending price updates to the application.",
	)
}

// GetDaemonFlagValuesFromOptions gets all daemon flag values from the `AppOptions` struct.
func GetDaemonFlagValuesFromOptions(
	appOpts servertypes.AppOptions,
) DaemonFlags {
	// Default value
	result := GetDefaultDaemonFlags()

	// Shared Flags
	if option := appOpts.Get(FlagUnixSocketAddress); option != nil {
		if v, err := cast.ToStringE(option); err == nil && len(v) > 0 {
			result.Shared.SocketAddress = v
		}
	}
	if option := appOpts.Get(FlagPanicOnDaemonFailureEnabled); option != nil {
		if v, err := cast.ToBoolE(option); err == nil {
			result.Shared.PanicOnDaemonFailureEnabled = v
		}
	}
	if option := appOpts.Get(FlagMaxDaemonUnhealthySeconds); option != nil {
		if v, err := cast.ToUint32E(option); err == nil {
			result.Shared.MaxDaemonUnhealthySeconds = v
		}
	}

	// SDai Daemon.
	if option := appOpts.Get(FlagSDAIDaemonEnabled); option != nil {
		if v, err := cast.ToBoolE(option); err == nil {
			result.SDAI.Enabled = v
		}
	}
	if option := appOpts.Get(FlagSDAIDaemonMockEnabled); option != nil {
		if v, err := cast.ToBoolE(option); err == nil {
			result.SDAI.MockEnabled = v
		}
	}
	if option := appOpts.Get(FlagSDAIDaemonLoopDelayMs); option != nil {
		if v, err := cast.ToUint32E(option); err == nil {
			result.SDAI.LoopDelayMs = v
		}
	}
	if option := appOpts.Get(FlagSDAIDaemonEthRpcEndpoint); option != nil {
		if v, err := cast.ToStringE(option); err == nil && len(v) > 0 {
			result.SDAI.EthRpcEndpoint = v
		}
	}

	// Deleveraging Daemon.
	if option := appOpts.Get(FlagDeleveragingDaemonEnabled); option != nil {
		if v, err := cast.ToBoolE(option); err == nil {
			result.Deleveraging.Enabled = v
		}
	}
	if option := appOpts.Get(FlagDeleveragingDaemonLoopDelayMs); option != nil {
		if v, err := cast.ToUint32E(option); err == nil {
			result.Deleveraging.LoopDelayMs = v
		}
	}
	if option := appOpts.Get(FlagDeleveragingDaemonQueryPageLimit); option != nil {
		if v, err := cast.ToUint64E(option); err == nil {
			result.Deleveraging.QueryPageLimit = v
		}
	}

	// Price Daemon.
	if option := appOpts.Get(FlagPriceDaemonEnabled); option != nil {
		if v, err := cast.ToBoolE(option); err == nil {
			result.Price.Enabled = v
		}
	}
	if option := appOpts.Get(FlagPriceDaemonLoopDelayMs); option != nil {
		if v, err := cast.ToUint32E(option); err == nil {
			result.Price.LoopDelayMs = v
		}
	}

	return result
}
