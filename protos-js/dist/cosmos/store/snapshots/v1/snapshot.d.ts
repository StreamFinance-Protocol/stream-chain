import { BinaryReader, BinaryWriter } from "../../../../binary";
/** Snapshot contains Tendermint state sync snapshot info. */
export interface Snapshot {
    height: bigint;
    format: number;
    chunks: number;
    hash: Uint8Array;
    metadata: Metadata;
}
export interface SnapshotProtoMsg {
    typeUrl: "/cosmos.store.snapshots.v1.Snapshot";
    value: Uint8Array;
}
/** Snapshot contains Tendermint state sync snapshot info. */
export interface SnapshotAmino {
    height?: string;
    format?: number;
    chunks?: number;
    hash?: string;
    metadata?: MetadataAmino;
}
export interface SnapshotAminoMsg {
    type: "cosmos-sdk/Snapshot";
    value: SnapshotAmino;
}
/** Snapshot contains Tendermint state sync snapshot info. */
export interface SnapshotSDKType {
    height: bigint;
    format: number;
    chunks: number;
    hash: Uint8Array;
    metadata: MetadataSDKType;
}
/** Metadata contains SDK-specific snapshot metadata. */
export interface Metadata {
    /** SHA-256 chunk hashes */
    chunkHashes: Uint8Array[];
}
export interface MetadataProtoMsg {
    typeUrl: "/cosmos.store.snapshots.v1.Metadata";
    value: Uint8Array;
}
/** Metadata contains SDK-specific snapshot metadata. */
export interface MetadataAmino {
    /** SHA-256 chunk hashes */
    chunk_hashes?: string[];
}
export interface MetadataAminoMsg {
    type: "cosmos-sdk/Metadata";
    value: MetadataAmino;
}
/** Metadata contains SDK-specific snapshot metadata. */
export interface MetadataSDKType {
    chunk_hashes: Uint8Array[];
}
/**
 * SnapshotItem is an item contained in a rootmulti.Store snapshot.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotItem {
    store?: SnapshotStoreItem;
    iavl?: SnapshotIAVLItem;
    extension?: SnapshotExtensionMeta;
    extensionPayload?: SnapshotExtensionPayload;
}
export interface SnapshotItemProtoMsg {
    typeUrl: "/cosmos.store.snapshots.v1.SnapshotItem";
    value: Uint8Array;
}
/**
 * SnapshotItem is an item contained in a rootmulti.Store snapshot.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotItemAmino {
    store?: SnapshotStoreItemAmino;
    iavl?: SnapshotIAVLItemAmino;
    extension?: SnapshotExtensionMetaAmino;
    extension_payload?: SnapshotExtensionPayloadAmino;
}
export interface SnapshotItemAminoMsg {
    type: "cosmos-sdk/SnapshotItem";
    value: SnapshotItemAmino;
}
/**
 * SnapshotItem is an item contained in a rootmulti.Store snapshot.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotItemSDKType {
    store?: SnapshotStoreItemSDKType;
    iavl?: SnapshotIAVLItemSDKType;
    extension?: SnapshotExtensionMetaSDKType;
    extension_payload?: SnapshotExtensionPayloadSDKType;
}
/**
 * SnapshotStoreItem contains metadata about a snapshotted store.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotStoreItem {
    name: string;
}
export interface SnapshotStoreItemProtoMsg {
    typeUrl: "/cosmos.store.snapshots.v1.SnapshotStoreItem";
    value: Uint8Array;
}
/**
 * SnapshotStoreItem contains metadata about a snapshotted store.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotStoreItemAmino {
    name?: string;
}
export interface SnapshotStoreItemAminoMsg {
    type: "cosmos-sdk/SnapshotStoreItem";
    value: SnapshotStoreItemAmino;
}
/**
 * SnapshotStoreItem contains metadata about a snapshotted store.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotStoreItemSDKType {
    name: string;
}
/**
 * SnapshotIAVLItem is an exported IAVL node.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotIAVLItem {
    key: Uint8Array;
    value: Uint8Array;
    /** version is block height */
    version: bigint;
    /** height is depth of the tree. */
    height: number;
}
export interface SnapshotIAVLItemProtoMsg {
    typeUrl: "/cosmos.store.snapshots.v1.SnapshotIAVLItem";
    value: Uint8Array;
}
/**
 * SnapshotIAVLItem is an exported IAVL node.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotIAVLItemAmino {
    key?: string;
    value?: string;
    /** version is block height */
    version?: string;
    /** height is depth of the tree. */
    height?: number;
}
export interface SnapshotIAVLItemAminoMsg {
    type: "cosmos-sdk/SnapshotIAVLItem";
    value: SnapshotIAVLItemAmino;
}
/**
 * SnapshotIAVLItem is an exported IAVL node.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotIAVLItemSDKType {
    key: Uint8Array;
    value: Uint8Array;
    version: bigint;
    height: number;
}
/**
 * SnapshotExtensionMeta contains metadata about an external snapshotter.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotExtensionMeta {
    name: string;
    format: number;
}
export interface SnapshotExtensionMetaProtoMsg {
    typeUrl: "/cosmos.store.snapshots.v1.SnapshotExtensionMeta";
    value: Uint8Array;
}
/**
 * SnapshotExtensionMeta contains metadata about an external snapshotter.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotExtensionMetaAmino {
    name?: string;
    format?: number;
}
export interface SnapshotExtensionMetaAminoMsg {
    type: "cosmos-sdk/SnapshotExtensionMeta";
    value: SnapshotExtensionMetaAmino;
}
/**
 * SnapshotExtensionMeta contains metadata about an external snapshotter.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotExtensionMetaSDKType {
    name: string;
    format: number;
}
/**
 * SnapshotExtensionPayload contains payloads of an external snapshotter.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotExtensionPayload {
    payload: Uint8Array;
}
export interface SnapshotExtensionPayloadProtoMsg {
    typeUrl: "/cosmos.store.snapshots.v1.SnapshotExtensionPayload";
    value: Uint8Array;
}
/**
 * SnapshotExtensionPayload contains payloads of an external snapshotter.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotExtensionPayloadAmino {
    payload?: string;
}
export interface SnapshotExtensionPayloadAminoMsg {
    type: "cosmos-sdk/SnapshotExtensionPayload";
    value: SnapshotExtensionPayloadAmino;
}
/**
 * SnapshotExtensionPayload contains payloads of an external snapshotter.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotExtensionPayloadSDKType {
    payload: Uint8Array;
}
export declare const Snapshot: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is Snapshot;
    isSDK(o: any): o is SnapshotSDKType;
    isAmino(o: any): o is SnapshotAmino;
    encode(message: Snapshot, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Snapshot;
    fromPartial(object: Partial<Snapshot>): Snapshot;
    fromAmino(object: SnapshotAmino): Snapshot;
    toAmino(message: Snapshot): SnapshotAmino;
    fromAminoMsg(object: SnapshotAminoMsg): Snapshot;
    toAminoMsg(message: Snapshot): SnapshotAminoMsg;
    fromProtoMsg(message: SnapshotProtoMsg): Snapshot;
    toProto(message: Snapshot): Uint8Array;
    toProtoMsg(message: Snapshot): SnapshotProtoMsg;
};
export declare const Metadata: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is Metadata;
    isSDK(o: any): o is MetadataSDKType;
    isAmino(o: any): o is MetadataAmino;
    encode(message: Metadata, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Metadata;
    fromPartial(object: Partial<Metadata>): Metadata;
    fromAmino(object: MetadataAmino): Metadata;
    toAmino(message: Metadata): MetadataAmino;
    fromAminoMsg(object: MetadataAminoMsg): Metadata;
    toAminoMsg(message: Metadata): MetadataAminoMsg;
    fromProtoMsg(message: MetadataProtoMsg): Metadata;
    toProto(message: Metadata): Uint8Array;
    toProtoMsg(message: Metadata): MetadataProtoMsg;
};
export declare const SnapshotItem: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is SnapshotItem;
    isSDK(o: any): o is SnapshotItemSDKType;
    isAmino(o: any): o is SnapshotItemAmino;
    encode(message: SnapshotItem, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SnapshotItem;
    fromPartial(object: Partial<SnapshotItem>): SnapshotItem;
    fromAmino(object: SnapshotItemAmino): SnapshotItem;
    toAmino(message: SnapshotItem): SnapshotItemAmino;
    fromAminoMsg(object: SnapshotItemAminoMsg): SnapshotItem;
    toAminoMsg(message: SnapshotItem): SnapshotItemAminoMsg;
    fromProtoMsg(message: SnapshotItemProtoMsg): SnapshotItem;
    toProto(message: SnapshotItem): Uint8Array;
    toProtoMsg(message: SnapshotItem): SnapshotItemProtoMsg;
};
export declare const SnapshotStoreItem: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is SnapshotStoreItem;
    isSDK(o: any): o is SnapshotStoreItemSDKType;
    isAmino(o: any): o is SnapshotStoreItemAmino;
    encode(message: SnapshotStoreItem, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SnapshotStoreItem;
    fromPartial(object: Partial<SnapshotStoreItem>): SnapshotStoreItem;
    fromAmino(object: SnapshotStoreItemAmino): SnapshotStoreItem;
    toAmino(message: SnapshotStoreItem): SnapshotStoreItemAmino;
    fromAminoMsg(object: SnapshotStoreItemAminoMsg): SnapshotStoreItem;
    toAminoMsg(message: SnapshotStoreItem): SnapshotStoreItemAminoMsg;
    fromProtoMsg(message: SnapshotStoreItemProtoMsg): SnapshotStoreItem;
    toProto(message: SnapshotStoreItem): Uint8Array;
    toProtoMsg(message: SnapshotStoreItem): SnapshotStoreItemProtoMsg;
};
export declare const SnapshotIAVLItem: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is SnapshotIAVLItem;
    isSDK(o: any): o is SnapshotIAVLItemSDKType;
    isAmino(o: any): o is SnapshotIAVLItemAmino;
    encode(message: SnapshotIAVLItem, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SnapshotIAVLItem;
    fromPartial(object: Partial<SnapshotIAVLItem>): SnapshotIAVLItem;
    fromAmino(object: SnapshotIAVLItemAmino): SnapshotIAVLItem;
    toAmino(message: SnapshotIAVLItem): SnapshotIAVLItemAmino;
    fromAminoMsg(object: SnapshotIAVLItemAminoMsg): SnapshotIAVLItem;
    toAminoMsg(message: SnapshotIAVLItem): SnapshotIAVLItemAminoMsg;
    fromProtoMsg(message: SnapshotIAVLItemProtoMsg): SnapshotIAVLItem;
    toProto(message: SnapshotIAVLItem): Uint8Array;
    toProtoMsg(message: SnapshotIAVLItem): SnapshotIAVLItemProtoMsg;
};
export declare const SnapshotExtensionMeta: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is SnapshotExtensionMeta;
    isSDK(o: any): o is SnapshotExtensionMetaSDKType;
    isAmino(o: any): o is SnapshotExtensionMetaAmino;
    encode(message: SnapshotExtensionMeta, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SnapshotExtensionMeta;
    fromPartial(object: Partial<SnapshotExtensionMeta>): SnapshotExtensionMeta;
    fromAmino(object: SnapshotExtensionMetaAmino): SnapshotExtensionMeta;
    toAmino(message: SnapshotExtensionMeta): SnapshotExtensionMetaAmino;
    fromAminoMsg(object: SnapshotExtensionMetaAminoMsg): SnapshotExtensionMeta;
    toAminoMsg(message: SnapshotExtensionMeta): SnapshotExtensionMetaAminoMsg;
    fromProtoMsg(message: SnapshotExtensionMetaProtoMsg): SnapshotExtensionMeta;
    toProto(message: SnapshotExtensionMeta): Uint8Array;
    toProtoMsg(message: SnapshotExtensionMeta): SnapshotExtensionMetaProtoMsg;
};
export declare const SnapshotExtensionPayload: {
    typeUrl: string;
    aminoType: string;
    is(o: any): o is SnapshotExtensionPayload;
    isSDK(o: any): o is SnapshotExtensionPayloadSDKType;
    isAmino(o: any): o is SnapshotExtensionPayloadAmino;
    encode(message: SnapshotExtensionPayload, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SnapshotExtensionPayload;
    fromPartial(object: Partial<SnapshotExtensionPayload>): SnapshotExtensionPayload;
    fromAmino(object: SnapshotExtensionPayloadAmino): SnapshotExtensionPayload;
    toAmino(message: SnapshotExtensionPayload): SnapshotExtensionPayloadAmino;
    fromAminoMsg(object: SnapshotExtensionPayloadAminoMsg): SnapshotExtensionPayload;
    toAminoMsg(message: SnapshotExtensionPayload): SnapshotExtensionPayloadAminoMsg;
    fromProtoMsg(message: SnapshotExtensionPayloadProtoMsg): SnapshotExtensionPayload;
    toProto(message: SnapshotExtensionPayload): Uint8Array;
    toProtoMsg(message: SnapshotExtensionPayload): SnapshotExtensionPayloadProtoMsg;
};
