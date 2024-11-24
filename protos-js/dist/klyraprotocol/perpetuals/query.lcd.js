"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCDQueryClient = void 0;
//@ts-nocheck
const helpers_1 = require("../../helpers");
class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.perpetual = this.perpetual.bind(this);
        this.allPerpetuals = this.allPerpetuals.bind(this);
        this.allLiquidityTiers = this.allLiquidityTiers.bind(this);
        this.premiumVotes = this.premiumVotes.bind(this);
        this.premiumSamples = this.premiumSamples.bind(this);
        this.params = this.params.bind(this);
    }
    /* Queries a Perpetual by id. */
    async perpetual(params) {
        const endpoint = `klyraprotocol/perpetuals/perpetual/${params.id}`;
        return await this.req.get(endpoint);
    }
    /* Queries a list of Perpetual items. */
    async allPerpetuals(params = {
        pagination: undefined
    }) {
        const options = {
            params: {}
        };
        if (typeof params?.pagination !== "undefined") {
            (0, helpers_1.setPaginationParams)(options, params.pagination);
        }
        const endpoint = `klyraprotocol/perpetuals/perpetual`;
        return await this.req.get(endpoint, options);
    }
    /* Queries a list of LiquidityTiers. */
    async allLiquidityTiers(params = {
        pagination: undefined
    }) {
        const options = {
            params: {}
        };
        if (typeof params?.pagination !== "undefined") {
            (0, helpers_1.setPaginationParams)(options, params.pagination);
        }
        const endpoint = `klyraprotocol/perpetuals/liquidity_tiers`;
        return await this.req.get(endpoint, options);
    }
    /* Queries a list of premium votes. */
    async premiumVotes(_params = {}) {
        const endpoint = `klyraprotocol/perpetuals/premium_votes`;
        return await this.req.get(endpoint);
    }
    /* Queries a list of premium samples. */
    async premiumSamples(_params = {}) {
        const endpoint = `klyraprotocol/perpetuals/premium_samples`;
        return await this.req.get(endpoint);
    }
    /* Queries the perpetual params. */
    async params(_params = {}) {
        const endpoint = `klyraprotocol/perpetuals/params`;
        return await this.req.get(endpoint);
    }
}
exports.LCDQueryClient = LCDQueryClient;
