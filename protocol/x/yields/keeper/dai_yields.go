package keeper

import (
	"errors"
	"fmt"
	"math/big"

	errorsmod "cosmossdk.io/errors"
	sdkmath "cosmossdk.io/math"
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	assettypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/assets/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/yields/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// Assumes that it is called with valid inputs from vote extension logic.
func (k Keeper) ProcessNewSDaiConversionRateUpdate(ctx sdk.Context, sDaiConversionRate *big.Int, blockHeight *big.Int) error {
	if sDaiConversionRate == nil || blockHeight == nil {
		return errors.New("sDaiConversionRate or blockHeight cannot be nil")
	}

	if blockHeight.Sign() <= 0 {
		return fmt.Errorf("blockHeight must be positive: %s", blockHeight)
	}

	oneScaledBySDaiDecimals := GetOneScaledBySDaiDecimals()
	if sDaiConversionRate.Cmp(oneScaledBySDaiDecimals) < 0 {
		return fmt.Errorf("sDai conversion rate must be greater than 1.0: %s", sDaiConversionRate)
	}

	lastBlockUpdated, found := k.GetSDAILastBlockUpdated(ctx)
	if found && ctx.BlockHeight()-lastBlockUpdated.Int64() < types.SDAI_UPDATE_BLOCK_DELAY {
		return nil
	}

	prevRate, found := k.GetSDAIPrice(ctx)
	if found {
		if sDaiConversionRate.Cmp(prevRate) < 0 {
			return fmt.Errorf("new sDai conversion rate (%s) is not greater than the previous rate (%s)", sDaiConversionRate, prevRate.String())
		}

		if sDaiConversionRate.Cmp(prevRate) == 0 {
			return nil
		}
	}

	k.SetSDAIPrice(ctx, sDaiConversionRate)
	k.SetSDAILastBlockUpdated(ctx, blockHeight)

	sDaiSupplyCoins := k.bankKeeper.GetSupply(ctx, types.SDaiDenom)
	sDaiSupplyDenomAmount := sDaiSupplyCoins.Amount.BigInt()
	tDaiSupplyCoins := k.bankKeeper.GetSupply(ctx, types.TDaiDenom)
	tDaiSupplyDenomAmount := tDaiSupplyCoins.Amount.BigInt()

	sDaiSupplyZero := sDaiSupplyDenomAmount.Cmp(big.NewInt(0)) == 0
	tDaiSupplyZero := tDaiSupplyDenomAmount.Cmp(big.NewInt(0)) == 0

	if sDaiSupplyZero && !tDaiSupplyZero {
		return errors.New("sDai supply is zero but tDai supply is not zero")
	}

	if sDaiSupplyZero {
		return nil
	}

	if tDaiSupplyZero {
		return nil
	}

	return k.UpdateMintStateOnSDaiConversionRateUpdate(ctx)
}

func (k Keeper) UpdateMintStateOnSDaiConversionRateUpdate(ctx sdk.Context) error {
	tDaiSupplyDenomAmountBeforeNewEpoch, tDaiDenomAmountMinted, err := k.MintNewTDaiYields(ctx)
	if err != nil {
		return err
	}

	if tDaiDenomAmountMinted.Cmp(big.NewInt(0)) == 0 || tDaiSupplyDenomAmountBeforeNewEpoch.Cmp(big.NewInt(0)) == 0 {
		return nil
	}

	err = k.ClaimInsuranceFundYields(ctx, tDaiSupplyDenomAmountBeforeNewEpoch, tDaiDenomAmountMinted)
	if err != nil {
		return err
	}

	err = k.SetNewYieldsIndex(ctx, tDaiSupplyDenomAmountBeforeNewEpoch, tDaiDenomAmountMinted)
	if err != nil {
		return err
	}

	err = k.perpetualsKeeper.UpdateYieldsIndexToNewMint(ctx, tDaiSupplyDenomAmountBeforeNewEpoch, tDaiDenomAmountMinted)
	if err != nil {
		return err
	}

	// Emit indexer event
	sDAIPrice, found := k.GetSDAIPrice(ctx)
	if !found {
		return errors.New("could not find sDAI price when emitting indexer event for new yields index")
	}

	assetYieldsIndex, found := k.GetAssetYieldsIndex(ctx)
	if !found {
		return errors.New("could not find asset yields index when emitting indexer event for new yields index")
	}

	indexerevents.NewUpdateYieldsParamsEventV1(
		sDAIPrice.String(),
		assetYieldsIndex.String(),
	)

	k.GetIndexerEventManager().AddTxnEvent(
		ctx,
		indexerevents.SubtypeYieldsParams,
		indexerevents.UpdateYieldsParamsEventVersion,
		indexer_manager.GetBytes(
			indexerevents.NewUpdateYieldsParamsEventV1(
				sDAIPrice.String(),
				assetYieldsIndex.String(),
			),
		),
	)

	return nil
}

func (k Keeper) MintNewTDaiYields(ctx sdk.Context) (*big.Int, *big.Int, error) {
	sDaiSupplyCoins := k.bankKeeper.GetSupply(ctx, types.SDaiDenom)
	sDaiSupplyDenomAmount := sDaiSupplyCoins.Amount.BigInt()
	if sDaiSupplyDenomAmount.Cmp(big.NewInt(0)) == 0 {
		return big.NewInt(0), big.NewInt(0), nil
	}

	tDaiSupplyCoins := k.bankKeeper.GetSupply(ctx, types.TDaiDenom)
	tDaiSupplyDenomAmount := tDaiSupplyCoins.Amount.BigInt()
	if tDaiSupplyDenomAmount.Cmp(big.NewInt(0)) == 0 {
		return big.NewInt(0), big.NewInt(0), nil
	}

	tDAIAfterYields, err := k.GetTradingDAIFromSDAIAmount(ctx, sDaiSupplyDenomAmount)
	if err != nil {
		return nil, nil, err
	}

	if tDAIAfterYields.Cmp(tDaiSupplyDenomAmount) < 0 {
		return nil, nil, errorsmod.Wrap(
			types.ErrInvalidSDAIConversionRate,
			"TDai after mint is less than tDai before mint.",
		)
	}

	tDaiDenomAmountToMint := tDAIAfterYields.Sub(tDAIAfterYields, tDaiSupplyDenomAmount)
	tDaiToMintCoins := sdk.NewCoins(sdk.NewCoin(types.TDaiDenom, sdkmath.NewIntFromBigInt(tDaiDenomAmountToMint)))

	err = k.bankKeeper.MintCoins(ctx, types.TDaiPoolAccount, tDaiToMintCoins)
	if err != nil {
		return nil, nil, errorsmod.Wrap(err, "failed to mint new trading DAI")
	}

	return tDaiSupplyDenomAmount, tDaiDenomAmountToMint, nil
}

func (k Keeper) ClaimInsuranceFundYields(ctx sdk.Context, tDaiSupplyDenomAmountBeforeNewEpoch *big.Int, tDaiDenomAmountMinted *big.Int) error {
	perps := k.perpetualsKeeper.GetAllPerpetuals(ctx)
	insuranceFundsSeen := make(map[string]struct{})

	for _, perpetual := range perps {
		insuranceFund, err := k.perpetualsKeeper.GetInsuranceFundModuleAddress(ctx, perpetual.Params.Id)
		if err != nil {
			return err
		}

		if _, ok := insuranceFundsSeen[insuranceFund.String()]; ok {
			continue
		}

		insuranceFundsSeen[insuranceFund.String()] = struct{}{}

		insuranceFundDenomBalance := k.bankKeeper.GetBalance(ctx, insuranceFund, types.TDaiDenom)
		if insuranceFundDenomBalance.IsZero() {
			continue
		}
		insuranceFundDenomBalanceBigInt := insuranceFundDenomBalance.Amount.BigInt()

		insuranceFundYieldsToClaim := new(big.Int).Mul(insuranceFundDenomBalanceBigInt, tDaiDenomAmountMinted)
		insuranceFundYieldsToClaim.Div(insuranceFundYieldsToClaim, tDaiSupplyDenomAmountBeforeNewEpoch)

		if insuranceFundYieldsToClaim.Sign() <= 0 {
			continue
		}

		coinsToTransfer := sdk.NewCoin(assettypes.AssetTDai.Denom, sdkmath.NewIntFromBigInt(insuranceFundYieldsToClaim))

		if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.TDaiPoolAccount, insuranceFund, []sdk.Coin{coinsToTransfer}); err != nil {
			return err
		}
	}

	return nil
}

func (k Keeper) SetNewYieldsIndex(
	ctx sdk.Context,
	totalTDaiPreMint *big.Int,
	totalTDaiMinted *big.Int,
) error {
	if totalTDaiMinted.Cmp(big.NewInt(0)) < 0 {
		return errors.New("total t-dai minted is negative")
	}

	if totalTDaiPreMint.Cmp(big.NewInt(0)) <= 0 {
		return errors.New("total t-dai before mint is 0 or negative")
	}

	ratio := new(big.Rat).SetFrac(totalTDaiMinted, totalTDaiPreMint)
	additionalFactor := ratio.Add(big.NewRat(1, 1), ratio)

	assetYieldsIndex, found := k.GetAssetYieldsIndex(ctx)

	if !found || assetYieldsIndex.Cmp(big.NewRat(0, 1)) == 0 {
		assetYieldsIndex = additionalFactor
	} else {
		assetYieldsIndex = assetYieldsIndex.Mul(assetYieldsIndex, additionalFactor)
	}

	k.SetAssetYieldsIndex(ctx, assetYieldsIndex)
	return nil
}
