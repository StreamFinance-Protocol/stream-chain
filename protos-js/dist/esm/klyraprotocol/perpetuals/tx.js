//@ts-nocheck
import { PerpetualParams, LiquidityTier } from "./perpetual";
import { Params } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseMsgCreatePerpetual() {
    return {
        authority: "",
        params: PerpetualParams.fromPartial({})
    };
}
export const MsgCreatePerpetual = {
    typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
    is(o) {
        return o && (o.$typeUrl === MsgCreatePerpetual.typeUrl || typeof o.authority === "string" && PerpetualParams.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgCreatePerpetual.typeUrl || typeof o.authority === "string" && PerpetualParams.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgCreatePerpetual.typeUrl || typeof o.authority === "string" && PerpetualParams.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            PerpetualParams.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreatePerpetual();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.params = PerpetualParams.decode(reader, reader.uint32());
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
        message.params = object.params !== undefined && object.params !== null ? PerpetualParams.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCreatePerpetual();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = PerpetualParams.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? PerpetualParams.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgCreatePerpetual.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgCreatePerpetual.decode(message.value);
    },
    toProto(message) {
        return MsgCreatePerpetual.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetual",
            value: MsgCreatePerpetual.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCreatePerpetual.typeUrl, MsgCreatePerpetual);
function createBaseMsgCreatePerpetualResponse() {
    return {};
}
export const MsgCreatePerpetualResponse = {
    typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetualResponse",
    is(o) {
        return o && o.$typeUrl === MsgCreatePerpetualResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgCreatePerpetualResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgCreatePerpetualResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgCreatePerpetualResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgCreatePerpetualResponse.decode(message.value);
    },
    toProto(message) {
        return MsgCreatePerpetualResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgCreatePerpetualResponse",
            value: MsgCreatePerpetualResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgCreatePerpetualResponse.typeUrl, MsgCreatePerpetualResponse);
function createBaseMsgSetLiquidityTier() {
    return {
        authority: "",
        liquidityTier: LiquidityTier.fromPartial({})
    };
}
export const MsgSetLiquidityTier = {
    typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
    is(o) {
        return o && (o.$typeUrl === MsgSetLiquidityTier.typeUrl || typeof o.authority === "string" && LiquidityTier.is(o.liquidityTier));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgSetLiquidityTier.typeUrl || typeof o.authority === "string" && LiquidityTier.isSDK(o.liquidity_tier));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgSetLiquidityTier.typeUrl || typeof o.authority === "string" && LiquidityTier.isAmino(o.liquidity_tier));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.liquidityTier !== undefined) {
            LiquidityTier.encode(message.liquidityTier, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetLiquidityTier();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.liquidityTier = LiquidityTier.decode(reader, reader.uint32());
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
        message.liquidityTier = object.liquidityTier !== undefined && object.liquidityTier !== null ? LiquidityTier.fromPartial(object.liquidityTier) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSetLiquidityTier();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.liquidity_tier !== undefined && object.liquidity_tier !== null) {
            message.liquidityTier = LiquidityTier.fromAmino(object.liquidity_tier);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.liquidity_tier = message.liquidityTier ? LiquidityTier.toAmino(message.liquidityTier) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgSetLiquidityTier.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgSetLiquidityTier.decode(message.value);
    },
    toProto(message) {
        return MsgSetLiquidityTier.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTier",
            value: MsgSetLiquidityTier.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgSetLiquidityTier.typeUrl, MsgSetLiquidityTier);
function createBaseMsgSetLiquidityTierResponse() {
    return {};
}
export const MsgSetLiquidityTierResponse = {
    typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse",
    is(o) {
        return o && o.$typeUrl === MsgSetLiquidityTierResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgSetLiquidityTierResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgSetLiquidityTierResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgSetLiquidityTierResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgSetLiquidityTierResponse.decode(message.value);
    },
    toProto(message) {
        return MsgSetLiquidityTierResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgSetLiquidityTierResponse",
            value: MsgSetLiquidityTierResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgSetLiquidityTierResponse.typeUrl, MsgSetLiquidityTierResponse);
function createBaseMsgUpdatePerpetualParams() {
    return {
        authority: "",
        perpetualParams: PerpetualParams.fromPartial({})
    };
}
export const MsgUpdatePerpetualParams = {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
    is(o) {
        return o && (o.$typeUrl === MsgUpdatePerpetualParams.typeUrl || typeof o.authority === "string" && PerpetualParams.is(o.perpetualParams));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUpdatePerpetualParams.typeUrl || typeof o.authority === "string" && PerpetualParams.isSDK(o.perpetual_params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUpdatePerpetualParams.typeUrl || typeof o.authority === "string" && PerpetualParams.isAmino(o.perpetual_params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.perpetualParams !== undefined) {
            PerpetualParams.encode(message.perpetualParams, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdatePerpetualParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.perpetualParams = PerpetualParams.decode(reader, reader.uint32());
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
        message.perpetualParams = object.perpetualParams !== undefined && object.perpetualParams !== null ? PerpetualParams.fromPartial(object.perpetualParams) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdatePerpetualParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.perpetual_params !== undefined && object.perpetual_params !== null) {
            message.perpetualParams = PerpetualParams.fromAmino(object.perpetual_params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.perpetual_params = message.perpetualParams ? PerpetualParams.toAmino(message.perpetualParams) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdatePerpetualParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdatePerpetualParams.decode(message.value);
    },
    toProto(message) {
        return MsgUpdatePerpetualParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParams",
            value: MsgUpdatePerpetualParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdatePerpetualParams.typeUrl, MsgUpdatePerpetualParams);
function createBaseMsgUpdatePerpetualParamsResponse() {
    return {};
}
export const MsgUpdatePerpetualParamsResponse = {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse",
    is(o) {
        return o && o.$typeUrl === MsgUpdatePerpetualParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgUpdatePerpetualParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgUpdatePerpetualParamsResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgUpdatePerpetualParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdatePerpetualParamsResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUpdatePerpetualParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgUpdatePerpetualParamsResponse",
            value: MsgUpdatePerpetualParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdatePerpetualParamsResponse.typeUrl, MsgUpdatePerpetualParamsResponse);
function createBaseFundingPremium() {
    return {
        perpetualId: 0,
        premiumPpm: 0
    };
}
export const FundingPremium = {
    typeUrl: "/klyraprotocol.perpetuals.FundingPremium",
    is(o) {
        return o && (o.$typeUrl === FundingPremium.typeUrl || typeof o.perpetualId === "number" && typeof o.premiumPpm === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === FundingPremium.typeUrl || typeof o.perpetual_id === "number" && typeof o.premium_ppm === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === FundingPremium.typeUrl || typeof o.perpetual_id === "number" && typeof o.premium_ppm === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.perpetualId !== 0) {
            writer.uint32(8).uint32(message.perpetualId);
        }
        if (message.premiumPpm !== 0) {
            writer.uint32(16).int32(message.premiumPpm);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return FundingPremium.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return FundingPremium.decode(message.value);
    },
    toProto(message) {
        return FundingPremium.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.FundingPremium",
            value: FundingPremium.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(FundingPremium.typeUrl, FundingPremium);
function createBaseMsgAddPremiumVotes() {
    return {
        votes: []
    };
}
export const MsgAddPremiumVotes = {
    typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
    is(o) {
        return o && (o.$typeUrl === MsgAddPremiumVotes.typeUrl || Array.isArray(o.votes) && (!o.votes.length || FundingPremium.is(o.votes[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgAddPremiumVotes.typeUrl || Array.isArray(o.votes) && (!o.votes.length || FundingPremium.isSDK(o.votes[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgAddPremiumVotes.typeUrl || Array.isArray(o.votes) && (!o.votes.length || FundingPremium.isAmino(o.votes[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.votes) {
            FundingPremium.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAddPremiumVotes();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.votes.push(FundingPremium.decode(reader, reader.uint32()));
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
        message.votes = object.votes?.map(e => FundingPremium.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgAddPremiumVotes();
        message.votes = object.votes?.map(e => FundingPremium.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.votes) {
            obj.votes = message.votes.map(e => e ? FundingPremium.toAmino(e) : undefined);
        }
        else {
            obj.votes = message.votes;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return MsgAddPremiumVotes.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgAddPremiumVotes.decode(message.value);
    },
    toProto(message) {
        return MsgAddPremiumVotes.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotes",
            value: MsgAddPremiumVotes.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgAddPremiumVotes.typeUrl, MsgAddPremiumVotes);
function createBaseMsgAddPremiumVotesResponse() {
    return {};
}
export const MsgAddPremiumVotesResponse = {
    typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse",
    is(o) {
        return o && o.$typeUrl === MsgAddPremiumVotesResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgAddPremiumVotesResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgAddPremiumVotesResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgAddPremiumVotesResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgAddPremiumVotesResponse.decode(message.value);
    },
    toProto(message) {
        return MsgAddPremiumVotesResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgAddPremiumVotesResponse",
            value: MsgAddPremiumVotesResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgAddPremiumVotesResponse.typeUrl, MsgAddPremiumVotesResponse);
function createBaseMsgUpdateParams() {
    return {
        authority: "",
        params: Params.fromPartial({})
    };
}
export const MsgUpdateParams = {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams",
    is(o) {
        return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isAmino(o.params));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
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
        const message = createBaseMsgUpdateParams();
        message.authority = object.authority ?? "";
        message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateParams();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.params = message.params ? Params.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return MsgUpdateParams.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateParams.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateParams.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParams",
            value: MsgUpdateParams.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateParams.typeUrl, MsgUpdateParams);
function createBaseMsgUpdateParamsResponse() {
    return {};
}
export const MsgUpdateParamsResponse = {
    typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParamsResponse",
    is(o) {
        return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return MsgUpdateParamsResponse.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return MsgUpdateParamsResponse.decode(message.value);
    },
    toProto(message) {
        return MsgUpdateParamsResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.perpetuals.MsgUpdateParamsResponse",
            value: MsgUpdateParamsResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(MsgUpdateParamsResponse.typeUrl, MsgUpdateParamsResponse);
