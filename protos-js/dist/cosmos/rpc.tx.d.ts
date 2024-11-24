import { Rpc } from "../helpers";
export declare const createRPCMsgClient: ({ rpc }: {
    rpc: Rpc;
}) => Promise<{
    cosmos: {
        auth: {
            v1beta1: import("./auth/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        authz: {
            v1beta1: import("./authz/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        bank: {
            v1beta1: import("./bank/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        circuit: {
            v1: import("./circuit/v1/tx.rpc.msg").MsgClientImpl;
        };
        consensus: {
            v1: import("./consensus/v1/tx.rpc.msg").MsgClientImpl;
        };
        distribution: {
            v1beta1: import("./distribution/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        gov: {
            v1: import("./gov/v1/tx.rpc.msg").MsgClientImpl;
            v1beta1: import("./gov/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        staking: {
            v1beta1: import("./staking/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        upgrade: {
            v1beta1: import("./upgrade/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
    };
}>;
