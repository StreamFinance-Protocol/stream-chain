import { BinaryReader } from "../../binary";
import { MsgCreateOracleMarket, MsgCreateOracleMarketResponse, MsgUpdateMarketParam, MsgUpdateMarketParamResponse } from "./tx";
export class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.createOracleMarket = this.createOracleMarket.bind(this);
        this.updateMarketParam = this.updateMarketParam.bind(this);
    }
    createOracleMarket(request) {
        const data = MsgCreateOracleMarket.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Msg", "CreateOracleMarket", data);
        return promise.then(data => MsgCreateOracleMarketResponse.decode(new BinaryReader(data)));
    }
    updateMarketParam(request) {
        const data = MsgUpdateMarketParam.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Msg", "UpdateMarketParam", data);
        return promise.then(data => MsgUpdateMarketParamResponse.decode(new BinaryReader(data)));
    }
}
export const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
