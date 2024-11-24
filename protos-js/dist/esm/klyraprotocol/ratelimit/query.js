//@ts-nocheck
import { LimitParams } from "./limit_params";
import { LimiterCapacity } from "./capacity";
import { PendingSendPacket } from "./pending_send_packet";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseListLimitParamsRequest() {
    return {};
}
export const ListLimitParamsRequest = {
    typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsRequest",
    is(o) {
        return o && o.$typeUrl === ListLimitParamsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === ListLimitParamsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === ListLimitParamsRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return ListLimitParamsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return ListLimitParamsRequest.decode(message.value);
    },
    toProto(message) {
        return ListLimitParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsRequest",
            value: ListLimitParamsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ListLimitParamsRequest.typeUrl, ListLimitParamsRequest);
function createBaseListLimitParamsResponse() {
    return {
        limitParamsList: []
    };
}
export const ListLimitParamsResponse = {
    typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsResponse",
    is(o) {
        return o && (o.$typeUrl === ListLimitParamsResponse.typeUrl || Array.isArray(o.limitParamsList) && (!o.limitParamsList.length || LimitParams.is(o.limitParamsList[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === ListLimitParamsResponse.typeUrl || Array.isArray(o.limit_params_list) && (!o.limit_params_list.length || LimitParams.isSDK(o.limit_params_list[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === ListLimitParamsResponse.typeUrl || Array.isArray(o.limit_params_list) && (!o.limit_params_list.length || LimitParams.isAmino(o.limit_params_list[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.limitParamsList) {
            LimitParams.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListLimitParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.limitParamsList.push(LimitParams.decode(reader, reader.uint32()));
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
        message.limitParamsList = object.limitParamsList?.map(e => LimitParams.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseListLimitParamsResponse();
        message.limitParamsList = object.limit_params_list?.map(e => LimitParams.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.limitParamsList) {
            obj.limit_params_list = message.limitParamsList.map(e => e ? LimitParams.toAmino(e) : undefined);
        }
        else {
            obj.limit_params_list = message.limitParamsList;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return ListLimitParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return ListLimitParamsResponse.decode(message.value);
    },
    toProto(message) {
        return ListLimitParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.ListLimitParamsResponse",
            value: ListLimitParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ListLimitParamsResponse.typeUrl, ListLimitParamsResponse);
function createBaseQueryCapacityByDenomRequest() {
    return {
        denom: ""
    };
}
export const QueryCapacityByDenomRequest = {
    typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomRequest",
    is(o) {
        return o && (o.$typeUrl === QueryCapacityByDenomRequest.typeUrl || typeof o.denom === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryCapacityByDenomRequest.typeUrl || typeof o.denom === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryCapacityByDenomRequest.typeUrl || typeof o.denom === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return QueryCapacityByDenomRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryCapacityByDenomRequest.decode(message.value);
    },
    toProto(message) {
        return QueryCapacityByDenomRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomRequest",
            value: QueryCapacityByDenomRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryCapacityByDenomRequest.typeUrl, QueryCapacityByDenomRequest);
function createBaseQueryCapacityByDenomResponse() {
    return {
        limiterCapacityList: []
    };
}
export const QueryCapacityByDenomResponse = {
    typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomResponse",
    is(o) {
        return o && (o.$typeUrl === QueryCapacityByDenomResponse.typeUrl || Array.isArray(o.limiterCapacityList) && (!o.limiterCapacityList.length || LimiterCapacity.is(o.limiterCapacityList[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryCapacityByDenomResponse.typeUrl || Array.isArray(o.limiter_capacity_list) && (!o.limiter_capacity_list.length || LimiterCapacity.isSDK(o.limiter_capacity_list[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryCapacityByDenomResponse.typeUrl || Array.isArray(o.limiter_capacity_list) && (!o.limiter_capacity_list.length || LimiterCapacity.isAmino(o.limiter_capacity_list[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.limiterCapacityList) {
            LimiterCapacity.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCapacityByDenomResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.limiterCapacityList.push(LimiterCapacity.decode(reader, reader.uint32()));
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
        message.limiterCapacityList = object.limiterCapacityList?.map(e => LimiterCapacity.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryCapacityByDenomResponse();
        message.limiterCapacityList = object.limiter_capacity_list?.map(e => LimiterCapacity.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.limiterCapacityList) {
            obj.limiter_capacity_list = message.limiterCapacityList.map(e => e ? LimiterCapacity.toAmino(e) : undefined);
        }
        else {
            obj.limiter_capacity_list = message.limiterCapacityList;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return QueryCapacityByDenomResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryCapacityByDenomResponse.decode(message.value);
    },
    toProto(message) {
        return QueryCapacityByDenomResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.QueryCapacityByDenomResponse",
            value: QueryCapacityByDenomResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryCapacityByDenomResponse.typeUrl, QueryCapacityByDenomResponse);
function createBaseQueryAllPendingSendPacketsRequest() {
    return {};
}
export const QueryAllPendingSendPacketsRequest = {
    typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsRequest",
    is(o) {
        return o && o.$typeUrl === QueryAllPendingSendPacketsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAllPendingSendPacketsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAllPendingSendPacketsRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return QueryAllPendingSendPacketsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllPendingSendPacketsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAllPendingSendPacketsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsRequest",
            value: QueryAllPendingSendPacketsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllPendingSendPacketsRequest.typeUrl, QueryAllPendingSendPacketsRequest);
function createBaseQueryAllPendingSendPacketsResponse() {
    return {
        pendingSendPackets: []
    };
}
export const QueryAllPendingSendPacketsResponse = {
    typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryAllPendingSendPacketsResponse.typeUrl || Array.isArray(o.pendingSendPackets) && (!o.pendingSendPackets.length || PendingSendPacket.is(o.pendingSendPackets[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAllPendingSendPacketsResponse.typeUrl || Array.isArray(o.pending_send_packets) && (!o.pending_send_packets.length || PendingSendPacket.isSDK(o.pending_send_packets[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAllPendingSendPacketsResponse.typeUrl || Array.isArray(o.pending_send_packets) && (!o.pending_send_packets.length || PendingSendPacket.isAmino(o.pending_send_packets[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.pendingSendPackets) {
            PendingSendPacket.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllPendingSendPacketsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pendingSendPackets.push(PendingSendPacket.decode(reader, reader.uint32()));
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
        message.pendingSendPackets = object.pendingSendPackets?.map(e => PendingSendPacket.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllPendingSendPacketsResponse();
        message.pendingSendPackets = object.pending_send_packets?.map(e => PendingSendPacket.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.pendingSendPackets) {
            obj.pending_send_packets = message.pendingSendPackets.map(e => e ? PendingSendPacket.toAmino(e) : undefined);
        }
        else {
            obj.pending_send_packets = message.pendingSendPackets;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllPendingSendPacketsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllPendingSendPacketsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAllPendingSendPacketsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.QueryAllPendingSendPacketsResponse",
            value: QueryAllPendingSendPacketsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllPendingSendPacketsResponse.typeUrl, QueryAllPendingSendPacketsResponse);
function createBaseGetSDAIPriceQueryRequest() {
    return {};
}
export const GetSDAIPriceQueryRequest = {
    typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryRequest",
    is(o) {
        return o && o.$typeUrl === GetSDAIPriceQueryRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetSDAIPriceQueryRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetSDAIPriceQueryRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return GetSDAIPriceQueryRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return GetSDAIPriceQueryRequest.decode(message.value);
    },
    toProto(message) {
        return GetSDAIPriceQueryRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryRequest",
            value: GetSDAIPriceQueryRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetSDAIPriceQueryRequest.typeUrl, GetSDAIPriceQueryRequest);
function createBaseGetSDAIPriceQueryResponse() {
    return {
        price: ""
    };
}
export const GetSDAIPriceQueryResponse = {
    typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryResponse",
    is(o) {
        return o && (o.$typeUrl === GetSDAIPriceQueryResponse.typeUrl || typeof o.price === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === GetSDAIPriceQueryResponse.typeUrl || typeof o.price === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === GetSDAIPriceQueryResponse.typeUrl || typeof o.price === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.price !== "") {
            writer.uint32(10).string(message.price);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return GetSDAIPriceQueryResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return GetSDAIPriceQueryResponse.decode(message.value);
    },
    toProto(message) {
        return GetSDAIPriceQueryResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.GetSDAIPriceQueryResponse",
            value: GetSDAIPriceQueryResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetSDAIPriceQueryResponse.typeUrl, GetSDAIPriceQueryResponse);
function createBaseGetAssetYieldIndexQueryRequest() {
    return {};
}
export const GetAssetYieldIndexQueryRequest = {
    typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryRequest",
    is(o) {
        return o && o.$typeUrl === GetAssetYieldIndexQueryRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === GetAssetYieldIndexQueryRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === GetAssetYieldIndexQueryRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return GetAssetYieldIndexQueryRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return GetAssetYieldIndexQueryRequest.decode(message.value);
    },
    toProto(message) {
        return GetAssetYieldIndexQueryRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryRequest",
            value: GetAssetYieldIndexQueryRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetAssetYieldIndexQueryRequest.typeUrl, GetAssetYieldIndexQueryRequest);
function createBaseGetAssetYieldIndexQueryResponse() {
    return {
        assetYieldIndex: ""
    };
}
export const GetAssetYieldIndexQueryResponse = {
    typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryResponse",
    is(o) {
        return o && (o.$typeUrl === GetAssetYieldIndexQueryResponse.typeUrl || typeof o.assetYieldIndex === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === GetAssetYieldIndexQueryResponse.typeUrl || typeof o.asset_yield_index === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === GetAssetYieldIndexQueryResponse.typeUrl || typeof o.asset_yield_index === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.assetYieldIndex !== "") {
            writer.uint32(10).string(message.assetYieldIndex);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return GetAssetYieldIndexQueryResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return GetAssetYieldIndexQueryResponse.decode(message.value);
    },
    toProto(message) {
        return GetAssetYieldIndexQueryResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.GetAssetYieldIndexQueryResponse",
            value: GetAssetYieldIndexQueryResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GetAssetYieldIndexQueryResponse.typeUrl, GetAssetYieldIndexQueryResponse);
