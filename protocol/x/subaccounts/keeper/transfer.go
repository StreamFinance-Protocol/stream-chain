package keeper

import (
	"math/big"

	errorsmod "cosmossdk.io/errors"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
)

// getValidSubaccountUpdatesForTransfer generates subaccount updates and check
// for validity with `CanUpdateSubaccount()`
// Returns the subaccount updates if check is successful.
func (k Keeper) getValidSubaccountUpdatesForTransfer(
	ctx sdk.Context,
	subaccountId types.SubaccountId,
	assetId uint32,
	quantums *big.Int,
	isToSubaccount bool,
) (
	updates []types.Update,
	err error,
) {
	bigBalanceDelta := new(big.Int).Set(quantums)
	if !isToSubaccount {
		bigBalanceDelta.Neg(bigBalanceDelta)
	}

	updates = []types.Update{
		{
			SubaccountId: subaccountId,
			AssetUpdates: []types.AssetUpdate{
				{
					AssetId:          assetId,
					BigQuantumsDelta: bigBalanceDelta,
				},
			},
		},
	}

	success, successPerUpdate, err := k.CanUpdateSubaccounts(ctx, updates, types.Transfer)
	if err != nil {
		return nil, err
	}

	// If not successful, return error indicating why.
	if err := types.GetErrorFromUpdateResults(success, successPerUpdate, updates); err != nil {
		return nil, err
	}

	return updates, nil
}

// applyValidSubaccountUpdatesForTransfer updates the subaccount by either
// debiting or crediting the subaccount balance.
// Panics if the update fails, as this function assumes the corresponding
// bankKeeper update was successful.
func (k Keeper) applyValidSubaccountUpdateForTransfer(
	ctx sdk.Context,
	updates []types.Update,
	updateType types.UpdateType,
) error {
	// Update subaccount to reflect the transfer.
	success, successPerUpdate, err := k.UpdateSubaccounts(ctx, updates, updateType)

	// Neither of the two conditions below should be true, since `k.CanUpdateSubaccount()`
	// already succeeded.
	if err != nil {
		return err
	}

	return types.GetErrorFromUpdateResults(success, successPerUpdate, updates)
}

// DepositFundsFromAccountToSubaccount returns an error if the call to `k.CanUpdateSubaccounts()`
// fails. Otherwise, increases the asset quantums in the subaccount, translates the
// `assetId` and `quantums` into a `sdk.Coin`, and calls
// `bankKeeper.SendCoinsFromAccountToModule()`.
// TODO(CORE-168): Change function interface to accept `denom` and `amount` instead of `assetId` and `quantums`.
func (k Keeper) DepositFundsFromAccountToSubaccount(
	ctx sdk.Context,
	fromAccount sdk.AccAddress,
	toSubaccountId types.SubaccountId,
	assetId uint32,
	quantums *big.Int,
) error {
	if quantums.Sign() <= 0 {
		return errorsmod.Wrap(types.ErrAssetTransferQuantumsNotPositive, lib.UintToString(assetId))
	}

	convertedQuantums, coinToTransfer, err := k.assetsKeeper.ConvertAssetToCoin(
		ctx,
		assetId,
		quantums,
	)
	if err != nil {
		return err
	}

	// Generate subaccount updates and check whether updates can be applied.
	updates, err := k.getValidSubaccountUpdatesForTransfer(
		ctx,
		toSubaccountId,
		assetId,
		convertedQuantums,
		true, // isToSubaccount
	)
	if err != nil {
		return err
	}

	collateralPoolAddr, err := k.GetCollateralPoolAddressFromSubaccountId(ctx, toSubaccountId)
	if err != nil {
		return err
	}

	// Send coins from `fromModule` to the `subaccounts` module account.
	if err := k.bankKeeper.SendCoins(
		ctx,
		fromAccount,
		collateralPoolAddr,
		[]sdk.Coin{coinToTransfer},
	); err != nil {
		return err
	}

	// Apply subaccount updates.
	return k.applyValidSubaccountUpdateForTransfer(
		ctx,
		updates,
		types.Deposit,
	)
}

