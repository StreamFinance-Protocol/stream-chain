import { OrderId, OrderIdAmino, OrderIdSDKType } from "./order";
import { SubaccountId, SubaccountIdAmino, SubaccountIdSDKType } from "../subaccounts/subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * ClobMatch represents an operations queue entry around all different types
 * of matches, specifically regular matches, liquidation matches, and
 * deleveraging matches.
 */
export interface ClobMatch {
    matchOrders?: MatchOrders;
    matchPerpetualLiquidation?: MatchPerpetualLiquidation;
    matchPerpetualDeleveraging?: MatchPerpetualDeleveraging;
}
export interface ClobMatchProtoMsg {
    typeUrl: "/klyraprotocol.clob.ClobMatch";
    value: Uint8Array;
}
/**
 * ClobMatch represents an operations queue entry around all different types
 * of matches, specifically regular matches, liquidation matches, and
 * deleveraging matches.
 */
export interface ClobMatchAmino {
    match_orders?: MatchOrdersAmino;
    match_perpetual_liquidation?: MatchPerpetualLiquidationAmino;
    match_perpetual_deleveraging?: MatchPerpetualDeleveragingAmino;
}
export interface ClobMatchAminoMsg {
    type: "/klyraprotocol.clob.ClobMatch";
    value: ClobMatchAmino;
}
/**
 * ClobMatch represents an operations queue entry around all different types
 * of matches, specifically regular matches, liquidation matches, and
 * deleveraging matches.
 */
export interface ClobMatchSDKType {
    match_orders?: MatchOrdersSDKType;
    match_perpetual_liquidation?: MatchPerpetualLiquidationSDKType;
    match_perpetual_deleveraging?: MatchPerpetualDeleveragingSDKType;
}
/** MakerFill represents the filled amount of a matched maker order. */
export interface MakerFill {
    /**
     * The filled amount of the matched maker order, in base quantums.
     * TODO(CLOB-571): update to use SerializableInt.
     */
    fillAmount: bigint;
    /** The `OrderId` of the matched maker order. */
    makerOrderId: OrderId;
}
export interface MakerFillProtoMsg {
    typeUrl: "/klyraprotocol.clob.MakerFill";
    value: Uint8Array;
}
/** MakerFill represents the filled amount of a matched maker order. */
export interface MakerFillAmino {
    /**
     * The filled amount of the matched maker order, in base quantums.
     * TODO(CLOB-571): update to use SerializableInt.
     */
    fill_amount?: string;
    /** The `OrderId` of the matched maker order. */
    maker_order_id?: OrderIdAmino;
}
export interface MakerFillAminoMsg {
    type: "/klyraprotocol.clob.MakerFill";
    value: MakerFillAmino;
}
/** MakerFill represents the filled amount of a matched maker order. */
export interface MakerFillSDKType {
    fill_amount: bigint;
    maker_order_id: OrderIdSDKType;
}
/** MatchOrders is an injected message used for matching orders. */
export interface MatchOrders {
    /** The `OrderId` of the taker order. */
    takerOrderId: OrderId;
    /** An ordered list of fills created by this taker order. */
    fills: MakerFill[];
}
export interface MatchOrdersProtoMsg {
    typeUrl: "/klyraprotocol.clob.MatchOrders";
    value: Uint8Array;
}
/** MatchOrders is an injected message used for matching orders. */
export interface MatchOrdersAmino {
    /** The `OrderId` of the taker order. */
    taker_order_id?: OrderIdAmino;
    /** An ordered list of fills created by this taker order. */
    fills?: MakerFillAmino[];
}
export interface MatchOrdersAminoMsg {
    type: "/klyraprotocol.clob.MatchOrders";
    value: MatchOrdersAmino;
}
/** MatchOrders is an injected message used for matching orders. */
export interface MatchOrdersSDKType {
    taker_order_id: OrderIdSDKType;
    fills: MakerFillSDKType[];
}
/**
 * MatchPerpetualLiquidation is an injected message used for liquidating a
 * subaccount.
 */
