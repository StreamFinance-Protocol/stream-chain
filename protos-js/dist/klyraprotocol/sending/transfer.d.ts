import { SubaccountId, SubaccountIdAmino, SubaccountIdSDKType } from "../subaccounts/subaccount";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Transfer represents a single transfer between two subaccounts. */
export interface Transfer {
    /** The sender subaccount ID. */
    sender: SubaccountId;
    /** The recipient subaccount ID. */
    recipient: SubaccountId;
    /** Id of the asset to transfer. */
    assetId: number;
    /** The amount of asset to transfer */
    amount: bigint;
}
export interface TransferProtoMsg {
    typeUrl: "/klyraprotocol.sending.Transfer";
    value: Uint8Array;
}
/** Transfer represents a single transfer between two subaccounts. */
export interface TransferAmino {
    /** The sender subaccount ID. */
    sender?: SubaccountIdAmino;
    /** The recipient subaccount ID. */
    recipient?: SubaccountIdAmino;
    /** Id of the asset to transfer. */
    asset_id?: number;
    /** The amount of asset to transfer */
    amount?: string;
}
export interface TransferAminoMsg {
    type: "/klyraprotocol.sending.Transfer";
    value: TransferAmino;
}
/** Transfer represents a single transfer between two subaccounts. */
export interface TransferSDKType {
    sender: SubaccountIdSDKType;
    recipient: SubaccountIdSDKType;
    asset_id: number;
    amount: bigint;
}
/**
 * MsgDepositToSubaccount represents a single transfer from an `x/bank`
 * account to an `x/subaccounts` subaccount.
 */
export interface MsgDepositToSubaccount {
    /** The sender wallet address. */
    sender: string;
    /** The recipient subaccount ID. */
    recipient: SubaccountId;
    /** Id of the asset to transfer. */
    assetId: number;
    /** The number of quantums of asset to transfer. */
    quantums: bigint;
}
export interface MsgDepositToSubaccountProtoMsg {
    typeUrl: "/klyraprotocol.sending.MsgDepositToSubaccount";
    value: Uint8Array;
}
/**
 * MsgDepositToSubaccount represents a single transfer from an `x/bank`
 * account to an `x/subaccounts` subaccount.
 */
export interface MsgDepositToSubaccountAmino {
    /** The sender wallet address. */
    sender?: string;
    /** The recipient subaccount ID. */
    recipient?: SubaccountIdAmino;
    /** Id of the asset to transfer. */
    asset_id?: number;
    /** The number of quantums of asset to transfer. */
    quantums?: string;
}
export interface MsgDepositToSubaccountAminoMsg {
    type: "/klyraprotocol.sending.MsgDepositToSubaccount";
    value: MsgDepositToSubaccountAmino;
}
/**
 * MsgDepositToSubaccount represents a single transfer from an `x/bank`
 * account to an `x/subaccounts` subaccount.
 */
export interface MsgDepositToSubaccountSDKType {
    sender: string;
    recipient: SubaccountIdSDKType;
    asset_id: number;
    quantums: bigint;
}
/**
 * MsgWithdrawFromSubaccount represents a single transfer from an
 * `x/subaccounts` subaccount to an `x/bank` account.
 */
export interface MsgWithdrawFromSubaccount {
    /** The sender subaccount ID. */
    sender: SubaccountId;
    /** The recipient wallet address. */
    recipient: string;
    /** Id of the asset to transfer. */
    assetId: number;
    /** The number of quantums of asset to transfer. */
    quantums: bigint;
}
export interface MsgWithdrawFromSubaccountProtoMsg {
    typeUrl: "/klyraprotocol.sending.MsgWithdrawFromSubaccount";
    value: Uint8Array;
}
/**
 * MsgWithdrawFromSubaccount represents a single transfer from an
 * `x/subaccounts` subaccount to an `x/bank` account.
 */
export interface MsgWithdrawFromSubaccountAmino {
    /** The sender subaccount ID. */
    sender?: SubaccountIdAmino;
    /** The recipient wallet address. */
    recipient?: string;
    /** Id of the asset to transfer. */
    asset_id?: number;
    /** The number of quantums of asset to transfer. */
    quantums?: string;
}
export interface MsgWithdrawFromSubaccountAminoMsg {
    type: "/klyraprotocol.sending.MsgWithdrawFromSubaccount";
    value: MsgWithdrawFromSubaccountAmino;
}
/**
 * MsgWithdrawFromSubaccount represents a single transfer from an
 * `x/subaccounts` subaccount to an `x/bank` account.
 */
export interface MsgWithdrawFromSubaccountSDKType {
    sender: SubaccountIdSDKType;
    recipient: string;
    asset_id: number;
    quantums: bigint;
}
/**
 * MsgSendFromModuleToAccount represents a single transfer from a module
 * to an `x/bank` account (can be either a module account address or a user
 * account address).
 * Should only be executed by governance.
 */
export interface MsgSendFromModuleToAccount {
    authority: string;
    /** The sender module name. */
    senderModuleName: string;
    /**
     * The recipient account address (can be either a module account address
     * or a user account address).
     */
    recipient: string;
    /** The coin to transfer, which specifies both denom and amount. */
    coin: Coin;
}
export interface MsgSendFromModuleToAccountProtoMsg {
    typeUrl: "/klyraprotocol.sending.MsgSendFromModuleToAccount";
    value: Uint8Array;
}
/**
 * MsgSendFromModuleToAccount represents a single transfer from a module
 * to an `x/bank` account (can be either a module account address or a user
 * account address).
 * Should only be executed by governance.
 */
