"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisabledListResponse = exports.QueryDisabledListRequest = exports.AccountsResponse = exports.QueryAccountsRequest = exports.AccountResponse = exports.QueryAccountRequest = void 0;
//@ts-nocheck
const pagination_1 = require("../../base/query/v1beta1/pagination");
const types_1 = require("./types");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
function createBaseQueryAccountRequest() {
    return {
        address: ""
    };
}
exports.QueryAccountRequest = {
    typeUrl: "/cosmos.circuit.v1.QueryAccountRequest",
    aminoType: "cosmos-sdk/QueryAccountRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryAccountRequest.typeUrl || typeof o.address === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryAccountRequest.typeUrl || typeof o.address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryAccountRequest.typeUrl || typeof o.address === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryAccountRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAccountRequest",
            value: exports.QueryAccountRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryAccountRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAccountRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.QueryAccountRequest",
            value: exports.QueryAccountRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAccountRequest.typeUrl, exports.QueryAccountRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryAccountRequest.aminoType, exports.QueryAccountRequest.typeUrl);
function createBaseAccountResponse() {
    return {
        permission: undefined
    };
}
exports.AccountResponse = {
    typeUrl: "/cosmos.circuit.v1.AccountResponse",
    aminoType: "cosmos-sdk/AccountResponse",
    is(o) {
        return o && o.$typeUrl === exports.AccountResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.AccountResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.AccountResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.permission !== undefined) {
            types_1.Permissions.encode(message.permission, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAccountResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.permission = types_1.Permissions.decode(reader, reader.uint32());
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
        message.permission = object.permission !== undefined && object.permission !== null ? types_1.Permissions.fromPartial(object.permission) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseAccountResponse();
        if (object.permission !== undefined && object.permission !== null) {
            message.permission = types_1.Permissions.fromAmino(object.permission);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.permission = message.permission ? types_1.Permissions.toAmino(message.permission) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.AccountResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/AccountResponse",
            value: exports.AccountResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.AccountResponse.decode(message.value);
    },
    toProto(message) {
        return exports.AccountResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.AccountResponse",
            value: exports.AccountResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.AccountResponse.typeUrl, exports.AccountResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.AccountResponse.aminoType, exports.AccountResponse.typeUrl);
function createBaseQueryAccountsRequest() {
    return {
        pagination: undefined
    };
}
exports.QueryAccountsRequest = {
    typeUrl: "/cosmos.circuit.v1.QueryAccountsRequest",
    aminoType: "cosmos-sdk/QueryAccountsRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryAccountsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryAccountsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryAccountsRequest.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
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
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAccountsRequest();
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAccountsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAccountsRequest",
            value: exports.QueryAccountsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryAccountsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAccountsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.QueryAccountsRequest",
            value: exports.QueryAccountsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAccountsRequest.typeUrl, exports.QueryAccountsRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryAccountsRequest.aminoType, exports.QueryAccountsRequest.typeUrl);
function createBaseAccountsResponse() {
    return {
        accounts: [],
        pagination: undefined
    };
}
exports.AccountsResponse = {
    typeUrl: "/cosmos.circuit.v1.AccountsResponse",
    aminoType: "cosmos-sdk/AccountsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.AccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || types_1.GenesisAccountPermissions.is(o.accounts[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.AccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || types_1.GenesisAccountPermissions.isSDK(o.accounts[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.AccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || types_1.GenesisAccountPermissions.isAmino(o.accounts[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.accounts) {
            types_1.GenesisAccountPermissions.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAccountsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accounts.push(types_1.GenesisAccountPermissions.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
        message.accounts = object.accounts?.map(e => types_1.GenesisAccountPermissions.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseAccountsResponse();
        message.accounts = object.accounts?.map(e => types_1.GenesisAccountPermissions.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.accounts) {
            obj.accounts = message.accounts.map(e => e ? types_1.GenesisAccountPermissions.toAmino(e) : undefined);
        }
        else {
            obj.accounts = message.accounts;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.AccountsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/AccountsResponse",
            value: exports.AccountsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.AccountsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.AccountsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.AccountsResponse",
            value: exports.AccountsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.AccountsResponse.typeUrl, exports.AccountsResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.AccountsResponse.aminoType, exports.AccountsResponse.typeUrl);
function createBaseQueryDisabledListRequest() {
    return {};
}
exports.QueryDisabledListRequest = {
    typeUrl: "/cosmos.circuit.v1.QueryDisabledListRequest",
    aminoType: "cosmos-sdk/QueryDisabledListRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryDisabledListRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryDisabledListRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryDisabledListRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryDisabledListRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDisabledListRequest",
            value: exports.QueryDisabledListRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDisabledListRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDisabledListRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.QueryDisabledListRequest",
            value: exports.QueryDisabledListRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDisabledListRequest.typeUrl, exports.QueryDisabledListRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDisabledListRequest.aminoType, exports.QueryDisabledListRequest.typeUrl);
function createBaseDisabledListResponse() {
    return {
        disabledList: []
    };
}
exports.DisabledListResponse = {
    typeUrl: "/cosmos.circuit.v1.DisabledListResponse",
    aminoType: "cosmos-sdk/DisabledListResponse",
    is(o) {
        return o && (o.$typeUrl === exports.DisabledListResponse.typeUrl || Array.isArray(o.disabledList) && (!o.disabledList.length || typeof o.disabledList[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.DisabledListResponse.typeUrl || Array.isArray(o.disabled_list) && (!o.disabled_list.length || typeof o.disabled_list[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.DisabledListResponse.typeUrl || Array.isArray(o.disabled_list) && (!o.disabled_list.length || typeof o.disabled_list[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.disabledList) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.DisabledListResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/DisabledListResponse",
            value: exports.DisabledListResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.DisabledListResponse.decode(message.value);
    },
    toProto(message) {
        return exports.DisabledListResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.DisabledListResponse",
            value: exports.DisabledListResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.DisabledListResponse.typeUrl, exports.DisabledListResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.DisabledListResponse.aminoType, exports.DisabledListResponse.typeUrl);
