/**
 * Market type of perpetual.
 * Defined in perpetual.
 */
export enum PerpetualMarketType {
  /** PERPETUAL_MARKET_TYPE_CROSS - Market type for cross margin perpetual markets. */
  PERPETUAL_MARKET_TYPE_CROSS = 0,

  /** PERPETUAL_MARKET_TYPE_ISOLATED - Market type for isolated margin perpetual markets. */
  PERPETUAL_MARKET_TYPE_ISOLATED = 1,
  UNRECOGNIZED = -1,
}
/**
 * Market type of perpetual.
 * Defined in perpetual.
 */

export enum PerpetualMarketTypeSDKType {
  /** PERPETUAL_MARKET_TYPE_CROSS - Market type for cross margin perpetual markets. */
  PERPETUAL_MARKET_TYPE_CROSS = 0,

  /** PERPETUAL_MARKET_TYPE_ISOLATED - Market type for isolated margin perpetual markets. */
  PERPETUAL_MARKET_TYPE_ISOLATED = 1,
  UNRECOGNIZED = -1,
}
export function perpetualMarketTypeFromJSON(object: any): PerpetualMarketType {
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
export function perpetualMarketTypeToJSON(object: PerpetualMarketType): string {
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