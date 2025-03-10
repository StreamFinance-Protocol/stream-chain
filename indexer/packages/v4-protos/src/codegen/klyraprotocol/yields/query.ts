import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../helpers";
/** GetSDAIPriceRequest is a request type for the GetSDAIPrice RPC method. */

export interface GetSDAIPriceQueryRequest {}
/** GetSDAIPriceRequest is a request type for the GetSDAIPrice RPC method. */

export interface GetSDAIPriceQueryRequestSDKType {}
/** GetSDAIPriceResponse is a response type for the GetSDAIPrice RPC method. */

export interface GetSDAIPriceQueryResponse {
  /** Assuming price is returned as a string */
  price: string;
}
/** GetSDAIPriceResponse is a response type for the GetSDAIPrice RPC method. */

export interface GetSDAIPriceQueryResponseSDKType {
  /** Assuming price is returned as a string */
  price: string;
}
/**
 * GetAssetYieldIndexRequest is a request type for the GetAssetYieldIndex RPC
 * method.
 */

export interface GetAssetYieldIndexQueryRequest {}
/**
 * GetAssetYieldIndexRequest is a request type for the GetAssetYieldIndex RPC
 * method.
 */

export interface GetAssetYieldIndexQueryRequestSDKType {}
/**
 * GetSDAIPriceQueryResponse is a response type for the GetAssetYieldIndex RPC
 * method.
 */

export interface GetAssetYieldIndexQueryResponse {
  /** Handled as a string, should be converted to big.Rat. */
  assetYieldIndex: string;
}
/**
 * GetSDAIPriceQueryResponse is a response type for the GetAssetYieldIndex RPC
 * method.
 */

export interface GetAssetYieldIndexQueryResponseSDKType {
  /** Handled as a string, should be converted to big.Rat. */
  asset_yield_index: string;
}

function createBaseGetSDAIPriceQueryRequest(): GetSDAIPriceQueryRequest {
  return {};
}

export const GetSDAIPriceQueryRequest = {
  encode(_: GetSDAIPriceQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSDAIPriceQueryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSDAIPriceQueryRequest();

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

  fromPartial(_: DeepPartial<GetSDAIPriceQueryRequest>): GetSDAIPriceQueryRequest {
    const message = createBaseGetSDAIPriceQueryRequest();
    return message;
  }

};

function createBaseGetSDAIPriceQueryResponse(): GetSDAIPriceQueryResponse {
  return {
    price: ""
  };
}

export const GetSDAIPriceQueryResponse = {
  encode(message: GetSDAIPriceQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.price !== "") {
      writer.uint32(10).string(message.price);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSDAIPriceQueryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSDAIPriceQueryResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.price = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<GetSDAIPriceQueryResponse>): GetSDAIPriceQueryResponse {
    const message = createBaseGetSDAIPriceQueryResponse();
    message.price = object.price ?? "";
    return message;
  }

};

function createBaseGetAssetYieldIndexQueryRequest(): GetAssetYieldIndexQueryRequest {
  return {};
}

export const GetAssetYieldIndexQueryRequest = {
  encode(_: GetAssetYieldIndexQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAssetYieldIndexQueryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAssetYieldIndexQueryRequest();

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

  fromPartial(_: DeepPartial<GetAssetYieldIndexQueryRequest>): GetAssetYieldIndexQueryRequest {
    const message = createBaseGetAssetYieldIndexQueryRequest();
    return message;
  }

};

function createBaseGetAssetYieldIndexQueryResponse(): GetAssetYieldIndexQueryResponse {
  return {
    assetYieldIndex: ""
  };
}

export const GetAssetYieldIndexQueryResponse = {
  encode(message: GetAssetYieldIndexQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.assetYieldIndex !== "") {
      writer.uint32(10).string(message.assetYieldIndex);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAssetYieldIndexQueryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAssetYieldIndexQueryResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.assetYieldIndex = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<GetAssetYieldIndexQueryResponse>): GetAssetYieldIndexQueryResponse {
    const message = createBaseGetAssetYieldIndexQueryResponse();
    message.assetYieldIndex = object.assetYieldIndex ?? "";
    return message;
  }

};