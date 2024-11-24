import { MsgProposedOperations, MsgPlaceOrder, MsgCancelOrder, MsgBatchCancel, MsgCreateClobPair, MsgUpdateClobPair, MsgUpdateEquityTierLimitConfiguration, MsgUpdateBlockRateLimitConfiguration, MsgUpdateLiquidationsConfig } from "./tx";
export const registry = [["/klyraprotocol.clob.MsgProposedOperations", MsgProposedOperations], ["/klyraprotocol.clob.MsgPlaceOrder", MsgPlaceOrder], ["/klyraprotocol.clob.MsgCancelOrder", MsgCancelOrder], ["/klyraprotocol.clob.MsgBatchCancel", MsgBatchCancel], ["/klyraprotocol.clob.MsgCreateClobPair", MsgCreateClobPair], ["/klyraprotocol.clob.MsgUpdateClobPair", MsgUpdateClobPair], ["/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration", MsgUpdateEquityTierLimitConfiguration], ["/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration", MsgUpdateBlockRateLimitConfiguration], ["/klyraprotocol.clob.MsgUpdateLiquidationsConfig", MsgUpdateLiquidationsConfig]];
export const load = (protoRegistry) => {
    registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
export const MessageComposer = {
    encoded: {
        proposedOperations(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgProposedOperations",
                value: MsgProposedOperations.encode(value).finish()
            };
        },
        placeOrder(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
                value: MsgPlaceOrder.encode(value).finish()
            };
        },
        cancelOrder(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
                value: MsgCancelOrder.encode(value).finish()
            };
        },
        batchCancel(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
                value: MsgBatchCancel.encode(value).finish()
            };
        },
        createClobPair(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
                value: MsgCreateClobPair.encode(value).finish()
            };
        },
        updateClobPair(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
                value: MsgUpdateClobPair.encode(value).finish()
            };
        },
        updateEquityTierLimitConfiguration(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
                value: MsgUpdateEquityTierLimitConfiguration.encode(value).finish()
            };
        },
        updateBlockRateLimitConfiguration(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
                value: MsgUpdateBlockRateLimitConfiguration.encode(value).finish()
            };
        },
        updateLiquidationsConfig(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
                value: MsgUpdateLiquidationsConfig.encode(value).finish()
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
                value: MsgProposedOperations.fromPartial(value)
            };
        },
        placeOrder(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
                value: MsgPlaceOrder.fromPartial(value)
            };
        },
        cancelOrder(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
                value: MsgCancelOrder.fromPartial(value)
            };
        },
        batchCancel(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
                value: MsgBatchCancel.fromPartial(value)
            };
        },
        createClobPair(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
                value: MsgCreateClobPair.fromPartial(value)
            };
        },
        updateClobPair(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
                value: MsgUpdateClobPair.fromPartial(value)
            };
        },
        updateEquityTierLimitConfiguration(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
                value: MsgUpdateEquityTierLimitConfiguration.fromPartial(value)
            };
        },
        updateBlockRateLimitConfiguration(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
                value: MsgUpdateBlockRateLimitConfiguration.fromPartial(value)
            };
        },
        updateLiquidationsConfig(value) {
            return {
                typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
                value: MsgUpdateLiquidationsConfig.fromPartial(value)
            };
        }
    }
};
