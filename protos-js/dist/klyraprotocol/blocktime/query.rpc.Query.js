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
        this.downtimeParams = this.downtimeParams.bind(this);
        this.previousBlockInfo = this.previousBlockInfo.bind(this);
        this.allDowntimeInfo = this.allDowntimeInfo.bind(this);
    }
    downtimeParams(request = {}) {
        const data = query_1.QueryDowntimeParamsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.blocktime.Query", "DowntimeParams", data);
        return promise.then(data => query_1.QueryDowntimeParamsResponse.decode(new binary_1.BinaryReader(data)));
    }
    previousBlockInfo(request = {}) {
        const data = query_1.QueryPreviousBlockInfoRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.blocktime.Query", "PreviousBlockInfo", data);
        return promise.then(data => query_1.QueryPreviousBlockInfoResponse.decode(new binary_1.BinaryReader(data)));
    }
    allDowntimeInfo(request = {}) {
        const data = query_1.QueryAllDowntimeInfoRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.blocktime.Query", "AllDowntimeInfo", data);
        return promise.then(data => query_1.QueryAllDowntimeInfoResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        downtimeParams(request) {
            return queryService.downtimeParams(request);
        },
        previousBlockInfo(request) {
            return queryService.previousBlockInfo(request);
        },
        allDowntimeInfo(request) {
            return queryService.allDowntimeInfo(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
