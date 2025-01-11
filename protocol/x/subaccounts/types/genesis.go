package types

import (
	"errors"
	"math/big"

	errorsmod "cosmossdk.io/errors"
)

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Subaccounts: []Subaccount{},
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	includedAccounts := make(map[SubaccountId]bool)
	for _, sa := range gs.Subaccounts {
		subaccountId := sa.GetId()
		if err := subaccountId.Validate(); err != nil {
			return err
		}
		if includedAccounts[*subaccountId] {
			return errorsmod.Wrapf(ErrDuplicateSubaccountIds,
				"duplicate subaccount id %+v found within genesis state", subaccountId)
		}
		includedAccounts[*subaccountId] = true

		// Validate Asset Yield Index
		if sa.AssetYieldIndex != "" {
			yieldIndexRat, ok := new(big.Rat).SetString(sa.AssetYieldIndex)
			if !ok {
				return errors.New("could not convert string to big.Rat")
			}

			if yieldIndexRat.Cmp(big.NewRat(0, 1)) == -1 {
				return ErrNegativeAssetYieldIndexNotSupported
			}
		}

		// Validate AssetPositions.
		for i := 0; i < len(sa.GetAssetPositions()); i++ {
			assetP := sa.GetAssetPositions()[i]
			if assetP.GetBigQuantums().Sign() == 0 {
				return ErrAssetPositionZeroQuantum
			}
		}

		// Validate PerpetualPositions.
		for i := 0; i < len(sa.GetPerpetualPositions()); i++ {
			perpP := sa.GetPerpetualPositions()[i]
			if i > 0 && perpP.PerpetualId <= sa.GetPerpetualPositions()[i-1].PerpetualId {
				return ErrPerpPositionsOutOfOrder
			}
			if perpP.GetBigQuantums().Sign() == 0 {
				return ErrPerpPositionZeroQuantum
			}
		}
	}
	return nil
}
