import { Rpc } from "../../helpers";
import { QueryClient } from "@cosmjs/stargate";
import { ListLimitParamsRequest, ListLimitParamsResponse, QueryCapacityByDenomRequest, QueryCapacityByDenomResponse, QueryAllPendingSendPacketsRequest, QueryAllPendingSendPacketsResponse, GetSDAIPriceQueryRequest, GetSDAIPriceQueryResponse, GetAssetYieldIndexQueryRequest, GetAssetYieldIndexQueryResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
    /** List all limit params. */
    listLimitParams(request?: ListLimitParamsRequest): Promise<ListLimitParamsResponse>;
    /** Query capacity by denom. */
    capacityByDenom(request: QueryCapacityByDenomRequest): Promise<QueryCapacityByDenomResponse>;
    /** Get all pending send packets */
    allPendingSendPackets(request?: QueryAllPendingSendPacketsRequest): Promise<QueryAllPendingSendPacketsResponse>;
    /** Get the price of sDAI. */
    getSDAIPriceQuery(request?: GetSDAIPriceQueryRequest): Promise<GetSDAIPriceQueryResponse>;
    /** Get the price of sDAI. */
    getAssetYieldIndexQuery(request?: GetAssetYieldIndexQueryRequest): Promise<GetAssetYieldIndexQueryResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    listLimitParams(request?: ListLimitParamsRequest): Promise<ListLimitParamsResponse>;
    capacityByDenom(request: QueryCapacityByDenomRequest): Promise<QueryCapacityByDenomResponse>;
    allPendingSendPackets(request?: QueryAllPendingSendPacketsRequest): Promise<QueryAllPendingSendPacketsResponse>;
    getSDAIPriceQuery(request?: GetSDAIPriceQueryRequest): Promise<GetSDAIPriceQueryResponse>;
    getAssetYieldIndexQuery(request?: GetAssetYieldIndexQueryRequest): Promise<GetAssetYieldIndexQueryResponse>;
}
export declare const createRpcQueryExtension: (base: QueryClient) => {
    listLimitParams(request?: ListLimitParamsRequest): Promise<ListLimitParamsResponse>;
    capacityByDenom(request: QueryCapacityByDenomRequest): Promise<QueryCapacityByDenomResponse>;
    allPendingSendPackets(request?: QueryAllPendingSendPacketsRequest): Promise<QueryAllPendingSendPacketsResponse>;
    getSDAIPriceQuery(request?: GetSDAIPriceQueryRequest): Promise<GetSDAIPriceQueryResponse>;
    getAssetYieldIndexQuery(request?: GetAssetYieldIndexQueryRequest): Promise<GetAssetYieldIndexQueryResponse>;
};
