import { SubaccountId, SubaccountIdAmino, SubaccountIdSDKType } from "./subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgClaimYieldForSubaccount is the Msg/ClaimYieldForSubaccount request type. */
export interface MsgClaimYieldForSubaccount {
    id?: SubaccountId;
}
export interface MsgClaimYieldForSubaccountProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount";
    value: Uint8Array;
}
/** MsgClaimYieldForSubaccount is the Msg/ClaimYieldForSubaccount request type. */
export interface MsgClaimYieldForSubaccountAmino {
    id?: SubaccountIdAmino;
}
export interface MsgClaimYieldForSubaccountAminoMsg {
    type: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount";
    value: MsgClaimYieldForSubaccountAmino;
}
/** MsgClaimYieldForSubaccount is the Msg/ClaimYieldForSubaccount request type. */
export interface MsgClaimYieldForSubaccountSDKType {
    id?: SubaccountIdSDKType;
}
/**
 * MsgClaimYieldForSubaccountResponse is the Msg/ClaimYieldForSubaccount
 * response type.
 */
export interface MsgClaimYieldForSubaccountResponse {
}
export interface MsgClaimYieldForSubaccountResponseProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse";
    value: Uint8Array;
}
/**
 * MsgClaimYieldForSubaccountResponse is the Msg/ClaimYieldForSubaccount
 * response type.
 */
export interface MsgClaimYieldForSubaccountResponseAmino {
}
export interface MsgClaimYieldForSubaccountResponseAminoMsg {
    type: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccountResponse";
    value: MsgClaimYieldForSubaccountResponseAmino;
}
/**
 * MsgClaimYieldForSubaccountResponse is the Msg/ClaimYieldForSubaccount
 * response type.
 */
export interface MsgClaimYieldForSubaccountResponseSDKType {
}
export declare const MsgClaimYieldForSubaccount: {
    typeUrl: string;
    is(o: any): o is MsgClaimYieldForSubaccount;
    isSDK(o: any): o is MsgClaimYieldForSubaccountSDKType;
    isAmino(o: any): o is MsgClaimYieldForSubaccountAmino;
    encode(message: MsgClaimYieldForSubaccount, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgClaimYieldForSubaccount;
    fromPartial(object: Partial<MsgClaimYieldForSubaccount>): MsgClaimYieldForSubaccount;
    fromAmino(object: MsgClaimYieldForSubaccountAmino): MsgClaimYieldForSubaccount;
    toAmino(message: MsgClaimYieldForSubaccount): MsgClaimYieldForSubaccountAmino;
    fromAminoMsg(object: MsgClaimYieldForSubaccountAminoMsg): MsgClaimYieldForSubaccount;
    fromProtoMsg(message: MsgClaimYieldForSubaccountProtoMsg): MsgClaimYieldForSubaccount;
    toProto(message: MsgClaimYieldForSubaccount): Uint8Array;
    toProtoMsg(message: MsgClaimYieldForSubaccount): MsgClaimYieldForSubaccountProtoMsg;
};
export declare const MsgClaimYieldForSubaccountResponse: {
    typeUrl: string;
    is(o: any): o is MsgClaimYieldForSubaccountResponse;
    isSDK(o: any): o is MsgClaimYieldForSubaccountResponseSDKType;
    isAmino(o: any): o is MsgClaimYieldForSubaccountResponseAmino;
    encode(_: MsgClaimYieldForSubaccountResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgClaimYieldForSubaccountResponse;
    fromPartial(_: Partial<MsgClaimYieldForSubaccountResponse>): MsgClaimYieldForSubaccountResponse;
    fromAmino(_: MsgClaimYieldForSubaccountResponseAmino): MsgClaimYieldForSubaccountResponse;
    toAmino(_: MsgClaimYieldForSubaccountResponse): MsgClaimYieldForSubaccountResponseAmino;
    fromAminoMsg(object: MsgClaimYieldForSubaccountResponseAminoMsg): MsgClaimYieldForSubaccountResponse;
    fromProtoMsg(message: MsgClaimYieldForSubaccountResponseProtoMsg): MsgClaimYieldForSubaccountResponse;
    toProto(message: MsgClaimYieldForSubaccountResponse): Uint8Array;
    toProtoMsg(message: MsgClaimYieldForSubaccountResponse): MsgClaimYieldForSubaccountResponseProtoMsg;
};
