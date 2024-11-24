//@ts-nocheck
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { GlobalDecoderRegistry } from "../../../../registry";
import { toTimestamp, fromTimestamp, bytesFromBase64, base64FromBytes } from "../../../../helpers";
function createBaseConfigRequest() {
    return {};
}
export const ConfigRequest = {
    typeUrl: "/cosmos.base.node.v1beta1.ConfigRequest",
    aminoType: "cosmos-sdk/ConfigRequest",
    is(o) {
        return o && o.$typeUrl === ConfigRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === ConfigRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === ConfigRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return ConfigRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ConfigRequest",
            value: ConfigRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ConfigRequest.decode(message.value);
    },
    toProto(message) {
        return ConfigRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.node.v1beta1.ConfigRequest",
            value: ConfigRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ConfigRequest.typeUrl, ConfigRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(ConfigRequest.aminoType, ConfigRequest.typeUrl);
function createBaseConfigResponse() {
    return {
        minimumGasPrice: "",
        pruningKeepRecent: "",
        pruningInterval: ""
    };
}
export const ConfigResponse = {
    typeUrl: "/cosmos.base.node.v1beta1.ConfigResponse",
    aminoType: "cosmos-sdk/ConfigResponse",
    is(o) {
        return o && (o.$typeUrl === ConfigResponse.typeUrl || typeof o.minimumGasPrice === "string" && typeof o.pruningKeepRecent === "string" && typeof o.pruningInterval === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === ConfigResponse.typeUrl || typeof o.minimum_gas_price === "string" && typeof o.pruning_keep_recent === "string" && typeof o.pruning_interval === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === ConfigResponse.typeUrl || typeof o.minimum_gas_price === "string" && typeof o.pruning_keep_recent === "string" && typeof o.pruning_interval === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
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
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return ConfigResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ConfigResponse",
            value: ConfigResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return ConfigResponse.decode(message.value);
    },
    toProto(message) {
        return ConfigResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.node.v1beta1.ConfigResponse",
            value: ConfigResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(ConfigResponse.typeUrl, ConfigResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(ConfigResponse.aminoType, ConfigResponse.typeUrl);
function createBaseStatusRequest() {
    return {};
}
export const StatusRequest = {
    typeUrl: "/cosmos.base.node.v1beta1.StatusRequest",
    aminoType: "cosmos-sdk/StatusRequest",
    is(o) {
        return o && o.$typeUrl === StatusRequest.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === StatusRequest.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === StatusRequest.typeUrl;
    },
    encode(_, writer = BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        return StatusRequest.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/StatusRequest",
            value: StatusRequest.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return StatusRequest.decode(message.value);
    },
    toProto(message) {
        return StatusRequest.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.node.v1beta1.StatusRequest",
            value: StatusRequest.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(StatusRequest.typeUrl, StatusRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(StatusRequest.aminoType, StatusRequest.typeUrl);
function createBaseStatusResponse() {
    return {
        earliestStoreHeight: BigInt(0),
        height: BigInt(0),
        timestamp: undefined,
        appHash: new Uint8Array(),
        validatorHash: new Uint8Array()
    };
}
export const StatusResponse = {
    typeUrl: "/cosmos.base.node.v1beta1.StatusResponse",
    aminoType: "cosmos-sdk/StatusResponse",
    is(o) {
        return o && (o.$typeUrl === StatusResponse.typeUrl || typeof o.earliestStoreHeight === "bigint" && typeof o.height === "bigint" && (o.appHash instanceof Uint8Array || typeof o.appHash === "string") && (o.validatorHash instanceof Uint8Array || typeof o.validatorHash === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === StatusResponse.typeUrl || typeof o.earliest_store_height === "bigint" && typeof o.height === "bigint" && (o.app_hash instanceof Uint8Array || typeof o.app_hash === "string") && (o.validator_hash instanceof Uint8Array || typeof o.validator_hash === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === StatusResponse.typeUrl || typeof o.earliest_store_height === "bigint" && typeof o.height === "bigint" && (o.app_hash instanceof Uint8Array || typeof o.app_hash === "string") && (o.validator_hash instanceof Uint8Array || typeof o.validator_hash === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.earliestStoreHeight !== BigInt(0)) {
            writer.uint32(8).uint64(message.earliestStoreHeight);
        }
        if (message.height !== BigInt(0)) {
            writer.uint32(16).uint64(message.height);
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
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
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            message.timestamp = fromTimestamp(Timestamp.fromAmino(object.timestamp));
        }
        if (object.app_hash !== undefined && object.app_hash !== null) {
            message.appHash = bytesFromBase64(object.app_hash);
        }
        if (object.validator_hash !== undefined && object.validator_hash !== null) {
            message.validatorHash = bytesFromBase64(object.validator_hash);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.earliest_store_height = message.earliestStoreHeight !== BigInt(0) ? message.earliestStoreHeight?.toString() : undefined;
        obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
        obj.timestamp = message.timestamp ? Timestamp.toAmino(toTimestamp(message.timestamp)) : undefined;
        obj.app_hash = message.appHash ? base64FromBytes(message.appHash) : undefined;
        obj.validator_hash = message.validatorHash ? base64FromBytes(message.validatorHash) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return StatusResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/StatusResponse",
            value: StatusResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return StatusResponse.decode(message.value);
    },
    toProto(message) {
        return StatusResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.base.node.v1beta1.StatusResponse",
            value: StatusResponse.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(StatusResponse.typeUrl, StatusResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(StatusResponse.aminoType, StatusResponse.typeUrl);
