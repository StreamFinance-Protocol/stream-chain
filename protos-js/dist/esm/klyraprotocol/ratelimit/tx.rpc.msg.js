import { BinaryReader } from "../../binary";
import { MsgSetLimitParams, MsgSetLimitParamsResponse } from "./tx";
export class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.setLimitParams = this.setLimitParams.bind(this);
    }
    setLimitParams(request) {
        const data = MsgSetLimitParams.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Msg", "SetLimitParams", data);
        return promise.then(data => MsgSetLimitParamsResponse.decode(new BinaryReader(data)));
    }
}
export const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
