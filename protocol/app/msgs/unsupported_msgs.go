package msgs

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	gov "github.com/cosmos/cosmos-sdk/x/gov/types/v1"
	govbeta "github.com/cosmos/cosmos-sdk/x/gov/types/v1beta1"
)

var (
	// UnsupportedMsgSamples are msgs that are registered with the app, but are not supported.
	UnsupportedMsgSamples = map[string]sdk.Msg{
		// gov
		// MsgCancelProposal is not allowed by protocol, due to it's potential for abuse.
		"/cosmos.gov.v1.MsgCancelProposal":         &gov.MsgCancelProposal{},
		"/cosmos.gov.v1.MsgCancelProposalResponse": nil,
		// These are deprecated/legacy msgs that we should not support.
		"/cosmos.gov.v1beta1.MsgSubmitProposal":         &govbeta.MsgSubmitProposal{},
		"/cosmos.gov.v1beta1.MsgSubmitProposalResponse": nil,
	}
)
