import { BinaryReader, BinaryWriter } from "../../binary";
/** Defines the block rate limits for CLOB specific operations. */
export interface BlockRateLimitConfiguration {
    /**
     * How many short term order attempts (successful and failed) are allowed for
     * an account per N blocks. Note that the rate limits are applied
     * in an AND fashion such that an order placement must pass all rate limit
     * configurations.
     *
     * Specifying 0 values disables this rate limit.
     * Deprecated in favor of `max_short_term_orders_and_cancels_per_n_blocks`
     * for v5.x onwards.
     */
    /** @deprecated */
    maxShortTermOrdersPerNBlocks: MaxPerNBlocksRateLimit[];
    /**
     * How many stateful order attempts (successful and failed) are allowed for
     * an account per N blocks. Note that the rate limits are applied
     * in an AND fashion such that an order placement must pass all rate limit
     * configurations.
     *
     * Specifying 0 values disables this rate limit.
     */
    maxStatefulOrdersPerNBlocks: MaxPerNBlocksRateLimit[];
    /** @deprecated */
    maxShortTermOrderCancellationsPerNBlocks: MaxPerNBlocksRateLimit[];
    maxShortTermOrdersAndCancelsPerNBlocks: MaxPerNBlocksRateLimit[];
}
export interface BlockRateLimitConfigurationProtoMsg {
    typeUrl: "/klyraprotocol.clob.BlockRateLimitConfiguration";
    value: Uint8Array;
}
/** Defines the block rate limits for CLOB specific operations. */
export interface BlockRateLimitConfigurationAmino {
    /**
     * How many short term order attempts (successful and failed) are allowed for
     * an account per N blocks. Note that the rate limits are applied
     * in an AND fashion such that an order placement must pass all rate limit
     * configurations.
     *
     * Specifying 0 values disables this rate limit.
     * Deprecated in favor of `max_short_term_orders_and_cancels_per_n_blocks`
     * for v5.x onwards.
     */
    /** @deprecated */
    max_short_term_orders_per_n_blocks?: MaxPerNBlocksRateLimitAmino[];
    /**
     * How many stateful order attempts (successful and failed) are allowed for
     * an account per N blocks. Note that the rate limits are applied
     * in an AND fashion such that an order placement must pass all rate limit
     * configurations.
     *
     * Specifying 0 values disables this rate limit.
     */
    max_stateful_orders_per_n_blocks?: MaxPerNBlocksRateLimitAmino[];
    /** @deprecated */
    max_short_term_order_cancellations_per_n_blocks?: MaxPerNBlocksRateLimitAmino[];
    max_short_term_orders_and_cancels_per_n_blocks?: MaxPerNBlocksRateLimitAmino[];
}
export interface BlockRateLimitConfigurationAminoMsg {
    type: "/klyraprotocol.clob.BlockRateLimitConfiguration";
    value: BlockRateLimitConfigurationAmino;
}
/** Defines the block rate limits for CLOB specific operations. */
export interface BlockRateLimitConfigurationSDKType {
    /** @deprecated */
    max_short_term_orders_per_n_blocks: MaxPerNBlocksRateLimitSDKType[];
    max_stateful_orders_per_n_blocks: MaxPerNBlocksRateLimitSDKType[];
    /** @deprecated */
    max_short_term_order_cancellations_per_n_blocks: MaxPerNBlocksRateLimitSDKType[];
    max_short_term_orders_and_cancels_per_n_blocks: MaxPerNBlocksRateLimitSDKType[];
}
/** Defines a rate limit over a specific number of blocks. */
export interface MaxPerNBlocksRateLimit {
    /**
     * How many blocks the rate limit is over.
     * Specifying 0 is invalid.
     */
    numBlocks: number;
    /**
     * What the limit is for `num_blocks`.
     * Specifying 0 is invalid.
     */
    limit: number;
}
export interface MaxPerNBlocksRateLimitProtoMsg {
    typeUrl: "/klyraprotocol.clob.MaxPerNBlocksRateLimit";
    value: Uint8Array;
}
/** Defines a rate limit over a specific number of blocks. */
export interface MaxPerNBlocksRateLimitAmino {
    /**
     * How many blocks the rate limit is over.
     * Specifying 0 is invalid.
     */
    num_blocks?: number;
    /**
     * What the limit is for `num_blocks`.
     * Specifying 0 is invalid.
     */
    limit?: number;
}
export interface MaxPerNBlocksRateLimitAminoMsg {
    type: "/klyraprotocol.clob.MaxPerNBlocksRateLimit";
    value: MaxPerNBlocksRateLimitAmino;
}
/** Defines a rate limit over a specific number of blocks. */
export interface MaxPerNBlocksRateLimitSDKType {
    num_blocks: number;
    limit: number;
}
export declare const BlockRateLimitConfiguration: {
    typeUrl: string;
    is(o: any): o is BlockRateLimitConfiguration;
    isSDK(o: any): o is BlockRateLimitConfigurationSDKType;
    isAmino(o: any): o is BlockRateLimitConfigurationAmino;
    encode(message: BlockRateLimitConfiguration, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): BlockRateLimitConfiguration;
    fromPartial(object: Partial<BlockRateLimitConfiguration>): BlockRateLimitConfiguration;
    fromAmino(object: BlockRateLimitConfigurationAmino): BlockRateLimitConfiguration;
    toAmino(message: BlockRateLimitConfiguration): BlockRateLimitConfigurationAmino;
    fromAminoMsg(object: BlockRateLimitConfigurationAminoMsg): BlockRateLimitConfiguration;
    fromProtoMsg(message: BlockRateLimitConfigurationProtoMsg): BlockRateLimitConfiguration;
    toProto(message: BlockRateLimitConfiguration): Uint8Array;
    toProtoMsg(message: BlockRateLimitConfiguration): BlockRateLimitConfigurationProtoMsg;
};
export declare const MaxPerNBlocksRateLimit: {
    typeUrl: string;
    is(o: any): o is MaxPerNBlocksRateLimit;
    isSDK(o: any): o is MaxPerNBlocksRateLimitSDKType;
    isAmino(o: any): o is MaxPerNBlocksRateLimitAmino;
    encode(message: MaxPerNBlocksRateLimit, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): MaxPerNBlocksRateLimit;
    fromPartial(object: Partial<MaxPerNBlocksRateLimit>): MaxPerNBlocksRateLimit;
    fromAmino(object: MaxPerNBlocksRateLimitAmino): MaxPerNBlocksRateLimit;
    toAmino(message: MaxPerNBlocksRateLimit): MaxPerNBlocksRateLimitAmino;
    fromAminoMsg(object: MaxPerNBlocksRateLimitAminoMsg): MaxPerNBlocksRateLimit;
    fromProtoMsg(message: MaxPerNBlocksRateLimitProtoMsg): MaxPerNBlocksRateLimit;
    toProto(message: MaxPerNBlocksRateLimit): Uint8Array;
    toProtoMsg(message: MaxPerNBlocksRateLimit): MaxPerNBlocksRateLimitProtoMsg;
};
