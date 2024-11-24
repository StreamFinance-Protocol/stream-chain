import { BinaryReader } from "../../binary";
import { createProtobufRpcClient } from "@cosmjs/stargate";
import { ListLimitParamsRequest, ListLimitParamsResponse, QueryCapacityByDenomRequest, QueryCapacityByDenomResponse, QueryAllPendingSendPacketsRequest, QueryAllPendingSendPacketsResponse, GetSDAIPriceQueryRequest, GetSDAIPriceQueryResponse, GetAssetYieldIndexQueryRequest, GetAssetYieldIndexQueryResponse } from "./query";
export class QueryClientImpl {
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
        const data = ListLimitParamsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "ListLimitParams", data);
        return promise.then(data => ListLimitParamsResponse.decode(new BinaryReader(data)));
    }
    capacityByDenom(request) {
        const data = QueryCapacityByDenomRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "CapacityByDenom", data);
        return promise.then(data => QueryCapacityByDenomResponse.decode(new BinaryReader(data)));
    }
    allPendingSendPackets(request = {}) {
        const data = QueryAllPendingSendPacketsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "AllPendingSendPackets", data);
        return promise.then(data => QueryAllPendingSendPacketsResponse.decode(new BinaryReader(data)));
    }
    getSDAIPriceQuery(request = {}) {
        const data = GetSDAIPriceQueryRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "GetSDAIPriceQuery", data);
        return promise.then(data => GetSDAIPriceQueryResponse.decode(new BinaryReader(data)));
    }
    getAssetYieldIndexQuery(request = {}) {
        const data = GetAssetYieldIndexQueryRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.ratelimit.Query", "GetAssetYieldIndexQuery", data);
        return promise.then(data => GetAssetYieldIndexQueryResponse.decode(new BinaryReader(data)));
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
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
