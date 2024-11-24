//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
function createBaseEquityTierLimitConfiguration() {
    return {
        shortTermOrderEquityTiers: [],
        statefulOrderEquityTiers: []
    };
}
export const EquityTierLimitConfiguration = {
    typeUrl: "/klyraprotocol.clob.EquityTierLimitConfiguration",
    is(o) {
        return o && (o.$typeUrl === EquityTierLimitConfiguration.typeUrl || Array.isArray(o.shortTermOrderEquityTiers) && (!o.shortTermOrderEquityTiers.length || EquityTierLimit.is(o.shortTermOrderEquityTiers[0])) && Array.isArray(o.statefulOrderEquityTiers) && (!o.statefulOrderEquityTiers.length || EquityTierLimit.is(o.statefulOrderEquityTiers[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === EquityTierLimitConfiguration.typeUrl || Array.isArray(o.short_term_order_equity_tiers) && (!o.short_term_order_equity_tiers.length || EquityTierLimit.isSDK(o.short_term_order_equity_tiers[0])) && Array.isArray(o.stateful_order_equity_tiers) && (!o.stateful_order_equity_tiers.length || EquityTierLimit.isSDK(o.stateful_order_equity_tiers[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === EquityTierLimitConfiguration.typeUrl || Array.isArray(o.short_term_order_equity_tiers) && (!o.short_term_order_equity_tiers.length || EquityTierLimit.isAmino(o.short_term_order_equity_tiers[0])) && Array.isArray(o.stateful_order_equity_tiers) && (!o.stateful_order_equity_tiers.length || EquityTierLimit.isAmino(o.stateful_order_equity_tiers[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.shortTermOrderEquityTiers) {
            EquityTierLimit.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.statefulOrderEquityTiers) {
            EquityTierLimit.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEquityTierLimitConfiguration();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.shortTermOrderEquityTiers.push(EquityTierLimit.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.statefulOrderEquityTiers.push(EquityTierLimit.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseEquityTierLimitConfiguration();
        message.shortTermOrderEquityTiers = object.shortTermOrderEquityTiers?.map(e => EquityTierLimit.fromPartial(e)) || [];
        message.statefulOrderEquityTiers = object.statefulOrderEquityTiers?.map(e => EquityTierLimit.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseEquityTierLimitConfiguration();
        message.shortTermOrderEquityTiers = object.short_term_order_equity_tiers?.map(e => EquityTierLimit.fromAmino(e)) || [];
        message.statefulOrderEquityTiers = object.stateful_order_equity_tiers?.map(e => EquityTierLimit.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.shortTermOrderEquityTiers) {
            obj.short_term_order_equity_tiers = message.shortTermOrderEquityTiers.map(e => e ? EquityTierLimit.toAmino(e) : undefined);
        }
        else {
            obj.short_term_order_equity_tiers = message.shortTermOrderEquityTiers;
        }
        if (message.statefulOrderEquityTiers) {
            obj.stateful_order_equity_tiers = message.statefulOrderEquityTiers.map(e => e ? EquityTierLimit.toAmino(e) : undefined);
        }
        else {
            obj.stateful_order_equity_tiers = message.statefulOrderEquityTiers;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return EquityTierLimitConfiguration.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return EquityTierLimitConfiguration.decode(message.value);
    },
    toProto(message) {
        return EquityTierLimitConfiguration.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.EquityTierLimitConfiguration",
            value: EquityTierLimitConfiguration.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(EquityTierLimitConfiguration.typeUrl, EquityTierLimitConfiguration);
function createBaseEquityTierLimit() {
    return {
        usdTncRequired: new Uint8Array(),
        limit: 0
    };
}
export const EquityTierLimit = {
    typeUrl: "/klyraprotocol.clob.EquityTierLimit",
    is(o) {
        return o && (o.$typeUrl === EquityTierLimit.typeUrl || (o.usdTncRequired instanceof Uint8Array || typeof o.usdTncRequired === "string") && typeof o.limit === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === EquityTierLimit.typeUrl || (o.usd_tnc_required instanceof Uint8Array || typeof o.usd_tnc_required === "string") && typeof o.limit === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === EquityTierLimit.typeUrl || (o.usd_tnc_required instanceof Uint8Array || typeof o.usd_tnc_required === "string") && typeof o.limit === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.usdTncRequired.length !== 0) {
            writer.uint32(10).bytes(message.usdTncRequired);
        }
        if (message.limit !== 0) {
            writer.uint32(16).uint32(message.limit);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEquityTierLimit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.usdTncRequired = reader.bytes();
                    break;
                case 2:
                    message.limit = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseEquityTierLimit();
        message.usdTncRequired = object.usdTncRequired ?? new Uint8Array();
        message.limit = object.limit ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseEquityTierLimit();
        if (object.usd_tnc_required !== undefined && object.usd_tnc_required !== null) {
            message.usdTncRequired = bytesFromBase64(object.usd_tnc_required);
        }
        if (object.limit !== undefined && object.limit !== null) {
            message.limit = object.limit;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.usd_tnc_required = message.usdTncRequired ? base64FromBytes(message.usdTncRequired) : undefined;
        obj.limit = message.limit === 0 ? undefined : message.limit;
        return obj;
    },
    fromAminoMsg(object) {
        return EquityTierLimit.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return EquityTierLimit.decode(message.value);
    },
    toProto(message) {
        return EquityTierLimit.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.EquityTierLimit",
            value: EquityTierLimit.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(EquityTierLimit.typeUrl, EquityTierLimit);
