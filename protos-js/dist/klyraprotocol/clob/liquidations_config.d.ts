import { BinaryReader, BinaryWriter } from "../../binary";
/** LiquidationsConfig stores all configurable fields related to liquidations. */
export interface LiquidationsConfig {
    /**
     * The maximum liquidation fee (in parts-per-million). This fee goes
     * 100% to the insurance fund.
     */
    insuranceFundFeePpm: number;
    /** The fraction of the remaining collateral taken as a validator fee. */
    validatorFeePpm: number;
    /** The fraction of the remaining collateral taken as a liquidity fee. */
    liquidityFeePpm: number;
    /**
     * Config about how the fillable-price spread from the oracle price
     * increases based on the adjusted bankruptcy rating of the subaccount.
     */
    fillablePriceConfig: FillablePriceConfig;
    /** The maximum value that the cumulative insurance fund delta can take. */
    maxCumulativeInsuranceFundDelta: bigint;
}
export interface LiquidationsConfigProtoMsg {
    typeUrl: "/klyraprotocol.clob.LiquidationsConfig";
    value: Uint8Array;
}
/** LiquidationsConfig stores all configurable fields related to liquidations. */
export interface LiquidationsConfigAmino {
    /**
     * The maximum liquidation fee (in parts-per-million). This fee goes
     * 100% to the insurance fund.
     */
    insurance_fund_fee_ppm?: number;
    /** The fraction of the remaining collateral taken as a validator fee. */
    validator_fee_ppm?: number;
    /** The fraction of the remaining collateral taken as a liquidity fee. */
    liquidity_fee_ppm?: number;
    /**
     * Config about how the fillable-price spread from the oracle price
     * increases based on the adjusted bankruptcy rating of the subaccount.
     */
    fillable_price_config?: FillablePriceConfigAmino;
    /** The maximum value that the cumulative insurance fund delta can take. */
    max_cumulative_insurance_fund_delta?: string;
}
export interface LiquidationsConfigAminoMsg {
    type: "/klyraprotocol.clob.LiquidationsConfig";
    value: LiquidationsConfigAmino;
}
/** LiquidationsConfig stores all configurable fields related to liquidations. */
export interface LiquidationsConfigSDKType {
    insurance_fund_fee_ppm: number;
    validator_fee_ppm: number;
    liquidity_fee_ppm: number;
    fillable_price_config: FillablePriceConfigSDKType;
    max_cumulative_insurance_fund_delta: bigint;
}
/**
 * FillablePriceConfig stores all configurable fields related to calculating
 * the fillable price for liquidating a position.
 */
export interface FillablePriceConfig {
    /** The rate at which the Adjusted Bankruptcy Rating increases. */
    bankruptcyAdjustmentPpm: number;
    /**
     * The maximum value that the liquidation spread can take, as
     * a ratio against the position's maintenance margin.
     */
    spreadToMaintenanceMarginRatioPpm: number;
}
export interface FillablePriceConfigProtoMsg {
    typeUrl: "/klyraprotocol.clob.FillablePriceConfig";
    value: Uint8Array;
}
/**
 * FillablePriceConfig stores all configurable fields related to calculating
 * the fillable price for liquidating a position.
 */
export interface FillablePriceConfigAmino {
    /** The rate at which the Adjusted Bankruptcy Rating increases. */
    bankruptcy_adjustment_ppm?: number;
    /**
     * The maximum value that the liquidation spread can take, as
     * a ratio against the position's maintenance margin.
     */
    spread_to_maintenance_margin_ratio_ppm?: number;
}
export interface FillablePriceConfigAminoMsg {
    type: "/klyraprotocol.clob.FillablePriceConfig";
    value: FillablePriceConfigAmino;
}
/**
 * FillablePriceConfig stores all configurable fields related to calculating
 * the fillable price for liquidating a position.
 */
export interface FillablePriceConfigSDKType {
    bankruptcy_adjustment_ppm: number;
    spread_to_maintenance_margin_ratio_ppm: number;
}
export declare const LiquidationsConfig: {
    typeUrl: string;
    is(o: any): o is LiquidationsConfig;
    isSDK(o: any): o is LiquidationsConfigSDKType;
    isAmino(o: any): o is LiquidationsConfigAmino;
    encode(message: LiquidationsConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): LiquidationsConfig;
    fromPartial(object: Partial<LiquidationsConfig>): LiquidationsConfig;
    fromAmino(object: LiquidationsConfigAmino): LiquidationsConfig;
    toAmino(message: LiquidationsConfig): LiquidationsConfigAmino;
    fromAminoMsg(object: LiquidationsConfigAminoMsg): LiquidationsConfig;
    fromProtoMsg(message: LiquidationsConfigProtoMsg): LiquidationsConfig;
    toProto(message: LiquidationsConfig): Uint8Array;
    toProtoMsg(message: LiquidationsConfig): LiquidationsConfigProtoMsg;
};
export declare const FillablePriceConfig: {
    typeUrl: string;
    is(o: any): o is FillablePriceConfig;
    isSDK(o: any): o is FillablePriceConfigSDKType;
    isAmino(o: any): o is FillablePriceConfigAmino;
    encode(message: FillablePriceConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): FillablePriceConfig;
    fromPartial(object: Partial<FillablePriceConfig>): FillablePriceConfig;
    fromAmino(object: FillablePriceConfigAmino): FillablePriceConfig;
    toAmino(message: FillablePriceConfig): FillablePriceConfigAmino;
    fromAminoMsg(object: FillablePriceConfigAminoMsg): FillablePriceConfig;
    fromProtoMsg(message: FillablePriceConfigProtoMsg): FillablePriceConfig;
    toProto(message: FillablePriceConfig): Uint8Array;
    toProtoMsg(message: FillablePriceConfig): FillablePriceConfigProtoMsg;
};
