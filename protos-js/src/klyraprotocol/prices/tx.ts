//@ts-nocheck
import { MarketParam, MarketParamAmino, MarketParamSDKType } from "./market_param";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/**
 * MsgCreateOracleMarket is a message used by x/gov for creating a new oracle
 * market.
 */
export interface MsgCreateOracleMarket {
  /** The address that controls the module. */
  authority: string;
  /** `params` defines parameters for the new oracle market. */
  params: MarketParam;
}
export interface MsgCreateOracleMarketProtoMsg {
  typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket";
  value: Uint8Array;
}
/**
 * MsgCreateOracleMarket is a message used by x/gov for creating a new oracle
 * market.
 */
export interface MsgCreateOracleMarketAmino {
  /** The address that controls the module. */
  authority?: string;
  /** `params` defines parameters for the new oracle market. */
  params?: MarketParamAmino;
}
export interface MsgCreateOracleMarketAminoMsg {
  type: "/klyraprotocol.prices.MsgCreateOracleMarket";
  value: MsgCreateOracleMarketAmino;
}
/**
 * MsgCreateOracleMarket is a message used by x/gov for creating a new oracle
 * market.
 */
export interface MsgCreateOracleMarketSDKType {
  authority: string;
  params: MarketParamSDKType;
}
/** MsgCreateOracleMarketResponse defines the CreateOracleMarket response type. */
export interface MsgCreateOracleMarketResponse {}
export interface MsgCreateOracleMarketResponseProtoMsg {
  typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarketResponse";
  value: Uint8Array;
}
/** MsgCreateOracleMarketResponse defines the CreateOracleMarket response type. */
export interface MsgCreateOracleMarketResponseAmino {}
export interface MsgCreateOracleMarketResponseAminoMsg {
  type: "/klyraprotocol.prices.MsgCreateOracleMarketResponse";
  value: MsgCreateOracleMarketResponseAmino;
}
/** MsgCreateOracleMarketResponse defines the CreateOracleMarket response type. */
export interface MsgCreateOracleMarketResponseSDKType {}
/**
 * MsgUpdateMarketParam is a message used by x/gov for updating the parameters
 * of an oracle market.
 */
export interface MsgUpdateMarketParam {
  authority: string;
  /** The market param to update. Each field must be set. */
  marketParam: MarketParam;
}
export interface MsgUpdateMarketParamProtoMsg {
  typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam";
  value: Uint8Array;
}
/**
 * MsgUpdateMarketParam is a message used by x/gov for updating the parameters
 * of an oracle market.
 */
export interface MsgUpdateMarketParamAmino {
  authority?: string;
  /** The market param to update. Each field must be set. */
  market_param?: MarketParamAmino;
}
export interface MsgUpdateMarketParamAminoMsg {
  type: "/klyraprotocol.prices.MsgUpdateMarketParam";
  value: MsgUpdateMarketParamAmino;
}
/**
 * MsgUpdateMarketParam is a message used by x/gov for updating the parameters
 * of an oracle market.
 */
