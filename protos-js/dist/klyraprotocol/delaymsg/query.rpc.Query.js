"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRpcQueryExtension = exports.QueryClientImpl = void 0;
const binary_1 = require("../../binary");
const stargate_1 = require("@cosmjs/stargate");
const query_1 = require("./query");
class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.nextDelayedMessageId = this.nextDelayedMessageId.bind(this);
        this.message = this.message.bind(this);
        this.blockMessageIds = this.blockMessageIds.bind(this);
    }
    nextDelayedMessageId(request = {}) {
        const data = query_1.QueryNextDelayedMessageIdRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.delaymsg.Query", "NextDelayedMessageId", data);
        return promise.then(data => query_1.QueryNextDelayedMessageIdResponse.decode(new binary_1.BinaryReader(data)));
    }
    message(request) {
        const data = query_1.QueryMessageRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.delaymsg.Query", "Message", data);
        return promise.then(data => query_1.QueryMessageResponse.decode(new binary_1.BinaryReader(data)));
    }
    blockMessageIds(request) {
        const data = query_1.QueryBlockMessageIdsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.delaymsg.Query", "BlockMessageIds", data);
        return promise.then(data => query_1.QueryBlockMessageIdsResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        nextDelayedMessageId(request) {
            return queryService.nextDelayedMessageId(request);
        },
        message(request) {
            return queryService.message(request);
        },
        blockMessageIds(request) {
            return queryService.blockMessageIds(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
