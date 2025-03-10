package app_test

import (
	"reflect"
	"strings"
	"testing"
	"time"

	bridgemodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge"

	evidencemodule "cosmossdk.io/x/evidence"
	feegrantmodule "cosmossdk.io/x/feegrant/module"
	"cosmossdk.io/x/upgrade"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/flags"
	custommodule "github.com/StreamFinance-Protocol/stream-chain/protocol/app/module"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	assetsmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets"
	blocktimemodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime"
	clobmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob"
	delaymsgmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/delaymsg"
	epochsmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/epochs"
	feetiersmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/feetiers"
	govplusmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/govplus"
	perpetualsmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals"
	pricesmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices"
	sendingmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/sending"
	statsmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/stats"
	subaccountsmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts"
	yieldmodule "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yield"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/x/auth"
	authzmodule "github.com/cosmos/cosmos-sdk/x/authz/module"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/cosmos/cosmos-sdk/x/consensus"
	"github.com/cosmos/cosmos-sdk/x/crisis"
	distr "github.com/cosmos/cosmos-sdk/x/distribution"
	"github.com/cosmos/cosmos-sdk/x/genutil"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	"github.com/cosmos/cosmos-sdk/x/gov"
	govclient "github.com/cosmos/cosmos-sdk/x/gov/client"
	"github.com/cosmos/cosmos-sdk/x/params"
	paramsclient "github.com/cosmos/cosmos-sdk/x/params/client"
	"github.com/cosmos/cosmos-sdk/x/staking"
	"github.com/stretchr/testify/require"
	"gopkg.in/typ.v4/slices"
)

func getUninitializedStructFields(reflectedStruct reflect.Value) []string {
	var uninitializedFields []string

	for i := 0; i < reflectedStruct.NumField(); i++ {
		field := reflectedStruct.Field(i)
		if field.IsZero() {
			uninitializedFields = append(uninitializedFields, reflectedStruct.Type().Field(i).Name)
		}
	}
	return uninitializedFields
}

func getMapFieldsAndTypes(reflectedMap reflect.Value) map[string]reflect.Type {
	fieldTypes := map[string]reflect.Type{}
	for _, key := range reflectedMap.MapKeys() {
		keyName := key.String()
		fieldTypes[keyName] = reflectedMap.MapIndex(key).Type()
	}
	return fieldTypes
}

func TestAppIsFullyInitialized(t *testing.T) {
	tests := map[string]struct {
		customFlags map[string]interface{}
	}{
		"default app": {
			customFlags: map[string]interface{}{},
		},
		"nonvalidating node app": {
			customFlags: map[string]interface{}{
				flags.NonValidatingFullNodeFlag: true,
			},
		},
		"validating node app": {
			customFlags: map[string]interface{}{
				flags.NonValidatingFullNodeFlag: false,
			},
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			tApp := testapp.NewTestAppBuilder(t).WithAppOptions(tc.customFlags).Build()
			tApp.InitChain()
			uninitializedFields := getUninitializedStructFields(reflect.ValueOf(*tApp.App))
			expectedUninitializedFields := []string{
				// Note that the daemon clients are currently hard coded as disabled in GetDefaultTestAppOptions.
				// Normally they would be only disabled for non-validating full nodes or for nodes where any
				// daemon is explicitly disabled.
				"PriceFeedClient",
				"SDAIClient",
				"DeleveragingClient",
				"BridgeClient",

				// Any default constructed type can be considered initialized if the default is what is
				// expected. getUninitializedStructFields relies on fields being the non-default and
				// reports the following as uninitialized.
				"event",
			}
			for _, field := range expectedUninitializedFields {
				if idx := slices.Index(uninitializedFields, field); idx >= 0 {
					slices.Remove(&uninitializedFields, idx)
				}
			}

			require.Len(
				t,
				uninitializedFields,
				0,
				"The following top-level App fields were unset: %s",
				strings.Join(uninitializedFields, ", "),
			)
		})
	}
}

