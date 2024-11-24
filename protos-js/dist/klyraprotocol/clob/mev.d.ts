import { SubaccountId, SubaccountIdAmino, SubaccountIdSDKType } from "../subaccounts/subaccount";
import { ClobPair, ClobPairAmino, ClobPairSDKType } from "./clob_pair";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MEVMatch represents all necessary data to calculate MEV for a regular match. */
export interface MEVMatch {
    takerOrderSubaccountId?: SubaccountId;
    takerFeePpm: number;
    makerOrderSubaccountId?: SubaccountId;
    makerOrderSubticks: bigint;
    makerOrderIsBuy: boolean;
    makerFeePpm: number;
    clobPairId: number;
    fillAmount: bigint;
}
export interface MEVMatchProtoMsg {
    typeUrl: "/klyraprotocol.clob.MEVMatch";
    value: Uint8Array;
}
/** MEVMatch represents all necessary data to calculate MEV for a regular match. */
export interface MEVMatchAmino {
    taker_order_subaccount_id?: SubaccountIdAmino;
    taker_fee_ppm?: number;
    maker_order_subaccount_id?: SubaccountIdAmino;
    maker_order_subticks?: string;
    maker_order_is_buy?: boolean;
    maker_fee_ppm?: number;
    clob_pair_id?: number;
    fill_amount?: string;
}
export interface MEVMatchAminoMsg {
    type: "/klyraprotocol.clob.MEVMatch";
    value: MEVMatchAmino;
}
/** MEVMatch represents all necessary data to calculate MEV for a regular match. */
export interface MEVMatchSDKType {
    taker_order_subaccount_id?: SubaccountIdSDKType;
    taker_fee_ppm: number;
    maker_order_subaccount_id?: SubaccountIdSDKType;
    maker_order_subticks: bigint;
    maker_order_is_buy: boolean;
    maker_fee_ppm: number;
    clob_pair_id: number;
    fill_amount: bigint;
}
/**
 * MEVLiquidationMatch represents all necessary data to calculate MEV for a
 * liquidation.
 */
export interface MEVLiquidationMatch {
    liquidatedSubaccountId: SubaccountId;
    insuranceFundDeltaQuoteQuantums: bigint;
    validatorFeeQuoteQuantums: bigint;
    liquidityFeeQuoteQuantums: bigint;
    makerOrderSubaccountId: SubaccountId;
    makerOrderSubticks: bigint;
    makerOrderIsBuy: boolean;
    makerFeePpm: number;
    clobPairId: number;
    fillAmount: bigint;
}
export interface MEVLiquidationMatchProtoMsg {
    typeUrl: "/klyraprotocol.clob.MEVLiquidationMatch";
    value: Uint8Array;
}
/**
 * MEVLiquidationMatch represents all necessary data to calculate MEV for a
 * liquidation.
 */
export interface MEVLiquidationMatchAmino {
    liquidated_subaccount_id?: SubaccountIdAmino;
    insurance_fund_delta_quote_quantums?: string;
    validator_fee_quote_quantums?: string;
    liquidity_fee_quote_quantums?: string;
    maker_order_subaccount_id?: SubaccountIdAmino;
    maker_order_subticks?: string;
    maker_order_is_buy?: boolean;
    maker_fee_ppm?: number;
    clob_pair_id?: number;
    fill_amount?: string;
}
export interface MEVLiquidationMatchAminoMsg {
    type: "/klyraprotocol.clob.MEVLiquidationMatch";
    value: MEVLiquidationMatchAmino;
}
/**
 * MEVLiquidationMatch represents all necessary data to calculate MEV for a
 * liquidation.
 */
