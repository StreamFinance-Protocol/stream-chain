import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Subaccount, SubaccountAmino, SubaccountSDKType } from "./subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryGetSubaccountRequest is request type for the Query RPC method. */
export interface QueryGetSubaccountRequest {
    owner: string;
    number: number;
}
export interface QueryGetSubaccountRequestProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.QueryGetSubaccountRequest";
    value: Uint8Array;
}
/** QueryGetSubaccountRequest is request type for the Query RPC method. */
export interface QueryGetSubaccountRequestAmino {
    owner?: string;
    number?: number;
}
export interface QueryGetSubaccountRequestAminoMsg {
    type: "/klyraprotocol.subaccounts.QueryGetSubaccountRequest";
    value: QueryGetSubaccountRequestAmino;
}
/** QueryGetSubaccountRequest is request type for the Query RPC method. */
export interface QueryGetSubaccountRequestSDKType {
    owner: string;
    number: number;
}
/** QuerySubaccountResponse is response type for the Query RPC method. */
export interface QuerySubaccountResponse {
    subaccount: Subaccount;
}
export interface QuerySubaccountResponseProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.QuerySubaccountResponse";
    value: Uint8Array;
}
/** QuerySubaccountResponse is response type for the Query RPC method. */
export interface QuerySubaccountResponseAmino {
    subaccount?: SubaccountAmino;
}
export interface QuerySubaccountResponseAminoMsg {
    type: "/klyraprotocol.subaccounts.QuerySubaccountResponse";
    value: QuerySubaccountResponseAmino;
}
/** QuerySubaccountResponse is response type for the Query RPC method. */
export interface QuerySubaccountResponseSDKType {
    subaccount: SubaccountSDKType;
}
/** QueryAllSubaccountRequest is request type for the Query RPC method. */
export interface QueryAllSubaccountRequest {
    pagination?: PageRequest;
}
export interface QueryAllSubaccountRequestProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.QueryAllSubaccountRequest";
    value: Uint8Array;
}
/** QueryAllSubaccountRequest is request type for the Query RPC method. */
export interface QueryAllSubaccountRequestAmino {
    pagination?: PageRequestAmino;
}
export interface QueryAllSubaccountRequestAminoMsg {
    type: "/klyraprotocol.subaccounts.QueryAllSubaccountRequest";
    value: QueryAllSubaccountRequestAmino;
}
/** QueryAllSubaccountRequest is request type for the Query RPC method. */
export interface QueryAllSubaccountRequestSDKType {
    pagination?: PageRequestSDKType;
}
/** QuerySubaccountAllResponse is response type for the Query RPC method. */
export interface QuerySubaccountAllResponse {
    subaccount: Subaccount[];
    pagination?: PageResponse;
}
export interface QuerySubaccountAllResponseProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.QuerySubaccountAllResponse";
    value: Uint8Array;
}
/** QuerySubaccountAllResponse is response type for the Query RPC method. */
export interface QuerySubaccountAllResponseAmino {
    subaccount?: SubaccountAmino[];
    pagination?: PageResponseAmino;
}
export interface QuerySubaccountAllResponseAminoMsg {
    type: "/klyraprotocol.subaccounts.QuerySubaccountAllResponse";
    value: QuerySubaccountAllResponseAmino;
}
/** QuerySubaccountAllResponse is response type for the Query RPC method. */
export interface QuerySubaccountAllResponseSDKType {
    subaccount: SubaccountSDKType[];
    pagination?: PageResponseSDKType;
}
/**
 * QueryGetWithdrawalAndTransfersBlockedInfoRequest is a request type for
 * fetching information about whether withdrawals and transfers are blocked for
 * a collateral pool associated with the passed in perpetual id.
 */
export interface QueryGetWithdrawalAndTransfersBlockedInfoRequest {
    perpetualId: number;
}
export interface QueryGetWithdrawalAndTransfersBlockedInfoRequestProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoRequest";
    value: Uint8Array;
}
/**
 * QueryGetWithdrawalAndTransfersBlockedInfoRequest is a request type for
 * fetching information about whether withdrawals and transfers are blocked for
 * a collateral pool associated with the passed in perpetual id.
 */
export interface QueryGetWithdrawalAndTransfersBlockedInfoRequestAmino {
    perpetual_id?: number;
}
export interface QueryGetWithdrawalAndTransfersBlockedInfoRequestAminoMsg {
    type: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoRequest";
    value: QueryGetWithdrawalAndTransfersBlockedInfoRequestAmino;
}
/**
 * QueryGetWithdrawalAndTransfersBlockedInfoRequest is a request type for
 * fetching information about whether withdrawals and transfers are blocked for
 * a collateral pool associated with the passed in perpetual id.
 */
