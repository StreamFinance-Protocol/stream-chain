export class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.params = this.params.bind(this);
    }
    /* Params queries the parameters of x/consensus module. */
    async params(_params = {}) {
        const endpoint = `cosmos/consensus/v1/params`;
        return await this.req.get(endpoint);
    }
}
