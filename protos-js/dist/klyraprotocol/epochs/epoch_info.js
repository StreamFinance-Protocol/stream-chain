"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpochInfo = void 0;
//@ts-nocheck
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseEpochInfo() {
    return {
        name: "",
        nextTick: 0,
        duration: 0,
        currentEpoch: 0,
        currentEpochStartBlock: 0,
        isInitialized: false,
        fastForwardNextTick: false
    };
}
exports.EpochInfo = {
    typeUrl: "/klyraprotocol.epochs.EpochInfo",
    is(o) {
        return o && (o.$typeUrl === exports.EpochInfo.typeUrl || typeof o.name === "string" && typeof o.nextTick === "number" && typeof o.duration === "number" && typeof o.currentEpoch === "number" && typeof o.currentEpochStartBlock === "number" && typeof o.isInitialized === "boolean" && typeof o.fastForwardNextTick === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.EpochInfo.typeUrl || typeof o.name === "string" && typeof o.next_tick === "number" && typeof o.duration === "number" && typeof o.current_epoch === "number" && typeof o.current_epoch_start_block === "number" && typeof o.is_initialized === "boolean" && typeof o.fast_forward_next_tick === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.EpochInfo.typeUrl || typeof o.name === "string" && typeof o.next_tick === "number" && typeof o.duration === "number" && typeof o.current_epoch === "number" && typeof o.current_epoch_start_block === "number" && typeof o.is_initialized === "boolean" && typeof o.fast_forward_next_tick === "boolean");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.nextTick !== 0) {
            writer.uint32(16).uint32(message.nextTick);
        }
        if (message.duration !== 0) {
            writer.uint32(24).uint32(message.duration);
        }
        if (message.currentEpoch !== 0) {
            writer.uint32(32).uint32(message.currentEpoch);
        }
        if (message.currentEpochStartBlock !== 0) {
            writer.uint32(40).uint32(message.currentEpochStartBlock);
        }
        if (message.isInitialized === true) {
            writer.uint32(48).bool(message.isInitialized);
        }
        if (message.fastForwardNextTick === true) {
            writer.uint32(56).bool(message.fastForwardNextTick);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEpochInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.nextTick = reader.uint32();
                    break;
                case 3:
                    message.duration = reader.uint32();
                    break;
                case 4:
                    message.currentEpoch = reader.uint32();
                    break;
                case 5:
                    message.currentEpochStartBlock = reader.uint32();
                    break;
                case 6:
                    message.isInitialized = reader.bool();
                    break;
                case 7:
                    message.fastForwardNextTick = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseEpochInfo();
        message.name = object.name ?? "";
        message.nextTick = object.nextTick ?? 0;
        message.duration = object.duration ?? 0;
        message.currentEpoch = object.currentEpoch ?? 0;
        message.currentEpochStartBlock = object.currentEpochStartBlock ?? 0;
        message.isInitialized = object.isInitialized ?? false;
        message.fastForwardNextTick = object.fastForwardNextTick ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseEpochInfo();
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        if (object.next_tick !== undefined && object.next_tick !== null) {
            message.nextTick = object.next_tick;
        }
        if (object.duration !== undefined && object.duration !== null) {
            message.duration = object.duration;
        }
        if (object.current_epoch !== undefined && object.current_epoch !== null) {
            message.currentEpoch = object.current_epoch;
        }
        if (object.current_epoch_start_block !== undefined && object.current_epoch_start_block !== null) {
            message.currentEpochStartBlock = object.current_epoch_start_block;
        }
        if (object.is_initialized !== undefined && object.is_initialized !== null) {
            message.isInitialized = object.is_initialized;
        }
        if (object.fast_forward_next_tick !== undefined && object.fast_forward_next_tick !== null) {
            message.fastForwardNextTick = object.fast_forward_next_tick;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.name = message.name === "" ? undefined : message.name;
        obj.next_tick = message.nextTick === 0 ? undefined : message.nextTick;
        obj.duration = message.duration === 0 ? undefined : message.duration;
        obj.current_epoch = message.currentEpoch === 0 ? undefined : message.currentEpoch;
        obj.current_epoch_start_block = message.currentEpochStartBlock === 0 ? undefined : message.currentEpochStartBlock;
        obj.is_initialized = message.isInitialized === false ? undefined : message.isInitialized;
        obj.fast_forward_next_tick = message.fastForwardNextTick === false ? undefined : message.fastForwardNextTick;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.EpochInfo.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.EpochInfo.decode(message.value);
    },
    toProto(message) {
        return exports.EpochInfo.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.epochs.EpochInfo",
            value: exports.EpochInfo.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.EpochInfo.typeUrl, exports.EpochInfo);
