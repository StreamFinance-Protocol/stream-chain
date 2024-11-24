//@ts-nocheck
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Any } from "../../../google/protobuf/any";
import { Params, BaseAccount, ModuleAccount } from "./auth";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
function createBaseQueryAccountsRequest() {
    return {
        pagination: undefined
    };
}
export const QueryAccountsRequest = {
    typeUrl: "/cosmos.auth.v1beta1.QueryAccountsRequest",
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
            typeUrl: "/cosmos.auth.v1beta1.QueryAccountsRequest",
            value: QueryAccountsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAccountsRequest.typeUrl, QueryAccountsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountsRequest.aminoType, QueryAccountsRequest.typeUrl);
function createBaseQueryAccountsResponse() {
    return {
        accounts: [],
        pagination: undefined
    };
}
export const QueryAccountsResponse = {
    typeUrl: "/cosmos.auth.v1beta1.QueryAccountsResponse",
    aminoType: "cosmos-sdk/QueryAccountsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryAccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || BaseAccount.is(o.accounts[0]) || Any.is(o.accounts[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || BaseAccount.isSDK(o.accounts[0]) || Any.isSDK(o.accounts[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || BaseAccount.isAmino(o.accounts[0]) || Any.isAmino(o.accounts[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.accounts) {
            Any.encode(GlobalDecoderRegistry.wrapAny(v), writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accounts.push(GlobalDecoderRegistry.unwrapAny(reader));
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
        const message = createBaseQueryAccountsResponse();
        message.accounts = object.accounts?.map(e => GlobalDecoderRegistry.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAccountsResponse();
        message.accounts = object.accounts?.map(e => GlobalDecoderRegistry.fromAminoMsg(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.accounts) {
            obj.accounts = message.accounts.map(e => e ? GlobalDecoderRegistry.toAminoMsg(e) : undefined);
        }
        else {
            obj.accounts = message.accounts;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAccountsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAccountsResponse",
            value: QueryAccountsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryAccountsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAccountsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryAccountsResponse",
            value: QueryAccountsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAccountsResponse.typeUrl, QueryAccountsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountsResponse.aminoType, QueryAccountsResponse.typeUrl);
function createBaseQueryAccountRequest() {
    return {
        address: ""
    };
}
export const QueryAccountRequest = {
    typeUrl: "/cosmos.auth.v1beta1.QueryAccountRequest",
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
            typeUrl: "/cosmos.auth.v1beta1.QueryAccountRequest",
            value: QueryAccountRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAccountRequest.typeUrl, QueryAccountRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountRequest.aminoType, QueryAccountRequest.typeUrl);
function createBaseQueryAccountResponse() {
    return {
        account: undefined
    };
}
export const QueryAccountResponse = {
    typeUrl: "/cosmos.auth.v1beta1.QueryAccountResponse",
    aminoType: "cosmos-sdk/QueryAccountResponse",
    is(o) {
        return o && o.$typeUrl === QueryAccountResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAccountResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAccountResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.account !== undefined) {
            Any.encode(GlobalDecoderRegistry.wrapAny(message.account), writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.account = GlobalDecoderRegistry.unwrapAny(reader);
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAccountResponse();
        message.account = object.account !== undefined && object.account !== null ? GlobalDecoderRegistry.fromPartial(object.account) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAccountResponse();
        if (object.account !== undefined && object.account !== null) {
            message.account = GlobalDecoderRegistry.fromAminoMsg(object.account);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.account = message.account ? GlobalDecoderRegistry.toAminoMsg(message.account) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAccountResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAccountResponse",
            value: QueryAccountResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryAccountResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryAccountResponse",
            value: QueryAccountResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAccountResponse.typeUrl, QueryAccountResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountResponse.aminoType, QueryAccountResponse.typeUrl);
function createBaseQueryParamsRequest() {
    return {};
}
export const QueryParamsRequest = {
    typeUrl: "/cosmos.auth.v1beta1.QueryParamsRequest",
    aminoType: "cosmos-sdk/QueryParamsRequest",
    is(o) {
        return o && o.$typeUrl === QueryParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryParamsRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
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
        const message = createBaseQueryParamsRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryParamsRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryParamsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryParamsRequest",
            value: QueryParamsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryParamsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryParamsRequest",
            value: QueryParamsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryParamsRequest.typeUrl, QueryParamsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryParamsRequest.aminoType, QueryParamsRequest.typeUrl);
function createBaseQueryParamsResponse() {
    return {
        params: Params.fromPartial({})
    };
}
export const QueryParamsResponse = {
    typeUrl: "/cosmos.auth.v1beta1.QueryParamsResponse",
    aminoType: "cosmos-sdk/QueryParamsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryParamsResponse();
        message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryParamsResponse();
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? Params.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryParamsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryParamsResponse",
            value: QueryParamsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryParamsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryParamsResponse",
            value: QueryParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryParamsResponse.typeUrl, QueryParamsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryParamsResponse.aminoType, QueryParamsResponse.typeUrl);
function createBaseQueryModuleAccountsRequest() {
    return {};
}
export const QueryModuleAccountsRequest = {
    typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountsRequest",
    aminoType: "cosmos-sdk/QueryModuleAccountsRequest",
    is(o) {
        return o && o.$typeUrl === QueryModuleAccountsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryModuleAccountsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryModuleAccountsRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryModuleAccountsRequest();
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
        const message = createBaseQueryModuleAccountsRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryModuleAccountsRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryModuleAccountsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryModuleAccountsRequest",
            value: QueryModuleAccountsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryModuleAccountsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryModuleAccountsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountsRequest",
            value: QueryModuleAccountsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryModuleAccountsRequest.typeUrl, QueryModuleAccountsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryModuleAccountsRequest.aminoType, QueryModuleAccountsRequest.typeUrl);
function createBaseQueryModuleAccountsResponse() {
    return {
        accounts: []
    };
}
export const QueryModuleAccountsResponse = {
    typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountsResponse",
    aminoType: "cosmos-sdk/QueryModuleAccountsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryModuleAccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || ModuleAccount.is(o.accounts[0]) || Any.is(o.accounts[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryModuleAccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || ModuleAccount.isSDK(o.accounts[0]) || Any.isSDK(o.accounts[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryModuleAccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || ModuleAccount.isAmino(o.accounts[0]) || Any.isAmino(o.accounts[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.accounts) {
            Any.encode(GlobalDecoderRegistry.wrapAny(v), writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryModuleAccountsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accounts.push(GlobalDecoderRegistry.unwrapAny(reader));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryModuleAccountsResponse();
        message.accounts = object.accounts?.map(e => GlobalDecoderRegistry.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryModuleAccountsResponse();
        message.accounts = object.accounts?.map(e => GlobalDecoderRegistry.fromAminoMsg(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.accounts) {
            obj.accounts = message.accounts.map(e => e ? GlobalDecoderRegistry.toAminoMsg(e) : undefined);
        }
        else {
            obj.accounts = message.accounts;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return QueryModuleAccountsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryModuleAccountsResponse",
            value: QueryModuleAccountsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryModuleAccountsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryModuleAccountsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountsResponse",
            value: QueryModuleAccountsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryModuleAccountsResponse.typeUrl, QueryModuleAccountsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryModuleAccountsResponse.aminoType, QueryModuleAccountsResponse.typeUrl);
function createBaseQueryModuleAccountByNameRequest() {
    return {
        name: ""
    };
}
export const QueryModuleAccountByNameRequest = {
    typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountByNameRequest",
    aminoType: "cosmos-sdk/QueryModuleAccountByNameRequest",
    is(o) {
        return o && (o.$typeUrl === QueryModuleAccountByNameRequest.typeUrl || typeof o.name === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryModuleAccountByNameRequest.typeUrl || typeof o.name === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryModuleAccountByNameRequest.typeUrl || typeof o.name === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryModuleAccountByNameRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryModuleAccountByNameRequest();
        message.name = object.name ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryModuleAccountByNameRequest();
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.name = message.name === "" ? undefined : message.name;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryModuleAccountByNameRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryModuleAccountByNameRequest",
            value: QueryModuleAccountByNameRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryModuleAccountByNameRequest.decode(message.value);
    },
    toProto(message) {
        return QueryModuleAccountByNameRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountByNameRequest",
            value: QueryModuleAccountByNameRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryModuleAccountByNameRequest.typeUrl, QueryModuleAccountByNameRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryModuleAccountByNameRequest.aminoType, QueryModuleAccountByNameRequest.typeUrl);
function createBaseQueryModuleAccountByNameResponse() {
    return {
        account: undefined
    };
}
export const QueryModuleAccountByNameResponse = {
    typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountByNameResponse",
    aminoType: "cosmos-sdk/QueryModuleAccountByNameResponse",
    is(o) {
        return o && o.$typeUrl === QueryModuleAccountByNameResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryModuleAccountByNameResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryModuleAccountByNameResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.account !== undefined) {
            Any.encode(GlobalDecoderRegistry.wrapAny(message.account), writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryModuleAccountByNameResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.account = GlobalDecoderRegistry.unwrapAny(reader);
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryModuleAccountByNameResponse();
        message.account = object.account !== undefined && object.account !== null ? GlobalDecoderRegistry.fromPartial(object.account) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryModuleAccountByNameResponse();
        if (object.account !== undefined && object.account !== null) {
            message.account = GlobalDecoderRegistry.fromAminoMsg(object.account);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.account = message.account ? GlobalDecoderRegistry.toAminoMsg(message.account) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryModuleAccountByNameResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryModuleAccountByNameResponse",
            value: QueryModuleAccountByNameResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryModuleAccountByNameResponse.decode(message.value);
    },
    toProto(message) {
        return QueryModuleAccountByNameResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountByNameResponse",
            value: QueryModuleAccountByNameResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryModuleAccountByNameResponse.typeUrl, QueryModuleAccountByNameResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryModuleAccountByNameResponse.aminoType, QueryModuleAccountByNameResponse.typeUrl);
function createBaseBech32PrefixRequest() {
    return {};
}
export const Bech32PrefixRequest = {
    typeUrl: "/cosmos.auth.v1beta1.Bech32PrefixRequest",
    aminoType: "cosmos-sdk/Bech32PrefixRequest",
    is(o) {
        return o && o.$typeUrl === Bech32PrefixRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === Bech32PrefixRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === Bech32PrefixRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBech32PrefixRequest();
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
        const message = createBaseBech32PrefixRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseBech32PrefixRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return Bech32PrefixRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Bech32PrefixRequest",
            value: Bech32PrefixRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Bech32PrefixRequest.decode(message.value);
    },
    toProto(message) {
        return Bech32PrefixRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.Bech32PrefixRequest",
            value: Bech32PrefixRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Bech32PrefixRequest.typeUrl, Bech32PrefixRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(Bech32PrefixRequest.aminoType, Bech32PrefixRequest.typeUrl);
function createBaseBech32PrefixResponse() {
    return {
        bech32Prefix: ""
    };
}
export const Bech32PrefixResponse = {
    typeUrl: "/cosmos.auth.v1beta1.Bech32PrefixResponse",
    aminoType: "cosmos-sdk/Bech32PrefixResponse",
    is(o) {
        return o && (o.$typeUrl === Bech32PrefixResponse.typeUrl || typeof o.bech32Prefix === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Bech32PrefixResponse.typeUrl || typeof o.bech32_prefix === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Bech32PrefixResponse.typeUrl || typeof o.bech32_prefix === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.bech32Prefix !== "") {
            writer.uint32(10).string(message.bech32Prefix);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBech32PrefixResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bech32Prefix = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseBech32PrefixResponse();
        message.bech32Prefix = object.bech32Prefix ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseBech32PrefixResponse();
        if (object.bech32_prefix !== undefined && object.bech32_prefix !== null) {
            message.bech32Prefix = object.bech32_prefix;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.bech32_prefix = message.bech32Prefix === "" ? undefined : message.bech32Prefix;
        return obj;
    },
    fromAminoMsg(object) {
        return Bech32PrefixResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Bech32PrefixResponse",
            value: Bech32PrefixResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Bech32PrefixResponse.decode(message.value);
    },
    toProto(message) {
        return Bech32PrefixResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.Bech32PrefixResponse",
            value: Bech32PrefixResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Bech32PrefixResponse.typeUrl, Bech32PrefixResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(Bech32PrefixResponse.aminoType, Bech32PrefixResponse.typeUrl);
function createBaseAddressBytesToStringRequest() {
    return {
        addressBytes: new Uint8Array()
    };
}
export const AddressBytesToStringRequest = {
    typeUrl: "/cosmos.auth.v1beta1.AddressBytesToStringRequest",
    aminoType: "cosmos-sdk/AddressBytesToStringRequest",
    is(o) {
        return o && (o.$typeUrl === AddressBytesToStringRequest.typeUrl || o.addressBytes instanceof Uint8Array || typeof o.addressBytes === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === AddressBytesToStringRequest.typeUrl || o.address_bytes instanceof Uint8Array || typeof o.address_bytes === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === AddressBytesToStringRequest.typeUrl || o.address_bytes instanceof Uint8Array || typeof o.address_bytes === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.addressBytes.length !== 0) {
            writer.uint32(10).bytes(message.addressBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddressBytesToStringRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.addressBytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAddressBytesToStringRequest();
        message.addressBytes = object.addressBytes ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseAddressBytesToStringRequest();
        if (object.address_bytes !== undefined && object.address_bytes !== null) {
            message.addressBytes = bytesFromBase64(object.address_bytes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address_bytes = message.addressBytes ? base64FromBytes(message.addressBytes) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return AddressBytesToStringRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/AddressBytesToStringRequest",
            value: AddressBytesToStringRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return AddressBytesToStringRequest.decode(message.value);
    },
    toProto(message) {
        return AddressBytesToStringRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.AddressBytesToStringRequest",
            value: AddressBytesToStringRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AddressBytesToStringRequest.typeUrl, AddressBytesToStringRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(AddressBytesToStringRequest.aminoType, AddressBytesToStringRequest.typeUrl);
function createBaseAddressBytesToStringResponse() {
    return {
        addressString: ""
    };
}
export const AddressBytesToStringResponse = {
    typeUrl: "/cosmos.auth.v1beta1.AddressBytesToStringResponse",
    aminoType: "cosmos-sdk/AddressBytesToStringResponse",
    is(o) {
        return o && (o.$typeUrl === AddressBytesToStringResponse.typeUrl || typeof o.addressString === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === AddressBytesToStringResponse.typeUrl || typeof o.address_string === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === AddressBytesToStringResponse.typeUrl || typeof o.address_string === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.addressString !== "") {
            writer.uint32(10).string(message.addressString);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddressBytesToStringResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.addressString = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAddressBytesToStringResponse();
        message.addressString = object.addressString ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseAddressBytesToStringResponse();
        if (object.address_string !== undefined && object.address_string !== null) {
            message.addressString = object.address_string;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address_string = message.addressString === "" ? undefined : message.addressString;
        return obj;
    },
    fromAminoMsg(object) {
        return AddressBytesToStringResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/AddressBytesToStringResponse",
            value: AddressBytesToStringResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return AddressBytesToStringResponse.decode(message.value);
    },
    toProto(message) {
        return AddressBytesToStringResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.AddressBytesToStringResponse",
            value: AddressBytesToStringResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AddressBytesToStringResponse.typeUrl, AddressBytesToStringResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(AddressBytesToStringResponse.aminoType, AddressBytesToStringResponse.typeUrl);
function createBaseAddressStringToBytesRequest() {
    return {
        addressString: ""
    };
}
export const AddressStringToBytesRequest = {
    typeUrl: "/cosmos.auth.v1beta1.AddressStringToBytesRequest",
    aminoType: "cosmos-sdk/AddressStringToBytesRequest",
    is(o) {
        return o && (o.$typeUrl === AddressStringToBytesRequest.typeUrl || typeof o.addressString === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === AddressStringToBytesRequest.typeUrl || typeof o.address_string === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === AddressStringToBytesRequest.typeUrl || typeof o.address_string === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.addressString !== "") {
            writer.uint32(10).string(message.addressString);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddressStringToBytesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.addressString = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAddressStringToBytesRequest();
        message.addressString = object.addressString ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseAddressStringToBytesRequest();
        if (object.address_string !== undefined && object.address_string !== null) {
            message.addressString = object.address_string;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address_string = message.addressString === "" ? undefined : message.addressString;
        return obj;
    },
    fromAminoMsg(object) {
        return AddressStringToBytesRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/AddressStringToBytesRequest",
            value: AddressStringToBytesRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return AddressStringToBytesRequest.decode(message.value);
    },
    toProto(message) {
        return AddressStringToBytesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.AddressStringToBytesRequest",
            value: AddressStringToBytesRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AddressStringToBytesRequest.typeUrl, AddressStringToBytesRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(AddressStringToBytesRequest.aminoType, AddressStringToBytesRequest.typeUrl);
function createBaseAddressStringToBytesResponse() {
    return {
        addressBytes: new Uint8Array()
    };
}
export const AddressStringToBytesResponse = {
    typeUrl: "/cosmos.auth.v1beta1.AddressStringToBytesResponse",
    aminoType: "cosmos-sdk/AddressStringToBytesResponse",
    is(o) {
        return o && (o.$typeUrl === AddressStringToBytesResponse.typeUrl || o.addressBytes instanceof Uint8Array || typeof o.addressBytes === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === AddressStringToBytesResponse.typeUrl || o.address_bytes instanceof Uint8Array || typeof o.address_bytes === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === AddressStringToBytesResponse.typeUrl || o.address_bytes instanceof Uint8Array || typeof o.address_bytes === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.addressBytes.length !== 0) {
            writer.uint32(10).bytes(message.addressBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddressStringToBytesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.addressBytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAddressStringToBytesResponse();
        message.addressBytes = object.addressBytes ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseAddressStringToBytesResponse();
        if (object.address_bytes !== undefined && object.address_bytes !== null) {
            message.addressBytes = bytesFromBase64(object.address_bytes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address_bytes = message.addressBytes ? base64FromBytes(message.addressBytes) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return AddressStringToBytesResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/AddressStringToBytesResponse",
            value: AddressStringToBytesResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return AddressStringToBytesResponse.decode(message.value);
    },
    toProto(message) {
        return AddressStringToBytesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.AddressStringToBytesResponse",
            value: AddressStringToBytesResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AddressStringToBytesResponse.typeUrl, AddressStringToBytesResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(AddressStringToBytesResponse.aminoType, AddressStringToBytesResponse.typeUrl);
function createBaseQueryAccountAddressByIDRequest() {
    return {
        id: BigInt(0),
        accountId: BigInt(0)
    };
}
export const QueryAccountAddressByIDRequest = {
    typeUrl: "/cosmos.auth.v1beta1.QueryAccountAddressByIDRequest",
    aminoType: "cosmos-sdk/QueryAccountAddressByIDRequest",
    is(o) {
        return o && (o.$typeUrl === QueryAccountAddressByIDRequest.typeUrl || typeof o.id === "bigint" && typeof o.accountId === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAccountAddressByIDRequest.typeUrl || typeof o.id === "bigint" && typeof o.account_id === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAccountAddressByIDRequest.typeUrl || typeof o.id === "bigint" && typeof o.account_id === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== BigInt(0)) {
            writer.uint32(8).int64(message.id);
        }
        if (message.accountId !== BigInt(0)) {
            writer.uint32(16).uint64(message.accountId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountAddressByIDRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.int64();
                    break;
                case 2:
                    message.accountId = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAccountAddressByIDRequest();
        message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
        message.accountId = object.accountId !== undefined && object.accountId !== null ? BigInt(object.accountId.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAccountAddressByIDRequest();
        if (object.id !== undefined && object.id !== null) {
            message.id = BigInt(object.id);
        }
        if (object.account_id !== undefined && object.account_id !== null) {
            message.accountId = BigInt(object.account_id);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id !== BigInt(0) ? message.id?.toString() : undefined;
        obj.account_id = message.accountId !== BigInt(0) ? message.accountId?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAccountAddressByIDRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAccountAddressByIDRequest",
            value: QueryAccountAddressByIDRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryAccountAddressByIDRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAccountAddressByIDRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryAccountAddressByIDRequest",
            value: QueryAccountAddressByIDRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAccountAddressByIDRequest.typeUrl, QueryAccountAddressByIDRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountAddressByIDRequest.aminoType, QueryAccountAddressByIDRequest.typeUrl);
function createBaseQueryAccountAddressByIDResponse() {
    return {
        accountAddress: ""
    };
}
export const QueryAccountAddressByIDResponse = {
    typeUrl: "/cosmos.auth.v1beta1.QueryAccountAddressByIDResponse",
    aminoType: "cosmos-sdk/QueryAccountAddressByIDResponse",
    is(o) {
        return o && (o.$typeUrl === QueryAccountAddressByIDResponse.typeUrl || typeof o.accountAddress === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAccountAddressByIDResponse.typeUrl || typeof o.account_address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAccountAddressByIDResponse.typeUrl || typeof o.account_address === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.accountAddress !== "") {
            writer.uint32(10).string(message.accountAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountAddressByIDResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accountAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAccountAddressByIDResponse();
        message.accountAddress = object.accountAddress ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAccountAddressByIDResponse();
        if (object.account_address !== undefined && object.account_address !== null) {
            message.accountAddress = object.account_address;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.account_address = message.accountAddress === "" ? undefined : message.accountAddress;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAccountAddressByIDResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAccountAddressByIDResponse",
            value: QueryAccountAddressByIDResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryAccountAddressByIDResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAccountAddressByIDResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryAccountAddressByIDResponse",
            value: QueryAccountAddressByIDResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAccountAddressByIDResponse.typeUrl, QueryAccountAddressByIDResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountAddressByIDResponse.aminoType, QueryAccountAddressByIDResponse.typeUrl);
function createBaseQueryAccountInfoRequest() {
    return {
        address: ""
    };
}
export const QueryAccountInfoRequest = {
    typeUrl: "/cosmos.auth.v1beta1.QueryAccountInfoRequest",
    aminoType: "cosmos-sdk/QueryAccountInfoRequest",
    is(o) {
        return o && (o.$typeUrl === QueryAccountInfoRequest.typeUrl || typeof o.address === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAccountInfoRequest.typeUrl || typeof o.address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAccountInfoRequest.typeUrl || typeof o.address === "string");
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
        const message = createBaseQueryAccountInfoRequest();
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
        const message = createBaseQueryAccountInfoRequest();
        message.address = object.address ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAccountInfoRequest();
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
        return QueryAccountInfoRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAccountInfoRequest",
            value: QueryAccountInfoRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryAccountInfoRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAccountInfoRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryAccountInfoRequest",
            value: QueryAccountInfoRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAccountInfoRequest.typeUrl, QueryAccountInfoRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountInfoRequest.aminoType, QueryAccountInfoRequest.typeUrl);
function createBaseQueryAccountInfoResponse() {
    return {
        info: undefined
    };
}
export const QueryAccountInfoResponse = {
    typeUrl: "/cosmos.auth.v1beta1.QueryAccountInfoResponse",
    aminoType: "cosmos-sdk/QueryAccountInfoResponse",
    is(o) {
        return o && o.$typeUrl === QueryAccountInfoResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAccountInfoResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAccountInfoResponse.typeUrl;
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.info !== undefined) {
            BaseAccount.encode(message.info, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.info = BaseAccount.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAccountInfoResponse();
        message.info = object.info !== undefined && object.info !== null ? BaseAccount.fromPartial(object.info) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAccountInfoResponse();
        if (object.info !== undefined && object.info !== null) {
            message.info = BaseAccount.fromAmino(object.info);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.info = message.info ? BaseAccount.toAmino(message.info) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAccountInfoResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAccountInfoResponse",
            value: QueryAccountInfoResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return QueryAccountInfoResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAccountInfoResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.v1beta1.QueryAccountInfoResponse",
            value: QueryAccountInfoResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAccountInfoResponse.typeUrl, QueryAccountInfoResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountInfoResponse.aminoType, QueryAccountInfoResponse.typeUrl);
