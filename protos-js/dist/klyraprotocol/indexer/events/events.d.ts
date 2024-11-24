import { IndexerSubaccountId, IndexerSubaccountIdAmino, IndexerSubaccountIdSDKType, IndexerPerpetualPosition, IndexerPerpetualPositionAmino, IndexerPerpetualPositionSDKType, IndexerAssetPosition, IndexerAssetPositionAmino, IndexerAssetPositionSDKType } from "../protocol/v1/subaccount";
import { IndexerOrder, IndexerOrderAmino, IndexerOrderSDKType, IndexerOrderId, IndexerOrderIdAmino, IndexerOrderIdSDKType, ClobPairStatus } from "../protocol/v1/clob";
import { OrderRemovalReason } from "../shared/removal_reason";
import { PerpetualMarketType } from "../protocol/v1/perpetual";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** Type is the type for funding values. */
export declare enum FundingEventV1_Type {
    /** TYPE_UNSPECIFIED - Unspecified type. */
    TYPE_UNSPECIFIED = 0,
    /**
     * TYPE_PREMIUM_SAMPLE - Premium sample is the combined value from all premium votes during a
     * `funding-sample` epoch.
     */
    TYPE_PREMIUM_SAMPLE = 1,
    /**
     * TYPE_FUNDING_RATE_AND_INDEX - Funding rate is the final funding rate combining all premium samples
     * during a `funding-tick` epoch.
     */
    TYPE_FUNDING_RATE_AND_INDEX = 2,
    /**
     * TYPE_PREMIUM_VOTE - TODO(DEC-1513): Investigate whether premium vote values need to be
     * sent to indexer.
     */
    TYPE_PREMIUM_VOTE = 3,
    UNRECOGNIZED = -1
}
export declare const FundingEventV1_TypeSDKType: typeof FundingEventV1_Type;
export declare const FundingEventV1_TypeAmino: typeof FundingEventV1_Type;
export declare function fundingEventV1_TypeFromJSON(object: any): FundingEventV1_Type;
export declare function fundingEventV1_TypeToJSON(object: FundingEventV1_Type): string;
/**
 * FundingUpdate is used for funding update events and includes a funding
 * value and an optional funding index that correspond to a perpetual market.
 */
export interface FundingUpdateV1 {
    /** The id of the perpetual market. */
    perpetualId: number;
    /**
     * funding value (in parts-per-million) can be premium vote, premium sample,
     * or funding rate.
     */
    fundingValuePpm: number;
    /**
     * funding index is required if and only if parent `FundingEvent` type is
     * `TYPE_FUNDING_RATE_AND_INDEX`.
     */
    fundingIndex: Uint8Array;
}
export interface FundingUpdateV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.FundingUpdateV1";
    value: Uint8Array;
}
/**
 * FundingUpdate is used for funding update events and includes a funding
 * value and an optional funding index that correspond to a perpetual market.
 */
export interface FundingUpdateV1Amino {
    /** The id of the perpetual market. */
    perpetual_id?: number;
    /**
     * funding value (in parts-per-million) can be premium vote, premium sample,
     * or funding rate.
     */
    funding_value_ppm?: number;
    /**
     * funding index is required if and only if parent `FundingEvent` type is
     * `TYPE_FUNDING_RATE_AND_INDEX`.
     */
    funding_index?: string;
}
export interface FundingUpdateV1AminoMsg {
    type: "/klyraprotocol.indexer.events.FundingUpdateV1";
    value: FundingUpdateV1Amino;
}
/**
 * FundingUpdate is used for funding update events and includes a funding
 * value and an optional funding index that correspond to a perpetual market.
 */
export interface FundingUpdateV1SDKType {
    perpetual_id: number;
    funding_value_ppm: number;
    funding_index: Uint8Array;
}
/**
 * FundingEvent message contains a list of per-market funding values. The
 * funding values in the list is of the same type and the types are: which can
 * have one of the following types:
 * 1. Premium vote: votes on the premium values injected by block proposers.
 * 2. Premium sample: combined value from all premium votes during a
 *    `funding-sample` epoch.
 * 3. Funding rate and index: final funding rate combining all premium samples
 *    during a `funding-tick` epoch and funding index accordingly updated with
 *    `funding rate * price`.
 */
export interface FundingEventV1 {
    /**
     * updates is a list of per-market funding updates for all existing perpetual
     * markets. The list is sorted by `perpetualId`s which are unique.
     */
    updates: FundingUpdateV1[];
    /** type stores the type of funding updates. */
    type: FundingEventV1_Type;
}
export interface FundingEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.FundingEventV1";
    value: Uint8Array;
}
/**
 * FundingEvent message contains a list of per-market funding values. The
 * funding values in the list is of the same type and the types are: which can
 * have one of the following types:
 * 1. Premium vote: votes on the premium values injected by block proposers.
 * 2. Premium sample: combined value from all premium votes during a
 *    `funding-sample` epoch.
 * 3. Funding rate and index: final funding rate combining all premium samples
 *    during a `funding-tick` epoch and funding index accordingly updated with
 *    `funding rate * price`.
 */
export interface FundingEventV1Amino {
    /**
     * updates is a list of per-market funding updates for all existing perpetual
     * markets. The list is sorted by `perpetualId`s which are unique.
     */
    updates?: FundingUpdateV1Amino[];
    /** type stores the type of funding updates. */
    type?: FundingEventV1_Type;
}
export interface FundingEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.FundingEventV1";
    value: FundingEventV1Amino;
}
/**
 * FundingEvent message contains a list of per-market funding values. The
 * funding values in the list is of the same type and the types are: which can
 * have one of the following types:
 * 1. Premium vote: votes on the premium values injected by block proposers.
 * 2. Premium sample: combined value from all premium votes during a
 *    `funding-sample` epoch.
 * 3. Funding rate and index: final funding rate combining all premium samples
 *    during a `funding-tick` epoch and funding index accordingly updated with
 *    `funding rate * price`.
 */
export interface FundingEventV1SDKType {
    updates: FundingUpdateV1SDKType[];
    type: FundingEventV1_Type;
}
/**
 * MarketEvent message contains all the information about a market event on
 * the Klyra chain.
 */
export interface MarketEventV1 {
    /** market id. */
    marketId: number;
    priceUpdate?: MarketPriceUpdateEventV1;
    marketCreate?: MarketCreateEventV1;
    marketModify?: MarketModifyEventV1;
}
export interface MarketEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.MarketEventV1";
    value: Uint8Array;
}
/**
 * MarketEvent message contains all the information about a market event on
 * the Klyra chain.
 */
export interface MarketEventV1Amino {
    /** market id. */
    market_id?: number;
    price_update?: MarketPriceUpdateEventV1Amino;
    market_create?: MarketCreateEventV1Amino;
    market_modify?: MarketModifyEventV1Amino;
}
export interface MarketEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.MarketEventV1";
    value: MarketEventV1Amino;
}
/**
 * MarketEvent message contains all the information about a market event on
 * the Klyra chain.
 */
export interface MarketEventV1SDKType {
    market_id: number;
    price_update?: MarketPriceUpdateEventV1SDKType;
    market_create?: MarketCreateEventV1SDKType;
    market_modify?: MarketModifyEventV1SDKType;
}
/**
 * MarketPriceUpdateEvent message contains all the information about a price
 * update on the Klyra chain.
 */
export interface MarketPriceUpdateEventV1 {
    /**
     * price_with_exponent. Multiply by 10 ^ Exponent to get the human readable
     * price in dollars. For example if `Exponent == -5` then a `exponent_price`
     * of `1,000,000,000` represents “$10,000`.
     */
    spotPriceWithExponent: bigint;
    /**
     * pnl_price_with_exponent. Multiply by 10 ^ Exponent to get the human
     * readable price in dollars. For example if `Exponent == -5` then a
     * `exponent_price` of `1,000,000,000` represents “$10,000`.
     */
    pnlPriceWithExponent: bigint;
}
export interface MarketPriceUpdateEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.MarketPriceUpdateEventV1";
    value: Uint8Array;
}
/**
 * MarketPriceUpdateEvent message contains all the information about a price
 * update on the Klyra chain.
 */
export interface MarketPriceUpdateEventV1Amino {
    /**
     * price_with_exponent. Multiply by 10 ^ Exponent to get the human readable
     * price in dollars. For example if `Exponent == -5` then a `exponent_price`
     * of `1,000,000,000` represents “$10,000`.
     */
    spot_price_with_exponent?: string;
    /**
     * pnl_price_with_exponent. Multiply by 10 ^ Exponent to get the human
     * readable price in dollars. For example if `Exponent == -5` then a
     * `exponent_price` of `1,000,000,000` represents “$10,000`.
     */
    pnl_price_with_exponent?: string;
}
export interface MarketPriceUpdateEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.MarketPriceUpdateEventV1";
    value: MarketPriceUpdateEventV1Amino;
}
/**
 * MarketPriceUpdateEvent message contains all the information about a price
 * update on the Klyra chain.
 */
export interface MarketPriceUpdateEventV1SDKType {
    spot_price_with_exponent: bigint;
    pnl_price_with_exponent: bigint;
}
/** shared fields between MarketCreateEvent and MarketModifyEvent */
export interface MarketBaseEventV1 {
    /** String representation of the market pair, e.g. `BTC-USD` */
    pair: string;
    /**
     * The minimum allowable change in the Price value for a given update.
     * Measured as 1e-6.
     */
    minPriceChangePpm: number;
}
export interface MarketBaseEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.MarketBaseEventV1";
    value: Uint8Array;
}
/** shared fields between MarketCreateEvent and MarketModifyEvent */
export interface MarketBaseEventV1Amino {
    /** String representation of the market pair, e.g. `BTC-USD` */
    pair?: string;
    /**
     * The minimum allowable change in the Price value for a given update.
     * Measured as 1e-6.
     */
    min_price_change_ppm?: number;
}
export interface MarketBaseEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.MarketBaseEventV1";
    value: MarketBaseEventV1Amino;
}
/** shared fields between MarketCreateEvent and MarketModifyEvent */
export interface MarketBaseEventV1SDKType {
    pair: string;
    min_price_change_ppm: number;
}
/**
 * MarketCreateEvent message contains all the information about a new market on
 * the Klyra chain.
 */
export interface MarketCreateEventV1 {
    base?: MarketBaseEventV1;
    /**
     * Static value. The exponent of the price.
     * For example if Exponent == -5 then a `exponent_price` of 1,000,000,000
     * represents $10,000. Therefore 10 ^ Exponent represents the smallest
     * price step (in dollars) that can be recorded.
     */
    exponent: number;
}
export interface MarketCreateEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.MarketCreateEventV1";
    value: Uint8Array;
}
/**
 * MarketCreateEvent message contains all the information about a new market on
 * the Klyra chain.
 */
export interface MarketCreateEventV1Amino {
    base?: MarketBaseEventV1Amino;
    /**
     * Static value. The exponent of the price.
     * For example if Exponent == -5 then a `exponent_price` of 1,000,000,000
     * represents $10,000. Therefore 10 ^ Exponent represents the smallest
     * price step (in dollars) that can be recorded.
     */
    exponent?: number;
}
export interface MarketCreateEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.MarketCreateEventV1";
    value: MarketCreateEventV1Amino;
}
/**
 * MarketCreateEvent message contains all the information about a new market on
 * the Klyra chain.
 */
export interface MarketCreateEventV1SDKType {
    base?: MarketBaseEventV1SDKType;
    exponent: number;
}
/**
 * MarketModifyEvent message contains all the information about a market update
 * on the Klyra chain
 */
