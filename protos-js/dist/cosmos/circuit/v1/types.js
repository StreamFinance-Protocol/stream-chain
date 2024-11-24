"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = exports.GenesisAccountPermissions = exports.Permissions = exports.Permissions_LevelAmino = exports.Permissions_LevelSDKType = exports.Permissions_Level = void 0;
exports.permissions_LevelFromJSON = permissions_LevelFromJSON;
exports.permissions_LevelToJSON = permissions_LevelToJSON;
//@ts-nocheck
const helpers_1 = require("../../../helpers");
const binary_1 = require("../../../binary");
const registry_1 = require("../../../registry");
/** Level is the permission level. */
var Permissions_Level;
(function (Permissions_Level) {
    /**
     * LEVEL_NONE_UNSPECIFIED - LEVEL_NONE_UNSPECIFIED indicates that the account will have no circuit
     * breaker permissions.
     */
    Permissions_Level[Permissions_Level["LEVEL_NONE_UNSPECIFIED"] = 0] = "LEVEL_NONE_UNSPECIFIED";
    /**
     * LEVEL_SOME_MSGS - LEVEL_SOME_MSGS indicates that the account will have permission to
     * trip or reset the circuit breaker for some Msg type URLs. If this level
     * is chosen, a non-empty list of Msg type URLs must be provided in
     * limit_type_urls.
     */
    Permissions_Level[Permissions_Level["LEVEL_SOME_MSGS"] = 1] = "LEVEL_SOME_MSGS";
    /**
     * LEVEL_ALL_MSGS - LEVEL_ALL_MSGS indicates that the account can trip or reset the circuit
     * breaker for Msg's of all type URLs.
     */
    Permissions_Level[Permissions_Level["LEVEL_ALL_MSGS"] = 2] = "LEVEL_ALL_MSGS";
    /**
     * LEVEL_SUPER_ADMIN - LEVEL_SUPER_ADMIN indicates that the account can take all circuit breaker
     * actions and can grant permissions to other accounts.
     */
    Permissions_Level[Permissions_Level["LEVEL_SUPER_ADMIN"] = 3] = "LEVEL_SUPER_ADMIN";
    Permissions_Level[Permissions_Level["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Permissions_Level || (exports.Permissions_Level = Permissions_Level = {}));
exports.Permissions_LevelSDKType = Permissions_Level;
exports.Permissions_LevelAmino = Permissions_Level;
function permissions_LevelFromJSON(object) {
    switch (object) {
        case 0:
        case "LEVEL_NONE_UNSPECIFIED":
            return Permissions_Level.LEVEL_NONE_UNSPECIFIED;
        case 1:
        case "LEVEL_SOME_MSGS":
            return Permissions_Level.LEVEL_SOME_MSGS;
        case 2:
        case "LEVEL_ALL_MSGS":
            return Permissions_Level.LEVEL_ALL_MSGS;
        case 3:
        case "LEVEL_SUPER_ADMIN":
            return Permissions_Level.LEVEL_SUPER_ADMIN;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Permissions_Level.UNRECOGNIZED;
    }
}
function permissions_LevelToJSON(object) {
    switch (object) {
        case Permissions_Level.LEVEL_NONE_UNSPECIFIED:
            return "LEVEL_NONE_UNSPECIFIED";
        case Permissions_Level.LEVEL_SOME_MSGS:
            return "LEVEL_SOME_MSGS";
        case Permissions_Level.LEVEL_ALL_MSGS:
            return "LEVEL_ALL_MSGS";
        case Permissions_Level.LEVEL_SUPER_ADMIN:
            return "LEVEL_SUPER_ADMIN";
        case Permissions_Level.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBasePermissions() {
    return {
        level: 0,
        limitTypeUrls: []
    };
}
exports.Permissions = {
    typeUrl: "/cosmos.circuit.v1.Permissions",
    aminoType: "cosmos-sdk/Permissions",
    is(o) {
        return o && (o.$typeUrl === exports.Permissions.typeUrl || (0, helpers_1.isSet)(o.level) && Array.isArray(o.limitTypeUrls) && (!o.limitTypeUrls.length || typeof o.limitTypeUrls[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.Permissions.typeUrl || (0, helpers_1.isSet)(o.level) && Array.isArray(o.limit_type_urls) && (!o.limit_type_urls.length || typeof o.limit_type_urls[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.Permissions.typeUrl || (0, helpers_1.isSet)(o.level) && Array.isArray(o.limit_type_urls) && (!o.limit_type_urls.length || typeof o.limit_type_urls[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.level !== 0) {
            writer.uint32(8).int32(message.level);
        }
        for (const v of message.limitTypeUrls) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePermissions();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.level = reader.int32();
                    break;
                case 2:
                    message.limitTypeUrls.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBasePermissions();
        message.level = object.level ?? 0;
        message.limitTypeUrls = object.limitTypeUrls?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBasePermissions();
        if (object.level !== undefined && object.level !== null) {
            message.level = object.level;
        }
        message.limitTypeUrls = object.limit_type_urls?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.level = message.level === 0 ? undefined : message.level;
        if (message.limitTypeUrls) {
            obj.limit_type_urls = message.limitTypeUrls.map(e => e);
        }
        else {
            obj.limit_type_urls = message.limitTypeUrls;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.Permissions.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Permissions",
            value: exports.Permissions.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.Permissions.decode(message.value);
    },
    toProto(message) {
        return exports.Permissions.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.Permissions",
            value: exports.Permissions.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.Permissions.typeUrl, exports.Permissions);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.Permissions.aminoType, exports.Permissions.typeUrl);
function createBaseGenesisAccountPermissions() {
    return {
        address: "",
        permissions: undefined
    };
}
exports.GenesisAccountPermissions = {
    typeUrl: "/cosmos.circuit.v1.GenesisAccountPermissions",
    aminoType: "cosmos-sdk/GenesisAccountPermissions",
    is(o) {
        return o && (o.$typeUrl === exports.GenesisAccountPermissions.typeUrl || typeof o.address === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GenesisAccountPermissions.typeUrl || typeof o.address === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GenesisAccountPermissions.typeUrl || typeof o.address === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.permissions !== undefined) {
            exports.Permissions.encode(message.permissions, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisAccountPermissions();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.permissions = exports.Permissions.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGenesisAccountPermissions();
        message.address = object.address ?? "";
        message.permissions = object.permissions !== undefined && object.permissions !== null ? exports.Permissions.fromPartial(object.permissions) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisAccountPermissions();
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        if (object.permissions !== undefined && object.permissions !== null) {
            message.permissions = exports.Permissions.fromAmino(object.permissions);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.address = message.address === "" ? undefined : message.address;
        obj.permissions = message.permissions ? exports.Permissions.toAmino(message.permissions) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GenesisAccountPermissions.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GenesisAccountPermissions",
            value: exports.GenesisAccountPermissions.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GenesisAccountPermissions.decode(message.value);
    },
    toProto(message) {
        return exports.GenesisAccountPermissions.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.GenesisAccountPermissions",
            value: exports.GenesisAccountPermissions.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GenesisAccountPermissions.typeUrl, exports.GenesisAccountPermissions);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GenesisAccountPermissions.aminoType, exports.GenesisAccountPermissions.typeUrl);
function createBaseGenesisState() {
    return {
        accountPermissions: [],
        disabledTypeUrls: []
    };
}
exports.GenesisState = {
    typeUrl: "/cosmos.circuit.v1.GenesisState",
    aminoType: "cosmos-sdk/GenesisState",
    is(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.accountPermissions) && (!o.accountPermissions.length || exports.GenesisAccountPermissions.is(o.accountPermissions[0])) && Array.isArray(o.disabledTypeUrls) && (!o.disabledTypeUrls.length || typeof o.disabledTypeUrls[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.account_permissions) && (!o.account_permissions.length || exports.GenesisAccountPermissions.isSDK(o.account_permissions[0])) && Array.isArray(o.disabled_type_urls) && (!o.disabled_type_urls.length || typeof o.disabled_type_urls[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || Array.isArray(o.account_permissions) && (!o.account_permissions.length || exports.GenesisAccountPermissions.isAmino(o.account_permissions[0])) && Array.isArray(o.disabled_type_urls) && (!o.disabled_type_urls.length || typeof o.disabled_type_urls[0] === "string"));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        for (const v of message.accountPermissions) {
            exports.GenesisAccountPermissions.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.disabledTypeUrls) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accountPermissions.push(exports.GenesisAccountPermissions.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.disabledTypeUrls.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.accountPermissions = object.accountPermissions?.map(e => exports.GenesisAccountPermissions.fromPartial(e)) || [];
        message.disabledTypeUrls = object.disabledTypeUrls?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        message.accountPermissions = object.account_permissions?.map(e => exports.GenesisAccountPermissions.fromAmino(e)) || [];
        message.disabledTypeUrls = object.disabled_type_urls?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.accountPermissions) {
            obj.account_permissions = message.accountPermissions.map(e => e ? exports.GenesisAccountPermissions.toAmino(e) : undefined);
        }
        else {
            obj.account_permissions = message.accountPermissions;
        }
        if (message.disabledTypeUrls) {
            obj.disabled_type_urls = message.disabledTypeUrls.map(e => e);
        }
        else {
            obj.disabled_type_urls = message.disabledTypeUrls;
        }
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GenesisState.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GenesisState",
            value: exports.GenesisState.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GenesisState.decode(message.value);
    },
    toProto(message) {
        return exports.GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.circuit.v1.GenesisState",
            value: exports.GenesisState.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GenesisState.typeUrl, exports.GenesisState);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GenesisState.aminoType, exports.GenesisState.typeUrl);
