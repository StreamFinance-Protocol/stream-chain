"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamsResponse = exports.QueryParamsRequest = exports.QueryPremiumSamplesResponse = exports.QueryPremiumSamplesRequest = exports.QueryPremiumVotesResponse = exports.QueryPremiumVotesRequest = exports.QueryAllLiquidityTiersResponse = exports.QueryAllLiquidityTiersRequest = exports.QueryAllPerpetualsResponse = exports.QueryAllPerpetualsRequest = exports.QueryPerpetualResponse = exports.QueryPerpetualRequest = void 0;
//@ts-nocheck
const pagination_1 = require("../../cosmos/base/query/v1beta1/pagination");
const perpetual_1 = require("./perpetual");
const params_1 = require("./params");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseQueryPerpetualRequest() {
    return {
        id: 0
    };
}
exports.QueryPerpetualRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualRequest",
    is(o) {
        return o && (o.$typeUrl === exports.QueryPerpetualRequest.typeUrl || typeof o.id === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryPerpetualRequest.typeUrl || typeof o.id === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryPerpetualRequest.typeUrl || typeof o.id === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryPerpetualRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryPerpetualRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryPerpetualRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualRequest",
            value: exports.QueryPerpetualRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryPerpetualRequest.typeUrl, exports.QueryPerpetualRequest);
function createBaseQueryPerpetualResponse() {
    return {
        perpetual: perpetual_1.Perpetual.fromPartial({})
    };
}
exports.QueryPerpetualResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryPerpetualResponse.typeUrl || perpetual_1.Perpetual.is(o.perpetual));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryPerpetualResponse.typeUrl || perpetual_1.Perpetual.isSDK(o.perpetual));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryPerpetualResponse.typeUrl || perpetual_1.Perpetual.isAmino(o.perpetual));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.perpetual !== undefined) {
            perpetual_1.Perpetual.encode(message.perpetual, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPerpetualResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetual = perpetual_1.Perpetual.decode(reader, reader.uint32());
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
        message.perpetual = object.perpetual !== undefined && object.perpetual !== null ? perpetual_1.Perpetual.fromPartial(object.perpetual) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPerpetualResponse();
        if (object.perpetual !== undefined && object.perpetual !== null) {
            message.perpetual = perpetual_1.Perpetual.fromAmino(object.perpetual);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual = message.perpetual ? perpetual_1.Perpetual.toAmino(message.perpetual) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryPerpetualResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryPerpetualResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryPerpetualResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPerpetualResponse",
            value: exports.QueryPerpetualResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryPerpetualResponse.typeUrl, exports.QueryPerpetualResponse);
function createBaseQueryAllPerpetualsRequest() {
    return {
        pagination: undefined
    };
}
exports.QueryAllPerpetualsRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryAllPerpetualsRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryAllPerpetualsRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryAllPerpetualsRequest.typeUrl;
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
        const message = createBaseQueryAllPerpetualsRequest();
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
        const message = createBaseQueryAllPerpetualsRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllPerpetualsRequest();
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
        return exports.QueryAllPerpetualsRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllPerpetualsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllPerpetualsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsRequest",
            value: exports.QueryAllPerpetualsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllPerpetualsRequest.typeUrl, exports.QueryAllPerpetualsRequest);
function createBaseQueryAllPerpetualsResponse() {
    return {
        perpetual: [],
        pagination: undefined
    };
}
exports.QueryAllPerpetualsResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryAllPerpetualsResponse.typeUrl || Array.isArray(o.perpetual) && (!o.perpetual.length || perpetual_1.Perpetual.is(o.perpetual[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryAllPerpetualsResponse.typeUrl || Array.isArray(o.perpetual) && (!o.perpetual.length || perpetual_1.Perpetual.isSDK(o.perpetual[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryAllPerpetualsResponse.typeUrl || Array.isArray(o.perpetual) && (!o.perpetual.length || perpetual_1.Perpetual.isAmino(o.perpetual[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.perpetual) {
            perpetual_1.Perpetual.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllPerpetualsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetual.push(perpetual_1.Perpetual.decode(reader, reader.uint32()));
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
        const message = createBaseQueryAllPerpetualsResponse();
        message.perpetual = object.perpetual?.map(e => perpetual_1.Perpetual.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllPerpetualsResponse();
        message.perpetual = object.perpetual?.map(e => perpetual_1.Perpetual.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.perpetual) {
            obj.perpetual = message.perpetual.map(e => e ? perpetual_1.Perpetual.toAmino(e) : undefined);
        }
        else {
            obj.perpetual = message.perpetual;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllPerpetualsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllPerpetualsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllPerpetualsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryAllPerpetualsResponse",
            value: exports.QueryAllPerpetualsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllPerpetualsResponse.typeUrl, exports.QueryAllPerpetualsResponse);
function createBaseQueryAllLiquidityTiersRequest() {
    return {
        pagination: undefined
    };
}
exports.QueryAllLiquidityTiersRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryAllLiquidityTiersRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryAllLiquidityTiersRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryAllLiquidityTiersRequest.typeUrl;
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
        const message = createBaseQueryAllLiquidityTiersRequest();
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
        const message = createBaseQueryAllLiquidityTiersRequest();
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageRequest.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllLiquidityTiersRequest();
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
        return exports.QueryAllLiquidityTiersRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllLiquidityTiersRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllLiquidityTiersRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersRequest",
            value: exports.QueryAllLiquidityTiersRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllLiquidityTiersRequest.typeUrl, exports.QueryAllLiquidityTiersRequest);
function createBaseQueryAllLiquidityTiersResponse() {
    return {
        liquidityTiers: [],
        pagination: undefined
    };
}
exports.QueryAllLiquidityTiersResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryAllLiquidityTiersResponse.typeUrl || Array.isArray(o.liquidityTiers) && (!o.liquidityTiers.length || perpetual_1.LiquidityTier.is(o.liquidityTiers[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryAllLiquidityTiersResponse.typeUrl || Array.isArray(o.liquidity_tiers) && (!o.liquidity_tiers.length || perpetual_1.LiquidityTier.isSDK(o.liquidity_tiers[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryAllLiquidityTiersResponse.typeUrl || Array.isArray(o.liquidity_tiers) && (!o.liquidity_tiers.length || perpetual_1.LiquidityTier.isAmino(o.liquidity_tiers[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.liquidityTiers) {
            perpetual_1.LiquidityTier.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllLiquidityTiersResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.liquidityTiers.push(perpetual_1.LiquidityTier.decode(reader, reader.uint32()));
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
        const message = createBaseQueryAllLiquidityTiersResponse();
        message.liquidityTiers = object.liquidityTiers?.map(e => perpetual_1.LiquidityTier.fromPartial(e)) || [];
        message.pagination = object.pagination !== undefined && object.pagination !== null ? pagination_1.PageResponse.fromPartial(object.pagination) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryAllLiquidityTiersResponse();
        message.liquidityTiers = object.liquidity_tiers?.map(e => perpetual_1.LiquidityTier.fromAmino(e)) || [];
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromAmino(object.pagination);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.liquidityTiers) {
            obj.liquidity_tiers = message.liquidityTiers.map(e => e ? perpetual_1.LiquidityTier.toAmino(e) : undefined);
        }
        else {
            obj.liquidity_tiers = message.liquidityTiers;
        }
        obj.pagination = message.pagination ? pagination_1.PageResponse.toAmino(message.pagination) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryAllLiquidityTiersResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryAllLiquidityTiersResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryAllLiquidityTiersResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryAllLiquidityTiersResponse",
            value: exports.QueryAllLiquidityTiersResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryAllLiquidityTiersResponse.typeUrl, exports.QueryAllLiquidityTiersResponse);
function createBaseQueryPremiumVotesRequest() {
    return {};
}
exports.QueryPremiumVotesRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryPremiumVotesRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryPremiumVotesRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryPremiumVotesRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryPremiumVotesRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryPremiumVotesRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryPremiumVotesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesRequest",
            value: exports.QueryPremiumVotesRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryPremiumVotesRequest.typeUrl, exports.QueryPremiumVotesRequest);
function createBaseQueryPremiumVotesResponse() {
    return {
        premiumVotes: perpetual_1.PremiumStore.fromPartial({})
    };
}
exports.QueryPremiumVotesResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryPremiumVotesResponse.typeUrl || perpetual_1.PremiumStore.is(o.premiumVotes));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryPremiumVotesResponse.typeUrl || perpetual_1.PremiumStore.isSDK(o.premium_votes));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryPremiumVotesResponse.typeUrl || perpetual_1.PremiumStore.isAmino(o.premium_votes));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.premiumVotes !== undefined) {
            perpetual_1.PremiumStore.encode(message.premiumVotes, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPremiumVotesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.premiumVotes = perpetual_1.PremiumStore.decode(reader, reader.uint32());
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
        message.premiumVotes = object.premiumVotes !== undefined && object.premiumVotes !== null ? perpetual_1.PremiumStore.fromPartial(object.premiumVotes) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPremiumVotesResponse();
        if (object.premium_votes !== undefined && object.premium_votes !== null) {
            message.premiumVotes = perpetual_1.PremiumStore.fromAmino(object.premium_votes);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.premium_votes = message.premiumVotes ? perpetual_1.PremiumStore.toAmino(message.premiumVotes) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryPremiumVotesResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryPremiumVotesResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryPremiumVotesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPremiumVotesResponse",
            value: exports.QueryPremiumVotesResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryPremiumVotesResponse.typeUrl, exports.QueryPremiumVotesResponse);
function createBaseQueryPremiumSamplesRequest() {
    return {};
}
exports.QueryPremiumSamplesRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesRequest",
    is(o) {
        return o && o.$typeUrl === exports.QueryPremiumSamplesRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.QueryPremiumSamplesRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.QueryPremiumSamplesRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
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
        return exports.QueryPremiumSamplesRequest.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryPremiumSamplesRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryPremiumSamplesRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesRequest",
            value: exports.QueryPremiumSamplesRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryPremiumSamplesRequest.typeUrl, exports.QueryPremiumSamplesRequest);
function createBaseQueryPremiumSamplesResponse() {
    return {
        premiumSamples: perpetual_1.PremiumStore.fromPartial({})
    };
}
exports.QueryPremiumSamplesResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryPremiumSamplesResponse.typeUrl || perpetual_1.PremiumStore.is(o.premiumSamples));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryPremiumSamplesResponse.typeUrl || perpetual_1.PremiumStore.isSDK(o.premium_samples));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryPremiumSamplesResponse.typeUrl || perpetual_1.PremiumStore.isAmino(o.premium_samples));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.premiumSamples !== undefined) {
            perpetual_1.PremiumStore.encode(message.premiumSamples, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPremiumSamplesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.premiumSamples = perpetual_1.PremiumStore.decode(reader, reader.uint32());
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
        message.premiumSamples = object.premiumSamples !== undefined && object.premiumSamples !== null ? perpetual_1.PremiumStore.fromPartial(object.premiumSamples) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryPremiumSamplesResponse();
        if (object.premium_samples !== undefined && object.premium_samples !== null) {
            message.premiumSamples = perpetual_1.PremiumStore.fromAmino(object.premium_samples);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.premium_samples = message.premiumSamples ? perpetual_1.PremiumStore.toAmino(message.premiumSamples) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryPremiumSamplesResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryPremiumSamplesResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryPremiumSamplesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryPremiumSamplesResponse",
            value: exports.QueryPremiumSamplesResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryPremiumSamplesResponse.typeUrl, exports.QueryPremiumSamplesResponse);
function createBaseQueryParamsRequest() {
    return {};
}
exports.QueryParamsRequest = {
    typeUrl: "/klyraprotocol.perpetuals.QueryParamsRequest",
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
    fromProtoMsg(message) {
        return exports.QueryParamsRequest.decode(message.value);
    },
    toProto(message) {
        return exports.QueryParamsRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryParamsRequest",
            value: exports.QueryParamsRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryParamsRequest.typeUrl, exports.QueryParamsRequest);
function createBaseQueryParamsResponse() {
    return {
        params: params_1.Params.fromPartial({})
    };
}
exports.QueryParamsResponse = {
    typeUrl: "/klyraprotocol.perpetuals.QueryParamsResponse",
    is(o) {
        return o && (o.$typeUrl === exports.QueryParamsResponse.typeUrl || params_1.Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.QueryParamsResponse.typeUrl || params_1.Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.QueryParamsResponse.typeUrl || params_1.Params.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.params !== undefined) {
            params_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
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
                    message.params = params_1.Params.decode(reader, reader.uint32());
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
        message.params = object.params !== undefined && object.params !== null ? params_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseQueryParamsResponse();
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.params = message.params ? params_1.Params.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.QueryParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.QueryParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.QueryParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.QueryParamsResponse",
            value: exports.QueryParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.QueryParamsResponse.typeUrl, exports.QueryParamsResponse);
