//go:build all || integration_test

package cli_test

import (
	"fmt"
	"strconv"
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/network"
	pricestestutil "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/client/testutil"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/client/cli"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	tmcli "github.com/cometbft/cometbft/libs/cli"
	"github.com/cosmos/cosmos-sdk/client"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	"github.com/h2non/gock"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func setupNetwork(
	t *testing.T,
) (
	*network.Network,
	client.Context,
) {
	// Gock setup.
	defer gock.Off()         // Flush pending mocks after test execution.
	gock.DisableNetworking() // Disables real networking.xw
	pricestestutil.SetupSDaiResponse(t)

	t.Helper()
	cfg := network.DefaultConfig(nil)

	// Init state.
	state := types.GenesisState{}
	require.NoError(t, cfg.Codec.UnmarshalJSON(cfg.GenesisState[types.ModuleName], &state))

	state = *types.DefaultGenesis()

	buf, err := cfg.Codec.MarshalJSON(&state)
	require.NoError(t, err)
	cfg.GenesisState[types.ModuleName] = buf
	net := network.New(t, cfg)
	ctx := net.Validators[0].ClientCtx

	return net, ctx
}

func TestListLimiterParams(t *testing.T) {
	net, ctx := setupNetwork(t)

	out, err := clitestutil.ExecTestCLICmd(
		ctx,
		cli.CmdListLimitParams(),
		[]string{fmt.Sprintf("--%s=json", tmcli.OutputFlag)},
	)

	require.NoError(t, err)
	var resp types.ListLimitParamsResponse
	require.NoError(t, net.Config.Codec.UnmarshalJSON(out.Bytes(), &resp))
	require.Equal(t, types.DefaultGenesis().LimitParamsList, resp.LimitParamsList)
}
