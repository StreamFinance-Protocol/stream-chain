import { LCDClient } from "@osmonauts/lcd";
import { QueryPreviousBlockInfoRequest, QueryPreviousBlockInfoResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;

  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.previousBlockInfo = this.previousBlockInfo.bind(this);
  }
  /* Queries the information of the previous block */


  async previousBlockInfo(_params: QueryPreviousBlockInfoRequest = {}): Promise<QueryPreviousBlockInfoResponseSDKType> {
    const endpoint = `stream-chain/blocktime/previous_block_info`;
    return await this.req.get<QueryPreviousBlockInfoResponseSDKType>(endpoint);
  }

}