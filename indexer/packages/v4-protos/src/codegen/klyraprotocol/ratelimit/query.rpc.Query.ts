import { Rpc } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { GetSDAIPriceQueryRequest, GetSDAIPriceQueryResponse, GetAssetYieldIndexQueryRequest, GetAssetYieldIndexQueryResponse } from "./query";
/** Query defines the gRPC querier service. */

export interface Query {
  /** Get the price of sDAI. */
  getSDAIPriceQuery(request?: GetSDAIPriceQueryRequest): Promise<GetSDAIPriceQueryResponse>;
  /** Get the price of sDAI. */

  getAssetYieldIndexQuery(request?: GetAssetYieldIndexQueryRequest): Promise<GetAssetYieldIndexQueryResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.getSDAIPriceQuery = this.getSDAIPriceQuery.bind(this);
    this.getAssetYieldIndexQuery = this.getAssetYieldIndexQuery.bind(this);
  }

  getSDAIPriceQuery(request: GetSDAIPriceQueryRequest = {}): Promise<GetSDAIPriceQueryResponse> {
    const data = GetSDAIPriceQueryRequest.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "GetSDAIPriceQuery", data);
    return promise.then(data => GetSDAIPriceQueryResponse.decode(new _m0.Reader(data)));
  }

  getAssetYieldIndexQuery(request: GetAssetYieldIndexQueryRequest = {}): Promise<GetAssetYieldIndexQueryResponse> {
    const data = GetAssetYieldIndexQueryRequest.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "GetAssetYieldIndexQuery", data);
    return promise.then(data => GetAssetYieldIndexQueryResponse.decode(new _m0.Reader(data)));
  }

}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    getSDAIPriceQuery(request?: GetSDAIPriceQueryRequest): Promise<GetSDAIPriceQueryResponse> {
      return queryService.getSDAIPriceQuery(request);
    },

    getAssetYieldIndexQuery(request?: GetAssetYieldIndexQueryRequest): Promise<GetAssetYieldIndexQueryResponse> {
      return queryService.getAssetYieldIndexQuery(request);
    }

  };
};