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
        this.marketPrice = this.marketPrice.bind(this);
        this.allMarketPrices = this.allMarketPrices.bind(this);
        this.marketParam = this.marketParam.bind(this);
        this.allMarketParams = this.allMarketParams.bind(this);
    }
    marketPrice(request) {
        const data = query_1.QueryMarketPriceRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Query", "MarketPrice", data);
        return promise.then(data => query_1.QueryMarketPriceResponse.decode(new binary_1.BinaryReader(data)));
    }
    allMarketPrices(request = {
        pagination: undefined
    }) {
        const data = query_1.QueryAllMarketPricesRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Query", "AllMarketPrices", data);
        return promise.then(data => query_1.QueryAllMarketPricesResponse.decode(new binary_1.BinaryReader(data)));
    }
    marketParam(request) {
        const data = query_1.QueryMarketParamRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Query", "MarketParam", data);
        return promise.then(data => query_1.QueryMarketParamResponse.decode(new binary_1.BinaryReader(data)));
    }
    allMarketParams(request = {
        pagination: undefined
    }) {
        const data = query_1.QueryAllMarketParamsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Query", "AllMarketParams", data);
        return promise.then(data => query_1.QueryAllMarketParamsResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        marketPrice(request) {
            return queryService.marketPrice(request);
        },
        allMarketPrices(request) {
            return queryService.allMarketPrices(request);
        },
        marketParam(request) {
            return queryService.marketParam(request);
        },
        allMarketParams(request) {
            return queryService.allMarketParams(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
