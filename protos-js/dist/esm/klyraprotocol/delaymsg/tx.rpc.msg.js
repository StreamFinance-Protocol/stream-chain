import { BinaryReader } from "../../binary";
import { MsgDelayMessage, MsgDelayMessageResponse } from "./tx";
export class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.delayMessage = this.delayMessage.bind(this);
    }
    delayMessage(request) {
        const data = MsgDelayMessage.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.delaymsg.Msg", "DelayMessage", data);
        return promise.then(data => MsgDelayMessageResponse.decode(new BinaryReader(data)));
    }
}
export const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
