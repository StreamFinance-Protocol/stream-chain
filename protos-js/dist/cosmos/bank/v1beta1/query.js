"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySendEnabledResponse = exports.QuerySendEnabledRequest = exports.QueryDenomOwnersResponse = exports.DenomOwner = exports.QueryDenomOwnersRequest = exports.QueryDenomMetadataByQueryStringResponse = exports.QueryDenomMetadataByQueryStringRequest = exports.QueryDenomMetadataResponse = exports.QueryDenomMetadataRequest = exports.QueryDenomsMetadataResponse = exports.QueryDenomsMetadataRequest = exports.QueryParamsResponse = exports.QueryParamsRequest = exports.QuerySupplyOfResponse = exports.QuerySupplyOfRequest = exports.QueryTotalSupplyResponse = exports.QueryTotalSupplyRequest = exports.QuerySpendableBalanceByDenomResponse = exports.QuerySpendableBalanceByDenomRequest = exports.QuerySpendableBalancesResponse = exports.QuerySpendableBalancesRequest = exports.QueryAllBalancesResponse = exports.QueryAllBalancesRequest = exports.QueryBalanceResponse = exports.QueryBalanceRequest = void 0;
//@ts-nocheck
const pagination_1 = require("../../base/query/v1beta1/pagination");
const coin_1 = require("../../base/v1beta1/coin");
const bank_1 = require("./bank");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
function createBaseQueryBalanceRequest() {
    return {
        address: "",
        denom: ""
    };
}
exports.QueryBalanceRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QueryBalanceRequest",
    aminoType: "cosmos-sdk/QueryBalanceRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryBalanceRequest.typeUrl || typeof o.address === "string" && typeof o.denom === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryBalanceRequest.typeUrl || typeof o.address === "string" && typeof o.denom === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryBalanceRequest.typeUrl || typeof o.address === "string" && typeof o.denom === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.denom !== "") {
            writer.uint32(18).string(message.denom);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBalanceRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.denom = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryBalanceRequest();
        message.address = object.address ?? "";
        message.denom = object.denom ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryBalanceRequest();
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = object.denom;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address = message.address === "" ? undefined : message.address;
        obj.denom = message.denom === "" ? undefined : message.denom;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryBalanceRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryBalanceRequest",
            value: exports.QueryBalanceRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryBalanceRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryBalanceRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryBalanceRequest",
            value: exports.QueryBalanceRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryBalanceRequest.typeUrl, exports.QueryBalanceRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryBalanceRequest.aminoType, exports.QueryBalanceRequest.typeUrl);
