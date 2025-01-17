package v1

import (
	"fmt"
	"math/big"

	"github.com/StreamFinance-Protocol/stream-chain/protocol/dtypes"
	v1types "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/protocol/v1/types"
	clobtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
)

func SubaccountIdToIndexerSubaccountId(
	subaccountId satypes.SubaccountId,
) v1types.IndexerSubaccountId {
	return v1types.IndexerSubaccountId{
		Owner:  subaccountId.Owner,
		Number: subaccountId.Number,
	}
}

func AssetYieldIndexToIndexerAssetYieldIndex(
	assetYieldIndex *big.Rat,
) string {
	return assetYieldIndex.String()
}

func PerpetualPositionToIndexerPerpetualPosition(
	perpetualPosition *satypes.PerpetualPosition,
	fundingPayment dtypes.SerializableInt,
) *v1types.IndexerPerpetualPosition {
	return &v1types.IndexerPerpetualPosition{
		PerpetualId:    perpetualPosition.PerpetualId,
		Quantums:       perpetualPosition.Quantums,
		FundingIndex:   perpetualPosition.FundingIndex,
		FundingPayment: fundingPayment,
	}
}

func PerpetualPositionsToIndexerPerpetualPositions(
	perpetualPositions []*satypes.PerpetualPosition,
	fundingPayments map[uint32]dtypes.SerializableInt,
) []*v1types.IndexerPerpetualPosition {
	if perpetualPositions == nil {
		return nil
	}
	indexerPerpetualPositions := make([]*v1types.IndexerPerpetualPosition, 0, len(perpetualPositions))
	for _, perpetualPosition := range perpetualPositions {
		// Retrieve funding payment for this perpetual position (0 by default).
		fundingPayment, exists := fundingPayments[perpetualPosition.PerpetualId]
		if !exists {
			fundingPayment = dtypes.ZeroInt()
		}
		indexerPerpetualPositions = append(
			indexerPerpetualPositions,
			PerpetualPositionToIndexerPerpetualPosition(
				perpetualPosition,
				fundingPayment,
			),
		)
	}
	return indexerPerpetualPositions
}

func AssetPositionToIndexerAssetPosition(
	assetPosition *satypes.AssetPosition,
) *v1types.IndexerAssetPosition {
	return &v1types.IndexerAssetPosition{
		AssetId:  assetPosition.AssetId,
		Quantums: assetPosition.Quantums,
		Index:    assetPosition.Index,
	}
}

func AssetPositionsToIndexerAssetPositions(
	assetPositions []*satypes.AssetPosition,
) []*v1types.IndexerAssetPosition {
	if assetPositions == nil {
		return nil
	}
	indexerAssetPositions := make([]*v1types.IndexerAssetPosition, 0, len(assetPositions))
	for _, assetPosition := range assetPositions {
		indexerAssetPositions = append(
			indexerAssetPositions,
			AssetPositionToIndexerAssetPosition(assetPosition),
		)
	}
	return indexerAssetPositions
}

func OrderIdToIndexerOrderId(
	orderId clobtypes.OrderId,
) v1types.IndexerOrderId {
	return v1types.IndexerOrderId{
		SubaccountId: SubaccountIdToIndexerSubaccountId(orderId.SubaccountId),
		ClientId:     orderId.ClientId,
		OrderFlags:   orderId.OrderFlags,
		ClobPairId:   orderId.ClobPairId,
	}
}

func OrderSideToIndexerOrderSide(
	orderSide clobtypes.Order_Side,
) v1types.IndexerOrder_Side {
	return v1types.IndexerOrder_Side(orderSide)
}

func OrderTimeInForceToIndexerOrderTimeInForce(
	orderTimeInForce clobtypes.Order_TimeInForce,
) v1types.IndexerOrder_TimeInForce {
	return v1types.IndexerOrder_TimeInForce(orderTimeInForce)
}

func OrderConditionTypeToIndexerOrderConditionType(
	orderConditionType clobtypes.Order_ConditionType,
) v1types.IndexerOrder_ConditionType {
	return v1types.IndexerOrder_ConditionType(orderConditionType)
}

