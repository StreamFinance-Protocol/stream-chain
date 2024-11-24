"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientImpl = exports.MsgClientImpl = void 0;
const binary_1 = require("../../../binary");
const tx_1 = require("./tx");
class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.send = this.send.bind(this);
        this.multiSend = this.multiSend.bind(this);
        this.updateParams = this.updateParams.bind(this);
        this.setSendEnabled = this.setSendEnabled.bind(this);
    }
    send(request) {
        const data = tx_1.MsgSend.encode(request).finish();
        const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "Send", data);
        return promise.then(data => tx_1.MsgSendResponse.decode(new binary_1.BinaryReader(data)));
    }
    multiSend(request) {
        const data = tx_1.MsgMultiSend.encode(request).finish();
        const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "MultiSend", data);
        return promise.then(data => tx_1.MsgMultiSendResponse.decode(new binary_1.BinaryReader(data)));
    }
    updateParams(request) {
        const data = tx_1.MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "UpdateParams", data);
        return promise.then(data => tx_1.MsgUpdateParamsResponse.decode(new binary_1.BinaryReader(data)));
    }
    setSendEnabled(request) {
        const data = tx_1.MsgSetSendEnabled.encode(request).finish();
        const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "SetSendEnabled", data);
        return promise.then(data => tx_1.MsgSetSendEnabledResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
exports.createClientImpl = createClientImpl;
