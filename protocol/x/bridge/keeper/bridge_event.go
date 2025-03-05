package keeper

import (
	"errors"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) SendWithdrawalEventsToEventManager(ctx sdk.Context) error {
	withdrawalEvents := k.GetBridgeWithdrawalEvents(ctx)
	return k.bridgeEventManager.AddBridgeEvents(withdrawalEvents)
}

func (k Keeper) AddBridgeWithdrawalEvent(
	ctx sdk.Context,
	withdrawalEvent types.BridgeEvent,
) error {
	if withdrawalEvent.IsDeposit {
		return errors.New("attempting to add deposit event to withdrawal event store")
	}
	withdrawalEvents := k.GetBridgeWithdrawalEvents(ctx)
	withdrawalEvents = append(withdrawalEvents, withdrawalEvent)
	k.SetBridgeWithdrawalEvents(ctx, withdrawalEvents)
	return nil
}

func (k Keeper) SetBridgeWithdrawalEvents(ctx sdk.Context, withdrawalEvents []types.BridgeEvent) error {
	store := ctx.TransientStore(k.transientStoreKey)
	eventList := &types.BridgeEventList{Events: withdrawalEvents}
	b := k.cdc.MustMarshal(eventList)
	store.Set([]byte(types.WithdrawalEventsKey), b)
	return nil
}

func (k Keeper) GetBridgeWithdrawalEvents(ctx sdk.Context) []types.BridgeEvent {
	store := ctx.TransientStore(k.transientStoreKey)
	rawBytes := store.Get([]byte(types.WithdrawalEventsKey))

	if rawBytes == nil {
		return []types.BridgeEvent{}
	}

	eventList := &types.BridgeEventList{}
	k.cdc.MustUnmarshal(rawBytes, eventList)
	return eventList.Events
}

// `GetBridgeEventFromServer` returns the bridge event with the given id from the server. `found` is false
// if the event is not found.
func (k Keeper) GetBridgeEventFromServer(ctx sdk.Context, id uint32) (event types.BridgeEvent, found bool) {
	event, _, found = k.bridgeEventManager.GetBridgeEventById(id, true)
	return event, found
}
