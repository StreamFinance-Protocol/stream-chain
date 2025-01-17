package keeper

import (
	"context"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
)

// AcknowledgeBridges acknowledges bridge events and sets them to complete
// at a later block.
func (k msgServer) BridgeWithdraw(
	goCtx context.Context,
	msg *types.MsgBridgeWithdraw,
) (*types.MsgBridgeWithdrawResponse, error) {
	ctx := lib.UnwrapSDKContext(goCtx, types.ModuleName)

	if err := k.Keeper.HandleSdaiWithdraw(ctx, msg.Withdraw); err != nil {
		return nil, err
	}

	return &types.MsgBridgeWithdrawResponse{}, nil
}
