//@ts-nocheck
import { MsgProposedOperations, MsgPlaceOrder, MsgCancelOrder, MsgBatchCancel, MsgCreateClobPair, MsgUpdateClobPair, MsgUpdateEquityTierLimitConfiguration, MsgUpdateBlockRateLimitConfiguration, MsgUpdateLiquidationsConfig } from "./tx";
export const AminoConverter = {
    "/klyraprotocol.clob.MsgProposedOperations": {
        aminoType: "/klyraprotocol.clob.MsgProposedOperations",
        toAmino: MsgProposedOperations.toAmino,
        fromAmino: MsgProposedOperations.fromAmino
    },
    "/klyraprotocol.clob.MsgPlaceOrder": {
        aminoType: "/klyraprotocol.clob.MsgPlaceOrder",
        toAmino: MsgPlaceOrder.toAmino,
        fromAmino: MsgPlaceOrder.fromAmino
    },
    "/klyraprotocol.clob.MsgCancelOrder": {
        aminoType: "/klyraprotocol.clob.MsgCancelOrder",
        toAmino: MsgCancelOrder.toAmino,
        fromAmino: MsgCancelOrder.fromAmino
    },
    "/klyraprotocol.clob.MsgBatchCancel": {
        aminoType: "/klyraprotocol.clob.MsgBatchCancel",
        toAmino: MsgBatchCancel.toAmino,
        fromAmino: MsgBatchCancel.fromAmino
    },
    "/klyraprotocol.clob.MsgCreateClobPair": {
        aminoType: "/klyraprotocol.clob.MsgCreateClobPair",
        toAmino: MsgCreateClobPair.toAmino,
        fromAmino: MsgCreateClobPair.fromAmino
    },
    "/klyraprotocol.clob.MsgUpdateClobPair": {
        aminoType: "/klyraprotocol.clob.MsgUpdateClobPair",
        toAmino: MsgUpdateClobPair.toAmino,
        fromAmino: MsgUpdateClobPair.fromAmino
    },
    "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration": {
        aminoType: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
        toAmino: MsgUpdateEquityTierLimitConfiguration.toAmino,
        fromAmino: MsgUpdateEquityTierLimitConfiguration.fromAmino
    },
    "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration": {
        aminoType: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
        toAmino: MsgUpdateBlockRateLimitConfiguration.toAmino,
        fromAmino: MsgUpdateBlockRateLimitConfiguration.fromAmino
    },
    "/klyraprotocol.clob.MsgUpdateLiquidationsConfig": {
        aminoType: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
        toAmino: MsgUpdateLiquidationsConfig.toAmino,
        fromAmino: MsgUpdateLiquidationsConfig.fromAmino
    }
};