export interface MarketModifyEventV1 {
    base?: MarketBaseEventV1;
}
export interface MarketModifyEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.MarketModifyEventV1";
    value: Uint8Array;
}
/**
 * MarketModifyEvent message contains all the information about a market update
 * on the Klyra chain
 */
export interface MarketModifyEventV1Amino {
    base?: MarketBaseEventV1Amino;
}
export interface MarketModifyEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.MarketModifyEventV1";
    value: MarketModifyEventV1Amino;
}
/**
 * MarketModifyEvent message contains all the information about a market update
 * on the Klyra chain
 */
export interface MarketModifyEventV1SDKType {
    base?: MarketBaseEventV1SDKType;
}
/** SourceOfFunds is the source of funds in a transfer event. */
export interface SourceOfFunds {
    subaccountId?: IndexerSubaccountId;
    address?: string;
}
export interface SourceOfFundsProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.SourceOfFunds";
    value: Uint8Array;
}
/** SourceOfFunds is the source of funds in a transfer event. */
export interface SourceOfFundsAmino {
    subaccount_id?: IndexerSubaccountIdAmino;
    address?: string;
}
export interface SourceOfFundsAminoMsg {
    type: "/klyraprotocol.indexer.events.SourceOfFunds";
    value: SourceOfFundsAmino;
}
/** SourceOfFunds is the source of funds in a transfer event. */
export interface SourceOfFundsSDKType {
    subaccount_id?: IndexerSubaccountIdSDKType;
    address?: string;
}
/**
 * TransferEvent message contains all the information about a transfer,
 * deposit-to-subaccount, or withdraw-from-subaccount on the Klyra chain.
 * When a subaccount is involved, a SubaccountUpdateEvent message will
 * be produced with the updated asset positions.
 */
export interface TransferEventV1 {
    senderSubaccountId?: IndexerSubaccountId;
    recipientSubaccountId?: IndexerSubaccountId;
    /** Id of the asset transfered. */
    assetId: number;
    /** The amount of asset in quantums to transfer. */
    amount: bigint;
    /**
     * The sender is one of below
     * - a subaccount ID (in transfer and withdraw events).
     * - a wallet address (in deposit events).
     */
    sender?: SourceOfFunds;
    /**
     * The recipient is one of below
     * - a subaccount ID (in transfer and deposit events).
     * - a wallet address (in withdraw events).
     */
    recipient?: SourceOfFunds;
}
export interface TransferEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.TransferEventV1";
    value: Uint8Array;
}
/**
 * TransferEvent message contains all the information about a transfer,
 * deposit-to-subaccount, or withdraw-from-subaccount on the Klyra chain.
 * When a subaccount is involved, a SubaccountUpdateEvent message will
 * be produced with the updated asset positions.
 */
export interface TransferEventV1Amino {
    sender_subaccount_id?: IndexerSubaccountIdAmino;
    recipient_subaccount_id?: IndexerSubaccountIdAmino;
    /** Id of the asset transfered. */
    asset_id?: number;
    /** The amount of asset in quantums to transfer. */
    amount?: string;
    /**
     * The sender is one of below
     * - a subaccount ID (in transfer and withdraw events).
     * - a wallet address (in deposit events).
     */
    sender?: SourceOfFundsAmino;
    /**
     * The recipient is one of below
     * - a subaccount ID (in transfer and deposit events).
     * - a wallet address (in withdraw events).
     */
    recipient?: SourceOfFundsAmino;
}
export interface TransferEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.TransferEventV1";
    value: TransferEventV1Amino;
}
/**
 * TransferEvent message contains all the information about a transfer,
 * deposit-to-subaccount, or withdraw-from-subaccount on the Klyra chain.
 * When a subaccount is involved, a SubaccountUpdateEvent message will
 * be produced with the updated asset positions.
 */
export interface TransferEventV1SDKType {
    sender_subaccount_id?: IndexerSubaccountIdSDKType;
    recipient_subaccount_id?: IndexerSubaccountIdSDKType;
    asset_id: number;
    amount: bigint;
    sender?: SourceOfFundsSDKType;
    recipient?: SourceOfFundsSDKType;
}
/**
 * OrderFillEvent message contains all the information from an order match in
 * the Klyra chain. This includes the maker/taker orders that matched and the
 * amount filled.
 */
export interface OrderFillEventV1 {
    makerOrder: IndexerOrder;
    order?: IndexerOrder;
    liquidationOrder?: LiquidationOrderV1;
    /** Fill amount in base quantums. */
    fillAmount: bigint;
    /** Maker fee in TDAI quantums. */
    makerFee: bigint;
    /**
     * Taker fee in TDAI quantums. If the taker order is a liquidation, then this
     * represents the special liquidation fee, not the standard taker fee.
     */
    takerFee: bigint;
    /** Total filled of the maker order in base quantums. */
    totalFilledMaker: bigint;
    /** Total filled of the taker order in base quantums. */
    totalFilledTaker: bigint;
}
export interface OrderFillEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.OrderFillEventV1";
    value: Uint8Array;
}
/**
 * OrderFillEvent message contains all the information from an order match in
 * the Klyra chain. This includes the maker/taker orders that matched and the
 * amount filled.
 */
export interface OrderFillEventV1Amino {
    maker_order?: IndexerOrderAmino;
    order?: IndexerOrderAmino;
    liquidation_order?: LiquidationOrderV1Amino;
    /** Fill amount in base quantums. */
    fill_amount?: string;
    /** Maker fee in TDAI quantums. */
    maker_fee?: string;
    /**
     * Taker fee in TDAI quantums. If the taker order is a liquidation, then this
     * represents the special liquidation fee, not the standard taker fee.
     */
    taker_fee?: string;
    /** Total filled of the maker order in base quantums. */
    total_filled_maker?: string;
    /** Total filled of the taker order in base quantums. */
    total_filled_taker?: string;
}
export interface OrderFillEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.OrderFillEventV1";
    value: OrderFillEventV1Amino;
}
/**
 * OrderFillEvent message contains all the information from an order match in
 * the Klyra chain. This includes the maker/taker orders that matched and the
 * amount filled.
 */
export interface OrderFillEventV1SDKType {
    maker_order: IndexerOrderSDKType;
    order?: IndexerOrderSDKType;
    liquidation_order?: LiquidationOrderV1SDKType;
    fill_amount: bigint;
    maker_fee: bigint;
    taker_fee: bigint;
    total_filled_maker: bigint;
    total_filled_taker: bigint;
}
/**
 * DeleveragingEvent message contains all the information for a deleveraging
 * on the Klyra chain. This includes the liquidated/offsetting subaccounts and
 * the amount filled.
 */
export interface DeleveragingEventV1 {
    /** ID of the subaccount that was liquidated. */
    liquidated: IndexerSubaccountId;
    /** ID of the subaccount that was used to offset the position. */
    offsetting: IndexerSubaccountId;
    /** The ID of the perpetual that was liquidated. */
    perpetualId: number;
    /**
     * The amount filled between the liquidated and offsetting position, in
     * base quantums.
     */
    fillAmount: bigint;
    /** Total quote quantums filled. */
    totalQuoteQuantums: bigint;
    /** `true` if liquidating a short position, `false` otherwise. */
    isBuy: boolean;
    /**
     * `true` if the deleveraging event is for final settlement, indicating
     * the match occurred at the oracle price rather than bankruptcy price.
     * When this flag is `false`, the fill price is the bankruptcy price
     * of the liquidated subaccount.
     */
    isFinalSettlement: boolean;
}
export interface DeleveragingEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.DeleveragingEventV1";
    value: Uint8Array;
}
/**
 * DeleveragingEvent message contains all the information for a deleveraging
 * on the Klyra chain. This includes the liquidated/offsetting subaccounts and
 * the amount filled.
 */
export interface DeleveragingEventV1Amino {
    /** ID of the subaccount that was liquidated. */
    liquidated?: IndexerSubaccountIdAmino;
    /** ID of the subaccount that was used to offset the position. */
    offsetting?: IndexerSubaccountIdAmino;
    /** The ID of the perpetual that was liquidated. */
    perpetual_id?: number;
    /**
     * The amount filled between the liquidated and offsetting position, in
     * base quantums.
     */
    fill_amount?: string;
    /** Total quote quantums filled. */
    total_quote_quantums?: string;
    /** `true` if liquidating a short position, `false` otherwise. */
    is_buy?: boolean;
    /**
     * `true` if the deleveraging event is for final settlement, indicating
     * the match occurred at the oracle price rather than bankruptcy price.
     * When this flag is `false`, the fill price is the bankruptcy price
     * of the liquidated subaccount.
     */
    is_final_settlement?: boolean;
}
export interface DeleveragingEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.DeleveragingEventV1";
    value: DeleveragingEventV1Amino;
}
/**
 * DeleveragingEvent message contains all the information for a deleveraging
 * on the Klyra chain. This includes the liquidated/offsetting subaccounts and
 * the amount filled.
 */
export interface DeleveragingEventV1SDKType {
    liquidated: IndexerSubaccountIdSDKType;
    offsetting: IndexerSubaccountIdSDKType;
    perpetual_id: number;
    fill_amount: bigint;
    total_quote_quantums: bigint;
    is_buy: boolean;
    is_final_settlement: boolean;
}
/**
 * LiquidationOrder represents the liquidation taker order to be included in a
 * liquidation order fill event.
 */
export interface LiquidationOrderV1 {
    /** ID of the subaccount that was liquidated. */
    liquidated: IndexerSubaccountId;
    /** The ID of the clob pair involved in the liquidation. */
    clobPairId: number;
    /** The ID of the perpetual involved in the liquidation. */
    perpetualId: number;
    /**
     * The total size of the liquidation order including any unfilled size,
     * in base quantums.
     */
    totalSize: bigint;
    /** `true` if liquidating a short position, `false` otherwise. */
    isBuy: boolean;
    /**
     * The fillable price in subticks.
     * This represents the lower-price-bound for liquidating longs
     * and the upper-price-bound for liquidating shorts.
     * Must be a multiple of ClobPair.SubticksPerTick
     * (where `ClobPair.Id = orderId.ClobPairId`).
     */
    subticks: bigint;
}
export interface LiquidationOrderV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.LiquidationOrderV1";
    value: Uint8Array;
}
/**
 * LiquidationOrder represents the liquidation taker order to be included in a
 * liquidation order fill event.
 */
export interface LiquidationOrderV1Amino {
    /** ID of the subaccount that was liquidated. */
    liquidated?: IndexerSubaccountIdAmino;
    /** The ID of the clob pair involved in the liquidation. */
    clob_pair_id?: number;
    /** The ID of the perpetual involved in the liquidation. */
    perpetual_id?: number;
    /**
     * The total size of the liquidation order including any unfilled size,
     * in base quantums.
     */
    total_size?: string;
    /** `true` if liquidating a short position, `false` otherwise. */
    is_buy?: boolean;
    /**
     * The fillable price in subticks.
     * This represents the lower-price-bound for liquidating longs
     * and the upper-price-bound for liquidating shorts.
     * Must be a multiple of ClobPair.SubticksPerTick
     * (where `ClobPair.Id = orderId.ClobPairId`).
     */
    subticks?: string;
}
export interface LiquidationOrderV1AminoMsg {
    type: "/klyraprotocol.indexer.events.LiquidationOrderV1";
    value: LiquidationOrderV1Amino;
}
/**
 * LiquidationOrder represents the liquidation taker order to be included in a
 * liquidation order fill event.
 */
