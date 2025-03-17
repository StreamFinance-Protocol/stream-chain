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
 * GetAssetYieldsIndexRequest is a request type for the GetAssetYieldsIndex RPC
 * method.
 */

export interface GetAssetYieldsIndexQueryRequest {}
/**
 * GetAssetYieldsIndexRequest is a request type for the GetAssetYieldsIndex RPC
 * method.
 */

export interface GetAssetYieldsIndexQueryRequestSDKType {}
/**
 * GetSDAIPriceQueryResponse is a response type for the GetAssetYieldsIndex RPC
 * method.
 */

export interface GetAssetYieldsIndexQueryResponse {
  /** Handled as a string, should be converted to big.Rat. */
  assetYieldsIndex: string;
}
/**
 * GetSDAIPriceQueryResponse is a response type for the GetAssetYieldsIndex RPC
 * method.
 */

export interface GetAssetYieldsIndexQueryResponseSDKType {
  /** Handled as a string, should be converted to big.Rat. */
  asset_yields_index: string;
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

function createBaseGetAssetYieldsIndexQueryRequest(): GetAssetYieldsIndexQueryRequest {
  return {};
}

export const GetAssetYieldsIndexQueryRequest = {
  encode(_: GetAssetYieldsIndexQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAssetYieldsIndexQueryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAssetYieldsIndexQueryRequest();

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

  fromPartial(_: DeepPartial<GetAssetYieldsIndexQueryRequest>): GetAssetYieldsIndexQueryRequest {
    const message = createBaseGetAssetYieldsIndexQueryRequest();
    return message;
  }

};

function createBaseGetAssetYieldsIndexQueryResponse(): GetAssetYieldsIndexQueryResponse {
  return {
    assetYieldsIndex: ""
  };
}

export const GetAssetYieldsIndexQueryResponse = {
  encode(message: GetAssetYieldsIndexQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.assetYieldsIndex !== "") {
      writer.uint32(10).string(message.assetYieldsIndex);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAssetYieldsIndexQueryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAssetYieldsIndexQueryResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.assetYieldsIndex = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromPartial(object: DeepPartial<GetAssetYieldsIndexQueryResponse>): GetAssetYieldsIndexQueryResponse {
    const message = createBaseGetAssetYieldsIndexQueryResponse();
    message.assetYieldsIndex = object.assetYieldsIndex ?? "";
    return message;
  }

};