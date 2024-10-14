package keeper_test

import (
	"math/big"
	"strings"
	"testing"

	sdkmath "cosmossdk.io/math"
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	testkeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
)

func TestProcessNewSDaiConversionRateUpdate(t *testing.T) {
	testCases := []struct {
		name string

		initialBlockHeight          int64
		initialSDaiLastBlockUpdated *big.Int
		initialSDaiConversionRate   *big.Int
		initialSDaiSupply           *big.Int
		initialTDaiSupply           *big.Int
		initialAssetYieldIndex      string

		newBlockHeight        *big.Int
		newSDaiConversionRate *big.Int

		expectedLastUpdatedBlockHeight *big.Int
		expectedSDaiConversionRate     *big.Int
		expectedTDAISupply             *big.Int
		expectedAssetYieldIndex        string

		expErr      bool
		expErrMsg   string
		expEvent    bool
		customSetup func(ctx sdk.Context, k *keeper.Keeper)
	}{
		{
			name:                        "Valid: basic valid",
			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 100,
			initialSDaiSupply:           big.NewInt(1000000000000),
			initialTDaiSupply:           big.NewInt(1),
			initialSDaiLastBlockUpdated: big.NewInt(0),
			initialSDaiConversionRate:   big.NewInt(1),
			initialAssetYieldIndex:      "1/1",

			newBlockHeight:        big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 101),
			newSDaiConversionRate: keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),

			expectedLastUpdatedBlockHeight: big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 101),
			expectedSDaiConversionRate:     keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),
			expectedTDAISupply:             big.NewInt(2),
			expectedAssetYieldIndex:        "2/1",
			expEvent:                       true,
			expErr:                         false,
			customSetup:                    func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name: "Valid: Large amounts and large new yield",

			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 100,
			initialSDaiLastBlockUpdated: big.NewInt(15),
			initialSDaiConversionRate:   keeper.ConvertStringToBigIntWithPanicOnErr("123456789123456789123456788"),
			initialSDaiSupply:           keeper.ConvertStringToBigIntWithPanicOnErr("123456789123456789123456789"),
			initialTDaiSupply:           keeper.ConvertStringToBigIntWithPanicOnErr("9876543210"),
			initialAssetYieldIndex:      "1/1",

			newSDaiConversionRate: keeper.ConvertStringToBigIntWithPanicOnErr("1234567891234567891234567890"),
			newBlockHeight:        big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 100),

			expectedSDaiConversionRate:     keeper.ConvertStringToBigIntWithPanicOnErr("1234567891234567891234567890"),
			expectedLastUpdatedBlockHeight: big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 100),
			expectedTDAISupply:             keeper.ConvertStringToBigIntWithPanicOnErr("152415787806736"),
			expectedAssetYieldIndex:        "76207893903368/4938271605",
			expEvent:                       true,
			expErr:                         false,
			customSetup:                    func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                        "Valid: sDai supply is zero on mint, so no mint, but height and conversion rate update",
			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 101,
			initialSDaiSupply:           big.NewInt(0),
			initialTDaiSupply:           big.NewInt(0),
			initialSDaiLastBlockUpdated: big.NewInt(0),
			initialSDaiConversionRate:   big.NewInt(1),
			initialAssetYieldIndex:      "1/1",

			newBlockHeight:                 big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 101),
			newSDaiConversionRate:          keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),
			expectedLastUpdatedBlockHeight: big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 101),
			expectedSDaiConversionRate:     keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),
			expectedTDAISupply:             big.NewInt(0),
			expectedAssetYieldIndex:        "1/1",
			expEvent:                       false,
			expErr:                         false,
			customSetup:                    func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                        "Valid: tDai supply is zero on mint, so no mint, but height and conversion rate update",
			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 101,
			initialSDaiSupply:           big.NewInt(1),
			initialTDaiSupply:           big.NewInt(0),
			initialSDaiLastBlockUpdated: big.NewInt(0),
			initialSDaiConversionRate:   big.NewInt(1),
			initialAssetYieldIndex:      "1/1",

			newBlockHeight:        big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 101),
			newSDaiConversionRate: keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),

			expectedLastUpdatedBlockHeight: big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 101),
			expectedSDaiConversionRate:     keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),
			expectedTDAISupply:             big.NewInt(0),
			expectedAssetYieldIndex:        "1/1",
			expEvent:                       false,
			expErr:                         false,
			customSetup:                    func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                        "Valid: new height is too soon, so no update",
			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 101,
			initialSDaiSupply:           big.NewInt(1000000000000),
			initialTDaiSupply:           big.NewInt(1),
			initialSDaiLastBlockUpdated: big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY),
			initialSDaiConversionRate:   big.NewInt(1),
			initialAssetYieldIndex:      "1/1",

			newBlockHeight:        big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 101),
			newSDaiConversionRate: keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),

			expectedLastUpdatedBlockHeight: big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY),
			expectedSDaiConversionRate:     big.NewInt(1),
			expectedTDAISupply:             big.NewInt(1),
			expectedAssetYieldIndex:        "1/1",
			expEvent:                       false,
			expErr:                         false,
			customSetup:                    func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                        "Valid: new sDai conversion rate is same as previous, so no update",
			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 101,
			initialSDaiSupply:           big.NewInt(1000000000000),
			initialTDaiSupply:           big.NewInt(1),
			initialSDaiLastBlockUpdated: big.NewInt(0),
			initialSDaiConversionRate:   keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),
			initialAssetYieldIndex:      "1/1",

			newBlockHeight:        big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 101),
			newSDaiConversionRate: keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),

			expectedLastUpdatedBlockHeight: big.NewInt(0),
			expectedSDaiConversionRate:     keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),
			expectedTDAISupply:             big.NewInt(1),
			expectedAssetYieldIndex:        "1/1",
			expEvent:                       false,
			expErr:                         false,
			customSetup:                    func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                        "Invalid: new sDaiConversionRate is nil",
			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 101,
			initialSDaiSupply:           big.NewInt(1000000000000),
			initialTDaiSupply:           big.NewInt(1),
			initialSDaiLastBlockUpdated: big.NewInt(0),
			initialSDaiConversionRate:   big.NewInt(1),
			initialAssetYieldIndex:      "1/1",

			newBlockHeight:        big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 101),
			newSDaiConversionRate: nil,

			expectedTDAISupply:      big.NewInt(0),
			expectedAssetYieldIndex: "1/1",
			expEvent:                false,
			expErr:                  true,
			expErrMsg:               "sDaiConversionRate or blockHeight cannot be nil",
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                        "Invalid: new blockHeight is nil",
			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 101,
			initialSDaiSupply:           big.NewInt(1000000000000),
			initialTDaiSupply:           big.NewInt(1),
			initialSDaiLastBlockUpdated: big.NewInt(0),
			initialSDaiConversionRate:   big.NewInt(1),
			initialAssetYieldIndex:      "1/1",

			newBlockHeight:        nil,
			newSDaiConversionRate: keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),

			expectedTDAISupply:      big.NewInt(0),
			expectedAssetYieldIndex: "1/1",
			expEvent:                false,
			expErr:                  true,
			expErrMsg:               "sDaiConversionRate or blockHeight cannot be nil",
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                        "Invalid: blockHeight is zero",
			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 101,
			initialSDaiSupply:           big.NewInt(1000000000000),
			initialTDaiSupply:           big.NewInt(1),
			initialSDaiLastBlockUpdated: big.NewInt(0),
			initialSDaiConversionRate:   big.NewInt(1),
			initialAssetYieldIndex:      "1/1",

			newBlockHeight:        big.NewInt(0),
			newSDaiConversionRate: keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),

			expectedTDAISupply:      big.NewInt(0),
			expectedAssetYieldIndex: "1/1",
			expEvent:                false,
			expErr:                  true,
			expErrMsg:               "blockHeight must be positive: 0",
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                        "Invalid: blockHeight is negative",
			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 101,
			initialSDaiSupply:           big.NewInt(1000000000000),
			initialTDaiSupply:           big.NewInt(1),
			initialSDaiLastBlockUpdated: big.NewInt(0),
			initialSDaiConversionRate:   big.NewInt(1),
			initialAssetYieldIndex:      "1/1",

			newBlockHeight:        big.NewInt(-1),
			newSDaiConversionRate: keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),

			expectedTDAISupply:      big.NewInt(0),
			expectedAssetYieldIndex: "1/1",
			expEvent:                false,
			expErr:                  true,
			expErrMsg:               "blockHeight must be positive: -1",
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                        "Invalid: sDaiConversionRate is zero",
			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 101,
			initialSDaiSupply:           big.NewInt(1000000000000),
			initialTDaiSupply:           big.NewInt(1),
			initialSDaiLastBlockUpdated: big.NewInt(0),
			initialSDaiConversionRate:   big.NewInt(1),
			initialAssetYieldIndex:      "1/1",

			newBlockHeight:        big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 101),
			newSDaiConversionRate: big.NewInt(0),

			expectedTDAISupply:      big.NewInt(0),
			expectedAssetYieldIndex: "1/1",
			expEvent:                false,
			expErr:                  true,
			expErrMsg:               "sDai conversion rate must be greater than 1.0: 0",
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                        "Invalid: sDaiConversionRate is negative",
			initialBlockHeight:          types.SDAI_UPDATE_BLOCK_DELAY + 101,
			initialSDaiSupply:           big.NewInt(1000000000000),
			initialTDaiSupply:           big.NewInt(1),
			initialSDaiLastBlockUpdated: big.NewInt(0),
			initialSDaiConversionRate:   big.NewInt(1),
			initialAssetYieldIndex:      "1/1",

			newBlockHeight:        big.NewInt(types.SDAI_UPDATE_BLOCK_DELAY + 101),
			newSDaiConversionRate: big.NewInt(-1),

			expectedTDAISupply:      big.NewInt(0),
			expectedAssetYieldIndex: "1/1",
			expEvent:                false,
			expErr:                  true,
			expErrMsg:               "sDai conversion rate must be greater than 1.0: -1",
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			ctx, _, pricesKeeper, perpetualsKeeper, _, bankKeeper, _, ratelimitKeeper, _, _ := testkeeper.SubaccountsKeepers(
				t,
				true,
			)

			ctx = ctx.WithBlockHeight(tc.initialBlockHeight)

			k := ratelimitKeeper
			burnAllCoinsOfDenom(t, ctx, bankKeeper, types.TDaiDenom)
			burnAllCoinsOfDenom(t, ctx, bankKeeper, types.SDaiDenom)

			sDaiCoins := sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewIntFromBigInt(tc.initialSDaiSupply)))
			err := bankKeeper.MintCoins(
				ctx,
				types.TDaiPoolAccount,
				sDaiCoins,
			)
			require.NoError(t, err)
			err = bankKeeper.SendCoinsFromModuleToModule(
				ctx,
				types.TDaiPoolAccount,
				types.SDaiPoolAccount,
				sDaiCoins,
			)
			require.NoError(t, err)
			tDaiCoins := sdk.NewCoins(sdk.NewCoin(types.TDaiDenom, sdkmath.NewIntFromBigInt(tc.initialTDaiSupply)))
			err = bankKeeper.MintCoins(
				ctx,
				types.TDaiPoolAccount,
				tDaiCoins,
			)
			require.NoError(t, err)

			k.SetSDAILastBlockUpdated(ctx, tc.initialSDaiLastBlockUpdated)
			k.SetSDAIPrice(ctx, tc.initialSDaiConversionRate)
			k.SetAssetYieldIndex(ctx, keeper.ConvertStringToBigRatWithPanicOnErr(tc.initialAssetYieldIndex))
			perpetualsKeeper.SetMultiCollateralAssets(ctx, perptypes.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{0}})

			testkeeper.CreateTestMarkets(t, ctx, pricesKeeper)
			testkeeper.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			testkeeper.CreateTestPerpetuals(t, ctx, perpetualsKeeper)

			tc.customSetup(ctx, k)

			err = k.ProcessNewSDaiConversionRateUpdate(ctx, tc.newSDaiConversionRate, tc.newBlockHeight)
			if tc.expErr {
				require.Error(t, err)
				require.Equal(t, tc.expErrMsg, err.Error())
			} else {
				require.NoError(t, err)
				sDaiSupply := bankKeeper.GetSupply(ctx, types.SDaiDenom)
				require.Equal(t, 0, tc.initialSDaiSupply.Cmp(sDaiSupply.Amount.BigInt()),
					"Expected sDai Supply: %v. Got sDai Supply: %v.", tc.initialSDaiSupply, sDaiSupply.Amount.BigInt(),
				)

				tDaiSupply := bankKeeper.GetSupply(ctx, types.TDaiDenom)
				require.Equal(t, 0, tc.expectedTDAISupply.Cmp(tDaiSupply.Amount.BigInt()),
					"Expected tDai Supply: %v. Got tDai Supply: %v.", tc.expectedTDAISupply, tDaiSupply.Amount.BigInt(),
				)

				sDaiConversionRate, found := k.GetSDAIPrice(ctx)
				require.True(t, found)
				require.Equal(t, 0, tc.expectedSDaiConversionRate.Cmp(sDaiConversionRate),
					"Expected sDaiConversionRate: %v. Got sDaiConversionRate: %v.", tc.expectedSDaiConversionRate, sDaiConversionRate,
				)

				lastUpdatedHeight, found := k.GetSDAILastBlockUpdated(ctx)
				require.True(t, found)
				require.Equal(t, 0, tc.expectedLastUpdatedBlockHeight.Cmp(lastUpdatedHeight),
					"Expected lastUpdatedHeight: %v. Got lastUpdatedHeight: %v.", tc.expectedLastUpdatedBlockHeight, lastUpdatedHeight,
				)

				assetYieldIndex, found := k.GetAssetYieldIndex(ctx)
				require.True(t, found)
				require.Equal(t, tc.expectedAssetYieldIndex, assetYieldIndex.String())

				actualEvents := testkeeper.GetUpdateYieldParamsFromIndexerBlock(ctx, k)
				if tc.expEvent {
					require.Equal(t, 1, len(actualEvents))
					expectedEvent := indexerevents.UpdateYieldParamsEventV1{
						SdaiPrice:       tc.newSDaiConversionRate.String(),
						AssetYieldIndex: tc.expectedAssetYieldIndex,
					}
					require.Equal(t, expectedEvent, *actualEvents[0])
				} else {
					require.Equal(t, 0, len(actualEvents))
				}
			}
		})
	}
}

