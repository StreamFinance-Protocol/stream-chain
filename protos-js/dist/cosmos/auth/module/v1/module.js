"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleAccountPermission = exports.Module = void 0;
//@ts-nocheck
const binary_1 = require("../../../../binary");
const registry_1 = require("../../../../registry");
function createBaseModule() {
    return {
        bech32Prefix: "",
        moduleAccountPermissions: [],
        authority: ""
    };
}
exports.Module = {
    typeUrl: "/cosmos.auth.module.v1.Module",
    aminoType: "cosmos-sdk/Module",
    is(o) {
        return o && (o.$typeUrl === exports.Module.typeUrl || typeof o.bech32Prefix === "string" && Array.isArray(o.moduleAccountPermissions) && (!o.moduleAccountPermissions.length || exports.ModuleAccountPermission.is(o.moduleAccountPermissions[0])) && typeof o.authority === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Module.typeUrl || typeof o.bech32_prefix === "string" && Array.isArray(o.module_account_permissions) && (!o.module_account_permissions.length || exports.ModuleAccountPermission.isSDK(o.module_account_permissions[0])) && typeof o.authority === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Module.typeUrl || typeof o.bech32_prefix === "string" && Array.isArray(o.module_account_permissions) && (!o.module_account_permissions.length || exports.ModuleAccountPermission.isAmino(o.module_account_permissions[0])) && typeof o.authority === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.bech32Prefix !== "") {
            writer.uint32(10).string(message.bech32Prefix);
        }
        for (const v of message.moduleAccountPermissions) {
            exports.ModuleAccountPermission.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.authority !== "") {
            writer.uint32(26).string(message.authority);
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
                    message.bech32Prefix = reader.string();
                    break;
                case 2:
                    message.moduleAccountPermissions.push(exports.ModuleAccountPermission.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.authority = reader.string();
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
        message.bech32Prefix = object.bech32Prefix ?? "";
        message.moduleAccountPermissions = object.moduleAccountPermissions?.map(e => exports.ModuleAccountPermission.fromPartial(e)) || [];
        message.authority = object.authority ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseModule();
        if (object.bech32_prefix !== undefined && object.bech32_prefix !== null) {
            message.bech32Prefix = object.bech32_prefix;
        }
        message.moduleAccountPermissions = object.module_account_permissions?.map(e => exports.ModuleAccountPermission.fromAmino(e)) || [];
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.bech32_prefix = message.bech32Prefix === "" ? undefined : message.bech32Prefix;
        if (message.moduleAccountPermissions) {
            obj.module_account_permissions = message.moduleAccountPermissions.map(e => e ? exports.ModuleAccountPermission.toAmino(e) : undefined);
        }
        else {
            obj.module_account_permissions = message.moduleAccountPermissions;
        }
        obj.authority = message.authority === "" ? undefined : message.authority;
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
            typeUrl: "/cosmos.auth.module.v1.Module",
            value: exports.Module.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Module.typeUrl, exports.Module);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.Module.aminoType, exports.Module.typeUrl);
function createBaseModuleAccountPermission() {
    return {
        account: "",
        permissions: []
    };
}
exports.ModuleAccountPermission = {
    typeUrl: "/cosmos.auth.module.v1.ModuleAccountPermission",
    aminoType: "cosmos-sdk/ModuleAccountPermission",
    is(o) {
        return o && (o.$typeUrl === exports.ModuleAccountPermission.typeUrl || typeof o.account === "string" && Array.isArray(o.permissions) && (!o.permissions.length || typeof o.permissions[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.ModuleAccountPermission.typeUrl || typeof o.account === "string" && Array.isArray(o.permissions) && (!o.permissions.length || typeof o.permissions[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.ModuleAccountPermission.typeUrl || typeof o.account === "string" && Array.isArray(o.permissions) && (!o.permissions.length || typeof o.permissions[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.account !== "") {
            writer.uint32(10).string(message.account);
        }
        for (const v of message.permissions) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModuleAccountPermission();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.account = reader.string();
                    break;
                case 2:
                    message.permissions.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseModuleAccountPermission();
        message.account = object.account ?? "";
        message.permissions = object.permissions?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseModuleAccountPermission();
        if (object.account !== undefined && object.account !== null) {
            message.account = object.account;
        }
        message.permissions = object.permissions?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.account = message.account === "" ? undefined : message.account;
        if (message.permissions) {
            obj.permissions = message.permissions.map(e => e);
        }
        else {
            obj.permissions = message.permissions;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.ModuleAccountPermission.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/ModuleAccountPermission",
            value: exports.ModuleAccountPermission.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.ModuleAccountPermission.decode(message.value);
    },
    toProto(message) {
        return exports.ModuleAccountPermission.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.auth.module.v1.ModuleAccountPermission",
            value: exports.ModuleAccountPermission.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.ModuleAccountPermission.typeUrl, exports.ModuleAccountPermission);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.ModuleAccountPermission.aminoType, exports.ModuleAccountPermission.typeUrl);
