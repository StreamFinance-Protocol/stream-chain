import { LCDClient } from "@cosmology/lcd";
import { ListLimitParamsRequest, ListLimitParamsResponseSDKType, QueryCapacityByDenomRequest, QueryCapacityByDenomResponseSDKType, QueryAllPendingSendPacketsRequest, QueryAllPendingSendPacketsResponseSDKType, GetSDAIPriceQueryRequest, GetSDAIPriceQueryResponseSDKType, GetAssetYieldIndexQueryRequest, GetAssetYieldIndexQueryResponseSDKType } from "./query";
export declare class LCDQueryClient {
    req: LCDClient;
    constructor({ requestClient }: {
        requestClient: LCDClient;
    });
    listLimitParams(_params?: ListLimitParamsRequest): Promise<ListLimitParamsResponseSDKType>;
    capacityByDenom(params: QueryCapacityByDenomRequest): Promise<QueryCapacityByDenomResponseSDKType>;
    allPendingSendPackets(_params?: QueryAllPendingSendPacketsRequest): Promise<QueryAllPendingSendPacketsResponseSDKType>;
    getSDAIPriceQuery(_params?: GetSDAIPriceQueryRequest): Promise<GetSDAIPriceQueryResponseSDKType>;
    getAssetYieldIndexQuery(_params?: GetAssetYieldIndexQueryRequest): Promise<GetAssetYieldIndexQueryResponseSDKType>;
}
