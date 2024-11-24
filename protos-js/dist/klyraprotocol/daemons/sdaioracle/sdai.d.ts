import { BinaryReader, BinaryWriter } from "../../../binary";
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
export interface AddsDAIEventResponse {
}
export interface AddsDAIEventResponseProtoMsg {
    typeUrl: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventResponse";
    value: Uint8Array;
}
/** AddsDAIEventsResponse is a response message for AddsDAIEventsRequest. */
export interface AddsDAIEventResponseAmino {
}
export interface AddsDAIEventResponseAminoMsg {
    type: "/klyraprotocol.daemons.sdaioracle.AddsDAIEventResponse";
    value: AddsDAIEventResponseAmino;
}
/** AddsDAIEventsResponse is a response message for AddsDAIEventsRequest. */
export interface AddsDAIEventResponseSDKType {
}
export declare const AddsDAIEventRequest: {
    typeUrl: string;
    is(o: any): o is AddsDAIEventRequest;
    isSDK(o: any): o is AddsDAIEventRequestSDKType;
    isAmino(o: any): o is AddsDAIEventRequestAmino;
    encode(message: AddsDAIEventRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AddsDAIEventRequest;
    fromPartial(object: Partial<AddsDAIEventRequest>): AddsDAIEventRequest;
    fromAmino(object: AddsDAIEventRequestAmino): AddsDAIEventRequest;
    toAmino(message: AddsDAIEventRequest): AddsDAIEventRequestAmino;
    fromAminoMsg(object: AddsDAIEventRequestAminoMsg): AddsDAIEventRequest;
    fromProtoMsg(message: AddsDAIEventRequestProtoMsg): AddsDAIEventRequest;
    toProto(message: AddsDAIEventRequest): Uint8Array;
    toProtoMsg(message: AddsDAIEventRequest): AddsDAIEventRequestProtoMsg;
};
export declare const AddsDAIEventResponse: {
    typeUrl: string;
    is(o: any): o is AddsDAIEventResponse;
    isSDK(o: any): o is AddsDAIEventResponseSDKType;
    isAmino(o: any): o is AddsDAIEventResponseAmino;
    encode(_: AddsDAIEventResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AddsDAIEventResponse;
    fromPartial(_: Partial<AddsDAIEventResponse>): AddsDAIEventResponse;
    fromAmino(_: AddsDAIEventResponseAmino): AddsDAIEventResponse;
    toAmino(_: AddsDAIEventResponse): AddsDAIEventResponseAmino;
    fromAminoMsg(object: AddsDAIEventResponseAminoMsg): AddsDAIEventResponse;
    fromProtoMsg(message: AddsDAIEventResponseProtoMsg): AddsDAIEventResponse;
    toProto(message: AddsDAIEventResponse): Uint8Array;
    toProtoMsg(message: AddsDAIEventResponse): AddsDAIEventResponseProtoMsg;
};
