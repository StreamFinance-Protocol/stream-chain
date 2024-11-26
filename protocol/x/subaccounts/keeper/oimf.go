package keeper

import (
	"fmt"
	"math/big"

	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

// Helper function to compute the delta long for a single settled update on a perpetual.
func getDeltaLongFromSettledUpdate(
	u SettledUpdate,
	updatedPerpId uint32,
) (
	deltaLong *big.Int,
) {
	var perpPosition *types.PerpetualPosition
	for _, p := range u.SettledSubaccount.PerpetualPositions {
		// TODO use a pre-populated map
		if p.PerpetualId == updatedPerpId {
			perpPosition = p
		}
	}

	prevQuantums := perpPosition.GetBigQuantums()
	afterQuantums := new(big.Int).Add(
		prevQuantums,
		u.PerpetualUpdates[0].GetBigQuantums(),
	)

	prevLong := prevQuantums // re-use pointer for efficiency
	if prevLong.Sign() < 0 {
		prevLong.SetUint64(0)
	}
	afterLong := afterQuantums // re-use pointer for efficiency
	if afterLong.Sign() < 0 {
		afterLong.SetUint64(0)
	}

	return afterLong.Sub(
		afterLong,
		prevLong,
	)
}

// For `Match` updates:
//   - returns a struct `OpenInterest` if input updates results in OI delta.
//   - returns nil if OI delta is zero.
//   - panics if update format is invalid.
//
// For other update types, returns nil.
func GetDeltaOpenInterestFromUpdates(
	settledUpdates []SettledUpdate,
	updateType types.UpdateType,
) (ret *perptypes.OpenInterestDelta) {
	if updateType != types.Match {
		return nil
	}

	if len(settledUpdates) < 2 {
		panic(
			fmt.Sprintf(
				types.ErrMatchUpdatesMustHaveTwoOrMoreUpdates,
				settledUpdates,
			),
		)
	}

	allUpdatesWithPerpUpdates := []SettledUpdate{}
	for _, update := range settledUpdates {
		if len(update.PerpetualUpdates) > 0 {
			allUpdatesWithPerpUpdates = append(allUpdatesWithPerpUpdates, update)
		}
	}

	if len(allUpdatesWithPerpUpdates) != 2 {
		panic(
			fmt.Sprintf(
				types.ErrMatchUpdatesMustHaveTwoPerpetualUpdates,
				settledUpdates,
			),
		)
	}

	for _, update := range allUpdatesWithPerpUpdates {
		if len(update.PerpetualUpdates) != 1 {
			panic(
				fmt.Sprintf(
					types.ErrMatchUpdatesMustUpdateOnePerp,
					settledUpdates,
				),
			)
		}
	}

	perpUpdate0 := allUpdatesWithPerpUpdates[0].PerpetualUpdates[0]
	perpUpdate1 := allUpdatesWithPerpUpdates[1].PerpetualUpdates[0]

	if perpUpdate0.PerpetualId != perpUpdate1.PerpetualId {
		panic(
			fmt.Sprintf(
				types.ErrMatchUpdatesMustBeSamePerpId,
				settledUpdates,
			),
		)
	}

	updatedPerpId := perpUpdate0.PerpetualId

	if areBothPerpUpdatesOnSameSide(perpUpdate0, perpUpdate1) ||
		arePerpUpdatesDifferentSize(perpUpdate0, perpUpdate1) {
		panic(
			fmt.Sprintf(
				types.ErrMatchUpdatesInvalidSize,
				settledUpdates,
			),
		)
	}

	baseQuantumsDelta := big.NewInt(0)
	for _, perpUpdate := range allUpdatesWithPerpUpdates {
		deltaLong := getDeltaLongFromSettledUpdate(perpUpdate, updatedPerpId)
		baseQuantumsDelta.Add(
			baseQuantumsDelta,
			deltaLong,
		)
	}

	if baseQuantumsDelta.Sign() == 0 {
		return nil
	}

	return &perptypes.OpenInterestDelta{
		PerpetualId:  updatedPerpId,
		BaseQuantums: baseQuantumsDelta,
	}
}

func areBothPerpUpdatesOnSameSide(
	perpUpdate0 types.PerpetualUpdate,
	perpUpdate1 types.PerpetualUpdate,
) bool {
	return perpUpdate0.BigQuantumsDelta.Sign()*perpUpdate1.BigQuantumsDelta.Sign() > 0
}

func arePerpUpdatesDifferentSize(
	perpUpdate0 types.PerpetualUpdate,
	perpUpdate1 types.PerpetualUpdate,
) bool {
	return perpUpdate0.BigQuantumsDelta.CmpAbs(perpUpdate1.BigQuantumsDelta) != 0
}
