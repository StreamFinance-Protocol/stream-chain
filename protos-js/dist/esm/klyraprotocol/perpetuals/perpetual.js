//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { bytesFromBase64, base64FromBytes, isSet } from "../../helpers";
import { GlobalDecoderRegistry } from "../../registry";
export var PerpetualMarketType;
(function (PerpetualMarketType) {
    /** PERPETUAL_MARKET_TYPE_CROSS - Market type for cross margin perpetual markets. */
    PerpetualMarketType[PerpetualMarketType["PERPETUAL_MARKET_TYPE_CROSS"] = 0] = "PERPETUAL_MARKET_TYPE_CROSS";
    /** PERPETUAL_MARKET_TYPE_ISOLATED - Market type for isolated margin perpetual markets. */
    PerpetualMarketType[PerpetualMarketType["PERPETUAL_MARKET_TYPE_ISOLATED"] = 1] = "PERPETUAL_MARKET_TYPE_ISOLATED";
    PerpetualMarketType[PerpetualMarketType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(PerpetualMarketType || (PerpetualMarketType = {}));
export const PerpetualMarketTypeSDKType = PerpetualMarketType;
export const PerpetualMarketTypeAmino = PerpetualMarketType;
export function perpetualMarketTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "PERPETUAL_MARKET_TYPE_CROSS":
            return PerpetualMarketType.PERPETUAL_MARKET_TYPE_CROSS;
        case 1:
        case "PERPETUAL_MARKET_TYPE_ISOLATED":
            return PerpetualMarketType.PERPETUAL_MARKET_TYPE_ISOLATED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return PerpetualMarketType.UNRECOGNIZED;
    }
}
export function perpetualMarketTypeToJSON(object) {
    switch (object) {
        case PerpetualMarketType.PERPETUAL_MARKET_TYPE_CROSS:
            return "PERPETUAL_MARKET_TYPE_CROSS";
        case PerpetualMarketType.PERPETUAL_MARKET_TYPE_ISOLATED:
            return "PERPETUAL_MARKET_TYPE_ISOLATED";
        case PerpetualMarketType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBasePerpetual() {
    return {
        params: PerpetualParams.fromPartial({}),
        fundingIndex: new Uint8Array(),
        openInterest: new Uint8Array(),
        lastFundingRate: new Uint8Array(),
        yieldIndex: ""
    };
}
export const Perpetual = {
    typeUrl: "/klyraprotocol.perpetuals.Perpetual",
    is(o) {
        return o && (o.$typeUrl === Perpetual.typeUrl || PerpetualParams.is(o.params) && (o.fundingIndex instanceof Uint8Array || typeof o.fundingIndex === "string") && (o.openInterest instanceof Uint8Array || typeof o.openInterest === "string") && (o.lastFundingRate instanceof Uint8Array || typeof o.lastFundingRate === "string") && typeof o.yieldIndex === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Perpetual.typeUrl || PerpetualParams.isSDK(o.params) && (o.funding_index instanceof Uint8Array || typeof o.funding_index === "string") && (o.open_interest instanceof Uint8Array || typeof o.open_interest === "string") && (o.last_funding_rate instanceof Uint8Array || typeof o.last_funding_rate === "string") && typeof o.yield_index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Perpetual.typeUrl || PerpetualParams.isAmino(o.params) && (o.funding_index instanceof Uint8Array || typeof o.funding_index === "string") && (o.open_interest instanceof Uint8Array || typeof o.open_interest === "string") && (o.last_funding_rate instanceof Uint8Array || typeof o.last_funding_rate === "string") && typeof o.yield_index === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.params !== undefined) {
            PerpetualParams.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        if (message.fundingIndex.length !== 0) {
            writer.uint32(18).bytes(message.fundingIndex);
        }
        if (message.openInterest.length !== 0) {
            writer.uint32(26).bytes(message.openInterest);
        }
        if (message.lastFundingRate.length !== 0) {
            writer.uint32(34).bytes(message.lastFundingRate);
        }
        if (message.yieldIndex !== "") {
            writer.uint32(42).string(message.yieldIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePerpetual();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = PerpetualParams.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.fundingIndex = reader.bytes();
                    break;
                case 3:
                    message.openInterest = reader.bytes();
                    break;
                case 4:
                    message.lastFundingRate = reader.bytes();
                    break;
                case 5:
                    message.yieldIndex = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePerpetual();
        message.params = object.params !== undefined && object.params !== null ? PerpetualParams.fromPartial(object.params) : undefined;
        message.fundingIndex = object.fundingIndex ?? new Uint8Array();
        message.openInterest = object.openInterest ?? new Uint8Array();
        message.lastFundingRate = object.lastFundingRate ?? new Uint8Array();
        message.yieldIndex = object.yieldIndex ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBasePerpetual();
        if (object.params !== undefined && object.params !== null) {
            message.params = PerpetualParams.fromAmino(object.params);
        }
        if (object.funding_index !== undefined && object.funding_index !== null) {
            message.fundingIndex = bytesFromBase64(object.funding_index);
        }
        if (object.open_interest !== undefined && object.open_interest !== null) {
            message.openInterest = bytesFromBase64(object.open_interest);
        }
        if (object.last_funding_rate !== undefined && object.last_funding_rate !== null) {
            message.lastFundingRate = bytesFromBase64(object.last_funding_rate);
        }
        if (object.yield_index !== undefined && object.yield_index !== null) {
            message.yieldIndex = object.yield_index;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? PerpetualParams.toAmino(message.params) : undefined;
        obj.funding_index = message.fundingIndex ? base64FromBytes(message.fundingIndex) : undefined;
        obj.open_interest = message.openInterest ? base64FromBytes(message.openInterest) : undefined;
        obj.last_funding_rate = message.lastFundingRate ? base64FromBytes(message.lastFundingRate) : undefined;
        obj.yield_index = message.yieldIndex === "" ? undefined : message.yieldIndex;
        return obj;
    },
    fromAminoMsg(object) {
        return Perpetual.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return Perpetual.decode(message.value);
    },
    toProto(message) {
        return Perpetual.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.Perpetual",
            value: Perpetual.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Perpetual.typeUrl, Perpetual);
function createBasePerpetualParams() {
    return {
        id: 0,
        ticker: "",
        marketId: 0,
        atomicResolution: 0,
        defaultFundingPpm: 0,
        liquidityTier: 0,
        marketType: 0,
        dangerIndexPpm: 0,
        isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock: BigInt(0)
    };
}
export const PerpetualParams = {
    typeUrl: "/klyraprotocol.perpetuals.PerpetualParams",
    is(o) {
        return o && (o.$typeUrl === PerpetualParams.typeUrl || typeof o.id === "number" && typeof o.ticker === "string" && typeof o.marketId === "number" && typeof o.atomicResolution === "number" && typeof o.defaultFundingPpm === "number" && typeof o.liquidityTier === "number" && isSet(o.marketType) && typeof o.dangerIndexPpm === "number" && typeof o.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === PerpetualParams.typeUrl || typeof o.id === "number" && typeof o.ticker === "string" && typeof o.market_id === "number" && typeof o.atomic_resolution === "number" && typeof o.default_funding_ppm === "number" && typeof o.liquidity_tier === "number" && isSet(o.market_type) && typeof o.danger_index_ppm === "number" && typeof o.isolated_market_max_cumulative_insurance_fund_delta_per_block === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === PerpetualParams.typeUrl || typeof o.id === "number" && typeof o.ticker === "string" && typeof o.market_id === "number" && typeof o.atomic_resolution === "number" && typeof o.default_funding_ppm === "number" && typeof o.liquidity_tier === "number" && isSet(o.market_type) && typeof o.danger_index_ppm === "number" && typeof o.isolated_market_max_cumulative_insurance_fund_delta_per_block === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.ticker !== "") {
            writer.uint32(18).string(message.ticker);
        }
        if (message.marketId !== 0) {
            writer.uint32(24).uint32(message.marketId);
        }
        if (message.atomicResolution !== 0) {
            writer.uint32(32).sint32(message.atomicResolution);
        }
        if (message.defaultFundingPpm !== 0) {
            writer.uint32(40).sint32(message.defaultFundingPpm);
        }
        if (message.liquidityTier !== 0) {
            writer.uint32(48).uint32(message.liquidityTier);
        }
        if (message.marketType !== 0) {
            writer.uint32(56).int32(message.marketType);
        }
        if (message.dangerIndexPpm !== 0) {
            writer.uint32(64).uint32(message.dangerIndexPpm);
        }
        if (message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock !== BigInt(0)) {
            writer.uint32(72).uint64(message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePerpetualParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.ticker = reader.string();
                    break;
                case 3:
                    message.marketId = reader.uint32();
                    break;
                case 4:
                    message.atomicResolution = reader.sint32();
                    break;
                case 5:
                    message.defaultFundingPpm = reader.sint32();
                    break;
                case 6:
                    message.liquidityTier = reader.uint32();
                    break;
                case 7:
                    message.marketType = reader.int32();
                    break;
                case 8:
                    message.dangerIndexPpm = reader.uint32();
                    break;
                case 9:
                    message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePerpetualParams();
        message.id = object.id ?? 0;
        message.ticker = object.ticker ?? "";
        message.marketId = object.marketId ?? 0;
        message.atomicResolution = object.atomicResolution ?? 0;
        message.defaultFundingPpm = object.defaultFundingPpm ?? 0;
        message.liquidityTier = object.liquidityTier ?? 0;
        message.marketType = object.marketType ?? 0;
        message.dangerIndexPpm = object.dangerIndexPpm ?? 0;
        message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock = object.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock !== undefined && object.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock !== null ? BigInt(object.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBasePerpetualParams();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.ticker !== undefined && object.ticker !== null) {
            message.ticker = object.ticker;
        }
        if (object.market_id !== undefined && object.market_id !== null) {
            message.marketId = object.market_id;
        }
        if (object.atomic_resolution !== undefined && object.atomic_resolution !== null) {
            message.atomicResolution = object.atomic_resolution;
        }
        if (object.default_funding_ppm !== undefined && object.default_funding_ppm !== null) {
            message.defaultFundingPpm = object.default_funding_ppm;
        }
        if (object.liquidity_tier !== undefined && object.liquidity_tier !== null) {
            message.liquidityTier = object.liquidity_tier;
        }
        if (object.market_type !== undefined && object.market_type !== null) {
            message.marketType = object.market_type;
        }
        if (object.danger_index_ppm !== undefined && object.danger_index_ppm !== null) {
            message.dangerIndexPpm = object.danger_index_ppm;
        }
        if (object.isolated_market_max_cumulative_insurance_fund_delta_per_block !== undefined && object.isolated_market_max_cumulative_insurance_fund_delta_per_block !== null) {
            message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock = BigInt(object.isolated_market_max_cumulative_insurance_fund_delta_per_block);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.ticker = message.ticker === "" ? undefined : message.ticker;
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        obj.atomic_resolution = message.atomicResolution === 0 ? undefined : message.atomicResolution;
        obj.default_funding_ppm = message.defaultFundingPpm === 0 ? undefined : message.defaultFundingPpm;
        obj.liquidity_tier = message.liquidityTier === 0 ? undefined : message.liquidityTier;
        obj.market_type = message.marketType === 0 ? undefined : message.marketType;
        obj.danger_index_ppm = message.dangerIndexPpm === 0 ? undefined : message.dangerIndexPpm;
        obj.isolated_market_max_cumulative_insurance_fund_delta_per_block = message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock !== BigInt(0) ? message.isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return PerpetualParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return PerpetualParams.decode(message.value);
    },
    toProto(message) {
        return PerpetualParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.PerpetualParams",
            value: PerpetualParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(PerpetualParams.typeUrl, PerpetualParams);
function createBaseMarketPremiums() {
    return {
        perpetualId: 0,
        premiums: []
    };
}
export const MarketPremiums = {
    typeUrl: "/klyraprotocol.perpetuals.MarketPremiums",
    is(o) {
        return o && (o.$typeUrl === MarketPremiums.typeUrl || typeof o.perpetualId === "number" && Array.isArray(o.premiums) && (!o.premiums.length || typeof o.premiums[0] === "number"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MarketPremiums.typeUrl || typeof o.perpetual_id === "number" && Array.isArray(o.premiums) && (!o.premiums.length || typeof o.premiums[0] === "number"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MarketPremiums.typeUrl || typeof o.perpetual_id === "number" && Array.isArray(o.premiums) && (!o.premiums.length || typeof o.premiums[0] === "number"));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.perpetualId !== 0) {
            writer.uint32(8).uint32(message.perpetualId);
        }
        writer.uint32(18).fork();
        for (const v of message.premiums) {
            writer.sint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMarketPremiums();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetualId = reader.uint32();
                    break;
                case 2:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.premiums.push(reader.sint32());
                        }
                    }
                    else {
                        message.premiums.push(reader.sint32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMarketPremiums();
        message.perpetualId = object.perpetualId ?? 0;
        message.premiums = object.premiums?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMarketPremiums();
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        message.premiums = object.premiums?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        if (message.premiums) {
            obj.premiums = message.premiums.map(e => e);
        }
        else {
            obj.premiums = message.premiums;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MarketPremiums.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MarketPremiums.decode(message.value);
    },
    toProto(message) {
        return MarketPremiums.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MarketPremiums",
            value: MarketPremiums.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MarketPremiums.typeUrl, MarketPremiums);
function createBasePremiumStore() {
    return {
        allMarketPremiums: [],
        numPremiums: 0
    };
}
export const PremiumStore = {
    typeUrl: "/klyraprotocol.perpetuals.PremiumStore",
    is(o) {
        return o && (o.$typeUrl === PremiumStore.typeUrl || Array.isArray(o.allMarketPremiums) && (!o.allMarketPremiums.length || MarketPremiums.is(o.allMarketPremiums[0])) && typeof o.numPremiums === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === PremiumStore.typeUrl || Array.isArray(o.all_market_premiums) && (!o.all_market_premiums.length || MarketPremiums.isSDK(o.all_market_premiums[0])) && typeof o.num_premiums === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === PremiumStore.typeUrl || Array.isArray(o.all_market_premiums) && (!o.all_market_premiums.length || MarketPremiums.isAmino(o.all_market_premiums[0])) && typeof o.num_premiums === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.allMarketPremiums) {
            MarketPremiums.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.numPremiums !== 0) {
            writer.uint32(16).uint32(message.numPremiums);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePremiumStore();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.allMarketPremiums.push(MarketPremiums.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.numPremiums = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePremiumStore();
        message.allMarketPremiums = object.allMarketPremiums?.map(e => MarketPremiums.fromPartial(e)) || [];
        message.numPremiums = object.numPremiums ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBasePremiumStore();
        message.allMarketPremiums = object.all_market_premiums?.map(e => MarketPremiums.fromAmino(e)) || [];
        if (object.num_premiums !== undefined && object.num_premiums !== null) {
            message.numPremiums = object.num_premiums;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.allMarketPremiums) {
            obj.all_market_premiums = message.allMarketPremiums.map(e => e ? MarketPremiums.toAmino(e) : undefined);
        }
        else {
            obj.all_market_premiums = message.allMarketPremiums;
        }
        obj.num_premiums = message.numPremiums === 0 ? undefined : message.numPremiums;
        return obj;
    },
    fromAminoMsg(object) {
        return PremiumStore.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return PremiumStore.decode(message.value);
    },
    toProto(message) {
        return PremiumStore.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.PremiumStore",
            value: PremiumStore.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(PremiumStore.typeUrl, PremiumStore);
function createBaseLiquidityTier() {
    return {
        id: 0,
        name: "",
        initialMarginPpm: 0,
        maintenanceFractionPpm: 0,
        basePositionNotional: BigInt(0),
        impactNotional: BigInt(0),
        openInterestLowerCap: BigInt(0),
        openInterestUpperCap: BigInt(0)
    };
}
export const LiquidityTier = {
    typeUrl: "/klyraprotocol.perpetuals.LiquidityTier",
    is(o) {
        return o && (o.$typeUrl === LiquidityTier.typeUrl || typeof o.id === "number" && typeof o.name === "string" && typeof o.initialMarginPpm === "number" && typeof o.maintenanceFractionPpm === "number" && typeof o.basePositionNotional === "bigint" && typeof o.impactNotional === "bigint" && typeof o.openInterestLowerCap === "bigint" && typeof o.openInterestUpperCap === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === LiquidityTier.typeUrl || typeof o.id === "number" && typeof o.name === "string" && typeof o.initial_margin_ppm === "number" && typeof o.maintenance_fraction_ppm === "number" && typeof o.base_position_notional === "bigint" && typeof o.impact_notional === "bigint" && typeof o.open_interest_lower_cap === "bigint" && typeof o.open_interest_upper_cap === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === LiquidityTier.typeUrl || typeof o.id === "number" && typeof o.name === "string" && typeof o.initial_margin_ppm === "number" && typeof o.maintenance_fraction_ppm === "number" && typeof o.base_position_notional === "bigint" && typeof o.impact_notional === "bigint" && typeof o.open_interest_lower_cap === "bigint" && typeof o.open_interest_upper_cap === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.initialMarginPpm !== 0) {
            writer.uint32(24).uint32(message.initialMarginPpm);
        }
        if (message.maintenanceFractionPpm !== 0) {
            writer.uint32(32).uint32(message.maintenanceFractionPpm);
        }
        if (message.basePositionNotional !== BigInt(0)) {
            writer.uint32(40).uint64(message.basePositionNotional);
        }
        if (message.impactNotional !== BigInt(0)) {
            writer.uint32(48).uint64(message.impactNotional);
        }
        if (message.openInterestLowerCap !== BigInt(0)) {
            writer.uint32(56).uint64(message.openInterestLowerCap);
        }
        if (message.openInterestUpperCap !== BigInt(0)) {
            writer.uint32(64).uint64(message.openInterestUpperCap);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLiquidityTier();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.initialMarginPpm = reader.uint32();
                    break;
                case 4:
                    message.maintenanceFractionPpm = reader.uint32();
                    break;
                case 5:
                    message.basePositionNotional = reader.uint64();
                    break;
                case 6:
                    message.impactNotional = reader.uint64();
                    break;
                case 7:
                    message.openInterestLowerCap = reader.uint64();
                    break;
                case 8:
                    message.openInterestUpperCap = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseLiquidityTier();
        message.id = object.id ?? 0;
        message.name = object.name ?? "";
        message.initialMarginPpm = object.initialMarginPpm ?? 0;
        message.maintenanceFractionPpm = object.maintenanceFractionPpm ?? 0;
        message.basePositionNotional = object.basePositionNotional !== undefined && object.basePositionNotional !== null ? BigInt(object.basePositionNotional.toString()) : BigInt(0);
        message.impactNotional = object.impactNotional !== undefined && object.impactNotional !== null ? BigInt(object.impactNotional.toString()) : BigInt(0);
        message.openInterestLowerCap = object.openInterestLowerCap !== undefined && object.openInterestLowerCap !== null ? BigInt(object.openInterestLowerCap.toString()) : BigInt(0);
        message.openInterestUpperCap = object.openInterestUpperCap !== undefined && object.openInterestUpperCap !== null ? BigInt(object.openInterestUpperCap.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseLiquidityTier();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        if (object.initial_margin_ppm !== undefined && object.initial_margin_ppm !== null) {
            message.initialMarginPpm = object.initial_margin_ppm;
        }
        if (object.maintenance_fraction_ppm !== undefined && object.maintenance_fraction_ppm !== null) {
            message.maintenanceFractionPpm = object.maintenance_fraction_ppm;
        }
        if (object.base_position_notional !== undefined && object.base_position_notional !== null) {
            message.basePositionNotional = BigInt(object.base_position_notional);
        }
        if (object.impact_notional !== undefined && object.impact_notional !== null) {
            message.impactNotional = BigInt(object.impact_notional);
        }
        if (object.open_interest_lower_cap !== undefined && object.open_interest_lower_cap !== null) {
            message.openInterestLowerCap = BigInt(object.open_interest_lower_cap);
        }
        if (object.open_interest_upper_cap !== undefined && object.open_interest_upper_cap !== null) {
            message.openInterestUpperCap = BigInt(object.open_interest_upper_cap);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        obj.name = message.name === "" ? undefined : message.name;
        obj.initial_margin_ppm = message.initialMarginPpm === 0 ? undefined : message.initialMarginPpm;
        obj.maintenance_fraction_ppm = message.maintenanceFractionPpm === 0 ? undefined : message.maintenanceFractionPpm;
        obj.base_position_notional = message.basePositionNotional !== BigInt(0) ? message.basePositionNotional?.toString() : undefined;
        obj.impact_notional = message.impactNotional !== BigInt(0) ? message.impactNotional?.toString() : undefined;
        obj.open_interest_lower_cap = message.openInterestLowerCap !== BigInt(0) ? message.openInterestLowerCap?.toString() : undefined;
        obj.open_interest_upper_cap = message.openInterestUpperCap !== BigInt(0) ? message.openInterestUpperCap?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return LiquidityTier.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return LiquidityTier.decode(message.value);
    },
    toProto(message) {
        return LiquidityTier.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.LiquidityTier",
            value: LiquidityTier.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(LiquidityTier.typeUrl, LiquidityTier);
