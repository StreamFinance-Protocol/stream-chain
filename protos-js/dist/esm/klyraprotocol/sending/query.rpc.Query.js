import { createProtobufRpcClient } from "@cosmjs/stargate";
export class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {};
};
