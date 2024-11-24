"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/cosmos.bank.v1beta1.MsgSend": {
        aminoType: "cosmos-sdk/MsgSend",
        toAmino: tx_1.MsgSend.toAmino,
        fromAmino: tx_1.MsgSend.fromAmino
    },
    "/cosmos.bank.v1beta1.MsgMultiSend": {
        aminoType: "cosmos-sdk/MsgMultiSend",
        toAmino: tx_1.MsgMultiSend.toAmino,
        fromAmino: tx_1.MsgMultiSend.fromAmino
    },
    "/cosmos.bank.v1beta1.MsgUpdateParams": {
        aminoType: "cosmos-sdk/x/bank/MsgUpdateParams",
        toAmino: tx_1.MsgUpdateParams.toAmino,
        fromAmino: tx_1.MsgUpdateParams.fromAmino
    },
    "/cosmos.bank.v1beta1.MsgSetSendEnabled": {
        aminoType: "cosmos-sdk/MsgSetSendEnabled",
        toAmino: tx_1.MsgSetSendEnabled.toAmino,
        fromAmino: tx_1.MsgSetSendEnabled.fromAmino
    }
};
