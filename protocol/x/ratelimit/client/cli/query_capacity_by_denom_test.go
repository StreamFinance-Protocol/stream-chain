//go:build all || integration_test

package cli_test

import (
	"fmt"
	"math/big"
	"strconv"
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/client/cli"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	ratelimitutil "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/util"
	tmcli "github.com/cometbft/cometbft/libs/cli"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestQueryCapacityByDenom(t *testing.T) {
	net, ctx := setupNetwork(t)

	out, err := clitestutil.ExecTestCLICmd(ctx,
		cli.CmdQueryCapacityByDenom(),
		[]string{
			fmt.Sprintf("--%s=json", tmcli.OutputFlag),
			types.SDaiDenom,
		})

	require.NoError(t, err)
	var resp types.QueryCapacityByDenomResponse
	require.NoError(t, net.Config.Codec.UnmarshalJSON(out.Bytes(), &resp))
	require.Equal(t,
		// LimiterCapacity resulting from default limiter params and 0 TVL.
		[]types.LimiterCapacity{
			{
				Limiter: types.DefaultSDaiHourlyLimter,
				Capacity: dtypes.NewIntFromBigInt(
					ratelimitutil.GetBaseline(
						big.NewInt(0),
						types.DefaultSDaiHourlyLimter,
					),
				),
			},
			{
				Limiter: types.DefaultSDaiDailyLimiter,
				Capacity: dtypes.NewIntFromBigInt(
					ratelimitutil.GetBaseline(
						big.NewInt(0),
						types.DefaultSDaiDailyLimiter,
					),
				),
			},
		},
		resp.LimiterCapacityList)
}
