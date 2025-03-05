import * as _m0 from "protobufjs/minimal";
import { Long, DeepPartial } from "../../helpers";
/**
 * BridgeEventInfo stores information about the most recently processed bridge
 * event.
 */

export interface BridgeEventInfo {
  /**
   * The next event id (the last processed id plus one) of the logs from the
   * Ethereum contract.
   */
  nextDepositId: number;
  /**
   * The next event id (the last processed id plus one) of the withdraws on
   * Klyra.
   */

  nextWithdrawId: number;
  /** The Ethereum block height of the most recently processed bridge event. */

  ethBlockHeight: Long;
  /** The Klyra block height of the most recently processed bridge event. */

  klyraBlockHeight: Long;
}
/**
 * BridgeEventInfo stores information about the most recently processed bridge
 * event.
 */

export interface BridgeEventInfoSDKType {
  /**
   * The next event id (the last processed id plus one) of the logs from the
   * Ethereum contract.
   */
  next_deposit_id: number;
  /**
   * The next event id (the last processed id plus one) of the withdraws on
   * Klyra.
   */

  next_withdraw_id: number;
  /** The Ethereum block height of the most recently processed bridge event. */

  eth_block_height: Long;
  /** The Klyra block height of the most recently processed bridge event. */

  klyra_block_height: Long;
}

function createBaseBridgeEventInfo(): BridgeEventInfo {
  return {
    nextDepositId: 0,
    nextWithdrawId: 0,
    ethBlockHeight: Long.UZERO,
    klyraBlockHeight: Long.UZERO
  };
}

export const BridgeEventInfo = {
  encode(message: BridgeEventInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nextDepositId !== 0) {
      writer.uint32(8).uint32(message.nextDepositId);
    }

    if (message.nextWithdrawId !== 0) {
      writer.uint32(16).uint32(message.nextWithdrawId);
    }

    if (!message.ethBlockHeight.isZero()) {
      writer.uint32(24).uint64(message.ethBlockHeight);
    }

    if (!message.klyraBlockHeight.isZero()) {
      writer.uint32(32).uint64(message.klyraBlockHeight);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BridgeEventInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBridgeEventInfo();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.nextDepositId = reader.uint32();
          break;

        case 2:
          message.nextWithdrawId = reader.uint32();
          break;

        case 3:
          message.ethBlockHeight = (reader.uint64() as Long);
          break;

        case 4:
          message.klyraBlockHeight = (reader.uint64() as Long);
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<BridgeEventInfo>): BridgeEventInfo {
    const message = createBaseBridgeEventInfo();
    message.nextDepositId = object.nextDepositId ?? 0;
    message.nextWithdrawId = object.nextWithdrawId ?? 0;
    message.ethBlockHeight = object.ethBlockHeight !== undefined && object.ethBlockHeight !== null ? Long.fromValue(object.ethBlockHeight) : Long.UZERO;
    message.klyraBlockHeight = object.klyraBlockHeight !== undefined && object.klyraBlockHeight !== null ? Long.fromValue(object.klyraBlockHeight) : Long.UZERO;
    return message;
  }

};