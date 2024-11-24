//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Subaccount, SubaccountAmino, SubaccountSDKType } from "./subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
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
function createBaseQueryGetSubaccountRequest(): QueryGetSubaccountRequest {
  return {
    owner: "",
    number: 0
  };
}
export const QueryGetSubaccountRequest = {
  typeUrl: "/klyraprotocol.subaccounts.QueryGetSubaccountRequest",
  is(o: any): o is QueryGetSubaccountRequest {
    return o && (o.$typeUrl === QueryGetSubaccountRequest.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
  },
  isSDK(o: any): o is QueryGetSubaccountRequestSDKType {
    return o && (o.$typeUrl === QueryGetSubaccountRequest.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
  },
  isAmino(o: any): o is QueryGetSubaccountRequestAmino {
    return o && (o.$typeUrl === QueryGetSubaccountRequest.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
  },
  encode(message: QueryGetSubaccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.number !== 0) {
      writer.uint32(16).uint32(message.number);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetSubaccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSubaccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.number = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetSubaccountRequest>): QueryGetSubaccountRequest {
    const message = createBaseQueryGetSubaccountRequest();
    message.owner = object.owner ?? "";
    message.number = object.number ?? 0;
    return message;
  },
  fromAmino(object: QueryGetSubaccountRequestAmino): QueryGetSubaccountRequest {
    const message = createBaseQueryGetSubaccountRequest();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.number !== undefined && object.number !== null) {
      message.number = object.number;
    }
    return message;
  },
  toAmino(message: QueryGetSubaccountRequest): QueryGetSubaccountRequestAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.number = message.number === 0 ? undefined : message.number;
    return obj;
  },
  fromAminoMsg(object: QueryGetSubaccountRequestAminoMsg): QueryGetSubaccountRequest {
    return QueryGetSubaccountRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetSubaccountRequestProtoMsg): QueryGetSubaccountRequest {
    return QueryGetSubaccountRequest.decode(message.value);
  },
  toProto(message: QueryGetSubaccountRequest): Uint8Array {
    return QueryGetSubaccountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetSubaccountRequest): QueryGetSubaccountRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.QueryGetSubaccountRequest",
      value: QueryGetSubaccountRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryGetSubaccountRequest.typeUrl, QueryGetSubaccountRequest);
function createBaseQuerySubaccountResponse(): QuerySubaccountResponse {
  return {
    subaccount: Subaccount.fromPartial({})
  };
}
export const QuerySubaccountResponse = {
  typeUrl: "/klyraprotocol.subaccounts.QuerySubaccountResponse",
  is(o: any): o is QuerySubaccountResponse {
    return o && (o.$typeUrl === QuerySubaccountResponse.typeUrl || Subaccount.is(o.subaccount));
  },
  isSDK(o: any): o is QuerySubaccountResponseSDKType {
    return o && (o.$typeUrl === QuerySubaccountResponse.typeUrl || Subaccount.isSDK(o.subaccount));
  },
  isAmino(o: any): o is QuerySubaccountResponseAmino {
    return o && (o.$typeUrl === QuerySubaccountResponse.typeUrl || Subaccount.isAmino(o.subaccount));
  },
  encode(message: QuerySubaccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.subaccount !== undefined) {
      Subaccount.encode(message.subaccount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySubaccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySubaccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subaccount = Subaccount.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySubaccountResponse>): QuerySubaccountResponse {
    const message = createBaseQuerySubaccountResponse();
    message.subaccount = object.subaccount !== undefined && object.subaccount !== null ? Subaccount.fromPartial(object.subaccount) : undefined;
    return message;
  },
  fromAmino(object: QuerySubaccountResponseAmino): QuerySubaccountResponse {
    const message = createBaseQuerySubaccountResponse();
    if (object.subaccount !== undefined && object.subaccount !== null) {
      message.subaccount = Subaccount.fromAmino(object.subaccount);
    }
    return message;
  },
  toAmino(message: QuerySubaccountResponse): QuerySubaccountResponseAmino {
    const obj: any = {};
    obj.subaccount = message.subaccount ? Subaccount.toAmino(message.subaccount) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySubaccountResponseAminoMsg): QuerySubaccountResponse {
    return QuerySubaccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySubaccountResponseProtoMsg): QuerySubaccountResponse {
    return QuerySubaccountResponse.decode(message.value);
  },
  toProto(message: QuerySubaccountResponse): Uint8Array {
    return QuerySubaccountResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySubaccountResponse): QuerySubaccountResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.QuerySubaccountResponse",
      value: QuerySubaccountResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QuerySubaccountResponse.typeUrl, QuerySubaccountResponse);
function createBaseQueryAllSubaccountRequest(): QueryAllSubaccountRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllSubaccountRequest = {
  typeUrl: "/klyraprotocol.subaccounts.QueryAllSubaccountRequest",
  is(o: any): o is QueryAllSubaccountRequest {
    return o && o.$typeUrl === QueryAllSubaccountRequest.typeUrl;
  },
  isSDK(o: any): o is QueryAllSubaccountRequestSDKType {
    return o && o.$typeUrl === QueryAllSubaccountRequest.typeUrl;
  },
  isAmino(o: any): o is QueryAllSubaccountRequestAmino {
    return o && o.$typeUrl === QueryAllSubaccountRequest.typeUrl;
  },
  encode(message: QueryAllSubaccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllSubaccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSubaccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllSubaccountRequest>): QueryAllSubaccountRequest {
    const message = createBaseQueryAllSubaccountRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllSubaccountRequestAmino): QueryAllSubaccountRequest {
    const message = createBaseQueryAllSubaccountRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllSubaccountRequest): QueryAllSubaccountRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllSubaccountRequestAminoMsg): QueryAllSubaccountRequest {
    return QueryAllSubaccountRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllSubaccountRequestProtoMsg): QueryAllSubaccountRequest {
    return QueryAllSubaccountRequest.decode(message.value);
  },
  toProto(message: QueryAllSubaccountRequest): Uint8Array {
    return QueryAllSubaccountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllSubaccountRequest): QueryAllSubaccountRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.QueryAllSubaccountRequest",
      value: QueryAllSubaccountRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAllSubaccountRequest.typeUrl, QueryAllSubaccountRequest);
function createBaseQuerySubaccountAllResponse(): QuerySubaccountAllResponse {
  return {
    subaccount: [],
    pagination: undefined
  };
}
export const QuerySubaccountAllResponse = {
  typeUrl: "/klyraprotocol.subaccounts.QuerySubaccountAllResponse",
  is(o: any): o is QuerySubaccountAllResponse {
    return o && (o.$typeUrl === QuerySubaccountAllResponse.typeUrl || Array.isArray(o.subaccount) && (!o.subaccount.length || Subaccount.is(o.subaccount[0])));
  },
  isSDK(o: any): o is QuerySubaccountAllResponseSDKType {
    return o && (o.$typeUrl === QuerySubaccountAllResponse.typeUrl || Array.isArray(o.subaccount) && (!o.subaccount.length || Subaccount.isSDK(o.subaccount[0])));
  },
  isAmino(o: any): o is QuerySubaccountAllResponseAmino {
    return o && (o.$typeUrl === QuerySubaccountAllResponse.typeUrl || Array.isArray(o.subaccount) && (!o.subaccount.length || Subaccount.isAmino(o.subaccount[0])));
  },
  encode(message: QuerySubaccountAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.subaccount) {
      Subaccount.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySubaccountAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySubaccountAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subaccount.push(Subaccount.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySubaccountAllResponse>): QuerySubaccountAllResponse {
    const message = createBaseQuerySubaccountAllResponse();
    message.subaccount = object.subaccount?.map(e => Subaccount.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySubaccountAllResponseAmino): QuerySubaccountAllResponse {
    const message = createBaseQuerySubaccountAllResponse();
    message.subaccount = object.subaccount?.map(e => Subaccount.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySubaccountAllResponse): QuerySubaccountAllResponseAmino {
    const obj: any = {};
    if (message.subaccount) {
      obj.subaccount = message.subaccount.map(e => e ? Subaccount.toAmino(e) : undefined);
    } else {
      obj.subaccount = message.subaccount;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySubaccountAllResponseAminoMsg): QuerySubaccountAllResponse {
    return QuerySubaccountAllResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySubaccountAllResponseProtoMsg): QuerySubaccountAllResponse {
    return QuerySubaccountAllResponse.decode(message.value);
  },
  toProto(message: QuerySubaccountAllResponse): Uint8Array {
    return QuerySubaccountAllResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySubaccountAllResponse): QuerySubaccountAllResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.QuerySubaccountAllResponse",
      value: QuerySubaccountAllResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QuerySubaccountAllResponse.typeUrl, QuerySubaccountAllResponse);
function createBaseQueryGetWithdrawalAndTransfersBlockedInfoRequest(): QueryGetWithdrawalAndTransfersBlockedInfoRequest {
  return {
    perpetualId: 0
  };
}
export const QueryGetWithdrawalAndTransfersBlockedInfoRequest = {
  typeUrl: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoRequest",
  is(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoRequest {
    return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoRequest.typeUrl || typeof o.perpetualId === "number");
  },
  isSDK(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoRequestSDKType {
    return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoRequest.typeUrl || typeof o.perpetual_id === "number");
  },
  isAmino(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoRequestAmino {
    return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoRequest.typeUrl || typeof o.perpetual_id === "number");
  },
  encode(message: QueryGetWithdrawalAndTransfersBlockedInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.perpetualId !== 0) {
      writer.uint32(8).uint32(message.perpetualId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetWithdrawalAndTransfersBlockedInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetWithdrawalAndTransfersBlockedInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.perpetualId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetWithdrawalAndTransfersBlockedInfoRequest>): QueryGetWithdrawalAndTransfersBlockedInfoRequest {
    const message = createBaseQueryGetWithdrawalAndTransfersBlockedInfoRequest();
    message.perpetualId = object.perpetualId ?? 0;
    return message;
  },
  fromAmino(object: QueryGetWithdrawalAndTransfersBlockedInfoRequestAmino): QueryGetWithdrawalAndTransfersBlockedInfoRequest {
    const message = createBaseQueryGetWithdrawalAndTransfersBlockedInfoRequest();
    if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
      message.perpetualId = object.perpetual_id;
    }
    return message;
  },
  toAmino(message: QueryGetWithdrawalAndTransfersBlockedInfoRequest): QueryGetWithdrawalAndTransfersBlockedInfoRequestAmino {
    const obj: any = {};
    obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
    return obj;
  },
  fromAminoMsg(object: QueryGetWithdrawalAndTransfersBlockedInfoRequestAminoMsg): QueryGetWithdrawalAndTransfersBlockedInfoRequest {
    return QueryGetWithdrawalAndTransfersBlockedInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetWithdrawalAndTransfersBlockedInfoRequestProtoMsg): QueryGetWithdrawalAndTransfersBlockedInfoRequest {
    return QueryGetWithdrawalAndTransfersBlockedInfoRequest.decode(message.value);
  },
  toProto(message: QueryGetWithdrawalAndTransfersBlockedInfoRequest): Uint8Array {
    return QueryGetWithdrawalAndTransfersBlockedInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetWithdrawalAndTransfersBlockedInfoRequest): QueryGetWithdrawalAndTransfersBlockedInfoRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoRequest",
      value: QueryGetWithdrawalAndTransfersBlockedInfoRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryGetWithdrawalAndTransfersBlockedInfoRequest.typeUrl, QueryGetWithdrawalAndTransfersBlockedInfoRequest);
function createBaseQueryGetWithdrawalAndTransfersBlockedInfoResponse(): QueryGetWithdrawalAndTransfersBlockedInfoResponse {
  return {
    negativeTncSubaccountSeenAtBlock: 0,
    chainOutageSeenAtBlock: 0,
    withdrawalsAndTransfersUnblockedAtBlock: 0
  };
}
export const QueryGetWithdrawalAndTransfersBlockedInfoResponse = {
  typeUrl: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoResponse",
  is(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoResponse {
    return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoResponse.typeUrl || typeof o.negativeTncSubaccountSeenAtBlock === "number" && typeof o.chainOutageSeenAtBlock === "number" && typeof o.withdrawalsAndTransfersUnblockedAtBlock === "number");
  },
  isSDK(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoResponseSDKType {
    return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoResponse.typeUrl || typeof o.negative_tnc_subaccount_seen_at_block === "number" && typeof o.chain_outage_seen_at_block === "number" && typeof o.withdrawals_and_transfers_unblocked_at_block === "number");
  },
  isAmino(o: any): o is QueryGetWithdrawalAndTransfersBlockedInfoResponseAmino {
    return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoResponse.typeUrl || typeof o.negative_tnc_subaccount_seen_at_block === "number" && typeof o.chain_outage_seen_at_block === "number" && typeof o.withdrawals_and_transfers_unblocked_at_block === "number");
  },
  encode(message: QueryGetWithdrawalAndTransfersBlockedInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.negativeTncSubaccountSeenAtBlock !== 0) {
      writer.uint32(8).uint32(message.negativeTncSubaccountSeenAtBlock);
    }
    if (message.chainOutageSeenAtBlock !== 0) {
      writer.uint32(16).uint32(message.chainOutageSeenAtBlock);
    }
    if (message.withdrawalsAndTransfersUnblockedAtBlock !== 0) {
      writer.uint32(24).uint32(message.withdrawalsAndTransfersUnblockedAtBlock);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetWithdrawalAndTransfersBlockedInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetWithdrawalAndTransfersBlockedInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.negativeTncSubaccountSeenAtBlock = reader.uint32();
          break;
        case 2:
          message.chainOutageSeenAtBlock = reader.uint32();
          break;
        case 3:
          message.withdrawalsAndTransfersUnblockedAtBlock = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetWithdrawalAndTransfersBlockedInfoResponse>): QueryGetWithdrawalAndTransfersBlockedInfoResponse {
    const message = createBaseQueryGetWithdrawalAndTransfersBlockedInfoResponse();
    message.negativeTncSubaccountSeenAtBlock = object.negativeTncSubaccountSeenAtBlock ?? 0;
    message.chainOutageSeenAtBlock = object.chainOutageSeenAtBlock ?? 0;
    message.withdrawalsAndTransfersUnblockedAtBlock = object.withdrawalsAndTransfersUnblockedAtBlock ?? 0;
    return message;
  },
  fromAmino(object: QueryGetWithdrawalAndTransfersBlockedInfoResponseAmino): QueryGetWithdrawalAndTransfersBlockedInfoResponse {
    const message = createBaseQueryGetWithdrawalAndTransfersBlockedInfoResponse();
    if (object.negative_tnc_subaccount_seen_at_block !== undefined && object.negative_tnc_subaccount_seen_at_block !== null) {
      message.negativeTncSubaccountSeenAtBlock = object.negative_tnc_subaccount_seen_at_block;
    }
    if (object.chain_outage_seen_at_block !== undefined && object.chain_outage_seen_at_block !== null) {
      message.chainOutageSeenAtBlock = object.chain_outage_seen_at_block;
    }
    if (object.withdrawals_and_transfers_unblocked_at_block !== undefined && object.withdrawals_and_transfers_unblocked_at_block !== null) {
      message.withdrawalsAndTransfersUnblockedAtBlock = object.withdrawals_and_transfers_unblocked_at_block;
    }
    return message;
  },
  toAmino(message: QueryGetWithdrawalAndTransfersBlockedInfoResponse): QueryGetWithdrawalAndTransfersBlockedInfoResponseAmino {
    const obj: any = {};
    obj.negative_tnc_subaccount_seen_at_block = message.negativeTncSubaccountSeenAtBlock === 0 ? undefined : message.negativeTncSubaccountSeenAtBlock;
    obj.chain_outage_seen_at_block = message.chainOutageSeenAtBlock === 0 ? undefined : message.chainOutageSeenAtBlock;
    obj.withdrawals_and_transfers_unblocked_at_block = message.withdrawalsAndTransfersUnblockedAtBlock === 0 ? undefined : message.withdrawalsAndTransfersUnblockedAtBlock;
    return obj;
  },
  fromAminoMsg(object: QueryGetWithdrawalAndTransfersBlockedInfoResponseAminoMsg): QueryGetWithdrawalAndTransfersBlockedInfoResponse {
    return QueryGetWithdrawalAndTransfersBlockedInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetWithdrawalAndTransfersBlockedInfoResponseProtoMsg): QueryGetWithdrawalAndTransfersBlockedInfoResponse {
    return QueryGetWithdrawalAndTransfersBlockedInfoResponse.decode(message.value);
  },
  toProto(message: QueryGetWithdrawalAndTransfersBlockedInfoResponse): Uint8Array {
    return QueryGetWithdrawalAndTransfersBlockedInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetWithdrawalAndTransfersBlockedInfoResponse): QueryGetWithdrawalAndTransfersBlockedInfoResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoResponse",
      value: QueryGetWithdrawalAndTransfersBlockedInfoResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryGetWithdrawalAndTransfersBlockedInfoResponse.typeUrl, QueryGetWithdrawalAndTransfersBlockedInfoResponse);
function createBaseQueryCollateralPoolAddressRequest(): QueryCollateralPoolAddressRequest {
  return {
    perpetualId: 0
  };
}
export const QueryCollateralPoolAddressRequest = {
  typeUrl: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressRequest",
  is(o: any): o is QueryCollateralPoolAddressRequest {
    return o && (o.$typeUrl === QueryCollateralPoolAddressRequest.typeUrl || typeof o.perpetualId === "number");
  },
  isSDK(o: any): o is QueryCollateralPoolAddressRequestSDKType {
    return o && (o.$typeUrl === QueryCollateralPoolAddressRequest.typeUrl || typeof o.perpetual_id === "number");
  },
  isAmino(o: any): o is QueryCollateralPoolAddressRequestAmino {
    return o && (o.$typeUrl === QueryCollateralPoolAddressRequest.typeUrl || typeof o.perpetual_id === "number");
  },
  encode(message: QueryCollateralPoolAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.perpetualId !== 0) {
      writer.uint32(8).uint32(message.perpetualId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCollateralPoolAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollateralPoolAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.perpetualId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCollateralPoolAddressRequest>): QueryCollateralPoolAddressRequest {
    const message = createBaseQueryCollateralPoolAddressRequest();
    message.perpetualId = object.perpetualId ?? 0;
    return message;
  },
  fromAmino(object: QueryCollateralPoolAddressRequestAmino): QueryCollateralPoolAddressRequest {
    const message = createBaseQueryCollateralPoolAddressRequest();
    if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
      message.perpetualId = object.perpetual_id;
    }
    return message;
  },
  toAmino(message: QueryCollateralPoolAddressRequest): QueryCollateralPoolAddressRequestAmino {
    const obj: any = {};
    obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
    return obj;
  },
  fromAminoMsg(object: QueryCollateralPoolAddressRequestAminoMsg): QueryCollateralPoolAddressRequest {
    return QueryCollateralPoolAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCollateralPoolAddressRequestProtoMsg): QueryCollateralPoolAddressRequest {
    return QueryCollateralPoolAddressRequest.decode(message.value);
  },
  toProto(message: QueryCollateralPoolAddressRequest): Uint8Array {
    return QueryCollateralPoolAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCollateralPoolAddressRequest): QueryCollateralPoolAddressRequestProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressRequest",
      value: QueryCollateralPoolAddressRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCollateralPoolAddressRequest.typeUrl, QueryCollateralPoolAddressRequest);
function createBaseQueryCollateralPoolAddressResponse(): QueryCollateralPoolAddressResponse {
  return {
    collateralPoolAddress: ""
  };
}
export const QueryCollateralPoolAddressResponse = {
  typeUrl: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressResponse",
  is(o: any): o is QueryCollateralPoolAddressResponse {
    return o && (o.$typeUrl === QueryCollateralPoolAddressResponse.typeUrl || typeof o.collateralPoolAddress === "string");
  },
  isSDK(o: any): o is QueryCollateralPoolAddressResponseSDKType {
    return o && (o.$typeUrl === QueryCollateralPoolAddressResponse.typeUrl || typeof o.collateral_pool_address === "string");
  },
  isAmino(o: any): o is QueryCollateralPoolAddressResponseAmino {
    return o && (o.$typeUrl === QueryCollateralPoolAddressResponse.typeUrl || typeof o.collateral_pool_address === "string");
  },
  encode(message: QueryCollateralPoolAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.collateralPoolAddress !== "") {
      writer.uint32(10).string(message.collateralPoolAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCollateralPoolAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollateralPoolAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateralPoolAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCollateralPoolAddressResponse>): QueryCollateralPoolAddressResponse {
    const message = createBaseQueryCollateralPoolAddressResponse();
    message.collateralPoolAddress = object.collateralPoolAddress ?? "";
    return message;
  },
  fromAmino(object: QueryCollateralPoolAddressResponseAmino): QueryCollateralPoolAddressResponse {
    const message = createBaseQueryCollateralPoolAddressResponse();
    if (object.collateral_pool_address !== undefined && object.collateral_pool_address !== null) {
      message.collateralPoolAddress = object.collateral_pool_address;
    }
    return message;
  },
  toAmino(message: QueryCollateralPoolAddressResponse): QueryCollateralPoolAddressResponseAmino {
    const obj: any = {};
    obj.collateral_pool_address = message.collateralPoolAddress === "" ? undefined : message.collateralPoolAddress;
    return obj;
  },
  fromAminoMsg(object: QueryCollateralPoolAddressResponseAminoMsg): QueryCollateralPoolAddressResponse {
    return QueryCollateralPoolAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCollateralPoolAddressResponseProtoMsg): QueryCollateralPoolAddressResponse {
    return QueryCollateralPoolAddressResponse.decode(message.value);
  },
  toProto(message: QueryCollateralPoolAddressResponse): Uint8Array {
    return QueryCollateralPoolAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCollateralPoolAddressResponse): QueryCollateralPoolAddressResponseProtoMsg {
    return {
      typeUrl: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressResponse",
      value: QueryCollateralPoolAddressResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryCollateralPoolAddressResponse.typeUrl, QueryCollateralPoolAddressResponse);