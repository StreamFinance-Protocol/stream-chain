package app_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/app"
	perpetualsmoduletypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	ratelimittypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	rewardsmoduletypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/rewards/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	vestmoduletypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/vest/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	icatypes "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/types"
	ibctransfertypes "github.com/cosmos/ibc-go/v8/modules/apps/transfer/types"
	consumertypes "github.com/ethos-works/ethos/ethos-chain/x/ccv/consumer/types"
	"github.com/stretchr/testify/require"
)

func TestModuleAccountsToAddresses(t *testing.T) {
	expectedModuleAccToAddresses := map[string]string{
		authtypes.FeeCollectorName: "dydx17xpfvakm2amg962yls6f84z3kell8c5leqdyt2",

		ibctransfertypes.ModuleName:                  "dydx1yl6hdjhmkf37639730gffanpzndzdpmh8xcdh5",
		satypes.ModuleName:                           "dydx1v88c3xv9xyv3eetdx0tvcmq7ung3dywp5upwc6",
		perpetualsmoduletypes.InsuranceFundName:      "dydx1c7ptc87hkd54e3r7zjy92q29xkq7t79w64slrq",
		icatypes.ModuleName:                          "dydx1vlthgax23ca9syk7xgaz347xmf4nunefw3cnv8",
		consumertypes.ConsumerRedistributeName:       "dydx1x69dz0c0emw8m2c6kp5v6c08kgjxmu30yn6p5y",
		consumertypes.ConsumerToSendToProviderName:   "dydx1ywtansy6ss0jtq8ckrcv6jzkps8yh8mf37gcch",
		ratelimittypes.SDaiPoolAccount:               "dydx1r3fsd6humm0ghyq0te5jf8eumklmclya37zle0",
		satypes.LiquidityFeeModuleAddress:            "dydx1l4fct6xefgds6tsslrluwy2juuyaet369u29e7",
		rewardsmoduletypes.TreasuryAccountName:       "dydx16wrau2x4tsg033xfrrdpae6kxfn9kyuerr5jjp",
		rewardsmoduletypes.VesterAccountName:         "dydx1ltyc6y4skclzafvpznpt2qjwmfwgsndp458rmp",
		vestmoduletypes.CommunityTreasuryAccountName: "dydx15ztc7xy42tn2ukkc0qjthkucw9ac63pgp70urn",
		vestmoduletypes.CommunityVesterAccountName:   "dydx1wxje320an3karyc6mjw4zghs300dmrjkwn7xtk",
	}

	require.True(t, len(expectedModuleAccToAddresses) == len(app.GetMaccPerms()))
	for acc, address := range expectedModuleAccToAddresses {
		expectedAddr := authtypes.NewModuleAddress(acc).String()
		require.Equal(t, address, expectedAddr, "module (%v) should have address (%s)", acc, expectedAddr)
	}
}

func TestBlockedAddresses(t *testing.T) {
	expectedBlockedAddresses := map[string]bool{
		"dydx17xpfvakm2amg962yls6f84z3kell8c5leqdyt2": true,
		"dydx1yl6hdjhmkf37639730gffanpzndzdpmh8xcdh5": true,
		"dydx1vlthgax23ca9syk7xgaz347xmf4nunefw3cnv8": true,
		"dydx1x69dz0c0emw8m2c6kp5v6c08kgjxmu30yn6p5y": true,
		"dydx1ywtansy6ss0jtq8ckrcv6jzkps8yh8mf37gcch": true,
	}
	require.Equal(t, expectedBlockedAddresses, app.BlockedAddresses())
}

func TestMaccPerms(t *testing.T) {
	maccPerms := app.GetMaccPerms()
	expectedMaccPerms := map[string][]string{

		"fee_collector":            nil,
		"insurance_fund":           nil,
		"subaccounts":              nil,
		"sDAIPoolAccount":          nil,
		"transfer":                 {"minter", "burner"},
		"interchainaccounts":       nil,
		"cons_redistribute":        nil,
		"cons_to_send_to_provider": nil,
		"liquidity_module":         nil,
		"rewards_treasury":         nil,
		"rewards_vester":           nil,
		"community_treasury":       nil,
		"community_vester":         nil,
	}
	require.Equal(t, expectedMaccPerms, maccPerms, "default macc perms list does not match expected")
}

func TestModuleAccountAddrs(t *testing.T) {
	expectedModuleAccAddresses := map[string]bool{
		"dydx17xpfvakm2amg962yls6f84z3kell8c5leqdyt2": true, // x/auth.FeeCollector
		"dydx1yl6hdjhmkf37639730gffanpzndzdpmh8xcdh5": true, // ibc transfer
		"dydx1vlthgax23ca9syk7xgaz347xmf4nunefw3cnv8": true, // interchainaccounts
		"dydx1v88c3xv9xyv3eetdx0tvcmq7ung3dywp5upwc6": true, // x/subaccount
		"dydx1c7ptc87hkd54e3r7zjy92q29xkq7t79w64slrq": true, // x/clob.insuranceFund
		"dydx1x69dz0c0emw8m2c6kp5v6c08kgjxmu30yn6p5y": true, // x/ccvconsumer.ConsumerRedistribute
		"dydx1ywtansy6ss0jtq8ckrcv6jzkps8yh8mf37gcch": true, // x/ccvconsumer.ConsumerToSendToProvider
		"dydx1r3fsd6humm0ghyq0te5jf8eumklmclya37zle0": true, // x/ratelimit.SDAIPoolAccount
		"dydx1l4fct6xefgds6tsslrluwy2juuyaet369u29e7": true, // x/subaccount.LiquidityFeeModuleAddress
		"dydx16wrau2x4tsg033xfrrdpae6kxfn9kyuerr5jjp": true, // x/rewards.treasury
		"dydx1ltyc6y4skclzafvpznpt2qjwmfwgsndp458rmp": true, // x/rewards.vester
		"dydx15ztc7xy42tn2ukkc0qjthkucw9ac63pgp70urn": true, // x/vest.communityTreasury
		"dydx1wxje320an3karyc6mjw4zghs300dmrjkwn7xtk": true, // x/vest.communityVester
	}

	require.Equal(t, expectedModuleAccAddresses, app.ModuleAccountAddrs())
}
