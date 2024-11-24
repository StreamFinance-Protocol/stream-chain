"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgUpdateParamsResponse = exports.MsgUpdateParams = exports.MsgAddPremiumVotesResponse = exports.MsgAddPremiumVotes = exports.FundingPremium = exports.MsgUpdatePerpetualParamsResponse = exports.MsgUpdatePerpetualParams = exports.MsgSetLiquidityTierResponse = exports.MsgSetLiquidityTier = exports.MsgCreatePerpetualResponse = exports.MsgCreatePerpetual = void 0;
//@ts-nocheck
const perpetual_1 = require("./perpetual");
const params_1 = require("./params");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseMsgCreatePerpetual() {
    return {
        authority: "",
        params: perpetual_1.PerpetualParams.fromPartial({})
    };
}
exports.MsgCreatePerpetual = {
    typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
    is(o) {
        return o && (o.$typeUrl === exports.MsgCreatePerpetual.typeUrl || typeof o.authority === "string" && perpetual_1.PerpetualParams.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgCreatePerpetual.typeUrl || typeof o.authority === "string" && perpetual_1.PerpetualParams.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgCreatePerpetual.typeUrl || typeof o.authority === "string" && perpetual_1.PerpetualParams.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            perpetual_1.PerpetualParams.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreatePerpetual();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.params = perpetual_1.PerpetualParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgCreatePerpetual();
        message.authority = object.authority ?? "";
        message.params = object.params !== undefined && object.params !== null ? perpetual_1.PerpetualParams.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCreatePerpetual();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = perpetual_1.PerpetualParams.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? perpetual_1.PerpetualParams.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgCreatePerpetual.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgCreatePerpetual.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCreatePerpetual.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
            value: exports.MsgCreatePerpetual.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCreatePerpetual.typeUrl, exports.MsgCreatePerpetual);
function createBaseMsgCreatePerpetualResponse() {
    return {};
}
exports.MsgCreatePerpetualResponse = {
    typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetualResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgCreatePerpetualResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgCreatePerpetualResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgCreatePerpetualResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreatePerpetualResponse();
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
        const message = createBaseMsgCreatePerpetualResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgCreatePerpetualResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgCreatePerpetualResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgCreatePerpetualResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCreatePerpetualResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetualResponse",
            value: exports.MsgCreatePerpetualResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCreatePerpetualResponse.typeUrl, exports.MsgCreatePerpetualResponse);
function createBaseMsgSetLiquidityTier() {
    return {
        authority: "",
        liquidityTier: perpetual_1.LiquidityTier.fromPartial({})
    };
}
exports.MsgSetLiquidityTier = {
    typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
    is(o) {
        return o && (o.$typeUrl === exports.MsgSetLiquidityTier.typeUrl || typeof o.authority === "string" && perpetual_1.LiquidityTier.is(o.liquidityTier));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgSetLiquidityTier.typeUrl || typeof o.authority === "string" && perpetual_1.LiquidityTier.isSDK(o.liquidity_tier));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgSetLiquidityTier.typeUrl || typeof o.authority === "string" && perpetual_1.LiquidityTier.isAmino(o.liquidity_tier));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.liquidityTier !== undefined) {
            perpetual_1.LiquidityTier.encode(message.liquidityTier, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetLiquidityTier();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.liquidityTier = perpetual_1.LiquidityTier.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgSetLiquidityTier();
        message.authority = object.authority ?? "";
        message.liquidityTier = object.liquidityTier !== undefined && object.liquidityTier !== null ? perpetual_1.LiquidityTier.fromPartial(object.liquidityTier) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSetLiquidityTier();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.liquidity_tier !== undefined && object.liquidity_tier !== null) {
            message.liquidityTier = perpetual_1.LiquidityTier.fromAmino(object.liquidity_tier);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.liquidity_tier = message.liquidityTier ? perpetual_1.LiquidityTier.toAmino(message.liquidityTier) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSetLiquidityTier.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgSetLiquidityTier.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSetLiquidityTier.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
            value: exports.MsgSetLiquidityTier.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSetLiquidityTier.typeUrl, exports.MsgSetLiquidityTier);
function createBaseMsgSetLiquidityTierResponse() {
    return {};
}
exports.MsgSetLiquidityTierResponse = {
    typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgSetLiquidityTierResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgSetLiquidityTierResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgSetLiquidityTierResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetLiquidityTierResponse();
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
        const message = createBaseMsgSetLiquidityTierResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgSetLiquidityTierResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSetLiquidityTierResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgSetLiquidityTierResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSetLiquidityTierResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse",
            value: exports.MsgSetLiquidityTierResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSetLiquidityTierResponse.typeUrl, exports.MsgSetLiquidityTierResponse);
function createBaseMsgUpdatePerpetualParams() {
    return {
        authority: "",
        perpetualParams: perpetual_1.PerpetualParams.fromPartial({})
    };
}
exports.MsgUpdatePerpetualParams = {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpdatePerpetualParams.typeUrl || typeof o.authority === "string" && perpetual_1.PerpetualParams.is(o.perpetualParams));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpdatePerpetualParams.typeUrl || typeof o.authority === "string" && perpetual_1.PerpetualParams.isSDK(o.perpetual_params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpdatePerpetualParams.typeUrl || typeof o.authority === "string" && perpetual_1.PerpetualParams.isAmino(o.perpetual_params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.perpetualParams !== undefined) {
            perpetual_1.PerpetualParams.encode(message.perpetualParams, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdatePerpetualParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.perpetualParams = perpetual_1.PerpetualParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdatePerpetualParams();
        message.authority = object.authority ?? "";
        message.perpetualParams = object.perpetualParams !== undefined && object.perpetualParams !== null ? perpetual_1.PerpetualParams.fromPartial(object.perpetualParams) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdatePerpetualParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.perpetual_params !== undefined && object.perpetual_params !== null) {
            message.perpetualParams = perpetual_1.PerpetualParams.fromAmino(object.perpetual_params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.perpetual_params = message.perpetualParams ? perpetual_1.PerpetualParams.toAmino(message.perpetualParams) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdatePerpetualParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdatePerpetualParams.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdatePerpetualParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
            value: exports.MsgUpdatePerpetualParams.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdatePerpetualParams.typeUrl, exports.MsgUpdatePerpetualParams);
function createBaseMsgUpdatePerpetualParamsResponse() {
    return {};
}
exports.MsgUpdatePerpetualParamsResponse = {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpdatePerpetualParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpdatePerpetualParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpdatePerpetualParamsResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdatePerpetualParamsResponse();
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
        const message = createBaseMsgUpdatePerpetualParamsResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdatePerpetualParamsResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdatePerpetualParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdatePerpetualParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdatePerpetualParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse",
            value: exports.MsgUpdatePerpetualParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdatePerpetualParamsResponse.typeUrl, exports.MsgUpdatePerpetualParamsResponse);
function createBaseFundingPremium() {
    return {
        perpetualId: 0,
        premiumPpm: 0
    };
}
exports.FundingPremium = {
    typeUrl: "/klyraprotocol.perpetuals.FundingPremium",
    is(o) {
        return o && (o.$typeUrl === exports.FundingPremium.typeUrl || typeof o.perpetualId === "number" && typeof o.premiumPpm === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.FundingPremium.typeUrl || typeof o.perpetual_id === "number" && typeof o.premium_ppm === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.FundingPremium.typeUrl || typeof o.perpetual_id === "number" && typeof o.premium_ppm === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.perpetualId !== 0) {
            writer.uint32(8).uint32(message.perpetualId);
        }
        if (message.premiumPpm !== 0) {
            writer.uint32(16).int32(message.premiumPpm);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFundingPremium();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.perpetualId = reader.uint32();
                    break;
                case 2:
                    message.premiumPpm = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseFundingPremium();
        message.perpetualId = object.perpetualId ?? 0;
        message.premiumPpm = object.premiumPpm ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseFundingPremium();
        if (object.perpetual_id !== undefined && object.perpetual_id !== null) {
            message.perpetualId = object.perpetual_id;
        }
        if (object.premium_ppm !== undefined && object.premium_ppm !== null) {
            message.premiumPpm = object.premium_ppm;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.perpetual_id = message.perpetualId === 0 ? undefined : message.perpetualId;
        obj.premium_ppm = message.premiumPpm === 0 ? undefined : message.premiumPpm;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.FundingPremium.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.FundingPremium.decode(message.value);
    },
    toProto(message) {
        return exports.FundingPremium.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.FundingPremium",
            value: exports.FundingPremium.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.FundingPremium.typeUrl, exports.FundingPremium);
function createBaseMsgAddPremiumVotes() {
    return {
        votes: []
    };
}
exports.MsgAddPremiumVotes = {
    typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
    is(o) {
        return o && (o.$typeUrl === exports.MsgAddPremiumVotes.typeUrl || Array.isArray(o.votes) && (!o.votes.length || exports.FundingPremium.is(o.votes[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgAddPremiumVotes.typeUrl || Array.isArray(o.votes) && (!o.votes.length || exports.FundingPremium.isSDK(o.votes[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgAddPremiumVotes.typeUrl || Array.isArray(o.votes) && (!o.votes.length || exports.FundingPremium.isAmino(o.votes[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.votes) {
            exports.FundingPremium.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAddPremiumVotes();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.votes.push(exports.FundingPremium.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgAddPremiumVotes();
        message.votes = object.votes?.map(e => exports.FundingPremium.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgAddPremiumVotes();
        message.votes = object.votes?.map(e => exports.FundingPremium.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.votes) {
            obj.votes = message.votes.map(e => e ? exports.FundingPremium.toAmino(e) : undefined);
        }
        else {
            obj.votes = message.votes;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgAddPremiumVotes.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgAddPremiumVotes.decode(message.value);
    },
    toProto(message) {
        return exports.MsgAddPremiumVotes.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
            value: exports.MsgAddPremiumVotes.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgAddPremiumVotes.typeUrl, exports.MsgAddPremiumVotes);
function createBaseMsgAddPremiumVotesResponse() {
    return {};
}
exports.MsgAddPremiumVotesResponse = {
    typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgAddPremiumVotesResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgAddPremiumVotesResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgAddPremiumVotesResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAddPremiumVotesResponse();
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
        const message = createBaseMsgAddPremiumVotesResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgAddPremiumVotesResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgAddPremiumVotesResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgAddPremiumVotesResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgAddPremiumVotesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse",
            value: exports.MsgAddPremiumVotesResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgAddPremiumVotesResponse.typeUrl, exports.MsgAddPremiumVotesResponse);
function createBaseMsgUpdateParams() {
    return {
        authority: "",
        params: params_1.Params.fromPartial({})
    };
}
exports.MsgUpdateParams = {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpdateParams.typeUrl || typeof o.authority === "string" && params_1.Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpdateParams.typeUrl || typeof o.authority === "string" && params_1.Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpdateParams.typeUrl || typeof o.authority === "string" && params_1.Params.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            params_1.Params.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
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
        const message = createBaseMsgUpdateParams();
        message.authority = object.authority ?? "";
        message.params = object.params !== undefined && object.params !== null ? params_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? params_1.Params.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateParams.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams",
            value: exports.MsgUpdateParams.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateParams.typeUrl, exports.MsgUpdateParams);
function createBaseMsgUpdateParamsResponse() {
    return {};
}
exports.MsgUpdateParamsResponse = {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParamsResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpdateParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpdateParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpdateParamsResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParamsResponse();
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
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateParamsResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParamsResponse",
            value: exports.MsgUpdateParamsResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateParamsResponse.typeUrl, exports.MsgUpdateParamsResponse);
