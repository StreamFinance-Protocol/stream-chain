//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
/**
 * AddsDAIEventsRequest is a request message that contains a new
 * sDAI conversion rate.
 */
export interface AddsDAIEventRequest {
  conversionRate: string;
}
export interface AddsDAIEventRequestProtoMsg {
  typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventRequest";
  value: Uint8Array;
}
/**
 * AddsDAIEventsRequest is a request message that contains a new
 * sDAI conversion rate.
 */
export interface AddsDAIEventRequestAmino {
  conversion_rate?: string;
}
export interface AddsDAIEventRequestAminoMsg {
  type: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventRequest";
  value: AddsDAIEventRequestAmino;
}
/**
 * AddsDAIEventsRequest is a request message that contains a new
 * sDAI conversion rate.
 */
export interface AddsDAIEventRequestSDKType {
  conversion_rate: string;
}
/** AddsDAIEventsResponse is a response message for AddsDAIEventsRequest. */
export interface AddsDAIEventResponse {}
export interface AddsDAIEventResponseProtoMsg {
  typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventResponse";
  value: Uint8Array;
}
/** AddsDAIEventsResponse is a response message for AddsDAIEventsRequest. */
export interface AddsDAIEventResponseAmino {}
export interface AddsDAIEventResponseAminoMsg {
  type: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventResponse";
  value: AddsDAIEventResponseAmino;
}
/** AddsDAIEventsResponse is a response message for AddsDAIEventsRequest. */
export interface AddsDAIEventResponseSDKType {}
function createBaseAddsDAIEventRequest(): AddsDAIEventRequest {
  return {
    conversionRate: ""
  };
}
export const AddsDAIEventRequest = {
  typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventRequest",
  is(o: any): o is AddsDAIEventRequest {
    return o && (o.$typeUrl === AddsDAIEventRequest.typeUrl || typeof o.conversionRate === "string");
  },
  isSDK(o: any): o is AddsDAIEventRequestSDKType {
    return o && (o.$typeUrl === AddsDAIEventRequest.typeUrl || typeof o.conversion_rate === "string");
  },
  isAmino(o: any): o is AddsDAIEventRequestAmino {
    return o && (o.$typeUrl === AddsDAIEventRequest.typeUrl || typeof o.conversion_rate === "string");
  },
  encode(message: AddsDAIEventRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.conversionRate !== "") {
      writer.uint32(10).string(message.conversionRate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AddsDAIEventRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddsDAIEventRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversionRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AddsDAIEventRequest>): AddsDAIEventRequest {
    const message = createBaseAddsDAIEventRequest();
    message.conversionRate = object.conversionRate ?? "";
    return message;
  },
  fromAmino(object: AddsDAIEventRequestAmino): AddsDAIEventRequest {
    const message = createBaseAddsDAIEventRequest();
    if (object.conversion_rate !== undefined && object.conversion_rate !== null) {
      message.conversionRate = object.conversion_rate;
    }
    return message;
  },
  toAmino(message: AddsDAIEventRequest): AddsDAIEventRequestAmino {
    const obj: any = {};
    obj.conversion_rate = message.conversionRate === "" ? undefined : message.conversionRate;
    return obj;
  },
  fromAminoMsg(object: AddsDAIEventRequestAminoMsg): AddsDAIEventRequest {
    return AddsDAIEventRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: AddsDAIEventRequestProtoMsg): AddsDAIEventRequest {
    return AddsDAIEventRequest.decode(message.value);
  },
  toProto(message: AddsDAIEventRequest): Uint8Array {
    return AddsDAIEventRequest.encode(message).finish();
  },
  toProtoMsg(message: AddsDAIEventRequest): AddsDAIEventRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventRequest",
      value: AddsDAIEventRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(AddsDAIEventRequest.typeUrl, AddsDAIEventRequest);
function createBaseAddsDAIEventResponse(): AddsDAIEventResponse {
  return {};
}
export const AddsDAIEventResponse = {
  typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventResponse",
  is(o: any): o is AddsDAIEventResponse {
    return o && o.$typeUrl === AddsDAIEventResponse.typeUrl;
  },
  isSDK(o: any): o is AddsDAIEventResponseSDKType {
    return o && o.$typeUrl === AddsDAIEventResponse.typeUrl;
  },
  isAmino(o: any): o is AddsDAIEventResponseAmino {
    return o && o.$typeUrl === AddsDAIEventResponse.typeUrl;
  },
  encode(_: AddsDAIEventResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AddsDAIEventResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddsDAIEventResponse();
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
  fromPartial(_: Partial<AddsDAIEventResponse>): AddsDAIEventResponse {
    const message = createBaseAddsDAIEventResponse();
    return message;
  },
  fromAmino(_: AddsDAIEventResponseAmino): AddsDAIEventResponse {
    const message = createBaseAddsDAIEventResponse();
    return message;
  },
  toAmino(_: AddsDAIEventResponse): AddsDAIEventResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: AddsDAIEventResponseAminoMsg): AddsDAIEventResponse {
    return AddsDAIEventResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: AddsDAIEventResponseProtoMsg): AddsDAIEventResponse {
    return AddsDAIEventResponse.decode(message.value);
  },
  toProto(message: AddsDAIEventResponse): Uint8Array {
    return AddsDAIEventResponse.encode(message).finish();
  },
  toProtoMsg(message: AddsDAIEventResponse): AddsDAIEventResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventResponse",
      value: AddsDAIEventResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(AddsDAIEventResponse.typeUrl, AddsDAIEventResponse);