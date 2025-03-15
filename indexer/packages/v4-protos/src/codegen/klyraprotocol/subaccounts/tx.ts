import { SubaccountId, SubaccountIdSDKType } from "./subaccount";
import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../helpers";
/** MsgClaimYieldsForSubaccount is the Msg/ClaimYieldsForSubaccount request type. */

export interface MsgClaimYieldsForSubaccount {
  /** MsgClaimYieldsForSubaccount is the Msg/ClaimYieldsForSubaccount request type. */
  id?: SubaccountId;
}
/** MsgClaimYieldsForSubaccount is the Msg/ClaimYieldsForSubaccount request type. */

export interface MsgClaimYieldsForSubaccountSDKType {
  /** MsgClaimYieldsForSubaccount is the Msg/ClaimYieldsForSubaccount request type. */
  id?: SubaccountIdSDKType;
}
/**
 * MsgClaimYieldsForSubaccountResponse is the Msg/ClaimYieldsForSubaccount
 * response type.
 */

export interface MsgClaimYieldsForSubaccountResponse {}
/**
 * MsgClaimYieldsForSubaccountResponse is the Msg/ClaimYieldsForSubaccount
 * response type.
 */

export interface MsgClaimYieldsForSubaccountResponseSDKType {}

function createBaseMsgClaimYieldsForSubaccount(): MsgClaimYieldsForSubaccount {
  return {
    id: undefined
  };
}

export const MsgClaimYieldsForSubaccount = {
  encode(message: MsgClaimYieldsForSubaccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      SubaccountId.encode(message.id, writer.uint32(10).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimYieldsForSubaccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimYieldsForSubaccount();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.id = SubaccountId.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<MsgClaimYieldsForSubaccount>): MsgClaimYieldsForSubaccount {
    const message = createBaseMsgClaimYieldsForSubaccount();
    message.id = object.id !== undefined && object.id !== null ? SubaccountId.fromPartial(object.id) : undefined;
    return message;
  }

};

function createBaseMsgClaimYieldsForSubaccountResponse(): MsgClaimYieldsForSubaccountResponse {
  return {};
}

export const MsgClaimYieldsForSubaccountResponse = {
  encode(_: MsgClaimYieldsForSubaccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimYieldsForSubaccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimYieldsForSubaccountResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(_: DeepPartial<MsgClaimYieldsForSubaccountResponse>): MsgClaimYieldsForSubaccountResponse {
    const message = createBaseMsgClaimYieldsForSubaccountResponse();
    return message;
  }

};