func OrderToIndexerOrder(
	order clobtypes.Order,
) v1types.IndexerOrder {
	switch goodTil := order.GoodTilOneof.(type) {
	case *clobtypes.Order_GoodTilBlock:
		return orderToIndexerOrder_GoodTilBlock(
			order,
			v1types.IndexerOrder_GoodTilBlock{GoodTilBlock: goodTil.GoodTilBlock},
		)
	case *clobtypes.Order_GoodTilBlockTime:
		return orderToIndexerOrder_GoodTilBlockTime(
			order,
			v1types.IndexerOrder_GoodTilBlockTime{GoodTilBlockTime: goodTil.GoodTilBlockTime},
		)
	default:
		panic(fmt.Errorf("Unexpected GoodTilOneof in Order: %+v", order))
	}
}

func HandleEmptyRouterSubaccountIdForOwner(order clobtypes.Order) string {
	if order.RouterFeeOwner == "" {
		return authtypes.NewModuleAddress("NULL_ROUTER_ADDRESS").String()
	}
	return order.RouterFeeOwner
}

func orderToIndexerOrder_GoodTilBlock(
	order clobtypes.Order,
	goodTilBlock v1types.IndexerOrder_GoodTilBlock,
) v1types.IndexerOrder {
	return v1types.IndexerOrder{
		OrderId:                         OrderIdToIndexerOrderId(order.OrderId),
		Side:                            OrderSideToIndexerOrderSide(order.Side),
		Quantums:                        order.Quantums,
		Subticks:                        order.Subticks,
		GoodTilOneof:                    &goodTilBlock,
		TimeInForce:                     OrderTimeInForceToIndexerOrderTimeInForce(order.TimeInForce),
		ReduceOnly:                      order.ReduceOnly,
		ClientMetadata:                  order.ClientMetadata,
		ConditionType:                   OrderConditionTypeToIndexerOrderConditionType(order.ConditionType),
		ConditionalOrderTriggerSubticks: order.ConditionalOrderTriggerSubticks,
		RouterFeePpm:                    order.RouterFeePpm,
		RouterFeeOwner:                  HandleEmptyRouterSubaccountIdForOwner(order),
	}
}

func orderToIndexerOrder_GoodTilBlockTime(
	order clobtypes.Order,
	goodTilBlockTime v1types.IndexerOrder_GoodTilBlockTime,
) v1types.IndexerOrder {
	return v1types.IndexerOrder{
		OrderId:                         OrderIdToIndexerOrderId(order.OrderId),
		Side:                            OrderSideToIndexerOrderSide(order.Side),
		Quantums:                        order.Quantums,
		Subticks:                        order.Subticks,
		GoodTilOneof:                    &goodTilBlockTime,
		TimeInForce:                     OrderTimeInForceToIndexerOrderTimeInForce(order.TimeInForce),
		ReduceOnly:                      order.ReduceOnly,
		ClientMetadata:                  order.ClientMetadata,
		ConditionType:                   OrderConditionTypeToIndexerOrderConditionType(order.ConditionType),
		ConditionalOrderTriggerSubticks: order.ConditionalOrderTriggerSubticks,
		RouterFeePpm:                    order.RouterFeePpm,
		RouterFeeOwner:                  HandleEmptyRouterSubaccountIdForOwner(order),
	}
}

func ConvertToClobPairStatus(status clobtypes.ClobPair_Status) v1types.ClobPairStatus {
	switch status {
	case clobtypes.ClobPair_STATUS_ACTIVE:
		return v1types.ClobPairStatus_CLOB_PAIR_STATUS_ACTIVE
	case clobtypes.ClobPair_STATUS_PAUSED:
		return v1types.ClobPairStatus_CLOB_PAIR_STATUS_PAUSED
	case clobtypes.ClobPair_STATUS_CANCEL_ONLY:
		return v1types.ClobPairStatus_CLOB_PAIR_STATUS_CANCEL_ONLY
	case clobtypes.ClobPair_STATUS_POST_ONLY:
		return v1types.ClobPairStatus_CLOB_PAIR_STATUS_POST_ONLY
	case clobtypes.ClobPair_STATUS_INITIALIZING:
		return v1types.ClobPairStatus_CLOB_PAIR_STATUS_INITIALIZING
	case clobtypes.ClobPair_STATUS_FINAL_SETTLEMENT:
		return v1types.ClobPairStatus_CLOB_PAIR_STATUS_FINAL_SETTLEMENT
	default:
		panic(
			fmt.Sprintf(
				"ConvertToClobPairStatus: invalid clob pair status: %+v",
				status,
			),
		)
	}
}
