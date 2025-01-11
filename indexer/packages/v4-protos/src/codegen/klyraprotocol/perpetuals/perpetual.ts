import * as _m0 from "protobufjs/minimal";
import { DeepPartial, Long } from "../../helpers";
/** Perpetual represents a perpetual on the Klyra exchange. */

export interface Perpetual {
  /** PerpetualParams is the parameters of the perpetual. */
  params?: PerpetualParams;
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
/** Perpetual represents a perpetual on the Klyra exchange. */

export interface PerpetualSDKType {
  /** PerpetualParams is the parameters of the perpetual. */
  params?: PerpetualParamsSDKType;
  /**
   * The current index determined by the cumulative all-time
   * history of the funding mechanism. Starts at zero.
   */

  funding_index: Uint8Array;
  /** Total size of open long contracts, measured in base_quantums. */

  open_interest: Uint8Array;
  last_funding_rate: Uint8Array;
  /**
   * The current yield index is determined by the cumulative
   * all-time history of the yield mechanism. Starts at 0.
   * This string should always be converted big.Rat.
   */

  yield_index: string;
}
/**
 * MultiCollateralAssetsArray is an array of assets represented by their
 * asset ids.
 */

export interface MultiCollateralAssetsArray {
  multiCollateralAssets: number[];
}
/**
 * MultiCollateralAssetsArray is an array of assets represented by their
 * asset ids.
 */

export interface MultiCollateralAssetsArraySDKType {
  multi_collateral_assets: number[];
}
/**
 * PerpetualParams represents the parameters of a perpetual on the dYdX
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
  /**
   * The danger index is used to prioritze certain accounts and positions in
   * liquidations
   */

  dangerIndexPpm: number;
  collateralPoolId: number;
}
/**
 * PerpetualParams represents the parameters of a perpetual on the dYdX
 * exchange.
 */

export interface PerpetualParamsSDKType {
  /** Unique, sequentially-generated. */
  id: number;
  /** The name of the `Perpetual` (e.g. `BTC-USD`). */

  ticker: string;
  /**
   * The market associated with this `Perpetual`. It
   * acts as the oracle price for the purposes of calculating
   * collateral, margin requirements, and funding rates.
   */

  market_id: number;
  /**
   * The exponent for converting an atomic amount (`size = 1`)
   * to a full coin. For example, if `AtomicResolution = -8`
   * then a `PerpetualPosition` with `size = 1e8` is equivalent to
   * a position size of one full coin.
   */

  atomic_resolution: number;
  /**
   * The default funding payment if there is no price premium. In
   * parts-per-million.
   */

  default_funding_ppm: number;
  /** The liquidity_tier that this perpetual is associated with. */

  liquidity_tier: number;
  /**
   * The danger index is used to prioritze certain accounts and positions in
   * liquidations
   */

  danger_index_ppm: number;
  collateral_pool_id: number;
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
/** MarketPremiums stores a list of premiums for a single perpetual market. */

export interface MarketPremiumsSDKType {
  /** perpetual_id is the Id of the perpetual market. */
  perpetual_id: number;
  /**
   * premiums is a list of premium values for a perpetual market. Since most
   * premiums are zeros under "stable" market conditions, only non-zero values
   * are stored in this list.
   */

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
/**
 * PremiumStore is a struct to store a perpetual premiums for all
 * perpetual markets. It stores a list of `MarketPremiums`, each of which
 * corresponds to a perpetual market and stores a list of non-zero premium
 * values for that market.
 * This struct can either be used to store `PremiumVotes` or
 * `PremiumSamples`.
 */

export interface PremiumStoreSDKType {
  /**
   * all_market_premiums a list of `MarketPremiums`, each corresponding to
   * a perpetual market.
   */
  all_market_premiums: MarketPremiumsSDKType[];
  /**
   * number of rounds where premium values were added. This value indicates
   * the total number of premiums (zeros and non-zeros) for each
   * `MarketPremiums` struct. Note that in the edge case a perpetual market was
   * added in the middle of a epoch, we don't keep a seperate count for that
   * market. This means we treat this market as having zero premiums before it
   * was added.
   */

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

  basePositionNotional: Long;
  /**
   * The impact notional amount (in quote quantums) is used to determine impact
   * bid/ask prices and its recommended value is 500 TDAI / initial margin
   * fraction.
   * - Impact bid price = average execution price for a market sell of the
   * impact notional value.
   * - Impact ask price = average execution price for a market buy of the
   * impact notional value.
   */

