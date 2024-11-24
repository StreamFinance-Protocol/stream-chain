//@ts-nocheck
import { Timestamp } from "../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { toTimestamp, fromTimestamp } from "../../helpers";
function createBaseBlockStats() {
    return {
        fills: []
    };
}
export const BlockStats = {
    typeUrl: "/klyraprotocol.stats.BlockStats",
    is(o) {
        return o && (o.$typeUrl === BlockStats.typeUrl || Array.isArray(o.fills) && (!o.fills.length || BlockStats_Fill.is(o.fills[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === BlockStats.typeUrl || Array.isArray(o.fills) && (!o.fills.length || BlockStats_Fill.isSDK(o.fills[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === BlockStats.typeUrl || Array.isArray(o.fills) && (!o.fills.length || BlockStats_Fill.isAmino(o.fills[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.fills) {
            BlockStats_Fill.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockStats();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fills.push(BlockStats_Fill.decode(reader, reader.uint32()));
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
        message.fills = object.fills?.map(e => BlockStats_Fill.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseBlockStats();
        message.fills = object.fills?.map(e => BlockStats_Fill.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.fills) {
            obj.fills = message.fills.map(e => e ? BlockStats_Fill.toAmino(e) : undefined);
        }
        else {
            obj.fills = message.fills;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return BlockStats.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return BlockStats.decode(message.value);
    },
    toProto(message) {
        return BlockStats.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.BlockStats",
            value: BlockStats.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(BlockStats.typeUrl, BlockStats);
function createBaseBlockStats_Fill() {
    return {
        taker: "",
        maker: "",
        notional: BigInt(0)
    };
}
export const BlockStats_Fill = {
    typeUrl: "/klyraprotocol.stats.Fill",
    is(o) {
        return o && (o.$typeUrl === BlockStats_Fill.typeUrl || typeof o.taker === "string" && typeof o.maker === "string" && typeof o.notional === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === BlockStats_Fill.typeUrl || typeof o.taker === "string" && typeof o.maker === "string" && typeof o.notional === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === BlockStats_Fill.typeUrl || typeof o.taker === "string" && typeof o.maker === "string" && typeof o.notional === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
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
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return BlockStats_Fill.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return BlockStats_Fill.decode(message.value);
    },
    toProto(message) {
        return BlockStats_Fill.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.Fill",
            value: BlockStats_Fill.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(BlockStats_Fill.typeUrl, BlockStats_Fill);
function createBaseStatsMetadata() {
    return {
        trailingEpoch: 0
    };
}
export const StatsMetadata = {
    typeUrl: "/klyraprotocol.stats.StatsMetadata",
    is(o) {
        return o && (o.$typeUrl === StatsMetadata.typeUrl || typeof o.trailingEpoch === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === StatsMetadata.typeUrl || typeof o.trailing_epoch === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === StatsMetadata.typeUrl || typeof o.trailing_epoch === "number");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.trailingEpoch !== 0) {
            writer.uint32(8).uint32(message.trailingEpoch);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return StatsMetadata.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return StatsMetadata.decode(message.value);
    },
    toProto(message) {
        return StatsMetadata.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.StatsMetadata",
            value: StatsMetadata.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(StatsMetadata.typeUrl, StatsMetadata);
function createBaseEpochStats() {
    return {
        epochEndTime: new Date(),
        stats: []
    };
}
export const EpochStats = {
    typeUrl: "/klyraprotocol.stats.EpochStats",
    is(o) {
        return o && (o.$typeUrl === EpochStats.typeUrl || Timestamp.is(o.epochEndTime) && Array.isArray(o.stats) && (!o.stats.length || EpochStats_UserWithStats.is(o.stats[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === EpochStats.typeUrl || Timestamp.isSDK(o.epoch_end_time) && Array.isArray(o.stats) && (!o.stats.length || EpochStats_UserWithStats.isSDK(o.stats[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === EpochStats.typeUrl || Timestamp.isAmino(o.epoch_end_time) && Array.isArray(o.stats) && (!o.stats.length || EpochStats_UserWithStats.isAmino(o.stats[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.epochEndTime !== undefined) {
            Timestamp.encode(toTimestamp(message.epochEndTime), writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.stats) {
            EpochStats_UserWithStats.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEpochStats();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.epochEndTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.stats.push(EpochStats_UserWithStats.decode(reader, reader.uint32()));
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
        message.stats = object.stats?.map(e => EpochStats_UserWithStats.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseEpochStats();
        if (object.epoch_end_time !== undefined && object.epoch_end_time !== null) {
            message.epochEndTime = fromTimestamp(Timestamp.fromAmino(object.epoch_end_time));
        }
        message.stats = object.stats?.map(e => EpochStats_UserWithStats.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.epoch_end_time = message.epochEndTime ? Timestamp.toAmino(toTimestamp(message.epochEndTime)) : undefined;
        if (message.stats) {
            obj.stats = message.stats.map(e => e ? EpochStats_UserWithStats.toAmino(e) : undefined);
        }
        else {
            obj.stats = message.stats;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return EpochStats.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return EpochStats.decode(message.value);
    },
    toProto(message) {
        return EpochStats.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.EpochStats",
            value: EpochStats.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(EpochStats.typeUrl, EpochStats);
function createBaseEpochStats_UserWithStats() {
    return {
        user: "",
        stats: undefined
    };
}
export const EpochStats_UserWithStats = {
    typeUrl: "/klyraprotocol.stats.UserWithStats",
    is(o) {
        return o && (o.$typeUrl === EpochStats_UserWithStats.typeUrl || typeof o.user === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === EpochStats_UserWithStats.typeUrl || typeof o.user === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === EpochStats_UserWithStats.typeUrl || typeof o.user === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.user !== "") {
            writer.uint32(10).string(message.user);
        }
        if (message.stats !== undefined) {
            UserStats.encode(message.stats, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEpochStats_UserWithStats();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.user = reader.string();
                    break;
                case 2:
                    message.stats = UserStats.decode(reader, reader.uint32());
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
        message.stats = object.stats !== undefined && object.stats !== null ? UserStats.fromPartial(object.stats) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseEpochStats_UserWithStats();
        if (object.user !== undefined && object.user !== null) {
            message.user = object.user;
        }
        if (object.stats !== undefined && object.stats !== null) {
            message.stats = UserStats.fromAmino(object.stats);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.user = message.user === "" ? undefined : message.user;
        obj.stats = message.stats ? UserStats.toAmino(message.stats) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return EpochStats_UserWithStats.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return EpochStats_UserWithStats.decode(message.value);
    },
    toProto(message) {
        return EpochStats_UserWithStats.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.UserWithStats",
            value: EpochStats_UserWithStats.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(EpochStats_UserWithStats.typeUrl, EpochStats_UserWithStats);
function createBaseGlobalStats() {
    return {
        notionalTraded: BigInt(0)
    };
}
export const GlobalStats = {
    typeUrl: "/klyraprotocol.stats.GlobalStats",
    is(o) {
        return o && (o.$typeUrl === GlobalStats.typeUrl || typeof o.notionalTraded === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === GlobalStats.typeUrl || typeof o.notional_traded === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === GlobalStats.typeUrl || typeof o.notional_traded === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.notionalTraded !== BigInt(0)) {
            writer.uint32(8).uint64(message.notionalTraded);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return GlobalStats.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return GlobalStats.decode(message.value);
    },
    toProto(message) {
        return GlobalStats.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.GlobalStats",
            value: GlobalStats.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(GlobalStats.typeUrl, GlobalStats);
function createBaseUserStats() {
    return {
        takerNotional: BigInt(0),
        makerNotional: BigInt(0)
    };
}
export const UserStats = {
    typeUrl: "/klyraprotocol.stats.UserStats",
    is(o) {
        return o && (o.$typeUrl === UserStats.typeUrl || typeof o.takerNotional === "bigint" && typeof o.makerNotional === "bigint");
    },
    isSDK(o) {
        return o && (o.$typeUrl === UserStats.typeUrl || typeof o.taker_notional === "bigint" && typeof o.maker_notional === "bigint");
    },
    isAmino(o) {
        return o && (o.$typeUrl === UserStats.typeUrl || typeof o.taker_notional === "bigint" && typeof o.maker_notional === "bigint");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.takerNotional !== BigInt(0)) {
            writer.uint32(8).uint64(message.takerNotional);
        }
        if (message.makerNotional !== BigInt(0)) {
            writer.uint32(16).uint64(message.makerNotional);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return UserStats.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return UserStats.decode(message.value);
    },
    toProto(message) {
        return UserStats.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.stats.UserStats",
            value: UserStats.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(UserStats.typeUrl, UserStats);