function createBaseQueryBalanceResponse() {
    return {
        balance: undefined
    };
}
exports.QueryBalanceResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QueryBalanceResponse",
    aminoType: "cosmos-sdk/QueryBalanceResponse",
    is(o) {
        return o && o.$typeUrl === exports.QueryBalanceResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryBalanceResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryBalanceResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.balance !== undefined) {
            coin_1.Coin.encode(message.balance, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBalanceResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.balance = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryBalanceResponse();
        message.balance = object.balance !== undefined && object.balance !== null ? coin_1.Coin.fromPartial(object.balance) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryBalanceResponse();
        if (object.balance !== undefined && object.balance !== null) {
            message.balance = coin_1.Coin.fromAmino(object.balance);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.balance = message.balance ? coin_1.Coin.toAmino(message.balance) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryBalanceResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryBalanceResponse",
            value: exports.QueryBalanceResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryBalanceResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryBalanceResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryBalanceResponse",
            value: exports.QueryBalanceResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryBalanceResponse.typeUrl, exports.QueryBalanceResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryBalanceResponse.aminoType, exports.QueryBalanceResponse.typeUrl);
function createBaseQueryAllBalancesRequest() {
    return {
        address: "",
        pagination: undefined,
        resolveDenom: false
    };
}
exports.QueryAllBalancesRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QueryAllBalancesRequest",
    aminoType: "cosmos-sdk/QueryAllBalancesRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryAllBalancesRequest.typeUrl || typeof o.address === "string" && typeof o.resolveDenom === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryAllBalancesRequest.typeUrl || typeof o.address === "string" && typeof o.resolve_denom === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryAllBalancesRequest.typeUrl || typeof o.address === "string" && typeof o.resolve_denom === "boolean");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.resolveDenom === true) {
            writer.uint32(24).bool(message.resolveDenom);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllBalancesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.resolveDenom = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAllBalancesRequest();
        message.address = object.address ?? "";
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        message.resolveDenom = object.resolveDenom ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllBalancesRequest();
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        if (object.resolve_denom !== undefined && object.resolve_denom !== null) {
            message.resolveDenom = object.resolve_denom;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address = message.address === "" ? undefined : message.address;
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        obj.resolve_denom = message.resolveDenom === false ? undefined : message.resolveDenom;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllBalancesRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAllBalancesRequest",
            value: exports.QueryAllBalancesRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryAllBalancesRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllBalancesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryAllBalancesRequest",
            value: exports.QueryAllBalancesRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllBalancesRequest.typeUrl, exports.QueryAllBalancesRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryAllBalancesRequest.aminoType, exports.QueryAllBalancesRequest.typeUrl);
function createBaseQueryAllBalancesResponse() {
    return {
        balances: [],
        pagination: undefined
    };
}
exports.QueryAllBalancesResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QueryAllBalancesResponse",
    aminoType: "cosmos-sdk/QueryAllBalancesResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryAllBalancesResponse.typeUrl || Array.isArray(o.balances) && (!o.balances.length || coin_1.Coin.is(o.balances[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryAllBalancesResponse.typeUrl || Array.isArray(o.balances) && (!o.balances.length || coin_1.Coin.isSDK(o.balances[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryAllBalancesResponse.typeUrl || Array.isArray(o.balances) && (!o.balances.length || coin_1.Coin.isAmino(o.balances[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.balances) {
            coin_1.Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllBalancesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.balances.push(coin_1.Coin.decode(reader, reader.uint32()));
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
        const message = createBaseQueryAllBalancesResponse();
        message.balances = object.balances?.map(e => coin_1.Coin.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllBalancesResponse();
        message.balances = object.balances?.map(e => coin_1.Coin.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.balances) {
            obj.balances = message.balances.map(e => e ? coin_1.Coin.toAmino(e) : undefined);
        }
        else {
            obj.balances = message.balances;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllBalancesResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryAllBalancesResponse",
            value: exports.QueryAllBalancesResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryAllBalancesResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllBalancesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryAllBalancesResponse",
            value: exports.QueryAllBalancesResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllBalancesResponse.typeUrl, exports.QueryAllBalancesResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryAllBalancesResponse.aminoType, exports.QueryAllBalancesResponse.typeUrl);
function createBaseQuerySpendableBalancesRequest() {
    return {
        address: "",
        pagination: undefined
    };
}
exports.QuerySpendableBalancesRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QuerySpendableBalancesRequest",
    aminoType: "cosmos-sdk/QuerySpendableBalancesRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QuerySpendableBalancesRequest.typeUrl || typeof o.address === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QuerySpendableBalancesRequest.typeUrl || typeof o.address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QuerySpendableBalancesRequest.typeUrl || typeof o.address === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySpendableBalancesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
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
        const message = createBaseQuerySpendableBalancesRequest();
        message.address = object.address ?? "";
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQuerySpendableBalancesRequest();
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address = message.address === "" ? undefined : message.address;
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QuerySpendableBalancesRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QuerySpendableBalancesRequest",
            value: exports.QuerySpendableBalancesRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QuerySpendableBalancesRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QuerySpendableBalancesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QuerySpendableBalancesRequest",
            value: exports.QuerySpendableBalancesRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QuerySpendableBalancesRequest.typeUrl, exports.QuerySpendableBalancesRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QuerySpendableBalancesRequest.aminoType, exports.QuerySpendableBalancesRequest.typeUrl);
function createBaseQuerySpendableBalancesResponse() {
    return {
        balances: [],
        pagination: undefined
    };
}
exports.QuerySpendableBalancesResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QuerySpendableBalancesResponse",
    aminoType: "cosmos-sdk/QuerySpendableBalancesResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QuerySpendableBalancesResponse.typeUrl || Array.isArray(o.balances) && (!o.balances.length || coin_1.Coin.is(o.balances[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QuerySpendableBalancesResponse.typeUrl || Array.isArray(o.balances) && (!o.balances.length || coin_1.Coin.isSDK(o.balances[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QuerySpendableBalancesResponse.typeUrl || Array.isArray(o.balances) && (!o.balances.length || coin_1.Coin.isAmino(o.balances[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.balances) {
            coin_1.Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySpendableBalancesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.balances.push(coin_1.Coin.decode(reader, reader.uint32()));
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
        const message = createBaseQuerySpendableBalancesResponse();
        message.balances = object.balances?.map(e => coin_1.Coin.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQuerySpendableBalancesResponse();
        message.balances = object.balances?.map(e => coin_1.Coin.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.balances) {
            obj.balances = message.balances.map(e => e ? coin_1.Coin.toAmino(e) : undefined);
        }
        else {
            obj.balances = message.balances;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QuerySpendableBalancesResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QuerySpendableBalancesResponse",
            value: exports.QuerySpendableBalancesResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QuerySpendableBalancesResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QuerySpendableBalancesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QuerySpendableBalancesResponse",
            value: exports.QuerySpendableBalancesResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QuerySpendableBalancesResponse.typeUrl, exports.QuerySpendableBalancesResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QuerySpendableBalancesResponse.aminoType, exports.QuerySpendableBalancesResponse.typeUrl);
function createBaseQuerySpendableBalanceByDenomRequest() {
    return {
        address: "",
        denom: ""
    };
}
exports.QuerySpendableBalanceByDenomRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QuerySpendableBalanceByDenomRequest",
    aminoType: "cosmos-sdk/QuerySpendableBalanceByDenomRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QuerySpendableBalanceByDenomRequest.typeUrl || typeof o.address === "string" && typeof o.denom === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QuerySpendableBalanceByDenomRequest.typeUrl || typeof o.address === "string" && typeof o.denom === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QuerySpendableBalanceByDenomRequest.typeUrl || typeof o.address === "string" && typeof o.denom === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.denom !== "") {
            writer.uint32(18).string(message.denom);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySpendableBalanceByDenomRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.denom = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQuerySpendableBalanceByDenomRequest();
        message.address = object.address ?? "";
        message.denom = object.denom ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQuerySpendableBalanceByDenomRequest();
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = object.denom;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address = message.address === "" ? undefined : message.address;
        obj.denom = message.denom === "" ? undefined : message.denom;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QuerySpendableBalanceByDenomRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QuerySpendableBalanceByDenomRequest",
            value: exports.QuerySpendableBalanceByDenomRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QuerySpendableBalanceByDenomRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QuerySpendableBalanceByDenomRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QuerySpendableBalanceByDenomRequest",
            value: exports.QuerySpendableBalanceByDenomRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QuerySpendableBalanceByDenomRequest.typeUrl, exports.QuerySpendableBalanceByDenomRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QuerySpendableBalanceByDenomRequest.aminoType, exports.QuerySpendableBalanceByDenomRequest.typeUrl);
function createBaseQuerySpendableBalanceByDenomResponse() {
    return {
        balance: undefined
    };
}
exports.QuerySpendableBalanceByDenomResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QuerySpendableBalanceByDenomResponse",
    aminoType: "cosmos-sdk/QuerySpendableBalanceByDenomResponse",
    is(o) {
        return o && o.$typeUrl === exports.QuerySpendableBalanceByDenomResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QuerySpendableBalanceByDenomResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QuerySpendableBalanceByDenomResponse.typeUrl;
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.balance !== undefined) {
            coin_1.Coin.encode(message.balance, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySpendableBalanceByDenomResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.balance = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQuerySpendableBalanceByDenomResponse();
        message.balance = object.balance !== undefined && object.balance !== null ? coin_1.Coin.fromPartial(object.balance) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQuerySpendableBalanceByDenomResponse();
        if (object.balance !== undefined && object.balance !== null) {
            message.balance = coin_1.Coin.fromAmino(object.balance);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.balance = message.balance ? coin_1.Coin.toAmino(message.balance) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QuerySpendableBalanceByDenomResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QuerySpendableBalanceByDenomResponse",
            value: exports.QuerySpendableBalanceByDenomResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QuerySpendableBalanceByDenomResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QuerySpendableBalanceByDenomResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QuerySpendableBalanceByDenomResponse",
            value: exports.QuerySpendableBalanceByDenomResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QuerySpendableBalanceByDenomResponse.typeUrl, exports.QuerySpendableBalanceByDenomResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QuerySpendableBalanceByDenomResponse.aminoType, exports.QuerySpendableBalanceByDenomResponse.typeUrl);
function createBaseQueryTotalSupplyRequest() {
    return {
        pagination: undefined
    };
}
exports.QueryTotalSupplyRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QueryTotalSupplyRequest",
    aminoType: "cosmos-sdk/QueryTotalSupplyRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryTotalSupplyRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryTotalSupplyRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryTotalSupplyRequest.typeUrl;
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
        const message = createBaseQueryTotalSupplyRequest();
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
        const message = createBaseQueryTotalSupplyRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryTotalSupplyRequest();
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
        return exports.QueryTotalSupplyRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryTotalSupplyRequest",
            value: exports.QueryTotalSupplyRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryTotalSupplyRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryTotalSupplyRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryTotalSupplyRequest",
            value: exports.QueryTotalSupplyRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryTotalSupplyRequest.typeUrl, exports.QueryTotalSupplyRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryTotalSupplyRequest.aminoType, exports.QueryTotalSupplyRequest.typeUrl);
function createBaseQueryTotalSupplyResponse() {
    return {
        supply: [],
        pagination: undefined
    };
}
exports.QueryTotalSupplyResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QueryTotalSupplyResponse",
    aminoType: "cosmos-sdk/QueryTotalSupplyResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryTotalSupplyResponse.typeUrl || Array.isArray(o.supply) && (!o.supply.length || coin_1.Coin.is(o.supply[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryTotalSupplyResponse.typeUrl || Array.isArray(o.supply) && (!o.supply.length || coin_1.Coin.isSDK(o.supply[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryTotalSupplyResponse.typeUrl || Array.isArray(o.supply) && (!o.supply.length || coin_1.Coin.isAmino(o.supply[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.supply) {
            coin_1.Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTotalSupplyResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.supply.push(coin_1.Coin.decode(reader, reader.uint32()));
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
        const message = createBaseQueryTotalSupplyResponse();
        message.supply = object.supply?.map(e => coin_1.Coin.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryTotalSupplyResponse();
        message.supply = object.supply?.map(e => coin_1.Coin.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.supply) {
            obj.supply = message.supply.map(e => e ? coin_1.Coin.toAmino(e) : undefined);
        }
        else {
            obj.supply = message.supply;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryTotalSupplyResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryTotalSupplyResponse",
            value: exports.QueryTotalSupplyResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryTotalSupplyResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryTotalSupplyResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryTotalSupplyResponse",
            value: exports.QueryTotalSupplyResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryTotalSupplyResponse.typeUrl, exports.QueryTotalSupplyResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryTotalSupplyResponse.aminoType, exports.QueryTotalSupplyResponse.typeUrl);
function createBaseQuerySupplyOfRequest() {
    return {
        denom: ""
    };
}
exports.QuerySupplyOfRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QuerySupplyOfRequest",
    aminoType: "cosmos-sdk/QuerySupplyOfRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QuerySupplyOfRequest.typeUrl || typeof o.denom === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QuerySupplyOfRequest.typeUrl || typeof o.denom === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QuerySupplyOfRequest.typeUrl || typeof o.denom === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySupplyOfRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQuerySupplyOfRequest();
        message.denom = object.denom ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQuerySupplyOfRequest();
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = object.denom;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.denom = message.denom === "" ? undefined : message.denom;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QuerySupplyOfRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QuerySupplyOfRequest",
            value: exports.QuerySupplyOfRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QuerySupplyOfRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QuerySupplyOfRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QuerySupplyOfRequest",
            value: exports.QuerySupplyOfRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QuerySupplyOfRequest.typeUrl, exports.QuerySupplyOfRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QuerySupplyOfRequest.aminoType, exports.QuerySupplyOfRequest.typeUrl);
function createBaseQuerySupplyOfResponse() {
    return {
        amount: coin_1.Coin.fromPartial({})
    };
}
exports.QuerySupplyOfResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QuerySupplyOfResponse",
    aminoType: "cosmos-sdk/QuerySupplyOfResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QuerySupplyOfResponse.typeUrl || coin_1.Coin.is(o.amount));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QuerySupplyOfResponse.typeUrl || coin_1.Coin.isSDK(o.amount));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QuerySupplyOfResponse.typeUrl || coin_1.Coin.isAmino(o.amount));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.amount !== undefined) {
            coin_1.Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySupplyOfResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQuerySupplyOfResponse();
        message.amount = object.amount !== undefined && object.amount !== null ? coin_1.Coin.fromPartial(object.amount) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQuerySupplyOfResponse();
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = coin_1.Coin.fromAmino(object.amount);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.amount = message.amount ? coin_1.Coin.toAmino(message.amount) : coin_1.Coin.toAmino(coin_1.Coin.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QuerySupplyOfResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QuerySupplyOfResponse",
            value: exports.QuerySupplyOfResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QuerySupplyOfResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QuerySupplyOfResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QuerySupplyOfResponse",
            value: exports.QuerySupplyOfResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QuerySupplyOfResponse.typeUrl, exports.QuerySupplyOfResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QuerySupplyOfResponse.aminoType, exports.QuerySupplyOfResponse.typeUrl);
function createBaseQueryParamsRequest() {
    return {};
}
exports.QueryParamsRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QueryParamsRequest",
    aminoType: "cosmos-sdk/QueryParamsRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryParamsRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryParamsRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryParamsRequest",
            value: exports.QueryParamsRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryParamsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryParamsRequest",
            value: exports.QueryParamsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryParamsRequest.typeUrl, exports.QueryParamsRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryParamsRequest.aminoType, exports.QueryParamsRequest.typeUrl);
function createBaseQueryParamsResponse() {
    return {
        params: bank_1.Params.fromPartial({})
    };
}
exports.QueryParamsResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QueryParamsResponse",
    aminoType: "cosmos-sdk/QueryParamsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryParamsResponse.typeUrl || bank_1.Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryParamsResponse.typeUrl || bank_1.Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryParamsResponse.typeUrl || bank_1.Params.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.params !== undefined) {
            bank_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = bank_1.Params.decode(reader, reader.uint32());
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
        message.params = object.params !== undefined && object.params !== null ? bank_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryParamsResponse();
        if (object.params !== undefined && object.params !== null) {
            message.params = bank_1.Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? bank_1.Params.toAmino(message.params) : bank_1.Params.toAmino(bank_1.Params.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryParamsResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryParamsResponse",
            value: exports.QueryParamsResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryParamsResponse",
            value: exports.QueryParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryParamsResponse.typeUrl, exports.QueryParamsResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryParamsResponse.aminoType, exports.QueryParamsResponse.typeUrl);
function createBaseQueryDenomsMetadataRequest() {
    return {
        pagination: undefined
    };
}
exports.QueryDenomsMetadataRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QueryDenomsMetadataRequest",
    aminoType: "cosmos-sdk/QueryDenomsMetadataRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryDenomsMetadataRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryDenomsMetadataRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryDenomsMetadataRequest.typeUrl;
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
        const message = createBaseQueryDenomsMetadataRequest();
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
        const message = createBaseQueryDenomsMetadataRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDenomsMetadataRequest();
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
        return exports.QueryDenomsMetadataRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDenomsMetadataRequest",
            value: exports.QueryDenomsMetadataRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDenomsMetadataRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDenomsMetadataRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryDenomsMetadataRequest",
            value: exports.QueryDenomsMetadataRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDenomsMetadataRequest.typeUrl, exports.QueryDenomsMetadataRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDenomsMetadataRequest.aminoType, exports.QueryDenomsMetadataRequest.typeUrl);
function createBaseQueryDenomsMetadataResponse() {
    return {
        metadatas: [],
        pagination: undefined
    };
}
exports.QueryDenomsMetadataResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QueryDenomsMetadataResponse",
    aminoType: "cosmos-sdk/QueryDenomsMetadataResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryDenomsMetadataResponse.typeUrl || Array.isArray(o.metadatas) && (!o.metadatas.length || bank_1.Metadata.is(o.metadatas[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryDenomsMetadataResponse.typeUrl || Array.isArray(o.metadatas) && (!o.metadatas.length || bank_1.Metadata.isSDK(o.metadatas[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryDenomsMetadataResponse.typeUrl || Array.isArray(o.metadatas) && (!o.metadatas.length || bank_1.Metadata.isAmino(o.metadatas[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.metadatas) {
            bank_1.Metadata.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomsMetadataResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.metadatas.push(bank_1.Metadata.decode(reader, reader.uint32()));
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
        const message = createBaseQueryDenomsMetadataResponse();
        message.metadatas = object.metadatas?.map(e => bank_1.Metadata.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDenomsMetadataResponse();
        message.metadatas = object.metadatas?.map(e => bank_1.Metadata.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.metadatas) {
            obj.metadatas = message.metadatas.map(e => e ? bank_1.Metadata.toAmino(e) : undefined);
        }
        else {
            obj.metadatas = message.metadatas;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDenomsMetadataResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDenomsMetadataResponse",
            value: exports.QueryDenomsMetadataResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDenomsMetadataResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDenomsMetadataResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryDenomsMetadataResponse",
            value: exports.QueryDenomsMetadataResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDenomsMetadataResponse.typeUrl, exports.QueryDenomsMetadataResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDenomsMetadataResponse.aminoType, exports.QueryDenomsMetadataResponse.typeUrl);
function createBaseQueryDenomMetadataRequest() {
    return {
        denom: ""
    };
}
exports.QueryDenomMetadataRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QueryDenomMetadataRequest",
    aminoType: "cosmos-sdk/QueryDenomMetadataRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataRequest.typeUrl || typeof o.denom === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataRequest.typeUrl || typeof o.denom === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataRequest.typeUrl || typeof o.denom === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomMetadataRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDenomMetadataRequest();
        message.denom = object.denom ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDenomMetadataRequest();
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = object.denom;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.denom = message.denom === "" ? undefined : message.denom;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDenomMetadataRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDenomMetadataRequest",
            value: exports.QueryDenomMetadataRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDenomMetadataRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDenomMetadataRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryDenomMetadataRequest",
            value: exports.QueryDenomMetadataRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDenomMetadataRequest.typeUrl, exports.QueryDenomMetadataRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDenomMetadataRequest.aminoType, exports.QueryDenomMetadataRequest.typeUrl);
function createBaseQueryDenomMetadataResponse() {
    return {
        metadata: bank_1.Metadata.fromPartial({})
    };
}
exports.QueryDenomMetadataResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QueryDenomMetadataResponse",
    aminoType: "cosmos-sdk/QueryDenomMetadataResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataResponse.typeUrl || bank_1.Metadata.is(o.metadata));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataResponse.typeUrl || bank_1.Metadata.isSDK(o.metadata));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataResponse.typeUrl || bank_1.Metadata.isAmino(o.metadata));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.metadata !== undefined) {
            bank_1.Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomMetadataResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.metadata = bank_1.Metadata.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDenomMetadataResponse();
        message.metadata = object.metadata !== undefined && object.metadata !== null ? bank_1.Metadata.fromPartial(object.metadata) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDenomMetadataResponse();
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = bank_1.Metadata.fromAmino(object.metadata);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.metadata = message.metadata ? bank_1.Metadata.toAmino(message.metadata) : bank_1.Metadata.toAmino(bank_1.Metadata.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDenomMetadataResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDenomMetadataResponse",
            value: exports.QueryDenomMetadataResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDenomMetadataResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDenomMetadataResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryDenomMetadataResponse",
            value: exports.QueryDenomMetadataResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDenomMetadataResponse.typeUrl, exports.QueryDenomMetadataResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDenomMetadataResponse.aminoType, exports.QueryDenomMetadataResponse.typeUrl);
function createBaseQueryDenomMetadataByQueryStringRequest() {
    return {
        denom: ""
    };
}
exports.QueryDenomMetadataByQueryStringRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QueryDenomMetadataByQueryStringRequest",
    aminoType: "cosmos-sdk/QueryDenomMetadataByQueryStringRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataByQueryStringRequest.typeUrl || typeof o.denom === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataByQueryStringRequest.typeUrl || typeof o.denom === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataByQueryStringRequest.typeUrl || typeof o.denom === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomMetadataByQueryStringRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDenomMetadataByQueryStringRequest();
        message.denom = object.denom ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDenomMetadataByQueryStringRequest();
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = object.denom;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.denom = message.denom === "" ? undefined : message.denom;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDenomMetadataByQueryStringRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDenomMetadataByQueryStringRequest",
            value: exports.QueryDenomMetadataByQueryStringRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDenomMetadataByQueryStringRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDenomMetadataByQueryStringRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryDenomMetadataByQueryStringRequest",
            value: exports.QueryDenomMetadataByQueryStringRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDenomMetadataByQueryStringRequest.typeUrl, exports.QueryDenomMetadataByQueryStringRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDenomMetadataByQueryStringRequest.aminoType, exports.QueryDenomMetadataByQueryStringRequest.typeUrl);
function createBaseQueryDenomMetadataByQueryStringResponse() {
    return {
        metadata: bank_1.Metadata.fromPartial({})
    };
}
exports.QueryDenomMetadataByQueryStringResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QueryDenomMetadataByQueryStringResponse",
    aminoType: "cosmos-sdk/QueryDenomMetadataByQueryStringResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataByQueryStringResponse.typeUrl || bank_1.Metadata.is(o.metadata));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataByQueryStringResponse.typeUrl || bank_1.Metadata.isSDK(o.metadata));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryDenomMetadataByQueryStringResponse.typeUrl || bank_1.Metadata.isAmino(o.metadata));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.metadata !== undefined) {
            bank_1.Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomMetadataByQueryStringResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.metadata = bank_1.Metadata.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryDenomMetadataByQueryStringResponse();
        message.metadata = object.metadata !== undefined && object.metadata !== null ? bank_1.Metadata.fromPartial(object.metadata) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDenomMetadataByQueryStringResponse();
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = bank_1.Metadata.fromAmino(object.metadata);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.metadata = message.metadata ? bank_1.Metadata.toAmino(message.metadata) : bank_1.Metadata.toAmino(bank_1.Metadata.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDenomMetadataByQueryStringResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDenomMetadataByQueryStringResponse",
            value: exports.QueryDenomMetadataByQueryStringResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDenomMetadataByQueryStringResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDenomMetadataByQueryStringResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryDenomMetadataByQueryStringResponse",
            value: exports.QueryDenomMetadataByQueryStringResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDenomMetadataByQueryStringResponse.typeUrl, exports.QueryDenomMetadataByQueryStringResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDenomMetadataByQueryStringResponse.aminoType, exports.QueryDenomMetadataByQueryStringResponse.typeUrl);
function createBaseQueryDenomOwnersRequest() {
    return {
        denom: "",
        pagination: undefined
    };
}
exports.QueryDenomOwnersRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QueryDenomOwnersRequest",
    aminoType: "cosmos-sdk/QueryDenomOwnersRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryDenomOwnersRequest.typeUrl || typeof o.denom === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryDenomOwnersRequest.typeUrl || typeof o.denom === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryDenomOwnersRequest.typeUrl || typeof o.denom === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomOwnersRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
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
        const message = createBaseQueryDenomOwnersRequest();
        message.denom = object.denom ?? "";
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDenomOwnersRequest();
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = object.denom;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.denom = message.denom === "" ? undefined : message.denom;
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDenomOwnersRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDenomOwnersRequest",
            value: exports.QueryDenomOwnersRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDenomOwnersRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDenomOwnersRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryDenomOwnersRequest",
            value: exports.QueryDenomOwnersRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDenomOwnersRequest.typeUrl, exports.QueryDenomOwnersRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDenomOwnersRequest.aminoType, exports.QueryDenomOwnersRequest.typeUrl);
