package process

import (
	"context"
	"math/big"

	bridgetypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
)

// ProcessClobKeeper defines the expected clob keeper used for `ProcessProposal`.
type ProcessClobKeeper interface {
	RecordMevMetricsIsEnabled() bool
	RecordMevMetrics(
		ctx sdk.Context,
		stakingKeeper ProcessStakingKeeper,
		perpetualKeeper ProcessPerpetualKeeper,
		msgProposedOperations *types.MsgProposedOperations,
	)
}

type ProcessProposalVEApplier interface {
	ApplyVE(ctx sdk.Context, txs [][]byte, writeToCache bool) error
}

// ProcessStakingKeeper defines the expected staking keeper used for `ProcessProposal`.
type ProcessStakingKeeper interface {
	GetValidatorByConsAddr(ctx context.Context, consAddr sdk.ConsAddress) (validator stakingtypes.Validator, err error)
}

// ProcessPerpetualKeeper defines the expected perpetual keeper used for `ProcessProposal`.
type ProcessPerpetualKeeper interface {
	MaybeProcessNewFundingTickEpoch(ctx sdk.Context)
	GetSettlementPpm(
		ctx sdk.Context,
		perpetualId uint32,
		quantums *big.Int,
		index *big.Int,
	) (
		bigNetSettlementPpm *big.Int,
		newFundingIndex *big.Int,
		err error,
	)
	GetPerpetual(ctx sdk.Context, id uint32) (val perptypes.Perpetual, err error)
}

// ProcessBridgeKeeper defines the expected bridge keeper used for `ProcessProposal`.
type ProcessBridgeKeeper interface {
	GetAcknowledgedEventInfo(
		ctx sdk.Context,
	) (acknowledgedEventInfo bridgetypes.BridgeEventInfo)
	GetRecognizedEventInfo(
		ctx sdk.Context,
	) (recognizedEventInfo bridgetypes.BridgeEventInfo)
	GetBridgeEventFromServer(ctx sdk.Context, id uint32) (event bridgetypes.BridgeEvent, found bool)
	GetSafetyParams(ctx sdk.Context) (safetyParams bridgetypes.SafetyParams)
}
