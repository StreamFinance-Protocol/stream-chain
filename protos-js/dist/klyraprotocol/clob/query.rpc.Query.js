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
        this.clobPair = this.clobPair.bind(this);
        this.clobPairAll = this.clobPairAll.bind(this);
        this.mevNodeToNodeCalculation = this.mevNodeToNodeCalculation.bind(this);
        this.equityTierLimitConfiguration = this.equityTierLimitConfiguration.bind(this);
        this.blockRateLimitConfiguration = this.blockRateLimitConfiguration.bind(this);
        this.liquidationsConfiguration = this.liquidationsConfiguration.bind(this);
        this.streamOrderbookUpdates = this.streamOrderbookUpdates.bind(this);
    }
    clobPair(request) {
        const data = query_1.QueryGetClobPairRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "ClobPair", data);
        return promise.then(data => query_1.QueryClobPairResponse.decode(new binary_1.BinaryReader(data)));
    }
    clobPairAll(request = {
        pagination: undefined
    }) {
        const data = query_1.QueryAllClobPairRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "ClobPairAll", data);
        return promise.then(data => query_1.QueryClobPairAllResponse.decode(new binary_1.BinaryReader(data)));
    }
    mevNodeToNodeCalculation(request) {
        const data = query_1.MevNodeToNodeCalculationRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "MevNodeToNodeCalculation", data);
        return promise.then(data => query_1.MevNodeToNodeCalculationResponse.decode(new binary_1.BinaryReader(data)));
    }
    equityTierLimitConfiguration(request = {}) {
        const data = query_1.QueryEquityTierLimitConfigurationRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "EquityTierLimitConfiguration", data);
        return promise.then(data => query_1.QueryEquityTierLimitConfigurationResponse.decode(new binary_1.BinaryReader(data)));
    }
    blockRateLimitConfiguration(request = {}) {
        const data = query_1.QueryBlockRateLimitConfigurationRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "BlockRateLimitConfiguration", data);
        return promise.then(data => query_1.QueryBlockRateLimitConfigurationResponse.decode(new binary_1.BinaryReader(data)));
    }
    liquidationsConfiguration(request = {}) {
        const data = query_1.QueryLiquidationsConfigurationRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "LiquidationsConfiguration", data);
        return promise.then(data => query_1.QueryLiquidationsConfigurationResponse.decode(new binary_1.BinaryReader(data)));
    }
    streamOrderbookUpdates(request) {
        const data = query_1.StreamOrderbookUpdatesRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.clob.Query", "StreamOrderbookUpdates", data);
        return promise.then(data => query_1.StreamOrderbookUpdatesResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
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
exports.createRpcQueryExtension = createRpcQueryExtension;
