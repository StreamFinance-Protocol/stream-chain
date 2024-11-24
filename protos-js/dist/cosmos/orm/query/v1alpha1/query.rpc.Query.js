"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRpcQueryExtension = exports.QueryClientImpl = void 0;
const binary_1 = require("../../../../binary");
const stargate_1 = require("@cosmjs/stargate");
const query_1 = require("./query");
class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.get = this.get.bind(this);
        this.list = this.list.bind(this);
    }
    get(request) {
        const data = query_1.GetRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.orm.query.v1alpha1.Query", "Get", data);
        return promise.then(data => query_1.GetResponse.decode(new binary_1.BinaryReader(data)));
    }
    list(request) {
        const data = query_1.ListRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.orm.query.v1alpha1.Query", "List", data);
        return promise.then(data => query_1.ListResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        get(request) {
            return queryService.get(request);
        },
        list(request) {
            return queryService.list(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
