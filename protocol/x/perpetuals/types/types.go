package types

import (
	"math/big"

	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// GetPricePremiumParams includes the parameters used by
// `ClobKeeper.GetPricePremiumForPerpetual` and
// `MemClob.GetPricePremium` to get the price premium.
type GetPricePremiumParams struct {
	DaemonPrice                 pricestypes.MarketPrice
	BaseAtomicResolution        int32
	QuoteAtomicResolution       int32
	ImpactNotionalQuoteQuantums *big.Int
	MaxAbsPremiumVotePpm        *big.Int
}

// Interface used by ABCI calls to access the perpetuals keeper.
type PerpetualsKeeper interface {
	MaybeProcessNewFundingTickEpoch(ctx sdk.Context)
	MaybeProcessNewFundingSampleEpoch(ctx sdk.Context)
	AddPremiumVotes(ctx sdk.Context, votes []FundingPremium) error
	GetNetNotional(
		ctx sdk.Context,
		id uint32,
		bigQuantums *big.Int,
		quoteCurrencyAtomicResolution int32,
	) (
		bigNetNotionalQuoteQuantums *big.Int,
		err error,
	)
	GetNetCollateral(
		ctx sdk.Context,
		id uint32,
		bigQuantums *big.Int,
		quoteCurrencyAtomicResolution int32,
	) (
		bigNetCollateralQuoteQuantums *big.Int,
		err error,
	)
	GetMarginRequirements(
		ctx sdk.Context,
		id uint32,
		bigQuantums *big.Int,
		quoteCurrencyAtomicResolution int32,
	) (
		bigInitialMarginQuoteQuantums *big.Int,
		bigMaintenanceMarginQuoteQuantums *big.Int,
		err error,
	)
	GetAddPremiumVotes(
		ctx sdk.Context,
	) (
		msgAddPremiumVotes *MsgAddPremiumVotes,
	)
	PerformStatefulPremiumVotesValidation(
		ctx sdk.Context,
		msg *MsgAddPremiumVotes,
	) (
		err error,
	)
	HasAuthority(authority string) bool
	CreatePerpetual(
		ctx sdk.Context,
		id uint32,
		ticker string,
		marketId uint32,
		atomicResolution int32,
		defaultFundingPpm int32,
		liquidityTier uint32,
		dangerIndexPpm uint32,
		collateralPoolId uint32,
		yieldIndex string,
	) (Perpetual, error)
	ModifyPerpetual(
		ctx sdk.Context,
		id uint32,
		ticker string,
		marketId uint32,
		defaultFundingPpm int32,
		liquidityTier uint32,
		dangerIndexPpm uint32,
		collateralPoolId uint32,
	) (Perpetual, error)
	ModifyOpenInterest(
		ctx sdk.Context,
		perpetualId uint32,
		openInterestDeltaBaseQuantums *big.Int,
	) (
		err error,
	)
	SetLiquidityTier(
		ctx sdk.Context,
		id uint32,
		name string,
		initialMarginPpm uint32,
		maintenanceFractionPpm uint32,
		impactNotional uint64,
		openInterestLowerCap uint64,
		openInterestUpperCap uint64,
	) (
		liquidityTier LiquidityTier,
		err error,
	)
	SetCollateralPool(
		ctx sdk.Context,
		collateralPoolId uint32,
		maxCumulativeInsuranceFundDeltaPerBlock uint64,
		multiCollateralAssets *MultiCollateralAssetsArray,
		quoteAssetId uint32,
	) (
		collateralPool CollateralPool,
		err error,
	)
	HasCollateralPool(
		ctx sdk.Context,
		id uint32,
	) (found bool)
	GetCollateralPool(
		ctx sdk.Context,
		id uint32,
	) (
		collateralPool CollateralPool,
		err error,
	)
	GetAllCollateralPools(ctx sdk.Context) (list []CollateralPool)
	IsMainCollateralPool(ctx sdk.Context, perpetualId uint32) (bool, error)
	SetParams(
		ctx sdk.Context,
		params Params,
	) error
	GetAllPerpetuals(
		ctx sdk.Context,
	) []Perpetual
	GetAllLiquidityTiers(ctx sdk.Context) (list []LiquidityTier)
	SendOIUpdatesToIndexer(ctx sdk.Context)
	ValidateAndSetPerpetual(
		ctx sdk.Context,
		perpetual Perpetual,
	) error
}

// OpenInterestDelta represents a (perpId, openInterestDelta) tuple.
type OpenInterestDelta struct {
	// The `Id` of the `Perpetual`.
	PerpetualId uint32
	// Delta of open interest (in base quantums).
	BaseQuantums *big.Int
}
