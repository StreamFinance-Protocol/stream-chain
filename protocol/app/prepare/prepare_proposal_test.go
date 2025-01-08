package prepare_test

import (
	"bytes"
	"errors"
	"fmt"
	"math/big"
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/prepare"
	vecodec "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/codec"
	vetypes "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/types"
	vecache "github.com/StreamFinance-Protocol/stream-chain/protocol/caches/vecache"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	sdktest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/sdk"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/encoding"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	vetesting "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/ve"
	bridgetypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/bridge/types"
	clobtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	perpetualtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	cometabci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdktypes "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

var (
	ctx = sdktypes.Context{}

	failingTxEncoder = func(tx sdktypes.Tx) ([]byte, error) {
		return nil, errors.New("encoder failed")
	}
	emptyTxEncoder = func(tx sdktypes.Tx) ([]byte, error) {
		return []byte{}, nil
	}
	passingTxEncoderOne = func(tx sdktypes.Tx) ([]byte, error) {
		return []byte{1}, nil
	}
	passingTxEncoderTwo = func(tx sdk.Tx) ([]byte, error) {
		return []byte{1, 2}, nil
	}
	passingTxEncoderFour = func(tx sdktypes.Tx) ([]byte, error) {
		return []byte{1, 2, 3, 4}, nil
	}
)

type PerpareProposalHandlerTC struct {
	request   func() *cometabci.RequestPrepareProposal
	veEnabled bool

	fundingResp    *perpetualtypes.MsgAddPremiumVotes
	fundingEncoder sdktypes.TxEncoder

	clobResp    *clobtypes.MsgProposedOperations
	clobEncoder sdktypes.TxEncoder

	pricesParamsResp              []pricestypes.MarketParam
	pricesMarketPriceFromByesResp *pricestypes.MarketPriceUpdate

	bridgeResp    *bridgetypes.MsgAcknowledgeBridges
	bridgeEncoder sdk.TxEncoder

	seenConsAddresses map[string]struct{}
	veCacheHeight     int64

	expectedPrices []vetypes.PricePair
	expectedVotes  []cometabci.ExtendedVoteInfo
	expectedTxs    [][]byte

	height int64
}

func TestPrepareProposalHandler(t *testing.T) {
	msgSendTxBytesLen := int64(len(constants.Msg_Send_TxBytes))
	msgSendAndTransferTxBytesLen := int64(len(constants.Msg_SendAndTransfer_TxBytes))
	votecodec, extcodec := vecodec.NewDefaultVoteExtensionCodec(), vecodec.NewDefaultExtendedCommitCodec()

	valVoteInfoAlice, _ := vetesting.CreateSignedExtendedVoteInfo(
		vetesting.NewDefaultSignedVeInfo(
			constants.AliceConsAddress,
			constants.ValidVEPrices,
			"",
		),
	)
	valVoteInfoBob, _ := vetesting.CreateSignedExtendedVoteInfo(
		vetesting.NewDefaultSignedVeInfo(
			constants.BobConsAddress,
			constants.ValidVEPrices,
			"",
		),
	)

	nilVoteInfoBob, _ := vetesting.CreateNilVoteExtensionInfo(
		constants.BobConsAddress,
		500,
	)

	tests := map[string]PerpareProposalHandlerTC{
		"Error: Empty proposal request returns error": {

			expectedTxs: [][]byte{},
			veEnabled:   false,
			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{},
					1,
					0,
				)
			},
		},
		"Error: Nil request returns error": {
			expectedTxs: [][]byte{},
			veEnabled:   false,
			request: func() *cometabci.RequestPrepareProposal {
				return nil
			},
		},

		// Funding related.
		"Error: GetFundingTx returns err": {

			veEnabled:      false,
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: failingTxEncoder, // encoder fails and returns err.

			expectedTxs: [][]byte{}, // error returns empty result.

			height: 1,

			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{},
					1,
					2,
				)
			},
		},
		"Error: GetFundingTx returns empty": {

			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: emptyTxEncoder, // encoder returns empty.
			veEnabled:      false,
			expectedTxs:    [][]byte{}, // error returns empty result.
			height:         1,

			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{},
					1,
					2,
				)
			},
		},
		"Error: SetFundingTx returns err": {

			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderOne, // takes up another 1 byte, so exceeds max.
			veEnabled:      false,
			expectedTxs:    [][]byte{}, // error returns empty result.
			height:         1,

			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{},
					1, // only upto 1 byte, not enough space for funding tx bytes.
					0,
				)
			},
		},

		// // "bridge" related.
		"Error: GetAcknowledgeBridgesTx returns err": {
			veEnabled:      false,
			height:         1,
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderOne,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: failingTxEncoder, // encoder fails and returns err.

			expectedTxs: [][]byte{}, // error returns empty result.
			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{},
					1,
					2,
				)
			},
		},

		"Error: GetAcknowledgeBridgesTx returns empty": {
			veEnabled:      false,
			height:         1,
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderOne,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: emptyTxEncoder, // encoder returns empty.

			expectedTxs: [][]byte{}, // error returns empty result.
			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{},
					1,
					2,
				)
			},
		},
		"Error: SetAcknowledgeBridgesTx returns err": {
			veEnabled:      false,
			height:         1,
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderOne, // takes up 1 byte

			bridgeResp:    constants.MsgAcknowledgeBridges_Id0_Height0,
			bridgeEncoder: passingTxEncoderOne, // takes up another 1 byte, so exceeds max.

			expectedTxs: [][]byte{}, // error returns empty result.
			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{},
					1,
					2,
				)
			},
		},
		// "Others" related.
		"Error: AddOtherTxs return error": {

			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			veEnabled: false,

			height: 1,

			expectedTxs: [][]byte{}, // error returns empty result.
			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{{}},
					3,
					17,
				)
			},
		},
		"Error: AddOtherTxs (additional) return error": {

			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			veEnabled: false,

			height: 1,

			expectedTxs: [][]byte{}, // error returns empty result.
			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{{9, 8}, {9}, {}, {}},
					1,
					15,
				)
			},
		},
		"Valid: Not all Others than can fit": {

			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			veEnabled: true,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			expectedPrices: constants.ValidVEPrices,

			expectedTxs: [][]byte{
				{1, 2, 3, 4},               // order.
				constants.Msg_Send_TxBytes, // others.
				{1, 2, 3, 4},               // bridges.
				{1, 2, 3, 4},               // funding.
			},

			height:        3,
			veCacheHeight: 2,
			seenConsAddresses: map[string]struct{}{
				constants.AliceConsAddress.String(): {},
			},
			expectedVotes: []cometabci.ExtendedVoteInfo{
				valVoteInfoAlice,
			},

			request: func() *cometabci.RequestPrepareProposal {
				commitInfo, bz, err := vetesting.CreateExtendedCommitInfo(
					[]cometabci.ExtendedVoteInfo{valVoteInfoAlice},
				)

				require.NoError(t, err)

				return createRequestPrepareProposal(
					commitInfo,
					[][]byte{
						constants.Msg_Send_TxBytes,
						constants.Msg_Send_TxBytes, // not included due to maxBytes.
						constants.Msg_Send_TxBytes, // not included due to maxBytes.
					},
					3,
					int64(12)+msgSendTxBytesLen+1+int64(len(bz)),
				)
			},
		},
		"Valid: Additional Others fit": {
			veEnabled: true,

			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			expectedPrices: constants.ValidVEPrices,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,
			expectedTxs: [][]byte{
				{1, 2, 3, 4},                          // order.
				constants.Msg_Send_TxBytes,            // others.
				constants.Msg_SendAndTransfer_TxBytes, // additional others.
				{1, 2, 3, 4},                          // bridges.
				{1, 2, 3, 4},                          // funding.
			},
			height:        3,
			veCacheHeight: 2,
			seenConsAddresses: map[string]struct{}{
				constants.AliceConsAddress.String(): {},
			},
			expectedVotes: []cometabci.ExtendedVoteInfo{
				valVoteInfoAlice,
			},

			request: func() *cometabci.RequestPrepareProposal {
				commitInfo, bz, err := vetesting.CreateExtendedCommitInfo(
					[]cometabci.ExtendedVoteInfo{valVoteInfoAlice},
				)
				require.NoError(t, err)

				return createRequestPrepareProposal(
					commitInfo,
					[][]byte{
						constants.Msg_Send_TxBytes,
						constants.Msg_SendAndTransfer_TxBytes,
						constants.Msg_Send_TxBytes, // not included due t.
					},
					3,
					int64(12)+msgSendTxBytesLen+msgSendAndTransferTxBytesLen+int64(len(bz)),
				)
			},
		},
		"Valid: empty VE's returns no error with no other tx": {

			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			veEnabled: true,
			height:    3,

			expectedTxs: [][]byte{
				{1, 2, 3, 4}, // order.
				{1, 2, 3, 4}, // bridges.
				{1, 2, 3, 4}, // funding.
			},

			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{},
					3,
					int64(12),
				)
			},
		},
		"Valid: single VE with no other txs": {
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			veEnabled: true,
			height:    3,

			expectedPrices: constants.ValidVEPrices,
			veCacheHeight:  2,
			seenConsAddresses: map[string]struct{}{
				constants.AliceConsAddress.String(): {},
			},
			expectedVotes: []cometabci.ExtendedVoteInfo{
				valVoteInfoAlice,
			},
			request: func() *cometabci.RequestPrepareProposal {
				commitInfo, bz, err := vetesting.CreateExtendedCommitInfo(
					[]cometabci.ExtendedVoteInfo{valVoteInfoAlice},
				)

				require.NoError(t, err)

				prop := createRequestPrepareProposal(
					commitInfo,
					[][]byte{},
					3,
					int64(12)+int64(len(bz)),
				)

				return prop
			},

			expectedTxs: [][]byte{
				{1, 2, 3, 4}, // order.
				{1, 2, 3, 4}, // bridges.
				{1, 2, 3, 4}, // funding.
			},
		},
		"Valid: single VE with other txs": {
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			veEnabled: true,
			height:    3,

			expectedPrices: constants.ValidVEPrices,
			veCacheHeight:  2,
			seenConsAddresses: map[string]struct{}{
				constants.AliceConsAddress.String(): {},
			},
			expectedVotes: []cometabci.ExtendedVoteInfo{
				valVoteInfoAlice,
			},
			request: func() *cometabci.RequestPrepareProposal {
				proposal := [][]byte{
					constants.Msg_SendAndTransfer_TxBytes, // others.
					constants.Msg_Send_TxBytes,            // others.
				}

				commitInfo, bz, err := vetesting.CreateExtendedCommitInfo(
					[]cometabci.ExtendedVoteInfo{valVoteInfoAlice},
				)

				require.NoError(t, err)

				prop := createRequestPrepareProposal(
					commitInfo,
					proposal,
					3,
					int64(12)+msgSendTxBytesLen+msgSendAndTransferTxBytesLen+int64(len(bz)),
				)

				return prop
			},

			expectedTxs: [][]byte{
				{1, 2, 3, 4},                          // order.
				constants.Msg_SendAndTransfer_TxBytes, // others.
				constants.Msg_Send_TxBytes,            // others.
				{1, 2, 3, 4},                          // bridges.
				{1, 2, 3, 4},                          // funding.
			},
		},
		"Valid: Multiple VE's with other tx, both seen": {
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			veEnabled: true,
			height:    3,

			expectedPrices: constants.ValidVEPrices,
			veCacheHeight:  2,
			seenConsAddresses: map[string]struct{}{
				constants.AliceConsAddress.String(): {},
				constants.BobConsAddress.String():   {},
			},

			expectedVotes: []cometabci.ExtendedVoteInfo{
				valVoteInfoAlice,
				valVoteInfoBob,
			},
			request: func() *cometabci.RequestPrepareProposal {
				proposal := [][]byte{
					constants.Msg_SendAndTransfer_TxBytes, // others.
					constants.Msg_Send_TxBytes,            // others.
				}

				commitInfo, bz, err := vetesting.CreateExtendedCommitInfo(
					[]cometabci.ExtendedVoteInfo{valVoteInfoAlice, valVoteInfoBob},
				)

				require.NoError(t, err)

				prop := createRequestPrepareProposal(
					commitInfo,
					proposal,
					3,
					int64(12)+msgSendTxBytesLen+msgSendAndTransferTxBytesLen+int64(len(bz)),
				)

				return prop
			},

			expectedTxs: [][]byte{
				{1, 2, 3, 4},                          // order.
				constants.Msg_SendAndTransfer_TxBytes, // others.
				constants.Msg_Send_TxBytes,            // others.
				{1, 2, 3, 4},                          // bridges.
				{1, 2, 3, 4},                          // funding.
			},
		},
		"Valid: Multiple VE's with other tx, only one seen": {
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			veEnabled: true,
			height:    3,

			expectedPrices: constants.ValidVEPrices,
			veCacheHeight:  2,
			seenConsAddresses: map[string]struct{}{
				constants.AliceConsAddress.String(): {},
			},

			expectedVotes: []cometabci.ExtendedVoteInfo{
				valVoteInfoAlice,
				nilVoteInfoBob,
			},
			request: func() *cometabci.RequestPrepareProposal {
				proposal := [][]byte{
					constants.Msg_SendAndTransfer_TxBytes, // others.
					constants.Msg_Send_TxBytes,            // others.
				}

				commitInfo, bz, err := vetesting.CreateExtendedCommitInfo(
					[]cometabci.ExtendedVoteInfo{valVoteInfoAlice, valVoteInfoBob},
				)

				require.NoError(t, err)

				prop := createRequestPrepareProposal(
					commitInfo,
					proposal,
					3,
					int64(12)+msgSendTxBytesLen+msgSendAndTransferTxBytesLen+int64(len(bz)),
				)

				return prop
			},

			expectedTxs: [][]byte{
				{1, 2, 3, 4},                          // order.
				constants.Msg_SendAndTransfer_TxBytes, // others.
				constants.Msg_Send_TxBytes,            // others.
				{1, 2, 3, 4},                          // bridges.
				{1, 2, 3, 4},                          // funding.
			},
		},
		"Valid: Multiple VE's with other tx, but not all fit": {
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			veEnabled: true,
			height:    3,

			expectedPrices: constants.ValidVEPrices,
			veCacheHeight:  2,
			seenConsAddresses: map[string]struct{}{
				constants.AliceConsAddress.String(): {},
				constants.BobConsAddress.String():   {},
			},

			expectedVotes: []cometabci.ExtendedVoteInfo{
				valVoteInfoAlice,
				valVoteInfoBob,
			},
			request: func() *cometabci.RequestPrepareProposal {
				proposal := [][]byte{
					constants.Msg_SendAndTransfer_TxBytes, // others.
					constants.Msg_Send_TxBytes,            // others.
				}

				commitInfo, bz, err := vetesting.CreateExtendedCommitInfo(
					[]cometabci.ExtendedVoteInfo{valVoteInfoAlice, valVoteInfoBob},
				)

				require.NoError(t, err)

				prop := createRequestPrepareProposal(
					commitInfo,
					proposal,
					3,
					int64(12)+int64(len(bz)),
				)

				return prop
			},

			expectedTxs: [][]byte{
				{1, 2, 3, 4}, // order.
				{1, 2, 3, 4}, // bridges.
				{1, 2, 3, 4}, // funding.
			},
		},
		"Valid: Multiple VE's with other tx, but seen cache has wrong height (-1) - accepts all": {
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			veEnabled: true,
			height:    3,

			expectedPrices: constants.ValidVEPrices,
			veCacheHeight:  1,
			seenConsAddresses: map[string]struct{}{
				constants.AliceConsAddress.String(): {},
			},

			expectedVotes: []cometabci.ExtendedVoteInfo{
				valVoteInfoAlice,
				valVoteInfoBob,
			},
			request: func() *cometabci.RequestPrepareProposal {
				proposal := [][]byte{
					constants.Msg_SendAndTransfer_TxBytes, // others.
					constants.Msg_Send_TxBytes,            // others.
				}

				commitInfo, bz, err := vetesting.CreateExtendedCommitInfo(
					[]cometabci.ExtendedVoteInfo{valVoteInfoAlice, valVoteInfoBob},
				)

				require.NoError(t, err)

				prop := createRequestPrepareProposal(
					commitInfo,
					proposal,
					3,
					int64(12)+msgSendTxBytesLen+msgSendAndTransferTxBytesLen+int64(len(bz)),
				)

				return prop
			},

			expectedTxs: [][]byte{
				{1, 2, 3, 4},                          // order.
				constants.Msg_SendAndTransfer_TxBytes, // others.
				constants.Msg_Send_TxBytes,            // others.
				{1, 2, 3, 4},                          // bridges.
				{1, 2, 3, 4},                          // funding.
			},
		},
		"Valid: Multiple VE's with other tx, but seen cache has wrong height (+1) - accepts all": {
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			veEnabled: true,
			height:    3,

			expectedPrices: constants.ValidVEPrices,
			veCacheHeight:  4,
			seenConsAddresses: map[string]struct{}{
				constants.AliceConsAddress.String(): {},
			},

			expectedVotes: []cometabci.ExtendedVoteInfo{
				valVoteInfoAlice,
				valVoteInfoBob,
			},
			request: func() *cometabci.RequestPrepareProposal {
				proposal := [][]byte{
					constants.Msg_SendAndTransfer_TxBytes, // others.
					constants.Msg_Send_TxBytes,            // others.
				}

				commitInfo, bz, err := vetesting.CreateExtendedCommitInfo(
					[]cometabci.ExtendedVoteInfo{valVoteInfoAlice, valVoteInfoBob},
				)

				require.NoError(t, err)

				prop := createRequestPrepareProposal(
					commitInfo,
					proposal,
					3,
					int64(12)+msgSendTxBytesLen+msgSendAndTransferTxBytesLen+int64(len(bz)),
				)

				return prop
			},

			expectedTxs: [][]byte{
				{1, 2, 3, 4},                          // order.
				constants.Msg_SendAndTransfer_TxBytes, // others.
				constants.Msg_Send_TxBytes,            // others.
				{1, 2, 3, 4},                          // bridges.

				{1, 2, 3, 4}, // funding.
			},
		},
		"Valid: Multiple VE's with other tx, cache is empty - accepts all": {
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			bridgeResp:    &bridgetypes.MsgAcknowledgeBridges{},
			bridgeEncoder: passingTxEncoderFour,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			veEnabled: true,
			height:    3,

			expectedPrices:    constants.ValidVEPrices,
			veCacheHeight:     4,
			seenConsAddresses: map[string]struct{}{},

			expectedVotes: []cometabci.ExtendedVoteInfo{
				valVoteInfoAlice,
				valVoteInfoBob,
			},
			request: func() *cometabci.RequestPrepareProposal {
				proposal := [][]byte{
					constants.Msg_SendAndTransfer_TxBytes, // others.
					constants.Msg_Send_TxBytes,            // others.
				}

				commitInfo, bz, err := vetesting.CreateExtendedCommitInfo(
					[]cometabci.ExtendedVoteInfo{valVoteInfoAlice, valVoteInfoBob},
				)

				require.NoError(t, err)

				prop := createRequestPrepareProposal(
					commitInfo,
					proposal,
					3,
					int64(12)+msgSendTxBytesLen+msgSendAndTransferTxBytesLen+int64(len(bz)),
				)

				return prop
			},

			expectedTxs: [][]byte{
				{1, 2, 3, 4},                          // order.
				constants.Msg_SendAndTransfer_TxBytes, // others.
				constants.Msg_Send_TxBytes,            // others.
				{1, 2, 3, 4},                          // bridges.
				{1, 2, 3, 4},                          // funding.
			},
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			mockTxConfig := createMockTxConfig(
				nil,
				[]sdktypes.TxEncoder{
					tc.fundingEncoder,
					tc.bridgeEncoder,
					tc.clobEncoder,
				},
			)

			// necessary mock keepers
			mPricesKeeper, mClobKeeper, mPerpKeeper, mRatelimitKeeper, mBridgeKeeper := buildMockKeepers()

			setMockResponses(mBridgeKeeper, mPricesKeeper, mRatelimitKeeper, mClobKeeper, mPerpKeeper, tc)

			ctx, _, _, _, _, _ := keepertest.PricesKeepers(t)

			if tc.veEnabled {
				ctx = vetesting.GetVeEnabledCtx(ctx, tc.height)
			}

			veCache := vecache.NewVECache()
			veCtx := sdktest.NewContextWithBlockHeightAndTime(
				tc.veCacheHeight,
				ctx.BlockTime(),
			)

			handler := prepare.PrepareProposalHandler(
				mockTxConfig,
				mBridgeKeeper,
				mClobKeeper,
				mPerpKeeper,
				mPricesKeeper,
				mRatelimitKeeper,
				veCache,
				votecodec,
				extcodec,
			)

			veCache.SetSeenVotesInCache(
				veCtx,
				tc.seenConsAddresses,
			)

			req := tc.request()
			response, err := handler(ctx, req)
			require.NoError(t, err)
			require.Equal(t, tc.expectedTxs, getResponseTransactionsWithoutExtInfo(response.Txs))
			if tc.veEnabled {
				bz, err := extcodec.Encode(req.LocalLastCommit)
				require.NoError(t, err)
				if len(response.Txs) > 0 {
					if int64(len(bz)) <= req.MaxTxBytes {
						require.Equal(t, bz, response.Txs[0])
					}

					validateVotes(t, tc.expectedVotes, tc.expectedPrices, response.Txs[0], extcodec, votecodec)
				}
			}
		})
	}
}