function createBaseDenomOwner() {
    return {
        address: "",
        balance: coin_1.Coin.fromPartial({})
    };
}
exports.DenomOwner = {
    typeUrl: "/cosmos.bank.v1beta1.DenomOwner",
    aminoType: "cosmos-sdk/DenomOwner",
    is(o) {
        return o && (o.$typeUrl === exports.DenomOwner.typeUrl || typeof o.address === "string" && coin_1.Coin.is(o.balance));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.DenomOwner.typeUrl || typeof o.address === "string" && coin_1.Coin.isSDK(o.balance));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.DenomOwner.typeUrl || typeof o.address === "string" && coin_1.Coin.isAmino(o.balance));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.balance !== undefined) {
            coin_1.Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDenomOwner();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.balance = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDenomOwner();
        message.address = object.address ?? "";
        message.balance = object.balance !== undefined && object.balance !== null ? coin_1.Coin.fromPartial(object.balance) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseDenomOwner();
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        if (object.balance !== undefined && object.balance !== null) {
            message.balance = coin_1.Coin.fromAmino(object.balance);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address = message.address === "" ? undefined : message.address;
        obj.balance = message.balance ? coin_1.Coin.toAmino(message.balance) : coin_1.Coin.toAmino(coin_1.Coin.fromPartial({}));
        return obj;
    },
    fromAminoMsg(object) {
        return exports.DenomOwner.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/DenomOwner",
            value: exports.DenomOwner.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.DenomOwner.decode(message.value);
    },
    toProto(message) {
        return exports.DenomOwner.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.DenomOwner",
            value: exports.DenomOwner.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.DenomOwner.typeUrl, exports.DenomOwner);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.DenomOwner.aminoType, exports.DenomOwner.typeUrl);
