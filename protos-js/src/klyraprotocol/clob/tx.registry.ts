//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgProposedOperations, MsgPlaceOrder, MsgCancelOrder, MsgBatchCancel, MsgCreateClobPair, MsgUpdateClobPair, MsgUpdateEquityTierLimitConfiguration, MsgUpdateBlockRateLimitConfiguration, MsgUpdateLiquidationsConfig } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/klyraprotocol.clob.MsgProposedOperations", MsgProposedOperations], ["/klyraprotocol.clob.MsgPlaceOrder", MsgPlaceOrder], ["/klyraprotocol.clob.MsgCancelOrder", MsgCancelOrder], ["/klyraprotocol.clob.MsgBatchCancel", MsgBatchCancel], ["/klyraprotocol.clob.MsgCreateClobPair", MsgCreateClobPair], ["/klyraprotocol.clob.MsgUpdateClobPair", MsgUpdateClobPair], ["/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration", MsgUpdateEquityTierLimitConfiguration], ["/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration", MsgUpdateBlockRateLimitConfiguration], ["/klyraprotocol.clob.MsgUpdateLiquidationsConfig", MsgUpdateLiquidationsConfig]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    proposedOperations(value: MsgProposedOperations) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgProposedOperations",
        value: MsgProposedOperations.encode(value).finish()
      };
    },
    placeOrder(value: MsgPlaceOrder) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
        value: MsgPlaceOrder.encode(value).finish()
      };
    },
    cancelOrder(value: MsgCancelOrder) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
        value: MsgCancelOrder.encode(value).finish()
      };
    },
    batchCancel(value: MsgBatchCancel) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
        value: MsgBatchCancel.encode(value).finish()
      };
    },
    createClobPair(value: MsgCreateClobPair) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
        value: MsgCreateClobPair.encode(value).finish()
      };
    },
    updateClobPair(value: MsgUpdateClobPair) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
        value: MsgUpdateClobPair.encode(value).finish()
      };
    },
    updateEquityTierLimitConfiguration(value: MsgUpdateEquityTierLimitConfiguration) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
        value: MsgUpdateEquityTierLimitConfiguration.encode(value).finish()
      };
    },
    updateBlockRateLimitConfiguration(value: MsgUpdateBlockRateLimitConfiguration) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
        value: MsgUpdateBlockRateLimitConfiguration.encode(value).finish()
      };
    },
    updateLiquidationsConfig(value: MsgUpdateLiquidationsConfig) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
        value: MsgUpdateLiquidationsConfig.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    proposedOperations(value: MsgProposedOperations) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgProposedOperations",
        value
      };
    },
    placeOrder(value: MsgPlaceOrder) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
        value
      };
    },
    cancelOrder(value: MsgCancelOrder) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
        value
      };
    },
    batchCancel(value: MsgBatchCancel) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
        value
      };
    },
    createClobPair(value: MsgCreateClobPair) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
        value
      };
    },
    updateClobPair(value: MsgUpdateClobPair) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
        value
      };
    },
    updateEquityTierLimitConfiguration(value: MsgUpdateEquityTierLimitConfiguration) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
        value
      };
    },
    updateBlockRateLimitConfiguration(value: MsgUpdateBlockRateLimitConfiguration) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
        value
      };
    },
    updateLiquidationsConfig(value: MsgUpdateLiquidationsConfig) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
        value
      };
    }
  },
  fromPartial: {
    proposedOperations(value: MsgProposedOperations) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgProposedOperations",
        value: MsgProposedOperations.fromPartial(value)
      };
    },
    placeOrder(value: MsgPlaceOrder) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgPlaceOrder",
        value: MsgPlaceOrder.fromPartial(value)
      };
    },
    cancelOrder(value: MsgCancelOrder) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgCancelOrder",
        value: MsgCancelOrder.fromPartial(value)
      };
    },
    batchCancel(value: MsgBatchCancel) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgBatchCancel",
        value: MsgBatchCancel.fromPartial(value)
      };
    },
    createClobPair(value: MsgCreateClobPair) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgCreateClobPair",
        value: MsgCreateClobPair.fromPartial(value)
      };
    },
    updateClobPair(value: MsgUpdateClobPair) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateClobPair",
        value: MsgUpdateClobPair.fromPartial(value)
      };
    },
    updateEquityTierLimitConfiguration(value: MsgUpdateEquityTierLimitConfiguration) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateEquityTierLimitConfiguration",
        value: MsgUpdateEquityTierLimitConfiguration.fromPartial(value)
      };
    },
    updateBlockRateLimitConfiguration(value: MsgUpdateBlockRateLimitConfiguration) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateBlockRateLimitConfiguration",
        value: MsgUpdateBlockRateLimitConfiguration.fromPartial(value)
      };
    },
    updateLiquidationsConfig(value: MsgUpdateLiquidationsConfig) {
      return {
        typeUrl: "/klyraprotocol.clob.MsgUpdateLiquidationsConfig",
        value: MsgUpdateLiquidationsConfig.fromPartial(value)
      };
    }
  }
};