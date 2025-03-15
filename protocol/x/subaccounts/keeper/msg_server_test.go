package keeper_test

import (
	"context"
	"math/big"
	"testing"

	sdkmath "cosmossdk.io/math"
	sdaiservertypes "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/sdaioracle"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	testapp "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	bank_testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/bank"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	asstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	yieldskeeper "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/keeper"
	yieldstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func setupMsgServer(t *testing.T) (keeper.Keeper, types.MsgServer, context.Context) {
	tApp := testapp.NewTestAppBuilder(t).Build()
	ctx := tApp.InitChain()
	k := tApp.App.SubaccountsKeeper

	return k, keeper.NewMsgServerImpl(k), ctx
}

func TestMsgServer(t *testing.T) {
	k, ms, ctx := setupMsgServer(t)
	require.NotNil(t, k)
	require.NotNil(t, ms)
	require.NotNil(t, ctx)
}

func TestClaimYieldsForSubaccount(t *testing.T) {
	// default subaccount id, the first subaccount id generated when calling createNSubaccount
	defaultSubaccountId := types.SubaccountId{
		Owner:  "0",
		Number: 0,
	}

	tests := map[string]struct {
		// state
		perpetuals []perptypes.Perpetual
		assets     []*asstypes.Asset
		// Only set when specified. Defaults to 0/1.
		globalAssetYieldsIndex *big.Rat
		fundsInTDaiPool        *big.Int

		// subaccount state
		perpetualPositions         []*types.PerpetualPosition
		assetPositions             []*types.AssetPosition
		subaccountAssetYieldsIndex string

		// collateral pool state
		collateralPoolTDaiBalances map[string]int64

		// extra test state
		msgClaimYieldsForSubaccount types.MsgClaimYieldsForSubaccount

		// expectations
		expectedCollateralPoolTDaiBalances map[string]int64
		expectedPerpetualPositions         []*types.PerpetualPosition
		expectedAssetPositions             []*types.AssetPosition
		expectedTDaiYieldsPoolBalance      *big.Int
		expectedErr                        error
		expectedAssetYieldsIndex           string
	}{
		"Successfully claims yields for tDai asset position and no other position exists": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(2, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(2, 1).String(),
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(200_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 200_000_000_000,
			},
		},
		"Successfully claims yields for tDai asset position when perp with no yields exists": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(2, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(2, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(200_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 200_000_000_000,
			},
		},
		"Successfully claims yields for one perp with no asset positions existing before yields claim": {
			globalAssetYieldsIndex: big.NewRat(1, 1),
			fundsInTDaiPool:        big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(1, 1).String(),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(1_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(199_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 101_000_000_000,
			},
		},
		"Successfully claims yields for one perp with asset position existing but not claiming yields": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(1_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(101_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(199_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 101_000_000_000,
			},
		},
		"Successfully claims yields for tDai asset and one perp": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 2).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(200_100_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(99_900_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 200_100_000_000,
			},
		},
		"Successfully claims yields when multiple perp positions are open and tDai position open": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(50_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(13, 11).String(),
			globalAssetYieldsIndex:     big.NewRat(26, 11),
			fundsInTDaiPool:            big.NewInt(222_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 50_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					Params:       constants.EthUsd_NoMarginRequirement.Params,
					FundingIndex: constants.EthUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.EthUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 9).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(26, 11).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(11, 3).String(),
				},
				{
					PerpetualId:  uint32(1),
					Quantums:     dtypes.NewInt(-2_000_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 3).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_094_444_443),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(171_905_555_557),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_094_444_443,
			},
		},
		"Successfully claims all yields in tDaiPool": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(3, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(3, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(300_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(0),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 300_000_000_000,
			},
		},
		"Successfully claims yields for isolated market": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(5, 4),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolTwoAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.IsoUsd_IsolatedMarket.Params,
					FundingIndex: constants.IsoUsd_IsolatedMarket.FundingIndex,
					OpenInterest: constants.IsoUsd_IsolatedMarket.OpenInterest,
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(3),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(5, 4).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(3),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(124_920_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(175_080_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolTwoAddress.String(): 124_920_000_000,
				types.ModuleAddress.String():            0,
			},
		},
		"Successfully does not claim yields when asset yields index is already updated": {
			globalAssetYieldsIndex: big.NewRat(5, 4),
			fundsInTDaiPool:        big.NewInt(1_200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 1_000_000_000_000,
			},
			subaccountAssetYieldsIndex: big.NewRat(5, 4).String(),
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(5, 4).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(4, 5).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000), // Yields Collected: 0 tDAI
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(1_200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 1_000_000_000_000,
			},
		},
		"Successfully does not claim yields when negative positions cancel out positive position yields claims": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)),
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1000, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1000, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
		},
		"Fails yields claim: Negative general asset yields index": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(-1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedErr:                 types.ErrGlobalYieldsIndexNegative,
			expectedAssetYieldsIndex:    big.NewRat(-1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
		},
		"Fails yields claim: Asset yields index in account higher than in general ": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: big.NewRat(1, 1).String(),
			globalAssetYieldsIndex:     big.NewRat(1, 2),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_NoMarginRequirement,
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedErr:                 types.ErrGeneralYieldsIndexSmallerThanYieldsIndexInSubaccount,
			expectedAssetYieldsIndex:    big.NewRat(1, 2).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
		},
		"Fails yields claim: Negative general perp yields index": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(-1, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedErr:                 types.ErrGlobalYieldsIndexNegative,
			expectedAssetYieldsIndex:    big.NewRat(-1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Fails yields claim: Perp yields index in subaccount higher than in general": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedErr:                 types.ErrGeneralYieldsIndexSmallerThanYieldsIndexInSubaccount,
			expectedAssetYieldsIndex:    big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Success yields claim: Perp yields index in subaccount badly initialized so defaults to 0": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  "",
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedErr:                 nil,
			expectedAssetYieldsIndex:    big.NewRat(0, 2).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  "1/2",
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.ModuleAddress.String(): 100_000_000_000,
			},
		},
		"Successful yields claim: not enough yields in tdai pool so we take available": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(1),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_001),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(0),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_001,
			},
		},
		"Fails yields claim: no open positions": {
			globalAssetYieldsIndex: big.NewRat(1, 1),
			fundsInTDaiPool:        big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			msgClaimYieldsForSubaccount:   types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedErr:                   types.ErrNoYieldsToClaim,
			expectedAssetYieldsIndex:      big.NewRat(1, 1).String(),
			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
		},
		"Fails yields claim: subaccountId is nil": {
			globalAssetYieldsIndex: big.NewRat(1, 1),
			fundsInTDaiPool:        big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			msgClaimYieldsForSubaccount:   types.MsgClaimYieldsForSubaccount{},
			expectedErr:                   types.ErrSubaccountIdIsNil,
			expectedAssetYieldsIndex:      big.NewRat(1, 1).String(),
			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
		},
		"Fails yields claim: subaccount with yields claim exists, but different one with no positions is passed in": {
			globalAssetYieldsIndex: big.NewRat(1, 1),
			fundsInTDaiPool:        big.NewInt(100_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(1, 2).String(),
				},
			},
			msgClaimYieldsForSubaccount:   types.MsgClaimYieldsForSubaccount{Id: &types.SubaccountId{Owner: "0", Number: 1}},
			expectedErr:                   types.ErrNoYieldsToClaim,
			expectedAssetYieldsIndex:      big.NewRat(1, 1).String(),
			expectedTDaiYieldsPoolBalance: big.NewInt(100_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
		},
		"Successfully claims 0 yields when subaccount's yields is negative": {
			assetPositions:             testutil.CreateTDaiAssetPosition(big.NewInt(100_000_000_000)), // $100,000
			subaccountAssetYieldsIndex: constants.AssetYieldsIndex_Zero,
			globalAssetYieldsIndex:     big.NewRat(1, 1),
			fundsInTDaiPool:            big.NewInt(200_000_000_000),
			collateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
			perpetuals: []perptypes.Perpetual{
				{
					Params:       constants.BtcUsd_NoMarginRequirement.Params,
					FundingIndex: constants.BtcUsd_NoMarginRequirement.FundingIndex,
					OpenInterest: constants.BtcUsd_NoMarginRequirement.OpenInterest,
					YieldsIndex:  big.NewRat(10_000, 1).String(),
				},
			},
			perpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(0, 1).String(),
				},
			},
			msgClaimYieldsForSubaccount: types.MsgClaimYieldsForSubaccount{Id: &defaultSubaccountId},
			expectedAssetYieldsIndex:    big.NewRat(1, 1).String(),
			expectedPerpetualPositions: []*types.PerpetualPosition{
				{
					PerpetualId:  uint32(0),
					Quantums:     dtypes.NewInt(-100_000_000),
					FundingIndex: dtypes.NewInt(0),
					YieldsIndex:  big.NewRat(10_000, 1).String(),
				},
			},
			expectedAssetPositions: []*types.AssetPosition{
				{
					AssetId:  uint32(0),
					Quantums: dtypes.NewInt(100_000_000_000),
				},
			},
			expectedTDaiYieldsPoolBalance: big.NewInt(200_000_000_000),
			expectedCollateralPoolTDaiBalances: map[string]int64{
				types.CollateralPoolZeroAddress.String(): 100_000_000_000,
			},
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			ctx, subaccountsKeeper, pricesKeeper, perpetualsKeeper, accountKeeper, bankKeeper, assetsKeeper, yieldsKeeper, _, _ := testutil.SubaccountsKeepers(
				t,
				true,
			)
			ctx = ctx.WithTxBytes(constants.TestTxBytes)
			testutil.CreateTestMarkets(t, ctx, pricesKeeper)

			// Always creates TDai asset first
			require.NoError(t, testutil.CreateTDaiAsset(ctx, assetsKeeper))
			require.NoError(t, testutil.CreateBTCAsset(ctx, assetsKeeper))

			testutil.CreateTestLiquidityTiers(t, ctx, perpetualsKeeper)
			testutil.CreateTestCollateralPools(t, ctx, perpetualsKeeper)

			// Set up initial sdai price
			rateString := sdaiservertypes.TestSDAIEventRequest.ConversionRate
			rate, conversionErr := yieldskeeper.ConvertStringToBigInt(rateString)
			require.NoError(t, conversionErr)

			yieldsKeeper.SetSDAIPrice(ctx, rate)
			globalAssetYieldsIndex := big.NewRat(1, 1)
			if tc.globalAssetYieldsIndex != nil {
				globalAssetYieldsIndex = tc.globalAssetYieldsIndex
			}
			yieldsKeeper.SetAssetYieldsIndex(ctx, globalAssetYieldsIndex)

			for _, a := range tc.assets {
				_, err := assetsKeeper.CreateAsset(
					ctx,
					a.Id,
					a.Symbol,
					a.Denom,
					a.DenomExponent,
					a.HasMarket,
					a.MarketId,
					a.AtomicResolution,
					a.AssetYieldsIndex,
					a.MaxSlippagePpm,
				)
				require.NoError(t, err)
			}

			for _, p := range tc.perpetuals {
				perpetualsKeeper.SetPerpetualForTest(
					ctx,
					p,
				)
			}

			for collateralPoolAddr, TDaiBal := range tc.collateralPoolTDaiBalances {
				err := bank_testutil.FundAccount(
					ctx,
					sdk.MustAccAddressFromBech32(collateralPoolAddr),
					sdk.Coins{
						sdk.NewCoin(asstypes.AssetTDai.Denom, sdkmath.NewInt(TDaiBal)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			if tc.fundsInTDaiPool != nil {
				err := bank_testutil.FundModuleAccount(
					ctx,
					yieldstypes.TDaiPoolAccount,
					sdk.Coins{
						sdk.NewCoin(asstypes.AssetTDai.Denom, sdkmath.NewIntFromBigInt(tc.fundsInTDaiPool)),
					},
					*bankKeeper,
				)
				require.NoError(t, err)
			}

			subaccount := createNSubaccount(subaccountsKeeper, ctx, 1, big.NewInt(1_000))[0]
			subaccount.PerpetualPositions = tc.perpetualPositions
			subaccount.AssetPositions = tc.assetPositions
			subaccountYieldsIndex := constants.AssetYieldsIndex_Zero
			if tc.subaccountAssetYieldsIndex != "" {
				subaccountYieldsIndex = tc.subaccountAssetYieldsIndex
			}
			subaccount.AssetYieldsIndex = subaccountYieldsIndex
			subaccountsKeeper.SetSubaccount(ctx, subaccount)
			subaccountId := *subaccount.Id

			msgServer := keeper.NewMsgServerImpl(*subaccountsKeeper)

			resp, err := msgServer.ClaimYieldsForSubaccount(ctx, &tc.msgClaimYieldsForSubaccount)
			if tc.expectedErr != nil {
				require.ErrorIs(t, err, tc.expectedErr)
				require.Nil(t, resp)
			} else {
				require.NoError(t, err)
				require.Empty(t, resp)
			}
			newSubaccount := subaccountsKeeper.GetSubaccount(ctx, subaccountId)
			require.Equal(t, len(newSubaccount.PerpetualPositions), len(tc.expectedPerpetualPositions))
			for i, ep := range tc.expectedPerpetualPositions {
				require.Equal(t, *ep, *newSubaccount.PerpetualPositions[i])
			}
			require.Equal(t, len(newSubaccount.AssetPositions), len(tc.expectedAssetPositions))
			for i, ep := range tc.expectedAssetPositions {
				require.Equal(t, *ep, *newSubaccount.AssetPositions[i])
			}
			if tc.expectedErr == nil {
				require.Equal(t, 0, globalAssetYieldsIndex.Cmp(yieldskeeper.ConvertStringToBigRatWithPanicOnErr(newSubaccount.AssetYieldsIndex)),
					"Expected AssetYieldsIndex %v. Got %v.", globalAssetYieldsIndex, newSubaccount.AssetYieldsIndex,
				)
			}

			for collateralPoolAddr, expectedTDaiBal := range tc.expectedCollateralPoolTDaiBalances {
				TDaiBal := bankKeeper.GetBalance(
					ctx,
					sdk.MustAccAddressFromBech32(collateralPoolAddr),
					asstypes.AssetTDai.Denom,
				)
				require.Equal(t,
					sdk.NewCoin(asstypes.AssetTDai.Denom, sdkmath.NewInt(expectedTDaiBal)),
					TDaiBal,
				)
			}

			if tc.expectedTDaiYieldsPoolBalance != nil {
				TDaiBal := bankKeeper.GetBalance(
					ctx,
					accountKeeper.GetModuleAddress(yieldstypes.TDaiPoolAccount),
					asstypes.AssetTDai.Denom,
				)
				require.Equal(t,
					sdk.NewCoin(asstypes.AssetTDai.Denom, sdkmath.NewIntFromBigInt(tc.expectedTDaiYieldsPoolBalance)),
					TDaiBal,
				)
			}
		})
	}
}
