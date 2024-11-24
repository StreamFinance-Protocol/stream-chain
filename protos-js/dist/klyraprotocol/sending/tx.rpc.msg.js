"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientImpl = exports.MsgClientImpl = void 0;
//@ts-nocheck
const transfer_1 = require("./transfer");
const binary_1 = require("../../binary");
const tx_1 = require("./tx");
class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.createTransfer = this.createTransfer.bind(this);
        this.depositToSubaccount = this.depositToSubaccount.bind(this);
        this.withdrawFromSubaccount = this.withdrawFromSubaccount.bind(this);
        this.sendFromModuleToAccount = this.sendFromModuleToAccount.bind(this);
    }
    createTransfer(request) {
        const data = tx_1.MsgCreateTransfer.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.sending.Msg", "CreateTransfer", data);
        return promise.then(data => tx_1.MsgCreateTransferResponse.decode(new binary_1.BinaryReader(data)));
    }
    depositToSubaccount(request) {
        const data = transfer_1.MsgDepositToSubaccount.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.sending.Msg", "DepositToSubaccount", data);
        return promise.then(data => tx_1.MsgDepositToSubaccountResponse.decode(new binary_1.BinaryReader(data)));
    }
    withdrawFromSubaccount(request) {
        const data = transfer_1.MsgWithdrawFromSubaccount.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.sending.Msg", "WithdrawFromSubaccount", data);
        return promise.then(data => tx_1.MsgWithdrawFromSubaccountResponse.decode(new binary_1.BinaryReader(data)));
    }
    sendFromModuleToAccount(request) {
        const data = transfer_1.MsgSendFromModuleToAccount.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.sending.Msg", "SendFromModuleToAccount", data);
        return promise.then(data => tx_1.MsgSendFromModuleToAccountResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
exports.createClientImpl = createClientImpl;
