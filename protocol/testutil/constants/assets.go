package constants

import (
	"math"
	"math/big"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	asstypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
)

const (
	// TestFee is the gas fee offered for test transactions.
	TestFee = "50000" + asstypes.TDaiDenom // 5 cents
	// TestFeeNativeTokens is the gas fee offered for test transactions specified in native tokens.
	// Value is .05 of native token in adv4tnt denom.
	TestFeeNativeTokens = "50000000000000000" + lib.DefaultBaseDenom
	// TestGasLimit is the gas limit used for test transactions.
	// It's set to a larger amount such that the transaction never runs out of gas.
	TestGasLimit = 1_000_000
	// TestNativeTokenDenom is the denom of the native token used for testing.
	TestNativeTokenDenom = "adv4tnt"
)

var (
	// TestFeeCoins_5Cents is the gas fee offered for test transactions.
	TestFeeCoins_5Cents = lib.MustParseCoinsNormalized(TestFee)
	// TestFeeCoins_5Cents_NativeToken is the gas fee offered for test transactions specified in native tokens.
	TestFeeCoins_5Cents_NativeToken = lib.MustParseCoinsNormalized(TestFeeNativeTokens)
)

// BigNegMaxUint64 returns a `big.Int` that is set to -math.MaxUint64.
func BigNegMaxUint64() *big.Int {
	return new(big.Int).Neg(
		new(big.Int).SetUint64(math.MaxUint64),
	)
}

var (
	BtcUsd = &asstypes.Asset{
		Id:               1,
		Symbol:           "BTC",
		Denom:            "btc-denom",
		DenomExponent:    int32(-8),
		HasMarket:        false,
		MarketId:         uint32(0),
		AtomicResolution: int32(-8),
		MaxSlippagePpm:   uint32(0),
	}

	TDai = &asstypes.Asset{
		Id:               0,
		Symbol:           "TDAI",
		Denom:            asstypes.AssetTDai.Denom,
		DenomExponent:    int32(-6),
		HasMarket:        false,
		MarketId:         uint32(0),
		AtomicResolution: int32(-6),
		MaxSlippagePpm:   uint32(0),
	}

	Assets_DefaultGenesisState = asstypes.GenesisState{
		Assets: []asstypes.Asset{
			{
				Id:               TDai.Id,
				Symbol:           TDai.Symbol,
				Denom:            TDai.Denom,
				DenomExponent:    TDai.DenomExponent,
				HasMarket:        TDai.HasMarket,
				MarketId:         TDai.MarketId,
				AtomicResolution: TDai.AtomicResolution,
				MaxSlippagePpm:   TDai.MaxSlippagePpm,
			},
			{
				Id:               BtcUsd.Id,
				Symbol:           BtcUsd.Symbol,
				Denom:            BtcUsd.Denom,
				DenomExponent:    BtcUsd.DenomExponent,
				HasMarket:        BtcUsd.HasMarket,
				MarketId:         BtcUsd.MarketId,
				AtomicResolution: BtcUsd.AtomicResolution,
				MaxSlippagePpm:   BtcUsd.MaxSlippagePpm,
			},
		},
	}
)
