package ante

import (
	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/ante/types"
	libante "github.com/StreamFinance-Protocol/stream-chain/protocol/lib/ante"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// FreeInfiniteGasDecorator is an AnteHandler that sets `GasMeter` to
// `FreeInfiniteGasMeter` for app-injected transactions.
// These transactions should not use any gas, and the sender should not be charged any gas.
// Using this meter means gas will never be consumed for these transactions.
// Also note that not explicitly setting a `gasMeter` means that the `gasMeter` from the previous transaction
// or from `BeginBlock` will be used. Not doing this could result in consensus failure as demonstrated in #869.
// Cosmos SDK expects an explicit call to `WithGasMeter` at the beginning of the AnteHandler chain.
type FreeInfiniteGasDecorator struct {
}

func NewFreeInfiniteGasDecorator() FreeInfiniteGasDecorator {
	return FreeInfiniteGasDecorator{}
}

func (dec FreeInfiniteGasDecorator) AnteHandle(
	ctx sdk.Context,
	tx sdk.Tx,
	simulate bool,
	next sdk.AnteHandler,
) (newCtx sdk.Context, err error) {

	// If this is a single app-injected msg tx, then set the gas meter to
	// FreeInfiniteGasMeter.
	if libante.IsSingleAppInjectedMsg(tx.GetMsgs()) {
		newCtx = ctx.WithGasMeter(types.NewFreeInfiniteGasMeter())
		return next(newCtx, tx, simulate)
	}

	return next(ctx, tx, simulate)
}
