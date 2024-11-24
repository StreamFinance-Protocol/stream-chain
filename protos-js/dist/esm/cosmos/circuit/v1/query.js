//@ts-nocheck
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Permissions, GenesisAccountPermissions } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
function createBaseQueryAccountRequest() {
    return {
        address: ""
    };
}
export const QueryAccountRequest = {
    typeUrl: "/cosmos.circuit.v1.QueryAccountRequest",
    aminoType: "cosmos-sdk/QueryAccountRequest",
    is(o) {
        return o && (o.$typeUrl === QueryAccountRequest.typeUrl || typeof o.address === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAccountRequest.typeUrl || typeof o.address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAccountRequest.typeUrl || typeof o.address === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAccountRequest();
        message.address = object.address ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAccountRequest();
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address = message.address === "" ? undefined : message.address;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAccountRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAccountRequest",
            value: QueryAccountRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryAccountRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAccountRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.QueryAccountRequest",
            value: QueryAccountRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAccountRequest.typeUrl, QueryAccountRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountRequest.aminoType, QueryAccountRequest.typeUrl);
function createBaseAccountResponse() {
    return {
        permission: undefined
    };
}
export const AccountResponse = {
    typeUrl: "/cosmos.circuit.v1.AccountResponse",
    aminoType: "cosmos-sdk/AccountResponse",
    is(o) {
        return o && o.$typeUrl === AccountResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === AccountResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === AccountResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.permission !== undefined) {
            Permissions.encode(message.permission, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAccountResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.permission = Permissions.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAccountResponse();
        message.permission = object.permission !== undefined && object.permission !== null ? Permissions.fromPartial(object.permission) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseAccountResponse();
        if (object.permission !== undefined && object.permission !== null) {
            message.permission = Permissions.fromAmino(object.permission);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.permission = message.permission ? Permissions.toAmino(message.permission) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return AccountResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/AccountResponse",
            value: AccountResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return AccountResponse.decode(message.value);
    },
    toProto(message) {
        return AccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.AccountResponse",
            value: AccountResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AccountResponse.typeUrl, AccountResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(AccountResponse.aminoType, AccountResponse.typeUrl);
function createBaseQueryAccountsRequest() {
    return {
        pagination: undefined
    };
}
export const QueryAccountsRequest = {
    typeUrl: "/cosmos.circuit.v1.QueryAccountsRequest",
    aminoType: "cosmos-sdk/QueryAccountsRequest",
    is(o) {
        return o && o.$typeUrl === QueryAccountsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAccountsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAccountsRequest.typeUrl;
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
        const message = createBaseQueryAccountsRequest();
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
        const message = createBaseQueryAccountsRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAccountsRequest();
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
        return QueryAccountsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAccountsRequest",
            value: QueryAccountsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryAccountsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAccountsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.QueryAccountsRequest",
            value: QueryAccountsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAccountsRequest.typeUrl, QueryAccountsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountsRequest.aminoType, QueryAccountsRequest.typeUrl);
function createBaseAccountsResponse() {
    return {
        accounts: [],
        pagination: undefined
    };
}
export const AccountsResponse = {
    typeUrl: "/cosmos.circuit.v1.AccountsResponse",
    aminoType: "cosmos-sdk/AccountsResponse",
    is(o) {
        return o && (o.$typeUrl === AccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || GenesisAccountPermissions.is(o.accounts[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === AccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || GenesisAccountPermissions.isSDK(o.accounts[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === AccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || GenesisAccountPermissions.isAmino(o.accounts[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.accounts) {
            GenesisAccountPermissions.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAccountsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accounts.push(GenesisAccountPermissions.decode(reader, reader.uint32()));
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
        const message = createBaseAccountsResponse();
        message.accounts = object.accounts?.map(e => GenesisAccountPermissions.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseAccountsResponse();
        message.accounts = object.accounts?.map(e => GenesisAccountPermissions.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.accounts) {
            obj.accounts = message.accounts.map(e => e ? GenesisAccountPermissions.toAmino(e) : undefined);
        }
        else {
            obj.accounts = message.accounts;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return AccountsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/AccountsResponse",
            value: AccountsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return AccountsResponse.decode(message.value);
    },
    toProto(message) {
        return AccountsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.AccountsResponse",
            value: AccountsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AccountsResponse.typeUrl, AccountsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(AccountsResponse.aminoType, AccountsResponse.typeUrl);
function createBaseQueryDisabledListRequest() {
    return {};
}
export const QueryDisabledListRequest = {
    typeUrl: "/cosmos.circuit.v1.QueryDisabledListRequest",
    aminoType: "cosmos-sdk/QueryDisabledListRequest",
    is(o) {
        return o && o.$typeUrl === QueryDisabledListRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryDisabledListRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryDisabledListRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDisabledListRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseQueryDisabledListRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryDisabledListRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryDisabledListRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDisabledListRequest",
            value: QueryDisabledListRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryDisabledListRequest.decode(message.value);
    },
    toProto(message) {
        return QueryDisabledListRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.QueryDisabledListRequest",
            value: QueryDisabledListRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryDisabledListRequest.typeUrl, QueryDisabledListRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDisabledListRequest.aminoType, QueryDisabledListRequest.typeUrl);
function createBaseDisabledListResponse() {
    return {
        disabledList: []
    };
}
export const DisabledListResponse = {
    typeUrl: "/cosmos.circuit.v1.DisabledListResponse",
    aminoType: "cosmos-sdk/DisabledListResponse",
    is(o) {
        return o && (o.$typeUrl === DisabledListResponse.typeUrl || Array.isArray(o.disabledList) && (!o.disabledList.length || typeof o.disabledList[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === DisabledListResponse.typeUrl || Array.isArray(o.disabled_list) && (!o.disabled_list.length || typeof o.disabled_list[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === DisabledListResponse.typeUrl || Array.isArray(o.disabled_list) && (!o.disabled_list.length || typeof o.disabled_list[0] === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.disabledList) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDisabledListResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.disabledList.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDisabledListResponse();
        message.disabledList = object.disabledList?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseDisabledListResponse();
        message.disabledList = object.disabled_list?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.disabledList) {
            obj.disabled_list = message.disabledList.map(e => e);
        }
        else {
            obj.disabled_list = message.disabledList;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return DisabledListResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/DisabledListResponse",
            value: DisabledListResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return DisabledListResponse.decode(message.value);
    },
    toProto(message) {
        return DisabledListResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.DisabledListResponse",
            value: DisabledListResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(DisabledListResponse.typeUrl, DisabledListResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(DisabledListResponse.aminoType, DisabledListResponse.typeUrl);
