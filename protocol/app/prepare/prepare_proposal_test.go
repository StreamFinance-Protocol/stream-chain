package prepare_test

import (
	"errors"
	"fmt"
	"testing"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/prepare"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve"
	vecodec "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/codec"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	prepareutils "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/app"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/encoding"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	vetesting "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/ve"
	clobtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	perpetualtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/perpetuals/types"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"

	abci "github.com/cometbft/cometbft/abci/types"
	cometabci "github.com/cometbft/cometbft/abci/types"
	cometproto "github.com/cometbft/cometbft/proto/tendermint/types"
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
	passingTxEncoderTwo = func(tx sdktypes.Tx) ([]byte, error) {
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
	pricesMarketPriceFromByesResp *pricestypes.MarketPriceUpdates_MarketPriceUpdate

	expectedPrices map[uint32][]byte
	expectedTxs    [][]byte
}

func TestPrepareProposalHandler(t *testing.T) {
	msgSendTxBytesLen := int64(len(constants.Msg_Send_TxBytes))
	msgSendAndTransferTxBytesLen := int64(len(constants.Msg_SendAndTransfer_TxBytes))
	votecodec, extcodec := vecodec.NewDefaultVoteExtensionCodec(), vecodec.NewDefaultExtendedCommitCodec()

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

		// Funding related.
		"Error: GetFundingTx returns err": {

			veEnabled:      false,
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: failingTxEncoder, // encoder fails and returns err.

			expectedTxs: [][]byte{}, // error returns empty result.

			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{},
					1,
					1,
				)
			},
		},
		"Error: GetFundingTx returns empty": {

			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: emptyTxEncoder, // encoder returns empty.
			veEnabled:      false,
			expectedTxs:    [][]byte{}, // error returns empty result.

			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{},
					1,
					1,
				)
			},
		},
		"Error: SetFundingTx returns err": {

			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderOne, // takes up another 1 byte, so exceeds max.
			veEnabled:      false,
			expectedTxs:    [][]byte{}, // error returns empty result.

			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{},
					1, // only upto 1 byte, not enough space for funding tx bytes.
					0,
				)
			},
		},
		// "Others" related.
		"Error: AddOtherTxs return error": {
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,
			veEnabled:      false,
			clobResp:       &clobtypes.MsgProposedOperations{},
			clobEncoder:    passingTxEncoderFour,

			expectedTxs: [][]byte{}, // error returns empty result.
			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{{}},
					1,
					13,
				)
			},
		},
		"Error: AddOtherTxs (additional) return error": {
			veEnabled:      false,
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

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

			expectedTxs: [][]byte{
				{1, 2, 3, 4},               // order.
				constants.Msg_Send_TxBytes, // others.
				{1, 2, 3, 4},               // funding.
			},

			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{
						constants.Msg_Send_TxBytes,
						constants.Msg_Send_TxBytes, // not included due to maxBytes.
						constants.Msg_Send_TxBytes, // not included due to maxBytes.
					},
					1,
					int64(12)+msgSendTxBytesLen+1,
				)
			},
		},
		"Valid: Additional Others fit": {
			veEnabled:      false,
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,
			expectedTxs: [][]byte{
				{1, 2, 3, 4},                          // order.
				constants.Msg_Send_TxBytes,            // others.
				constants.Msg_SendAndTransfer_TxBytes, // additional others.
				{1, 2, 3, 4},                          // funding.
			},

			request: func() *cometabci.RequestPrepareProposal {
				return createRequestPrepareProposal(
					cometabci.ExtendedCommitInfo{},
					[][]byte{
						constants.Msg_Send_TxBytes,
						constants.Msg_SendAndTransfer_TxBytes,
						constants.Msg_Send_TxBytes, // not included due t.
					},
					1,
					int64(12)+msgSendTxBytesLen+msgSendAndTransferTxBytesLen,
				)
			},
		},
		"Valid: returns correct VEs": {
			fundingResp:    &perpetualtypes.MsgAddPremiumVotes{},
			fundingEncoder: passingTxEncoderFour,

			clobResp:    &clobtypes.MsgProposedOperations{},
			clobEncoder: passingTxEncoderFour,

			pricesParamsResp:              constants.TestMarketParams,
			pricesMarketPriceFromByesResp: constants.ValidMarketPriceUpdates[0],

			veEnabled: true,

			expectedPrices: constants.ValidVEPrice,

			request: func() *cometabci.RequestPrepareProposal {
				proposal := [][]byte{
					constants.Msg_SendAndTransfer_TxBytes, // others.
					constants.Msg_Send_TxBytes,            // others.
				}

				valVoteInfo, err := vetesting.CreateExtendedVoteInfo(
					constants.AliceConsAddress,
					constants.ValidVEPrice,
					votecodec,
				)

				require.NoError(t, err)

				commitInfo, _, err := vetesting.CreateExtendedCommitInfo(
					[]cometabci.ExtendedVoteInfo{valVoteInfo},
					extcodec,
				)

				require.NoError(t, err)

				prop := createRequestPrepareProposal(
					commitInfo,
					proposal,
					3,
					500,
				)

				return prop

			},

			expectedTxs: [][]byte{
				{1, 2, 3, 4},                          // order.
				constants.Msg_SendAndTransfer_TxBytes, // others.
				constants.Msg_Send_TxBytes,            // others.
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
					tc.clobEncoder,
				},
			)

			// necessary mock keepers
			mPricesKeeper, mClobKeeper, mPerpKeeper := buildMockKeepers()

			setMockResponses(mPricesKeeper, mClobKeeper, mPerpKeeper, tc)

			ctx, _, _, _, _, _ := keepertest.PricesKeepers(t)

			if tc.veEnabled {
				ctx = getVeEnabledCtx(ctx)
			}

			handler := prepare.PrepareProposalHandler(
				mockTxConfig,
				mClobKeeper,
				mPerpKeeper,
				mPricesKeeper,
				votecodec,
				extcodec,
				prepareutils.NoOpValidateVoteExtensionsFn,
			)

			req := tc.request()
			response, err := handler(ctx, req)
			require.NoError(t, err)
			require.Equal(t, tc.expectedTxs, getResponseTransactionsWithExtInfo(response.Txs))

			if tc.veEnabled {
				bz, err := extcodec.Encode(req.LocalLastCommit)
				require.NoError(t, err)
				if int64(len(bz)) < req.MaxTxBytes {
					require.Equal(t, bz, response.Txs[0])
				}

				prices := getPricesFromExtInfoBytes(response.Txs[0], extcodec, votecodec)
				require.Equal(t, tc.expectedPrices, prices)
			}
		})
	}
}