export interface MatchPerpetualLiquidation {
    /** ID of the subaccount that was liquidated. */
    liquidated: SubaccountId;
    /** The ID of the clob pair involved in the liquidation. */
    clobPairId: number;
    /** The ID of the perpetual involved in the liquidation. */
    perpetualId: number;
    /** The total size of the liquidation order including any unfilled size. */
    totalSize: bigint;
    /** `true` if liquidating a short position, `false` otherwise. */
    isBuy: boolean;
    /** An ordered list of fills created by this liquidation. */
    fills: MakerFill[];
}
export interface MatchPerpetualLiquidationProtoMsg {
    typeUrl: "/klyraprotocol.clob.MatchPerpetualLiquidation";
    value: Uint8Array;
}
/**
 * MatchPerpetualLiquidation is an injected message used for liquidating a
 * subaccount.
 */
export interface MatchPerpetualLiquidationAmino {
    /** ID of the subaccount that was liquidated. */
    liquidated?: SubaccountIdAmino;
    /** The ID of the clob pair involved in the liquidation. */
    clob_pair_id?: number;
    /** The ID of the perpetual involved in the liquidation. */
    perpetual_id?: number;
    /** The total size of the liquidation order including any unfilled size. */
    total_size?: string;
    /** `true` if liquidating a short position, `false` otherwise. */
    is_buy?: boolean;
    /** An ordered list of fills created by this liquidation. */
    fills?: MakerFillAmino[];
}
export interface MatchPerpetualLiquidationAminoMsg {
    type: "/klyraprotocol.clob.MatchPerpetualLiquidation";
    value: MatchPerpetualLiquidationAmino;
}
/**
 * MatchPerpetualLiquidation is an injected message used for liquidating a
 * subaccount.
 */
export interface MatchPerpetualLiquidationSDKType {
    liquidated: SubaccountIdSDKType;
    clob_pair_id: number;
    perpetual_id: number;
    total_size: bigint;
    is_buy: boolean;
    fills: MakerFillSDKType[];
}
/**
 * MatchPerpetualDeleveraging is an injected message used for deleveraging a
 * subaccount.
 */
export interface MatchPerpetualDeleveraging {
    /** ID of the subaccount that was liquidated. */
    liquidated: SubaccountId;
    /** The ID of the perpetual that was liquidated. */
    perpetualId: number;
    /** An ordered list of fills created by this liquidation. */
    fills: MatchPerpetualDeleveraging_Fill[];
    /**
     * Flag denoting whether the deleveraging operation was for the purpose
     * of final settlement. Final settlement matches are at the oracle price,
     * whereas deleveraging happens at the bankruptcy price of the deleveraged
     * subaccount.
     */
    isFinalSettlement: boolean;
}
export interface MatchPerpetualDeleveragingProtoMsg {
    typeUrl: "/klyraprotocol.clob.MatchPerpetualDeleveraging";
    value: Uint8Array;
}
/**
 * MatchPerpetualDeleveraging is an injected message used for deleveraging a
 * subaccount.
 */
export interface MatchPerpetualDeleveragingAmino {
    /** ID of the subaccount that was liquidated. */
    liquidated?: SubaccountIdAmino;
    /** The ID of the perpetual that was liquidated. */
    perpetual_id?: number;
    /** An ordered list of fills created by this liquidation. */
    fills?: MatchPerpetualDeleveraging_FillAmino[];
    /**
     * Flag denoting whether the deleveraging operation was for the purpose
     * of final settlement. Final settlement matches are at the oracle price,
     * whereas deleveraging happens at the bankruptcy price of the deleveraged
     * subaccount.
     */
    is_final_settlement?: boolean;
}
export interface MatchPerpetualDeleveragingAminoMsg {
    type: "/klyraprotocol.clob.MatchPerpetualDeleveraging";
    value: MatchPerpetualDeleveragingAmino;
}
/**
 * MatchPerpetualDeleveraging is an injected message used for deleveraging a
 * subaccount.
 */
