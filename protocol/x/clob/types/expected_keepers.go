package types

import (
	"context"
	"math/big"
	"math/rand"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	blocktimetypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/blocktime/types"
	perpetualsmoduletypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type SubaccountsKeeper interface {
	CanUpdateSubaccounts(
		ctx sdk.Context,
		updates []satypes.Update,
		updateType satypes.UpdateType,
	) (
		success bool,
		successPerUpdate []satypes.UpdateResult,
		err error,
	)
	GetNetCollateralAndMarginRequirements(
		ctx sdk.Context,
		update satypes.Update,
	) (
		bigNetCollateral *big.Int,
		bigInitialMargin *big.Int,
		bigMaintenanceMargin *big.Int,
		err error,
	)
	GetSubaccount(
		ctx sdk.Context,
		id satypes.SubaccountId,
	) (
		val satypes.Subaccount,
	)
	GetAllSubaccount(
		ctx sdk.Context,
	) (
		list []satypes.Subaccount,
	)
	GetRandomSubaccount(
		ctx sdk.Context,
		rand *rand.Rand,
	) (
		satypes.Subaccount,
		error,
	)
	UpdateSubaccounts(
		ctx sdk.Context,
		updates []satypes.Update,
		updateType satypes.UpdateType,
	) (
		success bool,
		successPerUpdate []satypes.UpdateResult,
		err error,
	)
	SetNegativeTncSubaccountSeenAtBlock(
		ctx sdk.Context,
		perpetualId uint32,
		blockHeight uint32,
	) error
	TransferFeesToFeeCollectorModule(
		ctx sdk.Context,
		assetId uint32,
		amount *big.Int,
		perpetualId uint32,
	) error
	TransferInsuranceFundPayments(
		ctx sdk.Context,
		amount *big.Int,
		perpetualId uint32,
		assetId uint32,
	) error
	TransferLiquidityFee(
		ctx sdk.Context,
		liquidityFeeQuoteQuantums *big.Int,
		perpetualId uint32,
		assetId uint32,
	) error
	TransferValidatorFee(
		ctx sdk.Context,
		validatorFeeQuoteQuantums *big.Int,
		perpetualId uint32,
		assetId uint32,
	) error
	GetCollateralPoolAddressFromPerpetualId(
		ctx sdk.Context,
		perpetualId uint32,
	) (sdk.AccAddress, error)
	GetSettledSubaccount(
		ctx sdk.Context,
		subaccount satypes.Subaccount,
	) (
		settledSubaccount satypes.Subaccount,
		fundingPayments map[uint32]dtypes.SerializableInt,
		yieldForSubaccount *big.Int,
		err error,
	)
}

type AssetsKeeper interface {
	GetAsset(ctx sdk.Context, id uint32) (val assettypes.Asset, exists bool)
	ConvertCoinToAsset(ctx sdk.Context, assetId uint32, coin sdk.Coin) (quantums *big.Int, convertedDenom *big.Int, err error)
	GetNetCollateral(ctx sdk.Context, id uint32, bigQuantums *big.Int, quoteCurrencyAtomicResolution int32) (bigNetCollateralQuoteQuantums *big.Int, err error)
}

type BlockTimeKeeper interface {
	GetPreviousBlockInfo(ctx sdk.Context) blocktimetypes.BlockInfo
}

type FeeTiersKeeper interface {
	GetPerpetualFeePpm(ctx sdk.Context, address string, isTaker bool) int32
}

type PerpetualsKeeper interface {
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
	GetPerpetual(
		ctx sdk.Context,
		id uint32,
	) (val perpetualsmoduletypes.Perpetual, err error)
	GetAllPerpetuals(ctx sdk.Context) (list []perpetualsmoduletypes.Perpetual)
	GetAllLiquidityTiers(ctx sdk.Context) (list []perpetualsmoduletypes.LiquidityTier)
	GetCollateralPool(ctx sdk.Context, id uint32) (
		collateralPool perpetualsmoduletypes.CollateralPool,
		err error,
	)
	IsMainCollateralPool(ctx sdk.Context, perpetualId uint32) (bool, error)
	GetPerpetualAndMarketPrice(
		ctx sdk.Context,
		perpetualId uint32,
	) (perpetualsmoduletypes.Perpetual, pricestypes.MarketPrice, error)
	GetSettlementPpm(
		ctx sdk.Context,
		perpetualId uint32,
		quantums *big.Int,
		index *big.Int,
	) (
		bigNetSettlement *big.Int,
		newFundingIndex *big.Int,
		err error,
	)
	MaybeProcessNewFundingTickEpoch(ctx sdk.Context)
	GetInsuranceFundModuleAddress(ctx sdk.Context, perpetualId uint32) (sdk.AccAddress, error)
	GetInsuranceFundName(ctx sdk.Context, perpetualId uint32) (string, error)
	GetCollateralPoolFromPerpetualId(
		ctx sdk.Context,
		perpetualId uint32,
	) (
		collateralPool perpetualsmoduletypes.CollateralPool,
		err error,
	)
}

type PricesKeeper interface {
	GetMarketParam(ctx sdk.Context, id uint32) (param pricestypes.MarketParam, exists bool)
	GetAllMarketPrices(ctx sdk.Context) []pricestypes.MarketPrice
	GetMarketPrice(ctx sdk.Context, id uint32) (pricestypes.MarketPrice, error)
}

type StatsKeeper interface {
	RecordFill(ctx sdk.Context, takerAddress string, makerAddress string, notional *big.Int)
}

// AccountKeeper defines the expected account keeper used for simulations.
type AccountKeeper interface {
	GetAccount(ctx context.Context, addr sdk.AccAddress) sdk.AccountI
}

// BankKeeper defines the expected bank keeper used for simulations.
type BankKeeper interface {
	SpendableCoins(ctx context.Context, addr sdk.AccAddress) sdk.Coins
	GetBalance(ctx context.Context, addr sdk.AccAddress, denom string) sdk.Coin
}