func TestUpdateMintStateOnSDaiConversionRateUpdate(t *testing.T) {
	expectEvent := true

	testCases := []struct {
		name                    string
		initialSDaiSupply       *big.Int
		initialTDaiSupply       *big.Int
		sDaiConversionRate      *big.Int
		initialAssetYieldIndex  string
		initialPerpYieldIndexes []string
		expectedTDAISupply      *big.Int
		expectedAssetYieldIndex string
		expErr                  bool
		customSetup             func(ctx sdk.Context, k *keeper.Keeper)
	}{
		{
			name:                    "Basic: valid",
			initialSDaiSupply:       big.NewInt(1000000000000),
			initialTDaiSupply:       big.NewInt(1),
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("2" + strings.Repeat("0", 27)),
			initialAssetYieldIndex:  "1/1",
			initialPerpYieldIndexes: []string{"0/1", "0/1"},
			expectedTDAISupply:      big.NewInt(2),
			expectedAssetYieldIndex: "2/1",
			expErr:                  false,
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                    "Basic: Large new yield",
			initialSDaiSupply:       big.NewInt(1000000000000),
			initialTDaiSupply:       big.NewInt(1),
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("10" + strings.Repeat("0", 27)),
			initialAssetYieldIndex:  "1/1",
			initialPerpYieldIndexes: []string{"0/1", "0/1"},
			expectedTDAISupply:      big.NewInt(10),
			expectedAssetYieldIndex: "10/1",
			expErr:                  false,
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                    "Basic: Small new yield",
			initialSDaiSupply:       big.NewInt(10000000000000000),
			initialTDaiSupply:       big.NewInt(10000),
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("1000100000000000000000000000"),
			initialAssetYieldIndex:  "1/1",
			initialPerpYieldIndexes: []string{"0/1", "0/1"},
			expectedTDAISupply:      big.NewInt(10001),
			expectedAssetYieldIndex: "10001/10000",
			expErr:                  false,
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                    "Large amounts: Large new yield",
			initialSDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("123456789123456789123456789"),
			initialTDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("9876543210"),
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("123456789123456789123456789"),
			initialAssetYieldIndex:  "1/1",
			initialPerpYieldIndexes: []string{"0/1", "0/1"},
			expectedTDAISupply:      keeper.ConvertStringToBigIntWithPanicOnErr("15241578780673"),
			expectedAssetYieldIndex: "15241578780673/9876543210",
			expErr:                  false,
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                    "Large amounts: Small new yield",
			initialSDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("987654321234567898765432123"),
			initialTDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("997630627509663"),
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("1010101010101010101010101010"),
			initialAssetYieldIndex:  "1/1",
			initialPerpYieldIndexes: []string{"0/1", "0/1"},
			expectedTDAISupply:      keeper.ConvertStringToBigIntWithPanicOnErr("997630627509664"),
			expectedAssetYieldIndex: "997630627509664/997630627509663",
			expErr:                  false,
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                    "Initial AssetYieldIndex non-zero: Large new yield",
			initialSDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("123456789123456789123456789"),
			initialTDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("9876543210"),
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("123456789123456789123456789"),
			initialAssetYieldIndex:  "876/543",
			initialPerpYieldIndexes: []string{"123456/123457", "98765/198765"},
			expectedTDAISupply:      keeper.ConvertStringToBigIntWithPanicOnErr("15241578780673"),
			expectedAssetYieldIndex: "2225270501978258/893827160505",
			expErr:                  false,
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                    "Initial AssetYieldIndex non-zero: Small new yield",
			initialSDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("987654321234567898765432123"),
			initialTDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("997630627509663"),
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("1010101010101010101010101010"),
			initialAssetYieldIndex:  "345/678",
			initialPerpYieldIndexes: []string{"9876/5432", "123456789/12345678"},
			expectedTDAISupply:      keeper.ConvertStringToBigIntWithPanicOnErr("997630627509664"),
			expectedAssetYieldIndex: "57363761081805680/112732260908591919",
			expErr:                  false,
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                    "Granular Mint",
			initialSDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("987654321234567898765432123"),
			initialTDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("1083141908139000"),
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("1096681181716810314385961731"),
			initialAssetYieldIndex:  "345/678",
			initialPerpYieldIndexes: []string{"9876/5432", "123456789/12345678"},
			expectedTDAISupply:      keeper.ConvertStringToBigIntWithPanicOnErr("1083141908139240"),
			expectedAssetYieldIndex: "207602199060021/407983452065690",
			expErr:                  false,
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                    "Zero sDai in Pool",
			initialSDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("0"),
			initialTDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("0"),
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("1096681181716810314385961731"),
			initialAssetYieldIndex:  "1/1",
			initialPerpYieldIndexes: []string{"0/1", "0/1"},
			expectedTDAISupply:      keeper.ConvertStringToBigIntWithPanicOnErr("0"),
			expectedAssetYieldIndex: "1/1",
			expErr:                  false,
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) { expectEvent = false },
		},
		{
			name:                    "Failure: Zero tDai Minted",
			initialSDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("987654321234567898765432123"),
			initialTDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("1083141908139240"),
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("1096681181716810314385961731"),
			initialAssetYieldIndex:  "345/678",
			initialPerpYieldIndexes: []string{"9876/5432", "123456789/12345678"},
			expectedTDAISupply:      keeper.ConvertStringToBigIntWithPanicOnErr("1083141908139240"),
			expectedAssetYieldIndex: "345/678",
			expErr:                  true,
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                    "Failure: Lower tDai amount after yield",
			initialSDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("987654321234567898765432123"),
			initialTDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("1083141908139250"), // supply after mint: 1083141908139240
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("1096681181716810314385961731"),
			initialAssetYieldIndex:  "345/678",
			initialPerpYieldIndexes: []string{"9876/5432", "123456789/12345678"},
			expectedTDAISupply:      keeper.ConvertStringToBigIntWithPanicOnErr("1083141908139250"),
			expectedAssetYieldIndex: "345/678",
			expErr:                  true,
			customSetup:             func(ctx sdk.Context, k *keeper.Keeper) {},
		},
		{
			name:                    "Granular Mint",
			initialSDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("987654321234567898765432123"),
			initialTDaiSupply:       keeper.ConvertStringToBigIntWithPanicOnErr("1083141908139000"),
			sDaiConversionRate:      keeper.ConvertStringToBigIntWithPanicOnErr("1096681181716810314385961731"),
			initialAssetYieldIndex:  "345/678",
			initialPerpYieldIndexes: []string{"9876/5432", "123456789/12345678"},
			expectedTDAISupply:      keeper.ConvertStringToBigIntWithPanicOnErr("1083141908139240"),
			expectedAssetYieldIndex: "9026182567827/9026182567825",
			expErr:                  false,
			customSetup: func(ctx sdk.Context, k *keeper.Keeper) {
				store := ctx.KVStore(k.GetStoreKeyForTestingOnly())
				store.Delete([]byte(types.AssetYieldIndexPrefix))
			},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			ctx, _, pricesKeeper, perpetualsKeeper, _, bankKeeper, _, ratelimitKeeper, _, _ := testkeeper.SubaccountsKeepers(
				t,
				true,
			)

			k := ratelimitKeeper
			burnAllCoinsOfDenom(t, ctx, bankKeeper, types.TDaiDenom)
			burnAllCoinsOfDenom(t, ctx, bankKeeper, types.SDaiDenom)

			sDaiCoins := sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewIntFromBigInt(tc.initialSDaiSupply)))
			err := bankKeeper.MintCoins(
				ctx,
				types.TDaiPoolAccount,
				sDaiCoins,
			)
			require.NoError(t, err)
			err = bankKeeper.SendCoinsFromModuleToModule(
				ctx,
				types.TDaiPoolAccount,
				types.SDaiPoolAccount,
				sDaiCoins,
			)
			require.NoError(t, err)
			tDaiCoins := sdk.NewCoins(sdk.NewCoin(types.TDaiDenom, sdkmath.NewIntFromBigInt(tc.initialTDaiSupply)))
			err = bankKeeper.MintCoins(
				ctx,
				types.TDaiPoolAccount,
				tDaiCoins,
			)
			require.NoError(t, err)

			k.SetSDAIPrice(ctx, tc.sDaiConversionRate)
			k.SetAssetYieldIndex(ctx, keeper.ConvertStringToBigRatWithPanicOnErr(tc.initialAssetYieldIndex))
			perpetualsKeeper.SetMultiCollateralAssets(ctx, perptypes.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{0}})

			testkeeper.CreateTestMarkets(t, ctx, pricesKeeper)
			testkeeper.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			testkeeper.CreateTestPerpetuals(t, ctx, perpetualsKeeper)

			tc.customSetup(ctx, k)

			err = k.UpdateMintStateOnSDaiConversionRateUpdate(ctx)
			if tc.expErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				sDaiSupply := bankKeeper.GetSupply(ctx, types.SDaiDenom)
				require.Equal(t, 0, tc.initialSDaiSupply.Cmp(sDaiSupply.Amount.BigInt()),
					"Expected sDai Supply: %v. Got sDai Supply: %v.", tc.initialSDaiSupply, sDaiSupply.Amount.BigInt(),
				)
				tDaiSupply := bankKeeper.GetSupply(ctx, types.TDaiDenom)
				require.Equal(t, 0, tc.expectedTDAISupply.Cmp(tDaiSupply.Amount.BigInt()),
					"Expected tDai Supply: %v. Got tDai Supply: %v.", tc.expectedTDAISupply, tDaiSupply.Amount.BigInt(),
				)
				sDaiConversionRate, found := k.GetSDAIPrice(ctx)
				require.True(t, found)
				require.Equal(t, 0, tc.sDaiConversionRate.Cmp(sDaiConversionRate),
					"Expected sDaiConversionRate: %v. Got sDaiConversionRate: %v.", tc.sDaiConversionRate, sDaiConversionRate,
				)
				assetYieldIndex, found := k.GetAssetYieldIndex(ctx)
				require.True(t, found)
				require.Equal(t, tc.expectedAssetYieldIndex, assetYieldIndex.String())

				actualEvents := testkeeper.GetUpdateYieldParamsFromIndexerBlock(ctx, k)
				if expectEvent {
					require.Equal(t, 1, len(actualEvents))
					expectedEvent := indexerevents.UpdateYieldParamsEventV1{
						SdaiPrice:       tc.sDaiConversionRate.String(),
						AssetYieldIndex: tc.expectedAssetYieldIndex,
					}
					require.Equal(t, expectedEvent, *actualEvents[0])
				} else {
					require.Equal(t, 0, len(actualEvents))
				}
			}
			// reset expectEvent to true for next test case
			expectEvent = true
		})
	}
}

