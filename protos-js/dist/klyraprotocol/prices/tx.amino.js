"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/klyraprotocol.prices.MsgCreateOracleMarket": {
        aminoType: "/klyraprotocol.prices.MsgCreateOracleMarket",
        toAmino: tx_1.MsgCreateOracleMarket.toAmino,
        fromAmino: tx_1.MsgCreateOracleMarket.fromAmino
    },
    "/klyraprotocol.prices.MsgUpdateMarketParam": {
        aminoType: "/klyraprotocol.prices.MsgUpdateMarketParam",
        toAmino: tx_1.MsgUpdateMarketParam.toAmino,
        fromAmino: tx_1.MsgUpdateMarketParam.fromAmino
    }
};
