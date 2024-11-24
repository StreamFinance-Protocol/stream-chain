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
        this.perpetualFeeParams = this.perpetualFeeParams.bind(this);
        this.userFeeTier = this.userFeeTier.bind(this);
    }
    perpetualFeeParams(request = {}) {
        const data = query_1.QueryPerpetualFeeParamsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.feetiers.Query", "PerpetualFeeParams", data);
        return promise.then(data => query_1.QueryPerpetualFeeParamsResponse.decode(new binary_1.BinaryReader(data)));
    }
    userFeeTier(request) {
        const data = query_1.QueryUserFeeTierRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.feetiers.Query", "UserFeeTier", data);
        return promise.then(data => query_1.QueryUserFeeTierResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        perpetualFeeParams(request) {
            return queryService.perpetualFeeParams(request);
        },
        userFeeTier(request) {
            return queryService.userFeeTier(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
