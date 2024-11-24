//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
import { GlobalDecoderRegistry } from "../../registry";
function createBasePricePair() {
    return {
        marketId: 0,
        spotPrice: new Uint8Array(),
        pnlPrice: new Uint8Array()
    };
}
export const PricePair = {
    typeUrl: "/klyraprotocol.ve.PricePair",
    is(o) {
        return o && (o.$typeUrl === PricePair.typeUrl || typeof o.marketId === "number" && (o.spotPrice instanceof Uint8Array || typeof o.spotPrice === "string") && (o.pnlPrice instanceof Uint8Array || typeof o.pnlPrice === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === PricePair.typeUrl || typeof o.market_id === "number" && (o.spot_price instanceof Uint8Array || typeof o.spot_price === "string") && (o.pnl_price instanceof Uint8Array || typeof o.pnl_price === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === PricePair.typeUrl || typeof o.market_id === "number" && (o.spot_price instanceof Uint8Array || typeof o.spot_price === "string") && (o.pnl_price instanceof Uint8Array || typeof o.pnl_price === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.marketId !== 0) {
            writer.uint32(8).uint32(message.marketId);
        }
        if (message.spotPrice.length !== 0) {
            writer.uint32(18).bytes(message.spotPrice);
        }
        if (message.pnlPrice.length !== 0) {
            writer.uint32(26).bytes(message.pnlPrice);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePricePair();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.marketId = reader.uint32();
                    break;
                case 2:
                    message.spotPrice = reader.bytes();
                    break;
                case 3:
                    message.pnlPrice = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePricePair();
        message.marketId = object.marketId ?? 0;
        message.spotPrice = object.spotPrice ?? new Uint8Array();
        message.pnlPrice = object.pnlPrice ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBasePricePair();
        if (object.market_id !== undefined && object.market_id !== null) {
            message.marketId = object.market_id;
        }
        if (object.spot_price !== undefined && object.spot_price !== null) {
            message.spotPrice = bytesFromBase64(object.spot_price);
        }
        if (object.pnl_price !== undefined && object.pnl_price !== null) {
            message.pnlPrice = bytesFromBase64(object.pnl_price);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.market_id = message.marketId === 0 ? undefined : message.marketId;
        obj.spot_price = message.spotPrice ? base64FromBytes(message.spotPrice) : undefined;
        obj.pnl_price = message.pnlPrice ? base64FromBytes(message.pnlPrice) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return PricePair.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return PricePair.decode(message.value);
    },
    toProto(message) {
        return PricePair.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ve.PricePair",
            value: PricePair.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(PricePair.typeUrl, PricePair);
function createBaseDaemonVoteExtension() {
    return {
        prices: [],
        sDaiConversionRate: ""
    };
}
export const DaemonVoteExtension = {
    typeUrl: "/klyraprotocol.ve.DaemonVoteExtension",
    is(o) {
        return o && (o.$typeUrl === DaemonVoteExtension.typeUrl || Array.isArray(o.prices) && (!o.prices.length || PricePair.is(o.prices[0])) && typeof o.sDaiConversionRate === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === DaemonVoteExtension.typeUrl || Array.isArray(o.prices) && (!o.prices.length || PricePair.isSDK(o.prices[0])) && typeof o.s_dai_conversion_rate === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === DaemonVoteExtension.typeUrl || Array.isArray(o.prices) && (!o.prices.length || PricePair.isAmino(o.prices[0])) && typeof o.s_dai_conversion_rate === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.prices) {
            PricePair.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.sDaiConversionRate !== "") {
            writer.uint32(18).string(message.sDaiConversionRate);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDaemonVoteExtension();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.prices.push(PricePair.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.sDaiConversionRate = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDaemonVoteExtension();
        message.prices = object.prices?.map(e => PricePair.fromPartial(e)) || [];
        message.sDaiConversionRate = object.sDaiConversionRate ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseDaemonVoteExtension();
        message.prices = object.prices?.map(e => PricePair.fromAmino(e)) || [];
        if (object.s_dai_conversion_rate !== undefined && object.s_dai_conversion_rate !== null) {
            message.sDaiConversionRate = object.s_dai_conversion_rate;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.prices) {
            obj.prices = message.prices.map(e => e ? PricePair.toAmino(e) : undefined);
        }
        else {
            obj.prices = message.prices;
        }
        obj.s_dai_conversion_rate = message.sDaiConversionRate === "" ? undefined : message.sDaiConversionRate;
        return obj;
    },
    fromAminoMsg(object) {
        return DaemonVoteExtension.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return DaemonVoteExtension.decode(message.value);
    },
    toProto(message) {
        return DaemonVoteExtension.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ve.DaemonVoteExtension",
            value: DaemonVoteExtension.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(DaemonVoteExtension.typeUrl, DaemonVoteExtension);
