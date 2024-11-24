"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoConverter = void 0;
//@ts-nocheck
const transfer_1 = require("./transfer");
const tx_1 = require("./tx");
exports.AminoConverter = {
    "/klyraprotocol.sending.MsgCreateTransfer": {
        aminoType: "/klyraprotocol.sending.MsgCreateTransfer",
        toAmino: tx_1.MsgCreateTransfer.toAmino,
        fromAmino: tx_1.MsgCreateTransfer.fromAmino
    },
    "/klyraprotocol.sending.MsgDepositToSubaccount": {
        aminoType: "/klyraprotocol.sending.MsgDepositToSubaccount",
        toAmino: transfer_1.MsgDepositToSubaccount.toAmino,
        fromAmino: transfer_1.MsgDepositToSubaccount.fromAmino
    },
    "/klyraprotocol.sending.MsgWithdrawFromSubaccount": {
        aminoType: "/klyraprotocol.sending.MsgWithdrawFromSubaccount",
        toAmino: transfer_1.MsgWithdrawFromSubaccount.toAmino,
        fromAmino: transfer_1.MsgWithdrawFromSubaccount.fromAmino
    },
    "/klyraprotocol.sending.MsgSendFromModuleToAccount": {
        aminoType: "/klyraprotocol.sending.MsgSendFromModuleToAccount",
        toAmino: transfer_1.MsgSendFromModuleToAccount.toAmino,
        fromAmino: transfer_1.MsgSendFromModuleToAccount.fromAmino
    }
};
