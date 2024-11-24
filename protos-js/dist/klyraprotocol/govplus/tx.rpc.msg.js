"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientImpl = exports.MsgClientImpl = void 0;
const binary_1 = require("../../binary");
const tx_1 = require("./tx");
class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.slashValidator = this.slashValidator.bind(this);
    }
    slashValidator(request) {
        const data = tx_1.MsgSlashValidator.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.govplus.Msg", "SlashValidator", data);
        return promise.then(data => tx_1.MsgSlashValidatorResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
exports.createClientImpl = createClientImpl;