  impactNotional: Long;
  /**
   * Lower cap for Open Interest Margin Fracton (OIMF), in quote quantums.
   * IMF is not affected when OI <= open_interest_lower_cap.
   */

  openInterestLowerCap: Long;
  /**
   * Upper cap for Open Interest Margin Fracton (OIMF), in quote quantums.
   * IMF scales linearly to 100% as OI approaches open_interest_upper_cap.
   * If zero, then the IMF does not scale with OI.
   */

  openInterestUpperCap: Long;
}
/** LiquidityTier stores margin information. */

export interface LiquidityTierSDKType {
  /** Unique id. */
  id: number;
  /** The name of the tier purely for mnemonic purposes, e.g. "Gold". */

  name: string;
  /**
   * The margin fraction needed to open a position.
   * In parts-per-million.
   */

  initial_margin_ppm: number;
  /**
   * The fraction of the initial-margin that the maintenance-margin is,
   * e.g. 50%. In parts-per-million.
   */

  maintenance_fraction_ppm: number;
  /**
   * The maximum position size at which the margin requirements are
   * not increased over the default values. Above this position size,
   * the margin requirements increase at a rate of sqrt(size).
   * 
   * Deprecated since v3.x.
   */

  /** @deprecated */

  base_position_notional: Long;
  /**
   * The impact notional amount (in quote quantums) is used to determine impact
   * bid/ask prices and its recommended value is 500 TDAI / initial margin
   * fraction.
   * - Impact bid price = average execution price for a market sell of the
   * impact notional value.
   * - Impact ask price = average execution price for a market buy of the
   * impact notional value.
   */

  impact_notional: Long;
  /**
   * Lower cap for Open Interest Margin Fracton (OIMF), in quote quantums.
   * IMF is not affected when OI <= open_interest_lower_cap.
   */

  open_interest_lower_cap: Long;
  /**
   * Upper cap for Open Interest Margin Fracton (OIMF), in quote quantums.
   * IMF scales linearly to 100% as OI approaches open_interest_upper_cap.
   * If zero, then the IMF does not scale with OI.
   */