// WithdrawFundsFromSubaccountToAccount returns an error if the call to `k.CanUpdateSubaccounts()`
// fails. Otherwise, deducts the asset quantums from the subaccount, translates the
// `assetId` and `quantums` into a `sdk.Coin`, and calls `bankKeeper.SendCoins()`.
func (k Keeper) WithdrawFundsFromSubaccountToAccount(
	ctx sdk.Context,
	fromSubaccountId types.SubaccountId,
	toAccount sdk.AccAddress,
	assetId uint32,
	quantums *big.Int,
) error {
	if quantums.Sign() <= 0 {
		return errorsmod.Wrap(types.ErrAssetTransferQuantumsNotPositive, lib.UintToString(assetId))
	}

	convertedQuantums, coinToTransfer, err := k.assetsKeeper.ConvertAssetToCoin(
		ctx,
		assetId,
		quantums,
	)
	if err != nil {
		return err
	}

	// Generate subaccount updates and check whether updates can be applied.
	updates, err := k.getValidSubaccountUpdatesForTransfer(
		ctx,
		fromSubaccountId,
		assetId,
		convertedQuantums,
		false, // isToSubaccount
	)
	if err != nil {
		return err
	}

	collateralPoolAddr, err := k.GetCollateralPoolAddressFromSubaccountId(ctx, fromSubaccountId)
	if err != nil {
		return err
	}

	// Send coins from `fromModule` to the `subaccounts` module account.
	if err := k.bankKeeper.SendCoins(
		ctx,
		collateralPoolAddr,
		toAccount,
		[]sdk.Coin{coinToTransfer},
	); err != nil {
		return err
	}

	// Apply subaccount updates.
	return k.applyValidSubaccountUpdateForTransfer(
		ctx,
		updates,
		types.Withdrawal,
	)
}

// TransferFeesToFeeCollectorModule translates the assetId and quantums into a sdk.Coin,
// and moves the funds from subaccounts module to the `fee_collector` module account by calling
// bankKeeper.SendCoins(). Does not change any individual subaccount state.
func (k Keeper) TransferFeesToFeeCollectorModule(
	ctx sdk.Context,
	assetId uint32,
	quantums *big.Int,
	perpetualId uint32,
) error {
	if quantums.Sign() == 0 {
		return nil
	}

	_, coinToTransfer, err := k.assetsKeeper.ConvertAssetToCoin(
		ctx,
		assetId,
		new(big.Int).Abs(quantums),
	)
	if err != nil {
		return err
	}

	collateralPoolAddr, err := k.GetCollateralPoolAddressFromPerpetualId(ctx, perpetualId)
	if err != nil {
		return err
	}

	// Send coins from `subaccounts` to the `auth` module fee collector account.
	fromModuleAddr := collateralPoolAddr
	toModuleAddr := authtypes.NewModuleAddress(authtypes.FeeCollectorName)

	if quantums.Sign() < 0 {
		// In the case of a liquidation, net fees can be negative if the maker gets a rebate.
		fromModuleAddr, toModuleAddr = toModuleAddr, fromModuleAddr
	}

	if err := k.bankKeeper.SendCoins(
		ctx,
		fromModuleAddr,
		toModuleAddr,
		[]sdk.Coin{coinToTransfer},
	); err != nil {
		return err
	}

	return nil
}