func TestClaimInsuranceFundYields(t *testing.T) {
	ctx, _, pricesKeeper, perpetualsKeeper, _, bankKeeper, assetsKeeper, ratelimitKeeper, _, _ := testkeeper.SubaccountsKeepers(t, true)

	// Setup
	testkeeper.CreateTestMarkets(t, ctx, pricesKeeper)
	testkeeper.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
	testkeeper.CreateTestPerpetuals(t, ctx, perpetualsKeeper)
	err := testkeeper.CreateTDaiAsset(ctx, assetsKeeper)
	require.NoError(t, err)

	// Mint initial tDAI supply
	initialTDaiSupply := big.NewInt(1_000_000_000_000) // 1,000,000 tDAI
	tDaiCoin := sdk.NewCoin(types.TDaiDenom, sdkmath.NewIntFromBigInt(initialTDaiSupply))
	err = bankKeeper.MintCoins(ctx, types.TDaiPoolAccount, sdk.NewCoins(tDaiCoin))
	require.NoError(t, err)

	// Set up insurance fund balances
	crossInsuranceFund, err := perpetualsKeeper.GetInsuranceFundModuleAddress(ctx, 0) // Same for perpetuals 0, 1, 2
	require.NoError(t, err)
	isolatedInsuranceFund1, err := perpetualsKeeper.GetInsuranceFundModuleAddress(ctx, 3)
	require.NoError(t, err)
	isolatedInsuranceFund2, err := perpetualsKeeper.GetInsuranceFundModuleAddress(ctx, 4)
	require.NoError(t, err)

	// Distribute tDAI to insurance funds
	crossFundBalance := sdk.NewCoin(types.TDaiDenom, sdkmath.NewInt(100_000_000_000))    // 100,000 tDAI
	isolatedFund1Balance := sdk.NewCoin(types.TDaiDenom, sdkmath.NewInt(50_000_000_000)) // 50,000 tDAI
	isolatedFund2Balance := sdk.NewCoin(types.TDaiDenom, sdkmath.NewInt(25_000_000_000)) // 25,000 tDAI

	err = bankKeeper.SendCoinsFromModuleToAccount(ctx, types.TDaiPoolAccount, crossInsuranceFund, sdk.NewCoins(crossFundBalance))
	require.NoError(t, err)
	err = bankKeeper.SendCoinsFromModuleToAccount(ctx, types.TDaiPoolAccount, isolatedInsuranceFund1, sdk.NewCoins(isolatedFund1Balance))
	require.NoError(t, err)
	err = bankKeeper.SendCoinsFromModuleToAccount(ctx, types.TDaiPoolAccount, isolatedInsuranceFund2, sdk.NewCoins(isolatedFund2Balance))
	require.NoError(t, err)

	// Set up test parameters
	tradingDaiSupplyBeforeNewEpoch := big.NewInt(1_000_000_000_000) // 1,000,000 tDAI
	tradingDaiMinted := big.NewInt(10_000_000_000)                  // 10,000 tDAI (1% yield)

	// Call the function
	err = ratelimitKeeper.ClaimInsuranceFundYields(ctx, tradingDaiSupplyBeforeNewEpoch, tradingDaiMinted)
	require.NoError(t, err)

	// Check results
	expectedCrossFundYield := big.NewInt(1_000_000_000)   // 1% of 100,000 tDAI
	expectedIsolatedFund1Yield := big.NewInt(500_000_000) // 1% of 50,000 tDAI
	expectedIsolatedFund2Yield := big.NewInt(250_000_000) // 1% of 25,000 tDAI

	crossFundBalanceAfter := bankKeeper.GetBalance(ctx, crossInsuranceFund, types.TDaiDenom)
	isolatedFund1BalanceAfter := bankKeeper.GetBalance(ctx, isolatedInsuranceFund1, types.TDaiDenom)
	isolatedFund2BalanceAfter := bankKeeper.GetBalance(ctx, isolatedInsuranceFund2, types.TDaiDenom)

	require.Equal(t, 0, crossFundBalanceAfter.Amount.BigInt().Cmp(new(big.Int).Add(crossFundBalance.Amount.BigInt(), expectedCrossFundYield)))
	require.Equal(t, 0, isolatedFund1BalanceAfter.Amount.BigInt().Cmp(new(big.Int).Add(isolatedFund1Balance.Amount.BigInt(), expectedIsolatedFund1Yield)))
	require.Equal(t, 0, isolatedFund2BalanceAfter.Amount.BigInt().Cmp(new(big.Int).Add(isolatedFund2Balance.Amount.BigInt(), expectedIsolatedFund2Yield)))
}

