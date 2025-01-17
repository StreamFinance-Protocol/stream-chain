package events

import (
	v1 "github.com/StreamFinance-Protocol/stream-chain/protocol/indexer/protocol/v1"
	clobtypes "github.com/StreamFinance-Protocol/stream-chain/protocol/x/clob/types"
)

// NewPerpetualMarketCreateEvent creates a PerpetualMarketCreateEvent
// representing creation of a perpetual market.
func NewPerpetualMarketCreateEvent(
	id uint32,
	clobPairId uint32,
	ticker string,
	marketId uint32,
	status clobtypes.ClobPair_Status,
	quantumConversionExponent int32,
	atomicResolution int32,
	subticksPerTick uint32,
	stepBaseQuantums uint64,
	liquidityTier uint32,
	dangerIndexPpm uint32,
	collateralPoolId uint32,
) *PerpetualMarketCreateEventV2 {
	return &PerpetualMarketCreateEventV2{
		Id:                        id,
		ClobPairId:                clobPairId,
		Ticker:                    ticker,
		MarketId:                  marketId,
		Status:                    v1.ConvertToClobPairStatus(status),
		QuantumConversionExponent: quantumConversionExponent,
		AtomicResolution:          atomicResolution,
		SubticksPerTick:           subticksPerTick,
		StepBaseQuantums:          stepBaseQuantums,
		LiquidityTier:             liquidityTier,
		DangerIndexPpm:            dangerIndexPpm,
		CollateralPoolId:          collateralPoolId,
	}
}
