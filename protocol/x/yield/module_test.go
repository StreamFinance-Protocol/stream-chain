package yield_test

import (
	"bytes"
	"encoding/json"
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/module"
	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/yield"
	yield_keeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yield/keeper"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func createAppModule(t *testing.T) yield.AppModule {
	am, _, _ := createAppModuleWithKeeper(t)
	return am
}

// Returns the keeper and context along with the AppModule.
// This is useful for tests which want to write/read state
// to/from the keeper.
func createAppModuleWithKeeper(t *testing.T) (yield.AppModule, *yield_keeper.Keeper, sdk.Context) {
	appCodec := codec.NewProtoCodec(module.InterfaceRegistry)

	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()
	k := tApp.App.YieldKeeper

	return yield.NewAppModule(
		appCodec,
		k,
	), &k, ctx
}

func createAppModuleBasic(t *testing.T) yield.AppModuleBasic {
	appCodec := codec.NewProtoCodec(module.InterfaceRegistry)

	appModule := yield.NewAppModuleBasic(appCodec)
	require.NotNil(t, appModule)

	return appModule
}

func TestAppModule_Name(t *testing.T) {
	am := createAppModule(t)
	require.Equal(t, "yield", am.Name())
}

func TestAppModuleBasic_RegisterCodecLegacyAmino(t *testing.T) {
	am := createAppModuleBasic(t)

	cdc := codec.NewLegacyAmino()
	am.RegisterLegacyAminoCodec(cdc)

	var buf bytes.Buffer
	err := cdc.Amino.PrintTypes(&buf)
	require.NoError(t, err)
}

func TestAppModuleBasic_ValidateGenesisErr(t *testing.T) {
	tests := map[string]struct {
		genesisJson string
		expectedErr string
	}{
		"Invalid json": {
			genesisJson: `{"missingClosingQuote: true}`,
			expectedErr: "failed to unmarshal yield genesis state: unexpected EOF",
		},
		"Invalid state": {
			genesisJson: `{"foo":{}}`,
			expectedErr: "failed to unmarshal yield genesis state: unknown field \"foo\" in types.GenesisState",
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			am := createAppModuleBasic(t)

			cdc := codec.NewProtoCodec(module.InterfaceRegistry)

			err := am.ValidateGenesis(cdc, nil, json.RawMessage(tc.genesisJson))
			require.EqualError(t, err, tc.expectedErr)
		})
	}
}

func TestAppModuleBasic_GetTxCmd(t *testing.T) {
	am := createAppModuleBasic(t)

	cmd := am.GetTxCmd()
	require.Equal(t, "yield", cmd.Use)
	require.Equal(t, 0, len(cmd.Commands()))
}

func TestAppModuleBasic_GetQueryCmd(t *testing.T) {
	am := createAppModuleBasic(t)

	cmd := am.GetQueryCmd()

	require.Equal(t, "yield", cmd.Use)
	require.Equal(t, 2, len(cmd.Commands()))
	require.Equal(t, "get-asset-yield-index", cmd.Commands()[0].Name())
	require.Equal(t, "get-sdai-price", cmd.Commands()[1].Name())
}