export interface LiquidationOrderV1SDKType {
    liquidated: IndexerSubaccountIdSDKType;
    clob_pair_id: number;
    perpetual_id: number;
    total_size: bigint;
    is_buy: boolean;
    subticks: bigint;
}
/**
 * SubaccountUpdateEvent message contains information about an update to a
 * subaccount in the Klyra chain. This includes the list of updated perpetual
 * and asset positions for the subaccount.
 * Note: This event message will contain all the updates to a subaccount
 * at the end of a block which is why multiple asset/perpetual position
 * updates may exist.
 */
export interface SubaccountUpdateEventV1 {
    subaccountId?: IndexerSubaccountId;
    updatedPerpetualPositions: IndexerPerpetualPosition[];
    updatedAssetPositions: IndexerAssetPosition[];
    yieldIndex: string;
}
export interface SubaccountUpdateEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.SubaccountUpdateEventV1";
    value: Uint8Array;
}
/**
 * SubaccountUpdateEvent message contains information about an update to a
 * subaccount in the Klyra chain. This includes the list of updated perpetual
 * and asset positions for the subaccount.
 * Note: This event message will contain all the updates to a subaccount
 * at the end of a block which is why multiple asset/perpetual position
 * updates may exist.
 */
export interface SubaccountUpdateEventV1Amino {
    subaccount_id?: IndexerSubaccountIdAmino;
    updated_perpetual_positions?: IndexerPerpetualPositionAmino[];
    updated_asset_positions?: IndexerAssetPositionAmino[];
    yield_index?: string;
}
export interface SubaccountUpdateEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.SubaccountUpdateEventV1";
    value: SubaccountUpdateEventV1Amino;
}
/**
 * SubaccountUpdateEvent message contains information about an update to a
 * subaccount in the Klyra chain. This includes the list of updated perpetual
 * and asset positions for the subaccount.
 * Note: This event message will contain all the updates to a subaccount
 * at the end of a block which is why multiple asset/perpetual position
 * updates may exist.
 */
export interface SubaccountUpdateEventV1SDKType {
    subaccount_id?: IndexerSubaccountIdSDKType;
    updated_perpetual_positions: IndexerPerpetualPositionSDKType[];
    updated_asset_positions: IndexerAssetPositionSDKType[];
    yield_index: string;
}
/**
 * StatefulOrderEvent message contains information about a change to a stateful
 * order. Currently, this is either the placement of a long-term order, the
 * placement or triggering of a conditional order, or the removal of a
 * stateful order.
 */
export interface StatefulOrderEventV1 {
    orderPlace?: StatefulOrderEventV1_StatefulOrderPlacementV1;
    orderRemoval?: StatefulOrderEventV1_StatefulOrderRemovalV1;
    conditionalOrderPlacement?: StatefulOrderEventV1_ConditionalOrderPlacementV1;
    conditionalOrderTriggered?: StatefulOrderEventV1_ConditionalOrderTriggeredV1;
    longTermOrderPlacement?: StatefulOrderEventV1_LongTermOrderPlacementV1;
}
export interface StatefulOrderEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.StatefulOrderEventV1";
    value: Uint8Array;
}
/**
 * StatefulOrderEvent message contains information about a change to a stateful
 * order. Currently, this is either the placement of a long-term order, the
 * placement or triggering of a conditional order, or the removal of a
 * stateful order.
 */
export interface StatefulOrderEventV1Amino {
    order_place?: StatefulOrderEventV1_StatefulOrderPlacementV1Amino;
    order_removal?: StatefulOrderEventV1_StatefulOrderRemovalV1Amino;
    conditional_order_placement?: StatefulOrderEventV1_ConditionalOrderPlacementV1Amino;
    conditional_order_triggered?: StatefulOrderEventV1_ConditionalOrderTriggeredV1Amino;
    long_term_order_placement?: StatefulOrderEventV1_LongTermOrderPlacementV1Amino;
}
export interface StatefulOrderEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.StatefulOrderEventV1";
    value: StatefulOrderEventV1Amino;
}
/**
 * StatefulOrderEvent message contains information about a change to a stateful
 * order. Currently, this is either the placement of a long-term order, the
 * placement or triggering of a conditional order, or the removal of a
 * stateful order.
 */
export interface StatefulOrderEventV1SDKType {
    order_place?: StatefulOrderEventV1_StatefulOrderPlacementV1SDKType;
    order_removal?: StatefulOrderEventV1_StatefulOrderRemovalV1SDKType;
    conditional_order_placement?: StatefulOrderEventV1_ConditionalOrderPlacementV1SDKType;
    conditional_order_triggered?: StatefulOrderEventV1_ConditionalOrderTriggeredV1SDKType;
    long_term_order_placement?: StatefulOrderEventV1_LongTermOrderPlacementV1SDKType;
}
/** A stateful order placement contains an order. */
export interface StatefulOrderEventV1_StatefulOrderPlacementV1 {
    order?: IndexerOrder;
}
export interface StatefulOrderEventV1_StatefulOrderPlacementV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.StatefulOrderPlacementV1";
    value: Uint8Array;
}
/** A stateful order placement contains an order. */
export interface StatefulOrderEventV1_StatefulOrderPlacementV1Amino {
    order?: IndexerOrderAmino;
}
export interface StatefulOrderEventV1_StatefulOrderPlacementV1AminoMsg {
    type: "/klyraprotocol.indexer.events.StatefulOrderPlacementV1";
    value: StatefulOrderEventV1_StatefulOrderPlacementV1Amino;
}
/** A stateful order placement contains an order. */
export interface StatefulOrderEventV1_StatefulOrderPlacementV1SDKType {
    order?: IndexerOrderSDKType;
}
/**
 * A stateful order removal contains the id of an order that was already
 * placed and is now removed and the reason for the removal.
 */
export interface StatefulOrderEventV1_StatefulOrderRemovalV1 {
    removedOrderId?: IndexerOrderId;
    reason: OrderRemovalReason;
}
export interface StatefulOrderEventV1_StatefulOrderRemovalV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.StatefulOrderRemovalV1";
    value: Uint8Array;
}
/**
 * A stateful order removal contains the id of an order that was already
 * placed and is now removed and the reason for the removal.
 */
export interface StatefulOrderEventV1_StatefulOrderRemovalV1Amino {
    removed_order_id?: IndexerOrderIdAmino;
    reason?: OrderRemovalReason;
}
export interface StatefulOrderEventV1_StatefulOrderRemovalV1AminoMsg {
    type: "/klyraprotocol.indexer.events.StatefulOrderRemovalV1";
    value: StatefulOrderEventV1_StatefulOrderRemovalV1Amino;
}
/**
 * A stateful order removal contains the id of an order that was already
 * placed and is now removed and the reason for the removal.
 */
export interface StatefulOrderEventV1_StatefulOrderRemovalV1SDKType {
    removed_order_id?: IndexerOrderIdSDKType;
    reason: OrderRemovalReason;
}
/**
 * A conditional order placement contains an order. The order is newly-placed
 * and untriggered when this event is emitted.
 */
export interface StatefulOrderEventV1_ConditionalOrderPlacementV1 {
    order?: IndexerOrder;
}
export interface StatefulOrderEventV1_ConditionalOrderPlacementV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.ConditionalOrderPlacementV1";
    value: Uint8Array;
}
/**
 * A conditional order placement contains an order. The order is newly-placed
 * and untriggered when this event is emitted.
 */
export interface StatefulOrderEventV1_ConditionalOrderPlacementV1Amino {
    order?: IndexerOrderAmino;
}
export interface StatefulOrderEventV1_ConditionalOrderPlacementV1AminoMsg {
    type: "/klyraprotocol.indexer.events.ConditionalOrderPlacementV1";
    value: StatefulOrderEventV1_ConditionalOrderPlacementV1Amino;
}
/**
 * A conditional order placement contains an order. The order is newly-placed
 * and untriggered when this event is emitted.
 */
export interface StatefulOrderEventV1_ConditionalOrderPlacementV1SDKType {
    order?: IndexerOrderSDKType;
}
/**
 * A conditional order trigger event contains an order id and is emitted when
 * an order is triggered.
 */
export interface StatefulOrderEventV1_ConditionalOrderTriggeredV1 {
    triggeredOrderId?: IndexerOrderId;
}
export interface StatefulOrderEventV1_ConditionalOrderTriggeredV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.ConditionalOrderTriggeredV1";
    value: Uint8Array;
}
/**
 * A conditional order trigger event contains an order id and is emitted when
 * an order is triggered.
 */
export interface StatefulOrderEventV1_ConditionalOrderTriggeredV1Amino {
    triggered_order_id?: IndexerOrderIdAmino;
}
export interface StatefulOrderEventV1_ConditionalOrderTriggeredV1AminoMsg {
    type: "/klyraprotocol.indexer.events.ConditionalOrderTriggeredV1";
    value: StatefulOrderEventV1_ConditionalOrderTriggeredV1Amino;
}
/**
 * A conditional order trigger event contains an order id and is emitted when
 * an order is triggered.
 */
export interface StatefulOrderEventV1_ConditionalOrderTriggeredV1SDKType {
    triggered_order_id?: IndexerOrderIdSDKType;
}
/** A long term order placement contains an order. */
export interface StatefulOrderEventV1_LongTermOrderPlacementV1 {
    order?: IndexerOrder;
}
export interface StatefulOrderEventV1_LongTermOrderPlacementV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.LongTermOrderPlacementV1";
    value: Uint8Array;
}
/** A long term order placement contains an order. */
export interface StatefulOrderEventV1_LongTermOrderPlacementV1Amino {
    order?: IndexerOrderAmino;
}
export interface StatefulOrderEventV1_LongTermOrderPlacementV1AminoMsg {
    type: "/klyraprotocol.indexer.events.LongTermOrderPlacementV1";
    value: StatefulOrderEventV1_LongTermOrderPlacementV1Amino;
}
/** A long term order placement contains an order. */
export interface StatefulOrderEventV1_LongTermOrderPlacementV1SDKType {
    order?: IndexerOrderSDKType;
}
/**
 * AssetCreateEventV1 message contains all the information about an new Asset on
 * the Klyra chain.
 */
export interface AssetCreateEventV1 {
    /** Unique, sequentially-generated. */
    id: number;
    /**
     * The human readable symbol of the `Asset` (e.g. `TDAI`, `ATOM`).
     * Must be uppercase, unique and correspond to the canonical symbol of the
     * full coin.
     */
    symbol: string;
    /** `true` if this `Asset` has a valid `MarketId` value. */
    hasMarket: boolean;
    /**
     * The `Id` of the `Market` associated with this `Asset`. It acts as the
     * oracle price for the purposes of calculating collateral
     * and margin requirements.
     */
    marketId: number;
    /**
     * The exponent for converting an atomic amount (1 'quantum')
     * to a full coin. For example, if `atomic_resolution = -8`
     * then an `asset_position` with `base_quantums = 1e8` is equivalent to
     * a position size of one full coin.
     */
    atomicResolution: number;
}
export interface AssetCreateEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.AssetCreateEventV1";
    value: Uint8Array;
}
/**
 * AssetCreateEventV1 message contains all the information about an new Asset on
 * the Klyra chain.
 */
export interface AssetCreateEventV1Amino {
    /** Unique, sequentially-generated. */
    id?: number;
    /**
     * The human readable symbol of the `Asset` (e.g. `TDAI`, `ATOM`).
     * Must be uppercase, unique and correspond to the canonical symbol of the
     * full coin.
     */
    symbol?: string;
    /** `true` if this `Asset` has a valid `MarketId` value. */
    has_market?: boolean;
    /**
     * The `Id` of the `Market` associated with this `Asset`. It acts as the
     * oracle price for the purposes of calculating collateral
     * and margin requirements.
     */
    market_id?: number;
    /**
     * The exponent for converting an atomic amount (1 'quantum')
     * to a full coin. For example, if `atomic_resolution = -8`
     * then an `asset_position` with `base_quantums = 1e8` is equivalent to
     * a position size of one full coin.
     */
    atomic_resolution?: number;
}
export interface AssetCreateEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.AssetCreateEventV1";
    value: AssetCreateEventV1Amino;
}
/**
 * AssetCreateEventV1 message contains all the information about an new Asset on
 * the Klyra chain.
 */
