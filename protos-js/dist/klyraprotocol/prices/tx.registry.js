"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposer = exports.load = exports.registry = void 0;
const tx_1 = require("./tx");
exports.registry = [["/klyraprotocol.prices.MsgCreateOracleMarket", tx_1.MsgCreateOracleMarket], ["/klyraprotocol.prices.MsgUpdateMarketParam", tx_1.MsgUpdateMarketParam]];
const load = (protoRegistry) => {
    exports.registry.forEach(([typeUrl, mod]) => {
        protoRegistry.register(typeUrl, mod);
    });
};
exports.load = load;
exports.MessageComposer = {
    encoded: {
        createOracleMarket(value) {
            return {
                typeUrl: "/klyraprotocol.prices.MsgCreateOracleMarket",
                value: tx_1.MsgCreateOracleMarket.encode(value).finish()
            };
        },
        updateMarketParam(value) {
            return {
                typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
                value: tx_1.MsgUpdateMarketParam.encode(value).finish()
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
                value: tx_1.MsgCreateOracleMarket.fromPartial(value)
            };
        },
        updateMarketParam(value) {
            return {
                typeUrl: "/klyraprotocol.prices.MsgUpdateMarketParam",
                value: tx_1.MsgUpdateMarketParam.fromPartial(value)
            };
        }
    }
};
