package keeper

import (
	"math/rand"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// GetPseudoRand returns a random number generator seeded with a pseudorandom seed.
// The seed is based on the previous block timestamp.
func (k *Keeper) GetPseudoRand(ctx sdk.Context) *rand.Rand {
	previousBlockInfo, found := k.blockTimeKeeper.GetPreviousBlockInfo(ctx)
	if !found {
		return errorsmod.Wrapf(
			types.ErrPreviousBlockInfoNotFound,
			"previous block info not found",
		)
	}
	s := rand.NewSource(
		previousBlockInfo.Timestamp.Unix(),
	)
	return rand.New(s)
}