export interface QueryGetWithdrawalAndTransfersBlockedInfoRequestSDKType {
    perpetual_id: number;
}
/**
 * QueryGetWithdrawalAndTransfersBlockedInfoRequest is a response type for
 * fetching information about whether withdrawals and transfers are blocked.
 */
export interface QueryGetWithdrawalAndTransfersBlockedInfoResponse {
    negativeTncSubaccountSeenAtBlock: number;
    chainOutageSeenAtBlock: number;
    withdrawalsAndTransfersUnblockedAtBlock: number;
}
export interface QueryGetWithdrawalAndTransfersBlockedInfoResponseProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoResponse";
    value: Uint8Array;
}
/**
 * QueryGetWithdrawalAndTransfersBlockedInfoRequest is a response type for
 * fetching information about whether withdrawals and transfers are blocked.
 */
export interface QueryGetWithdrawalAndTransfersBlockedInfoResponseAmino {
    negative_tnc_subaccount_seen_at_block?: number;
    chain_outage_seen_at_block?: number;
    withdrawals_and_transfers_unblocked_at_block?: number;
}
export interface QueryGetWithdrawalAndTransfersBlockedInfoResponseAminoMsg {
    type: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoResponse";
    value: QueryGetWithdrawalAndTransfersBlockedInfoResponseAmino;
}
/**
 * QueryGetWithdrawalAndTransfersBlockedInfoRequest is a response type for
 * fetching information about whether withdrawals and transfers are blocked.
 */
export interface QueryGetWithdrawalAndTransfersBlockedInfoResponseSDKType {
    negative_tnc_subaccount_seen_at_block: number;
    chain_outage_seen_at_block: number;
    withdrawals_and_transfers_unblocked_at_block: number;
}
/**
 * QueryCollateralPoolAddressRequest is the request type for fetching the
 * account address of the collateral pool associated with the passed in
 * perpetual id.
 */
export interface QueryCollateralPoolAddressRequest {
    perpetualId: number;
}
export interface QueryCollateralPoolAddressRequestProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressRequest";
    value: Uint8Array;
}
/**
 * QueryCollateralPoolAddressRequest is the request type for fetching the
 * account address of the collateral pool associated with the passed in
 * perpetual id.
 */
export interface QueryCollateralPoolAddressRequestAmino {
    perpetual_id?: number;
}
export interface QueryCollateralPoolAddressRequestAminoMsg {
    type: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressRequest";
    value: QueryCollateralPoolAddressRequestAmino;
}
/**
 * QueryCollateralPoolAddressRequest is the request type for fetching the
 * account address of the collateral pool associated with the passed in
 * perpetual id.
 */
export interface QueryCollateralPoolAddressRequestSDKType {
    perpetual_id: number;
}
/**
 * QueryCollateralPoolAddressResponse is a response type for fetching the
 * account address of the collateral pool associated with the passed in
 * perpetual id.
 */
export interface QueryCollateralPoolAddressResponse {
    collateralPoolAddress: string;
}
export interface QueryCollateralPoolAddressResponseProtoMsg {
    typeUrl: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressResponse";
    value: Uint8Array;
}
/**
 * QueryCollateralPoolAddressResponse is a response type for fetching the
 * account address of the collateral pool associated with the passed in
 * perpetual id.
 */
export interface QueryCollateralPoolAddressResponseAmino {
    collateral_pool_address?: string;
}
export interface QueryCollateralPoolAddressResponseAminoMsg {
    type: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressResponse";
    value: QueryCollateralPoolAddressResponseAmino;
}
/**
 * QueryCollateralPoolAddressResponse is a response type for fetching the
 * account address of the collateral pool associated with the passed in
 * perpetual id.
 */
