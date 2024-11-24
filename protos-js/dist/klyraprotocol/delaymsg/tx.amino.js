"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/klyraprotocol.delaymsg.MsgDelayMessage": {
        aminoType: "/klyraprotocol.delaymsg.MsgDelayMessage",
        toAmino: tx_1.MsgDelayMessage.toAmino,
        fromAmino: tx_1.MsgDelayMessage.fromAmino
    }
};
