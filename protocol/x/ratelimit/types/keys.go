package types

import (
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
)

// Module name and store keys
const (
	// ModuleName defines the module name
	// Use `ratelimit` instead of `ratelimit` to prevent potential key space conflicts with the IBC module.
	ModuleName = "ratelimit"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	/* For the sDAI middleware */

	// Addresses of tDAI and sDAI pools in x/bank module

	// TDaiPool: Address, where tDAI yield is held before it is claimed by subaccount.
	TDaiPoolAccount = "tDAIPoolAccount"
	// SDaiPool: Address, where bridged sDAI is held until it is bridged out.
	SDaiPoolAccount = "sDAIPoolAccount"

	// Denom of sDAI in the x/bank module
	SDaiDenom               = "ibc/DEEFE2DEFDC8EA8879923C4CCA42BB888C3CD03FF7ECFEFB1C2FEC27A732ACC8"
	SDaiBaseDenom           = "gsdai"
	SDaiBaseDenomPathPrefix = "transfer/channel-0"
	SDaiBaseDenomFullPath   = SDaiBaseDenomPathPrefix + "/" + SDaiBaseDenom
	SDaiDenomExponent       = -18

	// Denom of tDAI in the x/bank module
	TDaiDenom = assettypes.TDaiDenom

	// sDAIKeyPrefix is the prefix for the key-value store forthe sDAI price
	SDaiKeyPrefix = "SDAIPrice:"

	// SDAILastBlockUpdate is the prefix for the key-value store for the last block that the sDAI price was updated
	SDAILastBlockUpdate = "SDAILastBlockUpdate:"

	// AssetYieldIndexPrefix is the prefix for the key value store that tracks
	// the cumulative yield index across all yield epochs.
	AssetYieldIndexPrefix = "AssetYieldIndex:"
)

// State
const (

	// base 10
	BASE_10 = 10

	// Maker RAY value which stores decimal points
	SDAI_DECIMALS = 27

	SDAI_UPDATE_BLOCK_DELAY = 5000
)
