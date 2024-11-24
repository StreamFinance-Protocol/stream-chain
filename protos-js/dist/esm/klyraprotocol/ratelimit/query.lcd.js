export class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.listLimitParams = this.listLimitParams.bind(this);
        this.capacityByDenom = this.capacityByDenom.bind(this);
        this.allPendingSendPackets = this.allPendingSendPackets.bind(this);
        this.getSDAIPriceQuery = this.getSDAIPriceQuery.bind(this);
        this.getAssetYieldIndexQuery = this.getAssetYieldIndexQuery.bind(this);
    }
    /* List all limit params. */
    async listLimitParams(_params = {}) {
        const endpoint = `klyraprotocol/v4/ratelimit/list_limit_params`;
        return await this.req.get(endpoint);
    }
    /* Query capacity by denom. */
    async capacityByDenom(params) {
        const options = {
            params: {}
        };
        if (typeof params?.denom !== "undefined") {
            options.params.denom = params.denom;
        }
        const endpoint = `klyraprotocol/v4/ratelimit/capacity_by_denom`;
        return await this.req.get(endpoint, options);
    }
    /* Get all pending send packets */
    async allPendingSendPackets(_params = {}) {
        const endpoint = `klyraprotocol/v4/ratelimit/get_all_pending_send_packet`;
        return await this.req.get(endpoint);
    }
    /* Get the price of sDAI. */
    async getSDAIPriceQuery(_params = {}) {
        const endpoint = `klyraprotocol/v4/ratelimit/get_sdai_price`;
        return await this.req.get(endpoint);
    }
    /* Get the price of sDAI. */
    async getAssetYieldIndexQuery(_params = {}) {
        const endpoint = `klyraprotocol/v4/ratelimit/get_asset_yield_index`;
        return await this.req.get(endpoint);
    }
}
