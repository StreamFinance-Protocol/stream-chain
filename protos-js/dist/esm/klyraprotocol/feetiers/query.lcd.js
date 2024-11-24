export class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.perpetualFeeParams = this.perpetualFeeParams.bind(this);
        this.userFeeTier = this.userFeeTier.bind(this);
    }
    /* Queries the PerpetualFeeParams. */
    async perpetualFeeParams(_params = {}) {
        const endpoint = `klyraprotocol/v4/feetiers/perpetual_fee_params`;
        return await this.req.get(endpoint);
    }
    /* Queries a user's fee tier */
    async userFeeTier(params) {
        const options = {
            params: {}
        };
        if (typeof params?.user !== "undefined") {
            options.params.user = params.user;
        }
        const endpoint = `klyraprotocol/v4/feetiers/user_fee_tier`;
        return await this.req.get(endpoint, options);
    }
}
