"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/klyraprotocol.clob.MsgProposedOperations": {
        aminoType: "/klyraprotocol.clob.MsgProposedOperations",
        toAmino: tx_1.MsgProposedOperations.toAmino,
        fromAmino: tx_1.MsgProposedOperations.fromAmino
    },
    "/klyraprotocol.clob.MsgPlaceOrder": {
        aminoType: "/klyraprotocol.clob.MsgPlaceOrder",
        toAmino: tx_1.MsgPlaceOrder.toAmino,
        fromAmino: tx_1.MsgPlaceOrder.fromAmino
    },
    "/klyraprotocol.clob.MsgCancelOrder": {
        aminoType: "/klyraprotocol.clob.MsgCancelOrder",
        toAmino: tx_1.MsgCancelOrder.toAmino,
        fromAmino: tx_1.MsgCancelOrder.fromAmino
    },
    "/klyraprotocol.clob.MsgBatchCancel": {
        aminoType: "/klyraprotocol.clob.MsgBatchCancel",
        toAmino: tx_1.MsgBatchCancel.toAmino,
        fromAmino: tx_1.MsgBatchCancel.fromAmino
    },
    "/klyraprotocol.clob.MsgCreateClobPair": {
        aminoType: "/klyraprotocol.clob.MsgCreateClobPair",
        toAmino: tx_1.MsgCreateClobPair.toAmino,
        fromAmino: tx_1.MsgCreateClobPair.fromAmino
    },
    "/klyraprotocol.clob.MsgUpdateClobPair": {
        aminoType: "/klyraprotocol.clob.MsgUpdateClobPair",
        toAmino: tx_1.MsgUpdateClobPair.toAmino,
        fromAmino: tx_1.MsgUpdateClobPair.fromAmino
    },
    "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration": {
        aminoType: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
        toAmino: tx_1.MsgUpdateEquityTierLimitConfiguration.toAmino,
        fromAmino: tx_1.MsgUpdateEquityTierLimitConfiguration.fromAmino
    },
    "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration": {
        aminoType: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
        toAmino: tx_1.MsgUpdateBlockRateLimitConfiguration.toAmino,
        fromAmino: tx_1.MsgUpdateBlockRateLimitConfiguration.fromAmino
    },
    "/klyraprotocol.clob.MsgUpdateLiquidationsConfig": {
        aminoType: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
        toAmino: tx_1.MsgUpdateLiquidationsConfig.toAmino,
        fromAmino: tx_1.MsgUpdateLiquidationsConfig.fromAmino
    }
};