export interface QueryCollateralPoolAddressResponseSDKType {
    collateral_pool_address: string;
}
export declare const QueryGetSubaccountRequest: {
    typeUrl: string;
    is(o: any): o is QueryGetSubaccountRequest;
    isSDK(o: any): o is QueryGetSubaccountRequestSDKType;
    isAmino(o: any): o is QueryGetSubaccountRequestAmino;
    encode(message: QueryGetSubaccountRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryGetSubaccountRequest;
    fromPartial(object: Partial<QueryGetSubaccountRequest>): QueryGetSubaccountRequest;
    fromAmino(object: QueryGetSubaccountRequestAmino): QueryGetSubaccountRequest;
    toAmino(message: QueryGetSubaccountRequest): QueryGetSubaccountRequestAmino;
    fromAminoMsg(object: QueryGetSubaccountRequestAminoMsg): QueryGetSubaccountRequest;
    fromProtoMsg(message: QueryGetSubaccountRequestProtoMsg): QueryGetSubaccountRequest;
    toProto(message: QueryGetSubaccountRequest): Uint8Array;
    toProtoMsg(message: QueryGetSubaccountRequest): QueryGetSubaccountRequestProtoMsg;
};
export declare const QuerySubaccountResponse: {
    typeUrl: string;
    is(o: any): o is QuerySubaccountResponse;
    isSDK(o: any): o is QuerySubaccountResponseSDKType;
    isAmino(o: any): o is QuerySubaccountResponseAmino;
    encode(message: QuerySubaccountResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QuerySubaccountResponse;
    fromPartial(object: Partial<QuerySubaccountResponse>): QuerySubaccountResponse;
    fromAmino(object: QuerySubaccountResponseAmino): QuerySubaccountResponse;
    toAmino(message: QuerySubaccountResponse): QuerySubaccountResponseAmino;
    fromAminoMsg(object: QuerySubaccountResponseAminoMsg): QuerySubaccountResponse;
    fromProtoMsg(message: QuerySubaccountResponseProtoMsg): QuerySubaccountResponse;
    toProto(message: QuerySubaccountResponse): Uint8Array;
    toProtoMsg(message: QuerySubaccountResponse): QuerySubaccountResponseProtoMsg;
};
export declare const QueryAllSubaccountRequest: {
    typeUrl: string;
    is(o: any): o is QueryAllSubaccountRequest;
    isSDK(o: any): o is QueryAllSubaccountRequestSDKType;
    isAmino(o: any): o is QueryAllSubaccountRequestAmino;
    encode(message: QueryAllSubaccountRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAllSubaccountRequest;
    fromPartial(object: Partial<QueryAllSubaccountRequest>): QueryAllSubaccountRequest;
    fromAmino(object: QueryAllSubaccountRequestAmino): QueryAllSubaccountRequest;
    toAmino(message: QueryAllSubaccountRequest): QueryAllSubaccountRequestAmino;
    fromAminoMsg(object: QueryAllSubaccountRequestAminoMsg): QueryAllSubaccountRequest;
    fromProtoMsg(message: QueryAllSubaccountRequestProtoMsg): QueryAllSubaccountRequest;
    toProto(message: QueryAllSubaccountRequest): Uint8Array;
    toProtoMsg(message: QueryAllSubaccountRequest): QueryAllSubaccountRequestProtoMsg;
};
export declare const QuerySubaccountAllResponse: {
    typeUrl: string;
    is(o: any): o is QuerySubaccountAllResponse;
    isSDK(o: any): o is QuerySubaccountAllResponseSDKType;
    isAmino(o: any): o is QuerySubaccountAllResponseAmino;
    encode(message: QuerySubaccountAllResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QuerySubaccountAllResponse;
    fromPartial(object: Partial<QuerySubaccountAllResponse>): QuerySubaccountAllResponse;
    fromAmino(object: QuerySubaccountAllResponseAmino): QuerySubaccountAllResponse;
    toAmino(message: QuerySubaccountAllResponse): QuerySubaccountAllResponseAmino;
    fromAminoMsg(object: QuerySubaccountAllResponseAminoMsg): QuerySubaccountAllResponse;
    fromProtoMsg(message: QuerySubaccountAllResponseProtoMsg): QuerySubaccountAllResponse;
    toProto(message: QuerySubaccountAllResponse): Uint8Array;
    toProtoMsg(message: QuerySubaccountAllResponse): QuerySubaccountAllResponseProtoMsg;
};
export declare const QueryGetWithdrawalAndTransfersBlockedInfoRequest: {
    typeUrl: string;
    is(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoRequest;
    isSDK(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoRequestSDKType;
    isAmino(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoRequestAmino;
    encode(message: QueryGetWithdrawalAndTransfersBlockedInfoRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryGetWithdrawalAndTransfersBlockedInfoRequest;
    fromPartial(object: Partial<QueryGetWithdrawalAndTransfersBlockedInfoRequest>): QueryGetWithdrawalAndTransfersBlockedInfoRequest;
    fromAmino(object: QueryGetWithdrawalAndTransfersBlockedInfoRequestAmino): QueryGetWithdrawalAndTransfersBlockedInfoRequest;
    toAmino(message: QueryGetWithdrawalAndTransfersBlockedInfoRequest): QueryGetWithdrawalAndTransfersBlockedInfoRequestAmino;
    fromAminoMsg(object: QueryGetWithdrawalAndTransfersBlockedInfoRequestAminoMsg): QueryGetWithdrawalAndTransfersBlockedInfoRequest;
    fromProtoMsg(message: QueryGetWithdrawalAndTransfersBlockedInfoRequestProtoMsg): QueryGetWithdrawalAndTransfersBlockedInfoRequest;
    toProto(message: QueryGetWithdrawalAndTransfersBlockedInfoRequest): Uint8Array;
    toProtoMsg(message: QueryGetWithdrawalAndTransfersBlockedInfoRequest): QueryGetWithdrawalAndTransfersBlockedInfoRequestProtoMsg;
};
export declare const QueryGetWithdrawalAndTransfersBlockedInfoResponse: {
    typeUrl: string;
    is(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoResponse;
    isSDK(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoResponseSDKType;
    isAmino(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoResponseAmino;
    encode(message: QueryGetWithdrawalAndTransfersBlockedInfoResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryGetWithdrawalAndTransfersBlockedInfoResponse;
    fromPartial(object: Partial<QueryGetWithdrawalAndTransfersBlockedInfoResponse>): QueryGetWithdrawalAndTransfersBlockedInfoResponse;
    fromAmino(object: QueryGetWithdrawalAndTransfersBlockedInfoResponseAmino): QueryGetWithdrawalAndTransfersBlockedInfoResponse;
    toAmino(message: QueryGetWithdrawalAndTransfersBlockedInfoResponse): QueryGetWithdrawalAndTransfersBlockedInfoResponseAmino;
    fromAminoMsg(object: QueryGetWithdrawalAndTransfersBlockedInfoResponseAminoMsg): QueryGetWithdrawalAndTransfersBlockedInfoResponse;
    fromProtoMsg(message: QueryGetWithdrawalAndTransfersBlockedInfoResponseProtoMsg): QueryGetWithdrawalAndTransfersBlockedInfoResponse;
    toProto(message: QueryGetWithdrawalAndTransfersBlockedInfoResponse): Uint8Array;
    toProtoMsg(message: QueryGetWithdrawalAndTransfersBlockedInfoResponse): QueryGetWithdrawalAndTransfersBlockedInfoResponseProtoMsg;
};
export declare const QueryCollateralPoolAddressRequest: {
    typeUrl: string;
    is(o: any): o is QueryCollateralPoolAddressRequest;
    isSDK(o: any): o is QueryCollateralPoolAddressRequestSDKType;
    isAmino(o: any): o is QueryCollateralPoolAddressRequestAmino;
    encode(message: QueryCollateralPoolAddressRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryCollateralPoolAddressRequest;
    fromPartial(object: Partial<QueryCollateralPoolAddressRequest>): QueryCollateralPoolAddressRequest;
    fromAmino(object: QueryCollateralPoolAddressRequestAmino): QueryCollateralPoolAddressRequest;
    toAmino(message: QueryCollateralPoolAddressRequest): QueryCollateralPoolAddressRequestAmino;
    fromAminoMsg(object: QueryCollateralPoolAddressRequestAminoMsg): QueryCollateralPoolAddressRequest;
    fromProtoMsg(message: QueryCollateralPoolAddressRequestProtoMsg): QueryCollateralPoolAddressRequest;
    toProto(message: QueryCollateralPoolAddressRequest): Uint8Array;
    toProtoMsg(message: QueryCollateralPoolAddressRequest): QueryCollateralPoolAddressRequestProtoMsg;
};
export declare const QueryCollateralPoolAddressResponse: {
    typeUrl: string;
    is(o: any): o is QueryCollateralPoolAddressResponse;
    isSDK(o: any): o is QueryCollateralPoolAddressResponseSDKType;
    isAmino(o: any): o is QueryCollateralPoolAddressResponseAmino;
    encode(message: QueryCollateralPoolAddressResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryCollateralPoolAddressResponse;
    fromPartial(object: Partial<QueryCollateralPoolAddressResponse>): QueryCollateralPoolAddressResponse;
    fromAmino(object: QueryCollateralPoolAddressResponseAmino): QueryCollateralPoolAddressResponse;
    toAmino(message: QueryCollateralPoolAddressResponse): QueryCollateralPoolAddressResponseAmino;
    fromAminoMsg(object: QueryCollateralPoolAddressResponseAminoMsg): QueryCollateralPoolAddressResponse;
    fromProtoMsg(message: QueryCollateralPoolAddressResponseProtoMsg): QueryCollateralPoolAddressResponse;
    toProto(message: QueryCollateralPoolAddressResponse): Uint8Array;
    toProtoMsg(message: QueryCollateralPoolAddressResponse): QueryCollateralPoolAddressResponseProtoMsg;
};
