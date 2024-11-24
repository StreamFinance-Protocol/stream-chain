import { BinaryReader, BinaryWriter } from "../../binary";
/** BlockStats is used to store stats transiently within the scope of a block. */
export interface BlockStats {
    /** The fills that occured on this block. */
    fills: BlockStats_Fill[];
}
export interface BlockStatsProtoMsg {
    typeUrl: "/klyraprotocol.stats.BlockStats";
    value: Uint8Array;
}
/** BlockStats is used to store stats transiently within the scope of a block. */
export interface BlockStatsAmino {
    /** The fills that occured on this block. */
    fills?: BlockStats_FillAmino[];
}
export interface BlockStatsAminoMsg {
    type: "/klyraprotocol.stats.BlockStats";
    value: BlockStatsAmino;
}
/** BlockStats is used to store stats transiently within the scope of a block. */
export interface BlockStatsSDKType {
    fills: BlockStats_FillSDKType[];
}
/** Fill records data about a fill on this block. */
export interface BlockStats_Fill {
    /** Taker wallet address */
    taker: string;
    /** Maker wallet address */
    maker: string;
    /** Notional  filled in quantums */
    notional: bigint;
}
export interface BlockStats_FillProtoMsg {
    typeUrl: "/klyraprotocol.stats.Fill";
    value: Uint8Array;
}
/** Fill records data about a fill on this block. */
export interface BlockStats_FillAmino {
    /** Taker wallet address */
    taker?: string;
    /** Maker wallet address */
    maker?: string;
    /** Notional  filled in quantums */
    notional?: string;
}
export interface BlockStats_FillAminoMsg {
    type: "/klyraprotocol.stats.Fill";
    value: BlockStats_FillAmino;
}
/** Fill records data about a fill on this block. */
export interface BlockStats_FillSDKType {
    taker: string;
    maker: string;
    notional: bigint;
}
/** StatsMetadata stores metadata for the x/stats module */
export interface StatsMetadata {
    /**
     * The oldest epoch that is included in the stats. The next epoch to be
     * removed from the window.
     */
    trailingEpoch: number;
}
export interface StatsMetadataProtoMsg {
    typeUrl: "/klyraprotocol.stats.StatsMetadata";
    value: Uint8Array;
}
/** StatsMetadata stores metadata for the x/stats module */
export interface StatsMetadataAmino {
    /**
     * The oldest epoch that is included in the stats. The next epoch to be
     * removed from the window.
     */
    trailing_epoch?: number;
}
export interface StatsMetadataAminoMsg {
    type: "/klyraprotocol.stats.StatsMetadata";
    value: StatsMetadataAmino;
}
/** StatsMetadata stores metadata for the x/stats module */
export interface StatsMetadataSDKType {
    trailing_epoch: number;
}
/** EpochStats stores stats for a particular epoch */
export interface EpochStats {
    /** Epoch end time */
    epochEndTime: Date;
    /** Stats for each user in this epoch. Sorted by user. */
    stats: EpochStats_UserWithStats[];
}
export interface EpochStatsProtoMsg {
    typeUrl: "/klyraprotocol.stats.EpochStats";
    value: Uint8Array;
}
/** EpochStats stores stats for a particular epoch */
export interface EpochStatsAmino {
    /** Epoch end time */
    epoch_end_time?: string;
    /** Stats for each user in this epoch. Sorted by user. */
    stats?: EpochStats_UserWithStatsAmino[];
}
export interface EpochStatsAminoMsg {
    type: "/klyraprotocol.stats.EpochStats";
    value: EpochStatsAmino;
}
/** EpochStats stores stats for a particular epoch */
export interface EpochStatsSDKType {
    epoch_end_time: Date;
    stats: EpochStats_UserWithStatsSDKType[];
}
/** A user and its associated stats */
export interface EpochStats_UserWithStats {
    user: string;
    stats?: UserStats;
}
export interface EpochStats_UserWithStatsProtoMsg {
    typeUrl: "/klyraprotocol.stats.UserWithStats";
    value: Uint8Array;
}
/** A user and its associated stats */
export interface EpochStats_UserWithStatsAmino {
    user?: string;
    stats?: UserStatsAmino;
}
export interface EpochStats_UserWithStatsAminoMsg {
    type: "/klyraprotocol.stats.UserWithStats";
    value: EpochStats_UserWithStatsAmino;
}
/** A user and its associated stats */
export interface EpochStats_UserWithStatsSDKType {
    user: string;
    stats?: UserStatsSDKType;
}
/** GlobalStats stores global stats */
export interface GlobalStats {
    /** Notional TDAI traded in quantums */
    notionalTraded: bigint;
}
export interface GlobalStatsProtoMsg {
    typeUrl: "/klyraprotocol.stats.GlobalStats";
    value: Uint8Array;
}
/** GlobalStats stores global stats */
export interface GlobalStatsAmino {
    /** Notional TDAI traded in quantums */
    notional_traded?: string;
}
export interface GlobalStatsAminoMsg {
    type: "/klyraprotocol.stats.GlobalStats";
    value: GlobalStatsAmino;
}
/** GlobalStats stores global stats */
export interface GlobalStatsSDKType {
    notional_traded: bigint;
}
/** UserStats stores stats for a User */
export interface UserStats {
    /** Taker TDAI in quantums */
    takerNotional: bigint;
    /** Maker TDAI in quantums */
    makerNotional: bigint;
}
export interface UserStatsProtoMsg {
    typeUrl: "/klyraprotocol.stats.UserStats";
    value: Uint8Array;
}
/** UserStats stores stats for a User */
export interface UserStatsAmino {
    /** Taker TDAI in quantums */
    taker_notional?: string;
    /** Maker TDAI in quantums */
    maker_notional?: string;
}
export interface UserStatsAminoMsg {
    type: "/klyraprotocol.stats.UserStats";
    value: UserStatsAmino;
}
/** UserStats stores stats for a User */
export interface UserStatsSDKType {
    taker_notional: bigint;
    maker_notional: bigint;
}
export declare const BlockStats: {
    typeUrl: string;
    is(o: any): o is BlockStats;
    isSDK(o: any): o is BlockStatsSDKType;
    isAmino(o: any): o is BlockStatsAmino;
    encode(message: BlockStats, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): BlockStats;
    fromPartial(object: Partial<BlockStats>): BlockStats;
    fromAmino(object: BlockStatsAmino): BlockStats;
    toAmino(message: BlockStats): BlockStatsAmino;
    fromAminoMsg(object: BlockStatsAminoMsg): BlockStats;
    fromProtoMsg(message: BlockStatsProtoMsg): BlockStats;
    toProto(message: BlockStats): Uint8Array;
    toProtoMsg(message: BlockStats): BlockStatsProtoMsg;
};
export declare const BlockStats_Fill: {
    typeUrl: string;
    is(o: any): o is BlockStats_Fill;
    isSDK(o: any): o is BlockStats_FillSDKType;
    isAmino(o: any): o is BlockStats_FillAmino;
    encode(message: BlockStats_Fill, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): BlockStats_Fill;
    fromPartial(object: Partial<BlockStats_Fill>): BlockStats_Fill;
    fromAmino(object: BlockStats_FillAmino): BlockStats_Fill;
    toAmino(message: BlockStats_Fill): BlockStats_FillAmino;
    fromAminoMsg(object: BlockStats_FillAminoMsg): BlockStats_Fill;
    fromProtoMsg(message: BlockStats_FillProtoMsg): BlockStats_Fill;
    toProto(message: BlockStats_Fill): Uint8Array;
    toProtoMsg(message: BlockStats_Fill): BlockStats_FillProtoMsg;
};
export declare const StatsMetadata: {
    typeUrl: string;
    is(o: any): o is StatsMetadata;
    isSDK(o: any): o is StatsMetadataSDKType;
    isAmino(o: any): o is StatsMetadataAmino;
    encode(message: StatsMetadata, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StatsMetadata;
    fromPartial(object: Partial<StatsMetadata>): StatsMetadata;
    fromAmino(object: StatsMetadataAmino): StatsMetadata;
    toAmino(message: StatsMetadata): StatsMetadataAmino;
    fromAminoMsg(object: StatsMetadataAminoMsg): StatsMetadata;
    fromProtoMsg(message: StatsMetadataProtoMsg): StatsMetadata;
    toProto(message: StatsMetadata): Uint8Array;
    toProtoMsg(message: StatsMetadata): StatsMetadataProtoMsg;
};
export declare const EpochStats: {
    typeUrl: string;
    is(o: any): o is EpochStats;
    isSDK(o: any): o is EpochStatsSDKType;
    isAmino(o: any): o is EpochStatsAmino;
    encode(message: EpochStats, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): EpochStats;
    fromPartial(object: Partial<EpochStats>): EpochStats;
    fromAmino(object: EpochStatsAmino): EpochStats;
    toAmino(message: EpochStats): EpochStatsAmino;
    fromAminoMsg(object: EpochStatsAminoMsg): EpochStats;
    fromProtoMsg(message: EpochStatsProtoMsg): EpochStats;
    toProto(message: EpochStats): Uint8Array;
    toProtoMsg(message: EpochStats): EpochStatsProtoMsg;
};
export declare const EpochStats_UserWithStats: {
    typeUrl: string;
    is(o: any): o is EpochStats_UserWithStats;
    isSDK(o: any): o is EpochStats_UserWithStatsSDKType;
    isAmino(o: any): o is EpochStats_UserWithStatsAmino;
    encode(message: EpochStats_UserWithStats, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): EpochStats_UserWithStats;
    fromPartial(object: Partial<EpochStats_UserWithStats>): EpochStats_UserWithStats;
    fromAmino(object: EpochStats_UserWithStatsAmino): EpochStats_UserWithStats;
    toAmino(message: EpochStats_UserWithStats): EpochStats_UserWithStatsAmino;
    fromAminoMsg(object: EpochStats_UserWithStatsAminoMsg): EpochStats_UserWithStats;
    fromProtoMsg(message: EpochStats_UserWithStatsProtoMsg): EpochStats_UserWithStats;
    toProto(message: EpochStats_UserWithStats): Uint8Array;
    toProtoMsg(message: EpochStats_UserWithStats): EpochStats_UserWithStatsProtoMsg;
};
export declare const GlobalStats: {
    typeUrl: string;
    is(o: any): o is GlobalStats;
    isSDK(o: any): o is GlobalStatsSDKType;
    isAmino(o: any): o is GlobalStatsAmino;
    encode(message: GlobalStats, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GlobalStats;
    fromPartial(object: Partial<GlobalStats>): GlobalStats;
    fromAmino(object: GlobalStatsAmino): GlobalStats;
    toAmino(message: GlobalStats): GlobalStatsAmino;
    fromAminoMsg(object: GlobalStatsAminoMsg): GlobalStats;
    fromProtoMsg(message: GlobalStatsProtoMsg): GlobalStats;
    toProto(message: GlobalStats): Uint8Array;
    toProtoMsg(message: GlobalStats): GlobalStatsProtoMsg;
};
export declare const UserStats: {
    typeUrl: string;
    is(o: any): o is UserStats;
    isSDK(o: any): o is UserStatsSDKType;
    isAmino(o: any): o is UserStatsAmino;
    encode(message: UserStats, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): UserStats;
    fromPartial(object: Partial<UserStats>): UserStats;
    fromAmino(object: UserStatsAmino): UserStats;
    toAmino(message: UserStats): UserStatsAmino;
    fromAminoMsg(object: UserStatsAminoMsg): UserStats;
    fromProtoMsg(message: UserStatsProtoMsg): UserStats;
    toProto(message: UserStats): Uint8Array;
    toProtoMsg(message: UserStats): UserStatsProtoMsg;
};
