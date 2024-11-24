"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillablePriceConfig = exports.LiquidationsConfig = void 0;
//@ts-nocheck
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseLiquidationsConfig() {
    return {
        insuranceFundFeePpm: 0,
        validatorFeePpm: 0,
        liquidityFeePpm: 0,
        fillablePriceConfig: exports.FillablePriceConfig.fromPartial({}),
        maxCumulativeInsuranceFundDelta: BigInt(0)
    };
}
exports.LiquidationsConfig = {
    typeUrl: "/klyraprotocol.clob.LiquidationsConfig",
    is(o) {
        return o && (o.$typeUrl === exports.LiquidationsConfig.typeUrl || typeof o.insuranceFundFeePpm === "number" && typeof o.validatorFeePpm === "number" && typeof o.liquidityFeePpm === "number" && exports.FillablePriceConfig.is(o.fillablePriceConfig) && typeof o.maxCumulativeInsuranceFundDelta === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.LiquidationsConfig.typeUrl || typeof o.insurance_fund_fee_ppm === "number" && typeof o.validator_fee_ppm === "number" && typeof o.liquidity_fee_ppm === "number" && exports.FillablePriceConfig.isSDK(o.fillable_price_config) && typeof o.max_cumulative_insurance_fund_delta === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.LiquidationsConfig.typeUrl || typeof o.insurance_fund_fee_ppm === "number" && typeof o.validator_fee_ppm === "number" && typeof o.liquidity_fee_ppm === "number" && exports.FillablePriceConfig.isAmino(o.fillable_price_config) && typeof o.max_cumulative_insurance_fund_delta === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
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
            exports.FillablePriceConfig.encode(message.fillablePriceConfig, writer.uint32(34).fork()).ldelim();
        }
        if (message.maxCumulativeInsuranceFundDelta !== BigInt(0)) {
            writer.uint32(40).uint64(message.maxCumulativeInsuranceFundDelta);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
                    message.fillablePriceConfig = exports.FillablePriceConfig.decode(reader, reader.uint32());
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
    fromPartial(object) {
        const message = createBaseLiquidationsConfig();
        message.insuranceFundFeePpm = object.insuranceFundFeePpm ?? 0;
        message.validatorFeePpm = object.validatorFeePpm ?? 0;
        message.liquidityFeePpm = object.liquidityFeePpm ?? 0;
        message.fillablePriceConfig = object.fillablePriceConfig !== undefined && object.fillablePriceConfig !== null ? exports.FillablePriceConfig.fromPartial(object.fillablePriceConfig) : undefined;
        message.maxCumulativeInsuranceFundDelta = object.maxCumulativeInsuranceFundDelta !== undefined && object.maxCumulativeInsuranceFundDelta !== null ? BigInt(object.maxCumulativeInsuranceFundDelta.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
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
            message.fillablePriceConfig = exports.FillablePriceConfig.fromAmino(object.fillable_price_config);
        }
        if (object.max_cumulative_insurance_fund_delta !== undefined && object.max_cumulative_insurance_fund_delta !== null) {
            message.maxCumulativeInsuranceFundDelta = BigInt(object.max_cumulative_insurance_fund_delta);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.insurance_fund_fee_ppm = message.insuranceFundFeePpm === 0 ? undefined : message.insuranceFundFeePpm;
        obj.validator_fee_ppm = message.validatorFeePpm === 0 ? undefined : message.validatorFeePpm;
        obj.liquidity_fee_ppm = message.liquidityFeePpm === 0 ? undefined : message.liquidityFeePpm;
        obj.fillable_price_config = message.fillablePriceConfig ? exports.FillablePriceConfig.toAmino(message.fillablePriceConfig) : undefined;
        obj.max_cumulative_insurance_fund_delta = message.maxCumulativeInsuranceFundDelta !== BigInt(0) ? message.maxCumulativeInsuranceFundDelta?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.LiquidationsConfig.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.LiquidationsConfig.decode(message.value);
    },
    toProto(message) {
        return exports.LiquidationsConfig.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.LiquidationsConfig",
            value: exports.LiquidationsConfig.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.LiquidationsConfig.typeUrl, exports.LiquidationsConfig);
function createBaseFillablePriceConfig() {
    return {
        bankruptcyAdjustmentPpm: 0,
        spreadToMaintenanceMarginRatioPpm: 0
    };
}
exports.FillablePriceConfig = {
    typeUrl: "/klyraprotocol.clob.FillablePriceConfig",
    is(o) {
        return o && (o.$typeUrl === exports.FillablePriceConfig.typeUrl || typeof o.bankruptcyAdjustmentPpm === "number" && typeof o.spreadToMaintenanceMarginRatioPpm === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.FillablePriceConfig.typeUrl || typeof o.bankruptcy_adjustment_ppm === "number" && typeof o.spread_to_maintenance_margin_ratio_ppm === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.FillablePriceConfig.typeUrl || typeof o.bankruptcy_adjustment_ppm === "number" && typeof o.spread_to_maintenance_margin_ratio_ppm === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.bankruptcyAdjustmentPpm !== 0) {
            writer.uint32(8).uint32(message.bankruptcyAdjustmentPpm);
        }
        if (message.spreadToMaintenanceMarginRatioPpm !== 0) {
            writer.uint32(16).uint32(message.spreadToMaintenanceMarginRatioPpm);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
    fromPartial(object) {
        const message = createBaseFillablePriceConfig();
        message.bankruptcyAdjustmentPpm = object.bankruptcyAdjustmentPpm ?? 0;
        message.spreadToMaintenanceMarginRatioPpm = object.spreadToMaintenanceMarginRatioPpm ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseFillablePriceConfig();
        if (object.bankruptcy_adjustment_ppm !== undefined && object.bankruptcy_adjustment_ppm !== null) {
            message.bankruptcyAdjustmentPpm = object.bankruptcy_adjustment_ppm;
        }
        if (object.spread_to_maintenance_margin_ratio_ppm !== undefined && object.spread_to_maintenance_margin_ratio_ppm !== null) {
            message.spreadToMaintenanceMarginRatioPpm = object.spread_to_maintenance_margin_ratio_ppm;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.bankruptcy_adjustment_ppm = message.bankruptcyAdjustmentPpm === 0 ? undefined : message.bankruptcyAdjustmentPpm;
        obj.spread_to_maintenance_margin_ratio_ppm = message.spreadToMaintenanceMarginRatioPpm === 0 ? undefined : message.spreadToMaintenanceMarginRatioPpm;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.FillablePriceConfig.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.FillablePriceConfig.decode(message.value);
    },
    toProto(message) {
        return exports.FillablePriceConfig.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.FillablePriceConfig",
            value: exports.FillablePriceConfig.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.FillablePriceConfig.typeUrl, exports.FillablePriceConfig);
