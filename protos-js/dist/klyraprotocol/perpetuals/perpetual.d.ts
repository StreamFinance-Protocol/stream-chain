import { BinaryReader, BinaryWriter } from "../../binary";
export declare enum PerpetualMarketType {
    /** PERPETUAL_MARKET_TYPE_CROSS - Market type for cross margin perpetual markets. */
    PERPETUAL_MARKET_TYPE_CROSS = 0,
    /** PERPETUAL_MARKET_TYPE_ISOLATED - Market type for isolated margin perpetual markets. */
    PERPETUAL_MARKET_TYPE_ISOLATED = 1,
    UNRECOGNIZED = -1
}
export declare const PerpetualMarketTypeSDKType: typeof PerpetualMarketType;
export declare const PerpetualMarketTypeAmino: typeof PerpetualMarketType;
export declare function perpetualMarketTypeFromJSON(object: any): PerpetualMarketType;
export declare function perpetualMarketTypeToJSON(object: PerpetualMarketType): string;
/** Perpetual represents a perpetual on the Klyra exchange. */
export interface Perpetual {
    /** PerpetualParams is the parameters of the perpetual. */
    params: PerpetualParams;
    /**
     * The current index determined by the cumulative all-time
     * history of the funding mechanism. Starts at zero.
     */
    fundingIndex: Uint8Array;
    /** Total size of open long contracts, measured in base_quantums. */
    openInterest: Uint8Array;
    lastFundingRate: Uint8Array;
    /**
     * The current yield index is determined by the cumulative
     * all-time history of the yield mechanism. Starts at 0.
     * This string should always be converted big.Rat.
     */
    yieldIndex: string;
}
export interface PerpetualProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.Perpetual";
    value: Uint8Array;
}
/** Perpetual represents a perpetual on the Klyra exchange. */
export interface PerpetualAmino {
    /** PerpetualParams is the parameters of the perpetual. */
    params?: PerpetualParamsAmino;
    /**
     * The current index determined by the cumulative all-time
     * history of the funding mechanism. Starts at zero.
     */
    funding_index?: string;
    /** Total size of open long contracts, measured in base_quantums. */
    open_interest?: string;
    last_funding_rate?: string;
    /**
     * The current yield index is determined by the cumulative
     * all-time history of the yield mechanism. Starts at 0.
     * This string should always be converted big.Rat.
     */
    yield_index?: string;
}
export interface PerpetualAminoMsg {
    type: "/klyraprotocol.perpetuals.Perpetual";
    value: PerpetualAmino;
}
/** Perpetual represents a perpetual on the Klyra exchange. */
export interface PerpetualSDKType {
    params: PerpetualParamsSDKType;
    funding_index: Uint8Array;
    open_interest: Uint8Array;
    last_funding_rate: Uint8Array;
    yield_index: string;
}
/**
 * PerpetualParams represents the parameters of a perpetual on the Klyra
 * exchange.
 */
export interface PerpetualParams {
    /** Unique, sequentially-generated. */
    id: number;
    /** The name of the `Perpetual` (e.g. `BTC-USD`). */
    ticker: string;
    /**
     * The market associated with this `Perpetual`. It
     * acts as the oracle price for the purposes of calculating
     * collateral, margin requirements, and funding rates.
     */
    marketId: number;
    /**
     * The exponent for converting an atomic amount (`size = 1`)
     * to a full coin. For example, if `AtomicResolution = -8`
     * then a `PerpetualPosition` with `size = 1e8` is equivalent to
     * a position size of one full coin.
     */
    atomicResolution: number;
    /**
     * The default funding payment if there is no price premium. In
     * parts-per-million.
     */
    defaultFundingPpm: number;
    /** The liquidity_tier that this perpetual is associated with. */
    liquidityTier: number;
    /** The market type specifying if this perpetual is cross or isolated */
    marketType: PerpetualMarketType;
    /**
     * The danger index is used to prioritze certain accounts and positions in
     * liquidations
     */
    dangerIndexPpm: number;
    /** The maximum insurance fund delta per block for isolated perpetual markets. */
    isolatedMarketMaxCumulativeInsuranceFundDeltaPerBlock: bigint;
}
export interface PerpetualParamsProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.PerpetualParams";
    value: Uint8Array;
}
/**
 * PerpetualParams represents the parameters of a perpetual on the Klyra
 * exchange.
 */
