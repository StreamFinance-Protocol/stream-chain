import { Transfer, TransferAmino, TransferSDKType } from "./transfer";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgCreateTransfer is a request type used for initiating new transfers. */
export interface MsgCreateTransfer {
    transfer?: Transfer;
}
export interface MsgCreateTransferProtoMsg {
    typeUrl: "/klyraprotocol.sending.MsgCreateTransfer";
    value: Uint8Array;
}
/** MsgCreateTransfer is a request type used for initiating new transfers. */
export interface MsgCreateTransferAmino {
    transfer?: TransferAmino;
}
export interface MsgCreateTransferAminoMsg {
    type: "/klyraprotocol.sending.MsgCreateTransfer";
    value: MsgCreateTransferAmino;
}
/** MsgCreateTransfer is a request type used for initiating new transfers. */
export interface MsgCreateTransferSDKType {
    transfer?: TransferSDKType;
}
/** MsgCreateTransferResponse is a response type used for new transfers. */
export interface MsgCreateTransferResponse {
}
export interface MsgCreateTransferResponseProtoMsg {
    typeUrl: "/klyraprotocol.sending.MsgCreateTransferResponse";
    value: Uint8Array;
}
/** MsgCreateTransferResponse is a response type used for new transfers. */
export interface MsgCreateTransferResponseAmino {
}
export interface MsgCreateTransferResponseAminoMsg {
    type: "/klyraprotocol.sending.MsgCreateTransferResponse";
    value: MsgCreateTransferResponseAmino;
}
/** MsgCreateTransferResponse is a response type used for new transfers. */
export interface MsgCreateTransferResponseSDKType {
}
/**
 * MsgDepositToSubaccountResponse is a response type used for new
 * account-to-subaccount transfers.
 */
export interface MsgDepositToSubaccountResponse {
}
export interface MsgDepositToSubaccountResponseProtoMsg {
    typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccountResponse";
    value: Uint8Array;
}
/**
 * MsgDepositToSubaccountResponse is a response type used for new
 * account-to-subaccount transfers.
 */
export interface MsgDepositToSubaccountResponseAmino {
}
export interface MsgDepositToSubaccountResponseAminoMsg {
    type: "/klyraprotocol.sending.MsgDepositToSubaccountResponse";
    value: MsgDepositToSubaccountResponseAmino;
}
/**
 * MsgDepositToSubaccountResponse is a response type used for new
 * account-to-subaccount transfers.
 */
export interface MsgDepositToSubaccountResponseSDKType {
}
/**
 * MsgWithdrawFromSubaccountResponse is a response type used for new
 * subaccount-to-account transfers.
 */
export interface MsgWithdrawFromSubaccountResponse {
}
export interface MsgWithdrawFromSubaccountResponseProtoMsg {
    typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccountResponse";
    value: Uint8Array;
}
/**
 * MsgWithdrawFromSubaccountResponse is a response type used for new
 * subaccount-to-account transfers.
 */
export interface MsgWithdrawFromSubaccountResponseAmino {
}
export interface MsgWithdrawFromSubaccountResponseAminoMsg {
    type: "/klyraprotocol.sending.MsgWithdrawFromSubaccountResponse";
    value: MsgWithdrawFromSubaccountResponseAmino;
}
/**
 * MsgWithdrawFromSubaccountResponse is a response type used for new
 * subaccount-to-account transfers.
 */
export interface MsgWithdrawFromSubaccountResponseSDKType {
}
/**
 * MsgSendFromModuleToAccountResponse is a response type used for new
 * module-to-account transfers.
 */
export interface MsgSendFromModuleToAccountResponse {
}
export interface MsgSendFromModuleToAccountResponseProtoMsg {
    typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccountResponse";
    value: Uint8Array;
}
/**
 * MsgSendFromModuleToAccountResponse is a response type used for new
 * module-to-account transfers.
 */
export interface MsgSendFromModuleToAccountResponseAmino {
}
export interface MsgSendFromModuleToAccountResponseAminoMsg {
    type: "/klyraprotocol.sending.MsgSendFromModuleToAccountResponse";
    value: MsgSendFromModuleToAccountResponseAmino;
}
/**
 * MsgSendFromModuleToAccountResponse is a response type used for new
 * module-to-account transfers.
 */
