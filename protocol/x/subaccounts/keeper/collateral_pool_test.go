package keeper_test

import (
	"math/big"
	"testing"

	errorsmod "cosmossdk.io/errors"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	"github.com/stretchr/testify/require"
)

func TestGetCollateralPoolStateTransition(t *testing.T) {
	tests := map[string]struct {
		// parameters
		settledUpdateWithUpdatedSubaccount keeper.SettledUpdate
		perpetuals                         []perptypes.Perpetual

		// expectation
		expectedStateTransition *types.CollateralTransferPerpetualPositionStateTransition
		expectedErr             error
	}{
		`If no perpetual updates, nil state transition is returned`: {
			settledUpdateWithUpdatedSubaccount: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					Id:                 &constants.Alice_Num0,
					PerpetualPositions: nil,
					AssetPositions:     nil,
				},
				PerpetualUpdates: nil,
				AssetUpdates:     nil,
			},
			perpetuals:              nil,
			expectedStateTransition: nil,
		},
		`A perpetual position is closed`: {
			settledUpdateWithUpdatedSubaccount: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					Id:                 &constants.Alice_Num0,
					PerpetualPositions: nil,
					AssetPositions:     nil,
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      uint32(0),
						BigQuantumsDelta: big.NewInt(-100),
					},
				},
				AssetUpdates: nil,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_100PercentMarginRequirement,
			},
			expectedStateTransition: &types.CollateralTransferPerpetualPositionStateTransition{
				SubaccountId: &constants.Alice_Num0,
				PerpetualId:  uint32(0),
				AssetIds:     []uint32{},
				BigQuantums:  []*big.Int{},
				Transition:   types.Closed,
			},
		},
		`Multiple perpetual positions are closed`: {
			settledUpdateWithUpdatedSubaccount: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					Id:                 &constants.Alice_Num0,
					PerpetualPositions: nil,
					AssetPositions:     nil,
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      uint32(0),
						BigQuantumsDelta: big.NewInt(-100),
					},
					{
						PerpetualId:      uint32(1),
						BigQuantumsDelta: big.NewInt(-200),
					},
				},
				AssetUpdates: nil,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_100PercentMarginRequirement,
				constants.EthUsd_NoMarginRequirement,
			},
			expectedStateTransition: &types.CollateralTransferPerpetualPositionStateTransition{
				SubaccountId: &constants.Alice_Num0,
				PerpetualId:  uint32(0),
				AssetIds:     []uint32{},
				BigQuantums:  []*big.Int{},
				Transition:   types.Closed,
			},
		},
		`Subaccount already has perpetual positions`: {
			settledUpdateWithUpdatedSubaccount: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					Id: &constants.Alice_Num0,
					PerpetualPositions: []*types.PerpetualPosition{
						&constants.PerpetualPosition_OneBTCLong,
						&constants.PerpetualPosition_OneTenthEthLong,
					},
					AssetPositions: nil,
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      uint32(0),
						BigQuantumsDelta: big.NewInt(-100),
					},
				},
				AssetUpdates: nil,
			},
			perpetuals: []perptypes.Perpetual{
				constants.BtcUsd_100PercentMarginRequirement,
				constants.EthUsd_NoMarginRequirement,
			},
			expectedStateTransition: nil,
		},
		`Position closed with asset updates`: {
			settledUpdateWithUpdatedSubaccount: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					Id:                 &constants.Alice_Num0,
					PerpetualPositions: nil,
					AssetPositions: []*types.AssetPosition{
						&constants.TDai_Asset_10_000,
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      uint32(3),
						BigQuantumsDelta: big.NewInt(-1_000_000_000),
					},
				},
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          assettypes.AssetTDai.Id,
						BigQuantumsDelta: big.NewInt(100_000_000),
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.IsoUsd_IsolatedMarket,
			},
			expectedStateTransition: &types.CollateralTransferPerpetualPositionStateTransition{
				SubaccountId: &constants.Alice_Num0,
				PerpetualId:  uint32(3),
				AssetIds:     []uint32{assettypes.AssetTDai.Id},
				BigQuantums:  []*big.Int{constants.TDai_Asset_10_000.GetBigQuantums()},
				Transition:   types.Closed,
			},
		},
		`Position opened with asset updates`: {
			settledUpdateWithUpdatedSubaccount: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					Id: &constants.Alice_Num0,
					PerpetualPositions: []*types.PerpetualPosition{
						&constants.PerpetualPosition_OneISOLong,
					},
					AssetPositions: []*types.AssetPosition{
						{
							AssetId:  assettypes.AssetTDai.Id,
							Quantums: dtypes.NewInt(-40_000_000), // -$40
						},
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      uint32(3),
						BigQuantumsDelta: big.NewInt(1_000_000_000), // 1 ISO
					},
				},
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          assettypes.AssetTDai.Id,
						BigQuantumsDelta: big.NewInt(-50_000_000), // -$50
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.IsoUsd_IsolatedMarket,
			},
			expectedStateTransition: &types.CollateralTransferPerpetualPositionStateTransition{
				SubaccountId: &constants.Alice_Num0,
				PerpetualId:  uint32(3),
				AssetIds:     []uint32{assettypes.AssetTDai.Id},
				BigQuantums:  []*big.Int{big.NewInt(10_000_000)}, // $-40 - (-$50)
				Transition:   types.Opened,
			},
		},
		`Position size in increassed but already has perpetual position`: {
			settledUpdateWithUpdatedSubaccount: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					Id: &constants.Alice_Num0,
					PerpetualPositions: []*types.PerpetualPosition{
						&constants.PerpetualPosition_OneISOLong,
					},
					AssetPositions: []*types.AssetPosition{
						{
							AssetId:  assettypes.AssetTDai.Id,
							Quantums: dtypes.NewInt(-40_000_000), // -$65
						},
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      uint32(3),
						BigQuantumsDelta: big.NewInt(500_000_000), // 0.5 ISO
					},
				},
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          assettypes.AssetTDai.Id,
						BigQuantumsDelta: big.NewInt(-25_000_000), // -$25
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.IsoUsd_IsolatedMarket,
			},
			expectedStateTransition: nil,
		},
		`Returns error if perpetual position was opened with no asset updates`: {
			settledUpdateWithUpdatedSubaccount: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					Id: &constants.Alice_Num0,
					PerpetualPositions: []*types.PerpetualPosition{
						&constants.PerpetualPosition_OneISOLong,
					},
					AssetPositions: []*types.AssetPosition{
						{
							AssetId:  assettypes.AssetTDai.Id,
							Quantums: dtypes.NewInt(50_000_000), // $50
						},
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      uint32(3),
						BigQuantumsDelta: big.NewInt(1_000_000_000), // 1 ISO
					},
				},
				AssetUpdates: nil,
			},
			perpetuals: []perptypes.Perpetual{
				constants.IsoUsd_IsolatedMarket,
			},
			expectedStateTransition: nil,
			expectedErr:             errorsmod.Wrap(types.ErrFailedToUpdateSubaccounts, "when opening a position in GetCollateralPoolStateTransition there should be only 1 asset update"),
		},
		`Returns error if perpetual position was opened with multiple asset updates`: {
			settledUpdateWithUpdatedSubaccount: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					Id: &constants.Alice_Num0,
					PerpetualPositions: []*types.PerpetualPosition{
						&constants.PerpetualPosition_OneISOLong,
					},
					AssetPositions: []*types.AssetPosition{
						{
							AssetId:  assettypes.AssetTDai.Id,
							Quantums: dtypes.NewInt(-40_000_000), // -$40
						},
						{
							AssetId:  constants.BtcUsd.Id,
							Quantums: dtypes.NewInt(100_000_000), // 1 BTC
						},
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      uint32(3),
						BigQuantumsDelta: big.NewInt(1_000_000_000), // 1 ISO
					},
				},
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          assettypes.AssetTDai.Id,
						BigQuantumsDelta: big.NewInt(-50_000_000), // -$50
					},
					{
						AssetId:          constants.BtcUsd.Id,
						BigQuantumsDelta: big.NewInt(100_000_000), // 1 BTC
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.IsoUsd_IsolatedMarket,
			},
			expectedStateTransition: nil,
			expectedErr:             errorsmod.Wrap(types.ErrFailedToUpdateSubaccounts, "when opening a position in GetCollateralPoolStateTransition there should be only 1 asset update"),
		},
		`Returns error if perpetual position was opened with non quote asset update`: {
			settledUpdateWithUpdatedSubaccount: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					Id: &constants.Alice_Num0,
					PerpetualPositions: []*types.PerpetualPosition{
						&constants.PerpetualPosition_OneISOLong,
					},
					AssetPositions: []*types.AssetPosition{
						{
							AssetId:  assettypes.AssetTDai.Id,
							Quantums: dtypes.NewInt(50_000_000), // $50
						},
						{
							AssetId:  constants.BtcUsd.Id,
							Quantums: dtypes.NewInt(100_000_000), // 1 BTC
						},
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      uint32(3),
						BigQuantumsDelta: big.NewInt(1_000_000_000), // 1 ISO
					},
				},
				AssetUpdates: []types.AssetUpdate{
					{
						AssetId:          constants.BtcUsd.Id,
						BigQuantumsDelta: big.NewInt(100_000_000), // 1 BTC
					},
				},
			},
			perpetuals: []perptypes.Perpetual{
				constants.IsoUsd_IsolatedMarket,
			},
			expectedStateTransition: nil,
			expectedErr:             errorsmod.Wrap(types.ErrFailedToUpdateSubaccounts, "when opening a position in GetCollateralPoolStateTransition the asset update should be for the quote asset"),
		},
	}

	for name, tc := range tests {
		t.Run(
			name, func(t *testing.T) {
				stateTransition, err := keeper.GetCollateralPoolStateTransition(
					tc.settledUpdateWithUpdatedSubaccount,
					0,
				)
				if tc.expectedErr != nil {
					require.ErrorIs(t, tc.expectedErr, err)
				} else {
					require.NoError(t, err)
					require.Equal(t, tc.expectedStateTransition, stateTransition)
				}
			},
		)
	}
}

