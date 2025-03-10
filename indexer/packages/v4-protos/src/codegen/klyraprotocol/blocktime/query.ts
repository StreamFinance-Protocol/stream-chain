import { BlockInfo, BlockInfoSDKType } from "./blocktime";
import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../helpers";
/**
 * QueryPreviousBlockInfoRequest is a request type for the PreviousBlockInfo
 * RPC method.
 */

export interface QueryPreviousBlockInfoRequest {}
/**
 * QueryPreviousBlockInfoRequest is a request type for the PreviousBlockInfo
 * RPC method.
 */

export interface QueryPreviousBlockInfoRequestSDKType {}
/**
 * QueryPreviousBlockInfoResponse is a request type for the PreviousBlockInfo
 * RPC method.
 */

export interface QueryPreviousBlockInfoResponse {
  /**
   * QueryPreviousBlockInfoResponse is a request type for the PreviousBlockInfo
   * RPC method.
   */
  info?: BlockInfo;
}
/**
 * QueryPreviousBlockInfoResponse is a request type for the PreviousBlockInfo
 * RPC method.
 */

export interface QueryPreviousBlockInfoResponseSDKType {
  /**
   * QueryPreviousBlockInfoResponse is a request type for the PreviousBlockInfo
   * RPC method.
   */
  info?: BlockInfoSDKType;
}

function createBaseQueryPreviousBlockInfoRequest(): QueryPreviousBlockInfoRequest {
  return {};
}

export const QueryPreviousBlockInfoRequest = {
  encode(_: QueryPreviousBlockInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPreviousBlockInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPreviousBlockInfoRequest();

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

  fromPartial(_: DeepPartial<QueryPreviousBlockInfoRequest>): QueryPreviousBlockInfoRequest {
    const message = createBaseQueryPreviousBlockInfoRequest();
    return message;
  }

};

function createBaseQueryPreviousBlockInfoResponse(): QueryPreviousBlockInfoResponse {
  return {
    info: undefined
  };
}

export const QueryPreviousBlockInfoResponse = {
  encode(message: QueryPreviousBlockInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.info !== undefined) {
      BlockInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPreviousBlockInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPreviousBlockInfoResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.info = BlockInfo.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<QueryPreviousBlockInfoResponse>): QueryPreviousBlockInfoResponse {
    const message = createBaseQueryPreviousBlockInfoResponse();
    message.info = object.info !== undefined && object.info !== null ? BlockInfo.fromPartial(object.info) : undefined;
    return message;
  }

};