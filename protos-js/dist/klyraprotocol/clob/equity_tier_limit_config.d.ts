import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * Defines the set of equity tiers to limit how many open orders
 * a subaccount is allowed to have.
 */
export interface EquityTierLimitConfiguration {
    /**
     * How many short term stateful orders are allowed per equity tier.
     * Specifying 0 values disables this limit.
     */
    shortTermOrderEquityTiers: EquityTierLimit[];
    /**
     * How many open stateful orders are allowed per equity tier.
     * Specifying 0 values disables this limit.
     */
    statefulOrderEquityTiers: EquityTierLimit[];
}
export interface EquityTierLimitConfigurationProtoMsg {
    typeUrl: "/klyraprotocol.clob.EquityTierLimitConfiguration";
    value: Uint8Array;
}
/**
 * Defines the set of equity tiers to limit how many open orders
 * a subaccount is allowed to have.
 */
export interface EquityTierLimitConfigurationAmino {
    /**
     * How many short term stateful orders are allowed per equity tier.
     * Specifying 0 values disables this limit.
     */
    short_term_order_equity_tiers?: EquityTierLimitAmino[];
    /**
     * How many open stateful orders are allowed per equity tier.
     * Specifying 0 values disables this limit.
     */
    stateful_order_equity_tiers?: EquityTierLimitAmino[];
}
export interface EquityTierLimitConfigurationAminoMsg {
    type: "/klyraprotocol.clob.EquityTierLimitConfiguration";
    value: EquityTierLimitConfigurationAmino;
}
/**
 * Defines the set of equity tiers to limit how many open orders
 * a subaccount is allowed to have.
 */
export interface EquityTierLimitConfigurationSDKType {
    short_term_order_equity_tiers: EquityTierLimitSDKType[];
    stateful_order_equity_tiers: EquityTierLimitSDKType[];
}
/** Defines an equity tier limit. */
export interface EquityTierLimit {
    /** The total net collateral in TDAI quote quantums of equity required. */
    usdTncRequired: Uint8Array;
    /** What the limit is for `usd_tnc_required`. */
    limit: number;
}
export interface EquityTierLimitProtoMsg {
    typeUrl: "/klyraprotocol.clob.EquityTierLimit";
    value: Uint8Array;
}
/** Defines an equity tier limit. */
export interface EquityTierLimitAmino {
    /** The total net collateral in TDAI quote quantums of equity required. */
    usd_tnc_required?: string;
    /** What the limit is for `usd_tnc_required`. */
    limit?: number;
}
export interface EquityTierLimitAminoMsg {
    type: "/klyraprotocol.clob.EquityTierLimit";
    value: EquityTierLimitAmino;
}
/** Defines an equity tier limit. */
export interface EquityTierLimitSDKType {
    usd_tnc_required: Uint8Array;
    limit: number;
}
export declare const EquityTierLimitConfiguration: {
    typeUrl: string;
    is(o: any): o is EquityTierLimitConfiguration;
    isSDK(o: any): o is EquityTierLimitConfigurationSDKType;
    isAmino(o: any): o is EquityTierLimitConfigurationAmino;
    encode(message: EquityTierLimitConfiguration, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): EquityTierLimitConfiguration;
    fromPartial(object: Partial<EquityTierLimitConfiguration>): EquityTierLimitConfiguration;
    fromAmino(object: EquityTierLimitConfigurationAmino): EquityTierLimitConfiguration;
    toAmino(message: EquityTierLimitConfiguration): EquityTierLimitConfigurationAmino;
    fromAminoMsg(object: EquityTierLimitConfigurationAminoMsg): EquityTierLimitConfiguration;
    fromProtoMsg(message: EquityTierLimitConfigurationProtoMsg): EquityTierLimitConfiguration;
    toProto(message: EquityTierLimitConfiguration): Uint8Array;
    toProtoMsg(message: EquityTierLimitConfiguration): EquityTierLimitConfigurationProtoMsg;
};
export declare const EquityTierLimit: {
    typeUrl: string;
    is(o: any): o is EquityTierLimit;
    isSDK(o: any): o is EquityTierLimitSDKType;
    isAmino(o: any): o is EquityTierLimitAmino;
    encode(message: EquityTierLimit, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): EquityTierLimit;
    fromPartial(object: Partial<EquityTierLimit>): EquityTierLimit;
    fromAmino(object: EquityTierLimitAmino): EquityTierLimit;
    toAmino(message: EquityTierLimit): EquityTierLimitAmino;
    fromAminoMsg(object: EquityTierLimitAminoMsg): EquityTierLimit;
    fromProtoMsg(message: EquityTierLimitProtoMsg): EquityTierLimit;
    toProto(message: EquityTierLimit): Uint8Array;
    toProtoMsg(message: EquityTierLimit): EquityTierLimitProtoMsg;
};
