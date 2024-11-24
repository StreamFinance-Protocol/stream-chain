import { BinaryReader } from "../../binary";
import { MsgUpdateDowntimeParams, MsgUpdateDowntimeParamsResponse } from "./tx";
export class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.updateDowntimeParams = this.updateDowntimeParams.bind(this);
    }
    updateDowntimeParams(request) {
        const data = MsgUpdateDowntimeParams.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.blocktime.Msg", "UpdateDowntimeParams", data);
        return promise.then(data => MsgUpdateDowntimeParamsResponse.decode(new BinaryReader(data)));
    }
}
export const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
