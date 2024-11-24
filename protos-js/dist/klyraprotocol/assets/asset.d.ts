import { BinaryReader, BinaryWriter } from "../../binary";
/** Asset defines a single exchangable asset. */
export interface Asset {
    /** Unique, sequentially-generated. */
    id: number;
    /**
     * The human readable symbol of the `Asset` (e.g. `TDAI`, `ATOM`).
     * Must be uppercase, unique and correspond to the canonical symbol of the
     * full coin.
     */
    symbol: string;
    /**
     * The name of base denomination unit of the `Asset` (e.g. `uatom`,
     * 'ibc/xxxxx'). Must be unique and match the `denom` used in the `sdk.Coin`
     * type in the `x/bank` module.
     */
    denom: string;
    /**
     * The exponent of converting one unit of `denom` to a full coin.
     * For example, `name=USDC, denom=uusdc, denom_exponent=-6` defines that
     * `1 uusdc = 10^(-6) USDC`. Note that `uusdc` refers to a `Coin` type in
     * `x/bank`, where the prefix `u` means `micro` by convetion. `uusdc` is
     * a different concept from a "quantum" defined by `atomic_resolution` below.
     * To convert from an amount of `denom` to quantums:
     * `quantums = denom_amount * 10^(denom_exponent - atomic_resolution)`
     */
    denomExponent: number;
    /** `true` if this `Asset` has a valid `MarketId` value. */
    hasMarket: boolean;
    /**
     * The `Id` of the `Market` associated with this `Asset`. It acts as the
     * oracle price for the purposes of calculating collateral
     * and margin requirements.
     */
    marketId: number;
    /**
     * The exponent for converting an atomic amount (1 'quantum')
     * to a full coin. For example, if `atomic_resolution = -8`
     * then an `asset_position` with `base_quantums = 1e8` is equivalent to
     * a position size of one full coin.
     */
    atomicResolution: number;
    /**
     * The current yield index is determined by the cumulative
     * all-time history of the yield mechanism for assets.
     * Starts at 0. This string should always be converted big.Rat.
     */
    assetYieldIndex: string;
}
export interface AssetProtoMsg {
    typeUrl: "/klyraprotocol.assets.Asset";
    value: Uint8Array;
}
/** Asset defines a single exchangable asset. */
export interface AssetAmino {
    /** Unique, sequentially-generated. */
    id?: number;
    /**
     * The human readable symbol of the `Asset` (e.g. `TDAI`, `ATOM`).
     * Must be uppercase, unique and correspond to the canonical symbol of the
     * full coin.
     */
    symbol?: string;
    /**
     * The name of base denomination unit of the `Asset` (e.g. `uatom`,
     * 'ibc/xxxxx'). Must be unique and match the `denom` used in the `sdk.Coin`
     * type in the `x/bank` module.
     */
    denom?: string;
    /**
     * The exponent of converting one unit of `denom` to a full coin.
     * For example, `name=USDC, denom=uusdc, denom_exponent=-6` defines that
     * `1 uusdc = 10^(-6) USDC`. Note that `uusdc` refers to a `Coin` type in
     * `x/bank`, where the prefix `u` means `micro` by convetion. `uusdc` is
     * a different concept from a "quantum" defined by `atomic_resolution` below.
     * To convert from an amount of `denom` to quantums:
     * `quantums = denom_amount * 10^(denom_exponent - atomic_resolution)`
     */
    denom_exponent?: number;
    /** `true` if this `Asset` has a valid `MarketId` value. */
    has_market?: boolean;
    /**
     * The `Id` of the `Market` associated with this `Asset`. It acts as the
     * oracle price for the purposes of calculating collateral
     * and margin requirements.
     */
    market_id?: number;
    /**
     * The exponent for converting an atomic amount (1 'quantum')
     * to a full coin. For example, if `atomic_resolution = -8`
     * then an `asset_position` with `base_quantums = 1e8` is equivalent to
     * a position size of one full coin.
     */
    atomic_resolution?: number;
    /**
     * The current yield index is determined by the cumulative
     * all-time history of the yield mechanism for assets.
     * Starts at 0. This string should always be converted big.Rat.
     */
    asset_yield_index?: string;
}
export interface AssetAminoMsg {
    type: "/klyraprotocol.assets.Asset";
    value: AssetAmino;
}
/** Asset defines a single exchangable asset. */
export interface AssetSDKType {
    id: number;
    symbol: string;
    denom: string;
    denom_exponent: number;
    has_market: boolean;
    market_id: number;
    atomic_resolution: number;
    asset_yield_index: string;
}
export declare const Asset: {
    typeUrl: string;
    is(o: any): o is Asset;
    isSDK(o: any): o is AssetSDKType;
    isAmino(o: any): o is AssetAmino;
    encode(message: Asset, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Asset;
    fromPartial(object: Partial<Asset>): Asset;
    fromAmino(object: AssetAmino): Asset;
    toAmino(message: Asset): AssetAmino;
    fromAminoMsg(object: AssetAminoMsg): Asset;
    fromProtoMsg(message: AssetProtoMsg): Asset;
    toProto(message: Asset): Uint8Array;
    toProtoMsg(message: Asset): AssetProtoMsg;
};
