import { BinaryReader } from "../../binary";
import { MsgClaimYieldForSubaccount, MsgClaimYieldForSubaccountResponse } from "./tx";
export class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.claimYieldForSubaccount = this.claimYieldForSubaccount.bind(this);
    }
    claimYieldForSubaccount(request) {
        const data = MsgClaimYieldForSubaccount.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.subaccounts.Msg", "ClaimYieldForSubaccount", data);
        return promise.then(data => MsgClaimYieldForSubaccountResponse.decode(new BinaryReader(data)));
    }
}
export const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
