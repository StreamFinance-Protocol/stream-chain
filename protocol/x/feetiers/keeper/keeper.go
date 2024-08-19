package keeper

import (
	"fmt"
	"math"
	"math/big"

	"cosmossdk.io/log"
	storetypes "cosmossdk.io/store/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/feetiers/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type (
	Keeper struct {
		cdc         codec.BinaryCodec
		statsKeeper types.StatsKeeper
		storeKey    storetypes.StoreKey
		authorities map[string]struct{}
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	statsKeeper types.StatsKeeper,
	storeKey storetypes.StoreKey,
	authorities []string,
) *Keeper {
	return &Keeper{
		cdc:         cdc,
		statsKeeper: statsKeeper,
		storeKey:    storeKey,
		authorities: lib.UniqueSliceToSet(authorities),
	}
}

func (k Keeper) HasAuthority(authority string) bool {
	_, ok := k.authorities[authority]
	return ok
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With(log.ModuleKey, fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) InitializeForGenesis(ctx sdk.Context) {}

func (k Keeper) getUserFeeTier(ctx sdk.Context, address string) (uint32, *types.PerpetualFeeTier) {
	userStats := k.statsKeeper.GetUserStats(ctx, address)
	globalStats := k.statsKeeper.GetGlobalStats(ctx)

	// Invariant: we know there is at least one tier and that the first tier has no requirements
	tiers := k.GetPerpetualFeeParams(ctx).Tiers
	idx := uint32(0)

	// Find the last tier we meet all requirements for
	for i := 0; i < len(tiers); i++ {
		currTier := tiers[i]
		if userStats.MakerNotional.IsNil() {
			userStats.MakerNotional = dtypes.ZeroInt()
		}
		bigUserMakerNotional := userStats.MakerNotional.BigInt()
		if userStats.TakerNotional.IsNil() {
			userStats.TakerNotional = dtypes.ZeroInt()
		}
		bigUserTakerNotional := userStats.TakerNotional.BigInt()
		bigUserTotalNotional := new(big.Int).Add(bigUserMakerNotional, bigUserTakerNotional)

		if globalStats.NotionalTraded.IsNil() {
			globalStats.NotionalTraded = dtypes.ZeroInt()
		}
		bigGlobalNotional := globalStats.NotionalTraded.BigInt()
		bigAbsVolumeRequirement := currTier.AbsoluteVolumeRequirement.BigInt()

		bigTotalVolumeShareRequirement := lib.BigIntMulPpm(
			bigGlobalNotional,
			currTier.TotalVolumeShareRequirementPpm,
		)
		bigMakerVolumeShareRequirement := lib.BigIntMulPpm(
			bigGlobalNotional,
			currTier.MakerVolumeShareRequirementPpm,
		)

		if bigUserTotalNotional.Cmp(bigAbsVolumeRequirement) == -1 ||
			bigUserTotalNotional.Cmp(bigTotalVolumeShareRequirement) == -1 ||
			bigUserMakerNotional.Cmp(bigMakerVolumeShareRequirement) == -1 {
			break
		}
		idx = uint32(i)
	}

	return idx, tiers[idx]
}

func (k Keeper) GetPerpetualFeePpm(ctx sdk.Context, address string, isTaker bool) int32 {
	_, userTier := k.getUserFeeTier(ctx, address)
	if isTaker {
		return userTier.TakerFeePpm
	}
	return userTier.MakerFeePpm
}

// GetLowestMakerFee returns the lowest maker fee among any tiers.
func (k Keeper) GetLowestMakerFee(ctx sdk.Context) int32 {
	feeParams := k.GetPerpetualFeeParams(ctx)

	lowestMakerFee := int32(math.MaxInt32)
	for _, tier := range feeParams.Tiers {
		if tier.MakerFeePpm < lowestMakerFee {
			lowestMakerFee = tier.MakerFeePpm
		}
	}

	return lowestMakerFee
}