export interface AssetCreateEventV1SDKType {
    id: number;
    symbol: string;
    has_market: boolean;
    market_id: number;
    atomic_resolution: number;
}
/**
 * Deprecated. See PerpetualMarketCreateEventV2 for the most up to date message
 * for the event to create a new Perpetual Market.
 */
/** @deprecated */
export interface PerpetualMarketCreateEventV1 {
    /**
     * Unique Perpetual id.
     * Defined in perpetuals.perpetual
     */
    id: number;
    /**
     * Unique clob pair Id associated with this perpetual market
     * Defined in clob.clob_pair
     */
    clobPairId: number;
    /**
     * The name of the `Perpetual` (e.g. `BTC-USD`).
     * Defined in perpetuals.perpetual
     */
    ticker: string;
    /**
     * Unique id of market param associated with this perpetual market.
     * Defined in perpetuals.perpetual
     */
    marketId: number;
    /** Status of the CLOB */
    status: ClobPairStatus;
    /**
     * `10^Exponent` gives the number of QuoteQuantums traded per BaseQuantum
     * per Subtick.
     * Defined in clob.clob_pair
     */
    quantumConversionExponent: number;
    /**
     * The exponent for converting an atomic amount (`size = 1`)
     * to a full coin. For example, if `AtomicResolution = -8`
     * then a `PerpetualPosition` with `size = 1e8` is equivalent to
     * a position size of one full coin.
     * Defined in perpetuals.perpetual
     */
    atomicResolution: number;
    /**
     * Defines the tick size of the orderbook by defining how many subticks
     * are in one tick. That is, the subticks of any valid order must be a
     * multiple of this value. Generally this value should start `>= 100`to
     * allow room for decreasing it.
     * Defined in clob.clob_pair
     */
    subticksPerTick: number;
    /**
     * Minimum increment in the size of orders on the CLOB, in base quantums.
     * Defined in clob.clob_pair
     */
    stepBaseQuantums: bigint;
    /**
     * The liquidity_tier that this perpetual is associated with.
     * Defined in perpetuals.perpetual
     */
    liquidityTier: number;
}
export interface PerpetualMarketCreateEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.PerpetualMarketCreateEventV1";
    value: Uint8Array;
}
/**
 * Deprecated. See PerpetualMarketCreateEventV2 for the most up to date message
 * for the event to create a new Perpetual Market.
 */
/** @deprecated */
export interface PerpetualMarketCreateEventV1Amino {
    /**
     * Unique Perpetual id.
     * Defined in perpetuals.perpetual
     */
    id?: number;
    /**
     * Unique clob pair Id associated with this perpetual market
     * Defined in clob.clob_pair
     */
    clob_pair_id?: number;
    /**
     * The name of the `Perpetual` (e.g. `BTC-USD`).
     * Defined in perpetuals.perpetual
     */
    ticker?: string;
    /**
     * Unique id of market param associated with this perpetual market.
     * Defined in perpetuals.perpetual
     */
    market_id?: number;
    /** Status of the CLOB */
    status?: ClobPairStatus;
    /**
     * `10^Exponent` gives the number of QuoteQuantums traded per BaseQuantum
     * per Subtick.
     * Defined in clob.clob_pair
     */
    quantum_conversion_exponent?: number;
    /**
     * The exponent for converting an atomic amount (`size = 1`)
     * to a full coin. For example, if `AtomicResolution = -8`
     * then a `PerpetualPosition` with `size = 1e8` is equivalent to
     * a position size of one full coin.
     * Defined in perpetuals.perpetual
     */
    atomic_resolution?: number;
    /**
     * Defines the tick size of the orderbook by defining how many subticks
     * are in one tick. That is, the subticks of any valid order must be a
     * multiple of this value. Generally this value should start `>= 100`to
     * allow room for decreasing it.
     * Defined in clob.clob_pair
     */
    subticks_per_tick?: number;
    /**
     * Minimum increment in the size of orders on the CLOB, in base quantums.
     * Defined in clob.clob_pair
     */
    step_base_quantums?: string;
    /**
     * The liquidity_tier that this perpetual is associated with.
     * Defined in perpetuals.perpetual
     */
    liquidity_tier?: number;
}
export interface PerpetualMarketCreateEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.PerpetualMarketCreateEventV1";
    value: PerpetualMarketCreateEventV1Amino;
}
/**
 * Deprecated. See PerpetualMarketCreateEventV2 for the most up to date message
 * for the event to create a new Perpetual Market.
 */
/** @deprecated */
export interface PerpetualMarketCreateEventV1SDKType {
    id: number;
    clob_pair_id: number;
    ticker: string;
    market_id: number;
    status: ClobPairStatus;
    quantum_conversion_exponent: number;
    atomic_resolution: number;
    subticks_per_tick: number;
    step_base_quantums: bigint;
    liquidity_tier: number;
}
/**
 * PerpetualMarketCreateEventV2 message contains all the information about a
 * new Perpetual Market on the Klyra chain.
 */
export interface PerpetualMarketCreateEventV2 {
    /**
     * Unique Perpetual id.
     * Defined in perpetuals.perpetual
     */
    id: number;
    /**
     * Unique clob pair Id associated with this perpetual market
     * Defined in clob.clob_pair
     */
    clobPairId: number;
    /**
     * The name of the `Perpetual` (e.g. `BTC-USD`).
     * Defined in perpetuals.perpetual
     */
    ticker: string;
    /**
     * Unique id of market param associated with this perpetual market.
     * Defined in perpetuals.perpetual
     */
    marketId: number;
    /** Status of the CLOB */
    status: ClobPairStatus;
    /**
     * `10^Exponent` gives the number of QuoteQuantums traded per BaseQuantum
     * per Subtick.
     * Defined in clob.clob_pair
     */
    quantumConversionExponent: number;
    /**
     * The exponent for converting an atomic amount (`size = 1`)
     * to a full coin. For example, if `AtomicResolution = -8`
     * then a `PerpetualPosition` with `size = 1e8` is equivalent to
     * a position size of one full coin.
     * Defined in perpetuals.perpetual
     */
    atomicResolution: number;
    /**
     * Defines the tick size of the orderbook by defining how many subticks
     * are in one tick. That is, the subticks of any valid order must be a
     * multiple of this value. Generally this value should start `>= 100`to
     * allow room for decreasing it.
     * Defined in clob.clob_pair
     */
    subticksPerTick: number;
    /**
     * Minimum increment in the size of orders on the CLOB, in base quantums.
     * Defined in clob.clob_pair
     */
    stepBaseQuantums: bigint;
    /**
     * The liquidity_tier that this perpetual is associated with.
     * Defined in perpetuals.perpetual
     */
    liquidityTier: number;
    /** Market type of the perpetual. */
    marketType: PerpetualMarketType;
    /**
     * The danger index is used to prioritze certain accounts and positions in
     * liquidations
     */
    dangerIndexPpm: number;
    /** The maximum cumulative insurance fund delta per block for isolated markets. */
    isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock: string;
}
export interface PerpetualMarketCreateEventV2ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.PerpetualMarketCreateEventV2";
    value: Uint8Array;
}
/**
 * PerpetualMarketCreateEventV2 message contains all the information about a
 * new Perpetual Market on the Klyra chain.
 */
export interface PerpetualMarketCreateEventV2Amino {
    /**
     * Unique Perpetual id.
     * Defined in perpetuals.perpetual
     */
    id?: number;
    /**
     * Unique clob pair Id associated with this perpetual market
     * Defined in clob.clob_pair
     */
    clob_pair_id?: number;
    /**
     * The name of the `Perpetual` (e.g. `BTC-USD`).
     * Defined in perpetuals.perpetual
     */
    ticker?: string;
    /**
     * Unique id of market param associated with this perpetual market.
     * Defined in perpetuals.perpetual
     */
    market_id?: number;
    /** Status of the CLOB */
    status?: ClobPairStatus;
    /**
     * `10^Exponent` gives the number of QuoteQuantums traded per BaseQuantum
     * per Subtick.
     * Defined in clob.clob_pair
     */
    quantum_conversion_exponent?: number;
    /**
     * The exponent for converting an atomic amount (`size = 1`)
     * to a full coin. For example, if `AtomicResolution = -8`
     * then a `PerpetualPosition` with `size = 1e8` is equivalent to
     * a position size of one full coin.
     * Defined in perpetuals.perpetual
     */
    atomic_resolution?: number;
    /**
     * Defines the tick size of the orderbook by defining how many subticks
     * are in one tick. That is, the subticks of any valid order must be a
     * multiple of this value. Generally this value should start `>= 100`to
     * allow room for decreasing it.
     * Defined in clob.clob_pair
     */
    subticks_per_tick?: number;
    /**
     * Minimum increment in the size of orders on the CLOB, in base quantums.
     * Defined in clob.clob_pair
     */
    step_base_quantums?: string;
    /**
     * The liquidity_tier that this perpetual is associated with.
     * Defined in perpetuals.perpetual
     */
    liquidity_tier?: number;
    /** Market type of the perpetual. */
    market_type?: PerpetualMarketType;
    /**
     * The danger index is used to prioritze certain accounts and positions in
     * liquidations
     */
    danger_index_ppm?: number;
    /** The maximum cumulative insurance fund delta per block for isolated markets. */
    isolated_market_max_cumulative_insurance_fund_delta_per_block?: string;
}
export interface PerpetualMarketCreateEventV2AminoMsg {
    type: "/klyraprotocol.indexer.events.PerpetualMarketCreateEventV2";
    value: PerpetualMarketCreateEventV2Amino;
}
/**
 * PerpetualMarketCreateEventV2 message contains all the information about a
 * new Perpetual Market on the Klyra chain.
 */
export interface PerpetualMarketCreateEventV2SDKType {
    id: number;
    clob_pair_id: number;
    ticker: string;
    market_id: number;
    status: ClobPairStatus;
    quantum_conversion_exponent: number;
    atomic_resolution: number;
    subticks_per_tick: number;
    step_base_quantums: bigint;
    liquidity_tier: number;
    market_type: PerpetualMarketType;
    danger_index_ppm: number;
    isolated_market_max_cumulative_insurance_fund_delta_per_block: string;
}
/**
 * LiquidityTierUpsertEventV1 message contains all the information to
 * create/update a Liquidity Tier on the Klyra chain.
 */
export interface LiquidityTierUpsertEventV1 {
    /** Unique id. */
    id: number;
    /** The name of the tier purely for mnemonic purposes, e.g. "Gold". */
    name: string;
    /**
     * The margin fraction needed to open a position.
     * In parts-per-million.
     */
    initialMarginPpm: number;
    /**
     * The fraction of the initial-margin that the maintenance-margin is,
     * e.g. 50%. In parts-per-million.
     */
    maintenanceFractionPpm: number;
    /**
     * The maximum position size at which the margin requirements are
     * not increased over the default values. Above this position size,
     * the margin requirements increase at a rate of sqrt(size).
     *
     * Deprecated since v3.x.
     */
    /** @deprecated */
    basePositionNotional: bigint;
}
export interface LiquidityTierUpsertEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.LiquidityTierUpsertEventV1";
    value: Uint8Array;
}
/**
 * LiquidityTierUpsertEventV1 message contains all the information to
 * create/update a Liquidity Tier on the Klyra chain.
 */