func TestAppPanicsWithGrpcDisabled(t *testing.T) {
	customFlags := map[string]interface{}{
		flags.GrpcEnable: false,
	}
	require.Panics(t, func() { testapp.DefaultTestApp(customFlags) })
}
func TestBaseApp(t *testing.T) {
	klyraApp := testapp.DefaultTestApp(nil)
	require.NotNil(t, klyraApp.GetBaseApp(), "Expected non-nil BaseApp")
}

func TestLegacyAmino(t *testing.T) {
	klyraApp := testapp.DefaultTestApp(nil)
	require.NotNil(t, klyraApp.LegacyAmino(), "Expected non-nil LegacyAmino")
}

func TestAppCodec(t *testing.T) {
	klyraApp := testapp.DefaultTestApp(nil)
	require.NotNil(t, klyraApp.AppCodec(), "Expected non-nil AppCodec")
}

func TestInterfaceRegistry(t *testing.T) {
	klyraApp := testapp.DefaultTestApp(nil)
	require.NotNil(t, klyraApp.InterfaceRegistry(), "Expected non-nil InterfaceRegistry")
}

func TestTxConfig(t *testing.T) {
	klyraApp := testapp.DefaultTestApp(nil)
	require.NotNil(t, klyraApp.TxConfig(), "Expected non-nil TxConfig")
}

func TestDefaultGenesis(t *testing.T) {
	klyraApp := testapp.DefaultTestApp(nil)
	require.NotNil(t, klyraApp.DefaultGenesis(), "Expected non-nil DefaultGenesis")
}

func TestSimulationManager(t *testing.T) {
	klyraApp := testapp.DefaultTestApp(nil)
	require.Nil(t, klyraApp.SimulationManager(), "Expected nil SimulationManager")
}

func TestModuleBasics(t *testing.T) {
	defaultAppModuleBasics := module.NewBasicManager(
		auth.AppModuleBasic{},
		genutil.NewAppModuleBasic(genutiltypes.DefaultMessageValidator),
		bank.AppModuleBasic{},
		staking.AppModuleBasic{},
		distr.AppModuleBasic{},
		gov.NewAppModuleBasic(
			[]govclient.ProposalHandler{
				paramsclient.ProposalHandler,
			},
		),
		params.AppModuleBasic{},
		crisis.AppModuleBasic{},
		custommodule.SlashingModuleBasic{},
		evidencemodule.AppModuleBasic{},
		feegrantmodule.AppModuleBasic{},
		upgrade.AppModuleBasic{},
		consensus.AppModuleBasic{},
		authzmodule.AppModuleBasic{},

		// Custom modules
		pricesmodule.AppModuleBasic{},
		assetsmodule.AppModuleBasic{},
		blocktimemodule.AppModuleBasic{},
		bridgemodule.AppModuleBasic{},
		feetiersmodule.AppModuleBasic{},
		perpetualsmodule.AppModuleBasic{},
		statsmodule.AppModuleBasic{},
		subaccountsmodule.AppModuleBasic{},
		clobmodule.AppModuleBasic{},
		sendingmodule.AppModuleBasic{},
		govplusmodule.AppModuleBasic{},
		delaymsgmodule.AppModuleBasic{},
		epochsmodule.AppModuleBasic{},
		yieldmodule.AppModuleBasic{},
	)

	app := testapp.DefaultTestApp(nil)

	expectedFieldTypes := getMapFieldsAndTypes(reflect.ValueOf(defaultAppModuleBasics))
	actualFieldTypes := getMapFieldsAndTypes(reflect.ValueOf(app.ModuleBasics))
	require.Equal(t, expectedFieldTypes, actualFieldTypes, "Module basics does not match expected")
}

func TestRegisterDaemonWithHealthMonitor_Panics(t *testing.T) {
	app := testapp.DefaultTestApp(nil)
	hc := &mocks.HealthCheckable{}
	hc.On("ServiceName").Return("test-service")
	hc.On("HealthCheck").Return(nil)

	app.RegisterDaemonWithHealthMonitor(hc, 5*time.Minute)
	// The second registration should fail, causing a panic.
	require.PanicsWithError(
		t,
		"service test-service already registered",
		func() { app.RegisterDaemonWithHealthMonitor(hc, 5*time.Minute) },
	)
}
