import { Rpc } from "../helpers";
export declare const createRPCMsgClient: ({ rpc }: {
    rpc: Rpc;
}) => Promise<{
    cosmos: {
        auth: {
            v1beta1: import("../cosmos/auth/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        authz: {
            v1beta1: import("../cosmos/authz/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        bank: {
            v1beta1: import("../cosmos/bank/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        circuit: {
            v1: import("../cosmos/circuit/v1/tx.rpc.msg").MsgClientImpl;
        };
        consensus: {
            v1: import("../cosmos/consensus/v1/tx.rpc.msg").MsgClientImpl;
        };
        distribution: {
            v1beta1: import("../cosmos/distribution/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        gov: {
            v1: import("../cosmos/gov/v1/tx.rpc.msg").MsgClientImpl;
            v1beta1: import("../cosmos/gov/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        staking: {
            v1beta1: import("../cosmos/staking/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
        upgrade: {
            v1beta1: import("../cosmos/upgrade/v1beta1/tx.rpc.msg").MsgClientImpl;
        };
    };
    klyraprotocol: {
        blocktime: import("./blocktime/tx.rpc.msg").MsgClientImpl;
        clob: import("./clob/tx.rpc.msg").MsgClientImpl;
        delaymsg: import("./delaymsg/tx.rpc.msg").MsgClientImpl;
        feetiers: import("./feetiers/tx.rpc.msg").MsgClientImpl;
        govplus: import("./govplus/tx.rpc.msg").MsgClientImpl;
        perpetuals: import("./perpetuals/tx.rpc.msg").MsgClientImpl;
        prices: import("./prices/tx.rpc.msg").MsgClientImpl;
        ratelimit: import("./ratelimit/tx.rpc.msg").MsgClientImpl;
        sending: import("./sending/tx.rpc.msg").MsgClientImpl;
        stats: import("./stats/tx.rpc.msg").MsgClientImpl;
        subaccounts: import("./subaccounts/tx.rpc.msg").MsgClientImpl;
    };
}>;
