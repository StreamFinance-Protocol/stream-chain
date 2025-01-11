package types

import "math/big"

type PositionStateTransition uint

const (
	Opened PositionStateTransition = iota
	Closed
)

var positionStateTransitionStringMap = map[PositionStateTransition]string{
	Opened: "opened",
	Closed: "closed",
}

func (t PositionStateTransition) String() string {
	result, exists := positionStateTransitionStringMap[t]
	if !exists {
		return "UnexpectedStateTransitionError"
	}

	return result
}

// Represents a state transition for a collateral transfer from one
// collateral pool to another when a perpetual position is opened or closed.
type CollateralTransferPerpetualPositionStateTransition struct {
	SubaccountId *SubaccountId
	PerpetualId  uint32
	AssetIds     []uint32
	// BigQuantums of collateral to transfer as a result of the state transition.
	BigQuantums []*big.Int
	// The state transition that occurred for the isolated perpetual positions.
	Transition PositionStateTransition
}
