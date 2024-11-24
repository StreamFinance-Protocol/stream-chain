"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRpcQueryExtension = exports.QueryClientImpl = void 0;
const binary_1 = require("../../../binary");
const stargate_1 = require("@cosmjs/stargate");
const query_1 = require("./query");
class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.account = this.account.bind(this);
        this.accounts = this.accounts.bind(this);
        this.disabledList = this.disabledList.bind(this);
    }
    account(request) {
        const data = query_1.QueryAccountRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.circuit.v1.Query", "Account", data);
        return promise.then(data => query_1.AccountResponse.decode(new binary_1.BinaryReader(data)));
    }
    accounts(request = {
        pagination: undefined
    }) {
        const data = query_1.QueryAccountsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.circuit.v1.Query", "Accounts", data);
        return promise.then(data => query_1.AccountsResponse.decode(new binary_1.BinaryReader(data)));
    }
    disabledList(request = {}) {
        const data = query_1.QueryDisabledListRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.circuit.v1.Query", "DisabledList", data);
        return promise.then(data => query_1.DisabledListResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        account(request) {
            return queryService.account(request);
        },
        accounts(request) {
            return queryService.accounts(request);
        },
        disabledList(request) {
            return queryService.disabledList(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
