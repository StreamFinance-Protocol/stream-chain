package indexer_manager_test

import (
	"time"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	indexerevents "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/events"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/indexer_manager"
	v1 "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/protocol/v1"
	"github.com/StreamFinance-Protocol/stream-chain/protocol/testutil/constants"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

const (
	TxHash      = "txHash"
	TxHash1     = "txHash1"
	Data        = "data"
	Data2       = "data2"
	Data3       = "data3"
	BlockHeight = int64(5)
	ConsumedGas = uint64(100)
)

var BlockTime = time.Unix(1650000000, 0).UTC()

var TransferTendermintEvent = indexer_manager.IndexerTendermintEvent{
	Subtype: indexerevents.SubtypeTransfer,
	OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_TransactionIndex{
		TransactionIndex: 0,
	},
	EventIndex: 1,
	DataBytes:  []byte(Data),
}

var SubaccountTendermintEvent = indexer_manager.IndexerTendermintEvent{
	Subtype: indexerevents.SubtypeSubaccountUpdate,
	OrderingWithinBlock: &indexer_manager.IndexerTendermintEvent_TransactionIndex{
		TransactionIndex: 1,
	},
	EventIndex: 0,
	DataBytes:  []byte(Data2),
}

var FundingRateAndIndexEvent = indexerevents.FundingEventV1{
	Type: indexerevents.FundingEventV1_TYPE_FUNDING_RATE_AND_INDEX,
	Updates: []indexerevents.FundingUpdateV1{
		{
			PerpetualId:     0,
			FundingValuePpm: -1000,
			FundingIndex:    dtypes.NewInt(0),
		},
		{
			PerpetualId:     1,
			FundingValuePpm: 0,
			FundingIndex:    dtypes.NewInt(1000),
		},
		{
			PerpetualId:     2,
			FundingValuePpm: 5000,
			FundingIndex:    dtypes.NewInt(-1000),
		},
	},
}

var FundingPremiumSampleEvent = indexerevents.FundingEventV1{
	Type: indexerevents.FundingEventV1_TYPE_PREMIUM_SAMPLE,
	Updates: []indexerevents.FundingUpdateV1{
		{
			PerpetualId:     0,
			FundingValuePpm: 1000,
		},
		{
			PerpetualId:     1,
			FundingValuePpm: 0,
		},
	},
}

var subaccountId = v1.SubaccountIdToIndexerSubaccountId(constants.Alice_Num0)
var perpetualPositions = v1.PerpetualPositionsToIndexerPerpetualPositions(
	[]*satypes.PerpetualPosition{
		&constants.Long_Perp_1BTC_PositiveFunding,
		&constants.Short_Perp_1ETH_NegativeFunding,
	},
	map[uint32]dtypes.SerializableInt{
		constants.Long_Perp_1BTC_PositiveFunding.PerpetualId:  dtypes.NewInt(100),
		constants.Short_Perp_1ETH_NegativeFunding.PerpetualId: dtypes.NewInt(-100),
	},
)
var assetPositions = v1.AssetPositionsToIndexerAssetPositions(
	[]*satypes.AssetPosition{
		&constants.Short_Asset_1BTC,
		&constants.Long_Asset_1ETH,
	},
)
var assetYieldIndex = constants.AssetYieldIndex_Zero
var SubaccountEvent = indexerevents.SubaccountUpdateEventV1{
	SubaccountId:              &subaccountId,
	UpdatedPerpetualPositions: perpetualPositions,
	UpdatedAssetPositions:     assetPositions,
	YieldIndex:                assetYieldIndex,
}

var Alice_Num0_IndexerSubaccountId = v1.SubaccountIdToIndexerSubaccountId(constants.Alice_Num0)
var Alice_Num1_IndexerSubaccountId = v1.SubaccountIdToIndexerSubaccountId(constants.Alice_Num1)
var TransferEvent = indexerevents.TransferEventV1{
	SenderSubaccountId:    &Alice_Num0_IndexerSubaccountId,
	RecipientSubaccountId: &Alice_Num1_IndexerSubaccountId,
	Sender: &indexerevents.SourceOfFunds{
		Source: &indexerevents.SourceOfFunds_SubaccountId{
			SubaccountId: &Alice_Num0_IndexerSubaccountId,
		},
	},
	Recipient: &indexerevents.SourceOfFunds{
		Source: &indexerevents.SourceOfFunds_SubaccountId{
			SubaccountId: &Alice_Num1_IndexerSubaccountId,
		},
	},
	Amount:  uint64(5),
	AssetId: uint32(0),
}
