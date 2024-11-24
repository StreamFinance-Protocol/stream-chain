"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount": {
        aminoType: "/klyraprotocol.subaccounts.MsgClaimYieldForSubaccount",
        toAmino: tx_1.MsgClaimYieldForSubaccount.toAmino,
        fromAmino: tx_1.MsgClaimYieldForSubaccount.fromAmino
    }
};
