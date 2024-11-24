import { BinaryReader } from "../../../../binary";
import { createProtobufRpcClient } from "@cosmjs/stargate";
import { ConfigRequest, ConfigResponse, StatusRequest, StatusResponse } from "./query";
export class ServiceClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.config = this.config.bind(this);
        this.status = this.status.bind(this);
    }
    config(request = {}) {
        const data = ConfigRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.base.node.v1beta1.Service", "Config", data);
        return promise.then(data => ConfigResponse.decode(new BinaryReader(data)));
    }
    status(request = {}) {
        const data = StatusRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.base.node.v1beta1.Service", "Status", data);
        return promise.then(data => StatusResponse.decode(new BinaryReader(data)));
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
    const queryService = new ServiceClientImpl(rpc);
    return {
        config(request) {
            return queryService.config(request);
        },
        status(request) {
            return queryService.status(request);
        }
    };
};
