package preblocker_test

import (
	"math/big"
	"testing"

	"cosmossdk.io/log"

	preblocker "github.com/StreamFinance-Protocol/stream-chain/protocol/app/preblocker"
	veaggregator "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/aggregator"
	priceapplier "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/applier"
	vecodec "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/codec"
	voteweighted "github.com/StreamFinance-Protocol/stream-chain/protocol/app/ve/math"
	pricefeedtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/daemons/server/types/pricefeed"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/mocks"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	ethosutils "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/ethos"
	keepertest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/keeper"
	pricestest "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/prices"
	vetesting "github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/ve"
	pk "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/keeper"
	pricestypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/prices/types"
	cometabci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	ccvtypes "github.com/ethos-works/ethos/ethos-chain/x/ccv/consumer/types"
	"github.com/stretchr/testify/suite"
)

type PreBlockTestSuite struct {
	suite.Suite

	validator         sdk.ConsAddress
	ctx               sdk.Context
	marketParamPrices []pricestypes.MarketParamPrice
	pricesKeeper      *pk.Keeper
	indexPriceCache   *pricefeedtypes.MarketToExchangePrices
	priceApplier      *priceapplier.PriceApplier
	handler           *preblocker.PreBlockHandler
	ccvStore          *mocks.CCValidatorStore
	voteCodec         vecodec.VoteExtensionCodec
	extCodec          vecodec.ExtendedCommitCodec
	logger            log.Logger
}

func TestPreBlockTestSuite(t *testing.T) {
	suite.Run(t, new(PreBlockTestSuite))
}

func (s *PreBlockTestSuite) SetupTest() {
	s.validator = constants.AliceEthosConsAddress

	ctx, pricesKeeper, _, indexPriceCahce, _, mockTimeProvider := keepertest.PricesKeepers(s.T())
	mockTimeProvider.On("Now").Return(constants.TimeT)

	s.ctx = ctx
	s.pricesKeeper = pricesKeeper
	s.indexPriceCache = indexPriceCahce

	s.voteCodec = vecodec.NewDefaultVoteExtensionCodec()
	s.extCodec = vecodec.NewDefaultExtendedCommitCodec()

	s.logger = log.NewTestLogger(s.T())

	mCCVStore := &mocks.CCValidatorStore{}
	s.ccvStore = mCCVStore

	aggregationFn := voteweighted.Median(
		s.logger,
		s.ccvStore,
		voteweighted.DefaultPowerThreshold,
	)

	aggregator := veaggregator.NewVeAggregator(
		s.logger,
		s.indexPriceCache,
		*s.pricesKeeper,
		aggregationFn,
	)

	s.priceApplier = priceapplier.NewPriceApplier(
		s.logger,
		aggregator,
		*s.pricesKeeper,
		s.voteCodec,
		s.extCodec,
	)

	s.marketParamPrices = s.setMarketPrices()

	s.createTestMarkets()
}

