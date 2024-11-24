//@ts-nocheck
import { connectComet } from "@cosmjs/tendermint-rpc";
import { QueryClient } from "@cosmjs/stargate";
export const createRPCQueryClient = async ({ rpcEndpoint }) => {
    const tmClient = await connectComet(rpcEndpoint);
    const client = new QueryClient(tmClient);
    return {
        cosmos: {
            auth: {
                v1beta1: (await import("../cosmos/auth/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
            },
            authz: {
                v1beta1: (await import("../cosmos/authz/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
            },
            bank: {
                v1beta1: (await import("../cosmos/bank/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
            },
            base: {
                node: {
                    v1beta1: (await import("../cosmos/base/node/v1beta1/query.rpc.Service")).createRpcQueryExtension(client)
                }
            },
            circuit: {
                v1: (await import("../cosmos/circuit/v1/query.rpc.Query")).createRpcQueryExtension(client)
            },
            consensus: {
                v1: (await import("../cosmos/consensus/v1/query.rpc.Query")).createRpcQueryExtension(client)
            },
            distribution: {
                v1beta1: (await import("../cosmos/distribution/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
            },
            gov: {
                v1: (await import("../cosmos/gov/v1/query.rpc.Query")).createRpcQueryExtension(client),
                v1beta1: (await import("../cosmos/gov/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
            },
            orm: {
                query: {
                    v1alpha1: (await import("../cosmos/orm/query/v1alpha1/query.rpc.Query")).createRpcQueryExtension(client)
                }
            },
            staking: {
                v1beta1: (await import("../cosmos/staking/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
            },
            tx: {
                v1beta1: (await import("../cosmos/tx/v1beta1/service.rpc.Service")).createRpcQueryExtension(client)
            },
            upgrade: {
                v1beta1: (await import("../cosmos/upgrade/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
            }
        },
        klyraprotocol: {
            assets: (await import("./assets/query.rpc.Query")).createRpcQueryExtension(client),
            blocktime: (await import("./blocktime/query.rpc.Query")).createRpcQueryExtension(client),
            clob: (await import("./clob/query.rpc.Query")).createRpcQueryExtension(client),
            delaymsg: (await import("./delaymsg/query.rpc.Query")).createRpcQueryExtension(client),
            epochs: (await import("./epochs/query.rpc.Query")).createRpcQueryExtension(client),
            feetiers: (await import("./feetiers/query.rpc.Query")).createRpcQueryExtension(client),
            govplus: (await import("./govplus/query.rpc.Query")).createRpcQueryExtension(client),
            perpetuals: (await import("./perpetuals/query.rpc.Query")).createRpcQueryExtension(client),
            prices: (await import("./prices/query.rpc.Query")).createRpcQueryExtension(client),
            ratelimit: (await import("./ratelimit/query.rpc.Query")).createRpcQueryExtension(client),
            sending: (await import("./sending/query.rpc.Query")).createRpcQueryExtension(client),
            stats: (await import("./stats/query.rpc.Query")).createRpcQueryExtension(client),
            subaccounts: (await import("./subaccounts/query.rpc.Query")).createRpcQueryExtension(client)
        }
    };
};
