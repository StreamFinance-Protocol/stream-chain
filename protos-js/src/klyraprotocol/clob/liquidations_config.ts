//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
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
function createBaseLiquidationsConfig(): LiquidationsConfig {
  return {
    insuranceFundFeePpm: 0,
    validatorFeePpm: 0,
    liquidityFeePpm: 0,
    fillablePriceConfig: FillablePriceConfig.fromPartial({}),
    maxCumulativeInsuranceFundDelta: BigInt(0)
  };
}
export const LiquidationsConfig = {
  typeUrl: "/klyraprotocol.clob.LiquidationsConfig",
  is(o: any): o is LiquidationsConfig {
    return o && (o.$typeUrl === LiquidationsConfig.typeUrl || typeof o.insuranceFundFeePpm === "number" && typeof o.validatorFeePpm === "number" && typeof o.liquidityFeePpm === "number" && FillablePriceConfig.is(o.fillablePriceConfig) && typeof o.maxCumulativeInsuranceFundDelta === "bigint");
  },
  isSDK(o: any): o is LiquidationsConfigSDKType {
    return o && (o.$typeUrl === LiquidationsConfig.typeUrl || typeof o.insurance_fund_fee_ppm === "number" && typeof o.validator_fee_ppm === "number" && typeof o.liquidity_fee_ppm === "number" && FillablePriceConfig.isSDK(o.fillable_price_config) && typeof o.max_cumulative_insurance_fund_delta === "bigint");
  },
  isAmino(o: any): o is LiquidationsConfigAmino {
    return o && (o.$typeUrl === LiquidationsConfig.typeUrl || typeof o.insurance_fund_fee_ppm === "number" && typeof o.validator_fee_ppm === "number" && typeof o.liquidity_fee_ppm === "number" && FillablePriceConfig.isAmino(o.fillable_price_config) && typeof o.max_cumulative_insurance_fund_delta === "bigint");
  },
  encode(message: LiquidationsConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.insuranceFundFeePpm !== 0) {
      writer.uint32(8).uint32(message.insuranceFundFeePpm);
    }
    if (message.validatorFeePpm !== 0) {
      writer.uint32(16).uint32(message.validatorFeePpm);
    }
    if (message.liquidityFeePpm !== 0) {
      writer.uint32(24).uint32(message.liquidityFeePpm);
    }
    if (message.fillablePriceConfig !== undefined) {
      FillablePriceConfig.encode(message.fillablePriceConfig, writer.uint32(34).fork()).ldelim();
    }
    if (message.maxCumulativeInsuranceFundDelta !== BigInt(0)) {
      writer.uint32(40).uint64(message.maxCumulativeInsuranceFundDelta);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LiquidationsConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidationsConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.insuranceFundFeePpm = reader.uint32();
          break;
        case 2:
          message.validatorFeePpm = reader.uint32();
          break;
        case 3:
          message.liquidityFeePpm = reader.uint32();
          break;
        case 4:
          message.fillablePriceConfig = FillablePriceConfig.decode(reader, reader.uint32());
          break;
        case 5:
          message.maxCumulativeInsuranceFundDelta = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LiquidationsConfig>): LiquidationsConfig {
    const message = createBaseLiquidationsConfig();
    message.insuranceFundFeePpm = object.insuranceFundFeePpm ?? 0;
    message.validatorFeePpm = object.validatorFeePpm ?? 0;
    message.liquidityFeePpm = object.liquidityFeePpm ?? 0;
    message.fillablePriceConfig = object.fillablePriceConfig !== undefined && object.fillablePriceConfig !== null ? FillablePriceConfig.fromPartial(object.fillablePriceConfig) : undefined;
    message.maxCumulativeInsuranceFundDelta = object.maxCumulativeInsuranceFundDelta !== undefined && object.maxCumulativeInsuranceFundDelta !== null ? BigInt(object.maxCumulativeInsuranceFundDelta.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: LiquidationsConfigAmino): LiquidationsConfig {
    const message = createBaseLiquidationsConfig();
    if (object.insurance_fund_fee_ppm !== undefined && object.insurance_fund_fee_ppm !== null) {
      message.insuranceFundFeePpm = object.insurance_fund_fee_ppm;
    }
    if (object.validator_fee_ppm !== undefined && object.validator_fee_ppm !== null) {
      message.validatorFeePpm = object.validator_fee_ppm;
    }
    if (object.liquidity_fee_ppm !== undefined && object.liquidity_fee_ppm !== null) {
      message.liquidityFeePpm = object.liquidity_fee_ppm;
    }
    if (object.fillable_price_config !== undefined && object.fillable_price_config !== null) {
      message.fillablePriceConfig = FillablePriceConfig.fromAmino(object.fillable_price_config);
    }
    if (object.max_cumulative_insurance_fund_delta !== undefined && object.max_cumulative_insurance_fund_delta !== null) {
      message.maxCumulativeInsuranceFundDelta = BigInt(object.max_cumulative_insurance_fund_delta);
    }
    return message;
  },
  toAmino(message: LiquidationsConfig): LiquidationsConfigAmino {
    const obj: any = {};
    obj.insurance_fund_fee_ppm = message.insuranceFundFeePpm === 0 ? undefined : message.insuranceFundFeePpm;
    obj.validator_fee_ppm = message.validatorFeePpm === 0 ? undefined : message.validatorFeePpm;
    obj.liquidity_fee_ppm = message.liquidityFeePpm === 0 ? undefined : message.liquidityFeePpm;
    obj.fillable_price_config = message.fillablePriceConfig ? FillablePriceConfig.toAmino(message.fillablePriceConfig) : undefined;
    obj.max_cumulative_insurance_fund_delta = message.maxCumulativeInsuranceFundDelta !== BigInt(0) ? message.maxCumulativeInsuranceFundDelta?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: LiquidationsConfigAminoMsg): LiquidationsConfig {
    return LiquidationsConfig.fromAmino(object.value);
  },
  fromProtoMsg(message: LiquidationsConfigProtoMsg): LiquidationsConfig {
    return LiquidationsConfig.decode(message.value);
  },
  toProto(message: LiquidationsConfig): Uint8Array {
    return LiquidationsConfig.encode(message).finish();
  },
  toProtoMsg(message: LiquidationsConfig): LiquidationsConfigProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.LiquidationsConfig",
      value: LiquidationsConfig.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(LiquidationsConfig.typeUrl, LiquidationsConfig);
function createBaseFillablePriceConfig(): FillablePriceConfig {
  return {
    bankruptcyAdjustmentPpm: 0,
    spreadToMaintenanceMarginRatioPpm: 0
  };
}
export const FillablePriceConfig = {
  typeUrl: "/klyraprotocol.clob.FillablePriceConfig",
  is(o: any): o is FillablePriceConfig {
    return o && (o.$typeUrl === FillablePriceConfig.typeUrl || typeof o.bankruptcyAdjustmentPpm === "number" && typeof o.spreadToMaintenanceMarginRatioPpm === "number");
  },
  isSDK(o: any): o is FillablePriceConfigSDKType {
    return o && (o.$typeUrl === FillablePriceConfig.typeUrl || typeof o.bankruptcy_adjustment_ppm === "number" && typeof o.spread_to_maintenance_margin_ratio_ppm === "number");
  },
  isAmino(o: any): o is FillablePriceConfigAmino {
    return o && (o.$typeUrl === FillablePriceConfig.typeUrl || typeof o.bankruptcy_adjustment_ppm === "number" && typeof o.spread_to_maintenance_margin_ratio_ppm === "number");
  },
  encode(message: FillablePriceConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.bankruptcyAdjustmentPpm !== 0) {
      writer.uint32(8).uint32(message.bankruptcyAdjustmentPpm);
    }
    if (message.spreadToMaintenanceMarginRatioPpm !== 0) {
      writer.uint32(16).uint32(message.spreadToMaintenanceMarginRatioPpm);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): FillablePriceConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFillablePriceConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bankruptcyAdjustmentPpm = reader.uint32();
          break;
        case 2:
          message.spreadToMaintenanceMarginRatioPpm = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FillablePriceConfig>): FillablePriceConfig {
    const message = createBaseFillablePriceConfig();
    message.bankruptcyAdjustmentPpm = object.bankruptcyAdjustmentPpm ?? 0;
    message.spreadToMaintenanceMarginRatioPpm = object.spreadToMaintenanceMarginRatioPpm ?? 0;
    return message;
  },
  fromAmino(object: FillablePriceConfigAmino): FillablePriceConfig {
    const message = createBaseFillablePriceConfig();
    if (object.bankruptcy_adjustment_ppm !== undefined && object.bankruptcy_adjustment_ppm !== null) {
      message.bankruptcyAdjustmentPpm = object.bankruptcy_adjustment_ppm;
    }
    if (object.spread_to_maintenance_margin_ratio_ppm !== undefined && object.spread_to_maintenance_margin_ratio_ppm !== null) {
      message.spreadToMaintenanceMarginRatioPpm = object.spread_to_maintenance_margin_ratio_ppm;
    }
    return message;
  },
  toAmino(message: FillablePriceConfig): FillablePriceConfigAmino {
    const obj: any = {};
    obj.bankruptcy_adjustment_ppm = message.bankruptcyAdjustmentPpm === 0 ? undefined : message.bankruptcyAdjustmentPpm;
    obj.spread_to_maintenance_margin_ratio_ppm = message.spreadToMaintenanceMarginRatioPpm === 0 ? undefined : message.spreadToMaintenanceMarginRatioPpm;
    return obj;
  },
  fromAminoMsg(object: FillablePriceConfigAminoMsg): FillablePriceConfig {
    return FillablePriceConfig.fromAmino(object.value);
  },
  fromProtoMsg(message: FillablePriceConfigProtoMsg): FillablePriceConfig {
    return FillablePriceConfig.decode(message.value);
  },
  toProto(message: FillablePriceConfig): Uint8Array {
    return FillablePriceConfig.encode(message).finish();
  },
  toProtoMsg(message: FillablePriceConfig): FillablePriceConfigProtoMsg {
    return {
      typeUrl: "/klyraprotocol.clob.FillablePriceConfig",
      value: FillablePriceConfig.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(FillablePriceConfig.typeUrl, FillablePriceConfig);