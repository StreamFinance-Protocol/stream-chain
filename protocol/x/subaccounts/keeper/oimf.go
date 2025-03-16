package keeper

import (
	"math/big"

	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

// Helper function to compute the delta long for a single settled update on a perpetual.
// OI is defined as the sum of all positive long positions. So what we are calculating is
// how many new long positions were there. -100 -> -50 would be 0 new long positions
// -100 -> 50 would be 50 new long positions
// -100 -> 0 would be 0 new long positions
// 0 -> 100 would be 100 new long positions
// 100 -> 50 would be -50 new long positions
// 100 -> -50 would be -100 new long positions
// 100 -> 0 would be -100 new long positions

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
			break
		}
	}

	prevQuantums := perpPosition.GetBigQuantums()
	afterQuantums := new(big.Int).Add(
		prevQuantums,
		u.PerpetualUpdates[0].GetBigQuantums(),
	)

	// prevLong = max(0, prevQuantums)
	prevLong := prevQuantums // re-use pointer for efficiency
	if prevLong.Sign() < 0 {
		prevLong.SetUint64(0)
	}

	// afterLong = max(0, afterQuantums)
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

	baseQuantumsDelta := big.NewInt(0)
	for _, update := range settledUpdates {
		deltaLong := getDeltaLongFromSettledUpdate(update, update.PerpetualUpdates[0].PerpetualId)
		baseQuantumsDelta.Add(
			baseQuantumsDelta,
			deltaLong,
		)
	}

	if baseQuantumsDelta.Sign() == 0 {
		return nil
	}

	return &perptypes.OpenInterestDelta{
		PerpetualId:  settledUpdates[0].PerpetualUpdates[0].PerpetualId,
		BaseQuantums: baseQuantumsDelta,
	}
}
