//@ts-nocheck
import { setPaginationParams } from "../../helpers";
export class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.marketPrice = this.marketPrice.bind(this);
        this.allMarketPrices = this.allMarketPrices.bind(this);
        this.marketParam = this.marketParam.bind(this);
        this.allMarketParams = this.allMarketParams.bind(this);
    }
    /* Queries a MarketPrice by id. */
    async marketPrice(params) {
        const endpoint = `klyraprotocol/prices/market/${params.id}`;
        return await this.req.get(endpoint);
    }
    /* Queries a list of MarketPrice items. */
    async allMarketPrices(params = {
        pagination: undefined
    }) {
        const options = {
            params: {}
        };
        if (typeof params?.pagination !== "undefined") {
            setPaginationParams(options, params.pagination);
        }
        const endpoint = `klyraprotocol/prices/market`;
        return await this.req.get(endpoint, options);
    }
    /* Queries a MarketParam by id. */
    async marketParam(params) {
        const endpoint = `klyraprotocol/prices/params/market/${params.id}`;
        return await this.req.get(endpoint);
    }
    /* Queries a list of MarketParam items. */
    async allMarketParams(params = {
        pagination: undefined
    }) {
        const options = {
            params: {}
        };
        if (typeof params?.pagination !== "undefined") {
            setPaginationParams(options, params.pagination);
        }
        const endpoint = `klyraprotocol/prices/params/market`;
        return await this.req.get(endpoint, options);
    }
}
