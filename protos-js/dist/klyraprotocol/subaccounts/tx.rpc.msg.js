"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientImpl = exports.MsgClientImpl = void 0;
const binary_1 = require("../../binary");
const tx_1 = require("./tx");
class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.claimYieldForSubaccount = this.claimYieldForSubaccount.bind(this);
    }
    claimYieldForSubaccount(request) {
        const data = tx_1.MsgClaimYieldForSubaccount.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.subaccounts.Msg", "ClaimYieldForSubaccount", data);
        return promise.then(data => tx_1.MsgClaimYieldForSubaccountResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
exports.createClientImpl = createClientImpl;
