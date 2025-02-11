import { Coin, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import * as _m0 from "protobufjs/minimal";
import { Long, DeepPartial } from "../../helpers";
/** BridgeEvent is a recognized event from the Ethereum blockchain. */

export interface BridgeEvent {
  /** The unique id of the Ethereum event log. */
  id: number;
  /** The tokens bridged. */

  coin?: Coin;
  /** The account address or module address to bridge to. */

  address: string;
  /** The Ethereum or klyra block height of the event. */

  blockHeight: Long;
  /** True if the bridge event is for a deposit */

  isDeposit: boolean;
}
/** BridgeEvent is a recognized event from the Ethereum blockchain. */

export interface BridgeEventSDKType {
  /** The unique id of the Ethereum event log. */
  id: number;
  /** The tokens bridged. */

  coin?: CoinSDKType;
  /** The account address or module address to bridge to. */

  address: string;
  /** The Ethereum or klyra block height of the event. */

  block_height: Long;
  /** True if the bridge event is for a deposit */

  is_deposit: boolean;
}
export interface BridgeWithdraw {
  /** The amount of sdai to withdraw */
  sdaiAmount: string;
  /** The klyra account that sdai is being withdrawn from */

  account: string;
  /** The eth address that the funds are being bridged to */

  ethRecipient: string;
}
export interface BridgeWithdrawSDKType {
  /** The amount of sdai to withdraw */
  sdai_amount: string;
  /** The klyra account that sdai is being withdrawn from */

  account: string;
  /** The eth address that the funds are being bridged to */

  eth_recipient: string;
}

function createBaseBridgeEvent(): BridgeEvent {
  return {
    id: 0,
    coin: undefined,
    address: "",
    blockHeight: Long.UZERO,
    isDeposit: false
  };
}

export const BridgeEvent = {
  encode(message: BridgeEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }

    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(18).fork()).ldelim();
    }

    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }

    if (!message.blockHeight.isZero()) {
      writer.uint32(32).uint64(message.blockHeight);
    }

    if (message.isDeposit === true) {
      writer.uint32(40).bool(message.isDeposit);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BridgeEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBridgeEvent();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;

        case 2:
          message.coin = Coin.decode(reader, reader.uint32());
          break;

        case 3:
          message.address = reader.string();
          break;

        case 4:
          message.blockHeight = (reader.uint64() as Long);
          break;

        case 5:
          message.isDeposit = reader.bool();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<BridgeEvent>): BridgeEvent {
    const message = createBaseBridgeEvent();
    message.id = object.id ?? 0;
    message.coin = object.coin !== undefined && object.coin !== null ? Coin.fromPartial(object.coin) : undefined;
    message.address = object.address ?? "";
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? Long.fromValue(object.blockHeight) : Long.UZERO;
    message.isDeposit = object.isDeposit ?? false;
    return message;
  }

};

function createBaseBridgeWithdraw(): BridgeWithdraw {
  return {
    sdaiAmount: "",
    account: "",
    ethRecipient: ""
  };
}

export const BridgeWithdraw = {
  encode(message: BridgeWithdraw, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sdaiAmount !== "") {
      writer.uint32(10).string(message.sdaiAmount);
    }

    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }

    if (message.ethRecipient !== "") {
      writer.uint32(26).string(message.ethRecipient);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BridgeWithdraw {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBridgeWithdraw();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.sdaiAmount = reader.string();
          break;

        case 2:
          message.account = reader.string();
          break;

        case 3:
          message.ethRecipient = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<BridgeWithdraw>): BridgeWithdraw {
    const message = createBaseBridgeWithdraw();
    message.sdaiAmount = object.sdaiAmount ?? "";
    message.account = object.account ?? "";
    message.ethRecipient = object.ethRecipient ?? "";
    return message;
  }

};