func (s *PreBlockTestSuite) TestPreBlocker() {
	s.Run("fail on nil request", func() {
		s.ctx = vetesting.GetVeEnabledCtx(s.ctx, 3)
		s.handler = preblocker.NewDaemonPreBlockHandler(
			s.logger,
			s.priceApplier,
		)
		s.indexPriceCache.UpdatePrices(constants.MixedTimePriceUpdate)

		prePrices := s.getAllMarketPrices()

		_, err := s.handler.PreBlocker(s.ctx, nil)
		s.Require().Error(err)

		s.Require().True(s.ensurePricesEqualToCurrent(prePrices))
	})

	s.Run("skip when vote extensions are disabled", func() {
		s.ctx = vetesting.GetVeEnabledCtx(s.ctx, 1)

		s.handler = preblocker.NewDaemonPreBlockHandler(
			s.logger,
			s.priceApplier,
		)

		s.indexPriceCache.UpdatePrices(constants.MixedTimePriceUpdate)

		prePrices := s.getAllMarketPrices()

		_, err := s.handler.PreBlocker(s.ctx, &cometabci.RequestFinalizeBlock{})
		s.Require().NoError(err)

		s.Require().True(s.ensurePricesEqualToCurrent(prePrices))
	})

	s.Run("ignore vote-extensions w/ prices for non-existent pairs", func() {
		s.ctx = vetesting.GetVeEnabledCtx(s.ctx, 4)

		s.handler = preblocker.NewDaemonPreBlockHandler(
			s.logger,
			s.priceApplier,
		)

		s.indexPriceCache.UpdatePrices(constants.MixedTimePriceUpdate)

		priceBz, err := big.NewInt(1).GobEncode()
		s.Require().NoError(err)

		prices := map[uint32][]byte{
			10: priceBz, // 10 is a nonexistent market
		}

		extCommitBz := s.getVoteExtensionsForValidatorsWithSamePrices(
			[]string{"alice", "bob"},
			prices,
		)

		s.mockCCVStoreGetAllValidatorsCall([]string{"alice", "bob"})

		prePrices := s.getAllMarketPrices()

		_, err = s.handler.PreBlocker(s.ctx, &cometabci.RequestFinalizeBlock{
			Txs: [][]byte{extCommitBz, {1, 2, 3, 4}, {1, 2, 3, 4}},
		})
		s.Require().NoError(err)

		s.Require().True(s.ensurePricesEqualToCurrent(prePrices))
	})

	s.Run("multiple markets to write prices for", func() {
		s.ctx = vetesting.GetVeEnabledCtx(s.ctx, 5)

		s.handler = preblocker.NewDaemonPreBlockHandler(
			s.logger,
			s.priceApplier,
		)

		s.indexPriceCache.UpdatePrices(constants.MixedTimePriceUpdate)

		price1 := uint64(1)
		price2 := uint64(2)
		price3 := uint64(3)

		price1Bz, err := big.NewInt(int64(price1)).GobEncode()
		s.Require().NoError(err)
		price2Bz, err := big.NewInt(int64(price2)).GobEncode()
		s.Require().NoError(err)
		price3Bz, err := big.NewInt(int64(price3)).GobEncode()
		s.Require().NoError(err)

		prices := map[uint32][]byte{
			6: price1Bz,
			7: price2Bz,
			8: price3Bz,
		}

		extCommitBz := s.getVoteExtensionsForValidatorsWithSamePrices(
			[]string{"alice", "bob"},
			prices,
		)

		s.mockCCVStoreGetAllValidatorsCall([]string{"alice", "bob"})

		_, err = s.handler.PreBlocker(s.ctx, &cometabci.RequestFinalizeBlock{
			Txs: [][]byte{extCommitBz, {1, 2, 3, 4}, {1, 2, 3, 4}},
		})
		s.Require().NoError(err)

		s.arePriceUpdatesCorrect(
			map[uint32]uint64{
				6: price1,
				7: price2,
				8: price3,
			},
		)
	})

	s.Run("throws error if can't get extCommitInfo", func() {
		s.ctx = vetesting.GetVeEnabledCtx(s.ctx, 6)

		s.handler = preblocker.NewDaemonPreBlockHandler(
			s.logger,
			s.priceApplier,
		)

		s.indexPriceCache.UpdatePrices(constants.MixedTimePriceUpdate)

		_, err := s.handler.PreBlocker(s.ctx, &cometabci.RequestFinalizeBlock{
			Txs: [][]byte{},
		})

		s.Require().EqualError(err, "proposal does not contain enough set messages (VE's, proposed operations, or premium votes): 0")
	})
}

func (s *PreBlockTestSuite) getAllMarketPrices() []pricestypes.MarketPrice {
	return s.pricesKeeper.GetAllMarketPrices(s.ctx)
}

