export declare const createLCDClient: ({ restEndpoint }: {
    restEndpoint: string;
}) => Promise<{
    cosmos: {
        auth: {
            v1beta1: import("../cosmos/auth/v1beta1/query.lcd").LCDQueryClient;
        };
        authz: {
            v1beta1: import("../cosmos/authz/v1beta1/query.lcd").LCDQueryClient;
        };
        bank: {
            v1beta1: import("../cosmos/bank/v1beta1/query.lcd").LCDQueryClient;
        };
        base: {
            node: {
                v1beta1: import("../cosmos/base/node/v1beta1/query.lcd").LCDQueryClient;
            };
        };
        circuit: {
            v1: import("../cosmos/circuit/v1/query.lcd").LCDQueryClient;
        };
        consensus: {
            v1: import("../cosmos/consensus/v1/query.lcd").LCDQueryClient;
        };
        distribution: {
            v1beta1: import("../cosmos/distribution/v1beta1/query.lcd").LCDQueryClient;
        };
        gov: {
            v1: import("../cosmos/gov/v1/query.lcd").LCDQueryClient;
            v1beta1: import("../cosmos/gov/v1beta1/query.lcd").LCDQueryClient;
        };
        staking: {
            v1beta1: import("../cosmos/staking/v1beta1/query.lcd").LCDQueryClient;
        };
        tx: {
            v1beta1: import("../cosmos/tx/v1beta1/service.lcd").LCDQueryClient;
        };
        upgrade: {
            v1beta1: import("../cosmos/upgrade/v1beta1/query.lcd").LCDQueryClient;
        };
    };
    klyraprotocol: {
        assets: import("./assets/query.lcd").LCDQueryClient;
        blocktime: import("./blocktime/query.lcd").LCDQueryClient;
        clob: import("./clob/query.lcd").LCDQueryClient;
        delaymsg: import("./delaymsg/query.lcd").LCDQueryClient;
        epochs: import("./epochs/query.lcd").LCDQueryClient;
        feetiers: import("./feetiers/query.lcd").LCDQueryClient;
        perpetuals: import("./perpetuals/query.lcd").LCDQueryClient;
        prices: import("./prices/query.lcd").LCDQueryClient;
        ratelimit: import("./ratelimit/query.lcd").LCDQueryClient;
        stats: import("./stats/query.lcd").LCDQueryClient;
        subaccounts: import("./subaccounts/query.lcd").LCDQueryClient;
    };
}>;
