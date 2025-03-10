package types

// DONTCOVER

import errorsmod "cosmossdk.io/errors"

// x/yield module sentinel errors
var (
	ErrUnableToDecodeBigInt = errorsmod.Register(
		ModuleName,
		1001,
		"Unable to decode bigint",
	)
	ErrInvalidSDAIConversionRate = errorsmod.Register(
		ModuleName,
		1002,
		"Proposed SDAI conversion rate is invalid",
	)
	ErrFailedSDaiToTDaiConversion = errorsmod.Register(
		ModuleName,
		1003,
		"Failed to convert sDai amount to corresponding TDai Amount",
	)
)
