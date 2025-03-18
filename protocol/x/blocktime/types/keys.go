package types

// Module name and store keys
const (
	// ModuleName defines the module name
	ModuleName = "blocktime"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// OutageHeightKey is the key for the store key that
	// stores the last block a chain outage was seen.
	OutageHeightKey = "Outage:"
)

// State
const (
	// PreviousBlockInfoKey defines the key for PreviousBlockInfo
	PreviousBlockInfoKey = "PreviousBlockInfo"
)
