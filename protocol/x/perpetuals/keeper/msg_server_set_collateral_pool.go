package keeper

import (
	"context"

	errorsmod "cosmossdk.io/errors"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
)

func (k msgServer) SetCollateralPool(
	goCtx context.Context,
	msg *types.MsgSetCollateralPool,
) (*types.MsgSetCollateralPoolResponse, error) {
	if !k.Keeper.HasAuthority(msg.Authority) {
		return nil, errorsmod.Wrapf(
			govtypes.ErrInvalidSigner,
			"invalid authority %s",
			msg.Authority,
		)
	}

	ctx := lib.UnwrapSDKContext(goCtx, types.ModuleName)

	if _, err := k.Keeper.UpsertCollateralPool(
		ctx,
		msg.CollateralPool.CollateralPoolId,
		msg.CollateralPool.MaxCumulativeInsuranceFundDeltaPerBlock,
		msg.CollateralPool.MultiCollateralAssets,
		msg.CollateralPool.QuoteAssetId,
	); err != nil {
		return nil, err
	}

	return &types.MsgSetCollateralPoolResponse{}, nil
}
