import { MsgCreateOracleMarket, MsgUpdateMarketParam } from "./tx";
export const registry = [["/klyraprotocol.prices.MsgCreateOracleMarket", MsgCreateOracleMarket], ["/klyraprotocol.prices.MsgUpdateMarketParam", MsgUpdateMarketParam]];
export const load = (protoRegistry) => {
    registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
export const MessageComposer = {
    encoded: {
        createOracleMarket(value) {
            return {
                typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
                value: MsgCreateOracleMarket.encode(value).finish()
            };
        },
        updateMarketParam(value) {
            return {
                typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
                value: MsgUpdateMarketParam.encode(value).finish()
            };
        }
    },
    withTypeUrl: {
        createOracleMarket(value) {
            return {
                typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
                value
            };
        },
        updateMarketParam(value) {
            return {
                typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
                value
            };
        }
    },
    fromPartial: {
        createOracleMarket(value) {
            return {
                typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
                value: MsgCreateOracleMarket.fromPartial(value)
            };
        },
        updateMarketParam(value) {
            return {
                typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
                value: MsgUpdateMarketParam.fromPartial(value)
            };
        }
    }
};
