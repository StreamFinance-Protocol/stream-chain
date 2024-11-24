export class LCDQueryClient {
    req;
    constructor({ requestClient }) {
        this.req = requestClient;
        this.nextDelayedMessageId = this.nextDelayedMessageId.bind(this);
        this.message = this.message.bind(this);
        this.blockMessageIds = this.blockMessageIds.bind(this);
    }
    /* Queries the next DelayedMessage's id. */
    async nextDelayedMessageId(_params = {}) {
        const endpoint = `klyraprotocol/v4/delaymsg/next_id`;
        return await this.req.get(endpoint);
    }
    /* Queries the DelayedMessage by id. */
    async message(params) {
        const endpoint = `klyraprotocol/v4/delaymsg/message/${params.id}`;
        return await this.req.get(endpoint);
    }
    /* Queries the DelayedMessages at a given block height. */
    async blockMessageIds(params) {
        const endpoint = `klyraprotocol/v4/delaymsg/block/message_ids/${params.blockHeight}`;
        return await this.req.get(endpoint);
    }
}
