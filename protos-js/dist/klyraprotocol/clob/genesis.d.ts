import { ClobPair, ClobPairAmino, ClobPairSDKType } from "./clob_pair";
import { LiquidationsConfig, LiquidationsConfigAmino, LiquidationsConfigSDKType } from "./liquidations_config";
import { BlockRateLimitConfiguration, BlockRateLimitConfigurationAmino, BlockRateLimitConfigurationSDKType } from "./block_rate_limit_config";
import { EquityTierLimitConfiguration, EquityTierLimitConfigurationAmino, EquityTierLimitConfigurationSDKType } from "./equity_tier_limit_config";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the clob module's genesis state. */
export interface GenesisState {
    clobPairs: ClobPair[];
    liquidationsConfig: LiquidationsConfig;
    blockRateLimitConfig: BlockRateLimitConfiguration;
    equityTierLimitConfig: EquityTierLimitConfiguration;
}
export interface GenesisStateProtoMsg {
    typeUrl: "/klyraprotocol.clob.GenesisState";
    value: Uint8Array;
}
/** GenesisState defines the clob module's genesis state. */
export interface GenesisStateAmino {
    clob_pairs?: ClobPairAmino[];
    liquidations_config?: LiquidationsConfigAmino;
    block_rate_limit_config?: BlockRateLimitConfigurationAmino;
    equity_tier_limit_config?: EquityTierLimitConfigurationAmino;
}
export interface GenesisStateAminoMsg {
    type: "/klyraprotocol.clob.GenesisState";
    value: GenesisStateAmino;
}
/** GenesisState defines the clob module's genesis state. */
export interface GenesisStateSDKType {
    clob_pairs: ClobPairSDKType[];
    liquidations_config: LiquidationsConfigSDKType;
    block_rate_limit_config: BlockRateLimitConfigurationSDKType;
    equity_tier_limit_config: EquityTierLimitConfigurationSDKType;
}
export declare const GenesisState: {
    typeUrl: string;
    is(o: any): o is GenesisState;
    isSDK(o: any): o is GenesisStateSDKType;
    isAmino(o: any): o is GenesisStateAmino;
    encode(message: GenesisState, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): GenesisState;
    fromPartial(object: Partial<GenesisState>): GenesisState;
    fromAmino(object: GenesisStateAmino): GenesisState;
    toAmino(message: GenesisState): GenesisStateAmino;
    fromAminoMsg(object: GenesisStateAminoMsg): GenesisState;
    fromProtoMsg(message: GenesisStateProtoMsg): GenesisState;
    toProto(message: GenesisState): Uint8Array;
    toProtoMsg(message: GenesisState): GenesisStateProtoMsg;
};
