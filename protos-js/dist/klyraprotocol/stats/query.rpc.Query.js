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
        this.params = this.params.bind(this);
        this.statsMetadata = this.statsMetadata.bind(this);
        this.globalStats = this.globalStats.bind(this);
        this.userStats = this.userStats.bind(this);
    }
    params(request = {}) {
        const data = query_1.QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.stats.Query", "Params", data);
        return promise.then(data => query_1.QueryParamsResponse.decode(new binary_1.BinaryReader(data)));
    }
    statsMetadata(request = {}) {
        const data = query_1.QueryStatsMetadataRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.stats.Query", "StatsMetadata", data);
        return promise.then(data => query_1.QueryStatsMetadataResponse.decode(new binary_1.BinaryReader(data)));
    }
    globalStats(request = {}) {
        const data = query_1.QueryGlobalStatsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.stats.Query", "GlobalStats", data);
        return promise.then(data => query_1.QueryGlobalStatsResponse.decode(new binary_1.BinaryReader(data)));
    }
    userStats(request) {
        const data = query_1.QueryUserStatsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.stats.Query", "UserStats", data);
        return promise.then(data => query_1.QueryUserStatsResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        params(request) {
            return queryService.params(request);
        },
        statsMetadata(request) {
            return queryService.statsMetadata(request);
        },
        globalStats(request) {
            return queryService.globalStats(request);
        },
        userStats(request) {
            return queryService.userStats(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
