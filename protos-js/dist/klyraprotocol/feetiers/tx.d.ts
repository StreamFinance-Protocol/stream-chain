import { PerpetualFeeParams, PerpetualFeeParamsAmino, PerpetualFeeParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgUpdatePerpetualFeeParams is the Msg/UpdatePerpetualFeeParams request type. */
export interface MsgUpdatePerpetualFeeParams {
    authority: string;
    /** Defines the parameters to update. All parameters must be supplied. */
    params: PerpetualFeeParams;
}
export interface MsgUpdatePerpetualFeeParamsProtoMsg {
    typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams";
    value: Uint8Array;
}
/** MsgUpdatePerpetualFeeParams is the Msg/UpdatePerpetualFeeParams request type. */
export interface MsgUpdatePerpetualFeeParamsAmino {
    authority?: string;
    /** Defines the parameters to update. All parameters must be supplied. */
    params?: PerpetualFeeParamsAmino;
}
export interface MsgUpdatePerpetualFeeParamsAminoMsg {
    type: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams";
    value: MsgUpdatePerpetualFeeParamsAmino;
}
/** MsgUpdatePerpetualFeeParams is the Msg/UpdatePerpetualFeeParams request type. */
export interface MsgUpdatePerpetualFeeParamsSDKType {
    authority: string;
    params: PerpetualFeeParamsSDKType;
}
/**
 * MsgUpdatePerpetualFeeParamsResponse is the Msg/UpdatePerpetualFeeParams
 * response type.
 */
export interface MsgUpdatePerpetualFeeParamsResponse {
}
export interface MsgUpdatePerpetualFeeParamsResponseProtoMsg {
    typeUrl: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParamsResponse";
    value: Uint8Array;
}
/**
 * MsgUpdatePerpetualFeeParamsResponse is the Msg/UpdatePerpetualFeeParams
 * response type.
 */
export interface MsgUpdatePerpetualFeeParamsResponseAmino {
}
export interface MsgUpdatePerpetualFeeParamsResponseAminoMsg {
    type: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParamsResponse";
    value: MsgUpdatePerpetualFeeParamsResponseAmino;
}
/**
 * MsgUpdatePerpetualFeeParamsResponse is the Msg/UpdatePerpetualFeeParams
 * response type.
 */
export interface MsgUpdatePerpetualFeeParamsResponseSDKType {
}
export declare const MsgUpdatePerpetualFeeParams: {
    typeUrl: string;
    is(o: any): o is MsgUpdatePerpetualFeeParams;
    isSDK(o: any): o is MsgUpdatePerpetualFeeParamsSDKType;
    isAmino(o: any): o is MsgUpdatePerpetualFeeParamsAmino;
    encode(message: MsgUpdatePerpetualFeeParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdatePerpetualFeeParams;
    fromPartial(object: Partial<MsgUpdatePerpetualFeeParams>): MsgUpdatePerpetualFeeParams;
    fromAmino(object: MsgUpdatePerpetualFeeParamsAmino): MsgUpdatePerpetualFeeParams;
    toAmino(message: MsgUpdatePerpetualFeeParams): MsgUpdatePerpetualFeeParamsAmino;
    fromAminoMsg(object: MsgUpdatePerpetualFeeParamsAminoMsg): MsgUpdatePerpetualFeeParams;
    fromProtoMsg(message: MsgUpdatePerpetualFeeParamsProtoMsg): MsgUpdatePerpetualFeeParams;
    toProto(message: MsgUpdatePerpetualFeeParams): Uint8Array;
    toProtoMsg(message: MsgUpdatePerpetualFeeParams): MsgUpdatePerpetualFeeParamsProtoMsg;
};
export declare const MsgUpdatePerpetualFeeParamsResponse: {
    typeUrl: string;
    is(o: any): o is MsgUpdatePerpetualFeeParamsResponse;
    isSDK(o: any): o is MsgUpdatePerpetualFeeParamsResponseSDKType;
    isAmino(o: any): o is MsgUpdatePerpetualFeeParamsResponseAmino;
    encode(_: MsgUpdatePerpetualFeeParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdatePerpetualFeeParamsResponse;
    fromPartial(_: Partial<MsgUpdatePerpetualFeeParamsResponse>): MsgUpdatePerpetualFeeParamsResponse;
    fromAmino(_: MsgUpdatePerpetualFeeParamsResponseAmino): MsgUpdatePerpetualFeeParamsResponse;
    toAmino(_: MsgUpdatePerpetualFeeParamsResponse): MsgUpdatePerpetualFeeParamsResponseAmino;
    fromAminoMsg(object: MsgUpdatePerpetualFeeParamsResponseAminoMsg): MsgUpdatePerpetualFeeParamsResponse;
    fromProtoMsg(message: MsgUpdatePerpetualFeeParamsResponseProtoMsg): MsgUpdatePerpetualFeeParamsResponse;
    toProto(message: MsgUpdatePerpetualFeeParamsResponse): Uint8Array;
    toProtoMsg(message: MsgUpdatePerpetualFeeParamsResponse): MsgUpdatePerpetualFeeParamsResponseProtoMsg;
};