export interface MsgUpdateMarketParamSDKType {
  authority: string;
  market_param: MarketParamSDKType;
}
/** MsgUpdateMarketParamResponse defines the UpdateMarketParam response type. */
export interface MsgUpdateMarketParamResponse {}
export interface MsgUpdateMarketParamResponseProtoMsg {
  typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParamResponse";
  value: Uint8Array;
}
/** MsgUpdateMarketParamResponse defines the UpdateMarketParam response type. */
export interface MsgUpdateMarketParamResponseAmino {}
export interface MsgUpdateMarketParamResponseAminoMsg {
  type: "/klyraprotocol.prices.MsgUpdateMarketParamResponse";
  value: MsgUpdateMarketParamResponseAmino;
}
/** MsgUpdateMarketParamResponse defines the UpdateMarketParam response type. */
export interface MsgUpdateMarketParamResponseSDKType {}
function createBaseMsgCreateOracleMarket(): MsgCreateOracleMarket {
  return {
    authority: "",
    params: MarketParam.fromPartial({})
  };
}
export const MsgCreateOracleMarket = {
  typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
  is(o: any): o is MsgCreateOracleMarket {
    return o && (o.$typeUrl === MsgCreateOracleMarket.typeUrl || typeof o.authority === "string" && MarketParam.is(o.params));
  },
  isSDK(o: any): o is MsgCreateOracleMarketSDKType {
    return o && (o.$typeUrl === MsgCreateOracleMarket.typeUrl || typeof o.authority === "string" && MarketParam.isSDK(o.params));
  },
  isAmino(o: any): o is MsgCreateOracleMarketAmino {
    return o && (o.$typeUrl === MsgCreateOracleMarket.typeUrl || typeof o.authority === "string" && MarketParam.isAmino(o.params));
  },
  encode(message: MsgCreateOracleMarket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      MarketParam.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateOracleMarket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateOracleMarket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = MarketParam.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateOracleMarket>): MsgCreateOracleMarket {
    const message = createBaseMsgCreateOracleMarket();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? MarketParam.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgCreateOracleMarketAmino): MsgCreateOracleMarket {
    const message = createBaseMsgCreateOracleMarket();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = MarketParam.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgCreateOracleMarket): MsgCreateOracleMarketAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? MarketParam.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCreateOracleMarketAminoMsg): MsgCreateOracleMarket {
    return MsgCreateOracleMarket.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateOracleMarketProtoMsg): MsgCreateOracleMarket {
    return MsgCreateOracleMarket.decode(message.value);
  },
  toProto(message: MsgCreateOracleMarket): Uint8Array {
    return MsgCreateOracleMarket.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateOracleMarket): MsgCreateOracleMarketProtoMsg {
    return {
      typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
      value: MsgCreateOracleMarket.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateOracleMarket.typeUrl, MsgCreateOracleMarket);
function createBaseMsgCreateOracleMarketResponse(): MsgCreateOracleMarketResponse {
  return {};
}
export const MsgCreateOracleMarketResponse = {
  typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarketResponse",
  is(o: any): o is MsgCreateOracleMarketResponse {
    return o && o.$typeUrl === MsgCreateOracleMarketResponse.typeUrl;
  },
  isSDK(o: any): o is MsgCreateOracleMarketResponseSDKType {
    return o && o.$typeUrl === MsgCreateOracleMarketResponse.typeUrl;
  },
  isAmino(o: any): o is MsgCreateOracleMarketResponseAmino {
    return o && o.$typeUrl === MsgCreateOracleMarketResponse.typeUrl;
  },
  encode(_: MsgCreateOracleMarketResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateOracleMarketResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateOracleMarketResponse();
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
  fromPartial(_: Partial<MsgCreateOracleMarketResponse>): MsgCreateOracleMarketResponse {
    const message = createBaseMsgCreateOracleMarketResponse();
    return message;
  },
  fromAmino(_: MsgCreateOracleMarketResponseAmino): MsgCreateOracleMarketResponse {
    const message = createBaseMsgCreateOracleMarketResponse();
    return message;
  },
  toAmino(_: MsgCreateOracleMarketResponse): MsgCreateOracleMarketResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreateOracleMarketResponseAminoMsg): MsgCreateOracleMarketResponse {
    return MsgCreateOracleMarketResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateOracleMarketResponseProtoMsg): MsgCreateOracleMarketResponse {
    return MsgCreateOracleMarketResponse.decode(message.value);
  },
  toProto(message: MsgCreateOracleMarketResponse): Uint8Array {
    return MsgCreateOracleMarketResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateOracleMarketResponse): MsgCreateOracleMarketResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarketResponse",
      value: MsgCreateOracleMarketResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateOracleMarketResponse.typeUrl, MsgCreateOracleMarketResponse);
function createBaseMsgUpdateMarketParam(): MsgUpdateMarketParam {
  return {
    authority: "",
    marketParam: MarketParam.fromPartial({})
  };
}
export const MsgUpdateMarketParam = {
  typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
  is(o: any): o is MsgUpdateMarketParam {
    return o && (o.$typeUrl === MsgUpdateMarketParam.typeUrl || typeof o.authority === "string" && MarketParam.is(o.marketParam));
  },
  isSDK(o: any): o is MsgUpdateMarketParamSDKType {
    return o && (o.$typeUrl === MsgUpdateMarketParam.typeUrl || typeof o.authority === "string" && MarketParam.isSDK(o.market_param));
  },
  isAmino(o: any): o is MsgUpdateMarketParamAmino {
    return o && (o.$typeUrl === MsgUpdateMarketParam.typeUrl || typeof o.authority === "string" && MarketParam.isAmino(o.market_param));
  },
  encode(message: MsgUpdateMarketParam, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.marketParam !== undefined) {
      MarketParam.encode(message.marketParam, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateMarketParam {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMarketParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.marketParam = MarketParam.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateMarketParam>): MsgUpdateMarketParam {
    const message = createBaseMsgUpdateMarketParam();
    message.authority = object.authority ?? "";
    message.marketParam = object.marketParam !== undefined && object.marketParam !== null ? MarketParam.fromPartial(object.marketParam) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateMarketParamAmino): MsgUpdateMarketParam {
    const message = createBaseMsgUpdateMarketParam();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.market_param !== undefined && object.market_param !== null) {
      message.marketParam = MarketParam.fromAmino(object.market_param);
    }
    return message;
  },
  toAmino(message: MsgUpdateMarketParam): MsgUpdateMarketParamAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.market_param = message.marketParam ? MarketParam.toAmino(message.marketParam) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateMarketParamAminoMsg): MsgUpdateMarketParam {
    return MsgUpdateMarketParam.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateMarketParamProtoMsg): MsgUpdateMarketParam {
    return MsgUpdateMarketParam.decode(message.value);
  },
  toProto(message: MsgUpdateMarketParam): Uint8Array {
    return MsgUpdateMarketParam.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateMarketParam): MsgUpdateMarketParamProtoMsg {
    return {
      typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
      value: MsgUpdateMarketParam.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateMarketParam.typeUrl, MsgUpdateMarketParam);
function createBaseMsgUpdateMarketParamResponse(): MsgUpdateMarketParamResponse {
  return {};
}
export const MsgUpdateMarketParamResponse = {
  typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParamResponse",
  is(o: any): o is MsgUpdateMarketParamResponse {
    return o && o.$typeUrl === MsgUpdateMarketParamResponse.typeUrl;
  },
  isSDK(o: any): o is MsgUpdateMarketParamResponseSDKType {
    return o && o.$typeUrl === MsgUpdateMarketParamResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateMarketParamResponseAmino {
    return o && o.$typeUrl === MsgUpdateMarketParamResponse.typeUrl;
  },
  encode(_: MsgUpdateMarketParamResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateMarketParamResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMarketParamResponse();
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
  fromPartial(_: Partial<MsgUpdateMarketParamResponse>): MsgUpdateMarketParamResponse {
    const message = createBaseMsgUpdateMarketParamResponse();
    return message;
  },
  fromAmino(_: MsgUpdateMarketParamResponseAmino): MsgUpdateMarketParamResponse {
    const message = createBaseMsgUpdateMarketParamResponse();
    return message;
  },
  toAmino(_: MsgUpdateMarketParamResponse): MsgUpdateMarketParamResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateMarketParamResponseAminoMsg): MsgUpdateMarketParamResponse {
    return MsgUpdateMarketParamResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateMarketParamResponseProtoMsg): MsgUpdateMarketParamResponse {
    return MsgUpdateMarketParamResponse.decode(message.value);
  },
  toProto(message: MsgUpdateMarketParamResponse): Uint8Array {
    return MsgUpdateMarketParamResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateMarketParamResponse): MsgUpdateMarketParamResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParamResponse",
      value: MsgUpdateMarketParamResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateMarketParamResponse.typeUrl, MsgUpdateMarketParamResponse);