export interface PerpetualParamsAmino {
    /** Unique, sequentially-generated. */
    id?: number;
    /** The name of the `Perpetual` (e.g. `BTC-USD`). */
    ticker?: string;
    /**
     * The market associated with this `Perpetual`. It
     * acts as the oracle price for the purposes of calculating
     * collateral, margin requirements, and funding rates.
     */
    market_id?: number;
    /**
     * The exponent for converting an atomic amount (`size = 1`)
     * to a full coin. For example, if `AtomicResolution = -8`
     * then a `PerpetualPosition` with `size = 1e8` is equivalent to
     * a position size of one full coin.
     */
    atomic_resolution?: number;
    /**
     * The default funding payment if there is no price premium. In
     * parts-per-million.
     */
    default_funding_ppm?: number;
    /** The liquidity_tier that this perpetual is associated with. */
    liquidity_tier?: number;
    /** The market type specifying if this perpetual is cross or isolated */
    market_type?: PerpetualMarketType;
    /**
     * The danger index is used to prioritze certain accounts and positions in
     * liquidations
     */
    danger_index_ppm?: number;
    /** The maximum insurance fund delta per block for isolated perpetual markets. */
    isolated_market_max_cumulative_insurance_fund_delta_per_block?: string;
}
export interface PerpetualParamsAminoMsg {
    type: "/klyraprotocol.perpetuals.PerpetualParams";
    value: PerpetualParamsAmino;
}
/**
 * PerpetualParams represents the parameters of a perpetual on the Klyra
 * exchange.
 */
export interface PerpetualParamsSDKType {
    id: number;
    ticker: string;
    market_id: number;
    atomic_resolution: number;
    default_funding_ppm: number;
    liquidity_tier: number;
    market_type: PerpetualMarketType;
    danger_index_ppm: number;
    isolated_market_max_cumulative_insurance_fund_delta_per_block: bigint;
}
/** MarketPremiums stores a list of premiums for a single perpetual market. */
export interface MarketPremiums {
    /** perpetual_id is the Id of the perpetual market. */
    perpetualId: number;
    /**
     * premiums is a list of premium values for a perpetual market. Since most
     * premiums are zeros under "stable" market conditions, only non-zero values
     * are stored in this list.
     */
    premiums: number[];
}
export interface MarketPremiumsProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.MarketPremiums";
    value: Uint8Array;
}
/** MarketPremiums stores a list of premiums for a single perpetual market. */
export interface MarketPremiumsAmino {
    /** perpetual_id is the Id of the perpetual market. */
    perpetual_id?: number;
    /**
     * premiums is a list of premium values for a perpetual market. Since most
     * premiums are zeros under "stable" market conditions, only non-zero values
     * are stored in this list.
     */
    premiums?: number[];
}
export interface MarketPremiumsAminoMsg {
    type: "/klyraprotocol.perpetuals.MarketPremiums";
    value: MarketPremiumsAmino;
}
/** MarketPremiums stores a list of premiums for a single perpetual market. */
export interface MarketPremiumsSDKType {
    perpetual_id: number;
    premiums: number[];
}
/**
 * PremiumStore is a struct to store a perpetual premiums for all
 * perpetual markets. It stores a list of `MarketPremiums`, each of which
 * corresponds to a perpetual market and stores a list of non-zero premium
 * values for that market.
 * This struct can either be used to store `PremiumVotes` or
 * `PremiumSamples`.
 */
export interface PremiumStore {
    /**
     * all_market_premiums a list of `MarketPremiums`, each corresponding to
     * a perpetual market.
     */
    allMarketPremiums: MarketPremiums[];
    /**
     * number of rounds where premium values were added. This value indicates
     * the total number of premiums (zeros and non-zeros) for each
     * `MarketPremiums` struct. Note that in the edge case a perpetual market was
     * added in the middle of a epoch, we don't keep a seperate count for that
     * market. This means we treat this market as having zero premiums before it
     * was added.
     */
    numPremiums: number;
}
export interface PremiumStoreProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.PremiumStore";
    value: Uint8Array;
}
/**
 * PremiumStore is a struct to store a perpetual premiums for all
 * perpetual markets. It stores a list of `MarketPremiums`, each of which
 * corresponds to a perpetual market and stores a list of non-zero premium
 * values for that market.
 * This struct can either be used to store `PremiumVotes` or
 * `PremiumSamples`.
 */
