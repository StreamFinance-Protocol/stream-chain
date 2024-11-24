//@ts-nocheck
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Subaccount } from "./subaccount";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseQueryGetSubaccountRequest() {
    return {
        owner: "",
        number: 0
    };
}
export const QueryGetSubaccountRequest = {
    typeUrl: "/klyraprotocol.subaccounts.QueryGetSubaccountRequest",
    is(o) {
        return o && (o.$typeUrl === QueryGetSubaccountRequest.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryGetSubaccountRequest.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryGetSubaccountRequest.typeUrl || typeof o.owner === "string" && typeof o.number === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.number !== 0) {
            writer.uint32(16).uint32(message.number);
        }
        return writer;
    },
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseQueryGetSubaccountRequest();
        message.owner = object.owner ?? "";
        message.number = object.number ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryGetSubaccountRequest();
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        if (object.number !== undefined && object.number !== null) {
            message.number = object.number;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.owner = message.owner === "" ? undefined : message.owner;
        obj.number = message.number === 0 ? undefined : message.number;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryGetSubaccountRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryGetSubaccountRequest.decode(message.value);
    },
    toProto(message) {
        return QueryGetSubaccountRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.QueryGetSubaccountRequest",
            value: QueryGetSubaccountRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryGetSubaccountRequest.typeUrl, QueryGetSubaccountRequest);
function createBaseQuerySubaccountResponse() {
    return {
        subaccount: Subaccount.fromPartial({})
    };
}
export const QuerySubaccountResponse = {
    typeUrl: "/klyraprotocol.subaccounts.QuerySubaccountResponse",
    is(o) {
        return o && (o.$typeUrl === QuerySubaccountResponse.typeUrl || Subaccount.is(o.subaccount));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QuerySubaccountResponse.typeUrl || Subaccount.isSDK(o.subaccount));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QuerySubaccountResponse.typeUrl || Subaccount.isAmino(o.subaccount));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.subaccount !== undefined) {
            Subaccount.encode(message.subaccount, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseQuerySubaccountResponse();
        message.subaccount = object.subaccount !== undefined && object.subaccount !== null ? Subaccount.fromPartial(object.subaccount) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQuerySubaccountResponse();
        if (object.subaccount !== undefined && object.subaccount !== null) {
            message.subaccount = Subaccount.fromAmino(object.subaccount);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.subaccount = message.subaccount ? Subaccount.toAmino(message.subaccount) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QuerySubaccountResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QuerySubaccountResponse.decode(message.value);
    },
    toProto(message) {
        return QuerySubaccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.QuerySubaccountResponse",
            value: QuerySubaccountResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QuerySubaccountResponse.typeUrl, QuerySubaccountResponse);
function createBaseQueryAllSubaccountRequest() {
    return {
        pagination: undefined
    };
}
export const QueryAllSubaccountRequest = {
    typeUrl: "/klyraprotocol.subaccounts.QueryAllSubaccountRequest",
    is(o) {
        return o && o.$typeUrl === QueryAllSubaccountRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAllSubaccountRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAllSubaccountRequest.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseQueryAllSubaccountRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllSubaccountRequest();
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllSubaccountRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllSubaccountRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAllSubaccountRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.QueryAllSubaccountRequest",
            value: QueryAllSubaccountRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllSubaccountRequest.typeUrl, QueryAllSubaccountRequest);
function createBaseQuerySubaccountAllResponse() {
    return {
        subaccount: [],
        pagination: undefined
    };
}
export const QuerySubaccountAllResponse = {
    typeUrl: "/klyraprotocol.subaccounts.QuerySubaccountAllResponse",
    is(o) {
        return o && (o.$typeUrl === QuerySubaccountAllResponse.typeUrl || Array.isArray(o.subaccount) && (!o.subaccount.length || Subaccount.is(o.subaccount[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QuerySubaccountAllResponse.typeUrl || Array.isArray(o.subaccount) && (!o.subaccount.length || Subaccount.isSDK(o.subaccount[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QuerySubaccountAllResponse.typeUrl || Array.isArray(o.subaccount) && (!o.subaccount.length || Subaccount.isAmino(o.subaccount[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.subaccount) {
            Subaccount.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseQuerySubaccountAllResponse();
        message.subaccount = object.subaccount?.map(e => Subaccount.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQuerySubaccountAllResponse();
        message.subaccount = object.subaccount?.map(e => Subaccount.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.subaccount) {
            obj.subaccount = message.subaccount.map(e => e ? Subaccount.toAmino(e) : undefined);
        }
        else {
            obj.subaccount = message.subaccount;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QuerySubaccountAllResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QuerySubaccountAllResponse.decode(message.value);
    },
    toProto(message) {
        return QuerySubaccountAllResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.QuerySubaccountAllResponse",
            value: QuerySubaccountAllResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QuerySubaccountAllResponse.typeUrl, QuerySubaccountAllResponse);
function createBaseQueryGetWithdrawalAndTransfersBlockedInfoRequest() {
    return {
        perpetualId: 0
    };
}
export const QueryGetWithdrawalAndTransfersBlockedInfoRequest = {
    typeUrl: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoRequest",
    is(o) {
        return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoRequest.typeUrl || typeof o.perpetualId === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoRequest.typeUrl || typeof o.perpetual_id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoRequest.typeUrl || typeof o.perpetual_id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.perpetualId !== 0) {
            writer.uint32(8).uint32(message.perpetualId);
        }
        return writer;
    },
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseQueryGetWithdrawalAndTransfersBlockedInfoRequest();
        message.perpetualId = object.perpetualId ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryGetWithdrawalAndTransfersBlockedInfoRequest();
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryGetWithdrawalAndTransfersBlockedInfoRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryGetWithdrawalAndTransfersBlockedInfoRequest.decode(message.value);
    },
    toProto(message) {
        return QueryGetWithdrawalAndTransfersBlockedInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoRequest",
            value: QueryGetWithdrawalAndTransfersBlockedInfoRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryGetWithdrawalAndTransfersBlockedInfoRequest.typeUrl, QueryGetWithdrawalAndTransfersBlockedInfoRequest);
function createBaseQueryGetWithdrawalAndTransfersBlockedInfoResponse() {
    return {
        negativeTncSubaccountSeenAtBlock: 0,
        chainOutageSeenAtBlock: 0,
        withdrawalsAndTransfersUnblockedAtBlock: 0
    };
}
export const QueryGetWithdrawalAndTransfersBlockedInfoResponse = {
    typeUrl: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoResponse",
    is(o) {
        return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoResponse.typeUrl || typeof o.negativeTncSubaccountSeenAtBlock === "number" && typeof o.chainOutageSeenAtBlock === "number" && typeof o.withdrawalsAndTransfersUnblockedAtBlock === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoResponse.typeUrl || typeof o.negative_tnc_subaccount_seen_at_block === "number" && typeof o.chain_outage_seen_at_block === "number" && typeof o.withdrawals_and_transfers_unblocked_at_block === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryGetWithdrawalAndTransfersBlockedInfoResponse.typeUrl || typeof o.negative_tnc_subaccount_seen_at_block === "number" && typeof o.chain_outage_seen_at_block === "number" && typeof o.withdrawals_and_transfers_unblocked_at_block === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
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
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseQueryGetWithdrawalAndTransfersBlockedInfoResponse();
        message.negativeTncSubaccountSeenAtBlock = object.negativeTncSubaccountSeenAtBlock ?? 0;
        message.chainOutageSeenAtBlock = object.chainOutageSeenAtBlock ?? 0;
        message.withdrawalsAndTransfersUnblockedAtBlock = object.withdrawalsAndTransfersUnblockedAtBlock ?? 0;
        return message;
    },
    fromAmino(object) {
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
    toAmino(message) {
        const obj = {};
        obj.negative_tnc_subaccount_seen_at_block = message.negativeTncSubaccountSeenAtBlock === 0 ? undefined : message.negativeTncSubaccountSeenAtBlock;
        obj.chain_outage_seen_at_block = message.chainOutageSeenAtBlock === 0 ? undefined : message.chainOutageSeenAtBlock;
        obj.withdrawals_and_transfers_unblocked_at_block = message.withdrawalsAndTransfersUnblockedAtBlock === 0 ? undefined : message.withdrawalsAndTransfersUnblockedAtBlock;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryGetWithdrawalAndTransfersBlockedInfoResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryGetWithdrawalAndTransfersBlockedInfoResponse.decode(message.value);
    },
    toProto(message) {
        return QueryGetWithdrawalAndTransfersBlockedInfoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.QueryGetWithdrawalAndTransfersBlockedInfoResponse",
            value: QueryGetWithdrawalAndTransfersBlockedInfoResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryGetWithdrawalAndTransfersBlockedInfoResponse.typeUrl, QueryGetWithdrawalAndTransfersBlockedInfoResponse);
function createBaseQueryCollateralPoolAddressRequest() {
    return {
        perpetualId: 0
    };
}
export const QueryCollateralPoolAddressRequest = {
    typeUrl: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressRequest",
    is(o) {
        return o && (o.$typeUrl === QueryCollateralPoolAddressRequest.typeUrl || typeof o.perpetualId === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryCollateralPoolAddressRequest.typeUrl || typeof o.perpetual_id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryCollateralPoolAddressRequest.typeUrl || typeof o.perpetual_id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.perpetualId !== 0) {
            writer.uint32(8).uint32(message.perpetualId);
        }
        return writer;
    },
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseQueryCollateralPoolAddressRequest();
        message.perpetualId = object.perpetualId ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryCollateralPoolAddressRequest();
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryCollateralPoolAddressRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryCollateralPoolAddressRequest.decode(message.value);
    },
    toProto(message) {
        return QueryCollateralPoolAddressRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressRequest",
            value: QueryCollateralPoolAddressRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryCollateralPoolAddressRequest.typeUrl, QueryCollateralPoolAddressRequest);
function createBaseQueryCollateralPoolAddressResponse() {
    return {
        collateralPoolAddress: ""
    };
}
export const QueryCollateralPoolAddressResponse = {
    typeUrl: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressResponse",
    is(o) {
        return o && (o.$typeUrl === QueryCollateralPoolAddressResponse.typeUrl || typeof o.collateralPoolAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryCollateralPoolAddressResponse.typeUrl || typeof o.collateral_pool_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryCollateralPoolAddressResponse.typeUrl || typeof o.collateral_pool_address === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.collateralPoolAddress !== "") {
            writer.uint32(10).string(message.collateralPoolAddress);
        }
        return writer;
    },
    decode(input, length) {
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
    fromPartial(object) {
        const message = createBaseQueryCollateralPoolAddressResponse();
        message.collateralPoolAddress = object.collateralPoolAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryCollateralPoolAddressResponse();
        if (object.collateral_pool_address !== undefined && object.collateral_pool_address !== null) {
            message.collateralPoolAddress = object.collateral_pool_address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.collateral_pool_address = message.collateralPoolAddress === "" ? undefined : message.collateralPoolAddress;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryCollateralPoolAddressResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryCollateralPoolAddressResponse.decode(message.value);
    },
    toProto(message) {
        return QueryCollateralPoolAddressResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.subaccounts.QueryCollateralPoolAddressResponse",
            value: QueryCollateralPoolAddressResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryCollateralPoolAddressResponse.typeUrl, QueryCollateralPoolAddressResponse);
