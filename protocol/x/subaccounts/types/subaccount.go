package types

import (
	"math/big"

	errorsmod "cosmossdk.io/errors"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

const (
	MaxSubaccountIdNumber = 128_000 // 0 ... 128,000 are valid numbers.
)

// BaseQuantums is used to represent an amount in base quantums.
type BaseQuantums uint64

// Get the BaseQuantum value in *big.Int.
func (bq BaseQuantums) ToBigInt() *big.Int {
	return new(big.Int).SetUint64(bq.ToUint64())
}

// Get the BaseQuantum value in uint64.
func (bq BaseQuantums) ToUint64() uint64 {
	return uint64(bq)
}

func (m *SubaccountId) Validate() error {
	if _, err := sdk.AccAddressFromBech32(m.Owner); err != nil {
		return errorsmod.Wrapf(ErrInvalidSubaccountIdOwner,
			"invalid SubaccountId Owner address (%s). Error: (%s)", m.Owner, err)
	}

	if m.Number > MaxSubaccountIdNumber {
		return ErrInvalidSubaccountIdNumber
	}

	return nil
}

func (m *SubaccountId) MustGetAccAddress() sdk.AccAddress {
	return sdk.MustAccAddressFromBech32(m.Owner)
}

// GetPerpetualPositionForId returns the perpetual position with the given
// perpetual id. Returns nil if subaccount does not have an open position
// for the perpetual.
func (m *Subaccount) GetPerpetualPositionForId(
	perpetualId uint32,
) (
	perpetualPosition *PerpetualPosition,
	exists bool,
) {
	if m != nil {
		for _, position := range m.PerpetualPositions {
			if position.PerpetualId == perpetualId {
				return position, true
			}
		}
	}
	return nil, false
}

// GetTDaiPosition returns the balance of the TDAI asset position.
func (m *Subaccount) GetTDaiPosition() *big.Int {
	TDaiAssetPosition := m.getTDaiAssetPosition()
	if TDaiAssetPosition == nil {
		return new(big.Int)
	}
	return TDaiAssetPosition.GetBigQuantums()
}

// SetTDaiAssetPosition sets the balance of the TDai asset position to `newTDaiPosition`.
func (m *Subaccount) SetTDaiAssetPosition(newTDaiPosition *big.Int) {
	if m == nil {
		return
	}

	TDaiAssetPosition := m.getTDaiAssetPosition()
	if newTDaiPosition == nil || newTDaiPosition.Sign() == 0 {
		if TDaiAssetPosition != nil {
			m.removeTDaiAssetPosition()
		}
	} else {
		if TDaiAssetPosition == nil {
			TDaiAssetPosition = &AssetPosition{
				AssetId: assettypes.AssetTDai.Id,
			}
			m.AssetPositions = append([]*AssetPosition{TDaiAssetPosition}, m.AssetPositions...)
		}
		TDaiAssetPosition.Quantums = dtypes.NewIntFromBigInt(newTDaiPosition)
	}
}

func (m *Subaccount) getTDaiAssetPosition() *AssetPosition {
	if m == nil || len(m.AssetPositions) == 0 {
		return nil
	}

	for _, assetPosition := range m.AssetPositions {
		if assetPosition.AssetId == assettypes.AssetTDai.Id {
			return assetPosition
		}
	}
	return nil
}

func (m *Subaccount) removeTDaiAssetPosition() {
	if m == nil || len(m.AssetPositions) == 0 {
		return
	}

	for i, assetPosition := range m.AssetPositions {
		if assetPosition.AssetId == assettypes.AssetTDai.Id {
			// Remove the TDai asset position from the slice
			m.AssetPositions = append(m.AssetPositions[:i], m.AssetPositions[i+1:]...)
			return
		}
	}
}

func (m *Subaccount) getAssetPosition(assetId uint32) *AssetPosition {
	if m == nil || len(m.AssetPositions) == 0 {
		return nil
	}

	for _, assetPosition := range m.AssetPositions {
		if assetPosition.AssetId == assetId {
			return assetPosition
		}
	}
	return nil
}

func (m *Subaccount) GetAssetPosition(assetId uint32) *big.Int {
	assetPosition := m.getAssetPosition(assetId)
	if assetPosition == nil {
		return new(big.Int)
	}
	return assetPosition.GetBigQuantums()
}

func (m *Subaccount) SetAssetPosition(newAssetPosition *big.Int, assetId uint32) {
	if m == nil {
		return
	}

	assetPosition := m.getAssetPosition(assetId)
	if newAssetPosition == nil || newAssetPosition.Sign() == 0 {
		if assetPosition != nil {
			m.removeAssetPosition(assetId)
		}
	} else {
		if assetPosition == nil {
			assetPosition = &AssetPosition{
				AssetId: assetId,
			}
			m.AssetPositions = append([]*AssetPosition{assetPosition}, m.AssetPositions...)
		}
		assetPosition.Quantums = dtypes.NewIntFromBigInt(newAssetPosition)
	}
}

func (m *Subaccount) removeAssetPosition(assetId uint32) {
	if m == nil || len(m.AssetPositions) == 0 {
		return
	}

	for i, assetPosition := range m.AssetPositions {
		if assetPosition.AssetId == assetId {
			// Remove the asset position from the slice
			m.AssetPositions = append(m.AssetPositions[:i], m.AssetPositions[i+1:]...)
			return
		}
	}
}
