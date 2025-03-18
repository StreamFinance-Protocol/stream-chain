import { Rpc } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { GetSDAIPriceQueryRequest, GetSDAIPriceQueryResponse, GetAssetYieldsIndexQueryRequest, GetAssetYieldsIndexQueryResponse } from "./query";
/** Query defines the gRPC querier service. */

export interface Query {
  /** Get the price of sDAI. */
  getSDAIPriceQuery(request?: GetSDAIPriceQueryRequest): Promise<GetSDAIPriceQueryResponse>;
  /** Get the price of sDAI. */

  getAssetYieldsIndexQuery(request?: GetAssetYieldsIndexQueryRequest): Promise<GetAssetYieldsIndexQueryResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.getSDAIPriceQuery = this.getSDAIPriceQuery.bind(this);
    this.getAssetYieldsIndexQuery = this.getAssetYieldsIndexQuery.bind(this);
  }

  getSDAIPriceQuery(request: GetSDAIPriceQueryRequest = {}): Promise<GetSDAIPriceQueryResponse> {
    const data = GetSDAIPriceQueryRequest.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.yields.Query", "GetSDAIPriceQuery", data);
    return promise.then(data => GetSDAIPriceQueryResponse.decode(new _m0.Reader(data)));
  }

  getAssetYieldsIndexQuery(request: GetAssetYieldsIndexQueryRequest = {}): Promise<GetAssetYieldsIndexQueryResponse> {
    const data = GetAssetYieldsIndexQueryRequest.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.yields.Query", "GetAssetYieldsIndexQuery", data);
    return promise.then(data => GetAssetYieldsIndexQueryResponse.decode(new _m0.Reader(data)));
  }

}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    getSDAIPriceQuery(request?: GetSDAIPriceQueryRequest): Promise<GetSDAIPriceQueryResponse> {
      return queryService.getSDAIPriceQuery(request);
    },

    getAssetYieldsIndexQuery(request?: GetAssetYieldsIndexQueryRequest): Promise<GetAssetYieldsIndexQueryResponse> {
      return queryService.getAssetYieldsIndexQuery(request);
    }

  };
};