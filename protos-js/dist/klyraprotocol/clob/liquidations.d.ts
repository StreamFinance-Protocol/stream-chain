import { SubaccountId, SubaccountIdAmino, SubaccountIdSDKType } from "../subaccounts/subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * PerpetualLiquidationInfo holds information about a liquidation that occurred
 * for a position held by a subaccount.
 * Note this proto is defined to make it easier to hash
 * the metadata of a liquidation, and is never written to state.
 */
export interface PerpetualLiquidationInfo {
    /**
     * The id of the subaccount that got liquidated/deleveraged or was deleveraged
     * onto.
     */
    subaccountId: SubaccountId;
    /** The id of the perpetual involved. */
    perpetualId: number;
}
export interface PerpetualLiquidationInfoProtoMsg {
    typeUrl: "/klyraprotocol.clob.PerpetualLiquidationInfo";
    value: Uint8Array;
}
/**
 * PerpetualLiquidationInfo holds information about a liquidation that occurred
 * for a position held by a subaccount.
 * Note this proto is defined to make it easier to hash
 * the metadata of a liquidation, and is never written to state.
 */
export interface PerpetualLiquidationInfoAmino {
    /**
     * The id of the subaccount that got liquidated/deleveraged or was deleveraged
     * onto.
     */
    subaccount_id?: SubaccountIdAmino;
    /** The id of the perpetual involved. */
    perpetual_id?: number;
}
export interface PerpetualLiquidationInfoAminoMsg {
    type: "/klyraprotocol.clob.PerpetualLiquidationInfo";
    value: PerpetualLiquidationInfoAmino;
}
/**
 * PerpetualLiquidationInfo holds information about a liquidation that occurred
 * for a position held by a subaccount.
 * Note this proto is defined to make it easier to hash
 * the metadata of a liquidation, and is never written to state.
 */
export interface PerpetualLiquidationInfoSDKType {
    subaccount_id: SubaccountIdSDKType;
    perpetual_id: number;
}
/**
 * SubaccountLiquidationInfo holds liquidation information per-subaccount in the
 * current block.
 */
export interface SubaccountLiquidationInfo {
    /**
     * An unsorted list of unique perpetual IDs that the subaccount has previously
     * liquidated.
     */
    perpetualsLiquidated: number[];
}
export interface SubaccountLiquidationInfoProtoMsg {
    typeUrl: "/klyraprotocol.clob.SubaccountLiquidationInfo";
    value: Uint8Array;
}
/**
 * SubaccountLiquidationInfo holds liquidation information per-subaccount in the
 * current block.
 */
export interface SubaccountLiquidationInfoAmino {
    /**
     * An unsorted list of unique perpetual IDs that the subaccount has previously
     * liquidated.
     */
    perpetuals_liquidated?: number[];
}
export interface SubaccountLiquidationInfoAminoMsg {
    type: "/klyraprotocol.clob.SubaccountLiquidationInfo";
    value: SubaccountLiquidationInfoAmino;
}
/**
 * SubaccountLiquidationInfo holds liquidation information per-subaccount in the
 * current block.
 */
export interface SubaccountLiquidationInfoSDKType {
    perpetuals_liquidated: number[];
}
/**
 * SubaccountOpenPositionInfo holds information about open positions for a
 * perpetual.
 */
export interface SubaccountOpenPositionInfo {
    /** The id of the perpetual. */
    perpetualId: number;
    subaccountsWithLongPosition: SubaccountId[];
    subaccountsWithShortPosition: SubaccountId[];
}
export interface SubaccountOpenPositionInfoProtoMsg {
    typeUrl: "/klyraprotocol.clob.SubaccountOpenPositionInfo";
    value: Uint8Array;
}
/**
 * SubaccountOpenPositionInfo holds information about open positions for a
 * perpetual.
 */
