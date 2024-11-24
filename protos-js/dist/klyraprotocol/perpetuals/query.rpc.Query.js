"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRpcQueryExtension = exports.QueryClientImpl = void 0;
const binary_1 = require("../../binary");
const stargate_1 = require("@cosmjs/stargate");
const query_1 = require("./query");
class QueryClientImpl {
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
        const data = query_1.QueryPerpetualRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "Perpetual", data);
        return promise.then(data => query_1.QueryPerpetualResponse.decode(new binary_1.BinaryReader(data)));
    }
    allPerpetuals(request = {
        pagination: undefined
    }) {
        const data = query_1.QueryAllPerpetualsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "AllPerpetuals", data);
        return promise.then(data => query_1.QueryAllPerpetualsResponse.decode(new binary_1.BinaryReader(data)));
    }
    allLiquidityTiers(request = {
        pagination: undefined
    }) {
        const data = query_1.QueryAllLiquidityTiersRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "AllLiquidityTiers", data);
        return promise.then(data => query_1.QueryAllLiquidityTiersResponse.decode(new binary_1.BinaryReader(data)));
    }
    premiumVotes(request = {}) {
        const data = query_1.QueryPremiumVotesRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "PremiumVotes", data);
        return promise.then(data => query_1.QueryPremiumVotesResponse.decode(new binary_1.BinaryReader(data)));
    }
    premiumSamples(request = {}) {
        const data = query_1.QueryPremiumSamplesRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "PremiumSamples", data);
        return promise.then(data => query_1.QueryPremiumSamplesResponse.decode(new binary_1.BinaryReader(data)));
    }
    params(request = {}) {
        const data = query_1.QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.perpetuals.Query", "Params", data);
        return promise.then(data => query_1.QueryParamsResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
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
exports.createRpcQueryExtension = createRpcQueryExtension;
