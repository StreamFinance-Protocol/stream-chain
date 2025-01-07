package msgs

import (
	sdkmath "cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	bridgetypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	clobtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	perptypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
)

var (
	// AppInjectedMsgSamples are msgs that are injected into the block by the proposing validator.
	// These messages are reserved for proposing validator's use only.
	AppInjectedMsgSamples = map[string]sdk.Msg{
		"/klyraprotocol.bridge.MsgAcknowledgeBridges": &bridgetypes.MsgAcknowledgeBridges{
			Events: []bridgetypes.BridgeEvent{
				{
					Id: 0,
					Coin: sdk.NewCoin(
						"bridge-token",
						sdkmath.NewIntFromUint64(1234),
					),
					Address: constants.Alice_Num0.Owner,
				},
			},
		},
		"/klyraprotocol.bridge.MsgAcknowledgeBridgesResponse": nil,
		// clob
		"/klyraprotocol.clob.MsgProposedOperations": &clobtypes.MsgProposedOperations{
			OperationsQueue: make([]clobtypes.OperationRaw, 0),
		},
		"/klyraprotocol.clob.MsgProposedOperationsResponse": nil,

		// perpetuals
		"/klyraprotocol.perpetuals.MsgAddPremiumVotes": &perptypes.MsgAddPremiumVotes{
			Votes: []perptypes.FundingPremium{
				{PerpetualId: 0, PremiumPpm: 1_000},
			},
		},
		"/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse": nil,
	}
)