export interface SubaccountOpenPositionInfoAmino {
    /** The id of the perpetual. */
    perpetual_id?: number;
    subaccounts_with_long_position?: SubaccountIdAmino[];
    subaccounts_with_short_position?: SubaccountIdAmino[];
}
export interface SubaccountOpenPositionInfoAminoMsg {
    type: "/klyraprotocol.clob.SubaccountOpenPositionInfo";
    value: SubaccountOpenPositionInfoAmino;
}
/**
 * SubaccountOpenPositionInfo holds information about open positions for a
 * perpetual.
 */
export interface SubaccountOpenPositionInfoSDKType {
    perpetual_id: number;
    subaccounts_with_long_position: SubaccountIdSDKType[];
    subaccounts_with_short_position: SubaccountIdSDKType[];
}
export declare const PerpetualLiquidationInfo: {
    typeUrl: string;
    is(o: any): o is PerpetualLiquidationInfo;
    isSDK(o: any): o is PerpetualLiquidationInfoSDKType;
    isAmino(o: any): o is PerpetualLiquidationInfoAmino;
    encode(message: PerpetualLiquidationInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PerpetualLiquidationInfo;
    fromPartial(object: Partial<PerpetualLiquidationInfo>): PerpetualLiquidationInfo;
    fromAmino(object: PerpetualLiquidationInfoAmino): PerpetualLiquidationInfo;
    toAmino(message: PerpetualLiquidationInfo): PerpetualLiquidationInfoAmino;
    fromAminoMsg(object: PerpetualLiquidationInfoAminoMsg): PerpetualLiquidationInfo;
    fromProtoMsg(message: PerpetualLiquidationInfoProtoMsg): PerpetualLiquidationInfo;
    toProto(message: PerpetualLiquidationInfo): Uint8Array;
    toProtoMsg(message: PerpetualLiquidationInfo): PerpetualLiquidationInfoProtoMsg;
};
export declare const SubaccountLiquidationInfo: {
    typeUrl: string;
    is(o: any): o is SubaccountLiquidationInfo;
    isSDK(o: any): o is SubaccountLiquidationInfoSDKType;
    isAmino(o: any): o is SubaccountLiquidationInfoAmino;
    encode(message: SubaccountLiquidationInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SubaccountLiquidationInfo;
    fromPartial(object: Partial<SubaccountLiquidationInfo>): SubaccountLiquidationInfo;
    fromAmino(object: SubaccountLiquidationInfoAmino): SubaccountLiquidationInfo;
    toAmino(message: SubaccountLiquidationInfo): SubaccountLiquidationInfoAmino;
    fromAminoMsg(object: SubaccountLiquidationInfoAminoMsg): SubaccountLiquidationInfo;
    fromProtoMsg(message: SubaccountLiquidationInfoProtoMsg): SubaccountLiquidationInfo;
    toProto(message: SubaccountLiquidationInfo): Uint8Array;
    toProtoMsg(message: SubaccountLiquidationInfo): SubaccountLiquidationInfoProtoMsg;
};
export declare const SubaccountOpenPositionInfo: {
    typeUrl: string;
    is(o: any): o is SubaccountOpenPositionInfo;
    isSDK(o: any): o is SubaccountOpenPositionInfoSDKType;
    isAmino(o: any): o is SubaccountOpenPositionInfoAmino;
    encode(message: SubaccountOpenPositionInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SubaccountOpenPositionInfo;
    fromPartial(object: Partial<SubaccountOpenPositionInfo>): SubaccountOpenPositionInfo;
    fromAmino(object: SubaccountOpenPositionInfoAmino): SubaccountOpenPositionInfo;
    toAmino(message: SubaccountOpenPositionInfo): SubaccountOpenPositionInfoAmino;
    fromAminoMsg(object: SubaccountOpenPositionInfoAminoMsg): SubaccountOpenPositionInfo;
    fromProtoMsg(message: SubaccountOpenPositionInfoProtoMsg): SubaccountOpenPositionInfo;
    toProto(message: SubaccountOpenPositionInfo): Uint8Array;
    toProtoMsg(message: SubaccountOpenPositionInfo): SubaccountOpenPositionInfoProtoMsg;
};
