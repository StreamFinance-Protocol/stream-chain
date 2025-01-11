package lib_test

import (
	"math"
	"math/big"
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	big_testutil "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/big"
)

func TestBaseToQuoteQuantums(t *testing.T) {
	tests := map[string]struct {
		bigBaseQuantums               *big.Int
		baseCurrencyAtomicResolution  int32
		quoteCurrencyAtomicResolution int32
		priceValue                    uint64
		priceExponent                 int32
		bigExpectedQuoteQuantums      *big.Int
	}{
		"Converts from base to quote quantums": {
			bigBaseQuantums:               big.NewInt(1),
			baseCurrencyAtomicResolution:  -6,
			quoteCurrencyAtomicResolution: -6,
			priceValue:                    1,
			priceExponent:                 1,
			bigExpectedQuoteQuantums:      big.NewInt(10),
		},
		"Correctly converts negative value": {
			bigBaseQuantums:               big.NewInt(-100),
			baseCurrencyAtomicResolution:  -6,
			quoteCurrencyAtomicResolution: -6,
			priceValue:                    1,
			priceExponent:                 1,
			bigExpectedQuoteQuantums:      big.NewInt(-1000),
		},
		"priceExponent is negative": {
			bigBaseQuantums:               big.NewInt(5_000_000),
			baseCurrencyAtomicResolution:  -6,
			quoteCurrencyAtomicResolution: -6,
			priceValue:                    7,
			priceExponent:                 -5,
			bigExpectedQuoteQuantums:      big.NewInt(350),
		},
		"priceExponent is zero": {
			bigBaseQuantums:               big.NewInt(5_000_000),
			baseCurrencyAtomicResolution:  -6,
			quoteCurrencyAtomicResolution: -6,
			priceValue:                    7,
			priceExponent:                 0,
			bigExpectedQuoteQuantums:      big.NewInt(35_000_000),
		},
		"baseCurrencyAtomicResolution is greater than 10^6": {
			bigBaseQuantums:               big.NewInt(5_000_000),
			baseCurrencyAtomicResolution:  -8,
			quoteCurrencyAtomicResolution: -6,
			priceValue:                    7,
			priceExponent:                 0,
			bigExpectedQuoteQuantums:      big.NewInt(350_000),
		},
		"baseCurrencyAtomicResolution is less than 10^6": {
			bigBaseQuantums:               big.NewInt(5_000_000),
			baseCurrencyAtomicResolution:  -4,
			quoteCurrencyAtomicResolution: -6,
			priceValue:                    7,
			priceExponent:                 1,
			bigExpectedQuoteQuantums:      big.NewInt(35_000_000_000),
		},
		"Calculation rounds down": {
			bigBaseQuantums:               big.NewInt(9),
			baseCurrencyAtomicResolution:  -8,
			quoteCurrencyAtomicResolution: -6,
			priceValue:                    1,
			priceExponent:                 1,
			bigExpectedQuoteQuantums:      big.NewInt(0),
		},
		"Negative calculation rounds up": {
			bigBaseQuantums:               big.NewInt(-9),
			baseCurrencyAtomicResolution:  -8,
			quoteCurrencyAtomicResolution: -6,
			priceValue:                    1,
			priceExponent:                 1,
			bigExpectedQuoteQuantums:      big.NewInt(0),
		},
		"Calculation overflows": {
			bigBaseQuantums:               new(big.Int).SetUint64(math.MaxUint64),
			baseCurrencyAtomicResolution:  -6,
			quoteCurrencyAtomicResolution: -6,
			priceValue:                    2,
			priceExponent:                 0,
			bigExpectedQuoteQuantums:      big_testutil.MustFirst(new(big.Int).SetString("36893488147419103230", 10)),
		},
		"Calculation underflows": {
			bigBaseQuantums:               big_testutil.MustFirst(new(big.Int).SetString("-18446744073709551615", 10)),
			baseCurrencyAtomicResolution:  -6,
			quoteCurrencyAtomicResolution: -6,
			priceValue:                    2,
			priceExponent:                 0,
			bigExpectedQuoteQuantums:      big_testutil.MustFirst(new(big.Int).SetString("-36893488147419103230", 10)),
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			quoteQuantums := lib.BaseToQuoteQuantums(
				tc.bigBaseQuantums,
				tc.baseCurrencyAtomicResolution,
				tc.quoteCurrencyAtomicResolution,
				tc.priceValue,
				tc.priceExponent,
			)
			if tc.bigExpectedQuoteQuantums.Cmp(quoteQuantums) != 0 {
				t.Fatalf(
					"%s: expectedQuoteQuantums: %s, quoteQuantums: %s",
					name,
					tc.bigExpectedQuoteQuantums.String(),
					quoteQuantums.String(),
				)
			}
		})
	}
}
