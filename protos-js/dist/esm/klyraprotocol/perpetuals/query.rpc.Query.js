import { BinaryReader } from "../../binary";
import { createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryPerpetualRequest, QueryPerpetualResponse, QueryAllPerpetualsRequest, QueryAllPerpetualsResponse, QueryAllLiquidityTiersRequest, QueryAllLiquidityTiersResponse, QueryPremiumVotesRequest, QueryPremiumVotesResponse, QueryPremiumSamplesRequest, QueryPremiumSamplesResponse, QueryParamsRequest, QueryParamsResponse } from "./query";
export class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.perpetual = this.perpetual.bind(this);
        this.allPerpetuals = this.allPerpetuals.bind(this);
        this.allLiquidityTiers = this.allLiquidityTiers.bind(this);
        this.premiumVotes = this.premiumVotes.bind(this);
        this.premiumSamples = this.premiumSamples.bind(this);
        this.params = this.params.bind(this);
    }
    perpetual(request) {
        const data = QueryPerpetualRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "Perpetual", data);
        return promise.then(data => QueryPerpetualResponse.decode(new BinaryReader(data)));
    }
    allPerpetuals(request = {
        pagination: undefined
    }) {
        const data = QueryAllPerpetualsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "AllPerpetuals", data);
        return promise.then(data => QueryAllPerpetualsResponse.decode(new BinaryReader(data)));
    }
    allLiquidityTiers(request = {
        pagination: undefined
    }) {
        const data = QueryAllLiquidityTiersRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "AllLiquidityTiers", data);
        return promise.then(data => QueryAllLiquidityTiersResponse.decode(new BinaryReader(data)));
    }
    premiumVotes(request = {}) {
        const data = QueryPremiumVotesRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "PremiumVotes", data);
        return promise.then(data => QueryPremiumVotesResponse.decode(new BinaryReader(data)));
    }
    premiumSamples(request = {}) {
        const data = QueryPremiumSamplesRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "PremiumSamples", data);
        return promise.then(data => QueryPremiumSamplesResponse.decode(new BinaryReader(data)));
    }
    params(request = {}) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "Params", data);
        return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        perpetual(request) {
            return queryService.perpetual(request);
        },
        allPerpetuals(request) {
            return queryService.allPerpetuals(request);
        },
        allLiquidityTiers(request) {
            return queryService.allLiquidityTiers(request);
        },
        premiumVotes(request) {
            return queryService.premiumVotes(request);
        },
        premiumSamples(request) {
            return queryService.premiumSamples(request);
        },
        params(request) {
            return queryService.params(request);
        }
    };
};
