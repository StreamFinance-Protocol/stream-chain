import { LimitParams, LimitParamsAmino, LimitParamsSDKType } from "./limit_params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgSetLimitParams is the Msg/SetLimitParams request type. */
export interface MsgSetLimitParams {
    authority: string;
    /** Defines the parameters to set. All parameters must be supplied. */
    limitParams: LimitParams;
}
export interface MsgSetLimitParamsProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParams";
    value: Uint8Array;
}
/** MsgSetLimitParams is the Msg/SetLimitParams request type. */
export interface MsgSetLimitParamsAmino {
    authority?: string;
    /** Defines the parameters to set. All parameters must be supplied. */
    limit_params?: LimitParamsAmino;
}
export interface MsgSetLimitParamsAminoMsg {
    type: "/klyraprotocol.ratelimit.MsgSetLimitParams";
    value: MsgSetLimitParamsAmino;
}
/** MsgSetLimitParams is the Msg/SetLimitParams request type. */
export interface MsgSetLimitParamsSDKType {
    authority: string;
    limit_params: LimitParamsSDKType;
}
/** MsgSetLimitParamsResponse is the Msg/SetLimitParams response type. */
export interface MsgSetLimitParamsResponse {
}
export interface MsgSetLimitParamsResponseProtoMsg {
    typeUrl: "/klyraprotocol.ratelimit.MsgSetLimitParamsResponse";
    value: Uint8Array;
}
/** MsgSetLimitParamsResponse is the Msg/SetLimitParams response type. */
export interface MsgSetLimitParamsResponseAmino {
}
export interface MsgSetLimitParamsResponseAminoMsg {
    type: "/klyraprotocol.ratelimit.MsgSetLimitParamsResponse";
    value: MsgSetLimitParamsResponseAmino;
}
/** MsgSetLimitParamsResponse is the Msg/SetLimitParams response type. */
export interface MsgSetLimitParamsResponseSDKType {
}
export declare const MsgSetLimitParams: {
    typeUrl: string;
    is(o: any): o is MsgSetLimitParams;
    isSDK(o: any): o is MsgSetLimitParamsSDKType;
    isAmino(o: any): o is MsgSetLimitParamsAmino;
    encode(message: MsgSetLimitParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSetLimitParams;
    fromPartial(object: Partial<MsgSetLimitParams>): MsgSetLimitParams;
    fromAmino(object: MsgSetLimitParamsAmino): MsgSetLimitParams;
    toAmino(message: MsgSetLimitParams): MsgSetLimitParamsAmino;
    fromAminoMsg(object: MsgSetLimitParamsAminoMsg): MsgSetLimitParams;
    fromProtoMsg(message: MsgSetLimitParamsProtoMsg): MsgSetLimitParams;
    toProto(message: MsgSetLimitParams): Uint8Array;
    toProtoMsg(message: MsgSetLimitParams): MsgSetLimitParamsProtoMsg;
};
export declare const MsgSetLimitParamsResponse: {
    typeUrl: string;
    is(o: any): o is MsgSetLimitParamsResponse;
    isSDK(o: any): o is MsgSetLimitParamsResponseSDKType;
    isAmino(o: any): o is MsgSetLimitParamsResponseAmino;
    encode(_: MsgSetLimitParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSetLimitParamsResponse;
    fromPartial(_: Partial<MsgSetLimitParamsResponse>): MsgSetLimitParamsResponse;
    fromAmino(_: MsgSetLimitParamsResponseAmino): MsgSetLimitParamsResponse;
    toAmino(_: MsgSetLimitParamsResponse): MsgSetLimitParamsResponseAmino;
    fromAminoMsg(object: MsgSetLimitParamsResponseAminoMsg): MsgSetLimitParamsResponse;
    fromProtoMsg(message: MsgSetLimitParamsResponseProtoMsg): MsgSetLimitParamsResponse;
    toProto(message: MsgSetLimitParamsResponse): Uint8Array;
    toProtoMsg(message: MsgSetLimitParamsResponse): MsgSetLimitParamsResponseProtoMsg;
};
