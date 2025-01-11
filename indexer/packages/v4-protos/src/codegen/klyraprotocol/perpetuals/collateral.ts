import { MultiCollateralAssetsArray, MultiCollateralAssetsArraySDKType } from "./perpetual";
import * as _m0 from "protobufjs/minimal";
import { Long, DeepPartial } from "../../helpers";
/** CollateralPool defines the parameters for a collateral pool. */

export interface CollateralPool {
  /** The id of the collateral pool. */
  collateralPoolId: number;
  /** The maximum insurance fund delta per block for isolated perpetual markets. */

  maxCumulativeInsuranceFundDeltaPerBlock: Long;
  /** The multi collateral assets for the collateral pool. */

  multiCollateralAssets?: MultiCollateralAssetsArray;
  /** The id of the quote asset. */

  quoteAssetId: number;
}
/** CollateralPool defines the parameters for a collateral pool. */

export interface CollateralPoolSDKType {
  /** The id of the collateral pool. */
  collateral_pool_id: number;
  /** The maximum insurance fund delta per block for isolated perpetual markets. */

  max_cumulative_insurance_fund_delta_per_block: Long;
  /** The multi collateral assets for the collateral pool. */

  multi_collateral_assets?: MultiCollateralAssetsArraySDKType;
  /** The id of the quote asset. */

  quote_asset_id: number;
}

function createBaseCollateralPool(): CollateralPool {
  return {
    collateralPoolId: 0,
    maxCumulativeInsuranceFundDeltaPerBlock: Long.UZERO,
    multiCollateralAssets: undefined,
    quoteAssetId: 0
  };
}

export const CollateralPool = {
  encode(message: CollateralPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collateralPoolId !== 0) {
      writer.uint32(8).uint32(message.collateralPoolId);
    }

    if (!message.maxCumulativeInsuranceFundDeltaPerBlock.isZero()) {
      writer.uint32(16).uint64(message.maxCumulativeInsuranceFundDeltaPerBlock);
    }

    if (message.multiCollateralAssets !== undefined) {
      MultiCollateralAssetsArray.encode(message.multiCollateralAssets, writer.uint32(26).fork()).ldelim();
    }

    if (message.quoteAssetId !== 0) {
      writer.uint32(32).uint32(message.quoteAssetId);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CollateralPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCollateralPool();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.collateralPoolId = reader.uint32();
          break;

        case 2:
          message.maxCumulativeInsuranceFundDeltaPerBlock = (reader.uint64() as Long);
          break;

        case 3:
          message.multiCollateralAssets = MultiCollateralAssetsArray.decode(reader, reader.uint32());
          break;

        case 4:
          message.quoteAssetId = reader.uint32();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<CollateralPool>): CollateralPool {
    const message = createBaseCollateralPool();
    message.collateralPoolId = object.collateralPoolId ?? 0;
    message.maxCumulativeInsuranceFundDeltaPerBlock = object.maxCumulativeInsuranceFundDeltaPerBlock !== undefined && object.maxCumulativeInsuranceFundDeltaPerBlock !== null ? Long.fromValue(object.maxCumulativeInsuranceFundDeltaPerBlock) : Long.UZERO;
    message.multiCollateralAssets = object.multiCollateralAssets !== undefined && object.multiCollateralAssets !== null ? MultiCollateralAssetsArray.fromPartial(object.multiCollateralAssets) : undefined;
    message.quoteAssetId = object.quoteAssetId ?? 0;
    return message;
  }

};