export interface LiquidityTierUpsertEventV1Amino {
    /** Unique id. */
    id?: number;
    /** The name of the tier purely for mnemonic purposes, e.g. "Gold". */
    name?: string;
    /**
     * The margin fraction needed to open a position.
     * In parts-per-million.
     */
    initial_margin_ppm?: number;
    /**
     * The fraction of the initial-margin that the maintenance-margin is,
     * e.g. 50%. In parts-per-million.
     */
    maintenance_fraction_ppm?: number;
    /**
     * The maximum position size at which the margin requirements are
     * not increased over the default values. Above this position size,
     * the margin requirements increase at a rate of sqrt(size).
     *
     * Deprecated since v3.x.
     */
    /** @deprecated */
    base_position_notional?: string;
}
export interface LiquidityTierUpsertEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.LiquidityTierUpsertEventV1";
    value: LiquidityTierUpsertEventV1Amino;
}
/**
 * LiquidityTierUpsertEventV1 message contains all the information to
 * create/update a Liquidity Tier on the Klyra chain.
 */
export interface LiquidityTierUpsertEventV1SDKType {
    id: number;
    name: string;
    initial_margin_ppm: number;
    maintenance_fraction_ppm: number;
    /** @deprecated */
    base_position_notional: bigint;
}
/** OpenInterestUpdateEventV1 is used for open interest update events */
export interface OpenInterestUpdateEventV1 {
    /** The list of all open interest updates in the block. */
    openInterestUpdates: OpenInterestUpdate[];
}
export interface OpenInterestUpdateEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.OpenInterestUpdateEventV1";
    value: Uint8Array;
}
/** OpenInterestUpdateEventV1 is used for open interest update events */
export interface OpenInterestUpdateEventV1Amino {
    /** The list of all open interest updates in the block. */
    open_interest_updates?: OpenInterestUpdateAmino[];
}
export interface OpenInterestUpdateEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.OpenInterestUpdateEventV1";
    value: OpenInterestUpdateEventV1Amino;
}
/** OpenInterestUpdateEventV1 is used for open interest update events */
export interface OpenInterestUpdateEventV1SDKType {
    open_interest_updates: OpenInterestUpdateSDKType[];
}
/** OpenInterestUpdate contains a single open interest update for a perpetual */
export interface OpenInterestUpdate {
    /** The ID of the perpetual market. */
    perpetualId: number;
    /** The new open interest value for the perpetual market. */
    openInterest: Uint8Array;
}
export interface OpenInterestUpdateProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.OpenInterestUpdate";
    value: Uint8Array;
}
/** OpenInterestUpdate contains a single open interest update for a perpetual */
export interface OpenInterestUpdateAmino {
    /** The ID of the perpetual market. */
    perpetual_id?: number;
    /** The new open interest value for the perpetual market. */
    open_interest?: string;
}
export interface OpenInterestUpdateAminoMsg {
    type: "/klyraprotocol.indexer.events.OpenInterestUpdate";
    value: OpenInterestUpdateAmino;
}
/** OpenInterestUpdate contains a single open interest update for a perpetual */
export interface OpenInterestUpdateSDKType {
    perpetual_id: number;
    open_interest: Uint8Array;
}
/**
 * LiquidationEventV2 message contains all the information needed to update
 * the liquidity tiers. It contains all the fields from V1 along with the
 * open interest caps.
 */
export interface LiquidityTierUpsertEventV2 {
    /** Unique id. */
    id: number;
    /** The name of the tier purely for mnemonic purposes, e.g. "Gold". */
    name: string;
    /**
     * The margin fraction needed to open a position.
     * In parts-per-million.
     */
    initialMarginPpm: number;
    /**
     * The fraction of the initial-margin that the maintenance-margin is,
     * e.g. 50%. In parts-per-million.
     */
    maintenanceFractionPpm: number;
    /**
     * The maximum position size at which the margin requirements are
     * not increased over the default values. Above this position size,
     * the margin requirements increase at a rate of sqrt(size).
     *
     * Deprecated since v3.x.
     */
    /** @deprecated */
    basePositionNotional: bigint;
    /** Lower cap of open interest in quote quantums. optional */
    openInterestLowerCap: bigint;
    /** Upper cap of open interest in quote quantums. */
    openInterestUpperCap: bigint;
}
export interface LiquidityTierUpsertEventV2ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.LiquidityTierUpsertEventV2";
    value: Uint8Array;
}
/**
 * LiquidationEventV2 message contains all the information needed to update
 * the liquidity tiers. It contains all the fields from V1 along with the
 * open interest caps.
 */
export interface LiquidityTierUpsertEventV2Amino {
    /** Unique id. */
    id?: number;
    /** The name of the tier purely for mnemonic purposes, e.g. "Gold". */
    name?: string;
    /**
     * The margin fraction needed to open a position.
     * In parts-per-million.
     */
    initial_margin_ppm?: number;
    /**
     * The fraction of the initial-margin that the maintenance-margin is,
     * e.g. 50%. In parts-per-million.
     */
    maintenance_fraction_ppm?: number;
    /**
     * The maximum position size at which the margin requirements are
     * not increased over the default values. Above this position size,
     * the margin requirements increase at a rate of sqrt(size).
     *
     * Deprecated since v3.x.
     */
    /** @deprecated */
    base_position_notional?: string;
    /** Lower cap of open interest in quote quantums. optional */
    open_interest_lower_cap?: string;
    /** Upper cap of open interest in quote quantums. */
    open_interest_upper_cap?: string;
}
export interface LiquidityTierUpsertEventV2AminoMsg {
    type: "/klyraprotocol.indexer.events.LiquidityTierUpsertEventV2";
    value: LiquidityTierUpsertEventV2Amino;
}
/**
 * LiquidationEventV2 message contains all the information needed to update
 * the liquidity tiers. It contains all the fields from V1 along with the
 * open interest caps.
 */
export interface LiquidityTierUpsertEventV2SDKType {
    id: number;
    name: string;
    initial_margin_ppm: number;
    maintenance_fraction_ppm: number;
    /** @deprecated */
    base_position_notional: bigint;
    open_interest_lower_cap: bigint;
    open_interest_upper_cap: bigint;
}
/**
 * UpdateClobPairEventV1 message contains all the information about an update to
 * a clob pair on the Klyra chain.
 */
export interface UpdateClobPairEventV1 {
    /**
     * Unique clob pair Id associated with this perpetual market
     * Defined in clob.clob_pair
     */
    clobPairId: number;
    /** Status of the CLOB */
    status: ClobPairStatus;
    /**
     * `10^Exponent` gives the number of QuoteQuantums traded per BaseQuantum
     * per Subtick.
     * Defined in clob.clob_pair
     */
    quantumConversionExponent: number;
    /**
     * Defines the tick size of the orderbook by defining how many subticks
     * are in one tick. That is, the subticks of any valid order must be a
     * multiple of this value. Generally this value should start `>= 100`to
     * allow room for decreasing it.
     * Defined in clob.clob_pair
     */
    subticksPerTick: number;
    /**
     * Minimum increment in the size of orders on the CLOB, in base quantums.
     * Defined in clob.clob_pair
     */
    stepBaseQuantums: bigint;
}
export interface UpdateClobPairEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.UpdateClobPairEventV1";
    value: Uint8Array;
}
/**
 * UpdateClobPairEventV1 message contains all the information about an update to
 * a clob pair on the Klyra chain.
 */
export interface UpdateClobPairEventV1Amino {
    /**
     * Unique clob pair Id associated with this perpetual market
     * Defined in clob.clob_pair
     */
    clob_pair_id?: number;
    /** Status of the CLOB */
    status?: ClobPairStatus;
    /**
     * `10^Exponent` gives the number of QuoteQuantums traded per BaseQuantum
     * per Subtick.
     * Defined in clob.clob_pair
     */
    quantum_conversion_exponent?: number;
    /**
     * Defines the tick size of the orderbook by defining how many subticks
     * are in one tick. That is, the subticks of any valid order must be a
     * multiple of this value. Generally this value should start `>= 100`to
     * allow room for decreasing it.
     * Defined in clob.clob_pair
     */
    subticks_per_tick?: number;
    /**
     * Minimum increment in the size of orders on the CLOB, in base quantums.
     * Defined in clob.clob_pair
     */
    step_base_quantums?: string;
}
export interface UpdateClobPairEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.UpdateClobPairEventV1";
    value: UpdateClobPairEventV1Amino;
}
/**
 * UpdateClobPairEventV1 message contains all the information about an update to
 * a clob pair on the Klyra chain.
 */
export interface UpdateClobPairEventV1SDKType {
    clob_pair_id: number;
    status: ClobPairStatus;
    quantum_conversion_exponent: number;
    subticks_per_tick: number;
    step_base_quantums: bigint;
}
/**
 * UpdatePerpetualEventV1 message contains all the information about an update
 * to a perpetual on the Klyra chain.
 */
export interface UpdatePerpetualEventV1 {
    /**
     * Unique Perpetual id.
     * Defined in perpetuals.perpetual
     */
    id: number;
    /**
     * The name of the `Perpetual` (e.g. `BTC-USD`).
     * Defined in perpetuals.perpetual
     */
    ticker: string;
    /**
     * Unique id of market param associated with this perpetual market.
     * Defined in perpetuals.perpetual
     */
    marketId: number;
    /**
     * The exponent for converting an atomic amount (`size = 1`)
     * to a full coin. For example, if `AtomicResolution = -8`
     * then a `PerpetualPosition` with `size = 1e8` is equivalent to
     * a position size of one full coin.
     * Defined in perpetuals.perpetual
     */
    atomicResolution: number;
    /**
     * The liquidity_tier that this perpetual is associated with.
     * Defined in perpetuals.perpetual
     */
    liquidityTier: number;
    /**
     * The danger index is used to prioritze certain accounts and positions in
     * liquidations
     */
    dangerIndexPpm: number;
    /** The maximum cumulative insurance fund delta per block for isolated markets. */
    isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock: string;
    /** The perp yield index of this perpetual market */
    perpYieldIndex: string;
}
export interface UpdatePerpetualEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.UpdatePerpetualEventV1";
    value: Uint8Array;
}
/**
 * UpdatePerpetualEventV1 message contains all the information about an update
 * to a perpetual on the Klyra chain.
 */
export interface UpdatePerpetualEventV1Amino {
    /**
     * Unique Perpetual id.
     * Defined in perpetuals.perpetual
     */
    id?: number;
    /**
     * The name of the `Perpetual` (e.g. `BTC-USD`).
     * Defined in perpetuals.perpetual
     */
    ticker?: string;
    /**
     * Unique id of market param associated with this perpetual market.
     * Defined in perpetuals.perpetual
     */
    market_id?: number;
    /**
     * The exponent for converting an atomic amount (`size = 1`)
     * to a full coin. For example, if `AtomicResolution = -8`
     * then a `PerpetualPosition` with `size = 1e8` is equivalent to
     * a position size of one full coin.
     * Defined in perpetuals.perpetual
     */
    atomic_resolution?: number;
    /**
     * The liquidity_tier that this perpetual is associated with.
     * Defined in perpetuals.perpetual
     */
    liquidity_tier?: number;
    /**
     * The danger index is used to prioritze certain accounts and positions in
     * liquidations
     */
    danger_index_ppm?: number;
    /** The maximum cumulative insurance fund delta per block for isolated markets. */
    isolated_market_max_cumulative_insurance_fund_delta_per_block?: string;
    /** The perp yield index of this perpetual market */
    perp_yield_index?: string;
}
export interface UpdatePerpetualEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.UpdatePerpetualEventV1";
    value: UpdatePerpetualEventV1Amino;
}
/**
 * UpdatePerpetualEventV1 message contains all the information about an update
 * to a perpetual on the Klyra chain.
 */
