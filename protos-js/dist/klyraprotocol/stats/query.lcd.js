"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCDQueryClient = void 0;
class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.params = this.params.bind(this);
        this.statsMetadata = this.statsMetadata.bind(this);
        this.globalStats = this.globalStats.bind(this);
        this.userStats = this.userStats.bind(this);
    }
    /* Queries the Params. */
    async params(_params = {}) {
        const endpoint = `klyraprotocol/v4/stats/params`;
        return await this.req.get(endpoint);
    }
    /* Queries StatsMetadata. */
    async statsMetadata(_params = {}) {
        const endpoint = `klyraprotocol/v4/stats/stats_metadata`;
        return await this.req.get(endpoint);
    }
    /* Queries GlobalStats. */
    async globalStats(_params = {}) {
        const endpoint = `klyraprotocol/v4/stats/global_stats`;
        return await this.req.get(endpoint);
    }
    /* Queries UserStats. */
    async userStats(params) {
        const options = {
            params: {}
        };
        if (typeof params?.user !== "undefined") {
            options.params.user = params.user;
        }
        const endpoint = `klyraprotocol/v4/stats/user_stats`;
        return await this.req.get(endpoint, options);
    }
}
exports.LCDQueryClient = LCDQueryClient;