  open_interest_upper_cap: Long;
}

function createBasePerpetual(): Perpetual {
  return {
    params: undefined,
    fundingIndex: new Uint8Array(),
    openInterest: new Uint8Array(),
    lastFundingRate: new Uint8Array(),
    yieldIndex: ""
  };
}

export const Perpetual = {
  encode(message: Perpetual, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Perpetual {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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

  fromPartial(object: DeepPartial<Perpetual>): Perpetual {
    const message = createBasePerpetual();
    message.params = object.params !== undefined && object.params !== null ? PerpetualParams.fromPartial(object.params) : undefined;
    message.fundingIndex = object.fundingIndex ?? new Uint8Array();
    message.openInterest = object.openInterest ?? new Uint8Array();
    message.lastFundingRate = object.lastFundingRate ?? new Uint8Array();
    message.yieldIndex = object.yieldIndex ?? "";
    return message;
  }

};

function createBaseMultiCollateralAssetsArray(): MultiCollateralAssetsArray {
  return {
    multiCollateralAssets: []
  };
}

export const MultiCollateralAssetsArray = {
  encode(message: MultiCollateralAssetsArray, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();

    for (const v of message.multiCollateralAssets) {
      writer.uint32(v);
    }

    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MultiCollateralAssetsArray {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiCollateralAssetsArray();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;

            while (reader.pos < end2) {
              message.multiCollateralAssets.push(reader.uint32());
            }
          } else {
            message.multiCollateralAssets.push(reader.uint32());
          }

          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<MultiCollateralAssetsArray>): MultiCollateralAssetsArray {
    const message = createBaseMultiCollateralAssetsArray();
    message.multiCollateralAssets = object.multiCollateralAssets?.map(e => e) || [];
    return message;
  }

};

function createBasePerpetualParams(): PerpetualParams {
  return {
    id: 0,
    ticker: "",
    marketId: 0,
    atomicResolution: 0,
    defaultFundingPpm: 0,
    liquidityTier: 0,
    dangerIndexPpm: 0,
    collateralPoolId: 0
  };
}

export const PerpetualParams = {
  encode(message: PerpetualParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

    if (message.dangerIndexPpm !== 0) {
      writer.uint32(56).uint32(message.dangerIndexPpm);
    }

    if (message.collateralPoolId !== 0) {
      writer.uint32(64).uint32(message.collateralPoolId);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PerpetualParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
          message.dangerIndexPpm = reader.uint32();
          break;

        case 8:
          message.collateralPoolId = reader.uint32();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<PerpetualParams>): PerpetualParams {
    const message = createBasePerpetualParams();
    message.id = object.id ?? 0;
    message.ticker = object.ticker ?? "";
    message.marketId = object.marketId ?? 0;
    message.atomicResolution = object.atomicResolution ?? 0;
    message.defaultFundingPpm = object.defaultFundingPpm ?? 0;
    message.liquidityTier = object.liquidityTier ?? 0;
    message.dangerIndexPpm = object.dangerIndexPpm ?? 0;
    message.collateralPoolId = object.collateralPoolId ?? 0;
    return message;
  }

};

function createBaseMarketPremiums(): MarketPremiums {
  return {
    perpetualId: 0,
    premiums: []
  };
}

export const MarketPremiums = {
  encode(message: MarketPremiums, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MarketPremiums {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
          } else {
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

  fromPartial(object: DeepPartial<MarketPremiums>): MarketPremiums {
    const message = createBaseMarketPremiums();
    message.perpetualId = object.perpetualId ?? 0;
    message.premiums = object.premiums?.map(e => e) || [];
    return message;
  }

};

function createBasePremiumStore(): PremiumStore {
  return {
    allMarketPremiums: [],
    numPremiums: 0
  };
}

export const PremiumStore = {
  encode(message: PremiumStore, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.allMarketPremiums) {
      MarketPremiums.encode(v!, writer.uint32(10).fork()).ldelim();
    }

    if (message.numPremiums !== 0) {
      writer.uint32(16).uint32(message.numPremiums);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PremiumStore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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

  fromPartial(object: DeepPartial<PremiumStore>): PremiumStore {
    const message = createBasePremiumStore();
    message.allMarketPremiums = object.allMarketPremiums?.map(e => MarketPremiums.fromPartial(e)) || [];
    message.numPremiums = object.numPremiums ?? 0;
    return message;
  }

};

function createBaseLiquidityTier(): LiquidityTier {
  return {
    id: 0,
    name: "",
    initialMarginPpm: 0,
    maintenanceFractionPpm: 0,
    basePositionNotional: Long.UZERO,
    impactNotional: Long.UZERO,
    openInterestLowerCap: Long.UZERO,
    openInterestUpperCap: Long.UZERO
  };
}

export const LiquidityTier = {
  encode(message: LiquidityTier, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

    if (!message.basePositionNotional.isZero()) {
      writer.uint32(40).uint64(message.basePositionNotional);
    }

    if (!message.impactNotional.isZero()) {
      writer.uint32(48).uint64(message.impactNotional);
    }

    if (!message.openInterestLowerCap.isZero()) {
      writer.uint32(56).uint64(message.openInterestLowerCap);
    }

    if (!message.openInterestUpperCap.isZero()) {
      writer.uint32(64).uint64(message.openInterestUpperCap);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LiquidityTier {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
          message.basePositionNotional = (reader.uint64() as Long);
          break;

        case 6:
          message.impactNotional = (reader.uint64() as Long);
          break;

        case 7:
          message.openInterestLowerCap = (reader.uint64() as Long);
          break;

        case 8:
          message.openInterestUpperCap = (reader.uint64() as Long);
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<LiquidityTier>): LiquidityTier {
    const message = createBaseLiquidityTier();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.initialMarginPpm = object.initialMarginPpm ?? 0;
    message.maintenanceFractionPpm = object.maintenanceFractionPpm ?? 0;
    message.basePositionNotional = object.basePositionNotional !== undefined && object.basePositionNotional !== null ? Long.fromValue(object.basePositionNotional) : Long.UZERO;
    message.impactNotional = object.impactNotional !== undefined && object.impactNotional !== null ? Long.fromValue(object.impactNotional) : Long.UZERO;
    message.openInterestLowerCap = object.openInterestLowerCap !== undefined && object.openInterestLowerCap !== null ? Long.fromValue(object.openInterestLowerCap) : Long.UZERO;
    message.openInterestUpperCap = object.openInterestUpperCap !== undefined && object.openInterestUpperCap !== null ? Long.fromValue(object.openInterestUpperCap) : Long.UZERO;
    return message;
  }

};