func TestSetNewYieldIndex(t *testing.T) {
	testCases := []struct {
		name                    string
		totalTDaiPreMint        *big.Int
		totalTDaiMinted         *big.Int
		initialAssetYieldIndex  *big.Rat
		expectedAssetYieldIndex *big.Rat
		expectErr               bool
		expectedErrMsg          string
		customSetup             func(ctx sdk.Context, tApp *testapp.TestApp)
	}{
		{
			name:                    "Basic increase",
			totalTDaiPreMint:        keeper.ConvertStringToBigIntWithPanicOnErr("1000"),
			totalTDaiMinted:         keeper.ConvertStringToBigIntWithPanicOnErr("500"),
			initialAssetYieldIndex:  keeper.ConvertStringToBigRatWithPanicOnErr("1"),
			expectedAssetYieldIndex: keeper.ConvertStringToBigRatWithPanicOnErr("1.5"),
			expectErr:               false,
			customSetup:             func(ctx sdk.Context, tApp *testapp.TestApp) {},
		},
		{
			name:                    "Large increase",
			totalTDaiPreMint:        keeper.ConvertStringToBigIntWithPanicOnErr("1"),
			totalTDaiMinted:         keeper.ConvertStringToBigIntWithPanicOnErr("500000"),
			initialAssetYieldIndex:  keeper.ConvertStringToBigRatWithPanicOnErr("1"),
			expectedAssetYieldIndex: keeper.ConvertStringToBigRatWithPanicOnErr("500001"),
			expectErr:               false,
			customSetup:             func(ctx sdk.Context, tApp *testapp.TestApp) {},
		},
		{
			name:                    "Small increase",
			totalTDaiPreMint:        keeper.ConvertStringToBigIntWithPanicOnErr("12345678"),
			totalTDaiMinted:         keeper.ConvertStringToBigIntWithPanicOnErr("3"),
			initialAssetYieldIndex:  keeper.ConvertStringToBigRatWithPanicOnErr("1"),
			expectedAssetYieldIndex: keeper.ConvertStringToBigRatWithPanicOnErr("4115227/4115226"),
			expectErr:               false,
			customSetup:             func(ctx sdk.Context, tApp *testapp.TestApp) {},
		},
		{
			name:                    "TotalTDaiMinted is 0",
			totalTDaiPreMint:        keeper.ConvertStringToBigIntWithPanicOnErr("12345678"),
			totalTDaiMinted:         keeper.ConvertStringToBigIntWithPanicOnErr("0"),
			initialAssetYieldIndex:  keeper.ConvertStringToBigRatWithPanicOnErr("1.2345"),
			expectedAssetYieldIndex: keeper.ConvertStringToBigRatWithPanicOnErr("1.2345"),
			expectErr:               false,
			customSetup:             func(ctx sdk.Context, tApp *testapp.TestApp) {},
		},
		{
			name:                    "TotalTDaiMinted is negative",
			totalTDaiPreMint:        keeper.ConvertStringToBigIntWithPanicOnErr("12345678"),
			totalTDaiMinted:         keeper.ConvertStringToBigIntWithPanicOnErr("-1"),
			initialAssetYieldIndex:  keeper.ConvertStringToBigRatWithPanicOnErr("1.2345"),
			expectedAssetYieldIndex: keeper.ConvertStringToBigRatWithPanicOnErr("1.2345"),
			expectErr:               true,
			expectedErrMsg:          "total t-dai minted is negative",
			customSetup:             func(ctx sdk.Context, tApp *testapp.TestApp) {},
		},
		{
			name:                    "totalTDaiPreMint is zero",
			totalTDaiPreMint:        keeper.ConvertStringToBigIntWithPanicOnErr("0"),
			totalTDaiMinted:         keeper.ConvertStringToBigIntWithPanicOnErr("2"),
			initialAssetYieldIndex:  keeper.ConvertStringToBigRatWithPanicOnErr("1"),
			expectedAssetYieldIndex: keeper.ConvertStringToBigRatWithPanicOnErr("1"),
			expectErr:               true,
			expectedErrMsg:          "total t-dai before mint is 0 or negative",
			customSetup:             func(ctx sdk.Context, tApp *testapp.TestApp) {},
		},
		{
			name:                    "totalTDaiPreMint is zero",
			totalTDaiPreMint:        keeper.ConvertStringToBigIntWithPanicOnErr("-1"),
			totalTDaiMinted:         keeper.ConvertStringToBigIntWithPanicOnErr("2"),
			initialAssetYieldIndex:  keeper.ConvertStringToBigRatWithPanicOnErr("1"),
			expectedAssetYieldIndex: keeper.ConvertStringToBigRatWithPanicOnErr("1"),
			expectErr:               true,
			expectedErrMsg:          "total t-dai before mint is 0 or negative",
			customSetup:             func(ctx sdk.Context, tApp *testapp.TestApp) {},
		},
		{
			name:                    "Cannot find asset yield index, handled gracefully",
			totalTDaiPreMint:        keeper.ConvertStringToBigIntWithPanicOnErr("1"),
			totalTDaiMinted:         keeper.ConvertStringToBigIntWithPanicOnErr("2"),
			initialAssetYieldIndex:  keeper.ConvertStringToBigRatWithPanicOnErr("1"),
			expectedAssetYieldIndex: keeper.ConvertStringToBigRatWithPanicOnErr("3/1"),
			expectErr:               false,
			customSetup: func(ctx sdk.Context, tApp *testapp.TestApp) {
				k := tApp.App.RatelimitKeeper
				store := ctx.KVStore(k.GetStoreKeyForTestingOnly())
				store.Delete([]byte(types.AssetYieldIndexPrefix))
			},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			tApp := testapp.NewTestAppBuilder(t).Build()
			ctx := tApp.InitChain()
			k := tApp.App.RatelimitKeeper
			k.SetAssetYieldIndex(ctx, tc.initialAssetYieldIndex)
			perpetualsKeeper := tApp.App.PerpetualsKeeper
			perpetualsKeeper.SetMultiCollateralAssets(ctx, perptypes.MultiCollateralAssetsArray{MultiCollateralAssets: []uint32{0}})
			tc.customSetup(ctx, tApp)

			err := k.SetNewYieldIndex(ctx, tc.totalTDaiPreMint, tc.totalTDaiMinted)
			resultAssetYieldIndex, found := k.GetAssetYieldIndex(ctx)

			if tc.expectErr && tc.expectedAssetYieldIndex == nil {
				require.False(t, found)
			} else {
				require.True(t, found)
			}

			if tc.expectErr {
				require.ErrorContains(t, err, tc.expectedErrMsg)
				if tc.expectedAssetYieldIndex != nil {
					require.Equal(t, 0, tc.initialAssetYieldIndex.Cmp(resultAssetYieldIndex), "Expected AssetYieldIndex: %v. Got: %v.", tc.initialAssetYieldIndex, resultAssetYieldIndex)
				}
			} else {
				require.NoError(t, err)
				require.Equal(t, 0, tc.expectedAssetYieldIndex.Cmp(resultAssetYieldIndex), "Expected AssetYieldIndex: %v. Got: %v.", tc.expectedAssetYieldIndex, resultAssetYieldIndex)
			}
		})
	}
}

