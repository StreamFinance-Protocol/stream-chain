"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgResetCircuitBreakerResponse = exports.MsgResetCircuitBreaker = exports.MsgTripCircuitBreakerResponse = exports.MsgTripCircuitBreaker = exports.MsgAuthorizeCircuitBreakerResponse = exports.MsgAuthorizeCircuitBreaker = void 0;
//@ts-nocheck
const types_1 = require("./types");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
function createBaseMsgAuthorizeCircuitBreaker() {
    return {
        granter: "",
        grantee: "",
        permissions: undefined
    };
}
exports.MsgAuthorizeCircuitBreaker = {
    typeUrl: "/cosmos.circuit.v1.MsgAuthorizeCircuitBreaker",
    aminoType: "cosmos-sdk/MsgAuthorizeCircuitBreaker",
    is(o) {
        return o && (o.$typeUrl === exports.MsgAuthorizeCircuitBreaker.typeUrl || typeof o.granter === "string" && typeof o.grantee === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgAuthorizeCircuitBreaker.typeUrl || typeof o.granter === "string" && typeof o.grantee === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgAuthorizeCircuitBreaker.typeUrl || typeof o.granter === "string" && typeof o.grantee === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.granter !== "") {
            writer.uint32(10).string(message.granter);
        }
        if (message.grantee !== "") {
            writer.uint32(18).string(message.grantee);
        }
        if (message.permissions !== undefined) {
            types_1.Permissions.encode(message.permissions, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAuthorizeCircuitBreaker();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.granter = reader.string();
                    break;
                case 2:
                    message.grantee = reader.string();
                    break;
                case 3:
                    message.permissions = types_1.Permissions.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgAuthorizeCircuitBreaker();
        message.granter = object.granter ?? "";
        message.grantee = object.grantee ?? "";
        message.permissions = object.permissions !== undefined && object.permissions !== null ? types_1.Permissions.fromPartial(object.permissions) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgAuthorizeCircuitBreaker();
        if (object.granter !== undefined && object.granter !== null) {
            message.granter = object.granter;
        }
        if (object.grantee !== undefined && object.grantee !== null) {
            message.grantee = object.grantee;
        }
        if (object.permissions !== undefined && object.permissions !== null) {
            message.permissions = types_1.Permissions.fromAmino(object.permissions);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.granter = message.granter === "" ? undefined : message.granter;
        obj.grantee = message.grantee === "" ? undefined : message.grantee;
        obj.permissions = message.permissions ? types_1.Permissions.toAmino(message.permissions) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgAuthorizeCircuitBreaker.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgAuthorizeCircuitBreaker",
            value: exports.MsgAuthorizeCircuitBreaker.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgAuthorizeCircuitBreaker.decode(message.value);
    },
    toProto(message) {
        return exports.MsgAuthorizeCircuitBreaker.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.MsgAuthorizeCircuitBreaker",
            value: exports.MsgAuthorizeCircuitBreaker.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgAuthorizeCircuitBreaker.typeUrl, exports.MsgAuthorizeCircuitBreaker);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgAuthorizeCircuitBreaker.aminoType, exports.MsgAuthorizeCircuitBreaker.typeUrl);
function createBaseMsgAuthorizeCircuitBreakerResponse() {
    return {
        success: false
    };
}
exports.MsgAuthorizeCircuitBreakerResponse = {
    typeUrl: "/cosmos.circuit.v1.MsgAuthorizeCircuitBreakerResponse",
    aminoType: "cosmos-sdk/MsgAuthorizeCircuitBreakerResponse",
    is(o) {
        return o && (o.$typeUrl === exports.MsgAuthorizeCircuitBreakerResponse.typeUrl || typeof o.success === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgAuthorizeCircuitBreakerResponse.typeUrl || typeof o.success === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgAuthorizeCircuitBreakerResponse.typeUrl || typeof o.success === "boolean");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.success === true) {
            writer.uint32(8).bool(message.success);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAuthorizeCircuitBreakerResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.success = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgAuthorizeCircuitBreakerResponse();
        message.success = object.success ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgAuthorizeCircuitBreakerResponse();
        if (object.success !== undefined && object.success !== null) {
            message.success = object.success;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.success = message.success === false ? undefined : message.success;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgAuthorizeCircuitBreakerResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgAuthorizeCircuitBreakerResponse",
            value: exports.MsgAuthorizeCircuitBreakerResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgAuthorizeCircuitBreakerResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgAuthorizeCircuitBreakerResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.MsgAuthorizeCircuitBreakerResponse",
            value: exports.MsgAuthorizeCircuitBreakerResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgAuthorizeCircuitBreakerResponse.typeUrl, exports.MsgAuthorizeCircuitBreakerResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgAuthorizeCircuitBreakerResponse.aminoType, exports.MsgAuthorizeCircuitBreakerResponse.typeUrl);
function createBaseMsgTripCircuitBreaker() {
    return {
        authority: "",
        msgTypeUrls: []
    };
}
exports.MsgTripCircuitBreaker = {
    typeUrl: "/cosmos.circuit.v1.MsgTripCircuitBreaker",
    aminoType: "cosmos-sdk/MsgTripCircuitBreaker",
    is(o) {
        return o && (o.$typeUrl === exports.MsgTripCircuitBreaker.typeUrl || typeof o.authority === "string" && Array.isArray(o.msgTypeUrls) && (!o.msgTypeUrls.length || typeof o.msgTypeUrls[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgTripCircuitBreaker.typeUrl || typeof o.authority === "string" && Array.isArray(o.msg_type_urls) && (!o.msg_type_urls.length || typeof o.msg_type_urls[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgTripCircuitBreaker.typeUrl || typeof o.authority === "string" && Array.isArray(o.msg_type_urls) && (!o.msg_type_urls.length || typeof o.msg_type_urls[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        for (const v of message.msgTypeUrls) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgTripCircuitBreaker();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.msgTypeUrls.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgTripCircuitBreaker();
        message.authority = object.authority ?? "";
        message.msgTypeUrls = object.msgTypeUrls?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgTripCircuitBreaker();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        message.msgTypeUrls = object.msg_type_urls?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        if (message.msgTypeUrls) {
            obj.msg_type_urls = message.msgTypeUrls.map(e => e);
        }
        else {
            obj.msg_type_urls = message.msgTypeUrls;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgTripCircuitBreaker.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgTripCircuitBreaker",
            value: exports.MsgTripCircuitBreaker.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgTripCircuitBreaker.decode(message.value);
    },
    toProto(message) {
        return exports.MsgTripCircuitBreaker.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.MsgTripCircuitBreaker",
            value: exports.MsgTripCircuitBreaker.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgTripCircuitBreaker.typeUrl, exports.MsgTripCircuitBreaker);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgTripCircuitBreaker.aminoType, exports.MsgTripCircuitBreaker.typeUrl);
function createBaseMsgTripCircuitBreakerResponse() {
    return {
        success: false
    };
}
exports.MsgTripCircuitBreakerResponse = {
    typeUrl: "/cosmos.circuit.v1.MsgTripCircuitBreakerResponse",
    aminoType: "cosmos-sdk/MsgTripCircuitBreakerResponse",
    is(o) {
        return o && (o.$typeUrl === exports.MsgTripCircuitBreakerResponse.typeUrl || typeof o.success === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgTripCircuitBreakerResponse.typeUrl || typeof o.success === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgTripCircuitBreakerResponse.typeUrl || typeof o.success === "boolean");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.success === true) {
            writer.uint32(8).bool(message.success);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgTripCircuitBreakerResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.success = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgTripCircuitBreakerResponse();
        message.success = object.success ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgTripCircuitBreakerResponse();
        if (object.success !== undefined && object.success !== null) {
            message.success = object.success;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.success = message.success === false ? undefined : message.success;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgTripCircuitBreakerResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgTripCircuitBreakerResponse",
            value: exports.MsgTripCircuitBreakerResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgTripCircuitBreakerResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgTripCircuitBreakerResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.MsgTripCircuitBreakerResponse",
            value: exports.MsgTripCircuitBreakerResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgTripCircuitBreakerResponse.typeUrl, exports.MsgTripCircuitBreakerResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgTripCircuitBreakerResponse.aminoType, exports.MsgTripCircuitBreakerResponse.typeUrl);
function createBaseMsgResetCircuitBreaker() {
    return {
        authority: "",
        msgTypeUrls: []
    };
}
exports.MsgResetCircuitBreaker = {
    typeUrl: "/cosmos.circuit.v1.MsgResetCircuitBreaker",
    aminoType: "cosmos-sdk/MsgResetCircuitBreaker",
    is(o) {
        return o && (o.$typeUrl === exports.MsgResetCircuitBreaker.typeUrl || typeof o.authority === "string" && Array.isArray(o.msgTypeUrls) && (!o.msgTypeUrls.length || typeof o.msgTypeUrls[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgResetCircuitBreaker.typeUrl || typeof o.authority === "string" && Array.isArray(o.msg_type_urls) && (!o.msg_type_urls.length || typeof o.msg_type_urls[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgResetCircuitBreaker.typeUrl || typeof o.authority === "string" && Array.isArray(o.msg_type_urls) && (!o.msg_type_urls.length || typeof o.msg_type_urls[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        for (const v of message.msgTypeUrls) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgResetCircuitBreaker();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 3:
                    message.msgTypeUrls.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgResetCircuitBreaker();
        message.authority = object.authority ?? "";
        message.msgTypeUrls = object.msgTypeUrls?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgResetCircuitBreaker();
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        message.msgTypeUrls = object.msg_type_urls?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.authority = message.authority === "" ? undefined : message.authority;
        if (message.msgTypeUrls) {
            obj.msg_type_urls = message.msgTypeUrls.map(e => e);
        }
        else {
            obj.msg_type_urls = message.msgTypeUrls;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgResetCircuitBreaker.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgResetCircuitBreaker",
            value: exports.MsgResetCircuitBreaker.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgResetCircuitBreaker.decode(message.value);
    },
    toProto(message) {
        return exports.MsgResetCircuitBreaker.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.MsgResetCircuitBreaker",
            value: exports.MsgResetCircuitBreaker.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgResetCircuitBreaker.typeUrl, exports.MsgResetCircuitBreaker);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgResetCircuitBreaker.aminoType, exports.MsgResetCircuitBreaker.typeUrl);
function createBaseMsgResetCircuitBreakerResponse() {
    return {
        success: false
    };
}
exports.MsgResetCircuitBreakerResponse = {
    typeUrl: "/cosmos.circuit.v1.MsgResetCircuitBreakerResponse",
    aminoType: "cosmos-sdk/MsgResetCircuitBreakerResponse",
    is(o) {
        return o && (o.$typeUrl === exports.MsgResetCircuitBreakerResponse.typeUrl || typeof o.success === "boolean");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgResetCircuitBreakerResponse.typeUrl || typeof o.success === "boolean");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgResetCircuitBreakerResponse.typeUrl || typeof o.success === "boolean");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.success === true) {
            writer.uint32(8).bool(message.success);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgResetCircuitBreakerResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.success = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgResetCircuitBreakerResponse();
        message.success = object.success ?? false;
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgResetCircuitBreakerResponse();
        if (object.success !== undefined && object.success !== null) {
            message.success = object.success;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.success = message.success === false ? undefined : message.success;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgResetCircuitBreakerResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgResetCircuitBreakerResponse",
            value: exports.MsgResetCircuitBreakerResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgResetCircuitBreakerResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgResetCircuitBreakerResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.MsgResetCircuitBreakerResponse",
            value: exports.MsgResetCircuitBreakerResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgResetCircuitBreakerResponse.typeUrl, exports.MsgResetCircuitBreakerResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgResetCircuitBreakerResponse.aminoType, exports.MsgResetCircuitBreakerResponse.typeUrl);