// TransferInsuranceFundPayments transfers funds in and out of the insurance fund to the subaccounts
// module by calling `bankKeeper.SendCoins`.
// This function transfers funds
//   - from the insurance fund to the subaccounts module when `insuranceFundDelta` is negative.
//   - from the subaccounts module to the insurance fund when `insuranceFundDelta` is positive.
//   - does nothing if `insuranceFundDelta` is zero.
//
// If the sender account does not have enough balance for the transfer, an error is returned.
// Note this function does not change any individual subaccount state.
func (k Keeper) TransferInsuranceFundPayments(
	ctx sdk.Context,
	insuranceFundDelta *big.Int,
	perpetualId uint32,
	assetId uint32,
) error {
	if insuranceFundDelta.Sign() == 0 {
		return nil
	}

	_, coinToTransfer, err := k.assetsKeeper.ConvertAssetToCoin(
		ctx,
		assetId,
		new(big.Int).Abs(insuranceFundDelta),
	)
	if err != nil {
		panic(err)
	}

	// Determine the sender and receiver.
	// Send coins from `subaccounts` to the `insurance_fund` module account by default.
	fromModule, err := k.GetCollateralPoolAddressFromPerpetualId(ctx, perpetualId)
	if err != nil {
		panic(err)
	}
	toModule, err := k.perpetualsKeeper.GetInsuranceFundModuleAddress(ctx, perpetualId)
	if err != nil {
		panic(err)
	}

	if insuranceFundDelta.Sign() < 0 {
		// Insurance fund needs to cover losses from liquidations.
		// Send coins from the insurance fund to the `subaccounts` module account.
		fromModule, toModule = toModule, fromModule
	}

	return k.bankKeeper.SendCoins(
		ctx,
		fromModule,
		toModule,
		[]sdk.Coin{coinToTransfer},
	)
}

func (k Keeper) TransferRouterFee(
	ctx sdk.Context,
	routerFeeQuoteQuantums *big.Int,
	routerFeeOwner string,
	perpetualId uint32,
	assetId uint32,
) error {
	if routerFeeQuoteQuantums.Sign() < 0 {
		return errorsmod.Wrap(types.ErrAssetTransferQuantumsNotPositive, "Router fee quote quantums cannot be negative")
	}

	if routerFeeQuoteQuantums.Sign() == 0 {
		return nil
	}

	_, coinToTransfer, err := k.assetsKeeper.ConvertAssetToCoin(
		ctx,
		assetId,
		new(big.Int).Abs(routerFeeQuoteQuantums),
	)
	if err != nil {
		panic(err)
	}

	// Determine the sender and receiver.
	// Send coins from `subaccounts` to the `insurance_fund` module account by default.
	fromModule, err := k.GetCollateralPoolAddressFromPerpetualId(ctx, perpetualId)
	if err != nil {
		panic(err)
	}

	return k.bankKeeper.SendCoins(
		ctx,
		fromModule,
		sdk.MustAccAddressFromBech32(routerFeeOwner),
		[]sdk.Coin{coinToTransfer},
	)
}

func (k Keeper) TransferLiquidityFee(
	ctx sdk.Context,
	liquidityFeeQuoteQuantums *big.Int,
	perpetualId uint32,
	assetId uint32,
) error {
	if liquidityFeeQuoteQuantums.Sign() < 0 {
		return errorsmod.Wrap(types.ErrAssetTransferQuantumsNotPositive, "Liquidity fee quote quantums cannot be negative")
	}

	if liquidityFeeQuoteQuantums.Sign() == 0 {
		return nil
	}

	_, coinToTransfer, err := k.assetsKeeper.ConvertAssetToCoin(
		ctx,
		assetId,
		new(big.Int).Abs(liquidityFeeQuoteQuantums),
	)
	if err != nil {
		panic(err)
	}

	// Determine the sender and receiver.
	// Send coins from `subaccounts` to the `insurance_fund` module account by default.
	fromModule, err := k.GetCollateralPoolAddressFromPerpetualId(ctx, perpetualId)
	if err != nil {
		panic(err)
	}

	return k.bankKeeper.SendCoins(
		ctx,
		fromModule,
		authtypes.NewModuleAddress(types.LiquidityFeeModuleAddress),
		[]sdk.Coin{coinToTransfer},
	)
}