export interface MEVLiquidationMatchSDKType {
    liquidated_subaccount_id: SubaccountIdSDKType;
    insurance_fund_delta_quote_quantums: bigint;
    validator_fee_quote_quantums: bigint;
    liquidity_fee_quote_quantums: bigint;
    maker_order_subaccount_id: SubaccountIdSDKType;
    maker_order_subticks: bigint;
    maker_order_is_buy: boolean;
    maker_fee_ppm: number;
    clob_pair_id: number;
    fill_amount: bigint;
}
/** ClobMidPrice contains the mid price of a CLOB pair, represented by it's ID. */
export interface ClobMidPrice {
    clobPair: ClobPair;
    subticks: bigint;
}
export interface ClobMidPriceProtoMsg {
    typeUrl: "/klyraprotocol.clob.ClobMidPrice";
    value: Uint8Array;
}
/** ClobMidPrice contains the mid price of a CLOB pair, represented by it's ID. */
export interface ClobMidPriceAmino {
    clob_pair?: ClobPairAmino;
    subticks?: string;
}
export interface ClobMidPriceAminoMsg {
    type: "/klyraprotocol.clob.ClobMidPrice";
    value: ClobMidPriceAmino;
}
/** ClobMidPrice contains the mid price of a CLOB pair, represented by it's ID. */
export interface ClobMidPriceSDKType {
    clob_pair: ClobPairSDKType;
    subticks: bigint;
}
/**
 * ValidatorMevMatches contains all matches from the validator's local
 * operations queue.
 */
export interface ValidatorMevMatches {
    matches: MEVMatch[];
    liquidationMatches: MEVLiquidationMatch[];
}
export interface ValidatorMevMatchesProtoMsg {
    typeUrl: "/klyraprotocol.clob.ValidatorMevMatches";
    value: Uint8Array;
}
/**
 * ValidatorMevMatches contains all matches from the validator's local
 * operations queue.
 */
export interface ValidatorMevMatchesAmino {
    matches?: MEVMatchAmino[];
    liquidation_matches?: MEVLiquidationMatchAmino[];
}
export interface ValidatorMevMatchesAminoMsg {
    type: "/klyraprotocol.clob.ValidatorMevMatches";
    value: ValidatorMevMatchesAmino;
}
/**
 * ValidatorMevMatches contains all matches from the validator's local
 * operations queue.
 */
export interface ValidatorMevMatchesSDKType {
    matches: MEVMatchSDKType[];
    liquidation_matches: MEVLiquidationMatchSDKType[];
}
/**
 * MevNodeToNodeMetrics is a data structure for encapsulating all MEV node <>
 * node metrics.
 */
export interface MevNodeToNodeMetrics {
    validatorMevMatches?: ValidatorMevMatches;
    clobMidPrices: ClobMidPrice[];
    bpMevMatches?: ValidatorMevMatches;
    proposalReceiveTime: bigint;
}
export interface MevNodeToNodeMetricsProtoMsg {
    typeUrl: "/klyraprotocol.clob.MevNodeToNodeMetrics";
    value: Uint8Array;
}
/**
 * MevNodeToNodeMetrics is a data structure for encapsulating all MEV node <>
 * node metrics.
 */
export interface MevNodeToNodeMetricsAmino {
    validator_mev_matches?: ValidatorMevMatchesAmino;
    clob_mid_prices?: ClobMidPriceAmino[];
    bp_mev_matches?: ValidatorMevMatchesAmino;
    proposal_receive_time?: string;
}
export interface MevNodeToNodeMetricsAminoMsg {
    type: "/klyraprotocol.clob.MevNodeToNodeMetrics";
    value: MevNodeToNodeMetricsAmino;
}
/**
 * MevNodeToNodeMetrics is a data structure for encapsulating all MEV node <>
 * node metrics.
 */
