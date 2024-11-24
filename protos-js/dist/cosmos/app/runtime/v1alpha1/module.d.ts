import { BinaryReader, BinaryWriter } from "../../../../binary";
/** Module is the config object for the runtime module. */
export interface Module {
    /** app_name is the name of the app. */
    appName: string;
    /**
     * begin_blockers specifies the module names of begin blockers
     * to call in the order in which they should be called. If this is left empty
     * no begin blocker will be registered.
     */
    beginBlockers: string[];
    /**
     * end_blockers specifies the module names of the end blockers
     * to call in the order in which they should be called. If this is left empty
     * no end blocker will be registered.
     */
    endBlockers: string[];
    /**
     * init_genesis specifies the module names of init genesis functions
     * to call in the order in which they should be called. If this is left empty
     * no init genesis function will be registered.
     */
    initGenesis: string[];
    /**
     * export_genesis specifies the order in which to export module genesis data.
     * If this is left empty, the init_genesis order will be used for export genesis
     * if it is specified.
     */
    exportGenesis: string[];
    /**
     * override_store_keys is an optional list of overrides for the module store keys
     * to be used in keeper construction.
     */
    overrideStoreKeys: StoreKeyConfig[];
    /**
     * order_migrations defines the order in which module migrations are performed.
     * If this is left empty, it uses the default migration order.
     * https://pkg.go.dev/github.com/cosmos/cosmos-sdk@v0.47.0-alpha2/types/module#DefaultMigrationsOrder
     */
    orderMigrations: string[];
    /**
     * precommiters specifies the module names of the precommiters
     * to call in the order in which they should be called. If this is left empty
     * no precommit function will be registered.
     */
    precommiters: string[];
    /**
     * prepare_check_staters specifies the module names of the prepare_check_staters
     * to call in the order in which they should be called. If this is left empty
     * no preparecheckstate function will be registered.
     */
    prepareCheckStaters: string[];
}
export interface ModuleProtoMsg {
    typeUrl: "/cosmos.app.runtime.v1alpha1.Module";
    value: Uint8Array;
}
/** Module is the config object for the runtime module. */
export interface ModuleAmino {
    /** app_name is the name of the app. */
    app_name?: string;
    /**
     * begin_blockers specifies the module names of begin blockers
     * to call in the order in which they should be called. If this is left empty
     * no begin blocker will be registered.
     */
    begin_blockers?: string[];
    /**
     * end_blockers specifies the module names of the end blockers
     * to call in the order in which they should be called. If this is left empty
     * no end blocker will be registered.
     */
    end_blockers?: string[];
    /**
     * init_genesis specifies the module names of init genesis functions
     * to call in the order in which they should be called. If this is left empty
     * no init genesis function will be registered.
     */
    init_genesis?: string[];
    /**
     * export_genesis specifies the order in which to export module genesis data.
     * If this is left empty, the init_genesis order will be used for export genesis
     * if it is specified.
     */
    export_genesis?: string[];
    /**
     * override_store_keys is an optional list of overrides for the module store keys
     * to be used in keeper construction.
     */
    override_store_keys?: StoreKeyConfigAmino[];
    /**
     * order_migrations defines the order in which module migrations are performed.
     * If this is left empty, it uses the default migration order.
     * https://pkg.go.dev/github.com/cosmos/cosmos-sdk@v0.47.0-alpha2/types/module#DefaultMigrationsOrder
     */
    order_migrations?: string[];
    /**
     * precommiters specifies the module names of the precommiters
     * to call in the order in which they should be called. If this is left empty
     * no precommit function will be registered.
     */
    precommiters?: string[];
    /**
     * prepare_check_staters specifies the module names of the prepare_check_staters
     * to call in the order in which they should be called. If this is left empty
     * no preparecheckstate function will be registered.
     */
    prepare_check_staters?: string[];
}
export interface ModuleAminoMsg {
    type: "cosmos-sdk/Module";
    value: ModuleAmino;
}
/** Module is the config object for the runtime module. */
export interface ModuleSDKType {
    app_name: string;
    begin_blockers: string[];
    end_blockers: string[];
    init_genesis: string[];
    export_genesis: string[];
    override_store_keys: StoreKeyConfigSDKType[];
    order_migrations: string[];
    precommiters: string[];
    prepare_check_staters: string[];
}
/**
 * StoreKeyConfig may be supplied to override the default module store key, which
 * is the module name.
 */
export interface StoreKeyConfig {
    /** name of the module to override the store key of */
    moduleName: string;
    /** the kv store key to use instead of the module name. */
    kvStoreKey: string;
}
export interface StoreKeyConfigProtoMsg {
    typeUrl: "/cosmos.app.runtime.v1alpha1.StoreKeyConfig";
    value: Uint8Array;
}
/**
 * StoreKeyConfig may be supplied to override the default module store key, which
 * is the module name.
 */
export interface StoreKeyConfigAmino {
    /** name of the module to override the store key of */
    module_name?: string;
    /** the kv store key to use instead of the module name. */
    kv_store_key?: string;
}
export interface StoreKeyConfigAminoMsg {
    type: "cosmos-sdk/StoreKeyConfig";
    value: StoreKeyConfigAmino;
}
/**
 * StoreKeyConfig may be supplied to override the default module store key, which
 * is the module name.
 */
export interface StoreKeyConfigSDKType {
    module_name: string;
    kv_store_key: string;
}
export declare const Module: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is Module;
    isSDK(o: any): o is ModuleSDKType;
    isAmino(o: any): o is ModuleAmino;
    encode(message: Module, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Module;
    fromPartial(object: Partial<Module>): Module;
    fromAmino(object: ModuleAmino): Module;
    toAmino(message: Module): ModuleAmino;
    fromAminoMsg(object: ModuleAminoMsg): Module;
    toAminoMsg(message: Module): ModuleAminoMsg;
    fromProtoMsg(message: ModuleProtoMsg): Module;
    toProto(message: Module): Uint8Array;
    toProtoMsg(message: Module): ModuleProtoMsg;
};
export declare const StoreKeyConfig: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is StoreKeyConfig;
    isSDK(o: any): o is StoreKeyConfigSDKType;
    isAmino(o: any): o is StoreKeyConfigAmino;
    encode(message: StoreKeyConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StoreKeyConfig;
    fromPartial(object: Partial<StoreKeyConfig>): StoreKeyConfig;
    fromAmino(object: StoreKeyConfigAmino): StoreKeyConfig;
    toAmino(message: StoreKeyConfig): StoreKeyConfigAmino;
    fromAminoMsg(object: StoreKeyConfigAminoMsg): StoreKeyConfig;
    toAminoMsg(message: StoreKeyConfig): StoreKeyConfigAminoMsg;
    fromProtoMsg(message: StoreKeyConfigProtoMsg): StoreKeyConfig;
    toProto(message: StoreKeyConfig): Uint8Array;
    toProtoMsg(message: StoreKeyConfig): StoreKeyConfigProtoMsg;
};