func TestIsValidCollateralPoolUpdates(t *testing.T) {
	tests := map[string]struct {
		// Parameters
		settledUpdate            keeper.SettledUpdate
		perpIdToCollateralPoolId map[uint32]uint32
		expectedResult           types.UpdateResult
		expectedErr              error
	}{
		"Success: no updates": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{},
				PerpetualUpdates:  []types.PerpetualUpdate{},
			},
			perpIdToCollateralPoolId: map[uint32]uint32{},
			expectedResult:           types.Success,
		},
		"Success: single perpetual update": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      0,
						BigQuantumsDelta: big.NewInt(100),
					},
				},
			},
			perpIdToCollateralPoolId: map[uint32]uint32{
				0: 0,
			},
			expectedResult: types.Success,
		},
		"Success: multiple perpetual updates from same collateral pool": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      0,
						BigQuantumsDelta: big.NewInt(100),
					},
					{
						PerpetualId:      1,
						BigQuantumsDelta: big.NewInt(200),
					},
				},
			},
			perpIdToCollateralPoolId: map[uint32]uint32{
				0: 0,
				1: 0,
			},
			expectedResult: types.Success,
		},
		"Success: update existing position in same collateral pool": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					PerpetualPositions: []*types.PerpetualPosition{
						{
							PerpetualId: 0,
							Quantums:    dtypes.NewInt(200),
						},
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      0,
						BigQuantumsDelta: big.NewInt(100),
					},
				},
			},
			perpIdToCollateralPoolId: map[uint32]uint32{
				0: 0,
			},
			expectedResult: types.Success,
		},
		"Success: close position": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					PerpetualPositions: []*types.PerpetualPosition{
						{
							PerpetualId: 0,
							Quantums:    dtypes.NewInt(100),
						},
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      0,
						BigQuantumsDelta: big.NewInt(-100),
					},
				},
			},
			perpIdToCollateralPoolId: map[uint32]uint32{
				0: 0,
			},
			expectedResult: types.Success,
		},
		"Failure: perpetual does not exist": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      999,
						BigQuantumsDelta: big.NewInt(100),
					},
				},
			},
			perpIdToCollateralPoolId: map[uint32]uint32{
				0: 0,
			},
			expectedResult: types.UpdateCausedError,
			expectedErr:    errorsmod.Wrap(perptypes.ErrPerpetualDoesNotExist, "999"),
		},
		"Failure: perpetual does not exist in loop": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      0,
						BigQuantumsDelta: big.NewInt(100),
					},
					{
						PerpetualId:      999,
						BigQuantumsDelta: big.NewInt(100),
					},
				},
			},
			perpIdToCollateralPoolId: map[uint32]uint32{
				0: 0,
			},
			expectedResult: types.UpdateCausedError,
			expectedErr:    errorsmod.Wrap(perptypes.ErrPerpetualDoesNotExist, "999"),
		},
		"Failure: updates to close positionsfor multiple collateral pools": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					PerpetualPositions: []*types.PerpetualPosition{
						{
							PerpetualId: 0,
							Quantums:    dtypes.NewInt(100),
						},
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      0,
						BigQuantumsDelta: big.NewInt(-100),
					},
					{
						PerpetualId:      1,
						BigQuantumsDelta: big.NewInt(200),
					},
				},
			},
			perpIdToCollateralPoolId: map[uint32]uint32{
				0: 0,
				1: 1,
			},
			expectedResult: types.ViolatesCollateralPoolConstraints,
		},
		"Failure: update existing position with different collateral pool": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					PerpetualPositions: []*types.PerpetualPosition{
						{
							PerpetualId: 0,
							Quantums:    dtypes.NewInt(100),
						},
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      1,
						BigQuantumsDelta: big.NewInt(100),
					},
				},
			},
			perpIdToCollateralPoolId: map[uint32]uint32{
				0: 0,
				1: 1,
			},
			expectedResult: types.ViolatesCollateralPoolConstraints,
		},
		"Failure: updates are for a different collateral pool that remaining positions are in": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					PerpetualPositions: []*types.PerpetualPosition{
						{
							PerpetualId: 0,
							Quantums:    dtypes.NewInt(100),
						},
						{
							PerpetualId: 1,
							Quantums:    dtypes.NewInt(100),
						},
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      2,
						BigQuantumsDelta: big.NewInt(100),
					},
				},
			},
			perpIdToCollateralPoolId: map[uint32]uint32{
				0: 0,
				1: 0,
				2: 1,
			},
			expectedResult: types.ViolatesCollateralPoolConstraints,
		},
		"Success: add position to existing collateral pool": {
			settledUpdate: keeper.SettledUpdate{
				SettledSubaccount: types.Subaccount{
					PerpetualPositions: []*types.PerpetualPosition{
						{
							PerpetualId: 0,
							Quantums:    dtypes.NewInt(100),
						},
					},
				},
				PerpetualUpdates: []types.PerpetualUpdate{
					{
						PerpetualId:      1,
						BigQuantumsDelta: big.NewInt(100),
					},
				},
			},
			perpIdToCollateralPoolId: map[uint32]uint32{
				0: 0,
				1: 0,
			},
			expectedResult: types.Success,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			result, err := keeper.IsValidCollateralPoolUpdate(
				tc.settledUpdate,
				tc.perpIdToCollateralPoolId,
			)

			if tc.expectedErr != nil {
				require.ErrorIs(t, err, tc.expectedErr)
			} else {
				require.NoError(t, err)
			}
			require.Equal(t, tc.expectedResult, result)
		})
	}
}