function createBaseQueryDenomOwnersResponse() {
    return {
        denomOwners: [],
        pagination: undefined
    };
}
exports.QueryDenomOwnersResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QueryDenomOwnersResponse",
    aminoType: "cosmos-sdk/QueryDenomOwnersResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryDenomOwnersResponse.typeUrl || Array.isArray(o.denomOwners) && (!o.denomOwners.length || exports.DenomOwner.is(o.denomOwners[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryDenomOwnersResponse.typeUrl || Array.isArray(o.denom_owners) && (!o.denom_owners.length || exports.DenomOwner.isSDK(o.denom_owners[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryDenomOwnersResponse.typeUrl || Array.isArray(o.denom_owners) && (!o.denom_owners.length || exports.DenomOwner.isAmino(o.denom_owners[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.denomOwners) {
            exports.DenomOwner.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomOwnersResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denomOwners.push(exports.DenomOwner.decode(reader, reader.uint32()));
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
        const message = createBaseQueryDenomOwnersResponse();
        message.denomOwners = object.denomOwners?.map(e => exports.DenomOwner.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryDenomOwnersResponse();
        message.denomOwners = object.denom_owners?.map(e => exports.DenomOwner.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.denomOwners) {
            obj.denom_owners = message.denomOwners.map(e => e ? exports.DenomOwner.toAmino(e) : undefined);
        }
        else {
            obj.denom_owners = message.denomOwners;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryDenomOwnersResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QueryDenomOwnersResponse",
            value: exports.QueryDenomOwnersResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QueryDenomOwnersResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryDenomOwnersResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QueryDenomOwnersResponse",
            value: exports.QueryDenomOwnersResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryDenomOwnersResponse.typeUrl, exports.QueryDenomOwnersResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QueryDenomOwnersResponse.aminoType, exports.QueryDenomOwnersResponse.typeUrl);
function createBaseQuerySendEnabledRequest() {
    return {
        denoms: [],
        pagination: undefined
    };
}
exports.QuerySendEnabledRequest = {
    typeUrl: "/cosmos.bank.v1beta1.QuerySendEnabledRequest",
    aminoType: "cosmos-sdk/QuerySendEnabledRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QuerySendEnabledRequest.typeUrl || Array.isArray(o.denoms) && (!o.denoms.length || typeof o.denoms[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QuerySendEnabledRequest.typeUrl || Array.isArray(o.denoms) && (!o.denoms.length || typeof o.denoms[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QuerySendEnabledRequest.typeUrl || Array.isArray(o.denoms) && (!o.denoms.length || typeof o.denoms[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.denoms) {
            writer.uint32(10).string(v);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(794).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySendEnabledRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denoms.push(reader.string());
                    break;
                case 99:
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
        const message = createBaseQuerySendEnabledRequest();
        message.denoms = object.denoms?.map(e => e) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQuerySendEnabledRequest();
        message.denoms = object.denoms?.map(e => e) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.denoms) {
            obj.denoms = message.denoms.map(e => e);
        }
        else {
            obj.denoms = message.denoms;
        }
        obj.pagination = message.pagination ? pagination_1.PageRequest.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QuerySendEnabledRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QuerySendEnabledRequest",
            value: exports.QuerySendEnabledRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QuerySendEnabledRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QuerySendEnabledRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QuerySendEnabledRequest",
            value: exports.QuerySendEnabledRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QuerySendEnabledRequest.typeUrl, exports.QuerySendEnabledRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QuerySendEnabledRequest.aminoType, exports.QuerySendEnabledRequest.typeUrl);
