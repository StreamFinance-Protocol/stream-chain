package keeper_test

import (
	"context"
	"math/big"
	"testing"

	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
)

func setupMsgServer(t *testing.T) (keeper.Keeper, types.MsgServer, context.Context) {
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()
	k := tApp.App.BridgeKeeper
	tApp.App.YieldsKeeper.SetSDAIPrice(ctx, big.NewInt(1000000000000000000))

	return k, keeper.NewMsgServerImpl(k), ctx
}