func (s *PreBlockTestSuite) arePriceUpdatesCorrect(
	correctPrices map[uint32]uint64,
) bool {
	prices := s.getAllMarketPrices()
	if len(prices) != len(correctPrices) {
		return false
	}

	for _, price := range prices {
		correctPrice, ok := correctPrices[price.Id]
		if !ok {
			return false
		}

		if price.Price != correctPrice {
			return false
		}
	}
	return true
}

func (s *PreBlockTestSuite) ensurePricesEqualToCurrent(before []pricestypes.MarketPrice) bool {
	currPrices := s.getAllMarketPrices()
	if len(before) != len(currPrices) {
		return false
	}

	for i, price := range before {
		if price.Id != currPrices[i].Id {
			return false
		}
		if price.Exponent != currPrices[i].Exponent {
			return false
		}
		if price.Price != currPrices[i].Price {
			return false
		}
	}
	return true
}

func (s *PreBlockTestSuite) createTestMarkets() {
	keepertest.CreateTestPriceMarkets(
		s.T(),
		s.ctx,
		s.pricesKeeper,
		s.marketParamPrices,
	)
}

func (s *PreBlockTestSuite) getVoteExtension(
	prices map[uint32][]byte,
	val sdk.ConsAddress,
) cometabci.ExtendedVoteInfo {
	ve, err := vetesting.CreateSignedExtendedVoteInfo(
		vetesting.SignedVEInfo{
			Val:     val,
			Power:   500,
			Prices:  prices,
			Height:  3,
			Round:   0,
			ChainId: "localdydxprotocol",
		},
	)
	s.Require().NoError(err)
	return ve
}

func (s *PreBlockTestSuite) getExtendedCommitInfoBz(
	votes []cometabci.ExtendedVoteInfo,
) []byte {
	_, extCommitBz, err := vetesting.CreateExtendedCommitInfo(
		votes,
	)
	s.Require().NoError(err)
	return extCommitBz
}

func (s *PreBlockTestSuite) setMarketPrices() []pricestypes.MarketParamPrice {
	return []pricestypes.MarketParamPrice{
		*pricestest.GenerateMarketParamPrice(
			pricestest.WithId(6),
			pricestest.WithMinExchanges(2),
		),
		*pricestest.GenerateMarketParamPrice(
			pricestest.WithId(7),
			pricestest.WithMinExchanges(2),
		),
		*pricestest.GenerateMarketParamPrice(
			pricestest.WithId(8),
			pricestest.WithMinExchanges(2),
			pricestest.WithExponent(-8),
		),
		*pricestest.GenerateMarketParamPrice(
			pricestest.WithId(9),
			pricestest.WithMinExchanges(2),
			pricestest.WithExponent(-9),
		),
	}
}

func (s *PreBlockTestSuite) buildAndMockCCValidator(name string, power int64) ccvtypes.CrossChainValidator {
	val := ethosutils.BuildCCValidator(name, power)
	s.ccvStore.On("GetCCValidator", s.ctx, val.Address).Return(val, true)
	return val
}

func (s *PreBlockTestSuite) mockCCVStoreGetAllValidatorsCall(validators []string) {
	var vals []ccvtypes.CrossChainValidator
	for _, valName := range validators {
		val := s.buildAndMockCCValidator(valName, 1)
		vals = append(vals, val)
	}
	s.ccvStore.On("GetAllCCValidator", s.ctx).Return(vals)
}

func (s *PreBlockTestSuite) getVoteExtensionsForValidatorsWithSamePrices(
	validators []string,
	prices map[uint32][]byte,
) []byte {
	var votes []cometabci.ExtendedVoteInfo
	for _, valName := range validators {
		ve := s.getVoteExtension(prices, s.getValidatorConsAddr(valName))
		votes = append(votes, ve)
	}
	return s.getExtendedCommitInfoBz(votes)
}

func (s *PreBlockTestSuite) getValidatorConsAddr(name string) sdk.ConsAddress {
	if name == "alice" {
		return constants.AliceEthosConsAddress
	} else {
		return constants.BobEthosConsAddress
	}
}
