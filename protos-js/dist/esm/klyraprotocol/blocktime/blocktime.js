//@ts-nocheck
import { Timestamp } from "../../google/protobuf/timestamp";
import { Duration } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp } from "../../helpers";
import { GlobalDecoderRegistry } from "../../registry";
function createBaseBlockInfo() {
    return {
        height: 0,
        timestamp: new Date()
    };
}
export const BlockInfo = {
    typeUrl: "/klyraprotocol.blocktime.BlockInfo",
    is(o) {
        return o && (o.$typeUrl === BlockInfo.typeUrl || typeof o.height === "number" && Timestamp.is(o.timestamp));
    },
    isSDK(o) {
        return o && (o.$typeUrl === BlockInfo.typeUrl || typeof o.height === "number" && Timestamp.isSDK(o.timestamp));
    },
    isAmino(o) {
        return o && (o.$typeUrl === BlockInfo.typeUrl || typeof o.height === "number" && Timestamp.isAmino(o.timestamp));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.height !== 0) {
            writer.uint32(8).uint32(message.height);
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.uint32();
                    break;
                case 2:
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseBlockInfo();
        message.height = object.height ?? 0;
        message.timestamp = object.timestamp ?? undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseBlockInfo();
        if (object.height !== undefined && object.height !== null) {
            message.height = object.height;
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = fromTimestamp(Timestamp.fromAmino(object.timestamp));
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.height = message.height === 0 ? undefined : message.height;
        obj.timestamp = message.timestamp ? Timestamp.toAmino(toTimestamp(message.timestamp)) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return BlockInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return BlockInfo.decode(message.value);
    },
    toProto(message) {
        return BlockInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.BlockInfo",
            value: BlockInfo.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(BlockInfo.typeUrl, BlockInfo);
function createBaseAllDowntimeInfo() {
    return {
        infos: []
    };
}
export const AllDowntimeInfo = {
    typeUrl: "/klyraprotocol.blocktime.AllDowntimeInfo",
    is(o) {
        return o && (o.$typeUrl === AllDowntimeInfo.typeUrl || Array.isArray(o.infos) && (!o.infos.length || AllDowntimeInfo_DowntimeInfo.is(o.infos[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === AllDowntimeInfo.typeUrl || Array.isArray(o.infos) && (!o.infos.length || AllDowntimeInfo_DowntimeInfo.isSDK(o.infos[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === AllDowntimeInfo.typeUrl || Array.isArray(o.infos) && (!o.infos.length || AllDowntimeInfo_DowntimeInfo.isAmino(o.infos[0])));
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.infos) {
            AllDowntimeInfo_DowntimeInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAllDowntimeInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.infos.push(AllDowntimeInfo_DowntimeInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAllDowntimeInfo();
        message.infos = object.infos?.map(e => AllDowntimeInfo_DowntimeInfo.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseAllDowntimeInfo();
        message.infos = object.infos?.map(e => AllDowntimeInfo_DowntimeInfo.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.infos) {
            obj.infos = message.infos.map(e => e ? AllDowntimeInfo_DowntimeInfo.toAmino(e) : undefined);
        }
        else {
            obj.infos = message.infos;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return AllDowntimeInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return AllDowntimeInfo.decode(message.value);
    },
    toProto(message) {
        return AllDowntimeInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.AllDowntimeInfo",
            value: AllDowntimeInfo.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AllDowntimeInfo.typeUrl, AllDowntimeInfo);
function createBaseAllDowntimeInfo_DowntimeInfo() {
    return {
        duration: Duration.fromPartial({}),
        blockInfo: BlockInfo.fromPartial({})
    };
}
export const AllDowntimeInfo_DowntimeInfo = {
    typeUrl: "/klyraprotocol.blocktime.DowntimeInfo",
    is(o) {
        return o && (o.$typeUrl === AllDowntimeInfo_DowntimeInfo.typeUrl || Duration.is(o.duration) && BlockInfo.is(o.blockInfo));
    },
    isSDK(o) {
        return o && (o.$typeUrl === AllDowntimeInfo_DowntimeInfo.typeUrl || Duration.isSDK(o.duration) && BlockInfo.isSDK(o.block_info));
    },
    isAmino(o) {
        return o && (o.$typeUrl === AllDowntimeInfo_DowntimeInfo.typeUrl || Duration.isAmino(o.duration) && BlockInfo.isAmino(o.block_info));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.duration !== undefined) {
            Duration.encode(message.duration, writer.uint32(10).fork()).ldelim();
        }
        if (message.blockInfo !== undefined) {
            BlockInfo.encode(message.blockInfo, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAllDowntimeInfo_DowntimeInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.duration = Duration.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.blockInfo = BlockInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseAllDowntimeInfo_DowntimeInfo();
        message.duration = object.duration !== undefined && object.duration !== null ? Duration.fromPartial(object.duration) : undefined;
        message.blockInfo = object.blockInfo !== undefined && object.blockInfo !== null ? BlockInfo.fromPartial(object.blockInfo) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseAllDowntimeInfo_DowntimeInfo();
        if (object.duration !== undefined && object.duration !== null) {
            message.duration = Duration.fromAmino(object.duration);
        }
        if (object.block_info !== undefined && object.block_info !== null) {
            message.blockInfo = BlockInfo.fromAmino(object.block_info);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.duration = message.duration ? Duration.toAmino(message.duration) : undefined;
        obj.block_info = message.blockInfo ? BlockInfo.toAmino(message.blockInfo) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return AllDowntimeInfo_DowntimeInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return AllDowntimeInfo_DowntimeInfo.decode(message.value);
    },
    toProto(message) {
        return AllDowntimeInfo_DowntimeInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.DowntimeInfo",
            value: AllDowntimeInfo_DowntimeInfo.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(AllDowntimeInfo_DowntimeInfo.typeUrl, AllDowntimeInfo_DowntimeInfo);
