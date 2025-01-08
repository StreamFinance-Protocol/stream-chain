package app_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/app"
	bridgemoduletypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	perpetualsmoduletypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	ratelimittypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	icatypes "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/types"
	ibctransfertypes "github.com/cosmos/ibc-go/v8/modules/apps/transfer/types"
	"github.com/stretchr/testify/require"
)

func TestModuleAccountsToAddresses(t *testing.T) {
	expectedModuleAccToAddresses := map[string]string{
		authtypes.FeeCollectorName:              "klyra17xpfvakm2amg962yls6f84z3kell8c5lx3ctrp",
		bridgemoduletypes.ModuleName:            "klyra1zlefkpe3g0vvm9a4h0jf9000lmqutlh9dl8uc8",
		distrtypes.ModuleName:                   "klyra1jv65s3grqf6v6jl3dp4t6c9t9rk99cd83hlhpr",
		stakingtypes.BondedPoolName:             "klyra1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3rnjy3t",
		stakingtypes.NotBondedPoolName:          "klyra1tygms3xhhs3yv487phx3dw4a95jn7t7lhnw48l",
		govtypes.ModuleName:                     "klyra10d07y265gmmuvt4z0w9aw880jnsr700jv2gw70",
		ibctransfertypes.ModuleName:             "klyra1yl6hdjhmkf37639730gffanpzndzdpmhchdzll",
		satypes.ModuleName:                      "klyra1v88c3xv9xyv3eetdx0tvcmq7ung3dywptd5ps3",
		perpetualsmoduletypes.InsuranceFundName: "klyra1c7ptc87hkd54e3r7zjy92q29xkq7t79w9y9stt",
		icatypes.ModuleName:                     "klyra1vlthgax23ca9syk7xgaz347xmf4nunef3qduyv",
		ratelimittypes.SDaiPoolAccount:          "klyra1r3fsd6humm0ghyq0te5jf8eumklmclyaw0hs3y",
		satypes.LiquidityFeeModuleAddress:       "klyra1l4fct6xefgds6tsslrluwy2juuyaet366dl234",
	}

	require.True(t, len(expectedModuleAccToAddresses) == len(app.GetMaccPerms()))
	for acc, address := range expectedModuleAccToAddresses {
		expectedAddr := authtypes.NewModuleAddress(acc).String()
		require.Equal(t, address, expectedAddr, "module (%v) should have address (%s)", acc, expectedAddr)
	}
}

func TestBlockedAddresses(t *testing.T) {
	expectedBlockedAddresses := map[string]bool{
		"klyra17xpfvakm2amg962yls6f84z3kell8c5lx3ctrp": true,
		"klyra1jv65s3grqf6v6jl3dp4t6c9t9rk99cd83hlhpr": true,
		"klyra1tygms3xhhs3yv487phx3dw4a95jn7t7lhnw48l": true,
		"klyra1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3rnjy3t": true,
		"klyra1yl6hdjhmkf37639730gffanpzndzdpmhchdzll": true,
		"klyra1vlthgax23ca9syk7xgaz347xmf4nunef3qduyv": true,
	}
	require.Equal(t, expectedBlockedAddresses, app.BlockedAddresses())
}

func TestMaccPerms(t *testing.T) {
	maccPerms := app.GetMaccPerms()
	expectedMaccPerms := map[string][]string{
		"bonded_tokens_pool":     {"burner", "staking"},
		"bridge":                 {"minter"},
		"distribution":           nil,
		"fee_collector":          nil,
		"gov":                    {"burner"},
		"insurance_fund":         nil,
		"not_bonded_tokens_pool": {"burner", "staking"},
		"subaccounts":            nil,
		"sDAIPoolAccount":        nil,
		"transfer":               {"minter", "burner"},
		"interchainaccounts":     nil,
		"liquidity_module":       nil,
	}
	require.Equal(t, expectedMaccPerms, maccPerms, "default macc perms list does not match expected")
}

func TestModuleAccountAddrs(t *testing.T) {
	expectedModuleAccAddresses := map[string]bool{
		"klyra17xpfvakm2amg962yls6f84z3kell8c5lx3ctrp": true, // x/auth.FeeCollector
		"klyra1zlefkpe3g0vvm9a4h0jf9000lmqutlh9dl8uc8": true, // x/bridge
		"klyra1jv65s3grqf6v6jl3dp4t6c9t9rk99cd83hlhpr": true, // x/distribution
		"klyra1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3rnjy3t": true, // x/staking.bondedPool
		"klyra1tygms3xhhs3yv487phx3dw4a95jn7t7lhnw48l": true, // x/staking.notBondedPool
		"klyra10d07y265gmmuvt4z0w9aw880jnsr700jv2gw70": true, // x/ gov
		"klyra1yl6hdjhmkf37639730gffanpzndzdpmhchdzll": true, // ibc transfer
		"klyra1vlthgax23ca9syk7xgaz347xmf4nunef3qduyv": true, // interchainaccounts
		"klyra1v88c3xv9xyv3eetdx0tvcmq7ung3dywptd5ps3": true, // x/subaccount
		"klyra1c7ptc87hkd54e3r7zjy92q29xkq7t79w9y9stt": true, // x/clob.insuranceFund
		"klyra1r3fsd6humm0ghyq0te5jf8eumklmclyaw0hs3y": true, // x/ratelimit.SDAIPoolAccount
		"klyra1l4fct6xefgds6tsslrluwy2juuyaet366dl234": true, // x/subaccount.LiquidityFeeModuleAddress
	}

	require.Equal(t, expectedModuleAccAddresses, app.ModuleAccountAddrs())
}
