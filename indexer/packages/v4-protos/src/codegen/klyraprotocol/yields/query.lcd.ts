import { LCDClient } from "@osmonauts/lcd";
import { GetSDAIPriceQueryRequest, GetSDAIPriceQueryResponseSDKType, GetAssetYieldIndexQueryRequest, GetAssetYieldIndexQueryResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;

  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.getSDAIPriceQuery = this.getSDAIPriceQuery.bind(this);
    this.getAssetYieldIndexQuery = this.getAssetYieldIndexQuery.bind(this);
  }
  /* Get the price of sDAI. */


  async getSDAIPriceQuery(_params: GetSDAIPriceQueryRequest = {}): Promise<GetSDAIPriceQueryResponseSDKType> {
    const endpoint = `klyraprotocol/v4/yields/get_sdai_price`;
    return await this.req.get<GetSDAIPriceQueryResponseSDKType>(endpoint);
  }
  /* Get the price of sDAI. */


  async getAssetYieldIndexQuery(_params: GetAssetYieldIndexQueryRequest = {}): Promise<GetAssetYieldIndexQueryResponseSDKType> {
    const endpoint = `klyraprotocol/v4/yields/get_asset_yield_index`;
    return await this.req.get<GetAssetYieldIndexQueryResponseSDKType>(endpoint);
  }

}