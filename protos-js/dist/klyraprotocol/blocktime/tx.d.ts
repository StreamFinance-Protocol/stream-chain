import { DowntimeParams, DowntimeParamsAmino, DowntimeParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgUpdateDowntimeParams is the Msg/UpdateDowntimeParams request type. */
export interface MsgUpdateDowntimeParams {
    authority: string;
    /** Defines the parameters to update. All parameters must be supplied. */
    params: DowntimeParams;
}
export interface MsgUpdateDowntimeParamsProtoMsg {
    typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams";
    value: Uint8Array;
}
/** MsgUpdateDowntimeParams is the Msg/UpdateDowntimeParams request type. */
export interface MsgUpdateDowntimeParamsAmino {
    authority?: string;
    /** Defines the parameters to update. All parameters must be supplied. */
    params?: DowntimeParamsAmino;
}
export interface MsgUpdateDowntimeParamsAminoMsg {
    type: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams";
    value: MsgUpdateDowntimeParamsAmino;
}
/** MsgUpdateDowntimeParams is the Msg/UpdateDowntimeParams request type. */
export interface MsgUpdateDowntimeParamsSDKType {
    authority: string;
    params: DowntimeParamsSDKType;
}
/**
 * MsgUpdateDowntimeParamsResponse is the Msg/UpdateDowntimeParams response
 * type.
 */
export interface MsgUpdateDowntimeParamsResponse {
}
export interface MsgUpdateDowntimeParamsResponseProtoMsg {
    typeUrl: "/klyraprotocol.blocktime.MsgUpdateDowntimeParamsResponse";
    value: Uint8Array;
}
/**
 * MsgUpdateDowntimeParamsResponse is the Msg/UpdateDowntimeParams response
 * type.
 */
export interface MsgUpdateDowntimeParamsResponseAmino {
}
export interface MsgUpdateDowntimeParamsResponseAminoMsg {
    type: "/klyraprotocol.blocktime.MsgUpdateDowntimeParamsResponse";
    value: MsgUpdateDowntimeParamsResponseAmino;
}
/**
 * MsgUpdateDowntimeParamsResponse is the Msg/UpdateDowntimeParams response
 * type.
 */
export interface MsgUpdateDowntimeParamsResponseSDKType {
}
export declare const MsgUpdateDowntimeParams: {
    typeUrl: string;
    is(o: any): o is MsgUpdateDowntimeParams;
    isSDK(o: any): o is MsgUpdateDowntimeParamsSDKType;
    isAmino(o: any): o is MsgUpdateDowntimeParamsAmino;
    encode(message: MsgUpdateDowntimeParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateDowntimeParams;
    fromPartial(object: Partial<MsgUpdateDowntimeParams>): MsgUpdateDowntimeParams;
    fromAmino(object: MsgUpdateDowntimeParamsAmino): MsgUpdateDowntimeParams;
    toAmino(message: MsgUpdateDowntimeParams): MsgUpdateDowntimeParamsAmino;
    fromAminoMsg(object: MsgUpdateDowntimeParamsAminoMsg): MsgUpdateDowntimeParams;
    fromProtoMsg(message: MsgUpdateDowntimeParamsProtoMsg): MsgUpdateDowntimeParams;
    toProto(message: MsgUpdateDowntimeParams): Uint8Array;
    toProtoMsg(message: MsgUpdateDowntimeParams): MsgUpdateDowntimeParamsProtoMsg;
};
export declare const MsgUpdateDowntimeParamsResponse: {
    typeUrl: string;
    is(o: any): o is MsgUpdateDowntimeParamsResponse;
    isSDK(o: any): o is MsgUpdateDowntimeParamsResponseSDKType;
    isAmino(o: any): o is MsgUpdateDowntimeParamsResponseAmino;
    encode(_: MsgUpdateDowntimeParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateDowntimeParamsResponse;
    fromPartial(_: Partial<MsgUpdateDowntimeParamsResponse>): MsgUpdateDowntimeParamsResponse;
    fromAmino(_: MsgUpdateDowntimeParamsResponseAmino): MsgUpdateDowntimeParamsResponse;
    toAmino(_: MsgUpdateDowntimeParamsResponse): MsgUpdateDowntimeParamsResponseAmino;
    fromAminoMsg(object: MsgUpdateDowntimeParamsResponseAminoMsg): MsgUpdateDowntimeParamsResponse;
    fromProtoMsg(message: MsgUpdateDowntimeParamsResponseProtoMsg): MsgUpdateDowntimeParamsResponse;
    toProto(message: MsgUpdateDowntimeParamsResponse): Uint8Array;
    toProtoMsg(message: MsgUpdateDowntimeParamsResponse): MsgUpdateDowntimeParamsResponseProtoMsg;
};
