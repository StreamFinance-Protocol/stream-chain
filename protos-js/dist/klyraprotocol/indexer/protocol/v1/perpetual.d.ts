/**
 * Market type of perpetual.
 * Defined in perpetual.
 */
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
