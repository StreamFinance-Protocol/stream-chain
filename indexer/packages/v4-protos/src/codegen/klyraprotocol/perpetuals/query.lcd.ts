import { setPaginationParams } from "../../helpers";
import { LCDClient } from "@osmonauts/lcd";
import { QueryPerpetualRequest, QueryPerpetualResponseSDKType, QueryAllPerpetualsRequest, QueryAllPerpetualsResponseSDKType, QueryAllLiquidityTiersRequest, QueryAllLiquidityTiersResponseSDKType, QueryAllCollateralPoolsRequest, QueryAllCollateralPoolsResponseSDKType, QueryPremiumVotesRequest, QueryPremiumVotesResponseSDKType, QueryPremiumSamplesRequest, QueryPremiumSamplesResponseSDKType, QueryParamsRequest, QueryParamsResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;

  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.perpetual = this.perpetual.bind(this);
    this.allPerpetuals = this.allPerpetuals.bind(this);
    this.allLiquidityTiers = this.allLiquidityTiers.bind(this);
    this.allCollateralPools = this.allCollateralPools.bind(this);
    this.premiumVotes = this.premiumVotes.bind(this);
    this.premiumSamples = this.premiumSamples.bind(this);
    this.params = this.params.bind(this);
  }
  /* Queries a Perpetual by id. */


  async perpetual(params: QueryPerpetualRequest): Promise<QueryPerpetualResponseSDKType> {
    const endpoint = `klyraprotocol/perpetuals/perpetual/${params.id}`;
    return await this.req.get<QueryPerpetualResponseSDKType>(endpoint);
  }
  /* Queries a list of Perpetual items. */


  async allPerpetuals(params: QueryAllPerpetualsRequest = {
    pagination: undefined
  }): Promise<QueryAllPerpetualsResponseSDKType> {
    const options: any = {
      params: {}
    };

    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }

    const endpoint = `klyraprotocol/perpetuals/perpetual`;
    return await this.req.get<QueryAllPerpetualsResponseSDKType>(endpoint, options);
  }
  /* Queries a list of LiquidityTiers. */


  async allLiquidityTiers(params: QueryAllLiquidityTiersRequest = {
    pagination: undefined
  }): Promise<QueryAllLiquidityTiersResponseSDKType> {
    const options: any = {
      params: {}
    };

    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }

    const endpoint = `klyraprotocol/perpetuals/liquidity_tiers`;
    return await this.req.get<QueryAllLiquidityTiersResponseSDKType>(endpoint, options);
  }
  /* Queries a list of CollateralPools. */


  async allCollateralPools(params: QueryAllCollateralPoolsRequest = {
    pagination: undefined
  }): Promise<QueryAllCollateralPoolsResponseSDKType> {
    const options: any = {
      params: {}
    };

    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }

    const endpoint = `klyraprotocol/perpetuals/collateral_pools`;
    return await this.req.get<QueryAllCollateralPoolsResponseSDKType>(endpoint, options);
  }
  /* Queries a list of premium votes. */


  async premiumVotes(_params: QueryPremiumVotesRequest = {}): Promise<QueryPremiumVotesResponseSDKType> {
    const endpoint = `klyraprotocol/perpetuals/premium_votes`;
    return await this.req.get<QueryPremiumVotesResponseSDKType>(endpoint);
  }
  /* Queries a list of premium samples. */


  async premiumSamples(_params: QueryPremiumSamplesRequest = {}): Promise<QueryPremiumSamplesResponseSDKType> {
    const endpoint = `klyraprotocol/perpetuals/premium_samples`;
    return await this.req.get<QueryPremiumSamplesResponseSDKType>(endpoint);
  }
  /* Queries the perpetual params. */


  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `klyraprotocol/perpetuals/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }

}