//@ts-nocheck
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Perpetual, LiquidityTier, PremiumStore } from "./perpetual";
import { Params } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseQueryPerpetualRequest() {
    return {
        id: 0
    };
}
export const QueryPerpetualRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualRequest",
    is(o) {
        return o && (o.$typeUrl === QueryPerpetualRequest.typeUrl || typeof o.id === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryPerpetualRequest.typeUrl || typeof o.id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryPerpetualRequest.typeUrl || typeof o.id === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPerpetualRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryPerpetualRequest();
        message.id = object.id ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPerpetualRequest();
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.id = message.id === 0 ? undefined : message.id;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryPerpetualRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryPerpetualRequest.decode(message.value);
    },
    toProto(message) {
        return QueryPerpetualRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualRequest",
            value: QueryPerpetualRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPerpetualRequest.typeUrl, QueryPerpetualRequest);
function createBaseQueryPerpetualResponse() {
    return {
        perpetual: Perpetual.fromPartial({})
    };
}
export const QueryPerpetualResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualResponse",
    is(o) {
        return o && (o.$typeUrl === QueryPerpetualResponse.typeUrl || Perpetual.is(o.perpetual));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryPerpetualResponse.typeUrl || Perpetual.isSDK(o.perpetual));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryPerpetualResponse.typeUrl || Perpetual.isAmino(o.perpetual));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.perpetual !== undefined) {
            Perpetual.encode(message.perpetual, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPerpetualResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetual = Perpetual.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryPerpetualResponse();
        message.perpetual = object.perpetual !== undefined && object.perpetual !== null ? Perpetual.fromPartial(object.perpetual) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPerpetualResponse();
        if (object.perpetual !== undefined && object.perpetual !== null) {
            message.perpetual = Perpetual.fromAmino(object.perpetual);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual = message.perpetual ? Perpetual.toAmino(message.perpetual) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryPerpetualResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryPerpetualResponse.decode(message.value);
    },
    toProto(message) {
        return QueryPerpetualResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualResponse",
            value: QueryPerpetualResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPerpetualResponse.typeUrl, QueryPerpetualResponse);
function createBaseQueryAllPerpetualsRequest() {
    return {
        pagination: undefined
    };
}
export const QueryAllPerpetualsRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsRequest",
    is(o) {
        return o && o.$typeUrl === QueryAllPerpetualsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAllPerpetualsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAllPerpetualsRequest.typeUrl;
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
        const message = createBaseQueryAllPerpetualsRequest();
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
        const message = createBaseQueryAllPerpetualsRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllPerpetualsRequest();
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
        return QueryAllPerpetualsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllPerpetualsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAllPerpetualsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsRequest",
            value: QueryAllPerpetualsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllPerpetualsRequest.typeUrl, QueryAllPerpetualsRequest);
function createBaseQueryAllPerpetualsResponse() {
    return {
        perpetual: [],
        pagination: undefined
    };
}
export const QueryAllPerpetualsResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsResponse",
    is(o) {
        return o && (o.$typeUrl === QueryAllPerpetualsResponse.typeUrl || Array.isArray(o.perpetual) && (!o.perpetual.length || Perpetual.is(o.perpetual[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAllPerpetualsResponse.typeUrl || Array.isArray(o.perpetual) && (!o.perpetual.length || Perpetual.isSDK(o.perpetual[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAllPerpetualsResponse.typeUrl || Array.isArray(o.perpetual) && (!o.perpetual.length || Perpetual.isAmino(o.perpetual[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.perpetual) {
            Perpetual.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllPerpetualsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetual.push(Perpetual.decode(reader, reader.uint32()));
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
        const message = createBaseQueryAllPerpetualsResponse();
        message.perpetual = object.perpetual?.map(e => Perpetual.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllPerpetualsResponse();
        message.perpetual = object.perpetual?.map(e => Perpetual.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.perpetual) {
            obj.perpetual = message.perpetual.map(e => e ? Perpetual.toAmino(e) : undefined);
        }
        else {
            obj.perpetual = message.perpetual;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllPerpetualsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllPerpetualsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAllPerpetualsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsResponse",
            value: QueryAllPerpetualsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllPerpetualsResponse.typeUrl, QueryAllPerpetualsResponse);
function createBaseQueryAllLiquidityTiersRequest() {
    return {
        pagination: undefined
    };
}
export const QueryAllLiquidityTiersRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersRequest",
    is(o) {
        return o && o.$typeUrl === QueryAllLiquidityTiersRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryAllLiquidityTiersRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryAllLiquidityTiersRequest.typeUrl;
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
        const message = createBaseQueryAllLiquidityTiersRequest();
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
        const message = createBaseQueryAllLiquidityTiersRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllLiquidityTiersRequest();
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
        return QueryAllLiquidityTiersRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllLiquidityTiersRequest.decode(message.value);
    },
    toProto(message) {
        return QueryAllLiquidityTiersRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersRequest",
            value: QueryAllLiquidityTiersRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllLiquidityTiersRequest.typeUrl, QueryAllLiquidityTiersRequest);
function createBaseQueryAllLiquidityTiersResponse() {
    return {
        liquidityTiers: [],
        pagination: undefined
    };
}
export const QueryAllLiquidityTiersResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersResponse",
    is(o) {
        return o && (o.$typeUrl === QueryAllLiquidityTiersResponse.typeUrl || Array.isArray(o.liquidityTiers) && (!o.liquidityTiers.length || LiquidityTier.is(o.liquidityTiers[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryAllLiquidityTiersResponse.typeUrl || Array.isArray(o.liquidity_tiers) && (!o.liquidity_tiers.length || LiquidityTier.isSDK(o.liquidity_tiers[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryAllLiquidityTiersResponse.typeUrl || Array.isArray(o.liquidity_tiers) && (!o.liquidity_tiers.length || LiquidityTier.isAmino(o.liquidity_tiers[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.liquidityTiers) {
            LiquidityTier.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllLiquidityTiersResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.liquidityTiers.push(LiquidityTier.decode(reader, reader.uint32()));
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
        const message = createBaseQueryAllLiquidityTiersResponse();
        message.liquidityTiers = object.liquidityTiers?.map(e => LiquidityTier.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllLiquidityTiersResponse();
        message.liquidityTiers = object.liquidity_tiers?.map(e => LiquidityTier.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.liquidityTiers) {
            obj.liquidity_tiers = message.liquidityTiers.map(e => e ? LiquidityTier.toAmino(e) : undefined);
        }
        else {
            obj.liquidity_tiers = message.liquidityTiers;
        }
        obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryAllLiquidityTiersResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryAllLiquidityTiersResponse.decode(message.value);
    },
    toProto(message) {
        return QueryAllLiquidityTiersResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersResponse",
            value: QueryAllLiquidityTiersResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryAllLiquidityTiersResponse.typeUrl, QueryAllLiquidityTiersResponse);
function createBaseQueryPremiumVotesRequest() {
    return {};
}
export const QueryPremiumVotesRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesRequest",
    is(o) {
        return o && o.$typeUrl === QueryPremiumVotesRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryPremiumVotesRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryPremiumVotesRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPremiumVotesRequest();
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
        const message = createBaseQueryPremiumVotesRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryPremiumVotesRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryPremiumVotesRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryPremiumVotesRequest.decode(message.value);
    },
    toProto(message) {
        return QueryPremiumVotesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesRequest",
            value: QueryPremiumVotesRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPremiumVotesRequest.typeUrl, QueryPremiumVotesRequest);
function createBaseQueryPremiumVotesResponse() {
    return {
        premiumVotes: PremiumStore.fromPartial({})
    };
}
export const QueryPremiumVotesResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesResponse",
    is(o) {
        return o && (o.$typeUrl === QueryPremiumVotesResponse.typeUrl || PremiumStore.is(o.premiumVotes));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryPremiumVotesResponse.typeUrl || PremiumStore.isSDK(o.premium_votes));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryPremiumVotesResponse.typeUrl || PremiumStore.isAmino(o.premium_votes));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.premiumVotes !== undefined) {
            PremiumStore.encode(message.premiumVotes, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPremiumVotesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.premiumVotes = PremiumStore.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryPremiumVotesResponse();
        message.premiumVotes = object.premiumVotes !== undefined && object.premiumVotes !== null ? PremiumStore.fromPartial(object.premiumVotes) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPremiumVotesResponse();
        if (object.premium_votes !== undefined && object.premium_votes !== null) {
            message.premiumVotes = PremiumStore.fromAmino(object.premium_votes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.premium_votes = message.premiumVotes ? PremiumStore.toAmino(message.premiumVotes) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryPremiumVotesResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryPremiumVotesResponse.decode(message.value);
    },
    toProto(message) {
        return QueryPremiumVotesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesResponse",
            value: QueryPremiumVotesResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPremiumVotesResponse.typeUrl, QueryPremiumVotesResponse);
function createBaseQueryPremiumSamplesRequest() {
    return {};
}
export const QueryPremiumSamplesRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesRequest",
    is(o) {
        return o && o.$typeUrl === QueryPremiumSamplesRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === QueryPremiumSamplesRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === QueryPremiumSamplesRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPremiumSamplesRequest();
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
        const message = createBaseQueryPremiumSamplesRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseQueryPremiumSamplesRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return QueryPremiumSamplesRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryPremiumSamplesRequest.decode(message.value);
    },
    toProto(message) {
        return QueryPremiumSamplesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesRequest",
            value: QueryPremiumSamplesRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPremiumSamplesRequest.typeUrl, QueryPremiumSamplesRequest);
function createBaseQueryPremiumSamplesResponse() {
    return {
        premiumSamples: PremiumStore.fromPartial({})
    };
}
export const QueryPremiumSamplesResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesResponse",
    is(o) {
        return o && (o.$typeUrl === QueryPremiumSamplesResponse.typeUrl || PremiumStore.is(o.premiumSamples));
    },
    isSDK(o) {
        return o && (o.$typeUrl === QueryPremiumSamplesResponse.typeUrl || PremiumStore.isSDK(o.premium_samples));
    },
    isAmino(o) {
        return o && (o.$typeUrl === QueryPremiumSamplesResponse.typeUrl || PremiumStore.isAmino(o.premium_samples));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.premiumSamples !== undefined) {
            PremiumStore.encode(message.premiumSamples, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPremiumSamplesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.premiumSamples = PremiumStore.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseQueryPremiumSamplesResponse();
        message.premiumSamples = object.premiumSamples !== undefined && object.premiumSamples !== null ? PremiumStore.fromPartial(object.premiumSamples) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPremiumSamplesResponse();
        if (object.premium_samples !== undefined && object.premium_samples !== null) {
            message.premiumSamples = PremiumStore.fromAmino(object.premium_samples);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.premium_samples = message.premiumSamples ? PremiumStore.toAmino(message.premiumSamples) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return QueryPremiumSamplesResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return QueryPremiumSamplesResponse.decode(message.value);
    },
    toProto(message) {
        return QueryPremiumSamplesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesResponse",
            value: QueryPremiumSamplesResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryPremiumSamplesResponse.typeUrl, QueryPremiumSamplesResponse);
function createBaseQueryParamsRequest() {
    return {};
}
export const QueryParamsRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryParamsRequest",
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
    fromProtoMsg(message) {
        return QueryParamsRequest.decode(message.value);
    },
    toProto(message) {
        return QueryParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryParamsRequest",
            value: QueryParamsRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryParamsRequest.typeUrl, QueryParamsRequest);
function createBaseQueryParamsResponse() {
    return {
        params: Params.fromPartial({})
    };
}
export const QueryParamsResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryParamsResponse",
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
    fromProtoMsg(message) {
        return QueryParamsResponse.decode(message.value);
    },
    toProto(message) {
        return QueryParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryParamsResponse",
            value: QueryParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(QueryParamsResponse.typeUrl, QueryParamsResponse);
