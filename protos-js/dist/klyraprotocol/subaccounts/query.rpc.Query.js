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
        this.subaccount = this.subaccount.bind(this);
        this.subaccountAll = this.subaccountAll.bind(this);
        this.getWithdrawalAndTransfersBlockedInfo = this.getWithdrawalAndTransfersBlockedInfo.bind(this);
        this.collateralPoolAddress = this.collateralPoolAddress.bind(this);
    }
    subaccount(request) {
        const data = query_1.QueryGetSubaccountRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.subaccounts.Query", "Subaccount", data);
        return promise.then(data => query_1.QuerySubaccountResponse.decode(new binary_1.BinaryReader(data)));
    }
    subaccountAll(request = {
        pagination: undefined
    }) {
        const data = query_1.QueryAllSubaccountRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.subaccounts.Query", "SubaccountAll", data);
        return promise.then(data => query_1.QuerySubaccountAllResponse.decode(new binary_1.BinaryReader(data)));
    }
    getWithdrawalAndTransfersBlockedInfo(request) {
        const data = query_1.QueryGetWithdrawalAndTransfersBlockedInfoRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.subaccounts.Query", "GetWithdrawalAndTransfersBlockedInfo", data);
        return promise.then(data => query_1.QueryGetWithdrawalAndTransfersBlockedInfoResponse.decode(new binary_1.BinaryReader(data)));
    }
    collateralPoolAddress(request) {
        const data = query_1.QueryCollateralPoolAddressRequest.encode(request).finish();
        const promise = this.rpc.request("klyraprotocol.subaccounts.Query", "CollateralPoolAddress", data);
        return promise.then(data => query_1.QueryCollateralPoolAddressResponse.decode(new binary_1.BinaryReader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
const createRpcQueryExtension = (base) => {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        subaccount(request) {
            return queryService.subaccount(request);
        },
        subaccountAll(request) {
            return queryService.subaccountAll(request);
        },
        getWithdrawalAndTransfersBlockedInfo(request) {
            return queryService.getWithdrawalAndTransfersBlockedInfo(request);
        },
        collateralPoolAddress(request) {
            return queryService.collateralPoolAddress(request);
        }
    };
};
exports.createRpcQueryExtension = createRpcQueryExtension;