export interface MatchPerpetualDeleveragingSDKType {
    liquidated: SubaccountIdSDKType;
    perpetual_id: number;
    fills: MatchPerpetualDeleveraging_FillSDKType[];
    is_final_settlement: boolean;
}
/** Fill represents a fill between the liquidated and offsetting subaccount. */
export interface MatchPerpetualDeleveraging_Fill {
    /**
     * ID of the subaccount that was used to offset the liquidated subaccount's
     * position.
     */
    offsettingSubaccountId: SubaccountId;
    /**
     * The amount filled between the liquidated and offsetting position, in
     * base quantums.
     * TODO(CLOB-571): update to use SerializableInt.
     */
    fillAmount: bigint;
}
export interface MatchPerpetualDeleveraging_FillProtoMsg {
    typeUrl: "/klyraprotocol.clob.Fill";
    value: Uint8Array;
}
/** Fill represents a fill between the liquidated and offsetting subaccount. */
export interface MatchPerpetualDeleveraging_FillAmino {
    /**
     * ID of the subaccount that was used to offset the liquidated subaccount's
     * position.
     */
    offsetting_subaccount_id?: SubaccountIdAmino;
    /**
     * The amount filled between the liquidated and offsetting position, in
     * base quantums.
     * TODO(CLOB-571): update to use SerializableInt.
     */
    fill_amount?: string;
}
export interface MatchPerpetualDeleveraging_FillAminoMsg {
    type: "/klyraprotocol.clob.Fill";
    value: MatchPerpetualDeleveraging_FillAmino;
}
/** Fill represents a fill between the liquidated and offsetting subaccount. */
export interface MatchPerpetualDeleveraging_FillSDKType {
    offsetting_subaccount_id: SubaccountIdSDKType;
    fill_amount: bigint;
}
export declare const ClobMatch: {
    typeUrl: string;
    is(o: any): o is ClobMatch;
    isSDK(o: any): o is ClobMatchSDKType;
    isAmino(o: any): o is ClobMatchAmino;
    encode(message: ClobMatch, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ClobMatch;
    fromPartial(object: Partial<ClobMatch>): ClobMatch;
    fromAmino(object: ClobMatchAmino): ClobMatch;
    toAmino(message: ClobMatch): ClobMatchAmino;
    fromAminoMsg(object: ClobMatchAminoMsg): ClobMatch;
    fromProtoMsg(message: ClobMatchProtoMsg): ClobMatch;
    toProto(message: ClobMatch): Uint8Array;
    toProtoMsg(message: ClobMatch): ClobMatchProtoMsg;
};
export declare const MakerFill: {
    typeUrl: string;
    is(o: any): o is MakerFill;
    isSDK(o: any): o is MakerFillSDKType;
    isAmino(o: any): o is MakerFillAmino;
    encode(message: MakerFill, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MakerFill;
    fromPartial(object: Partial<MakerFill>): MakerFill;
    fromAmino(object: MakerFillAmino): MakerFill;
    toAmino(message: MakerFill): MakerFillAmino;
    fromAminoMsg(object: MakerFillAminoMsg): MakerFill;
    fromProtoMsg(message: MakerFillProtoMsg): MakerFill;
    toProto(message: MakerFill): Uint8Array;
    toProtoMsg(message: MakerFill): MakerFillProtoMsg;
};
export declare const MatchOrders: {
    typeUrl: string;
    is(o: any): o is MatchOrders;
    isSDK(o: any): o is MatchOrdersSDKType;
    isAmino(o: any): o is MatchOrdersAmino;
    encode(message: MatchOrders, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MatchOrders;
    fromPartial(object: Partial<MatchOrders>): MatchOrders;
    fromAmino(object: MatchOrdersAmino): MatchOrders;
    toAmino(message: MatchOrders): MatchOrdersAmino;
    fromAminoMsg(object: MatchOrdersAminoMsg): MatchOrders;
    fromProtoMsg(message: MatchOrdersProtoMsg): MatchOrders;
    toProto(message: MatchOrders): Uint8Array;
    toProtoMsg(message: MatchOrders): MatchOrdersProtoMsg;
};
export declare const MatchPerpetualLiquidation: {
    typeUrl: string;
    is(o: any): o is MatchPerpetualLiquidation;
    isSDK(o: any): o is MatchPerpetualLiquidationSDKType;
    isAmino(o: any): o is MatchPerpetualLiquidationAmino;
    encode(message: MatchPerpetualLiquidation, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MatchPerpetualLiquidation;
    fromPartial(object: Partial<MatchPerpetualLiquidation>): MatchPerpetualLiquidation;
    fromAmino(object: MatchPerpetualLiquidationAmino): MatchPerpetualLiquidation;
    toAmino(message: MatchPerpetualLiquidation): MatchPerpetualLiquidationAmino;
    fromAminoMsg(object: MatchPerpetualLiquidationAminoMsg): MatchPerpetualLiquidation;
    fromProtoMsg(message: MatchPerpetualLiquidationProtoMsg): MatchPerpetualLiquidation;
    toProto(message: MatchPerpetualLiquidation): Uint8Array;
    toProtoMsg(message: MatchPerpetualLiquidation): MatchPerpetualLiquidationProtoMsg;
};
export declare const MatchPerpetualDeleveraging: {
    typeUrl: string;
    is(o: any): o is MatchPerpetualDeleveraging;
    isSDK(o: any): o is MatchPerpetualDeleveragingSDKType;
    isAmino(o: any): o is MatchPerpetualDeleveragingAmino;
    encode(message: MatchPerpetualDeleveraging, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MatchPerpetualDeleveraging;
    fromPartial(object: Partial<MatchPerpetualDeleveraging>): MatchPerpetualDeleveraging;
    fromAmino(object: MatchPerpetualDeleveragingAmino): MatchPerpetualDeleveraging;
    toAmino(message: MatchPerpetualDeleveraging): MatchPerpetualDeleveragingAmino;
    fromAminoMsg(object: MatchPerpetualDeleveragingAminoMsg): MatchPerpetualDeleveraging;
    fromProtoMsg(message: MatchPerpetualDeleveragingProtoMsg): MatchPerpetualDeleveraging;
    toProto(message: MatchPerpetualDeleveraging): Uint8Array;
    toProtoMsg(message: MatchPerpetualDeleveraging): MatchPerpetualDeleveragingProtoMsg;
};
export declare const MatchPerpetualDeleveraging_Fill: {
    typeUrl: string;
    is(o: any): o is MatchPerpetualDeleveraging_Fill;
    isSDK(o: any): o is MatchPerpetualDeleveraging_FillSDKType;
    isAmino(o: any): o is MatchPerpetualDeleveraging_FillAmino;
    encode(message: MatchPerpetualDeleveraging_Fill, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MatchPerpetualDeleveraging_Fill;
    fromPartial(object: Partial<MatchPerpetualDeleveraging_Fill>): MatchPerpetualDeleveraging_Fill;
    fromAmino(object: MatchPerpetualDeleveraging_FillAmino): MatchPerpetualDeleveraging_Fill;
    toAmino(message: MatchPerpetualDeleveraging_Fill): MatchPerpetualDeleveraging_FillAmino;
    fromAminoMsg(object: MatchPerpetualDeleveraging_FillAminoMsg): MatchPerpetualDeleveraging_Fill;
    fromProtoMsg(message: MatchPerpetualDeleveraging_FillProtoMsg): MatchPerpetualDeleveraging_Fill;
    toProto(message: MatchPerpetualDeleveraging_Fill): Uint8Array;
    toProtoMsg(message: MatchPerpetualDeleveraging_Fill): MatchPerpetualDeleveraging_FillProtoMsg;
};
