"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCDQueryClient = void 0;
//@ts-nocheck
const helpers_1 = require("../../helpers");
class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.epochInfo = this.epochInfo.bind(this);
        this.epochInfoAll = this.epochInfoAll.bind(this);
    }
    /* Queries a EpochInfo by name. */
    async epochInfo(params) {
        const endpoint = `klyraprotocol/v4/epochs/epoch_info/${params.name}`;
        return await this.req.get(endpoint);
    }
    /* Queries a list of EpochInfo items. */
    async epochInfoAll(params = {
        pagination: undefined
    }) {
        const options = {
            params: {}
        };
        if (typeof params?.pagination !== "undefined") {
            (0, helpers_1.setPaginationParams)(options, params.pagination);
        }
        const endpoint = `klyraprotocol/v4/epochs/epoch_info`;
        return await this.req.get(endpoint, options);
    }
}
exports.LCDQueryClient = LCDQueryClient;
