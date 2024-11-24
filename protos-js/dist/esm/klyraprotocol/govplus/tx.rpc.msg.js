import { BinaryReader } from "../../binary";
import { MsgSlashValidator, MsgSlashValidatorResponse } from "./tx";
export class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.slashValidator = this.slashValidator.bind(this);
    }
    slashValidator(request) {
        const data = MsgSlashValidator.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.govplus.Msg", "SlashValidator", data);
        return promise.then(data => MsgSlashValidatorResponse.decode(new BinaryReader(data)));
    }
}
export const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
