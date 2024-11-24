import { Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin";
import { Input, InputAmino, InputSDKType, Output, OutputAmino, OutputSDKType, Params, ParamsAmino, ParamsSDKType, SendEnabled, SendEnabledAmino, SendEnabledSDKType } from "./bank";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** MsgSend represents a message to send coins from one account to another. */
export interface MsgSend {
    fromAddress: string;
    toAddress: string;
    amount: Coin[];
}
export interface MsgSendProtoMsg {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend";
    value: Uint8Array;
}
/** MsgSend represents a message to send coins from one account to another. */
export interface MsgSendAmino {
    from_address?: string;
    to_address?: string;
    amount: CoinAmino[];
}
export interface MsgSendAminoMsg {
    type: "cosmos-sdk/MsgSend";
    value: MsgSendAmino;
}
/** MsgSend represents a message to send coins from one account to another. */
export interface MsgSendSDKType {
    from_address: string;
    to_address: string;
    amount: CoinSDKType[];
}
/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgSendResponse {
}
export interface MsgSendResponseProtoMsg {
    typeUrl: "/cosmos.bank.v1beta1.MsgSendResponse";
    value: Uint8Array;
}
/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgSendResponseAmino {
}
export interface MsgSendResponseAminoMsg {
    type: "cosmos-sdk/MsgSendResponse";
    value: MsgSendResponseAmino;
}
/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgSendResponseSDKType {
}
/** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
export interface MsgMultiSend {
    /**
     * Inputs, despite being `repeated`, only allows one sender input. This is
     * checked in MsgMultiSend's ValidateBasic.
     */
    inputs: Input[];
    outputs: Output[];
}
export interface MsgMultiSendProtoMsg {
    typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend";
    value: Uint8Array;
}
/** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
export interface MsgMultiSendAmino {
    /**
     * Inputs, despite being `repeated`, only allows one sender input. This is
     * checked in MsgMultiSend's ValidateBasic.
     */
    inputs: InputAmino[];
    outputs: OutputAmino[];
}
export interface MsgMultiSendAminoMsg {
    type: "cosmos-sdk/MsgMultiSend";
    value: MsgMultiSendAmino;
}
/** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
export interface MsgMultiSendSDKType {
    inputs: InputSDKType[];
    outputs: OutputSDKType[];
}
/** MsgMultiSendResponse defines the Msg/MultiSend response type. */
export interface MsgMultiSendResponse {
}
export interface MsgMultiSendResponseProtoMsg {
    typeUrl: "/cosmos.bank.v1beta1.MsgMultiSendResponse";
    value: Uint8Array;
}
/** MsgMultiSendResponse defines the Msg/MultiSend response type. */
export interface MsgMultiSendResponseAmino {
}
export interface MsgMultiSendResponseAminoMsg {
    type: "cosmos-sdk/MsgMultiSendResponse";
    value: MsgMultiSendResponseAmino;
}
/** MsgMultiSendResponse defines the Msg/MultiSend response type. */
export interface MsgMultiSendResponseSDKType {
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /**
     * params defines the x/bank parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params;
}
export interface MsgUpdateParamsProtoMsg {
    typeUrl: "/cosmos.bank.v1beta1.MsgUpdateParams";
    value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsAmino {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority?: string;
    /**
     * params defines the x/bank parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
    type: "cosmos-sdk/x/bank/MsgUpdateParams";
    value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsSDKType {
    authority: string;
    params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {
}
export interface MsgUpdateParamsResponseProtoMsg {
    typeUrl: "/cosmos.bank.v1beta1.MsgUpdateParamsResponse";
    value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseAmino {
}
export interface MsgUpdateParamsResponseAminoMsg {
    type: "cosmos-sdk/MsgUpdateParamsResponse";
    value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseSDKType {
}
/**
 * MsgSetSendEnabled is the Msg/SetSendEnabled request type.
 *
 * Only entries to add/update/delete need to be included.
 * Existing SendEnabled entries that are not included in this
 * message are left unchanged.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabled {
    /** authority is the address that controls the module. */
    authority: string;
    /** send_enabled is the list of entries to add or update. */
    sendEnabled: SendEnabled[];
    /**
     * use_default_for is a list of denoms that should use the params.default_send_enabled value.
     * Denoms listed here will have their SendEnabled entries deleted.
     * If a denom is included that doesn't have a SendEnabled entry,
     * it will be ignored.
     */
    useDefaultFor: string[];
}
export interface MsgSetSendEnabledProtoMsg {
    typeUrl: "/cosmos.bank.v1beta1.MsgSetSendEnabled";
    value: Uint8Array;
}
/**
 * MsgSetSendEnabled is the Msg/SetSendEnabled request type.
 *
 * Only entries to add/update/delete need to be included.
 * Existing SendEnabled entries that are not included in this
 * message are left unchanged.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabledAmino {
    /** authority is the address that controls the module. */
    authority?: string;
    /** send_enabled is the list of entries to add or update. */
    send_enabled?: SendEnabledAmino[];
    /**
     * use_default_for is a list of denoms that should use the params.default_send_enabled value.
     * Denoms listed here will have their SendEnabled entries deleted.
     * If a denom is included that doesn't have a SendEnabled entry,
     * it will be ignored.
     */
    use_default_for?: string[];
}
export interface MsgSetSendEnabledAminoMsg {
    type: "cosmos-sdk/MsgSetSendEnabled";
    value: MsgSetSendEnabledAmino;
}
/**
 * MsgSetSendEnabled is the Msg/SetSendEnabled request type.
 *
 * Only entries to add/update/delete need to be included.
 * Existing SendEnabled entries that are not included in this
 * message are left unchanged.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabledSDKType {
    authority: string;
    send_enabled: SendEnabledSDKType[];
    use_default_for: string[];
}
/**
 * MsgSetSendEnabledResponse defines the Msg/SetSendEnabled response type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabledResponse {
}
export interface MsgSetSendEnabledResponseProtoMsg {
    typeUrl: "/cosmos.bank.v1beta1.MsgSetSendEnabledResponse";
    value: Uint8Array;
}
/**
 * MsgSetSendEnabledResponse defines the Msg/SetSendEnabled response type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabledResponseAmino {
}
export interface MsgSetSendEnabledResponseAminoMsg {
    type: "cosmos-sdk/MsgSetSendEnabledResponse";
    value: MsgSetSendEnabledResponseAmino;
}
/**
 * MsgSetSendEnabledResponse defines the Msg/SetSendEnabled response type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabledResponseSDKType {
}
export declare const MsgSend: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgSend;
    isSDK(o: any): o is MsgSendSDKType;
    isAmino(o: any): o is MsgSendAmino;
    encode(message: MsgSend, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSend;
    fromPartial(object: Partial<MsgSend>): MsgSend;
    fromAmino(object: MsgSendAmino): MsgSend;
    toAmino(message: MsgSend): MsgSendAmino;
    fromAminoMsg(object: MsgSendAminoMsg): MsgSend;
    toAminoMsg(message: MsgSend): MsgSendAminoMsg;
    fromProtoMsg(message: MsgSendProtoMsg): MsgSend;
    toProto(message: MsgSend): Uint8Array;
    toProtoMsg(message: MsgSend): MsgSendProtoMsg;
};
export declare const MsgSendResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgSendResponse;
    isSDK(o: any): o is MsgSendResponseSDKType;
    isAmino(o: any): o is MsgSendResponseAmino;
    encode(_: MsgSendResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSendResponse;
    fromPartial(_: Partial<MsgSendResponse>): MsgSendResponse;
    fromAmino(_: MsgSendResponseAmino): MsgSendResponse;
    toAmino(_: MsgSendResponse): MsgSendResponseAmino;
    fromAminoMsg(object: MsgSendResponseAminoMsg): MsgSendResponse;
    toAminoMsg(message: MsgSendResponse): MsgSendResponseAminoMsg;
    fromProtoMsg(message: MsgSendResponseProtoMsg): MsgSendResponse;
    toProto(message: MsgSendResponse): Uint8Array;
    toProtoMsg(message: MsgSendResponse): MsgSendResponseProtoMsg;
};
export declare const MsgMultiSend: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgMultiSend;
    isSDK(o: any): o is MsgMultiSendSDKType;
    isAmino(o: any): o is MsgMultiSendAmino;
    encode(message: MsgMultiSend, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgMultiSend;
    fromPartial(object: Partial<MsgMultiSend>): MsgMultiSend;
    fromAmino(object: MsgMultiSendAmino): MsgMultiSend;
    toAmino(message: MsgMultiSend): MsgMultiSendAmino;
    fromAminoMsg(object: MsgMultiSendAminoMsg): MsgMultiSend;
    toAminoMsg(message: MsgMultiSend): MsgMultiSendAminoMsg;
    fromProtoMsg(message: MsgMultiSendProtoMsg): MsgMultiSend;
    toProto(message: MsgMultiSend): Uint8Array;
    toProtoMsg(message: MsgMultiSend): MsgMultiSendProtoMsg;
};
export declare const MsgMultiSendResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgMultiSendResponse;
    isSDK(o: any): o is MsgMultiSendResponseSDKType;
    isAmino(o: any): o is MsgMultiSendResponseAmino;
    encode(_: MsgMultiSendResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgMultiSendResponse;
    fromPartial(_: Partial<MsgMultiSendResponse>): MsgMultiSendResponse;
    fromAmino(_: MsgMultiSendResponseAmino): MsgMultiSendResponse;
    toAmino(_: MsgMultiSendResponse): MsgMultiSendResponseAmino;
    fromAminoMsg(object: MsgMultiSendResponseAminoMsg): MsgMultiSendResponse;
    toAminoMsg(message: MsgMultiSendResponse): MsgMultiSendResponseAminoMsg;
    fromProtoMsg(message: MsgMultiSendResponseProtoMsg): MsgMultiSendResponse;
    toProto(message: MsgMultiSendResponse): Uint8Array;
    toProtoMsg(message: MsgMultiSendResponse): MsgMultiSendResponseProtoMsg;
};
export declare const MsgUpdateParams: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgUpdateParams;
    isSDK(o: any): o is MsgUpdateParamsSDKType;
    isAmino(o: any): o is MsgUpdateParamsAmino;
    encode(message: MsgUpdateParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams;
    fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams;
    fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams;
    toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino;
    fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams;
    toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg;
    fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams;
    toProto(message: MsgUpdateParams): Uint8Array;
    toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg;
};
export declare const MsgUpdateParamsResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgUpdateParamsResponse;
    isSDK(o: any): o is MsgUpdateParamsResponseSDKType;
    isAmino(o: any): o is MsgUpdateParamsResponseAmino;
    encode(_: MsgUpdateParamsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse;
    fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse;
    toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino;
    fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse;
    toAminoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseAminoMsg;
    fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse;
    toProto(message: MsgUpdateParamsResponse): Uint8Array;
    toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg;
};
export declare const MsgSetSendEnabled: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgSetSendEnabled;
    isSDK(o: any): o is MsgSetSendEnabledSDKType;
    isAmino(o: any): o is MsgSetSendEnabledAmino;
    encode(message: MsgSetSendEnabled, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSetSendEnabled;
    fromPartial(object: Partial<MsgSetSendEnabled>): MsgSetSendEnabled;
    fromAmino(object: MsgSetSendEnabledAmino): MsgSetSendEnabled;
    toAmino(message: MsgSetSendEnabled): MsgSetSendEnabledAmino;
    fromAminoMsg(object: MsgSetSendEnabledAminoMsg): MsgSetSendEnabled;
    toAminoMsg(message: MsgSetSendEnabled): MsgSetSendEnabledAminoMsg;
    fromProtoMsg(message: MsgSetSendEnabledProtoMsg): MsgSetSendEnabled;
    toProto(message: MsgSetSendEnabled): Uint8Array;
    toProtoMsg(message: MsgSetSendEnabled): MsgSetSendEnabledProtoMsg;
};
export declare const MsgSetSendEnabledResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is MsgSetSendEnabledResponse;
    isSDK(o: any): o is MsgSetSendEnabledResponseSDKType;
    isAmino(o: any): o is MsgSetSendEnabledResponseAmino;
    encode(_: MsgSetSendEnabledResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSetSendEnabledResponse;
    fromPartial(_: Partial<MsgSetSendEnabledResponse>): MsgSetSendEnabledResponse;
    fromAmino(_: MsgSetSendEnabledResponseAmino): MsgSetSendEnabledResponse;
    toAmino(_: MsgSetSendEnabledResponse): MsgSetSendEnabledResponseAmino;
    fromAminoMsg(object: MsgSetSendEnabledResponseAminoMsg): MsgSetSendEnabledResponse;
    toAminoMsg(message: MsgSetSendEnabledResponse): MsgSetSendEnabledResponseAminoMsg;
    fromProtoMsg(message: MsgSetSendEnabledResponseProtoMsg): MsgSetSendEnabledResponse;
    toProto(message: MsgSetSendEnabledResponse): Uint8Array;
    toProtoMsg(message: MsgSetSendEnabledResponse): MsgSetSendEnabledResponseProtoMsg;
};