export interface UpdatePerpetualEventV1SDKType {
    id: number;
    ticker: string;
    market_id: number;
    atomic_resolution: number;
    liquidity_tier: number;
    danger_index_ppm: number;
    isolated_market_max_cumulative_insurance_fund_delta_per_block: string;
    perp_yield_index: string;
}
/**
 * UpdateYieldParamsV1 message contains all the information about an update
 * to the yield params on the Stream Chain.
 */
export interface UpdateYieldParamsEventV1 {
    /** The current price of sDAI in tDAI as seen by the protocol */
    sdaiPrice: string;
    /** The current generalized asset yield index in the protocol. */
    assetYieldIndex: string;
}
export interface UpdateYieldParamsEventV1ProtoMsg {
    typeUrl: "/klyraprotocol.indexer.events.UpdateYieldParamsEventV1";
    value: Uint8Array;
}
/**
 * UpdateYieldParamsV1 message contains all the information about an update
 * to the yield params on the Stream Chain.
 */
export interface UpdateYieldParamsEventV1Amino {
    /** The current price of sDAI in tDAI as seen by the protocol */
    sdai_price?: string;
    /** The current generalized asset yield index in the protocol. */
    asset_yield_index?: string;
}
export interface UpdateYieldParamsEventV1AminoMsg {
    type: "/klyraprotocol.indexer.events.UpdateYieldParamsEventV1";
    value: UpdateYieldParamsEventV1Amino;
}
/**
 * UpdateYieldParamsV1 message contains all the information about an update
 * to the yield params on the Stream Chain.
 */
