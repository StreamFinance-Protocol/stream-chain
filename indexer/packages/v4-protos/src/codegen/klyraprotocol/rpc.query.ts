import { Tendermint34Client, HttpEndpoint } from "@cosmjs/tendermint-rpc";
import { QueryClient } from "@cosmjs/stargate";
export const createRPCQueryClient = async ({
  rpcEndpoint
}: {
  rpcEndpoint: string | HttpEndpoint;
}) => {
  const tmClient = await Tendermint34Client.connect(rpcEndpoint);
  const client = new QueryClient(tmClient);
  return {
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