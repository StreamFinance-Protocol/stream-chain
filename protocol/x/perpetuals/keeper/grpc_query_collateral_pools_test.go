package keeper_test

import (
	"context"
	"testing"

	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	abci "github.com/cometbft/cometbft/abci/types"
	"github.com/cometbft/cometbft/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
)

func TestAllCollateralPools(
	t *testing.T,
) {
	tApp := testapp.NewTestAppBuilder(t).
		WithGenesisDocFn(func() types.GenesisDoc {
			genesis := testapp.DefaultGenesis()
			testapp.UpdateGenesisDocWithAppStateForModule(&genesis, func(state *perptypes.GenesisState) {
				state.CollateralPools = constants.CollateralPools
			})
			return genesis
		}).Build()

	tApp.InitChain()

	request := perptypes.QueryAllCollateralPoolsRequest{}
	abciResponse, err := tApp.App.Query(
		context.Background(),
		&abci.RequestQuery{
			Path: "/klyraprotocol.perpetuals.Query/AllCollateralPools",
			Data: tApp.App.AppCodec().MustMarshal(&request),
		})
	require.NoError(t, err)
	require.True(t, abciResponse.IsOK())

	var actual perptypes.QueryAllCollateralPoolsResponse
	tApp.App.AppCodec().MustUnmarshal(abciResponse.Value, &actual)

	expected := perptypes.QueryAllCollateralPoolsResponse{
		CollateralPools: constants.CollateralPools,
		Pagination: &query.PageResponse{
			NextKey: nil,
			Total:   uint64(len(constants.CollateralPools)),
		},
	}
	require.Equal(t, expected, actual)
}
