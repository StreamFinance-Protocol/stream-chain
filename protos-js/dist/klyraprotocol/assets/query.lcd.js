"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCDQueryClient = void 0;
//@ts-nocheck
const helpers_1 = require("../../helpers");
class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.asset = this.asset.bind(this);
        this.allAssets = this.allAssets.bind(this);
    }
    /* Queries a Asset by id. */
    async asset(params) {
        const endpoint = `klyraprotocol/assets/asset/${params.id}`;
        return await this.req.get(endpoint);
    }
    /* Queries a list of Asset items. */
    async allAssets(params = {
        pagination: undefined
    }) {
        const options = {
            params: {}
        };
        if (typeof params?.pagination !== "undefined") {
            (0, helpers_1.setPaginationParams)(options, params.pagination);
        }
        const endpoint = `klyraprotocol/assets/asset`;
        return await this.req.get(endpoint, options);
    }
}
exports.LCDQueryClient = LCDQueryClient;
