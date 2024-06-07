package types_test

import (
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	tests := map[string]struct {
		genState    *types.GenesisState
		expectedErr error
	}{
		"default is valid": {
			genState: types.DefaultGenesis(),
		},
		"valid genesis state": {
			genState: &types.GenesisState{
				Assets: []types.Asset{
					{
						Id:               0,
						Symbol:           types.AssetUsdc.Symbol,
						Denom:            types.AssetUsdc.Denom,
						DenomExponent:    types.AssetUsdc.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               1,
						Symbol:           types.AssetEth.Symbol,
						Denom:            types.AssetEth.Denom,
						DenomExponent:    types.AssetEth.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               2,
						Symbol:           "BTC",
						Denom:            "btc-denom",
						HasMarket:        true,
						MarketId:         0,
						AtomicResolution: int32(-6),
					},
				},
			},
		},
		"empty genesis state": {
			genState: &types.GenesisState{
				Assets: []types.Asset{},
			},
			expectedErr: types.ErrNoAssetInGenesis,
		},
		"asset[0] not usdc. HasMarket and MarketId incorrect.": {
			genState: &types.GenesisState{
				Assets: []types.Asset{
					{
						Id:               0,
						Symbol:           types.AssetUsdc.Symbol,
						Denom:            types.AssetUsdc.Denom,
						DenomExponent:    types.AssetUsdc.DenomExponent,
						HasMarket:        true,
						MarketId:         0,
						AtomicResolution: int32(-6),
					},
					{
						Id:               1,
						Symbol:           types.AssetEth.Symbol,
						Denom:            types.AssetEth.Denom,
						DenomExponent:    types.AssetEth.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
				},
			},
			expectedErr: types.ErrUsdcMustBeAssetZero,
		},
		"asset[0] is modified usdc. HasMarket incorrect.": {
			genState: &types.GenesisState{
				Assets: []types.Asset{
					{
						Id:               0,
						Symbol:           types.AssetUsdc.Symbol,
						Denom:            types.AssetUsdc.Denom,
						DenomExponent:    types.AssetUsdc.DenomExponent,
						HasMarket:        true,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               1,
						Symbol:           types.AssetEth.Symbol,
						Denom:            types.AssetEth.Denom,
						DenomExponent:    types.AssetEth.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
				},
			},
			expectedErr: types.ErrUsdcMustBeAssetZero,
		},
		"asset[1] not eth. HasMarket and MarketId incorrect.": {
			genState: &types.GenesisState{
				Assets: []types.Asset{
					{
						Id:               0,
						Symbol:           types.AssetUsdc.Symbol,
						Denom:            types.AssetUsdc.Denom,
						DenomExponent:    types.AssetUsdc.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               1,
						Symbol:           types.AssetEth.Symbol,
						Denom:            types.AssetEth.Denom,
						DenomExponent:    types.AssetEth.DenomExponent,
						HasMarket:        true,
						MarketId:         0,
						AtomicResolution: int32(-6),
					},
				},
			},
			expectedErr: types.ErrEthMustBeAssetOne,
		},
		"asset[1] is modified eth. HasMarket incorrect.": {
			genState: &types.GenesisState{
				Assets: []types.Asset{
					{
						Id:               0,
						Symbol:           types.AssetUsdc.Symbol,
						Denom:            types.AssetUsdc.Denom,
						DenomExponent:    types.AssetUsdc.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               1,
						Symbol:           types.AssetEth.Symbol,
						Denom:            types.AssetEth.Denom,
						DenomExponent:    types.AssetEth.DenomExponent,
						HasMarket:        true,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
				},
			},
			expectedErr: types.ErrEthMustBeAssetOne,
		},
		"duplicated asset id": {
			genState: &types.GenesisState{
				Assets: []types.Asset{
					{
						Id:               0,
						Symbol:           types.AssetUsdc.Symbol,
						Denom:            types.AssetUsdc.Denom,
						DenomExponent:    types.AssetUsdc.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               1,
						Symbol:           types.AssetEth.Symbol,
						Denom:            types.AssetEth.Denom,
						DenomExponent:    types.AssetEth.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               0,
						Denom:            "BTC",
						HasMarket:        true,
						MarketId:         0,
						AtomicResolution: int32(-6),
					},
				},
			},
			expectedErr: types.ErrAssetIdAlreadyExists,
		},
		"duplicated denom": {
			genState: &types.GenesisState{
				Assets: []types.Asset{
					{
						Id:               0,
						Symbol:           types.AssetUsdc.Symbol,
						Denom:            types.AssetUsdc.Denom,
						DenomExponent:    types.AssetUsdc.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               1,
						Symbol:           types.AssetEth.Symbol,
						Denom:            types.AssetEth.Denom,
						DenomExponent:    types.AssetEth.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               2,
						Symbol:           types.AssetUsdc.Symbol,
						Denom:            types.AssetUsdc.Denom,
						DenomExponent:    types.AssetUsdc.DenomExponent,
						HasMarket:        true,
						MarketId:         0,
						AtomicResolution: int32(-6),
					},
				},
			},
			expectedErr: types.ErrAssetDenomAlreadyExists,
		},
		"gaps in asset id": {
			genState: &types.GenesisState{
				Assets: []types.Asset{
					{
						Id:               0,
						Symbol:           types.AssetUsdc.Symbol,
						Denom:            types.AssetUsdc.Denom,
						DenomExponent:    types.AssetUsdc.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               1,
						Symbol:           types.AssetEth.Symbol,
						Denom:            types.AssetEth.Denom,
						DenomExponent:    types.AssetEth.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               3,
						Denom:            "BTC",
						HasMarket:        true,
						MarketId:         0,
						AtomicResolution: int32(-6),
					},
				},
			},
			expectedErr: types.ErrGapFoundInAssetId,
		},
		"MarketId non-zero when HasMarket is false": {
			genState: &types.GenesisState{
				Assets: []types.Asset{
					{
						Id:               0,
						Symbol:           types.AssetUsdc.Symbol,
						Denom:            types.AssetUsdc.Denom,
						DenomExponent:    types.AssetUsdc.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               1,
						Symbol:           types.AssetEth.Symbol,
						Denom:            types.AssetEth.Denom,
						DenomExponent:    types.AssetEth.DenomExponent,
						HasMarket:        false,
						AtomicResolution: lib.QuoteCurrencyAtomicResolution,
					},
					{
						Id:               2,
						Denom:            "USDT",
						HasMarket:        false,
						MarketId:         1,
						AtomicResolution: int32(-6),
					},
				},
			},
			expectedErr: types.ErrInvalidMarketId,
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.expectedErr == nil {
				require.NoError(t, err)
			} else {
				require.ErrorIs(t, err, tc.expectedErr)
			}
		})
	}
}