func TestPrepareProposalHandler_OtherTxs(t *testing.T) {
	encodingCfg := encoding.GetTestEncodingCfg()

	tests := map[string]struct {
		txs [][]byte

		expectedTxs [][]byte

		veEnabled bool
	}{
		"Valid: all others txs contain disallow msgs": {
			txs: [][]byte{
				multiMsgsTxHasDisallowOnlyTxBytes,  // filtered out.
				multiMsgsTxHasDisallowMixedTxBytes, // filtered out.
			},
			expectedTxs: [][]byte{

				constants.ValidEmptyMsgProposedOperationsTxBytes,       // order.
				constants.MsgAcknowledgeBridges_Ids0_1_Height0_TxBytes, // bridge.

				// no other txs.
				constants.ValidMsgAddPremiumVotesTxBytes, // funding.

			},

			veEnabled: false,
		},
		"Valid: some others txs contain disallow msgs": {
			txs: [][]byte{
				multiMsgsTxHasDisallowMixedTxBytes, // filtered out.
				constants.Msg_SendAndTransfer_TxBytes,
				multiMsgsTxHasDisallowOnlyTxBytes, // filtered out.
				constants.Msg_Send_TxBytes,
				constants.ValidMsgAddPremiumVotesTxBytes, // filtered out.
			},
			expectedTxs: [][]byte{
				constants.ValidEmptyMsgProposedOperationsTxBytes,       // order.
				constants.Msg_SendAndTransfer_TxBytes,                  // others.
				constants.Msg_Send_TxBytes,                             // others.
				constants.MsgAcknowledgeBridges_Ids0_1_Height0_TxBytes, // bridge.

				constants.ValidMsgAddPremiumVotesTxBytes, // funding.

			},
			veEnabled: false,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			mockPricesKeeper := mocks.PreBlockExecPricesKeeper{}
			mockPricesKeeper.On("GetAllMarketParams", mock.Anything).
				Return(constants.ValidEmptyMarketParams)

			mockBridgeKeeper := mocks.PrepareBridgeKeeper{}
			mockBridgeKeeper.On("GetAcknowledgeBridges", mock.Anything, mock.Anything).
				Return(constants.MsgAcknowledgeBridges_Ids0_1_Height0)

			mockRatelimitKeeper := mocks.VoteExtensionRateLimitKeeper{}
			mockRatelimitKeeper.On("GetSDAILastBlockUpdated", mock.Anything).
				Return(new(big.Int), false)
			mockRatelimitKeeper.On("GetSDAIPrice", mock.Anything).
				Return(new(big.Int), false)

			mockPerpKeeper := mocks.PreparePerpetualsKeeper{}
			mockPerpKeeper.On("GetAddPremiumVotes", mock.Anything).
				Return(constants.ValidMsgAddPremiumVotes)

			mockClobKeeper := mocks.PrepareClobKeeper{}
			mockClobKeeper.On("GetOperations", mock.Anything, mock.Anything).
				Return(constants.ValidEmptyMsgProposedOperations)

			ctx, _, _, _, _, _ := keepertest.PricesKeepers(t)

			if tc.veEnabled {
				ctx = vetesting.GetVeEnabledCtx(ctx, 3)
			}

			veCache := vecache.NewVECache()

			handler := prepare.PrepareProposalHandler(
				encodingCfg.TxConfig,
				&mockBridgeKeeper,
				&mockClobKeeper,
				&mockPerpKeeper,
				&mockPricesKeeper,
				&mockRatelimitKeeper,
				veCache,
				vecodec.NewDefaultVoteExtensionCodec(),
				vecodec.NewDefaultExtendedCommitCodec(),
			)

			req := cometabci.RequestPrepareProposal{
				Txs:        tc.txs,
				MaxTxBytes: 100_000, // something large.
			}

			response, err := handler(ctx, &req)
			require.NoError(t, err)
			require.Equal(t, tc.expectedTxs, response.Txs)
		})
	}
}

