//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { GlobalDecoderRegistry } from "../../../../registry";
function createBaseModule() {
    return {
        blockedModuleAccountsOverride: [],
        authority: ""
    };
}
export const Module = {
    typeUrl: "/cosmos.bank.module.v1.Module",
    aminoType: "cosmos-sdk/Module",
    is(o) {
        return o && (o.$typeUrl === Module.typeUrl || Array.isArray(o.blockedModuleAccountsOverride) && (!o.blockedModuleAccountsOverride.length || typeof o.blockedModuleAccountsOverride[0] === "string") && typeof o.authority === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === Module.typeUrl || Array.isArray(o.blocked_module_accounts_override) && (!o.blocked_module_accounts_override.length || typeof o.blocked_module_accounts_override[0] === "string") && typeof o.authority === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === Module.typeUrl || Array.isArray(o.blocked_module_accounts_override) && (!o.blocked_module_accounts_override.length || typeof o.blocked_module_accounts_override[0] === "string") && typeof o.authority === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        for (const v of message.blockedModuleAccountsOverride) {
            writer.uint32(10).string(v);
        }
        if (message.authority !== "") {
            writer.uint32(18).string(message.authority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModule();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockedModuleAccountsOverride.push(reader.string());
                    break;
                case 2:
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
        message.blockedModuleAccountsOverride = object.blockedModuleAccountsOverride?.map(e => e) || [];
        message.authority = object.authority ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseModule();
        message.blockedModuleAccountsOverride = object.blocked_module_accounts_override?.map(e => e) || [];
        if (object.authority !== undefined && object.authority !== null) {
            message.authority = object.authority;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        if (message.blockedModuleAccountsOverride) {
            obj.blocked_module_accounts_override = message.blockedModuleAccountsOverride.map(e => e);
        }
        else {
            obj.blocked_module_accounts_override = message.blockedModuleAccountsOverride;
        }
        obj.authority = message.authority === "" ? undefined : message.authority;
        return obj;
    },
    fromAminoMsg(object) {
        return Module.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/Module",
            value: Module.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return Module.decode(message.value);
    },
    toProto(message) {
        return Module.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.bank.module.v1.Module",
            value: Module.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Module.typeUrl, Module);
GlobalDecoderRegistry.registerAminoProtoMapping(Module.aminoType, Module.typeUrl);
