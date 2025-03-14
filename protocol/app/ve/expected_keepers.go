package ve

import (
	"math/big"

	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// PreparePricesKeeper defines the expected Prices keeper used for `PrepareProposal`.
type PreBlockExecPricesKeeper interface {
	PerformStatefulPriceUpdateValidation(
		ctx sdk.Context,
		marketPriceUpdate *pricestypes.MarketPriceUpdate,
	) (isSpotValid bool, isPnlValid bool)

	UpdateSmoothedSpotPrices(
		ctx sdk.Context,
		linearInterpolateFunc func(v0 uint64, v1 uint64, ppm uint32) (uint64, error),
	) error

	GetValidMarketSpotPriceUpdates(ctx sdk.Context) []*pricestypes.MarketSpotPriceUpdate

	GetAllMarketParams(ctx sdk.Context) []pricestypes.MarketParam

	GetMarketParam(ctx sdk.Context, id uint32) (market pricestypes.MarketParam, exists bool)

	GetSmoothedSpotPrice(markedId uint32) (uint64, bool)
}

type VoteExtensionYieldKeeper interface {
	GetSDAIPrice(ctx sdk.Context) (price *big.Int, found bool)
	GetSDAILastBlockUpdated(ctx sdk.Context) (blockHeight *big.Int, found bool)
}

type ExtendVotePerpetualsKeeper interface {
	GetPerpetual(
		ctx sdk.Context,
		id uint32,
	) (val perptypes.Perpetual, err error)
}

type VEApplierInterface interface {
	ApplyVE(ctx sdk.Context, txs [][]byte, writeToCache bool) error
}
