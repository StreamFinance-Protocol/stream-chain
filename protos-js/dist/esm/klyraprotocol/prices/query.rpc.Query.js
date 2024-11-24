import { BinaryReader } from "../../binary";
import { createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryMarketPriceRequest, QueryMarketPriceResponse, QueryAllMarketPricesRequest, QueryAllMarketPricesResponse, QueryMarketParamRequest, QueryMarketParamResponse, QueryAllMarketParamsRequest, QueryAllMarketParamsResponse } from "./query";
export class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.marketPrice = this.marketPrice.bind(this);
        this.allMarketPrices = this.allMarketPrices.bind(this);
        this.marketParam = this.marketParam.bind(this);
        this.allMarketParams = this.allMarketParams.bind(this);
    }
    marketPrice(request) {
        const data = QueryMarketPriceRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Query", "MarketPrice", data);
        return promise.then(data => QueryMarketPriceResponse.decode(new BinaryReader(data)));
    }
    allMarketPrices(request = {
        pagination: undefined
    }) {
        const data = QueryAllMarketPricesRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Query", "AllMarketPrices", data);
        return promise.then(data => QueryAllMarketPricesResponse.decode(new BinaryReader(data)));
    }
    marketParam(request) {
        const data = QueryMarketParamRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Query", "MarketParam", data);
        return promise.then(data => QueryMarketParamResponse.decode(new BinaryReader(data)));
    }
    allMarketParams(request = {
        pagination: undefined
    }) {
        const data = QueryAllMarketParamsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.prices.Query", "AllMarketParams", data);
        return promise.then(data => QueryAllMarketParamsResponse.decode(new BinaryReader(data)));
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
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
