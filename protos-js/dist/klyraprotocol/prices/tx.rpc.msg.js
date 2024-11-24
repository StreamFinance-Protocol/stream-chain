"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientImpl = exports.MsgClientImpl = void 0;
const binary_1 = require("../../binary");
const tx_1 = require("./tx");
class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.createOracleMarket = this.createOracleMarket.bind(this);
        this.updateMarketParam = this.updateMarketParam.bind(this);
    }
    createOracleMarket(request) {
        const data = tx_1.MsgCreateOracleMarket.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Msg", "CreateOracleMarket", data);
        return promise.then(data => tx_1.MsgCreateOracleMarketResponse.decode(new binary_1.BinaryReader(data)));
    }
    updateMarketParam(request) {
        const data = tx_1.MsgUpdateMarketParam.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Msg", "UpdateMarketParam", data);
        return promise.then(data => tx_1.MsgUpdateMarketParamResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
exports.createClientImpl = createClientImpl;
