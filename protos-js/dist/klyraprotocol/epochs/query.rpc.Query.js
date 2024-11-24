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
        this.epochInfo = this.epochInfo.bind(this);
        this.epochInfoAll = this.epochInfoAll.bind(this);
    }
    epochInfo(request) {
        const data = query_1.QueryGetEpochInfoRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.epochs.Query", "EpochInfo", data);
        return promise.then(data => query_1.QueryEpochInfoResponse.decode(new binary_1.BinaryReader(data)));
    }
    epochInfoAll(request = {
        pagination: undefined
    }) {
        const data = query_1.QueryAllEpochInfoRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.epochs.Query", "EpochInfoAll", data);
        return promise.then(data => query_1.QueryEpochInfoAllResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        epochInfo(request) {
            return queryService.epochInfo(request);
        },
        epochInfoAll(request) {
            return queryService.epochInfoAll(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
