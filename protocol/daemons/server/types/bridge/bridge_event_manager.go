package types

import (
	"fmt"
	"sync"
	"time"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/lib/metrics"
	libtime "github.com/StreamFinance-Protocol/stream-chain/protocol/lib/time"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	"github.com/cosmos/cosmos-sdk/telemetry"
)

type EventId = uint32

// BridgeEventManager maintains a map of "Recognized" Bridge Events.
// That is, events that have been finalized on Ethereum but are
// not yet in consensus on the V4 chain. Methods are goroutine safe.
type BridgeEventManager struct {
	// Exclusive mutex taken when reading or writing
	sync.Mutex

	// Bridge deposit events by ID
	depositEvents map[EventId]BridgeEventWithTime

	// Bridge withdraw events by ID
	withdrawEvents map[EventId]BridgeEventWithTime

	// The last withdraw that was submitted to ethereum
	lastSubmittedWithdrawEventId EventId

	// Stores:
	// - The next unused key in the bridges map (`NextDepositId` and `NextWithdrawId`)
	// - The block height of the last recognized event (`EthBlockHeight` and `KlyraBlockHeight`)
	recognizedEventInfo types.BridgeEventInfo

	// Time provider than can mocked out if necessary
	timeProvider libtime.TimeProvider
}

// BridgeEventWithTime is a type that wraps BridgeEvent but also
// holds an additional timestamp.
type BridgeEventWithTime struct {
	event     types.BridgeEvent
	timestamp time.Time
}

// NewBridgeEventManager creates a new BridgeEventManager.
func NewBridgeEventManager(
	timeProvider libtime.TimeProvider,
) *BridgeEventManager {
	return &BridgeEventManager{
		depositEvents:  make(map[uint32]BridgeEventWithTime),
		withdrawEvents: make(map[uint32]BridgeEventWithTime),
		recognizedEventInfo: types.BridgeEventInfo{
			NextDepositId:    0,
			EthBlockHeight:   0,
			NextWithdrawId:   0,
			KlyraBlockHeight: 0,
		},
		timeProvider: timeProvider,
	}
}

// AddBridgeEvents adds bridge events to the manager (with timestamps).
// Added events must have contiguous and in-order IDs.
// Any events with ID less than the `recognizedEventInfo.NextId` are ignored.
func (b *BridgeEventManager) AddBridgeEvents(
	events []types.BridgeEvent,
) error {
	b.Lock()
	defer b.Unlock()

	// Ignore empty lists.
	if len(events) == 0 {
		return nil
	}

	// Validate events are contiguous and in-order.
	for i, event := range events {
		if event.Id != events[0].Id+uint32(i) {
			telemetry.IncrCounter(1, metrics.BridgeServer, metrics.AddBridgeEvents, metrics.EventIdNotSequential)
			return fmt.Errorf("AddBridgeEvents: Events must be contiguous and in-order")
		}
	}
	now := b.timeProvider.Now()
	for _, event := range events {
		// Ignore stale events which may be the result of a race condition.
		if b.isEventIdStale(event) {
			telemetry.IncrCounter(1, metrics.BridgeServer, metrics.AddBridgeEvents, metrics.EventIdAlreadyRecognized)
			continue
		}

		b.updateBridgeEventState(event, now)
	}

	// Emit metrics on updated recognized event info.
	telemetry.SetGauge(
		float32(b.recognizedEventInfo.NextDepositId),
		metrics.BridgeServer,
		metrics.RecognizedEventInfo,
		metrics.NextId,
	)
	telemetry.SetGauge(
		float32(b.recognizedEventInfo.EthBlockHeight),
		metrics.BridgeServer,
		metrics.RecognizedEventInfo,
		metrics.EthBlockHeight,
	)

	return nil
}

func (b *BridgeEventManager) isEventIdStale(
	event types.BridgeEvent,
) bool {
	if event.IsDeposit {
		return event.Id < b.recognizedEventInfo.NextDepositId
	}
	return event.Id < b.recognizedEventInfo.NextWithdrawId
}

func (b *BridgeEventManager) updateBridgeEventState(
	event types.BridgeEvent,
	currTime time.Time,
) {

	if event.IsDeposit {
		b.depositEvents[event.Id] = BridgeEventWithTime{
			event:     event,
			timestamp: currTime,
		}

		b.recognizedEventInfo = types.BridgeEventInfo{
			NextDepositId:    event.Id + 1,
			NextWithdrawId:   b.recognizedEventInfo.NextWithdrawId,
			EthBlockHeight:   event.BlockHeight,
			KlyraBlockHeight: b.recognizedEventInfo.KlyraBlockHeight,
		}
	} else {
		b.withdrawEvents[event.Id] = BridgeEventWithTime{
			event:     event,
			timestamp: currTime,
		}

		b.recognizedEventInfo = types.BridgeEventInfo{
			NextDepositId:    b.recognizedEventInfo.NextDepositId,
			NextWithdrawId:   event.Id + 1,
			EthBlockHeight:   b.recognizedEventInfo.EthBlockHeight,
			KlyraBlockHeight: event.BlockHeight,
		}
	}
}

// GetBridgeEventById returns a bridge event by ID.
// Found is false if the manager does not have the event.
func (b *BridgeEventManager) GetBridgeEventById(
	id uint32,
	deposits bool,
) (
	event types.BridgeEvent,
	timestamp time.Time,
	found bool,
) {
	b.Lock()
	defer b.Unlock()

	// Find the event.
	var eventWithTime BridgeEventWithTime
	if deposits {
		eventWithTime, found = b.depositEvents[id]
	} else {
		eventWithTime, found = b.withdrawEvents[id]
	}

	if !found {
		return event, timestamp, found // default values
	}

	return eventWithTime.event, eventWithTime.timestamp, true
}

// GetRecognizedEventInfo returns `recognizedEventInfo`.
func (b *BridgeEventManager) GetRecognizedEventInfo() types.BridgeEventInfo {
	b.Lock()
	defer b.Unlock()

	return b.recognizedEventInfo
}

// SetRecognizedEventInfo sets `recognizedEventInfo`. An error is returned
// and no update occurs if `NextId` or `EthBlockHeight` is lesser than its
// existing value.
func (b *BridgeEventManager) SetRecognizedEventInfo(
	eventInfo types.BridgeEventInfo,
) error {
	b.Lock()
	defer b.Unlock()

	if eventInfo.NextDepositId < b.recognizedEventInfo.NextDepositId || eventInfo.NextWithdrawId < b.recognizedEventInfo.NextWithdrawId {
		return fmt.Errorf("NextDepositId or NextWithdrawId cannot be set to a lower value")
	} else if eventInfo.EthBlockHeight < b.recognizedEventInfo.EthBlockHeight || eventInfo.KlyraBlockHeight < b.recognizedEventInfo.KlyraBlockHeight {
		return fmt.Errorf("Eth or Klyra block height cannot be set to a lower value")
	}

	b.recognizedEventInfo = eventInfo
	return nil
}

func (b *BridgeEventManager) GetNow() time.Time {
	return b.timeProvider.Now()
}

func (b *BridgeEventManager) GetLastSubmittedWithdrawEventId() EventId {
	b.Lock()
	defer b.Unlock()

	return b.lastSubmittedWithdrawEventId
}

func (b *BridgeEventManager) SetLastSubmittedWithdrawEventId(id EventId) {
	b.Lock()
	defer b.Unlock()

	b.lastSubmittedWithdrawEventId = id
}
