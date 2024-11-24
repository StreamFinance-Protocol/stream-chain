import { BinaryReader } from "../../binary";
import { MsgUpdatePerpetualFeeParams, MsgUpdatePerpetualFeeParamsResponse } from "./tx";
export class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.updatePerpetualFeeParams = this.updatePerpetualFeeParams.bind(this);
    }
    updatePerpetualFeeParams(request) {
        const data = MsgUpdatePerpetualFeeParams.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.feetiers.Msg", "UpdatePerpetualFeeParams", data);
        return promise.then(data => MsgUpdatePerpetualFeeParamsResponse.decode(new BinaryReader(data)));
    }
}
export const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
