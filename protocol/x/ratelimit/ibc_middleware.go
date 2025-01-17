package ratelimit

import (
	"fmt"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/keeper"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/ratelimit/util"

	sdk "github.com/cosmos/cosmos-sdk/types"
	capabilitytypes "github.com/cosmos/ibc-go/modules/capability/types"
	clienttypes "github.com/cosmos/ibc-go/v8/modules/core/02-client/types" //nolint:staticcheck
	channeltypes "github.com/cosmos/ibc-go/v8/modules/core/04-channel/types"
	porttypes "github.com/cosmos/ibc-go/v8/modules/core/05-port/types"

	"github.com/cosmos/ibc-go/v8/modules/core/exported"
)

var _ porttypes.Middleware = &IBCMiddleware{}

type IBCMiddleware struct {
	app    porttypes.IBCModule
	keeper keeper.Keeper
}

// TODO(CORE-855): Add e2e testing for the x/ratelimit IBC Middlware
func NewIBCMiddleware(k keeper.Keeper, app porttypes.IBCModule) IBCMiddleware {
	return IBCMiddleware{
		app:    app,
		keeper: k,
	}
}

// OnChanOpenInit implements the IBCMiddleware interface.
// Use default implementation of the underlying IBC application, since rate-limiting logic
// doesn't require customized logic at channel initialization.
func (im IBCMiddleware) OnChanOpenInit(ctx sdk.Context,
	order channeltypes.Order,
	connectionHops []string,
	portID string,
	channelID string,
	channelCap *capabilitytypes.Capability,
	counterparty channeltypes.Counterparty,
	version string,
) (string, error) {
	return im.app.OnChanOpenInit(
		ctx,
		order,
		connectionHops,
		portID,
		channelID,
		channelCap,
		counterparty,
		version,
	)
}

// OnChanOpenTry implements the IBCMiddleware interface
// Use default implementation of the underlying IBC application, since rate-limiting logic
// doesn't require customized logic at channel opening.
func (im IBCMiddleware) OnChanOpenTry(
	ctx sdk.Context,
	order channeltypes.Order,
	connectionHops []string,
	portID,
	channelID string,
	channelCap *capabilitytypes.Capability,
	counterparty channeltypes.Counterparty,
	counterpartyVersion string,
) (string, error) {
	return im.app.OnChanOpenTry(
		ctx, order,
		connectionHops,
		portID,
		channelID,
		channelCap,
		counterparty,
		counterpartyVersion,
	)
}

// OnChanOpenAck implements the IBCMiddleware interface
func (im IBCMiddleware) OnChanOpenAck(
	ctx sdk.Context,
	portID,
	channelID string,
	counterpartyChannelID string,
	counterpartyVersion string,
) error {
	return im.app.OnChanOpenAck(ctx, portID, channelID, counterpartyChannelID, counterpartyVersion)
}

// OnChanOpenConfirm implements the IBCMiddleware interface
func (im IBCMiddleware) OnChanOpenConfirm(
	ctx sdk.Context,
	portID,
	channelID string,
) error {
	return im.app.OnChanOpenConfirm(ctx, portID, channelID)
}

// OnChanCloseInit implements the IBCMiddleware interface
func (im IBCMiddleware) OnChanCloseInit(
	ctx sdk.Context,
	portID,
	channelID string,
) error {
	return im.app.OnChanCloseInit(ctx, portID, channelID)
}

// OnChanCloseConfirm implements the IBCMiddleware interface
func (im IBCMiddleware) OnChanCloseConfirm(
	ctx sdk.Context,
	portID,
	channelID string,
) error {
	return im.app.OnChanCloseConfirm(ctx, portID, channelID)
}

