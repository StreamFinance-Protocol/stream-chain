"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStats = exports.GlobalStats = exports.EpochStats_UserWithStats = exports.EpochStats = exports.StatsMetadata = exports.BlockStats_Fill = exports.BlockStats = void 0;
//@ts-nocheck
const timestamp_1 = require("../../google/protobuf/timestamp");
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
const helpers_1 = require("../../helpers");
function createBaseBlockStats() {
    return {
        fills: []
    };
}
exports.BlockStats = {
    typeUrl: "/klyraprotocol.stats.BlockStats",
    is(o) {
        return o && (o.$typeUrl === exports.BlockStats.typeUrl || Array.isArray(o.fills) && (!o.fills.length || exports.BlockStats_Fill.is(o.fills[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.BlockStats.typeUrl || Array.isArray(o.fills) && (!o.fills.length || exports.BlockStats_Fill.isSDK(o.fills[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.BlockStats.typeUrl || Array.isArray(o.fills) && (!o.fills.length || exports.BlockStats_Fill.isAmino(o.fills[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.fills) {
            exports.BlockStats_Fill.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockStats();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fills.push(exports.BlockStats_Fill.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseBlockStats();
        message.fills = object.fills?.map(e => exports.BlockStats_Fill.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseBlockStats();
        message.fills = object.fills?.map(e => exports.BlockStats_Fill.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.fills) {
            obj.fills = message.fills.map(e => e ? exports.BlockStats_Fill.toAmino(e) : undefined);
        }
        else {
            obj.fills = message.fills;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.BlockStats.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.BlockStats.decode(message.value);
    },
    toProto(message) {
        return exports.BlockStats.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.BlockStats",
            value: exports.BlockStats.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.BlockStats.typeUrl, exports.BlockStats);
function createBaseBlockStats_Fill() {
    return {
        taker: "",
        maker: "",
        notional: BigInt(0)
    };
}
exports.BlockStats_Fill = {
    typeUrl: "/klyraprotocol.stats.Fill",
    is(o) {
        return o && (o.$typeUrl === exports.BlockStats_Fill.typeUrl || typeof o.taker === "string" && typeof o.maker === "string" && typeof o.notional === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.BlockStats_Fill.typeUrl || typeof o.taker === "string" && typeof o.maker === "string" && typeof o.notional === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.BlockStats_Fill.typeUrl || typeof o.taker === "string" && typeof o.maker === "string" && typeof o.notional === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.taker !== "") {
            writer.uint32(10).string(message.taker);
        }
        if (message.maker !== "") {
            writer.uint32(18).string(message.maker);
        }
        if (message.notional !== BigInt(0)) {
            writer.uint32(24).uint64(message.notional);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockStats_Fill();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.taker = reader.string();
                    break;
                case 2:
                    message.maker = reader.string();
                    break;
                case 3:
                    message.notional = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseBlockStats_Fill();
        message.taker = object.taker ?? "";
        message.maker = object.maker ?? "";
        message.notional = object.notional !== undefined && object.notional !== null ? BigInt(object.notional.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseBlockStats_Fill();
        if (object.taker !== undefined && object.taker !== null) {
            message.taker = object.taker;
        }
        if (object.maker !== undefined && object.maker !== null) {
            message.maker = object.maker;
        }
        if (object.notional !== undefined && object.notional !== null) {
            message.notional = BigInt(object.notional);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.taker = message.taker === "" ? undefined : message.taker;
        obj.maker = message.maker === "" ? undefined : message.maker;
        obj.notional = message.notional !== BigInt(0) ? message.notional?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.BlockStats_Fill.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.BlockStats_Fill.decode(message.value);
    },
    toProto(message) {
        return exports.BlockStats_Fill.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.Fill",
            value: exports.BlockStats_Fill.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.BlockStats_Fill.typeUrl, exports.BlockStats_Fill);
function createBaseStatsMetadata() {
    return {
        trailingEpoch: 0
    };
}
exports.StatsMetadata = {
    typeUrl: "/klyraprotocol.stats.StatsMetadata",
    is(o) {
        return o && (o.$typeUrl === exports.StatsMetadata.typeUrl || typeof o.trailingEpoch === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.StatsMetadata.typeUrl || typeof o.trailing_epoch === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.StatsMetadata.typeUrl || typeof o.trailing_epoch === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.trailingEpoch !== 0) {
            writer.uint32(8).uint32(message.trailingEpoch);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatsMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.trailingEpoch = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStatsMetadata();
        message.trailingEpoch = object.trailingEpoch ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseStatsMetadata();
        if (object.trailing_epoch !== undefined && object.trailing_epoch !== null) {
            message.trailingEpoch = object.trailing_epoch;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.trailing_epoch = message.trailingEpoch === 0 ? undefined : message.trailingEpoch;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StatsMetadata.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.StatsMetadata.decode(message.value);
    },
    toProto(message) {
        return exports.StatsMetadata.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.StatsMetadata",
            value: exports.StatsMetadata.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StatsMetadata.typeUrl, exports.StatsMetadata);
function createBaseEpochStats() {
    return {
        epochEndTime: new Date(),
        stats: []
    };
}
exports.EpochStats = {
    typeUrl: "/klyraprotocol.stats.EpochStats",
    is(o) {
        return o && (o.$typeUrl === exports.EpochStats.typeUrl || timestamp_1.Timestamp.is(o.epochEndTime) && Array.isArray(o.stats) && (!o.stats.length || exports.EpochStats_UserWithStats.is(o.stats[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.EpochStats.typeUrl || timestamp_1.Timestamp.isSDK(o.epoch_end_time) && Array.isArray(o.stats) && (!o.stats.length || exports.EpochStats_UserWithStats.isSDK(o.stats[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.EpochStats.typeUrl || timestamp_1.Timestamp.isAmino(o.epoch_end_time) && Array.isArray(o.stats) && (!o.stats.length || exports.EpochStats_UserWithStats.isAmino(o.stats[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.epochEndTime !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.epochEndTime), writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.stats) {
            exports.EpochStats_UserWithStats.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEpochStats();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.epochEndTime = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.stats.push(exports.EpochStats_UserWithStats.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseEpochStats();
        message.epochEndTime = object.epochEndTime ?? undefined;
        message.stats = object.stats?.map(e => exports.EpochStats_UserWithStats.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseEpochStats();
        if (object.epoch_end_time !== undefined && object.epoch_end_time !== null) {
            message.epochEndTime = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.epoch_end_time));
        }
        message.stats = object.stats?.map(e => exports.EpochStats_UserWithStats.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.epoch_end_time = message.epochEndTime ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.epochEndTime)) : undefined;
        if (message.stats) {
            obj.stats = message.stats.map(e => e ? exports.EpochStats_UserWithStats.toAmino(e) : undefined);
        }
        else {
            obj.stats = message.stats;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.EpochStats.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.EpochStats.decode(message.value);
    },
    toProto(message) {
        return exports.EpochStats.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.EpochStats",
            value: exports.EpochStats.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.EpochStats.typeUrl, exports.EpochStats);
function createBaseEpochStats_UserWithStats() {
    return {
        user: "",
        stats: undefined
    };
}
exports.EpochStats_UserWithStats = {
    typeUrl: "/klyraprotocol.stats.UserWithStats",
    is(o) {
        return o && (o.$typeUrl === exports.EpochStats_UserWithStats.typeUrl || typeof o.user === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.EpochStats_UserWithStats.typeUrl || typeof o.user === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.EpochStats_UserWithStats.typeUrl || typeof o.user === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.user !== "") {
            writer.uint32(10).string(message.user);
        }
        if (message.stats !== undefined) {
            exports.UserStats.encode(message.stats, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEpochStats_UserWithStats();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.user = reader.string();
                    break;
                case 2:
                    message.stats = exports.UserStats.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseEpochStats_UserWithStats();
        message.user = object.user ?? "";
        message.stats = object.stats !== undefined && object.stats !== null ? exports.UserStats.fromPartial(object.stats) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseEpochStats_UserWithStats();
        if (object.user !== undefined && object.user !== null) {
            message.user = object.user;
        }
        if (object.stats !== undefined && object.stats !== null) {
            message.stats = exports.UserStats.fromAmino(object.stats);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.user = message.user === "" ? undefined : message.user;
        obj.stats = message.stats ? exports.UserStats.toAmino(message.stats) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.EpochStats_UserWithStats.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.EpochStats_UserWithStats.decode(message.value);
    },
    toProto(message) {
        return exports.EpochStats_UserWithStats.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.UserWithStats",
            value: exports.EpochStats_UserWithStats.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.EpochStats_UserWithStats.typeUrl, exports.EpochStats_UserWithStats);
function createBaseGlobalStats() {
    return {
        notionalTraded: BigInt(0)
    };
}
exports.GlobalStats = {
    typeUrl: "/klyraprotocol.stats.GlobalStats",
    is(o) {
        return o && (o.$typeUrl === exports.GlobalStats.typeUrl || typeof o.notionalTraded === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GlobalStats.typeUrl || typeof o.notional_traded === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GlobalStats.typeUrl || typeof o.notional_traded === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.notionalTraded !== BigInt(0)) {
            writer.uint32(8).uint64(message.notionalTraded);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGlobalStats();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.notionalTraded = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGlobalStats();
        message.notionalTraded = object.notionalTraded !== undefined && object.notionalTraded !== null ? BigInt(object.notionalTraded.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseGlobalStats();
        if (object.notional_traded !== undefined && object.notional_traded !== null) {
            message.notionalTraded = BigInt(object.notional_traded);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.notional_traded = message.notionalTraded !== BigInt(0) ? message.notionalTraded?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GlobalStats.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.GlobalStats.decode(message.value);
    },
    toProto(message) {
        return exports.GlobalStats.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.GlobalStats",
            value: exports.GlobalStats.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GlobalStats.typeUrl, exports.GlobalStats);
function createBaseUserStats() {
    return {
        takerNotional: BigInt(0),
        makerNotional: BigInt(0)
    };
}
exports.UserStats = {
    typeUrl: "/klyraprotocol.stats.UserStats",
    is(o) {
        return o && (o.$typeUrl === exports.UserStats.typeUrl || typeof o.takerNotional === "bigint" && typeof o.makerNotional === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.UserStats.typeUrl || typeof o.taker_notional === "bigint" && typeof o.maker_notional === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.UserStats.typeUrl || typeof o.taker_notional === "bigint" && typeof o.maker_notional === "bigint");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.takerNotional !== BigInt(0)) {
            writer.uint32(8).uint64(message.takerNotional);
        }
        if (message.makerNotional !== BigInt(0)) {
            writer.uint32(16).uint64(message.makerNotional);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUserStats();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.takerNotional = reader.uint64();
                    break;
                case 2:
                    message.makerNotional = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseUserStats();
        message.takerNotional = object.takerNotional !== undefined && object.takerNotional !== null ? BigInt(object.takerNotional.toString()) : BigInt(0);
        message.makerNotional = object.makerNotional !== undefined && object.makerNotional !== null ? BigInt(object.makerNotional.toString()) : BigInt(0);
        return message;
    },
    fromAmino(object) {
        const message = createBaseUserStats();
        if (object.taker_notional !== undefined && object.taker_notional !== null) {
            message.takerNotional = BigInt(object.taker_notional);
        }
        if (object.maker_notional !== undefined && object.maker_notional !== null) {
            message.makerNotional = BigInt(object.maker_notional);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.taker_notional = message.takerNotional !== BigInt(0) ? message.takerNotional?.toString() : undefined;
        obj.maker_notional = message.makerNotional !== BigInt(0) ? message.makerNotional?.toString() : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.UserStats.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.UserStats.decode(message.value);
    },
    toProto(message) {
        return exports.UserStats.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.UserStats",
            value: exports.UserStats.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.UserStats.typeUrl, exports.UserStats);