func TestGetAddPremiumVotesTx(t *testing.T) {
	tests := map[string]struct {
		keeperResp *perpetualtypes.MsgAddPremiumVotes
		txEncoder  sdktypes.TxEncoder

		expectedTx       []byte
		expectedNumVotes int
		expectedErr      error
	}{
		"nil message fails": {
			keeperResp: nil,

			expectedErr: fmt.Errorf("MsgAddPremiumVotes cannot be nil"),
		},
		"empty message": {
			keeperResp: &perpetualtypes.MsgAddPremiumVotes{}, // empty
			txEncoder:  passingTxEncoderOne,

			expectedTx:       []byte{1},
			expectedNumVotes: 0,
		},
		"empty tx": {
			keeperResp: &perpetualtypes.MsgAddPremiumVotes{},
			txEncoder:  emptyTxEncoder, // returns empty tx.

			expectedErr: fmt.Errorf("invalid tx: []"),
		},
		"valid message, but encoding fails": {
			keeperResp: &perpetualtypes.MsgAddPremiumVotes{}, // empty
			txEncoder:  failingTxEncoder,

			expectedErr: fmt.Errorf("encoder failed"),
		},
		"valid message": {
			keeperResp: &perpetualtypes.MsgAddPremiumVotes{
				Votes: []perpetualtypes.FundingPremium{{}, {}},
			},
			txEncoder: passingTxEncoderOne,

			expectedTx:       []byte{1},
			expectedNumVotes: 2,
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			mockTxConfig := createMockTxConfig(nil, []sdktypes.TxEncoder{tc.txEncoder})
			mockPerpKeeper := mocks.PreparePerpetualsKeeper{}
			mockPerpKeeper.On("GetAddPremiumVotes", mock.Anything).
				Return(tc.keeperResp)
			txSetterParams := prepare.TxSetterUtils{
				Ctx:      ctx,
				TxConfig: mockTxConfig,
			}
			resp, err := prepare.GetAddPremiumVotesTx(txSetterParams, &mockPerpKeeper)
			if tc.expectedErr != nil {
				require.Equal(t, err, tc.expectedErr)
			} else {
				require.NoError(t, err)
			}
			require.Equal(t, tc.expectedTx, resp.Tx)
			require.Equal(t, tc.expectedNumVotes, resp.NumVotes)
		})
	}
}

