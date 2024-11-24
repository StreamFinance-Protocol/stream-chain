import { MsgProposedOperations, MsgPlaceOrder, MsgCancelOrder, MsgBatchCancel, MsgCreateClobPair, MsgUpdateClobPair, MsgUpdateEquityTierLimitConfiguration, MsgUpdateBlockRateLimitConfiguration, MsgUpdateLiquidationsConfig } from "./tx";
export declare const AminoConverter: {
    "/klyraprotocol.clob.MsgProposedOperations": {
        aminoType: string;
        toAmino: (message: MsgProposedOperations) => import("./tx").MsgProposedOperationsAmino;
        fromAmino: (object: import("./tx").MsgProposedOperationsAmino) => MsgProposedOperations;
    };
    "/klyraprotocol.clob.MsgPlaceOrder": {
        aminoType: string;
        toAmino: (message: MsgPlaceOrder) => import("./tx").MsgPlaceOrderAmino;
        fromAmino: (object: import("./tx").MsgPlaceOrderAmino) => MsgPlaceOrder;
    };
    "/klyraprotocol.clob.MsgCancelOrder": {
        aminoType: string;
        toAmino: (message: MsgCancelOrder) => import("./tx").MsgCancelOrderAmino;
        fromAmino: (object: import("./tx").MsgCancelOrderAmino) => MsgCancelOrder;
    };
    "/klyraprotocol.clob.MsgBatchCancel": {
        aminoType: string;
        toAmino: (message: MsgBatchCancel) => import("./tx").MsgBatchCancelAmino;
        fromAmino: (object: import("./tx").MsgBatchCancelAmino) => MsgBatchCancel;
    };
    "/klyraprotocol.clob.MsgCreateClobPair": {
        aminoType: string;
        toAmino: (message: MsgCreateClobPair) => import("./tx").MsgCreateClobPairAmino;
        fromAmino: (object: import("./tx").MsgCreateClobPairAmino) => MsgCreateClobPair;
    };
    "/klyraprotocol.clob.MsgUpdateClobPair": {
        aminoType: string;
        toAmino: (message: MsgUpdateClobPair) => import("./tx").MsgUpdateClobPairAmino;
        fromAmino: (object: import("./tx").MsgUpdateClobPairAmino) => MsgUpdateClobPair;
    };
    "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration": {
        aminoType: string;
        toAmino: (message: MsgUpdateEquityTierLimitConfiguration) => import("./tx").MsgUpdateEquityTierLimitConfigurationAmino;
        fromAmino: (object: import("./tx").MsgUpdateEquityTierLimitConfigurationAmino) => MsgUpdateEquityTierLimitConfiguration;
    };
    "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration": {
        aminoType: string;
        toAmino: (message: MsgUpdateBlockRateLimitConfiguration) => import("./tx").MsgUpdateBlockRateLimitConfigurationAmino;
        fromAmino: (object: import("./tx").MsgUpdateBlockRateLimitConfigurationAmino) => MsgUpdateBlockRateLimitConfiguration;
    };
    "/klyraprotocol.clob.MsgUpdateLiquidationsConfig": {
        aminoType: string;
        toAmino: (message: MsgUpdateLiquidationsConfig) => import("./tx").MsgUpdateLiquidationsConfigAmino;
        fromAmino: (object: import("./tx").MsgUpdateLiquidationsConfigAmino) => MsgUpdateLiquidationsConfig;
    };
};
