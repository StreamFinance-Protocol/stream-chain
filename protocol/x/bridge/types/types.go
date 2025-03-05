package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type BridgeKeeper interface {
	GetAcknowledgedEventInfo(ctx sdk.Context) BridgeEventInfo

	GetRecognizedEventInfo(ctx sdk.Context) BridgeEventInfo

	AcknowledgeBridges(ctx sdk.Context, bridges []BridgeEvent) error

	CompleteBridge(ctx sdk.Context, bridges BridgeEvent) error

	GetEventParams(ctx sdk.Context) EventParams

	UpdateEventParams(ctx sdk.Context, params EventParams) error

	GetProposeParams(ctx sdk.Context) ProposeParams

	UpdateProposeParams(ctx sdk.Context, params ProposeParams) error

	GetSafetyParams(ctx sdk.Context) SafetyParams

	UpdateSafetyParams(ctx sdk.Context, params SafetyParams) error

	HasAuthority(authority string) bool

	HandleSdaiWithdraw(
		ctx sdk.Context,
		withdraw BridgeWithdraw,
	) (err error)

	SendWithdrawalEventsToEventManager(ctx sdk.Context) error
}