// OnRecvPacket implements the IBCMiddleware interface
// Called on the receiver chain when a relayer pick up the `SendPacket` event from sender chain and relayer
// to the receiver chain. On klyra chain, this signals an inbound IBC transfer.
// Does the following:
// - Call `IncrementCapacitiesForDenom` to update `capacity` for the token received.
// - Invoke `OnRecvPacket` callback on IBC transfer module.
func (im IBCMiddleware) OnRecvPacket(
	ctx sdk.Context,
	packet channeltypes.Packet,
	relayer sdk.AccAddress,
) exported.Acknowledgement {
	ibcTransferPacketInfo, err := util.ParsePacketInfo(packet, types.PACKET_RECV)
	if err != nil {
		im.keeper.Logger(ctx).Error(fmt.Sprintf("ICS20 receive packet could not be parsed: %s", err.Error()))
		return channeltypes.NewErrorAcknowledgement(err)
	}

	// Process deposit of incoming asset.
	// If the `Recv` fails on the underlying transfer stack (e.g. Reciver is invalid), the state
	// change is not committed.
	// TODO(CORE-855): Add an E2E test for this.
	im.keeper.IncrementCapacitiesForDenom(ctx, ibcTransferPacketInfo.Denom, ibcTransferPacketInfo.Amount)

	ack := im.app.OnRecvPacket(ctx, packet, relayer)

	if !ack.Success() {
		return ack
	}

	// We use hashed SDaiDenom, since Denom trace should be hashed after ParsePacketInfo.
	if ibcTransferPacketInfo.Denom == types.SDaiDenom {
		err := im.keeper.MintTradingDAIToUserAccount(ctx, ibcTransferPacketInfo.Receiver, ibcTransferPacketInfo.Amount)
		if err != nil {
			return channeltypes.NewErrorAcknowledgement(err)
		}
	}

	return ack
}

// OnAcknowledgementPacket implements the IBCMiddleware interface
func (im IBCMiddleware) OnAcknowledgementPacket(
	ctx sdk.Context,
	packet channeltypes.Packet,
	acknowledgement []byte,
	relayer sdk.AccAddress,
) error {
	if err := im.keeper.AcknowledgeIBCTransferPacket(ctx, packet, acknowledgement); err != nil {
		im.keeper.Logger(ctx).Error(fmt.Sprintf("ICS20 OnAckPacket failed: %s", err.Error()))
		return err
	}
	err := im.app.OnAcknowledgementPacket(ctx, packet, acknowledgement, relayer)
	if err != nil {
		return err
	}

	return im.keeper.RedoMintTradingDAIIfAcknowledgeIBCTransferPacketFails(ctx, packet, acknowledgement)
}

// OnTimeoutPacket implements the IBCMiddleware interface
func (im IBCMiddleware) OnTimeoutPacket(
	ctx sdk.Context,
	packet channeltypes.Packet,
	relayer sdk.AccAddress,
) error {
	if err := im.keeper.TimeoutIBCTransferPacket(ctx, packet); err != nil {
		im.keeper.Logger(ctx).Error(fmt.Sprintf("ICS20 OnTimeoutPacket failed: %s", err.Error()))
		return err
	}
	err := im.app.OnTimeoutPacket(ctx, packet, relayer)
	if err != nil {
		return err
	}

	return im.keeper.UndoMintTradingDAIIfAfterTimeoutIBCTransferPacket(ctx, packet)
}

// SendPacket implements the ICS4 Wrapper interface
// Rate-limited SendPacket found in RateLimit Keeper
func (im IBCMiddleware) SendPacket(
	ctx sdk.Context,
	chanCap *capabilitytypes.Capability,
	sourcePort string,
	sourceChannel string,
	timeoutHeight clienttypes.Height,
	timeoutTimestamp uint64,
	data []byte,
) (sequence uint64, err error) {
	return im.keeper.SendPacket(
		ctx,
		chanCap,
		sourcePort,
		sourceChannel,
		timeoutHeight,
		timeoutTimestamp,
		data,
	)
}

// WriteAcknowledgement implements the ICS4 Wrapper interface
func (im IBCMiddleware) WriteAcknowledgement(
	ctx sdk.Context,
	chanCap *capabilitytypes.Capability,
	packet exported.PacketI,
	ack exported.Acknowledgement,
) error {
	return im.keeper.WriteAcknowledgement(ctx, chanCap, packet, ack)
}

// PreprocessSendPacket implements the ICS4WrapperWithPreprocess interface
func (im IBCMiddleware) PreprocessSendPacket(ctx sdk.Context, packet []byte) error {
	return im.keeper.PreprocessSendPacket(ctx, packet)
}

// GetAppVersion returns the application version of the underlying application
func (i IBCMiddleware) GetAppVersion(ctx sdk.Context, portID, channelID string) (string, bool) {
	return i.keeper.GetAppVersion(ctx, portID, channelID)
}
