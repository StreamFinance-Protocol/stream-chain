import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgProposedOperations, MsgPlaceOrder, MsgCancelOrder, MsgBatchCancel, MsgCreateClobPair, MsgUpdateClobPair, MsgUpdateEquityTierLimitConfiguration, MsgUpdateBlockRateLimitConfiguration, MsgUpdateLiquidationsConfig } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        proposedOperations(value: MsgProposedOperations): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        placeOrder(value: MsgPlaceOrder): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        cancelOrder(value: MsgCancelOrder): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        batchCancel(value: MsgBatchCancel): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        createClobPair(value: MsgCreateClobPair): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        updateClobPair(value: MsgUpdateClobPair): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        updateEquityTierLimitConfiguration(value: MsgUpdateEquityTierLimitConfiguration): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        updateBlockRateLimitConfiguration(value: MsgUpdateBlockRateLimitConfiguration): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        updateLiquidationsConfig(value: MsgUpdateLiquidationsConfig): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        proposedOperations(value: MsgProposedOperations): {
            typeUrl: string;
            value: MsgProposedOperations;
        };
        placeOrder(value: MsgPlaceOrder): {
            typeUrl: string;
            value: MsgPlaceOrder;
        };
        cancelOrder(value: MsgCancelOrder): {
            typeUrl: string;
            value: MsgCancelOrder;
        };
        batchCancel(value: MsgBatchCancel): {
            typeUrl: string;
            value: MsgBatchCancel;
        };
        createClobPair(value: MsgCreateClobPair): {
            typeUrl: string;
            value: MsgCreateClobPair;
        };
        updateClobPair(value: MsgUpdateClobPair): {
            typeUrl: string;
            value: MsgUpdateClobPair;
        };
        updateEquityTierLimitConfiguration(value: MsgUpdateEquityTierLimitConfiguration): {
            typeUrl: string;
            value: MsgUpdateEquityTierLimitConfiguration;
        };
        updateBlockRateLimitConfiguration(value: MsgUpdateBlockRateLimitConfiguration): {
            typeUrl: string;
            value: MsgUpdateBlockRateLimitConfiguration;
        };
        updateLiquidationsConfig(value: MsgUpdateLiquidationsConfig): {
            typeUrl: string;
            value: MsgUpdateLiquidationsConfig;
        };
    };
    fromPartial: {
        proposedOperations(value: MsgProposedOperations): {
            typeUrl: string;
            value: MsgProposedOperations;
        };
        placeOrder(value: MsgPlaceOrder): {
            typeUrl: string;
            value: MsgPlaceOrder;
        };
        cancelOrder(value: MsgCancelOrder): {
            typeUrl: string;
            value: MsgCancelOrder;
        };
        batchCancel(value: MsgBatchCancel): {
            typeUrl: string;
            value: MsgBatchCancel;
        };
        createClobPair(value: MsgCreateClobPair): {
            typeUrl: string;
            value: MsgCreateClobPair;
        };
        updateClobPair(value: MsgUpdateClobPair): {
            typeUrl: string;
            value: MsgUpdateClobPair;
        };
        updateEquityTierLimitConfiguration(value: MsgUpdateEquityTierLimitConfiguration): {
            typeUrl: string;
            value: MsgUpdateEquityTierLimitConfiguration;
        };
        updateBlockRateLimitConfiguration(value: MsgUpdateBlockRateLimitConfiguration): {
            typeUrl: string;
            value: MsgUpdateBlockRateLimitConfiguration;
        };
        updateLiquidationsConfig(value: MsgUpdateLiquidationsConfig): {
            typeUrl: string;
            value: MsgUpdateLiquidationsConfig;
        };
    };
};
