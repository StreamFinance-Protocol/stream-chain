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
        this.listLimitParams = this.listLimitParams.bind(this);
        this.capacityByDenom = this.capacityByDenom.bind(this);
        this.allPendingSendPackets = this.allPendingSendPackets.bind(this);
        this.getSDAIPriceQuery = this.getSDAIPriceQuery.bind(this);
        this.getAssetYieldIndexQuery = this.getAssetYieldIndexQuery.bind(this);
    }
    listLimitParams(request = {}) {
        const data = query_1.ListLimitParamsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "ListLimitParams", data);
        return promise.then(data => query_1.ListLimitParamsResponse.decode(new binary_1.BinaryReader(data)));
    }
    capacityByDenom(request) {
        const data = query_1.QueryCapacityByDenomRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "CapacityByDenom", data);
        return promise.then(data => query_1.QueryCapacityByDenomResponse.decode(new binary_1.BinaryReader(data)));
    }
    allPendingSendPackets(request = {}) {
        const data = query_1.QueryAllPendingSendPacketsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "AllPendingSendPackets", data);
        return promise.then(data => query_1.QueryAllPendingSendPacketsResponse.decode(new binary_1.BinaryReader(data)));
    }
    getSDAIPriceQuery(request = {}) {
        const data = query_1.GetSDAIPriceQueryRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "GetSDAIPriceQuery", data);
        return promise.then(data => query_1.GetSDAIPriceQueryResponse.decode(new binary_1.BinaryReader(data)));
    }
    getAssetYieldIndexQuery(request = {}) {
        const data = query_1.GetAssetYieldIndexQueryRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "GetAssetYieldIndexQuery", data);
        return promise.then(data => query_1.GetAssetYieldIndexQueryResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        listLimitParams(request) {
            return queryService.listLimitParams(request);
        },
        capacityByDenom(request) {
            return queryService.capacityByDenom(request);
        },
        allPendingSendPackets(request) {
            return queryService.allPendingSendPackets(request);
        },
        getSDAIPriceQuery(request) {
            return queryService.getSDAIPriceQuery(request);
        },
        getAssetYieldIndexQuery(request) {
            return queryService.getAssetYieldIndexQuery(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