func TestGetProposedOperationsTx(t *testing.T) {
	tests := map[string]struct {
		keeperResp *clobtypes.MsgProposedOperations
		txEncoder  sdktypes.TxEncoder

		expectedTx               []byte
		expectedNumPlaceOrders   int
		expectedNumMatchedOrders int
		expectedErr              error
	}{
		"nil message fails": {
			keeperResp: nil,

			expectedErr: fmt.Errorf("MsgProposedOperations cannot be nil"),
		},
		"empty message": {
			keeperResp: &clobtypes.MsgProposedOperations{}, // empty
			txEncoder:  passingTxEncoderOne,

			expectedTx:               []byte{1},
			expectedNumMatchedOrders: 0,
			expectedNumPlaceOrders:   0,
		},
		"empty tx": {
			keeperResp: &clobtypes.MsgProposedOperations{},
			txEncoder:  emptyTxEncoder, // returns empty tx.

			expectedErr: fmt.Errorf("invalid tx: []"),
		},
		"valid message, but encoding fails": {
			keeperResp: &clobtypes.MsgProposedOperations{}, // empty
			txEncoder:  failingTxEncoder,

			expectedErr: fmt.Errorf("encoder failed"),
		},
		"valid message": {
			keeperResp: &clobtypes.MsgProposedOperations{
				OperationsQueue: []clobtypes.OperationRaw{{}, {}},
			},
			txEncoder: passingTxEncoderOne,

			expectedTx:               []byte{1},
			expectedNumPlaceOrders:   2,
			expectedNumMatchedOrders: 1,
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			mockTxConfig := createMockTxConfig(nil, []sdktypes.TxEncoder{tc.txEncoder})
			mockClobKeeper := mocks.PrepareClobKeeper{}
			mockClobKeeper.On("GetOperations", mock.Anything, mock.Anything).Return(tc.keeperResp)
			txSetterParams := prepare.TxSetterUtils{
				Ctx:      ctx,
				TxConfig: mockTxConfig,
			}
			resp, err := prepare.GetProposedOperationsTx(txSetterParams, &mockClobKeeper)
			if tc.expectedErr != nil {
				require.Equal(t, err, tc.expectedErr)
			} else {
				require.NoError(t, err)
			}
			require.Equal(t, tc.expectedTx, resp.Tx)
		})
	}
}

