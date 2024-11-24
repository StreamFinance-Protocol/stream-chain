"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
//@ts-nocheck
const binary_1 = require("../../../../binary");
const registry_1 = require("../../../../registry");
function createBaseModule() {
    return {
        hooksOrder: [],
        authority: "",
        bech32PrefixValidator: "",
        bech32PrefixConsensus: ""
    };
}
exports.Module = {
    typeUrl: "/cosmos.staking.module.v1.Module",
    aminoType: "cosmos-sdk/Module",
    is(o) {
        return o && (o.$typeUrl === exports.Module.typeUrl || Array.isArray(o.hooksOrder) && (!o.hooksOrder.length || typeof o.hooksOrder[0] === "string") && typeof o.authority === "string" && typeof o.bech32PrefixValidator === "string" && typeof o.bech32PrefixConsensus === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Module.typeUrl || Array.isArray(o.hooks_order) && (!o.hooks_order.length || typeof o.hooks_order[0] === "string") && typeof o.authority === "string" && typeof o.bech32_prefix_validator === "string" && typeof o.bech32_prefix_consensus === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Module.typeUrl || Array.isArray(o.hooks_order) && (!o.hooks_order.length || typeof o.hooks_order[0] === "string") && typeof o.authority === "string" && typeof o.bech32_prefix_validator === "string" && typeof o.bech32_prefix_consensus === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.hooksOrder) {
            writer.uint32(10).string(v);
        }
        if (message.authority !== "") {
            writer.uint32(18).string(message.authority);
        }
        if (message.bech32PrefixValidator !== "") {
            writer.uint32(26).string(message.bech32PrefixValidator);
        }
        if (message.bech32PrefixConsensus !== "") {
            writer.uint32(34).string(message.bech32PrefixConsensus);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModule();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hooksOrder.push(reader.string());
                    break;
                case 2:
                    message.authority = reader.string();
                    break;
                case 3:
                    message.bech32PrefixValidator = reader.string();
                    break;
                case 4:
                    message.bech32PrefixConsensus = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseModule();
        message.hooksOrder = object.hooksOrder?.map(e => e) || [];
        message.authority = object.authority ?? "";
        message.bech32PrefixValidator = object.bech32PrefixValidator ?? "";
        message.bech32PrefixConsensus = object.bech32PrefixConsensus ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseModule();
        message.hooksOrder = object.hooks_order?.map(e => e) || [];
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        if (object.bech32_prefix_validator !== undefined && object.bech32_prefix_validator !== null) {
            message.bech32PrefixValidator = object.bech32_prefix_validator;
        }
        if (object.bech32_prefix_consensus !== undefined && object.bech32_prefix_consensus !== null) {
            message.bech32PrefixConsensus = object.bech32_prefix_consensus;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.hooksOrder) {
            obj.hooks_order = message.hooksOrder.map(e => e);
        }
        else {
            obj.hooks_order = message.hooksOrder;
        }
        obj.authority = message.authority === "" ? undefined : message.authority;
        obj.bech32_prefix_validator = message.bech32PrefixValidator === "" ? undefined : message.bech32PrefixValidator;
        obj.bech32_prefix_consensus = message.bech32PrefixConsensus === "" ? undefined : message.bech32PrefixConsensus;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Module.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Module",
            value: exports.Module.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.Module.decode(message.value);
    },
    toProto(message) {
        return exports.Module.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.staking.module.v1.Module",
            value: exports.Module.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Module.typeUrl, exports.Module);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.Module.aminoType, exports.Module.typeUrl);
