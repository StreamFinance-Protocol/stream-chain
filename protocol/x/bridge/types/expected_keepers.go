package types

import (
	"context"
	"math/big"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// BankKeeper defines the expected bank keeper.
type BankKeeper interface {
	SendCoinsFromModuleToAccount(
		context context.Context,
		senderModule string,
		recipientAddr sdk.AccAddress,
		amt sdk.Coins,
	) error

	BurnCoins(ctx context.Context, moduleName string, amt sdk.Coins) error
}

type RateLimitKeeper interface {
	WithdrawSDaiFromTDai(
		ctx sdk.Context,
		userAddr sdk.AccAddress,
		sDaiAmount *big.Int,
		shouldSendToUser bool,
	) error
}