func TestEncodeMsgsIntoTxBytes(t *testing.T) {
	tests := map[string]struct {
		setMsgErr error
		txEncoder sdktypes.TxEncoder

		expectedTx  []byte
		expectedErr error
	}{
		"set message fails": {
			setMsgErr:   errors.New("unexpected SetMsgs error"),
			expectedErr: errors.New("unexpected SetMsgs error"),
		},
		"tx encoder fails": {
			setMsgErr:   nil,
			txEncoder:   failingTxEncoder,
			expectedErr: errors.New("encoder failed"),
		},
		"valid": {
			setMsgErr:  nil,
			txEncoder:  passingTxEncoderOne,
			expectedTx: []byte{1},
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			mockTxConfig := createMockTxConfig(tc.setMsgErr, []sdktypes.TxEncoder{tc.txEncoder})

			tx, err := prepare.EncodeMsgsIntoTxBytes(mockTxConfig, &clobtypes.MsgProposedOperations{})

			if tc.expectedErr != nil {
				require.Equal(t, err, tc.expectedErr)
			} else {
				require.NoError(t, err)
			}
			require.Equal(t, tc.expectedTx, tx)
		})
	}
}

func TestGetAcknowledgeBridgesTx(t *testing.T) {
	tests := map[string]struct {
		keeperResp *bridgetypes.MsgAcknowledgeBridges
		txEncoder  sdk.TxEncoder

		expectedTx         []byte
		expectedNumBridges int
		expectedErr        error
	}{
		"empty list of msgs": {
			keeperResp: &bridgetypes.MsgAcknowledgeBridges{},
			txEncoder:  passingTxEncoderOne,

			expectedTx:         []byte{1},
			expectedNumBridges: 0,
		},
		"empty tx": {
			keeperResp: &bridgetypes.MsgAcknowledgeBridges{},
			txEncoder:  emptyTxEncoder, // returns empty tx.

			expectedErr: fmt.Errorf("Invalid tx: []"),
		},
		"valid messages, but encoding fails": {
			keeperResp: &bridgetypes.MsgAcknowledgeBridges{},
			txEncoder:  failingTxEncoder,

			expectedErr: fmt.Errorf("encoder failed"),
		},
		"1 bridge event": {
			keeperResp: constants.MsgAcknowledgeBridges_Id0_Height0,
			txEncoder:  passingTxEncoderTwo,

			expectedTx:         []byte{1, 2},
			expectedNumBridges: 1,
		},
		"2 bridge events": {
			keeperResp: constants.MsgAcknowledgeBridges_Ids0_1_Height0,
			txEncoder:  passingTxEncoderFour,

			expectedTx:         []byte{1, 2, 3, 4},
			expectedNumBridges: 2,
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			mockTxConfig := createMockTxConfig(nil, []sdk.TxEncoder{tc.txEncoder})
			mockBridgeKeeper := mocks.PrepareBridgeKeeper{}
			mockBridgeKeeper.On("GetAcknowledgeBridges", mock.Anything, mock.Anything).
				Return(tc.keeperResp)

			resp, err := prepare.GetAcknowledgeBridgesTx(ctx, mockTxConfig, &mockBridgeKeeper)
			if tc.expectedErr != nil {
				require.Equal(t, err, tc.expectedErr)
			} else {
				require.NoError(t, err)
			}
			require.Equal(t, tc.expectedTx, resp.Tx)
			require.Equal(t, tc.expectedNumBridges, resp.NumBridges)
		})
	}
}

