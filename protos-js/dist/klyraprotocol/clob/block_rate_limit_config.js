"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxPerNBlocksRateLimit = exports.BlockRateLimitConfiguration = void 0;
//@ts-nocheck
const binary_1 = require("../../binary");
const registry_1 = require("../../registry");
function createBaseBlockRateLimitConfiguration() {
    return {
        maxShortTermOrdersPerNBlocks: [],
        maxStatefulOrdersPerNBlocks: [],
        maxShortTermOrderCancellationsPerNBlocks: [],
        maxShortTermOrdersAndCancelsPerNBlocks: []
    };
}
exports.BlockRateLimitConfiguration = {
    typeUrl: "/klyraprotocol.clob.BlockRateLimitConfiguration",
    is(o) {
        return o && (o.$typeUrl === exports.BlockRateLimitConfiguration.typeUrl || Array.isArray(o.maxShortTermOrdersPerNBlocks) && (!o.maxShortTermOrdersPerNBlocks.length || exports.MaxPerNBlocksRateLimit.is(o.maxShortTermOrdersPerNBlocks[0])) && Array.isArray(o.maxStatefulOrdersPerNBlocks) && (!o.maxStatefulOrdersPerNBlocks.length || exports.MaxPerNBlocksRateLimit.is(o.maxStatefulOrdersPerNBlocks[0])) && Array.isArray(o.maxShortTermOrderCancellationsPerNBlocks) && (!o.maxShortTermOrderCancellationsPerNBlocks.length || exports.MaxPerNBlocksRateLimit.is(o.maxShortTermOrderCancellationsPerNBlocks[0])) && Array.isArray(o.maxShortTermOrdersAndCancelsPerNBlocks) && (!o.maxShortTermOrdersAndCancelsPerNBlocks.length || exports.MaxPerNBlocksRateLimit.is(o.maxShortTermOrdersAndCancelsPerNBlocks[0])));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.BlockRateLimitConfiguration.typeUrl || Array.isArray(o.max_short_term_orders_per_n_blocks) && (!o.max_short_term_orders_per_n_blocks.length || exports.MaxPerNBlocksRateLimit.isSDK(o.max_short_term_orders_per_n_blocks[0])) && Array.isArray(o.max_stateful_orders_per_n_blocks) && (!o.max_stateful_orders_per_n_blocks.length || exports.MaxPerNBlocksRateLimit.isSDK(o.max_stateful_orders_per_n_blocks[0])) && Array.isArray(o.max_short_term_order_cancellations_per_n_blocks) && (!o.max_short_term_order_cancellations_per_n_blocks.length || exports.MaxPerNBlocksRateLimit.isSDK(o.max_short_term_order_cancellations_per_n_blocks[0])) && Array.isArray(o.max_short_term_orders_and_cancels_per_n_blocks) && (!o.max_short_term_orders_and_cancels_per_n_blocks.length || exports.MaxPerNBlocksRateLimit.isSDK(o.max_short_term_orders_and_cancels_per_n_blocks[0])));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.BlockRateLimitConfiguration.typeUrl || Array.isArray(o.max_short_term_orders_per_n_blocks) && (!o.max_short_term_orders_per_n_blocks.length || exports.MaxPerNBlocksRateLimit.isAmino(o.max_short_term_orders_per_n_blocks[0])) && Array.isArray(o.max_stateful_orders_per_n_blocks) && (!o.max_stateful_orders_per_n_blocks.length || exports.MaxPerNBlocksRateLimit.isAmino(o.max_stateful_orders_per_n_blocks[0])) && Array.isArray(o.max_short_term_order_cancellations_per_n_blocks) && (!o.max_short_term_order_cancellations_per_n_blocks.length || exports.MaxPerNBlocksRateLimit.isAmino(o.max_short_term_order_cancellations_per_n_blocks[0])) && Array.isArray(o.max_short_term_orders_and_cancels_per_n_blocks) && (!o.max_short_term_orders_and_cancels_per_n_blocks.length || exports.MaxPerNBlocksRateLimit.isAmino(o.max_short_term_orders_and_cancels_per_n_blocks[0])));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.maxShortTermOrdersPerNBlocks) {
            exports.MaxPerNBlocksRateLimit.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.maxStatefulOrdersPerNBlocks) {
            exports.MaxPerNBlocksRateLimit.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.maxShortTermOrderCancellationsPerNBlocks) {
            exports.MaxPerNBlocksRateLimit.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.maxShortTermOrdersAndCancelsPerNBlocks) {
            exports.MaxPerNBlocksRateLimit.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockRateLimitConfiguration();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxShortTermOrdersPerNBlocks.push(exports.MaxPerNBlocksRateLimit.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.maxStatefulOrdersPerNBlocks.push(exports.MaxPerNBlocksRateLimit.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.maxShortTermOrderCancellationsPerNBlocks.push(exports.MaxPerNBlocksRateLimit.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.maxShortTermOrdersAndCancelsPerNBlocks.push(exports.MaxPerNBlocksRateLimit.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseBlockRateLimitConfiguration();
        message.maxShortTermOrdersPerNBlocks = object.maxShortTermOrdersPerNBlocks?.map(e => exports.MaxPerNBlocksRateLimit.fromPartial(e)) || [];
        message.maxStatefulOrdersPerNBlocks = object.maxStatefulOrdersPerNBlocks?.map(e => exports.MaxPerNBlocksRateLimit.fromPartial(e)) || [];
        message.maxShortTermOrderCancellationsPerNBlocks = object.maxShortTermOrderCancellationsPerNBlocks?.map(e => exports.MaxPerNBlocksRateLimit.fromPartial(e)) || [];
        message.maxShortTermOrdersAndCancelsPerNBlocks = object.maxShortTermOrdersAndCancelsPerNBlocks?.map(e => exports.MaxPerNBlocksRateLimit.fromPartial(e)) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseBlockRateLimitConfiguration();
        message.maxShortTermOrdersPerNBlocks = object.max_short_term_orders_per_n_blocks?.map(e => exports.MaxPerNBlocksRateLimit.fromAmino(e)) || [];
        message.maxStatefulOrdersPerNBlocks = object.max_stateful_orders_per_n_blocks?.map(e => exports.MaxPerNBlocksRateLimit.fromAmino(e)) || [];
        message.maxShortTermOrderCancellationsPerNBlocks = object.max_short_term_order_cancellations_per_n_blocks?.map(e => exports.MaxPerNBlocksRateLimit.fromAmino(e)) || [];
        message.maxShortTermOrdersAndCancelsPerNBlocks = object.max_short_term_orders_and_cancels_per_n_blocks?.map(e => exports.MaxPerNBlocksRateLimit.fromAmino(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.maxShortTermOrdersPerNBlocks) {
            obj.max_short_term_orders_per_n_blocks = message.maxShortTermOrdersPerNBlocks.map(e => e ? exports.MaxPerNBlocksRateLimit.toAmino(e) : undefined);
        }
        else {
            obj.max_short_term_orders_per_n_blocks = message.maxShortTermOrdersPerNBlocks;
        }
        if (message.maxStatefulOrdersPerNBlocks) {
            obj.max_stateful_orders_per_n_blocks = message.maxStatefulOrdersPerNBlocks.map(e => e ? exports.MaxPerNBlocksRateLimit.toAmino(e) : undefined);
        }
        else {
            obj.max_stateful_orders_per_n_blocks = message.maxStatefulOrdersPerNBlocks;
        }
        if (message.maxShortTermOrderCancellationsPerNBlocks) {
            obj.max_short_term_order_cancellations_per_n_blocks = message.maxShortTermOrderCancellationsPerNBlocks.map(e => e ? exports.MaxPerNBlocksRateLimit.toAmino(e) : undefined);
        }
        else {
            obj.max_short_term_order_cancellations_per_n_blocks = message.maxShortTermOrderCancellationsPerNBlocks;
        }
        if (message.maxShortTermOrdersAndCancelsPerNBlocks) {
            obj.max_short_term_orders_and_cancels_per_n_blocks = message.maxShortTermOrdersAndCancelsPerNBlocks.map(e => e ? exports.MaxPerNBlocksRateLimit.toAmino(e) : undefined);
        }
        else {
            obj.max_short_term_orders_and_cancels_per_n_blocks = message.maxShortTermOrdersAndCancelsPerNBlocks;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.BlockRateLimitConfiguration.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.BlockRateLimitConfiguration.decode(message.value);
    },
    toProto(message) {
        return exports.BlockRateLimitConfiguration.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.BlockRateLimitConfiguration",
            value: exports.BlockRateLimitConfiguration.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.BlockRateLimitConfiguration.typeUrl, exports.BlockRateLimitConfiguration);
function createBaseMaxPerNBlocksRateLimit() {
    return {
        numBlocks: 0,
        limit: 0
    };
}
exports.MaxPerNBlocksRateLimit = {
    typeUrl: "/klyraprotocol.clob.MaxPerNBlocksRateLimit",
    is(o) {
        return o && (o.$typeUrl === exports.MaxPerNBlocksRateLimit.typeUrl || typeof o.numBlocks === "number" && typeof o.limit === "number");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MaxPerNBlocksRateLimit.typeUrl || typeof o.num_blocks === "number" && typeof o.limit === "number");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MaxPerNBlocksRateLimit.typeUrl || typeof o.num_blocks === "number" && typeof o.limit === "number");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.numBlocks !== 0) {
            writer.uint32(8).uint32(message.numBlocks);
        }
        if (message.limit !== 0) {
            writer.uint32(16).uint32(message.limit);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMaxPerNBlocksRateLimit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.numBlocks = reader.uint32();
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
        const message = createBaseMaxPerNBlocksRateLimit();
        message.numBlocks = object.numBlocks ?? 0;
        message.limit = object.limit ?? 0;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMaxPerNBlocksRateLimit();
        if (object.num_blocks !== undefined && object.num_blocks !== null) {
            message.numBlocks = object.num_blocks;
        }
        if (object.limit !== undefined && object.limit !== null) {
            message.limit = object.limit;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.num_blocks = message.numBlocks === 0 ? undefined : message.numBlocks;
        obj.limit = message.limit === 0 ? undefined : message.limit;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MaxPerNBlocksRateLimit.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.MaxPerNBlocksRateLimit.decode(message.value);
    },
    toProto(message) {
        return exports.MaxPerNBlocksRateLimit.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.clob.MaxPerNBlocksRateLimit",
            value: exports.MaxPerNBlocksRateLimit.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MaxPerNBlocksRateLimit.typeUrl, exports.MaxPerNBlocksRateLimit);