export interface MevNodeToNodeMetricsSDKType {
    validator_mev_matches?: ValidatorMevMatchesSDKType;
    clob_mid_prices: ClobMidPriceSDKType[];
    bp_mev_matches?: ValidatorMevMatchesSDKType;
    proposal_receive_time: bigint;
}
export declare const MEVMatch: {
    typeUrl: string;
    is(o: any): o is MEVMatch;
    isSDK(o: any): o is MEVMatchSDKType;
    isAmino(o: any): o is MEVMatchAmino;
    encode(message: MEVMatch, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MEVMatch;
    fromPartial(object: Partial<MEVMatch>): MEVMatch;
    fromAmino(object: MEVMatchAmino): MEVMatch;
    toAmino(message: MEVMatch): MEVMatchAmino;
    fromAminoMsg(object: MEVMatchAminoMsg): MEVMatch;
    fromProtoMsg(message: MEVMatchProtoMsg): MEVMatch;
    toProto(message: MEVMatch): Uint8Array;
    toProtoMsg(message: MEVMatch): MEVMatchProtoMsg;
};
export declare const MEVLiquidationMatch: {
    typeUrl: string;
    is(o: any): o is MEVLiquidationMatch;
    isSDK(o: any): o is MEVLiquidationMatchSDKType;
    isAmino(o: any): o is MEVLiquidationMatchAmino;
    encode(message: MEVLiquidationMatch, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MEVLiquidationMatch;
    fromPartial(object: Partial<MEVLiquidationMatch>): MEVLiquidationMatch;
    fromAmino(object: MEVLiquidationMatchAmino): MEVLiquidationMatch;
    toAmino(message: MEVLiquidationMatch): MEVLiquidationMatchAmino;
    fromAminoMsg(object: MEVLiquidationMatchAminoMsg): MEVLiquidationMatch;
    fromProtoMsg(message: MEVLiquidationMatchProtoMsg): MEVLiquidationMatch;
    toProto(message: MEVLiquidationMatch): Uint8Array;
    toProtoMsg(message: MEVLiquidationMatch): MEVLiquidationMatchProtoMsg;
};
export declare const ClobMidPrice: {
    typeUrl: string;
    is(o: any): o is ClobMidPrice;
    isSDK(o: any): o is ClobMidPriceSDKType;
    isAmino(o: any): o is ClobMidPriceAmino;
    encode(message: ClobMidPrice, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ClobMidPrice;
    fromPartial(object: Partial<ClobMidPrice>): ClobMidPrice;
    fromAmino(object: ClobMidPriceAmino): ClobMidPrice;
    toAmino(message: ClobMidPrice): ClobMidPriceAmino;
    fromAminoMsg(object: ClobMidPriceAminoMsg): ClobMidPrice;
    fromProtoMsg(message: ClobMidPriceProtoMsg): ClobMidPrice;
    toProto(message: ClobMidPrice): Uint8Array;
    toProtoMsg(message: ClobMidPrice): ClobMidPriceProtoMsg;
};
export declare const ValidatorMevMatches: {
    typeUrl: string;
    is(o: any): o is ValidatorMevMatches;
    isSDK(o: any): o is ValidatorMevMatchesSDKType;
    isAmino(o: any): o is ValidatorMevMatchesAmino;
    encode(message: ValidatorMevMatches, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ValidatorMevMatches;
    fromPartial(object: Partial<ValidatorMevMatches>): ValidatorMevMatches;
    fromAmino(object: ValidatorMevMatchesAmino): ValidatorMevMatches;
    toAmino(message: ValidatorMevMatches): ValidatorMevMatchesAmino;
    fromAminoMsg(object: ValidatorMevMatchesAminoMsg): ValidatorMevMatches;
    fromProtoMsg(message: ValidatorMevMatchesProtoMsg): ValidatorMevMatches;
    toProto(message: ValidatorMevMatches): Uint8Array;
    toProtoMsg(message: ValidatorMevMatches): ValidatorMevMatchesProtoMsg;
};
export declare const MevNodeToNodeMetrics: {
    typeUrl: string;
    is(o: any): o is MevNodeToNodeMetrics;
    isSDK(o: any): o is MevNodeToNodeMetricsSDKType;
    isAmino(o: any): o is MevNodeToNodeMetricsAmino;
    encode(message: MevNodeToNodeMetrics, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MevNodeToNodeMetrics;
    fromPartial(object: Partial<MevNodeToNodeMetrics>): MevNodeToNodeMetrics;
    fromAmino(object: MevNodeToNodeMetricsAmino): MevNodeToNodeMetrics;
    toAmino(message: MevNodeToNodeMetrics): MevNodeToNodeMetricsAmino;
    fromAminoMsg(object: MevNodeToNodeMetricsAminoMsg): MevNodeToNodeMetrics;
    fromProtoMsg(message: MevNodeToNodeMetricsProtoMsg): MevNodeToNodeMetrics;
    toProto(message: MevNodeToNodeMetrics): Uint8Array;
    toProtoMsg(message: MevNodeToNodeMetrics): MevNodeToNodeMetricsProtoMsg;
};
