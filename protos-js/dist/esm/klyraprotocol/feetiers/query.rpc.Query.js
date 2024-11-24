import { BinaryReader } from "../../binary";
import { createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryPerpetualFeeParamsRequest, QueryPerpetualFeeParamsResponse, QueryUserFeeTierRequest, QueryUserFeeTierResponse } from "./query";
export class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.perpetualFeeParams = this.perpetualFeeParams.bind(this);
        this.userFeeTier = this.userFeeTier.bind(this);
    }
    perpetualFeeParams(request = {}) {
        const data = QueryPerpetualFeeParamsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.feetiers.Query", "PerpetualFeeParams", data);
        return promise.then(data => QueryPerpetualFeeParamsResponse.decode(new BinaryReader(data)));
    }
    userFeeTier(request) {
        const data = QueryUserFeeTierRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.feetiers.Query", "UserFeeTier", data);
        return promise.then(data => QueryUserFeeTierResponse.decode(new BinaryReader(data)));
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
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
