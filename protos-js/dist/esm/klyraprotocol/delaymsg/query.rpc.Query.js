import { BinaryReader } from "../../binary";
import { createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryNextDelayedMessageIdRequest, QueryNextDelayedMessageIdResponse, QueryMessageRequest, QueryMessageResponse, QueryBlockMessageIdsRequest, QueryBlockMessageIdsResponse } from "./query";
export class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.nextDelayedMessageId = this.nextDelayedMessageId.bind(this);
        this.message = this.message.bind(this);
        this.blockMessageIds = this.blockMessageIds.bind(this);
    }
    nextDelayedMessageId(request = {}) {
        const data = QueryNextDelayedMessageIdRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.delaymsg.Query", "NextDelayedMessageId", data);
        return promise.then(data => QueryNextDelayedMessageIdResponse.decode(new BinaryReader(data)));
    }
    message(request) {
        const data = QueryMessageRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.delaymsg.Query", "Message", data);
        return promise.then(data => QueryMessageResponse.decode(new BinaryReader(data)));
    }
    blockMessageIds(request) {
        const data = QueryBlockMessageIdsRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.delaymsg.Query", "BlockMessageIds", data);
        return promise.then(data => QueryBlockMessageIdsResponse.decode(new BinaryReader(data)));
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
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
