"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/klyraprotocol.blocktime.MsgUpdateDowntimeParams": {
        aminoType: "/klyraprotocol.blocktime.MsgUpdateDowntimeParams",
        toAmino: tx_1.MsgUpdateDowntimeParams.toAmino,
        fromAmino: tx_1.MsgUpdateDowntimeParams.fromAmino
    }
};
