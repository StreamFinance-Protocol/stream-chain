//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { GlobalDecoderRegistry } from "../../../../registry";
function createBaseModule() {
    return {
        appName: "",
        beginBlockers: [],
        endBlockers: [],
        initGenesis: [],
        exportGenesis: [],
        overrideStoreKeys: [],
        orderMigrations: [],
        precommiters: [],
        prepareCheckStaters: []
    };
}
export const Module = {
    typeUrl: "/cosmos.app.runtime.v1alpha1.Module",
    aminoType: "cosmos-sdk/Module",
    is(o) {
        return o && (o.$typeUrl === Module.typeUrl || typeof o.appName === "string" && Array.isArray(o.beginBlockers) && (!o.beginBlockers.length || typeof o.beginBlockers[0] === "string") && Array.isArray(o.endBlockers) && (!o.endBlockers.length || typeof o.endBlockers[0] === "string") && Array.isArray(o.initGenesis) && (!o.initGenesis.length || typeof o.initGenesis[0] === "string") && Array.isArray(o.exportGenesis) && (!o.exportGenesis.length || typeof o.exportGenesis[0] === "string") && Array.isArray(o.overrideStoreKeys) && (!o.overrideStoreKeys.length || StoreKeyConfig.is(o.overrideStoreKeys[0])) && Array.isArray(o.orderMigrations) && (!o.orderMigrations.length || typeof o.orderMigrations[0] === "string") && Array.isArray(o.precommiters) && (!o.precommiters.length || typeof o.precommiters[0] === "string") && Array.isArray(o.prepareCheckStaters) && (!o.prepareCheckStaters.length || typeof o.prepareCheckStaters[0] === "string"));
    },
    isSDK(o) {
        return o && (o.$typeUrl === Module.typeUrl || typeof o.app_name === "string" && Array.isArray(o.begin_blockers) && (!o.begin_blockers.length || typeof o.begin_blockers[0] === "string") && Array.isArray(o.end_blockers) && (!o.end_blockers.length || typeof o.end_blockers[0] === "string") && Array.isArray(o.init_genesis) && (!o.init_genesis.length || typeof o.init_genesis[0] === "string") && Array.isArray(o.export_genesis) && (!o.export_genesis.length || typeof o.export_genesis[0] === "string") && Array.isArray(o.override_store_keys) && (!o.override_store_keys.length || StoreKeyConfig.isSDK(o.override_store_keys[0])) && Array.isArray(o.order_migrations) && (!o.order_migrations.length || typeof o.order_migrations[0] === "string") && Array.isArray(o.precommiters) && (!o.precommiters.length || typeof o.precommiters[0] === "string") && Array.isArray(o.prepare_check_staters) && (!o.prepare_check_staters.length || typeof o.prepare_check_staters[0] === "string"));
    },
    isAmino(o) {
        return o && (o.$typeUrl === Module.typeUrl || typeof o.app_name === "string" && Array.isArray(o.begin_blockers) && (!o.begin_blockers.length || typeof o.begin_blockers[0] === "string") && Array.isArray(o.end_blockers) && (!o.end_blockers.length || typeof o.end_blockers[0] === "string") && Array.isArray(o.init_genesis) && (!o.init_genesis.length || typeof o.init_genesis[0] === "string") && Array.isArray(o.export_genesis) && (!o.export_genesis.length || typeof o.export_genesis[0] === "string") && Array.isArray(o.override_store_keys) && (!o.override_store_keys.length || StoreKeyConfig.isAmino(o.override_store_keys[0])) && Array.isArray(o.order_migrations) && (!o.order_migrations.length || typeof o.order_migrations[0] === "string") && Array.isArray(o.precommiters) && (!o.precommiters.length || typeof o.precommiters[0] === "string") && Array.isArray(o.prepare_check_staters) && (!o.prepare_check_staters.length || typeof o.prepare_check_staters[0] === "string"));
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.appName !== "") {
            writer.uint32(10).string(message.appName);
        }
        for (const v of message.beginBlockers) {
            writer.uint32(18).string(v);
        }
        for (const v of message.endBlockers) {
            writer.uint32(26).string(v);
        }
        for (const v of message.initGenesis) {
            writer.uint32(34).string(v);
        }
        for (const v of message.exportGenesis) {
            writer.uint32(42).string(v);
        }
        for (const v of message.overrideStoreKeys) {
            StoreKeyConfig.encode(v, writer.uint32(50).fork()).ldelim();
        }
        for (const v of message.orderMigrations) {
            writer.uint32(58).string(v);
        }
        for (const v of message.precommiters) {
            writer.uint32(66).string(v);
        }
        for (const v of message.prepareCheckStaters) {
            writer.uint32(74).string(v);
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
                    message.appName = reader.string();
                    break;
                case 2:
                    message.beginBlockers.push(reader.string());
                    break;
                case 3:
                    message.endBlockers.push(reader.string());
                    break;
                case 4:
                    message.initGenesis.push(reader.string());
                    break;
                case 5:
                    message.exportGenesis.push(reader.string());
                    break;
                case 6:
                    message.overrideStoreKeys.push(StoreKeyConfig.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.orderMigrations.push(reader.string());
                    break;
                case 8:
                    message.precommiters.push(reader.string());
                    break;
                case 9:
                    message.prepareCheckStaters.push(reader.string());
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
        message.appName = object.appName ?? "";
        message.beginBlockers = object.beginBlockers?.map(e => e) || [];
        message.endBlockers = object.endBlockers?.map(e => e) || [];
        message.initGenesis = object.initGenesis?.map(e => e) || [];
        message.exportGenesis = object.exportGenesis?.map(e => e) || [];
        message.overrideStoreKeys = object.overrideStoreKeys?.map(e => StoreKeyConfig.fromPartial(e)) || [];
        message.orderMigrations = object.orderMigrations?.map(e => e) || [];
        message.precommiters = object.precommiters?.map(e => e) || [];
        message.prepareCheckStaters = object.prepareCheckStaters?.map(e => e) || [];
        return message;
    },
    fromAmino(object) {
        const message = createBaseModule();
        if (object.app_name !== undefined && object.app_name !== null) {
            message.appName = object.app_name;
        }
        message.beginBlockers = object.begin_blockers?.map(e => e) || [];
        message.endBlockers = object.end_blockers?.map(e => e) || [];
        message.initGenesis = object.init_genesis?.map(e => e) || [];
        message.exportGenesis = object.export_genesis?.map(e => e) || [];
        message.overrideStoreKeys = object.override_store_keys?.map(e => StoreKeyConfig.fromAmino(e)) || [];
        message.orderMigrations = object.order_migrations?.map(e => e) || [];
        message.precommiters = object.precommiters?.map(e => e) || [];
        message.prepareCheckStaters = object.prepare_check_staters?.map(e => e) || [];
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.app_name = message.appName === "" ? undefined : message.appName;
        if (message.beginBlockers) {
            obj.begin_blockers = message.beginBlockers.map(e => e);
        }
        else {
            obj.begin_blockers = message.beginBlockers;
        }
        if (message.endBlockers) {
            obj.end_blockers = message.endBlockers.map(e => e);
        }
        else {
            obj.end_blockers = message.endBlockers;
        }
        if (message.initGenesis) {
            obj.init_genesis = message.initGenesis.map(e => e);
        }
        else {
            obj.init_genesis = message.initGenesis;
        }
        if (message.exportGenesis) {
            obj.export_genesis = message.exportGenesis.map(e => e);
        }
        else {
            obj.export_genesis = message.exportGenesis;
        }
        if (message.overrideStoreKeys) {
            obj.override_store_keys = message.overrideStoreKeys.map(e => e ? StoreKeyConfig.toAmino(e) : undefined);
        }
        else {
            obj.override_store_keys = message.overrideStoreKeys;
        }
        if (message.orderMigrations) {
            obj.order_migrations = message.orderMigrations.map(e => e);
        }
        else {
            obj.order_migrations = message.orderMigrations;
        }
        if (message.precommiters) {
            obj.precommiters = message.precommiters.map(e => e);
        }
        else {
            obj.precommiters = message.precommiters;
        }
        if (message.prepareCheckStaters) {
            obj.prepare_check_staters = message.prepareCheckStaters.map(e => e);
        }
        else {
            obj.prepare_check_staters = message.prepareCheckStaters;
        }
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
            typeUrl: "/cosmos.app.runtime.v1alpha1.Module",
            value: Module.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(Module.typeUrl, Module);
GlobalDecoderRegistry.registerAminoProtoMapping(Module.aminoType, Module.typeUrl);
function createBaseStoreKeyConfig() {
    return {
        moduleName: "",
        kvStoreKey: ""
    };
}
export const StoreKeyConfig = {
    typeUrl: "/cosmos.app.runtime.v1alpha1.StoreKeyConfig",
    aminoType: "cosmos-sdk/StoreKeyConfig",
    is(o) {
        return o && (o.$typeUrl === StoreKeyConfig.typeUrl || typeof o.moduleName === "string" && typeof o.kvStoreKey === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === StoreKeyConfig.typeUrl || typeof o.module_name === "string" && typeof o.kv_store_key === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === StoreKeyConfig.typeUrl || typeof o.module_name === "string" && typeof o.kv_store_key === "string");
    },
    encode(message, writer = BinaryWriter.create()) {
        if (message.moduleName !== "") {
            writer.uint32(10).string(message.moduleName);
        }
        if (message.kvStoreKey !== "") {
            writer.uint32(18).string(message.kvStoreKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStoreKeyConfig();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.moduleName = reader.string();
                    break;
                case 2:
                    message.kvStoreKey = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseStoreKeyConfig();
        message.moduleName = object.moduleName ?? "";
        message.kvStoreKey = object.kvStoreKey ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseStoreKeyConfig();
        if (object.module_name !== undefined && object.module_name !== null) {
            message.moduleName = object.module_name;
        }
        if (object.kv_store_key !== undefined && object.kv_store_key !== null) {
            message.kvStoreKey = object.kv_store_key;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.module_name = message.moduleName === "" ? undefined : message.moduleName;
        obj.kv_store_key = message.kvStoreKey === "" ? undefined : message.kvStoreKey;
        return obj;
    },
    fromAminoMsg(object) {
        return StoreKeyConfig.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/StoreKeyConfig",
            value: StoreKeyConfig.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return StoreKeyConfig.decode(message.value);
    },
    toProto(message) {
        return StoreKeyConfig.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/cosmos.app.runtime.v1alpha1.StoreKeyConfig",
            value: StoreKeyConfig.encode(message).finish()
        };
    }
};
GlobalDecoderRegistry.register(StoreKeyConfig.typeUrl, StoreKeyConfig);
GlobalDecoderRegistry.registerAminoProtoMapping(StoreKeyConfig.aminoType, StoreKeyConfig.typeUrl);
