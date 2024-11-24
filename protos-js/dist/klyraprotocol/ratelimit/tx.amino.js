"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/klyraprotocol.ratelimit.MsgSetLimitParams": {
        aminoType: "/klyraprotocol.ratelimit.MsgSetLimitParams",
        toAmino: tx_1.MsgSetLimitParams.toAmino,
        fromAmino: tx_1.MsgSetLimitParams.fromAmino
    }
};
