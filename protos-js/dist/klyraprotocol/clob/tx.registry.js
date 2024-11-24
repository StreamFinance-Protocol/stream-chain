"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposer = exports.load = exports.registry = void 0;
const tx_1 = require("./tx");
exports.registry = [["/klyraprotocol.clob.MsgProposedOperations", tx_1.MsgProposedOperations], ["/klyraprotocol.clob.MsgPlaceOrder", tx_1.MsgPlaceOrder], ["/klyraprotocol.clob.MsgCancelOrder", tx_1.MsgCancelOrder], ["/klyraprotocol.clob.MsgBatchCancel", tx_1.MsgBatchCancel], ["/klyraprotocol.clob.MsgCreateClobPair", tx_1.MsgCreateClobPair], ["/klyraprotocol.clob.MsgUpdateClobPair", tx_1.MsgUpdateClobPair], ["/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration", tx_1.MsgUpdateEquityTierLimitConfiguration], ["/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration", tx_1.MsgUpdateBlockRateLimitConfiguration], ["/klyraprotocol.clob.MsgUpdateLiquidationsConfig", tx_1.MsgUpdateLiquidationsConfig]];
const load = (protoRegistry) => {
    exports.registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
exports.load = load;
exports.MessageComposer = {
    encoded: {
        proposedOperations(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgProposedOperations",
                value: tx_1.MsgProposedOperations.encode(value).finish()
            };
        },
        placeOrder(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
                value: tx_1.MsgPlaceOrder.encode(value).finish()
            };
        },
        cancelOrder(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
                value: tx_1.MsgCancelOrder.encode(value).finish()
            };
        },
        batchCancel(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
                value: tx_1.MsgBatchCancel.encode(value).finish()
            };
        },
        createClobPair(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
                value: tx_1.MsgCreateClobPair.encode(value).finish()
            };
        },
        updateClobPair(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
                value: tx_1.MsgUpdateClobPair.encode(value).finish()
            };
        },
        updateEquityTierLimitConfiguration(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
                value: tx_1.MsgUpdateEquityTierLimitConfiguration.encode(value).finish()
            };
        },
        updateBlockRateLimitConfiguration(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
                value: tx_1.MsgUpdateBlockRateLimitConfiguration.encode(value).finish()
            };
        },
        updateLiquidationsConfig(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
                value: tx_1.MsgUpdateLiquidationsConfig.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        proposedOperations(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgProposedOperations",
                value
            };
        },
        placeOrder(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
                value
            };
        },
        cancelOrder(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
                value
            };
        },
        batchCancel(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
                value
            };
        },
        createClobPair(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
                value
            };
        },
        updateClobPair(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
                value
            };
        },
        updateEquityTierLimitConfiguration(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
                value
            };
        },
        updateBlockRateLimitConfiguration(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
                value
            };
        },
        updateLiquidationsConfig(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
                value
            };
        }
    },
    fromPartial: {
        proposedOperations(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgProposedOperations",
                value: tx_1.MsgProposedOperations.fromPartial(value)
            };
        },
        placeOrder(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
                value: tx_1.MsgPlaceOrder.fromPartial(value)
            };
        },
        cancelOrder(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
                value: tx_1.MsgCancelOrder.fromPartial(value)
            };
        },
        batchCancel(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
                value: tx_1.MsgBatchCancel.fromPartial(value)
            };
        },
        createClobPair(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
                value: tx_1.MsgCreateClobPair.fromPartial(value)
            };
        },
        updateClobPair(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
                value: tx_1.MsgUpdateClobPair.fromPartial(value)
            };
        },
        updateEquityTierLimitConfiguration(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
                value: tx_1.MsgUpdateEquityTierLimitConfiguration.fromPartial(value)
            };
        },
        updateBlockRateLimitConfiguration(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
                value: tx_1.MsgUpdateBlockRateLimitConfiguration.fromPartial(value)
            };
        },
        updateLiquidationsConfig(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
                value: tx_1.MsgUpdateLiquidationsConfig.fromPartial(value)
            };
        }
    }
};
