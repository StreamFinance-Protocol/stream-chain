"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimiterCapacity = exports.DenomCapacity = void 0;
//@ts-nocheck
const limit_params_1 = require("./limit_params");
const binary_1 = require("../../binary");
const helpers_1 = require("../../helpers");
const registry_1 = require("../../registry");
function createBaseDenomCapacity() {
    return {
        denom: "",
        capacityList: []
    };
}
exports.DenomCapacity = {
    typeUrl: "/klyraprotocol.ratelimit.DenomCapacity",
    is(o) {
        return o && (o.$typeUrl === exports.DenomCapacity.typeUrl || typeof o.denom === "string" && Array.isArray(o.capacityList) && (!o.capacityList.length || o.capacityList[0] instanceof Uint8Array || typeof o.capacityList[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.DenomCapacity.typeUrl || typeof o.denom === "string" && Array.isArray(o.capacity_list) && (!o.capacity_list.length || o.capacity_list[0] instanceof Uint8Array || typeof o.capacity_list[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.DenomCapacity.typeUrl || typeof o.denom === "string" && Array.isArray(o.capacity_list) && (!o.capacity_list.length || o.capacity_list[0] instanceof Uint8Array || typeof o.capacity_list[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        for (const v of message.capacityList) {
            writer.uint32(18).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDenomCapacity();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
                    message.capacityList.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseDenomCapacity();
        message.denom = object.denom ?? "";
        message.capacityList = object.capacityList?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseDenomCapacity();
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = object.denom;
        }
        message.capacityList = object.capacity_list?.map(e => (0, helpers_1.bytesFromBase64)(e)) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.denom = message.denom === "" ? undefined : message.denom;
        if (message.capacityList) {
            obj.capacity_list = message.capacityList.map(e => (0, helpers_1.base64FromBytes)(e));
        }
        else {
            obj.capacity_list = message.capacityList;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.DenomCapacity.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.DenomCapacity.decode(message.value);
    },
    toProto(message) {
        return exports.DenomCapacity.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.DenomCapacity",
            value: exports.DenomCapacity.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.DenomCapacity.typeUrl, exports.DenomCapacity);
function createBaseLimiterCapacity() {
    return {
        limiter: limit_params_1.Limiter.fromPartial({}),
        capacity: new Uint8Array()
    };
}
exports.LimiterCapacity = {
    typeUrl: "/klyraprotocol.ratelimit.LimiterCapacity",
    is(o) {
        return o && (o.$typeUrl === exports.LimiterCapacity.typeUrl || limit_params_1.Limiter.is(o.limiter) && (o.capacity instanceof Uint8Array || typeof o.capacity === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.LimiterCapacity.typeUrl || limit_params_1.Limiter.isSDK(o.limiter) && (o.capacity instanceof Uint8Array || typeof o.capacity === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.LimiterCapacity.typeUrl || limit_params_1.Limiter.isAmino(o.limiter) && (o.capacity instanceof Uint8Array || typeof o.capacity === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.limiter !== undefined) {
            limit_params_1.Limiter.encode(message.limiter, writer.uint32(10).fork()).ldelim();
        }
        if (message.capacity.length !== 0) {
            writer.uint32(18).bytes(message.capacity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLimiterCapacity();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.limiter = limit_params_1.Limiter.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.capacity = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseLimiterCapacity();
        message.limiter = object.limiter !== undefined && object.limiter !== null ? limit_params_1.Limiter.fromPartial(object.limiter) : undefined;
        message.capacity = object.capacity ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseLimiterCapacity();
        if (object.limiter !== undefined && object.limiter !== null) {
            message.limiter = limit_params_1.Limiter.fromAmino(object.limiter);
        }
        if (object.capacity !== undefined && object.capacity !== null) {
            message.capacity = (0, helpers_1.bytesFromBase64)(object.capacity);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.limiter = message.limiter ? limit_params_1.Limiter.toAmino(message.limiter) : undefined;
        obj.capacity = message.capacity ? (0, helpers_1.base64FromBytes)(message.capacity) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.LimiterCapacity.fromAmino(object.value);
    },
    fromProtoMsg(message) {
        return exports.LimiterCapacity.decode(message.value);
    },
    toProto(message) {
        return exports.LimiterCapacity.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/klyraprotocol.ratelimit.LimiterCapacity",
            value: exports.LimiterCapacity.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.LimiterCapacity.typeUrl, exports.LimiterCapacity);
