import { Rpc } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryPreviousBlockInfoRequest, QueryPreviousBlockInfoResponse } from "./query";
/** Query defines the gRPC querier service. */

export interface Query {
  /** Queries the information of the previous block */
  previousBlockInfo(request?: QueryPreviousBlockInfoRequest): Promise<QueryPreviousBlockInfoResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.previousBlockInfo = this.previousBlockInfo.bind(this);
  }

  previousBlockInfo(request: QueryPreviousBlockInfoRequest = {}): Promise<QueryPreviousBlockInfoResponse> {
    const data = QueryPreviousBlockInfoRequest.encode(request).finish();
    const promise = this.rpc.request("klyraprotocol.blocktime.Query", "PreviousBlockInfo", data);
    return promise.then(data => QueryPreviousBlockInfoResponse.decode(new _m0.Reader(data)));
  }

}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    previousBlockInfo(request?: QueryPreviousBlockInfoRequest): Promise<QueryPreviousBlockInfoResponse> {
      return queryService.previousBlockInfo(request);
    }

  };
};