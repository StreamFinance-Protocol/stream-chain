package types

// DONTCOVER

import (
	errorsmod "cosmossdk.io/errors"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
)

// Panic strings
const (
	ErrMatchUpdatesMustHaveTwoPerpetualUpdates = "internalCanUpdateSubaccounts: MATCH subaccount updates must consist of " +
		"exactly 2 perpetual updates, got settledUpdates: %+v"
	ErrMatchUpdatesMustHaveTwoUpdates = "internalCanUpdateSubaccounts: MATCH subaccount updates must consist of " +
		"exactly 2 updates, got settledUpdates: %+v"
	ErrMatchUpdatesMustUpdateOnePerp = "internalCanUpdateSubaccounts: MATCH subaccount updates must each have " +
		"exactly 1 PerpetualUpdate, got settledUpdates: %+v"
	ErrMatchUpdatesMustBeSamePerpId = "internalCanUpdateSubaccounts: MATCH subaccount updates must consists of two " +
		"updates on same perpetual Id, got settledUpdates: %+v"
	ErrMatchUpdatesInvalidSize = "internalCanUpdateSubaccounts: MATCH subaccount updates must consists of two " +
		"updates of equal absolute base quantums and opposite sign: %+v"
)

// x/subaccounts module sentinel errors
var (
	// 0 - 99: generic.
	ErrIntegerOverflow   = errorsmod.Register(ModuleName, 0, "integer overflow")
	ErrRatConversion     = errorsmod.Register(ModuleName, 1, "could not convert rat to string")
	ErrPositionIsNil     = errorsmod.Register(ModuleName, 2, "position is nil")
	ErrSubaccountIdIsNil = errorsmod.Register(ModuleName, 3, "subaccount Id is nil")

	// 100 - 199: update related.
	ErrNonUniqueUpdatesPosition = errorsmod.Register(
		ModuleName, 100, "multiple updates were specified for the same position id")
	ErrNonUniqueUpdatesSubaccount = errorsmod.Register(
		ModuleName, 101, "multiple updates were specified for the same subaccountId")
	ErrFailedToUpdateSubaccounts                            = errorsmod.Register(ModuleName, 102, "failed to apply subaccount updates")
	ErrProductPositionNotUpdatable                          = errorsmod.Register(ModuleName, 103, "product position is not updatable")
	ErrGlobalYieldsIndexNil                                 = errorsmod.Register(ModuleName, 104, "general yields index is nil")
	ErrGlobalYieldsIndexNegative                            = errorsmod.Register(ModuleName, 105, "general yields index is negative")
	ErrYieldsIndexUninitialized                             = errorsmod.Register(ModuleName, 106, "yields index for subaccount is badly initialised to empty string")
	ErrPerpYieldsIndexUninitialized                         = errorsmod.Register(ModuleName, 107, "yields index for perpetual is badly initialised to empty string")
	ErrGeneralYieldsIndexSmallerThanYieldsIndexInSubaccount = errorsmod.Register(ModuleName, 108, "general yields index is less than the current yields index")
	ErrNoYieldsToClaim                                      = errorsmod.Register(ModuleName, 109, "there is no yields to claim for subaccount")
	ErrYieldsClaimedNegative                                = errorsmod.Register(ModuleName, 110, "subaccount has negative total yields claim")
	ErrTryingToDepositNegativeYields                        = errorsmod.Register(ModuleName, 111, "attempting to deposit negative yields into collateral pool")

	// 200 - 299: subaccount id related.
	ErrInvalidSubaccountIdNumber = errorsmod.Register(
		ModuleName,
		200,
		"subaccount id number cannot exceed "+lib.IntToString(MaxSubaccountIdNumber),
	)
	ErrInvalidSubaccountIdOwner = errorsmod.Register(ModuleName, 201, "subaccount id owner is an invalid address")
	ErrDuplicateSubaccountIds   = errorsmod.Register(ModuleName, 202, "duplicate subaccount id found in genesis")

	// 300 - 399: asset position related.
	ErrAssetPositionZeroQuantum             = errorsmod.Register(ModuleName, 301, "asset position's quantum cannot be zero")
	ErrNegativeAssetYieldsIndexNotSupported = errorsmod.Register(ModuleName, 304, "negative asset yields index not supported")

	// 400 - 499: perpetual position related.
	ErrPerpPositionsOutOfOrder = errorsmod.Register(ModuleName, 400, "perpetual positions are out of order")
	ErrPerpPositionZeroQuantum = errorsmod.Register(
		ModuleName,
		401,
		"perpetual position's quantum cannot be zero",
	)
	ErrCannotModifyPerpOpenInterestForOIMF = errorsmod.Register(
		ModuleName,
		402,
		"cannot modify perpetual open interest for OIMF calculation",
	)
	ErrCannotRevertPerpOpenInterestForOIMF = errorsmod.Register(
		ModuleName,
		403,
		"cannot revert perpetual open interest for OIMF calculation",
	)
	ErrPerpetualPositionPriceNotPresentForEpoch = errorsmod.Register(
		ModuleName,
		404,
		"price for perpetual position not found for epoch",
	)

	// 500 - 599: transfer related.
	ErrAssetTransferQuantumsNotPositive = errorsmod.Register(
		ModuleName, 500, "asset transfer quantums is not positive")
	ErrYieldsClaim = errorsmod.Register(
		ModuleName, 502, "error when claiming yields for subaccount")
)
