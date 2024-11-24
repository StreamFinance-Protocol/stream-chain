import { MsgAuthorizeCircuitBreaker, MsgTripCircuitBreaker, MsgResetCircuitBreaker } from "./tx";
export declare const AminoConverter: {
    "/cosmos.circuit.v1.MsgAuthorizeCircuitBreaker": {
        aminoType: string;
        toAmino: (message: MsgAuthorizeCircuitBreaker) => import("./tx").MsgAuthorizeCircuitBreakerAmino;
        fromAmino: (object: import("./tx").MsgAuthorizeCircuitBreakerAmino) => MsgAuthorizeCircuitBreaker;
    };
    "/cosmos.circuit.v1.MsgTripCircuitBreaker": {
        aminoType: string;
        toAmino: (message: MsgTripCircuitBreaker) => import("./tx").MsgTripCircuitBreakerAmino;
        fromAmino: (object: import("./tx").MsgTripCircuitBreakerAmino) => MsgTripCircuitBreaker;
    };
    "/cosmos.circuit.v1.MsgResetCircuitBreaker": {
        aminoType: string;
        toAmino: (message: MsgResetCircuitBreaker) => import("./tx").MsgResetCircuitBreakerAmino;
        fromAmino: (object: import("./tx").MsgResetCircuitBreakerAmino) => MsgResetCircuitBreaker;
    };
};
