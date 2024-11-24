//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateOracleMarket, MsgUpdateMarketParam } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/klyraprotocol.prices.MsgCreateOracleMarket", MsgCreateOracleMarket], ["/klyraprotocol.prices.MsgUpdateMarketParam", MsgUpdateMarketParam]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createOracleMarket(value: MsgCreateOracleMarket) {
      return {
        typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
        value: MsgCreateOracleMarket.encode(value).finish()
      };
    },
    updateMarketParam(value: MsgUpdateMarketParam) {
      return {
        typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
        value: MsgUpdateMarketParam.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createOracleMarket(value: MsgCreateOracleMarket) {
      return {
        typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
        value
      };
    },
    updateMarketParam(value: MsgUpdateMarketParam) {
      return {
        typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
        value
      };
    }
  },
  fromPartial: {
    createOracleMarket(value: MsgCreateOracleMarket) {
      return {
        typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
        value: MsgCreateOracleMarket.fromPartial(value)
      };
    },
    updateMarketParam(value: MsgUpdateMarketParam) {
      return {
        typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
        value: MsgUpdateMarketParam.fromPartial(value)
      };
    }
  }
};