func createMockTxConfig(setMsgsError error, allTxEncoders []sdktypes.TxEncoder) *mocks.TxConfig {
	mockTxConfig := mocks.TxConfig{}
	mockTxBuilder := mocks.TxBuilder{}

	mockTxConfig.On("NewTxBuilder").Return(&mockTxBuilder)
	mockTxBuilder.On("SetMsgs", mock.Anything).Return(setMsgsError)
	mockTxBuilder.On("GetTx").Return(nil) // doesn't really matter, since encoder is mocked.

	for _, txEncoder := range allTxEncoders {
		mockTxConfig.On("TxEncoder").Return(txEncoder).Once()
	}

	mockTxConfig.On("TxDecoder").Return(encoding.GetTestEncodingCfg().TxConfig.TxDecoder())

	return &mockTxConfig
}

func createRequestPrepareProposal(
	extendedCommitInfo cometabci.ExtendedCommitInfo,
	txs [][]byte,
	height int64,
	maxBytes int64,
) *cometabci.RequestPrepareProposal {
	return &cometabci.RequestPrepareProposal{
		Txs:             txs,
		LocalLastCommit: extendedCommitInfo,
		Height:          height,
		MaxTxBytes:      maxBytes,
	}
}

func buildMockKeepers() (*mocks.PreBlockExecPricesKeeper, *mocks.PrepareClobKeeper, *mocks.PreparePerpetualsKeeper, *mocks.VoteExtensionRateLimitKeeper, *mocks.PrepareBridgeKeeper) {
	mPricesk := &mocks.PreBlockExecPricesKeeper{}
	mClobk := &mocks.PrepareClobKeeper{}
	mPerpk2 := &mocks.PreparePerpetualsKeeper{}
	mRatelimitk := &mocks.VoteExtensionRateLimitKeeper{}
	mBridgek := &mocks.PrepareBridgeKeeper{}

	return mPricesk, mClobk, mPerpk2, mRatelimitk, mBridgek
}

