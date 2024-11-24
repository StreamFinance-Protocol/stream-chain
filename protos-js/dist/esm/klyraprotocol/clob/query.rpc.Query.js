import { BinaryReader } from "../../binary";
import { createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryGetClobPairRequest, QueryClobPairResponse, QueryAllClobPairRequest, QueryClobPairAllResponse, MevNodeToNodeCalculationRequest, MevNodeToNodeCalculationResponse, QueryEquityTierLimitConfigurationRequest, QueryEquityTierLimitConfigurationResponse, QueryBlockRateLimitConfigurationRequest, QueryBlockRateLimitConfigurationResponse, QueryLiquidationsConfigurationRequest, QueryLiquidationsConfigurationResponse, StreamOrderbookUpdatesRequest, StreamOrderbookUpdatesResponse } from "./query";
export class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.clobPair = this.clobPair.bind(this);
        this.clobPairAll = this.clobPairAll.bind(this);
        this.mevNodeToNodeCalculation = this.mevNodeToNodeCalculation.bind(this);
        this.equityTierLimitConfiguration = this.equityTierLimitConfiguration.bind(this);
        this.blockRateLimitConfiguration = this.blockRateLimitConfiguration.bind(this);
        this.liquidationsConfiguration = this.liquidationsConfiguration.bind(this);
        this.streamOrderbookUpdates = this.streamOrderbookUpdates.bind(this);
    }
    clobPair(request) {
        const data = QueryGetClobPairRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "ClobPair", data);
        return promise.then(data => QueryClobPairResponse.decode(new BinaryReader(data)));
    }
    clobPairAll(request = {
        pagination: undefined
    }) {
        const data = QueryAllClobPairRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "ClobPairAll", data);
        return promise.then(data => QueryClobPairAllResponse.decode(new BinaryReader(data)));
    }
    mevNodeToNodeCalculation(request) {
        const data = MevNodeToNodeCalculationRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "MevNodeToNodeCalculation", data);
        return promise.then(data => MevNodeToNodeCalculationResponse.decode(new BinaryReader(data)));
    }
    equityTierLimitConfiguration(request = {}) {
        const data = QueryEquityTierLimitConfigurationRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "EquityTierLimitConfiguration", data);
        return promise.then(data => QueryEquityTierLimitConfigurationResponse.decode(new BinaryReader(data)));
    }
    blockRateLimitConfiguration(request = {}) {
        const data = QueryBlockRateLimitConfigurationRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "BlockRateLimitConfiguration", data);
        return promise.then(data => QueryBlockRateLimitConfigurationResponse.decode(new BinaryReader(data)));
    }
    liquidationsConfiguration(request = {}) {
        const data = QueryLiquidationsConfigurationRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "LiquidationsConfiguration", data);
        return promise.then(data => QueryLiquidationsConfigurationResponse.decode(new BinaryReader(data)));
    }
    streamOrderbookUpdates(request) {
        const data = StreamOrderbookUpdatesRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "StreamOrderbookUpdates", data);
        return promise.then(data => StreamOrderbookUpdatesResponse.decode(new BinaryReader(data)));
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        clobPair(request) {
            return queryService.clobPair(request);
        },
        clobPairAll(request) {
            return queryService.clobPairAll(request);
        },
        mevNodeToNodeCalculation(request) {
            return queryService.mevNodeToNodeCalculation(request);
        },
        equityTierLimitConfiguration(request) {
            return queryService.equityTierLimitConfiguration(request);
        },
        blockRateLimitConfiguration(request) {
            return queryService.blockRateLimitConfiguration(request);
        },
        liquidationsConfiguration(request) {
            return queryService.liquidationsConfiguration(request);
        },
        streamOrderbookUpdates(request) {
            return queryService.streamOrderbookUpdates(request);
        }
    };
};