function createBaseQuerySendEnabledResponse() {
    return {
        sendEnabled: [],
        pagination: undefined
    };
}
exports.QuerySendEnabledResponse = {
    typeUrl: "/cosmos.bank.v1beta1.QuerySendEnabledResponse",
    aminoType: "cosmos-sdk/QuerySendEnabledResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QuerySendEnabledResponse.typeUrl || Array.isArray(o.sendEnabled) && (!o.sendEnabled.length || bank_1.SendEnabled.is(o.sendEnabled[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QuerySendEnabledResponse.typeUrl || Array.isArray(o.send_enabled) && (!o.send_enabled.length || bank_1.SendEnabled.isSDK(o.send_enabled[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QuerySendEnabledResponse.typeUrl || Array.isArray(o.send_enabled) && (!o.send_enabled.length || bank_1.SendEnabled.isAmino(o.send_enabled[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.sendEnabled) {
            bank_1.SendEnabled.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(794).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySendEnabledResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sendEnabled.push(bank_1.SendEnabled.decode(reader, reader.uint32()));
                    break;
                case 99:
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
        const message = createBaseQuerySendEnabledResponse();
        message.sendEnabled = object.sendEnabled?.map(e => bank_1.SendEnabled.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQuerySendEnabledResponse();
        message.sendEnabled = object.send_enabled?.map(e => bank_1.SendEnabled.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.sendEnabled) {
            obj.send_enabled = message.sendEnabled.map(e => e ? bank_1.SendEnabled.toAmino(e) : undefined);
        }
        else {
            obj.send_enabled = message.sendEnabled;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QuerySendEnabledResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/QuerySendEnabledResponse",
            value: exports.QuerySendEnabledResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.QuerySendEnabledResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QuerySendEnabledResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.v1beta1.QuerySendEnabledResponse",
            value: exports.QuerySendEnabledResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QuerySendEnabledResponse.typeUrl, exports.QuerySendEnabledResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.QuerySendEnabledResponse.aminoType, exports.QuerySendEnabledResponse.typeUrl);