export interface MsgSendFromModuleToAccountAmino {
    authority?: string;
    /** The sender module name. */
    sender_module_name?: string;
    /**
     * The recipient account address (can be either a module account address
     * or a user account address).
     */
    recipient?: string;
    /** The coin to transfer, which specifies both denom and amount. */
    coin?: CoinAmino;
}
export interface MsgSendFromModuleToAccountAminoMsg {
    type: "/klyraprotocol.sending.MsgSendFromModuleToAccount";
    value: MsgSendFromModuleToAccountAmino;
}
/**
 * MsgSendFromModuleToAccount represents a single transfer from a module
 * to an `x/bank` account (can be either a module account address or a user
 * account address).
 * Should only be executed by governance.
 */
export interface MsgSendFromModuleToAccountSDKType {
    authority: string;
    sender_module_name: string;
    recipient: string;
    coin: CoinSDKType;
}
export declare const Transfer: {
    typeUrl: string;
    is(o: any): o is Transfer;
    isSDK(o: any): o is TransferSDKType;
    isAmino(o: any): o is TransferAmino;
    encode(message: Transfer, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Transfer;
    fromPartial(object: Partial<Transfer>): Transfer;
    fromAmino(object: TransferAmino): Transfer;
    toAmino(message: Transfer): TransferAmino;
    fromAminoMsg(object: TransferAminoMsg): Transfer;
    fromProtoMsg(message: TransferProtoMsg): Transfer;
    toProto(message: Transfer): Uint8Array;
    toProtoMsg(message: Transfer): TransferProtoMsg;
};
export declare const MsgDepositToSubaccount: {
    typeUrl: string;
    is(o: any): o is MsgDepositToSubaccount;
    isSDK(o: any): o is MsgDepositToSubaccountSDKType;
    isAmino(o: any): o is MsgDepositToSubaccountAmino;
    encode(message: MsgDepositToSubaccount, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgDepositToSubaccount;
    fromPartial(object: Partial<MsgDepositToSubaccount>): MsgDepositToSubaccount;
    fromAmino(object: MsgDepositToSubaccountAmino): MsgDepositToSubaccount;
    toAmino(message: MsgDepositToSubaccount): MsgDepositToSubaccountAmino;
    fromAminoMsg(object: MsgDepositToSubaccountAminoMsg): MsgDepositToSubaccount;
    fromProtoMsg(message: MsgDepositToSubaccountProtoMsg): MsgDepositToSubaccount;
    toProto(message: MsgDepositToSubaccount): Uint8Array;
    toProtoMsg(message: MsgDepositToSubaccount): MsgDepositToSubaccountProtoMsg;
};
export declare const MsgWithdrawFromSubaccount: {
    typeUrl: string;
    is(o: any): o is MsgWithdrawFromSubaccount;
    isSDK(o: any): o is MsgWithdrawFromSubaccountSDKType;
    isAmino(o: any): o is MsgWithdrawFromSubaccountAmino;
    encode(message: MsgWithdrawFromSubaccount, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgWithdrawFromSubaccount;
    fromPartial(object: Partial<MsgWithdrawFromSubaccount>): MsgWithdrawFromSubaccount;
    fromAmino(object: MsgWithdrawFromSubaccountAmino): MsgWithdrawFromSubaccount;
    toAmino(message: MsgWithdrawFromSubaccount): MsgWithdrawFromSubaccountAmino;
    fromAminoMsg(object: MsgWithdrawFromSubaccountAminoMsg): MsgWithdrawFromSubaccount;
    fromProtoMsg(message: MsgWithdrawFromSubaccountProtoMsg): MsgWithdrawFromSubaccount;
    toProto(message: MsgWithdrawFromSubaccount): Uint8Array;
    toProtoMsg(message: MsgWithdrawFromSubaccount): MsgWithdrawFromSubaccountProtoMsg;
};
export declare const MsgSendFromModuleToAccount: {
    typeUrl: string;
    is(o: any): o is MsgSendFromModuleToAccount;
    isSDK(o: any): o is MsgSendFromModuleToAccountSDKType;
    isAmino(o: any): o is MsgSendFromModuleToAccountAmino;
    encode(message: MsgSendFromModuleToAccount, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MsgSendFromModuleToAccount;
    fromPartial(object: Partial<MsgSendFromModuleToAccount>): MsgSendFromModuleToAccount;
    fromAmino(object: MsgSendFromModuleToAccountAmino): MsgSendFromModuleToAccount;
    toAmino(message: MsgSendFromModuleToAccount): MsgSendFromModuleToAccountAmino;
    fromAminoMsg(object: MsgSendFromModuleToAccountAminoMsg): MsgSendFromModuleToAccount;
    fromProtoMsg(message: MsgSendFromModuleToAccountProtoMsg): MsgSendFromModuleToAccount;
    toProto(message: MsgSendFromModuleToAccount): Uint8Array;
    toProtoMsg(message: MsgSendFromModuleToAccount): MsgSendFromModuleToAccountProtoMsg;
};
