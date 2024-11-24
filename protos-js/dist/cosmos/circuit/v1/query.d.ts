import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../base/query/v1beta1/pagination";
import { Permissions, PermissionsAmino, PermissionsSDKType, GenesisAccountPermissions, GenesisAccountPermissionsAmino, GenesisAccountPermissionsSDKType } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequest {
    address: string;
}
export interface QueryAccountRequestProtoMsg {
    typeUrl: "/cosmos.circuit.v1.QueryAccountRequest";
    value: Uint8Array;
}
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequestAmino {
    address?: string;
}
export interface QueryAccountRequestAminoMsg {
    type: "cosmos-sdk/QueryAccountRequest";
    value: QueryAccountRequestAmino;
}
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequestSDKType {
    address: string;
}
/** AccountResponse is the response type for the Query/Account RPC method. */
export interface AccountResponse {
    permission?: Permissions;
}
export interface AccountResponseProtoMsg {
    typeUrl: "/cosmos.circuit.v1.AccountResponse";
    value: Uint8Array;
}
/** AccountResponse is the response type for the Query/Account RPC method. */
export interface AccountResponseAmino {
    permission?: PermissionsAmino;
}
export interface AccountResponseAminoMsg {
    type: "cosmos-sdk/AccountResponse";
    value: AccountResponseAmino;
}
/** AccountResponse is the response type for the Query/Account RPC method. */
export interface AccountResponseSDKType {
    permission?: PermissionsSDKType;
}
/** QueryAccountsRequest is the request type for the Query/Accounts RPC method. */
export interface QueryAccountsRequest {
    /** pagination defines an optional pagination for the request. */
    pagination?: PageRequest;
}
export interface QueryAccountsRequestProtoMsg {
    typeUrl: "/cosmos.circuit.v1.QueryAccountsRequest";
    value: Uint8Array;
}
/** QueryAccountsRequest is the request type for the Query/Accounts RPC method. */
export interface QueryAccountsRequestAmino {
    /** pagination defines an optional pagination for the request. */
    pagination?: PageRequestAmino;
}
export interface QueryAccountsRequestAminoMsg {
    type: "cosmos-sdk/QueryAccountsRequest";
    value: QueryAccountsRequestAmino;
}
/** QueryAccountsRequest is the request type for the Query/Accounts RPC method. */
export interface QueryAccountsRequestSDKType {
    pagination?: PageRequestSDKType;
}
/** AccountsResponse is the response type for the Query/Accounts RPC method. */
export interface AccountsResponse {
    accounts: GenesisAccountPermissions[];
    /** pagination defines the pagination in the response. */
    pagination?: PageResponse;
}
export interface AccountsResponseProtoMsg {
    typeUrl: "/cosmos.circuit.v1.AccountsResponse";
    value: Uint8Array;
}
/** AccountsResponse is the response type for the Query/Accounts RPC method. */
export interface AccountsResponseAmino {
    accounts?: GenesisAccountPermissionsAmino[];
    /** pagination defines the pagination in the response. */
    pagination?: PageResponseAmino;
}
export interface AccountsResponseAminoMsg {
    type: "cosmos-sdk/AccountsResponse";
    value: AccountsResponseAmino;
}
/** AccountsResponse is the response type for the Query/Accounts RPC method. */
export interface AccountsResponseSDKType {
    accounts: GenesisAccountPermissionsSDKType[];
    pagination?: PageResponseSDKType;
}
/** QueryDisableListRequest is the request type for the Query/DisabledList RPC method. */
export interface QueryDisabledListRequest {
}
export interface QueryDisabledListRequestProtoMsg {
    typeUrl: "/cosmos.circuit.v1.QueryDisabledListRequest";
    value: Uint8Array;
}
/** QueryDisableListRequest is the request type for the Query/DisabledList RPC method. */
export interface QueryDisabledListRequestAmino {
}
export interface QueryDisabledListRequestAminoMsg {
    type: "cosmos-sdk/QueryDisabledListRequest";
    value: QueryDisabledListRequestAmino;
}
/** QueryDisableListRequest is the request type for the Query/DisabledList RPC method. */
export interface QueryDisabledListRequestSDKType {
}
/** DisabledListResponse is the response type for the Query/DisabledList RPC method. */
export interface DisabledListResponse {
    disabledList: string[];
}
export interface DisabledListResponseProtoMsg {
    typeUrl: "/cosmos.circuit.v1.DisabledListResponse";
    value: Uint8Array;
}
/** DisabledListResponse is the response type for the Query/DisabledList RPC method. */
export interface DisabledListResponseAmino {
    disabled_list?: string[];
}
export interface DisabledListResponseAminoMsg {
    type: "cosmos-sdk/DisabledListResponse";
    value: DisabledListResponseAmino;
}
/** DisabledListResponse is the response type for the Query/DisabledList RPC method. */
export interface DisabledListResponseSDKType {
    disabled_list: string[];
}
export declare const QueryAccountRequest: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is QueryAccountRequest;
    isSDK(o: any): o is QueryAccountRequestSDKType;
    isAmino(o: any): o is QueryAccountRequestAmino;
    encode(message: QueryAccountRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountRequest;
    fromPartial(object: Partial<QueryAccountRequest>): QueryAccountRequest;
    fromAmino(object: QueryAccountRequestAmino): QueryAccountRequest;
    toAmino(message: QueryAccountRequest): QueryAccountRequestAmino;
    fromAminoMsg(object: QueryAccountRequestAminoMsg): QueryAccountRequest;
    toAminoMsg(message: QueryAccountRequest): QueryAccountRequestAminoMsg;
    fromProtoMsg(message: QueryAccountRequestProtoMsg): QueryAccountRequest;
    toProto(message: QueryAccountRequest): Uint8Array;
    toProtoMsg(message: QueryAccountRequest): QueryAccountRequestProtoMsg;
};
export declare const AccountResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is AccountResponse;
    isSDK(o: any): o is AccountResponseSDKType;
    isAmino(o: any): o is AccountResponseAmino;
    encode(message: AccountResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AccountResponse;
    fromPartial(object: Partial<AccountResponse>): AccountResponse;
    fromAmino(object: AccountResponseAmino): AccountResponse;
    toAmino(message: AccountResponse): AccountResponseAmino;
    fromAminoMsg(object: AccountResponseAminoMsg): AccountResponse;
    toAminoMsg(message: AccountResponse): AccountResponseAminoMsg;
    fromProtoMsg(message: AccountResponseProtoMsg): AccountResponse;
    toProto(message: AccountResponse): Uint8Array;
    toProtoMsg(message: AccountResponse): AccountResponseProtoMsg;
};
export declare const QueryAccountsRequest: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is QueryAccountsRequest;
    isSDK(o: any): o is QueryAccountsRequestSDKType;
    isAmino(o: any): o is QueryAccountsRequestAmino;
    encode(message: QueryAccountsRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountsRequest;
    fromPartial(object: Partial<QueryAccountsRequest>): QueryAccountsRequest;
    fromAmino(object: QueryAccountsRequestAmino): QueryAccountsRequest;
    toAmino(message: QueryAccountsRequest): QueryAccountsRequestAmino;
    fromAminoMsg(object: QueryAccountsRequestAminoMsg): QueryAccountsRequest;
    toAminoMsg(message: QueryAccountsRequest): QueryAccountsRequestAminoMsg;
    fromProtoMsg(message: QueryAccountsRequestProtoMsg): QueryAccountsRequest;
    toProto(message: QueryAccountsRequest): Uint8Array;
    toProtoMsg(message: QueryAccountsRequest): QueryAccountsRequestProtoMsg;
};
export declare const AccountsResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is AccountsResponse;
    isSDK(o: any): o is AccountsResponseSDKType;
    isAmino(o: any): o is AccountsResponseAmino;
    encode(message: AccountsResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AccountsResponse;
    fromPartial(object: Partial<AccountsResponse>): AccountsResponse;
    fromAmino(object: AccountsResponseAmino): AccountsResponse;
    toAmino(message: AccountsResponse): AccountsResponseAmino;
    fromAminoMsg(object: AccountsResponseAminoMsg): AccountsResponse;
    toAminoMsg(message: AccountsResponse): AccountsResponseAminoMsg;
    fromProtoMsg(message: AccountsResponseProtoMsg): AccountsResponse;
    toProto(message: AccountsResponse): Uint8Array;
    toProtoMsg(message: AccountsResponse): AccountsResponseProtoMsg;
};
export declare const QueryDisabledListRequest: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is QueryDisabledListRequest;
    isSDK(o: any): o is QueryDisabledListRequestSDKType;
    isAmino(o: any): o is QueryDisabledListRequestAmino;
    encode(_: QueryDisabledListRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): QueryDisabledListRequest;
    fromPartial(_: Partial<QueryDisabledListRequest>): QueryDisabledListRequest;
    fromAmino(_: QueryDisabledListRequestAmino): QueryDisabledListRequest;
    toAmino(_: QueryDisabledListRequest): QueryDisabledListRequestAmino;
    fromAminoMsg(object: QueryDisabledListRequestAminoMsg): QueryDisabledListRequest;
    toAminoMsg(message: QueryDisabledListRequest): QueryDisabledListRequestAminoMsg;
    fromProtoMsg(message: QueryDisabledListRequestProtoMsg): QueryDisabledListRequest;
    toProto(message: QueryDisabledListRequest): Uint8Array;
    toProtoMsg(message: QueryDisabledListRequest): QueryDisabledListRequestProtoMsg;
};
export declare const DisabledListResponse: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is DisabledListResponse;
    isSDK(o: any): o is DisabledListResponseSDKType;
    isAmino(o: any): o is DisabledListResponseAmino;
    encode(message: DisabledListResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): DisabledListResponse;
    fromPartial(object: Partial<DisabledListResponse>): DisabledListResponse;
    fromAmino(object: DisabledListResponseAmino): DisabledListResponse;
    toAmino(message: DisabledListResponse): DisabledListResponseAmino;
    fromAminoMsg(object: DisabledListResponseAminoMsg): DisabledListResponse;
    toAminoMsg(message: DisabledListResponse): DisabledListResponseAminoMsg;
    fromProtoMsg(message: DisabledListResponseProtoMsg): DisabledListResponse;
    toProto(message: DisabledListResponse): Uint8Array;
    toProtoMsg(message: DisabledListResponse): DisabledListResponseProtoMsg;
};
