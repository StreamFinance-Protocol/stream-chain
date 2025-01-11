package types

import (
	"math/big"

	errorsmod "cosmossdk.io/errors"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/pkg/errors"
)

func (p *Perpetual) GetId() uint32 {
	return p.Params.Id
}

func (p *Perpetual) GetYieldIndexAsRat() (*big.Rat, error) {
	if p == nil {
		return nil, ErrPerpIsNil
	}

	yieldIndex := p.GetYieldIndex()

	if yieldIndex == "" {
		return nil, ErrYieldIndexDoesNotExist
	}

	result, success := new(big.Rat).SetString(yieldIndex)

	if !success {
		return nil, ErrRatToStringConversion
	}

	return result, nil
}

// Stateless validation on Perpetual params.
func (p *PerpetualParams) Validate() error {
	// Validate `ticker`.
	if len(p.Ticker) == 0 {
		return errors.WithStack(ErrTickerEmptyString)
	}

	// Validate `defaultFundingPpm`
	defaultFundingPpm := lib.AbsInt32(p.DefaultFundingPpm)
	if defaultFundingPpm > MaxDefaultFundingPpmAbs {
		return errorsmod.Wrap(
			ErrDefaultFundingPpmMagnitudeExceedsMax,
			lib.IntToString(p.DefaultFundingPpm))
	}

	return nil
}
