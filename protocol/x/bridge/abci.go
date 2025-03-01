package bridge

import (
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// EndBlocker executes all ABCI EndBlock logic respective to the bridge module.
func EndBlocker(ctx sdk.Context, k types.BridgeKeeper) error {
	return k.SendWithdrawalEventsToEventManager(ctx)
}