func TestPrepareProposalHandler_OtherTxs(t *testing.T) {
	encodingCfg := encoding.GetTestEncodingCfg()

	tests := map[string]struct {
		txs [][]byte

		expectedTxs [][]byte
	}{
		"Valid: all others txs contain disallow msgs": {
			txs: [][]byte{
				multiMsgsTxHasDisallowOnlyTxBytes,  // filtered out.
				multiMsgsTxHasDisallowMixedTxBytes, // filtered out.
			},
			expectedTxs: [][]byte{
				constants.ValidEmptyExtInfoBytes,                 // ve.
				constants.ValidEmptyMsgProposedOperationsTxBytes, // order.
				// no other txs.
				constants.ValidMsgAddPremiumVotesTxBytes, // funding.

			},
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
				constants.ValidEmptyExtInfoBytes,                 // ve.
				constants.ValidEmptyMsgProposedOperationsTxBytes, // order.
				constants.Msg_SendAndTransfer_TxBytes,            // others.
				constants.Msg_Send_TxBytes,                       // others.
				constants.ValidMsgAddPremiumVotesTxBytes,         // funding.

			},
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			mockPricesKeeper := mocks.PreparePricesKeeper{}
			mockPricesKeeper.On("GetAllMarketParams", mock.Anything).
				Return(constants.ValidEmptyMarketParams)

			mockPerpKeeper := mocks.PreparePerpetualsKeeper{}
			mockPerpKeeper.On("GetAddPremiumVotes", mock.Anything).
				Return(constants.ValidMsgAddPremiumVotes)

			mockClobKeeper := mocks.PrepareClobKeeper{}
			mockClobKeeper.On("GetOperations", mock.Anything, mock.Anything).
				Return(constants.ValidEmptyMsgProposedOperations)

			mockConsumerKeeper := mocks.PrepareConsumerKeeper{}
			mockConsumerKeeper.On("GetCCValidator", mock.Anything, mock.Anything).
				Return(constants.ValidEmptyCrossChainValidator, true)

			ctx, _, _, _, _, _ := keepertest.PricesKeepers(t)

			handler := prepare.PrepareProposalHandler(
				encodingCfg.TxConfig,
				&mockClobKeeper,
				&mockPerpKeeper,
				&mockPricesKeeper,
				vecodec.NewDefaultVoteExtensionCodec(),
				vecodec.NewDefaultExtendedCommitCodec(),
				ve.NewValidateVoteExtensionsFn(&mockConsumerKeeper),
			)

			req := abci.RequestPrepareProposal{
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

			expectedErr: fmt.Errorf("Invalid tx: []"),
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

			resp, err := prepare.GetAddPremiumVotesTx(ctx, mockTxConfig, &mockPerpKeeper)
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

			expectedErr: fmt.Errorf("Invalid tx: []"),
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

			resp, err := prepare.GetProposedOperationsTx(ctx, mockTxConfig, &mockClobKeeper)
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

func buildMockKeepers() (*mocks.PreparePricesKeeper, *mocks.PrepareClobKeeper, *mocks.PreparePerpetualsKeeper) {
	mPricesk := &mocks.PreparePricesKeeper{}
	mClobk := &mocks.PrepareClobKeeper{}
	mPerpk2 := &mocks.PreparePerpetualsKeeper{}

	return mPricesk, mClobk, mPerpk2
}

func getVeEnabledCtx(ctx sdktypes.Context) sdktypes.Context {
	ctx = ctx.WithConsensusParams(
		cometproto.ConsensusParams{
			Abci: &cometproto.ABCIParams{
				VoteExtensionsEnableHeight: 2,
			},
		},
	).WithBlockHeight(3)
	return ctx
}

func setMockResponses(
	mPricesKeeper *mocks.PreparePricesKeeper,
	mClobKeeper *mocks.PrepareClobKeeper,
	mPerpKeeper *mocks.PreparePerpetualsKeeper,
	tc PerpareProposalHandlerTC,
) {

	mPricesKeeper.On("GetAllMarketParams", mock.Anything).
		Return(tc.pricesParamsResp)
	mPricesKeeper.On("GetMarketPriceUpdateFromBytes", mock.Anything, mock.Anything).
		Return(tc.pricesMarketPriceFromByesResp, nil)
	mPricesKeeper.On("PerformStatefulPriceUpdateValidation", mock.Anything, mock.Anything, mock.Anything).
		Return(nil)
	mPerpKeeper.On("GetAddPremiumVotes", mock.Anything).
		Return(tc.fundingResp)
	mClobKeeper.On("GetOperations", mock.Anything, mock.Anything).
		Return(tc.clobResp)
}

func getResponseTransactionsWithExtInfo(txs [][]byte) [][]byte {
	if len(txs) == 0 {
		return txs
	}
	return txs[1:]
}

func getPricesFromExtInfoBytes(bz []byte, extcodec vecodec.ExtendedCommitCodec, votecodec vecodec.VoteExtensionCodec) map[uint32][]byte {

	extCommitInfo, err := extcodec.Decode(bz)
	if err != nil {
		return nil
	}
	for _, vote := range extCommitInfo.Votes {
		if vote.VoteExtension != nil {
			voteExt, err := votecodec.Decode(vote.VoteExtension)
			if err != nil {
				return nil
			}
			return voteExt.Prices
		}
	}
	return nil
}
