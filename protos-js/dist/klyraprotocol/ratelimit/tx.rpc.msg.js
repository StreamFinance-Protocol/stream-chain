"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientImpl = exports.MsgClientImpl = void 0;
const binary_1 = require("../../binary");
const tx_1 = require("./tx");
class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.setLimitParams = this.setLimitParams.bind(this);
    }
    setLimitParams(request) {
        const data = tx_1.MsgSetLimitParams.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Msg", "SetLimitParams", data);
        return promise.then(data => tx_1.MsgSetLimitParamsResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
exports.createClientImpl = createClientImpl;
