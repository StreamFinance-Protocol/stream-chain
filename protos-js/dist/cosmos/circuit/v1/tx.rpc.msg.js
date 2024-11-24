"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientImpl = exports.MsgClientImpl = void 0;
const binary_1 = require("../../../binary");
const tx_1 = require("./tx");
class MsgClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.authorizeCircuitBreaker = this.authorizeCircuitBreaker.bind(this);
        this.tripCircuitBreaker = this.tripCircuitBreaker.bind(this);
        this.resetCircuitBreaker = this.resetCircuitBreaker.bind(this);
    }
    authorizeCircuitBreaker(request) {
        const data = tx_1.MsgAuthorizeCircuitBreaker.encode(request).finish();
        const promise = this.rpc.request("cosmos.circuit.v1.Msg", "AuthorizeCircuitBreaker", data);
        return promise.then(data => tx_1.MsgAuthorizeCircuitBreakerResponse.decode(new binary_1.BinaryReader(data)));
    }
    tripCircuitBreaker(request) {
        const data = tx_1.MsgTripCircuitBreaker.encode(request).finish();
        const promise = this.rpc.request("cosmos.circuit.v1.Msg", "TripCircuitBreaker", data);
        return promise.then(data => tx_1.MsgTripCircuitBreakerResponse.decode(new binary_1.BinaryReader(data)));
    }
    resetCircuitBreaker(request) {
        const data = tx_1.MsgResetCircuitBreaker.encode(request).finish();
        const promise = this.rpc.request("cosmos.circuit.v1.Msg", "ResetCircuitBreaker", data);
        return promise.then(data => tx_1.MsgResetCircuitBreakerResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
const createClientImpl = (rpc) => {
    return new MsgClientImpl(rpc);
};
exports.createClientImpl = createClientImpl;