export interface PremiumStoreAmino {
    /**
     * all_market_premiums a list of `MarketPremiums`, each corresponding to
     * a perpetual market.
     */
    all_market_premiums?: MarketPremiumsAmino[];
    /**
     * number of rounds where premium values were added. This value indicates
     * the total number of premiums (zeros and non-zeros) for each
     * `MarketPremiums` struct. Note that in the edge case a perpetual market was
     * added in the middle of a epoch, we don't keep a seperate count for that
     * market. This means we treat this market as having zero premiums before it
     * was added.
     */
    num_premiums?: number;
}
export interface PremiumStoreAminoMsg {
    type: "/klyraprotocol.perpetuals.PremiumStore";
    value: PremiumStoreAmino;
}
/**
 * PremiumStore is a struct to store a perpetual premiums for all
 * perpetual markets. It stores a list of `MarketPremiums`, each of which
 * corresponds to a perpetual market and stores a list of non-zero premium
 * values for that market.
 * This struct can either be used to store `PremiumVotes` or
 * `PremiumSamples`.
 */
export interface PremiumStoreSDKType {
    all_market_premiums: MarketPremiumsSDKType[];
    num_premiums: number;
}
/** LiquidityTier stores margin information. */
export interface LiquidityTier {
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
    /**
     * The impact notional amount (in quote quantums) is used to determine impact
     * bid/ask prices and its recommended value is 500 TDAI / initial margin
     * fraction.
     * - Impact bid price = average execution price for a market sell of the
     * impact notional value.
     * - Impact ask price = average execution price for a market buy of the
     * impact notional value.
     */
    impactNotional: bigint;
    /**
     * Lower cap for Open Interest Margin Fracton (OIMF), in quote quantums.
     * IMF is not affected when OI <= open_interest_lower_cap.
     */
    openInterestLowerCap: bigint;
    /**
     * Upper cap for Open Interest Margin Fracton (OIMF), in quote quantums.
     * IMF scales linearly to 100% as OI approaches open_interest_upper_cap.
     * If zero, then the IMF does not scale with OI.
     */
    openInterestUpperCap: bigint;
}
export interface LiquidityTierProtoMsg {
    typeUrl: "/klyraprotocol.perpetuals.LiquidityTier";
    value: Uint8Array;
}
/** LiquidityTier stores margin information. */
export interface LiquidityTierAmino {
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
    /**
     * The impact notional amount (in quote quantums) is used to determine impact
     * bid/ask prices and its recommended value is 500 TDAI / initial margin
     * fraction.
     * - Impact bid price = average execution price for a market sell of the
     * impact notional value.
     * - Impact ask price = average execution price for a market buy of the
     * impact notional value.
     */
    impact_notional?: string;
    /**
     * Lower cap for Open Interest Margin Fracton (OIMF), in quote quantums.
     * IMF is not affected when OI <= open_interest_lower_cap.
     */
    open_interest_lower_cap?: string;
    /**
     * Upper cap for Open Interest Margin Fracton (OIMF), in quote quantums.
     * IMF scales linearly to 100% as OI approaches open_interest_upper_cap.
     * If zero, then the IMF does not scale with OI.
     */
    open_interest_upper_cap?: string;
}
export interface LiquidityTierAminoMsg {
    type: "/klyraprotocol.perpetuals.LiquidityTier";
    value: LiquidityTierAmino;
}
/** LiquidityTier stores margin information. */
export interface LiquidityTierSDKType {
    id: number;
    name: string;
    initial_margin_ppm: number;
    maintenance_fraction_ppm: number;
    /** @deprecated */
    base_position_notional: bigint;
    impact_notional: bigint;
    open_interest_lower_cap: bigint;
    open_interest_upper_cap: bigint;
}
export declare const Perpetual: {
    typeUrl: string;
    is(o: any): o is Perpetual;
    isSDK(o: any): o is PerpetualSDKType;
    isAmino(o: any): o is PerpetualAmino;
    encode(message: Perpetual, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Perpetual;
    fromPartial(object: Partial<Perpetual>): Perpetual;
    fromAmino(object: PerpetualAmino): Perpetual;
    toAmino(message: Perpetual): PerpetualAmino;
    fromAminoMsg(object: PerpetualAminoMsg): Perpetual;
    fromProtoMsg(message: PerpetualProtoMsg): Perpetual;
    toProto(message: Perpetual): Uint8Array;
    toProtoMsg(message: Perpetual): PerpetualProtoMsg;
};
export declare const PerpetualParams: {
    typeUrl: string;
    is(o: any): o is PerpetualParams;
    isSDK(o: any): o is PerpetualParamsSDKType;
    isAmino(o: any): o is PerpetualParamsAmino;
    encode(message: PerpetualParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PerpetualParams;
    fromPartial(object: Partial<PerpetualParams>): PerpetualParams;
    fromAmino(object: PerpetualParamsAmino): PerpetualParams;
    toAmino(message: PerpetualParams): PerpetualParamsAmino;
    fromAminoMsg(object: PerpetualParamsAminoMsg): PerpetualParams;
    fromProtoMsg(message: PerpetualParamsProtoMsg): PerpetualParams;
    toProto(message: PerpetualParams): Uint8Array;
    toProtoMsg(message: PerpetualParams): PerpetualParamsProtoMsg;
};
export declare const MarketPremiums: {
    typeUrl: string;
    is(o: any): o is MarketPremiums;
    isSDK(o: any): o is MarketPremiumsSDKType;
    isAmino(o: any): o is MarketPremiumsAmino;
    encode(message: MarketPremiums, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MarketPremiums;
    fromPartial(object: Partial<MarketPremiums>): MarketPremiums;
    fromAmino(object: MarketPremiumsAmino): MarketPremiums;
    toAmino(message: MarketPremiums): MarketPremiumsAmino;
    fromAminoMsg(object: MarketPremiumsAminoMsg): MarketPremiums;
    fromProtoMsg(message: MarketPremiumsProtoMsg): MarketPremiums;
    toProto(message: MarketPremiums): Uint8Array;
    toProtoMsg(message: MarketPremiums): MarketPremiumsProtoMsg;
};
export declare const PremiumStore: {
    typeUrl: string;
    is(o: any): o is PremiumStore;
    isSDK(o: any): o is PremiumStoreSDKType;
    isAmino(o: any): o is PremiumStoreAmino;
    encode(message: PremiumStore, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): PremiumStore;
    fromPartial(object: Partial<PremiumStore>): PremiumStore;
    fromAmino(object: PremiumStoreAmino): PremiumStore;
    toAmino(message: PremiumStore): PremiumStoreAmino;
    fromAminoMsg(object: PremiumStoreAminoMsg): PremiumStore;
    fromProtoMsg(message: PremiumStoreProtoMsg): PremiumStore;
    toProto(message: PremiumStore): Uint8Array;
    toProtoMsg(message: PremiumStore): PremiumStoreProtoMsg;
};
export declare const LiquidityTier: {
    typeUrl: string;
    is(o: any): o is LiquidityTier;
    isSDK(o: any): o is LiquidityTierSDKType;
    isAmino(o: any): o is LiquidityTierAmino;
    encode(message: LiquidityTier, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): LiquidityTier;
    fromPartial(object: Partial<LiquidityTier>): LiquidityTier;
    fromAmino(object: LiquidityTierAmino): LiquidityTier;
    toAmino(message: LiquidityTier): LiquidityTierAmino;
    fromAminoMsg(object: LiquidityTierAminoMsg): LiquidityTier;
    fromProtoMsg(message: LiquidityTierProtoMsg): LiquidityTier;
    toProto(message: LiquidityTier): Uint8Array;
    toProtoMsg(message: LiquidityTier): LiquidityTierProtoMsg;
};
