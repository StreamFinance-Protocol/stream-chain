package types

import (
	errorsmod "cosmossdk.io/errors"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type EthAddress string

func (m *EventParams) Validate() error {
	err := EthAddress(m.EthAddress).Validate()

	if err != nil {
		return err
	}

	return sdk.ValidateDenom(m.Denom)
}

func (ethAddr EthAddress) Validate() error {
	// TODO(CORE-601): More properly validate Ethereum address.
	if ethAddr == "" {
		return errorsmod.Wrap(ErrInvalidEthAddress, "Ethereum contract address cannot be empty")
	}
	return nil
}

func (m *ProposeParams) Validate() error {
	if m.ProposeDelayDuration < 0 {
		return ErrNegativeDuration
	}
	if m.SkipIfBlockDelayedByDuration < 0 {
		return ErrNegativeDuration
	}
	if m.SkipRatePpm > lib.OneMillion {
		return ErrRateOutOfBounds
	}
	return nil
}

func (m *SafetyParams) Validate() error {
	return nil
}
