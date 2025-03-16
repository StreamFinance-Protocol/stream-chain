package keeper

import (
	"math/rand"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// GetPseudoRand returns a random number generator seeded with a pseudorandom seed.
// The seed is based on the previous block timestamp.
func (k *Keeper) GetPseudoRand(ctx sdk.Context) *rand.Rand {
	previousBlockInfo, found := k.blockTimeKeeper.GetPreviousBlockInfo(ctx)
	if !found {
		previousBlockInfo = types.BlockInfo{
			Timestamp: ctx.BlockTime(),
		}
	}
	s := rand.NewSource(
		previousBlockInfo.Timestamp.Unix(),
	)
	return rand.New(s)
}
