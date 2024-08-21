package events

import (
	"fmt"

	v1 "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/protocol/v1"
	clobtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
	satypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/subaccounts/types"
)

// NewOrderFillEvent creates a new OrderFillEvent proto message given the maker and taker orders along
// with the fill and fee amounts. Note: This function does no validation of the input maker/taker orders
// or the fill amount and assumes all such validation has been done before constructing the event.
func NewOrderFillEvent(
	makerOrder clobtypes.Order,
	takerOrder clobtypes.Order,
	fillAmount satypes.BaseQuantums,
	makerFee int64,
	takerFee int64,
	totalFilledMaker satypes.BaseQuantums,
	totalFilledTaker satypes.BaseQuantums,
) *OrderFillEventV1 {
	indexerTakerOrder := v1.OrderToIndexerOrder(takerOrder)
	return &OrderFillEventV1{
		MakerOrder: v1.OrderToIndexerOrder(makerOrder),
		TakerOrder: &OrderFillEventV1_Order{
			Order: &indexerTakerOrder,
		},
		FillAmount:       fillAmount.BigInt().Uint64(),
		MakerFee:         makerFee,
		TakerFee:         takerFee,
		TotalFilledMaker: totalFilledMaker.BigInt().Uint64(),
		TotalFilledTaker: totalFilledTaker.BigInt().Uint64(),
	}
}

// NewLiquidationOrderFillEvent creates a new OrderFillEvent proto message given the maker and liquidation
// taker orders along with the fill and fee amounts. Panics if the taker order is not a liquidation order.
// The taker fee here refers to the special liquidation fee, not the standard taker fee.
func NewLiquidationOrderFillEvent(
	makerOrder clobtypes.Order,
	liquidationTakerOrder clobtypes.MatchableOrder,
	fillAmount satypes.BaseQuantums,
	makerFee int64,
	takerFee int64,
	totalFilledMaker satypes.BaseQuantums,
) *OrderFillEventV1 {
	if !liquidationTakerOrder.IsLiquidation() {
		panic(fmt.Sprintf("liquidationTakerOrder is not a liquidation order: %v", liquidationTakerOrder))
	}
	liquidationOrder := LiquidationOrderV1{
		Liquidated:  v1.SubaccountIdToIndexerSubaccountId(liquidationTakerOrder.GetSubaccountId()),
		ClobPairId:  liquidationTakerOrder.GetClobPairId().ToUint32(),
		PerpetualId: liquidationTakerOrder.MustGetLiquidatedPerpetualId(),
		TotalSize:   liquidationTakerOrder.GetBaseQuantums().BigInt().Uint64(),
		IsBuy:       liquidationTakerOrder.IsBuy(),
		Subticks:    uint64(liquidationTakerOrder.GetOrderSubticks()),
	}
	return &OrderFillEventV1{
		MakerOrder:       v1.OrderToIndexerOrder(makerOrder),
		TakerOrder:       &OrderFillEventV1_LiquidationOrder{LiquidationOrder: &liquidationOrder},
		FillAmount:       fillAmount.BigInt().Uint64(),
		MakerFee:         makerFee,
		TakerFee:         takerFee,
		TotalFilledMaker: totalFilledMaker.BigInt().Uint64(),
		TotalFilledTaker: fillAmount.BigInt().Uint64(),
	}
}
