import { Rpc } from "../../helpers";
import { QueryClient } from "@cosmjs/stargate";
import { QueryGetClobPairRequest, QueryClobPairResponse, QueryAllClobPairRequest, QueryClobPairAllResponse, MevNodeToNodeCalculationRequest, MevNodeToNodeCalculationResponse, QueryEquityTierLimitConfigurationRequest, QueryEquityTierLimitConfigurationResponse, QueryBlockRateLimitConfigurationRequest, QueryBlockRateLimitConfigurationResponse, QueryLiquidationsConfigurationRequest, QueryLiquidationsConfigurationResponse, StreamOrderbookUpdatesRequest, StreamOrderbookUpdatesResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a ClobPair by id. */
    clobPair(request: QueryGetClobPairRequest): Promise<QueryClobPairResponse>;
    /** Queries a list of ClobPair items. */
    clobPairAll(request?: QueryAllClobPairRequest): Promise<QueryClobPairAllResponse>;
    /** Runs the MEV node <> node calculation with the provided parameters. */
    mevNodeToNodeCalculation(request: MevNodeToNodeCalculationRequest): Promise<MevNodeToNodeCalculationResponse>;
    /** Queries EquityTierLimitConfiguration. */
    equityTierLimitConfiguration(request?: QueryEquityTierLimitConfigurationRequest): Promise<QueryEquityTierLimitConfigurationResponse>;
    /** Queries BlockRateLimitConfiguration. */
    blockRateLimitConfiguration(request?: QueryBlockRateLimitConfigurationRequest): Promise<QueryBlockRateLimitConfigurationResponse>;
    /** Queries LiquidationsConfiguration. */
    liquidationsConfiguration(request?: QueryLiquidationsConfigurationRequest): Promise<QueryLiquidationsConfigurationResponse>;
    /** Streams orderbook updates. */
    streamOrderbookUpdates(request: StreamOrderbookUpdatesRequest): Promise<StreamOrderbookUpdatesResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    clobPair(request: QueryGetClobPairRequest): Promise<QueryClobPairResponse>;
    clobPairAll(request?: QueryAllClobPairRequest): Promise<QueryClobPairAllResponse>;
    mevNodeToNodeCalculation(request: MevNodeToNodeCalculationRequest): Promise<MevNodeToNodeCalculationResponse>;
    equityTierLimitConfiguration(request?: QueryEquityTierLimitConfigurationRequest): Promise<QueryEquityTierLimitConfigurationResponse>;
    blockRateLimitConfiguration(request?: QueryBlockRateLimitConfigurationRequest): Promise<QueryBlockRateLimitConfigurationResponse>;
    liquidationsConfiguration(request?: QueryLiquidationsConfigurationRequest): Promise<QueryLiquidationsConfigurationResponse>;
    streamOrderbookUpdates(request: StreamOrderbookUpdatesRequest): Promise<StreamOrderbookUpdatesResponse>;
}
export declare const createRpcQueryExtension: (base: QueryClient) => {
    clobPair(request: QueryGetClobPairRequest): Promise<QueryClobPairResponse>;
    clobPairAll(request?: QueryAllClobPairRequest): Promise<QueryClobPairAllResponse>;
    mevNodeToNodeCalculation(request: MevNodeToNodeCalculationRequest): Promise<MevNodeToNodeCalculationResponse>;
    equityTierLimitConfiguration(request?: QueryEquityTierLimitConfigurationRequest): Promise<QueryEquityTierLimitConfigurationResponse>;
    blockRateLimitConfiguration(request?: QueryBlockRateLimitConfigurationRequest): Promise<QueryBlockRateLimitConfigurationResponse>;
    liquidationsConfiguration(request?: QueryLiquidationsConfigurationRequest): Promise<QueryLiquidationsConfigurationResponse>;
    streamOrderbookUpdates(request: StreamOrderbookUpdatesRequest): Promise<StreamOrderbookUpdatesResponse>;
};