func setMockResponses(
	mBridgeKeeper *mocks.PrepareBridgeKeeper,
	mPricesKeeper *mocks.PreBlockExecPricesKeeper,
	mRatelimitKeeper *mocks.VoteExtensionRateLimitKeeper,
	mClobKeeper *mocks.PrepareClobKeeper,
	mPerpKeeper *mocks.PreparePerpetualsKeeper,
	tc PerpareProposalHandlerTC,
) {
	mPricesKeeper.On("GetAllMarketParams", mock.Anything).
		Return(tc.pricesParamsResp)
	mPricesKeeper.On("PerformStatefulPriceUpdateValidation", mock.Anything, mock.Anything).
		Return(nil)
	mPerpKeeper.On("GetAddPremiumVotes", mock.Anything).
		Return(tc.fundingResp)
	mClobKeeper.On("GetOperations", mock.Anything, mock.Anything).
		Return(tc.clobResp)
	mRatelimitKeeper.On("GetSDAILastBlockUpdated", mock.Anything).
		Return(new(big.Int), false)
	mRatelimitKeeper.On("GetSDAIPrice", mock.Anything).
		Return(new(big.Int), false)
	mBridgeKeeper.On("GetAcknowledgeBridges", mock.Anything, mock.Anything).
		Return(tc.bridgeResp)
}