export interface UpdateYieldParamsEventV1SDKType {
    sdai_price: string;
    asset_yield_index: string;
}
export declare const FundingUpdateV1: {
    typeUrl: string;
    is(o: any): o is FundingUpdateV1;
    isSDK(o: any): o is FundingUpdateV1SDKType;
    isAmino(o: any): o is FundingUpdateV1Amino;
    encode(message: FundingUpdateV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): FundingUpdateV1;
    fromPartial(object: Partial<FundingUpdateV1>): FundingUpdateV1;
    fromAmino(object: FundingUpdateV1Amino): FundingUpdateV1;
    toAmino(message: FundingUpdateV1): FundingUpdateV1Amino;
    fromAminoMsg(object: FundingUpdateV1AminoMsg): FundingUpdateV1;
    fromProtoMsg(message: FundingUpdateV1ProtoMsg): FundingUpdateV1;
    toProto(message: FundingUpdateV1): Uint8Array;
    toProtoMsg(message: FundingUpdateV1): FundingUpdateV1ProtoMsg;
};
export declare const FundingEventV1: {
    typeUrl: string;
    is(o: any): o is FundingEventV1;
    isSDK(o: any): o is FundingEventV1SDKType;
    isAmino(o: any): o is FundingEventV1Amino;
    encode(message: FundingEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): FundingEventV1;
    fromPartial(object: Partial<FundingEventV1>): FundingEventV1;
    fromAmino(object: FundingEventV1Amino): FundingEventV1;
    toAmino(message: FundingEventV1): FundingEventV1Amino;
    fromAminoMsg(object: FundingEventV1AminoMsg): FundingEventV1;
    fromProtoMsg(message: FundingEventV1ProtoMsg): FundingEventV1;
    toProto(message: FundingEventV1): Uint8Array;
    toProtoMsg(message: FundingEventV1): FundingEventV1ProtoMsg;
};
export declare const MarketEventV1: {
    typeUrl: string;
    is(o: any): o is MarketEventV1;
    isSDK(o: any): o is MarketEventV1SDKType;
    isAmino(o: any): o is MarketEventV1Amino;
    encode(message: MarketEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketEventV1;
    fromPartial(object: Partial<MarketEventV1>): MarketEventV1;
    fromAmino(object: MarketEventV1Amino): MarketEventV1;
    toAmino(message: MarketEventV1): MarketEventV1Amino;
    fromAminoMsg(object: MarketEventV1AminoMsg): MarketEventV1;
    fromProtoMsg(message: MarketEventV1ProtoMsg): MarketEventV1;
    toProto(message: MarketEventV1): Uint8Array;
    toProtoMsg(message: MarketEventV1): MarketEventV1ProtoMsg;
};
export declare const MarketPriceUpdateEventV1: {
    typeUrl: string;
    is(o: any): o is MarketPriceUpdateEventV1;
    isSDK(o: any): o is MarketPriceUpdateEventV1SDKType;
    isAmino(o: any): o is MarketPriceUpdateEventV1Amino;
    encode(message: MarketPriceUpdateEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketPriceUpdateEventV1;
    fromPartial(object: Partial<MarketPriceUpdateEventV1>): MarketPriceUpdateEventV1;
    fromAmino(object: MarketPriceUpdateEventV1Amino): MarketPriceUpdateEventV1;
    toAmino(message: MarketPriceUpdateEventV1): MarketPriceUpdateEventV1Amino;
    fromAminoMsg(object: MarketPriceUpdateEventV1AminoMsg): MarketPriceUpdateEventV1;
    fromProtoMsg(message: MarketPriceUpdateEventV1ProtoMsg): MarketPriceUpdateEventV1;
    toProto(message: MarketPriceUpdateEventV1): Uint8Array;
    toProtoMsg(message: MarketPriceUpdateEventV1): MarketPriceUpdateEventV1ProtoMsg;
};
export declare const MarketBaseEventV1: {
    typeUrl: string;
    is(o: any): o is MarketBaseEventV1;
    isSDK(o: any): o is MarketBaseEventV1SDKType;
    isAmino(o: any): o is MarketBaseEventV1Amino;
    encode(message: MarketBaseEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketBaseEventV1;
    fromPartial(object: Partial<MarketBaseEventV1>): MarketBaseEventV1;
    fromAmino(object: MarketBaseEventV1Amino): MarketBaseEventV1;
    toAmino(message: MarketBaseEventV1): MarketBaseEventV1Amino;
    fromAminoMsg(object: MarketBaseEventV1AminoMsg): MarketBaseEventV1;
    fromProtoMsg(message: MarketBaseEventV1ProtoMsg): MarketBaseEventV1;
    toProto(message: MarketBaseEventV1): Uint8Array;
    toProtoMsg(message: MarketBaseEventV1): MarketBaseEventV1ProtoMsg;
};
export declare const MarketCreateEventV1: {
    typeUrl: string;
    is(o: any): o is MarketCreateEventV1;
    isSDK(o: any): o is MarketCreateEventV1SDKType;
    isAmino(o: any): o is MarketCreateEventV1Amino;
    encode(message: MarketCreateEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketCreateEventV1;
    fromPartial(object: Partial<MarketCreateEventV1>): MarketCreateEventV1;
    fromAmino(object: MarketCreateEventV1Amino): MarketCreateEventV1;
    toAmino(message: MarketCreateEventV1): MarketCreateEventV1Amino;
    fromAminoMsg(object: MarketCreateEventV1AminoMsg): MarketCreateEventV1;
    fromProtoMsg(message: MarketCreateEventV1ProtoMsg): MarketCreateEventV1;
    toProto(message: MarketCreateEventV1): Uint8Array;
    toProtoMsg(message: MarketCreateEventV1): MarketCreateEventV1ProtoMsg;
};
export declare const MarketModifyEventV1: {
    typeUrl: string;
    is(o: any): o is MarketModifyEventV1;
    isSDK(o: any): o is MarketModifyEventV1SDKType;
    isAmino(o: any): o is MarketModifyEventV1Amino;
    encode(message: MarketModifyEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketModifyEventV1;
    fromPartial(object: Partial<MarketModifyEventV1>): MarketModifyEventV1;
    fromAmino(object: MarketModifyEventV1Amino): MarketModifyEventV1;
    toAmino(message: MarketModifyEventV1): MarketModifyEventV1Amino;
    fromAminoMsg(object: MarketModifyEventV1AminoMsg): MarketModifyEventV1;
    fromProtoMsg(message: MarketModifyEventV1ProtoMsg): MarketModifyEventV1;
    toProto(message: MarketModifyEventV1): Uint8Array;
    toProtoMsg(message: MarketModifyEventV1): MarketModifyEventV1ProtoMsg;
};
export declare const SourceOfFunds: {
    typeUrl: string;
    is(o: any): o is SourceOfFunds;
    isSDK(o: any): o is SourceOfFundsSDKType;
    isAmino(o: any): o is SourceOfFundsAmino;
    encode(message: SourceOfFunds, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SourceOfFunds;
    fromPartial(object: Partial<SourceOfFunds>): SourceOfFunds;
    fromAmino(object: SourceOfFundsAmino): SourceOfFunds;
    toAmino(message: SourceOfFunds): SourceOfFundsAmino;
    fromAminoMsg(object: SourceOfFundsAminoMsg): SourceOfFunds;
    fromProtoMsg(message: SourceOfFundsProtoMsg): SourceOfFunds;
    toProto(message: SourceOfFunds): Uint8Array;
    toProtoMsg(message: SourceOfFunds): SourceOfFundsProtoMsg;
};
export declare const TransferEventV1: {
    typeUrl: string;
    is(o: any): o is TransferEventV1;
    isSDK(o: any): o is TransferEventV1SDKType;
    isAmino(o: any): o is TransferEventV1Amino;
    encode(message: TransferEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TransferEventV1;
    fromPartial(object: Partial<TransferEventV1>): TransferEventV1;
    fromAmino(object: TransferEventV1Amino): TransferEventV1;
    toAmino(message: TransferEventV1): TransferEventV1Amino;
    fromAminoMsg(object: TransferEventV1AminoMsg): TransferEventV1;
    fromProtoMsg(message: TransferEventV1ProtoMsg): TransferEventV1;
    toProto(message: TransferEventV1): Uint8Array;
    toProtoMsg(message: TransferEventV1): TransferEventV1ProtoMsg;
};
export declare const OrderFillEventV1: {
    typeUrl: string;
    is(o: any): o is OrderFillEventV1;
    isSDK(o: any): o is OrderFillEventV1SDKType;
    isAmino(o: any): o is OrderFillEventV1Amino;
    encode(message: OrderFillEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OrderFillEventV1;
    fromPartial(object: Partial<OrderFillEventV1>): OrderFillEventV1;
    fromAmino(object: OrderFillEventV1Amino): OrderFillEventV1;
    toAmino(message: OrderFillEventV1): OrderFillEventV1Amino;
    fromAminoMsg(object: OrderFillEventV1AminoMsg): OrderFillEventV1;
    fromProtoMsg(message: OrderFillEventV1ProtoMsg): OrderFillEventV1;
    toProto(message: OrderFillEventV1): Uint8Array;
    toProtoMsg(message: OrderFillEventV1): OrderFillEventV1ProtoMsg;
};
export declare const DeleveragingEventV1: {
    typeUrl: string;
    is(o: any): o is DeleveragingEventV1;
    isSDK(o: any): o is DeleveragingEventV1SDKType;
    isAmino(o: any): o is DeleveragingEventV1Amino;
    encode(message: DeleveragingEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): DeleveragingEventV1;
    fromPartial(object: Partial<DeleveragingEventV1>): DeleveragingEventV1;
    fromAmino(object: DeleveragingEventV1Amino): DeleveragingEventV1;
    toAmino(message: DeleveragingEventV1): DeleveragingEventV1Amino;
    fromAminoMsg(object: DeleveragingEventV1AminoMsg): DeleveragingEventV1;
    fromProtoMsg(message: DeleveragingEventV1ProtoMsg): DeleveragingEventV1;
    toProto(message: DeleveragingEventV1): Uint8Array;
    toProtoMsg(message: DeleveragingEventV1): DeleveragingEventV1ProtoMsg;
};
export declare const LiquidationOrderV1: {
    typeUrl: string;
    is(o: any): o is LiquidationOrderV1;
    isSDK(o: any): o is LiquidationOrderV1SDKType;
    isAmino(o: any): o is LiquidationOrderV1Amino;
    encode(message: LiquidationOrderV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): LiquidationOrderV1;
    fromPartial(object: Partial<LiquidationOrderV1>): LiquidationOrderV1;
    fromAmino(object: LiquidationOrderV1Amino): LiquidationOrderV1;
    toAmino(message: LiquidationOrderV1): LiquidationOrderV1Amino;
    fromAminoMsg(object: LiquidationOrderV1AminoMsg): LiquidationOrderV1;
    fromProtoMsg(message: LiquidationOrderV1ProtoMsg): LiquidationOrderV1;
    toProto(message: LiquidationOrderV1): Uint8Array;
    toProtoMsg(message: LiquidationOrderV1): LiquidationOrderV1ProtoMsg;
};
export declare const SubaccountUpdateEventV1: {
    typeUrl: string;
    is(o: any): o is SubaccountUpdateEventV1;
    isSDK(o: any): o is SubaccountUpdateEventV1SDKType;
    isAmino(o: any): o is SubaccountUpdateEventV1Amino;
    encode(message: SubaccountUpdateEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SubaccountUpdateEventV1;
    fromPartial(object: Partial<SubaccountUpdateEventV1>): SubaccountUpdateEventV1;
    fromAmino(object: SubaccountUpdateEventV1Amino): SubaccountUpdateEventV1;
    toAmino(message: SubaccountUpdateEventV1): SubaccountUpdateEventV1Amino;
    fromAminoMsg(object: SubaccountUpdateEventV1AminoMsg): SubaccountUpdateEventV1;
    fromProtoMsg(message: SubaccountUpdateEventV1ProtoMsg): SubaccountUpdateEventV1;
    toProto(message: SubaccountUpdateEventV1): Uint8Array;
    toProtoMsg(message: SubaccountUpdateEventV1): SubaccountUpdateEventV1ProtoMsg;
};
export declare const StatefulOrderEventV1: {
    typeUrl: string;
    is(o: any): o is StatefulOrderEventV1;
    isSDK(o: any): o is StatefulOrderEventV1SDKType;
    isAmino(o: any): o is StatefulOrderEventV1Amino;
    encode(message: StatefulOrderEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StatefulOrderEventV1;
    fromPartial(object: Partial<StatefulOrderEventV1>): StatefulOrderEventV1;
    fromAmino(object: StatefulOrderEventV1Amino): StatefulOrderEventV1;
    toAmino(message: StatefulOrderEventV1): StatefulOrderEventV1Amino;
    fromAminoMsg(object: StatefulOrderEventV1AminoMsg): StatefulOrderEventV1;
    fromProtoMsg(message: StatefulOrderEventV1ProtoMsg): StatefulOrderEventV1;
    toProto(message: StatefulOrderEventV1): Uint8Array;
    toProtoMsg(message: StatefulOrderEventV1): StatefulOrderEventV1ProtoMsg;
};
export declare const StatefulOrderEventV1_StatefulOrderPlacementV1: {
    typeUrl: string;
    is(o: any): o is StatefulOrderEventV1_StatefulOrderPlacementV1;
    isSDK(o: any): o is StatefulOrderEventV1_StatefulOrderPlacementV1SDKType;
    isAmino(o: any): o is StatefulOrderEventV1_StatefulOrderPlacementV1Amino;
    encode(message: StatefulOrderEventV1_StatefulOrderPlacementV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StatefulOrderEventV1_StatefulOrderPlacementV1;
    fromPartial(object: Partial<StatefulOrderEventV1_StatefulOrderPlacementV1>): StatefulOrderEventV1_StatefulOrderPlacementV1;
    fromAmino(object: StatefulOrderEventV1_StatefulOrderPlacementV1Amino): StatefulOrderEventV1_StatefulOrderPlacementV1;
    toAmino(message: StatefulOrderEventV1_StatefulOrderPlacementV1): StatefulOrderEventV1_StatefulOrderPlacementV1Amino;
    fromAminoMsg(object: StatefulOrderEventV1_StatefulOrderPlacementV1AminoMsg): StatefulOrderEventV1_StatefulOrderPlacementV1;
    fromProtoMsg(message: StatefulOrderEventV1_StatefulOrderPlacementV1ProtoMsg): StatefulOrderEventV1_StatefulOrderPlacementV1;
    toProto(message: StatefulOrderEventV1_StatefulOrderPlacementV1): Uint8Array;
    toProtoMsg(message: StatefulOrderEventV1_StatefulOrderPlacementV1): StatefulOrderEventV1_StatefulOrderPlacementV1ProtoMsg;
};
export declare const StatefulOrderEventV1_StatefulOrderRemovalV1: {
    typeUrl: string;
    is(o: any): o is StatefulOrderEventV1_StatefulOrderRemovalV1;
    isSDK(o: any): o is StatefulOrderEventV1_StatefulOrderRemovalV1SDKType;
    isAmino(o: any): o is StatefulOrderEventV1_StatefulOrderRemovalV1Amino;
    encode(message: StatefulOrderEventV1_StatefulOrderRemovalV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StatefulOrderEventV1_StatefulOrderRemovalV1;
    fromPartial(object: Partial<StatefulOrderEventV1_StatefulOrderRemovalV1>): StatefulOrderEventV1_StatefulOrderRemovalV1;
    fromAmino(object: StatefulOrderEventV1_StatefulOrderRemovalV1Amino): StatefulOrderEventV1_StatefulOrderRemovalV1;
    toAmino(message: StatefulOrderEventV1_StatefulOrderRemovalV1): StatefulOrderEventV1_StatefulOrderRemovalV1Amino;
    fromAminoMsg(object: StatefulOrderEventV1_StatefulOrderRemovalV1AminoMsg): StatefulOrderEventV1_StatefulOrderRemovalV1;
    fromProtoMsg(message: StatefulOrderEventV1_StatefulOrderRemovalV1ProtoMsg): StatefulOrderEventV1_StatefulOrderRemovalV1;
    toProto(message: StatefulOrderEventV1_StatefulOrderRemovalV1): Uint8Array;
    toProtoMsg(message: StatefulOrderEventV1_StatefulOrderRemovalV1): StatefulOrderEventV1_StatefulOrderRemovalV1ProtoMsg;
};
export declare const StatefulOrderEventV1_ConditionalOrderPlacementV1: {
    typeUrl: string;
    is(o: any): o is StatefulOrderEventV1_ConditionalOrderPlacementV1;
    isSDK(o: any): o is StatefulOrderEventV1_ConditionalOrderPlacementV1SDKType;
    isAmino(o: any): o is StatefulOrderEventV1_ConditionalOrderPlacementV1Amino;
    encode(message: StatefulOrderEventV1_ConditionalOrderPlacementV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StatefulOrderEventV1_ConditionalOrderPlacementV1;
    fromPartial(object: Partial<StatefulOrderEventV1_ConditionalOrderPlacementV1>): StatefulOrderEventV1_ConditionalOrderPlacementV1;
    fromAmino(object: StatefulOrderEventV1_ConditionalOrderPlacementV1Amino): StatefulOrderEventV1_ConditionalOrderPlacementV1;
    toAmino(message: StatefulOrderEventV1_ConditionalOrderPlacementV1): StatefulOrderEventV1_ConditionalOrderPlacementV1Amino;
    fromAminoMsg(object: StatefulOrderEventV1_ConditionalOrderPlacementV1AminoMsg): StatefulOrderEventV1_ConditionalOrderPlacementV1;
    fromProtoMsg(message: StatefulOrderEventV1_ConditionalOrderPlacementV1ProtoMsg): StatefulOrderEventV1_ConditionalOrderPlacementV1;
    toProto(message: StatefulOrderEventV1_ConditionalOrderPlacementV1): Uint8Array;
    toProtoMsg(message: StatefulOrderEventV1_ConditionalOrderPlacementV1): StatefulOrderEventV1_ConditionalOrderPlacementV1ProtoMsg;
};
export declare const StatefulOrderEventV1_ConditionalOrderTriggeredV1: {
    typeUrl: string;
    is(o: any): o is StatefulOrderEventV1_ConditionalOrderTriggeredV1;
    isSDK(o: any): o is StatefulOrderEventV1_ConditionalOrderTriggeredV1SDKType;
    isAmino(o: any): o is StatefulOrderEventV1_ConditionalOrderTriggeredV1Amino;
    encode(message: StatefulOrderEventV1_ConditionalOrderTriggeredV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StatefulOrderEventV1_ConditionalOrderTriggeredV1;
    fromPartial(object: Partial<StatefulOrderEventV1_ConditionalOrderTriggeredV1>): StatefulOrderEventV1_ConditionalOrderTriggeredV1;
    fromAmino(object: StatefulOrderEventV1_ConditionalOrderTriggeredV1Amino): StatefulOrderEventV1_ConditionalOrderTriggeredV1;
    toAmino(message: StatefulOrderEventV1_ConditionalOrderTriggeredV1): StatefulOrderEventV1_ConditionalOrderTriggeredV1Amino;
    fromAminoMsg(object: StatefulOrderEventV1_ConditionalOrderTriggeredV1AminoMsg): StatefulOrderEventV1_ConditionalOrderTriggeredV1;
    fromProtoMsg(message: StatefulOrderEventV1_ConditionalOrderTriggeredV1ProtoMsg): StatefulOrderEventV1_ConditionalOrderTriggeredV1;
    toProto(message: StatefulOrderEventV1_ConditionalOrderTriggeredV1): Uint8Array;
    toProtoMsg(message: StatefulOrderEventV1_ConditionalOrderTriggeredV1): StatefulOrderEventV1_ConditionalOrderTriggeredV1ProtoMsg;
};
export declare const StatefulOrderEventV1_LongTermOrderPlacementV1: {
    typeUrl: string;
    is(o: any): o is StatefulOrderEventV1_LongTermOrderPlacementV1;
    isSDK(o: any): o is StatefulOrderEventV1_LongTermOrderPlacementV1SDKType;
    isAmino(o: any): o is StatefulOrderEventV1_LongTermOrderPlacementV1Amino;
    encode(message: StatefulOrderEventV1_LongTermOrderPlacementV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StatefulOrderEventV1_LongTermOrderPlacementV1;
    fromPartial(object: Partial<StatefulOrderEventV1_LongTermOrderPlacementV1>): StatefulOrderEventV1_LongTermOrderPlacementV1;
    fromAmino(object: StatefulOrderEventV1_LongTermOrderPlacementV1Amino): StatefulOrderEventV1_LongTermOrderPlacementV1;
    toAmino(message: StatefulOrderEventV1_LongTermOrderPlacementV1): StatefulOrderEventV1_LongTermOrderPlacementV1Amino;
    fromAminoMsg(object: StatefulOrderEventV1_LongTermOrderPlacementV1AminoMsg): StatefulOrderEventV1_LongTermOrderPlacementV1;
    fromProtoMsg(message: StatefulOrderEventV1_LongTermOrderPlacementV1ProtoMsg): StatefulOrderEventV1_LongTermOrderPlacementV1;
    toProto(message: StatefulOrderEventV1_LongTermOrderPlacementV1): Uint8Array;
    toProtoMsg(message: StatefulOrderEventV1_LongTermOrderPlacementV1): StatefulOrderEventV1_LongTermOrderPlacementV1ProtoMsg;
};
export declare const AssetCreateEventV1: {
    typeUrl: string;
    is(o: any): o is AssetCreateEventV1;
    isSDK(o: any): o is AssetCreateEventV1SDKType;
    isAmino(o: any): o is AssetCreateEventV1Amino;
    encode(message: AssetCreateEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AssetCreateEventV1;
    fromPartial(object: Partial<AssetCreateEventV1>): AssetCreateEventV1;
    fromAmino(object: AssetCreateEventV1Amino): AssetCreateEventV1;
    toAmino(message: AssetCreateEventV1): AssetCreateEventV1Amino;
    fromAminoMsg(object: AssetCreateEventV1AminoMsg): AssetCreateEventV1;
    fromProtoMsg(message: AssetCreateEventV1ProtoMsg): AssetCreateEventV1;
    toProto(message: AssetCreateEventV1): Uint8Array;
    toProtoMsg(message: AssetCreateEventV1): AssetCreateEventV1ProtoMsg;
};
export declare const PerpetualMarketCreateEventV1: {
    typeUrl: string;
    is(o: any): o is PerpetualMarketCreateEventV1;
    isSDK(o: any): o is PerpetualMarketCreateEventV1SDKType;
    isAmino(o: any): o is PerpetualMarketCreateEventV1Amino;
    encode(message: PerpetualMarketCreateEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PerpetualMarketCreateEventV1;
    fromPartial(object: Partial<PerpetualMarketCreateEventV1>): PerpetualMarketCreateEventV1;
    fromAmino(object: PerpetualMarketCreateEventV1Amino): PerpetualMarketCreateEventV1;
    toAmino(message: PerpetualMarketCreateEventV1): PerpetualMarketCreateEventV1Amino;
    fromAminoMsg(object: PerpetualMarketCreateEventV1AminoMsg): PerpetualMarketCreateEventV1;
    fromProtoMsg(message: PerpetualMarketCreateEventV1ProtoMsg): PerpetualMarketCreateEventV1;
    toProto(message: PerpetualMarketCreateEventV1): Uint8Array;
    toProtoMsg(message: PerpetualMarketCreateEventV1): PerpetualMarketCreateEventV1ProtoMsg;
};
export declare const PerpetualMarketCreateEventV2: {
    typeUrl: string;
    is(o: any): o is PerpetualMarketCreateEventV2;
    isSDK(o: any): o is PerpetualMarketCreateEventV2SDKType;
    isAmino(o: any): o is PerpetualMarketCreateEventV2Amino;
    encode(message: PerpetualMarketCreateEventV2, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PerpetualMarketCreateEventV2;
    fromPartial(object: Partial<PerpetualMarketCreateEventV2>): PerpetualMarketCreateEventV2;
    fromAmino(object: PerpetualMarketCreateEventV2Amino): PerpetualMarketCreateEventV2;
    toAmino(message: PerpetualMarketCreateEventV2): PerpetualMarketCreateEventV2Amino;
    fromAminoMsg(object: PerpetualMarketCreateEventV2AminoMsg): PerpetualMarketCreateEventV2;
    fromProtoMsg(message: PerpetualMarketCreateEventV2ProtoMsg): PerpetualMarketCreateEventV2;
    toProto(message: PerpetualMarketCreateEventV2): Uint8Array;
    toProtoMsg(message: PerpetualMarketCreateEventV2): PerpetualMarketCreateEventV2ProtoMsg;
};
export declare const LiquidityTierUpsertEventV1: {
    typeUrl: string;
    is(o: any): o is LiquidityTierUpsertEventV1;
    isSDK(o: any): o is LiquidityTierUpsertEventV1SDKType;
    isAmino(o: any): o is LiquidityTierUpsertEventV1Amino;
    encode(message: LiquidityTierUpsertEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): LiquidityTierUpsertEventV1;
    fromPartial(object: Partial<LiquidityTierUpsertEventV1>): LiquidityTierUpsertEventV1;
    fromAmino(object: LiquidityTierUpsertEventV1Amino): LiquidityTierUpsertEventV1;
    toAmino(message: LiquidityTierUpsertEventV1): LiquidityTierUpsertEventV1Amino;
    fromAminoMsg(object: LiquidityTierUpsertEventV1AminoMsg): LiquidityTierUpsertEventV1;
    fromProtoMsg(message: LiquidityTierUpsertEventV1ProtoMsg): LiquidityTierUpsertEventV1;
    toProto(message: LiquidityTierUpsertEventV1): Uint8Array;
    toProtoMsg(message: LiquidityTierUpsertEventV1): LiquidityTierUpsertEventV1ProtoMsg;
};
export declare const OpenInterestUpdateEventV1: {
    typeUrl: string;
    is(o: any): o is OpenInterestUpdateEventV1;
    isSDK(o: any): o is OpenInterestUpdateEventV1SDKType;
    isAmino(o: any): o is OpenInterestUpdateEventV1Amino;
    encode(message: OpenInterestUpdateEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OpenInterestUpdateEventV1;
    fromPartial(object: Partial<OpenInterestUpdateEventV1>): OpenInterestUpdateEventV1;
    fromAmino(object: OpenInterestUpdateEventV1Amino): OpenInterestUpdateEventV1;
    toAmino(message: OpenInterestUpdateEventV1): OpenInterestUpdateEventV1Amino;
    fromAminoMsg(object: OpenInterestUpdateEventV1AminoMsg): OpenInterestUpdateEventV1;
    fromProtoMsg(message: OpenInterestUpdateEventV1ProtoMsg): OpenInterestUpdateEventV1;
    toProto(message: OpenInterestUpdateEventV1): Uint8Array;
    toProtoMsg(message: OpenInterestUpdateEventV1): OpenInterestUpdateEventV1ProtoMsg;
};
export declare const OpenInterestUpdate: {
    typeUrl: string;
    is(o: any): o is OpenInterestUpdate;
    isSDK(o: any): o is OpenInterestUpdateSDKType;
    isAmino(o: any): o is OpenInterestUpdateAmino;
    encode(message: OpenInterestUpdate, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): OpenInterestUpdate;
    fromPartial(object: Partial<OpenInterestUpdate>): OpenInterestUpdate;
    fromAmino(object: OpenInterestUpdateAmino): OpenInterestUpdate;
    toAmino(message: OpenInterestUpdate): OpenInterestUpdateAmino;
    fromAminoMsg(object: OpenInterestUpdateAminoMsg): OpenInterestUpdate;
    fromProtoMsg(message: OpenInterestUpdateProtoMsg): OpenInterestUpdate;
    toProto(message: OpenInterestUpdate): Uint8Array;
    toProtoMsg(message: OpenInterestUpdate): OpenInterestUpdateProtoMsg;
};
export declare const LiquidityTierUpsertEventV2: {
    typeUrl: string;
    is(o: any): o is LiquidityTierUpsertEventV2;
    isSDK(o: any): o is LiquidityTierUpsertEventV2SDKType;
    isAmino(o: any): o is LiquidityTierUpsertEventV2Amino;
    encode(message: LiquidityTierUpsertEventV2, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): LiquidityTierUpsertEventV2;
    fromPartial(object: Partial<LiquidityTierUpsertEventV2>): LiquidityTierUpsertEventV2;
    fromAmino(object: LiquidityTierUpsertEventV2Amino): LiquidityTierUpsertEventV2;
    toAmino(message: LiquidityTierUpsertEventV2): LiquidityTierUpsertEventV2Amino;
    fromAminoMsg(object: LiquidityTierUpsertEventV2AminoMsg): LiquidityTierUpsertEventV2;
    fromProtoMsg(message: LiquidityTierUpsertEventV2ProtoMsg): LiquidityTierUpsertEventV2;
    toProto(message: LiquidityTierUpsertEventV2): Uint8Array;
    toProtoMsg(message: LiquidityTierUpsertEventV2): LiquidityTierUpsertEventV2ProtoMsg;
};
export declare const UpdateClobPairEventV1: {
    typeUrl: string;
    is(o: any): o is UpdateClobPairEventV1;
    isSDK(o: any): o is UpdateClobPairEventV1SDKType;
    isAmino(o: any): o is UpdateClobPairEventV1Amino;
    encode(message: UpdateClobPairEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): UpdateClobPairEventV1;
    fromPartial(object: Partial<UpdateClobPairEventV1>): UpdateClobPairEventV1;
    fromAmino(object: UpdateClobPairEventV1Amino): UpdateClobPairEventV1;
    toAmino(message: UpdateClobPairEventV1): UpdateClobPairEventV1Amino;
    fromAminoMsg(object: UpdateClobPairEventV1AminoMsg): UpdateClobPairEventV1;
    fromProtoMsg(message: UpdateClobPairEventV1ProtoMsg): UpdateClobPairEventV1;
    toProto(message: UpdateClobPairEventV1): Uint8Array;
    toProtoMsg(message: UpdateClobPairEventV1): UpdateClobPairEventV1ProtoMsg;
};
export declare const UpdatePerpetualEventV1: {
    typeUrl: string;
    is(o: any): o is UpdatePerpetualEventV1;
    isSDK(o: any): o is UpdatePerpetualEventV1SDKType;
    isAmino(o: any): o is UpdatePerpetualEventV1Amino;
    encode(message: UpdatePerpetualEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): UpdatePerpetualEventV1;
    fromPartial(object: Partial<UpdatePerpetualEventV1>): UpdatePerpetualEventV1;
    fromAmino(object: UpdatePerpetualEventV1Amino): UpdatePerpetualEventV1;
    toAmino(message: UpdatePerpetualEventV1): UpdatePerpetualEventV1Amino;
    fromAminoMsg(object: UpdatePerpetualEventV1AminoMsg): UpdatePerpetualEventV1;
    fromProtoMsg(message: UpdatePerpetualEventV1ProtoMsg): UpdatePerpetualEventV1;
    toProto(message: UpdatePerpetualEventV1): Uint8Array;
    toProtoMsg(message: UpdatePerpetualEventV1): UpdatePerpetualEventV1ProtoMsg;
};
export declare const UpdateYieldParamsEventV1: {
    typeUrl: string;
    is(o: any): o is UpdateYieldParamsEventV1;
    isSDK(o: any): o is UpdateYieldParamsEventV1SDKType;
    isAmino(o: any): o is UpdateYieldParamsEventV1Amino;
    encode(message: UpdateYieldParamsEventV1, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): UpdateYieldParamsEventV1;
    fromPartial(object: Partial<UpdateYieldParamsEventV1>): UpdateYieldParamsEventV1;
    fromAmino(object: UpdateYieldParamsEventV1Amino): UpdateYieldParamsEventV1;
    toAmino(message: UpdateYieldParamsEventV1): UpdateYieldParamsEventV1Amino;
    fromAminoMsg(object: UpdateYieldParamsEventV1AminoMsg): UpdateYieldParamsEventV1;
    fromProtoMsg(message: UpdateYieldParamsEventV1ProtoMsg): UpdateYieldParamsEventV1;
    toProto(message: UpdateYieldParamsEventV1): Uint8Array;
    toProtoMsg(message: UpdateYieldParamsEventV1): UpdateYieldParamsEventV1ProtoMsg;
};
