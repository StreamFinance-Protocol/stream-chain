//@ts-nocheck
import { MsgDepositToSubaccount, MsgWithdrawFromSubaccount, MsgSendFromModuleToAccount } from "./transfer";
import { BinaryReader } from "../../binary";
import { MsgCreateTransfer, MsgCreateTransferResponse, MsgDepositToSubaccountResponse, MsgWithdrawFromSubaccountResponse, MsgSendFromModuleToAccountResponse } from "./tx";
export class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.createTransfer = this.createTransfer.bind(this);
        this.depositToSubaccount = this.depositToSubaccount.bind(this);
        this.withdrawFromSubaccount = this.withdrawFromSubaccount.bind(this);
        this.sendFromModuleToAccount = this.sendFromModuleToAccount.bind(this);
    }
    createTransfer(request) {
        const data = MsgCreateTransfer.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.sending.Msg", "CreateTransfer", data);
        return promise.then(data => MsgCreateTransferResponse.decode(new BinaryReader(data)));
    }
    depositToSubaccount(request) {
        const data = MsgDepositToSubaccount.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.sending.Msg", "DepositToSubaccount", data);
        return promise.then(data => MsgDepositToSubaccountResponse.decode(new BinaryReader(data)));
    }
    withdrawFromSubaccount(request) {
        const data = MsgWithdrawFromSubaccount.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.sending.Msg", "WithdrawFromSubaccount", data);
        return promise.then(data => MsgWithdrawFromSubaccountResponse.decode(new BinaryReader(data)));
    }
    sendFromModuleToAccount(request) {
        const data = MsgSendFromModuleToAccount.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.sending.Msg", "SendFromModuleToAccount", data);
        return promise.then(data => MsgSendFromModuleToAccountResponse.decode(new BinaryReader(data)));
    }
}
export const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