func TestMintNewTDaiYield(t *testing.T) {
	testCases := []struct {
		name                     string
		initialSDAISupply        sdk.Coins
		initialTradingDAISupply  sdk.Coins
		sdaiPrice                *big.Int
		expectedTDAISupply       *big.Int
		expectedTradingDaiToMint *big.Int
		expectError              bool
	}{
		{
			name:                    "sDAI price not set",
			initialSDAISupply:       sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(200))),
			initialTradingDAISupply: sdk.NewCoins(sdk.NewCoin(types.TDaiDenom, sdkmath.NewInt(100))),
			sdaiPrice:               nil,
			expectError:             true,
		},
		{
			name:                    "FAILS: tradingDaiAfterYield will be less than initial trading dai",
			initialSDAISupply:       sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(100))),
			initialTradingDAISupply: sdk.NewCoins(sdk.NewCoin(types.TDaiDenom, sdkmath.NewInt(200))),
			sdaiPrice:               new(big.Int).Mul(big.NewInt(1), new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS), nil)),
			expectError:             true,
		},
		{
			name:                     "Successful minting",
			initialSDAISupply:        sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(200000000000000))),
			initialTradingDAISupply:  sdk.NewCoins(sdk.NewCoin(types.TDaiDenom, sdkmath.NewInt(100))),
			sdaiPrice:                new(big.Int).Mul(big.NewInt(1), new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS), nil)),
			expectedTDAISupply:       big.NewInt(100),
			expectedTradingDaiToMint: big.NewInt(100),
			expectError:              false,
		},
		{
			name:                     "Both initial supplies start at 0",
			initialSDAISupply:        sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(0))),
			initialTradingDAISupply:  sdk.NewCoins(sdk.NewCoin(types.TDaiDenom, sdkmath.NewInt(0))),
			sdaiPrice:                new(big.Int).Mul(big.NewInt(1), new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS), nil)),
			expectedTDAISupply:       big.NewInt(0),
			expectedTradingDaiToMint: big.NewInt(0),
			expectError:              false,
		},
		{
			name:                     "FAILS: More initial tDAI than sDAI",
			initialSDAISupply:        sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(100))),
			initialTradingDAISupply:  sdk.NewCoins(sdk.NewCoin(types.TDaiDenom, sdkmath.NewInt(200))),
			sdaiPrice:                new(big.Int).Mul(big.NewInt(25), new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS-2), nil)),
			expectedTDAISupply:       big.NewInt(200),
			expectedTradingDaiToMint: big.NewInt(200),
			expectError:              true,
		},
		{
			name:                     "FAILS: Price results in lower post-yield tDAI Amount",
			initialSDAISupply:        sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(100))),
			initialTradingDAISupply:  sdk.NewCoins(sdk.NewCoin(types.TDaiDenom, sdkmath.NewInt(80))),
			sdaiPrice:                new(big.Int).Mul(big.NewInt(25), new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS-2), nil)),
			expectedTDAISupply:       big.NewInt(200),
			expectedTradingDaiToMint: big.NewInt(200),
			expectError:              true,
		},
		{
			name:                     "FAILS: Trading DAI to mint is 0",
			initialSDAISupply:        sdk.NewCoins(sdk.NewCoin(types.SDaiDenom, sdkmath.NewInt(100))),
			initialTradingDAISupply:  sdk.NewCoins(sdk.NewCoin(types.TDaiDenom, sdkmath.NewInt(200))),
			sdaiPrice:                new(big.Int).Mul(big.NewInt(5), new(big.Int).Exp(big.NewInt(types.BASE_10), big.NewInt(types.SDAI_DECIMALS-1), nil)),
			expectedTDAISupply:       big.NewInt(200),
			expectedTradingDaiToMint: big.NewInt(0),
			expectError:              true,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			tApp := testapp.NewTestAppBuilder(t).Build()
			ctx := tApp.InitChain()
			k := tApp.App.RatelimitKeeper
			bankKeeper := tApp.App.BankKeeper

			// Burn any tDAI that was created in test genesis.
			burnAllCoinsOfDenom(t, ctx, tApp.App.BankKeeper, types.TDaiDenom)

			// Burn any sDAI that was created in test genesis.
			burnAllCoinsOfDenom(t, ctx, tApp.App.BankKeeper, types.SDaiDenom)

			// Mint initial sDAI supply
			if !tc.initialSDAISupply.IsZero() {
				mintingErr := bankKeeper.MintCoins(ctx, types.TDaiPoolAccount, tc.initialSDAISupply)
				require.NoError(t, mintingErr)
				sendingErr := bankKeeper.SendCoinsFromModuleToModule(ctx, types.TDaiPoolAccount, types.SDaiPoolAccount, tc.initialSDAISupply)
				require.NoError(t, sendingErr)
			}

			// Mint initial tradingDAI supply
			if !tc.initialTradingDAISupply.IsZero() {
				require.NoError(t, bankKeeper.MintCoins(ctx, types.TDaiPoolAccount, tc.initialTradingDAISupply))
			}

			// Set sDAI price
			if tc.sdaiPrice != nil {
				k.SetSDAIPrice(ctx, tc.sdaiPrice)
			}

			tDAISupply, tradingDaiToMint, err := k.MintNewTDaiYield(ctx)
			if tc.expectError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.Equal(t, tc.expectedTDAISupply, tDAISupply)
				require.Equal(t, tc.expectedTradingDaiToMint, tradingDaiToMint)

				// Check the total supply of tradingDAI
				totalTradingDAISupply := bankKeeper.GetSupply(ctx, types.TDaiDenom).Amount.BigInt()
				expectedTotalTradingDAISupply := new(big.Int).Add(tc.expectedTDAISupply, tc.expectedTradingDaiToMint)
				require.Equal(t, expectedTotalTradingDAISupply, totalTradingDAISupply)
			}
		})
	}
}

func burnAllCoinsOfDenom(t *testing.T, ctx sdk.Context, bankKeeper bankkeeper.Keeper, denom string) {
	request := banktypes.QueryDenomOwnersRequest{
		Denom: denom,
	}
	response, err := bankKeeper.DenomOwners(ctx, &request)
	require.NoError(t, err)

	for _, denomOwner := range response.DenomOwners {
		convertedAddress, err := sdk.AccAddressFromBech32(denomOwner.Address)
		if err != nil {
			continue
		}
		err = bankKeeper.SendCoinsFromAccountToModule(
			ctx,
			convertedAddress,
			types.TDaiPoolAccount,
			sdk.NewCoins(denomOwner.Balance),
		)
		require.NoError(t, err)
	}

	err = bankKeeper.BurnCoins(
		ctx,
		types.TDaiPoolAccount,
		sdk.NewCoins(bankKeeper.GetSupply(ctx, denom)),
	)
	require.NoError(t, err)
}
