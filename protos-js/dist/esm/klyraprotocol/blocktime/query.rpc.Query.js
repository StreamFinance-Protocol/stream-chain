import { BinaryReader } from "../../binary";
import { createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryDowntimeParamsRequest, QueryDowntimeParamsResponse, QueryPreviousBlockInfoRequest, QueryPreviousBlockInfoResponse, QueryAllDowntimeInfoRequest, QueryAllDowntimeInfoResponse } from "./query";
export class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.downtimeParams = this.downtimeParams.bind(this);
        this.previousBlockInfo = this.previousBlockInfo.bind(this);
        this.allDowntimeInfo = this.allDowntimeInfo.bind(this);
    }
    downtimeParams(request = {}) {
        const data = QueryDowntimeParamsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.blocktime.Query", "DowntimeParams", data);
        return promise.then(data => QueryDowntimeParamsResponse.decode(new BinaryReader(data)));
    }
    previousBlockInfo(request = {}) {
        const data = QueryPreviousBlockInfoRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.blocktime.Query", "PreviousBlockInfo", data);
        return promise.then(data => QueryPreviousBlockInfoResponse.decode(new BinaryReader(data)));
    }
    allDowntimeInfo(request = {}) {
        const data = QueryAllDowntimeInfoRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.blocktime.Query", "AllDowntimeInfo", data);
        return promise.then(data => QueryAllDowntimeInfoResponse.decode(new BinaryReader(data)));
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
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
