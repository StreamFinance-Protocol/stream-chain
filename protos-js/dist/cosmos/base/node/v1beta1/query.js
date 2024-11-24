"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResponse = exports.StatusRequest = exports.ConfigResponse = exports.ConfigRequest = void 0;
//@ts-nocheck
const timestamp_1 = require("../../../../google/protobuf/timestamp");
const binary_1 = require("../../../../binary");
const registry_1 = require("../../../../registry");
const helpers_1 = require("../../../../helpers");
function createBaseConfigRequest() {
    return {};
}
exports.ConfigRequest = {
    typeUrl: "/cosmos.base.node.v1beta1.ConfigRequest",
    aminoType: "cosmos-sdk/ConfigRequest",
    is(o) {
        return o && o.$typeUrl === exports.ConfigRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.ConfigRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.ConfigRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConfigRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseConfigRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseConfigRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ConfigRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ConfigRequest",
            value: exports.ConfigRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.ConfigRequest.decode(message.value);
    },
    toProto(message) {
        return exports.ConfigRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.node.v1beta1.ConfigRequest",
            value: exports.ConfigRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ConfigRequest.typeUrl, exports.ConfigRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.ConfigRequest.aminoType, exports.ConfigRequest.typeUrl);
function createBaseConfigResponse() {
    return {
        minimumGasPrice: "",
        pruningKeepRecent: "",
        pruningInterval: ""
    };
}
exports.ConfigResponse = {
    typeUrl: "/cosmos.base.node.v1beta1.ConfigResponse",
    aminoType: "cosmos-sdk/ConfigResponse",
    is(o) {
        return o && (o.$typeUrl === exports.ConfigResponse.typeUrl || typeof o.minimumGasPrice === "string" && typeof o.pruningKeepRecent === "string" && typeof o.pruningInterval === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ConfigResponse.typeUrl || typeof o.minimum_gas_price === "string" && typeof o.pruning_keep_recent === "string" && typeof o.pruning_interval === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ConfigResponse.typeUrl || typeof o.minimum_gas_price === "string" && typeof o.pruning_keep_recent === "string" && typeof o.pruning_interval === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.minimumGasPrice !== "") {
            writer.uint32(10).string(message.minimumGasPrice);
        }
        if (message.pruningKeepRecent !== "") {
            writer.uint32(18).string(message.pruningKeepRecent);
        }
        if (message.pruningInterval !== "") {
            writer.uint32(26).string(message.pruningInterval);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConfigResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.minimumGasPrice = reader.string();
                    break;
                case 2:
                    message.pruningKeepRecent = reader.string();
                    break;
                case 3:
                    message.pruningInterval = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseConfigResponse();
        message.minimumGasPrice = object.minimumGasPrice ?? "";
        message.pruningKeepRecent = object.pruningKeepRecent ?? "";
        message.pruningInterval = object.pruningInterval ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseConfigResponse();
        if (object.minimum_gas_price !== undefined && object.minimum_gas_price !== null) {
            message.minimumGasPrice = object.minimum_gas_price;
        }
        if (object.pruning_keep_recent !== undefined && object.pruning_keep_recent !== null) {
            message.pruningKeepRecent = object.pruning_keep_recent;
        }
        if (object.pruning_interval !== undefined && object.pruning_interval !== null) {
            message.pruningInterval = object.pruning_interval;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.minimum_gas_price = message.minimumGasPrice === "" ? undefined : message.minimumGasPrice;
        obj.pruning_keep_recent = message.pruningKeepRecent === "" ? undefined : message.pruningKeepRecent;
        obj.pruning_interval = message.pruningInterval === "" ? undefined : message.pruningInterval;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ConfigResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ConfigResponse",
            value: exports.ConfigResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.ConfigResponse.decode(message.value);
    },
    toProto(message) {
        return exports.ConfigResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.node.v1beta1.ConfigResponse",
            value: exports.ConfigResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ConfigResponse.typeUrl, exports.ConfigResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.ConfigResponse.aminoType, exports.ConfigResponse.typeUrl);
function createBaseStatusRequest() {
    return {};
}
exports.StatusRequest = {
    typeUrl: "/cosmos.base.node.v1beta1.StatusRequest",
    aminoType: "cosmos-sdk/StatusRequest",
    is(o) {
        return o && o.$typeUrl === exports.StatusRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.StatusRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.StatusRequest.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatusRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseStatusRequest();
        return message;
    },
    fromAmino(_) {
        const message = createBaseStatusRequest();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StatusRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/StatusRequest",
            value: exports.StatusRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.StatusRequest.decode(message.value);
    },
    toProto(message) {
        return exports.StatusRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.node.v1beta1.StatusRequest",
            value: exports.StatusRequest.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StatusRequest.typeUrl, exports.StatusRequest);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.StatusRequest.aminoType, exports.StatusRequest.typeUrl);
function createBaseStatusResponse() {
    return {
        earliestStoreHeight: BigInt(0),
        height: BigInt(0),
        timestamp: undefined,
        appHash: new Uint8Array(),
        validatorHash: new Uint8Array()
    };
}
exports.StatusResponse = {
    typeUrl: "/cosmos.base.node.v1beta1.StatusResponse",
    aminoType: "cosmos-sdk/StatusResponse",
    is(o) {
        return o && (o.$typeUrl === exports.StatusResponse.typeUrl || typeof o.earliestStoreHeight === "bigint" && typeof o.height === "bigint" && (o.appHash instanceof Uint8Array || typeof o.appHash === "string") && (o.validatorHash instanceof Uint8Array || typeof o.validatorHash === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.StatusResponse.typeUrl || typeof o.earliest_store_height === "bigint" && typeof o.height === "bigint" && (o.app_hash instanceof Uint8Array || typeof o.app_hash === "string") && (o.validator_hash instanceof Uint8Array || typeof o.validator_hash === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.StatusResponse.typeUrl || typeof o.earliest_store_height === "bigint" && typeof o.height === "bigint" && (o.app_hash instanceof Uint8Array || typeof o.app_hash === "string") && (o.validator_hash instanceof Uint8Array || typeof o.validator_hash === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.earliestStoreHeight !== BigInt(0)) {
            writer.uint32(8).uint64(message.earliestStoreHeight);
        }
        if (message.height !== BigInt(0)) {
            writer.uint32(16).uint64(message.height);
        }
        if (message.timestamp !== undefined) {
            timestamp_1.Timestamp.encode((0, helpers_1.toTimestamp)(message.timestamp), writer.uint32(26).fork()).ldelim();
        }
        if (message.appHash.length !== 0) {
            writer.uint32(34).bytes(message.appHash);
        }
        if (message.validatorHash.length !== 0) {
            writer.uint32(42).bytes(message.validatorHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatusResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.earliestStoreHeight = reader.uint64();
                    break;
                case 2:
                    message.height = reader.uint64();
                    break;
                case 3:
                    message.timestamp = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.appHash = reader.bytes();
                    break;
                case 5:
                    message.validatorHash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStatusResponse();
        message.earliestStoreHeight = object.earliestStoreHeight !== undefined && object.earliestStoreHeight !== null ? BigInt(object.earliestStoreHeight.toString()) : BigInt(0);
        message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
        message.timestamp = object.timestamp ?? undefined;
        message.appHash = object.appHash ?? new Uint8Array();
        message.validatorHash = object.validatorHash ?? new Uint8Array();
        return message;
    },
    fromAmino(object) {
        const message = createBaseStatusResponse();
        if (object.earliest_store_height !== undefined && object.earliest_store_height !== null) {
            message.earliestStoreHeight = BigInt(object.earliest_store_height);
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = BigInt(object.height);
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = (0, helpers_1.fromTimestamp)(timestamp_1.Timestamp.fromAmino(object.timestamp));
        }
        if (object.app_hash !== undefined && object.app_hash !== null) {
            message.appHash = (0, helpers_1.bytesFromBase64)(object.app_hash);
        }
        if (object.validator_hash !== undefined && object.validator_hash !== null) {
            message.validatorHash = (0, helpers_1.bytesFromBase64)(object.validator_hash);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.earliest_store_height = message.earliestStoreHeight !== BigInt(0) ? message.earliestStoreHeight?.toString() : undefined;
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.timestamp = message.timestamp ? timestamp_1.Timestamp.toAmino((0, helpers_1.toTimestamp)(message.timestamp)) : undefined;
        obj.app_hash = message.appHash ? (0, helpers_1.base64FromBytes)(message.appHash) : undefined;
        obj.validator_hash = message.validatorHash ? (0, helpers_1.base64FromBytes)(message.validatorHash) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.StatusResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/StatusResponse",
            value: exports.StatusResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.StatusResponse.decode(message.value);
    },
    toProto(message) {
        return exports.StatusResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.node.v1beta1.StatusResponse",
            value: exports.StatusResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.StatusResponse.typeUrl, exports.StatusResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.StatusResponse.aminoType, exports.StatusResponse.typeUrl);
