"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCDQueryClient = void 0;
//@ts-nocheck
const helpers_1 = require("../../helpers");
class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.clobPair = this.clobPair.bind(this);
        this.clobPairAll = this.clobPairAll.bind(this);
        this.equityTierLimitConfiguration = this.equityTierLimitConfiguration.bind(this);
        this.blockRateLimitConfiguration = this.blockRateLimitConfiguration.bind(this);
        this.liquidationsConfiguration = this.liquidationsConfiguration.bind(this);
    }
    /* Queries a ClobPair by id. */
    async clobPair(params) {
        const endpoint = `klyraprotocol/clob/clob_pair/${params.id}`;
        return await this.req.get(endpoint);
    }
    /* Queries a list of ClobPair items. */
    async clobPairAll(params = {
        pagination: undefined
    }) {
        const options = {
            params: {}
        };
        if (typeof params?.pagination !== "undefined") {
            (0, helpers_1.setPaginationParams)(options, params.pagination);
        }
        const endpoint = `klyraprotocol/clob/clob_pair`;
        return await this.req.get(endpoint, options);
    }
    /* Queries EquityTierLimitConfiguration. */
    async equityTierLimitConfiguration(_params = {}) {
        const endpoint = `klyraprotocol/clob/equity_tier`;
        return await this.req.get(endpoint);
    }
    /* Queries BlockRateLimitConfiguration. */
    async blockRateLimitConfiguration(_params = {}) {
        const endpoint = `klyraprotocol/clob/block_rate`;
        return await this.req.get(endpoint);
    }
    /* Queries LiquidationsConfiguration. */
    async liquidationsConfiguration(_params = {}) {
        const endpoint = `klyraprotocol/clob/liquidations_config`;
        return await this.req.get(endpoint);
    }
}
exports.LCDQueryClient = LCDQueryClient;