func getResponseTransactionsWithoutExtInfo(txs [][]byte) [][]byte {
	if len(txs) == 0 {
		return txs
	}
	return txs[1:]
}

func validateVotes(
	t *testing.T,
	expectedVotes []cometabci.ExtendedVoteInfo,
	expectedPrices []vetypes.PricePair,
	extCommitInfoBz []byte,
	extcodec vecodec.ExtendedCommitCodec,
	votecodec vecodec.VoteExtensionCodec,
) {
	extCommitInfo, err := extcodec.Decode(extCommitInfoBz)
	require.NoError(t, err)
	for _, expectedVote := range expectedVotes {
		foundMatch := false
		for _, vote := range extCommitInfo.Votes {
			if bytes.Equal(vote.Validator.Address, expectedVote.Validator.Address) {
				if expectedVote.VoteExtension == nil {
					require.Equal(t, expectedVote.VoteExtension, vote.VoteExtension)
					require.Equal(t, expectedVote.ExtensionSignature, vote.ExtensionSignature)
					require.Equal(t, expectedVote.BlockIdFlag, vote.BlockIdFlag)
				} else {
					voteExt, err := votecodec.Decode(vote.VoteExtension)
					require.NoError(t, err)
					require.Equal(t, expectedPrices, voteExt.Prices)
				}
				foundMatch = true
				break
			}
		}
		require.True(t, foundMatch, "Expected vote not found in extCommitInfo.Votes for validator %X", expectedVote.Validator.Address)
	}
}
