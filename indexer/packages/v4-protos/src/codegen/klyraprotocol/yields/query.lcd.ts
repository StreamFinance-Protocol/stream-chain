import { LCDClient } from "@osmonauts/lcd";
import { GetSDAIPriceQueryRequest, GetSDAIPriceQueryResponseSDKType, GetAssetYieldsIndexQueryRequest, GetAssetYieldsIndexQueryResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;

  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.getSDAIPriceQuery = this.getSDAIPriceQuery.bind(this);
    this.getAssetYieldsIndexQuery = this.getAssetYieldsIndexQuery.bind(this);
  }
  /* Get the price of sDAI. */


  async getSDAIPriceQuery(_params: GetSDAIPriceQueryRequest = {}): Promise<GetSDAIPriceQueryResponseSDKType> {
    const endpoint = `klyraprotocol/v4/yields/get_sdai_price`;
    return await this.req.get<GetSDAIPriceQueryResponseSDKType>(endpoint);
  }
  /* Get the price of sDAI. */


  async getAssetYieldsIndexQuery(_params: GetAssetYieldsIndexQueryRequest = {}): Promise<GetAssetYieldsIndexQueryResponseSDKType> {
    const endpoint = `klyraprotocol/v4/yields/get_asset_yields_index`;
    return await this.req.get<GetAssetYieldsIndexQueryResponseSDKType>(endpoint);
  }

}