import { Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * SendAuthorization allows the grantee to spend up to spend_limit coins from
 * the granter's account.
 *
 * Since: cosmos-sdk 0.43
 */
export interface SendAuthorization {
    $typeUrl?: "/cosmos.bank.v1beta1.SendAuthorization";
    spendLimit: Coin[];
    /**
     * allow_list specifies an optional list of addresses to whom the grantee can send tokens on behalf of the
     * granter. If omitted, any recipient is allowed.
     *
     * Since: cosmos-sdk 0.47
     */
    allowList: string[];
}
export interface SendAuthorizationProtoMsg {
    typeUrl: "/cosmos.bank.v1beta1.SendAuthorization";
    value: Uint8Array;
}
/**
 * SendAuthorization allows the grantee to spend up to spend_limit coins from
 * the granter's account.
 *
 * Since: cosmos-sdk 0.43
 */
export interface SendAuthorizationAmino {
    spend_limit: CoinAmino[];
    /**
     * allow_list specifies an optional list of addresses to whom the grantee can send tokens on behalf of the
     * granter. If omitted, any recipient is allowed.
     *
     * Since: cosmos-sdk 0.47
     */
    allow_list?: string[];
}
export interface SendAuthorizationAminoMsg {
    type: "cosmos-sdk/SendAuthorization";
    value: SendAuthorizationAmino;
}
/**
 * SendAuthorization allows the grantee to spend up to spend_limit coins from
 * the granter's account.
 *
 * Since: cosmos-sdk 0.43
 */
export interface SendAuthorizationSDKType {
    $typeUrl?: "/cosmos.bank.v1beta1.SendAuthorization";
    spend_limit: CoinSDKType[];
    allow_list: string[];
}
export declare const SendAuthorization: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is SendAuthorization;
    isSDK(o: any): o is SendAuthorizationSDKType;
    isAmino(o: any): o is SendAuthorizationAmino;
    encode(message: SendAuthorization, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SendAuthorization;
    fromPartial(object: Partial<SendAuthorization>): SendAuthorization;
    fromAmino(object: SendAuthorizationAmino): SendAuthorization;
    toAmino(message: SendAuthorization): SendAuthorizationAmino;
    fromAminoMsg(object: SendAuthorizationAminoMsg): SendAuthorization;
    toAminoMsg(message: SendAuthorization): SendAuthorizationAminoMsg;
    fromProtoMsg(message: SendAuthorizationProtoMsg): SendAuthorization;
    toProto(message: SendAuthorization): Uint8Array;
    toProtoMsg(message: SendAuthorization): SendAuthorizationProtoMsg;
};
