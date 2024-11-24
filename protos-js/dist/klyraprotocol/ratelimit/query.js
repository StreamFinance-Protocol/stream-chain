"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAssetYieldIndexQueryResponse = exports.GetAssetYieldIndexQueryRequest = exports.GetSDAIPriceQueryResponse = exports.GetSDAIPriceQueryRequest = exports.QueryAllPendingSendPacketsResponse = exports.QueryAllPendingSendPacketsRequest = exports.QueryCapacityByDenomResponse = exports.QueryCapacityByDenomRequest = exports.ListLimitParamsResponse = exports.ListLimitParamsRequest = void 0;
//@ts-nocheck
const limit_params_1 = require("./limit_params");
const capacity_1 = require("./capacity");
const pending_send_packet_1 = require("./pending_send_packet");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseListLimitParamsRequest() {
    return {};
}
exports.ListLimitParamsRequest = {
    typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsRequest",
    is(o) {
        return o && o.$typeUrl === exports.ListLimitParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.ListLimitParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.ListLimitParamsRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListLimitParamsRequest();
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
        const message = createBaseListLimitParamsRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseListLimitParamsRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ListLimitParamsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ListLimitParamsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.ListLimitParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsRequest",
            value: exports.ListLimitParamsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ListLimitParamsRequest.typeUrl, exports.ListLimitParamsRequest);
function createBaseListLimitParamsResponse() {
    return {
        limitParamsList: []
    };
}
exports.ListLimitParamsResponse = {
    typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.ListLimitParamsResponse.typeUrl || Array.isArray(o.limitParamsList) && (!o.limitParamsList.length || limit_params_1.LimitParams.is(o.limitParamsList[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ListLimitParamsResponse.typeUrl || Array.isArray(o.limit_params_list) && (!o.limit_params_list.length || limit_params_1.LimitParams.isSDK(o.limit_params_list[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ListLimitParamsResponse.typeUrl || Array.isArray(o.limit_params_list) && (!o.limit_params_list.length || limit_params_1.LimitParams.isAmino(o.limit_params_list[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.limitParamsList) {
            limit_params_1.LimitParams.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListLimitParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.limitParamsList.push(limit_params_1.LimitParams.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseListLimitParamsResponse();
        message.limitParamsList = object.limitParamsList?.map(e => limit_params_1.LimitParams.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseListLimitParamsResponse();
        message.limitParamsList = object.limit_params_list?.map(e => limit_params_1.LimitParams.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.limitParamsList) {
            obj.limit_params_list = message.limitParamsList.map(e => e ? limit_params_1.LimitParams.toAmino(e) : undefined);
        }
        else {
            obj.limit_params_list = message.limitParamsList;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ListLimitParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.ListLimitParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.ListLimitParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsResponse",
            value: exports.ListLimitParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ListLimitParamsResponse.typeUrl, exports.ListLimitParamsResponse);
function createBaseQueryCapacityByDenomRequest() {
    return {
        denom: ""
    };
}
exports.QueryCapacityByDenomRequest = {
    typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryCapacityByDenomRequest.typeUrl || typeof o.denom === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryCapacityByDenomRequest.typeUrl || typeof o.denom === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryCapacityByDenomRequest.typeUrl || typeof o.denom === "string");
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
        const message = createBaseQueryCapacityByDenomRequest();
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
        const message = createBaseQueryCapacityByDenomRequest();
        message.denom = object.denom ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryCapacityByDenomRequest();
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
        return exports.QueryCapacityByDenomRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryCapacityByDenomRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryCapacityByDenomRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomRequest",
            value: exports.QueryCapacityByDenomRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryCapacityByDenomRequest.typeUrl, exports.QueryCapacityByDenomRequest);
function createBaseQueryCapacityByDenomResponse() {
    return {
        limiterCapacityList: []
    };
}
exports.QueryCapacityByDenomResponse = {
    typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryCapacityByDenomResponse.typeUrl || Array.isArray(o.limiterCapacityList) && (!o.limiterCapacityList.length || capacity_1.LimiterCapacity.is(o.limiterCapacityList[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryCapacityByDenomResponse.typeUrl || Array.isArray(o.limiter_capacity_list) && (!o.limiter_capacity_list.length || capacity_1.LimiterCapacity.isSDK(o.limiter_capacity_list[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryCapacityByDenomResponse.typeUrl || Array.isArray(o.limiter_capacity_list) && (!o.limiter_capacity_list.length || capacity_1.LimiterCapacity.isAmino(o.limiter_capacity_list[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.limiterCapacityList) {
            capacity_1.LimiterCapacity.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCapacityByDenomResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.limiterCapacityList.push(capacity_1.LimiterCapacity.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryCapacityByDenomResponse();
        message.limiterCapacityList = object.limiterCapacityList?.map(e => capacity_1.LimiterCapacity.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryCapacityByDenomResponse();
        message.limiterCapacityList = object.limiter_capacity_list?.map(e => capacity_1.LimiterCapacity.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.limiterCapacityList) {
            obj.limiter_capacity_list = message.limiterCapacityList.map(e => e ? capacity_1.LimiterCapacity.toAmino(e) : undefined);
        }
        else {
            obj.limiter_capacity_list = message.limiterCapacityList;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryCapacityByDenomResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryCapacityByDenomResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryCapacityByDenomResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomResponse",
            value: exports.QueryCapacityByDenomResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryCapacityByDenomResponse.typeUrl, exports.QueryCapacityByDenomResponse);
function createBaseQueryAllPendingSendPacketsRequest() {
    return {};
}
exports.QueryAllPendingSendPacketsRequest = {
    typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryAllPendingSendPacketsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryAllPendingSendPacketsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryAllPendingSendPacketsRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllPendingSendPacketsRequest();
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
        const message = createBaseQueryAllPendingSendPacketsRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryAllPendingSendPacketsRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllPendingSendPacketsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllPendingSendPacketsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllPendingSendPacketsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsRequest",
            value: exports.QueryAllPendingSendPacketsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllPendingSendPacketsRequest.typeUrl, exports.QueryAllPendingSendPacketsRequest);
function createBaseQueryAllPendingSendPacketsResponse() {
    return {
        pendingSendPackets: []
    };
}
exports.QueryAllPendingSendPacketsResponse = {
    typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryAllPendingSendPacketsResponse.typeUrl || Array.isArray(o.pendingSendPackets) && (!o.pendingSendPackets.length || pending_send_packet_1.PendingSendPacket.is(o.pendingSendPackets[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryAllPendingSendPacketsResponse.typeUrl || Array.isArray(o.pending_send_packets) && (!o.pending_send_packets.length || pending_send_packet_1.PendingSendPacket.isSDK(o.pending_send_packets[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryAllPendingSendPacketsResponse.typeUrl || Array.isArray(o.pending_send_packets) && (!o.pending_send_packets.length || pending_send_packet_1.PendingSendPacket.isAmino(o.pending_send_packets[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.pendingSendPackets) {
            pending_send_packet_1.PendingSendPacket.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllPendingSendPacketsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pendingSendPackets.push(pending_send_packet_1.PendingSendPacket.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryAllPendingSendPacketsResponse();
        message.pendingSendPackets = object.pendingSendPackets?.map(e => pending_send_packet_1.PendingSendPacket.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllPendingSendPacketsResponse();
        message.pendingSendPackets = object.pending_send_packets?.map(e => pending_send_packet_1.PendingSendPacket.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.pendingSendPackets) {
            obj.pending_send_packets = message.pendingSendPackets.map(e => e ? pending_send_packet_1.PendingSendPacket.toAmino(e) : undefined);
        }
        else {
            obj.pending_send_packets = message.pendingSendPackets;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllPendingSendPacketsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllPendingSendPacketsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllPendingSendPacketsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsResponse",
            value: exports.QueryAllPendingSendPacketsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllPendingSendPacketsResponse.typeUrl, exports.QueryAllPendingSendPacketsResponse);
function createBaseGetSDAIPriceQueryRequest() {
    return {};
}
exports.GetSDAIPriceQueryRequest = {
    typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryRequest",
    is(o) {
        return o && o.$typeUrl === exports.GetSDAIPriceQueryRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.GetSDAIPriceQueryRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.GetSDAIPriceQueryRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetSDAIPriceQueryRequest();
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
        const message = createBaseGetSDAIPriceQueryRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseGetSDAIPriceQueryRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetSDAIPriceQueryRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.GetSDAIPriceQueryRequest.decode(message.value);
    },
    toProto(message) {
        return exports.GetSDAIPriceQueryRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryRequest",
            value: exports.GetSDAIPriceQueryRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetSDAIPriceQueryRequest.typeUrl, exports.GetSDAIPriceQueryRequest);
function createBaseGetSDAIPriceQueryResponse() {
    return {
        price: ""
    };
}
exports.GetSDAIPriceQueryResponse = {
    typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryResponse",
    is(o) {
        return o && (o.$typeUrl === exports.GetSDAIPriceQueryResponse.typeUrl || typeof o.price === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GetSDAIPriceQueryResponse.typeUrl || typeof o.price === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GetSDAIPriceQueryResponse.typeUrl || typeof o.price === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.price !== "") {
            writer.uint32(10).string(message.price);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetSDAIPriceQueryResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.price = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetSDAIPriceQueryResponse();
        message.price = object.price ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetSDAIPriceQueryResponse();
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.price = message.price === "" ? undefined : message.price;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetSDAIPriceQueryResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.GetSDAIPriceQueryResponse.decode(message.value);
    },
    toProto(message) {
        return exports.GetSDAIPriceQueryResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryResponse",
            value: exports.GetSDAIPriceQueryResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetSDAIPriceQueryResponse.typeUrl, exports.GetSDAIPriceQueryResponse);
function createBaseGetAssetYieldIndexQueryRequest() {
    return {};
}
exports.GetAssetYieldIndexQueryRequest = {
    typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryRequest",
    is(o) {
        return o && o.$typeUrl === exports.GetAssetYieldIndexQueryRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.GetAssetYieldIndexQueryRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.GetAssetYieldIndexQueryRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetAssetYieldIndexQueryRequest();
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
        const message = createBaseGetAssetYieldIndexQueryRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseGetAssetYieldIndexQueryRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetAssetYieldIndexQueryRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.GetAssetYieldIndexQueryRequest.decode(message.value);
    },
    toProto(message) {
        return exports.GetAssetYieldIndexQueryRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryRequest",
            value: exports.GetAssetYieldIndexQueryRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetAssetYieldIndexQueryRequest.typeUrl, exports.GetAssetYieldIndexQueryRequest);
function createBaseGetAssetYieldIndexQueryResponse() {
    return {
        assetYieldIndex: ""
    };
}
exports.GetAssetYieldIndexQueryResponse = {
    typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryResponse",
    is(o) {
        return o && (o.$typeUrl === exports.GetAssetYieldIndexQueryResponse.typeUrl || typeof o.assetYieldIndex === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GetAssetYieldIndexQueryResponse.typeUrl || typeof o.asset_yield_index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GetAssetYieldIndexQueryResponse.typeUrl || typeof o.asset_yield_index === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.assetYieldIndex !== "") {
            writer.uint32(10).string(message.assetYieldIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetAssetYieldIndexQueryResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.assetYieldIndex = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGetAssetYieldIndexQueryResponse();
        message.assetYieldIndex = object.assetYieldIndex ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseGetAssetYieldIndexQueryResponse();
        if (object.asset_yield_index !== undefined && object.asset_yield_index !== null) {
            message.assetYieldIndex = object.asset_yield_index;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.asset_yield_index = message.assetYieldIndex === "" ? undefined : message.assetYieldIndex;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GetAssetYieldIndexQueryResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.GetAssetYieldIndexQueryResponse.decode(message.value);
    },
    toProto(message) {
        return exports.GetAssetYieldIndexQueryResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryResponse",
            value: exports.GetAssetYieldIndexQueryResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GetAssetYieldIndexQueryResponse.typeUrl, exports.GetAssetYieldIndexQueryResponse);
