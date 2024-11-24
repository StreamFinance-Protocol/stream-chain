import { BinaryReader } from "../../binary";
import { createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryGetEpochInfoRequest, QueryEpochInfoResponse, QueryAllEpochInfoRequest, QueryEpochInfoAllResponse } from "./query";
export class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.epochInfo = this.epochInfo.bind(this);
        this.epochInfoAll = this.epochInfoAll.bind(this);
    }
    epochInfo(request) {
        const data = QueryGetEpochInfoRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.epochs.Query", "EpochInfo", data);
        return promise.then(data => QueryEpochInfoResponse.decode(new BinaryReader(data)));
    }
    epochInfoAll(request = {
        pagination: undefined
    }) {
        const data = QueryAllEpochInfoRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.epochs.Query", "EpochInfoAll", data);
        return promise.then(data => QueryEpochInfoAllResponse.decode(new BinaryReader(data)));
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
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
