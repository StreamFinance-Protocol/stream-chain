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
        this.asset = this.asset.bind(this);
        this.allAssets = this.allAssets.bind(this);
    }
    asset(request) {
        const data = query_1.QueryAssetRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.assets.Query", "Asset", data);
        return promise.then(data => query_1.QueryAssetResponse.decode(new binary_1.BinaryReader(data)));
    }
    allAssets(request = {
        pagination: undefined
    }) {
        const data = query_1.QueryAllAssetsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.assets.Query", "AllAssets", data);
        return promise.then(data => query_1.QueryAllAssetsResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        asset(request) {
            return queryService.asset(request);
        },
        allAssets(request) {
            return queryService.allAssets(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
