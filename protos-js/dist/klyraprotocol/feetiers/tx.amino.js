"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams": {
        aminoType: "/klyraprotocol.feetiers.MsgUpdatePerpetualFeeParams",
        toAmino: tx_1.MsgUpdatePerpetualFeeParams.toAmino,
        fromAmino: tx_1.MsgUpdatePerpetualFeeParams.fromAmino
    }
};
