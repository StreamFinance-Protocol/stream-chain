"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllDowntimeInfo_DowntimeInfo = exports.AllDowntimeInfo = exports.BlockInfo = void 0;
//@ts-nocheck
const timestamp_1 = require("../../google/protobuf/timestamp");
const duration_1 = require("../../google/protobuf/duration");
const binary_1 = require("../../binary");
const helpers_1 = require("../../helpers");
const registry_1 = require("../../registry");
function createBaseBlockInfo() {
    return {
        height: 0,
        timestamp: new Date()
    };
}
exports.BlockInfo = {
    typeUrl: "/klyraprotocol.blocktime.BlockInfo",
    is(o) {
        return o && (o.$typeUrl === exports.BlockInfo.typeUrl || typeof o.height === "number" && timestamp_1.Timestamp.is(o.timestamp));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.BlockInfo.typeUrl || typeof o.height === "number" && timestamp_1.Timestamp.isSDK(o.timestamp));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.BlockInfo.typeUrl || typeof o.height === "number" && timestamp_1.Timestamp.isAmino(o.timestamp));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.height !== 0) {
            writer.uint32(8).uint32(message.height);
        }
        if (message.timestamp !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.timestamp), writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.uint32();
                    break;
                case 2:
                    message.timestamp = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
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
            message.timestamp = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.timestamp));
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.height = message.height === 0 ? undefined : message.height;
        obj.timestamp = message.timestamp ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.timestamp)) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.BlockInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.BlockInfo.decode(message.value);
    },
    toProto(message) {
        return exports.BlockInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.BlockInfo",
            value: exports.BlockInfo.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.BlockInfo.typeUrl, exports.BlockInfo);
function createBaseAllDowntimeInfo() {
    return {
        infos: []
    };
}
exports.AllDowntimeInfo = {
    typeUrl: "/klyraprotocol.blocktime.AllDowntimeInfo",
    is(o) {
        return o && (o.$typeUrl === exports.AllDowntimeInfo.typeUrl || Array.isArray(o.infos) && (!o.infos.length || exports.AllDowntimeInfo_DowntimeInfo.is(o.infos[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.AllDowntimeInfo.typeUrl || Array.isArray(o.infos) && (!o.infos.length || exports.AllDowntimeInfo_DowntimeInfo.isSDK(o.infos[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.AllDowntimeInfo.typeUrl || Array.isArray(o.infos) && (!o.infos.length || exports.AllDowntimeInfo_DowntimeInfo.isAmino(o.infos[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.infos) {
            exports.AllDowntimeInfo_DowntimeInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAllDowntimeInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.infos.push(exports.AllDowntimeInfo_DowntimeInfo.decode(reader, reader.uint32()));
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
        message.infos = object.infos?.map(e => exports.AllDowntimeInfo_DowntimeInfo.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseAllDowntimeInfo();
        message.infos = object.infos?.map(e => exports.AllDowntimeInfo_DowntimeInfo.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.infos) {
            obj.infos = message.infos.map(e => e ? exports.AllDowntimeInfo_DowntimeInfo.toAmino(e) : undefined);
        }
        else {
            obj.infos = message.infos;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.AllDowntimeInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.AllDowntimeInfo.decode(message.value);
    },
    toProto(message) {
        return exports.AllDowntimeInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.AllDowntimeInfo",
            value: exports.AllDowntimeInfo.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.AllDowntimeInfo.typeUrl, exports.AllDowntimeInfo);
function createBaseAllDowntimeInfo_DowntimeInfo() {
    return {
        duration: duration_1.Duration.fromPartial({}),
        blockInfo: exports.BlockInfo.fromPartial({})
    };
}
exports.AllDowntimeInfo_DowntimeInfo = {
    typeUrl: "/klyraprotocol.blocktime.DowntimeInfo",
    is(o) {
        return o && (o.$typeUrl === exports.AllDowntimeInfo_DowntimeInfo.typeUrl || duration_1.Duration.is(o.duration) && exports.BlockInfo.is(o.blockInfo));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.AllDowntimeInfo_DowntimeInfo.typeUrl || duration_1.Duration.isSDK(o.duration) && exports.BlockInfo.isSDK(o.block_info));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.AllDowntimeInfo_DowntimeInfo.typeUrl || duration_1.Duration.isAmino(o.duration) && exports.BlockInfo.isAmino(o.block_info));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.duration !== undefined) {
            duration_1.Duration.encode(message.duration, writer.uint32(10).fork()).ldelim();
        }
        if (message.blockInfo !== undefined) {
            exports.BlockInfo.encode(message.blockInfo, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAllDowntimeInfo_DowntimeInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.duration = duration_1.Duration.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.blockInfo = exports.BlockInfo.decode(reader, reader.uint32());
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
        message.duration = object.duration !== undefined && object.duration !== null ? duration_1.Duration.fromPartial(object.duration) : undefined;
        message.blockInfo = object.blockInfo !== undefined && object.blockInfo !== null ? exports.BlockInfo.fromPartial(object.blockInfo) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseAllDowntimeInfo_DowntimeInfo();
        if (object.duration !== undefined && object.duration !== null) {
            message.duration = duration_1.Duration.fromAmino(object.duration);
        }
        if (object.block_info !== undefined && object.block_info !== null) {
            message.blockInfo = exports.BlockInfo.fromAmino(object.block_info);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.duration = message.duration ? duration_1.Duration.toAmino(message.duration) : undefined;
        obj.block_info = message.blockInfo ? exports.BlockInfo.toAmino(message.blockInfo) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.AllDowntimeInfo_DowntimeInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.AllDowntimeInfo_DowntimeInfo.decode(message.value);
    },
    toProto(message) {
        return exports.AllDowntimeInfo_DowntimeInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.blocktime.DowntimeInfo",
            value: exports.AllDowntimeInfo_DowntimeInfo.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.AllDowntimeInfo_DowntimeInfo.typeUrl, exports.AllDowntimeInfo_DowntimeInfo);
