package keeper

import (
	"time"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/metrics"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	yieldtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/yield/types"
	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// `CompleteBridge` processes a bridge event by transferring the specified coin
// from bridge module account to the given address. The id of the bridge is not
// validated as it should have already been validated by AcknowledgeBridges.
func (k Keeper) CompleteBridge(
	ctx sdk.Context,
	bridge types.BridgeEvent,
) (err error) {
	defer telemetry.ModuleMeasureSince(
		types.ModuleName,
		time.Now(),
		metrics.CompleteBridge,
		metrics.Latency,
	)

	// Emit metric on last completed bridge id if no error.
	defer func() {
		if err == nil {
			telemetry.SetGauge(
				float32(bridge.Id),
				types.ModuleName,
				metrics.LastCompletedBridgeId,
			)
		}
	}()

	// Return early if coin amount is not positive since no action is needed
	if !bridge.Coin.Amount.IsPositive() {
		return nil
	}

	// Complete bridge if bridging is disabled.
	safetyParams := k.GetSafetyParams(ctx)
	if safetyParams.IsDisabled {
		k.Logger(ctx).Warn("Bridge is disabled, but complete bridge was called. Completing bridge now.")
	}

	// Convert bridge address string to sdk.AccAddress.
	bridgeAccAddress, err := sdk.AccAddressFromBech32(bridge.Address)
	if err != nil {
		return err
	}

	bridgedCoins := sdk.Coins{bridge.Coin}
	if err = k.bankKeeper.MintCoins(ctx, types.ModuleName, bridgedCoins); err != nil {
		return err
	}

	// Send coins to user account. The coins are sent to sdai pool account
	// when the corresponding tdai is minted.
	if err = k.bankKeeper.SendCoinsFromModuleToAccount(
		ctx,
		types.ModuleName,
		bridgeAccAddress,
		bridgedCoins,
	); err != nil {
		return err
	}

	if bridge.Coin.Denom == yieldtypes.SDaiDenom {
		err = k.yieldKeeper.MintTradingDAIToUserAccount(
			ctx,
			bridgeAccAddress,
			bridgedCoins[0].Amount.BigInt(),
		)
	}

	return err
}

// `GetDelayedCompleteBridgeMessages` returns all delayed complete bridge
// messages and corresponding block heights at which they'll execute.
// If `address` is given, only returns messages for that address.
func (k Keeper) GetDelayedCompleteBridgeMessages(
	ctx sdk.Context,
	address string,
) (
	messages []types.DelayedCompleteBridgeMessage,
) {
	// Get all delayed messages from `x/delaymsg`.
	allDelayedMessages := k.delayMsgKeeper.GetAllDelayedMessages(ctx)
	// Iterate through all delayed messages and find `MsgCompleteBridge`s.
	messages = make([]types.DelayedCompleteBridgeMessage, 0)
	for _, delayedMsg := range allDelayedMessages {
		sdkMsg, err := delayedMsg.GetMessage()
		if err != nil {
			continue
		}

		// If the message is a complete bridge message and its address matches `address` (if given),
		// add to the list of messages to return the message itself and the block height at which
		// it will execute.
		if completeBridgeMsg, ok := sdkMsg.(*types.MsgCompleteBridge); ok {
			if address == "" || completeBridgeMsg.Event.Address == address {
				messages = append(messages, types.DelayedCompleteBridgeMessage{
					Message:     *completeBridgeMsg,
					BlockHeight: delayedMsg.GetBlockHeight(),
				})
			}
		}
	}

	return messages
}