func (k Keeper) TransferValidatorFee(
	ctx sdk.Context,
	validatorFeeQuoteQuantums *big.Int,
	perpetualId uint32,
	assetId uint32,
) error {
	if validatorFeeQuoteQuantums.Sign() < 0 {
		return errorsmod.Wrap(types.ErrAssetTransferQuantumsNotPositive, "Validator fee quote quantums cannot be negative")
	}

	if validatorFeeQuoteQuantums.Sign() == 0 {
		return nil
	}

	_, coinToTransfer, err := k.assetsKeeper.ConvertAssetToCoin(
		ctx,
		assetId,
		new(big.Int).Abs(validatorFeeQuoteQuantums),
	)
	if err != nil {
		panic(err)
	}

	// Determine the sender and receiver.
	// Send coins from `subaccounts` to the `insurance_fund` module account by default.
	fromModule, err := k.GetCollateralPoolAddressFromPerpetualId(ctx, perpetualId)
	if err != nil {
		panic(err)
	}
	return k.bankKeeper.SendCoins(ctx, fromModule, sdk.AccAddress(ctx.BlockHeader().ProposerAddress), []sdk.Coin{coinToTransfer})
}

// TransferFundsFromSubaccountToSubaccount returns an error if the call to `k.CanUpdateSubaccounts()`
// fails. Otherwise, updates the asset quantums in the subaccounts, translates the
// `assetId` and `quantums` into a `sdk.Coin`, and call `bankKeeper.SendCoins()` if the collateral
// pools for the two subaccounts are different.
// TODO(CORE-168): Change function interface to accept `denom` and `amount` instead of `assetId` and
// `quantums`.
func (k Keeper) TransferFundsFromSubaccountToSubaccount(
	ctx sdk.Context,
	senderSubaccountId types.SubaccountId,
	recipientSubaccountId types.SubaccountId,
	assetId uint32,
	quantums *big.Int,
) error {
	updates := []types.Update{
		{
			SubaccountId: senderSubaccountId,
			AssetUpdates: []types.AssetUpdate{
				{
					AssetId:          assetId,
					BigQuantumsDelta: new(big.Int).Neg(quantums),
				},
			},
		},
		{
			SubaccountId: recipientSubaccountId,
			AssetUpdates: []types.AssetUpdate{
				{
					AssetId:          assetId,
					BigQuantumsDelta: new(big.Int).Set(quantums),
				},
			},
		},
	}
	success, successPerUpdate, err := k.CanUpdateSubaccounts(ctx, updates, types.Transfer)
	if err != nil {
		return err
	}
	if err := types.GetErrorFromUpdateResults(success, successPerUpdate, updates); err != nil {
		return err
	}

	_, coinToTransfer, err := k.assetsKeeper.ConvertAssetToCoin(
		ctx,
		assetId,
		quantums,
	)
	if err != nil {
		return err
	}

	senderCollateralPoolAddr, err := k.GetCollateralPoolAddressFromSubaccountId(ctx, senderSubaccountId)
	if err != nil {
		return err
	}

	recipientCollateralPoolAddr, err := k.GetCollateralPoolAddressFromSubaccountId(ctx, recipientSubaccountId)
	if err != nil {
		return err
	}

	// Different collateral pool address, need to do a bank send.
	if !senderCollateralPoolAddr.Equals(recipientCollateralPoolAddr) {
		// Use SendCoins API instead of SendCoinsFromModuleToModule since we don't need the
		// module account feature
		if err := k.bankKeeper.SendCoins(
			ctx,
			senderCollateralPoolAddr,
			recipientCollateralPoolAddr,
			[]sdk.Coin{coinToTransfer},
		); err != nil {
			return err
		}
	}

	// Apply subaccount updates.
	return k.applyValidSubaccountUpdateForTransfer(
		ctx,
		updates,
		types.Transfer,
	)
}