export interface MsgSendFromModuleToAccountResponseSDKType {
}
export declare const MsgCreateTransfer: {
    typeUrl: string;
    is(o: any): o is MsgCreateTransfer;
    isSDK(o: any): o is MsgCreateTransferSDKType;
    isAmino(o: any): o is MsgCreateTransferAmino;
    encode(message: MsgCreateTransfer, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateTransfer;
    fromPartial(object: Partial<MsgCreateTransfer>): MsgCreateTransfer;
    fromAmino(object: MsgCreateTransferAmino): MsgCreateTransfer;
    toAmino(message: MsgCreateTransfer): MsgCreateTransferAmino;
    fromAminoMsg(object: MsgCreateTransferAminoMsg): MsgCreateTransfer;
    fromProtoMsg(message: MsgCreateTransferProtoMsg): MsgCreateTransfer;
    toProto(message: MsgCreateTransfer): Uint8Array;
    toProtoMsg(message: MsgCreateTransfer): MsgCreateTransferProtoMsg;
};
export declare const MsgCreateTransferResponse: {
    typeUrl: string;
    is(o: any): o is MsgCreateTransferResponse;
    isSDK(o: any): o is MsgCreateTransferResponseSDKType;
    isAmino(o: any): o is MsgCreateTransferResponseAmino;
    encode(_: MsgCreateTransferResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateTransferResponse;
    fromPartial(_: Partial<MsgCreateTransferResponse>): MsgCreateTransferResponse;
    fromAmino(_: MsgCreateTransferResponseAmino): MsgCreateTransferResponse;
    toAmino(_: MsgCreateTransferResponse): MsgCreateTransferResponseAmino;
    fromAminoMsg(object: MsgCreateTransferResponseAminoMsg): MsgCreateTransferResponse;
    fromProtoMsg(message: MsgCreateTransferResponseProtoMsg): MsgCreateTransferResponse;
    toProto(message: MsgCreateTransferResponse): Uint8Array;
    toProtoMsg(message: MsgCreateTransferResponse): MsgCreateTransferResponseProtoMsg;
};
export declare const MsgDepositToSubaccountResponse: {
    typeUrl: string;
    is(o: any): o is MsgDepositToSubaccountResponse;
    isSDK(o: any): o is MsgDepositToSubaccountResponseSDKType;
    isAmino(o: any): o is MsgDepositToSubaccountResponseAmino;
    encode(_: MsgDepositToSubaccountResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgDepositToSubaccountResponse;
    fromPartial(_: Partial<MsgDepositToSubaccountResponse>): MsgDepositToSubaccountResponse;
    fromAmino(_: MsgDepositToSubaccountResponseAmino): MsgDepositToSubaccountResponse;
    toAmino(_: MsgDepositToSubaccountResponse): MsgDepositToSubaccountResponseAmino;
    fromAminoMsg(object: MsgDepositToSubaccountResponseAminoMsg): MsgDepositToSubaccountResponse;
    fromProtoMsg(message: MsgDepositToSubaccountResponseProtoMsg): MsgDepositToSubaccountResponse;
    toProto(message: MsgDepositToSubaccountResponse): Uint8Array;
    toProtoMsg(message: MsgDepositToSubaccountResponse): MsgDepositToSubaccountResponseProtoMsg;
};
export declare const MsgWithdrawFromSubaccountResponse: {
    typeUrl: string;
    is(o: any): o is MsgWithdrawFromSubaccountResponse;
    isSDK(o: any): o is MsgWithdrawFromSubaccountResponseSDKType;
    isAmino(o: any): o is MsgWithdrawFromSubaccountResponseAmino;
    encode(_: MsgWithdrawFromSubaccountResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgWithdrawFromSubaccountResponse;
    fromPartial(_: Partial<MsgWithdrawFromSubaccountResponse>): MsgWithdrawFromSubaccountResponse;
    fromAmino(_: MsgWithdrawFromSubaccountResponseAmino): MsgWithdrawFromSubaccountResponse;
    toAmino(_: MsgWithdrawFromSubaccountResponse): MsgWithdrawFromSubaccountResponseAmino;
    fromAminoMsg(object: MsgWithdrawFromSubaccountResponseAminoMsg): MsgWithdrawFromSubaccountResponse;
    fromProtoMsg(message: MsgWithdrawFromSubaccountResponseProtoMsg): MsgWithdrawFromSubaccountResponse;
    toProto(message: MsgWithdrawFromSubaccountResponse): Uint8Array;
    toProtoMsg(message: MsgWithdrawFromSubaccountResponse): MsgWithdrawFromSubaccountResponseProtoMsg;
};
export declare const MsgSendFromModuleToAccountResponse: {
    typeUrl: string;
    is(o: any): o is MsgSendFromModuleToAccountResponse;
    isSDK(o: any): o is MsgSendFromModuleToAccountResponseSDKType;
    isAmino(o: any): o is MsgSendFromModuleToAccountResponseAmino;
    encode(_: MsgSendFromModuleToAccountResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSendFromModuleToAccountResponse;
    fromPartial(_: Partial<MsgSendFromModuleToAccountResponse>): MsgSendFromModuleToAccountResponse;
    fromAmino(_: MsgSendFromModuleToAccountResponseAmino): MsgSendFromModuleToAccountResponse;
    toAmino(_: MsgSendFromModuleToAccountResponse): MsgSendFromModuleToAccountResponseAmino;
    fromAminoMsg(object: MsgSendFromModuleToAccountResponseAminoMsg): MsgSendFromModuleToAccountResponse;
    fromProtoMsg(message: MsgSendFromModuleToAccountResponseProtoMsg): MsgSendFromModuleToAccountResponse;
    toProto(message: MsgSendFromModuleToAccountResponse): Uint8Array;
    toProtoMsg(message: MsgSendFromModuleToAccountResponse): MsgSendFromModuleToAccountResponseProtoMsg;
};
